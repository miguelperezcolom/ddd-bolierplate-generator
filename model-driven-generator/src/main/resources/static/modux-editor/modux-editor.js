const rd = 34, od = 10;
function pi(e, t = { w: 160, h: 90 }) {
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
function mi(e, t, n) {
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
function gi(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const _i = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, yi = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, vi = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Et = 168, St = 56, Tn = 34, Cn = 14, wi = 14, Re = 108, Le = 32, Nn = 12, Pn = 10, Oe = 2, xi = Oe * Re + (Oe - 1) * Nn + 2 * Cn;
function $i(e, t) {
  return `rel:${e}->${t}`;
}
function bi(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some((i) => i.sourceId === t.sourceId && i.targetId === t.targetId) ? "OK" : e.relations.some((i) => i.sourceId === t.targetId && i.targetId === t.sourceId) ? "REVERSED" : "MISSING_RELATION";
}
function Jt(e, t) {
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
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" }
}, ki = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio"
};
function Ei(e) {
  const t = Math.max(1, Math.ceil(e / Oe)), n = t * Le + (t - 1) * Pn;
  return { w: xi, h: Tn + n + wi };
}
function Si(e, t) {
  const n = e % Oe, i = Math.floor(e / Oe);
  return {
    x: -t.w / 2 + Cn + n * (Re + Nn) + Re / 2,
    y: -t.h / 2 + Tn + i * (Le + Pn) + Le / 2
  };
}
function Ai(e, t, n, i, s, o) {
  const a = [
    ...(e.aggregates ?? []).filter((u) => u.moduleId === t.id).map((u) => ({ id: u.id, name: u.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map((u) => ({ id: u.id, name: u.name, kind: "use-case" })),
    ...(t.domainEvents ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "application-event" })
    )
  ];
  if (!a.length)
    return [{ ...i, x: n.x, y: n.y, w: Et, h: St }];
  const d = o[t.id] ?? Ei(a.length), l = a.map((u, m) => s[u.id] ?? Si(m, d)), c = mi(
    n,
    d,
    l.map((u) => ({ dx: u.x, dy: u.y, w: Re, h: Le }))
  ), h = {
    ...i,
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    container: !0
  }, f = a.map((u, m) => {
    const _ = l[m], x = Ii[u.kind];
    return {
      id: u.id,
      label: u.name,
      kind: u.kind,
      x: n.x + _.x,
      y: n.y + _.y,
      w: Re,
      h: Le,
      symbol: x.symbol,
      fill: x.fill,
      stroke: x.stroke,
      parentId: t.id,
      tooltip: `${ki[u.kind]} ${u.name}`
    };
  });
  return [h, ...f];
}
function Mi(e, t, n = !1, i = {}) {
  const s = [
    ...e.modules.map((h) => ({ ref: h, external: !1 })),
    ...e.externalSystems.map((h) => ({ ref: h, external: !0 }))
  ], o = s.flatMap((h, f) => {
    const u = t[h.ref.id] ?? Jt(f, s.length);
    if (h.external)
      return [
        {
          id: h.ref.id,
          label: h.ref.name,
          x: u.x,
          y: u.y,
          w: Et,
          h: St,
          kind: "external-system",
          symbol: "component",
          fill: "#ffffff",
          stroke: "#64748b",
          dashed: !0,
          badge: "EXTERNAL",
          tooltip: `${h.ref.name} (sistema externo)`
        }
      ];
    const m = h.ref, _ = m.subdomainType ?? "GENERIC", x = {
      id: m.id,
      label: m.name,
      kind: "module",
      symbol: "component",
      fill: _i[_],
      stroke: "#94a3b8",
      badge: _,
      tooltip: `${m.name} — subdominio ${_}`
    };
    return n ? Ai(e, m, u, x, t, i) : [{ ...x, x: u.x, y: u.y, w: Et, h: St }];
  }), r = s.length + (e.actors ?? []).length;
  (e.actors ?? []).forEach((h, f) => {
    const u = t[h.id] ?? Jt(s.length + f, r);
    o.push({
      id: h.id,
      label: h.name,
      x: u.x,
      y: u.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${h.name} (actor)`
    });
  }), o.sort((h, f) => (h.parentId ? 1 : 0) - (f.parentId ? 1 : 0));
  const a = e.relations.map((h) => ({
    id: $i(h.sourceId, h.targetId),
    sourceId: h.sourceId,
    targetId: h.targetId,
    kind: "relation",
    label: yi[h.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${h.type} (${h.sourceId} upstream → ${h.targetId} downstream)`
  })), d = e.flows.map((h) => {
    var x, y, I, k;
    const f = bi(e, h), u = n ? e.modules.find((P) => P.id === h.sourceId) : void 0, m = ((x = u == null ? void 0 : u.domainEvents) == null ? void 0 : x.find((P) => P.name === h.triggerEvent)) ?? ((y = u == null ? void 0 : u.applicationEvents) == null ? void 0 : y.find((P) => P.name === h.triggerEvent)), _ = n && h.readModelName ? (k = (I = e.modules.find((P) => P.id === h.targetId)) == null ? void 0 : I.readModels) == null ? void 0 : k.find((P) => P.name === h.readModelName) : void 0;
    return {
      id: `flow:${h.id}`,
      sourceId: (m == null ? void 0 : m.id) ?? h.sourceId,
      targetId: (_ == null ? void 0 : _.id) ?? h.targetId,
      kind: "flow",
      label: h.name,
      color: vi[f],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${h.name} [${h.archetype}] — ${f}`
    };
  }), l = new Set(o.map((h) => h.id)), c = n ? (e.emissions ?? []).filter((h) => l.has(h.sourceId) && l.has(h.domainEventId)).map((h) => ({
    id: `emit:${h.sourceId}->${h.domainEventId}`,
    sourceId: h.sourceId,
    targetId: h.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [];
  return { nodes: o, edges: [...a, ...d, ...c] };
}
const Ti = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ci = 176, Ni = 60, Pi = 140, Ri = 40;
function Li(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    n.filter((d) => d.moduleId === s.id).forEach((d, l) => {
      const c = i.filter((f) => f.aggregateId === d.id).length, h = 140 + l * (170 + c * 60);
      t[d.id] = { x: r, y: h }, i.filter((f) => f.aggregateId === d.id).forEach((f, u) => {
        t[f.id] = { x: r + 60, y: h + 100 + u * 60 };
      });
    });
  }), n.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Oi(e, t) {
  const n = Li(e), i = (l) => t[l] ?? n[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), o = (e.aggregates ?? []).map((l) => {
    const c = s.get(l.moduleId), h = (c == null ? void 0 : c.subdomainType) ?? "GENERIC", f = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: f.x,
      y: f.y,
      w: Ci,
      h: Ni,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ti[h],
      stroke: "#64748b",
      badge: c ? `${c.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${c ? ` — módulo ${c.name} (${h})` : ""}`
    };
  }), r = (e.entities ?? []).map((l) => {
    const c = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: c.x,
      y: c.y,
      w: Pi,
      h: Ri,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${l.name} (dentro del agregado)`
    };
  }), a = (e.entities ?? []).map((l) => ({
    id: `contains:${l.aggregateId}->${l.id}`,
    sourceId: l.aggregateId,
    targetId: l.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), d = (e.aggregateReferences ?? []).map((l, c) => ({
    id: `aggref:${c}:${l.sourceAggregateId}->${l.targetAggregateId}`,
    sourceId: l.sourceAggregateId,
    targetId: l.targetAggregateId,
    kind: "aggregate-reference",
    label: l.label,
    color: "#475569",
    arrow: !0,
    tooltip: l.label ? `Referencia: ${l.label}` : "Referencia entre agregados"
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
}, zi = 150, Ui = 44, Hi = 190, Vi = 56, Fi = 160, qi = 48;
function Bi(e, t) {
  const n = e.externalSystems.find((s) => s.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function Ki(e, t) {
  const n = e.flows, i = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, l;
    return ((l = (d = e.aggregates) == null ? void 0 : d.find((c) => c.id === a)) == null ? void 0 : l.name) ?? a ?? "?";
  };
  return n.forEach((a, d) => {
    const l = 120 + d * 130, c = Di[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const x = t[h] ?? { x: 160, y: l };
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
    const f = `flow:${a.id}`, u = t[f] ?? { x: 470, y: l };
    i.push({
      id: f,
      label: a.name,
      x: u.x,
      y: u.y,
      w: Hi,
      h: Vi,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: c,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const m = Bi(e, a), _ = `tgt:${m.id}`;
    if (!o.has(_)) {
      o.add(_);
      const x = t[_] ?? { x: 790, y: l };
      i.push({
        id: _,
        label: m.label,
        x: x.x,
        y: x.y,
        w: Fi,
        h: qi,
        kind: m.external ? "external-system" : "module",
        symbol: "component",
        fill: m.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: m.external,
        badge: m.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${a.id}:in`,
      sourceId: h,
      targetId: f,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: f,
      targetId: _,
      kind: "flow-delivery",
      color: c,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const Wi = 190, Xi = 56, yt = 170, Yi = 52;
function Qt(e, t) {
  const n = [], i = [], s = (o) => {
    var r;
    return (r = e.modules.find((a) => a.id === o)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((o, r) => {
    const a = 140 + r * 240, d = t[o.id] ?? { x: 150, y: a };
    n.push({
      id: o.id,
      label: o.name,
      x: d.x,
      y: d.y,
      w: Wi,
      h: Xi,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let l = o.id;
    if (o.steps.forEach((c, h) => {
      const f = c.type === "HUMAN", u = t[c.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (n.push({
        id: c.id,
        label: c.name,
        x: u.x,
        y: u.y,
        w: yt,
        h: Yi,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${c.roleId ? ` · ${c.roleId}` : ""}${c.deadline ? ` · ⏱ ${c.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${c.name}${c.useCaseId ? ` — use case ${c.useCaseId}` : ""}${c.deadline ? ` · deadline ${c.deadline}` : ""}`
      }), i.push({
        id: `pe:${o.id}:${h}`,
        sourceId: l,
        targetId: c.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), c.compensationUseCaseId) {
        const m = `comp:${c.id}`, _ = t[m] ?? { x: u.x, y: u.y + 90 };
        n.push({
          id: m,
          label: c.compensationUseCaseId,
          x: _.x,
          y: _.y,
          w: yt,
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
          targetId: m,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      l = c.id;
    }), o.onCompletionEventName) {
      const c = `done:${o.id}`, h = t[c] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      n.push({
        id: c,
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
        sourceId: l,
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
const et = globalThis, zt = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ut = Symbol(), jt = /* @__PURE__ */ new WeakMap();
let Rn = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (zt && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = jt.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && jt.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Gi = (e) => new Rn(typeof e == "string" ? e : e + "", void 0, Ut), Ht = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Rn(n, e, Ut);
}, Zi = (e, t) => {
  if (zt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = et.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, e.appendChild(i);
  }
}, en = zt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Gi(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ji, defineProperty: Qi, getOwnPropertyDescriptor: ji, getOwnPropertyNames: es, getOwnPropertySymbols: ts, getPrototypeOf: ns } = Object, le = globalThis, tn = le.trustedTypes, is = tn ? tn.emptyScript : "", vt = le.reactiveElementPolyfillSupport, Ce = (e, t) => e, rt = { toAttribute(e, t) {
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
} }, Vt = (e, t) => !Ji(e, t), nn = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: Vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), le.litPropertyMetadata ?? (le.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let we = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = nn) {
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
    return this.elementProperties.get(t) ?? nn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ce("elementProperties"))) return;
    const t = ns(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ce("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ce("properties"))) {
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
      for (const s of i) n.unshift(en(s));
    } else t !== void 0 && n.push(en(t));
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
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : rt;
      this._$Em = s;
      const l = d.fromAttribute(n, a.type);
      this[s] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? l, this._$Em = null;
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
        const { wrapped: a } = r, d = this[o];
        a !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, r, d);
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
we.elementStyles = [], we.shadowRootOptions = { mode: "open" }, we[Ce("elementProperties")] = /* @__PURE__ */ new Map(), we[Ce("finalized")] = /* @__PURE__ */ new Map(), vt == null || vt({ ReactiveElement: we }), (le.reactiveElementVersions ?? (le.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = globalThis, sn = (e) => e, ot = Ne.trustedTypes, rn = ot ? ot.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ln = "$lit$", de = `lit$${Math.random().toFixed(9).slice(2)}$`, On = "?" + de, ss = `<${On}>`, _e = document, De = () => _e.createComment(""), ze = (e) => e === null || typeof e != "object" && typeof e != "function", Ft = Array.isArray, rs = (e) => Ft(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", wt = `[ 	
\f\r]`, Ee = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, on = /-->/g, an = />/g, ce = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dn = /'/g, ln = /"/g, Dn = /^(?:script|style|textarea|title)$/i, zn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), T = zn(1), A = zn(2), $e = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), cn = /* @__PURE__ */ new WeakMap(), ue = _e.createTreeWalker(_e, 129);
function Un(e, t) {
  if (!Ft(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rn !== void 0 ? rn.createHTML(t) : t;
}
const os = (e, t) => {
  const n = e.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Ee;
  for (let a = 0; a < n; a++) {
    const d = e[a];
    let l, c, h = -1, f = 0;
    for (; f < d.length && (r.lastIndex = f, c = r.exec(d), c !== null); ) f = r.lastIndex, r === Ee ? c[1] === "!--" ? r = on : c[1] !== void 0 ? r = an : c[2] !== void 0 ? (Dn.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = ce) : c[3] !== void 0 && (r = ce) : r === ce ? c[0] === ">" ? (r = s ?? Ee, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? ce : c[3] === '"' ? ln : dn) : r === ln || r === dn ? r = ce : r === on || r === an ? r = Ee : (r = ce, s = void 0);
    const u = r === ce && e[a + 1].startsWith("/>") ? " " : "";
    o += r === Ee ? d + ss : h >= 0 ? (i.push(l), d.slice(0, h) + Ln + d.slice(h) + de + u) : d + de + (h === -2 ? a : u);
  }
  return [Un(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ue {
  constructor({ strings: t, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [l, c] = os(t, n);
    if (this.el = Ue.createElement(l, i), ue.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = ue.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ln)) {
          const f = c[r++], u = s.getAttribute(h).split(de), m = /([.?@])?(.*)/.exec(f);
          d.push({ type: 1, index: o, name: m[2], strings: u, ctor: m[1] === "." ? ds : m[1] === "?" ? ls : m[1] === "@" ? cs : ft }), s.removeAttribute(h);
        } else h.startsWith(de) && (d.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Dn.test(s.tagName)) {
          const h = s.textContent.split(de), f = h.length - 1;
          if (f > 0) {
            s.textContent = ot ? ot.emptyScript : "";
            for (let u = 0; u < f; u++) s.append(h[u], De()), ue.nextNode(), d.push({ type: 2, index: ++o });
            s.append(h[f], De());
          }
        }
      } else if (s.nodeType === 8) if (s.data === On) d.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(de, h + 1)) !== -1; ) d.push({ type: 7, index: o }), h += de.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const i = _e.createElement("template");
    return i.innerHTML = t, i;
  }
}
function be(e, t, n = e, i) {
  var r, a;
  if (t === $e) return t;
  let s = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const o = ze(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (t = be(e, s._$AS(e, t.values), s, i)), t;
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
    const { el: { content: n }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? _e).importNode(n, !0);
    ue.currentNode = s;
    let o = ue.nextNode(), r = 0, a = 0, d = i[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let l;
        d.type === 2 ? l = new Be(o, o.nextSibling, this, t) : d.type === 1 ? l = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (l = new hs(o, this, t)), this._$AV.push(l), d = i[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = ue.nextNode(), r++);
    }
    return ue.currentNode = _e, s;
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
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = be(this, t, n), ze(t) ? t === O || t == null || t === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : t !== this._$AH && t !== $e && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : rs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== O && ze(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_e.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: n, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ue.createElement(Un(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(n);
    else {
      const r = new as(s, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = cn.get(t.strings);
    return n === void 0 && cn.set(t.strings, n = new Ue(t)), n;
  }
  k(t) {
    Ft(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const o of t) s === n.length ? n.push(i = new Be(this.O(De()), this.O(De()), this, this.options)) : i = n[s], i._$AI(o), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const s = sn(t).nextSibling;
      sn(t).remove(), t = s;
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
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = O;
  }
  _$AI(t, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = be(this, t, n, 0), r = !ze(t) || t !== this._$AH && t !== $e, r && (this._$AH = t);
    else {
      const a = t;
      let d, l;
      for (t = o[0], d = 0; d < o.length - 1; d++) l = be(this, a[i + d], n, d), l === $e && (l = this._$AH[d]), r || (r = !ze(l) || l !== this._$AH[d]), l === O ? t = O : t !== O && (t += (l ?? "") + o[d + 1]), this._$AH[d] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ds extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === O ? void 0 : t;
  }
}
class ls extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== O);
  }
}
class cs extends ft {
  constructor(t, n, i, s, o) {
    super(t, n, i, s, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = be(this, t, n, 0) ?? O) === $e) return;
    const i = this._$AH, s = t === O && i !== O || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== O && (i === O || s);
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
    be(this, t);
  }
}
const xt = Ne.litHtmlPolyfillSupport;
xt == null || xt(Ue, Be), (Ne.litHtmlVersions ?? (Ne.litHtmlVersions = [])).push("3.3.3");
const us = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new Be(t.insertBefore(De(), o), o, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = globalThis;
class me extends we {
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
    return $e;
  }
}
var Mn;
me._$litElement$ = !0, me.finalized = !0, (Mn = pe.litElementHydrateSupport) == null || Mn.call(pe, { LitElement: me });
const $t = pe.litElementPolyfillSupport;
$t == null || $t({ LitElement: me });
(pe.litElementVersions ?? (pe.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = (e) => (t, n) => {
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
      const d = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, d, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(a) {
      const d = this[r];
      t.call(this, a), this.requestUpdate(r, d, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function re(e) {
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
function $(e) {
  return re({ ...e, state: !0, attribute: !1 });
}
var At = "http://www.w3.org/1999/xhtml";
const hn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: At,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pt(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), hn.hasOwnProperty(t) ? { space: hn[t], local: e } : e;
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
function Hn(e) {
  var t = pt(e);
  return (t.local ? gs : ms)(t);
}
function _s() {
}
function Bt(e) {
  return e == null ? _s : function() {
    return this.querySelector(e);
  };
}
function ys(e) {
  typeof e != "function" && (e = Bt(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = new Array(r), d, l, c = 0; c < r; ++c)
      (d = o[c]) && (l = e.call(d, d.__data__, c, o)) && ("__data__" in d && (l.__data__ = d.__data__), a[c] = l);
  return new q(i, this._parents);
}
function vs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ws() {
  return [];
}
function Vn(e) {
  return e == null ? ws : function() {
    return this.querySelectorAll(e);
  };
}
function xs(e) {
  return function() {
    return vs(e.apply(this, arguments));
  };
}
function $s(e) {
  typeof e == "function" ? e = xs(e) : e = Vn(e);
  for (var t = this._groups, n = t.length, i = [], s = [], o = 0; o < n; ++o)
    for (var r = t[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && (i.push(e.call(d, d.__data__, l, r)), s.push(d));
  return new q(i, s);
}
function Fn(e) {
  return function() {
    return this.matches(e);
  };
}
function qn(e) {
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
function ks() {
  return this.firstElementChild;
}
function Es(e) {
  return this.select(e == null ? ks : Is(typeof e == "function" ? e : qn(e)));
}
var Ss = Array.prototype.filter;
function As() {
  return Array.from(this.children);
}
function Ms(e) {
  return function() {
    return Ss.call(this.children, e);
  };
}
function Ts(e) {
  return this.selectAll(e == null ? As : Ms(typeof e == "function" ? e : qn(e)));
}
function Cs(e) {
  typeof e != "function" && (e = Fn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new q(i, this._parents);
}
function Bn(e) {
  return new Array(e.length);
}
function Ns() {
  return new q(this._enter || this._groups.map(Bn), this._parents);
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
  for (var r = 0, a, d = t.length, l = o.length; r < l; ++r)
    (a = t[r]) ? (a.__data__ = o[r], i[r] = a) : n[r] = new at(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function Ls(e, t, n, i, s, o, r) {
  var a, d, l = /* @__PURE__ */ new Map(), c = t.length, h = o.length, f = new Array(c), u;
  for (a = 0; a < c; ++a)
    (d = t[a]) && (f[a] = u = r.call(d, d.__data__, a, t) + "", l.has(u) ? s[a] = d : l.set(u, d));
  for (a = 0; a < h; ++a)
    u = r.call(e, o[a], a, o) + "", (d = l.get(u)) ? (i[a] = d, d.__data__ = o[a], l.delete(u)) : n[a] = new at(e, o[a]);
  for (a = 0; a < c; ++a)
    (d = t[a]) && l.get(f[a]) === d && (s[a] = d);
}
function Os(e) {
  return e.__data__;
}
function Ds(e, t) {
  if (!arguments.length) return Array.from(this, Os);
  var n = t ? Ls : Rs, i = this._parents, s = this._groups;
  typeof e != "function" && (e = Ps(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), l = 0; l < o; ++l) {
    var c = i[l], h = s[l], f = h.length, u = zs(e.call(c, c && c.__data__, l, i)), m = u.length, _ = a[l] = new Array(m), x = r[l] = new Array(m), y = d[l] = new Array(f);
    n(c, h, _, x, y, u, t);
    for (var I = 0, k = 0, P, U; I < m; ++I)
      if (P = _[I]) {
        for (I >= k && (k = I + 1); !(U = x[k]) && ++k < m; ) ;
        P._next = U || null;
      }
  }
  return r = new q(r, i), r._enter = a, r._exit = d, r;
}
function zs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Us() {
  return new q(this._exit || this._groups.map(Bn), this._parents);
}
function Hs(e, t, n) {
  var i = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? o.remove() : n(o), i && s ? i.merge(s).order() : s;
}
function Vs(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, s = n.length, o = i.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var l = n[d], c = i[d], h = l.length, f = a[d] = new Array(h), u, m = 0; m < h; ++m)
      (u = l[m] || c[m]) && (f[m] = u);
  for (; d < s; ++d)
    a[d] = n[d];
  return new q(a, this._parents);
}
function Fs() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], s = i.length - 1, o = i[s], r; --s >= 0; )
      (r = i[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function qs(e) {
  e || (e = Bs);
  function t(h, f) {
    return h && f ? e(h.__data__, f.__data__) : !h - !f;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o) {
    for (var r = n[o], a = r.length, d = s[o] = new Array(a), l, c = 0; c < a; ++c)
      (l = r[c]) && (d[c] = l);
    d.sort(t);
  }
  return new q(s, this._parents).order();
}
function Bs(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ks() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ws() {
  return Array.from(this);
}
function Xs() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length; s < o; ++s) {
      var r = i[s];
      if (r) return r;
    }
  return null;
}
function Ys() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Gs() {
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
function Kn(e) {
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
  return arguments.length > 1 ? this.each((t == null ? sr : typeof t == "function" ? or : rr)(e, t, n ?? "")) : Ie(this.node(), e);
}
function Ie(e, t) {
  return e.style.getPropertyValue(t) || Kn(e).getComputedStyle(e, null).getPropertyValue(t);
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
function Kt(e) {
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
  for (var n = Kt(e), i = -1, s = t.length; ++i < s; ) n.add(t[i]);
}
function Gn(e, t) {
  for (var n = Kt(e), i = -1, s = t.length; ++i < s; ) n.remove(t[i]);
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
    for (var i = Kt(this.node()), s = -1, o = n.length; ++s < o; ) if (!i.contains(n[s])) return !1;
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
function vr(e) {
  return arguments.length ? this.each(e == null ? gr : (typeof e == "function" ? yr : _r)(e)) : this.node().textContent;
}
function wr() {
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
  return arguments.length ? this.each(e == null ? wr : (typeof e == "function" ? $r : xr)(e)) : this.node().innerHTML;
}
function Ir() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function kr() {
  return this.each(Ir);
}
function Er() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sr() {
  return this.each(Er);
}
function Ar(e) {
  var t = typeof e == "function" ? e : Hn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Mr() {
  return null;
}
function Tr(e, t) {
  var n = typeof e == "function" ? e : Hn(e), i = t == null ? Mr : typeof t == "function" ? t : Bt(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Cr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Nr() {
  return this.each(Cr);
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
      for (var d = 0, l = a.length, c; d < l; ++d)
        for (s = 0, c = a[d]; s < o; ++s)
          if ((r = i[s]).type === c.type && r.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = t ? Hr : Ur, s = 0; s < o; ++s) this.each(a(i[s], t, n));
  return this;
}
function Zn(e, t, n) {
  var i = Kn(e), s = i.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = i.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Fr(e, t) {
  return function() {
    return Zn(this, e, t);
  };
}
function qr(e, t) {
  return function() {
    return Zn(this, e, t.apply(this, arguments));
  };
}
function Br(e, t) {
  return this.each((typeof t == "function" ? qr : Fr)(e, t));
}
function* Kr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length, r; s < o; ++s)
      (r = i[s]) && (yield r);
}
var Jn = [null];
function q(e, t) {
  this._groups = e, this._parents = t;
}
function Ke() {
  return new q([[document.documentElement]], Jn);
}
function Wr() {
  return this;
}
q.prototype = Ke.prototype = {
  constructor: q,
  select: ys,
  selectAll: $s,
  selectChild: Es,
  selectChildren: Ts,
  filter: Cs,
  data: Ds,
  enter: Ns,
  exit: Us,
  join: Hs,
  merge: Vs,
  selection: Wr,
  order: Fs,
  sort: qs,
  call: Ks,
  nodes: Ws,
  node: Xs,
  size: Ys,
  empty: Gs,
  each: Zs,
  attr: ir,
  style: ar,
  property: hr,
  classed: mr,
  text: vr,
  html: br,
  raise: kr,
  lower: Sr,
  append: Ar,
  insert: Tr,
  remove: Nr,
  clone: Lr,
  datum: Or,
  on: Vr,
  dispatch: Br,
  [Symbol.iterator]: Kr
};
function Z(e) {
  return typeof e == "string" ? new q([[document.querySelector(e)]], [document.documentElement]) : new q([[e]], Jn);
}
function Xr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function he(e, t) {
  if (e = Xr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Yr = { value: () => {
} };
function Wt() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new tt(n);
}
function tt(e) {
  this._ = e;
}
function Gr(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
tt.prototype = Wt.prototype = {
  constructor: tt,
  on: function(e, t) {
    var n = this._, i = Gr(e + "", n), s, o = -1, r = i.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = i[o]).type) && (s = Zr(n[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = i[o]).type) n[s] = un(n[s], e.name, t);
      else if (t == null) for (s in n) n[s] = un(n[s], e.name, null);
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
function un(e, t, n) {
  for (var i = 0, s = e.length; i < s; ++i)
    if (e[i].name === t) {
      e[i] = Yr, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Mt = { capture: !0, passive: !1 };
function Tt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jr(e) {
  var t = e.document.documentElement, n = Z(e).on("dragstart.drag", Tt, Mt);
  "onselectstart" in t ? n.on("selectstart.drag", Tt, Mt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Qr(e, t) {
  var n = e.document.documentElement, i = Z(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Tt, Mt), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function Xt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Qn(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function We() {
}
var He = 0.7, dt = 1 / He, xe = "\\s*([+-]?\\d+)\\s*", Ve = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", J = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", jr = /^#([0-9a-f]{3,8})$/, eo = new RegExp(`^rgb\\(${xe},${xe},${xe}\\)$`), to = new RegExp(`^rgb\\(${J},${J},${J}\\)$`), no = new RegExp(`^rgba\\(${xe},${xe},${xe},${Ve}\\)$`), io = new RegExp(`^rgba\\(${J},${J},${J},${Ve}\\)$`), so = new RegExp(`^hsl\\(${Ve},${J},${J}\\)$`), ro = new RegExp(`^hsla\\(${Ve},${J},${J},${Ve}\\)$`), fn = {
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
Xt(We, Fe, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: pn,
  // Deprecated! Use color.formatHex.
  formatHex: pn,
  formatHex8: oo,
  formatHsl: ao,
  formatRgb: mn,
  toString: mn
});
function pn() {
  return this.rgb().formatHex();
}
function oo() {
  return this.rgb().formatHex8();
}
function ao() {
  return jn(this).formatHsl();
}
function mn() {
  return this.rgb().formatRgb();
}
function Fe(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = jr.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? gn(t) : n === 3 ? new F(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ge(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ge(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = eo.exec(e)) ? new F(t[1], t[2], t[3], 1) : (t = to.exec(e)) ? new F(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = no.exec(e)) ? Ge(t[1], t[2], t[3], t[4]) : (t = io.exec(e)) ? Ge(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = so.exec(e)) ? vn(t[1], t[2] / 100, t[3] / 100, 1) : (t = ro.exec(e)) ? vn(t[1], t[2] / 100, t[3] / 100, t[4]) : fn.hasOwnProperty(e) ? gn(fn[e]) : e === "transparent" ? new F(NaN, NaN, NaN, 0) : null;
}
function gn(e) {
  return new F(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ge(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new F(e, t, n, i);
}
function lo(e) {
  return e instanceof We || (e = Fe(e)), e ? (e = e.rgb(), new F(e.r, e.g, e.b, e.opacity)) : new F();
}
function Ct(e, t, n, i) {
  return arguments.length === 1 ? lo(e) : new F(e, t, n, i ?? 1);
}
function F(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Xt(F, Ct, Qn(We, {
  brighter(e) {
    return e = e == null ? dt : Math.pow(dt, e), new F(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? He : Math.pow(He, e), new F(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new F(ge(this.r), ge(this.g), ge(this.b), lt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: _n,
  // Deprecated! Use color.formatHex.
  formatHex: _n,
  formatHex8: co,
  formatRgb: yn,
  toString: yn
}));
function _n() {
  return `#${fe(this.r)}${fe(this.g)}${fe(this.b)}`;
}
function co() {
  return `#${fe(this.r)}${fe(this.g)}${fe(this.b)}${fe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function yn() {
  const e = lt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ge(this.r)}, ${ge(this.g)}, ${ge(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function lt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ge(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function fe(e) {
  return e = ge(e), (e < 16 ? "0" : "") + e.toString(16);
}
function vn(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new X(e, t, n, i);
}
function jn(e) {
  if (e instanceof X) return new X(e.h, e.s, e.l, e.opacity);
  if (e instanceof We || (e = Fe(e)), !e) return new X();
  if (e instanceof X) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), o = Math.max(t, n, i), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (n - i) / a + (n < i) * 6 : n === o ? r = (i - t) / a + 2 : r = (t - n) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new X(r, a, d, e.opacity);
}
function ho(e, t, n, i) {
  return arguments.length === 1 ? jn(e) : new X(e, t, n, i ?? 1);
}
function X(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Xt(X, ho, Qn(We, {
  brighter(e) {
    return e = e == null ? dt : Math.pow(dt, e), new X(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? He : Math.pow(He, e), new X(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - i;
    return new F(
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
const ei = (e) => () => e;
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
  return (e = +e) == 1 ? ti : function(t, n) {
    return n - t ? fo(t, n, e) : ei(isNaN(t) ? n : t);
  };
}
function ti(e, t) {
  var n = t - e;
  return n ? uo(e, n) : ei(isNaN(e) ? t : e);
}
const xn = (function e(t) {
  var n = po(t);
  function i(s, o) {
    var r = n((s = Ct(s)).r, (o = Ct(o)).r), a = n(s.g, o.g), d = n(s.b, o.b), l = ti(s.opacity, o.opacity);
    return function(c) {
      return s.r = r(c), s.g = a(c), s.b = d(c), s.opacity = l(c), s + "";
    };
  }
  return i.gamma = e, i;
})(1);
function ae(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Nt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, It = new RegExp(Nt.source, "g");
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
  var n = Nt.lastIndex = It.lastIndex = 0, i, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (i = Nt.exec(e)) && (s = It.exec(t)); )
    (o = s.index) > n && (o = t.slice(n, o), a[r] ? a[r] += o : a[++r] = o), (i = i[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: ae(i, s) })), n = It.lastIndex;
  return n < t.length && (o = t.slice(n), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? go(d[0].x) : mo(t) : (t = d.length, function(l) {
    for (var c = 0, h; c < t; ++c) a[(h = d[c]).i] = h.x(l);
    return a.join("");
  });
}
var $n = 180 / Math.PI, Pt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ni(e, t, n, i, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * n + t * i) && (n -= e * d, i -= t * d), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, d /= a), e * i < t * n && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * $n,
    skewX: Math.atan(d) * $n,
    scaleX: r,
    scaleY: a
  };
}
var Je;
function yo(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Pt : ni(t.a, t.b, t.c, t.d, t.e, t.f);
}
function vo(e) {
  return e == null || (Je || (Je = document.createElementNS("http://www.w3.org/2000/svg", "g")), Je.setAttribute("transform", e), !(e = Je.transform.baseVal.consolidate())) ? Pt : (e = e.matrix, ni(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ii(e, t, n, i) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, c, h, f, u, m) {
    if (l !== h || c !== f) {
      var _ = u.push("translate(", null, t, null, n);
      m.push({ i: _ - 4, x: ae(l, h) }, { i: _ - 2, x: ae(c, f) });
    } else (h || f) && u.push("translate(" + h + t + f + n);
  }
  function r(l, c, h, f) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), f.push({ i: h.push(s(h) + "rotate(", null, i) - 2, x: ae(l, c) })) : c && h.push(s(h) + "rotate(" + c + i);
  }
  function a(l, c, h, f) {
    l !== c ? f.push({ i: h.push(s(h) + "skewX(", null, i) - 2, x: ae(l, c) }) : c && h.push(s(h) + "skewX(" + c + i);
  }
  function d(l, c, h, f, u, m) {
    if (l !== h || c !== f) {
      var _ = u.push(s(u) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: ae(l, h) }, { i: _ - 2, x: ae(c, f) });
    } else (h !== 1 || f !== 1) && u.push(s(u) + "scale(" + h + "," + f + ")");
  }
  return function(l, c) {
    var h = [], f = [];
    return l = e(l), c = e(c), o(l.translateX, l.translateY, c.translateX, c.translateY, h, f), r(l.rotate, c.rotate, h, f), a(l.skewX, c.skewX, h, f), d(l.scaleX, l.scaleY, c.scaleX, c.scaleY, h, f), l = c = null, function(u) {
      for (var m = -1, _ = f.length, x; ++m < _; ) h[(x = f[m]).i] = x.x(u);
      return h.join("");
    };
  };
}
var wo = ii(yo, "px, ", "px)", "deg)"), xo = ii(vo, ", ", ")", ")"), $o = 1e-12;
function bn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function bo(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Io(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ko = (function e(t, n, i) {
  function s(o, r) {
    var a = o[0], d = o[1], l = o[2], c = r[0], h = r[1], f = r[2], u = c - a, m = h - d, _ = u * u + m * m, x, y;
    if (_ < $o)
      y = Math.log(f / l) / t, x = function(M) {
        return [
          a + M * u,
          d + M * m,
          l * Math.exp(t * M * y)
        ];
      };
    else {
      var I = Math.sqrt(_), k = (f * f - l * l + i * _) / (2 * l * n * I), P = (f * f - l * l - i * _) / (2 * f * n * I), U = Math.log(Math.sqrt(k * k + 1) - k), B = Math.log(Math.sqrt(P * P + 1) - P);
      y = (B - U) / t, x = function(M) {
        var oe = M * y, Xe = bn(U), Ye = l / (n * I) * (Xe * Io(t * oe + U) - bo(U));
        return [
          a + Ye * u,
          d + Ye * m,
          l * Xe / bn(t * oe + U)
        ];
      };
    }
    return x.duration = y * 1e3 * t / Math.SQRT2, x;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var ke = 0, Me = 0, Se = 0, si = 1e3, ct, Te, ht = 0, ye = 0, mt = 0, qe = typeof performance == "object" && performance.now ? performance : Date, ri = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Yt() {
  return ye || (ri(Eo), ye = qe.now() + mt);
}
function Eo() {
  ye = 0;
}
function ut() {
  this._call = this._time = this._next = null;
}
ut.prototype = oi.prototype = {
  constructor: ut,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Yt() : +n) + (t == null ? 0 : +t), !this._next && Te !== this && (Te ? Te._next = this : ct = this, Te = this), this._call = e, this._time = n, Rt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Rt());
  }
};
function oi(e, t, n) {
  var i = new ut();
  return i.restart(e, t, n), i;
}
function So() {
  Yt(), ++ke;
  for (var e = ct, t; e; )
    (t = ye - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ke;
}
function In() {
  ye = (ht = qe.now()) + mt, ke = Me = 0;
  try {
    So();
  } finally {
    ke = 0, Mo(), ye = 0;
  }
}
function Ao() {
  var e = qe.now(), t = e - ht;
  t > si && (mt -= t, ht = e);
}
function Mo() {
  for (var e, t = ct, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ct = n);
  Te = e, Rt(i);
}
function Rt(e) {
  if (!ke) {
    Me && (Me = clearTimeout(Me));
    var t = e - ye;
    t > 24 ? (e < 1 / 0 && (Me = setTimeout(In, e - qe.now() - mt)), Se && (Se = clearInterval(Se))) : (Se || (ht = qe.now(), Se = setInterval(Ao, si)), ke = 1, ri(In));
  }
}
function kn(e, t, n) {
  var i = new ut();
  return t = t == null ? 0 : +t, i.restart((s) => {
    i.stop(), e(s + t);
  }, t, n), i;
}
var To = Wt("start", "end", "cancel", "interrupt"), Co = [], ai = 0, En = 1, Lt = 2, nt = 3, Sn = 4, Ot = 5, it = 6;
function gt(e, t, n, i, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (n in r) return;
  No(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: To,
    tween: Co,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ai
  });
}
function Gt(e, t) {
  var n = Y(e, t);
  if (n.state > ai) throw new Error("too late; already scheduled");
  return n;
}
function Q(e, t) {
  var n = Y(e, t);
  if (n.state > nt) throw new Error("too late; already running");
  return n;
}
function Y(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function No(e, t, n) {
  var i = e.__transition, s;
  i[t] = n, n.timer = oi(o, 0, n.time);
  function o(l) {
    n.state = En, n.timer.restart(r, n.delay, n.time), n.delay <= l && r(l - n.delay);
  }
  function r(l) {
    var c, h, f, u;
    if (n.state !== En) return d();
    for (c in i)
      if (u = i[c], u.name === n.name) {
        if (u.state === nt) return kn(r);
        u.state === Sn ? (u.state = it, u.timer.stop(), u.on.call("interrupt", e, e.__data__, u.index, u.group), delete i[c]) : +c < t && (u.state = it, u.timer.stop(), u.on.call("cancel", e, e.__data__, u.index, u.group), delete i[c]);
      }
    if (kn(function() {
      n.state === nt && (n.state = Sn, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = Lt, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Lt) {
      for (n.state = nt, s = new Array(f = n.tween.length), c = 0, h = -1; c < f; ++c)
        (u = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (s[++h] = u);
      s.length = h + 1;
    }
  }
  function a(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(d), n.state = Ot, 1), h = -1, f = s.length; ++h < f; )
      s[h].call(e, c);
    n.state === Ot && (n.on.call("end", e, e.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = it, n.timer.stop(), delete i[t];
    for (var l in i) return;
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
    var s = Q(this, e), o = s.tween;
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
    var o = Q(this, e), r = o.tween;
    if (r !== i) {
      s = (i = r).slice();
      for (var a = { name: t, value: n }, d = 0, l = s.length; d < l; ++d)
        if (s[d].name === t) {
          s[d] = a;
          break;
        }
      d === l && s.push(a);
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
    var s = Q(this, i);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return Y(s, i).value[t];
  };
}
function di(e, t) {
  var n;
  return (typeof t == "number" ? ae : t instanceof Fe ? xn : (n = Fe(t)) ? (t = n, xn) : _o)(e, t);
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
    var r, a = n(this), d;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), d = a + "", r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a)));
  };
}
function Fo(e, t, n) {
  var i, s, o;
  return function() {
    var r, a = n(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), d = a + "", r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a)));
  };
}
function qo(e, t) {
  var n = pt(e), i = n === "transform" ? xo : di;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Fo : Vo)(n, i, Zt(this, "attr." + e, t)) : t == null ? (n.local ? zo : Do)(n) : (n.local ? Ho : Uo)(n, i, t));
}
function Bo(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Ko(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Wo(e, t) {
  var n, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Ko(e, o)), n;
  }
  return s._value = t, s;
}
function Xo(e, t) {
  var n, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Bo(e, o)), n;
  }
  return s._value = t, s;
}
function Yo(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = pt(e);
  return this.tween(n, (i.local ? Wo : Xo)(i, t));
}
function Go(e, t) {
  return function() {
    Gt(this, e).delay = +t.apply(this, arguments);
  };
}
function Zo(e, t) {
  return t = +t, function() {
    Gt(this, e).delay = t;
  };
}
function Jo(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Go : Zo)(t, e)) : Y(this.node(), t).delay;
}
function Qo(e, t) {
  return function() {
    Q(this, e).duration = +t.apply(this, arguments);
  };
}
function jo(e, t) {
  return t = +t, function() {
    Q(this, e).duration = t;
  };
}
function ea(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Qo : jo)(t, e)) : Y(this.node(), t).duration;
}
function ta(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Q(this, e).ease = t;
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
    Q(this, e).ease = n;
  };
}
function sa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ia(this._id, e));
}
function ra(e) {
  typeof e != "function" && (e = Fn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new ie(i, this._parents, this._name, this._id);
}
function oa(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, s = n.length, o = Math.min(i, s), r = new Array(i), a = 0; a < o; ++a)
    for (var d = t[a], l = n[a], c = d.length, h = r[a] = new Array(c), f, u = 0; u < c; ++u)
      (f = d[u] || l[u]) && (h[u] = f);
  for (; a < i; ++a)
    r[a] = t[a];
  return new ie(r, this._parents, this._name, this._id);
}
function aa(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function da(e, t, n) {
  var i, s, o = aa(t) ? Gt : Q;
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
  typeof e != "function" && (e = Bt(e));
  for (var i = this._groups, s = i.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = i[r], d = a.length, l = o[r] = new Array(d), c, h, f = 0; f < d; ++f)
      (c = a[f]) && (h = e.call(c, c.__data__, f, a)) && ("__data__" in c && (h.__data__ = c.__data__), l[f] = h, gt(l[f], t, n, f, l, Y(c, n)));
  return new ie(o, this._parents, t, n);
}
function fa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Vn(e));
  for (var i = this._groups, s = i.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = i[a], l = d.length, c, h = 0; h < l; ++h)
      if (c = d[h]) {
        for (var f = e.call(c, c.__data__, h, d), u, m = Y(c, n), _ = 0, x = f.length; _ < x; ++_)
          (u = f[_]) && gt(u, t, n, _, f, m);
        o.push(f), r.push(c);
      }
  return new ie(o, r, t, n);
}
var pa = Ke.prototype.constructor;
function ma() {
  return new pa(this._groups, this._parents);
}
function ga(e, t) {
  var n, i, s;
  return function() {
    var o = Ie(this, e), r = (this.style.removeProperty(e), Ie(this, e));
    return o === r ? null : o === n && r === i ? s : s = t(n = o, i = r);
  };
}
function li(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function _a(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = Ie(this, e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function ya(e, t, n) {
  var i, s, o;
  return function() {
    var r = Ie(this, e), a = n(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Ie(this, e))), r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a));
  };
}
function va(e, t) {
  var n, i, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = Q(this, e), l = d.on, c = d.value[o] == null ? a || (a = li(t)) : void 0;
    (l !== n || s !== c) && (i = (n = l).copy()).on(r, s = c), d.on = i;
  };
}
function wa(e, t, n) {
  var i = (e += "") == "transform" ? wo : di;
  return t == null ? this.styleTween(e, ga(e, i)).on("end.style." + e, li(e)) : typeof t == "function" ? this.styleTween(e, ya(e, i, Zt(this, "style." + e, t))).each(va(this._id, e)) : this.styleTween(e, _a(e, i, t), n).on("end.style." + e, null);
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
function ka(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Ea(e) {
  return this.tween("text", typeof e == "function" ? ka(Zt(this, "text", e)) : Ia(e == null ? "" : e + ""));
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
function Ma(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Aa(e));
}
function Ta() {
  for (var e = this._name, t = this._id, n = ci(), i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      if (d = r[l]) {
        var c = Y(d, t);
        gt(d, e, n, l, r, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new ie(i, this._parents, e, n);
}
function Ca() {
  var e, t, n = this, i = n._id, s = n.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    n.each(function() {
      var l = Q(this, i), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), l.on = t;
    }), s === 0 && o();
  });
}
var Na = 0;
function ie(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function ci() {
  return ++Na;
}
var te = Ke.prototype;
ie.prototype = {
  constructor: ie,
  select: ua,
  selectAll: fa,
  selectChild: te.selectChild,
  selectChildren: te.selectChildren,
  filter: ra,
  merge: oa,
  selection: ma,
  transition: Ta,
  call: te.call,
  nodes: te.nodes,
  node: te.node,
  size: te.size,
  empty: te.empty,
  each: te.each,
  on: la,
  attr: qo,
  attrTween: Yo,
  style: wa,
  styleTween: ba,
  text: Ea,
  textTween: Ma,
  remove: ha,
  tween: Oo,
  delay: Jo,
  duration: ea,
  ease: na,
  easeVarying: sa,
  end: Ca,
  [Symbol.iterator]: te[Symbol.iterator]
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
  e instanceof ie ? (t = e._id, e = e._name) : (t = ci(), (n = Ra).time = Yt(), e = e == null ? null : e + "");
  for (var i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && gt(d, e, t, l, r, n || La(d, t));
  return new ie(i, this._parents, e, t);
}
Ke.prototype.interrupt = Po;
Ke.prototype.transition = Oa;
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
function ne(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
ne.prototype = {
  constructor: ne,
  scale: function(e) {
    return e === 1 ? this : new ne(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ne(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Pe = new ne(1, 0, 0);
ne.prototype;
function kt(e) {
  e.stopImmediatePropagation();
}
function Ae(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function za(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ua() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function An() {
  return this.__zoom || Pe;
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
function qa() {
  var e = za, t = Ua, n = Fa, i = Ha, s = Va, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = ko, l = Wt("start", "zoom", "end"), c, h, f, u = 500, m = 150, _ = 0, x = 10;
  function y(p) {
    p.property("__zoom", An).on("wheel.zoom", oe, { passive: !1 }).on("mousedown.zoom", Xe).on("dblclick.zoom", Ye).filter(s).on("touchstart.zoom", hi).on("touchmove.zoom", ui).on("touchend.zoom touchcancel.zoom", fi).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(p, v, g, w) {
    var b = p.selection ? p.selection() : p;
    b.property("__zoom", An), p !== b ? U(p, v, g, w) : b.interrupt().each(function() {
      B(this, arguments).event(w).start().zoom(null, typeof v == "function" ? v.apply(this, arguments) : v).end();
    });
  }, y.scaleBy = function(p, v, g, w) {
    y.scaleTo(p, function() {
      var b = this.__zoom.k, E = typeof v == "function" ? v.apply(this, arguments) : v;
      return b * E;
    }, g, w);
  }, y.scaleTo = function(p, v, g, w) {
    y.transform(p, function() {
      var b = t.apply(this, arguments), E = this.__zoom, S = g == null ? P(b) : typeof g == "function" ? g.apply(this, arguments) : g, R = E.invert(S), L = typeof v == "function" ? v.apply(this, arguments) : v;
      return n(k(I(E, L), S, R), b, r);
    }, g, w);
  }, y.translateBy = function(p, v, g, w) {
    y.transform(p, function() {
      return n(this.__zoom.translate(
        typeof v == "function" ? v.apply(this, arguments) : v,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), r);
    }, null, w);
  }, y.translateTo = function(p, v, g, w, b) {
    y.transform(p, function() {
      var E = t.apply(this, arguments), S = this.__zoom, R = w == null ? P(E) : typeof w == "function" ? w.apply(this, arguments) : w;
      return n(Pe.translate(R[0], R[1]).scale(S.k).translate(
        typeof v == "function" ? -v.apply(this, arguments) : -v,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), E, r);
    }, w, b);
  };
  function I(p, v) {
    return v = Math.max(o[0], Math.min(o[1], v)), v === p.k ? p : new ne(v, p.x, p.y);
  }
  function k(p, v, g) {
    var w = v[0] - g[0] * p.k, b = v[1] - g[1] * p.k;
    return w === p.x && b === p.y ? p : new ne(p.k, w, b);
  }
  function P(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function U(p, v, g, w) {
    p.on("start.zoom", function() {
      B(this, arguments).event(w).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(w).end();
    }).tween("zoom", function() {
      var b = this, E = arguments, S = B(b, E).event(w), R = t.apply(b, E), L = g == null ? P(R) : typeof g == "function" ? g.apply(b, E) : g, G = Math.max(R[1][0] - R[0][0], R[1][1] - R[0][1]), z = b.__zoom, K = typeof v == "function" ? v.apply(b, E) : v, j = d(z.invert(L).concat(G / z.k), K.invert(L).concat(G / K.k));
      return function(W) {
        if (W === 1) W = K;
        else {
          var ee = j(W), _t = G / ee[2];
          W = new ne(_t, L[0] - ee[0] * _t, L[1] - ee[1] * _t);
        }
        S.zoom(null, W);
      };
    });
  }
  function B(p, v, g) {
    return !g && p.__zooming || new M(p, v);
  }
  function M(p, v) {
    this.that = p, this.args = v, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, v), this.taps = 0;
  }
  M.prototype = {
    event: function(p) {
      return p && (this.sourceEvent = p), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(p, v) {
      return this.mouse && p !== "mouse" && (this.mouse[1] = v.invert(this.mouse[0])), this.touch0 && p !== "touch" && (this.touch0[1] = v.invert(this.touch0[0])), this.touch1 && p !== "touch" && (this.touch1[1] = v.invert(this.touch1[0])), this.that.__zoom = v, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(p) {
      var v = Z(this.that).datum();
      l.call(
        p,
        this.that,
        new Da(p, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: l
        }),
        v
      );
    }
  };
  function oe(p, ...v) {
    if (!e.apply(this, arguments)) return;
    var g = B(this, v).event(p), w = this.__zoom, b = Math.max(o[0], Math.min(o[1], w.k * Math.pow(2, i.apply(this, arguments)))), E = he(p);
    if (g.wheel)
      (g.mouse[0][0] !== E[0] || g.mouse[0][1] !== E[1]) && (g.mouse[1] = w.invert(g.mouse[0] = E)), clearTimeout(g.wheel);
    else {
      if (w.k === b) return;
      g.mouse = [E, w.invert(E)], st(this), g.start();
    }
    Ae(p), g.wheel = setTimeout(S, m), g.zoom("mouse", n(k(I(w, b), g.mouse[0], g.mouse[1]), g.extent, r));
    function S() {
      g.wheel = null, g.end();
    }
  }
  function Xe(p, ...v) {
    if (f || !e.apply(this, arguments)) return;
    var g = p.currentTarget, w = B(this, v, !0).event(p), b = Z(p.view).on("mousemove.zoom", L, !0).on("mouseup.zoom", G, !0), E = he(p, g), S = p.clientX, R = p.clientY;
    Jr(p.view), kt(p), w.mouse = [E, this.__zoom.invert(E)], st(this), w.start();
    function L(z) {
      if (Ae(z), !w.moved) {
        var K = z.clientX - S, j = z.clientY - R;
        w.moved = K * K + j * j > _;
      }
      w.event(z).zoom("mouse", n(k(w.that.__zoom, w.mouse[0] = he(z, g), w.mouse[1]), w.extent, r));
    }
    function G(z) {
      b.on("mousemove.zoom mouseup.zoom", null), Qr(z.view, w.moved), Ae(z), w.event(z).end();
    }
  }
  function Ye(p, ...v) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, w = he(p.changedTouches ? p.changedTouches[0] : p, this), b = g.invert(w), E = g.k * (p.shiftKey ? 0.5 : 2), S = n(k(I(g, E), w, b), t.apply(this, v), r);
      Ae(p), a > 0 ? Z(this).transition().duration(a).call(U, S, w, p) : Z(this).call(y.transform, S, w, p);
    }
  }
  function hi(p, ...v) {
    if (e.apply(this, arguments)) {
      var g = p.touches, w = g.length, b = B(this, v, p.changedTouches.length === w).event(p), E, S, R, L;
      for (kt(p), S = 0; S < w; ++S)
        R = g[S], L = he(R, this), L = [L, this.__zoom.invert(L), R.identifier], b.touch0 ? !b.touch1 && b.touch0[2] !== L[2] && (b.touch1 = L, b.taps = 0) : (b.touch0 = L, E = !0, b.taps = 1 + !!c);
      c && (c = clearTimeout(c)), E && (b.taps < 2 && (h = L[0], c = setTimeout(function() {
        c = null;
      }, u)), st(this), b.start());
    }
  }
  function ui(p, ...v) {
    if (this.__zooming) {
      var g = B(this, v).event(p), w = p.changedTouches, b = w.length, E, S, R, L;
      for (Ae(p), E = 0; E < b; ++E)
        S = w[E], R = he(S, this), g.touch0 && g.touch0[2] === S.identifier ? g.touch0[0] = R : g.touch1 && g.touch1[2] === S.identifier && (g.touch1[0] = R);
      if (S = g.that.__zoom, g.touch1) {
        var G = g.touch0[0], z = g.touch0[1], K = g.touch1[0], j = g.touch1[1], W = (W = K[0] - G[0]) * W + (W = K[1] - G[1]) * W, ee = (ee = j[0] - z[0]) * ee + (ee = j[1] - z[1]) * ee;
        S = I(S, Math.sqrt(W / ee)), R = [(G[0] + K[0]) / 2, (G[1] + K[1]) / 2], L = [(z[0] + j[0]) / 2, (z[1] + j[1]) / 2];
      } else if (g.touch0) R = g.touch0[0], L = g.touch0[1];
      else return;
      g.zoom("touch", n(k(S, R, L), g.extent, r));
    }
  }
  function fi(p, ...v) {
    if (this.__zooming) {
      var g = B(this, v).event(p), w = p.changedTouches, b = w.length, E, S;
      for (kt(p), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, u), E = 0; E < b; ++E)
        S = w[E], g.touch0 && g.touch0[2] === S.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === S.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (S = he(S, this), Math.hypot(h[0] - S[0], h[1] - S[1]) < x)) {
        var R = Z(this).on("dblclick.zoom");
        R && R.apply(this, arguments);
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
    return arguments.length ? (d = p, y) : d;
  }, y.on = function() {
    var p = l.on.apply(l, arguments);
    return p === l ? y : p;
  }, y.clickDistance = function(p) {
    return arguments.length ? (_ = (p = +p) * p, y) : Math.sqrt(_);
  }, y.tapDistance = function(p) {
    return arguments.length ? (x = +p, y) : x;
  }, y;
}
var Ba = Object.defineProperty, Ka = Object.getOwnPropertyDescriptor, H = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ka(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && Ba(t, n, s), s;
};
function Wa(e, t, n, i) {
  const s = t.x - e.x, o = t.y - e.y, r = i.x - n.x, a = i.y - n.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const l = ((n.x - e.x) * a - (n.y - e.y) * r) / d, c = ((n.x - e.x) * o - (n.y - e.y) * s) / d;
  return l <= 0.02 || l >= 0.98 || c <= 0.02 || c >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * o, t: l };
}
function Xa(e, t, n) {
  const i = n.x - t.x, s = n.y - t.y, o = i * i + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * s) / o)), a = t.x + r * i, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function Ya(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, l = (r.y - o.y) / a, c = t.map(([f, u]) => Wa(o, r, f, u)).filter((f) => f !== null).filter((f) => f.t * a > n + 2 && (1 - f.t) * a > n + 2).sort((f, u) => f.t - u.t);
    let h = -1 / 0;
    for (const f of c)
      f.t * a - n <= h + 2 || (i += ` L ${f.x - d * n} ${f.y - l * n}`, i += ` A ${n} ${n} 0 0 1 ${f.x + d * n} ${f.y + l * n}`, h = f.t * a + n);
    i += ` L ${r.x} ${r.y}`;
  }
  return i;
}
const je = {
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
  readmodel: A`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  usecase: A`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: A`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let D = class extends me {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Pe, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
          if (n != null && n.parentId && !t && n.kind !== "domain-event" && n.kind !== "application-event" && n.kind !== "read-model" && n.kind !== "domain-service")
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
    this._zoomBehavior = qa().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Z(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((c) => c.x - c.w / 2)) - e, o = Math.max(...t.map((c) => c.x + c.w / 2)) + e, r = Math.min(...t.map((c) => c.y - c.h / 2)) - e, a = Math.max(...t.map((c) => c.y + c.h / 2)) + e, d = Math.max(0.15, Math.min(i.width / (o - s), i.height / (a - r), 1.25)), l = Pe.translate(i.width / 2 - d * (s + o) / 2, i.height / 2 - d * (r + a) / 2).scale(d);
    Z(n).call(this._zoomBehavior.transform, l);
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
        const s = this.nodePos(i), o = s.x - i.w / 2 + 10 + e.w / 2, r = s.x + i.w / 2 - 10 - e.w / 2, a = s.y - i.h / 2 + 34 + e.h / 2, d = s.y + i.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), r), n = Math.min(Math.max(n, a), d);
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
      const d = this.toScene(a), l = d.x - n.x, c = d.y - n.y;
      !s && Math.hypot(l, c) < 3 / this._t.k || (s = !0, this._dragPos = this.clampToParent(t, i.x + l, i.y + c));
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((_) => _.parentId === t.id), d = Math.min(...a.map((_) => _.x - _.w / 2)), l = Math.max(...a.map((_) => _.x + _.w / 2)), c = Math.min(...a.map((_) => _.y - _.h / 2)), h = Math.max(...a.map((_) => _.y + _.h / 2)), f = pi(
      a.map((_) => ({ dx: _.x - r.x, dy: _.y - r.y, w: _.w, h: _.h })),
      { w: s, h: o }
    ), u = (_) => {
      const x = this.toScene(_);
      if (_.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(f.w, 2 * Math.abs(x.x - r.x)),
          h: Math.max(f.h, 2 * Math.abs(x.y - r.y))
        };
        return;
      }
      const y = r.x - n * r.w / 2, I = r.y - i * r.h / 2, k = n > 0 ? Math.max(x.x, y + s, a.length ? l + 10 : -1 / 0) : Math.min(x.x, y - s, a.length ? d - 10 : 1 / 0), P = i > 0 ? Math.max(x.y, I + o, a.length ? h + 10 : -1 / 0) : Math.min(x.y, I - o, a.length ? c - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (y + k) / 2,
        y: (I + P) / 2,
        w: Math.abs(k - y),
        h: Math.abs(P - I)
      };
    }, m = () => {
      window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", u), window.addEventListener("pointerup", m);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const i = (o) => {
      var l;
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y };
      const a = (l = this.shadowRoot) == null ? void 0 : l.elementFromPoint(o.clientX, o.clientY), d = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = d ? d.getAttribute("data-node-id") : null;
    }, s = (o) => {
      var d, l;
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s);
      const r = (d = this.shadowRoot) == null ? void 0 : d.elementFromPoint(o.clientX, o.clientY), a = (l = r == null ? void 0 : r.closest("[data-node-id]")) == null ? void 0 : l.getAttribute("data-node-id");
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
    const { x: i, y: s } = this.nodePos(e), o = t - i, r = n - s, a = e.w / 2, d = e.h / 2;
    if (o === 0 && r === 0) return { x: i, y: s };
    const l = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / d);
    return { x: i + o * l, y: s + r * l };
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
    const t = this.scene.nodes.find((c) => c.id === e.sourceId), n = this.scene.nodes.find((c) => c.id === e.targetId);
    if (!t || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(n), r = i[0] ?? o, a = i[i.length - 1] ?? s;
    let d = this.borderPoint(t, r.x, r.y), l = this.borderPoint(n, a.x, a.y);
    if (!i.length) {
      const c = this.edgeOffset(e);
      if (c !== 0) {
        const h = Math.hypot(l.x - d.x, l.y - d.y) || 1, f = -(l.y - d.y) / h * c, u = (l.x - d.x) / h * c;
        d = { x: d.x + f, y: d.y + u }, l = { x: l.x + f, y: l.y + u };
      }
    }
    return [d, ...i, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, n) {
    this._wpDrag = { edgeId: e.id, points: t, index: n };
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
  nearestSegment(e, t) {
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < e.length - 1; i++) {
      const { dist: s } = Xa(t, e[i], e[i + 1]);
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
    const r = (d) => {
      const l = this.toScene(d);
      if (o) {
        if (this._wpDrag) {
          const c = [...this._wpDrag.points];
          c[s] = l, this._wpDrag = { ...this._wpDrag, points: c };
        }
      } else {
        if (Math.hypot(l.x - i.x, l.y - i.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const c = [...this.edgePoints[t.id] ?? []];
        c.splice(s, 0, l), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: c, index: s };
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
    }, d = t.slice(1, -1), l = t.map((c) => `${c.x},${c.y}`).join(" ");
    return A`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${l}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(c) => {
      c.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(c) => {
      c.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(c));
    }}
              @pointerdown=${(c) => this.onEdgeHitPointerDown(c, e, t)}>
          ${e.tooltip ? A`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${Ya(t, n)}
              fill="none"
              stroke=${i} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${e.label ? A`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${i}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(c) => {
      c.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(c) => {
      c.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: c.clientX,
        y: c.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${s ? d.map((c, h) => {
      var u;
      const f = ((u = this._selectedWaypoint) == null ? void 0 : u.edgeId) === e.id && this._selectedWaypoint.index === h;
      return A`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(m) => {
        m.button === 0 && (m.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: h }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], h));
      }}
                        @dblclick=${(m) => {
        m.stopPropagation(), this.removeWaypoint(e, h);
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
    var f, u;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, d = ((u = this._resize) == null ? void 0 : u.id) === e.id ? this._resize.h : e.h, l = a / 2, c = d / 2, h = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return A`
      <g data-node-id=${e.id} transform="translate(${t}, ${n})"
         @pointerdown=${(m) => this.onNodePointerDown(m, e)}
         @dblclick=${(m) => {
      m.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        <rect x=${-l} y=${-c} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? A`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? A`<text x=${-l} y=${-c - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && je[e.symbol] && !r ? A`<g transform="translate(${l - 17}, ${-c + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${je[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && je[e.symbol] ? A`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${je[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? A`
              <foreignObject x=${-l + 6} y=${o ? -c + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(m) => m.stopPropagation()}
                  @keydown=${(m) => {
      m.stopPropagation(), m.key === "Enter" && this.commitRename(e, m.target.value), m.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(m) => this.commitRename(e, m.target.value)}
                />
              </foreignObject>` : r ? A`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? A`<text x=${-l + 12} y=${-c + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : A`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? A`<line x1=${-l + 8} y1=${-c + 28} x2=${l - 8} y2=${-c + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (!r || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event") ? [
      [l, 0],
      [-l, 0],
      [0, c],
      [0, -c]
    ].map(
      ([m, _]) => A`
                <circle data-handle cx=${m} cy=${_} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(x) => this.onHandlePointerDown(x, e)}>
                  <title>${r ? e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "use-case" ? "Arrastra hasta un evento de aplicación para declarar que lo publica" : "Arrastra hasta un evento de dominio para declarar que lo emite" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([m, _]) => A`
                <rect data-resize x=${m * l - 6.5} y=${_ * c - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${m * _ > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(x) => this.onResizePointerDown(x, e, m, _)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return A``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!e) return A``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return A`
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
        const { a: o, b: r } = this._rubber, a = Math.min(o.x, r.x), d = Math.max(o.x, r.x), l = Math.min(o.y, r.y), c = Math.max(o.y, r.y), h = this.scene.nodes.filter((f) => {
          const u = this.nodePos(f);
          return u.x >= a && u.x <= d && u.y >= l && u.y <= c;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: h });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return A``;
    const { a: e, b: t } = this._rubber;
    return A`
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
    const i = this.getBoundingClientRect(), s = this._t.k, o = Pe.translate(i.width / 2 - s * e, i.height / 2 - s * t).scale(s);
    Z(n).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - i.left) / n, o = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return T``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return T`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(l) => {
      l.stopPropagation();
      try {
        l.currentTarget.setPointerCapture(l.pointerId);
      } catch {
      }
      this.onMinimapPointer(l, e, i);
    }}
        @pointermove=${(l) => {
      var c, h;
      (h = (c = l.currentTarget).hasPointerCapture) != null && h.call(c, l.pointerId) && this.onMinimapPointer(l, e, i);
    }}
      >
        <svg viewBox="0 0 ${t} ${n}">
          ${this.scene.nodes.map((l) => {
      const c = this.nodePos(l);
      return A`<rect
              x=${(c.x - l.w / 2 - e.minX) * i}
              y=${(c.y - l.h / 2 - e.minY) * i}
              width=${Math.max(2, l.w * i)}
              height=${Math.max(2, l.h * i)}
              rx="1" fill=${l.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * i}
            y=${(r - e.minY) * i}
            width=${a * i}
            height=${d * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((r) => r.color ?? "#64748b"))], t = [], n = this.scene.edges.map((r) => {
      const a = this.edgePolyline(r);
      if (!a) return A``;
      const d = this.renderEdge(r, a, [...t]);
      for (let l = 0; l < a.length - 1; l++) t.push([a[l], a[l + 1]]);
      return d;
    }), i = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (i.has(r.sourceId) || i.has(r.targetId) ? o : s).push(
        n[a]
      );
    }), T`
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
      (r) => A`
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
D.styles = Ht`
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
H([
  re({ attribute: !1 })
], D.prototype, "scene", 2);
H([
  re({ attribute: !1 })
], D.prototype, "selectedId", 2);
H([
  re({ attribute: !1 })
], D.prototype, "selectedIds", 2);
H([
  re({ type: Boolean })
], D.prototype, "connectable", 2);
H([
  re({ attribute: !1 })
], D.prototype, "edgePoints", 2);
H([
  $()
], D.prototype, "_t", 2);
H([
  $()
], D.prototype, "_dragPos", 2);
H([
  $()
], D.prototype, "_pendingLink", 2);
H([
  $()
], D.prototype, "_hoverNodeId", 2);
H([
  $()
], D.prototype, "_editingId", 2);
H([
  $()
], D.prototype, "_spaceDown", 2);
H([
  $()
], D.prototype, "_wpDrag", 2);
H([
  $()
], D.prototype, "_selectedWaypoint", 2);
H([
  $()
], D.prototype, "_resize", 2);
H([
  $()
], D.prototype, "_rubber", 2);
D = H([
  qt("modux-canvas")
], D);
async function Ga(e, t) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((d) => d.e), i = new n(), o = {
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
    children: e.nodes.map((d) => ({ id: d.id, width: d.w, height: d.h })),
    edges: e.edges.map((d) => ({ id: d.id, sources: [d.sourceId], targets: [d.targetId] }))
  }, r = await i.layout(o), a = {};
  for (const d of r.children ?? [])
    a[d.id] = {
      x: (d.x ?? 0) + (d.width ?? 0) / 2,
      y: (d.y ?? 0) + (d.height ?? 0) / 2
    };
  return a;
}
var Za = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, N = (e, t, n, i) => {
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
], ed = ["CORE", "SUPPORTING", "GENERIC"], V = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
let C = class extends me {
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
    return gi(this.layout[e]);
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
    this._detail = e, e !== "detail" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && (this._newContextMapKind = "module"), this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: e });
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
      case "add-external-system":
        return [{ kind: "remove-external-system", id: e.id }];
      case "remove-external-system": {
        const t = this.model.externalSystems.find((n) => n.id === e.id);
        return t ? [{ kind: "add-external-system", id: t.id, name: t.name }] : null;
      }
      case "add-actor":
        return [{ kind: "remove-actor", id: e.id }];
      case "remove-actor": {
        const t = (this.model.actors ?? []).find((n) => n.id === e.id);
        return t ? [{ kind: "add-actor", id: t.id, name: t.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const t of this.model.modules) {
          const n = (t.applicationEvents ?? []).find((i) => i.id === e.id);
          if (n)
            return [{ kind: "add-application-event", id: n.id, name: n.name, moduleId: t.id }];
        }
        return null;
      }
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
        const n = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((i) => i.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((i) => i.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((i) => i.domainServices ?? []) : e.type === "application-event" ? this.model.modules.flatMap((i) => i.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : this.model.entities ?? []).find((i) => i.id === e.id);
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
    const d = this.sceneFor(s), l = d.nodes.find((h) => h.id === t);
    if (l != null && l.parentId) {
      const h = d.nodes.find((f) => f.id === l.parentId);
      h && (a = { x: n - h.x, y: i - h.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const c = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const f = this.inverseOf(h);
        f && c.unshift(...f), this.command(h, !1);
      }
    }
    this.pushUndoEntry(c);
  }
  onNodeResized(e) {
    var c;
    const { id: t, x: n, y: i, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((h) => h.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((c = a.sizes) == null ? void 0 : c[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...d.map((h) => ({ kind: "move-node", view: r, id: h.id, pos: a.nodes[h.id] ?? null }))
    ]);
    const l = { ...a.nodes, [t]: { x: n, y: i } };
    for (const h of d) l[h.id] = { x: h.x - n, y: h.y - i };
    this.writeViewLayout(r, {
      ...a,
      nodes: l,
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
    const n = Qt(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
      this.model.modules.flatMap((u) => (u.domainEvents ?? []).map((m) => m.id))
    ), r = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((u) => u.id),
      ...this.model.modules.flatMap((u) => (u.domainServices ?? []).map((m) => m.id))
    ]), a = new Set(
      this.model.modules.flatMap((u) => (u.applicationEvents ?? []).map((m) => m.id))
    ), d = new Set(this.model.modules.flatMap((u) => (u.useCases ?? []).map((m) => m.id)));
    if (r.has(t) && o.has(n) || d.has(t) && a.has(n)) {
      (this.model.emissions ?? []).some(
        (m) => m.sourceId === t && m.domainEventId === n
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: n });
      return;
    }
    if (o.has(t) || a.has(t)) {
      const u = a.has(t), m = this.model.modules.flatMap((M) => (u ? M.applicationEvents : M.domainEvents) ?? []).find((M) => M.id === t), _ = this.model.modules.flatMap((M) => (M.readModels ?? []).map((oe) => ({ rm: oe, module: M }))).find(({ rm: M }) => M.id === n), x = this.model.modules.find((M) => M.id === n) ?? (_ == null ? void 0 : _.module);
      if (!m || !x) return;
      const y = new Set((this.model.aggregates ?? []).map((M) => M.id)), I = new Set(
        this.model.modules.flatMap((M) => (M.domainServices ?? []).map((oe) => oe.id))
      ), k = (this.model.emissions ?? []).find(
        (M) => M.domainEventId === t && (u ? d.has(M.sourceId) : y.has(M.sourceId) || I.has(M.sourceId))
      );
      if (!k) {
        this.emit("modux-notice", {
          message: u ? `Declara primero qué caso de uso publica ${m.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${m.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const P = !u && y.has(k.sourceId), U = (_ == null ? void 0 : _.rm.name) ?? `${m.name}View`;
      if (this.model.flows.some(
        (M) => M.archetype === "MATERIALIZES" && M.triggerEvent === m.name && M.targetId === x.id && M.readModelName === U
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${V(m.name)}-${V(U)}`,
        name: U,
        archetype: "MATERIALIZES",
        triggerAggregateId: P ? k.sourceId : "",
        triggerDomainServiceId: !u && !P ? k.sourceId : void 0,
        triggerUseCaseId: u ? k.sourceId : void 0,
        triggerEvent: m.name,
        targetId: x.id,
        readModelName: U
      });
      return;
    }
    const l = /* @__PURE__ */ new Set([
      ...r,
      ...d,
      ...this.model.modules.flatMap((u) => (u.readModels ?? []).map((m) => m.id))
    ]);
    if (l.has(t) || l.has(n) || o.has(n) || a.has(n))
      return;
    const c = new Set(this.model.externalSystems.map((u) => u.id));
    if (c.has(t) || c.has(n)) return;
    const h = new Set((this.model.actors ?? []).map((u) => u.id));
    h.has(t) || h.has(n) || this.model.relations.some(
      (u) => u.sourceId === t && u.targetId === n || u.sourceId === n && u.targetId === t
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
    if (t === "node" && i === "application-event") {
      this._selectedId = null, this.command({ kind: "remove-application-event", id: n });
      return;
    }
    if (t === "node" && i === "external-system") {
      this._selectedId = null, this.command({ kind: "remove-external-system", id: n });
      return;
    }
    if (t === "node" && i === "actor") {
      this._selectedId = null, this.command({ kind: "remove-actor", id: n });
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
    (n === "module" || n === "aggregate" || n === "entity" || n === "process-step" || n === "domain-event" || n === "read-model" || n === "domain-service" || n === "application-event" || n === "external-system" || n === "actor") && this.command({ kind: "rename-element", type: n, id: t.replace(/^tgt:/, ""), name: i });
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
      id: `step-${V(e)}`,
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${V(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), n = this.model.modules.filter((d) => t.has(d.id)), i = new Set(n.map((d) => d.id)), s = this.model.externalSystems.filter((d) => t.has(d.id)), o = new Set(s.map((d) => d.id)), r = (this.model.aggregates ?? []).filter(
      (d) => t.has(d.id) || i.has(d.moduleId)
    ), a = new Set(r.map((d) => d.id));
    return {
      ...this.model,
      modules: n,
      externalSystems: s,
      relations: this.model.relations.filter(
        (d) => i.has(d.sourceId) && i.has(d.targetId)
      ),
      flows: this.model.flows.filter(
        (d) => t.has(d.id) || (i.has(d.sourceId) || o.has(d.sourceId)) && (i.has(d.targetId) || o.has(d.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((d) => a.has(d.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (d) => a.has(d.sourceAggregateId) && a.has(d.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (d) => t.has(d.id) || (d.ownerModuleId ? i.has(d.ownerModuleId) : !1)
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
    var t, n, i, s, o, r, a, d, l, c, h, f, u, m, _, x;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${V(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: V(e), name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const y = (t = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : t.id, I = this._newModuleId || y || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!I) return;
          this.command({ kind: "add-domain-event", id: `ev-${V(e)}`, name: e, moduleId: I });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const y = (i = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : i.id, I = this._newModuleId || y || ((s = this.model.modules[0]) == null ? void 0 : s.id);
          if (!I) return;
          this.command({ kind: "add-application-event", id: `aev-${V(e)}`, name: e, moduleId: I });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const y = (o = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : o.id, I = this._newModuleId || y || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!I) return;
          this.command({ kind: "add-domain-service", id: `ds-${V(e)}`, name: e, moduleId: I });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const y = (a = (this.model.aggregates ?? []).find((k) => k.id === this._selectedId)) == null ? void 0 : a.id, I = this._newAggregateId || y || ((l = (d = this.model.aggregates) == null ? void 0 : d[0]) == null ? void 0 : l.id);
          if (!I) return;
          this.command({ kind: "add-read-model", id: `rm-${V(e)}`, name: e, aggregateId: I });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${V(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const y = this._newModuleId || ((c = this.model.modules[0]) == null ? void 0 : c.id);
        if (!y) return;
        this.command({ kind: "add-aggregate", id: `agg-${V(e)}`, name: e, moduleId: y });
      } else if (this._view === "flows") {
        const y = this._newTriggerAggId || ((f = (h = this.model.aggregates) == null ? void 0 : h[0]) == null ? void 0 : f.id), I = this._newTargetId || ((u = this.model.modules[0]) == null ? void 0 : u.id), k = this._newTriggerEvent.trim();
        if (!y || !I || !k) return;
        this.command({
          kind: "add-flow",
          id: `flow-${V(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: y,
          triggerEvent: k,
          targetId: I
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const y = this._newModuleId || ((m = this.model.modules[0]) == null ? void 0 : m.id);
        if (!y) return;
        this.command({
          kind: "add-process",
          id: `proc-${V(e)}`,
          name: e,
          moduleId: y,
          triggerAggregateId: this._newTriggerAggId || ((x = (_ = this.model.aggregates) == null ? void 0 : _[0]) == null ? void 0 : x.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), n = this.filteredModel();
    return e === "aggregates" ? Oi(n, t.nodes) : e === "flows" ? Ki(n, t.nodes) : e === "processes" ? Qt(n, t.nodes) : Mi(n, t.nodes, this._detail === "detail", t.sizes ?? {});
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((l) => !l.parentId), i = new Set(n.map((l) => l.id)), s = {
      nodes: n,
      edges: t.edges.filter((l) => i.has(l.sourceId) && i.has(l.targetId))
    }, r = await Ga(s, e === "flows" || e === "processes" ? "layered" : "force"), a = this.viewLayout(e);
    this.pushUndoEntry([
      ...n.map((l) => ({
        kind: "move-node",
        view: e,
        id: l.id,
        pos: a.nodes[l.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(a.edges).map((l) => ({
        kind: "set-edge-points",
        view: e,
        id: l,
        points: a.edges[l]
      }))
    ]), this.writeViewLayout(e, { nodes: r, edges: {}, sizes: a.sizes }), await this.updateComplete, (d = this.renderRoot.querySelector("modux-canvas")) == null || d.fit();
  }
  render() {
    const e = this.sceneFor(this._view);
    return T`
      <div class="toolbar">
        <div class="tabs">
          ${ja.map(
      (t) => T`
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
      (t) => T`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        <div class="spacer"></div>
        ${this._multi.length ? T`
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
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : "Nuevo read model…",
      aggregates: "Nuevo agregado…",
      flows: "Nuevo flow…",
      processes: "Nuevo proceso…"
    }[this._view]}
          .value=${this._newName}
          @input=${(t) => this._newName = t.target.value}
          @keydown=${(t) => t.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "context-map" ? T`<select
              title="Qué crear en el lienzo"
              @change=${(t) => this._newContextMapKind = t.target.value}
            >
              <option value="module" ?selected=${this._newContextMapKind === "module"}>
                Contexto
              </option>
              <option
                value="external-system"
                ?selected=${this._newContextMapKind === "external-system"}
              >
                Sistema externo
              </option>
              <option value="actor" ?selected=${this._newContextMapKind === "actor"}>
                Actor
              </option>
              ${this._detail === "detail" ? T`
                    <option
                      value="domain-event"
                      ?selected=${this._newContextMapKind === "domain-event"}
                    >
                      Evento de dominio
                    </option>
                    <option
                      value="application-event"
                      ?selected=${this._newContextMapKind === "application-event"}
                    >
                      Evento de aplicación
                    </option>
                    <option
                      value="read-model"
                      ?selected=${this._newContextMapKind === "read-model"}
                    >
                      Read model
                    </option>
                    <option
                      value="domain-service"
                      ?selected=${this._newContextMapKind === "domain-service"}
                    >
                      Servicio de dominio
                    </option>
                  ` : ""}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "read-model" ? T`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return T`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? T`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${ed.map(
      (t) => T`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service") ? T`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var n;
        return T`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? T`
              ${this._view === "flows" ? T`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => T`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return T`<option
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
              ${this._view === "flows" ? T`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var n;
        return T`<option
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? T`
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
      (t) => T`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? T`<input
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
              ${this.owningProcessOf(this._selectedId) ? T`
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
        ${this._view === "context-map" ? T`Arrastra para reordenar · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : T`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return T`
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
      (i) => T`
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
C.styles = Ht`
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
  re({ attribute: !1 })
], C.prototype, "model", 2);
N([
  re({ attribute: !1 })
], C.prototype, "layout", 2);
N([
  $()
], C.prototype, "_view", 2);
N([
  $()
], C.prototype, "_detail", 2);
N([
  $()
], C.prototype, "_relationType", 2);
N([
  $()
], C.prototype, "_relationPicker", 2);
N([
  $()
], C.prototype, "_selectedId", 2);
N([
  $()
], C.prototype, "_newName", 2);
N([
  $()
], C.prototype, "_newSubdomain", 2);
N([
  $()
], C.prototype, "_newModuleId", 2);
N([
  $()
], C.prototype, "_newContextMapKind", 2);
N([
  $()
], C.prototype, "_newAggregateId", 2);
N([
  $()
], C.prototype, "_newArchetype", 2);
N([
  $()
], C.prototype, "_newTriggerAggId", 2);
N([
  $()
], C.prototype, "_newTriggerEvent", 2);
N([
  $()
], C.prototype, "_newTargetId", 2);
N([
  $()
], C.prototype, "_undoStack", 2);
N([
  $()
], C.prototype, "_redoStack", 2);
N([
  $()
], C.prototype, "_newStepName", 2);
N([
  $()
], C.prototype, "_newStepType", 2);
N([
  $()
], C.prototype, "_newStepRole", 2);
N([
  $()
], C.prototype, "_newStepDeadline", 2);
N([
  $()
], C.prototype, "_editStepRole", 2);
N([
  $()
], C.prototype, "_editStepDeadline", 2);
N([
  $()
], C.prototype, "_editStepComp", 2);
N([
  $()
], C.prototype, "_multi", 2);
N([
  $()
], C.prototype, "_newViewName", 2);
N([
  $()
], C.prototype, "_activeViewId", 2);
C = N([
  qt("modux-editor")
], C);
var id = Object.defineProperty, sd = Object.getOwnPropertyDescriptor, ve = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? sd(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && id(t, n, s), s;
};
let se = class extends me {
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
    return this._error ? T`<div class="status error">modux editor: ${this._error}</div>` : this._model ? T`
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(e) => this.showToast(e.detail.message, e.detail.kind ?? "info")}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? T`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : T`<div class="status">Cargando el modelo…</div>`;
  }
};
se.styles = Ht`
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
ve([
  re()
], se.prototype, "base", 2);
ve([
  $()
], se.prototype, "_model", 2);
ve([
  $()
], se.prototype, "_layout", 2);
ve([
  $()
], se.prototype, "_error", 2);
ve([
  $()
], se.prototype, "_saving", 2);
ve([
  $()
], se.prototype, "_toast", 2);
se = ve([
  qt("modux-editor-connected")
], se);
export {
  rd as CONTAINER_HEADER,
  od as CONTAINER_INSET,
  D as ModuxCanvas,
  C as ModuxEditor,
  se as ModuxEditorConnected,
  Oi as aggregatesScene,
  mi as containerFit,
  pi as containerMinSize,
  Mi as contextMapScene,
  bi as flowCoherence,
  Ki as flowsScene,
  gi as normalizeViewLayout,
  Qt as processesScene,
  $i as relationEdgeId
};
