package io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo;

public enum UseCaseStepType {
    Custom,
    ReadAggregate,
    CallAggregateOperation,
    SaveAggregate,
    CallGateway,
    PublishDomainEvent,
    PublishApplicationEvent,
    CallUseCase,
    CallQueryService,
    ApplyModelMapping;

    /**
     * Which role this step plays in the gather → transform → write/return pipeline.
     * {@code CallGateway} counts as WRITE (an outbound effect); when a gateway is used to fetch
     * data, its result feeds a transform and the pipeline still holds.
     */
    public StepPhase phase() {
        return switch (this) {
            case ReadAggregate, CallQueryService -> StepPhase.GATHER;
            case ApplyModelMapping -> StepPhase.TRANSFORM;
            case CallAggregateOperation, SaveAggregate, PublishDomainEvent, PublishApplicationEvent,
                    CallGateway -> StepPhase.WRITE;
            case CallUseCase -> StepPhase.COMPOSE;
            case Custom -> StepPhase.CUSTOM;
        };
    }
}
