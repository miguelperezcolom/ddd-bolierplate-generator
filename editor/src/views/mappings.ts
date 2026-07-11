import type { ModuxModel } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';

/**
 * Mapeados view: every data model as a container with its FIELDS stacked inside,
 * every model mapping as a labeled edge between models, and every mapping RULE as
 * a thin edge between the two fields it joins — plus the mappings the model NEEDS
 * and does not have yet, derived from usage: a page button calling a use case
 * must map the page's viewmodel onto the use case's request model. Those show
 * as amber dashed «falta mapear» edges; wiring the two models creates the
 * mapping and the debt disappears.
 */

const MODEL_W = 188;
const MODEL_HEADER = 34;
const MODEL_PAD = 10;
const FIELD_H = 24;
const FIELD_GAP = 6;

/** The scene id of a field chip — field ids are only unique within their model. */
export function fieldNodeId(modelId: string, fieldId: string): string {
  return `fld:${modelId}:${fieldId}`;
}

/** Parses a field chip id back into its parts (null for non-field ids). */
export function parseFieldNodeId(id: string): { modelId: string; fieldId: string } | null {
  const m = /^fld:([^:]+):(.+)$/.exec(id);
  return m ? { modelId: m[1], fieldId: m[2] } : null;
}

export function mappingsScene(model: ModuxModel, layout: DiagramLayout): Scene {
  const nodes: SceneNode[] = [];
  const edges: SceneEdge[] = [];
  const models = model.models ?? [];
  const mappings = model.modelMappings ?? [];
  const nameOf = (id?: string) => models.find((m) => m.id === id)?.name ?? id ?? '?';

  models.forEach((m, i) => {
    const pos = layout[m.id] ?? { x: 200 + (i % 5) * 260, y: 160 + Math.floor(i / 5) * 220 };
    const fields = m.fields ?? [];
    const h = MODEL_HEADER + (fields.length ? fields.length * FIELD_H + (fields.length - 1) * FIELD_GAP : 10) + MODEL_PAD;
    nodes.push({
      id: m.id,
      label: m.name,
      x: pos.x,
      y: pos.y,
      w: MODEL_W,
      h,
      kind: 'model',
      symbol: 'readmodel',
      fill: '#ffffff',
      stroke: '#8b5cf6',
      badge: 'MODEL',
      container: true,
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`,
    });
    fields.forEach((f, j) => {
      nodes.push({
        id: fieldNodeId(m.id, f.id),
        label: f.name,
        x: pos.x,
        y: pos.y - h / 2 + MODEL_HEADER + j * (FIELD_H + FIELD_GAP) + FIELD_H / 2,
        w: MODEL_W - 2 * MODEL_PAD,
        h: FIELD_H,
        kind: 'model-field',
        fill: '#faf5ff',
        stroke: '#a78bfa',
        badge: f.type ?? undefined,
        parentId: m.id,
        tooltip: `${f.name}${f.type ? ` (${f.type})` : ''} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`,
      });
    });
  });
  // Transformations: a diamond-ish node; inputs arrive from models/fields, the
  // output leaves towards a model or a field.
  (model.transformations ?? []).forEach((t, i) => {
    const pos = layout[t.id] ?? { x: 200 + (i % 5) * 260, y: 60 };
    nodes.push({
      id: t.id,
      label: t.name,
      x: pos.x,
      y: pos.y,
      w: 150,
      h: 44,
      kind: 'transformation',
      symbol: 'gear',
      fill: '#fff7ed',
      stroke: '#ea580c',
      badge: 'TRANSFORM',
      dashed: !t.output,
      tooltip: `${t.name} — transformación: arrastra modelos o campos hasta ella (entradas) y su asa hasta un modelo o campo (salida)${t.output ? '' : ' · aún sin salida'}`,
    });
  });
  // Custom code: hand-written pieces mappings, transformations and Custom steps
  // delegate to — dashed slate node, wired by dragging.
  (model.customCodes ?? []).forEach((cc, i) => {
    const pos = layout[cc.id] ?? { x: 120 + (i % 5) * 220, y: 60 };
    nodes.push({
      id: cc.id,
      label: cc.name,
      x: pos.x,
      y: pos.y,
      w: 150,
      h: 44,
      kind: 'custom-code',
      symbol: 'gear',
      fill: '#f8fafc',
      stroke: '#0f172a',
      badge: 'CODE',
      dashed: true,
      tooltip: `${cc.name} — código a mano: arrastra su asa hasta una transformación, o hasta un modelo mapeado, para delegar en él`,
    });
  });
  const nodeIds = new Set(nodes.map((n) => n.id));
  const refNodeId = (r: { modelId: string; fieldId?: string | null }) =>
    r.fieldId ? fieldNodeId(r.modelId, r.fieldId) : r.modelId;

  for (const t of model.transformations ?? []) {
    if (t.customCodeId && nodeIds.has(t.customCodeId) && nodeIds.has(t.id)) {
      edges.push({
        id: `cctf:${t.id}`,
        sourceId: t.customCodeId,
        targetId: t.id,
        kind: 'custom-of-transformation',
        color: '#0f172a',
        dashed: true,
        arrow: true,
        tooltip: `${t.name} delega en código a mano — Supr lo desconecta`,
      });
    }
  }
  for (const mm of mappings) {
    if (mm.customCodeId && nodeIds.has(mm.customCodeId) && mm.targetModelId && nodeIds.has(mm.targetModelId)) {
      edges.push({
        id: `ccmap:${mm.id}`,
        sourceId: mm.customCodeId,
        targetId: mm.targetModelId,
        kind: 'custom-of-mapping',
        color: '#0f172a',
        dashed: true,
        arrow: true,
        label: mm.name,
        tooltip: `El mapeado ${mm.name} delega en código a mano — Supr lo desconecta`,
      });
    }
  }

  for (const t of model.transformations ?? []) {
    for (const r of t.inputs ?? []) {
      const sid = refNodeId(r);
      if (!nodeIds.has(sid)) continue;
      edges.push({
        id: `tfin:${t.id}:${r.modelId}:${r.fieldId ?? ''}`,
        sourceId: sid,
        targetId: t.id,
        kind: 'transform-input',
        color: '#ea580c',
        dashed: true,
        arrow: true,
        tooltip: `entrada de ${t.name} — Supr la desconecta`,
      });
    }
    if (t.output && nodeIds.has(refNodeId(t.output))) {
      edges.push({
        id: `tfout:${t.id}`,
        sourceId: t.id,
        targetId: refNodeId(t.output),
        kind: 'transform-output',
        color: '#ea580c',
        arrow: true,
        tooltip: `salida de ${t.name} — Supr la desconecta`,
      });
    }
  }

  for (const mm of mappings) {
    if (!mm.sourceModelId || !mm.targetModelId) continue;
    if (!nodeIds.has(mm.sourceModelId) || !nodeIds.has(mm.targetModelId)) continue;
    edges.push({
      id: `mapping:${mm.id}`,
      sourceId: mm.sourceModelId,
      targetId: mm.targetModelId,
      kind: 'model-mapping',
      color: '#7c3aed',
      label: mm.name,
      arrow: true,
      tooltip: `${mm.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`,
    });
    // Every rule joins two concrete fields: a thin violet thread chip to chip.
    for (const r of mm.rules ?? []) {
      const sid = fieldNodeId(mm.sourceModelId, r.sourceFieldId ?? '');
      const tid = fieldNodeId(mm.targetModelId, r.targetFieldId ?? '');
      if (!nodeIds.has(sid) || !nodeIds.has(tid)) continue;
      edges.push({
        id: `maprule:${mm.id}:${r.id}`,
        sourceId: sid,
        targetId: tid,
        kind: 'mapping-rule',
        color: '#a78bfa',
        dashed: true,
        arrow: true,
        tooltip: `Regla de ${mm.name} — Supr la elimina`,
      });
    }
  }

  // The mapping DEBT: page buttons (toolbar or bottom) calling a use case whose
  // request model differs from the page's viewmodel, with no mapping declared.
  const covered = new Set(
    mappings
      .filter((mm) => mm.sourceModelId && mm.targetModelId)
      .map((mm) => `${mm.sourceModelId}->${mm.targetModelId}`),
  );
  const ucById = new Map(
    model.modules.flatMap((mo) => (mo.useCases ?? []).map((u) => [u.id, u] as const)),
  );
  const seen = new Set<string>();
  for (const page of model.pages ?? []) {
    if (!page.modelId) continue;
    for (const b of page.buttons ?? []) {
      if (!b.useCaseId || b.mappingId) continue;
      const uc = ucById.get(b.useCaseId);
      if (!uc?.inputModelId || uc.inputModelId === page.modelId) continue;
      const key = `${page.modelId}->${uc.inputModelId}`;
      if (covered.has(key) || seen.has(key)) continue;
      seen.add(key);
      if (!nodeIds.has(page.modelId) || !nodeIds.has(uc.inputModelId)) continue;
      edges.push({
        id: `mapgap:${page.id}:${b.useCaseId}`,
        sourceId: page.modelId,
        targetId: uc.inputModelId,
        kind: 'mapping-gap',
        color: '#d97706',
        label: 'falta mapear',
        dashed: true,
        arrow: true,
        tooltip: `«${b.label}» (página ${page.name}) llama a ${uc.name}: falta mapear ${nameOf(page.modelId)} → ${nameOf(uc.inputModelId)} — traza la línea para crearlo`,
      });
    }
  }

  return { nodes, edges };
}
