import type { Point, SceneNode } from './scene.js';

/** A node's resolved geometry on the canvas: center plus size. */
export interface RouteBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Point on the border of `box` along the line from its center towards (tx, ty). */
function borderTowards(box: RouteBox, tx: number, ty: number): Point {
  const dx = tx - box.x;
  const dy = ty - box.y;
  const hw = box.w / 2;
  const hh = box.h / 2;
  if (dx === 0 && dy === 0) return { x: box.x, y: box.y };
  const scale = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh);
  return { x: box.x + dx * scale, y: box.y + dy * scale };
}

/** Straight border-to-border segment, with siblings spread along the perpendicular. */
function straightRoute(a: RouteBox, b: RouteBox, spread: number): Point[] {
  let p0 = borderTowards(a, b.x, b.y);
  let p1 = borderTowards(b, a.x, a.y);
  if (spread !== 0) {
    const len = Math.hypot(p1.x - p0.x, p1.y - p0.y) || 1;
    const nx = (-(p1.y - p0.y) / len) * spread;
    const ny = ((p1.x - p0.x) / len) * spread;
    p0 = { x: p0.x + nx, y: p0.y + ny };
    p1 = { x: p1.x + nx, y: p1.y + ny };
  }
  return [p0, p1];
}

/**
 * Orthogonal route between two nodes: out through the midpoint of the facing
 * sides, joined by a Z of horizontal/vertical segments (a plain segment when
 * the boxes are already aligned). `spread` separates edges that share the same
 * node pair. Falls back to a straight diagonal only when the boxes overlap on
 * both axes and no clean orthogonal path exists — la diagonal como último
 * recurso.
 */
export function orthogonalRoute(a: RouteBox, b: RouteBox, spread = 0): Point[] {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const EPS = 0.5;
  // Perfectly aligned: a single straight segment is already horizontal/vertical.
  if (Math.abs(dx) <= EPS || Math.abs(dy) <= EPS) return straightRoute(a, b, spread);
  // Clearance between the facing sides on each axis (negative = overlap).
  const gapX =
    dx > 0 ? b.x - b.w / 2 - (a.x + a.w / 2) : a.x - a.w / 2 - (b.x + b.w / 2);
  const gapY =
    dy > 0 ? b.y - b.h / 2 - (a.y + a.h / 2) : a.y - a.h / 2 - (b.y + b.h / 2);
  const horizontalPreferred = Math.abs(dx) >= Math.abs(dy);
  const horizontal = () => {
    const p0 = { x: a.x + (Math.sign(dx) * a.w) / 2, y: a.y + spread };
    const p1 = { x: b.x - (Math.sign(dx) * b.w) / 2, y: b.y + spread };
    const midX = (p0.x + p1.x) / 2 + spread;
    return [p0, { x: midX, y: p0.y }, { x: midX, y: p1.y }, p1];
  };
  const vertical = () => {
    const p0 = { x: a.x + spread, y: a.y + (Math.sign(dy) * a.h) / 2 };
    const p1 = { x: b.x + spread, y: b.y - (Math.sign(dy) * b.h) / 2 };
    const midY = (p0.y + p1.y) / 2 + spread;
    return [p0, { x: p0.x, y: midY }, { x: p1.x, y: midY }, p1];
  };
  // Preferred axis first, then whichever axis has clearance between the boxes.
  if (gapX >= 0 && (horizontalPreferred || gapY < 0)) return horizontal();
  if (gapY >= 0) return vertical();
  if (gapX >= 0) return horizontal();
  // Overlap on both axes: no clean orthogonal route — straight line.
  return straightRoute(a, b, spread);
}

/** Does the segment a→b pass through the axis-aligned box? (Liang–Barsky clip) */
export function segmentCrossesBox(
  a: Point,
  b: Point,
  box: { x: number; y: number; w: number; h: number },
): boolean {
  const minX = box.x - box.w / 2;
  const maxX = box.x + box.w / 2;
  const minY = box.y - box.h / 2;
  const maxY = box.y + box.h / 2;
  let t0 = 0;
  let t1 = 1;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  for (const [p, q] of [
    [-dx, a.x - minX],
    [dx, maxX - a.x],
    [-dy, a.y - minY],
    [dy, maxY - a.y],
  ] as [number, number][]) {
    if (p === 0) {
      if (q < 0) return false;
      continue;
    }
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
  }
  return t1 - t0 > 0.02; // a mere corner graze does not count
}

