package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * The HUMAN interface a bounded context exposes — the UI twin of an API. It is
 * declared on the map (interface glyph, like the API) and REALIZED by concrete
 * apps and pages: the realization links say which ones.
 */
@lombok.Builder(toBuilder = true)
public record UiEntity(
        String id,
        String name,
        String description,
        /** The bounded context that exposes it (null while loose). */
        String boundedContextId,
        /** Apps (UiAdapter) that realize this interface. */
        List<String> appIds,
        /** Pages that realize this interface directly. */
        List<String> pageIds,
        /** Actors this interface SERVES (serving — the only ui⇆actor relation). */
        List<String> actorIds
) implements Identifiable {

    public UiEntity {
        if (appIds == null) appIds = List.of();
        if (pageIds == null) pageIds = List.of();
        if (actorIds == null) actorIds = List.of();
    }

    /** Backward-compatible constructor (pre-actorIds callers and stores). */
    public UiEntity(String id, String name, String description, String boundedContextId,
                    List<String> appIds, List<String> pageIds) {
        this(id, name, description, boundedContextId, appIds, pageIds, List.of());
    }
}
