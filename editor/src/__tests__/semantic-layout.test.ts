import { describe, expect, it } from 'vitest';
import { semanticLayout } from '../semantic-layout.js';
import type { Scene, SceneNode } from '../scene.js';

const node = (id: string, kind: string, label = id, extra: Partial<SceneNode> = {}): SceneNode => ({
  id,
  label,
  kind,
  x: 0,
  y: 0,
  w: 100,
  h: 60,
  ...extra,
});

describe('semanticLayout', () => {
  it('places the canonical reading order left to right', () => {
    const scene: Scene = {
      nodes: [
        node('bc', 'boundedContext', 'Reservas'),
        node('ext-out', 'external-system', 'Pagos'),
        node('actor', 'actor', 'Huésped'),
        node('uc', 'use-case', 'Reservar'),
        node('rm', 'read-model', 'ReservasDelDia'),
        node('ext-in', 'external-system', 'ChannelManager'),
      ],
      edges: [
        { id: 'e1', sourceId: 'ext-in', targetId: 'bc', kind: 'relation' }, // calls us → consumer
        { id: 'e2', sourceId: 'bc', targetId: 'ext-out', kind: 'relation' }, // we call it → consumed
      ],
    };
    const l = semanticLayout(scene);
    expect(l['actor'].x).toBeLessThan(l['ext-in'].x); // actor, then consumer
    expect(l['ext-in'].x).toBeLessThan(l['bc'].x); // consumer, then domain
    expect(l['bc'].x).toBeLessThan(l['uc'].x); // use cases gather right of their contexts
    expect(l['uc'].x).toBeLessThan(l['rm'].x); // domain, then read side
    expect(l['rm'].x).toBeLessThan(l['ext-out'].x); // read side, then consumed
  });

  it('is deterministic: same scene, same layout', () => {
    const scene: Scene = {
      nodes: [
        node('b2', 'boundedContext', 'Beta'),
        node('a', 'actor', 'Actor'),
        node('b1', 'boundedContext', 'Alfa'),
        node('x', 'external-system', 'Ext'),
      ],
      edges: [{ id: 'e', sourceId: 'a', targetId: 'b1', kind: 'relation' }],
    };
    expect(semanticLayout(scene)).toEqual(semanticLayout(scene));
  });

  it('orders a lane alphabetically at first', () => {
    const scene: Scene = {
      nodes: [node('c', 'aggregate', 'Zeta'), node('a', 'aggregate', 'Alfa'), node('b', 'aggregate', 'Media')],
      edges: [],
    };
    const l = semanticLayout(scene);
    expect(l['a'].y).toBeLessThan(l['b'].y);
    expect(l['b'].y).toBeLessThan(l['c'].y);
    expect(l['a'].x).toBe(l['b'].x);
  });

  it('uncrosses edges between lanes with barycenter sweeps', () => {
    // Seed order a1,a2 / b1,b2 with crossed edges a1→b2, a2→b1: after the sweeps
    // each edge must run (roughly) horizontal — a1 ends level with b2, a2 with b1.
    const scene: Scene = {
      nodes: [
        node('a1', 'actor', 'a1'),
        node('a2', 'actor', 'a2'),
        node('b1', 'boundedContext', 'b1'),
        node('b2', 'boundedContext', 'b2'),
      ],
      edges: [
        { id: 'e1', sourceId: 'a1', targetId: 'b2', kind: 'relation' },
        { id: 'e2', sourceId: 'a2', targetId: 'b1', kind: 'relation' },
      ],
    };
    const l = semanticLayout(scene);
    // The anchored first lane keeps the canonical order…
    expect(l['a1'].y).toBeLessThan(l['a2'].y);
    // …and the second lane uncrosses around it: b2 (linked to a1, on top) goes first.
    expect(l['b2'].y).toBeLessThan(l['b1'].y);
  });

  it('classifies an external with both edge directions by the majority, ties go right', () => {
    const scene: Scene = {
      nodes: [node('bc', 'boundedContext'), node('x', 'external-system'), node('bc2', 'boundedContext', 'Otro')],
      edges: [
        { id: 'e1', sourceId: 'x', targetId: 'bc', kind: 'relation' },
        { id: 'e2', sourceId: 'bc2', targetId: 'x', kind: 'relation' },
      ],
    };
    const l = semanticLayout(scene);
    expect(l['x'].x).toBeGreaterThan(l['bc'].x); // tie (1 out, 1 in) → consumed → right
  });

  it('ignores children and areas (their containers carry the position)', () => {
    const scene: Scene = {
      nodes: [
        node('bc', 'boundedContext'),
        node('child', 'use-case', 'Hijo', { parentId: 'bc' }),
        node('frame', 'area', 'Zona'),
      ],
      edges: [],
    };
    const l = semanticLayout(scene);
    expect(Object.keys(l)).toEqual(['bc']);
  });

  it('keeps unknown kinds in the middle (domain lane)', () => {
    const scene: Scene = {
      nodes: [node('a', 'actor'), node('?', 'cosa-rara'), node('x', 'external-system')],
      edges: [{ id: 'e', sourceId: 'a', targetId: 'x', kind: 'relation' }],
    };
    const l = semanticLayout(scene);
    expect(l['a'].x).toBeLessThan(l['?'].x);
    expect(l['?'].x).toBeLessThan(l['x'].x); // external with only incoming edges → consumed
  });
});
