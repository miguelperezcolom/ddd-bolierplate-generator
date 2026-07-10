package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.Set;

/**
 * One step of an ETL flow. Three phases, six concrete kinds: a data SOURCE —
 * SOURCE_PULL (poll a legacy table or an API) or SOURCE_CONSUMER (react to an
 * event) —, a TRANSFORM (a model mapping, or custom logic stated as intent),
 * or a WRITE — WRITE_API (call an operation), WRITE_DB (a legacy table) or
 * WRITE_EVENT (publish an event).
 */
public record EtlStepEntity(
        String id,
        String name,
        String type,
        /** SOURCE_PULL / WRITE_DB: the external system's table. */
        String externalTableId,
        /** SOURCE_PULL / WRITE_API: the API (or proxy) — optionally one operation. */
        String apiId,
        String operationId,
        /** SOURCE_CONSUMER / WRITE_EVENT: the domain or application event. */
        String eventId,
        /** TRANSFORM: the declarative mapping between models. */
        String modelMappingId,
        /** TRANSFORM: custom logic in natural language (the ai-complete spec). */
        String intent
) {
    public static final Set<String> KINDS = Set.of(
            "SOURCE_PULL", "SOURCE_CONSUMER", "TRANSFORM", "WRITE_API", "WRITE_DB", "WRITE_EVENT");
}
