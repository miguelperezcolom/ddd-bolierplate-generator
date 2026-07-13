package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.FlowRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlowFileRepository implements FlowRepository {

    final ModelStore repository;

    @Override
    public Optional<Flow> findById(FlowId id) {
        return repository.findById(id.id(), FlowEntity.class)
                .map(entity -> Flow.load(entity.id(), entity.name(), entity.description(), entity.archetype() != null ? entity.archetype().name() : null,
                        entity.triggerAggregateId(), entity.triggerEvent(), entity.targetBoundedContextId(),
                        entity.readModelName(), entity.materializedFields(),
                        entity.targetUseCaseId(), entity.inputMappings(), entity.overrides()));
    }

    @Override
    public Flow save(Flow entity) {
        // decisionIds are not modeled in the domain Flow yet — carry them over from the stored
        // entity so a UI save never wipes what was authored in the YAML store.
        var existing = repository.findById(entity.getId().id(), FlowEntity.class).orElse(null);
        repository.save(new FlowEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getDescription(),
                entity.getArchetype(),
                entity.getTriggerAggregateId(),
                entity.getTriggerEvent(),
                entity.getTargetBoundedContextId(),
                entity.getReadModelName(),
                entity.getMaterializedFields(),
                entity.getTargetUseCaseId(),
                entity.getInputMappings(),
                entity.getOverrides(),
                existing != null ? existing.decisionIds() : List.of(),
                existing != null ? existing.triggerDomainServiceId() : null,
                existing != null ? existing.triggerUseCaseId() : null));
        return entity;
    }

    @Override
    public void deleteAllById(List<FlowId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(FlowId::id).toList(), FlowEntity.class);
    }
}
