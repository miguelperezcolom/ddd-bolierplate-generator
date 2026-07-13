/**
 * Generic diagram scene — the contract between semantic view adapters and the
 * <modux-canvas> engine. Nothing here knows about the modux meta-model.
 */

export interface SceneNode {
  /** Plain (non-container) nodes that still accept the corner-resize gesture. */
  resizable?: boolean;
  /** Differentiated drag points: each starts a TYPED connect gesture (its kind). */
  extraHandles?: { kind: string; title: string; color: string }[];
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Semantic hint carried back in gesture events (e.g. 'boundedContext', 'external-system'). */
  kind: string;
  fill?: string;
  stroke?: string;
  dashed?: boolean;
  /** Small tag rendered above the node (e.g. subdomain type). */
  badge?: string;
  /** ArchiMate-style glyph id drawn in the node's corner (see modux-canvas SYMBOLS). */
  symbol?: string;
  tooltip?: string;
  /**
   * This node is nested inside the container node with this id: it renders on
   * top of it and follows it while the container is dragged. Adapters derive
   * child geometry from the container, so children are typically `fixed`.
   */
  parentId?: string;
  /** A container: renders with a top header instead of a centred label. */
  container?: boolean;
  /** On a solution (to-be): how this element differs from the system (diff ring). */
  diffKind?: 'ADDED' | 'MODIFIED';
  /** The node can fold/unfold its children (containers). */
  collapsible?: boolean;
  /** Folded by hand: rendered compact, children hidden. */
  collapsed?: boolean;
}

/**
 * Inner margins of a container node, shared by the canvas (drag/resize clamps)
 * and the view adapters (child placement, fit-to-children growth) so both
 * agree on exactly where a child may sit.
 */
export const CONTAINER_HEADER = 34;
export const CONTAINER_INSET = 10;

/** The smallest width/height a child inside a container forces on it (symmetric about the centre). */
/**
 * Minimal-displacement overlap resolution: iteratively push apart every pair of
 * boxes that overlap (inflated by a margin), along the axis of least penetration.
 * Returns ONLY the boxes that actually moved, with their new centres.
 */
export function resolveOverlaps(
  boxes: { id: string; x: number; y: number; w: number; h: number }[],
  margin = 24,
): Map<string, { x: number; y: number }> {
  const pos = new Map(boxes.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let iter = 0; iter < 80; iter++) {
    let moved = false;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const pa = pos.get(a.id)!;
        const pb = pos.get(b.id)!;
        const dx = pb.x - pa.x;
        const dy = pb.y - pa.y;
        const ox = (a.w + b.w) / 2 + margin - Math.abs(dx);
        const oy = (a.h + b.h) / 2 + margin - Math.abs(dy);
        if (ox <= 0 || oy <= 0) continue;
        moved = true;
        if (ox < oy) {
          const shift = ((dx >= 0 ? 1 : -1) * ox) / 2;
          pa.x -= shift;
          pb.x += shift;
        } else {
          const shift = ((dy >= 0 ? 1 : -1) * oy) / 2;
          pa.y -= shift;
          pb.y += shift;
        }
      }
    }
    if (!moved) break;
  }
  const changed = new Map<string, { x: number; y: number }>();
  for (const n of boxes) {
    const p = pos.get(n.id)!;
    if (Math.abs(p.x - n.x) > 0.5 || Math.abs(p.y - n.y) > 0.5) changed.set(n.id, p);
  }
  return changed;
}

export function containerMinSize(
  children: Array<{ dx: number; dy: number; w: number; h: number }>,
  floor = { w: 160, h: 90 },
): { w: number; h: number } {
  let w = floor.w;
  let h = floor.h;
  for (const c of children) {
    w = Math.max(w, 2 * (Math.abs(c.dx) + c.w / 2 + CONTAINER_INSET));
    h = Math.max(
      h,
      2 * (CONTAINER_HEADER + c.h / 2 - c.dy), // child's top edge below the header band
      2 * (CONTAINER_INSET + c.h / 2 + c.dy), // child's bottom edge above the inset
    );
  }
  return { w, h };
}

/**
 * Grow a container (per side, so the growth is minimal) until every child fits
 * inside its margins. Child offsets are relative to `centre`; the returned box
 * may have a different centre when growth was asymmetric, but children keep
 * their absolute positions.
 */
export function containerFit(
  centre: { x: number; y: number },
  size: { w: number; h: number },
  children: Array<{ dx: number; dy: number; w: number; h: number }>,
): { x: number; y: number; w: number; h: number } {
  let left = size.w / 2;
  let right = size.w / 2;
  let top = size.h / 2;
  let bottom = size.h / 2;
  for (const c of children) {
    left = Math.max(left, -c.dx + c.w / 2 + CONTAINER_INSET);
    right = Math.max(right, c.dx + c.w / 2 + CONTAINER_INSET);
    top = Math.max(top, -c.dy + c.h / 2 + CONTAINER_HEADER);
    bottom = Math.max(bottom, c.dy + c.h / 2 + CONTAINER_INSET);
  }
  return {
    x: centre.x + (right - left) / 2,
    y: centre.y + (bottom - top) / 2,
    w: left + right,
    h: top + bottom,
  };
}

export interface SceneEdge {
  id: string;
  sourceId: string;
  targetId: string;
  kind: string;
  label?: string;
  color?: string;
  dashed?: boolean;
  arrow?: boolean;
  tooltip?: string;
}

export interface Scene {
  nodes: SceneNode[];
  edges: SceneEdge[];
}

export interface Point {
  x: number;
  y: number;
}

/** Persisted geometry for one diagram: node id → position. */
export type DiagramLayout = Record<string, Point>;

/** v2 per-view geometry: node positions plus manual edge waypoints. */
export interface ViewLayout {
  /**
   * Node id → position. Top-level nodes carry an absolute centre; a nested
   * child (see SceneNode.parentId) carries an offset relative to its container.
   */
  nodes: DiagramLayout;
  /** Edge id → intermediate bend points (scene coordinates). */
  edges: Record<string, Point[]>;
  /** Node id → explicit size, for resizable containers. */
  sizes?: Record<string, { w: number; h: number }>;
  /** Persisted detail level (context-map only): contexts, their contents, API operations, or distribution. */
  detail?: 'contexts' | 'detail' | 'operations' | 'distribution';
  /** Containers collapsed by hand at this level (they render compact). */
  collapsed?: string[];
}

/**
 * Geometry for the whole editor, keyed by view id. Persisted by the host as
 * the store's `diagrams` section. Legacy persisted values are a flat node
 * map; normalize on read.
 */
export type EditorLayout = Record<string, ViewLayout | DiagramLayout>;

export function normalizeViewLayout(value: ViewLayout | DiagramLayout | undefined): ViewLayout {
  if (!value) return { nodes: {}, edges: {}, sizes: {} };
  if ('nodes' in value && typeof value.nodes === 'object' && !('x' in (value.nodes as object))) {
    const v = value as ViewLayout;
    return {
      nodes: v.nodes ?? {},
      edges: v.edges ?? {},
      sizes: v.sizes ?? {},
      detail: v.detail,
      collapsed: v.collapsed,
    };
  }
  return { nodes: value as DiagramLayout, edges: {}, sizes: {} };
}
