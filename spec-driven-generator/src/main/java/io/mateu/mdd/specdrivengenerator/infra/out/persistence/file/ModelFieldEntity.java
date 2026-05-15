package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.data.FieldDataType;

public record ModelFieldEntity(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId
) {
}
