package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * An integrator: an ETL flow living OUTSIDE the bounded contexts, moving data
 * between systems as an ordered pipeline of steps — sources (pull/consumer),
 * transforms and writes (API call, legacy table, event).
 */
public record EtlFlowEntity(
        String id,
        String name,
        String description,
        List<EtlStepEntity> steps
) implements Identifiable {

    public EtlFlowEntity {
        if (steps == null) steps = List.of();
    }
}
