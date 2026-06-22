package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.EntityRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.Entity;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.vo.EntityId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EntityFileRepository implements EntityRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Entity> findById(EntityId id) {
        return repository.findById(id.id(), EntityEntity.class)
                .map(entity -> Entity.load(entity.id(), entity.name(),
                        entity.modelId(), entity.parentAggregateId(), entity.isCollection()));
    }

    @Override
    public Entity save(Entity entity) {
        repository.save(new EntityEntity(entity.getId().id(), entity.getName().name(),
                entity.getModelId(), entity.getParentAggregateId(), entity.isCollection()));
        return entity;
    }

    @Override
    public void deleteAllById(List<EntityId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(EntityId::id).toList(), EntityEntity.class);
    }
}
