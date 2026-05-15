package io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo;

public enum SagaStepType {
    Custom,
    ReadAggregate,
    CallAggregateOperation,
    SaveAggregate,
    CallGateway,
    PublishDomainEvent,
    CallUseCase,
    ApplyModelMapping
}
