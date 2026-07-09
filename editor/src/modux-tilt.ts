import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Scene, SceneNode } from './scene.js';

/**
 * The Firefox-Tilt view of a diagram: the SAME Scene every view adapter already
 * produces, rendered as stacked 3D plates — containment depth becomes height
 * (a bounded context is the base plate, its chips float one storey above, an
 * API's operations one more), and the edges lie on the floor plane. Pure CSS 3D
 * (perspective + preserve-3d), no WebGL, no dependencies.
 *
 * A read-only lens: drag orbits, shift+drag pans, wheel zooms, double click
 * resets the camera. Editing stays in <modux-canvas>.
 */
@customElement('modux-tilt')
export class ModuxTilt extends LitElement {
  @property({ attribute: false }) scene: Scene = { nodes: [], edges: [] };
  /** Selection, owned by the shell (same contract as <modux-canvas>). */
  @property({ attribute: false }) selectedId: string | null = null;

  /** Camera: orbit angles (deg), zoom and screen-space pan. */
  @state() private _rx = 55;
  @state() private _rz = -18;
  @state() private _k = 1;
  @state() private _pan = { x: 0, y: 0 };
  /** A plate being dragged: its live scene-space offset until the drop commits. */
  @state() private _liveMove: { id: string; dx: number; dy: number } | null = null;

