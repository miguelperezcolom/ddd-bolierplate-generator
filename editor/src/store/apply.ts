/**
 * The applier: turns a `ModuxCommand` into changes on the store.
 *
 * This is what the IDE plugin runs in place of POSTing to a server. The editor
 * keeps emitting exactly the same commands it emits today; only who applies
 * them moves.
 */

import type { ModuxCommand } from '../commands.js';
import { CORE_COMMANDS } from './commands/core.js';
import type { Changes, ModelStore } from './store.js';
import { CommandError, type Command, type Handler } from './spec.js';

/** Every command kind the applier knows, by block. */
export const HANDLERS: Record<string, Handler> = {
  ...CORE_COMMANDS,
};

export { CommandError };

/** Whether a command kind can be applied yet. */
export function supports(kind: string): boolean {
  return kind in HANDLERS;
}

/** Command kinds the editor can emit that are not ported yet. */
export function unsupported(kinds: string[]): string[] {
  return kinds.filter((kind) => !supports(kind));
}

/**
 * Apply one command and return the files that must be written or deleted.
 *
 * The store is mutated in place. On failure it may be left partially changed,
 * so a host that cares should apply against a snapshot — see `applyAll`.
 */
export function apply(store: ModelStore, command: ModuxCommand | Command): Changes {
  const handler = HANDLERS[command.kind];
  if (!handler) throw new CommandError(`Comando no soportado: ${command.kind}`);
  store.clearChanges();
  handler(store, command as Command);
  return store.changes();
}

/**
 * Apply a batch atomically: either every command lands, or the store is left
 * untouched. Undo/redo and multi-step gestures replay through here.
 */
export function applyAll(store: ModelStore, commands: (ModuxCommand | Command)[]): Changes {
  const snapshot = store.toData();
  store.clearChanges();
  try {
    for (const command of commands) {
      const handler = HANDLERS[command.kind];
      if (!handler) throw new CommandError(`Comando no soportado: ${command.kind}`);
      handler(store, command as Command);
    }
  } catch (error) {
    store.replaceAll(snapshot);
    store.clearChanges();
    throw error;
  }
  return store.changes();
}
