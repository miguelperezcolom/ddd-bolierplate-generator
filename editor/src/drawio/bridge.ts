/**
 * draw.io ⇄ modux DSL bridge (strategic / ArchiMate tier).
 *
 * The whole question of the spike lives here: how hard is it to turn the modux model into an
 * mxGraph diagram draw.io can edit, and to turn draw.io's saved XML back into the model? Two pure
 * functions, no I/O, no framework — so it runs identically in a vitest/tsx test (with happy-dom's
 * DOMParser injected) and in the JCEF/webview harness (native DOMParser).
 *
 * Scope on purpose: the STRATEGIC tier — systems, bounded contexts, external systems, actors, and
 * the ArchiMate relations among them. This is exactly the layer where draw.io is the right tool
 * (boxes + lines, descriptive) and where modux already borrowed ArchiMate. The generative core
 * (aggregates/invariants/operations) is deliberately NOT here.
 *
 * Identity: every node/edge is a draw.io `<object>` carrying `moduxId` + `moduxType`, and the
 * object's `id` IS the moduxId — so edges reference endpoints by the same id the model uses, and a
 * round-trip never loses which box is which. A node with no `moduxId` is one the user just drew;
 * the parse side mints an id for it.
 */

export type StratKind = 'system' | 'boundedContext' | 'externalSystem' | 'actor';

