package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

public record ContextMapRelationEntity(
        String id,
        String name,
        String sourceModuleId,
        String targetModuleId,
        String type,
        String description,
        /** Architecture decisions (ADRs) this relation traces back to. */
        List<String> decisionIds
) {

    /** Backward-compatible constructor (pre-decisionIds callers). */
    public ContextMapRelationEntity(String id, String name, String sourceModuleId,
                                    String targetModuleId, String type, String description) {
        this(id, name, sourceModuleId, targetModuleId, type, description, List.of());
    }
}
