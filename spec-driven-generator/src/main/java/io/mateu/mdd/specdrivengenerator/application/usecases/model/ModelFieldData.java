package io.mateu.mdd.specdrivengenerator.application.usecases.model;

import io.mateu.uidl.data.FieldDataType;

public record ModelFieldData(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId
) {
}
