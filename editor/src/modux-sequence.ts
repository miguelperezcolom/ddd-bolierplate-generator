import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  InteractionMessageKind,
  InteractionMessageRef,
  InteractionParticipantRef,
  InteractionRef,
  ModuxModel,
} from './model.js';
import {
  computeBacked,
  deriveParticipants,
  inferMessageKind,
  insertMessageAt,
  lookupFor,
  messageNumbers,
  moveMessage,
  removeMessage,
  withoutParticipant,
} from './interaction-utils.js';

/**
 * Sequence-diagram surface for one Interaction: participants as lifelines,
 * time flowing down, messages as numbered arrows (1, 1.1…). Sibling of
 * <modux-page-designer>: NOT a canvas Scene. Gestures (editable mode):
 * drag lifeline → lifeline creates a message, drag a message vertically
 * reorders it, double click edits label/guard/kind, Supr deletes the
 * selection, ✨ materializes an unbacked message. Every gesture emits
 * `interaction-changed` with the full updated InteractionRef.
 */

const PAD_X = 36;
const PAD_Y = 20;
const COL_W = 210;
const CHIP_W = 176;
const CHIP_H = 46;
const FIRST_GAP = 36;
const ROW_SYNC = 60; // COMMAND / QUERY (room for the dashed return)
const ROW_ASYNC = 46; // EVENT / EXTERNAL
const BOTTOM_PAD = 60;

/** Participant chip colors — the same palette the map views use per kind. */
const TYPE_COLORS: Record<string, { fill: string; stroke: string }> = {
  ACTOR: { fill: '#ffffff', stroke: '#64748b' },
  APP: { fill: '#f0f9ff', stroke: '#0ea5e9' },
  PAGE: { fill: '#f0f9ff', stroke: '#0ea5e9' },
  USE_CASE: { fill: '#ecfeff', stroke: '#06b6d4' },
  AGGREGATE: { fill: '#f5f3ff', stroke: '#8b5cf6' },
  DOMAIN_SERVICE: { fill: '#fff1f2', stroke: '#f43f5e' },
  QUERY_SERVICE: { fill: '#f0f9ff', stroke: '#0284c7' },
  READ_MODEL: { fill: '#ecfdf5', stroke: '#10b981' },
  EXTERNAL_SYSTEM: { fill: '#ffffff', stroke: '#64748b' },
  API: { fill: '#eef2ff', stroke: '#4f46e5' },
  API_OPERATION: { fill: '#eef2ff', stroke: '#4f46e5' },
  AI_AGENT: { fill: '#faf5ff', stroke: '#9333ea' },
  PROCESS: { fill: '#f5f3ff', stroke: '#7c3aed' },
  WORKFLOW: { fill: '#ede9fe', stroke: '#6d28d9' },
  UNKNOWN: { fill: '#f8fafc', stroke: '#94a3b8' },
};

const TYPE_BADGES: Record<string, string> = {
  ACTOR: 'ACTOR',
  APP: 'APP',
  PAGE: 'PÁGINA',
  USE_CASE: 'CASO DE USO',
  AGGREGATE: 'AGREGADO',
  DOMAIN_SERVICE: 'SERV. DOMINIO',
  QUERY_SERVICE: 'QUERY',
  READ_MODEL: 'READ MODEL',
  EXTERNAL_SYSTEM: 'EXTERNO',
  API: 'API',
  API_OPERATION: 'OP. API',
  AI_AGENT: 'AGENTE IA',
  PROCESS: 'PROCESO',
  WORKFLOW: 'WORKFLOW',
  UNKNOWN: 'REF',
};

const KIND_LABELS: Record<InteractionMessageKind, string> = {
  COMMAND: 'Comando',
  QUERY: 'Query',
  EVENT: 'Evento',
  EXTERNAL: 'Externa',
};

@customElement('modux-sequence')
export class ModuxSequence extends LitElement {
  /** The interaction being shown (authored working copy, or the ephemeral derived one). */
  @property({ attribute: false }) interaction: InteractionRef | null = null;
  /** false = read-only (derived mode): no gestures, no materialize buttons. */
  @property({ type: Boolean }) editable = false;
  /** The model projection — only read, to infer kinds and backing of new messages. */
  @property({ attribute: false }) model: ModuxModel | null = null;

