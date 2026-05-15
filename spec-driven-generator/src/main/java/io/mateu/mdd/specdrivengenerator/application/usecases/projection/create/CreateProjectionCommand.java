package io.mateu.mdd.specdrivengenerator.application.usecases.projection.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.projection.ProjectionEventHandlerData;

import java.util.List;

public record CreateProjectionCommand(
        String id,
        String name,
        String modelId,
        List<ProjectionEventHandlerData> handlers
) {
}
