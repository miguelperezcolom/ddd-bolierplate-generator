/**
 * Command handlers, built from a few shapes instead of written out one by one.
 *
 * The 274 handlers on the Java side are only 12 lines each on average, and most
 * of those lines are the same four chores: check idempotency, validate the
 * parent, maintain the parent's back-reference list, and clean up references on
 * delete. Those chores live here once; a command's spec carries only what is
 * actually specific to it.
 */

import type { ModuxCommand } from '../commands.js';
import { asList, nested, type Element, type ModelStore, type TypeName } from './store.js';

/** Every field name any command can carry — distributed over the union. */
export type CommandField = ModuxCommand extends infer C
  ? C extends object
    ? keyof C
    : never
  : never;

/** A command as the applier reads it: known field names, unknown value types. */
export type Command = { kind: string } & Partial<Record<CommandField, any>>;

export type Handler = (store: ModelStore, command: Command) => void;

/** Raised when a command cannot be applied. The message reaches the user. */
export class CommandError extends Error {}

/** A parent that owns the element, and optionally lists it by id. */
export interface ParentSpec {
  type: TypeName;
  /** Command field holding the parent's id. */
  from: CommandField;
  /** Parent's list field that carries the child ids (the back-reference). */
  list?: string;
  /** When false, a missing parent is tolerated instead of raising. */
  required?: boolean;
}

export interface AddSpec {
  type: TypeName;
  /** Command field holding the new element's id. Defaults to `id`. */
  idFrom?: CommandField;
  parent?: ParentSpec;
  /** The element's own fields, beyond `id` and `name`. */
  init?: (command: Command, store: ModelStore) => Record<string, unknown>;
  /** Side elements created so the model is referentially complete from birth. */
  stubs?: (command: Command, store: ModelStore) => { type: TypeName; element: Element }[];
  /** Domain wiring that runs once the element and its parent link exist. */
  after?: (id: string, store: ModelStore, command: Command) => void;
}

export interface RemoveSpec {
  type: TypeName;
  idFrom?: CommandField;
  parent?: ParentSpec;
  /**
   * Refuse the delete while something still points at the element. Each rule is
   * checked against every element of its type.
   */
  guards?: { type: TypeName; field: string; message: (id: string) => string }[];
  /** List fields to scrub the id from, across every element of a type. */
  detach?: { type: TypeName; field: string }[];
  /** Element types whose members are deleted along with it. */
  cascade?: { type: TypeName; field: string }[];
}

/** Add an element, wiring it to its parent. Idempotent by id. */
export function add(spec: AddSpec): Handler {
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    if (!id) throw new CommandError(`${command.kind}: missing id`);
    if (store.has(spec.type, id)) return;

    const parent = resolveParent(store, spec.parent, command);
    for (const stub of spec.stubs?.(command, store) ?? []) {
      if (!store.has(stub.type, stub.element.id)) store.put(stub.type, stub.element);
    }
    store.put(spec.type, {
      id,
      ...(command.name !== undefined ? { name: command.name } : {}),
      ...spec.init?.(command, store),
    });
    if (parent && spec.parent?.list) {
      store.addToList(spec.parent.type, parent.id, spec.parent.list, id);
    }
    spec.after?.(id, store, command);
  };
}

export interface NestedAddSpec {
  /** Types that may own the nested list — searched in order. */
  owners: TypeName[];
  /** The owner's list field the item goes into. */
  list: string;
  idFrom?: CommandField;
  /** Command field holding the owner's id. */
  ownerFrom: CommandField | CommandField[];
  /** The new item's fields, beyond `id` and `name`. */
  init?: (command: Command) => Record<string, unknown>;
}

/**
 * Add an item to a list nested inside one of several possible owners — an
 * invariant, whose owner may be an aggregate, a value object or an entity.
 */
export function addNested(spec: NestedAddSpec): Handler {
  const from = Array.isArray(spec.ownerFrom) ? spec.ownerFrom : [spec.ownerFrom];
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    const ownerId = from.map((f) => command[f]).find((v) => v != null && v !== '') as string | undefined;
    if (!ownerId) throw new CommandError(`${command.kind}: missing owner`);

    for (const type of spec.owners) {
      const owner = store.get(type, ownerId);
      if (!owner) continue;
      const items = nested(owner[spec.list]);
      if (items.some((item) => item.id === id)) return;
      store.patch(type, ownerId, {
        [spec.list]: [...items, { id, name: command.name, ...spec.init?.(command) }],
      });
      return;
    }
    throw new CommandError(`${command.kind}: unknown owner ${ownerId}`);
  };
}

