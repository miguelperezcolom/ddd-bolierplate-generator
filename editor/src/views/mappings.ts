import type { ModuxModel } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';

/**
 * Mapeados view: every data model as a node, every model mapping as a labeled
 * edge between its source and its target — plus the mappings the model NEEDS
 * and does not have yet, derived from usage: a page button calling a use case
 * must map the page's viewmodel onto the use case's request model. Those show
 * as amber dashed «falta mapear» edges; wiring the two models creates the
 * mapping and the debt disappears.
 */

const MODEL_W = 168;
const MODEL_H = 48;

export function mappingsScene(model: ModuxModel, layout: DiagramLayout): Scene {
  const nodes: SceneNode[] = [];
  const edges: SceneEdge[] = [];
  const models = model.models ?? [];
  const mappings = model.modelMappings ?? [];
  const nameOf = (id?: string) => models.find((m) => m.id === id)?.name ?? id ?? '?';

  models.forEach((m, i) => {
    const pos = layout[m.id] ?? { x: 200 + (i % 5) * 260, y: 140 + Math.floor(i / 5) * 150 };
    nodes.push({
      id: m.id,
      label: m.name,
      x: pos.x,
      y: pos.y,
      w: MODEL_W,
      h: MODEL_H,
      kind: 'model',
      symbol: 'readmodel',
      fill: '#ffffff',
      stroke: '#8b5cf6',
      badge: 'MODEL',
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado`,
    });
  });
  const nodeIds = new Set(nodes.map((n) => n.id));

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
      tooltip: `${mm.name} — las reglas campo a campo viven en su ficha; Supr lo elimina`,
    });
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
