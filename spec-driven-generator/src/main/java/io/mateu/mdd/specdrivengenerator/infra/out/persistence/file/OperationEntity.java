package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record OperationEntity(
        String id,
        String name,
        String preconditions,
        String sets,
        String emits,
        String type
) implements Identifiable {
}
