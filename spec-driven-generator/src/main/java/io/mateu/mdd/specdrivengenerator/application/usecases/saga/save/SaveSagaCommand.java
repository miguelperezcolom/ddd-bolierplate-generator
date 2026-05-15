package io.mateu.mdd.specdrivengenerator.application.usecases.saga.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.saga.SagaStepData;

import java.util.List;

public record SaveSagaCommand(
        String id,
        String name,
        List<String> triggeringEventIds,
        List<SagaStepData> steps
) {
}
