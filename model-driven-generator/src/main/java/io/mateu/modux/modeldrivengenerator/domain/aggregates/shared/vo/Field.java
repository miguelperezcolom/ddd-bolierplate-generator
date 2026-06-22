package io.mateu.modux.modeldrivengenerator.domain.aggregates.shared.vo;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FieldTypeDto;

public record Field(String name, String label, FieldTypeDto type, String help,
                    String valueObjectId,
                    String entityId,
                    PrimitiveType primitiveType,
                    boolean mandatory,
                    boolean readonly,
                    boolean visible,
                    boolean editable,
                    boolean searchable,
                    boolean filterable) {
}
