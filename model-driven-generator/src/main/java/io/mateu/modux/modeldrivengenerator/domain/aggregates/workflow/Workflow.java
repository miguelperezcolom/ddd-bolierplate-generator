package io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowStep;
import lombok.Getter;

import java.util.List;

/**
 * An orchestrator that lives OUTSIDE every bounded context — unlike {@code Process}, it has no
 * owner module. Started by an event, it advances a dependency graph of steps, each of which emits
 * an event that starts a task (a use case, for now) inside a bounded context. The workflow never
 * calls anything directly; all workflow↔context communication travels as events.
 */
@Getter
public class Workflow {

    private WorkflowId id;
    private WorkflowName name;
    private String description;

    // when: the event that starts the workflow, and who emits/publishes it
    private String triggerAggregateId;
    private String triggerDomainServiceId;
    private String triggerUseCaseId;
    private String triggerEvent;

    private List<WorkflowStep> steps;

    // event published when every step completes (defaults to <Name>Completed)
    private String onCompletionEventName;

    public static Workflow of(WorkflowId id, WorkflowName name, String description,
                              String triggerAggregateId, String triggerDomainServiceId,
                              String triggerUseCaseId, String triggerEvent,
                              List<WorkflowStep> steps, String onCompletionEventName) {
        var workflow = new Workflow();
        workflow.id = id;
        workflow.name = name;
        workflow.description = description;
        workflow.triggerAggregateId = triggerAggregateId;
        workflow.triggerDomainServiceId = triggerDomainServiceId;
        workflow.triggerUseCaseId = triggerUseCaseId;
        workflow.triggerEvent = triggerEvent;
        workflow.steps = steps != null ? steps : List.of();
        workflow.onCompletionEventName = onCompletionEventName;
        return workflow;
    }

    public static Workflow load(String id, String name, String description,
                                String triggerAggregateId, String triggerDomainServiceId,
                                String triggerUseCaseId, String triggerEvent,
                                List<WorkflowStep> steps, String onCompletionEventName) {
        return of(new WorkflowId(id), new WorkflowName(name), description,
                triggerAggregateId, triggerDomainServiceId, triggerUseCaseId, triggerEvent,
                steps, onCompletionEventName);
    }

    public void update(WorkflowName name, String description,
                       String triggerAggregateId, String triggerDomainServiceId,
                       String triggerUseCaseId, String triggerEvent,
                       List<WorkflowStep> steps, String onCompletionEventName) {
        this.name = name;
        this.description = description;
        this.triggerAggregateId = triggerAggregateId;
        this.triggerDomainServiceId = triggerDomainServiceId;
        this.triggerUseCaseId = triggerUseCaseId;
        this.triggerEvent = triggerEvent;
        this.steps = steps != null ? steps : List.of();
        this.onCompletionEventName = onCompletionEventName;
    }
}
