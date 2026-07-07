package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ProjectionEntity(
        String id,
        String name,
        String readModelId,
        List<ProjectionEventHandlerEntity> handlers,
        String rebuildStrategy,
        String errorHandlingStrategy,
        Integer maxRetries,
        boolean snapshotEnabled,
        Integer snapshotFrequency,
        /**
         * Alternative source: project the whole STATE of this aggregate instead of folding
         * individual domain events (handlers). How the state travels (CDC, snapshot events,
         * replication…) is a later decision — this only declares the projection.
         */
        String sourceAggregateId
) implements Identifiable {

    /** Backward-compatible constructor (pre-sourceAggregateId callers and stores). */
    public ProjectionEntity(String id, String name, String readModelId,
                            List<ProjectionEventHandlerEntity> handlers, String rebuildStrategy,
                            String errorHandlingStrategy, Integer maxRetries,
                            boolean snapshotEnabled, Integer snapshotFrequency) {
        this(id, name, readModelId, handlers, rebuildStrategy, errorHandlingStrategy, maxRetries,
                snapshotEnabled, snapshotFrequency, null);
    }
}
