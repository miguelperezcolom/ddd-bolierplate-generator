package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.saga.vo.SagaStepType;

public record SagaStepDto(
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
