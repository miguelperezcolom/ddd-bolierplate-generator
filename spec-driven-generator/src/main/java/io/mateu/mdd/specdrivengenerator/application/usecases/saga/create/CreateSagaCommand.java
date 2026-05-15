package io.mateu.mdd.specdrivengenerator.application.usecases.saga.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.saga.SagaStepData;

import java.util.List;

public record CreateSagaCommand(
        String id,
        String name,
        Long timeoutMs,
        List<String> triggeringEventIds,
        List<SagaStepData> steps
) {
}
