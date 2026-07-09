import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ModuxModel, ContextMapRelationType } from './model.js';
import { normalizeViewLayout, resolveOverlaps as declump } from './scene.js';
import type { EditorLayout, Point, SceneNode, ViewLayout } from './scene.js';
import type { ModuxCommand } from './commands.js';
import { contextMapScene } from './views/context-map.js';
import { aggregatesScene } from './views/aggregates.js';
import { flowsScene } from './views/flows.js';
import { processesScene } from './views/processes.js';
import { eventstormingScene } from './views/eventstorming.js';
import { workflowsScene } from './views/workflows.js';
import { autoLayout } from './autolayout.js';
import './modux-canvas.js';
import './modux-tilt.js';
import { SYMBOLS } from './modux-canvas.js';

/** Strategic context-mapping patterns: abbreviation (as drawn) + full name. */
const RELATION_META: Record<ContextMapRelationType, { abbr: string; name: string }> = {
  PARTNERSHIP: { abbr: 'P', name: 'Partnership' },
  SHARED_KERNEL: { abbr: 'SK', name: 'Shared Kernel' },
  CUSTOMER_SUPPLIER: { abbr: 'C/S', name: 'Customer / Supplier' },
  CONFORMIST: { abbr: 'CF', name: 'Conformist' },
  OPEN_HOST_SERVICE: { abbr: 'OHS', name: 'Open Host Service' },
  ANTI_CORRUPTION_LAYER: { abbr: 'ACL', name: 'Anti-Corruption Layer' },
  PUBLISHED_LANGUAGE: { abbr: 'PL', name: 'Published Language' },
  SEPARATE_WAYS: { abbr: 'SW', name: 'Separate Ways' },
};

const RELATION_TYPES = Object.keys(RELATION_META) as ContextMapRelationType[];

type ViewId = 'context-map' | 'aggregates' | 'flows' | 'processes' | 'workflows' | 'eventstorming';


/**
 * Undo/redo operate on edit operations: model commands (sent to the host) plus
 * node moves (applied locally to the layout). One stack entry can bundle both —
 * e.g. dragging a step to reorder it undoes position AND order together.
 */
type MoveNodeOp = {
  kind: 'move-node';
  view: ViewId;
  id: string;
  /** Position to restore; null removes the entry (back to the default layout). */
  pos: { x: number; y: number } | null;
};
type SetEdgePointsOp = {
  kind: 'set-edge-points';
  view: ViewId;
  id: string;
  /** Waypoints to restore; null removes the entry (straight edge again). */
  points: Point[] | null;
};
type ResizeNodeOp = {
  kind: 'resize-node';
  view: ViewId;
  id: string;
  /** Size to restore; null removes the entry (back to the default size). */
  size: { w: number; h: number } | null;
};
type EditOp = ModuxCommand | MoveNodeOp | SetEdgePointsOp | ResizeNodeOp;

/** Does the segment a→b pass through the axis-aligned box? (Liang–Barsky clip) */
function segmentCrossesBox(
  a: { x: number; y: number },
  b: { x: number; y: number },
  box: { x: number; y: number; w: number; h: number },
): boolean {
  const minX = box.x - box.w / 2;
  const maxX = box.x + box.w / 2;
  const minY = box.y - box.h / 2;
  const maxY = box.y + box.h / 2;
  let t0 = 0;
  let t1 = 1;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  for (const [p, q] of [
    [-dx, a.x - minX],
    [dx, maxX - a.x],
    [-dy, a.y - minY],
    [dy, maxY - a.y],
  ] as [number, number][]) {
    if (p === 0) {
      if (q < 0) return false;
      continue;
    }
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
  }
  return t1 - t0 > 0.02; // a mere corner graze does not count
}

/**
 * Splits every straight edge that runs over a node it is not attached to: the
 * offending segment detours around the obstacle via one corner or a full side
 * (two corners) — whichever clears the box at the least added length. Only
 * edges without hand-placed bends are touched, against top-level boxes.
 */
function routeEdgesAroundNodes(
  scene: { nodes: SceneNode[]; edges: { id: string; sourceId: string; targetId: string }[] },
  existing: Record<string, { x: number; y: number }[]>,
  margin = 28,
): Map<string, { x: number; y: number }[]> {
  type Pt = { x: number; y: number };
  const byId = new Map(scene.nodes.map((n) => [n.id, n]));
  const ancestorsOf = (id: string | undefined): Set<string> => {
    const out = new Set<string>();
    for (let cur = id; cur; cur = byId.get(cur)?.parentId) out.add(cur);
    return out;
  };
  // Children count as obstacles too (with a tighter margin — grids are dense).
  const obstacles = scene.nodes;
  const marginOf = (o: SceneNode) => (o.parentId ? Math.min(margin, 6) : margin);
  const routed = new Map<string, Pt[]>();

  /** Corner/side detours for segment a→b around o; corners sit strictly outside the test box. */
  const detoursAround = (a: Pt, b: Pt, o: SceneNode): Pt[][] => {
    const m = marginOf(o);
    const test = { x: o.x, y: o.y, w: o.w + 2 * m, h: o.h + 2 * m };
    const px = o.w / 2 + m * 1.5;
    const py = o.h / 2 + m * 1.5;
    const tl = { x: o.x - px, y: o.y - py };
    const tr = { x: o.x + px, y: o.y - py };
    const bl = { x: o.x - px, y: o.y + py };
    const br = { x: o.x + px, y: o.y + py };
    const options: Pt[][] = [];
    for (const c of [tl, tr, bl, br]) {
      if (!segmentCrossesBox(a, c, test) && !segmentCrossesBox(c, b, test)) options.push([c]);
    }
    for (const [c1, c2] of [
      [tl, tr], [tr, tl], [tr, br], [br, tr], [br, bl], [bl, br], [bl, tl], [tl, bl],
    ] as [Pt, Pt][]) {
      if (!segmentCrossesBox(a, c1, test) && !segmentCrossesBox(c2, b, test)) {
        options.push([c1, c2]);
      }
    }
    return options;
  };

  for (const edge of scene.edges) {
    if (existing[edge.id]?.length) continue; // hand-placed bends win
    const src = byId.get(edge.sourceId);
    const tgt = byId.get(edge.targetId);
    if (!src || !tgt) continue;
    const skip = new Set([...ancestorsOf(src.id), ...ancestorsOf(tgt.id)]);
    const path: Pt[] = [
      { x: src.x, y: src.y },
      { x: tgt.x, y: tgt.y },
    ];
    for (let guard = 0; guard < 12; guard++) {
      let detoured = false;
      outer: for (let i = 0; i < path.length - 1; i++) {
        for (const o of obstacles) {
          if (skip.has(o.id)) continue;
          const m = marginOf(o);
          const test = { x: o.x, y: o.y, w: o.w + 2 * m, h: o.h + 2 * m };
          if (!segmentCrossesBox(path[i], path[i + 1], test)) continue;
          const options = detoursAround(path[i], path[i + 1], o);
          if (!options.length) continue; // endpoints boxed in — leave this one be
          const insideOther = (c: Pt) =>
            obstacles.some(
              (other) =>
                other !== o &&
                !skip.has(other.id) &&
                Math.abs(c.x - other.x) < other.w / 2 + marginOf(other) / 2 &&
                Math.abs(c.y - other.y) < other.h / 2 + marginOf(other) / 2,
            );
          const cost = (pts: Pt[]) => {
            let total = 0;
            const seq = [path[i], ...pts, path[i + 1]];
            for (let k = 0; k < seq.length - 1; k++) {
              total += Math.hypot(seq[k + 1].x - seq[k].x, seq[k + 1].y - seq[k].y);
            }
            return total + (pts.some(insideOther) ? 10000 : 0);
          };
          options.sort((o1, o2) => cost(o1) - cost(o2));
          path.splice(i + 1, 0, ...options[0]);
          detoured = true;
          break outer;
        }
      }
      if (!detoured) break;
    }
    if (path.length > 2) {
      routed.set(
        edge.id,
        path.slice(1, -1).map((p) => ({ x: Math.round(p.x), y: Math.round(p.y) })),
      );
    }
  }
  return routed;
}

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
    case 'use-case':
      return { elementType: 'use-case', id };
    case 'entity':
      return { elementType: 'entity', id };
    case 'flow':
      return { elementType: 'flow', id: id.replace(/^flow:/, '') };
    case 'process':
      return { elementType: 'process', id };
    case 'workflow':
      return { elementType: 'workflow', id };
    case 'domain-event':
      return { elementType: 'domain-event', id };
    case 'subscription':
      return { elementType: 'subscription', id };
    case 'projection':
      return { elementType: 'projection', id };
    case 'read-model':
      return { elementType: 'read-model', id };
    default:
      return null;
  }
}

