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

/** Canvas id of an API-implementation occurrence (same ApiRef, one node per site). */
export function apiImplNodeId(apiId: string, boundedContextId: string): string {
  return `apiimpl:${apiId}@${boundedContextId}`;
}

/** Canvas id of an operation occurrence at a SITE (a proxy or a bounded context). */
export function apiOpOccurrenceId(operationId: string, siteId: string): string {
  return `apiop:${operationId}@${siteId}`;
}

/**
 * The three forms a container node can take, ranked by how much it reveals. The level
 * picks the default; the chevron toggles to the OTHER meaningful form: from `full` it
 * folds everything away, from `compact` it unfolds everything the level supports, and
/**
 * API-implementation occurrences of a bounded context (the SAME ApiRef the external
 * system publishes, so the box looks exactly like the API at its publisher; only the
 * site differs).
 */
function apiImplChildren(model: ModuxModel, boundedContextId: string): ChildDesc[] {
  const apiById = new Map((model.apis ?? []).map((a) => [a.id, a]));
  return (model.apiImplementations ?? [])
    .filter((impl) => impl.boundedContextId === boundedContextId && apiById.has(impl.apiId))
    .map((impl): ChildDesc => ({
      id: apiImplNodeId(impl.apiId, impl.boundedContextId),
      name: apiById.get(impl.apiId)!.name,
      kind: 'api-impl',
    }));
}

/** The operations a proxy fronts (those of its target API). */
function proxyOps(
  model: ModuxModel,
  px: NonNullable<ModuxModel['proxyApis']>[number],
): { id: string; name: string }[] {
  const target = px.targetApiId ? (model.apis ?? []).find((a) => a.id === px.targetApiId) : undefined;
  return target?.operations ?? [];
}

// Child boxes (an element revealed by expanding its owner) are free nodes with
// their own absolute position; these are just their default dimensions.
const CHILD_W = 108;
const CHILD_H = 32;

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

/**
 * The ownership tree as a flat child → owner map, over the WHOLE model (expansion
 * ignored). The editor migrates pre-Archi sheets with it: child positions stored
 * as offsets from their container become absolute by walking this chain.
 */
export function ownershipIndex(
  model: ModuxModel,
  mode: 'unified' | 'distribution' = 'unified',
): Map<string, string> {
  const owners = new Map<string, string>();
  if (mode === 'distribution') {
    for (const m of model.boundedContexts) {
      const modules = (model.modules ?? []).filter((cm) => cm.boundedContextId === m.id);
      if (modules.length <= 1) continue;
      for (const cm of modules) {
        owners.set(cm.id, m.id);
        for (const eid of cm.elementIds ?? []) owners.set(eid, cm.id);
      }
    }
    return owners;
  }
  const apiOps = (apiId: string, siteId: string | null, ownerId: string) => {
    const api = (model.apis ?? []).find((a) => a.id === apiId);
    for (const op of api?.operations ?? []) {
      owners.set(siteId ? apiOpOccurrenceId(op.id, siteId) : op.id, ownerId);
    }
  };
  for (const m of model.boundedContexts) {
    for (const d of boundedContextElementDescs(model, m)) owners.set(d.id, m.id);
    for (const impl of apiImplChildren(model, m.id)) {
      owners.set(impl.id, m.id);
      const parsed = /^apiimpl:(.+)@(.+)$/.exec(impl.id);
      if (parsed) apiOps(parsed[1], parsed[2], impl.id);
    }
  }
  for (const x of model.externalSystems) {
    if (x.parentExternalSystemId) owners.set(x.id, x.parentExternalSystemId);
    for (const u of x.useCases ?? []) owners.set(u.id, x.id);
    for (const t of x.tables ?? []) owners.set(t.id, x.id);
    for (const sv of x.mcpServers ?? []) owners.set(sv.id, x.id);
  }
  for (const a of model.apis ?? []) {
    if (a.publishedByExternalSystemId) owners.set(a.id, a.publishedByExternalSystemId);
    apiOps(a.id, null, a.id);
  }
  for (const px of model.proxyApis ?? []) {
    if (px.publishedByExternalSystemId) owners.set(px.id, px.publishedByExternalSystemId);
    if (px.targetApiId) apiOps(px.targetApiId, px.id, px.id);
  }
  return owners;
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
    | 'proxy-api'
    | 'scheduled-trigger'
    | 'etl-flow'
    | 'notification'
    | 'document'
    | 'ui-app'
    | 'external-system'
    | 'module';
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
  'external-system': { symbol: 'component', fill: '#ffffff', stroke: '#64748b' },
  'external-table': { symbol: 'readmodel', fill: '#fefce8', stroke: '#a16207' },
  'mcp-server': { symbol: 'robot', fill: '#faf5ff', stroke: '#9333ea' },
  'api-operation': { symbol: 'usecase', fill: '#eef2ff', stroke: '#4f46e5' },
  'api-op-occurrence': { symbol: 'usecase', fill: '#eef2ff', stroke: '#4f46e5' },
  api: { symbol: 'interface', fill: '#eef2ff', stroke: '#4f46e5' },
  'api-impl': { symbol: 'interface', fill: '#eef2ff', stroke: '#4f46e5' },
  'proxy-api': { symbol: 'interface', fill: '#ecfeff', stroke: '#0e7490' },
  'scheduled-trigger': { symbol: 'clock', fill: '#fffbeb', stroke: '#d97706' },
  'etl-flow': { symbol: 'gear', fill: '#f0fdfa', stroke: '#0f766e' },
  notification: { symbol: 'event', fill: '#fdf2f8', stroke: '#db2777' },
  document: { symbol: 'readmodel', fill: '#f8fafc', stroke: '#475569' },
  'ui-app': { symbol: 'component', fill: '#f0f9ff', stroke: '#0ea5e9' },
  module: { symbol: 'component', fill: '#ffffff', stroke: '#334155' },
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
  'external-system': 'Subsistema',
  'external-table': 'Tabla (legacy)',
  'mcp-server': 'Servidor MCP',
  'api-operation': 'Operación de API',
  'api-op-occurrence': 'Operación de la API, en este sitio',
  api: 'API publicada por este sistema',
  'api-impl': 'La misma API, implementada también en este contexto',
  'proxy-api': 'Proxy/cache de una API, alojado en este sistema',
  'scheduled-trigger': 'Trigger programado (cron) — dispara un caso de uso',
  'etl-flow': 'Integrador ETL — fuentes (pull/consumidor) → transformación → escrituras',
  notification: 'Notificación — un evento la dispara y avisa a unos roles por un canal',
  document: 'Documento/informe — plantilla rellenada por un modelo, o dataset de una consulta',
  'ui-app': 'App — la UI de este bounded context (sus páginas se detallan en la vista UI)',
  module: 'Módulo — unidad de distribución; arrastra el asa de un elemento hasta él para empaquetarlo',
};

