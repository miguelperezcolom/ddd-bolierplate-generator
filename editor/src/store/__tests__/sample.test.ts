/**
 * The format layer, checked against a real hand-authored model rather than
 * fixtures: `sample/hla-booking` is versioned and is what modux itself ships.
 *
 * These are the guards that matter for the IDE plugin — if a round trip is not
 * an identity, every file the plugin touches shows a spurious diff.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { beforeAll, describe, expect, it } from 'vitest';
import { ModelStore, type Element } from '../store.js';
import { flush, loadTree, type FileSystem, writeTree } from '../tree.js';

const SAMPLE = fileURLToPath(
  new URL('../../../../sample/hla-booking/model-driven-store.yaml', import.meta.url));

function memoryFs(): FileSystem & { files: Map<string, string> } {
  const files = new Map<string, string>();
  return {
    files,
    async list(dir) {
      const prefix = `${dir}/`;
      return [...files.keys()]
        .filter((p) => p.startsWith(prefix) && !p.slice(prefix.length).includes('/'))
        .map((p) => p.slice(prefix.length));
    },
    async read(path) {
      return files.get(path)!;
    },
    async write(path, content) {
      files.set(path, content);
    },
    async delete(path) {
      files.delete(path);
    },
    async exists(path) {
      return files.has(path);
    },
  };
}

/** The monolithic store is `AllData`: one list of elements per element type. */
function readSample(): Record<string, Element[]> {
  const raw = parse(readFileSync(SAMPLE, 'utf8')) as Record<string, unknown>;
  return Object.fromEntries(
    Object.entries(raw).filter(([, value]) =>
      Array.isArray(value) && value.length > 0
      && value.every((e) => e && typeof e === 'object' && 'id' in e)),
  ) as Record<string, Element[]>;
}

/** Compare content without depending on element order within a type. */
const byId = (data: Record<string, Element[]>) =>
  Object.fromEntries(Object.entries(data).map(([type, list]) =>
    [type, Object.fromEntries(list.map((e) => [e.id, e]))]));

describe('the hla-booking sample', () => {
  let data: Record<string, Element[]>;

  beforeAll(() => {
    data = readSample();
  });

  it('is big enough to be worth checking', () => {
    const elements = Object.values(data).reduce((n, list) => n + list.length, 0);

    expect(Object.keys(data).length).toBeGreaterThan(5);
    expect(elements).toBeGreaterThan(50);
  });

  it('every element has an id, so every element has a file', () => {
    const anonymous = Object.entries(data)
      .filter(([, list]) => list.some((e) => !e.id))
      .map(([type]) => type);

    expect(anonymous).toEqual([]);
  });

  it('ids stay unique per type once sanitized into file names', () => {
    for (const [type, list] of Object.entries(data)) {
      const names = list.map((e) => e.id.replace(/[^A-Za-z0-9._-]/g, '_'));

      expect(new Set(names).size, `collision in ${type}`).toBe(names.length);
    }
  });

  it('round-trips through the granular tree without losing anything', async () => {
    const fs = memoryFs();
    const store = ModelStore.from(data);
    await writeTree(fs, 'modux', store);

    const reloaded = await loadTree(fs, 'modux');

    expect(byId(reloaded.toData())).toEqual(byId(store.toData()));
  });

  /**
   * One file per element means the tree has no place to record the order of a
   * type's elements: a load sorts by file name, exactly as the Java format
   * does. Converting a monolithic store therefore reorders each type once — a
   * one-off diff, stable from then on. Order inside an element (a use case's
   * steps, say) lives in that element's own file and is untouched.
   */
  it('normalizes element order to the file name, and then holds it', async () => {
    const fs = memoryFs();
    await writeTree(fs, 'modux', ModelStore.from(data));

    const once = await loadTree(fs, 'modux');
    await writeTree(fs, 'modux', once);
    const twice = await loadTree(fs, 'modux');

    const type = Object.keys(data).find((t) => data[t].length > 2)!;
    const ids = once.all(type).map((e) => e.id);

    expect(ids).toEqual([...ids].sort());
    expect(twice.toData()).toEqual(once.toData());
  });

  it('writes one file per element plus the index', async () => {
    const fs = memoryFs();
    const store = ModelStore.from(data);
    await writeTree(fs, 'modux', store);

    const elements = Object.values(data).reduce((n, list) => n + list.length, 0);

    expect(fs.files.size).toBe(elements + 1);
  });

  it('reloads clean: a freshly read model has nothing pending to write', async () => {
    const fs = memoryFs();
    await writeTree(fs, 'modux', ModelStore.from(data));

    const reloaded = await loadTree(fs, 'modux');

    expect(reloaded.changes()).toEqual({ written: [], deleted: [] });
  });

  it('a reload-then-flush cycle rewrites nothing', async () => {
    const fs = memoryFs();
    await writeTree(fs, 'modux', ModelStore.from(data));
    const before = new Map(fs.files);

    const reloaded = await loadTree(fs, 'modux');
    await flush(fs, 'modux', reloaded);

    expect([...fs.files.entries()]).toEqual([...before.entries()]);
  });
});
