/**
 * The granular file tree: one directory per element type, one file per element.
 *
 * ```
 * .modux/
 * ├── aggregates/{id}.yaml
 * └── …
 * ```
 *
 * There is no index file: the buckets are discovered from disk, and the catalog
 * directory's name (`.modux`) is what marks it (§12.3). Reads walk the whole
 * tree; writes touch only what changed. The host supplies the `FileSystem` — the
 * IDE's virtual file system in a plugin, node's `fs` in tests and CLI.
 */

import { parse, stringify } from 'yaml';
import { migrate } from './legacy.js';
import { ModelStore, normalize, type Changes, type Element, type TypeName } from './store.js';

/** The file operations the tree needs. Paths are relative to the model root. */
export interface FileSystem {
  /** File names directly inside `dir`; empty when it does not exist. */
  list(dir: string): Promise<string[]>;
  /** Subdirectory names directly inside `dir` — the element buckets. */
  listDirs(dir: string): Promise<string[]>;
  read(path: string): Promise<string>;
  write(path: string, content: string): Promise<void>;
  delete(path: string): Promise<void>;
  exists(path: string): Promise<boolean>;
}

/** The catalog directory: its name is the marker (§12.3), so no index file is needed. */
export const CATALOG_DIR = '.modux';

/** The file name an element is stored under. Mirrors the Java `sanitize`. */
export function fileNameOf(id: string): string {
  return `${id.replace(/[^A-Za-z0-9._-]/g, '_')}.yaml`;
}

export const pathOf = (type: TypeName, id: string) => `${type}/${fileNameOf(id)}`;

/** True when `root` is a catalog — that is, a directory named `.modux` (§12.3). */
export function isModelRoot(root: string): boolean {
  return root.replace(/\/+$/, '').split('/').filter(Boolean).at(-1) === CATALOG_DIR;
}

/**
 * Read the whole tree. The buckets are discovered from disk — one directory per
 * element type — so a store written by a newer modux, with types this build has
 * never heard of, still round-trips instead of losing them, and no index file
 * has to be kept in step.
 *
 * A tree written by an older modux is migrated on the way in (see `legacy.ts`).
 * What the migration moves is left pending, so it reaches disk with the next
 * flush rather than on opening the model.
 */
export async function loadTree(fs: FileSystem, root: string): Promise<ModelStore> {
  const data: Record<TypeName, Element[]> = {};

  for (const type of await fs.listDirs(root)) {
    const files = (await fs.list(join(root, type))).filter((f) => f.endsWith('.yaml'));
    const elements: Element[] = [];
    for (const file of files.sort()) {
      const element = await readYaml<Element>(fs, join(root, `${type}/${file}`));
      if (element) elements.push(element);
    }
    if (elements.length) data[type] = elements;
  }
  const store = ModelStore.from(data);
  store.clearChanges();
  migrate(store);
  return store;
}

/**
 * Write the pending changes and nothing else.
 *
 * This is the plugin's write rule: a full-directory rewrite would touch every
 * file on every edit, churn git, and stomp whatever the user or an agent is
 * editing by hand in another window. There is no index to refresh — a removed
 * element's file is deleted, and the buckets are read back from disk.
 */
export async function flush(fs: FileSystem, root: string, store: ModelStore): Promise<Changes> {
  const changes = store.changes();
  if (!changes.written.length && !changes.deleted.length) return changes;

  for (const { type, id } of changes.written) {
    const element = store.get(type, id);
    if (element) await fs.write(join(root, pathOf(type, id)), toYaml(element));
  }
  for (const { type, id } of changes.deleted) {
    const path = join(root, pathOf(type, id));
    if (await fs.exists(path)) await fs.delete(path);
  }
  store.clearChanges();
  return changes;
}

/** Write the whole tree from scratch — for `init` and for migrations, not for edits. */
export async function writeTree(fs: FileSystem, root: string, store: ModelStore): Promise<void> {
  for (const type of store.types()) {
    for (const element of store.all(type)) {
      await fs.write(join(root, pathOf(type, element.id)), toYaml(element));
    }
  }
  store.clearChanges();
}

async function readYaml<T>(fs: FileSystem, path: string): Promise<T | undefined> {
  if (!(await fs.exists(path))) return undefined;
  const raw = await fs.read(path);
  return raw.trim() ? (parse(raw) as T) : undefined;
}

/**
 * Serialize the way Jackson does on the Java side: `NON_EMPTY` inclusion, and
 * booleans only when true (`NON_DEFAULT`). Matching this exactly is what keeps
 * a file the plugin writes byte-identical to one modux wrote — otherwise every
 * touched element would show a diff full of `aggregateIds: []`.
 */
export function toYaml(value: unknown): string {
  return stringify(normalize(value), { lineWidth: 0 });
}

const join = (root: string, path: string) => (root ? `${root}/${path}` : path);
