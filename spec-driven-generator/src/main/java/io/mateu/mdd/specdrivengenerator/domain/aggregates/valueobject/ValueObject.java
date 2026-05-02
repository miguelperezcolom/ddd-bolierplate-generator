package io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.vo.ValueObjectId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.vo.ValueObjectName;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.data.FieldDataType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

import static io.mateu.core.infra.JsonSerializer.listFromJson;

@Getter
public class ValueObject {

    private ValueObjectId id;
    private ValueObjectName name;
    private ValueObjectType type;
    private List<EnumValue> values;
    private List<ValueObjectField> fields;
    private FieldDataType dataType;

    public static ValueObject of(ValueObjectId id,
                                 ValueObjectName name,
                                 ValueObjectType type,
                                 List<EnumValue> values,
                                 List<ValueObjectField> fields,
                                 FieldDataType dataType
    ) {
        var valueObject = new ValueObject();
        valueObject.id = id;
        valueObject.name = name;
        valueObject.values = values;
        valueObject.fields = fields;
        valueObject.dataType = dataType;
        valueObject.type = type;
        return valueObject;
    }

    public static ValueObject load(String id,
                                   String name,
                                   String type,
                                   String values,
                                   String fields,
                                   String dataType
    ) {
        var valueObject = new ValueObject();
        valueObject.id = new ValueObjectId(id);
        valueObject.name = new ValueObjectName(name);
        valueObject.values = listFromJson(values, EnumValue.class);
        valueObject.fields = listFromJson(fields, ValueObjectField.class);
        valueObject.dataType = dataType != null?FieldDataType.valueOf(dataType):null;
        valueObject.type = type != null?ValueObjectType.valueOf(type):null;
        return valueObject;
    }

    public void update(ValueObjectName name,
                       ValueObjectType type,
                       List<EnumValue> values,
                       List<ValueObjectField> fields,
                       FieldDataType dataType
    ) {
        this.name = name;
        this.values = values;
        this.fields = fields;
        this.dataType = dataType;
        this.type = type;
    }
}
