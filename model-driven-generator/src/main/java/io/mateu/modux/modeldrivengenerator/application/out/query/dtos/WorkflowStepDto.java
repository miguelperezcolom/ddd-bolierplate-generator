package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record WorkflowStepDto(
        String id,
        String name,
        String emittedEventName,
        String targetUseCaseId,
        String completionEventName,
        List<String> dependsOnStepIds,
        String description,
        String type,
        String handoffWorkflowId,
        String roleId,
        String deadline,
        String escalationRoleId,
        String compensationUseCaseId,
        String formPageId,
        /** Cap on successful runs of this step per workflow instance (null = inherit workflow default). */
        Integer maxSuccessfulExecutions
) {

    /** Backward-compatible constructor (pre-maxSuccessfulExecutions callers). */
    public WorkflowStepDto(String id, String name, String emittedEventName, String targetUseCaseId,
                           String completionEventName, List<String> dependsOnStepIds,
                           String description, String type, String handoffWorkflowId, String roleId,
                           String deadline, String escalationRoleId, String compensationUseCaseId,
                           String formPageId) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName, dependsOnStepIds,
                description, type, handoffWorkflowId, roleId, deadline, escalationRoleId,
                compensationUseCaseId, formPageId, null);
    }

    /** Backward-compatible constructor (pre-formPageId callers). */
    public WorkflowStepDto(String id, String name, String emittedEventName, String targetUseCaseId,
                           String completionEventName, java.util.List<String> dependsOnStepIds,
                           String description, String type, String handoffWorkflowId, String roleId,
                           String deadline, String escalationRoleId, String compensationUseCaseId) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName, dependsOnStepIds,
                description, type, handoffWorkflowId, roleId, deadline, escalationRoleId,
                compensationUseCaseId, null);
    }

    /** Backward-compatible constructor (pre-human-fields callers). */
    public WorkflowStepDto(String id, String name, String emittedEventName, String targetUseCaseId,
                           String completionEventName, List<String> dependsOnStepIds,
                           String description) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName, dependsOnStepIds,
                description, null, null, null, null, null, null);
    }
}
