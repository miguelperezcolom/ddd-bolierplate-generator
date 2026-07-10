import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { UiPageRef } from './model.js';
import type { Point } from './scene.js';
import './modux-page-designer.js';
import { ModuxPageDesigner } from './modux-page-designer.js';

/**
 * The «Diseño» surface: every page of the model as a FRAME on an infinite
 * canvas, Figma-style — except nothing is drawn by hand: each frame is the
 * page's inferred Mateu mockup (the same <modux-page-designer>, framed, sized
 * per frame from the shell's view layout — the corner grip resizes it), and
 * editing inside a frame edits the page's DECLARATION. Drag a frame by its
 * title bar to arrange the space; drag the background to pan, wheel to zoom.
 *
 * Events out: node-moved {id, x, y} (frame layout, same contract as the
 * canvas), element-selected, plus the designer events re-emitted per page:
 * page-field-config-changed / page-fields-reordered / page-open-crud
 * (each carrying pageId).
 */

const FRAME_W = 460;
const GRID_X = 540;
const GRID_Y = 660;

@customElement('modux-figma')
export class ModuxFigma extends LitElement {
  @property({ attribute: false }) pages: UiPageRef[] = [];
  /** Frame positions (page id → top-left corner), owned by the shell's view layout. */
  @property({ attribute: false }) layout: Record<string, Point> = {};
  /** Per-frame sizes (page id → w/h), owned by the shell like the positions. */
  @property({ attribute: false }) sizes: Record<string, { w: number; h: number }> = {};
  @property({ attribute: false }) selectedId: string | null = null;
  /** Multi-selection (shift-click on titles), owned by the shell like selectedId. */
  @property({ attribute: false }) selectedIds: string[] = [];
  /** Pickers handed down to every frame. */
  @property({ attribute: false }) models: { id: string; name: string }[] = [];
  @property({ attribute: false }) mappings: { id: string; name: string }[] = [];
  @property({ attribute: false }) useCases: { id: string; name: string }[] = [];
  @property({ attribute: false }) queryOps: { id: string; name: string; queryServiceId: string }[] = [];
  /** The selected content node across every frame (owned by the shell). */
  @property({ attribute: false }) selectedCmp: { pageId: string; componentId: string } | null = null;

  /** Camera: screen-space pan + zoom. */
  @state() private _t = { x: 40, y: 40, k: 0.85 };
  /** A frame being dragged: live position until the drop commits. */
  @state() private _live: { id: string; x: number; y: number } | null = null;
  /** A frame being resized: live size until the release commits. */
  @state() private _liveSize: { id: string; w: number; h: number } | null = null;

