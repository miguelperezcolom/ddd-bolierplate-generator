package io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping;

import java.util.List;

public record ModelMappingRuleData(
        String id,
        String sourceFieldId,
        String targetFieldId,
        List<ModelMappingExpressionData> expressions
) {
}
