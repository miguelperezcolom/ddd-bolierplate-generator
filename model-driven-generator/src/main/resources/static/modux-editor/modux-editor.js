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
  let i = e.w / 2, s = e.w / 2, o = e.h / 2, r = e.h / 2;
  for (const a of n)
    i = Math.max(i, -a.dx + a.w / 2 + 10), s = Math.max(s, a.dx + a.w / 2 + 10), o = Math.max(o, -a.dy + a.h / 2 + 34), r = Math.max(r, a.dy + a.h / 2 + 10);
  return {
    x: t.x + (s - i) / 2,
    y: t.y + (r - o) / 2,
    w: i + s,
    h: o + r
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
}, ke = 168, Se = 56, Tn = 34, Nn = 14, wi = 14, Pt = 108, Rt = 32, Mn = 12, Cn = 10, Lt = 2, vi = Lt * Pt + (Lt - 1) * Mn + 2 * Nn;
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
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" }
}, Ei = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "read-model": "Read model"
};
function ki(t) {
  const e = Math.max(1, Math.ceil(t / Lt)), n = e * Rt + (e - 1) * Cn;
  return { w: vi, h: Tn + n + wi };
}
function Si(t, e) {
  const n = t % Lt, i = Math.floor(t / Lt);
  return {
    x: -e.w / 2 + Nn + n * (Pt + Mn) + Pt / 2,
    y: -e.h / 2 + Tn + i * (Rt + Cn) + Rt / 2
  };
}
function Ai(t, e, n, i, s, o) {
  const a = [
    ...(t.aggregates ?? []).filter((f) => f.moduleId === e.id).map((f) => ({ id: f.id, name: f.name, kind: "aggregate" })),
    ...(e.useCases ?? []).map((f) => ({ id: f.id, name: f.name, kind: "use-case" })),
    ...(e.domainEvents ?? []).map(
      (f) => ({ id: f.id, name: f.name, kind: "domain-event" })
    ),
    ...(e.readModels ?? []).map(
      (f) => ({ id: f.id, name: f.name, kind: "read-model" })
    )
  ];
  if (!a.length)
    return [{ ...i, x: n.x, y: n.y, w: ke, h: Se }];
  const d = o[e.id] ?? ki(a.length), c = a.map((f, g) => s[f.id] ?? Si(g, d)), l = pi(
    n,
    d,
    c.map((f) => ({ dx: f.x, dy: f.y, w: Pt, h: Rt }))
  ), h = {
    ...i,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, u = a.map((f, g) => {
    const _ = c[g], x = Ii[f.kind];
    return {
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: n.x + _.x,
      y: n.y + _.y,
      w: Pt,
      h: Rt,
      symbol: x.symbol,
      fill: x.fill,
      stroke: x.stroke,
      parentId: e.id,
      tooltip: `${Ei[f.kind]} ${f.name}`
    };
  });
  return [h, ...u];
}
function Ti(t, e, n = !1, i = {}) {
  const s = [
    ...t.modules.map((l) => ({ ref: l, external: !1 })),
    ...t.externalSystems.map((l) => ({ ref: l, external: !0 }))
  ], o = s.flatMap((l, h) => {
    const u = e[l.ref.id] ?? bi(h, s.length);
    if (l.external)
      return [
        {
          id: l.ref.id,
          label: l.ref.name,
          x: u.x,
          y: u.y,
          w: ke,
          h: Se,
          kind: "external-system",
          symbol: "component",
          fill: "#ffffff",
          stroke: "#64748b",
          dashed: !0,
          badge: "EXTERNAL",
          tooltip: `${l.ref.name} (sistema externo)`
        }
      ];
    const f = l.ref, g = f.subdomainType ?? "GENERIC", _ = {
      id: f.id,
      label: f.name,
      kind: "module",
      symbol: "component",
      fill: gi[g],
      stroke: "#94a3b8",
      badge: g,
      tooltip: `${f.name} — subdominio ${g}`
    };
    return n ? Ai(t, f, u, _, e, i) : [{ ..._, x: u.x, y: u.y, w: ke, h: Se }];
  });
  o.sort((l, h) => (l.parentId ? 1 : 0) - (h.parentId ? 1 : 0));
  const r = t.relations.map((l) => ({
    id: xi(l.sourceId, l.targetId),
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "relation",
    label: _i[l.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${l.type} (${l.sourceId} upstream → ${l.targetId} downstream)`
  })), a = t.flows.map((l) => {
    var g, _, x, y;
    const h = $i(t, l), u = n ? (_ = (g = t.modules.find((T) => T.id === l.sourceId)) == null ? void 0 : g.domainEvents) == null ? void 0 : _.find((T) => T.name === l.triggerEvent) : void 0, f = n && l.readModelName ? (y = (x = t.modules.find((T) => T.id === l.targetId)) == null ? void 0 : x.readModels) == null ? void 0 : y.find((T) => T.name === l.readModelName) : void 0;
    return {
      id: `flow:${l.id}`,
      sourceId: (u == null ? void 0 : u.id) ?? l.sourceId,
      targetId: (f == null ? void 0 : f.id) ?? l.targetId,
      kind: "flow",
      label: l.name,
      color: yi[h],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${l.name} [${l.archetype}] — ${h}`
    };
  }), d = new Set(o.map((l) => l.id)), c = n ? (t.emissions ?? []).filter((l) => d.has(l.sourceId) && d.has(l.domainEventId)).map((l) => ({
    id: `emit:${l.sourceId}->${l.domainEventId}`,
    sourceId: l.sourceId,
    targetId: l.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [];
  return { nodes: o, edges: [...r, ...a, ...c] };
}
const Ni = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Mi = 176, Ci = 60, Pi = 140, Ri = 40;
function Li(t) {
  const e = {}, n = t.aggregates ?? [], i = t.entities ?? [];
  return t.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    n.filter((d) => d.moduleId === s.id).forEach((d, c) => {
      const l = i.filter((u) => u.aggregateId === d.id).length, h = 140 + c * (170 + l * 60);
      e[d.id] = { x: r, y: h }, i.filter((u) => u.aggregateId === d.id).forEach((u, f) => {
        e[u.id] = { x: r + 60, y: h + 100 + f * 60 };
      });
    });
  }), n.filter((s) => !t.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    e[s.id] = { x: 220 + o * 340, y: 640 };
  }), e;
}
function Oi(t, e) {
  const n = Li(t), i = (c) => e[c] ?? n[c] ?? { x: 200, y: 200 }, s = new Map(t.modules.map((c) => [c.id, c])), o = (t.aggregates ?? []).map((c) => {
    const l = s.get(c.moduleId), h = (l == null ? void 0 : l.subdomainType) ?? "GENERIC", u = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
      w: Mi,
      h: Ci,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ni[h],
      stroke: "#64748b",
      badge: l ? `${l.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${l ? ` — módulo ${l.name} (${h})` : ""}`
    };
  }), r = (t.entities ?? []).map((c) => {
    const l = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: l.x,
      y: l.y,
      w: Pi,
      h: Ri,
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
  })), d = (t.aggregateReferences ?? []).map((c, l) => ({
    id: `aggref:${l}:${c.sourceAggregateId}->${c.targetAggregateId}`,
    sourceId: c.sourceAggregateId,
    targetId: c.targetAggregateId,
    kind: "aggregate-reference",
    label: c.label,
    color: "#475569",
    arrow: !0,
    tooltip: c.label ? `Referencia: ${c.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...o, ...r],
    edges: [...a, ...d]
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
  const n = t.flows, i = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, c;
    return ((c = (d = t.aggregates) == null ? void 0 : d.find((l) => l.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return n.forEach((a, d) => {
    const c = 120 + d * 130, l = Di[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const x = e[h] ?? { x: 160, y: c };
      i.push({
        id: h,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : h,
        x: x.x,
        y: x.y,
        w: zi,
        h: Ui,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const u = `flow:${a.id}`, f = e[u] ?? { x: 470, y: c };
    i.push({
      id: u,
      label: a.name,
      x: f.x,
      y: f.y,
      w: Hi,
      h: Vi,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: l,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const g = qi(t, a), _ = `tgt:${g.id}`;
    if (!o.has(_)) {
      o.add(_);
      const x = e[_] ?? { x: 790, y: c };
      i.push({
        id: _,
        label: g.label,
        x: x.x,
        y: x.y,
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
      id: `fe:${a.id}:in`,
      sourceId: h,
      targetId: u,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: u,
      targetId: _,
      kind: "flow-delivery",
      color: l,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const Xi = 190, Yi = 56, ye = 170, Gi = 52;
function Je(t, e) {
  const n = [], i = [], s = (o) => {
    var r;
    return (r = t.modules.find((a) => a.id === o)) == null ? void 0 : r.name;
  };
  return (t.processes ?? []).forEach((o, r) => {
    const a = 140 + r * 240, d = e[o.id] ?? { x: 150, y: a };
    n.push({
      id: o.id,
      label: o.name,
      x: d.x,
      y: d.y,
      w: Xi,
      h: Yi,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((l, h) => {
      const u = l.type === "HUMAN", f = e[l.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (n.push({
        id: l.id,
        label: l.name,
        x: f.x,
        y: f.y,
        w: ye,
        h: Gi,
        kind: "process-step",
        symbol: u ? "person" : "gear",
        fill: u ? "#fef3c7" : "#ffffff",
        stroke: u ? "#d97706" : "#64748b",
        badge: u ? `HUMAN${l.roleId ? ` · ${l.roleId}` : ""}${l.deadline ? ` · ⏱ ${l.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${l.name}${l.useCaseId ? ` — use case ${l.useCaseId}` : ""}${l.deadline ? ` · deadline ${l.deadline}` : ""}`
      }), i.push({
        id: `pe:${o.id}:${h}`,
        sourceId: c,
        targetId: l.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), l.compensationUseCaseId) {
        const g = `comp:${l.id}`, _ = e[g] ?? { x: f.x, y: f.y + 90 };
        n.push({
          id: g,
          label: l.compensationUseCaseId,
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
          id: `pc:${l.id}`,
          sourceId: l.id,
          targetId: g,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = l.id;
    }), o.onCompletionEventName) {
      const l = `done:${o.id}`, h = e[l] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      n.push({
        id: l,
        label: o.onCompletionEventName,
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
        id: `pd:${o.id}`,
        sourceId: c,
        targetId: l,
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
  const n = t.length === 1 ? t[0] : e.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[o + 1], t[0]);
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
const { is: Ji, defineProperty: Qi, getOwnPropertyDescriptor: ji, getOwnPropertyNames: ts, getOwnPropertySymbols: es, getPrototypeOf: ns } = Object, lt = globalThis, tn = lt.trustedTypes, is = tn ? tn.emptyScript : "", we = lt.reactiveElementPolyfillSupport, Nt = (t, e) => t, re = { toAttribute(t, e) {
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
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), lt.litPropertyMetadata ?? (lt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
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
    const { get: s, set: o } = ji(this.prototype, e) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(e, a, i);
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
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : re).toAttribute(n, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : re;
      this._$Em = s;
      const c = d.fromAttribute(n, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, o) {
    var r;
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = a.getPropertyOptions(e)), !((i.hasChanged ?? Ve)(o, n) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? n ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: a } = r, d = this[o];
        a !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, r, d);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
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
wt.elementStyles = [], wt.shadowRootOptions = { mode: "open" }, wt[Nt("elementProperties")] = /* @__PURE__ */ new Map(), wt[Nt("finalized")] = /* @__PURE__ */ new Map(), we == null || we({ ReactiveElement: wt }), (lt.reactiveElementVersions ?? (lt.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = globalThis, nn = (t) => t, oe = Mt.trustedTypes, sn = oe ? oe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Rn = "$lit$", at = `lit$${Math.random().toFixed(9).slice(2)}$`, Ln = "?" + at, ss = `<${Ln}>`, gt = document, Ot = () => gt.createComment(""), Dt = (t) => t === null || typeof t != "object" && typeof t != "function", Fe = Array.isArray, rs = (t) => Fe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ve = `[ 	
\f\r]`, Et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rn = /-->/g, on = />/g, dt = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), an = /'/g, ln = /"/g, On = /^(?:script|style|textarea|title)$/i, Dn = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), S = Dn(1), k = Dn(2), xt = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), dn = /* @__PURE__ */ new WeakMap(), ht = gt.createTreeWalker(gt, 129);
function zn(t, e) {
  if (!Fe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return sn !== void 0 ? sn.createHTML(e) : e;
}
const os = (t, e) => {
  const n = t.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = Et;
  for (let a = 0; a < n; a++) {
    const d = t[a];
    let c, l, h = -1, u = 0;
    for (; u < d.length && (r.lastIndex = u, l = r.exec(d), l !== null); ) u = r.lastIndex, r === Et ? l[1] === "!--" ? r = rn : l[1] !== void 0 ? r = on : l[2] !== void 0 ? (On.test(l[2]) && (s = RegExp("</" + l[2], "g")), r = dt) : l[3] !== void 0 && (r = dt) : r === dt ? l[0] === ">" ? (r = s ?? Et, h = -1) : l[1] === void 0 ? h = -2 : (h = r.lastIndex - l[2].length, c = l[1], r = l[3] === void 0 ? dt : l[3] === '"' ? ln : an) : r === ln || r === an ? r = dt : r === rn || r === on ? r = Et : (r = dt, s = void 0);
    const f = r === dt && t[a + 1].startsWith("/>") ? " " : "";
    o += r === Et ? d + ss : h >= 0 ? (i.push(c), d.slice(0, h) + Rn + d.slice(h) + at + f) : d + at + (h === -2 ? a : f);
  }
  return [zn(t, o + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class zt {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, d = this.parts, [c, l] = os(e, n);
    if (this.el = zt.createElement(c, i), ht.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = ht.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Rn)) {
          const u = l[r++], f = s.getAttribute(h).split(at), g = /([.?@])?(.*)/.exec(u);
          d.push({ type: 1, index: o, name: g[2], strings: f, ctor: g[1] === "." ? ls : g[1] === "?" ? ds : g[1] === "@" ? cs : fe }), s.removeAttribute(h);
        } else h.startsWith(at) && (d.push({ type: 6, index: o }), s.removeAttribute(h));
        if (On.test(s.tagName)) {
          const h = s.textContent.split(at), u = h.length - 1;
          if (u > 0) {
            s.textContent = oe ? oe.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(h[f], Ot()), ht.nextNode(), d.push({ type: 2, index: ++o });
            s.append(h[u], Ot());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ln) d.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(at, h + 1)) !== -1; ) d.push({ type: 7, index: o }), h += at.length - 1;
      }
      o++;
    }
  }
  static createElement(e, n) {
    const i = gt.createElement("template");
    return i.innerHTML = e, i;
  }
}
function $t(t, e, n = t, i) {
  var r, a;
  if (e === xt) return e;
  let s = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const o = Dt(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (e = $t(t, s._$AS(t, e.values), s, i)), e;
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
    let o = ht.nextNode(), r = 0, a = 0, d = i[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let c;
        d.type === 2 ? c = new Bt(o, o.nextSibling, this, e) : d.type === 1 ? c = new d.ctor(o, d.name, d.strings, this, e) : d.type === 6 && (c = new hs(o, this, e)), this._$AV.push(c), d = i[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = ht.nextNode(), r++);
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
    var o;
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = zt.createElement(zn(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(n);
    else {
      const r = new as(s, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
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
    for (const o of e) s === n.length ? n.push(i = new Bt(this.O(Ot()), this.O(Ot()), this, this.options)) : i = n[s], i._$AI(o), s++;
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
  constructor(e, n, i, s, o) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = P;
  }
  _$AI(e, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = $t(this, e, n, 0), r = !Dt(e) || e !== this._$AH && e !== xt, r && (this._$AH = e);
    else {
      const a = e;
      let d, c;
      for (e = o[0], d = 0; d < o.length - 1; d++) c = $t(this, a[i + d], n, d), c === xt && (c = this._$AH[d]), r || (r = !Dt(c) || c !== this._$AH[d]), c === P ? e = P : e !== P && (e += (c ?? "") + o[d + 1]), this._$AH[d] = c;
    }
    r && !s && this.j(e);
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
  constructor(e, n, i, s, o) {
    super(e, n, i, s, o), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = $t(this, e, n, 0) ?? P) === xt) return;
    const i = this._$AH, s = e === P && i !== P || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== P && (i === P || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
const xe = Mt.litHtmlPolyfillSupport;
xe == null || xe(zt, Bt), (Mt.litHtmlVersions ?? (Mt.litHtmlVersions = [])).push("3.3.3");
const us = (t, e, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new Bt(e.insertBefore(Ot(), o), o, void 0, n ?? {});
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
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(n.name, t), i === "accessor") {
    const { name: r } = n;
    return { set(a) {
      const d = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, d, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(a) {
      const d = this[r];
      e.call(this, a), this.requestUpdate(r, d, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function st(t) {
  return (e, n) => typeof n == "object" ? ps(t, e, n) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return st({ ...t, state: !0, attribute: !1 });
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
    for (var o = e[s], r = o.length, a = i[s] = new Array(r), d, c, l = 0; l < r; ++l)
      (d = o[l]) && (c = t.call(d, d.__data__, l, o)) && ("__data__" in d && (c.__data__ = d.__data__), a[l] = c);
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
  for (var e = this._groups, n = e.length, i = [], s = [], o = 0; o < n; ++o)
    for (var r = e[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && (i.push(t.call(d, d.__data__, c, r)), s.push(d));
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
function Ms(t) {
  typeof t != "function" && (t = Vn(t));
  for (var e = this._groups, n = e.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = e[s], r = o.length, a = i[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && t.call(d, d.__data__, c, o) && a.push(d);
  return new H(i, this._parents);
}
function Bn(t) {
  return new Array(t.length);
}
function Cs() {
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
function Rs(t, e, n, i, s, o) {
  for (var r = 0, a, d = e.length, c = o.length; r < c; ++r)
    (a = e[r]) ? (a.__data__ = o[r], i[r] = a) : n[r] = new ae(t, o[r]);
  for (; r < d; ++r)
    (a = e[r]) && (s[r] = a);
}
function Ls(t, e, n, i, s, o, r) {
  var a, d, c = /* @__PURE__ */ new Map(), l = e.length, h = o.length, u = new Array(l), f;
  for (a = 0; a < l; ++a)
    (d = e[a]) && (u[a] = f = r.call(d, d.__data__, a, e) + "", c.has(f) ? s[a] = d : c.set(f, d));
  for (a = 0; a < h; ++a)
    f = r.call(t, o[a], a, o) + "", (d = c.get(f)) ? (i[a] = d, d.__data__ = o[a], c.delete(f)) : n[a] = new ae(t, o[a]);
  for (a = 0; a < l; ++a)
    (d = e[a]) && c.get(u[a]) === d && (s[a] = d);
}
function Os(t) {
  return t.__data__;
}
function Ds(t, e) {
  if (!arguments.length) return Array.from(this, Os);
  var n = e ? Ls : Rs, i = this._parents, s = this._groups;
  typeof t != "function" && (t = Ps(t));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), c = 0; c < o; ++c) {
    var l = i[c], h = s[c], u = h.length, f = zs(t.call(l, l && l.__data__, c, i)), g = f.length, _ = a[c] = new Array(g), x = r[c] = new Array(g), y = d[c] = new Array(u);
    n(l, h, _, x, y, f, e);
    for (var T = 0, L = 0, U, V; T < g; ++T)
      if (U = _[T]) {
        for (T >= L && (L = T + 1); !(V = x[L]) && ++L < g; ) ;
        U._next = V || null;
      }
  }
  return r = new H(r, i), r._enter = a, r._exit = d, r;
}
function zs(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Us() {
  return new H(this._exit || this._groups.map(Bn), this._parents);
}
function Hs(t, e, n) {
  var i = this.enter(), s = this, o = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (s = e(s), s && (s = s.selection())), n == null ? o.remove() : n(o), i && s ? i.merge(s).order() : s;
}
function Vs(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, s = n.length, o = i.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var c = n[d], l = i[d], h = c.length, u = a[d] = new Array(h), f, g = 0; g < h; ++g)
      (f = c[g] || l[g]) && (u[g] = f);
  for (; d < s; ++d)
    a[d] = n[d];
  return new H(a, this._parents);
}
function Fs() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], s = i.length - 1, o = i[s], r; --s >= 0; )
      (r = i[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function Bs(t) {
  t || (t = qs);
  function e(h, u) {
    return h && u ? t(h.__data__, u.__data__) : !h - !u;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o) {
    for (var r = n[o], a = r.length, d = s[o] = new Array(a), c, l = 0; l < a; ++l)
      (c = r[l]) && (d[l] = c);
    d.sort(e);
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
    for (var i = t[e], s = 0, o = i.length; s < o; ++s) {
      var r = i[s];
      if (r) return r;
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
    for (var s = e[n], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && t.call(a, a.__data__, o, s);
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
    for (var i = We(this.node()), s = -1, o = n.length; ++s < o; ) if (!i.contains(n[s])) return !1;
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
function Mr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Cr() {
  return this.each(Mr);
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
      for (var n = 0, i = -1, s = e.length, o; n < s; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++i] = o;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function Hr(t, e, n) {
  return function() {
    var i = this.__on, s, o = Dr(e);
    if (i) {
      for (var r = 0, a = i.length; r < a; ++r)
        if ((s = i[r]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = n), s.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), s = { type: t.type, name: t.name, value: e, listener: o, options: n }, i ? i.push(s) : this.__on = [s];
  };
}
function Vr(t, e, n) {
  var i = zr(t + ""), s, o = i.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var d = 0, c = a.length, l; d < c; ++d)
        for (s = 0, l = a[d]; s < o; ++s)
          if ((r = i[s]).type === l.type && r.name === l.name)
            return l.value;
    }
    return;
  }
  for (a = e ? Hr : Ur, s = 0; s < o; ++s) this.each(a(i[s], e, n));
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
    for (var i = t[e], s = 0, o = i.length, r; s < o; ++s)
      (r = i[s]) && (yield r);
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
  filter: Ms,
  data: Ds,
  enter: Cs,
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
  remove: Cr,
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
function ct(t, e) {
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
    var n = this._, i = Kr(t + "", n), s, o = -1, r = i.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (t = i[o]).type) && (s = Zr(n[s], t.name))) return s;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < r; )
      if (s = (t = i[o]).type) n[s] = hn(n[s], t.name, e);
      else if (e == null) for (s in n) n[s] = hn(n[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new ee(t);
  },
  call: function(t, e) {
    if ((s = arguments.length - 2) > 0) for (var n = new Array(s), i = 0, s, o; i < s; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], i = 0, s = o.length; i < s; ++i) o[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], s = 0, o = i.length; s < o; ++s) i[s].value.apply(e, n);
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
function Me(t, e, n, i) {
  return arguments.length === 1 ? lo(t) : new z(t, e, n, i ?? 1);
}
function z(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Ye(z, Me, Jn(Wt, {
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
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, s = Math.min(e, n, i), o = Math.max(e, n, i), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (e === o ? r = (n - i) / a + (n < i) * 6 : n === o ? r = (i - e) / a + 2 : r = (e - n) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new W(r, a, d, t.opacity);
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
  function i(s, o) {
    var r = n((s = Me(s)).r, (o = Me(o)).r), a = n(s.g, o.g), d = n(s.b, o.b), c = ti(s.opacity, o.opacity);
    return function(l) {
      return s.r = r(l), s.g = a(l), s.b = d(l), s.opacity = c(l), s + "";
    };
  }
  return i.gamma = t, i;
})(1);
function ot(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Ce = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ie = new RegExp(Ce.source, "g");
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
  var n = Ce.lastIndex = Ie.lastIndex = 0, i, s, o, r = -1, a = [], d = [];
  for (t = t + "", e = e + ""; (i = Ce.exec(t)) && (s = Ie.exec(e)); )
    (o = s.index) > n && (o = e.slice(n, o), a[r] ? a[r] += o : a[++r] = o), (i = i[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: ot(i, s) })), n = Ie.lastIndex;
  return n < e.length && (o = e.slice(n), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? go(d[0].x) : mo(e) : (e = d.length, function(c) {
    for (var l = 0, h; l < e; ++l) a[(h = d[l]).i] = h.x(c);
    return a.join("");
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
function ei(t, e, n, i, s, o) {
  var r, a, d;
  return (r = Math.sqrt(t * t + e * e)) && (t /= r, e /= r), (d = t * n + e * i) && (n -= t * d, i -= e * d), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, d /= a), t * i < e * n && (t = -t, e = -e, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(e, t) * xn,
    skewX: Math.atan(d) * xn,
    scaleX: r,
    scaleY: a
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
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, l, h, u, f, g) {
    if (c !== h || l !== u) {
      var _ = f.push("translate(", null, e, null, n);
      g.push({ i: _ - 4, x: ot(c, h) }, { i: _ - 2, x: ot(l, u) });
    } else (h || u) && f.push("translate(" + h + e + u + n);
  }
  function r(c, l, h, u) {
    c !== l ? (c - l > 180 ? l += 360 : l - c > 180 && (c += 360), u.push({ i: h.push(s(h) + "rotate(", null, i) - 2, x: ot(c, l) })) : l && h.push(s(h) + "rotate(" + l + i);
  }
  function a(c, l, h, u) {
    c !== l ? u.push({ i: h.push(s(h) + "skewX(", null, i) - 2, x: ot(c, l) }) : l && h.push(s(h) + "skewX(" + l + i);
  }
  function d(c, l, h, u, f, g) {
    if (c !== h || l !== u) {
      var _ = f.push(s(f) + "scale(", null, ",", null, ")");
      g.push({ i: _ - 4, x: ot(c, h) }, { i: _ - 2, x: ot(l, u) });
    } else (h !== 1 || u !== 1) && f.push(s(f) + "scale(" + h + "," + u + ")");
  }
  return function(c, l) {
    var h = [], u = [];
    return c = t(c), l = t(l), o(c.translateX, c.translateY, l.translateX, l.translateY, h, u), r(c.rotate, l.rotate, h, u), a(c.skewX, l.skewX, h, u), d(c.scaleX, c.scaleY, l.scaleX, l.scaleY, h, u), c = l = null, function(f) {
      for (var g = -1, _ = u.length, x; ++g < _; ) h[(x = u[g]).i] = x.x(f);
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
  function s(o, r) {
    var a = o[0], d = o[1], c = o[2], l = r[0], h = r[1], u = r[2], f = l - a, g = h - d, _ = f * f + g * g, x, y;
    if (_ < $o)
      y = Math.log(u / c) / e, x = function(rt) {
        return [
          a + rt * f,
          d + rt * g,
          c * Math.exp(e * rt * y)
        ];
      };
    else {
      var T = Math.sqrt(_), L = (u * u - c * c + i * _) / (2 * c * n * T), U = (u * u - c * c - i * _) / (2 * u * n * T), V = Math.log(Math.sqrt(L * L + 1) - L), F = Math.log(Math.sqrt(U * U + 1) - U);
      y = (F - V) / e, x = function(rt) {
        var Xt = rt * y, Yt = $n(V), Gt = c / (n * T) * (Yt * Io(e * Xt + V) - bo(V));
        return [
          a + Gt * f,
          d + Gt * g,
          c * Yt / $n(e * Xt + V)
        ];
      };
    }
    return x.duration = y * 1e3 * e / Math.SQRT2, x;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return t(r, a, d);
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
var No = Xe("start", "end", "cancel", "interrupt"), Mo = [], oi = 0, En = 1, Le = 2, ne = 3, kn = 4, Oe = 5, ie = 6;
function ge(t, e, n, i, s, o) {
  var r = t.__transition;
  if (!r) t.__transition = {};
  else if (n in r) return;
  Co(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: No,
    tween: Mo,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
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
function Co(t, e, n) {
  var i = t.__transition, s;
  i[e] = n, n.timer = ri(o, 0, n.time);
  function o(c) {
    n.state = En, n.timer.restart(r, n.delay, n.time), n.delay <= c && r(c - n.delay);
  }
  function r(c) {
    var l, h, u, f;
    if (n.state !== En) return d();
    for (l in i)
      if (f = i[l], f.name === n.name) {
        if (f.state === ne) return In(r);
        f.state === kn ? (f.state = ie, f.timer.stop(), f.on.call("interrupt", t, t.__data__, f.index, f.group), delete i[l]) : +l < e && (f.state = ie, f.timer.stop(), f.on.call("cancel", t, t.__data__, f.index, f.group), delete i[l]);
      }
    if (In(function() {
      n.state === ne && (n.state = kn, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = Le, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Le) {
      for (n.state = ne, s = new Array(u = n.tween.length), l = 0, h = -1; l < u; ++l)
        (f = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (s[++h] = f);
      s.length = h + 1;
    }
  }
  function a(c) {
    for (var l = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(d), n.state = Oe, 1), h = -1, u = s.length; ++h < u; )
      s[h].call(t, l);
    n.state === Oe && (n.on.call("end", t, t.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = ie, n.timer.stop(), delete i[e];
    for (var c in i) return;
    delete t.__transition;
  }
}
function se(t, e) {
  var n = t.__transition, i, s, o = !0, r;
  if (n) {
    e = e == null ? null : e + "";
    for (r in n) {
      if ((i = n[r]).name !== e) {
        o = !1;
        continue;
      }
      s = i.state > Le && i.state < Oe, i.state = ie, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[r];
    }
    o && delete t.__transition;
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
    var s = Z(this, t), o = s.tween;
    if (o !== n) {
      i = n = o;
      for (var r = 0, a = i.length; r < a; ++r)
        if (i[r].name === e) {
          i = i.slice(), i.splice(r, 1);
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
    var o = Z(this, t), r = o.tween;
    if (r !== i) {
      s = (i = r).slice();
      for (var a = { name: e, value: n }, d = 0, c = s.length; d < c; ++d)
        if (s[d].name === e) {
          s[d] = a;
          break;
        }
      d === c && s.push(a);
    }
    o.tween = s;
  };
}
function Oo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = X(this.node(), n).tween, s = 0, o = i.length, r; s < o; ++s)
      if ((r = i[s]).name === t)
        return r.value;
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
  return (typeof e == "number" ? ot : e instanceof Vt ? vn : (n = Vt(e)) ? (e = n, vn) : _o)(t, e);
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
  var i, s = n + "", o;
  return function() {
    var r = this.getAttribute(t);
    return r === s ? null : r === i ? o : o = e(i = r, n);
  };
}
function Ho(t, e, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttributeNS(t.space, t.local);
    return r === s ? null : r === i ? o : o = e(i = r, n);
  };
}
function Vo(t, e, n) {
  var i, s, o;
  return function() {
    var r, a = n(this), d;
    return a == null ? void this.removeAttribute(t) : (r = this.getAttribute(t), d = a + "", r === d ? null : r === i && d === s ? o : (s = d, o = e(i = r, a)));
  };
}
function Fo(t, e, n) {
  var i, s, o;
  return function() {
    var r, a = n(this), d;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (r = this.getAttributeNS(t.space, t.local), d = a + "", r === d ? null : r === i && d === s ? o : (s = d, o = e(i = r, a)));
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
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && Wo(t, o)), n;
  }
  return s._value = e, s;
}
function Yo(t, e) {
  var n, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (n = (i = o) && qo(t, o)), n;
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
    for (var o = e[s], r = o.length, a = i[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && t.call(d, d.__data__, c, o) && a.push(d);
  return new nt(i, this._parents, this._name, this._id);
}
function oa(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, s = n.length, o = Math.min(i, s), r = new Array(i), a = 0; a < o; ++a)
    for (var d = e[a], c = n[a], l = d.length, h = r[a] = new Array(l), u, f = 0; f < l; ++f)
      (u = d[f] || c[f]) && (h[f] = u);
  for (; a < i; ++a)
    r[a] = e[a];
  return new nt(r, this._parents, this._name, this._id);
}
function aa(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function la(t, e, n) {
  var i, s, o = aa(e) ? Ke : Z;
  return function() {
    var r = o(this, t), a = r.on;
    a !== i && (s = (i = a).copy()).on(e, n), r.on = s;
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
  for (var i = this._groups, s = i.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = i[r], d = a.length, c = o[r] = new Array(d), l, h, u = 0; u < d; ++u)
      (l = a[u]) && (h = t.call(l, l.__data__, u, a)) && ("__data__" in l && (h.__data__ = l.__data__), c[u] = h, ge(c[u], e, n, u, c, X(l, n)));
  return new nt(o, this._parents, e, n);
}
function fa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Hn(t));
  for (var i = this._groups, s = i.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = i[a], c = d.length, l, h = 0; h < c; ++h)
      if (l = d[h]) {
        for (var u = t.call(l, l.__data__, h, d), f, g = X(l, n), _ = 0, x = u.length; _ < x; ++_)
          (f = u[_]) && ge(f, e, n, _, u, g);
        o.push(u), r.push(l);
      }
  return new nt(o, r, e, n);
}
var pa = qt.prototype.constructor;
function ma() {
  return new pa(this._groups, this._parents);
}
function ga(t, e) {
  var n, i, s;
  return function() {
    var o = bt(this, t), r = (this.style.removeProperty(t), bt(this, t));
    return o === r ? null : o === n && r === i ? s : s = e(n = o, i = r);
  };
}
function li(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function _a(t, e, n) {
  var i, s = n + "", o;
  return function() {
    var r = bt(this, t);
    return r === s ? null : r === i ? o : o = e(i = r, n);
  };
}
function ya(t, e, n) {
  var i, s, o;
  return function() {
    var r = bt(this, t), a = n(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(t), bt(this, t))), r === d ? null : r === i && d === s ? o : (s = d, o = e(i = r, a));
  };
}
function wa(t, e) {
  var n, i, s, o = "style." + e, r = "end." + o, a;
  return function() {
    var d = Z(this, t), c = d.on, l = d.value[o] == null ? a || (a = li(e)) : void 0;
    (c !== n || s !== l) && (i = (n = c).copy()).on(r, s = l), d.on = i;
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
  function o() {
    var r = e.apply(this, arguments);
    return r !== s && (i = (s = r) && xa(t, r, n)), i;
  }
  return o._value = e, o;
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
  for (var t = this._name, e = this._id, n = di(), i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, c = 0; c < a; ++c)
      if (d = r[c]) {
        var l = X(d, e);
        ge(d, t, n, c, r, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new nt(i, this._parents, t, n);
}
function Ma() {
  var t, e, n = this, i = n._id, s = n.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    n.each(function() {
      var c = Z(this, i), l = c.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(d)), c.on = e;
    }), s === 0 && o();
  });
}
var Ca = 0;
function nt(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function di() {
  return ++Ca;
}
var j = qt.prototype;
nt.prototype = {
  constructor: nt,
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
  end: Ma,
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
  t instanceof nt ? (e = t._id, t = t._name) : (e = di(), (n = Ra).time = Ge(), t = t == null ? null : t + "");
  for (var i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && ge(d, t, e, c, r, n || La(d, e));
  return new nt(i, this._parents, t, e);
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
function et(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
et.prototype = {
  constructor: et,
  scale: function(t) {
    return t === 1 ? this : new et(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new et(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Ct = new et(1, 0, 0);
et.prototype;
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
  return this.__zoom || Ct;
}
function Ha(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Va() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fa(t, e, n) {
  var i = t.invertX(e[0][0]) - n[0][0], s = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], r = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function Ba() {
  var t = za, e = Ua, n = Fa, i = Ha, s = Va, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Eo, c = Xe("start", "zoom", "end"), l, h, u, f = 500, g = 150, _ = 0, x = 10;
  function y(p) {
    p.property("__zoom", Sn).on("wheel.zoom", Xt, { passive: !1 }).on("mousedown.zoom", Yt).on("dblclick.zoom", Gt).filter(s).on("touchstart.zoom", ci).on("touchmove.zoom", hi).on("touchend.zoom touchcancel.zoom", ui).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(p, w, m, v) {
    var $ = p.selection ? p.selection() : p;
    $.property("__zoom", Sn), p !== $ ? V(p, w, m, v) : $.interrupt().each(function() {
      F(this, arguments).event(v).start().zoom(null, typeof w == "function" ? w.apply(this, arguments) : w).end();
    });
  }, y.scaleBy = function(p, w, m, v) {
    y.scaleTo(p, function() {
      var $ = this.__zoom.k, I = typeof w == "function" ? w.apply(this, arguments) : w;
      return $ * I;
    }, m, v);
  }, y.scaleTo = function(p, w, m, v) {
    y.transform(p, function() {
      var $ = e.apply(this, arguments), I = this.__zoom, E = m == null ? U($) : typeof m == "function" ? m.apply(this, arguments) : m, M = I.invert(E), C = typeof w == "function" ? w.apply(this, arguments) : w;
      return n(L(T(I, C), E, M), $, r);
    }, m, v);
  }, y.translateBy = function(p, w, m, v) {
    y.transform(p, function() {
      return n(this.__zoom.translate(
        typeof w == "function" ? w.apply(this, arguments) : w,
        typeof m == "function" ? m.apply(this, arguments) : m
      ), e.apply(this, arguments), r);
    }, null, v);
  }, y.translateTo = function(p, w, m, v, $) {
    y.transform(p, function() {
      var I = e.apply(this, arguments), E = this.__zoom, M = v == null ? U(I) : typeof v == "function" ? v.apply(this, arguments) : v;
      return n(Ct.translate(M[0], M[1]).scale(E.k).translate(
        typeof w == "function" ? -w.apply(this, arguments) : -w,
        typeof m == "function" ? -m.apply(this, arguments) : -m
      ), I, r);
    }, v, $);
  };
  function T(p, w) {
    return w = Math.max(o[0], Math.min(o[1], w)), w === p.k ? p : new et(w, p.x, p.y);
  }
  function L(p, w, m) {
    var v = w[0] - m[0] * p.k, $ = w[1] - m[1] * p.k;
    return v === p.x && $ === p.y ? p : new et(p.k, v, $);
  }
  function U(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function V(p, w, m, v) {
    p.on("start.zoom", function() {
      F(this, arguments).event(v).start();
    }).on("interrupt.zoom end.zoom", function() {
      F(this, arguments).event(v).end();
    }).tween("zoom", function() {
      var $ = this, I = arguments, E = F($, I).event(v), M = e.apply($, I), C = m == null ? U(M) : typeof m == "function" ? m.apply($, I) : m, Y = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), O = $.__zoom, B = typeof w == "function" ? w.apply($, I) : w, J = d(O.invert(C).concat(Y / O.k), B.invert(C).concat(Y / B.k));
      return function(q) {
        if (q === 1) q = B;
        else {
          var Q = J(q), _e = Y / Q[2];
          q = new et(_e, C[0] - Q[0] * _e, C[1] - Q[1] * _e);
        }
        E.zoom(null, q);
      };
    });
  }
  function F(p, w, m) {
    return !m && p.__zooming || new rt(p, w);
  }
  function rt(p, w) {
    this.that = p, this.args = w, this.active = 0, this.sourceEvent = null, this.extent = e.apply(p, w), this.taps = 0;
  }
  rt.prototype = {
    event: function(p) {
      return p && (this.sourceEvent = p), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(p, w) {
      return this.mouse && p !== "mouse" && (this.mouse[1] = w.invert(this.mouse[0])), this.touch0 && p !== "touch" && (this.touch0[1] = w.invert(this.touch0[0])), this.touch1 && p !== "touch" && (this.touch1[1] = w.invert(this.touch1[0])), this.that.__zoom = w, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(p) {
      var w = G(this.that).datum();
      c.call(
        p,
        this.that,
        new Da(p, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        w
      );
    }
  };
  function Xt(p, ...w) {
    if (!t.apply(this, arguments)) return;
    var m = F(this, w).event(p), v = this.__zoom, $ = Math.max(o[0], Math.min(o[1], v.k * Math.pow(2, i.apply(this, arguments)))), I = ct(p);
    if (m.wheel)
      (m.mouse[0][0] !== I[0] || m.mouse[0][1] !== I[1]) && (m.mouse[1] = v.invert(m.mouse[0] = I)), clearTimeout(m.wheel);
    else {
      if (v.k === $) return;
      m.mouse = [I, v.invert(I)], se(this), m.start();
    }
    St(p), m.wheel = setTimeout(E, g), m.zoom("mouse", n(L(T(v, $), m.mouse[0], m.mouse[1]), m.extent, r));
    function E() {
      m.wheel = null, m.end();
    }
  }
  function Yt(p, ...w) {
    if (u || !t.apply(this, arguments)) return;
    var m = p.currentTarget, v = F(this, w, !0).event(p), $ = G(p.view).on("mousemove.zoom", C, !0).on("mouseup.zoom", Y, !0), I = ct(p, m), E = p.clientX, M = p.clientY;
    Jr(p.view), Ee(p), v.mouse = [I, this.__zoom.invert(I)], se(this), v.start();
    function C(O) {
      if (St(O), !v.moved) {
        var B = O.clientX - E, J = O.clientY - M;
        v.moved = B * B + J * J > _;
      }
      v.event(O).zoom("mouse", n(L(v.that.__zoom, v.mouse[0] = ct(O, m), v.mouse[1]), v.extent, r));
    }
    function Y(O) {
      $.on("mousemove.zoom mouseup.zoom", null), Qr(O.view, v.moved), St(O), v.event(O).end();
    }
  }
  function Gt(p, ...w) {
    if (t.apply(this, arguments)) {
      var m = this.__zoom, v = ct(p.changedTouches ? p.changedTouches[0] : p, this), $ = m.invert(v), I = m.k * (p.shiftKey ? 0.5 : 2), E = n(L(T(m, I), v, $), e.apply(this, w), r);
      St(p), a > 0 ? G(this).transition().duration(a).call(V, E, v, p) : G(this).call(y.transform, E, v, p);
    }
  }
  function ci(p, ...w) {
    if (t.apply(this, arguments)) {
      var m = p.touches, v = m.length, $ = F(this, w, p.changedTouches.length === v).event(p), I, E, M, C;
      for (Ee(p), E = 0; E < v; ++E)
        M = m[E], C = ct(M, this), C = [C, this.__zoom.invert(C), M.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== C[2] && ($.touch1 = C, $.taps = 0) : ($.touch0 = C, I = !0, $.taps = 1 + !!l);
      l && (l = clearTimeout(l)), I && ($.taps < 2 && (h = C[0], l = setTimeout(function() {
        l = null;
      }, f)), se(this), $.start());
    }
  }
  function hi(p, ...w) {
    if (this.__zooming) {
      var m = F(this, w).event(p), v = p.changedTouches, $ = v.length, I, E, M, C;
      for (St(p), I = 0; I < $; ++I)
        E = v[I], M = ct(E, this), m.touch0 && m.touch0[2] === E.identifier ? m.touch0[0] = M : m.touch1 && m.touch1[2] === E.identifier && (m.touch1[0] = M);
      if (E = m.that.__zoom, m.touch1) {
        var Y = m.touch0[0], O = m.touch0[1], B = m.touch1[0], J = m.touch1[1], q = (q = B[0] - Y[0]) * q + (q = B[1] - Y[1]) * q, Q = (Q = J[0] - O[0]) * Q + (Q = J[1] - O[1]) * Q;
        E = T(E, Math.sqrt(q / Q)), M = [(Y[0] + B[0]) / 2, (Y[1] + B[1]) / 2], C = [(O[0] + J[0]) / 2, (O[1] + J[1]) / 2];
      } else if (m.touch0) M = m.touch0[0], C = m.touch0[1];
      else return;
      m.zoom("touch", n(L(E, M, C), m.extent, r));
    }
  }
  function ui(p, ...w) {
    if (this.__zooming) {
      var m = F(this, w).event(p), v = p.changedTouches, $ = v.length, I, E;
      for (Ee(p), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, f), I = 0; I < $; ++I)
        E = v[I], m.touch0 && m.touch0[2] === E.identifier ? delete m.touch0 : m.touch1 && m.touch1[2] === E.identifier && delete m.touch1;
      if (m.touch1 && !m.touch0 && (m.touch0 = m.touch1, delete m.touch1), m.touch0) m.touch0[1] = this.__zoom.invert(m.touch0[0]);
      else if (m.end(), m.taps === 2 && (E = ct(E, this), Math.hypot(h[0] - E[0], h[1] - E[1]) < x)) {
        var M = G(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : Qt(+p), y) : i;
  }, y.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Qt(!!p), y) : t;
  }, y.touchable = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : Qt(!!p), y) : s;
  }, y.extent = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Qt([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), y) : e;
  }, y.scaleExtent = function(p) {
    return arguments.length ? (o[0] = +p[0], o[1] = +p[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(p) {
    return arguments.length ? (r[0][0] = +p[0][0], r[1][0] = +p[1][0], r[0][1] = +p[0][1], r[1][1] = +p[1][1], y) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, y.constrain = function(p) {
    return arguments.length ? (n = p, y) : n;
  }, y.duration = function(p) {
    return arguments.length ? (a = +p, y) : a;
  }, y.interpolate = function(p) {
    return arguments.length ? (d = p, y) : d;
  }, y.on = function() {
    var p = c.on.apply(c, arguments);
    return p === c ? y : p;
  }, y.clickDistance = function(p) {
    return arguments.length ? (_ = (p = +p) * p, y) : Math.sqrt(_);
  }, y.tapDistance = function(p) {
    return arguments.length ? (x = +p, y) : x;
  }, y;
}
var qa = Object.defineProperty, Wa = Object.getOwnPropertyDescriptor, D = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Wa(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && qa(e, n, s), s;
};
function Xa(t, e, n, i) {
  const s = e.x - t.x, o = e.y - t.y, r = i.x - n.x, a = i.y - n.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const c = ((n.x - t.x) * a - (n.y - t.y) * r) / d, l = ((n.x - t.x) * o - (n.y - t.y) * s) / d;
  return c <= 0.02 || c >= 0.98 || l <= 0.02 || l >= 0.98 ? null : { x: t.x + c * s, y: t.y + c * o, t: c };
}
function Ya(t, e, n) {
  const i = n.x - e.x, s = n.y - e.y, o = i * i + s * s || 1, r = Math.max(0, Math.min(1, ((t.x - e.x) * i + (t.y - e.y) * s) / o)), a = e.x + r * i, d = e.y + r * s;
  return { dist: Math.hypot(t.x - a, t.y - d), t: r };
}
function Ga(t, e, n = 7) {
  let i = `M ${t[0].x} ${t[0].y}`;
  for (let s = 0; s < t.length - 1; s++) {
    const o = t[s], r = t[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, c = (r.y - o.y) / a, l = e.map(([u, f]) => Xa(o, r, u, f)).filter((u) => u !== null).filter((u) => u.t * a > n + 2 && (1 - u.t) * a > n + 2).sort((u, f) => u.t - f.t);
    let h = -1 / 0;
    for (const u of l)
      u.t * a - n <= h + 2 || (i += ` L ${u.x - d * n} ${u.y - c * n}`, i += ` A ${n} ${n} 0 0 1 ${u.x + d * n} ${u.y + c * n}`, h = u.t * a + n);
    i += ` L ${r.x} ${r.y}`;
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
  readmodel: k`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  usecase: k`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: k`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let R = class extends pt {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ct, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (t) => {
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
            const s = this.scene.edges.find((o) => o.id === this._selectedWaypoint.edgeId);
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
    const s = Math.min(...e.map((l) => l.x - l.w / 2)) - t, o = Math.max(...e.map((l) => l.x + l.w / 2)) + t, r = Math.min(...e.map((l) => l.y - l.h / 2)) - t, a = Math.max(...e.map((l) => l.y + l.h / 2)) + t, d = Math.max(0.15, Math.min(i.width / (o - s), i.height / (a - r), 1.25)), c = Ct.translate(i.width / 2 - d * (s + o) / 2, i.height / 2 - d * (r + a) / 2).scale(d);
    G(n).call(this._zoomBehavior.transform, c);
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
        const s = this.nodePos(i), o = s.x - i.w / 2 + 10 + t.w / 2, r = s.x + i.w / 2 - 10 - t.w / 2, a = s.y - i.h / 2 + 34 + t.h / 2, d = s.y + i.h / 2 - 10 - t.h / 2;
        e = Math.min(Math.max(e, o), r), n = Math.min(Math.max(n, a), d);
      }
    }
    return { id: t.id, x: e, y: n };
  }
  onNodePointerDown(t, e) {
    if (t.button !== 0 || this._spaceDown) return;
    t.stopPropagation(), this.focus();
    const n = this.toScene(t), i = this.nodePos(e);
    let s = !1;
    const o = (a) => {
      const d = this.toScene(a), c = d.x - n.x, l = d.y - n.y;
      !s && Math.hypot(c, l) < 3 / this._t.k || (s = !0, this._dragPos = this.clampToParent(e, i.x + c, i.y + l));
    }, r = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", r), s && this._dragPos ? this.emit("node-moved", { id: e.id, x: this._dragPos.x, y: this._dragPos.y }) : t.shiftKey ? this.emit("element-multi-toggled", { id: e.id, kind: e.kind }) : this.emit("element-selected", { elementType: "node", id: e.id, kind: e.kind });
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", r);
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
    const s = 160, o = 90, r = { x: e.x, y: e.y, w: e.w, h: e.h }, a = this.scene.nodes.filter((_) => _.parentId === e.id), d = Math.min(...a.map((_) => _.x - _.w / 2)), c = Math.max(...a.map((_) => _.x + _.w / 2)), l = Math.min(...a.map((_) => _.y - _.h / 2)), h = Math.max(...a.map((_) => _.y + _.h / 2)), u = fi(
      a.map((_) => ({ dx: _.x - r.x, dy: _.y - r.y, w: _.w, h: _.h })),
      { w: s, h: o }
    ), f = (_) => {
      const x = this.toScene(_);
      if (_.shiftKey) {
        this._resize = {
          id: e.id,
          x: r.x,
          y: r.y,
          w: Math.max(u.w, 2 * Math.abs(x.x - r.x)),
          h: Math.max(u.h, 2 * Math.abs(x.y - r.y))
        };
        return;
      }
      const y = r.x - n * r.w / 2, T = r.y - i * r.h / 2, L = n > 0 ? Math.max(x.x, y + s, a.length ? c + 10 : -1 / 0) : Math.min(x.x, y - s, a.length ? d - 10 : 1 / 0), U = i > 0 ? Math.max(x.y, T + o, a.length ? h + 10 : -1 / 0) : Math.min(x.y, T - o, a.length ? l - 34 : 1 / 0);
      this._resize = {
        id: e.id,
        x: (y + L) / 2,
        y: (T + U) / 2,
        w: Math.abs(L - y),
        h: Math.abs(U - T)
      };
    }, g = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", g), this._resize && this._resize.id === e.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", g);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(t, e) {
    if (t.button !== 0) return;
    t.stopPropagation();
    const n = this.toScene(t);
    this._pendingLink = { sourceId: e.id, x: n.x, y: n.y };
    const i = (o) => {
      var c;
      const r = this.toScene(o);
      this._pendingLink = { sourceId: e.id, x: r.x, y: r.y };
      const a = (c = this.shadowRoot) == null ? void 0 : c.elementFromPoint(o.clientX, o.clientY), d = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = d ? d.getAttribute("data-node-id") : null;
    }, s = (o) => {
      var d, c;
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s);
      const r = (d = this.shadowRoot) == null ? void 0 : d.elementFromPoint(o.clientX, o.clientY), a = (c = r == null ? void 0 : r.closest("[data-node-id]")) == null ? void 0 : c.getAttribute("data-node-id");
      a && a !== e.id && this.emit("connect-requested", {
        sourceId: e.id,
        targetId: a,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(t, e, n) {
    const { x: i, y: s } = this.nodePos(t), o = e - i, r = n - s, a = t.w / 2, d = t.h / 2;
    if (o === 0 && r === 0) return { x: i, y: s };
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / d);
    return { x: i + o * c, y: s + r * c };
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
    const e = this.scene.nodes.find((l) => l.id === t.sourceId), n = this.scene.nodes.find((l) => l.id === t.targetId);
    if (!e || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === t.id ? this._wpDrag.points : this.edgePoints[t.id] ?? [], s = this.nodePos(e), o = this.nodePos(n), r = i[0] ?? o, a = i[i.length - 1] ?? s;
    let d = this.borderPoint(e, r.x, r.y), c = this.borderPoint(n, a.x, a.y);
    if (!i.length) {
      const l = this.edgeOffset(t);
      if (l !== 0) {
        const h = Math.hypot(c.x - d.x, c.y - d.y) || 1, u = -(c.y - d.y) / h * l, f = (c.x - d.x) / h * l;
        d = { x: d.x + u, y: d.y + f }, c = { x: c.x + u, y: c.y + f };
      }
    }
    return [d, ...i, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(t, e, n) {
    this._wpDrag = { edgeId: t.id, points: e, index: n };
    let i = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      i = !0;
      const a = this.toScene(r), d = [...this._wpDrag.points];
      d[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: d };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && i && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
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
    let o = !1;
    const r = (d) => {
      const c = this.toScene(d);
      if (o) {
        if (this._wpDrag) {
          const l = [...this._wpDrag.points];
          l[s] = c, this._wpDrag = { ...this._wpDrag, points: l };
        }
      } else {
        if (Math.hypot(c.x - i.x, c.y - i.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const l = [...this.edgePoints[e.id] ?? []];
        l.splice(s, 0, c), this._selectedWaypoint = { edgeId: e.id, index: s }, this._wpDrag = { edgeId: e.id, points: l, index: s };
      }
    }, a = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", a), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", a);
  }
  removeWaypoint(t, e) {
    const n = [...this.edgePoints[t.id] ?? []];
    n.splice(e, 1), this.emit("edge-points-changed", { id: t.id, points: n });
  }
  renderEdge(t, e, n) {
    const i = t.color ?? "#64748b", s = this.selectedId === t.id, o = s || this.selectedIds.includes(t.sourceId) && this.selectedIds.includes(t.targetId), r = Math.floor((e.length - 1) / 2), a = {
      x: (e[r].x + e[r + 1].x) / 2,
      y: (e[r].y + e[r + 1].y) / 2
    }, d = e.slice(1, -1), c = e.map((l) => `${l.x},${l.y}`).join(" ");
    return k`
      <g data-edge-id=${t.id}>
        <polyline class="edge-hit" points=${c}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(l) => {
      l.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: t.id, kind: t.kind });
    }}
              @dblclick=${(l) => {
      l.stopPropagation(), this.focus(), this.addWaypointAt(t, e, this.toScene(l));
    }}
              @pointerdown=${(l) => this.onEdgeHitPointerDown(l, t, e)}>
          ${t.tooltip ? k`<title>${t.tooltip}</title>` : ""}
        </polyline>
        <path d=${Ga(e, n)}
              fill="none"
              stroke=${i} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${t.dashed ? "6 4" : ""}
              marker-end=${t.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${t.label ? k`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${i}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(l) => {
      l.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: t.id, kind: t.kind });
    }}
                  @dblclick=${(l) => {
      l.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: t.id,
        kind: t.kind,
        x: l.clientX,
        y: l.clientY
      });
    }}>
                  ${t.label}
                </text>` : ""}
        ${s ? d.map((l, h) => {
      var f;
      const u = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === t.id && this._selectedWaypoint.index === h;
      return k`
                <circle data-waypoint cx=${l.x} cy=${l.y} r=${u ? 6 : 5}
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
    var u, f;
    const { x: e, y: n } = this.nodePos(t), i = this.selectedId === t.id || this.selectedIds.includes(t.id), s = this._hoverNodeId === t.id, o = !!t.container, r = !!t.parentId, a = ((u = this._resize) == null ? void 0 : u.id) === t.id ? this._resize.w : t.w, d = ((f = this._resize) == null ? void 0 : f.id) === t.id ? this._resize.h : t.h, c = a / 2, l = d / 2, h = r && t.label.length > 14 ? `${t.label.slice(0, 13)}…` : t.label;
    return k`
      <g data-node-id=${t.id} transform="translate(${e}, ${n})"
         @pointerdown=${(g) => this.onNodePointerDown(g, t)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: t.id, kind: t.kind });
    }}>
        <rect x=${-c} y=${-l} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${t.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : t.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${t.dashed ? "6 4" : ""}>
          ${t.tooltip ? k`<title>${t.tooltip}</title>` : ""}
        </rect>
        ${t.badge ? k`<text x=${-c} y=${-l - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${t.badge}</text>` : ""}
        ${t.symbol && jt[t.symbol] && !r ? k`<g transform="translate(${c - 17}, ${-l + 5})" fill="none"
                  stroke=${t.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${jt[t.symbol]}
              </g>` : ""}
        ${r && t.symbol && jt[t.symbol] ? k`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${t.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${jt[t.symbol]}
              </g>` : ""}
        ${this._editingId === t.id ? k`
              <foreignObject x=${-c + 6} y=${o ? -l + 6 : -14} width=${t.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${t.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(t, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(t, g.target.value)}
                />
              </foreignObject>` : r ? k`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? k`<text x=${-c + 12} y=${-l + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${t.label}</text>` : k`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${t.label}</text>`}
        ${o ? k`<line x1=${-c + 8} y1=${-l + 28} x2=${c - 8} y2=${-l + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (!r || t.kind === "aggregate" || t.kind === "domain-event") ? [
      [c, 0],
      [-c, 0],
      [0, l],
      [0, -l]
    ].map(
      ([g, _]) => k`
                <circle data-handle cx=${g} cy=${_} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(x) => this.onHandlePointerDown(x, t)}>
                  <title>${r ? t.kind === "domain-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : "Arrastra hasta un evento de dominio para declarar que lo emite" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, _]) => k`
                <rect data-resize x=${g * c - 6.5} y=${_ * l - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * _ > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(x) => this.onResizePointerDown(x, t, g, _)}>
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
    const i = (o) => {
      const r = this.toScene(o);
      !n && Math.hypot(r.x - e.x, r.y - e.y) < 4 / this._t.k || (n = !0, this._rubber = { a: e, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s), n && this._rubber) {
        const { a: o, b: r } = this._rubber, a = Math.min(o.x, r.x), d = Math.max(o.x, r.x), c = Math.min(o.y, r.y), l = Math.max(o.y, r.y), h = this.scene.nodes.filter((u) => {
          const f = this.nodePos(u);
          return f.x >= a && f.x <= d && f.y >= c && f.y <= l;
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
    const n = Math.min(...e.map((r) => r.x - r.w / 2)) - t, i = Math.max(...e.map((r) => r.x + r.w / 2)) + t, s = Math.min(...e.map((r) => r.y - r.h / 2)) - t, o = Math.max(...e.map((r) => r.y + r.h / 2)) + t;
    return { minX: n, minY: s, w: i - n, h: o - s };
  }
  centerViewportOn(t, e) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), s = this._t.k, o = Ct.translate(i.width / 2 - s * t, i.height / 2 - s * e).scale(s);
    G(n).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(t, e, n) {
    const i = t.currentTarget.getBoundingClientRect(), s = e.minX + (t.clientX - i.left) / n, o = e.minY + (t.clientY - i.top) / n;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const t = this.sceneBounds();
    if (!t || this.scene.nodes.length < 2) return S``;
    const e = 160, n = 110, i = Math.min(e / t.w, n / t.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
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
      var l, h;
      (h = (l = c.currentTarget).hasPointerCapture) != null && h.call(l, c.pointerId) && this.onMinimapPointer(c, t, i);
    }}
      >
        <svg viewBox="0 0 ${e} ${n}">
          ${this.scene.nodes.map((c) => {
      const l = this.nodePos(c);
      return k`<rect
              x=${(l.x - c.w / 2 - t.minX) * i}
              y=${(l.y - c.h / 2 - t.minY) * i}
              width=${Math.max(2, c.w * i)}
              height=${Math.max(2, c.h * i)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - t.minX) * i}
            y=${(r - t.minY) * i}
            width=${a * i}
            height=${d * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const t = [...new Set(this.scene.edges.map((r) => r.color ?? "#64748b"))], e = [], n = this.scene.edges.map((r) => {
      const a = this.edgePolyline(r);
      if (!a) return k``;
      const d = this.renderEdge(r, a, [...e]);
      for (let c = 0; c < a.length - 1; c++) e.push([a[c], a[c + 1]]);
      return d;
    }), i = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (i.has(r.sourceId) || i.has(r.targetId) ? o : s).push(
        n[a]
      );
    }), S`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(r) => {
      const a = r.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || r.button !== 0 || this.startRubberBand(r);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${t.map(
      (r) => k`
              <marker id="arrow-${this.markerId(r)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${r}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${s}
          ${this.scene.nodes.filter((r) => !r.parentId).map((r) => this.renderNode(r))}
          ${o}
          ${this.scene.nodes.filter((r) => r.parentId).map((r) => this.renderNode(r))}
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
  st({ attribute: !1 })
], R.prototype, "scene", 2);
D([
  st({ attribute: !1 })
], R.prototype, "selectedId", 2);
D([
  st({ attribute: !1 })
], R.prototype, "selectedIds", 2);
D([
  st({ type: Boolean })
], R.prototype, "connectable", 2);
D([
  st({ attribute: !1 })
], R.prototype, "edgePoints", 2);
D([
  b()
], R.prototype, "_t", 2);
D([
  b()
], R.prototype, "_dragPos", 2);
D([
  b()
], R.prototype, "_pendingLink", 2);
D([
  b()
], R.prototype, "_hoverNodeId", 2);
D([
  b()
], R.prototype, "_editingId", 2);
D([
  b()
], R.prototype, "_spaceDown", 2);
D([
  b()
], R.prototype, "_wpDrag", 2);
D([
  b()
], R.prototype, "_selectedWaypoint", 2);
D([
  b()
], R.prototype, "_resize", 2);
D([
  b()
], R.prototype, "_rubber", 2);
R = D([
  Be("modux-canvas")
], R);
async function Ka(t, e) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((d) => d.e), i = new n(), o = {
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
    children: t.nodes.map((d) => ({ id: d.id, width: d.w, height: d.h })),
    edges: t.edges.map((d) => ({ id: d.id, sources: [d.sourceId], targets: [d.targetId] }))
  }, r = await i.layout(o), a = {};
  for (const d of r.children ?? [])
    a[d.id] = {
      x: (d.x ?? 0) + (d.width ?? 0) / 2,
      y: (d.y ?? 0) + (d.height ?? 0) / 2
    };
  return a;
}
var Za = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, N = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ja(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (i ? r(e, n, s) : r(s)) || s);
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
], tl = ["CORE", "SUPPORTING", "GENERIC"], tt = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
      case "add-emission":
        return [{ kind: "remove-emission", sourceId: t.sourceId, targetId: t.targetId }];
      case "remove-emission":
        return [{ kind: "add-emission", sourceId: t.sourceId, targetId: t.targetId }];
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
    const { id: e, x: n, y: i } = t.detail, s = this._view, o = this.viewLayout(s), r = o.nodes[e] ?? null;
    let a = { x: n, y: i };
    const d = this.sceneFor(s), c = d.nodes.find((h) => h.id === e);
    if (c != null && c.parentId) {
      const h = d.nodes.find((u) => u.id === c.parentId);
      h && (a = { x: n - h.x, y: i - h.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [e]: a } });
    const l = [{ kind: "move-node", view: s, id: e, pos: r }];
    if (s === "processes") {
      const h = this.stepReorderCommand(e);
      if (h) {
        const u = this.inverseOf(h);
        u && l.unshift(...u), this.command(h, !1);
      }
    }
    this.pushUndoEntry(l);
  }
  onNodeResized(t) {
    var l;
    const { id: e, x: n, y: i, w: s, h: o } = t.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((h) => h.parentId === e);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: e, size: ((l = a.sizes) == null ? void 0 : l[e]) ?? null },
      { kind: "move-node", view: r, id: e, pos: a.nodes[e] ?? null },
      ...d.map((h) => ({ kind: "move-node", view: r, id: h.id, pos: a.nodes[h.id] ?? null }))
    ]);
    const c = { ...a.nodes, [e]: { x: n, y: i } };
    for (const h of d) c[h.id] = { x: h.x - n, y: h.y - i };
    this.writeViewLayout(r, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [e]: { w: s, h: o } }
    });
  }
  onEdgePointsChanged(t) {
    const { id: e, points: n } = t.detail, i = this._view, s = this.viewLayout(i);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: i, id: e, points: s.edges[e] ?? null }
    ]);
    const o = { ...s.edges };
    n.length ? o[e] = n : delete o[e], this.writeViewLayout(i, { ...s, edges: o });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(t) {
    const e = this.owningProcessOf(t);
    if (!e) return null;
    const n = Je(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((r) => [r.id, r.x])), s = [...e.steps].sort(
      (r, a) => (i.get(r.id) ?? 0) - (i.get(a.id) ?? 0)
    );
    if (s.every((r, a) => r.id === e.steps[a].id)) return null;
    const o = s.findIndex((r) => r.id === t);
    return {
      kind: "move-process-step",
      processId: e.id,
      id: t,
      afterStepId: o > 0 ? s[o - 1].id : void 0
    };
  }
  onConnectRequested(t) {
    const { sourceId: e, targetId: n, x: i, y: s } = t.detail;
    if (this._view !== "context-map") return;
    const o = new Set(
      this.model.modules.flatMap((l) => (l.domainEvents ?? []).map((h) => h.id))
    ), r = new Set((this.model.aggregates ?? []).map((l) => l.id));
    if (r.has(e) && o.has(n)) {
      (this.model.emissions ?? []).some(
        (h) => h.sourceId === e && h.domainEventId === n
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: n });
      return;
    }
    if (o.has(e)) {
      const l = this.model.modules.flatMap((y) => y.domainEvents ?? []).find((y) => y.id === e), h = this.model.modules.flatMap((y) => (y.readModels ?? []).map((T) => ({ rm: T, module: y }))).find(({ rm: y }) => y.id === n), u = this.model.modules.find((y) => y.id === n) ?? (h == null ? void 0 : h.module);
      if (!l || !u) return;
      const f = new Set((this.model.aggregates ?? []).map((y) => y.id)), g = (this.model.emissions ?? []).find(
        (y) => y.domainEventId === e && f.has(y.sourceId)
      );
      if (!g) {
        this.emit("modux-notice", {
          message: `Declara primero qué agregado emite ${l.name} (arrastra desde el agregado hasta el evento) — el flow necesita su agregado disparador`,
          kind: "info"
        });
        return;
      }
      const _ = (h == null ? void 0 : h.rm.name) ?? `${l.name}View`;
      if (this.model.flows.some(
        (y) => y.archetype === "MATERIALIZES" && y.triggerEvent === l.name && y.targetId === u.id && y.readModelName === _
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${tt(l.name)}-${tt(_)}`,
        name: _,
        archetype: "MATERIALIZES",
        triggerAggregateId: g.sourceId,
        triggerEvent: l.name,
        targetId: u.id,
        readModelName: _
      });
      return;
    }
    const a = /* @__PURE__ */ new Set([
      ...r,
      ...this.model.modules.flatMap((l) => (l.useCases ?? []).map((h) => h.id)),
      ...this.model.modules.flatMap((l) => (l.readModels ?? []).map((h) => h.id))
    ]);
    if (a.has(e) || a.has(n) || o.has(n))
      return;
    const d = new Set(this.model.externalSystems.map((l) => l.id));
    d.has(e) || d.has(n) || this.model.relations.some(
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
    if (this._view === "context-map" && e === "edge" && i === "emission") {
      const s = /^emit:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-emission", sourceId: s[1], targetId: s[2] });
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
      id: `step-${tt(t)}`,
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
    !t || !e.length || (this.command({ kind: "add-view", id: `view-${tt(t)}`, name: t, memberIds: e }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const t = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
    if (!t) return this.model;
    const e = new Set(t.memberIds), n = this.model.modules.filter((d) => e.has(d.id)), i = new Set(n.map((d) => d.id)), s = this.model.externalSystems.filter((d) => e.has(d.id)), o = new Set(s.map((d) => d.id)), r = (this.model.aggregates ?? []).filter(
      (d) => e.has(d.id) || i.has(d.moduleId)
    ), a = new Set(r.map((d) => d.id));
    return {
      ...this.model,
      modules: n,
      externalSystems: s,
      relations: this.model.relations.filter(
        (d) => i.has(d.sourceId) && i.has(d.targetId)
      ),
      flows: this.model.flows.filter(
        (d) => e.has(d.id) || (i.has(d.sourceId) || o.has(d.sourceId)) && (i.has(d.targetId) || o.has(d.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((d) => a.has(d.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (d) => a.has(d.sourceAggregateId) && a.has(d.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (d) => e.has(d.id) || (d.ownerModuleId ? i.has(d.ownerModuleId) : !1)
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
    var e, n, i, s, o, r, a, d, c;
    const t = this._newName.trim();
    if (t) {
      if (this._view === "context-map")
        if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const l = (e = this.model.modules.find((u) => u.id === this._selectedId)) == null ? void 0 : e.id, h = this._newModuleId || l || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!h) return;
          this.command({ kind: "add-domain-event", id: `ev-${tt(t)}`, name: t, moduleId: h });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${tt(t)}`,
            name: t,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const l = this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${tt(t)}`, name: t, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((o = (s = this.model.aggregates) == null ? void 0 : s[0]) == null ? void 0 : o.id), h = this._newTargetId || ((r = this.model.modules[0]) == null ? void 0 : r.id), u = this._newTriggerEvent.trim();
        if (!l || !h || !u) return;
        this.command({
          kind: "add-flow",
          id: `flow-${tt(t)}`,
          name: t,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: u,
          targetId: h
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newModuleId || ((a = this.model.modules[0]) == null ? void 0 : a.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${tt(t)}`,
          name: t,
          moduleId: l,
          triggerAggregateId: this._newTriggerAggId || ((c = (d = this.model.aggregates) == null ? void 0 : d[0]) == null ? void 0 : c.id),
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
    var d;
    const t = this._view, e = this.sceneFor(t);
    if (!e.nodes.length) return;
    const n = e.nodes.filter((c) => !c.parentId), i = new Set(n.map((c) => c.id)), s = {
      nodes: n,
      edges: e.edges.filter((c) => i.has(c.sourceId) && i.has(c.targetId))
    }, r = await Ka(s, t === "flows" || t === "processes" ? "layered" : "force"), a = this.viewLayout(t);
    this.pushUndoEntry([
      ...n.map((c) => ({
        kind: "move-node",
        view: t,
        id: c.id,
        pos: a.nodes[c.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(a.edges).map((c) => ({
        kind: "set-edge-points",
        view: t,
        id: c,
        points: a.edges[c]
      }))
    ]), this.writeViewLayout(t, { nodes: r, edges: {}, sizes: a.sizes }), await this.updateComplete, (d = this.renderRoot.querySelector("modux-canvas")) == null || d.fit();
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
N([
  st({ attribute: !1 })
], A.prototype, "model", 2);
N([
  st({ attribute: !1 })
], A.prototype, "layout", 2);
N([
  b()
], A.prototype, "_view", 2);
N([
  b()
], A.prototype, "_detail", 2);
N([
  b()
], A.prototype, "_relationType", 2);
N([
  b()
], A.prototype, "_relationPicker", 2);
N([
  b()
], A.prototype, "_selectedId", 2);
N([
  b()
], A.prototype, "_newName", 2);
N([
  b()
], A.prototype, "_newSubdomain", 2);
N([
  b()
], A.prototype, "_newModuleId", 2);
N([
  b()
], A.prototype, "_newContextMapKind", 2);
N([
  b()
], A.prototype, "_newArchetype", 2);
N([
  b()
], A.prototype, "_newTriggerAggId", 2);
N([
  b()
], A.prototype, "_newTriggerEvent", 2);
N([
  b()
], A.prototype, "_newTargetId", 2);
N([
  b()
], A.prototype, "_undoStack", 2);
N([
  b()
], A.prototype, "_redoStack", 2);
N([
  b()
], A.prototype, "_newStepName", 2);
N([
  b()
], A.prototype, "_newStepType", 2);
N([
  b()
], A.prototype, "_newStepRole", 2);
N([
  b()
], A.prototype, "_newStepDeadline", 2);
N([
  b()
], A.prototype, "_editStepRole", 2);
N([
  b()
], A.prototype, "_editStepDeadline", 2);
N([
  b()
], A.prototype, "_editStepComp", 2);
N([
  b()
], A.prototype, "_multi", 2);
N([
  b()
], A.prototype, "_newViewName", 2);
N([
  b()
], A.prototype, "_activeViewId", 2);
A = N([
  Be("modux-editor")
], A);
var il = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, yt = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? sl(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && il(e, n, s), s;
};
let it = class extends pt {
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
        let o = `El servidor rechazó el comando (${n.status})`;
        try {
          const r = await n.json();
          r != null && r.message && (o = r.message);
        } catch {
        }
        this.showToast(o);
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
        @modux-notice=${(t) => this.showToast(t.detail.message, t.detail.kind ?? "info")}
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
it.styles = He`
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
  st()
], it.prototype, "base", 2);
yt([
  b()
], it.prototype, "_model", 2);
yt([
  b()
], it.prototype, "_layout", 2);
yt([
  b()
], it.prototype, "_error", 2);
yt([
  b()
], it.prototype, "_saving", 2);
yt([
  b()
], it.prototype, "_toast", 2);
it = yt([
  Be("modux-editor-connected")
], it);
export {
  rl as CONTAINER_HEADER,
  ol as CONTAINER_INSET,
  R as ModuxCanvas,
  A as ModuxEditor,
  it as ModuxEditorConnected,
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
