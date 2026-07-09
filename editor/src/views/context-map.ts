import type { ModuxModel, ContextMapRelationType, FlowRef } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';
import { containerFit, resolveOverlaps } from '../scene.js';

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

/** Canvas id of an API-implementation occurrence (same ApiRef, one node per site). */
export function apiImplNodeId(apiId: string, moduleId: string): string {
  return `apiimpl:${apiId}@${moduleId}`;
}

/** Canvas id of an operation occurrence at a SITE (a proxy or a bounded context). */
export function apiOpOccurrenceId(operationId: string, siteId: string): string {
  return `apiop:${operationId}@${siteId}`;
}

/**
 * API-implementation occurrences of a bounded context, as nestable children — the SAME
 * ApiRef the external system publishes, so the chip looks exactly like the API nested
 * in its publisher; only the site differs.
 */
function apiImplChildren(model: ModuxModel, moduleId: string): ChildDesc[] {
  const apiById = new Map((model.apis ?? []).map((a) => [a.id, a]));
  return (model.apiImplementations ?? [])
    .filter((impl) => impl.moduleId === moduleId && apiById.has(impl.apiId))
    .map((impl): ChildDesc => ({
      id: apiImplNodeId(impl.apiId, impl.moduleId),
      name: apiById.get(impl.apiId)!.name,
      kind: 'api-impl',
    }));
}

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
  // Relations always exist where flows do (they derive from them); the signal
  // now is whether the pair carries a strategic annotation yet.
  if (
    model.relations.some(
      (r) => r.sourceId === flow.sourceId && r.targetId === flow.targetId && r.declared,
    )
  ) {
    return 'OK';
  }
  if (
    model.relations.some(
      (r) => r.sourceId === flow.targetId && r.targetId === flow.sourceId && r.declared,
    )
  ) {
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
    | 'external-use-case'
    | 'external-table'
    | 'mcp-server'
    | 'api-operation'
    | 'api-op-occurrence'
    | 'api'
    | 'api-impl'
    | 'proxy-api';
  /** Policies keep use-case behaviour (gestures, CRUD) but wear the lilac sticky. */
  policy?: boolean;
}

const POLICY_STYLE = { symbol: 'flow', fill: '#f3e8ff', stroke: '#7e22ce' };

const CHILD_STYLE: Record<ChildDesc['kind'], { symbol: string; fill: string; stroke: string }> = {
  aggregate: { symbol: 'aggregate', fill: '#f5f3ff', stroke: '#8b5cf6' },
  'use-case': { symbol: 'usecase', fill: '#ecfeff', stroke: '#06b6d4' },
  'domain-event': { symbol: 'event', fill: '#fff7ed', stroke: '#f59e0b' },
  'application-event': { symbol: 'event', fill: '#fefce8', stroke: '#eab308' },
  'read-model': { symbol: 'readmodel', fill: '#ecfdf5', stroke: '#10b981' },
  'domain-service': { symbol: 'gear', fill: '#fff1f2', stroke: '#f43f5e' },
  'query-service': { symbol: 'lens', fill: '#f0f9ff', stroke: '#0284c7' },
  'external-use-case': { symbol: 'usecase', fill: '#f8fafc', stroke: '#64748b' },
  'external-table': { symbol: 'readmodel', fill: '#fefce8', stroke: '#a16207' },
  'mcp-server': { symbol: 'robot', fill: '#faf5ff', stroke: '#9333ea' },
  'api-operation': { symbol: 'usecase', fill: '#eef2ff', stroke: '#4f46e5' },
  'api-op-occurrence': { symbol: 'usecase', fill: '#eef2ff', stroke: '#4f46e5' },
  api: { symbol: 'interface', fill: '#eef2ff', stroke: '#4f46e5' },
  'api-impl': { symbol: 'interface', fill: '#eef2ff', stroke: '#4f46e5' },
  'proxy-api': { symbol: 'interface', fill: '#ecfeff', stroke: '#0e7490' },
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
  'external-table': 'Tabla (legacy)',
  'mcp-server': 'Servidor MCP',
  'api-operation': 'Operación de API',
  'api-op-occurrence': 'Operación de la API, en este sitio',
  api: 'API publicada por este sistema',
  'api-impl': 'La misma API, implementada también en este contexto',
  'proxy-api': 'Proxy/cache de una API, alojado en este sistema',
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
  operationsLevel = false,
): SceneNode[] {
  const aggregates = (model.aggregates ?? []).filter((a) => a.moduleId === module.id);
  const children: ChildDesc[] = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...apiImplChildren(model, module.id),
    ...aggregates.map((a): ChildDesc => ({ id: a.id, name: a.name, kind: 'aggregate' })),
    ...(module.useCases ?? []).map(
      (u): ChildDesc => ({ id: u.id, name: u.name, kind: 'use-case', policy: u.policy }),
    ),
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
  // The deepest level unfolds the implemented APIs into sub-containers with their
  // operation OCCURRENCES (per-site ids) — so proxy operations can later wire to the
  // implementation here or to the published API, operation by operation.
  if (operationsLevel) {
    const apiById = new Map((model.apis ?? []).map((a) => [a.id, a]));
    const boxes: ApiBoxDesc[] = (model.apiImplementations ?? [])
      .filter((impl) => impl.moduleId === module.id && apiById.has(impl.apiId))
      .map((impl) => {
        const api = apiById.get(impl.apiId)!;
        return {
          id: apiImplNodeId(impl.apiId, impl.moduleId),
          name: api.name,
          kind: 'api-impl' as const,
          badge: 'API',
          fill: '#eef2ff',
          stroke: '#4f46e5',
          tooltip: `${api.name} — la misma API, implementada en ${module.name}`,
          opKind: 'api-op-occurrence' as const,
          ops: (api.operations ?? []).map((op) => ({
            id: apiOpOccurrenceId(op.id, module.id),
            name: op.name,
          })),
        };
      });
    if (boxes.length > 0) {
      const rest = children.filter((c) => c.kind !== 'api-impl');
      return containerWithApiBoxes(center, base, boxes, rest, layout, sizes);
    }
  }
  return detailedContainer(center, base, children, layout, sizes);
}

