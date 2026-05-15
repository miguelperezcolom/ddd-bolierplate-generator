package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ProjectionEntity(
        String id,
        String name,
        String modelId,
        List<ProjectionEventHandlerEntity> handlers
) implements Identifiable {
}
