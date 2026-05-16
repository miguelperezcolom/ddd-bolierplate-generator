package io.mateu.modux.specdrivengenerator.application.usecases.valueobject.save;

import io.mateu.modux.specdrivengenerator.domain.aggregates.valueobject.EnumValue;
import io.mateu.modux.specdrivengenerator.domain.aggregates.valueobject.ValueObjectField;
import io.mateu.modux.specdrivengenerator.domain.aggregates.valueobject.ValueObjectType;
import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record SaveValueObjectCommand(String id,
                                     String name,
                                     ValueObjectType type,
                                     List<EnumValue> values,
                                     List<ValueObjectField> fields,
                                     FieldDataType dataType) {

}
