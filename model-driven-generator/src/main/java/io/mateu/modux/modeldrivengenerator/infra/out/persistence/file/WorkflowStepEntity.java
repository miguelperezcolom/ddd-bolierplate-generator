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
        String description,
        /** TASK (default), JOIN (waits for every dependency) or SPLIT (fans out). */
        String type,
        /** The step's single outgoing link when it is ANOTHER workflow (hand-off). */
        String handoffWorkflowId
) {

    /** Backward-compatible constructor (pre-handoffWorkflowId callers and stores). */
    public WorkflowStepEntity(String id, String name, String emittedEventName,
                              String targetUseCaseId, String completionEventName,
                              List<String> dependsOnStepIds, String description, String type) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName,
                dependsOnStepIds, description, type, null);
    }

    public WorkflowStepEntity {
        if (dependsOnStepIds == null) dependsOnStepIds = List.of();
    }

    /** Backward-compatible constructor (pre-type callers and stores). */
    public WorkflowStepEntity(String id, String name, String emittedEventName,
                              String targetUseCaseId, String completionEventName,
                              List<String> dependsOnStepIds, String description) {
        this(id, name, emittedEventName, targetUseCaseId, completionEventName,
                dependsOnStepIds, description, null);
    }
}
