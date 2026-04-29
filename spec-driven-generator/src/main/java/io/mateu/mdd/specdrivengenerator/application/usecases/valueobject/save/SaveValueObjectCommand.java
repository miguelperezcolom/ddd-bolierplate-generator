package io.mateu.mdd.specdrivengenerator.application.usecases.valueobject.save;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.EnumValue;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.ValueObjectField;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.ValueObjectType;
import io.mateu.uidl.data.FieldDataType;

import java.util.List;

public record SaveValueObjectCommand(String id,
                                     String name,
                                     ValueObjectType type,
                                     List<EnumValue> values,
                                     List<ValueObjectField> fields,
                                     FieldDataType dataType) {

}
