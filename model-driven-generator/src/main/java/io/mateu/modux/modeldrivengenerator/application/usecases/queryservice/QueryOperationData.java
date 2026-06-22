package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;

public record QueryOperationData(
        String id,
        String name,
        String description,
        String inputModelId,
        String outputModelId,
        QueryCardinality cardinality
) {
}
