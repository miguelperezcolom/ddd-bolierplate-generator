package io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo;

import io.mateu.modux.modeldrivengenerator.domain.shared.FieldDataType;

import java.util.List;

public record ModelField(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        boolean isEnum,
        String enumId,
        List<ModelFieldValidation> validations
) {
}
