package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record SagaDto(
        String id,
        String name,
        Long timeoutMs,
        Long compensationTimeoutMs,
        List<String> triggeringEventIds,
        List<SagaStepDto> steps,
        Integer maxRetries,
        Long retryBackoffMs,
        String deadLetterQueue,
        boolean persistenceEnabled,
        Integer defaultMaxStepExecutions
) {

    /** Backward-compatible constructor (pre-defaultMaxStepExecutions callers). */
    public SagaDto(String id, String name, Long timeoutMs, Long compensationTimeoutMs,
                   List<String> triggeringEventIds, List<SagaStepDto> steps, Integer maxRetries,
                   Long retryBackoffMs, String deadLetterQueue, boolean persistenceEnabled) {
        this(id, name, timeoutMs, compensationTimeoutMs, triggeringEventIds, steps, maxRetries,
                retryBackoffMs, deadLetterQueue, persistenceEnabled, null);
    }
}
