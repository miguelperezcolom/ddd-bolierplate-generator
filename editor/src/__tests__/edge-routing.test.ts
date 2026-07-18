import { describe, expect, it } from 'vitest';
import { orthogonalRoute, type RouteBox } from '../edge-routing.js';
import type { Point } from '../scene.js';

/** Every segment of the polyline is horizontal or vertical. */
function assertOrthogonal(pts: Point[]): void {
  for (let i = 0; i < pts.length - 1; i++) {
    const horizontal = Math.abs(pts[i].y - pts[i + 1].y) < 1e-9;
    const vertical = Math.abs(pts[i].x - pts[i + 1].x) < 1e-9;
    expect(horizontal || vertical, `segment ${i} is diagonal: ${JSON.stringify(pts)}`).toBe(true);
  }
}

const box = (x: number, y: number, w = 100, h = 60): RouteBox => ({ x, y, w, h });

describe('orthogonalRoute', () => {
  it('routes a horizontal-dominant pair as a Z through the facing sides', () => {
    const pts = orthogonalRoute(box(0, 0), box(300, 40));
    expect(pts).toEqual([
      { x: 50, y: 0 },
      { x: 150, y: 0 },
      { x: 150, y: 40 },
      { x: 250, y: 40 },
    ]);
    assertOrthogonal(pts);
  });

  it('routes a vertical-dominant pair as a Z through top/bottom sides', () => {
    const pts = orthogonalRoute(box(0, 0), box(40, 300));
    expect(pts).toEqual([
      { x: 0, y: 30 },
      { x: 0, y: 150 },
      { x: 40, y: 150 },
      { x: 40, y: 270 },
    ]);
    assertOrthogonal(pts);
  });

  it('routes backwards (target up-left) with the same Z shape', () => {
    const pts = orthogonalRoute(box(0, 0), box(-300, -40));
    expect(pts).toEqual([
      { x: -50, y: 0 },
      { x: -150, y: 0 },
      { x: -150, y: -40 },
      { x: -250, y: -40 },
    ]);
    assertOrthogonal(pts);
  });

  it('keeps a single segment when the pair is already aligned', () => {
    const horizontal = orthogonalRoute(box(0, 0), box(300, 0));
    expect(horizontal).toEqual([
      { x: 50, y: 0 },
      { x: 250, y: 0 },
    ]);
    const vertical = orthogonalRoute(box(0, 0), box(0, 300));
    expect(vertical).toEqual([
      { x: 0, y: 30 },
      { x: 0, y: 270 },
    ]);
  });

  it('falls back to the non-preferred axis when the preferred one is blocked', () => {
    // Horizontally dominant, but the target is so wide the facing sides overlap.
    const pts = orthogonalRoute(box(0, 0), box(200, 80, 400, 60));
    assertOrthogonal(pts);
    expect(pts.length).toBe(4);
    // Exits through the bottom of the source and enters through the top of the target.
    expect(pts[0]).toEqual({ x: 0, y: 30 });
    expect(pts[3]).toEqual({ x: 200, y: 50 });
  });

  it('keeps the straight diagonal only when both axes overlap', () => {
    const pts = orthogonalRoute(box(0, 0), box(30, 20));
    expect(pts.length).toBe(2);
  });

  it('spreads siblings along the sides and the middle segment', () => {
    const first = orthogonalRoute(box(0, 0), box(300, 40), -20);
    const second = orthogonalRoute(box(0, 0), box(300, 40), 20);
    assertOrthogonal(first);
    assertOrthogonal(second);
    expect(first[0].y).toBe(-20);
    expect(second[0].y).toBe(20);
    // Middle vertical segments do not overlap.
    expect(first[1].x).toBe(130);
    expect(second[1].x).toBe(170);
  });

  it('handles a self-loop degenerately, as the straight route did', () => {
    const pts = orthogonalRoute(box(0, 0), box(0, 0));
    expect(pts).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ]);
  });
});
