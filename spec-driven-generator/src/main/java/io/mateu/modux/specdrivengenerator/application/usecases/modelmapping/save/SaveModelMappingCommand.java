package io.mateu.modux.specdrivengenerator.application.usecases.modelmapping.save;

import io.mateu.modux.specdrivengenerator.application.usecases.modelmapping.ModelMappingRuleData;

import java.util.List;

public record SaveModelMappingCommand(String id, String name, String sourceModelId, String targetModelId,
                                      boolean hasCustomPart, List<ModelMappingRuleData> rules) {
}
