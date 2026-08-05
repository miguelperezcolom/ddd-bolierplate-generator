package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ValueObjectRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObject;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.vo.ValueObjectId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ValueObjectEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static io.mateu.modux.modeldrivengenerator.domain.shared.Json.toJson;

@Service
@RequiredArgsConstructor
public class ValueObjectFileRepository implements ValueObjectRepository {

    final ModelStore repository;

    @Override
    public Optional<ValueObject> findById(ValueObjectId id) {
        return repository.findById(id.id(), ValueObjectEntity.class)
                .map(entity -> ValueObject.load(
                        entity.id(),
                        entity.name(),
                        entity.type(),
                        entity.valuesJson(),
                        entity.fieldsJson(),
                        entity.dataType()
                        ));
    }

    @Override
    public ValueObject save(ValueObject entity) {
        repository.save(new ValueObjectEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getType().name(),
                (entity.getValues() != null && !entity.getValues().isEmpty()) ? toJson(entity.getValues()) : null,
                (entity.getFields() != null && !entity.getFields().isEmpty()) ? toJson(entity.getFields()) : null,
                entity.getDataType() != null?entity.getDataType().name():null
                , null));
        return entity;
    }

    @Override
    public void deleteAllById(List<ValueObjectId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ValueObjectId::id).toList(), ValueObjectEntity.class);
    }
}
