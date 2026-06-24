package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;

import java.util.List;

public record FlowDto(
        String id,
        String name,
        String description,
        FlowArchetype archetype,
        String triggerAggregateId,
        String triggerEvent,
        String targetModuleId,
        String readModelName,
        List<String> materializedFields,
        String targetUseCaseId,
        List<String> overrides
) {
}
