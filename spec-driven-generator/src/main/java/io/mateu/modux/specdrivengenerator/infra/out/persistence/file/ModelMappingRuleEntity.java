package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import java.util.List;

public record ModelMappingRuleEntity(
        String id,
        String sourceFieldId,
        String targetFieldId,
        List<ModelMappingExpressionEntity> expressions
) {
}
