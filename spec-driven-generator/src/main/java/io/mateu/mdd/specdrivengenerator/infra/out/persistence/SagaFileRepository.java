package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.SagaRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.Saga;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.SagaId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.SagaStep;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.SagaStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SagaFileRepository implements SagaRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Saga> findById(SagaId id) {
        return repository.findById(id.id(), SagaEntity.class)
                .map(entity -> Saga.load(
                        entity.id(),
                        entity.name(),
                        entity.triggeringEventIds(),
                        toSteps(entity.steps())));
    }

    @Override
    public Saga save(Saga entity) {
        repository.save(new SagaEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getTriggeringEventIds(),
                toStepEntities(entity.getSteps())));
        return entity;
    }

    @Override
    public void deleteAllById(List<SagaId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(SagaId::id).toList());
    }

    private List<SagaStep> toSteps(List<SagaStepEntity> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new SagaStep(s.id(), s.name(), s.type(), s.compensatingStepId(),
                        s.aggregateId(), s.operationId(),
                        s.gatewayId(), s.gatewayOperationId(),
                        s.domainEventId(), s.useCaseId(), s.modelMappingId()))
                .toList();
    }

    private List<SagaStepEntity> toStepEntities(List<SagaStep> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new SagaStepEntity(s.id(), s.name(), s.type(), s.compensatingStepId(),
                        s.aggregateId(), s.operationId(),
                        s.gatewayId(), s.gatewayOperationId(),
                        s.domainEventId(), s.useCaseId(), s.modelMappingId()))
                .toList();
    }
}
