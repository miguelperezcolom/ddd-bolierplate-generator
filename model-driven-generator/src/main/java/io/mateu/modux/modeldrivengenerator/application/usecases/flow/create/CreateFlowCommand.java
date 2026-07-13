package io.mateu.modux.modeldrivengenerator.application.usecases.flow.create;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;

import java.util.List;

public record CreateFlowCommand(
        String id,
        String name,
        String description,
        FlowArchetype archetype,
        String triggerAggregateId,
        String triggerEvent,
        String targetBoundedContextId,
        String readModelName,
        List<String> materializedFields,
        String targetUseCaseId,
        List<String> inputMappings,
        List<String> overrides
) {
}
