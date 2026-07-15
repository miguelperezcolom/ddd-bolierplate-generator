package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

/**
 * An API proxy/cache as a FIRST-CLASS element: fronts a published API from another
 * system (CDN, cache, gateway de terceros) and is consumable exactly like the API it
 * fronts — dependencies can point at the proxy instead of the origin.
 */
@lombok.Builder(toBuilder = true)
public record ProxyApiEntity(
        String id,
        String name,
        String description,
        /** The published API this proxy fronts. */
        String targetApiId,
        /** External system hosting the proxy (it nests inside it on the map); null = standalone. */
        String publishedByExternalSystemId,
        /** Per-operation routing to the fronted API's implementation sites. */
        java.util.List<ProxyOperationRouteEntity> operationRoutes
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    /** Backward-compatible constructor (pre-operationRoutes callers and stores). */
    public ProxyApiEntity(String id, String name, String description,
                          String targetApiId, String publishedByExternalSystemId) {
        this(id, name, description, targetApiId, publishedByExternalSystemId, java.util.List.of(), null);
    }

    public java.util.List<ProxyOperationRouteEntity> operationRoutes() {
        return operationRoutes != null ? operationRoutes : java.util.List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ProxyApiEntity withName(String name) {
        return toBuilder().name(name).build();
    }

    public ProxyApiEntity withTargetApiId(String targetApiId) {
        return toBuilder().targetApiId(targetApiId).build();
    }

    public ProxyApiEntity withPublishedByExternalSystemId(String externalSystemId) {
        return toBuilder().publishedByExternalSystemId(externalSystemId).build();
    }

    public ProxyApiEntity withOperationRoutes(java.util.List<ProxyOperationRouteEntity> operationRoutes) {
        return toBuilder().operationRoutes(operationRoutes).build();
    }
}
