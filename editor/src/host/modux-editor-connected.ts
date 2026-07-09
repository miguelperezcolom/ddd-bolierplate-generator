import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ModuxModel } from '../model.js';
import type { EditorLayout } from '../scene.js';
import type { ModuxEditor } from '../modux-editor.js';
import '../modux-editor.js';

/**
 * REST-connected host wrapper. Use this element when embedding the editor in
 * the Mateu UI served by the modux app: it loads the model projection and the
 * persisted layout from the server, forwards commands, and saves the layout.
 * The inner <modux-editor> stays pure (properties in, events out).
 */
@customElement('modux-editor-connected')
export class ModuxEditorConnected extends LitElement {
  /** Base URL of the editor API. */
  @property() base = '/modux/editor';

  @state() private _model: ModuxModel | null = null;
  @state() private _layout: EditorLayout = {};
  @state() private _error: string | null = null;
  @state() private _saving = false;
  /** In-flight writes of our own (commands, layout, solution ops) — see trackWrite. */
  private _writes = 0;
  @state() private _toast: { message: string; kind: 'error' | 'info' } | null = null;
  /** System/solutions workspace: which branch of the store is checked out. */
  @state() private _workspace: {
    current: string;
    system: boolean;
    solutions: { branch: string; name: string; status?: string }[];
  } | null = null;
  @state() private _creatingSolution = false;
  @state() private _newSolutionName = '';
  /** Semantic diff of the checked-out solution vs the system (null on the system). */
  @state() private _diff: {
    branch: string;
    system: boolean;
    added: number;
    modified: number;
    removed: number;
    changes: { type: string; id: string; name?: string; kind: string }[];
  } | null = null;
  /** Element-by-element conflict resolution before a merge/update. */
  @state() private _mergeFlow: {
    op: 'merge' | 'update';
    conflicts: { key: string; type: string; id: string; name?: string; system?: string; solution?: string }[];
    resolutions: Record<string, string>;
  } | null = null;

  private _layoutTimer: number | undefined;
  /** A layout edit is waiting for the debounced PUT. */
  private _layoutDirty = false;
  private _toastTimer: number | undefined;
  private _pollTimer: number | undefined;
  private _lastVersion: string | null = null;
  private _pendingVersion: string | null = null;
  private _interacting = false;
  private _sse: EventSource | undefined;

