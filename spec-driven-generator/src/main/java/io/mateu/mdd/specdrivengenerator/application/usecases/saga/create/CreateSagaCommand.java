package io.mateu.mdd.specdrivengenerator.application.usecases.saga.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.saga.SagaStepData;

import java.util.List;

public record CreateSagaCommand(
        String id,
        String name,
        Long timeoutMs,
        Long compensationTimeoutMs,
        List<String> triggeringEventIds,
        List<SagaStepData> steps,
        Integer maxRetries,
        Long retryBackoffMs,
        String deadLetterQueue
) {
}
