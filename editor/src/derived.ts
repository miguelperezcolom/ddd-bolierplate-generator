import type { ModuxModel } from './model.js';
import type { Scene } from './scene.js';

/**
 * Derived elements: catalog entries the server flags as born from a machine-made
 * stub (actor-CRUD / page derivations), not declared by hand. The canvas marks
 * them with a ✦ and the editor's toggle can hide them from the diagram.
 */

/** Ids of the elements the projection flags as derived (use cases and query services). */
export function derivedElementIds(model: ModuxModel): Set<string> {
  const ids = new Set<string>();
  for (const bc of model.boundedContexts ?? []) {
    for (const uc of bc.useCases ?? []) if (uc.derived) ids.add(uc.id);
    for (const qs of bc.queryServices ?? []) if (qs.derived) ids.add(qs.id);
  }
  return ids;
}

/** Tag every node backing a derived element, so the canvas renders the ✦ mark. */
export function markDerived(scene: Scene, ids: Set<string>): Scene {
  if (!ids.size) return scene;
  return {
    ...scene,
    nodes: scene.nodes.map((n) => (ids.has(n.id) && !n.derived ? { ...n, derived: true } : n)),
  };
}

/** Drop derived nodes and the edges that touch them (the «hide inferred» toggle). */
export function hideDerived(scene: Scene): Scene {
  const hidden = new Set(scene.nodes.filter((n) => n.derived).map((n) => n.id));
  if (!hidden.size) return scene;
  return {
    ...scene,
    nodes: scene.nodes.filter((n) => !n.derived),
    edges: scene.edges.filter((e) => !hidden.has(e.sourceId) && !hidden.has(e.targetId)),
  };
}
