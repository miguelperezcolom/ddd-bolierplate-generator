package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record QueryServiceEntity(
        String id,
        String name,
        String boundedContextId,
        String description,
        List<QueryOperationEntity> operations,
        /** Exposed as a gRPC API — required when consumed from a boundedContext deployed in another service. */
        boolean exposedAsGrpc
) implements Identifiable {

    /** Backward-compatible constructor (pre-exposedAsGrpc callers and stores). */
    public QueryServiceEntity(String id, String name, String boundedContextId, String description,
                              List<QueryOperationEntity> operations) {
        this(id, name, boundedContextId, description, operations, false);
    }
}
