package io.mateu.modux.modeldrivengenerator.domain.aggregates.repository;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryName;
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
    /** Local folder holding the files (absolute path, or ~ for the user's home). */
    private String folder;
    /** Remote git repository URL (https or ssh). */
    private String gitUrl;
    /** Branch to work on when gitUrl is set; null means the remote's default. */
    private String branch;
    private String description;

    public static Repository of(RepositoryId id, RepositoryName name, String folder,
                                String gitUrl, String branch, String description) {
        if (isBlank(folder) && isBlank(gitUrl)) {
            throw new IllegalArgumentException(
                    "Un repositorio necesita la carpeta local o la URL git donde viven los ficheros");
        }
        var repository = new Repository();
        repository.id = id;
        repository.name = name;
        repository.folder = folder;
        repository.gitUrl = gitUrl;
        repository.branch = branch;
        repository.description = description;
        return repository;
    }

    public static Repository load(String id, String name, String folder,
                                  String gitUrl, String branch, String description) {
        return of(new RepositoryId(id), new RepositoryName(name), folder, gitUrl, branch, description);
    }

    public void update(RepositoryName name, String folder, String gitUrl,
                       String branch, String description) {
        if (isBlank(folder) && isBlank(gitUrl)) {
            throw new IllegalArgumentException(
                    "Un repositorio necesita la carpeta local o la URL git donde viven los ficheros");
        }
        this.name = name;
        this.folder = folder;
        this.gitUrl = gitUrl;
        this.branch = branch;
        this.description = description;
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
