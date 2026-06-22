package io.mateu.modux.modeldrivengenerator.domain.aggregates.enumdefinition;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.enumdefinition.vo.EnumDefinitionId;
import lombok.Getter;

import java.util.List;

@Getter
public class EnumDefinition {

    private EnumDefinitionId id;
    private List<EnumDefinitionValue> values;

    public static EnumDefinition of(EnumDefinitionId id, List<EnumDefinitionValue> values) {
        var enumDef = new EnumDefinition();
        enumDef.id = id;
        enumDef.values = values != null ? values : List.of();
        return enumDef;
    }

    public static EnumDefinition load(String id, List<EnumDefinitionValue> values) {
        var enumDef = new EnumDefinition();
        enumDef.id = new EnumDefinitionId(id);
        enumDef.values = values != null ? values : List.of();
        return enumDef;
    }

    public void update(List<EnumDefinitionValue> values) {
        this.values = values != null ? values : List.of();
    }
}
