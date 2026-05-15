package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

public record InvariantConditionEntity(
        String id,
        String expression,
        boolean custom,
        String description,
        String errorMessage
) {
}
