package io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo;

import java.util.List;

public record Bff(
        String id,
        String name,
        String clientType,
        String description,
        String basePath,
        boolean authRequired,
        List<String> exposedUseCaseIds
) {
}
