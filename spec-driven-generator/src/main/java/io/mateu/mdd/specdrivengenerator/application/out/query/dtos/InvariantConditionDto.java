package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

public record InvariantConditionDto(
        String id,
        String expression,
        boolean custom,
        String description,
        String errorMessage
) {
}
