package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

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
        List<DiagramEdgeEntity> edges,
        /** Containers folded by hand at this view/level (they render compact). */
        List<String> collapsed,
        /** Elements the sheet keeps expanded (the single-canvas world's toggle). */
        List<String> expanded,
        /**
         * Marks positions as ABSOLUTE (post-Archi flat sheets). Without persisting it,
         * the offsets→absolute migration re-ran on every reload, re-adding the owner's
         * position each time — children drifted thousands of pixels away.
         */
        Boolean flat,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    /** Backward-compatible constructor (pre-collapsed callers and stores). */
    public DiagramEntity(String id, String detail,
                         List<DiagramNodeEntity> nodes, List<DiagramEdgeEntity> edges) {
        this(id, detail, nodes, edges, List.of(), List.of(), null, null);
    }

    public DiagramEntity {
        if (expanded == null) expanded = List.of();
        nodes = nodes != null ? nodes : List.of();
        edges = edges != null ? edges : List.of();
        collapsed = collapsed != null ? collapsed : List.of();
    }
}
