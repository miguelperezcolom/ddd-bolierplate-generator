package io.mateu.mdd.specdrivengenerator.application.usecases.project;

public record ContextMapRelationData(
        String id,
        String name,
        String sourceModuleId,
        String targetModuleId,
        String type,
        String description
) {
}
