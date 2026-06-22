package io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo;

import java.util.List;

public record Bff(
        String id,
        String name,
        String clientType,
        String description,
        String basePath,
        boolean authRequired,
        List<String> exposedUseCaseIds,
        List<String> exposedReadModelIds
) {
}
