package io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.BusinessRuleActionData;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.BusinessRuleConditionData;

import java.util.List;

public record SaveBusinessRuleCommand(
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
