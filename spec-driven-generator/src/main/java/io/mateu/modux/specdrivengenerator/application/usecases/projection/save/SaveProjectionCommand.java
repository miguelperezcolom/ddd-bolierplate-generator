package io.mateu.modux.specdrivengenerator.application.usecases.projection.save;

import io.mateu.modux.specdrivengenerator.application.usecases.projection.ProjectionEventHandlerData;

import java.util.List;

public record SaveProjectionCommand(
        String id,
        String name,
        String modelId,
        String storageType,
        List<ProjectionEventHandlerData> handlers,
        String rebuildStrategy,
        String errorHandlingStrategy,
        Integer maxRetries,
        boolean snapshotEnabled,
        Integer snapshotFrequency
) {
}
