package io.mateu.modux.modeldrivengenerator.application.usecases.project;

public record ContextMapRelationData(
        String id,
        String name,
        String sourceModuleId,
        String targetModuleId,
        String type,
        String description
) {
}
