package io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo;

public record ContextMapRelation(
        String id,
        String name,
        String sourceBoundedContextId,
        String targetBoundedContextId,
        ContextMapRelationType type,
        String description
) {
}
