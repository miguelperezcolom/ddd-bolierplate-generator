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

  /** Camera: orbit angles (deg), zoom and screen-space pan. */
  @state() private _rx = 55;
  @state() private _rz = -18;
  @state() private _k = 1;
  @state() private _pan = { x: 0, y: 0 };

  private _drag: { x: number; y: number; rx: number; rz: number; pan: { x: number; y: number }; panning: boolean } | null =
    null;

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
    this.addEventListener('dblclick', this.reset);
  }

  disconnectedCallback(): void {
    this.removeEventListener('pointerdown', this.onDown);
    this.removeEventListener('pointermove', this.onMove);
    this.removeEventListener('pointerup', this.onUp);
    this.removeEventListener('pointercancel', this.onUp);
    this.removeEventListener('wheel', this.onWheel);
    this.removeEventListener('dblclick', this.reset);
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.focus();
  }

  private onDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;
    this.focus();
    this.setPointerCapture?.(e.pointerId);
    this._drag = {
      x: e.clientX,
      y: e.clientY,
      rx: this._rx,
      rz: this._rz,
      pan: { ...this._pan },
      panning: e.shiftKey,
    };
  };

  private onMove = (e: PointerEvent): void => {
    if (!this._drag) return;
    const dx = e.clientX - this._drag.x;
    const dy = e.clientY - this._drag.y;
    if (this._drag.panning) {
      this._pan = { x: this._drag.pan.x + dx, y: this._drag.pan.y + dy };
    } else {
      // Horizontal drag spins the model, vertical drag tilts it (clamped so it
      // never flips under the floor or goes fully flat-on-edge).
      this._rz = this._drag.rz + dx * 0.4;
      this._rx = Math.max(5, Math.min(80, this._drag.rx + dy * 0.3));
    }
  };

  private onUp = (): void => {
    this._drag = null;
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
    const STOREY = 30; // px of elevation per containment level

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
                x1=${s.x} y1=${s.y} x2=${t.x} y2=${t.y}
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
            const dx = t.x - s.x;
            const dy = t.y - s.y;
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
                left: ${s.x}px; top: ${s.y}px; width: ${len}px; height: 1.7px;
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
                class="n3 ${n.container ? 'container3' : ''}"
                title=${n.tooltip ?? n.label}
                style="
                  left: ${n.x - n.w / 2}px; top: ${n.y - n.h / 2}px;
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
        arrastra para orbitar · shift+arrastra mueve · rueda para zoom · doble click resetea
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-tilt': ModuxTilt;
  }
}
