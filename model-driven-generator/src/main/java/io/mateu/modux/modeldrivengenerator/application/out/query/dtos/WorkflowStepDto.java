package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record WorkflowStepDto(
        String id,
        String name,
        String emittedEventName,
        String targetUseCaseId,
        String completionEventName,
        List<String> dependsOnStepIds,
        String description
) {
}
