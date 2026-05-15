package io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.save;

public record SaveScheduledTriggerCommand(
        String id,
        String name,
        String cronExpression,
        String useCaseId,
        String modelMappingId,
        String description
) {
}
