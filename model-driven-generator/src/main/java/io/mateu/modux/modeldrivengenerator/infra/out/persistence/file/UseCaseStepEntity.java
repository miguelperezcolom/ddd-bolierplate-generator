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
        String intent,
        /** PublishApplicationEvent: the application event this step publishes. */
        String applicationEventId,
        /** CallExternalUseCase: the external system's use case this step calls. */
        String externalUseCaseId,
        /** Custom: the hand-written code this operation delegates to (CustomCodeEntity). */
        String customCodeId
) {

    /** Backward-compatible constructor (pre-customCodeId callers and stores). */
    public UseCaseStepEntity(String id, String name, UseCaseStepType type, String aggregateId,
                             String operationId, String gatewayId, String gatewayOperationId,
                             String domainEventId, String useCaseId, String modelMappingId,
                             String queryServiceId, String queryOperationId, String intent,
                             String applicationEventId, String externalUseCaseId) {
        this(id, name, type, aggregateId, operationId, gatewayId, gatewayOperationId,
                domainEventId, useCaseId, modelMappingId, queryServiceId, queryOperationId,
                intent, applicationEventId, externalUseCaseId, null);
    }

    /** Backward-compatible constructor (pre-externalUseCaseId callers and stores). */
    public UseCaseStepEntity(String id, String name, UseCaseStepType type, String aggregateId,
                             String operationId, String gatewayId, String gatewayOperationId,
                             String domainEventId, String useCaseId, String modelMappingId,
                             String queryServiceId, String queryOperationId, String intent,
                             String applicationEventId) {
        this(id, name, type, aggregateId, operationId, gatewayId, gatewayOperationId,
                domainEventId, useCaseId, modelMappingId, queryServiceId, queryOperationId,
                intent, applicationEventId, null);
    }

    /** Backward-compatible constructor (pre-applicationEventId callers and stores). */
    public UseCaseStepEntity(String id, String name, UseCaseStepType type, String aggregateId,
                             String operationId, String gatewayId, String gatewayOperationId,
                             String domainEventId, String useCaseId, String modelMappingId,
                             String queryServiceId, String queryOperationId, String intent) {
        this(id, name, type, aggregateId, operationId, gatewayId, gatewayOperationId,
                domainEventId, useCaseId, modelMappingId, queryServiceId, queryOperationId,
                intent, null);
    }

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
