package io.mateu.modux.specdrivengenerator.domain.aggregates.model.vo;

public record ModelFieldValidation(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
