package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record BusinessRuleConditionEntity(
        String id,
        String expression,
        String description
) {
}
