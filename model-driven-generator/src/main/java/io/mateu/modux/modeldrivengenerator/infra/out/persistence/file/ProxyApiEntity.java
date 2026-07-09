package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

/**
 * An API proxy/cache as a FIRST-CLASS element: fronts a published API from another
 * system (CDN, cache, gateway de terceros) and is consumable exactly like the API it
 * fronts — dependencies can point at the proxy instead of the origin.
 */
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
) implements Identifiable {

    /** Backward-compatible constructor (pre-operationRoutes callers and stores). */
    public ProxyApiEntity(String id, String name, String description,
                          String targetApiId, String publishedByExternalSystemId) {
        this(id, name, description, targetApiId, publishedByExternalSystemId, java.util.List.of());
    }

    public java.util.List<ProxyOperationRouteEntity> operationRoutes() {
        return operationRoutes != null ? operationRoutes : java.util.List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ProxyApiEntity withName(String name) {
        return new ProxyApiEntity(id, name, description, targetApiId, publishedByExternalSystemId, operationRoutes);
    }

    public ProxyApiEntity withTargetApiId(String targetApiId) {
        return new ProxyApiEntity(id, name, description, targetApiId, publishedByExternalSystemId, operationRoutes);
    }

    public ProxyApiEntity withPublishedByExternalSystemId(String externalSystemId) {
        return new ProxyApiEntity(id, name, description, targetApiId, externalSystemId, operationRoutes);
    }

    public ProxyApiEntity withOperationRoutes(java.util.List<ProxyOperationRouteEntity> operationRoutes) {
        return new ProxyApiEntity(id, name, description, targetApiId, publishedByExternalSystemId, operationRoutes);
    }
}
