package io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo;

public record InvariantCondition(
        String id,
        String expression,
        boolean custom,
        String description,
        String errorMessage
) {
}
