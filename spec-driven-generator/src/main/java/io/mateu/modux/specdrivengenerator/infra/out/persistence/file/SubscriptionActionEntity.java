package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;

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
