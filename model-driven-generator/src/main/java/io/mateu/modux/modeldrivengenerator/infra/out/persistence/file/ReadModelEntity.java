package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import io.mateu.uidl.interfaces.Identifiable;

public record ReadModelEntity(
        String id,
        String name,
        String serviceId,
        String description,
        String modelId,
        ReadModelStorageType storageType,
        ReadModelConsistency consistency
) implements Identifiable {
}
