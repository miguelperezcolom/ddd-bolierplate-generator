package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record EntityEntity(String id, String name,
                           String modelId, String parentAggregateId, boolean isCollection,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description
) implements Identifiable {

    /** Backward-compatible constructor (pre-description callers). */
    public EntityEntity(String id, String name, String modelId, String parentAggregateId,
            boolean isCollection, String projectId) {
        this(id, name, modelId, parentAggregateId, isCollection, projectId, null);
    }
}
