package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record AclDto(
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
