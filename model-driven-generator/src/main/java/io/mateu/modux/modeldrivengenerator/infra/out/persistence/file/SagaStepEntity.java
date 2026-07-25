package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaStepType;

public record SagaStepEntity(
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
        /** Cap on successful runs of this step per instance (null = inherit the saga default). */
        Integer maxSuccessfulExecutions
) {

    /** Backward-compatible constructor (pre-maxSuccessfulExecutions callers and stores). */
    public SagaStepEntity(String id, String name, SagaStepType type, String compensatingStepId,
                          String aggregateId, String operationId, String gatewayId,
                          String gatewayOperationId, String domainEventId, String useCaseId,
                          String modelMappingId) {
        this(id, name, type, compensatingStepId, aggregateId, operationId, gatewayId,
                gatewayOperationId, domainEventId, useCaseId, modelMappingId, null);
    }
}
