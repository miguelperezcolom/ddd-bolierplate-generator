package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProjectionRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.Projection;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandler;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.ProjectionId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEventHandlerEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectionFileRepository implements ProjectionRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Projection> findById(ProjectionId id) {
        return repository.findById(id.id(), ProjectionEntity.class)
                .map(entity -> Projection.load(
                        entity.id(),
                        entity.name(),
                        entity.readModelId(),
                        toHandlers(entity.handlers()),
                        entity.rebuildStrategy(),
                        entity.errorHandlingStrategy(),
                        entity.maxRetries(),
                        entity.snapshotEnabled(), entity.snapshotFrequency()));
    }

    @Override
    public Projection save(Projection entity) {
        // sourceAggregateId is not modeled in the domain Projection yet — carry it over from
        // the stored entity so a UI save never wipes what was authored in the YAML store.
        var existing = repository.findById(entity.getId().id(), ProjectionEntity.class).orElse(null);
        repository.save(new ProjectionEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getReadModelId() != null ? entity.getReadModelId().id() : null,
                toHandlerEntities(entity.getHandlers()),
                entity.getRebuildStrategy() != null ? entity.getRebuildStrategy().name() : null,
                entity.getErrorHandlingStrategy() != null ? entity.getErrorHandlingStrategy().name() : null,
                entity.getMaxRetries(),
                entity.isSnapshotEnabled(), entity.getSnapshotFrequency(),
                existing != null ? existing.sourceAggregateId() : null));
        return entity;
    }

    @Override
    public void deleteAllById(List<ProjectionId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ProjectionId::id).toList(), ProjectionEntity.class);
    }

    private List<ProjectionEventHandler> toHandlers(List<ProjectionEventHandlerEntity> handlers) {
        if (handlers == null) return List.of();
        return handlers.stream()
                .map(h -> new ProjectionEventHandler(h.id(), h.name(), h.domainEventId(), h.type(), h.modelMappingId()))
                .toList();
    }

    private List<ProjectionEventHandlerEntity> toHandlerEntities(List<ProjectionEventHandler> handlers) {
        if (handlers == null) return List.of();
        return handlers.stream()
                .map(h -> new ProjectionEventHandlerEntity(h.id(), h.name(), h.domainEventId(), h.type(), h.modelMappingId()))
                .toList();
    }
}
