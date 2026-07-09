package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ModelMappingRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.ModelMapping;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingExpression;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingRule;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingExpressionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingRuleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelMappingFileRepository implements ModelMappingRepository {

    final ModelStore repository;

    @Override
    public Optional<ModelMapping> findById(ModelMappingId id) {
        return repository.findById(id.id(), ModelMappingEntity.class)
                .map(entity -> ModelMapping.load(entity.id(), entity.name(),
                        entity.sourceModelId(), entity.targetModelId(),
                        entity.hasCustomPart(), toRules(entity.rules())));
    }

    @Override
    public ModelMapping save(ModelMapping entity) {
        repository.save(new ModelMappingEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getSourceModelId() != null ? entity.getSourceModelId().id() : null,
                entity.getTargetModelId() != null ? entity.getTargetModelId().id() : null,
                entity.getHasCustomPart().value(),
                toRuleEntities(entity.getRules())));
        return entity;
    }

    @Override
    public void deleteAllById(List<ModelMappingId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ModelMappingId::id).toList(), ModelMappingEntity.class);
    }

    private List<ModelMappingRule> toRules(List<ModelMappingRuleEntity> rules) {
        if (rules == null) return List.of();
        return rules.stream().map(r -> new ModelMappingRule(r.id(), r.sourceFieldId(), r.targetFieldId(),
                r.expressions() == null ? List.of() :
                        r.expressions().stream()
                                .map(e -> new ModelMappingExpression(e.id(), e.inputExpression(), e.outputExpression()))
                                .toList())).toList();
    }

    private List<ModelMappingRuleEntity> toRuleEntities(List<ModelMappingRule> rules) {
        if (rules == null) return List.of();
        return rules.stream().map(r -> new ModelMappingRuleEntity(r.id(), r.sourceFieldId(), r.targetFieldId(),
                r.expressions() == null ? List.of() :
                        r.expressions().stream()
                                .map(e -> new ModelMappingExpressionEntity(e.id(), e.inputExpression(), e.outputExpression()))
                                .toList())).toList();
    }
}
