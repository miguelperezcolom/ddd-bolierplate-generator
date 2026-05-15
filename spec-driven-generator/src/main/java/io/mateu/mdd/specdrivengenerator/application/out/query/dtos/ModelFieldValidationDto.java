package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationDto(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
