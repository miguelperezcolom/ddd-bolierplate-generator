package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record ModelMappingEntity(
        String id,
        String name,
        String sourceModelId,
        String targetModelId
) implements Identifiable {
}
