package io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo;

public record BusinessRuleCondition(
        String id,
        String expression,
        String description
) {
}
