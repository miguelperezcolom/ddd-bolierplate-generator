package io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo;

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
