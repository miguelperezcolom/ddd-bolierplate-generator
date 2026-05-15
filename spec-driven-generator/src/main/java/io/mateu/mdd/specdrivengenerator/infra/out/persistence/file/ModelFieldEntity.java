package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.data.FieldDataType;

public record ModelFieldEntity(
        String id,
        String name,
        FieldDataType type
) {
}
