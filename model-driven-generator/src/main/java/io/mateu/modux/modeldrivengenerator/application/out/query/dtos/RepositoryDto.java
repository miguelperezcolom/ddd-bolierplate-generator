package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record RepositoryDto(
        String id,
        String name,
        String type,
        String folder,
        String gitUrl,
        String branch,
        String jdbcUrl,
        String description
) {
}
