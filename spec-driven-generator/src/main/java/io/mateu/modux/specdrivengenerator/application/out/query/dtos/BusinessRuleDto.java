package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record BusinessRuleDto(
        String id,
        String name,
        String description,
        String modelId,
        Integer priority,
        boolean enabled,
        String ruleGroup,
        List<BusinessRuleConditionDto> conditions,
        List<BusinessRuleActionDto> actions
) {
}
