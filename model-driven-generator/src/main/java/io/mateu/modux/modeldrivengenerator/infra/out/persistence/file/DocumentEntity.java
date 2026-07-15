package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.Set;

/**
 * A generated document or report. A DOCUMENT is a template filled from a data
 * model (a booking confirmation PDF); a REPORT is a dataset served by a query
 * operation (the daily arrivals list). Rendering (engine, format) is a
 * generation-time decision; the model declares WHAT exists and WHAT feeds it.
 */
public record DocumentEntity(
        String id,
        String name,
        /** The bounded context that owns it. */
        String ownerBoundedContextId,
        /** DOCUMENT (template + model) or REPORT (query-fed dataset). */
        String kind,
        /** DOCUMENT: the data model that fills the template. */
        String modelId,
        /** REPORT: the query operation serving the dataset. */
        String queryServiceId,
        String queryOperationId,
        /** Where the template lives (URI), or its intent in prose. */
        String templateUri,
        String description
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public static final Set<String> KINDS = Set.of("DOCUMENT", "REPORT");
}
