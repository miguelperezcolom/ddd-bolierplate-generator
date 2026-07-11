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
        String compensationUseCaseId
) {

    /** Backward-compatible constructor (pre-human-fields callers). */
    public WorkflowStepDto(String id, String name, String emittedEventName, String targetUseCaseId,
                           String completionEventName, List<String> dependsOnStepIds,
                           String description) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName, dependsOnStepIds,
                description, null, null, null, null, null, null);
    }
}
