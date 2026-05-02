package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import io.mateu.uidl.data.FieldDataType;
import io.mateu.uidl.data.FieldStereotype;

public record ValueObjectFieldDto(
        String name,
        FieldDataType dataType,
        FieldStereotype stereotype
) {
}
