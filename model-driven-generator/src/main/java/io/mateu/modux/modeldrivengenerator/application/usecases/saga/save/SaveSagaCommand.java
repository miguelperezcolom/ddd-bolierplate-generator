package io.mateu.modux.modeldrivengenerator.application.usecases.saga.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.saga.SagaStepData;

import java.util.List;

public record SaveSagaCommand(
        String id,
        String name,
        Long timeoutMs,
        Long compensationTimeoutMs,
        List<String> triggeringEventIds,
        List<SagaStepData> steps,
        Integer maxRetries,
        Long retryBackoffMs,
        String deadLetterQueue,
        boolean persistenceEnabled
) {
}
