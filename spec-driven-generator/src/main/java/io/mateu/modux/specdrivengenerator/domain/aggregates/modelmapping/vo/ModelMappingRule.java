package io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo;

import java.util.List;

public record ModelMappingRule(
        String id,
        String sourceFieldId,
        String targetFieldId,
        List<ModelMappingExpression> expressions
) {
}
