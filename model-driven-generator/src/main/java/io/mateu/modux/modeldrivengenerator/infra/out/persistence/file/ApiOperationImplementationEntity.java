package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * The use case serving ONE operation AT one site — a bounded context implementing the
 * API, or a proxy fronting it (boundedContextId holds either id). Per-site: during strangler
 * migrations the same operation may be served differently at each site, and the use
 * case may live in another context.
 */
public record ApiOperationImplementationEntity(
        String operationId,
        /** The site: a bounded-context id or a proxy id. */
        String boundedContextId,
        String useCaseId
) {}
