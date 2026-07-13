package io.mateu.modux.modeldrivengenerator.application.usecases.boundedcontext;

import java.util.List;

public record BffData(
        String id,
        String name,
        String clientType,
        String description,
        String basePath,
        boolean authRequired,
        List<String> exposedUseCaseIds
) {
}
