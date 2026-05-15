package io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingSourceModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingTargetModelId;
import lombok.Getter;

@Getter
public class ModelMapping {

    private ModelMappingId id;
    private ModelMappingName name;
    private ModelMappingSourceModelId sourceModelId;
    private ModelMappingTargetModelId targetModelId;

    public static ModelMapping of(ModelMappingId id, ModelMappingName name,
                                  ModelMappingSourceModelId sourceModelId,
                                  ModelMappingTargetModelId targetModelId) {
        var mapping = new ModelMapping();
        mapping.id = id;
        mapping.name = name;
        mapping.sourceModelId = sourceModelId;
        mapping.targetModelId = targetModelId;
        return mapping;
    }

    public static ModelMapping load(String id, String name, String sourceModelId, String targetModelId) {
        var mapping = new ModelMapping();
        mapping.id = new ModelMappingId(id);
        mapping.name = new ModelMappingName(name);
        mapping.sourceModelId = sourceModelId != null ? new ModelMappingSourceModelId(sourceModelId) : null;
        mapping.targetModelId = targetModelId != null ? new ModelMappingTargetModelId(targetModelId) : null;
        return mapping;
    }

    public void update(ModelMappingName name, ModelMappingSourceModelId sourceModelId,
                       ModelMappingTargetModelId targetModelId) {
        this.name = name;
        this.sourceModelId = sourceModelId;
        this.targetModelId = targetModelId;
    }
}
