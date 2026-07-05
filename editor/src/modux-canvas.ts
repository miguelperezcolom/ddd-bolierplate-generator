import { LitElement, html, svg, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom';
import type { Scene, SceneNode, SceneEdge } from './scene.js';

/**
 * Generic, fully editable diagram canvas. Semantics-free: renders a Scene and
 * emits gestures as events. The embedding shell (modux-editor) translates
 * gestures into model commands.
 *
 * Events (all CustomEvent, composed, bubbling):
 *  - node-moved        { id, x, y }             after a drag ends
 *  - connect-requested { sourceId, targetId }   edge-drawing gesture completed
 *  - element-selected  { elementType, id, kind }  click on node or edge
 *  - element-activated { elementType, id, kind }  double click
 *  - selection-cleared                          click on empty canvas
 */
@customElement('modux-canvas')
export class ModuxCanvas extends LitElement {
  @property({ attribute: false }) scene: Scene = { nodes: [], edges: [] };
  @property({ attribute: false }) selectedId: string | null = null;
  /** Whether the connect gesture (drag from node handles) is available. */
  @property({ type: Boolean }) connectable = true;

  @state() private _t: ZoomTransform = zoomIdentity;
  @state() private _dragPos: { id: string; x: number; y: number } | null = null;
  @state() private _pendingLink: { sourceId: string; x: number; y: number } | null = null;
  @state() private _hoverNodeId: string | null = null;
  @state() private _editingId: string | null = null;

  private _zoomBehavior?: ZoomBehavior<SVGSVGElement, unknown>;
  private _fitted = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--modux-canvas-bg, #fafafa);
      overflow: hidden;
      outline: none;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }
    svg.linking {
      cursor: crosshair;
    }
    g[data-node-id] {
      cursor: move;
    }
    g[data-node-id] text {
      pointer-events: none;
    }
    circle[data-handle] {
      cursor: crosshair;
    }
    .edge-hit {
      cursor: pointer;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = 0;
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  private _onKeyDown = (e: KeyboardEvent): void => {
    if (this._editingId) return; // the inline input handles its own keys
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      this.emit(e.shiftKey ? 'redo-requested' : 'undo-requested');
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      this.emit('redo-requested');
      return;
    }
    if (e.key === 'F2' && this.selectedId) {
      const node = this.scene.nodes.find((x) => x.id === this.selectedId);
      if (node) {
        e.preventDefault();
        this._editingId = node.id;
      }
      return;
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedId) {
      const edge = this.scene.edges.find((x) => x.id === this.selectedId);
      const node = this.scene.nodes.find((x) => x.id === this.selectedId);
      const el = edge ?? node;
      if (el) {
        e.preventDefault();
        this.emit('delete-requested', {
          elementType: edge ? 'edge' : 'node',
          id: el.id,
          kind: el.kind,
        });
      }
    }
  };

  private commitRename(node: SceneNode, value: string): void {
    if (this._editingId !== node.id) return;
    this._editingId = null;
    const name = value.trim();
    if (name && name !== node.label) {
      this.emit('node-renamed', { id: node.id, kind: node.kind, name });
    }
  }

  protected firstUpdated(): void {
    const svgEl = this.renderRoot.querySelector('svg') as SVGSVGElement;
    this._zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.15, 4])
      .filter((event: Event) => {
        const target = event.target as Element;
        // Nodes and handles manage their own pointer gestures; wheel zoom works anywhere.
        if (target.closest('[data-node-id]') || target.closest('[data-handle]')) {
          return event.type === 'wheel';
        }
        return event.type === 'wheel' || (event as MouseEvent).button === 0;
      })
      .on('zoom', (event) => {
        this._t = event.transform;
      });
    select(svgEl).call(this._zoomBehavior);
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('scene')) {
      // The host is the source of truth for geometry once it re-emits the scene.
      this._dragPos = null;
    }
  }

  protected updated(): void {
    if (!this._fitted && this.scene.nodes.length > 0 && this._zoomBehavior) {
      this._fitted = true;
      this.fit();
    }
    if (this._editingId) {
      const input = this.renderRoot.querySelector('foreignObject input') as HTMLInputElement | null;
      if (input && this.shadowRoot?.activeElement !== input) {
        input.focus();
        input.select();
      }
    }
  }

  /** Center and scale the viewport so the whole scene is visible. */
  fit(padding = 60): void {
    const nodes = this.scene.nodes;
    const svgEl = this.renderRoot.querySelector('svg') as SVGSVGElement | null;
    if (!nodes.length || !svgEl || !this._zoomBehavior) return;
    const rect = this.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const minX = Math.min(...nodes.map((n) => n.x - n.w / 2)) - padding;
    const maxX = Math.max(...nodes.map((n) => n.x + n.w / 2)) + padding;
    const minY = Math.min(...nodes.map((n) => n.y - n.h / 2)) - padding;
    const maxY = Math.max(...nodes.map((n) => n.y + n.h / 2)) + padding;
    const k = Math.max(0.15, Math.min(rect.width / (maxX - minX), rect.height / (maxY - minY), 1.25));
    const t = zoomIdentity
      .translate(rect.width / 2 - (k * (minX + maxX)) / 2, rect.height / 2 - (k * (minY + maxY)) / 2)
      .scale(k);
    select(svgEl).call(this._zoomBehavior.transform, t);
  }

  /** Client coordinates → scene coordinates (undo pan/zoom). */
  private toScene(e: PointerEvent | MouseEvent): { x: number; y: number } {
    const rect = this.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - this._t.x) / this._t.k,
      y: (e.clientY - rect.top - this._t.y) / this._t.k,
    };
  }

  private nodePos(node: SceneNode): { x: number; y: number } {
    if (this._dragPos && this._dragPos.id === node.id) {
      return { x: this._dragPos.x, y: this._dragPos.y };
    }
    return { x: node.x, y: node.y };
  }

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  // ---- node dragging ------------------------------------------------------

  private onNodePointerDown(e: PointerEvent, node: SceneNode): void {
    if (e.button !== 0) return;
    e.stopPropagation();
    this.focus();
    const start = this.toScene(e);
    const origin = this.nodePos(node);
    let moved = false;

    const onMove = (ev: PointerEvent) => {
      const p = this.toScene(ev);
      const dx = p.x - start.x;
      const dy = p.y - start.y;
      if (!moved && Math.hypot(dx, dy) < 3 / this._t.k) return;
      moved = true;
      this._dragPos = { id: node.id, x: origin.x + dx, y: origin.y + dy };
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (moved && this._dragPos) {
        this.emit('node-moved', { id: node.id, x: this._dragPos.x, y: this._dragPos.y });
      } else {
        this.emit('element-selected', { elementType: 'node', id: node.id, kind: node.kind });
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  // ---- edge drawing (connect gesture) -------------------------------------

  private onHandlePointerDown(e: PointerEvent, node: SceneNode): void {
    if (e.button !== 0) return;
    e.stopPropagation();
    const p = this.toScene(e);
    this._pendingLink = { sourceId: node.id, x: p.x, y: p.y };

    const onMove = (ev: PointerEvent) => {
      const q = this.toScene(ev);
      this._pendingLink = { sourceId: node.id, x: q.x, y: q.y };
      const el = this.shadowRoot?.elementFromPoint(ev.clientX, ev.clientY);
      const g = el?.closest('[data-node-id]');
      this._hoverNodeId = g ? g.getAttribute('data-node-id') : null;
    };
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      const el = this.shadowRoot?.elementFromPoint(ev.clientX, ev.clientY);
      const targetId = el?.closest('[data-node-id]')?.getAttribute('data-node-id');
      if (targetId && targetId !== node.id) {
        this.emit('connect-requested', { sourceId: node.id, targetId });
      }
      this._pendingLink = null;
      this._hoverNodeId = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  // ---- geometry helpers ----------------------------------------------------

  /** Point on the border of `node` along the line towards (tx, ty). */
  private borderPoint(node: SceneNode, tx: number, ty: number): { x: number; y: number } {
    const { x, y } = this.nodePos(node);
    const dx = tx - x;
    const dy = ty - y;
    const hw = node.w / 2;
    const hh = node.h / 2;
    if (dx === 0 && dy === 0) return { x, y };
    const scale = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh);
    return { x: x + dx * scale, y: y + dy * scale };
  }

  // ---- rendering -----------------------------------------------------------

  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  private edgeOffset(edge: SceneEdge): number {
    const key = [edge.sourceId, edge.targetId].sort().join('|');
    const siblings = this.scene.edges.filter(
      (e) => [e.sourceId, e.targetId].sort().join('|') === key,
    );
    if (siblings.length < 2) return 0;
    const index = siblings.findIndex((e) => e.id === edge.id);
    return (index - (siblings.length - 1) / 2) * 20;
  }

  private renderEdge(edge: SceneEdge): TemplateResult | typeof svg.prototype {
    const source = this.scene.nodes.find((n) => n.id === edge.sourceId);
    const target = this.scene.nodes.find((n) => n.id === edge.targetId);
    if (!source || !target) return svg``;
    const sp = this.nodePos(source);
    const tp = this.nodePos(target);
    let a = this.borderPoint(source, tp.x, tp.y);
    let b = this.borderPoint(target, sp.x, sp.y);
    const offset = this.edgeOffset(edge);
    if (offset !== 0) {
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const nx = (-(b.y - a.y) / len) * offset;
      const ny = ((b.x - a.x) / len) * offset;
      a = { x: a.x + nx, y: a.y + ny };
      b = { x: b.x + nx, y: b.y + ny };
    }
    const color = edge.color ?? '#64748b';
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const selected = this.selectedId === edge.id;
    return svg`
      <g data-edge-id=${edge.id}>
        <line class="edge-hit" x1=${a.x} y1=${a.y} x2=${b.x} y2=${b.y}
              stroke="transparent" stroke-width="14"
              @click=${(e: MouseEvent) => {
                e.stopPropagation();
                this.focus();
                this.emit('element-selected', { elementType: 'edge', id: edge.id, kind: edge.kind });
              }}>
          ${edge.tooltip ? svg`<title>${edge.tooltip}</title>` : ''}
        </line>
        <line x1=${a.x} y1=${a.y} x2=${b.x} y2=${b.y}
              stroke=${color} stroke-width=${selected ? 3 : 1.6}
              stroke-dasharray=${edge.dashed ? '6 4' : ''}
              marker-end=${edge.arrow ? `url(#arrow-${this.markerId(color)})` : ''}
              pointer-events="none"></line>
        ${edge.label
          ? svg`<text x=${mid.x} y=${mid.y - 6} text-anchor="middle"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${color}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3">
                  ${edge.label}
                </text>`
          : ''}
      </g>
    `;
  }

  private markerId(color: string): string {
    return color.replace(/[^a-zA-Z0-9]/g, '');
  }

  private renderNode(node: SceneNode): TemplateResult | typeof svg.prototype {
    const { x, y } = this.nodePos(node);
    const selected = this.selectedId === node.id;
    const hovered = this._hoverNodeId === node.id;
    const hw = node.w / 2;
    const hh = node.h / 2;
    return svg`
      <g data-node-id=${node.id} transform="translate(${x}, ${y})"
         @pointerdown=${(e: PointerEvent) => this.onNodePointerDown(e, node)}
         @dblclick=${(e: MouseEvent) => {
           e.stopPropagation();
           this.emit('element-activated', { elementType: 'node', id: node.id, kind: node.kind });
         }}>
        <rect x=${-hw} y=${-hh} width=${node.w} height=${node.h} rx="10"
              fill=${node.fill ?? '#ffffff'}
              stroke=${hovered ? '#2563eb' : selected ? '#2563eb' : node.stroke ?? '#94a3b8'}
              stroke-width=${selected || hovered ? 2.5 : 1.4}
              stroke-dasharray=${node.dashed ? '6 4' : ''}>
          ${node.tooltip ? svg`<title>${node.tooltip}</title>` : ''}
        </rect>
        ${node.badge
          ? svg`<text x=${-hw} y=${-hh - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${node.badge}</text>`
          : ''}
        ${this._editingId === node.id
          ? svg`
              <foreignObject x=${-hw + 6} y="-14" width=${node.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: center; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${node.label}
                  @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
                  @keydown=${(e: KeyboardEvent) => {
                    e.stopPropagation();
                    if (e.key === 'Enter') this.commitRename(node, (e.target as HTMLInputElement).value);
                    if (e.key === 'Escape') this._editingId = null;
                  }}
                  @blur=${(e: FocusEvent) =>
                    this.commitRename(node, (e.target as HTMLInputElement).value)}
                />
              </foreignObject>`
          : svg`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
              font-family="ui-sans-serif, system-ui" fill="#1e293b">${node.label}</text>`}
        ${selected && this.connectable
          ? [
              [hw, 0],
              [-hw, 0],
              [0, hh],
              [0, -hh],
            ].map(
              ([cx, cy]) => svg`
                <circle data-handle cx=${cx} cy=${cy} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(e: PointerEvent) => this.onHandlePointerDown(e, node)}>
                  <title>Arrastra hasta otro nodo para crear una relación</title>
                </circle>`,
            )
          : ''}
      </g>
    `;
  }

  private renderPendingLink(): TemplateResult | typeof svg.prototype {
    if (!this._pendingLink) return svg``;
    const source = this.scene.nodes.find((n) => n.id === this._pendingLink!.sourceId);
    if (!source) return svg``;
    const a = this.borderPoint(source, this._pendingLink.x, this._pendingLink.y);
    return svg`
      <line x1=${a.x} y1=${a.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }

  render() {
    const colors = [...new Set(this.scene.edges.map((e) => e.color ?? '#64748b'))];
    return html`
      <svg
        class=${this._pendingLink ? 'linking' : ''}
        @pointerdown=${(e: PointerEvent) => {
          const target = e.target as Element;
          if (!target.closest('[data-node-id]') && !target.closest('[data-edge-id]')) {
            this.emit('selection-cleared');
          }
        }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${colors.map(
            (c) => svg`
              <marker id="arrow-${this.markerId(c)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${c}></path>
              </marker>`,
          )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${this.scene.edges.map((e) => this.renderEdge(e))}
          ${this.scene.nodes.map((n) => this.renderNode(n))}
          ${this.renderPendingLink()}
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-canvas': ModuxCanvas;
  }
}
