package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

public record AclEntity(
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
