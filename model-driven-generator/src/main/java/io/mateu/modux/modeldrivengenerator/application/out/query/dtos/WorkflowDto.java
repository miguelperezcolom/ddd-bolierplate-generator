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
        String onCompletionEventName
) {
}
