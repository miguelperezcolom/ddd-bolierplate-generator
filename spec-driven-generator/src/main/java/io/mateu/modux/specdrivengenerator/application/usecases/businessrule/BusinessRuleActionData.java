package io.mateu.modux.specdrivengenerator.application.usecases.businessrule;

public record BusinessRuleActionData(
        String id,
        String type,
        String fieldId,
        String expression,
        String useCaseId,
        String domainEventId,
        String description
) {
}
