package io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo;

import java.util.List;

public record Acl(
        String id,
        String name,
        String externalSystem,
        String description,
        String direction,
        String gatewayId,
        List<String> translatedDomainEventIds,
        List<String> translatedUseCaseIds
) {
}
