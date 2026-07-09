package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * An external system calls ONE operation of an API at a given SITE: the API as
 * published (siteId = apiId), a proxy fronting it, or a bounded context implementing it.
 */
public record ExternalApiOperationUseEntity(
        String operationId,
        String siteId
) {}
