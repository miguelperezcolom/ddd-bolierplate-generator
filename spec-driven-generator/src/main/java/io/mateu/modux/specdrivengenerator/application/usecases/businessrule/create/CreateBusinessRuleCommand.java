package io.mateu.modux.specdrivengenerator.application.usecases.businessrule.create;

import io.mateu.modux.specdrivengenerator.application.usecases.businessrule.BusinessRuleActionData;
import io.mateu.modux.specdrivengenerator.application.usecases.businessrule.BusinessRuleConditionData;

import java.util.List;

public record CreateBusinessRuleCommand(
        String id,
        String name,
        String description,
        String modelId,
        Integer priority,
        boolean enabled,
        String ruleGroup,
        List<BusinessRuleConditionData> conditions,
        List<BusinessRuleActionData> actions
) {
}
