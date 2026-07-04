package io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;

import java.util.Optional;

/**
 * Infers the strategic DDD context-map relationship a runtime {@link FlowArchetype} implies
 * between its source (upstream) and target (downstream) contexts. Used to suggest a
 * {@link ContextMapRelationType} when a cross-context flow exists but no relation is declared.
 *
 * <p>These are <em>suggestions</em>: more than one type can be defensible, so the analyzer only
 * proposes; it never overrides a relation the architect declared by hand.
 */
public final class ContextMapArchetypeInference {

    private ContextMapArchetypeInference() {}

    public static Optional<ContextMapRelationType> impliedRelation(FlowArchetype archetype) {
        if (archetype == null) return Optional.empty();
        return switch (archetype) {
            // source publishes a formal event contract that the target consumes to build a read model
            case MATERIALIZES -> Optional.of(ContextMapRelationType.OPEN_HOST_SERVICE);
            // source event drives a target use case through a negotiated command contract
            case TRIGGERS -> Optional.of(ContextMapRelationType.CUSTOMER_SUPPLIER);
            // a multi-step process coordinating several contexts as equals
            case ORCHESTRATES -> Optional.of(ContextMapRelationType.PARTNERSHIP);
            // the target is an external system, outside the bounded-context map
            case NOTIFIES -> Optional.empty();
        };
    }
}
