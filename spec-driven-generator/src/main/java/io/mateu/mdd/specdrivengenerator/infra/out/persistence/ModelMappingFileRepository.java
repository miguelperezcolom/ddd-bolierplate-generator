package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelMappingRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.ModelMapping;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelMappingFileRepository implements ModelMappingRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<ModelMapping> findById(ModelMappingId id) {
        return repository.findById(id.id(), ModelMappingEntity.class)
                .map(entity -> ModelMapping.load(entity.id(), entity.name(),
                        entity.sourceModelId(), entity.targetModelId()));
    }

    @Override
    public ModelMapping save(ModelMapping entity) {
        repository.save(new ModelMappingEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getSourceModelId() != null ? entity.getSourceModelId().id() : null,
                entity.getTargetModelId() != null ? entity.getTargetModelId().id() : null));
        return entity;
    }

    @Override
    public void deleteAllById(List<ModelMappingId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ModelMappingId::id).toList());
    }
}
