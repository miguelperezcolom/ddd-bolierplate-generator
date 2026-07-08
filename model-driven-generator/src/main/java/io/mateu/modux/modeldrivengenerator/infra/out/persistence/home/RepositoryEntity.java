package io.mateu.modux.modeldrivengenerator.infra.out.persistence.home;

/** Serialized shape of a repository inside ~/.modux/repositories.yaml. */
public record RepositoryEntity(
        String id,
        String name,
        /** LOCAL (folder) or GIT (remote URL); older files without it infer from the location. */
        String type,
        String folder,
        String gitUrl,
        String branch,
        String description
) {
}
