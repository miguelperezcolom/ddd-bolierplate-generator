package io.mateu.mdd.specdrivengenerator.application.usecases.model;

public record ModelValidationData(
        String id,
        String condition,
        String fieldIds,
        String message
) {
}
