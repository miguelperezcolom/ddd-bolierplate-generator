package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * Persisted geometry for one editor diagram (presentation state). Like {@link ViewEntity}, it only
 * <em>references</em> catalog elements by id — it never owns or copies them. Keeping the drawing in
 * its own section leaves the authored elements free of paint concerns while the whole spec (model +
 * diagrams) still lives in a single schema-validated store.
 *
 * <p>The id is the editor view key ({@code context-map}, {@code aggregates}, {@code flows},
 * {@code processes}).
 */
public record DiagramEntity(
        String id,
        String detail,                  // context-map detail level: "contexts" or "detail"
        List<DiagramNodeEntity> nodes,
        List<DiagramEdgeEntity> edges
) implements Identifiable {

    public DiagramEntity {
        nodes = nodes != null ? nodes : List.of();
        edges = edges != null ? edges : List.of();
    }
}
