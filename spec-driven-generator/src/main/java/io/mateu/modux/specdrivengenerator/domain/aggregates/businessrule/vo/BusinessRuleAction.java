package io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo;

public record BusinessRuleAction(
        String id,
        BusinessRuleActionType type,
        String fieldId,
        String expression,
        String useCaseId,
        String domainEventId,
        String description
) {
}
