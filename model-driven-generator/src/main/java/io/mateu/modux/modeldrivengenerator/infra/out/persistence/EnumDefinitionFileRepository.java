package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.EnumDefinitionRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.enumdefinition.EnumDefinition;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.enumdefinition.EnumDefinitionValue;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.enumdefinition.vo.EnumDefinitionId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EnumEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EnumValueEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnumDefinitionFileRepository implements EnumDefinitionRepository {

    final ModelStore repository;

    @Override
    public Optional<EnumDefinition> findById(EnumDefinitionId id) {
        return repository.findById(id.id(), EnumEntity.class)
                .map(entity -> EnumDefinition.load(entity.id(), toValues(entity.values())));
    }

    @Override
    public EnumDefinition save(EnumDefinition entity) {
        var valueEntities = entity.getValues() == null ? List.<EnumValueEntity>of() :
                entity.getValues().stream()
                        .map(v -> new EnumValueEntity(v.id(), v.name()))
                        .toList();
        repository.save(new EnumEntity(entity.getId().id(), valueEntities));
        return entity;
    }

    @Override
    public void deleteAllById(List<EnumDefinitionId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(EnumDefinitionId::id).toList(), EnumEntity.class);
    }

    private List<EnumDefinitionValue> toValues(List<EnumValueEntity> values) {
        if (values == null) return List.of();
        return values.stream().map(v -> new EnumDefinitionValue(v.id(), v.name())).toList();
    }
}
