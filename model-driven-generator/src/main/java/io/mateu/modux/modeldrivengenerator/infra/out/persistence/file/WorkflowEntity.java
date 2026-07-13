package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * An orchestrator that lives OUTSIDE every bounded context (it has no owner boundedContext, unlike
 * {@link ProcessEntity}): started by an event, it advances a dependency graph of steps, each of
 * which emits an event that starts a task — a use case, for now — inside a bounded context. The
 * workflow never calls anything directly; all workflow↔context communication travels as events.
 */
public record WorkflowEntity(
        String id,
        String name,
        String description,
        /** Trigger source: the aggregate emitting the trigger domain event. */
        String triggerAggregateId,
        /** Alternative trigger source: the domain service emitting the trigger domain event. */
        String triggerDomainServiceId,
        /** Alternative trigger source: the use case publishing the trigger APPLICATION event. */
        String triggerUseCaseId,
        /** The event that starts the workflow. */
        String triggerEvent,
        List<WorkflowStepEntity> steps,
        /** Event published when every step completes. Defaults to &lt;Name&gt;Completed. */
        String onCompletionEventName,
        /** Architecture decisions (ADRs) this workflow traces back to. */
        List<String> decisionIds
) implements Identifiable {

    public WorkflowEntity {
        if (steps == null) steps = List.of();
        if (decisionIds == null) decisionIds = List.of();
    }
}
