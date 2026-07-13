package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * One operation of a first-class {@link ApiEntity}: the contract's entry point, wired to
 * whoever implements it — a bounded context (coarse), or a concrete use case / policy.
 * The wiring is architecture information: the published surface mapped onto the domain.
 */
public record ApiOperationEntity(
        String id,
        String name,
        String httpMethod,
        String path,
        String description,
        /** Coarse wiring: the bounded context that implements it (use case TBD). */
        String targetBoundedContextId,
        /** Fine wiring: the use case (or policy) that implements it. */
        String targetUseCaseId,
        /** Request payload data model (a ModelEntity id), when the contract declares one. */
        String requestModelId,
        /** Response payload data model (a ModelEntity id), when the contract declares one. */
        String responseModelId
) {

    /** Backward-compatible constructor (pre request/response model callers and stores). */
    public ApiOperationEntity(String id, String name, String httpMethod, String path,
                              String description, String targetBoundedContextId, String targetUseCaseId) {
        this(id, name, httpMethod, path, description, targetBoundedContextId, targetUseCaseId, null, null);
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ApiOperationEntity withName(String name) {
        return new ApiOperationEntity(id, name, httpMethod, path, description, targetBoundedContextId,
                targetUseCaseId, requestModelId, responseModelId);
    }

    public ApiOperationEntity withTargets(String targetBoundedContextId, String targetUseCaseId) {
        return new ApiOperationEntity(id, name, httpMethod, path, description, targetBoundedContextId,
                targetUseCaseId, requestModelId, responseModelId);
    }
}
