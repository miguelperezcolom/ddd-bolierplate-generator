package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

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
        String kind,            // "CURATED" (default); "COMPUTED" is reserved for a future phase
        List<String> memberIds
) implements Identifiable {

    @Override
    public List<String> memberIds() {
        return memberIds != null ? memberIds : List.of();
    }
}
