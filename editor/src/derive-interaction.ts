/**
 * Deriving an interaction from the model: the message chain that follows from an entry point.
 *
 * Nothing here is stored. The model already says what calls what — a use case's steps, an event's
 * consumers — and a sequence diagram is that read as an ordered walk. So the derivation is a pure
 * function of the model, which is why it belongs on the client: it needs no server, and asking
 * one for it was the only reason the editor ever had to wait.
 *
 * A depth-first pre-order walk: the steps of a pipeline IN ORDER, each published event forking one
 * message per consumer, use-case consumers recursing. A cycle is cut with the DFS path — the
 * message that closes the loop is emitted, its expansion is not, because the call is real and
 * following it again would not end.
 *
 * Ported from `DeriveInteractionUseCase`.
 */

import type {
  InteractionMessageKind, InteractionMessageRef, InteractionRef, ModuxModel,
} from './model.js';

export type DerivationKind = 'USE_CASE' | 'API_OPERATION' | 'EVENT';

/** Raised when the entry point does not name anything the model knows. */
export class DerivationError extends Error {}

/**
 * The interaction that follows from `ref`.
 *
 * `ref` is an element id, except for an EVENT, where it is the event's NAME — events are keyed by
 * name everywhere they are consumed (flows, subscriptions, processes), so the name is the only
 * thing all the ends agree on.
 */
export function deriveInteraction(
  model: ModuxModel, kind: DerivationKind, ref: string,
): InteractionRef {
  if (!ref || !ref.trim()) throw new DerivationError('Hace falta un punto de partida');
  const index = indexOf(model);
  const walk = new Walk(model, index);
  let name: string;

  switch (kind) {
    case 'USE_CASE': {
      if (!index.useCases.has(ref)) throw new DerivationError(`Caso de uso desconocido: ${ref}`);
      walk.expandUseCase(ref, 0);
      name = index.names.get(ref) ?? ref;
      break;
    }
    case 'API_OPERATION': {
      const operation = index.apiOperations.get(ref);
      if (!operation) throw new DerivationError(`Operación de API desconocida: ${ref}`);
      if (operation.targetUseCaseId) {
        walk.emit(ref, operation.targetUseCaseId, 'COMMAND',
          index.names.get(operation.targetUseCaseId) ?? operation.targetUseCaseId, 0);
        walk.expandUseCase(operation.targetUseCaseId, 1);
      }
      name = operation.name;
      break;
    }
    case 'EVENT': {
      // no declared emitter: the event's own name stands in as the source lifeline, so the
      // messages still draw — as unbacked intent, which is the honest reading
      walk.fanOut(firstEmitter(model, index, ref) ?? ref, ref, 0);
      name = ref;
      break;
    }
    default:
      throw new DerivationError(`Punto de partida no soportado: ${kind}`);
  }

  return {
    id: null,
    ephemeral: true,
    name,
    triggerKind: kind,
    triggerRef: ref,
    messages: walk.messages,
  };
}

/** A consumer of an event: where the message goes, and whether following it means recursing. */
interface Consumer {
  ref: string;
  useCase: boolean;
}

interface Index {
  names: Map<string, string>;
  useCases: Map<string, NonNullable<ModuxModel['boundedContexts'][number]['useCases']>[number]>;
  apiOperations: Map<string, { name: string; targetUseCaseId?: string }>;
  aggregates: Map<string, { operations?: { id: string; name: string }[] }>;
  /** event id → name, for the steps that publish by id but are consumed by name. */
  eventNames: Map<string, string>;
  /** external use case id → the system offering it, which is the lifeline. */
  externalSystemOfUseCase: Map<string, string>;
}

