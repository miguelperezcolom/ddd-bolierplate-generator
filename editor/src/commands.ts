import type { ContextMapRelationType, SubdomainType } from './model.js';

/**
 * Mutations the editor asks the host to apply to the model. The editor never
 * persists anything itself: the host applies the command to its model store
 * and feeds the updated model back through the `model` property.
 */
export type ModuxCommand =
  | {
      kind: 'add-relation';
      sourceId: string;
      targetId: string;
      type: ContextMapRelationType;
    }
  | {
      kind: 'remove-relation';
      sourceId: string;
      targetId: string;
    }
  | {
      /** Change the strategic pattern of an existing relation in place. */
      kind: 'set-relation-type';
      sourceId: string;
      targetId: string;
      type: ContextMapRelationType;
    }
  | {
      kind: 'add-module';
      id: string;
      name: string;
      subdomainType: SubdomainType;
    }
  | {
      kind: 'add-aggregate';
      id: string;
      name: string;
      moduleId: string;
    }
  | {
      kind: 'add-domain-event';
      id: string;
      name: string;
      moduleId: string;
    }
  | {
      kind: 'remove-module';
      id: string;
    }
  | {
      kind: 'remove-aggregate';
      id: string;
    }
  | {
      kind: 'remove-domain-event';
      id: string;
    }
  | {
      /** A system outside the bounded contexts (channel manager, ERP…). */
      kind: 'add-external-system';
      id: string;
      name: string;
    }
  | {
      kind: 'remove-external-system';
      id: string;
    }
  | {
      /** An AI agent that consumes use cases through MCP. */
      kind: 'add-ai-agent';
      id: string;
      name: string;
    }
  | {
      kind: 'remove-ai-agent';
      id: string;
    }
  | {
      /** The agent consumes the use case through MCP (sets exposedAsMcp). */
      kind: 'add-agent-use';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-agent-use';
      sourceId: string;
      targetId: string;
    }
  | {
      /** The agent calls an external system's operation (the other half of its tools). */
      kind: 'add-agent-external-use';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-agent-external-use';
      sourceId: string;
      targetId: string;
    }
  | {
      /** A RAG knowledge base an agent can ground its answers on. */
      kind: 'add-rag';
      id: string;
      name: string;
    }
  | { kind: 'remove-rag'; id: string }
  | {
      /** The agent queries the knowledge base (sourceId = agent, targetId = rag). */
      kind: 'add-agent-rag';
      sourceId: string;
      targetId: string;
    }
  | { kind: 'remove-agent-rag'; sourceId: string; targetId: string }
  | {
      /** The RAG indexes a read model's content (sourceId = rag, targetId = read model). */
      kind: 'add-rag-source';
      sourceId: string;
      targetId: string;
    }
  | { kind: 'remove-rag-source'; sourceId: string; targetId: string }
  | {
      /** External content feeding the RAG: a repo, a web site, an FTP server… */
      kind: 'add-rag-content-source';
      sourceId: string;
      type: string;
      uri: string;
    }
  | { kind: 'remove-rag-content-source'; sourceId: string; uri: string; type?: string }
  | {
      /** A table/dataset owned by an external system (moduleId = external system id). */
      kind: 'add-external-table';
      id: string;
      name: string;
      moduleId: string;
    }
  | { kind: 'remove-external-table'; id: string }
  | {
      /** Adds an existing catalog element to a CURATED view. */
      kind: 'add-view-member';
      id: string;
      targetId: string;
    }
  | {
      /** Removes an element from the view WITHOUT touching the element itself. */
      kind: 'remove-view-member';
      id: string;
      targetId: string;
    }
  | {
      /** A business actor (role). */
      kind: 'add-actor';
      id: string;
      name: string;
    }
  | {
      kind: 'remove-actor';
      id: string;
    }
  | {
      /** An application event: a fact published by a use case. */
      kind: 'add-application-event';
      id: string;
      name: string;
      moduleId: string;
    }
  | {
      kind: 'remove-application-event';
      id: string;
    }
  | {
      /** A domain service: stateless domain logic owned by a bounded context. */
      kind: 'add-domain-service';
      id: string;
      name: string;
      moduleId: string;
    }
  | {
      kind: 'remove-domain-service';
      id: string;
    }
  | {
      /** A read model born from an aggregate (it lives in the aggregate's module). */
      kind: 'add-read-model';
      id: string;
      name: string;
      aggregateId: string;
    }
  | {
      kind: 'remove-read-model';
      id: string;
    }
  | {
      /**
       * Project a source onto a read model — possibly in another bounded context.
       * The source is exactly one of: an aggregate's state, an external operation to
       * poll, or a legacy table to poll. `targetId` names an existing read model;
       * otherwise `moduleId` is the target context and a stub read model is born there.
       */
      kind: 'add-projection';
      id: string;
      name: string;
      aggregateId?: string;
      externalUseCaseId?: string;
      externalTableId?: string;
      targetId?: string;
      moduleId?: string;
      readModelName?: string;
    }
  | {
      kind: 'remove-projection';
      id: string;
    }
  | {
      /** A query service owned by a bounded context. */
      kind: 'add-query-service';
      id: string;
      name: string;
      moduleId: string;
    }
  | {
      kind: 'remove-query-service';
      id: string;
    }
  | {
      /** Use case A consumes query service B (a CallQueryService step in A). */
      kind: 'add-query-call';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-query-call';
      sourceId: string;
      targetId: string;
    }
  | {
      /** An actor uses a use case or a query service directly (derives a UI). */
      kind: 'add-actor-use';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-actor-use';
      sourceId: string;
      targetId: string;
    }
  | {
      /** An actor manages an aggregate through a CRUD UI (stub use cases appear). */
      kind: 'add-actor-crud';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-actor-crud';
      sourceId: string;
      targetId: string;
    }
  | {
      /** A plain use case in a bounded context — or a policy when flagged. */
      kind: 'add-use-case';
      id: string;
      name: string;
      moduleId: string;
      /** Reaction logic with use-case shape that expresses no business case. */
      policy?: boolean;
    }
  | {
      kind: 'remove-use-case';
      id: string;
    }
  | {
      /** An external system calls one of our use cases in (INBOUND ACL). */
      kind: 'add-external-call';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-external-call';
      sourceId: string;
      targetId: string;
    }
  | {
      /** A use case OFFERED by an external system (moduleId = external system id). */
      kind: 'add-external-use-case';
      id: string;
      name: string;
      moduleId: string;
    }
  | {
      kind: 'remove-external-use-case';
      id: string;
    }
  | {
      /** Our use case calls an external system's use case (CallExternalUseCase step). */
      kind: 'add-external-uc-call';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-external-uc-call';
      sourceId: string;
      targetId: string;
    }
  | {
      /** Use case A invokes use case B (a CallUseCase step in A). */
      kind: 'add-use-case-call';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-use-case-call';
      sourceId: string;
      targetId: string;
    }
  | {
      /** The source aggregate emits the target domain event. */
      kind: 'add-emission';
      sourceId: string;
      targetId: string;
    }
  | {
      kind: 'remove-emission';
      sourceId: string;
      targetId: string;
    }
  | {
      /** `type` carries the elementType (module | aggregate | entity | domain-event). */
      kind: 'rename-element';
      type: string;
      id: string;
      name: string;
    }
  | {
      kind: 'add-flow';
      id: string;
      name: string;
      archetype: string;
      triggerAggregateId: string;
      triggerEvent: string;
      /** Alternative trigger: the domain service emitting the trigger event. */
      triggerDomainServiceId?: string;
      /** Alternative trigger: the use case publishing the trigger APPLICATION event. */
      triggerUseCaseId?: string;
      /** Target module or external system. */
      targetId: string;
      readModelName?: string;
      targetUseCaseId?: string;
    }
  | { kind: 'remove-flow'; id: string }
  | {
      kind: 'add-process';
      id: string;
      name: string;
      moduleId: string;
      triggerAggregateId?: string;
      triggerEvent?: string;
      steps?: import('./model.js').ProcessStepRef[];
    }
  | { kind: 'remove-process'; id: string }
  | {
      kind: 'add-process-step';
      processId: string;
      id: string;
      name: string;
      stepType: 'AUTOMATED' | 'HUMAN';
      roleId?: string;
      deadline?: string;
      useCaseId?: string;
      compensationUseCaseId?: string;
      /** Insert after this step; append when omitted. */
      afterStepId?: string;
    }
  | { kind: 'remove-process-step'; processId: string; id: string }
  | {
      /** CURATED modux View whose members come from the canvas selection. */
      kind: 'add-view';
      id: string;
      name: string;
      memberIds: string[];
    }
  | { kind: 'remove-view'; id: string }
  | {
      /** Reposition a step; afterStepId omitted moves it to the front. */
      kind: 'move-process-step';
      processId: string;
      id: string;
      afterStepId?: string;
    }
  | {
      /** Replaces roleId/deadline/compensationUseCaseId wholesale (omitted clears). */
      kind: 'update-process-step';
      processId: string;
      id: string;
      roleId?: string;
      deadline?: string;
      compensationUseCaseId?: string;
    }
  | {
      /** A cross-context orchestrator living OUTSIDE the bounded contexts. */
      kind: 'add-workflow';
      id: string;
      name: string;
      triggerAggregateId?: string;
      triggerDomainServiceId?: string;
      triggerUseCaseId?: string;
      triggerEvent?: string;
      /** Event published when every step completes. */
      completionEventName?: string;
      workflowSteps?: import('./model.js').WorkflowStepRef[];
    }
  | { kind: 'remove-workflow'; id: string }
  | {
      kind: 'add-workflow-step';
      workflowId: string;
      id: string;
      name: string;
      emittedEventName?: string;
      targetUseCaseId?: string;
      completionEventName?: string;
      dependsOnStepIds?: string[];
      /** Insert after this step; append when omitted. */
      afterStepId?: string;
    }
  | { kind: 'remove-workflow-step'; workflowId: string; id: string }
  | {
      /** Replaces emittedEventName/targetUseCaseId/completionEventName wholesale (omitted clears). */
      kind: 'update-workflow-step';
      workflowId: string;
      id: string;
      emittedEventName?: string;
      targetUseCaseId?: string;
      completionEventName?: string;
    }
  | {
      /** The step `id` starts only after `dependsOnStepId` completes. */
      kind: 'add-workflow-dependency';
      workflowId: string;
      id: string;
      dependsOnStepId: string;
    }
  | {
      kind: 'remove-workflow-dependency';
      workflowId: string;
      id: string;
      dependsOnStepId: string;
    };

export interface ModuxSelection {
  elementType: string;
  id: string;
}
