package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import io.mateu.uidl.data.FieldDataType;

public record ModelFieldDto(
        String id,
        String name,
        FieldDataType type
) {
}
