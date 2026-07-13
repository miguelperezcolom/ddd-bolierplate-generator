package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

/**
 * Manual bend points for one diagram edge. {@code ref} is the editor's edge key, which encodes the
 * referenced elements (e.g. {@code rel:<sourceBoundedContextId>-><targetBoundedContextId>} for a context-map
 * relation). Only edges the user has adjusted by hand appear here.
 */
public record DiagramEdgeEntity(
        String ref,
        List<DiagramPointEntity> points
) {

    public DiagramEdgeEntity {
        points = points != null ? points : List.of();
    }
}
