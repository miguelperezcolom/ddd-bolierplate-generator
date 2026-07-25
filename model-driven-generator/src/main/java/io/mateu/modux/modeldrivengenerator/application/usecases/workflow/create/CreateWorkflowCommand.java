package io.mateu.modux.modeldrivengenerator.application.usecases.workflow.create;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowStepDto;

import java.util.List;

public record CreateWorkflowCommand(
        String id,
        String name,
        String description,
        String triggerAggregateId,
        String triggerDomainServiceId,
        String triggerUseCaseId,
        String triggerEvent,
        List<WorkflowStepDto> steps,
        String onCompletionEventName,
        Integer defaultMaxStepExecutions
) {
}
