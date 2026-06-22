package io.mateu.modux.modeldrivengenerator.application.usecases.model;

import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelFieldData(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        boolean isEnum,
        String enumId,
        List<ModelFieldValidationData> validations
) {
}
