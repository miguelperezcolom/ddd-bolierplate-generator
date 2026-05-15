package io.mateu.mdd.specdrivengenerator.domain.aggregates.model;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import lombok.Getter;

@Getter
public class Model {

    private ModelId id;
    private ModelName name;

    public static Model of(ModelId id, ModelName name) {
        var model = new Model();
        model.id = id;
        model.name = name;
        return model;
    }

    public static Model load(String id, String name) {
        var model = new Model();
        model.id = new ModelId(id);
        model.name = new ModelName(name);
        return model;
    }

    public void update(ModelName name) {
        this.name = name;
    }
}
