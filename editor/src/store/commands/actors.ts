/**
 * Actors and what they are allowed to reach.
 *
 * An actor is a `roles` element in the store (`RoleEntity` on the Java side); "actor" is what the
 * editor calls it. Everything here is a permission, held on the actor rather than on the thing
 * reached: the use cases it may run, the query services it reads, the external systems it depends
 * on. Ported from `EditorApiController`.
 */

import { asList, type ModelStore } from '../store.js';
import { add, CommandError, type Handler, remove } from '../spec.js';

/** Which list on the actor a target belongs in, by what the target turns out to be. */
const USE_TARGETS: { type: string; list: string }[] = [
  { type: 'useCases', list: 'allowedUseCaseIds' },
  { type: 'queryServices', list: 'allowedQueryServiceIds' },
];

export const ACTOR_COMMANDS: Record<string, Handler> = {
  'add-actor': add({ type: 'roles', init: () => ({ allowedUseCaseIds: [] }) }),

  /**
   * An actor cannot simply vanish from under the things that name it: a process step assigned to
   * it, or a use case that lists it, would be left pointing at nobody.
   */
  'remove-actor': (store, command) => {
    const id = String(command.id);
    const inProcess = store.all('processes').some((p) =>
      (Array.isArray(p.steps) ? (p.steps as Record<string, unknown>[]) : [])
        .some((step) => step.roleId === id || step.escalationRoleId === id));
    if (inProcess) {
      throw new CommandError(`El actor ${id} participa en procesos; desasígnalo primero`);
    }
    const inUseCase = store.all('useCases').some((uc) => asList(uc.allowedRoles).includes(id));
    if (inUseCase) {
      throw new CommandError(`El actor ${id} está permitido en casos de uso; desasígnalo primero`);
    }
    store.remove('roles', id);
  },

  /** An actor uses a use case or a query service directly — the seed of a derived UI. */
  'add-actor-use': (store, command) => {
    const actor = requireActor(store, command.sourceId);
    const target = String(command.targetId);
    const kind = USE_TARGETS.find((t) => store.has(t.type, target));
    if (!kind) {
      throw new CommandError(
        `Un actor solo usa casos de uso o query services; destino desconocido: ${target}`);
    }
    store.addToList('roles', actor.id, kind.list, target);
  },

  /** Symmetric removal: the target may be either kind, and we do not know which. */
  'remove-actor-use': (store, command) => {
    const actor = store.get('roles', String(command.sourceId));
    if (!actor) return;
    for (const kind of USE_TARGETS) {
      store.removeFromList('roles', actor.id, kind.list, String(command.targetId));
    }
  },

  /** An actor depends on an external system — drawn on the context map as a dependency. */
  'add-actor-external': (store, command) => {
    const actor = requireActor(store, command.sourceId);
    const target = String(command.targetId);
    if (!store.has('externalSystems', target)) {
      throw new CommandError(`Sistema externo desconocido: ${target}`);
    }
    store.addToList('roles', actor.id, 'externalSystemIds', target);
  },

  'remove-actor-external': (store, command) => {
    store.removeFromList('roles', String(command.sourceId), 'externalSystemIds',
      String(command.targetId));
  },

  // ---- views ---------------------------------------------------------------

  'add-view': add({
    type: 'views',
    init: (c) => ({ kind: 'CURATED', memberIds: c.memberIds ?? [] }),
  }),

  'remove-view': remove({ type: 'views' }),

  /**
   * Put an existing element in a view. A computed view has no say in its members — they are
   * derived from its seed — so adding one by hand would be silently undone on the next read.
   */
  'add-view-member': (store, command) => {
    const view = store.get('views', String(command.id));
    if (!view) throw new CommandError(`Vista desconocida: ${command.id}`);
    if (view.kind === 'COMPUTED') {
      throw new CommandError(
        `La vista ${view.name ?? view.id} es computada; sus miembros se derivan del seed`);
    }
    store.addToList('views', view.id, 'memberIds', String(command.targetId));
  },

  /** Takes the element OUT OF THE VIEW; the element itself is untouched. */
  'remove-view-member': (store, command) => {
    store.removeFromList('views', String(command.id), 'memberIds', String(command.targetId));
  },

  // ---- what a module packages ---------------------------------------------

  /**
   * Assign an element to a module. An element lives in exactly one module of its bounded
   * context, so assigning here MOVES it — the modules of that same context let go first.
   */
  'add-module-element': (store, command) => {
    const moduleId = String(command.id);
    const module = store.get('modules', moduleId);
    if (!module) throw new CommandError(`Módulo desconocido: ${moduleId}`);
    const elementId = String(command.elementId);
    for (const sibling of store.all('modules')) {
      if (sibling.id === moduleId) continue;
      if (sibling.boundedContextId !== module.boundedContextId) continue;
      store.removeFromList('modules', sibling.id, 'elementIds', elementId);
    }
    store.addToList('modules', moduleId, 'elementIds', elementId);
  },

  'remove-module-element': (store, command) => {
    const moduleId = String(command.id);
    if (!store.has('modules', moduleId)) throw new CommandError(`Módulo desconocido: ${moduleId}`);
    store.removeFromList('modules', moduleId, 'elementIds', String(command.elementId));
  },

  // ---- where a service answers --------------------------------------------

  'add-service-url': (store, command) => {
    const serviceId = String(command.serviceId);
    if (!store.has('services', serviceId)) throw new CommandError(`Servicio desconocido: ${serviceId}`);
    if (!store.has('urls', String(command.id))) throw new CommandError(`URL desconocida: ${command.id}`);
    store.addToList('services', serviceId, 'urlIds', String(command.id));
  },

  'remove-service-url': (store, command) => {
    store.removeFromList('services', String(command.serviceId), 'urlIds', String(command.id));
  },
};

function requireActor(store: ModelStore, id: unknown) {
  const actor = store.get('roles', String(id));
  if (!actor) throw new CommandError(`Actor desconocido: ${id}`);
  return actor;
}

/** Element shapes this block creates, for the schema-defaults check in tests. */
export const ACTOR_TYPES: string[] = ['roles', 'views'];
