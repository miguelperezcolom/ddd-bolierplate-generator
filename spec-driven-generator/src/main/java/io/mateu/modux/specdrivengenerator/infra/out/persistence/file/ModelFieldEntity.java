package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelFieldEntity(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        List<ModelFieldValidationEntity> validations
) {
}
