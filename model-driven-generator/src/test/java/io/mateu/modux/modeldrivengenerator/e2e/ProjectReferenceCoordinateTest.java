package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReferencedProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.ProjectReferenceService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Referencing another modux project by a coordinate that travels with the model.
 *
 * <p>The pointer used to be a key into {@code ~/.modux/repositories.yaml}: a file on one machine,
 * outside version control. A teammate cloning the model got a reference that resolved to nothing,
 * and had no way to know what it had meant. See {@code docs/design/ide-plugin.md} §4.7.
 */
@SpringBootTest
class ProjectReferenceCoordinateTest {

    @Autowired CommonFileRepository repository;
    @Autowired ProjectReferenceService references;

    @AfterEach
    void clearHome() {
        System.clearProperty("modux.home");
    }

    /** A minimal granular model for the project being referenced. */
    private static Path project(Path repoRoot, String name, String projectName) throws Exception {
        var model = repoRoot.resolve(name).resolve("modux");
        Files.createDirectories(model.resolve("projects"));
        Files.createDirectories(model.resolve("useCases"));
        Files.writeString(model.resolve("index.yaml"),
                "formatVersion: 1\ncounts:\n  projects: 1\n  useCases: 1\n");
        Files.writeString(model.resolve("projects/p.yaml"), "id: p\nname: " + projectName + "\n");
        Files.writeString(model.resolve("useCases/uc-book.yaml"),
                "id: uc-book\nname: Reservar\nexposedAsRest: true\n");
        return model;
    }

    @Test
    void readsTheReferencedProjectFromAnExplicitPath(@TempDir Path tmp) throws Exception {
        project(tmp, "checkin", "Checkin");
        var here = tmp.resolve("booking").resolve("modux");
        Files.createDirectories(here);
        repository.loadFrom(here.toString());

        var summary = references.read(ReferencedProjectEntity.builder()
                .path("../../checkin/modux").build());

        assertThat(summary.name()).isEqualTo("Checkin");
        assertThat(summary.useCases()).extracting(ProjectReferenceService.Ref::id).containsExactly("uc-book");
    }

    /**
     * The point of keeping the git URL as the canonical form: while you work on two projects at
     * once they sit side by side on disk, so the URL alone resolves — with no network, and with
     * nothing machine-specific written into the versioned model.
     */
    @Test
    void guessesASiblingCheckoutFromTheGitUrlAlone(@TempDir Path tmp) throws Exception {
        project(tmp, "checkin", "Checkin");
        var here = tmp.resolve("booking").resolve("modux");
        Files.createDirectories(here);
        repository.loadFrom(here.toString());

        var summary = references.read(ReferencedProjectEntity.builder()
                .gitUrl("git@github.com:acme/checkin.git").build());

        assertThat(summary.name()).isEqualTo("Checkin");
    }

    @Test
    void saysSoWhenThereIsNoCheckoutToRead(@TempDir Path tmp) throws Exception {
        var here = tmp.resolve("booking").resolve("modux");
        Files.createDirectories(here);
        repository.loadFrom(here.toString());

        assertThatThrownBy(() -> references.read(ReferencedProjectEntity.builder()
                .gitUrl("https://github.com/acme/ausente.git").build()))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("ausente");
    }

    @Test
    void aCoordinateWithNothingInItIsNotACoordinate() {
        assertThat(ReferencedProjectEntity.builder().build().isEmpty()).isTrue();
        assertThat(ReferencedProjectEntity.builder().branch("main").build().isEmpty()).isTrue();
        assertThat(ReferencedProjectEntity.builder().path("../x").build().isEmpty()).isFalse();
    }

    @Test
    void readsTheRepositoryNameOutOfEveryUrlShape() {
        var name = (java.util.function.Function<String, String>) url ->
                ReferencedProjectEntity.builder().gitUrl(url).build().repositoryName();

        assertThat(name.apply("git@github.com:acme/checkin.git")).isEqualTo("checkin");
        assertThat(name.apply("https://github.com/acme/checkin.git")).isEqualTo("checkin");
        assertThat(name.apply("https://github.com/acme/checkin")).isEqualTo("checkin");
        assertThat(name.apply("https://github.com/acme/checkin/")).isEqualTo("checkin");
        assertThat(name.apply("ssh://git@host:2222/acme/checkin.git")).isEqualTo("checkin");
    }
}
