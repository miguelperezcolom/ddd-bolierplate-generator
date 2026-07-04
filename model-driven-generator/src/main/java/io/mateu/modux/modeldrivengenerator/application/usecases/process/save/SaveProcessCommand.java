package io.mateu.modux.modeldrivengenerator.application.usecases.process.save;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessStepDto;

import java.util.List;

public record SaveProcessCommand(
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
