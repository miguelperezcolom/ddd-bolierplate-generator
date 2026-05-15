package io.mateu.mdd.specdrivengenerator.domain.aggregates.model;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelField;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelValidation;
import lombok.Getter;

import java.util.List;

@Getter
public class Model {

    private ModelId id;
    private ModelName name;
    private List<ModelField> fields;
    private List<ModelValidation> validations;

    public static Model of(ModelId id, ModelName name, List<ModelField> fields, List<ModelValidation> validations) {
        var model = new Model();
        model.id = id;
        model.name = name;
        model.fields = fields != null ? fields : List.of();
        model.validations = validations != null ? validations : List.of();
        return model;
    }

    public static Model load(String id, String name, List<ModelField> fields, List<ModelValidation> validations) {
        var model = new Model();
        model.id = new ModelId(id);
        model.name = new ModelName(name);
        model.fields = fields != null ? fields : List.of();
        model.validations = validations != null ? validations : List.of();
        return model;
    }

    public void update(ModelName name, List<ModelField> fields, List<ModelValidation> validations) {
        this.name = name;
        this.fields = fields != null ? fields : List.of();
        this.validations = validations != null ? validations : List.of();
    }
}
