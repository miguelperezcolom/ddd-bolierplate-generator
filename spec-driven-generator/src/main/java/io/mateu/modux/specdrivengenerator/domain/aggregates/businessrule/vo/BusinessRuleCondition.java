package io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo;

public record BusinessRuleCondition(
        String id,
        String expression,
        String description
) {
}
