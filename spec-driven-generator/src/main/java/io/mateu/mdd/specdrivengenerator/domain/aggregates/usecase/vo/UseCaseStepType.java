package io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo;

public enum UseCaseStepType {
    Custom,
    ReadAggregate,
    CallAggregateOperation,
    SaveAggregate,
    CallGateway,
    PublishDomainEvent,
    CallUseCase,
    ApplyModelMapping
}
