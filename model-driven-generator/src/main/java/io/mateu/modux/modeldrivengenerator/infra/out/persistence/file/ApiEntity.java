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
        List<ApiOperationEntity> operations
) implements Identifiable {

    public List<ApiOperationEntity> operations() {
        return operations != null ? operations : List.of();
    }
}
