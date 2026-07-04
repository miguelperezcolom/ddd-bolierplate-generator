package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * One allowed transition of an aggregate's {@link LifecycleEntity lifecycle}: invoking
 * {@code operationId} while the aggregate is in {@code fromState} moves it to {@code toState},
 * optionally guarded by a boolean expression over the aggregate's model.
 */
public record LifecycleTransitionEntity(
        String id,
        String fromState,
        String toState,
        String operationId,
        String guard,
        String description
) {
}
