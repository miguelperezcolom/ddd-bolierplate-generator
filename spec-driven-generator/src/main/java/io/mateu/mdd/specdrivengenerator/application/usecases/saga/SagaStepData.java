package io.mateu.mdd.specdrivengenerator.application.usecases.saga;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.SagaStepType;

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