/**
 * The operations level of an external system: each published API is a SUB-CONTAINER
 * with its operation chips, and the system's box grows (per side) to hold the fitted
 * API boxes plus its plain children. Offsets follow the usual convention: children
 * hang off their parent's STORED centre, even when the painted (fitted) one shifts.
 */
/** An API-shaped sub-container (a published API, or an implementation occurrence). */
interface ApiBoxDesc {
  id: string;
  name: string;
  kind: 'api' | 'api-impl' | 'proxy-api';
  badge: string;
  fill: string;
  stroke: string;
  tooltip: string;
  /** Kind of the operation chips inside (real operations vs per-site occurrences). */
  opKind: 'api-operation' | 'api-op-occurrence';
  ops: { id: string; name: string }[];
}

/** A container nesting API sub-containers (with their operation chips) plus plain chips. */
function containerWithApiBoxes(
  center: { x: number; y: number },
  base: Omit<SceneNode, 'x' | 'y' | 'w' | 'h'>,
  boxes: ApiBoxDesc[],
  plainChildren: ChildDesc[],
  layout: DiagramLayout,
  sizes: Record<string, { w: number; h: number }>,
): SceneNode[] {
  const sysSize = sizes[base.id] ?? defaultContainerSize(boxes.length + plainChildren.length);
  const apiBoxes = boxes.map((a, i) => {
    const off = layout[a.id] ?? defaultChildOffset(i, sysSize);
    const ops = a.ops;
    const apiSize = sizes[a.id] ?? defaultContainerSize(ops.length);
    const opOffs = ops.map((op, j) => layout[op.id] ?? defaultChildOffset(j, apiSize));
    const fit = containerFit(
      { x: off.x, y: off.y },
      apiSize,
      opOffs.map((o) => ({ dx: o.x, dy: o.y, w: CHILD_W, h: CHILD_H })),
    );
    return { a, off, ops, opOffs, fit };
  });
  const plainOffs = plainChildren.map(
    (c, i) => layout[c.id] ?? defaultChildOffset(boxes.length + i, sysSize),
  );
  // Siblings NEVER overlap: separate the (large) API boxes and the plain chips
  // before the system fits around them — display-time, so it always holds.
  const separated = resolveOverlaps(
    [
      ...apiBoxes.map((b) => ({ id: b.a.id, x: b.fit.x, y: b.fit.y, w: b.fit.w, h: b.fit.h })),
      ...plainChildren.map((c, i) => ({
        id: c.id,
        x: plainOffs[i].x,
        y: plainOffs[i].y,
        w: CHILD_W,
        h: CHILD_H,
      })),
    ],
    24,
  );
  for (const b of apiBoxes) {
    const moved = separated.get(b.a.id);
    if (moved) {
      b.off = { x: b.off.x + (moved.x - b.fit.x), y: b.off.y + (moved.y - b.fit.y) };
      b.fit = { ...b.fit, x: moved.x, y: moved.y };
    }
  }
  plainChildren.forEach((c, i) => {
    const moved = separated.get(c.id);
    if (moved) plainOffs[i] = { x: moved.x, y: moved.y };
  });
  const sysFit = containerFit(center, sysSize, [
    ...apiBoxes.map((b) => ({ dx: b.fit.x, dy: b.fit.y, w: b.fit.w, h: b.fit.h })),
    ...plainOffs.map((o) => ({ dx: o.x, dy: o.y, w: CHILD_W, h: CHILD_H })),
  ]);
  const nodes: SceneNode[] = [
    { ...base, x: sysFit.x, y: sysFit.y, w: sysFit.w, h: sysFit.h, container: true },
  ];
  for (const b of apiBoxes) {
    nodes.push({
      id: b.a.id,
      label: b.a.name,
      kind: b.a.kind,
      symbol: 'interface',
      fill: b.a.fill,
      stroke: b.a.stroke,
      badge: b.a.badge,
      container: true,
      parentId: base.id,
      x: center.x + b.fit.x,
      y: center.y + b.fit.y,
      w: b.fit.w,
      h: b.fit.h,
      tooltip: b.a.tooltip,
    });
    b.ops.forEach((op, j) => {
      nodes.push({
        id: op.id,
        label: op.name,
        kind: b.a.opKind,
        symbol: 'usecase',
        fill: '#eef2ff',
        stroke: '#4f46e5',
        parentId: b.a.id,
        x: center.x + b.off.x + b.opOffs[j].x,
        y: center.y + b.off.y + b.opOffs[j].y,
        w: CHILD_W,
        h: CHILD_H,
        tooltip: `${CHILD_TOOLTIP[b.a.opKind]}: ${op.name}`,
      });
    });
  }
  plainChildren.forEach((c, i) => {
    const style = CHILD_STYLE[c.kind];
    nodes.push({
      id: c.id,
      label: c.name,
      kind: c.kind,
      x: center.x + plainOffs[i].x,
      y: center.y + plainOffs[i].y,
      w: CHILD_W,
      h: CHILD_H,
      symbol: style.symbol,
      fill: style.fill,
      stroke: style.stroke,
      parentId: base.id,
      tooltip: `${CHILD_TOOLTIP[c.kind]} ${c.name}`,
    });
  });
  return nodes;
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
  // Siblings never overlap: nudge the chips apart before fitting the box.
  const separated = resolveOverlaps(
    children.map((c, i) => ({ id: c.id, x: offsets[i].x, y: offsets[i].y, w: CHILD_W, h: CHILD_H })),
    10,
  );
  children.forEach((c, i) => {
    const moved = separated.get(c.id);
    if (moved) offsets[i] = { x: moved.x, y: moved.y };
  });
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
    const style = c.policy ? POLICY_STYLE : CHILD_STYLE[c.kind];
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
      tooltip: `${c.policy ? 'Policy' : CHILD_TOOLTIP[c.kind]} ${c.name}`,
    };
  });
  return [container, ...childNodes];
}

