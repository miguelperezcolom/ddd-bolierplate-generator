import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ModuxModel } from '../model.js';
import type { EditorLayout } from '../scene.js';
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
  @state() private _toast: string | null = null;

  private _layoutTimer: number | undefined;
  private _toastTimer: number | undefined;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 480px;
    }
    modux-editor {
      width: 100%;
      height: 100%;
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
  `;

  connectedCallback(): void {
    super.connectedCallback();
    void this.reload();
  }

  disconnectedCallback(): void {
    window.clearTimeout(this._layoutTimer);
    super.disconnectedCallback();
  }

  async reload(): Promise<void> {
    try {
      const [modelRes, layoutRes] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/layout`),
      ]);
      if (!modelRes.ok) throw new Error(`GET ${this.base}/model → ${modelRes.status}`);
      this._model = await modelRes.json();
      this._layout = layoutRes.ok ? await layoutRes.json() : {};
      this._error = null;
    } catch (err) {
      this._error = String(err);
    }
  }

  private showToast(message: string): void {
    this._toast = message;
    window.clearTimeout(this._toastTimer);
    this._toastTimer = window.setTimeout(() => (this._toast = null), 5000);
  }

  private async onCommand(e: CustomEvent): Promise<void> {
    const { command } = e.detail;
    this._saving = true;
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
    } catch (err) {
      this.showToast(String(err));
    } finally {
      this._saving = false;
    }
  }

  private onLayoutChanged(e: CustomEvent): void {
    this._layout = e.detail.layout;
    window.clearTimeout(this._layoutTimer);
    this._layoutTimer = window.setTimeout(() => {
      void fetch(`${this.base}/layout`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this._layout),
      });
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
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        style=${this._saving ? 'opacity: 0.7' : ''}
      ></modux-editor>
      ${this._toast
        ? html`<div class="toast" role="alert" @click=${() => (this._toast = null)}>
            ⚠ ${this._toast}
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
