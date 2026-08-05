package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.shared.FieldDataType;
import io.mateu.modux.modeldrivengenerator.domain.shared.FieldStereotype;

public record ValueObjectFieldDto(
        String name,
        FieldDataType dataType,
        FieldStereotype stereotype
) {
}
