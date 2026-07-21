package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record EntityEntity(String id, String name,
                           String modelId, String parentAggregateId, boolean isCollection,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description,
        /** The rules this entity protects — invariants live on entities too, not just aggregates. */
        List<InvariantEntity> invariants
) implements Identifiable {

    /** The invariants, never null. */
    public List<InvariantEntity> invariants() {
        return invariants != null ? invariants : List.of();
    }

    /** Backward-compatible constructor (pre-invariants callers). */
    public EntityEntity(String id, String name, String modelId, String parentAggregateId,
            boolean isCollection, String projectId, String description) {
        this(id, name, modelId, parentAggregateId, isCollection, projectId, description, List.of());
    }

    /** Backward-compatible constructor (pre-description callers). */
    public EntityEntity(String id, String name, String modelId, String parentAggregateId,
            boolean isCollection, String projectId) {
        this(id, name, modelId, parentAggregateId, isCollection, projectId, null, List.of());
    }
}
