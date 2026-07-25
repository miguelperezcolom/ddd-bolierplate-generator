package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record WorkflowDto(
        String id,
        String name,
        String description,
        String triggerAggregateId,
        String triggerDomainServiceId,
        String triggerUseCaseId,
        String triggerEvent,
        List<WorkflowStepDto> steps,
        String onCompletionEventName,
        /** Default cap on successful runs per step (null = unbounded); a step may override it. */
        Integer defaultMaxStepExecutions
) {

    /** Backward-compatible constructor (pre-defaultMaxStepExecutions callers). */
    public WorkflowDto(String id, String name, String description, String triggerAggregateId,
                       String triggerDomainServiceId, String triggerUseCaseId, String triggerEvent,
                       List<WorkflowStepDto> steps, String onCompletionEventName) {
        this(id, name, description, triggerAggregateId, triggerDomainServiceId, triggerUseCaseId,
                triggerEvent, steps, onCompletionEventName, null);
    }
}
