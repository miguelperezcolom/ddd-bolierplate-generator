package io.mateu.modux.modeldrivengenerator.domain.aggregates.process;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStep;
import lombok.Getter;

import java.util.List;

/**
 * A long-running business process (order-to-cash, the full check-in, …): an ordered mix of
 * automated and human steps, with deadlines and escalation, triggered by a domain event. It is the
 * next rung of the intent ladder above {@code Flow}: where a flow declares one event→reaction edge,
 * a process declares the whole path and desugars into the technical pieces (saga, subscriptions,
 * scheduled deadline triggers, a task worklist read model). See docs/design/process-intent-layer.md.
 */
@Getter
public class Process {

    private ProcessId id;
    private ProcessName name;
    private String description;

    // when: the event that starts the process (the source boundedContext is the aggregate's boundedContext)
    private String triggerAggregateId;
    private String triggerEvent;

    // the bounded context that owns/orchestrates the process
    private String ownerBoundedContextId;

    private List<ProcessStep> steps;

    // event published when the last step completes (defaults to <Name>Completed)
    private String onCompletionEventName;

    // end-to-end SLA as an ISO-8601 duration (e.g. P3D)
    private String sla;

    public static Process of(ProcessId id, ProcessName name, String description,
                             String triggerAggregateId, String triggerEvent, String ownerBoundedContextId,
                             List<ProcessStep> steps, String onCompletionEventName, String sla) {
        var process = new Process();
        process.id = id;
        process.name = name;
        process.description = description;
        process.triggerAggregateId = triggerAggregateId;
        process.triggerEvent = triggerEvent;
        process.ownerBoundedContextId = ownerBoundedContextId;
        process.steps = steps != null ? steps : List.of();
        process.onCompletionEventName = onCompletionEventName;
        process.sla = sla;
        return process;
    }

    public static Process load(String id, String name, String description,
                               String triggerAggregateId, String triggerEvent, String ownerBoundedContextId,
                               List<ProcessStep> steps, String onCompletionEventName, String sla) {
        return of(new ProcessId(id), new ProcessName(name), description,
                triggerAggregateId, triggerEvent, ownerBoundedContextId, steps, onCompletionEventName, sla);
    }

    public void update(ProcessName name, String description,
                       String triggerAggregateId, String triggerEvent, String ownerBoundedContextId,
                       List<ProcessStep> steps, String onCompletionEventName, String sla) {
        this.name = name;
        this.description = description;
        this.triggerAggregateId = triggerAggregateId;
        this.triggerEvent = triggerEvent;
        this.ownerBoundedContextId = ownerBoundedContextId;
        this.steps = steps != null ? steps : List.of();
        this.onCompletionEventName = onCompletionEventName;
        this.sla = sla;
    }
}
