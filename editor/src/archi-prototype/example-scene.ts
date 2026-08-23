/**
 * Prototype-only example scene: a tiny modux domain dressed in ArchiMate-style
 * notation, so we can validate the "look & feel de Archi" over the real
 * `modux-canvas`. NOT wired to the store — handcrafted geometry on purpose.
 */
import type { Scene } from '../scene.js';

/** ArchiMate-ish pastel fills, mapped to modux concept groups (the "layers"). */
export const LAYER = {
  context:  { fill: '#F5DEAA', stroke: '#C9A85E', name: 'Estratégico' },
  domain:   { fill: '#B5FFFF', stroke: '#5AA9A9', name: 'Dominio' },
  event:    { fill: '#FFE3B5', stroke: '#D69A3E', name: 'Eventos' },
  behavior: { fill: '#FFFFB5', stroke: '#C9C05E', name: 'Comportamiento' },
} as const;

export type LayerKey = keyof typeof LAYER;

/** One row of the model tree (left panel). Mirrors the scene node ids. */
export interface TreeNode {
  id: string;
  label: string;
  symbol: string;
  layer: LayerKey;
  children?: TreeNode[];
}

/** The model tree, grouped by bounded context — the Archi "Model Tree". */
export const TREE: TreeNode[] = [
  {
    id: 'ctx-ventas', label: 'Ventas', symbol: 'component', layer: 'context',
    children: [
      { id: 'agg-pedido', label: 'Pedido', symbol: 'aggregate', layer: 'domain' },
      { id: 'ent-linea', label: 'LíneaPedido', symbol: 'entity', layer: 'domain' },
      { id: 'evt-confirmado', label: 'PedidoConfirmado', symbol: 'event', layer: 'event' },
      { id: 'uc-confirmar', label: 'ConfirmarPedido', symbol: 'usecase', layer: 'behavior' },
    ],
  },
  {
    id: 'ctx-inventario', label: 'Inventario', symbol: 'component', layer: 'context',
    children: [
      { id: 'agg-producto', label: 'Producto', symbol: 'aggregate', layer: 'domain' },
    ],
  },
  { id: 'actor-cliente', label: 'Cliente', symbol: 'person', layer: 'behavior' },
];

/** modux concept kind → ArchiMate-accurate type icon (a `SYMBOLS` key in modux-canvas). */
export const ARCHIMATE_SYMBOL: Record<string, string> = {
  component: 'am-component', aggregate: 'am-object', entity: 'am-object',
  event: 'am-event', usecase: 'am-function', person: 'am-actor',
};

const N = (
  id: string, label: string, kind: string, layer: LayerKey,
  x: number, y: number, w: number, h: number,
  extra: Partial<Scene['nodes'][number]> = {},
) => ({
  id, label, kind, symbol: ARCHIMATE_SYMBOL[kind] ?? kind, x, y, w, h,
  fill: LAYER[layer].fill, stroke: LAYER[layer].stroke, ...extra,
});

export const EXAMPLE_SCENE: Scene = {
  nodes: [
    N('ctx-ventas', 'Ventas', 'component', 'context', 40, 40, 420, 300,
      { container: true, collapsible: true }),
    N('agg-pedido', 'Pedido', 'aggregate', 'domain', 70, 110, 160, 66, { parentId: 'ctx-ventas' }),
    N('ent-linea', 'LíneaPedido', 'entity', 'domain', 270, 110, 160, 66, { parentId: 'ctx-ventas' }),
    N('evt-confirmado', 'PedidoConfirmado', 'event', 'event', 70, 220, 200, 62, { parentId: 'ctx-ventas' }),
    N('uc-confirmar', 'ConfirmarPedido', 'usecase', 'behavior', 300, 220, 150, 62, { parentId: 'ctx-ventas' }),

    N('ctx-inventario', 'Inventario', 'component', 'context', 540, 40, 340, 200,
      { container: true, collapsible: true }),
    N('agg-producto', 'Producto', 'aggregate', 'domain', 580, 110, 160, 66, { parentId: 'ctx-inventario' }),

    N('actor-cliente', 'Cliente', 'person', 'behavior', 300, 380, 130, 74),
  ],
  edges: [
    // composition: Pedido ◆— LíneaPedido
    { id: 'e-comp', sourceId: 'agg-pedido', targetId: 'ent-linea', kind: 'composition',
      markerStart: 'diamond', label: 'compone' },
    // assignment: Cliente ●—▶ ConfirmarPedido
    { id: 'e-assign', sourceId: 'actor-cliente', targetId: 'uc-confirmar', kind: 'assignment',
      markerStart: 'ball', markerEnd: 'arrow' },
    // serving: ConfirmarPedido —▷ Pedido
    { id: 'e-serve', sourceId: 'uc-confirmar', targetId: 'agg-pedido', kind: 'serving',
      markerEnd: 'open-arrow', label: 'opera' },
    // triggering: Pedido —▶ PedidoConfirmado
    { id: 'e-trigger', sourceId: 'agg-pedido', targetId: 'evt-confirmado', kind: 'triggering',
      markerEnd: 'arrow', label: 'dispara' },
    // flow (intención, top-down): PedidoConfirmado ⇢ Producto
    { id: 'e-flow', sourceId: 'evt-confirmado', targetId: 'agg-producto', kind: 'flow',
      markerEnd: 'arrow', dashArray: '6 3', dashed: true, nature: 'intent', label: 'notifica' },
  ],
};
