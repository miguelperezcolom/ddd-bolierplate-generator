package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ModelMappingDto(String id, String name, String sourceModelId, String targetModelId,
                              boolean hasCustomPart, List<ModelMappingRuleDto> rules) {
}
