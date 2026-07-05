const ii = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ri = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, si = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Be = 168, Xe = 56;
function oi(t, e) {
  return `rel:${t}->${e}`;
}
function ai(t, e) {
  const n = new Set(t.externalSystems.map((i) => i.id));
  return e.sourceId === e.targetId ? "INTERNAL" : n.has(e.sourceId) || n.has(e.targetId) ? "EXTERNAL" : t.relations.some((i) => i.sourceId === e.sourceId && i.targetId === e.targetId) ? "OK" : t.relations.some((i) => i.sourceId === e.targetId && i.targetId === e.sourceId) ? "REVERSED" : "MISSING_RELATION";
}
function li(t, e) {
  const n = 2 * Math.PI * t / Math.max(e, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
function ci(t, e) {
  const n = [
    ...t.modules.map((o) => ({ ref: o, external: !1 })),
    ...t.externalSystems.map((o) => ({ ref: o, external: !0 }))
  ], i = n.map((o, a) => {
    const l = e[o.ref.id] ?? li(a, n.length);
    if (o.external)
      return {
        id: o.ref.id,
        label: o.ref.name,
        x: l.x,
        y: l.y,
        w: Be,
        h: Xe,
        kind: "external-system",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${o.ref.name} (sistema externo)`
      };
    const c = o.ref, u = c.subdomainType ?? "GENERIC";
    return {
      id: c.id,
      label: c.name,
      x: l.x,
      y: l.y,
      w: Be,
      h: Xe,
      kind: "module",
      fill: ii[u],
      stroke: "#94a3b8",
      badge: u,
      tooltip: `${c.name} — subdominio ${u}`
    };
  }), r = t.relations.map((o) => ({
    id: oi(o.sourceId, o.targetId),
    sourceId: o.sourceId,
    targetId: o.targetId,
    kind: "relation",
    label: ri[o.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${o.type} (${o.sourceId} upstream → ${o.targetId} downstream)`
  })), s = t.flows.map((o) => {
    const a = ai(t, o);
    return {
      id: `flow:${o.id}`,
      sourceId: o.sourceId,
      targetId: o.targetId,
      kind: "flow",
      label: o.name,
      color: si[a],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${o.name} [${o.archetype}] — ${a}`
    };
  });
  return { nodes: i, edges: [...r, ...s] };
}
const ui = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, hi = 176, di = 60, fi = 140, pi = 40;
function gi(t) {
  const e = {}, n = t.aggregates ?? [], i = t.entities ?? [];
  return t.modules.forEach((r, s) => {
    const o = 220 + s * 340;
    n.filter((l) => l.moduleId === r.id).forEach((l, c) => {
      const u = i.filter((f) => f.aggregateId === l.id).length, d = 140 + c * (170 + u * 60);
      e[l.id] = { x: o, y: d }, i.filter((f) => f.aggregateId === l.id).forEach((f, g) => {
        e[f.id] = { x: o + 60, y: d + 100 + g * 60 };
      });
    });
  }), n.filter((r) => !t.modules.some((s) => s.id === r.moduleId)).forEach((r, s) => {
    e[r.id] = { x: 220 + s * 340, y: 640 };
  }), e;
}
function mi(t, e) {
  const n = gi(t), i = (c) => e[c] ?? n[c] ?? { x: 200, y: 200 }, r = new Map(t.modules.map((c) => [c.id, c])), s = (t.aggregates ?? []).map((c) => {
    const u = r.get(c.moduleId), d = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", f = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: f.x,
      y: f.y,
      w: hi,
      h: di,
      kind: "aggregate",
      fill: ui[d],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${u ? ` — módulo ${u.name} (${d})` : ""}`
    };
  }), o = (t.entities ?? []).map((c) => {
    const u = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
      w: fi,
      h: pi,
      kind: "entity",
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
    nodes: [...s, ...o],
    edges: [...a, ...l]
  };
}
const _i = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, yi = 150, vi = 44, wi = 190, xi = 56, $i = 160, bi = 48;
function Ei(t, e) {
  const n = t.externalSystems.find((r) => r.id === e.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = t.modules.find((r) => r.id === e.targetId);
  return { id: e.targetId, label: (i == null ? void 0 : i.name) ?? e.targetId, external: !1 };
}
function Ai(t, e) {
  const n = t.flows, i = [], r = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var l, c;
    return ((c = (l = t.aggregates) == null ? void 0 : l.find((u) => u.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return n.forEach((a, l) => {
    const c = 120 + l * 130, u = _i[a.archetype] ?? "#475569", d = a.triggerAggregateId ?? a.sourceId;
    if (!s.has(d)) {
      s.add(d);
      const A = e[d] ?? { x: 160, y: c };
      i.push({
        id: d,
        label: a.triggerAggregateId ? o(a.triggerAggregateId) : d,
        x: A.x,
        y: A.y,
        w: yi,
        h: vi,
        kind: a.triggerAggregateId ? "aggregate" : "module",
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
      w: wi,
      h: xi,
      kind: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const v = Ei(t, a), b = `tgt:${v.id}`;
    if (!s.has(b)) {
      s.add(b);
      const A = e[b] ?? { x: 790, y: c };
      i.push({
        id: b,
        label: v.label,
        x: A.x,
        y: A.y,
        w: $i,
        h: bi,
        kind: v.external ? "external-system" : "module",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "MODULE"
      });
    }
    r.push({
      id: `fe:${a.id}:in`,
      sourceId: d,
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
const Ii = 190, Si = 56, pe = 170, ki = 52;
function Ti(t, e) {
  const n = [], i = [], r = (s) => {
    var o;
    return (o = t.modules.find((a) => a.id === s)) == null ? void 0 : o.name;
  };
  return (t.processes ?? []).forEach((s, o) => {
    const a = 140 + o * 240, l = e[s.id] ?? { x: 150, y: a };
    n.push({
      id: s.id,
      label: s.name,
      x: l.x,
      y: l.y,
      w: Ii,
      h: Si,
      kind: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${s.sla ? ` · SLA ${s.sla}` : ""}`,
      tooltip: `${s.name}${r(s.ownerModuleId) ? ` — módulo ${r(s.ownerModuleId)}` : ""}${s.triggerEvent ? ` · arranca con ${s.triggerEvent}` : ""}`
    });
    let c = s.id;
    if (s.steps.forEach((u, d) => {
      const f = u.type === "HUMAN", g = e[u.id] ?? { x: 150 + (d + 1) * 240, y: a };
      if (n.push({
        id: u.id,
        label: u.name,
        x: g.x,
        y: g.y,
        w: pe,
        h: ki,
        kind: "process-step",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), i.push({
        id: `pe:${s.id}:${d}`,
        sourceId: c,
        targetId: u.id,
        kind: "process-seq",
        label: d === 0 ? s.triggerEvent : void 0,
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
    }), s.onCompletionEventName) {
      const u = `done:${s.id}`, d = e[u] ?? { x: 150 + (s.steps.length + 1) * 240, y: a };
      n.push({
        id: u,
        label: s.onCompletionEventName,
        x: d.x,
        y: d.y,
        w: pe,
        h: 40,
        kind: "completion-event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), i.push({
        id: `pd:${s.id}`,
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
const Kt = globalThis, Ce = Kt.ShadowRoot && (Kt.ShadyCSS === void 0 || Kt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pe = Symbol(), Ve = /* @__PURE__ */ new WeakMap();
let bn = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== Pe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Ce && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Ve.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ve.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ni = (t) => new bn(typeof t == "string" ? t : t + "", void 0, Pe), Re = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, r, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[s + 1], t[0]);
  return new bn(n, t, Pe);
}, Ci = (t, e) => {
  if (Ce) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), r = Kt.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = n.cssText, t.appendChild(i);
  }
}, Ye = Ce ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return Ni(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pi, defineProperty: Ri, getOwnPropertyDescriptor: Mi, getOwnPropertyNames: Oi, getOwnPropertySymbols: zi, getPrototypeOf: Li } = Object, ot = globalThis, We = ot.trustedTypes, Ui = We ? We.emptyScript : "", ge = ot.reactiveElementPolyfillSupport, Tt = (t, e) => t, te = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ui : null;
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
} }, Me = (t, e) => !Pi(t, e), Ke = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: Me };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ot.litPropertyMetadata ?? (ot.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let yt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ke) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, n);
      r !== void 0 && Ri(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: r, set: s } = Mi(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: r, set(o) {
      const a = r == null ? void 0 : r.call(this);
      s == null || s.call(this, o), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Tt("elementProperties"))) return;
    const e = Li(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Tt("properties"))) {
      const n = this.properties, i = [...Oi(n), ...zi(n)];
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
      for (const r of i) n.unshift(Ye(r));
    } else e !== void 0 && n.push(Ye(e));
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
    return Ci(e, this.constructor.elementStyles), e;
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
    var s;
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : te).toAttribute(n, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var s, o;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : te;
      this._$Em = r;
      const c = l.fromAttribute(n, a.type);
      this[r] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, r = !1, s) {
    var o;
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (s = this[e]), i ?? (i = a.getPropertyOptions(e)), !((i.hasChanged ?? Me)(s, n) || i.useDefault && i.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: r, wrapped: s }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, o] of r) {
        const { wrapped: a } = o, l = this[s];
        a !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((r) => {
        var s;
        return (s = r.hostUpdate) == null ? void 0 : s.call(r);
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
yt.elementStyles = [], yt.shadowRootOptions = { mode: "open" }, yt[Tt("elementProperties")] = /* @__PURE__ */ new Map(), yt[Tt("finalized")] = /* @__PURE__ */ new Map(), ge == null || ge({ ReactiveElement: yt }), (ot.reactiveElementVersions ?? (ot.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = globalThis, Ze = (t) => t, ee = Nt.trustedTypes, Je = ee ? ee.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, En = "$lit$", st = `lit$${Math.random().toFixed(9).slice(2)}$`, An = "?" + st, Di = `<${An}>`, pt = document, Ct = () => pt.createComment(""), Pt = (t) => t === null || typeof t != "object" && typeof t != "function", Oe = Array.isArray, Hi = (t) => Oe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", me = `[ 	
\f\r]`, Et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qe = /-->/g, je = />/g, at = RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tn = /'/g, en = /"/g, In = /^(?:script|style|textarea|title)$/i, Sn = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), k = Sn(1), M = Sn(2), wt = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), nn = /* @__PURE__ */ new WeakMap(), ct = pt.createTreeWalker(pt, 129);
function kn(t, e) {
  if (!Oe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Je !== void 0 ? Je.createHTML(e) : e;
}
const qi = (t, e) => {
  const n = t.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Et;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let c, u, d = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, u = o.exec(l), u !== null); ) f = o.lastIndex, o === Et ? u[1] === "!--" ? o = Qe : u[1] !== void 0 ? o = je : u[2] !== void 0 ? (In.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = at) : u[3] !== void 0 && (o = at) : o === at ? u[0] === ">" ? (o = r ?? Et, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? at : u[3] === '"' ? en : tn) : o === en || o === tn ? o = at : o === Qe || o === je ? o = Et : (o = at, r = void 0);
    const g = o === at && t[a + 1].startsWith("/>") ? " " : "";
    s += o === Et ? l + Di : d >= 0 ? (i.push(c), l.slice(0, d) + En + l.slice(d) + st + g) : l + st + (d === -2 ? a : g);
  }
  return [kn(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Rt {
  constructor({ strings: e, _$litType$: n }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const a = e.length - 1, l = this.parts, [c, u] = qi(e, n);
    if (this.el = Rt.createElement(c, i), ct.currentNode = this.el.content, n === 2 || n === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = ct.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(En)) {
          const f = u[o++], g = r.getAttribute(d).split(st), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: v[2], strings: g, ctor: v[1] === "." ? Gi : v[1] === "?" ? Bi : v[1] === "@" ? Xi : ce }), r.removeAttribute(d);
        } else d.startsWith(st) && (l.push({ type: 6, index: s }), r.removeAttribute(d));
        if (In.test(r.tagName)) {
          const d = r.textContent.split(st), f = d.length - 1;
          if (f > 0) {
            r.textContent = ee ? ee.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(d[g], Ct()), ct.nextNode(), l.push({ type: 2, index: ++s });
            r.append(d[f], Ct());
          }
        }
      } else if (r.nodeType === 8) if (r.data === An) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(st, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += st.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const i = pt.createElement("template");
    return i.innerHTML = e, i;
  }
}
function xt(t, e, n = t, i) {
  var o, a;
  if (e === wt) return e;
  let r = i !== void 0 ? (o = n._$Co) == null ? void 0 : o[i] : n._$Cl;
  const s = Pt(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), s === void 0 ? r = void 0 : (r = new s(t), r._$AT(t, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = r : n._$Cl = r), r !== void 0 && (e = xt(t, r._$AS(t, e.values), r, i)), e;
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
    let s = ct.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Ut(s, s.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (c = new Vi(s, this, e)), this._$AV.push(c), l = i[++a];
      }
      o !== (l == null ? void 0 : l.index) && (s = ct.nextNode(), o++);
    }
    return ct.currentNode = pt, r;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class Ut {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, i, r) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = xt(this, e, n), Pt(e) ? e === T || e == null || e === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : e !== this._$AH && e !== wt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Hi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== T && Pt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(pt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: n, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Rt.createElement(kn(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(n);
    else {
      const o = new Fi(r, this), a = o.u(this.options);
      o.p(n), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = nn.get(e.strings);
    return n === void 0 && nn.set(e.strings, n = new Rt(e)), n;
  }
  k(e) {
    Oe(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, r = 0;
    for (const s of e) r === n.length ? n.push(i = new Ut(this.O(Ct()), this.O(Ct()), this, this.options)) : i = n[r], i._$AI(s), r++;
    r < n.length && (this._$AR(i && i._$AB.nextSibling, r), n.length = r);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); e !== this._$AB; ) {
      const r = Ze(e).nextSibling;
      Ze(e).remove(), e = r;
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
  constructor(e, n, i, r, s) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = e, this.name = n, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = T;
  }
  _$AI(e, n = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = xt(this, e, n, 0), o = !Pt(e) || e !== this._$AH && e !== wt, o && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = s[0], l = 0; l < s.length - 1; l++) c = xt(this, a[i + l], n, l), c === wt && (c = this._$AH[l]), o || (o = !Pt(c) || c !== this._$AH[l]), c === T ? e = T : e !== T && (e += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Gi extends ce {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === T ? void 0 : e;
  }
}
class Bi extends ce {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== T);
  }
}
class Xi extends ce {
  constructor(e, n, i, r, s) {
    super(e, n, i, r, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = xt(this, e, n, 0) ?? T) === wt) return;
    const i = this._$AH, r = e === T && i !== T || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== T && (i === T || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Vi {
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
const _e = Nt.litHtmlPolyfillSupport;
_e == null || _e(Rt, Ut), (Nt.litHtmlVersions ?? (Nt.litHtmlVersions = [])).push("3.3.3");
const Yi = (t, e, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = r = new Ut(e.insertBefore(Ct(), s), s, void 0, n ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis;
class dt extends yt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Yi(n, this.renderRoot, this.renderOptions);
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
var $n;
dt._$litElement$ = !0, dt.finalized = !0, ($n = ht.litElementHydrateSupport) == null || $n.call(ht, { LitElement: dt });
const ye = ht.litElementPolyfillSupport;
ye == null || ye({ LitElement: dt });
(ht.litElementVersions ?? (ht.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wi = { attribute: !0, type: String, converter: te, reflect: !1, hasChanged: Me }, Ki = (t = Wi, e, n) => {
  const { kind: i, metadata: r } = n;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(n.name, t), i === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = n;
    return function(a) {
      const l = this[o];
      e.call(this, a), this.requestUpdate(o, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function mt(t) {
  return (e, n) => typeof n == "object" ? Ki(t, e, n) : ((i, r, s) => {
    const o = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function S(t) {
  return mt({ ...t, state: !0, attribute: !1 });
}
var $e = "http://www.w3.org/1999/xhtml";
const rn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: $e,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ue(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), rn.hasOwnProperty(e) ? { space: rn[e], local: t } : t;
}
function Zi(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === $e && e.documentElement.namespaceURI === $e ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Ji(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Tn(t) {
  var e = ue(t);
  return (e.local ? Ji : Zi)(e);
}
function Qi() {
}
function Le(t) {
  return t == null ? Qi : function() {
    return this.querySelector(t);
  };
}
function ji(t) {
  typeof t != "function" && (t = Le(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var s = e[r], o = s.length, a = i[r] = new Array(o), l, c, u = 0; u < o; ++u)
      (l = s[u]) && (c = t.call(l, l.__data__, u, s)) && ("__data__" in l && (c.__data__ = l.__data__), a[u] = c);
  return new L(i, this._parents);
}
function tr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function er() {
  return [];
}
function Nn(t) {
  return t == null ? er : function() {
    return this.querySelectorAll(t);
  };
}
function nr(t) {
  return function() {
    return tr(t.apply(this, arguments));
  };
}
function ir(t) {
  typeof t == "function" ? t = nr(t) : t = Nn(t);
  for (var e = this._groups, n = e.length, i = [], r = [], s = 0; s < n; ++s)
    for (var o = e[s], a = o.length, l, c = 0; c < a; ++c)
      (l = o[c]) && (i.push(t.call(l, l.__data__, c, o)), r.push(l));
  return new L(i, r);
}
function Cn(t) {
  return function() {
    return this.matches(t);
  };
}
function Pn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var rr = Array.prototype.find;
function sr(t) {
  return function() {
    return rr.call(this.children, t);
  };
}
function or() {
  return this.firstElementChild;
}
function ar(t) {
  return this.select(t == null ? or : sr(typeof t == "function" ? t : Pn(t)));
}
var lr = Array.prototype.filter;
function cr() {
  return Array.from(this.children);
}
function ur(t) {
  return function() {
    return lr.call(this.children, t);
  };
}
function hr(t) {
  return this.selectAll(t == null ? cr : ur(typeof t == "function" ? t : Pn(t)));
}
function dr(t) {
  typeof t != "function" && (t = Cn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var s = e[r], o = s.length, a = i[r] = [], l, c = 0; c < o; ++c)
      (l = s[c]) && t.call(l, l.__data__, c, s) && a.push(l);
  return new L(i, this._parents);
}
function Rn(t) {
  return new Array(t.length);
}
function fr() {
  return new L(this._enter || this._groups.map(Rn), this._parents);
}
function ne(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ne.prototype = {
  constructor: ne,
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
function pr(t) {
  return function() {
    return t;
  };
}
function gr(t, e, n, i, r, s) {
  for (var o = 0, a, l = e.length, c = s.length; o < c; ++o)
    (a = e[o]) ? (a.__data__ = s[o], i[o] = a) : n[o] = new ne(t, s[o]);
  for (; o < l; ++o)
    (a = e[o]) && (r[o] = a);
}
function mr(t, e, n, i, r, s, o) {
  var a, l, c = /* @__PURE__ */ new Map(), u = e.length, d = s.length, f = new Array(u), g;
  for (a = 0; a < u; ++a)
    (l = e[a]) && (f[a] = g = o.call(l, l.__data__, a, e) + "", c.has(g) ? r[a] = l : c.set(g, l));
  for (a = 0; a < d; ++a)
    g = o.call(t, s[a], a, s) + "", (l = c.get(g)) ? (i[a] = l, l.__data__ = s[a], c.delete(g)) : n[a] = new ne(t, s[a]);
  for (a = 0; a < u; ++a)
    (l = e[a]) && c.get(f[a]) === l && (r[a] = l);
}
function _r(t) {
  return t.__data__;
}
function yr(t, e) {
  if (!arguments.length) return Array.from(this, _r);
  var n = e ? mr : gr, i = this._parents, r = this._groups;
  typeof t != "function" && (t = pr(t));
  for (var s = r.length, o = new Array(s), a = new Array(s), l = new Array(s), c = 0; c < s; ++c) {
    var u = i[c], d = r[c], f = d.length, g = vr(t.call(u, u && u.__data__, c, i)), v = g.length, b = a[c] = new Array(v), A = o[c] = new Array(v), y = l[c] = new Array(f);
    n(u, d, b, A, y, g, e);
    for (var P = 0, R = 0, X, U; P < v; ++P)
      if (X = b[P]) {
        for (P >= R && (R = P + 1); !(U = A[R]) && ++R < v; ) ;
        X._next = U || null;
      }
  }
  return o = new L(o, i), o._enter = a, o._exit = l, o;
}
function vr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function wr() {
  return new L(this._exit || this._groups.map(Rn), this._parents);
}
function xr(t, e, n) {
  var i = this.enter(), r = this, s = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? s.remove() : n(s), i && r ? i.merge(r).order() : r;
}
function $r(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, s = i.length, o = Math.min(r, s), a = new Array(r), l = 0; l < o; ++l)
    for (var c = n[l], u = i[l], d = c.length, f = a[l] = new Array(d), g, v = 0; v < d; ++v)
      (g = c[v] || u[v]) && (f[v] = g);
  for (; l < r; ++l)
    a[l] = n[l];
  return new L(a, this._parents);
}
function br() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, s = i[r], o; --r >= 0; )
      (o = i[r]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function Er(t) {
  t || (t = Ar);
  function e(d, f) {
    return d && f ? t(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), s = 0; s < i; ++s) {
    for (var o = n[s], a = o.length, l = r[s] = new Array(a), c, u = 0; u < a; ++u)
      (c = o[u]) && (l[u] = c);
    l.sort(e);
  }
  return new L(r, this._parents).order();
}
function Ar(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ir() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Sr() {
  return Array.from(this);
}
function kr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, s = i.length; r < s; ++r) {
      var o = i[r];
      if (o) return o;
    }
  return null;
}
function Tr() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Nr() {
  return !this.node();
}
function Cr(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], s = 0, o = r.length, a; s < o; ++s)
      (a = r[s]) && t.call(a, a.__data__, s, r);
  return this;
}
function Pr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Rr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Mr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Or(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function zr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Lr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ur(t, e) {
  var n = ue(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Rr : Pr : typeof e == "function" ? n.local ? Lr : zr : n.local ? Or : Mr)(n, e));
}
function Mn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Dr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Hr(t, e, n) {
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
  return arguments.length > 1 ? this.each((e == null ? Dr : typeof e == "function" ? qr : Hr)(t, e, n ?? "")) : $t(this.node(), t);
}
function $t(t, e) {
  return t.style.getPropertyValue(e) || Mn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Gr(t) {
  return function() {
    delete this[t];
  };
}
function Br(t, e) {
  return function() {
    this[t] = e;
  };
}
function Xr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Vr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Gr : typeof e == "function" ? Xr : Br)(t, e)) : this.node()[t];
}
function On(t) {
  return t.trim().split(/^|\s+/);
}
function Ue(t) {
  return t.classList || new zn(t);
}
function zn(t) {
  this._node = t, this._names = On(t.getAttribute("class") || "");
}
zn.prototype = {
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
function Ln(t, e) {
  for (var n = Ue(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Un(t, e) {
  for (var n = Ue(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Yr(t) {
  return function() {
    Ln(this, t);
  };
}
function Wr(t) {
  return function() {
    Un(this, t);
  };
}
function Kr(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ln : Un)(this, t);
  };
}
function Zr(t, e) {
  var n = On(t + "");
  if (arguments.length < 2) {
    for (var i = Ue(this.node()), r = -1, s = n.length; ++r < s; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Kr : e ? Yr : Wr)(n, e));
}
function Jr() {
  this.textContent = "";
}
function Qr(t) {
  return function() {
    this.textContent = t;
  };
}
function jr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ts(t) {
  return arguments.length ? this.each(t == null ? Jr : (typeof t == "function" ? jr : Qr)(t)) : this.node().textContent;
}
function es() {
  this.innerHTML = "";
}
function ns(t) {
  return function() {
    this.innerHTML = t;
  };
}
function is(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function rs(t) {
  return arguments.length ? this.each(t == null ? es : (typeof t == "function" ? is : ns)(t)) : this.node().innerHTML;
}
function ss() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function os() {
  return this.each(ss);
}
function as() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ls() {
  return this.each(as);
}
function cs(t) {
  var e = typeof t == "function" ? t : Tn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function us() {
  return null;
}
function hs(t, e) {
  var n = typeof t == "function" ? t : Tn(t), i = e == null ? us : typeof e == "function" ? e : Le(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function ds() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function fs() {
  return this.each(ds);
}
function ps() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function gs() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ms(t) {
  return this.select(t ? gs : ps);
}
function _s(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ys(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function vs(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function ws(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, s; n < r; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++i] = s;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function xs(t, e, n) {
  return function() {
    var i = this.__on, r, s = ys(e);
    if (i) {
      for (var o = 0, a = i.length; o < a; ++o)
        if ((r = i[o]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = s, r.options = n), r.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), r = { type: t.type, name: t.name, value: e, listener: s, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function $s(t, e, n) {
  var i = vs(t + ""), r, s = i.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, u; l < c; ++l)
        for (r = 0, u = a[l]; r < s; ++r)
          if ((o = i[r]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = e ? xs : ws, r = 0; r < s; ++r) this.each(a(i[r], e, n));
  return this;
}
function Dn(t, e, n) {
  var i = Mn(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function bs(t, e) {
  return function() {
    return Dn(this, t, e);
  };
}
function Es(t, e) {
  return function() {
    return Dn(this, t, e.apply(this, arguments));
  };
}
function As(t, e) {
  return this.each((typeof e == "function" ? Es : bs)(t, e));
}
function* Is() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, s = i.length, o; r < s; ++r)
      (o = i[r]) && (yield o);
}
var Hn = [null];
function L(t, e) {
  this._groups = t, this._parents = e;
}
function Dt() {
  return new L([[document.documentElement]], Hn);
}
function Ss() {
  return this;
}
L.prototype = Dt.prototype = {
  constructor: L,
  select: ji,
  selectAll: ir,
  selectChild: ar,
  selectChildren: hr,
  filter: dr,
  data: yr,
  enter: fr,
  exit: wr,
  join: xr,
  merge: $r,
  selection: Ss,
  order: br,
  sort: Er,
  call: Ir,
  nodes: Sr,
  node: kr,
  size: Tr,
  empty: Nr,
  each: Cr,
  attr: Ur,
  style: Fr,
  property: Vr,
  classed: Zr,
  text: ts,
  html: rs,
  raise: os,
  lower: ls,
  append: cs,
  insert: hs,
  remove: fs,
  clone: ms,
  datum: _s,
  on: $s,
  dispatch: As,
  [Symbol.iterator]: Is
};
function Q(t) {
  return typeof t == "string" ? new L([[document.querySelector(t)]], [document.documentElement]) : new L([[t]], Hn);
}
function ks(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function lt(t, e) {
  if (t = ks(t), e === void 0 && (e = t.currentTarget), e) {
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
var Ts = { value: () => {
} };
function De() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new Zt(n);
}
function Zt(t) {
  this._ = t;
}
function Ns(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
Zt.prototype = De.prototype = {
  constructor: Zt,
  on: function(t, e) {
    var n = this._, i = Ns(t + "", n), r, s = -1, o = i.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((r = (t = i[s]).type) && (r = Cs(n[r], t.name))) return r;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (r = (t = i[s]).type) n[r] = sn(n[r], t.name, e);
      else if (e == null) for (r in n) n[r] = sn(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Zt(t);
  },
  call: function(t, e) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), i = 0, r, s; i < r; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], i = 0, r = s.length; i < r; ++i) s[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, s = i.length; r < s; ++r) i[r].value.apply(e, n);
  }
};
function Cs(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function sn(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = Ts, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const be = { capture: !0, passive: !1 };
function Ee(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ps(t) {
  var e = t.document.documentElement, n = Q(t).on("dragstart.drag", Ee, be);
  "onselectstart" in e ? n.on("selectstart.drag", Ee, be) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Rs(t, e) {
  var n = t.document.documentElement, i = Q(t).on("dragstart.drag", null);
  e && (i.on("click.drag", Ee, be), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function He(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function qn(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function Ht() {
}
var Mt = 0.7, ie = 1 / Mt, vt = "\\s*([+-]?\\d+)\\s*", Ot = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Y = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ms = /^#([0-9a-f]{3,8})$/, Os = new RegExp(`^rgb\\(${vt},${vt},${vt}\\)$`), zs = new RegExp(`^rgb\\(${Y},${Y},${Y}\\)$`), Ls = new RegExp(`^rgba\\(${vt},${vt},${vt},${Ot}\\)$`), Us = new RegExp(`^rgba\\(${Y},${Y},${Y},${Ot}\\)$`), Ds = new RegExp(`^hsl\\(${Ot},${Y},${Y}\\)$`), Hs = new RegExp(`^hsla\\(${Ot},${Y},${Y},${Ot}\\)$`), on = {
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
He(Ht, zt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: an,
  // Deprecated! Use color.formatHex.
  formatHex: an,
  formatHex8: qs,
  formatHsl: Fs,
  formatRgb: ln,
  toString: ln
});
function an() {
  return this.rgb().formatHex();
}
function qs() {
  return this.rgb().formatHex8();
}
function Fs() {
  return Fn(this).formatHsl();
}
function ln() {
  return this.rgb().formatRgb();
}
function zt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Ms.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? cn(e) : n === 3 ? new O(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Bt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Bt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Os.exec(t)) ? new O(e[1], e[2], e[3], 1) : (e = zs.exec(t)) ? new O(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ls.exec(t)) ? Bt(e[1], e[2], e[3], e[4]) : (e = Us.exec(t)) ? Bt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ds.exec(t)) ? dn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Hs.exec(t)) ? dn(e[1], e[2] / 100, e[3] / 100, e[4]) : on.hasOwnProperty(t) ? cn(on[t]) : t === "transparent" ? new O(NaN, NaN, NaN, 0) : null;
}
function cn(t) {
  return new O(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Bt(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new O(t, e, n, i);
}
function Gs(t) {
  return t instanceof Ht || (t = zt(t)), t ? (t = t.rgb(), new O(t.r, t.g, t.b, t.opacity)) : new O();
}
function Ae(t, e, n, i) {
  return arguments.length === 1 ? Gs(t) : new O(t, e, n, i ?? 1);
}
function O(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
He(O, Ae, qn(Ht, {
  brighter(t) {
    return t = t == null ? ie : Math.pow(ie, t), new O(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Mt : Math.pow(Mt, t), new O(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new O(ft(this.r), ft(this.g), ft(this.b), re(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: un,
  // Deprecated! Use color.formatHex.
  formatHex: un,
  formatHex8: Bs,
  formatRgb: hn,
  toString: hn
}));
function un() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}`;
}
function Bs() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}${ut((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function hn() {
  const t = re(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ft(this.r)}, ${ft(this.g)}, ${ft(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function re(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ft(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ut(t) {
  return t = ft(t), (t < 16 ? "0" : "") + t.toString(16);
}
function dn(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new F(t, e, n, i);
}
function Fn(t) {
  if (t instanceof F) return new F(t.h, t.s, t.l, t.opacity);
  if (t instanceof Ht || (t = zt(t)), !t) return new F();
  if (t instanceof F) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), s = Math.max(e, n, i), o = NaN, a = s - r, l = (s + r) / 2;
  return a ? (e === s ? o = (n - i) / a + (n < i) * 6 : n === s ? o = (i - e) / a + 2 : o = (e - n) / a + 4, a /= l < 0.5 ? s + r : 2 - s - r, o *= 60) : a = l > 0 && l < 1 ? 0 : o, new F(o, a, l, t.opacity);
}
function Xs(t, e, n, i) {
  return arguments.length === 1 ? Fn(t) : new F(t, e, n, i ?? 1);
}
function F(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
He(F, Xs, qn(Ht, {
  brighter(t) {
    return t = t == null ? ie : Math.pow(ie, t), new F(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Mt : Math.pow(Mt, t), new F(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new O(
      ve(t >= 240 ? t - 240 : t + 120, r, i),
      ve(t, r, i),
      ve(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new F(fn(this.h), Xt(this.s), Xt(this.l), re(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = re(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${fn(this.h)}, ${Xt(this.s) * 100}%, ${Xt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function fn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Xt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ve(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Gn = (t) => () => t;
function Vs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ys(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function Ws(t) {
  return (t = +t) == 1 ? Bn : function(e, n) {
    return n - e ? Ys(e, n, t) : Gn(isNaN(e) ? n : e);
  };
}
function Bn(t, e) {
  var n = e - t;
  return n ? Vs(t, n) : Gn(isNaN(t) ? e : t);
}
const pn = (function t(e) {
  var n = Ws(e);
  function i(r, s) {
    var o = n((r = Ae(r)).r, (s = Ae(s)).r), a = n(r.g, s.g), l = n(r.b, s.b), c = Bn(r.opacity, s.opacity);
    return function(u) {
      return r.r = o(u), r.g = a(u), r.b = l(u), r.opacity = c(u), r + "";
    };
  }
  return i.gamma = t, i;
})(1);
function rt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Ie = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, we = new RegExp(Ie.source, "g");
function Ks(t) {
  return function() {
    return t;
  };
}
function Zs(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Js(t, e) {
  var n = Ie.lastIndex = we.lastIndex = 0, i, r, s, o = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (i = Ie.exec(t)) && (r = we.exec(e)); )
    (s = r.index) > n && (s = e.slice(n, s), a[o] ? a[o] += s : a[++o] = s), (i = i[0]) === (r = r[0]) ? a[o] ? a[o] += r : a[++o] = r : (a[++o] = null, l.push({ i: o, x: rt(i, r) })), n = we.lastIndex;
  return n < e.length && (s = e.slice(n), a[o] ? a[o] += s : a[++o] = s), a.length < 2 ? l[0] ? Zs(l[0].x) : Ks(e) : (e = l.length, function(c) {
    for (var u = 0, d; u < e; ++u) a[(d = l[u]).i] = d.x(c);
    return a.join("");
  });
}
var gn = 180 / Math.PI, Se = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Xn(t, e, n, i, r, s) {
  var o, a, l;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (l = t * n + e * i) && (n -= t * l, i -= e * l), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, l /= a), t * i < e * n && (t = -t, e = -e, l = -l, o = -o), {
    translateX: r,
    translateY: s,
    rotate: Math.atan2(e, t) * gn,
    skewX: Math.atan(l) * gn,
    scaleX: o,
    scaleY: a
  };
}
var Vt;
function Qs(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Se : Xn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function js(t) {
  return t == null || (Vt || (Vt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Vt.setAttribute("transform", t), !(t = Vt.transform.baseVal.consolidate())) ? Se : (t = t.matrix, Xn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Vn(t, e, n, i) {
  function r(c) {
    return c.length ? c.pop() + " " : "";
  }
  function s(c, u, d, f, g, v) {
    if (c !== d || u !== f) {
      var b = g.push("translate(", null, e, null, n);
      v.push({ i: b - 4, x: rt(c, d) }, { i: b - 2, x: rt(u, f) });
    } else (d || f) && g.push("translate(" + d + e + f + n);
  }
  function o(c, u, d, f) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), f.push({ i: d.push(r(d) + "rotate(", null, i) - 2, x: rt(c, u) })) : u && d.push(r(d) + "rotate(" + u + i);
  }
  function a(c, u, d, f) {
    c !== u ? f.push({ i: d.push(r(d) + "skewX(", null, i) - 2, x: rt(c, u) }) : u && d.push(r(d) + "skewX(" + u + i);
  }
  function l(c, u, d, f, g, v) {
    if (c !== d || u !== f) {
      var b = g.push(r(g) + "scale(", null, ",", null, ")");
      v.push({ i: b - 4, x: rt(c, d) }, { i: b - 2, x: rt(u, f) });
    } else (d !== 1 || f !== 1) && g.push(r(g) + "scale(" + d + "," + f + ")");
  }
  return function(c, u) {
    var d = [], f = [];
    return c = t(c), u = t(u), s(c.translateX, c.translateY, u.translateX, u.translateY, d, f), o(c.rotate, u.rotate, d, f), a(c.skewX, u.skewX, d, f), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, d, f), c = u = null, function(g) {
      for (var v = -1, b = f.length, A; ++v < b; ) d[(A = f[v]).i] = A.x(g);
      return d.join("");
    };
  };
}
var to = Vn(Qs, "px, ", "px)", "deg)"), eo = Vn(js, ", ", ")", ")"), no = 1e-12;
function mn(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function io(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function ro(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const so = (function t(e, n, i) {
  function r(s, o) {
    var a = s[0], l = s[1], c = s[2], u = o[0], d = o[1], f = o[2], g = u - a, v = d - l, b = g * g + v * v, A, y;
    if (b < no)
      y = Math.log(f / c) / e, A = function(it) {
        return [
          a + it * g,
          l + it * v,
          c * Math.exp(e * it * y)
        ];
      };
    else {
      var P = Math.sqrt(b), R = (f * f - c * c + i * b) / (2 * c * n * P), X = (f * f - c * c - i * b) / (2 * f * n * P), U = Math.log(Math.sqrt(R * R + 1) - R), D = Math.log(Math.sqrt(X * X + 1) - X);
      y = (D - U) / e, A = function(it) {
        var qt = it * y, Ft = mn(U), Gt = c / (n * P) * (Ft * ro(e * qt + U) - io(U));
        return [
          a + Gt * g,
          l + Gt * v,
          c * Ft / mn(e * qt + U)
        ];
      };
    }
    return A.duration = y * 1e3 * e / Math.SQRT2, A;
  }
  return r.rho = function(s) {
    var o = Math.max(1e-3, +s), a = o * o, l = a * a;
    return t(o, a, l);
  }, r;
})(Math.SQRT2, 2, 4);
var bt = 0, St = 0, At = 0, Yn = 1e3, se, kt, oe = 0, gt = 0, he = 0, Lt = typeof performance == "object" && performance.now ? performance : Date, Wn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function qe() {
  return gt || (Wn(oo), gt = Lt.now() + he);
}
function oo() {
  gt = 0;
}
function ae() {
  this._call = this._time = this._next = null;
}
ae.prototype = Kn.prototype = {
  constructor: ae,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? qe() : +n) + (e == null ? 0 : +e), !this._next && kt !== this && (kt ? kt._next = this : se = this, kt = this), this._call = t, this._time = n, ke();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ke());
  }
};
function Kn(t, e, n) {
  var i = new ae();
  return i.restart(t, e, n), i;
}
function ao() {
  qe(), ++bt;
  for (var t = se, e; t; )
    (e = gt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --bt;
}
function _n() {
  gt = (oe = Lt.now()) + he, bt = St = 0;
  try {
    ao();
  } finally {
    bt = 0, co(), gt = 0;
  }
}
function lo() {
  var t = Lt.now(), e = t - oe;
  e > Yn && (he -= e, oe = t);
}
function co() {
  for (var t, e = se, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : se = n);
  kt = t, ke(i);
}
function ke(t) {
  if (!bt) {
    St && (St = clearTimeout(St));
    var e = t - gt;
    e > 24 ? (t < 1 / 0 && (St = setTimeout(_n, t - Lt.now() - he)), At && (At = clearInterval(At))) : (At || (oe = Lt.now(), At = setInterval(lo, Yn)), bt = 1, Wn(_n));
  }
}
function yn(t, e, n) {
  var i = new ae();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var uo = De("start", "end", "cancel", "interrupt"), ho = [], Zn = 0, vn = 1, Te = 2, Jt = 3, wn = 4, Ne = 5, Qt = 6;
function de(t, e, n, i, r, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  fo(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: uo,
    tween: ho,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Zn
  });
}
function Fe(t, e) {
  var n = B(t, e);
  if (n.state > Zn) throw new Error("too late; already scheduled");
  return n;
}
function W(t, e) {
  var n = B(t, e);
  if (n.state > Jt) throw new Error("too late; already running");
  return n;
}
function B(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function fo(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = Kn(s, 0, n.time);
  function s(c) {
    n.state = vn, n.timer.restart(o, n.delay, n.time), n.delay <= c && o(c - n.delay);
  }
  function o(c) {
    var u, d, f, g;
    if (n.state !== vn) return l();
    for (u in i)
      if (g = i[u], g.name === n.name) {
        if (g.state === Jt) return yn(o);
        g.state === wn ? (g.state = Qt, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete i[u]) : +u < e && (g.state = Qt, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete i[u]);
      }
    if (yn(function() {
      n.state === Jt && (n.state = wn, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = Te, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Te) {
      for (n.state = Jt, r = new Array(f = n.tween.length), u = 0, d = -1; u < f; ++u)
        (g = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++d] = g);
      r.length = d + 1;
    }
  }
  function a(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = Ne, 1), d = -1, f = r.length; ++d < f; )
      r[d].call(t, u);
    n.state === Ne && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = Qt, n.timer.stop(), delete i[e];
    for (var c in i) return;
    delete t.__transition;
  }
}
function jt(t, e) {
  var n = t.__transition, i, r, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((i = n[o]).name !== e) {
        s = !1;
        continue;
      }
      r = i.state > Te && i.state < Ne, i.state = Qt, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function po(t) {
  return this.each(function() {
    jt(this, t);
  });
}
function go(t, e) {
  var n, i;
  return function() {
    var r = W(this, t), s = r.tween;
    if (s !== n) {
      i = n = s;
      for (var o = 0, a = i.length; o < a; ++o)
        if (i[o].name === e) {
          i = i.slice(), i.splice(o, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function mo(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = W(this, t), o = s.tween;
    if (o !== i) {
      r = (i = o).slice();
      for (var a = { name: e, value: n }, l = 0, c = r.length; l < c; ++l)
        if (r[l].name === e) {
          r[l] = a;
          break;
        }
      l === c && r.push(a);
    }
    s.tween = r;
  };
}
function _o(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = B(this.node(), n).tween, r = 0, s = i.length, o; r < s; ++r)
      if ((o = i[r]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? go : mo)(n, t, e));
}
function Ge(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = W(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return B(r, i).value[e];
  };
}
function Jn(t, e) {
  var n;
  return (typeof e == "number" ? rt : e instanceof zt ? pn : (n = zt(e)) ? (e = n, pn) : Js)(t, e);
}
function yo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function vo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function wo(t, e, n) {
  var i, r = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === r ? null : o === i ? s : s = e(i = o, n);
  };
}
function xo(t, e, n) {
  var i, r = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === r ? null : o === i ? s : s = e(i = o, n);
  };
}
function $o(t, e, n) {
  var i, r, s;
  return function() {
    var o, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), l = a + "", o === l ? null : o === i && l === r ? s : (r = l, s = e(i = o, a)));
  };
}
function bo(t, e, n) {
  var i, r, s;
  return function() {
    var o, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), l = a + "", o === l ? null : o === i && l === r ? s : (r = l, s = e(i = o, a)));
  };
}
function Eo(t, e) {
  var n = ue(t), i = n === "transform" ? eo : Jn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? bo : $o)(n, i, Ge(this, "attr." + t, e)) : e == null ? (n.local ? vo : yo)(n) : (n.local ? xo : wo)(n, i, e));
}
function Ao(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Io(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function So(t, e) {
  var n, i;
  function r() {
    var s = e.apply(this, arguments);
    return s !== i && (n = (i = s) && Io(t, s)), n;
  }
  return r._value = e, r;
}
function ko(t, e) {
  var n, i;
  function r() {
    var s = e.apply(this, arguments);
    return s !== i && (n = (i = s) && Ao(t, s)), n;
  }
  return r._value = e, r;
}
function To(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = ue(t);
  return this.tween(n, (i.local ? So : ko)(i, e));
}
function No(t, e) {
  return function() {
    Fe(this, t).delay = +e.apply(this, arguments);
  };
}
function Co(t, e) {
  return e = +e, function() {
    Fe(this, t).delay = e;
  };
}
function Po(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? No : Co)(e, t)) : B(this.node(), e).delay;
}
function Ro(t, e) {
  return function() {
    W(this, t).duration = +e.apply(this, arguments);
  };
}
function Mo(t, e) {
  return e = +e, function() {
    W(this, t).duration = e;
  };
}
function Oo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ro : Mo)(e, t)) : B(this.node(), e).duration;
}
function zo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    W(this, t).ease = e;
  };
}
function Lo(t) {
  var e = this._id;
  return arguments.length ? this.each(zo(e, t)) : B(this.node(), e).ease;
}
function Uo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    W(this, t).ease = n;
  };
}
function Do(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Uo(this._id, t));
}
function Ho(t) {
  typeof t != "function" && (t = Cn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var s = e[r], o = s.length, a = i[r] = [], l, c = 0; c < o; ++c)
      (l = s[c]) && t.call(l, l.__data__, c, s) && a.push(l);
  return new tt(i, this._parents, this._name, this._id);
}
function qo(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, s = Math.min(i, r), o = new Array(i), a = 0; a < s; ++a)
    for (var l = e[a], c = n[a], u = l.length, d = o[a] = new Array(u), f, g = 0; g < u; ++g)
      (f = l[g] || c[g]) && (d[g] = f);
  for (; a < i; ++a)
    o[a] = e[a];
  return new tt(o, this._parents, this._name, this._id);
}
function Fo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Go(t, e, n) {
  var i, r, s = Fo(e) ? Fe : W;
  return function() {
    var o = s(this, t), a = o.on;
    a !== i && (r = (i = a).copy()).on(e, n), o.on = r;
  };
}
function Bo(t, e) {
  var n = this._id;
  return arguments.length < 2 ? B(this.node(), n).on.on(t) : this.each(Go(n, t, e));
}
function Xo(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Vo() {
  return this.on("end.remove", Xo(this._id));
}
function Yo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Le(t));
  for (var i = this._groups, r = i.length, s = new Array(r), o = 0; o < r; ++o)
    for (var a = i[o], l = a.length, c = s[o] = new Array(l), u, d, f = 0; f < l; ++f)
      (u = a[f]) && (d = t.call(u, u.__data__, f, a)) && ("__data__" in u && (d.__data__ = u.__data__), c[f] = d, de(c[f], e, n, f, c, B(u, n)));
  return new tt(s, this._parents, e, n);
}
function Wo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Nn(t));
  for (var i = this._groups, r = i.length, s = [], o = [], a = 0; a < r; ++a)
    for (var l = i[a], c = l.length, u, d = 0; d < c; ++d)
      if (u = l[d]) {
        for (var f = t.call(u, u.__data__, d, l), g, v = B(u, n), b = 0, A = f.length; b < A; ++b)
          (g = f[b]) && de(g, e, n, b, f, v);
        s.push(f), o.push(u);
      }
  return new tt(s, o, e, n);
}
var Ko = Dt.prototype.constructor;
function Zo() {
  return new Ko(this._groups, this._parents);
}
function Jo(t, e) {
  var n, i, r;
  return function() {
    var s = $t(this, t), o = (this.style.removeProperty(t), $t(this, t));
    return s === o ? null : s === n && o === i ? r : r = e(n = s, i = o);
  };
}
function Qn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Qo(t, e, n) {
  var i, r = n + "", s;
  return function() {
    var o = $t(this, t);
    return o === r ? null : o === i ? s : s = e(i = o, n);
  };
}
function jo(t, e, n) {
  var i, r, s;
  return function() {
    var o = $t(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), $t(this, t))), o === l ? null : o === i && l === r ? s : (r = l, s = e(i = o, a));
  };
}
function ta(t, e) {
  var n, i, r, s = "style." + e, o = "end." + s, a;
  return function() {
    var l = W(this, t), c = l.on, u = l.value[s] == null ? a || (a = Qn(e)) : void 0;
    (c !== n || r !== u) && (i = (n = c).copy()).on(o, r = u), l.on = i;
  };
}
function ea(t, e, n) {
  var i = (t += "") == "transform" ? to : Jn;
  return e == null ? this.styleTween(t, Jo(t, i)).on("end.style." + t, Qn(t)) : typeof e == "function" ? this.styleTween(t, jo(t, i, Ge(this, "style." + t, e))).each(ta(this._id, t)) : this.styleTween(t, Qo(t, i, e), n).on("end.style." + t, null);
}
function na(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function ia(t, e, n) {
  var i, r;
  function s() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && na(t, o, n)), i;
  }
  return s._value = e, s;
}
function ra(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, ia(t, e, n ?? ""));
}
function sa(t) {
  return function() {
    this.textContent = t;
  };
}
function oa(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function aa(t) {
  return this.tween("text", typeof t == "function" ? oa(Ge(this, "text", t)) : sa(t == null ? "" : t + ""));
}
function la(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function ca(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && la(r)), e;
  }
  return i._value = t, i;
}
function ua(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, ca(t));
}
function ha() {
  for (var t = this._name, e = this._id, n = jn(), i = this._groups, r = i.length, s = 0; s < r; ++s)
    for (var o = i[s], a = o.length, l, c = 0; c < a; ++c)
      if (l = o[c]) {
        var u = B(l, e);
        de(l, t, n, c, o, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new tt(i, this._parents, t, n);
}
function da() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(s, o) {
    var a = { value: o }, l = { value: function() {
      --r === 0 && s();
    } };
    n.each(function() {
      var c = W(this, i), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), c.on = e;
    }), r === 0 && s();
  });
}
var fa = 0;
function tt(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function jn() {
  return ++fa;
}
var J = Dt.prototype;
tt.prototype = {
  constructor: tt,
  select: Yo,
  selectAll: Wo,
  selectChild: J.selectChild,
  selectChildren: J.selectChildren,
  filter: Ho,
  merge: qo,
  selection: Zo,
  transition: ha,
  call: J.call,
  nodes: J.nodes,
  node: J.node,
  size: J.size,
  empty: J.empty,
  each: J.each,
  on: Bo,
  attr: Eo,
  attrTween: To,
  style: ea,
  styleTween: ra,
  text: aa,
  textTween: ua,
  remove: Vo,
  tween: _o,
  delay: Po,
  duration: Oo,
  ease: Lo,
  easeVarying: Do,
  end: da,
  [Symbol.iterator]: J[Symbol.iterator]
};
function pa(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ga = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: pa
};
function ma(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function _a(t) {
  var e, n;
  t instanceof tt ? (e = t._id, t = t._name) : (e = jn(), (n = ga).time = qe(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, s = 0; s < r; ++s)
    for (var o = i[s], a = o.length, l, c = 0; c < a; ++c)
      (l = o[c]) && de(l, t, e, c, o, n || ma(l, e));
  return new tt(i, this._parents, t, e);
}
Dt.prototype.interrupt = po;
Dt.prototype.transition = _a;
const Yt = (t) => () => t;
function ya(t, {
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
function j(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
j.prototype = {
  constructor: j,
  scale: function(t) {
    return t === 1 ? this : new j(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new j(this.k, this.x + this.k * t, this.y + this.k * e);
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
var le = new j(1, 0, 0);
j.prototype;
function xe(t) {
  t.stopImmediatePropagation();
}
function It(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function va(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function wa() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function xn() {
  return this.__zoom || le;
}
function xa(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function $a() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ba(t, e, n) {
  var i = t.invertX(e[0][0]) - n[0][0], r = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function Ea() {
  var t = va, e = wa, n = ba, i = xa, r = $a, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = so, c = De("start", "zoom", "end"), u, d, f, g = 500, v = 150, b = 0, A = 10;
  function y(h) {
    h.property("__zoom", xn).on("wheel.zoom", qt, { passive: !1 }).on("mousedown.zoom", Ft).on("dblclick.zoom", Gt).filter(r).on("touchstart.zoom", ti).on("touchmove.zoom", ei).on("touchend.zoom touchcancel.zoom", ni).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(h, m, p, _) {
    var w = h.selection ? h.selection() : h;
    w.property("__zoom", xn), h !== w ? U(h, m, p, _) : w.interrupt().each(function() {
      D(this, arguments).event(_).start().zoom(null, typeof m == "function" ? m.apply(this, arguments) : m).end();
    });
  }, y.scaleBy = function(h, m, p, _) {
    y.scaleTo(h, function() {
      var w = this.__zoom.k, x = typeof m == "function" ? m.apply(this, arguments) : m;
      return w * x;
    }, p, _);
  }, y.scaleTo = function(h, m, p, _) {
    y.transform(h, function() {
      var w = e.apply(this, arguments), x = this.__zoom, $ = p == null ? X(w) : typeof p == "function" ? p.apply(this, arguments) : p, E = x.invert($), I = typeof m == "function" ? m.apply(this, arguments) : m;
      return n(R(P(x, I), $, E), w, o);
    }, p, _);
  }, y.translateBy = function(h, m, p, _) {
    y.transform(h, function() {
      return n(this.__zoom.translate(
        typeof m == "function" ? m.apply(this, arguments) : m,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), e.apply(this, arguments), o);
    }, null, _);
  }, y.translateTo = function(h, m, p, _, w) {
    y.transform(h, function() {
      var x = e.apply(this, arguments), $ = this.__zoom, E = _ == null ? X(x) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(le.translate(E[0], E[1]).scale($.k).translate(
        typeof m == "function" ? -m.apply(this, arguments) : -m,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), x, o);
    }, _, w);
  };
  function P(h, m) {
    return m = Math.max(s[0], Math.min(s[1], m)), m === h.k ? h : new j(m, h.x, h.y);
  }
  function R(h, m, p) {
    var _ = m[0] - p[0] * h.k, w = m[1] - p[1] * h.k;
    return _ === h.x && w === h.y ? h : new j(h.k, _, w);
  }
  function X(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function U(h, m, p, _) {
    h.on("start.zoom", function() {
      D(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      D(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var w = this, x = arguments, $ = D(w, x).event(_), E = e.apply(w, x), I = p == null ? X(E) : typeof p == "function" ? p.apply(w, x) : p, V = Math.max(E[1][0] - E[0][0], E[1][1] - E[0][1]), N = w.__zoom, H = typeof m == "function" ? m.apply(w, x) : m, K = l(N.invert(I).concat(V / N.k), H.invert(I).concat(V / H.k));
      return function(q) {
        if (q === 1) q = H;
        else {
          var Z = K(q), fe = V / Z[2];
          q = new j(fe, I[0] - Z[0] * fe, I[1] - Z[1] * fe);
        }
        $.zoom(null, q);
      };
    });
  }
  function D(h, m, p) {
    return !p && h.__zooming || new it(h, m);
  }
  function it(h, m) {
    this.that = h, this.args = m, this.active = 0, this.sourceEvent = null, this.extent = e.apply(h, m), this.taps = 0;
  }
  it.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, m) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = m.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = m.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = m.invert(this.touch1[0])), this.that.__zoom = m, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var m = Q(this.that).datum();
      c.call(
        h,
        this.that,
        new ya(h, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        m
      );
    }
  };
  function qt(h, ...m) {
    if (!t.apply(this, arguments)) return;
    var p = D(this, m).event(h), _ = this.__zoom, w = Math.max(s[0], Math.min(s[1], _.k * Math.pow(2, i.apply(this, arguments)))), x = lt(h);
    if (p.wheel)
      (p.mouse[0][0] !== x[0] || p.mouse[0][1] !== x[1]) && (p.mouse[1] = _.invert(p.mouse[0] = x)), clearTimeout(p.wheel);
    else {
      if (_.k === w) return;
      p.mouse = [x, _.invert(x)], jt(this), p.start();
    }
    It(h), p.wheel = setTimeout($, v), p.zoom("mouse", n(R(P(_, w), p.mouse[0], p.mouse[1]), p.extent, o));
    function $() {
      p.wheel = null, p.end();
    }
  }
  function Ft(h, ...m) {
    if (f || !t.apply(this, arguments)) return;
    var p = h.currentTarget, _ = D(this, m, !0).event(h), w = Q(h.view).on("mousemove.zoom", I, !0).on("mouseup.zoom", V, !0), x = lt(h, p), $ = h.clientX, E = h.clientY;
    Ps(h.view), xe(h), _.mouse = [x, this.__zoom.invert(x)], jt(this), _.start();
    function I(N) {
      if (It(N), !_.moved) {
        var H = N.clientX - $, K = N.clientY - E;
        _.moved = H * H + K * K > b;
      }
      _.event(N).zoom("mouse", n(R(_.that.__zoom, _.mouse[0] = lt(N, p), _.mouse[1]), _.extent, o));
    }
    function V(N) {
      w.on("mousemove.zoom mouseup.zoom", null), Rs(N.view, _.moved), It(N), _.event(N).end();
    }
  }
  function Gt(h, ...m) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, _ = lt(h.changedTouches ? h.changedTouches[0] : h, this), w = p.invert(_), x = p.k * (h.shiftKey ? 0.5 : 2), $ = n(R(P(p, x), _, w), e.apply(this, m), o);
      It(h), a > 0 ? Q(this).transition().duration(a).call(U, $, _, h) : Q(this).call(y.transform, $, _, h);
    }
  }
  function ti(h, ...m) {
    if (t.apply(this, arguments)) {
      var p = h.touches, _ = p.length, w = D(this, m, h.changedTouches.length === _).event(h), x, $, E, I;
      for (xe(h), $ = 0; $ < _; ++$)
        E = p[$], I = lt(E, this), I = [I, this.__zoom.invert(I), E.identifier], w.touch0 ? !w.touch1 && w.touch0[2] !== I[2] && (w.touch1 = I, w.taps = 0) : (w.touch0 = I, x = !0, w.taps = 1 + !!u);
      u && (u = clearTimeout(u)), x && (w.taps < 2 && (d = I[0], u = setTimeout(function() {
        u = null;
      }, g)), jt(this), w.start());
    }
  }
  function ei(h, ...m) {
    if (this.__zooming) {
      var p = D(this, m).event(h), _ = h.changedTouches, w = _.length, x, $, E, I;
      for (It(h), x = 0; x < w; ++x)
        $ = _[x], E = lt($, this), p.touch0 && p.touch0[2] === $.identifier ? p.touch0[0] = E : p.touch1 && p.touch1[2] === $.identifier && (p.touch1[0] = E);
      if ($ = p.that.__zoom, p.touch1) {
        var V = p.touch0[0], N = p.touch0[1], H = p.touch1[0], K = p.touch1[1], q = (q = H[0] - V[0]) * q + (q = H[1] - V[1]) * q, Z = (Z = K[0] - N[0]) * Z + (Z = K[1] - N[1]) * Z;
        $ = P($, Math.sqrt(q / Z)), E = [(V[0] + H[0]) / 2, (V[1] + H[1]) / 2], I = [(N[0] + K[0]) / 2, (N[1] + K[1]) / 2];
      } else if (p.touch0) E = p.touch0[0], I = p.touch0[1];
      else return;
      p.zoom("touch", n(R($, E, I), p.extent, o));
    }
  }
  function ni(h, ...m) {
    if (this.__zooming) {
      var p = D(this, m).event(h), _ = h.changedTouches, w = _.length, x, $;
      for (xe(h), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, g), x = 0; x < w; ++x)
        $ = _[x], p.touch0 && p.touch0[2] === $.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === $.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && ($ = lt($, this), Math.hypot(d[0] - $[0], d[1] - $[1]) < A)) {
        var E = Q(this).on("dblclick.zoom");
        E && E.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : Yt(+h), y) : i;
  }, y.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : Yt(!!h), y) : t;
  }, y.touchable = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : Yt(!!h), y) : r;
  }, y.extent = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : Yt([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), y) : e;
  }, y.scaleExtent = function(h) {
    return arguments.length ? (s[0] = +h[0], s[1] = +h[1], y) : [s[0], s[1]];
  }, y.translateExtent = function(h) {
    return arguments.length ? (o[0][0] = +h[0][0], o[1][0] = +h[1][0], o[0][1] = +h[0][1], o[1][1] = +h[1][1], y) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, y.constrain = function(h) {
    return arguments.length ? (n = h, y) : n;
  }, y.duration = function(h) {
    return arguments.length ? (a = +h, y) : a;
  }, y.interpolate = function(h) {
    return arguments.length ? (l = h, y) : l;
  }, y.on = function() {
    var h = c.on.apply(c, arguments);
    return h === c ? y : h;
  }, y.clickDistance = function(h) {
    return arguments.length ? (b = (h = +h) * h, y) : Math.sqrt(b);
  }, y.tapDistance = function(h) {
    return arguments.length ? (A = +h, y) : A;
  }, y;
}
var Aa = Object.defineProperty, Ia = Object.getOwnPropertyDescriptor, nt = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Ia(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && Aa(e, n, r), r;
};
let G = class extends dt {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !0, this._t = le, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._fitted = !1, this._onKeyDown = (t) => {
      if (!this._editingId) {
        if ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z") {
          t.preventDefault(), this.emit("undo-requested");
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
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("keydown", this._onKeyDown);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown), super.disconnectedCallback();
  }
  commitRename(t, e) {
    if (this._editingId !== t.id) return;
    this._editingId = null;
    const n = e.trim();
    n && n !== t.label && this.emit("node-renamed", { id: t.id, kind: t.kind, name: n });
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector("svg");
    this._zoomBehavior = Ea().scaleExtent([0.15, 4]).filter((e) => {
      const n = e.target;
      return n.closest("[data-node-id]") || n.closest("[data-handle]") ? e.type === "wheel" : e.type === "wheel" || e.button === 0;
    }).on("zoom", (e) => {
      this._t = e.transform;
    }), Q(t).call(this._zoomBehavior);
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
    const e = this.scene.nodes, n = this.renderRoot.querySelector("svg");
    if (!e.length || !n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return;
    const r = Math.min(...e.map((u) => u.x - u.w / 2)) - t, s = Math.max(...e.map((u) => u.x + u.w / 2)) + t, o = Math.min(...e.map((u) => u.y - u.h / 2)) - t, a = Math.max(...e.map((u) => u.y + u.h / 2)) + t, l = Math.max(0.15, Math.min(i.width / (s - r), i.height / (a - o), 1.25)), c = le.translate(i.width / 2 - l * (r + s) / 2, i.height / 2 - l * (o + a) / 2).scale(l);
    Q(n).call(this._zoomBehavior.transform, c);
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
    if (t.button !== 0) return;
    t.stopPropagation(), this.focus();
    const n = this.toScene(t), i = this.nodePos(e);
    let r = !1;
    const s = (a) => {
      const l = this.toScene(a), c = l.x - n.x, u = l.y - n.y;
      !r && Math.hypot(c, u) < 3 / this._t.k || (r = !0, this._dragPos = { id: e.id, x: i.x + c, y: i.y + u });
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), r && this._dragPos ? this.emit("node-moved", { id: e.id, x: this._dragPos.x, y: this._dragPos.y }) : this.emit("element-selected", { elementType: "node", id: e.id, kind: e.kind });
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(t, e) {
    if (t.button !== 0) return;
    t.stopPropagation();
    const n = this.toScene(t);
    this._pendingLink = { sourceId: e.id, x: n.x, y: n.y };
    const i = (s) => {
      var c;
      const o = this.toScene(s);
      this._pendingLink = { sourceId: e.id, x: o.x, y: o.y };
      const a = (c = this.shadowRoot) == null ? void 0 : c.elementFromPoint(s.clientX, s.clientY), l = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = l ? l.getAttribute("data-node-id") : null;
    }, r = (s) => {
      var l, c;
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", r);
      const o = (l = this.shadowRoot) == null ? void 0 : l.elementFromPoint(s.clientX, s.clientY), a = (c = o == null ? void 0 : o.closest("[data-node-id]")) == null ? void 0 : c.getAttribute("data-node-id");
      a && a !== e.id && this.emit("connect-requested", { sourceId: e.id, targetId: a }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", r);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(t, e, n) {
    const { x: i, y: r } = this.nodePos(t), s = e - i, o = n - r, a = t.w / 2, l = t.h / 2;
    if (s === 0 && o === 0) return { x: i, y: r };
    const c = 1 / Math.max(Math.abs(s) / a, Math.abs(o) / l);
    return { x: i + s * c, y: r + o * c };
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
    const e = this.scene.nodes.find((d) => d.id === t.sourceId), n = this.scene.nodes.find((d) => d.id === t.targetId);
    if (!e || !n) return M``;
    const i = this.nodePos(e), r = this.nodePos(n);
    let s = this.borderPoint(e, r.x, r.y), o = this.borderPoint(n, i.x, i.y);
    const a = this.edgeOffset(t);
    if (a !== 0) {
      const d = Math.hypot(o.x - s.x, o.y - s.y) || 1, f = -(o.y - s.y) / d * a, g = (o.x - s.x) / d * a;
      s = { x: s.x + f, y: s.y + g }, o = { x: o.x + f, y: o.y + g };
    }
    const l = t.color ?? "#64748b", c = { x: (s.x + o.x) / 2, y: (s.y + o.y) / 2 }, u = this.selectedId === t.id;
    return M`
      <g data-edge-id=${t.id}>
        <line class="edge-hit" x1=${s.x} y1=${s.y} x2=${o.x} y2=${o.y}
              stroke="transparent" stroke-width="14"
              @click=${(d) => {
      d.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: t.id, kind: t.kind });
    }}>
          ${t.tooltip ? M`<title>${t.tooltip}</title>` : ""}
        </line>
        <line x1=${s.x} y1=${s.y} x2=${o.x} y2=${o.y}
              stroke=${l} stroke-width=${u ? 3 : 1.6}
              stroke-dasharray=${t.dashed ? "6 4" : ""}
              marker-end=${t.arrow ? `url(#arrow-${this.markerId(l)})` : ""}
              pointer-events="none"></line>
        ${t.label ? M`<text x=${c.x} y=${c.y - 6} text-anchor="middle"
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
    const { x: e, y: n } = this.nodePos(t), i = this.selectedId === t.id, r = this._hoverNodeId === t.id, s = t.w / 2, o = t.h / 2;
    return M`
      <g data-node-id=${t.id} transform="translate(${e}, ${n})"
         @pointerdown=${(a) => this.onNodePointerDown(a, t)}
         @dblclick=${(a) => {
      a.stopPropagation(), this.emit("element-activated", { elementType: "node", id: t.id, kind: t.kind });
    }}>
        <rect x=${-s} y=${-o} width=${t.w} height=${t.h} rx="10"
              fill=${t.fill ?? "#ffffff"}
              stroke=${r || i ? "#2563eb" : t.stroke ?? "#94a3b8"}
              stroke-width=${i || r ? 2.5 : 1.4}
              stroke-dasharray=${t.dashed ? "6 4" : ""}>
          ${t.tooltip ? M`<title>${t.tooltip}</title>` : ""}
        </rect>
        ${t.badge ? M`<text x=${-s} y=${-o - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${t.badge}</text>` : ""}
        ${this._editingId === t.id ? M`
              <foreignObject x=${-s + 6} y="-14" width=${t.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: center; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${t.label}
                  @pointerdown=${(a) => a.stopPropagation()}
                  @keydown=${(a) => {
      a.stopPropagation(), a.key === "Enter" && this.commitRename(t, a.target.value), a.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(a) => this.commitRename(t, a.target.value)}
                />
              </foreignObject>` : M`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
              font-family="ui-sans-serif, system-ui" fill="#1e293b">${t.label}</text>`}
        ${i && this.connectable ? [
      [s, 0],
      [-s, 0],
      [0, o],
      [0, -o]
    ].map(
      ([a, l]) => M`
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
    if (!this._pendingLink) return M``;
    const t = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!t) return M``;
    const e = this.borderPoint(t, this._pendingLink.x, this._pendingLink.y);
    return M`
      <line x1=${e.x} y1=${e.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  render() {
    const t = [...new Set(this.scene.edges.map((e) => e.color ?? "#64748b"))];
    return k`
      <svg
        class=${this._pendingLink ? "linking" : ""}
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
      (e) => M`
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
    `;
  }
};
G.styles = Re`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--modux-canvas-bg, #fafafa);
      overflow: hidden;
      outline: none;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }
    svg.linking {
      cursor: crosshair;
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
nt([
  mt({ attribute: !1 })
], G.prototype, "scene", 2);
nt([
  mt({ attribute: !1 })
], G.prototype, "selectedId", 2);
nt([
  mt({ type: Boolean })
], G.prototype, "connectable", 2);
nt([
  S()
], G.prototype, "_t", 2);
nt([
  S()
], G.prototype, "_dragPos", 2);
nt([
  S()
], G.prototype, "_pendingLink", 2);
nt([
  S()
], G.prototype, "_hoverNodeId", 2);
nt([
  S()
], G.prototype, "_editingId", 2);
G = nt([
  ze("modux-canvas")
], G);
var Sa = Object.defineProperty, ka = Object.getOwnPropertyDescriptor, z = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? ka(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && Sa(e, n, r), r;
};
const Ta = [
  "PARTNERSHIP",
  "SHARED_KERNEL",
  "CUSTOMER_SUPPLIER",
  "CONFORMIST",
  "OPEN_HOST_SERVICE",
  "ANTI_CORRUPTION_LAYER",
  "PUBLISHED_LANGUAGE",
  "SEPARATE_WAYS"
], Na = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 }
], Ca = ["CORE", "SUPPORTING", "GENERIC"], Wt = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Pa(t, e) {
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
let C = class extends dt {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [];
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  command(t, e = !0) {
    if (e) {
      const n = this.inverseOf(t);
      n && (this._undoStack = [...this._undoStack.slice(-19), n]);
    }
    this.emit("modux-command", { command: t });
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
  undo() {
    const t = this._undoStack[this._undoStack.length - 1];
    if (t) {
      this._undoStack = this._undoStack.slice(0, -1);
      for (const e of t) this.command(e, !1);
    }
  }
  onNodeMoved(t) {
    const { id: e, x: n, y: i } = t.detail, r = {
      ...this.layout,
      [this._view]: { ...this.layout[this._view] ?? {}, [e]: { x: n, y: i } }
    };
    this.layout = r, this.emit("layout-changed", { layout: r });
  }
  onConnectRequested(t) {
    const { sourceId: e, targetId: n } = t.detail;
    if (this._view === "context-map") {
      const i = new Set(this.model.externalSystems.map((s) => s.id));
      if (i.has(e) || i.has(n) || this.model.relations.some(
        (s) => s.sourceId === e && s.targetId === n || s.sourceId === n && s.targetId === e
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
      if ((this.model.aggregates ?? []).some((s) => s.moduleId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: n });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((s) => s.aggregateId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate", id: n });
      return;
    }
    if (e === "node" && i === "flow") {
      this._selectedId = null, this.command({ kind: "remove-flow", id: n.replace(/^flow:/, "") });
      return;
    }
    e === "node" && i === "process" && (this._selectedId = null, this.command({ kind: "remove-process", id: n }));
  }
  onNodeRenamed(t) {
    const { id: e, kind: n, name: i } = t.detail;
    (n === "module" || n === "aggregate" || n === "entity") && this.command({ kind: "rename-element", type: n, id: e.replace(/^tgt:/, ""), name: i });
  }
  onElementSelected(t) {
    this._selectedId = t.detail.id, this.emit("modux-select", { elementType: t.detail.kind, id: t.detail.id });
  }
  onElementActivated(t) {
    const e = Pa(t.detail.id, t.detail.kind);
    e && this.emit("modux-activate", e);
  }
  createElementFromToolbar() {
    var e, n, i, r, s, o, a;
    const t = this._newName.trim();
    if (t) {
      if (this._view === "context-map")
        this.command({
          kind: "add-module",
          id: `mod-${Wt(t)}`,
          name: t,
          subdomainType: this._newSubdomain
        });
      else if (this._view === "aggregates") {
        const l = this._newModuleId || ((e = this.model.modules[0]) == null ? void 0 : e.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${Wt(t)}`, name: t, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id), c = this._newTargetId || ((r = this.model.modules[0]) == null ? void 0 : r.id), u = this._newTriggerEvent.trim();
        if (!l || !c || !u) return;
        this.command({
          kind: "add-flow",
          id: `flow-${Wt(t)}`,
          name: t,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: u,
          targetId: c
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newModuleId || ((s = this.model.modules[0]) == null ? void 0 : s.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${Wt(t)}`,
          name: t,
          moduleId: l,
          triggerAggregateId: this._newTriggerAggId || ((a = (o = this.model.aggregates) == null ? void 0 : o[0]) == null ? void 0 : a.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  render() {
    const t = this.layout[this._view] ?? {}, e = this._view === "aggregates" ? mi(this.model, t) : this._view === "flows" ? Ai(this.model, t) : this._view === "processes" ? Ti(this.model, t) : ci(this.model, t);
    return k`
      <div class="toolbar">
        <div class="tabs">
          ${Na.map(
      (n) => k`
              <button
                class="tab"
                ?data-active=${this._view === n.id}
                ?disabled=${!n.ready}
                title=${n.ready ? "" : "Próximamente"}
                @click=${() => this._view = n.id}
              >
                ${n.label}
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
          @input=${(n) => this._newName = n.target.value}
          @keydown=${(n) => n.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "context-map" ? k`<select
              title="Subdominio del nuevo contexto"
              @change=${(n) => this._newSubdomain = n.target.value}
            >
              ${Ca.map(
      (n) => k`<option value=${n} ?selected=${n === this._newSubdomain}>${n}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" ? k`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(n) => this._newModuleId = n.target.value}
            >
              ${this.model.modules.map(
      (n) => {
        var i;
        return k`<option
                    value=${n.id}
                    ?selected=${n.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${n.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? k`
              ${this._view === "flows" ? k`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(n) => this._newArchetype = n.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (n) => k`<option value=${n} ?selected=${n === this._newArchetype}>${n}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(n) => this._newTriggerAggId = n.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (n) => {
        var i, r;
        return k`<option
                      value=${n.id}
                      ?selected=${n.id === (this._newTriggerAggId || ((r = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : r.id))}
                    >
                      ${n.name}
                    </option>`;
      }
    )}
              </select>
              <input
                class="new-name evt"
                placeholder="Evento trigger…"
                .value=${this._newTriggerEvent}
                @input=${(n) => this._newTriggerEvent = n.target.value}
                @keydown=${(n) => n.key === "Enter" && this.createElementFromToolbar()}
              />
              ${this._view === "flows" ? k`<select
                    title="Destino del nuevo flow"
                    @change=${(n) => this._newTargetId = n.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (n) => {
        var i;
        return k`<option
                          value=${n.id}
                          ?selected=${n.id === (this._newTargetId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                        >
                          ${n.name}
                        </option>`;
      }
    )}
                  </select>` : ""}
            ` : ""}
        <button class="tab" @click=${this.createElementFromToolbar}>＋ Crear</button>
        <button
          class="tab"
          title="Deshacer el último cambio (Ctrl+Z)"
          ?disabled=${this._undoStack.length === 0}
          @click=${this.undo}
        >
          ↶ Deshacer
        </button>
        <label for="relation-type" ?hidden=${this._view !== "context-map"}>Nueva relación:</label>
        <select
          ?hidden=${this._view !== "context-map"}
          id="relation-type"
          .value=${this._relationType}
          @change=${(n) => this._relationType = n.target.value}
        >
          ${Ta.map(
      (n) => k`<option value=${n} ?selected=${n === this._relationType}>${n}</option>`
    )}
        </select>
        <button
          class="tab"
          title="Ajustar el diagrama a la ventana"
          @click=${() => {
      var n;
      return (n = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : n.fit();
    }}
        >
          ⌖ Ajustar
        </button>
      </div>
      <modux-canvas
        .scene=${e}
        .selectedId=${this._selectedId}
        .connectable=${this._view === "context-map"}
        @node-moved=${this.onNodeMoved}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
        @node-renamed=${this.onNodeRenamed}
        @undo-requested=${this.undo}
        @element-selected=${this.onElementSelected}
        @element-activated=${this.onElementActivated}
        @selection-cleared=${() => {
      this._selectedId = null, this.emit("modux-select", null);
    }}
      ></modux-canvas>
      <div class="hint">
        ${this._view === "context-map" ? k`Arrastra para reordenar · asa azul → crear relación (${this._relationType}) · Supr
            borra la relación o el contexto vacío seleccionado · F2 renombra · doble click abre el
            CRUD · rueda para zoom` : k`Arrastra para reordenar · click para seleccionar · Supr borra (si está vacío) · F2
            renombra · doble click abre el CRUD · rueda para zoom`}
      </div>
    `;
  }
};
C.styles = Re`
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
z([
  mt({ attribute: !1 })
], C.prototype, "model", 2);
z([
  mt({ attribute: !1 })
], C.prototype, "layout", 2);
z([
  S()
], C.prototype, "_view", 2);
z([
  S()
], C.prototype, "_relationType", 2);
z([
  S()
], C.prototype, "_selectedId", 2);
z([
  S()
], C.prototype, "_newName", 2);
z([
  S()
], C.prototype, "_newSubdomain", 2);
z([
  S()
], C.prototype, "_newModuleId", 2);
z([
  S()
], C.prototype, "_newArchetype", 2);
z([
  S()
], C.prototype, "_newTriggerAggId", 2);
z([
  S()
], C.prototype, "_newTriggerEvent", 2);
z([
  S()
], C.prototype, "_newTargetId", 2);
z([
  S()
], C.prototype, "_undoStack", 2);
C = z([
  ze("modux-editor")
], C);
var Ra = Object.defineProperty, Ma = Object.getOwnPropertyDescriptor, _t = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Ma(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && Ra(e, n, r), r;
};
let et = class extends dt {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._toast = null;
  }
  connectedCallback() {
    super.connectedCallback(), this.reload();
  }
  disconnectedCallback() {
    window.clearTimeout(this._layoutTimer), super.disconnectedCallback();
  }
  async reload() {
    try {
      const [t, e] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/layout`)
      ]);
      if (!t.ok) throw new Error(`GET ${this.base}/model → ${t.status}`);
      this._model = await t.json(), this._layout = e.ok ? await e.json() : {}, this._error = null;
    } catch (t) {
      this._error = String(t);
    }
  }
  showToast(t) {
    this._toast = t, window.clearTimeout(this._toastTimer), this._toastTimer = window.setTimeout(() => this._toast = null, 5e3);
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
        let r = `El servidor rechazó el comando (${n.status})`;
        try {
          const s = await n.json();
          s != null && s.message && (r = s.message);
        } catch {
        }
        this.showToast(r);
        return;
      }
      const i = await fetch(`${this.base}/model`);
      i.ok && (this._model = await i.json());
    } catch (n) {
      this.showToast(String(n));
    } finally {
      this._saving = !1;
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
    return this._error ? k`<div class="status error">modux editor: ${this._error}</div>` : this._model ? k`
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? k`<div class="toast" role="alert" @click=${() => this._toast = null}>
            ⚠ ${this._toast}
          </div>` : ""}
    ` : k`<div class="status">Cargando el modelo…</div>`;
  }
};
et.styles = Re`
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
  `;
_t([
  mt()
], et.prototype, "base", 2);
_t([
  S()
], et.prototype, "_model", 2);
_t([
  S()
], et.prototype, "_layout", 2);
_t([
  S()
], et.prototype, "_error", 2);
_t([
  S()
], et.prototype, "_saving", 2);
_t([
  S()
], et.prototype, "_toast", 2);
et = _t([
  ze("modux-editor-connected")
], et);
export {
  G as ModuxCanvas,
  C as ModuxEditor,
  et as ModuxEditorConnected,
  mi as aggregatesScene,
  ci as contextMapScene,
  ai as flowCoherence,
  Ai as flowsScene,
  Ti as processesScene,
  oi as relationEdgeId
};
