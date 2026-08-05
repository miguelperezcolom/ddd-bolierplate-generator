package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

import java.util.List;

/**
 * A published API as a FIRST-CLASS element, at the level of the bounded contexts: the
 * contract is a product (often fronting several contexts), not an implementation detail
 * of one boundedContext. Its operations wire to whoever implements them. Usually born from an
 * OpenAPI/WSDL import (Organización › Import API contract, no target), refined on the map.
 */
@lombok.Builder(toBuilder = true)
public record ApiEntity(
        String id,
        String name,
        String description,
        List<ApiOperationEntity> operations,
        /** External system publishing this API (it nests inside it on the map); null = standalone. */
        String publishedByExternalSystemId,
        /** Bounded contexts also implementing this SAME API (strangler migrations: N sites coexist). */
        List<String> implementedByBoundedContextIds,
        /** Per-site wiring: the use case implementing an operation at a given implementation site. */
        List<ApiOperationImplementationEntity> operationImplementations
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    /** Backward-compatible constructor (pre-publishedByExternalSystemId callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations) {
        this(id, name, description, operations, null, List.of(), List.of(), null);
    }

    /** Backward-compatible constructor (pre-implementedByBoundedContextIds callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations, String publishedByExternalSystemId) {
        this(id, name, description, operations, publishedByExternalSystemId, List.of(), List.of(), null);
    }

    /** Backward-compatible constructor (pre-operationImplementations callers and stores). */
    public ApiEntity(String id, String name, String description,
                     List<ApiOperationEntity> operations, String publishedByExternalSystemId,
                     List<String> implementedByBoundedContextIds) {
        this(id, name, description, operations, publishedByExternalSystemId,
                implementedByBoundedContextIds, List.of(), null);
    }

    public List<ApiOperationEntity> operations() {
        return operations != null ? operations : List.of();
    }

    public List<String> implementedByBoundedContextIds() {
        return implementedByBoundedContextIds != null ? implementedByBoundedContextIds : List.of();
    }

    public List<ApiOperationImplementationEntity> operationImplementations() {
        return operationImplementations != null ? operationImplementations : List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ApiEntity withName(String name) {
        return toBuilder().name(name).build();
    }

    public ApiEntity withOperations(List<ApiOperationEntity> operations) {
        return toBuilder().operations(operations).build();
    }

    public ApiEntity withPublishedByExternalSystemId(String externalSystemId) {
        return toBuilder().publishedByExternalSystemId(externalSystemId).build();
    }

    public ApiEntity withImplementedByBoundedContextIds(List<String> implementedByBoundedContextIds) {
        return toBuilder().implementedByBoundedContextIds(implementedByBoundedContextIds).build();
    }

    public ApiEntity withOperationImplementations(List<ApiOperationImplementationEntity> operationImplementations) {
        return toBuilder().operationImplementations(operationImplementations).build();
    }
}