/** Default container size that fits `childCount` boxes in a grid. */
function boundedContextElementDescs(
  model: ModuxModel,
  boundedContext: ModuxModel['boundedContexts'][number],
): ChildDesc[] {
  return [
    ...(model.aggregates ?? [])
      .filter((a) => a.boundedContextId === boundedContext.id)
      .map((a): ChildDesc => ({
        id: a.id,
        // The invariants ARE the aggregate's reason to exist: they show on the chip.
        name: (a.invariants ?? []).length ? `${a.name} ⚖${a.invariants!.length}` : a.name,
        kind: 'aggregate',
      })),
    ...(boundedContext.useCases ?? []).map(
      (u): ChildDesc => ({ id: u.id, name: u.name, kind: 'use-case', policy: u.policy }),
    ),
    ...(boundedContext.domainEvents ?? []).map(
      (ev): ChildDesc => ({ id: ev.id, name: ev.name, kind: 'domain-event' }),
    ),
    ...(boundedContext.readModels ?? []).map(
      (rm): ChildDesc => ({ id: rm.id, name: rm.name, kind: 'read-model' }),
    ),
    ...(boundedContext.domainServices ?? []).map(
      (ds): ChildDesc => ({ id: ds.id, name: ds.name, kind: 'domain-service' }),
    ),
    ...(boundedContext.applicationEvents ?? []).map(
      (ev): ChildDesc => ({ id: ev.id, name: ev.name, kind: 'application-event' }),
    ),
    ...(boundedContext.queryServices ?? []).map(
      (qs): ChildDesc => ({ id: qs.id, name: qs.name, kind: 'query-service' }),
    ),
    ...(boundedContext.scheduledTriggers ?? []).map(
      (t): ChildDesc => ({ id: t.id, name: t.name, kind: 'scheduled-trigger' }),
    ),
    ...(model.etlFlows ?? [])
      .filter((f) => f.ownerBoundedContextId === boundedContext.id)
      .map((f): ChildDesc => ({ id: f.id, name: f.name, kind: 'etl-flow' })),
    ...(model.notifications ?? [])
      .filter((n) => n.ownerBoundedContextId === boundedContext.id)
      .map((n): ChildDesc => ({ id: n.id, name: n.name, kind: 'notification' })),
    ...(model.documents ?? [])
      .filter((d) => d.ownerBoundedContextId === boundedContext.id)
      .map((d): ChildDesc => ({ id: d.id, name: d.name, kind: 'document' })),
    ...(model.uiApps ?? [])
      .filter((a) => (boundedContext.uiAppIds ?? []).includes(a.id))
      .map((a): ChildDesc => ({ id: a.id, name: a.name, kind: 'ui-app' })),
  ];
}

/**
 * A bounded context at the detail level: the boundedContext itself as a resizable
 * container plus one small box per aggregate and per use case (both hang off the
 * boundedContext — there is no aggregate→use-case link). Child positions are offsets
 * from the container centre (stored in `layout` under the child id, falling back
 * to a grid); the container size comes from `sizes`. Children are draggable and
 * become connectable once relations between them are added.
 */
export function contextMapScene(
  model: ModuxModel,
  layout: DiagramLayout,
  sizes: Record<string, { w: number; h: number }> = {},
  expandedIds: ReadonlySet<string> = new Set(),
  expandAll = false,
): Scene {
  return buildScene(model, layout, 'unified', sizes, expandedIds, expandAll);
}

/** The distribution lens: contexts as module packagers, plus services and infrastructure. */
export function distributionScene(
  model: ModuxModel,
  layout: DiagramLayout,
  sizes: Record<string, { w: number; h: number }> = {},
  expandedIds: ReadonlySet<string> = new Set(),
  expandAll = false,
): Scene {
  return buildScene(model, layout, 'distribution', sizes, expandedIds, expandAll);
}

