package io.mateu.modux.modeldrivengenerator.application.usecases.projection.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.projection.ProjectionEventHandlerData;

import java.util.List;

public record SaveProjectionCommand(
        String id,
        String name,
        String readModelId,
        List<ProjectionEventHandlerData> handlers,
        String rebuildStrategy,
        String errorHandlingStrategy,
        Integer maxRetries,
        boolean snapshotEnabled,
        Integer snapshotFrequency
) {
}
