package io.mateu.mdd.specdrivengenerator.application.usecases.model;

import io.mateu.uidl.data.FieldDataType;

public record ModelFieldData(
        String id,
        String name,
        FieldDataType type
) {
}
