package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record ProjectionDto(
        String id,
        String name,
        String readModelId,
        List<ProjectionEventHandlerDto> handlers,
        String rebuildStrategy,
        String errorHandlingStrategy,
        Integer maxRetries,
        boolean snapshotEnabled,
        Integer snapshotFrequency
) {
}
