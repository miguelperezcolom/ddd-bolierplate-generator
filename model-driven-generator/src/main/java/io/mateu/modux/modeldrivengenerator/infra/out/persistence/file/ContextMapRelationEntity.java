package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record ContextMapRelationEntity(
        String id,
        String name,
        String sourceModuleId,
        String targetModuleId,
        String type,
        String description
) {
}
