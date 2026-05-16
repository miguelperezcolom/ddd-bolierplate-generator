package io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo;

public record ContextMapRelation(
        String id,
        String name,
        String sourceModuleId,
        String targetModuleId,
        ContextMapRelationType type,
        String description
) {
}
