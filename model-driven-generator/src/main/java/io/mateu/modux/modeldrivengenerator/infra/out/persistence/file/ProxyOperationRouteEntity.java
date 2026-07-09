package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * One proxy OPERATION routed to an implementation SITE of the API the proxy fronts:
 * targetSiteId is the bounded context implementing it, or the apiId itself for
 * "as published" — the per-operation strangler wiring.
 */
public record ProxyOperationRouteEntity(
        String operationId,
        String targetSiteId
) {}
