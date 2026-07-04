package io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo;

public enum UseCaseStepType {
    Custom,
    ReadAggregate,
    CallAggregateOperation,
    SaveAggregate,
    CallGateway,
    PublishDomainEvent,
    CallUseCase,
    CallQueryService,
    ApplyModelMapping
}
