package io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject;

import io.mateu.modux.modeldrivengenerator.domain.shared.FieldDataType;
import io.mateu.modux.modeldrivengenerator.domain.shared.FieldStereotype;

public record ValueObjectField(
        String name,
        FieldDataType dataType,
        FieldStereotype stereotype
) {
}
