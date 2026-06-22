package io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo;

import java.util.List;

public record ModelMappingRule(
        String id,
        String sourceFieldId,
        String targetFieldId,
        List<ModelMappingExpression> expressions
) {
}
