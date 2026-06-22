package io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo;

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
