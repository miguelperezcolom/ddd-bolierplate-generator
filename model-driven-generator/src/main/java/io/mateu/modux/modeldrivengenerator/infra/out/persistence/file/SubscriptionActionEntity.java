package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;

public record SubscriptionActionEntity(
        String id,
        String name,
        SubscriptionActionType type,
        String useCaseId,
        String sagaId,
        String projectionId,
        String modelMappingId
) {
}
