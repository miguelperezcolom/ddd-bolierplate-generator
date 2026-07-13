package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record ContextMapRelationDto(
        String id,
        String name,
        String sourceBoundedContextId,
        String targetBoundedContextId,
        String type,
        String description
) {
}
