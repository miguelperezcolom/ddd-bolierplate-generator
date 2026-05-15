package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;

public record UseCaseStepDto(
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
