package io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo;

import io.mateu.uidl.data.FieldDataType;

public record ModelField(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId
) {
}
