package io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo;

public record SubscriptionAction(
        String id,
        String name,
        SubscriptionActionType type,
        String useCaseId,
        String sagaId,
        String projectionId,
        String modelMappingId
) {
}
