/**
 * Snap-to-grid and alignment guides for the canvas drawing gestures — the
 * drawing-program layer: nodes land on a 12px grid (a sub-grid of the visible
 * 24px dots) and, more importantly, snap to alignment with other nodes'
 * edges/centers, drawing a guide line when one engages. Holding Alt frees the
 * pointer from all snapping.
 */

export const SNAP_GRID = 12;

export interface SnapBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SnapResult {
  x: number;
  y: number;
  /** Active alignment guides: vertical line xs / horizontal line ys (scene units). */
  guides: { v: number[]; h: number[] };
}

/** Round to the nearest grid step. */
export function snapValue(v: number, grid = SNAP_GRID): number {
  return Math.round(v / grid) * grid;
}

/** The three candidate alignment lines of a box on each axis (min, center, max). */
function lines(box: SnapBox): { xs: number[]; ys: number[] } {
  return {
    xs: [box.x - box.w / 2, box.x, box.x + box.w / 2],
    ys: [box.y - box.h / 2, box.y, box.y + box.h / 2],
  };
}

/**
 * Snap a dragged box's center: an alignment guide within `threshold` (scene
 * units) of another box's edge/center wins over the plain grid; with several,
 * the nearest engagement wins. `enabled: false` (Alt held) passes through raw.
 */
export function snapDragged(
  box: SnapBox,
  others: SnapBox[],
  opts?: { grid?: number; threshold?: number; enabled?: boolean },
): SnapResult {
  const grid = opts?.grid ?? SNAP_GRID;
  const threshold = opts?.threshold ?? 4;
  if (opts?.enabled === false) return { x: box.x, y: box.y, guides: { v: [], h: [] } };
  const mine = lines(box);
  let bestV: { guide: number; delta: number } | null = null;
  let bestH: { guide: number; delta: number } | null = null;
  for (const other of others) {
    const theirs = lines(other);
    for (const g of theirs.xs) {
      for (const m of mine.xs) {
        const delta = g - m;
        if (Math.abs(delta) <= threshold && (!bestV || Math.abs(delta) < Math.abs(bestV.delta))) {
          bestV = { guide: g, delta };
        }
      }
    }
    for (const g of theirs.ys) {
      for (const m of mine.ys) {
        const delta = g - m;
        if (Math.abs(delta) <= threshold && (!bestH || Math.abs(delta) < Math.abs(bestH.delta))) {
          bestH = { guide: g, delta };
        }
      }
    }
  }
  return {
    x: bestV ? box.x + bestV.delta : snapValue(box.x, grid),
    y: bestH ? box.y + bestH.delta : snapValue(box.y, grid),
    guides: { v: bestV ? [bestV.guide] : [], h: bestH ? [bestH.guide] : [] },
  };
}
