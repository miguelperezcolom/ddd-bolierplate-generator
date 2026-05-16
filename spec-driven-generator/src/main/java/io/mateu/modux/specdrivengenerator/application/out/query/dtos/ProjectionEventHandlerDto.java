package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;

public record ProjectionEventHandlerDto(
        String id,
        String name,
        String domainEventId,
        ProjectionEventHandlerType type,
        String modelMappingId
) {
}
