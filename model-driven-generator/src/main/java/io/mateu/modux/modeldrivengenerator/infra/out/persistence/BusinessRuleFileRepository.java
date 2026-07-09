package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.BusinessRuleRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.BusinessRule;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleAction;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleActionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleCondition;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BusinessRuleActionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BusinessRuleConditionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BusinessRuleEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BusinessRuleFileRepository implements BusinessRuleRepository {

    final ModelStore repository;

    @Override
    public Optional<BusinessRule> findById(BusinessRuleId id) {
        return repository.findById(id.id(), BusinessRuleEntity.class)
                .map(entity -> BusinessRule.load(
                        entity.id(),
                        entity.name(),
                        entity.description(),
                        entity.modelId(),
                        entity.priority(),
                        entity.enabled(),
                        entity.ruleGroup(),
                        toConditions(entity.conditions()),
                        toActions(entity.actions())));
    }

    @Override
    public BusinessRule save(BusinessRule entity) {
        repository.save(new BusinessRuleEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getDescription(),
                entity.getModelId(),
                entity.getPriority(),
                entity.isEnabled(),
                entity.getRuleGroup(),
                toConditionEntities(entity.getConditions()),
                toActionEntities(entity.getActions())));
        return entity;
    }

    @Override
    public void deleteAllById(List<BusinessRuleId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(BusinessRuleId::id).toList(), BusinessRuleEntity.class);
    }

    private List<BusinessRuleCondition> toConditions(List<BusinessRuleConditionEntity> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new BusinessRuleCondition(c.id(), c.expression(), c.description()))
                .toList();
    }

    private List<BusinessRuleConditionEntity> toConditionEntities(List<BusinessRuleCondition> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new BusinessRuleConditionEntity(c.id(), c.expression(), c.description()))
                .toList();
    }

    private List<BusinessRuleAction> toActions(List<BusinessRuleActionEntity> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new BusinessRuleAction(a.id(),
                        a.type() != null ? BusinessRuleActionType.valueOf(a.type()) : null,
                        a.fieldId(), a.expression(), a.useCaseId(), a.domainEventId(), a.description()))
                .toList();
    }

    private List<BusinessRuleActionEntity> toActionEntities(List<BusinessRuleAction> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new BusinessRuleActionEntity(a.id(),
                        a.type() != null ? a.type().name() : null,
                        a.fieldId(), a.expression(), a.useCaseId(), a.domainEventId(), a.description()))
                .toList();
    }
}
