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
import { uiScene, parseMenuNodeId } from './views/ui.js';
import { mappingsScene } from './views/mappings.js';
import { integrationsScene } from './views/integrations.js';
import type { UiMenuEntryRef, UiComponentNodeRef } from './model.js';
import { autoLayout } from './autolayout.js';
import './modux-canvas.js';
import './modux-tilt.js';
import './modux-figma.js';
import './modux-explorer.js';
import { inverseOf, type UndoHost } from './undo.js';
import { applyConnectionGesture, performDeleteGesture, type GestureHost } from './gestures.js';
import { PALETTE_GROUPS, PALETTE_NEW } from './palette-defs.js';
import { slug } from './ids.js';
import { ModuxPageDesigner } from './modux-page-designer.js';
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

export type ViewId = 'context-map' | 'aggregates' | 'flows' | 'processes' | 'workflows' | 'ui' | 'design' | 'mappings' | 'eventstorming' | 'integrations';


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
    case 'ui-app':
      return { elementType: 'ui-adapter', id };
    case 'page':
      return { elementType: 'page', id };
    case 'service':
      return { elementType: 'service', id };
    case 'actor':
      return { elementType: 'actor', id };
    case 'query-service':
      return { elementType: 'query-service', id };
    case 'scheduled-trigger':
      return { elementType: 'scheduled-trigger', id };
    case 'workflow-gateway':
      return { elementType: 'workflow-gateway', id };
    case 'model':
      return { elementType: 'model', id };
    case 'mapping':
      return { elementType: 'mapping', id };
    case 'component':
      return { elementType: 'component', id };
    case 'external-system':
      return { elementType: 'external-system', id };
    case 'code-module':
      return { elementType: 'code-module', id };
    case 'custom-code':
      return { elementType: 'custom-code', id };
    case 'transformation':
      return { elementType: 'transformation', id };
    case 'etl-flow':
      return { elementType: 'etl-flow', id };
    case 'button-group':
      return { elementType: 'button-group', id };
    case 'identity-provider':
      return { elementType: 'identity-provider', id };
    case 'ai-agent':
      return { elementType: 'ai-agent', id };
    case 'rag':
      return { elementType: 'rag', id };
    case 'mcp-gateway':
      return { elementType: 'mcp-gateway', id };
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

  /** The front door is graphics-first: the context map on the yugo surface. */
  @state() private _view: ViewId = 'context-map';
  /** Context-map detail level: bounded contexts only, or their aggregates + use cases. */
  @state() private _detail: 'contexts' | 'detail' | 'operations' | 'distribution' = 'contexts';
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
  /** The element whose ficha shows in the right drawer (double click opens it). */
  @state() private _drawer: { elementType: string; id: string } | null = null;
  /** The YUGO surface: any view's Scene rendered as the physics organism (Y). */
  @state() private _yugo = true;
  /** The ~/.modux repository catalog, handed down by the host (project references). */
  @property({ attribute: false }) repositories: { id: string; name: string }[] = [];

  /** Mirrors mateu's <html theme="dark"> flag — set by the connected host. */
  @property({ type: Boolean, reflect: true }) dark = false;

  /** Ids issued by palette drops still in flight — the projection hasn't caught up. */
  private _pendingIds = new Set<string>();

  /** The blank-canvas palette auto-open fired already (once per mount). */
  private _paletteOpenedForBlank = false;
  /** Open picker: choosing WHICH project to reference (drop of «Proyecto (catálogo)»). */
  @state() private _repoPicker: { pos: Point } | null = null;
  /** Open picker: a loose step drop asking WHICH workflow adopts it. */
  @state() private _wfStepPicker: { pos: Point; stepType?: string } | null = null;
  /** Editing the condition of one EXCLUSIVE-split branch. */
  @state() private _branchCondEditor: { gatewayId: string; targetId: string; value: string } | null = null;
  @state() private _paletteFilter = '';
  /** Palette tab: brand-new elements, or the model's existing catalog. */
  @state() private _paletteTab: 'new' | 'catalog' = 'new';
  /** The selected content node on the Diseño surface (one across every frame). */
  @state() private _selectedCmp: { pageId: string; componentId: string } | null = null;
  /** Ctrl+C on a node: its subtree, deep-copied, pasteable on any frame. */
  private _cmpClipboard: UiComponentNodeRef | null = null;
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
    /* ── Dark mode: the editor inverts hue-preservingly; the 3D surface is
       dark by design, so the SAME filter applied twice restores it. The
       popovers are position:fixed (outside the filtered subtrees) and get
       their dark clothes by hand. */
    :host([dark]) {
      background: #0f172a;
      border-color: #334155;
    }
    :host([dark]) .toolbar,
    :host([dark]) .canvas-wrap,
    :host([dark]) .hint {
      filter: invert(1) hue-rotate(180deg);
    }
    :host([dark]) modux-tilt {
      filter: invert(1) hue-rotate(180deg);
    }
    :host([dark]) .relation-picker {
      background: #1e293b;
      border-color: #334155;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
    }
    :host([dark]) .picker-item {
      color: #e2e8f0;
    }
    :host([dark]) .picker-item:hover {
      background: #334155;
    }
    :host([dark]) .picker-item.current {
      background: #1e3a5f;
    }
    :host([dark]) .picker-title {
      color: #94a3b8;
    }
    :host([dark]) .picker-item .abbr,
    :host([dark]) .help-keys {
      color: #60a5fa;
    }
    :host([dark]) .help-row {
      color: #e2e8f0;
    }
    :host([dark]) .relation-picker input,
    :host([dark]) .relation-picker select {
      background: #0f172a;
      border-color: #334155;
      color: #e2e8f0;
    }
    .hint {
      font-size: 12px;
      color: #94a3b8;
      padding: 4px 12px;
      border-top: 1px solid #f1f5f9;
    }
    modux-canvas,
    modux-tilt,
    modux-figma,
    modux-explorer {
      flex: 1;
      min-height: 0;
    }
    .canvas-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
    }
    .drawer {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 460px;
      max-width: 55%;
      background: #ffffff;
      border-left: 1px solid #e2e8f0;
      box-shadow: -10px 0 24px rgba(15, 23, 42, 0.08);
      z-index: 25;
      display: flex;
      flex-direction: column;
    }
    .drawer header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-bottom: 1px solid #e2e8f0;
      font: 600 12px system-ui, sans-serif;
      color: #0f172a;
    }
    .drawer header .spacer {
      flex: 1;
    }
    .drawer header button {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 6px;
      padding: 3px 10px;
      font: 11px system-ui, sans-serif;
      color: #475569;
      cursor: pointer;
    }
    .drawer header button:hover {
      background: #f1f5f9;
    }
    .drawer iframe {
      flex: 1;
      width: 100%;
      border: 0;
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
        if (['context-map', 'workflows', 'ui', 'design', 'mappings', 'integrations'].includes(this._view)) {
          e.preventDefault();
          this._paletteOpen = !this._paletteOpen;
        }
        break;
      case 'y':
      case 'Y':
        if (this._view !== 'design') {
          e.preventDefault();
          this._yugo = !this._yugo;
          if (this._yugo) this._tilt = false;
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
        this.renderRoot.querySelector('modux-explorer')?.fit();
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
      case '4': scope('level:distribution'); break;
      case '4': scope('view:aggregates'); break;
      case '5': scope('view:flows'); break;
      case '6': scope('view:processes'); break;
      case '7': scope('view:workflows'); break;
      case '8': scope('view:ui'); break;
      case '9': scope('view:design'); break;
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
    if (changed.has('model')) this._pendingIds.clear();
    // A blank canvas opens the palette by itself: the first gesture is a drop.
    if (changed.has('model') && !this._paletteOpenedForBlank
        && this.model.modules.length === 0 && this.model.externalSystems.length === 0) {
      this._paletteOpen = true;
      this._paletteOpenedForBlank = true;
    }
    if (changed.has('layout')) {
      const detail = normalizeViewLayout(this.layout['context-map']).detail;
      if (detail === 'contexts' || detail === 'detail' || detail === 'operations'
          || detail === 'distribution') {
        this._detail = detail;
      }
    }
  }

  /** Detail level changes persist with the layout, so they survive reloads. */
  private setDetail(detail: 'contexts' | 'detail' | 'operations' | 'distribution'): void {
    if (detail === this._detail) return;
    // First visit to a level: it starts as a copy of what the user is looking
    // at; from then on each level's geometry lives its own life.
    const seed = this.viewLayout('context-map');
    const targetKey = detail === 'contexts' ? 'context-map' : `context-map@${detail}`;
    const raw = normalizeViewLayout(this.layout[targetKey]);
    this._detail = detail;
    // Each level is a working surface: arriving opens the palette, ready to drop.
    this._paletteOpen = true;
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
      this.setDetail(value.slice('level:'.length) as 'contexts' | 'detail' | 'operations' | 'distribution');
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
    const { sourceId, targetId, x, y, connectKind } = e.detail;
    this.applyConnection(sourceId, targetId, x, y, connectKind);
  }

  /** The whole gesture vocabulary, callable from drags AND from palette drops. */

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
      case 'page':
      case 'ui-app':
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



  private inverseOf(c: ModuxCommand): ModuxCommand[] | null {
    return inverseOf(this.gestureHost(), c);
  }

  private applyConnection(
    sourceId: string,
    targetId: string,
    x?: number,
    y?: number,
    connectKind?: string,
  ): void {
    applyConnectionGesture(this.gestureHost(), this._view, sourceId, targetId, x, y, connectKind);
  }

  private performDelete(elementType: string, id: string, kind: string): void {
    performDeleteGesture(this.gestureHost(), this._view, elementType, id, kind);
  }

  /** The thin surface the extracted gesture/undo vocabulary works against. */
  private gestureHost(): GestureHost & UndoHost {
    return {
      model: this.model,
      detail: this._detail,
      command: (c, pushUndo) => this.command(c, pushUndo),
      emit: (name, detail) => this.emit(name, detail),
      sceneFor: (view) => this.sceneFor(view),
      owningProcessOf: (id) => this.owningProcessOf(id),
      owningUseCaseOf: (id) => this.owningUseCaseOf(id),
      owningWorkflowOf: (id) => this.owningWorkflowOf(id),
      owningApiOf: (id) => this.owningApiOf(id),
      menuEntryIn: (appId, itemId) => this.menuEntryIn(appId, itemId),
      newMenuItemId: (label) => this.newMenuItemId(label),
      rebuildComponentOps: (pageId, node, parentId, beforeId, fresh, used) =>
        this.rebuildComponentOps(pageId, node, parentId, beforeId, fresh, used),
      openExtDepPicker: (p) => {
        this._extDepPicker = p;
      },
      nodeClientRect: (nodeId) => {
        const g = this.renderRoot
          .querySelector('modux-canvas')
          ?.renderRoot.querySelector(`g[data-node-id="${nodeId}"]`);
        return g?.getBoundingClientRect();
      },
      clearSelection: () => {
        this._selectedId = null;
      },
    };
  }

  private owningProcessOf(stepId: string) {
    return (this.model.processes ?? []).find((p) => p.steps.some((s) => s.id === stepId));
  }

  private owningUseCaseOf(stepId: string) {
    return this.model.modules
      .flatMap((mo) => mo.useCases ?? [])
      .find((uc) => (uc.steps ?? []).some((st) => st.id === stepId));
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
  /** What «crear vista» works on: the multi-selection, or — on the UI and Diseño
   * views, where one page or app is a perfectly good seed — the single selection. */
  private viewSelection(): string[] {
    if (this._multi.length) return this._multi;
    if (this._selectedId && (this._view === 'ui' || this._view === 'design')) {
      return [this._selectedId];
    }
    return [];
  }

  private memberIdsFromSelection(): string[] {
    // On Diseño the scene is not a Scene: frames ARE pages, ids map directly.
    if (this._view === 'design') {
      const pages = new Set((this.model.pages ?? []).map((x) => x.id));
      return this.viewSelection().filter((id) => pages.has(id));
    }
    const scene = this.sceneFor(this._view);
    const members = new Set<string>();
    for (const id of this.viewSelection()) {
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
        case 'page':
        case 'ui-app':
          members.add(id);
          break;
        case 'menu-item':
        case 'menu-group': {
          const ref = parseMenuNodeId(id);
          if (ref) members.add(ref.appId);
          break;
        }
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
    const id = `view-${slug(name)}`;
    this.command({ kind: 'add-view', id, name, memberIds });
    this._newViewName = '';
    this._multi = [];
    // You created it to work in it: the new view becomes the active one (the
    // canvas scopes as soon as the refreshed model lands).
    this._activeViewId = id;
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
    const uiApps = (this.model.uiApps ?? []).filter((a) => members.has(a.id));
    const menuPageIds = new Set<string>();
    const collectMenuPages = (items?: UiMenuEntryRef[]) => {
      for (const it of items ?? []) {
        if (it.pageId) menuPageIds.add(it.pageId);
        collectMenuPages(it.children);
      }
    };
    uiApps.forEach((a) => collectMenuPages(a.menuItems));
    const pages = (this.model.pages ?? []).filter(
      (x) => members.has(x.id) || menuPageIds.has(x.id),
    );
    const keptAppIds = new Set(uiApps.map((a) => a.id));
    return {
      ...this.model,
      uiApps,
      pages,
      actorAppUses: (this.model.actorAppUses ?? []).filter((u) => keptAppIds.has(u.appId)),
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

  /** elementType → CRUD listing route (mirror of GraphicalEditorPage.CRUD_ROUTES). */
  private static readonly CRUD_ROUTES: Record<string, string> = {
    module: '/modelo/organizacion/modules',
    service: '/modelo/organizacion/services',
    aggregate: '/modelo/domainModel/aggregates',
    entity: '/modelo/domainModel/entities',
    model: '/modelo/domainModel/models',
    flow: '/modelo/patrones/flows',
    workflow: '/modelo/patrones/workflows',
    'workflow-gateway': '/modelo/patrones/workflowGateways',
    'use-case': '/modelo/behaviour/useCases',
    mapping: '/modelo/behaviour/modelMappings',
    'domain-event': '/modelo/domainModel/domainEvents',
    subscription: '/modelo/inbound/subscriptions',
    'scheduled-trigger': '/modelo/inbound/scheduledTriggers',
    projection: '/modelo/behaviour/projections',
    'read-model': '/modelo/patrones/readModels',
    page: '/modelo/inbound/ui/pages',
    component: '/modelo/inbound/ui/components',
    'ui-adapter': '/modelo/inbound/ui/uiAdapters',
    'query-service': '/modelo/outbound/queryServices',
    actor: '/modelo/security/roles',
    'external-system': '/modelo/organizacion/externalSystems',
    'code-module': '/modelo/organizacion/codeModules',
    'custom-code': '/modelo/behaviour/customCodes',
    'transformation': '/modelo/behaviour/transformations',
    'etl-flow': '/modelo/patrones/etlFlows',
    'button-group': '/modelo/inbound/ui/buttonGroups',
    'identity-provider': '/modelo/security/identityProviders',
    'ai-agent': '/modelo/ia/aiAgents',
    'rag': '/modelo/ia/rags',
    'mcp-gateway': '/modelo/ia/mcpGateways',
  };

  /** Opening an element shows its ficha in the right drawer; unmapped kinds still navigate. */
  private openInDrawer(ref: { elementType: string; id: string }): void {
    if (ModuxEditor.CRUD_ROUTES[ref.elementType]) this._drawer = ref;
    else this.emit('modux-activate', ref);
  }

  private renderDrawer() {
    if (!this._drawer) return null;
    const route = ModuxEditor.CRUD_ROUTES[this._drawer.elementType];
    const ref = this._drawer;
    return html`
      <aside class="drawer" @pointerdown=${(e: Event) => e.stopPropagation()}>
        <header>
          <span>${ref.id}</span>
          <span class="spacer"></span>
          <button
            title="Abrir la ficha completa en su página"
            @click=${() => {
              this._drawer = null;
              this.emit('modux-activate', ref);
            }}
          >
            Abrir ficha
          </button>
          <button title="Cerrar" @click=${() => (this._drawer = null)}>✕</button>
        </header>
        <iframe src=${`${route}/${ref.id}/edit`} title=${ref.id}></iframe>
      </aside>
    `;
  }

  private onElementActivated(e: CustomEvent): void {
    // Double-clicking a gateway flips its semantics: join TODAS↔CUALQUIERA,
    // split PARALELO↔EXCLUSIVO — the badge tells which one rules.
    if (this._view === 'workflows' && e.detail.elementType === 'edge' && e.detail.kind === 'wf-link') {
      // doble click en una rama de un split EXCLUSIVO: se edita su condición
      const m = /^wflink:(.+)->(.+)$/.exec(e.detail.id);
      const g = m ? (this.model.workflowGateways ?? []).find((x) => x.id === m[1]) : null;
      if (m && g && g.type === 'SPLIT' && g.semantics === 'EXCLUSIVE') {
        const current = (g.branchConditions ?? []).find((c) => c.targetId === m[2])?.expression ?? '';
        this._branchCondEditor = { gatewayId: g.id, targetId: m[2], value: current };
      }
      return;
    }
    if (this._view === 'workflows' && e.detail.kind === 'workflow-gateway') {
      const g = (this.model.workflowGateways ?? []).find((x) => x.id === e.detail.id);
      if (!g) return;
      const next = g.type === 'SPLIT'
        ? (g.semantics === 'EXCLUSIVE' ? 'PARALLEL' : 'EXCLUSIVE')
        : (g.semantics === 'ANY' ? 'ALL' : 'ANY');
      this.command({ kind: 'set-gateway-semantics', id: g.id, type: next });
      return;
    }
    if (this._view === 'ui' && e.detail.elementType === 'node' && e.detail.kind === 'page') {
      this._view = 'design';
      this._selectedId = e.detail.id;
      return;
    }
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
    if (e.detail.kind === 'invariant') {
      const owner = (this.model.aggregates ?? [])
        .find((a) => (a.invariants ?? []).some((i) => i.id === e.detail.id));
      if (owner) this.openInDrawer({ elementType: 'aggregate', id: owner.id });
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
    if (mapped) this.openInDrawer(mapped);
  }

  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  private newMenuItemId(label: string): string {
    const used = new Set<string>();
    const walk = (items: { id?: string; children?: { id?: string }[] }[] | undefined) => {
      for (const it of items ?? []) {
        if (it.id) used.add(it.id);
        walk((it as { children?: [] }).children);
      }
    };
    (this.model.uiApps ?? []).forEach((a) => walk(a.menuItems));
    const base = `mi-${slug(label)}`;
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    return id;
  }

  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  private componentIn(pageId: string, componentId: string): {
    node: UiComponentNodeRef;
    parentId: string | null;
    beforeId: string | null;
  } | null {
    const page = (this.model.pages ?? []).find((x) => x.id === pageId);
    let found: { node: UiComponentNodeRef; parentId: string | null; beforeId: string | null } | null = null;
    const walk = (items: UiComponentNodeRef[] | undefined, up: string | null) => {
      const list = items ?? [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === componentId) {
          found = { node: list[i], parentId: up, beforeId: list[i + 1]?.id ?? null };
        }
        walk(list[i].children, list[i].id);
      }
    };
    walk(page?.content, null);
    return found;
  }

  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  private rebuildComponentOps(
    pageId: string,
    node: UiComponentNodeRef,
    parentComponentId: string | undefined,
    beforeComponentId: string | null,
    fresh = false,
    used?: Set<string>,
  ): { ops: ModuxCommand[]; rootId: string } {
    const usedIds = used ?? this.allComponentIds();
    const idFor = (n: UiComponentNodeRef): string => {
      if (!fresh) return n.id;
      const base = `cmp-${slug(n.kind)}`;
      let id = base;
      for (let k = 2; usedIds.has(id) || usedIds.has(`${id}-tab-1`); k++) id = `${base}-${k}`;
      usedIds.add(id);
      return id;
    };
    const ops: ModuxCommand[] = [];
    const emitNode = (n: UiComponentNodeRef, parent: string | undefined): string => {
      const id = idFor(n);
      ops.push({ kind: 'add-page-component', pageId, componentId: id, componentKind: n.kind, parentComponentId: parent });
      // add-page-component seeds a tabLayout with «<id>-tab-1/2»: clear them, OUR tabs follow
      if (n.kind === 'tabLayout') {
        ops.push({ kind: 'remove-page-component', pageId, componentId: `${id}-tab-1` });
        ops.push({ kind: 'remove-page-component', pageId, componentId: `${id}-tab-2` });
      }
      ops.push({
        kind: 'set-page-component',
        pageId,
        componentId: id,
        title: n.title ?? null,
        text: n.text ?? null,
        label: n.label ?? null,
        useCaseId: n.useCaseId ?? null,
        mappingId: n.mappingId ?? null,
        modelId: n.modelId ?? null,
        queryServiceId: n.queryServiceId ?? null,
        queryOperationId: n.queryOperationId ?? null,
        fieldId: n.fieldId ?? null,
        stereotype: n.stereotype ?? null,
        colspan: n.colspan ?? null,
      });
      for (const c of n.children ?? []) emitNode(c, id);
      return id;
    };
    const rootId = emitNode(node, parentComponentId);
    if (beforeComponentId) {
      ops.push({
        kind: 'move-page-component',
        pageId,
        componentId: rootId,
        parentComponentId: parentComponentId ?? null,
        beforeComponentId,
      });
    }
    return { ops, rootId };
  }

  private allComponentIds(): Set<string> {
    const used = new Set<string>();
    const walk = (items?: UiComponentNodeRef[]) => {
      for (const it of items ?? []) {
        used.add(it.id);
        walk(it.children);
      }
    };
    (this.model.pages ?? []).forEach((x) => walk(x.content));
    return used;
  }

  private newComponentId(kind: string): string {
    const used = new Set<string>();
    const walk = (items?: { id: string; children?: [] }[]) => {
      for (const it of items ?? []) {
        used.add(it.id);
        walk((it as { children?: [] }).children);
      }
    };
    (this.model.pages ?? []).forEach((x) => walk(x.content as never));
    const base = `cmp-${slug(kind)}`;
    let id = base;
    for (let n = 2; used.has(id) || used.has(`${id}-tab-1`); n++) id = `${base}-${n}`;
    return id;
  }

  /** A menu row dropped on a slot (between options / an app's end) or nested on a row. */
  private onMenuSlotRequested = (e: CustomEvent): void => {
    const { id, appId, beforeId, nestRowId } = e.detail as {
      id: string;
      appId?: string;
      beforeId?: string | null;
      nestRowId?: string;
    };
    const src = parseMenuNodeId(id);
    if (!src?.itemId) return;
    const home = this.menuEntryIn(src.appId, src.itemId);
    if (!home) return;
    const inSubtree = (items: UiMenuEntryRef[] | undefined, needle: string): boolean =>
      (items ?? []).some((it) => it.id === needle || inSubtree(it.children, needle));
    if (nestRowId) {
      const tgt = parseMenuNodeId(nestRowId);
      if (!tgt?.itemId || tgt.itemId === src.itemId) return;
      if (src.appId === tgt.appId && inSubtree(home.entry.children, tgt.itemId)) return;
      this.command({
        kind: 'move-menu-item',
        appId: src.appId,
        toAppId: tgt.appId,
        itemId: src.itemId,
        parentId: tgt.itemId,
      });
      return;
    }
    if (beforeId) {
      const tgt = parseMenuNodeId(beforeId);
      if (!tgt?.itemId || tgt.itemId === src.itemId) return;
      const tgtHome = this.menuEntryIn(tgt.appId, tgt.itemId);
      if (!tgtHome) return;
      // the slot's level must not live inside the dragged subtree
      if (src.appId === tgt.appId && inSubtree(home.entry.children, tgt.itemId)) return;
      if (src.appId === tgt.appId && tgtHome.parentId === home.parentId && home.beforeId === tgt.itemId) {
        return; // already exactly there
      }
      this.command({
        kind: 'move-menu-item',
        appId: src.appId,
        toAppId: tgt.appId,
        itemId: src.itemId,
        parentId: tgtHome.parentId ?? undefined,
        beforeItemId: tgt.itemId,
      });
      return;
    }
    if (!appId) return;
    this.command({ kind: 'move-menu-item', appId: src.appId, toAppId: appId, itemId: src.itemId });
  };

  /** Re-slots a wizard step unless it already sits exactly there. */
  private moveWizardStep(pageId: string, stepKey: string, beforeKey: string | null): void {
    if (beforeKey === stepKey) return;
    const steps = ((this.model.pages ?? []).find((pg) => pg.id === pageId)?.wizardSteps ?? [])
      .map((s) => s.id ?? s.pageId!);
    const at = steps.indexOf(stepKey);
    if (at >= 0 && (beforeKey ? steps[at + 1] === beforeKey : at === steps.length - 1)) return;
    this.command({ kind: 'move-page-wizard-step', pageId, targetId: stepKey, beforeItemId: beforeKey });
  }

  /** A wizard step row dropped on a slot: re-slot it before the target step. */
  private onWizardSlotRequested = (e: CustomEvent): void => {
    const { id, beforeId } = e.detail as { id: string; beforeId?: string | null };
    const src = /^wizrow:([^:]+):(.+)$/.exec(id);
    if (!src) return;
    const before = beforeId ? /^wizrow:[^:]+:(.+)$/.exec(beforeId)?.[1] ?? null : null;
    this.moveWizardStep(src[1], src[2], before);
  };

  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  private menuEntryIn(appId: string, itemId: string): {
    entry: UiMenuEntryRef;
    parentId: string | null;
    beforeId: string | null;
  } | null {
    const app = (this.model.uiApps ?? []).find((a) => a.id === appId);
    let found: { entry: UiMenuEntryRef; parentId: string | null; beforeId: string | null } | null = null;
    const walk = (items: UiMenuEntryRef[] | undefined, up: string | null) => {
      const list = items ?? [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === itemId) {
          found = { entry: list[i], parentId: up, beforeId: list[i + 1]?.id ?? null };
        }
        walk(list[i].children, list[i].id ?? null);
      }
    };
    walk(app?.menuItems, null);
    return found;
  }

  /** Supr borra, Ctrl+C copia el subárbol, Ctrl+V lo pega bajo la selección. */
  private onDesignKeydown = (e: KeyboardEvent): void => {
    const t = e.target as HTMLElement;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
      return;
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && this._selectedCmp) {
      const { pageId, componentId } = this._selectedCmp;
      this._selectedCmp = null;
      this.command({ kind: 'remove-page-component', pageId, componentId });
      e.preventDefault();
      return;
    }
    if (
      (e.key === 'Delete' || e.key === 'Backspace') &&
      !this._selectedCmp &&
      this._selectedId &&
      (this.model.pages ?? []).some((x) => x.id === this._selectedId)
    ) {
      const id = this._selectedId;
      this._selectedId = null;
      this.command({ kind: 'delete-ui-page', id });
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c' && this._selectedCmp) {
      const found = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (found) {
        this._cmpClipboard = JSON.parse(JSON.stringify(found.node));
        this.emit('modux-notice', { message: `Copiado: ${found.node.kind} y sus hijos — Ctrl+V lo pega bajo la selección` });
      }
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v' && this._cmpClipboard) {
      this.pasteComponent();
      e.preventDefault();
    }
  };

  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  private pasteComponent(): void {
    const clip = this._cmpClipboard;
    if (!clip) return;
    let pageId: string | null = null;
    let parentComponentId: string | undefined;
    let beforeComponentId: string | null = null;
    if (this._selectedCmp) {
      const found = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!found) return;
      pageId = this._selectedCmp.pageId;
      const leaf = ModuxPageDesigner.LEAF_KINDS.has(found.node.kind);
      if (leaf) {
        parentComponentId = found.parentId ?? undefined;
        beforeComponentId = found.beforeId;
      } else {
        parentComponentId =
          found.node.kind === 'tabLayout' && clip.kind !== 'tab'
            ? (found.node.children ?? [])[0]?.id
            : found.node.id;
      }
    } else if (this._selectedId && (this.model.pages ?? []).some((x) => x.id === this._selectedId)) {
      pageId = this._selectedId;
    }
    if (!pageId) {
      this.emit('modux-notice', { message: 'Selecciona el nodo (o el frame) donde pegar' });
      return;
    }
    const { ops, rootId } = this.rebuildComponentOps(pageId, clip, parentComponentId, beforeComponentId, true);
    for (const op of ops) this.command(op, false);
    this.pushUndoEntry([{ kind: 'remove-page-component', pageId, componentId: rootId }]);
    this._selectedCmp = { pageId, componentId: rootId };
  }

  /** A node dragged from another frame: recreated there, removed here — one undo. */
  private onComponentTransferred = (e: CustomEvent): void => {
    const { fromPageId, toPageId, componentId, toParentId, beforeComponentId } = e.detail as {
      fromPageId: string; toPageId: string; componentId: string;
      toParentId: string | null; beforeComponentId: string | null;
    };
    const found = this.componentIn(fromPageId, componentId);
    if (!found || fromPageId === toPageId) return;
    const node: UiComponentNodeRef = JSON.parse(JSON.stringify(found.node));
    const { ops } = this.rebuildComponentOps(toPageId, node, toParentId ?? undefined, beforeComponentId);
    for (const op of ops) this.command(op, false);
    this.command({ kind: 'remove-page-component', pageId: fromPageId, componentId }, false);
    this.pushUndoEntry([
      { kind: 'remove-page-component', pageId: toPageId, componentId },
      ...this.rebuildComponentOps(fromPageId, node, found.parentId ?? undefined, found.beforeId).ops,
    ]);
    this._selectedCmp = { pageId: toPageId, componentId };
  };

  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  private renderFigma() {
    const vl = this.viewLayout('design');
    return html`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${vl.nodes}
      .sizes=${vl.sizes ?? {}}
      @frame-resized=${(e: CustomEvent) => {
        const { id, w, h } = e.detail as { id: string; w: number; h: number };
        const current = this.viewLayout('design');
        this.pushUndoEntry([
          { kind: 'resize-node', view: 'design', id, size: current.sizes?.[id] ?? null },
        ]);
        this.writeViewLayout('design', {
          ...current,
          sizes: { ...(current.sizes ?? {}), [id]: { w, h } },
        });
      }}
      .selectedId=${this._selectedId}
      .selectedIds=${this._multi}
      .selectedCmp=${this._selectedCmp}
      @keydown=${this.onDesignKeydown}
      @page-component-selected=${(e: CustomEvent) => {
        this._selectedCmp = e.detail.componentId
          ? { pageId: e.detail.pageId, componentId: e.detail.componentId }
          : null;
      }}
      @page-component-transferred=${this.onComponentTransferred}
      @page-wizard-step-moved=${(e: CustomEvent) =>
        this.moveWizardStep(e.detail.pageId, e.detail.stepKey, e.detail.beforeStepKey ?? null)}
      .models=${this.model.models ?? []}
      .mappings=${this.model.modelMappings ?? []}
      .useCases=${this.model.modules.flatMap((mod) =>
        (mod.useCases ?? []).map((u) => ({ id: u.id, name: u.name })),
      )}
      .queryOps=${this.model.modules.flatMap((mod) =>
        (mod.queryServices ?? []).flatMap((qs) =>
          (qs.operations ?? []).map((op) => ({
            id: op.id,
            name: `${op.name} (${qs.name})`,
            queryServiceId: qs.id,
          })),
        ),
      )}
      @dragover=${(e: DragEvent) => e.preventDefault()}
      @drop=${this.onPaletteDrop}
      @node-moved=${this.onNodeMoved}
      @element-selected=${this.onElementSelected}
      @element-multi-toggled=${this.onMultiToggled}
      @page-renamed=${(e: CustomEvent) =>
        this.command({ kind: 'rename-ui-page', pageId: e.detail.pageId, name: e.detail.name })}
      @page-type-changed=${(e: CustomEvent) =>
        this.command({ kind: 'set-page-type', pageId: e.detail.pageId, pageType: e.detail.pageType })}
      @page-route-changed=${(e: CustomEvent) =>
        this.command({ kind: 'set-page-route', pageId: e.detail.pageId, path: e.detail.route })}
      @page-model-changed=${(e: CustomEvent) =>
        this.command({ kind: 'set-page-model', pageId: e.detail.pageId, modelId: e.detail.modelId })}
      @page-button-added=${(e: CustomEvent) =>
        this.command({
          kind: 'add-page-button',
          pageId: e.detail.pageId,
          useCaseId: e.detail.useCaseId,
          label: e.detail.label,
          type: e.detail.bar,
        })}
      @page-button-changed=${(e: CustomEvent) =>
        this.command({
          kind: 'set-page-button',
          pageId: e.detail.pageId,
          useCaseId: e.detail.useCaseId,
          label: e.detail.label,
          mappingId: e.detail.mappingId,
        })}
      @page-component-config-changed=${(e: CustomEvent) => {
        const { pageId, componentId, ...config } = e.detail;
        this.command({ kind: 'set-page-component', pageId, componentId, ...config });
      }}
      @page-component-removed=${(e: CustomEvent) =>
        this.command({
          kind: 'remove-page-component',
          pageId: e.detail.pageId,
          componentId: e.detail.componentId,
        })}
      @page-component-moved=${(e: CustomEvent) =>
        this.command({
          kind: 'move-page-component',
          pageId: e.detail.pageId,
          componentId: e.detail.componentId,
          parentComponentId: e.detail.toParentId,
          beforeComponentId: e.detail.beforeComponentId,
        })}
      @page-button-removed=${(e: CustomEvent) =>
        this.command({
          kind: 'remove-page-button',
          pageId: e.detail.pageId,
          useCaseId: e.detail.useCaseId,
        })}
      @page-open-crud=${(e: CustomEvent) => {
        this.emit('modux-activate', { elementType: 'page', id: e.detail.pageId });
      }}
      @page-field-config-changed=${(e: CustomEvent) => {
        const { pageId, fieldId, stereotype, colspan, label } = e.detail;
        this.command({ kind: 'set-page-field-config', pageId, fieldId, stereotype, colspan, label });
      }}
      @page-fields-reordered=${(e: CustomEvent) => {
        this.command({ kind: 'set-page-field-order', pageId: e.detail.pageId, fieldIds: e.detail.fieldIds });
      }}
    ></modux-figma>`;
  }

  // ── palette (drag to create / drag to place) ────────────────────────────

  /** Palette entries carry the SAME glyph and stroke colour their node wears on the canvas. */
  /** Section order for the «Nuevos» tab. */
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
        label: 'Apps',
        symbol: 'component',
        color: '#0ea5e9',
        items: (m.uiApps ?? []).map((x) => ({ id: x.id, name: x.title || x.name })),
      },
      {
        label: 'Páginas',
        symbol: 'interface',
        color: '#0284c7',
        items: (m.pages ?? []).map((x) => ({ id: x.id, name: x.name })),
      },
      {
        label: 'Modelos',
        symbol: 'readmodel',
        color: '#0369a1',
        items: (m.models ?? []).map((x) => ({ id: x.id, name: x.name })),
      },
      {
        label: 'Triggers programados',
        symbol: 'clock',
        color: '#d97706',
        items: m.modules.flatMap((mod) =>
          (mod.scheduledTriggers ?? []).map((t) => ({ id: t.id, name: t.name })),
        ),
      },
      {
        label: 'Mapeados',
        symbol: 'flow',
        color: '#7c3aed',
        items: (m.modelMappings ?? []).map((x) => ({ id: x.id, name: x.name })),
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
        label: 'Operaciones de consulta',
        symbol: 'lens',
        color: '#0284c7',
        items: m.modules.flatMap((mod) =>
          (mod.queryServices ?? []).flatMap((qs) =>
            (qs.operations ?? []).map((op) => ({ id: op.id, name: `${op.name} (${qs.name})` })),
          ),
        ),
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
    // Whichever surface is showing takes the drop — canvas and tilt share the API.
    const surface =
      this._view === 'design'
        ? this.renderRoot.querySelector('modux-figma')
        : this._yugo
          ? this.renderRoot.querySelector('modux-explorer')
          : this._tilt
            ? this.renderRoot.querySelector('modux-tilt')
            : this.renderRoot.querySelector('modux-canvas');
    if (!surface) return;
    const pos = surface.sceneFromClient(e.clientX, e.clientY);
    const targetId = surface.nodeIdAtClient(e.clientX, e.clientY);
    const slot =
      this._view === 'design' && 'dropSlotAtClient' in surface
        ? (surface as import('./modux-figma.js').ModuxFigma).dropSlotAtClient(e.clientX, e.clientY)
        : null;
    let payload: { new?: string; existing?: string };
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }
    if (payload.new) this.createFromPalette(payload.new, pos, targetId, slot);
    else if (payload.existing) {
      this.placeExistingFromPalette(payload.existing, pos, targetId, e.clientX, e.clientY, slot);
    }
  }

  /**
   * A name (and its slug id, WITH the kind's prefix) that does not collide with
   * anything already in the model. The pool sweeps every element: testing the raw
   * slug against a partial pool once made a second «Caso de uso» silently reuse
   * the first one's id — and the backend ignores duplicate adds.
   */
  private uniquePaletteName(base: string, prefix: string): { id: string; name: string } {
    // Ids from drops still in flight count as taken: two quick drops of the
    // same type must not collide while the projection catches up.
    const ids = new Set([...this._pendingIds, ...this.sceneFor(this._view).nodes.map((n) => n.id)]);
    const m = this.model;
    for (const pool of [
      m.modules.map((x) => x.id),
      m.modules.flatMap((mo) => (mo.useCases ?? []).map((x) => x.id)),
      m.modules.flatMap((mo) => (mo.domainEvents ?? []).map((x) => x.id)),
      m.modules.flatMap((mo) => (mo.applicationEvents ?? []).map((x) => x.id)),
      m.modules.flatMap((mo) => (mo.readModels ?? []).map((x) => x.id)),
      m.modules.flatMap((mo) => (mo.domainServices ?? []).map((x) => x.id)),
      m.modules.flatMap((mo) => (mo.queryServices ?? []).map((x) => x.id)),
      m.modules.flatMap((mo) => (mo.scheduledTriggers ?? []).map((x) => x.id)),
      (m.aggregates ?? []).map((x) => x.id),
      (m.entities ?? []).map((x) => x.id),
      (m.actors ?? []).map((x) => x.id),
      m.externalSystems.map((x) => x.id),
      m.externalSystems.flatMap((x) => (x.useCases ?? []).map((u) => u.id)),
      m.externalSystems.flatMap((x) => (x.tables ?? []).map((t) => t.id)),
      m.externalSystems.flatMap((x) => (x.mcpServers ?? []).map((s) => s.id)),
      (m.apis ?? []).map((x) => x.id),
      (m.apis ?? []).flatMap((a) => (a.operations ?? []).map((o) => o.id)),
      (m.proxyApis ?? []).map((x) => x.id),
      (m.aiAgents ?? []).map((x) => x.id),
      (m.mcpGateways ?? []).map((x) => x.id),
      (m.rags ?? []).map((x) => x.id),
      (m.workflows ?? []).map((x) => x.id),
      (m.workflows ?? []).flatMap((w) => (w.steps ?? []).map((s) => s.id)),
      (m.etlFlows ?? []).map((x) => x.id),
      (m.identityProviders ?? []).map((x) => x.id),
      (m.notifications ?? []).map((x) => x.id),
      (m.documents ?? []).map((x) => x.id),
      (m.uiApps ?? []).map((x) => x.id),
      (m.pages ?? []).map((x) => x.id),
      (m.codeModules ?? []).map((x) => x.id),
      (m.services ?? []).map((x) => x.id),
      (m.models ?? []).flatMap((mo) => (mo.fields ?? []).map((f) => f.id)),
      (m.customCodes ?? []).map((x) => x.id),
      (m.buttonGroups ?? []).map((x) => x.id),
      (m.workflowGateways ?? []).map((x) => x.id),
    ]) {
      pool.forEach((id) => ids.add(id));
    }
    for (let n = 1; ; n++) {
      const name = n === 1 ? base : `${base} ${n}`;
      const id = `${prefix}${slug(name)}`;
      if (!ids.has(id)) {
        this._pendingIds.add(id);
        return { id, name };
      }
    }
  }

  /** The container chain at a drop target: scene parents — or the explorer's tree. */
  private dropChain(targetId: string | null | undefined): string[] {
    if (!targetId) return [];
    if (this._yugo) {
      const ex = this.renderRoot.querySelector('modux-explorer') as
        | (HTMLElement & { chainOf(id: string): string[] })
        | null;
      return ex?.chainOf(targetId) ?? [targetId];
    }
    const scene = this.sceneFor(this._view);
    const chain: string[] = [];
    for (let cur: string | undefined = targetId; cur; ) {
      chain.push(cur);
      cur = scene.nodes.find((n) => n.id === cur)?.parentId;
    }
    return chain;
  }

  /** The container a child kind needs, resolved from whatever the drop landed on. */
  private dropContainerFor(type: string, targetId: string | null): string | null {
    if (!targetId) return null;
    const chain = this.dropChain(targetId);
    const needsModule = [
      'aggregate', 'use-case', 'policy', 'domain-event',
      'application-event', 'domain-service', 'query-service', 'scheduled-trigger', 'etl-flow',
      'notification', 'document', 'code-module',
    ].includes(type);
    if (needsModule) return chain.find((id) => this.model.modules.some((mo) => mo.id === id)) ?? null;
    if (type === 'invariant') {
      const agg = chain.find((cid) => (this.model.aggregates ?? []).some((a) => a.id === cid));
      if (agg) return agg;
      const mod = chain.find((cid) => this.model.modules.some((mo) => mo.id === cid));
      return (this.model.aggregates ?? []).find((a) => a.moduleId === mod)?.id ?? null;
    }
    if (type === 'read-model') {
      const agg = chain.find((id) => (this.model.aggregates ?? []).some((a) => a.id === id));
      if (agg) return agg;
      const mod = chain.find((id) => this.model.modules.some((mo) => mo.id === id));
      return (this.model.aggregates ?? []).find((a) => a.moduleId === mod)?.id ?? null;
    }
    if (['external-use-case', 'external-table', 'mcp-server'].includes(type)) {
      return chain.find((id) => this.model.externalSystems.some((x) => x.id === id)) ?? null;
    }
    if (type === 'model-field') {
      return chain.find((id) => (this.model.models ?? []).some((mo) => mo.id === id)) ?? null;
    }
    if (type === 'etl-flow' && this._view === 'integrations' && this.model.modules.length === 1) {
      return this.model.modules[0].id;
    }
    if (type === 'ui-button') {
      return chain.find((id) => (this.model.buttonGroups ?? []).some((g) => g.id === id)) ?? null;
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

  private createFromPalette(
    type: string,
    pos: Point,
    targetId: string | null,
    slot: { pageId: string; componentId: string | null; pos: 'before' | 'after' | 'into' } | null = null,
  ): void {
    const def = PALETTE_NEW.find((k) => k.type === type);
    if (!def) return;
    if (type === 'project-reference') {
      if (!this.repositories.length) {
        this.emit('modux-notice', { message: 'No hay repositorios en ~/.modux que referenciar' });
        return;
      }
      this._repoPicker = { pos };
      return;
    }
    if (type === 'custom-code' && this._view === 'design') {
      // dropped ON a component (or a page frame): that piece becomes CUSTOM,
      // delegating in a freshly created piece of hand-written code.
      const m = targetId ? /^cmp:([^:]+):(.+)$/.exec(targetId) : null;
      const pageId = m ? m[1]
        : targetId && (this.model.pages ?? []).some((x) => x.id === targetId) ? targetId : null;
      if (!pageId) {
        this.emit('modux-notice', { message: 'Suelta el custom code sobre una página o un componente' });
        return;
      }
      const { id, name } = this.uniquePaletteName('Custom code', 'cc-');
      this.command({ kind: 'add-custom-code', id, name }, false);
      if (m) {
        this.command({ kind: 'set-page-component-custom-code', pageId, componentId: m[2], targetId: id });
        this.emit('modux-notice', { message: 'Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)' });
      } else {
        this.command({ kind: 'set-page-custom-code', id: pageId, targetId: id });
        this.emit('modux-notice', { message: 'Página CUSTOM — cablea desde su CODE lo que usa (vista UI)' });
      }
      return;
    }
    if (type.startsWith('cmp:')) {
      const componentKind = type.slice(4);
      const m = targetId ? /^cmp:([^:]+):(.+)$/.exec(targetId) : null;
      const pageId = m ? m[1] : targetId && (this.model.pages ?? []).some((x) => x.id === targetId) ? targetId : null;
      if (!pageId) {
        this.emit('modux-notice', { message: 'Suelta el layout/componente sobre una página' });
        return;
      }
      let parentComponentId = m ? m[2] : undefined;
      let beforeComponentId: string | null = null;
      if (componentKind === 'tab') {
        // a tab only lives in a tabLayout: walk up from wherever the drop landed
        let hostId: string | null = null;
        let cur = parentComponentId ? this.componentIn(pageId, parentComponentId) : null;
        while (cur) {
          if (cur.node.kind === 'tabLayout') {
            hostId = cur.node.id;
            break;
          }
          cur = cur.parentId ? this.componentIn(pageId, cur.parentId) : null;
        }
        if (!hostId) {
          this.emit('modux-notice', { message: 'Suelta la pestaña sobre un layout de pestañas' });
          return;
        }
        const host = this.componentIn(pageId, hostId)!.node;
        const componentId = this.newComponentId('tab');
        const title = `Pestaña ${(host.children ?? []).filter((c) => c.kind === 'tab').length + 1}`;
        this.command({ kind: 'add-page-component', pageId, componentId, componentKind: 'tab', parentComponentId: hostId }, false);
        this.command({ kind: 'set-page-component', pageId, componentId, title }, false);
        this.pushUndoEntry([{ kind: 'remove-page-component', pageId, componentId }]);
        return;
      }
      if (slot?.componentId && slot.pos !== 'into') {
        // the drop opened a sibling slot: land beside the hovered node, not inside it
        const hovered = this.componentIn(pageId, slot.componentId);
        if (hovered && hovered.node.kind === 'tab') {
          // nothing slots BETWEEN tabs (headers reorder them): land inside the tab
          parentComponentId = hovered.node.id;
        } else if (hovered) {
          parentComponentId = hovered.parentId ?? undefined;
          beforeComponentId = slot.pos === 'before' ? slot.componentId : hovered.beforeId;
        }
      } else if (parentComponentId) {
        // a tabLayout holds only tabs: dropping on it lands in its active (first) tab
        const found = this.componentIn(pageId, parentComponentId)?.node ?? null;
        if (found?.kind === 'tabLayout' && (found.children ?? [])[0]) {
          parentComponentId = (found.children ?? [])[0].id;
        }
      }
      const componentId = this.newComponentId(componentKind);
      const addCmd: ModuxCommand = {
        kind: 'add-page-component',
        pageId,
        componentId,
        componentKind,
        parentComponentId,
      };
      if (!beforeComponentId) {
        this.command(addCmd);
        return;
      }
      this.command(addCmd, false);
      this.command(
        { kind: 'move-page-component', pageId, componentId, parentComponentId: parentComponentId ?? null, beforeComponentId },
        false,
      );
      this.pushUndoEntry([{ kind: 'remove-page-component', pageId, componentId }]);
      return;
    }

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
        'proxy-api': 'proxy-', workflow: 'wf-', 'ui-app': 'app-',
        'ui-app-orchestrator': 'app-', 'ui-app-masterdetail': 'app-', 'ui-app-vieweditor': 'app-', 'ui-model': 'model-',
        'identity-provider': 'idp-', transformation: 'tf-', 'custom-code': 'cc-',
        'button-group': 'bg-', service: 'svc-',
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
                          : type === 'ui-app'
                            ? { kind: 'create-ui-app', id, name }
                            : type === 'ui-app-orchestrator'
                              ? { kind: 'create-ui-app', id, name, type: 'ORCHESTRATOR' }
                              : type === 'ui-app-masterdetail'
                                ? { kind: 'create-ui-app', id, name, type: 'MASTER_DETAIL' }
                                : type === 'ui-app-vieweditor'
                                  ? { kind: 'create-ui-app', id, name, type: 'VIEW_EDITOR' }
                                  : type === 'ui-model'
                                  ? { kind: 'add-model', id, name }
                                  : type === 'transformation'
                                  ? { kind: 'add-transformation', id, name }
                                  : type === 'custom-code'
                                  ? { kind: 'add-custom-code', id, name }
                                  : type === 'button-group'
                                  ? { kind: 'add-button-group', id, name }
                                  : type === 'identity-provider'
                                  ? { kind: 'add-identity-provider', id, name }
                                  : type === 'service'
                                  ? { kind: 'add-service', id, name }
                                  : {
                                kind: 'add-workflow',
                                id,
                                name,
                                completionEventName: `${name.replace(/\s+/g, '')}Completado`,
                              };
      if (cmd.kind === 'create-ui-app') {
        // Dropped inside a bounded context: the module owns the app from the start.
        const chain = this.dropChain(targetId);
        const moduleId = chain.find((cid) => this.model.modules.some((mo) => mo.id === cid));
        if (moduleId) {
          issue({ ...cmd, moduleId }, id, moduleId);
          return;
        }
      }
      issue(cmd, id);
      return;
    }
    if (type === 'ui-wizard-step') {
      const chain = this.dropChain(targetId);
      const wizardId = chain
        .map((cid) => /^wizrow:([^:]+):/.exec(cid)?.[1] ?? cid)
        .find((cid) => (this.model.pages ?? []).some((pg) => pg.id === cid && pg.type === 'WIZARD'));
      if (!wizardId) {
        this.emit('modux-notice', { message: 'Suelta el paso sobre un wizard' });
        return;
      }
      const steps = (this.model.pages ?? []).find((pg) => pg.id === wizardId)?.wizardSteps ?? [];
      const taken = new Set(steps.map((s) => s.id ?? s.pageId));
      let n = steps.length + 1;
      while (taken.has(`wzs-${n}`)) n++;
      this.command({ kind: 'add-page-wizard-step', pageId: wizardId, itemId: `wzs-${n}`, label: `Paso ${n}` });
      this.emit('modux-notice', { message: 'Paso creado — arrastra su asa hasta la página que lo implementa' });
      return;
    }
    if (type === 'page' || type === 'ui-page-crud' || type === 'ui-page-wizard') {
      const pageType = type === 'ui-page-crud' ? 'CRUD' : type === 'ui-page-wizard' ? 'WIZARD' : 'PAGE';
      const base = pageType === 'CRUD' ? 'CRUD' : pageType === 'WIZARD' ? 'Wizard' : 'Página';
      const { id, name } = this.uniquePaletteName(base, 'page-');
      // Dropped on an app (or on one of its menu entries): the page hangs from its menu.
      const chain = this.dropChain(targetId);
      const appId = chain.find((cid) => (this.model.uiApps ?? []).some((a) => a.id === cid));
      const wizardId = chain
        .map((cid) => /^wizrow:([^:]+):/.exec(cid)?.[1] ?? cid)
        .find((cid) => (this.model.pages ?? []).some((pg) => pg.id === cid && pg.type === 'WIZARD'));
      if (wizardId) {
        // Born INSIDE a wizard: the page and its step arrive together.
        const wizNode = scene.nodes.find((n) => n.id === wizardId);
        if (wizNode) {
          pos.x = wizNode.x + wizNode.w / 2 + 160;
          pos.y = wizNode.y - wizNode.h / 2 + 40;
        }
        this.command({ kind: 'create-ui-page', id, name, pageType }, false);
        this.command({ kind: 'add-page-wizard-step', pageId: wizardId, targetId: id }, false);
        const moveOp = place(id);
        this.pushUndoEntry([{ kind: 'delete-ui-page', id }, moveOp]);
        this.emit('modux-notice', { message: `${name} creada como paso del wizard` });
        return;
      }
      if (appId) {
        // Born from an app's menu: park the page beside the app, not on top of it.
        const appNode = scene.nodes.find((n) => n.id === appId);
        if (appNode) {
          pos.x = appNode.x + appNode.w / 2 + 160;
          pos.y = appNode.y - appNode.h / 2 + 40;
        }
      }
      issue(
        appId
          ? { kind: 'create-ui-page', id, name, pageType, appId, menuLabel: name }
          : { kind: 'create-ui-page', id, name, pageType },
        id,
      );
      return;
    }
    if (type === 'menu-item') {
      const chain = this.dropChain(targetId);
      const appId = chain.find((cid) => (this.model.uiApps ?? []).some((a) => a.id === cid));
      if (!appId) {
        this.emit('modux-notice', { message: 'Suelta la entrada de menú sobre una app' });
        return;
      }
      // labels must not collide: they are what the user reads AND the pre-id identity
      const taken = new Set<string>();
      const walkLabels = (items: { label: string; children?: [] }[] | undefined) => {
        for (const it of items ?? []) {
          taken.add(it.label);
          walkLabels(it.children);
        }
      };
      (this.model.uiApps ?? []).forEach((a) => walkLabels(a.menuItems as never));
      let label = 'Entrada';
      for (let n = 2; taken.has(label); n++) label = `Entrada ${n}`;
      // dropped on an existing entry: the new one nests under it (a submenu)
      const parentNode = chain.map((cid) => parseMenuNodeId(cid)).find(Boolean);
      this.command({
        kind: 'add-menu-item',
        appId,
        label,
        itemId: this.newMenuItemId(label),
        parentId: parentNode?.itemId,
        parentLabel: parentNode?.itemId ? undefined : parentNode?.label,
      });
      return;
    }
    if (type === 'etl-transform') {
      const chain = this.dropChain(targetId);
      const flow = chain
        .map((cid) => (this.model.etlFlows ?? []).find((f) => f.id === cid))
        .find(Boolean);
      if (!flow) {
        this.emit('modux-notice', { message: 'Suelta la transformación sobre un flujo ETL' });
        return;
      }
      const taken = new Set((flow.steps ?? []).map((s) => s.id));
      let n = (flow.steps ?? []).length + 1;
      while (taken.has(`ets-${n}`)) n++;
      this.command({
        kind: 'add-etl-step',
        etlFlowId: flow.id,
        id: `ets-${n}`,
        name: `Transformación ${n}`,
        stepType: 'TRANSFORM',
      });
      this.emit('modux-notice', {
        message: 'Transformación añadida — el mapping o el intent se detallan en su ficha',
      });
      return;
    }
    if (type === 'etl-flow' && !this.dropContainerFor(type, targetId)) {
      // In the open it floats: the pipeline exists before deciding who operates it.
      const loose = this.uniquePaletteName(def.label, 'etl-');
      issue({ kind: 'add-etl-flow', id: loose.id, name: loose.name }, loose.id);
      this.emit('modux-notice', {
        message: 'Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí',
      });
      return;
    }
    if (type === 'workflow-join' || type === 'workflow-split') {
      // Gateways are born LOOSE: no workflow declared — their links will say.
      const { id, name } = this.uniquePaletteName(type === 'workflow-join' ? 'Join' : 'Split', 'wfg-');
      issue({ kind: 'add-workflow-gateway', id, name,
        stepType: type === 'workflow-join' ? 'JOIN' : 'SPLIT' }, id);
      this.emit('modux-notice', {
        message: 'Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)',
      });
      return;
    }
    if (type === 'workflow-step') {
      // A step lives in a workflow, but it lands WHEREVER you drop it: on the
      // workflow or one of its steps it chains; in the open, the only workflow
      // adopts it — or a picker asks which one.
      const stepType = undefined as string | undefined;
      const workflows = this.model.workflows ?? [];
      const chain = this.dropChain(targetId);
      const wfDirect = chain.map((cid) => workflows.find((w) => w.id === cid)).find(Boolean);
      const stepHit = chain
        .map((cid) => {
          const owner = workflows.find((w) => (w.steps ?? []).some((s) => s.id === cid));
          return owner ? { owner, stepId: cid } : null;
        })
        .find(Boolean);
      let wf = wfDirect ?? stepHit?.owner;
      if (!wf && workflows.length === 1) wf = workflows[0];
      if (!wf) {
        if (!workflows.length) {
          this.emit('modux-notice', { message: 'Crea antes un workflow: los pasos viven en uno' });
          return;
        }
        this._wfStepPicker = { pos, stepType };
        return;
      }
      const { id, name } = this.uniquePaletteName(
        stepType === 'JOIN' ? 'Join' : stepType === 'SPLIT' ? 'Split' : 'Paso', 'wfs-');
      // Chained onto a step: land beside it, downstream (dependencies flow left→right).
      if (stepHit) pos = { x: pos.x + 190, y: pos.y };
      issue(
        {
          kind: 'add-workflow-step',
          workflowId: wf.id,
          id,
          name,
          ...(stepType ? { stepType } : {}),
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
    const prefixOf: Record<string, string> = {
      aggregate: 'agg-', 'use-case': 'uc-', policy: 'uc-', 'domain-event': 'ev-',
      'application-event': 'aev-', 'domain-service': 'ds-', 'query-service': 'qs-',
      'scheduled-trigger': 'st-', 'etl-flow': 'etl-', notification: 'ntf-', document: 'doc-',
      'read-model': 'rm-', 'external-use-case': 'xuc-',
      'external-table': 'tbl-', 'mcp-server': 'mcpsrv-', 'code-module': 'cm-',
      'model-field': 'f-', invariant: 'inv-',
    };
    const { id, name } = this.uniquePaletteName(def.label, prefixOf[type] ?? '');
    if (type === 'aggregate') {
      issue({ kind: 'add-aggregate', id, name, moduleId: container }, id, container);
    } else if (type === 'invariant') {
      this.command({ kind: 'add-invariant', aggregateId: container, id, name });
      this.emit('modux-notice', {
        message: `Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado`,
      });
    } else if (type === 'ui-button') {
      const group = (this.model.buttonGroups ?? []).find((g) => g.id === container);
      const taken = new Set((group?.buttons ?? []).map((bt) => bt.id));
      let n2 = (group?.buttons ?? []).length + 1;
      while (taken.has(`btn-${n2}`)) n2++;
      this.command({ kind: 'add-group-button', id: container, itemId: `btn-${n2}`, label: name });
      this.emit('modux-notice', {
        message: 'Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara',
      });
    } else if (type === 'model-field') {
      // the chip's scene id is fld:<modelId>:<fieldId> and its spot is fixed — no layout write
      this.command({ kind: 'add-model-field', modelId: container, fieldId: id, name });
    } else if (type === 'code-module') {
      issue({ kind: 'add-code-module', id, name, moduleId: container }, id, container);
      this.emit('modux-notice', {
        message: 'Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos',
      });
    } else if (type === 'use-case' || type === 'policy') {
      issue(
        { kind: 'add-use-case', id, name, moduleId: container, ...(type === 'policy' ? { policy: true } : {}) },
        id,
        container,
      );
    } else if (type === 'domain-event') {
      issue({ kind: 'add-domain-event', id, name, moduleId: container }, id, container);
    } else if (type === 'application-event') {
      issue({ kind: 'add-application-event', id, name, moduleId: container }, id, container);
    } else if (type === 'domain-service') {
      issue({ kind: 'add-domain-service', id, name, moduleId: container }, id, container);
    } else if (type === 'query-service') {
      issue({ kind: 'add-query-service', id, name, moduleId: container }, id, container);
    } else if (type === 'scheduled-trigger') {
      issue({ kind: 'add-scheduled-trigger', id, name, moduleId: container }, id, container);
      this.emit('modux-notice', {
        message: 'Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara',
      });
    } else if (type === 'notification') {
      issue({ kind: 'add-notification', id, name, moduleId: container }, id, container);
      this.emit('modux-notice', {
        message: 'Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa',
      });
    } else if (type === 'document') {
      issue({ kind: 'add-document', id, name, moduleId: container }, id, container);
      this.emit('modux-notice', {
        message: 'Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)',
      });
    } else if (type === 'etl-flow') {
      issue({ kind: 'add-etl-flow', id, name, moduleId: container }, id, container);
      this.emit('modux-notice', {
        message:
          'Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él',
      });
    } else if (type === 'read-model') {
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
      issue({ kind: 'add-external-use-case', id, name, moduleId: container }, id, container);
    } else if (type === 'external-table') {
      issue({ kind: 'add-external-table', id, name, moduleId: container }, id, container);
    } else if (type === 'mcp-server') {
      issue({ kind: 'add-mcp-server', id, name, moduleId: container }, id, container);
    }
  }

  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  private dropCatalogOnDesign(
    id: string,
    targetId: string | null,
    slot: { pageId: string; componentId: string | null; pos: 'before' | 'after' | 'into' } | null,
  ): void {
    // a mapping dropped on a BUTTON transforms its viewmodel; a USE CASE retargets it
    const btnHit = targetId ? /^btn:([^:]+):(.+)$/.exec(targetId) : null;
    if (btnHit) {
      const mapping = (this.model.modelMappings ?? []).find((mm) => mm.id === id);
      if (mapping) {
        this.command({
          kind: 'set-page-button',
          pageId: btnHit[1],
          useCaseId: btnHit[2],
          label: null,
          mappingId: id,
        });
        this.emit('modux-notice', { message: `El botón mapea con ${mapping.name}` });
        return;
      }
      const newUc = this.model.modules.flatMap((mo) => mo.useCases ?? []).find((u) => u.id === id);
      if (newUc) {
        if (id === btnHit[2]) return;
        const pg = (this.model.pages ?? []).find((x) => x.id === btnHit[1]);
        const btn = (pg?.buttons ?? []).find((x) => x.useCaseId === btnHit[2]);
        if (!btn) return;
        if ((pg?.buttons ?? []).some((x) => x.useCaseId === id)) {
          this.emit('modux-notice', { message: 'La página ya tiene un botón para ese caso de uso' });
          return;
        }
        // retarget = the same button (label, bar, mapping) pointing at the new use case
        this.command({ kind: 'remove-page-button', pageId: btnHit[1], useCaseId: btnHit[2] }, false);
        this.command(
          { kind: 'add-page-button', pageId: btnHit[1], useCaseId: id, label: btn.label, type: btn.bar },
          false,
        );
        if (btn.mappingId) {
          this.command(
            { kind: 'set-page-button', pageId: btnHit[1], useCaseId: id, label: null, mappingId: btn.mappingId },
            false,
          );
        }
        this.pushUndoEntry([
          { kind: 'remove-page-button', pageId: btnHit[1], useCaseId: id },
          { kind: 'add-page-button', pageId: btnHit[1], useCaseId: btnHit[2], label: btn.label, type: btn.bar },
          ...(btn.mappingId
            ? [{ kind: 'set-page-button', pageId: btnHit[1], useCaseId: btnHit[2], label: null, mappingId: btn.mappingId } as ModuxCommand]
            : []),
        ]);
        this.emit('modux-notice', { message: `El botón lanza ahora ${newUc.name}` });
        return;
      }
      this.emit('modux-notice', { message: 'Sobre un botón se sueltan mapeados o casos de uso del Catálogo' });
      return;
    }
    // a use case dropped on a BAR creates its button right there
    const barHit = targetId ? /^bar:([^:]+):(.+)$/.exec(targetId) : null;
    if (barHit) {
      const uc = this.model.modules.flatMap((mo) => mo.useCases ?? []).find((u) => u.id === id);
      if (!uc) {
        this.emit('modux-notice', { message: 'En una barra se sueltan CASOS DE USO del Catálogo' });
        return;
      }
      const pg = (this.model.pages ?? []).find((x) => x.id === barHit[1]);
      if ((pg?.buttons ?? []).some((x) => x.useCaseId === id)) {
        this.emit('modux-notice', { message: 'La página ya tiene un botón para ese caso de uso' });
        return;
      }
      this.command({ kind: 'add-page-button', pageId: barHit[1], useCaseId: id, type: barHit[2] });
      this.emit('modux-notice', { message: `Botón de ${uc.name} en la barra ${barHit[2] === 'bottom' ? 'de abajo' : 'superior'}` });
      return;
    }
    const m = targetId ? /^cmp:([^:]+):(.+)$/.exec(targetId) : null;
    const pageId = m ? m[1] : targetId && (this.model.pages ?? []).some((x) => x.id === targetId) ? targetId : null;
    if (!pageId) {
      this.emit('modux-notice', { message: 'Suelta el elemento sobre una página o uno de sus componentes' });
      return;
    }
    const cmp = m ? this.componentIn(pageId, m[2])?.node ?? null : null;
    const uc = this.model.modules.flatMap((mo) => mo.useCases ?? []).find((u) => u.id === id);
    if (uc) {
      if (cmp?.kind === 'button') {
        this.command({ kind: 'set-page-component', pageId, componentId: cmp.id, useCaseId: id, label: cmp.label ?? uc.name });
        this.emit('modux-notice', { message: `El botón lanza ${uc.name}` });
      } else {
        this.command({ kind: 'add-page-button', pageId, useCaseId: id });
        this.emit('modux-notice', { message: `Botón de ${uc.name} añadido a la página` });
      }
      return;
    }
    const model = (this.model.models ?? []).find((x) => x.id === id);
    if (model) {
      if (cmp?.kind === 'form') {
        this.command({ kind: 'set-page-component', pageId, componentId: cmp.id, modelId: id });
        this.emit('modux-notice', { message: `El formulario edita ${model.name}` });
      } else {
        this.command({ kind: 'set-page-model', pageId, modelId: id });
        this.emit('modux-notice', { message: `${model.name} es el viewmodel de la página` });
      }
      return;
    }
    const mappingDrop = (this.model.modelMappings ?? []).find((mm) => mm.id === id);
    if (mappingDrop && cmp?.kind === 'button') {
      this.command({ kind: 'set-page-component', pageId, componentId: cmp.id, mappingId: id });
      this.emit('modux-notice', { message: `El botón mapea con ${mappingDrop.name}` });
      return;
    }
    const queryOp = this.model.modules
      .flatMap((mo) => (mo.queryServices ?? []).flatMap((qs) => (qs.operations ?? []).map((op) => ({ op, qs }))))
      .find(({ op }) => op.id === id);
    if (queryOp) {
      if (cmp?.kind === 'listing') {
        this.command({
          kind: 'set-page-component',
          pageId,
          componentId: cmp.id,
          queryOperationId: queryOp.op.id,
          queryServiceId: queryOp.qs.id,
        });
      } else {
        this.command({ kind: 'set-page-listing', pageId, queryServiceId: queryOp.qs.id });
      }
      this.emit('modux-notice', { message: `Listado alimentado por ${queryOp.op.name}` });
      return;
    }
    void slot;
    this.emit('modux-notice', {
      message: 'En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)',
    });
  }

  private placeExistingFromPalette(
    id: string,
    pos: Point,
    targetId: string | null,
    clientX: number,
    clientY: number,
    slot: { pageId: string; componentId: string | null; pos: 'before' | 'after' | 'into' } | null = null,
  ): void {
    if (this._view === 'design') {
      this.dropCatalogOnDesign(id, targetId, slot);
      return;
    }
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
    if (!this._paletteOpen || !['context-map', 'workflows', 'ui', 'design', 'mappings', 'integrations'].includes(this._view)) return '';
    const needle = this._paletteFilter.trim().toLowerCase();
    // The workflows view only creates workflow things; everything else is context-map.
    const news = PALETTE_NEW.filter(
      (k) =>
        (this._view === 'workflows'
          ? ['workflow', 'workflow-step', 'workflow-join', 'workflow-split'].includes(k.type)
          : this._view === 'ui'
            ? ['ui-app', 'ui-app-orchestrator', 'ui-app-masterdetail', 'ui-app-vieweditor', 'page', 'ui-page-crud', 'ui-page-wizard', 'ui-wizard-step', 'menu-item', 'ui-model', 'identity-provider', 'custom-code', 'button-group', 'ui-button'].includes(k.type)
            : this._view === 'design'
              ? k.type === 'page' || k.type === 'custom-code' || k.type.startsWith('cmp:')
              : this._view === 'integrations'
                ? ['etl-flow', 'etl-transform', 'external-system', 'external-table'].includes(k.type)
              : this._view === 'mappings'
                ? ['ui-model', 'model-field', 'transformation', 'custom-code'].includes(k.type)
                : !['page', 'menu-item', 'model-field', 'transformation', 'custom-code', 'ui-button'].includes(k.type) && !k.type.startsWith('cmp:')) &&
        (!needle || k.label.toLowerCase().includes(needle)),
    );
    // The workflows view has no catalog section: it always shows the new elements.
    const tab = this._view === 'workflows' ? 'new' : this._paletteTab;
    return html`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? 'shifted' : ''}">
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
                ${PALETTE_GROUPS.map((g) => {
                  const items = news.filter((k) => k.group === g);
                  return items.length
                    ? html`
                        <div class="palette-g">${g}</div>
                        ${items.map(
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
                              <span class="pal-label">${k.label.replace(/^(Layout|Componente) · /, '')}</span>
                            </div>
                          `,
                        )}
                      `
                    : '';
                })}
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
              : view === 'ui'
                ? uiScene(model, vl.nodes)
                : view === 'design'
                  ? { nodes: [], edges: [] }
              : view === 'integrations'
                ? integrationsScene(model, vl.nodes)
              : view === 'mappings'
                ? mappingsScene(model, vl.nodes)
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

  /** Screen space the overlays occupy on the left — fit() centers in what remains. */
  private fitInsets(): { left: number } {
    const paletteVisible =
      this._paletteOpen && ['context-map', 'workflows', 'ui'].includes(this._view);
    const treeVisible = this._treeOpen && !!this._activeViewId;
    // Geometry mirrors the CSS: tree at 8+264, palette 244 wide (shifted past the tree).
    if (treeVisible && paletteVisible) return { left: 280 + 244 + 8 };
    if (treeVisible) return { left: 8 + 264 + 8 };
    if (paletteVisible) return { left: 8 + 244 + 8 };
    return { left: 0 };
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
          ?hidden=${!['context-map', 'workflows', 'ui', 'design', 'mappings', 'integrations'].includes(this._view)}
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
              <option value="level:distribution"
                ?selected=${this._view === 'context-map' && this._detail === 'distribution'}>
                Distribución (módulos y servicios)
              </option>
            </optgroup>
            <optgroup label="Vistas especializadas">
              <option value="view:aggregates" ?selected=${this._view === 'aggregates'}>
                Agregados y referencias
              </option>
              <option value="view:flows" ?selected=${this._view === 'flows'}>Flows</option>
              <option value="view:workflows" ?selected=${this._view === 'workflows'}>
                Workflows
              </option>
              <option value="view:ui" ?selected=${this._view === 'ui'}>UI</option>
              <option value="view:integrations" ?selected=${this._view === 'integrations'}>
                Integraciones
              </option>
              <option value="view:mappings" ?selected=${this._view === 'mappings'}>Mapeados</option>
              <option value="view:design" ?selected=${this._view === 'design'}>
                Diseño (páginas)
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
        ${this.viewSelection().length
          ? html`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                .value=${this._newViewName}
                @input=${(e: Event) => (this._newViewName = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.createViewFromSelection()}
              />
              <button class="tab" title="Crear una vista modux con la selección" @click=${this.createViewFromSelection}>
                ⊞ Vista (${this.viewSelection().length})
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
          @click=${() => {
            this.renderRoot.querySelector('modux-canvas')?.fit();
            this.renderRoot.querySelector('modux-explorer')?.fit();
          }}
        >
          ⌖ Ajustar
        </button>
        <button
          class="tab"
          title="Recolocar los nodos automáticamente (deshacible)"
          ?disabled=${this._yugo}
          @click=${() => void this.runAutoLayout()}
        >
          ✨ Auto-layout
        </button>
        ${this._view === 'workflows'
          && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length)
          ? html`<button
              class="tab"
              title="Procesos y sagas se fusionan en workflows: cadena lineal con rol, plazo y compensación en cada paso"
              @click=${() => {
                if ((this.model.processes ?? []).length) {
                  this.command({ kind: 'migrate-processes-to-workflows' }, false);
                }
                if ((this.model.sagas ?? []).length) {
                  this.command({ kind: 'migrate-sagas-to-workflows' }, false);
                }
              }}
            >
              ⇪ Migrar ${[
                (this.model.processes ?? []).length
                  ? `${(this.model.processes ?? []).length} procesos` : '',
                (this.model.sagas ?? []).length
                  ? `${(this.model.sagas ?? []).length} sagas` : '',
              ].filter(Boolean).join(' y ')}
            </button>`
          : ''}
        <button
          class="tab"
          ?data-active=${this._tilt}
          title=${this._tilt
            ? 'Volver al lienzo editable (V)'
            : 'Vista 3D: el diagrama como placas apiladas por contención (V)'}
          @click=${() => {
            this._tilt = !this._tilt;
            if (this._tilt) this._yugo = false;
          }}
        >
          ⬦ 3D
        </button>
        <button
          class="tab"
          ?disabled=${this._view === 'design'}
          ?data-active=${this._yugo}
          title=${this._yugo
            ? 'Volver al lienzo editable (Y)'
            : 'Superficie yugo: la vista como organismo físico — click expande, shift+arrastrar relaciona (Y)'}
          @click=${() => {
            this._yugo = !this._yugo;
            if (this._yugo) this._tilt = false;
          }}
        >
          ∿ Yugo
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
      ${this.renderDrawer()}
      ${this._view === 'design'
        ? html`${this.renderPalette()}${this.renderFigma()}`
        : this._yugo
        ? html`${this.renderPalette()}<modux-explorer
            class="yugo"
            .scene=${this.sceneFor(this._view)}
            .sceneKey=${`${this._view}:${this._detail}`}
            ?shifted=${this._paletteOpen}
            @dragover=${(e: DragEvent) => e.preventDefault()}
            @drop=${this.onPaletteDrop}
            @delete-requested=${this.onDeleteRequested}
            @delete-selection-requested=${this.onDeleteSelectionRequested}
            @node-renamed=${this.onNodeRenamed}
            @undo-requested=${this.undo}
            @redo-requested=${this.redo}
            @node-activated=${(e: CustomEvent<{ id: string; kind: string }>) => {
              this.onElementActivated(new CustomEvent('element-activated', {
                detail: { elementType: 'node', id: e.detail.id, kind: e.detail.kind },
              }));
            }}
            @explorer-connect=${(e: CustomEvent<{ sourceId: string; targetId: string; x?: number; y?: number }>) => {
              const { sourceId, targetId, x, y } = e.detail;
              // Two bounded contexts: the strategic relation needs its TYPE — the
              // picker opens at the drop point (create, or retype if declared).
              const isModule = (id: string) => this.model.modules.some((mo) => mo.id === id);
              if (this._view === 'context-map' && isModule(sourceId) && isModule(targetId)) {
                const declared = this.model.relations.find(
                  (r) => r.sourceId === sourceId && r.targetId === targetId && r.declared,
                );
                this._relationPicker = {
                  sourceId,
                  targetId,
                  mode: declared ? 'edit' : 'create',
                  x: x ?? this.clientWidth / 2,
                  y: y ?? 120,
                };
                return;
              }
              // the lines mean whatever the ACTIVE view says they mean
              this.applyConnection(sourceId, targetId, x, y);
            }}
            @explorer-create-view=${(e: CustomEvent<{ name: string; members: { id: string; kind: string }[] }>) => {
              // Members are the VIEW-able kinds; finer elements ride along with
              // their (also visible) owning container, like in canvas selections.
              const MEMBER_KINDS = new Set([
                'module', 'external-system', 'aggregate', 'entity', 'process', 'workflow',
                'actor', 'ai-agent', 'rag', 'mcp-gateway', 'api', 'page', 'ui-app',
              ]);
              const memberIds = [...new Set(
                e.detail.members.filter((m) => MEMBER_KINDS.has(m.kind)).map((m) => m.id),
              )];
              if (!memberIds.length) {
                this.emit('modux-notice', { message: 'Despliega algo antes de crear la vista' });
                return;
              }
              const id = `view-${slug(e.detail.name)}`;
              this.command({ kind: 'add-view', id, name: e.detail.name, memberIds });
              this._activeViewId = id;
              this.emit('modux-notice', {
                message: `Vista «${e.detail.name}» creada con lo desplegado (${memberIds.length} miembros)`,
              });
            }}
          ></modux-explorer>`
        : this._tilt
        ? html`
      ${this.renderPalette()}
      <modux-tilt
            @dragover=${(e: DragEvent) => e.preventDefault()}
            @drop=${this.onPaletteDrop}
            .scene=${scene}
            .selectedId=${this._selectedId}
            .connectable=${['context-map', 'workflows', 'ui'].includes(this._view)}
            @connect-requested=${this.onConnectRequested}
            @element-selected=${this.onElementSelected}
            @element-activated=${this.onElementActivated}
            @node-moved=${this.onNodeMoved}
            @delete-requested=${this.onDeleteRequested}
            @delete-selection-requested=${this.onDeleteSelectionRequested}
            @node-renamed=${this.onNodeRenamed}
            @undo-requested=${this.undo}
            @redo-requested=${this.redo}
            @selection-cleared=${() => {
              this._selectedId = null;
              this._multi = [];
              this.emit('modux-select', null);
            }}
          ></modux-tilt>`
        : html`
      ${this._treeOpen && this._activeViewId ? this.renderViewTree() : ''}
      ${this.renderPalette()}
      <modux-canvas
        @dragover=${(e: DragEvent) => e.preventDefault()}
        @drop=${this.onPaletteDrop}
        .fitInsets=${this.fitInsets()}
        .scene=${scene}
        .edgePoints=${this.routedEdgePoints(scene)}
        .selectedId=${this._selectedId}
        .selectedIds=${this._multi}
        .connectable=${['context-map', 'workflows', 'ui'].includes(this._view)}
        @node-moved=${this.onNodeMoved}
        @nodes-moved=${this.onNodesMoved}
        @node-reparent-requested=${this.onNodeReparentRequested}
        @node-collapse-toggled=${this.onNodeCollapseToggled}
        @menu-slot-requested=${this.onMenuSlotRequested}
        @wizard-slot-requested=${this.onWizardSlotRequested}
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
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderWfStepPicker()} ${this.renderBranchCondEditor()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
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

  /** The «which project?» picker: one button per ~/.modux repository. */
  private renderRepoPicker() {
    const p = this._repoPicker;
    if (!p) return '';
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._repoPicker = null)}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
          (r) => html`
            <button
              class="picker-item"
              title=${r.id}
              @click=${() => {
                this._repoPicker = null;
                const id = `proj-${r.id}`;
                this.command({ kind: 'add-project-reference', targetId: r.id, id }, false);
                const current = this.viewLayout(this._view);
                this.writeViewLayout(this._view, {
                  ...current,
                  nodes: { ...current.nodes, [id]: { x: Math.round(p.pos.x), y: Math.round(p.pos.y) } },
                });
                this.pushUndoEntry([
                  { kind: 'remove-external-system', id },
                  { kind: 'move-node', view: this._view, id, pos: null },
                ]);
              }}
            >
              ${r.name}
            </button>
          `,
        )}
      </div>
    `;
  }

  /** The condition editor of one EXCLUSIVE-split branch. */
  private renderBranchCondEditor() {
    const p = this._branchCondEditor;
    if (!p) return '';
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._branchCondEditor = null)}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">Condición de la rama (vacío la quita)</div>
        <input
          style="width: 240px; margin: 6px 10px; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px; font: 12px system-ui;"
          placeholder="p. ej. importe > 1000"
          .value=${p.value}
          @input=${(e: Event) => (p.value = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              this.command({ kind: 'set-gateway-branch-condition', id: p.gatewayId, targetId: p.targetId, text: p.value });
              this._branchCondEditor = null;
            }
            if (e.key === 'Escape') this._branchCondEditor = null;
          }}
        />
        <button
          class="picker-item"
          @click=${() => {
            this.command({ kind: 'set-gateway-branch-condition', id: p.gatewayId, targetId: p.targetId, text: p.value });
            this._branchCondEditor = null;
          }}
        >
          Guardar
        </button>
      </div>
    `;
  }

  /** The «which workflow?» picker for steps dropped in the open. */
  private renderWfStepPicker() {
    const p = this._wfStepPicker;
    if (!p) return '';
    return html`
      <div class="picker-backdrop" @pointerdown=${() => (this._wfStepPicker = null)}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
          (w) => html`
            <button
              class="picker-item"
              @click=${() => {
                const picked = p;
                this._wfStepPicker = null;
                const { id, name } = this.uniquePaletteName(
                  picked.stepType === 'JOIN' ? 'Join' : picked.stepType === 'SPLIT' ? 'Split' : 'Paso',
                  'wfs-');
                this.command(
                  { kind: 'add-workflow-step', workflowId: w.id, id, name,
                    ...(picked.stepType ? { stepType: picked.stepType } : {}) },
                  false,
                );
                const current = this.viewLayout(this._view);
                this.writeViewLayout(this._view, {
                  ...current,
                  nodes: { ...current.nodes, [id]: { x: Math.round(picked.pos.x), y: Math.round(picked.pos.y) } },
                });
                this.pushUndoEntry([
                  { kind: 'remove-workflow-step', workflowId: w.id, id },
                  { kind: 'move-node', view: this._view, id, pos: null },
                ]);
              }}
            >
              ${w.name}
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
