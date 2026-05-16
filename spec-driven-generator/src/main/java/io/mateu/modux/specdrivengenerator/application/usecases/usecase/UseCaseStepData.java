package io.mateu.modux.specdrivengenerator.application.usecases.usecase;

import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;

public record UseCaseStepData(
        String id,
        String name,
        UseCaseStepType type,
        String aggregateId,
        String operationId,
        String gatewayId,
        String gatewayOperationId,
        String domainEventId,
        String useCaseId,
        String modelMappingId
) {
}
