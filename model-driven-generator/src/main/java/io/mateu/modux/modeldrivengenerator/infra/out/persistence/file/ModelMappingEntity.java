package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * Copy-with-changes goes through {@code toBuilder()} — never through a positional
 * constructor: the compat constructor exists for legacy callers only, and copying
 * through it silently nulls every newer field.
 */
@Builder(toBuilder = true)
public record ModelMappingEntity(
        String id,
        String name,
        String sourceModelId,
        String targetModelId,
        boolean hasCustomPart,
        List<ModelMappingRuleEntity> rules,
        /** The hand-written code this mapping delegates to (CustomCodeEntity). */
        String customCodeId
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    /** Backward-compatible constructor (pre-customCodeId callers and stores). */
    public ModelMappingEntity(String id, String name, String sourceModelId, String targetModelId,
                              boolean hasCustomPart, List<ModelMappingRuleEntity> rules) {
        this(id, name, sourceModelId, targetModelId, hasCustomPart, rules, null, null);
    }
}
