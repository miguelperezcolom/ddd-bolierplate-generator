import { describe, expect, it } from 'vitest';
import { autoLayout } from '../autolayout.js';
import type { Scene } from '../scene.js';

const scene: Scene = {
  nodes: [
    { id: 'a', label: 'A', x: 0, y: 0, w: 100, h: 60, kind: 'step' },
    { id: 'b', label: 'B', x: 0, y: 0, w: 100, h: 60, kind: 'step' },
    { id: 'c', label: 'C', x: 0, y: 0, w: 100, h: 60, kind: 'step' },
    { id: 'd', label: 'D', x: 0, y: 0, w: 100, h: 60, kind: 'step' },
  ],
  edges: [
    { id: 'a->b', sourceId: 'a', targetId: 'b', kind: 'flow' },
    { id: 'b->c', sourceId: 'b', targetId: 'c', kind: 'flow' },
    { id: 'c->d', sourceId: 'c', targetId: 'd', kind: 'flow' },
    { id: 'a->d', sourceId: 'a', targetId: 'd', kind: 'flow' }, // skip edge → must bend around B, C
  ],
};

describe('autoLayout', () => {
  it('places every node and orders the chain left→right', async () => {
    const { nodes } = await autoLayout(scene);
    for (const n of scene.nodes) expect(nodes[n.id]).toBeDefined();
    expect(nodes.a.x).toBeLessThan(nodes.b.x);
    expect(nodes.b.x).toBeLessThan(nodes.c.x);
    expect(nodes.c.x).toBeLessThan(nodes.d.x);
  }, 20_000);

  it('returns orthogonal bend points for edges that need to route around nodes', async () => {
    const { edges } = await autoLayout(scene);
    expect(edges['a->d']?.length ?? 0).toBeGreaterThan(0);
    for (const bends of Object.values(edges)) {
      for (let i = 0; i < bends.length - 1; i++) {
        const h = Math.abs(bends[i].y - bends[i + 1].y) < 1e-6;
        const v = Math.abs(bends[i].x - bends[i + 1].x) < 1e-6;
        expect(h || v, `bend segment ${i} is diagonal`).toBe(true);
      }
    }
  }, 20_000);

  it('keeps the given lane order when partitions are supplied', async () => {
    // Force C into the leftmost lane and A into the rightmost, against the flow.
    const { nodes } = await autoLayout(scene, {
      partitions: { c: 0, b: 1, a: 1, d: 2 },
    });
    expect(nodes.c.x).toBeLessThan(nodes.b.x);
    expect(nodes.d.x).toBeGreaterThan(nodes.a.x);
  }, 20_000);
});
