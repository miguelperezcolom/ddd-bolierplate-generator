package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * The use case implementing ONE operation AT one implementation site (a bounded context
 * implementing the API). Per-site: during strangler migrations the same operation may be
 * implemented differently at each site, and the use case may live in another context.
 */
public record ApiOperationImplementationEntity(
        String operationId,
        String moduleId,
        String useCaseId
) {}
