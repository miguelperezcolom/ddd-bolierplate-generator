package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record ContextMapRelationDto(
        String id,
        String name,
        String sourceModuleId,
        String targetModuleId,
        String type,
        String description
) {
}
