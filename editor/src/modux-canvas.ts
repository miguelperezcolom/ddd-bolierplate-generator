import { LitElement, html, svg, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom';
import type { Scene, SceneNode, SceneEdge, Point } from './scene.js';
import { CONTAINER_HEADER, CONTAINER_INSET, containerMinSize } from './scene.js';

/** Segment intersection with parameter t on (a→b); endpoints excluded. */
function segIntersect(
  a: Point,
  b: Point,
  c: Point,
  d: Point,
): (Point & { t: number }) | null {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const denom = rx * sy - ry * sx;
  if (Math.abs(denom) < 1e-9) return null;
  const t = ((c.x - a.x) * sy - (c.y - a.y) * sx) / denom;
  const u = ((c.x - a.x) * ry - (c.y - a.y) * rx) / denom;
  if (t <= 0.02 || t >= 0.98 || u <= 0.02 || u >= 0.98) return null;
  return { x: a.x + t * rx, y: a.y + t * ry, t };
}

/** Distance from point p to segment a→b, plus the projection parameter. */
function pointToSegment(p: Point, a: Point, b: Point): { dist: number; t: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  const qx = a.x + t * dx;
  const qy = a.y + t * dy;
  return { dist: Math.hypot(p.x - qx, p.y - qy), t };
}

/**
 * SVG path along `pts`, hopping over earlier edges with a small arc wherever
 * they cross — the classic wire "bridge".
 */
function pathWithBridges(pts: Point[], priorSegments: [Point, Point][], radius = 7): string {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const ux = (b.x - a.x) / len;
    const uy = (b.y - a.y) / len;
    const crossings = priorSegments
      .map(([c, e]) => segIntersect(a, b, c, e))
      .filter((p): p is Point & { t: number } => p !== null)
      .filter((p) => p.t * len > radius + 2 && (1 - p.t) * len > radius + 2)
      .sort((p, q) => p.t - q.t);
    let lastEnd = -Infinity;
    for (const p of crossings) {
      const start = p.t * len - radius;
      if (start <= lastEnd + 2) continue; // merged with the previous hop
      d += ` L ${p.x - ux * radius} ${p.y - uy * radius}`;
      d += ` A ${radius} ${radius} 0 0 1 ${p.x + ux * radius} ${p.y + uy * radius}`;
      lastEnd = p.t * len + radius;
    }
    d += ` L ${b.x} ${b.y}`;
  }
  return d;
}

/**
 * ArchiMate-inspired glyphs drawn in the node's top-right corner, keyed by
 * SceneNode.symbol. Each fits a 12×12 box, stroke-only.
 */
const SYMBOLS: Record<string, ReturnType<typeof svg>> = {
  component: svg`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: svg`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: svg`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: svg`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: svg`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: svg`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: svg`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: svg`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: svg`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: svg`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: svg`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: svg`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: svg`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: svg`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
};

// Container inner margins (CONTAINER_HEADER/CONTAINER_INSET) are shared with the
// view adapters through scene.ts, so drag clamps and child placement agree.

/**
 * Generic, fully editable diagram canvas. Semantics-free: renders a Scene and
 * emits gestures as events. The embedding shell (modux-editor) translates
 * gestures into model commands.
 *
 * Events (all CustomEvent, composed, bubbling):
 *  - node-moved        { id, x, y }             after a drag ends
 *  - nodes-moved       { moves: [{id, x, y}] }   multi-selection drag ended
 *  - node-reparent-requested { id, targetId, x, y }  Shift-drag dropped an API on a new home
 *  - node-proxy-requested { id, targetId, x, y }  Ctrl-drag: create a proxy of the API there
 *  - connect-requested { sourceId, targetId }   edge-drawing gesture completed
 *  - element-selected  { elementType, id, kind }  click on node or edge
 *  - element-activated { elementType, id, kind }  double click
 *  - selection-cleared                          click on empty canvas
 */
@customElement('modux-canvas')
export class ModuxCanvas extends LitElement {
  @property({ attribute: false }) scene: Scene = { nodes: [], edges: [] };
  @property({ attribute: false }) selectedId: string | null = null;
  /** Additional highlighted nodes (multi-selection, host-owned). */
  @property({ attribute: false }) selectedIds: string[] = [];
  /** Whether the connect gesture (drag from node handles) is available. */
  @property({ type: Boolean }) connectable = true;
  /** Manual bend points per edge id (host-owned geometry, like node positions). */
  @property({ attribute: false }) edgePoints: Record<string, Point[]> = {};

