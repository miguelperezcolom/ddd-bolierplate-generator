package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Turning a reference that pointed into {@code ~/.modux} into one that travels with the model.
 *
 * <p>The failure this guards against is the quiet one, the same shape as §4.3's: a store that
 * loads fine and has silently forgotten where a referenced project was. What is asserted here is
 * mostly the <em>absence</em> of loss — including on the machine that never had the registry,
 * where there is nothing to convert and the snapshot has to keep standing on its own.
 */
@SpringBootTest
class LegacyProjectReferenceMigrationTest {

    @Autowired CommonFileRepository repository;

    @AfterEach
    void clearHome() {
        System.clearProperty("modux.home");
    }

    /** A store in the pre-§4.7 shape: the reference is an id into the machine's registry. */
    private static Path modelReferencing(Path repoRoot, String repositoryId) throws Exception {
        var model = repoRoot.resolve("booking").resolve("modux");
        Files.createDirectories(model.resolve("externalSystems"));
        Files.writeString(model.resolve("index.yaml"),
                "formatVersion: 1\ncounts:\n  externalSystems: 1\n");
        Files.writeString(model.resolve("externalSystems/proj-checkin.yaml"),
                "id: proj-checkin\nname: Checkin\nreferencedRepositoryId: " + repositoryId + "\n"
                        + "useCases:\n  - id: proj-checkin-uc-book\n    name: Reservar\n");
        return model;
    }

    private static void registry(Path home, String body) throws Exception {
        Files.createDirectories(home);
        Files.writeString(home.resolve("repositories.yaml"), body);
        System.setProperty("modux.home", home.toString());
    }

    @Test
    void aGitRepositoryBecomesItsUrlAndBranch(@TempDir Path tmp) throws Exception {
        registry(tmp.resolve("home"), """
                repositories:
                  - id: checkin
                    name: Checkin
                    type: GIT
                    gitUrl: git@github.com:acme/checkin.git
                    branch: main
                """);
        var model = modelReferencing(tmp, "checkin");

        repository.loadFrom(model.toString());

        var system = repository.findById("proj-checkin", ExternalSystemEntity.class).orElseThrow();
        assertThat(system.referencedProject()).isNotNull();
        assertThat(system.referencedProject().gitUrl()).isEqualTo("git@github.com:acme/checkin.git");
        assertThat(system.referencedProject().branch()).isEqualTo("main");
        assertThat(system.referencedRepositoryId()).isNull();
    }

    /** A local folder becomes a path RELATIVE to the referencing model — which a teammate can use. */
    @Test
    void aLocalFolderBecomesARelativePath(@TempDir Path tmp) throws Exception {
        var sibling = tmp.resolve("checkin").resolve("modux");
        Files.createDirectories(sibling);
        registry(tmp.resolve("home"), """
                repositories:
                  - id: checkin
                    name: Checkin
                    type: LOCAL
                    folder: %s
                """.formatted(sibling));
        var model = modelReferencing(tmp, "checkin");

        repository.loadFrom(model.toString());

        var system = repository.findById("proj-checkin", ExternalSystemEntity.class).orElseThrow();
        assertThat(system.referencedProject().path().replace('\\', '/'))
                .isEqualTo("../../checkin/modux");
    }

    /**
     * On any machine but the one that wrote the registry there is nothing to convert. The
     * reference must survive as a reference — the snapshot is what generation reads, and it is
     * intact — rather than being dropped for being unresolvable.
     */
    @Test
    void withoutTheRegistryTheSnapshotSurvivesUntouched(@TempDir Path tmp) throws Exception {
        System.setProperty("modux.home", tmp.resolve("no-such-home").toString());
        var model = modelReferencing(tmp, "checkin");

        repository.loadFrom(model.toString());

        var system = repository.findById("proj-checkin", ExternalSystemEntity.class).orElseThrow();
        assertThat(system.isProjectReference()).isTrue();
        assertThat(system.referencedRepositoryId()).isEqualTo("checkin");
        assertThat(system.useCases()).extracting(uc -> uc.name()).containsExactly("Reservar");
    }

    /** An id the registry does not explain is left alone, for the same reason. */
    @Test
    void anIdTheRegistryDoesNotKnowIsLeftAlone(@TempDir Path tmp) throws Exception {
        registry(tmp.resolve("home"), """
                repositories:
                  - id: otro
                    name: Otro
                    type: GIT
                    gitUrl: git@github.com:acme/otro.git
                """);
        var model = modelReferencing(tmp, "checkin");

        repository.loadFrom(model.toString());

        var system = repository.findById("proj-checkin", ExternalSystemEntity.class).orElseThrow();
        assertThat(system.referencedProject()).isNull();
        assertThat(system.referencedRepositoryId()).isEqualTo("checkin");
    }

    /** Migrating twice must be a no-op: the second load finds the coordinate already there. */
    @Test
    void migratesOnce(@TempDir Path tmp) throws Exception {
        registry(tmp.resolve("home"), """
                repositories:
                  - id: checkin
                    name: Checkin
                    type: GIT
                    gitUrl: git@github.com:acme/checkin.git
                """);
        var model = modelReferencing(tmp, "checkin");
        repository.loadFrom(model.toString());
        repository.save(repository.findById("proj-checkin", ExternalSystemEntity.class).orElseThrow());

        repository.loadFrom(model.toString());

        var system = repository.findById("proj-checkin", ExternalSystemEntity.class).orElseThrow();
        assertThat(system.referencedProject().gitUrl()).isEqualTo("git@github.com:acme/checkin.git");
        assertThat(system.referencedRepositoryId()).isNull();
    }
}
