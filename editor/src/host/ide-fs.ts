/**
 * The model's file system, as seen from inside an IDE.
 *
 * Reads go straight through to the host. Writes and deletes are queued and sent
 * as one batch on `commit()` — not to save round trips, but because the IDE
 * turns one batch into one undo step, and one editor gesture should undo once.
 */

import type { FileSystem } from '../store/tree.js';

/** What the IDE exposes on the page. Requests are plain JSON, replies are values. */
export interface Bridge {
  (request: Record<string, unknown>): Promise<unknown>;
}

export interface IdeFileSystem extends FileSystem {
  /** Send everything queued so far as a single undoable edit. */
  commit(): Promise<void>;
  /** How many file operations are waiting. */
  pending(): number;
}

/** The bridge the IDE injected, or null when running outside one. */
export function hostBridge(): Bridge | null {
  const bridge = (globalThis as { moduxBridge?: Bridge }).moduxBridge;
  return typeof bridge === 'function' ? bridge : null;
}

export function ideFileSystem(bridge: Bridge): IdeFileSystem {
  const writes = new Map<string, string>();
  const deletes = new Set<string>();

  const queued = (path: string) => writes.has(path);

  return {
    async list(dir) {
      const names = (await bridge({ op: 'list', path: dir })) as string[];
      const queuedHere = [...writes.keys()]
        .filter((p) => p.startsWith(`${dir}/`) && !p.slice(dir.length + 1).includes('/'))
        .map((p) => p.slice(dir.length + 1));
      const deletedHere = new Set([...deletes].map((p) => p.slice(p.lastIndexOf('/') + 1)));
      return [...new Set([...names, ...queuedHere])].filter((n) => !deletedHere.has(`${dir}/${n}`.slice(dir.length + 1)));
    },

    async read(path) {
      // an uncommitted write is what this file says now
      const queuedContent = writes.get(path);
      if (queuedContent !== undefined) return queuedContent;
      return (await bridge({ op: 'read', path })) as string;
    },

    async write(path, content) {
      writes.set(path, content);
      deletes.delete(path);
    },

    async delete(path) {
      writes.delete(path);
      deletes.add(path);
    },

    async exists(path) {
      if (deletes.has(path)) return false;
      if (queued(path)) return true;
      return (await bridge({ op: 'exists', path })) as boolean;
    },

    pending() {
      return writes.size + deletes.size;
    },

    async commit() {
      if (!writes.size && !deletes.size) return;
      const batch = {
        op: 'flush',
        writes: [...writes].map(([path, content]) => ({ path, content })),
        deletes: [...deletes],
      };
      writes.clear();
      deletes.clear();
      await bridge(batch);
    },
  };
}
