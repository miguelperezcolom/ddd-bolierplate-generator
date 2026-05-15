package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;

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
        String modelMappingId
) {
}
