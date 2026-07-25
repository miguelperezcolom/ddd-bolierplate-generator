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
        String compensationUseCaseId,
        /** HUMAN step: the declared PAGE the forms engine renders as the task's form. */
        String formPageId,
        /**
         * Cap on how many times this step may SUCCESSFULLY run in one workflow instance — a runtime
         * backstop against runaway loops. {@code null} inherits the workflow's default; both null =
         * unbounded.
         */
        Integer maxSuccessfulExecutions
) {

    /** Backward-compatible constructor (pre-maxSuccessfulExecutions callers). */
    public WorkflowStep(String id, String name, String emittedEventName, String targetUseCaseId,
                        String completionEventName, List<String> dependsOnStepIds,
                        String description, String type, String handoffWorkflowId, String roleId,
                        String deadline, String escalationRoleId, String compensationUseCaseId,
                        String formPageId) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName, dependsOnStepIds,
                description, type, handoffWorkflowId, roleId, deadline, escalationRoleId,
                compensationUseCaseId, formPageId, null);
    }

    /** Backward-compatible constructor (pre-formPageId callers). */
    public WorkflowStep(String id, String name, String emittedEventName, String targetUseCaseId,
                        String completionEventName, List<String> dependsOnStepIds,
                        String description, String type, String handoffWorkflowId, String roleId,
                        String deadline, String escalationRoleId, String compensationUseCaseId) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName, dependsOnStepIds,
                description, type, handoffWorkflowId, roleId, deadline, escalationRoleId,
                compensationUseCaseId, null);
    }

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
