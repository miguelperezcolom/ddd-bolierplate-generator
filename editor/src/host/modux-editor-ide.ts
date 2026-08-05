/**
 * The editor as an IDE plugin hosts it.
 *
 * The web-app host (`modux-editor-connected`) POSTs commands to a server and
 * waits for a new model back. This one applies them itself and writes the files
 * — same editor, same commands, no server. See `docs/design/ide-plugin.md`.
 */

import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { ModuxModel } from '../model.js';
import type { EditorLayout } from '../scene.js';
import { apply, CommandError } from '../store/apply.js';
import { layoutOf, saveLayout } from '../store/layout.js';
import { project, unprojectedTypes } from '../store/project.js';
import { ModelStore } from '../store/store.js';
import { flush, loadTree } from '../store/tree.js';
import { hostBridge, ideFileSystem, type IdeFileSystem } from './ide-fs.js';
import '../modux-editor.js';

/** Paths from here are relative to the model root: the host is already rooted there. */
const ROOT = '';

@customElement('modux-editor-ide')
export class ModuxEditorIde extends LitElement {
  static styles = css`
    :host { display: block; height: 100%; }
    .banner {
      padding: 0.5rem 0.75rem;
      font: 13px/1.4 system-ui, sans-serif;
      background: #fdf2f2;
      color: #8a1f1f;
      border-bottom: 1px solid #f0c9c9;
    }
    .banner.info { background: #f2f6fd; color: #1f3d8a; border-bottom-color: #c9d8f0; }
    modux-editor { height: 100%; }
  `;

  @state() private model: ModuxModel | null = null;
  @state() private layout: EditorLayout = {};
  @state() private error: string | null = null;
  @state() private notice: string | null = null;

  private store = new ModelStore();
  private fs: IdeFileSystem | null = null;

  /** Serializes edits: a command must land before the next one reads the store. */
  private chain: Promise<void> = Promise.resolve();

  /**
   * Dragging emits a position per frame. Writing each one would put a commit per pixel in the
   * IDE's undo stack and a diff per pixel in git, so the geometry lands once the hand stops.
   */
  private layoutTimer: number | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    void this.load();
  }

  private async load(): Promise<void> {
    const bridge = hostBridge();
    if (!bridge) {
      this.error = 'Sin puente con el IDE: este componente solo funciona dentro del plugin.';
      return;
    }
    this.fs = ideFileSystem(bridge);
    try {
      this.store = await loadTree(this.fs, ROOT);
      this.layout = layoutOf(this.store);
      this.refresh();
      // the host has no other window into the webview: without this, a model that
      // loaded and one that never got here look the same from the IDE log
      console.info(`modux: modelo cargado — ${summary(this.store)}`);
    } catch (e) {
      this.error = `No se pudo leer el modelo: ${message(e)}`;
      console.error(`modux: no se pudo leer el modelo: ${message(e)}`);
    }
  }

  /** Re-derive what the editor draws, and warn about anything not projected yet. */
  private refresh(): void {
    this.model = project(this.store);
    const missing = unprojectedTypes(this.store);
    this.notice = missing.length
      ? `Este modelo tiene elementos que el editor todavía no dibuja: ${missing.join(', ')}. `
        + 'Se conservan intactos en disco.'
      : null;
  }

  private onCommand(event: CustomEvent): void {
    const { command } = event.detail;
    this.chain = this.chain.then(() => this.run(command));
  }

  /**
   * The geometry is model data like everything else — it lives in `diagrams/`, one file per view,
   * versioned on purpose (§4.4). So it takes the same road as a command: into the store, then out
   * to the files that changed.
   */
  private onLayoutChanged(event: CustomEvent): void {
    this.layout = event.detail.layout as EditorLayout;
    window.clearTimeout(this.layoutTimer);
    this.layoutTimer = window.setTimeout(() => this.flushLayout(), 400);
  }

  private flushLayout(): void {
    this.chain = this.chain.then(async () => {
      if (!this.fs) return;
      try {
        saveLayout(this.store, this.layout);
        await flush(this.fs, ROOT, this.store);
        await this.fs.commit();
      } catch (e) {
        this.error = `No se pudo guardar la geometría: ${message(e)}`;
      }
    });
  }

  /** Closing inside the debounce window must not lose the last drag. */
  override disconnectedCallback(): void {
    window.clearTimeout(this.layoutTimer);
    this.flushLayout();
    super.disconnectedCallback();
  }

  /**
   * Apply, write, show. A failed command changes nothing: the applier rolls the
   * store back before throwing, and nothing has reached disk yet.
   */
  private async run(command: unknown): Promise<void> {
    if (!this.fs) return;
    try {
      apply(this.store, command as never);
      await flush(this.fs, ROOT, this.store);
      await this.fs.commit();
      this.error = null;
      this.refresh();
    } catch (e) {
      this.error = e instanceof CommandError ? e.message : `No se pudo guardar: ${message(e)}`;
      // whatever was queued belongs to a command that did not land
      await this.load();
    }
  }

  override render() {
    if (!this.model) {
      return html`<div class="banner">${this.error ?? 'Cargando el modelo…'}</div>`;
    }
    return html`
      ${this.error ? html`<div class="banner" role="alert">${this.error}</div>` : nothing}
      ${this.notice && !this.error ? html`<div class="banner info">${this.notice}</div>` : nothing}
      <modux-editor
        .model=${this.model}
        .layout=${this.layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
      ></modux-editor>
    `;
  }
}

const message = (error: unknown) => (error instanceof Error ? error.message : String(error));

/** What was read, by type, for the IDE log. */
const summary = (store: ModelStore) =>
  store.types().map((type) => `${type}=${store.all(type).length}`).join(' ') || 'vacío';

declare global {
  interface HTMLElementTagNameMap {
    'modux-editor-ide': ModuxEditorIde;
  }
}
