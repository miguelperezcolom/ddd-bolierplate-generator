package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaStepType;

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
        String modelMappingId,
        Integer maxSuccessfulExecutions
) {

    /** Backward-compatible constructor (pre-maxSuccessfulExecutions callers). */
    public SagaStepDto(String id, String name, SagaStepType type, String compensatingStepId,
                       String aggregateId, String operationId, String gatewayId,
                       String gatewayOperationId, String domainEventId, String useCaseId,
                       String modelMappingId) {
        this(id, name, type, compensatingStepId, aggregateId, operationId, gatewayId,
                gatewayOperationId, domainEventId, useCaseId, modelMappingId, null);
    }
}
