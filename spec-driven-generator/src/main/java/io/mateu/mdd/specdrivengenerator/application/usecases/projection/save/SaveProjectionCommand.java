package io.mateu.mdd.specdrivengenerator.application.usecases.projection.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.projection.ProjectionEventHandlerData;

import java.util.List;

public record SaveProjectionCommand(
        String id,
        String name,
        String modelId,
        String storageType,
        List<ProjectionEventHandlerData> handlers
) {
}
