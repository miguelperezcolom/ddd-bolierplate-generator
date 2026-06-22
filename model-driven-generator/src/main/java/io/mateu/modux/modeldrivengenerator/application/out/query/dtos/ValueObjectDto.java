package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObjectType;
import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record ValueObjectDto(String id,
                             String name,
                             ValueObjectType type,
                             List<EnumValueDto> values,
                             List<ValueObjectFieldDto> fields,
                             FieldDataType dataType
                             ) {
}
