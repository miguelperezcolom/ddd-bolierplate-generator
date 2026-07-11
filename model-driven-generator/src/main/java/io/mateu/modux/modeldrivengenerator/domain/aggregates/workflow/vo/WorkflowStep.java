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
        String description,
        /** TASK (default), JOIN or SPLIT. */
        String type,
        /** The step's single outgoing link when it is ANOTHER workflow. */
        String handoffWorkflowId,
        /** HUMAN step: the role whose worklist gets the task. */
        String roleId,
        /** HUMAN step: ISO-8601 duration bound. */
        String deadline,
        /** HUMAN step: escalation target when the deadline passes. */
        String escalationRoleId,
        /** Use case run to UNDO this step when the workflow compensates. */
        String compensationUseCaseId
) {

    public WorkflowStep {
        if (dependsOnStepIds == null) dependsOnStepIds = List.of();
    }

    /** Backward-compatible constructor (pre-human-fields callers). */
    public WorkflowStep(String id, String name, String emittedEventName, String targetUseCaseId,
                        String completionEventName, List<String> dependsOnStepIds,
                        String description) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName, dependsOnStepIds,
                description, null, null, null, null, null, null);
    }
}
