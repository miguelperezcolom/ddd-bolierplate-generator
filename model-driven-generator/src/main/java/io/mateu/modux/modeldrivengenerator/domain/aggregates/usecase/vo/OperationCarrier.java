package io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo;

import static io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.*;

import java.util.Set;

/**
 * The three carriers of a modeled behavior body and which step types each one may legally contain
 * — the single source of truth for the purity table of {@code docs/design/operation-body.md} §3.
 *
 * <p>Kept out of the linter on purpose: the same policy drives the lint rule
 * ({@code operation-step-illegal-for-carrier}) today and the palette the graphical editor offers
 * per carrier tomorrow (§8). The rule is opinionated by design (decision A): I/O to infrastructure
 * ({@code CallGateway}, external/use-case/query calls) lives only in the use case; the aggregate
 * stays pure (only its own state, invariants and events); {@code SetField} — mutating owned state —
 * is the aggregate's alone. Control flow ({@code If}/{@code ForEach}) and {@code Custom} are legal
 * everywhere; they only structure the action steps that are already legal for the carrier.
 */
public enum OperationCarrier {

    /** An aggregate method: pure domain, mutates only its own state. */
    AGGREGATE(Set.of(
            CheckPrecondition, SetField, PublishDomainEvent, CallAggregateOperation,
            If, ForEach, Custom)),

    /** A domain-service operation: coordinates aggregates, stateless, no infrastructure I/O. */
    DOMAIN_SERVICE(Set.of(
            CheckPrecondition, ReadAggregate, CallAggregateOperation, SaveAggregate,
            ApplyModelMapping, CallDomainService, PublishDomainEvent,
            If, ForEach, Custom)),

    /** A use case (application service): the full vocabulary, including outbound I/O. */
    USE_CASE(Set.of(UseCaseStepType.values()));

    private final Set<UseCaseStepType> legal;

    OperationCarrier(Set<UseCaseStepType> legal) {
        this.legal = legal;
    }

    /** The step types this carrier may legally contain. */
    public Set<UseCaseStepType> legalStepTypes() {
        return legal;
    }

    /** Whether a step of this type is legal inside this carrier. */
    public boolean allows(UseCaseStepType type) {
        return type != null && legal.contains(type);
    }
}
