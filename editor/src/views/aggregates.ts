import type { ModuxModel } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';

/**
 * Aggregates view: aggregates as nodes coloured by their boundedContext's subdomain,
 * entities-within-aggregates as smaller satellite nodes, containment dashed,
 * cross-aggregate references solid.
 */

const SUBDOMAIN_FILL: Record<string, string> = {
  CORE: '#fef3c7',
  SUPPORTING: '#e0e7ff',
  GENERIC: '#f1f5f9',
};

const AGG_W = 176;
const AGG_H = 60;
const ENT_W = 140;
const ENT_H = 40;
const VO_W = 140;
const VO_H = 40;

/** Column per boundedContext, aggregates stacked, entities and value objects hanging under their aggregate. */
function defaultPositions(model: ModuxModel): DiagramLayout {
  const layout: DiagramLayout = {};
  const aggregates = model.aggregates ?? [];
  const entities = model.entities ?? [];
  const valueObjects = model.valueObjects ?? [];
  model.boundedContexts.forEach((m, mi) => {
    const columnX = 220 + mi * 340;
    const own = aggregates.filter((a) => a.boundedContextId === m.id);
    own.forEach((a, ai) => {
      const ents = entities.filter((e) => e.aggregateId === a.id);
      const vos = valueObjects.filter((v) => v.aggregateId === a.id);
      const y = 140 + ai * (170 + (ents.length + vos.length) * 60);
      layout[a.id] = { x: columnX, y };
      ents.forEach((e, ei) => {
        layout[e.id] = { x: columnX + 60, y: y + 100 + ei * 60 };
      });
      vos.forEach((v, vi) => {
        layout[v.id] = { x: columnX + 60, y: y + 100 + (ents.length + vi) * 60 };
      });
    });
  });
  // Aggregates whose boundedContext is unknown still get a slot.
  aggregates
    .filter((a) => !model.boundedContexts.some((m) => m.id === a.boundedContextId))
    .forEach((a, i) => {
      layout[a.id] = { x: 220 + i * 340, y: 640 };
    });
  return layout;
}