/** Remove a nested item from whichever owner holds it. */
export function removeNested(spec: { owners: TypeName[]; list: string; idFrom?: CommandField }): Handler {
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    const found = store.findOwner(spec.owners, spec.list, id);
    if (!found) return;
    store.patch(found.type, found.element.id, {
      [spec.list]: nested(found.element[spec.list]).filter((item) => item.id !== id),
    });
  };
}

/** Remove an element, after guards, scrubbing every reference to it. */
export function remove(spec: RemoveSpec): Handler {
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    if (!store.has(spec.type, id)) return;

    for (const guard of spec.guards ?? []) {
      const blocker = store.all(guard.type).find((e) => e[guard.field] === id);
      if (blocker) throw new CommandError(guard.message(id));
    }
    for (const rule of spec.cascade ?? []) {
      for (const child of store.all(rule.type).filter((e) => e[rule.field] === id)) {
        store.remove(rule.type, child.id);
      }
    }
    for (const rule of spec.detach ?? []) store.removeFromAllLists(rule.type, rule.field, id);
    if (spec.parent?.list) store.removeFromAllLists(spec.parent.type, spec.parent.list, id);
    store.remove(spec.type, id);
  };
}

export interface SetSpec {
  /** Types that may own the element — searched in order (polymorphic owners). */
  type: TypeName | TypeName[];
  idFrom?: CommandField;
  /** Field to write on the element. */
  field: string;
  /** Command field holding the new value. Defaults to the target field name. */
  from?: CommandField;
  /** Map the raw command value before writing (defaults to identity). */
  map?: (value: any, command: Command, store: ModelStore) => unknown;
}

/** Write one field on an element, wherever that element lives. */
export function setField(spec: SetSpec): Handler {
  const types = Array.isArray(spec.type) ? spec.type : [spec.type];
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    const raw = command[spec.from ?? (spec.field as CommandField)];
    const value = spec.map ? spec.map(raw, command, store) : raw;
    for (const type of types) {
      if (store.has(type, id)) {
        store.patch(type, id, { [spec.field]: value ?? null });
        return;
      }
    }
    throw new CommandError(`${command.kind}: unknown element ${id}`);
  };
}

export interface NestedSetSpec {
  /** Types that may hold the nested list — searched in order. */
  owners: TypeName[];
  /** The owner's list field holding the nested items. */
  list: string;
  idFrom?: CommandField;
  /** Produce the replacement for the matched item. */
  patch: (item: Element, command: Command) => Record<string, unknown>;
}

/**
 * Patch an item nested inside an owner's list — how invariants and conditions
 * are edited, where the owner may be an aggregate, a value object or an entity.
 */
export function setNested(spec: NestedSetSpec): Handler {
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    const found = store.findOwner(spec.owners, spec.list, id);
    if (!found) throw new CommandError(`${command.kind}: unknown element ${id}`);
    const items = nested(found.element[spec.list]).map((item) =>
      item.id === id ? { ...item, ...spec.patch(item as Element, command) } : item);
    store.patch(found.type, found.element.id, { [spec.list]: items });
  };
}

export interface ListSpec {
  type: TypeName;
  idFrom?: CommandField;
  field: string;
  /** Command field holding the value to add or remove. */
  valueFrom: CommandField;
}

/** Append to an element's list field, keeping it unique. */
export function addToList(spec: ListSpec): Handler {
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    if (!store.has(spec.type, id)) throw new CommandError(`${command.kind}: unknown element ${id}`);
    store.addToList(spec.type, id, spec.field, String(command[spec.valueFrom]));
  };
}

export function removeFromList(spec: ListSpec): Handler {
  return (store, command) => {
    const id = String(command[spec.idFrom ?? 'id'] ?? '');
    if (!store.has(spec.type, id)) return;
    store.removeFromList(spec.type, id, spec.field, String(command[spec.valueFrom]));
  };
}

/** Resolve and validate a command's declared parent. */
function resolveParent(
  store: ModelStore,
  spec: ParentSpec | undefined,
  command: Command,
): Element | undefined {
  if (!spec) return undefined;
  const id = command[spec.from] as string | undefined;
  if (id == null || id === '') {
    if (spec.required === false) return undefined;
    throw new CommandError(`${command.kind}: missing ${String(spec.from)}`);
  }
  const parent = store.get(spec.type, id);
  if (!parent && spec.required !== false) {
    throw new CommandError(`${command.kind}: unknown ${spec.type} ${id}`);
  }
  return parent;
}

/** Read a list field off an element in the store. */
export function listOf(store: ModelStore, type: TypeName, id: string, field: string): string[] {
  return asList(store.get(type, id)?.[field]);
}
