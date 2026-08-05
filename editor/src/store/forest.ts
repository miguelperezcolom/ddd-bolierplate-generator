/**
 * Operations on a forest of nodes that carry children.
 *
 * The UI block has two of these — an app's menu and a page's content — and on the Java side each
 * carries its own copy of every operation: two finds, two inserts, two removes, two replaces,
 * two «insert under this parent». They are the same code over the same shape, so here there is
 * one of each and the difference between the two forests is only what a node holds and how a
 * node is matched.
 *
 * Everything is pure and returns a NEW forest, because the store compares by value to decide
 * what changed: mutating in place would make an edit invisible to the change tracker.
 */

import type { Element } from './store.js';

/** A node with an id and, possibly, children. */
export type Node = Element & { children?: unknown };

/** How a node is recognised. Menu entries match by id OR by label; components only by id. */
export type Matcher = (node: Node) => boolean;

export const byId = (id: string): Matcher => (node) => node.id === id;

export const childrenOf = (node: Node): Node[] =>
  (Array.isArray(node.children) ? (node.children as Node[]) : []);

const withChildren = (node: Node, children: Node[]): Node => ({ ...node, children });

/** The first node the matcher accepts, depth-first, or undefined. */
export function find(forest: Node[], matches: Matcher): Node | undefined {
  for (const node of forest) {
    if (matches(node)) return node;
    const hit = find(childrenOf(node), matches);
    if (hit) return hit;
  }
  return undefined;
}

/** Whether the matcher finds anything — used to refuse moving a node into its own subtree. */
export const contains = (forest: Node[], matches: Matcher) => find(forest, matches) !== undefined;

/**
 * `node` inserted before the first sibling the matcher accepts, or appended.
 *
 * Appending on «not found» rather than raising is deliberate: `beforeId` is a position the
 * canvas suggests, and a stale one should drop the node at the end, not lose the gesture.
 */
export function insert(siblings: Node[], node: Node, before?: Matcher): Node[] {
  const at = before ? siblings.findIndex(before) : -1;
  return at < 0
    ? [...siblings, node]
    : [...siblings.slice(0, at), node, ...siblings.slice(at)];
}

/**
 * The forest with the first matching node replaced by `edit(node)`, or undefined when nothing
 * matched. Undefined, rather than the unchanged forest, so a caller can tell «edited it» from
 * «there was nothing to edit» — several commands raise on the latter.
 */
export function replace(
  forest: Node[], matches: Matcher, edit: (node: Node) => Node,
): Node[] | undefined {
  for (let i = 0; i < forest.length; i++) {
    if (matches(forest[i])) {
      const copy = [...forest];
      copy[i] = edit(forest[i]);
      return copy;
    }
    const edited = replace(childrenOf(forest[i]), matches, edit);
    if (edited) {
      const copy = [...forest];
      copy[i] = withChildren(forest[i], edited);
      return copy;
    }
  }
  return undefined;
}

/** The forest without the first matching node, subtree included; undefined when not found. */
export function remove(forest: Node[], matches: Matcher): Node[] | undefined {
  for (let i = 0; i < forest.length; i++) {
    if (matches(forest[i])) return [...forest.slice(0, i), ...forest.slice(i + 1)];
    const pruned = remove(childrenOf(forest[i]), matches);
    if (pruned) {
      const copy = [...forest];
      copy[i] = withChildren(forest[i], pruned);
      return copy;
    }
  }
  return undefined;
}

/** The forest with `node` hung from the first matching parent; undefined when no such parent. */
export function insertUnder(
  forest: Node[], parent: Matcher, node: Node, before?: Matcher,
): Node[] | undefined {
  return replace(forest, parent, (found) =>
    withChildren(found, insert(childrenOf(found), node, before)));
}

/** Every node, at any depth, rewritten by `edit`. For sweeps: «clear this reference everywhere». */
export function mapAll(forest: Node[], edit: (node: Node) => Node): Node[] {
  return forest.map((node) => {
    const rewritten = edit(node);
    const children = childrenOf(node);
    return children.length ? withChildren(rewritten, mapAll(children, edit)) : rewritten;
  });
}

/** Every node, at any depth, that `keep` rejects is dropped along with its subtree. */
export function filterAll(forest: Node[], keep: (node: Node) => boolean): Node[] {
  return forest
    .filter(keep)
    .map((node) => (childrenOf(node).length
      ? withChildren(node, filterAll(childrenOf(node), keep))
      : node));
}

/** Every id in the forest — for minting one that does not collide. */
export function ids(forest: Node[], out = new Set<string>()): Set<string> {
  for (const node of forest) {
    if (node.id) out.add(String(node.id));
    ids(childrenOf(node), out);
  }
  return out;
}

/** `base`, or `base-2`, `base-3`… — the first that is free. */
export function uniqueId(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base;
  for (let n = 2; ; n++) {
    const candidate = `${base}-${n}`;
    if (!taken.has(candidate)) return candidate;
  }
}

/** A slug fit to be part of an id: lowercase, only letters, digits and single dashes. */
export const slug = (text: unknown, fallback: string) =>
  String(text ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || fallback;
