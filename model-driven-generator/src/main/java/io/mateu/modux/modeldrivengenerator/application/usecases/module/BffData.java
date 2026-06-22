package io.mateu.modux.modeldrivengenerator.application.usecases.module;

import java.util.List;

public record BffData(
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
