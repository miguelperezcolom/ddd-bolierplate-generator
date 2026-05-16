package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.modux.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationEntity(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
