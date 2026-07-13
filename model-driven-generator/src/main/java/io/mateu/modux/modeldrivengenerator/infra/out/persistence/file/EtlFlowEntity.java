package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * An integrator: an ETL flow OWNED BY a bounded context (the consumer-side ACL,
 * or the publisher of an outbound integration), moving data between systems as
 * an ordered pipeline of steps — sources (pull/consumer), transforms and writes
 * (API call, legacy table, event).
 */
@lombok.Builder(toBuilder = true)
public record EtlFlowEntity(
        String id,
        String name,
        String description,
        /** The bounded context that owns (and generates, and operates) the pipeline. */
        String ownerBoundedContextId,
        List<EtlStepEntity> steps,
        /** The service identity the pipeline runs as (a non-human subject). */
        String identityProviderId
) implements Identifiable {

    /** Backward-compatible constructor (pre-identityProviderId callers and stores). */
    public EtlFlowEntity(String id, String name, String description, String ownerBoundedContextId,
                         List<EtlStepEntity> steps) {
        this(id, name, description, ownerBoundedContextId, steps, null);
    }

    /** Backward-compatible constructor (pre-owner callers and stores). */
    public EtlFlowEntity(String id, String name, String description, List<EtlStepEntity> steps) {
        this(id, name, description, null, steps, null);
    }

    public EtlFlowEntity {
        if (steps == null) steps = List.of();
    }
}
