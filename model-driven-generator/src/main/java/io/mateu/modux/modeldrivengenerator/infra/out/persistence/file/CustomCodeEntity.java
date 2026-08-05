package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;
import lombok.Builder;

/**
 * A named piece of hand-written code, first-class on the map: mappings,
 * transformations and Custom use-case steps can point at it (customCodeId).
 * It is the shared face of the two-zone hook — the generator scaffolds around
 * it and the developer owns the body.
 */
@Builder(toBuilder = true)
public record CustomCodeEntity(
        String id,
        String name,
        /** e.g. java, sql, python — informative for now. */
        String language,
        /** What the code does, in natural language (feeds ai-complete). */
        String description,
        /** The elements this code touches (UI, use cases, models… — free-form intent). */
        java.util.List<String> usedElementIds
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public CustomCodeEntity {
        if (usedElementIds == null) usedElementIds = java.util.List.of();
    }

    /** Backward-compatible constructor (pre-usedElementIds callers and stores). */
    public CustomCodeEntity(String id, String name, String language, String description) {
        this(id, name, language, description, null, null);
    }
}
