package io.mateu.modux.specdrivengenerator.application.usecases.projection;

import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;

public record ProjectionEventHandlerData(
        String id,
        String name,
        String domainEventId,
        ProjectionEventHandlerType type,
        String modelMappingId
) {
}