function indexOf(model: ModuxModel): Index {
  const names = new Map<string, string>();
  const useCases = new Map<string, any>();
  const eventNames = new Map<string, string>();
  const remember = (element: { id: string; name?: string }) => {
    if (element.name) names.set(element.id, element.name);
  };

  for (const context of model.boundedContexts ?? []) {
    remember(context);
    for (const useCase of context.useCases ?? []) {
      useCases.set(useCase.id, useCase);
      remember(useCase);
    }
    for (const event of [...(context.domainEvents ?? []), ...(context.applicationEvents ?? [])]) {
      remember(event);
      eventNames.set(event.id, event.name);
    }
    for (const element of [...(context.domainServices ?? []), ...(context.readModels ?? [])]) {
      remember(element);
    }
  }
  // a projection is a lifeline of its own when an event reaches it
  for (const projection of model.projections ?? []) remember(projection);
  for (const list of [model.aggregates, model.externalSystems, model.actors,
    model.workflows, model.processes, model.rags, model.aiAgents] as { id: string; name?: string }[][]) {
    for (const element of list ?? []) remember(element);
  }

  const apiOperations = new Map<string, { name: string; targetUseCaseId?: string }>();
  for (const api of model.apis ?? []) {
    for (const operation of api.operations ?? []) {
      apiOperations.set(operation.id, {
        name: operation.name,
        targetUseCaseId: operation.targetUseCaseId,
      });
      names.set(operation.id, operation.name);
    }
  }

  const aggregates = new Map(
    (model.aggregates ?? []).map((a) => [a.id, { operations: a.operations }]));

  const externalSystemOfUseCase = new Map<string, string>();
  for (const system of model.externalSystems ?? []) {
    for (const useCase of system.useCases ?? []) {
      externalSystemOfUseCase.set(useCase.id, system.id);
      names.set(useCase.id, useCase.name);
    }
  }

  return { names, useCases, apiOperations, aggregates, eventNames, externalSystemOfUseCase };
}

/** One derivation in progress: the messages so far, the DFS path, and the message counter. */
class Walk {
  readonly messages: InteractionMessageRef[] = [];

  private readonly path = new Set<string>();
  private counter = 0;

  constructor(private readonly model: ModuxModel, private readonly index: Index) {}

  emit(fromRef: string, toRef: string, kind: InteractionMessageKind, label: string, depth: number): void {
    this.counter += 1;
    this.messages.push({ id: `m${this.counter}`, fromRef, toRef, kind, label, depth });
  }

  /** The steps of the use case, in their declared order. Recursion is guarded by the path. */
  expandUseCase(useCaseId: string, depth: number): void {
    if (this.path.has(useCaseId)) return;
    const useCase = this.index.useCases.get(useCaseId);
    if (!useCase) return;
    this.path.add(useCaseId);
    try {
      for (const step of useCase.steps ?? []) {
        switch (step.type) {
          case 'CallUseCase':
            if (!step.useCaseId) break;
            this.emit(useCaseId, step.useCaseId, 'COMMAND',
              this.label(step.useCaseId, step.name), depth);
            this.expandUseCase(step.useCaseId, depth + 1);
            break;
          case 'CallQueryService':
            if (!step.queryServiceId) break;
            this.emit(useCaseId, step.queryServiceId, 'QUERY',
              this.label(step.queryServiceId, step.name), depth);
            break;
          case 'CallAggregateOperation':
          case 'SaveAggregate':
            if (!step.aggregateId) break;
            this.emit(useCaseId, step.aggregateId, 'COMMAND', this.aggregateLabel(step), depth);
            break;
          case 'CallExternalUseCase': {
            // the lifeline is the SYSTEM offering the called operation, not the operation
            const system = step.externalUseCaseId
              ? this.index.externalSystemOfUseCase.get(step.externalUseCaseId) : undefined;
            if (!system) break;
            this.emit(useCaseId, system, 'EXTERNAL',
              this.label(step.externalUseCaseId!, step.name), depth);
            break;
          }
          case 'PublishDomainEvent':
          case 'PublishApplicationEvent': {
            const eventId = step.domainEventId ?? step.applicationEventId;
            const eventName = eventId ? this.index.eventNames.get(eventId) : undefined;
            if (!eventName) break;
            this.fanOut(useCaseId, eventName, depth);
            break;
          }
          default:
            // read, transform, custom and gateway steps carry no interaction message
            break;
        }
      }
    } finally {
      this.path.delete(useCaseId);
    }
  }

