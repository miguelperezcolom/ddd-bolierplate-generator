import type { ModuxModel, ContextMapRelationType, FlowRef } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';
import { containerFit } from '../scene.js';

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

// Detail level: a context becomes a resizable container holding small aggregate
// and use-case boxes the user can rearrange inside it. Children are stored as
// offsets from the container centre (see ViewLayout.nodes), so they follow the
// container when it moves; the container size is stored in ViewLayout.sizes.
const C_HEADER = 34; // header band (context name)
const C_PAD = 14; // inner padding
const C_BOTTOM = 14;
const CHILD_W = 108;
const CHILD_H = 32;
const CHILD_GAP_X = 12;
const CHILD_GAP_Y = 10;
const CHILD_COLS = 2;
const C_W_DEFAULT = CHILD_COLS * CHILD_W + (CHILD_COLS - 1) * CHILD_GAP_X + 2 * C_PAD;

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

interface ChildDesc {
  id: string;
  name: string;
  kind:
    | 'aggregate'
    | 'use-case'
    | 'domain-event'
    | 'application-event'
    | 'read-model'
    | 'domain-service'
    | 'query-service'
    | 'external-use-case';
}

const CHILD_STYLE: Record<ChildDesc['kind'], { symbol: string; fill: string; stroke: string }> = {
  aggregate: { symbol: 'aggregate', fill: '#f5f3ff', stroke: '#8b5cf6' },
  'use-case': { symbol: 'usecase', fill: '#ecfeff', stroke: '#06b6d4' },
  'domain-event': { symbol: 'event', fill: '#fff7ed', stroke: '#f59e0b' },
  'application-event': { symbol: 'event', fill: '#fefce8', stroke: '#eab308' },
  'read-model': { symbol: 'readmodel', fill: '#ecfdf5', stroke: '#10b981' },
  'domain-service': { symbol: 'gear', fill: '#fff1f2', stroke: '#f43f5e' },
  'query-service': { symbol: 'lens', fill: '#f0f9ff', stroke: '#0284c7' },
  'external-use-case': { symbol: 'usecase', fill: '#f8fafc', stroke: '#64748b' },
};

const CHILD_TOOLTIP: Record<ChildDesc['kind'], string> = {
  aggregate: 'Agregado',
  'use-case': 'Caso de uso',
  'domain-event': 'Evento de dominio',
  'application-event': 'Evento de aplicación',
  'read-model': 'Read model',
  'domain-service': 'Servicio de dominio',
  'query-service': 'Query service',
  'external-use-case': 'Caso de uso externo',
};

/** Default container size that fits `childCount` boxes in a grid. */
function defaultContainerSize(childCount: number): { w: number; h: number } {
  const rows = Math.max(1, Math.ceil(childCount / CHILD_COLS));
  const contentH = rows * CHILD_H + (rows - 1) * CHILD_GAP_Y;
  return { w: C_W_DEFAULT, h: C_HEADER + contentH + C_BOTTOM };
}

/** Default grid offset (relative to the container centre) for child index `i`. */
function defaultChildOffset(i: number, size: { w: number; h: number }): { x: number; y: number } {
  const col = i % CHILD_COLS;
  const row = Math.floor(i / CHILD_COLS);
  return {
    x: -size.w / 2 + C_PAD + col * (CHILD_W + CHILD_GAP_X) + CHILD_W / 2,
    y: -size.h / 2 + C_HEADER + row * (CHILD_H + CHILD_GAP_Y) + CHILD_H / 2,
  };
}

/**
 * A bounded context at the detail level: the module itself as a resizable
 * container plus one small box per aggregate and per use case (both hang off the
 * module — there is no aggregate→use-case link). Child positions are offsets
 * from the container centre (stored in `layout` under the child id, falling back
 * to a grid); the container size comes from `sizes`. Children are draggable and
 * become connectable once relations between them are added.
 */
function detailedContext(
  model: ModuxModel,
  module: ModuxModel['modules'][number],
  center: { x: number; y: number },
  base: Omit<SceneNode, 'x' | 'y' | 'w' | 'h'>,
  layout: DiagramLayout,
  sizes: Record<string, { w: number; h: number }>,
): SceneNode[] {
  const aggregates = (model.aggregates ?? []).filter((a) => a.moduleId === module.id);
  const children: ChildDesc[] = [
    ...aggregates.map((a): ChildDesc => ({ id: a.id, name: a.name, kind: 'aggregate' })),
    ...(module.useCases ?? []).map((u): ChildDesc => ({ id: u.id, name: u.name, kind: 'use-case' })),
    ...(module.domainEvents ?? []).map(
      (ev): ChildDesc => ({ id: ev.id, name: ev.name, kind: 'domain-event' }),
    ),
    ...(module.readModels ?? []).map(
      (rm): ChildDesc => ({ id: rm.id, name: rm.name, kind: 'read-model' }),
    ),
    ...(module.domainServices ?? []).map(
      (ds): ChildDesc => ({ id: ds.id, name: ds.name, kind: 'domain-service' }),
    ),
    ...(module.applicationEvents ?? []).map(
      (ev): ChildDesc => ({ id: ev.id, name: ev.name, kind: 'application-event' }),
    ),
    ...(module.queryServices ?? []).map(
      (qs): ChildDesc => ({ id: qs.id, name: qs.name, kind: 'query-service' }),
    ),
  ];
  if (!children.length) {
    // Nothing to nest — keep the compact context box.
    return [{ ...base, x: center.x, y: center.y, w: NODE_W, h: NODE_H }];
  }
  return detailedContainer(center, base, children, layout, sizes);
}

