package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * A button inside a button group. What makes it a button is its TARGET: a use
 * case (or policy — same entity), or one operation of a published API.
 */
public record GroupButtonEntity(
        String id,
        String label,
        String useCaseId,
        String apiId,
        String apiOperationId,
        /** ModelMapping applied to the viewmodel to build the request. */
        String mappingId
) {
}