/** A step opens its owning process — steps have no CRUD of their own. */
function activationForStep(
  processes: { id: string; steps: { id: string }[] }[] | undefined,
  stepId: string,
): { elementType: string; id: string } | null {
  const owner = (processes ?? []).find((p) => p.steps.some((s) => s.id === stepId));
  return owner ? { elementType: 'process', id: owner.id } : null;
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
  /** On a solution (to-be): element id → ADDED | MODIFIED, drawn as diff rings. */
  @property({ attribute: false }) diff: Record<string, 'ADDED' | 'MODIFIED'> | null = null;

  @state() private _view: ViewId = 'context-map';
  /** Context-map detail level: bounded contexts only, or their aggregates + use cases. */
  @state() private _detail: 'contexts' | 'detail' | 'operations' = 'contexts';
  /** Last chosen relation type — the default pre-selection in the picker. */
  @state() private _relationType: ContextMapRelationType = 'CUSTOMER_SUPPLIER';
  /** Open type picker: creating a new relation, or editing an existing one. */
  @state() private _relationPicker: {
    sourceId: string;
    targetId: string;
    mode: 'create' | 'edit';
    x: number;
    y: number;
  } | null = null;
  /** Type picker for an external-system → external-system drag: plain or CQRS. */
  @state() private _extDepPicker: {
    sourceId: string;
    targetId: string;
    x: number;
    y: number;
  } | null = null;
  @state() private _selectedId: string | null = null;
  /** The drag-to-create / drag-to-place palette. */
  @state() private _paletteOpen = false;
  @state() private _paletteFilter = '';
  /** Palette tab: brand-new elements, or the model's existing catalog. */
  @state() private _paletteTab: 'new' | 'catalog' = 'new';
  /** Mirrors document.fullscreenElement — the editor host in fullscreen. */
  @state() private _fullscreen = false;
  /** Tilt mode: the diagram as stacked 3D plates (a read-only lens). */
  @state() private _tilt = false;
  /** Keyboard-shortcuts help popover (toggled with ?). */
  @state() private _helpOpen = false;
  @state() private _newName = '';
  @state() private _newModuleId = '';
  @state() private _newArchetype = 'TRIGGERS';
  @state() private _newTriggerAggId = '';
  @state() private _newTriggerEvent = '';
  @state() private _newTargetId = '';
  @state() private _undoStack: EditOp[][] = [];
  @state() private _redoStack: EditOp[][] = [];
  @state() private _newStepName = '';
  @state() private _newStepType: 'AUTOMATED' | 'HUMAN' = 'AUTOMATED';
  @state() private _newStepRole = '';
  @state() private _newStepDeadline = '';
  @state() private _editStepRole = '';
  @state() private _editStepDeadline = '';
  @state() private _editStepComp = '';
  @state() private _newStepUseCase = '';
  @state() private _newStepEmits = '';
  @state() private _editStepUseCase = '';
  @state() private _editStepEmits = '';
  @state() private _editStepAwaits = '';
  @state() private _multi: string[] = [];
  @state() private _newViewName = '';
  @state() private _activeViewId = '';
  @state() private _newRagSourceType = 'WEB';
  @state() private _newRagSourceUri = '';
  @state() private _addMemberKey = '';
  /** Catalog tree panel: curate the active view's members with checkboxes. */
  @state() private _treeOpen = false;
  /** Pending node deletion while the user picks: delete from model, or only from the view. */
  @state() private _deletePicker: { elementType: string; id: string; kind: string; memberId: string } | null =
    null;

  static styles = css`
    .canvas-wrap {
      position: relative;
    }
    .palette {
      position: absolute;
      left: 8px;
      top: 8px;
      bottom: 8px;
      width: 244px;
      z-index: 15;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
      display: flex;
      overflow: hidden;
    }
    .palette.shifted {
      left: 280px;
    }
    .palette-body {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      padding: 8px;
    }
    .palette-side {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 4px;
      background: #f8fafc;
      border-left: 1px solid #e2e8f0;
    }
    .palette-vtab {
      writing-mode: vertical-rl;
      border: none;
      background: transparent;
      font: inherit;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #64748b;
      padding: 10px 4px;
      border-radius: 6px;
      cursor: pointer;
    }
    .palette-vtab[data-active] {
      background: #1e293b;
      color: #ffffff;
    }
    .tab.hamburger {
      font-size: 16px;
      line-height: 1;
      padding: 4px 10px;
    }
    .help-pop {
      max-width: 420px;
    }
    .help-row {
      display: flex;
      gap: 12px;
      align-items: baseline;
      font-size: 12px;
      color: #1e293b;
      padding: 3px 8px;
    }
    .help-keys {
      flex: 0 0 150px;
      font-weight: 700;
      color: #2563eb;
      font-family: ui-monospace, monospace;
      font-size: 11px;
    }
    .palette-filter {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      font-size: 12px;
      padding: 4px 8px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      margin-bottom: 6px;
    }
    .palette-h {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #64748b;
      margin: 10px 2px 4px;
    }
    .palette-g {
      font-size: 11px;
      font-weight: 600;
      color: #475569;
      margin: 8px 2px 2px;
    }
    .palette-item {
      font-size: 12px;
      color: #1e293b;
      padding: 4px 8px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin: 2px 0;
      cursor: grab;
      background: #f8fafc;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .pal-ico {
      flex: 0 0 13px;
      width: 13px;
      height: 13px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      overflow: visible;
    }
    .pal-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .palette-item:hover {
      background: #eef2ff;
      border-color: #c7d2fe;
    }
    .palette-child {
      border-style: dashed;
    }

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
    .picker-backdrop {
      position: fixed;
      inset: 0;
      z-index: 20;
    }
    .relation-picker {
      position: fixed;
      z-index: 21;
      min-width: 210px;
      transform: translate(-50%, 12px);
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .picker-title {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 4px 8px 6px;
    }
    .picker-item {
      display: flex;
      align-items: center;
      gap: 10px;
      border: none;
      background: transparent;
      border-radius: 7px;
      padding: 6px 8px;
      cursor: pointer;
      text-align: left;
      font-size: 13px;
      color: #1e293b;
    }
    .picker-item:hover {
      background: #f1f5f9;
    }
    .picker-item.current {
      background: #eff6ff;
    }
    .picker-item .abbr {
      flex: 0 0 34px;
      font-weight: 700;
      font-size: 11px;
      color: #2563eb;
      text-align: center;
    }
    .picker-item.current .abbr::after {
      content: ' ✓';
    }
    .tab:disabled {
      opacity: 0.4;
    }
    .sep {
      width: 1px;
      align-self: stretch;
      background: #e2e8f0;
      margin: 2px 4px;
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
    modux-canvas,
    modux-tilt {
      flex: 1;
      min-height: 0;
    }
    .canvas-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
    }
    .view-tree {
      position: absolute;
      left: 8px;
      top: 8px;
      bottom: 8px;
      width: 264px;
      overflow: auto;
      background: rgba(255, 255, 255, 0.97);
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
      padding: 8px 12px 12px;
      z-index: 15;
    }
    .view-tree h4 {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748b;
      margin: 10px 0 4px;
    }
    .view-tree label {
      display: flex;
      gap: 7px;
      align-items: center;
      padding: 2px 0;
      font-size: 13px;
      color: #1e293b;
      cursor: pointer;
    }
    .view-tree label.child {
      margin-left: 18px;
      color: #475569;
    }
    .view-tree label.implicit {
      color: #94a3b8;
    }
    .view-tree .tree-title {
      font-size: 12px;
      font-weight: 700;
      color: #1e293b;
      padding: 2px 0 4px;
    }
  `;

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.hostKeydown);
    this.ownerDocument.addEventListener('fullscreenchange', this.onFullscreenChange);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.hostKeydown);
    this.ownerDocument.removeEventListener('fullscreenchange', this.onFullscreenChange);
    super.disconnectedCallback();
  }

  private onFullscreenChange = (): void => {
    // document.fullscreenElement retargets to the outermost shadow host, so
    // compare with :fullscreen, which matches through shadow boundaries.
    this._fullscreen = this.matches(':fullscreen');
  };

  /** The diagram takes the whole screen (host element fullscreen), F toggles back. */
  private async toggleFullscreen(): Promise<void> {
    try {
      if (this.ownerDocument.fullscreenElement) await this.ownerDocument.exitFullscreen();
      else await this.requestFullscreen();
    } catch {
      // Fullscreen can be denied (no user gesture, iframe policy) — nothing to do.
    }
  }

  /**
   * Editor-level shortcuts. They never fire while typing (inputs, selects, the
   * inline rename editor); the canvas keeps its own keys (Supr, F2, Ctrl+Z…).
   */
  private hostKeydown = (e: KeyboardEvent): void => {
    const target = e.composedPath()[0] as HTMLElement | undefined;
    const tag = (target?.tagName ?? '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const canvas = this.renderRoot.querySelector('modux-canvas');
    const scope = (value: string) => {
      e.preventDefault();
      this.onDiagramScopeChange(value);
    };
    switch (e.key) {
      case 'p':
      case 'P':
        if (this._view === 'context-map' || this._view === 'workflows') {
          e.preventDefault();
          this._paletteOpen = !this._paletteOpen;
        }
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        void this.toggleFullscreen();
        break;
      case '0':
        e.preventDefault();
        canvas?.fit();
        break;
      case '+':
      case '=':
        e.preventDefault();
        canvas?.zoomBy(1.25);
        break;
      case '-':
        e.preventDefault();
        canvas?.zoomBy(0.8);
        break;
      case 't':
      case 'T':
        if (this._activeViewId) {
          e.preventDefault();
          this._treeOpen = !this._treeOpen;
        }
        break;
      case 'v':
      case 'V':
        e.preventDefault();
        this._tilt = !this._tilt;
        break;
      case 'e':
      case 'E':
        e.preventDefault();
        this._view = 'eventstorming';
        break;
      case 'd':
      case 'D':
        if (this._view === 'eventstorming') {
          e.preventDefault();
          this._view = 'context-map';
        }
        break;
      case '1': scope('level:contexts'); break;
      case '2': scope('level:detail'); break;
      case '3': scope('level:operations'); break;
      case '4': scope('view:aggregates'); break;
      case '5': scope('view:flows'); break;
      case '6': scope('view:processes'); break;
      case '7': scope('view:workflows'); break;
      case '?':
        e.preventDefault();
        this._helpOpen = !this._helpOpen;
        break;
      case 'Escape':
        if (this._helpOpen) this._helpOpen = false;
        break;
      default:
        break;
    }
  };

  private command(command: ModuxCommand, pushUndo = true): void {
    if (pushUndo) {
      const inverse = this.inverseOf(command);
      if (inverse) this.pushUndoEntry(inverse);
    }
    this.emit('modux-command', { command });
  }

  /**
   * Every detail level of the context map keeps ITS OWN geometry: coming back
   * to a level must look exactly as it was left there, untouched by whatever
   * the auto-separation did at the other levels. The legacy 'context-map'
   * entry doubles as the Contextos level.
   */
  private layoutKey(view: ViewId): string {
    return view === 'context-map' && this._detail !== 'contexts'
      ? `context-map@${this._detail}`
      : view;
  }

  private viewLayout(view: ViewId): ViewLayout {
    return normalizeViewLayout(this.layout[this.layoutKey(view)]);
  }

  private writeViewLayout(view: ViewId, next: ViewLayout): void {
    this.layout = { ...this.layout, [this.layoutKey(view)]: next };
    this.emit('layout-changed', { layout: this.layout });
  }

  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('layout')) {
      const detail = normalizeViewLayout(this.layout['context-map']).detail;
      if (detail === 'contexts' || detail === 'detail' || detail === 'operations') {
        this._detail = detail;
      }
    }
  }

  /** Detail level changes persist with the layout, so they survive reloads. */
  private setDetail(detail: 'contexts' | 'detail' | 'operations'): void {
    if (detail === this._detail) return;
    // First visit to a level: it starts as a copy of what the user is looking
    // at; from then on each level's geometry lives its own life.
    const seed = this.viewLayout('context-map');
    const targetKey = detail === 'contexts' ? 'context-map' : `context-map@${detail}`;
    const raw = normalizeViewLayout(this.layout[targetKey]);
    this._detail = detail;
    if (!Object.keys(raw.nodes).length && !Object.keys(raw.sizes ?? {}).length) {
      this.writeViewLayout('context-map', {
        nodes: { ...seed.nodes },
        edges: { ...seed.edges },
        sizes: { ...(seed.sizes ?? {}) },
      });
    }
    // The chosen level persists on the BASE entry — where load-time adoption looks.
    const base = normalizeViewLayout(this.layout['context-map']);
    this.layout = { ...this.layout, 'context-map': { ...base, detail } };
    this.emit('layout-changed', { layout: this.layout });
    // Positions persist per element across detail levels, but sizes don't: a
    // container that unfolds at this level may now sit on top of its neighbours.
    // Nudge the top-level nodes apart (one undoable step) so the map stays legible.
    const current = this.viewLayout('context-map');
    const top = this.sceneFor('context-map').nodes.filter((n) => !n.parentId);
    const moves = declump(top);
    const ops: EditOp[] = [...moves.keys()].map((id) => ({
      kind: 'move-node',
      view: 'context-map',
      id,
      pos: current.nodes[id] ?? null,
    }));
    const nodes = { ...current.nodes };
    for (const [id, p] of moves) {
      // Children hang off the STORED centre (a fitted container may render off it):
      // apply the declump displacement as a delta, never the raw scene position.
      const orig = top.find((n) => n.id === id)!;
      const base = current.nodes[id] ?? { x: orig.x, y: orig.y };
      nodes[id] = {
        x: Math.round(base.x + (p.x - orig.x)),
        y: Math.round(base.y + (p.y - orig.y)),
      };
    }
    this.writeViewLayout('context-map', { ...current, nodes });
    if (ops.length) this.pushUndoEntry(ops);
  }

  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  private routedEdgePoints(scene: {
    nodes: SceneNode[];
    edges: { id: string; sourceId: string; targetId: string }[];
  }): Record<string, Point[]> {
    const stored = this.viewLayout(this._view).edges;
    if (this._view !== 'context-map') return stored;
    const routed = routeEdgesAroundNodes(scene, stored);
    if (!routed.size) return stored;
    return { ...Object.fromEntries(routed), ...stored };
  }

  private pushUndoEntry(ops: EditOp[]): void {
    this._undoStack = [...this._undoStack.slice(-19), ops];
    this._redoStack = []; // a fresh user action invalidates the redo branch
  }

  /** Inverses of an operation list, computed against the current state, in reverse order. */
  private inversesOf(ops: EditOp[]): EditOp[] {
    return [...ops].reverse().flatMap((op): EditOp[] => {
      if (op.kind === 'move-node') {
        return [
          {
            kind: 'move-node',
            view: op.view,
            id: op.id,
            pos: this.viewLayout(op.view).nodes[op.id] ?? null,
          } satisfies MoveNodeOp,
        ];
      }
      if (op.kind === 'set-edge-points') {
        return [
          {
            kind: 'set-edge-points',
            view: op.view,
            id: op.id,
            points: this.viewLayout(op.view).edges[op.id] ?? null,
          } satisfies SetEdgePointsOp,
        ];
      }
      if (op.kind === 'resize-node') {
        return [
          {
            kind: 'resize-node',
            view: op.view,
            id: op.id,
            size: this.viewLayout(op.view).sizes?.[op.id] ?? null,
          } satisfies ResizeNodeOp,
        ];
      }
      return this.inverseOf(op) ?? [];
    });
  }

  private applyOps(ops: EditOp[]): void {
    for (const op of ops) {
      if (op.kind === 'move-node') {
        const current = this.viewLayout(op.view);
        const nodes = { ...current.nodes };
        if (op.pos) nodes[op.id] = op.pos;
        else delete nodes[op.id];
        this.writeViewLayout(op.view, { ...current, nodes });
      } else if (op.kind === 'set-edge-points') {
        const current = this.viewLayout(op.view);
        const edges = { ...current.edges };
        if (op.points && op.points.length) edges[op.id] = op.points;
        else delete edges[op.id];
        this.writeViewLayout(op.view, { ...current, edges });
      } else if (op.kind === 'resize-node') {
        const current = this.viewLayout(op.view);
        const sizes = { ...(current.sizes ?? {}) };
        if (op.size) sizes[op.id] = op.size;
        else delete sizes[op.id];
        this.writeViewLayout(op.view, { ...current, sizes });
      } else {
        this.command(op, false);
      }
    }
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
        // Removing = clearing the type annotation; undo re-annotates.
        const rel = this.model.relations.find(
          (r) => r.sourceId === c.sourceId && r.targetId === c.targetId,
        );
        return rel && rel.type
          ? [{ kind: 'set-relation-type', sourceId: c.sourceId, targetId: c.targetId, type: rel.type }]
          : null;
      }
      case 'set-relation-type': {
        const rel = this.model.relations.find(
          (r) => r.sourceId === c.sourceId && r.targetId === c.targetId,
        );
        // Annotating an unannotated pair undoes to removing the annotation.
        return rel && rel.type
          ? [{ kind: 'set-relation-type', sourceId: c.sourceId, targetId: c.targetId, type: rel.type }]
          : [{ kind: 'remove-relation', sourceId: c.sourceId, targetId: c.targetId }];
      }
      case 'add-module':
        return [{ kind: 'remove-module', id: c.id }];
      case 'remove-module': {
        const m = this.model.modules.find((x) => x.id === c.id);
        if (!m) return null;
        const rels = this.model.relations.filter(
          (r) => (r.sourceId === c.id || r.targetId === c.id) && r.type != null,
        );
        return [
          { kind: 'add-module', id: m.id, name: m.name, subdomainType: m.subdomainType ?? 'GENERIC' },
          // Re-annotate the derived pairs this module participated in.
          ...rels.map(
            (r): ModuxCommand => ({
              kind: 'set-relation-type',
              sourceId: r.sourceId,
              targetId: r.targetId,
              type: r.type as NonNullable<typeof r.type>,
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
      case 'add-domain-event':
        return [{ kind: 'remove-domain-event', id: c.id }];
      case 'add-query-service':
        return [{ kind: 'remove-query-service', id: c.id }];
      case 'remove-query-service': {
        for (const m of this.model.modules) {
          const qs = (m.queryServices ?? []).find((x) => x.id === c.id);
          if (qs) return [{ kind: 'add-query-service', id: qs.id, name: qs.name, moduleId: m.id }];
        }
        return null;
      }
      case 'add-query-call':
        return [{ kind: 'remove-query-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-query-call':
        return [{ kind: 'add-query-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-actor-use':
        return [{ kind: 'remove-actor-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-actor-use':
        return [{ kind: 'add-actor-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-actor-external':
        return [{ kind: 'remove-actor-external', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-actor-external':
        return [{ kind: 'add-actor-external', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-external-dependency': {
        // Re-drawing with the other type RETYPES the edge — the inverse restores it.
        const prev = (this.model.externalSystemDependencies ?? []).find(
          (d) => d.sourceId === c.sourceId && d.targetId === c.targetId,
        );
        return prev
          ? [{ kind: 'add-external-dependency', sourceId: c.sourceId, targetId: c.targetId, type: prev.type }]
          : [{ kind: 'remove-external-dependency', sourceId: c.sourceId, targetId: c.targetId }];
      }
      case 'remove-external-dependency': {
        const prev = (this.model.externalSystemDependencies ?? []).find(
          (d) => d.sourceId === c.sourceId && d.targetId === c.targetId,
        );
        return [{ kind: 'add-external-dependency', sourceId: c.sourceId, targetId: c.targetId, type: prev?.type }];
      }
      case 'add-proxy-api':
        return [{ kind: 'remove-proxy-api', id: c.id }];
      case 'remove-proxy-api': {
        const px = (this.model.proxyApis ?? []).find((x) => x.id === c.id);
        return px
          ? [{
              kind: 'add-proxy-api',
              id: px.id,
              name: px.name,
              targetId: px.targetApiId,
              moduleId: px.publishedByExternalSystemId,
            }]
          : null;
      }
      case 'set-proxy-target': {
        const px = (this.model.proxyApis ?? []).find((x) => x.id === c.id);
        return px ? [{ kind: 'set-proxy-target', id: c.id, targetId: px.targetApiId ?? '' }] : null;
      }
      case 'add-api-implementation':
        return [{ kind: 'remove-api-implementation', apiId: c.apiId, moduleId: c.moduleId }];
      case 'remove-api-implementation':
        return [{ kind: 'add-api-implementation', apiId: c.apiId, moduleId: c.moduleId }];
      case 'add-proxy-operation-route':
        return [{
          kind: 'remove-proxy-operation-route',
          proxyId: c.proxyId,
          operationId: c.operationId,
          targetSiteId: c.targetSiteId,
        }];
      case 'remove-proxy-operation-route':
        return [{
          kind: 'add-proxy-operation-route',
          proxyId: c.proxyId,
          operationId: c.operationId,
          targetSiteId: c.targetSiteId,
        }];
      case 'add-external-operation-use':
        return [{
          kind: 'remove-external-operation-use',
          sourceId: c.sourceId,
          operationId: c.operationId,
          targetSiteId: c.targetSiteId,
        }];
      case 'remove-external-operation-use':
        return [{
          kind: 'add-external-operation-use',
          sourceId: c.sourceId,
          operationId: c.operationId,
          targetSiteId: c.targetSiteId,
        }];
      case 'set-api-operation-implementation': {
        const prev = (this.model.apiOperationImplementations ?? []).find(
          (w) => w.apiId === c.apiId && w.operationId === c.operationId && w.moduleId === c.moduleId,
        );
        return prev
          ? [{
              kind: 'set-api-operation-implementation',
              apiId: c.apiId,
              operationId: c.operationId,
              moduleId: c.moduleId,
              targetUseCaseId: prev.useCaseId,
            }]
          : [{
              kind: 'remove-api-operation-implementation',
              apiId: c.apiId,
              operationId: c.operationId,
              moduleId: c.moduleId,
            }];
      }
      case 'remove-api-operation-implementation': {
        const prev = (this.model.apiOperationImplementations ?? []).find(
          (w) => w.apiId === c.apiId && w.operationId === c.operationId && w.moduleId === c.moduleId,
        );
        return prev
          ? [{
              kind: 'set-api-operation-implementation',
              apiId: c.apiId,
              operationId: c.operationId,
              moduleId: c.moduleId,
              targetUseCaseId: prev.useCaseId,
            }]
          : null;
      }
      case 'set-api-publisher': {
        const el =
          (this.model.apis ?? []).find((a) => a.id === c.id) ??
          (this.model.proxyApis ?? []).find((px) => px.id === c.id);
        return el
          ? [{ kind: 'set-api-publisher', id: c.id, targetId: el.publishedByExternalSystemId ?? '' }]
          : null;
      }
      case 'add-actor-crud':
        return [{ kind: 'remove-actor-crud', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-actor-crud':
        return [{ kind: 'add-actor-crud', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-use-case':
        return [{ kind: 'remove-use-case', id: c.id }];
      case 'remove-use-case': {
        for (const m of this.model.modules) {
          const u = (m.useCases ?? []).find((x) => x.id === c.id);
          if (u) {
            return [
              { kind: 'add-use-case', id: u.id, name: u.name, moduleId: m.id, policy: u.policy },
            ];
          }
        }
        return null;
      }
      case 'add-external-use-case':
        return [{ kind: 'remove-external-use-case', id: c.id }];
      case 'remove-external-use-case': {
        for (const x of this.model.externalSystems) {
          const u = (x.useCases ?? []).find((e) => e.id === c.id);
          if (u) {
            return [{ kind: 'add-external-use-case', id: u.id, name: u.name, moduleId: x.id }];
          }
        }
        return null;
      }
      case 'add-external-call':
        return [{ kind: 'remove-external-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-external-call':
        return [{ kind: 'add-external-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-external-uc-call':
        return [{ kind: 'remove-external-uc-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-external-uc-call':
        return [{ kind: 'add-external-uc-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-use-case-call':
        return [{ kind: 'remove-use-case-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-use-case-call':
        return [{ kind: 'add-use-case-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-use-case-step':
        return [{ kind: 'remove-use-case-step', useCaseId: c.useCaseId, id: c.id }];
      case 'add-aggregate-call':
        return [{ kind: 'remove-aggregate-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-aggregate-call':
        return [{ kind: 'add-aggregate-call', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-emission':
        return [{ kind: 'remove-emission', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-emission':
        return [{ kind: 'add-emission', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-external-system':
        return [{ kind: 'remove-external-system', id: c.id }];
      case 'remove-external-system': {
        const x = this.model.externalSystems.find((e) => e.id === c.id);
        return x ? [{ kind: 'add-external-system', id: x.id, name: x.name }] : null;
      }
      case 'add-ai-agent':
        return [{ kind: 'remove-ai-agent', id: c.id }];
      case 'remove-ai-agent': {
        const a = (this.model.aiAgents ?? []).find((x) => x.id === c.id);
        if (!a) return null;
        // Removing an agent unlinks it everywhere; the inverse restores every link.
        return [
          { kind: 'add-ai-agent', id: a.id, name: a.name, external: a.external },
          ...(this.model.agentUses ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-agent-use', sourceId: c.id, targetId: u.useCaseId })),
          ...(this.model.agentExternalUses ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({
              kind: 'add-agent-external-use',
              sourceId: c.id,
              targetId: u.externalUseCaseId,
            })),
          ...(this.model.agentMcpUses ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-agent-mcp', sourceId: c.id, targetId: u.mcpServerId })),
          ...(this.model.agentGatewayUses ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-agent-gateway', sourceId: c.id, targetId: u.gatewayId })),
          ...(this.model.agentApiOpUses ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({
              kind: 'add-agent-api-operation',
              sourceId: c.id,
              targetId: u.apiOperationId,
            })),
          ...(this.model.agentQueryUses ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-agent-query', sourceId: c.id, targetId: u.queryServiceId })),
          ...(this.model.agentRags ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-agent-rag', sourceId: c.id, targetId: u.ragId })),
          ...(this.model.agentDelegations ?? [])
            .filter((u) => u.agentId === c.id || u.delegateAgentId === c.id)
            .map((u): ModuxCommand => ({
              kind: 'add-agent-delegate',
              sourceId: u.agentId,
              targetId: u.delegateAgentId,
            })),
          ...(this.model.actorAgentUses ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-actor-agent', sourceId: u.actorId, targetId: c.id })),
          ...(this.model.agentTriggers ?? [])
            .filter((u) => u.agentId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-agent-trigger', sourceId: u.eventId, targetId: c.id })),
        ];
      }
      case 'add-mcp-gateway':
        return [{ kind: 'remove-mcp-gateway', id: c.id }];
      case 'remove-mcp-gateway': {
        const g = (this.model.mcpGateways ?? []).find((x) => x.id === c.id);
        if (!g) return null;
        // The inverse restores the gateway, its exposures and its agent links.
        return [
          { kind: 'add-mcp-gateway', id: g.id, name: g.name },
          ...[
            ...(g.mcpServerIds ?? []),
            ...(g.apiIds ?? []),
            ...(g.apiOperationIds ?? []),
            ...(g.useCaseIds ?? []),
            ...(g.ragIds ?? []),
          ].map((t): ModuxCommand => ({ kind: 'add-gateway-exposure', sourceId: c.id, targetId: t })),
          ...(this.model.agentGatewayUses ?? [])
            .filter((u) => u.gatewayId === c.id)
            .map((u): ModuxCommand => ({ kind: 'add-agent-gateway', sourceId: u.agentId, targetId: c.id })),
        ];
      }
      case 'add-gateway-exposure':
        return [{ kind: 'remove-gateway-exposure', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-gateway-exposure':
        return [{ kind: 'add-gateway-exposure', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-gateway':
        return [{ kind: 'remove-agent-gateway', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-gateway':
        return [{ kind: 'add-agent-gateway', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-api':
        return [{ kind: 'remove-agent-api', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-api':
        return [{ kind: 'add-agent-api', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-api-operation':
        return [{ kind: 'remove-agent-api-operation', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-api-operation':
        return [{ kind: 'add-agent-api-operation', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-query':
        return [{ kind: 'remove-agent-query', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-query':
        return [{ kind: 'add-agent-query', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-delegate':
        return [{ kind: 'remove-agent-delegate', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-delegate':
        return [{ kind: 'add-agent-delegate', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-actor-agent':
        return [{ kind: 'remove-actor-agent', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-actor-agent':
        return [{ kind: 'add-actor-agent', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-trigger':
        return [{ kind: 'remove-agent-trigger', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-trigger':
        return [{ kind: 'add-agent-trigger', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-use':
        return [{ kind: 'remove-agent-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-use':
        return [{ kind: 'add-agent-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-external-use':
        return [{ kind: 'remove-agent-external-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-external-use':
        return [{ kind: 'add-agent-external-use', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-agent-mcp':
        return [{ kind: 'remove-agent-mcp', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-mcp':
        return [{ kind: 'add-agent-mcp', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-mcp-server':
        return [{ kind: 'remove-mcp-server', id: c.id }];
      case 'remove-mcp-server': {
        for (const x of this.model.externalSystems) {
          const s = (x.mcpServers ?? []).find((e) => e.id === c.id);
          if (s) {
            // Removing the server also unlinks agents; the inverse restores the links.
            return [
              { kind: 'add-mcp-server', id: s.id, name: s.name, moduleId: x.id, uri: s.uri },
              ...(this.model.agentMcpUses ?? [])
                .filter((u) => u.mcpServerId === c.id)
                .map(
                  (u): ModuxCommand => ({
                    kind: 'add-agent-mcp',
                    sourceId: u.agentId,
                    targetId: c.id,
                  }),
                ),
            ];
          }
        }
        return null;
      }
      case 'add-rag':
        return [{ kind: 'remove-rag', id: c.id }];
      case 'remove-rag': {
        const r = (this.model.rags ?? []).find((x) => x.id === c.id);
        if (!r) return null;
        // Removing a rag also unlinks it everywhere; the inverse restores the links.
        return [
          { kind: 'add-rag', id: r.id, name: r.name },
          ...(this.model.agentRags ?? [])
            .filter((u) => u.ragId === c.id)
            .map(
              (u): ModuxCommand => ({
                kind: 'add-agent-rag',
                sourceId: u.agentId,
                targetId: c.id,
              }),
            ),
          ...(r.sourceReadModelIds ?? []).map(
            (rmId): ModuxCommand => ({ kind: 'add-rag-source', sourceId: c.id, targetId: rmId }),
          ),
        ];
      }
      case 'add-agent-rag':
        return [{ kind: 'remove-agent-rag', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-agent-rag':
        return [{ kind: 'add-agent-rag', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-rag-source':
        return [{ kind: 'remove-rag-source', sourceId: c.sourceId, targetId: c.targetId }];
      case 'remove-rag-source':
        return [{ kind: 'add-rag-source', sourceId: c.sourceId, targetId: c.targetId }];
      case 'add-actor':
        return [{ kind: 'remove-actor', id: c.id }];
      case 'remove-actor': {
        const a = (this.model.actors ?? []).find((x) => x.id === c.id);
        return a ? [{ kind: 'add-actor', id: a.id, name: a.name }] : null;
      }
      case 'add-application-event':
        return [{ kind: 'remove-application-event', id: c.id }];
      case 'remove-application-event': {
        for (const m of this.model.modules) {
          const ev = (m.applicationEvents ?? []).find((x) => x.id === c.id);
          if (ev) {
            return [{ kind: 'add-application-event', id: ev.id, name: ev.name, moduleId: m.id }];
          }
        }
        return null;
      }
      case 'add-domain-service':
        return [{ kind: 'remove-domain-service', id: c.id }];
      case 'remove-domain-service': {
        for (const m of this.model.modules) {
          const ds = (m.domainServices ?? []).find((x) => x.id === c.id);
          if (ds) return [{ kind: 'add-domain-service', id: ds.id, name: ds.name, moduleId: m.id }];
        }
        return null;
      }
      case 'add-read-model':
        return [{ kind: 'remove-read-model', id: c.id }];
      case 'add-projection':
        return [{ kind: 'remove-projection', id: c.id }];
      case 'remove-projection': {
        const p = (this.model.projections ?? []).find((x) => x.id === c.id);
        // Only source-declared projections are restorable from the canvas; the stub
        // read model survives the removal, so relinking by targetId suffices.
        return p && (p.sourceAggregateId || p.sourceExternalUseCaseId || p.sourceExternalTableId)
          ? [
              {
                kind: 'add-projection',
                id: p.id,
                name: p.name,
                aggregateId: p.sourceAggregateId,
                externalUseCaseId: p.sourceExternalUseCaseId,
                externalTableId: p.sourceExternalTableId,
                targetId: p.readModelId,
                moduleId: p.moduleId,
              },
            ]
          : null;
      }
      case 'add-external-table':
        return [{ kind: 'remove-external-table', id: c.id }];
      case 'remove-external-table': {
        for (const x of this.model.externalSystems) {
          const t = (x.tables ?? []).find((e) => e.id === c.id);
          if (t) return [{ kind: 'add-external-table', id: t.id, name: t.name, moduleId: x.id }];
        }
        return null;
      }
      case 'add-rag-content-source':
        return [{ kind: 'remove-rag-content-source', sourceId: c.sourceId, uri: c.uri }];
      case 'remove-rag-content-source': {
        const source = (this.model.rags ?? [])
          .find((r) => r.id === c.sourceId)
          ?.contentSources?.find((s) => s.uri === c.uri);
        return source
          ? [
              {
                kind: 'add-rag-content-source',
                sourceId: c.sourceId,
                type: source.type,
                uri: c.uri,
              },
            ]
          : null;
      }
      case 'add-view-member':
        return [{ kind: 'remove-view-member', id: c.id, targetId: c.targetId }];
      case 'remove-view-member':
        return [{ kind: 'add-view-member', id: c.id, targetId: c.targetId }];
      case 'add-api':
        return [{ kind: 'remove-api', id: c.id }];
      case 'remove-api': {
        const api = (this.model.apis ?? []).find((x) => x.id === c.id);
        return api
          ? [
              { kind: 'add-api', id: api.id, name: api.name },
              ...api.operations.map(
                (op): ModuxCommand => ({
                  kind: 'add-api-operation',
                  apiId: api.id,
                  id: op.id,
                  name: op.name,
                  httpMethod: op.httpMethod,
                  path: op.path,
                  moduleId: op.targetModuleId,
                  targetUseCaseId: op.targetUseCaseId,
                }),
              ),
            ]
          : null;
      }
      case 'add-api-operation':
        return [{ kind: 'remove-api-operation', apiId: c.apiId, id: c.id }];
      case 'remove-api-operation': {
        const op = (this.model.apis ?? [])
          .find((x) => x.id === c.apiId)
          ?.operations.find((o) => o.id === c.id);
        return op
          ? [
              {
                kind: 'add-api-operation',
                apiId: c.apiId,
                id: op.id,
                name: op.name,
                httpMethod: op.httpMethod,
                path: op.path,
                moduleId: op.targetModuleId,
                targetUseCaseId: op.targetUseCaseId,
              },
            ]
          : null;
      }
      case 'set-api-operation-target': {
        const op = (this.model.apis ?? [])
          .find((x) => x.id === c.apiId)
          ?.operations.find((o) => o.id === c.id);
        return op
          ? [
              {
                kind: 'set-api-operation-target',
                apiId: c.apiId,
                id: c.id,
                moduleId: op.targetModuleId,
                targetUseCaseId: op.targetUseCaseId,
              },
            ]
          : null;
      }
      case 'remove-read-model': {
        for (const m of this.model.modules) {
          const rm = (m.readModels ?? []).find((x) => x.id === c.id);
          if (rm?.aggregateId) {
            return [{ kind: 'add-read-model', id: rm.id, name: rm.name, aggregateId: rm.aggregateId }];
          }
        }
        return null;
      }
      case 'remove-domain-event': {
        for (const m of this.model.modules) {
          const ev = (m.domainEvents ?? []).find((x) => x.id === c.id);
          if (ev) return [{ kind: 'add-domain-event', id: ev.id, name: ev.name, moduleId: m.id }];
        }
        return null;
      }
      case 'rename-element': {
        const list =
          c.type === 'module'
            ? this.model.modules
            : c.type === 'aggregate'
              ? this.model.aggregates ?? []
              : c.type === 'domain-event'
                ? this.model.modules.flatMap((m) => m.domainEvents ?? [])
                : c.type === 'read-model'
                  ? this.model.modules.flatMap((m) => m.readModels ?? [])
                  : c.type === 'domain-service'
                    ? this.model.modules.flatMap((m) => m.domainServices ?? [])
                    : c.type === 'query-service'
                      ? this.model.modules.flatMap((m) => m.queryServices ?? [])
                      : c.type === 'use-case'
                        ? this.model.modules.flatMap((m) => m.useCases ?? [])
                        : c.type === 'external-use-case'
                          ? this.model.externalSystems.flatMap((x) => x.useCases ?? [])
                          : c.type === 'mcp-server'
                            ? this.model.externalSystems.flatMap((x) => x.mcpServers ?? [])
                      : c.type === 'application-event'
                        ? this.model.modules.flatMap((m) => m.applicationEvents ?? [])
                        : c.type === 'external-system'
                          ? this.model.externalSystems
                          : c.type === 'actor'
                            ? this.model.actors ?? []
                            : c.type === 'ai-agent'
                              ? this.model.aiAgents ?? []
                              : c.type === 'mcp-gateway'
                                ? this.model.mcpGateways ?? []
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
      case 'add-view':
        return [{ kind: 'remove-view', id: c.id }];
      case 'remove-view': {
        const v = (this.model.views ?? []).find((x) => x.id === c.id);
        return v ? [{ kind: 'add-view', id: v.id, name: v.name, memberIds: v.memberIds }] : null;
      }
      case 'add-process':
        return [{ kind: 'remove-process', id: c.id }];
      case 'add-process-step':
        return [{ kind: 'remove-process-step', processId: c.processId, id: c.id }];
      case 'remove-process-step': {
        const process = (this.model.processes ?? []).find((p) => p.id === c.processId);
        const index = process?.steps.findIndex((s) => s.id === c.id) ?? -1;
        if (!process || index < 0) return null;
        const step = process.steps[index];
        return [
          {
            kind: 'add-process-step',
            processId: c.processId,
            id: step.id,
            name: step.name,
            stepType: step.type,
            roleId: step.roleId,
            deadline: step.deadline,
            useCaseId: step.useCaseId,
            compensationUseCaseId: step.compensationUseCaseId,
            afterStepId: index > 0 ? process.steps[index - 1].id : undefined,
          },
        ];
      }
      case 'move-process-step': {
        const process = (this.model.processes ?? []).find((p) => p.id === c.processId);
        const index = process?.steps.findIndex((s) => s.id === c.id) ?? -1;
        if (!process || index < 0) return null;
        return [
          {
            kind: 'move-process-step',
            processId: c.processId,
            id: c.id,
            afterStepId: index > 0 ? process.steps[index - 1].id : undefined,
          },
        ];
      }
      case 'update-process-step': {
        const process = (this.model.processes ?? []).find((p) => p.id === c.processId);
        const step = process?.steps.find((s) => s.id === c.id);
        if (!step) return null;
        return [
          {
            kind: 'update-process-step',
            processId: c.processId,
            id: c.id,
            roleId: step.roleId,
            deadline: step.deadline,
            compensationUseCaseId: step.compensationUseCaseId,
          },
        ];
      }
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
      case 'add-workflow':
        return [{ kind: 'remove-workflow', id: c.id }];
      case 'remove-workflow': {
        const w = (this.model.workflows ?? []).find((x) => x.id === c.id);
        return w
          ? [
              {
                kind: 'add-workflow',
                id: w.id,
                name: w.name,
                triggerAggregateId: w.triggerAggregateId,
                triggerDomainServiceId: w.triggerDomainServiceId,
                triggerUseCaseId: w.triggerUseCaseId,
                triggerEvent: w.triggerEvent,
                completionEventName: w.onCompletionEventName,
                workflowSteps: w.steps,
              },
            ]
          : null;
      }
      case 'add-workflow-step':
        return [{ kind: 'remove-workflow-step', workflowId: c.workflowId, id: c.id }];
      case 'remove-workflow-step': {
        const workflow = (this.model.workflows ?? []).find((x) => x.id === c.workflowId);
        const index = workflow?.steps.findIndex((s) => s.id === c.id) ?? -1;
        if (!workflow || index < 0) return null;
        const step = workflow.steps[index];
        return [
          {
            kind: 'add-workflow-step',
            workflowId: c.workflowId,
            id: step.id,
            name: step.name,
            emittedEventName: step.emittedEventName,
            targetUseCaseId: step.targetUseCaseId,
            completionEventName: step.completionEventName,
            dependsOnStepIds: step.dependsOnStepIds,
            afterStepId: index > 0 ? workflow.steps[index - 1].id : undefined,
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...workflow.steps
            .filter((s) => s.id !== c.id && (s.dependsOnStepIds ?? []).includes(c.id))
            .map(
              (s): ModuxCommand => ({
                kind: 'add-workflow-dependency',
                workflowId: c.workflowId,
                id: s.id,
                dependsOnStepId: c.id,
              }),
            ),
        ];
      }
      case 'update-workflow-step': {
        const workflow = (this.model.workflows ?? []).find((x) => x.id === c.workflowId);
        const step = workflow?.steps.find((s) => s.id === c.id);
        if (!step) return null;
        return [
          {
            kind: 'update-workflow-step',
            workflowId: c.workflowId,
            id: c.id,
            emittedEventName: step.emittedEventName,
            targetUseCaseId: step.targetUseCaseId,
            completionEventName: step.completionEventName,
          },
        ];
      }
      case 'set-workflow-trigger': {
        const wf = (this.model.workflows ?? []).find((w) => w.id === c.id);
        return wf
          ? [{
              kind: 'set-workflow-trigger',
              id: c.id,
              triggerEvent: wf.triggerEvent ?? '',
              triggerAggregateId: wf.triggerAggregateId,
              triggerDomainServiceId: wf.triggerDomainServiceId,
              triggerUseCaseId: wf.triggerUseCaseId,
            }]
          : null;
      }
      case 'add-workflow-dependency':
        return [
          {
            kind: 'remove-workflow-dependency',
            workflowId: c.workflowId,
            id: c.id,
            dependsOnStepId: c.dependsOnStepId,
          },
        ];
      case 'remove-workflow-dependency':
        return [
          {
            kind: 'add-workflow-dependency',
            workflowId: c.workflowId,
            id: c.id,
            dependsOnStepId: c.dependsOnStepId,
          },
        ];
    }
    return null;
  }

  /** Discard undo/redo — called by the host when the model changed externally. */
  clearHistory(): void {
    this._undoStack = [];
    this._redoStack = [];
  }

  private undo(): void {
    const inverse = this._undoStack[this._undoStack.length - 1];
    if (!inverse) return;
    this._undoStack = this._undoStack.slice(0, -1);
    this._redoStack = [...this._redoStack.slice(-19), this.inversesOf(inverse)];
    this.applyOps(inverse);
  }

  private redo(): void {
    const ops = this._redoStack[this._redoStack.length - 1];
    if (!ops) return;
    this._redoStack = this._redoStack.slice(0, -1);
    this._undoStack = [...this._undoStack.slice(-19), this.inversesOf(ops)];
    this.applyOps(ops);
  }

  private onNodeMoved(e: CustomEvent): void {
    const { id, x, y } = e.detail;
    const view = this._view;
    const current = this.viewLayout(view);
    const previous = current.nodes[id] ?? null;
    // A nested child is stored as an offset from its container, so it stays put
    // relative to the container when the container itself moves.
    let pos = { x, y };
    const scene = this.sceneFor(view);
    const node = scene.nodes.find((n) => n.id === id);
    if (node?.parentId) {
      const parent = scene.nodes.find((n) => n.id === node.parentId);
      if (parent) pos = { x: x - parent.x, y: y - parent.y };
    }
    this.writeViewLayout(view, { ...current, nodes: { ...current.nodes, [id]: pos } });
    const inverseOps: EditOp[] = [{ kind: 'move-node', view, id, pos: previous }];
    // Dragging a step across its siblings also reorders the process.
    if (view === 'processes') {
      const reorder = this.stepReorderCommand(id);
      if (reorder) {
        const inverse = this.inverseOf(reorder);
        if (inverse) inverseOps.unshift(...inverse);
        this.command(reorder, false);
      }
    }
    this.pushUndoEntry(inverseOps);
  }

  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  private onNodeReparentRequested(e: CustomEvent): void {
    const { id, targetId, x, y } = e.detail as {
      id: string;
      targetId: string | null;
      x: number;
      y: number;
    };
    const api =
      (this.model.apis ?? []).find((a) => a.id === id) ??
      (this.model.proxyApis ?? []).find((px) => px.id === id);
    if (!api) return;
    if (targetId && !this.model.externalSystems.some((s) => s.id === targetId)) return;
    const current = api.publishedByExternalSystemId ?? '';
    const next = targetId ?? '';
    if (next === current) return;
    const view = this._view;
    const layout = this.viewLayout(view);
    const scene = this.sceneFor(view);
    const parent = next ? scene.nodes.find((n) => n.id === next) : undefined;
    const pos = parent ? { x: x - parent.x, y: y - parent.y } : { x, y };
    const ops: EditOp[] = [
      { kind: 'set-api-publisher', id, targetId: current },
      { kind: 'move-node', view, id, pos: layout.nodes[id] ?? null },
    ];
    this.command({ kind: 'set-api-publisher', id, targetId: next }, false);
    this.writeViewLayout(view, { ...layout, nodes: { ...layout.nodes, [id]: pos } });
    this.pushUndoEntry(ops);
  }

  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  private onNodeProxyRequested(e: CustomEvent): void {
    const { id, targetId, x, y } = e.detail as {
      id: string;
      targetId: string;
      x: number;
      y: number;
    };
    const api = (this.model.apis ?? []).find((a) => a.id === id);
    const host = this.model.externalSystems.find((s) => s.id === targetId);
    if (!api || !host) return;
    const duplicated = (this.model.proxyApis ?? []).some(
      (px) => px.targetApiId === id && px.publishedByExternalSystemId === targetId,
    );
    if (duplicated) return;
    const proxyId = `proxy-${slug(api.name)}-${slug(host.name)}`;
    if ((this.model.proxyApis ?? []).some((px) => px.id === proxyId)) return;
    const view = this._view;
    const layout = this.viewLayout(view);
    const scene = this.sceneFor(view);
    const parent = scene.nodes.find((n) => n.id === targetId);
    this.command(
      {
        kind: 'add-proxy-api',
        id: proxyId,
        name: `${api.name}@${host.name}`,
        targetId: id,
        moduleId: targetId,
      },
      false,
    );
    const ops: EditOp[] = [{ kind: 'remove-proxy-api', id: proxyId }];
    if (parent) {
      ops.push({ kind: 'move-node', view, id: proxyId, pos: layout.nodes[proxyId] ?? null });
      this.writeViewLayout(view, {
        ...layout,
        nodes: { ...layout.nodes, [proxyId]: { x: x - parent.x, y: y - parent.y } },
      });
    }
    this.pushUndoEntry(ops);
  }

  /**
   * Where an imported contract lands: the selected API — or, with a proxy
   * selected, the API it fronts (a proxy has no operations of its own).
   */
  private selectedApiId(): string | null {
    if (!this._selectedId) return null;
    if ((this.model.apis ?? []).some((a) => a.id === this._selectedId)) {
      return this._selectedId;
    }
    const proxy = (this.model.proxyApis ?? []).find((px) => px.id === this._selectedId);
    return proxy?.targetApiId ?? null;
  }

  /** Reads the picked contract and hands it to the host (the import is a server call). */
  private async onImportApiFile(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const content = await file.text();
    const apiId = this.selectedApiId();
    // An API never floats: without an API selected, the selected external system
    // or context becomes the home of the imported contract.
    const homeExternalId = apiId
      ? null
      : (this.model.externalSystems.find((x) => x.id === this._selectedId)?.id ?? null);
    const homeModuleId =
      apiId || homeExternalId
        ? null
        : (this.model.modules.find((mo) => mo.id === this._selectedId)?.id ?? null);
    if (!apiId && !homeExternalId && !homeModuleId) {
      this.emit('modux-notice', {
        message:
          'Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar',
      });
      return;
    }
    this.emit('modux-import-api', {
      content,
      fileName: file.name,
      apiId,
      homeExternalId,
      homeModuleId,
    });
  }

  /** One dropdown drives the diagram: a context-map detail level, or a specialized view. */
  private onDiagramScopeChange(value: string): void {
    if (value.startsWith('level:')) {
      this._view = 'context-map';
      this.setDetail(value.slice('level:'.length) as 'contexts' | 'detail' | 'operations');
      return;
    }
    if (value.startsWith('view:')) {
      this._view = value.slice('view:'.length) as ViewId;
    }
  }

  /** Folding is a view preference (like the detail level): persisted, not undoable. */
  private onNodeCollapseToggled(e: CustomEvent): void {
    const { id } = e.detail as { id: string };
    const view = this._view;
    const current = this.viewLayout(view);
    const set = new Set(current.collapsed ?? []);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    this.writeViewLayout(view, { ...current, collapsed: [...set] });
  }

  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  private onNodesMoved(e: CustomEvent): void {
    const { moves } = e.detail as { moves: { id: string; x: number; y: number }[] };
    const view = this._view;
    const current = this.viewLayout(view);
    const scene = this.sceneFor(view);
    const nodes = { ...current.nodes };
    const inverseOps: EditOp[] = [];
    for (const { id, x, y } of moves) {
      inverseOps.push({ kind: 'move-node', view, id, pos: current.nodes[id] ?? null });
      let pos = { x, y };
      const node = scene.nodes.find((n) => n.id === id);
      if (node?.parentId) {
        const parent = scene.nodes.find((n) => n.id === node.parentId);
        if (parent) pos = { x: x - parent.x, y: y - parent.y };
      }
      nodes[id] = pos;
    }
    this.writeViewLayout(view, { ...current, nodes });
    if (view === 'processes') {
      for (const { id } of moves) {
        const reorder = this.stepReorderCommand(id);
        if (reorder) {
          const inverse = this.inverseOf(reorder);
          if (inverse) inverseOps.unshift(...inverse);
          this.command(reorder, false);
        }
      }
    }
    this.pushUndoEntry(inverseOps);
  }

  private onNodeResized(e: CustomEvent): void {
    const { id, x, y, w, h } = e.detail as { id: string; x: number; y: number; w: number; h: number };
    const view = this._view;
    const current = this.viewLayout(view);
    // An anchored resize moves the centre; children stayed put on screen, so
    // their offsets (relative to the centre) are re-expressed from the new one.
    const children = this.sceneFor(view).nodes.filter((n) => n.parentId === id);
    this.pushUndoEntry([
      { kind: 'resize-node', view, id, size: current.sizes?.[id] ?? null },
      { kind: 'move-node', view, id, pos: current.nodes[id] ?? null },
      ...children.map((c): EditOp => ({ kind: 'move-node', view, id: c.id, pos: current.nodes[c.id] ?? null })),
    ]);
    const nodes = { ...current.nodes, [id]: { x, y } };
    for (const c of children) nodes[c.id] = { x: c.x - x, y: c.y - y };
    this.writeViewLayout(view, {
      ...current,
      nodes,
      sizes: { ...(current.sizes ?? {}), [id]: { w, h } },
    });
  }

  private onEdgePointsChanged(e: CustomEvent): void {
    const { id, points } = e.detail as { id: string; points: Point[] };
    const view = this._view;
    const current = this.viewLayout(view);
    this.pushUndoEntry([
      { kind: 'set-edge-points', view, id, points: current.edges[id] ?? null },
    ]);
    const edges = { ...current.edges };
    if (points.length) edges[id] = points;
    else delete edges[id];
    this.writeViewLayout(view, { ...current, edges });
  }

  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  private stepReorderCommand(stepId: string): ModuxCommand | null {
    const owner = this.owningProcessOf(stepId);
    if (!owner) return null;
    const scene = processesScene(this.model, this.viewLayout('processes').nodes);
    const xOf = new Map(scene.nodes.map((n) => [n.id, n.x]));
    const sorted = [...owner.steps].sort(
      (a, b) => (xOf.get(a.id) ?? 0) - (xOf.get(b.id) ?? 0),
    );
    if (sorted.every((s, i) => s.id === owner.steps[i].id)) return null;
    const index = sorted.findIndex((s) => s.id === stepId);
    return {
      kind: 'move-process-step',
      processId: owner.id,
      id: stepId,
      afterStepId: index > 0 ? sorted[index - 1].id : undefined,
    };
  }

  private onConnectRequested(e: CustomEvent): void {
    const { sourceId, targetId, x, y } = e.detail;
    this.applyConnection(sourceId, targetId, x, y);
  }

  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  private applyConnection(sourceId: string, targetId: string, x?: number, y?: number): void {
    // In the workflows view, dragging step A → step B declares "B depends on A".
    if (this._view === 'workflows') {
      const sourceOwner = this.owningWorkflowOf(sourceId);
      const targetOwner = this.owningWorkflowOf(targetId);
      if (!sourceOwner || sourceOwner !== targetOwner || sourceId === targetId) return;
      const target = sourceOwner.steps.find((s) => s.id === targetId);
      if ((target?.dependsOnStepIds ?? []).includes(sourceId)) return;
      this.command({
        kind: 'add-workflow-dependency',
        workflowId: sourceOwner.id,
        id: targetId,
        dependsOnStepId: sourceId,
      });
      return;
    }
    if (this._view !== 'context-map') return;
    // A proxy's operation occurrence → an implementation SITE of the fronted API: the
    // published API node (in its external system) or an api-impl occurrence (in a
    // bounded context; the bare context also counts when it implements the API).
    const opOcc = /^apiop:(.+)@(.+)$/.exec(sourceId);
    if (opOcc) {
      const [, operationId, siteId] = opOcc;
      const px = (this.model.proxyApis ?? []).find((p) => p.id === siteId);
      // The occurrence's API: through the proxy's target, or the site module's implementation.
      const occApiId =
        px?.targetApiId ??
        (this.model.apiImplementations ?? []).find(
          (impl) =>
            impl.moduleId === siteId &&
            (this.model.apis ?? []).some(
              (a) => a.id === impl.apiId && a.operations.some((o) => o.id === operationId),
            ),
        )?.apiId;
      if (!occApiId) return;
      // Occurrence → use case: the fine wiring of the OPERATION itself (any site, same op).
      const occUcIds = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (occUcIds.has(targetId)) {
        // From an occurrence, the wiring is ALWAYS per-site: the site is the bounded
        // context implementing the API, or the proxy fronting it — the use case serving
        // the operation there may live in any context. (The published chip keeps the
        // global targetUseCaseId wiring.)
        this.command({
          kind: 'set-api-operation-implementation',
          apiId: occApiId,
          operationId,
          moduleId: siteId,
          targetUseCaseId: targetId,
        });
        return;
      }
      // The routing gestures below only make sense from a PROXY's occurrence.
      if (!px?.targetApiId) return;
      let targetSiteId: string | null = null;
      if (targetId === px.targetApiId) {
        targetSiteId = px.targetApiId; // as published
      } else {
        const implTarget = /^apiimpl:(.+)@(.+)$/.exec(targetId);
        if (implTarget && implTarget[1] === px.targetApiId) {
          targetSiteId = implTarget[2];
        } else if (
          this.model.modules.some((m) => m.id === targetId) &&
          (this.model.apiImplementations ?? []).some(
            (impl) => impl.apiId === px.targetApiId && impl.moduleId === targetId,
          )
        ) {
          targetSiteId = targetId;
        }
      }
      if (!targetSiteId) return;
      const already = (this.model.proxyOperationRoutes ?? []).some(
        (r) => r.proxyId === px.id && r.operationId === operationId && r.targetSiteId === targetSiteId,
      );
      if (!already) {
        this.command({
          kind: 'add-proxy-operation-route',
          proxyId: px.id,
          operationId,
          targetSiteId,
        });
      }
      return;
    }
    // Actor and AI-agent drags come first: they may legally end on children (use
    // cases, query services, aggregates) that other gestures treat as off-limits.
    const agentIds = new Set((this.model.aiAgents ?? []).map((a) => a.id));
    if (agentIds.has(sourceId)) {
      const agentUcIds = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (agentUcIds.has(targetId)) {
        const already = (this.model.agentUses ?? []).some(
          (u) => u.agentId === sourceId && u.useCaseId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-use', sourceId, targetId });
        return;
      }
      // The other half of the agent's tool surface: external-system operations.
      const agentExtUcIds = new Set(
        this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((u) => u.id)),
      );
      if (agentExtUcIds.has(targetId)) {
        const already = (this.model.agentExternalUses ?? []).some(
          (u) => u.agentId === sourceId && u.externalUseCaseId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-external-use', sourceId, targetId });
        return;
      }
      // Or a whole MCP server published by an external system.
      const agentMcpIds = new Set(
        this.model.externalSystems.flatMap((x) => (x.mcpServers ?? []).map((s) => s.id)),
      );
      if (agentMcpIds.has(targetId)) {
        const already = (this.model.agentMcpUses ?? []).some(
          (u) => u.agentId === sourceId && u.mcpServerId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-mcp', sourceId, targetId });
        return;
      }
      // Or one of our MCP gateways (a curated tool surface).
      if ((this.model.mcpGateways ?? []).some((g) => g.id === targetId)) {
        const already = (this.model.agentGatewayUses ?? []).some(
          (u) => u.agentId === sourceId && u.gatewayId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-gateway', sourceId, targetId });
        return;
      }
      // Or an API operation as a tool.
      const agentApiOpIds = new Set(
        (this.model.apis ?? []).flatMap((a) => a.operations.map((o) => o.id)),
      );
      if (agentApiOpIds.has(targetId)) {
        const already = (this.model.agentApiOpUses ?? []).some(
          (u) => u.agentId === sourceId && u.apiOperationId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-api-operation', sourceId, targetId });
        return;
      }
      // Or a WHOLE API — real or proxy — as a tool (every operation of it).
      if (
        (this.model.apis ?? []).some((a) => a.id === targetId) ||
        (this.model.proxyApis ?? []).some((px) => px.id === targetId)
      ) {
        const already = (this.model.agentApiUses ?? []).some(
          (u) => u.agentId === sourceId && u.apiId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-api', sourceId, targetId });
        return;
      }
      // Or a query service as a read tool.
      const agentQsIds = new Set(
        this.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
      );
      if (agentQsIds.has(targetId)) {
        const already = (this.model.agentQueryUses ?? []).some(
          (u) => u.agentId === sourceId && u.queryServiceId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-query', sourceId, targetId });
        return;
      }
      // Or another agent: delegation.
      if (agentIds.has(targetId) && targetId !== sourceId) {
        const already = (this.model.agentDelegations ?? []).some(
          (u) => u.agentId === sourceId && u.delegateAgentId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-delegate', sourceId, targetId });
        return;
      }
      // Knowledge: the agent grounds its answers on the RAG.
      if ((this.model.rags ?? []).some((r) => r.id === targetId)) {
        const already = (this.model.agentRags ?? []).some(
          (u) => u.agentId === sourceId && u.ragId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-rag', sourceId, targetId });
      }
      return;
    }
    // The MCP gateway aggregates/exposes whatever it is dragged onto.
    if ((this.model.mcpGateways ?? []).some((g) => g.id === sourceId)) {
      const gw = (this.model.mcpGateways ?? []).find((g) => g.id === sourceId)!;
      const exposable =
        this.model.externalSystems.some((x) => (x.mcpServers ?? []).some((s) => s.id === targetId)) ||
        (this.model.apis ?? []).some((a) => a.id === targetId) ||
        (this.model.apis ?? []).some((a) => a.operations.some((o) => o.id === targetId)) ||
        this.model.modules.some((m) => (m.useCases ?? []).some((u) => u.id === targetId)) ||
        (this.model.rags ?? []).some((r) => r.id === targetId);
      const already = [
        ...(gw.mcpServerIds ?? []),
        ...(gw.apiIds ?? []),
        ...(gw.apiOperationIds ?? []),
        ...(gw.useCaseIds ?? []),
        ...(gw.ragIds ?? []),
      ].includes(targetId);
      if (exposable && !already) {
        this.command({ kind: 'add-gateway-exposure', sourceId, targetId });
      }
      return;
    }
    if ((this.model.mcpGateways ?? []).some((g) => g.id === targetId)) return; // gateways only take agents/exposures
    // Dragging a RAG onto a read model declares its source: the RAG indexes it.
    const rag = (this.model.rags ?? []).find((r) => r.id === sourceId);
    if (rag) {
      const readModelIds = new Set(
        this.model.modules.flatMap((m) => (m.readModels ?? []).map((rm) => rm.id)),
      );
      if (readModelIds.has(targetId) && !(rag.sourceReadModelIds ?? []).includes(targetId)) {
        this.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      // Structured legacy content: a table owned by an external system.
      const extTableIds = new Set(
        this.model.externalSystems.flatMap((x) => (x.tables ?? []).map((t) => t.id)),
      );
      if (extTableIds.has(targetId) && !(rag.sourceExternalTableIds ?? []).includes(targetId)) {
        this.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      // Or an API — real or proxy — whose content it indexes by calling it.
      if (
        ((this.model.apis ?? []).some((a) => a.id === targetId) ||
          (this.model.proxyApis ?? []).some((px) => px.id === targetId)) &&
        !(rag.sourceApiIds ?? []).includes(targetId)
      ) {
        this.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      // Coarse sources: a whole external system, or a whole bounded context.
      if (
        this.model.externalSystems.some((x) => x.id === targetId) &&
        !(rag.sourceExternalSystemIds ?? []).includes(targetId)
      ) {
        this.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      if (
        this.model.modules.some((mo) => mo.id === targetId) &&
        !(rag.sourceModuleIds ?? []).includes(targetId)
      ) {
        this.command({ kind: 'add-rag-source', sourceId, targetId });
      }
      return;
    }
    if ((this.model.rags ?? []).some((r) => r.id === targetId)) return; // rag targets only make sense from agents
    // Dragging a WORKFLOW onto a use case adds a step orchestrating it; onto
    // ANOTHER workflow, chains them: A's completion event becomes B's trigger.
    if ((this.model.workflows ?? []).some((w) => w.id === sourceId)) {
      const wf = (this.model.workflows ?? []).find((w) => w.id === sourceId)!;
      const targetWf = (this.model.workflows ?? []).find(
        (w) => w.id === targetId && w.id !== sourceId,
      );
      if (targetWf) {
        const completion =
          wf.onCompletionEventName || `${wf.name.replace(/\s+/g, '')}Completado`;
        if (targetWf.triggerEvent !== completion) {
          this.command({ kind: 'set-workflow-trigger', id: targetId, triggerEvent: completion });
        }
        return;
      }
      const uc = this.model.modules
        .flatMap((mo) => mo.useCases ?? [])
        .find((u) => u.id === targetId);
      if (uc) {
        const already = (wf.steps ?? []).some((st) => st.targetUseCaseId === targetId);
        if (!already) {
          const base = `wfs-${slug(uc.name)}`;
          let stepId = base;
          for (let n = 2; (wf.steps ?? []).some((st) => st.id === stepId); n++) {
            stepId = `${base}-${n}`;
          }
          this.command({
            kind: 'add-workflow-step',
            workflowId: sourceId,
            id: stepId,
            name: uc.name,
            targetUseCaseId: targetId,
          });
        }
      }
      return;
    }
    // Dragging an EVENT onto a workflow points its trigger at that event.
    if ((this.model.workflows ?? []).some((w) => w.id === targetId)) {
      const domainEv = this.model.modules
        .flatMap((mo) => mo.domainEvents ?? [])
        .find((ev) => ev.id === sourceId);
      const appEv = this.model.modules
        .flatMap((mo) => mo.applicationEvents ?? [])
        .find((ev) => ev.id === sourceId);
      const ev = domainEv ?? appEv;
      if (ev) {
        // Best effort on the emitter: whoever the emission edges say publishes it.
        const emitter = (this.model.emissions ?? []).find((em) => em.domainEventId === sourceId);
        const aggregateIds2 = new Set((this.model.aggregates ?? []).map((a) => a.id));
        const dsIds2 = new Set(
          this.model.modules.flatMap((mo) => (mo.domainServices ?? []).map((d) => d.id)),
        );
        const ucIds2 = new Set(
          this.model.modules.flatMap((mo) => (mo.useCases ?? []).map((u) => u.id)),
        );
        this.command({
          kind: 'set-workflow-trigger',
          id: targetId,
          triggerEvent: ev.name,
          triggerAggregateId:
            emitter && aggregateIds2.has(emitter.sourceId) ? emitter.sourceId : undefined,
          triggerDomainServiceId:
            emitter && dsIds2.has(emitter.sourceId) ? emitter.sourceId : undefined,
          triggerUseCaseId:
            emitter && ucIds2.has(emitter.sourceId) ? emitter.sourceId : undefined,
        });
      }
      return;
    }
    // Dragging a proxy onto an API wires what it fronts; onto an external system, its host;
    // onto a bounded context, the API it fronts gets an implementation THERE too (the same
    // API — strangler style — and the proxy routes to it as well).
    if ((this.model.proxyApis ?? []).some((px) => px.id === sourceId)) {
      const px = (this.model.proxyApis ?? []).find((x) => x.id === sourceId)!;
      if ((this.model.apis ?? []).some((a) => a.id === targetId)) {
        if (px.targetApiId !== targetId) {
          this.command({ kind: 'set-proxy-target', id: sourceId, targetId });
        }
        return;
      }
      if (this.model.modules.some((m) => m.id === targetId)) {
        if (!px.targetApiId) return; // nothing to implement until the proxy fronts an API
        const already = (this.model.apiImplementations ?? []).some(
          (impl) => impl.apiId === px.targetApiId && impl.moduleId === targetId,
        );
        if (!already) {
          this.command({ kind: 'add-api-implementation', apiId: px.targetApiId, moduleId: targetId });
        }
        return;
      }
      if (this.model.externalSystems.some((x) => x.id === targetId)) {
        if (px.publishedByExternalSystemId !== targetId) {
          this.command({ kind: 'set-api-publisher', id: sourceId, targetId });
        }
      }
      return;
    }
    // Dragging an API onto an external system declares its publisher (it nests inside);
    // onto a bounded context, the sibling gesture of proxy → context: implemented there too.
    if ((this.model.apis ?? []).some((a) => a.id === sourceId)) {
      if (this.model.externalSystems.some((x) => x.id === targetId)) {
        const api = (this.model.apis ?? []).find((a) => a.id === sourceId)!;
        if (api.publishedByExternalSystemId !== targetId) {
          this.command({ kind: 'set-api-publisher', id: sourceId, targetId });
        }
        return;
      }
      if (this.model.modules.some((m) => m.id === targetId)) {
        const already = (this.model.apiImplementations ?? []).some(
          (impl) => impl.apiId === sourceId && impl.moduleId === targetId,
        );
        if (!already) {
          this.command({ kind: 'add-api-implementation', apiId: sourceId, moduleId: targetId });
        }
      }
      return;
    }
    // Agents as target: legal from an actor (talks to it) or from an event (triggers
    // it — reactive agents); the event branch lives further down, past the emission
    // sets it reuses. Anything else pointing at an agent is not a gesture.
    const actorIds = new Set((this.model.actors ?? []).map((a) => a.id));
    if (agentIds.has(targetId)) {
      const eventSourceIds = new Set([
        ...this.model.modules.flatMap((m) => (m.domainEvents ?? []).map((ev) => ev.id)),
        ...this.model.modules.flatMap((m) => (m.applicationEvents ?? []).map((ev) => ev.id)),
      ]);
      if (eventSourceIds.has(sourceId)) {
        const already = (this.model.agentTriggers ?? []).some(
          (t) => t.eventId === sourceId && t.agentId === targetId,
        );
        if (!already) this.command({ kind: 'add-agent-trigger', sourceId, targetId });
        return;
      }
      if (!actorIds.has(sourceId)) return;
    }
    if (actorIds.has(sourceId)) {
      const actorUcIds = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      const actorQsIds = new Set(
        this.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
      );
      if (actorUcIds.has(targetId) || actorQsIds.has(targetId)) {
        const already = (this.model.actorUses ?? []).some(
          (u) => u.actorId === sourceId && u.targetId === targetId,
        );
        if (!already) this.command({ kind: 'add-actor-use', sourceId, targetId });
        return;
      }
      if ((this.model.aggregates ?? []).some((a) => a.id === targetId)) {
        this.command({ kind: 'add-actor-crud', sourceId, targetId });
        return;
      }
      if (this.model.externalSystems.some((x) => x.id === targetId)) {
        const exists = (this.model.actorExternalDependencies ?? []).some(
          (d) => d.actorId === sourceId && d.externalSystemId === targetId,
        );
        if (!exists) this.command({ kind: 'add-actor-external', sourceId, targetId });
        return;
      }
      // The person talks to the agent (a chat/supervision UI derives from it).
      if ((this.model.aiAgents ?? []).some((a) => a.id === targetId)) {
        const exists = (this.model.actorAgentUses ?? []).some(
          (u) => u.actorId === sourceId && u.agentId === targetId,
        );
        if (!exists) this.command({ kind: 'add-actor-agent', sourceId, targetId });
        return;
      }
      return;
    }
    // Dragging an API operation onto its implementer wires the published contract to
    // the domain: a use case (or policy) is the fine wiring, a context the coarse one.
    const owningApi = this.owningApiOf(sourceId);
    if (owningApi) {
      const wireUcIds = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (wireUcIds.has(targetId)) {
        this.command({
          kind: 'set-api-operation-target',
          apiId: owningApi.id,
          id: sourceId,
          targetUseCaseId: targetId,
        });
        return;
      }
      if (this.model.modules.some((m) => m.id === targetId)) {
        this.command({
          kind: 'set-api-operation-target',
          apiId: owningApi.id,
          id: sourceId,
          moduleId: targetId,
        });
        return;
      }
      return;
    }
    // Dragging an external operation or a legacy table onto a read model (or another
    // context) declares a POLLING projection — the classic legacy integration.
    const externalOp = this.model.externalSystems
      .flatMap((x) => x.useCases ?? [])
      .find((u) => u.id === sourceId);
    const externalTable = this.model.externalSystems
      .flatMap((x) => x.tables ?? [])
      .find((t) => t.id === sourceId);
    if (externalOp || externalTable) {
      const sourceName = (externalOp ?? externalTable)!.name;
      const sourceKey = externalOp
        ? { externalUseCaseId: sourceId }
        : { externalTableId: sourceId };
      const alreadyFrom = (p: import('./model.js').ProjectionRef) =>
        externalOp ? p.sourceExternalUseCaseId === sourceId : p.sourceExternalTableId === sourceId;
      const targetReadModel = this.model.modules
        .flatMap((m) => m.readModels ?? [])
        .find((rm) => rm.id === targetId);
      if (targetReadModel) {
        const exists = (this.model.projections ?? []).some(
          (p) => alreadyFrom(p) && p.readModelId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(sourceName)}-${slug(targetReadModel.name)}`,
            name: `${targetReadModel.name}Projection`,
            ...sourceKey,
            targetId,
          });
        }
        return;
      }
      const targetModule = this.model.modules.find((m) => m.id === targetId);
      if (targetModule) {
        const exists = (this.model.projections ?? []).some(
          (p) => alreadyFrom(p) && p.moduleId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(sourceName)}-${slug(targetModule.name)}`,
            name: `${sourceName}ViewProjection`,
            ...sourceKey,
            moduleId: targetId,
            readModelName: `${sourceName}View`,
          });
        }
        return;
      }
      return;
    }
    // Dragging an aggregate onto a read model (or another context) declares a state
    // projection: the aggregate's state is materialized there. What that implies
    // (CDC, snapshots, replication…) is decided later — this only records the intent.
    const projAggregate = (this.model.aggregates ?? []).find((a) => a.id === sourceId);
    if (projAggregate) {
      const targetReadModel = this.model.modules
        .flatMap((m) => m.readModels ?? [])
        .find((rm) => rm.id === targetId);
      if (targetReadModel) {
        const exists = (this.model.projections ?? []).some(
          (p) => p.sourceAggregateId === sourceId && p.readModelId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(projAggregate.name)}-${slug(targetReadModel.name)}`,
            name: `${targetReadModel.name}Projection`,
            aggregateId: sourceId,
            targetId,
          });
        }
        return;
      }
      const targetModule = this.model.modules.find((m) => m.id === targetId);
      if (targetModule) {
        const exists = (this.model.projections ?? []).some(
          (p) => p.sourceAggregateId === sourceId && p.moduleId === targetId,
        );
        if (!exists) {
          this.command({
            kind: 'add-projection',
            id: `proj-${slug(projAggregate.name)}-${slug(targetModule.name)}`,
            name: `${projAggregate.name}ViewProjection`,
            aggregateId: sourceId,
            moduleId: targetId,
            readModelName: `${projAggregate.name}View`,
          });
        }
        return;
      }
      // any other target (e.g. a domain event) falls through to the gestures below
    }
    // Dragging from an aggregate/use case onto a domain event declares an emission.
    const eventIds = new Set(
      this.model.modules.flatMap((m) => (m.domainEvents ?? []).map((ev) => ev.id)),
    );
    // Only aggregates and domain services emit domain events; use cases emit
    // application events instead.
    const emitterIds = new Set([
      ...(this.model.aggregates ?? []).map((a) => a.id),
      ...this.model.modules.flatMap((m) => (m.domainServices ?? []).map((ds) => ds.id)),
    ]);
    const appEventIds = new Set(
      this.model.modules.flatMap((m) => (m.applicationEvents ?? []).map((ev) => ev.id)),
    );
    const ucIds = new Set(this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)));
    const qsIds = new Set(
      this.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
    );
    if (ucIds.has(sourceId) && qsIds.has(targetId)) {
      const already = (this.model.queryCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) this.command({ kind: 'add-query-call', sourceId, targetId });
      return;
    }
    const externalUcIds = new Set(
      this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((u) => u.id)),
    );
    if (ucIds.has(sourceId) && externalUcIds.has(targetId)) {
      const already = (this.model.externalUseCaseCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) this.command({ kind: 'add-external-uc-call', sourceId, targetId });
      return;
    }
    if (ucIds.has(sourceId) && ucIds.has(targetId) && sourceId !== targetId) {
      const already = (this.model.useCaseCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) this.command({ kind: 'add-use-case-call', sourceId, targetId });
      return;
    }
    // Use case → aggregate: the use case operates on it (a CallAggregateOperation
    // step; the aggregate's single operation wires itself, more stay for the form).
    if (ucIds.has(sourceId) && (this.model.aggregates ?? []).some((a) => a.id === targetId)) {
      const already = (this.model.aggregateCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) this.command({ kind: 'add-aggregate-call', sourceId, targetId });
      return;
    }
    if (
      (emitterIds.has(sourceId) && eventIds.has(targetId)) ||
      (ucIds.has(sourceId) && appEventIds.has(targetId))
    ) {
      const already = (this.model.emissions ?? []).some(
        (em) => em.sourceId === sourceId && em.domainEventId === targetId,
      );
      if (!already) this.command({ kind: 'add-emission', sourceId, targetId });
      return;
    }
    // Dragging an event onto another context (or one of its read models) draws a
    // materialization: a MATERIALIZES flow — the projection/read model/subscription
    // triple stays derived at generation time (flows are the source of truth).
    // (An event onto an AGENT — the reactive-agent gesture — resolved earlier,
    // in the agents-as-target guard.)
    if (eventIds.has(sourceId) || appEventIds.has(sourceId)) {
      const isApplicationEvent = appEventIds.has(sourceId);
      const event = this.model.modules
        .flatMap((m) => (isApplicationEvent ? m.applicationEvents : m.domainEvents) ?? [])
        .find((ev) => ev.id === sourceId);
      const targetUseCase = this.model.modules
        .flatMap((m) => (m.useCases ?? []).map((u) => ({ u, module: m })))
        .find(({ u }) => u.id === targetId);
      const targetReadModel = this.model.modules
        .flatMap((m) => (m.readModels ?? []).map((rm) => ({ rm, module: m })))
        .find(({ rm }) => rm.id === targetId);
      const targetModule =
        this.model.modules.find((m) => m.id === targetId) ??
        targetReadModel?.module ??
        targetUseCase?.module;
      if (!event || !targetModule) return;
      const aggregateIds = new Set((this.model.aggregates ?? []).map((a) => a.id));
      const domainServiceIds = new Set(
        this.model.modules.flatMap((m) => (m.domainServices ?? []).map((ds) => ds.id)),
      );
      const emitter = (this.model.emissions ?? []).find(
        (em) =>
          em.domainEventId === sourceId &&
          (isApplicationEvent
            ? ucIds.has(em.sourceId)
            : aggregateIds.has(em.sourceId) || domainServiceIds.has(em.sourceId)),
      );
      if (!emitter) {
        this.emit('modux-notice', {
          message: isApplicationEvent
            ? `Declara primero qué caso de uso publica ${event.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador`
            : `Declara primero quién emite ${event.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: 'info',
        });
        return;
      }
      const emitterIsAggregate = !isApplicationEvent && aggregateIds.has(emitter.sourceId);
      if (targetUseCase) {
        // Event onto a use case: the TRIGGERS archetype (subscription + CallUseCase derive later).
        const exists = this.model.flows.some(
          (f) =>
            f.archetype === 'TRIGGERS' &&
            f.triggerEvent === event.name &&
            f.targetUseCaseId === targetUseCase.u.id,
        );
        if (exists) return;
        this.command({
          kind: 'add-flow',
          id: `flow-${slug(event.name)}-${slug(targetUseCase.u.name)}`,
          name: targetUseCase.u.name,
          archetype: 'TRIGGERS',
          triggerAggregateId: emitterIsAggregate ? emitter.sourceId : '',
          triggerDomainServiceId:
            !isApplicationEvent && !emitterIsAggregate ? emitter.sourceId : undefined,
          triggerUseCaseId: isApplicationEvent ? emitter.sourceId : undefined,
          triggerEvent: event.name,
          targetId: targetModule.id,
          targetUseCaseId: targetUseCase.u.id,
        });
        return;
      }
      const readModelName = targetReadModel?.rm.name ?? `${event.name}View`;
      const exists = this.model.flows.some(
        (f) =>
          f.archetype === 'MATERIALIZES' &&
          f.triggerEvent === event.name &&
          f.targetId === targetModule.id &&
          f.readModelName === readModelName,
      );
      if (exists) return;
      this.command({
        kind: 'add-flow',
        id: `flow-${slug(event.name)}-${slug(readModelName)}`,
        name: readModelName,
        archetype: 'MATERIALIZES',
        triggerAggregateId: emitterIsAggregate ? emitter.sourceId : '',
        triggerDomainServiceId:
          !isApplicationEvent && !emitterIsAggregate ? emitter.sourceId : undefined,
        triggerUseCaseId: isApplicationEvent ? emitter.sourceId : undefined,
        triggerEvent: event.name,
        targetId: targetModule.id,
        readModelName,
      });
      return;
    }
    // Any other pair touching a nested child is not a strategic relation.
    const childIds = new Set([
      ...emitterIds,
      ...ucIds,
      ...qsIds,
      ...this.model.modules.flatMap((m) => (m.readModels ?? []).map((rm) => rm.id)),
    ]);
    if (
      childIds.has(sourceId) ||
      childIds.has(targetId) ||
      eventIds.has(targetId) ||
      appEventIds.has(targetId)
    ) {
      return;
    }
    const relationExternalIds = new Set(this.model.externalSystems.map((s) => s.id));
    if (relationExternalIds.has(sourceId)) {
      const extUcIds0 = new Set(
        this.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (extUcIds0.has(targetId)) {
        const already = (this.model.externalCalls ?? []).some(
          (c) => c.externalSystemId === sourceId && c.useCaseId === targetId,
        );
        if (!already) this.command({ kind: 'add-external-call', sourceId, targetId });
        return;
      }
      if (relationExternalIds.has(targetId) && targetId !== sourceId) {
        // Between systems the relation has flavours — ask (drawing again retypes).
        this._extDepPicker = { sourceId, targetId, x: x ?? 0, y: y ?? 0 };
        return;
      }
      // A specific API operation: the real chip (nested in the published API) or an
      // occurrence at a proxy / bounded-context implementation.
      const realOpApi = (this.model.apis ?? []).find((a) =>
        a.operations.some((o) => o.id === targetId),
      );
      const occTarget = /^apiop:(.+)@(.+)$/.exec(targetId);
      const opUse = realOpApi
        ? { operationId: targetId, siteId: realOpApi.id }
        : occTarget
          ? { operationId: occTarget[1], siteId: occTarget[2] }
          : null;
      if (opUse) {
        const already = (this.model.externalOperationUses ?? []).some(
          (u) =>
            u.externalSystemId === sourceId &&
            u.operationId === opUse.operationId &&
            u.siteId === opUse.siteId,
        );
        if (!already) {
          this.command({
            kind: 'add-external-operation-use',
            sourceId,
            operationId: opUse.operationId,
            targetSiteId: opUse.siteId,
          });
        }
        return;
      }
      if (
        (this.model.apis ?? []).some((a) => a.id === targetId) ||
        (this.model.proxyApis ?? []).some((px) => px.id === targetId)
      ) {
        const exists = (this.model.externalSystemDependencies ?? []).some(
          (d) => d.sourceId === sourceId && d.targetId === targetId,
        );
        if (!exists) this.command({ kind: 'add-external-dependency', sourceId, targetId });
        return;
      }
      return;
    }
    if (relationExternalIds.has(targetId)) return;
    if (actorIds.has(targetId)) return;
    // Strategic relations are 100% derived from the concrete dependencies —
    // there is nothing left to hand-draw between two contexts.
    void x;
    void y;
  }

  /** Apply the picker's choice: create the new relation or retype the existing one. */
  private pickRelationType(type: ContextMapRelationType): void {
    const p = this._relationPicker;
    this._relationPicker = null;
    if (!p) return;
    this._relationType = type; // remember as the next default
    if (p.mode === 'create') {
      this.command({ kind: 'add-relation', sourceId: p.sourceId, targetId: p.targetId, type });
      return;
    }
    const rel = this.model.relations.find(
      (r) => r.sourceId === p.sourceId && r.targetId === p.targetId,
    );
    if (rel && rel.type !== type) {
      this.command({ kind: 'set-relation-type', sourceId: p.sourceId, targetId: p.targetId, type });
    }
  }

  /** Supr with a multi-selection: every selected node goes through the per-kind logic. */
  private onDeleteSelectionRequested(e: CustomEvent): void {
    const { items } = e.detail as { items: { id: string; kind: string }[] };
    for (const item of items) {
      this.onDeleteRequested(
        new CustomEvent('delete-requested', {
          detail: { elementType: 'node', id: item.id, kind: item.kind },
        }),
      );
    }
    this._multi = [];
  }

  private onDeleteRequested(e: CustomEvent): void {
    const { elementType, id, kind } = e.detail;
    // With a modux View active, deleting a member node is ambiguous: drop the element
    // from the MODEL, or only take it out of this view? Ask before touching anything.
    if (this._activeViewId && elementType === 'node') {
      const memberId = this.memberIdOf(id, kind);
      const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
      if (memberId && view?.memberIds.includes(memberId)) {
        this._deletePicker = { elementType, id, kind, memberId };
        return;
      }
    }
    this.performDelete(elementType, id, kind);
  }

  /** Canvas node → the catalog id a view lists as member (null when not a member kind). */
  private memberIdOf(id: string, kind: string): string | null {
    switch (kind) {
      case 'module':
      case 'external-system':
        return id.replace(/^tgt:/, '');
      case 'aggregate':
      case 'entity':
      case 'process':
      case 'workflow':
        return id;
      case 'flow':
        return id.replace(/^flow:/, '');
      case 'process-step':
        return this.owningProcessOf(id)?.id ?? null;
      case 'workflow-step':
        return this.owningWorkflowOf(id)?.id ?? null;
      default:
        return null;
    }
  }

  private performDelete(elementType: string, id: string, kind: string): void {
    if (this._view === 'workflows' && elementType === 'edge' && kind === 'workflow-dependency') {
      const match = /^wfdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      const owner = this.owningWorkflowOf(match[2]);
      if (!owner) return;
      this._selectedId = null;
      this.command({
        kind: 'remove-workflow-dependency',
        workflowId: owner.id,
        id: match[2],
        dependsOnStepId: match[1],
      });
      return;
    }
    if (elementType === 'node' && kind === 'workflow') {
      this._selectedId = null;
      this.command({ kind: 'remove-workflow', id });
      return;
    }
    if (elementType === 'node' && kind === 'workflow-step') {
      const owner = this.owningWorkflowOf(id);
      if (!owner) return;
      this._selectedId = null;
      this.command({ kind: 'remove-workflow-step', workflowId: owner.id, id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'api-impl-wire') {
      // Edge ids are `apiimplwire:<operationId>@<moduleId>` (see context-map.ts).
      const match = /^apiimplwire:(.+)@(.+)$/.exec(id);
      if (!match) return;
      const [, operationId, moduleId] = match;
      const apiId = (this.model.apis ?? []).find((a) =>
        a.operations.some((o) => o.id === operationId),
      )?.id;
      if (!apiId) return;
      this._selectedId = null;
      this.command({ kind: 'remove-api-operation-implementation', apiId, operationId, moduleId });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'ext-op-use') {
      // Edge ids are `extopuse:<systemId>-><operationId>@<siteId>` (see context-map.ts).
      const match = /^extopuse:(.+)->(.+)@(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({
        kind: 'remove-external-operation-use',
        sourceId: match[1],
        operationId: match[2],
        targetSiteId: match[3],
      });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'op-route') {
      // Edge ids are `oproute:apiop:<opId>@<proxyId>-><targetNodeId>` (see context-map.ts).
      const match = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(id);
      if (!match) return;
      const [, operationId, proxyId, targetNodeId] = match;
      const implTarget = /^apiimpl:.+@(.+)$/.exec(targetNodeId);
      const targetSiteId = implTarget ? implTarget[1] : targetNodeId;
      this._selectedId = null;
      this.command({ kind: 'remove-proxy-operation-route', proxyId, operationId, targetSiteId });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'relation') {
      // Edge ids for relations are `rel:<sourceId>-><targetId>` (see relationEdgeId).
      const match = /^rel:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-relation', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'emission') {
      const match = /^emit:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-emission', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'projection') {
      const match = /^proj:(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-projection', id: match[1] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'uc-call') {
      const match = /^uccall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-use-case-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agg-call') {
      const match = /^aggcall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-aggregate-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'qs-call') {
      const match = /^qscall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-query-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'external-call') {
      const match = /^extcall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-external-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'ext-uc-call') {
      const match = /^extuccall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-external-uc-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-use') {
      const match = /^mcp:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-external-use') {
      const match = /^mcpx:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-external-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-mcp') {
      const match = /^mcpsv:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-mcp', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'gateway-exposure') {
      const match = /^gwx:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-gateway-exposure', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-gateway') {
      const match = /^aggw:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-gateway', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-api-op') {
      const match = /^agapi:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-api-operation', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-query') {
      const match = /^agqs:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-query', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-delegate') {
      const match = /^agag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-delegate', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'actor-agent') {
      const match = /^useag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-actor-agent', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-trigger') {
      const match = /^evag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-trigger', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'mcp-gateway') {
      this._selectedId = null;
      this.command({ kind: 'remove-mcp-gateway', id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-rag') {
      const match = /^agrag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-rag', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'rag-source') {
      const match = /^ragsrc:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-rag-source', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (
      this._view === 'context-map' &&
      elementType === 'edge' &&
      (kind === 'rag-table' || kind === 'rag-api' || kind === 'rag-coarse')
    ) {
      // ragtbl/ragapi/ragcoarse run source→rag; the command speaks rag→source.
      const match = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-rag-source', sourceId: match[2], targetId: match[1] });
      return;
    }
    if (elementType === 'node' && kind === 'rag') {
      this._selectedId = null;
      this.command({ kind: 'remove-rag', id });
      return;
    }
    if (elementType === 'node' && kind === 'rag-content-source') {
      const match = /^ragcs:(.+?):(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-rag-content-source', sourceId: match[1], uri: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'external-table') {
      this._selectedId = null;
      this.command({ kind: 'remove-external-table', id });
      return;
    }
    if (elementType === 'node' && kind === 'mcp-server') {
      this._selectedId = null;
      this.command({ kind: 'remove-mcp-server', id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'api-wire') {
      const match = /^apiwire:(.+)$/.exec(id);
      const owner = match ? this.owningApiOf(match[1]) : null;
      if (!match || !owner) return;
      this._selectedId = null;
      // Unwire: clearing both targets leaves the operation published but unimplemented.
      this.command({ kind: 'set-api-operation-target', apiId: owner.id, id: match[1] });
      return;
    }
    if (elementType === 'node' && kind === 'api') {
      this._selectedId = null;
      this.command({ kind: 'remove-api', id });
      return;
    }
    // An API-implementation occurrence: deleting it removes the implementation SITE,
    // never the API itself (which lives on, published where it was).
    if (elementType === 'node' && kind === 'api-impl') {
      const match = /^apiimpl:(.+)@(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-api-implementation', apiId: match[1], moduleId: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'proxy-api') {
      this._selectedId = null;
      this.command({ kind: 'remove-proxy-api', id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'node' && kind === 'workflow') {
      this._selectedId = null;
      this.command({ kind: 'remove-workflow', id });
      return;
    }
    if (elementType === 'node' && kind === 'api-operation') {
      const owner = this.owningApiOf(id);
      if (!owner) return;
      this._selectedId = null;
      this.command({ kind: 'remove-api-operation', apiId: owner.id, id });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'actor-use') {
      const match = /^use:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-actor-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'actor-ext') {
      const match = /^extdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-actor-external', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'ext-dep') {
      const match = /^xdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-external-dependency', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'wf-chain') {
      const match = /^wfchain:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'set-workflow-trigger', id: match[2], triggerEvent: '' });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'agent-api') {
      const match = /^agapi:(.+)->(.+)$/.exec(id);
      if (!match) return;
      this._selectedId = null;
      this.command({ kind: 'remove-agent-api', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (this._view === 'context-map' && elementType === 'edge' && kind === 'proxy-target') {
      const match = /^pxt:(.+)->(.+)$/.exec(id);
      if (!match) return;
      // Only the real wiring is deletable — a rolled-up summary edge (host → host) is not.
      if (!(this.model.proxyApis ?? []).some((px) => px.id === match[1])) return;
      this._selectedId = null;
      this.command({ kind: 'set-proxy-target', id: match[1], targetId: '' });
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
    if (elementType === 'node' && kind === 'domain-event') {
      this._selectedId = null;
      this.command({ kind: 'remove-domain-event', id });
      return;
    }
    if (elementType === 'node' && kind === 'read-model') {
      this._selectedId = null;
      this.command({ kind: 'remove-read-model', id });
      return;
    }
    if (elementType === 'node' && kind === 'domain-service') {
      this._selectedId = null;
      this.command({ kind: 'remove-domain-service', id });
      return;
    }
    if (elementType === 'node' && kind === 'query-service') {
      this._selectedId = null;
      this.command({ kind: 'remove-query-service', id });
      return;
    }
    if (elementType === 'node' && kind === 'use-case') {
      this._selectedId = null;
      this.command({ kind: 'remove-use-case', id });
      return;
    }
    if (elementType === 'node' && kind === 'external-use-case') {
      this._selectedId = null;
      this.command({ kind: 'remove-external-use-case', id });
      return;
    }
    if (elementType === 'node' && kind === 'application-event') {
      this._selectedId = null;
      this.command({ kind: 'remove-application-event', id });
      return;
    }
    if (elementType === 'node' && kind === 'external-system') {
      this._selectedId = null;
      this.command({ kind: 'remove-external-system', id });
      return;
    }
    if (elementType === 'node' && kind === 'actor') {
      this._selectedId = null;
      this.command({ kind: 'remove-actor', id });
      return;
    }
    if (elementType === 'node' && kind === 'ai-agent') {
      this._selectedId = null;
      this.command({ kind: 'remove-ai-agent', id });
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
      return;
    }
    if (elementType === 'node' && kind === 'process-step') {
      const owner = this.owningProcessOf(id);
      if (!owner) return;
      this._selectedId = null;
      this.command({ kind: 'remove-process-step', processId: owner.id, id });
    }
  }

  private owningProcessOf(stepId: string) {
    return (this.model.processes ?? []).find((p) => p.steps.some((s) => s.id === stepId));
  }

  private owningWorkflowOf(stepId: string) {
    return (this.model.workflows ?? []).find((w) => w.steps.some((s) => s.id === stepId));
  }

  private owningApiOf(operationId: string) {
    return (this.model.apis ?? []).find((a) => a.operations.some((o) => o.id === operationId));
  }

  private onNodeRenamed(e: CustomEvent): void {
    const { id, kind, name } = e.detail;
    if (
      kind === 'module' ||
      kind === 'aggregate' ||
      kind === 'entity' ||
      kind === 'process-step' ||
      kind === 'workflow' ||
      kind === 'workflow-step' ||
      kind === 'domain-event' ||
      kind === 'read-model' ||
      kind === 'domain-service' ||
      kind === 'query-service' ||
      kind === 'use-case' ||
      kind === 'external-use-case' ||
      kind === 'external-table' ||
      kind === 'mcp-server' ||
      kind === 'mcp-gateway' ||
      kind === 'application-event' ||
      kind === 'external-system' ||
      kind === 'actor' ||
      kind === 'ai-agent' ||
      kind === 'rag' ||
      kind === 'api' ||
      kind === 'proxy-api' ||
      kind === 'api-operation'
    ) {
      this.command({ kind: 'rename-element', type: kind, id: id.replace(/^tgt:/, ''), name });
    }
  }

  private addStepFromToolbar(): void {
    const name = this._newStepName.trim();
    if (!name || !this._selectedId) return;
    const selectedProcess = (this.model.processes ?? []).find((p) => p.id === this._selectedId);
    const owner = selectedProcess ?? this.owningProcessOf(this._selectedId);
    if (!owner) return;
    const afterStepId = selectedProcess
      ? undefined // process selected → append at the end
      : this._selectedId;
    this.command({
      kind: 'add-process-step',
      processId: owner.id,
      id: `step-${slug(name)}`,
      name,
      stepType: this._newStepType,
      roleId: this._newStepType === 'HUMAN' ? this._newStepRole.trim() || undefined : undefined,
      deadline: this._newStepType === 'HUMAN' ? this._newStepDeadline.trim() || undefined : undefined,
      afterStepId,
    });
    this._newStepName = '';
    this._newStepDeadline = '';
  }

  private addWorkflowStepFromToolbar(): void {
    const name = this._newStepName.trim();
    if (!name || !this._selectedId) return;
    const selectedWorkflow = (this.model.workflows ?? []).find((w) => w.id === this._selectedId);
    const owner = selectedWorkflow ?? this.owningWorkflowOf(this._selectedId);
    if (!owner) return;
    this.command({
      kind: 'add-workflow-step',
      workflowId: owner.id,
      id: `wfstep-${slug(name)}`,
      name,
      emittedEventName: this._newStepEmits.trim() || undefined,
      targetUseCaseId: this._newStepUseCase || undefined,
      // Dragging a step onto another declares dependencies later; a selected
      // step is the natural predecessor of the new one.
      dependsOnStepIds: selectedWorkflow ? undefined : [this._selectedId],
      afterStepId: selectedWorkflow ? undefined : this._selectedId,
    });
    this._newStepName = '';
    this._newStepEmits = '';
  }

  private applyWorkflowStepEdit(): void {
    const stepId = this._selectedId;
    const owner = stepId ? this.owningWorkflowOf(stepId) : undefined;
    if (!stepId || !owner) return;
    this.command({
      kind: 'update-workflow-step',
      workflowId: owner.id,
      id: stepId,
      emittedEventName: this._editStepEmits.trim() || undefined,
      targetUseCaseId: this._editStepUseCase || undefined,
      completionEventName: this._editStepAwaits.trim() || undefined,
    });
  }

  private addRagContentSourceFromToolbar(): void {
    const uri = this._newRagSourceUri.trim();
    const ragId = this._selectedId;
    if (!uri || !ragId || !(this.model.rags ?? []).some((r) => r.id === ragId)) return;
    this.command({
      kind: 'add-rag-content-source',
      sourceId: ragId,
      type: this._newRagSourceType,
      uri,
    });
    this._newRagSourceUri = '';
  }

  /** Candidates for the add-to-view search: catalog elements not yet in the view. */
  private viewMemberCandidates(): { id: string; name: string; kind: string }[] {
    const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
    if (!view) return [];
    const members = new Set(view.memberIds);
    return [
      ...this.model.modules.map((m) => ({ id: m.id, name: m.name, kind: 'contexto' })),
      ...this.model.externalSystems.map((x) => ({ id: x.id, name: x.name, kind: 'externo' })),
      ...(this.model.aggregates ?? []).map((a) => ({ id: a.id, name: a.name, kind: 'agregado' })),
      ...this.model.flows.map((f) => ({ id: f.id, name: f.name, kind: 'flow' })),
      ...(this.model.processes ?? []).map((p) => ({ id: p.id, name: p.name, kind: 'proceso' })),
      ...(this.model.workflows ?? []).map((w) => ({ id: w.id, name: w.name, kind: 'workflow' })),
      ...(this.model.actors ?? []).map((a) => ({ id: a.id, name: a.name, kind: 'actor' })),
      ...(this.model.aiAgents ?? []).map((a) => ({ id: a.id, name: a.name, kind: 'agente' })),
      ...(this.model.mcpGateways ?? []).map((g) => ({ id: g.id, name: g.name, kind: 'gateway' })),
      ...(this.model.rags ?? []).map((r) => ({ id: r.id, name: r.name, kind: 'rag' })),
      ...(this.model.apis ?? []).map((a) => ({ id: a.id, name: a.name, kind: 'api' })),
    ].filter((c) => !members.has(c.id));
  }

  private addMemberFromToolbar(): void {
    const key = this._addMemberKey.trim();
    if (!key || !this._activeViewId) return;
    const candidate = this.viewMemberCandidates().find(
      (c) => `${c.name} (${c.id})` === key || c.id === key || c.name === key,
    );
    if (!candidate) return;
    this.command({ kind: 'add-view-member', id: this._activeViewId, targetId: candidate.id });
    this._addMemberKey = '';
  }

  /** Check/uncheck in the catalog tree: view membership only — never touches the element. */
  private toggleViewMember(targetId: string, checked: boolean): void {
    if (!this._activeViewId) return;
    this.command(
      checked
        ? { kind: 'add-view-member', id: this._activeViewId, targetId }
        : { kind: 'remove-view-member', id: this._activeViewId, targetId },
    );
  }

  /**
   * The catalog as a tree with membership checkboxes: what belongs to the active
   * view. Aggregates nest under their context; one greyed "(por su contexto)" row
   * means the element rides in implicitly because its container is a member.
   */
  private renderViewTree() {
    const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
    if (!view) return '';
    const members = new Set(view.memberIds);
    const row = (id: string, name: string, opts: { child?: boolean; implicit?: boolean } = {}) => html`
      <label
        class="${opts.child ? 'child' : ''} ${opts.implicit && !members.has(id) ? 'implicit' : ''}"
        title=${opts.implicit && !members.has(id)
          ? 'Ya se ve por su contenedor; márcalo para que sea miembro explícito'
          : 'Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto'}
      >
        <input
          type="checkbox"
          .checked=${members.has(id)}
          @change=${(e: Event) => this.toggleViewMember(id, (e.target as HTMLInputElement).checked)}
        />
        ${name}
      </label>
    `;
    const group = (title: string, rows: unknown[]) =>
      rows.length ? html`<h4>${title}</h4>${rows}` : '';
    return html`
      <aside class="view-tree" @pointerdown=${(e: Event) => e.stopPropagation()}>
        <div class="tree-title">Vista: ${view.name}</div>
        ${group(
          'Contextos',
          this.model.modules.flatMap((m) => [
            row(m.id, m.name),
            ...(this.model.aggregates ?? [])
              .filter((a) => a.moduleId === m.id)
              .map((a) => row(a.id, a.name, { child: true, implicit: members.has(m.id) })),
          ]),
        )}
        ${group(
          'Sistemas externos',
          this.model.externalSystems.map((x) => row(x.id, x.name)),
        )}
        ${group('APIs', (this.model.apis ?? []).map((a) => row(a.id, a.name)))}
        ${group('Actores', (this.model.actors ?? []).map((a) => row(a.id, a.name)))}
        ${group('Agentes IA', (this.model.aiAgents ?? []).map((a) => row(a.id, a.name)))}
        ${group('Gateways MCP', (this.model.mcpGateways ?? []).map((g) => row(g.id, g.name)))}
        ${group('RAGs', (this.model.rags ?? []).map((r) => row(r.id, r.name)))}
        ${group('Flows', this.model.flows.map((f) => row(f.id, f.name)))}
        ${group('Procesos', (this.model.processes ?? []).map((p) => row(p.id, p.name)))}
        ${group('Workflows', (this.model.workflows ?? []).map((w) => row(w.id, w.name)))}
      </aside>
    `;
  }

  private onElementSelected(e: CustomEvent): void {
    this._selectedId = e.detail.id;
    this._multi = [];
    if (e.detail.kind === 'process-step') {
      const step = this.owningProcessOf(e.detail.id)?.steps.find((s) => s.id === e.detail.id);
      this._editStepRole = step?.roleId ?? '';
      this._editStepDeadline = step?.deadline ?? '';
      this._editStepComp = step?.compensationUseCaseId ?? '';
    }
    if (e.detail.kind === 'workflow-step') {
      const step = this.owningWorkflowOf(e.detail.id)?.steps.find((s) => s.id === e.detail.id);
      this._editStepUseCase = step?.targetUseCaseId ?? '';
      this._editStepEmits = step?.emittedEventName ?? '';
      this._editStepAwaits = step?.completionEventName ?? '';
    }
    this.emit('modux-select', { elementType: e.detail.kind, id: e.detail.id });
  }

  private onMultiToggled(e: CustomEvent): void {
    const { id } = e.detail;
    // The multi-selection REPLACES the single one: otherwise Supr would act on a
    // stale element (e.g. the container selected before shift-clicking children).
    this._selectedId = null;
    this._multi = this._multi.includes(id)
      ? this._multi.filter((x) => x !== id)
      : [...this._multi, id];
  }

  private onNodesBoxed(e: CustomEvent): void {
    this._multi = e.detail.ids;
  }

  /** Canvas node ids → catalog element ids (view members). */
  private memberIdsFromSelection(): string[] {
    const scene = this.sceneFor(this._view);
    const members = new Set<string>();
    for (const id of this._multi) {
      const node = scene.nodes.find((n) => n.id === id);
      if (!node) continue;
      switch (node.kind) {
        case 'module':
        case 'external-system':
          members.add(id.replace(/^tgt:/, ''));
          break;
        case 'aggregate':
        case 'entity':
        case 'process':
        case 'workflow':
        case 'actor':
        case 'ai-agent':
        case 'rag':
        case 'mcp-gateway':
        case 'api':
          members.add(id);
          break;
        case 'flow':
          members.add(id.replace(/^flow:/, ''));
          break;
        case 'process-step': {
          const owner = this.owningProcessOf(id);
          if (owner) members.add(owner.id);
          break;
        }
        case 'workflow-step': {
          const owner = this.owningWorkflowOf(id);
          if (owner) members.add(owner.id);
          break;
        }
        default:
          break; // compensations / completion events are derived, not catalog elements
      }
    }
    return [...members];
  }

  private createViewFromSelection(): void {
    const name = this._newViewName.trim();
    const memberIds = this.memberIdsFromSelection();
    if (!name || !memberIds.length) return;
    this.command({ kind: 'add-view', id: `view-${slug(name)}`, name, memberIds });
    this._newViewName = '';
    this._multi = [];
  }

  /** Model scoped to the active modux View (CURATED members + their context). */
  private filteredModel(): ModuxModel {
    if (!this._activeViewId) return this.model;
    const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
    if (!view) return this.model;
    const members = new Set(view.memberIds);
    const modules = this.model.modules.filter((m) => members.has(m.id));
    const moduleIds = new Set(modules.map((m) => m.id));
    const externalSystems = this.model.externalSystems.filter((x) => members.has(x.id));
    const externalIds = new Set(externalSystems.map((x) => x.id));
    const aggregates = (this.model.aggregates ?? []).filter(
      (a) => members.has(a.id) || moduleIds.has(a.moduleId),
    );
    const aggregateIds = new Set(aggregates.map((a) => a.id));
    return {
      ...this.model,
      modules,
      externalSystems,
      relations: this.model.relations.filter(
        (r) => moduleIds.has(r.sourceId) && moduleIds.has(r.targetId),
      ),
      flows: this.model.flows.filter(
        (f) =>
          members.has(f.id) ||
          ((moduleIds.has(f.sourceId) || externalIds.has(f.sourceId)) &&
            (moduleIds.has(f.targetId) || externalIds.has(f.targetId))),
      ),
      aggregates,
      entities: (this.model.entities ?? []).filter((e) => aggregateIds.has(e.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (r) => aggregateIds.has(r.sourceAggregateId) && aggregateIds.has(r.targetAggregateId),
      ),
      processes: (this.model.processes ?? []).filter(
        (p) => members.has(p.id) || (p.ownerModuleId ? moduleIds.has(p.ownerModuleId) : false),
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((w) => members.has(w.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((a) => members.has(a.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((a) => members.has(a.id)),
      rags: (this.model.rags ?? []).filter((r) => members.has(r.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((g) => members.has(g.id)),
      apis: (this.model.apis ?? []).filter(
        (a) =>
          members.has(a.id) ||
          (a.publishedByExternalSystemId ? externalIds.has(a.publishedByExternalSystemId) : false),
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (px) =>
          members.has(px.id) ||
          (px.publishedByExternalSystemId ? externalIds.has(px.publishedByExternalSystemId) : false),
      ),
    };
  }

  private applyStepEdit(): void {
    const stepId = this._selectedId;
    const owner = stepId ? this.owningProcessOf(stepId) : undefined;
    if (!stepId || !owner) return;
    this.command({
      kind: 'update-process-step',
      processId: owner.id,
      id: stepId,
      roleId: this._editStepRole.trim() || undefined,
      deadline: this._editStepDeadline.trim() || undefined,
      compensationUseCaseId: this._editStepComp.trim() || undefined,
    });
  }

  private onElementActivated(e: CustomEvent): void {
    // Double-clicking a relation's label edits its type rather than opening a CRUD.
    if (this._view === 'context-map' && e.detail.elementType === 'edge' && e.detail.kind === 'relation') {
      const m = /^rel:(.+)->(.+)$/.exec(e.detail.id);
      if (m) {
        this._relationPicker = {
          sourceId: m[1],
          targetId: m[2],
          mode: 'edit',
          x: e.detail.x ?? 0,
          y: e.detail.y ?? 0,
        };
      }
      return;
    }
    const mapped =
      e.detail.kind === 'process-step'
        ? activationForStep(this.model.processes, e.detail.id)
        : e.detail.kind === 'workflow-step'
          ? (() => {
              const owner = this.owningWorkflowOf(e.detail.id);
              return owner ? { elementType: 'workflow', id: owner.id } : null;
            })()
          : normalizeActivation(e.detail.id, e.detail.kind);
    if (mapped) this.emit('modux-activate', mapped);
  }

  // ── palette (drag to create / drag to place) ────────────────────────────

  /** Palette entries carry the SAME glyph and stroke colour their node wears on the canvas. */
  private static readonly PALETTE_NEW: {
    type: string;
    label: string;
    child?: boolean;
    symbol: string;
    color: string;
  }[] = [
    { type: 'module', label: 'Contexto', symbol: 'component', color: '#94a3b8' },
    { type: 'actor', label: 'Actor', symbol: 'person', color: '#64748b' },
    { type: 'external-system', label: 'Sistema externo', symbol: 'component', color: '#64748b' },
    { type: 'ai-agent', label: 'Agente IA', symbol: 'robot', color: '#9333ea' },
    { type: 'external-ai-agent', label: 'Agente IA externo', symbol: 'robot', color: '#9333ea' },
    { type: 'mcp-gateway', label: 'Gateway MCP', symbol: 'plug', color: '#7c3aed' },
    { type: 'rag', label: 'RAG', symbol: 'lens', color: '#0e7490' },
    { type: 'api', label: 'API', child: true, symbol: 'interface', color: '#4f46e5' },
    { type: 'proxy-api', label: 'Proxy API', symbol: 'interface', color: '#0e7490' },
    { type: 'workflow', label: 'Workflow', symbol: 'process', color: '#6d28d9' },
    { type: 'workflow-step', label: 'Paso de workflow', child: true, symbol: 'gear', color: '#6d28d9' },
    { type: 'aggregate', label: 'Agregado', child: true, symbol: 'aggregate', color: '#8b5cf6' },
    { type: 'use-case', label: 'Caso de uso', child: true, symbol: 'usecase', color: '#06b6d4' },
    { type: 'use-case-step', label: 'Paso de caso de uso', child: true, symbol: 'gear', color: '#06b6d4' },
    { type: 'policy', label: 'Policy', child: true, symbol: 'usecase', color: '#a855f7' },
    { type: 'domain-event', label: 'Evento de dominio', child: true, symbol: 'event', color: '#f59e0b' },
    { type: 'application-event', label: 'Evento de aplicación', child: true, symbol: 'event', color: '#eab308' },
    { type: 'read-model', label: 'Read model', child: true, symbol: 'readmodel', color: '#10b981' },
    { type: 'domain-service', label: 'Servicio de dominio', child: true, symbol: 'gear', color: '#f43f5e' },
    { type: 'query-service', label: 'Query service', child: true, symbol: 'lens', color: '#0284c7' },
    { type: 'api-operation', label: 'Operación de API', child: true, symbol: 'usecase', color: '#4f46e5' },
    { type: 'external-use-case', label: 'Operación externa', child: true, symbol: 'usecase', color: '#64748b' },
    { type: 'external-table', label: 'Tabla externa', child: true, symbol: 'readmodel', color: '#a16207' },
    { type: 'mcp-server', label: 'Servidor MCP', child: true, symbol: 'robot', color: '#9333ea' },
  ];

  /** Every element of the model, grouped for the palette's «Catálogo» tab. */
  private paletteCatalog(): {
    label: string;
    symbol: string;
    color: string;
    items: { id: string; name: string }[];
  }[] {
    const m = this.model;
    const groups: {
      label: string;
      symbol: string;
      color: string;
      items: { id: string; name: string }[];
    }[] = [
      {
        label: 'Contextos',
        symbol: 'component',
        color: '#94a3b8',
        items: m.modules.map((x) => ({ id: x.id, name: x.name })),
      },
      {
        label: 'Casos de uso',
        symbol: 'usecase',
        color: '#06b6d4',
        items: m.modules.flatMap((mod) => (mod.useCases ?? []).map((u) => ({ id: u.id, name: u.name }))),
      },
      {
        label: 'Eventos',
        symbol: 'event',
        color: '#f59e0b',
        items: m.modules.flatMap((mod) => [
          ...(mod.domainEvents ?? []).map((ev) => ({ id: ev.id, name: ev.name })),
          ...(mod.applicationEvents ?? []).map((ev) => ({ id: ev.id, name: ev.name })),
        ]),
      },
      {
        label: 'Agregados',
        symbol: 'aggregate',
        color: '#8b5cf6',
        items: (m.aggregates ?? []).map((a) => ({ id: a.id, name: a.name })),
      },
      {
        label: 'Read models',
        symbol: 'readmodel',
        color: '#10b981',
        items: m.modules.flatMap((mod) => (mod.readModels ?? []).map((rm) => ({ id: rm.id, name: rm.name }))),
      },
      {
        label: 'Query services',
        symbol: 'lens',
        color: '#0284c7',
        items: m.modules.flatMap((mod) => (mod.queryServices ?? []).map((q) => ({ id: q.id, name: q.name }))),
      },
      {
        label: 'Actores',
        symbol: 'person',
        color: '#64748b',
        items: (m.actors ?? []).map((a) => ({ id: a.id, name: a.name })),
      },
      {
        label: 'Sistemas externos',
        symbol: 'component',
        color: '#64748b',
        items: m.externalSystems.map((x) => ({ id: x.id, name: x.name })),
      },
      {
        label: 'Operaciones y tablas externas',
        symbol: 'usecase',
        color: '#64748b',
        items: m.externalSystems.flatMap((x) => [
          ...(x.useCases ?? []).map((u) => ({ id: u.id, name: u.name })),
          ...(x.tables ?? []).map((t) => ({ id: t.id, name: t.name })),
          ...(x.mcpServers ?? []).map((sv) => ({ id: sv.id, name: sv.name })),
        ]),
      },
      {
        label: 'APIs',
        symbol: 'interface',
        color: '#4f46e5',
        items: (m.apis ?? []).map((a) => ({ id: a.id, name: a.name })),
      },
      {
        label: 'Operaciones de API',
        symbol: 'usecase',
        color: '#4f46e5',
        items: (m.apis ?? []).flatMap((a) => a.operations.map((o) => ({ id: o.id, name: o.name }))),
      },
      {
        label: 'Proxies API',
        symbol: 'interface',
        color: '#0e7490',
        items: (m.proxyApis ?? []).map((px) => ({ id: px.id, name: px.name })),
      },
      {
        label: 'Agentes IA',
        symbol: 'robot',
        color: '#9333ea',
        items: (m.aiAgents ?? []).map((a) => ({ id: a.id, name: a.name })),
      },
      {
        label: 'Gateways MCP',
        symbol: 'plug',
        color: '#7c3aed',
        items: (m.mcpGateways ?? []).map((g) => ({ id: g.id, name: g.name })),
      },
      {
        label: 'RAGs',
        symbol: 'lens',
        color: '#0e7490',
        items: (m.rags ?? []).map((r) => ({ id: r.id, name: r.name })),
      },
      {
        label: 'Workflows',
        symbol: 'process',
        color: '#6d28d9',
        items: (m.workflows ?? []).map((w) => ({ id: w.id, name: w.name })),
      },
    ];
    const needle = this._paletteFilter.trim().toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        items: needle ? g.items.filter((it) => it.name.toLowerCase().includes(needle)) : g.items,
      }))
      .filter((g) => g.items.length > 0);
  }

  private onPaletteDragStart(e: DragEvent, payload: { new?: string; existing?: string }): void {
    e.dataTransfer?.setData('application/x-modux-palette', JSON.stringify(payload));
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'copy';
  }

  private onPaletteDrop(e: DragEvent): void {
    const raw = e.dataTransfer?.getData('application/x-modux-palette');
    if (!raw) return;
    e.preventDefault();
    const canvas = this.renderRoot.querySelector('modux-canvas');
    if (!canvas) return;
    const pos = canvas.sceneFromClient(e.clientX, e.clientY);
    const targetId = canvas.nodeIdAtClient(e.clientX, e.clientY);
    let payload: { new?: string; existing?: string };
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }
    if (payload.new) this.createFromPalette(payload.new, pos, targetId);
    else if (payload.existing) {
      this.placeExistingFromPalette(payload.existing, pos, targetId, e.clientX, e.clientY);
    }
  }

  /** A name (and slug id) that does not collide with anything already in the model. */
  private uniquePaletteName(base: string, prefix: string): { id: string; name: string } {
    const ids = new Set(this.sceneFor(this._view).nodes.map((n) => n.id));
    const m = this.model;
    for (const pool of [
      m.modules.map((x) => x.id),
      (m.actors ?? []).map((x) => x.id),
      m.externalSystems.map((x) => x.id),
      (m.apis ?? []).map((x) => x.id),
      (m.proxyApis ?? []).map((x) => x.id),
      (m.aiAgents ?? []).map((x) => x.id),
      (m.rags ?? []).map((x) => x.id),
      (m.workflows ?? []).map((x) => x.id),
      (m.workflows ?? []).flatMap((w) => (w.steps ?? []).map((s) => s.id)),
    ]) {
      pool.forEach((id) => ids.add(id));
    }
    for (let n = 1; ; n++) {
      const name = n === 1 ? base : `${base} ${n}`;
      const id = `${prefix}${slug(name)}`;
      if (!ids.has(id)) return { id, name };
    }
  }

  /** The container a child kind needs, resolved from whatever the drop landed on. */
  private dropContainerFor(type: string, targetId: string | null): string | null {
    if (!targetId) return null;
    const scene = this.sceneFor(this._view);
    const chain: string[] = [];
    for (let cur: string | undefined = targetId; cur; ) {
      chain.push(cur);
      cur = scene.nodes.find((n) => n.id === cur)?.parentId;
    }
    const needsModule = [
      'aggregate', 'use-case', 'policy', 'domain-event',
      'application-event', 'domain-service', 'query-service',
    ].includes(type);
    if (needsModule) return chain.find((id) => this.model.modules.some((mo) => mo.id === id)) ?? null;
    if (type === 'read-model') {
      const agg = chain.find((id) => (this.model.aggregates ?? []).some((a) => a.id === id));
      if (agg) return agg;
      const mod = chain.find((id) => this.model.modules.some((mo) => mo.id === id));
      return (this.model.aggregates ?? []).find((a) => a.moduleId === mod)?.id ?? null;
    }
    if (['external-use-case', 'external-table', 'mcp-server'].includes(type)) {
      return chain.find((id) => this.model.externalSystems.some((x) => x.id === id)) ?? null;
    }
    if (type === 'use-case-step') {
      return (
        chain.find((id) =>
          this.model.modules.some((mo) => (mo.useCases ?? []).some((u) => u.id === id)),
        ) ?? null
      );
    }
    if (type === 'api-operation') {
      // The API itself, an implementation occurrence of it, or a proxy — a proxy's
      // surface IS its fronted API, so the operation lands on the target.
      for (const id of chain) {
        if ((this.model.apis ?? []).some((a) => a.id === id)) return id;
        const impl = /^apiimpl:(.+)@(.+)$/.exec(id);
        if (impl && (this.model.apis ?? []).some((a) => a.id === impl[1])) return impl[1];
        const px = (this.model.proxyApis ?? []).find((p) => p.id === id);
        if (px?.targetApiId) return px.targetApiId;
      }
      return null;
    }
    if (type === 'api') {
      return (
        chain.find((id) => this.model.externalSystems.some((x) => x.id === id)) ??
        chain.find((id) => this.model.modules.some((mo) => mo.id === id)) ??
        null
      );
    }
    return null;
  }

  private createFromPalette(type: string, pos: Point, targetId: string | null): void {
    const def = ModuxEditor.PALETTE_NEW.find((k) => k.type === type);
    if (!def) return;
    const view = this._view;
    const scene = this.sceneFor(view);
    const place = (id: string, container?: string) => {
      const current = this.viewLayout(view);
      const parent = container ? scene.nodes.find((n) => n.id === container) : undefined;
      const p = parent
        ? { x: Math.round(pos.x - parent.x), y: Math.round(pos.y - parent.y) }
        : { x: Math.round(pos.x), y: Math.round(pos.y) };
      this.writeViewLayout(view, { ...current, nodes: { ...current.nodes, [id]: p } });
      return { kind: 'move-node', view, id, pos: null } as EditOp;
    };
    const issue = (cmd: ModuxCommand, id: string, container?: string) => {
      const inverse = this.inverseOf(cmd) ?? [];
      this.command(cmd, false);
      const moveOp = place(id, container);
      this.pushUndoEntry([...inverse, moveOp]);
    };
    if (!def.child) {
      const prefix: Record<string, string> = {
        module: 'mod-', actor: '', 'external-system': 'ext-', 'ai-agent': 'agent-',
        'external-ai-agent': 'agent-', 'mcp-gateway': 'mcpgw-', rag: 'rag-', api: 'api-',
        'proxy-api': 'proxy-', workflow: 'wf-',
      };
      const { id, name } = this.uniquePaletteName(def.label, prefix[type] ?? '');
      const cmd: ModuxCommand =
        type === 'module'
          ? { kind: 'add-module', id, name, subdomainType: 'SUPPORTING' }
          : type === 'actor'
            ? { kind: 'add-actor', id, name }
            : type === 'external-system'
              ? { kind: 'add-external-system', id, name }
              : type === 'ai-agent'
                ? { kind: 'add-ai-agent', id, name }
                : type === 'external-ai-agent'
                  ? { kind: 'add-ai-agent', id, name, external: true }
                  : type === 'mcp-gateway'
                    ? { kind: 'add-mcp-gateway', id, name }
                    : type === 'rag'
                      ? { kind: 'add-rag', id, name }
                      : type === 'api'
                        ? { kind: 'add-api', id, name }
                        : type === 'proxy-api'
                          ? { kind: 'add-proxy-api', id, name }
                          : {
                              kind: 'add-workflow',
                              id,
                              name,
                              completionEventName: `${name.replace(/\s+/g, '')}Completado`,
                            };
      issue(cmd, id);
      return;
    }
    if (type === 'workflow-step') {
      // A step lives in a workflow: drop it on the workflow node, or on one of its
      // steps (workflows view) to declare the dependency at the same time.
      const workflows = this.model.workflows ?? [];
      const chain: string[] = [];
      for (let cur: string | undefined = targetId ?? undefined; cur; ) {
        chain.push(cur);
        cur = scene.nodes.find((n) => n.id === cur)?.parentId;
      }
      const wfDirect = chain.map((cid) => workflows.find((w) => w.id === cid)).find(Boolean);
      const stepHit = chain
        .map((cid) => {
          const owner = workflows.find((w) => (w.steps ?? []).some((s) => s.id === cid));
          return owner ? { owner, stepId: cid } : null;
        })
        .find(Boolean);
      const wf = wfDirect ?? stepHit?.owner;
      if (!wf) {
        this.emit('modux-notice', {
          message: 'Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)',
        });
        return;
      }
      const { id, name } = this.uniquePaletteName('Paso', 'wfs-');
      // Chained onto a step: land beside it, downstream (dependencies flow left→right).
      if (stepHit) pos = { x: pos.x + 190, y: pos.y };
      issue(
        {
          kind: 'add-workflow-step',
          workflowId: wf.id,
          id,
          name,
          ...(stepHit ? { dependsOnStepIds: [stepHit.stepId], afterStepId: stepHit.stepId } : {}),
        },
        id,
      );
      if (this._view !== 'workflows') {
        this.emit('modux-notice', {
          message: `Paso añadido a ${wf.name} — se ve en la vista Workflows`,
        });
      }
      return;
    }
    if (type === 'api') {
      // An API never floats: it is published by an external system or
      // implemented by one of our bounded contexts.
      const home = this.dropContainerFor('api', targetId);
      if (!home) {
        this.emit('modux-notice', {
          message: 'Una API vive en un sistema externo o en un contexto: suéltala sobre uno',
        });
        return;
      }
      const { id, name } = this.uniquePaletteName('API', 'api-');
      const addCmd: ModuxCommand = { kind: 'add-api', id, name };
      const inverse = this.inverseOf(addCmd) ?? [];
      this.command(addCmd, false);
      if (this.model.externalSystems.some((x) => x.id === home)) {
        this.command({ kind: 'set-api-publisher', id, targetId: home }, false);
      } else {
        this.command({ kind: 'add-api-implementation', apiId: id, moduleId: home }, false);
      }
      const current = this.viewLayout(this._view);
      const parent = this.sceneFor(this._view).nodes.find((n) => n.id === home);
      const p = parent
        ? { x: Math.round(pos.x - parent.x), y: Math.round(pos.y - parent.y) }
        : { x: Math.round(pos.x), y: Math.round(pos.y) };
      this.writeViewLayout(this._view, { ...current, nodes: { ...current.nodes, [id]: p } });
      this.pushUndoEntry([...inverse, { kind: 'move-node', view: this._view, id, pos: null }]);
      return;
    }
    const container = this.dropContainerFor(type, targetId);
    if (!container) {
      this.emit('modux-notice', {
        message:
          type === 'api-operation'
            ? 'Suelta la operación sobre una API'
            : type === 'use-case-step'
              ? 'Suelta el paso sobre un caso de uso'
              : ['external-use-case', 'external-table', 'mcp-server'].includes(type)
                ? 'Suelta el elemento sobre un sistema externo'
                : 'Suelta el elemento sobre un contexto',
      });
      return;
    }
    const { name } = this.uniquePaletteName(def.label, '');
    if (type === 'aggregate') {
      const id = `agg-${slug(name)}`;
      issue({ kind: 'add-aggregate', id, name, moduleId: container }, id, container);
    } else if (type === 'use-case' || type === 'policy') {
      const id = `uc-${slug(name)}`;
      issue(
        { kind: 'add-use-case', id, name, moduleId: container, ...(type === 'policy' ? { policy: true } : {}) },
        id,
        container,
      );
    } else if (type === 'domain-event') {
      const id = `ev-${slug(name)}`;
      issue({ kind: 'add-domain-event', id, name, moduleId: container }, id, container);
    } else if (type === 'application-event') {
      const id = `aev-${slug(name)}`;
      issue({ kind: 'add-application-event', id, name, moduleId: container }, id, container);
    } else if (type === 'domain-service') {
      const id = `ds-${slug(name)}`;
      issue({ kind: 'add-domain-service', id, name, moduleId: container }, id, container);
    } else if (type === 'query-service') {
      const id = `qs-${slug(name)}`;
      issue({ kind: 'add-query-service', id, name, moduleId: container }, id, container);
    } else if (type === 'read-model') {
      const id = `rm-${slug(name)}`;
      const aggregate = (this.model.aggregates ?? []).find((a) => a.id === container);
      issue({ kind: 'add-read-model', id, name, aggregateId: container }, id, aggregate?.moduleId ?? container);
    } else if (type === 'api-operation') {
      // The operation id embeds the API, so uniqueness is per-API — the generic
      // pool above can't see it and a second «Operación de API» would collide.
      const api = (this.model.apis ?? []).find((a) => a.id === container);
      const taken = new Set((api?.operations ?? []).map((o) => o.id));
      let opName = name;
      let id = `apiop-${container.replace(/^api-/, '')}-${slug(opName)}`;
      for (let n = 2; taken.has(id); n++) {
        opName = `${def.label} ${n}`;
        id = `apiop-${container.replace(/^api-/, '')}-${slug(opName)}`;
      }
      issue({ kind: 'add-api-operation', apiId: container, id, name: opName }, id, container);
      // Guide the eye when the current level doesn't draw operation chips.
      const showsOps = scene.nodes.some(
        (n) => n.parentId === container && (n.kind === 'api-operation' || n.kind === 'api-op-occurrence'),
      );
      if (!showsOps) {
        this.emit('modux-notice', {
          message: `Operación añadida a ${api?.name ?? container} — se ve en el nivel «APIs y operaciones»`,
        });
      }
    } else if (type === 'use-case-step') {
      // Step ids are per-use-case; a bare palette step is Custom — drawing a relation
      // FROM the use case (evento, otro caso de uso, agregado, query…) creates the
      // typed steps instead.
      const uc = this.model.modules
        .flatMap((mo) => mo.useCases ?? [])
        .find((u) => u.id === container);
      const taken = new Set(uc?.stepIds ?? []);
      let stepName = name;
      let id = `step-${slug(stepName)}`;
      for (let n = 2; taken.has(id); n++) {
        stepName = `${def.label} ${n}`;
        id = `step-${slug(stepName)}`;
      }
      issue({ kind: 'add-use-case-step', useCaseId: container, id, name: stepName }, id, container);
      this.emit('modux-notice', {
        message: `Paso Custom añadido a ${uc?.name ?? container} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`,
      });
    } else if (type === 'external-use-case') {
      const id = `xuc-${slug(name)}`;
      issue({ kind: 'add-external-use-case', id, name, moduleId: container }, id, container);
    } else if (type === 'external-table') {
      const id = `tbl-${slug(name)}`;
      issue({ kind: 'add-external-table', id, name, moduleId: container }, id, container);
    } else if (type === 'mcp-server') {
      const id = `mcpsrv-${slug(name)}`;
      issue({ kind: 'add-mcp-server', id, name, moduleId: container }, id, container);
    }
  }

  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  private placeExistingFromPalette(
    id: string,
    pos: Point,
    targetId: string | null,
    clientX: number,
    clientY: number,
  ): void {
    if (targetId && targetId !== id) {
      this.applyConnection(id, targetId, clientX, clientY);
      return;
    }
    const view = this._view;
    const scene = this.sceneFor(view);
    const node = scene.nodes.find((n) => n.id === id);
    if (!node) {
      if (this._activeViewId) {
        this.command({ kind: 'add-view-member', id: this._activeViewId, targetId: id });
        const current = this.viewLayout(view);
        this.writeViewLayout(view, {
          ...current,
          nodes: { ...current.nodes, [id]: { x: Math.round(pos.x), y: Math.round(pos.y) } },
        });
      } else {
        this.emit('modux-notice', {
          message: 'Ese elemento no se pinta en este nivel de detalle',
        });
      }
      return;
    }
    const current = this.viewLayout(view);
    const parent = node.parentId ? scene.nodes.find((n) => n.id === node.parentId) : undefined;
    const p = parent
      ? { x: Math.round(pos.x - parent.x), y: Math.round(pos.y - parent.y) }
      : { x: Math.round(pos.x), y: Math.round(pos.y) };
    this.pushUndoEntry([{ kind: 'move-node', view, id, pos: current.nodes[id] ?? null }]);
    this.writeViewLayout(view, { ...current, nodes: { ...current.nodes, [id]: p } });
  }

  private renderPalette() {
    if (!this._paletteOpen || (this._view !== 'context-map' && this._view !== 'workflows')) return '';
    const needle = this._paletteFilter.trim().toLowerCase();
    // The workflows view only creates workflow things; everything else is context-map.
    const news = ModuxEditor.PALETTE_NEW.filter(
      (k) =>
        (this._view !== 'workflows' || ['workflow', 'workflow-step'].includes(k.type)) &&
        (!needle || k.label.toLowerCase().includes(needle)),
    );
    // The workflows view has no catalog section: it always shows the new elements.
    const tab = this._view === 'workflows' ? 'new' : this._paletteTab;
    return html`
      <div class="palette ${this._treeOpen && this._activeViewId ? 'shifted' : ''}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(e: Event) => (this._paletteFilter = (e.target as HTMLInputElement).value)}
          />
          ${tab === 'new'
            ? html`
                <div class="palette-h">Nuevos — arrastra al lienzo${''}</div>
                ${news.map(
                  (k) => html`
                    <div
                      class="palette-item ${k.child ? 'palette-child' : ''}"
                      draggable="true"
                      title=${k.type === 'workflow-step'
                        ? 'Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo'
                        : k.child
                          ? 'Suéltalo sobre su contenedor (contexto, sistema externo o API)'
                          : 'Suéltalo en el lienzo'}
                      @dragstart=${(e: DragEvent) => this.onPaletteDragStart(e, { new: k.type })}
                    >
                      <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${k.color}">
                        ${SYMBOLS[k.symbol]}
                      </svg>
                      <span class="pal-label">${k.label}</span>
                    </div>
                  `,
                )}
              `
            : html`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
                  (g) => html`
                    <div class="palette-g">${g.label}</div>
                    ${g.items.map(
                      (it) => html`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(e: DragEvent) => this.onPaletteDragStart(e, { existing: it.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${g.color}">
                            ${SYMBOLS[g.symbol]}
                          </svg>
                          <span class="pal-label">${it.name}</span>
                        </div>
                      `,
                    )}
                  `,
                )}
              `}
        </div>
        ${this._view === 'workflows'
          ? ''
          : html`
              <div class="palette-side">
                <button
                  class="palette-vtab"
                  ?data-active=${tab === 'new'}
                  title="Elementos nuevos para arrastrar al lienzo"
                  @click=${() => (this._paletteTab = 'new')}
                >
                  Nuevos
                </button>
                <button
                  class="palette-vtab"
                  ?data-active=${tab === 'catalog'}
                  title="El catálogo del modelo: colocar o conectar elementos existentes"
                  @click=${() => (this._paletteTab = 'catalog')}
                >
                  Catálogo
                </button>
              </div>
            `}
      </div>
    `;
  }

  private createElementFromToolbar(): void {
    const name = this._newName.trim();
    if (!name) return;
    if (this._view === 'aggregates') {
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

  private sceneFor(view: ViewId) {
    const vl = this.viewLayout(view);
    const model = this.filteredModel();
    const scene =
      view === 'aggregates'
        ? aggregatesScene(model, vl.nodes)
        : view === 'flows'
          ? flowsScene(model, vl.nodes)
          : view === 'processes'
            ? processesScene(model, vl.nodes)
            : view === 'workflows'
              ? workflowsScene(model, vl.nodes)
              : view === 'eventstorming'
                ? eventstormingScene(model, vl.nodes)
                : contextMapScene(
                    model,
                    vl.nodes,
                    this._detail,
                    vl.sizes ?? {},
                    new Set(vl.collapsed ?? []),
                  );
    // On a solution, ring what differs from the system (node ids carry view prefixes).
    if (this.diff) {
      for (const node of scene.nodes) {
        const kind = this.diff[node.id] ?? this.diff[node.id.replace(/^(tgt:|flow:)/, '')];
        if (kind) node.diffKind = kind;
      }
    }
    return scene;
  }

  /** ELK layout for the current view, applied as ONE undoable composite move. */
  private async runAutoLayout(): Promise<void> {
    const view = this._view;
    const scene = this.sceneFor(view);
    if (!scene.nodes.length) return;
    // Nested children (aggregates/use cases) are derived from their container's
    // position, so only top-level nodes take part in the layout.
    const topNodes = scene.nodes.filter((n) => !n.parentId);
    const topIds = new Set(topNodes.map((n) => n.id));
    const layoutScene = {
      nodes: topNodes,
      edges: scene.edges.filter((e) => topIds.has(e.sourceId) && topIds.has(e.targetId)),
    };
    const algorithm =
      view === 'flows' || view === 'processes' || view === 'workflows' || view === 'eventstorming'
        ? 'layered'
        : 'force';
    const positions = await autoLayout(layoutScene, algorithm);
    const current = this.viewLayout(view);
    this.pushUndoEntry([
      ...topNodes.map((n) => ({
        kind: 'move-node' as const,
        view,
        id: n.id,
        pos: current.nodes[n.id] ?? null,
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(current.edges).map((edgeId) => ({
        kind: 'set-edge-points' as const,
        view,
        id: edgeId,
        points: current.edges[edgeId],
      })),
    ]);
    // Keep container sizes; children re-grid inside them from the default.
    this.writeViewLayout(view, { nodes: positions, edges: {}, sizes: current.sizes });
    await this.updateComplete;
    this.renderRoot.querySelector('modux-canvas')?.fit();
  }

  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  private refocusCanvasAfterControl(e: Event): void {
    const target = e.target as HTMLElement;
    const isSelectChange = e.type === 'change' && target instanceof HTMLSelectElement;
    const isButtonClick = e.type === 'click' && !!target.closest('button');
    if (!isSelectChange && !isButtonClick) return;
    (this.renderRoot.querySelector('modux-canvas') as HTMLElement | null)?.focus();
  }

  render() {
    const scene = this.sceneFor(this._view);
    return html`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <button
          class="tab hamburger"
          ?hidden=${this._view !== 'context-map' && this._view !== 'workflows'}
          ?data-active=${this._paletteOpen}
          title="Paleta de elementos: arrastra nuevos o existentes al lienzo (P)"
          @click=${() => (this._paletteOpen = !this._paletteOpen)}
        >
          ☰
        </button>
        <div class="tabs">
          <button
            class="tab"
            ?data-active=${this._view !== 'eventstorming'}
            title="El diagrama del modelo — el desplegable elige qué pinta"
            @click=${() => {
              if (this._view === 'eventstorming') this._view = 'context-map';
            }}
          >
            Diagrama
          </button>
          <button
            class="tab"
            ?data-active=${this._view === 'eventstorming'}
            @click=${() => (this._view = 'eventstorming')}
          >
            EventStorming
          </button>
          <select
            ?hidden=${this._view === 'eventstorming'}
            title="Qué pinta el diagrama: un nivel de detalle del context map, o una vista especializada"
            @change=${(e: Event) => this.onDiagramScopeChange((e.target as HTMLSelectElement).value)}
          >
            <optgroup label="Context map">
              <option value="level:contexts"
                ?selected=${this._view === 'context-map' && this._detail === 'contexts'}>
                Contextos
              </option>
              <option value="level:detail"
                ?selected=${this._view === 'context-map' && this._detail === 'detail'}>
                Agregados y casos de uso
              </option>
              <option value="level:operations"
                ?selected=${this._view === 'context-map' && this._detail === 'operations'}>
                APIs y operaciones
              </option>
            </optgroup>
            <optgroup label="Vistas especializadas">
              <option value="view:aggregates" ?selected=${this._view === 'aggregates'}>
                Agregados y referencias
              </option>
              <option value="view:flows" ?selected=${this._view === 'flows'}>Flows</option>
              <option value="view:processes" ?selected=${this._view === 'processes'}>
                Procesos
              </option>
              <option value="view:workflows" ?selected=${this._view === 'workflows'}>
                Workflows
              </option>
            </optgroup>
          </select>
        </div>
        <select
          title="Limitar el lienzo a una vista del modelo"
          @change=${(e: Event) => (this._activeViewId = (e.target as HTMLSelectElement).value)}
        >
          <option value="" ?selected=${this._activeViewId === ''}>Vista: todo el modelo</option>
          ${(this.model.views ?? [])
            .filter((v) => v.kind === 'CURATED')
            .map(
              (v) =>
                html`<option value=${v.id} ?selected=${v.id === this._activeViewId}>
                  Vista: ${v.name}
                </option>`,
            )}
        </select>
        ${this._activeViewId
          ? html`
              <input
                class="new-name"
                list="view-member-options"
                placeholder="Añadir a la vista…"
                title="Busca un elemento existente del catálogo y añádelo a la vista activa"
                .value=${this._addMemberKey}
                @input=${(e: Event) => (this._addMemberKey = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.addMemberFromToolbar()}
              />
              <datalist id="view-member-options">
                ${this.viewMemberCandidates().map(
                  (c) => html`<option value="${c.name} (${c.id})">${c.kind}</option>`,
                )}
              </datalist>
              <button class="tab" title="Añadir el elemento a la vista" @click=${this.addMemberFromToolbar}>
                ＋ Añadir
              </button>
              <button
                class="tab"
                ?data-active=${this._treeOpen}
                title="Árbol del catálogo: marca qué elementos pertenecen a la vista (sin borrar nada del proyecto)"
                @click=${() => (this._treeOpen = !this._treeOpen)}
              >
                ☰ Árbol
              </button>
            `
          : ''}
        <div class="spacer"></div>
        ${this._multi.length
          ? html`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                .value=${this._newViewName}
                @input=${(e: Event) => (this._newViewName = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.createViewFromSelection()}
              />
              <button class="tab" title="Crear una vista modux con la selección" @click=${this.createViewFromSelection}>
                ⊞ Vista (${this._multi.length})
              </button>
              <span class="sep"></span>
            `
          : ''}
        <input
          class="new-name"
          ?hidden=${this._view !== 'aggregates' && this._view !== 'flows' && this._view !== 'processes'}
          placeholder=${({
            aggregates: 'Nuevo agregado…',
            flows: 'Nuevo flow…',
            processes: 'Nuevo proceso…',
          } as Partial<Record<ViewId, string>>)[this._view] ?? ''}
          .value=${this._newName}
          @input=${(e: Event) => (this._newName = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.createElementFromToolbar()}
        />
        ${this._view === 'aggregates' || this._view === 'processes'
          ? html`<select
              title=${this._view === 'aggregates'
                ? 'Módulo del nuevo agregado'
                : 'Módulo dueño del proceso'}
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
        <button
          class="tab"
          ?hidden=${this._view !== 'aggregates' && this._view !== 'flows' && this._view !== 'processes'}
          @click=${this.createElementFromToolbar}
        >
          ＋ Crear
        </button>
        <input
          class="import-api-file"
          type="file"
          hidden
          accept=".json,.yaml,.yml,.wsdl,.xml"
          @change=${this.onImportApiFile}
        />
        <button
          class="tab"
          ?hidden=${this._view !== 'context-map'}
          title=${this.selectedApiId()
            ? 'Importa un OpenAPI/WSDL sobre la API seleccionada (operaciones y modelos rq/rs)'
            : 'Importa un OpenAPI/WSDL como una nueva API del diagrama'}
          @click=${() =>
            (this.renderRoot.querySelector('input.import-api-file') as HTMLInputElement | null)?.click()}
        >
          ⇪ Importar API${this.selectedApiId() ? ' aquí' : '…'}
        </button>
        ${this._view === 'context-map' &&
        this._selectedId &&
        (this.model.rags ?? []).some((r) => r.id === this._selectedId)
          ? html`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(e: Event) =>
                  (this._newRagSourceType = (e.target as HTMLSelectElement).value)}
              >
                ${['WEB', 'REPO', 'FTP', 'DATABASE', 'BUCKET', 'SHAREPOINT', 'CONFLUENCE', 'DRIVE', 'FILESYSTEM', 'TICKETING', 'CRM'].map(
                  (t) =>
                    html`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`,
                )}
              </select>
              <input
                class="new-name"
                placeholder="URI de la fuente…"
                title="La fuente que alimenta el RAG: repo, web, FTP, base de datos, bucket, SharePoint, Confluence, Drive o sistema de ficheros"
                .value=${this._newRagSourceUri}
                @input=${(e: Event) =>
                  (this._newRagSourceUri = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) =>
                  e.key === 'Enter' && this.addRagContentSourceFromToolbar()}
              />
              <button
                class="tab"
                title="Añadir la fuente de contenido al RAG seleccionado"
                @click=${this.addRagContentSourceFromToolbar}
              >
                ＋ Fuente
              </button>
            `
          : ''}
        ${this._view === 'processes' &&
        this._selectedId &&
        ((this.model.processes ?? []).some((p) => p.id === this._selectedId) ||
          this.owningProcessOf(this._selectedId))
          ? html`
              <span class="sep"></span>
              <input
                class="new-name evt"
                placeholder="Nuevo paso…"
                .value=${this._newStepName}
                @input=${(e: Event) => (this._newStepName = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.addStepFromToolbar()}
              />
              <select
                title="Tipo de paso"
                @change=${(e: Event) =>
                  (this._newStepType = (e.target as HTMLSelectElement).value as
                    | 'AUTOMATED'
                    | 'HUMAN')}
              >
                ${['AUTOMATED', 'HUMAN'].map(
                  (t) => html`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`,
                )}
              </select>
              ${this._newStepType === 'HUMAN'
                ? html`<input
                      class="new-name evt"
                      placeholder="Rol…"
                      .value=${this._newStepRole}
                      @input=${(e: Event) =>
                        (this._newStepRole = (e.target as HTMLInputElement).value)}
                    /><input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del nuevo paso"
                      .value=${this._newStepDeadline}
                      @input=${(e: Event) =>
                        (this._newStepDeadline = (e.target as HTMLInputElement).value)}
                    />`
                : ''}
              <button class="tab" title="Añadir paso tras la selección" @click=${this.addStepFromToolbar}>
                ＋ Paso
              </button>
              ${this.owningProcessOf(this._selectedId)
                ? html`
                    <span class="sep"></span>
                    <input
                      class="new-name evt"
                      placeholder="Rol…"
                      title="Rol del paso seleccionado (HUMAN)"
                      .value=${this._editStepRole}
                      @input=${(e: Event) =>
                        (this._editStepRole = (e.target as HTMLInputElement).value)}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del paso seleccionado"
                      .value=${this._editStepDeadline}
                      @input=${(e: Event) =>
                        (this._editStepDeadline = (e.target as HTMLInputElement).value)}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Compensación…"
                      title="Use case de compensación del paso seleccionado"
                      .value=${this._editStepComp}
                      @input=${(e: Event) =>
                        (this._editStepComp = (e.target as HTMLInputElement).value)}
                    />
                    <button class="tab" title="Aplicar cambios al paso" @click=${this.applyStepEdit}>
                      ✓ Aplicar
                    </button>
                  `
                : ''}
            `
          : ''}
        ${this._view === 'workflows' &&
        this._selectedId &&
        ((this.model.workflows ?? []).some((w) => w.id === this._selectedId) ||
          this.owningWorkflowOf(this._selectedId))
          ? html`
              <span class="sep"></span>
              <input
                class="new-name evt"
                placeholder="Nuevo paso…"
                .value=${this._newStepName}
                @input=${(e: Event) => (this._newStepName = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) =>
                  e.key === 'Enter' && this.addWorkflowStepFromToolbar()}
              />
              <select
                title="Caso de uso que lanza el nuevo paso"
                @change=${(e: Event) => (this._newStepUseCase = (e.target as HTMLSelectElement).value)}
              >
                <option value="" ?selected=${this._newStepUseCase === ''}>— sin use case —</option>
                ${this.model.modules
                  .flatMap((m) => m.useCases ?? [])
                  .map(
                    (u) =>
                      html`<option value=${u.id} ?selected=${u.id === this._newStepUseCase}>
                        ${u.name}
                      </option>`,
                  )}
              </select>
              <input
                class="new-name evt"
                placeholder="Evento que emite…"
                title="Evento que el workflow emite para arrancar el paso"
                .value=${this._newStepEmits}
                @input=${(e: Event) => (this._newStepEmits = (e.target as HTMLInputElement).value)}
              />
              <button
                class="tab"
                title="Añadir paso (workflow seleccionado = suelto; paso seleccionado = dependiente de él)"
                @click=${this.addWorkflowStepFromToolbar}
              >
                ＋ Paso
              </button>
              ${this.owningWorkflowOf(this._selectedId)
                ? html`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(e: Event) =>
                        (this._editStepUseCase = (e.target as HTMLSelectElement).value)}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ''}>
                        — sin use case —
                      </option>
                      ${this.model.modules
                        .flatMap((m) => m.useCases ?? [])
                        .map(
                          (u) =>
                            html`<option value=${u.id} ?selected=${u.id === this._editStepUseCase}>
                              ${u.name}
                            </option>`,
                        )}
                    </select>
                    <input
                      class="new-name evt"
                      placeholder="Emite…"
                      title="Evento que arranca el paso seleccionado"
                      .value=${this._editStepEmits}
                      @input=${(e: Event) =>
                        (this._editStepEmits = (e.target as HTMLInputElement).value)}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Espera…"
                      title="Evento que marca el paso como completado"
                      .value=${this._editStepAwaits}
                      @input=${(e: Event) =>
                        (this._editStepAwaits = (e.target as HTMLInputElement).value)}
                    />
                    <button
                      class="tab"
                      title="Aplicar cambios al paso"
                      @click=${this.applyWorkflowStepEdit}
                    >
                      ✓ Aplicar
                    </button>
                  `
                : ''}
            `
          : ''}
        <button
          class="tab"
          title="Deshacer el último cambio (Ctrl+Z)"
          ?disabled=${this._undoStack.length === 0}
          @click=${this.undo}
        >
          ↶ Deshacer
        </button>
        <button
          class="tab"
          title="Rehacer (Ctrl+Shift+Z / Ctrl+Y)"
          ?disabled=${this._redoStack.length === 0}
          @click=${this.redo}
        >
          ↷ Rehacer
        </button>

        <button
          class="tab"
          title="Ajustar el diagrama a la ventana"
          @click=${() => this.renderRoot.querySelector('modux-canvas')?.fit()}
        >
          ⌖ Ajustar
        </button>
        <button
          class="tab"
          title="Recolocar los nodos automáticamente (deshacible)"
          @click=${() => void this.runAutoLayout()}
        >
          ✨ Auto-layout
        </button>
        <button
          class="tab"
          ?data-active=${this._tilt}
          title=${this._tilt
            ? 'Volver al lienzo editable (V)'
            : 'Vista 3D: el diagrama como placas apiladas por contención (V)'}
          @click=${() => (this._tilt = !this._tilt)}
        >
          ⬦ 3D
        </button>
        <button
          class="tab"
          ?data-active=${this._fullscreen}
          title=${this._fullscreen
            ? 'Salir de pantalla completa (F o Esc)'
            : 'El diagrama a pantalla completa (F)'}
          @click=${() => void this.toggleFullscreen()}
        >
          ⛶
        </button>
      </div>
      <div class="canvas-wrap">
      ${this._tilt
        ? html`<modux-tilt .scene=${scene}></modux-tilt>`
        : html`
      ${this._treeOpen && this._activeViewId ? this.renderViewTree() : ''}
      ${this.renderPalette()}
      <modux-canvas
        @dragover=${(e: DragEvent) => e.preventDefault()}
        @drop=${this.onPaletteDrop}
        .scene=${scene}
        .edgePoints=${this.routedEdgePoints(scene)}
        .selectedId=${this._selectedId}
        .selectedIds=${this._multi}
        .connectable=${this._view === 'context-map' || this._view === 'workflows'}
        @node-moved=${this.onNodeMoved}
        @nodes-moved=${this.onNodesMoved}
        @node-reparent-requested=${this.onNodeReparentRequested}
        @node-collapse-toggled=${this.onNodeCollapseToggled}
        @node-proxy-requested=${this.onNodeProxyRequested}
        @node-resized=${this.onNodeResized}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
        @delete-selection-requested=${this.onDeleteSelectionRequested}
        @node-renamed=${this.onNodeRenamed}
        @edge-points-changed=${this.onEdgePointsChanged}
        @element-multi-toggled=${this.onMultiToggled}
        @nodes-boxed=${this.onNodesBoxed}
        @undo-requested=${this.undo}
        @redo-requested=${this.redo}
        @element-selected=${this.onElementSelected}
        @element-activated=${this.onElementActivated}
        @selection-cleared=${() => {
          this._selectedId = null;
          this._multi = [];
          this.emit('modux-select', null);
        }}
      ></modux-canvas>
      `}
      </div>
      <div class="hint">
        ${this._view === 'context-map'
          ? html`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom`
          : this._view === 'eventstorming'
            ? html`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom`
            : this._view === 'workflows'
              ? html`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom`
              : html`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
        · pulsa <b>?</b> para los atajos
      </div>
      ${this.renderRelationPicker()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
      ${this.renderHelpPopover()}
    `;
  }

  /** The keyboard cheatsheet (toggled with ? and closed with Esc or a click outside). */
  private renderHelpPopover() {
    if (!this._helpOpen) return '';
    const rows: [string, string][] = [
      ['P', 'Mostrar/ocultar la paleta'],
      ['F', 'Pantalla completa (Esc sale)'],
      ['0', 'Ajustar el diagrama a la ventana'],
      ['+ / −', 'Zoom (también con la rueda)'],
      ['1 · 2 · 3', 'Context map: contextos · agregados y casos de uso · APIs y operaciones'],
      ['4 · 5 · 6 · 7', 'Agregados · Flows · Procesos · Workflows'],
      ['E / D', 'EventStorming / volver al diagrama'],
      ['V', 'Vista 3D (placas apiladas, tipo Firefox Tilt)'],
      ['T', 'Árbol del catálogo (con una vista activa)'],
      ['Supr', 'Borrar la selección'],
      ['F2', 'Renombrar el nodo seleccionado'],
      ['Ctrl+Z / Ctrl+Y', 'Deshacer / rehacer'],
      ['Espacio+arrastrar', 'Mover el lienzo'],
      ['Shift+click / arrastrar', 'Multi-selección / banda elástica'],
      ['?', 'Esta ayuda'],
    ];
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._helpOpen = false)}></div>
      <div
        class="relation-picker help-pop"
        style="left: 50%; top: 90px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">Atajos de teclado</div>
        ${rows.map(
          ([keys, what]) => html`
            <div class="help-row"><span class="help-keys">${keys}</span><span>${what}</span></div>
          `,
        )}
      </div>
    `;
  }

  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  private renderDeletePicker() {
    const p = this._deletePicker;
    if (!p) return '';
    const view = (this.model.views ?? []).find((v) => v.id === this._activeViewId);
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._deletePicker = null)}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">¿Eliminar, o solo quitar de la vista?</div>
        <button
          class="picker-item"
          @click=${() => {
            const picked = this._deletePicker!;
            this._deletePicker = null;
            this.command({
              kind: 'remove-view-member',
              id: this._activeViewId,
              targetId: picked.memberId,
            });
          }}
        >
          <span class="abbr">👁</span>
          <span class="name">Quitar de la vista «${view?.name ?? this._activeViewId}»</span>
        </button>
        <button
          class="picker-item"
          @click=${() => {
            const picked = this._deletePicker!;
            this._deletePicker = null;
            this.performDelete(picked.elementType, picked.id, picked.kind);
          }}
        >
          <span class="abbr">🗑</span>
          <span class="name">Eliminar del modelo</span>
        </button>
      </div>
    `;
  }

  private pickExtDepType(type: 'DEPENDS' | 'CQRS'): void {
    const p = this._extDepPicker;
    this._extDepPicker = null;
    if (!p) return;
    const current = (this.model.externalSystemDependencies ?? []).find(
      (d) => d.sourceId === p.sourceId && d.targetId === p.targetId,
    );
    if (current && (current.type ?? 'DEPENDS') === type) return;
    this.command({
      kind: 'add-external-dependency',
      sourceId: p.sourceId,
      targetId: p.targetId,
      type,
    });
  }

  private renderExtDepPicker() {
    const p = this._extDepPicker;
    if (!p) return '';
    const current = (this.model.externalSystemDependencies ?? []).find(
      (d) => d.sourceId === p.sourceId && d.targetId === p.targetId,
    )?.type;
    const options = [
      { type: 'DEPENDS' as const, abbr: 'DEP', name: 'Dependencia simple' },
      { type: 'CQRS' as const, abbr: 'CQRS', name: 'CQRS — consulta sobre sus datos' },
    ];
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._extDepPicker = null)}></div>
      <div
        class="relation-picker"
        style="left:${p.x}px; top:${p.y}px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${options.map(
          (o) => html`
            <button
              class="picker-item ${o.type === (current ?? '') ? 'current' : ''}"
              title=${o.name}
              @click=${() => this.pickExtDepType(o.type)}
            >
              <span class="abbr">${o.abbr}</span>
              <span class="name">${o.name}</span>
            </button>
          `,
        )}
      </div>
    `;
  }

  private renderRelationPicker() {
    const p = this._relationPicker;
    if (!p) return '';
    const current =
      p.mode === 'edit'
        ? this.model.relations.find(
            (r) => r.sourceId === p.sourceId && r.targetId === p.targetId,
          )?.type
        : this._relationType;
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._relationPicker = null)}></div>
      <div
        class="relation-picker"
        style="left:${p.x}px; top:${p.y}px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">
          ${p.mode === 'create' ? 'Tipo de relación' : 'Cambiar tipo'}
        </div>
        ${RELATION_TYPES.map(
          (t) => html`
            <button
              class="picker-item ${t === current ? 'current' : ''}"
              title=${t}
              @click=${() => this.pickRelationType(t)}
            >
              <span class="abbr">${RELATION_META[t].abbr}</span>
              <span class="name">${RELATION_META[t].name}</span>
            </button>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-editor': ModuxEditor;
  }
}
