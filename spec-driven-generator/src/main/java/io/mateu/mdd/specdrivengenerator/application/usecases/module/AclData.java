package io.mateu.mdd.specdrivengenerator.application.usecases.module;

import java.util.List;

public record AclData(
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
