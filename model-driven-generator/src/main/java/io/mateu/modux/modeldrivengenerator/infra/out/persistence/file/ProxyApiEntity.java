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
        String publishedByExternalSystemId
) implements Identifiable {

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ProxyApiEntity withName(String name) {
        return new ProxyApiEntity(id, name, description, targetApiId, publishedByExternalSystemId);
    }

    public ProxyApiEntity withTargetApiId(String targetApiId) {
        return new ProxyApiEntity(id, name, description, targetApiId, publishedByExternalSystemId);
    }

    public ProxyApiEntity withPublishedByExternalSystemId(String externalSystemId) {
        return new ProxyApiEntity(id, name, description, targetApiId, externalSystemId);
    }
}
