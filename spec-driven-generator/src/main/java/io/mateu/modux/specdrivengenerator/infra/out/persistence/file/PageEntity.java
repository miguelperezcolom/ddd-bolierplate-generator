package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record PageEntity(
        String id,
        String name,
        String route,
        String type,
        String aggregateId,
        String modelId
) implements Identifiable {
}
