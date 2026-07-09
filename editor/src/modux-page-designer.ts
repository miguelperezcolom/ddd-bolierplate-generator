import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { UiPageRef, UiFieldRef } from './model.js';

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

  /** The field whose declaration is being edited, with the draft values. */
  @state() private _editing: {
    fieldId: string;
    stereotype: string;
    colspan: number;
    label: string;
  } | null = null;
  @state() private _dragId: string | null = null;
  @state() private _overId: string | null = null;

  private emitEvent(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  static styles = css`
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
    return html`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        <span class="title">${page.name}</span>
        <span class="type">${page.type ?? 'FORM'}</span>
        ${page.route ? html`<span class="route">${page.route}</span>` : nothing}
        <button @click=${() => this.emitEvent('open-crud')} title="Abrir la ficha completa de la página">Ficha</button>
        <button @click=${() => this.emitEvent('designer-closed')} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(page.buttons ?? []).map(
          (b) => html`<span class="btn" title=${b.useCaseId ?? ''}>${b.label}</span>`,
        )}
        <span class="hint">
          ${(page.buttons ?? []).length
            ? ''
            : 'Sin botones — suelta un caso de uso sobre la página en el mapa'}
        </span>
      </div>
      <div class="body">
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
                    @dragstart=${() => (this._dragId = f.fieldId)}
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
      </div>
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
