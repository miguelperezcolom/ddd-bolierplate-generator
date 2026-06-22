package io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.save;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;

public record SaveReadModelCommand(
        String id,
        String name,
        String moduleId,
        String description,
        String modelId,
        ReadModelStorageType storageType,
        ReadModelConsistency consistency
) {
}
