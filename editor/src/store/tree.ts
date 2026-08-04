/**
 * The granular file tree: one directory per element type, one file per element.
 *
 * ```
 * modux/
 * ├── index.yaml              formatVersion + counts per type
 * ├── aggregates/{id}.yaml
 * └── …
 * ```
 *
 * Reads walk the whole tree; writes touch only what changed. The host supplies
 * the `FileSystem` — the IDE's virtual file system in a plugin, node's `fs` in
 * tests and CLI.
 */

import { parse, stringify } from 'yaml';
import { ModelStore, normalize, type Changes, type Element, type TypeName } from './store.js';

/** The file operations the tree needs. Paths are relative to the model root. */
export interface FileSystem {
  /** File names directly inside `dir`; empty when it does not exist. */
  list(dir: string): Promise<string[]>;
  read(path: string): Promise<string>;
  write(path: string, content: string): Promise<void>;
  delete(path: string): Promise<void>;
  exists(path: string): Promise<boolean>;
}

export const INDEX = 'index.yaml';

/** The file name an element is stored under. Mirrors the Java `sanitize`. */
export function fileNameOf(id: string): string {
  return `${id.replace(/[^A-Za-z0-9._-]/g, '_')}.yaml`;
}

export const pathOf = (type: TypeName, id: string) => `${type}/${fileNameOf(id)}`;

/** True when `root` looks like a granular model — that is, it is a project. */
export async function isModelRoot(fs: FileSystem, root: string): Promise<boolean> {
  return fs.exists(join(root, INDEX));
}

/**
 * Read the whole tree. Directories are discovered from disk rather than from a
 * fixed list, so a store written by a newer modux — with element types this
 * build has never heard of — still round-trips instead of losing them.
 */
export async function loadTree(fs: FileSystem, root: string): Promise<ModelStore> {
  const index = (await readYaml<IndexFile>(fs, join(root, INDEX))) ?? { formatVersion: 1, counts: {} };
  const data: Record<TypeName, Element[]> = {};

  for (const type of Object.keys(index.counts ?? {})) {
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
  return store;
}

/**
 * Write the pending changes and nothing else, then refresh the index.
 *
 * This is the plugin's write rule: a full-directory rewrite would touch every
 * file on every edit, churn git, and stomp whatever the user or an agent is
 * editing by hand in another window.
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
  await fs.write(join(root, INDEX), toYaml(indexOf(store)));
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
  await fs.write(join(root, INDEX), toYaml(indexOf(store)));
  store.clearChanges();
}

interface IndexFile {
  formatVersion: number;
  counts: Record<string, number>;
}

function indexOf(store: ModelStore): IndexFile {
  const counts: Record<string, number> = {};
  for (const type of store.types()) {
    const size = store.all(type).length;
    if (size) counts[type] = size;
  }
  return { formatVersion: 1, counts };
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
