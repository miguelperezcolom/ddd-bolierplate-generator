package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ReadModelEntity(
        String id,
        String name,
        String modelId,
        String storageType,
        List<String> filterFields,
        List<String> sortFields,
        boolean cacheable,
        Integer cacheTtlSeconds,
        String consistencyLevel,
        Long maxStalenessMs,
        List<String> indexFields
) implements Identifiable {
}
