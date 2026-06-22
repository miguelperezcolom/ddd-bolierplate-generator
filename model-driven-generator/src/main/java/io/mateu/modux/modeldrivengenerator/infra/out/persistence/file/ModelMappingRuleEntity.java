package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

public record ModelMappingRuleEntity(
        String id,
        String sourceFieldId,
        String targetFieldId,
        List<ModelMappingExpressionEntity> expressions
) {
}