  private _drag:
    | { mode: 'pan'; x: number; y: number; t: { x: number; y: number } }
    | { mode: 'frame'; id: string; x: number; y: number; ox: number; oy: number; moved: boolean }
    | { mode: 'resize'; id: string; x: number; y: number; w0: number; h0: number }
    | null = null;

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background-color: #f8fafc;
      background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
      background-size: 26px 26px;
      cursor: grab;
    }
    :host(:active) {
      cursor: grabbing;
    }
    .surface {
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: 0 0;
    }
    .frame {
      position: absolute;
      width: ${FRAME_W}px;
    }
    .frame-title {
      display: flex;
      align-items: baseline;
      gap: 8px;
      padding: 0 4px 5px;
      cursor: move;
      user-select: none;
      font: 600 12px ui-sans-serif, system-ui, sans-serif;
      color: #475569;
    }
    .frame-title .route {
      font-weight: 400;
      font-size: 11px;
      color: #94a3b8;
    }
    .frame.selected modux-page-designer {
      outline: 2.5px solid #38bdf8;
      outline-offset: 2px;
      border-radius: 12px;
    }
    .frame-grip {
      position: absolute;
      z-index: 50; /* the framed designer keeps z-index 40 from its floating mode */
      right: -7px;
      bottom: -7px;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      background: #38bdf8;
      border: 2px solid #ffffff;
      cursor: nwse-resize;
      opacity: 0;
      transition: opacity 0.12s;
    }
    .frame:hover .frame-grip,
    .frame.selected .frame-grip {
      opacity: 1;
    }
    .hud {
      /* right-aligned: the palette docks on the left and was covering it */
      position: absolute;
      right: 12px;
      bottom: 10px;
      max-width: 46%;
      text-align: right;
      font: 11px ui-sans-serif, system-ui, sans-serif;
      color: #94a3b8;
      pointer-events: none;
    }
    .empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      font: 14px ui-sans-serif, system-ui, sans-serif;
      text-align: center;
      line-height: 1.7;
      pointer-events: none;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = 0;
    this.addEventListener('pointerdown', this.onDown);
    this.addEventListener('pointermove', this.onMove);
    this.addEventListener('pointerup', this.onUp);
    this.addEventListener('pointercancel', this.onUp);
    this.addEventListener('wheel', this.onWheel, { passive: false });
  }

  disconnectedCallback(): void {
    this.removeEventListener('pointerdown', this.onDown);
    this.removeEventListener('pointermove', this.onMove);
    this.removeEventListener('pointerup', this.onUp);
    this.removeEventListener('pointercancel', this.onUp);
    this.removeEventListener('wheel', this.onWheel);
    super.disconnectedCallback();
  }

  /** A client point → surface coordinates (palette drops share the canvas contract). */
  sceneFromClient(clientX: number, clientY: number): Point {
    const rect = this.getBoundingClientRect();
    return {
      x: (clientX - rect.left - this._t.x) / this._t.k,
      y: (clientY - rect.top - this._t.y) / this._t.k,
    };
  }

  /**
   * The frame under a client point — and, when the point sits on a node of the
   * frame's content tree, `cmp:<pageId>:<componentId>` so palette drops can nest.
   */
  nodeIdAtClient(clientX: number, clientY: number): string | null {
    const el = this.shadowRoot?.elementFromPoint(clientX, clientY) as HTMLElement | null;
    const frame = el?.closest?.('.frame') as HTMLElement | null;
    if (!frame) return null;
    const pageId = frame.dataset.pageId!;
    const designer = frame.querySelector('modux-page-designer');
    const inner = designer?.shadowRoot?.elementFromPoint(clientX, clientY) as HTMLElement | null;
    const btn = inner?.closest?.('[data-btn-uc]') as HTMLElement | null;
    if (btn?.dataset.btnUc) return `btn:${pageId}:${btn.dataset.btnUc}`;
    const cmp = inner?.closest?.('[data-cmp-id]') as HTMLElement | null;
    return cmp ? `cmp:${pageId}:${cmp.dataset.cmpId}` : pageId;
  }

  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(
    clientX: number,
    clientY: number,
  ): { pageId: string; componentId: string | null; pos: 'before' | 'after' | 'into' } | null {
    const el = this.shadowRoot?.elementFromPoint(clientX, clientY) as HTMLElement | null;
    const frame = el?.closest?.('.frame') as HTMLElement | null;
    if (!frame) return null;
    const pageId = frame.dataset.pageId!;
    const designer = frame.querySelector('modux-page-designer');
    const inner = designer?.shadowRoot?.elementFromPoint(clientX, clientY) as HTMLElement | null;
    const cmp = inner?.closest?.('[data-cmp-id]') as HTMLElement | null;
    if (!cmp) return { pageId, componentId: null, pos: 'into' };
    const kind = cmp.dataset.cmpKind ?? '';
    const box = cmp.getBoundingClientRect();
    const y = (clientY - box.top) / Math.max(1, box.height);
    const pos = ModuxPageDesigner.LEAF_KINDS.has(kind)
      ? y < 0.5 ? 'before' : 'after'
      : y < 0.2 ? 'before' : y > 0.8 ? 'after' : 'into';
    return { pageId, componentId: cmp.dataset.cmpId!, pos };
  }

  /** The frame's size (live resize, stored, or defaults). */
  private sizeOf(id: string): { w: number; h: number } {
    if (this._liveSize?.id === id) return { w: this._liveSize.w, h: this._liveSize.h };
    return this.sizes[id] ?? { w: FRAME_W, h: 560 };
  }

  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  private posOf(id: string, index: number): Point {
    if (this._live?.id === id) return { x: this._live.x, y: this._live.y };
    return this.layout[id] ?? { x: (index % 3) * GRID_X, y: Math.floor(index / 3) * GRID_Y };
  }

  private onDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    this.focus();
    const path = e.composedPath() as HTMLElement[];
    const grip = path.find((el) => el.classList?.contains('frame-grip'));
    if (grip) {
      const frame = grip.closest('.frame') as HTMLElement;
      const id = frame.dataset.pageId!;
      const size = this.sizeOf(id);
      try {
        this.setPointerCapture(e.pointerId);
      } catch {
        return;
      }
      this._drag = { mode: 'resize', id, x: e.clientX, y: e.clientY, w0: size.w, h0: size.h };
      e.preventDefault();
      return;
    }
    const title = path.find((el) => el.classList?.contains('frame-title'));
    if (title) {
      const frame = title.closest('.frame') as HTMLElement;
      const id = frame.dataset.pageId!;
      if (e.shiftKey) {
        // shift-click gathers frames for «crear vista con la selección»
        this.emit('element-multi-toggled', { id });
        e.preventDefault();
        return;
      }
      const index = this.pages.findIndex((p) => p.id === id);
      const at = this.posOf(id, index);
      // Select FIRST: a capture failure must never swallow the selection.
      this.emit('element-selected', { elementType: 'node', id, kind: 'page' });
      try {
        this.setPointerCapture(e.pointerId);
      } catch {
        return;
      }
      this._drag = { mode: 'frame', id, x: e.clientX, y: e.clientY, ox: at.x, oy: at.y, moved: false };
      e.preventDefault();
      return;
    }
    // inside a frame: let the designer work; on the background: pan
    if (path.some((el) => el.tagName === 'MODUX-PAGE-DESIGNER')) return;
    try {
      this.setPointerCapture(e.pointerId);
    } catch {
      return;
    }
    this._drag = { mode: 'pan', x: e.clientX, y: e.clientY, t: { x: this._t.x, y: this._t.y } };
  };

  private onMove = (e: PointerEvent): void => {
    const drag = this._drag;
    if (!drag) return;
    if (drag.mode === 'pan') {
      this._t = { ...this._t, x: drag.t.x + e.clientX - drag.x, y: drag.t.y + e.clientY - drag.y };
      return;
    }
    const dx = (e.clientX - drag.x) / this._t.k;
    const dy = (e.clientY - drag.y) / this._t.k;
    if (drag.mode === 'resize') {
      this._liveSize = {
        id: drag.id,
        w: Math.max(280, Math.round(drag.w0 + dx)),
        h: Math.max(220, Math.round(drag.h0 + dy)),
      };
      return;
    }
    if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
    this._live = { id: drag.id, x: drag.ox + dx, y: drag.oy + dy };
  };

  private onUp = (): void => {
    const drag = this._drag;
    this._drag = null;
    if (drag?.mode === 'resize' && this._liveSize) {
      const s = this._liveSize;
      this._liveSize = null;
      if (s.w !== drag.w0 || s.h !== drag.h0) {
        this.emit('frame-resized', { id: drag.id, w: s.w, h: s.h });
      }
      return;
    }
    if (drag?.mode === 'frame' && drag.moved && this._live) {
      this.emit('node-moved', {
        id: drag.id,
        x: Math.round(this._live.x),
        y: Math.round(this._live.y),
      });
    }
    this._live = null;
  };

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    const rect = this.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    const k = Math.max(0.2, Math.min(2.5, this._t.k * factor));
    // zoom toward the cursor: the point under it stays put
    this._t = {
      k,
      x: mx - ((mx - this._t.x) / this._t.k) * k,
      y: my - ((my - this._t.y) / this._t.k) * k,
    };
  };

  render() {
    return html`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((page, i) => {
          const at = this.posOf(page.id, i);
          const size = this.sizeOf(page.id);
          return html`
            <div
              class="frame ${this.selectedId === page.id || this.selectedIds.includes(page.id)
                ? 'selected'
                : ''}"
              data-page-id=${page.id}
              style="left: ${at.x}px; top: ${at.y}px; width: ${size.w}px"
            >
              <div class="frame-title">
                ${page.name}
                <span class="route">${page.route ?? ''} · ${page.type ?? 'PAGE'}</span>
              </div>
              <modux-page-designer
                framed
                style="height: ${size.h}px; width: ${size.w}px"
                .page=${page}
                .selectedCmpId=${this.selectedCmp?.pageId === page.id
                  ? this.selectedCmp.componentId
                  : null}
                .models=${this.models}
                .mappings=${this.mappings}
                .useCases=${this.useCases}
                .queryOps=${this.queryOps}
                @component-config-changed=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-component-config-changed', { pageId: page.id, ...e.detail });
                }}
                @component-removed=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-component-removed', { pageId: page.id, ...e.detail });
                }}
                @component-moved=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-component-moved', { pageId: page.id, ...e.detail });
                }}
                @component-selected=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-component-selected', { pageId: page.id, ...e.detail });
                }}
                @component-transferred=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-component-transferred', { toPageId: page.id, ...e.detail });
                }}
                @wizard-step-moved=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-wizard-step-moved', { pageId: page.id, ...e.detail });
                }}
                @page-renamed=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-renamed', { pageId: page.id, ...e.detail });
                }}
                @page-type-changed=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-type-changed', { pageId: page.id, ...e.detail });
                }}
                @page-route-changed=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-route-changed', { pageId: page.id, ...e.detail });
                }}
                @page-model-changed=${(e: CustomEvent) => {
                  e.stopPropagation();
                  this.emit('page-model-changed', { pageId: page.id, ...e.detail });
                }}
                @button-added=${(e: CustomEvent) => this.emit('page-button-added', { pageId: page.id, ...e.detail })}
                @button-changed=${(e: CustomEvent) => this.emit('page-button-changed', { pageId: page.id, ...e.detail })}
                @button-removed=${(e: CustomEvent) => this.emit('page-button-removed', { pageId: page.id, ...e.detail })}
                @open-crud=${() => this.emit('page-open-crud', { pageId: page.id })}
                @field-config-changed=${(e: CustomEvent) =>
                  this.emit('page-field-config-changed', { pageId: page.id, ...e.detail })}
                @fields-reordered=${(e: CustomEvent) =>
                  this.emit('page-fields-reordered', { pageId: page.id, ...e.detail })}
              ></modux-page-designer>
              <div class="frame-grip" title="Arrastra para redimensionar la página"></div>
            </div>
          `;
        })}
      </div>
      ${this.pages.length
        ? ''
        : html`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-figma': ModuxFigma;
  }
}