/** A resizable container with child boxes — shared by contexts and external systems. */
function detailedContainer(
  center: { x: number; y: number },
  base: Omit<SceneNode, 'x' | 'y' | 'w' | 'h'>,
  children: ChildDesc[],
  layout: DiagramLayout,
  sizes: Record<string, { w: number; h: number }>,
): SceneNode[] {
  const size = sizes[base.id] ?? defaultContainerSize(children.length);
  const offsets = children.map((c, i) => layout[c.id] ?? defaultChildOffset(i, size));
  // Children must always fit inside the box: a stored size that no longer holds
  // them (new elements, legacy layouts) grows per side instead of letting them
  // spill. Children keep their absolute spot (offsets are from `center`).
  const fit = containerFit(
    center,
    size,
    offsets.map((off) => ({ dx: off.x, dy: off.y, w: CHILD_W, h: CHILD_H })),
  );
  const container: SceneNode = {
    ...base,
    x: fit.x,
    y: fit.y,
    w: fit.w,
    h: fit.h,
    container: true,
  };
  const childNodes: SceneNode[] = children.map((c, i) => {
    const off = offsets[i];
    const style = CHILD_STYLE[c.kind];
    return {
      id: c.id,
      label: c.name,
      kind: c.kind,
      x: center.x + off.x,
      y: center.y + off.y,
      w: CHILD_W,
      h: CHILD_H,
      symbol: style.symbol,
      fill: style.fill,
      stroke: style.stroke,
      parentId: base.id,
      tooltip: `${CHILD_TOOLTIP[c.kind]} ${c.name}`,
    };
  });
  return [container, ...childNodes];
}

