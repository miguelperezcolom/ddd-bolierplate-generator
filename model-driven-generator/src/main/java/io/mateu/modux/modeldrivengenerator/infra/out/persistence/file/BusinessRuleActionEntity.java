package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record BusinessRuleActionEntity(
        String id,
        String type,
        String fieldId,
        String expression,
        String useCaseId,
        String domainEventId,
        String description
) {
}
