package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

import io.mateu.uidl.interfaces.Identifiable;

public record ContextMapRelationEntity(
        String id,
        String name,
        String sourceBoundedContextId,
        String targetBoundedContextId,
        String type,
        String description,
        /** Architecture decisions (ADRs) this relation traces back to. */
        List<String> decisionIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-decisionIds callers). */
    public ContextMapRelationEntity(String id, String name, String sourceBoundedContextId,
                                    String targetBoundedContextId, String type, String description) {
        this(id, name, sourceBoundedContextId, targetBoundedContextId, type, description, List.of());
    }
}
