package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record ScheduledTriggerEntity(
        String id,
        String name,
        String cronExpression,
        String timezone,
        String useCaseId,
        String modelMappingId,
        String description,
        String executionEnvironment,
        String lockProvider,
        Long maxExecutionTimeMs,
        String failureNotificationEmail,
        String misfirePolicy,
        boolean allowConcurrentExecution
) implements Identifiable {
}
