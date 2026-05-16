package io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.save;

public record SaveScheduledTriggerCommand(
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
        boolean allowConcurrentExecution,
        boolean retryOnFailure,
        Integer retryCount
) {
}
