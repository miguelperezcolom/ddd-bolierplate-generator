package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record BusinessRuleActionDto(
        String id,
        String type,
        String fieldId,
        String expression,
        String useCaseId,
        String domainEventId,
        String description
) {
}
