package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ReadModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.ReadModel;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ConsistencyLevel;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ReadModelEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReadModelFileRepository implements ReadModelRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<ReadModel> findById(ReadModelId id) {
        return repository.findById(id.id(), ReadModelEntity.class)
                .map(entity -> ReadModel.load(
                        entity.id(),
                        entity.name(),
                        entity.modelId(),
                        entity.storageType(),
                        entity.filterFields(),
                        entity.sortFields(),
                        entity.cacheable(),
                        entity.cacheTtlSeconds(),
                        entity.consistencyLevel(),
                        entity.maxStalenessMs()));
    }

    @Override
    public ReadModel save(ReadModel entity) {
        repository.save(new ReadModelEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getModelId(),
                entity.getStorageType() != null ? entity.getStorageType().name() : null,
                entity.getFilterFields(),
                entity.getSortFields(),
                entity.isCacheable(),
                entity.getCacheTtlSeconds(),
                entity.getConsistencyLevel() != null ? entity.getConsistencyLevel().name() : null,
                entity.getMaxStalenessMs()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ReadModelId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ReadModelId::id).toList());
    }
}
