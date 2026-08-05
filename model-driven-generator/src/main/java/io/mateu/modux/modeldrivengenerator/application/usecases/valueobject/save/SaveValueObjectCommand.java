package io.mateu.modux.modeldrivengenerator.application.usecases.valueobject.save;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.EnumValue;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObjectField;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObjectType;
import io.mateu.modux.modeldrivengenerator.domain.shared.FieldDataType;

import java.util.List;

public record SaveValueObjectCommand(String id,
                                     String name,
                                     ValueObjectType type,
                                     List<EnumValue> values,
                                     List<ValueObjectField> fields,
                                     FieldDataType dataType) {

}