  private _drag:
    | {
        mode: 'orbit' | 'pan' | 'node';
        x: number;
        y: number;
        rx: number;
        rz: number;
        pan: { x: number; y: number };
        nodeId?: string;
        nodeKind?: string;
        moved?: boolean;
      }
    | null = null;
  /** The total scale used at the last render — needed to unproject pointer deltas. */
  private _kUsed = 1;

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse at 50% 30%, #1e293b 0%, #0f172a 70%);
      cursor: grab;
      user-select: none;
      touch-action: none;
    }
    :host(:active) {
      cursor: grabbing;
    }
    .stage {
      position: absolute;
      inset: 0;
      perspective: 1600px;
      perspective-origin: 50% 42%;
    }
    .world {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0;
      height: 0;
      transform-style: preserve-3d;
    }
    .world,
    .world * {
      transform-style: preserve-3d;
    }
    .floor {
      position: absolute;
      overflow: visible;
      /* Shadows only — coplanar with the base plates, it must never win the hit test. */
      pointer-events: none;
    }
    .edge3 {
      position: absolute;
      height: 0;
      transform-origin: 0 50%;
      pointer-events: none;
    }
    .n3 {
      position: absolute;
      box-sizing: border-box;
      border: 1.6px solid;
      border-radius: 8px;
      font: 600 12px ui-sans-serif, system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2px 6px;
      overflow: hidden;
      cursor: move;
    }
    .n3.selected3 {
      outline: 2.5px solid #38bdf8;
      outline-offset: 2px;
    }
    .n3.container3 {
      align-items: flex-start;
      justify-content: flex-start;
      font-weight: 700;
      font-size: 13px;
      padding: 6px 10px;
    }
    .n3 .badge3 {
      position: absolute;
      top: -16px;
      left: 0;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.07em;
      color: #94a3b8;
      white-space: nowrap;
    }
    .hud {
      position: absolute;
      left: 12px;
      bottom: 10px;
      font: 11px ui-sans-serif, system-ui, sans-serif;
      color: #94a3b8;
      pointer-events: none;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    // Focusable, so the editor-level shortcuts (V to leave, F, ?) keep working.
    this.tabIndex = 0;
    this.addEventListener('pointerdown', this.onDown);
    this.addEventListener('pointermove', this.onMove);
    this.addEventListener('pointerup', this.onUp);
    this.addEventListener('pointercancel', this.onUp);
    this.addEventListener('wheel', this.onWheel, { passive: false });
    this.addEventListener('dblclick', this.onDblClick);
    this.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('pointerdown', this.onDown);
    this.removeEventListener('pointermove', this.onMove);
    this.removeEventListener('pointerup', this.onUp);
    this.removeEventListener('pointercancel', this.onUp);
    this.removeEventListener('wheel', this.onWheel);
    this.removeEventListener('dblclick', this.onDblClick);
    this.removeEventListener('keydown', this.onKeydown);
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.focus();
  }

  /** The plate under the pointer, if any (events retarget at the host boundary). */
  private plateAt(e: Event): HTMLElement | null {
    const el = e.composedPath()[0] as HTMLElement | undefined;
    return (el?.closest?.('.n3') as HTMLElement | null) ?? null;
  }

  /**
   * A pointer delta on screen → a delta on the floor plane: undo the zoom, the
   * rotateX foreshortening of the screen-Y axis, then the rotateZ bearing.
   */
  private unproject(dxScreen: number, dyScreen: number): { x: number; y: number } {
    const ux = dxScreen / this._kUsed;
    const uy = dyScreen / this._kUsed / Math.cos((this._rx * Math.PI) / 180);
    const rz = (this._rz * Math.PI) / 180;
    return {
      x: ux * Math.cos(rz) + uy * Math.sin(rz),
      y: -ux * Math.sin(rz) + uy * Math.cos(rz),
    };
  }

  private onDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    this.focus();
    this.setPointerCapture?.(e.pointerId);
    const plate = this.plateAt(e);
    this._drag = {
      mode: plate ? 'node' : e.shiftKey ? 'pan' : 'orbit',
      x: e.clientX,
      y: e.clientY,
      rx: this._rx,
      rz: this._rz,
      pan: { ...this._pan },
      nodeId: plate?.dataset.nodeId,
      nodeKind: plate?.dataset.kind,
      moved: false,
    };
  };

  private onMove = (e: PointerEvent): void => {
    if (!this._drag) return;
    const dx = e.clientX - this._drag.x;
    const dy = e.clientY - this._drag.y;
    if (this._drag.mode === 'node') {
      if (Math.hypot(dx, dy) > 3) this._drag.moved = true;
      if (this._drag.moved && this._drag.nodeId) {
        const d = this.unproject(dx, dy);
        this._liveMove = { id: this._drag.nodeId, dx: d.x, dy: d.y };
      }
      return;
    }
    if (this._drag.mode === 'pan') {
      this._pan = { x: this._drag.pan.x + dx, y: this._drag.pan.y + dy };
    } else {
      // Horizontal drag spins the model, vertical drag tilts it (clamped so it
      // never flips under the floor or goes fully flat-on-edge).
      this._rz = this._drag.rz + dx * 0.4;
      this._rx = Math.max(5, Math.min(80, this._drag.rx + dy * 0.3));
    }
  };

  private onUp = (): void => {
    const drag = this._drag;
    this._drag = null;
    if (!drag) return;
    if (drag.mode === 'node' && drag.nodeId) {
      const node = this.scene.nodes.find((n) => n.id === drag.nodeId);
      if (drag.moved && node && this._liveMove) {
        // Same contract as the canvas: the shell persists the layout + undo.
        this.emit('node-moved', {
          id: drag.nodeId,
          x: node.x + this._liveMove.dx,
          y: node.y + this._liveMove.dy,
        });
      } else if (node) {
        this.emit('element-selected', { elementType: 'node', id: node.id, kind: node.kind });
      }
      this._liveMove = null;
      return;
    }
    // A background click (no orbit/pan movement) clears the selection.
    if (!drag.moved && Math.abs(this._rz - drag.rz) < 0.5 && Math.abs(this._rx - drag.rx) < 0.5
        && this._pan.x === drag.pan.x && this._pan.y === drag.pan.y) {
      this.emit('selection-cleared');
    }
  };

  private onDblClick = (e: MouseEvent): void => {
    // Pointer capture from the drag retargets the derived dblclick to the host,
    // so the plate is resolved by coordinates instead of by composedPath.
    const under = this.shadowRoot?.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    const plate = (under?.closest?.('.n3') as HTMLElement | null) ?? this.plateAt(e);
    if (plate?.dataset.nodeId) {
      this.emit('element-activated', {
        elementType: 'node',
        id: plate.dataset.nodeId,
        kind: plate.dataset.kind,
      });
      return;
    }
    this.reset();
  };

  private onKeydown = (e: KeyboardEvent): void => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      this.emit(e.shiftKey ? 'redo-requested' : 'undo-requested');
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
      e.preventDefault();
      this.emit('redo-requested');
      return;
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedId) {
      const node = this.scene.nodes.find((n) => n.id === this.selectedId);
      if (node) {
        e.preventDefault();
        this.emit('delete-requested', { elementType: 'node', id: node.id, kind: node.kind });
      }
    }
    if (e.key === 'Escape') this.emit('selection-cleared');
  };

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    this._k = Math.max(0.15, Math.min(3, this._k * factor));
  };

  private reset = (): void => {
    this._rx = 55;
    this._rz = -18;
    this._k = 1;
    this._pan = { x: 0, y: 0 };
  };

  /** Containment depth: how many parents above the node (0 = floor plate). */
  private depths(): Map<string, number> {
    const byId = new Map(this.scene.nodes.map((n) => [n.id, n]));
    const depth = new Map<string, number>();
    const of = (n: SceneNode): number => {
      const cached = depth.get(n.id);
      if (cached !== undefined) return cached;
      const parent = n.parentId ? byId.get(n.parentId) : undefined;
      const d = parent ? of(parent) + 1 : 0;
      depth.set(n.id, d);
      return d;
    };
    for (const n of this.scene.nodes) of(n);
    return depth;
  }

  render() {
    const nodes = this.scene.nodes;
    if (!nodes.length) {
      return html`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    }
    const depth = this.depths();
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const minX = Math.min(...nodes.map((n) => n.x - n.w / 2)) - 60;
    const maxX = Math.max(...nodes.map((n) => n.x + n.w / 2)) + 60;
    const minY = Math.min(...nodes.map((n) => n.y - n.h / 2)) - 60;
    const maxY = Math.max(...nodes.map((n) => n.y + n.h / 2)) + 60;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    // Auto-fit the initial zoom to the host size.
    const rect = this.getBoundingClientRect();
    const fit = rect.width
      ? Math.min(rect.width / (maxX - minX), rect.height / (maxY - minY), 1) * 0.9
      : 0.5;
    const k = this._k * fit;
    this._kUsed = k; // the unprojection of pointer deltas needs the real scale
    const STOREY = 30; // px of elevation per containment level
    const live = this._liveMove;
    const lx = (n: SceneNode) => n.x + (live?.id === n.id ? live.dx : 0);
    const ly = (n: SceneNode) => n.y + (live?.id === n.id ? live.dy : 0);

    return html`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${k}, ${k}, ${k}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-cx}px, ${-cy}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${minX}px; top: ${minY}px"
            width=${maxX - minX}
            height=${maxY - minY}
            viewBox="${minX} ${minY} ${maxX - minX} ${maxY - minY}"
          >
            ${this.scene.edges.map((e) => {
              const s = byId.get(e.sourceId);
              const t = byId.get(e.targetId);
              if (!s || !t) return '';
              // Faint shadow on the floor: the depth cue under the real 3D line.
              return svg`<line
                x1=${lx(s)} y1=${ly(s)} x2=${lx(t)} y2=${ly(t)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
            })}
          </svg>
          ${this.scene.edges.map((e) => {
            const s = byId.get(e.sourceId);
            const t = byId.get(e.targetId);
            if (!s || !t) return '';
            // A 3D segment between the two plates: rotateZ sets the bearing on
            // the XY plane, rotateY lifts the far end to the target's storey.
            const z1 = (depth.get(s.id) ?? 0) * STOREY + 2;
            const z2 = (depth.get(t.id) ?? 0) * STOREY + 2;
            const dx = lx(t) - lx(s);
            const dy = ly(t) - ly(s);
            const dz = z2 - z1;
            const dxy = Math.hypot(dx, dy);
            const len = Math.hypot(dxy, dz);
            const bearing = (Math.atan2(dy, dx) * 180) / Math.PI;
            const climb = (Math.atan2(dz, dxy) * 180) / Math.PI;
            const color = e.color ?? '#64748b';
            const stroke = e.dashed
              ? `repeating-linear-gradient(90deg, ${color} 0 6px, transparent 6px 10px)`
              : color;
            return html`<div
              class="edge3"
              style="
                left: ${lx(s)}px; top: ${ly(s)}px; width: ${len}px; height: 1.7px;
                transform: translateZ(${z1}px) rotateZ(${bearing}deg) rotateY(${-climb}deg);
                background: ${stroke};
                opacity: 0.9;
              "
            ></div>`;
          })}
          ${nodes.map((n) => {
            const d = depth.get(n.id) ?? 0;
            const isPlate = n.container || d === 0;
            return html`
              <div
                class="n3 ${n.container ? 'container3' : ''} ${this.selectedId === n.id
                  ? 'selected3'
                  : ''}"
                data-node-id=${n.id}
                data-kind=${n.kind}
                title=${n.tooltip ?? n.label}
                style="
                  left: ${lx(n) - n.w / 2}px; top: ${ly(n) - n.h / 2}px;
                  width: ${n.w}px; height: ${n.h}px;
                  transform: translateZ(${d * STOREY}px);
                  background: ${n.container
                    ? 'color-mix(in srgb, ' + (n.fill ?? '#ffffff') + ' 82%, transparent)'
                    : (n.fill ?? '#ffffff')};
                  border-color: ${n.stroke ?? '#64748b'};
                  border-style: ${n.dashed ? 'dashed' : 'solid'};
                  color: #1e293b;
                  box-shadow: ${isPlate
                    ? '0 18px 30px rgba(0, 0, 0, 0.45)'
                    : '0 10px 16px rgba(0, 0, 0, 0.35)'};
                "
              >
                ${n.badge ? html`<span class="badge3" style="color: ${n.stroke ?? '#94a3b8'}">${n.badge}</span>` : ''}
                <span>${n.label}</span>
              </div>
            `;
          })}
        </div>
      </div>
      <div class="hud">
        click selecciona · doble click abre · arrastra una placa para moverla · arrastra el fondo
        para orbitar · shift+arrastra panea · rueda para zoom · Supr borra · doble click en el
        fondo resetea
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-tilt': ModuxTilt;
  }
}
