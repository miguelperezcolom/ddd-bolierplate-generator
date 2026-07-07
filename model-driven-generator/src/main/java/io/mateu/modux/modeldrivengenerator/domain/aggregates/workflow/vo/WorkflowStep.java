package io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo;

import java.util.List;

/**
 * One step of a workflow. The workflow emits {@code emittedEventName} to start the task — the use
 * case {@code targetUseCaseId} in its bounded context — and considers the step done when
 * {@code completionEventName} arrives. {@code dependsOnStepIds} are the step's predecessors in the
 * dependency graph; a step with none starts when the workflow's trigger event arrives.
 */
public record WorkflowStep(
        String id,
        String name,
        String emittedEventName,
        String targetUseCaseId,
        String completionEventName,
        List<String> dependsOnStepIds,
        String description
) {

    public WorkflowStep {
        if (dependsOnStepIds == null) dependsOnStepIds = List.of();
    }
}
