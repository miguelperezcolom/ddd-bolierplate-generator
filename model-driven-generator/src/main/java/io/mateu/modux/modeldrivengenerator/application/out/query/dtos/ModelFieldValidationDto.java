package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationDto(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
