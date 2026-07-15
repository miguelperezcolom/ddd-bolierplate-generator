package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * A long-running business process declared by intent (see docs/design/process-intent-layer.md):
 * ordered automated/human steps with deadlines and escalation, started by a domain event. Expanded
 * by convention into saga + subscription + scheduled deadline triggers + task worklist read model.
 */
public record ProcessEntity(
        String id,
        String name,
        String description,
        String triggerAggregateId,
        String triggerEvent,
        String ownerBoundedContextId,
        List<ProcessStepEntity> steps,
        String onCompletionEventName,
        /** End-to-end SLA as an ISO-8601 duration (e.g. P3D). */
        String sla,
        /** Architecture decisions (ADRs) this process traces back to. */
        List<String> decisionIds
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public ProcessEntity {
        if (steps == null) steps = List.of();
    }

    /** Backward-compatible constructor (pre-decisionIds callers). */
    public ProcessEntity(String id, String name, String description, String triggerAggregateId,
                         String triggerEvent, String ownerBoundedContextId, List<ProcessStepEntity> steps,
                         String onCompletionEventName, String sla) {
        this(id, name, description, triggerAggregateId, triggerEvent, ownerBoundedContextId, steps,
                onCompletionEventName, sla, List.of(), null);
    }
}
