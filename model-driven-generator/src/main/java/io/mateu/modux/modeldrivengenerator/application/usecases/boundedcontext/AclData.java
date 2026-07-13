package io.mateu.modux.modeldrivengenerator.application.usecases.boundedcontext;

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
