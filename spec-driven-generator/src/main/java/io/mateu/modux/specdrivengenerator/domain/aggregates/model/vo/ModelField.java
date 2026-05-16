package io.mateu.modux.specdrivengenerator.domain.aggregates.model.vo;

import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelField(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        List<ModelFieldValidation> validations
) {
}
