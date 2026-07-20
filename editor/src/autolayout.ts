import type { Scene, DiagramLayout, Point } from './scene.js';

/** Node placement plus the orthogonal edge routes ELK computed for them. */
export interface AutoLayoutResult {
  /** Node id → centre position. */
  nodes: DiagramLayout;
  /** Edge id → interior bend points (scene coords), from ELK's orthogonal router. */
  edges: Record<string, Point[]>;
}

/**
 * Automatic placement AND orthogonal edge routing via ELK's layered algorithm,
 * loaded on demand — the ~1.4 MB engine only downloads when the user presses the
 * auto-layout button. ELK lays the nodes out left→right and threads every edge
 * through the gaps between the boxes with horizontal/vertical segments that
 * neither overlap nor cross a box. Pipeline views (flows, processes…) let ELK
 * layer freely; map-like views pass a `partitions` map (one lane per semantic
 * rank) so the canonical left→right order — driving side, domain, driven side —
 * is preserved while ELK still does the fine placement and the routing.
 */
export async function autoLayout(
  scene: Scene,
  opts?: { partitions?: Record<string, number> },
): Promise<AutoLayoutResult> {
  const { default: ELK } = await import('elkjs/lib/elk.bundled.js');
  const elk = new ELK();
  const partitions = opts?.partitions;
  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'RIGHT',
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.spacing.nodeNode': '45',
      'elk.layered.spacing.nodeNodeBetweenLayers': '90',
      // Channels so lines don't graze the boxes or fuse with each other.
      'elk.layered.spacing.edgeNodeBetweenLayers': '25',
      'elk.layered.spacing.edgeEdgeBetweenLayers': '12',
      'elk.spacing.edgeEdge': '12',
      'elk.spacing.edgeNode': '18',
      // Keep the given left→right lanes when the caller supplies partitions.
      ...(partitions ? { 'elk.partitioning.activate': 'true' } : {}),
    },
    children: scene.nodes.map((n) => ({
      id: n.id,
      width: n.w,
      height: n.h,
      ...(partitions && partitions[n.id] !== undefined
        ? { layoutOptions: { 'elk.partitioning.partition': String(partitions[n.id]) } }
        : {}),
    })),
    edges: scene.edges.map((e) => ({ id: e.id, sources: [e.sourceId], targets: [e.targetId] })),
  };
  const result = await elk.layout(graph);
  const nodes: DiagramLayout = {};
  for (const child of result.children ?? []) {
    nodes[child.id] = {
      x: (child.x ?? 0) + (child.width ?? 0) / 2,
      y: (child.y ?? 0) + (child.height ?? 0) / 2,
    };
  }
  // Persist ELK's orthogonal routing as INTERIOR bend points; the canvas anchors
  // each end to the node border orthogonally (see orthoBorderPoint), so the ends
  // stay horizontal/vertical AND follow the node when it is later dragged. A
  // route with no interior bends (aligned boxes) is left out — the canvas draws
  // that straight orthogonal segment itself.
  const edges: Record<string, Point[]> = {};
  type Routed = { id: string; sections?: { bendPoints?: Point[] }[] };
  for (const edge of (result.edges ?? []) as Routed[]) {
    const bends = edge.sections?.[0]?.bendPoints;
    if (bends && bends.length) edges[edge.id] = bends.map((p) => ({ x: p.x, y: p.y }));
  }
  return { nodes, edges };
}
