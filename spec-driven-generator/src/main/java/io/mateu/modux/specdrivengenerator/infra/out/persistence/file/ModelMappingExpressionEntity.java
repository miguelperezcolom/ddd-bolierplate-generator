package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record ModelMappingExpressionEntity(
        String id,
        String inputExpression,
        String outputExpression
) {
}