  /** One EVENT message per consumer; use-case consumers recurse. */
  fanOut(fromRef: string, eventName: string, depth: number): void {
    for (const consumer of this.consumersOf(eventName)) {
      this.emit(fromRef, consumer.ref, 'EVENT', eventName, depth);
      if (consumer.useCase) this.expandUseCase(consumer.ref, depth + 1);
    }
  }

  /**
   * Who reacts to an event, in a deterministic order — flows that TRIGGER, subscriptions,
   * processes, workflows, then flows that MATERIALIZE. One message per distinct consumer: the
   * same target reached two ways is still one arrow.
   */
  private consumersOf(eventName: string): Consumer[] {
    const consumers = new Map<string, Consumer>();
    const add = (ref: string | undefined, useCase: boolean) => {
      if (ref && !consumers.has(ref)) consumers.set(ref, { ref, useCase });
    };

    for (const flow of this.model.flows ?? []) {
      if (flow.archetype === 'TRIGGERS' && sameEvent(flow.triggerEvent, eventName)) {
        add(flow.targetUseCaseId, true);
      }
    }
    for (const subscription of this.model.subscriptions ?? []) {
      if (!sameEvent(subscription.eventName, eventName)) continue;
      for (const action of subscription.actions ?? []) {
        if (action.type === 'CallUseCase') add(action.useCaseId, true);
      }
    }
    for (const process of this.model.processes ?? []) {
      if (sameEvent(process.triggerEvent, eventName)) add(process.id, false);
    }
    for (const workflow of this.model.workflows ?? []) {
      if (sameEvent(workflow.triggerEvent, eventName)) add(workflow.id, false);
    }
    for (const flow of this.model.flows ?? []) {
      if (flow.archetype !== 'MATERIALIZES' || !sameEvent(flow.triggerEvent, eventName)) continue;
      const readModel = (this.model.boundedContexts ?? [])
        .flatMap((bc) => bc.readModels ?? [])
        .find((rm) => sameEvent(flow.readModelName, rm.name));
      add(readModel?.id, false);
    }
    return [...consumers.values()];
  }

  /** An operation's own name reads better than the aggregate's when the step names one. */
  private aggregateLabel(step: { type?: string; aggregateId?: string; operationId?: string }): string {
    if (step.type === 'CallAggregateOperation' && step.operationId) {
      const operation = this.index.aggregates.get(step.aggregateId!)?.operations
        ?.find((op) => op.id === step.operationId);
      if (operation) return `${operation.name}()`;
    }
    return this.index.names.get(step.aggregateId!) ?? step.aggregateId!;
  }

  /** The target's own name, else what the step called itself, else the raw id. */
  private label(targetId: string, stepName: string | undefined): string {
    const preferred = this.index.names.get(targetId);
    if (preferred && preferred.trim()) return preferred;
    return stepName && stepName.trim() ? stepName : targetId;
  }
}

/**
 * The first element declaring it emits the event: aggregates and domain services announce it from
 * an operation's `emits`, use cases from a publish step. Undefined when nobody claims it.
 */
function firstEmitter(model: ModuxModel, index: Index, eventName: string): string | undefined {
  const emission = (model.emissions ?? []).concat(model.useCaseEmissions ?? [])
    .find((e) => sameEvent(index.eventNames.get(e.domainEventId), eventName));
  return emission?.sourceId;
}

/** Events are matched by name, and a name is not case- or padding-sensitive. */
const sameEvent = (a: string | undefined | null, b: string | undefined | null) =>
  Boolean(a && b && a.trim().toLowerCase() === b.trim().toLowerCase());
