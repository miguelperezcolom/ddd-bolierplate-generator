package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;

public record ModelFieldValidationEntity(
        String id,
        ModelFieldValidationType type,
        String params
) {
}
