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
  @property({ attribute: false }) pages: { id: string; name: string }[] = [];
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
  @state() private _btn: { useCaseId: string; label: string; mappingId: string; bar: string } | null = null;
  /** The content-tree node whose declaration is being edited (draft copy). */
  @state() private _cmp: UiComponentNodeRef | null = null;
  @state() private _dragCmpId: string | null = null;
  /** The wizard step being dragged along the wizbar (its stable key). */
  @state() private _dragWizKey: string | null = null;
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
    .vm .chip,
    .pop .chip {
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
    .notice-stub {
      border: 1px solid #7dd3fc;
      background: #f0f9ff;
      color: #075985;
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 11px;
    }
    .stub-row {
      display: flex;
      gap: 6px;
      align-items: center;
      font-size: 11px;
      color: #334155;
    }
    .stub-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .stub-step {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1.5px solid #cbd5e1;
      color: #94a3b8;
      font-size: 10px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }
    .stub-step.on {
      background: #0284c7;
      border-color: #0284c7;
      color: #ffffff;
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
    .zone.zhdr {
      padding: 5px 12px 3px;
      font-size: 11.5px;
      font-weight: 700;
      color: #64748b;
      border-bottom: 1px dashed #e2e8f0;
    }
    .bottombar {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      padding: 7px 12px;
      border-top: 1.5px solid #e2e8f0;
      background: #f8fafc;
    }
    .bottombar .btn {
      background: #0284c7;
      color: #ffffff;
      border-radius: 7px;
      padding: 3px 12px;
      font-size: 11.5px;
      cursor: pointer;
    }
    .bottombar .add {
      border: 1px dashed #94a3b8;
      background: none;
      border-radius: 7px;
      padding: 2px 8px;
      font-size: 11px;
      color: #64748b;
      cursor: pointer;
    }
    .zoneph {
      font-size: 10.5px;
      color: #cbd5e1;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .vm .chipx,
    .pop .chipx {
      margin-left: 5px;
      cursor: pointer;
      color: #94a3b8;
    }
    .vm .chipx:hover,
    .pop .chipx:hover {
      color: #dc2626;
    }
    .vm .vmhint,
    .pop .vmhint {
      color: #94a3b8;
      font-size: 10.5px;
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
    .wizbar span[draggable='true'] {
      cursor: grab;
      user-select: none;
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
      this.emitEvent('button-added', {
        useCaseId: draft.useCaseId,
        label: draft.label.trim() || undefined,
        bar: draft.bar,
      });
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
    section: 'Sección', zones: 'Zonas', toolbar: 'Toolbar', pageHeader: 'Cabecera',
    hero: 'Hero', scoreboard: 'Scoreboard', wizard: 'Wizard', app: 'Shell',
    crud: 'CRUD', filterBar: 'Filtros', fab: 'FAB', appContext: 'Contexto',
    kpi: 'KPI', stat: 'Estadística', notice: 'Aviso', banner: 'Banner',
    calloutCard: 'Callout', bulletedList: 'Lista', statusList: 'Estados',
    checklist: 'Checklist', fileList: 'Ficheros', separator: 'Separador',
    entityHeader: 'Entidad', emptyState: 'Vacío', skeleton: 'Esqueleto',
    progressBar: 'Progreso', progressSteps: 'Pasos', taskProgress: 'Tareas',
    meter: 'Medidor', timeline: 'Timeline', calendar: 'Calendario',
    kanban: 'Kanban', gantt: 'Gantt', trendChart: 'Tendencia',
    heatmap: 'Mapa de calor', funnel: 'Embudo', orgChart: 'Organigrama',
    featureGrid: 'Features', testimonials: 'Testimonios', faq: 'FAQ',
    commentThread: 'Comentarios', comparisonCard: 'Comparativa',
    planningBoard: 'Planning', offerCard: 'Oferta', addOnPicker: 'Extras',
    paymentPicker: 'Pago', pricingTable: 'Precios', processMonitor: 'Procesos',
    resourceGrid: 'Recursos', taskQueue: 'Cola', ledger: 'Desglose',
    chat: 'Chat', markdown: 'Markdown', breadcrumbs: 'Migas',
  };

  static readonly LEAF_KINDS = new Set([
    'form', 'listing', 'button', 'field', 'text', 'metricCard', 'menuBar',
    'crud', 'filterBar', 'fab', 'appContext', 'kpi', 'stat', 'notice', 'banner',
    'calloutCard', 'bulletedList', 'statusList', 'checklist', 'fileList',
    'separator', 'entityHeader', 'emptyState', 'skeleton', 'progressBar',
    'progressSteps', 'taskProgress', 'meter', 'timeline', 'calendar', 'kanban',
    'gantt', 'trendChart', 'heatmap', 'funnel', 'orgChart', 'featureGrid',
    'testimonials', 'faq', 'commentThread', 'comparisonCard',
    'planningBoard', 'offerCard', 'addOnPicker', 'paymentPicker', 'pricingTable',
    'processMonitor', 'resourceGrid', 'taskQueue', 'ledger', 'chat', 'markdown',
    'breadcrumbs',
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

  /** A progress-like bar, the shared stub for progressBar/meter/taskProgress. */
  private barStub(pct: number, color = '#0284c7') {
    return html`<div style="height:8px;border-radius:4px;background:#e2e8f0;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:${color}"></div></div>`;
  }

  /** ① — ② — ③ with the given step active: wizard headers and progressSteps. */
  private stepsStub(active: number) {
    return html`<div class="stub-row" style="justify-content:center;gap:0;margin-bottom:6px">
      ${[0, 1, 2].map((i) => html`
        <span class="stub-step ${i <= active ? 'on' : ''}">${i + 1}</span>
        ${i < 2 ? html`<span style="width:26px;height:1.5px;background:${i < active ? '#0284c7' : '#e2e8f0'}"></span>` : nothing}`)}
    </div>`;
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
      // ---- Mateu design-contract containers ----
      case 'section':
        body = html`<div class="acc-bar"><span>${node.title ?? 'Sección'}</span></div>
          <div class="col-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'zones':
        body = html`<div class="row-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'toolbar':
        body = html`<div class="row-lay" style="align-items:center">
          ${children.length ? kids(children) : html`<span class="btn" style="display:inline-block;flex:none">Acción</span>${empty}`}
        </div>`;
        break;
      case 'pageHeader':
        body = html`<div class="row-lay" style="align-items:center">
          <div style="flex:2;font-size:15px;font-weight:800;color:#0f172a">${node.title ?? 'Título de la página'}</div>
          ${children.length ? kids(children) : nothing}
        </div>`;
        break;
      case 'hero':
        body = html`<div style="background:#0f172a;color:#f8fafc;border-radius:10px;padding:22px 18px;text-align:center">
            <div style="font-size:17px;font-weight:800">${node.title ?? 'Un titular que vende'}</div>
            <div style="font-size:11px;color:#cbd5e1;margin-top:4px">${node.text ?? 'El subtítulo que lo explica'}</div>
          </div>
          ${children.length ? html`<div class="col-lay" style="margin-top:6px">${kids(children)}</div>` : nothing}`;
        break;
      case 'scoreboard':
        body = html`<div class="grid3-lay">${children.length ? kids(children) : html`
          <div class="card-box metric"><div class="num">12</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">3,4</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">56%</div><div class="cap">KPI</div></div>`}</div>`;
        break;
      case 'wizard':
        body = html`${this.stepsStub(0)}
          <div class="col-lay">${children.length ? kids(children) : empty}</div>`;
        break;
      case 'app':
        body = html`<div class="appbar">⛭ ${node.title ?? 'app'}</div>
          <div class="col-lay" style="padding-top:6px">${children.length ? kids(children) : empty}</div>`;
        break;
      // ---- Mateu design-contract leaves ----
      case 'crud':
        body = html`<div class="row-lay" style="align-items:center;margin-bottom:6px">
            <div class="control" style="flex:1">Buscar…</div>
            <span class="btn" style="display:inline-block;flex:none">Nuevo</span>
          </div>
          <table>
            <tr><th>col 1</th><th>col 2</th><th>col 3</th></tr>
            ${[1, 2].map(() => html`<tr><td>···</td><td>···</td><td>···</td></tr>`)}
          </table>`;
        break;
      case 'filterBar':
        body = html`<div class="row-lay" style="align-items:center">
          ${['Estado ▾', 'Fecha ▾', 'Tipo ▾'].map((t) => html`<span class="control" style="flex:none;font-size:11px">${t}</span>`)}
          <div class="control" style="flex:1">Buscar…</div>
        </div>`;
        break;
      case 'fab':
        body = html`<div style="display:flex;justify-content:flex-end"><span
          style="width:34px;height:34px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700">+</span></div>`;
        break;
      case 'appContext':
        body = html`<span class="control" style="display:inline-flex;min-width:130px">${node.label ?? 'Contexto'}&nbsp;<span>▾</span></span>`;
        break;
      case 'kpi':
      case 'stat':
        body = html`<div class="card-box metric"><div class="num">1.234</div><div class="cap">${node.title ?? (node.kind === 'kpi' ? 'KPI' : 'Estadística')}</div></div>`;
        break;
      case 'notice':
        body = html`<div class="notice-stub">ℹ️ ${node.text ?? 'Un aviso para el usuario'}</div>`;
        break;
      case 'banner':
        body = html`<div class="notice-stub" style="background:#fef3c7;border-color:#f59e0b;color:#92400e">📣 ${node.text ?? node.title ?? 'Banner destacado'}</div>`;
        break;
      case 'calloutCard':
        body = html`<div class="card-box"><div class="card-title">💡 ${node.title ?? 'Callout'}</div>
          <div class="text-stub">${node.text ?? 'Algo que merece atención especial.'}</div></div>`;
        break;
      case 'bulletedList':
        body = html`<div class="text-stub">${['Primer punto', 'Segundo punto', 'Tercer punto'].map((t) => html`<div>• ${t}</div>`)}</div>`;
        break;
      case 'statusList':
        body = html`<div class="col-lay" style="gap:3px">${([['#16a34a', 'Operativo'], ['#f59e0b', 'Degradado'], ['#dc2626', 'Caído']] as const).map(
          ([c, t]) => html`<div class="stub-row"><span class="stub-dot" style="background:${c}"></span>${t}</div>`)}</div>`;
        break;
      case 'checklist':
        body = html`<div class="col-lay" style="gap:3px">${([['☑', 'Hecho'], ['☑', 'También hecho'], ['☐', 'Pendiente']] as const).map(
          ([m, t]) => html`<div class="stub-row"><span>${m}</span>${t}</div>`)}</div>`;
        break;
      case 'fileList':
        body = html`<div class="col-lay" style="gap:3px">${['contrato.pdf · 1,2 MB', 'foto.png · 340 KB'].map(
          (t) => html`<div class="stub-row">📄 ${t}</div>`)}</div>`;
        break;
      case 'separator':
        body = html`<div style="border-top:1.5px solid #e2e8f0;margin:6px 0"></div>`;
        break;
      case 'entityHeader':
        body = html`<div style="display:flex;gap:10px;align-items:center">
          <div style="width:34px;height:34px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-weight:800;color:#0284c7">A</div>
          <div><div style="font-weight:800;color:#0f172a;font-size:13px">${node.title ?? 'Entidad'}</div>
            <div style="font-size:10.5px;color:#94a3b8">${node.text ?? 'metadatos · estado'}</div></div>
        </div>`;
        break;
      case 'emptyState':
        body = html`<div class="empty" style="padding:14px">🗇<br />${node.text ?? 'Nada por aquí todavía'}</div>`;
        break;
      case 'skeleton':
        body = html`<div class="col-lay" style="gap:5px">${[80, 60, 72].map(
          (w) => html`<div style="height:9px;border-radius:5px;background:#e2e8f0;width:${w}%"></div>`)}</div>`;
        break;
      case 'progressBar':
        body = this.barStub(40);
        break;
      case 'meter':
        body = this.barStub(72, '#16a34a');
        break;
      case 'taskProgress':
        body = html`<div class="stub-row" style="margin-bottom:3px">${node.title ?? 'Tareas'} · 3/5</div>${this.barStub(60)}`;
        break;
      case 'progressSteps':
        body = this.stepsStub(1);
        break;
      case 'timeline':
        body = html`<div class="col-lay" style="gap:0">${['Creado', 'Aprobado', 'Enviado'].map(
          (t, i) => html`<div class="stub-row" style="align-items:stretch;gap:8px">
            <div style="display:flex;flex-direction:column;align-items:center"><span class="stub-dot" style="background:#0284c7"></span>${i < 2 ? html`<span style="flex:1;width:1.5px;background:#e2e8f0;min-height:10px"></span>` : nothing}</div>
            <span style="padding-bottom:8px">${t}</span></div>`)}</div>`;
        break;
      case 'calendar':
        body = html`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:9px;color:#64748b;text-align:center">
          ${['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => html`<span style="font-weight:700">${d}</span>`)}
          ${Array.from({ length: 14 }, (_, i) => html`<span style="padding:2px;border-radius:4px;${i === 9 ? 'background:#0284c7;color:#fff' : 'background:#f8fafc'}">${i + 1}</span>`)}
        </div>`;
        break;
      case 'kanban':
        body = html`<div class="grid3-lay">${['Por hacer', 'En curso', 'Hecho'].map(
          (t, i) => html`<div class="board-col"><div class="stub-row" style="font-weight:700">${t}</div>
            ${Array.from({ length: 2 - (i % 2) }, () => html`<div class="card-box" style="padding:6px;font-size:10px;color:#94a3b8">tarjeta</div>`)}</div>`)}</div>`;
        break;
      case 'gantt':
        body = html`<div class="col-lay" style="gap:4px">${([[0, 45, 'Análisis'], [30, 40, 'Diseño'], [55, 45, 'Build']] as const).map(
          ([off, w, t]) => html`<div class="stub-row"><span style="flex:0 0 52px">${t}</span>
            <div style="flex:1;height:9px;border-radius:5px;background:#f1f5f9"><div style="margin-left:${off}%;width:${w}%;height:100%;border-radius:5px;background:#0284c7"></div></div></div>`)}</div>`;
        break;
      case 'trendChart':
        body = html`<svg viewBox="0 0 100 28" style="width:100%;height:38px" preserveAspectRatio="none">
          <polyline points="0,24 18,18 36,20 54,10 72,13 100,3" fill="none" stroke="#0284c7" stroke-width="2" />
        </svg>`;
        break;
      case 'heatmap':
        body = html`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
          ${[3, 6, 2, 8, 5, 1, 7, 4, 9, 2, 6, 3, 8, 5].map((v) => html`<span style="height:12px;border-radius:3px;background:rgba(2,132,199,${v / 10})"></span>`)}
        </div>`;
        break;
      case 'funnel':
        body = html`<div class="col-lay" style="gap:3px;align-items:center">${[100, 70, 45, 25].map(
          (w) => html`<div style="width:${w}%;height:11px;border-radius:5px;background:#0284c7;opacity:${w / 100}"></div>`)}</div>`;
        break;
      case 'orgChart':
        body = html`<div class="col-lay" style="gap:4px;align-items:center">
          <span class="control" style="flex:none;font-size:10px">Dirección</span>
          <div class="row-lay" style="width:80%">${['Área A', 'Área B'].map((t) => html`<span class="control" style="font-size:10px;justify-content:center">${t}</span>`)}</div>
        </div>`;
        break;
      case 'featureGrid':
        body = html`<div class="grid3-lay">${['⚡ Rápido', '🔒 Seguro', '🧩 Modular'].map(
          (t) => html`<div class="card-box" style="text-align:center;font-size:11px;color:#334155">${t}</div>`)}</div>`;
        break;
      case 'testimonials':
        body = html`<div class="card-box"><div class="text-stub">«${node.text ?? 'Nos cambió la forma de trabajar.'}»</div>
          <div style="font-size:10.5px;color:#94a3b8;margin-top:4px">— Cliente contento</div></div>`;
        break;
      case 'faq':
        body = html`<div class="col-lay" style="gap:3px">${['¿Cómo empiezo?', '¿Cuánto cuesta?'].map(
          (q) => html`<div class="acc-bar"><span>${q}</span><span>▸</span></div>`)}</div>`;
        break;
      case 'commentThread':
        body = html`<div class="col-lay" style="gap:4px">${([['Ana', 'Esto está casi listo'], ['Luis', 'Le doy un repaso y cierro']] as const).map(
          ([a, t]) => html`<div class="card-box" style="padding:6px 8px"><span style="font-size:10px;font-weight:700;color:#0284c7">${a}</span>
            <span class="text-stub"> ${t}</span></div>`)}</div>`;
        break;
      case 'comparisonCard':
        body = html`<div class="grid-lay">${(['Básico', 'Pro'] as const).map(
          (p, i) => html`<div class="card-box" style="text-align:center"><div class="card-title">${p}</div>
            <div class="text-stub">✓ Una cosa<br />${i ? '✓' : '✕'} Otra cosa</div></div>`)}</div>`;
        break;
      // ---- Mateu enterprise/booking wave ----
      case 'planningBoard':
        body = html`<div class="col-lay" style="gap:4px">${([['Recurso A', 10, 35], ['Recurso B', 40, 30], ['Recurso C', 20, 50]] as const).map(
          ([t, off, w]) => html`<div class="stub-row"><span style="flex:0 0 64px">${t}</span>
            <div style="flex:1;height:14px;border-radius:4px;background:#f1f5f9"><div style="margin-left:${off}%;width:${w}%;height:100%;border-radius:4px;background:#0284c7;opacity:.85"></div></div></div>`)}
          <div class="stub-row" style="justify-content:space-between;color:#94a3b8;font-size:9px"><span>lun</span><span>mié</span><span>vie</span><span>dom</span></div>`;
        break;
      case 'offerCard':
        body = html`<div class="card-box" style="display:flex;gap:10px;align-items:center">
          <div style="width:44px;height:44px;border-radius:8px;background:#e0f2fe"></div>
          <div style="flex:1"><div class="card-title">${node.title ?? 'Una oferta irresistible'}</div>
            <div class="text-stub">✓ Ventaja uno · ✓ Ventaja dos</div></div>
          <span class="btn" style="flex:none">59 € · Añadir</span>
        </div>`;
        break;
      case 'addOnPicker':
        body = html`<div class="col-lay" style="gap:3px">${([['🧖', 'Spa', '25 €'], ['🍳', 'Desayuno', '12 €']] as const).map(
          ([i, t, p]) => html`<div class="stub-row" style="justify-content:space-between"><span>${i} ${t}</span><span class="btn" style="font-size:10px;padding:2px 8px">${p} +</span></div>`)}
          <div class="stub-row" style="justify-content:flex-end;font-weight:700">Total: 37 €</div>`;
        break;
      case 'paymentPicker':
        body = html`<div class="col-lay" style="gap:4px">
          <div class="row-lay">${['💳 Tarjeta', '🏦 Transferencia'].map((t, i) => html`<span class="control" style="justify-content:center;font-size:11px;${i === 0 ? 'border-color:#0284c7' : ''}">${t}</span>`)}</div>
          <span class="btn" style="text-align:center">Confirmar y pagar</span></div>`;
        break;
      case 'pricingTable':
        body = html`<div class="grid-lay">${([['Básico', '9 €/mes', ''], ['Pro', '29 €/mes', 'border-color:#0284c7']] as const).map(
          ([p, pr, st]) => html`<div class="card-box" style="text-align:center;${st}"><div class="card-title">${p}</div>
            <div style="font-size:16px;font-weight:800;color:#0f172a">${pr}</div>
            <div class="text-stub">✓ Una cosa<br />✓ Otra cosa</div>
            <span class="btn" style="display:inline-block;margin-top:4px;font-size:10px">Elegir</span></div>`)}</div>`;
        break;
      case 'processMonitor':
        body = html`<div class="col-lay" style="gap:3px">${([['Nóminas', '#16a34a', 'OK'], ['Facturación', '#f59e0b', '2 avisos']] as const).map(
          ([t, c, s]) => html`<div class="stub-row" style="justify-content:space-between"><span><span class="stub-dot" style="background:${c};display:inline-block;margin-right:6px"></span>${t}</span><span style="color:#94a3b8">${s}</span></div>`)}</div>`;
        break;
      case 'resourceGrid':
        body = html`<div class="grid3-lay">${(['Estándar', 'Superior ★', 'Suite'] as const).map(
          (t, i) => html`<div class="card-box" style="text-align:center;font-size:11px;${i === 1 ? 'border-color:#0284c7' : ''}">${t}<br /><span style="color:#94a3b8;font-size:10px">${i === 1 ? 'recomendada' : 'disponible'}</span></div>`)}</div>`;
        break;
      case 'taskQueue':
        body = html`<div class="acc-bar"><span>Pendientes (2)</span></div>
          <div class="col-lay" style="gap:3px">${['Revisar contrato', 'Llamar al cliente'].map(
            (t) => html`<div class="stub-row">☐ ${t}</div>`)}</div>`;
        break;
      case 'ledger':
        body = html`<div class="col-lay" style="gap:2px">${([['Habitación', '240 €'], ['Spa', '25 €'], ['Desayuno', 'incluido']] as const).map(
          ([c, a]) => html`<div class="stub-row" style="justify-content:space-between"><span>${c}</span><span>${a}</span></div>`)}
          <div class="stub-row" style="justify-content:space-between;font-weight:800;border-top:1.5px solid #e2e8f0;padding-top:3px"><span>Total</span><span>265 €</span></div>`;
        break;
      case 'chat':
        body = html`<div class="col-lay" style="gap:4px">
          <div class="card-box" style="padding:6px 8px;max-width:75%">Hola, ¿en qué puedo ayudarte?</div>
          <div class="card-box" style="padding:6px 8px;max-width:75%;align-self:flex-end;background:#e0f2fe">Quería una reserva…</div>
          <div class="control">Escribe un mensaje…</div></div>`;
        break;
      case 'markdown':
        body = html`<div class="text-stub"><b># Título</b><br />Texto con <b>**negritas**</b> y <span style="color:#0284c7">[enlaces]</span>…</div>`;
        break;
      case 'breadcrumbs':
        body = html`<div class="stub-row" style="color:#94a3b8">Inicio <span>›</span> Sección <span>›</span> <span style="color:#0f172a;font-weight:600">${node.title ?? 'Aquí'}</span></div>`;
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
            <span style="grid-column: 2 / -1">
              ${draft.useCaseId
                ? html`<span class="chip">${this.useCases.find((u) => u.id === draft.useCaseId)?.name ?? draft.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>`
                : html`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${draft.mappingId
                ? html`<span class="chip"
                      >${this.mappings.find((mm) => mm.id === draft.mappingId)?.name ?? draft.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => set({ mappingId: undefined })}>✕</span></span
                    >`
                : html`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>`
        : nothing}
      ${kind === 'form'
        ? html`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${draft.modelId
                ? html`<span class="chip"
                      >${this.models.find((m) => m.id === draft.modelId)?.name ?? draft.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => set({ modelId: undefined })}>✕</span></span
                    >`
                : html`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>
            <label>Mapping</label>
            <span style="grid-column: 2 / -1">
              ${draft.mappingId
                ? html`<span class="chip"
                      >${this.mappings.find((mm) => mm.id === draft.mappingId)?.name ?? draft.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => set({ mappingId: undefined })}>✕</span></span
                    >`
                : html`<span class="vmhint">el viewmodel viaja tal cual al guardar — suelta un mapeado del Catálogo sobre el formulario</span>`}
            </span>`
        : nothing}
      ${kind === 'listing' || kind === 'crud'
        ? html`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${draft.queryOperationId
                ? html`<span class="chip"
                      >${this.queryOps.find((o) => o.id === draft.queryOperationId)?.name ?? draft.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => set({ queryOperationId: undefined, queryServiceId: undefined })}
                        >✕</span
                      ></span
                    >`
                : html`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>
            <label>Ficha</label>
            <select
              style="grid-column: 2 / -1"
              title="La página que abre el click en una fila"
              @change=${(e: Event) => set({ detailPageId: (e.target as HTMLSelectElement).value || undefined })}
            >
              <option value="">— sin ficha —</option>
              ${this.pages
                .filter((pg) => pg.id !== this.page?.id)
                .map((pg) => html`<option value=${pg.id} ?selected=${pg.id === draft.detailPageId}>${pg.name}</option>`)}
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
              detailPageId: d.detailPageId ?? null,
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
        <button class="ficha" @click=${() => this.emitEvent('open-crud')} title="Abrir la ficha de la página (detalle y edición)">Ficha</button>
        <button class="close" @click=${() => this.emitEvent('designer-closed')} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${page.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(page.buttons ?? []).filter((b) => (b.bar ?? 'toolbar') === 'toolbar').map(
          (b) => html`<span
            class="btn"
            data-btn-uc=${b.useCaseId ?? ''}
            title=${b.mappingId ? `${b.useCaseId} · mapping ${b.mappingId}` : `${b.useCaseId ?? ''} — suelta un mapeado del Catálogo para transformar el viewmodel`}
            @click=${() =>
              (this._btn = {
                useCaseId: b.useCaseId ?? '',
                label: b.label ?? '',
                mappingId: b.mappingId ?? '',
                bar: b.bar ?? 'toolbar',
              })}
            >${b.label}</span
          >`,
        )}
        ${(page.buttons ?? []).some((b) => (b.bar ?? 'toolbar') === 'toolbar')
          ? nothing
          : html`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${page.modelId
          ? html`<span class="chip"
                >${page.modelName ?? page.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent('page-model-changed', { modelId: null })}
                  >✕</span
                ></span
              >`
          : html`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${wizard
          ? html`<div class="wizbar">
              ${(page.wizardSteps ?? []).length
                ? (page.wizardSteps ?? []).map((s, i) => {
                    const keys = (page.wizardSteps ?? []).map((x, j) => x.id ?? x.pageId ?? String(j));
                    const key = keys[i];
                    return html`<span
                      class=${i === 0 ? 'on' : ''}
                      draggable="true"
                      title="Paso ${i + 1}${s.pageId ? '' : ' (sin página)'} — arrastra para reordenar"
                      @dragstart=${(e: DragEvent) => {
                        e.stopPropagation();
                        this._dragWizKey = key;
                      }}
                      @dragover=${(e: DragEvent) => {
                        if (!this._dragWizKey) return;
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      @drop=${(e: DragEvent) => {
                        const src = this._dragWizKey;
                        this._dragWizKey = null;
                        if (!src || src === key) return;
                        e.preventDefault();
                        e.stopPropagation();
                        const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        const beforeThis = e.clientX - box.left < box.width / 2;
                        const beforeStepKey = beforeThis ? key : (keys[i + 1] ?? null);
                        if (beforeStepKey === src) return;
                        this.emitEvent('wizard-step-moved', { stepKey: src, beforeStepKey });
                      }}
                      @dragend=${() => (this._dragWizKey = null)}
                      >${'①②③④⑤⑥⑦⑧⑨⑩'[i] ?? `${i + 1}.`} ${s.label ?? 'Paso'}${s.pageId ? '' : ' ⌁'}</span
                    >`;
                  })
                : html`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>`
          : nothing}
        ${(page.content ?? []).length
          ? html`<div class="col-lay">${(page.content ?? []).map((n) => this.renderComponent(n))}</div>`
          : this.renderInferredBody(page, fields, listing)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(page.buttons ?? [])
          .filter((b) => b.bar === 'bottom')
          .map(
            (b) => html`<span
              class="btn"
              data-btn-uc=${b.useCaseId ?? ''}
              title=${b.mappingId ? `${b.useCaseId} · mapping ${b.mappingId}` : `${b.useCaseId ?? ''} — suelta un mapeado del Catálogo para transformar el viewmodel`}
              @click=${() =>
                (this._btn = {
                  useCaseId: b.useCaseId ?? '',
                  label: b.label ?? '',
                  mappingId: b.mappingId ?? '',
                  bar: 'bottom',
                })}
              >${b.label}</span
            >`,
          )}
        ${(page.buttons ?? []).some((b) => b.bar === 'bottom')
          ? nothing
          : html`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn
        ? (() => {
            const existing = (this.page?.buttons ?? []).some((b) => b.useCaseId === this._btn!.useCaseId);
            return html`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${this.useCases.find((u) => u.id === this._btn!.useCaseId)?.name ?? this._btn.useCaseId}</span>
                <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>
              </span>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(e: Event) => (this._btn = { ...this._btn!, label: (e.target as HTMLInputElement).value })}
              />
              <label>Mapping</label>
              <span style="grid-column: 2 / -1">
                ${this._btn.mappingId
                  ? html`<span class="chip"
                        >${this.mappings.find((mm) => mm.id === this._btn!.mappingId)?.name ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => (this._btn = { ...this._btn!, mappingId: '' })}>✕</span></span
                      >`
                  : html`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
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
