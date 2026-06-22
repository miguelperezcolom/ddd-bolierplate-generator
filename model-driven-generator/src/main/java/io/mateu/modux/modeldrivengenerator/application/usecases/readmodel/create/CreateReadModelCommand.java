package io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.create;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;

public record CreateReadModelCommand(
        String id,
        String name,
        String moduleId,
        String description,
        String modelId,
        ReadModelStorageType storageType,
        ReadModelConsistency consistency
) {
}
