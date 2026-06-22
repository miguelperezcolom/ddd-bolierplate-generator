package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record BusinessRuleConditionEntity(
        String id,
        String expression,
        String description
) {
}
