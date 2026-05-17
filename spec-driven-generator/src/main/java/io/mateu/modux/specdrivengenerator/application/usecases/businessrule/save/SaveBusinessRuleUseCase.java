package io.mateu.modux.specdrivengenerator.application.usecases.businessrule.save;

import io.mateu.modux.specdrivengenerator.application.out.repositories.BusinessRuleRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleAction;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleActionType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleCondition;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveBusinessRuleUseCase {

    final BusinessRuleRepository repository;

    public void handle(SaveBusinessRuleCommand command) {
        var rule = repository.findById(new BusinessRuleId(command.id())).orElseThrow();
        rule.update(
                new BusinessRuleName(command.name()),
                command.description(),
                command.modelId(),
                command.priority(),
                command.enabled(),
                command.ruleGroup(),
                toConditions(command.conditions()),
                toActions(command.actions()));
        repository.save(rule);
    }

    private List<BusinessRuleCondition> toConditions(List<io.mateu.modux.specdrivengenerator.application.usecases.businessrule.BusinessRuleConditionData> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new BusinessRuleCondition(c.id(), c.expression(), c.description()))
                .toList();
    }

    private List<BusinessRuleAction> toActions(List<io.mateu.modux.specdrivengenerator.application.usecases.businessrule.BusinessRuleActionData> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new BusinessRuleAction(a.id(),
                        a.type() != null ? BusinessRuleActionType.valueOf(a.type()) : null,
                        a.fieldId(), a.expression(), a.useCaseId(), a.domainEventId(), a.description()))
                .toList();
    }
}
