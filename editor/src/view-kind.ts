/**
 * The editor's internal render surfaces. A view document (`*.modux-view.yaml`) no longer carries a
 * TYPE: there is a single unified canvas (`context-map`, internally the `'unified'` build) where
 * everything is shown and edited. `ViewId` survives only as the editor's render-dispatch enum —
 * `context-map` is the canvas, `design` the page-designer drill-in; the rest are legacy modes kept
 * compilable while the unified canvas absorbs their depth. It is NOT written to disk anymore.
 */

/** The editor's render surfaces. `ViewId` is derived from this. */
export const VIEW_IDS = [
  'context-map', 'distribution', 'aggregates', 'flows', 'processes', 'workflows',
  'ui', 'design', 'mappings', 'eventstorming', 'integrations',
] as const;

export type ViewId = (typeof VIEW_IDS)[number];
