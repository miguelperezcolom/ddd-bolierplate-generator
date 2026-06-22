package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.shared.vo.PrimitiveType;

public record FieldDto(String name, String label, FieldTypeDto type, String help,
                       String valueObjectId,
                       String entityId,
                       PrimitiveType primitiveType,
                       boolean mandatory, boolean readonly, boolean visible,
                       boolean editable, boolean searchable, boolean filterable) {
}
