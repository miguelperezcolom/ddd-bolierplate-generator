package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

/**
 * A hand-drawn ArchiMate relationship between ANY two catalog elements — pure
 * architectural documentation, complementing the relations modux derives. The
 * type is one of the ArchiMate 3 vocabulary: composition, aggregation,
 * assignment, realization, serving, access, influence, association,
 * specialization, triggering, flow.
 */
@lombok.Builder(toBuilder = true)
public record ArchimateRelationEntity(
        String id,
        String sourceId,
        String targetId,
        String type,
        /** Optional label (e.g. the influence sign, or a name for an association). */
        String label
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
