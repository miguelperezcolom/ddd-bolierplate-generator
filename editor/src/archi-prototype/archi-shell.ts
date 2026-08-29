/**
 * Archi-style shell (PROTOTYPE) — four-zone Archi layout over the real
 * `modux-canvas`, with Archi's drawing UX handled INSIDE the canvas (tool mode):
 * pick a tool, click-to-place nodes, click-source→click-target with live rubber
 * line + green/red target feedback, magic connector, create-on-empty, and Archi's
 * validity rule from Archi's real matrix. The shell only owns semantics (validity,
 * menus, model mutation); the canvas owns the gesture + feedback (direct manipulation).
 */
import { LitElement, html, css, nothing, svg, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../modux-canvas.js';
import { SYMBOLS, type CanvasTool, type ModuxCanvas } from '../modux-canvas.js';
import type { Scene, SceneNode, SceneEdge, Point } from '../scene.js';
import { EXAMPLE_SCENE, LAYER, ARCHIMATE_SYMBOL, type LayerKey } from './example-scene.js';
import { validRelations, canDraw, REL_NOTATION, REL_TYPES, type RelOption } from './magic.js';

interface ElementTool { kind: string; label: string; layer: LayerKey; w: number; h: number; container?: boolean; }
const ELEMENT_TOOLS: ElementTool[] = [
  { kind: 'component', label: 'Contexto', layer: 'context', w: 240, h: 130, container: true },
  { kind: 'aggregate', label: 'Agregado', layer: 'domain', w: 160, h: 66 },
  { kind: 'entity', label: 'Entidad', layer: 'domain', w: 160, h: 66 },
  { kind: 'value-object', label: 'Value object', layer: 'domain', w: 150, h: 56 },
  { kind: 'invariant', label: 'Invariante', layer: 'domain', w: 150, h: 56 },
  { kind: 'event', label: 'Evento', layer: 'event', w: 200, h: 62 },
  { kind: 'usecase', label: 'Caso de uso', layer: 'behavior', w: 160, h: 62 },
  { kind: 'service', label: 'Servicio', layer: 'behavior', w: 170, h: 50 },
  { kind: 'person', label: 'Actor', layer: 'behavior', w: 130, h: 74 },
  { kind: 'junction', label: 'Junction', layer: 'behavior', w: 16, h: 16 },
];

/** Non-ArchiMate extras (Archi's Note/Group section of the palette). */
const EXTRA_TOOLS: ElementTool[] = [
  { kind: 'group', label: 'Grupo', layer: 'context', w: 240, h: 150, container: true },
  { kind: 'note', label: 'Nota', layer: 'event', w: 160, h: 64 },
];

function kindLayer(kind: string): LayerKey {
  if (kind === 'component' || kind === 'area' || kind === 'system') return 'context';
  if (kind === 'event') return 'event';
  if (kind === 'usecase' || kind === 'person' || kind === 'service') return 'behavior';
  return 'domain';
}

type Tool =
  | { kind: 'select' }
  | { kind: 'place'; el: ElementTool }
  | { kind: 'connect'; rel: string | null }; // rel null = magic connector

@customElement('archi-shell')
export class ArchiShell extends LitElement {
  @state() private scene: Scene = structuredClone(EXAMPLE_SCENE);
  @state() private selectedId: string | null = null;
  @state() private selectedIds: string[] = [];
  @state() private edgePoints: Record<string, Point[]> = {};
  @state() private collapsed = new Set<string>();
  @state() private tab: 'main' | 'appearance' | 'properties' = 'main';
  @state() private treeQuery = '';

  @state() private tool: Tool = { kind: 'select' };
  @state() private menu: { x: number; y: number; src: SceneNode; tgt: SceneNode; opts: RelOption[] } | null = null;
  @state() private createMenu: { x: number; y: number; src: SceneNode; sx: number; sy: number } | null = null;
  @state() private createExpand: string | null = null;
  @state() private toast: string | null = null;
  @state() private ctx: { x: number; y: number; id: string; isEdge: boolean } | null = null;
  /** Side store for editable properties the SceneNode type doesn't carry (docs, key-value props). */
  @state() private meta: Record<string, { doc: string; props: { k: string; v: string }[] }> = {};
  /** Sticky palette tool (Shift-click keeps the tool selected after use, like Archi). */
  private sticky = false;
  /** Format painter: the fill to stamp onto clicked nodes (null = painter off). */
  @state() private painter: string | null = null;

  private seq = 0;
  private toastTimer = 0;

  connectedCallback() { super.connectedCallback(); window.addEventListener('keydown', this.onKey); }
  disconnectedCallback() { super.disconnectedCallback(); window.removeEventListener('keydown', this.onKey); }
  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { this.resetTool(); return; }
    const path = e.composedPath();
    const tag = (path[0] as HTMLElement | undefined)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    // Copy/paste: the canvas doesn't handle these, so act regardless of focus.
    if ((e.metaKey || e.ctrlKey) && (e.key === 'c' || e.key === 'C')) { this.copy(); return; }
    if ((e.metaKey || e.ctrlKey) && (e.key === 'v' || e.key === 'V')) { e.preventDefault(); this.paste(); return; }
    // The canvas handles its own Del / Ctrl+Z while focused; only act when focus is elsewhere.
    if (path.some((el) => (el as HTMLElement | undefined)?.tagName === 'MODUX-CANVAS')) return;
    if ((e.metaKey || e.ctrlKey) && (e.key === 'z' || e.key === 'Z')) { e.preventDefault(); e.shiftKey ? this.redo() : this.undo(); return; }
    if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || e.key === 'Y')) { e.preventDefault(); this.redo(); return; }
    if (e.key === 'Delete' || e.key === 'Backspace') { if (this.selectedIds.length || this.selectedId) { e.preventDefault(); this.deleteSelected(); } }
  };

  static styles = css`
    :host { display: grid; grid-template-columns: 264px 1fr 232px; grid-template-rows: 40px 1fr 224px;
      grid-template-areas: 'toolbar toolbar toolbar' 'tree canvas palette' 'tree props palette';
      height: 100vh; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; color: #1e293b; background: #eef1f5; }
    .toolbar { grid-area: toolbar; display: flex; align-items: center; gap: 12px; padding: 0 14px;
      background: linear-gradient(#fbfcfe, #eef1f5); border-bottom: 1px solid #cbd5e1; }
    .toolbar .brand { font-weight: 700; color: #0f172a; }
    .toolbar .brand small { font-weight: 500; color: #64748b; margin-left: 6px; }
    .toolbar .hint { font-size: 12px; color: #2563eb; }
    .toolbar .spacer { flex: 1; }
    .toolbar button { font: inherit; border: 1px solid #cbd5e1; background: #fff; color: #334155; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
    .toolbar button.on { background: #2563eb; border-color: #2563eb; color: #fff; }
    .aligngrp { display: inline-flex; align-items: center; gap: 2px; padding: 0 6px; }
    .aligngrp button { padding: 3px 7px; font-size: 14px; line-height: 1; }
    .aligngrp .asep { width: 1px; height: 18px; background: #cbd5e1; margin: 0 4px; }
    .zoombar { position: absolute; right: 12px; top: 12px; z-index: 6; display: flex; flex-direction: column; gap: 3px; }
    .zoombar button { width: 30px; height: 28px; font-size: 15px; border: 1px solid #cbd5e1; background: rgba(255,255,255,.95); color: #334155; border-radius: 6px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,.12); }
    .zoombar button:hover { background: #f1f5f9; }

    .panel { background: #f7f8fa; border: 1px solid #d5dbe3; overflow: hidden; display: flex; flex-direction: column; }
    .panel > header { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #64748b;
      padding: 7px 10px; background: #eef1f5; border-bottom: 1px solid #d5dbe3; }
    .panel > .body { flex: 1; overflow: auto; }

    .tree { grid-area: tree; border-right: 1px solid #cbd5e1; }
    .tree .treesearch { margin: 6px 8px; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px; font: inherit; font-size: 12px; }
    .row { display: flex; align-items: center; gap: 6px; padding: 3px 8px; cursor: pointer; white-space: nowrap; user-select: none; }
    .row:hover { background: #e7edf5; }
    .row.sel { background: #d6e4ff; box-shadow: inset 2px 0 0 #3b82f6; }
    .row .twisty { width: 12px; color: #94a3b8; font-size: 10px; }
    .row .swatch { width: 13px; height: 13px; border-radius: 3px; border: 1px solid rgba(0,0,0,.25); flex: none; }
    .row .lbl { overflow: hidden; text-overflow: ellipsis; }
    .child { padding-left: 16px; }
    .row.folder { font-weight: 600; color: #334155; }
    .row.folder .fic { color: #94a3b8; margin-right: 2px; }
    .row .count { margin-left: auto; color: #94a3b8; font-size: 11px; font-weight: 400; padding-right: 6px; }
    .row .rel-ic { color: #94a3b8; width: 13px; text-align: center; }

    .canvas-wrap { grid-area: canvas; position: relative; overflow: hidden; background: #fff; border-left: 1px solid #d5dbe3; }
    modux-canvas { position: absolute; inset: 0; }
    .legend { position: absolute; left: 10px; bottom: 10px; z-index: 5; background: rgba(255,255,255,.92);
      border: 1px solid #d5dbe3; border-radius: 8px; padding: 8px 10px; display: flex; gap: 14px; font-size: 11px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .legend .k { display: flex; align-items: center; gap: 5px; color: #475569; }
    .legend .sw { width: 12px; height: 12px; border-radius: 3px; border: 1px solid rgba(0,0,0,.25); }

    .palette { grid-area: palette; border-left: 1px solid #cbd5e1; }
    .pgroup { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #94a3b8; padding: 8px 10px 3px; }
    .pitem { display: flex; align-items: center; gap: 7px; padding: 4px 10px; cursor: pointer; }
    .pitem:hover { background: #e7edf5; }
    .pitem.on { background: #dbeafe; box-shadow: inset 2px 0 0 #2563eb; }
    .pitem .sw { width: 13px; height: 13px; border-radius: 3px; flex: none; border: 1px solid rgba(0,0,0,.25); }
    .pitem .dash { width: 20px; flex: none; }
    .pico { flex: none; }
    .prel { flex: none; }
    .menu .mi .pico, .menu .mi .prel, .menu .subl .prel { flex: none; vertical-align: middle; }
    .pitem .lbl { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #334155; }

    .props { grid-area: props; border-top: 1px solid #cbd5e1; border-left: 1px solid #d5dbe3; }
    .tabs { display: flex; gap: 2px; background: #eef1f5; border-bottom: 1px solid #d5dbe3; padding: 4px 8px 0; }
    .tabs button { font: inherit; font-size: 12px; border: 1px solid transparent; border-bottom: none; background: none; color: #64748b;
      padding: 5px 12px; border-radius: 6px 6px 0 0; cursor: pointer; }
    .tabs button.on { background: #f7f8fa; border-color: #d5dbe3; color: #0f172a; font-weight: 600; }
    .form { padding: 12px 14px; display: grid; grid-template-columns: 96px 1fr; gap: 9px 12px; align-items: center; max-width: 640px; }
    .form label { color: #64748b; font-size: 12px; }
    .form input, .form textarea, .form .ro { font: inherit; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 8px; background: #fff; color: #1e293b; }
    .form .ro { background: #f1f5f9; color: #475569; }
    .form textarea { resize: vertical; min-height: 46px; }
    .empty { padding: 22px; color: #94a3b8; }
    .colorrow { display: flex; align-items: center; gap: 8px; }
    .colorrow input[type=color] { width: 34px; height: 26px; padding: 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; }
    .proptable { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; max-width: 520px; }
    .proprow { display: grid; grid-template-columns: 1fr 1fr 28px; gap: 6px; }
    .proprow input { font: inherit; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 8px; }
    .proprow .del { border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; cursor: pointer; color: #64748b; }
    .addprop { align-self: start; font: inherit; font-size: 12px; border: 1px dashed #94a3b8; background: none; color: #2563eb; border-radius: 6px; padding: 5px 10px; cursor: pointer; }
    .ctxback { position: fixed; inset: 0; z-index: 59; }
    .menu .mi.sub { padding-left: 8px; color: #475569; }
    .menu .subl { display: inline-flex; align-items: center; gap: 6px; margin-left: 18px; }

    .menu { position: fixed; z-index: 60; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px;
      box-shadow: 0 8px 28px rgba(0,0,0,.18); padding: 4px; min-width: 190px; font-size: 13px; }
    .menu .mhead { font-size: 11px; color: #94a3b8; padding: 4px 8px; }
    .menu .mi { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 5px; cursor: pointer; }
    .menu .mi:hover { background: #dbeafe; }
    .menu .mi .rev { font-size: 10px; color: #94a3b8; margin-left: auto; }
    .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 70; background: #7f1d1d; color: #fff;
      padding: 8px 14px; border-radius: 8px; font-size: 13px; box-shadow: 0 6px 20px rgba(0,0,0,.2); }
  `;

  // ---- helpers -------------------------------------------------------------
  private node(id: string | null) { return this.scene.nodes.find((n) => n.id === id) ?? null; }
  private selectedNode() { return this.node(this.selectedId); }
  private select(id: string | null) { this.selectedId = id; this.selectedIds = id ? [id] : []; this.ctx = null; }
  /** Ctrl/Cmd-click: add or remove from the selection; the clicked node becomes primary. */
  private toggleSel(id: string) {
    const has = this.selectedIds.includes(id);
    this.selectedIds = has ? this.selectedIds.filter((x) => x !== id) : [...this.selectedIds, id];
    this.selectedId = this.selectedIds.includes(id) ? id : (this.selectedIds[this.selectedIds.length - 1] ?? null);
  }
  private onMultiToggle = (e: Event) => this.toggleSel((e as CustomEvent).detail.id);
  private onBoxed = (e: Event) => { const ids = (e as CustomEvent).detail.ids as string[]; this.selectedIds = ids; this.selectedId = ids[0] ?? null; };
  private onSelCleared = () => { this.selectedIds = []; this.selectedId = null; };
  private resetTool() { this.tool = { kind: 'select' }; this.menu = null; this.createMenu = null; this.createExpand = null; this.sticky = false; this.ctx = null; this.painter = null; }
  /** Select a palette tool; Shift-click makes it sticky (stays active after one use). */
  private pickTool(t: Tool, e: MouseEvent) { this.sticky = e.shiftKey; this.tool = t; this.menu = null; this.createMenu = null; }
  private metaOf(id: string) { return this.meta[id] ?? { doc: '', props: [] }; }
  private patchMeta(id: string, patch: Partial<{ doc: string; props: { k: string; v: string }[] }>) {
    this.meta = { ...this.meta, [id]: { ...this.metaOf(id), ...patch } };
  }
  private flash(msg: string) {
    this.toast = msg; clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => (this.toast = null), 2600);
  }
  private validator = (s: string, t: string, rel: string | null) =>
    rel === null ? validRelations(s, t).length > 0 : canDraw(rel, s, t) !== null;

  /** Map the shell's tool to the canvas's tool contract. */
  private get canvasTool(): CanvasTool {
    const t = this.tool;
    if (t.kind === 'place') return { kind: 'place', nodeKind: t.el.kind, w: t.el.w, h: t.el.h };
    if (t.kind === 'connect') return { kind: 'connect', rel: t.rel };
    return { kind: 'select' };
  }

  // ---- editing loop: apply the canvas's mutations + undo/redo -------------
  private history: { scene: Scene; edgePoints: Record<string, Point[]> }[] = [];
  private future: { scene: Scene; edgePoints: Record<string, Point[]> }[] = [];
  private snap() { return { scene: structuredClone(this.scene), edgePoints: structuredClone(this.edgePoints) }; }
  /** Call before any model mutation so it can be undone. */
  private commit() { this.history = [...this.history, this.snap()].slice(-60); this.future = []; }
  private undo() {
    const prev = this.history.at(-1); if (!prev) return;
    this.future = [this.snap(), ...this.future];
    this.history = this.history.slice(0, -1);
    this.scene = prev.scene; this.edgePoints = prev.edgePoints;
  }
  private redo() {
    const nxt = this.future[0]; if (!nxt) return;
    this.history = [...this.history, this.snap()];
    this.future = this.future.slice(1);
    this.scene = nxt.scene; this.edgePoints = nxt.edgePoints;
  }

  private patchNodes(fn: (n: SceneNode) => SceneNode) { this.scene = { ...this.scene, nodes: this.scene.nodes.map(fn) }; }
  private descendantsOf(id: string): SceneNode[] {
    const out: SceneNode[] = [], stack = [id];
    while (stack.length) {
      const pid = stack.pop()!;
      for (const n of this.scene.nodes) if (n.parentId === pid) { out.push(n); stack.push(n.id); }
    }
    return out;
  }
  private moveNodes(moves: { id: string; x: number; y: number }[]) {
    this.commit();
    // Moving a container carries its whole subtree by the same delta.
    const all = new Map(moves.map((mv) => [mv.id, mv]));
    for (const mv of moves) {
      const n = this.node(mv.id); if (!n) continue;
      const dx = mv.x - n.x, dy = mv.y - n.y;
      if (dx === 0 && dy === 0) continue;
      for (const d of this.descendantsOf(mv.id)) all.set(d.id, { id: d.id, x: d.x + dx, y: d.y + dy });
    }
    this.patchNodes((n) => (all.has(n.id) ? { ...n, x: all.get(n.id)!.x, y: all.get(n.id)!.y } : n));
  }
  /** Align the multi-selection to the primary selection's edge/centre (Archi's align tools). */
  private align(mode: 'left' | 'centerH' | 'right' | 'top' | 'middleV' | 'bottom') {
    const primary = this.node(this.selectedId);
    if (!primary || this.selectedIds.length < 2) return;
    const moves = this.selectedIds.map((id) => this.node(id)).filter((n): n is SceneNode => !!n).map((n) => {
      let { x, y } = n;
      if (mode === 'left') x = primary.x - primary.w / 2 + n.w / 2;
      else if (mode === 'centerH') x = primary.x;
      else if (mode === 'right') x = primary.x + primary.w / 2 - n.w / 2;
      else if (mode === 'top') y = primary.y - primary.h / 2 + n.h / 2;
      else if (mode === 'middleV') y = primary.y;
      else if (mode === 'bottom') y = primary.y + primary.h / 2 - n.h / 2;
      return { id: n.id, x, y };
    });
    this.moveNodes(moves);
  }
  private onNodeMoved = (e: Event) => { const d = (e as CustomEvent).detail; this.moveNodes([d]); this.maybeNest(d.id); };
  private onNodesMoved = (e: Event) => this.moveNodes((e as CustomEvent).detail.moves);

  // Dropping a node inside a container simply nests it (no relationship dialog).
  private setParentId(id: string, parentId: string | undefined) { this.patchNodes((n) => (n.id === id ? { ...n, parentId } : n)); }
  private containerAt(node: SceneNode) {
    return this.scene.nodes.find((c) => c.container && c.id !== node.id && c.id !== node.parentId
      && Math.abs(node.x - c.x) < c.w / 2 && Math.abs(node.y - c.y) < c.h / 2);
  }
  private maybeNest(id: string) {
    const n = this.node(id); if (!n) return;
    const c = this.containerAt(n);
    if (c) this.setParentId(id, c.id);
  }
  private onNodeResized = (e: Event) => {
    const d = (e as CustomEvent).detail; this.commit();
    this.patchNodes((n) => (n.id === d.id ? { ...n, x: d.x, y: d.y, w: d.w, h: d.h } : n));
  };
  private onNodeRenamed = (e: Event) => {
    const d = (e as CustomEvent).detail; this.commit();
    this.patchNodes((n) => (n.id === d.id ? { ...n, label: d.name } : n));
  };
  private onCollapseToggled = (e: Event) => {
    const id = (e as CustomEvent).detail.id; this.commit();
    this.patchNodes((n) => (n.id === id ? { ...n, collapsed: !n.collapsed } : n));
  };
  private removeElements(ids: string[], commit = true) {
    if (commit) this.commit();
    const set = new Set(ids);
    const gone = new Set(this.scene.nodes.filter((n) => set.has(n.id) || (n.parentId && set.has(n.parentId))).map((n) => n.id));
    const nodes = this.scene.nodes.filter((n) => !gone.has(n.id));
    const edges = this.scene.edges.filter((ed) => !set.has(ed.id) && !gone.has(ed.sourceId) && !gone.has(ed.targetId));
    this.scene = { ...this.scene, nodes, edges };
    if (this.selectedId && (set.has(this.selectedId) || gone.has(this.selectedId))) this.selectedId = null;
    this.selectedIds = this.selectedIds.filter((id) => !set.has(id) && !gone.has(id));
  }
  private onDeleteReq = (e: Event) => this.removeElements([(e as CustomEvent).detail.id]);
  private onDeleteSel = (e: Event) => this.removeElements(((e as CustomEvent).detail.items as { id: string }[]).map((i) => i.id));
  private deleteSelected() {
    const ids = this.selectedIds.length ? this.selectedIds : this.selectedId ? [this.selectedId] : [];
    if (ids.length) this.removeElements(ids);
  }

  private clipboard: { nodes: SceneNode[]; edges: SceneEdge[] } | null = null;
  private copy() {
    const ids = new Set(this.selectedIds.length ? this.selectedIds : this.selectedId ? [this.selectedId] : []);
    if (!ids.size) return;
    const nodes = this.scene.nodes.filter((n) => ids.has(n.id));
    const edges = this.scene.edges.filter((e) => ids.has(e.sourceId) && ids.has(e.targetId));
    this.clipboard = structuredClone({ nodes, edges });
  }
  private paste() {
    if (!this.clipboard?.nodes.length) return;
    this.commit();
    const idMap = new Map<string, string>();
    this.clipboard.nodes.forEach((n) => idMap.set(n.id, `${n.kind}-${++this.seq}`));
    const newNodes = this.clipboard.nodes.map((n) => ({
      ...structuredClone(n), id: idMap.get(n.id)!, x: n.x + 24, y: n.y + 24,
      parentId: n.parentId && idMap.has(n.parentId) ? idMap.get(n.parentId) : undefined,
    }));
    const newEdges = this.clipboard.edges.map((e) => ({
      ...structuredClone(e), id: `edge-${++this.seq}`, sourceId: idMap.get(e.sourceId)!, targetId: idMap.get(e.targetId)!,
    }));
    this.scene = { ...this.scene, nodes: [...this.scene.nodes, ...newNodes], edges: [...this.scene.edges, ...newEdges] };
    this.selectedIds = newNodes.map((n) => n.id);
    this.selectedId = newNodes[0]?.id ?? null;
  }

  private get canvasEl() { return this.renderRoot.querySelector('modux-canvas') as ModuxCanvas | null; }
  private onContextMenu = (e: MouseEvent) => {
    const id = this.canvasEl?.nodeIdAtClient(e.clientX, e.clientY);
    if (!id) { this.ctx = null; return; }
    e.preventDefault();
    this.select(id);
    this.ctx = { x: e.clientX, y: e.clientY, id, isEdge: false };
  };
  private ctxRename() {
    const id = this.ctx?.id; this.ctx = null; if (!id) return;
    this.select(id);
    const c = this.canvasEl; c?.focus();
    requestAnimationFrame(() => c?.dispatchEvent(new KeyboardEvent('keydown', { key: 'F2', bubbles: true, composed: true })));
  }
  private ctxDelete() { const id = this.ctx?.id; this.ctx = null; if (id) this.removeElements([id]); }
  private ctxUnnest() { const id = this.ctx?.id; this.ctx = null; if (!id) return; this.commit(); this.setParentId(id, undefined); }

  /**
   * ARM (Automatic Relationship Management): a relation between a container and its
   * directly-nested child is implicit — the nesting already expresses it — so it's
   * hidden on the canvas while kept in the model (still listed in the Relations folder).
   */
  private get displayScene(): Scene {
    const nested = (e: SceneEdge) => {
      const s = this.node(e.sourceId), t = this.node(e.targetId);
      return !!s && !!t && (t.parentId === s.id || s.parentId === t.id);
    };
    const edges = this.scene.edges.filter((e) => !nested(e));
    return edges.length === this.scene.edges.length ? this.scene : { ...this.scene, edges };
  }

  private onCanvasSelected(e: Event) {
    const d = (e as CustomEvent).detail;
    if (d?.elementType === 'node') {
      if (this.painter !== null) { this.commit(); this.patchNodes((n) => (n.id === d.id ? { ...n, fill: this.painter! } : n)); return; }
      this.select(d.id);
    } else if (d?.elementType === 'edge') { this.selectedId = d.id; this.selectedIds = []; this.ctx = null; }
  }
  private toggleFormatPainter() {
    if (this.painter !== null) { this.painter = null; return; }
    const n = this.selectedNode();
    if (n?.fill) this.painter = n.fill;
  }

  private rename(name: string) {
    const id = this.selectedId; if (!id) return;
    this.patchNodes((n) => (n.id === id ? { ...n, label: name } : n));
  }
  private setFill(v: string) {
    const id = this.selectedId; if (!id) return;
    this.patchNodes((n) => (n.id === id ? { ...n, fill: v } : n));
  }
  private selectedEdge() { return this.scene.edges.find((e) => e.id === this.selectedId) ?? null; }
  private setDoc(v: string) { const id = this.selectedId; if (id) this.patchMeta(id, { doc: v }); }
  private addProp() { const id = this.selectedId; if (id) this.patchMeta(id, { props: [...this.metaOf(id).props, { k: '', v: '' }] }); }
  private setProp(i: number, field: 'k' | 'v', v: string) {
    const id = this.selectedId; if (!id) return;
    this.patchMeta(id, { props: this.metaOf(id).props.map((p, j) => (j === i ? { ...p, [field]: v } : p)) });
  }
  private removeProp(i: number) {
    const id = this.selectedId; if (!id) return;
    this.patchMeta(id, { props: this.metaOf(id).props.filter((_, j) => j !== i) });
  }
  private renderPropsTable() {
    const id = this.selectedId; const m = id ? this.metaOf(id) : { props: [] };
    return html`<div class="proptable">
      ${m.props.map((p, i) => html`<div class="proprow">
        <input placeholder="clave" .value=${p.k} @input=${(e: Event) => this.setProp(i, 'k', (e.target as HTMLInputElement).value)} />
        <input placeholder="valor" .value=${p.v} @input=${(e: Event) => this.setProp(i, 'v', (e.target as HTMLInputElement).value)} />
        <button class="del" @click=${() => this.removeProp(i)}>✕</button></div>`)}
      <button class="addprop" @click=${() => this.addProp()}>+ Añadir propiedad</button></div>`;
  }
  private renderEdgeProps(edge: SceneEdge) {
    const s = this.node(edge.sourceId), t = this.node(edge.targetId), m = this.metaOf(edge.id);
    if (this.tab === 'properties') return this.renderPropsTable();
    if (this.tab === 'appearance')
      return html`<div class="form"><label>Tipo de línea</label><div class="ro">${(REL_NOTATION[edge.kind]?.dashed ? 'discontinua' : 'sólida')}</div>
        <label>Color</label><div class="ro">#5C5C5C (notación ArchiMate)</div></div>`;
    return html`<div class="form">
      <label>Relación</label><div class="ro">${REL_NOTATION[edge.kind]?.label ?? edge.kind}</div>
      <label>Origen</label><div class="ro">${s?.label ?? '—'}</div>
      <label>Destino</label><div class="ro">${t?.label ?? '—'}</div>
      <label>Documentación</label><textarea placeholder="Descripción de la relación…" .value=${m.doc} @input=${(e: Event) => this.setDoc((e.target as HTMLTextAreaElement).value)}></textarea></div>`;
  }

  // ---- canvas tool events --------------------------------------------------
  private onPlace = (e: Event) => {
    const d = (e as CustomEvent).detail as { nodeKind: string; w: number; h: number; x: number; y: number };
    const el = ELEMENT_TOOLS.find((x) => x.kind === d.nodeKind)
      ?? EXTRA_TOOLS.find((x) => x.kind === d.nodeKind)
      ?? { kind: d.nodeKind, label: d.nodeKind, layer: 'domain', w: d.w, h: d.h } as ElementTool;
    this.commit();
    this.addNodeAt(el, d.x, d.y);
    if (!this.sticky) this.tool = { kind: 'select' };
  };
  private onCommitted = (e: Event) => {
    const d = (e as CustomEvent).detail as { sourceId: string; targetId: string; rel: string | null; x: number; y: number };
    const src = this.node(d.sourceId)!, tgt = this.node(d.targetId)!;
    if (d.rel === null) {
      const opts = validRelations(src.kind, tgt.kind);
      if (!opts.length) { this.flash(`Archi no permite ninguna relación entre «${src.label}» y «${tgt.label}»`); return; }
      this.menu = { x: d.x, y: d.y, src, tgt, opts };
    } else {
      const dir = canDraw(d.rel, src.kind, tgt.kind);
      if (dir) { this.commit(); this.addEdge(d.rel, dir === 'forward' ? src : tgt, dir === 'forward' ? tgt : src); }
    }
  };
  private onRejected = (e: Event) => {
    const d = (e as CustomEvent).detail as { sourceId: string; targetId: string; rel: string };
    const src = this.node(d.sourceId), tgt = this.node(d.targetId);
    this.flash(`«${REL_NOTATION[d.rel]?.label ?? d.rel}» no es válida entre «${src?.label}» y «${tgt?.label}»`);
  };
  private onConnectEmpty = (e: Event) => {
    const d = (e as CustomEvent).detail as { sourceId: string; x: number; y: number; sceneX: number; sceneY: number };
    const src = this.node(d.sourceId); if (!src) return;
    this.createMenu = { x: d.x, y: d.y, src, sx: d.sceneX, sy: d.sceneY };
  };

  private addNodeAt(el: ElementTool, x: number, y: number): SceneNode {
    const lay = LAYER[el.layer];
    const isGroup = el.kind === 'group';
    const n: SceneNode = {
      id: `${el.kind}-${++this.seq}`, label: el.label, kind: el.kind, symbol: ARCHIMATE_SYMBOL[el.kind] ?? el.kind,
      x, y, w: el.w, h: el.h,
      fill: el.kind === 'note' ? '#FEF9C3' : isGroup ? '#F8FAFC' : lay.fill, stroke: lay.stroke,
      ...(el.container ? { container: true, collapsible: true } : {}),
      ...(isGroup ? { dashed: true } : {}),
    };
    this.scene = { ...this.scene, nodes: [...this.scene.nodes, n] };
    this.select(n.id);
    return n;
  }

  private addEdge(rel: string, a: SceneNode, b: SceneNode) {
    const note = REL_NOTATION[rel] ?? {};
    const edge = { id: `edge-${++this.seq}`, sourceId: a.id, targetId: b.id, kind: rel, ...note } as SceneEdge;
    this.scene = { ...this.scene, edges: [...this.scene.edges, edge] };
  }

  private pickFromMenu(o: RelOption) {
    if (!this.menu) return;
    const { src, tgt } = this.menu;
    this.commit();
    this.addEdge(o.type, o.reverse ? tgt : src, o.reverse ? src : tgt);
    this.menu = null;
  }

  private toggleCreateExpand(kind: string) { this.createExpand = this.createExpand === kind ? null : kind; }
  /** Cascade pick: create the new element at the drop point and (optionally) the chosen relation. */
  private pickCascade(el: ElementTool, o: RelOption | null) {
    if (!this.createMenu) return;
    const { src, sx, sy } = this.createMenu;
    this.commit();
    const n = this.addNodeAt(el, sx, sy);
    if (o) this.addEdge(o.type, o.reverse ? n : src, o.reverse ? src : n);
    this.createMenu = null; this.createExpand = null;
  }

  // ---- tree (Archi-style: folders by layer + a Relations folder) ----------
  private toggle(id: string) { const n = new Set(this.collapsed); n.has(id) ? n.delete(id) : n.add(id); this.collapsed = n; }

  private treeRow(n: SceneNode): TemplateResult {
    const sw = LAYER[kindLayer(n.kind)];
    return html`<div class="row child ${this.selectedIds.includes(n.id) || this.selectedId === n.id ? 'sel' : ''}"
         @click=${(e: MouseEvent) => (e.ctrlKey || e.metaKey ? this.toggleSel(n.id) : this.select(n.id))}>
      <span class="twisty"></span>
      <span class="swatch" style="background:${sw.fill};border-color:${sw.stroke}"></span>
      <span class="lbl">${n.label}</span></div>`;
  }

  private folder(key: string, label: string, rows: TemplateResult[], count: number): TemplateResult {
    const collapsed = this.collapsed.has('f:' + key);
    return html`
      <div class="row folder" @click=${() => this.toggle('f:' + key)}>
        <span class="twisty">${collapsed ? '▶' : '▼'}</span><span class="fic">▸</span>
        <span class="lbl">${label}</span><span class="count">${count}</span>
      </div>
      ${collapsed ? nothing : rows}`;
  }

  private renderTree(): TemplateResult {
    const q = this.treeQuery.trim().toLowerCase();
    const layers: LayerKey[] = ['context', 'domain', 'event', 'behavior'];
    return html`
      ${layers.map((fk) => {
        const nodes = this.scene.nodes
          .filter((n) => kindLayer(n.kind) === fk && !['junction', 'note', 'group'].includes(n.kind))
          .filter((n) => !q || n.label.toLowerCase().includes(q))
          .sort((a, b) => a.label.localeCompare(b.label));
        if (q && !nodes.length) return nothing;
        return this.folder(fk, LAYER[fk].name, nodes.map((n) => this.treeRow(n)), nodes.length);
      })}
      ${(() => {
        const edges = this.scene.edges
          .map((e) => ({ e, s: this.node(e.sourceId), t: this.node(e.targetId) }))
          .filter(({ s, t }) => s && t)
          .map(({ e, s, t }) => ({ e, text: `${s!.label} — ${REL_NOTATION[e.kind]?.label ?? e.kind} → ${t!.label}` }))
          .filter(({ text }) => !q || text.toLowerCase().includes(q));
        if (q && !edges.length) return nothing;
        const rows = edges.map(({ e, text }) => html`<div class="row child ${this.selectedId === e.id ? 'sel' : ''}"
            @click=${() => { this.selectedId = e.id; this.selectedIds = []; }}>
          <span class="twisty"></span><span class="rel-ic">╱</span><span class="lbl">${text}</span></div>`);
        return this.folder('rel', 'Relaciones', rows, edges.length);
      })()}`;
  }

  // ---- palette -------------------------------------------------------------
  /** ArchiMate type icon for a node kind — the same glyph the canvas draws. */
  private elIcon(kind: string) {
    if (kind === 'junction') return svg`<svg class="pico" viewBox="0 0 12 12" width="17" height="17"><circle cx="6" cy="6" r="3.2" fill="#475569"/></svg>`;
    const glyph = SYMBOLS[ARCHIMATE_SYMBOL[kind] ?? kind];
    return glyph
      ? svg`<svg class="pico" viewBox="0 0 12 12" width="17" height="17"><g fill="none" stroke="#475569" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">${glyph}</g></svg>`
      : svg`<svg class="pico" width="17" height="17"></svg>`;
  }
  /** ArchiMate relationship notation preview: the line plus its start/end decorations. */
  private relPreview(rel: string) {
    const n = REL_NOTATION[rel] ?? {};
    const s = '#475569';
    const dash = n.dashArray ?? (n.dashed ? '4 3' : '');
    const x1 = n.markerStart ? 11 : 4, x2 = n.markerEnd ? 33 : 40;
    const startM = n.markerStart === 'diamond' ? svg`<path d="M3 7 L7 4 L11 7 L7 10 Z" fill=${s}/>`
      : n.markerStart === 'diamond-hollow' ? svg`<path d="M3 7 L7 4 L11 7 L7 10 Z" fill="#fff" stroke=${s} stroke-width="1"/>`
      : n.markerStart === 'ball' ? svg`<circle cx="4" cy="7" r="2.3" fill=${s}/>` : svg``;
    const endM = n.markerEnd === 'arrow' ? svg`<path d="M33 3.5 L41 7 L33 10.5 Z" fill=${s}/>`
      : n.markerEnd === 'open-arrow' ? svg`<path d="M34 3.5 L41 7 L34 10.5" fill="none" stroke=${s} stroke-width="1.4"/>`
      : n.markerEnd === 'hollow-triangle' ? svg`<path d="M33 3.5 L41 7 L33 10.5 Z" fill="#fff" stroke=${s} stroke-width="1.2"/>` : svg``;
    return svg`<svg class="prel" viewBox="0 0 44 14" width="44" height="14">
      <line x1=${x1} y1="7" x2=${x2} y2="7" stroke=${s} stroke-width="1.4" stroke-dasharray=${dash}/>
      ${startM}${endM}</svg>`;
  }
  private renderPalette() {
    const magicOn = this.tool.kind === 'connect' && this.tool.rel === null;
    return html`
      <div class="pgroup">Herramientas</div>
      <div class="pitem ${this.tool.kind === 'select' ? 'on' : ''}" @click=${() => this.resetTool()}><span class="sw" style="background:#94a3b8"></span><span class="lbl">Seleccionar</span></div>
      <div class="pitem ${magicOn ? 'on' : ''}" @click=${(e: MouseEvent) => this.pickTool({ kind: 'connect', rel: null }, e)}><span class="sw" style="background:#7c3aed"></span><span class="lbl">Conector mágico ✦</span></div>

      <div class="pgroup">Relaciones</div>
      ${REL_TYPES.map((rel) => {
        const on = this.tool.kind === 'connect' && this.tool.rel === rel;
        return html`<div class="pitem ${on ? 'on' : ''}" @click=${(e: MouseEvent) => this.pickTool({ kind: 'connect', rel }, e)}>${this.relPreview(rel)}<span class="lbl">${REL_NOTATION[rel]?.label ?? rel}</span></div>`;
      })}

      <div class="pgroup">Elementos <span style="text-transform:none;font-weight:400">· Shift = fija</span></div>
      ${ELEMENT_TOOLS.map((el) => {
        const on = this.tool.kind === 'place' && this.tool.el.kind === el.kind;
        return html`<div class="pitem ${on ? 'on' : ''}" @click=${(e: MouseEvent) => this.pickTool({ kind: 'place', el }, e)}>${this.elIcon(el.kind)}<span class="lbl">${el.label}</span></div>`;
      })}

      <div class="pgroup">Extras</div>
      ${EXTRA_TOOLS.map((el) => {
        const on = this.tool.kind === 'place' && this.tool.el.kind === el.kind;
        return html`<div class="pitem ${on ? 'on' : ''}" @click=${(e: MouseEvent) => this.pickTool({ kind: 'place', el }, e)}>${this.elIcon(el.kind === 'group' ? 'area' : el.kind)}<span class="lbl">${el.label}</span></div>`;
      })}
    `;
  }

  // ---- properties ----------------------------------------------------------
  private renderProps() {
    const n = this.selectedNode();
    if (!n) {
      const edge = this.selectedEdge();
      if (edge) return this.renderEdgeProps(edge);
      return html`<div class="empty">Selecciona un elemento en el árbol o el lienzo.</div>`;
    }
    const layer = LAYER[kindLayer(n.kind)];
    const m = this.metaOf(n.id);
    if (this.tab === 'appearance')
      return html`<div class="form">
        <label>Relleno</label>
        <span class="colorrow"><input type="color" .value=${n.fill ?? '#ffffff'} @input=${(e: Event) => this.setFill((e.target as HTMLInputElement).value)} /><span class="ro">${n.fill}</span></span>
        <label>Borde</label><div class="ro">#5C5C5C (notación ArchiMate)</div>
        <label>Capa</label><div class="ro">${layer.name}</div></div>`;
    if (this.tab === 'properties') return this.renderPropsTable();
    return html`<div class="form">
      <label>Nombre</label><input .value=${n.label} @input=${(e: Event) => this.rename((e.target as HTMLInputElement).value)} />
      <label>Tipo</label><div class="ro">${n.kind}</div>
      <label>Capa</label><div class="ro">${layer.name}</div>
      <label>Documentación</label><textarea placeholder="Descripción del elemento…" .value=${m.doc} @input=${(e: Event) => this.setDoc((e.target as HTMLTextAreaElement).value)}></textarea></div>`;
  }

  // ---- menus ---------------------------------------------------------------
  private renderMenu() {
    if (!this.menu) return nothing;
    const m = this.menu;
    return html`<div class="menu" style="left:${m.x}px;top:${m.y}px">
      <div class="mhead">${m.src.label} → ${m.tgt.label}</div>
      ${m.opts.map((o) => html`<div class="mi" @click=${() => this.pickFromMenu(o)}>${this.relPreview(o.type)}<span>${o.label}</span>${o.reverse ? html`<span class="rev">inversa</span>` : nothing}</div>`)}
    </div>`;
  }
  private renderCreateMenu() {
    if (!this.createMenu) return nothing;
    const m = this.createMenu;
    return html`<div class="menu" style="left:${m.x}px;top:${m.y}px">
      <div class="mhead">Crear elemento desde «${m.src.label}»</div>
      ${ELEMENT_TOOLS.filter((e) => e.kind !== 'junction').map((el) => {
        const opts = validRelations(m.src.kind, el.kind);
        const expanded = this.createExpand === el.kind;
        return html`
          <div class="mi" @click=${() => this.toggleCreateExpand(el.kind)}>
            ${this.elIcon(el.kind)}<span>${el.label}</span><span class="rev">${opts.length ? (expanded ? '▾' : '▸') : ''}</span>
          </div>
          ${expanded ? html`
            <div class="mi sub" @click=${() => this.pickCascade(el, null)}><span class="subl">(solo crear)</span></div>
            ${opts.map((o) => html`<div class="mi sub" @click=${() => this.pickCascade(el, o)}>
              <span class="subl">${this.relPreview(o.type)}</span><span>${o.label}</span>${o.reverse ? html`<span class="rev">inversa</span>` : nothing}</div>`)}
          ` : nothing}
        `;
      })}
    </div>`;
  }

  render() {
    const t = this.tool;
    const hint = this.painter !== null ? 'Pincel activo — click en un nodo para pintar su relleno'
      : t.kind === 'place' ? `Coloca «${t.el.label}» — click en el lienzo`
      : t.kind === 'connect' ? `${t.rel === null ? 'Conector mágico' : `Relación «${REL_NOTATION[t.rel]?.label ?? t.rel}»`} — click en origen y luego en destino`
      : '';
    return html`
      <div class="toolbar">
        <span class="brand">modux <small>· experimento UI estilo Archi</small></span>
        ${hint ? html`<span class="hint">${hint} · Esc cancela</span>` : nothing}
        ${this.selectedIds.length >= 2 ? html`<span class="aligngrp">
          <button title="Alinear izquierda" @click=${() => this.align('left')}>⇤</button>
          <button title="Centrar horizontal" @click=${() => this.align('centerH')}>⇔</button>
          <button title="Alinear derecha" @click=${() => this.align('right')}>⇥</button>
          <span class="asep"></span>
          <button title="Alinear arriba" @click=${() => this.align('top')}>⤒</button>
          <button title="Centrar vertical" @click=${() => this.align('middleV')}>⇳</button>
          <button title="Alinear abajo" @click=${() => this.align('bottom')}>⤓</button>
        </span>` : nothing}
        <div class="spacer"></div>
        <button class=${t.kind === 'select' ? 'on' : ''} @click=${() => this.resetTool()}>Seleccionar</button>
        <button title="Copiar formato: coge el relleno del elemento seleccionado y píntalo en otros"
          class=${this.painter !== null ? 'on' : ''} @click=${() => this.toggleFormatPainter()}>Pincel 🖌</button>
        <button class=${t.kind === 'connect' && t.rel === null ? 'on' : ''} @click=${() => (this.tool = { kind: 'connect', rel: null })}>Conector mágico ✦</button>
      </div>

      <div class="panel tree">
        <header>Modelo</header>
        <input class="treesearch" type="search" placeholder="Buscar…" .value=${this.treeQuery}
          @input=${(e: Event) => (this.treeQuery = (e.target as HTMLInputElement).value)} />
        <div class="body">${this.renderTree()}</div>
      </div>

      <div class="canvas-wrap" @contextmenu=${this.onContextMenu}>
        <modux-canvas archimate
          .scene=${this.displayScene} .selectedId=${this.selectedId} .selectedIds=${this.selectedIds}
          .edgePoints=${this.edgePoints}
          .tool=${this.canvasTool} .connectValidator=${this.validator}
          @edge-points-changed=${(e: Event) => { const d = (e as CustomEvent).detail; if (!d.auto) this.commit(); this.edgePoints = { ...this.edgePoints, [d.id]: d.points }; }}
          @element-selected=${this.onCanvasSelected}
          @element-multi-toggled=${this.onMultiToggle}
          @nodes-boxed=${this.onBoxed}
          @selection-cleared=${this.onSelCleared}
          @node-moved=${this.onNodeMoved}
          @nodes-moved=${this.onNodesMoved}
          @node-resized=${this.onNodeResized}
          @node-renamed=${this.onNodeRenamed}
          @node-collapse-toggled=${this.onCollapseToggled}
          @delete-requested=${this.onDeleteReq}
          @delete-selection-requested=${this.onDeleteSel}
          @undo-requested=${() => this.undo()}
          @redo-requested=${() => this.redo()}
          @place-requested=${this.onPlace}
          @connect-committed=${this.onCommitted}
          @connect-rejected=${this.onRejected}
          @connect-on-empty=${this.onConnectEmpty}></modux-canvas>
        <div class="zoombar">
          <button title="Acercar" @click=${() => this.canvasEl?.zoomBy(1.2)}>+</button>
          <button title="Alejar" @click=${() => this.canvasEl?.zoomBy(0.8)}>−</button>
          <button title="Ajustar a la ventana" @click=${() => this.canvasEl?.fit()}>⤢</button>
        </div>
        <div class="legend">${Object.values(LAYER).map((l) => html`<span class="k"><span class="sw" style="background:${l.fill};border-color:${l.stroke}"></span>${l.name}</span>`)}</div>
      </div>

      <div class="panel palette"><header>Paleta</header><div class="body">${this.renderPalette()}</div></div>

      <div class="panel props">
        <div class="tabs">${(['main', 'appearance', 'properties'] as const).map((tb) => html`
          <button class=${this.tab === tb ? 'on' : ''} @click=${() => (this.tab = tb)}>${tb === 'main' ? 'Principal' : tb === 'appearance' ? 'Apariencia' : 'Propiedades'}</button>`)}</div>
        <div class="body">${this.renderProps()}</div>
      </div>

      ${this.renderMenu()}${this.renderCreateMenu()}
      ${this.ctx ? html`
        <div class="ctxback" @pointerdown=${() => (this.ctx = null)} @contextmenu=${(e: Event) => e.preventDefault()}></div>
        <div class="menu" style="left:${this.ctx.x}px;top:${this.ctx.y}px">
          <div class="mi" @click=${() => this.ctxRename()}>Renombrar <span class="rev">F2</span></div>
          ${this.node(this.ctx.id)?.parentId ? html`<div class="mi" @click=${() => this.ctxUnnest()}>Sacar del contenedor</div>` : nothing}
          <div class="mi" @click=${() => this.ctxDelete()}>Borrar <span class="rev">Supr</span></div>
        </div>` : nothing}
      ${this.toast ? html`<div class="toast">${this.toast}</div>` : nothing}
    `;
  }
}
