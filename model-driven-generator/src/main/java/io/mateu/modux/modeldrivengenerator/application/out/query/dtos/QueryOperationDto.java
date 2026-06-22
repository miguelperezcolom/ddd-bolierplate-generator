package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;

public record QueryOperationDto(
        String id,
        String name,
        String description,
        String inputModelId,
        String outputModelId,
        QueryCardinality cardinality
) {
}