function buildScene(
  model: ModuxModel,
  layout: DiagramLayout,
  mode: 'unified' | 'distribution',
  sizes: Record<string, { w: number; h: number }> = {},
  toggledIds: ReadonlySet<string> = new Set(),
  expandAll = false,
): Scene {
  const distributionLevel = mode === 'distribution';
  // The yugo wants the WHOLE containment tree — its own folding decides what shows.
  // Everything with children joins the set — the whole containment tree unfolds.
  if (expandAll) {
    const all = new Set(toggledIds);
    for (const m of model.boundedContexts) all.add(m.id);
    for (const x of model.externalSystems) all.add(x.id);
    for (const a of model.apis ?? []) all.add(a.id);
    for (const px of model.proxyApis ?? []) all.add(px.id);
    for (const impl of model.apiImplementations ?? []) {
      all.add(apiImplNodeId(impl.apiId, impl.boundedContextId));
    }
    for (const cm of model.modules ?? []) all.add(cm.id);
    toggledIds = all;
  }
  // Fine-grained edges always TRY to draw; the nodeIds guards roll them up or
  // drop them when their endpoints are folded away.
  const detailed = !distributionLevel;
  const externalIds = new Set(model.externalSystems.map((x) => x.id));
  const nestedApis = (model.apis ?? []).filter(
    (a) => a.publishedByExternalSystemId && externalIds.has(a.publishedByExternalSystemId),
  );
  const nestedApiIds = new Set(nestedApis.map((a) => a.id));
  const nestedProxies = (model.proxyApis ?? []).filter(
    (px) => px.publishedByExternalSystemId && externalIds.has(px.publishedByExternalSystemId),
  );
  const nestedProxyIds = new Set(nestedProxies.map((px) => px.id));
  // The distribution level narrows the cast: boundedContexts, services and infrastructure —
  // the strategic nodes (externals, APIs, workflows, floating ETLs) stay on the
  // other levels.
  // ---- the ownership tree (Archi style) ------------------------------------
  // Nodes are ALWAYS independent boxes; containment is a drawn relation (the
  // filled diamond on the owner's side). Expanding a node brings its children
  // on stage as free nodes ringed around it, tied by their composition edge.
  const apiById = new Map((model.apis ?? []).map((a) => [a.id, a]));
  const proxyById = new Map((model.proxyApis ?? []).map((px) => [px.id, px]));

  /** Direct children of an element in the ownership tree (mode-aware). */
  const ownedChildren = (id: string, kind: string): ChildDesc[] => {
    if (distributionLevel) {
      if (kind === 'boundedContext') {
        // A context with just its main module has nothing to distribute: the
        // module stays implicit and the context is the deployment target.
        const modules = (model.modules ?? []).filter((cm) => cm.boundedContextId === id);
        if (modules.length <= 1) return [];
        return modules.map((cm): ChildDesc => ({ id: cm.id, name: cm.name, kind: 'module' }));
      }
      if (kind === 'module') {
        const cm = (model.modules ?? []).find((x) => x.id === id);
        const bc = model.boundedContexts.find((m) => m.id === cm?.boundedContextId);
        if (!cm || !bc) return [];
        const byId = new Map(boundedContextElementDescs(model, bc).map((e) => [e.id, e]));
        return (cm.elementIds ?? [])
          .map((eid) => byId.get(eid))
          .filter((e): e is ChildDesc => !!e);
      }
      return [];
    }
    switch (kind) {
      case 'boundedContext': {
        const bc = model.boundedContexts.find((m) => m.id === id);
        return bc ? [...apiImplChildren(model, id), ...boundedContextElementDescs(model, bc)] : [];
      }
      case 'external-system': {
        const x = model.externalSystems.find((s) => s.id === id);
        return [
          ...model.externalSystems
            .filter((s) => s.parentExternalSystemId === id)
            .map((s): ChildDesc => ({ id: s.id, name: s.name, kind: 'external-system' })),
          ...nestedApis
            .filter((a) => a.publishedByExternalSystemId === id)
            .map((a): ChildDesc => ({ id: a.id, name: a.name, kind: 'api' })),
          ...nestedProxies
            .filter((px) => px.publishedByExternalSystemId === id)
            .map((px): ChildDesc => ({ id: px.id, name: px.name, kind: 'proxy-api' })),
          ...(x?.useCases ?? []).map(
            (u): ChildDesc => ({ id: u.id, name: u.name, kind: 'external-use-case' }),
          ),
          ...(x?.tables ?? []).map(
            (t): ChildDesc => ({ id: t.id, name: t.name, kind: 'external-table' }),
          ),
          ...(x?.mcpServers ?? []).map(
            (s): ChildDesc => ({ id: s.id, name: s.name, kind: 'mcp-server' }),
          ),
        ];
      }
      case 'api':
        return (apiById.get(id)?.operations ?? []).map(
          (op): ChildDesc => ({ id: op.id, name: op.name, kind: 'api-operation' }),
        );
      case 'api-impl': {
        const impl = /^apiimpl:(.+)@(.+)$/.exec(id);
        const api = impl ? apiById.get(impl[1]) : undefined;
        return (api?.operations ?? []).map(
          (op): ChildDesc => ({
            id: apiOpOccurrenceId(op.id, impl![2]),
            name: op.name,
            kind: 'api-op-occurrence',
          }),
        );
      }
      case 'proxy-api': {
        const px = proxyById.get(id);
        return px
          ? proxyOps(model, px).map(
              (op): ChildDesc => ({
                id: apiOpOccurrenceId(op.id, id),
                name: op.name,
                kind: 'api-op-occurrence',
              }),
            )
          : [];
      }
      default:
        return [];
    }
  };

  const nodes: SceneNode[] = [];
  const containsEdges: SceneEdge[] = [];

  /** A child born without a stored position rings around its owner. */
  const childDefault = (
    owner: { x: number; y: number },
    i: number,
    total: number,
  ): { x: number; y: number } => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(total, 1);
    const r = 160 + 12 * Math.min(total, 14);
    return { x: owner.x + r * Math.cos(angle), y: owner.y + r * Math.sin(angle) };
  };

  /** Emits the (expanded) children of an owner as free nodes plus their diamonds. */
  const emitChildren = (
    ownerId: string,
    ownerKind: string,
    ownerName: string,
    ownerPos: { x: number; y: number },
  ): void => {
    const kids = ownedChildren(ownerId, ownerKind);
    kids.forEach((k, i) => {
      const pos = layout[k.id] ?? childDefault(ownerPos, i, kids.length);
      const grand = ownedChildren(k.id, k.kind);
      const expanded = toggledIds.has(k.id) && grand.length > 0;
      const style = k.policy ? POLICY_STYLE : CHILD_STYLE[k.kind];
      const subsystem = k.kind === 'external-system';
      nodes.push({
        id: k.id,
        label: k.name,
        kind: k.kind,
        x: pos.x,
        y: pos.y,
        w: subsystem ? 150 : CHILD_W + 12,
        h: subsystem ? 44 : CHILD_H + 4,
        symbol: style.symbol,
        fill: style.fill,
        stroke: style.stroke,
        dashed: subsystem || undefined,
        ownerId,
        collapsible: grand.length > 0,
        collapsed: grand.length > 0 && !expanded,
        tooltip: `${k.policy ? 'Policy' : CHILD_TOOLTIP[k.kind]} ${k.name} — parte de ${ownerName}`,
      });
      containsEdges.push({
        id: `contains:${ownerId}->${k.id}`,
        sourceId: ownerId,
        targetId: k.id,
        kind: 'contains',
        color: '#94a3b8',
        tooltip: `${ownerName} contiene ${k.name}`,
      });
      if (expanded) emitChildren(k.id, k.kind, k.name, pos);
    });
  };

  const allNodes = [
    ...model.boundedContexts.map((m) => ({ ref: m, external: false, api: false, proxy: false })),
    ...(distributionLevel ? [] : model.externalSystems)
      // subsystems enter the stage through their parent's expansion, never top-level
      .filter((e) => !e.parentExternalSystemId || !externalIds.has(e.parentExternalSystemId))
      .map((e) => ({ ref: e, external: true, api: false, proxy: false })),
    ...(distributionLevel ? [] : (model.apis ?? [])
      .filter((a) => !nestedApiIds.has(a.id))
      .map((a) => ({ ref: a, external: false, api: true, proxy: false }))),
    ...(distributionLevel ? [] : (model.proxyApis ?? [])
      .filter((px) => !nestedProxyIds.has(px.id))
      .map((px) => ({ ref: px, external: false, api: false, proxy: true }))),
    ...(distributionLevel ? [] : (model.workflows ?? []).map((w) => ({
      ref: w,
      external: false,
      api: false,
      proxy: false,
      workflow: true,
    }))),
    // ETL flows without owner (legacy) still float; owned ones enter through their context.
    ...(distributionLevel ? [] : (model.etlFlows ?? [])
      .filter((f) => !f.ownerBoundedContextId)
      .map((f) => ({
        ref: f,
        external: false,
        api: false,
        proxy: false,
        etl: true,
      }))),
    ...(model.identityProviders ?? []).map((idp) => ({
      ref: idp,
      external: false,
      api: false,
      proxy: false,
      idp: true,
    })),
  ];

  allNodes.forEach((entry, i) => {
    const pos = layout[entry.ref.id] ?? defaultPosition(i, allNodes.length);
    if ('idp' in entry && entry.idp) {
      const idp = entry.ref as NonNullable<ModuxModel['identityProviders']>[number];
      const federated = !!idp.publishedByExternalSystemId;
      nodes.push({
        id: idp.id,
        label: idp.name,
        kind: 'identity-provider',
        symbol: 'key',
        fill: federated ? '#ffffff' : '#fefce8',
        stroke: '#ca8a04',
        dashed: federated,
        badge: idp.type ?? 'IDP',
        tooltip: `${idp.name} — emite las identidades que el sistema confía${federated ? ' (federado)' : ''}; arrastra un contexto, app o flujo ETL hasta él`,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
      });
      return;
    }
    if ('etl' in entry && entry.etl) {
      const f = entry.ref as NonNullable<ModuxModel['etlFlows']>[number];
      nodes.push({
        id: f.id,
        label: f.name,
        kind: 'etl-flow',
        symbol: 'gear',
        fill: '#f0fdfa',
        stroke: '#0f766e',
        dashed: true,
        badge: 'ETL',
        tooltip: `${f.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
      });
      return;
    }
    if ('workflow' in entry && entry.workflow) {
      const w = entry.ref as NonNullable<ModuxModel['workflows']>[number];
      nodes.push({
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
      });
      return;
    }
    if (entry.proxy) {
      const px = entry.ref as NonNullable<ModuxModel['proxyApis']>[number];
      const kids = ownedChildren(px.id, 'proxy-api');
      const expanded = toggledIds.has(px.id) && kids.length > 0;
      nodes.push({
        id: px.id,
        label: px.name,
        kind: 'proxy-api',
        symbol: 'interface',
        fill: '#ecfeff',
        stroke: '#0e7490',
        badge: 'PROXY API',
        tooltip: `${px.name} — proxy/cache de una API, consumible como ella`,
        collapsible: kids.length > 0,
        collapsed: kids.length > 0 && !expanded,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
      });
      if (expanded) emitChildren(px.id, 'proxy-api', px.name, pos);
      return;
    }
    if (entry.api) {
      const a = entry.ref as NonNullable<ModuxModel['apis']>[number];
      const kids = ownedChildren(a.id, 'api');
      const expanded = toggledIds.has(a.id) && kids.length > 0;
      nodes.push({
        id: a.id,
        label: a.name,
        kind: 'api',
        symbol: 'interface',
        fill: '#eef2ff',
        stroke: '#4f46e5',
        badge: 'API',
        tooltip: `${a.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
        collapsible: kids.length > 0,
        collapsed: kids.length > 0 && !expanded,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
      });
      if (expanded) emitChildren(a.id, 'api', a.name, pos);
      return;
    }
    if (entry.external) {
      const x = entry.ref as ModuxModel['externalSystems'][number];
      const kids = ownedChildren(x.id, 'external-system');
      const expanded = toggledIds.has(x.id) && kids.length > 0;
      const xSize = sizes[x.id];
      nodes.push({
        id: x.id,
        label: x.name,
        kind: 'external-system',
        symbol: 'component',
        fill: '#ffffff',
        stroke: '#64748b',
        dashed: true,
        badge: x.referencedRepositoryId ? 'PROYECTO' : 'EXTERNAL',
        tooltip: x.referencedRepositoryId
          ? `${x.name} — otro proyecto modux (repositorio ${x.referencedRepositoryId}), referenciado del catálogo`
          : `${x.name} (sistema externo)`,
        collapsible: kids.length > 0,
        collapsed: kids.length > 0 && !expanded,
        resizable: true,
        x: pos.x,
        y: pos.y,
        w: xSize?.w ?? NODE_W,
        h: xSize?.h ?? NODE_H,
      });
      if (expanded) emitChildren(x.id, 'external-system', x.name, pos);
      return;
    }
    const m = entry.ref as ModuxModel['boundedContexts'][number];
    const subdomain = m.subdomainType ?? 'GENERIC';
    const kids = ownedChildren(m.id, 'boundedContext');
    const expanded = toggledIds.has(m.id) && kids.length > 0;
    const mSize = sizes[m.id];
    nodes.push({
      id: m.id,
      label: m.name,
      kind: 'boundedContext',
      symbol: 'component',
      fill: SUBDOMAIN_FILL[subdomain],
      stroke: '#94a3b8',
      badge: subdomain,
      tooltip: distributionLevel && kids.length === 0
        ? `${m.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos`
        : `${m.name} — subdominio ${subdomain}`,
      collapsible: kids.length > 0,
      collapsed: kids.length > 0 && !expanded,
      resizable: true,
      x: pos.x,
      y: pos.y,
      w: mSize?.w ?? NODE_W,
      h: mSize?.h ?? NODE_H,
    });
    if (expanded) emitChildren(m.id, 'boundedContext', m.name, pos);
  });
  // Business actors, AI agents, knowledge bases and MCP gateways live outside every
  // context — and outside the distribution lens, which is about packaging.
  const actorsAndAgents = distributionLevel
    ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] }
    : {
        actors: model.actors ?? [],
        aiAgents: model.aiAgents ?? [],
        rags: model.rags ?? [],
        mcpGateways: model.mcpGateways ?? [],
      };
  const totalTop =
    allNodes.length +
    actorsAndAgents.actors.length +
    actorsAndAgents.aiAgents.length +
    actorsAndAgents.rags.length +
    actorsAndAgents.mcpGateways.length;
  actorsAndAgents.actors.forEach((a, i) => {
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
  actorsAndAgents.aiAgents.forEach((a, i) => {
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
  actorsAndAgents.mcpGateways.forEach((g, i) => {
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
  actorsAndAgents.rags.forEach((r, i) => {
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
  // Distribution level: the services join the map — they say WHERE boundedContexts deploy —
  // and the infrastructure they lean on shows up too (db, broker, engines).
  if (distributionLevel) {
    const services = model.services ?? [];
    services.forEach((svc, i) => {
      const pos = layout[svc.id] ?? defaultPosition(allNodes.length + i, allNodes.length + services.length);
      nodes.push({
        id: svc.id,
        label: svc.name,
        kind: 'service',
        symbol: 'gear',
        fill: '#f8fafc',
        stroke: '#334155',
        badge: 'SERVICIO',
        tooltip: `${svc.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
      });
    });
    const infra: { id: string; label: string; badge: string; symbol: string; tooltip: string }[] = [];
    [...new Set(services.filter((sv) => sv.database).map((sv) => sv.database as string))].forEach((db) =>
      infra.push({ id: `infra-db:${db}`, label: db, badge: 'BD', symbol: 'readmodel',
        tooltip: `Base de datos ${db} — la usan los servicios que declaran database=${db}` }));
    if (services.some((sv) => sv.outboxEnabled)) {
      infra.push({ id: 'infra-broker', label: 'Broker de eventos', badge: 'BROKER', symbol: 'event',
        tooltip: 'Broker (Kafka/…) — lo alimentan los servicios con outbox' });
    }
    if ((model.workflows ?? []).length) {
      infra.push({ id: 'infra-workflow-engine', label: 'Workflow engine', badge: 'ENGINE', symbol: 'process',
        tooltip: 'Motor de workflows — ejecuta los workflows del modelo' });
    }
    if ((model.pages ?? []).length) {
      infra.push({ id: 'infra-forms-engine', label: 'Forms engine', badge: 'ENGINE', symbol: 'interface',
        tooltip: 'Motor de formularios (Mateu) — sirve las páginas declaradas' });
    }
    infra.forEach((inf, i) => {
      const pos = layout[inf.id] ?? defaultPosition(allNodes.length + services.length + i,
        allNodes.length + services.length + infra.length);
      nodes.push({
        id: inf.id,
        label: inf.label,
        kind: 'infrastructure',
        symbol: inf.symbol,
        fill: '#fffbeb',
        stroke: '#92400e',
        dashed: true,
        badge: inf.badge,
        tooltip: inf.tooltip,
        x: pos.x,
        y: pos.y,
        w: NODE_W,
        h: NODE_H,
      });
    });
  }
  // Children must paint over every container, not just their own.
  nodes.sort((a, b) => (a.parentId ? 1 : 0) - (b.parentId ? 1 : 0));

  // Relations are 100% derived from concrete dependencies; the type is an annotation.
  const relationEdges: SceneEdge[] = model.relations.map((r) => ({
    id: relationEdgeId(r.sourceId, r.targetId),
    sourceId: r.sourceId,
    targetId: r.targetId,
    kind: 'relation',
    label: r.type
      ? RELATION_ABBREV[r.type]
      : r.inferredType
        ? `≈${RELATION_ABBREV[r.inferredType]}`
        : '?',
    color: r.declared ? '#475569' : '#94a3b8',
    dashed: !r.declared,
    arrow: true,
    tooltip: r.type
      ? `${r.type} (${r.sourceId} upstream → ${r.targetId} downstream)${r.reasons ? ` — ${r.reasons}` : ''}`
      : r.inferredType
        ? `≈ ${r.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${r.reasons ? ` — ${r.reasons}` : ''}`
        : `Relación derivada — doble click para elegir el patrón${r.reasons ? ` — ${r.reasons}` : ''}`,
  }));

  const flowEdges: SceneEdge[] = model.flows.map((f) => {
    const coherence = flowCoherence(model, f);
    // At the detail level a flow anchors on the concrete pieces when they are
    // visible: the trigger event in the source context and (for MATERIALIZES)
    // the read model in the target — the drawing mirrors the intent.
    const sourceBoundedContext = detailed ? model.boundedContexts.find((m) => m.id === f.sourceId) : undefined;
    const sourceEvent =
      sourceBoundedContext?.domainEvents?.find((ev) => ev.name === f.triggerEvent) ??
      sourceBoundedContext?.applicationEvents?.find((ev) => ev.name === f.triggerEvent);
    const targetReadModel =
      detailed && f.readModelName
        ? model.boundedContexts
            .find((m) => m.id === f.targetId)
            ?.readModels?.find((rm) => rm.name === f.readModelName)
        : undefined;
    const targetUseCase =
      detailed && f.targetUseCaseId
        ? model.boundedContexts
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
  const implBoundedContextIds = new Set(model.boundedContexts.map((m) => m.id));
  const implEntries = (model.apiImplementations ?? []).filter(
    (impl) => implApiIds.has(impl.apiId) && implBoundedContextIds.has(impl.boundedContextId),
  );

  // Emission edges (aggregate/use case → domain event) only exist at the detail
  // level, where publisher and event both render as children.
  const nodeIds = new Set(nodes.map((n) => n.id));

  // Deployment wiring (distribution level): service → the code boundedContexts it deploys,
  // plus the infrastructure each service leans on.
  const deployEdges: SceneEdge[] = distributionLevel
    ? [
        ...(model.services ?? []).flatMap((svc) =>
          (svc.moduleIds ?? [])
            .map((cmId): SceneEdge | null => {
              if (!nodeIds.has(svc.id)) return null;
              // A hidden single module (the main one) deploys through its context box.
              const target = nodeIds.has(cmId)
                ? cmId
                : (model.modules ?? []).find((cm) => cm.id === cmId)?.boundedContextId;
              if (!target || !nodeIds.has(target)) return null;
              return {
                id: `deploy:${svc.id}->${cmId}`,
                sourceId: svc.id,
                targetId: target,
                kind: 'deploys',
                color: '#334155',
                dashed: true,
                arrow: true,
                tooltip: `desplegado en ${svc.name} — Supr lo desconecta`,
              };
            })
            .filter((e): e is SceneEdge => e !== null),
        ),
        ...(model.services ?? []).flatMap((svc): SceneEdge[] => {
          const out: SceneEdge[] = [];
          if (svc.database && nodeIds.has(`infra-db:${svc.database}`) && nodeIds.has(svc.id)) {
            out.push({
              id: `infradb:${svc.id}`,
              sourceId: svc.id,
              targetId: `infra-db:${svc.database}`,
              kind: 'infra-uses',
              color: '#92400e',
              dashed: true,
              arrow: true,
              tooltip: `${svc.name} persiste en ${svc.database}`,
            });
          }
          if (svc.outboxEnabled && nodeIds.has('infra-broker') && nodeIds.has(svc.id)) {
            out.push({
              id: `infrabroker:${svc.id}`,
              sourceId: svc.id,
              targetId: 'infra-broker',
              kind: 'infra-uses',
              color: '#92400e',
              dashed: true,
              arrow: true,
              tooltip: `${svc.name} publica eventos por el outbox`,
            });
          }
          return out;
        }),
      ]
    : [];
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
  // the detail level; at the contexts level the API box points at the boundedContext.
  const apiWireEdges: SceneEdge[] = (model.apis ?? []).flatMap((api) =>
    api.operations.flatMap((op) => {
      const target =
        detailed && op.targetUseCaseId && nodeIds.has(op.targetUseCaseId)
          ? op.targetUseCaseId
          : op.targetBoundedContextId && nodeIds.has(op.targetBoundedContextId)
            ? op.targetBoundedContextId
            : op.targetUseCaseId && !detailed
              ? null // fine wiring is invisible at the contexts level unless a boundedContext is set
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

  // Identity: who validates whose tokens, and where federated IdPs come from.
  const idpEdges: SceneEdge[] = [
    ...model.boundedContexts
      .filter((mo) => mo.identityProviderId && nodeIds.has(mo.id) && nodeIds.has(mo.identityProviderId))
      .map((mo): SceneEdge => ({
        id: `idptrust:${mo.id}`,
        sourceId: mo.id,
        targetId: mo.identityProviderId!,
        kind: 'idp-trust',
        color: '#ca8a04',
        label: 'valida tokens de',
        dashed: true,
        arrow: true,
        tooltip: `${mo.name} valida los tokens emitidos por este IdP — Supr lo desconfía`,
      })),
    ...(model.etlFlows ?? [])
      .filter((f) => f.identityProviderId && nodeIds.has(f.identityProviderId))
      .flatMap((f): SceneEdge[] => {
        const el = nodeIds.has(f.id) ? f.id : f.ownerBoundedContextId && nodeIds.has(f.ownerBoundedContextId) ? f.ownerBoundedContextId : null;
        if (!el) return [];
        return [{
          id: `idpsvc:${f.id}`,
          sourceId: el,
          targetId: f.identityProviderId!,
          kind: 'idp-service',
          color: '#ca8a04',
          label: 'identidad de servicio',
          dashed: true,
          arrow: true,
          tooltip: `${f.name} corre con una identidad de servicio de este IdP`,
        }];
      }),
    ...(model.identityProviders ?? [])
      .filter((idp) => idp.publishedByExternalSystemId && nodeIds.has(idp.id) && nodeIds.has(idp.publishedByExternalSystemId!))
      .map((idp): SceneEdge => ({
        id: `idpfed:${idp.id}`,
        sourceId: idp.publishedByExternalSystemId!,
        targetId: idp.id,
        kind: 'idp-federation',
        color: '#ca8a04',
        label: 'publica',
        dashed: true,
        arrow: true,
        tooltip: 'IdP federado: lo publica este sistema externo — Supr lo vuelve propio',
      })),
  ];

  // Scheduled trigger → the use case (or policy) it fires, on a cron.
  const triggerFireEdges: SceneEdge[] = detailed
    ? model.boundedContexts
        .flatMap((mo) => mo.scheduledTriggers ?? [])
        .filter((t) => t.useCaseId && nodeIds.has(t.id) && nodeIds.has(t.useCaseId))
        .map((t) => ({
          id: `stfire:${t.id}->${t.useCaseId}`,
          sourceId: t.id,
          targetId: t.useCaseId!,
          kind: 'st-fire',
          color: '#d97706',
          label: t.cronExpression ?? 'cron',
          dashed: true,
          arrow: true,
          tooltip: `dispara según ${t.cronExpression ?? 'cron'}`,
        }))
    : [];

  // Use case → aggregate: a CallAggregateOperation/SaveAggregate step, derived.
  const aggCallEdges: SceneEdge[] = detailed
    ? (model.aggregateCalls ?? [])
        .filter((c) => nodeIds.has(c.sourceId) && nodeIds.has(c.targetId))
        .map((c) => ({
          id: `aggcall:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: 'agg-call',
          color: '#b45309',
          dashed: true,
          arrow: true,
          tooltip: 'opera sobre el agregado',
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
  const boundedContextOfChild = new Map<string, string>();
  for (const m of model.boundedContexts) {
    for (const u of m.useCases ?? []) boundedContextOfChild.set(u.id, m.id);
    for (const ev of m.domainEvents ?? []) boundedContextOfChild.set(ev.id, m.id);
    for (const ev of m.applicationEvents ?? []) boundedContextOfChild.set(ev.id, m.id);
    for (const qs of m.queryServices ?? []) boundedContextOfChild.set(qs.id, m.id);
  }
  const rollUpChild = (id: string) => (nodeIds.has(id) ? id : (boundedContextOfChild.get(id) ?? id));
  const eventIdByName = new Map<string, string>();
  for (const m of model.boundedContexts) {
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
  // Notifications: the event firing them and the roles they reach.
  const notificationEdges: SceneEdge[] = (model.notifications ?? []).flatMap((n): SceneEdge[] => {
    const el = nodeIds.has(n.id) ? n.id : n.ownerBoundedContextId && nodeIds.has(n.ownerBoundedContextId) ? n.ownerBoundedContextId : null;
    if (!el) return [];
    const out: SceneEdge[] = [];
    if (n.eventId) {
      const ev = nodeIds.has(n.eventId) ? n.eventId : boundedContextOfChild.get(n.eventId);
      if (ev && nodeIds.has(ev) && ev !== el) {
        out.push({
          id: `notif:${n.id}`,
          sourceId: ev,
          targetId: el,
          kind: 'notification-trigger',
          color: '#db2777',
          label: 'dispara',
          dashed: true,
          arrow: true,
          tooltip: `${n.name}: este evento la dispara — Supr lo desapunta`,
        });
      }
    }
    for (const roleId of n.recipientRoleIds ?? []) {
      if (!nodeIds.has(roleId)) continue;
      out.push({
        id: `notifto:${n.id}:${roleId}`,
        sourceId: el,
        targetId: roleId,
        kind: 'notification-recipient',
        color: '#db2777',
        label: (n.channels ?? [])[0]?.toLowerCase() ?? 'avisa',
        dashed: true,
        arrow: true,
        tooltip: `${n.name} avisa a este rol — Supr lo quita`,
      });
    }
    return out;
  });

  // Reports fed by a query operation (the qs chip at the detail level).
  const documentEdges: SceneEdge[] = (model.documents ?? []).flatMap((d): SceneEdge[] => {
    const el = nodeIds.has(d.id) ? d.id : d.ownerBoundedContextId && nodeIds.has(d.ownerBoundedContextId) ? d.ownerBoundedContextId : null;
    if (!el || !d.queryServiceId) return [];
    const qs = nodeIds.has(d.queryServiceId) ? d.queryServiceId : boundedContextOfChild.get(d.queryServiceId);
    if (!qs || !nodeIds.has(qs) || qs === el) return [];
    return [{
      id: `docq:${d.id}`,
      sourceId: qs,
      targetId: el,
      kind: 'document-query',
      color: '#475569',
      label: 'alimenta',
      dashed: true,
      arrow: true,
      tooltip: `${d.name}: esta consulta alimenta el informe — Supr lo desapunta`,
    }];
  });

  // ETL steps drawn as data lines: sources flow INTO the integrator, writes leave it.
  const etlEdges: SceneEdge[] = (model.etlFlows ?? []).flatMap((f) =>
    (f.steps ?? []).flatMap((s): SceneEdge[] => {
      const flowEl = nodeIds.has(f.id)
        ? f.id
        : f.ownerBoundedContextId && nodeIds.has(f.ownerBoundedContextId)
          ? f.ownerBoundedContextId
          : null;
      if (!flowEl) return [];
      const ref = s.externalTableId ?? s.operationId ?? s.apiId ?? s.eventId;
      if (!ref) return []; // transforms live inside the flow
      let el = ref;
      if (!nodeIds.has(el) && s.operationId && s.apiId) el = s.apiId;
      if (!nodeIds.has(el) && s.externalTableId) el = tableSystem.get(s.externalTableId) ?? el;
      if (!nodeIds.has(el)) el = rollUp(el);
      if (!nodeIds.has(el)) el = boundedContextOfChild.get(ref) ?? el;
      if (!nodeIds.has(el) || el === flowEl) return [];
      const source = s.type.startsWith('SOURCE');
      return [{
        id: `etl:${f.id}:${s.id}`,
        sourceId: source ? el : flowEl,
        targetId: source ? flowEl : el,
        kind: source ? 'etl-source' : 'etl-write',
        color: '#0f766e',
        label: s.type === 'SOURCE_PULL' ? 'pull' : s.type === 'SOURCE_CONSUMER' ? 'consume'
          : s.type === 'WRITE_API' ? 'api' : s.type === 'WRITE_DB' ? 'bd' : 'evento',
        dashed: true,
        arrow: true,
        tooltip: source
          ? `${f.name} lee de aquí (${s.type === 'SOURCE_PULL' ? 'pull' : 'consumidor'})`
          : `${f.name} escribe aquí — Supr quita el paso`,
      }];
    }),
  );


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
          ...(r.sourceBoundedContextIds ?? []).map((mid) => ({ sourceId: mid, targetId: r.id, name: r.name })),
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
    const nid = apiImplNodeId(impl.apiId, impl.boundedContextId);
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
              // Implementation site: the impl chip when visible, else its context.
              const implChip = apiImplNodeId(owningApi.id, u.siteId);
              target = nodeIds.has(implChip) ? implChip : u.siteId;
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
        const source = nodeIds.has(apiOpOccurrenceId(w.operationId, w.boundedContextId))
          ? apiOpOccurrenceId(w.operationId, w.boundedContextId)
          : nodeIds.has(apiImplNodeId(w.apiId, w.boundedContextId))
            ? apiImplNodeId(w.apiId, w.boundedContextId)
            : nodeIds.has(rollUp(w.boundedContextId))
              ? rollUp(w.boundedContextId)
              : null;
        if (!source) return [];
        return [{
          id: `apiimplwire:${w.operationId}@${w.boundedContextId}`,
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
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...containsEdges,
      ...deployEdges,
      ...relationEdges,
      ...flowEdges,
      ...emissionEdges,
      ...projectionEdges,
      ...apiWireEdges,
      ...callEdges,
      ...triggerFireEdges,
      ...idpEdges,
      ...notificationEdges,
      ...documentEdges,
      ...etlEdges,
      ...aggCallEdges,
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
