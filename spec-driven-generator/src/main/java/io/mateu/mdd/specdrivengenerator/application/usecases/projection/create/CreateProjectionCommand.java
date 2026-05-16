package io.mateu.mdd.specdrivengenerator.application.usecases.projection.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.projection.ProjectionEventHandlerData;

import java.util.List;

public record CreateProjectionCommand(
        String id,
        String name,
        String modelId,
        String storageType,
        List<ProjectionEventHandlerData> handlers,
        String rebuildStrategy,
        String errorHandlingStrategy,
        Integer maxRetries
) {
}
