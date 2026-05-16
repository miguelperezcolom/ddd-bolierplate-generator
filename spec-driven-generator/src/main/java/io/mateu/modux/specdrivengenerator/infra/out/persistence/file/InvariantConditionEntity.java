package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record InvariantConditionEntity(
        String id,
        String expression,
        boolean custom,
        String description,
        String errorMessage
) {
}
