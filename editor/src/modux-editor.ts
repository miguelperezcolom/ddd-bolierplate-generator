import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ModuxModel, ContextMapRelationType, SubdomainType } from './model.js';
import { normalizeViewLayout } from './scene.js';
import type { EditorLayout, Point, ViewLayout } from './scene.js';
import type { ModuxCommand } from './commands.js';
import { contextMapScene } from './views/context-map.js';
import { aggregatesScene } from './views/aggregates.js';
import { flowsScene } from './views/flows.js';
import { processesScene } from './views/processes.js';
import { eventstormingScene } from './views/eventstorming.js';
import { workflowsScene } from './views/workflows.js';
import { autoLayout } from './autolayout.js';
import './modux-canvas.js';

/** Strategic context-mapping patterns: abbreviation (as drawn) + full name. */
const RELATION_META: Record<ContextMapRelationType, { abbr: string; name: string }> = {
  PARTNERSHIP: { abbr: 'P', name: 'Partnership' },
  SHARED_KERNEL: { abbr: 'SK', name: 'Shared Kernel' },
  CUSTOMER_SUPPLIER: { abbr: 'C/S', name: 'Customer / Supplier' },
  CONFORMIST: { abbr: 'CF', name: 'Conformist' },
  OPEN_HOST_SERVICE: { abbr: 'OHS', name: 'Open Host Service' },
  ANTI_CORRUPTION_LAYER: { abbr: 'ACL', name: 'Anti-Corruption Layer' },
  PUBLISHED_LANGUAGE: { abbr: 'PL', name: 'Published Language' },
  SEPARATE_WAYS: { abbr: 'SW', name: 'Separate Ways' },
};

const RELATION_TYPES = Object.keys(RELATION_META) as ContextMapRelationType[];

type ViewId = 'context-map' | 'aggregates' | 'flows' | 'processes' | 'workflows' | 'eventstorming';

const VIEWS: { id: ViewId; label: string; ready: boolean }[] = [
  { id: 'context-map', label: 'Context map', ready: true },
  { id: 'aggregates', label: 'Agregados', ready: true },
  { id: 'flows', label: 'Flows', ready: true },
  { id: 'processes', label: 'Procesos', ready: true },
  { id: 'workflows', label: 'Workflows', ready: true },
  { id: 'eventstorming', label: 'EventStorming', ready: true },
];

const SUBDOMAIN_TYPES: SubdomainType[] = ['CORE', 'SUPPORTING', 'GENERIC'];

/**
 * Undo/redo operate on edit operations: model commands (sent to the host) plus
 * node moves (applied locally to the layout). One stack entry can bundle both —
 * e.g. dragging a step to reorder it undoes position AND order together.
 */
type MoveNodeOp = {
  kind: 'move-node';
  view: ViewId;
  id: string;
  /** Position to restore; null removes the entry (back to the default layout). */
  pos: { x: number; y: number } | null;
};
type SetEdgePointsOp = {
  kind: 'set-edge-points';
  view: ViewId;
  id: string;
  /** Waypoints to restore; null removes the entry (straight edge again). */
  points: Point[] | null;
};
type ResizeNodeOp = {
  kind: 'resize-node';
  view: ViewId;
  id: string;
  /** Size to restore; null removes the entry (back to the default size). */
  size: { w: number; h: number } | null;
};
type EditOp = ModuxCommand | MoveNodeOp | SetEdgePointsOp | ResizeNodeOp;

const slug = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Canvas activation → semantic element reference. Node ids carry view-specific
 * prefixes; the host only understands catalog element types + raw ids.
 */
function normalizeActivation(id: string, kind: string): { elementType: string; id: string } | null {
  switch (kind) {
    case 'module':
      return { elementType: 'module', id: id.replace(/^tgt:/, '') };
    case 'aggregate':
      return { elementType: 'aggregate', id };
    case 'use-case':
      return { elementType: 'use-case', id };
    case 'entity':
      return { elementType: 'entity', id };
    case 'flow':
      return { elementType: 'flow', id: id.replace(/^flow:/, '') };
    case 'process':
      return { elementType: 'process', id };
    case 'workflow':
      return { elementType: 'workflow', id };
    case 'domain-event':
      return { elementType: 'domain-event', id };
    case 'subscription':
      return { elementType: 'subscription', id };
    case 'projection':
      return { elementType: 'projection', id };
    case 'read-model':
      return { elementType: 'read-model', id };
    default:
      return null;
  }
}

/** A step opens its owning process — steps have no CRUD of their own. */
function activationForStep(
  processes: { id: string; steps: { id: string }[] }[] | undefined,
  stepId: string,
): { elementType: string; id: string } | null {
  const owner = (processes ?? []).find((p) => p.steps.some((s) => s.id === stepId));
  return owner ? { elementType: 'process', id: owner.id } : null;
}

/**
 * Editor shell. Host contract:
 *   properties in:  model (ModuxModel JSON), layout (EditorLayout)
 *   events out:     modux-command  { command: ModuxCommand }
 *                   layout-changed { layout: EditorLayout }
 *                   modux-select   { elementType, id } | null
 * The host owns persistence of both model and layout.
 */
@customElement('modux-editor')
export class ModuxEditor extends LitElement {
  @property({ attribute: false }) model: ModuxModel = {
    modules: [],
    externalSystems: [],
    relations: [],
    flows: [],
  };
  @property({ attribute: false }) layout: EditorLayout = {};
  /** On a solution (to-be): element id → ADDED | MODIFIED, drawn as diff rings. */
  @property({ attribute: false }) diff: Record<string, 'ADDED' | 'MODIFIED'> | null = null;

