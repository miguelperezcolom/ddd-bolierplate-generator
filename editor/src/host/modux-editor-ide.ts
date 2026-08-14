/**
 * The editor as an IDE plugin hosts it.
 *
 * The web-app host (`modux-editor-connected`) POSTs commands to a server and
 * waits for a new model back. This one applies them itself and writes the files
 * — same editor, same commands, no server. See `docs/design/ide-plugin.md`.
 */

import { parse, stringify } from 'yaml';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { ModuxModel } from '../model.js';
import type { DiagramLayout, EditorLayout, ViewLayout } from '../scene.js';
import { apply, CommandError } from '../store/apply.js';
import { snapshotOf } from '../store/project-snapshot.js';
import { project, unprojectedTypes } from '../store/project.js';
import { ModelStore } from '../store/store.js';
import { flush, loadTree } from '../store/tree.js';
import {
  hostBridge, ideFileSystem, readOnlyFileSystem, resolveProject, readView, writeView,
  type IdeFileSystem,
} from './ide-fs.js';
import '../modux-editor.js';

/** The view document (§12): geometry over a catalog view, referenced by id. No type anymore. */
interface ViewDoc {
  viewId?: string;
  geometry?: ViewLayout | DiagramLayout;
  /** The lens the view opens in — so a C4 container view reopens in distribution, not unified. */
  mode?: 'unified' | 'distribution' | 'eventstorming';
}

/**
 * The single geometry key for a document — mirrors `ModuxEditor.layoutKey`. One canvas, one key: a
 * scoped document keys under its view id, the whole model under «base».
 */
function layoutKeyFor(viewId?: string): string {
  return viewId ? `view:${viewId}` : 'base';
}

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
  /** The lens + scope to open at, handed to the editor once the catalog is in. */
  @state() private open: { activeViewId?: string; mode?: ViewDoc['mode'] } | null = null;

  private store = new ModelStore();
  private fs: IdeFileSystem | null = null;

  /** The view document this editor is bound to: its ref and where its geometry keys. */
  private doc: ViewDoc = {};
  private viewKey = 'base';

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
      // The document scopes to a catalog view and carries geometry; the catalog (.modux/) holds the
      // elements. There is one unified canvas now (no type), so the geometry seeds under one key.
      // A legacy `<slug>.<type>.modux-view.yaml` still opens — the type in the name is ignored.
      this.doc = (parse(await readView(bridge)) as ViewDoc) ?? {};
      this.viewKey = layoutKeyFor(this.doc.viewId);
      this.store = await loadTree(this.fs, ROOT);
      await this.ensureView();
      this.layout = this.doc.geometry ? { [this.viewKey]: this.doc.geometry } : {};
      this.open = { activeViewId: this.doc.viewId, mode: this.doc.mode };
      this.canvasMode = this.doc.mode;
      this.refresh();
      // the host has no other window into the webview: without this, a model that
      // loaded and one that never got here look the same from the IDE log
      console.info(`modux: vista abierta — corte=${this.doc.viewId ?? '(todo)'} — ${summary(this.store)}`);
    } catch (e) {
      this.error = `No se pudo abrir la vista: ${message(e)}`;
      console.error(`modux: no se pudo abrir la vista: ${message(e)}`);
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
   * A view opens scoped and empty, not showing the whole catalog: if the document names a view the
   * catalog does not hold yet — as a freshly created `*.modux-view.yaml` does — create it as an
   * empty curated entity (§12, born-empty). The user then fills it by adding members.
   */
  private async ensureView(): Promise<void> {
    const id = this.doc.viewId;
    if (!id || !this.fs || this.store.has('views', id)) return;
    apply(this.store, { kind: 'add-view', id, name: id, memberIds: [] } as never);
    await flush(this.fs, ROOT, this.store);
    await this.fs.commit();
  }

  /**
   * A view was created in the editor (the "create view from selection" gesture, §12): its entity is
   * already added to the catalog (queued on the same chain, so it lands first), and now its
   * document is written and opened. This is what makes the in-editor door and New → Modux View
   * produce the same thing — a document backed by a catalog view.
   */
  private onCreateView(event: CustomEvent): void {
    const bridge = hostBridge();
    if (!bridge) return;
    const { viewId, name } = event.detail as { viewId: string; name: string };
    this.chain = this.chain.then(() => bridge({ op: 'createView', viewId, name }) as Promise<unknown>)
      .then(() => undefined);
  }

  /**
   * The one command that needs the outside world: referencing another project means READING its
   * model. The applier does no I/O, so the host does it here and hands over the snapshot already
   * read — see `docs/design/ide-plugin.md` §4.7.
   *
   * Not finding the other project is reported, not thrown: it is an ordinary situation (a sibling
   * that is not checked out) and the user can fix it by cloning it or giving the reference a path.
   */
  private async enrich(command: Record<string, unknown>): Promise<Record<string, unknown>> {
    if (command.kind !== 'add-project-reference') return command;
    const bridge = hostBridge();
    const coordinate = (command.referencedProject ?? {}) as { gitUrl?: string; path?: string };
    if (!bridge) throw new CommandError('Sin puente con el IDE');
    const root = await resolveProject(bridge, coordinate);
    if (!root) {
      throw new CommandError(
        `No encuentro el modelo de ${coordinate.gitUrl ?? coordinate.path}. Clónalo al lado de`
        + ' este repositorio, o dale un path a la referencia.');
    }
    const other = await loadTree(readOnlyFileSystem(bridge, root), ROOT);
    const fallback = root.split('/').filter(Boolean).at(-1) ?? 'proyecto';
    return { ...command, snapshot: snapshotOf(other, fallback) };
  }

  /**
   * The geometry belongs to the view DOCUMENT now (§12), not to the catalog's `diagrams`. So a
   * drag lands in the document file — its own undo step — and the catalog is left untouched.
   */
  private onLayoutChanged(event: CustomEvent): void {
    this.layout = event.detail.layout as EditorLayout;
    window.clearTimeout(this.layoutTimer);
    this.layoutTimer = window.setTimeout(() => this.flushLayout(), 400);
  }

  /** The lens changed in the editor — remember it and persist it with the document. */
  private onCanvasModeChanged(event: CustomEvent): void {
    this.canvasMode = event.detail.mode as ViewDoc['mode'];
    this.flushLayout();
  }

  /** The lens the view is currently in, persisted with the document (undefined ⇒ unified). */
  private canvasMode: ViewDoc['mode'];

  private flushLayout(): void {
    const bridge = hostBridge();
    if (!bridge) return;
    this.chain = this.chain.then(async () => {
      try {
        // One canvas, one geometry blob; a legacy `kind:` is dropped by rewriting only these keys.
        // The lens rides along so the view reopens in it (omitted when unified — the default).
        this.doc = {
          viewId: this.doc.viewId,
          geometry: this.layout[this.viewKey] ?? { nodes: {}, edges: {} },
          ...(this.canvasMode && this.canvasMode !== 'unified' ? { mode: this.canvasMode } : {}),
        };
        await writeView(bridge, stringify(this.doc));
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
      const enriched = await this.enrich(command as Record<string, unknown>);
      apply(this.store, enriched as never);
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
        .open=${this.open}
        .hosted=${true}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @canvas-mode-changed=${this.onCanvasModeChanged}
        @create-view=${this.onCreateView}
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
