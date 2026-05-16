package io.mateu.modux.specdrivengenerator.application.usecases.subscription;

import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;

public record SubscriptionActionData(
        String id,
        String name,
        SubscriptionActionType type,
        String useCaseId,
        String sagaId,
        String projectionId,
        String modelMappingId
) {
}
