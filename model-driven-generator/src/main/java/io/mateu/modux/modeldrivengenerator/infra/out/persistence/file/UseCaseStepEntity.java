package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;

public record UseCaseStepEntity(
        String id,
        String name,
        UseCaseStepType type,
        String aggregateId,
        String operationId,
        String gatewayId,
        String gatewayOperationId,
        String domainEventId,
        String useCaseId,
        String modelMappingId,
        /** CallQueryService: the query service consumed by this step. */
        String queryServiceId,
        /** CallQueryService: the operation of the query service. */
        String queryOperationId,
        /**
         * Custom: what this step does, in natural language. This is the spec of the two-zone hook:
         * it travels into the generated scaffold as javadoc and {@code mvn modux:ai-complete} uses
         * it to propose an implementation — which the developer owns and can overwrite.
         */
        String intent
) {

    /** Backward-compatible constructor (pre-CallQueryService callers). */
    public UseCaseStepEntity(String id, String name, UseCaseStepType type, String aggregateId,
                             String operationId, String gatewayId, String gatewayOperationId,
                             String domainEventId, String useCaseId, String modelMappingId) {
        this(id, name, type, aggregateId, operationId, gatewayId, gatewayOperationId,
                domainEventId, useCaseId, modelMappingId, null, null, null);
    }

    /** Backward-compatible constructor (pre-intent callers). */
    public UseCaseStepEntity(String id, String name, UseCaseStepType type, String aggregateId,
                             String operationId, String gatewayId, String gatewayOperationId,
                             String domainEventId, String useCaseId, String modelMappingId,
                             String queryServiceId, String queryOperationId) {
        this(id, name, type, aggregateId, operationId, gatewayId, gatewayOperationId,
                domainEventId, useCaseId, modelMappingId, queryServiceId, queryOperationId, null);
    }
}
