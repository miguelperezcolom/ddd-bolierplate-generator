package io.mateu.modux.modeldrivengenerator.application.usecases.projection;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;

public record ProjectionEventHandlerData(
        String id,
        String name,
        String domainEventId,
        ProjectionEventHandlerType type,
        String modelMappingId
) {
}
