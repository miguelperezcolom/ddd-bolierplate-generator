package io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping.ModelMappingRuleData;

import java.util.List;

public record CreateModelMappingCommand(String id, String name, String sourceModelId, String targetModelId,
                                        boolean hasCustomPart, List<ModelMappingRuleData> rules) {
}
