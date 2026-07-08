package io.mateu.modux.modeldrivengenerator.application.usecases.repository.save;

public record SaveRepositoryCommand(
        String id,
        String name,
        String folder,
        String gitUrl,
        String branch,
        String description
) {
}
