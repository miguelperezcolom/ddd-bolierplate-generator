/**
 * The geometry, read from and written to the tree.
 *
 * It is versioned on purpose (§4.4): a diagram is documentation, and without versioning everyone
 * opens a different auto-layout. What that buys has to be paid for in diff noise, which is why
 * the round trip below matters more than any single assertion here — a layout that does not
 * survive a save/load unchanged would rewrite files on every open.
 */

import { describe, expect, it } from 'vitest';
import { layoutOf, saveLayout } from '../layout.js';
import { ModelStore, type Element } from '../store.js';
import type { EditorLayout, ViewLayout } from '../../scene.js';

const view = (layout: EditorLayout, id: string) => layout[id] as ViewLayout;

const drawn = (): EditorLayout => ({
  'context-map': {
    nodes: { 'bc-res': { x: 100, y: 200 }, 'bc-fac': { x: 300.44, y: 50.46 } },
    edges: { 'bc-res->bc-fac': [{ x: 150, y: 220 }] },
    sizes: { 'bc-res': { w: 240, h: 120 } },
    expanded: ['bc-res'],
    flat: true,
  },
});

describe('reading the geometry out of the tree', () => {
  it('turns a diagram element into the layout the editor draws from', () => {
    const store = ModelStore.from({
      diagrams: [{
        id: 'context-map',
        nodes: [{ ref: 'bc-res', x: 100, y: 200, w: 240, h: 120 }],
        edges: [{ ref: 'bc-res->bc-fac', points: [{ x: 150, y: 220 }] }],
        expanded: ['bc-res'],
        flat: true,
      }],
    });

    expect(view(layoutOf(store), 'context-map')).toEqual({
      nodes: { 'bc-res': { x: 100, y: 200 } },
      sizes: { 'bc-res': { w: 240, h: 120 } },
      edges: { 'bc-res->bc-fac': [{ x: 150, y: 220 }] },
      expanded: ['bc-res'],
      flat: true,
    });
  });

  it('is one file per view, so each sheet reads on its own', () => {
    const store = ModelStore.from({
      diagrams: [
        { id: 'context-map', nodes: [{ ref: 'a', x: 1, y: 2 }] },
        { id: 'aggregates', nodes: [{ ref: 'b', x: 3, y: 4 }] },
      ],
    });

    expect(Object.keys(layoutOf(store))).toEqual(['context-map', 'aggregates']);
  });

  it('reads an empty tree as an empty layout, not as a failure', () => {
    expect(layoutOf(ModelStore.from({}))).toEqual({});
  });
});

describe('writing it back', () => {
  it('stores one element per view, referencing elements by id and nothing else', () => {
    const store = ModelStore.from({});

    saveLayout(store, drawn());

    const diagram = store.get('diagrams', 'context-map')!;
    expect(diagram.id).toBe('context-map');
    expect((diagram.nodes as Element[]).map((n) => n.ref)).toEqual(['bc-res', 'bc-fac']);
  });

  /** One decimal is plenty for a pixel, and it keeps the YAML readable. */
  it('rounds coordinates to one decimal', () => {
    const store = ModelStore.from({});

    saveLayout(store, drawn());

    expect((store.get('diagrams', 'context-map')!.nodes as Element[])[1])
      .toMatchObject({ x: 300.4, y: 50.5 });
  });

  /** An empty diagram is not a fact about the model; leaving one behind is a file saying nothing. */
  it('removes a view that no longer carries anything', () => {
    const store = ModelStore.from({
      diagrams: [{ id: 'context-map', nodes: [{ ref: 'a', x: 1, y: 2 }] }],
    });

    saveLayout(store, { 'context-map': { nodes: {}, edges: {} } });

    expect(store.has('diagrams', 'context-map')).toBe(false);
  });

  it('drops an edge with no bend points — a straight line is the default', () => {
    const store = ModelStore.from({});

    saveLayout(store, { v: { nodes: { a: { x: 1, y: 2 } }, edges: { 'a->b': [] } } });

    expect(store.get('diagrams', 'v')?.edges).toBeUndefined();
  });

  it('leaves alone a view the editor did not touch', () => {
    const store = ModelStore.from({
      diagrams: [
        { id: 'context-map', nodes: [{ ref: 'a', x: 1, y: 2 }] },
        { id: 'aggregates', nodes: [{ ref: 'b', x: 3, y: 4 }] },
      ],
    });

    saveLayout(store, layoutOf(store));

    expect(store.get('diagrams', 'aggregates')?.nodes).toEqual([{ ref: 'b', x: 3, y: 4 }]);
  });
});

describe('the round trip', () => {
  /**
   * The one that matters: reading a tree and writing it straight back must change NOTHING. If it
   * did, opening a model would rewrite files nobody touched — the phantom diff §2.6 exists to
   * prevent, here for the half of the store that changes most often.
   */
  it('rewrites nothing when nothing moved', () => {
    const store = ModelStore.from({
      diagrams: [{
        id: 'context-map',
        detail: 'contexts',
        nodes: [{ ref: 'bc-res', x: 100, y: 200, w: 240, h: 120 }, { ref: 'bc-fac', x: 300, y: 50 }],
        edges: [{ ref: 'bc-res->bc-fac', points: [{ x: 150, y: 220 }] }],
        collapsed: ['bc-fac'],
        expanded: ['bc-res'],
        flat: true,
      }],
    });
    store.clearChanges();

    saveLayout(store, layoutOf(store));

    expect(store.changes()).toEqual({ written: [], deleted: [] });
  });

  /** Coordinates come back ROUNDED — that is the point of rounding them, not a loss. */
  it('survives a layout the editor produced, to one decimal', () => {
    const store = ModelStore.from({});
    saveLayout(store, drawn());

    const rounded = drawn();
    (rounded['context-map'] as ViewLayout).nodes['bc-fac'] = { x: 300.4, y: 50.5 };
    expect(layoutOf(store)).toEqual(rounded);
  });

  /** A layout written before views had edges is a flat node map; it must still open. */
  it('reads a legacy flat node map and writes it in the current shape', () => {
    const store = ModelStore.from({});

    saveLayout(store, { 'context-map': { 'bc-res': { x: 10, y: 20 } } } as unknown as EditorLayout);

    expect(view(layoutOf(store), 'context-map').nodes).toEqual({ 'bc-res': { x: 10, y: 20 } });
  });
});
