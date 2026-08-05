package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

import java.util.List;

public record SagaEntity(
        String id,
        String name,
        Long timeoutMs,
        Long compensationTimeoutMs,
        List<String> triggeringEventIds,
        List<SagaStepEntity> steps,
        Integer maxRetries,
        Long retryBackoffMs,
        String deadLetterQueue,
        boolean persistenceEnabled
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description,
        /** Default cap on successful runs per step (null = unbounded); a step may override it. */
        Integer defaultMaxStepExecutions
) implements Identifiable {

    /** Backward-compatible constructor (pre-defaultMaxStepExecutions callers). */
    public SagaEntity(String id, String name, Long timeoutMs, Long compensationTimeoutMs,
            List<String> triggeringEventIds, List<SagaStepEntity> steps, Integer maxRetries,
            Long retryBackoffMs, String deadLetterQueue, boolean persistenceEnabled, String projectId,
            String description) {
        this(id, name, timeoutMs, compensationTimeoutMs, triggeringEventIds, steps, maxRetries,
                retryBackoffMs, deadLetterQueue, persistenceEnabled, projectId, description, null);
    }

    /** Backward-compatible constructor (pre-description callers). */
    public SagaEntity(String id, String name, Long timeoutMs, Long compensationTimeoutMs,
            List<String> triggeringEventIds, List<SagaStepEntity> steps, Integer maxRetries,
            Long retryBackoffMs, String deadLetterQueue, boolean persistenceEnabled, String projectId) {
        this(id, name, timeoutMs, compensationTimeoutMs, triggeringEventIds, steps, maxRetries,
                retryBackoffMs, deadLetterQueue, persistenceEnabled, projectId, null, null);
    }
}
