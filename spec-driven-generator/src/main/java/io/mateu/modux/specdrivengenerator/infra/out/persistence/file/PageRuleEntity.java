package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record PageRuleEntity(
        String filter,
        String action,
        String fieldName,
        String fieldAttribute,
        String value,
        String expression,
        String actionId,
        String result
) {
}
