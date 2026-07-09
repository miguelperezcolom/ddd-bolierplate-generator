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
        List<String> implementedByModuleIds,
        /** Per-site wiring: the use case implementing an operation at a given implementation site. */
        List<ApiOperationImplementationEntity> operationImplementations
) implements Identifiable {

    /** Backward-compatible constructor (pre-publishedByExternalSystemId callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations) {
        this(id, name, description, operations, null, List.of(), List.of());
    }

    /** Backward-compatible constructor (pre-implementedByModuleIds callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations, String publishedByExternalSystemId) {
        this(id, name, description, operations, publishedByExternalSystemId, List.of(), List.of());
    }

    /** Backward-compatible constructor (pre-operationImplementations callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations, String publishedByExternalSystemId,
                     List<String> implementedByModuleIds) {
        this(id, name, description, operations, publishedByExternalSystemId,
                implementedByModuleIds, List.of());
    }

    public List<ApiOperationEntity> operations() {
        return operations != null ? operations : List.of();
    }

    public List<String> implementedByModuleIds() {
        return implementedByModuleIds != null ? implementedByModuleIds : List.of();
    }

    public List<ApiOperationImplementationEntity> operationImplementations() {
        return operationImplementations != null ? operationImplementations : List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ApiEntity withName(String name) {
        return new ApiEntity(id, name, description, operations, publishedByExternalSystemId, implementedByModuleIds, operationImplementations);
    }

    public ApiEntity withOperations(List<ApiOperationEntity> operations) {
        return new ApiEntity(id, name, description, operations, publishedByExternalSystemId, implementedByModuleIds, operationImplementations);
    }

    public ApiEntity withPublishedByExternalSystemId(String externalSystemId) {
        return new ApiEntity(id, name, description, operations, externalSystemId, implementedByModuleIds, operationImplementations);
    }

    public ApiEntity withImplementedByModuleIds(List<String> implementedByModuleIds) {
        return new ApiEntity(id, name, description, operations, publishedByExternalSystemId, implementedByModuleIds, operationImplementations);
    }

    public ApiEntity withOperationImplementations(List<ApiOperationImplementationEntity> operationImplementations) {
        return new ApiEntity(id, name, description, operations, publishedByExternalSystemId, implementedByModuleIds, operationImplementations);
    }
}
