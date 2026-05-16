package io.mateu.modux.specdrivengenerator.application.usecases.scheduledtrigger.create;

public record CreateScheduledTriggerCommand(
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
