package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

/**
 * A field (attribute) of something that has a shape — an aggregate root, an entity, or a
 * Record value object. The universal building block of the domain model: a NAME, whether it
 * is REQUIRED, and a TYPE. The type is a reference: a primitive (a {@code FieldDataType}
 * name in {@code typeRef}), a value object, an entity or an aggregate (their id in
 * {@code typeRef}). Its owner (aggregate / entity / value object) is {@code ownerId}.
 */
public record FieldEntity(
        String id,
        String name,
        boolean required,
        /** primitive | value-object | entity | aggregate */
        String typeKind,
        /** a FieldDataType name (primitive) or the referenced element's id (vo/entity/aggregate). */
        String typeRef,
        /** The aggregate, entity or (Record) value object this field belongs to. */
        String ownerId,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description
) implements Identifiable {

    /** Backward-compatible constructor (pre-description callers). */
    public FieldEntity(String id, String name, boolean required, String typeKind, String typeRef,
            String ownerId, String projectId) {
        this(id, name, required, typeKind, typeRef, ownerId, projectId, null);
    }
}
