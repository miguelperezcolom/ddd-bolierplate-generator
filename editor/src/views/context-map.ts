import type { ModuxModel, ContextMapRelationType, FlowRef } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';

/**
 * Context-map view adapter: projects the modux model into a generic Scene.
 * Colours and abbreviations mirror the server-side ContextMapSvgRenderer so
 * both projections stay visually consistent.
 */

const SUBDOMAIN_FILL: Record<string, string> = {
  CORE: '#fef3c7',
  SUPPORTING: '#e0e7ff',
  GENERIC: '#f1f5f9',
};

const RELATION_ABBREV: Record<ContextMapRelationType, string> = {
  PARTNERSHIP: 'P',
  SHARED_KERNEL: 'SK',
  CUSTOMER_SUPPLIER: 'C/S',
  CONFORMIST: 'CF',
  OPEN_HOST_SERVICE: 'OHS',
  ANTI_CORRUPTION_LAYER: 'ACL',
  PUBLISHED_LANGUAGE: 'PL',
  SEPARATE_WAYS: 'SW',
};

export type FlowCoherence = 'OK' | 'MISSING_RELATION' | 'REVERSED' | 'EXTERNAL' | 'INTERNAL';

const FLOW_COLOR: Record<FlowCoherence, string> = {
  OK: '#16a34a',
  MISSING_RELATION: '#f59e0b',
  REVERSED: '#d97706',
  EXTERNAL: '#64748b',
  INTERNAL: '#94a3b8',
};

const NODE_W = 168;
const NODE_H = 56;

export function relationEdgeId(sourceId: string, targetId: string): string {
  return `rel:${sourceId}->${targetId}`;
}

/**
 * Client-side approximation of FlowContextMapCoherenceService — enough for
 * live feedback while editing; the server linter remains authoritative.
 */
export function flowCoherence(model: ModuxModel, flow: FlowRef): FlowCoherence {
  const externalIds = new Set(model.externalSystems.map((e) => e.id));
  if (flow.sourceId === flow.targetId) return 'INTERNAL';
  if (externalIds.has(flow.sourceId) || externalIds.has(flow.targetId)) return 'EXTERNAL';
  if (model.relations.some((r) => r.sourceId === flow.sourceId && r.targetId === flow.targetId)) {
    return 'OK';
  }
  if (model.relations.some((r) => r.sourceId === flow.targetId && r.targetId === flow.sourceId)) {
    return 'REVERSED';
  }
  return 'MISSING_RELATION';
}

/** Deterministic circular fallback, same spirit as the server renderer. */
function defaultPosition(index: number, total: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / Math.max(total, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(angle),
    y: 340 + 240 * Math.sin(angle),
  };
}

export function contextMapScene(model: ModuxModel, layout: DiagramLayout): Scene {
  const allNodes = [
    ...model.modules.map((m) => ({ ref: m, external: false })),
    ...model.externalSystems.map((e) => ({ ref: e, external: true })),
  ];

  const nodes: SceneNode[] = allNodes.map((entry, i) => {
    const pos = layout[entry.ref.id] ?? defaultPosition(i, allNodes.length);
    if (entry.external) {
      return {
        id: entry.ref.id,
        label: entry.ref.name,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
        kind: 'external-system',
        fill: '#ffffff',
        stroke: '#64748b',
        dashed: true,
        badge: 'EXTERNAL',
        tooltip: `${entry.ref.name} (sistema externo)`,
      };
    }
    const m = entry.ref as ModuxModel['modules'][number];
    const subdomain = m.subdomainType ?? 'GENERIC';
    return {
      id: m.id,
      label: m.name,
      x: pos.x,
      y: pos.y,
      w: NODE_W,
      h: NODE_H,
      kind: 'module',
      fill: SUBDOMAIN_FILL[subdomain],
      stroke: '#94a3b8',
      badge: subdomain,
      tooltip: `${m.name} — subdominio ${subdomain}`,
    };
  });

  const relationEdges: SceneEdge[] = model.relations.map((r) => ({
    id: relationEdgeId(r.sourceId, r.targetId),
    sourceId: r.sourceId,
    targetId: r.targetId,
    kind: 'relation',
    label: RELATION_ABBREV[r.type],
    color: '#475569',
    arrow: true,
    tooltip: `${r.type} (${r.sourceId} upstream → ${r.targetId} downstream)`,
  }));

  const flowEdges: SceneEdge[] = model.flows.map((f) => {
    const coherence = flowCoherence(model, f);
    return {
      id: `flow:${f.id}`,
      sourceId: f.sourceId,
      targetId: f.targetId,
      kind: 'flow',
      label: f.name,
      color: FLOW_COLOR[coherence],
      dashed: true,
      arrow: true,
      tooltip: `Flow ${f.name} [${f.archetype}] — ${coherence}`,
    };
  });

  return { nodes, edges: [...relationEdges, ...flowEdges] };
}
