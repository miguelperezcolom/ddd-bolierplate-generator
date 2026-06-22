package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record ModelMappingExpressionEntity(
        String id,
        String inputExpression,
        String outputExpression
) {
}
