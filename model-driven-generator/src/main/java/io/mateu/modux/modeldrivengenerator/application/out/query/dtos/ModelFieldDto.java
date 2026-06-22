package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelFieldDto(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        boolean isEnum,
        String enumId,
        List<ModelFieldValidationDto> validations
) {
}
