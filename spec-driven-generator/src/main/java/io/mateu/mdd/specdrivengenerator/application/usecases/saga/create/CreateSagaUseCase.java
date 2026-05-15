package io.mateu.mdd.specdrivengenerator.application.usecases.saga.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.SagaRepository;
import io.mateu.mdd.specdrivengenerator.application.usecases.saga.SagaStepData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.Saga;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.SagaId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.SagaName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.SagaStep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateSagaUseCase {

    final SagaRepository repository;

    public void handle(CreateSagaCommand command) {
        var saga = Saga.of(
                new SagaId(command.id()),
                new SagaName(command.name()),
                command.timeoutMs(),
                command.compensationTimeoutMs(),
                command.triggeringEventIds(),
                toSteps(command.steps()));
        repository.save(saga);
    }

    private List<SagaStep> toSteps(List<SagaStepData> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new SagaStep(s.id(), s.name(), s.type(), s.compensatingStepId(),
                        s.aggregateId(), s.operationId(),
                        s.gatewayId(), s.gatewayOperationId(),
                        s.domainEventId(), s.useCaseId(), s.modelMappingId()))
                .toList();
    }
}