  @state() private _t: ZoomTransform = zoomIdentity;
  @state() private _dragPos: { id: string; x: number; y: number } | null = null;
  /** Live positions of every node in a multi-selection drag. */
  @state() private _dragGroup: Map<string, { x: number; y: number }> | null = null;
  @state() private _pendingLink: { sourceId: string; x: number; y: number } | null = null;
  @state() private _hoverNodeId: string | null = null;
  @state() private _editingId: string | null = null;
  @state() private _spaceDown = false;
  @state() private _wpDrag: { edgeId: string; points: Point[]; index: number } | null = null;
  @state() private _selectedWaypoint: { edgeId: string; index: number } | null = null;
  @state() private _resize: { id: string; x: number; y: number; w: number; h: number } | null = null;
  @state() private _rubber: { a: Point; b: Point } | null = null;

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
      position: relative;
    }
    svg.main {
      display: block;
      width: 100%;
      height: 100%;
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
    }
    svg.main.linking {
      cursor: crosshair;
    }
    svg.main.panning {
      cursor: grab;
    }
    .minimap {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 160px;
      height: 110px;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
    }
    .minimap svg {
      display: block;
      width: 100%;
      height: 100%;
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
    this.addEventListener('keyup', this._onKeyUp);
    this.addEventListener('blur', this._onBlur);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('keyup', this._onKeyUp);
    this.removeEventListener('blur', this._onBlur);
    super.disconnectedCallback();
  }

  private _onKeyUp = (e: KeyboardEvent): void => {
    if (e.key === ' ') this._spaceDown = false;
  };

  // Losing focus while space is held would otherwise leave pan mode stuck on,
  // silently disabling rubber-band selection.
  private _onBlur = (): void => {
    this._spaceDown = false;
  };

  private _onKeyDown = (e: KeyboardEvent): void => {
    if (this._editingId) return; // the inline input handles its own keys
    if (e.key === ' ') {
      // hold space: pan from anywhere, even over nodes
      e.preventDefault();
      this._spaceDown = true;
      return;
    }
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
    if (e.key === 'Delete' || e.key === 'Backspace') {
      // A selected waypoint takes precedence: remove the bend, keep the edge.
      if (this._selectedWaypoint) {
        const edge = this.scene.edges.find((x) => x.id === this._selectedWaypoint!.edgeId);
        if (edge) {
          e.preventDefault();
          this.removeWaypoint(edge, this._selectedWaypoint.index);
          this._selectedWaypoint = null;
        }
        return;
      }
      if (!this.selectedId) return;
      const edge = this.scene.edges.find((x) => x.id === this.selectedId);
      const node = this.scene.nodes.find((x) => x.id === this.selectedId);
      // Nested aggregates/use cases are a projection here — deleting them
      // belongs to their own view, not Supr. Domain events, read models and
      // domain services ARE managed from this view, so they are exceptions.
      if (
        node?.parentId &&
        !edge &&
        node.kind !== 'domain-event' &&
        node.kind !== 'application-event' &&
        node.kind !== 'read-model' &&
        node.kind !== 'domain-service' &&
        node.kind !== 'query-service' &&
        node.kind !== 'use-case' &&
        node.kind !== 'external-use-case' &&
        node.kind !== 'api' &&
        node.kind !== 'proxy-api'
      )
        return;
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
    const svgEl = this.renderRoot.querySelector('svg.main') as SVGSVGElement;
    this._zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.15, 4])
      .filter((event: Event) => {
        // Wheel zooms anywhere. Panning is a deliberate gesture: hold space and
        // drag with the left button. A plain drag is a rubber-band selection,
        // and nodes/handles/waypoints/edges manage their own drags (they stop
        // propagation), so they never reach this filter unless space is held.
        if (event.type === 'wheel') return true;
        return this._spaceDown && (event as MouseEvent).button === 0;
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
      this._dragGroup = null;
    }
    // A waypoint only stays selected while its edge is the selected element and
    // it still exists; otherwise drop the sub-selection so Supr targets the edge.
    if (this._selectedWaypoint && (changed.has('selectedId') || changed.has('edgePoints'))) {
      const wp = this._selectedWaypoint;
      const stillValid =
        this.selectedId === wp.edgeId && wp.index < (this.edgePoints[wp.edgeId]?.length ?? 0);
      if (!stillValid) this._selectedWaypoint = null;
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
    const svgEl = this.renderRoot.querySelector('svg.main') as SVGSVGElement | null;
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
    const grouped = this._dragGroup?.get(node.id);
    if (grouped) return grouped;
    // An anchored resize moves the centre; children stay put (they are absolute here).
    if (this._resize && this._resize.id === node.id) {
      return { x: this._resize.x, y: this._resize.y };
    }
    // A child follows its container live while the container is being dragged.
    if (node.parentId && this._dragPos && this._dragPos.id === node.parentId) {
      const parent = this.scene.nodes.find((n) => n.id === node.parentId);
      if (parent) {
        return { x: node.x + (this._dragPos.x - parent.x), y: node.y + (this._dragPos.y - parent.y) };
      }
    }
    if (node.parentId && this._dragGroup?.has(node.parentId)) {
      const parent = this.scene.nodes.find((n) => n.id === node.parentId);
      const pp = this._dragGroup.get(node.parentId)!;
      if (parent) return { x: node.x + (pp.x - parent.x), y: node.y + (pp.y - parent.y) };
    }
    return { x: node.x, y: node.y };
  }

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  // ---- node dragging ------------------------------------------------------

  /** Keep a dragged child inside its container's inner area (below the header). */
  private clampToParent(node: SceneNode, x: number, y: number): { id: string; x: number; y: number } {
    if (node.parentId) {
      const parent = this.scene.nodes.find((n) => n.id === node.parentId);
      if (parent) {
        const pp = this.nodePos(parent);
        const minX = pp.x - parent.w / 2 + CONTAINER_INSET + node.w / 2;
        const maxX = pp.x + parent.w / 2 - CONTAINER_INSET - node.w / 2;
        const minY = pp.y - parent.h / 2 + CONTAINER_HEADER + node.h / 2;
        const maxY = pp.y + parent.h / 2 - CONTAINER_INSET - node.h / 2;
        x = Math.min(Math.max(x, minX), maxX);
        y = Math.min(Math.max(y, minY), maxY);
      }
    }
    return { id: node.id, x, y };
  }

  /**
   * Topmost node under the pointer. elementFromPoint alone is not enough: an
   * edge's fat invisible hit-line can sit on top of a node and swallow the hit.
   */
  private nodeIdAt(ev: PointerEvent): string | null {
    const els = this.shadowRoot?.elementsFromPoint(ev.clientX, ev.clientY) ?? [];
    for (const el of els) {
      const g = el.closest?.('[data-node-id]');
      if (g) return g.getAttribute('data-node-id');
    }
    return null;
  }

  private onNodePointerDown(e: PointerEvent, node: SceneNode): void {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    if (this._spaceDown) return; // let the zoom behavior pan instead
    e.stopPropagation();
    this.focus();
    const start = this.toScene(e);
    const origin = this.nodePos(node);
    let moved = false;

    // Grabbing a node of the multi-selection drags the whole selection. Nodes whose
    // container is also selected are left out: they follow their container anyway.
    const selectedSet = new Set(this.selectedIds);
    const group =
      selectedSet.has(node.id) && this.selectedIds.length > 1
        ? this.scene.nodes.filter(
            (n) => selectedSet.has(n.id) && !(n.parentId && selectedSet.has(n.parentId)),
          )
        : null;
    const groupOrigins = group ? new Map(group.map((n) => [n.id, this.nodePos(n)])) : null;

    // Shift/Ctrl while dragging an API chip frees it from its container: dropping it
    // on another external system re-homes the API (the handle stays for relations).
    const freeDrag = (ev: PointerEvent) =>
      (ev.shiftKey || ev.ctrlKey) && (node.kind === 'api' || node.kind === 'proxy-api') && !group;
    const dropHome = (ev: PointerEvent): string | null => {
      const targetId = this.nodeIdAt(ev);
      const target =
        targetId && targetId !== node.id
          ? this.scene.nodes.find((n) => n.id === targetId)
          : undefined;
      if (!target) return null;
      if (target.kind === 'external-system') return target.id;
      return target.parentId ?? null;
    };
    const onMove = (ev: PointerEvent) => {
      // Lost pointerup (native popup, window switch): settle the drag where it is.
      if ((ev.buttons & 1) === 0) {
        onUp(ev);
        return;
      }
      const p = this.toScene(ev);
      const dx = p.x - start.x;
      const dy = p.y - start.y;
      if (!moved && Math.hypot(dx, dy) < 3 / this._t.k) return;
      moved = true;
      if (group && groupOrigins) {
        const positions = new Map<string, { x: number; y: number }>();
        for (const n of group) {
          const o = groupOrigins.get(n.id)!;
          const c = this.clampToParent(n, o.x + dx, o.y + dy);
          positions.set(n.id, { x: c.x, y: c.y });
        }
        this._dragGroup = positions;
      } else if (freeDrag(ev)) {
        this._dragPos = { id: node.id, x: origin.x + dx, y: origin.y + dy };
        this._hoverNodeId = dropHome(ev);
      } else {
        this._dragPos = this.clampToParent(node, origin.x + dx, origin.y + dy);
        this._hoverNodeId = null;
      }
    };
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (moved && this._dragGroup) {
        this.emit('nodes-moved', {
          moves: [...this._dragGroup.entries()].map(([id, p]) => ({ id, x: p.x, y: p.y })),
        });
      } else if (moved && this._dragPos) {
        if (freeDrag(ev)) {
          const home = dropHome(ev);
          // Ctrl over a system CREATES A PROXY of the API there (the API stays put);
          // Shift moves the API itself.
          if (ev.ctrlKey && node.kind === 'api') {
            if (home && home !== (node.parentId ?? null)) {
              this.emit('node-proxy-requested', {
                id: node.id,
                targetId: home,
                x: this._dragPos.x,
                y: this._dragPos.y,
              });
            }
            this._dragPos = null;
            this._hoverNodeId = null;
            return;
          }
          if (home !== (node.parentId ?? null)) {
            this.emit('node-reparent-requested', {
              id: node.id,
              targetId: home,
              x: this._dragPos.x,
              y: this._dragPos.y,
            });
            this._hoverNodeId = null;
            return;
          }
          // Same home after all — settle it back inside like a normal move.
          this._dragPos = this.clampToParent(node, this._dragPos.x, this._dragPos.y);
        }
        this.emit('node-moved', { id: node.id, x: this._dragPos.x, y: this._dragPos.y });
      } else if (e.shiftKey) {
        this.emit('element-multi-toggled', { id: node.id, kind: node.kind });
      } else {
        this.emit('element-selected', { elementType: 'node', id: node.id, kind: node.kind });
      }
      this._hoverNodeId = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  // ---- container resize ----------------------------------------------------

  /**
   * Corner-handle drag resizes a container. The dragged corner follows the
   * pointer while the opposite corner stays anchored; with Shift held the
   * resize is symmetric about the centre. Children never leave the box: they
   * keep their absolute position, so each edge stops at the outermost child.
   */
  private onResizePointerDown(e: PointerEvent, node: SceneNode, sx: 1 | -1, sy: 1 | -1): void {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    this.focus();
    const MIN_W = 160;
    const MIN_H = 90;
    const start = { x: node.x, y: node.y, w: node.w, h: node.h };
    const kids = this.scene.nodes.filter((n) => n.parentId === node.id);
    const kidsLeft = Math.min(...kids.map((c) => c.x - c.w / 2));
    const kidsRight = Math.max(...kids.map((c) => c.x + c.w / 2));
    const kidsTop = Math.min(...kids.map((c) => c.y - c.h / 2));
    const kidsBottom = Math.max(...kids.map((c) => c.y + c.h / 2));
    const symMin = containerMinSize(
      kids.map((c) => ({ dx: c.x - start.x, dy: c.y - start.y, w: c.w, h: c.h })),
      { w: MIN_W, h: MIN_H },
    );
    const onMove = (ev: PointerEvent) => {
      if ((ev.buttons & 1) === 0) {
        onUp();
        return;
      }
      const p = this.toScene(ev);
      if (ev.shiftKey) {
        this._resize = {
          id: node.id,
          x: start.x,
          y: start.y,
          w: Math.max(symMin.w, 2 * Math.abs(p.x - start.x)),
          h: Math.max(symMin.h, 2 * Math.abs(p.y - start.y)),
        };
        return;
      }
      // Anchor = the opposite corner; the dragged edges stop at the floor size
      // and at the outermost child (plus its margin).
      const ax = start.x - (sx * start.w) / 2;
      const ay = start.y - (sy * start.h) / 2;
      const px = sx > 0
        ? Math.max(p.x, ax + MIN_W, kids.length ? kidsRight + CONTAINER_INSET : -Infinity)
        : Math.min(p.x, ax - MIN_W, kids.length ? kidsLeft - CONTAINER_INSET : Infinity);
      const py = sy > 0
        ? Math.max(p.y, ay + MIN_H, kids.length ? kidsBottom + CONTAINER_INSET : -Infinity)
        : Math.min(p.y, ay - MIN_H, kids.length ? kidsTop - CONTAINER_HEADER : Infinity);
      this._resize = {
        id: node.id,
        x: (ax + px) / 2,
        y: (ay + py) / 2,
        w: Math.abs(px - ax),
        h: Math.abs(py - ay),
      };
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (this._resize && this._resize.id === node.id) {
        this.emit('node-resized', { ...this._resize });
      }
      this._resize = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  // ---- edge drawing (connect gesture) -------------------------------------

  private onHandlePointerDown(e: PointerEvent, node: SceneNode): void {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const p = this.toScene(e);
    this._pendingLink = { sourceId: node.id, x: p.x, y: p.y };

    const onMove = (ev: PointerEvent) => {
      // Lost pointerup: connecting to whatever is under a ghost pointer would be
      // wrong — drop the pending link instead.
      if ((ev.buttons & 1) === 0) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        this._pendingLink = null;
        this._hoverNodeId = null;
        return;
      }
      const q = this.toScene(ev);
      this._pendingLink = { sourceId: node.id, x: q.x, y: q.y };
      this._hoverNodeId = this.nodeIdAt(ev);
    };
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      const targetId = this.nodeIdAt(ev);
      if (targetId && targetId !== node.id) {
        this.emit('connect-requested', {
          sourceId: node.id,
          targetId,
          x: ev.clientX,
          y: ev.clientY,
        });
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

  /** Full polyline of an edge: border point → waypoints → border point. */
  private edgePolyline(edge: SceneEdge): Point[] | null {
    const source = this.scene.nodes.find((n) => n.id === edge.sourceId);
    const target = this.scene.nodes.find((n) => n.id === edge.targetId);
    if (!source || !target) return null;
    const waypoints =
      this._wpDrag && this._wpDrag.edgeId === edge.id
        ? this._wpDrag.points
        : this.edgePoints[edge.id] ?? [];
    const sp = this.nodePos(source);
    const tp = this.nodePos(target);
    const firstTowards = waypoints[0] ?? tp;
    const lastTowards = waypoints[waypoints.length - 1] ?? sp;
    let a = this.borderPoint(source, firstTowards.x, firstTowards.y);
    let b = this.borderPoint(target, lastTowards.x, lastTowards.y);
    if (!waypoints.length) {
      const offset = this.edgeOffset(edge);
      if (offset !== 0) {
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const nx = (-(b.y - a.y) / len) * offset;
        const ny = ((b.x - a.x) / len) * offset;
        a = { x: a.x + nx, y: a.y + ny };
        b = { x: b.x + nx, y: b.y + ny };
      }
    }
    return [a, ...waypoints, b];
  }

  // ---- edge waypoints (split & adjust) -------------------------------------

  private startWaypointDrag(edge: SceneEdge, points: Point[], index: number): void {
    this._wpDrag = { edgeId: edge.id, points, index };
    let moved = false;
    const onMove = (ev: PointerEvent) => {
      if (!this._wpDrag) return;
      moved = true;
      const p = this.toScene(ev);
      const next = [...this._wpDrag.points];
      next[this._wpDrag.index] = p;
      this._wpDrag = { ...this._wpDrag, points: next };
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      // Only a genuine drag rewrites geometry; a plain click that merely selects
      // an existing waypoint changes nothing.
      if (this._wpDrag && moved) {
        this.emit('edge-points-changed', { id: this._wpDrag.edgeId, points: this._wpDrag.points });
      }
      this._wpDrag = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  /** Index of the polyline segment nearest to point `p`. */
  private nearestSegment(pts: Point[], p: Point): number {
    let best = { seg: 0, dist: Infinity };
    for (let i = 0; i < pts.length - 1; i++) {
      const { dist } = pointToSegment(p, pts[i], pts[i + 1]);
      if (dist < best.dist) best = { seg: i, dist };
    }
    return best.seg;
  }

  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  private addWaypointAt(edge: SceneEdge, pts: Point[], at: Point): void {
    const seg = this.nearestSegment(pts, at);
    const waypoints = [...(this.edgePoints[edge.id] ?? [])];
    waypoints.splice(seg, 0, at); // a waypoint at index w sits between pts[w] and pts[w+1]
    this._selectedWaypoint = { edgeId: edge.id, index: seg };
    this.emit('edge-points-changed', { id: edge.id, points: waypoints });
  }

  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  private onEdgeHitPointerDown(e: PointerEvent, edge: SceneEdge, pts: Point[]): void {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== edge.id) return;
    e.stopPropagation();
    const start = this.toScene(e);
    const seg = this.nearestSegment(pts, start);
    let created = false;
    const onMove = (ev: PointerEvent) => {
      if ((ev.buttons & 1) === 0) {
        onUp();
        return;
      }
      const p = this.toScene(ev);
      if (!created) {
        if (Math.hypot(p.x - start.x, p.y - start.y) < 4 / this._t.k) return;
        created = true;
        this.focus();
        const waypoints = [...(this.edgePoints[edge.id] ?? [])];
        waypoints.splice(seg, 0, p);
        this._selectedWaypoint = { edgeId: edge.id, index: seg };
        this._wpDrag = { edgeId: edge.id, points: waypoints, index: seg };
      } else if (this._wpDrag) {
        const next = [...this._wpDrag.points];
        next[seg] = p;
        this._wpDrag = { ...this._wpDrag, points: next };
      }
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (created && this._wpDrag) {
        this.emit('edge-points-changed', { id: this._wpDrag.edgeId, points: this._wpDrag.points });
      }
      this._wpDrag = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  private removeWaypoint(edge: SceneEdge, index: number): void {
    const points = [...(this.edgePoints[edge.id] ?? [])];
    points.splice(index, 1);
    this.emit('edge-points-changed', { id: edge.id, points });
  }

  private renderEdge(
    edge: SceneEdge,
    pts: Point[],
    priorSegments: [Point, Point][],
  ): TemplateResult | typeof svg.prototype {
    const color = edge.color ?? '#64748b';
    const selected = this.selectedId === edge.id;
    // A line belongs to a rubber-band selection when both its endpoints do, so
    // boxing a region highlights the sub-graph, not just its nodes.
    const highlighted =
      selected ||
      (this.selectedIds.includes(edge.sourceId) && this.selectedIds.includes(edge.targetId));
    const midIndex = Math.floor((pts.length - 1) / 2);
    const mid = {
      x: (pts[midIndex].x + pts[midIndex + 1].x) / 2,
      y: (pts[midIndex].y + pts[midIndex + 1].y) / 2,
    };
    const waypoints = pts.slice(1, -1);
    const hitPoints = pts.map((p) => `${p.x},${p.y}`).join(' ');
    return svg`
      <g data-edge-id=${edge.id}>
        <polyline class="edge-hit" points=${hitPoints}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(e: MouseEvent) => {
                e.stopPropagation();
                this.focus();
                this.emit('element-selected', { elementType: 'edge', id: edge.id, kind: edge.kind });
              }}
              @dblclick=${(e: MouseEvent) => {
                e.stopPropagation();
                this.focus();
                this.addWaypointAt(edge, pts, this.toScene(e));
              }}
              @pointerdown=${(e: PointerEvent) => this.onEdgeHitPointerDown(e, edge, pts)}>
          ${edge.tooltip ? svg`<title>${edge.tooltip}</title>` : ''}
        </polyline>
        <path d=${pathWithBridges(pts, priorSegments)}
              fill="none"
              stroke=${color} stroke-width=${highlighted ? 3 : 1.6}
              stroke-dasharray=${edge.dashed ? '6 4' : ''}
              marker-end=${edge.arrow ? `url(#arrow-${this.markerId(color)})` : ''}
              pointer-events="none"></path>
        ${edge.label
          ? svg`<text x=${mid.x} y=${mid.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${color}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(e: MouseEvent) => {
                    e.stopPropagation();
                    this.focus();
                    this.emit('element-selected', { elementType: 'edge', id: edge.id, kind: edge.kind });
                  }}
                  @dblclick=${(e: MouseEvent) => {
                    e.stopPropagation();
                    this.emit('element-activated', {
                      elementType: 'edge',
                      id: edge.id,
                      kind: edge.kind,
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}>
                  ${edge.label}
                </text>`
          : ''}
        ${selected
          ? waypoints.map((p, i) => {
              const wpSelected =
                this._selectedWaypoint?.edgeId === edge.id && this._selectedWaypoint.index === i;
              return svg`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${wpSelected ? 6 : 5}
                        fill=${wpSelected ? '#2563eb' : '#ffffff'}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(e: PointerEvent) => {
                          if (e.button !== 0) return;
                          e.stopPropagation();
                          this.focus();
                          this._selectedWaypoint = { edgeId: edge.id, index: i };
                          this.startWaypointDrag(edge, [...(this.edgePoints[edge.id] ?? [])], i);
                        }}
                        @dblclick=${(e: MouseEvent) => {
                          e.stopPropagation();
                          this.removeWaypoint(edge, i);
                        }}>
                  <title>Arrastra para ajustar · Supr o doble click para quitar el punto</title>
                </circle>`;
            })
          : ''}
      </g>
    `;
  }

  private markerId(color: string): string {
    return color.replace(/[^a-zA-Z0-9]/g, '');
  }

  private renderNode(node: SceneNode): TemplateResult | typeof svg.prototype {
    const { x, y } = this.nodePos(node);
    const selected = this.selectedId === node.id || this.selectedIds.includes(node.id);
    const hovered = this._hoverNodeId === node.id;
    const isContainer = !!node.container;
    const isChild = !!node.parentId;
    // A container previews its in-progress size while being resized.
    const rw = this._resize?.id === node.id ? this._resize.w : node.w;
    const rh = this._resize?.id === node.id ? this._resize.h : node.h;
    const hw = rw / 2;
    const hh = rh / 2;
    const childLabel =
      isChild && node.label.length > 14 ? `${node.label.slice(0, 13)}…` : node.label;
    return svg`
      <g data-node-id=${node.id} transform="translate(${x}, ${y})"
         pointer-events=${(this._dragPos && this._dragPos.id === node.id) ||
           this._dragGroup?.has(node.id)
             ? 'none'
             : 'auto'}
         @pointerdown=${(e: PointerEvent) => this.onNodePointerDown(e, node)}
         @dblclick=${(e: MouseEvent) => {
           e.stopPropagation();
           this.emit('element-activated', { elementType: 'node', id: node.id, kind: node.kind });
         }}>
        ${node.diffKind
          ? svg`<rect x=${-hw - 4} y=${-hh - 4} width=${rw + 8} height=${rh + 8}
                  rx=${isChild ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${node.diffKind === 'ADDED' ? '#16a34a' : '#d97706'}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${node.diffKind === 'ADDED'
                  ? 'Nuevo en esta solución (no existe en el sistema)'
                  : 'Modificado respecto al sistema'}</title>
              </rect>`
          : ''}
        <rect x=${-hw} y=${-hh} width=${rw} height=${rh} rx=${isChild ? 6 : 10}
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
        ${node.symbol && SYMBOLS[node.symbol] && !isChild
          ? svg`<g transform="translate(${hw - 17}, ${-hh + 5})" fill="none"
                  stroke=${node.stroke ?? '#64748b'} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${SYMBOLS[node.symbol]}
              </g>`
          : ''}
        ${isChild && node.symbol && SYMBOLS[node.symbol]
          ? svg`<g transform="translate(${-hw + 8}, -6)" fill="none"
                  stroke=${node.stroke ?? '#64748b'} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${SYMBOLS[node.symbol]}
              </g>`
          : ''}
        ${this._editingId === node.id
          ? svg`
              <foreignObject x=${-hw + 6} y=${isContainer ? -hh + 6 : -14} width=${node.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${isContainer ? 'left' : 'center'}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
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
          : isChild
            ? svg`<text x=${-hw + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${childLabel}</text>`
            : isContainer
              ? svg`<text x=${-hw + 12} y=${-hh + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${node.label}</text>`
              : svg`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${node.label}</text>`}
        ${isContainer
          ? svg`<line x1=${-hw + 8} y1=${-hh + 28} x2=${hw - 8} y2=${-hh + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>`
          : ''}
        ${selected &&
        this.connectable &&
        (isChild
          ? node.kind === 'aggregate' ||
            node.kind === 'domain-service' ||
            node.kind === 'use-case' ||
            node.kind === 'domain-event' ||
            node.kind === 'application-event' ||
            node.kind === 'external-use-case' ||
            node.kind === 'external-table' ||
            node.kind === 'api-operation' ||
            node.kind === 'api' ||
            node.kind === 'proxy-api'
          : node.kind === 'external-system' ||
            node.kind === 'actor' ||
            node.kind === 'ai-agent' ||
            node.kind === 'rag' ||
            node.kind === 'api' ||
            node.kind === 'proxy-api' ||
            node.kind === 'workflow-step')
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
                  <title>${!isChild
                    ? node.kind === 'actor'
                      ? 'Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)'
                      : node.kind === 'ai-agent'
                        ? 'Arrastra hasta un caso de uso, una operación externa o un RAG: el agente lo usará'
                        : node.kind === 'rag'
                          ? 'Arrastra hasta un read model: el RAG indexará su contenido'
                          : node.kind === 'workflow-step'
                          ? 'Arrastra hasta otro paso: el destino esperará a que éste complete'
                          : node.kind === 'external-system'
                            ? 'Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)'
                            : node.kind === 'api'
                              ? 'Arrastra hasta el sistema externo que la publica: la API se anida en él'
                              : node.kind === 'proxy-api'
                                ? 'Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja'
                                : 'Arrastra hasta otro nodo para crear una relación'
                    : node.kind === 'api'
                      ? 'Arrastra hasta otro sistema externo: la API se moverá a ese publicador'
                      : node.kind === 'proxy-api'
                      ? 'Arrastra hasta la API que proxea, o a otro sistema externo para moverlo'
                      : node.kind === 'domain-event' || node.kind === 'application-event'
                      ? 'Arrastra hasta otro contexto o un read model para materializarlo (flow)'
                      : node.kind === 'external-use-case' || node.kind === 'external-table'
                        ? 'Arrastra hasta un read model o un contexto para proyectarlo (polling)'
                        : node.kind === 'api-operation'
                          ? 'Arrastra hasta el caso de uso, policy o contexto que la implementa'
                          : node.kind === 'use-case'
                        ? 'Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo'
                        : 'Arrastra hasta un evento de dominio para declarar que lo emite'}</title>
                </circle>`,
            )
          : ''}
        ${isContainer && selected
          ? ([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).map(
              ([sx, sy]) => svg`
                <rect data-resize x=${sx * hw - 6.5} y=${sy * hh - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${sx * sy > 0 ? 'nwse' : 'nesw'}-resize"
                      @pointerdown=${(e: PointerEvent) => this.onResizePointerDown(e, node, sx, sy)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`,
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

  // ---- rubber-band multi-selection ------------------------------------------

  private startRubberBand(e: PointerEvent): void {
    const origin = this.toScene(e);
    this._rubber = { a: origin, b: origin };
    let moved = false;
    const cancel = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', cancel);
      this._rubber = null;
    };
    const onMove = (ev: PointerEvent) => {
      // The button is no longer held: the pointerup was swallowed (a native popup,
      // window switch). End the gesture instead of chasing the mouse forever.
      if ((ev.buttons & 1) === 0) {
        cancel();
        return;
      }
      const p = this.toScene(ev);
      if (!moved && Math.hypot(p.x - origin.x, p.y - origin.y) < 4 / this._t.k) return;
      moved = true;
      this._rubber = { a: origin, b: p };
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', cancel);
      if (moved && this._rubber) {
        const { a, b } = this._rubber;
        const minX = Math.min(a.x, b.x);
        const maxX = Math.max(a.x, b.x);
        const minY = Math.min(a.y, b.y);
        const maxY = Math.max(a.y, b.y);
        const ids = this.scene.nodes
          .filter((n) => {
            const p = this.nodePos(n);
            return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
          })
          .map((n) => n.id);
        this.emit('nodes-boxed', { ids });
      } else {
        // A plain click on empty canvas clears the selection.
        this.emit('selection-cleared');
      }
      this._rubber = null;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', cancel);
  }

  private renderRubber(): TemplateResult | typeof svg.prototype {
    if (!this._rubber) return svg``;
    const { a, b } = this._rubber;
    return svg`
      <rect x=${Math.min(a.x, b.x)} y=${Math.min(a.y, b.y)}
            width=${Math.abs(b.x - a.x)} height=${Math.abs(b.y - a.y)}
            fill="rgba(37, 99, 235, 0.06)" stroke="#2563eb" stroke-width="1"
            stroke-dasharray="4 3" pointer-events="none"></rect>
    `;
  }

  // ---- minimap -------------------------------------------------------------

  private sceneBounds(padding = 40) {
    const nodes = this.scene.nodes;
    if (!nodes.length) return null;
    const minX = Math.min(...nodes.map((n) => n.x - n.w / 2)) - padding;
    const maxX = Math.max(...nodes.map((n) => n.x + n.w / 2)) + padding;
    const minY = Math.min(...nodes.map((n) => n.y - n.h / 2)) - padding;
    const maxY = Math.max(...nodes.map((n) => n.y + n.h / 2)) + padding;
    return { minX, minY, w: maxX - minX, h: maxY - minY };
  }

  private centerViewportOn(sceneX: number, sceneY: number): void {
    const svgEl = this.renderRoot.querySelector('svg.main') as SVGSVGElement | null;
    if (!svgEl || !this._zoomBehavior) return;
    const rect = this.getBoundingClientRect();
    const k = this._t.k;
    const t = zoomIdentity.translate(rect.width / 2 - k * sceneX, rect.height / 2 - k * sceneY).scale(k);
    select(svgEl).call(this._zoomBehavior.transform, t);
  }

  private onMinimapPointer(e: PointerEvent, bounds: NonNullable<ReturnType<typeof this.sceneBounds>>, scale: number): void {
    const box = (e.currentTarget as Element).getBoundingClientRect();
    const sceneX = bounds.minX + (e.clientX - box.left) / scale;
    const sceneY = bounds.minY + (e.clientY - box.top) / scale;
    this.centerViewportOn(sceneX, sceneY);
  }

  private renderMinimap(): TemplateResult | typeof svg.prototype {
    const bounds = this.sceneBounds();
    if (!bounds || this.scene.nodes.length < 2) return html``;
    const MW = 160;
    const MH = 110;
    const scale = Math.min(MW / bounds.w, MH / bounds.h);
    const rect = this.getBoundingClientRect();
    // visible scene area under the current transform
    const vx = (0 - this._t.x) / this._t.k;
    const vy = (0 - this._t.y) / this._t.k;
    const vw = rect.width / this._t.k;
    const vh = rect.height / this._t.k;
    return html`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(e: PointerEvent) => {
          e.stopPropagation();
          try {
            (e.currentTarget as Element).setPointerCapture(e.pointerId);
          } catch {
            /* synthetic or stale pointer id — dragging just won't track */
          }
          this.onMinimapPointer(e, bounds, scale);
        }}
        @pointermove=${(e: PointerEvent) => {
          if ((e.currentTarget as Element).hasPointerCapture?.(e.pointerId)) {
            this.onMinimapPointer(e, bounds, scale);
          }
        }}
      >
        <svg viewBox="0 0 ${MW} ${MH}">
          ${this.scene.nodes.map((n) => {
            const p = this.nodePos(n);
            return svg`<rect
              x=${(p.x - n.w / 2 - bounds.minX) * scale}
              y=${(p.y - n.h / 2 - bounds.minY) * scale}
              width=${Math.max(2, n.w * scale)}
              height=${Math.max(2, n.h * scale)}
              rx="1" fill=${n.fill ?? '#e2e8f0'} stroke="#94a3b8" stroke-width="0.4"></rect>`;
          })}
          <rect
            x=${(vx - bounds.minX) * scale}
            y=${(vy - bounds.minY) * scale}
            width=${vw * scale}
            height=${vh * scale}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }

  render() {
    const colors = [...new Set(this.scene.edges.map((e) => e.color ?? '#64748b'))];
    // Edges render in order; each one bridges over the segments drawn before it.
    const priorSegments: [Point, Point][] = [];
    const edgeTemplates = this.scene.edges.map((edge) => {
      const pts = this.edgePolyline(edge);
      if (!pts) return svg``;
      const template = this.renderEdge(edge, pts, [...priorSegments]);
      for (let i = 0; i < pts.length - 1; i++) priorSegments.push([pts[i], pts[i + 1]]);
      return template;
    });
    // Edges touching a nested child (e.g. emissions inside a container) must paint
    // ABOVE the nodes — the container's opaque body would hide them otherwise.
    const childIds = new Set(this.scene.nodes.filter((n) => n.parentId).map((n) => n.id));
    const underEdges: typeof edgeTemplates = [];
    const overEdges: typeof edgeTemplates = [];
    this.scene.edges.forEach((edge, i) => {
      (childIds.has(edge.sourceId) || childIds.has(edge.targetId) ? overEdges : underEdges).push(
        edgeTemplates[i],
      );
    });
    return html`
      <svg
        class="main ${this._pendingLink ? 'linking' : ''} ${this._spaceDown ? 'panning' : ''}"
        @pointerdown=${(e: PointerEvent) => {
          const target = e.target as Element;
          if (target.closest('[data-node-id]') || target.closest('[data-edge-id]')) return;
          if (this._spaceDown || e.button !== 0) return; // space+drag pans (d3-zoom)
          // A native <select> popup over the canvas can leak a ghost pointerdown with
          // no button actually held — it must not start a gesture that never ends.
          if ((e.buttons & 1) === 0) return;
          this.startRubberBand(e);
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
          ${underEdges}
          ${this.scene.nodes.filter((n) => !n.parentId).map((n) => this.renderNode(n))}
          ${overEdges}
          ${this.scene.nodes.filter((n) => n.parentId).map((n) => this.renderNode(n))}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-canvas': ModuxCanvas;
  }
}
