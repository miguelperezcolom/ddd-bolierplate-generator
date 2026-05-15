package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.Model;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ModelEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelFileRepository implements ModelRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Model> findById(ModelId id) {
        return repository.findById(id.id(), ModelEntity.class)
                .map(entity -> Model.load(entity.id(), entity.name()));
    }

    @Override
    public Model save(Model entity) {
        repository.save(new ModelEntity(
                entity.getId().id(),
                entity.getName().name()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ModelId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ModelId::id).toList());
    }
}
