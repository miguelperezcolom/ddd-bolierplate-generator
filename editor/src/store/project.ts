/**
 * The projection: the store's shape (one bucket per element type) turned into
 * the denormalized shape the editor draws from (`model.ts`).
 *
 * The Java original is `EditorModelProjection`, 951 lines. A large part of that
 * file is scoping work — deciding which bounded contexts belong to the *current*
 * project by walking services and modules, and hiding the ones wired elsewhere.
 * With one project per repository that whole question disappears: everything in
 * the tree belongs to the project, because the tree is the project.
 *
 * COVERAGE: the core block — bounded contexts and what they own, the context
 * map, actors, services and modules, APIs, the read side, flows, and the canvas
 * furniture — plus the UI block, which lives in `project-ui.ts` because it
 * answers a different question and is the half that keeps moving. The workflow
 * and agent blocks are not projected yet, and neither are processes, which have
 * a view of their own.
 * `projectedTypes()` reports what is covered, so a host can tell the difference
 * between "empty" and "not ported" — and say so rather than draw a blank.
 */

import type {
  AggregateRef,
  ApplicationEventRef,
  BoundedContextRef,
  ContextMapRelation,
  DomainEventRef,
  DomainServiceRef,
  EntityRef,
  FlowRef,
  ModuxModel,
  ReadModelRef,
  UseCaseRef,
  ValueObjectRef,
} from '../model.js';
import { projectUi, UI_PROJECTED_TYPES } from './project-ui.js';
import { asList, type Element, type ModelStore } from './store.js';

/** Element types this projection reads. Anything else in the tree is passed over. */
export function projectedTypes(): string[] {
  return [
    'projects', 'services', 'modules', 'boundedContexts', 'aggregates', 'entities',
    'valueObjects', 'useCases', 'domainEvents', 'applicationEvents', 'domainServices',
    'readModels', 'models', 'contextMapRelations', 'archimateRelations', 'roles', 'externalSystems',
    'notes', 'areas', 'urls', 'views', 'apis', 'proxyApis', 'queryServices', 'projections',
    'scheduledTriggers', 'flows',
    ...UI_PROJECTED_TYPES,
  ];
}

/** Types present in the store that the projection does not read yet. */
export function unprojectedTypes(store: ModelStore): string[] {
  const covered = new Set(projectedTypes());
  return store.types().filter((type) => !covered.has(type)).sort();
}

export function project(store: ModelStore): ModuxModel {
  const owner = ownerIndex(store);

  return {
    boundedContexts: store.all('boundedContexts').map((bc) => boundedContext(store, bc, owner)),
    relations: store.all('contextMapRelations').map(relation),
    aggregates: store.all('aggregates').map((a) => aggregate(a, owner)),
    entities: store.all('entities').map(entity),
    valueObjects: store.all('valueObjects').map((vo) => valueObject(vo, owner)),
    externalSystems: store.all('externalSystems').map(named),
    services: store.all('services').map((s) => ({
      id: s.id,
      name: name(s),
      moduleIds: asList(s.moduleIds),
    })),
    modules: store.all('modules').map((m) => ({
      id: m.id,
      name: name(m),
      boundedContextId: str(m.boundedContextId) ?? '',
      main: m.main === true,
    })),
    // an actor is a `roles` element in the store — `RoleEntity` on the Java side
    actors: store.all('roles').map(named),
    models: store.all('models').map((m) => ({
      id: m.id,
      name: name(m),
      fields: (Array.isArray(m.fields) ? (m.fields as Element[]) : []).map((f) => ({
        id: f.id,
        name: name(f),
        type: str(f.type),
      })),
    })),
    notes: store.all('notes').map((n) => ({
      id: n.id,
      text: str(n.text) ?? '',
      // elements only: the edge refs are view coordinates and the editor reads them per view
      targetIds: asList(n.targetIds),
    })),
    areas: store.all('areas').map((a) => ({ id: a.id, name: str(a.title) ?? name(a) })),
    urls: store.all('urls').map((u) => ({ id: u.id, name: name(u), uri: str(u.url) ?? '' })),
    archimateRelations: store.all('archimateRelations').map((r) => ({
      id: r.id,
      sourceId: str(r.sourceId) ?? '',
      targetId: str(r.targetId) ?? '',
      type: str(r.type) ?? '',
      label: str(r.name),
    })),
    flows: store.all('flows').map((f) => flow(f, owner)).filter(isDrawable),
    ...projectUi(store),
  };
}

/**
 * A flow's TARGET is stored; its SOURCE is not — it is whichever context owns whatever fires the
 * flow. Deriving it rather than storing it is what keeps the two from disagreeing: move an
 * aggregate to another context and every flow it triggers follows, with nothing to update.
 *
 * Mirrors `FlowContextMapCoherenceService.analyzeOne` on the Java side.
 */
