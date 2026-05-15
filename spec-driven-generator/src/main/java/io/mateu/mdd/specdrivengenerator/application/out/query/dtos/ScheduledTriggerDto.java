package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

public record ScheduledTriggerDto(
        String id,
        String name,
        String cronExpression,
        String useCaseId,
        String modelMappingId,
        String description
) {
}
