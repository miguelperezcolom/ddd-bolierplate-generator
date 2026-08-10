package io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo;

/**
 * The pipeline phase of a use-case step. Every operation of an information system has the same
 * shape — <em>gather data, transform it, then write it somewhere or return it</em> — and each
 * {@link UseCaseStepType} plays one of those roles. The linter uses the phases to ask the
 * pipeline questions ("this use case gathers but never writes nor returns — what does it do?").
 */
public enum StepPhase {
    /** Brings data in: read an aggregate, call a query service. */
    GATHER,
    /** Reshapes data: apply a model mapping. */
    TRANSFORM,
    /** Produces an effect: mutate an aggregate, set a field, publish an event, call outbound. */
    WRITE,
    /** Delegates to another pipeline (call use case, call domain service). */
    COMPOSE,
    /** Guards the pipeline: a precondition/invariant check that decides whether to proceed. */
    GUARD,
    /** Structures the pipeline: control flow (if/else, for-each) that nests other steps. */
    CONTROL,
    /** Free-form code (two-zone hook) — the model cannot classify it. */
    CUSTOM
}
