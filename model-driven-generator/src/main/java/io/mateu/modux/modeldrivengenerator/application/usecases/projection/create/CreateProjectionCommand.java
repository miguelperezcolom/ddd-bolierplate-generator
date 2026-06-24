package io.mateu.modux.modeldrivengenerator.application.usecases.projection.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.projection.ProjectionEventHandlerData;

import java.util.List;

public record CreateProjectionCommand(
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
