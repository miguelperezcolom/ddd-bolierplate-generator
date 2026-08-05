/**
 * The geometry, as elements of the tree.
 *
 * Where a box sits is presentation, not meaning — but it IS versioned, deliberately (§4.4): a
 * diagram is documentation, and without versioning everyone opens a different auto-layout. The
 * cost is churn when you drag a node, and that cost is already bounded because there is one file
 * per view, so recolocating one sheet does not touch the others.
 *
 * A `diagrams` element only ever REFERENCES catalog elements by id. It never owns or copies one,
 * which is what keeps the authored model free of paint.
 *
 * Mirrors the `/layout` endpoint this replaces.
 */

import type { EditorLayout, Point, ViewLayout } from '../scene.js';
import { asList, nested, normalize, type Element, type ModelStore } from './store.js';

/** Coordinates are kept to one decimal — plenty for pixels, and it keeps the YAML readable. */
const round1 = (value: number) => Math.round(value * 10) / 10;

/** The whole geometry, keyed by view — the shape the editor's `layout` property takes. */
export function layoutOf(store: ModelStore): EditorLayout {
  const layout: EditorLayout = {};
  for (const diagram of store.all('diagrams')) {
    const nodes: Record<string, Point> = {};
    const sizes: Record<string, { w: number; h: number }> = {};
    for (const node of nested(diagram.nodes)) {
      const ref = String(node.ref);
      nodes[ref] = { x: Number(node.x), y: Number(node.y) };
      if (node.w != null && node.h != null) {
        sizes[ref] = { w: Number(node.w), h: Number(node.h) };
      }
    }
    const edges: Record<string, Point[]> = {};
    for (const edge of nested(diagram.edges)) {
      edges[String(edge.ref)] = nested(edge.points)
        .map((p) => ({ x: Number(p.x), y: Number(p.y) }));
    }
    const view: ViewLayout = { nodes, edges, sizes };
    if (typeof diagram.detail === 'string') view.detail = diagram.detail as ViewLayout['detail'];
    if (asList(diagram.collapsed).length) view.collapsed = asList(diagram.collapsed);
    if (asList(diagram.expanded).length) view.expanded = asList(diagram.expanded);
    if (diagram.flat === true) view.flat = true;
    layout[diagram.id] = view;
  }
  return layout;
}

/**
 * Write the geometry back, one `diagrams` element per view.
 *
 * A view that carries nothing is REMOVED rather than stored empty: an empty diagram is not a
 * fact about the model, and leaving one behind would put a file in the tree that says nothing.
 */
export function saveLayout(store: ModelStore, layout: EditorLayout): void {
  const kept = new Set<string>();
  for (const [id, raw] of Object.entries(layout ?? {})) {
    const view = asViewLayout(raw);
    const diagram = toDiagram(id, view);
    if (isEmpty(diagram)) continue;
    kept.add(id);
    // only write what actually moved: `put` marks an element changed, and marking every view on
    // every save would rewrite the whole geometry each time a model is opened
    if (unchanged(store.get('diagrams', id), diagram)) continue;
    store.put('diagrams', diagram);
  }
  for (const diagram of store.all('diagrams')) {
    if (!kept.has(diagram.id)) store.remove('diagrams', diagram.id);
  }
}

function toDiagram(id: string, view: ViewLayout): Element {
  const nodes = Object.entries(view.nodes ?? {})
    .filter(([, p]) => p && Number.isFinite(p.x) && Number.isFinite(p.y))
    .map(([ref, p]) => {
      const size = view.sizes?.[ref];
      return {
        ref,
        x: round1(p.x),
        y: round1(p.y),
        ...(size ? { w: round1(size.w), h: round1(size.h) } : {}),
      };
    });
  const edges = Object.entries(view.edges ?? {})
    .map(([ref, points]) => ({
      ref,
      points: (points ?? []).map((p) => ({ x: round1(p.x), y: round1(p.y) })),
    }))
    .filter((edge) => edge.points.length > 0);

  return {
    id,
    detail: view.detail ?? null,
    nodes,
    edges,
    collapsed: view.collapsed ?? [],
    expanded: view.expanded ?? [],
    flat: view.flat === true,
  };
}

/**
 * Whether the candidate says the same as what is stored. Compared AFTER normalizing, because the
 * store drops what it never persists — an empty list and an absent one are the same fact, and
 * treating them as different is precisely how a phantom diff appears (§2.6).
 */
const unchanged = (stored: Element | undefined, candidate: Element) =>
  stored !== undefined && JSON.stringify(stored) === JSON.stringify(normalize(candidate));

const isEmpty = (diagram: Element) =>
  !(diagram.nodes as unknown[]).length && !(diagram.edges as unknown[]).length
  && !diagram.detail && !(diagram.collapsed as unknown[]).length
  && !(diagram.expanded as unknown[]).length;

/**
 * A layout written before views had edges is a flat node map. Reading it as one, rather than
 * failing, is what lets an old sheet open — the first save writes it in the current shape.
 */
function asViewLayout(raw: unknown): ViewLayout {
  if (!raw || typeof raw !== 'object') return { nodes: {}, edges: {}, sizes: {} };
  const value = raw as Record<string, unknown>;
  const looksCurrent = value.nodes && typeof value.nodes === 'object' && !('x' in value.nodes);
  if (looksCurrent) return value as unknown as ViewLayout;
  return { nodes: value as unknown as Record<string, Point>, edges: {}, sizes: {} };
}
