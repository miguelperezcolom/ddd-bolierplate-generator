package io.mateu.modux.specdrivengenerator.domain.aggregates.page;

public record PageValidation(
        String condition,
        String fieldId,
        String message
) {
}
