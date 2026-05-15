package io.mateu.mdd.specdrivengenerator.application.usecases.model;

import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelFieldData(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        List<ModelFieldValidationData> validations
) {
}
