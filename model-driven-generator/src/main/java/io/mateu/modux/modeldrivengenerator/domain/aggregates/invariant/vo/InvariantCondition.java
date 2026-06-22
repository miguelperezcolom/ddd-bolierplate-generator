package io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo;

public record InvariantCondition(
        String id,
        String expression,
        boolean custom,
        String description,
        String errorMessage
) {
}
