package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;

public record QueryOperationEntity(
        String id,
        String name,
        String description,
        String inputModelId,
        String outputModelId,
        QueryCardinality cardinality
) {
}
