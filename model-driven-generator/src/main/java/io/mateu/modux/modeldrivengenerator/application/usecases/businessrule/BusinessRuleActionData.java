package io.mateu.modux.modeldrivengenerator.application.usecases.businessrule;

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
