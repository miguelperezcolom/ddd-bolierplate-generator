/**
 * The view TYPE (lens) of a `*.modux-view.yaml` document — and the rule that it lives in the
 * filename. Since «un fichero = un tipo» (operation-body.md §8, and the wider view direction), a
 * view's type is fixed when it is created and never rotated afterwards: it is encoded in the name,
 * `<slug>.<type>.modux-view.yaml`, which is the source of truth (renaming the file retypes it).
 * There is no lens selector in the editor header anymore.
 */

/** The 13 view types. The canonical runtime list; {@link ViewId} is derived from it. */
export const VIEW_IDS = [
  'context-map', 'distribution', 'aggregates', 'flows', 'processes', 'workflows',
  'ui', 'design', 'mappings', 'eventstorming', 'integrations',
] as const;

export type ViewId = (typeof VIEW_IDS)[number];

/** Human labels for the type chooser shown when a view is created. */
export const VIEW_LABELS: Record<ViewId, string> = {
  'context-map': 'Mapa del sistema',
  distribution: 'Distribución (módulos y servicios)',
  aggregates: 'Agregados y referencias',
  flows: 'Flows',
  processes: 'Procesos',
  workflows: 'Workflows',
  ui: 'UI',
  design: 'Diseño (páginas)',
  mappings: 'Mapeados',
  eventstorming: 'EventStorming',
  integrations: 'Integraciones',
};

const SUFFIX = '.modux-view.yaml';

export function isViewId(value: string): value is ViewId {
  return (VIEW_IDS as readonly string[]).includes(value);
}

/**
 * The view type carried by a filename: the last dot-segment before `.modux-view.yaml`. Returns
 * null when the name has no valid type segment (a legacy `<slug>.modux-view.yaml`), so callers can
 * fall back to the document's `kind` field and then the default.
 */
export function kindFromViewFileName(fileName: string): ViewId | null {
  if (!fileName.endsWith(SUFFIX)) return null;
  const base = fileName.slice(0, -SUFFIX.length);
  const segment = base.slice(base.lastIndexOf('.') + 1);
  return isViewId(segment) ? segment : null;
}

/** The filename for a view of a given type: `<slug>.<type>.modux-view.yaml`. */
export function viewFileName(slug: string, kind: ViewId): string {
  return `${slug}.${kind}${SUFFIX}`;
}
