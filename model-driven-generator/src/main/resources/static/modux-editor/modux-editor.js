const si = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, oi = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, ai = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Be = 168, Xe = 56;
function li(t, e) {
  return `rel:${t}->${e}`;
}
function ci(t, e) {
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
function di(t, e) {
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
    const c = s.ref, u = c.subdomainType ?? "GENERIC";
    return {
      id: c.id,
      label: c.name,
      x: l.x,
      y: l.y,
      w: Be,
      h: Xe,
      kind: "module",
      symbol: "component",
      fill: si[u],
      stroke: "#94a3b8",
      badge: u,
      tooltip: `${c.name} — subdominio ${u}`
    };
  }), r = t.relations.map((s) => ({
    id: li(s.sourceId, s.targetId),
    sourceId: s.sourceId,
    targetId: s.targetId,
    kind: "relation",
    label: oi[s.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${s.type} (${s.sourceId} upstream → ${s.targetId} downstream)`
  })), o = t.flows.map((s) => {
    const a = ci(t, s);
    return {
      id: `flow:${s.id}`,
      sourceId: s.sourceId,
      targetId: s.targetId,
      kind: "flow",
      label: s.name,
      color: ai[a],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${s.name} [${s.archetype}] — ${a}`
    };
  });
  return { nodes: i, edges: [...r, ...o] };
}
const hi = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, fi = 176, pi = 60, gi = 140, mi = 40;
function _i(t) {
  const e = {}, n = t.aggregates ?? [], i = t.entities ?? [];
  return t.modules.forEach((r, o) => {
    const s = 220 + o * 340;
    n.filter((l) => l.moduleId === r.id).forEach((l, c) => {
      const u = i.filter((f) => f.aggregateId === l.id).length, h = 140 + c * (170 + u * 60);
      e[l.id] = { x: s, y: h }, i.filter((f) => f.aggregateId === l.id).forEach((f, g) => {
        e[f.id] = { x: s + 60, y: h + 100 + g * 60 };
      });
    });
  }), n.filter((r) => !t.modules.some((o) => o.id === r.moduleId)).forEach((r, o) => {
    e[r.id] = { x: 220 + o * 340, y: 640 };
  }), e;
}
function yi(t, e) {
  const n = _i(t), i = (c) => e[c] ?? n[c] ?? { x: 200, y: 200 }, r = new Map(t.modules.map((c) => [c.id, c])), o = (t.aggregates ?? []).map((c) => {
    const u = r.get(c.moduleId), h = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", f = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: f.x,
      y: f.y,
      w: fi,
      h: pi,
      kind: "aggregate",
      symbol: "aggregate",
      fill: hi[h],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${u ? ` — módulo ${u.name} (${h})` : ""}`
    };
  }), s = (t.entities ?? []).map((c) => {
    const u = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
      w: gi,
      h: mi,
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
  })), l = (t.aggregateReferences ?? []).map((c, u) => ({
    id: `aggref:${u}:${c.sourceAggregateId}->${c.targetAggregateId}`,
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
}, wi = 150, xi = 44, $i = 190, bi = 56, Ei = 160, Ii = 48;
function Si(t, e) {
  const n = t.externalSystems.find((r) => r.id === e.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = t.modules.find((r) => r.id === e.targetId);
  return { id: e.targetId, label: (i == null ? void 0 : i.name) ?? e.targetId, external: !1 };
}
function Ai(t, e) {
  const n = t.flows, i = [], r = [], o = /* @__PURE__ */ new Set(), s = (a) => {
    var l, c;
    return ((c = (l = t.aggregates) == null ? void 0 : l.find((u) => u.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return n.forEach((a, l) => {
    const c = 120 + l * 130, u = vi[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const T = e[h] ?? { x: 160, y: c };
      i.push({
        id: h,
        label: a.triggerAggregateId ? s(a.triggerAggregateId) : h,
        x: T.x,
        y: T.y,
        w: wi,
        h: xi,
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
      w: $i,
      h: bi,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const v = Si(t, a), b = `tgt:${v.id}`;
    if (!o.has(b)) {
      o.add(b);
      const T = e[b] ?? { x: 790, y: c };
      i.push({
        id: b,
        label: v.label,
        x: T.x,
        y: T.y,
        w: Ei,
        h: Ii,
        kind: v.external ? "external-system" : "module",
        symbol: "component",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "MODULE"
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
      color: u,
      arrow: !0
    });
  }), { nodes: i, edges: r };
}
const ki = 190, Ti = 56, pe = 170, Ni = 52;
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
      w: ki,
      h: Ti,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${r(o.ownerModuleId) ? ` — módulo ${r(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((u, h) => {
      const f = u.type === "HUMAN", g = e[u.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (n.push({
        id: u.id,
        label: u.name,
        x: g.x,
        y: g.y,
        w: pe,
        h: Ni,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), i.push({
        id: `pe:${o.id}:${h}`,
        sourceId: c,
        targetId: u.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const v = `comp:${u.id}`, b = e[v] ?? { x: g.x, y: g.y + 90 };
        n.push({
          id: v,
          label: u.compensationUseCaseId,
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
          id: `pc:${u.id}`,
          sourceId: u.id,
          targetId: v,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = u.id;
    }), o.onCompletionEventName) {
      const u = `done:${o.id}`, h = e[u] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      n.push({
        id: u,
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
        targetId: u,
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
const Zt = globalThis, Ce = Zt.ShadowRoot && (Zt.ShadyCSS === void 0 || Zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Re = Symbol(), Ye = /* @__PURE__ */ new WeakMap();
let In = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== Re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Ce && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Ye.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ye.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ci = (t) => new In(typeof t == "string" ? t : t + "", void 0, Re), Pe = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, r, o) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[o + 1], t[0]);
  return new In(n, t, Re);
}, Ri = (t, e) => {
  if (Ce) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), r = Zt.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = n.cssText, t.appendChild(i);
  }
}, We = Ce ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return Ci(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pi, defineProperty: Mi, getOwnPropertyDescriptor: Oi, getOwnPropertyNames: Li, getOwnPropertySymbols: Ui, getPrototypeOf: Di } = Object, ot = globalThis, Ke = ot.trustedTypes, zi = Ke ? Ke.emptyScript : "", ge = ot.reactiveElementPolyfillSupport, Nt = (t, e) => t, ee = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? zi : null;
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
} }, Me = (t, e) => !Pi(t, e), Ze = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: Me };
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
      r !== void 0 && Mi(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: r, set: o } = Oi(this.prototype, e) ?? { get() {
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
    const e = Di(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Nt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Nt("properties"))) {
      const n = this.properties, i = [...Li(n), ...Ui(n)];
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
const Ct = globalThis, Je = (t) => t, ne = Ct.trustedTypes, Qe = ne ? ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Sn = "$lit$", st = `lit$${Math.random().toFixed(9).slice(2)}$`, An = "?" + st, Hi = `<${An}>`, pt = document, Pt = () => pt.createComment(""), Mt = (t) => t === null || typeof t != "object" && typeof t != "function", Oe = Array.isArray, Vi = (t) => Oe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", me = `[ 	
\f\r]`, Et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, je = /-->/g, tn = />/g, at = RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), en = /'/g, nn = /"/g, kn = /^(?:script|style|textarea|title)$/i, Tn = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), S = Tn(1), A = Tn(2), wt = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), rn = /* @__PURE__ */ new WeakMap(), ct = pt.createTreeWalker(pt, 129);
function Nn(t, e) {
  if (!Oe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Qe !== void 0 ? Qe.createHTML(e) : e;
}
const qi = (t, e) => {
  const n = t.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = Et;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let c, u, h = -1, f = 0;
    for (; f < l.length && (s.lastIndex = f, u = s.exec(l), u !== null); ) f = s.lastIndex, s === Et ? u[1] === "!--" ? s = je : u[1] !== void 0 ? s = tn : u[2] !== void 0 ? (kn.test(u[2]) && (r = RegExp("</" + u[2], "g")), s = at) : u[3] !== void 0 && (s = at) : s === at ? u[0] === ">" ? (s = r ?? Et, h = -1) : u[1] === void 0 ? h = -2 : (h = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? at : u[3] === '"' ? nn : en) : s === nn || s === en ? s = at : s === je || s === tn ? s = Et : (s = at, r = void 0);
    const g = s === at && t[a + 1].startsWith("/>") ? " " : "";
    o += s === Et ? l + Hi : h >= 0 ? (i.push(c), l.slice(0, h) + Sn + l.slice(h) + st + g) : l + st + (h === -2 ? a : g);
  }
  return [Nn(t, o + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Ot {
  constructor({ strings: e, _$litType$: n }, i) {
    let r;
    this.parts = [];
    let o = 0, s = 0;
    const a = e.length - 1, l = this.parts, [c, u] = qi(e, n);
    if (this.el = Ot.createElement(c, i), ct.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = ct.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(Sn)) {
          const f = u[s++], g = r.getAttribute(h).split(st), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: v[2], strings: g, ctor: v[1] === "." ? Bi : v[1] === "?" ? Xi : v[1] === "@" ? Gi : ce }), r.removeAttribute(h);
        } else h.startsWith(st) && (l.push({ type: 6, index: o }), r.removeAttribute(h));
        if (kn.test(r.tagName)) {
          const h = r.textContent.split(st), f = h.length - 1;
          if (f > 0) {
            r.textContent = ne ? ne.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(h[g], Pt()), ct.nextNode(), l.push({ type: 2, index: ++o });
            r.append(h[f], Pt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === An) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(st, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += st.length - 1;
      }
      o++;
    }
  }
  static createElement(e, n) {
    const i = pt.createElement("template");
    return i.innerHTML = e, i;
  }
}
function xt(t, e, n = t, i) {
  var s, a;
  if (e === wt) return e;
  let r = i !== void 0 ? (s = n._$Co) == null ? void 0 : s[i] : n._$Cl;
  const o = Mt(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), o === void 0 ? r = void 0 : (r = new o(t), r._$AT(t, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = r : n._$Cl = r), r !== void 0 && (e = xt(t, r._$AS(t, e.values), r, i)), e;
}
class Fi {
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
    const { el: { content: n }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? pt).importNode(n, !0);
    ct.currentNode = r;
    let o = ct.nextNode(), s = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new Ht(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new Yi(o, this, e)), this._$AV.push(c), l = i[++a];
      }
      s !== (l == null ? void 0 : l.index) && (o = ct.nextNode(), s++);
    }
    return ct.currentNode = pt, r;
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
    this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = xt(this, e, n), Mt(e) ? e === R || e == null || e === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : e !== this._$AH && e !== wt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Vi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== R && Mt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(pt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: n, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Ot.createElement(Nn(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(n);
    else {
      const s = new Fi(r, this), a = s.u(this.options);
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
    for (const o of e) r === n.length ? n.push(i = new Ht(this.O(Pt()), this.O(Pt()), this, this.options)) : i = n[r], i._$AI(o), r++;
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
    this.type = 1, this._$AH = R, this._$AN = void 0, this.element = e, this.name = n, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = R;
  }
  _$AI(e, n = this, i, r) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = xt(this, e, n, 0), s = !Mt(e) || e !== this._$AH && e !== wt, s && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = xt(this, a[i + l], n, l), c === wt && (c = this._$AH[l]), s || (s = !Mt(c) || c !== this._$AH[l]), c === R ? e = R : e !== R && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !r && this.j(e);
  }
  j(e) {
    e === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Bi extends ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === R ? void 0 : e;
  }
}
class Xi extends ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== R);
  }
}
class Gi extends ce {
  constructor(e, n, i, r, o) {
    super(e, n, i, r, o), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = xt(this, e, n, 0) ?? R) === wt) return;
    const i = this._$AH, r = e === R && i !== R || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== R && (i === R || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Yi {
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
const _e = Ct.litHtmlPolyfillSupport;
_e == null || _e(Ot, Ht), (Ct.litHtmlVersions ?? (Ct.litHtmlVersions = [])).push("3.3.3");
const Wi = (t, e, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = r = new Ht(e.insertBefore(Pt(), o), o, void 0, n ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis;
class ht extends yt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Wi(n, this.renderRoot, this.renderOptions);
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
    return wt;
  }
}
var En;
ht._$litElement$ = !0, ht.finalized = !0, (En = dt.litElementHydrateSupport) == null || En.call(dt, { LitElement: ht });
const ye = dt.litElementPolyfillSupport;
ye == null || ye({ LitElement: ht });
(dt.litElementVersions ?? (dt.litElementVersions = [])).push("4.2.2");
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
const Ki = { attribute: !0, type: String, converter: ee, reflect: !1, hasChanged: Me }, Zi = (t = Ki, e, n) => {
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
function mt(t) {
  return (e, n) => typeof n == "object" ? Zi(t, e, n) : ((i, r, o) => {
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
  return mt({ ...t, state: !0, attribute: !1 });
}
var $e = "http://www.w3.org/1999/xhtml";
const sn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: $e,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ue(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), sn.hasOwnProperty(e) ? { space: sn[e], local: t } : t;
}
function Ji(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === $e && e.documentElement.namespaceURI === $e ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Qi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Cn(t) {
  var e = ue(t);
  return (e.local ? Qi : Ji)(e);
}
function ji() {
}
function Ue(t) {
  return t == null ? ji : function() {
    return this.querySelector(t);
  };
}
function tr(t) {
  typeof t != "function" && (t = Ue(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = new Array(s), l, c, u = 0; u < s; ++u)
      (l = o[u]) && (c = t.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[u] = c);
  return new U(i, this._parents);
}
function er(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function nr() {
  return [];
}
function Rn(t) {
  return t == null ? nr : function() {
    return this.querySelectorAll(t);
  };
}
function ir(t) {
  return function() {
    return er(t.apply(this, arguments));
  };
}
function rr(t) {
  typeof t == "function" ? t = ir(t) : t = Rn(t);
  for (var e = this._groups, n = e.length, i = [], r = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (i.push(t.call(l, l.__data__, c, s)), r.push(l));
  return new U(i, r);
}
function Pn(t) {
  return function() {
    return this.matches(t);
  };
}
function Mn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var sr = Array.prototype.find;
function or(t) {
  return function() {
    return sr.call(this.children, t);
  };
}
function ar() {
  return this.firstElementChild;
}
function lr(t) {
  return this.select(t == null ? ar : or(typeof t == "function" ? t : Mn(t)));
}
var cr = Array.prototype.filter;
function ur() {
  return Array.from(this.children);
}
function dr(t) {
  return function() {
    return cr.call(this.children, t);
  };
}
function hr(t) {
  return this.selectAll(t == null ? ur : dr(typeof t == "function" ? t : Mn(t)));
}
function fr(t) {
  typeof t != "function" && (t = Pn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new U(i, this._parents);
}
function On(t) {
  return new Array(t.length);
}
function pr() {
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
function gr(t) {
  return function() {
    return t;
  };
}
function mr(t, e, n, i, r, o) {
  for (var s = 0, a, l = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = o[s], i[s] = a) : n[s] = new ie(t, o[s]);
  for (; s < l; ++s)
    (a = e[s]) && (r[s] = a);
}
function _r(t, e, n, i, r, o, s) {
  var a, l, c = /* @__PURE__ */ new Map(), u = e.length, h = o.length, f = new Array(u), g;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (f[a] = g = s.call(l, l.__data__, a, e) + "", c.has(g) ? r[a] = l : c.set(g, l));
  for (a = 0; a < h; ++a)
    g = s.call(t, o[a], a, o) + "", (l = c.get(g)) ? (i[a] = l, l.__data__ = o[a], c.delete(g)) : n[a] = new ie(t, o[a]);
  for (a = 0; a < u; ++a)
    (l = e[a]) && c.get(f[a]) === l && (r[a] = l);
}
function yr(t) {
  return t.__data__;
}
function vr(t, e) {
  if (!arguments.length) return Array.from(this, yr);
  var n = e ? _r : mr, i = this._parents, r = this._groups;
  typeof t != "function" && (t = gr(t));
  for (var o = r.length, s = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = i[c], h = r[c], f = h.length, g = wr(t.call(u, u && u.__data__, c, i)), v = g.length, b = a[c] = new Array(v), T = s[c] = new Array(v), y = l[c] = new Array(f);
    n(u, h, b, T, y, g, e);
    for (var M = 0, O = 0, X, z; M < v; ++M)
      if (X = b[M]) {
        for (M >= O && (O = M + 1); !(z = T[O]) && ++O < v; ) ;
        X._next = z || null;
      }
  }
  return s = new U(s, i), s._enter = a, s._exit = l, s;
}
function wr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function xr() {
  return new U(this._exit || this._groups.map(On), this._parents);
}
function $r(t, e, n) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? o.remove() : n(o), i && r ? i.merge(r).order() : r;
}
function br(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, o = i.length, s = Math.min(r, o), a = new Array(r), l = 0; l < s; ++l)
    for (var c = n[l], u = i[l], h = c.length, f = a[l] = new Array(h), g, v = 0; v < h; ++v)
      (g = c[v] || u[v]) && (f[v] = g);
  for (; l < r; ++l)
    a[l] = n[l];
  return new U(a, this._parents);
}
function Er() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, o = i[r], s; --r >= 0; )
      (s = i[r]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Ir(t) {
  t || (t = Sr);
  function e(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var s = n[o], a = s.length, l = r[o] = new Array(a), c, u = 0; u < a; ++u)
      (c = s[u]) && (l[u] = c);
    l.sort(e);
  }
  return new U(r, this._parents).order();
}
function Sr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ar() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function kr() {
  return Array.from(this);
}
function Tr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, o = i.length; r < o; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function Nr() {
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
function Pr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Mr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Or(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Lr(t, e) {
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
function Dr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function zr(t, e) {
  var n = ue(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Mr : Pr : typeof e == "function" ? n.local ? Dr : Ur : n.local ? Lr : Or)(n, e));
}
function Ln(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Hr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Vr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function qr(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Fr(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Hr : typeof e == "function" ? qr : Vr)(t, e, n ?? "")) : $t(this.node(), t);
}
function $t(t, e) {
  return t.style.getPropertyValue(e) || Ln(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Br(t) {
  return function() {
    delete this[t];
  };
}
function Xr(t, e) {
  return function() {
    this[t] = e;
  };
}
function Gr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Yr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Br : typeof e == "function" ? Gr : Xr)(t, e)) : this.node()[t];
}
function Un(t) {
  return t.trim().split(/^|\s+/);
}
function De(t) {
  return t.classList || new Dn(t);
}
function Dn(t) {
  this._node = t, this._names = Un(t.getAttribute("class") || "");
}
Dn.prototype = {
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
  for (var n = De(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Hn(t, e) {
  for (var n = De(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Wr(t) {
  return function() {
    zn(this, t);
  };
}
function Kr(t) {
  return function() {
    Hn(this, t);
  };
}
function Zr(t, e) {
  return function() {
    (e.apply(this, arguments) ? zn : Hn)(this, t);
  };
}
function Jr(t, e) {
  var n = Un(t + "");
  if (arguments.length < 2) {
    for (var i = De(this.node()), r = -1, o = n.length; ++r < o; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Zr : e ? Wr : Kr)(n, e));
}
function Qr() {
  this.textContent = "";
}
function jr(t) {
  return function() {
    this.textContent = t;
  };
}
function ts(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function es(t) {
  return arguments.length ? this.each(t == null ? Qr : (typeof t == "function" ? ts : jr)(t)) : this.node().textContent;
}
function ns() {
  this.innerHTML = "";
}
function is(t) {
  return function() {
    this.innerHTML = t;
  };
}
function rs(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ss(t) {
  return arguments.length ? this.each(t == null ? ns : (typeof t == "function" ? rs : is)(t)) : this.node().innerHTML;
}
function os() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function as() {
  return this.each(os);
}
function ls() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function cs() {
  return this.each(ls);
}
function us(t) {
  var e = typeof t == "function" ? t : Cn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ds() {
  return null;
}
function hs(t, e) {
  var n = typeof t == "function" ? t : Cn(t), i = e == null ? ds : typeof e == "function" ? e : Ue(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function fs() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ps() {
  return this.each(fs);
}
function gs() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ms() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function _s(t) {
  return this.select(t ? ms : gs);
}
function ys(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function vs(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ws(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function xs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, o; n < r; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++i] = o;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function $s(t, e, n) {
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
function bs(t, e, n) {
  var i = ws(t + ""), r, o = i.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, u; l < c; ++l)
        for (r = 0, u = a[l]; r < o; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = e ? $s : xs, r = 0; r < o; ++r) this.each(a(i[r], e, n));
  return this;
}
function Vn(t, e, n) {
  var i = Ln(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function Es(t, e) {
  return function() {
    return Vn(this, t, e);
  };
}
function Is(t, e) {
  return function() {
    return Vn(this, t, e.apply(this, arguments));
  };
}
function Ss(t, e) {
  return this.each((typeof e == "function" ? Is : Es)(t, e));
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
function ks() {
  return this;
}
U.prototype = Vt.prototype = {
  constructor: U,
  select: tr,
  selectAll: rr,
  selectChild: lr,
  selectChildren: hr,
  filter: fr,
  data: vr,
  enter: pr,
  exit: xr,
  join: $r,
  merge: br,
  selection: ks,
  order: Er,
  sort: Ir,
  call: Ar,
  nodes: kr,
  node: Tr,
  size: Nr,
  empty: Cr,
  each: Rr,
  attr: zr,
  style: Fr,
  property: Yr,
  classed: Jr,
  text: es,
  html: ss,
  raise: as,
  lower: cs,
  append: us,
  insert: hs,
  remove: ps,
  clone: _s,
  datum: ys,
  on: bs,
  dispatch: Ss,
  [Symbol.iterator]: As
};
function Y(t) {
  return typeof t == "string" ? new U([[document.querySelector(t)]], [document.documentElement]) : new U([[t]], qn);
}
function Ts(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function lt(t, e) {
  if (t = Ts(t), e === void 0 && (e = t.currentTarget), e) {
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
var Ns = { value: () => {
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
      t[i] = Ns, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const be = { capture: !0, passive: !1 };
function Ee(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ps(t) {
  var e = t.document.documentElement, n = Y(t).on("dragstart.drag", Ee, be);
  "onselectstart" in e ? n.on("selectstart.drag", Ee, be) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Ms(t, e) {
  var n = t.document.documentElement, i = Y(t).on("dragstart.drag", null);
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
var Lt = 0.7, re = 1 / Lt, vt = "\\s*([+-]?\\d+)\\s*", Ut = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", W = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Os = /^#([0-9a-f]{3,8})$/, Ls = new RegExp(`^rgb\\(${vt},${vt},${vt}\\)$`), Us = new RegExp(`^rgb\\(${W},${W},${W}\\)$`), Ds = new RegExp(`^rgba\\(${vt},${vt},${vt},${Ut}\\)$`), zs = new RegExp(`^rgba\\(${W},${W},${W},${Ut}\\)$`), Hs = new RegExp(`^hsl\\(${Ut},${W},${W}\\)$`), Vs = new RegExp(`^hsla\\(${Ut},${W},${W},${Ut}\\)$`), an = {
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
He(qt, Dt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ln,
  // Deprecated! Use color.formatHex.
  formatHex: ln,
  formatHex8: qs,
  formatHsl: Fs,
  formatRgb: cn,
  toString: cn
});
function ln() {
  return this.rgb().formatHex();
}
function qs() {
  return this.rgb().formatHex8();
}
function Fs() {
  return Bn(this).formatHsl();
}
function cn() {
  return this.rgb().formatRgb();
}
function Dt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Os.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? un(e) : n === 3 ? new L(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Gt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Gt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ls.exec(t)) ? new L(e[1], e[2], e[3], 1) : (e = Us.exec(t)) ? new L(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ds.exec(t)) ? Gt(e[1], e[2], e[3], e[4]) : (e = zs.exec(t)) ? Gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Hs.exec(t)) ? fn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Vs.exec(t)) ? fn(e[1], e[2] / 100, e[3] / 100, e[4]) : an.hasOwnProperty(t) ? un(an[t]) : t === "transparent" ? new L(NaN, NaN, NaN, 0) : null;
}
function un(t) {
  return new L(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Gt(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new L(t, e, n, i);
}
function Bs(t) {
  return t instanceof qt || (t = Dt(t)), t ? (t = t.rgb(), new L(t.r, t.g, t.b, t.opacity)) : new L();
}
function Ie(t, e, n, i) {
  return arguments.length === 1 ? Bs(t) : new L(t, e, n, i ?? 1);
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
    return new L(ft(this.r), ft(this.g), ft(this.b), se(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: dn,
  // Deprecated! Use color.formatHex.
  formatHex: dn,
  formatHex8: Xs,
  formatRgb: hn,
  toString: hn
}));
function dn() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}`;
}
function Xs() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}${ut((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function hn() {
  const t = se(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ft(this.r)}, ${ft(this.g)}, ${ft(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function se(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ft(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ut(t) {
  return t = ft(t), (t < 16 ? "0" : "") + t.toString(16);
}
function fn(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new F(t, e, n, i);
}
function Bn(t) {
  if (t instanceof F) return new F(t.h, t.s, t.l, t.opacity);
  if (t instanceof qt || (t = Dt(t)), !t) return new F();
  if (t instanceof F) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), o = Math.max(e, n, i), s = NaN, a = o - r, l = (o + r) / 2;
  return a ? (e === o ? s = (n - i) / a + (n < i) * 6 : n === o ? s = (i - e) / a + 2 : s = (e - n) / a + 4, a /= l < 0.5 ? o + r : 2 - o - r, s *= 60) : a = l > 0 && l < 1 ? 0 : s, new F(s, a, l, t.opacity);
}
function Gs(t, e, n, i) {
  return arguments.length === 1 ? Bn(t) : new F(t, e, n, i ?? 1);
}
function F(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
He(F, Gs, Fn(qt, {
  brighter(t) {
    return t = t == null ? re : Math.pow(re, t), new F(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Lt : Math.pow(Lt, t), new F(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new L(
      ve(t >= 240 ? t - 240 : t + 120, r, i),
      ve(t, r, i),
      ve(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new F(pn(this.h), Yt(this.s), Yt(this.l), se(this.opacity));
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
function ve(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Xn = (t) => () => t;
function Ys(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ws(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function Ks(t) {
  return (t = +t) == 1 ? Gn : function(e, n) {
    return n - e ? Ws(e, n, t) : Xn(isNaN(e) ? n : e);
  };
}
function Gn(t, e) {
  var n = e - t;
  return n ? Ys(t, n) : Xn(isNaN(t) ? e : t);
}
const gn = (function t(e) {
  var n = Ks(e);
  function i(r, o) {
    var s = n((r = Ie(r)).r, (o = Ie(o)).r), a = n(r.g, o.g), l = n(r.b, o.b), c = Gn(r.opacity, o.opacity);
    return function(u) {
      return r.r = s(u), r.g = a(u), r.b = l(u), r.opacity = c(u), r + "";
    };
  }
  return i.gamma = t, i;
})(1);
function rt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Se = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, we = new RegExp(Se.source, "g");
function Zs(t) {
  return function() {
    return t;
  };
}
function Js(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Qs(t, e) {
  var n = Se.lastIndex = we.lastIndex = 0, i, r, o, s = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (i = Se.exec(t)) && (r = we.exec(e)); )
    (o = r.index) > n && (o = e.slice(n, o), a[s] ? a[s] += o : a[++s] = o), (i = i[0]) === (r = r[0]) ? a[s] ? a[s] += r : a[++s] = r : (a[++s] = null, l.push({ i: s, x: rt(i, r) })), n = we.lastIndex;
  return n < e.length && (o = e.slice(n), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? l[0] ? Js(l[0].x) : Zs(e) : (e = l.length, function(c) {
    for (var u = 0, h; u < e; ++u) a[(h = l[u]).i] = h.x(c);
    return a.join("");
  });
}
var mn = 180 / Math.PI, Ae = {
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
function js(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ae : Yn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function to(t) {
  return t == null || (Wt || (Wt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Wt.setAttribute("transform", t), !(t = Wt.transform.baseVal.consolidate())) ? Ae : (t = t.matrix, Yn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Wn(t, e, n, i) {
  function r(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, h, f, g, v) {
    if (c !== h || u !== f) {
      var b = g.push("translate(", null, e, null, n);
      v.push({ i: b - 4, x: rt(c, h) }, { i: b - 2, x: rt(u, f) });
    } else (h || f) && g.push("translate(" + h + e + f + n);
  }
  function s(c, u, h, f) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), f.push({ i: h.push(r(h) + "rotate(", null, i) - 2, x: rt(c, u) })) : u && h.push(r(h) + "rotate(" + u + i);
  }
  function a(c, u, h, f) {
    c !== u ? f.push({ i: h.push(r(h) + "skewX(", null, i) - 2, x: rt(c, u) }) : u && h.push(r(h) + "skewX(" + u + i);
  }
  function l(c, u, h, f, g, v) {
    if (c !== h || u !== f) {
      var b = g.push(r(g) + "scale(", null, ",", null, ")");
      v.push({ i: b - 4, x: rt(c, h) }, { i: b - 2, x: rt(u, f) });
    } else (h !== 1 || f !== 1) && g.push(r(g) + "scale(" + h + "," + f + ")");
  }
  return function(c, u) {
    var h = [], f = [];
    return c = t(c), u = t(u), o(c.translateX, c.translateY, u.translateX, u.translateY, h, f), s(c.rotate, u.rotate, h, f), a(c.skewX, u.skewX, h, f), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, h, f), c = u = null, function(g) {
      for (var v = -1, b = f.length, T; ++v < b; ) h[(T = f[v]).i] = T.x(g);
      return h.join("");
    };
  };
}
var eo = Wn(js, "px, ", "px)", "deg)"), no = Wn(to, ", ", ")", ")"), io = 1e-12;
function _n(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function ro(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function so(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const oo = (function t(e, n, i) {
  function r(o, s) {
    var a = o[0], l = o[1], c = o[2], u = s[0], h = s[1], f = s[2], g = u - a, v = h - l, b = g * g + v * v, T, y;
    if (b < io)
      y = Math.log(f / c) / e, T = function(it) {
        return [
          a + it * g,
          l + it * v,
          c * Math.exp(e * it * y)
        ];
      };
    else {
      var M = Math.sqrt(b), O = (f * f - c * c + i * b) / (2 * c * n * M), X = (f * f - c * c - i * b) / (2 * f * n * M), z = Math.log(Math.sqrt(O * O + 1) - O), H = Math.log(Math.sqrt(X * X + 1) - X);
      y = (H - z) / e, T = function(it) {
        var Ft = it * y, Bt = _n(z), Xt = c / (n * M) * (Bt * so(e * Ft + z) - ro(z));
        return [
          a + Xt * g,
          l + Xt * v,
          c * Bt / _n(e * Ft + z)
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
var bt = 0, kt = 0, It = 0, Kn = 1e3, oe, Tt, ae = 0, gt = 0, de = 0, zt = typeof performance == "object" && performance.now ? performance : Date, Zn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ve() {
  return gt || (Zn(ao), gt = zt.now() + de);
}
function ao() {
  gt = 0;
}
function le() {
  this._call = this._time = this._next = null;
}
le.prototype = Jn.prototype = {
  constructor: le,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ve() : +n) + (e == null ? 0 : +e), !this._next && Tt !== this && (Tt ? Tt._next = this : oe = this, Tt = this), this._call = t, this._time = n, ke();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ke());
  }
};
function Jn(t, e, n) {
  var i = new le();
  return i.restart(t, e, n), i;
}
function lo() {
  Ve(), ++bt;
  for (var t = oe, e; t; )
    (e = gt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --bt;
}
function yn() {
  gt = (ae = zt.now()) + de, bt = kt = 0;
  try {
    lo();
  } finally {
    bt = 0, uo(), gt = 0;
  }
}
function co() {
  var t = zt.now(), e = t - ae;
  e > Kn && (de -= e, ae = t);
}
function uo() {
  for (var t, e = oe, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : oe = n);
  Tt = t, ke(i);
}
function ke(t) {
  if (!bt) {
    kt && (kt = clearTimeout(kt));
    var e = t - gt;
    e > 24 ? (t < 1 / 0 && (kt = setTimeout(yn, t - zt.now() - de)), It && (It = clearInterval(It))) : (It || (ae = zt.now(), It = setInterval(co, Kn)), bt = 1, Zn(yn));
  }
}
function vn(t, e, n) {
  var i = new le();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var ho = ze("start", "end", "cancel", "interrupt"), fo = [], Qn = 0, wn = 1, Te = 2, Qt = 3, xn = 4, Ne = 5, jt = 6;
function he(t, e, n, i, r, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  po(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: ho,
    tween: fo,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Qn
  });
}
function qe(t, e) {
  var n = B(t, e);
  if (n.state > Qn) throw new Error("too late; already scheduled");
  return n;
}
function K(t, e) {
  var n = B(t, e);
  if (n.state > Qt) throw new Error("too late; already running");
  return n;
}
function B(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function po(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = Jn(o, 0, n.time);
  function o(c) {
    n.state = wn, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var u, h, f, g;
    if (n.state !== wn) return l();
    for (u in i)
      if (g = i[u], g.name === n.name) {
        if (g.state === Qt) return vn(s);
        g.state === xn ? (g.state = jt, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete i[u]) : +u < e && (g.state = jt, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete i[u]);
      }
    if (vn(function() {
      n.state === Qt && (n.state = xn, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = Te, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Te) {
      for (n.state = Qt, r = new Array(f = n.tween.length), u = 0, h = -1; u < f; ++u)
        (g = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++h] = g);
      r.length = h + 1;
    }
  }
  function a(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = Ne, 1), h = -1, f = r.length; ++h < f; )
      r[h].call(t, u);
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
function go(t) {
  return this.each(function() {
    te(this, t);
  });
}
function mo(t, e) {
  var n, i;
  return function() {
    var r = K(this, t), o = r.tween;
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
function _o(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = K(this, t), s = o.tween;
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
function yo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = B(this.node(), n).tween, r = 0, o = i.length, s; r < o; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? mo : _o)(n, t, e));
}
function Fe(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = K(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return B(r, i).value[e];
  };
}
function jn(t, e) {
  var n;
  return (typeof e == "number" ? rt : e instanceof Dt ? gn : (n = Dt(e)) ? (e = n, gn) : Qs)(t, e);
}
function vo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function wo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function xo(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function $o(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function bo(t, e, n) {
  var i, r, o;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), l = a + "", s === l ? null : s === i && l === r ? o : (r = l, o = e(i = s, a)));
  };
}
function Eo(t, e, n) {
  var i, r, o;
  return function() {
    var s, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), l = a + "", s === l ? null : s === i && l === r ? o : (r = l, o = e(i = s, a)));
  };
}
function Io(t, e) {
  var n = ue(t), i = n === "transform" ? no : jn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Eo : bo)(n, i, Fe(this, "attr." + t, e)) : e == null ? (n.local ? wo : vo)(n) : (n.local ? $o : xo)(n, i, e));
}
function So(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Ao(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function ko(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && Ao(t, o)), n;
  }
  return r._value = e, r;
}
function To(t, e) {
  var n, i;
  function r() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && So(t, o)), n;
  }
  return r._value = e, r;
}
function No(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = ue(t);
  return this.tween(n, (i.local ? ko : To)(i, e));
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
function Po(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Co : Ro)(e, t)) : B(this.node(), e).delay;
}
function Mo(t, e) {
  return function() {
    K(this, t).duration = +e.apply(this, arguments);
  };
}
function Oo(t, e) {
  return e = +e, function() {
    K(this, t).duration = e;
  };
}
function Lo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Mo : Oo)(e, t)) : B(this.node(), e).duration;
}
function Uo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    K(this, t).ease = e;
  };
}
function Do(t) {
  var e = this._id;
  return arguments.length ? this.each(Uo(e, t)) : B(this.node(), e).ease;
}
function zo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    K(this, t).ease = n;
  };
}
function Ho(t) {
  if (typeof t != "function") throw new Error();
  return this.each(zo(this._id, t));
}
function Vo(t) {
  typeof t != "function" && (t = Pn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var o = e[r], s = o.length, a = i[r] = [], l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new et(i, this._parents, this._name, this._id);
}
function qo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, o = Math.min(i, r), s = new Array(i), a = 0; a < o; ++a)
    for (var l = e[a], c = n[a], u = l.length, h = s[a] = new Array(u), f, g = 0; g < u; ++g)
      (f = l[g] || c[g]) && (h[g] = f);
  for (; a < i; ++a)
    s[a] = e[a];
  return new et(s, this._parents, this._name, this._id);
}
function Fo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Bo(t, e, n) {
  var i, r, o = Fo(e) ? qe : K;
  return function() {
    var s = o(this, t), a = s.on;
    a !== i && (r = (i = a).copy()).on(e, n), s.on = r;
  };
}
function Xo(t, e) {
  var n = this._id;
  return arguments.length < 2 ? B(this.node(), n).on.on(t) : this.each(Bo(n, t, e));
}
function Go(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Yo() {
  return this.on("end.remove", Go(this._id));
}
function Wo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ue(t));
  for (var i = this._groups, r = i.length, o = new Array(r), s = 0; s < r; ++s)
    for (var a = i[s], l = a.length, c = o[s] = new Array(l), u, h, f = 0; f < l; ++f)
      (u = a[f]) && (h = t.call(u, u.__data__, f, a)) && ("__data__" in u && (h.__data__ = u.__data__), c[f] = h, he(c[f], e, n, f, c, B(u, n)));
  return new et(o, this._parents, e, n);
}
function Ko(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Rn(t));
  for (var i = this._groups, r = i.length, o = [], s = [], a = 0; a < r; ++a)
    for (var l = i[a], c = l.length, u, h = 0; h < c; ++h)
      if (u = l[h]) {
        for (var f = t.call(u, u.__data__, h, l), g, v = B(u, n), b = 0, T = f.length; b < T; ++b)
          (g = f[b]) && he(g, e, n, b, f, v);
        o.push(f), s.push(u);
      }
  return new et(o, s, e, n);
}
var Zo = Vt.prototype.constructor;
function Jo() {
  return new Zo(this._groups, this._parents);
}
function Qo(t, e) {
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
function jo(t, e, n) {
  var i, r = n + "", o;
  return function() {
    var s = $t(this, t);
    return s === r ? null : s === i ? o : o = e(i = s, n);
  };
}
function ta(t, e, n) {
  var i, r, o;
  return function() {
    var s = $t(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), $t(this, t))), s === l ? null : s === i && l === r ? o : (r = l, o = e(i = s, a));
  };
}
function ea(t, e) {
  var n, i, r, o = "style." + e, s = "end." + o, a;
  return function() {
    var l = K(this, t), c = l.on, u = l.value[o] == null ? a || (a = ti(e)) : void 0;
    (c !== n || r !== u) && (i = (n = c).copy()).on(s, r = u), l.on = i;
  };
}
function na(t, e, n) {
  var i = (t += "") == "transform" ? eo : jn;
  return e == null ? this.styleTween(t, Qo(t, i)).on("end.style." + t, ti(t)) : typeof e == "function" ? this.styleTween(t, ta(t, i, Fe(this, "style." + t, e))).each(ea(this._id, t)) : this.styleTween(t, jo(t, i, e), n).on("end.style." + t, null);
}
function ia(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function ra(t, e, n) {
  var i, r;
  function o() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && ia(t, s, n)), i;
  }
  return o._value = e, o;
}
function sa(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, ra(t, e, n ?? ""));
}
function oa(t) {
  return function() {
    this.textContent = t;
  };
}
function aa(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function la(t) {
  return this.tween("text", typeof t == "function" ? aa(Fe(this, "text", t)) : oa(t == null ? "" : t + ""));
}
function ca(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ua(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && ca(r)), e;
  }
  return i._value = t, i;
}
function da(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ua(t));
}
function ha() {
  for (var t = this._name, e = this._id, n = ei(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], a = s.length, l, c = 0; c < a; ++c)
      if (l = s[c]) {
        var u = B(l, e);
        he(l, t, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new et(i, this._parents, t, n);
}
function fa() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(o, s) {
    var a = { value: s }, l = { value: function() {
      --r === 0 && o();
    } };
    n.each(function() {
      var c = K(this, i), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), r === 0 && o();
  });
}
var pa = 0;
function et(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function ei() {
  return ++pa;
}
var j = Vt.prototype;
et.prototype = {
  constructor: et,
  select: Wo,
  selectAll: Ko,
  selectChild: j.selectChild,
  selectChildren: j.selectChildren,
  filter: Vo,
  merge: qo,
  selection: Jo,
  transition: ha,
  call: j.call,
  nodes: j.nodes,
  node: j.node,
  size: j.size,
  empty: j.empty,
  each: j.each,
  on: Xo,
  attr: Io,
  attrTween: No,
  style: na,
  styleTween: sa,
  text: la,
  textTween: da,
  remove: Yo,
  tween: yo,
  delay: Po,
  duration: Lo,
  ease: Do,
  easeVarying: Ho,
  end: fa,
  [Symbol.iterator]: j[Symbol.iterator]
};
function ga(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ma = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ga
};
function _a(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function ya(t) {
  var e, n;
  t instanceof et ? (e = t._id, t = t._name) : (e = ei(), (n = ma).time = Ve(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var s = i[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && he(l, t, e, c, s, n || _a(l, e));
  return new et(i, this._parents, t, e);
}
Vt.prototype.interrupt = go;
Vt.prototype.transition = ya;
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
var Rt = new tt(1, 0, 0);
tt.prototype;
function xe(t) {
  t.stopImmediatePropagation();
}
function St(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function wa(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function xa() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function $n() {
  return this.__zoom || Rt;
}
function $a(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function ba() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ea(t, e, n) {
  var i = t.invertX(e[0][0]) - n[0][0], r = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], s = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function Ia() {
  var t = wa, e = xa, n = Ea, i = $a, r = ba, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = oo, c = ze("start", "zoom", "end"), u, h, f, g = 500, v = 150, b = 0, T = 10;
  function y(d) {
    d.property("__zoom", $n).on("wheel.zoom", Ft, { passive: !1 }).on("mousedown.zoom", Bt).on("dblclick.zoom", Xt).filter(r).on("touchstart.zoom", ni).on("touchmove.zoom", ii).on("touchend.zoom touchcancel.zoom", ri).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(d, m, p, _) {
    var w = d.selection ? d.selection() : d;
    w.property("__zoom", $n), d !== w ? z(d, m, p, _) : w.interrupt().each(function() {
      H(this, arguments).event(_).start().zoom(null, typeof m == "function" ? m.apply(this, arguments) : m).end();
    });
  }, y.scaleBy = function(d, m, p, _) {
    y.scaleTo(d, function() {
      var w = this.__zoom.k, x = typeof m == "function" ? m.apply(this, arguments) : m;
      return w * x;
    }, p, _);
  }, y.scaleTo = function(d, m, p, _) {
    y.transform(d, function() {
      var w = e.apply(this, arguments), x = this.__zoom, $ = p == null ? X(w) : typeof p == "function" ? p.apply(this, arguments) : p, I = x.invert($), C = typeof m == "function" ? m.apply(this, arguments) : m;
      return n(O(M(x, C), $, I), w, s);
    }, p, _);
  }, y.translateBy = function(d, m, p, _) {
    y.transform(d, function() {
      return n(this.__zoom.translate(
        typeof m == "function" ? m.apply(this, arguments) : m,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), e.apply(this, arguments), s);
    }, null, _);
  }, y.translateTo = function(d, m, p, _, w) {
    y.transform(d, function() {
      var x = e.apply(this, arguments), $ = this.__zoom, I = _ == null ? X(x) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(Rt.translate(I[0], I[1]).scale($.k).translate(
        typeof m == "function" ? -m.apply(this, arguments) : -m,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), x, s);
    }, _, w);
  };
  function M(d, m) {
    return m = Math.max(o[0], Math.min(o[1], m)), m === d.k ? d : new tt(m, d.x, d.y);
  }
  function O(d, m, p) {
    var _ = m[0] - p[0] * d.k, w = m[1] - p[1] * d.k;
    return _ === d.x && w === d.y ? d : new tt(d.k, _, w);
  }
  function X(d) {
    return [(+d[0][0] + +d[1][0]) / 2, (+d[0][1] + +d[1][1]) / 2];
  }
  function z(d, m, p, _) {
    d.on("start.zoom", function() {
      H(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      H(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var w = this, x = arguments, $ = H(w, x).event(_), I = e.apply(w, x), C = p == null ? X(I) : typeof p == "function" ? p.apply(w, x) : p, G = Math.max(I[1][0] - I[0][0], I[1][1] - I[0][1]), P = w.__zoom, V = typeof m == "function" ? m.apply(w, x) : m, J = l(P.invert(C).concat(G / P.k), V.invert(C).concat(G / V.k));
      return function(q) {
        if (q === 1) q = V;
        else {
          var Q = J(q), fe = G / Q[2];
          q = new tt(fe, C[0] - Q[0] * fe, C[1] - Q[1] * fe);
        }
        $.zoom(null, q);
      };
    });
  }
  function H(d, m, p) {
    return !p && d.__zooming || new it(d, m);
  }
  function it(d, m) {
    this.that = d, this.args = m, this.active = 0, this.sourceEvent = null, this.extent = e.apply(d, m), this.taps = 0;
  }
  it.prototype = {
    event: function(d) {
      return d && (this.sourceEvent = d), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(d, m) {
      return this.mouse && d !== "mouse" && (this.mouse[1] = m.invert(this.mouse[0])), this.touch0 && d !== "touch" && (this.touch0[1] = m.invert(this.touch0[0])), this.touch1 && d !== "touch" && (this.touch1[1] = m.invert(this.touch1[0])), this.that.__zoom = m, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(d) {
      var m = Y(this.that).datum();
      c.call(
        d,
        this.that,
        new va(d, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        m
      );
    }
  };
  function Ft(d, ...m) {
    if (!t.apply(this, arguments)) return;
    var p = H(this, m).event(d), _ = this.__zoom, w = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, i.apply(this, arguments)))), x = lt(d);
    if (p.wheel)
      (p.mouse[0][0] !== x[0] || p.mouse[0][1] !== x[1]) && (p.mouse[1] = _.invert(p.mouse[0] = x)), clearTimeout(p.wheel);
    else {
      if (_.k === w) return;
      p.mouse = [x, _.invert(x)], te(this), p.start();
    }
    St(d), p.wheel = setTimeout($, v), p.zoom("mouse", n(O(M(_, w), p.mouse[0], p.mouse[1]), p.extent, s));
    function $() {
      p.wheel = null, p.end();
    }
  }
  function Bt(d, ...m) {
    if (f || !t.apply(this, arguments)) return;
    var p = d.currentTarget, _ = H(this, m, !0).event(d), w = Y(d.view).on("mousemove.zoom", C, !0).on("mouseup.zoom", G, !0), x = lt(d, p), $ = d.clientX, I = d.clientY;
    Ps(d.view), xe(d), _.mouse = [x, this.__zoom.invert(x)], te(this), _.start();
    function C(P) {
      if (St(P), !_.moved) {
        var V = P.clientX - $, J = P.clientY - I;
        _.moved = V * V + J * J > b;
      }
      _.event(P).zoom("mouse", n(O(_.that.__zoom, _.mouse[0] = lt(P, p), _.mouse[1]), _.extent, s));
    }
    function G(P) {
      w.on("mousemove.zoom mouseup.zoom", null), Ms(P.view, _.moved), St(P), _.event(P).end();
    }
  }
  function Xt(d, ...m) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, _ = lt(d.changedTouches ? d.changedTouches[0] : d, this), w = p.invert(_), x = p.k * (d.shiftKey ? 0.5 : 2), $ = n(O(M(p, x), _, w), e.apply(this, m), s);
      St(d), a > 0 ? Y(this).transition().duration(a).call(z, $, _, d) : Y(this).call(y.transform, $, _, d);
    }
  }
  function ni(d, ...m) {
    if (t.apply(this, arguments)) {
      var p = d.touches, _ = p.length, w = H(this, m, d.changedTouches.length === _).event(d), x, $, I, C;
      for (xe(d), $ = 0; $ < _; ++$)
        I = p[$], C = lt(I, this), C = [C, this.__zoom.invert(C), I.identifier], w.touch0 ? !w.touch1 && w.touch0[2] !== C[2] && (w.touch1 = C, w.taps = 0) : (w.touch0 = C, x = !0, w.taps = 1 + !!u);
      u && (u = clearTimeout(u)), x && (w.taps < 2 && (h = C[0], u = setTimeout(function() {
        u = null;
      }, g)), te(this), w.start());
    }
  }
  function ii(d, ...m) {
    if (this.__zooming) {
      var p = H(this, m).event(d), _ = d.changedTouches, w = _.length, x, $, I, C;
      for (St(d), x = 0; x < w; ++x)
        $ = _[x], I = lt($, this), p.touch0 && p.touch0[2] === $.identifier ? p.touch0[0] = I : p.touch1 && p.touch1[2] === $.identifier && (p.touch1[0] = I);
      if ($ = p.that.__zoom, p.touch1) {
        var G = p.touch0[0], P = p.touch0[1], V = p.touch1[0], J = p.touch1[1], q = (q = V[0] - G[0]) * q + (q = V[1] - G[1]) * q, Q = (Q = J[0] - P[0]) * Q + (Q = J[1] - P[1]) * Q;
        $ = M($, Math.sqrt(q / Q)), I = [(G[0] + V[0]) / 2, (G[1] + V[1]) / 2], C = [(P[0] + J[0]) / 2, (P[1] + J[1]) / 2];
      } else if (p.touch0) I = p.touch0[0], C = p.touch0[1];
      else return;
      p.zoom("touch", n(O($, I, C), p.extent, s));
    }
  }
  function ri(d, ...m) {
    if (this.__zooming) {
      var p = H(this, m).event(d), _ = d.changedTouches, w = _.length, x, $;
      for (xe(d), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, g), x = 0; x < w; ++x)
        $ = _[x], p.touch0 && p.touch0[2] === $.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === $.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && ($ = lt($, this), Math.hypot(h[0] - $[0], h[1] - $[1]) < T)) {
        var I = Y(this).on("dblclick.zoom");
        I && I.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : Kt(+d), y) : i;
  }, y.filter = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : Kt(!!d), y) : t;
  }, y.touchable = function(d) {
    return arguments.length ? (r = typeof d == "function" ? d : Kt(!!d), y) : r;
  }, y.extent = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : Kt([[+d[0][0], +d[0][1]], [+d[1][0], +d[1][1]]]), y) : e;
  }, y.scaleExtent = function(d) {
    return arguments.length ? (o[0] = +d[0], o[1] = +d[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(d) {
    return arguments.length ? (s[0][0] = +d[0][0], s[1][0] = +d[1][0], s[0][1] = +d[0][1], s[1][1] = +d[1][1], y) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, y.constrain = function(d) {
    return arguments.length ? (n = d, y) : n;
  }, y.duration = function(d) {
    return arguments.length ? (a = +d, y) : a;
  }, y.interpolate = function(d) {
    return arguments.length ? (l = d, y) : l;
  }, y.on = function() {
    var d = c.on.apply(c, arguments);
    return d === c ? y : d;
  }, y.clickDistance = function(d) {
    return arguments.length ? (b = (d = +d) * d, y) : Math.sqrt(b);
  }, y.tapDistance = function(d) {
    return arguments.length ? (T = +d, y) : T;
  }, y;
}
var Sa = Object.defineProperty, Aa = Object.getOwnPropertyDescriptor, Z = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Aa(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, n, r) : s(r)) || r);
  return i && r && Sa(e, n, r), r;
};
const bn = {
  component: A`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: A`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: A`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: A`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: A`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: A`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: A`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: A`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  undo: A`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let D = class extends ht {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !0, this._t = Rt, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._fitted = !1, this._onKeyUp = (t) => {
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
    this._zoomBehavior = Ia().scaleExtent([0.15, 4]).filter((e) => {
      const n = e.target;
      return n.closest("[data-node-id]") || n.closest("[data-handle]") ? e.type === "wheel" || this._spaceDown : e.type === "wheel" || e.button === 0;
    }).on("zoom", (e) => {
      this._t = e.transform;
    }), Y(t).call(this._zoomBehavior);
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
    const r = Math.min(...e.map((u) => u.x - u.w / 2)) - t, o = Math.max(...e.map((u) => u.x + u.w / 2)) + t, s = Math.min(...e.map((u) => u.y - u.h / 2)) - t, a = Math.max(...e.map((u) => u.y + u.h / 2)) + t, l = Math.max(0.15, Math.min(i.width / (o - r), i.height / (a - s), 1.25)), c = Rt.translate(i.width / 2 - l * (r + o) / 2, i.height / 2 - l * (s + a) / 2).scale(l);
    Y(n).call(this._zoomBehavior.transform, c);
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
      const l = this.toScene(a), c = l.x - n.x, u = l.y - n.y;
      !r && Math.hypot(c, u) < 3 / this._t.k || (r = !0, this._dragPos = { id: e.id, x: i.x + c, y: i.y + u });
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
  renderEdge(t) {
    const e = this.scene.nodes.find((h) => h.id === t.sourceId), n = this.scene.nodes.find((h) => h.id === t.targetId);
    if (!e || !n) return A``;
    const i = this.nodePos(e), r = this.nodePos(n);
    let o = this.borderPoint(e, r.x, r.y), s = this.borderPoint(n, i.x, i.y);
    const a = this.edgeOffset(t);
    if (a !== 0) {
      const h = Math.hypot(s.x - o.x, s.y - o.y) || 1, f = -(s.y - o.y) / h * a, g = (s.x - o.x) / h * a;
      o = { x: o.x + f, y: o.y + g }, s = { x: s.x + f, y: s.y + g };
    }
    const l = t.color ?? "#64748b", c = { x: (o.x + s.x) / 2, y: (o.y + s.y) / 2 }, u = this.selectedId === t.id;
    return A`
      <g data-edge-id=${t.id}>
        <line class="edge-hit" x1=${o.x} y1=${o.y} x2=${s.x} y2=${s.y}
              stroke="transparent" stroke-width="14"
              @click=${(h) => {
      h.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: t.id, kind: t.kind });
    }}>
          ${t.tooltip ? A`<title>${t.tooltip}</title>` : ""}
        </line>
        <line x1=${o.x} y1=${o.y} x2=${s.x} y2=${s.y}
              stroke=${l} stroke-width=${u ? 3 : 1.6}
              stroke-dasharray=${t.dashed ? "6 4" : ""}
              marker-end=${t.arrow ? `url(#arrow-${this.markerId(l)})` : ""}
              pointer-events="none"></line>
        ${t.label ? A`<text x=${c.x} y=${c.y - 6} text-anchor="middle"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${l}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3">
                  ${t.label}
                </text>` : ""}
      </g>
    `;
  }
  markerId(t) {
    return t.replace(/[^a-zA-Z0-9]/g, "");
  }
  renderNode(t) {
    const { x: e, y: n } = this.nodePos(t), i = this.selectedId === t.id, r = this._hoverNodeId === t.id, o = t.w / 2, s = t.h / 2;
    return A`
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
          ${t.tooltip ? A`<title>${t.tooltip}</title>` : ""}
        </rect>
        ${t.badge ? A`<text x=${-o} y=${-s - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${t.badge}</text>` : ""}
        ${t.symbol && bn[t.symbol] ? A`<g transform="translate(${o - 17}, ${-s + 5})" fill="none"
                  stroke=${t.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${bn[t.symbol]}
              </g>` : ""}
        ${this._editingId === t.id ? A`
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
              </foreignObject>` : A`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
              font-family="ui-sans-serif, system-ui" fill="#1e293b">${t.label}</text>`}
        ${i && this.connectable ? [
      [o, 0],
      [-o, 0],
      [0, s],
      [0, -s]
    ].map(
      ([a, l]) => A`
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
    if (!this._pendingLink) return A``;
    const t = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!t) return A``;
    const e = this.borderPoint(t, this._pendingLink.x, this._pendingLink.y);
    return A`
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
    const i = this.getBoundingClientRect(), r = this._t.k, o = Rt.translate(i.width / 2 - r * t, i.height / 2 - r * e).scale(r);
    Y(n).call(this._zoomBehavior.transform, o);
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
      var u, h;
      (h = (u = c.currentTarget).hasPointerCapture) != null && h.call(u, c.pointerId) && this.onMinimapPointer(c, t, i);
    }}
      >
        <svg viewBox="0 0 ${e} ${n}">
          ${this.scene.nodes.map((c) => {
      const u = this.nodePos(c);
      return A`<rect
              x=${(u.x - c.w / 2 - t.minX) * i}
              y=${(u.y - c.h / 2 - t.minY) * i}
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
    const t = [...new Set(this.scene.edges.map((e) => e.color ?? "#64748b"))];
    return S`
      <svg
        class="main ${this._pendingLink ? "linking" : ""}"
        @pointerdown=${(e) => {
      const n = e.target;
      !n.closest("[data-node-id]") && !n.closest("[data-edge-id]") && this.emit("selection-cleared");
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${t.map(
      (e) => A`
              <marker id="arrow-${this.markerId(e)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${e}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${this.scene.edges.map((e) => this.renderEdge(e))}
          ${this.scene.nodes.map((e) => this.renderNode(e))}
          ${this.renderPendingLink()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
D.styles = Pe`
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
Z([
  mt({ attribute: !1 })
], D.prototype, "scene", 2);
Z([
  mt({ attribute: !1 })
], D.prototype, "selectedId", 2);
Z([
  mt({ type: Boolean })
], D.prototype, "connectable", 2);
Z([
  E()
], D.prototype, "_t", 2);
Z([
  E()
], D.prototype, "_dragPos", 2);
Z([
  E()
], D.prototype, "_pendingLink", 2);
Z([
  E()
], D.prototype, "_hoverNodeId", 2);
Z([
  E()
], D.prototype, "_editingId", 2);
Z([
  E()
], D.prototype, "_spaceDown", 2);
D = Z([
  Le("modux-canvas")
], D);
async function ka(t, e) {
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
var Ta = Object.defineProperty, Na = Object.getOwnPropertyDescriptor, N = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Na(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, n, r) : s(r)) || r);
  return i && r && Ta(e, n, r), r;
};
const Ca = [
  "PARTNERSHIP",
  "SHARED_KERNEL",
  "CUSTOMER_SUPPLIER",
  "CONFORMIST",
  "OPEN_HOST_SERVICE",
  "ANTI_CORRUPTION_LAYER",
  "PUBLISHED_LANGUAGE",
  "SEPARATE_WAYS"
], Ra = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 }
], Pa = ["CORE", "SUPPORTING", "GENERIC"], At = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Ma(t, e) {
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
function Oa(t, e) {
  const n = (t ?? []).find((i) => i.steps.some((r) => r.id === e));
  return n ? { elementType: "process", id: n.id } : null;
}
let k = class extends ht {
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
  pushUndoEntry(t) {
    this._undoStack = [...this._undoStack.slice(-19), t], this._redoStack = [];
  }
  /** Inverses of an operation list, computed against the current state, in reverse order. */
  inversesOf(t) {
    return [...t].reverse().flatMap((e) => {
      var n;
      return e.kind === "move-node" ? [
        {
          kind: "move-node",
          view: e.view,
          id: e.id,
          pos: ((n = this.layout[e.view]) == null ? void 0 : n[e.id]) ?? null
        }
      ] : this.inverseOf(e) ?? [];
    });
  }
  applyOps(t) {
    for (const e of t)
      if (e.kind === "move-node") {
        const n = { ...this.layout[e.view] ?? {} };
        e.pos ? n[e.id] = e.pos : delete n[e.id], this.layout = { ...this.layout, [e.view]: n }, this.emit("layout-changed", { layout: this.layout });
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
    var l;
    const { id: e, x: n, y: i } = t.detail, r = this._view, o = ((l = this.layout[r]) == null ? void 0 : l[e]) ?? null, s = {
      ...this.layout,
      [r]: { ...this.layout[r] ?? {}, [e]: { x: n, y: i } }
    };
    this.layout = s, this.emit("layout-changed", { layout: s });
    const a = [{ kind: "move-node", view: r, id: e, pos: o }];
    if (r === "processes") {
      const c = this.stepReorderCommand(e);
      if (c) {
        const u = this.inverseOf(c);
        u && a.unshift(...u), this.command(c, !1);
      }
    }
    this.pushUndoEntry(a);
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(t) {
    const e = this.owningProcessOf(t);
    if (!e) return null;
    const n = Ge(this.model, this.layout.processes ?? {}), i = new Map(n.nodes.map((s) => [s.id, s.x])), r = [...e.steps].sort(
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
      id: `step-${At(t)}`,
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
    const e = t.detail.kind === "process-step" ? Oa(this.model.processes, t.detail.id) : Ma(t.detail.id, t.detail.kind);
    e && this.emit("modux-activate", e);
  }
  createElementFromToolbar() {
    var e, n, i, r, o, s, a;
    const t = this._newName.trim();
    if (t) {
      if (this._view === "context-map")
        this.command({
          kind: "add-module",
          id: `mod-${At(t)}`,
          name: t,
          subdomainType: this._newSubdomain
        });
      else if (this._view === "aggregates") {
        const l = this._newModuleId || ((e = this.model.modules[0]) == null ? void 0 : e.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${At(t)}`, name: t, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id), c = this._newTargetId || ((r = this.model.modules[0]) == null ? void 0 : r.id), u = this._newTriggerEvent.trim();
        if (!l || !c || !u) return;
        this.command({
          kind: "add-flow",
          id: `flow-${At(t)}`,
          name: t,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: u,
          targetId: c
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newModuleId || ((o = this.model.modules[0]) == null ? void 0 : o.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${At(t)}`,
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
    const e = this.layout[t] ?? {};
    return t === "aggregates" ? yi(this.model, e) : t === "flows" ? Ai(this.model, e) : t === "processes" ? Ge(this.model, e) : di(this.model, e);
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var r;
    const t = this._view, e = this.sceneFor(t);
    if (!e.nodes.length) return;
    const i = await ka(e, t === "flows" || t === "processes" ? "layered" : "force");
    this.pushUndoEntry(
      e.nodes.map((o) => {
        var s;
        return {
          kind: "move-node",
          view: t,
          id: o.id,
          pos: ((s = this.layout[t]) == null ? void 0 : s[o.id]) ?? null
        };
      })
    ), this.layout = { ...this.layout, [t]: i }, this.emit("layout-changed", { layout: this.layout }), await this.updateComplete, (r = this.renderRoot.querySelector("modux-canvas")) == null || r.fit();
  }
  render() {
    const t = this.sceneFor(this._view);
    return S`
      <div class="toolbar">
        <div class="tabs">
          ${Ra.map(
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
              ${Pa.map(
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
          ${Ca.map(
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
        .selectedId=${this._selectedId}
        .connectable=${this._view === "context-map"}
        @node-moved=${this.onNodeMoved}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
        @node-renamed=${this.onNodeRenamed}
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
k.styles = Pe`
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
  mt({ attribute: !1 })
], k.prototype, "model", 2);
N([
  mt({ attribute: !1 })
], k.prototype, "layout", 2);
N([
  E()
], k.prototype, "_view", 2);
N([
  E()
], k.prototype, "_relationType", 2);
N([
  E()
], k.prototype, "_selectedId", 2);
N([
  E()
], k.prototype, "_newName", 2);
N([
  E()
], k.prototype, "_newSubdomain", 2);
N([
  E()
], k.prototype, "_newModuleId", 2);
N([
  E()
], k.prototype, "_newArchetype", 2);
N([
  E()
], k.prototype, "_newTriggerAggId", 2);
N([
  E()
], k.prototype, "_newTriggerEvent", 2);
N([
  E()
], k.prototype, "_newTargetId", 2);
N([
  E()
], k.prototype, "_undoStack", 2);
N([
  E()
], k.prototype, "_redoStack", 2);
N([
  E()
], k.prototype, "_newStepName", 2);
N([
  E()
], k.prototype, "_newStepType", 2);
N([
  E()
], k.prototype, "_newStepRole", 2);
N([
  E()
], k.prototype, "_newStepDeadline", 2);
N([
  E()
], k.prototype, "_editStepRole", 2);
N([
  E()
], k.prototype, "_editStepDeadline", 2);
N([
  E()
], k.prototype, "_editStepComp", 2);
k = N([
  Le("modux-editor")
], k);
var La = Object.defineProperty, Ua = Object.getOwnPropertyDescriptor, _t = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Ua(e, n) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, n, r) : s(r)) || r);
  return i && r && La(e, n, r), r;
};
let nt = class extends ht {
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
nt.styles = Pe`
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
  mt()
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
  k as ModuxEditor,
  nt as ModuxEditorConnected,
  yi as aggregatesScene,
  di as contextMapScene,
  ci as flowCoherence,
  Ai as flowsScene,
  Ge as processesScene,
  li as relationEdgeId
};
