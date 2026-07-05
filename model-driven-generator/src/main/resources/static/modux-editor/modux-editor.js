function si(t) {
  if (!t) return { nodes: {}, edges: {} };
  if ("nodes" in t && typeof t.nodes == "object" && !("x" in t.nodes)) {
    const e = t;
    return { nodes: e.nodes ?? {}, edges: e.edges ?? {} };
  }
  return { nodes: t, edges: {} };
}
const oi = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ai = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, li = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Be = 168, Xe = 56;
function ci(t, e) {
  return `rel:${t}->${e}`;
}
function di(t, e) {
  const n = new Set(t.externalSystems.map((i) => i.id));
  return e.sourceId === e.targetId ? "INTERNAL" : n.has(e.sourceId) || n.has(e.targetId) ? "EXTERNAL" : t.relations.some((i) => i.sourceId === e.sourceId && i.targetId === e.targetId) ? "OK" : t.relations.some((i) => i.sourceId === e.targetId && i.targetId === e.sourceId) ? "REVERSED" : "MISSING_RELATION";
}
function ui(t, e) {
  const n = 2 * Math.PI * t / Math.max(e, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
function hi(t, e) {
  const n = [
    ...t.modules.map((s) => ({ ref: s, external: !1 })),
    ...t.externalSystems.map((s) => ({ ref: s, external: !0 }))
  ], i = n.map((s, a) => {
    const l = e[s.ref.id] ?? ui(a, n.length);
    if (s.external)
      return {
        id: s.ref.id,
        label: s.ref.name,
        x: l.x,
        y: l.y,
        w: Be,
        h: Xe,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${s.ref.name} (sistema externo)`
      };
    const c = s.ref, d = c.subdomainType ?? "GENERIC";
    return {
      id: c.id,
      label: c.name,
      x: l.x,
      y: l.y,
      w: Be,
      h: Xe,
      kind: "module",
      symbol: "component",
      fill: oi[d],
      stroke: "#94a3b8",
      badge: d,
      tooltip: `${c.name} — subdominio ${d}`
    };
  }), r = t.relations.map((s) => ({
    id: ci(s.sourceId, s.targetId),
    sourceId: s.sourceId,
    targetId: s.targetId,
    kind: "relation",
    label: ai[s.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${s.type} (${s.sourceId} upstream → ${s.targetId} downstream)`
  })), o = t.flows.map((s) => {
    const a = di(t, s);
    return {
      id: `flow:${s.id}`,
      sourceId: s.sourceId,
      targetId: s.targetId,
      kind: "flow",
      label: s.name,
      color: li[a],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${s.name} [${s.archetype}] — ${a}`
    };
  });
  return { nodes: i, edges: [...r, ...o] };
}
const fi = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, pi = 176, gi = 60, mi = 140, _i = 40;
function yi(t) {
  const e = {}, n = t.aggregates ?? [], i = t.entities ?? [];
  return t.modules.forEach((r, o) => {
    const s = 220 + o * 340;
    n.filter((l) => l.moduleId === r.id).forEach((l, c) => {
      const d = i.filter((f) => f.aggregateId === l.id).length, h = 140 + c * (170 + d * 60);
      e[l.id] = { x: s, y: h }, i.filter((f) => f.aggregateId === l.id).forEach((f, g) => {
        e[f.id] = { x: s + 60, y: h + 100 + g * 60 };
      });
    });
  }), n.filter((r) => !t.modules.some((o) => o.id === r.moduleId)).forEach((r, o) => {
    e[r.id] = { x: 220 + o * 340, y: 640 };
  }), e;
}
function wi(t, e) {
  const n = yi(t), i = (c) => e[c] ?? n[c] ?? { x: 200, y: 200 }, r = new Map(t.modules.map((c) => [c.id, c])), o = (t.aggregates ?? []).map((c) => {
    const d = r.get(c.moduleId), h = (d == null ? void 0 : d.subdomainType) ?? "GENERIC", f = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: f.x,
      y: f.y,
      w: pi,
      h: gi,
      kind: "aggregate",
      symbol: "aggregate",
      fill: fi[h],
      stroke: "#64748b",
      badge: d ? `${d.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${d ? ` — módulo ${d.name} (${h})` : ""}`
    };
  }), s = (t.entities ?? []).map((c) => {
    const d = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: d.x,
      y: d.y,
      w: mi,
      h: _i,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${c.name} (dentro del agregado)`
    };
  }), a = (t.entities ?? []).map((c) => ({
    id: `contains:${c.aggregateId}->${c.id}`,
    sourceId: c.aggregateId,
    targetId: c.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), l = (t.aggregateReferences ?? []).map((c, d) => ({
    id: `aggref:${d}:${c.sourceAggregateId}->${c.targetAggregateId}`,
    sourceId: c.sourceAggregateId,
    targetId: c.targetAggregateId,
    kind: "aggregate-reference",
    label: c.label,
    color: "#475569",
    arrow: !0,
    tooltip: c.label ? `Referencia: ${c.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...o, ...s],
    edges: [...a, ...l]
  };
}
const vi = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, xi = 150, $i = 44, bi = 190, Ei = 56, Ii = 160, Si = 48;
function ki(t, e) {
  const n = t.externalSystems.find((r) => r.id === e.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = t.modules.find((r) => r.id === e.targetId);
  return { id: e.targetId, label: (i == null ? void 0 : i.name) ?? e.targetId, external: !1 };
}
function Ai(t, e) {
  const n = t.flows, i = [], r = [], o = /* @__PURE__ */ new Set(), s = (a) => {
    var l, c;
    return ((c = (l = t.aggregates) == null ? void 0 : l.find((d) => d.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return n.forEach((a, l) => {
    const c = 120 + l * 130, d = vi[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const T = e[h] ?? { x: 160, y: c };
      i.push({
        id: h,
        label: a.triggerAggregateId ? s(a.triggerAggregateId) : h,
        x: T.x,
        y: T.y,
        w: xi,
        h: $i,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${a.id}`, g = e[f] ?? { x: 470, y: c };
    i.push({
      id: f,
      label: a.name,
      x: g.x,
      y: g.y,
      w: bi,
      h: Ei,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: d,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const w = ki(t, a), b = `tgt:${w.id}`;
    if (!o.has(b)) {
      o.add(b);
      const T = e[b] ?? { x: 790, y: c };
      i.push({
        id: b,
        label: w.label,
        x: T.x,
        y: T.y,
        w: Ii,
        h: Si,
        kind: w.external ? "external-system" : "module",
        symbol: "component",
        fill: w.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: w.external,
        badge: w.external ? "EXTERNAL" : "MODULE"
      });
    }
    r.push({
      id: `fe:${a.id}:in`,
      sourceId: h,
      targetId: f,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), r.push({
      id: `fe:${a.id}:out`,
      sourceId: f,
      targetId: b,
      kind: "flow-delivery",
      color: d,
      arrow: !0
    });
  }), { nodes: i, edges: r };
}
const Ti = 190, Ni = 56, pe = 170, Pi = 52;
function Ge(t, e) {
  const n = [], i = [], r = (o) => {
    var s;
    return (s = t.modules.find((a) => a.id === o)) == null ? void 0 : s.name;
  };
  return (t.processes ?? []).forEach((o, s) => {
    const a = 140 + s * 240, l = e[o.id] ?? { x: 150, y: a };
    n.push({
      id: o.id,
      label: o.name,
      x: l.x,
      y: l.y,
      w: Ti,
      h: Ni,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${r(o.ownerModuleId) ? ` — módulo ${r(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((d, h) => {
      const f = d.type === "HUMAN", g = e[d.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (n.push({
        id: d.id,
        label: d.name,
        x: g.x,
        y: g.y,
        w: pe,
        h: Pi,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${d.roleId ? ` · ${d.roleId}` : ""}${d.deadline ? ` · ⏱ ${d.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${d.name}${d.useCaseId ? ` — use case ${d.useCaseId}` : ""}${d.deadline ? ` · deadline ${d.deadline}` : ""}`
      }), i.push({
        id: `pe:${o.id}:${h}`,
        sourceId: c,
        targetId: d.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), d.compensationUseCaseId) {
        const w = `comp:${d.id}`, b = e[w] ?? { x: g.x, y: g.y + 90 };
        n.push({
          id: w,
          label: d.compensationUseCaseId,
          x: b.x,
          y: b.y,
          w: pe,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), i.push({
          id: `pc:${d.id}`,
          sourceId: d.id,
          targetId: w,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = d.id;
    }), o.onCompletionEventName) {
      const d = `done:${o.id}`, h = e[d] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      n.push({
        id: d,
        label: o.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: pe,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), i.push({
        id: `pd:${o.id}`,
        sourceId: c,
        targetId: d,
        kind: "process-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
  }), { nodes: n, edges: i };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = globalThis, Pe = Zt.ShadowRoot && (Zt.ShadyCSS === void 0 || Zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ce = Symbol(), Ye = /* @__PURE__ */ new WeakMap();
let In = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== Ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Pe && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Ye.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ye.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ci = (t) => new In(typeof t == "string" ? t : t + "", void 0, Ce), Re = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, r, o) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[o + 1], t[0]);
  return new In(n, t, Ce);
}, Ri = (t, e) => {
  if (Pe) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), r = Zt.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = n.cssText, t.appendChild(i);
  }
}, We = Pe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return Ci(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mi, defineProperty: Oi, getOwnPropertyDescriptor: Li, getOwnPropertyNames: Di, getOwnPropertySymbols: Ui, getPrototypeOf: zi } = Object, ot = globalThis, Ke = ot.trustedTypes, Hi = Ke ? Ke.emptyScript : "", ge = ot.reactiveElementPolyfillSupport, Nt = (t, e) => t, ee = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Hi : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, Me = (t, e) => !Mi(t, e), Ze = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: Me };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ot.litPropertyMetadata ?? (ot.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let yt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ze) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, n);
      r !== void 0 && Oi(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: r, set: o } = Li(this.prototype, e) ?? { get() {
      return this[n];
    }, set(s) {
      this[n] = s;
    } };
    return { get: r, set(s) {
      const a = r == null ? void 0 : r.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ze;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Nt("elementProperties"))) return;
    const e = zi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Nt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Nt("properties"))) {
      const n = this.properties, i = [...Di(n), ...Ui(n)];
      for (const r of i) this.createProperty(r, n[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, r] of n) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const r = this._$Eu(n, i);
      r !== void 0 && this._$Eh.set(r, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) n.unshift(We(r));
    } else e !== void 0 && n.push(We(e));
    return n;
  }
  static _$Eu(e, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((n) => n(this));
  }
  addController(e) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) == null || n.call(e));
  }
  removeController(e) {
    var n;
    (n = this._$EO) == null || n.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ri(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostConnected) == null ? void 0 : i.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostDisconnected) == null ? void 0 : i.call(n);
    });
  }
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    var o;
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const s = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : ee).toAttribute(n, i.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var o, s;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : ee;
      this._$Em = r;
      const c = l.fromAttribute(n, a.type);
      this[r] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, r = !1, o) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[e]), i ?? (i = a.getPropertyOptions(e)), !((i.hasChanged ?? Me)(o, n) || i.useDefault && i.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: r, wrapped: o }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? n ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, s] of r) {
        const { wrapped: a } = s, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(n)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
yt.elementStyles = [], yt.shadowRootOptions = { mode: "open" }, yt[Nt("elementProperties")] = /* @__PURE__ */ new Map(), yt[Nt("finalized")] = /* @__PURE__ */ new Map(), ge == null || ge({ ReactiveElement: yt }), (ot.reactiveElementVersions ?? (ot.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = globalThis, Je = (t) => t, ne = Pt.trustedTypes, Qe = ne ? ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Sn = "$lit$", st = `lit$${Math.random().toFixed(9).slice(2)}$`, kn = "?" + st, Vi = `<${kn}>`, gt = document, Rt = () => gt.createComment(""), Mt = (t) => t === null || typeof t != "object" && typeof t != "function", Oe = Array.isArray, qi = (t) => Oe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", me = `[ 	
\f\r]`, Et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, je = /-->/g, tn = />/g, lt = RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), en = /'/g, nn = /"/g, An = /^(?:script|style|textarea|title)$/i, Tn = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), S = Tn(1), k = Tn(2), vt = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), rn = /* @__PURE__ */ new WeakMap(), dt = gt.createTreeWalker(gt, 129);
function Nn(t, e) {
  if (!Oe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Qe !== void 0 ? Qe.createHTML(e) : e;
}
const Fi = (t, e) => {
  const n = t.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = Et;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let c, d, h = -1, f = 0;
    for (; f < l.length && (s.lastIndex = f, d = s.exec(l), d !== null); ) f = s.lastIndex, s === Et ? d[1] === "!--" ? s = je : d[1] !== void 0 ? s = tn : d[2] !== void 0 ? (An.test(d[2]) && (r = RegExp("</" + d[2], "g")), s = lt) : d[3] !== void 0 && (s = lt) : s === lt ? d[0] === ">" ? (s = r ?? Et, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? lt : d[3] === '"' ? nn : en) : s === nn || s === en ? s = lt : s === je || s === tn ? s = Et : (s = lt, r = void 0);
    const g = s === lt && t[a + 1].startsWith("/>") ? " " : "";
    o += s === Et ? l + Vi : h >= 0 ? (i.push(c), l.slice(0, h) + Sn + l.slice(h) + st + g) : l + st + (h === -2 ? a : g);
  }
  return [Nn(t, o + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Ot {
  constructor({ strings: e, _$litType$: n }, i) {
    let r;
    this.parts = [];
    let o = 0, s = 0;
    const a = e.length - 1, l = this.parts, [c, d] = Fi(e, n);
    if (this.el = Ot.createElement(c, i), dt.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = dt.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Sn)) {
          const f = d[s++], g = r.getAttribute(h).split(st), w = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: w[2], strings: g, ctor: w[1] === "." ? Xi : w[1] === "?" ? Gi : w[1] === "@" ? Yi : ce }), r.removeAttribute(h);
        } else h.startsWith(st) && (l.push({ type: 6, index: o }), r.removeAttribute(h));
        if (An.test(r.tagName)) {
          const h = r.textContent.split(st), f = h.length - 1;
          if (f > 0) {
            r.textContent = ne ? ne.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(h[g], Rt()), dt.nextNode(), l.push({ type: 2, index: ++o });
            r.append(h[f], Rt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === kn) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(st, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += st.length - 1;
      }
      o++;
    }
  }
  static createElement(e, n) {
    const i = gt.createElement("template");
    return i.innerHTML = e, i;
  }
}
function xt(t, e, n = t, i) {
  var s, a;
  if (e === vt) return e;
  let r = i !== void 0 ? (s = n._$Co) == null ? void 0 : s[i] : n._$Cl;
  const o = Mt(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), o === void 0 ? r = void 0 : (r = new o(t), r._$AT(t, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = r : n._$Cl = r), r !== void 0 && (e = xt(t, r._$AS(t, e.values), r, i)), e;
}
class Bi {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? gt).importNode(n, !0);
    dt.currentNode = r;
    let o = dt.nextNode(), s = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new Ht(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new Wi(o, this, e)), this._$AV.push(c), l = i[++a];
      }
      s !== (l == null ? void 0 : l.index) && (o = dt.nextNode(), s++);
    }
    return dt.currentNode = gt, r;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class Ht {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, i, r) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = xt(this, e, n), Mt(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== vt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : qi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== C && Mt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(gt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: n, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Ot.createElement(Nn(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(n);
    else {
      const s = new Bi(r, this), a = s.u(this.options);
      s.p(n), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = rn.get(e.strings);
    return n === void 0 && rn.set(e.strings, n = new Ot(e)), n;
  }
  k(e) {
    Oe(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, r = 0;
    for (const o of e) r === n.length ? n.push(i = new Ht(this.O(Rt()), this.O(Rt()), this, this.options)) : i = n[r], i._$AI(o), r++;
    r < n.length && (this._$AR(i && i._$AB.nextSibling, r), n.length = r);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); e !== this._$AB; ) {
      const r = Je(e).nextSibling;
      Je(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class ce {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, r, o) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = n, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = C;
  }
  _$AI(e, n = this, i, r) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = xt(this, e, n, 0), s = !Mt(e) || e !== this._$AH && e !== vt, s && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = xt(this, a[i + l], n, l), c === vt && (c = this._$AH[l]), s || (s = !Mt(c) || c !== this._$AH[l]), c === C ? e = C : e !== C && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !r && this.j(e);
  }
  j(e) {
    e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xi extends ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === C ? void 0 : e;
  }
}
class Gi extends ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== C);
  }
}
class Yi extends ce {
  constructor(e, n, i, r, o) {
    super(e, n, i, r, o), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = xt(this, e, n, 0) ?? C) === vt) return;
    const i = this._$AH, r = e === C && i !== C || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== C && (i === C || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Wi {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    xt(this, e);
  }
}
const _e = Pt.litHtmlPolyfillSupport;
_e == null || _e(Ot, Ht), (Pt.litHtmlVersions ?? (Pt.litHtmlVersions = [])).push("3.3.3");
const Ki = (t, e, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = r = new Ht(e.insertBefore(Rt(), o), o, void 0, n ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis;
class ft extends yt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const e = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = e.firstChild), e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ki(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return vt;
  }
}
var En;
ft._$litElement$ = !0, ft.finalized = !0, (En = ht.litElementHydrateSupport) == null || En.call(ht, { LitElement: ft });
const ye = ht.litElementPolyfillSupport;
ye == null || ye({ LitElement: ft });
(ht.litElementVersions ?? (ht.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zi = { attribute: !0, type: String, converter: ee, reflect: !1, hasChanged: Me }, Ji = (t = Zi, e, n) => {
  const { kind: i, metadata: r } = n;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(n.name, t), i === "accessor") {
    const { name: s } = n;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: s } = n;
    return function(a) {
      const l = this[s];
      e.call(this, a), this.requestUpdate(s, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function at(t) {
  return (e, n) => typeof n == "object" ? Ji(t, e, n) : ((i, r, o) => {
    const s = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), s ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function E(t) {
  return at({ ...t, state: !0, attribute: !1 });
}
var $e = "http://www.w3.org/1999/xhtml";
const sn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: $e,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function de(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), sn.hasOwnProperty(e) ? { space: sn[e], local: t } : t;
}
function Qi(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === $e && e.documentElement.namespaceURI === $e ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ji(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Pn(t) {
  var e = de(t);
  return (e.local ? ji : Qi)(e);
}
function tr() {
}
function De(t) {
  return t == null ? tr : function() {
    return this.querySelector(t);
  };
}
function er(t) {
  typeof t != "function" && (t = De(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = new Array(s), l, c, d = 0; d < s; ++d)
      (l = o[d]) && (c = t.call(l, l.__data__, d, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[d] = c);
  return new U(i, this._parents);
}
function nr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ir() {
  return [];
}
function Cn(t) {
  return t == null ? ir : function() {
    return this.querySelectorAll(t);
  };
}
function rr(t) {
  return function() {
    return nr(t.apply(this, arguments));
  };
}
function sr(t) {
  typeof t == "function" ? t = rr(t) : t = Cn(t);
  for (var e = this._groups, n = e.length, i = [], r = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (i.push(t.call(l, l.__data__, c, s)), r.push(l));
  return new U(i, r);
}
function Rn(t) {
  return function() {
    return this.matches(t);
  };
}
function Mn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var or = Array.prototype.find;
function ar(t) {
  return function() {
    return or.call(this.children, t);
  };
}
function lr() {
  return this.firstElementChild;
}
function cr(t) {
  return this.select(t == null ? lr : ar(typeof t == "function" ? t : Mn(t)));
}
var dr = Array.prototype.filter;
function ur() {
  return Array.from(this.children);
}
function hr(t) {
  return function() {
    return dr.call(this.children, t);
  };
}
function fr(t) {
  return this.selectAll(t == null ? ur : hr(typeof t == "function" ? t : Mn(t)));
}
function pr(t) {
  typeof t != "function" && (t = Rn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new U(i, this._parents);
}
function On(t) {
  return new Array(t.length);
}
function gr() {
  return new U(this._enter || this._groups.map(On), this._parents);
}
function ie(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ie.prototype = {
  constructor: ie,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function mr(t) {
  return function() {
    return t;
  };
}
function _r(t, e, n, i, r, o) {
  for (var s = 0, a, l = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = o[s], i[s] = a) : n[s] = new ie(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (r[s] = a);
}
function yr(t, e, n, i, r, o, s) {
  var a, l, c = /* @__PURE__ */ new Map(), d = e.length, h = o.length, f = new Array(d), g;
  for (a = 0; a < d; ++a)
    (l = e[a]) && (f[a] = g = s.call(l, l.__data__, a, e) + "", c.has(g) ? r[a] = l : c.set(g, l));
  for (a = 0; a < h; ++a)
    g = s.call(t, o[a], a, o) + "", (l = c.get(g)) ? (i[a] = l, l.__data__ = o[a], c.delete(g)) : n[a] = new ie(t, o[a]);
  for (a = 0; a < d; ++a)
    (l = e[a]) && c.get(f[a]) === l && (r[a] = l);
}
function wr(t) {
  return t.__data__;
}
function vr(t, e) {
  if (!arguments.length) return Array.from(this, wr);
  var n = e ? yr : _r, i = this._parents, r = this._groups;
  typeof t != "function" && (t = mr(t));
  for (var o = r.length, s = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var d = i[c], h = r[c], f = h.length, g = xr(t.call(d, d && d.__data__, c, i)), w = g.length, b = a[c] = new Array(w), T = s[c] = new Array(w), y = l[c] = new Array(f);
    n(d, h, b, T, y, g, e);
    for (var M = 0, O = 0, G, H; M < w; ++M)
      if (G = b[M]) {
        for (M >= O && (O = M + 1); !(H = T[O]) && ++O < w; ) ;
        G._next = H || null;
      }
  }
  return s = new U(s, i), s._enter = a, s._exit = l, s;
}
function xr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function $r() {
  return new U(this._exit || this._groups.map(On), this._parents);
}
function br(t, e, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function Er(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, o = i.length, s = Math.min(r, o), a = new Array(r), l = 0; l < s; ++l)
    for (var c = n[l], d = i[l], h = c.length, f = a[l] = new Array(h), g, w = 0; w < h; ++w)
      (g = c[w] || d[w]) && (f[w] = g);
  for (; l < r; ++l)
    a[l] = n[l];
  return new U(a, this._parents);
}
function Ir() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, o = i[r], s; --r >= 0; )
      (s = i[r]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Sr(t) {
  t || (t = kr);
  function e(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var s = n[o], a = s.length, l = r[o] = new Array(a), c, d = 0; d < a; ++d)
      (c = s[d]) && (l[d] = c);
    l.sort(e);
  }
  return new U(r, this._parents).order();
}
function kr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ar() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Tr() {
  return Array.from(this);
}
function Nr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, o = i.length; r < o; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function Pr() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Cr() {
  return !this.node();
}
function Rr(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], o = 0, s = r.length, a; o < s; ++o)
      (a = r[o]) && t.call(a, a.__data__, o, r);
  return this;
}
function Mr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Or(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Lr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Dr(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ur(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function zr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Hr(t, e) {
  var n = de(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Or : Mr : typeof e == "function" ? n.local ? zr : Ur : n.local ? Dr : Lr)(n, e));
}
function Ln(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Vr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function qr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Fr(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Br(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Vr : typeof e == "function" ? Fr : qr)(t, e, n ?? "")) : $t(this.node(), t);
}
function $t(t, e) {
  return t.style.getPropertyValue(e) || Ln(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Xr(t) {
  return function() {
    delete this[t];
  };
}
function Gr(t, e) {
  return function() {
    this[t] = e;
  };
}
function Yr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Wr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Xr : typeof e == "function" ? Yr : Gr)(t, e)) : this.node()[t];
}
function Dn(t) {
  return t.trim().split(/^|\s+/);
}
function Ue(t) {
  return t.classList || new Un(t);
}
function Un(t) {
  this._node = t, this._names = Dn(t.getAttribute("class") || "");
}
Un.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function zn(t, e) {
  for (var n = Ue(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Hn(t, e) {
  for (var n = Ue(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Kr(t) {
  return function() {
    zn(this, t);
  };
}
function Zr(t) {
  return function() {
    Hn(this, t);
  };
}
function Jr(t, e) {
  return function() {
    (e.apply(this, arguments) ? zn : Hn)(this, t);
  };
}
function Qr(t, e) {
  var n = Dn(t + "");
  if (arguments.length < 2) {
    for (var i = Ue(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Jr : e ? Kr : Zr)(n, e));
}
function jr() {
  this.textContent = "";
}
function ts(t) {
  return function() {
    this.textContent = t;
  };
}
function es(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ns(t) {
  return arguments.length ? this.each(t == null ? jr : (typeof t == "function" ? es : ts)(t)) : this.node().textContent;
}
function is() {
  this.innerHTML = "";
}
function rs(t) {
  return function() {
    this.innerHTML = t;
  };
}
function ss(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function os(t) {
  return arguments.length ? this.each(t == null ? is : (typeof t == "function" ? ss : rs)(t)) : this.node().innerHTML;
}
function as() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ls() {
  return this.each(as);
}
function cs() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ds() {
  return this.each(cs);
}
function us(t) {
  var e = typeof t == "function" ? t : Pn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function hs() {
  return null;
}
function fs(t, e) {
  var n = typeof t == "function" ? t : Pn(t), i = e == null ? hs : typeof e == "function" ? e : De(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function ps() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function gs() {
  return this.each(ps);
}
function ms() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function _s() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ys(t) {
  return this.select(t ? _s : ms);
}
function ws(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function vs(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function xs(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function $s(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, o; n < r; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++i] = o;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function bs(t, e, n) {
  return function() {
    var i = this.__on, r, o = vs(e);
    if (i) {
      for (var s = 0, a = i.length; s < a; ++s)
        if ((r = i[s]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = n), r.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), r = { type: t.type, name: t.name, value: e, listener: o, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function Es(t, e, n) {
  var i = xs(t + ""), r, o = i.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, d; l < c; ++l)
        for (r = 0, d = a[l]; r < o; ++r)
          if ((s = i[r]).type === d.type && s.name === d.name)
            return d.value;
    }
    return;
  }
  for (a = e ? bs : $s, r = 0; r < o; ++r) this.each(a(i[r], e, n));
  return this;
}
function Vn(t, e, n) {
  var i = Ln(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function Is(t, e) {
  return function() {
    return Vn(this, t, e);
  };
}
function Ss(t, e) {
  return function() {
    return Vn(this, t, e.apply(this, arguments));
  };
}
function ks(t, e) {
  return this.each((typeof e == "function" ? Ss : Is)(t, e));
}
function* As() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, o = i.length, s; r < o; ++r)
      (s = i[r]) && (yield s);
}
var qn = [null];
function U(t, e) {
  this._groups = t, this._parents = e;
}
function Vt() {
  return new U([[document.documentElement]], qn);
}
function Ts() {
  return this;
}
U.prototype = Vt.prototype = {
  constructor: U,
  select: er,
  selectAll: sr,
  selectChild: cr,
  selectChildren: fr,
  filter: pr,
  data: vr,
  enter: gr,
  exit: $r,
  join: br,
  merge: Er,
  selection: Ts,
  order: Ir,
  sort: Sr,
  call: Ar,
  nodes: Tr,
  node: Nr,
  size: Pr,
  empty: Cr,
  each: Rr,
  attr: Hr,
  style: Br,
  property: Wr,
  classed: Qr,
  text: ns,
  html: os,
  raise: ls,
  lower: ds,
  append: us,
  insert: fs,
  remove: gs,
  clone: ys,
  datum: ws,
  on: Es,
  dispatch: ks,
  [Symbol.iterator]: As
};
function W(t) {
  return typeof t == "string" ? new U([[document.querySelector(t)]], [document.documentElement]) : new U([[t]], qn);
}
function Ns(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function ct(t, e) {
  if (t = Ns(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = t.clientX, i.y = t.clientY, i = i.matrixTransform(e.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (e.getBoundingClientRect) {
      var r = e.getBoundingClientRect();
      return [t.clientX - r.left - e.clientLeft, t.clientY - r.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
var Ps = { value: () => {
} };
function ze() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new Jt(n);
}
function Jt(t) {
  this._ = t;
}
function Cs(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
Jt.prototype = ze.prototype = {
  constructor: Jt,
  on: function(t, e) {
    var n = this._, i = Cs(t + "", n), r, o = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((r = (t = i[o]).type) && (r = Rs(n[r], t.name))) return r;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < s; )
      if (r = (t = i[o]).type) n[r] = on(n[r], t.name, e);
      else if (e == null) for (r in n) n[r] = on(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Jt(t);
  },
  call: function(t, e) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), i = 0, r, o; i < r; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], i = 0, r = o.length; i < r; ++i) o[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, o = i.length; r < o; ++r) i[r].value.apply(e, n);
  }
};
function Rs(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function on(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = Ps, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const be = { capture: !0, passive: !1 };
function Ee(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ms(t) {
  var e = t.document.documentElement, n = W(t).on("dragstart.drag", Ee, be);
  "onselectstart" in e ? n.on("selectstart.drag", Ee, be) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Os(t, e) {
  var n = t.document.documentElement, i = W(t).on("dragstart.drag", null);
  e && (i.on("click.drag", Ee, be), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function He(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Fn(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function qt() {
}
var Lt = 0.7, re = 1 / Lt, wt = "\\s*([+-]?\\d+)\\s*", Dt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", K = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ls = /^#([0-9a-f]{3,8})$/, Ds = new RegExp(`^rgb\\(${wt},${wt},${wt}\\)$`), Us = new RegExp(`^rgb\\(${K},${K},${K}\\)$`), zs = new RegExp(`^rgba\\(${wt},${wt},${wt},${Dt}\\)$`), Hs = new RegExp(`^rgba\\(${K},${K},${K},${Dt}\\)$`), Vs = new RegExp(`^hsl\\(${Dt},${K},${K}\\)$`), qs = new RegExp(`^hsla\\(${Dt},${K},${K},${Dt}\\)$`), an = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
He(qt, Ut, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ln,
  // Deprecated! Use color.formatHex.
  formatHex: ln,
  formatHex8: Fs,
  formatHsl: Bs,
  formatRgb: cn,
  toString: cn
});
function ln() {
  return this.rgb().formatHex();
}
function Fs() {
  return this.rgb().formatHex8();
}
function Bs() {
  return Bn(this).formatHsl();
}
function cn() {
  return this.rgb().formatRgb();
}
function Ut(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ls.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? dn(e) : n === 3 ? new L(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Gt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Gt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ds.exec(t)) ? new L(e[1], e[2], e[3], 1) : (e = Us.exec(t)) ? new L(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = zs.exec(t)) ? Gt(e[1], e[2], e[3], e[4]) : (e = Hs.exec(t)) ? Gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Vs.exec(t)) ? fn(e[1], e[2] / 100, e[3] / 100, 1) : (e = qs.exec(t)) ? fn(e[1], e[2] / 100, e[3] / 100, e[4]) : an.hasOwnProperty(t) ? dn(an[t]) : t === "transparent" ? new L(NaN, NaN, NaN, 0) : null;
}
function dn(t) {
  return new L(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Gt(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new L(t, e, n, i);
}
function Xs(t) {
  return t instanceof qt || (t = Ut(t)), t ? (t = t.rgb(), new L(t.r, t.g, t.b, t.opacity)) : new L();
}
function Ie(t, e, n, i) {
  return arguments.length === 1 ? Xs(t) : new L(t, e, n, i ?? 1);
}
function L(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
He(L, Ie, Fn(qt, {
  brighter(t) {
    return t = t == null ? re : Math.pow(re, t), new L(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Lt : Math.pow(Lt, t), new L(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new L(pt(this.r), pt(this.g), pt(this.b), se(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: un,
  // Deprecated! Use color.formatHex.
  formatHex: un,
  formatHex8: Gs,
  formatRgb: hn,
  toString: hn
}));
function un() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}`;
}
function Gs() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}${ut((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function hn() {
  const t = se(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${pt(this.r)}, ${pt(this.g)}, ${pt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function se(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function pt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ut(t) {
  return t = pt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function fn(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new B(t, e, n, i);
}
function Bn(t) {
  if (t instanceof B) return new B(t.h, t.s, t.l, t.opacity);
  if (t instanceof qt || (t = Ut(t)), !t) return new B();
  if (t instanceof B) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), o = Math.max(e, n, i), s = NaN, a = o - r, l = (o + r) / 2;
  return a ? (e === o ? s = (n - i) / a + (n < i) * 6 : n === o ? s = (i - e) / a + 2 : s = (e - n) / a + 4, a /= l < 0.5 ? o + r : 2 - o - r, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new B(s, a, l, t.opacity);
}
function Ys(t, e, n, i) {
  return arguments.length === 1 ? Bn(t) : new B(t, e, n, i ?? 1);
}
function B(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
He(B, Ys, Fn(qt, {
  brighter(t) {
    return t = t == null ? re : Math.pow(re, t), new B(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Lt : Math.pow(Lt, t), new B(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new L(
      we(t >= 240 ? t - 240 : t + 120, r, i),
      we(t, r, i),
      we(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new B(pn(this.h), Yt(this.s), Yt(this.l), se(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = se(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${pn(this.h)}, ${Yt(this.s) * 100}%, ${Yt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function pn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Yt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function we(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Xn = (t) => () => t;
function Ws(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ks(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function Zs(t) {
  return (t = +t) == 1 ? Gn : function(e, n) {
    return n - e ? Ks(e, n, t) : Xn(isNaN(e) ? n : e);
  };
}
function Gn(t, e) {
  var n = e - t;
  return n ? Ws(t, n) : Xn(isNaN(t) ? e : t);
}
const gn = (function t(e) {
  var n = Zs(e);
  function i(r, o) {
    var s = n((r = Ie(r)).r, (o = Ie(o)).r), a = n(r.g, o.g), l = n(r.b, o.b), c = Gn(r.opacity, o.opacity);
    return function(d) {
      return r.r = s(d), r.g = a(d), r.b = l(d), r.opacity = c(d), r + "";
    };
  }
  return i.gamma = t, i;
})(1);
function rt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Se = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ve = new RegExp(Se.source, "g");
function Js(t) {
  return function() {
    return t;
  };
}
function Qs(t) {
  return function(e) {
    return t(e) + "";
  };
}
function js(t, e) {
  var n = Se.lastIndex = ve.lastIndex = 0, i, r, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (i = Se.exec(t)) && (r = ve.exec(e)); )
    (o = r.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (i = i[0]) === (r = r[0]) ? a[s] ? a[s] += r : a[++s] = r : (a[++s] = null, l.push({ i: s, x: rt(i, r) })), n = ve.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? Qs(l[0].x) : Js(e) : (e = l.length, function(c) {
    for (var d = 0, h; d < e; ++d) a[(h = l[d]).i] = h.x(c);
    return a.join("");
  });
}
var mn = 180 / Math.PI, ke = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Yn(t, e, n, i, r, o) {
  var s, a, l;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (l = t * n + e * i) && (n -= t * l, i -= e * l), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, l /= a), t * i < e * n && (t = -t, e = -e, l = -l, s = -s), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(e, t) * mn,
    skewX: Math.atan(l) * mn,
    scaleX: s,
    scaleY: a
  };
}
var Wt;
function to(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ke : Yn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function eo(t) {
  return t == null || (Wt || (Wt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Wt.setAttribute("transform", t), !(t = Wt.transform.baseVal.consolidate())) ? ke : (t = t.matrix, Yn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Wn(t, e, n, i) {
  function r(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, d, h, f, g, w) {
    if (c !== h || d !== f) {
      var b = g.push("translate(", null, e, null, n);
      w.push({ i: b - 4, x: rt(c, h) }, { i: b - 2, x: rt(d, f) });
    } else (h || f) && g.push("translate(" + h + e + f + n);
  }
  function s(c, d, h, f) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), f.push({ i: h.push(r(h) + "rotate(", null, i) - 2, x: rt(c, d) })) : d && h.push(r(h) + "rotate(" + d + i);
  }
  function a(c, d, h, f) {
    c !== d ? f.push({ i: h.push(r(h) + "skewX(", null, i) - 2, x: rt(c, d) }) : d && h.push(r(h) + "skewX(" + d + i);
  }
  function l(c, d, h, f, g, w) {
    if (c !== h || d !== f) {
      var b = g.push(r(g) + "scale(", null, ",", null, ")");
      w.push({ i: b - 4, x: rt(c, h) }, { i: b - 2, x: rt(d, f) });
    } else (h !== 1 || f !== 1) && g.push(r(g) + "scale(" + h + "," + f + ")");
  }
  return function(c, d) {
    var h = [], f = [];
    return c = t(c), d = t(d), o(c.translateX, c.translateY, d.translateX, d.translateY, h, f), s(c.rotate, d.rotate, h, f), a(c.skewX, d.skewX, h, f), l(c.scaleX, c.scaleY, d.scaleX, d.scaleY, h, f), c = d = null, function(g) {
      for (var w = -1, b = f.length, T; ++w < b; ) h[(T = f[w]).i] = T.x(g);
      return h.join("");
    };
  };
}
var no = Wn(to, "px, ", "px)", "deg)"), io = Wn(eo, ", ", ")", ")"), ro = 1e-12;
function _n(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function so(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function oo(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const ao = (function t(e, n, i) {
  function r(o, s) {
    var a = o[0], l = o[1], c = o[2], d = s[0], h = s[1], f = s[2], g = d - a, w = h - l, b = g * g + w * w, T, y;
    if (b < ro)
      y = Math.log(f / c) / e, T = function(it) {
        return [
          a + it * g,
          l + it * w,
          c * Math.exp(e * it * y)
        ];
      };
    else {
      var M = Math.sqrt(b), O = (f * f - c * c + i * b) / (2 * c * n * M), G = (f * f - c * c - i * b) / (2 * f * n * M), H = Math.log(Math.sqrt(O * O + 1) - O), V = Math.log(Math.sqrt(G * G + 1) - G);
      y = (V - H) / e, T = function(it) {
        var Ft = it * y, Bt = _n(H), Xt = c / (n * M) * (Bt * oo(e * Ft + H) - so(H));
        return [
          a + Xt * g,
          l + Xt * w,
          c * Bt / _n(e * Ft + H)
        ];
      };
    }
    return T.duration = y * 1e3 * e / Math.SQRT2, T;
  }
  return r.rho = function(o) {
    var s = Math.max(1e-3, +o), a = s * s, l = a * a;
    return t(s, a, l);
  }, r;
})(Math.SQRT2, 2, 4);
var bt = 0, At = 0, It = 0, Kn = 1e3, oe, Tt, ae = 0, mt = 0, ue = 0, zt = typeof performance == "object" && performance.now ? performance : Date, Zn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ve() {
  return mt || (Zn(lo), mt = zt.now() + ue);
}
function lo() {
  mt = 0;
}
function le() {
  this._call = this._time = this._next = null;
}
le.prototype = Jn.prototype = {
  constructor: le,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ve() : +n) + (e == null ? 0 : +e), !this._next && Tt !== this && (Tt ? Tt._next = this : oe = this, Tt = this), this._call = t, this._time = n, Ae();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ae());
  }
};
function Jn(t, e, n) {
  var i = new le();
  return i.restart(t, e, n), i;
}
function co() {
  Ve(), ++bt;
  for (var t = oe, e; t; )
    (e = mt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --bt;
}
function yn() {
  mt = (ae = zt.now()) + ue, bt = At = 0;
  try {
    co();
  } finally {
    bt = 0, ho(), mt = 0;
  }
}
function uo() {
  var t = zt.now(), e = t - ae;
  e > Kn && (ue -= e, ae = t);
}
function ho() {
  for (var t, e = oe, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : oe = n);
  Tt = t, Ae(i);
}
function Ae(t) {
  if (!bt) {
    At && (At = clearTimeout(At));
    var e = t - mt;
    e > 24 ? (t < 1 / 0 && (At = setTimeout(yn, t - zt.now() - ue)), It && (It = clearInterval(It))) : (It || (ae = zt.now(), It = setInterval(uo, Kn)), bt = 1, Zn(yn));
  }
}
function wn(t, e, n) {
  var i = new le();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var fo = ze("start", "end", "cancel", "interrupt"), po = [], Qn = 0, vn = 1, Te = 2, Qt = 3, xn = 4, Ne = 5, jt = 6;
function he(t, e, n, i, r, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  go(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: fo,
    tween: po,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Qn
  });
}
function qe(t, e) {
  var n = X(t, e);
  if (n.state > Qn) throw new Error("too late; already scheduled");
  return n;
}
function Z(t, e) {
  var n = X(t, e);
  if (n.state > Qt) throw new Error("too late; already running");
  return n;
}
function X(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function go(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = Jn(o, 0, n.time);
  function o(c) {
    n.state = vn, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var d, h, f, g;
    if (n.state !== vn) return l();
    for (d in i)
      if (g = i[d], g.name === n.name) {
        if (g.state === Qt) return wn(s);
        g.state === xn ? (g.state = jt, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete i[d]) : +d < e && (g.state = jt, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete i[d]);
      }
    if (wn(function() {
      n.state === Qt && (n.state = xn, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = Te, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Te) {
      for (n.state = Qt, r = new Array(f = n.tween.length), d = 0, h = -1; d < f; ++d)
        (g = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (r[++h] = g);
      r.length = h + 1;
    }
  }
  function a(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = Ne, 1), h = -1, f = r.length; ++h < f; )
      r[h].call(t, d);
    n.state === Ne && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = jt, n.timer.stop(), delete i[e];
    for (var c in i) return;
    delete t.__transition;
  }
}
function te(t, e) {
  var n = t.__transition, i, r, o = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        o = !1;
        continue;
      }
      r = i.state > Te && i.state < Ne, i.state = jt, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    o && delete t.__transition;
  }
}
function mo(t) {
  return this.each(function() {
    te(this, t);
  });
}
function _o(t, e) {
  var n, i;
  return function() {
    var r = Z(this, t), o = r.tween;
    if (o !== n) {
      i = n = o;
      for (var s = 0, a = i.length; s < a; ++s)
        if (i[s].name === e) {
          i = i.slice(), i.splice(s, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function yo(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Z(this, t), s = o.tween;
    if (s !== i) {
      r = (i = s).slice();
      for (var a = { name: e, value: n }, l = 0, c = r.length; l < c; ++l)
        if (r[l].name === e) {
          r[l] = a;
          break;
        }
      l === c && r.push(a);
    }
    o.tween = r;
  };
}
function wo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = X(this.node(), n).tween, r = 0, o = i.length, s; r < o; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? _o : yo)(n, t, e));
}
function Fe(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = Z(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return X(r, i).value[e];
  };
}
function jn(t, e) {
  var n;
  return (typeof e == "number" ? rt : e instanceof Ut ? gn : (n = Ut(e)) ? (e = n, gn) : js)(t, e);
}
function vo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function xo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function $o(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function bo(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function Eo(t, e, n) {
  var i, r, o;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === i && l === r ? o : (r = l, o = e(i = s, a)));
  };
}
function Io(t, e, n) {
  var i, r, o;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === i && l === r ? o : (r = l, o = e(i = s, a)));
  };
}
function So(t, e) {
  var n = de(t), i = n === "transform" ? io : jn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Io : Eo)(n, i, Fe(this, "attr." + t, e)) : e == null ? (n.local ? xo : vo)(n) : (n.local ? bo : $o)(n, i, e));
}
function ko(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Ao(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function To(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && Ao(t, o)), n;
  }
  return r._value = e, r;
}
function No(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && ko(t, o)), n;
  }
  return r._value = e, r;
}
function Po(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = de(t);
  return this.tween(n, (i.local ? To : No)(i, e));
}
function Co(t, e) {
  return function() {
    qe(this, t).delay = +e.apply(this, arguments);
  };
}
function Ro(t, e) {
  return e = +e, function() {
    qe(this, t).delay = e;
  };
}
function Mo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Co : Ro)(e, t)) : X(this.node(), e).delay;
}
function Oo(t, e) {
  return function() {
    Z(this, t).duration = +e.apply(this, arguments);
  };
}
function Lo(t, e) {
  return e = +e, function() {
    Z(this, t).duration = e;
  };
}
function Do(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Oo : Lo)(e, t)) : X(this.node(), e).duration;
}
function Uo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Z(this, t).ease = e;
  };
}
function zo(t) {
  var e = this._id;
  return arguments.length ? this.each(Uo(e, t)) : X(this.node(), e).ease;
}
function Ho(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Z(this, t).ease = n;
  };
}
function Vo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Ho(this._id, t));
}
function qo(t) {
  typeof t != "function" && (t = Rn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new et(i, this._parents, this._name, this._id);
}
function Fo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, o = Math.min(i, r), s = new Array(i), a = 0; a < o; ++a)
    for (var l = e[a], c = n[a], d = l.length, h = s[a] = new Array(d), f, g = 0; g < d; ++g)
      (f = l[g] || c[g]) && (h[g] = f);
  for (; a < i; ++a)
    s[a] = e[a];
  return new et(s, this._parents, this._name, this._id);
}
function Bo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Xo(t, e, n) {
  var i, r, o = Bo(e) ? qe : Z;
  return function() {
    var s = o(this, t), a = s.on;
    a !== i && (r = (i = a).copy()).on(e, n), s.on = r;
  };
}
function Go(t, e) {
  var n = this._id;
  return arguments.length < 2 ? X(this.node(), n).on.on(t) : this.each(Xo(n, t, e));
}
function Yo(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Wo() {
  return this.on("end.remove", Yo(this._id));
}
function Ko(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = De(t));
  for (var i = this._groups, r = i.length, o = new Array(r), s = 0; s < r; ++s)
    for (var a = i[s], l = a.length, c = o[s] = new Array(l), d, h, f = 0; f < l; ++f)
      (d = a[f]) && (h = t.call(d, d.__data__, f, a)) && ("__data__" in d && (h.__data__ = d.__data__), c[f] = h, he(c[f], e, n, f, c, X(d, n)));
  return new et(o, this._parents, e, n);
}
function Zo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Cn(t));
  for (var i = this._groups, r = i.length, o = [], s = [], a = 0; a < r; ++a)
    for (var l = i[a], c = l.length, d, h = 0; h < c; ++h)
      if (d = l[h]) {
        for (var f = t.call(d, d.__data__, h, l), g, w = X(d, n), b = 0, T = f.length; b < T; ++b)
          (g = f[b]) && he(g, e, n, b, f, w);
        o.push(f), s.push(d);
      }
  return new et(o, s, e, n);
}
var Jo = Vt.prototype.constructor;
function Qo() {
  return new Jo(this._groups, this._parents);
}
function jo(t, e) {
  var n, i, r;
  return function() {
    var o = $t(this, t), s = (this.style.removeProperty(t), $t(this, t));
    return o === s ? null : o === n && s === i ? r : r = e(n = o, i = s);
  };
}
function ti(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ta(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = $t(this, t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function ea(t, e, n) {
  var i, r, o;
  return function() {
    var s = $t(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), $t(this, t))), s === l ? null : s === i && l === r ? o : (r = l, o = e(i = s, a));
  };
}
function na(t, e) {
  var n, i, r, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = Z(this, t), c = l.on, d = l.value[o] == null ? a || (a = ti(e)) : void 0;
    (c !== n || r !== d) && (i = (n = c).copy()).on(s, r = d), l.on = i;
  };
}
function ia(t, e, n) {
  var i = (t += "") == "transform" ? no : jn;
  return e == null ? this.styleTween(t, jo(t, i)).on("end.style." + t, ti(t)) : typeof e == "function" ? this.styleTween(t, ea(t, i, Fe(this, "style." + t, e))).each(na(this._id, t)) : this.styleTween(t, ta(t, i, e), n).on("end.style." + t, null);
}
function ra(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function sa(t, e, n) {
  var i, r;
  function o() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && ra(t, s, n)), i;
  }
  return o._value = e, o;
}
function oa(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, sa(t, e, n ?? ""));
}
function aa(t) {
  return function() {
    this.textContent = t;
  };
}
function la(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ca(t) {
  return this.tween("text", typeof t == "function" ? la(Fe(this, "text", t)) : aa(t == null ? "" : t + ""));
}
function da(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ua(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && da(r)), e;
  }
  return i._value = t, i;
}
function ha(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ua(t));
}
function fa() {
  for (var t = this._name, e = this._id, n = ei(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], a = s.length, l, c = 0; c < a; ++c)
      if (l = s[c]) {
        var d = X(l, e);
        he(l, t, n, c, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new et(i, this._parents, t, n);
}
function pa() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var c = Z(this, i), d = c.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), r === 0 && o();
  });
}
var ga = 0;
function et(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function ei() {
  return ++ga;
}
var j = Vt.prototype;
et.prototype = {
  constructor: et,
  select: Ko,
  selectAll: Zo,
  selectChild: j.selectChild,
  selectChildren: j.selectChildren,
  filter: qo,
  merge: Fo,
  selection: Qo,
  transition: fa,
  call: j.call,
  nodes: j.nodes,
  node: j.node,
  size: j.size,
  empty: j.empty,
  each: j.each,
  on: Go,
  attr: So,
  attrTween: Po,
  style: ia,
  styleTween: oa,
  text: ca,
  textTween: ha,
  remove: Wo,
  tween: wo,
  delay: Mo,
  duration: Do,
  ease: zo,
  easeVarying: Vo,
  end: pa,
  [Symbol.iterator]: j[Symbol.iterator]
};
function ma(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var _a = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ma
};
function ya(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function wa(t) {
  var e, n;
  t instanceof et ? (e = t._id, t = t._name) : (e = ei(), (n = _a).time = Ve(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && he(l, t, e, c, s, n || ya(l, e));
  return new et(i, this._parents, t, e);
}
Vt.prototype.interrupt = mo;
Vt.prototype.transition = wa;
const Kt = (t) => () => t;
function va(t, {
  sourceEvent: e,
  target: n,
  transform: i,
  dispatch: r
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: r }
  });
}
function tt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
tt.prototype = {
  constructor: tt,
  scale: function(t) {
    return t === 1 ? this : new tt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new tt(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ct = new tt(1, 0, 0);
tt.prototype;
function xe(t) {
  t.stopImmediatePropagation();
}
function St(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function xa(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function $a() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function $n() {
  return this.__zoom || Ct;
}
function ba(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Ea() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ia(t, e, n) {
  var i = t.invertX(e[0][0]) - n[0][0], r = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Sa() {
  var t = xa, e = $a, n = Ia, i = ba, r = Ea, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = ao, c = ze("start", "zoom", "end"), d, h, f, g = 500, w = 150, b = 0, T = 10;
  function y(u) {
    u.property("__zoom", $n).on("wheel.zoom", Ft, { passive: !1 }).on("mousedown.zoom", Bt).on("dblclick.zoom", Xt).filter(r).on("touchstart.zoom", ni).on("touchmove.zoom", ii).on("touchend.zoom touchcancel.zoom", ri).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(u, m, p, _) {
    var v = u.selection ? u.selection() : u;
    v.property("__zoom", $n), u !== v ? H(u, m, p, _) : v.interrupt().each(function() {
      V(this, arguments).event(_).start().zoom(null, typeof m == "function" ? m.apply(this, arguments) : m).end();
    });
  }, y.scaleBy = function(u, m, p, _) {
    y.scaleTo(u, function() {
      var v = this.__zoom.k, x = typeof m == "function" ? m.apply(this, arguments) : m;
      return v * x;
    }, p, _);
  }, y.scaleTo = function(u, m, p, _) {
    y.transform(u, function() {
      var v = e.apply(this, arguments), x = this.__zoom, $ = p == null ? G(v) : typeof p == "function" ? p.apply(this, arguments) : p, I = x.invert($), P = typeof m == "function" ? m.apply(this, arguments) : m;
      return n(O(M(x, P), $, I), v, s);
    }, p, _);
  }, y.translateBy = function(u, m, p, _) {
    y.transform(u, function() {
      return n(this.__zoom.translate(
        typeof m == "function" ? m.apply(this, arguments) : m,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), e.apply(this, arguments), s);
    }, null, _);
  }, y.translateTo = function(u, m, p, _, v) {
    y.transform(u, function() {
      var x = e.apply(this, arguments), $ = this.__zoom, I = _ == null ? G(x) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(Ct.translate(I[0], I[1]).scale($.k).translate(
        typeof m == "function" ? -m.apply(this, arguments) : -m,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), x, s);
    }, _, v);
  };
  function M(u, m) {
    return m = Math.max(o[0], Math.min(o[1], m)), m === u.k ? u : new tt(m, u.x, u.y);
  }
  function O(u, m, p) {
    var _ = m[0] - p[0] * u.k, v = m[1] - p[1] * u.k;
    return _ === u.x && v === u.y ? u : new tt(u.k, _, v);
  }
  function G(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function H(u, m, p, _) {
    u.on("start.zoom", function() {
      V(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      V(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var v = this, x = arguments, $ = V(v, x).event(_), I = e.apply(v, x), P = p == null ? G(I) : typeof p == "function" ? p.apply(v, x) : p, Y = Math.max(I[1][0] - I[0][0], I[1][1] - I[0][1]), R = v.__zoom, q = typeof m == "function" ? m.apply(v, x) : m, J = l(R.invert(P).concat(Y / R.k), q.invert(P).concat(Y / q.k));
      return function(F) {
        if (F === 1) F = q;
        else {
          var Q = J(F), fe = Y / Q[2];
          F = new tt(fe, P[0] - Q[0] * fe, P[1] - Q[1] * fe);
        }
        $.zoom(null, F);
      };
    });
  }
  function V(u, m, p) {
    return !p && u.__zooming || new it(u, m);
  }
  function it(u, m) {
    this.that = u, this.args = m, this.active = 0, this.sourceEvent = null, this.extent = e.apply(u, m), this.taps = 0;
  }
  it.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, m) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = m.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = m.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = m.invert(this.touch1[0])), this.that.__zoom = m, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var m = W(this.that).datum();
      c.call(
        u,
        this.that,
        new va(u, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        m
      );
    }
  };
  function Ft(u, ...m) {
    if (!t.apply(this, arguments)) return;
    var p = V(this, m).event(u), _ = this.__zoom, v = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, i.apply(this, arguments)))), x = ct(u);
    if (p.wheel)
      (p.mouse[0][0] !== x[0] || p.mouse[0][1] !== x[1]) && (p.mouse[1] = _.invert(p.mouse[0] = x)), clearTimeout(p.wheel);
    else {
      if (_.k === v) return;
      p.mouse = [x, _.invert(x)], te(this), p.start();
    }
    St(u), p.wheel = setTimeout($, w), p.zoom("mouse", n(O(M(_, v), p.mouse[0], p.mouse[1]), p.extent, s));
    function $() {
      p.wheel = null, p.end();
    }
  }
  function Bt(u, ...m) {
    if (f || !t.apply(this, arguments)) return;
    var p = u.currentTarget, _ = V(this, m, !0).event(u), v = W(u.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", Y, !0), x = ct(u, p), $ = u.clientX, I = u.clientY;
    Ms(u.view), xe(u), _.mouse = [x, this.__zoom.invert(x)], te(this), _.start();
    function P(R) {
      if (St(R), !_.moved) {
        var q = R.clientX - $, J = R.clientY - I;
        _.moved = q * q + J * J > b;
      }
      _.event(R).zoom("mouse", n(O(_.that.__zoom, _.mouse[0] = ct(R, p), _.mouse[1]), _.extent, s));
    }
    function Y(R) {
      v.on("mousemove.zoom mouseup.zoom", null), Os(R.view, _.moved), St(R), _.event(R).end();
    }
  }
  function Xt(u, ...m) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, _ = ct(u.changedTouches ? u.changedTouches[0] : u, this), v = p.invert(_), x = p.k * (u.shiftKey ? 0.5 : 2), $ = n(O(M(p, x), _, v), e.apply(this, m), s);
      St(u), a > 0 ? W(this).transition().duration(a).call(H, $, _, u) : W(this).call(y.transform, $, _, u);
    }
  }
  function ni(u, ...m) {
    if (t.apply(this, arguments)) {
      var p = u.touches, _ = p.length, v = V(this, m, u.changedTouches.length === _).event(u), x, $, I, P;
      for (xe(u), $ = 0; $ < _; ++$)
        I = p[$], P = ct(I, this), P = [P, this.__zoom.invert(P), I.identifier], v.touch0 ? !v.touch1 && v.touch0[2] !== P[2] && (v.touch1 = P, v.taps = 0) : (v.touch0 = P, x = !0, v.taps = 1 + !!d);
      d && (d = clearTimeout(d)), x && (v.taps < 2 && (h = P[0], d = setTimeout(function() {
        d = null;
      }, g)), te(this), v.start());
    }
  }
  function ii(u, ...m) {
    if (this.__zooming) {
      var p = V(this, m).event(u), _ = u.changedTouches, v = _.length, x, $, I, P;
      for (St(u), x = 0; x < v; ++x)
        $ = _[x], I = ct($, this), p.touch0 && p.touch0[2] === $.identifier ? p.touch0[0] = I : p.touch1 && p.touch1[2] === $.identifier && (p.touch1[0] = I);
      if ($ = p.that.__zoom, p.touch1) {
        var Y = p.touch0[0], R = p.touch0[1], q = p.touch1[0], J = p.touch1[1], F = (F = q[0] - Y[0]) * F + (F = q[1] - Y[1]) * F, Q = (Q = J[0] - R[0]) * Q + (Q = J[1] - R[1]) * Q;
        $ = M($, Math.sqrt(F / Q)), I = [(Y[0] + q[0]) / 2, (Y[1] + q[1]) / 2], P = [(R[0] + J[0]) / 2, (R[1] + J[1]) / 2];
      } else if (p.touch0) I = p.touch0[0], P = p.touch0[1];
      else return;
      p.zoom("touch", n(O($, I, P), p.extent, s));
    }
  }
  function ri(u, ...m) {
    if (this.__zooming) {
      var p = V(this, m).event(u), _ = u.changedTouches, v = _.length, x, $;
      for (xe(u), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, g), x = 0; x < v; ++x)
        $ = _[x], p.touch0 && p.touch0[2] === $.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === $.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && ($ = ct($, this), Math.hypot(h[0] - $[0], h[1] - $[1]) < T)) {
        var I = W(this).on("dblclick.zoom");
        I && I.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(u) {
    return arguments.length ? (i = typeof u == "function" ? u : Kt(+u), y) : i;
  }, y.filter = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Kt(!!u), y) : t;
  }, y.touchable = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : Kt(!!u), y) : r;
  }, y.extent = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Kt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), y) : e;
  }, y.scaleExtent = function(u) {
    return arguments.length ? (o[0] = +u[0], o[1] = +u[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(u) {
    return arguments.length ? (s[0][0] = +u[0][0], s[1][0] = +u[1][0], s[0][1] = +u[0][1], s[1][1] = +u[1][1], y) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, y.constrain = function(u) {
    return arguments.length ? (n = u, y) : n;
  }, y.duration = function(u) {
    return arguments.length ? (a = +u, y) : a;
  }, y.interpolate = function(u) {
    return arguments.length ? (l = u, y) : l;
  }, y.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? y : u;
  }, y.clickDistance = function(u) {
    return arguments.length ? (b = (u = +u) * u, y) : Math.sqrt(b);
  }, y.tapDistance = function(u) {
    return arguments.length ? (T = +u, y) : T;
  }, y;
}
var ka = Object.defineProperty, Aa = Object.getOwnPropertyDescriptor, z = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Aa(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, n, r) : s(r)) || r);
  return i && r && ka(e, n, r), r;
};
function Ta(t, e, n, i) {
  const r = e.x - t.x, o = e.y - t.y, s = i.x - n.x, a = i.y - n.y, l = r * a - o * s;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((n.x - t.x) * a - (n.y - t.y) * s) / l, d = ((n.x - t.x) * o - (n.y - t.y) * r) / l;
  return c <= 0.02 || c >= 0.98 || d <= 0.02 || d >= 0.98 ? null : { x: t.x + c * r, y: t.y + c * o, t: c };
}
function Na(t, e, n) {
  const i = n.x - e.x, r = n.y - e.y, o = i * i + r * r || 1, s = Math.max(0, Math.min(1, ((t.x - e.x) * i + (t.y - e.y) * r) / o)), a = e.x + s * i, l = e.y + s * r;
  return { dist: Math.hypot(t.x - a, t.y - l), t: s };
}
function Pa(t, e, n = 7) {
  let i = `M ${t[0].x} ${t[0].y}`;
  for (let r = 0; r < t.length - 1; r++) {
    const o = t[r], s = t[r + 1], a = Math.hypot(s.x - o.x, s.y - o.y) || 1, l = (s.x - o.x) / a, c = (s.y - o.y) / a, d = e.map(([f, g]) => Ta(o, s, f, g)).filter((f) => f !== null).filter((f) => f.t * a > n + 2 && (1 - f.t) * a > n + 2).sort((f, g) => f.t - g.t);
    let h = -1 / 0;
    for (const f of d)
      f.t * a - n <= h + 2 || (i += ` L ${f.x - l * n} ${f.y - c * n}`, i += ` A ${n} ${n} 0 0 1 ${f.x + l * n} ${f.y + c * n}`, h = f.t * a + n);
    i += ` L ${s.x} ${s.y}`;
  }
  return i;
}
const bn = {
  component: k`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: k`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: k`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: k`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: k`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: k`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: k`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: k`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  undo: k`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let D = class extends ft {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !0, this.edgePoints = {}, this._t = Ct, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._fitted = !1, this._onKeyUp = (t) => {
      t.key === " " && (this._spaceDown = !1);
    }, this._onKeyDown = (t) => {
      if (!this._editingId) {
        if (t.key === " ") {
          t.preventDefault(), this._spaceDown = !0;
          return;
        }
        if ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z") {
          t.preventDefault(), this.emit(t.shiftKey ? "redo-requested" : "undo-requested");
          return;
        }
        if ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "y") {
          t.preventDefault(), this.emit("redo-requested");
          return;
        }
        if (t.key === "F2" && this.selectedId) {
          const e = this.scene.nodes.find((n) => n.id === this.selectedId);
          e && (t.preventDefault(), this._editingId = e.id);
          return;
        }
        if ((t.key === "Delete" || t.key === "Backspace") && this.selectedId) {
          const e = this.scene.edges.find((r) => r.id === this.selectedId), n = this.scene.nodes.find((r) => r.id === this.selectedId), i = e ?? n;
          i && (t.preventDefault(), this.emit("delete-requested", {
            elementType: e ? "edge" : "node",
            id: i.id,
            kind: i.kind
          }));
        }
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("keydown", this._onKeyDown), this.addEventListener("keyup", this._onKeyUp);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown), this.removeEventListener("keyup", this._onKeyUp), super.disconnectedCallback();
  }
  commitRename(t, e) {
    if (this._editingId !== t.id) return;
    this._editingId = null;
    const n = e.trim();
    n && n !== t.label && this.emit("node-renamed", { id: t.id, kind: t.kind, name: n });
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector("svg.main");
    this._zoomBehavior = Sa().scaleExtent([0.15, 4]).filter((e) => {
      const n = e.target;
      return n.closest("[data-node-id]") || n.closest("[data-handle]") ? e.type === "wheel" || this._spaceDown : e.type === "wheel" || e.button === 0;
    }).on("zoom", (e) => {
      this._t = e.transform;
    }), W(t).call(this._zoomBehavior);
  }
  willUpdate(t) {
    t.has("scene") && (this._dragPos = null);
  }
  updated() {
    var t;
    if (!this._fitted && this.scene.nodes.length > 0 && this._zoomBehavior && (this._fitted = !0, this.fit()), this._editingId) {
      const e = this.renderRoot.querySelector("foreignObject input");
      e && ((t = this.shadowRoot) == null ? void 0 : t.activeElement) !== e && (e.focus(), e.select());
    }
  }
  /** Center and scale the viewport so the whole scene is visible. */
  fit(t = 60) {
    const e = this.scene.nodes, n = this.renderRoot.querySelector("svg.main");
    if (!e.length || !n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return;
    const r = Math.min(...e.map((d) => d.x - d.w / 2)) - t, o = Math.max(...e.map((d) => d.x + d.w / 2)) + t, s = Math.min(...e.map((d) => d.y - d.h / 2)) - t, a = Math.max(...e.map((d) => d.y + d.h / 2)) + t, l = Math.max(0.15, Math.min(i.width / (o - r), i.height / (a - s), 1.25)), c = Ct.translate(i.width / 2 - l * (r + o) / 2, i.height / 2 - l * (s + a) / 2).scale(l);
    W(n).call(this._zoomBehavior.transform, c);
  }
  /** Client coordinates → scene coordinates (undo pan/zoom). */
  toScene(t) {
    const e = this.getBoundingClientRect();
    return {
      x: (t.clientX - e.left - this._t.x) / this._t.k,
      y: (t.clientY - e.top - this._t.y) / this._t.k
    };
  }
  nodePos(t) {
    return this._dragPos && this._dragPos.id === t.id ? { x: this._dragPos.x, y: this._dragPos.y } : { x: t.x, y: t.y };
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  // ---- node dragging ------------------------------------------------------
  onNodePointerDown(t, e) {
    if (t.button !== 0 || this._spaceDown) return;
    t.stopPropagation(), this.focus();
    const n = this.toScene(t), i = this.nodePos(e);
    let r = !1;
    const o = (a) => {
      const l = this.toScene(a), c = l.x - n.x, d = l.y - n.y;
      !r && Math.hypot(c, d) < 3 / this._t.k || (r = !0, this._dragPos = { id: e.id, x: i.x + c, y: i.y + d });
    }, s = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), r && this._dragPos ? this.emit("node-moved", { id: e.id, x: this._dragPos.x, y: this._dragPos.y }) : this.emit("element-selected", { elementType: "node", id: e.id, kind: e.kind });
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(t, e) {
    if (t.button !== 0) return;
    t.stopPropagation();
    const n = this.toScene(t);
    this._pendingLink = { sourceId: e.id, x: n.x, y: n.y };
    const i = (o) => {
      var c;
      const s = this.toScene(o);
      this._pendingLink = { sourceId: e.id, x: s.x, y: s.y };
      const a = (c = this.shadowRoot) == null ? void 0 : c.elementFromPoint(o.clientX, o.clientY), l = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = l ? l.getAttribute("data-node-id") : null;
    }, r = (o) => {
      var l, c;
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", r);
      const s = (l = this.shadowRoot) == null ? void 0 : l.elementFromPoint(o.clientX, o.clientY), a = (c = s == null ? void 0 : s.closest("[data-node-id]")) == null ? void 0 : c.getAttribute("data-node-id");
      a && a !== e.id && this.emit("connect-requested", { sourceId: e.id, targetId: a }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", r);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(t, e, n) {
    const { x: i, y: r } = this.nodePos(t), o = e - i, s = n - r, a = t.w / 2, l = t.h / 2;
    if (o === 0 && s === 0) return { x: i, y: r };
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(s) / l);
    return { x: i + o * c, y: r + s * c };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(t) {
    const e = [t.sourceId, t.targetId].sort().join("|"), n = this.scene.edges.filter(
      (r) => [r.sourceId, r.targetId].sort().join("|") === e
    );
    return n.length < 2 ? 0 : (n.findIndex((r) => r.id === t.id) - (n.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(t) {
    const e = this.scene.nodes.find((d) => d.id === t.sourceId), n = this.scene.nodes.find((d) => d.id === t.targetId);
    if (!e || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === t.id ? this._wpDrag.points : this.edgePoints[t.id] ?? [], r = this.nodePos(e), o = this.nodePos(n), s = i[0] ?? o, a = i[i.length - 1] ?? r;
    let l = this.borderPoint(e, s.x, s.y), c = this.borderPoint(n, a.x, a.y);
    if (!i.length) {
      const d = this.edgeOffset(t);
      if (d !== 0) {
        const h = Math.hypot(c.x - l.x, c.y - l.y) || 1, f = -(c.y - l.y) / h * d, g = (c.x - l.x) / h * d;
        l = { x: l.x + f, y: l.y + g }, c = { x: c.x + f, y: c.y + g };
      }
    }
    return [l, ...i, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(t, e, n) {
    this._wpDrag = { edgeId: t.id, points: e, index: n };
    const i = (o) => {
      if (!this._wpDrag) return;
      const s = this.toScene(o), a = [...this._wpDrag.points];
      a[this._wpDrag.index] = s, this._wpDrag = { ...this._wpDrag, points: a };
    }, r = () => {
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", r), this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", r);
  }
  /** Dragging on a selected edge splits it: a new bend is born under the cursor. */
  onEdgeHitPointerDown(t, e, n) {
    if (t.button !== 0 || this.selectedId !== e.id) return;
    t.stopPropagation();
    const i = this.toScene(t);
    let r = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < n.length - 1; s++) {
      const { dist: a } = Na(i, n[s], n[s + 1]);
      a < r.dist && (r = { seg: s, dist: a });
    }
    const o = [...this.edgePoints[e.id] ?? []];
    o.splice(r.seg, 0, i), this.startWaypointDrag(e, o, r.seg);
  }
  removeWaypoint(t, e) {
    const n = [...this.edgePoints[t.id] ?? []];
    n.splice(e, 1), this.emit("edge-points-changed", { id: t.id, points: n });
  }
  renderEdge(t, e, n) {
    const i = t.color ?? "#64748b", r = this.selectedId === t.id, o = Math.floor((e.length - 1) / 2), s = {
      x: (e[o].x + e[o + 1].x) / 2,
      y: (e[o].y + e[o + 1].y) / 2
    }, a = e.slice(1, -1), l = e.map((c) => `${c.x},${c.y}`).join(" ");
    return k`
      <g data-edge-id=${t.id}>
        <polyline class="edge-hit" points=${l}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(c) => {
      c.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: t.id, kind: t.kind });
    }}
              @pointerdown=${(c) => this.onEdgeHitPointerDown(c, t, e)}>
          ${t.tooltip ? k`<title>${t.tooltip}</title>` : ""}
        </polyline>
        <path d=${Pa(e, n)}
              fill="none"
              stroke=${i} stroke-width=${r ? 3 : 1.6}
              stroke-dasharray=${t.dashed ? "6 4" : ""}
              marker-end=${t.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${t.label ? k`<text x=${s.x} y=${s.y - 6} text-anchor="middle"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${i}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3">
                  ${t.label}
                </text>` : ""}
        ${r ? a.map(
      (c, d) => k`
                <circle data-waypoint cx=${c.x} cy=${c.y} r="5" fill="#ffffff"
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(h) => {
        h.button === 0 && (h.stopPropagation(), this.startWaypointDrag(t, [...this.edgePoints[t.id] ?? []], d));
      }}
                        @dblclick=${(h) => {
        h.stopPropagation(), this.removeWaypoint(t, d);
      }}>
                  <title>Arrastra para ajustar · doble click para quitar el punto</title>
                </circle>`
    ) : ""}
      </g>
    `;
  }
  markerId(t) {
    return t.replace(/[^a-zA-Z0-9]/g, "");
  }
  renderNode(t) {
    const { x: e, y: n } = this.nodePos(t), i = this.selectedId === t.id, r = this._hoverNodeId === t.id, o = t.w / 2, s = t.h / 2;
    return k`
      <g data-node-id=${t.id} transform="translate(${e}, ${n})"
         @pointerdown=${(a) => this.onNodePointerDown(a, t)}
         @dblclick=${(a) => {
      a.stopPropagation(), this.emit("element-activated", { elementType: "node", id: t.id, kind: t.kind });
    }}>
        <rect x=${-o} y=${-s} width=${t.w} height=${t.h} rx="10"
              fill=${t.fill ?? "#ffffff"}
              stroke=${r || i ? "#2563eb" : t.stroke ?? "#94a3b8"}
              stroke-width=${i || r ? 2.5 : 1.4}
              stroke-dasharray=${t.dashed ? "6 4" : ""}>
          ${t.tooltip ? k`<title>${t.tooltip}</title>` : ""}
        </rect>
        ${t.badge ? k`<text x=${-o} y=${-s - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${t.badge}</text>` : ""}
        ${t.symbol && bn[t.symbol] ? k`<g transform="translate(${o - 17}, ${-s + 5})" fill="none"
                  stroke=${t.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${bn[t.symbol]}
              </g>` : ""}
        ${this._editingId === t.id ? k`
              <foreignObject x=${-o + 6} y="-14" width=${t.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: center; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${t.label}
                  @pointerdown=${(a) => a.stopPropagation()}
                  @keydown=${(a) => {
      a.stopPropagation(), a.key === "Enter" && this.commitRename(t, a.target.value), a.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(a) => this.commitRename(t, a.target.value)}
                />
              </foreignObject>` : k`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
              font-family="ui-sans-serif, system-ui" fill="#1e293b">${t.label}</text>`}
        ${i && this.connectable ? [
      [o, 0],
      [-o, 0],
      [0, s],
      [0, -s]
    ].map(
      ([a, l]) => k`
                <circle data-handle cx=${a} cy=${l} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(c) => this.onHandlePointerDown(c, t)}>
                  <title>Arrastra hasta otro nodo para crear una relación</title>
                </circle>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return k``;
    const t = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!t) return k``;
    const e = this.borderPoint(t, this._pendingLink.x, this._pendingLink.y);
    return k`
      <line x1=${e.x} y1=${e.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- minimap -------------------------------------------------------------
  sceneBounds(t = 40) {
    const e = this.scene.nodes;
    if (!e.length) return null;
    const n = Math.min(...e.map((s) => s.x - s.w / 2)) - t, i = Math.max(...e.map((s) => s.x + s.w / 2)) + t, r = Math.min(...e.map((s) => s.y - s.h / 2)) - t, o = Math.max(...e.map((s) => s.y + s.h / 2)) + t;
    return { minX: n, minY: r, w: i - n, h: o - r };
  }
  centerViewportOn(t, e) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), r = this._t.k, o = Ct.translate(i.width / 2 - r * t, i.height / 2 - r * e).scale(r);
    W(n).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(t, e, n) {
    const i = t.currentTarget.getBoundingClientRect(), r = e.minX + (t.clientX - i.left) / n, o = e.minY + (t.clientY - i.top) / n;
    this.centerViewportOn(r, o);
  }
  renderMinimap() {
    const t = this.sceneBounds();
    if (!t || this.scene.nodes.length < 2) return S``;
    const e = 160, n = 110, i = Math.min(e / t.w, n / t.h), r = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, s = (0 - this._t.y) / this._t.k, a = r.width / this._t.k, l = r.height / this._t.k;
    return S`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(c) => {
      c.stopPropagation();
      try {
        c.currentTarget.setPointerCapture(c.pointerId);
      } catch {
      }
      this.onMinimapPointer(c, t, i);
    }}
        @pointermove=${(c) => {
      var d, h;
      (h = (d = c.currentTarget).hasPointerCapture) != null && h.call(d, c.pointerId) && this.onMinimapPointer(c, t, i);
    }}
      >
        <svg viewBox="0 0 ${e} ${n}">
          ${this.scene.nodes.map((c) => {
      const d = this.nodePos(c);
      return k`<rect
              x=${(d.x - c.w / 2 - t.minX) * i}
              y=${(d.y - c.h / 2 - t.minY) * i}
              width=${Math.max(2, c.w * i)}
              height=${Math.max(2, c.h * i)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - t.minX) * i}
            y=${(s - t.minY) * i}
            width=${a * i}
            height=${l * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const t = [...new Set(this.scene.edges.map((i) => i.color ?? "#64748b"))], e = [], n = this.scene.edges.map((i) => {
      const r = this.edgePolyline(i);
      if (!r) return k``;
      const o = this.renderEdge(i, r, [...e]);
      for (let s = 0; s < r.length - 1; s++) e.push([r[s], r[s + 1]]);
      return o;
    });
    return S`
      <svg
        class="main ${this._pendingLink ? "linking" : ""}"
        @pointerdown=${(i) => {
      const r = i.target;
      !r.closest("[data-node-id]") && !r.closest("[data-edge-id]") && this.emit("selection-cleared");
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${t.map(
      (i) => k`
              <marker id="arrow-${this.markerId(i)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${i}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${n}
          ${this.scene.nodes.map((i) => this.renderNode(i))}
          ${this.renderPendingLink()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
D.styles = Re`
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
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }
    svg.main.linking {
      cursor: crosshair;
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
z([
  at({ attribute: !1 })
], D.prototype, "scene", 2);
z([
  at({ attribute: !1 })
], D.prototype, "selectedId", 2);
z([
  at({ type: Boolean })
], D.prototype, "connectable", 2);
z([
  at({ attribute: !1 })
], D.prototype, "edgePoints", 2);
z([
  E()
], D.prototype, "_t", 2);
z([
  E()
], D.prototype, "_dragPos", 2);
z([
  E()
], D.prototype, "_pendingLink", 2);
z([
  E()
], D.prototype, "_hoverNodeId", 2);
z([
  E()
], D.prototype, "_editingId", 2);
z([
  E()
], D.prototype, "_spaceDown", 2);
z([
  E()
], D.prototype, "_wpDrag", 2);
D = z([
  Le("modux-canvas")
], D);
async function Ca(t, e) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), i = new n(), o = {
    id: "root",
    layoutOptions: e === "layered" ? {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.spacing.nodeNode": "45",
      "elk.layered.spacing.nodeNodeBetweenLayers": "90"
    } : {
      "elk.algorithm": "force",
      "elk.spacing.nodeNode": "70",
      "elk.force.iterations": "400"
    },
    children: t.nodes.map((l) => ({ id: l.id, width: l.w, height: l.h })),
    edges: t.edges.map((l) => ({ id: l.id, sources: [l.sourceId], targets: [l.targetId] }))
  }, s = await i.layout(o), a = {};
  for (const l of s.children ?? [])
    a[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return a;
}
var Ra = Object.defineProperty, Ma = Object.getOwnPropertyDescriptor, N = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Ma(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, n, r) : s(r)) || r);
  return i && r && Ra(e, n, r), r;
};
const Oa = [
  "PARTNERSHIP",
  "SHARED_KERNEL",
  "CUSTOMER_SUPPLIER",
  "CONFORMIST",
  "OPEN_HOST_SERVICE",
  "ANTI_CORRUPTION_LAYER",
  "PUBLISHED_LANGUAGE",
  "SEPARATE_WAYS"
], La = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 }
], Da = ["CORE", "SUPPORTING", "GENERIC"], kt = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Ua(t, e) {
  switch (e) {
    case "module":
      return { elementType: "module", id: t.replace(/^tgt:/, "") };
    case "aggregate":
      return { elementType: "aggregate", id: t };
    case "entity":
      return { elementType: "entity", id: t };
    case "flow":
      return { elementType: "flow", id: t.replace(/^flow:/, "") };
    case "process":
      return { elementType: "process", id: t };
    default:
      return null;
  }
}
function za(t, e) {
  const n = (t ?? []).find((i) => i.steps.some((r) => r.id === e));
  return n ? { elementType: "process", id: n.id } : null;
}
let A = class extends ft {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "";
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  command(t, e = !0) {
    if (e) {
      const n = this.inverseOf(t);
      n && this.pushUndoEntry(n);
    }
    this.emit("modux-command", { command: t });
  }
  viewLayout(t) {
    return si(this.layout[t]);
  }
  writeViewLayout(t, e) {
    this.layout = { ...this.layout, [t]: e }, this.emit("layout-changed", { layout: this.layout });
  }
  pushUndoEntry(t) {
    this._undoStack = [...this._undoStack.slice(-19), t], this._redoStack = [];
  }
  /** Inverses of an operation list, computed against the current state, in reverse order. */
  inversesOf(t) {
    return [...t].reverse().flatMap((e) => e.kind === "move-node" ? [
      {
        kind: "move-node",
        view: e.view,
        id: e.id,
        pos: this.viewLayout(e.view).nodes[e.id] ?? null
      }
    ] : e.kind === "set-edge-points" ? [
      {
        kind: "set-edge-points",
        view: e.view,
        id: e.id,
        points: this.viewLayout(e.view).edges[e.id] ?? null
      }
    ] : this.inverseOf(e) ?? []);
  }
  applyOps(t) {
    for (const e of t)
      if (e.kind === "move-node") {
        const n = this.viewLayout(e.view), i = { ...n.nodes };
        e.pos ? i[e.id] = e.pos : delete i[e.id], this.writeViewLayout(e.view, { ...n, nodes: i });
      } else if (e.kind === "set-edge-points") {
        const n = this.viewLayout(e.view), i = { ...n.edges };
        e.points && e.points.length ? i[e.id] = e.points : delete i[e.id], this.writeViewLayout(e.view, { ...n, edges: i });
      } else
        this.command(e, !1);
  }
  /**
   * Inverse commands computed against the CURRENT model (before the command is
   * applied) — what Ctrl+Z replays. Composite where needed (e.g. removing a
   * module also drops its relations, so its inverse restores them).
   */
  inverseOf(t) {
    switch (t.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
      case "remove-relation": {
        const e = this.model.relations.find(
          (n) => n.sourceId === t.sourceId && n.targetId === t.targetId
        );
        return e ? [{ kind: "add-relation", sourceId: e.sourceId, targetId: e.targetId, type: e.type }] : null;
      }
      case "add-module":
        return [{ kind: "remove-module", id: t.id }];
      case "remove-module": {
        const e = this.model.modules.find((i) => i.id === t.id);
        if (!e) return null;
        const n = this.model.relations.filter(
          (i) => i.sourceId === t.id || i.targetId === t.id
        );
        return [
          { kind: "add-module", id: e.id, name: e.name, subdomainType: e.subdomainType ?? "GENERIC" },
          ...n.map(
            (i) => ({
              kind: "add-relation",
              sourceId: i.sourceId,
              targetId: i.targetId,
              type: i.type
            })
          )
        ];
      }
      case "add-aggregate":
        return [{ kind: "remove-aggregate", id: t.id }];
      case "remove-aggregate": {
        const e = (this.model.aggregates ?? []).find((n) => n.id === t.id);
        return e ? [{ kind: "add-aggregate", id: e.id, name: e.name, moduleId: e.moduleId }] : null;
      }
      case "rename-element": {
        const n = (t.type === "module" ? this.model.modules : t.type === "aggregate" ? this.model.aggregates ?? [] : this.model.entities ?? []).find((i) => i.id === t.id);
        return n ? [{ kind: "rename-element", type: t.type, id: t.id, name: n.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: t.id }];
      case "remove-flow": {
        const e = this.model.flows.find((n) => n.id === t.id);
        return e ? [
          {
            kind: "add-flow",
            id: e.id,
            name: e.name,
            archetype: e.archetype,
            triggerAggregateId: e.triggerAggregateId ?? "",
            triggerEvent: e.triggerEvent ?? "",
            targetId: e.targetId,
            readModelName: e.readModelName,
            targetUseCaseId: e.targetUseCaseId
          }
        ] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: t.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
      case "remove-process-step": {
        const e = (this.model.processes ?? []).find((r) => r.id === t.processId), n = (e == null ? void 0 : e.steps.findIndex((r) => r.id === t.id)) ?? -1;
        if (!e || n < 0) return null;
        const i = e.steps[n];
        return [
          {
            kind: "add-process-step",
            processId: t.processId,
            id: i.id,
            name: i.name,
            stepType: i.type,
            roleId: i.roleId,
            deadline: i.deadline,
            useCaseId: i.useCaseId,
            compensationUseCaseId: i.compensationUseCaseId,
            afterStepId: n > 0 ? e.steps[n - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const e = (this.model.processes ?? []).find((i) => i.id === t.processId), n = (e == null ? void 0 : e.steps.findIndex((i) => i.id === t.id)) ?? -1;
        return !e || n < 0 ? null : [
          {
            kind: "move-process-step",
            processId: t.processId,
            id: t.id,
            afterStepId: n > 0 ? e.steps[n - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const e = (this.model.processes ?? []).find((i) => i.id === t.processId), n = e == null ? void 0 : e.steps.find((i) => i.id === t.id);
        return n ? [
          {
            kind: "update-process-step",
            processId: t.processId,
            id: t.id,
            roleId: n.roleId,
            deadline: n.deadline,
            compensationUseCaseId: n.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const e = (this.model.processes ?? []).find((n) => n.id === t.id);
        return e ? [
          {
            kind: "add-process",
            id: e.id,
            name: e.name,
            moduleId: e.ownerModuleId ?? "",
            triggerAggregateId: e.triggerAggregateId,
            triggerEvent: e.triggerEvent,
            steps: e.steps
          }
        ] : null;
      }
    }
    return null;
  }
  /** Discard undo/redo — called by the host when the model changed externally. */
  clearHistory() {
    this._undoStack = [], this._redoStack = [];
  }
  undo() {
    const t = this._undoStack[this._undoStack.length - 1];
    t && (this._undoStack = this._undoStack.slice(0, -1), this._redoStack = [...this._redoStack.slice(-19), this.inversesOf(t)], this.applyOps(t));
  }
  redo() {
    const t = this._redoStack[this._redoStack.length - 1];
    t && (this._redoStack = this._redoStack.slice(0, -1), this._undoStack = [...this._undoStack.slice(-19), this.inversesOf(t)], this.applyOps(t));
  }
  onNodeMoved(t) {
    const { id: e, x: n, y: i } = t.detail, r = this._view, o = this.viewLayout(r), s = o.nodes[e] ?? null;
    this.writeViewLayout(r, { ...o, nodes: { ...o.nodes, [e]: { x: n, y: i } } });
    const a = [{ kind: "move-node", view: r, id: e, pos: s }];
    if (r === "processes") {
      const l = this.stepReorderCommand(e);
      if (l) {
        const c = this.inverseOf(l);
        c && a.unshift(...c), this.command(l, !1);
      }
    }
    this.pushUndoEntry(a);
  }
  onEdgePointsChanged(t) {
    const { id: e, points: n } = t.detail, i = this._view, r = this.viewLayout(i);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: i, id: e, points: r.edges[e] ?? null }
    ]);
    const o = { ...r.edges };
    n.length ? o[e] = n : delete o[e], this.writeViewLayout(i, { ...r, edges: o });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(t) {
    const e = this.owningProcessOf(t);
    if (!e) return null;
    const n = Ge(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((s) => [s.id, s.x])), r = [...e.steps].sort(
      (s, a) => (i.get(s.id) ?? 0) - (i.get(a.id) ?? 0)
    );
    if (r.every((s, a) => s.id === e.steps[a].id)) return null;
    const o = r.findIndex((s) => s.id === t);
    return {
      kind: "move-process-step",
      processId: e.id,
      id: t,
      afterStepId: o > 0 ? r[o - 1].id : void 0
    };
  }
  onConnectRequested(t) {
    const { sourceId: e, targetId: n } = t.detail;
    if (this._view === "context-map") {
      const i = new Set(this.model.externalSystems.map((o) => o.id));
      if (i.has(e) || i.has(n) || this.model.relations.some(
        (o) => o.sourceId === e && o.targetId === n || o.sourceId === n && o.targetId === e
      )) return;
      this.command({ kind: "add-relation", sourceId: e, targetId: n, type: this._relationType });
    }
  }
  onDeleteRequested(t) {
    const { elementType: e, id: n, kind: i } = t.detail;
    if (this._view === "context-map" && e === "edge" && i === "relation") {
      const r = /^rel:(.+)->(.+)$/.exec(n);
      if (!r) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: r[1], targetId: r[2] });
      return;
    }
    if (e === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((o) => o.moduleId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: n });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((o) => o.aggregateId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate", id: n });
      return;
    }
    if (e === "node" && i === "flow") {
      this._selectedId = null, this.command({ kind: "remove-flow", id: n.replace(/^flow:/, "") });
      return;
    }
    if (e === "node" && i === "process") {
      this._selectedId = null, this.command({ kind: "remove-process", id: n });
      return;
    }
    if (e === "node" && i === "process-step") {
      const r = this.owningProcessOf(n);
      if (!r) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: r.id, id: n });
    }
  }
  owningProcessOf(t) {
    return (this.model.processes ?? []).find((e) => e.steps.some((n) => n.id === t));
  }
  onNodeRenamed(t) {
    const { id: e, kind: n, name: i } = t.detail;
    (n === "module" || n === "aggregate" || n === "entity" || n === "process-step") && this.command({ kind: "rename-element", type: n, id: e.replace(/^tgt:/, ""), name: i });
  }
  addStepFromToolbar() {
    const t = this._newStepName.trim();
    if (!t || !this._selectedId) return;
    const e = (this.model.processes ?? []).find((r) => r.id === this._selectedId), n = e ?? this.owningProcessOf(this._selectedId);
    if (!n) return;
    const i = e ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: n.id,
      id: `step-${kt(t)}`,
      name: t,
      stepType: this._newStepType,
      roleId: this._newStepType === "HUMAN" && this._newStepRole.trim() || void 0,
      deadline: this._newStepType === "HUMAN" && this._newStepDeadline.trim() || void 0,
      afterStepId: i
    }), this._newStepName = "", this._newStepDeadline = "";
  }
  onElementSelected(t) {
    var e;
    if (this._selectedId = t.detail.id, t.detail.kind === "process-step") {
      const n = (e = this.owningProcessOf(t.detail.id)) == null ? void 0 : e.steps.find((i) => i.id === t.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    this.emit("modux-select", { elementType: t.detail.kind, id: t.detail.id });
  }
  applyStepEdit() {
    const t = this._selectedId, e = t ? this.owningProcessOf(t) : void 0;
    !t || !e || this.command({
      kind: "update-process-step",
      processId: e.id,
      id: t,
      roleId: this._editStepRole.trim() || void 0,
      deadline: this._editStepDeadline.trim() || void 0,
      compensationUseCaseId: this._editStepComp.trim() || void 0
    });
  }
  onElementActivated(t) {
    const e = t.detail.kind === "process-step" ? za(this.model.processes, t.detail.id) : Ua(t.detail.id, t.detail.kind);
    e && this.emit("modux-activate", e);
  }
  createElementFromToolbar() {
    var e, n, i, r, o, s, a;
    const t = this._newName.trim();
    if (t) {
      if (this._view === "context-map")
        this.command({
          kind: "add-module",
          id: `mod-${kt(t)}`,
          name: t,
          subdomainType: this._newSubdomain
        });
      else if (this._view === "aggregates") {
        const l = this._newModuleId || ((e = this.model.modules[0]) == null ? void 0 : e.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${kt(t)}`, name: t, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id), c = this._newTargetId || ((r = this.model.modules[0]) == null ? void 0 : r.id), d = this._newTriggerEvent.trim();
        if (!l || !c || !d) return;
        this.command({
          kind: "add-flow",
          id: `flow-${kt(t)}`,
          name: t,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: d,
          targetId: c
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newModuleId || ((o = this.model.modules[0]) == null ? void 0 : o.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${kt(t)}`,
          name: t,
          moduleId: l,
          triggerAggregateId: this._newTriggerAggId || ((a = (s = this.model.aggregates) == null ? void 0 : s[0]) == null ? void 0 : a.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(t) {
    const e = this.viewLayout(t).nodes;
    return t === "aggregates" ? wi(this.model, e) : t === "flows" ? Ai(this.model, e) : t === "processes" ? Ge(this.model, e) : hi(this.model, e);
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var o;
    const t = this._view, e = this.sceneFor(t);
    if (!e.nodes.length) return;
    const i = await Ca(e, t === "flows" || t === "processes" ? "layered" : "force"), r = this.viewLayout(t);
    this.pushUndoEntry([
      ...e.nodes.map((s) => ({
        kind: "move-node",
        view: t,
        id: s.id,
        pos: r.nodes[s.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(r.edges).map((s) => ({
        kind: "set-edge-points",
        view: t,
        id: s,
        points: r.edges[s]
      }))
    ]), this.writeViewLayout(t, { nodes: i, edges: {} }), await this.updateComplete, (o = this.renderRoot.querySelector("modux-canvas")) == null || o.fit();
  }
  render() {
    const t = this.sceneFor(this._view);
    return S`
      <div class="toolbar">
        <div class="tabs">
          ${La.map(
      (e) => S`
              <button
                class="tab"
                ?data-active=${this._view === e.id}
                ?disabled=${!e.ready}
                title=${e.ready ? "" : "Próximamente"}
                @click=${() => this._view = e.id}
              >
                ${e.label}
              </button>
            `
    )}
        </div>
        <div class="spacer"></div>
        <input
          class="new-name"
          placeholder=${{
      "context-map": "Nuevo contexto…",
      aggregates: "Nuevo agregado…",
      flows: "Nuevo flow…",
      processes: "Nuevo proceso…"
    }[this._view]}
          .value=${this._newName}
          @input=${(e) => this._newName = e.target.value}
          @keydown=${(e) => e.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "context-map" ? S`<select
              title="Subdominio del nuevo contexto"
              @change=${(e) => this._newSubdomain = e.target.value}
            >
              ${Da.map(
      (e) => S`<option value=${e} ?selected=${e === this._newSubdomain}>${e}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" ? S`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(e) => this._newModuleId = e.target.value}
            >
              ${this.model.modules.map(
      (e) => {
        var n;
        return S`<option
                    value=${e.id}
                    ?selected=${e.id === (this._newModuleId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                  >
                    ${e.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? S`
              ${this._view === "flows" ? S`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(e) => this._newArchetype = e.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (e) => S`<option value=${e} ?selected=${e === this._newArchetype}>${e}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(e) => this._newTriggerAggId = e.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (e) => {
        var n, i;
        return S`<option
                      value=${e.id}
                      ?selected=${e.id === (this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
                    >
                      ${e.name}
                    </option>`;
      }
    )}
              </select>
              <input
                class="new-name evt"
                placeholder="Evento trigger…"
                .value=${this._newTriggerEvent}
                @input=${(e) => this._newTriggerEvent = e.target.value}
                @keydown=${(e) => e.key === "Enter" && this.createElementFromToolbar()}
              />
              ${this._view === "flows" ? S`<select
                    title="Destino del nuevo flow"
                    @change=${(e) => this._newTargetId = e.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (e) => {
        var n;
        return S`<option
                          value=${e.id}
                          ?selected=${e.id === (this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                        >
                          ${e.name}
                        </option>`;
      }
    )}
                  </select>` : ""}
            ` : ""}
        <button class="tab" @click=${this.createElementFromToolbar}>＋ Crear</button>
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((e) => e.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? S`
              <span class="sep"></span>
              <input
                class="new-name evt"
                placeholder="Nuevo paso…"
                .value=${this._newStepName}
                @input=${(e) => this._newStepName = e.target.value}
                @keydown=${(e) => e.key === "Enter" && this.addStepFromToolbar()}
              />
              <select
                title="Tipo de paso"
                @change=${(e) => this._newStepType = e.target.value}
              >
                ${["AUTOMATED", "HUMAN"].map(
      (e) => S`<option value=${e} ?selected=${e === this._newStepType}>${e}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? S`<input
                      class="new-name evt"
                      placeholder="Rol…"
                      .value=${this._newStepRole}
                      @input=${(e) => this._newStepRole = e.target.value}
                    /><input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del nuevo paso"
                      .value=${this._newStepDeadline}
                      @input=${(e) => this._newStepDeadline = e.target.value}
                    />` : ""}
              <button class="tab" title="Añadir paso tras la selección" @click=${this.addStepFromToolbar}>
                ＋ Paso
              </button>
              ${this.owningProcessOf(this._selectedId) ? S`
                    <span class="sep"></span>
                    <input
                      class="new-name evt"
                      placeholder="Rol…"
                      title="Rol del paso seleccionado (HUMAN)"
                      .value=${this._editStepRole}
                      @input=${(e) => this._editStepRole = e.target.value}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del paso seleccionado"
                      .value=${this._editStepDeadline}
                      @input=${(e) => this._editStepDeadline = e.target.value}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Compensación…"
                      title="Use case de compensación del paso seleccionado"
                      .value=${this._editStepComp}
                      @input=${(e) => this._editStepComp = e.target.value}
                    />
                    <button class="tab" title="Aplicar cambios al paso" @click=${this.applyStepEdit}>
                      ✓ Aplicar
                    </button>
                  ` : ""}
            ` : ""}
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
        <label for="relation-type" ?hidden=${this._view !== "context-map"}>Nueva relación:</label>
        <select
          ?hidden=${this._view !== "context-map"}
          id="relation-type"
          .value=${this._relationType}
          @change=${(e) => this._relationType = e.target.value}
        >
          ${Oa.map(
      (e) => S`<option value=${e} ?selected=${e === this._relationType}>${e}</option>`
    )}
        </select>
        <button
          class="tab"
          title="Ajustar el diagrama a la ventana"
          @click=${() => {
      var e;
      return (e = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : e.fit();
    }}
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
      </div>
      <modux-canvas
        .scene=${t}
        .edgePoints=${this.viewLayout(this._view).edges}
        .selectedId=${this._selectedId}
        .connectable=${this._view === "context-map"}
        @node-moved=${this.onNodeMoved}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
        @node-renamed=${this.onNodeRenamed}
        @edge-points-changed=${this.onEdgePointsChanged}
        @undo-requested=${this.undo}
        @redo-requested=${this.redo}
        @element-selected=${this.onElementSelected}
        @element-activated=${this.onElementActivated}
        @selection-cleared=${() => {
      this._selectedId = null, this.emit("modux-select", null);
    }}
      ></modux-canvas>
      <div class="hint">
        ${this._view === "context-map" ? S`Arrastra para reordenar · asa azul → crear relación (${this._relationType}) · Supr
            borra la relación o el contexto vacío seleccionado · F2 renombra · doble click abre el
            CRUD · rueda para zoom` : S`Arrastra para reordenar · click para seleccionar · Supr borra (si está vacío) · F2
            renombra · doble click abre el CRUD · rueda para zoom`}
      </div>
    `;
  }
};
A.styles = Re`
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
    modux-canvas {
      flex: 1;
      min-height: 0;
    }
  `;
N([
  at({ attribute: !1 })
], A.prototype, "model", 2);
N([
  at({ attribute: !1 })
], A.prototype, "layout", 2);
N([
  E()
], A.prototype, "_view", 2);
N([
  E()
], A.prototype, "_relationType", 2);
N([
  E()
], A.prototype, "_selectedId", 2);
N([
  E()
], A.prototype, "_newName", 2);
N([
  E()
], A.prototype, "_newSubdomain", 2);
N([
  E()
], A.prototype, "_newModuleId", 2);
N([
  E()
], A.prototype, "_newArchetype", 2);
N([
  E()
], A.prototype, "_newTriggerAggId", 2);
N([
  E()
], A.prototype, "_newTriggerEvent", 2);
N([
  E()
], A.prototype, "_newTargetId", 2);
N([
  E()
], A.prototype, "_undoStack", 2);
N([
  E()
], A.prototype, "_redoStack", 2);
N([
  E()
], A.prototype, "_newStepName", 2);
N([
  E()
], A.prototype, "_newStepType", 2);
N([
  E()
], A.prototype, "_newStepRole", 2);
N([
  E()
], A.prototype, "_newStepDeadline", 2);
N([
  E()
], A.prototype, "_editStepRole", 2);
N([
  E()
], A.prototype, "_editStepDeadline", 2);
N([
  E()
], A.prototype, "_editStepComp", 2);
A = N([
  Le("modux-editor")
], A);
var Ha = Object.defineProperty, Va = Object.getOwnPropertyDescriptor, _t = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Va(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, n, r) : s(r)) || r);
  return i && r && Ha(e, n, r), r;
};
let nt = class extends ft {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._toast = null, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
      if (this._interacting = !1, this._pendingVersion) {
        const t = this._pendingVersion;
        this._pendingVersion = null, this.onVersionSignal(t);
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("pointerdown", this._onPointerDown, !0), window.addEventListener("pointerup", this._onPointerUp, !0), this.reload(), this.startLiveUpdates();
  }
  disconnectedCallback() {
    var t;
    window.clearTimeout(this._layoutTimer), window.clearInterval(this._pollTimer), (t = this._sse) == null || t.close(), this.removeEventListener("pointerdown", this._onPointerDown, !0), window.removeEventListener("pointerup", this._onPointerUp, !0), super.disconnectedCallback();
  }
  /**
   * Live refresh: the server pushes the store fingerprint over SSE; when it
   * changes, the model is refetched — covering edits from the Mateu CRUDs, MCP
   * or another editor instance. Falls back to 4s polling when SSE is not
   * available. Signals are deferred while the user is mid-gesture or a command
   * is in flight.
   */
  startLiveUpdates() {
    try {
      this._sse = new EventSource(`${this.base}/events`), this._sse.addEventListener(
        "version",
        (t) => void this.onVersionSignal(t.data)
      ), this._sse.onerror = () => {
        var t;
        (t = this._sse) == null || t.close(), this._sse = void 0, this._pollTimer || (this._pollTimer = window.setInterval(() => void this.pollVersion(), 4e3));
      };
    } catch {
      this._pollTimer = window.setInterval(() => void this.pollVersion(), 4e3);
    }
  }
  async pollVersion() {
    try {
      const t = await fetch(`${this.base}/version`);
      if (!t.ok) return;
      await this.onVersionSignal((await t.json()).version);
    } catch {
    }
  }
  async onVersionSignal(t) {
    var n;
    if (!this._model) return;
    if (this._saving || this._interacting) {
      this._pendingVersion = t;
      return;
    }
    const e = this._lastVersion !== null && t !== this._lastVersion;
    this._lastVersion = t, e && (await this.reload(), (n = this.renderRoot.querySelector("modux-editor")) == null || n.clearHistory(), this.showToast(
      "El modelo ha cambiado fuera de este editor: recargado (historial de deshacer reiniciado)",
      "info"
    ));
  }
  async reload() {
    try {
      const [t, e, n] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/layout`),
        fetch(`${this.base}/version`)
      ]);
      if (!t.ok) throw new Error(`GET ${this.base}/model → ${t.status}`);
      this._model = await t.json(), this._layout = e.ok ? await e.json() : {}, n.ok && (this._lastVersion = (await n.json()).version), this._error = null;
    } catch (t) {
      this._error = String(t);
    }
  }
  showToast(t, e = "error") {
    this._toast = { message: t, kind: e }, window.clearTimeout(this._toastTimer), this._toastTimer = window.setTimeout(() => this._toast = null, 5e3);
  }
  async onCommand(t) {
    const { command: e } = t.detail;
    this._saving = !0;
    try {
      const n = await fetch(`${this.base}/commands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e)
      });
      if (!n.ok) {
        let o = `El servidor rechazó el comando (${n.status})`;
        try {
          const s = await n.json();
          s != null && s.message && (o = s.message);
        } catch {
        }
        this.showToast(o);
        return;
      }
      const [i, r] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/version`)
      ]);
      i.ok && (this._model = await i.json()), r.ok && (this._lastVersion = (await r.json()).version);
    } catch (n) {
      this.showToast(String(n));
    } finally {
      if (this._saving = !1, this._pendingVersion) {
        const n = this._pendingVersion;
        this._pendingVersion = null, this.onVersionSignal(n);
      }
    }
  }
  onLayoutChanged(t) {
    this._layout = t.detail.layout, window.clearTimeout(this._layoutTimer), this._layoutTimer = window.setTimeout(() => {
      fetch(`${this.base}/layout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this._layout)
      });
    }, 600);
  }
  render() {
    return this._error ? S`<div class="status error">modux editor: ${this._error}</div>` : this._model ? S`
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? S`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : S`<div class="status">Cargando el modelo…</div>`;
  }
};
nt.styles = Re`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 480px;
    }
    modux-editor {
      width: 100%;
      height: 100%;
    }
    .status {
      font-family: ui-sans-serif, system-ui, sans-serif;
      font-size: 13px;
      color: #64748b;
      padding: 24px;
    }
    .status.error {
      color: #b91c1c;
    }
    :host {
      position: relative;
    }
    .toast {
      position: absolute;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 80%;
      background: #7f1d1d;
      color: #fef2f2;
      font: 13px ui-sans-serif, system-ui, sans-serif;
      padding: 10px 16px;
      border-radius: 8px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      z-index: 10;
    }
    .toast.info {
      background: #1e3a8a;
      color: #eff6ff;
    }
  `;
_t([
  at()
], nt.prototype, "base", 2);
_t([
  E()
], nt.prototype, "_model", 2);
_t([
  E()
], nt.prototype, "_layout", 2);
_t([
  E()
], nt.prototype, "_error", 2);
_t([
  E()
], nt.prototype, "_saving", 2);
_t([
  E()
], nt.prototype, "_toast", 2);
nt = _t([
  Le("modux-editor-connected")
], nt);
export {
  D as ModuxCanvas,
  A as ModuxEditor,
  nt as ModuxEditorConnected,
  wi as aggregatesScene,
  hi as contextMapScene,
  di as flowCoherence,
  Ai as flowsScene,
  si as normalizeViewLayout,
  Ge as processesScene,
  ci as relationEdgeId
};
