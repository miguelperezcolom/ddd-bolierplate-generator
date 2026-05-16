package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;

public record ProjectionEventHandlerEntity(
        String id,
        String name,
        String domainEventId,
        ProjectionEventHandlerType type,
        String modelMappingId
) {
}
