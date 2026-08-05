package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

import java.util.List;

/**
 * A view: a curated, cross-cutting projection over the catalog. It only <em>references</em> elements
 * (by id) — it never owns or copies them, so there is a single source of truth. Used for navigation,
 * scoped editing and (after expanding to its dependency closure) scoped generation. See
 * {@code docs/design/catalog-and-views.md}.
 */
public record ViewEntity(
        String id,
        String name,
        String description,
        String kind,            // "CURATED" (members listed) or "COMPUTED" (members derived from a seed)
        List<String> memberIds,
        String seedId           // COMPUTED: the element whose dependency closure is the view
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    @Override
    public List<String> memberIds() {
        return memberIds != null ? memberIds : List.of();
    }

    @com.fasterxml.jackson.annotation.JsonIgnore
    public boolean isComputed() {
        return "COMPUTED".equalsIgnoreCase(kind) && seedId != null && !seedId.isBlank();
    }
}
