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
        String sourceAggregateId,
        /** Alternative source: poll an external system's operation into the read model. */
        String sourceExternalUseCaseId,
        /** Alternative source: poll a legacy/external system's table into the read model. */
        String sourceExternalTableId
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    /** Backward-compatible constructor (pre-external-sources callers and stores). */
    public ProjectionEntity(String id, String name, String readModelId,
                            List<ProjectionEventHandlerEntity> handlers, String rebuildStrategy,
                            String errorHandlingStrategy, Integer maxRetries,
                            boolean snapshotEnabled, Integer snapshotFrequency,
                            String sourceAggregateId) {
        this(id, name, readModelId, handlers, rebuildStrategy, errorHandlingStrategy, maxRetries,
                snapshotEnabled, snapshotFrequency, sourceAggregateId, null, null, null);
    }

    /** Backward-compatible constructor (pre-sourceAggregateId callers and stores). */
    public ProjectionEntity(String id, String name, String readModelId,
                            List<ProjectionEventHandlerEntity> handlers, String rebuildStrategy,
                            String errorHandlingStrategy, Integer maxRetries,
                            boolean snapshotEnabled, Integer snapshotFrequency) {
        this(id, name, readModelId, handlers, rebuildStrategy, errorHandlingStrategy, maxRetries,
                snapshotEnabled, snapshotFrequency, null, null, null, null);
    }
}
