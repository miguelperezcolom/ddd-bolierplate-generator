package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ModelMappingEntity(
        String id,
        String name,
        String sourceModelId,
        String targetModelId,
        boolean hasCustomPart,
        List<ModelMappingRuleEntity> rules
) implements Identifiable {
}
