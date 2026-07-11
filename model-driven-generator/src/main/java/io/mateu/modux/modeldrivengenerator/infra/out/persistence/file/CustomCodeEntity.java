package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
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
        String description
) implements Identifiable {
}
