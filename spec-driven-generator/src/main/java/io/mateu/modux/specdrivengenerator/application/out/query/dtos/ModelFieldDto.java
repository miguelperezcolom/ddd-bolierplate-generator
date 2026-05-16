package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ModelFieldDto(
        String id,
        String name,
        boolean basicType,
        FieldDataType type,
        String modelId,
        List<ModelFieldValidationDto> validations
) {
}
