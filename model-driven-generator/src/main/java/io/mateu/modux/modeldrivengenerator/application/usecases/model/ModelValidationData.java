package io.mateu.modux.modeldrivengenerator.application.usecases.model;

public record ModelValidationData(
        String id,
        String condition,
        String fieldIds,
        String message
) {
}
