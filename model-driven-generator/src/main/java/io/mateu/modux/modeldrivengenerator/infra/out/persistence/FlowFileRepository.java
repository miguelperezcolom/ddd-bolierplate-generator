package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.FlowRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlowFileRepository implements FlowRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Flow> findById(FlowId id) {
        return repository.findById(id.id(), FlowEntity.class)
                .map(entity -> Flow.load(entity.id(), entity.name(), entity.description(), entity.archetype() != null ? entity.archetype().name() : null,
                        entity.triggerAggregateId(), entity.triggerEvent(), entity.targetModuleId(),
                        entity.readModelName(), entity.materializedFields(),
                        entity.targetUseCaseId(), entity.overrides()));
    }

    @Override
    public Flow save(Flow entity) {
        repository.save(new FlowEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getDescription(),
                entity.getArchetype(),
                entity.getTriggerAggregateId(),
                entity.getTriggerEvent(),
                entity.getTargetModuleId(),
                entity.getReadModelName(),
                entity.getMaterializedFields(),
                entity.getTargetUseCaseId(),
                entity.getOverrides()));
        return entity;
    }

    @Override
    public void deleteAllById(List<FlowId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(FlowId::id).toList(), FlowEntity.class);
    }
}