/**
 * Re-routes every edge whose default straight orthogonal path would run over a
 * node it is not attached to. The detour is itself **orthogonal** — horizontal
 * and vertical segments only, never a diagonal cut across a corner — so diagram
 * lines read like a wiring diagram. For each blocked edge we try a family of
 * orthogonal shapes (an L, and a Z whose middle channel slides across the span
 * to hunt for a gap, on either axis) and keep the one that clears the most boxes
 * at the least length. Edges whose default route is already clean are left to
 * the caller (the canvas draws the same orthogonal route from `orthogonalRoute`).
 * The endpoints stay centre-anchored, so the rendered ends are orthogonal too
 * and the route follows the nodes as they are dragged. Only edges without
 * hand-placed bends are touched; nodes are treated as obstacles with a margin.
 */
export function routeEdgesAroundNodes(
  scene: { nodes: SceneNode[]; edges: { id: string; sourceId: string; targetId: string }[] },
  existing: Record<string, Point[]>,
  margin = 28,
): Map<string, Point[]> {
  const byId = new Map(scene.nodes.map((n) => [n.id, n]));
  const ancestorsOf = (id: string | undefined): Set<string> => {
    const out = new Set<string>();
    for (let cur = id; cur; cur = byId.get(cur)?.parentId) out.add(cur);
    return out;
  };
  // Children count as obstacles too (with a tighter margin — grids are dense).
  // Areas are background frames: edges cross them as if they weren't there.
  const obstacles = scene.nodes.filter((n) => n.kind !== 'area');
  const marginOf = (o: SceneNode) => (o.parentId ? Math.min(margin, 6) : margin);
  const routed = new Map<string, Point[]>();

  /**
   * Boxes (other than the edge's own ends) that the polyline `pts` runs over.
   * `margin` overrides the routing clearance: use a small one to ask "does this
   * actually touch a box?" (judging an existing route), the default to ask "does
   * this keep a comfortable channel?" (placing a fresh one).
   */
  const crossings = (pts: Point[], skip: Set<string>, margin?: number): number => {
    let n = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      for (const o of obstacles) {
        if (skip.has(o.id)) continue;
        const m = margin ?? marginOf(o);
        if (segmentCrossesBox(pts[i], pts[i + 1], { x: o.x, y: o.y, w: o.w + 2 * m, h: o.h + 2 * m })) n++;
      }
    }
    return n;
  };
  const length = (pts: Point[]): number => {
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) total += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    return total;
  };

  const box = (o: SceneNode) => ({ x: o.x, y: o.y, w: o.w, h: o.h });
  // The border exit the canvas draws for a routed edge (mirrors orthoBorderPoint):
  // aligned to the waypoint's perpendicular coordinate when it lands beside the
  // node, so the checked polyline matches what's rendered.
  const orthoBorder = (o: SceneNode, tx: number, ty: number): Point => {
    const dx = tx - o.x;
    const dy = ty - o.y;
    const hw = o.w / 2;
    const hh = o.h / 2;
    if (Math.abs(dx) >= Math.abs(dy) && Math.abs(dy) <= hh) return { x: o.x + Math.sign(dx) * hw, y: ty };
    if (Math.abs(dy) >= Math.abs(dx) && Math.abs(dx) <= hw) return { x: tx, y: o.y + Math.sign(dy) * hh };
    if (dx === 0 && dy === 0) return { x: o.x, y: o.y };
    const scale = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh);
    return { x: o.x + dx * scale, y: o.y + dy * scale };
  };
  for (const edge of scene.edges) {
    const src = byId.get(edge.sourceId);
    const tgt = byId.get(edge.targetId);
    if (!src || !tgt) continue;
    const skip = new Set([...ancestorsOf(src.id), ...ancestorsOf(tgt.id)]);
    const S = { x: src.x, y: src.y };
    const T = { x: tgt.x, y: tgt.y };
    // A stored route (auto-layout's or a hand-placed one) is respected AS LONG AS
    // it stays off the boxes; an empty route is a deliberate "pin straight". But a
    // stored route that runs over a box — a stale one left by an older layout, or
    // one orphaned by a node move — is re-routed fresh so no line sits on a node.
    const stored = existing[edge.id];
    let baseline: number;
    if (stored) {
      if (stored.length === 0) continue; // pinned straight — always respected
      // Judge the route AS RENDERED (border→bends→border). Wrapping with node
      // CENTRES instead would falsely flag an edge that merely leaves its node
      // past a neighbour — the real border-to-first-bend stub is short and clear —
      // and needlessly replace ELK's good route. This keeps clean routes untouched
      // yet still catches a stale bend that genuinely ploughs through a box.
      const rendered = [
        orthoBorder(src, stored[0].x, stored[0].y),
        ...stored,
        orthoBorder(tgt, stored[stored.length - 1].x, stored[stored.length - 1].y),
      ];
      // Small margin: only a route that actually sits on a box is stale; ELK's
      // routes legitimately pass within the routing clearance of neighbours.
      baseline = crossings(rendered, skip, 2);
      if (baseline === 0) continue; // routed path stays off the boxes — keep it
    } else {
      // The route the canvas would draw on its own (border-to-border, orthogonal).
      baseline = crossings(orthogonalRoute(box(src), box(tgt)), skip);
      if (baseline === 0) continue; // already clean — nothing to store
    }

    // Orthogonal candidates, expressed as INTERIOR bends (centre-based): the
    // canvas anchors the ends to the borders, and because every bend shares an
    // axis with a centre, the rendered segments stay horizontal/vertical. A
    // vertical-channel Z bends [(mx,S.y),(mx,T.y)]; a horizontal-channel bump
    // bends [(S.x,my),(T.x,my)]. Endpoints exit orthogonally either way.
    const cands: Point[][] = [[{ x: T.x, y: S.y }], [{ x: S.x, y: T.y }]]; // two L shapes
    // Channels interpolated across the span — enough when S and T differ on the axis.
    for (const f of [0.5, 0.38, 0.62, 0.26, 0.74]) {
      const mx = S.x + (T.x - S.x) * f;
      const my = S.y + (T.y - S.y) * f;
      cands.push([{ x: mx, y: S.y }, { x: mx, y: T.y }]);
      cands.push([{ x: S.x, y: my }, { x: T.x, y: my }]);
    }
    // Channels that clear each nearby obstacle's edge, so a blocker sitting right
    // on the (near-)straight line can be dodged above/below or left/right — the
    // interpolated channels collapse when the endpoints are colinear.
    const loX = Math.min(S.x, T.x);
    const hiX = Math.max(S.x, T.x);
    const loY = Math.min(S.y, T.y);
    const hiY = Math.max(S.y, T.y);
    for (const o of obstacles) {
      if (skip.has(o.id)) continue;
      const m = marginOf(o) + 8;
      if (o.x > loX - o.w && o.x < hiX + o.w) {
        cands.push([{ x: S.x, y: o.y - o.h / 2 - m }, { x: T.x, y: o.y - o.h / 2 - m }]);
        cands.push([{ x: S.x, y: o.y + o.h / 2 + m }, { x: T.x, y: o.y + o.h / 2 + m }]);
      }
      if (o.y > loY - o.h && o.y < hiY + o.h) {
        cands.push([{ x: o.x - o.w / 2 - m, y: S.y }, { x: o.x - o.w / 2 - m, y: T.y }]);
        cands.push([{ x: o.x + o.w / 2 + m, y: S.y }, { x: o.x + o.w / 2 + m, y: T.y }]);
      }
    }

    // A route must leave room at each end for the marker (arrow, composition
    // diamond) — a stub shorter than this crushes it against the border.
    const CLEARANCE = 14;
    let best: Point[] | null = null;
    let bestCross = Infinity;
    let bestScore = Infinity;
    for (const c of cands) {
      const full = [S, ...c, T];
      const cross = crossings(full, skip);
      // End stubs as the canvas will draw them (border → first/last bend).
      const a0 = orthoBorder(src, c[0].x, c[0].y);
      const bN = orthoBorder(tgt, c[c.length - 1].x, c[c.length - 1].y);
      const firstStub = Math.hypot(c[0].x - a0.x, c[0].y - a0.y);
      const lastStub = Math.hypot(c[c.length - 1].x - bN.x, c[c.length - 1].y - bN.y);
      const crush = (firstStub < CLEARANCE ? 1 : 0) + (lastStub < CLEARANCE ? 1 : 0);
      // Boxes crossed dominate; then marker room; then length + a bend bias.
      const score = cross * 1e6 + crush * 3000 + length(full) + c.length * 40;
      if (score < bestScore) {
        best = c;
        bestScore = score;
        bestCross = cross;
      }
    }
    // Only take over when a candidate clears strictly more boxes than the route
    // we'd otherwise draw (the canvas's orthogonal fallback, or the stored route
    // being replaced); otherwise leave it be.
    if (best && bestCross < baseline) {
      routed.set(edge.id, best.map((p) => ({ x: Math.round(p.x), y: Math.round(p.y) })));
    }
  }
  return routed;
}
