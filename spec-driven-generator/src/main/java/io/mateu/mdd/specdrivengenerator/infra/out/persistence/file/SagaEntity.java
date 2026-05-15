package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record SagaEntity(
        String id,
        String name,
        List<String> triggeringEventIds,
        List<SagaStepEntity> steps
) implements Identifiable {
}
