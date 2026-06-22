package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record ModelMappingRuleDto(
        String id,
        String sourceFieldId,
        String targetFieldId,
        List<ModelMappingExpressionDto> expressions
) {
}
