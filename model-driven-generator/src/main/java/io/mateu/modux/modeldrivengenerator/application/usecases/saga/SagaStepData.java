package io.mateu.modux.modeldrivengenerator.application.usecases.saga;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaStepType;

public record SagaStepData(
        String id,
        String name,
        SagaStepType type,
        String compensatingStepId,
        String aggregateId,
        String operationId,
        String gatewayId,
        String gatewayOperationId,
        String domainEventId,
        String useCaseId,
        String modelMappingId
) {
}
