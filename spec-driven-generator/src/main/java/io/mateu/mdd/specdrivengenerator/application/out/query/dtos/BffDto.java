package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record BffDto(
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
