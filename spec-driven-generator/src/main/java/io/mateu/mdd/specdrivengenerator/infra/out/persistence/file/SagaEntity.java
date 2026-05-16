package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

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
) implements Identifiable {
}
