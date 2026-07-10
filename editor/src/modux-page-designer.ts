import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { UiPageRef, UiFieldRef, UiComponentNodeRef } from './model.js';

/**
 * The page designer: a live MOCKUP of a page, inferred the way Mateu infers
 * UX — the fields come from the viewmodel Model, their look from each field's
 * PageFieldConfig (stereotype, colspan, label), the toolbar from the page's
 * buttons. Nothing here is drawn by hand: you edit the DECLARATION (click a
 * field, reorder by drag) and the preview re-infers itself. WYSIWYG over the
 * MVVM, not a drawing.
 *
 * Events out: field-config-changed {fieldId, stereotype, colspan, label},
 * fields-reordered {fieldIds}, open-crud, designer-closed.
 */

/** Mateu's field stereotypes (PageFieldStereotype), offered as-is. */
const STEREOTYPES = [
  'regular', 'textarea', 'checkbox', 'toggle', 'radio', 'select', 'combobox',
  'listBox', 'email', 'password', 'richText', 'html', 'markdown', 'image',
  'icon', 'link', 'money', 'color', 'choice', 'slider', 'stars',
];

@customElement('modux-page-designer')
export class ModuxPageDesigner extends LitElement {
  @property({ attribute: false }) page: UiPageRef | null = null;
  /** Rendered as a frame on the Diseño surface (relative, fixed size, no close). */
  @property({ type: Boolean, reflect: true }) framed = false;
  /** Pickers for the declaration: every model, mapping and use case of the catalog. */
  @property({ attribute: false }) models: { id: string; name: string }[] = [];
  @property({ attribute: false }) mappings: { id: string; name: string }[] = [];
  @property({ attribute: false }) useCases: { id: string; name: string }[] = [];
  @property({ attribute: false }) queryOps: { id: string; name: string; queryServiceId: string }[] = [];
  /** The selected content node (owned by the shell, like the canvas selection). */
  @property({ attribute: false }) selectedCmpId: string | null = null;

  /** The field whose declaration is being edited, with the draft values. */
  @state() private _editing: {
    fieldId: string;
    stereotype: string;
    colspan: number;
    label: string;
  } | null = null;
  @state() private _dragId: string | null = null;
  @state() private _overId: string | null = null;
  /** Inline edits of the page's own declaration. */
  @state() private _rename: string | null = null;
  @state() private _route: string | null = null;
  /** The button being edited ('' useCaseId = adding a new one). */
  @state() private _btn: { useCaseId: string; label: string; mappingId: string } | null = null;
  /** The content-tree node whose declaration is being edited (draft copy). */
  @state() private _cmp: UiComponentNodeRef | null = null;
  @state() private _dragCmpId: string | null = null;
  @state() private _overCmpId: string | null = null;
  /** Where the drop lands relative to the hovered node: a sibling slot or inside it. */
  @state() private _overCmpPos: 'before' | 'after' | 'into' = 'into';
  /** A drag from outside this designer (palette or another frame) hovering us. */
  @state() private _foreignOver = false;
  /** The tab each tabLayout is showing (defaults to the first one). */
  @state() private _activeTabs: Record<string, string> = {};

