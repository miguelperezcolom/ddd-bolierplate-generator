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
    };

export interface ModuxSelection {
  elementType: string;
  id: string;
}
