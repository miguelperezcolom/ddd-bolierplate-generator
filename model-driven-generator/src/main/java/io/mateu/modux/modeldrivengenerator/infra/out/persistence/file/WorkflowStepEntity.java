package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

/**
 * One step of a {@link WorkflowEntity workflow}. The workflow emits {@code emittedEventName} to
 * start the step's task — the use case {@code targetUseCaseId} in its bounded context — and
 * considers the step done when {@code completionEventName} arrives. {@code dependsOnStepIds}
 * declares the step's predecessors in the dependency graph; a step with none starts when the
 * workflow's trigger event arrives.
 */
public record WorkflowStepEntity(
        String id,
        String name,
        String emittedEventName,
        String targetUseCaseId,
        String completionEventName,
        List<String> dependsOnStepIds,
        String description
) {

    public WorkflowStepEntity {
        if (dependsOnStepIds == null) dependsOnStepIds = List.of();
    }
}
