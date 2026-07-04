package io.mateu.modux.modeldrivengenerator.application.usecases.process.create;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessStepDto;

import java.util.List;

public record CreateProcessCommand(
        String id,
        String name,
        String description,
        String triggerAggregateId,
        String triggerEvent,
        String ownerModuleId,
        List<ProcessStepDto> steps,
        String onCompletionEventName,
        String sla
) {
}
