/**
 * Generic diagram scene — the contract between semantic view adapters and the
 * <modux-canvas> engine. Nothing here knows about the modux meta-model.
 */

export interface SceneNode {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Semantic hint carried back in gesture events (e.g. 'module', 'external-system'). */
  kind: string;
  fill?: string;
  stroke?: string;
  dashed?: boolean;
  /** Small tag rendered above the node (e.g. subdomain type). */
  badge?: string;
  /** ArchiMate-style glyph id drawn in the node's top-right corner (see modux-canvas SYMBOLS). */
  symbol?: string;
  tooltip?: string;
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
  nodes: DiagramLayout;
  /** Edge id → intermediate bend points (scene coordinates). */
  edges: Record<string, Point[]>;
}

/**
 * Geometry for the whole editor, keyed by view id. Lives OUTSIDE the model
 * YAML. Legacy persisted values are a flat node map; normalize on read.
 */
export type EditorLayout = Record<string, ViewLayout | DiagramLayout>;

export function normalizeViewLayout(value: ViewLayout | DiagramLayout | undefined): ViewLayout {
  if (!value) return { nodes: {}, edges: {} };
  if ('nodes' in value && typeof value.nodes === 'object' && !('x' in (value.nodes as object))) {
    const v = value as ViewLayout;
    return { nodes: v.nodes ?? {}, edges: v.edges ?? {} };
  }
  return { nodes: value as DiagramLayout, edges: {} };
}
