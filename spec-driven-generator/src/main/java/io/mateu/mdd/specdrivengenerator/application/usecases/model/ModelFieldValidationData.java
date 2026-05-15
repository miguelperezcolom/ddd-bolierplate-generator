package io.mateu.mdd.specdrivengenerator.application.usecases.model;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationData(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
