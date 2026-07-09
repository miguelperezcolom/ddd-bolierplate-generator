package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * A published API as a FIRST-CLASS element, at the level of the bounded contexts: the
 * contract is a product (often fronting several contexts), not an implementation detail
 * of one module. Its operations wire to whoever implements them. Usually born from an
 * OpenAPI/WSDL import (Organización › Import API contract, no target), refined on the map.
 */
public record ApiEntity(
        String id,
        String name,
        String description,
        List<ApiOperationEntity> operations,
        /** External system publishing this API (it nests inside it on the map); null = standalone. */
        String publishedByExternalSystemId,
        /** Bounded contexts also implementing this SAME API (strangler migrations: N sites coexist). */
        List<String> implementedByModuleIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-publishedByExternalSystemId callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations) {
        this(id, name, description, operations, null, List.of());
    }

    /** Backward-compatible constructor (pre-implementedByModuleIds callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations, String publishedByExternalSystemId) {
        this(id, name, description, operations, publishedByExternalSystemId, List.of());
    }

    public List<ApiOperationEntity> operations() {
        return operations != null ? operations : List.of();
    }

    public List<String> implementedByModuleIds() {
        return implementedByModuleIds != null ? implementedByModuleIds : List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ApiEntity withName(String name) {
        return new ApiEntity(id, name, description, operations, publishedByExternalSystemId, implementedByModuleIds);
    }

    public ApiEntity withOperations(List<ApiOperationEntity> operations) {
        return new ApiEntity(id, name, description, operations, publishedByExternalSystemId, implementedByModuleIds);
    }

    public ApiEntity withPublishedByExternalSystemId(String externalSystemId) {
        return new ApiEntity(id, name, description, operations, externalSystemId, implementedByModuleIds);
    }

    public ApiEntity withImplementedByModuleIds(List<String> implementedByModuleIds) {
        return new ApiEntity(id, name, description, operations, publishedByExternalSystemId, implementedByModuleIds);
    }
}