  private _onPointerDown = () => (this._interacting = true);
  private _onPointerUp = () => {
    this._interacting = false;
    if (this._pendingVersion) {
      const version = this._pendingVersion;
      this._pendingVersion = null;
      void this.onVersionSignal(version);
    }
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 480px;
    }
    modux-editor {
      width: 100%;
      flex: 1;
      min-height: 0;
    }
    .workspace {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: #334155;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-bottom: none;
      border-radius: 10px 10px 0 0;
    }
    .workspace label {
      font-size: 12px;
      color: #64748b;
    }
    .workspace select,
    .workspace input {
      font-size: 13px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
    }
    .workspace button {
      border: none;
      background: transparent;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
      color: #334155;
    }
    .workspace button:hover {
      background: #e2e8f0;
    }
    .workspace .badge {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 2px 8px;
      border-radius: 999px;
      background: #dbeafe;
      color: #1d4ed8;
    }
    .workspace .badge.solution {
      background: #fef3c7;
      color: #b45309;
    }
    .merge-panel {
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: #334155;
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-bottom: none;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .merge-title {
      font-weight: 600;
    }
    .merge-row {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .merge-el {
      min-width: 320px;
      font-family: ui-monospace, monospace;
      font-size: 12px;
    }
    .merge-actions {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }
    .merge-actions button {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      padding: 5px 12px;
      border-radius: 8px;
      cursor: pointer;
    }
    .merge-actions button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .status {
      font-family: ui-sans-serif, system-ui, sans-serif;
      font-size: 13px;
      color: #64748b;
      padding: 24px;
    }
    .status.error {
      color: #b91c1c;
    }
    :host {
      position: relative;
    }
    .toast {
      position: absolute;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 80%;
      background: #7f1d1d;
      color: #fef2f2;
      font: 13px ui-sans-serif, system-ui, sans-serif;
      padding: 10px 16px;
      border-radius: 8px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      z-index: 10;
    }
    .toast.info {
      background: #1e3a8a;
      color: #eff6ff;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('pointerdown', this._onPointerDown, true);
    window.addEventListener('pointerup', this._onPointerUp, true);
    window.addEventListener('pagehide', this._onPageHide);
    void this.reload();
    void this.loadWorkspace();
    this.startLiveUpdates();
  }

  disconnectedCallback(): void {
    window.clearTimeout(this._layoutTimer);
    window.clearInterval(this._pollTimer);
    this._sse?.close();
    this.removeEventListener('pointerdown', this._onPointerDown, true);
    window.removeEventListener('pointerup', this._onPointerUp, true);
    window.removeEventListener('pagehide', this._onPageHide);
    this._onPageHide(); // navigating away inside the SPA also flushes
    super.disconnectedCallback();
  }

  /** Closing/leaving inside the debounce window must not lose the last layout edit. */
  private _onPageHide = (): void => {
    if (!this._layoutDirty) return;
    this._layoutDirty = false;
    // sendBeacon survives unload where a plain fetch may be dropped (POST-only).
    navigator.sendBeacon(
      `${this.base}/layout`,
      new Blob([JSON.stringify(this._layout)], { type: 'application/json' }),
    );
  };

  /**
   * Live refresh: the server pushes the store fingerprint over SSE; when it
   * changes, the model is refetched — covering edits from the Mateu CRUDs, MCP
   * or another editor instance. Falls back to 4s polling when SSE is not
   * available. Signals are deferred while the user is mid-gesture or a command
   * is in flight.
   */
  private startLiveUpdates(): void {
    try {
      this._sse = new EventSource(`${this.base}/events`);
      this._sse.addEventListener('version', (e) =>
        void this.onVersionSignal((e as MessageEvent).data),
      );
      this._sse.onerror = () => {
        this._sse?.close();
        this._sse = undefined;
        if (!this._pollTimer) {
          this._pollTimer = window.setInterval(() => void this.pollVersion(), 4000);
        }
      };
    } catch {
      this._pollTimer = window.setInterval(() => void this.pollVersion(), 4000);
    }
  }

  private async pollVersion(): Promise<void> {
    try {
      const res = await fetch(`${this.base}/version`);
      if (!res.ok) return;
      await this.onVersionSignal((await res.json()).version);
    } catch {
      /* transient network issue — next tick retries */
    }
  }

  /**
   * Every write WE make (command, layout save, solution op) bumps the store
   * fingerprint, and the SSE echo of that bump must not read as an external
   * change (it reloaded the model and wiped the undo history mid-session).
   * All own writes funnel through here: while any is in flight the signals are
   * deferred, and once the last one settles we adopt the resulting version
   * BEFORE processing the deferred signal — our own echo compares equal.
   */
  private async trackWrite<T>(work: () => Promise<T>): Promise<T> {
    this._writes++;
    this._saving = true;
    try {
      return await work();
    } finally {
      this._writes--;
      if (this._writes === 0) {
        try {
          const res = await fetch(`${this.base}/version`);
          if (res.ok) this._lastVersion = (await res.json()).version;
        } catch {
          /* transient — the next signal will sort it out */
        }
        this._saving = false;
        if (this._pendingVersion) {
          const version = this._pendingVersion;
          this._pendingVersion = null;
          void this.onVersionSignal(version);
        }
      }
    }
  }

  private async onVersionSignal(version: string): Promise<void> {
    if (!this._model) return;
    if (this._writes > 0 || this._interacting) {
      this._pendingVersion = version; // processed on pointerup / after the last write
      return;
    }
    // A workspace bar hidden by a transient failure heals with the next signal.
    if (!this._workspace) void this.loadWorkspace();
    const external = this._lastVersion !== null && version !== this._lastVersion;
    this._lastVersion = version;
    if (external) {
      await this.reload();
      // Someone else changed the model: the local undo history no longer
      // describes valid inverses, so it is discarded rather than misapplied.
      (this.renderRoot.querySelector('modux-editor') as ModuxEditor | null)?.clearHistory();
      this.showToast(
        'El modelo ha cambiado fuera de este editor: recargado (historial de deshacer reiniciado)',
        'info',
      );
    }
  }

  async reload(): Promise<void> {
    try {
      const [modelRes, layoutRes, versionRes] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/layout`),
        fetch(`${this.base}/version`),
      ]);
      if (!modelRes.ok) throw new Error(`GET ${this.base}/model → ${modelRes.status}`);
      this._model = await modelRes.json();
      this._layout = layoutRes.ok ? await layoutRes.json() : {};
      if (versionRes.ok) this._lastVersion = (await versionRes.json()).version;
      this._error = null;
    } catch (err) {
      this._error = String(err);
    }
  }

  private async loadWorkspace(): Promise<void> {
    try {
      const res = await fetch(`${this.base}/solutions`);
      if (res.ok) this._workspace = await res.json();
      await this.refreshDiff();
    } catch {
      /* workspace bar simply stays hidden */
    }
  }

  /** The diff rings only make sense on a solution; on the system they clear. */
  private async refreshDiff(): Promise<void> {
    if (!this._workspace || this._workspace.system) {
      this._diff = null;
      return;
    }
    try {
      const res = await fetch(`${this.base}/solutions/diff`);
      this._diff = res.ok ? await res.json() : null;
    } catch {
      this._diff = null;
    }
  }

  /**
   * The app-level «Modelo» selector must always match the branch we are on:
   * otherwise the context filter would silently switch back on the next mateu
   * request. Same localStorage entries the mateu picker uses.
   */
  private syncModelContext(branch: string, label: string): void {
    try {
      const ctx = JSON.parse(localStorage.getItem('mateu-app-context') ?? '{}');
      const labels = JSON.parse(localStorage.getItem('mateu-app-context-labels') ?? '{}');
      ctx.model = branch;
      labels.model = label;
      localStorage.setItem('mateu-app-context', JSON.stringify(ctx));
      localStorage.setItem('mateu-app-context-labels', JSON.stringify(labels));
    } catch {
      /* storage unavailable: the header keeps its previous label */
    }
  }

  /** create / discard / status / merge against the solutions API, then reload. */
  private async solutionOp(op: string, body: unknown): Promise<void> {
    const before = this._workspace?.current;
    await this.trackWrite(async () => {
      try {
        const res = await fetch(`${this.base}/solutions/${op}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          let message = `El servidor rechazó la operación (${res.status})`;
          try {
            const parsed = await res.json();
            if (parsed?.message) message = parsed.message;
          } catch {
            /* not JSON */
          }
          this.showToast(message);
          return;
        }
        this._workspace = await res.json();
        await this.reload();
        await this.refreshDiff();
        // A checkout replaces the model wholesale — local undo no longer applies.
        (this.renderRoot.querySelector('modux-editor') as ModuxEditor | null)?.clearHistory();
      } catch (err) {
        this.showToast(String(err));
      }
    });
    const after = this._workspace?.current;
    if (after && after !== before) {
      const name = this._workspace!.solutions.find((s) => s.branch === after)?.name
        ?? after.replace(/^solution\//, '');
      this.syncModelContext(
        after,
        this._workspace!.system ? 'Sistema (as-is)' : `Solución: ${name}`,
      );
      window.location.reload();
    }
  }

