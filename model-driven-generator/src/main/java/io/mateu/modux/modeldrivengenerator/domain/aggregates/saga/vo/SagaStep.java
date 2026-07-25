package io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo;

public record SagaStep(
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

    /** Backward-compatible constructor (pre-maxSuccessfulExecutions callers). */
    public SagaStep(String id, String name, SagaStepType type, String compensatingStepId,
                    String aggregateId, String operationId, String gatewayId,
                    String gatewayOperationId, String domainEventId, String useCaseId,
                    String modelMappingId) {
        this(id, name, type, compensatingStepId, aggregateId, operationId, gatewayId,
                gatewayOperationId, domainEventId, useCaseId, modelMappingId, null);
    }
}
