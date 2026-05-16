package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationDto(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
