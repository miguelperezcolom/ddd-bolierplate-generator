package io.mateu.modux.modeldrivengenerator.infra.out.persistence.home;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

/**
 * Reads ANOTHER project's store, read-only, to reference it as an external
 * system: every project is a system, and the ~/.modux repository catalog is
 * the organisation's map of them. LOCAL repositories read from their folder;
 * GIT ones from their existing checkout (open it once first).
 */
@Service
@RequiredArgsConstructor
public class ProjectReferenceService {

    final ModuxHomeStore home;

    /** What another project shows to the outside: its name and public surface. */
    public record ProjectSummary(String repositoryId, String name,
                                 List<Ref> useCases, List<Ref> apis) {}

    public record Ref(String id, String name) {}

    public List<RepositoryEntity> repositories() {
        return home.loadRepositories();
    }

    @SneakyThrows
    public ProjectSummary read(String repositoryId) {
        var repo = home.loadRepositories().stream()
                .filter(r -> repositoryId.equals(r.id()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "El repositorio " + repositoryId + " no está en ~/.modux/repositories.yaml"));
        var location = locate(repo);
        var monolithic = location.resolve("model-driven-store.yaml");
        var storePath = Files.exists(monolithic) ? monolithic : location;
        var data = loadStore(storePath);
        var name = data.projects().stream().findFirst()
                .map(p -> p.name() == null ? repo.name() : p.name())
                .orElse(repo.name());
        var useCases = data.useCases().stream()
                .filter(uc -> uc.exposedAsRest() || uc.exposedAsGrpc() || uc.exposedAsMcp()
                        || uc.exposedAsAsync())
                .map(uc -> new Ref(uc.id(), uc.name()))
                .toList();
        var apis = data.apis().stream().map(a -> new Ref(a.id(), a.name())).toList();
        return new ProjectSummary(repositoryId, name, useCases, apis);
    }

    private Path locate(RepositoryEntity repo) {
        if (repo.gitUrl() != null && !repo.gitUrl().isBlank()) {
            var checkout = home.homeDir().resolve("checkouts").resolve(repo.id());
            if (!Files.isDirectory(checkout)) {
                throw new IllegalArgumentException("El repositorio git " + repo.name()
                        + " no tiene checkout todavía: ábrelo una vez desde el selector de repositorios");
            }
            return checkout;
        }
        if (repo.folder() == null || repo.folder().isBlank()) {
            throw new IllegalArgumentException("El repositorio " + repo.name() + " no tiene carpeta");
        }
        var folder = repo.folder().trim();
        return folder.startsWith("~")
                ? Path.of(System.getProperty("user.home") + folder.substring(1))
                : Path.of(folder);
    }

    @SneakyThrows
    private AllData loadStore(Path storePath) {
        var granular = new GranularYamlStorageFormat();
        if (granular.handles(storePath)) return granular.load(storePath);
        return new MonolithicYamlStorageFormat().load(storePath);
    }
}
