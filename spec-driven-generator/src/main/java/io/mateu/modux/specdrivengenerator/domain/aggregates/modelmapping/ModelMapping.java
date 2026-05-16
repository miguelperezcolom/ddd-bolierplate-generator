package io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping;

import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingHasCustomPart;
import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingRule;
import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingSourceModelId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingTargetModelId;
import lombok.Getter;

import java.util.List;

@Getter
public class ModelMapping {

    private ModelMappingId id;
    private ModelMappingName name;
    private ModelMappingSourceModelId sourceModelId;
    private ModelMappingTargetModelId targetModelId;
    private ModelMappingHasCustomPart hasCustomPart;
    private List<ModelMappingRule> rules;

    public static ModelMapping of(ModelMappingId id, ModelMappingName name,
                                  ModelMappingSourceModelId sourceModelId,
                                  ModelMappingTargetModelId targetModelId,
                                  ModelMappingHasCustomPart hasCustomPart,
                                  List<ModelMappingRule> rules) {
        var mapping = new ModelMapping();
        mapping.id = id;
        mapping.name = name;
        mapping.sourceModelId = sourceModelId;
        mapping.targetModelId = targetModelId;
        mapping.hasCustomPart = hasCustomPart;
        mapping.rules = rules != null ? rules : List.of();
        return mapping;
    }

    public static ModelMapping load(String id, String name, String sourceModelId, String targetModelId,
                                    boolean hasCustomPart, List<ModelMappingRule> rules) {
        var mapping = new ModelMapping();
        mapping.id = new ModelMappingId(id);
        mapping.name = new ModelMappingName(name);
        mapping.sourceModelId = sourceModelId != null ? new ModelMappingSourceModelId(sourceModelId) : null;
        mapping.targetModelId = targetModelId != null ? new ModelMappingTargetModelId(targetModelId) : null;
        mapping.hasCustomPart = new ModelMappingHasCustomPart(hasCustomPart);
        mapping.rules = rules != null ? rules : List.of();
        return mapping;
    }

    public void update(ModelMappingName name, ModelMappingSourceModelId sourceModelId,
                       ModelMappingTargetModelId targetModelId,
                       ModelMappingHasCustomPart hasCustomPart,
                       List<ModelMappingRule> rules) {
        this.name = name;
        this.sourceModelId = sourceModelId;
        this.targetModelId = targetModelId;
        this.hasCustomPart = hasCustomPart;
        this.rules = rules != null ? rules : List.of();
    }
}
