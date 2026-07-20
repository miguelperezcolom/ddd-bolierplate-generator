import { describe, expect, it } from 'vitest';
import { routeEdgesAroundNodes } from '../edge-routing.js';
import type { SceneNode } from '../scene.js';

const node = (id: string, x: number, y: number, w = 100, h = 60): SceneNode => ({
  id, x, y, w, h, label: id, kind: 'box',
});

/** Every segment implied by [S, ...bends, T] (centre-based) is horizontal or vertical. */
function assertOrthogonalThrough(S: { x: number; y: number }, bends: { x: number; y: number }[], T: { x: number; y: number }) {
  const pts = [S, ...bends, T];
  for (let i = 0; i < pts.length - 1; i++) {
    const h = Math.abs(pts[i].y - pts[i + 1].y) < 1e-6;
    const v = Math.abs(pts[i].x - pts[i + 1].x) < 1e-6;
    expect(h || v, `segment ${i} diagonal: ${JSON.stringify(pts)}`).toBe(true);
  }
}

describe('routeEdgesAroundNodes', () => {
  it('detours around an obstacle sitting on the straight line, orthogonally', () => {
    // A and C are level; B sits between them right on the a→c line.
    const scene = {
      nodes: [node('a', 0, 0), node('b', 300, 0), node('c', 600, 0)],
      edges: [{ id: 'a->c', sourceId: 'a', targetId: 'c', kind: 'rel' }],
    };
    const routed = routeEdgesAroundNodes(scene, {});
    const bends = routed.get('a->c');
    expect(bends, 'a->c should be re-routed around b').toBeTruthy();
    assertOrthogonalThrough({ x: 0, y: 0 }, bends!, { x: 600, y: 0 });
    // The detour must clear B's box (dodges above or below it).
    const clearsB = bends!.some((p) => Math.abs(p.y) > 30);
    expect(clearsB).toBe(true);
  });

  it('leaves a clean edge untouched (no obstacle between the nodes)', () => {
    const scene = {
      nodes: [node('a', 0, 0), node('c', 600, 0)],
      edges: [{ id: 'a->c', sourceId: 'a', targetId: 'c', kind: 'rel' }],
    };
    expect(routeEdgesAroundNodes(scene, {}).has('a->c')).toBe(false);
  });

  it('never overrides a hand-placed route', () => {
    const scene = {
      nodes: [node('a', 0, 0), node('b', 300, 0), node('c', 600, 0)],
      edges: [{ id: 'a->c', sourceId: 'a', targetId: 'c', kind: 'rel' }],
    };
    expect(routeEdgesAroundNodes(scene, { 'a->c': [{ x: 300, y: 200 }] }).has('a->c')).toBe(false);
  });

  it('does not treat the edge\'s own endpoints as obstacles', () => {
    const scene = {
      nodes: [node('a', 0, 0), node('b', 600, 0)],
      edges: [{ id: 'a->b', sourceId: 'a', targetId: 'b', kind: 'rel' }],
    };
    expect(routeEdgesAroundNodes(scene, {}).has('a->b')).toBe(false);
  });
});
