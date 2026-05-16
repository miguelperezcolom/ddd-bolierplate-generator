package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ReadModelDto(String id, String name,
                           String modelId,
                           String storageType,
                           List<String> filterFields,
                           List<String> sortFields,
                           boolean cacheable,
                           Integer cacheTtlSeconds,
                           String consistencyLevel,
                           Long maxStalenessMs,
                           List<String> indexFields) {
}
