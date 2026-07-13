package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;

public record ReadModelDto(
        String id,
        String name,
        String boundedContextId,
        String description,
        String modelId,
        ReadModelStorageType storageType,
        ReadModelConsistency consistency
) {
}
