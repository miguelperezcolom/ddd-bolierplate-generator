package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record ProcessDto(
        String id,
        String name,
        String description,
        String triggerAggregateId,
        String triggerEvent,
        String ownerBoundedContextId,
        List<ProcessStepDto> steps,
        String onCompletionEventName,
        String sla
) {
}