export function contextMapScene(
  model: ModuxModel,
  layout: DiagramLayout,
  detailed = false,
  sizes: Record<string, { w: number; h: number }> = {},
): Scene {
  const allNodes = [
    ...model.modules.map((m) => ({ ref: m, external: false })),
    ...model.externalSystems.map((e) => ({ ref: e, external: true })),
  ];

  const nodes: SceneNode[] = allNodes.flatMap((entry, i) => {
    const pos = layout[entry.ref.id] ?? defaultPosition(i, allNodes.length);
    if (entry.external) {
      const x = entry.ref as ModuxModel['externalSystems'][number];
      const base: Omit<SceneNode, 'x' | 'y' | 'w' | 'h'> = {
        id: x.id,
        label: x.name,
        kind: 'external-system',
        symbol: 'component',
        fill: '#ffffff',
        stroke: '#64748b',
        dashed: true,
        badge: 'EXTERNAL',
        tooltip: `${x.name} (sistema externo)`,
      };
      if (detailed && (x.useCases ?? []).length > 0) {
        return detailedContainer(
          pos,
          base,
          (x.useCases ?? []).map((u) => ({ id: u.id, name: u.name, kind: 'external-use-case' })),
          layout,
          sizes,
        );
      }
      return [{ ...base, x: pos.x, y: pos.y, w: NODE_W, h: NODE_H }];
    }
    const m = entry.ref as ModuxModel['modules'][number];
    const subdomain = m.subdomainType ?? 'GENERIC';
    const base: Omit<SceneNode, 'x' | 'y' | 'w' | 'h'> = {
      id: m.id,
      label: m.name,
      kind: 'module',
      symbol: 'component',
      fill: SUBDOMAIN_FILL[subdomain],
      stroke: '#94a3b8',
      badge: subdomain,
      tooltip: `${m.name} — subdominio ${subdomain}`,
    };
    if (detailed) return detailedContext(model, m, pos, base, layout, sizes);
    return [{ ...base, x: pos.x, y: pos.y, w: NODE_W, h: NODE_H }];
  });
  // Business actors live outside every bounded context.
  const totalTop = allNodes.length + (model.actors ?? []).length;
  (model.actors ?? []).forEach((a, i) => {
    const pos = layout[a.id] ?? defaultPosition(allNodes.length + i, totalTop);
    nodes.push({
      id: a.id,
      label: a.name,
      x: pos.x,
      y: pos.y,
      w: 132,
      h: 48,
      kind: 'actor',
      symbol: 'person',
      fill: '#ffffff',
      stroke: '#64748b',
      badge: 'ACTOR',
      tooltip: `${a.name} (actor)`,
    });
  });
  // Children must paint over every container, not just their own.
  nodes.sort((a, b) => (a.parentId ? 1 : 0) - (b.parentId ? 1 : 0));

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
    // At the detail level a flow anchors on the concrete pieces when they are
    // visible: the trigger event in the source context and (for MATERIALIZES)
    // the read model in the target — the drawing mirrors the intent.
    const sourceModule = detailed ? model.modules.find((m) => m.id === f.sourceId) : undefined;
    const sourceEvent =
      sourceModule?.domainEvents?.find((ev) => ev.name === f.triggerEvent) ??
      sourceModule?.applicationEvents?.find((ev) => ev.name === f.triggerEvent);
    const targetReadModel =
      detailed && f.readModelName
        ? model.modules
            .find((m) => m.id === f.targetId)
            ?.readModels?.find((rm) => rm.name === f.readModelName)
        : undefined;
    const targetUseCase =
      detailed && f.targetUseCaseId
        ? model.modules
            .find((m) => m.id === f.targetId)
            ?.useCases?.find((u) => u.id === f.targetUseCaseId)
        : undefined;
    return {
      id: `flow:${f.id}`,
      sourceId: sourceEvent?.id ?? f.sourceId,
      targetId: targetUseCase?.id ?? targetReadModel?.id ?? f.targetId,
      kind: 'flow',
      label: f.name,
      color: FLOW_COLOR[coherence],
      dashed: true,
      arrow: true,
      tooltip: `Flow ${f.name} [${f.archetype}] — ${coherence}`,
    };
  });

  // Emission edges (aggregate/use case → domain event) only exist at the detail
  // level, where publisher and event both render as children.
  const nodeIds = new Set(nodes.map((n) => n.id));
  const emissionEdges: SceneEdge[] = detailed
    ? (model.emissions ?? [])
        .filter((e) => nodeIds.has(e.sourceId) && nodeIds.has(e.domainEventId))
        .map((e) => ({
          id: `emit:${e.sourceId}->${e.domainEventId}`,
          sourceId: e.sourceId,
          targetId: e.domainEventId,
          kind: 'emission',
          color: '#f59e0b',
          dashed: true,
          arrow: true,
          tooltip: 'emite',
        }))
    : [];

  // Use case → use case invocations, visible when both render as children.
  const callEdges: SceneEdge[] = detailed
    ? (model.useCaseCalls ?? [])
        .filter((c) => nodeIds.has(c.sourceId) && nodeIds.has(c.targetId))
        .map((c) => ({
          id: `uccall:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: 'uc-call',
          color: '#0891b2',
          dashed: true,
          arrow: true,
          tooltip: 'invoca',
        }))
    : [];

  // Use case → query service consumption, and actor → use case/query service usage.
  const queryEdges: SceneEdge[] = detailed
    ? (model.queryCalls ?? [])
        .filter((c) => nodeIds.has(c.sourceId) && nodeIds.has(c.targetId))
        .map((c) => ({
          id: `qscall:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: 'qs-call',
          color: '#0d9488',
          dashed: true,
          arrow: true,
          tooltip: 'consulta',
        }))
    : [];
  const actorUseEdges: SceneEdge[] = detailed
    ? (model.actorUses ?? [])
        .filter((u) => nodeIds.has(u.actorId) && nodeIds.has(u.targetId))
        .map((u) => ({
          id: `use:${u.actorId}->${u.targetId}`,
          sourceId: u.actorId,
          targetId: u.targetId,
          kind: 'actor-use',
          color: '#6366f1',
          arrow: true,
          tooltip: 'usa (deriva una UI)',
        }))
    : [];

  const externalCallEdges: SceneEdge[] = detailed
    ? (model.externalCalls ?? [])
        .filter((c) => nodeIds.has(c.externalSystemId) && nodeIds.has(c.useCaseId))
        .map((c) => ({
          id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
          sourceId: c.externalSystemId,
          targetId: c.useCaseId,
          kind: 'external-call',
          color: '#7c3aed',
          arrow: true,
          tooltip: 'llama (entra por un ACL)',
        }))
    : [];
  const externalUcCallEdges: SceneEdge[] = detailed
    ? (model.externalUseCaseCalls ?? [])
        .filter((c) => nodeIds.has(c.sourceId) && nodeIds.has(c.targetId))
        .map((c) => ({
          id: `extuccall:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: 'ext-uc-call',
          color: '#64748b',
          dashed: true,
          arrow: true,
          tooltip: 'llama (derivará gateway/API)',
        }))
    : [];

  return {
    nodes,
    edges: [
      ...relationEdges,
      ...flowEdges,
      ...emissionEdges,
      ...callEdges,
      ...queryEdges,
      ...actorUseEdges,
      ...externalCallEdges,
      ...externalUcCallEdges,
    ],
  };
}
