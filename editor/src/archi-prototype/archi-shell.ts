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
import type { CanvasTool } from '../modux-canvas.js';
import type { Scene, SceneNode, SceneEdge } from '../scene.js';
import { EXAMPLE_SCENE, LAYER, ARCHIMATE_SYMBOL, type LayerKey } from './example-scene.js';
import { validRelations, canDraw, REL_NOTATION, REL_TYPES, type RelOption } from './magic.js';

interface ElementTool { kind: string; label: string; layer: LayerKey; w: number; h: number; container?: boolean; }
const ELEMENT_TOOLS: ElementTool[] = [
  { kind: 'component', label: 'Contexto', layer: 'context', w: 240, h: 130, container: true },
  { kind: 'aggregate', label: 'Agregado', layer: 'domain', w: 160, h: 66 },
  { kind: 'entity', label: 'Entidad', layer: 'domain', w: 160, h: 66 },
  { kind: 'event', label: 'Evento', layer: 'event', w: 200, h: 62 },
  { kind: 'usecase', label: 'Caso de uso', layer: 'behavior', w: 160, h: 62 },
  { kind: 'service', label: 'Servicio', layer: 'behavior', w: 170, h: 50 },
  { kind: 'person', label: 'Actor', layer: 'behavior', w: 130, h: 74 },
  { kind: 'junction', label: 'Junction', layer: 'behavior', w: 16, h: 16 },
];

