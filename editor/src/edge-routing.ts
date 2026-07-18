import type { Point } from './scene.js';

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
