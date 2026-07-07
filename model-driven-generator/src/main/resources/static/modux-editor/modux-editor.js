const rl = 34, ol = 10;
function fi(t, e = { w: 160, h: 90 }) {
  let n = e.w, i = e.h;
  for (const s of t)
    n = Math.max(n, 2 * (Math.abs(s.dx) + s.w / 2 + 10)), i = Math.max(
      i,
      2 * (34 + s.h / 2 - s.dy),
      // child's top edge below the header band
      2 * (10 + s.h / 2 + s.dy)
      // child's bottom edge above the inset
    );
  return { w: n, h: i };
}
function pi(t, e, n) {
  let i = e.w / 2, s = e.w / 2, r = e.h / 2, o = e.h / 2;
  for (const l of n)
    i = Math.max(i, -l.dx + l.w / 2 + 10), s = Math.max(s, l.dx + l.w / 2 + 10), r = Math.max(r, -l.dy + l.h / 2 + 34), o = Math.max(o, l.dy + l.h / 2 + 10);
  return {
    x: t.x + (s - i) / 2,
    y: t.y + (o - r) / 2,
    w: i + s,
    h: r + o
  };
}
function mi(t) {
  if (!t) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in t && typeof t.nodes == "object" && !("x" in t.nodes)) {
    const e = t;
    return { nodes: e.nodes ?? {}, edges: e.edges ?? {}, sizes: e.sizes ?? {}, detail: e.detail };
  }
  return { nodes: t, edges: {}, sizes: {} };
}
const gi = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, _i = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, yi = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, ke = 168, Se = 56, Tn = 34, Nn = 14, wi = 14, Pt = 108, Rt = 32, Cn = 12, Mn = 10, Lt = 2, vi = Lt * Pt + (Lt - 1) * Cn + 2 * Nn;
function xi(t, e) {
  return `rel:${t}->${e}`;
}
function $i(t, e) {
  const n = new Set(t.externalSystems.map((i) => i.id));
  return e.sourceId === e.targetId ? "INTERNAL" : n.has(e.sourceId) || n.has(e.targetId) ? "EXTERNAL" : t.relations.some((i) => i.sourceId === e.sourceId && i.targetId === e.targetId) ? "OK" : t.relations.some((i) => i.sourceId === e.targetId && i.targetId === e.sourceId) ? "REVERSED" : "MISSING_RELATION";
}
function bi(t, e) {
  const n = 2 * Math.PI * t / Math.max(e, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const Ii = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" }
}, Ei = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio"
};
function ki(t) {
  const e = Math.max(1, Math.ceil(t / Lt)), n = e * Rt + (e - 1) * Mn;
  return { w: vi, h: Tn + n + wi };
}
function Si(t, e) {
  const n = t % Lt, i = Math.floor(t / Lt);
  return {
    x: -e.w / 2 + Nn + n * (Pt + Cn) + Pt / 2,
    y: -e.h / 2 + Tn + i * (Rt + Mn) + Rt / 2
  };
}
function Ai(t, e, n, i, s, r) {
  const l = [
    ...(t.aggregates ?? []).filter((p) => p.moduleId === e.id).map((p) => ({ id: p.id, name: p.name, kind: "aggregate" })),
    ...(e.useCases ?? []).map((p) => ({ id: p.id, name: p.name, kind: "use-case" })),
    ...(e.domainEvents ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "domain-event" })
    )
  ];
  if (!l.length)
    return [{ ...i, x: n.x, y: n.y, w: ke, h: Se }];
  const a = r[e.id] ?? ki(l.length), d = l.map((p, g) => s[p.id] ?? Si(g, a)), c = pi(
    n,
    a,
    d.map((p) => ({ dx: p.x, dy: p.y, w: Pt, h: Rt }))
  ), h = {
    ...i,
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    container: !0
  }, u = l.map((p, g) => {
    const _ = d[g], b = Ii[p.kind];
    return {
      id: p.id,
      label: p.name,
      kind: p.kind,
      x: n.x + _.x,
      y: n.y + _.y,
      w: Pt,
      h: Rt,
      symbol: b.symbol,
      fill: b.fill,
      stroke: b.stroke,
      parentId: e.id,
      tooltip: `${Ei[p.kind]} ${p.name}`
    };
  });
  return [h, ...u];
}
function Ti(t, e, n = !1, i = {}) {
  const s = [
    ...t.modules.map((a) => ({ ref: a, external: !1 })),
    ...t.externalSystems.map((a) => ({ ref: a, external: !0 }))
  ], r = s.flatMap((a, d) => {
    const c = e[a.ref.id] ?? bi(d, s.length);
    if (a.external)
      return [
        {
          id: a.ref.id,
          label: a.ref.name,
          x: c.x,
          y: c.y,
          w: ke,
          h: Se,
          kind: "external-system",
          symbol: "component",
          fill: "#ffffff",
          stroke: "#64748b",
          dashed: !0,
          badge: "EXTERNAL",
          tooltip: `${a.ref.name} (sistema externo)`
        }
      ];
    const h = a.ref, u = h.subdomainType ?? "GENERIC", p = {
      id: h.id,
      label: h.name,
      kind: "module",
      symbol: "component",
      fill: gi[u],
      stroke: "#94a3b8",
      badge: u,
      tooltip: `${h.name} — subdominio ${u}`
    };
    return n ? Ai(t, h, c, p, e, i) : [{ ...p, x: c.x, y: c.y, w: ke, h: Se }];
  });
  r.sort((a, d) => (a.parentId ? 1 : 0) - (d.parentId ? 1 : 0));
  const o = t.relations.map((a) => ({
    id: xi(a.sourceId, a.targetId),
    sourceId: a.sourceId,
    targetId: a.targetId,
    kind: "relation",
    label: _i[a.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${a.type} (${a.sourceId} upstream → ${a.targetId} downstream)`
  })), l = t.flows.map((a) => {
    const d = $i(t, a);
    return {
      id: `flow:${a.id}`,
      sourceId: a.sourceId,
      targetId: a.targetId,
      kind: "flow",
      label: a.name,
      color: yi[d],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${a.name} [${a.archetype}] — ${d}`
    };
  });
  return { nodes: r, edges: [...o, ...l] };
}
const Ni = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ci = 176, Mi = 60, Pi = 140, Ri = 40;
function Li(t) {
  const e = {}, n = t.aggregates ?? [], i = t.entities ?? [];
  return t.modules.forEach((s, r) => {
    const o = 220 + r * 340;
    n.filter((a) => a.moduleId === s.id).forEach((a, d) => {
      const c = i.filter((u) => u.aggregateId === a.id).length, h = 140 + d * (170 + c * 60);
      e[a.id] = { x: o, y: h }, i.filter((u) => u.aggregateId === a.id).forEach((u, p) => {
        e[u.id] = { x: o + 60, y: h + 100 + p * 60 };
      });
    });
  }), n.filter((s) => !t.modules.some((r) => r.id === s.moduleId)).forEach((s, r) => {
    e[s.id] = { x: 220 + r * 340, y: 640 };
  }), e;
}
function Oi(t, e) {
  const n = Li(t), i = (d) => e[d] ?? n[d] ?? { x: 200, y: 200 }, s = new Map(t.modules.map((d) => [d.id, d])), r = (t.aggregates ?? []).map((d) => {
    const c = s.get(d.moduleId), h = (c == null ? void 0 : c.subdomainType) ?? "GENERIC", u = i(d.id);
    return {
      id: d.id,
      label: d.name,
      x: u.x,
      y: u.y,
      w: Ci,
      h: Mi,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ni[h],
      stroke: "#64748b",
      badge: c ? `${c.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${d.name}${c ? ` — módulo ${c.name} (${h})` : ""}`
    };
  }), o = (t.entities ?? []).map((d) => {
    const c = i(d.id);
    return {
      id: d.id,
      label: d.name,
      x: c.x,
      y: c.y,
      w: Pi,
      h: Ri,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${d.name} (dentro del agregado)`
    };
  }), l = (t.entities ?? []).map((d) => ({
    id: `contains:${d.aggregateId}->${d.id}`,
    sourceId: d.aggregateId,
    targetId: d.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), a = (t.aggregateReferences ?? []).map((d, c) => ({
    id: `aggref:${c}:${d.sourceAggregateId}->${d.targetAggregateId}`,
    sourceId: d.sourceAggregateId,
    targetId: d.targetAggregateId,
    kind: "aggregate-reference",
    label: d.label,
    color: "#475569",
    arrow: !0,
    tooltip: d.label ? `Referencia: ${d.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...r, ...o],
    edges: [...l, ...a]
  };
}
const Di = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, zi = 150, Ui = 44, Hi = 190, Vi = 56, Fi = 160, Bi = 48;
function qi(t, e) {
  const n = t.externalSystems.find((s) => s.id === e.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = t.modules.find((s) => s.id === e.targetId);
  return { id: e.targetId, label: (i == null ? void 0 : i.name) ?? e.targetId, external: !1 };
}
function Wi(t, e) {
  const n = t.flows, i = [], s = [], r = /* @__PURE__ */ new Set(), o = (l) => {
    var a, d;
    return ((d = (a = t.aggregates) == null ? void 0 : a.find((c) => c.id === l)) == null ? void 0 : d.name) ?? l ?? "?";
  };
  return n.forEach((l, a) => {
    const d = 120 + a * 130, c = Di[l.archetype] ?? "#475569", h = l.triggerAggregateId ?? l.sourceId;
    if (!r.has(h)) {
      r.add(h);
      const b = e[h] ?? { x: 160, y: d };
      i.push({
        id: h,
        label: l.triggerAggregateId ? o(l.triggerAggregateId) : h,
        x: b.x,
        y: b.y,
        w: zi,
        h: Ui,
        kind: l.triggerAggregateId ? "aggregate" : "module",
        symbol: l.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: l.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const u = `flow:${l.id}`, p = e[u] ?? { x: 470, y: d };
    i.push({
      id: u,
      label: l.name,
      x: p.x,
      y: p.y,
      w: Hi,
      h: Vi,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: c,
      badge: l.archetype,
      tooltip: `Flow ${l.name} [${l.archetype}]${l.readModelName ? ` → read model ${l.readModelName}` : ""}${l.targetUseCaseId ? ` → use case ${l.targetUseCaseId}` : ""}`
    });
    const g = qi(t, l), _ = `tgt:${g.id}`;
    if (!r.has(_)) {
      r.add(_);
      const b = e[_] ?? { x: 790, y: d };
      i.push({
        id: _,
        label: g.label,
        x: b.x,
        y: b.y,
        w: Fi,
        h: Bi,
        kind: g.external ? "external-system" : "module",
        symbol: "component",
        fill: g.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: g.external,
        badge: g.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${l.id}:in`,
      sourceId: h,
      targetId: u,
      kind: "flow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${l.id}:out`,
      sourceId: u,
      targetId: _,
      kind: "flow-delivery",
      color: c,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const Xi = 190, Yi = 56, ye = 170, Gi = 52;
function Je(t, e) {
  const n = [], i = [], s = (r) => {
    var o;
    return (o = t.modules.find((l) => l.id === r)) == null ? void 0 : o.name;
  };
  return (t.processes ?? []).forEach((r, o) => {
    const l = 140 + o * 240, a = e[r.id] ?? { x: 150, y: l };
    n.push({
      id: r.id,
      label: r.name,
      x: a.x,
      y: a.y,
      w: Xi,
      h: Yi,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${r.sla ? ` · SLA ${r.sla}` : ""}`,
      tooltip: `${r.name}${s(r.ownerModuleId) ? ` — módulo ${s(r.ownerModuleId)}` : ""}${r.triggerEvent ? ` · arranca con ${r.triggerEvent}` : ""}`
    });
    let d = r.id;
    if (r.steps.forEach((c, h) => {
      const u = c.type === "HUMAN", p = e[c.id] ?? { x: 150 + (h + 1) * 240, y: l };
      if (n.push({
        id: c.id,
        label: c.name,
        x: p.x,
        y: p.y,
        w: ye,
        h: Gi,
        kind: "process-step",
        symbol: u ? "person" : "gear",
        fill: u ? "#fef3c7" : "#ffffff",
        stroke: u ? "#d97706" : "#64748b",
        badge: u ? `HUMAN${c.roleId ? ` · ${c.roleId}` : ""}${c.deadline ? ` · ⏱ ${c.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${c.name}${c.useCaseId ? ` — use case ${c.useCaseId}` : ""}${c.deadline ? ` · deadline ${c.deadline}` : ""}`
      }), i.push({
        id: `pe:${r.id}:${h}`,
        sourceId: d,
        targetId: c.id,
        kind: "process-seq",
        label: h === 0 ? r.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), c.compensationUseCaseId) {
        const g = `comp:${c.id}`, _ = e[g] ?? { x: p.x, y: p.y + 90 };
        n.push({
          id: g,
          label: c.compensationUseCaseId,
          x: _.x,
          y: _.y,
          w: ye,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), i.push({
          id: `pc:${c.id}`,
          sourceId: c.id,
          targetId: g,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      d = c.id;
    }), r.onCompletionEventName) {
      const c = `done:${r.id}`, h = e[c] ?? { x: 150 + (r.steps.length + 1) * 240, y: l };
      n.push({
        id: c,
        label: r.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: ye,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), i.push({
        id: `pd:${r.id}`,
        sourceId: d,
        targetId: c,
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
const te = globalThis, ze = te.ShadowRoot && (te.ShadyCSS === void 0 || te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ue = Symbol(), Qe = /* @__PURE__ */ new WeakMap();
let Pn = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== Ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ze && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Qe.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Qe.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ki = (t) => new Pn(typeof t == "string" ? t : t + "", void 0, Ue), He = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new Pn(n, t, Ue);
}, Zi = (t, e) => {
  if (ze) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = te.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, je = ze ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return Ki(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ji, defineProperty: Qi, getOwnPropertyDescriptor: ji, getOwnPropertyNames: ts, getOwnPropertySymbols: es, getPrototypeOf: ns } = Object, at = globalThis, tn = at.trustedTypes, is = tn ? tn.emptyScript : "", we = at.reactiveElementPolyfillSupport, Nt = (t, e) => t, re = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? is : null;
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
} }, Ve = (t, e) => !Ji(t, e), en = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: Ve };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), at.litPropertyMetadata ?? (at.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let wt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = en) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && Qi(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: r } = ji(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: s, set(o) {
      const l = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? en;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Nt("elementProperties"))) return;
    const e = ns(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Nt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Nt("properties"))) {
      const n = this.properties, i = [...ts(n), ...es(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) n.unshift(je(s));
    } else e !== void 0 && n.push(je(e));
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
    return Zi(e, this.constructor.elementStyles), e;
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
    var r;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : re).toAttribute(n, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : re;
      this._$Em = s;
      const d = a.fromAttribute(n, l.type);
      this[s] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, r) {
    var o;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? Ve)(r, n) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: l } = o, a = this[r];
        l !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, o, a);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(n)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
wt.elementStyles = [], wt.shadowRootOptions = { mode: "open" }, wt[Nt("elementProperties")] = /* @__PURE__ */ new Map(), wt[Nt("finalized")] = /* @__PURE__ */ new Map(), we == null || we({ ReactiveElement: wt }), (at.reactiveElementVersions ?? (at.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = globalThis, nn = (t) => t, oe = Ct.trustedTypes, sn = oe ? oe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Rn = "$lit$", ot = `lit$${Math.random().toFixed(9).slice(2)}$`, Ln = "?" + ot, ss = `<${Ln}>`, gt = document, Ot = () => gt.createComment(""), Dt = (t) => t === null || typeof t != "object" && typeof t != "function", Fe = Array.isArray, rs = (t) => Fe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ve = `[ 	
\f\r]`, Et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rn = /-->/g, on = />/g, lt = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), an = /'/g, ln = /"/g, On = /^(?:script|style|textarea|title)$/i, Dn = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), S = Dn(1), k = Dn(2), xt = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), dn = /* @__PURE__ */ new WeakMap(), ht = gt.createTreeWalker(gt, 129);
function zn(t, e) {
  if (!Fe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return sn !== void 0 ? sn.createHTML(e) : e;
}
const os = (t, e) => {
  const n = t.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Et;
  for (let l = 0; l < n; l++) {
    const a = t[l];
    let d, c, h = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, c = o.exec(a), c !== null); ) u = o.lastIndex, o === Et ? c[1] === "!--" ? o = rn : c[1] !== void 0 ? o = on : c[2] !== void 0 ? (On.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = lt) : c[3] !== void 0 && (o = lt) : o === lt ? c[0] === ">" ? (o = s ?? Et, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, d = c[1], o = c[3] === void 0 ? lt : c[3] === '"' ? ln : an) : o === ln || o === an ? o = lt : o === rn || o === on ? o = Et : (o = lt, s = void 0);
    const p = o === lt && t[l + 1].startsWith("/>") ? " " : "";
    r += o === Et ? a + ss : h >= 0 ? (i.push(d), a.slice(0, h) + Rn + a.slice(h) + ot + p) : a + ot + (h === -2 ? l : p);
  }
  return [zn(t, r + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class zt {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const l = e.length - 1, a = this.parts, [d, c] = os(e, n);
    if (this.el = zt.createElement(d, i), ht.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = ht.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Rn)) {
          const u = c[o++], p = s.getAttribute(h).split(ot), g = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: g[2], strings: p, ctor: g[1] === "." ? ls : g[1] === "?" ? ds : g[1] === "@" ? cs : fe }), s.removeAttribute(h);
        } else h.startsWith(ot) && (a.push({ type: 6, index: r }), s.removeAttribute(h));
        if (On.test(s.tagName)) {
          const h = s.textContent.split(ot), u = h.length - 1;
          if (u > 0) {
            s.textContent = oe ? oe.emptyScript : "";
            for (let p = 0; p < u; p++) s.append(h[p], Ot()), ht.nextNode(), a.push({ type: 2, index: ++r });
            s.append(h[u], Ot());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ln) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(ot, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += ot.length - 1;
      }
      r++;
    }
  }
  static createElement(e, n) {
    const i = gt.createElement("template");
    return i.innerHTML = e, i;
  }
}
function $t(t, e, n = t, i) {
  var o, l;
  if (e === xt) return e;
  let s = i !== void 0 ? (o = n._$Co) == null ? void 0 : o[i] : n._$Cl;
  const r = Dt(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (e = $t(t, s._$AS(t, e.values), s, i)), e;
}
class as {
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
    const { el: { content: n }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? gt).importNode(n, !0);
    ht.currentNode = s;
    let r = ht.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new Bt(r, r.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (d = new hs(r, this, e)), this._$AV.push(d), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = ht.nextNode(), o++);
    }
    return ht.currentNode = gt, s;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class Bt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = $t(this, e, n), Dt(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== xt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rs(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== P && Dt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(gt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = zt.createElement(zn(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(n);
    else {
      const o = new as(s, this), l = o.u(this.options);
      o.p(n), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = dn.get(e.strings);
    return n === void 0 && dn.set(e.strings, n = new zt(e)), n;
  }
  k(e) {
    Fe(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const r of e) s === n.length ? n.push(i = new Bt(this.O(Ot()), this.O(Ot()), this, this.options)) : i = n[s], i._$AI(r), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); e !== this._$AB; ) {
      const s = nn(e).nextSibling;
      nn(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class fe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, s, r) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = P;
  }
  _$AI(e, n = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = $t(this, e, n, 0), o = !Dt(e) || e !== this._$AH && e !== xt, o && (this._$AH = e);
    else {
      const l = e;
      let a, d;
      for (e = r[0], a = 0; a < r.length - 1; a++) d = $t(this, l[i + a], n, a), d === xt && (d = this._$AH[a]), o || (o = !Dt(d) || d !== this._$AH[a]), d === P ? e = P : e !== P && (e += (d ?? "") + r[a + 1]), this._$AH[a] = d;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ls extends fe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === P ? void 0 : e;
  }
}
class ds extends fe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== P);
  }
}
class cs extends fe {
  constructor(e, n, i, s, r) {
    super(e, n, i, s, r), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = $t(this, e, n, 0) ?? P) === xt) return;
    const i = this._$AH, s = e === P && i !== P || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== P && (i === P || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class hs {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    $t(this, e);
  }
}
const xe = Ct.litHtmlPolyfillSupport;
xe == null || xe(zt, Bt), (Ct.litHtmlVersions ?? (Ct.litHtmlVersions = [])).push("3.3.3");
const us = (t, e, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new Bt(e.insertBefore(Ot(), r), r, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis;
class pt extends wt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = us(n, this.renderRoot, this.renderOptions);
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
    return xt;
  }
}
var An;
pt._$litElement$ = !0, pt.finalized = !0, (An = ft.litElementHydrateSupport) == null || An.call(ft, { LitElement: pt });
const $e = ft.litElementPolyfillSupport;
$e == null || $e({ LitElement: pt });
(ft.litElementVersions ?? (ft.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fs = { attribute: !0, type: String, converter: re, reflect: !1, hasChanged: Ve }, ps = (t = fs, e, n) => {
  const { kind: i, metadata: s } = n;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(n.name, t), i === "accessor") {
    const { name: o } = n;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = n;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function it(t) {
  return (e, n) => typeof n == "object" ? ps(t, e, n) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(t) {
  return it({ ...t, state: !0, attribute: !1 });
}
var Ae = "http://www.w3.org/1999/xhtml";
const cn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ae,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pe(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), cn.hasOwnProperty(e) ? { space: cn[e], local: t } : t;
}
function ms(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ae && e.documentElement.namespaceURI === Ae ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function gs(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Un(t) {
  var e = pe(t);
  return (e.local ? gs : ms)(e);
}
function _s() {
}
function qe(t) {
  return t == null ? _s : function() {
    return this.querySelector(t);
  };
}
function ys(t) {
  typeof t != "function" && (t = qe(t));
  for (var e = this._groups, n = e.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = e[s], o = r.length, l = i[s] = new Array(o), a, d, c = 0; c < o; ++c)
      (a = r[c]) && (d = t.call(a, a.__data__, c, r)) && ("__data__" in a && (d.__data__ = a.__data__), l[c] = d);
  return new H(i, this._parents);
}
function ws(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function vs() {
  return [];
}
function Hn(t) {
  return t == null ? vs : function() {
    return this.querySelectorAll(t);
  };
}
function xs(t) {
  return function() {
    return ws(t.apply(this, arguments));
  };
}
function $s(t) {
  typeof t == "function" ? t = xs(t) : t = Hn(t);
  for (var e = this._groups, n = e.length, i = [], s = [], r = 0; r < n; ++r)
    for (var o = e[r], l = o.length, a, d = 0; d < l; ++d)
      (a = o[d]) && (i.push(t.call(a, a.__data__, d, o)), s.push(a));
  return new H(i, s);
}
function Vn(t) {
  return function() {
    return this.matches(t);
  };
}
function Fn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var bs = Array.prototype.find;
function Is(t) {
  return function() {
    return bs.call(this.children, t);
  };
}
function Es() {
  return this.firstElementChild;
}
function ks(t) {
  return this.select(t == null ? Es : Is(typeof t == "function" ? t : Fn(t)));
}
var Ss = Array.prototype.filter;
function As() {
  return Array.from(this.children);
}
function Ts(t) {
  return function() {
    return Ss.call(this.children, t);
  };
}
function Ns(t) {
  return this.selectAll(t == null ? As : Ts(typeof t == "function" ? t : Fn(t)));
}
function Cs(t) {
  typeof t != "function" && (t = Vn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = e[s], o = r.length, l = i[s] = [], a, d = 0; d < o; ++d)
      (a = r[d]) && t.call(a, a.__data__, d, r) && l.push(a);
  return new H(i, this._parents);
}
function Bn(t) {
  return new Array(t.length);
}
function Ms() {
  return new H(this._enter || this._groups.map(Bn), this._parents);
}
function ae(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
ae.prototype = {
  constructor: ae,
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
function Ps(t) {
  return function() {
    return t;
  };
}
function Rs(t, e, n, i, s, r) {
  for (var o = 0, l, a = e.length, d = r.length; o < d; ++o)
    (l = e[o]) ? (l.__data__ = r[o], i[o] = l) : n[o] = new ae(t, r[o]);
  for (; o < a; ++o)
    (l = e[o]) && (s[o] = l);
}
function Ls(t, e, n, i, s, r, o) {
  var l, a, d = /* @__PURE__ */ new Map(), c = e.length, h = r.length, u = new Array(c), p;
  for (l = 0; l < c; ++l)
    (a = e[l]) && (u[l] = p = o.call(a, a.__data__, l, e) + "", d.has(p) ? s[l] = a : d.set(p, a));
  for (l = 0; l < h; ++l)
    p = o.call(t, r[l], l, r) + "", (a = d.get(p)) ? (i[l] = a, a.__data__ = r[l], d.delete(p)) : n[l] = new ae(t, r[l]);
  for (l = 0; l < c; ++l)
    (a = e[l]) && d.get(u[l]) === a && (s[l] = a);
}
function Os(t) {
  return t.__data__;
}
function Ds(t, e) {
  if (!arguments.length) return Array.from(this, Os);
  var n = e ? Ls : Rs, i = this._parents, s = this._groups;
  typeof t != "function" && (t = Ps(t));
  for (var r = s.length, o = new Array(r), l = new Array(r), a = new Array(r), d = 0; d < r; ++d) {
    var c = i[d], h = s[d], u = h.length, p = zs(t.call(c, c && c.__data__, d, i)), g = p.length, _ = l[d] = new Array(g), b = o[d] = new Array(g), v = a[d] = new Array(u);
    n(c, h, _, b, v, p, e);
    for (var M = 0, L = 0, U, V; M < g; ++M)
      if (U = _[M]) {
        for (M >= L && (L = M + 1); !(V = b[L]) && ++L < g; ) ;
        U._next = V || null;
      }
  }
  return o = new H(o, i), o._enter = l, o._exit = a, o;
}
function zs(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Us() {
  return new H(this._exit || this._groups.map(Bn), this._parents);
}
function Hs(t, e, n) {
  var i = this.enter(), s = this, r = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (s = e(s), s && (s = s.selection())), n == null ? r.remove() : n(r), i && s ? i.merge(s).order() : s;
}
function Vs(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, s = n.length, r = i.length, o = Math.min(s, r), l = new Array(s), a = 0; a < o; ++a)
    for (var d = n[a], c = i[a], h = d.length, u = l[a] = new Array(h), p, g = 0; g < h; ++g)
      (p = d[g] || c[g]) && (u[g] = p);
  for (; a < s; ++a)
    l[a] = n[a];
  return new H(l, this._parents);
}
function Fs() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], s = i.length - 1, r = i[s], o; --s >= 0; )
      (o = i[s]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function Bs(t) {
  t || (t = qs);
  function e(h, u) {
    return h && u ? t(h.__data__, u.__data__) : !h - !u;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), r = 0; r < i; ++r) {
    for (var o = n[r], l = o.length, a = s[r] = new Array(l), d, c = 0; c < l; ++c)
      (d = o[c]) && (a[c] = d);
    a.sort(e);
  }
  return new H(s, this._parents).order();
}
function qs(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ws() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Xs() {
  return Array.from(this);
}
function Ys() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], s = 0, r = i.length; s < r; ++s) {
      var o = i[s];
      if (o) return o;
    }
  return null;
}
function Gs() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Ks() {
  return !this.node();
}
function Zs(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var s = e[n], r = 0, o = s.length, l; r < o; ++r)
      (l = s[r]) && t.call(l, l.__data__, r, s);
  return this;
}
function Js(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Qs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function js(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function tr(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function er(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function nr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ir(t, e) {
  var n = pe(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Qs : Js : typeof e == "function" ? n.local ? nr : er : n.local ? tr : js)(n, e));
}
function qn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function sr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function rr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function or(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function ar(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? sr : typeof e == "function" ? or : rr)(t, e, n ?? "")) : bt(this.node(), t);
}
function bt(t, e) {
  return t.style.getPropertyValue(e) || qn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function lr(t) {
  return function() {
    delete this[t];
  };
}
function dr(t, e) {
  return function() {
    this[t] = e;
  };
}
function cr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function hr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? lr : typeof e == "function" ? cr : dr)(t, e)) : this.node()[t];
}
function Wn(t) {
  return t.trim().split(/^|\s+/);
}
function We(t) {
  return t.classList || new Xn(t);
}
function Xn(t) {
  this._node = t, this._names = Wn(t.getAttribute("class") || "");
}
Xn.prototype = {
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
function Yn(t, e) {
  for (var n = We(t), i = -1, s = e.length; ++i < s; ) n.add(e[i]);
}
function Gn(t, e) {
  for (var n = We(t), i = -1, s = e.length; ++i < s; ) n.remove(e[i]);
}
function ur(t) {
  return function() {
    Yn(this, t);
  };
}
function fr(t) {
  return function() {
    Gn(this, t);
  };
}
function pr(t, e) {
  return function() {
    (e.apply(this, arguments) ? Yn : Gn)(this, t);
  };
}
function mr(t, e) {
  var n = Wn(t + "");
  if (arguments.length < 2) {
    for (var i = We(this.node()), s = -1, r = n.length; ++s < r; ) if (!i.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? pr : e ? ur : fr)(n, e));
}
function gr() {
  this.textContent = "";
}
function _r(t) {
  return function() {
    this.textContent = t;
  };
}
function yr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function wr(t) {
  return arguments.length ? this.each(t == null ? gr : (typeof t == "function" ? yr : _r)(t)) : this.node().textContent;
}
function vr() {
  this.innerHTML = "";
}
function xr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function $r(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function br(t) {
  return arguments.length ? this.each(t == null ? vr : (typeof t == "function" ? $r : xr)(t)) : this.node().innerHTML;
}
function Ir() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Er() {
  return this.each(Ir);
}
function kr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sr() {
  return this.each(kr);
}
function Ar(t) {
  var e = typeof t == "function" ? t : Un(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Tr() {
  return null;
}
function Nr(t, e) {
  var n = typeof t == "function" ? t : Un(t), i = e == null ? Tr : typeof e == "function" ? e : qe(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Cr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Mr() {
  return this.each(Cr);
}
function Pr() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Rr() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Lr(t) {
  return this.select(t ? Rr : Pr);
}
function Or(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Dr(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function zr(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Ur(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, s = e.length, r; n < s; ++n)
        r = e[n], (!t.type || r.type === t.type) && r.name === t.name ? this.removeEventListener(r.type, r.listener, r.options) : e[++i] = r;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function Hr(t, e, n) {
  return function() {
    var i = this.__on, s, r = Dr(e);
    if (i) {
      for (var o = 0, l = i.length; o < l; ++o)
        if ((s = i[o]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = r, s.options = n), s.value = e;
          return;
        }
    }
    this.addEventListener(t.type, r, n), s = { type: t.type, name: t.name, value: e, listener: r, options: n }, i ? i.push(s) : this.__on = [s];
  };
}
function Vr(t, e, n) {
  var i = zr(t + ""), s, r = i.length, o;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, d = l.length, c; a < d; ++a)
        for (s = 0, c = l[a]; s < r; ++s)
          if ((o = i[s]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (l = e ? Hr : Ur, s = 0; s < r; ++s) this.each(l(i[s], e, n));
  return this;
}
function Kn(t, e, n) {
  var i = qn(t), s = i.CustomEvent;
  typeof s == "function" ? s = new s(e, n) : (s = i.document.createEvent("Event"), n ? (s.initEvent(e, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(e, !1, !1)), t.dispatchEvent(s);
}
function Fr(t, e) {
  return function() {
    return Kn(this, t, e);
  };
}
function Br(t, e) {
  return function() {
    return Kn(this, t, e.apply(this, arguments));
  };
}
function qr(t, e) {
  return this.each((typeof e == "function" ? Br : Fr)(t, e));
}
function* Wr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], s = 0, r = i.length, o; s < r; ++s)
      (o = i[s]) && (yield o);
}
var Zn = [null];
function H(t, e) {
  this._groups = t, this._parents = e;
}
function qt() {
  return new H([[document.documentElement]], Zn);
}
function Xr() {
  return this;
}
H.prototype = qt.prototype = {
  constructor: H,
  select: ys,
  selectAll: $s,
  selectChild: ks,
  selectChildren: Ns,
  filter: Cs,
  data: Ds,
  enter: Ms,
  exit: Us,
  join: Hs,
  merge: Vs,
  selection: Xr,
  order: Fs,
  sort: Bs,
  call: Ws,
  nodes: Xs,
  node: Ys,
  size: Gs,
  empty: Ks,
  each: Zs,
  attr: ir,
  style: ar,
  property: hr,
  classed: mr,
  text: wr,
  html: br,
  raise: Er,
  lower: Sr,
  append: Ar,
  insert: Nr,
  remove: Mr,
  clone: Lr,
  datum: Or,
  on: Vr,
  dispatch: qr,
  [Symbol.iterator]: Wr
};
function G(t) {
  return typeof t == "string" ? new H([[document.querySelector(t)]], [document.documentElement]) : new H([[t]], Zn);
}
function Yr(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function dt(t, e) {
  if (t = Yr(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = t.clientX, i.y = t.clientY, i = i.matrixTransform(e.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (e.getBoundingClientRect) {
      var s = e.getBoundingClientRect();
      return [t.clientX - s.left - e.clientLeft, t.clientY - s.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
var Gr = { value: () => {
} };
function Xe() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new ee(n);
}
function ee(t) {
  this._ = t;
}
function Kr(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
ee.prototype = Xe.prototype = {
  constructor: ee,
  on: function(t, e) {
    var n = this._, i = Kr(t + "", n), s, r = -1, o = i.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((s = (t = i[r]).type) && (s = Zr(n[s], t.name))) return s;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++r < o; )
      if (s = (t = i[r]).type) n[s] = hn(n[s], t.name, e);
      else if (e == null) for (s in n) n[s] = hn(n[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new ee(t);
  },
  call: function(t, e) {
    if ((s = arguments.length - 2) > 0) for (var n = new Array(s), i = 0, s, r; i < s; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (r = this._[t], i = 0, s = r.length; i < s; ++i) r[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], s = 0, r = i.length; s < r; ++s) i[s].value.apply(e, n);
  }
};
function Zr(t, e) {
  for (var n = 0, i = t.length, s; n < i; ++n)
    if ((s = t[n]).name === e)
      return s.value;
}
function hn(t, e, n) {
  for (var i = 0, s = t.length; i < s; ++i)
    if (t[i].name === e) {
      t[i] = Gr, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const Te = { capture: !0, passive: !1 };
function Ne(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Jr(t) {
  var e = t.document.documentElement, n = G(t).on("dragstart.drag", Ne, Te);
  "onselectstart" in e ? n.on("selectstart.drag", Ne, Te) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Qr(t, e) {
  var n = t.document.documentElement, i = G(t).on("dragstart.drag", null);
  e && (i.on("click.drag", Ne, Te), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function Ye(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Jn(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function Wt() {
}
var Ut = 0.7, le = 1 / Ut, vt = "\\s*([+-]?\\d+)\\s*", Ht = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", K = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", jr = /^#([0-9a-f]{3,8})$/, to = new RegExp(`^rgb\\(${vt},${vt},${vt}\\)$`), eo = new RegExp(`^rgb\\(${K},${K},${K}\\)$`), no = new RegExp(`^rgba\\(${vt},${vt},${vt},${Ht}\\)$`), io = new RegExp(`^rgba\\(${K},${K},${K},${Ht}\\)$`), so = new RegExp(`^hsl\\(${Ht},${K},${K}\\)$`), ro = new RegExp(`^hsla\\(${Ht},${K},${K},${Ht}\\)$`), un = {
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
Ye(Wt, Vt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: fn,
  // Deprecated! Use color.formatHex.
  formatHex: fn,
  formatHex8: oo,
  formatHsl: ao,
  formatRgb: pn,
  toString: pn
});
function fn() {
  return this.rgb().formatHex();
}
function oo() {
  return this.rgb().formatHex8();
}
function ao() {
  return Qn(this).formatHsl();
}
function pn() {
  return this.rgb().formatRgb();
}
function Vt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = jr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? mn(e) : n === 3 ? new z(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Kt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Kt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = to.exec(t)) ? new z(e[1], e[2], e[3], 1) : (e = eo.exec(t)) ? new z(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = no.exec(t)) ? Kt(e[1], e[2], e[3], e[4]) : (e = io.exec(t)) ? Kt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = so.exec(t)) ? yn(e[1], e[2] / 100, e[3] / 100, 1) : (e = ro.exec(t)) ? yn(e[1], e[2] / 100, e[3] / 100, e[4]) : un.hasOwnProperty(t) ? mn(un[t]) : t === "transparent" ? new z(NaN, NaN, NaN, 0) : null;
}
function mn(t) {
  return new z(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Kt(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new z(t, e, n, i);
}
function lo(t) {
  return t instanceof Wt || (t = Vt(t)), t ? (t = t.rgb(), new z(t.r, t.g, t.b, t.opacity)) : new z();
}
function Ce(t, e, n, i) {
  return arguments.length === 1 ? lo(t) : new z(t, e, n, i ?? 1);
}
function z(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Ye(z, Ce, Jn(Wt, {
  brighter(t) {
    return t = t == null ? le : Math.pow(le, t), new z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new z(mt(this.r), mt(this.g), mt(this.b), de(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: gn,
  // Deprecated! Use color.formatHex.
  formatHex: gn,
  formatHex8: co,
  formatRgb: _n,
  toString: _n
}));
function gn() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}`;
}
function co() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}${ut((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function _n() {
  const t = de(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${mt(this.r)}, ${mt(this.g)}, ${mt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function de(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function mt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ut(t) {
  return t = mt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function yn(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new W(t, e, n, i);
}
function Qn(t) {
  if (t instanceof W) return new W(t.h, t.s, t.l, t.opacity);
  if (t instanceof Wt || (t = Vt(t)), !t) return new W();
  if (t instanceof W) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, s = Math.min(e, n, i), r = Math.max(e, n, i), o = NaN, l = r - s, a = (r + s) / 2;
  return l ? (e === r ? o = (n - i) / l + (n < i) * 6 : n === r ? o = (i - e) / l + 2 : o = (e - n) / l + 4, l /= a < 0.5 ? r + s : 2 - r - s, o *= 60) : l = a > 0 && a < 1 ? 0 : o, new W(o, l, a, t.opacity);
}
function ho(t, e, n, i) {
  return arguments.length === 1 ? Qn(t) : new W(t, e, n, i ?? 1);
}
function W(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Ye(W, ho, Jn(Wt, {
  brighter(t) {
    return t = t == null ? le : Math.pow(le, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ut : Math.pow(Ut, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, s = 2 * n - i;
    return new z(
      be(t >= 240 ? t - 240 : t + 120, s, i),
      be(t, s, i),
      be(t < 120 ? t + 240 : t - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new W(wn(this.h), Zt(this.s), Zt(this.l), de(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = de(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${wn(this.h)}, ${Zt(this.s) * 100}%, ${Zt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function wn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Zt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function be(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const jn = (t) => () => t;
function uo(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function fo(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function po(t) {
  return (t = +t) == 1 ? ti : function(e, n) {
    return n - e ? fo(e, n, t) : jn(isNaN(e) ? n : e);
  };
}
function ti(t, e) {
  var n = e - t;
  return n ? uo(t, n) : jn(isNaN(t) ? e : t);
}
const vn = (function t(e) {
  var n = po(e);
  function i(s, r) {
    var o = n((s = Ce(s)).r, (r = Ce(r)).r), l = n(s.g, r.g), a = n(s.b, r.b), d = ti(s.opacity, r.opacity);
    return function(c) {
      return s.r = o(c), s.g = l(c), s.b = a(c), s.opacity = d(c), s + "";
    };
  }
  return i.gamma = t, i;
})(1);
function rt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Me = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ie = new RegExp(Me.source, "g");
function mo(t) {
  return function() {
    return t;
  };
}
function go(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _o(t, e) {
  var n = Me.lastIndex = Ie.lastIndex = 0, i, s, r, o = -1, l = [], a = [];
  for (t = t + "", e = e + ""; (i = Me.exec(t)) && (s = Ie.exec(e)); )
    (r = s.index) > n && (r = e.slice(n, r), l[o] ? l[o] += r : l[++o] = r), (i = i[0]) === (s = s[0]) ? l[o] ? l[o] += s : l[++o] = s : (l[++o] = null, a.push({ i: o, x: rt(i, s) })), n = Ie.lastIndex;
  return n < e.length && (r = e.slice(n), l[o] ? l[o] += r : l[++o] = r), l.length < 2 ? a[0] ? go(a[0].x) : mo(e) : (e = a.length, function(d) {
    for (var c = 0, h; c < e; ++c) l[(h = a[c]).i] = h.x(d);
    return l.join("");
  });
}
var xn = 180 / Math.PI, Pe = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ei(t, e, n, i, s, r) {
  var o, l, a;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (a = t * n + e * i) && (n -= t * a, i -= e * a), (l = Math.sqrt(n * n + i * i)) && (n /= l, i /= l, a /= l), t * i < e * n && (t = -t, e = -e, a = -a, o = -o), {
    translateX: s,
    translateY: r,
    rotate: Math.atan2(e, t) * xn,
    skewX: Math.atan(a) * xn,
    scaleX: o,
    scaleY: l
  };
}
var Jt;
function yo(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Pe : ei(e.a, e.b, e.c, e.d, e.e, e.f);
}
function wo(t) {
  return t == null || (Jt || (Jt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Jt.setAttribute("transform", t), !(t = Jt.transform.baseVal.consolidate())) ? Pe : (t = t.matrix, ei(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ni(t, e, n, i) {
  function s(d) {
    return d.length ? d.pop() + " " : "";
  }
  function r(d, c, h, u, p, g) {
    if (d !== h || c !== u) {
      var _ = p.push("translate(", null, e, null, n);
      g.push({ i: _ - 4, x: rt(d, h) }, { i: _ - 2, x: rt(c, u) });
    } else (h || u) && p.push("translate(" + h + e + u + n);
  }
  function o(d, c, h, u) {
    d !== c ? (d - c > 180 ? c += 360 : c - d > 180 && (d += 360), u.push({ i: h.push(s(h) + "rotate(", null, i) - 2, x: rt(d, c) })) : c && h.push(s(h) + "rotate(" + c + i);
  }
  function l(d, c, h, u) {
    d !== c ? u.push({ i: h.push(s(h) + "skewX(", null, i) - 2, x: rt(d, c) }) : c && h.push(s(h) + "skewX(" + c + i);
  }
  function a(d, c, h, u, p, g) {
    if (d !== h || c !== u) {
      var _ = p.push(s(p) + "scale(", null, ",", null, ")");
      g.push({ i: _ - 4, x: rt(d, h) }, { i: _ - 2, x: rt(c, u) });
    } else (h !== 1 || u !== 1) && p.push(s(p) + "scale(" + h + "," + u + ")");
  }
  return function(d, c) {
    var h = [], u = [];
    return d = t(d), c = t(c), r(d.translateX, d.translateY, c.translateX, c.translateY, h, u), o(d.rotate, c.rotate, h, u), l(d.skewX, c.skewX, h, u), a(d.scaleX, d.scaleY, c.scaleX, c.scaleY, h, u), d = c = null, function(p) {
      for (var g = -1, _ = u.length, b; ++g < _; ) h[(b = u[g]).i] = b.x(p);
      return h.join("");
    };
  };
}
var vo = ni(yo, "px, ", "px)", "deg)"), xo = ni(wo, ", ", ")", ")"), $o = 1e-12;
function $n(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function bo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Io(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Eo = (function t(e, n, i) {
  function s(r, o) {
    var l = r[0], a = r[1], d = r[2], c = o[0], h = o[1], u = o[2], p = c - l, g = h - a, _ = p * p + g * g, b, v;
    if (_ < $o)
      v = Math.log(u / d) / e, b = function(st) {
        return [
          l + st * p,
          a + st * g,
          d * Math.exp(e * st * v)
        ];
      };
    else {
      var M = Math.sqrt(_), L = (u * u - d * d + i * _) / (2 * d * n * M), U = (u * u - d * d - i * _) / (2 * u * n * M), V = Math.log(Math.sqrt(L * L + 1) - L), F = Math.log(Math.sqrt(U * U + 1) - U);
      v = (F - V) / e, b = function(st) {
        var Xt = st * v, Yt = $n(V), Gt = d / (n * M) * (Yt * Io(e * Xt + V) - bo(V));
        return [
          l + Gt * p,
          a + Gt * g,
          d * Yt / $n(e * Xt + V)
        ];
      };
    }
    return b.duration = v * 1e3 * e / Math.SQRT2, b;
  }
  return s.rho = function(r) {
    var o = Math.max(1e-3, +r), l = o * o, a = l * l;
    return t(o, l, a);
  }, s;
})(Math.SQRT2, 2, 4);
var It = 0, At = 0, kt = 0, ii = 1e3, ce, Tt, he = 0, _t = 0, me = 0, Ft = typeof performance == "object" && performance.now ? performance : Date, si = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ge() {
  return _t || (si(ko), _t = Ft.now() + me);
}
function ko() {
  _t = 0;
}
function ue() {
  this._call = this._time = this._next = null;
}
ue.prototype = ri.prototype = {
  constructor: ue,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ge() : +n) + (e == null ? 0 : +e), !this._next && Tt !== this && (Tt ? Tt._next = this : ce = this, Tt = this), this._call = t, this._time = n, Re();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Re());
  }
};
function ri(t, e, n) {
  var i = new ue();
  return i.restart(t, e, n), i;
}
function So() {
  Ge(), ++It;
  for (var t = ce, e; t; )
    (e = _t - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --It;
}
function bn() {
  _t = (he = Ft.now()) + me, It = At = 0;
  try {
    So();
  } finally {
    It = 0, To(), _t = 0;
  }
}
function Ao() {
  var t = Ft.now(), e = t - he;
  e > ii && (me -= e, he = t);
}
function To() {
  for (var t, e = ce, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ce = n);
  Tt = t, Re(i);
}
function Re(t) {
  if (!It) {
    At && (At = clearTimeout(At));
    var e = t - _t;
    e > 24 ? (t < 1 / 0 && (At = setTimeout(bn, t - Ft.now() - me)), kt && (kt = clearInterval(kt))) : (kt || (he = Ft.now(), kt = setInterval(Ao, ii)), It = 1, si(bn));
  }
}
function In(t, e, n) {
  var i = new ue();
  return e = e == null ? 0 : +e, i.restart((s) => {
    i.stop(), t(s + e);
  }, e, n), i;
}
var No = Xe("start", "end", "cancel", "interrupt"), Co = [], oi = 0, En = 1, Le = 2, ne = 3, kn = 4, Oe = 5, ie = 6;
function ge(t, e, n, i, s, r) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Mo(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: No,
    tween: Co,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: oi
  });
}
function Ke(t, e) {
  var n = X(t, e);
  if (n.state > oi) throw new Error("too late; already scheduled");
  return n;
}
function Z(t, e) {
  var n = X(t, e);
  if (n.state > ne) throw new Error("too late; already running");
  return n;
}
function X(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Mo(t, e, n) {
  var i = t.__transition, s;
  i[e] = n, n.timer = ri(r, 0, n.time);
  function r(d) {
    n.state = En, n.timer.restart(o, n.delay, n.time), n.delay <= d && o(d - n.delay);
  }
  function o(d) {
    var c, h, u, p;
    if (n.state !== En) return a();
    for (c in i)
      if (p = i[c], p.name === n.name) {
        if (p.state === ne) return In(o);
        p.state === kn ? (p.state = ie, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete i[c]) : +c < e && (p.state = ie, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete i[c]);
      }
    if (In(function() {
      n.state === ne && (n.state = kn, n.timer.restart(l, n.delay, n.time), l(d));
    }), n.state = Le, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Le) {
      for (n.state = ne, s = new Array(u = n.tween.length), c = 0, h = -1; c < u; ++c)
        (p = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (s[++h] = p);
      s.length = h + 1;
    }
  }
  function l(d) {
    for (var c = d < n.duration ? n.ease.call(null, d / n.duration) : (n.timer.restart(a), n.state = Oe, 1), h = -1, u = s.length; ++h < u; )
      s[h].call(t, c);
    n.state === Oe && (n.on.call("end", t, t.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = ie, n.timer.stop(), delete i[e];
    for (var d in i) return;
    delete t.__transition;
  }
}
function se(t, e) {
  var n = t.__transition, i, s, r = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((i = n[o]).name !== e) {
        r = !1;
        continue;
      }
      s = i.state > Le && i.state < Oe, i.state = ie, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[o];
    }
    r && delete t.__transition;
  }
}
function Po(t) {
  return this.each(function() {
    se(this, t);
  });
}
function Ro(t, e) {
  var n, i;
  return function() {
    var s = Z(this, t), r = s.tween;
    if (r !== n) {
      i = n = r;
      for (var o = 0, l = i.length; o < l; ++o)
        if (i[o].name === e) {
          i = i.slice(), i.splice(o, 1);
          break;
        }
    }
    s.tween = i;
  };
}
function Lo(t, e, n) {
  var i, s;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = Z(this, t), o = r.tween;
    if (o !== i) {
      s = (i = o).slice();
      for (var l = { name: e, value: n }, a = 0, d = s.length; a < d; ++a)
        if (s[a].name === e) {
          s[a] = l;
          break;
        }
      a === d && s.push(l);
    }
    r.tween = s;
  };
}
function Oo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = X(this.node(), n).tween, s = 0, r = i.length, o; s < r; ++s)
      if ((o = i[s]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Ro : Lo)(n, t, e));
}
function Ze(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var s = Z(this, i);
    (s.value || (s.value = {}))[e] = n.apply(this, arguments);
  }), function(s) {
    return X(s, i).value[e];
  };
}
function ai(t, e) {
  var n;
  return (typeof e == "number" ? rt : e instanceof Vt ? vn : (n = Vt(e)) ? (e = n, vn) : _o)(t, e);
}
function Do(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function zo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Uo(t, e, n) {
  var i, s = n + "", r;
  return function() {
    var o = this.getAttribute(t);
    return o === s ? null : o === i ? r : r = e(i = o, n);
  };
}
function Ho(t, e, n) {
  var i, s = n + "", r;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === s ? null : o === i ? r : r = e(i = o, n);
  };
}
function Vo(t, e, n) {
  var i, s, r;
  return function() {
    var o, l = n(this), a;
    return l == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), a = l + "", o === a ? null : o === i && a === s ? r : (s = a, r = e(i = o, l)));
  };
}
function Fo(t, e, n) {
  var i, s, r;
  return function() {
    var o, l = n(this), a;
    return l == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), a = l + "", o === a ? null : o === i && a === s ? r : (s = a, r = e(i = o, l)));
  };
}
function Bo(t, e) {
  var n = pe(t), i = n === "transform" ? xo : ai;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Fo : Vo)(n, i, Ze(this, "attr." + t, e)) : e == null ? (n.local ? zo : Do)(n) : (n.local ? Ho : Uo)(n, i, e));
}
function qo(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Wo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Xo(t, e) {
  var n, i;
  function s() {
    var r = e.apply(this, arguments);
    return r !== i && (n = (i = r) && Wo(t, r)), n;
  }
  return s._value = e, s;
}
function Yo(t, e) {
  var n, i;
  function s() {
    var r = e.apply(this, arguments);
    return r !== i && (n = (i = r) && qo(t, r)), n;
  }
  return s._value = e, s;
}
function Go(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = pe(t);
  return this.tween(n, (i.local ? Xo : Yo)(i, e));
}
function Ko(t, e) {
  return function() {
    Ke(this, t).delay = +e.apply(this, arguments);
  };
}
function Zo(t, e) {
  return e = +e, function() {
    Ke(this, t).delay = e;
  };
}
function Jo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ko : Zo)(e, t)) : X(this.node(), e).delay;
}
function Qo(t, e) {
  return function() {
    Z(this, t).duration = +e.apply(this, arguments);
  };
}
function jo(t, e) {
  return e = +e, function() {
    Z(this, t).duration = e;
  };
}
function ta(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Qo : jo)(e, t)) : X(this.node(), e).duration;
}
function ea(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Z(this, t).ease = e;
  };
}
function na(t) {
  var e = this._id;
  return arguments.length ? this.each(ea(e, t)) : X(this.node(), e).ease;
}
function ia(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Z(this, t).ease = n;
  };
}
function sa(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ia(this._id, t));
}
function ra(t) {
  typeof t != "function" && (t = Vn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = e[s], o = r.length, l = i[s] = [], a, d = 0; d < o; ++d)
      (a = r[d]) && t.call(a, a.__data__, d, r) && l.push(a);
  return new et(i, this._parents, this._name, this._id);
}
function oa(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, s = n.length, r = Math.min(i, s), o = new Array(i), l = 0; l < r; ++l)
    for (var a = e[l], d = n[l], c = a.length, h = o[l] = new Array(c), u, p = 0; p < c; ++p)
      (u = a[p] || d[p]) && (h[p] = u);
  for (; l < i; ++l)
    o[l] = e[l];
  return new et(o, this._parents, this._name, this._id);
}
function aa(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function la(t, e, n) {
  var i, s, r = aa(e) ? Ke : Z;
  return function() {
    var o = r(this, t), l = o.on;
    l !== i && (s = (i = l).copy()).on(e, n), o.on = s;
  };
}
function da(t, e) {
  var n = this._id;
  return arguments.length < 2 ? X(this.node(), n).on.on(t) : this.each(la(n, t, e));
}
function ca(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function ha() {
  return this.on("end.remove", ca(this._id));
}
function ua(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = qe(t));
  for (var i = this._groups, s = i.length, r = new Array(s), o = 0; o < s; ++o)
    for (var l = i[o], a = l.length, d = r[o] = new Array(a), c, h, u = 0; u < a; ++u)
      (c = l[u]) && (h = t.call(c, c.__data__, u, l)) && ("__data__" in c && (h.__data__ = c.__data__), d[u] = h, ge(d[u], e, n, u, d, X(c, n)));
  return new et(r, this._parents, e, n);
}
function fa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Hn(t));
  for (var i = this._groups, s = i.length, r = [], o = [], l = 0; l < s; ++l)
    for (var a = i[l], d = a.length, c, h = 0; h < d; ++h)
      if (c = a[h]) {
        for (var u = t.call(c, c.__data__, h, a), p, g = X(c, n), _ = 0, b = u.length; _ < b; ++_)
          (p = u[_]) && ge(p, e, n, _, u, g);
        r.push(u), o.push(c);
      }
  return new et(r, o, e, n);
}
var pa = qt.prototype.constructor;
function ma() {
  return new pa(this._groups, this._parents);
}
function ga(t, e) {
  var n, i, s;
  return function() {
    var r = bt(this, t), o = (this.style.removeProperty(t), bt(this, t));
    return r === o ? null : r === n && o === i ? s : s = e(n = r, i = o);
  };
}
function li(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function _a(t, e, n) {
  var i, s = n + "", r;
  return function() {
    var o = bt(this, t);
    return o === s ? null : o === i ? r : r = e(i = o, n);
  };
}
function ya(t, e, n) {
  var i, s, r;
  return function() {
    var o = bt(this, t), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(t), bt(this, t))), o === a ? null : o === i && a === s ? r : (s = a, r = e(i = o, l));
  };
}
function wa(t, e) {
  var n, i, s, r = "style." + e, o = "end." + r, l;
  return function() {
    var a = Z(this, t), d = a.on, c = a.value[r] == null ? l || (l = li(e)) : void 0;
    (d !== n || s !== c) && (i = (n = d).copy()).on(o, s = c), a.on = i;
  };
}
function va(t, e, n) {
  var i = (t += "") == "transform" ? vo : ai;
  return e == null ? this.styleTween(t, ga(t, i)).on("end.style." + t, li(t)) : typeof e == "function" ? this.styleTween(t, ya(t, i, Ze(this, "style." + t, e))).each(wa(this._id, t)) : this.styleTween(t, _a(t, i, e), n).on("end.style." + t, null);
}
function xa(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function $a(t, e, n) {
  var i, s;
  function r() {
    var o = e.apply(this, arguments);
    return o !== s && (i = (s = o) && xa(t, o, n)), i;
  }
  return r._value = e, r;
}
function ba(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, $a(t, e, n ?? ""));
}
function Ia(t) {
  return function() {
    this.textContent = t;
  };
}
function Ea(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ka(t) {
  return this.tween("text", typeof t == "function" ? Ea(Ze(this, "text", t)) : Ia(t == null ? "" : t + ""));
}
function Sa(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Aa(t) {
  var e, n;
  function i() {
    var s = t.apply(this, arguments);
    return s !== n && (e = (n = s) && Sa(s)), e;
  }
  return i._value = t, i;
}
function Ta(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Aa(t));
}
function Na() {
  for (var t = this._name, e = this._id, n = di(), i = this._groups, s = i.length, r = 0; r < s; ++r)
    for (var o = i[r], l = o.length, a, d = 0; d < l; ++d)
      if (a = o[d]) {
        var c = X(a, e);
        ge(a, t, n, d, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new et(i, this._parents, t, n);
}
function Ca() {
  var t, e, n = this, i = n._id, s = n.size();
  return new Promise(function(r, o) {
    var l = { value: o }, a = { value: function() {
      --s === 0 && r();
    } };
    n.each(function() {
      var d = Z(this, i), c = d.on;
      c !== t && (e = (t = c).copy(), e._.cancel.push(l), e._.interrupt.push(l), e._.end.push(a)), d.on = e;
    }), s === 0 && r();
  });
}
var Ma = 0;
function et(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function di() {
  return ++Ma;
}
var j = qt.prototype;
et.prototype = {
  constructor: et,
  select: ua,
  selectAll: fa,
  selectChild: j.selectChild,
  selectChildren: j.selectChildren,
  filter: ra,
  merge: oa,
  selection: ma,
  transition: Na,
  call: j.call,
  nodes: j.nodes,
  node: j.node,
  size: j.size,
  empty: j.empty,
  each: j.each,
  on: da,
  attr: Bo,
  attrTween: Go,
  style: va,
  styleTween: ba,
  text: ka,
  textTween: Ta,
  remove: ha,
  tween: Oo,
  delay: Jo,
  duration: ta,
  ease: na,
  easeVarying: sa,
  end: Ca,
  [Symbol.iterator]: j[Symbol.iterator]
};
function Pa(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ra = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Pa
};
function La(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Oa(t) {
  var e, n;
  t instanceof et ? (e = t._id, t = t._name) : (e = di(), (n = Ra).time = Ge(), t = t == null ? null : t + "");
  for (var i = this._groups, s = i.length, r = 0; r < s; ++r)
    for (var o = i[r], l = o.length, a, d = 0; d < l; ++d)
      (a = o[d]) && ge(a, t, e, d, o, n || La(a, e));
  return new et(i, this._parents, t, e);
}
qt.prototype.interrupt = Po;
qt.prototype.transition = Oa;
const Qt = (t) => () => t;
function Da(t, {
  sourceEvent: e,
  target: n,
  transform: i,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: s }
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
var Mt = new tt(1, 0, 0);
tt.prototype;
function Ee(t) {
  t.stopImmediatePropagation();
}
function St(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function za(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ua() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Sn() {
  return this.__zoom || Mt;
}
function Ha(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Va() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fa(t, e, n) {
  var i = t.invertX(e[0][0]) - n[0][0], s = t.invertX(e[1][0]) - n[1][0], r = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function Ba() {
  var t = za, e = Ua, n = Fa, i = Ha, s = Va, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = Eo, d = Xe("start", "zoom", "end"), c, h, u, p = 500, g = 150, _ = 0, b = 10;
  function v(f) {
    f.property("__zoom", Sn).on("wheel.zoom", Xt, { passive: !1 }).on("mousedown.zoom", Yt).on("dblclick.zoom", Gt).filter(s).on("touchstart.zoom", ci).on("touchmove.zoom", hi).on("touchend.zoom touchcancel.zoom", ui).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(f, y, m, w) {
    var x = f.selection ? f.selection() : f;
    x.property("__zoom", Sn), f !== x ? V(f, y, m, w) : x.interrupt().each(function() {
      F(this, arguments).event(w).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, v.scaleBy = function(f, y, m, w) {
    v.scaleTo(f, function() {
      var x = this.__zoom.k, I = typeof y == "function" ? y.apply(this, arguments) : y;
      return x * I;
    }, m, w);
  }, v.scaleTo = function(f, y, m, w) {
    v.transform(f, function() {
      var x = e.apply(this, arguments), I = this.__zoom, E = m == null ? U(x) : typeof m == "function" ? m.apply(this, arguments) : m, N = I.invert(E), C = typeof y == "function" ? y.apply(this, arguments) : y;
      return n(L(M(I, C), E, N), x, o);
    }, m, w);
  }, v.translateBy = function(f, y, m, w) {
    v.transform(f, function() {
      return n(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof m == "function" ? m.apply(this, arguments) : m
      ), e.apply(this, arguments), o);
    }, null, w);
  }, v.translateTo = function(f, y, m, w, x) {
    v.transform(f, function() {
      var I = e.apply(this, arguments), E = this.__zoom, N = w == null ? U(I) : typeof w == "function" ? w.apply(this, arguments) : w;
      return n(Mt.translate(N[0], N[1]).scale(E.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof m == "function" ? -m.apply(this, arguments) : -m
      ), I, o);
    }, w, x);
  };
  function M(f, y) {
    return y = Math.max(r[0], Math.min(r[1], y)), y === f.k ? f : new tt(y, f.x, f.y);
  }
  function L(f, y, m) {
    var w = y[0] - m[0] * f.k, x = y[1] - m[1] * f.k;
    return w === f.x && x === f.y ? f : new tt(f.k, w, x);
  }
  function U(f) {
    return [(+f[0][0] + +f[1][0]) / 2, (+f[0][1] + +f[1][1]) / 2];
  }
  function V(f, y, m, w) {
    f.on("start.zoom", function() {
      F(this, arguments).event(w).start();
    }).on("interrupt.zoom end.zoom", function() {
      F(this, arguments).event(w).end();
    }).tween("zoom", function() {
      var x = this, I = arguments, E = F(x, I).event(w), N = e.apply(x, I), C = m == null ? U(N) : typeof m == "function" ? m.apply(x, I) : m, Y = Math.max(N[1][0] - N[0][0], N[1][1] - N[0][1]), O = x.__zoom, B = typeof y == "function" ? y.apply(x, I) : y, J = a(O.invert(C).concat(Y / O.k), B.invert(C).concat(Y / B.k));
      return function(q) {
        if (q === 1) q = B;
        else {
          var Q = J(q), _e = Y / Q[2];
          q = new tt(_e, C[0] - Q[0] * _e, C[1] - Q[1] * _e);
        }
        E.zoom(null, q);
      };
    });
  }
  function F(f, y, m) {
    return !m && f.__zooming || new st(f, y);
  }
  function st(f, y) {
    this.that = f, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = e.apply(f, y), this.taps = 0;
  }
  st.prototype = {
    event: function(f) {
      return f && (this.sourceEvent = f), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(f, y) {
      return this.mouse && f !== "mouse" && (this.mouse[1] = y.invert(this.mouse[0])), this.touch0 && f !== "touch" && (this.touch0[1] = y.invert(this.touch0[0])), this.touch1 && f !== "touch" && (this.touch1[1] = y.invert(this.touch1[0])), this.that.__zoom = y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(f) {
      var y = G(this.that).datum();
      d.call(
        f,
        this.that,
        new Da(f, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: d
        }),
        y
      );
    }
  };
  function Xt(f, ...y) {
    if (!t.apply(this, arguments)) return;
    var m = F(this, y).event(f), w = this.__zoom, x = Math.max(r[0], Math.min(r[1], w.k * Math.pow(2, i.apply(this, arguments)))), I = dt(f);
    if (m.wheel)
      (m.mouse[0][0] !== I[0] || m.mouse[0][1] !== I[1]) && (m.mouse[1] = w.invert(m.mouse[0] = I)), clearTimeout(m.wheel);
    else {
      if (w.k === x) return;
      m.mouse = [I, w.invert(I)], se(this), m.start();
    }
    St(f), m.wheel = setTimeout(E, g), m.zoom("mouse", n(L(M(w, x), m.mouse[0], m.mouse[1]), m.extent, o));
    function E() {
      m.wheel = null, m.end();
    }
  }
  function Yt(f, ...y) {
    if (u || !t.apply(this, arguments)) return;
    var m = f.currentTarget, w = F(this, y, !0).event(f), x = G(f.view).on("mousemove.zoom", C, !0).on("mouseup.zoom", Y, !0), I = dt(f, m), E = f.clientX, N = f.clientY;
    Jr(f.view), Ee(f), w.mouse = [I, this.__zoom.invert(I)], se(this), w.start();
    function C(O) {
      if (St(O), !w.moved) {
        var B = O.clientX - E, J = O.clientY - N;
        w.moved = B * B + J * J > _;
      }
      w.event(O).zoom("mouse", n(L(w.that.__zoom, w.mouse[0] = dt(O, m), w.mouse[1]), w.extent, o));
    }
    function Y(O) {
      x.on("mousemove.zoom mouseup.zoom", null), Qr(O.view, w.moved), St(O), w.event(O).end();
    }
  }
  function Gt(f, ...y) {
    if (t.apply(this, arguments)) {
      var m = this.__zoom, w = dt(f.changedTouches ? f.changedTouches[0] : f, this), x = m.invert(w), I = m.k * (f.shiftKey ? 0.5 : 2), E = n(L(M(m, I), w, x), e.apply(this, y), o);
      St(f), l > 0 ? G(this).transition().duration(l).call(V, E, w, f) : G(this).call(v.transform, E, w, f);
    }
  }
  function ci(f, ...y) {
    if (t.apply(this, arguments)) {
      var m = f.touches, w = m.length, x = F(this, y, f.changedTouches.length === w).event(f), I, E, N, C;
      for (Ee(f), E = 0; E < w; ++E)
        N = m[E], C = dt(N, this), C = [C, this.__zoom.invert(C), N.identifier], x.touch0 ? !x.touch1 && x.touch0[2] !== C[2] && (x.touch1 = C, x.taps = 0) : (x.touch0 = C, I = !0, x.taps = 1 + !!c);
      c && (c = clearTimeout(c)), I && (x.taps < 2 && (h = C[0], c = setTimeout(function() {
        c = null;
      }, p)), se(this), x.start());
    }
  }
  function hi(f, ...y) {
    if (this.__zooming) {
      var m = F(this, y).event(f), w = f.changedTouches, x = w.length, I, E, N, C;
      for (St(f), I = 0; I < x; ++I)
        E = w[I], N = dt(E, this), m.touch0 && m.touch0[2] === E.identifier ? m.touch0[0] = N : m.touch1 && m.touch1[2] === E.identifier && (m.touch1[0] = N);
      if (E = m.that.__zoom, m.touch1) {
        var Y = m.touch0[0], O = m.touch0[1], B = m.touch1[0], J = m.touch1[1], q = (q = B[0] - Y[0]) * q + (q = B[1] - Y[1]) * q, Q = (Q = J[0] - O[0]) * Q + (Q = J[1] - O[1]) * Q;
        E = M(E, Math.sqrt(q / Q)), N = [(Y[0] + B[0]) / 2, (Y[1] + B[1]) / 2], C = [(O[0] + J[0]) / 2, (O[1] + J[1]) / 2];
      } else if (m.touch0) N = m.touch0[0], C = m.touch0[1];
      else return;
      m.zoom("touch", n(L(E, N, C), m.extent, o));
    }
  }
  function ui(f, ...y) {
    if (this.__zooming) {
      var m = F(this, y).event(f), w = f.changedTouches, x = w.length, I, E;
      for (Ee(f), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, p), I = 0; I < x; ++I)
        E = w[I], m.touch0 && m.touch0[2] === E.identifier ? delete m.touch0 : m.touch1 && m.touch1[2] === E.identifier && delete m.touch1;
      if (m.touch1 && !m.touch0 && (m.touch0 = m.touch1, delete m.touch1), m.touch0) m.touch0[1] = this.__zoom.invert(m.touch0[0]);
      else if (m.end(), m.taps === 2 && (E = dt(E, this), Math.hypot(h[0] - E[0], h[1] - E[1]) < b)) {
        var N = G(this).on("dblclick.zoom");
        N && N.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : Qt(+f), v) : i;
  }, v.filter = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Qt(!!f), v) : t;
  }, v.touchable = function(f) {
    return arguments.length ? (s = typeof f == "function" ? f : Qt(!!f), v) : s;
  }, v.extent = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Qt([[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]]), v) : e;
  }, v.scaleExtent = function(f) {
    return arguments.length ? (r[0] = +f[0], r[1] = +f[1], v) : [r[0], r[1]];
  }, v.translateExtent = function(f) {
    return arguments.length ? (o[0][0] = +f[0][0], o[1][0] = +f[1][0], o[0][1] = +f[0][1], o[1][1] = +f[1][1], v) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, v.constrain = function(f) {
    return arguments.length ? (n = f, v) : n;
  }, v.duration = function(f) {
    return arguments.length ? (l = +f, v) : l;
  }, v.interpolate = function(f) {
    return arguments.length ? (a = f, v) : a;
  }, v.on = function() {
    var f = d.on.apply(d, arguments);
    return f === d ? v : f;
  }, v.clickDistance = function(f) {
    return arguments.length ? (_ = (f = +f) * f, v) : Math.sqrt(_);
  }, v.tapDistance = function(f) {
    return arguments.length ? (b = +f, v) : b;
  }, v;
}
var qa = Object.defineProperty, Wa = Object.getOwnPropertyDescriptor, D = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Wa(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && qa(e, n, s), s;
};
function Xa(t, e, n, i) {
  const s = e.x - t.x, r = e.y - t.y, o = i.x - n.x, l = i.y - n.y, a = s * l - r * o;
  if (Math.abs(a) < 1e-9) return null;
  const d = ((n.x - t.x) * l - (n.y - t.y) * o) / a, c = ((n.x - t.x) * r - (n.y - t.y) * s) / a;
  return d <= 0.02 || d >= 0.98 || c <= 0.02 || c >= 0.98 ? null : { x: t.x + d * s, y: t.y + d * r, t: d };
}
function Ya(t, e, n) {
  const i = n.x - e.x, s = n.y - e.y, r = i * i + s * s || 1, o = Math.max(0, Math.min(1, ((t.x - e.x) * i + (t.y - e.y) * s) / r)), l = e.x + o * i, a = e.y + o * s;
  return { dist: Math.hypot(t.x - l, t.y - a), t: o };
}
function Ga(t, e, n = 7) {
  let i = `M ${t[0].x} ${t[0].y}`;
  for (let s = 0; s < t.length - 1; s++) {
    const r = t[s], o = t[s + 1], l = Math.hypot(o.x - r.x, o.y - r.y) || 1, a = (o.x - r.x) / l, d = (o.y - r.y) / l, c = e.map(([u, p]) => Xa(r, o, u, p)).filter((u) => u !== null).filter((u) => u.t * l > n + 2 && (1 - u.t) * l > n + 2).sort((u, p) => u.t - p.t);
    let h = -1 / 0;
    for (const u of c)
      u.t * l - n <= h + 2 || (i += ` L ${u.x - a * n} ${u.y - d * n}`, i += ` A ${n} ${n} 0 0 1 ${u.x + a * n} ${u.y + d * n}`, h = u.t * l + n);
    i += ` L ${o.x} ${o.y}`;
  }
  return i;
}
const jt = {
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
  usecase: k`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: k`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let R = class extends pt {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Mt, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (t) => {
      t.key === " " && (this._spaceDown = !1);
    }, this._onBlur = () => {
      this._spaceDown = !1;
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
        if (t.key === "Delete" || t.key === "Backspace") {
          if (this._selectedWaypoint) {
            const s = this.scene.edges.find((r) => r.id === this._selectedWaypoint.edgeId);
            s && (t.preventDefault(), this.removeWaypoint(s, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const e = this.scene.edges.find((s) => s.id === this.selectedId), n = this.scene.nodes.find((s) => s.id === this.selectedId);
          if (n != null && n.parentId && !e && n.kind !== "domain-event") return;
          const i = e ?? n;
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
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("keydown", this._onKeyDown), this.addEventListener("keyup", this._onKeyUp), this.addEventListener("blur", this._onBlur);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown), this.removeEventListener("keyup", this._onKeyUp), this.removeEventListener("blur", this._onBlur), super.disconnectedCallback();
  }
  commitRename(t, e) {
    if (this._editingId !== t.id) return;
    this._editingId = null;
    const n = e.trim();
    n && n !== t.label && this.emit("node-renamed", { id: t.id, kind: t.kind, name: n });
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector("svg.main");
    this._zoomBehavior = Ba().scaleExtent([0.15, 4]).filter((e) => e.type === "wheel" ? !0 : this._spaceDown && e.button === 0).on("zoom", (e) => {
      this._t = e.transform;
    }), G(t).call(this._zoomBehavior);
  }
  willUpdate(t) {
    var e;
    if (t.has("scene") && (this._dragPos = null), this._selectedWaypoint && (t.has("selectedId") || t.has("edgePoints"))) {
      const n = this._selectedWaypoint;
      this.selectedId === n.edgeId && n.index < (((e = this.edgePoints[n.edgeId]) == null ? void 0 : e.length) ?? 0) || (this._selectedWaypoint = null);
    }
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
    const s = Math.min(...e.map((c) => c.x - c.w / 2)) - t, r = Math.max(...e.map((c) => c.x + c.w / 2)) + t, o = Math.min(...e.map((c) => c.y - c.h / 2)) - t, l = Math.max(...e.map((c) => c.y + c.h / 2)) + t, a = Math.max(0.15, Math.min(i.width / (r - s), i.height / (l - o), 1.25)), d = Mt.translate(i.width / 2 - a * (s + r) / 2, i.height / 2 - a * (o + l) / 2).scale(a);
    G(n).call(this._zoomBehavior.transform, d);
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
    if (this._dragPos && this._dragPos.id === t.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    if (this._resize && this._resize.id === t.id)
      return { x: this._resize.x, y: this._resize.y };
    if (t.parentId && this._dragPos && this._dragPos.id === t.parentId) {
      const e = this.scene.nodes.find((n) => n.id === t.parentId);
      if (e)
        return { x: t.x + (this._dragPos.x - e.x), y: t.y + (this._dragPos.y - e.y) };
    }
    return { x: t.x, y: t.y };
  }
  emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  // ---- node dragging ------------------------------------------------------
  /** Keep a dragged child inside its container's inner area (below the header). */
  clampToParent(t, e, n) {
    if (t.parentId) {
      const i = this.scene.nodes.find((s) => s.id === t.parentId);
      if (i) {
        const s = this.nodePos(i), r = s.x - i.w / 2 + 10 + t.w / 2, o = s.x + i.w / 2 - 10 - t.w / 2, l = s.y - i.h / 2 + 34 + t.h / 2, a = s.y + i.h / 2 - 10 - t.h / 2;
        e = Math.min(Math.max(e, r), o), n = Math.min(Math.max(n, l), a);
      }
    }
    return { id: t.id, x: e, y: n };
  }
  onNodePointerDown(t, e) {
    if (t.button !== 0 || this._spaceDown) return;
    t.stopPropagation(), this.focus();
    const n = this.toScene(t), i = this.nodePos(e);
    let s = !1;
    const r = (l) => {
      const a = this.toScene(l), d = a.x - n.x, c = a.y - n.y;
      !s && Math.hypot(d, c) < 3 / this._t.k || (s = !0, this._dragPos = this.clampToParent(e, i.x + d, i.y + c));
    }, o = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", o), s && this._dragPos ? this.emit("node-moved", { id: e.id, x: this._dragPos.x, y: this._dragPos.y }) : t.shiftKey ? this.emit("element-multi-toggled", { id: e.id, kind: e.kind }) : this.emit("element-selected", { elementType: "node", id: e.id, kind: e.kind });
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", o);
  }
  // ---- container resize ----------------------------------------------------
  /**
   * Corner-handle drag resizes a container. The dragged corner follows the
   * pointer while the opposite corner stays anchored; with Shift held the
   * resize is symmetric about the centre. Children never leave the box: they
   * keep their absolute position, so each edge stops at the outermost child.
   */
  onResizePointerDown(t, e, n, i) {
    if (t.button !== 0) return;
    t.stopPropagation(), this.focus();
    const s = 160, r = 90, o = { x: e.x, y: e.y, w: e.w, h: e.h }, l = this.scene.nodes.filter((_) => _.parentId === e.id), a = Math.min(...l.map((_) => _.x - _.w / 2)), d = Math.max(...l.map((_) => _.x + _.w / 2)), c = Math.min(...l.map((_) => _.y - _.h / 2)), h = Math.max(...l.map((_) => _.y + _.h / 2)), u = fi(
      l.map((_) => ({ dx: _.x - o.x, dy: _.y - o.y, w: _.w, h: _.h })),
      { w: s, h: r }
    ), p = (_) => {
      const b = this.toScene(_);
      if (_.shiftKey) {
        this._resize = {
          id: e.id,
          x: o.x,
          y: o.y,
          w: Math.max(u.w, 2 * Math.abs(b.x - o.x)),
          h: Math.max(u.h, 2 * Math.abs(b.y - o.y))
        };
        return;
      }
      const v = o.x - n * o.w / 2, M = o.y - i * o.h / 2, L = n > 0 ? Math.max(b.x, v + s, l.length ? d + 10 : -1 / 0) : Math.min(b.x, v - s, l.length ? a - 10 : 1 / 0), U = i > 0 ? Math.max(b.y, M + r, l.length ? h + 10 : -1 / 0) : Math.min(b.y, M - r, l.length ? c - 34 : 1 / 0);
      this._resize = {
        id: e.id,
        x: (v + L) / 2,
        y: (M + U) / 2,
        w: Math.abs(L - v),
        h: Math.abs(U - M)
      };
    }, g = () => {
      window.removeEventListener("pointermove", p), window.removeEventListener("pointerup", g), this._resize && this._resize.id === e.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", p), window.addEventListener("pointerup", g);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(t, e) {
    if (t.button !== 0) return;
    t.stopPropagation();
    const n = this.toScene(t);
    this._pendingLink = { sourceId: e.id, x: n.x, y: n.y };
    const i = (r) => {
      var d;
      const o = this.toScene(r);
      this._pendingLink = { sourceId: e.id, x: o.x, y: o.y };
      const l = (d = this.shadowRoot) == null ? void 0 : d.elementFromPoint(r.clientX, r.clientY), a = l == null ? void 0 : l.closest("[data-node-id]");
      this._hoverNodeId = a ? a.getAttribute("data-node-id") : null;
    }, s = (r) => {
      var a, d;
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s);
      const o = (a = this.shadowRoot) == null ? void 0 : a.elementFromPoint(r.clientX, r.clientY), l = (d = o == null ? void 0 : o.closest("[data-node-id]")) == null ? void 0 : d.getAttribute("data-node-id");
      l && l !== e.id && this.emit("connect-requested", {
        sourceId: e.id,
        targetId: l,
        x: r.clientX,
        y: r.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(t, e, n) {
    const { x: i, y: s } = this.nodePos(t), r = e - i, o = n - s, l = t.w / 2, a = t.h / 2;
    if (r === 0 && o === 0) return { x: i, y: s };
    const d = 1 / Math.max(Math.abs(r) / l, Math.abs(o) / a);
    return { x: i + r * d, y: s + o * d };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(t) {
    const e = [t.sourceId, t.targetId].sort().join("|"), n = this.scene.edges.filter(
      (s) => [s.sourceId, s.targetId].sort().join("|") === e
    );
    return n.length < 2 ? 0 : (n.findIndex((s) => s.id === t.id) - (n.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(t) {
    const e = this.scene.nodes.find((c) => c.id === t.sourceId), n = this.scene.nodes.find((c) => c.id === t.targetId);
    if (!e || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === t.id ? this._wpDrag.points : this.edgePoints[t.id] ?? [], s = this.nodePos(e), r = this.nodePos(n), o = i[0] ?? r, l = i[i.length - 1] ?? s;
    let a = this.borderPoint(e, o.x, o.y), d = this.borderPoint(n, l.x, l.y);
    if (!i.length) {
      const c = this.edgeOffset(t);
      if (c !== 0) {
        const h = Math.hypot(d.x - a.x, d.y - a.y) || 1, u = -(d.y - a.y) / h * c, p = (d.x - a.x) / h * c;
        a = { x: a.x + u, y: a.y + p }, d = { x: d.x + u, y: d.y + p };
      }
    }
    return [a, ...i, d];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(t, e, n) {
    this._wpDrag = { edgeId: t.id, points: e, index: n };
    let i = !1;
    const s = (o) => {
      if (!this._wpDrag) return;
      i = !0;
      const l = this.toScene(o), a = [...this._wpDrag.points];
      a[this._wpDrag.index] = l, this._wpDrag = { ...this._wpDrag, points: a };
    }, r = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", r), this._wpDrag && i && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", r);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(t, e) {
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < t.length - 1; i++) {
      const { dist: s } = Ya(e, t[i], t[i + 1]);
      s < n.dist && (n = { seg: i, dist: s });
    }
    return n.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(t, e, n) {
    const i = this.nearestSegment(e, n), s = [...this.edgePoints[t.id] ?? []];
    s.splice(i, 0, n), this._selectedWaypoint = { edgeId: t.id, index: i }, this.emit("edge-points-changed", { id: t.id, points: s });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(t, e, n) {
    if (t.button !== 0 || this.selectedId !== e.id) return;
    t.stopPropagation();
    const i = this.toScene(t), s = this.nearestSegment(n, i);
    let r = !1;
    const o = (a) => {
      const d = this.toScene(a);
      if (r) {
        if (this._wpDrag) {
          const c = [...this._wpDrag.points];
          c[s] = d, this._wpDrag = { ...this._wpDrag, points: c };
        }
      } else {
        if (Math.hypot(d.x - i.x, d.y - i.y) < 4 / this._t.k) return;
        r = !0, this.focus();
        const c = [...this.edgePoints[e.id] ?? []];
        c.splice(s, 0, d), this._selectedWaypoint = { edgeId: e.id, index: s }, this._wpDrag = { edgeId: e.id, points: c, index: s };
      }
    }, l = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", l), r && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", l);
  }
  removeWaypoint(t, e) {
    const n = [...this.edgePoints[t.id] ?? []];
    n.splice(e, 1), this.emit("edge-points-changed", { id: t.id, points: n });
  }
  renderEdge(t, e, n) {
    const i = t.color ?? "#64748b", s = this.selectedId === t.id, r = s || this.selectedIds.includes(t.sourceId) && this.selectedIds.includes(t.targetId), o = Math.floor((e.length - 1) / 2), l = {
      x: (e[o].x + e[o + 1].x) / 2,
      y: (e[o].y + e[o + 1].y) / 2
    }, a = e.slice(1, -1), d = e.map((c) => `${c.x},${c.y}`).join(" ");
    return k`
      <g data-edge-id=${t.id}>
        <polyline class="edge-hit" points=${d}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(c) => {
      c.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: t.id, kind: t.kind });
    }}
              @dblclick=${(c) => {
      c.stopPropagation(), this.focus(), this.addWaypointAt(t, e, this.toScene(c));
    }}
              @pointerdown=${(c) => this.onEdgeHitPointerDown(c, t, e)}>
          ${t.tooltip ? k`<title>${t.tooltip}</title>` : ""}
        </polyline>
        <path d=${Ga(e, n)}
              fill="none"
              stroke=${i} stroke-width=${r ? 3 : 1.6}
              stroke-dasharray=${t.dashed ? "6 4" : ""}
              marker-end=${t.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${t.label ? k`<text x=${l.x} y=${l.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${i}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(c) => {
      c.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: t.id, kind: t.kind });
    }}
                  @dblclick=${(c) => {
      c.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: t.id,
        kind: t.kind,
        x: c.clientX,
        y: c.clientY
      });
    }}>
                  ${t.label}
                </text>` : ""}
        ${s ? a.map((c, h) => {
      var p;
      const u = ((p = this._selectedWaypoint) == null ? void 0 : p.edgeId) === t.id && this._selectedWaypoint.index === h;
      return k`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${u ? 6 : 5}
                        fill=${u ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(g) => {
        g.button === 0 && (g.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: t.id, index: h }, this.startWaypointDrag(t, [...this.edgePoints[t.id] ?? []], h));
      }}
                        @dblclick=${(g) => {
        g.stopPropagation(), this.removeWaypoint(t, h);
      }}>
                  <title>Arrastra para ajustar · Supr o doble click para quitar el punto</title>
                </circle>`;
    }) : ""}
      </g>
    `;
  }
  markerId(t) {
    return t.replace(/[^a-zA-Z0-9]/g, "");
  }
  renderNode(t) {
    var u, p;
    const { x: e, y: n } = this.nodePos(t), i = this.selectedId === t.id || this.selectedIds.includes(t.id), s = this._hoverNodeId === t.id, r = !!t.container, o = !!t.parentId, l = ((u = this._resize) == null ? void 0 : u.id) === t.id ? this._resize.w : t.w, a = ((p = this._resize) == null ? void 0 : p.id) === t.id ? this._resize.h : t.h, d = l / 2, c = a / 2, h = o && t.label.length > 14 ? `${t.label.slice(0, 13)}…` : t.label;
    return k`
      <g data-node-id=${t.id} transform="translate(${e}, ${n})"
         @pointerdown=${(g) => this.onNodePointerDown(g, t)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: t.id, kind: t.kind });
    }}>
        <rect x=${-d} y=${-c} width=${l} height=${a} rx=${o ? 6 : 10}
              fill=${t.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : t.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${t.dashed ? "6 4" : ""}>
          ${t.tooltip ? k`<title>${t.tooltip}</title>` : ""}
        </rect>
        ${t.badge ? k`<text x=${-d} y=${-c - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${t.badge}</text>` : ""}
        ${t.symbol && jt[t.symbol] && !o ? k`<g transform="translate(${d - 17}, ${-c + 5})" fill="none"
                  stroke=${t.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${jt[t.symbol]}
              </g>` : ""}
        ${o && t.symbol && jt[t.symbol] ? k`<g transform="translate(${-d + 8}, -6)" fill="none"
                  stroke=${t.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${jt[t.symbol]}
              </g>` : ""}
        ${this._editingId === t.id ? k`
              <foreignObject x=${-d + 6} y=${r ? -c + 6 : -14} width=${t.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${r ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${t.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(t, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(t, g.target.value)}
                />
              </foreignObject>` : o ? k`<text x=${-d + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : r ? k`<text x=${-d + 12} y=${-c + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${t.label}</text>` : k`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${t.label}</text>`}
        ${r ? k`<line x1=${-d + 8} y1=${-c + 28} x2=${d - 8} y2=${-c + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && !o ? [
      [d, 0],
      [-d, 0],
      [0, c],
      [0, -c]
    ].map(
      ([g, _]) => k`
                <circle data-handle cx=${g} cy=${_} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(b) => this.onHandlePointerDown(b, t)}>
                  <title>Arrastra hasta otro nodo para crear una relación</title>
                </circle>`
    ) : ""}
        ${r && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, _]) => k`
                <rect data-resize x=${g * d - 6.5} y=${_ * c - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * _ > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(b) => this.onResizePointerDown(b, t, g, _)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
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
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(t) {
    const e = this.toScene(t);
    this._rubber = { a: e, b: e };
    let n = !1;
    const i = (r) => {
      const o = this.toScene(r);
      !n && Math.hypot(o.x - e.x, o.y - e.y) < 4 / this._t.k || (n = !0, this._rubber = { a: e, b: o });
    }, s = () => {
      if (window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s), n && this._rubber) {
        const { a: r, b: o } = this._rubber, l = Math.min(r.x, o.x), a = Math.max(r.x, o.x), d = Math.min(r.y, o.y), c = Math.max(r.y, o.y), h = this.scene.nodes.filter((u) => {
          const p = this.nodePos(u);
          return p.x >= l && p.x <= a && p.y >= d && p.y <= c;
        }).map((u) => u.id);
        this.emit("nodes-boxed", { ids: h });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return k``;
    const { a: t, b: e } = this._rubber;
    return k`
      <rect x=${Math.min(t.x, e.x)} y=${Math.min(t.y, e.y)}
            width=${Math.abs(e.x - t.x)} height=${Math.abs(e.y - t.y)}
            fill="rgba(37, 99, 235, 0.06)" stroke="#2563eb" stroke-width="1"
            stroke-dasharray="4 3" pointer-events="none"></rect>
    `;
  }
  // ---- minimap -------------------------------------------------------------
  sceneBounds(t = 40) {
    const e = this.scene.nodes;
    if (!e.length) return null;
    const n = Math.min(...e.map((o) => o.x - o.w / 2)) - t, i = Math.max(...e.map((o) => o.x + o.w / 2)) + t, s = Math.min(...e.map((o) => o.y - o.h / 2)) - t, r = Math.max(...e.map((o) => o.y + o.h / 2)) + t;
    return { minX: n, minY: s, w: i - n, h: r - s };
  }
  centerViewportOn(t, e) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), s = this._t.k, r = Mt.translate(i.width / 2 - s * t, i.height / 2 - s * e).scale(s);
    G(n).call(this._zoomBehavior.transform, r);
  }
  onMinimapPointer(t, e, n) {
    const i = t.currentTarget.getBoundingClientRect(), s = e.minX + (t.clientX - i.left) / n, r = e.minY + (t.clientY - i.top) / n;
    this.centerViewportOn(s, r);
  }
  renderMinimap() {
    const t = this.sceneBounds();
    if (!t || this.scene.nodes.length < 2) return S``;
    const e = 160, n = 110, i = Math.min(e / t.w, n / t.h), s = this.getBoundingClientRect(), r = (0 - this._t.x) / this._t.k, o = (0 - this._t.y) / this._t.k, l = s.width / this._t.k, a = s.height / this._t.k;
    return S`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(d) => {
      d.stopPropagation();
      try {
        d.currentTarget.setPointerCapture(d.pointerId);
      } catch {
      }
      this.onMinimapPointer(d, t, i);
    }}
        @pointermove=${(d) => {
      var c, h;
      (h = (c = d.currentTarget).hasPointerCapture) != null && h.call(c, d.pointerId) && this.onMinimapPointer(d, t, i);
    }}
      >
        <svg viewBox="0 0 ${e} ${n}">
          ${this.scene.nodes.map((d) => {
      const c = this.nodePos(d);
      return k`<rect
              x=${(c.x - d.w / 2 - t.minX) * i}
              y=${(c.y - d.h / 2 - t.minY) * i}
              width=${Math.max(2, d.w * i)}
              height=${Math.max(2, d.h * i)}
              rx="1" fill=${d.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(r - t.minX) * i}
            y=${(o - t.minY) * i}
            width=${l * i}
            height=${a * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const t = [...new Set(this.scene.edges.map((i) => i.color ?? "#64748b"))], e = [], n = this.scene.edges.map((i) => {
      const s = this.edgePolyline(i);
      if (!s) return k``;
      const r = this.renderEdge(i, s, [...e]);
      for (let o = 0; o < s.length - 1; o++) e.push([s[o], s[o + 1]]);
      return r;
    });
    return S`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(i) => {
      const s = i.target;
      s.closest("[data-node-id]") || s.closest("[data-edge-id]") || this._spaceDown || i.button !== 0 || this.startRubberBand(i);
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
          ${this.renderRubber()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
R.styles = He`
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
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
    }
    svg.main.linking {
      cursor: crosshair;
    }
    svg.main.panning {
      cursor: grab;
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
D([
  it({ attribute: !1 })
], R.prototype, "scene", 2);
D([
  it({ attribute: !1 })
], R.prototype, "selectedId", 2);
D([
  it({ attribute: !1 })
], R.prototype, "selectedIds", 2);
D([
  it({ type: Boolean })
], R.prototype, "connectable", 2);
D([
  it({ attribute: !1 })
], R.prototype, "edgePoints", 2);
D([
  $()
], R.prototype, "_t", 2);
D([
  $()
], R.prototype, "_dragPos", 2);
D([
  $()
], R.prototype, "_pendingLink", 2);
D([
  $()
], R.prototype, "_hoverNodeId", 2);
D([
  $()
], R.prototype, "_editingId", 2);
D([
  $()
], R.prototype, "_spaceDown", 2);
D([
  $()
], R.prototype, "_wpDrag", 2);
D([
  $()
], R.prototype, "_selectedWaypoint", 2);
D([
  $()
], R.prototype, "_resize", 2);
D([
  $()
], R.prototype, "_rubber", 2);
R = D([
  Be("modux-canvas")
], R);
async function Ka(t, e) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((a) => a.e), i = new n(), r = {
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
    children: t.nodes.map((a) => ({ id: a.id, width: a.w, height: a.h })),
    edges: t.edges.map((a) => ({ id: a.id, sources: [a.sourceId], targets: [a.targetId] }))
  }, o = await i.layout(r), l = {};
  for (const a of o.children ?? [])
    l[a.id] = {
      x: (a.x ?? 0) + (a.width ?? 0) / 2,
      y: (a.y ?? 0) + (a.height ?? 0) / 2
    };
  return l;
}
var Za = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, T = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ja(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && Za(e, n, s), s;
};
const De = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Qa = Object.keys(De), ja = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 }
], tl = ["CORE", "SUPPORTING", "GENERIC"], ct = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function el(t, e) {
  switch (e) {
    case "module":
      return { elementType: "module", id: t.replace(/^tgt:/, "") };
    case "aggregate":
      return { elementType: "aggregate", id: t };
    case "use-case":
      return { elementType: "use-case", id: t };
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
function nl(t, e) {
  const n = (t ?? []).find((i) => i.steps.some((s) => s.id === e));
  return n ? { elementType: "process", id: n.id } : null;
}
let A = class extends pt {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._multi = [], this._newViewName = "", this._activeViewId = "";
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
    return mi(this.layout[t]);
  }
  writeViewLayout(t, e) {
    this.layout = { ...this.layout, [t]: e }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(t) {
    if (t.has("layout")) {
      const e = this.viewLayout("context-map").detail;
      (e === "contexts" || e === "detail") && (this._detail = e);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(t) {
    this._detail = t, this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: t });
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
          pos: this.viewLayout(e.view).nodes[e.id] ?? null
        }
      ] : e.kind === "set-edge-points" ? [
        {
          kind: "set-edge-points",
          view: e.view,
          id: e.id,
          points: this.viewLayout(e.view).edges[e.id] ?? null
        }
      ] : e.kind === "resize-node" ? [
        {
          kind: "resize-node",
          view: e.view,
          id: e.id,
          size: ((n = this.viewLayout(e.view).sizes) == null ? void 0 : n[e.id]) ?? null
        }
      ] : this.inverseOf(e) ?? [];
    });
  }
  applyOps(t) {
    for (const e of t)
      if (e.kind === "move-node") {
        const n = this.viewLayout(e.view), i = { ...n.nodes };
        e.pos ? i[e.id] = e.pos : delete i[e.id], this.writeViewLayout(e.view, { ...n, nodes: i });
      } else if (e.kind === "set-edge-points") {
        const n = this.viewLayout(e.view), i = { ...n.edges };
        e.points && e.points.length ? i[e.id] = e.points : delete i[e.id], this.writeViewLayout(e.view, { ...n, edges: i });
      } else if (e.kind === "resize-node") {
        const n = this.viewLayout(e.view), i = { ...n.sizes ?? {} };
        e.size ? i[e.id] = e.size : delete i[e.id], this.writeViewLayout(e.view, { ...n, sizes: i });
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
      case "set-relation-type": {
        const e = this.model.relations.find(
          (n) => n.sourceId === t.sourceId && n.targetId === t.targetId
        );
        return e ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: e.type }] : null;
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
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: t.id }];
      case "remove-domain-event": {
        for (const e of this.model.modules) {
          const n = (e.domainEvents ?? []).find((i) => i.id === t.id);
          if (n) return [{ kind: "add-domain-event", id: n.id, name: n.name, moduleId: e.id }];
        }
        return null;
      }
      case "rename-element": {
        const n = (t.type === "module" ? this.model.modules : t.type === "aggregate" ? this.model.aggregates ?? [] : t.type === "domain-event" ? this.model.modules.flatMap((i) => i.domainEvents ?? []) : this.model.entities ?? []).find((i) => i.id === t.id);
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
      case "add-view":
        return [{ kind: "remove-view", id: t.id }];
      case "remove-view": {
        const e = (this.model.views ?? []).find((n) => n.id === t.id);
        return e ? [{ kind: "add-view", id: e.id, name: e.name, memberIds: e.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: t.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
      case "remove-process-step": {
        const e = (this.model.processes ?? []).find((s) => s.id === t.processId), n = (e == null ? void 0 : e.steps.findIndex((s) => s.id === t.id)) ?? -1;
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
    const { id: e, x: n, y: i } = t.detail, s = this._view, r = this.viewLayout(s), o = r.nodes[e] ?? null;
    let l = { x: n, y: i };
    const a = this.sceneFor(s), d = a.nodes.find((h) => h.id === e);
    if (d != null && d.parentId) {
      const h = a.nodes.find((u) => u.id === d.parentId);
      h && (l = { x: n - h.x, y: i - h.y });
    }
    this.writeViewLayout(s, { ...r, nodes: { ...r.nodes, [e]: l } });
    const c = [{ kind: "move-node", view: s, id: e, pos: o }];
    if (s === "processes") {
      const h = this.stepReorderCommand(e);
      if (h) {
        const u = this.inverseOf(h);
        u && c.unshift(...u), this.command(h, !1);
      }
    }
    this.pushUndoEntry(c);
  }
  onNodeResized(t) {
    var c;
    const { id: e, x: n, y: i, w: s, h: r } = t.detail, o = this._view, l = this.viewLayout(o), a = this.sceneFor(o).nodes.filter((h) => h.parentId === e);
    this.pushUndoEntry([
      { kind: "resize-node", view: o, id: e, size: ((c = l.sizes) == null ? void 0 : c[e]) ?? null },
      { kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null },
      ...a.map((h) => ({ kind: "move-node", view: o, id: h.id, pos: l.nodes[h.id] ?? null }))
    ]);
    const d = { ...l.nodes, [e]: { x: n, y: i } };
    for (const h of a) d[h.id] = { x: h.x - n, y: h.y - i };
    this.writeViewLayout(o, {
      ...l,
      nodes: d,
      sizes: { ...l.sizes ?? {}, [e]: { w: s, h: r } }
    });
  }
  onEdgePointsChanged(t) {
    const { id: e, points: n } = t.detail, i = this._view, s = this.viewLayout(i);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: i, id: e, points: s.edges[e] ?? null }
    ]);
    const r = { ...s.edges };
    n.length ? r[e] = n : delete r[e], this.writeViewLayout(i, { ...s, edges: r });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(t) {
    const e = this.owningProcessOf(t);
    if (!e) return null;
    const n = Je(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((o) => [o.id, o.x])), s = [...e.steps].sort(
      (o, l) => (i.get(o.id) ?? 0) - (i.get(l.id) ?? 0)
    );
    if (s.every((o, l) => o.id === e.steps[l].id)) return null;
    const r = s.findIndex((o) => o.id === t);
    return {
      kind: "move-process-step",
      processId: e.id,
      id: t,
      afterStepId: r > 0 ? s[r - 1].id : void 0
    };
  }
  onConnectRequested(t) {
    const { sourceId: e, targetId: n, x: i, y: s } = t.detail;
    if (this._view !== "context-map") return;
    const r = new Set(this.model.externalSystems.map((l) => l.id));
    r.has(e) || r.has(n) || this.model.relations.some(
      (l) => l.sourceId === e && l.targetId === n || l.sourceId === n && l.targetId === e
    ) || (this._relationPicker = { sourceId: e, targetId: n, mode: "create", x: i ?? 0, y: s ?? 0 });
  }
  /** Apply the picker's choice: create the new relation or retype the existing one. */
  pickRelationType(t) {
    const e = this._relationPicker;
    if (this._relationPicker = null, !e) return;
    if (this._relationType = t, e.mode === "create") {
      this.command({ kind: "add-relation", sourceId: e.sourceId, targetId: e.targetId, type: t });
      return;
    }
    const n = this.model.relations.find(
      (i) => i.sourceId === e.sourceId && i.targetId === e.targetId
    );
    n && n.type !== t && this.command({ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: t });
  }
  onDeleteRequested(t) {
    const { elementType: e, id: n, kind: i } = t.detail;
    if (this._view === "context-map" && e === "edge" && i === "relation") {
      const s = /^rel:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (e === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((r) => r.moduleId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: n });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((r) => r.aggregateId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate", id: n });
      return;
    }
    if (e === "node" && i === "domain-event") {
      this._selectedId = null, this.command({ kind: "remove-domain-event", id: n });
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
      const s = this.owningProcessOf(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: s.id, id: n });
    }
  }
  owningProcessOf(t) {
    return (this.model.processes ?? []).find((e) => e.steps.some((n) => n.id === t));
  }
  onNodeRenamed(t) {
    const { id: e, kind: n, name: i } = t.detail;
    (n === "module" || n === "aggregate" || n === "entity" || n === "process-step" || n === "domain-event") && this.command({ kind: "rename-element", type: n, id: e.replace(/^tgt:/, ""), name: i });
  }
  addStepFromToolbar() {
    const t = this._newStepName.trim();
    if (!t || !this._selectedId) return;
    const e = (this.model.processes ?? []).find((s) => s.id === this._selectedId), n = e ?? this.owningProcessOf(this._selectedId);
    if (!n) return;
    const i = e ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: n.id,
      id: `step-${ct(t)}`,
      name: t,
      stepType: this._newStepType,
      roleId: this._newStepType === "HUMAN" && this._newStepRole.trim() || void 0,
      deadline: this._newStepType === "HUMAN" && this._newStepDeadline.trim() || void 0,
      afterStepId: i
    }), this._newStepName = "", this._newStepDeadline = "";
  }
  onElementSelected(t) {
    var e;
    if (this._selectedId = t.detail.id, this._multi = [], t.detail.kind === "process-step") {
      const n = (e = this.owningProcessOf(t.detail.id)) == null ? void 0 : e.steps.find((i) => i.id === t.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    this.emit("modux-select", { elementType: t.detail.kind, id: t.detail.id });
  }
  onMultiToggled(t) {
    const { id: e } = t.detail;
    this._multi = this._multi.includes(e) ? this._multi.filter((n) => n !== e) : [...this._multi, e];
  }
  onNodesBoxed(t) {
    this._multi = t.detail.ids;
  }
  /** Canvas node ids → catalog element ids (view members). */
  memberIdsFromSelection() {
    const t = this.sceneFor(this._view), e = /* @__PURE__ */ new Set();
    for (const n of this._multi) {
      const i = t.nodes.find((s) => s.id === n);
      if (i)
        switch (i.kind) {
          case "module":
          case "external-system":
            e.add(n.replace(/^tgt:/, ""));
            break;
          case "aggregate":
          case "entity":
          case "process":
            e.add(n);
            break;
          case "flow":
            e.add(n.replace(/^flow:/, ""));
            break;
          case "process-step": {
            const s = this.owningProcessOf(n);
            s && e.add(s.id);
            break;
          }
        }
    }
    return [...e];
  }
  createViewFromSelection() {
    const t = this._newViewName.trim(), e = this.memberIdsFromSelection();
    !t || !e.length || (this.command({ kind: "add-view", id: `view-${ct(t)}`, name: t, memberIds: e }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const t = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
    if (!t) return this.model;
    const e = new Set(t.memberIds), n = this.model.modules.filter((a) => e.has(a.id)), i = new Set(n.map((a) => a.id)), s = this.model.externalSystems.filter((a) => e.has(a.id)), r = new Set(s.map((a) => a.id)), o = (this.model.aggregates ?? []).filter(
      (a) => e.has(a.id) || i.has(a.moduleId)
    ), l = new Set(o.map((a) => a.id));
    return {
      ...this.model,
      modules: n,
      externalSystems: s,
      relations: this.model.relations.filter(
        (a) => i.has(a.sourceId) && i.has(a.targetId)
      ),
      flows: this.model.flows.filter(
        (a) => e.has(a.id) || (i.has(a.sourceId) || r.has(a.sourceId)) && (i.has(a.targetId) || r.has(a.targetId))
      ),
      aggregates: o,
      entities: (this.model.entities ?? []).filter((a) => l.has(a.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (a) => l.has(a.sourceAggregateId) && l.has(a.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (a) => e.has(a.id) || (a.ownerModuleId ? i.has(a.ownerModuleId) : !1)
      )
    };
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
    if (this._view === "context-map" && t.detail.elementType === "edge" && t.detail.kind === "relation") {
      const n = /^rel:(.+)->(.+)$/.exec(t.detail.id);
      n && (this._relationPicker = {
        sourceId: n[1],
        targetId: n[2],
        mode: "edit",
        x: t.detail.x ?? 0,
        y: t.detail.y ?? 0
      });
      return;
    }
    const e = t.detail.kind === "process-step" ? nl(this.model.processes, t.detail.id) : el(t.detail.id, t.detail.kind);
    e && this.emit("modux-activate", e);
  }
  createElementFromToolbar() {
    var e, n, i, s, r, o, l, a, d;
    const t = this._newName.trim();
    if (t) {
      if (this._view === "context-map")
        if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const c = (e = this.model.modules.find((u) => u.id === this._selectedId)) == null ? void 0 : e.id, h = this._newModuleId || c || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!h) return;
          this.command({ kind: "add-domain-event", id: `ev-${ct(t)}`, name: t, moduleId: h });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${ct(t)}`,
            name: t,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const c = this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id);
        if (!c) return;
        this.command({ kind: "add-aggregate", id: `agg-${ct(t)}`, name: t, moduleId: c });
      } else if (this._view === "flows") {
        const c = this._newTriggerAggId || ((r = (s = this.model.aggregates) == null ? void 0 : s[0]) == null ? void 0 : r.id), h = this._newTargetId || ((o = this.model.modules[0]) == null ? void 0 : o.id), u = this._newTriggerEvent.trim();
        if (!c || !h || !u) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ct(t)}`,
          name: t,
          archetype: this._newArchetype,
          triggerAggregateId: c,
          triggerEvent: u,
          targetId: h
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const c = this._newModuleId || ((l = this.model.modules[0]) == null ? void 0 : l.id);
        if (!c) return;
        this.command({
          kind: "add-process",
          id: `proc-${ct(t)}`,
          name: t,
          moduleId: c,
          triggerAggregateId: this._newTriggerAggId || ((d = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : d.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(t) {
    const e = this.viewLayout(t), n = this.filteredModel();
    return t === "aggregates" ? Oi(n, e.nodes) : t === "flows" ? Wi(n, e.nodes) : t === "processes" ? Je(n, e.nodes) : Ti(n, e.nodes, this._detail === "detail", e.sizes ?? {});
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var a;
    const t = this._view, e = this.sceneFor(t);
    if (!e.nodes.length) return;
    const n = e.nodes.filter((d) => !d.parentId), i = new Set(n.map((d) => d.id)), s = {
      nodes: n,
      edges: e.edges.filter((d) => i.has(d.sourceId) && i.has(d.targetId))
    }, o = await Ka(s, t === "flows" || t === "processes" ? "layered" : "force"), l = this.viewLayout(t);
    this.pushUndoEntry([
      ...n.map((d) => ({
        kind: "move-node",
        view: t,
        id: d.id,
        pos: l.nodes[d.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(l.edges).map((d) => ({
        kind: "set-edge-points",
        view: t,
        id: d,
        points: l.edges[d]
      }))
    ]), this.writeViewLayout(t, { nodes: o, edges: {}, sizes: l.sizes }), await this.updateComplete, (a = this.renderRoot.querySelector("modux-canvas")) == null || a.fit();
  }
  render() {
    const t = this.sceneFor(this._view);
    return S`
      <div class="toolbar">
        <div class="tabs">
          ${ja.map(
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
        <select
          title="Limitar el lienzo a una vista del modelo"
          @change=${(e) => this._activeViewId = e.target.value}
        >
          <option value="" ?selected=${this._activeViewId === ""}>Vista: todo el modelo</option>
          ${(this.model.views ?? []).filter((e) => e.kind === "CURATED").map(
      (e) => S`<option value=${e.id} ?selected=${e.id === this._activeViewId}>
                  Vista: ${e.name}
                </option>`
    )}
        </select>
        <div class="spacer"></div>
        ${this._multi.length ? S`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                .value=${this._newViewName}
                @input=${(e) => this._newViewName = e.target.value}
                @keydown=${(e) => e.key === "Enter" && this.createViewFromSelection()}
              />
              <button class="tab" title="Crear una vista modux con la selección" @click=${this.createViewFromSelection}>
                ⊞ Vista (${this._multi.length})
              </button>
              <span class="sep"></span>
            ` : ""}
        <input
          class="new-name"
          placeholder=${{
      "context-map": this._detail === "detail" && this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : "Nuevo contexto…",
      aggregates: "Nuevo agregado…",
      flows: "Nuevo flow…",
      processes: "Nuevo proceso…"
    }[this._view]}
          .value=${this._newName}
          @input=${(e) => this._newName = e.target.value}
          @keydown=${(e) => e.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "context-map" && this._detail === "detail" ? S`<select
              title="Qué crear: un contexto, o un evento de dominio dentro de uno"
              @change=${(e) => this._newContextMapKind = e.target.value}
            >
              <option value="module" ?selected=${this._newContextMapKind === "module"}>
                Contexto
              </option>
              <option value="domain-event" ?selected=${this._newContextMapKind === "domain-event"}>
                Evento de dominio
              </option>
            </select>` : ""}
        ${this._view === "context-map" && (this._detail !== "detail" || this._newContextMapKind === "module") ? S`<select
              title="Subdominio del nuevo contexto"
              @change=${(e) => this._newSubdomain = e.target.value}
            >
              ${tl.map(
      (e) => S`<option value=${e} ?selected=${e === this._newSubdomain}>${e}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "domain-event" ? S`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo evento"}
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
        <label ?hidden=${this._view !== "context-map"}>Detalle:</label>
        <select
          ?hidden=${this._view !== "context-map"}
          title="Nivel de detalle: contextos, o sus agregados y casos de uso"
          .value=${this._detail}
          @change=${(e) => this.setDetail(e.target.value)}
        >
          <option value="contexts" ?selected=${this._detail === "contexts"}>Contextos</option>
          <option value="detail" ?selected=${this._detail === "detail"}>
            Agregados y casos de uso
          </option>
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
        .selectedIds=${this._multi}
        .connectable=${this._view === "context-map"}
        @node-moved=${this.onNodeMoved}
        @node-resized=${this.onNodeResized}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
        @node-renamed=${this.onNodeRenamed}
        @edge-points-changed=${this.onEdgePointsChanged}
        @element-multi-toggled=${this.onMultiToggled}
        @nodes-boxed=${this.onNodesBoxed}
        @undo-requested=${this.undo}
        @redo-requested=${this.redo}
        @element-selected=${this.onElementSelected}
        @element-activated=${this.onElementActivated}
        @selection-cleared=${() => {
      this._selectedId = null, this._multi = [], this.emit("modux-select", null);
    }}
      ></modux-canvas>
      <div class="hint">
        ${this._view === "context-map" ? S`Arrastra para reordenar · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : S`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
      </div>
      ${this.renderRelationPicker()}
    `;
  }
  renderRelationPicker() {
    var n;
    const t = this._relationPicker;
    if (!t) return "";
    const e = t.mode === "edit" ? (n = this.model.relations.find(
      (i) => i.sourceId === t.sourceId && i.targetId === t.targetId
    )) == null ? void 0 : n.type : this._relationType;
    return S`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${t.x}px; top:${t.y}px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">
          ${t.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Qa.map(
      (i) => S`
            <button
              class="picker-item ${i === e ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${De[i].abbr}</span>
              <span class="name">${De[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
A.styles = He`
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
T([
  it({ attribute: !1 })
], A.prototype, "model", 2);
T([
  it({ attribute: !1 })
], A.prototype, "layout", 2);
T([
  $()
], A.prototype, "_view", 2);
T([
  $()
], A.prototype, "_detail", 2);
T([
  $()
], A.prototype, "_relationType", 2);
T([
  $()
], A.prototype, "_relationPicker", 2);
T([
  $()
], A.prototype, "_selectedId", 2);
T([
  $()
], A.prototype, "_newName", 2);
T([
  $()
], A.prototype, "_newSubdomain", 2);
T([
  $()
], A.prototype, "_newModuleId", 2);
T([
  $()
], A.prototype, "_newContextMapKind", 2);
T([
  $()
], A.prototype, "_newArchetype", 2);
T([
  $()
], A.prototype, "_newTriggerAggId", 2);
T([
  $()
], A.prototype, "_newTriggerEvent", 2);
T([
  $()
], A.prototype, "_newTargetId", 2);
T([
  $()
], A.prototype, "_undoStack", 2);
T([
  $()
], A.prototype, "_redoStack", 2);
T([
  $()
], A.prototype, "_newStepName", 2);
T([
  $()
], A.prototype, "_newStepType", 2);
T([
  $()
], A.prototype, "_newStepRole", 2);
T([
  $()
], A.prototype, "_newStepDeadline", 2);
T([
  $()
], A.prototype, "_editStepRole", 2);
T([
  $()
], A.prototype, "_editStepDeadline", 2);
T([
  $()
], A.prototype, "_editStepComp", 2);
T([
  $()
], A.prototype, "_multi", 2);
T([
  $()
], A.prototype, "_newViewName", 2);
T([
  $()
], A.prototype, "_activeViewId", 2);
A = T([
  Be("modux-editor")
], A);
var il = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, yt = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? sl(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && il(e, n, s), s;
};
let nt = class extends pt {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._toast = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
      if (this._interacting = !1, this._pendingVersion) {
        const t = this._pendingVersion;
        this._pendingVersion = null, this.onVersionSignal(t);
      }
    }, this._onPageHide = () => {
      this._layoutDirty && (this._layoutDirty = !1, navigator.sendBeacon(
        `${this.base}/layout`,
        new Blob([JSON.stringify(this._layout)], { type: "application/json" })
      ));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("pointerdown", this._onPointerDown, !0), window.addEventListener("pointerup", this._onPointerUp, !0), window.addEventListener("pagehide", this._onPageHide), this.reload(), this.startLiveUpdates();
  }
  disconnectedCallback() {
    var t;
    window.clearTimeout(this._layoutTimer), window.clearInterval(this._pollTimer), (t = this._sse) == null || t.close(), this.removeEventListener("pointerdown", this._onPointerDown, !0), window.removeEventListener("pointerup", this._onPointerUp, !0), window.removeEventListener("pagehide", this._onPageHide), this._onPageHide(), super.disconnectedCallback();
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
        let r = `El servidor rechazó el comando (${n.status})`;
        try {
          const o = await n.json();
          o != null && o.message && (r = o.message);
        } catch {
        }
        this.showToast(r);
        return;
      }
      const [i, s] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/version`)
      ]);
      i.ok && (this._model = await i.json()), s.ok && (this._lastVersion = (await s.json()).version);
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
    this._layout = t.detail.layout, this._layoutDirty = !0, window.clearTimeout(this._layoutTimer), this._layoutTimer = window.setTimeout(() => {
      this._layoutDirty = !1, fetch(`${this.base}/layout`, {
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
nt.styles = He`
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
yt([
  it()
], nt.prototype, "base", 2);
yt([
  $()
], nt.prototype, "_model", 2);
yt([
  $()
], nt.prototype, "_layout", 2);
yt([
  $()
], nt.prototype, "_error", 2);
yt([
  $()
], nt.prototype, "_saving", 2);
yt([
  $()
], nt.prototype, "_toast", 2);
nt = yt([
  Be("modux-editor-connected")
], nt);
export {
  rl as CONTAINER_HEADER,
  ol as CONTAINER_INSET,
  R as ModuxCanvas,
  A as ModuxEditor,
  nt as ModuxEditorConnected,
  Oi as aggregatesScene,
  pi as containerFit,
  fi as containerMinSize,
  Ti as contextMapScene,
  $i as flowCoherence,
  Wi as flowsScene,
  mi as normalizeViewLayout,
  Je as processesScene,
  xi as relationEdgeId
};
