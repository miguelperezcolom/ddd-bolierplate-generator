package io.mateu.modux.modeldrivengenerator.application.usecases.model;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationData(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