  private createSolution(): void {
    const name = this._newSolutionName.trim();
    if (!name) return;
    this._creatingSolution = false;
    this._newSolutionName = '';
    void this.solutionOp('create', { name });
  }

  /** merge/update start with a dry run; conflicts open the per-element panel. */
  private async startMergeFlow(op: 'merge' | 'update'): Promise<void> {
    try {
      const res = await fetch(`${this.base}/solutions/merge-check`);
      if (!res.ok) {
        this.showToast(`No se pudo comprobar el merge (${res.status})`);
        return;
      }
      const check = await res.json();
      if (!check.conflicts?.length) {
        await this.solutionOp(op, { resolutions: {} });
        this.showToast(
          op === 'merge'
            ? 'Solución mergeada al sistema: ahora es el nuevo as-is'
            : 'Solución actualizada desde el sistema',
          'info',
        );
        return;
      }
      this._mergeFlow = { op, conflicts: check.conflicts, resolutions: {} };
    } catch (err) {
      this.showToast(String(err));
    }
  }

  private async confirmMergeFlow(): Promise<void> {
    const flow = this._mergeFlow;
    if (!flow || flow.conflicts.some((c) => !flow.resolutions[c.key])) return;
    this._mergeFlow = null;
    await this.solutionOp(flow.op, { resolutions: flow.resolutions });
    this.showToast(
      flow.op === 'merge'
        ? 'Solución mergeada al sistema: ahora es el nuevo as-is'
        : 'Solución actualizada desde el sistema',
      'info',
    );
  }

