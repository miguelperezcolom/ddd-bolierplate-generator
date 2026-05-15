package io.mateu.mdd.specdrivengenerator.application.usecases.projection;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;

public record ProjectionEventHandlerData(
        String id,
        String name,
        String domainEventId,
        ProjectionEventHandlerType type,
        String modelMappingId
) {
}
