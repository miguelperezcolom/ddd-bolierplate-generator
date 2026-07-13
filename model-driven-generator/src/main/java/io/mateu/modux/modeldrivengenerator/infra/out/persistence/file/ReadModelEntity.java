package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import io.mateu.uidl.interfaces.Identifiable;

public record ReadModelEntity(
        String id,
        String name,
        String boundedContextId,
        String description,
        String modelId,
        ReadModelStorageType storageType,
        ReadModelConsistency consistency,
        /** The aggregate this read model is a view of (optional; its model seeds the shape). */
        String aggregateId
) implements Identifiable {

    /** Backward-compatible constructor (pre-aggregateId callers and stores). */
    public ReadModelEntity(String id, String name, String boundedContextId, String description,
                           String modelId, ReadModelStorageType storageType,
                           ReadModelConsistency consistency) {
        this(id, name, boundedContextId, description, modelId, storageType, consistency, null);
    }
}
