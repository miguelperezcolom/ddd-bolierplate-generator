package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;

public record SubscriptionActionDto(
        String id,
        String name,
        SubscriptionActionType type,
        String useCaseId,
        String sagaId,
        String projectionId,
        String modelMappingId
) {
}
