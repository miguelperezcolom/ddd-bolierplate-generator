package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationEntity(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
