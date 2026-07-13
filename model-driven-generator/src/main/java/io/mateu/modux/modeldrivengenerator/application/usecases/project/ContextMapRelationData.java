package io.mateu.modux.modeldrivengenerator.application.usecases.project;

public record ContextMapRelationData(
        String id,
        String name,
        String sourceBoundedContextId,
        String targetBoundedContextId,
        String type,
        String description
) {
}
