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
      kind: 'remove-module';
      id: string;
    }
  | {
      kind: 'remove-aggregate';
      id: string;
    }
  | {
      /** `type` carries the elementType (module | aggregate | entity). */
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
  | { kind: 'remove-process'; id: string };

export interface ModuxSelection {
  elementType: string;
  id: string;
}