  @state() private _view: ViewId = 'context-map';
  /** Context-map detail level: bounded contexts only, or their aggregates + use cases. */
  @state() private _detail: 'contexts' | 'detail' | 'operations' = 'contexts';
  /** Last chosen relation type — the default pre-selection in the picker. */
  @state() private _relationType: ContextMapRelationType = 'CUSTOMER_SUPPLIER';
  /** Open type picker: creating a new relation, or editing an existing one. */
  @state() private _relationPicker: {
    sourceId: string;
    targetId: string;
    mode: 'create' | 'edit';
    x: number;
    y: number;
  } | null = null;
  @state() private _selectedId: string | null = null;
  @state() private _newName = '';
  @state() private _newSubdomain: SubdomainType = 'SUPPORTING';
  @state() private _newModuleId = '';
  /** What the context-map toolbar creates at detail level: a context, or a child element. */
  @state() private _newContextMapKind:
    | 'module'
    | 'external-system'
    | 'actor'
    | 'ai-agent'
    | 'rag'
    | 'domain-event'
    | 'application-event'
    | 'read-model'
    | 'domain-service'
    | 'query-service'
    | 'use-case'
    | 'policy'
    | 'external-use-case'
    | 'external-table'
    | 'api'
    | 'proxy-api'
    | 'api-operation' = 'module';
  /** Owner aggregate for a new read model. */
  @state() private _newAggregateId = '';
  /** Owner external system for a new external use case. */
  @state() private _newExternalId = '';
  /** Owner API for a new operation. */
  @state() private _newApiId = '';
  @state() private _newArchetype = 'TRIGGERS';
  @state() private _newTriggerAggId = '';
  @state() private _newTriggerEvent = '';
  @state() private _newTargetId = '';
  @state() private _undoStack: EditOp[][] = [];
  @state() private _redoStack: EditOp[][] = [];
  @state() private _newStepName = '';
  @state() private _newStepType: 'AUTOMATED' | 'HUMAN' = 'AUTOMATED';
  @state() private _newStepRole = '';
  @state() private _newStepDeadline = '';
  @state() private _editStepRole = '';
  @state() private _editStepDeadline = '';
  @state() private _editStepComp = '';
  @state() private _newStepUseCase = '';
  @state() private _newStepEmits = '';
  @state() private _editStepUseCase = '';
  @state() private _editStepEmits = '';
  @state() private _editStepAwaits = '';
  @state() private _multi: string[] = [];
  @state() private _newViewName = '';
  @state() private _activeViewId = '';
  @state() private _newRagSourceType = 'WEB';
  @state() private _newRagSourceUri = '';
  @state() private _addMemberKey = '';
  /** Pending node deletion while the user picks: delete from model, or only from the view. */
  @state() private _deletePicker: { elementType: string; id: string; kind: string; memberId: string } | null =
    null;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      font-family: ui-sans-serif, system-ui, sans-serif;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      overflow: hidden;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
      flex-wrap: wrap;
    }
    .tabs {
      display: flex;
      gap: 4px;
    }
    .tab {
      border: none;
      background: transparent;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
      color: #334155;
    }
    .tab[data-active] {
      background: #1e293b;
      color: #ffffff;
    }
    .tab:disabled {
      color: #94a3b8;
      cursor: not-allowed;
    }
    .spacer {
      flex: 1;
    }
    label {
      font-size: 12px;
      color: #64748b;
    }
    select,
    .new-name {
      font-size: 13px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
    }
    .new-name {
      width: 130px;
    }
    .new-name.evt {
      width: 110px;
    }
    .picker-backdrop {
      position: fixed;
      inset: 0;
      z-index: 20;
    }
    .relation-picker {
      position: fixed;
      z-index: 21;
      min-width: 210px;
      transform: translate(-50%, 12px);
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .picker-title {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 4px 8px 6px;
    }
    .picker-item {
      display: flex;
      align-items: center;
      gap: 10px;
      border: none;
      background: transparent;
      border-radius: 7px;
      padding: 6px 8px;
      cursor: pointer;
      text-align: left;
      font-size: 13px;
      color: #1e293b;
    }
    .picker-item:hover {
      background: #f1f5f9;
    }
    .picker-item.current {
      background: #eff6ff;
    }
    .picker-item .abbr {
      flex: 0 0 34px;
      font-weight: 700;
      font-size: 11px;
      color: #2563eb;
      text-align: center;
    }
    .picker-item.current .abbr::after {
      content: ' ✓';
    }
    .tab:disabled {
      opacity: 0.4;
    }
    .sep {
      width: 1px;
      align-self: stretch;
      background: #e2e8f0;
      margin: 2px 4px;
    }
    [hidden] {
      display: none !important;
    }
    .hint {
      font-size: 12px;
      color: #94a3b8;
      padding: 4px 12px;
      border-top: 1px solid #f1f5f9;
    }
    modux-canvas {
      flex: 1;
      min-height: 0;
    }
  `;

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private command(command: ModuxCommand, pushUndo = true): void {
    if (pushUndo) {
      const inverse = this.inverseOf(command);
      if (inverse) this.pushUndoEntry(inverse);
    }
    this.emit('modux-command', { command });
  }

  private viewLayout(view: ViewId): ViewLayout {
    return normalizeViewLayout(this.layout[view]);
  }

  private writeViewLayout(view: ViewId, next: ViewLayout): void {
    this.layout = { ...this.layout, [view]: next };
    this.emit('layout-changed', { layout: this.layout });
  }

  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('layout')) {
      const detail = this.viewLayout('context-map').detail;
      if (detail === 'contexts' || detail === 'detail' || detail === 'operations') {
        this._detail = detail;
      }
    }
  }

  /** Detail level changes persist with the layout, so they survive reloads. */
  private setDetail(detail: 'contexts' | 'detail' | 'operations'): void {
    this._detail = detail;
    if (
      detail === 'contexts' &&
      this._newContextMapKind !== 'module' &&
      this._newContextMapKind !== 'external-system' &&
      this._newContextMapKind !== 'actor' &&
      this._newContextMapKind !== 'ai-agent' &&
      this._newContextMapKind !== 'rag' &&
      this._newContextMapKind !== 'api'
    ) {
      this._newContextMapKind = 'module';
    }
    this.writeViewLayout('context-map', { ...this.viewLayout('context-map'), detail });
  }

  private pushUndoEntry(ops: EditOp[]): void {
    this._undoStack = [...this._undoStack.slice(-19), ops];
    this._redoStack = []; // a fresh user action invalidates the redo branch
  }

  /** Inverses of an operation list, computed against the current state, in reverse order. */
  private inversesOf(ops: EditOp[]): EditOp[] {
    return [...ops].reverse().flatMap((op): EditOp[] => {
      if (op.kind === 'move-node') {
        return [
          {
            kind: 'move-node',
            view: op.view,
            id: op.id,
            pos: this.viewLayout(op.view).nodes[op.id] ?? null,
          } satisfies MoveNodeOp,
        ];
      }
      if (op.kind === 'set-edge-points') {
        return [
          {
            kind: 'set-edge-points',
            view: op.view,
            id: op.id,
            points: this.viewLayout(op.view).edges[op.id] ?? null,
          } satisfies SetEdgePointsOp,
        ];
      }
      if (op.kind === 'resize-node') {
        return [
          {
            kind: 'resize-node',
            view: op.view,
            id: op.id,
            size: this.viewLayout(op.view).sizes?.[op.id] ?? null,
          } satisfies ResizeNodeOp,
        ];
      }
      return this.inverseOf(op) ?? [];
    });
  }

  private applyOps(ops: EditOp[]): void {
    for (const op of ops) {
      if (op.kind === 'move-node') {
        const current = this.viewLayout(op.view);
        const nodes = { ...current.nodes };
        if (op.pos) nodes[op.id] = op.pos;
        else delete nodes[op.id];
        this.writeViewLayout(op.view, { ...current, nodes });
      } else if (op.kind === 'set-edge-points') {
        const current = this.viewLayout(op.view);
        const edges = { ...current.edges };
        if (op.points && op.points.length) edges[op.id] = op.points;
        else delete edges[op.id];
        this.writeViewLayout(op.view, { ...current, edges });
      } else if (op.kind === 'resize-node') {
        const current = this.viewLayout(op.view);
        const sizes = { ...(current.sizes ?? {}) };
        if (op.size) sizes[op.id] = op.size;
        else delete sizes[op.id];
        this.writeViewLayout(op.view, { ...current, sizes });
      } else {
        this.command(op, false);
      }
    }
  }

  /**
   * Inverse commands computed against the CURRENT model (before the command is
   * applied) — what Ctrl+Z replays. Composite where needed (e.g. removing a
   * module also drops its relations, so its inverse restores them).
   */
  private inverseOf(c: ModuxCommand): ModuxCommand[] | null {
    switch (c.kind) {
      case 'add-relation':
        return [{ kind: 'remove-relation', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-relation': {
        // Removing = clearing the type annotation; undo re-annotates.
        const rel = this.model.relations.find(
          (r) => r.sourceId === c.sourceId && r.targetId === c.targetId,
        );
        return rel && rel.type
          ? [{ kind: 'set-relation-type', sourceId: c.sourceId, targetId: c.targetId, type: rel.type }]
          : null;
      }
      case 'set-relation-type': {
        const rel = this.model.relations.find(
          (r) => r.sourceId === c.sourceId && r.targetId === c.targetId,
        );
        // Annotating an unannotated pair undoes to removing the annotation.
        return rel && rel.type
          ? [{ kind: 'set-relation-type', sourceId: c.sourceId, targetId: c.targetId, type: rel.type }]
          : [{ kind: 'remove-relation', sourceId: c.sourceId, targetId: c.targetId }];
      }
      case 'add-module':
        return [{ kind: 'remove-module', id: c.id }];
      case 'remove-module': {
        const m = this.model.modules.find((x) => x.id === c.id);
        if (!m) return null;
        const rels = this.model.relations.filter(
          (r) => (r.sourceId === c.id || r.targetId === c.id) && r.type != null,
        );
        return [
          { kind: 'add-module', id: m.id, name: m.name, subdomainType: m.subdomainType ?? 'GENERIC' },
          // Re-annotate the derived pairs this module participated in.
          ...rels.map(
            (r): ModuxCommand => ({
              kind: 'set-relation-type',
              sourceId: r.sourceId,
              targetId: r.targetId,
              type: r.type as NonNullable<typeof r.type>,
            }),
          ),
        ];
      }
      case 'add-aggregate':
        return [{ kind: 'remove-aggregate', id: c.id }];
      case 'remove-aggregate': {
        const a = (this.model.aggregates ?? []).find((x) => x.id === c.id);
        return a ? [{ kind: 'add-aggregate', id: a.id, name: a.name, moduleId: a.moduleId }] : null;
      }
      case 'add-domain-event':
        return [{ kind: 'remove-domain-event', id: c.id }];
      case 'add-query-service':
        return [{ kind: 'remove-query-service', id: c.id }];
      case 'remove-query-service': {
        for (const m of this.model.modules) {
          const qs = (m.queryServices ?? []).find((x) => x.id === c.id);
          if (qs) return [{ kind: 'add-query-service', id: qs.id, name: qs.name, moduleId: m.id }];
        }
        return null;
      }
      case 'add-query-call':
        return [{ kind: 'remove-query-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-query-call':
        return [{ kind: 'add-query-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-actor-use':
        return [{ kind: 'remove-actor-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-actor-use':
        return [{ kind: 'add-actor-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-actor-external':
        return [{ kind: 'remove-actor-external', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-actor-external':
        return [{ kind: 'add-actor-external', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-external-dependency':
        return [{ kind: 'remove-external-dependency', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-external-dependency':
        return [{ kind: 'add-external-dependency', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-proxy-api':
        return [{ kind: 'remove-proxy-api', id: c.id }];
      case 'remove-proxy-api': {
        const px = (this.model.proxyApis ?? []).find((x) => x.id === c.id);
        return px
          ? [{
              kind: 'add-proxy-api',
              id: px.id,
              name: px.name,
              targetId: px.targetApiId,
              moduleId: px.publishedByExternalSystemId,
            }]
          : null;
      }
      case 'set-proxy-target': {
        const px = (this.model.proxyApis ?? []).find((x) => x.id === c.id);
        return px ? [{ kind: 'set-proxy-target', id: c.id, targetId: px.targetApiId ?? '' }] : null;
      }
      case 'set-api-publisher': {
        const el =
          (this.model.apis ?? []).find((a) => a.id === c.id) ??
          (this.model.proxyApis ?? []).find((px) => px.id === c.id);
        return el
          ? [{ kind: 'set-api-publisher', id: c.id, targetId: el.publishedByExternalSystemId ?? '' }]
          : null;
      }
      case 'add-actor-crud':
        return [{ kind: 'remove-actor-crud', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-actor-crud':
        return [{ kind: 'add-actor-crud', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-use-case':
        return [{ kind: 'remove-use-case', id: c.id }];
      case 'remove-use-case': {
        for (const m of this.model.modules) {
          const u = (m.useCases ?? []).find((x) => x.id === c.id);
          if (u) {
            return [
              { kind: 'add-use-case', id: u.id, name: u.name, moduleId: m.id, policy: u.policy },
            ];
          }
        }
        return null;
      }
      case 'add-external-use-case':
        return [{ kind: 'remove-external-use-case', id: c.id }];
      case 'remove-external-use-case': {
        for (const x of this.model.externalSystems) {
          const u = (x.useCases ?? []).find((e) => e.id === c.id);
          if (u) {
            return [{ kind: 'add-external-use-case', id: u.id, name: u.name, moduleId: x.id }];
          }
        }
        return null;
      }
      case 'add-external-call':
        return [{ kind: 'remove-external-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-external-call':
        return [{ kind: 'add-external-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-external-uc-call':
        return [{ kind: 'remove-external-uc-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-external-uc-call':
        return [{ kind: 'add-external-uc-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-use-case-call':
        return [{ kind: 'remove-use-case-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-use-case-call':
        return [{ kind: 'add-use-case-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-emission':
        return [{ kind: 'remove-emission', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-emission':
        return [{ kind: 'add-emission', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-external-system':
        return [{ kind: 'remove-external-system', id: c.id }];
      case 'remove-external-system': {
        const x = this.model.externalSystems.find((e) => e.id === c.id);
        return x ? [{ kind: 'add-external-system', id: x.id, name: x.name }] : null;
      }
      case 'add-ai-agent':
        return [{ kind: 'remove-ai-agent', id: c.id }];
      case 'remove-ai-agent': {
        const a = (this.model.aiAgents ?? []).find((x) => x.id === c.id);
        return a ? [{ kind: 'add-ai-agent', id: a.id, name: a.name }] : null;
      }
      case 'add-agent-use':
        return [{ kind: 'remove-agent-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-use':
        return [{ kind: 'add-agent-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-external-use':
        return [{ kind: 'remove-agent-external-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-external-use':
        return [{ kind: 'add-agent-external-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-rag':
        return [{ kind: 'remove-rag', id: c.id }];
      case 'remove-rag': {
        const r = (this.model.rags ?? []).find((x) => x.id === c.id);
        if (!r) return null;
        // Removing a rag also unlinks it everywhere; the inverse restores the links.
        return [
          { kind: 'add-rag', id: r.id, name: r.name },
          ...(this.model.agentRags ?? [])
            .filter((u) => u.ragId === c.id)
            .map(
              (u): ModuxCommand => ({
                kind: 'add-agent-rag',
                sourceId: u.agentId,
                targetId: c.id,
              }),
            ),
          ...(r.sourceReadModelIds ?? []).map(
            (rmId): ModuxCommand => ({ kind: 'add-rag-source', sourceId: c.id, targetId: rmId }),
          ),
        ];
      }
      case 'add-agent-rag':
        return [{ kind: 'remove-agent-rag', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-rag':
        return [{ kind: 'add-agent-rag', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-rag-source':
        return [{ kind: 'remove-rag-source', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-rag-source':
        return [{ kind: 'add-rag-source', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-actor':
        return [{ kind: 'remove-actor', id: c.id }];
      case 'remove-actor': {
        const a = (this.model.actors ?? []).find((x) => x.id === c.id);
        return a ? [{ kind: 'add-actor', id: a.id, name: a.name }] : null;
      }
      case 'add-application-event':
        return [{ kind: 'remove-application-event', id: c.id }];
      case 'remove-application-event': {
        for (const m of this.model.modules) {
          const ev = (m.applicationEvents ?? []).find((x) => x.id === c.id);
          if (ev) {
            return [{ kind: 'add-application-event', id: ev.id, name: ev.name, moduleId: m.id }];
          }
        }
        return null;
      }
      case 'add-domain-service':
        return [{ kind: 'remove-domain-service', id: c.id }];
      case 'remove-domain-service': {
        for (const m of this.model.modules) {
          const ds = (m.domainServices ?? []).find((x) => x.id === c.id);
          if (ds) return [{ kind: 'add-domain-service', id: ds.id, name: ds.name, moduleId: m.id }];
        }
        return null;
      }
      case 'add-read-model':
        return [{ kind: 'remove-read-model', id: c.id }];
      case 'add-projection':
        return [{ kind: 'remove-projection', id: c.id }];
      case 'remove-projection': {
        const p = (this.model.projections ?? []).find((x) => x.id === c.id);
        // Only source-declared projections are restorable from the canvas; the stub
        // read model survives the removal, so relinking by targetId suffices.
        return p && (p.sourceAggregateId || p.sourceExternalUseCaseId || p.sourceExternalTableId)
          ? [
              {
                kind: 'add-projection',
                id: p.id,
                name: p.name,
                aggregateId: p.sourceAggregateId,
                externalUseCaseId: p.sourceExternalUseCaseId,
                externalTableId: p.sourceExternalTableId,
                targetId: p.readModelId,
                moduleId: p.moduleId,
              },
            ]
          : null;
      }
      case 'add-external-table':
        return [{ kind: 'remove-external-table', id: c.id }];
      case 'remove-external-table': {
        for (const x of this.model.externalSystems) {
          const t = (x.tables ?? []).find((e) => e.id === c.id);
          if (t) return [{ kind: 'add-external-table', id: t.id, name: t.name, moduleId: x.id }];
        }
        return null;
      }
      case 'add-rag-content-source':
        return [{ kind: 'remove-rag-content-source', sourceId: c.sourceId, uri: c.uri }];
      case 'remove-rag-content-source': {
        const source = (this.model.rags ?? [])
          .find((r) => r.id === c.sourceId)
          ?.contentSources?.find((s) => s.uri === c.uri);
        return source
          ? [
              {
                kind: 'add-rag-content-source',
                sourceId: c.sourceId,
                type: source.type,
                uri: c.uri,
              },
            ]
          : null;
      }
      case 'add-view-member':
        return [{ kind: 'remove-view-member', id: c.id, targetId: c.targetId }];
      case 'remove-view-member':
        return [{ kind: 'add-view-member', id: c.id, targetId: c.targetId }];
      case 'add-api':
        return [{ kind: 'remove-api', id: c.id }];
      case 'remove-api': {
        const api = (this.model.apis ?? []).find((x) => x.id === c.id);
        return api
          ? [
              { kind: 'add-api', id: api.id, name: api.name },
              ...api.operations.map(
                (op): ModuxCommand => ({
                  kind: 'add-api-operation',
                  apiId: api.id,
                  id: op.id,
                  name: op.name,
                  httpMethod: op.httpMethod,
                  path: op.path,
                  moduleId: op.targetModuleId,
                  targetUseCaseId: op.targetUseCaseId,
                }),
              ),
            ]
          : null;
      }
      case 'add-api-operation':
        return [{ kind: 'remove-api-operation', apiId: c.apiId, id: c.id }];
      case 'remove-api-operation': {
        const op = (this.model.apis ?? [])
          .find((x) => x.id === c.apiId)
          ?.operations.find((o) => o.id === c.id);
        return op
          ? [
              {
                kind: 'add-api-operation',
                apiId: c.apiId,
                id: op.id,
                name: op.name,
                httpMethod: op.httpMethod,
                path: op.path,
                moduleId: op.targetModuleId,
                targetUseCaseId: op.targetUseCaseId,
              },
            ]
          : null;
      }
      case 'set-api-operation-target': {
        const op = (this.model.apis ?? [])
          .find((x) => x.id === c.apiId)
          ?.operations.find((o) => o.id === c.id);
        return op
          ? [
              {
                kind: 'set-api-operation-target',
                apiId: c.apiId,
                id: c.id,
                moduleId: op.targetModuleId,
                targetUseCaseId: op.targetUseCaseId,
              },
            ]
          : null;
      }
      case 'remove-read-model': {
        for (const m of this.model.modules) {
          const rm = (m.readModels ?? []).find((x) => x.id === c.id);
          if (rm?.aggregateId) {
            return [{ kind: 'add-read-model', id: rm.id, name: rm.name, aggregateId: rm.aggregateId }];
          }
        }
        return null;
      }
      case 'remove-domain-event': {
        for (const m of this.model.modules) {
          const ev = (m.domainEvents ?? []).find((x) => x.id === c.id);
          if (ev) return [{ kind: 'add-domain-event', id: ev.id, name: ev.name, moduleId: m.id }];
        }
        return null;
      }
      case 'rename-element': {
        const list =
          c.type === 'module'
            ? this.model.modules
            : c.type === 'aggregate'
              ? this.model.aggregates ?? []
              : c.type === 'domain-event'
                ? this.model.modules.flatMap((m) => m.domainEvents ?? [])
                : c.type === 'read-model'
                  ? this.model.modules.flatMap((m) => m.readModels ?? [])
                  : c.type === 'domain-service'
                    ? this.model.modules.flatMap((m) => m.domainServices ?? [])
                    : c.type === 'query-service'
                      ? this.model.modules.flatMap((m) => m.queryServices ?? [])
                      : c.type === 'use-case'
                        ? this.model.modules.flatMap((m) => m.useCases ?? [])
                        : c.type === 'external-use-case'
                          ? this.model.externalSystems.flatMap((x) => x.useCases ?? [])
                      : c.type === 'application-event'
                        ? this.model.modules.flatMap((m) => m.applicationEvents ?? [])
                        : c.type === 'external-system'
                          ? this.model.externalSystems
                          : c.type === 'actor'
                            ? this.model.actors ?? []
                            : c.type === 'ai-agent'
                              ? this.model.aiAgents ?? []
                              : this.model.entities ?? [];
        const el = (list as { id: string; name: string }[]).find((x) => x.id === c.id);
        return el ? [{ kind: 'rename-element', type: c.type, id: c.id, name: el.name }] : null;
      }
      case 'add-flow':
        return [{ kind: 'remove-flow', id: c.id }];
      case 'remove-flow': {
        const f = this.model.flows.find((x) => x.id === c.id);
        return f
          ? [
              {
                kind: 'add-flow',
                id: f.id,
                name: f.name,
                archetype: f.archetype,
                triggerAggregateId: f.triggerAggregateId ?? '',
                triggerEvent: f.triggerEvent ?? '',
                targetId: f.targetId,
                readModelName: f.readModelName,
                targetUseCaseId: f.targetUseCaseId,
              },
            ]
          : null;
      }
      case 'add-view':
        return [{ kind: 'remove-view', id: c.id }];
      case 'remove-view': {
        const v = (this.model.views ?? []).find((x) => x.id === c.id);
        return v ? [{ kind: 'add-view', id: v.id, name: v.name, memberIds: v.memberIds }] : null;
      }
      case 'add-process':
        return [{ kind: 'remove-process', id: c.id }];
      case 'add-process-step':
        return [{ kind: 'remove-process-step', processId: c.processId, id: c.id }];
      case 'remove-process-step': {
        const process = (this.model.processes ?? []).find((p) => p.id === c.processId);
        const index = process?.steps.findIndex((s) => s.id === c.id) ?? -1;
        if (!process || index < 0) return null;
        const step = process.steps[index];
        return [
          {
            kind: 'add-process-step',
            processId: c.processId,
            id: step.id,
            name: step.name,
            stepType: step.type,
            roleId: step.roleId,
            deadline: step.deadline,
            useCaseId: step.useCaseId,
            compensationUseCaseId: step.compensationUseCaseId,
            afterStepId: index > 0 ? process.steps[index - 1].id : undefined,
          },
        ];
      }
      case 'move-process-step': {
        const process = (this.model.processes ?? []).find((p) => p.id === c.processId);
        const index = process?.steps.findIndex((s) => s.id === c.id) ?? -1;
        if (!process || index < 0) return null;
        return [
          {
            kind: 'move-process-step',
            processId: c.processId,
            id: c.id,
            afterStepId: index > 0 ? process.steps[index - 1].id : undefined,
          },
        ];
      }
      case 'update-process-step': {
        const process = (this.model.processes ?? []).find((p) => p.id === c.processId);
        const step = process?.steps.find((s) => s.id === c.id);
        if (!step) return null;
        return [
          {
            kind: 'update-process-step',
            processId: c.processId,
            id: c.id,
            roleId: step.roleId,
            deadline: step.deadline,
            compensationUseCaseId: step.compensationUseCaseId,
          },
        ];
      }
      case 'remove-process': {
        const p = (this.model.processes ?? []).find((x) => x.id === c.id);
        return p
          ? [
              {
                kind: 'add-process',
                id: p.id,
                name: p.name,
                moduleId: p.ownerModuleId ?? '',
                triggerAggregateId: p.triggerAggregateId,
                triggerEvent: p.triggerEvent,
                steps: p.steps,
              },
            ]
          : null;
      }
      case 'add-workflow':
        return [{ kind: 'remove-workflow', id: c.id }];
      case 'remove-workflow': {
        const w = (this.model.workflows ?? []).find((x) => x.id === c.id);
        return w
          ? [
              {
                kind: 'add-workflow',
                id: w.id,
                name: w.name,
                triggerAggregateId: w.triggerAggregateId,
                triggerDomainServiceId: w.triggerDomainServiceId,
                triggerUseCaseId: w.triggerUseCaseId,
                triggerEvent: w.triggerEvent,
                completionEventName: w.onCompletionEventName,
                workflowSteps: w.steps,
              },
            ]
          : null;
      }
      case 'add-workflow-step':
        return [{ kind: 'remove-workflow-step', workflowId: c.workflowId, id: c.id }];
      case 'remove-workflow-step': {
        const workflow = (this.model.workflows ?? []).find((x) => x.id === c.workflowId);
        const index = workflow?.steps.findIndex((s) => s.id === c.id) ?? -1;
        if (!workflow || index < 0) return null;
        const step = workflow.steps[index];
        return [
          {
            kind: 'add-workflow-step',
            workflowId: c.workflowId,
            id: step.id,
            name: step.name,
            emittedEventName: step.emittedEventName,
            targetUseCaseId: step.targetUseCaseId,
            completionEventName: step.completionEventName,
            dependsOnStepIds: step.dependsOnStepIds,
            afterStepId: index > 0 ? workflow.steps[index - 1].id : undefined,
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...workflow.steps
            .filter((s) => s.id !== c.id && (s.dependsOnStepIds ?? []).includes(c.id))
            .map(
              (s): ModuxCommand => ({
                kind: 'add-workflow-dependency',
                workflowId: c.workflowId,
                id: s.id,
                dependsOnStepId: c.id,
              }),
            ),
        ];
      }
      case 'update-workflow-step': {
        const workflow = (this.model.workflows ?? []).find((x) => x.id === c.workflowId);
        const step = workflow?.steps.find((s) => s.id === c.id);
        if (!step) return null;
        return [
          {
            kind: 'update-workflow-step',
            workflowId: c.workflowId,
            id: c.id,
            emittedEventName: step.emittedEventName,
            targetUseCaseId: step.targetUseCaseId,
            completionEventName: step.completionEventName,
          },
        ];
      }
      case 'add-workflow-dependency':
        return [
          {
            kind: 'remove-workflow-dependency',
            workflowId: c.workflowId,
            id: c.id,
            dependsOnStepId: c.dependsOnStepId,
          },
        ];
      case 'remove-workflow-dependency':
        return [
          {
            kind: 'add-workflow-dependency',
            workflowId: c.workflowId,
            id: c.id,
            dependsOnStepId: c.dependsOnStepId,
          },
        ];
    }
    return null;
  }

  /** Discard undo/redo — called by the host when the model changed externally. */
  clearHistory(): void {
    this._undoStack = [];
    this._redoStack = [];
  }

  private undo(): void {
    const inverse = this._undoStack[this._undoStack.length - 1];
    if (!inverse) return;
    this._undoStack = this._undoStack.slice(0, -1);
    this._redoStack = [...this._redoStack.slice(-19), this.inversesOf(inverse)];
    this.applyOps(inverse);
  }

  private redo(): void {
    const ops = this._redoStack[this._redoStack.length - 1];
    if (!ops) return;
    this._redoStack = this._redoStack.slice(0, -1);
    this._undoStack = [...this._undoStack.slice(-19), this.inversesOf(ops)];
    this.applyOps(ops);
  }

  private onNodeMoved(e: CustomEvent): void {
    const { id, x, y } = e.detail;
    const view = this._view;
    const current = this.viewLayout(view);
    const previous = current.nodes[id] ?? null;
    // A nested child is stored as an offset from its container, so it stays put
    // relative to the container when the container itself moves.
    let pos = { x, y };
    const scene = this.sceneFor(view);
    const node = scene.nodes.find((n) => n.id === id);
    if (node?.parentId) {
      const parent = scene.nodes.find((n) => n.id === node.parentId);
      if (parent) pos = { x: x - parent.x, y: y - parent.y };
    }
    this.writeViewLayout(view, { ...current, nodes: { ...current.nodes, [id]: pos } });
    const inverseOps: EditOp[] = [{ kind: 'move-node', view, id, pos: previous }];
    // Dragging a step across its siblings also reorders the process.
    if (view === 'processes') {
      const reorder = this.stepReorderCommand(id);
      if (reorder) {
        const inverse = this.inverseOf(reorder);
        if (inverse) inverseOps.unshift(...inverse);
        this.command(reorder, false);
      }
    }
    this.pushUndoEntry(inverseOps);
  }

  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  private onNodeReparentRequested(e: CustomEvent): void {
    const { id, targetId, x, y } = e.detail as {
      id: string;
      targetId: string | null;
      x: number;
      y: number;
    };
    const api =
      (this.model.apis ?? []).find((a) => a.id === id) ??
      (this.model.proxyApis ?? []).find((px) => px.id === id);
    if (!api) return;
    if (targetId && !this.model.externalSystems.some((s) => s.id === targetId)) return;
    const current = api.publishedByExternalSystemId ?? '';
    const next = targetId ?? '';
    if (next === current) return;
    const view = this._view;
    const layout = this.viewLayout(view);
    const scene = this.sceneFor(view);
    const parent = next ? scene.nodes.find((n) => n.id === next) : undefined;
    const pos = parent ? { x: x - parent.x, y: y - parent.y } : { x, y };
    const ops: EditOp[] = [
      { kind: 'set-api-publisher', id, targetId: current },
      { kind: 'move-node', view, id, pos: layout.nodes[id] ?? null },
    ];
    this.command({ kind: 'set-api-publisher', id, targetId: next }, false);
    this.writeViewLayout(view, { ...layout, nodes: { ...layout.nodes, [id]: pos } });
    this.pushUndoEntry(ops);
  }

  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  private onNodeProxyRequested(e: CustomEvent): void {
    const { id, targetId, x, y } = e.detail as {
      id: string;
      targetId: string;
      x: number;
      y: number;
    };
    const api = (this.model.apis ?? []).find((a) => a.id === id);
    const host = this.model.externalSystems.find((s) => s.id === targetId);
    if (!api || !host) return;
    const duplicated = (this.model.proxyApis ?? []).some(
      (px) => px.targetApiId === id && px.publishedByExternalSystemId === targetId,
    );
    if (duplicated) return;
    const proxyId = `proxy-${slug(api.name)}-${slug(host.name)}`;
    if ((this.model.proxyApis ?? []).some((px) => px.id === proxyId)) return;
    const view = this._view;
    const layout = this.viewLayout(view);
    const scene = this.sceneFor(view);
    const parent = scene.nodes.find((n) => n.id === targetId);
    this.command(
      {
        kind: 'add-proxy-api',
        id: proxyId,
        name: `${api.name}@${host.name}`,
        targetId: id,
        moduleId: targetId,
      },
      false,
    );
    const ops: EditOp[] = [{ kind: 'remove-proxy-api', id: proxyId }];
    if (parent) {
      ops.push({ kind: 'move-node', view, id: proxyId, pos: layout.nodes[proxyId] ?? null });
      this.writeViewLayout(view, {
        ...layout,
        nodes: { ...layout.nodes, [proxyId]: { x: x - parent.x, y: y - parent.y } },
      });
    }
    this.pushUndoEntry(ops);
  }

  /** The selected element, when it is a first-class API (the import lands on it). */
  private selectedApiId(): string | null {
    return this._selectedId && (this.model.apis ?? []).some((a) => a.id === this._selectedId)
      ? this._selectedId
      : null;
  }

  /** Reads the picked contract and hands it to the host (the import is a server call). */
  private async onImportApiFile(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const content = await file.text();
    this.emit('modux-import-api', {
      content,
      fileName: file.name,
      apiId: this.selectedApiId(),
    });
  }

  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  private onNodesMoved(e: CustomEvent): void {
    const { moves } = e.detail as { moves: { id: string; x: number; y: number }[] };
    const view = this._view;
    const current = this.viewLayout(view);
    const scene = this.sceneFor(view);
    const nodes = { ...current.nodes };
    const inverseOps: EditOp[] = [];
    for (const { id, x, y } of moves) {
      inverseOps.push({ kind: 'move-node', view, id, pos: current.nodes[id] ?? null });
      let pos = { x, y };
      const node = scene.nodes.find((n) => n.id === id);
      if (node?.parentId) {
        const parent = scene.nodes.find((n) => n.id === node.parentId);
        if (parent) pos = { x: x - parent.x, y: y - parent.y };
      }
      nodes[id] = pos;
    }
    this.writeViewLayout(view, { ...current, nodes });
    if (view === 'processes') {
      for (const { id } of moves) {
        const reorder = this.stepReorderCommand(id);
        if (reorder) {
          const inverse = this.inverseOf(reorder);
          if (inverse) inverseOps.unshift(...inverse);
          this.command(reorder, false);
        }
      }
    }
    this.pushUndoEntry(inverseOps);
  }

  private onNodeResized(e: CustomEvent): void {
    const { id, x, y, w, h } = e.detail as { id: string; x: number; y: number; w: number; h: number };
    const view = this._view;
    const current = this.viewLayout(view);
    // An anchored resize moves the centre; children stayed put on screen, so
    // their offsets (relative to the centre) are re-expressed from the new one.
    const children = this.sceneFor(view).nodes.filter((n) => n.parentId === id);
    this.pushUndoEntry([
      { kind: 'resize-node', view, id, size: current.sizes?.[id] ?? null },
      { kind: 'move-node', view, id, pos: current.nodes[id] ?? null },
      ...children.map((c): EditOp => ({ kind: 'move-node', view, id: c.id, pos: current.nodes[c.id] ?? null })),
    ]);
    const nodes = { ...current.nodes, [id]: { x, y } };
    for (const c of children) nodes[c.id] = { x: c.x - x, y: c.y - y };
    this.writeViewLayout(view, {
      ...current,
      nodes,
      sizes: { ...(current.sizes ?? {}), [id]: { w, h } },
    });
  }

  private onEdgePointsChanged(e: CustomEvent): void {
    const { id, points } = e.detail as { id: string; points: Point[] };
    const view = this._view;
    const current = this.viewLayout(view);
    this.pushUndoEntry([
      { kind: 'set-edge-points', view, id, points: current.edges[id] ?? null },
    ]);
    const edges = { ...current.edges };
    if (points.length) edges[id] = points;
    else delete edges[id];
    this.writeViewLayout(view, { ...current, edges });
  }

  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  private stepReorderCommand(stepId: string): ModuxCommand | null {
    const owner = this.owningProcessOf(stepId);
    if (!owner) return null;
    const scene = processesScene(this.model, this.viewLayout('processes').nodes);
    const xOf = new Map(scene.nodes.map((n) => [n.id, n.x]));
    const sorted = [...owner.steps].sort(
      (a, b) => (xOf.get(a.id) ?? 0) - (xOf.get(b.id) ?? 0),
    );
    if (sorted.every((s, i) => s.id === owner.steps[i].id)) return null;
    const index = sorted.findIndex((s) => s.id === stepId);
    return {
      kind: 'move-process-step',
      processId: owner.id,
      id: stepId,
      afterStepId: index > 0 ? sorted[index - 1].id : undefined,
    };
  }

  private onConnectRequested(e: CustomEvent): void {
    const { sourceId, targetId, x, y } = e.detail;
    // In the workflows view, dragging step A → step B declares "B depends on A".
    if (this._view === 'workflows') {
      const sourceOwner = this.owningWorkflowOf(sourceId);
      const targetOwner = this.owningWorkflowOf(targetId);
      if (!sourceOwner || sourceOwner !== targetOwner || sourceId === targetId) return;
      const target = sourceOwner.steps.find((s) => s.id === targetId);
      if ((target?.dependsOnStepIds ?? []).includes(sourceId)) return;
      this.command({
        kind: 'add-workflow-dependency',
        workflowId: sourceOwner.id,
        id: targetId,
        dependsOnStepId: sourceId,
      });
      return;
    }
    if (this._view !== 'context-map') return;
    // Actor and AI-agent drags come first: they may legally end on children (use
    // cases, query services, aggregates) that other gestures treat as off-limits.
    const agentIds = new Set((this.model.aiAgents ?? []).map((a) => a.id));
    if (agentIds.has(sourceId)) {
      const agentUcIds = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (agentUcIds.has(targetId)) {
        const already = (this.model.agentUses ?? []).some(
          (u) => u.agentId === sourceId && u.useCaseId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-use', sourceId, targetId });
        return;
      }
      // The other half of the agent's tool surface: external-system operations.
      const agentExtUcIds = new Set(
        this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((u) => u.id)),
      );
      if (agentExtUcIds.has(targetId)) {
        const already = (this.model.agentExternalUses ?? []).some(
          (u) => u.agentId === sourceId && u.externalUseCaseId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-external-use', sourceId, targetId });
        return;
      }
      // Knowledge: the agent grounds its answers on the RAG.
      if ((this.model.rags ?? []).some((r) => r.id === targetId)) {
        const already = (this.model.agentRags ?? []).some(
          (u) => u.agentId === sourceId && u.ragId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-rag', sourceId, targetId });
      }
      return;
    }
    // Dragging a RAG onto a read model declares its source: the RAG indexes it.
    const rag = (this.model.rags ?? []).find((r) => r.id === sourceId);
    if (rag) {
      const readModelIds = new Set(
        this.model.modules.flatMap((m) => (m.readModels ?? []).map((rm) => rm.id)),
      );
      if (readModelIds.has(targetId) && !(rag.sourceReadModelIds ?? []).includes(targetId)) {
        this.command({ kind: 'add-rag-source', sourceId, targetId });
      }
      return;
    }
    if ((this.model.rags ?? []).some((r) => r.id === targetId)) return; // rag targets only make sense from agents
    // Dragging a proxy onto an API wires what it fronts; onto an external system, its host.
    if ((this.model.proxyApis ?? []).some((px) => px.id === sourceId)) {
      const px = (this.model.proxyApis ?? []).find((x) => x.id === sourceId)!;
      if ((this.model.apis ?? []).some((a) => a.id === targetId)) {
        if (px.targetApiId !== targetId) {
          this.command({ kind: 'set-proxy-target', id: sourceId, targetId });
        }
        return;
      }
      if (this.model.externalSystems.some((x) => x.id === targetId)) {
        if (px.publishedByExternalSystemId !== targetId) {
          this.command({ kind: 'set-api-publisher', id: sourceId, targetId });
        }
      }
      return;
    }
    // Dragging an API onto an external system declares its publisher (it nests inside).
    if ((this.model.apis ?? []).some((a) => a.id === sourceId)) {
      if (this.model.externalSystems.some((x) => x.id === targetId)) {
        const api = (this.model.apis ?? []).find((a) => a.id === sourceId)!;
        if (api.publishedByExternalSystemId !== targetId) {
          this.command({ kind: 'set-api-publisher', id: sourceId, targetId });
        }
      }
      return;
    }
    if (agentIds.has(targetId)) return;
    const actorIds = new Set((this.model.actors ?? []).map((a) => a.id));
    if (actorIds.has(sourceId)) {
      const actorUcIds = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      const actorQsIds = new Set(
        this.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
      );
      if (actorUcIds.has(targetId) || actorQsIds.has(targetId)) {
        const already = (this.model.actorUses ?? []).some(
          (u) => u.actorId === sourceId && u.targetId === targetId,
        );
        if (!already) this.command({ kind: 'add-actor-use', sourceId, targetId });
        return;
      }
      if ((this.model.aggregates ?? []).some((a) => a.id === targetId)) {
        this.command({ kind: 'add-actor-crud', sourceId, targetId });
        return;
      }
      if (this.model.externalSystems.some((x) => x.id === targetId)) {
        const exists = (this.model.actorExternalDependencies ?? []).some(
          (d) => d.actorId === sourceId && d.externalSystemId === targetId,
        );
        if (!exists) this.command({ kind: 'add-actor-external', sourceId, targetId });
        return;
      }
      return;
    }
    // Dragging an API operation onto its implementer wires the published contract to
    // the domain: a use case (or policy) is the fine wiring, a context the coarse one.
    const owningApi = this.owningApiOf(sourceId);
    if (owningApi) {
      const wireUcIds = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (wireUcIds.has(targetId)) {
        this.command({
          kind: 'set-api-operation-target',
          apiId: owningApi.id,
          id: sourceId,
          targetUseCaseId: targetId,
        });
        return;
      }
      if (this.model.modules.some((m) => m.id === targetId)) {
        this.command({
          kind: 'set-api-operation-target',
          apiId: owningApi.id,
          id: sourceId,
          moduleId: targetId,
        });
        return;
      }
      return;
    }
    // Dragging an external operation or a legacy table onto a read model (or another
    // context) declares a POLLING projection — the classic legacy integration.
    const externalOp = this.model.externalSystems
      .flatMap((x) => x.useCases ?? [])
      .find((u) => u.id === sourceId);
    const externalTable = this.model.externalSystems
      .flatMap((x) => x.tables ?? [])
      .find((t) => t.id === sourceId);
    if (externalOp || externalTable) {
      const sourceName = (externalOp ?? externalTable)!.name;
      const sourceKey = externalOp
        ? { externalUseCaseId: sourceId }
        : { externalTableId: sourceId };
      const alreadyFrom = (p: import('./model.js').ProjectionRef) =>
        externalOp ? p.sourceExternalUseCaseId === sourceId : p.sourceExternalTableId === sourceId;
      const targetReadModel = this.model.modules
        .flatMap((m) => m.readModels ?? [])
        .find((rm) => rm.id === targetId);
      if (targetReadModel) {
        const exists = (this.model.projections ?? []).some(
          (p) => alreadyFrom(p) && p.readModelId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(sourceName)}-${slug(targetReadModel.name)}`,
            name: `${targetReadModel.name}Projection`,
            ...sourceKey,
            targetId,
          });
        }
        return;
      }
      const targetModule = this.model.modules.find((m) => m.id === targetId);
      if (targetModule) {
        const exists = (this.model.projections ?? []).some(
          (p) => alreadyFrom(p) && p.moduleId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(sourceName)}-${slug(targetModule.name)}`,
            name: `${sourceName}ViewProjection`,
            ...sourceKey,
            moduleId: targetId,
            readModelName: `${sourceName}View`,
          });
        }
        return;
      }
      return;
    }
    // Dragging an aggregate onto a read model (or another context) declares a state
    // projection: the aggregate's state is materialized there. What that implies
    // (CDC, snapshots, replication…) is decided later — this only records the intent.
    const projAggregate = (this.model.aggregates ?? []).find((a) => a.id === sourceId);
    if (projAggregate) {
      const targetReadModel = this.model.modules
        .flatMap((m) => m.readModels ?? [])
        .find((rm) => rm.id === targetId);
      if (targetReadModel) {
        const exists = (this.model.projections ?? []).some(
          (p) => p.sourceAggregateId === sourceId && p.readModelId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(projAggregate.name)}-${slug(targetReadModel.name)}`,
            name: `${targetReadModel.name}Projection`,
            aggregateId: sourceId,
            targetId,
          });
        }
        return;
      }
      const targetModule = this.model.modules.find((m) => m.id === targetId);
      if (targetModule) {
        const exists = (this.model.projections ?? []).some(
          (p) => p.sourceAggregateId === sourceId && p.moduleId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(projAggregate.name)}-${slug(targetModule.name)}`,
            name: `${projAggregate.name}ViewProjection`,
            aggregateId: sourceId,
            moduleId: targetId,
            readModelName: `${projAggregate.name}View`,
          });
        }
        return;
      }
      // any other target (e.g. a domain event) falls through to the gestures below
    }
    // Dragging from an aggregate/use case onto a domain event declares an emission.
    const eventIds = new Set(
      this.model.modules.flatMap((m) => (m.domainEvents ?? []).map((ev) => ev.id)),
    );
    // Only aggregates and domain services emit domain events; use cases emit
    // application events instead.
    const emitterIds = new Set([
      ...(this.model.aggregates ?? []).map((a) => a.id),
      ...this.model.modules.flatMap((m) => (m.domainServices ?? []).map((ds) => ds.id)),
    ]);
    const appEventIds = new Set(
      this.model.modules.flatMap((m) => (m.applicationEvents ?? []).map((ev) => ev.id)),
    );
    const ucIds = new Set(this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)));
    const qsIds = new Set(
      this.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
    );
    if (ucIds.has(sourceId) && qsIds.has(targetId)) {
      const already = (this.model.queryCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) this.command({ kind: 'add-query-call', sourceId, targetId });
      return;
    }
    const externalUcIds = new Set(
      this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((u) => u.id)),
    );
    if (ucIds.has(sourceId) && externalUcIds.has(targetId)) {
      const already = (this.model.externalUseCaseCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) this.command({ kind: 'add-external-uc-call', sourceId, targetId });
      return;
    }
    if (ucIds.has(sourceId) && ucIds.has(targetId) && sourceId !== targetId) {
      const already = (this.model.useCaseCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) this.command({ kind: 'add-use-case-call', sourceId, targetId });
      return;
    }
    if (
      (emitterIds.has(sourceId) && eventIds.has(targetId)) ||
      (ucIds.has(sourceId) && appEventIds.has(targetId))
    ) {
      const already = (this.model.emissions ?? []).some(
        (em) => em.sourceId === sourceId && em.domainEventId === targetId,
      );
      if (!already) this.command({ kind: 'add-emission', sourceId, targetId });
      return;
    }
    // Dragging an event onto another context (or one of its read models) draws a
    // materialization: a MATERIALIZES flow — the projection/read model/subscription
    // triple stays derived at generation time (flows are the source of truth).
    if (eventIds.has(sourceId) || appEventIds.has(sourceId)) {
      const isApplicationEvent = appEventIds.has(sourceId);
      const event = this.model.modules
        .flatMap((m) => (isApplicationEvent ? m.applicationEvents : m.domainEvents) ?? [])
        .find((ev) => ev.id === sourceId);
      const targetUseCase = this.model.modules
        .flatMap((m) => (m.useCases ?? []).map((u) => ({ u, module: m })))
        .find(({ u }) => u.id === targetId);
      const targetReadModel = this.model.modules
        .flatMap((m) => (m.readModels ?? []).map((rm) => ({ rm, module: m })))
        .find(({ rm }) => rm.id === targetId);
      const targetModule =
        this.model.modules.find((m) => m.id === targetId) ??
        targetReadModel?.module ??
        targetUseCase?.module;
      if (!event || !targetModule) return;
      const aggregateIds = new Set((this.model.aggregates ?? []).map((a) => a.id));
      const domainServiceIds = new Set(
        this.model.modules.flatMap((m) => (m.domainServices ?? []).map((ds) => ds.id)),
      );
      const emitter = (this.model.emissions ?? []).find(
        (em) =>
          em.domainEventId === sourceId &&
          (isApplicationEvent
            ? ucIds.has(em.sourceId)
            : aggregateIds.has(em.sourceId) || domainServiceIds.has(em.sourceId)),
      );
      if (!emitter) {
        this.emit('modux-notice', {
          message: isApplicationEvent
            ? `Declara primero qué caso de uso publica ${event.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador`
            : `Declara primero quién emite ${event.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: 'info',
        });
        return;
      }
      const emitterIsAggregate = !isApplicationEvent && aggregateIds.has(emitter.sourceId);
      if (targetUseCase) {
        // Event onto a use case: the TRIGGERS archetype (subscription + CallUseCase derive later).
        const exists = this.model.flows.some(
          (f) =>
            f.archetype === 'TRIGGERS' &&
            f.triggerEvent === event.name &&
            f.targetUseCaseId === targetUseCase.u.id,
        );
        if (exists) return;
        this.command({
          kind: 'add-flow',
          id: `flow-${slug(event.name)}-${slug(targetUseCase.u.name)}`,
          name: targetUseCase.u.name,
          archetype: 'TRIGGERS',
          triggerAggregateId: emitterIsAggregate ? emitter.sourceId : '',
          triggerDomainServiceId:
            !isApplicationEvent && !emitterIsAggregate ? emitter.sourceId : undefined,
          triggerUseCaseId: isApplicationEvent ? emitter.sourceId : undefined,
          triggerEvent: event.name,
          targetId: targetModule.id,
          targetUseCaseId: targetUseCase.u.id,
        });
        return;
      }
      const readModelName = targetReadModel?.rm.name ?? `${event.name}View`;
      const exists = this.model.flows.some(
        (f) =>
          f.archetype === 'MATERIALIZES' &&
          f.triggerEvent === event.name &&
          f.targetId === targetModule.id &&
          f.readModelName === readModelName,
      );
      if (exists) return;
      this.command({
        kind: 'add-flow',
        id: `flow-${slug(event.name)}-${slug(readModelName)}`,
        name: readModelName,
        archetype: 'MATERIALIZES',
        triggerAggregateId: emitterIsAggregate ? emitter.sourceId : '',
        triggerDomainServiceId:
          !isApplicationEvent && !emitterIsAggregate ? emitter.sourceId : undefined,
        triggerUseCaseId: isApplicationEvent ? emitter.sourceId : undefined,
        triggerEvent: event.name,
        targetId: targetModule.id,
        readModelName,
      });
      return;
    }
    // Any other pair touching a nested child is not a strategic relation.
    const childIds = new Set([
      ...emitterIds,
      ...ucIds,
      ...qsIds,
      ...this.model.modules.flatMap((m) => (m.readModels ?? []).map((rm) => rm.id)),
    ]);
    if (
      childIds.has(sourceId) ||
      childIds.has(targetId) ||
      eventIds.has(targetId) ||
      appEventIds.has(targetId)
    ) {
      return;
    }
    const relationExternalIds = new Set(this.model.externalSystems.map((s) => s.id));
    if (relationExternalIds.has(sourceId)) {
      const extUcIds0 = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (extUcIds0.has(targetId)) {
        const already = (this.model.externalCalls ?? []).some(
          (c) => c.externalSystemId === sourceId && c.useCaseId === targetId,
        );
        if (!already) this.command({ kind: 'add-external-call', sourceId, targetId });
        return;
      }
      if (relationExternalIds.has(targetId) && targetId !== sourceId) {
        const exists = (this.model.externalSystemDependencies ?? []).some(
          (d) => d.sourceId === sourceId && d.targetId === targetId,
        );
        if (!exists) this.command({ kind: 'add-external-dependency', sourceId, targetId });
        return;
      }
      if (
        (this.model.apis ?? []).some((a) => a.id === targetId) ||
        (this.model.proxyApis ?? []).some((px) => px.id === targetId)
      ) {
        const exists = (this.model.externalSystemDependencies ?? []).some(
          (d) => d.sourceId === sourceId && d.targetId === targetId,
        );
        if (!exists) this.command({ kind: 'add-external-dependency', sourceId, targetId });
        return;
      }
      return;
    }
    if (relationExternalIds.has(targetId)) return;
    if (actorIds.has(targetId)) return;
    // Strategic relations are 100% derived from the concrete dependencies —
    // there is nothing left to hand-draw between two contexts.
    void x;
    void y;
  }

  /** Apply the picker's choice: create the new relation or retype the existing one. */
  private pickRelationType(type: ContextMapRelationType): void {
    const p = this._relationPicker;
    this._relationPicker = null;
    if (!p) return;
    this._relationType = type; // remember as the next default
    if (p.mode === 'create') {
      this.command({ kind: 'add-relation', sourceId: p.sourceId, targetId: p.targetId, type });
      return;
    }
    const rel = this.model.relations.find(
      (r) => r.sourceId === p.sourceId && r.targetId === p.targetId,
    );
    if (rel && rel.type !== type) {
      this.command({ kind: 'set-relation-type', sourceId: p.sourceId, targetId: p.targetId, type });
    }
  }

  private onDeleteRequested(e: CustomEvent): void {
    const { elementType, id, kind } = e.detail;
    // With a modux View active, deleting a member node is ambiguous: drop the element
    // from the MODEL, or only take it out of this view? Ask before touching anything.
    if (this._activeViewId && elementType === 'node') {
      const memberId = this.memberIdOf(id, kind);
      const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
      if (memberId && view?.memberIds.includes(memberId)) {
        this._deletePicker = { elementType, id, kind, memberId };
        return;
      }
    }
    this.performDelete(elementType, id, kind);
  }

  /** Canvas node → the catalog id a view lists as member (null when not a member kind). */
  private memberIdOf(id: string, kind: string): string | null {
    switch (kind) {
      case 'module':
      case 'external-system':
        return id.replace(/^tgt:/, '');
      case 'aggregate':
      case 'entity':
      case 'process':
      case 'workflow':
        return id;
      case 'flow':
        return id.replace(/^flow:/, '');
      case 'process-step':
        return this.owningProcessOf(id)?.id ?? null;
      case 'workflow-step':
        return this.owningWorkflowOf(id)?.id ?? null;
      default:
        return null;
    }
  }

  private performDelete(elementType: string, id: string, kind: string): void {
    if (this._view === 'workflows' && elementType === 'edge' && kind === 'workflow-dependency') {
      const match = /^wfdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      const owner = this.owningWorkflowOf(match[2]);
      if (!owner) return;
      this._selectedId = null;
      this.command({
        kind: 'remove-workflow-dependency',
        workflowId: owner.id,
        id: match[2],
        dependsOnStepId: match[1],
      });
      return;
    }
    if (elementType === 'node' && kind === 'workflow') {
      this._selectedId = null;
      this.command({ kind: 'remove-workflow', id });
      return;
    }
    if (elementType === 'node' && kind === 'workflow-step') {
      const owner = this.owningWorkflowOf(id);
      if (!owner) return;
      this._selectedId = null;
      this.command({ kind: 'remove-workflow-step', workflowId: owner.id, id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'relation') {
      // Edge ids for relations are `rel:<sourceId>-><targetId>` (see relationEdgeId).
      const match = /^rel:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-relation', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'emission') {
      const match = /^emit:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-emission', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'projection') {
      const match = /^proj:(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-projection', id: match[1] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'uc-call') {
      const match = /^uccall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-use-case-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'qs-call') {
      const match = /^qscall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-query-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'external-call') {
      const match = /^extcall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-external-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'ext-uc-call') {
      const match = /^extuccall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-external-uc-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-use') {
      const match = /^mcp:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-external-use') {
      const match = /^mcpx:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-external-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-rag') {
      const match = /^agrag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-rag', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'rag-source') {
      const match = /^ragsrc:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-rag-source', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'rag') {
      this._selectedId = null;
      this.command({ kind: 'remove-rag', id });
      return;
    }
    if (elementType === 'node' && kind === 'rag-content-source') {
      const match = /^ragcs:(.+?):(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-rag-content-source', sourceId: match[1], uri: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'external-table') {
      this._selectedId = null;
      this.command({ kind: 'remove-external-table', id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'api-wire') {
      const match = /^apiwire:(.+)$/.exec(id);
      const owner = match ? this.owningApiOf(match[1]) : null;
      if (!match || !owner) return;
      this._selectedId = null;
      // Unwire: clearing both targets leaves the operation published but unimplemented.
      this.command({ kind: 'set-api-operation-target', apiId: owner.id, id: match[1] });
      return;
    }
    if (elementType === 'node' && kind === 'api') {
      this._selectedId = null;
      this.command({ kind: 'remove-api', id });
      return;
    }
    if (elementType === 'node' && kind === 'proxy-api') {
      this._selectedId = null;
      this.command({ kind: 'remove-proxy-api', id });
      return;
    }
    if (elementType === 'node' && kind === 'api-operation') {
      const owner = this.owningApiOf(id);
      if (!owner) return;
      this._selectedId = null;
      this.command({ kind: 'remove-api-operation', apiId: owner.id, id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'actor-use') {
      const match = /^use:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-actor-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'actor-ext') {
      const match = /^extdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-actor-external', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'ext-dep') {
      const match = /^xdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-external-dependency', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'proxy-target') {
      const match = /^pxt:(.+)->(.+)$/.exec(id);
      if (!match) return;
      // Only the real wiring is deletable — a rolled-up summary edge (host → host) is not.
      if (!(this.model.proxyApis ?? []).some((px) => px.id === match[1])) return;
      this._selectedId = null;
      this.command({ kind: 'set-proxy-target', id: match[1], targetId: '' });
      return;
    }
    if (elementType === 'node' && kind === 'module') {
      const hasAggregates = (this.model.aggregates ?? []).some((a) => a.moduleId === id);
      if (hasAggregates) return; // integrity guard: empty the module first
      this._selectedId = null;
      this.command({ kind: 'remove-module', id });
      return;
    }
    if (elementType === 'node' && kind === 'aggregate') {
      const hasEntities = (this.model.entities ?? []).some((x) => x.aggregateId === id);
      if (hasEntities) return;
      this._selectedId = null;
      this.command({ kind: 'remove-aggregate', id });
      return;
    }
    if (elementType === 'node' && kind === 'domain-event') {
      this._selectedId = null;
      this.command({ kind: 'remove-domain-event', id });
      return;
    }
    if (elementType === 'node' && kind === 'read-model') {
      this._selectedId = null;
      this.command({ kind: 'remove-read-model', id });
      return;
    }
    if (elementType === 'node' && kind === 'domain-service') {
      this._selectedId = null;
      this.command({ kind: 'remove-domain-service', id });
      return;
    }
    if (elementType === 'node' && kind === 'query-service') {
      this._selectedId = null;
      this.command({ kind: 'remove-query-service', id });
      return;
    }
    if (elementType === 'node' && kind === 'use-case') {
      this._selectedId = null;
      this.command({ kind: 'remove-use-case', id });
      return;
    }
    if (elementType === 'node' && kind === 'external-use-case') {
      this._selectedId = null;
      this.command({ kind: 'remove-external-use-case', id });
      return;
    }
    if (elementType === 'node' && kind === 'application-event') {
      this._selectedId = null;
      this.command({ kind: 'remove-application-event', id });
      return;
    }
    if (elementType === 'node' && kind === 'external-system') {
      this._selectedId = null;
      this.command({ kind: 'remove-external-system', id });
      return;
    }
    if (elementType === 'node' && kind === 'actor') {
      this._selectedId = null;
      this.command({ kind: 'remove-actor', id });
      return;
    }
    if (elementType === 'node' && kind === 'ai-agent') {
      this._selectedId = null;
      this.command({ kind: 'remove-ai-agent', id });
      return;
    }
    if (elementType === 'node' && kind === 'flow') {
      this._selectedId = null;
      this.command({ kind: 'remove-flow', id: id.replace(/^flow:/, '') });
      return;
    }
    if (elementType === 'node' && kind === 'process') {
      this._selectedId = null;
      this.command({ kind: 'remove-process', id });
      return;
    }
    if (elementType === 'node' && kind === 'process-step') {
      const owner = this.owningProcessOf(id);
      if (!owner) return;
      this._selectedId = null;
      this.command({ kind: 'remove-process-step', processId: owner.id, id });
    }
  }

  private owningProcessOf(stepId: string) {
    return (this.model.processes ?? []).find((p) => p.steps.some((s) => s.id === stepId));
  }

  private owningWorkflowOf(stepId: string) {
    return (this.model.workflows ?? []).find((w) => w.steps.some((s) => s.id === stepId));
  }

  private owningApiOf(operationId: string) {
    return (this.model.apis ?? []).find((a) => a.operations.some((o) => o.id === operationId));
  }

  private onNodeRenamed(e: CustomEvent): void {
    const { id, kind, name } = e.detail;
    if (
      kind === 'module' ||
      kind === 'aggregate' ||
      kind === 'entity' ||
      kind === 'process-step' ||
      kind === 'workflow' ||
      kind === 'workflow-step' ||
      kind === 'domain-event' ||
      kind === 'read-model' ||
      kind === 'domain-service' ||
      kind === 'query-service' ||
      kind === 'use-case' ||
      kind === 'external-use-case' ||
      kind === 'external-table' ||
      kind === 'application-event' ||
      kind === 'external-system' ||
      kind === 'actor' ||
      kind === 'ai-agent' ||
      kind === 'rag' ||
      kind === 'api' ||
      kind === 'proxy-api' ||
      kind === 'api-operation'
    ) {
      this.command({ kind: 'rename-element', type: kind, id: id.replace(/^tgt:/, ''), name });
    }
  }

  private addStepFromToolbar(): void {
    const name = this._newStepName.trim();
    if (!name || !this._selectedId) return;
    const selectedProcess = (this.model.processes ?? []).find((p) => p.id === this._selectedId);
    const owner = selectedProcess ?? this.owningProcessOf(this._selectedId);
    if (!owner) return;
    const afterStepId = selectedProcess
      ? undefined // process selected → append at the end
      : this._selectedId;
    this.command({
      kind: 'add-process-step',
      processId: owner.id,
      id: `step-${slug(name)}`,
      name,
      stepType: this._newStepType,
      roleId: this._newStepType === 'HUMAN' ? this._newStepRole.trim() || undefined : undefined,
      deadline: this._newStepType === 'HUMAN' ? this._newStepDeadline.trim() || undefined : undefined,
      afterStepId,
    });
    this._newStepName = '';
    this._newStepDeadline = '';
  }

  private addWorkflowStepFromToolbar(): void {
    const name = this._newStepName.trim();
    if (!name || !this._selectedId) return;
    const selectedWorkflow = (this.model.workflows ?? []).find((w) => w.id === this._selectedId);
    const owner = selectedWorkflow ?? this.owningWorkflowOf(this._selectedId);
    if (!owner) return;
    this.command({
      kind: 'add-workflow-step',
      workflowId: owner.id,
      id: `wfstep-${slug(name)}`,
      name,
      emittedEventName: this._newStepEmits.trim() || undefined,
      targetUseCaseId: this._newStepUseCase || undefined,
      // Dragging a step onto another declares dependencies later; a selected
      // step is the natural predecessor of the new one.
      dependsOnStepIds: selectedWorkflow ? undefined : [this._selectedId],
      afterStepId: selectedWorkflow ? undefined : this._selectedId,
    });
    this._newStepName = '';
    this._newStepEmits = '';
  }

  private applyWorkflowStepEdit(): void {
    const stepId = this._selectedId;
    const owner = stepId ? this.owningWorkflowOf(stepId) : undefined;
    if (!stepId || !owner) return;
    this.command({
      kind: 'update-workflow-step',
      workflowId: owner.id,
      id: stepId,
      emittedEventName: this._editStepEmits.trim() || undefined,
      targetUseCaseId: this._editStepUseCase || undefined,
      completionEventName: this._editStepAwaits.trim() || undefined,
    });
  }

  private addRagContentSourceFromToolbar(): void {
    const uri = this._newRagSourceUri.trim();
    const ragId = this._selectedId;
    if (!uri || !ragId || !(this.model.rags ?? []).some((r) => r.id === ragId)) return;
    this.command({
      kind: 'add-rag-content-source',
      sourceId: ragId,
      type: this._newRagSourceType,
      uri,
    });
    this._newRagSourceUri = '';
  }

  /** Candidates for the add-to-view search: catalog elements not yet in the view. */
  private viewMemberCandidates(): { id: string; name: string; kind: string }[] {
    const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
    if (!view) return [];
    const members = new Set(view.memberIds);
    return [
      ...this.model.modules.map((m) => ({ id: m.id, name: m.name, kind: 'contexto' })),
      ...this.model.externalSystems.map((x) => ({ id: x.id, name: x.name, kind: 'externo' })),
      ...(this.model.aggregates ?? []).map((a) => ({ id: a.id, name: a.name, kind: 'agregado' })),
      ...this.model.flows.map((f) => ({ id: f.id, name: f.name, kind: 'flow' })),
      ...(this.model.processes ?? []).map((p) => ({ id: p.id, name: p.name, kind: 'proceso' })),
      ...(this.model.workflows ?? []).map((w) => ({ id: w.id, name: w.name, kind: 'workflow' })),
    ].filter((c) => !members.has(c.id));
  }

  private addMemberFromToolbar(): void {
    const key = this._addMemberKey.trim();
    if (!key || !this._activeViewId) return;
    const candidate = this.viewMemberCandidates().find(
      (c) => `${c.name} (${c.id})` === key || c.id === key || c.name === key,
    );
    if (!candidate) return;
    this.command({ kind: 'add-view-member', id: this._activeViewId, targetId: candidate.id });
    this._addMemberKey = '';
  }

  private onElementSelected(e: CustomEvent): void {
    this._selectedId = e.detail.id;
    this._multi = [];
    if (e.detail.kind === 'process-step') {
      const step = this.owningProcessOf(e.detail.id)?.steps.find((s) => s.id === e.detail.id);
      this._editStepRole = step?.roleId ?? '';
      this._editStepDeadline = step?.deadline ?? '';
      this._editStepComp = step?.compensationUseCaseId ?? '';
    }
    if (e.detail.kind === 'workflow-step') {
      const step = this.owningWorkflowOf(e.detail.id)?.steps.find((s) => s.id === e.detail.id);
      this._editStepUseCase = step?.targetUseCaseId ?? '';
      this._editStepEmits = step?.emittedEventName ?? '';
      this._editStepAwaits = step?.completionEventName ?? '';
    }
    this.emit('modux-select', { elementType: e.detail.kind, id: e.detail.id });
  }

  private onMultiToggled(e: CustomEvent): void {
    const { id } = e.detail;
    this._multi = this._multi.includes(id)
      ? this._multi.filter((x) => x !== id)
      : [...this._multi, id];
  }

  private onNodesBoxed(e: CustomEvent): void {
    this._multi = e.detail.ids;
  }

  /** Canvas node ids → catalog element ids (view members). */
  private memberIdsFromSelection(): string[] {
    const scene = this.sceneFor(this._view);
    const members = new Set<string>();
    for (const id of this._multi) {
      const node = scene.nodes.find((n) => n.id === id);
      if (!node) continue;
      switch (node.kind) {
        case 'module':
        case 'external-system':
          members.add(id.replace(/^tgt:/, ''));
          break;
        case 'aggregate':
        case 'entity':
        case 'process':
        case 'workflow':
          members.add(id);
          break;
        case 'flow':
          members.add(id.replace(/^flow:/, ''));
          break;
        case 'process-step': {
          const owner = this.owningProcessOf(id);
          if (owner) members.add(owner.id);
          break;
        }
        case 'workflow-step': {
          const owner = this.owningWorkflowOf(id);
          if (owner) members.add(owner.id);
          break;
        }
        default:
          break; // compensations / completion events are derived, not catalog elements
      }
    }
    return [...members];
  }

  private createViewFromSelection(): void {
    const name = this._newViewName.trim();
    const memberIds = this.memberIdsFromSelection();
    if (!name || !memberIds.length) return;
    this.command({ kind: 'add-view', id: `view-${slug(name)}`, name, memberIds });
    this._newViewName = '';
    this._multi = [];
  }

  /** Model scoped to the active modux View (CURATED members + their context). */
  private filteredModel(): ModuxModel {
    if (!this._activeViewId) return this.model;
    const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
    if (!view) return this.model;
    const members = new Set(view.memberIds);
    const modules = this.model.modules.filter((m) => members.has(m.id));
    const moduleIds = new Set(modules.map((m) => m.id));
    const externalSystems = this.model.externalSystems.filter((x) => members.has(x.id));
    const externalIds = new Set(externalSystems.map((x) => x.id));
    const aggregates = (this.model.aggregates ?? []).filter(
      (a) => members.has(a.id) || moduleIds.has(a.moduleId),
    );
    const aggregateIds = new Set(aggregates.map((a) => a.id));
    return {
      ...this.model,
      modules,
      externalSystems,
      relations: this.model.relations.filter(
        (r) => moduleIds.has(r.sourceId) && moduleIds.has(r.targetId),
      ),
      flows: this.model.flows.filter(
        (f) =>
          members.has(f.id) ||
          ((moduleIds.has(f.sourceId) || externalIds.has(f.sourceId)) &&
            (moduleIds.has(f.targetId) || externalIds.has(f.targetId))),
      ),
      aggregates,
      entities: (this.model.entities ?? []).filter((e) => aggregateIds.has(e.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (r) => aggregateIds.has(r.sourceAggregateId) && aggregateIds.has(r.targetAggregateId),
      ),
      processes: (this.model.processes ?? []).filter(
        (p) => members.has(p.id) || (p.ownerModuleId ? moduleIds.has(p.ownerModuleId) : false),
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((w) => members.has(w.id)),
    };
  }

  private applyStepEdit(): void {
    const stepId = this._selectedId;
    const owner = stepId ? this.owningProcessOf(stepId) : undefined;
    if (!stepId || !owner) return;
    this.command({
      kind: 'update-process-step',
      processId: owner.id,
      id: stepId,
      roleId: this._editStepRole.trim() || undefined,
      deadline: this._editStepDeadline.trim() || undefined,
      compensationUseCaseId: this._editStepComp.trim() || undefined,
    });
  }

  private onElementActivated(e: CustomEvent): void {
    // Double-clicking a relation's label edits its type rather than opening a CRUD.
    if (this._view === 'context-map' && e.detail.elementType === 'edge' && e.detail.kind === 'relation') {
      const m = /^rel:(.+)->(.+)$/.exec(e.detail.id);
      if (m) {
        this._relationPicker = {
          sourceId: m[1],
          targetId: m[2],
          mode: 'edit',
          x: e.detail.x ?? 0,
          y: e.detail.y ?? 0,
        };
      }
      return;
    }
    const mapped =
      e.detail.kind === 'process-step'
        ? activationForStep(this.model.processes, e.detail.id)
        : e.detail.kind === 'workflow-step'
          ? (() => {
              const owner = this.owningWorkflowOf(e.detail.id);
              return owner ? { elementType: 'workflow', id: owner.id } : null;
            })()
          : normalizeActivation(e.detail.id, e.detail.kind);
    if (mapped) this.emit('modux-activate', mapped);
  }

  private createElementFromToolbar(): void {
    const name = this._newName.trim();
    if (!name) return;
    if (this._view === 'context-map') {
      if (this._newContextMapKind === 'external-system') {
        this.command({ kind: 'add-external-system', id: `ext-${slug(name)}`, name });
      } else if (this._newContextMapKind === 'actor') {
        this.command({ kind: 'add-actor', id: slug(name), name });
      } else if (this._newContextMapKind === 'ai-agent') {
        this.command({ kind: 'add-ai-agent', id: `agent-${slug(name)}`, name });
      } else if (this._newContextMapKind === 'rag') {
        this.command({ kind: 'add-rag', id: `rag-${slug(name)}`, name });
      } else if (this._newContextMapKind === 'api') {
        this.command({ kind: 'add-api', id: `api-${slug(name)}`, name });
      } else if (this._newContextMapKind === 'proxy-api') {
        this.command({ kind: 'add-proxy-api', id: `proxy-${slug(name)}`, name });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'api-operation') {
        const selected = (this.model.apis ?? []).find((a) => a.id === this._selectedId)?.id;
        const apiId = this._newApiId || selected || this.model.apis?.[0]?.id;
        if (!apiId) return;
        this.command({
          kind: 'add-api-operation',
          apiId,
          id: `apiop-${apiId.replace(/^api-/, '')}-${slug(name)}`,
          name,
        });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'domain-event') {
        // A selected context is the natural owner; the dropdown can override it.
        const selected = this.model.modules.find((m) => m.id === this._selectedId)?.id;
        const moduleId = this._newModuleId || selected || this.model.modules[0]?.id;
        if (!moduleId) return;
        this.command({ kind: 'add-domain-event', id: `ev-${slug(name)}`, name, moduleId });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'application-event') {
        const selected = this.model.modules.find((m) => m.id === this._selectedId)?.id;
        const moduleId = this._newModuleId || selected || this.model.modules[0]?.id;
        if (!moduleId) return;
        this.command({ kind: 'add-application-event', id: `aev-${slug(name)}`, name, moduleId });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'domain-service') {
        const selected = this.model.modules.find((m) => m.id === this._selectedId)?.id;
        const moduleId = this._newModuleId || selected || this.model.modules[0]?.id;
        if (!moduleId) return;
        this.command({ kind: 'add-domain-service', id: `ds-${slug(name)}`, name, moduleId });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'query-service') {
        const selected = this.model.modules.find((m) => m.id === this._selectedId)?.id;
        const moduleId = this._newModuleId || selected || this.model.modules[0]?.id;
        if (!moduleId) return;
        this.command({ kind: 'add-query-service', id: `qs-${slug(name)}`, name, moduleId });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'use-case') {
        const selected = this.model.modules.find((m) => m.id === this._selectedId)?.id;
        const moduleId = this._newModuleId || selected || this.model.modules[0]?.id;
        if (!moduleId) return;
        this.command({ kind: 'add-use-case', id: `uc-${slug(name)}`, name, moduleId });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'policy') {
        const selected = this.model.modules.find((m) => m.id === this._selectedId)?.id;
        const moduleId = this._newModuleId || selected || this.model.modules[0]?.id;
        if (!moduleId) return;
        this.command({ kind: 'add-use-case', id: `uc-${slug(name)}`, name, moduleId, policy: true });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'external-use-case') {
        const selected = this.model.externalSystems.find((x) => x.id === this._selectedId)?.id;
        const externalId = this._newExternalId || selected || this.model.externalSystems[0]?.id;
        if (!externalId) return;
        this.command({
          kind: 'add-external-use-case',
          id: `xuc-${slug(name)}`,
          name,
          moduleId: externalId,
        });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'external-table') {
        const selected = this.model.externalSystems.find((x) => x.id === this._selectedId)?.id;
        const externalId = this._newExternalId || selected || this.model.externalSystems[0]?.id;
        if (!externalId) return;
        this.command({
          kind: 'add-external-table',
          id: `tbl-${slug(name)}`,
          name,
          moduleId: externalId,
        });
      } else if (this._detail !== 'contexts' && this._newContextMapKind === 'read-model') {
        // A read model is a view of an aggregate; a selected aggregate is the default.
        const selected = (this.model.aggregates ?? []).find((a) => a.id === this._selectedId)?.id;
        const aggregateId = this._newAggregateId || selected || this.model.aggregates?.[0]?.id;
        if (!aggregateId) return;
        this.command({ kind: 'add-read-model', id: `rm-${slug(name)}`, name, aggregateId });
      } else {
        this.command({
          kind: 'add-module',
          id: `mod-${slug(name)}`,
          name,
          subdomainType: this._newSubdomain,
        });
      }
    } else if (this._view === 'aggregates') {
      const moduleId = this._newModuleId || this.model.modules[0]?.id;
      if (!moduleId) return;
      this.command({ kind: 'add-aggregate', id: `agg-${slug(name)}`, name, moduleId });
    } else if (this._view === 'flows') {
      const triggerAggregateId = this._newTriggerAggId || this.model.aggregates?.[0]?.id;
      const targetId = this._newTargetId || this.model.modules[0]?.id;
      const triggerEvent = this._newTriggerEvent.trim();
      if (!triggerAggregateId || !targetId || !triggerEvent) return;
      this.command({
        kind: 'add-flow',
        id: `flow-${slug(name)}`,
        name,
        archetype: this._newArchetype,
        triggerAggregateId,
        triggerEvent,
        targetId,
      });
      this._newTriggerEvent = '';
    } else if (this._view === 'processes') {
      const moduleId = this._newModuleId || this.model.modules[0]?.id;
      if (!moduleId) return;
      this.command({
        kind: 'add-process',
        id: `proc-${slug(name)}`,
        name,
        moduleId,
        triggerAggregateId: this._newTriggerAggId || this.model.aggregates?.[0]?.id,
        triggerEvent: this._newTriggerEvent.trim() || undefined,
      });
      this._newTriggerEvent = '';
    } else if (this._view === 'workflows') {
      // No owner module on purpose: a workflow lives outside the bounded contexts.
      this.command({
        kind: 'add-workflow',
        id: `wf-${slug(name)}`,
        name,
        triggerAggregateId: this._newTriggerAggId || this.model.aggregates?.[0]?.id,
        triggerEvent: this._newTriggerEvent.trim() || undefined,
        completionEventName: `${name.replace(/\s+/g, '')}Completado`,
      });
      this._newTriggerEvent = '';
    }
    this._newName = '';
  }

  private sceneFor(view: ViewId) {
    const vl = this.viewLayout(view);
    const model = this.filteredModel();
    const scene =
      view === 'aggregates'
        ? aggregatesScene(model, vl.nodes)
        : view === 'flows'
          ? flowsScene(model, vl.nodes)
          : view === 'processes'
            ? processesScene(model, vl.nodes)
            : view === 'workflows'
              ? workflowsScene(model, vl.nodes)
              : view === 'eventstorming'
                ? eventstormingScene(model, vl.nodes)
                : contextMapScene(model, vl.nodes, this._detail, vl.sizes ?? {});
    // On a solution, ring what differs from the system (node ids carry view prefixes).
    if (this.diff) {
      for (const node of scene.nodes) {
        const kind = this.diff[node.id] ?? this.diff[node.id.replace(/^(tgt:|flow:)/, '')];
        if (kind) node.diffKind = kind;
      }
    }
    return scene;
  }

  /** ELK layout for the current view, applied as ONE undoable composite move. */
  private async runAutoLayout(): Promise<void> {
    const view = this._view;
    const scene = this.sceneFor(view);
    if (!scene.nodes.length) return;
    // Nested children (aggregates/use cases) are derived from their container's
    // position, so only top-level nodes take part in the layout.
    const topNodes = scene.nodes.filter((n) => !n.parentId);
    const topIds = new Set(topNodes.map((n) => n.id));
    const layoutScene = {
      nodes: topNodes,
      edges: scene.edges.filter((e) => topIds.has(e.sourceId) && topIds.has(e.targetId)),
    };
    const algorithm =
      view === 'flows' || view === 'processes' || view === 'workflows' || view === 'eventstorming'
        ? 'layered'
        : 'force';
    const positions = await autoLayout(layoutScene, algorithm);
    const current = this.viewLayout(view);
    this.pushUndoEntry([
      ...topNodes.map((n) => ({
        kind: 'move-node' as const,
        view,
        id: n.id,
        pos: current.nodes[n.id] ?? null,
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(current.edges).map((edgeId) => ({
        kind: 'set-edge-points' as const,
        view,
        id: edgeId,
        points: current.edges[edgeId],
      })),
    ]);
    // Keep container sizes; children re-grid inside them from the default.
    this.writeViewLayout(view, { nodes: positions, edges: {}, sizes: current.sizes });
    await this.updateComplete;
    this.renderRoot.querySelector('modux-canvas')?.fit();
  }

  render() {
    const scene = this.sceneFor(this._view);
    return html`
      <div class="toolbar">
        <div class="tabs">
          ${VIEWS.map(
            (v) => html`
              <button
                class="tab"
                ?data-active=${this._view === v.id}
                ?disabled=${!v.ready}
                title=${v.ready ? '' : 'Próximamente'}
                @click=${() => (this._view = v.id)}
              >
                ${v.label}
              </button>
            `,
          )}
        </div>
        <select
          title="Limitar el lienzo a una vista del modelo"
          @change=${(e: Event) => (this._activeViewId = (e.target as HTMLSelectElement).value)}
        >
          <option value="" ?selected=${this._activeViewId === ''}>Vista: todo el modelo</option>
          ${(this.model.views ?? [])
            .filter((v) => v.kind === 'CURATED')
            .map(
              (v) =>
                html`<option value=${v.id} ?selected=${v.id === this._activeViewId}>
                  Vista: ${v.name}
                </option>`,
            )}
        </select>
        ${this._activeViewId
          ? html`
              <input
                class="new-name"
                list="view-member-options"
                placeholder="Añadir a la vista…"
                title="Busca un elemento existente del catálogo y añádelo a la vista activa"
                .value=${this._addMemberKey}
                @input=${(e: Event) => (this._addMemberKey = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.addMemberFromToolbar()}
              />
              <datalist id="view-member-options">
                ${this.viewMemberCandidates().map(
                  (c) => html`<option value="${c.name} (${c.id})">${c.kind}</option>`,
                )}
              </datalist>
              <button class="tab" title="Añadir el elemento a la vista" @click=${this.addMemberFromToolbar}>
                ＋ Añadir
              </button>
            `
          : ''}
        <div class="spacer"></div>
        ${this._multi.length
          ? html`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                .value=${this._newViewName}
                @input=${(e: Event) => (this._newViewName = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.createViewFromSelection()}
              />
              <button class="tab" title="Crear una vista modux con la selección" @click=${this.createViewFromSelection}>
                ⊞ Vista (${this._multi.length})
              </button>
              <span class="sep"></span>
            `
          : ''}
        <input
          class="new-name"
          ?hidden=${this._view === 'eventstorming'}
          placeholder=${{
            'context-map':
              this._newContextMapKind === 'external-system'
                ? 'Nuevo sistema externo…'
                : this._newContextMapKind === 'actor'
                  ? 'Nuevo actor…'
                  : this._newContextMapKind === 'ai-agent'
                    ? 'Nuevo agente de IA…'
                    : this._newContextMapKind === 'rag'
                      ? 'Nuevo RAG…'
                      : this._newContextMapKind === 'api'
                        ? 'Nueva API…'
                        : this._newContextMapKind === 'proxy-api'
                          ? 'Nuevo proxy API…'
                  : this._detail === 'contexts' || this._newContextMapKind === 'module'
                    ? 'Nuevo contexto…'
                    : this._newContextMapKind === 'domain-event'
                  ? 'Nuevo evento de dominio…'
                      : this._newContextMapKind === 'application-event'
                        ? 'Nuevo evento de aplicación…'
                        : this._newContextMapKind === 'domain-service'
                          ? 'Nuevo servicio de dominio…'
                          : this._newContextMapKind === 'policy'
                            ? 'Nueva policy…'
                            : this._newContextMapKind === 'use-case'
                              ? 'Nuevo caso de uso…'
                              : this._newContextMapKind === 'query-service'
                                ? 'Nuevo query service…'
                                : this._newContextMapKind === 'external-use-case'
                                  ? 'Nuevo caso de uso externo…'
                                  : this._newContextMapKind === 'external-table'
                                    ? 'Nueva tabla externa…'
                                    : this._newContextMapKind === 'api-operation'
                                      ? 'Nueva operación de API…'
                                      : 'Nuevo read model…',
            aggregates: 'Nuevo agregado…',
            flows: 'Nuevo flow…',
            processes: 'Nuevo proceso…',
            workflows: 'Nuevo workflow…',
            eventstorming: '',
          }[this._view]}
          .value=${this._newName}
          @input=${(e: Event) => (this._newName = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.createElementFromToolbar()}
        />
        ${this._view === 'context-map'
          ? html`<select
              title="Qué crear en el lienzo"
              @change=${(e: Event) =>
                (this._newContextMapKind = (e.target as HTMLSelectElement)
                  .value as typeof this._newContextMapKind)}
            >
              <option value="module" ?selected=${this._newContextMapKind === 'module'}>
                Contexto
              </option>
              <option
                value="external-system"
                ?selected=${this._newContextMapKind === 'external-system'}
              >
                Sistema externo
              </option>
              <option value="actor" ?selected=${this._newContextMapKind === 'actor'}>
                Actor
              </option>
              <option value="ai-agent" ?selected=${this._newContextMapKind === 'ai-agent'}>
                Agente de IA
              </option>
              <option value="rag" ?selected=${this._newContextMapKind === 'rag'}>
                RAG (base de conocimiento)
              </option>
              <option value="api" ?selected=${this._newContextMapKind === 'api'}>
                API publicada
              </option>
              <option value="proxy-api" ?selected=${this._newContextMapKind === 'proxy-api'}>
                Proxy API
              </option>
              ${this._detail !== 'contexts'
                ? html`
                    <option
                      value="domain-event"
                      ?selected=${this._newContextMapKind === 'domain-event'}
                    >
                      Evento de dominio
                    </option>
                    <option
                      value="application-event"
                      ?selected=${this._newContextMapKind === 'application-event'}
                    >
                      Evento de aplicación
                    </option>
                    <option
                      value="read-model"
                      ?selected=${this._newContextMapKind === 'read-model'}
                    >
                      Read model
                    </option>
                    <option
                      value="domain-service"
                      ?selected=${this._newContextMapKind === 'domain-service'}
                    >
                      Servicio de dominio
                    </option>
                    <option
                      value="query-service"
                      ?selected=${this._newContextMapKind === 'query-service'}
                    >
                      Query service
                    </option>
                    <option value="use-case" ?selected=${this._newContextMapKind === 'use-case'}>
                      Caso de uso
                    </option>
                    <option value="policy" ?selected=${this._newContextMapKind === 'policy'}>
                      Policy
                    </option>
                    <option
                      value="external-use-case"
                      ?selected=${this._newContextMapKind === 'external-use-case'}
                    >
                      Caso de uso externo
                    </option>
                    <option
                      value="external-table"
                      ?selected=${this._newContextMapKind === 'external-table'}
                    >
                      Tabla externa (legacy)
                    </option>
                    <option
                      value="api-operation"
                      ?selected=${this._newContextMapKind === 'api-operation'}
                    >
                      Operación de API
                    </option>
                  `
                : ''}
            </select>`
          : ''}
        ${this._view === 'context-map' &&
        this._detail !== 'contexts' &&
        (this._newContextMapKind === 'external-use-case' ||
          this._newContextMapKind === 'external-table')
          ? html`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(e: Event) => (this._newExternalId = (e.target as HTMLSelectElement).value)}
            >
              ${this.model.externalSystems.map(
                (x) =>
                  html`<option
                    value=${x.id}
                    ?selected=${x.id === (this._newExternalId || this.model.externalSystems[0]?.id)}
                  >
                    ${x.name}
                  </option>`,
              )}
            </select>`
          : ''}
        ${this._view === 'context-map' &&
        this._detail !== 'contexts' &&
        this._newContextMapKind === 'api-operation'
          ? html`<select
              title="API dueña de la nueva operación"
              @change=${(e: Event) => (this._newApiId = (e.target as HTMLSelectElement).value)}
            >
              ${(this.model.apis ?? []).map(
                (a) =>
                  html`<option
                    value=${a.id}
                    ?selected=${a.id === (this._newApiId || this.model.apis?.[0]?.id)}
                  >
                    ${a.name}
                  </option>`,
              )}
            </select>`
          : ''}
        ${this._view === 'context-map' &&
        this._detail !== 'contexts' &&
        this._newContextMapKind === 'read-model'
          ? html`<select
              title="Agregado del que es vista el read model"
              @change=${(e: Event) => (this._newAggregateId = (e.target as HTMLSelectElement).value)}
            >
              ${(this.model.aggregates ?? []).map(
                (a) =>
                  html`<option
                    value=${a.id}
                    ?selected=${a.id === (this._newAggregateId || this.model.aggregates?.[0]?.id)}
                  >
                    ${a.name}
                  </option>`,
              )}
            </select>`
          : ''}
        ${this._view === 'context-map' && this._newContextMapKind === 'module'
          ? html`<select
              title="Subdominio del nuevo contexto"
              @change=${(e: Event) =>
                (this._newSubdomain = (e.target as HTMLSelectElement).value as SubdomainType)}
            >
              ${SUBDOMAIN_TYPES.map(
                (t) => html`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`,
              )}
            </select>`
          : ''}
        ${this._view === 'aggregates' ||
        this._view === 'processes' ||
        (this._view === 'context-map' &&
          this._detail !== 'contexts' &&
          (this._newContextMapKind === 'domain-event' ||
            this._newContextMapKind === 'application-event' ||
            this._newContextMapKind === 'domain-service' ||
            this._newContextMapKind === 'query-service' ||
            this._newContextMapKind === 'use-case' ||
            this._newContextMapKind === 'policy'))
          ? html`<select
              title=${this._view === 'aggregates'
                ? 'Módulo del nuevo agregado'
                : this._view === 'processes'
                  ? 'Módulo dueño del proceso'
                  : 'Contexto dueño del nuevo elemento'}
              @change=${(e: Event) => (this._newModuleId = (e.target as HTMLSelectElement).value)}
            >
              ${this.model.modules.map(
                (m) =>
                  html`<option
                    value=${m.id}
                    ?selected=${m.id === (this._newModuleId || this.model.modules[0]?.id)}
                  >
                    ${m.name}
                  </option>`,
              )}
            </select>`
          : ''}
        ${this._view === 'flows' || this._view === 'processes' || this._view === 'workflows'
          ? html`
              ${this._view === 'flows'
                ? html`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(e: Event) =>
                      (this._newArchetype = (e.target as HTMLSelectElement).value)}
                  >
                    ${['MATERIALIZES', 'TRIGGERS', 'ORCHESTRATES', 'NOTIFIES'].map(
                      (a) =>
                        html`<option value=${a} ?selected=${a === this._newArchetype}>${a}</option>`,
                    )}
                  </select>`
                : ''}
              <select
                title="Agregado que dispara"
                @change=${(e: Event) => (this._newTriggerAggId = (e.target as HTMLSelectElement).value)}
              >
                ${(this.model.aggregates ?? []).map(
                  (a) =>
                    html`<option
                      value=${a.id}
                      ?selected=${a.id === (this._newTriggerAggId || this.model.aggregates?.[0]?.id)}
                    >
                      ${a.name}
                    </option>`,
                )}
              </select>
              <input
                class="new-name evt"
                placeholder="Evento trigger…"
                .value=${this._newTriggerEvent}
                @input=${(e: Event) => (this._newTriggerEvent = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) =>
                  e.key === 'Enter' && this.createElementFromToolbar()}
              />
              ${this._view === 'flows'
                ? html`<select
                    title="Destino del nuevo flow"
                    @change=${(e: Event) => (this._newTargetId = (e.target as HTMLSelectElement).value)}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
                      (t) =>
                        html`<option
                          value=${t.id}
                          ?selected=${t.id === (this._newTargetId || this.model.modules[0]?.id)}
                        >
                          ${t.name}
                        </option>`,
                    )}
                  </select>`
                : ''}
            `
          : ''}
        <button
          class="tab"
          ?hidden=${this._view === 'eventstorming'}
          @click=${this.createElementFromToolbar}
        >
          ＋ Crear
        </button>
        <input
          type="file"
          hidden
          accept=".json,.yaml,.yml,.wsdl,.xml"
          @change=${this.onImportApiFile}
        />
        <button
          class="tab"
          ?hidden=${this._view !== 'context-map'}
          title=${this.selectedApiId()
            ? 'Importa un OpenAPI/WSDL sobre la API seleccionada (operaciones y modelos rq/rs)'
            : 'Importa un OpenAPI/WSDL como una nueva API del diagrama'}
          @click=${(e: Event) =>
            ((e.currentTarget as HTMLElement).previousElementSibling as HTMLInputElement).click()}
        >
          ⇪ Importar API${this.selectedApiId() ? ' aquí' : '…'}
        </button>
        ${this._view === 'context-map' &&
        this._selectedId &&
        (this.model.rags ?? []).some((r) => r.id === this._selectedId)
          ? html`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(e: Event) =>
                  (this._newRagSourceType = (e.target as HTMLSelectElement).value)}
              >
                ${['WEB', 'REPO', 'FTP'].map(
                  (t) =>
                    html`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`,
                )}
              </select>
              <input
                class="new-name"
                placeholder="URI de la fuente…"
                title="Repo, web o servidor FTP que alimenta el RAG"
                .value=${this._newRagSourceUri}
                @input=${(e: Event) =>
                  (this._newRagSourceUri = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) =>
                  e.key === 'Enter' && this.addRagContentSourceFromToolbar()}
              />
              <button
                class="tab"
                title="Añadir la fuente de contenido al RAG seleccionado"
                @click=${this.addRagContentSourceFromToolbar}
              >
                ＋ Fuente
              </button>
            `
          : ''}
        ${this._view === 'processes' &&
        this._selectedId &&
        ((this.model.processes ?? []).some((p) => p.id === this._selectedId) ||
          this.owningProcessOf(this._selectedId))
          ? html`
              <span class="sep"></span>
              <input
                class="new-name evt"
                placeholder="Nuevo paso…"
                .value=${this._newStepName}
                @input=${(e: Event) => (this._newStepName = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.addStepFromToolbar()}
              />
              <select
                title="Tipo de paso"
                @change=${(e: Event) =>
                  (this._newStepType = (e.target as HTMLSelectElement).value as
                    | 'AUTOMATED'
                    | 'HUMAN')}
              >
                ${['AUTOMATED', 'HUMAN'].map(
                  (t) => html`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`,
                )}
              </select>
              ${this._newStepType === 'HUMAN'
                ? html`<input
                      class="new-name evt"
                      placeholder="Rol…"
                      .value=${this._newStepRole}
                      @input=${(e: Event) =>
                        (this._newStepRole = (e.target as HTMLInputElement).value)}
                    /><input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del nuevo paso"
                      .value=${this._newStepDeadline}
                      @input=${(e: Event) =>
                        (this._newStepDeadline = (e.target as HTMLInputElement).value)}
                    />`
                : ''}
              <button class="tab" title="Añadir paso tras la selección" @click=${this.addStepFromToolbar}>
                ＋ Paso
              </button>
              ${this.owningProcessOf(this._selectedId)
                ? html`
                    <span class="sep"></span>
                    <input
                      class="new-name evt"
                      placeholder="Rol…"
                      title="Rol del paso seleccionado (HUMAN)"
                      .value=${this._editStepRole}
                      @input=${(e: Event) =>
                        (this._editStepRole = (e.target as HTMLInputElement).value)}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del paso seleccionado"
                      .value=${this._editStepDeadline}
                      @input=${(e: Event) =>
                        (this._editStepDeadline = (e.target as HTMLInputElement).value)}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Compensación…"
                      title="Use case de compensación del paso seleccionado"
                      .value=${this._editStepComp}
                      @input=${(e: Event) =>
                        (this._editStepComp = (e.target as HTMLInputElement).value)}
                    />
                    <button class="tab" title="Aplicar cambios al paso" @click=${this.applyStepEdit}>
                      ✓ Aplicar
                    </button>
                  `
                : ''}
            `
          : ''}
        ${this._view === 'workflows' &&
        this._selectedId &&
        ((this.model.workflows ?? []).some((w) => w.id === this._selectedId) ||
          this.owningWorkflowOf(this._selectedId))
          ? html`
              <span class="sep"></span>
              <input
                class="new-name evt"
                placeholder="Nuevo paso…"
                .value=${this._newStepName}
                @input=${(e: Event) => (this._newStepName = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) =>
                  e.key === 'Enter' && this.addWorkflowStepFromToolbar()}
              />
              <select
                title="Caso de uso que lanza el nuevo paso"
                @change=${(e: Event) => (this._newStepUseCase = (e.target as HTMLSelectElement).value)}
              >
                <option value="" ?selected=${this._newStepUseCase === ''}>— sin use case —</option>
                ${this.model.modules
                  .flatMap((m) => m.useCases ?? [])
                  .map(
                    (u) =>
                      html`<option value=${u.id} ?selected=${u.id === this._newStepUseCase}>
                        ${u.name}
                      </option>`,
                  )}
              </select>
              <input
                class="new-name evt"
                placeholder="Evento que emite…"
                title="Evento que el workflow emite para arrancar el paso"
                .value=${this._newStepEmits}
                @input=${(e: Event) => (this._newStepEmits = (e.target as HTMLInputElement).value)}
              />
              <button
                class="tab"
                title="Añadir paso (workflow seleccionado = suelto; paso seleccionado = dependiente de él)"
                @click=${this.addWorkflowStepFromToolbar}
              >
                ＋ Paso
              </button>
              ${this.owningWorkflowOf(this._selectedId)
                ? html`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(e: Event) =>
                        (this._editStepUseCase = (e.target as HTMLSelectElement).value)}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ''}>
                        — sin use case —
                      </option>
                      ${this.model.modules
                        .flatMap((m) => m.useCases ?? [])
                        .map(
                          (u) =>
                            html`<option value=${u.id} ?selected=${u.id === this._editStepUseCase}>
                              ${u.name}
                            </option>`,
                        )}
                    </select>
                    <input
                      class="new-name evt"
                      placeholder="Emite…"
                      title="Evento que arranca el paso seleccionado"
                      .value=${this._editStepEmits}
                      @input=${(e: Event) =>
                        (this._editStepEmits = (e.target as HTMLInputElement).value)}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Espera…"
                      title="Evento que marca el paso como completado"
                      .value=${this._editStepAwaits}
                      @input=${(e: Event) =>
                        (this._editStepAwaits = (e.target as HTMLInputElement).value)}
                    />
                    <button
                      class="tab"
                      title="Aplicar cambios al paso"
                      @click=${this.applyWorkflowStepEdit}
                    >
                      ✓ Aplicar
                    </button>
                  `
                : ''}
            `
          : ''}
        <button
          class="tab"
          title="Deshacer el último cambio (Ctrl+Z)"
          ?disabled=${this._undoStack.length === 0}
          @click=${this.undo}
        >
          ↶ Deshacer
        </button>
        <button
          class="tab"
          title="Rehacer (Ctrl+Shift+Z / Ctrl+Y)"
          ?disabled=${this._redoStack.length === 0}
          @click=${this.redo}
        >
          ↷ Rehacer
        </button>
        <label ?hidden=${this._view !== 'context-map'}>Detalle:</label>
        <select
          ?hidden=${this._view !== 'context-map'}
          title="Nivel de detalle: contextos, sus agregados y casos de uso, o las operaciones de las APIs"
          .value=${this._detail}
          @change=${(e: Event) =>
            this.setDetail(
              (e.target as HTMLSelectElement).value as 'contexts' | 'detail' | 'operations',
            )}
        >
          <option value="contexts" ?selected=${this._detail === 'contexts'}>Contextos</option>
          <option value="detail" ?selected=${this._detail === 'detail'}>
            Agregados y casos de uso
          </option>
          <option value="operations" ?selected=${this._detail === 'operations'}>
            APIs y operaciones
          </option>
        </select>
        <button
          class="tab"
          title="Ajustar el diagrama a la ventana"
          @click=${() => this.renderRoot.querySelector('modux-canvas')?.fit()}
        >
          ⌖ Ajustar
        </button>
        <button
          class="tab"
          title="Recolocar los nodos automáticamente (deshacible)"
          @click=${() => void this.runAutoLayout()}
        >
          ✨ Auto-layout
        </button>
      </div>
      <modux-canvas
        .scene=${scene}
        .edgePoints=${this.viewLayout(this._view).edges}
        .selectedId=${this._selectedId}
        .selectedIds=${this._multi}
        .connectable=${this._view === 'context-map' || this._view === 'workflows'}
        @node-moved=${this.onNodeMoved}
        @nodes-moved=${this.onNodesMoved}
        @node-reparent-requested=${this.onNodeReparentRequested}
        @node-proxy-requested=${this.onNodeProxyRequested}
        @node-resized=${this.onNodeResized}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
        @node-renamed=${this.onNodeRenamed}
        @edge-points-changed=${this.onEdgePointsChanged}
        @element-multi-toggled=${this.onMultiToggled}
        @nodes-boxed=${this.onNodesBoxed}
        @undo-requested=${this.undo}
        @redo-requested=${this.redo}
        @element-selected=${this.onElementSelected}
        @element-activated=${this.onElementActivated}
        @selection-cleared=${() => {
          this._selectedId = null;
          this._multi = [];
          this.emit('modux-select', null);
        }}
      ></modux-canvas>
      <div class="hint">
        ${this._view === 'context-map'
          ? html`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom`
          : this._view === 'eventstorming'
            ? html`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom`
            : this._view === 'workflows'
              ? html`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom`
              : html`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
      </div>
      ${this.renderRelationPicker()} ${this.renderDeletePicker()}
    `;
  }

  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  private renderDeletePicker() {
    const p = this._deletePicker;
    if (!p) return '';
    const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._deletePicker = null)}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">¿Eliminar, o solo quitar de la vista?</div>
        <button
          class="picker-item"
          @click=${() => {
            const picked = this._deletePicker!;
            this._deletePicker = null;
            this.command({
              kind: 'remove-view-member',
              id: this._activeViewId,
              targetId: picked.memberId,
            });
          }}
        >
          <span class="abbr">👁</span>
          <span class="name">Quitar de la vista «${view?.name ?? this._activeViewId}»</span>
        </button>
        <button
          class="picker-item"
          @click=${() => {
            const picked = this._deletePicker!;
            this._deletePicker = null;
            this.performDelete(picked.elementType, picked.id, picked.kind);
          }}
        >
          <span class="abbr">🗑</span>
          <span class="name">Eliminar del modelo</span>
        </button>
      </div>
    `;
  }

  private renderRelationPicker() {
    const p = this._relationPicker;
    if (!p) return '';
    const current =
      p.mode === 'edit'
        ? this.model.relations.find(
            (r) => r.sourceId === p.sourceId && r.targetId === p.targetId,
          )?.type
        : this._relationType;
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._relationPicker = null)}></div>
      <div
        class="relation-picker"
        style="left:${p.x}px; top:${p.y}px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">
          ${p.mode === 'create' ? 'Tipo de relación' : 'Cambiar tipo'}
        </div>
        ${RELATION_TYPES.map(
          (t) => html`
            <button
              class="picker-item ${t === current ? 'current' : ''}"
              title=${t}
              @click=${() => this.pickRelationType(t)}
            >
              <span class="abbr">${RELATION_META[t].abbr}</span>
              <span class="name">${RELATION_META[t].name}</span>
            </button>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-editor': ModuxEditor;
  }
}
