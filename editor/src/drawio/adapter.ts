/**
 * Glue between the modux store and the pure {@link StratModel} the bridge speaks.
 *
 * Reuses the REAL store and buckets, so what this writes is a file the plugin's generator reads
 * unchanged. Nothing here is bridge logic; it picks the strategic members of a view (with their
 * geometry) on the way out, and lands nodes/edges in the right buckets on the way in.
 *
 * The save side MERGES (`patch`) into existing elements rather than replacing them: draw.io only
 * knows a node's name + position + its relations, so a save must never clobber the rest of the DSL
 * (a context's `subdomainType`, its use cases, …) that draw.io never saw.
 */

import type { ModelStore, Element } from '../store/store.js';
import type { StratModel, StratNode, StratEdge, StratKind } from './bridge.js';

/** modux bucket ⇄ strategic kind. `roles` is where actors live on disk. */
const BUCKET_OF: Record<StratKind, string> = {
  system: 'systems',
  boundedContext: 'boundedContexts',
  externalSystem: 'externalSystems',
  actor: 'roles',
};
const KIND_OF_BUCKET: Record<string, StratKind> = {
  systems: 'system',
  boundedContexts: 'boundedContext',
  externalSystems: 'externalSystem',
  roles: 'actor',
};

interface ViewGeometry {
  nodes?: Record<string, { x?: number; y?: number }>;
  sizes?: Record<string, { width?: number; height?: number }>;
}
export interface ViewDocLike {
  viewId?: string;
  name?: string;
  memberIds?: string[];
  geometry?: ViewGeometry;
}

/** Build the strategic model for a view: its members that are strategic elements, plus geometry. */
export function stratFromStore(store: ModelStore, view: ViewDocLike): StratModel {
  const members = new Set(view.memberIds ?? []);
  const pos = view.geometry?.nodes ?? {};
  const sizes = view.geometry?.sizes ?? {};

  const nodes: StratNode[] = [];
  for (const bucket of Object.keys(KIND_OF_BUCKET)) {
    for (const el of store.all(bucket)) {
      if (!members.has(el.id)) continue;
      nodes.push({
        id: el.id,
        name: String(el.name ?? ''),
        kind: KIND_OF_BUCKET[bucket],
        x: pos[el.id]?.x ?? 0,
        y: pos[el.id]?.y ?? 0,
        w: sizes[el.id]?.width ?? 0,
        h: sizes[el.id]?.height ?? 0,
      });
    }
  }

  const visible = new Set(nodes.map((n) => n.id));
  const edges: StratEdge[] = [];
  for (const r of store.all('archimateRelations')) {
    if (!visible.has(String(r.sourceId)) || !visible.has(String(r.targetId))) continue;
    edges.push({
      id: r.id,
      sourceId: String(r.sourceId),
      targetId: String(r.targetId),
      relType: String(r.type ?? 'association'),
      ...(r.nature === 'intent' || r.nature === 'fact' ? { nature: r.nature as 'intent' | 'fact' } : {}),
    });
  }

  return { nodes, edges };
}

export interface ApplyReport {
  createdIds: string[];
  updatedIds: string[];
  newMemberIds: string[];
}

/**
 * Write a strategic model back into the store buckets: create/rename nodes, upsert relations.
 * Returns the ids created (so the view can adopt them as members) and touched. A node that
 * vanished from the diagram is NOT deleted here — it is only removed from the view's members by
 * the caller (a view is a lens: leaving the diagram means leaving the picture, not the model).
 */
export function applyStratToStore(store: ModelStore, model: StratModel): ApplyReport {
  const report: ApplyReport = { createdIds: [], updatedIds: [], newMemberIds: [] };

  for (const n of model.nodes) {
    const bucket = BUCKET_OF[n.kind];
    const existing = store.get(bucket, n.id);
    if (!existing) {
      store.put(bucket, { id: n.id, name: n.name });
      report.createdIds.push(n.id);
      report.newMemberIds.push(n.id);
    } else if (String(existing.name ?? '') !== n.name) {
      store.patch(bucket, n.id, { name: n.name });
      report.updatedIds.push(n.id);
    }
  }

  const wanted = new Set<string>();
  for (const e of model.edges) {
    wanted.add(e.id);
    const el: Element = {
      id: e.id,
      sourceId: e.sourceId,
      targetId: e.targetId,
      type: e.relType,
      ...(e.nature ? { nature: e.nature } : {}),
    };
    const before = store.get('archimateRelations', e.id);
    // Skip a no-op write so flush does not churn an unchanged file.
    if (!before || before.sourceId !== el.sourceId || before.targetId !== el.targetId || before.type !== el.type || before.nature !== el.nature) {
      store.put('archimateRelations', el);
    }
  }
  // A relation the user removed in draw.io (both ends still present) is deleted from the model:
  // unlike nodes, a relation has no life outside the picture that drew it.
  for (const r of store.all('archimateRelations')) {
    const src = String(r.sourceId);
    const tgt = String(r.targetId);
    const bothVisible = model.nodes.some((n) => n.id === src) && model.nodes.some((n) => n.id === tgt);
    if (bothVisible && !wanted.has(r.id)) store.remove('archimateRelations', r.id);
  }

  return report;
}

/** Read node positions back OUT of a strategic model, to persist what the user moved. */
export function geometryFrom(model: StratModel, prev?: ViewGeometry): ViewGeometry {
  const nodes: Record<string, { x: number; y: number }> = {};
  for (const n of model.nodes) nodes[n.id] = { x: Math.round(n.x), y: Math.round(n.y) };
  return { ...prev, nodes };
}
