package io.mateu.modux.specdrivengenerator.application.usecases.modelmapping;

import java.util.List;

public record ModelMappingRuleData(
        String id,
        String sourceFieldId,
        String targetFieldId,
        List<ModelMappingExpressionData> expressions
) {
}
