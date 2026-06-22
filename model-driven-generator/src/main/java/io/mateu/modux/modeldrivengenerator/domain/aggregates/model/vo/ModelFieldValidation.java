package io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo;

public record ModelFieldValidation(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