export interface StratNode {
  id: string;
  name: string;
  kind: StratKind;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface StratEdge {
  id: string;
  sourceId: string;
  targetId: string;
  /** ArchiMate relation type as stored in `archimateRelations`. */
  relType: string;
  /** Absent ⇒ endpoints decide (structural rule); 'intent' draws dashed. */
  nature?: 'intent' | 'fact';
}

export interface StratModel {
  nodes: StratNode[];
  edges: StratEdge[];
}

/** Default box size per kind, when the view carries no size. */
const SIZE: Record<StratKind, { w: number; h: number }> = {
  system: { w: 240, h: 120 },
  boundedContext: { w: 160, h: 60 },
  externalSystem: { w: 160, h: 60 },
  actor: { w: 40, h: 70 },
};

/**
 * Node style per kind — the REAL ArchiMate-3 stencils draw.io ships (the exact styles its own
 * ArchiMate sidebar uses), so a modux element reads as its ArchiMate counterpart:
 *   system → Grouping · boundedContext → Application Component · externalSystem → (grey) Component ·
 *   actor → Business Actor.
 * These carry `appType=…`, which is also what {@link inferKind} reads to type a shape the user drew
 * from draw.io's own ArchiMate palette (one that has no moduxType attribute).
 */
const ARCHI = 'html=1;outlineConnect=0;whiteSpace=wrap;shape=mxgraph.archimate3.application;';
const NODE_STYLE: Record<StratKind, string> = {
  system: `${ARCHI}appType=grouping;archiType=square;dashed=1;fillColor=none;`,
  boundedContext: `${ARCHI}appType=comp;archiType=square;fillColor=#99ffff;`,
  externalSystem: `${ARCHI}appType=comp;archiType=square;fillColor=#EBEBEB;`,
  actor: `${ARCHI}appType=actor;archiType=square;fillColor=#ffff99;`,
};

/** Reverse of the styles above: the modux kind a raw ArchiMate style maps to, or null. */
export function inferKind(style: string): StratKind | null {
  if (!/archimate3/.test(style)) return null;
  if (/appType=grouping/.test(style) || /archimate3\.grouping/.test(style)) return 'system';
  if (/appType=actor/.test(style) || /appType=role/.test(style)) return 'actor';
  if (/appType=comp/.test(style)) {
    // Our external systems are the grey component; a plain/coloured component is a context.
    return /fillColor=#EBEBEB/i.test(style) ? 'externalSystem' : 'boundedContext';
  }
  if (/appType=node/.test(style) || /archimate3\.node/.test(style)) return 'externalSystem';
  return null;
}

/** Edge style per ArchiMate relation type (arrowheads follow the ArchiMate notation). */
function edgeStyle(relType: string, nature?: string): string {
  const base = 'html=1;rounded=0;';
  const dashed = nature === 'intent' ? 'dashed=1;dashPattern=6 4;' : '';
  switch (relType) {
    case 'composition':
      return base + 'startArrow=diamondThin;startFill=1;endArrow=none;' + dashed;
    case 'serving':
      return base + 'endArrow=open;endFill=0;' + dashed;
    case 'triggering':
      return base + 'endArrow=block;endFill=1;' + dashed;
    case 'realization':
      return base + 'endArrow=block;endFill=0;dashed=1;dashPattern=1 1;';
    default:
      return base + 'endArrow=classic;' + dashed;
  }
}

const esc = (s: string): string =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------------------------------------
// DSL → mxGraph XML (the "open" path)
// ---------------------------------------------------------------------------------------------

/** Render a strategic model as a draw.io `<mxGraphModel>` document (accepted by embed `load`). */
export function toMx(model: StratModel): string {
  const cells: string[] = [];
  for (const n of model.nodes) {
    const { w, h } = { w: n.w || SIZE[n.kind].w, h: n.h || SIZE[n.kind].h };
    cells.push(
      `<object id="${esc(n.id)}" label="${esc(n.name)}" moduxType="${n.kind}" moduxId="${esc(n.id)}">` +
        `<mxCell style="${NODE_STYLE[n.kind]}" vertex="1" parent="1">` +
        `<mxGeometry x="${n.x}" y="${n.y}" width="${w}" height="${h}" as="geometry"/>` +
        `</mxCell></object>`,
    );
  }
  for (const e of model.edges) {
    const natureAttr = e.nature ? ` moduxNature="${e.nature}"` : '';
    cells.push(
      `<object id="${esc(e.id)}" moduxType="relation" moduxId="${esc(e.id)}" moduxRelType="${esc(e.relType)}"${natureAttr}>` +
        `<mxCell style="${edgeStyle(e.relType, e.nature)}" edge="1" parent="1" ` +
        `source="${esc(e.sourceId)}" target="${esc(e.targetId)}">` +
        `<mxGeometry relative="1" as="geometry"/>` +
        `</mxCell></object>`,
    );
  }
  return (
    `<mxGraphModel dx="800" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" ` +
    `arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1200" math="0" shadow="0">` +
    `<root><mxCell id="0"/><mxCell id="1" parent="0"/>${cells.join('')}</root></mxGraphModel>`
  );
}

// ---------------------------------------------------------------------------------------------
// mxGraph XML → DSL (the "save" path)
// ---------------------------------------------------------------------------------------------

type DOMParserCtor = { new (): { parseFromString(s: string, t: string): Document } };

const KINDS = new Set<string>(['system', 'boundedContext', 'externalSystem', 'actor']);

/**
 * Parse draw.io's saved XML back into a strategic model.
 *
 * @param mintId  how to make an id for a node/edge the user drew fresh (no `moduxId`). Injected so
 *                the pure function stays deterministic in tests.
 * @param DOMParserImpl  happy-dom's DOMParser in node; omit to use the global (browser/JCEF).
 */
export function fromMx(
  xml: string,
  mintId: () => string,
  DOMParserImpl?: DOMParserCtor,
): StratModel {
  const Ctor = DOMParserImpl ?? (globalThis as { DOMParser?: DOMParserCtor }).DOMParser;
  if (!Ctor) throw new Error('no DOMParser available — inject happy-dom in node');
  const doc = new Ctor().parseFromString(xml, 'application/xml');

  const nodes: StratNode[] = [];
  const edges: StratEdge[] = [];
  // cellId → moduxId, so an edge's source/target (which point at the cell id) map back to model ids.
  const cellIdToModuxId = new Map<string, string>();

  // Every cell, whether wrapped in <object> (our shapes, carrying moduxType) or bare (a shape the
  // user dragged from draw.io's own ArchiMate palette, typed by {@link inferKind} from its style).
  const cells = Array.from(doc.getElementsByTagName('mxCell'));
  const wrapperOf = (cell: Element): Element | null => {
    const parent = cell.parentNode as Element | null;
    return parent && parent.tagName === 'object' ? parent : null;
  };

  // First pass: vertices, so their minted ids exist before edges resolve endpoints.
  for (const cell of cells) {
    if (cell.getAttribute('vertex') !== '1') continue;
    const obj = wrapperOf(cell);
    const style = cell.getAttribute('style') ?? '';
    const moduxType = obj?.getAttribute('moduxType') ?? '';
    const kind: StratKind | null = KINDS.has(moduxType) ? (moduxType as StratKind) : inferKind(style);
    if (!kind) continue; // a shape modux cannot generate — left in the diagram, absent from the model
    const cellId = (obj?.getAttribute('id') ?? cell.getAttribute('id')) ?? '';
    const id = obj?.getAttribute('moduxId') || mintId();
    cellIdToModuxId.set(cellId, id);
    const geo = cell.getElementsByTagName('mxGeometry')[0];
    nodes.push({
      id,
      name: obj?.getAttribute('label') ?? cell.getAttribute('value') ?? '',
      kind,
      x: num(geo?.getAttribute('x')),
      y: num(geo?.getAttribute('y')),
      w: num(geo?.getAttribute('width')),
      h: num(geo?.getAttribute('height')),
    });
  }

  // Second pass: edges. Both ends must resolve to modux nodes; anything else is dropped.
  for (const cell of cells) {
    if (cell.getAttribute('edge') !== '1') continue;
    const obj = wrapperOf(cell);
    const sourceId = cellIdToModuxId.get(cell.getAttribute('source') ?? '');
    const targetId = cellIdToModuxId.get(cell.getAttribute('target') ?? '');
    if (!sourceId || !targetId) continue;
    const relType = obj?.getAttribute('moduxRelType') || inferRelType(cell.getAttribute('style') ?? '');
    const nature = obj?.getAttribute('moduxNature');
    edges.push({
      id: obj?.getAttribute('moduxId') || mintId(),
      sourceId,
      targetId,
      relType,
      ...(nature === 'intent' || nature === 'fact' ? { nature } : {}),
    });
  }

  return { nodes, edges };
}

/** The ArchiMate relation a bare edge's arrowheads imply (for edges drawn without a moduxRelType). */
function inferRelType(style: string): string {
  if (/startArrow=diamond/i.test(style)) return 'composition';
  if (/endArrow=(block|classicThin)/i.test(style) && /endFill=1/i.test(style)) return 'triggering';
  if (/endArrow=open/i.test(style)) return 'serving';
  return 'serving';
}

const num = (v: string | null): number => (v == null || v === '' ? 0 : Number(v));
