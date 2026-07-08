package io.mateu.modux.modeldrivengenerator.application.usecases.repository.create;

public record CreateRepositoryCommand(
        String id,
        String name,
        io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryType type,
        String folder,
        String gitUrl,
        String branch,
        String description
) {
}
