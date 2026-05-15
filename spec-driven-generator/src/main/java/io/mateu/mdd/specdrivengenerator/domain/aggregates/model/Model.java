package io.mateu.mdd.specdrivengenerator.domain.aggregates.model;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelField;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import lombok.Getter;

import java.util.List;

@Getter
public class Model {

    private ModelId id;
    private ModelName name;
    private List<ModelField> fields;

    public static Model of(ModelId id, ModelName name, List<ModelField> fields) {
        var model = new Model();
        model.id = id;
        model.name = name;
        model.fields = fields != null ? fields : List.of();
        return model;
    }

    public static Model load(String id, String name, List<ModelField> fields) {
        var model = new Model();
        model.id = new ModelId(id);
        model.name = new ModelName(name);
        model.fields = fields != null ? fields : List.of();
        return model;
    }

    public void update(ModelName name, List<ModelField> fields) {
        this.name = name;
        this.fields = fields != null ? fields : List.of();
    }
}