export function contextMapScene(
  model: ModuxModel,
  layout: DiagramLayout,
  detail: 'contexts' | 'detail' | 'operations' = 'contexts',
  sizes: Record<string, { w: number; h: number }> = {},
): Scene {
  const detailed = detail !== 'contexts';
  // The deepest level: every API surfaces as a container with its operations,
  // and its containment in the host system becomes a "publicada por" edge.
  const operationsLevel = detail === 'operations';
  const externalIds = new Set(model.externalSystems.map((x) => x.id));
  const nestedApis = (model.apis ?? []).filter(
    (a) => a.publishedByExternalSystemId && externalIds.has(a.publishedByExternalSystemId),
  );
  const nestedApiIds = new Set(nestedApis.map((a) => a.id));
  const nestedProxies = (model.proxyApis ?? []).filter(
    (px) => px.publishedByExternalSystemId && externalIds.has(px.publishedByExternalSystemId),
  );
  const nestedProxyIds = new Set(nestedProxies.map((px) => px.id));
  const allNodes = [
    ...model.modules.map((m) => ({ ref: m, external: false, api: false, proxy: false })),
    ...model.externalSystems.map((e) => ({ ref: e, external: true, api: false, proxy: false })),
    ...(model.apis ?? [])
      .filter((a) => !nestedApiIds.has(a.id))
      .map((a) => ({ ref: a, external: false, api: true, proxy: false })),
    ...(model.proxyApis ?? [])
      .filter((px) => !nestedProxyIds.has(px.id))
      .map((px) => ({ ref: px, external: false, api: false, proxy: true })),
    ...(model.workflows ?? []).map((w) => ({
      ref: w,
      external: false,
      api: false,
      proxy: false,
      workflow: true,
    })),
  ];

  const nodes: SceneNode[] = allNodes.flatMap((entry, i) => {
    const pos = layout[entry.ref.id] ?? defaultPosition(i, allNodes.length);
    if ('workflow' in entry && entry.workflow) {
      const w = entry.ref as NonNullable<ModuxModel['workflows']>[number];
      return [{
        id: w.id,
        label: w.name,
        kind: 'workflow',
        symbol: 'process',
        fill: '#ede9fe',
        stroke: '#6d28d9',
        dashed: true,
        badge: 'WORKFLOW',
        tooltip: `${w.name} — workflow${w.triggerEvent ? ` · arranca con ${w.triggerEvent}` : ''}`,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
      }];
    }
    if (entry.proxy) {
      const px = entry.ref as NonNullable<ModuxModel['proxyApis']>[number];
      const base: Omit<SceneNode, 'x' | 'y' | 'w' | 'h'> = {
        id: px.id,
        label: px.name,
        kind: 'proxy-api',
        symbol: 'interface',
        fill: '#ecfeff',
        stroke: '#0e7490',
        badge: 'PROXY API',
        tooltip: `${px.name} — proxy/cache de una API, consumible como ella`,
      };
      // The deepest level unfolds the proxy too: its surface IS the fronted API, so its
      // operation OCCURRENCES nest inside — future arrows will route each one to the
      // published API or to a bounded-context implementation.
      if (operationsLevel && px.targetApiId) {
        const target = (model.apis ?? []).find((a) => a.id === px.targetApiId);
        const ops = target?.operations ?? [];
        if (ops.length > 0) {
          return detailedContainer(
            pos,
            base,
            ops.map((op): ChildDesc => ({
              id: apiOpOccurrenceId(op.id, px.id),
              name: op.name,
              kind: 'api-op-occurrence',
            })),
            layout,
            sizes,
          );
        }
      }
      return [{ ...base, x: pos.x, y: pos.y, w: NODE_W, h: NODE_H }];
    }
    if (entry.api) {
      const a = entry.ref as NonNullable<ModuxModel['apis']>[number];
      const base: Omit<SceneNode, 'x' | 'y' | 'w' | 'h'> = {
        id: a.id,
        label: a.name,
        kind: 'api',
        symbol: 'interface',
        fill: '#eef2ff',
        stroke: '#4f46e5',
        badge: 'API',
        tooltip: `${a.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
      };
      if (detailed && a.operations.length > 0) {
        return detailedContainer(
          pos,
          base,
          a.operations.map(
            (op): ChildDesc => ({ id: op.id, name: op.name, kind: 'api-operation' }),
          ),
          layout,
          sizes,
        );
      }
      return [{ ...base, x: pos.x, y: pos.y, w: NODE_W, h: NODE_H }];
    }
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
      // Published APIs are strategic-level elements: they nest visibly at EVERY
      // detail level, while operations and tables only unfold in detailed mode.
      const publishedApis = nestedApis.filter((a) => a.publishedByExternalSystemId === x.id);
      const hostedProxies = nestedProxies.filter((px) => px.publishedByExternalSystemId === x.id);
      const plainChildren: ChildDesc[] = [
        ...hostedProxies.map((px): ChildDesc => ({ id: px.id, name: px.name, kind: 'proxy-api' })),
        ...(detailed
          ? [
              ...(x.useCases ?? []).map(
                (u): ChildDesc => ({ id: u.id, name: u.name, kind: 'external-use-case' }),
              ),
              ...(x.tables ?? []).map(
                (t): ChildDesc => ({ id: t.id, name: t.name, kind: 'external-table' }),
              ),
              ...(x.mcpServers ?? []).map(
                (s): ChildDesc => ({ id: s.id, name: s.name, kind: 'mcp-server' }),
              ),
            ]
          : []),
      ];
      const unfoldableProxies = operationsLevel
        ? hostedProxies.filter((px) => {
            const target = px.targetApiId
              ? (model.apis ?? []).find((a) => a.id === px.targetApiId)
              : undefined;
            return (target?.operations ?? []).length > 0;
          })
        : [];
      if (operationsLevel && (publishedApis.length > 0 || unfoldableProxies.length > 0)) {
        // The deepest level nests twice: the system wraps each API's (and hosted
        // proxy's) own container, which in turn wraps its operations. A hosted
        // proxy's surface IS its fronted API, so it unfolds operation OCCURRENCES.
        const boxes: ApiBoxDesc[] = [
          ...publishedApis.map((a): ApiBoxDesc => ({
            id: a.id,
            name: a.name,
            kind: 'api',
            badge: 'API',
            fill: '#eef2ff',
            stroke: '#4f46e5',
            tooltip: `${a.name} — API publicada por ${x.name}`,
            opKind: 'api-operation',
            ops: (a.operations ?? []).map((op) => ({ id: op.id, name: op.name })),
          })),
          ...unfoldableProxies.map((px): ApiBoxDesc => {
            const target = (model.apis ?? []).find((a) => a.id === px.targetApiId)!;
            return {
              id: px.id,
              name: px.name,
              kind: 'proxy-api',
              badge: 'PROXY API',
              fill: '#ecfeff',
              stroke: '#0e7490',
              tooltip: `${px.name} — proxy/cache de ${target.name}`,
              opKind: 'api-op-occurrence',
              ops: (target.operations ?? []).map((op) => ({
                id: apiOpOccurrenceId(op.id, px.id),
                name: op.name,
              })),
            };
          }),
        ];
        const unfoldedIds = new Set(unfoldableProxies.map((px) => px.id));
        return containerWithApiBoxes(
          pos, base, boxes, plainChildren.filter((c) => !unfoldedIds.has(c.id)), layout, sizes,
        );
      }
      const children: ChildDesc[] = [
        ...publishedApis.map((a): ChildDesc => ({ id: a.id, name: a.name, kind: 'api' })),
        ...plainChildren,
      ];
      if (children.length > 0) {
        return detailedContainer(pos, base, children, layout, sizes);
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
    if (detailed) return detailedContext(model, m, pos, base, layout, sizes, operationsLevel);
    // Implemented APIs are strategic-level: they nest inside the context at EVERY
    // detail level, exactly like a published API nests inside its external system.
    const implChildren = apiImplChildren(model, m.id);
    if (implChildren.length > 0) {
      return detailedContainer(pos, base, implChildren, layout, sizes);
    }
    return [{ ...base, x: pos.x, y: pos.y, w: NODE_W, h: NODE_H }];
  });
  // Business actors, AI agents, knowledge bases and MCP gateways live outside every context.
  const totalTop =
    allNodes.length +
    (model.actors ?? []).length +
    (model.aiAgents ?? []).length +
    (model.rags ?? []).length +
    (model.mcpGateways ?? []).length;
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
  (model.aiAgents ?? []).forEach((a, i) => {
    const pos =
      layout[a.id] ??
      defaultPosition(allNodes.length + (model.actors ?? []).length + i, totalTop);
    nodes.push({
      id: a.id,
      label: a.name,
      x: pos.x,
      y: pos.y,
      w: 132,
      h: 48,
      kind: 'ai-agent',
      symbol: 'robot',
      fill: a.external ? '#ffffff' : '#faf5ff',
      stroke: '#9333ea',
      dashed: !!a.external,
      badge: a.external ? 'AGENTE IA EXT.' : 'AGENTE IA',
      tooltip: a.external
        ? `${a.name} (agente de IA externo — entra por un gateway MCP)`
        : `${a.name} (agente de IA — consume por MCP)`,
    });
  });
  (model.mcpGateways ?? []).forEach((g, i) => {
    const pos =
      layout[g.id] ??
      defaultPosition(
        allNodes.length +
          (model.actors ?? []).length +
          (model.aiAgents ?? []).length +
          (model.rags ?? []).length +
          i,
        totalTop,
      );
    nodes.push({
      id: g.id,
      label: g.name,
      x: pos.x,
      y: pos.y,
      w: 148,
      h: 48,
      kind: 'mcp-gateway',
      symbol: 'plug',
      fill: '#f5f3ff',
      stroke: '#7c3aed',
      badge: 'GATEWAY MCP',
      tooltip: `${g.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`,
    });
  });
  const ragContentEdges: SceneEdge[] = [];
  (model.rags ?? []).forEach((r, i) => {
    const pos =
      layout[r.id] ??
      defaultPosition(
        allNodes.length + (model.actors ?? []).length + (model.aiAgents ?? []).length + i,
        totalTop,
      );
    nodes.push({
      id: r.id,
      label: r.name,
      x: pos.x,
      y: pos.y,
      w: 132,
      h: 48,
      kind: 'rag',
      symbol: 'lens',
      fill: '#ecfeff',
      stroke: '#0e7490',
      badge: 'RAG',
      tooltip: `${r.name} (base de conocimiento — retrieval para agentes)`,
    });
    // External content sources hang as small satellites (repo, web, ftp…).
    (r.contentSources ?? []).forEach((s, si) => {
      const satelliteId = `ragcs:${r.id}:${s.uri}`;
      const satPos = layout[satelliteId] ?? { x: pos.x + 170, y: pos.y - 30 + si * 44 };
      nodes.push({
        id: satelliteId,
        label: s.uri.replace(/^[a-z+]+:\/\//, '').slice(0, 24),
        x: satPos.x,
        y: satPos.y,
        w: 150,
        h: 34,
        kind: 'rag-content-source',
        fill: '#ffffff',
        stroke: '#0e7490',
        dashed: true,
        badge: s.type,
        tooltip: `${s.type}: ${s.uri}`,
      });
      ragContentEdges.push({
        id: `ragcse:${r.id}:${s.uri}`,
        sourceId: satelliteId,
        targetId: r.id,
        kind: 'rag-content',
        color: '#0e7490',
        dashed: true,
        arrow: true,
        tooltip: 'alimenta el índice',
      });
    });
  });
  // Children must paint over every container, not just their own.
  nodes.sort((a, b) => (a.parentId ? 1 : 0) - (b.parentId ? 1 : 0));

  // Relations are 100% derived from concrete dependencies; the type is an annotation.
  const relationEdges: SceneEdge[] = model.relations.map((r) => ({
    id: relationEdgeId(r.sourceId, r.targetId),
    sourceId: r.sourceId,
    targetId: r.targetId,
    kind: 'relation',
    label: r.type ? RELATION_ABBREV[r.type] : '?',
    color: r.declared ? '#475569' : '#94a3b8',
    dashed: !r.declared,
    arrow: true,
    tooltip: r.type
      ? `${r.type} (${r.sourceId} upstream → ${r.targetId} downstream)${r.reasons ? ` — ${r.reasons}` : ''}`
      : `Relación derivada — doble click para elegir el patrón${r.reasons ? ` — ${r.reasons}` : ''}`,
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

  // API implementation sites (the SAME published API, also implemented in bounded
  // contexts): the occurrences nest INSIDE their context above; here only the list
  // survives, feeding the proxy-routing edges below.
  const implApiIds = new Map((model.apis ?? []).map((a) => [a.id, a]));
  const implModuleIds = new Set(model.modules.map((m) => m.id));
  const implEntries = (model.apiImplementations ?? []).filter(
    (impl) => implApiIds.has(impl.apiId) && implModuleIds.has(impl.moduleId),
  );

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

  // Aggregate-state projections (aggregate → read model, possibly cross-context),
  // visible at the detail level where both render as children.
  const projectionEdges: SceneEdge[] = detailed
    ? (model.projections ?? [])
        .map((p) => ({
          p,
          source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId,
        }))
        .filter(({ p, source }) => source && p.readModelId)
        .filter(({ p, source }) => nodeIds.has(source!) && nodeIds.has(p.readModelId!))
        .map(({ p, source }) => ({
          id: `proj:${p.id}`,
          sourceId: source!,
          targetId: p.readModelId!,
          kind: 'projection',
          color: '#0d9488',
          dashed: true,
          arrow: true,
          tooltip: p.sourceAggregateId
            ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}`
            : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`,
        }))
    : [];

  // API operations wired to their implementers: operation chip → use case/policy at
  // the detail level; at the contexts level the API box points at the module.
  const apiWireEdges: SceneEdge[] = (model.apis ?? []).flatMap((api) =>
    api.operations.flatMap((op) => {
      const target =
        detailed && op.targetUseCaseId && nodeIds.has(op.targetUseCaseId)
          ? op.targetUseCaseId
          : op.targetModuleId && nodeIds.has(op.targetModuleId)
            ? op.targetModuleId
            : op.targetUseCaseId && !detailed
              ? null // fine wiring is invisible at the contexts level unless a module is set
              : null;
      if (!target) return [];
      // Global wiring always paints from the operation AS PUBLISHED (per-site wiring —
      // apiOperationImplementations — carries its own site and paints from there).
      const source = detailed && nodeIds.has(op.id) ? op.id : api.id;
      if (!nodeIds.has(source)) return [];
      return [
        {
          id: `apiwire:${op.id}`,
          sourceId: source,
          targetId: target,
          kind: 'api-wire',
          color: '#4f46e5',
          dashed: true,
          arrow: true,
          tooltip: `${op.name} la implementa ${target}`,
        },
      ];
    }),
  );

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

  const actorExternalEdges: SceneEdge[] = (model.actorExternalDependencies ?? [])
    .filter((d) => nodeIds.has(d.actorId) && nodeIds.has(d.externalSystemId))
    .map((d) => ({
      id: `extdep:${d.actorId}->${d.externalSystemId}`,
      sourceId: d.actorId,
      targetId: d.externalSystemId,
      kind: 'actor-ext',
      color: '#64748b',
      dashed: true,
      arrow: true,
      tooltip: 'depende de',
    }));

  // A dependency on a nested API/proxy that is hidden at this detail level rolls
  // up to the system hosting it (depending on it implies depending on the host).
  const apiPublisher = new Map([
    ...(model.apis ?? [])
      .filter((a) => a.publishedByExternalSystemId)
      .map((a): [string, string] => [a.id, a.publishedByExternalSystemId!]),
    ...(model.proxyApis ?? [])
      .filter((px) => px.publishedByExternalSystemId)
      .map((px): [string, string] => [px.id, px.publishedByExternalSystemId!]),
  ]);
  const rollUp = (id: string) => (nodeIds.has(id) ? id : (apiPublisher.get(id) ?? id));
  const externalDependencyEdges: SceneEdge[] = [
    ...new Map(
      (model.externalSystemDependencies ?? [])
        .map((d) => ({
          sourceId: d.sourceId,
          targetId: rollUp(d.targetId),
          cqrs: d.type === 'CQRS',
        }))
        .filter(
          (d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId) && d.sourceId !== d.targetId,
        )
        .map((d): [string, SceneEdge] => [
          `xdep:${d.sourceId}->${d.targetId}`,
          {
            id: `xdep:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'ext-dep',
            color: d.cqrs ? '#7c3aed' : '#64748b',
            label: d.cqrs ? 'CQRS' : 'dep',
            dashed: true,
            arrow: true,
            tooltip: d.cqrs ? 'CQRS — consulta sobre sus datos' : 'depende de',
          },
        ]),
    ).values(),
  ];
  // Workflows on the strategic map: what they orchestrate and what fires them.
  // A hidden child (use case / event at the coarse level) rolls up to its context.
  const moduleOfChild = new Map<string, string>();
  for (const m of model.modules) {
    for (const u of m.useCases ?? []) moduleOfChild.set(u.id, m.id);
    for (const ev of m.domainEvents ?? []) moduleOfChild.set(ev.id, m.id);
    for (const ev of m.applicationEvents ?? []) moduleOfChild.set(ev.id, m.id);
  }
  const rollUpChild = (id: string) => (nodeIds.has(id) ? id : (moduleOfChild.get(id) ?? id));
  const eventIdByName = new Map<string, string>();
  for (const m of model.modules) {
    for (const ev of m.domainEvents ?? []) eventIdByName.set(ev.name, ev.id);
    for (const ev of m.applicationEvents ?? []) eventIdByName.set(ev.name, ev.id);
  }
  const workflowCallEdges: SceneEdge[] = [
    ...new Map(
      (model.workflows ?? [])
        .flatMap((w) =>
          (w.steps ?? [])
            .filter((st) => st.targetUseCaseId)
            .map((st) => ({ sourceId: w.id, targetId: rollUpChild(st.targetUseCaseId!) })),
        )
        .filter((d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId))
        .map((d): [string, SceneEdge] => [
          `wfcall:${d.sourceId}->${d.targetId}`,
          {
            id: `wfcall:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'wf-call',
            color: '#7c3aed',
            dashed: true,
            arrow: true,
            tooltip: 'orquesta',
          },
        ]),
    ).values(),
  ];
  const workflowTriggerEdges: SceneEdge[] = [
    ...new Map(
      (model.workflows ?? [])
        .filter((w) => w.triggerEvent && eventIdByName.has(w.triggerEvent))
        .map((w) => ({
          sourceId: rollUpChild(eventIdByName.get(w.triggerEvent!)!),
          targetId: w.id,
          label: w.triggerEvent!,
        }))
        .filter((d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId))
        .map((d): [string, SceneEdge] => [
          `wftrig:${d.sourceId}->${d.targetId}`,
          {
            id: `wftrig:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'wf-trigger',
            color: '#f59e0b',
            label: d.label,
            dashed: true,
            arrow: true,
            tooltip: 'dispara el workflow',
          },
        ]),
    ).values(),
  ];

  // RAG → structured sources beyond read models: external tables (chips only in
  // detailed mode — they roll up to their system) and APIs (always visible).
  const tableSystem = new Map<string, string>();
  for (const x of model.externalSystems) {
    for (const t of x.tables ?? []) tableSystem.set(t.id, x.id);
  }
  const ragTableEdges: SceneEdge[] = [
    ...new Map(
      (model.rags ?? [])
        .flatMap((r) =>
          (r.sourceExternalTableIds ?? []).map((tid) => ({
            sourceId: nodeIds.has(tid) ? tid : (tableSystem.get(tid) ?? tid),
            targetId: r.id,
            name: r.name,
          })),
        )
        .filter((d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId))
        .map((d): [string, SceneEdge] => [
          `ragtbl:${d.sourceId}->${d.targetId}`,
          {
            id: `ragtbl:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'rag-table',
            color: '#0e7490',
            dashed: true,
            arrow: true,
            tooltip: `${d.name} indexa esta tabla`,
          },
        ]),
    ).values(),
  ];
  const ragApiEdges: SceneEdge[] = [
    ...new Map(
      (model.rags ?? [])
        .flatMap((r) =>
          (r.sourceApiIds ?? []).map((aid) => ({
            sourceId: rollUp(aid),
            targetId: r.id,
            name: r.name,
          })),
        )
        .filter((d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId))
        .map((d): [string, SceneEdge] => [
          `ragapi:${d.sourceId}->${d.targetId}`,
          {
            id: `ragapi:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'rag-api',
            color: '#0e7490',
            dashed: true,
            arrow: true,
            tooltip: `${d.name} indexa el contenido de esta API`,
          },
        ]),
    ).values(),
  ];

  // RAG → coarse sources: a whole external system or a whole context.
  const ragCoarseEdges: SceneEdge[] = [
    ...new Map(
      (model.rags ?? [])
        .flatMap((r) => [
          ...(r.sourceExternalSystemIds ?? []).map((xid) => ({ sourceId: xid, targetId: r.id, name: r.name })),
          ...(r.sourceModuleIds ?? []).map((mid) => ({ sourceId: mid, targetId: r.id, name: r.name })),
        ])
        .filter((d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId))
        .map((d): [string, SceneEdge] => [
          `ragcoarse:${d.sourceId}->${d.targetId}`,
          {
            id: `ragcoarse:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'rag-coarse',
            color: '#0e7490',
            dashed: true,
            arrow: true,
            tooltip: `${d.name} indexa su contenido`,
          },
        ]),
    ).values(),
  ];

  // Agent → whole API (or proxy): its full tool surface, at every detail level.
  const agentApiEdges: SceneEdge[] = [
    ...new Map(
      (model.agentApiUses ?? [])
        .map((u) => ({ sourceId: u.agentId, targetId: rollUp(u.apiId) }))
        .filter((d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId))
        .map((d): [string, SceneEdge] => [
          `agapi:${d.sourceId}->${d.targetId}`,
          {
            id: `agapi:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'agent-api',
            color: '#9333ea',
            dashed: true,
            arrow: true,
            tooltip: 'consume la API entera como herramienta',
          },
        ]),
    ).values(),
  ];

  // Workflow chaining: A's completion event is B's trigger — drawn directly.
  const completionOf = (w: NonNullable<ModuxModel['workflows']>[number]) =>
    w.onCompletionEventName || `${w.name.replace(/\s+/g, '')}Completado`;
  const workflowChainEdges: SceneEdge[] = (model.workflows ?? []).flatMap((b) =>
    !b.triggerEvent
      ? []
      : (model.workflows ?? [])
          .filter((a) => a.id !== b.id && completionOf(a) === b.triggerEvent)
          .filter((a) => nodeIds.has(a.id) && nodeIds.has(b.id))
          .map((a) => ({
            id: `wfchain:${a.id}->${b.id}`,
            sourceId: a.id,
            targetId: b.id,
            kind: 'wf-chain',
            color: '#f59e0b',
            label: b.triggerEvent!,
            dashed: true,
            arrow: true,
            tooltip: 'su evento final dispara este workflow',
          })),
  );

  // The proxy → API wiring: teal, at every detail level, endpoints roll up too.
  const proxyTargetEdges: SceneEdge[] = [
    ...new Map(
      (model.proxyApis ?? [])
        .filter((px) => px.targetApiId)
        .map((px) => ({ sourceId: rollUp(px.id), targetId: rollUp(px.targetApiId!) }))
        .filter(
          (d) => nodeIds.has(d.sourceId) && nodeIds.has(d.targetId) && d.sourceId !== d.targetId,
        )
        .map((d): [string, SceneEdge] => [
          `pxt:${d.sourceId}->${d.targetId}`,
          {
            id: `pxt:${d.sourceId}->${d.targetId}`,
            sourceId: d.sourceId,
            targetId: d.targetId,
            kind: 'proxy-target',
            color: '#0e7490',
            dashed: true,
            arrow: true,
            tooltip: 'proxy/cache de',
          },
        ]),
    ).values(),
  ];

  // API implementation wiring: the occurrence nests in its bounded context (that IS the
  // "implemented here"), and every proxy fronting that API also routes to it (teal, like
  // the proxy → published-API edge).
  const apiImplEdges: SceneEdge[] = implEntries.flatMap((impl) => {
    const nid = apiImplNodeId(impl.apiId, impl.moduleId);
    if (!nodeIds.has(nid)) return [];
    const edges: SceneEdge[] = [];
    for (const px of (model.proxyApis ?? []).filter((p) => p.targetApiId === impl.apiId)) {
      const sid = rollUp(px.id);
      if (nodeIds.has(sid) && sid !== nid) {
        edges.push({
          id: `pxr:${sid}->${nid}`,
          sourceId: sid,
          targetId: nid,
          kind: 'proxy-route',
          color: '#0e7490',
          dashed: true,
          arrow: true,
          tooltip: 'enruta también a',
        });
      }
    }
    return edges;
  });

  // Per-operation routing: a proxy operation occurrence → the implementation SITE it is
  // served from (the published API node, or the api-impl occurrence in a context). Only
  // paintable at the operations level, where the source chips exist.
  const opRouteEdges: SceneEdge[] = (model.proxyOperationRoutes ?? []).flatMap((r) => {
    const px = (model.proxyApis ?? []).find((p) => p.id === r.proxyId);
    if (!px?.targetApiId) return [];
    const sourceId = apiOpOccurrenceId(r.operationId, r.proxyId);
    const targetNodeId =
      r.targetSiteId === px.targetApiId
        ? px.targetApiId
        : apiImplNodeId(px.targetApiId, r.targetSiteId);
    if (!nodeIds.has(sourceId) || !nodeIds.has(targetNodeId)) return [];
    return [{
      id: `oproute:${sourceId}->${targetNodeId}`,
      sourceId,
      targetId: targetNodeId,
      kind: 'op-route',
      color: '#0e7490',
      arrow: true,
      tooltip: 'enruta esta operación a',
    }];
  });

  // External system → a specific API operation. Precise chip when visible (operations
  // level); coarser levels roll up to the operation's SITE (published API, proxy or the
  // implementation occurrence), all of which render at every level.
  const extOpUseEdges: SceneEdge[] = [
    ...new Map(
      (model.externalOperationUses ?? [])
        .map((u) => {
          if (!nodeIds.has(u.externalSystemId)) return null;
          const owningApi = (model.apis ?? []).find((a) =>
            a.operations.some((o) => o.id === u.operationId),
          );
          if (!owningApi) return null;
          const isPublishedSite = u.siteId === owningApi.id;
          const precise = isPublishedSite
            ? u.operationId
            : apiOpOccurrenceId(u.operationId, u.siteId);
          let target: string | null = nodeIds.has(precise) ? precise : null;
          if (!target) {
            if (isPublishedSite || (model.proxyApis ?? []).some((p) => p.id === u.siteId)) {
              target = rollUp(u.siteId);
            } else {
              target = apiImplNodeId(owningApi.id, u.siteId);
            }
          }
          if (!target || !nodeIds.has(target) || target === u.externalSystemId) return null;
          return { u, target };
        })
        .filter((d): d is NonNullable<typeof d> => d !== null)
        .map((d): [string, SceneEdge] => [
          `extopuse:${d.u.externalSystemId}->${d.u.operationId}@${d.u.siteId}`,
          {
            id: `extopuse:${d.u.externalSystemId}->${d.u.operationId}@${d.u.siteId}`,
            sourceId: d.u.externalSystemId,
            targetId: d.target,
            kind: 'ext-op-use',
            color: '#64748b',
            label: 'op',
            dashed: true,
            arrow: true,
            tooltip: 'llama a esta operación',
          },
        ]),
    ).values(),
  ];

  // Per-site wiring: the operation AT a site (a bounded-context implementation, or a
  // proxy) → the use case serving it there (which may live in any context). Source: the
  // occurrence chip when unfolded, else the site's own node (impl chip / proxy, rolled
  // up to its host when folded away).
  const apiOpImplWireEdges: SceneEdge[] = detailed
    ? (model.apiOperationImplementations ?? []).flatMap((w) => {
        if (!nodeIds.has(w.useCaseId)) return [];
        const source = nodeIds.has(apiOpOccurrenceId(w.operationId, w.moduleId))
          ? apiOpOccurrenceId(w.operationId, w.moduleId)
          : nodeIds.has(apiImplNodeId(w.apiId, w.moduleId))
            ? apiImplNodeId(w.apiId, w.moduleId)
            : nodeIds.has(rollUp(w.moduleId))
              ? rollUp(w.moduleId)
              : null;
        if (!source) return [];
        return [{
          id: `apiimplwire:${w.operationId}@${w.moduleId}`,
          sourceId: source,
          targetId: w.useCaseId,
          kind: 'api-impl-wire',
          color: '#4f46e5',
          dashed: true,
          arrow: true,
          tooltip: 'implementada aquí por',
        }];
      })
    : [];

  const agentUseEdges: SceneEdge[] = detailed
    ? (model.agentUses ?? [])
        .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.useCaseId))
        .map((u) => ({
          id: `mcp:${u.agentId}->${u.useCaseId}`,
          sourceId: u.agentId,
          targetId: u.useCaseId,
          kind: 'agent-use',
          color: '#9333ea',
          dashed: true,
          arrow: true,
          tooltip: 'consume por MCP (exposedAsMcp)',
        }))
    : [];
  // Agent → knowledge base, and knowledge base → the read models it indexes.
  // RAGs and agents are top-level, so these edges show at BOTH detail levels
  // (the rag → read model one needs the chip, hence detailed only).
  const agentRagEdges: SceneEdge[] = (model.agentRags ?? [])
    .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.ragId))
    .map((u) => ({
      id: `agrag:${u.agentId}->${u.ragId}`,
      sourceId: u.agentId,
      targetId: u.ragId,
      kind: 'agent-rag',
      color: '#0e7490',
      dashed: true,
      arrow: true,
      tooltip: 'consulta la base de conocimiento (retrieval)',
    }));
  const ragSourceEdges: SceneEdge[] = detailed
    ? (model.rags ?? [])
        .filter((r) => nodeIds.has(r.id))
        .flatMap((r) =>
          (r.sourceReadModelIds ?? [])
            .filter((rmId) => nodeIds.has(rmId))
            .map((rmId) => ({
              id: `ragsrc:${r.id}->${rmId}`,
              sourceId: r.id,
              targetId: rmId,
              kind: 'rag-source',
              color: '#0e7490',
              dashed: true,
              arrow: true,
              tooltip: `${r.name} indexa este read model`,
            })),
        )
    : [];
  const agentExternalUseEdges: SceneEdge[] = detailed
    ? (model.agentExternalUses ?? [])
        .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.externalUseCaseId))
        .map((u) => ({
          id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
          sourceId: u.agentId,
          targetId: u.externalUseCaseId,
          kind: 'agent-external-use',
          color: '#9333ea',
          dashed: true,
          arrow: true,
          tooltip: 'llama a la operación del sistema externo',
        }))
    : [];
  const agentMcpEdges: SceneEdge[] = detailed
    ? (model.agentMcpUses ?? [])
        .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.mcpServerId))
        .map((u) => ({
          id: `mcpsv:${u.agentId}->${u.mcpServerId}`,
          sourceId: u.agentId,
          targetId: u.mcpServerId,
          kind: 'agent-mcp',
          color: '#9333ea',
          dashed: true,
          arrow: true,
          tooltip: 'consume las herramientas del servidor MCP',
        }))
    : [];
  // Gateway exposures: whatever the gateway aggregates/exposes, when visible.
  const gatewayExposureEdges: SceneEdge[] = (model.mcpGateways ?? []).flatMap((g) =>
    [
      ...(g.mcpServerIds ?? []),
      ...(g.apiIds ?? []),
      ...(g.apiOperationIds ?? []),
      ...(g.useCaseIds ?? []),
      ...(g.ragIds ?? []),
    ]
      .filter((target) => nodeIds.has(g.id) && nodeIds.has(target))
      .map((target) => ({
        id: `gwx:${g.id}->${target}`,
        sourceId: g.id,
        targetId: target,
        kind: 'gateway-exposure',
        color: '#7c3aed',
        dashed: true,
        arrow: true,
        tooltip: 'lo agrega/expone como herramienta MCP',
      })),
  );
  const agentGatewayEdges: SceneEdge[] = (model.agentGatewayUses ?? [])
    .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.gatewayId))
    .map((u) => ({
      id: `aggw:${u.agentId}->${u.gatewayId}`,
      sourceId: u.agentId,
      targetId: u.gatewayId,
      kind: 'agent-gateway',
      color: '#9333ea',
      dashed: true,
      arrow: true,
      tooltip: 'consume la superficie de herramientas del gateway MCP',
    }));
  const agentApiOpEdges: SceneEdge[] = detailed
    ? (model.agentApiOpUses ?? [])
        .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.apiOperationId))
        .map((u) => ({
          id: `agapi:${u.agentId}->${u.apiOperationId}`,
          sourceId: u.agentId,
          targetId: u.apiOperationId,
          kind: 'agent-api-op',
          color: '#9333ea',
          dashed: true,
          arrow: true,
          tooltip: 'llama a la operación de API como herramienta',
        }))
    : [];
  const agentQueryEdges: SceneEdge[] = detailed
    ? (model.agentQueryUses ?? [])
        .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.queryServiceId))
        .map((u) => ({
          id: `agqs:${u.agentId}->${u.queryServiceId}`,
          sourceId: u.agentId,
          targetId: u.queryServiceId,
          kind: 'agent-query',
          color: '#0d9488',
          dashed: true,
          arrow: true,
          tooltip: 'consulta el query service (herramienta de lectura)',
        }))
    : [];
  const agentDelegationEdges: SceneEdge[] = (model.agentDelegations ?? [])
    .filter((u) => nodeIds.has(u.agentId) && nodeIds.has(u.delegateAgentId))
    .map((u) => ({
      id: `agag:${u.agentId}->${u.delegateAgentId}`,
      sourceId: u.agentId,
      targetId: u.delegateAgentId,
      kind: 'agent-delegate',
      color: '#9333ea',
      arrow: true,
      tooltip: 'delega trabajo en el otro agente',
    }));
  const actorAgentEdges: SceneEdge[] = (model.actorAgentUses ?? [])
    .filter((u) => nodeIds.has(u.actorId) && nodeIds.has(u.agentId))
    .map((u) => ({
      id: `useag:${u.actorId}->${u.agentId}`,
      sourceId: u.actorId,
      targetId: u.agentId,
      kind: 'actor-agent',
      color: '#6366f1',
      arrow: true,
      tooltip: 'habla con el agente (deriva una UI de chat/supervisión)',
    }));
  const agentTriggerEdges: SceneEdge[] = detailed
    ? (model.agentTriggers ?? [])
        .filter((u) => nodeIds.has(u.eventId) && nodeIds.has(u.agentId))
        .map((u) => ({
          id: `evag:${u.eventId}->${u.agentId}`,
          sourceId: u.eventId,
          targetId: u.agentId,
          kind: 'agent-trigger',
          color: '#f59e0b',
          dashed: true,
          arrow: true,
          tooltip: 'el evento dispara una ejecución del agente (agente reactivo)',
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
      ...projectionEdges,
      ...apiWireEdges,
      ...callEdges,
      ...queryEdges,
      ...actorUseEdges,
      ...actorExternalEdges,
      ...externalDependencyEdges,
      ...proxyTargetEdges,
      ...apiImplEdges,
      ...opRouteEdges,
      ...extOpUseEdges,
      ...apiOpImplWireEdges,
      ...workflowCallEdges,
      ...workflowTriggerEdges,
      ...workflowChainEdges,
      ...agentApiEdges,
      ...ragTableEdges,
      ...ragApiEdges,
      ...ragCoarseEdges,
      ...agentUseEdges,
      ...agentExternalUseEdges,
      ...agentMcpEdges,
      ...gatewayExposureEdges,
      ...agentGatewayEdges,
      ...agentApiOpEdges,
      ...agentQueryEdges,
      ...agentDelegationEdges,
      ...actorAgentEdges,
      ...agentTriggerEdges,
      ...agentRagEdges,
      ...ragSourceEdges,
      ...ragContentEdges,
      ...externalCallEdges,
      ...externalUcCallEdges,
    ],
  };
}
