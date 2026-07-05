import type { Scene, DiagramLayout } from './scene.js';

/**
 * Automatic node placement via ELK, loaded on demand — the ~1.4 MB engine only
 * ever downloads when the user presses the auto-layout button. `layered` fits
 * pipelines (flows, processes); `force`/stress-like fits maps.
 */
export async function autoLayout(
  scene: Scene,
  algorithm: 'force' | 'layered',
): Promise<DiagramLayout> {
  const { default: ELK } = await import('elkjs/lib/elk.bundled.js');
  const elk = new ELK();
  const layoutOptions: Record<string, string> =
    algorithm === 'layered'
      ? {
          'elk.algorithm': 'layered',
          'elk.direction': 'RIGHT',
          'elk.spacing.nodeNode': '45',
          'elk.layered.spacing.nodeNodeBetweenLayers': '90',
        }
      : {
          'elk.algorithm': 'force',
          'elk.spacing.nodeNode': '70',
          'elk.force.iterations': '400',
        };
  const graph = {
    id: 'root',
    layoutOptions,
    children: scene.nodes.map((n) => ({ id: n.id, width: n.w, height: n.h })),
    edges: scene.edges.map((e) => ({ id: e.id, sources: [e.sourceId], targets: [e.targetId] })),
  };
  const result = await elk.layout(graph);
  const layout: DiagramLayout = {};
  for (const child of result.children ?? []) {
    layout[child.id] = {
      x: (child.x ?? 0) + (child.width ?? 0) / 2,
      y: (child.y ?? 0) + (child.height ?? 0) / 2,
    };
  }
  return layout;
}
