package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelFieldEntity(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        @JsonProperty("enum") boolean isEnum,
        String enumId,
        List<ModelFieldValidationEntity> validations
) {
}
