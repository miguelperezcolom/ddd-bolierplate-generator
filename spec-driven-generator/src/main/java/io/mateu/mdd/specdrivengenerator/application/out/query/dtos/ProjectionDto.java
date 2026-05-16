package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ProjectionDto(
        String id,
        String name,
        String modelId,
        String storageType,
        List<ProjectionEventHandlerDto> handlers,
        String rebuildStrategy,
        String errorHandlingStrategy,
        Integer maxRetries
) {
}