/** Non-ArchiMate extras (Archi's Note/Group section of the palette). */
const EXTRA_TOOLS: ElementTool[] = [
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
  @state() private collapsed = new Set<string>();
  @state() private tab: 'main' | 'appearance' | 'properties' = 'main';
  @state() private treeQuery = '';
  private _vis: Set<string> | null = null;

  @state() private tool: Tool = { kind: 'select' };
  @state() private menu: { x: number; y: number; src: SceneNode; tgt: SceneNode; opts: RelOption[] } | null = null;
  @state() private createMenu: { x: number; y: number; src: SceneNode; sx: number; sy: number } | null = null;
  @state() private createExpand: string | null = null;
  @state() private toast: string | null = null;
  /** Side store for editable properties the SceneNode type doesn't carry (docs, key-value props). */
  @state() private meta: Record<string, { doc: string; props: { k: string; v: string }[] }> = {};
  /** Sticky palette tool (Shift-click keeps the tool selected after use, like Archi). */
  private sticky = false;

  private seq = 0;
  private toastTimer = 0;

  connectedCallback() { super.connectedCallback(); window.addEventListener('keydown', this.onKey); }
  disconnectedCallback() { super.disconnectedCallback(); window.removeEventListener('keydown', this.onKey); }
  private onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') this.resetTool(); };

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
  private select(id: string | null) { this.selectedId = id; }
  private resetTool() { this.tool = { kind: 'select' }; this.menu = null; this.createMenu = null; this.createExpand = null; this.sticky = false; }
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

  private onCanvasSelected(e: Event) {
    const d = (e as CustomEvent).detail;
    if (d?.elementType === 'node') this.select(d.id);
  }

  private rename(name: string) {
    const n = this.selectedNode(); if (!n) return;
    n.label = name; this.scene = { ...this.scene, nodes: [...this.scene.nodes] };
  }
  private setFill(v: string) {
    const n = this.selectedNode(); if (!n) return;
    n.fill = v; this.scene = { ...this.scene, nodes: [...this.scene.nodes] };
  }
  private setDoc(v: string) { const n = this.selectedNode(); if (n) this.patchMeta(n.id, { doc: v }); }
  private addProp() { const n = this.selectedNode(); if (n) this.patchMeta(n.id, { props: [...this.metaOf(n.id).props, { k: '', v: '' }] }); }
  private setProp(i: number, field: 'k' | 'v', v: string) {
    const n = this.selectedNode(); if (!n) return;
    this.patchMeta(n.id, { props: this.metaOf(n.id).props.map((p, j) => (j === i ? { ...p, [field]: v } : p)) });
  }
  private removeProp(i: number) {
    const n = this.selectedNode(); if (!n) return;
    this.patchMeta(n.id, { props: this.metaOf(n.id).props.filter((_, j) => j !== i) });
  }

  // ---- canvas tool events --------------------------------------------------
  private onPlace = (e: Event) => {
    const d = (e as CustomEvent).detail as { nodeKind: string; w: number; h: number; x: number; y: number };
    const el = ELEMENT_TOOLS.find((x) => x.kind === d.nodeKind)
      ?? EXTRA_TOOLS.find((x) => x.kind === d.nodeKind)
      ?? { kind: d.nodeKind, label: d.nodeKind, layer: 'domain', w: d.w, h: d.h } as ElementTool;
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
      if (dir) this.addEdge(d.rel, dir === 'forward' ? src : tgt, dir === 'forward' ? tgt : src);
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
    const n: SceneNode = {
      id: `${el.kind}-${++this.seq}`, label: el.label, kind: el.kind, symbol: ARCHIMATE_SYMBOL[el.kind] ?? el.kind,
      x, y, w: el.w, h: el.h, fill: el.kind === 'note' ? '#FEF9C3' : lay.fill, stroke: lay.stroke,
      ...(el.container ? { container: true, collapsible: true } : {}),
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
    this.addEdge(o.type, o.reverse ? tgt : src, o.reverse ? src : tgt);
    this.menu = null;
  }

  private toggleCreateExpand(kind: string) { this.createExpand = this.createExpand === kind ? null : kind; }
  /** Cascade pick: create the new element at the drop point and (optionally) the chosen relation. */
  private pickCascade(el: ElementTool, o: RelOption | null) {
    if (!this.createMenu) return;
    const { src, sx, sy } = this.createMenu;
    const n = this.addNodeAt(el, sx, sy);
    if (o) this.addEdge(o.type, o.reverse ? n : src, o.reverse ? src : n);
    this.createMenu = null; this.createExpand = null;
  }

  // ---- tree (derived from the scene) --------------------------------------
  private roots() { return this.scene.nodes.filter((n) => !n.parentId); }
  private childrenOf(id: string) { return this.scene.nodes.filter((n) => n.parentId === id); }

  /** Ids to show when searching: matches + their ancestors. null = no filter. */
  private visibleTreeIds(): Set<string> | null {
    const q = this.treeQuery.trim().toLowerCase();
    if (!q) return null;
    const ids = new Set<string>();
    for (const n of this.scene.nodes) {
      if (!n.label.toLowerCase().includes(q)) continue;
      ids.add(n.id);
      let p = n.parentId;
      while (p) { ids.add(p); p = this.node(p)?.parentId; }
    }
    return ids;
  }

  private renderTreeRow(node: SceneNode, child = false): TemplateResult | typeof nothing {
    if (this._vis && !this._vis.has(node.id)) return nothing;
    const kids = this.childrenOf(node.id);
    const isCollapsed = this._vis ? false : this.collapsed.has(node.id);
    const sw = LAYER[kindLayer(node.kind)];
    return html`
      <div class="row ${child ? 'child' : ''} ${this.selectedId === node.id ? 'sel' : ''}" @click=${() => this.select(node.id)}>
        <span class="twisty" @click=${(ev: Event) => { ev.stopPropagation(); this.toggle(node.id); }}>${kids.length ? (isCollapsed ? '▶' : '▼') : ''}</span>
        <span class="swatch" style="background:${sw.fill};border-color:${sw.stroke}"></span>
        <span class="lbl">${node.label}</span>
      </div>
      ${kids.length && !isCollapsed ? kids.map((c) => this.renderTreeRow(c, true)) : nothing}
    `;
  }
  private toggle(id: string) { const n = new Set(this.collapsed); n.has(id) ? n.delete(id) : n.add(id); this.collapsed = n; }

  // ---- palette -------------------------------------------------------------
  private dashPreview(rel: string) {
    const n = REL_NOTATION[rel] ?? {};
    return svg`<svg class="dash" viewBox="0 0 20 8" width="20" height="8">
      <line x1="1" y1="4" x2="19" y2="4" stroke="#475569" stroke-width="1.5" stroke-dasharray=${n.dashArray ?? (n.dashed ? '4 3' : '')} /></svg>`;
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
        return html`<div class="pitem ${on ? 'on' : ''}" @click=${(e: MouseEvent) => this.pickTool({ kind: 'connect', rel }, e)}>${this.dashPreview(rel)}<span class="lbl">${REL_NOTATION[rel]?.label ?? rel}</span></div>`;
      })}

      <div class="pgroup">Elementos <span style="text-transform:none;font-weight:400">· Shift = fija</span></div>
      ${ELEMENT_TOOLS.map((el) => {
        const on = this.tool.kind === 'place' && this.tool.el.kind === el.kind;
        const sw = LAYER[el.layer];
        return html`<div class="pitem ${on ? 'on' : ''}" @click=${(e: MouseEvent) => this.pickTool({ kind: 'place', el }, e)}><span class="sw" style="background:${sw.fill};border-color:${sw.stroke}"></span><span class="lbl">${el.label}</span></div>`;
      })}

      <div class="pgroup">Extras</div>
      ${EXTRA_TOOLS.map((el) => {
        const on = this.tool.kind === 'place' && this.tool.el.kind === el.kind;
        return html`<div class="pitem ${on ? 'on' : ''}" @click=${(e: MouseEvent) => this.pickTool({ kind: 'place', el }, e)}><span class="sw" style="background:#FEF9C3;border-color:#ca8a04"></span><span class="lbl">${el.label}</span></div>`;
      })}
    `;
  }

  // ---- properties ----------------------------------------------------------
  private renderProps() {
    const n = this.selectedNode();
    if (!n) return html`<div class="empty">Selecciona un elemento en el árbol o el lienzo.</div>`;
    const layer = LAYER[kindLayer(n.kind)];
    const m = this.metaOf(n.id);
    if (this.tab === 'appearance')
      return html`<div class="form">
        <label>Relleno</label>
        <span class="colorrow"><input type="color" .value=${n.fill ?? '#ffffff'} @input=${(e: Event) => this.setFill((e.target as HTMLInputElement).value)} /><span class="ro">${n.fill}</span></span>
        <label>Borde</label><div class="ro">#5C5C5C (notación ArchiMate)</div>
        <label>Capa</label><div class="ro">${layer.name}</div></div>`;
    if (this.tab === 'properties')
      return html`<div class="proptable">
        ${m.props.map((p, i) => html`<div class="proprow">
          <input placeholder="clave" .value=${p.k} @input=${(e: Event) => this.setProp(i, 'k', (e.target as HTMLInputElement).value)} />
          <input placeholder="valor" .value=${p.v} @input=${(e: Event) => this.setProp(i, 'v', (e.target as HTMLInputElement).value)} />
          <button class="del" @click=${() => this.removeProp(i)}>✕</button></div>`)}
        <button class="addprop" @click=${() => this.addProp()}>+ Añadir propiedad</button>
      </div>`;
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
      ${m.opts.map((o) => html`<div class="mi" @click=${() => this.pickFromMenu(o)}>${this.dashPreview(o.type)}<span>${o.label}</span>${o.reverse ? html`<span class="rev">inversa</span>` : nothing}</div>`)}
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
            <span class="sw" style="width:13px;height:13px;border-radius:3px;background:${LAYER[el.layer].fill};border:1px solid ${LAYER[el.layer].stroke}"></span>
            <span>${el.label}</span><span class="rev">${opts.length ? (expanded ? '▾' : '▸') : ''}</span>
          </div>
          ${expanded ? html`
            <div class="mi sub" @click=${() => this.pickCascade(el, null)}><span class="subl">(solo crear)</span></div>
            ${opts.map((o) => html`<div class="mi sub" @click=${() => this.pickCascade(el, o)}>
              <span class="subl">${this.dashPreview(o.type)}</span><span>${o.label}</span>${o.reverse ? html`<span class="rev">inversa</span>` : nothing}</div>`)}
          ` : nothing}
        `;
      })}
    </div>`;
  }

  render() {
    this._vis = this.visibleTreeIds();
    const t = this.tool;
    const hint = t.kind === 'place' ? `Coloca «${t.el.label}» — click en el lienzo`
      : t.kind === 'connect' ? `${t.rel === null ? 'Conector mágico' : `Relación «${REL_NOTATION[t.rel]?.label ?? t.rel}»`} — click en origen y luego en destino`
      : '';
    return html`
      <div class="toolbar">
        <span class="brand">modux <small>· experimento UI estilo Archi</small></span>
        ${hint ? html`<span class="hint">${hint} · Esc cancela</span>` : nothing}
        <div class="spacer"></div>
        <button class=${t.kind === 'select' ? 'on' : ''} @click=${() => this.resetTool()}>Seleccionar</button>
        <button class=${t.kind === 'connect' && t.rel === null ? 'on' : ''} @click=${() => (this.tool = { kind: 'connect', rel: null })}>Conector mágico ✦</button>
      </div>

      <div class="panel tree">
        <header>Modelo</header>
        <input class="treesearch" type="search" placeholder="Buscar…" .value=${this.treeQuery}
          @input=${(e: Event) => (this.treeQuery = (e.target as HTMLInputElement).value)} />
        <div class="body">${this.roots().map((n) => this.renderTreeRow(n))}</div>
      </div>

      <div class="canvas-wrap">
        <modux-canvas archimate
          .scene=${this.scene} .selectedId=${this.selectedId}
          .tool=${this.canvasTool} .connectValidator=${this.validator}
          @element-selected=${this.onCanvasSelected}
          @place-requested=${this.onPlace}
          @connect-committed=${this.onCommitted}
          @connect-rejected=${this.onRejected}
          @connect-on-empty=${this.onConnectEmpty}></modux-canvas>
        <div class="legend">${Object.values(LAYER).map((l) => html`<span class="k"><span class="sw" style="background:${l.fill};border-color:${l.stroke}"></span>${l.name}</span>`)}</div>
      </div>

      <div class="panel palette"><header>Paleta</header><div class="body">${this.renderPalette()}</div></div>

      <div class="panel props">
        <div class="tabs">${(['main', 'appearance', 'properties'] as const).map((tb) => html`
          <button class=${this.tab === tb ? 'on' : ''} @click=${() => (this.tab = tb)}>${tb === 'main' ? 'Principal' : tb === 'appearance' ? 'Apariencia' : 'Propiedades'}</button>`)}</div>
        <div class="body">${this.renderProps()}</div>
      </div>

      ${this.renderMenu()}${this.renderCreateMenu()}
      ${this.toast ? html`<div class="toast">${this.toast}</div>` : nothing}
    `;
  }
}
