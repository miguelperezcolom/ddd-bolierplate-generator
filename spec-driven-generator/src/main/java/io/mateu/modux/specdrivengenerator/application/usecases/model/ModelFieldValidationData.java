package io.mateu.modux.specdrivengenerator.application.usecases.model;

import io.mateu.modux.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationData(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
