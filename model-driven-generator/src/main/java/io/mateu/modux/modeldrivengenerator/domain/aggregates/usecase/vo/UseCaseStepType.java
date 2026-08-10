package io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo;

/**
 * The vocabulary of a modeled behavior body — the ordered pipeline of steps inside a use case
 * <em>and</em>, since {@code operation-body.md}, inside an aggregate method or a domain-service
 * operation ({@link io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationStepEntity}).
 *
 * <p>It is one shared vocabulary; which values are <em>legal</em> for a given carrier is not
 * encoded here but enforced by the linter (an aggregate method may not {@code CallGateway}, a
 * domain service may not {@code SetField}, …). The name is kept for backward compatibility; the
 * enum is no longer use-case-specific.
 */
public enum UseCaseStepType {
    Custom,
    ReadAggregate,
    CallAggregateOperation,
    SaveAggregate,
    CallGateway,
    CallExternalUseCase,
    PublishDomainEvent,
    PublishApplicationEvent,
    CallUseCase,
    CallQueryService,
    ApplyModelMapping,
    // Added by operation-body.md — a modeled body for aggregate methods and domain services:
    /** Guard: a precondition/invariant check that decides whether the body proceeds. */
    CheckPrecondition,
    /** Mutation of the aggregate's own state (aggregate methods only — the linter enforces it). */
    SetField,
    /** Delegate to a domain service's operation (domain services and use cases). */
    CallDomainService,
    /** Control flow: conditional; nests {@code then}/{@code else} child steps. */
    If,
    /** Control flow: loop over a collection; nests {@code body} child steps. */
    ForEach;

    /**
     * Which role this step plays in the gather → transform → write/return pipeline.
     * {@code CallGateway} counts as WRITE (an outbound effect); when a gateway is used to fetch
     * data, its result feeds a transform and the pipeline still holds.
     */
    public StepPhase phase() {
        return switch (this) {
            case ReadAggregate, CallQueryService -> StepPhase.GATHER;
            case ApplyModelMapping -> StepPhase.TRANSFORM;
            case CallAggregateOperation, SaveAggregate, SetField, PublishDomainEvent,
                    PublishApplicationEvent, CallGateway, CallExternalUseCase -> StepPhase.WRITE;
            case CallUseCase, CallDomainService -> StepPhase.COMPOSE;
            case CheckPrecondition -> StepPhase.GUARD;
            case If, ForEach -> StepPhase.CONTROL;
            case Custom -> StepPhase.CUSTOM;
        };
    }
}
