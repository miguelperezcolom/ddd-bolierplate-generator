package io.mateu.modux.modeldrivengenerator.application.usecases.repository.create;

public record CreateRepositoryCommand(
        String id,
        String name,
        String folder,
        String gitUrl,
        String branch,
        String description
) {
}