  @state() private _selectedMessageId: string | null = null;
  @state() private _selectedParticipantRef: string | null = null;
  /** Connect gesture in flight: source lifeline + the rubber's free end (svg coords). */
  @state() private _connect: { fromRef: string; x: number; y: number } | null = null;
  /** Message being drag-reordered: insertion guide follows the pointer. */
  @state() private _reorder: { id: string; startY: number; y: number; moved: boolean } | null = null;
  /** Inline mini-editor (double click on a message). */
  @state() private _editor: {
    messageId: string;
    x: number;
    y: number;
    label: string;
    guard: string;
    kind: InteractionMessageKind;
  } | null = null;

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: auto;
      background: #ffffff;
      outline: none;
      user-select: none;
    }
    .inner {
      position: relative;
    }
    svg {
      display: block;
    }
    .empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      font: 13px ui-sans-serif, system-ui, sans-serif;
      text-align: center;
      padding: 24px;
      pointer-events: none;
    }
    .msg-editor {
      position: absolute;
      z-index: 20;
      display: flex;
      gap: 6px;
      align-items: center;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
      padding: 8px;
      transform: translate(-50%, -100%);
    }
    .msg-editor input,
    .msg-editor select {
      font: 12px ui-sans-serif, system-ui, sans-serif;
      padding: 4px 6px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      color: #1e293b;
    }
    .msg-editor input.label {
      width: 200px;
    }
    .msg-editor input.guard {
      width: 110px;
    }
    .msg-editor button {
      border: none;
      background: #1e293b;
      color: #ffffff;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      cursor: pointer;
    }
    .msg-editor button.cancel {
      background: transparent;
      color: #64748b;
    }
    text {
      font-family: ui-sans-serif, system-ui, sans-serif;
    }
    .materialize {
      cursor: pointer;
    }
  `;

  // ── layout ──────────────────────────────────────────────────────────────

  private participants(): InteractionParticipantRef[] {
    return this.interaction ? deriveParticipants(this.interaction) : [];
  }

  private xOf(index: number): number {
    return PAD_X + CHIP_W / 2 + index * COL_W;
  }

  private rowH(m: InteractionMessageRef): number {
    return m.kind === 'COMMAND' || m.kind === 'QUERY' ? ROW_SYNC : ROW_ASYNC;
  }

  private messageRows(): { m: InteractionMessageRef; y: number; num: string }[] {
    const msgs = this.interaction?.messages ?? [];
    const numbers = messageNumbers(msgs);
    let y = PAD_Y + CHIP_H + FIRST_GAP;
    return msgs.map((m, i) => {
      const row = { m, y, num: numbers[i] };
      y += this.rowH(m);
      return row;
    });
  }

  private diagramSize(): { w: number; h: number } {
    const parts = this.participants();
    const rows = this.messageRows();
    const lastY = rows.length ? rows[rows.length - 1].y + this.rowH(rows[rows.length - 1].m) : PAD_Y + CHIP_H + FIRST_GAP;
    return {
      w: Math.max(PAD_X * 2 + CHIP_W + Math.max(0, parts.length - 1) * COL_W + 60, 320),
      h: lastY + BOTTOM_PAD,
    };
  }

  /** The insertion index a drop at this svg y produces (excluding one message). */
  private indexAtY(svgY: number, excludeId?: string): number {
    const rows = this.messageRows().filter((r) => r.m.id !== excludeId);
    let idx = 0;
    for (const r of rows) if (svgY > r.y + this.rowH(r.m) / 2) idx++;
    return idx;
  }

  /** Nearest lifeline column within half a pitch (−1 = none). */
  private colAtX(svgX: number): number {
    const parts = this.participants();
    let best = -1;
    let bestD = COL_W / 2;
    parts.forEach((_, i) => {
      const d = Math.abs(svgX - this.xOf(i));
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }

  private svgPoint(e: PointerEvent): { x: number; y: number } {
    const rect = this.renderRoot.querySelector('svg')!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  // ── gestures ────────────────────────────────────────────────────────────

  private changed(next: InteractionRef): void {
    this.emit('interaction-changed', next);
  }

  private onLifelinePointerDown(e: PointerEvent, ref: string): void {
    if (!this.editable) return;
    e.stopPropagation();
    (this.renderRoot.querySelector('svg') as SVGElement | null)?.focus();
    const p = this.svgPoint(e);
    this._connect = { fromRef: ref, x: p.x, y: p.y };
    this._selectedMessageId = null;
    this._selectedParticipantRef = null;
    window.addEventListener('pointermove', this.onWindowPointerMove);
    window.addEventListener('pointerup', this.onWindowPointerUp, { once: true });
  }

  private onMessagePointerDown(e: PointerEvent, m: InteractionMessageRef): void {
    e.stopPropagation();
    (this.renderRoot.querySelector('svg') as SVGElement | null)?.focus();
    this._selectedMessageId = m.id;
    this._selectedParticipantRef = null;
    if (!this.editable) return;
    const p = this.svgPoint(e);
    this._reorder = { id: m.id, startY: p.y, y: p.y, moved: false };
    window.addEventListener('pointermove', this.onWindowPointerMove);
    window.addEventListener('pointerup', this.onWindowPointerUp, { once: true });
  }

  private onWindowPointerMove = (e: PointerEvent): void => {
    const p = this.svgPoint(e);
    if (this._connect) this._connect = { ...this._connect, x: p.x, y: p.y };
    if (this._reorder) {
      const moved = this._reorder.moved || Math.abs(p.y - this._reorder.startY) > 5;
      this._reorder = { ...this._reorder, y: p.y, moved };
    }
  };

  private onWindowPointerUp = (e: PointerEvent): void => {
    window.removeEventListener('pointermove', this.onWindowPointerMove);
    const interaction = this.interaction;
    if (!interaction || !this.editable) {
      this._connect = null;
      this._reorder = null;
      return;
    }
    const p = this.svgPoint(e);
    if (this._connect) {
      const { fromRef } = this._connect;
      this._connect = null;
      const col = this.colAtX(p.x);
      if (col >= 0) {
        const parts = this.participants();
        const to = parts[col];
        const from = parts.find((x) => x.ref === fromRef) ?? { ref: fromRef, name: fromRef, type: 'UNKNOWN' };
        const inferred = this.model
          ? inferMessageKind(this.model, from, to)
          : { kind: 'COMMAND' as InteractionMessageKind };
        const message: InteractionMessageRef = {
          id: `msg-${crypto.randomUUID().slice(0, 8)}`,
          fromRef,
          toRef: to.ref,
          kind: inferred.kind,
          label: inferred.label,
          backed: this.model
            ? computeBacked(
                this.model,
                { id: '', fromRef, toRef: to.ref, kind: inferred.kind, label: inferred.label },
                lookupFor(this.model, interaction).typeOf,
              )
            : false,
        };
        const index = this.indexAtY(p.y);
        // Declared participants stay authoritative: loose lifelines materialize first.
        const participants = deriveParticipants(interaction);
        this._selectedMessageId = message.id;
        this.changed({
          ...interaction,
          participants,
          messages: insertMessageAt(interaction.messages, message, index),
        });
      }
    }
    if (this._reorder) {
      const { id, moved } = this._reorder;
      this._reorder = null;
      if (moved) {
        const index = this.indexAtY(p.y, id);
        this.changed({ ...interaction, messages: moveMessage(interaction.messages, id, index) });
      }
    }
  };

  private onMessageDblClick(e: MouseEvent, m: InteractionMessageRef): void {
    if (!this.editable) return;
    e.stopPropagation();
    const svgEl = this.renderRoot.querySelector('svg')!;
    const rect = svgEl.getBoundingClientRect();
    this._editor = {
      messageId: m.id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      label: m.label ?? '',
      guard: m.guard ?? '',
      kind: m.kind,
    };
  }

  private commitEditor(): void {
    const ed = this._editor;
    const interaction = this.interaction;
    if (!ed || !interaction) return;
    this._editor = null;
    const lookup = this.model ? lookupFor(this.model, interaction) : null;
    this.changed({
      ...interaction,
      messages: interaction.messages.map((m) =>
        m.id === ed.messageId
          ? {
              ...m,
              label: ed.label.trim() || undefined,
              guard: ed.guard.trim() || undefined,
              kind: ed.kind,
              backed: lookup
                ? computeBacked(this.model!, { ...m, kind: ed.kind }, lookup.typeOf)
                : m.backed,
            }
          : m,
      ),
    });
  }

  private onKeydown(e: KeyboardEvent): void {
    const t = e.target as HTMLElement;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA')) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      this.emit('undo-requested');
      e.preventDefault();
      return;
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))
    ) {
      this.emit('redo-requested');
      e.preventDefault();
      return;
    }
    if (!this.editable) return;
    if (e.key !== 'Delete' && e.key !== 'Backspace') return;
    const interaction = this.interaction;
    if (!interaction) return;
    if (this._selectedMessageId) {
      const id = this._selectedMessageId;
      this._selectedMessageId = null;
      this.changed({ ...interaction, messages: removeMessage(interaction.messages, id) });
      e.preventDefault();
    } else if (this._selectedParticipantRef) {
      const ref = this._selectedParticipantRef;
      this._selectedParticipantRef = null;
      this.changed(withoutParticipant(interaction, ref));
      e.preventDefault();
    }
  }

  // ── render ──────────────────────────────────────────────────────────────

  private kindStyle(m: InteractionMessageRef): { color: string; marker: string; dashed: boolean } {
    const unbacked = m.backed === false;
    if (unbacked) {
      return {
        color: '#f59e0b',
        marker: m.kind === 'EVENT' ? 'seq-open-warn' : 'seq-filled-warn',
        dashed: true,
      };
    }
    switch (m.kind) {
      case 'EVENT':
        return { color: '#f59e0b', marker: 'seq-open-event', dashed: false };
      case 'EXTERNAL':
        return { color: '#64748b', marker: 'seq-filled-ext', dashed: false };
      default:
        return { color: '#334155', marker: 'seq-filled-sync', dashed: false };
    }
  }

  private renderHeader(p: InteractionParticipantRef, i: number) {
    const x = this.xOf(i);
    const colors = TYPE_COLORS[p.type] ?? TYPE_COLORS.UNKNOWN;
    const selected = this._selectedParticipantRef === p.ref;
    const name = p.name.length > 24 ? `${p.name.slice(0, 22)}…` : p.name;
    return svg`
      <g
        style="cursor: ${this.editable ? 'pointer' : 'default'}"
        @click=${(e: Event) => {
          e.stopPropagation();
          (this.renderRoot.querySelector('svg') as SVGElement | null)?.focus();
          this._selectedParticipantRef = p.ref;
          this._selectedMessageId = null;
        }}
      >
        <title>${p.name} — ${TYPE_BADGES[p.type] ?? p.type}</title>
        <rect
          x=${x - CHIP_W / 2} y=${PAD_Y} width=${CHIP_W} height=${CHIP_H} rx="10"
          fill=${colors.fill}
          stroke=${selected ? '#2563eb' : colors.stroke}
          stroke-width=${selected ? 2.2 : 1.4}
        ></rect>
        <text x=${x} y=${PAD_Y + 19} text-anchor="middle" font-size="12" font-weight="600" fill="#1e293b">${name}</text>
        <text x=${x} y=${PAD_Y + 35} text-anchor="middle" font-size="8.5" letter-spacing="0.08em" fill=${colors.stroke}>${TYPE_BADGES[p.type] ?? p.type}</text>
      </g>
    `;
  }

  private renderMessage(row: { m: InteractionMessageRef; y: number; num: string }) {
    const { m, y, num } = row;
    const parts = this.participants();
    const i1 = parts.findIndex((p) => p.ref === m.fromRef);
    const i2 = parts.findIndex((p) => p.ref === m.toRef);
    if (i1 < 0 || i2 < 0) return svg``;
    const x1 = this.xOf(i1);
    const x2 = this.xOf(i2);
    const style = this.kindStyle(m);
    const selected = this._selectedMessageId === m.id;
    const unbacked = m.backed === false;
    const label = `${m.label ?? ''}${m.guard ? ` [${m.guard}]` : ''}`;
    const shownLabel = label.length > 46 ? `${label.slice(0, 44)}…` : label;
    const self = i1 === i2;
    const rightward = x2 >= x1;
    const numX = self ? x1 + 6 : rightward ? x1 + 6 : x1 - 6;
    const labelX = self ? x1 + 52 : (x1 + x2) / 2;
    const line = self
      ? svg`<path
          d="M ${x1} ${y} H ${x1 + 44} V ${y + 16} H ${x1 + 2}"
          fill="none"
          stroke=${style.color}
          stroke-width="1.6"
          stroke-dasharray=${style.dashed ? '5 4' : 'none'}
          marker-end="url(#${style.marker})"
        ></path>`
      : svg`<line
          x1=${rightward ? x1 + 2 : x1 - 2} y1=${y}
          x2=${rightward ? x2 - 2 : x2 + 2} y2=${y}
          stroke=${style.color}
          stroke-width="1.6"
          stroke-dasharray=${style.dashed ? '5 4' : 'none'}
          marker-end="url(#${style.marker})"
        ></line>`;
    const ret =
      !self && (m.kind === 'COMMAND' || m.kind === 'QUERY')
        ? svg`<line
            x1=${rightward ? x2 - 2 : x2 + 2} y1=${y + 16}
            x2=${rightward ? x1 + 2 : x1 - 2} y2=${y + 16}
            stroke="#94a3b8"
            stroke-width="1"
            stroke-dasharray="4 4"
            marker-end="url(#seq-ret)"
          ></line>`
        : '';
    return svg`
      <g
        style="cursor: ${this.editable ? 'grab' : 'default'}"
        @pointerdown=${(e: PointerEvent) => this.onMessagePointerDown(e, m)}
        @dblclick=${(e: MouseEvent) => this.onMessageDblClick(e, m)}
      >
        <title>${unbacked
          ? 'sin respaldo en el modelo — materialízalo o ajústalo'
          : `${KIND_LABELS[m.kind]}${label ? ` · ${label}` : ''}`}</title>
        ${selected
          ? svg`<line
              x1=${Math.min(x1, x2)} y1=${y}
              x2=${self ? x1 + 46 : Math.max(x1, x2)} y2=${y}
              stroke="#2563eb" stroke-width="7" opacity="0.22"
            ></line>`
          : ''}
        <!-- fat invisible hit area: the thin arrow stays easy to grab -->
        <line
          x1=${Math.min(x1, x2)} y1=${y} x2=${self ? x1 + 46 : Math.max(x1, x2)} y2=${y}
          stroke="transparent" stroke-width="14"
        ></line>
        ${line}
        ${ret}
        <text x=${numX} y=${y - 6} text-anchor=${rightward ? 'start' : 'end'} font-size="10" fill="#64748b">${num}</text>
        <text
          x=${labelX} y=${y - 8} text-anchor=${self ? 'start' : 'middle'}
          font-size="11.5"
          font-style=${m.kind === 'QUERY' ? 'italic' : 'normal'}
          fill=${unbacked ? '#b45309' : '#1e293b'}
        >${unbacked ? svg`<tspan fill="#b45309">⚠ </tspan>` : ''}${shownLabel}</text>
        ${unbacked && this.editable
          ? svg`<text
              class="materialize"
              x=${rightward ? x2 - 4 : x2 + 4} y=${y - 8}
              text-anchor=${rightward ? 'end' : 'start'}
              font-size="12"
              @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
              @click=${(e: Event) => {
                e.stopPropagation();
                this.emit('interaction-materialize', { messageId: m.id });
              }}
            ><title>Materializar: crea en el modelo la pieza que respalda este mensaje</title>✨</text>`
          : ''}
      </g>
    `;
  }

  render() {
    const interaction = this.interaction;
    const parts = this.participants();
    const rows = this.messageRows();
    const { w, h } = this.diagramSize();
    const lifelineBottom = h - BOTTOM_PAD + 20;
    return html`
      <div class="inner" style="width: ${w}px; height: ${h}px">
        <svg
          width=${w} height=${h}
          tabindex="0"
          @keydown=${this.onKeydown}
          @pointerdown=${() => {
            this._selectedMessageId = null;
            this._selectedParticipantRef = null;
            if (this._editor) this.commitEditor();
          }}
        >
          <defs>
            <marker id="seq-filled-sync" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#334155"></path>
            </marker>
            <marker id="seq-filled-ext" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#64748b"></path>
            </marker>
            <marker id="seq-open-event" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10" fill="none" stroke="#f59e0b" stroke-width="1.8"></path>
            </marker>
            <marker id="seq-filled-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b"></path>
            </marker>
            <marker id="seq-open-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10" fill="none" stroke="#f59e0b" stroke-width="1.8"></path>
            </marker>
            <marker id="seq-ret" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10" fill="none" stroke="#94a3b8" stroke-width="1.4"></path>
            </marker>
          </defs>
          <!-- lifelines (hit rects below the messages) -->
          ${parts.map((p, i) => {
            const x = this.xOf(i);
            return svg`
              <line
                x1=${x} y1=${PAD_Y + CHIP_H} x2=${x} y2=${lifelineBottom}
                stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="6 5"
              ></line>
              ${this.editable
                ? svg`<rect
                    x=${x - COL_W / 2 + 10} y=${PAD_Y + CHIP_H}
                    width=${COL_W - 20} height=${Math.max(0, lifelineBottom - PAD_Y - CHIP_H)}
                    fill="transparent"
                    style="cursor: crosshair"
                    @pointerdown=${(e: PointerEvent) => this.onLifelinePointerDown(e, p.ref)}
                  ><title>Arrastra hasta otra línea de vida para crear un mensaje</title></rect>`
                : ''}
            `;
          })}
          ${parts.map((p, i) => this.renderHeader(p, i))}
          ${rows.map((row) => this.renderMessage(row))}
          ${this._connect
            ? svg`<line
                x1=${this.xOf(parts.findIndex((p) => p.ref === this._connect!.fromRef))}
                y1=${this._connect.y}
                x2=${this._connect.x}
                y2=${this._connect.y}
                stroke="#2563eb" stroke-width="1.4" stroke-dasharray="5 4"
                marker-end="url(#seq-filled-sync)"
              ></line>`
            : ''}
          ${this._reorder?.moved
            ? svg`<line
                x1=${PAD_X / 2} y1=${this._reorder.y} x2=${w - PAD_X / 2} y2=${this._reorder.y}
                stroke="#2563eb" stroke-width="1.4" stroke-dasharray="7 5"
              ></line>`
            : ''}
        </svg>
        ${interaction && !parts.length && !rows.length
          ? html`<div class="empty">
              Sin participantes todavía — añádelos con «＋ Participante…» y arrastra entre
              líneas de vida para crear mensajes
            </div>`
          : ''}
        ${this._editor
          ? html`
              <div class="msg-editor" style="left: ${this._editor.x}px; top: ${this._editor.y}px">
                <input
                  class="label"
                  placeholder="Etiqueta del mensaje…"
                  .value=${this._editor.label}
                  @input=${(e: Event) =>
                    (this._editor = { ...this._editor!, label: (e.target as HTMLInputElement).value })}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === 'Enter') this.commitEditor();
                    if (e.key === 'Escape') this._editor = null;
                    e.stopPropagation();
                  }}
                />
                <input
                  class="guard"
                  placeholder="[guarda]"
                  .value=${this._editor.guard}
                  @input=${(e: Event) =>
                    (this._editor = { ...this._editor!, guard: (e.target as HTMLInputElement).value })}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === 'Enter') this.commitEditor();
                    if (e.key === 'Escape') this._editor = null;
                    e.stopPropagation();
                  }}
                />
                <select
                  @change=${(e: Event) =>
                    (this._editor = {
                      ...this._editor!,
                      kind: (e.target as HTMLSelectElement).value as InteractionMessageKind,
                    })}
                >
                  ${(['COMMAND', 'QUERY', 'EVENT', 'EXTERNAL'] as InteractionMessageKind[]).map(
                    (k) =>
                      html`<option value=${k} ?selected=${k === this._editor!.kind}>
                        ${KIND_LABELS[k]}
                      </option>`,
                  )}
                </select>
                <button @click=${this.commitEditor}>✓</button>
                <button class="cancel" @click=${() => (this._editor = null)}>✕</button>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modux-sequence': ModuxSequence;
  }
}
