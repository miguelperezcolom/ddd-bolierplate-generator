package io.mateu.mdd.specdrivengenerator.application.usecases.invariant;

public record InvariantConditionData(
        String id,
        String expression,
        boolean custom,
        String description,
        String errorMessage
) {
}