export function aggregatesScene(model: ModuxModel, layout: DiagramLayout): Scene {
  const defaults = defaultPositions(model);
  const pos = (id: string) => layout[id] ?? defaults[id] ?? { x: 200, y: 200 };
  const boundedContextById = new Map(model.boundedContexts.map((m) => [m.id, m]));

  const aggregateNodes: SceneNode[] = (model.aggregates ?? []).map((a) => {
    const boundedContext = boundedContextById.get(a.boundedContextId);
    const subdomain = boundedContext?.subdomainType ?? 'GENERIC';
    const p = pos(a.id);
    return {
      id: a.id,
      label: a.name,
      x: p.x,
      y: p.y,
      w: AGG_W,
      h: AGG_H,
      kind: 'aggregate',
      symbol: 'aggregate',
      fill: SUBDOMAIN_FILL[subdomain],
      stroke: '#64748b',
      badge: `${boundedContext ? `${boundedContext.name.toUpperCase()} · ` : ''}AGGREGATE${(a.invariants ?? []).length ? ` · ⚖${a.invariants!.length}` : ''}`,
      tooltip: `Agregado ${a.name}${boundedContext ? ` — contexto ${boundedContext.name} (${subdomain})` : ''}`,
    };
  });

  const entityNodes: SceneNode[] = (model.entities ?? []).map((e) => {
    const p = pos(e.id);
    return {
      id: e.id,
      label: e.name,
      x: p.x,
      y: p.y,
      w: ENT_W,
      h: ENT_H,
      kind: 'entity',
      symbol: 'entity',
      fill: '#ffffff',
      stroke: '#94a3b8',
      badge: 'ENTITY',
      tooltip: `Entidad ${e.name} (dentro del agregado)`,
    };
  });

  const valueObjectNodes: SceneNode[] = (model.valueObjects ?? []).map((v) => {
    const p = pos(v.id);
    const summary =
      v.type === 'Enum'
        ? (v.enumValues ?? []).join(' · ')
        : v.type === 'Wrapper'
          ? (v.dataType ?? '')
          : (v.fields ?? []).map((f) => f.name).join(', ');
    return {
      id: v.id,
      label: v.name,
      x: p.x,
      y: p.y,
      w: VO_W,
      h: VO_H,
      kind: 'value-object',
      symbol: 'value-object',
      fill: '#faf5ff',
      stroke: '#a855f7',
      badge: `VALUE OBJECT${v.type ? ` · ${v.type.toUpperCase()}` : ''}`,
      tooltip: `Value object ${v.name}${summary ? ` — ${summary}` : ''}`,
    };
  });

  const valueObjectEdges: SceneEdge[] = (model.valueObjects ?? []).map((v) => ({
    id: `contains-vo:${v.aggregateId}->${v.id}`,
    sourceId: v.aggregateId,
    targetId: v.id,
    kind: 'containment',
    color: '#a855f7',
    dashed: true,
    tooltip: 'Value object dentro del agregado',
  }));

  // The rules an owner protects, orbiting it — declared from the palette. Owners are
  // aggregates AND, now, value objects and entities (each can carry invariants).
  const aggIds = new Set((model.aggregates ?? []).map((a) => a.id));
  const invariantHosts: { id: string; ownerKind: string; invariants?: { id: string; name: string }[] }[] = [
    ...(model.aggregates ?? []).map((a) => ({ id: a.id, ownerKind: 'agregado', invariants: a.invariants })),
    ...(model.valueObjects ?? []).map((v) => ({ id: v.id, ownerKind: 'value object', invariants: v.invariants })),
    ...(model.entities ?? []).map((e) => ({ id: e.id, ownerKind: 'entidad', invariants: e.invariants })),
  ];
  const invariantNodes: SceneNode[] = invariantHosts.flatMap((owner) =>
    (owner.invariants ?? []).map((inv, i) => {
      const base = pos(owner.id);
      // Aggregates park their invariants to the left; VOs/entities (already indented
      // right of the aggregate) park theirs further right to avoid the column.
      const p = layout[inv.id] ??
        (aggIds.has(owner.id)
          ? { x: base.x - 150, y: base.y + 90 + i * 52 }
          : { x: base.x + 160, y: base.y + i * 46 });
      return {
        id: inv.id,
        label: inv.name,
        x: p.x,
        y: p.y,
        w: 150,
        h: 36,
        kind: 'invariant',
        symbol: 'shield',
        fill: '#f0fdfa',
        stroke: '#0f766e',
        badge: '⚖ INVARIANTE',
        tooltip: `${inv.name} — regla que el ${owner.ownerKind} protege; doble click abre su ficha (las condiciones se detallan allí)`,
      } as SceneNode;
    }),
  );

  const invariantEdges: SceneEdge[] = invariantHosts.flatMap((owner) =>
    (owner.invariants ?? []).map((inv) => ({
      id: `protects:${owner.id}->${inv.id}`,
      sourceId: owner.id,
      targetId: inv.id,
      kind: 'invariant-containment',
      color: '#0f766e',
      dashed: true,
      tooltip: 'Protege esta regla — Supr la retira',
    })),
  );

  const containmentEdges: SceneEdge[] = (model.entities ?? []).map((e) => ({
    id: `contains:${e.aggregateId}->${e.id}`,
    sourceId: e.aggregateId,
    targetId: e.id,
    kind: 'containment',
    color: '#94a3b8',
    dashed: true,
    tooltip: 'Entidad dentro del agregado',
  }));

  const referenceEdges: SceneEdge[] = (model.aggregateReferences ?? []).map((r, i) => ({
    id: `aggref:${i}:${r.sourceAggregateId}->${r.targetAggregateId}`,
    sourceId: r.sourceAggregateId,
    targetId: r.targetAggregateId,
    kind: 'aggregate-reference',
    label: r.label,
    color: '#475569',
    arrow: true,
    tooltip: r.label ? `Referencia: ${r.label}` : 'Referencia entre agregados',
  }));

  return {
    nodes: [...aggregateNodes, ...entityNodes, ...valueObjectNodes, ...invariantNodes],
    edges: [...containmentEdges, ...valueObjectEdges, ...referenceEdges, ...invariantEdges],
  };
}
