package io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo;

public record ContextMapRelation(
        String id,
        String name,
        String sourceModuleId,
        String targetModuleId,
        ContextMapRelationType type,
        String description
) {
}
