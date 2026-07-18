import { describe, expect, it } from 'vitest';
import { snapDragged, snapValue } from '../snap.js';

const box = (x: number, y: number, w = 100, h = 60) => ({ x, y, w, h });

describe('snapValue', () => {
  it('rounds to the nearest grid step', () => {
    expect(snapValue(0)).toBe(0);
    expect(snapValue(7)).toBe(12);
    expect(snapValue(5)).toBe(0);
    expect(snapValue(-7)).toBe(-12);
    expect(snapValue(18)).toBe(24);
  });
});

describe('snapDragged', () => {
  it('snaps to the plain grid when nothing aligns', () => {
    const r = snapDragged(box(53, 27), [box(500, 500)]);
    expect(r.x).toBe(48);
    expect(r.y).toBe(24);
    expect(r.guides).toEqual({ v: [], h: [] });
  });

  it('engages an edge-to-edge vertical guide within the threshold', () => {
    // other right edge at x=150; my left edge at 53-50=3 → my center must move +97... use closer.
    const other = box(100, 300); // right edge at 150
    const r = snapDragged(box(203, 40), [other], { threshold: 5 });
    // my left edge = 203-50 = 153, distance to 150 is -3 → snap to 200
    expect(r.x).toBe(200);
    expect(r.guides.v).toEqual([150]);
    expect(r.guides.h).toEqual([]); // y falls back to grid
    expect(r.y).toBe(36);
  });

  it('engages center-to-center alignment on both axes', () => {
    const other = box(201, 97);
    const r = snapDragged(box(204, 100), [other], { threshold: 5 });
    expect(r.x).toBe(201);
    expect(r.y).toBe(97);
    // Ties (edge-edge and center-center both at distance 3) keep the first
    // engagement found: their left/top edges.
    expect(r.guides).toEqual({ v: [151], h: [67] });
  });

  it('picks the nearest engagement when several guides are within reach', () => {
    const near = box(202, 0); // left edge at 152 → distance 2
    const far = box(400, 0); // everything ≥ 100 away
    const r = snapDragged(box(200, 50), [near, far], { threshold: 6 });
    expect(r.x).toBe(202);
    expect(r.guides.v).toEqual([152]);
    // A second box equally near does not steal the engagement (ties keep the first).
    const tied = box(204, 0);
    const r2 = snapDragged(box(200, 50), [near, tied], { threshold: 6 });
    expect(r2.x).toBe(202);
  });

  it('ignores engagements beyond the threshold and passes through when disabled', () => {
    const far = box(207, 0);
    const r = snapDragged(box(200, 50), [far], { threshold: 5 });
    expect(r.guides.v).toEqual([]); // 7 > 5
    const raw = snapDragged(box(203.3, 41.7), [box(201, 40)], { enabled: false });
    expect(raw.x).toBe(203.3);
    expect(raw.y).toBe(41.7);
    expect(raw.guides).toEqual({ v: [], h: [] });
  });
});
