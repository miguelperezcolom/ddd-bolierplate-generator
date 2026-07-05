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

/** Persisted geometry for one diagram: node id → position. */
export type DiagramLayout = Record<string, { x: number; y: number }>;

/** Geometry for the whole editor, keyed by view id. Lives OUTSIDE the model YAML. */
export type EditorLayout = Record<string, DiagramLayout>;
