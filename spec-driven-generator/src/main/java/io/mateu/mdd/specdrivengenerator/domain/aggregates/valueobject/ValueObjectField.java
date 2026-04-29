package io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject;

import io.mateu.uidl.data.FieldDataType;
import io.mateu.uidl.data.FieldStereotype;

public record ValueObjectField(
        String name,
        FieldDataType dataType,
        FieldStereotype stereotype
) {
}