  private showToast(message: string, kind: 'error' | 'info' = 'error'): void {
    this._toast = { message, kind };
    window.clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => (this._toast = null), 5000);
  }

  /** An OpenAPI/WSDL upload from the editor: operations (and rq/rs models) land in the store. */
  private async onImportApi(e: CustomEvent): Promise<void> {
    const { content, fileName, apiId } = e.detail as {
      content: string;
      fileName: string;
      apiId: string | null;
    };
    await this.trackWrite(async () => {
      try {
        const res = await fetch(`${this.base}/import-api`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, fileName, apiId }),
        });
        if (!res.ok) {
          let message = `El servidor rechazó el contrato (${res.status})`;
          try {
            const body = await res.json();
            if (body?.message) message = body.message;
          } catch {
            /* not JSON */
          }
          this.showToast(message);
          return;
        }
        const { apiId: landed } = await res.json();
        const modelRes = await fetch(`${this.base}/model`);
        if (modelRes.ok) this._model = await modelRes.json();
        await this.refreshDiff();
        this.showToast(`Contrato importado en ${landed}`, 'info');
      } catch (err) {
        this.showToast(String(err));
      }
    });
  }

  /** Commands run strictly in order: two concurrent edits of the same entity
   * would read-modify-write against each other and lose one of them. */
  private _commandChain: Promise<void> = Promise.resolve();

  private onCommand(e: CustomEvent): void {
    const { command } = e.detail;
    this._commandChain = this._commandChain.then(() => this.postCommand(command));
  }

  private async postCommand(command: unknown): Promise<void> {
    await this.trackWrite(async () => {
      try {
        const res = await fetch(`${this.base}/commands`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(command),
        });
        if (!res.ok) {
          // Rejections arrive as 400 + {message}; anything else gets a generic line.
          let message = `El servidor rechazó el comando (${res.status})`;
          try {
            const body = await res.json();
            if (body?.message) message = body.message;
          } catch {
            /* not JSON */
          }
          this.showToast(message);
          return;
        }
        // The server is the source of truth: re-read the projection.
        const modelRes = await fetch(`${this.base}/model`);
        if (modelRes.ok) this._model = await modelRes.json();
        await this.refreshDiff(); // to-be edits move the diff live
      } catch (err) {
        this.showToast(String(err));
      }
    });
  }

  private onLayoutChanged(e: CustomEvent): void {
    this._layout = e.detail.layout;
    this._layoutDirty = true;
    window.clearTimeout(this._layoutTimer);
    this._layoutTimer = window.setTimeout(() => {
      this._layoutDirty = false;
      void this.trackWrite(() =>
        fetch(`${this.base}/layout`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this._layout),
        }),
      );
    }, 600);
  }

  render() {
    if (this._error) {
      return html`<div class="status error">modux editor: ${this._error}</div>`;
    }
    if (!this._model) {
      return html`<div class="status">Cargando el modelo…</div>`;
    }
    return html`
      ${this._workspace
        ? html`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system
                  ? 'Sistema (as-is)'
                  : `Solución: ${
                      this._workspace.solutions.find((s) => s.branch === this._workspace!.current)
                        ?.name ?? this._workspace.current
                    }`}
              </span>
              ${this._creatingSolution
                ? ''
                : html`<button @click=${() => (this._creatingSolution = true)}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? '' : 'solution'}">
                ${this._workspace.system ? 'AS-IS' : 'TO-BE'}
              </span>
              ${this._diff && !this._workspace.system
                ? (() => {
                    const count = (kind: string) =>
                      this._diff!.changes.filter((c) => c.kind === kind).length;
                    const removedNames = this._diff!.changes
                      .filter((c) => c.kind === 'REMOVED')
                      .map((c) => c.name ?? c.id);
                    return html`<span
                      class="badge solution"
                      title=${removedNames.length
                        ? `Eliminados respecto al sistema: ${removedNames.join(', ')}`
                        : 'Cambios respecto al sistema'}
                    >
                      ＋${count('ADDED')} ～${count('MODIFIED')} －${count('REMOVED')}
                    </span>`;
                  })()
                : ''}
              ${this._creatingSolution
                ? html`
                    <input
                      placeholder="Nombre de la solución…"
                      .value=${this._newSolutionName}
                      @input=${(e: Event) =>
                        (this._newSolutionName = (e.target as HTMLInputElement).value)}
                      @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.createSolution()}
                    />
                    <button @click=${this.createSolution}>Crear</button>
                    <button @click=${() => (this._creatingSolution = false)}>Cancelar</button>
                  `
                : ''}
              ${!this._workspace.system && !this._creatingSolution
                ? (() => {
                    const status = this._workspace!.solutions.find(
                      (s) => s.branch === this._workspace!.current,
                    )?.status;
                    return html`
                      ${status === 'EXPLORING'
                        ? html`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp('status', { status: 'PROPOSED' })}
                          >
                            → Proponer
                          </button>`
                        : ''}
                      ${status === 'PROPOSED'
                        ? html`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp('status', { status: 'APPROVED' })}
                          >
                            ✓ Aprobar
                          </button>`
                        : ''}
                      ${status === 'APPROVED'
                        ? html`<button
                            title="Merge semántico al sistema: la solución pasa a ser el nuevo as-is"
                            @click=${() => void this.startMergeFlow('merge')}
                          >
                            ⇧ Mergear al sistema
                          </button>`
                        : ''}
                      <button
                        title="Trae al to-be los avances del sistema (merge semántico)"
                        @click=${() => void this.startMergeFlow('update')}
                      >
                        ⟳ Actualizar del sistema
                      </button>
                      <button
                        title="Archiva la solución (tag) y borra su rama"
                        @click=${() =>
                          void this.solutionOp('discard', { branch: this._workspace!.current })}
                      >
                        ⏏ Descartar
                      </button>
                    `;
                  })()
                : ''}
            </div>
          `
        : ''}
      ${this._mergeFlow
        ? html`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
                (c) => html`
                  <div class="merge-row">
                    <span class="merge-el">${c.type} · ${c.name ?? c.id}</span>
                    <label title=${c.system ?? '(eliminado en el sistema)'}>
                      <input
                        type="radio"
                        name=${c.key}
                        .checked=${this._mergeFlow!.resolutions[c.key] === 'system'}
                        @change=${() =>
                          (this._mergeFlow = {
                            ...this._mergeFlow!,
                            resolutions: { ...this._mergeFlow!.resolutions, [c.key]: 'system' },
                          })}
                      />
                      Sistema
                    </label>
                    <label title=${c.solution ?? '(eliminado en la solución)'}>
                      <input
                        type="radio"
                        name=${c.key}
                        .checked=${this._mergeFlow!.resolutions[c.key] === 'solution'}
                        @change=${() =>
                          (this._mergeFlow = {
                            ...this._mergeFlow!,
                            resolutions: { ...this._mergeFlow!.resolutions, [c.key]: 'solution' },
                          })}
                      />
                      Solución
                    </label>
                  </div>
                `,
              )}
              <div class="merge-actions">
                <button
                  ?disabled=${this._mergeFlow.conflicts.some(
                    (c) => !this._mergeFlow!.resolutions[c.key],
                  )}
                  @click=${() => void this.confirmMergeFlow()}
                >
                  Confirmar
                </button>
                <button @click=${() => (this._mergeFlow = null)}>Cancelar</button>
              </div>
            </div>
          `
        : ''}
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        .diff=${this._diff && !this._workspace?.system
          ? Object.fromEntries(
              this._diff.changes
                .filter((c) => c.kind !== 'REMOVED')
                .map((c) => [c.id, c.kind as 'ADDED' | 'MODIFIED']),
            )
          : null}
        @modux-command=${this.onCommand}
        @modux-import-api=${this.onImportApi}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(e: CustomEvent) =>
          this.showToast(e.detail.message, e.detail.kind ?? 'info')}
        style=${this._saving ? 'opacity: 0.7' : ''}
      ></modux-editor>
      ${this._toast
        ? html`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => (this._toast = null)}
          >
            ${this._toast.kind === 'error' ? '⚠' : 'ℹ'} ${this._toast.message}
          </div>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-editor-connected': ModuxEditorConnected;
  }
}