function flow(f: Element, owner: OwnerIndex): FlowRef {
  const trigger = str(f.triggerAggregateId) ?? str(f.triggerDomainServiceId) ?? str(f.triggerUseCaseId);
  return {
    id: f.id,
    name: name(f),
    sourceId: (trigger ? owner.of.get(trigger) : undefined) ?? '',
    targetId: str(f.targetBoundedContextId) ?? '',
    archetype: f.archetype as FlowRef['archetype'],
    triggerAggregateId: str(f.triggerAggregateId),
    triggerEvent: str(f.triggerEvent),
    targetUseCaseId: str(f.targetUseCaseId),
    readModelName: str(f.readModelName),
  };
}

/** A flow missing either end is not an edge yet; the canvas has nothing to draw it between. */
const isDrawable = (f: FlowRef) => Boolean(f.sourceId && f.targetId);

/**
 * Which bounded context owns each element.
 *
 * The store records ownership in two directions depending on the type — a
 * context lists its aggregate ids, while a use case may instead name its
 * context. Indexing both once here keeps every projection below a lookup.
 */
interface OwnerIndex {
  /** element id → bounded context id */
  of: Map<string, string>;
}

function ownerIndex(store: ModelStore): OwnerIndex {
  const of = new Map<string, string>();
  for (const context of store.all('boundedContexts')) {
    for (const field of ['aggregateIds', 'useCaseIds', 'valueObjectIds']) {
      for (const id of asList(context[field])) of.set(id, context.id);
    }
  }
  // the other direction: elements that name their context themselves
  for (const type of ['useCases', 'domainEvents', 'applicationEvents', 'domainServices', 'readModels',
    'queryServices', 'projections', 'scheduledTriggers']) {
    for (const element of store.all(type)) {
      const declared = str(element.boundedContextId);
      if (declared) of.set(element.id, declared);
    }
  }
  return { of };
}

function boundedContext(store: ModelStore, bc: Element, owner: OwnerIndex): BoundedContextRef {
  const owns = (element: Element) => owner.of.get(element.id) === bc.id;
  const service = store.all('services').find((s) =>
    asList(s.moduleIds).some((moduleId) => store.get('modules', moduleId)?.boundedContextId === bc.id));

  return {
    id: bc.id,
    name: name(bc),
    subdomainType: bc.subdomainType as BoundedContextRef['subdomainType'],
    serviceId: service?.id,
    useCases: store.all('useCases').filter(owns).map(useCase),
    domainEvents: store.all('domainEvents').filter(owns).map(domainEvent),
    applicationEvents: store.all('applicationEvents').filter(owns).map(named) as ApplicationEventRef[],
    domainServices: store.all('domainServices').filter(owns).map(named) as DomainServiceRef[],
    readModels: store.all('readModels').filter(owns).map((rm) => ({
      id: rm.id,
      name: name(rm),
      aggregateId: str(rm.aggregateId),
    })) as ReadModelRef[],
  };
}

function useCase(uc: Element): UseCaseRef {
  const steps = Array.isArray(uc.steps) ? (uc.steps as Element[]) : [];
  return {
    id: uc.id,
    name: name(uc),
    policy: uc.policy === true,
    stepIds: steps.map((s) => s.id),
    steps: steps.map((s) => ({
      id: s.id,
      name: str(s.name),
      type: str(s.type),
      customCodeId: str(s.customCodeId),
    })),
    inputModelId: str(uc.inputModelId),
  };
}

const domainEvent = (event: Element): DomainEventRef => ({ id: event.id, name: name(event) });

const aggregate = (agg: Element, owner: OwnerIndex): AggregateRef => ({
  id: agg.id,
  name: name(agg),
  boundedContextId: owner.of.get(agg.id) ?? '',
  modelId: str(agg.modelId),
  invariants: nestedNamed(agg.invariants),
  operations: nestedNamed(agg.operations),
});

const entity = (ent: Element): EntityRef => ({
  id: ent.id,
  name: name(ent),
  aggregateId: str(ent.parentAggregateId) ?? '',
  modelId: str(ent.modelId),
  invariants: nestedNamed(ent.invariants),
});

const valueObject = (vo: Element, owner: OwnerIndex): ValueObjectRef => ({
  id: vo.id,
  name: name(vo),
  aggregateId: owner.of.get(vo.id) ?? '',
  type: str(vo.type),
  invariants: nestedNamed(vo.invariants),
});

const named = (element: Element) => ({ id: element.id, name: name(element) });

function nestedNamed(value: unknown): { id: string; name: string }[] {
  return Array.isArray(value)
    ? (value as Element[]).map((item) => ({ id: item.id, name: name(item) }))
    : [];
}

/** The editor identifies a relation by its endpoints; the store keeps an id for the file name. */
function relation(rel: Element): ContextMapRelation {
  return {
    sourceId: str(rel.sourceBoundedContextId) ?? '',
    targetId: str(rel.targetBoundedContextId) ?? '',
    type: (rel.type as ContextMapRelation['type']) ?? null,
    declared: true,
  };
}

const name = (element: Element) => str(element.name) ?? element.id;
const str = (value: unknown) => (typeof value === 'string' && value ? value : undefined);
