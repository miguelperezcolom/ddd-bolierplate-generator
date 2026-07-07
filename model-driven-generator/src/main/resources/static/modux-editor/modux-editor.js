const od = 34, ad = 10;
function mi(e, t = { w: 160, h: 90 }) {
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
function gi(e, t, n) {
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
function yi(e) {
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
}, vi = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, wi = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, At = 168, Ct = 56, Nn = 34, Pn = 14, xi = 14, ze = 108, Ue = 32, Rn = 12, Ln = 10, He = 2, Ii = He * ze + (He - 1) * Rn + 2 * Pn;
function $i(e, t) {
  return `rel:${e}->${t}`;
}
function bi(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some((i) => i.sourceId === t.sourceId && i.targetId === t.targetId) ? "OK" : e.relations.some((i) => i.sourceId === t.targetId && i.targetId === t.sourceId) ? "REVERSED" : "MISSING_RELATION";
}
function jt(e, t) {
  const n = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const ki = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" },
  "query-service": { symbol: "lens", fill: "#f0f9ff", stroke: "#0284c7" },
  "external-use-case": { symbol: "usecase", fill: "#f8fafc", stroke: "#64748b" }
}, Ei = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Query service",
  "external-use-case": "Caso de uso externo"
};
function Si(e) {
  const t = Math.max(1, Math.ceil(e / He)), n = t * Ue + (t - 1) * Ln;
  return { w: Ii, h: Nn + n + xi };
}
function Ai(e, t) {
  const n = e % He, i = Math.floor(e / He);
  return {
    x: -t.w / 2 + Pn + n * (ze + Rn) + ze / 2,
    y: -t.h / 2 + Nn + i * (Ue + Ln) + Ue / 2
  };
}
function Ci(e, t, n, i, s, o) {
  const a = [
    ...(e.aggregates ?? []).filter((d) => d.moduleId === t.id).map((d) => ({ id: d.id, name: d.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map((d) => ({ id: d.id, name: d.name, kind: "use-case" })),
    ...(t.domainEvents ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "query-service" })
    )
  ];
  return a.length ? On(n, i, a, s, o) : [{ ...i, x: n.x, y: n.y, w: At, h: Ct }];
}
function On(e, t, n, i, s) {
  const o = s[t.id] ?? Si(n.length), r = n.map((c, h) => i[c.id] ?? Ai(h, o)), a = gi(
    e,
    o,
    r.map((c) => ({ dx: c.x, dy: c.y, w: ze, h: Ue }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, l = n.map((c, h) => {
    const f = r[h], m = ki[c.kind];
    return {
      id: c.id,
      label: c.name,
      kind: c.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: ze,
      h: Ue,
      symbol: m.symbol,
      fill: m.fill,
      stroke: m.stroke,
      parentId: t.id,
      tooltip: `${Ei[c.kind]} ${c.name}`
    };
  });
  return [d, ...l];
}
function Mi(e, t, n = !1, i = {}) {
  const s = [
    ...e.modules.map((u) => ({ ref: u, external: !1 })),
    ...e.externalSystems.map((u) => ({ ref: u, external: !0 }))
  ], o = s.flatMap((u, _) => {
    const x = t[u.ref.id] ?? jt(_, s.length);
    if (u.external) {
      const P = u.ref, $ = {
        id: P.id,
        label: P.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${P.name} (sistema externo)`
      };
      return n && (P.useCases ?? []).length > 0 ? On(
        x,
        $,
        (P.useCases ?? []).map((E) => ({ id: E.id, name: E.name, kind: "external-use-case" })),
        t,
        i
      ) : [{ ...$, x: x.x, y: x.y, w: At, h: Ct }];
    }
    const M = u.ref, O = M.subdomainType ?? "GENERIC", U = {
      id: M.id,
      label: M.name,
      kind: "module",
      symbol: "component",
      fill: _i[O],
      stroke: "#94a3b8",
      badge: O,
      tooltip: `${M.name} — subdominio ${O}`
    };
    return n ? Ci(e, M, x, U, t, i) : [{ ...U, x: x.x, y: x.y, w: At, h: Ct }];
  }), r = s.length + (e.actors ?? []).length;
  (e.actors ?? []).forEach((u, _) => {
    const x = t[u.id] ?? jt(s.length + _, r);
    o.push({
      id: u.id,
      label: u.name,
      x: x.x,
      y: x.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${u.name} (actor)`
    });
  }), o.sort((u, _) => (u.parentId ? 1 : 0) - (_.parentId ? 1 : 0));
  const a = e.relations.map((u) => ({
    id: $i(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: vi[u.type],
    color: "#475569",
    arrow: !0,
    tooltip: `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)`
  })), d = e.flows.map((u) => {
    var P, $, E, z, S, X;
    const _ = bi(e, u), x = n ? e.modules.find((W) => W.id === u.sourceId) : void 0, M = ((P = x == null ? void 0 : x.domainEvents) == null ? void 0 : P.find((W) => W.name === u.triggerEvent)) ?? (($ = x == null ? void 0 : x.applicationEvents) == null ? void 0 : $.find((W) => W.name === u.triggerEvent)), O = n && u.readModelName ? (z = (E = e.modules.find((W) => W.id === u.targetId)) == null ? void 0 : E.readModels) == null ? void 0 : z.find((W) => W.name === u.readModelName) : void 0, U = n && u.targetUseCaseId ? (X = (S = e.modules.find((W) => W.id === u.targetId)) == null ? void 0 : S.useCases) == null ? void 0 : X.find((W) => W.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (M == null ? void 0 : M.id) ?? u.sourceId,
      targetId: (U == null ? void 0 : U.id) ?? (O == null ? void 0 : O.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: wi[_],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${_}`
    };
  }), l = new Set(o.map((u) => u.id)), c = n ? (e.emissions ?? []).filter((u) => l.has(u.sourceId) && l.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], h = n ? (e.useCaseCalls ?? []).filter((u) => l.has(u.sourceId) && l.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], f = n ? (e.queryCalls ?? []).filter((u) => l.has(u.sourceId) && l.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], m = n ? (e.actorUses ?? []).filter((u) => l.has(u.actorId) && l.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], v = n ? (e.externalCalls ?? []).filter((u) => l.has(u.externalSystemId) && l.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], g = n ? (e.externalUseCaseCalls ?? []).filter((u) => l.has(u.sourceId) && l.has(u.targetId)).map((u) => ({
    id: `extuccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [];
  return {
    nodes: o,
    edges: [
      ...a,
      ...d,
      ...c,
      ...h,
      ...f,
      ...m,
      ...v,
      ...g
    ]
  };
}
const Ti = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ni = 176, Pi = 60, Ri = 140, Li = 40;
function Oi(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    n.filter((d) => d.moduleId === s.id).forEach((d, l) => {
      const c = i.filter((f) => f.aggregateId === d.id).length, h = 140 + l * (170 + c * 60);
      t[d.id] = { x: r, y: h }, i.filter((f) => f.aggregateId === d.id).forEach((f, m) => {
        t[f.id] = { x: r + 60, y: h + 100 + m * 60 };
      });
    });
  }), n.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Di(e, t) {
  const n = Oi(e), i = (l) => t[l] ?? n[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), o = (e.aggregates ?? []).map((l) => {
    const c = s.get(l.moduleId), h = (c == null ? void 0 : c.subdomainType) ?? "GENERIC", f = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: f.x,
      y: f.y,
      w: Ni,
      h: Pi,
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
      w: Ri,
      h: Li,
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
const zi = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ui = 150, Hi = 44, qi = 190, Vi = 56, Fi = 160, Ki = 48;
function Bi(e, t) {
  const n = e.externalSystems.find((s) => s.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function Wi(e, t) {
  const n = e.flows, i = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, l;
    return ((l = (d = e.aggregates) == null ? void 0 : d.find((c) => c.id === a)) == null ? void 0 : l.name) ?? a ?? "?";
  };
  return n.forEach((a, d) => {
    const l = 120 + d * 130, c = zi[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const u = t[h] ?? { x: 160, y: l };
      i.push({
        id: h,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : h,
        x: u.x,
        y: u.y,
        w: Ui,
        h: Hi,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${a.id}`, m = t[f] ?? { x: 470, y: l };
    i.push({
      id: f,
      label: a.name,
      x: m.x,
      y: m.y,
      w: qi,
      h: Vi,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: c,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const v = Bi(e, a), g = `tgt:${v.id}`;
    if (!o.has(g)) {
      o.add(g);
      const u = t[g] ?? { x: 790, y: l };
      i.push({
        id: g,
        label: v.label,
        x: u.x,
        y: u.y,
        w: Fi,
        h: Ki,
        kind: v.external ? "external-system" : "module",
        symbol: "component",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "MODULE"
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
      targetId: g,
      kind: "flow-delivery",
      color: c,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const Xi = 190, Yi = 56, wt = 170, Gi = 52;
function en(e, t) {
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
      w: Xi,
      h: Yi,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let l = o.id;
    if (o.steps.forEach((c, h) => {
      const f = c.type === "HUMAN", m = t[c.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (n.push({
        id: c.id,
        label: c.name,
        x: m.x,
        y: m.y,
        w: wt,
        h: Gi,
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
        const v = `comp:${c.id}`, g = t[v] ?? { x: m.x, y: m.y + 90 };
        n.push({
          id: v,
          label: c.compensationUseCaseId,
          x: g.x,
          y: g.y,
          w: wt,
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
          targetId: v,
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
        w: wt,
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
const nt = globalThis, Ht = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, qt = Symbol(), tn = /* @__PURE__ */ new WeakMap();
let Dn = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== qt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Ht && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = tn.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && tn.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Zi = (e) => new Dn(typeof e == "string" ? e : e + "", void 0, qt), Vt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Dn(n, e, qt);
}, Qi = (e, t) => {
  if (Ht) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = nt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, e.appendChild(i);
  }
}, nn = Ht ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Zi(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ji, defineProperty: ji, getOwnPropertyDescriptor: es, getOwnPropertyNames: ts, getOwnPropertySymbols: ns, getPrototypeOf: is } = Object, fe = globalThis, sn = fe.trustedTypes, ss = sn ? sn.emptyScript : "", xt = fe.reactiveElementPolyfillSupport, Le = (e, t) => e, at = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ss : null;
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
} }, Ft = (e, t) => !Ji(e, t), rn = { attribute: !0, type: String, converter: at, reflect: !1, useDefault: !1, hasChanged: Ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), fe.litPropertyMetadata ?? (fe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let be = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = rn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, n);
      s !== void 0 && ji(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: s, set: o } = es(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? rn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Le("elementProperties"))) return;
    const t = is(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Le("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Le("properties"))) {
      const n = this.properties, i = [...ts(n), ...ns(n)];
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
      for (const s of i) n.unshift(nn(s));
    } else t !== void 0 && n.push(nn(t));
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
    return Qi(t, this.constructor.elementStyles), t;
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
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : at).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : at;
      this._$Em = s;
      const l = d.fromAttribute(n, a.type);
      this[s] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Ft)(o, n) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
be.elementStyles = [], be.shadowRootOptions = { mode: "open" }, be[Le("elementProperties")] = /* @__PURE__ */ new Map(), be[Le("finalized")] = /* @__PURE__ */ new Map(), xt == null || xt({ ReactiveElement: be }), (fe.reactiveElementVersions ?? (fe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = globalThis, on = (e) => e, dt = Oe.trustedTypes, an = dt ? dt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, zn = "$lit$", he = `lit$${Math.random().toFixed(9).slice(2)}$`, Un = "?" + he, rs = `<${Un}>`, xe = document, qe = () => xe.createComment(""), Ve = (e) => e === null || typeof e != "object" && typeof e != "function", Kt = Array.isArray, os = (e) => Kt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", It = `[ 	
\f\r]`, Me = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dn = /-->/g, ln = />/g, pe = RegExp(`>|${It}(?:([^\\s"'>=/]+)(${It}*=${It}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), cn = /'/g, un = /"/g, Hn = /^(?:script|style|textarea|title)$/i, qn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), N = qn(1), C = qn(2), Ee = Symbol.for("lit-noChange"), V = Symbol.for("lit-nothing"), hn = /* @__PURE__ */ new WeakMap(), ge = xe.createTreeWalker(xe, 129);
function Vn(e, t) {
  if (!Kt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return an !== void 0 ? an.createHTML(t) : t;
}
const as = (e, t) => {
  const n = e.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Me;
  for (let a = 0; a < n; a++) {
    const d = e[a];
    let l, c, h = -1, f = 0;
    for (; f < d.length && (r.lastIndex = f, c = r.exec(d), c !== null); ) f = r.lastIndex, r === Me ? c[1] === "!--" ? r = dn : c[1] !== void 0 ? r = ln : c[2] !== void 0 ? (Hn.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = pe) : c[3] !== void 0 && (r = pe) : r === pe ? c[0] === ">" ? (r = s ?? Me, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? pe : c[3] === '"' ? un : cn) : r === un || r === cn ? r = pe : r === dn || r === ln ? r = Me : (r = pe, s = void 0);
    const m = r === pe && e[a + 1].startsWith("/>") ? " " : "";
    o += r === Me ? d + rs : h >= 0 ? (i.push(l), d.slice(0, h) + zn + d.slice(h) + he + m) : d + he + (h === -2 ? a : m);
  }
  return [Vn(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Fe {
  constructor({ strings: t, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [l, c] = as(t, n);
    if (this.el = Fe.createElement(l, i), ge.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = ge.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(zn)) {
          const f = c[r++], m = s.getAttribute(h).split(he), v = /([.?@])?(.*)/.exec(f);
          d.push({ type: 1, index: o, name: v[2], strings: m, ctor: v[1] === "." ? ls : v[1] === "?" ? cs : v[1] === "@" ? us : mt }), s.removeAttribute(h);
        } else h.startsWith(he) && (d.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Hn.test(s.tagName)) {
          const h = s.textContent.split(he), f = h.length - 1;
          if (f > 0) {
            s.textContent = dt ? dt.emptyScript : "";
            for (let m = 0; m < f; m++) s.append(h[m], qe()), ge.nextNode(), d.push({ type: 2, index: ++o });
            s.append(h[f], qe());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Un) d.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(he, h + 1)) !== -1; ) d.push({ type: 7, index: o }), h += he.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const i = xe.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Se(e, t, n = e, i) {
  var r, a;
  if (t === Ee) return t;
  let s = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const o = Ve(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (t = Se(e, s._$AS(e, t.values), s, i)), t;
}
class ds {
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
    const { el: { content: n }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? xe).importNode(n, !0);
    ge.currentNode = s;
    let o = ge.nextNode(), r = 0, a = 0, d = i[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let l;
        d.type === 2 ? l = new Ye(o, o.nextSibling, this, t) : d.type === 1 ? l = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (l = new hs(o, this, t)), this._$AV.push(l), d = i[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = ge.nextNode(), r++);
    }
    return ge.currentNode = xe, s;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Ye {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, n, i, s) {
    this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Se(this, t, n), Ve(t) ? t === V || t == null || t === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : t !== this._$AH && t !== Ee && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : os(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== V && Ve(this._$AH) ? this._$AA.nextSibling.data = t : this.T(xe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: n, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Fe.createElement(Vn(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(n);
    else {
      const r = new ds(s, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = hn.get(t.strings);
    return n === void 0 && hn.set(t.strings, n = new Fe(t)), n;
  }
  k(t) {
    Kt(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const o of t) s === n.length ? n.push(i = new Ye(this.O(qe()), this.O(qe()), this, this.options)) : i = n[s], i._$AI(o), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const s = on(t).nextSibling;
      on(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, s, o) {
    this.type = 1, this._$AH = V, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = V;
  }
  _$AI(t, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Se(this, t, n, 0), r = !Ve(t) || t !== this._$AH && t !== Ee, r && (this._$AH = t);
    else {
      const a = t;
      let d, l;
      for (t = o[0], d = 0; d < o.length - 1; d++) l = Se(this, a[i + d], n, d), l === Ee && (l = this._$AH[d]), r || (r = !Ve(l) || l !== this._$AH[d]), l === V ? t = V : t !== V && (t += (l ?? "") + o[d + 1]), this._$AH[d] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ls extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === V ? void 0 : t;
  }
}
class cs extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== V);
  }
}
class us extends mt {
  constructor(t, n, i, s, o) {
    super(t, n, i, s, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Se(this, t, n, 0) ?? V) === Ee) return;
    const i = this._$AH, s = t === V && i !== V || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== V && (i === V || s);
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
    Se(this, t);
  }
}
const $t = Oe.litHtmlPolyfillSupport;
$t == null || $t(Fe, Ye), (Oe.litHtmlVersions ?? (Oe.litHtmlVersions = [])).push("3.3.3");
const fs = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new Ye(t.insertBefore(qe(), o), o, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis;
class ve extends be {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = fs(n, this.renderRoot, this.renderOptions);
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
    return Ee;
  }
}
var Tn;
ve._$litElement$ = !0, ve.finalized = !0, (Tn = _e.litElementHydrateSupport) == null || Tn.call(_e, { LitElement: ve });
const bt = _e.litElementPolyfillSupport;
bt == null || bt({ LitElement: ve });
(_e.litElementVersions ?? (_e.litElementVersions = [])).push("4.2.2");
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
const ps = { attribute: !0, type: String, converter: at, reflect: !1, hasChanged: Ft }, ms = (e = ps, t, n) => {
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
function ce(e) {
  return (t, n) => typeof n == "object" ? ms(e, t, n) : ((i, s, o) => {
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
  return ce({ ...e, state: !0, attribute: !1 });
}
var Mt = "http://www.w3.org/1999/xhtml";
const fn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Mt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function gt(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), fn.hasOwnProperty(t) ? { space: fn[t], local: e } : e;
}
function gs(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Mt && t.documentElement.namespaceURI === Mt ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function ys(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Fn(e) {
  var t = gt(e);
  return (t.local ? ys : gs)(t);
}
function _s() {
}
function Wt(e) {
  return e == null ? _s : function() {
    return this.querySelector(e);
  };
}
function vs(e) {
  typeof e != "function" && (e = Wt(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = new Array(r), d, l, c = 0; c < r; ++c)
      (d = o[c]) && (l = e.call(d, d.__data__, c, o)) && ("__data__" in d && (l.__data__ = d.__data__), a[c] = l);
  return new G(i, this._parents);
}
function ws(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function xs() {
  return [];
}
function Kn(e) {
  return e == null ? xs : function() {
    return this.querySelectorAll(e);
  };
}
function Is(e) {
  return function() {
    return ws(e.apply(this, arguments));
  };
}
function $s(e) {
  typeof e == "function" ? e = Is(e) : e = Kn(e);
  for (var t = this._groups, n = t.length, i = [], s = [], o = 0; o < n; ++o)
    for (var r = t[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && (i.push(e.call(d, d.__data__, l, r)), s.push(d));
  return new G(i, s);
}
function Bn(e) {
  return function() {
    return this.matches(e);
  };
}
function Wn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var bs = Array.prototype.find;
function ks(e) {
  return function() {
    return bs.call(this.children, e);
  };
}
function Es() {
  return this.firstElementChild;
}
function Ss(e) {
  return this.select(e == null ? Es : ks(typeof e == "function" ? e : Wn(e)));
}
var As = Array.prototype.filter;
function Cs() {
  return Array.from(this.children);
}
function Ms(e) {
  return function() {
    return As.call(this.children, e);
  };
}
function Ts(e) {
  return this.selectAll(e == null ? Cs : Ms(typeof e == "function" ? e : Wn(e)));
}
function Ns(e) {
  typeof e != "function" && (e = Bn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new G(i, this._parents);
}
function Xn(e) {
  return new Array(e.length);
}
function Ps() {
  return new G(this._enter || this._groups.map(Xn), this._parents);
}
function lt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
lt.prototype = {
  constructor: lt,
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
function Rs(e) {
  return function() {
    return e;
  };
}
function Ls(e, t, n, i, s, o) {
  for (var r = 0, a, d = t.length, l = o.length; r < l; ++r)
    (a = t[r]) ? (a.__data__ = o[r], i[r] = a) : n[r] = new lt(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function Os(e, t, n, i, s, o, r) {
  var a, d, l = /* @__PURE__ */ new Map(), c = t.length, h = o.length, f = new Array(c), m;
  for (a = 0; a < c; ++a)
    (d = t[a]) && (f[a] = m = r.call(d, d.__data__, a, t) + "", l.has(m) ? s[a] = d : l.set(m, d));
  for (a = 0; a < h; ++a)
    m = r.call(e, o[a], a, o) + "", (d = l.get(m)) ? (i[a] = d, d.__data__ = o[a], l.delete(m)) : n[a] = new lt(e, o[a]);
  for (a = 0; a < c; ++a)
    (d = t[a]) && l.get(f[a]) === d && (s[a] = d);
}
function Ds(e) {
  return e.__data__;
}
function zs(e, t) {
  if (!arguments.length) return Array.from(this, Ds);
  var n = t ? Os : Ls, i = this._parents, s = this._groups;
  typeof e != "function" && (e = Rs(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), l = 0; l < o; ++l) {
    var c = i[l], h = s[l], f = h.length, m = Us(e.call(c, c && c.__data__, l, i)), v = m.length, g = a[l] = new Array(v), u = r[l] = new Array(v), _ = d[l] = new Array(f);
    n(c, h, g, u, _, m, t);
    for (var x = 0, M = 0, O, U; x < v; ++x)
      if (O = g[x]) {
        for (x >= M && (M = x + 1); !(U = u[M]) && ++M < v; ) ;
        O._next = U || null;
      }
  }
  return r = new G(r, i), r._enter = a, r._exit = d, r;
}
function Us(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Hs() {
  return new G(this._exit || this._groups.map(Xn), this._parents);
}
function qs(e, t, n) {
  var i = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? o.remove() : n(o), i && s ? i.merge(s).order() : s;
}
function Vs(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, s = n.length, o = i.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var l = n[d], c = i[d], h = l.length, f = a[d] = new Array(h), m, v = 0; v < h; ++v)
      (m = l[v] || c[v]) && (f[v] = m);
  for (; d < s; ++d)
    a[d] = n[d];
  return new G(a, this._parents);
}
function Fs() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], s = i.length - 1, o = i[s], r; --s >= 0; )
      (r = i[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function Ks(e) {
  e || (e = Bs);
  function t(h, f) {
    return h && f ? e(h.__data__, f.__data__) : !h - !f;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o) {
    for (var r = n[o], a = r.length, d = s[o] = new Array(a), l, c = 0; c < a; ++c)
      (l = r[c]) && (d[c] = l);
    d.sort(t);
  }
  return new G(s, this._parents).order();
}
function Bs(e, t) {
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
function Zs() {
  return !this.node();
}
function Qs(e) {
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
function js(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function er(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function tr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function nr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function ir(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function sr(e, t) {
  var n = gt(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? js : Js : typeof t == "function" ? n.local ? ir : nr : n.local ? tr : er)(n, t));
}
function Yn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function rr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function or(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function ar(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function dr(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? rr : typeof t == "function" ? ar : or)(e, t, n ?? "")) : Ae(this.node(), e);
}
function Ae(e, t) {
  return e.style.getPropertyValue(t) || Yn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function lr(e) {
  return function() {
    delete this[e];
  };
}
function cr(e, t) {
  return function() {
    this[e] = t;
  };
}
function ur(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function hr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? lr : typeof t == "function" ? ur : cr)(e, t)) : this.node()[e];
}
function Gn(e) {
  return e.trim().split(/^|\s+/);
}
function Xt(e) {
  return e.classList || new Zn(e);
}
function Zn(e) {
  this._node = e, this._names = Gn(e.getAttribute("class") || "");
}
Zn.prototype = {
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
function Qn(e, t) {
  for (var n = Xt(e), i = -1, s = t.length; ++i < s; ) n.add(t[i]);
}
function Jn(e, t) {
  for (var n = Xt(e), i = -1, s = t.length; ++i < s; ) n.remove(t[i]);
}
function fr(e) {
  return function() {
    Qn(this, e);
  };
}
function pr(e) {
  return function() {
    Jn(this, e);
  };
}
function mr(e, t) {
  return function() {
    (t.apply(this, arguments) ? Qn : Jn)(this, e);
  };
}
function gr(e, t) {
  var n = Gn(e + "");
  if (arguments.length < 2) {
    for (var i = Xt(this.node()), s = -1, o = n.length; ++s < o; ) if (!i.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? mr : t ? fr : pr)(n, t));
}
function yr() {
  this.textContent = "";
}
function _r(e) {
  return function() {
    this.textContent = e;
  };
}
function vr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function wr(e) {
  return arguments.length ? this.each(e == null ? yr : (typeof e == "function" ? vr : _r)(e)) : this.node().textContent;
}
function xr() {
  this.innerHTML = "";
}
function Ir(e) {
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
  return arguments.length ? this.each(e == null ? xr : (typeof e == "function" ? $r : Ir)(e)) : this.node().innerHTML;
}
function kr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Er() {
  return this.each(kr);
}
function Sr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ar() {
  return this.each(Sr);
}
function Cr(e) {
  var t = typeof e == "function" ? e : Fn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Mr() {
  return null;
}
function Tr(e, t) {
  var n = typeof e == "function" ? e : Fn(e), i = t == null ? Mr : typeof t == "function" ? t : Wt(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Nr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Pr() {
  return this.each(Nr);
}
function Rr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Lr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Or(e) {
  return this.select(e ? Lr : Rr);
}
function Dr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function zr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Ur(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Hr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, s = t.length, o; n < s; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function qr(e, t, n) {
  return function() {
    var i = this.__on, s, o = zr(t);
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
  var i = Ur(e + ""), s, o = i.length, r;
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
  for (a = t ? qr : Hr, s = 0; s < o; ++s) this.each(a(i[s], t, n));
  return this;
}
function jn(e, t, n) {
  var i = Yn(e), s = i.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = i.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Fr(e, t) {
  return function() {
    return jn(this, e, t);
  };
}
function Kr(e, t) {
  return function() {
    return jn(this, e, t.apply(this, arguments));
  };
}
function Br(e, t) {
  return this.each((typeof t == "function" ? Kr : Fr)(e, t));
}
function* Wr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length, r; s < o; ++s)
      (r = i[s]) && (yield r);
}
var ei = [null];
function G(e, t) {
  this._groups = e, this._parents = t;
}
function Ge() {
  return new G([[document.documentElement]], ei);
}
function Xr() {
  return this;
}
G.prototype = Ge.prototype = {
  constructor: G,
  select: vs,
  selectAll: $s,
  selectChild: Ss,
  selectChildren: Ts,
  filter: Ns,
  data: zs,
  enter: Ps,
  exit: Hs,
  join: qs,
  merge: Vs,
  selection: Xr,
  order: Fs,
  sort: Ks,
  call: Ws,
  nodes: Xs,
  node: Ys,
  size: Gs,
  empty: Zs,
  each: Qs,
  attr: sr,
  style: dr,
  property: hr,
  classed: gr,
  text: wr,
  html: br,
  raise: Er,
  lower: Ar,
  append: Cr,
  insert: Tr,
  remove: Pr,
  clone: Or,
  datum: Dr,
  on: Vr,
  dispatch: Br,
  [Symbol.iterator]: Wr
};
function te(e) {
  return typeof e == "string" ? new G([[document.querySelector(e)]], [document.documentElement]) : new G([[e]], ei);
}
function Yr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function me(e, t) {
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
function Yt() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new it(n);
}
function it(e) {
  this._ = e;
}
function Zr(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
it.prototype = Yt.prototype = {
  constructor: it,
  on: function(e, t) {
    var n = this._, i = Zr(e + "", n), s, o = -1, r = i.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = i[o]).type) && (s = Qr(n[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = i[o]).type) n[s] = pn(n[s], e.name, t);
      else if (t == null) for (s in n) n[s] = pn(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new it(e);
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
function Qr(e, t) {
  for (var n = 0, i = e.length, s; n < i; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function pn(e, t, n) {
  for (var i = 0, s = e.length; i < s; ++i)
    if (e[i].name === t) {
      e[i] = Gr, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Tt = { capture: !0, passive: !1 };
function Nt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jr(e) {
  var t = e.document.documentElement, n = te(e).on("dragstart.drag", Nt, Tt);
  "onselectstart" in t ? n.on("selectstart.drag", Nt, Tt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function jr(e, t) {
  var n = e.document.documentElement, i = te(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Nt, Tt), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function Gt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function ti(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Ze() {
}
var Ke = 0.7, ct = 1 / Ke, ke = "\\s*([+-]?\\d+)\\s*", Be = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ne = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", eo = /^#([0-9a-f]{3,8})$/, to = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`), no = new RegExp(`^rgb\\(${ne},${ne},${ne}\\)$`), io = new RegExp(`^rgba\\(${ke},${ke},${ke},${Be}\\)$`), so = new RegExp(`^rgba\\(${ne},${ne},${ne},${Be}\\)$`), ro = new RegExp(`^hsl\\(${Be},${ne},${ne}\\)$`), oo = new RegExp(`^hsla\\(${Be},${ne},${ne},${Be}\\)$`), mn = {
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
Gt(Ze, We, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gn,
  // Deprecated! Use color.formatHex.
  formatHex: gn,
  formatHex8: ao,
  formatHsl: lo,
  formatRgb: yn,
  toString: yn
});
function gn() {
  return this.rgb().formatHex();
}
function ao() {
  return this.rgb().formatHex8();
}
function lo() {
  return ni(this).formatHsl();
}
function yn() {
  return this.rgb().formatRgb();
}
function We(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = eo.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? _n(t) : n === 3 ? new Y(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Qe(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Qe(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = to.exec(e)) ? new Y(t[1], t[2], t[3], 1) : (t = no.exec(e)) ? new Y(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = io.exec(e)) ? Qe(t[1], t[2], t[3], t[4]) : (t = so.exec(e)) ? Qe(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ro.exec(e)) ? xn(t[1], t[2] / 100, t[3] / 100, 1) : (t = oo.exec(e)) ? xn(t[1], t[2] / 100, t[3] / 100, t[4]) : mn.hasOwnProperty(e) ? _n(mn[e]) : e === "transparent" ? new Y(NaN, NaN, NaN, 0) : null;
}
function _n(e) {
  return new Y(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Qe(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new Y(e, t, n, i);
}
function co(e) {
  return e instanceof Ze || (e = We(e)), e ? (e = e.rgb(), new Y(e.r, e.g, e.b, e.opacity)) : new Y();
}
function Pt(e, t, n, i) {
  return arguments.length === 1 ? co(e) : new Y(e, t, n, i ?? 1);
}
function Y(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Gt(Y, Pt, ti(Ze, {
  brighter(e) {
    return e = e == null ? ct : Math.pow(ct, e), new Y(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ke : Math.pow(Ke, e), new Y(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Y(we(this.r), we(this.g), we(this.b), ut(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: vn,
  // Deprecated! Use color.formatHex.
  formatHex: vn,
  formatHex8: uo,
  formatRgb: wn,
  toString: wn
}));
function vn() {
  return `#${ye(this.r)}${ye(this.g)}${ye(this.b)}`;
}
function uo() {
  return `#${ye(this.r)}${ye(this.g)}${ye(this.b)}${ye((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wn() {
  const e = ut(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${we(this.r)}, ${we(this.g)}, ${we(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ut(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function we(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ye(e) {
  return e = we(e), (e < 16 ? "0" : "") + e.toString(16);
}
function xn(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new J(e, t, n, i);
}
function ni(e) {
  if (e instanceof J) return new J(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ze || (e = We(e)), !e) return new J();
  if (e instanceof J) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), o = Math.max(t, n, i), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (n - i) / a + (n < i) * 6 : n === o ? r = (i - t) / a + 2 : r = (t - n) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new J(r, a, d, e.opacity);
}
function ho(e, t, n, i) {
  return arguments.length === 1 ? ni(e) : new J(e, t, n, i ?? 1);
}
function J(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Gt(J, ho, ti(Ze, {
  brighter(e) {
    return e = e == null ? ct : Math.pow(ct, e), new J(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ke : Math.pow(Ke, e), new J(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - i;
    return new Y(
      kt(e >= 240 ? e - 240 : e + 120, s, i),
      kt(e, s, i),
      kt(e < 120 ? e + 240 : e - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new J(In(this.h), Je(this.s), Je(this.l), ut(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = ut(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${In(this.h)}, ${Je(this.s) * 100}%, ${Je(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function In(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Je(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function kt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ii = (e) => () => e;
function fo(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function po(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function mo(e) {
  return (e = +e) == 1 ? si : function(t, n) {
    return n - t ? po(t, n, e) : ii(isNaN(t) ? n : t);
  };
}
function si(e, t) {
  var n = t - e;
  return n ? fo(e, n) : ii(isNaN(e) ? t : e);
}
const $n = (function e(t) {
  var n = mo(t);
  function i(s, o) {
    var r = n((s = Pt(s)).r, (o = Pt(o)).r), a = n(s.g, o.g), d = n(s.b, o.b), l = si(s.opacity, o.opacity);
    return function(c) {
      return s.r = r(c), s.g = a(c), s.b = d(c), s.opacity = l(c), s + "";
    };
  }
  return i.gamma = e, i;
})(1);
function ue(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Rt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Et = new RegExp(Rt.source, "g");
function go(e) {
  return function() {
    return e;
  };
}
function yo(e) {
  return function(t) {
    return e(t) + "";
  };
}
function _o(e, t) {
  var n = Rt.lastIndex = Et.lastIndex = 0, i, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (i = Rt.exec(e)) && (s = Et.exec(t)); )
    (o = s.index) > n && (o = t.slice(n, o), a[r] ? a[r] += o : a[++r] = o), (i = i[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: ue(i, s) })), n = Et.lastIndex;
  return n < t.length && (o = t.slice(n), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? yo(d[0].x) : go(t) : (t = d.length, function(l) {
    for (var c = 0, h; c < t; ++c) a[(h = d[c]).i] = h.x(l);
    return a.join("");
  });
}
var bn = 180 / Math.PI, Lt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ri(e, t, n, i, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * n + t * i) && (n -= e * d, i -= t * d), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, d /= a), e * i < t * n && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * bn,
    skewX: Math.atan(d) * bn,
    scaleX: r,
    scaleY: a
  };
}
var je;
function vo(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Lt : ri(t.a, t.b, t.c, t.d, t.e, t.f);
}
function wo(e) {
  return e == null || (je || (je = document.createElementNS("http://www.w3.org/2000/svg", "g")), je.setAttribute("transform", e), !(e = je.transform.baseVal.consolidate())) ? Lt : (e = e.matrix, ri(e.a, e.b, e.c, e.d, e.e, e.f));
}
function oi(e, t, n, i) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, c, h, f, m, v) {
    if (l !== h || c !== f) {
      var g = m.push("translate(", null, t, null, n);
      v.push({ i: g - 4, x: ue(l, h) }, { i: g - 2, x: ue(c, f) });
    } else (h || f) && m.push("translate(" + h + t + f + n);
  }
  function r(l, c, h, f) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), f.push({ i: h.push(s(h) + "rotate(", null, i) - 2, x: ue(l, c) })) : c && h.push(s(h) + "rotate(" + c + i);
  }
  function a(l, c, h, f) {
    l !== c ? f.push({ i: h.push(s(h) + "skewX(", null, i) - 2, x: ue(l, c) }) : c && h.push(s(h) + "skewX(" + c + i);
  }
  function d(l, c, h, f, m, v) {
    if (l !== h || c !== f) {
      var g = m.push(s(m) + "scale(", null, ",", null, ")");
      v.push({ i: g - 4, x: ue(l, h) }, { i: g - 2, x: ue(c, f) });
    } else (h !== 1 || f !== 1) && m.push(s(m) + "scale(" + h + "," + f + ")");
  }
  return function(l, c) {
    var h = [], f = [];
    return l = e(l), c = e(c), o(l.translateX, l.translateY, c.translateX, c.translateY, h, f), r(l.rotate, c.rotate, h, f), a(l.skewX, c.skewX, h, f), d(l.scaleX, l.scaleY, c.scaleX, c.scaleY, h, f), l = c = null, function(m) {
      for (var v = -1, g = f.length, u; ++v < g; ) h[(u = f[v]).i] = u.x(m);
      return h.join("");
    };
  };
}
var xo = oi(vo, "px, ", "px)", "deg)"), Io = oi(wo, ", ", ")", ")"), $o = 1e-12;
function kn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function bo(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function ko(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Eo = (function e(t, n, i) {
  function s(o, r) {
    var a = o[0], d = o[1], l = o[2], c = r[0], h = r[1], f = r[2], m = c - a, v = h - d, g = m * m + v * v, u, _;
    if (g < $o)
      _ = Math.log(f / l) / t, u = function($) {
        return [
          a + $ * m,
          d + $ * v,
          l * Math.exp(t * $ * _)
        ];
      };
    else {
      var x = Math.sqrt(g), M = (f * f - l * l + i * g) / (2 * l * n * x), O = (f * f - l * l - i * g) / (2 * f * n * x), U = Math.log(Math.sqrt(M * M + 1) - M), P = Math.log(Math.sqrt(O * O + 1) - O);
      _ = (P - U) / t, u = function($) {
        var E = $ * _, z = kn(U), S = l / (n * x) * (z * ko(t * E + U) - bo(U));
        return [
          a + S * m,
          d + S * v,
          l * z / kn(t * E + U)
        ];
      };
    }
    return u.duration = _ * 1e3 * t / Math.SQRT2, u;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Ce = 0, Pe = 0, Te = 0, ai = 1e3, ht, Re, ft = 0, Ie = 0, yt = 0, Xe = typeof performance == "object" && performance.now ? performance : Date, di = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Zt() {
  return Ie || (di(So), Ie = Xe.now() + yt);
}
function So() {
  Ie = 0;
}
function pt() {
  this._call = this._time = this._next = null;
}
pt.prototype = li.prototype = {
  constructor: pt,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Zt() : +n) + (t == null ? 0 : +t), !this._next && Re !== this && (Re ? Re._next = this : ht = this, Re = this), this._call = e, this._time = n, Ot();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ot());
  }
};
function li(e, t, n) {
  var i = new pt();
  return i.restart(e, t, n), i;
}
function Ao() {
  Zt(), ++Ce;
  for (var e = ht, t; e; )
    (t = Ie - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ce;
}
function En() {
  Ie = (ft = Xe.now()) + yt, Ce = Pe = 0;
  try {
    Ao();
  } finally {
    Ce = 0, Mo(), Ie = 0;
  }
}
function Co() {
  var e = Xe.now(), t = e - ft;
  t > ai && (yt -= t, ft = e);
}
function Mo() {
  for (var e, t = ht, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ht = n);
  Re = e, Ot(i);
}
function Ot(e) {
  if (!Ce) {
    Pe && (Pe = clearTimeout(Pe));
    var t = e - Ie;
    t > 24 ? (e < 1 / 0 && (Pe = setTimeout(En, e - Xe.now() - yt)), Te && (Te = clearInterval(Te))) : (Te || (ft = Xe.now(), Te = setInterval(Co, ai)), Ce = 1, di(En));
  }
}
function Sn(e, t, n) {
  var i = new pt();
  return t = t == null ? 0 : +t, i.restart((s) => {
    i.stop(), e(s + t);
  }, t, n), i;
}
var To = Yt("start", "end", "cancel", "interrupt"), No = [], ci = 0, An = 1, Dt = 2, st = 3, Cn = 4, zt = 5, rt = 6;
function _t(e, t, n, i, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (n in r) return;
  Po(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: To,
    tween: No,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ci
  });
}
function Qt(e, t) {
  var n = j(e, t);
  if (n.state > ci) throw new Error("too late; already scheduled");
  return n;
}
function ie(e, t) {
  var n = j(e, t);
  if (n.state > st) throw new Error("too late; already running");
  return n;
}
function j(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Po(e, t, n) {
  var i = e.__transition, s;
  i[t] = n, n.timer = li(o, 0, n.time);
  function o(l) {
    n.state = An, n.timer.restart(r, n.delay, n.time), n.delay <= l && r(l - n.delay);
  }
  function r(l) {
    var c, h, f, m;
    if (n.state !== An) return d();
    for (c in i)
      if (m = i[c], m.name === n.name) {
        if (m.state === st) return Sn(r);
        m.state === Cn ? (m.state = rt, m.timer.stop(), m.on.call("interrupt", e, e.__data__, m.index, m.group), delete i[c]) : +c < t && (m.state = rt, m.timer.stop(), m.on.call("cancel", e, e.__data__, m.index, m.group), delete i[c]);
      }
    if (Sn(function() {
      n.state === st && (n.state = Cn, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = Dt, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Dt) {
      for (n.state = st, s = new Array(f = n.tween.length), c = 0, h = -1; c < f; ++c)
        (m = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (s[++h] = m);
      s.length = h + 1;
    }
  }
  function a(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(d), n.state = zt, 1), h = -1, f = s.length; ++h < f; )
      s[h].call(e, c);
    n.state === zt && (n.on.call("end", e, e.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = rt, n.timer.stop(), delete i[t];
    for (var l in i) return;
    delete e.__transition;
  }
}
function ot(e, t) {
  var n = e.__transition, i, s, o = !0, r;
  if (n) {
    t = t == null ? null : t + "";
    for (r in n) {
      if ((i = n[r]).name !== t) {
        o = !1;
        continue;
      }
      s = i.state > Dt && i.state < zt, i.state = rt, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[r];
    }
    o && delete e.__transition;
  }
}
function Ro(e) {
  return this.each(function() {
    ot(this, e);
  });
}
function Lo(e, t) {
  var n, i;
  return function() {
    var s = ie(this, e), o = s.tween;
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
function Oo(e, t, n) {
  var i, s;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = ie(this, e), r = o.tween;
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
function Do(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = j(this.node(), n).tween, s = 0, o = i.length, r; s < o; ++s)
      if ((r = i[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Lo : Oo)(n, e, t));
}
function Jt(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var s = ie(this, i);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return j(s, i).value[t];
  };
}
function ui(e, t) {
  var n;
  return (typeof t == "number" ? ue : t instanceof We ? $n : (n = We(t)) ? (t = n, $n) : _o)(e, t);
}
function zo(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Uo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ho(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function qo(e, t, n) {
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
function Ko(e, t) {
  var n = gt(e), i = n === "transform" ? Io : ui;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Fo : Vo)(n, i, Jt(this, "attr." + e, t)) : t == null ? (n.local ? Uo : zo)(n) : (n.local ? qo : Ho)(n, i, t));
}
function Bo(e, t) {
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
    return o !== i && (n = (i = o) && Bo(e, o)), n;
  }
  return s._value = t, s;
}
function Go(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = gt(e);
  return this.tween(n, (i.local ? Xo : Yo)(i, t));
}
function Zo(e, t) {
  return function() {
    Qt(this, e).delay = +t.apply(this, arguments);
  };
}
function Qo(e, t) {
  return t = +t, function() {
    Qt(this, e).delay = t;
  };
}
function Jo(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Zo : Qo)(t, e)) : j(this.node(), t).delay;
}
function jo(e, t) {
  return function() {
    ie(this, e).duration = +t.apply(this, arguments);
  };
}
function ea(e, t) {
  return t = +t, function() {
    ie(this, e).duration = t;
  };
}
function ta(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? jo : ea)(t, e)) : j(this.node(), t).duration;
}
function na(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    ie(this, e).ease = t;
  };
}
function ia(e) {
  var t = this._id;
  return arguments.length ? this.each(na(t, e)) : j(this.node(), t).ease;
}
function sa(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ie(this, e).ease = n;
  };
}
function ra(e) {
  if (typeof e != "function") throw new Error();
  return this.each(sa(this._id, e));
}
function oa(e) {
  typeof e != "function" && (e = Bn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new de(i, this._parents, this._name, this._id);
}
function aa(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, s = n.length, o = Math.min(i, s), r = new Array(i), a = 0; a < o; ++a)
    for (var d = t[a], l = n[a], c = d.length, h = r[a] = new Array(c), f, m = 0; m < c; ++m)
      (f = d[m] || l[m]) && (h[m] = f);
  for (; a < i; ++a)
    r[a] = t[a];
  return new de(r, this._parents, this._name, this._id);
}
function da(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function la(e, t, n) {
  var i, s, o = da(t) ? Qt : ie;
  return function() {
    var r = o(this, e), a = r.on;
    a !== i && (s = (i = a).copy()).on(t, n), r.on = s;
  };
}
function ca(e, t) {
  var n = this._id;
  return arguments.length < 2 ? j(this.node(), n).on.on(e) : this.each(la(n, e, t));
}
function ua(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function ha() {
  return this.on("end.remove", ua(this._id));
}
function fa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Wt(e));
  for (var i = this._groups, s = i.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = i[r], d = a.length, l = o[r] = new Array(d), c, h, f = 0; f < d; ++f)
      (c = a[f]) && (h = e.call(c, c.__data__, f, a)) && ("__data__" in c && (h.__data__ = c.__data__), l[f] = h, _t(l[f], t, n, f, l, j(c, n)));
  return new de(o, this._parents, t, n);
}
function pa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Kn(e));
  for (var i = this._groups, s = i.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = i[a], l = d.length, c, h = 0; h < l; ++h)
      if (c = d[h]) {
        for (var f = e.call(c, c.__data__, h, d), m, v = j(c, n), g = 0, u = f.length; g < u; ++g)
          (m = f[g]) && _t(m, t, n, g, f, v);
        o.push(f), r.push(c);
      }
  return new de(o, r, t, n);
}
var ma = Ge.prototype.constructor;
function ga() {
  return new ma(this._groups, this._parents);
}
function ya(e, t) {
  var n, i, s;
  return function() {
    var o = Ae(this, e), r = (this.style.removeProperty(e), Ae(this, e));
    return o === r ? null : o === n && r === i ? s : s = t(n = o, i = r);
  };
}
function hi(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function _a(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = Ae(this, e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function va(e, t, n) {
  var i, s, o;
  return function() {
    var r = Ae(this, e), a = n(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Ae(this, e))), r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a));
  };
}
function wa(e, t) {
  var n, i, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = ie(this, e), l = d.on, c = d.value[o] == null ? a || (a = hi(t)) : void 0;
    (l !== n || s !== c) && (i = (n = l).copy()).on(r, s = c), d.on = i;
  };
}
function xa(e, t, n) {
  var i = (e += "") == "transform" ? xo : ui;
  return t == null ? this.styleTween(e, ya(e, i)).on("end.style." + e, hi(e)) : typeof t == "function" ? this.styleTween(e, va(e, i, Jt(this, "style." + e, t))).each(wa(this._id, e)) : this.styleTween(e, _a(e, i, t), n).on("end.style." + e, null);
}
function Ia(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function $a(e, t, n) {
  var i, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && Ia(e, r, n)), i;
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
function ka(e) {
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
function Sa(e) {
  return this.tween("text", typeof e == "function" ? Ea(Jt(this, "text", e)) : ka(e == null ? "" : e + ""));
}
function Aa(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ca(e) {
  var t, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && Aa(s)), t;
  }
  return i._value = e, i;
}
function Ma(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ca(e));
}
function Ta() {
  for (var e = this._name, t = this._id, n = fi(), i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      if (d = r[l]) {
        var c = j(d, t);
        _t(d, e, n, l, r, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new de(i, this._parents, e, n);
}
function Na() {
  var e, t, n = this, i = n._id, s = n.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    n.each(function() {
      var l = ie(this, i), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), l.on = t;
    }), s === 0 && o();
  });
}
var Pa = 0;
function de(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function fi() {
  return ++Pa;
}
var oe = Ge.prototype;
de.prototype = {
  constructor: de,
  select: fa,
  selectAll: pa,
  selectChild: oe.selectChild,
  selectChildren: oe.selectChildren,
  filter: oa,
  merge: aa,
  selection: ga,
  transition: Ta,
  call: oe.call,
  nodes: oe.nodes,
  node: oe.node,
  size: oe.size,
  empty: oe.empty,
  each: oe.each,
  on: ca,
  attr: Ko,
  attrTween: Go,
  style: xa,
  styleTween: ba,
  text: Sa,
  textTween: Ma,
  remove: ha,
  tween: Do,
  delay: Jo,
  duration: ta,
  ease: ia,
  easeVarying: ra,
  end: Na,
  [Symbol.iterator]: oe[Symbol.iterator]
};
function Ra(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var La = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ra
};
function Oa(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Da(e) {
  var t, n;
  e instanceof de ? (t = e._id, e = e._name) : (t = fi(), (n = La).time = Zt(), e = e == null ? null : e + "");
  for (var i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && _t(d, e, t, l, r, n || Oa(d, t));
  return new de(i, this._parents, e, t);
}
Ge.prototype.interrupt = Ro;
Ge.prototype.transition = Da;
const et = (e) => () => e;
function za(e, {
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
function ae(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
ae.prototype = {
  constructor: ae,
  scale: function(e) {
    return e === 1 ? this : new ae(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ae(this.k, this.x + this.k * e, this.y + this.k * t);
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
var De = new ae(1, 0, 0);
ae.prototype;
function St(e) {
  e.stopImmediatePropagation();
}
function Ne(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ua(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ha() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Mn() {
  return this.__zoom || De;
}
function qa(e) {
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
function Ka() {
  var e = Ua, t = Ha, n = Fa, i = qa, s = Va, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Eo, l = Yt("start", "zoom", "end"), c, h, f, m = 500, v = 150, g = 0, u = 10;
  function _(p) {
    p.property("__zoom", Mn).on("wheel.zoom", E, { passive: !1 }).on("mousedown.zoom", z).on("dblclick.zoom", S).filter(s).on("touchstart.zoom", X).on("touchmove.zoom", W).on("touchend.zoom touchcancel.zoom", pi).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(p, w, y, I) {
    var k = p.selection ? p.selection() : p;
    k.property("__zoom", Mn), p !== k ? U(p, w, y, I) : k.interrupt().each(function() {
      P(this, arguments).event(I).start().zoom(null, typeof w == "function" ? w.apply(this, arguments) : w).end();
    });
  }, _.scaleBy = function(p, w, y, I) {
    _.scaleTo(p, function() {
      var k = this.__zoom.k, A = typeof w == "function" ? w.apply(this, arguments) : w;
      return k * A;
    }, y, I);
  }, _.scaleTo = function(p, w, y, I) {
    _.transform(p, function() {
      var k = t.apply(this, arguments), A = this.__zoom, T = y == null ? O(k) : typeof y == "function" ? y.apply(this, arguments) : y, D = A.invert(T), H = typeof w == "function" ? w.apply(this, arguments) : w;
      return n(M(x(A, H), T, D), k, r);
    }, y, I);
  }, _.translateBy = function(p, w, y, I) {
    _.transform(p, function() {
      return n(this.__zoom.translate(
        typeof w == "function" ? w.apply(this, arguments) : w,
        typeof y == "function" ? y.apply(this, arguments) : y
      ), t.apply(this, arguments), r);
    }, null, I);
  }, _.translateTo = function(p, w, y, I, k) {
    _.transform(p, function() {
      var A = t.apply(this, arguments), T = this.__zoom, D = I == null ? O(A) : typeof I == "function" ? I.apply(this, arguments) : I;
      return n(De.translate(D[0], D[1]).scale(T.k).translate(
        typeof w == "function" ? -w.apply(this, arguments) : -w,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), A, r);
    }, I, k);
  };
  function x(p, w) {
    return w = Math.max(o[0], Math.min(o[1], w)), w === p.k ? p : new ae(w, p.x, p.y);
  }
  function M(p, w, y) {
    var I = w[0] - y[0] * p.k, k = w[1] - y[1] * p.k;
    return I === p.x && k === p.y ? p : new ae(p.k, I, k);
  }
  function O(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function U(p, w, y, I) {
    p.on("start.zoom", function() {
      P(this, arguments).event(I).start();
    }).on("interrupt.zoom end.zoom", function() {
      P(this, arguments).event(I).end();
    }).tween("zoom", function() {
      var k = this, A = arguments, T = P(k, A).event(I), D = t.apply(k, A), H = y == null ? O(D) : typeof y == "function" ? y.apply(k, A) : y, ee = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), K = k.__zoom, Z = typeof w == "function" ? w.apply(k, A) : w, se = d(K.invert(H).concat(ee / K.k), Z.invert(H).concat(ee / Z.k));
      return function(Q) {
        if (Q === 1) Q = Z;
        else {
          var re = se(Q), vt = ee / re[2];
          Q = new ae(vt, H[0] - re[0] * vt, H[1] - re[1] * vt);
        }
        T.zoom(null, Q);
      };
    });
  }
  function P(p, w, y) {
    return !y && p.__zooming || new $(p, w);
  }
  function $(p, w) {
    this.that = p, this.args = w, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, w), this.taps = 0;
  }
  $.prototype = {
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
      var w = te(this.that).datum();
      l.call(
        p,
        this.that,
        new za(p, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: l
        }),
        w
      );
    }
  };
  function E(p, ...w) {
    if (!e.apply(this, arguments)) return;
    var y = P(this, w).event(p), I = this.__zoom, k = Math.max(o[0], Math.min(o[1], I.k * Math.pow(2, i.apply(this, arguments)))), A = me(p);
    if (y.wheel)
      (y.mouse[0][0] !== A[0] || y.mouse[0][1] !== A[1]) && (y.mouse[1] = I.invert(y.mouse[0] = A)), clearTimeout(y.wheel);
    else {
      if (I.k === k) return;
      y.mouse = [A, I.invert(A)], ot(this), y.start();
    }
    Ne(p), y.wheel = setTimeout(T, v), y.zoom("mouse", n(M(x(I, k), y.mouse[0], y.mouse[1]), y.extent, r));
    function T() {
      y.wheel = null, y.end();
    }
  }
  function z(p, ...w) {
    if (f || !e.apply(this, arguments)) return;
    var y = p.currentTarget, I = P(this, w, !0).event(p), k = te(p.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", ee, !0), A = me(p, y), T = p.clientX, D = p.clientY;
    Jr(p.view), St(p), I.mouse = [A, this.__zoom.invert(A)], ot(this), I.start();
    function H(K) {
      if (Ne(K), !I.moved) {
        var Z = K.clientX - T, se = K.clientY - D;
        I.moved = Z * Z + se * se > g;
      }
      I.event(K).zoom("mouse", n(M(I.that.__zoom, I.mouse[0] = me(K, y), I.mouse[1]), I.extent, r));
    }
    function ee(K) {
      k.on("mousemove.zoom mouseup.zoom", null), jr(K.view, I.moved), Ne(K), I.event(K).end();
    }
  }
  function S(p, ...w) {
    if (e.apply(this, arguments)) {
      var y = this.__zoom, I = me(p.changedTouches ? p.changedTouches[0] : p, this), k = y.invert(I), A = y.k * (p.shiftKey ? 0.5 : 2), T = n(M(x(y, A), I, k), t.apply(this, w), r);
      Ne(p), a > 0 ? te(this).transition().duration(a).call(U, T, I, p) : te(this).call(_.transform, T, I, p);
    }
  }
  function X(p, ...w) {
    if (e.apply(this, arguments)) {
      var y = p.touches, I = y.length, k = P(this, w, p.changedTouches.length === I).event(p), A, T, D, H;
      for (St(p), T = 0; T < I; ++T)
        D = y[T], H = me(D, this), H = [H, this.__zoom.invert(H), D.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== H[2] && (k.touch1 = H, k.taps = 0) : (k.touch0 = H, A = !0, k.taps = 1 + !!c);
      c && (c = clearTimeout(c)), A && (k.taps < 2 && (h = H[0], c = setTimeout(function() {
        c = null;
      }, m)), ot(this), k.start());
    }
  }
  function W(p, ...w) {
    if (this.__zooming) {
      var y = P(this, w).event(p), I = p.changedTouches, k = I.length, A, T, D, H;
      for (Ne(p), A = 0; A < k; ++A)
        T = I[A], D = me(T, this), y.touch0 && y.touch0[2] === T.identifier ? y.touch0[0] = D : y.touch1 && y.touch1[2] === T.identifier && (y.touch1[0] = D);
      if (T = y.that.__zoom, y.touch1) {
        var ee = y.touch0[0], K = y.touch0[1], Z = y.touch1[0], se = y.touch1[1], Q = (Q = Z[0] - ee[0]) * Q + (Q = Z[1] - ee[1]) * Q, re = (re = se[0] - K[0]) * re + (re = se[1] - K[1]) * re;
        T = x(T, Math.sqrt(Q / re)), D = [(ee[0] + Z[0]) / 2, (ee[1] + Z[1]) / 2], H = [(K[0] + se[0]) / 2, (K[1] + se[1]) / 2];
      } else if (y.touch0) D = y.touch0[0], H = y.touch0[1];
      else return;
      y.zoom("touch", n(M(T, D, H), y.extent, r));
    }
  }
  function pi(p, ...w) {
    if (this.__zooming) {
      var y = P(this, w).event(p), I = p.changedTouches, k = I.length, A, T;
      for (St(p), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, m), A = 0; A < k; ++A)
        T = I[A], y.touch0 && y.touch0[2] === T.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === T.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0) y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (T = me(T, this), Math.hypot(h[0] - T[0], h[1] - T[1]) < u)) {
        var D = te(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : et(+p), _) : i;
  }, _.filter = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : et(!!p), _) : e;
  }, _.touchable = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : et(!!p), _) : s;
  }, _.extent = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : et([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), _) : t;
  }, _.scaleExtent = function(p) {
    return arguments.length ? (o[0] = +p[0], o[1] = +p[1], _) : [o[0], o[1]];
  }, _.translateExtent = function(p) {
    return arguments.length ? (r[0][0] = +p[0][0], r[1][0] = +p[1][0], r[0][1] = +p[0][1], r[1][1] = +p[1][1], _) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, _.constrain = function(p) {
    return arguments.length ? (n = p, _) : n;
  }, _.duration = function(p) {
    return arguments.length ? (a = +p, _) : a;
  }, _.interpolate = function(p) {
    return arguments.length ? (d = p, _) : d;
  }, _.on = function() {
    var p = l.on.apply(l, arguments);
    return p === l ? _ : p;
  }, _.clickDistance = function(p) {
    return arguments.length ? (g = (p = +p) * p, _) : Math.sqrt(g);
  }, _.tapDistance = function(p) {
    return arguments.length ? (u = +p, _) : u;
  }, _;
}
var Ba = Object.defineProperty, Wa = Object.getOwnPropertyDescriptor, B = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Wa(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && Ba(t, n, s), s;
};
function Xa(e, t, n, i) {
  const s = t.x - e.x, o = t.y - e.y, r = i.x - n.x, a = i.y - n.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const l = ((n.x - e.x) * a - (n.y - e.y) * r) / d, c = ((n.x - e.x) * o - (n.y - e.y) * s) / d;
  return l <= 0.02 || l >= 0.98 || c <= 0.02 || c >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * o, t: l };
}
function Ya(e, t, n) {
  const i = n.x - t.x, s = n.y - t.y, o = i * i + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * s) / o)), a = t.x + r * i, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function Ga(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, l = (r.y - o.y) / a, c = t.map(([f, m]) => Xa(o, r, f, m)).filter((f) => f !== null).filter((f) => f.t * a > n + 2 && (1 - f.t) * a > n + 2).sort((f, m) => f.t - m.t);
    let h = -1 / 0;
    for (const f of c)
      f.t * a - n <= h + 2 || (i += ` L ${f.x - d * n} ${f.y - l * n}`, i += ` A ${n} ${n} 0 0 1 ${f.x + d * n} ${f.y + l * n}`, h = f.t * a + n);
    i += ` L ${r.x} ${r.y}`;
  }
  return i;
}
const tt = {
  component: C`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: C`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: C`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: C`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: C`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: C`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: C`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: C`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: C`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: C`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  usecase: C`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: C`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let F = class extends ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = De, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
          if (n != null && n.parentId && !t && n.kind !== "domain-event" && n.kind !== "application-event" && n.kind !== "read-model" && n.kind !== "domain-service" && n.kind !== "query-service" && n.kind !== "use-case" && n.kind !== "external-use-case")
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
    this._zoomBehavior = Ka().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), te(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((c) => c.x - c.w / 2)) - e, o = Math.max(...t.map((c) => c.x + c.w / 2)) + e, r = Math.min(...t.map((c) => c.y - c.h / 2)) - e, a = Math.max(...t.map((c) => c.y + c.h / 2)) + e, d = Math.max(0.15, Math.min(i.width / (o - s), i.height / (a - r), 1.25)), l = De.translate(i.width / 2 - d * (s + o) / 2, i.height / 2 - d * (r + a) / 2).scale(d);
    te(n).call(this._zoomBehavior.transform, l);
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((g) => g.parentId === t.id), d = Math.min(...a.map((g) => g.x - g.w / 2)), l = Math.max(...a.map((g) => g.x + g.w / 2)), c = Math.min(...a.map((g) => g.y - g.h / 2)), h = Math.max(...a.map((g) => g.y + g.h / 2)), f = mi(
      a.map((g) => ({ dx: g.x - r.x, dy: g.y - r.y, w: g.w, h: g.h })),
      { w: s, h: o }
    ), m = (g) => {
      const u = this.toScene(g);
      if (g.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(f.w, 2 * Math.abs(u.x - r.x)),
          h: Math.max(f.h, 2 * Math.abs(u.y - r.y))
        };
        return;
      }
      const _ = r.x - n * r.w / 2, x = r.y - i * r.h / 2, M = n > 0 ? Math.max(u.x, _ + s, a.length ? l + 10 : -1 / 0) : Math.min(u.x, _ - s, a.length ? d - 10 : 1 / 0), O = i > 0 ? Math.max(u.y, x + o, a.length ? h + 10 : -1 / 0) : Math.min(u.y, x - o, a.length ? c - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + M) / 2,
        y: (x + O) / 2,
        w: Math.abs(M - _),
        h: Math.abs(O - x)
      };
    }, v = () => {
      window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", v), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", m), window.addEventListener("pointerup", v);
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
        const h = Math.hypot(l.x - d.x, l.y - d.y) || 1, f = -(l.y - d.y) / h * c, m = (l.x - d.x) / h * c;
        d = { x: d.x + f, y: d.y + m }, l = { x: l.x + f, y: l.y + m };
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
    return C`
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
          ${e.tooltip ? C`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${Ga(t, n)}
              fill="none"
              stroke=${i} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${e.label ? C`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
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
      var m;
      const f = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === h;
      return C`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(v) => {
        v.button === 0 && (v.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: h }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], h));
      }}
                        @dblclick=${(v) => {
        v.stopPropagation(), this.removeWaypoint(e, h);
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
    var f, m;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, d = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.h : e.h, l = a / 2, c = d / 2, h = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return C`
      <g data-node-id=${e.id} transform="translate(${t}, ${n})"
         @pointerdown=${(v) => this.onNodePointerDown(v, e)}
         @dblclick=${(v) => {
      v.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        <rect x=${-l} y=${-c} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? C`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? C`<text x=${-l} y=${-c - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && tt[e.symbol] && !r ? C`<g transform="translate(${l - 17}, ${-c + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${tt[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && tt[e.symbol] ? C`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${tt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? C`
              <foreignObject x=${-l + 6} y=${o ? -c + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(v) => v.stopPropagation()}
                  @keydown=${(v) => {
      v.stopPropagation(), v.key === "Enter" && this.commitRename(e, v.target.value), v.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(v) => this.commitRename(e, v.target.value)}
                />
              </foreignObject>` : r ? C`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? C`<text x=${-l + 12} y=${-c + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : C`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? C`<line x1=${-l + 8} y1=${-c + 28} x2=${l - 8} y2=${-c + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (!r || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event") ? [
      [l, 0],
      [-l, 0],
      [0, c],
      [0, -c]
    ].map(
      ([v, g]) => C`
                <circle data-handle cx=${v} cy=${g} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(u) => this.onHandlePointerDown(u, e)}>
                  <title>${r ? e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado: el actor lo usará (deriva una UI)" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([v, g]) => C`
                <rect data-resize x=${v * l - 6.5} y=${g * c - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${v * g > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(u) => this.onResizePointerDown(u, e, v, g)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return C``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!e) return C``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return C`
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
          const m = this.nodePos(f);
          return m.x >= a && m.x <= d && m.y >= l && m.y <= c;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: h });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return C``;
    const { a: e, b: t } = this._rubber;
    return C`
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
    const i = this.getBoundingClientRect(), s = this._t.k, o = De.translate(i.width / 2 - s * e, i.height / 2 - s * t).scale(s);
    te(n).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - i.left) / n, o = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return N``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return N`
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
      return C`<rect
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
      if (!a) return C``;
      const d = this.renderEdge(r, a, [...t]);
      for (let l = 0; l < a.length - 1; l++) t.push([a[l], a[l + 1]]);
      return d;
    }), i = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (i.has(r.sourceId) || i.has(r.targetId) ? o : s).push(
        n[a]
      );
    }), N`
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
      (r) => C`
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
F.styles = Vt`
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
B([
  ce({ attribute: !1 })
], F.prototype, "scene", 2);
B([
  ce({ attribute: !1 })
], F.prototype, "selectedId", 2);
B([
  ce({ attribute: !1 })
], F.prototype, "selectedIds", 2);
B([
  ce({ type: Boolean })
], F.prototype, "connectable", 2);
B([
  ce({ attribute: !1 })
], F.prototype, "edgePoints", 2);
B([
  b()
], F.prototype, "_t", 2);
B([
  b()
], F.prototype, "_dragPos", 2);
B([
  b()
], F.prototype, "_pendingLink", 2);
B([
  b()
], F.prototype, "_hoverNodeId", 2);
B([
  b()
], F.prototype, "_editingId", 2);
B([
  b()
], F.prototype, "_spaceDown", 2);
B([
  b()
], F.prototype, "_wpDrag", 2);
B([
  b()
], F.prototype, "_selectedWaypoint", 2);
B([
  b()
], F.prototype, "_resize", 2);
B([
  b()
], F.prototype, "_rubber", 2);
F = B([
  Bt("modux-canvas")
], F);
async function Za(e, t) {
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
var Qa = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, L = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ja(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && Qa(t, n, s), s;
};
const Ut = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, ja = Object.keys(Ut), ed = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 }
], td = ["CORE", "SUPPORTING", "GENERIC"], q = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function nd(e, t) {
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
function id(e, t) {
  const n = (e ?? []).find((i) => i.steps.some((s) => s.id === t));
  return n ? { elementType: "process", id: n.id } : null;
}
let R = class extends ve {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newExternalId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._multi = [], this._newViewName = "", this._activeViewId = "";
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
    return yi(this.layout[e]);
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
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const t of this.model.modules) {
          const n = (t.queryServices ?? []).find((i) => i.id === e.id);
          if (n) return [{ kind: "add-query-service", id: n.id, name: n.name, moduleId: t.id }];
        }
        return null;
      }
      case "add-query-call":
        return [{ kind: "remove-query-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-query-call":
        return [{ kind: "add-query-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-actor-use":
        return [{ kind: "remove-actor-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-use":
        return [{ kind: "add-actor-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-actor-crud":
        return [{ kind: "remove-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-crud":
        return [{ kind: "add-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case":
        return [{ kind: "remove-use-case", id: e.id }];
      case "remove-use-case": {
        for (const t of this.model.modules) {
          const n = (t.useCases ?? []).find((i) => i.id === e.id);
          if (n) return [{ kind: "add-use-case", id: n.id, name: n.name, moduleId: t.id }];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const t of this.model.externalSystems) {
          const n = (t.useCases ?? []).find((i) => i.id === e.id);
          if (n)
            return [{ kind: "add-external-use-case", id: n.id, name: n.name, moduleId: t.id }];
        }
        return null;
      }
      case "add-external-call":
        return [{ kind: "remove-external-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-external-call":
        return [{ kind: "add-external-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-external-uc-call":
        return [{ kind: "remove-external-uc-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-external-uc-call":
        return [{ kind: "add-external-uc-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case-call":
        return [{ kind: "remove-use-case-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-use-case-call":
        return [{ kind: "add-use-case-call", sourceId: e.sourceId, targetId: e.targetId }];
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
        const n = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((i) => i.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((i) => i.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((i) => i.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((i) => i.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((i) => i.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((i) => i.useCases ?? []) : e.type === "application-event" ? this.model.modules.flatMap((i) => i.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : this.model.entities ?? []).find((i) => i.id === e.id);
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
    const n = en(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
    const o = new Set((this.model.actors ?? []).map((g) => g.id));
    if (o.has(t)) {
      const g = new Set(
        this.model.modules.flatMap((_) => (_.useCases ?? []).map((x) => x.id))
      ), u = new Set(
        this.model.modules.flatMap((_) => (_.queryServices ?? []).map((x) => x.id))
      );
      if (g.has(n) || u.has(n)) {
        (this.model.actorUses ?? []).some(
          (x) => x.actorId === t && x.targetId === n
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: n });
        return;
      }
      if ((this.model.aggregates ?? []).some((_) => _.id === n)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: n });
        return;
      }
      return;
    }
    const r = new Set(
      this.model.modules.flatMap((g) => (g.domainEvents ?? []).map((u) => u.id))
    ), a = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((g) => g.id),
      ...this.model.modules.flatMap((g) => (g.domainServices ?? []).map((u) => u.id))
    ]), d = new Set(
      this.model.modules.flatMap((g) => (g.applicationEvents ?? []).map((u) => u.id))
    ), l = new Set(this.model.modules.flatMap((g) => (g.useCases ?? []).map((u) => u.id))), c = new Set(
      this.model.modules.flatMap((g) => (g.queryServices ?? []).map((u) => u.id))
    );
    if (l.has(t) && c.has(n)) {
      (this.model.queryCalls ?? []).some(
        (u) => u.sourceId === t && u.targetId === n
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: n });
      return;
    }
    const h = new Set(
      this.model.externalSystems.flatMap((g) => (g.useCases ?? []).map((u) => u.id))
    );
    if (l.has(t) && h.has(n)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (u) => u.sourceId === t && u.targetId === n
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: n });
      return;
    }
    if (l.has(t) && l.has(n) && t !== n) {
      (this.model.useCaseCalls ?? []).some(
        (u) => u.sourceId === t && u.targetId === n
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: n });
      return;
    }
    if (a.has(t) && r.has(n) || l.has(t) && d.has(n)) {
      (this.model.emissions ?? []).some(
        (u) => u.sourceId === t && u.domainEventId === n
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: n });
      return;
    }
    if (r.has(t) || d.has(t)) {
      const g = d.has(t), u = this.model.modules.flatMap((S) => (g ? S.applicationEvents : S.domainEvents) ?? []).find((S) => S.id === t), _ = this.model.modules.flatMap((S) => (S.useCases ?? []).map((X) => ({ u: X, module: S }))).find(({ u: S }) => S.id === n), x = this.model.modules.flatMap((S) => (S.readModels ?? []).map((X) => ({ rm: X, module: S }))).find(({ rm: S }) => S.id === n), M = this.model.modules.find((S) => S.id === n) ?? (x == null ? void 0 : x.module) ?? (_ == null ? void 0 : _.module);
      if (!u || !M) return;
      const O = new Set((this.model.aggregates ?? []).map((S) => S.id)), U = new Set(
        this.model.modules.flatMap((S) => (S.domainServices ?? []).map((X) => X.id))
      ), P = (this.model.emissions ?? []).find(
        (S) => S.domainEventId === t && (g ? l.has(S.sourceId) : O.has(S.sourceId) || U.has(S.sourceId))
      );
      if (!P) {
        this.emit("modux-notice", {
          message: g ? `Declara primero qué caso de uso publica ${u.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${u.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const $ = !g && O.has(P.sourceId);
      if (_) {
        if (this.model.flows.some(
          (X) => X.archetype === "TRIGGERS" && X.triggerEvent === u.name && X.targetUseCaseId === _.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(u.name)}-${q(_.u.name)}`,
          name: _.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: $ ? P.sourceId : "",
          triggerDomainServiceId: !g && !$ ? P.sourceId : void 0,
          triggerUseCaseId: g ? P.sourceId : void 0,
          triggerEvent: u.name,
          targetId: M.id,
          targetUseCaseId: _.u.id
        });
        return;
      }
      const E = (x == null ? void 0 : x.rm.name) ?? `${u.name}View`;
      if (this.model.flows.some(
        (S) => S.archetype === "MATERIALIZES" && S.triggerEvent === u.name && S.targetId === M.id && S.readModelName === E
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${q(u.name)}-${q(E)}`,
        name: E,
        archetype: "MATERIALIZES",
        triggerAggregateId: $ ? P.sourceId : "",
        triggerDomainServiceId: !g && !$ ? P.sourceId : void 0,
        triggerUseCaseId: g ? P.sourceId : void 0,
        triggerEvent: u.name,
        targetId: M.id,
        readModelName: E
      });
      return;
    }
    const f = /* @__PURE__ */ new Set([
      ...a,
      ...l,
      ...c,
      ...this.model.modules.flatMap((g) => (g.readModels ?? []).map((u) => u.id))
    ]);
    if (f.has(t) || f.has(n) || r.has(n) || d.has(n))
      return;
    const m = new Set(this.model.externalSystems.map((g) => g.id));
    if (m.has(t)) {
      new Set(
        this.model.modules.flatMap((u) => (u.useCases ?? []).map((_) => _.id))
      ).has(n) && ((this.model.externalCalls ?? []).some(
        (_) => _.externalSystemId === t && _.useCaseId === n
      ) || this.command({ kind: "add-external-call", sourceId: t, targetId: n }));
      return;
    }
    m.has(n) || o.has(n) || this.model.relations.some(
      (g) => g.sourceId === t && g.targetId === n || g.sourceId === n && g.targetId === t
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
    if (this._view === "context-map" && t === "edge" && i === "uc-call") {
      const s = /^uccall:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-use-case-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "qs-call") {
      const s = /^qscall:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-query-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "external-call") {
      const s = /^extcall:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "ext-uc-call") {
      const s = /^extuccall:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-uc-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "actor-use") {
      const s = /^use:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-use", sourceId: s[1], targetId: s[2] });
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
    if (t === "node" && i === "query-service") {
      this._selectedId = null, this.command({ kind: "remove-query-service", id: n });
      return;
    }
    if (t === "node" && i === "use-case") {
      this._selectedId = null, this.command({ kind: "remove-use-case", id: n });
      return;
    }
    if (t === "node" && i === "external-use-case") {
      this._selectedId = null, this.command({ kind: "remove-external-use-case", id: n });
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
    (n === "module" || n === "aggregate" || n === "entity" || n === "process-step" || n === "domain-event" || n === "read-model" || n === "domain-service" || n === "query-service" || n === "use-case" || n === "external-use-case" || n === "application-event" || n === "external-system" || n === "actor") && this.command({ kind: "rename-element", type: n, id: t.replace(/^tgt:/, ""), name: i });
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
      id: `step-${q(e)}`,
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${q(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
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
    const t = e.detail.kind === "process-step" ? id(this.model.processes, e.detail.id) : nd(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, n, i, s, o, r, a, d, l, c, h, f, m, v, g, u, _, x, M, O, U, P;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${q(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: q(e), name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const $ = (t = this.model.modules.find((z) => z.id === this._selectedId)) == null ? void 0 : t.id, E = this._newModuleId || $ || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!E) return;
          this.command({ kind: "add-domain-event", id: `ev-${q(e)}`, name: e, moduleId: E });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const $ = (i = this.model.modules.find((z) => z.id === this._selectedId)) == null ? void 0 : i.id, E = this._newModuleId || $ || ((s = this.model.modules[0]) == null ? void 0 : s.id);
          if (!E) return;
          this.command({ kind: "add-application-event", id: `aev-${q(e)}`, name: e, moduleId: E });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const $ = (o = this.model.modules.find((z) => z.id === this._selectedId)) == null ? void 0 : o.id, E = this._newModuleId || $ || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!E) return;
          this.command({ kind: "add-domain-service", id: `ds-${q(e)}`, name: e, moduleId: E });
        } else if (this._detail === "detail" && this._newContextMapKind === "query-service") {
          const $ = (a = this.model.modules.find((z) => z.id === this._selectedId)) == null ? void 0 : a.id, E = this._newModuleId || $ || ((d = this.model.modules[0]) == null ? void 0 : d.id);
          if (!E) return;
          this.command({ kind: "add-query-service", id: `qs-${q(e)}`, name: e, moduleId: E });
        } else if (this._detail === "detail" && this._newContextMapKind === "use-case") {
          const $ = (l = this.model.modules.find((z) => z.id === this._selectedId)) == null ? void 0 : l.id, E = this._newModuleId || $ || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!E) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: E });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-use-case") {
          const $ = (h = this.model.externalSystems.find((z) => z.id === this._selectedId)) == null ? void 0 : h.id, E = this._newExternalId || $ || ((f = this.model.externalSystems[0]) == null ? void 0 : f.id);
          if (!E) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${q(e)}`,
            name: e,
            moduleId: E
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const $ = (m = (this.model.aggregates ?? []).find((z) => z.id === this._selectedId)) == null ? void 0 : m.id, E = this._newAggregateId || $ || ((g = (v = this.model.aggregates) == null ? void 0 : v[0]) == null ? void 0 : g.id);
          if (!E) return;
          this.command({ kind: "add-read-model", id: `rm-${q(e)}`, name: e, aggregateId: E });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${q(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const $ = this._newModuleId || ((u = this.model.modules[0]) == null ? void 0 : u.id);
        if (!$) return;
        this.command({ kind: "add-aggregate", id: `agg-${q(e)}`, name: e, moduleId: $ });
      } else if (this._view === "flows") {
        const $ = this._newTriggerAggId || ((x = (_ = this.model.aggregates) == null ? void 0 : _[0]) == null ? void 0 : x.id), E = this._newTargetId || ((M = this.model.modules[0]) == null ? void 0 : M.id), z = this._newTriggerEvent.trim();
        if (!$ || !E || !z) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: $,
          triggerEvent: z,
          targetId: E
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const $ = this._newModuleId || ((O = this.model.modules[0]) == null ? void 0 : O.id);
        if (!$) return;
        this.command({
          kind: "add-process",
          id: `proc-${q(e)}`,
          name: e,
          moduleId: $,
          triggerAggregateId: this._newTriggerAggId || ((P = (U = this.model.aggregates) == null ? void 0 : U[0]) == null ? void 0 : P.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), n = this.filteredModel();
    return e === "aggregates" ? Di(n, t.nodes) : e === "flows" ? Wi(n, t.nodes) : e === "processes" ? en(n, t.nodes) : Mi(n, t.nodes, this._detail === "detail", t.sizes ?? {});
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((l) => !l.parentId), i = new Set(n.map((l) => l.id)), s = {
      nodes: n,
      edges: t.edges.filter((l) => i.has(l.sourceId) && i.has(l.targetId))
    }, r = await Za(s, e === "flows" || e === "processes" ? "layered" : "force"), a = this.viewLayout(e);
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
    return N`
      <div class="toolbar">
        <div class="tabs">
          ${ed.map(
      (t) => N`
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
      (t) => N`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        <div class="spacer"></div>
        ${this._multi.length ? N`
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
        ${this._view === "context-map" ? N`<select
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
              ${this._detail === "detail" ? N`
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
                    <option
                      value="query-service"
                      ?selected=${this._newContextMapKind === "query-service"}
                    >
                      Query service
                    </option>
                    <option value="use-case" ?selected=${this._newContextMapKind === "use-case"}>
                      Caso de uso
                    </option>
                    <option
                      value="external-use-case"
                      ?selected=${this._newContextMapKind === "external-use-case"}
                    >
                      Caso de uso externo
                    </option>
                  ` : ""}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "external-use-case" ? N`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var n;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((n = this.model.externalSystems[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "read-model" ? N`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? N`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${td.map(
      (t) => N`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case") ? N`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var n;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? N`
              ${this._view === "flows" ? N`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => N`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return N`<option
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
              ${this._view === "flows" ? N`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var n;
        return N`<option
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? N`
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
      (t) => N`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? N`<input
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
              ${this.owningProcessOf(this._selectedId) ? N`
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
        ${this._view === "context-map" ? N`Arrastra para reordenar · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : N`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return N`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${ja.map(
      (i) => N`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${Ut[i].abbr}</span>
              <span class="name">${Ut[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
R.styles = Vt`
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
L([
  ce({ attribute: !1 })
], R.prototype, "model", 2);
L([
  ce({ attribute: !1 })
], R.prototype, "layout", 2);
L([
  b()
], R.prototype, "_view", 2);
L([
  b()
], R.prototype, "_detail", 2);
L([
  b()
], R.prototype, "_relationType", 2);
L([
  b()
], R.prototype, "_relationPicker", 2);
L([
  b()
], R.prototype, "_selectedId", 2);
L([
  b()
], R.prototype, "_newName", 2);
L([
  b()
], R.prototype, "_newSubdomain", 2);
L([
  b()
], R.prototype, "_newModuleId", 2);
L([
  b()
], R.prototype, "_newContextMapKind", 2);
L([
  b()
], R.prototype, "_newAggregateId", 2);
L([
  b()
], R.prototype, "_newExternalId", 2);
L([
  b()
], R.prototype, "_newArchetype", 2);
L([
  b()
], R.prototype, "_newTriggerAggId", 2);
L([
  b()
], R.prototype, "_newTriggerEvent", 2);
L([
  b()
], R.prototype, "_newTargetId", 2);
L([
  b()
], R.prototype, "_undoStack", 2);
L([
  b()
], R.prototype, "_redoStack", 2);
L([
  b()
], R.prototype, "_newStepName", 2);
L([
  b()
], R.prototype, "_newStepType", 2);
L([
  b()
], R.prototype, "_newStepRole", 2);
L([
  b()
], R.prototype, "_newStepDeadline", 2);
L([
  b()
], R.prototype, "_editStepRole", 2);
L([
  b()
], R.prototype, "_editStepDeadline", 2);
L([
  b()
], R.prototype, "_editStepComp", 2);
L([
  b()
], R.prototype, "_multi", 2);
L([
  b()
], R.prototype, "_newViewName", 2);
L([
  b()
], R.prototype, "_activeViewId", 2);
R = L([
  Bt("modux-editor")
], R);
var sd = Object.defineProperty, rd = Object.getOwnPropertyDescriptor, $e = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? rd(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && sd(t, n, s), s;
};
let le = class extends ve {
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
    return this._error ? N`<div class="status error">modux editor: ${this._error}</div>` : this._model ? N`
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(e) => this.showToast(e.detail.message, e.detail.kind ?? "info")}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? N`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : N`<div class="status">Cargando el modelo…</div>`;
  }
};
le.styles = Vt`
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
$e([
  ce()
], le.prototype, "base", 2);
$e([
  b()
], le.prototype, "_model", 2);
$e([
  b()
], le.prototype, "_layout", 2);
$e([
  b()
], le.prototype, "_error", 2);
$e([
  b()
], le.prototype, "_saving", 2);
$e([
  b()
], le.prototype, "_toast", 2);
le = $e([
  Bt("modux-editor-connected")
], le);
export {
  od as CONTAINER_HEADER,
  ad as CONTAINER_INSET,
  F as ModuxCanvas,
  R as ModuxEditor,
  le as ModuxEditorConnected,
  Di as aggregatesScene,
  gi as containerFit,
  mi as containerMinSize,
  Mi as contextMapScene,
  bi as flowCoherence,
  Wi as flowsScene,
  yi as normalizeViewLayout,
  en as processesScene,
  $i as relationEdgeId
};
