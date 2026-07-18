import type { DiagramLayout, Scene, SceneNode } from './scene.js';

/**
 * Semantic lane layout: a canonical, deterministic placement for map-like views.
 * Every run puts the same element in the same place — driving side on the left
 * (actors, external consumers, UIs/APIs), the domain in the middle, the read
 * side and the driven side on the right (external systems we consume). Within a
 * lane, nodes order alphabetically first and then trade places to uncross the
 * edges between lanes (barycenter sweeps — deterministic, seeded on that order).
 */

const LANE_GAP_X = 90;
const NODE_GAP_Y = 40;

/** Canonical left→right lane per node kind; unknown kinds land in the domain lane. */
const RANKS: Record<string, number> = {
  actor: 0,
  'ai-agent': 0,
  ui: 2,
  'ui-app': 2,
  page: 2,
  api: 3,
  'proxy-api': 3,
  'mcp-gateway': 3,
  boundedContext: 4,
  module: 4,
  service: 4,
  aggregate: 5,
  entity: 5,
  'use-case': 5,
  usecase: 5,
  'domain-service': 5,
  model: 5,
  transformation: 6,
  'model-mapping': 6,
  'custom-code': 6,
  flow: 6,
  'etl-flow': 6,
  process: 6,
  saga: 6,
  workflow: 6,
  'scheduled-trigger': 6,
  notification: 6,
  document: 6,
  'domain-event': 7,
  'application-event': 7,
  'read-model': 8,
  'query-service': 8,
  projection: 8,
  'identity-provider': 9,
  infrastructure: 9,
  url: 9,
  'mcp-server': 9,
};

const CONSUMER_LANE = 1;
const CONSUMED_LANE = 9;
const FALLBACK_LANE = 5;

/**
 * An external system is a CONSUMER when its edges point into our side more than
 * ours point into it (it calls us → it belongs on the left); otherwise it is
 * CONSUMED (right). Ties and unconnected externals go right.
 */
function externalRank(node: SceneNode, scene: Scene): number {
  let out = 0;
  let incoming = 0;
  for (const e of scene.edges) {
    if (e.sourceId === node.id && !isExternal(e.targetId, scene)) out++;
    if (e.targetId === node.id && !isExternal(e.sourceId, scene)) incoming++;
  }
  return out > incoming ? CONSUMER_LANE : CONSUMED_LANE;
}

function isExternal(id: string, scene: Scene): boolean {
  return scene.nodes.find((n) => n.id === id)?.kind === 'external-system';
}

function rankOf(node: SceneNode, scene: Scene): number {
  if (node.kind === 'external-system') return externalRank(node, scene);
  return RANKS[node.kind] ?? FALLBACK_LANE;
}

/** Canonical placement for the top-level nodes of `scene` (children follow their container). */
export function semanticLayout(scene: Scene): DiagramLayout {
  const nodes = scene.nodes.filter((n) => !n.parentId && n.kind !== 'area');
  const layout: DiagramLayout = {};
  if (!nodes.length) return layout;

  // Group into lanes, seeded alphabetically so the starting point never varies.
  const lanes = new Map<number, SceneNode[]>();
  for (const n of nodes) {
    const rank = rankOf(n, scene);
    if (!lanes.has(rank)) lanes.set(rank, []);
    lanes.get(rank)!.push(n);
  }
  const orderedLanes = [...lanes.entries()].sort((a, b) => a[0] - b[0]).map(([, ns]) => ns);
  for (const lane of orderedLanes) {
    lane.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) || a.id.localeCompare(b.id));
  }

  // Barycenter sweeps: each node drifts towards the height of the nodes it
  // connects to. The LEFTMOST lane is the anchor — actors keep their canonical
  // alphabetical order and everything else arranges around them (sorting every
  // lane would oscillate between symmetric states). Reindexing after each lane
  // (Gauss–Seidel) propagates the anchor within a single sweep. Deterministic:
  // stable sorts on a fixed seed — same scene, same layout.
  const indexOf = new Map<string, number>();
  const reindex = () => {
    // Positions are normalised within each lane so lanes of different sizes compare.
    orderedLanes.forEach((lane) =>
      lane.forEach((n, i) => indexOf.set(n.id, lane.length > 1 ? i / (lane.length - 1) : 0.5)),
    );
  };
  const barycenter = (n: SceneNode): number | null => {
    let sum = 0;
    let count = 0;
    for (const e of scene.edges) {
      const other = e.sourceId === n.id ? e.targetId : e.targetId === n.id ? e.sourceId : null;
      if (other !== null && indexOf.has(other)) {
        sum += indexOf.get(other)!;
        count++;
      }
    }
    return count ? sum / count : null;
  };
  for (let pass = 0; pass < 4; pass++) {
    reindex();
    const sweeping = pass % 2 === 0 ? orderedLanes.slice(1) : orderedLanes.slice(1).reverse();
    for (const lane of sweeping) {
      lane.sort((a, b) => {
        const ba = barycenter(a);
        const bb = barycenter(b);
        if (ba === null && bb === null) return 0;
        if (ba === null) return 1;
        if (bb === null) return -1;
        return ba - bb;
      });
      reindex();
    }
  }

  // Place lanes left→right; stack each lane vertically, middles aligned.
  const laneHeights = orderedLanes.map(
    (lane) => lane.reduce((h, n) => h + n.h, 0) + NODE_GAP_Y * (lane.length - 1),
  );
  const maxHeight = Math.max(...laneHeights);
  let laneX = 0;
  orderedLanes.forEach((lane, i) => {
    const laneWidth = Math.max(...lane.map((n) => n.w));
    laneX += laneWidth / 2;
    let y = (maxHeight - laneHeights[i]) / 2;
    for (const n of lane) {
      y += n.h / 2;
      layout[n.id] = { x: laneX, y };
      y += n.h / 2 + NODE_GAP_Y;
    }
    laneX += laneWidth / 2 + LANE_GAP_X;
  });
  return layout;
}
