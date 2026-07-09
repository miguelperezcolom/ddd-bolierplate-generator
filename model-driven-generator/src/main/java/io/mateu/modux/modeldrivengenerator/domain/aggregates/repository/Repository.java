package io.mateu.modux.modeldrivengenerator.domain.aggregates.repository;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryType;
import lombok.Getter;

/**
 * A code location: the folder — or the git repository — where a project's files live.
 * Machine-local workspace configuration, NOT model content: repositories persist in
 * the user's ~/.modux, never in the model store.
 */
@Getter
public class Repository {

    private RepositoryId id;
    private RepositoryName name;
    private RepositoryType type;
    /** Local folder holding the files (absolute path, or ~ for the user's home). */
    private String folder;
    /** Remote git repository URL (https or ssh). */
    private String gitUrl;
    /** Branch to work on when gitUrl is set; null means the remote's default. */
    private String branch;
    private String jdbcUrl;
    private String description;

    public static Repository of(RepositoryId id, RepositoryName name, RepositoryType type,
                                String folder, String gitUrl, String branch, String description) {
        return of(id, name, type, folder, gitUrl, branch, null, description);
    }

    public static Repository of(RepositoryId id, RepositoryName name, RepositoryType type,
                                String folder, String gitUrl, String branch, String jdbcUrl,
                                String description) {
        var repository = new Repository();
        repository.id = id;
        repository.name = name;
        repository.type = resolveType(type, folder, gitUrl);
        repository.folder = folder;
        repository.gitUrl = gitUrl;
        repository.branch = branch;
        repository.jdbcUrl = jdbcUrl;
        repository.description = description;
        validateLocation(repository.type, folder, gitUrl, jdbcUrl);
        return repository;
    }

    public static Repository load(String id, String name, String type, String folder,
                                  String gitUrl, String branch, String jdbcUrl, String description) {
        return of(new RepositoryId(id), new RepositoryName(name),
                type != null ? RepositoryType.valueOf(type) : null,
                folder, gitUrl, branch, jdbcUrl, description);
    }

    public void update(RepositoryName name, RepositoryType type, String folder,
                       String gitUrl, String branch, String jdbcUrl, String description) {
        var resolved = resolveType(type, folder, gitUrl);
        validateLocation(resolved, folder, gitUrl, jdbcUrl);
        this.jdbcUrl = jdbcUrl;
        this.name = name;
        this.type = resolved;
        this.folder = folder;
        this.gitUrl = gitUrl;
        this.branch = branch;
        this.description = description;
    }

    /** Repositories saved before the type existed infer it from whichever location they carry. */
    private static RepositoryType resolveType(RepositoryType type, String folder, String gitUrl) {
        if (type != null) return type;
        return !isBlank(gitUrl) ? RepositoryType.GIT : RepositoryType.LOCAL;
    }

    private static void validateLocation(RepositoryType type, String folder, String gitUrl,
                                         String jdbcUrl) {
        if (type == RepositoryType.LOCAL && isBlank(folder)) {
            throw new IllegalArgumentException("Un repositorio local necesita la carpeta donde viven los ficheros");
        }
        if (type == RepositoryType.GIT && isBlank(gitUrl)) {
            throw new IllegalArgumentException("Un repositorio git necesita la URL del remoto");
        }
        if (type == RepositoryType.DATABASE && isBlank(jdbcUrl)) {
            throw new IllegalArgumentException("Un repositorio de base de datos necesita la URL JDBC");
        }
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
