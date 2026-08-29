/**
 * Magic connector matrix (PROTOTYPE) — reuses Archi's REAL relationship-validity
 * data (doc/archi-reference/relationships.xml → archimate-matrix.generated.json),
 * mapping modux concept kinds onto ArchiMate concepts. This is the "no te deja
 * trazar si no es válida" rule, data-driven exactly like Archi.
 */
import MATRIX from './archimate-matrix.generated.json' assert { type: 'json' };
import type { SceneEdge } from '../scene.js';

/** modux node kind → ArchiMate concept used in the validity matrix. */
const KIND_TO_CONCEPT: Record<string, string> = {
  // Estratégico / contexto
  component: 'ApplicationComponent', // bounded context / system
  'external-system': 'ApplicationComponent',
  'identity-provider': 'ApplicationComponent',
  // Dominio
  aggregate: 'BusinessObject',
  entity: 'DataObject',
  'value-object': 'DataObject',
  'read-model': 'DataObject',
  invariant: 'Constraint',
  policy: 'ApplicationFunction',
  event: 'ApplicationEvent',
  'integration-event': 'ApplicationEvent',
  // Comportamiento
  usecase: 'ApplicationFunction',
  service: 'ApplicationService',
  person: 'BusinessActor',
  // Orquestación
  workflow: 'BusinessProcess',
  'workflow-step': 'ApplicationProcess',
  'etl-flow': 'ApplicationProcess',
  // Integración / APIs
  api: 'ApplicationInterface',
  'proxy-api': 'ApplicationInterface',
  'mcp-gateway': 'ApplicationInterface',
  'api-operation': 'ApplicationService',
  // IA / UI (activos que colaboran e interactúan)
  'ai-agent': 'ApplicationComponent',
  rag: 'DataObject',
  'ui-app': 'ApplicationComponent',
  page: 'ApplicationComponent',
  'menu-item': 'ApplicationComponent',
  // Módulos (patrones arquitectónicos)
  module: 'ApplicationComponent',
  bff: 'ApplicationComponent',
  acl: 'ApplicationComponent',
  'api-gateway': 'ApplicationComponent',
  adapter: 'ApplicationComponent',
  saga: 'ApplicationProcess',
  projector: 'ApplicationFunction',
  scheduler: 'ApplicationFunction',
};

type Matrix = Record<string, Record<string, string[]>>;
const M = MATRIX as Matrix;

/** ArchiMate notation per relationship — marker/dash overrides for SceneEdge. */
export const REL_NOTATION: Record<string, Partial<SceneEdge> & { label: string }> = {
  composition:    { label: 'compone',     markerStart: 'diamond' },
  aggregation:    { label: 'agrega',      markerStart: 'diamond-hollow' },
  assignment:     { label: 'asignado',    markerStart: 'ball', markerEnd: 'arrow' },
  realization:    { label: 'realiza',     markerEnd: 'hollow-triangle', dashed: true, dashArray: '6 3' },
  serving:        { label: 'sirve',       markerEnd: 'open-arrow' },
  access:         { label: 'accede',      markerEnd: 'open-arrow', dashed: true, dashArray: '2 3' },
  influence:      { label: 'influye',     markerEnd: 'open-arrow', dashed: true, dashArray: '6 3' },
  triggering:     { label: 'dispara',     markerEnd: 'arrow' },
  flow:           { label: 'fluye',       markerEnd: 'arrow', dashed: true, dashArray: '6 3' },
  specialization: { label: 'especializa', markerEnd: 'hollow-triangle' },
  association:    { label: 'asocia' },
};

/** Every ArchiMate relationship type, in palette order (like Archi's Relations group). */
export const REL_TYPES = [
  'composition', 'aggregation', 'assignment', 'realization', 'serving',
  'access', 'influence', 'triggering', 'flow', 'specialization', 'association',
] as const;

export interface RelOption {
  type: string;
  label: string;
  /** true when the relation is valid target→source (Archi draws it reversed). */
  reverse: boolean;
}

function relsBetween(srcKind: string, tgtKind: string): string[] {
  const s = KIND_TO_CONCEPT[srcKind], t = KIND_TO_CONCEPT[tgtKind];
  if (!s || !t) return [];
  return M[s]?.[t] ?? [];
}

/** All relationships Archi would offer between two nodes — forward then reverse. */
export function validRelations(srcKind: string, tgtKind: string): RelOption[] {
  const fwd = relsBetween(srcKind, tgtKind).map((type) => ({ type, label: REL_NOTATION[type]?.label ?? type, reverse: false }));
  const rev = relsBetween(tgtKind, srcKind)
    .filter((type) => !fwd.some((f) => f.type === type))
    .map((type) => ({ type, label: REL_NOTATION[type]?.label ?? type, reverse: true }));
  return [...fwd, ...rev];
}

/** Is a concrete relationship type drawable between these kinds? Returns direction. */
export function canDraw(relType: string, srcKind: string, tgtKind: string): 'forward' | 'reverse' | null {
  if (relsBetween(srcKind, tgtKind).includes(relType)) return 'forward';
  if (relsBetween(tgtKind, srcKind).includes(relType)) return 'reverse';
  return null;
}
