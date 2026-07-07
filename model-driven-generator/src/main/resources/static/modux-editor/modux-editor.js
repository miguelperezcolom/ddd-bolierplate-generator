const rd = 34, od = 10;
function fi(e, t = { w: 160, h: 90 }) {
  let n = t.w, i = t.h;
  for (const s of e)
    n = Math.max(n, 2 * (Math.abs(s.dx) + s.w / 2 + 10)), i = Math.max(
      i,
      2 * (34 + s.h / 2 - s.dy),
      // child's top edge below the header band
      2 * (10 + s.h / 2 + s.dy)
      // child's bottom edge above the inset
    );
  return { w: n, h: i };
}
function pi(e, t, n) {
  let i = t.w / 2, s = t.w / 2, o = t.h / 2, r = t.h / 2;
  for (const a of n)
    i = Math.max(i, -a.dx + a.w / 2 + 10), s = Math.max(s, a.dx + a.w / 2 + 10), o = Math.max(o, -a.dy + a.h / 2 + 34), r = Math.max(r, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (s - i) / 2,
    y: e.y + (r - o) / 2,
    w: i + s,
    h: o + r
  };
}
function mi(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
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
}, kt = 168, St = 56, Tn = 34, Mn = 14, wi = 14, Pe = 108, Re = 32, Nn = 12, Cn = 10, Le = 2, vi = Le * Pe + (Le - 1) * Nn + 2 * Mn;
function xi(e, t) {
  return `rel:${e}->${t}`;
}
function $i(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some((i) => i.sourceId === t.sourceId && i.targetId === t.targetId) ? "OK" : e.relations.some((i) => i.sourceId === t.targetId && i.targetId === t.sourceId) ? "REVERSED" : "MISSING_RELATION";
}
function bi(e, t) {
  const n = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const Ii = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" }
}, Ei = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio"
};
function ki(e) {
  const t = Math.max(1, Math.ceil(e / Le)), n = t * Re + (t - 1) * Cn;
  return { w: vi, h: Tn + n + wi };
}
function Si(e, t) {
  const n = e % Le, i = Math.floor(e / Le);
  return {
    x: -t.w / 2 + Mn + n * (Pe + Nn) + Pe / 2,
    y: -t.h / 2 + Tn + i * (Re + Cn) + Re / 2
  };
}
function Ai(e, t, n, i, s, o) {
  const a = [
    ...(e.aggregates ?? []).filter((f) => f.moduleId === t.id).map((f) => ({ id: f.id, name: f.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map((f) => ({ id: f.id, name: f.name, kind: "use-case" })),
    ...(t.domainEvents ?? []).map(
      (f) => ({ id: f.id, name: f.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (f) => ({ id: f.id, name: f.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (f) => ({ id: f.id, name: f.name, kind: "domain-service" })
    )
  ];
  if (!a.length)
    return [{ ...i, x: n.x, y: n.y, w: kt, h: St }];
  const l = o[t.id] ?? ki(a.length), c = a.map((f, _) => s[f.id] ?? Si(_, l)), d = pi(
    n,
    l,
    c.map((f) => ({ dx: f.x, dy: f.y, w: Pe, h: Re }))
  ), h = {
    ...i,
    x: d.x,
    y: d.y,
    w: d.w,
    h: d.h,
    container: !0
  }, u = a.map((f, _) => {
    const m = c[_], v = Ii[f.kind];
    return {
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: n.x + m.x,
      y: n.y + m.y,
      w: Pe,
      h: Re,
      symbol: v.symbol,
      fill: v.fill,
      stroke: v.stroke,
      parentId: t.id,
      tooltip: `${Ei[f.kind]} ${f.name}`
    };
  });
  return [h, ...u];
}
function Ti(e, t, n = !1, i = {}) {
  const s = [
    ...e.modules.map((d) => ({ ref: d, external: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0 }))
  ], o = s.flatMap((d, h) => {
    const u = t[d.ref.id] ?? bi(h, s.length);
    if (d.external)
      return [
        {
          id: d.ref.id,
          label: d.ref.name,
          x: u.x,
          y: u.y,
          w: kt,
          h: St,
          kind: "external-system",
          symbol: "component",
          fill: "#ffffff",
          stroke: "#64748b",
          dashed: !0,
          badge: "EXTERNAL",
          tooltip: `${d.ref.name} (sistema externo)`
        }
      ];
    const f = d.ref, _ = f.subdomainType ?? "GENERIC", m = {
      id: f.id,
      label: f.name,
      kind: "module",
      symbol: "component",
      fill: gi[_],
      stroke: "#94a3b8",
      badge: _,
      tooltip: `${f.name} — subdominio ${_}`
    };
    return n ? Ai(e, f, u, m, t, i) : [{ ...m, x: u.x, y: u.y, w: kt, h: St }];
  });
  o.sort((d, h) => (d.parentId ? 1 : 0) - (h.parentId ? 1 : 0));
  const r = e.relations.map((d) => ({
    id: xi(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: _i[d.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)`
  })), a = e.flows.map((d) => {
    var _, m, v, y;
    const h = $i(e, d), u = n ? (m = (_ = e.modules.find((N) => N.id === d.sourceId)) == null ? void 0 : _.domainEvents) == null ? void 0 : m.find((N) => N.name === d.triggerEvent) : void 0, f = n && d.readModelName ? (y = (v = e.modules.find((N) => N.id === d.targetId)) == null ? void 0 : v.readModels) == null ? void 0 : y.find((N) => N.name === d.readModelName) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (u == null ? void 0 : u.id) ?? d.sourceId,
      targetId: (f == null ? void 0 : f.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: yi[h],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${h}`
    };
  }), l = new Set(o.map((d) => d.id)), c = n ? (e.emissions ?? []).filter((d) => l.has(d.sourceId) && l.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [];
  return { nodes: o, edges: [...r, ...a, ...c] };
}
const Mi = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ni = 176, Ci = 60, Pi = 140, Ri = 40;
function Li(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    n.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const d = i.filter((u) => u.aggregateId === l.id).length, h = 140 + c * (170 + d * 60);
      t[l.id] = { x: r, y: h }, i.filter((u) => u.aggregateId === l.id).forEach((u, f) => {
        t[u.id] = { x: r + 60, y: h + 100 + f * 60 };
      });
    });
  }), n.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Oi(e, t) {
  const n = Li(e), i = (c) => t[c] ?? n[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const d = s.get(c.moduleId), h = (d == null ? void 0 : d.subdomainType) ?? "GENERIC", u = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
      w: Ni,
      h: Ci,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Mi[h],
      stroke: "#64748b",
      badge: d ? `${d.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${d ? ` — módulo ${d.name} (${h})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const d = i(c.id);
    return {
      id: c.id,
      label: c.name,
      x: d.x,
      y: d.y,
      w: Pi,
      h: Ri,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${c.name} (dentro del agregado)`
    };
  }), a = (e.entities ?? []).map((c) => ({
    id: `contains:${c.aggregateId}->${c.id}`,
    sourceId: c.aggregateId,
    targetId: c.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), l = (e.aggregateReferences ?? []).map((c, d) => ({
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
    nodes: [...o, ...r],
    edges: [...a, ...l]
  };
}
const Di = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, zi = 150, Ui = 44, Hi = 190, Vi = 56, Fi = 160, Bi = 48;
function qi(e, t) {
  const n = e.externalSystems.find((s) => s.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function Wi(e, t) {
  const n = e.flows, i = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((d) => d.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return n.forEach((a, l) => {
    const c = 120 + l * 130, d = Di[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const v = t[h] ?? { x: 160, y: c };
      i.push({
        id: h,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : h,
        x: v.x,
        y: v.y,
        w: zi,
        h: Ui,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const u = `flow:${a.id}`, f = t[u] ?? { x: 470, y: c };
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
      stroke: d,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const _ = qi(e, a), m = `tgt:${_.id}`;
    if (!o.has(m)) {
      o.add(m);
      const v = t[m] ?? { x: 790, y: c };
      i.push({
        id: m,
        label: _.label,
        x: v.x,
        y: v.y,
        w: Fi,
        h: Bi,
        kind: _.external ? "external-system" : "module",
        symbol: "component",
        fill: _.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: _.external,
        badge: _.external ? "EXTERNAL" : "MODULE"
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
      targetId: m,
      kind: "flow-delivery",
      color: d,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const Xi = 190, Yi = 56, yt = 170, Gi = 52;
function Jt(e, t) {
  const n = [], i = [], s = (o) => {
    var r;
    return (r = e.modules.find((a) => a.id === o)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((o, r) => {
    const a = 140 + r * 240, l = t[o.id] ?? { x: 150, y: a };
    n.push({
      id: o.id,
      label: o.name,
      x: l.x,
      y: l.y,
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
    if (o.steps.forEach((d, h) => {
      const u = d.type === "HUMAN", f = t[d.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (n.push({
        id: d.id,
        label: d.name,
        x: f.x,
        y: f.y,
        w: yt,
        h: Gi,
        kind: "process-step",
        symbol: u ? "person" : "gear",
        fill: u ? "#fef3c7" : "#ffffff",
        stroke: u ? "#d97706" : "#64748b",
        badge: u ? `HUMAN${d.roleId ? ` · ${d.roleId}` : ""}${d.deadline ? ` · ⏱ ${d.deadline}` : ""}` : "AUTOMATED",
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
        const _ = `comp:${d.id}`, m = t[_] ?? { x: f.x, y: f.y + 90 };
        n.push({
          id: _,
          label: d.compensationUseCaseId,
          x: m.x,
          y: m.y,
          w: yt,
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
          targetId: _,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = d.id;
    }), o.onCompletionEventName) {
      const d = `done:${o.id}`, h = t[d] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      n.push({
        id: d,
        label: o.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: yt,
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
const et = globalThis, zt = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ut = Symbol(), Qt = /* @__PURE__ */ new WeakMap();
let Pn = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (zt && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = Qt.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Qt.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ki = (e) => new Pn(typeof e == "string" ? e : e + "", void 0, Ut), Ht = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Pn(n, e, Ut);
}, Zi = (e, t) => {
  if (zt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = et.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, e.appendChild(i);
  }
}, jt = zt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Ki(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ji, defineProperty: Qi, getOwnPropertyDescriptor: ji, getOwnPropertyNames: es, getOwnPropertySymbols: ts, getPrototypeOf: ns } = Object, de = globalThis, en = de.trustedTypes, is = en ? en.emptyScript : "", wt = de.reactiveElementPolyfillSupport, Me = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? is : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, Vt = (e, t) => !Ji(e, t), tn = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: Vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), de.litPropertyMetadata ?? (de.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let we = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = tn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, n);
      s !== void 0 && Qi(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: s, set: o } = ji(this.prototype, t) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Me("elementProperties"))) return;
    const t = ns(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Me("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Me("properties"))) {
      const n = this.properties, i = [...es(n), ...ts(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) n.unshift(jt(s));
    } else t !== void 0 && n.push(jt(t));
    return n;
  }
  static _$Eu(t, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((n) => n(this));
  }
  addController(t) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) == null || n.call(t));
  }
  removeController(t) {
    var n;
    (n = this._$EO) == null || n.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zi(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostConnected) == null ? void 0 : i.call(n);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostDisconnected) == null ? void 0 : i.call(n);
    });
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$ET(t, n) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : rt).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : rt;
      this._$Em = s;
      const c = l.fromAttribute(n, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Vt)(o, n) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? n ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
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
        const { wrapped: a } = r, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(n)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
we.elementStyles = [], we.shadowRootOptions = { mode: "open" }, we[Me("elementProperties")] = /* @__PURE__ */ new Map(), we[Me("finalized")] = /* @__PURE__ */ new Map(), wt == null || wt({ ReactiveElement: we }), (de.reactiveElementVersions ?? (de.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = globalThis, nn = (e) => e, ot = Ne.trustedTypes, sn = ot ? ot.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Rn = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, Ln = "?" + ae, ss = `<${Ln}>`, ge = document, Oe = () => ge.createComment(""), De = (e) => e === null || typeof e != "object" && typeof e != "function", Ft = Array.isArray, rs = (e) => Ft(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", vt = `[ 	
\f\r]`, Ee = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rn = /-->/g, on = />/g, le = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), an = /'/g, dn = /"/g, On = /^(?:script|style|textarea|title)$/i, Dn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), A = Dn(1), S = Dn(2), xe = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), ln = /* @__PURE__ */ new WeakMap(), he = ge.createTreeWalker(ge, 129);
function zn(e, t) {
  if (!Ft(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return sn !== void 0 ? sn.createHTML(t) : t;
}
const os = (e, t) => {
  const n = e.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Ee;
  for (let a = 0; a < n; a++) {
    const l = e[a];
    let c, d, h = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, d = r.exec(l), d !== null); ) u = r.lastIndex, r === Ee ? d[1] === "!--" ? r = rn : d[1] !== void 0 ? r = on : d[2] !== void 0 ? (On.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = le) : d[3] !== void 0 && (r = le) : r === le ? d[0] === ">" ? (r = s ?? Ee, h = -1) : d[1] === void 0 ? h = -2 : (h = r.lastIndex - d[2].length, c = d[1], r = d[3] === void 0 ? le : d[3] === '"' ? dn : an) : r === dn || r === an ? r = le : r === rn || r === on ? r = Ee : (r = le, s = void 0);
    const f = r === le && e[a + 1].startsWith("/>") ? " " : "";
    o += r === Ee ? l + ss : h >= 0 ? (i.push(c), l.slice(0, h) + Rn + l.slice(h) + ae + f) : l + ae + (h === -2 ? a : f);
  }
  return [zn(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ze {
  constructor({ strings: t, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, d] = os(t, n);
    if (this.el = ze.createElement(c, i), he.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = he.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Rn)) {
          const u = d[r++], f = s.getAttribute(h).split(ae), _ = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: _[2], strings: f, ctor: _[1] === "." ? ds : _[1] === "?" ? ls : _[1] === "@" ? cs : ft }), s.removeAttribute(h);
        } else h.startsWith(ae) && (l.push({ type: 6, index: o }), s.removeAttribute(h));
        if (On.test(s.tagName)) {
          const h = s.textContent.split(ae), u = h.length - 1;
          if (u > 0) {
            s.textContent = ot ? ot.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(h[f], Oe()), he.nextNode(), l.push({ type: 2, index: ++o });
            s.append(h[u], Oe());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ln) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(ae, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += ae.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const i = ge.createElement("template");
    return i.innerHTML = t, i;
  }
}
function $e(e, t, n = e, i) {
  var r, a;
  if (t === xe) return t;
  let s = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const o = De(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (t = $e(e, s._$AS(e, t.values), s, i)), t;
}
class as {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? ge).importNode(n, !0);
    he.currentNode = s;
    let o = he.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new Be(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new hs(o, this, t)), this._$AV.push(c), l = i[++a];
      }
      r !== (l == null ? void 0 : l.index) && (o = he.nextNode(), r++);
    }
    return he.currentNode = ge, s;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Be {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, n, i, s) {
    this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = $e(this, t, n), De(t) ? t === R || t == null || t === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : t !== this._$AH && t !== xe && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : rs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== R && De(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ge.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: n, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ze.createElement(zn(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(n);
    else {
      const r = new as(s, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = ln.get(t.strings);
    return n === void 0 && ln.set(t.strings, n = new ze(t)), n;
  }
  k(t) {
    Ft(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const o of t) s === n.length ? n.push(i = new Be(this.O(Oe()), this.O(Oe()), this, this.options)) : i = n[s], i._$AI(o), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const s = nn(t).nextSibling;
      nn(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, s, o) {
    this.type = 1, this._$AH = R, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = R;
  }
  _$AI(t, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = $e(this, t, n, 0), r = !De(t) || t !== this._$AH && t !== xe, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = $e(this, a[i + l], n, l), c === xe && (c = this._$AH[l]), r || (r = !De(c) || c !== this._$AH[l]), c === R ? t = R : t !== R && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ds extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === R ? void 0 : t;
  }
}
class ls extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== R);
  }
}
class cs extends ft {
  constructor(t, n, i, s, o) {
    super(t, n, i, s, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = $e(this, t, n, 0) ?? R) === xe) return;
    const i = this._$AH, s = t === R && i !== R || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== R && (i === R || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class hs {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    $e(this, t);
  }
}
const xt = Ne.litHtmlPolyfillSupport;
xt == null || xt(ze, Be), (Ne.litHtmlVersions ?? (Ne.litHtmlVersions = [])).push("3.3.3");
const us = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new Be(t.insertBefore(Oe(), o), o, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis;
class pe extends we {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const t = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = t.firstChild), t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = us(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return xe;
  }
}
var An;
pe._$litElement$ = !0, pe.finalized = !0, (An = fe.litElementHydrateSupport) == null || An.call(fe, { LitElement: pe });
const $t = fe.litElementPolyfillSupport;
$t == null || $t({ LitElement: pe });
(fe.litElementVersions ?? (fe.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fs = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: Vt }, ps = (e = fs, t, n) => {
  const { kind: i, metadata: s } = n;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(n.name, e), i === "accessor") {
    const { name: r } = n;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function se(e) {
  return (t, n) => typeof n == "object" ? ps(e, t, n) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(e) {
  return se({ ...e, state: !0, attribute: !1 });
}
var At = "http://www.w3.org/1999/xhtml";
const cn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: At,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pt(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), cn.hasOwnProperty(t) ? { space: cn[t], local: e } : e;
}
function ms(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === At && t.documentElement.namespaceURI === At ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function gs(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Un(e) {
  var t = pt(e);
  return (t.local ? gs : ms)(t);
}
function _s() {
}
function qt(e) {
  return e == null ? _s : function() {
    return this.querySelector(e);
  };
}
function ys(e) {
  typeof e != "function" && (e = qt(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = new Array(r), l, c, d = 0; d < r; ++d)
      (l = o[d]) && (c = e.call(l, l.__data__, d, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[d] = c);
  return new H(i, this._parents);
}
function ws(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function vs() {
  return [];
}
function Hn(e) {
  return e == null ? vs : function() {
    return this.querySelectorAll(e);
  };
}
function xs(e) {
  return function() {
    return ws(e.apply(this, arguments));
  };
}
function $s(e) {
  typeof e == "function" ? e = xs(e) : e = Hn(e);
  for (var t = this._groups, n = t.length, i = [], s = [], o = 0; o < n; ++o)
    for (var r = t[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && (i.push(e.call(l, l.__data__, c, r)), s.push(l));
  return new H(i, s);
}
function Vn(e) {
  return function() {
    return this.matches(e);
  };
}
function Fn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var bs = Array.prototype.find;
function Is(e) {
  return function() {
    return bs.call(this.children, e);
  };
}
function Es() {
  return this.firstElementChild;
}
function ks(e) {
  return this.select(e == null ? Es : Is(typeof e == "function" ? e : Fn(e)));
}
var Ss = Array.prototype.filter;
function As() {
  return Array.from(this.children);
}
function Ts(e) {
  return function() {
    return Ss.call(this.children, e);
  };
}
function Ms(e) {
  return this.selectAll(e == null ? As : Ts(typeof e == "function" ? e : Fn(e)));
}
function Ns(e) {
  typeof e != "function" && (e = Vn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new H(i, this._parents);
}
function Bn(e) {
  return new Array(e.length);
}
function Cs() {
  return new H(this._enter || this._groups.map(Bn), this._parents);
}
function at(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
at.prototype = {
  constructor: at,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function Ps(e) {
  return function() {
    return e;
  };
}
function Rs(e, t, n, i, s, o) {
  for (var r = 0, a, l = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], i[r] = a) : n[r] = new at(e, o[r]);
  for (; r < l; ++r)
    (a = t[r]) && (s[r] = a);
}
function Ls(e, t, n, i, s, o, r) {
  var a, l, c = /* @__PURE__ */ new Map(), d = t.length, h = o.length, u = new Array(d), f;
  for (a = 0; a < d; ++a)
    (l = t[a]) && (u[a] = f = r.call(l, l.__data__, a, t) + "", c.has(f) ? s[a] = l : c.set(f, l));
  for (a = 0; a < h; ++a)
    f = r.call(e, o[a], a, o) + "", (l = c.get(f)) ? (i[a] = l, l.__data__ = o[a], c.delete(f)) : n[a] = new at(e, o[a]);
  for (a = 0; a < d; ++a)
    (l = t[a]) && c.get(u[a]) === l && (s[a] = l);
}
function Os(e) {
  return e.__data__;
}
function Ds(e, t) {
  if (!arguments.length) return Array.from(this, Os);
  var n = t ? Ls : Rs, i = this._parents, s = this._groups;
  typeof e != "function" && (e = Ps(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var d = i[c], h = s[c], u = h.length, f = zs(e.call(d, d && d.__data__, c, i)), _ = f.length, m = a[c] = new Array(_), v = r[c] = new Array(_), y = l[c] = new Array(u);
    n(d, h, m, v, y, f, t);
    for (var N = 0, $ = 0, O, V; N < _; ++N)
      if (O = m[N]) {
        for (N >= $ && ($ = N + 1); !(V = v[$]) && ++$ < _; ) ;
        O._next = V || null;
      }
  }
  return r = new H(r, i), r._enter = a, r._exit = l, r;
}
function zs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Us() {
  return new H(this._exit || this._groups.map(Bn), this._parents);
}
function Hs(e, t, n) {
  var i = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? o.remove() : n(o), i && s ? i.merge(s).order() : s;
}
function Vs(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, s = n.length, o = i.length, r = Math.min(s, o), a = new Array(s), l = 0; l < r; ++l)
    for (var c = n[l], d = i[l], h = c.length, u = a[l] = new Array(h), f, _ = 0; _ < h; ++_)
      (f = c[_] || d[_]) && (u[_] = f);
  for (; l < s; ++l)
    a[l] = n[l];
  return new H(a, this._parents);
}
function Fs() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], s = i.length - 1, o = i[s], r; --s >= 0; )
      (r = i[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function Bs(e) {
  e || (e = qs);
  function t(h, u) {
    return h && u ? e(h.__data__, u.__data__) : !h - !u;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o) {
    for (var r = n[o], a = r.length, l = s[o] = new Array(a), c, d = 0; d < a; ++d)
      (c = r[d]) && (l[d] = c);
    l.sort(t);
  }
  return new H(s, this._parents).order();
}
function qs(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ws() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Xs() {
  return Array.from(this);
}
function Ys() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length; s < o; ++s) {
      var r = i[s];
      if (r) return r;
    }
  return null;
}
function Gs() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Ks() {
  return !this.node();
}
function Zs(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var s = t[n], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function Js(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Qs(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function js(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function er(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function tr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function nr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function ir(e, t) {
  var n = pt(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Qs : Js : typeof t == "function" ? n.local ? nr : tr : n.local ? er : js)(n, t));
}
function qn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function sr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function rr(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function or(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function ar(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? sr : typeof t == "function" ? or : rr)(e, t, n ?? "")) : be(this.node(), e);
}
function be(e, t) {
  return e.style.getPropertyValue(t) || qn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function dr(e) {
  return function() {
    delete this[e];
  };
}
function lr(e, t) {
  return function() {
    this[e] = t;
  };
}
function cr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function hr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? dr : typeof t == "function" ? cr : lr)(e, t)) : this.node()[e];
}
function Wn(e) {
  return e.trim().split(/^|\s+/);
}
function Wt(e) {
  return e.classList || new Xn(e);
}
function Xn(e) {
  this._node = e, this._names = Wn(e.getAttribute("class") || "");
}
Xn.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Yn(e, t) {
  for (var n = Wt(e), i = -1, s = t.length; ++i < s; ) n.add(t[i]);
}
function Gn(e, t) {
  for (var n = Wt(e), i = -1, s = t.length; ++i < s; ) n.remove(t[i]);
}
function ur(e) {
  return function() {
    Yn(this, e);
  };
}
function fr(e) {
  return function() {
    Gn(this, e);
  };
}
function pr(e, t) {
  return function() {
    (t.apply(this, arguments) ? Yn : Gn)(this, e);
  };
}
function mr(e, t) {
  var n = Wn(e + "");
  if (arguments.length < 2) {
    for (var i = Wt(this.node()), s = -1, o = n.length; ++s < o; ) if (!i.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? pr : t ? ur : fr)(n, t));
}
function gr() {
  this.textContent = "";
}
function _r(e) {
  return function() {
    this.textContent = e;
  };
}
function yr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function wr(e) {
  return arguments.length ? this.each(e == null ? gr : (typeof e == "function" ? yr : _r)(e)) : this.node().textContent;
}
function vr() {
  this.innerHTML = "";
}
function xr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function $r(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function br(e) {
  return arguments.length ? this.each(e == null ? vr : (typeof e == "function" ? $r : xr)(e)) : this.node().innerHTML;
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
function Ar(e) {
  var t = typeof e == "function" ? e : Un(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Tr() {
  return null;
}
function Mr(e, t) {
  var n = typeof e == "function" ? e : Un(e), i = t == null ? Tr : typeof t == "function" ? t : qt(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Nr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Cr() {
  return this.each(Nr);
}
function Pr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Rr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Lr(e) {
  return this.select(e ? Rr : Pr);
}
function Or(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Dr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function zr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Ur(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, s = t.length, o; n < s; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Hr(e, t, n) {
  return function() {
    var i = this.__on, s, o = Dr(t);
    if (i) {
      for (var r = 0, a = i.length; r < a; ++r)
        if ((s = i[r]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = n), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, n), s = { type: e.type, name: e.name, value: t, listener: o, options: n }, i ? i.push(s) : this.__on = [s];
  };
}
function Vr(e, t, n) {
  var i = zr(e + ""), s, o = i.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, d; l < c; ++l)
        for (s = 0, d = a[l]; s < o; ++s)
          if ((r = i[s]).type === d.type && r.name === d.name)
            return d.value;
    }
    return;
  }
  for (a = t ? Hr : Ur, s = 0; s < o; ++s) this.each(a(i[s], t, n));
  return this;
}
function Kn(e, t, n) {
  var i = qn(e), s = i.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = i.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Fr(e, t) {
  return function() {
    return Kn(this, e, t);
  };
}
function Br(e, t) {
  return function() {
    return Kn(this, e, t.apply(this, arguments));
  };
}
function qr(e, t) {
  return this.each((typeof t == "function" ? Br : Fr)(e, t));
}
function* Wr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length, r; s < o; ++s)
      (r = i[s]) && (yield r);
}
var Zn = [null];
function H(e, t) {
  this._groups = e, this._parents = t;
}
function qe() {
  return new H([[document.documentElement]], Zn);
}
function Xr() {
  return this;
}
H.prototype = qe.prototype = {
  constructor: H,
  select: ys,
  selectAll: $s,
  selectChild: ks,
  selectChildren: Ms,
  filter: Ns,
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
  insert: Mr,
  remove: Cr,
  clone: Lr,
  datum: Or,
  on: Vr,
  dispatch: qr,
  [Symbol.iterator]: Wr
};
function K(e) {
  return typeof e == "string" ? new H([[document.querySelector(e)]], [document.documentElement]) : new H([[e]], Zn);
}
function Yr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ce(e, t) {
  if (e = Yr(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = e.clientX, i.y = e.clientY, i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (t.getBoundingClientRect) {
      var s = t.getBoundingClientRect();
      return [e.clientX - s.left - t.clientLeft, e.clientY - s.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var Gr = { value: () => {
} };
function Xt() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new tt(n);
}
function tt(e) {
  this._ = e;
}
function Kr(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
tt.prototype = Xt.prototype = {
  constructor: tt,
  on: function(e, t) {
    var n = this._, i = Kr(e + "", n), s, o = -1, r = i.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = i[o]).type) && (s = Zr(n[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = i[o]).type) n[s] = hn(n[s], e.name, t);
      else if (t == null) for (s in n) n[s] = hn(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new tt(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var n = new Array(s), i = 0, s, o; i < s; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], i = 0, s = o.length; i < s; ++i) o[i].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], s = 0, o = i.length; s < o; ++s) i[s].value.apply(t, n);
  }
};
function Zr(e, t) {
  for (var n = 0, i = e.length, s; n < i; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function hn(e, t, n) {
  for (var i = 0, s = e.length; i < s; ++i)
    if (e[i].name === t) {
      e[i] = Gr, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Tt = { capture: !0, passive: !1 };
function Mt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jr(e) {
  var t = e.document.documentElement, n = K(e).on("dragstart.drag", Mt, Tt);
  "onselectstart" in t ? n.on("selectstart.drag", Mt, Tt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Qr(e, t) {
  var n = e.document.documentElement, i = K(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Mt, Tt), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function Yt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Jn(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function We() {
}
var Ue = 0.7, dt = 1 / Ue, ve = "\\s*([+-]?\\d+)\\s*", He = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Z = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", jr = /^#([0-9a-f]{3,8})$/, eo = new RegExp(`^rgb\\(${ve},${ve},${ve}\\)$`), to = new RegExp(`^rgb\\(${Z},${Z},${Z}\\)$`), no = new RegExp(`^rgba\\(${ve},${ve},${ve},${He}\\)$`), io = new RegExp(`^rgba\\(${Z},${Z},${Z},${He}\\)$`), so = new RegExp(`^hsl\\(${He},${Z},${Z}\\)$`), ro = new RegExp(`^hsla\\(${He},${Z},${Z},${He}\\)$`), un = {
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
Yt(We, Ve, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
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
function Ve(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = jr.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? mn(t) : n === 3 ? new U(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ke(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ke(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = eo.exec(e)) ? new U(t[1], t[2], t[3], 1) : (t = to.exec(e)) ? new U(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = no.exec(e)) ? Ke(t[1], t[2], t[3], t[4]) : (t = io.exec(e)) ? Ke(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = so.exec(e)) ? yn(t[1], t[2] / 100, t[3] / 100, 1) : (t = ro.exec(e)) ? yn(t[1], t[2] / 100, t[3] / 100, t[4]) : un.hasOwnProperty(e) ? mn(un[e]) : e === "transparent" ? new U(NaN, NaN, NaN, 0) : null;
}
function mn(e) {
  return new U(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ke(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new U(e, t, n, i);
}
function lo(e) {
  return e instanceof We || (e = Ve(e)), e ? (e = e.rgb(), new U(e.r, e.g, e.b, e.opacity)) : new U();
}
function Nt(e, t, n, i) {
  return arguments.length === 1 ? lo(e) : new U(e, t, n, i ?? 1);
}
function U(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Yt(U, Nt, Jn(We, {
  brighter(e) {
    return e = e == null ? dt : Math.pow(dt, e), new U(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ue : Math.pow(Ue, e), new U(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new U(me(this.r), me(this.g), me(this.b), lt(this.opacity));
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
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}`;
}
function co() {
  return `#${ue(this.r)}${ue(this.g)}${ue(this.b)}${ue((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function _n() {
  const e = lt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${me(this.r)}, ${me(this.g)}, ${me(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function lt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function me(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ue(e) {
  return e = me(e), (e < 16 ? "0" : "") + e.toString(16);
}
function yn(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new X(e, t, n, i);
}
function Qn(e) {
  if (e instanceof X) return new X(e.h, e.s, e.l, e.opacity);
  if (e instanceof We || (e = Ve(e)), !e) return new X();
  if (e instanceof X) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), o = Math.max(t, n, i), r = NaN, a = o - s, l = (o + s) / 2;
  return a ? (t === o ? r = (n - i) / a + (n < i) * 6 : n === o ? r = (i - t) / a + 2 : r = (t - n) / a + 4, a /= l < 0.5 ? o + s : 2 - o - s, r *= 60) : a = l > 0 && l < 1 ? 0 : r, new X(r, a, l, e.opacity);
}
function ho(e, t, n, i) {
  return arguments.length === 1 ? Qn(e) : new X(e, t, n, i ?? 1);
}
function X(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Yt(X, ho, Jn(We, {
  brighter(e) {
    return e = e == null ? dt : Math.pow(dt, e), new X(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ue : Math.pow(Ue, e), new X(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - i;
    return new U(
      bt(e >= 240 ? e - 240 : e + 120, s, i),
      bt(e, s, i),
      bt(e < 120 ? e + 240 : e - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new X(wn(this.h), Ze(this.s), Ze(this.l), lt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = lt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${wn(this.h)}, ${Ze(this.s) * 100}%, ${Ze(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function wn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ze(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function bt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const jn = (e) => () => e;
function uo(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function fo(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function po(e) {
  return (e = +e) == 1 ? ei : function(t, n) {
    return n - t ? fo(t, n, e) : jn(isNaN(t) ? n : t);
  };
}
function ei(e, t) {
  var n = t - e;
  return n ? uo(e, n) : jn(isNaN(e) ? t : e);
}
const vn = (function e(t) {
  var n = po(t);
  function i(s, o) {
    var r = n((s = Nt(s)).r, (o = Nt(o)).r), a = n(s.g, o.g), l = n(s.b, o.b), c = ei(s.opacity, o.opacity);
    return function(d) {
      return s.r = r(d), s.g = a(d), s.b = l(d), s.opacity = c(d), s + "";
    };
  }
  return i.gamma = e, i;
})(1);
function oe(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Ct = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, It = new RegExp(Ct.source, "g");
function mo(e) {
  return function() {
    return e;
  };
}
function go(e) {
  return function(t) {
    return e(t) + "";
  };
}
function _o(e, t) {
  var n = Ct.lastIndex = It.lastIndex = 0, i, s, o, r = -1, a = [], l = [];
  for (e = e + "", t = t + ""; (i = Ct.exec(e)) && (s = It.exec(t)); )
    (o = s.index) > n && (o = t.slice(n, o), a[r] ? a[r] += o : a[++r] = o), (i = i[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, l.push({ i: r, x: oe(i, s) })), n = It.lastIndex;
  return n < t.length && (o = t.slice(n), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? l[0] ? go(l[0].x) : mo(t) : (t = l.length, function(c) {
    for (var d = 0, h; d < t; ++d) a[(h = l[d]).i] = h.x(c);
    return a.join("");
  });
}
var xn = 180 / Math.PI, Pt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ti(e, t, n, i, s, o) {
  var r, a, l;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (l = e * n + t * i) && (n -= e * l, i -= t * l), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, l /= a), e * i < t * n && (e = -e, t = -t, l = -l, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * xn,
    skewX: Math.atan(l) * xn,
    scaleX: r,
    scaleY: a
  };
}
var Je;
function yo(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Pt : ti(t.a, t.b, t.c, t.d, t.e, t.f);
}
function wo(e) {
  return e == null || (Je || (Je = document.createElementNS("http://www.w3.org/2000/svg", "g")), Je.setAttribute("transform", e), !(e = Je.transform.baseVal.consolidate())) ? Pt : (e = e.matrix, ti(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ni(e, t, n, i) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, d, h, u, f, _) {
    if (c !== h || d !== u) {
      var m = f.push("translate(", null, t, null, n);
      _.push({ i: m - 4, x: oe(c, h) }, { i: m - 2, x: oe(d, u) });
    } else (h || u) && f.push("translate(" + h + t + u + n);
  }
  function r(c, d, h, u) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), u.push({ i: h.push(s(h) + "rotate(", null, i) - 2, x: oe(c, d) })) : d && h.push(s(h) + "rotate(" + d + i);
  }
  function a(c, d, h, u) {
    c !== d ? u.push({ i: h.push(s(h) + "skewX(", null, i) - 2, x: oe(c, d) }) : d && h.push(s(h) + "skewX(" + d + i);
  }
  function l(c, d, h, u, f, _) {
    if (c !== h || d !== u) {
      var m = f.push(s(f) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: oe(c, h) }, { i: m - 2, x: oe(d, u) });
    } else (h !== 1 || u !== 1) && f.push(s(f) + "scale(" + h + "," + u + ")");
  }
  return function(c, d) {
    var h = [], u = [];
    return c = e(c), d = e(d), o(c.translateX, c.translateY, d.translateX, d.translateY, h, u), r(c.rotate, d.rotate, h, u), a(c.skewX, d.skewX, h, u), l(c.scaleX, c.scaleY, d.scaleX, d.scaleY, h, u), c = d = null, function(f) {
      for (var _ = -1, m = u.length, v; ++_ < m; ) h[(v = u[_]).i] = v.x(f);
      return h.join("");
    };
  };
}
var vo = ni(yo, "px, ", "px)", "deg)"), xo = ni(wo, ", ", ")", ")"), $o = 1e-12;
function $n(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function bo(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Io(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Eo = (function e(t, n, i) {
  function s(o, r) {
    var a = o[0], l = o[1], c = o[2], d = r[0], h = r[1], u = r[2], f = d - a, _ = h - l, m = f * f + _ * _, v, y;
    if (m < $o)
      y = Math.log(u / c) / t, v = function(re) {
        return [
          a + re * f,
          l + re * _,
          c * Math.exp(t * re * y)
        ];
      };
    else {
      var N = Math.sqrt(m), $ = (u * u - c * c + i * m) / (2 * c * n * N), O = (u * u - c * c - i * m) / (2 * u * n * N), V = Math.log(Math.sqrt($ * $ + 1) - $), F = Math.log(Math.sqrt(O * O + 1) - O);
      y = (F - V) / t, v = function(re) {
        var Xe = re * y, Ye = $n(V), Ge = c / (n * N) * (Ye * Io(t * Xe + V) - bo(V));
        return [
          a + Ge * f,
          l + Ge * _,
          c * Ye / $n(t * Xe + V)
        ];
      };
    }
    return v.duration = y * 1e3 * t / Math.SQRT2, v;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, l = a * a;
    return e(r, a, l);
  }, s;
})(Math.SQRT2, 2, 4);
var Ie = 0, Ae = 0, ke = 0, ii = 1e3, ct, Te, ht = 0, _e = 0, mt = 0, Fe = typeof performance == "object" && performance.now ? performance : Date, si = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Gt() {
  return _e || (si(ko), _e = Fe.now() + mt);
}
function ko() {
  _e = 0;
}
function ut() {
  this._call = this._time = this._next = null;
}
ut.prototype = ri.prototype = {
  constructor: ut,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Gt() : +n) + (t == null ? 0 : +t), !this._next && Te !== this && (Te ? Te._next = this : ct = this, Te = this), this._call = e, this._time = n, Rt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Rt());
  }
};
function ri(e, t, n) {
  var i = new ut();
  return i.restart(e, t, n), i;
}
function So() {
  Gt(), ++Ie;
  for (var e = ct, t; e; )
    (t = _e - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ie;
}
function bn() {
  _e = (ht = Fe.now()) + mt, Ie = Ae = 0;
  try {
    So();
  } finally {
    Ie = 0, To(), _e = 0;
  }
}
function Ao() {
  var e = Fe.now(), t = e - ht;
  t > ii && (mt -= t, ht = e);
}
function To() {
  for (var e, t = ct, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ct = n);
  Te = e, Rt(i);
}
function Rt(e) {
  if (!Ie) {
    Ae && (Ae = clearTimeout(Ae));
    var t = e - _e;
    t > 24 ? (e < 1 / 0 && (Ae = setTimeout(bn, e - Fe.now() - mt)), ke && (ke = clearInterval(ke))) : (ke || (ht = Fe.now(), ke = setInterval(Ao, ii)), Ie = 1, si(bn));
  }
}
function In(e, t, n) {
  var i = new ut();
  return t = t == null ? 0 : +t, i.restart((s) => {
    i.stop(), e(s + t);
  }, t, n), i;
}
var Mo = Xt("start", "end", "cancel", "interrupt"), No = [], oi = 0, En = 1, Lt = 2, nt = 3, kn = 4, Ot = 5, it = 6;
function gt(e, t, n, i, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (n in r) return;
  Co(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Mo,
    tween: No,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: oi
  });
}
function Kt(e, t) {
  var n = Y(e, t);
  if (n.state > oi) throw new Error("too late; already scheduled");
  return n;
}
function J(e, t) {
  var n = Y(e, t);
  if (n.state > nt) throw new Error("too late; already running");
  return n;
}
function Y(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Co(e, t, n) {
  var i = e.__transition, s;
  i[t] = n, n.timer = ri(o, 0, n.time);
  function o(c) {
    n.state = En, n.timer.restart(r, n.delay, n.time), n.delay <= c && r(c - n.delay);
  }
  function r(c) {
    var d, h, u, f;
    if (n.state !== En) return l();
    for (d in i)
      if (f = i[d], f.name === n.name) {
        if (f.state === nt) return In(r);
        f.state === kn ? (f.state = it, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete i[d]) : +d < t && (f.state = it, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete i[d]);
      }
    if (In(function() {
      n.state === nt && (n.state = kn, n.timer.restart(a, n.delay, n.time), a(c));
    }), n.state = Lt, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Lt) {
      for (n.state = nt, s = new Array(u = n.tween.length), d = 0, h = -1; d < u; ++d)
        (f = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (s[++h] = f);
      s.length = h + 1;
    }
  }
  function a(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = Ot, 1), h = -1, u = s.length; ++h < u; )
      s[h].call(e, d);
    n.state === Ot && (n.on.call("end", e, e.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = it, n.timer.stop(), delete i[t];
    for (var c in i) return;
    delete e.__transition;
  }
}
function st(e, t) {
  var n = e.__transition, i, s, o = !0, r;
  if (n) {
    t = t == null ? null : t + "";
    for (r in n) {
      if ((i = n[r]).name !== t) {
        o = !1;
        continue;
      }
      s = i.state > Lt && i.state < Ot, i.state = it, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[r];
    }
    o && delete e.__transition;
  }
}
function Po(e) {
  return this.each(function() {
    st(this, e);
  });
}
function Ro(e, t) {
  var n, i;
  return function() {
    var s = J(this, e), o = s.tween;
    if (o !== n) {
      i = n = o;
      for (var r = 0, a = i.length; r < a; ++r)
        if (i[r].name === t) {
          i = i.slice(), i.splice(r, 1);
          break;
        }
    }
    s.tween = i;
  };
}
function Lo(e, t, n) {
  var i, s;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = J(this, e), r = o.tween;
    if (r !== i) {
      s = (i = r).slice();
      for (var a = { name: t, value: n }, l = 0, c = s.length; l < c; ++l)
        if (s[l].name === t) {
          s[l] = a;
          break;
        }
      l === c && s.push(a);
    }
    o.tween = s;
  };
}
function Oo(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = Y(this.node(), n).tween, s = 0, o = i.length, r; s < o; ++s)
      if ((r = i[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Ro : Lo)(n, e, t));
}
function Zt(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var s = J(this, i);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return Y(s, i).value[t];
  };
}
function ai(e, t) {
  var n;
  return (typeof t == "number" ? oe : t instanceof Ve ? vn : (n = Ve(t)) ? (t = n, vn) : _o)(e, t);
}
function Do(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function zo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Uo(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function Ho(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function Vo(e, t, n) {
  var i, s, o;
  return function() {
    var r, a = n(this), l;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), l = a + "", r === l ? null : r === i && l === s ? o : (s = l, o = t(i = r, a)));
  };
}
function Fo(e, t, n) {
  var i, s, o;
  return function() {
    var r, a = n(this), l;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), l = a + "", r === l ? null : r === i && l === s ? o : (s = l, o = t(i = r, a)));
  };
}
function Bo(e, t) {
  var n = pt(e), i = n === "transform" ? xo : ai;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Fo : Vo)(n, i, Zt(this, "attr." + e, t)) : t == null ? (n.local ? zo : Do)(n) : (n.local ? Ho : Uo)(n, i, t));
}
function qo(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Wo(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Xo(e, t) {
  var n, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Wo(e, o)), n;
  }
  return s._value = t, s;
}
function Yo(e, t) {
  var n, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && qo(e, o)), n;
  }
  return s._value = t, s;
}
function Go(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = pt(e);
  return this.tween(n, (i.local ? Xo : Yo)(i, t));
}
function Ko(e, t) {
  return function() {
    Kt(this, e).delay = +t.apply(this, arguments);
  };
}
function Zo(e, t) {
  return t = +t, function() {
    Kt(this, e).delay = t;
  };
}
function Jo(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ko : Zo)(t, e)) : Y(this.node(), t).delay;
}
function Qo(e, t) {
  return function() {
    J(this, e).duration = +t.apply(this, arguments);
  };
}
function jo(e, t) {
  return t = +t, function() {
    J(this, e).duration = t;
  };
}
function ea(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Qo : jo)(t, e)) : Y(this.node(), t).duration;
}
function ta(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    J(this, e).ease = t;
  };
}
function na(e) {
  var t = this._id;
  return arguments.length ? this.each(ta(t, e)) : Y(this.node(), t).ease;
}
function ia(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    J(this, e).ease = n;
  };
}
function sa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ia(this._id, e));
}
function ra(e) {
  typeof e != "function" && (e = Vn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new ne(i, this._parents, this._name, this._id);
}
function oa(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, s = n.length, o = Math.min(i, s), r = new Array(i), a = 0; a < o; ++a)
    for (var l = t[a], c = n[a], d = l.length, h = r[a] = new Array(d), u, f = 0; f < d; ++f)
      (u = l[f] || c[f]) && (h[f] = u);
  for (; a < i; ++a)
    r[a] = t[a];
  return new ne(r, this._parents, this._name, this._id);
}
function aa(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function da(e, t, n) {
  var i, s, o = aa(t) ? Kt : J;
  return function() {
    var r = o(this, e), a = r.on;
    a !== i && (s = (i = a).copy()).on(t, n), r.on = s;
  };
}
function la(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Y(this.node(), n).on.on(e) : this.each(da(n, e, t));
}
function ca(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function ha() {
  return this.on("end.remove", ca(this._id));
}
function ua(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = qt(e));
  for (var i = this._groups, s = i.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = i[r], l = a.length, c = o[r] = new Array(l), d, h, u = 0; u < l; ++u)
      (d = a[u]) && (h = e.call(d, d.__data__, u, a)) && ("__data__" in d && (h.__data__ = d.__data__), c[u] = h, gt(c[u], t, n, u, c, Y(d, n)));
  return new ne(o, this._parents, t, n);
}
function fa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Hn(e));
  for (var i = this._groups, s = i.length, o = [], r = [], a = 0; a < s; ++a)
    for (var l = i[a], c = l.length, d, h = 0; h < c; ++h)
      if (d = l[h]) {
        for (var u = e.call(d, d.__data__, h, l), f, _ = Y(d, n), m = 0, v = u.length; m < v; ++m)
          (f = u[m]) && gt(f, t, n, m, u, _);
        o.push(u), r.push(d);
      }
  return new ne(o, r, t, n);
}
var pa = qe.prototype.constructor;
function ma() {
  return new pa(this._groups, this._parents);
}
function ga(e, t) {
  var n, i, s;
  return function() {
    var o = be(this, e), r = (this.style.removeProperty(e), be(this, e));
    return o === r ? null : o === n && r === i ? s : s = t(n = o, i = r);
  };
}
function di(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function _a(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = be(this, e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function ya(e, t, n) {
  var i, s, o;
  return function() {
    var r = be(this, e), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(e), be(this, e))), r === l ? null : r === i && l === s ? o : (s = l, o = t(i = r, a));
  };
}
function wa(e, t) {
  var n, i, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var l = J(this, e), c = l.on, d = l.value[o] == null ? a || (a = di(t)) : void 0;
    (c !== n || s !== d) && (i = (n = c).copy()).on(r, s = d), l.on = i;
  };
}
function va(e, t, n) {
  var i = (e += "") == "transform" ? vo : ai;
  return t == null ? this.styleTween(e, ga(e, i)).on("end.style." + e, di(e)) : typeof t == "function" ? this.styleTween(e, ya(e, i, Zt(this, "style." + e, t))).each(wa(this._id, e)) : this.styleTween(e, _a(e, i, t), n).on("end.style." + e, null);
}
function xa(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function $a(e, t, n) {
  var i, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && xa(e, r, n)), i;
  }
  return o._value = t, o;
}
function ba(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, $a(e, t, n ?? ""));
}
function Ia(e) {
  return function() {
    this.textContent = e;
  };
}
function Ea(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function ka(e) {
  return this.tween("text", typeof e == "function" ? Ea(Zt(this, "text", e)) : Ia(e == null ? "" : e + ""));
}
function Sa(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Aa(e) {
  var t, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && Sa(s)), t;
  }
  return i._value = e, i;
}
function Ta(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Aa(e));
}
function Ma() {
  for (var e = this._name, t = this._id, n = li(), i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, l, c = 0; c < a; ++c)
      if (l = r[c]) {
        var d = Y(l, t);
        gt(l, e, n, c, r, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new ne(i, this._parents, e, n);
}
function Na() {
  var e, t, n = this, i = n._id, s = n.size();
  return new Promise(function(o, r) {
    var a = { value: r }, l = { value: function() {
      --s === 0 && o();
    } };
    n.each(function() {
      var c = J(this, i), d = c.on;
      d !== e && (t = (e = d).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var Ca = 0;
function ne(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function li() {
  return ++Ca;
}
var ee = qe.prototype;
ne.prototype = {
  constructor: ne,
  select: ua,
  selectAll: fa,
  selectChild: ee.selectChild,
  selectChildren: ee.selectChildren,
  filter: ra,
  merge: oa,
  selection: ma,
  transition: Ma,
  call: ee.call,
  nodes: ee.nodes,
  node: ee.node,
  size: ee.size,
  empty: ee.empty,
  each: ee.each,
  on: la,
  attr: Bo,
  attrTween: Go,
  style: va,
  styleTween: ba,
  text: ka,
  textTween: Ta,
  remove: ha,
  tween: Oo,
  delay: Jo,
  duration: ea,
  ease: na,
  easeVarying: sa,
  end: Na,
  [Symbol.iterator]: ee[Symbol.iterator]
};
function Pa(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ra = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Pa
};
function La(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Oa(e) {
  var t, n;
  e instanceof ne ? (t = e._id, e = e._name) : (t = li(), (n = Ra).time = Gt(), e = e == null ? null : e + "");
  for (var i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && gt(l, e, t, c, r, n || La(l, t));
  return new ne(i, this._parents, e, t);
}
qe.prototype.interrupt = Po;
qe.prototype.transition = Oa;
const Qe = (e) => () => e;
function Da(e, {
  sourceEvent: t,
  target: n,
  transform: i,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function te(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
te.prototype = {
  constructor: te,
  scale: function(e) {
    return e === 1 ? this : new te(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new te(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ce = new te(1, 0, 0);
te.prototype;
function Et(e) {
  e.stopImmediatePropagation();
}
function Se(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function za(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ua() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Sn() {
  return this.__zoom || Ce;
}
function Ha(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Va() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Fa(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], r = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function Ba() {
  var e = za, t = Ua, n = Fa, i = Ha, s = Va, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = Eo, c = Xt("start", "zoom", "end"), d, h, u, f = 500, _ = 150, m = 0, v = 10;
  function y(p) {
    p.property("__zoom", Sn).on("wheel.zoom", Xe, { passive: !1 }).on("mousedown.zoom", Ye).on("dblclick.zoom", Ge).filter(s).on("touchstart.zoom", ci).on("touchmove.zoom", hi).on("touchend.zoom touchcancel.zoom", ui).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(p, w, g, x) {
    var I = p.selection ? p.selection() : p;
    I.property("__zoom", Sn), p !== I ? V(p, w, g, x) : I.interrupt().each(function() {
      F(this, arguments).event(x).start().zoom(null, typeof w == "function" ? w.apply(this, arguments) : w).end();
    });
  }, y.scaleBy = function(p, w, g, x) {
    y.scaleTo(p, function() {
      var I = this.__zoom.k, E = typeof w == "function" ? w.apply(this, arguments) : w;
      return I * E;
    }, g, x);
  }, y.scaleTo = function(p, w, g, x) {
    y.transform(p, function() {
      var I = t.apply(this, arguments), E = this.__zoom, k = g == null ? O(I) : typeof g == "function" ? g.apply(this, arguments) : g, C = E.invert(k), P = typeof w == "function" ? w.apply(this, arguments) : w;
      return n($(N(E, P), k, C), I, r);
    }, g, x);
  }, y.translateBy = function(p, w, g, x) {
    y.transform(p, function() {
      return n(this.__zoom.translate(
        typeof w == "function" ? w.apply(this, arguments) : w,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), r);
    }, null, x);
  }, y.translateTo = function(p, w, g, x, I) {
    y.transform(p, function() {
      var E = t.apply(this, arguments), k = this.__zoom, C = x == null ? O(E) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(Ce.translate(C[0], C[1]).scale(k.k).translate(
        typeof w == "function" ? -w.apply(this, arguments) : -w,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), E, r);
    }, x, I);
  };
  function N(p, w) {
    return w = Math.max(o[0], Math.min(o[1], w)), w === p.k ? p : new te(w, p.x, p.y);
  }
  function $(p, w, g) {
    var x = w[0] - g[0] * p.k, I = w[1] - g[1] * p.k;
    return x === p.x && I === p.y ? p : new te(p.k, x, I);
  }
  function O(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function V(p, w, g, x) {
    p.on("start.zoom", function() {
      F(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      F(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var I = this, E = arguments, k = F(I, E).event(x), C = t.apply(I, E), P = g == null ? O(C) : typeof g == "function" ? g.apply(I, E) : g, G = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), D = I.__zoom, B = typeof w == "function" ? w.apply(I, E) : w, Q = l(D.invert(P).concat(G / D.k), B.invert(P).concat(G / B.k));
      return function(q) {
        if (q === 1) q = B;
        else {
          var j = Q(q), _t = G / j[2];
          q = new te(_t, P[0] - j[0] * _t, P[1] - j[1] * _t);
        }
        k.zoom(null, q);
      };
    });
  }
  function F(p, w, g) {
    return !g && p.__zooming || new re(p, w);
  }
  function re(p, w) {
    this.that = p, this.args = w, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, w), this.taps = 0;
  }
  re.prototype = {
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
      var w = K(this.that).datum();
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
  function Xe(p, ...w) {
    if (!e.apply(this, arguments)) return;
    var g = F(this, w).event(p), x = this.__zoom, I = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, i.apply(this, arguments)))), E = ce(p);
    if (g.wheel)
      (g.mouse[0][0] !== E[0] || g.mouse[0][1] !== E[1]) && (g.mouse[1] = x.invert(g.mouse[0] = E)), clearTimeout(g.wheel);
    else {
      if (x.k === I) return;
      g.mouse = [E, x.invert(E)], st(this), g.start();
    }
    Se(p), g.wheel = setTimeout(k, _), g.zoom("mouse", n($(N(x, I), g.mouse[0], g.mouse[1]), g.extent, r));
    function k() {
      g.wheel = null, g.end();
    }
  }
  function Ye(p, ...w) {
    if (u || !e.apply(this, arguments)) return;
    var g = p.currentTarget, x = F(this, w, !0).event(p), I = K(p.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", G, !0), E = ce(p, g), k = p.clientX, C = p.clientY;
    Jr(p.view), Et(p), x.mouse = [E, this.__zoom.invert(E)], st(this), x.start();
    function P(D) {
      if (Se(D), !x.moved) {
        var B = D.clientX - k, Q = D.clientY - C;
        x.moved = B * B + Q * Q > m;
      }
      x.event(D).zoom("mouse", n($(x.that.__zoom, x.mouse[0] = ce(D, g), x.mouse[1]), x.extent, r));
    }
    function G(D) {
      I.on("mousemove.zoom mouseup.zoom", null), Qr(D.view, x.moved), Se(D), x.event(D).end();
    }
  }
  function Ge(p, ...w) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, x = ce(p.changedTouches ? p.changedTouches[0] : p, this), I = g.invert(x), E = g.k * (p.shiftKey ? 0.5 : 2), k = n($(N(g, E), x, I), t.apply(this, w), r);
      Se(p), a > 0 ? K(this).transition().duration(a).call(V, k, x, p) : K(this).call(y.transform, k, x, p);
    }
  }
  function ci(p, ...w) {
    if (e.apply(this, arguments)) {
      var g = p.touches, x = g.length, I = F(this, w, p.changedTouches.length === x).event(p), E, k, C, P;
      for (Et(p), k = 0; k < x; ++k)
        C = g[k], P = ce(C, this), P = [P, this.__zoom.invert(P), C.identifier], I.touch0 ? !I.touch1 && I.touch0[2] !== P[2] && (I.touch1 = P, I.taps = 0) : (I.touch0 = P, E = !0, I.taps = 1 + !!d);
      d && (d = clearTimeout(d)), E && (I.taps < 2 && (h = P[0], d = setTimeout(function() {
        d = null;
      }, f)), st(this), I.start());
    }
  }
  function hi(p, ...w) {
    if (this.__zooming) {
      var g = F(this, w).event(p), x = p.changedTouches, I = x.length, E, k, C, P;
      for (Se(p), E = 0; E < I; ++E)
        k = x[E], C = ce(k, this), g.touch0 && g.touch0[2] === k.identifier ? g.touch0[0] = C : g.touch1 && g.touch1[2] === k.identifier && (g.touch1[0] = C);
      if (k = g.that.__zoom, g.touch1) {
        var G = g.touch0[0], D = g.touch0[1], B = g.touch1[0], Q = g.touch1[1], q = (q = B[0] - G[0]) * q + (q = B[1] - G[1]) * q, j = (j = Q[0] - D[0]) * j + (j = Q[1] - D[1]) * j;
        k = N(k, Math.sqrt(q / j)), C = [(G[0] + B[0]) / 2, (G[1] + B[1]) / 2], P = [(D[0] + Q[0]) / 2, (D[1] + Q[1]) / 2];
      } else if (g.touch0) C = g.touch0[0], P = g.touch0[1];
      else return;
      g.zoom("touch", n($(k, C, P), g.extent, r));
    }
  }
  function ui(p, ...w) {
    if (this.__zooming) {
      var g = F(this, w).event(p), x = p.changedTouches, I = x.length, E, k;
      for (Et(p), u && clearTimeout(u), u = setTimeout(function() {
        u = null;
      }, f), E = 0; E < I; ++E)
        k = x[E], g.touch0 && g.touch0[2] === k.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === k.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (k = ce(k, this), Math.hypot(h[0] - k[0], h[1] - k[1]) < v)) {
        var C = K(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : Qe(+p), y) : i;
  }, y.filter = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Qe(!!p), y) : e;
  }, y.touchable = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : Qe(!!p), y) : s;
  }, y.extent = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Qe([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), y) : t;
  }, y.scaleExtent = function(p) {
    return arguments.length ? (o[0] = +p[0], o[1] = +p[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(p) {
    return arguments.length ? (r[0][0] = +p[0][0], r[1][0] = +p[1][0], r[0][1] = +p[0][1], r[1][1] = +p[1][1], y) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, y.constrain = function(p) {
    return arguments.length ? (n = p, y) : n;
  }, y.duration = function(p) {
    return arguments.length ? (a = +p, y) : a;
  }, y.interpolate = function(p) {
    return arguments.length ? (l = p, y) : l;
  }, y.on = function() {
    var p = c.on.apply(c, arguments);
    return p === c ? y : p;
  }, y.clickDistance = function(p) {
    return arguments.length ? (m = (p = +p) * p, y) : Math.sqrt(m);
  }, y.tapDistance = function(p) {
    return arguments.length ? (v = +p, y) : v;
  }, y;
}
var qa = Object.defineProperty, Wa = Object.getOwnPropertyDescriptor, z = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Wa(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && qa(t, n, s), s;
};
function Xa(e, t, n, i) {
  const s = t.x - e.x, o = t.y - e.y, r = i.x - n.x, a = i.y - n.y, l = s * a - o * r;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((n.x - e.x) * a - (n.y - e.y) * r) / l, d = ((n.x - e.x) * o - (n.y - e.y) * s) / l;
  return c <= 0.02 || c >= 0.98 || d <= 0.02 || d >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function Ya(e, t, n) {
  const i = n.x - t.x, s = n.y - t.y, o = i * i + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * s) / o)), a = t.x + r * i, l = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - l), t: r };
}
function Ga(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, l = (r.x - o.x) / a, c = (r.y - o.y) / a, d = t.map(([u, f]) => Xa(o, r, u, f)).filter((u) => u !== null).filter((u) => u.t * a > n + 2 && (1 - u.t) * a > n + 2).sort((u, f) => u.t - f.t);
    let h = -1 / 0;
    for (const u of d)
      u.t * a - n <= h + 2 || (i += ` L ${u.x - l * n} ${u.y - c * n}`, i += ` A ${n} ${n} 0 0 1 ${u.x + l * n} ${u.y + c * n}`, h = u.t * a + n);
    i += ` L ${r.x} ${r.y}`;
  }
  return i;
}
const je = {
  component: S`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: S`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: S`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: S`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: S`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: S`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: S`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: S`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: S`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  usecase: S`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: S`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let L = class extends pe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ce, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
      e.key === " " && (this._spaceDown = !1);
    }, this._onBlur = () => {
      this._spaceDown = !1;
    }, this._onKeyDown = (e) => {
      if (!this._editingId) {
        if (e.key === " ") {
          e.preventDefault(), this._spaceDown = !0;
          return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          e.preventDefault(), this.emit(e.shiftKey ? "redo-requested" : "undo-requested");
          return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
          e.preventDefault(), this.emit("redo-requested");
          return;
        }
        if (e.key === "F2" && this.selectedId) {
          const t = this.scene.nodes.find((n) => n.id === this.selectedId);
          t && (e.preventDefault(), this._editingId = t.id);
          return;
        }
        if (e.key === "Delete" || e.key === "Backspace") {
          if (this._selectedWaypoint) {
            const s = this.scene.edges.find((o) => o.id === this._selectedWaypoint.edgeId);
            s && (e.preventDefault(), this.removeWaypoint(s, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((s) => s.id === this.selectedId), n = this.scene.nodes.find((s) => s.id === this.selectedId);
          if (n != null && n.parentId && !t && n.kind !== "domain-event" && n.kind !== "read-model" && n.kind !== "domain-service")
            return;
          const i = t ?? n;
          i && (e.preventDefault(), this.emit("delete-requested", {
            elementType: t ? "edge" : "node",
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
  commitRename(e, t) {
    if (this._editingId !== e.id) return;
    this._editingId = null;
    const n = t.trim();
    n && n !== e.label && this.emit("node-renamed", { id: e.id, kind: e.kind, name: n });
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector("svg.main");
    this._zoomBehavior = Ba().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), K(e).call(this._zoomBehavior);
  }
  willUpdate(e) {
    var t;
    if (e.has("scene") && (this._dragPos = null), this._selectedWaypoint && (e.has("selectedId") || e.has("edgePoints"))) {
      const n = this._selectedWaypoint;
      this.selectedId === n.edgeId && n.index < (((t = this.edgePoints[n.edgeId]) == null ? void 0 : t.length) ?? 0) || (this._selectedWaypoint = null);
    }
  }
  updated() {
    var e;
    if (!this._fitted && this.scene.nodes.length > 0 && this._zoomBehavior && (this._fitted = !0, this.fit()), this._editingId) {
      const t = this.renderRoot.querySelector("foreignObject input");
      t && ((e = this.shadowRoot) == null ? void 0 : e.activeElement) !== t && (t.focus(), t.select());
    }
  }
  /** Center and scale the viewport so the whole scene is visible. */
  fit(e = 60) {
    const t = this.scene.nodes, n = this.renderRoot.querySelector("svg.main");
    if (!t.length || !n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return;
    const s = Math.min(...t.map((d) => d.x - d.w / 2)) - e, o = Math.max(...t.map((d) => d.x + d.w / 2)) + e, r = Math.min(...t.map((d) => d.y - d.h / 2)) - e, a = Math.max(...t.map((d) => d.y + d.h / 2)) + e, l = Math.max(0.15, Math.min(i.width / (o - s), i.height / (a - r), 1.25)), c = Ce.translate(i.width / 2 - l * (s + o) / 2, i.height / 2 - l * (r + a) / 2).scale(l);
    K(n).call(this._zoomBehavior.transform, c);
  }
  /** Client coordinates → scene coordinates (undo pan/zoom). */
  toScene(e) {
    const t = this.getBoundingClientRect();
    return {
      x: (e.clientX - t.left - this._t.x) / this._t.k,
      y: (e.clientY - t.top - this._t.y) / this._t.k
    };
  }
  nodePos(e) {
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    if (e.parentId && this._dragPos && this._dragPos.id === e.parentId) {
      const t = this.scene.nodes.find((n) => n.id === e.parentId);
      if (t)
        return { x: e.x + (this._dragPos.x - t.x), y: e.y + (this._dragPos.y - t.y) };
    }
    return { x: e.x, y: e.y };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ---- node dragging ------------------------------------------------------
  /** Keep a dragged child inside its container's inner area (below the header). */
  clampToParent(e, t, n) {
    if (e.parentId) {
      const i = this.scene.nodes.find((s) => s.id === e.parentId);
      if (i) {
        const s = this.nodePos(i), o = s.x - i.w / 2 + 10 + e.w / 2, r = s.x + i.w / 2 - 10 - e.w / 2, a = s.y - i.h / 2 + 34 + e.h / 2, l = s.y + i.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), r), n = Math.min(Math.max(n, a), l);
      }
    }
    return { id: e.id, x: t, y: n };
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const n = this.toScene(e), i = this.nodePos(t);
    let s = !1;
    const o = (a) => {
      const l = this.toScene(a), c = l.x - n.x, d = l.y - n.y;
      !s && Math.hypot(c, d) < 3 / this._t.k || (s = !0, this._dragPos = this.clampToParent(t, i.x + c, i.y + d));
    }, r = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", r), s && this._dragPos ? this.emit("node-moved", { id: t.id, x: this._dragPos.x, y: this._dragPos.y }) : e.shiftKey ? this.emit("element-multi-toggled", { id: t.id, kind: t.kind }) : this.emit("element-selected", { elementType: "node", id: t.id, kind: t.kind });
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
  onResizePointerDown(e, t, n, i) {
    if (e.button !== 0) return;
    e.stopPropagation(), this.focus();
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((m) => m.parentId === t.id), l = Math.min(...a.map((m) => m.x - m.w / 2)), c = Math.max(...a.map((m) => m.x + m.w / 2)), d = Math.min(...a.map((m) => m.y - m.h / 2)), h = Math.max(...a.map((m) => m.y + m.h / 2)), u = fi(
      a.map((m) => ({ dx: m.x - r.x, dy: m.y - r.y, w: m.w, h: m.h })),
      { w: s, h: o }
    ), f = (m) => {
      const v = this.toScene(m);
      if (m.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(u.w, 2 * Math.abs(v.x - r.x)),
          h: Math.max(u.h, 2 * Math.abs(v.y - r.y))
        };
        return;
      }
      const y = r.x - n * r.w / 2, N = r.y - i * r.h / 2, $ = n > 0 ? Math.max(v.x, y + s, a.length ? c + 10 : -1 / 0) : Math.min(v.x, y - s, a.length ? l - 10 : 1 / 0), O = i > 0 ? Math.max(v.y, N + o, a.length ? h + 10 : -1 / 0) : Math.min(v.y, N - o, a.length ? d - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (y + $) / 2,
        y: (N + O) / 2,
        w: Math.abs($ - y),
        h: Math.abs(O - N)
      };
    }, _ = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", _), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", _);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const i = (o) => {
      var c;
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y };
      const a = (c = this.shadowRoot) == null ? void 0 : c.elementFromPoint(o.clientX, o.clientY), l = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = l ? l.getAttribute("data-node-id") : null;
    }, s = (o) => {
      var l, c;
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s);
      const r = (l = this.shadowRoot) == null ? void 0 : l.elementFromPoint(o.clientX, o.clientY), a = (c = r == null ? void 0 : r.closest("[data-node-id]")) == null ? void 0 : c.getAttribute("data-node-id");
      a && a !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: a,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, n) {
    const { x: i, y: s } = this.nodePos(e), o = t - i, r = n - s, a = e.w / 2, l = e.h / 2;
    if (o === 0 && r === 0) return { x: i, y: s };
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / l);
    return { x: i + o * c, y: s + r * c };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(e) {
    const t = [e.sourceId, e.targetId].sort().join("|"), n = this.scene.edges.filter(
      (s) => [s.sourceId, s.targetId].sort().join("|") === t
    );
    return n.length < 2 ? 0 : (n.findIndex((s) => s.id === e.id) - (n.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(e) {
    const t = this.scene.nodes.find((d) => d.id === e.sourceId), n = this.scene.nodes.find((d) => d.id === e.targetId);
    if (!t || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(n), r = i[0] ?? o, a = i[i.length - 1] ?? s;
    let l = this.borderPoint(t, r.x, r.y), c = this.borderPoint(n, a.x, a.y);
    if (!i.length) {
      const d = this.edgeOffset(e);
      if (d !== 0) {
        const h = Math.hypot(c.x - l.x, c.y - l.y) || 1, u = -(c.y - l.y) / h * d, f = (c.x - l.x) / h * d;
        l = { x: l.x + u, y: l.y + f }, c = { x: c.x + u, y: c.y + f };
      }
    }
    return [l, ...i, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, n) {
    this._wpDrag = { edgeId: e.id, points: t, index: n };
    let i = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      i = !0;
      const a = this.toScene(r), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: l };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && i && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < e.length - 1; i++) {
      const { dist: s } = Ya(t, e[i], e[i + 1]);
      s < n.dist && (n = { seg: i, dist: s });
    }
    return n.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, n) {
    const i = this.nearestSegment(t, n), s = [...this.edgePoints[e.id] ?? []];
    s.splice(i, 0, n), this._selectedWaypoint = { edgeId: e.id, index: i }, this.emit("edge-points-changed", { id: e.id, points: s });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, n) {
    if (e.button !== 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const i = this.toScene(e), s = this.nearestSegment(n, i);
    let o = !1;
    const r = (l) => {
      const c = this.toScene(l);
      if (o) {
        if (this._wpDrag) {
          const d = [...this._wpDrag.points];
          d[s] = c, this._wpDrag = { ...this._wpDrag, points: d };
        }
      } else {
        if (Math.hypot(c.x - i.x, c.y - i.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const d = [...this.edgePoints[t.id] ?? []];
        d.splice(s, 0, c), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: d, index: s };
      }
    }, a = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", a), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", a);
  }
  removeWaypoint(e, t) {
    const n = [...this.edgePoints[e.id] ?? []];
    n.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: n });
  }
  renderEdge(e, t, n) {
    const i = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), a = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, l = t.slice(1, -1), c = t.map((d) => `${d.x},${d.y}`).join(" ");
    return S`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${c}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(d) => {
      d.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(d) => {
      d.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(d));
    }}
              @pointerdown=${(d) => this.onEdgeHitPointerDown(d, e, t)}>
          ${e.tooltip ? S`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${Ga(t, n)}
              fill="none"
              stroke=${i} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${e.label ? S`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${i}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(d) => {
      d.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(d) => {
      d.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: d.clientX,
        y: d.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${s ? l.map((d, h) => {
      var f;
      const u = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === h;
      return S`
                <circle data-waypoint cx=${d.x} cy=${d.y} r=${u ? 6 : 5}
                        fill=${u ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(_) => {
        _.button === 0 && (_.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: h }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], h));
      }}
                        @dblclick=${(_) => {
        _.stopPropagation(), this.removeWaypoint(e, h);
      }}>
                  <title>Arrastra para ajustar · Supr o doble click para quitar el punto</title>
                </circle>`;
    }) : ""}
      </g>
    `;
  }
  markerId(e) {
    return e.replace(/[^a-zA-Z0-9]/g, "");
  }
  renderNode(e) {
    var u, f;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((u = this._resize) == null ? void 0 : u.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = a / 2, d = l / 2, h = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return S`
      <g data-node-id=${e.id} transform="translate(${t}, ${n})"
         @pointerdown=${(_) => this.onNodePointerDown(_, e)}
         @dblclick=${(_) => {
      _.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        <rect x=${-c} y=${-d} width=${a} height=${l} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? S`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? S`<text x=${-c} y=${-d - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && je[e.symbol] && !r ? S`<g transform="translate(${c - 17}, ${-d + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${je[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && je[e.symbol] ? S`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${je[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? S`
              <foreignObject x=${-c + 6} y=${o ? -d + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(_) => _.stopPropagation()}
                  @keydown=${(_) => {
      _.stopPropagation(), _.key === "Enter" && this.commitRename(e, _.target.value), _.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(_) => this.commitRename(e, _.target.value)}
                />
              </foreignObject>` : r ? S`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? S`<text x=${-c + 12} y=${-d + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : S`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? S`<line x1=${-c + 8} y1=${-d + 28} x2=${c - 8} y2=${-d + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (!r || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "domain-event") ? [
      [c, 0],
      [-c, 0],
      [0, d],
      [0, -d]
    ].map(
      ([_, m]) => S`
                <circle data-handle cx=${_} cy=${m} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${r ? e.kind === "domain-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : "Arrastra hasta un evento de dominio para declarar que lo emite" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([_, m]) => S`
                <rect data-resize x=${_ * c - 6.5} y=${m * d - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${_ * m > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, _, m)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return S``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!e) return S``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return S`
      <line x1=${t.x} y1=${t.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let n = !1;
    const i = (o) => {
      const r = this.toScene(o);
      !n && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (n = !0, this._rubber = { a: t, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s), n && this._rubber) {
        const { a: o, b: r } = this._rubber, a = Math.min(o.x, r.x), l = Math.max(o.x, r.x), c = Math.min(o.y, r.y), d = Math.max(o.y, r.y), h = this.scene.nodes.filter((u) => {
          const f = this.nodePos(u);
          return f.x >= a && f.x <= l && f.y >= c && f.y <= d;
        }).map((u) => u.id);
        this.emit("nodes-boxed", { ids: h });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return S``;
    const { a: e, b: t } = this._rubber;
    return S`
      <rect x=${Math.min(e.x, t.x)} y=${Math.min(e.y, t.y)}
            width=${Math.abs(t.x - e.x)} height=${Math.abs(t.y - e.y)}
            fill="rgba(37, 99, 235, 0.06)" stroke="#2563eb" stroke-width="1"
            stroke-dasharray="4 3" pointer-events="none"></rect>
    `;
  }
  // ---- minimap -------------------------------------------------------------
  sceneBounds(e = 40) {
    const t = this.scene.nodes;
    if (!t.length) return null;
    const n = Math.min(...t.map((r) => r.x - r.w / 2)) - e, i = Math.max(...t.map((r) => r.x + r.w / 2)) + e, s = Math.min(...t.map((r) => r.y - r.h / 2)) - e, o = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: n, minY: s, w: i - n, h: o - s };
  }
  centerViewportOn(e, t) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), s = this._t.k, o = Ce.translate(i.width / 2 - s * e, i.height / 2 - s * t).scale(s);
    K(n).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - i.left) / n, o = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, l = s.height / this._t.k;
    return A`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(c) => {
      c.stopPropagation();
      try {
        c.currentTarget.setPointerCapture(c.pointerId);
      } catch {
      }
      this.onMinimapPointer(c, e, i);
    }}
        @pointermove=${(c) => {
      var d, h;
      (h = (d = c.currentTarget).hasPointerCapture) != null && h.call(d, c.pointerId) && this.onMinimapPointer(c, e, i);
    }}
      >
        <svg viewBox="0 0 ${t} ${n}">
          ${this.scene.nodes.map((c) => {
      const d = this.nodePos(c);
      return S`<rect
              x=${(d.x - c.w / 2 - e.minX) * i}
              y=${(d.y - c.h / 2 - e.minY) * i}
              width=${Math.max(2, c.w * i)}
              height=${Math.max(2, c.h * i)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * i}
            y=${(r - e.minY) * i}
            width=${a * i}
            height=${l * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((r) => r.color ?? "#64748b"))], t = [], n = this.scene.edges.map((r) => {
      const a = this.edgePolyline(r);
      if (!a) return S``;
      const l = this.renderEdge(r, a, [...t]);
      for (let c = 0; c < a.length - 1; c++) t.push([a[c], a[c + 1]]);
      return l;
    }), i = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (i.has(r.sourceId) || i.has(r.targetId) ? o : s).push(
        n[a]
      );
    }), A`
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
          ${e.map(
      (r) => S`
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
L.styles = Ht`
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
z([
  se({ attribute: !1 })
], L.prototype, "scene", 2);
z([
  se({ attribute: !1 })
], L.prototype, "selectedId", 2);
z([
  se({ attribute: !1 })
], L.prototype, "selectedIds", 2);
z([
  se({ type: Boolean })
], L.prototype, "connectable", 2);
z([
  se({ attribute: !1 })
], L.prototype, "edgePoints", 2);
z([
  b()
], L.prototype, "_t", 2);
z([
  b()
], L.prototype, "_dragPos", 2);
z([
  b()
], L.prototype, "_pendingLink", 2);
z([
  b()
], L.prototype, "_hoverNodeId", 2);
z([
  b()
], L.prototype, "_editingId", 2);
z([
  b()
], L.prototype, "_spaceDown", 2);
z([
  b()
], L.prototype, "_wpDrag", 2);
z([
  b()
], L.prototype, "_selectedWaypoint", 2);
z([
  b()
], L.prototype, "_resize", 2);
z([
  b()
], L.prototype, "_rubber", 2);
L = z([
  Bt("modux-canvas")
], L);
async function Ka(e, t) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), i = new n(), o = {
    id: "root",
    layoutOptions: t === "layered" ? {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.spacing.nodeNode": "45",
      "elk.layered.spacing.nodeNodeBetweenLayers": "90"
    } : {
      "elk.algorithm": "force",
      "elk.spacing.nodeNode": "70",
      "elk.force.iterations": "400"
    },
    children: e.nodes.map((l) => ({ id: l.id, width: l.w, height: l.h })),
    edges: e.edges.map((l) => ({ id: l.id, sources: [l.sourceId], targets: [l.targetId] }))
  }, r = await i.layout(o), a = {};
  for (const l of r.children ?? [])
    a[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return a;
}
var Za = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, M = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ja(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && Za(t, n, s), s;
};
const Dt = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Qa = Object.keys(Dt), ja = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 }
], ed = ["CORE", "SUPPORTING", "GENERIC"], W = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function td(e, t) {
  switch (t) {
    case "module":
      return { elementType: "module", id: e.replace(/^tgt:/, "") };
    case "aggregate":
      return { elementType: "aggregate", id: e };
    case "use-case":
      return { elementType: "use-case", id: e };
    case "entity":
      return { elementType: "entity", id: e };
    case "flow":
      return { elementType: "flow", id: e.replace(/^flow:/, "") };
    case "process":
      return { elementType: "process", id: e };
    default:
      return null;
  }
}
function nd(e, t) {
  const n = (e ?? []).find((i) => i.steps.some((s) => s.id === t));
  return n ? { elementType: "process", id: n.id } : null;
}
let T = class extends pe {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._multi = [], this._newViewName = "", this._activeViewId = "";
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  command(e, t = !0) {
    if (t) {
      const n = this.inverseOf(e);
      n && this.pushUndoEntry(n);
    }
    this.emit("modux-command", { command: e });
  }
  viewLayout(e) {
    return mi(this.layout[e]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [e]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = this.viewLayout("context-map").detail;
      (t === "contexts" || t === "detail") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    this._detail = e, this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: e });
  }
  pushUndoEntry(e) {
    this._undoStack = [...this._undoStack.slice(-19), e], this._redoStack = [];
  }
  /** Inverses of an operation list, computed against the current state, in reverse order. */
  inversesOf(e) {
    return [...e].reverse().flatMap((t) => {
      var n;
      return t.kind === "move-node" ? [
        {
          kind: "move-node",
          view: t.view,
          id: t.id,
          pos: this.viewLayout(t.view).nodes[t.id] ?? null
        }
      ] : t.kind === "set-edge-points" ? [
        {
          kind: "set-edge-points",
          view: t.view,
          id: t.id,
          points: this.viewLayout(t.view).edges[t.id] ?? null
        }
      ] : t.kind === "resize-node" ? [
        {
          kind: "resize-node",
          view: t.view,
          id: t.id,
          size: ((n = this.viewLayout(t.view).sizes) == null ? void 0 : n[t.id]) ?? null
        }
      ] : this.inverseOf(t) ?? [];
    });
  }
  applyOps(e) {
    for (const t of e)
      if (t.kind === "move-node") {
        const n = this.viewLayout(t.view), i = { ...n.nodes };
        t.pos ? i[t.id] = t.pos : delete i[t.id], this.writeViewLayout(t.view, { ...n, nodes: i });
      } else if (t.kind === "set-edge-points") {
        const n = this.viewLayout(t.view), i = { ...n.edges };
        t.points && t.points.length ? i[t.id] = t.points : delete i[t.id], this.writeViewLayout(t.view, { ...n, edges: i });
      } else if (t.kind === "resize-node") {
        const n = this.viewLayout(t.view), i = { ...n.sizes ?? {} };
        t.size ? i[t.id] = t.size : delete i[t.id], this.writeViewLayout(t.view, { ...n, sizes: i });
      } else
        this.command(t, !1);
  }
  /**
   * Inverse commands computed against the CURRENT model (before the command is
   * applied) — what Ctrl+Z replays. Composite where needed (e.g. removing a
   * module also drops its relations, so its inverse restores them).
   */
  inverseOf(e) {
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const t = this.model.relations.find(
          (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
        );
        return t ? [{ kind: "add-relation", sourceId: t.sourceId, targetId: t.targetId, type: t.type }] : null;
      }
      case "set-relation-type": {
        const t = this.model.relations.find(
          (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
        );
        return t ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: t.type }] : null;
      }
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const t = this.model.modules.find((i) => i.id === e.id);
        if (!t) return null;
        const n = this.model.relations.filter(
          (i) => i.sourceId === e.id || i.targetId === e.id
        );
        return [
          { kind: "add-module", id: t.id, name: t.name, subdomainType: t.subdomainType ?? "GENERIC" },
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
        return [{ kind: "remove-aggregate", id: e.id }];
      case "remove-aggregate": {
        const t = (this.model.aggregates ?? []).find((n) => n.id === e.id);
        return t ? [{ kind: "add-aggregate", id: t.id, name: t.name, moduleId: t.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-emission":
        return [{ kind: "remove-emission", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-emission":
        return [{ kind: "add-emission", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const t of this.model.modules) {
          const n = (t.domainServices ?? []).find((i) => i.id === e.id);
          if (n) return [{ kind: "add-domain-service", id: n.id, name: n.name, moduleId: t.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "remove-read-model": {
        for (const t of this.model.modules) {
          const n = (t.readModels ?? []).find((i) => i.id === e.id);
          if (n != null && n.aggregateId)
            return [{ kind: "add-read-model", id: n.id, name: n.name, aggregateId: n.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const t of this.model.modules) {
          const n = (t.domainEvents ?? []).find((i) => i.id === e.id);
          if (n) return [{ kind: "add-domain-event", id: n.id, name: n.name, moduleId: t.id }];
        }
        return null;
      }
      case "rename-element": {
        const n = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((i) => i.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((i) => i.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((i) => i.domainServices ?? []) : this.model.entities ?? []).find((i) => i.id === e.id);
        return n ? [{ kind: "rename-element", type: e.type, id: e.id, name: n.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const t = this.model.flows.find((n) => n.id === e.id);
        return t ? [
          {
            kind: "add-flow",
            id: t.id,
            name: t.name,
            archetype: t.archetype,
            triggerAggregateId: t.triggerAggregateId ?? "",
            triggerEvent: t.triggerEvent ?? "",
            targetId: t.targetId,
            readModelName: t.readModelName,
            targetUseCaseId: t.targetUseCaseId
          }
        ] : null;
      }
      case "add-view":
        return [{ kind: "remove-view", id: e.id }];
      case "remove-view": {
        const t = (this.model.views ?? []).find((n) => n.id === e.id);
        return t ? [{ kind: "add-view", id: t.id, name: t.name, memberIds: t.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const t = (this.model.processes ?? []).find((s) => s.id === e.processId), n = (t == null ? void 0 : t.steps.findIndex((s) => s.id === e.id)) ?? -1;
        if (!t || n < 0) return null;
        const i = t.steps[n];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: i.id,
            name: i.name,
            stepType: i.type,
            roleId: i.roleId,
            deadline: i.deadline,
            useCaseId: i.useCaseId,
            compensationUseCaseId: i.compensationUseCaseId,
            afterStepId: n > 0 ? t.steps[n - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const t = (this.model.processes ?? []).find((i) => i.id === e.processId), n = (t == null ? void 0 : t.steps.findIndex((i) => i.id === e.id)) ?? -1;
        return !t || n < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: n > 0 ? t.steps[n - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const t = (this.model.processes ?? []).find((i) => i.id === e.processId), n = t == null ? void 0 : t.steps.find((i) => i.id === e.id);
        return n ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: n.roleId,
            deadline: n.deadline,
            compensationUseCaseId: n.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const t = (this.model.processes ?? []).find((n) => n.id === e.id);
        return t ? [
          {
            kind: "add-process",
            id: t.id,
            name: t.name,
            moduleId: t.ownerModuleId ?? "",
            triggerAggregateId: t.triggerAggregateId,
            triggerEvent: t.triggerEvent,
            steps: t.steps
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
    const e = this._undoStack[this._undoStack.length - 1];
    e && (this._undoStack = this._undoStack.slice(0, -1), this._redoStack = [...this._redoStack.slice(-19), this.inversesOf(e)], this.applyOps(e));
  }
  redo() {
    const e = this._redoStack[this._redoStack.length - 1];
    e && (this._redoStack = this._redoStack.slice(0, -1), this._undoStack = [...this._undoStack.slice(-19), this.inversesOf(e)], this.applyOps(e));
  }
  onNodeMoved(e) {
    const { id: t, x: n, y: i } = e.detail, s = this._view, o = this.viewLayout(s), r = o.nodes[t] ?? null;
    let a = { x: n, y: i };
    const l = this.sceneFor(s), c = l.nodes.find((h) => h.id === t);
    if (c != null && c.parentId) {
      const h = l.nodes.find((u) => u.id === c.parentId);
      h && (a = { x: n - h.x, y: i - h.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const d = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const u = this.inverseOf(h);
        u && d.unshift(...u), this.command(h, !1);
      }
    }
    this.pushUndoEntry(d);
  }
  onNodeResized(e) {
    var d;
    const { id: t, x: n, y: i, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), l = this.sceneFor(r).nodes.filter((h) => h.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((d = a.sizes) == null ? void 0 : d[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...l.map((h) => ({ kind: "move-node", view: r, id: h.id, pos: a.nodes[h.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: n, y: i } };
    for (const h of l) c[h.id] = { x: h.x - n, y: h.y - i };
    this.writeViewLayout(r, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [t]: { w: s, h: o } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: n } = e.detail, i = this._view, s = this.viewLayout(i);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: i, id: t, points: s.edges[t] ?? null }
    ]);
    const o = { ...s.edges };
    n.length ? o[t] = n : delete o[t], this.writeViewLayout(i, { ...s, edges: o });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const n = Jt(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
      (r, a) => (i.get(r.id) ?? 0) - (i.get(a.id) ?? 0)
    );
    if (s.every((r, a) => r.id === t.steps[a].id)) return null;
    const o = s.findIndex((r) => r.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: o > 0 ? s[o - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: n, x: i, y: s } = e.detail;
    if (this._view !== "context-map") return;
    const o = new Set(
      this.model.modules.flatMap((d) => (d.domainEvents ?? []).map((h) => h.id))
    ), r = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((d) => d.id),
      ...this.model.modules.flatMap((d) => (d.domainServices ?? []).map((h) => h.id))
    ]);
    if (r.has(t) && o.has(n)) {
      (this.model.emissions ?? []).some(
        (h) => h.sourceId === t && h.domainEventId === n
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: n });
      return;
    }
    if (o.has(t)) {
      const d = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === t), h = this.model.modules.flatMap(($) => ($.readModels ?? []).map((O) => ({ rm: O, module: $ }))).find(({ rm: $ }) => $.id === n), u = this.model.modules.find(($) => $.id === n) ?? (h == null ? void 0 : h.module);
      if (!d || !u) return;
      const f = new Set((this.model.aggregates ?? []).map(($) => $.id)), _ = new Set(
        this.model.modules.flatMap(($) => ($.domainServices ?? []).map((O) => O.id))
      ), m = (this.model.emissions ?? []).find(
        ($) => $.domainEventId === t && (f.has($.sourceId) || _.has($.sourceId))
      );
      if (!m) {
        this.emit("modux-notice", {
          message: `Declara primero quién emite ${d.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const v = f.has(m.sourceId), y = (h == null ? void 0 : h.rm.name) ?? `${d.name}View`;
      if (this.model.flows.some(
        ($) => $.archetype === "MATERIALIZES" && $.triggerEvent === d.name && $.targetId === u.id && $.readModelName === y
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${W(d.name)}-${W(y)}`,
        name: y,
        archetype: "MATERIALIZES",
        triggerAggregateId: v ? m.sourceId : "",
        triggerDomainServiceId: v ? void 0 : m.sourceId,
        triggerEvent: d.name,
        targetId: u.id,
        readModelName: y
      });
      return;
    }
    const a = /* @__PURE__ */ new Set([
      ...r,
      ...this.model.modules.flatMap((d) => (d.useCases ?? []).map((h) => h.id)),
      ...this.model.modules.flatMap((d) => (d.readModels ?? []).map((h) => h.id))
    ]);
    if (a.has(t) || a.has(n) || o.has(n))
      return;
    const l = new Set(this.model.externalSystems.map((d) => d.id));
    l.has(t) || l.has(n) || this.model.relations.some(
      (d) => d.sourceId === t && d.targetId === n || d.sourceId === n && d.targetId === t
    ) || (this._relationPicker = { sourceId: t, targetId: n, mode: "create", x: i ?? 0, y: s ?? 0 });
  }
  /** Apply the picker's choice: create the new relation or retype the existing one. */
  pickRelationType(e) {
    const t = this._relationPicker;
    if (this._relationPicker = null, !t) return;
    if (this._relationType = e, t.mode === "create") {
      this.command({ kind: "add-relation", sourceId: t.sourceId, targetId: t.targetId, type: e });
      return;
    }
    const n = this.model.relations.find(
      (i) => i.sourceId === t.sourceId && i.targetId === t.targetId
    );
    n && n.type !== e && this.command({ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: e });
  }
  onDeleteRequested(e) {
    const { elementType: t, id: n, kind: i } = e.detail;
    if (this._view === "context-map" && t === "edge" && i === "relation") {
      const s = /^rel:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "emission") {
      const s = /^emit:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-emission", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (t === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((o) => o.moduleId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: n });
      return;
    }
    if (t === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((o) => o.aggregateId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate", id: n });
      return;
    }
    if (t === "node" && i === "domain-event") {
      this._selectedId = null, this.command({ kind: "remove-domain-event", id: n });
      return;
    }
    if (t === "node" && i === "read-model") {
      this._selectedId = null, this.command({ kind: "remove-read-model", id: n });
      return;
    }
    if (t === "node" && i === "domain-service") {
      this._selectedId = null, this.command({ kind: "remove-domain-service", id: n });
      return;
    }
    if (t === "node" && i === "flow") {
      this._selectedId = null, this.command({ kind: "remove-flow", id: n.replace(/^flow:/, "") });
      return;
    }
    if (t === "node" && i === "process") {
      this._selectedId = null, this.command({ kind: "remove-process", id: n });
      return;
    }
    if (t === "node" && i === "process-step") {
      const s = this.owningProcessOf(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: s.id, id: n });
    }
  }
  owningProcessOf(e) {
    return (this.model.processes ?? []).find((t) => t.steps.some((n) => n.id === e));
  }
  onNodeRenamed(e) {
    const { id: t, kind: n, name: i } = e.detail;
    (n === "module" || n === "aggregate" || n === "entity" || n === "process-step" || n === "domain-event" || n === "read-model" || n === "domain-service") && this.command({ kind: "rename-element", type: n, id: t.replace(/^tgt:/, ""), name: i });
  }
  addStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.processes ?? []).find((s) => s.id === this._selectedId), n = t ?? this.owningProcessOf(this._selectedId);
    if (!n) return;
    const i = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: n.id,
      id: `step-${W(e)}`,
      name: e,
      stepType: this._newStepType,
      roleId: this._newStepType === "HUMAN" && this._newStepRole.trim() || void 0,
      deadline: this._newStepType === "HUMAN" && this._newStepDeadline.trim() || void 0,
      afterStepId: i
    }), this._newStepName = "", this._newStepDeadline = "";
  }
  onElementSelected(e) {
    var t;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const n = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((i) => i.id === e.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    this.emit("modux-select", { elementType: e.detail.kind, id: e.detail.id });
  }
  onMultiToggled(e) {
    const { id: t } = e.detail;
    this._multi = this._multi.includes(t) ? this._multi.filter((n) => n !== t) : [...this._multi, t];
  }
  onNodesBoxed(e) {
    this._multi = e.detail.ids;
  }
  /** Canvas node ids → catalog element ids (view members). */
  memberIdsFromSelection() {
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const n of this._multi) {
      const i = e.nodes.find((s) => s.id === n);
      if (i)
        switch (i.kind) {
          case "module":
          case "external-system":
            t.add(n.replace(/^tgt:/, ""));
            break;
          case "aggregate":
          case "entity":
          case "process":
            t.add(n);
            break;
          case "flow":
            t.add(n.replace(/^flow:/, ""));
            break;
          case "process-step": {
            const s = this.owningProcessOf(n);
            s && t.add(s.id);
            break;
          }
        }
    }
    return [...t];
  }
  createViewFromSelection() {
    const e = this._newViewName.trim(), t = this.memberIdsFromSelection();
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${W(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((l) => l.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), n = this.model.modules.filter((l) => t.has(l.id)), i = new Set(n.map((l) => l.id)), s = this.model.externalSystems.filter((l) => t.has(l.id)), o = new Set(s.map((l) => l.id)), r = (this.model.aggregates ?? []).filter(
      (l) => t.has(l.id) || i.has(l.moduleId)
    ), a = new Set(r.map((l) => l.id));
    return {
      ...this.model,
      modules: n,
      externalSystems: s,
      relations: this.model.relations.filter(
        (l) => i.has(l.sourceId) && i.has(l.targetId)
      ),
      flows: this.model.flows.filter(
        (l) => t.has(l.id) || (i.has(l.sourceId) || o.has(l.sourceId)) && (i.has(l.targetId) || o.has(l.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((l) => a.has(l.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (l) => a.has(l.sourceAggregateId) && a.has(l.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (l) => t.has(l.id) || (l.ownerModuleId ? i.has(l.ownerModuleId) : !1)
      )
    };
  }
  applyStepEdit() {
    const e = this._selectedId, t = e ? this.owningProcessOf(e) : void 0;
    !e || !t || this.command({
      kind: "update-process-step",
      processId: t.id,
      id: e,
      roleId: this._editStepRole.trim() || void 0,
      deadline: this._editStepDeadline.trim() || void 0,
      compensationUseCaseId: this._editStepComp.trim() || void 0
    });
  }
  onElementActivated(e) {
    if (this._view === "context-map" && e.detail.elementType === "edge" && e.detail.kind === "relation") {
      const n = /^rel:(.+)->(.+)$/.exec(e.detail.id);
      n && (this._relationPicker = {
        sourceId: n[1],
        targetId: n[2],
        mode: "edit",
        x: e.detail.x ?? 0,
        y: e.detail.y ?? 0
      });
      return;
    }
    const t = e.detail.kind === "process-step" ? nd(this.model.processes, e.detail.id) : td(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, n, i, s, o, r, a, l, c, d, h, u, f, _;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const m = (t = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : t.id, v = this._newModuleId || m || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!v) return;
          this.command({ kind: "add-domain-event", id: `ev-${W(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const m = (i = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : i.id, v = this._newModuleId || m || ((s = this.model.modules[0]) == null ? void 0 : s.id);
          if (!v) return;
          this.command({ kind: "add-domain-service", id: `ds-${W(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const m = (o = (this.model.aggregates ?? []).find((y) => y.id === this._selectedId)) == null ? void 0 : o.id, v = this._newAggregateId || m || ((a = (r = this.model.aggregates) == null ? void 0 : r[0]) == null ? void 0 : a.id);
          if (!v) return;
          this.command({ kind: "add-read-model", id: `rm-${W(e)}`, name: e, aggregateId: v });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${W(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const m = this._newModuleId || ((l = this.model.modules[0]) == null ? void 0 : l.id);
        if (!m) return;
        this.command({ kind: "add-aggregate", id: `agg-${W(e)}`, name: e, moduleId: m });
      } else if (this._view === "flows") {
        const m = this._newTriggerAggId || ((d = (c = this.model.aggregates) == null ? void 0 : c[0]) == null ? void 0 : d.id), v = this._newTargetId || ((h = this.model.modules[0]) == null ? void 0 : h.id), y = this._newTriggerEvent.trim();
        if (!m || !v || !y) return;
        this.command({
          kind: "add-flow",
          id: `flow-${W(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: m,
          triggerEvent: y,
          targetId: v
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const m = this._newModuleId || ((u = this.model.modules[0]) == null ? void 0 : u.id);
        if (!m) return;
        this.command({
          kind: "add-process",
          id: `proc-${W(e)}`,
          name: e,
          moduleId: m,
          triggerAggregateId: this._newTriggerAggId || ((_ = (f = this.model.aggregates) == null ? void 0 : f[0]) == null ? void 0 : _.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), n = this.filteredModel();
    return e === "aggregates" ? Oi(n, t.nodes) : e === "flows" ? Wi(n, t.nodes) : e === "processes" ? Jt(n, t.nodes) : Ti(n, t.nodes, this._detail === "detail", t.sizes ?? {});
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var l;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((c) => !c.parentId), i = new Set(n.map((c) => c.id)), s = {
      nodes: n,
      edges: t.edges.filter((c) => i.has(c.sourceId) && i.has(c.targetId))
    }, r = await Ka(s, e === "flows" || e === "processes" ? "layered" : "force"), a = this.viewLayout(e);
    this.pushUndoEntry([
      ...n.map((c) => ({
        kind: "move-node",
        view: e,
        id: c.id,
        pos: a.nodes[c.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(a.edges).map((c) => ({
        kind: "set-edge-points",
        view: e,
        id: c,
        points: a.edges[c]
      }))
    ]), this.writeViewLayout(e, { nodes: r, edges: {}, sizes: a.sizes }), await this.updateComplete, (l = this.renderRoot.querySelector("modux-canvas")) == null || l.fit();
  }
  render() {
    const e = this.sceneFor(this._view);
    return A`
      <div class="toolbar">
        <div class="tabs">
          ${ja.map(
      (t) => A`
              <button
                class="tab"
                ?data-active=${this._view === t.id}
                ?disabled=${!t.ready}
                title=${t.ready ? "" : "Próximamente"}
                @click=${() => this._view = t.id}
              >
                ${t.label}
              </button>
            `
    )}
        </div>
        <select
          title="Limitar el lienzo a una vista del modelo"
          @change=${(t) => this._activeViewId = t.target.value}
        >
          <option value="" ?selected=${this._activeViewId === ""}>Vista: todo el modelo</option>
          ${(this.model.views ?? []).filter((t) => t.kind === "CURATED").map(
      (t) => A`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        <div class="spacer"></div>
        ${this._multi.length ? A`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                .value=${this._newViewName}
                @input=${(t) => this._newViewName = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.createViewFromSelection()}
              />
              <button class="tab" title="Crear una vista modux con la selección" @click=${this.createViewFromSelection}>
                ⊞ Vista (${this._multi.length})
              </button>
              <span class="sep"></span>
            ` : ""}
        <input
          class="new-name"
          placeholder=${{
      "context-map": this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : "Nuevo read model…",
      aggregates: "Nuevo agregado…",
      flows: "Nuevo flow…",
      processes: "Nuevo proceso…"
    }[this._view]}
          .value=${this._newName}
          @input=${(t) => this._newName = t.target.value}
          @keydown=${(t) => t.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "context-map" && this._detail === "detail" ? A`<select
              title="Qué crear: un contexto, o un evento de dominio dentro de uno"
              @change=${(t) => this._newContextMapKind = t.target.value}
            >
              <option value="module" ?selected=${this._newContextMapKind === "module"}>
                Contexto
              </option>
              <option value="domain-event" ?selected=${this._newContextMapKind === "domain-event"}>
                Evento de dominio
              </option>
              <option value="read-model" ?selected=${this._newContextMapKind === "read-model"}>
                Read model
              </option>
              <option
                value="domain-service"
                ?selected=${this._newContextMapKind === "domain-service"}
              >
                Servicio de dominio
              </option>
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "read-model" ? A`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && (this._detail !== "detail" || this._newContextMapKind === "module") ? A`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${ed.map(
      (t) => A`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "domain-service") ? A`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var n;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? A`
              ${this._view === "flows" ? A`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => A`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return A`<option
                      value=${t.id}
                      ?selected=${t.id === (this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
                    >
                      ${t.name}
                    </option>`;
      }
    )}
              </select>
              <input
                class="new-name evt"
                placeholder="Evento trigger…"
                .value=${this._newTriggerEvent}
                @input=${(t) => this._newTriggerEvent = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.createElementFromToolbar()}
              />
              ${this._view === "flows" ? A`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var n;
        return A`<option
                          value=${t.id}
                          ?selected=${t.id === (this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                        >
                          ${t.name}
                        </option>`;
      }
    )}
                  </select>` : ""}
            ` : ""}
        <button class="tab" @click=${this.createElementFromToolbar}>＋ Crear</button>
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? A`
              <span class="sep"></span>
              <input
                class="new-name evt"
                placeholder="Nuevo paso…"
                .value=${this._newStepName}
                @input=${(t) => this._newStepName = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.addStepFromToolbar()}
              />
              <select
                title="Tipo de paso"
                @change=${(t) => this._newStepType = t.target.value}
              >
                ${["AUTOMATED", "HUMAN"].map(
      (t) => A`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? A`<input
                      class="new-name evt"
                      placeholder="Rol…"
                      .value=${this._newStepRole}
                      @input=${(t) => this._newStepRole = t.target.value}
                    /><input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del nuevo paso"
                      .value=${this._newStepDeadline}
                      @input=${(t) => this._newStepDeadline = t.target.value}
                    />` : ""}
              <button class="tab" title="Añadir paso tras la selección" @click=${this.addStepFromToolbar}>
                ＋ Paso
              </button>
              ${this.owningProcessOf(this._selectedId) ? A`
                    <span class="sep"></span>
                    <input
                      class="new-name evt"
                      placeholder="Rol…"
                      title="Rol del paso seleccionado (HUMAN)"
                      .value=${this._editStepRole}
                      @input=${(t) => this._editStepRole = t.target.value}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Deadline (PT4H)…"
                      title="Deadline ISO-8601 del paso seleccionado"
                      .value=${this._editStepDeadline}
                      @input=${(t) => this._editStepDeadline = t.target.value}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Compensación…"
                      title="Use case de compensación del paso seleccionado"
                      .value=${this._editStepComp}
                      @input=${(t) => this._editStepComp = t.target.value}
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
          @change=${(t) => this.setDetail(t.target.value)}
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
      var t;
      return (t = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : t.fit();
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
        .scene=${e}
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
        ${this._view === "context-map" ? A`Arrastra para reordenar · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : A`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
      </div>
      ${this.renderRelationPicker()}
    `;
  }
  renderRelationPicker() {
    var n;
    const e = this._relationPicker;
    if (!e) return "";
    const t = e.mode === "edit" ? (n = this.model.relations.find(
      (i) => i.sourceId === e.sourceId && i.targetId === e.targetId
    )) == null ? void 0 : n.type : this._relationType;
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Qa.map(
      (i) => A`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${Dt[i].abbr}</span>
              <span class="name">${Dt[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
T.styles = Ht`
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
M([
  se({ attribute: !1 })
], T.prototype, "model", 2);
M([
  se({ attribute: !1 })
], T.prototype, "layout", 2);
M([
  b()
], T.prototype, "_view", 2);
M([
  b()
], T.prototype, "_detail", 2);
M([
  b()
], T.prototype, "_relationType", 2);
M([
  b()
], T.prototype, "_relationPicker", 2);
M([
  b()
], T.prototype, "_selectedId", 2);
M([
  b()
], T.prototype, "_newName", 2);
M([
  b()
], T.prototype, "_newSubdomain", 2);
M([
  b()
], T.prototype, "_newModuleId", 2);
M([
  b()
], T.prototype, "_newContextMapKind", 2);
M([
  b()
], T.prototype, "_newAggregateId", 2);
M([
  b()
], T.prototype, "_newArchetype", 2);
M([
  b()
], T.prototype, "_newTriggerAggId", 2);
M([
  b()
], T.prototype, "_newTriggerEvent", 2);
M([
  b()
], T.prototype, "_newTargetId", 2);
M([
  b()
], T.prototype, "_undoStack", 2);
M([
  b()
], T.prototype, "_redoStack", 2);
M([
  b()
], T.prototype, "_newStepName", 2);
M([
  b()
], T.prototype, "_newStepType", 2);
M([
  b()
], T.prototype, "_newStepRole", 2);
M([
  b()
], T.prototype, "_newStepDeadline", 2);
M([
  b()
], T.prototype, "_editStepRole", 2);
M([
  b()
], T.prototype, "_editStepDeadline", 2);
M([
  b()
], T.prototype, "_editStepComp", 2);
M([
  b()
], T.prototype, "_multi", 2);
M([
  b()
], T.prototype, "_newViewName", 2);
M([
  b()
], T.prototype, "_activeViewId", 2);
T = M([
  Bt("modux-editor")
], T);
var id = Object.defineProperty, sd = Object.getOwnPropertyDescriptor, ye = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? sd(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && id(t, n, s), s;
};
let ie = class extends pe {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._toast = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
      if (this._interacting = !1, this._pendingVersion) {
        const e = this._pendingVersion;
        this._pendingVersion = null, this.onVersionSignal(e);
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
    var e;
    window.clearTimeout(this._layoutTimer), window.clearInterval(this._pollTimer), (e = this._sse) == null || e.close(), this.removeEventListener("pointerdown", this._onPointerDown, !0), window.removeEventListener("pointerup", this._onPointerUp, !0), window.removeEventListener("pagehide", this._onPageHide), this._onPageHide(), super.disconnectedCallback();
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
        (e) => void this.onVersionSignal(e.data)
      ), this._sse.onerror = () => {
        var e;
        (e = this._sse) == null || e.close(), this._sse = void 0, this._pollTimer || (this._pollTimer = window.setInterval(() => void this.pollVersion(), 4e3));
      };
    } catch {
      this._pollTimer = window.setInterval(() => void this.pollVersion(), 4e3);
    }
  }
  async pollVersion() {
    try {
      const e = await fetch(`${this.base}/version`);
      if (!e.ok) return;
      await this.onVersionSignal((await e.json()).version);
    } catch {
    }
  }
  async onVersionSignal(e) {
    var n;
    if (!this._model) return;
    if (this._saving || this._interacting) {
      this._pendingVersion = e;
      return;
    }
    const t = this._lastVersion !== null && e !== this._lastVersion;
    this._lastVersion = e, t && (await this.reload(), (n = this.renderRoot.querySelector("modux-editor")) == null || n.clearHistory(), this.showToast(
      "El modelo ha cambiado fuera de este editor: recargado (historial de deshacer reiniciado)",
      "info"
    ));
  }
  async reload() {
    try {
      const [e, t, n] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/layout`),
        fetch(`${this.base}/version`)
      ]);
      if (!e.ok) throw new Error(`GET ${this.base}/model → ${e.status}`);
      this._model = await e.json(), this._layout = t.ok ? await t.json() : {}, n.ok && (this._lastVersion = (await n.json()).version), this._error = null;
    } catch (e) {
      this._error = String(e);
    }
  }
  showToast(e, t = "error") {
    this._toast = { message: e, kind: t }, window.clearTimeout(this._toastTimer), this._toastTimer = window.setTimeout(() => this._toast = null, 5e3);
  }
  async onCommand(e) {
    const { command: t } = e.detail;
    this._saving = !0;
    try {
      const n = await fetch(`${this.base}/commands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t)
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
  onLayoutChanged(e) {
    this._layout = e.detail.layout, this._layoutDirty = !0, window.clearTimeout(this._layoutTimer), this._layoutTimer = window.setTimeout(() => {
      this._layoutDirty = !1, fetch(`${this.base}/layout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this._layout)
      });
    }, 600);
  }
  render() {
    return this._error ? A`<div class="status error">modux editor: ${this._error}</div>` : this._model ? A`
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(e) => this.showToast(e.detail.message, e.detail.kind ?? "info")}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? A`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : A`<div class="status">Cargando el modelo…</div>`;
  }
};
ie.styles = Ht`
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
ye([
  se()
], ie.prototype, "base", 2);
ye([
  b()
], ie.prototype, "_model", 2);
ye([
  b()
], ie.prototype, "_layout", 2);
ye([
  b()
], ie.prototype, "_error", 2);
ye([
  b()
], ie.prototype, "_saving", 2);
ye([
  b()
], ie.prototype, "_toast", 2);
ie = ye([
  Bt("modux-editor-connected")
], ie);
export {
  rd as CONTAINER_HEADER,
  od as CONTAINER_INSET,
  L as ModuxCanvas,
  T as ModuxEditor,
  ie as ModuxEditorConnected,
  Oi as aggregatesScene,
  pi as containerFit,
  fi as containerMinSize,
  Ti as contextMapScene,
  $i as flowCoherence,
  Wi as flowsScene,
  mi as normalizeViewLayout,
  Jt as processesScene,
  xi as relationEdgeId
};
