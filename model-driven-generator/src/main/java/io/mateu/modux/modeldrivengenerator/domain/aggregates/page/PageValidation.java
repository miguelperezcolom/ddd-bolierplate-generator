package io.mateu.modux.modeldrivengenerator.domain.aggregates.page;

public record PageValidation(
        String condition,
        String fieldId,
        String message
) {
}