  private emitEvent(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  static styles = css`
    :host([framed]) {
      position: relative;
      top: auto;
      right: auto;
      bottom: auto;
      height: 560px;
      box-shadow: 0 8px 26px rgb(2 6 23 / 0.14);
    }
    :host([framed]) button.close {
      display: none;
    }
    :host {
      position: absolute;
      top: 54px;
      right: 12px;
      bottom: 12px;
      width: 460px;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      box-shadow: 0 18px 50px rgb(2 6 23 / 0.25);
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: #0f172a;
      overflow: hidden;
      z-index: 40;
    }
    .chrome {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      background: #f1f5f9;
      border-bottom: 1px solid #e2e8f0;
    }
    .dots span {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 999px;
      margin-right: 4px;
      background: #cbd5e1;
    }
    .chrome .title {
      font-weight: 700;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chrome .route {
      color: #64748b;
      font-size: 11px;
    }
    .chrome .type {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #0369a1;
      background: #e0f2fe;
      border-radius: 4px;
      padding: 2px 5px;
    }
    .chrome select.type,
    .chrome input.inline {
      font: inherit;
      font-size: 11px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 2px 4px;
      min-width: 0;
    }
    .chrome span.type,
    .chrome .route,
    .chrome .title {
      cursor: text;
    }
    .toolbar .btn {
      cursor: pointer;
    }
    .toolbar .add {
      border: 1px dashed #94a3b8;
      color: #64748b;
      background: #ffffff;
      border-radius: 6px;
      padding: 3px 9px;
      font-size: 12px;
      cursor: pointer;
    }
    .vm {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 11px;
      color: #64748b;
    }
    .vm select {
      font: inherit;
      font-size: 11px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 2px 4px;
      max-width: 200px;
    }
    .vm .chip {
      color: #7c3aed;
      background: #f5f3ff;
      border-radius: 4px;
      padding: 2px 6px;
      font-weight: 600;
    }
    .chrome button {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 6px;
      padding: 3px 8px;
      cursor: pointer;
      font: inherit;
      font-size: 11px;
    }
    .toolbar {
      display: flex;
      gap: 6px;
      padding: 8px 14px;
      border-bottom: 1px solid #f1f5f9;
    }
    .toolbar .btn {
      background: #0284c7;
      color: #ffffff;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
    }
    .toolbar .hint {
      color: #94a3b8;
      font-size: 11px;
      align-self: center;
    }
    .body {
      flex: 1;
      overflow: auto;
      padding: 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 12px;
    }
    .field {
      cursor: grab;
      border: 1px dashed transparent;
      border-radius: 8px;
      padding: 4px;
    }
    .field:hover {
      border-color: #7dd3fc;
      background: #f0f9ff;
    }
    .field.dropping {
      border-color: #0284c7;
      background: #e0f2fe;
    }
    .field.span2 {
      grid-column: span 2;
    }
    .field label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 3px;
    }
    .control {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      min-height: 26px;
      padding: 4px 8px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .control.area {
      min-height: 58px;
      align-items: flex-start;
    }
    .control.check {
      border: none;
      justify-content: flex-start;
      gap: 6px;
      color: #334155;
    }
    .box {
      width: 14px;
      height: 14px;
      border: 1.5px solid #94a3b8;
      border-radius: 4px;
    }
    .nested {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px;
      color: #94a3b8;
      font-size: 11px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 11px;
    }
    th {
      text-align: left;
      color: #334155;
      border-bottom: 1.5px solid #cbd5e1;
      padding: 4px 6px;
    }
    td {
      color: #cbd5e1;
      border-bottom: 1px solid #f1f5f9;
      padding: 6px;
    }
    .empty {
      color: #94a3b8;
      text-align: center;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .cmp {
      position: relative;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 18px 8px 8px;
      min-height: 34px;
      margin: 2px 0;
    }
    .cmp:hover {
      border-color: #38bdf8;
    }
    .cmp.overcmp.over-into {
      border-color: #0284c7;
      background: #f0f9ff;
    }
    .cmp.overcmp.over-before {
      box-shadow: 0 -3px 0 0 #0284c7;
      margin-top: 16px;
    }
    .cmp.overcmp.over-after {
      box-shadow: 0 3px 0 0 #0284c7;
      margin-bottom: 16px;
    }
    .cmp {
      cursor: grab;
      transition: margin 0.12s ease;
    }
    .cmp.selcmp {
      outline: 2px solid #0284c7;
      outline-offset: 1px;
    }
    .cmp .kindchip {
      position: absolute;
      top: 2px;
      left: 6px;
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #0ea5e9;
      text-transform: uppercase;
      cursor: grab;
      user-select: none;
    }
    .cmp.leafcmp {
      border-style: solid;
      border-color: #e2e8f0;
    }
    .row-lay {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .row-lay > * {
      flex: 1;
      min-width: 0;
    }
    .col-lay {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .grid-lay {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .grid3-lay {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }
    .split-divider {
      width: 4px;
      flex: none;
      border-radius: 2px;
      background: #e2e8f0;
    }
    .tabbar {
      display: flex;
      gap: 2px;
      border-bottom: 1.5px solid #cbd5e1;
      margin-bottom: 8px;
    }
    .tabbar span {
      padding: 3px 10px;
      font-size: 11px;
      color: #64748b;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
      user-select: none;
    }
    .tabbar span:hover {
      background: #f1f5f9;
    }
    .wizbar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 2px 8px;
      margin-bottom: 8px;
      border-bottom: 1.5px dashed #cbd5e1;
      font-size: 11px;
      color: #94a3b8;
    }
    .wizbar .on {
      color: #0369a1;
      font-weight: 700;
    }
    .wizbar .wiznext {
      margin-left: auto;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 2px 8px;
      color: #475569;
    }
    .tabbar span.on {
      background: #e0f2fe;
      color: #0369a1;
      font-weight: 700;
    }
    .acc-bar {
      display: flex;
      justify-content: space-between;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 11px;
      color: #334155;
      background: #f8fafc;
    }
    .card-box {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgb(2 6 23 / 0.06);
      padding: 8px;
    }
    .card-title {
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .metric {
      text-align: center;
      padding: 6px;
    }
    .metric .num {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
    }
    .metric .cap {
      font-size: 10px;
      color: #64748b;
    }
    .menubar-stub {
      display: flex;
      gap: 14px;
      background: #0f172a;
      color: #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 11px;
    }
    .text-stub {
      color: #334155;
      font-size: 12px;
      line-height: 1.5;
    }
    .board-col {
      background: #f1f5f9;
      border-radius: 8px;
      padding: 6px;
      min-height: 60px;
    }
    .dots-nav {
      text-align: center;
      color: #cbd5e1;
      letter-spacing: 4px;
    }
    .appbar {
      background: #0f172a;
      border-radius: 6px 6px 0 0;
      height: 22px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      color: #94a3b8;
      font-size: 10px;
    }
    .placeholder {
      color: #94a3b8;
      font-size: 11px;
      text-align: center;
      padding: 8px;
    }
    .pop {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 12px;
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 10px;
      padding: 12px;
      display: grid;
      grid-template-columns: auto 1fr auto 1fr;
      gap: 8px 10px;
      align-items: center;
      font-size: 12px;
      box-shadow: 0 10px 30px rgb(2 6 23 / 0.5);
    }
    .pop label {
      color: #94a3b8;
      font-size: 11px;
    }
    .pop select,
    .pop input {
      font: inherit;
      border-radius: 6px;
      border: 1px solid #334155;
      background: #1e293b;
      color: #e2e8f0;
      padding: 3px 6px;
      min-width: 0;
    }
    .pop .actions {
      grid-column: 1 / -1;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .pop button {
      font: inherit;
      font-size: 12px;
      border-radius: 6px;
      border: 1px solid #334155;
      background: #1e293b;
      color: #e2e8f0;
      padding: 4px 10px;
      cursor: pointer;
    }
    .pop button.ok {
      background: #0284c7;
      border-color: #0284c7;
      color: #ffffff;
      font-weight: 600;
    }
  `;

  /** The mock control a field renders as — inferred from stereotype, then type. */
  private control(field: UiFieldRef) {
    const st = field.stereotype ?? '';
    if (['textarea', 'richText', 'html', 'markdown'].includes(st)) {
      return html`<div class="control area">…</div>`;
    }
    if (['checkbox', 'toggle'].includes(st) || field.type === 'BOOLEAN') {
      return html`<div class="control check"><span class="box"></span>Sí/No</div>`;
    }
    if (['select', 'combobox', 'listBox', 'radio', 'choice'].includes(st) || field.type === 'ENUM') {
      return html`<div class="control"><span>Seleccionar…</span><span>▾</span></div>`;
    }
    if (st === 'password') return html`<div class="control">••••••••</div>`;
    if (st === 'email') return html`<div class="control">nombre@dominio.com</div>`;
    if (st === 'money') return html`<div class="control"><span>0,00</span><span>€</span></div>`;
    if (st === 'slider') return html`<div class="control">──────●──</div>`;
    if (st === 'stars') return html`<div class="control">★★★☆☆</div>`;
    if (['image', 'icon'].includes(st)) return html`<div class="control area">🖼</div>`;
    if (st === 'link') return html`<div class="control" style="color:#0284c7">enlace ↗</div>`;
    if (field.type === 'MODEL') {
      return html`<div class="nested">${field.name} (modelo anidado)</div>`;
    }
    if (['LOCALDATE', 'DATE', 'LOCALDATETIME'].includes(field.type ?? '')) {
      return html`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>`;
    }
    if (['INT', 'INTEGER', 'LONG', 'DOUBLE', 'FLOAT', 'DECIMAL', 'BIGDECIMAL'].includes(field.type ?? '')) {
      return html`<div class="control" style="justify-content:flex-end">0</div>`;
    }
    return html`<div class="control">Texto…</div>`;
  }

  private applyRename(): void {
    const name = (this._rename ?? '').trim();
    this._rename = null;
    if (name && name !== this.page?.name) this.emitEvent('page-renamed', { name });
  }

  private applyRoute(): void {
    const route = (this._route ?? '').trim();
    this._route = null;
    if (route && route !== this.page?.route) this.emitEvent('page-route-changed', { route });
  }

  private applyButton(existing: boolean): void {
    const draft = this._btn;
    this._btn = null;
    if (!draft || !draft.useCaseId) return;
    if (existing) {
      this.emitEvent('button-changed', {
        useCaseId: draft.useCaseId,
        label: draft.label.trim() || null,
        mappingId: draft.mappingId || null,
      });
    } else {
      this.emitEvent('button-added', { useCaseId: draft.useCaseId, label: draft.label.trim() || undefined });
      if (draft.mappingId) {
        this.emitEvent('button-changed', {
          useCaseId: draft.useCaseId,
          label: draft.label.trim() || null,
          mappingId: draft.mappingId,
        });
      }
    }
  }

  /** Human labels for the kind chips. */
  private static readonly KIND_LABELS: Record<string, string> = {
    verticalLayout: 'Vertical', horizontalLayout: 'Horizontal', formLayout: 'Form layout',
    splitLayout: 'Split', tabLayout: 'Tabs', tab: 'Pestaña', accordionLayout: 'Acordeón',
    card: 'Card', gridLayout: 'Grid', boardLayout: 'Board', dashboardLayout: 'Dashboard',
    masterDetailLayout: 'Master-detail', foldoutLayout: 'Foldout', carouselLayout: 'Carrusel',
    appLayout: 'App layout', form: 'Formulario', listing: 'Listado', button: 'Botón',
    field: 'Campo', text: 'Texto', metricCard: 'Métrica', menuBar: 'Menú',
  };

  static readonly LEAF_KINDS = new Set([
    'form', 'listing', 'button', 'field', 'text', 'metricCard', 'menuBar',
  ]);

  /** A node of the content tree, by id. */
  private nodeById(componentId: string): UiComponentNodeRef | null {
    let found: UiComponentNodeRef | null = null;
    const walk = (items?: UiComponentNodeRef[]) => {
      for (const it of items ?? []) {
        if (it.id === componentId) found = it;
        walk(it.children);
      }
    };
    walk(this.page?.content);
    return found;
  }

  /** The parent of each node in the content tree (null at the root). */
  private parentOf(componentId: string): UiComponentNodeRef | null {
    let found: UiComponentNodeRef | null = null;
    const walk = (items: UiComponentNodeRef[] | undefined, parent: UiComponentNodeRef | null) => {
      for (const it of items ?? []) {
        if (it.id === componentId) found = parent;
        walk(it.children, it);
      }
    };
    walk(this.page?.content, null);
    return found;
  }

  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  private isWithin(id: string, rootId: string): boolean {
    let hit = false;
    const walk = (n: UiComponentNodeRef) => {
      if (n.id === id) hit = true;
      for (const c of n.children ?? []) walk(c);
    };
    const find = (items: UiComponentNodeRef[] | undefined) => {
      for (const it of items ?? []) {
        if (it.id === rootId) walk(it);
        else find(it.children);
      }
    };
    find(this.page?.content);
    return hit;
  }

  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  private nextSiblingOf(componentId: string): UiComponentNodeRef | null {
    const parent = this.parentOf(componentId);
    const siblings = parent ? (parent.children ?? []) : (this.page?.content ?? []);
    const i = siblings.findIndex((s) => s.id === componentId);
    return i >= 0 ? (siblings[i + 1] ?? null) : null;
  }

  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  private dropPosFor(node: UiComponentNodeRef, e: DragEvent): 'before' | 'after' | 'into' {
    // a tab's body swallows everything: siblings of a tab are ordered on the HEADERS
    if (node.kind === 'tab') return 'into';
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = (e.clientY - box.top) / Math.max(1, box.height);
    if (ModuxPageDesigner.LEAF_KINDS.has(node.kind)) return y < 0.5 ? 'before' : 'after';
    // layouts: the edges slot a sibling, the body drops inside
    return y < 0.2 ? 'before' : y > 0.8 ? 'after' : 'into';
  }

  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  private slotFor(
    target: UiComponentNodeRef,
    pos: 'before' | 'after' | 'into',
  ): { toParentId: string | null; beforeComponentId: string | null } {
    if (pos === 'into' && target.kind === 'tabLayout') {
      const dragged = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if (dragged?.kind === 'tab') return { toParentId: target.id, beforeComponentId: null };
      const tabs = (target.children ?? []).filter((c) => c.kind === 'tab');
      const active = tabs.find((t) => t.id === this._activeTabs[target.id]) ?? tabs[0];
      if (active) target = active; // tabs hold the content — land in the one showing
    }
    if (pos === 'into' && !ModuxPageDesigner.LEAF_KINDS.has(target.kind)) {
      return { toParentId: target.id, beforeComponentId: null };
    }
    const parent = this.parentOf(target.id);
    const before = pos === 'after' ? (this.nextSiblingOf(target.id)?.id ?? null) : target.id;
    return { toParentId: parent?.id ?? null, beforeComponentId: before };
  }

  private onCmpDrop(target: UiComponentNodeRef, pos: 'before' | 'after' | 'into', e?: DragEvent): void {
    const source = this._dragCmpId;
    this._dragCmpId = null;
    this._overCmpId = null;
    if (!source) {
      // A node dragged from ANOTHER frame: the payload travels in the DataTransfer.
      const raw = e?.dataTransfer?.getData('application/x-modux-cmp');
      if (!raw) return;
      let payload: { pageId?: string; componentId?: string };
      try { payload = JSON.parse(raw); } catch { return; }
      if (!payload.componentId || !payload.pageId || payload.pageId === this.page?.id) return;
      const slot = this.slotFor(target, pos);
      this.emitEvent('component-transferred', { fromPageId: payload.pageId, componentId: payload.componentId, ...slot });
      return;
    }
    if (source === target.id) return;
    // A node never lands inside its own subtree.
    if (this.isWithin(target.id, source)) return;
    const slot = this.slotFor(target, pos);
    if (slot.beforeComponentId === source) return; // already there
    this.emitEvent('component-moved', { componentId: source, ...slot });
  }

  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  private renderComponent(node: UiComponentNodeRef): unknown {
    const children = node.children ?? [];
    const kids = (items: UiComponentNodeRef[]) => items.map((c) => this.renderComponent(c));
    const empty = html`<div class="placeholder">suelta componentes aquí</div>`;
    let body;
    switch (node.kind) {
      case 'horizontalLayout':
        body = html`<div class="row-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'splitLayout': {
        const left = children.slice(0, Math.ceil(children.length / 2));
        const right = children.slice(Math.ceil(children.length / 2));
        body = html`<div class="row-lay">
          <div class="col-lay">${left.length ? kids(left) : empty}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${right.length ? kids(right) : empty}</div>
        </div>`;
        break;
      }
      case 'formLayout':
        body = html`<div class="grid-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'gridLayout':
      case 'dashboardLayout':
        body = html`<div class="grid3-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'tabLayout': {
        const tabs = children.filter((c) => c.kind === 'tab');
        const active = tabs.find((t) => t.id === this._activeTabs[node.id]) ?? tabs[0];
        body = html`
          <div class="tabbar">
            ${tabs.map(
              (t, i) => html`<span
                class=${t === active ? 'on' : ''}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._activeTabs = { ...this._activeTabs, [node.id]: t.id };
                  this.emitEvent('component-selected', { componentId: t.id });
                }}
                @dblclick=${(e: Event) => {
                  e.stopPropagation();
                  this._cmp = { ...t };
                }}
                @dragstart=${(e: DragEvent) => {
                  e.stopPropagation();
                  this._dragCmpId = t.id;
                  e.dataTransfer?.setData(
                    'application/x-modux-cmp',
                    JSON.stringify({ pageId: this.page?.id, componentId: t.id }),
                  );
                }}
                @dragover=${(e: DragEvent) => {
                  // only a sibling tab slots between headers
                  if (this.nodeById(this._dragCmpId ?? '')?.kind !== 'tab') return;
                  e.preventDefault();
                  e.stopPropagation();
                }}
                @drop=${(e: DragEvent) => {
                  const source = this._dragCmpId;
                  if (!source || source === t.id) return;
                  if (this.nodeById(source)?.kind !== 'tab') return;
                  e.preventDefault();
                  e.stopPropagation();
                  const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const beforeThis = e.clientX - box.left < box.width / 2;
                  const beforeId = beforeThis ? t.id : (tabs[i + 1]?.id ?? null);
                  this._dragCmpId = null;
                  this._overCmpId = null;
                  if (beforeId === source) return;
                  this.emitEvent('component-moved', {
                    componentId: source,
                    toParentId: node.id,
                    beforeComponentId: beforeId,
                  });
                }}
                >${t.title ?? 'Pestaña'}</span
              >`,
            )}
          </div>
          ${active ? this.renderComponent(active) : empty}`;
        break;
      }
      case 'tab':
        body = html`<div class="col-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'accordionLayout':
        body = html`<div class="col-lay">
          ${children.length
            ? children.map(
                (c, i) => html`
                  <div class="acc-bar"><span>${c.title ?? c.label ?? 'Sección'}</span><span>${i === 0 ? '▾' : '▸'}</span></div>
                  ${i === 0 ? this.renderComponent(c) : nothing}
                `,
              )
            : empty}
        </div>`;
        break;
      case 'card':
        body = html`<div class="card-box">
          ${node.title ? html`<div class="card-title">${node.title}</div>` : nothing}
          <div class="col-lay">${children.length ? kids(children) : empty}</div>
        </div>`;
        break;
      case 'boardLayout':
        body = html`<div class="grid3-lay">
          ${children.length
            ? children.map((c) => html`<div class="board-col">${this.renderComponent(c)}</div>`)
            : empty}
        </div>`;
        break;
      case 'masterDetailLayout': {
        const [master, ...detail] = children;
        body = html`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${master ? this.renderComponent(master) : html`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${detail.length ? kids(detail) : html`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case 'foldoutLayout':
        body = html`<div class="acc-bar"><span>${node.title ?? 'Foldout'}</span><span>▸</span></div>
          <div class="col-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'carouselLayout':
        body = html`<div class="row-lay">${children.length ? kids(children) : empty}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case 'appLayout':
        body = html`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${children.length ? kids(children) : empty}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case 'form': {
        const own = node.modelId && node.modelId === this.page?.modelId;
        const fields = own ? (this.page?.viewmodelFields ?? []) : [];
        body = fields.length
          ? html`<div class="grid-lay">
              ${fields.slice(0, 6).map(
                (f) => html`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${f.label ?? f.name}</label>${this.control(f)}</div>`,
              )}
            </div>`
          : html`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${node.modelId ? `formulario de ${node.modelId}` : 'sin model — click para asignar'}</div>`;
        break;
      }
      case 'listing': {
        const cols = (this.page?.viewmodelFields ?? []).slice(0, 4);
        body = html`<table>
            <tr>${cols.length ? cols.map((f) => html`<th>${f.label ?? f.name}</th>`) : html`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => html`<tr>${(cols.length ? cols : [1, 2, 3]).map(() => html`<td>···</td>`)}</tr>`)}
          </table>
          ${node.queryOperationId ? nothing : html`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case 'button':
        body = html`<span class="btn" style="display:inline-block">${node.label ?? 'Botón'}</span>`;
        break;
      case 'field': {
        const mock = { fieldId: node.fieldId ?? '', name: node.label ?? 'campo', stereotype: node.stereotype ?? undefined } as UiFieldRef;
        body = html`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${node.label ?? 'Campo'}</label>${this.control(mock)}`;
        break;
      }
      case 'text':
        body = html`<div class="text-stub">${node.text ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</div>`;
        break;
      case 'metricCard':
        body = html`<div class="card-box metric"><div class="num">123</div><div class="cap">${node.title ?? 'Métrica'}</div></div>`;
        break;
      case 'menuBar':
        body = html`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        body = html`<div class="col-lay">${children.length ? kids(children) : empty}</div>`;
    }
    const leaf = ModuxPageDesigner.LEAF_KINDS.has(node.kind);
    const over = this._overCmpId === node.id && (this._dragCmpId || this._foreignOver);
    const startDrag = (e: DragEvent) => {
      // The whole node is the handle; the innermost one wins over its ancestors.
      e.stopPropagation();
      this._dragCmpId = node.id;
      e.dataTransfer?.setData(
        'application/x-modux-cmp',
        JSON.stringify({ pageId: this.page?.id, componentId: node.id }),
      );
      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    };
    return html`<div
      class="cmp ${leaf ? 'leafcmp' : ''} ${over ? `overcmp over-${this._overCmpPos}` : ''} ${
        this.selectedCmpId === node.id ? 'selcmp' : ''}"
      data-cmp-id=${node.id}
      data-cmp-kind=${node.kind}
      draggable="true"
      @click=${(e: Event) => {
        e.stopPropagation();
        this.emitEvent('component-selected', { componentId: node.id });
      }}
      @dblclick=${(e: Event) => {
        e.stopPropagation();
        this._cmp = { ...node };
      }}
      @dragstart=${startDrag}
      @dragend=${() => {
        this._dragCmpId = null;
        this._overCmpId = null;
        this._foreignOver = false;
      }}
      @dragover=${(e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const types = e.dataTransfer?.types ?? [];
        this._foreignOver =
          !this._dragCmpId &&
          ([...types].includes('application/x-modux-cmp') || [...types].includes('application/x-modux-palette'));
        this._overCmpId = node.id;
        this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(node, e) : 'into';
      }}
      @dragleave=${() => (this._overCmpId = null)}
      @drop=${(e: DragEvent) => {
        this._foreignOver = false;
        // palette drops bubble up to the surface (which asks us for the slot)
        if (!this._dragCmpId && !e.dataTransfer?.types?.includes?.('application/x-modux-cmp')) return;
        e.preventDefault();
        e.stopPropagation();
        this.onCmpDrop(node, this._overCmpPos, e);
      }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${startDrag}
        >${ModuxPageDesigner.KIND_LABELS[node.kind] ?? node.kind}${node.title ? ` · ${node.title}` : ''}</span
      >
      ${body}
    </div>`;
  }

  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  private renderInferredBody(_page: UiPageRef, fields: UiFieldRef[], listing: boolean) {
    return html`
        ${listing
          ? html`<table>
              <tr>${fields.slice(0, 4).map((f) => html`<th>${f.label ?? f.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => html`<tr>${fields.slice(0, 4).map(() => html`<td>···</td>`)}</tr>`)}
            </table>`
          : nothing}
        ${fields.length
          ? html`<div class="grid">
              ${fields.map(
                (f) => html`
                  <div
                    class="field ${f.colspan === 2 ? 'span2' : ''} ${this._overId === f.fieldId ? 'dropping' : ''}"
                    draggable="true"
                    data-field-id=${f.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(f)}
                    @dragstart=${(e: DragEvent) => {
                      e.stopPropagation();
                      this._dragId = f.fieldId;
                    }}
                    @dragover=${(e: DragEvent) => {
                      e.preventDefault();
                      this._overId = f.fieldId;
                    }}
                    @dragleave=${() => (this._overId = null)}
                    @drop=${(e: DragEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.onDrop(f.fieldId);
                    }}
                  >
                    <label>${f.label ?? f.name}</label>
                    ${this.control(f)}
                  </div>
                `,
              )}
            </div>`
          : html`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }

  /** The content-node declaration editor. */
  private renderCmpPop() {
    const draft = this._cmp;
    if (!draft) return nothing;
    const set = (patch: Partial<UiComponentNodeRef>) => (this._cmp = { ...this._cmp!, ...patch });
    const kind = draft.kind;
    const titled = ['tab', 'card', 'accordionLayout', 'foldoutLayout', 'metricCard', 'appLayout',
      'verticalLayout', 'horizontalLayout', 'formLayout', 'splitLayout', 'tabLayout', 'gridLayout',
      'boardLayout', 'dashboardLayout', 'masterDetailLayout', 'carouselLayout'].includes(kind);
    return html`<div class="pop" @click=${(e: Event) => e.stopPropagation()}>
      ${titled
        ? html`<label>Título</label>
            <input .value=${draft.title ?? ''} @input=${(e: Event) => set({ title: (e.target as HTMLInputElement).value })} />`
        : nothing}
      ${kind === 'text'
        ? html`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${draft.text ?? ''} @input=${(e: Event) => set({ text: (e.target as HTMLInputElement).value })} />`
        : nothing}
      ${kind === 'button' || kind === 'field'
        ? html`<label>Etiqueta</label>
            <input .value=${draft.label ?? ''} @input=${(e: Event) => set({ label: (e.target as HTMLInputElement).value })} />`
        : nothing}
      ${kind === 'button'
        ? html`<label>Caso de uso</label>
            <select @change=${(e: Event) => set({ useCaseId: (e.target as HTMLSelectElement).value || undefined })}>
              <option value="" ?selected=${!draft.useCaseId}>—</option>
              ${this.useCases.map((u) => html`<option value=${u.id} ?selected=${u.id === draft.useCaseId}>${u.name}</option>`)}
            </select>
            <label>Mapping</label>
            <select style="grid-column: 2 / -1" @change=${(e: Event) => set({ mappingId: (e.target as HTMLSelectElement).value || undefined })}>
              <option value="" ?selected=${!draft.mappingId}>(el viewmodel viaja tal cual)</option>
              ${this.mappings.map((mm) => html`<option value=${mm.id} ?selected=${mm.id === draft.mappingId}>${mm.name}</option>`)}
            </select>`
        : nothing}
      ${kind === 'form'
        ? html`<label>Model</label>
            <select style="grid-column: 2 / -1" @change=${(e: Event) => set({ modelId: (e.target as HTMLSelectElement).value || undefined })}>
              <option value="" ?selected=${!draft.modelId}>—</option>
              ${this.models.map((m) => html`<option value=${m.id} ?selected=${m.id === draft.modelId}>${m.name}</option>`)}
            </select>`
        : nothing}
      ${kind === 'listing'
        ? html`<label>Consulta</label>
            <select
              style="grid-column: 2 / -1"
              @change=${(e: Event) => {
                const id = (e.target as HTMLSelectElement).value;
                const op = this.queryOps.find((o) => o.id === id);
                set({ queryOperationId: op?.id, queryServiceId: op?.queryServiceId });
              }}
            >
              <option value="" ?selected=${!draft.queryOperationId}>—</option>
              ${this.queryOps.map((o) => html`<option value=${o.id} ?selected=${o.id === draft.queryOperationId}>${o.name}</option>`)}
            </select>`
        : nothing}
      ${kind === 'field'
        ? html`<label>Estereotipo</label>
            <select @change=${(e: Event) => set({ stereotype: (e.target as HTMLSelectElement).value || undefined })}>
              ${STEREOTYPES.map((st) => html`<option value=${st} ?selected=${st === (draft.stereotype ?? 'regular')}>${st}</option>`)}
            </select>`
        : nothing}
      ${kind === 'tabLayout'
        ? html`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>`
        : nothing}
      <div class="actions">
        <button
          @click=${() => {
            const componentId = this._cmp!.id;
            this._cmp = null;
            this.emitEvent('component-removed', { componentId });
          }}
        >
          Quitar
        </button>
        <button @click=${() => (this._cmp = null)}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
            const d = this._cmp!;
            this._cmp = null;
            this.emitEvent('component-config-changed', {
              componentId: d.id,
              title: d.title ?? null,
              text: d.text ?? null,
              label: d.label ?? null,
              useCaseId: d.useCaseId ?? null,
              mappingId: d.mappingId ?? null,
              modelId: d.modelId ?? null,
              queryServiceId: d.queryServiceId ?? null,
              queryOperationId: d.queryOperationId ?? null,
              fieldId: d.fieldId ?? null,
              stereotype: d.stereotype ?? null,
              colspan: d.colspan ?? null,
            });
          }}
        >
          Aplicar
        </button>
      </div>
    </div>`;
  }

  /** Clicking outside every node clears the selection (the pop stops its clicks). */
  private onBodyClick(): void {
    this.emitEvent('component-selected', { componentId: null });
  }

  private onFieldClick(field: UiFieldRef): void {
    this._editing = {
      fieldId: field.fieldId,
      stereotype: field.stereotype ?? 'regular',
      colspan: field.colspan ?? 1,
      label: field.label ?? '',
    };
  }

  private applyEdit(): void {
    if (!this._editing) return;
    const e = this._editing;
    this.emitEvent('field-config-changed', {
      fieldId: e.fieldId,
      stereotype: e.stereotype === 'regular' ? null : e.stereotype,
      colspan: e.colspan === 1 ? null : e.colspan,
      label: e.label.trim() === '' ? null : e.label.trim(),
    });
    this._editing = null;
  }

  private onDrop(targetId: string): void {
    const source = this._dragId;
    this._dragId = null;
    this._overId = null;
    if (!source || source === targetId || !this.page) return;
    const ids = (this.page.viewmodelFields ?? []).map((f) => f.fieldId);
    const from = ids.indexOf(source);
    const to = ids.indexOf(targetId);
    if (from < 0 || to < 0) return;
    ids.splice(to, 0, ...ids.splice(from, 1));
    this.emitEvent('fields-reordered', { fieldIds: ids });
  }

  render() {
    const page = this.page;
    if (!page) return nothing;
    const fields = page.viewmodelFields ?? [];
    const listing = page.type === 'CRUD' || !!page.listingQueryServiceId;
    const wizard = page.type === 'WIZARD';
    return html`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null
          ? html`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(e: Event) => (this._rename = (e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter') this.applyRename();
                if (e.key === 'Escape') this._rename = null;
              }}
              @blur=${() => this.applyRename()}
            />`
          : html`<span class="title" title="Doble click para renombrar" @dblclick=${() => (this._rename = page.name)}
              >${page.name}</span
            >`}
        <select
          class="type"
          title="Tipo de página: Página (el contenido decide), CRUD (listado + ficha) o Wizard (pasos)"
          @change=${(e: Event) =>
            this.emitEvent('page-type-changed', { pageType: (e.target as HTMLSelectElement).value })}
        >
          ${(() => {
            const current = page.type ?? 'PAGE';
            const kinds: [string, string][] = [
              ['PAGE', 'Página'],
              ['CRUD', 'CRUD'],
              ['WIZARD', 'Wizard'],
            ];
            // Legacy store values keep showing until the user re-types the page;
            // FORM and DASHBOARD are composition now (form component, dashboard layout).
            if (current === 'FORM') kinds.splice(1, 0, ['FORM', 'Form (legado)']);
            if (current === 'DASHBOARD') kinds.push(['DASHBOARD', 'Dashboard (legado)']);
            return kinds.map(
              ([v, label]) => html`<option value=${v} ?selected=${current === v}>${label}</option>`,
            );
          })()}
        </select>
        ${this._route !== null
          ? html`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(e: Event) => (this._route = (e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter') this.applyRoute();
                if (e.key === 'Escape') this._route = null;
              }}
              @blur=${() => this.applyRoute()}
            />`
          : html`<span class="route" title="Click para editar la ruta" @click=${() => (this._route = page.route ?? '/')}
              >${page.route ?? '/…'}</span
            >`}
        <button @click=${() => this.emitEvent('open-crud')} title="Abrir la ficha completa de la página">Ficha</button>
        <button class="close" @click=${() => this.emitEvent('designer-closed')} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(page.buttons ?? []).map(
          (b) => html`<span
            class="btn"
            title=${b.mappingId ? `${b.useCaseId} · mapping ${b.mappingId}` : (b.useCaseId ?? '')}
            @click=${() =>
              (this._btn = {
                useCaseId: b.useCaseId ?? '',
                label: b.label ?? '',
                mappingId: b.mappingId ?? '',
              })}
            >${b.label}</span
          >`,
        )}
        <button class="add" @click=${() => (this._btn = { useCaseId: '', label: '', mappingId: '' })}>
          + botón
        </button>
      </div>
      <div class="vm">
        viewmodel:
        ${page.modelId
          ? html`<span class="chip">${page.modelName ?? page.modelId}</span>`
          : html`<span>—</span>`}
        <select
          title="Asignar el Model que hace de viewmodel"
          @change=${(e: Event) => {
            const value = (e.target as HTMLSelectElement).value;
            this.emitEvent('page-model-changed', { modelId: value === '' ? null : value });
          }}
        >
          <option value="" ?selected=${!page.modelId}>(sin viewmodel)</option>
          ${this.models.map(
            (m) => html`<option value=${m.id} ?selected=${m.id === page.modelId}>${m.name}</option>`,
          )}
        </select>
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${wizard
          ? html`<div class="wizbar">
              <span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>
              <span class="wiznext">Siguiente ›</span>
            </div>`
          : nothing}
        ${(page.content ?? []).length
          ? html`<div class="col-lay">${(page.content ?? []).map((n) => this.renderComponent(n))}</div>`
          : this.renderInferredBody(page, fields, listing)}
      </div>
      ${this.renderCmpPop()}
      ${this._btn
        ? (() => {
            const existing = (this.page?.buttons ?? []).some((b) => b.useCaseId === this._btn!.useCaseId);
            return html`<div class="pop">
              <label>Caso de uso</label>
              <select
                ?disabled=${existing}
                @change=${(e: Event) =>
                  (this._btn = { ...this._btn!, useCaseId: (e.target as HTMLSelectElement).value })}
              >
                <option value="" ?selected=${!this._btn.useCaseId}>elige…</option>
                ${this.useCases.map(
                  (u) => html`<option value=${u.id} ?selected=${u.id === this._btn!.useCaseId}>${u.name}</option>`,
                )}
              </select>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(e: Event) => (this._btn = { ...this._btn!, label: (e.target as HTMLInputElement).value })}
              />
              <label>Mapping</label>
              <select
                style="grid-column: 2 / -1"
                title="ModelMapping del viewmodel al request del caso de uso"
                @change=${(e: Event) =>
                  (this._btn = { ...this._btn!, mappingId: (e.target as HTMLSelectElement).value })}
              >
                <option value="" ?selected=${!this._btn.mappingId}>(el viewmodel viaja tal cual)</option>
                ${this.mappings.map(
                  (mm) => html`<option value=${mm.id} ?selected=${mm.id === this._btn!.mappingId}>${mm.name}</option>`,
                )}
              </select>
              <div class="actions">
                ${existing
                  ? html`<button
                      @click=${() => {
                        const useCaseId = this._btn!.useCaseId;
                        this._btn = null;
                        this.emitEvent('button-removed', { useCaseId });
                      }}
                    >
                      Quitar
                    </button>`
                  : nothing}
                <button @click=${() => (this._btn = null)}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(existing)}>Aplicar</button>
              </div>
            </div>`;
          })()
        : nothing}
      ${this._editing
        ? html`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(e: Event) =>
                (this._editing = { ...this._editing!, stereotype: (e.target as HTMLSelectElement).value })}
            >
              ${STEREOTYPES.map(
                (s) => html`<option value=${s} ?selected=${s === this._editing!.stereotype}>${s}</option>`,
              )}
            </select>
            <label>Ancho</label>
            <select
              @change=${(e: Event) =>
                (this._editing = { ...this._editing!, colspan: Number((e.target as HTMLSelectElement).value) })}
            >
              <option value="1" ?selected=${this._editing.colspan !== 2}>media columna</option>
              <option value="2" ?selected=${this._editing.colspan === 2}>fila entera</option>
            </select>
            <label>Etiqueta</label>
            <input
              style="grid-column: 2 / -1"
              placeholder="(el nombre del campo)"
              .value=${this._editing.label}
              @input=${(e: Event) =>
                (this._editing = { ...this._editing!, label: (e.target as HTMLInputElement).value })}
            />
            <div class="actions">
              <button @click=${() => (this._editing = null)}>Cancelar</button>
              <button class="ok" @click=${this.applyEdit}>Aplicar</button>
            </div>
          </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-page-designer': ModuxPageDesigner;
  }
}
