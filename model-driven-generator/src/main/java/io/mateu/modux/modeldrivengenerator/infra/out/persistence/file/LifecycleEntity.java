package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

/**
 * The explicit state machine of an aggregate (e.g. Booking: pending → confirmed → checkedIn →
 * checkedOut / cancelled). Making the lifecycle first-class lets the generator derive transition
 * guards (illegal transition = domain error), one domain event per transition, state diagrams, and
 * state-aware UI affordances — instead of leaving the machine implicit across operations and
 * invariants. The linter validates it (unreachable states, transitions referencing missing
 * operations, terminal states with outgoing transitions declared twice, …).
 */
public record LifecycleEntity(
        /** Field of the aggregate's model that holds the current state (defaults to "status"). */
        String stateField,
        String initialState,
        List<String> states,
        List<LifecycleTransitionEntity> transitions
) {

    public LifecycleEntity {
        if (states == null) states = List.of();
        if (transitions == null) transitions = List.of();
    }
}
