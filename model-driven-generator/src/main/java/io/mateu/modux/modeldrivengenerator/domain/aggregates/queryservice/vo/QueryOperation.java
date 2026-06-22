package io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo;

public record QueryOperation(
        String id,
        String name,
        String description,
        String inputModelId,
        String outputModelId,
        QueryCardinality cardinality
) {
}
