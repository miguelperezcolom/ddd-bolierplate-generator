import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ModuxModel, ContextMapRelationType, SubdomainType } from './model.js';
import type { EditorLayout } from './scene.js';
import type { ModuxCommand } from './commands.js';
import { contextMapScene } from './views/context-map.js';
import { aggregatesScene } from './views/aggregates.js';
import { flowsScene } from './views/flows.js';
import { processesScene } from './views/processes.js';
import './modux-canvas.js';

const RELATION_TYPES: ContextMapRelationType[] = [
  'PARTNERSHIP',
  'SHARED_KERNEL',
  'CUSTOMER_SUPPLIER',
  'CONFORMIST',
  'OPEN_HOST_SERVICE',
  'ANTI_CORRUPTION_LAYER',
  'PUBLISHED_LANGUAGE',
  'SEPARATE_WAYS',
];

type ViewId = 'context-map' | 'aggregates' | 'flows' | 'processes';

const VIEWS: { id: ViewId; label: string; ready: boolean }[] = [
  { id: 'context-map', label: 'Context map', ready: true },
  { id: 'aggregates', label: 'Agregados', ready: true },
  { id: 'flows', label: 'Flows', ready: true },
  { id: 'processes', label: 'Procesos', ready: true },
];

const SUBDOMAIN_TYPES: SubdomainType[] = ['CORE', 'SUPPORTING', 'GENERIC'];

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
    case 'entity':
      return { elementType: 'entity', id };
    case 'flow':
      return { elementType: 'flow', id: id.replace(/^flow:/, '') };
    case 'process':
      return { elementType: 'process', id };
    default:
      return null;
  }
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

  @state() private _view: ViewId = 'context-map';
  @state() private _relationType: ContextMapRelationType = 'CUSTOMER_SUPPLIER';
  @state() private _selectedId: string | null = null;
  @state() private _newName = '';
  @state() private _newSubdomain: SubdomainType = 'SUPPORTING';
  @state() private _newModuleId = '';
  @state() private _newArchetype = 'TRIGGERS';
  @state() private _newTriggerAggId = '';
  @state() private _newTriggerEvent = '';
  @state() private _newTargetId = '';
  @state() private _undoStack: ModuxCommand[][] = [];

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
    .tab:disabled {
      opacity: 0.4;
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
      if (inverse) this._undoStack = [...this._undoStack.slice(-19), inverse];
    }
    this.emit('modux-command', { command });
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
        const rel = this.model.relations.find(
          (r) => r.sourceId === c.sourceId && r.targetId === c.targetId,
        );
        return rel
          ? [{ kind: 'add-relation', sourceId: rel.sourceId, targetId: rel.targetId, type: rel.type }]
          : null;
      }
      case 'add-module':
        return [{ kind: 'remove-module', id: c.id }];
      case 'remove-module': {
        const m = this.model.modules.find((x) => x.id === c.id);
        if (!m) return null;
        const rels = this.model.relations.filter(
          (r) => r.sourceId === c.id || r.targetId === c.id,
        );
        return [
          { kind: 'add-module', id: m.id, name: m.name, subdomainType: m.subdomainType ?? 'GENERIC' },
          ...rels.map(
            (r): ModuxCommand => ({
              kind: 'add-relation',
              sourceId: r.sourceId,
              targetId: r.targetId,
              type: r.type,
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
      case 'rename-element': {
        const list =
          c.type === 'module'
            ? this.model.modules
            : c.type === 'aggregate'
              ? this.model.aggregates ?? []
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
      case 'add-process':
        return [{ kind: 'remove-process', id: c.id }];
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
    }
    return null;
  }

  private undo(): void {
    const inverse = this._undoStack[this._undoStack.length - 1];
    if (!inverse) return;
    this._undoStack = this._undoStack.slice(0, -1);
    for (const cmd of inverse) this.command(cmd, false);
  }

  private onNodeMoved(e: CustomEvent): void {
    const { id, x, y } = e.detail;
    const next: EditorLayout = {
      ...this.layout,
      [this._view]: { ...(this.layout[this._view] ?? {}), [id]: { x, y } },
    };
    this.layout = next;
    this.emit('layout-changed', { layout: next });
  }

  private onConnectRequested(e: CustomEvent): void {
    const { sourceId, targetId } = e.detail;
    if (this._view === 'context-map') {
      const externalIds = new Set(this.model.externalSystems.map((s) => s.id));
      if (externalIds.has(sourceId) || externalIds.has(targetId)) return;
      const exists = this.model.relations.some(
        (r) =>
          (r.sourceId === sourceId && r.targetId === targetId) ||
          (r.sourceId === targetId && r.targetId === sourceId),
      );
      if (exists) return;
      this.command({ kind: 'add-relation', sourceId, targetId, type: this._relationType });
    }
  }

  private onDeleteRequested(e: CustomEvent): void {
    const { elementType, id, kind } = e.detail;
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'relation') {
      // Edge ids for relations are `rel:<sourceId>-><targetId>` (see relationEdgeId).
      const match = /^rel:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-relation', sourceId: match[1], targetId: match[2] });
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
    if (elementType === 'node' && kind === 'flow') {
      this._selectedId = null;
      this.command({ kind: 'remove-flow', id: id.replace(/^flow:/, '') });
      return;
    }
    if (elementType === 'node' && kind === 'process') {
      this._selectedId = null;
      this.command({ kind: 'remove-process', id });
    }
  }

  private onNodeRenamed(e: CustomEvent): void {
    const { id, kind, name } = e.detail;
    if (kind === 'module' || kind === 'aggregate' || kind === 'entity') {
      this.command({ kind: 'rename-element', type: kind, id: id.replace(/^tgt:/, ''), name });
    }
  }

  private onElementSelected(e: CustomEvent): void {
    this._selectedId = e.detail.id;
    this.emit('modux-select', { elementType: e.detail.kind, id: e.detail.id });
  }

  private onElementActivated(e: CustomEvent): void {
    const mapped = normalizeActivation(e.detail.id, e.detail.kind);
    if (mapped) this.emit('modux-activate', mapped);
  }

  private createElementFromToolbar(): void {
    const name = this._newName.trim();
    if (!name) return;
    if (this._view === 'context-map') {
      this.command({
        kind: 'add-module',
        id: `mod-${slug(name)}`,
        name,
        subdomainType: this._newSubdomain,
      });
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
    }
    this._newName = '';
  }

  render() {
    const viewLayout = this.layout[this._view] ?? {};
    const scene =
      this._view === 'aggregates'
        ? aggregatesScene(this.model, viewLayout)
        : this._view === 'flows'
          ? flowsScene(this.model, viewLayout)
          : this._view === 'processes'
            ? processesScene(this.model, viewLayout)
            : contextMapScene(this.model, viewLayout);
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
        <div class="spacer"></div>
        <input
          class="new-name"
          placeholder=${{
            'context-map': 'Nuevo contexto…',
            aggregates: 'Nuevo agregado…',
            flows: 'Nuevo flow…',
            processes: 'Nuevo proceso…',
          }[this._view]}
          .value=${this._newName}
          @input=${(e: Event) => (this._newName = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.createElementFromToolbar()}
        />
        ${this._view === 'context-map'
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
        ${this._view === 'aggregates' || this._view === 'processes'
          ? html`<select
              title=${this._view === 'aggregates' ? 'Módulo del nuevo agregado' : 'Módulo dueño del proceso'}
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
        ${this._view === 'flows' || this._view === 'processes'
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
        <button class="tab" @click=${this.createElementFromToolbar}>＋ Crear</button>
        <button
          class="tab"
          title="Deshacer el último cambio (Ctrl+Z)"
          ?disabled=${this._undoStack.length === 0}
          @click=${this.undo}
        >
          ↶ Deshacer
        </button>
        <label for="relation-type" ?hidden=${this._view !== 'context-map'}>Nueva relación:</label>
        <select
          ?hidden=${this._view !== 'context-map'}
          id="relation-type"
          .value=${this._relationType}
          @change=${(e: Event) =>
            (this._relationType = (e.target as HTMLSelectElement).value as ContextMapRelationType)}
        >
          ${RELATION_TYPES.map(
            (t) => html`<option value=${t} ?selected=${t === this._relationType}>${t}</option>`,
          )}
        </select>
        <button
          class="tab"
          title="Ajustar el diagrama a la ventana"
          @click=${() => this.renderRoot.querySelector('modux-canvas')?.fit()}
        >
          ⌖ Ajustar
        </button>
      </div>
      <modux-canvas
        .scene=${scene}
        .selectedId=${this._selectedId}
        .connectable=${this._view === 'context-map'}
        @node-moved=${this.onNodeMoved}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
        @node-renamed=${this.onNodeRenamed}
        @undo-requested=${this.undo}
        @element-selected=${this.onElementSelected}
        @element-activated=${this.onElementActivated}
        @selection-cleared=${() => {
          this._selectedId = null;
          this.emit('modux-select', null);
        }}
      ></modux-canvas>
      <div class="hint">
        ${this._view === 'context-map'
          ? html`Arrastra para reordenar · asa azul → crear relación (${this._relationType}) · Supr
            borra la relación o el contexto vacío seleccionado · F2 renombra · doble click abre el
            CRUD · rueda para zoom`
          : html`Arrastra para reordenar · click para seleccionar · Supr borra (si está vacío) · F2
            renombra · doble click abre el CRUD · rueda para zoom`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-editor': ModuxEditor;
  }
}
