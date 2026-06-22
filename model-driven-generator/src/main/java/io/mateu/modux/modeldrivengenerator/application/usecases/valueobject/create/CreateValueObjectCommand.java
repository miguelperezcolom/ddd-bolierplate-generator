package io.mateu.modux.modeldrivengenerator.application.usecases.valueobject.create;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.EnumValue;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObjectField;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObjectType;
import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record CreateValueObjectCommand(
        String id,
        String name,
        ValueObjectType type,
        List<EnumValue> values,
        List<ValueObjectField> fields,
        FieldDataType dataType) {

}
