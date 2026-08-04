import { describe, expect, it } from 'vitest';
import { apply } from '../apply.js';
import { ModelStore } from '../store.js';
import { flush, type FileSystem, loadTree, toYaml, writeTree } from '../tree.js';

/** An in-memory FileSystem, and a log of every write and delete it saw. */
function memoryFs() {
  const files = new Map<string, string>();
  const writes: string[] = [];
  const deletes: string[] = [];
  const fs: FileSystem = {
    async list(dir) {
      const prefix = `${dir}/`;
      return [...files.keys()]
        .filter((p) => p.startsWith(prefix) && !p.slice(prefix.length).includes('/'))
        .map((p) => p.slice(prefix.length));
    },
    async read(path) {
      const content = files.get(path);
      if (content === undefined) throw new Error(`no such file: ${path}`);
      return content;
    },
    async write(path, content) {
      files.set(path, content);
      writes.push(path);
    },
    async delete(path) {
      files.delete(path);
      deletes.push(path);
    },
    async exists(path) {
      return files.has(path);
    },
  };
  return { fs, files, writes, deletes };
}

async function seeded() {
  const io = memoryFs();
  const store = ModelStore.from({ services: [{ id: 'svc', name: 'Service', moduleIds: [] }] });
  apply(store, { kind: 'add-boundedContext', id: 'bc-booking', name: 'Booking' });
  await writeTree(io.fs, 'modux', store);
  io.writes.length = 0;
  return { ...io, store };
}

describe('serialization', () => {
  it('omits what Jackson omits, so files stay byte-identical to modux output', () => {
    const yaml = toYaml({
      id: 'agg-1',
      name: 'Booking',
      description: null,
      note: '',
      aggregateIds: [],
      meta: {},
      eventSourced: false,
      main: true,
      count: 0,
    });

    expect(yaml).toBe('id: agg-1\nname: Booking\nmain: true\ncount: 0\n');
  });

  it('keeps pruning inside nested structures', () => {
    const yaml = toYaml({ id: 'inv', conditions: [{ id: 'c', expression: 'x', warning: false }] });

    expect(yaml).toBe('id: inv\nconditions:\n  - id: c\n    expression: x\n');
  });

  it('sanitizes ids that are not safe as file names', async () => {
    const { fs, files } = memoryFs();
    const store = ModelStore.from({});
    store.put('notes', { id: 'note/with:odd chars' });
    await writeTree(fs, 'modux', store);

    expect([...files.keys()]).toContain('modux/notes/note_with_odd_chars.yaml');
  });
});

describe('round trip', () => {
  it('reads back exactly what it wrote', async () => {
    const { fs, store } = await seeded();
    apply(store, { kind: 'add-aggregate', id: 'agg-booking', name: 'Booking', boundedContextId: 'bc-booking' });
    await flush(fs, 'modux', store);

    const reloaded = await loadTree(fs, 'modux');

    expect(reloaded.toData()).toEqual(store.toData());
    expect(reloaded.get('boundedContexts', 'bc-booking')!.aggregateIds).toEqual(['agg-booking']);
  });

  it('preserves element types this build does not know about', async () => {
    const { fs } = memoryFs();
    await fs.write('modux/index.yaml', toYaml({ formatVersion: 1, counts: { gizmos: 1 } }));
    await fs.write('modux/gizmos/g-1.yaml', toYaml({ id: 'g-1', name: 'Gizmo' }));

    const store = await loadTree(fs, 'modux');

    expect(store.get('gizmos', 'g-1')).toEqual({ id: 'g-1', name: 'Gizmo' });
  });

  it('starts a fresh store with no changes pending', async () => {
    const { fs } = await seeded();
    const store = await loadTree(fs, 'modux');

    expect(store.changes()).toEqual({ written: [], deleted: [] });
  });
});

describe('incremental writes', () => {
  it('touches only the files the edit changed, never the whole tree', async () => {
    const { fs, writes, store } = await seeded();

    apply(store, { kind: 'add-note', id: 'note-1', text: 'hola' });
    await flush(fs, 'modux', store);

    expect(writes).toEqual(['modux/notes/note-1.yaml', 'modux/index.yaml']);
  });

  it('leaves untouched elements alone when a sibling changes', async () => {
    const { fs, writes, store } = await seeded();
    apply(store, { kind: 'add-note', id: 'note-1', text: 'uno' });
    apply(store, { kind: 'add-note', id: 'note-2', text: 'dos' });
    await flush(fs, 'modux', store);
    writes.length = 0;

    apply(store, { kind: 'remove-note', id: 'note-2' });
    await flush(fs, 'modux', store);

    expect(writes).toEqual(['modux/index.yaml']);
  });

  it('deletes the file of a removed element', async () => {
    const { fs, deletes, files, store } = await seeded();
    apply(store, { kind: 'add-note', id: 'note-1', text: 'hola' });
    await flush(fs, 'modux', store);

    apply(store, { kind: 'remove-note', id: 'note-1' });
    await flush(fs, 'modux', store);

    expect(deletes).toEqual(['modux/notes/note-1.yaml']);
    expect(files.has('modux/notes/note-1.yaml')).toBe(false);
  });

  it('writes nothing at all when a command changed nothing', async () => {
    const { fs, writes, deletes, store } = await seeded();

    apply(store, { kind: 'remove-note', id: 'does-not-exist' });
    await flush(fs, 'modux', store);

    expect(writes).toEqual([]);
    expect(deletes).toEqual([]);
  });

  it('keeps the index counts in step with the tree', async () => {
    const { fs, store } = await seeded();
    apply(store, { kind: 'add-aggregate', id: 'agg-1', name: 'A', boundedContextId: 'bc-booking' });
    await flush(fs, 'modux', store);

    const index = await fs.read('modux/index.yaml');

    expect(index).toContain('aggregates: 1');
    expect(index).toContain('boundedContexts: 1');
  });
});
