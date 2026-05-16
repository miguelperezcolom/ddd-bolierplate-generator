package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import java.util.List;

public record BffEntity(
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
