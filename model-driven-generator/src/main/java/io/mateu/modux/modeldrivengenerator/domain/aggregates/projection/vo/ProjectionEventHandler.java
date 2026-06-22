package io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo;

public record ProjectionEventHandler(
        String id,
        String name,
        String domainEventId,
        ProjectionEventHandlerType type,
        String modelMappingId
) {
}
