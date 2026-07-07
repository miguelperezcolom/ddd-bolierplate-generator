const $d = 34, bd = 10;
function Ii(e, t = { w: 160, h: 90 }) {
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
function $i(e, t, n) {
  let i = t.w / 2, s = t.w / 2, r = t.h / 2, o = t.h / 2;
  for (const a of n)
    i = Math.max(i, -a.dx + a.w / 2 + 10), s = Math.max(s, a.dx + a.w / 2 + 10), r = Math.max(r, -a.dy + a.h / 2 + 34), o = Math.max(o, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (s - i) / 2,
    y: e.y + (o - r) / 2,
    w: i + s,
    h: r + o
  };
}
function bi(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const ki = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ei = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Si = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Rt = 168, Ot = 56, Hn = 34, qn = 14, Ci = 14, We = 108, Fe = 32, Vn = 12, Wn = 10, Ke = 2, Ai = Ke * We + (Ke - 1) * Vn + 2 * qn;
function Mi(e, t) {
  return `rel:${e}->${t}`;
}
function Ni(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (i) => i.sourceId === t.sourceId && i.targetId === t.targetId && i.declared
  ) ? "OK" : e.relations.some(
    (i) => i.sourceId === t.targetId && i.targetId === t.sourceId && i.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function kt(e, t) {
  const n = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const Ti = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Pi = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" },
  "query-service": { symbol: "lens", fill: "#f0f9ff", stroke: "#0284c7" },
  "external-use-case": { symbol: "usecase", fill: "#f8fafc", stroke: "#64748b" }
}, Ri = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Query service",
  "external-use-case": "Caso de uso externo"
};
function Oi(e) {
  const t = Math.max(1, Math.ceil(e / Ke)), n = t * Fe + (t - 1) * Wn;
  return { w: Ai, h: Hn + n + Ci };
}
function Li(e, t) {
  const n = e % Ke, i = Math.floor(e / Ke);
  return {
    x: -t.w / 2 + qn + n * (We + Vn) + We / 2,
    y: -t.h / 2 + Hn + i * (Fe + Wn) + Fe / 2
  };
}
function Di(e, t, n, i, s, r) {
  const a = [
    ...(e.aggregates ?? []).filter((d) => d.moduleId === t.id).map((d) => ({ id: d.id, name: d.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "use-case", policy: d.policy })
    ),
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
  return a.length ? Fn(n, i, a, s, r) : [{ ...i, x: n.x, y: n.y, w: Rt, h: Ot }];
}
function Fn(e, t, n, i, s) {
  const r = s[t.id] ?? Oi(n.length), o = n.map((c, f) => i[c.id] ?? Li(f, r)), a = $i(
    e,
    r,
    o.map((c) => ({ dx: c.x, dy: c.y, w: We, h: Fe }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, l = n.map((c, f) => {
    const p = o[f], w = c.policy ? Ti : Pi[c.kind];
    return {
      id: c.id,
      label: c.name,
      kind: c.kind,
      x: e.x + p.x,
      y: e.y + p.y,
      w: We,
      h: Fe,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${c.policy ? "Policy" : Ri[c.kind]} ${c.name}`
    };
  });
  return [d, ...l];
}
function Ui(e, t, n = !1, i = {}) {
  const s = [
    ...e.modules.map((u) => ({ ref: u, external: !1 })),
    ...e.externalSystems.map((u) => ({ ref: u, external: !0 }))
  ], r = s.flatMap((u, b) => {
    const E = t[u.ref.id] ?? kt(b, s.length);
    if (u.external) {
      const U = u.ref, W = {
        id: U.id,
        label: U.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${U.name} (sistema externo)`
      };
      return n && (U.useCases ?? []).length > 0 ? Fn(
        E,
        W,
        (U.useCases ?? []).map((G) => ({ id: G.id, name: G.name, kind: "external-use-case" })),
        t,
        i
      ) : [{ ...W, x: E.x, y: E.y, w: Rt, h: Ot }];
    }
    const M = u.ref, T = M.subdomainType ?? "GENERIC", R = {
      id: M.id,
      label: M.name,
      kind: "module",
      symbol: "component",
      fill: ki[T],
      stroke: "#94a3b8",
      badge: T,
      tooltip: `${M.name} — subdominio ${T}`
    };
    return n ? Di(e, M, E, R, t, i) : [{ ...R, x: E.x, y: E.y, w: Rt, h: Ot }];
  }), o = s.length + (e.actors ?? []).length + (e.aiAgents ?? []).length;
  (e.actors ?? []).forEach((u, b) => {
    const E = t[u.id] ?? kt(s.length + b, o);
    r.push({
      id: u.id,
      label: u.name,
      x: E.x,
      y: E.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${u.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((u, b) => {
    const E = t[u.id] ?? kt(s.length + (e.actors ?? []).length + b, o);
    r.push({
      id: u.id,
      label: u.name,
      x: E.x,
      y: E.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${u.name} (agente de IA — consume por MCP)`
    });
  }), r.sort((u, b) => (u.parentId ? 1 : 0) - (b.parentId ? 1 : 0));
  const a = e.relations.map((u) => ({
    id: Mi(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? Ei[u.type] : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), d = e.flows.map((u) => {
    var U, W, G, h, g, x;
    const b = Ni(e, u), E = n ? e.modules.find(($) => $.id === u.sourceId) : void 0, M = ((U = E == null ? void 0 : E.domainEvents) == null ? void 0 : U.find(($) => $.name === u.triggerEvent)) ?? ((W = E == null ? void 0 : E.applicationEvents) == null ? void 0 : W.find(($) => $.name === u.triggerEvent)), T = n && u.readModelName ? (h = (G = e.modules.find(($) => $.id === u.targetId)) == null ? void 0 : G.readModels) == null ? void 0 : h.find(($) => $.name === u.readModelName) : void 0, R = n && u.targetUseCaseId ? (x = (g = e.modules.find(($) => $.id === u.targetId)) == null ? void 0 : g.useCases) == null ? void 0 : x.find(($) => $.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (M == null ? void 0 : M.id) ?? u.sourceId,
      targetId: (R == null ? void 0 : R.id) ?? (T == null ? void 0 : T.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: Si[b],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${b}`
    };
  }), l = new Set(r.map((u) => u.id)), c = n ? (e.emissions ?? []).filter((u) => l.has(u.sourceId) && l.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], f = n ? (e.useCaseCalls ?? []).filter((u) => l.has(u.sourceId) && l.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], p = n ? (e.queryCalls ?? []).filter((u) => l.has(u.sourceId) && l.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], w = n ? (e.actorUses ?? []).filter((u) => l.has(u.actorId) && l.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], I = n ? (e.agentUses ?? []).filter((u) => l.has(u.agentId) && l.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], y = n ? (e.externalCalls ?? []).filter((u) => l.has(u.externalSystemId) && l.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], v = n ? (e.externalUseCaseCalls ?? []).filter((u) => l.has(u.sourceId) && l.has(u.targetId)).map((u) => ({
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
    nodes: r,
    edges: [
      ...a,
      ...d,
      ...c,
      ...f,
      ...p,
      ...w,
      ...I,
      ...y,
      ...v
    ]
  };
}
const zi = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Hi = 176, qi = 60, Vi = 140, Wi = 40;
function Fi(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.modules.forEach((s, r) => {
    const o = 220 + r * 340;
    n.filter((d) => d.moduleId === s.id).forEach((d, l) => {
      const c = i.filter((p) => p.aggregateId === d.id).length, f = 140 + l * (170 + c * 60);
      t[d.id] = { x: o, y: f }, i.filter((p) => p.aggregateId === d.id).forEach((p, w) => {
        t[p.id] = { x: o + 60, y: f + 100 + w * 60 };
      });
    });
  }), n.filter((s) => !e.modules.some((r) => r.id === s.moduleId)).forEach((s, r) => {
    t[s.id] = { x: 220 + r * 340, y: 640 };
  }), t;
}
function Ki(e, t) {
  const n = Fi(e), i = (l) => t[l] ?? n[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), r = (e.aggregates ?? []).map((l) => {
    const c = s.get(l.moduleId), f = (c == null ? void 0 : c.subdomainType) ?? "GENERIC", p = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: p.x,
      y: p.y,
      w: Hi,
      h: qi,
      kind: "aggregate",
      symbol: "aggregate",
      fill: zi[f],
      stroke: "#64748b",
      badge: c ? `${c.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${c ? ` — módulo ${c.name} (${f})` : ""}`
    };
  }), o = (e.entities ?? []).map((l) => {
    const c = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: c.x,
      y: c.y,
      w: Vi,
      h: Wi,
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
    nodes: [...r, ...o],
    edges: [...a, ...d]
  };
}
const Bi = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Gi = 150, Yi = 44, Xi = 190, Zi = 56, ji = 160, Qi = 48;
function Ji(e, t) {
  const n = e.externalSystems.find((s) => s.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function es(e, t) {
  const n = e.flows, i = [], s = [], r = /* @__PURE__ */ new Set(), o = (a) => {
    var d, l;
    return ((l = (d = e.aggregates) == null ? void 0 : d.find((c) => c.id === a)) == null ? void 0 : l.name) ?? a ?? "?";
  };
  return n.forEach((a, d) => {
    const l = 120 + d * 130, c = Bi[a.archetype] ?? "#475569", f = a.triggerAggregateId ?? a.sourceId;
    if (!r.has(f)) {
      r.add(f);
      const v = t[f] ?? { x: 160, y: l };
      i.push({
        id: f,
        label: a.triggerAggregateId ? o(a.triggerAggregateId) : f,
        x: v.x,
        y: v.y,
        w: Gi,
        h: Yi,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const p = `flow:${a.id}`, w = t[p] ?? { x: 470, y: l };
    i.push({
      id: p,
      label: a.name,
      x: w.x,
      y: w.y,
      w: Xi,
      h: Zi,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: c,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const I = Ji(e, a), y = `tgt:${I.id}`;
    if (!r.has(y)) {
      r.add(y);
      const v = t[y] ?? { x: 790, y: l };
      i.push({
        id: y,
        label: I.label,
        x: v.x,
        y: v.y,
        w: ji,
        h: Qi,
        kind: I.external ? "external-system" : "module",
        symbol: "component",
        fill: I.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: I.external,
        badge: I.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${a.id}:in`,
      sourceId: f,
      targetId: p,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: p,
      targetId: y,
      kind: "flow-delivery",
      color: c,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const ts = 190, ns = 56, Et = 170, is = 52;
function rn(e, t) {
  const n = [], i = [], s = (r) => {
    var o;
    return (o = e.modules.find((a) => a.id === r)) == null ? void 0 : o.name;
  };
  return (e.processes ?? []).forEach((r, o) => {
    const a = 140 + o * 240, d = t[r.id] ?? { x: 150, y: a };
    n.push({
      id: r.id,
      label: r.name,
      x: d.x,
      y: d.y,
      w: ts,
      h: ns,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${r.sla ? ` · SLA ${r.sla}` : ""}`,
      tooltip: `${r.name}${s(r.ownerModuleId) ? ` — módulo ${s(r.ownerModuleId)}` : ""}${r.triggerEvent ? ` · arranca con ${r.triggerEvent}` : ""}`
    });
    let l = r.id;
    if (r.steps.forEach((c, f) => {
      const p = c.type === "HUMAN", w = t[c.id] ?? { x: 150 + (f + 1) * 240, y: a };
      if (n.push({
        id: c.id,
        label: c.name,
        x: w.x,
        y: w.y,
        w: Et,
        h: is,
        kind: "process-step",
        symbol: p ? "person" : "gear",
        fill: p ? "#fef3c7" : "#ffffff",
        stroke: p ? "#d97706" : "#64748b",
        badge: p ? `HUMAN${c.roleId ? ` · ${c.roleId}` : ""}${c.deadline ? ` · ⏱ ${c.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${c.name}${c.useCaseId ? ` — use case ${c.useCaseId}` : ""}${c.deadline ? ` · deadline ${c.deadline}` : ""}`
      }), i.push({
        id: `pe:${r.id}:${f}`,
        sourceId: l,
        targetId: c.id,
        kind: "process-seq",
        label: f === 0 ? r.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), c.compensationUseCaseId) {
        const I = `comp:${c.id}`, y = t[I] ?? { x: w.x, y: w.y + 90 };
        n.push({
          id: I,
          label: c.compensationUseCaseId,
          x: y.x,
          y: y.y,
          w: Et,
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
          targetId: I,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      l = c.id;
    }), r.onCompletionEventName) {
      const c = `done:${r.id}`, f = t[c] ?? { x: 150 + (r.steps.length + 1) * 240, y: a };
      n.push({
        id: c,
        label: r.onCompletionEventName,
        x: f.x,
        y: f.y,
        w: Et,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), i.push({
        id: `pd:${r.id}`,
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
const at = globalThis, Bt = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gt = Symbol(), an = /* @__PURE__ */ new WeakMap();
let Kn = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Bt && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = an.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && an.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ss = (e) => new Kn(typeof e == "string" ? e : e + "", void 0, Gt), Yt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[r + 1], e[0]);
  return new Kn(n, e, Gt);
}, os = (e, t) => {
  if (Bt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = at.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, e.appendChild(i);
  }
}, dn = Bt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return ss(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rs, defineProperty: as, getOwnPropertyDescriptor: ds, getOwnPropertyNames: ls, getOwnPropertySymbols: cs, getPrototypeOf: us } = Object, we = globalThis, ln = we.trustedTypes, hs = ln ? ln.emptyScript : "", St = we.reactiveElementPolyfillSupport, He = (e, t) => e, ht = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? hs : null;
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
} }, Xt = (e, t) => !rs(e, t), cn = { attribute: !0, type: String, converter: ht, reflect: !1, useDefault: !1, hasChanged: Xt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), we.litPropertyMetadata ?? (we.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ae = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = cn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, n);
      s !== void 0 && as(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: s, set: r } = ds(this.prototype, t) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: s, set(o) {
      const a = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const t = us(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const n = this.properties, i = [...ls(n), ...cs(n)];
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
      for (const s of i) n.unshift(dn(s));
    } else t !== void 0 && n.push(dn(t));
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
    return os(t, this.constructor.elementStyles), t;
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
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : ht).toAttribute(n, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var r, o;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : ht;
      this._$Em = s;
      const l = d.fromAttribute(n, a.type);
      this[s] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, s = !1, r) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Xt)(r, n) || i.useDefault && i.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? n ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: a } = o, d = this[r];
        a !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, o, d);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
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
Ae.elementStyles = [], Ae.shadowRootOptions = { mode: "open" }, Ae[He("elementProperties")] = /* @__PURE__ */ new Map(), Ae[He("finalized")] = /* @__PURE__ */ new Map(), St == null || St({ ReactiveElement: Ae }), (we.reactiveElementVersions ?? (we.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis, un = (e) => e, ft = qe.trustedTypes, hn = ft ? ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Bn = "$lit$", ge = `lit$${Math.random().toFixed(9).slice(2)}$`, Gn = "?" + ge, fs = `<${Gn}>`, ke = document, Be = () => ke.createComment(""), Ge = (e) => e === null || typeof e != "object" && typeof e != "function", Zt = Array.isArray, ps = (e) => Zt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ct = `[ 	
\f\r]`, Oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fn = /-->/g, pn = />/g, ye = RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mn = /'/g, gn = /"/g, Yn = /^(?:script|style|textarea|title)$/i, Xn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), A = Xn(1), O = Xn(2), Ne = Symbol.for("lit-noChange"), K = Symbol.for("lit-nothing"), wn = /* @__PURE__ */ new WeakMap(), _e = ke.createTreeWalker(ke, 129);
function Zn(e, t) {
  if (!Zt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hn !== void 0 ? hn.createHTML(t) : t;
}
const ms = (e, t) => {
  const n = e.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Oe;
  for (let a = 0; a < n; a++) {
    const d = e[a];
    let l, c, f = -1, p = 0;
    for (; p < d.length && (o.lastIndex = p, c = o.exec(d), c !== null); ) p = o.lastIndex, o === Oe ? c[1] === "!--" ? o = fn : c[1] !== void 0 ? o = pn : c[2] !== void 0 ? (Yn.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = ye) : c[3] !== void 0 && (o = ye) : o === ye ? c[0] === ">" ? (o = s ?? Oe, f = -1) : c[1] === void 0 ? f = -2 : (f = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? ye : c[3] === '"' ? gn : mn) : o === gn || o === mn ? o = ye : o === fn || o === pn ? o = Oe : (o = ye, s = void 0);
    const w = o === ye && e[a + 1].startsWith("/>") ? " " : "";
    r += o === Oe ? d + fs : f >= 0 ? (i.push(l), d.slice(0, f) + Bn + d.slice(f) + ge + w) : d + ge + (f === -2 ? a : w);
  }
  return [Zn(e, r + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ye {
  constructor({ strings: t, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, d = this.parts, [l, c] = ms(t, n);
    if (this.el = Ye.createElement(l, i), _e.currentNode = this.el.content, n === 2 || n === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (s = _e.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const f of s.getAttributeNames()) if (f.endsWith(Bn)) {
          const p = c[o++], w = s.getAttribute(f).split(ge), I = /([.?@])?(.*)/.exec(p);
          d.push({ type: 1, index: r, name: I[2], strings: w, ctor: I[1] === "." ? ws : I[1] === "?" ? ys : I[1] === "@" ? vs : _t }), s.removeAttribute(f);
        } else f.startsWith(ge) && (d.push({ type: 6, index: r }), s.removeAttribute(f));
        if (Yn.test(s.tagName)) {
          const f = s.textContent.split(ge), p = f.length - 1;
          if (p > 0) {
            s.textContent = ft ? ft.emptyScript : "";
            for (let w = 0; w < p; w++) s.append(f[w], Be()), _e.nextNode(), d.push({ type: 2, index: ++r });
            s.append(f[p], Be());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Gn) d.push({ type: 2, index: r });
      else {
        let f = -1;
        for (; (f = s.data.indexOf(ge, f + 1)) !== -1; ) d.push({ type: 7, index: r }), f += ge.length - 1;
      }
      r++;
    }
  }
  static createElement(t, n) {
    const i = ke.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Te(e, t, n = e, i) {
  var o, a;
  if (t === Ne) return t;
  let s = i !== void 0 ? (o = n._$Co) == null ? void 0 : o[i] : n._$Cl;
  const r = Ge(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), r === void 0 ? s = void 0 : (s = new r(e), s._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (t = Te(e, s._$AS(e, t.values), s, i)), t;
}
class gs {
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
    const { el: { content: n }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? ke).importNode(n, !0);
    _e.currentNode = s;
    let r = _e.nextNode(), o = 0, a = 0, d = i[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let l;
        d.type === 2 ? l = new Je(r, r.nextSibling, this, t) : d.type === 1 ? l = new d.ctor(r, d.name, d.strings, this, t) : d.type === 6 && (l = new _s(r, this, t)), this._$AV.push(l), d = i[++a];
      }
      o !== (d == null ? void 0 : d.index) && (r = _e.nextNode(), o++);
    }
    return _e.currentNode = ke, s;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Je {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, n, i, s) {
    this.type = 2, this._$AH = K, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Te(this, t, n), Ge(t) ? t === K || t == null || t === "" ? (this._$AH !== K && this._$AR(), this._$AH = K) : t !== this._$AH && t !== Ne && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ps(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== K && Ge(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ke.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: n, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ye.createElement(Zn(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(n);
    else {
      const o = new gs(s, this), a = o.u(this.options);
      o.p(n), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let n = wn.get(t.strings);
    return n === void 0 && wn.set(t.strings, n = new Ye(t)), n;
  }
  k(t) {
    Zt(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const r of t) s === n.length ? n.push(i = new Je(this.O(Be()), this.O(Be()), this, this.options)) : i = n[s], i._$AI(r), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const s = un(t).nextSibling;
      un(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class _t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, s, r) {
    this.type = 1, this._$AH = K, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = K;
  }
  _$AI(t, n = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = Te(this, t, n, 0), o = !Ge(t) || t !== this._$AH && t !== Ne, o && (this._$AH = t);
    else {
      const a = t;
      let d, l;
      for (t = r[0], d = 0; d < r.length - 1; d++) l = Te(this, a[i + d], n, d), l === Ne && (l = this._$AH[d]), o || (o = !Ge(l) || l !== this._$AH[d]), l === K ? t = K : t !== K && (t += (l ?? "") + r[d + 1]), this._$AH[d] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === K ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ws extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === K ? void 0 : t;
  }
}
class ys extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== K);
  }
}
class vs extends _t {
  constructor(t, n, i, s, r) {
    super(t, n, i, s, r), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Te(this, t, n, 0) ?? K) === Ne) return;
    const i = this._$AH, s = t === K && i !== K || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== K && (i === K || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _s {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Te(this, t);
  }
}
const At = qe.litHtmlPolyfillSupport;
At == null || At(Ye, Je), (qe.litHtmlVersions ?? (qe.litHtmlVersions = [])).push("3.3.3");
const xs = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new Je(t.insertBefore(Be(), r), r, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis;
class $e extends Ae {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xs(n, this.renderRoot, this.renderOptions);
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
    return Ne;
  }
}
var zn;
$e._$litElement$ = !0, $e.finalized = !0, (zn = Ie.litElementHydrateSupport) == null || zn.call(Ie, { LitElement: $e });
const Mt = Ie.litElementPolyfillSupport;
Mt == null || Mt({ LitElement: $e });
(Ie.litElementVersions ?? (Ie.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = { attribute: !0, type: String, converter: ht, reflect: !1, hasChanged: Xt }, $s = (e = Is, t, n) => {
  const { kind: i, metadata: s } = n;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(n.name, e), i === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const d = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, d, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = n;
    return function(a) {
      const d = this[o];
      t.call(this, a), this.requestUpdate(o, d, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function pe(e) {
  return (t, n) => typeof n == "object" ? $s(e, t, n) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(e) {
  return pe({ ...e, state: !0, attribute: !1 });
}
var Lt = "http://www.w3.org/1999/xhtml";
const yn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function xt(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), yn.hasOwnProperty(t) ? { space: yn[t], local: e } : e;
}
function bs(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Lt && t.documentElement.namespaceURI === Lt ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function ks(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function jn(e) {
  var t = xt(e);
  return (t.local ? ks : bs)(t);
}
function Es() {
}
function Qt(e) {
  return e == null ? Es : function() {
    return this.querySelector(e);
  };
}
function Ss(e) {
  typeof e != "function" && (e = Qt(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = t[s], o = r.length, a = i[s] = new Array(o), d, l, c = 0; c < o; ++c)
      (d = r[c]) && (l = e.call(d, d.__data__, c, r)) && ("__data__" in d && (l.__data__ = d.__data__), a[c] = l);
  return new Q(i, this._parents);
}
function Cs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function As() {
  return [];
}
function Qn(e) {
  return e == null ? As : function() {
    return this.querySelectorAll(e);
  };
}
function Ms(e) {
  return function() {
    return Cs(e.apply(this, arguments));
  };
}
function Ns(e) {
  typeof e == "function" ? e = Ms(e) : e = Qn(e);
  for (var t = this._groups, n = t.length, i = [], s = [], r = 0; r < n; ++r)
    for (var o = t[r], a = o.length, d, l = 0; l < a; ++l)
      (d = o[l]) && (i.push(e.call(d, d.__data__, l, o)), s.push(d));
  return new Q(i, s);
}
function Jn(e) {
  return function() {
    return this.matches(e);
  };
}
function ei(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ts = Array.prototype.find;
function Ps(e) {
  return function() {
    return Ts.call(this.children, e);
  };
}
function Rs() {
  return this.firstElementChild;
}
function Os(e) {
  return this.select(e == null ? Rs : Ps(typeof e == "function" ? e : ei(e)));
}
var Ls = Array.prototype.filter;
function Ds() {
  return Array.from(this.children);
}
function Us(e) {
  return function() {
    return Ls.call(this.children, e);
  };
}
function zs(e) {
  return this.selectAll(e == null ? Ds : Us(typeof e == "function" ? e : ei(e)));
}
function Hs(e) {
  typeof e != "function" && (e = Jn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = t[s], o = r.length, a = i[s] = [], d, l = 0; l < o; ++l)
      (d = r[l]) && e.call(d, d.__data__, l, r) && a.push(d);
  return new Q(i, this._parents);
}
function ti(e) {
  return new Array(e.length);
}
function qs() {
  return new Q(this._enter || this._groups.map(ti), this._parents);
}
function pt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
pt.prototype = {
  constructor: pt,
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
function Vs(e) {
  return function() {
    return e;
  };
}
function Ws(e, t, n, i, s, r) {
  for (var o = 0, a, d = t.length, l = r.length; o < l; ++o)
    (a = t[o]) ? (a.__data__ = r[o], i[o] = a) : n[o] = new pt(e, r[o]);
  for (; o < d; ++o)
    (a = t[o]) && (s[o] = a);
}
function Fs(e, t, n, i, s, r, o) {
  var a, d, l = /* @__PURE__ */ new Map(), c = t.length, f = r.length, p = new Array(c), w;
  for (a = 0; a < c; ++a)
    (d = t[a]) && (p[a] = w = o.call(d, d.__data__, a, t) + "", l.has(w) ? s[a] = d : l.set(w, d));
  for (a = 0; a < f; ++a)
    w = o.call(e, r[a], a, r) + "", (d = l.get(w)) ? (i[a] = d, d.__data__ = r[a], l.delete(w)) : n[a] = new pt(e, r[a]);
  for (a = 0; a < c; ++a)
    (d = t[a]) && l.get(p[a]) === d && (s[a] = d);
}
function Ks(e) {
  return e.__data__;
}
function Bs(e, t) {
  if (!arguments.length) return Array.from(this, Ks);
  var n = t ? Fs : Ws, i = this._parents, s = this._groups;
  typeof e != "function" && (e = Vs(e));
  for (var r = s.length, o = new Array(r), a = new Array(r), d = new Array(r), l = 0; l < r; ++l) {
    var c = i[l], f = s[l], p = f.length, w = Gs(e.call(c, c && c.__data__, l, i)), I = w.length, y = a[l] = new Array(I), v = o[l] = new Array(I), u = d[l] = new Array(p);
    n(c, f, y, v, u, w, t);
    for (var b = 0, E = 0, M, T; b < I; ++b)
      if (M = y[b]) {
        for (b >= E && (E = b + 1); !(T = v[E]) && ++E < I; ) ;
        M._next = T || null;
      }
  }
  return o = new Q(o, i), o._enter = a, o._exit = d, o;
}
function Gs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ys() {
  return new Q(this._exit || this._groups.map(ti), this._parents);
}
function Xs(e, t, n) {
  var i = this.enter(), s = this, r = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? r.remove() : n(r), i && s ? i.merge(s).order() : s;
}
function Zs(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, s = n.length, r = i.length, o = Math.min(s, r), a = new Array(s), d = 0; d < o; ++d)
    for (var l = n[d], c = i[d], f = l.length, p = a[d] = new Array(f), w, I = 0; I < f; ++I)
      (w = l[I] || c[I]) && (p[I] = w);
  for (; d < s; ++d)
    a[d] = n[d];
  return new Q(a, this._parents);
}
function js() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], s = i.length - 1, r = i[s], o; --s >= 0; )
      (o = i[s]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function Qs(e) {
  e || (e = Js);
  function t(f, p) {
    return f && p ? e(f.__data__, p.__data__) : !f - !p;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), r = 0; r < i; ++r) {
    for (var o = n[r], a = o.length, d = s[r] = new Array(a), l, c = 0; c < a; ++c)
      (l = o[c]) && (d[c] = l);
    d.sort(t);
  }
  return new Q(s, this._parents).order();
}
function Js(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function eo() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function to() {
  return Array.from(this);
}
function no() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, r = i.length; s < r; ++s) {
      var o = i[s];
      if (o) return o;
    }
  return null;
}
function io() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function so() {
  return !this.node();
}
function oo(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var s = t[n], r = 0, o = s.length, a; r < o; ++r)
      (a = s[r]) && e.call(a, a.__data__, r, s);
  return this;
}
function ro(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ao(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function lo(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function co(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function uo(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function ho(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function fo(e, t) {
  var n = xt(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? ao : ro : typeof t == "function" ? n.local ? ho : uo : n.local ? co : lo)(n, t));
}
function ni(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function po(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function mo(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function go(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function wo(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? po : typeof t == "function" ? go : mo)(e, t, n ?? "")) : Pe(this.node(), e);
}
function Pe(e, t) {
  return e.style.getPropertyValue(t) || ni(e).getComputedStyle(e, null).getPropertyValue(t);
}
function yo(e) {
  return function() {
    delete this[e];
  };
}
function vo(e, t) {
  return function() {
    this[e] = t;
  };
}
function _o(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function xo(e, t) {
  return arguments.length > 1 ? this.each((t == null ? yo : typeof t == "function" ? _o : vo)(e, t)) : this.node()[e];
}
function ii(e) {
  return e.trim().split(/^|\s+/);
}
function Jt(e) {
  return e.classList || new si(e);
}
function si(e) {
  this._node = e, this._names = ii(e.getAttribute("class") || "");
}
si.prototype = {
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
function oi(e, t) {
  for (var n = Jt(e), i = -1, s = t.length; ++i < s; ) n.add(t[i]);
}
function ri(e, t) {
  for (var n = Jt(e), i = -1, s = t.length; ++i < s; ) n.remove(t[i]);
}
function Io(e) {
  return function() {
    oi(this, e);
  };
}
function $o(e) {
  return function() {
    ri(this, e);
  };
}
function bo(e, t) {
  return function() {
    (t.apply(this, arguments) ? oi : ri)(this, e);
  };
}
function ko(e, t) {
  var n = ii(e + "");
  if (arguments.length < 2) {
    for (var i = Jt(this.node()), s = -1, r = n.length; ++s < r; ) if (!i.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? bo : t ? Io : $o)(n, t));
}
function Eo() {
  this.textContent = "";
}
function So(e) {
  return function() {
    this.textContent = e;
  };
}
function Co(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Ao(e) {
  return arguments.length ? this.each(e == null ? Eo : (typeof e == "function" ? Co : So)(e)) : this.node().textContent;
}
function Mo() {
  this.innerHTML = "";
}
function No(e) {
  return function() {
    this.innerHTML = e;
  };
}
function To(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Po(e) {
  return arguments.length ? this.each(e == null ? Mo : (typeof e == "function" ? To : No)(e)) : this.node().innerHTML;
}
function Ro() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Oo() {
  return this.each(Ro);
}
function Lo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Do() {
  return this.each(Lo);
}
function Uo(e) {
  var t = typeof e == "function" ? e : jn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function zo() {
  return null;
}
function Ho(e, t) {
  var n = typeof e == "function" ? e : jn(e), i = t == null ? zo : typeof t == "function" ? t : Qt(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function qo() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Vo() {
  return this.each(qo);
}
function Wo() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Fo() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ko(e) {
  return this.select(e ? Fo : Wo);
}
function Bo(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Go(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Yo(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Xo(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, s = t.length, r; n < s; ++n)
        r = t[n], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++i] = r;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Zo(e, t, n) {
  return function() {
    var i = this.__on, s, r = Go(t);
    if (i) {
      for (var o = 0, a = i.length; o < a; ++o)
        if ((s = i[o]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = r, s.options = n), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, r, n), s = { type: e.type, name: e.name, value: t, listener: r, options: n }, i ? i.push(s) : this.__on = [s];
  };
}
function jo(e, t, n) {
  var i = Yo(e + ""), s, r = i.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var d = 0, l = a.length, c; d < l; ++d)
        for (s = 0, c = a[d]; s < r; ++s)
          if ((o = i[s]).type === c.type && o.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = t ? Zo : Xo, s = 0; s < r; ++s) this.each(a(i[s], t, n));
  return this;
}
function ai(e, t, n) {
  var i = ni(e), s = i.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = i.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Qo(e, t) {
  return function() {
    return ai(this, e, t);
  };
}
function Jo(e, t) {
  return function() {
    return ai(this, e, t.apply(this, arguments));
  };
}
function er(e, t) {
  return this.each((typeof t == "function" ? Jo : Qo)(e, t));
}
function* tr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, r = i.length, o; s < r; ++s)
      (o = i[s]) && (yield o);
}
var di = [null];
function Q(e, t) {
  this._groups = e, this._parents = t;
}
function et() {
  return new Q([[document.documentElement]], di);
}
function nr() {
  return this;
}
Q.prototype = et.prototype = {
  constructor: Q,
  select: Ss,
  selectAll: Ns,
  selectChild: Os,
  selectChildren: zs,
  filter: Hs,
  data: Bs,
  enter: qs,
  exit: Ys,
  join: Xs,
  merge: Zs,
  selection: nr,
  order: js,
  sort: Qs,
  call: eo,
  nodes: to,
  node: no,
  size: io,
  empty: so,
  each: oo,
  attr: fo,
  style: wo,
  property: xo,
  classed: ko,
  text: Ao,
  html: Po,
  raise: Oo,
  lower: Do,
  append: Uo,
  insert: Ho,
  remove: Vo,
  clone: Ko,
  datum: Bo,
  on: jo,
  dispatch: er,
  [Symbol.iterator]: tr
};
function se(e) {
  return typeof e == "string" ? new Q([[document.querySelector(e)]], [document.documentElement]) : new Q([[e]], di);
}
function ir(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ve(e, t) {
  if (e = ir(e), t === void 0 && (t = e.currentTarget), t) {
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
var sr = { value: () => {
} };
function en() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new dt(n);
}
function dt(e) {
  this._ = e;
}
function or(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
dt.prototype = en.prototype = {
  constructor: dt,
  on: function(e, t) {
    var n = this._, i = or(e + "", n), s, r = -1, o = i.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((s = (e = i[r]).type) && (s = rr(n[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++r < o; )
      if (s = (e = i[r]).type) n[s] = vn(n[s], e.name, t);
      else if (t == null) for (s in n) n[s] = vn(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new dt(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var n = new Array(s), i = 0, s, r; i < s; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (r = this._[e], i = 0, s = r.length; i < s; ++i) r[i].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], s = 0, r = i.length; s < r; ++s) i[s].value.apply(t, n);
  }
};
function rr(e, t) {
  for (var n = 0, i = e.length, s; n < i; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function vn(e, t, n) {
  for (var i = 0, s = e.length; i < s; ++i)
    if (e[i].name === t) {
      e[i] = sr, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Dt = { capture: !0, passive: !1 };
function Ut(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ar(e) {
  var t = e.document.documentElement, n = se(e).on("dragstart.drag", Ut, Dt);
  "onselectstart" in t ? n.on("selectstart.drag", Ut, Dt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function dr(e, t) {
  var n = e.document.documentElement, i = se(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Ut, Dt), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function tn(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function li(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function tt() {
}
var Xe = 0.7, mt = 1 / Xe, Me = "\\s*([+-]?\\d+)\\s*", Ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lr = /^#([0-9a-f]{3,8})$/, cr = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), ur = new RegExp(`^rgb\\(${oe},${oe},${oe}\\)$`), hr = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ze}\\)$`), fr = new RegExp(`^rgba\\(${oe},${oe},${oe},${Ze}\\)$`), pr = new RegExp(`^hsl\\(${Ze},${oe},${oe}\\)$`), mr = new RegExp(`^hsla\\(${Ze},${oe},${oe},${Ze}\\)$`), _n = {
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
tn(tt, je, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xn,
  // Deprecated! Use color.formatHex.
  formatHex: xn,
  formatHex8: gr,
  formatHsl: wr,
  formatRgb: In,
  toString: In
});
function xn() {
  return this.rgb().formatHex();
}
function gr() {
  return this.rgb().formatHex8();
}
function wr() {
  return ci(this).formatHsl();
}
function In() {
  return this.rgb().formatRgb();
}
function je(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = lr.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? $n(t) : n === 3 ? new j(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? nt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? nt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = cr.exec(e)) ? new j(t[1], t[2], t[3], 1) : (t = ur.exec(e)) ? new j(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = hr.exec(e)) ? nt(t[1], t[2], t[3], t[4]) : (t = fr.exec(e)) ? nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = pr.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, 1) : (t = mr.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, t[4]) : _n.hasOwnProperty(e) ? $n(_n[e]) : e === "transparent" ? new j(NaN, NaN, NaN, 0) : null;
}
function $n(e) {
  return new j(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function nt(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new j(e, t, n, i);
}
function yr(e) {
  return e instanceof tt || (e = je(e)), e ? (e = e.rgb(), new j(e.r, e.g, e.b, e.opacity)) : new j();
}
function zt(e, t, n, i) {
  return arguments.length === 1 ? yr(e) : new j(e, t, n, i ?? 1);
}
function j(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
tn(j, zt, li(tt, {
  brighter(e) {
    return e = e == null ? mt : Math.pow(mt, e), new j(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new j(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new j(be(this.r), be(this.g), be(this.b), gt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: bn,
  // Deprecated! Use color.formatHex.
  formatHex: bn,
  formatHex8: vr,
  formatRgb: kn,
  toString: kn
}));
function bn() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}`;
}
function vr() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}${xe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function kn() {
  const e = gt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${be(this.r)}, ${be(this.g)}, ${be(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function gt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function be(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function xe(e) {
  return e = be(e), (e < 16 ? "0" : "") + e.toString(16);
}
function En(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new te(e, t, n, i);
}
function ci(e) {
  if (e instanceof te) return new te(e.h, e.s, e.l, e.opacity);
  if (e instanceof tt || (e = je(e)), !e) return new te();
  if (e instanceof te) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), r = Math.max(t, n, i), o = NaN, a = r - s, d = (r + s) / 2;
  return a ? (t === r ? o = (n - i) / a + (n < i) * 6 : n === r ? o = (i - t) / a + 2 : o = (t - n) / a + 4, a /= d < 0.5 ? r + s : 2 - r - s, o *= 60) : a = d > 0 && d < 1 ? 0 : o, new te(o, a, d, e.opacity);
}
function _r(e, t, n, i) {
  return arguments.length === 1 ? ci(e) : new te(e, t, n, i ?? 1);
}
function te(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
tn(te, _r, li(tt, {
  brighter(e) {
    return e = e == null ? mt : Math.pow(mt, e), new te(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new te(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - i;
    return new j(
      Nt(e >= 240 ? e - 240 : e + 120, s, i),
      Nt(e, s, i),
      Nt(e < 120 ? e + 240 : e - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new te(Sn(this.h), it(this.s), it(this.l), gt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = gt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Sn(this.h)}, ${it(this.s) * 100}%, ${it(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Sn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function it(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Nt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ui = (e) => () => e;
function xr(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Ir(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function $r(e) {
  return (e = +e) == 1 ? hi : function(t, n) {
    return n - t ? Ir(t, n, e) : ui(isNaN(t) ? n : t);
  };
}
function hi(e, t) {
  var n = t - e;
  return n ? xr(e, n) : ui(isNaN(e) ? t : e);
}
const Cn = (function e(t) {
  var n = $r(t);
  function i(s, r) {
    var o = n((s = zt(s)).r, (r = zt(r)).r), a = n(s.g, r.g), d = n(s.b, r.b), l = hi(s.opacity, r.opacity);
    return function(c) {
      return s.r = o(c), s.g = a(c), s.b = d(c), s.opacity = l(c), s + "";
    };
  }
  return i.gamma = e, i;
})(1);
function me(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Ht = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Tt = new RegExp(Ht.source, "g");
function br(e) {
  return function() {
    return e;
  };
}
function kr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Er(e, t) {
  var n = Ht.lastIndex = Tt.lastIndex = 0, i, s, r, o = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (i = Ht.exec(e)) && (s = Tt.exec(t)); )
    (r = s.index) > n && (r = t.slice(n, r), a[o] ? a[o] += r : a[++o] = r), (i = i[0]) === (s = s[0]) ? a[o] ? a[o] += s : a[++o] = s : (a[++o] = null, d.push({ i: o, x: me(i, s) })), n = Tt.lastIndex;
  return n < t.length && (r = t.slice(n), a[o] ? a[o] += r : a[++o] = r), a.length < 2 ? d[0] ? kr(d[0].x) : br(t) : (t = d.length, function(l) {
    for (var c = 0, f; c < t; ++c) a[(f = d[c]).i] = f.x(l);
    return a.join("");
  });
}
var An = 180 / Math.PI, qt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function fi(e, t, n, i, s, r) {
  var o, a, d;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (d = e * n + t * i) && (n -= e * d, i -= t * d), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, d /= a), e * i < t * n && (e = -e, t = -t, d = -d, o = -o), {
    translateX: s,
    translateY: r,
    rotate: Math.atan2(t, e) * An,
    skewX: Math.atan(d) * An,
    scaleX: o,
    scaleY: a
  };
}
var st;
function Sr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? qt : fi(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Cr(e) {
  return e == null || (st || (st = document.createElementNS("http://www.w3.org/2000/svg", "g")), st.setAttribute("transform", e), !(e = st.transform.baseVal.consolidate())) ? qt : (e = e.matrix, fi(e.a, e.b, e.c, e.d, e.e, e.f));
}
function pi(e, t, n, i) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, c, f, p, w, I) {
    if (l !== f || c !== p) {
      var y = w.push("translate(", null, t, null, n);
      I.push({ i: y - 4, x: me(l, f) }, { i: y - 2, x: me(c, p) });
    } else (f || p) && w.push("translate(" + f + t + p + n);
  }
  function o(l, c, f, p) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), p.push({ i: f.push(s(f) + "rotate(", null, i) - 2, x: me(l, c) })) : c && f.push(s(f) + "rotate(" + c + i);
  }
  function a(l, c, f, p) {
    l !== c ? p.push({ i: f.push(s(f) + "skewX(", null, i) - 2, x: me(l, c) }) : c && f.push(s(f) + "skewX(" + c + i);
  }
  function d(l, c, f, p, w, I) {
    if (l !== f || c !== p) {
      var y = w.push(s(w) + "scale(", null, ",", null, ")");
      I.push({ i: y - 4, x: me(l, f) }, { i: y - 2, x: me(c, p) });
    } else (f !== 1 || p !== 1) && w.push(s(w) + "scale(" + f + "," + p + ")");
  }
  return function(l, c) {
    var f = [], p = [];
    return l = e(l), c = e(c), r(l.translateX, l.translateY, c.translateX, c.translateY, f, p), o(l.rotate, c.rotate, f, p), a(l.skewX, c.skewX, f, p), d(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, p), l = c = null, function(w) {
      for (var I = -1, y = p.length, v; ++I < y; ) f[(v = p[I]).i] = v.x(w);
      return f.join("");
    };
  };
}
var Ar = pi(Sr, "px, ", "px)", "deg)"), Mr = pi(Cr, ", ", ")", ")"), Nr = 1e-12;
function Mn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Tr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Pr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Rr = (function e(t, n, i) {
  function s(r, o) {
    var a = r[0], d = r[1], l = r[2], c = o[0], f = o[1], p = o[2], w = c - a, I = f - d, y = w * w + I * I, v, u;
    if (y < Nr)
      u = Math.log(p / l) / t, v = function(U) {
        return [
          a + U * w,
          d + U * I,
          l * Math.exp(t * U * u)
        ];
      };
    else {
      var b = Math.sqrt(y), E = (p * p - l * l + i * y) / (2 * l * n * b), M = (p * p - l * l - i * y) / (2 * p * n * b), T = Math.log(Math.sqrt(E * E + 1) - E), R = Math.log(Math.sqrt(M * M + 1) - M);
      u = (R - T) / t, v = function(U) {
        var W = U * u, G = Mn(T), h = l / (n * b) * (G * Pr(t * W + T) - Tr(T));
        return [
          a + h * w,
          d + h * I,
          l * G / Mn(t * W + T)
        ];
      };
    }
    return v.duration = u * 1e3 * t / Math.SQRT2, v;
  }
  return s.rho = function(r) {
    var o = Math.max(1e-3, +r), a = o * o, d = a * a;
    return e(o, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Re = 0, Ue = 0, Le = 0, mi = 1e3, wt, ze, yt = 0, Ee = 0, It = 0, Qe = typeof performance == "object" && performance.now ? performance : Date, gi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function nn() {
  return Ee || (gi(Or), Ee = Qe.now() + It);
}
function Or() {
  Ee = 0;
}
function vt() {
  this._call = this._time = this._next = null;
}
vt.prototype = wi.prototype = {
  constructor: vt,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? nn() : +n) + (t == null ? 0 : +t), !this._next && ze !== this && (ze ? ze._next = this : wt = this, ze = this), this._call = e, this._time = n, Vt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vt());
  }
};
function wi(e, t, n) {
  var i = new vt();
  return i.restart(e, t, n), i;
}
function Lr() {
  nn(), ++Re;
  for (var e = wt, t; e; )
    (t = Ee - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Re;
}
function Nn() {
  Ee = (yt = Qe.now()) + It, Re = Ue = 0;
  try {
    Lr();
  } finally {
    Re = 0, Ur(), Ee = 0;
  }
}
function Dr() {
  var e = Qe.now(), t = e - yt;
  t > mi && (It -= t, yt = e);
}
function Ur() {
  for (var e, t = wt, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : wt = n);
  ze = e, Vt(i);
}
function Vt(e) {
  if (!Re) {
    Ue && (Ue = clearTimeout(Ue));
    var t = e - Ee;
    t > 24 ? (e < 1 / 0 && (Ue = setTimeout(Nn, e - Qe.now() - It)), Le && (Le = clearInterval(Le))) : (Le || (yt = Qe.now(), Le = setInterval(Dr, mi)), Re = 1, gi(Nn));
  }
}
function Tn(e, t, n) {
  var i = new vt();
  return t = t == null ? 0 : +t, i.restart((s) => {
    i.stop(), e(s + t);
  }, t, n), i;
}
var zr = en("start", "end", "cancel", "interrupt"), Hr = [], yi = 0, Pn = 1, Wt = 2, lt = 3, Rn = 4, Ft = 5, ct = 6;
function $t(e, t, n, i, s, r) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (n in o) return;
  qr(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: zr,
    tween: Hr,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: yi
  });
}
function sn(e, t) {
  var n = ne(e, t);
  if (n.state > yi) throw new Error("too late; already scheduled");
  return n;
}
function re(e, t) {
  var n = ne(e, t);
  if (n.state > lt) throw new Error("too late; already running");
  return n;
}
function ne(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function qr(e, t, n) {
  var i = e.__transition, s;
  i[t] = n, n.timer = wi(r, 0, n.time);
  function r(l) {
    n.state = Pn, n.timer.restart(o, n.delay, n.time), n.delay <= l && o(l - n.delay);
  }
  function o(l) {
    var c, f, p, w;
    if (n.state !== Pn) return d();
    for (c in i)
      if (w = i[c], w.name === n.name) {
        if (w.state === lt) return Tn(o);
        w.state === Rn ? (w.state = ct, w.timer.stop(), w.on.call("interrupt", e, e.__data__, w.index, w.group), delete i[c]) : +c < t && (w.state = ct, w.timer.stop(), w.on.call("cancel", e, e.__data__, w.index, w.group), delete i[c]);
      }
    if (Tn(function() {
      n.state === lt && (n.state = Rn, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = Wt, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Wt) {
      for (n.state = lt, s = new Array(p = n.tween.length), c = 0, f = -1; c < p; ++c)
        (w = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (s[++f] = w);
      s.length = f + 1;
    }
  }
  function a(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(d), n.state = Ft, 1), f = -1, p = s.length; ++f < p; )
      s[f].call(e, c);
    n.state === Ft && (n.on.call("end", e, e.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = ct, n.timer.stop(), delete i[t];
    for (var l in i) return;
    delete e.__transition;
  }
}
function ut(e, t) {
  var n = e.__transition, i, s, r = !0, o;
  if (n) {
    t = t == null ? null : t + "";
    for (o in n) {
      if ((i = n[o]).name !== t) {
        r = !1;
        continue;
      }
      s = i.state > Wt && i.state < Ft, i.state = ct, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[o];
    }
    r && delete e.__transition;
  }
}
function Vr(e) {
  return this.each(function() {
    ut(this, e);
  });
}
function Wr(e, t) {
  var n, i;
  return function() {
    var s = re(this, e), r = s.tween;
    if (r !== n) {
      i = n = r;
      for (var o = 0, a = i.length; o < a; ++o)
        if (i[o].name === t) {
          i = i.slice(), i.splice(o, 1);
          break;
        }
    }
    s.tween = i;
  };
}
function Fr(e, t, n) {
  var i, s;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = re(this, e), o = r.tween;
    if (o !== i) {
      s = (i = o).slice();
      for (var a = { name: t, value: n }, d = 0, l = s.length; d < l; ++d)
        if (s[d].name === t) {
          s[d] = a;
          break;
        }
      d === l && s.push(a);
    }
    r.tween = s;
  };
}
function Kr(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = ne(this.node(), n).tween, s = 0, r = i.length, o; s < r; ++s)
      if ((o = i[s]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? Wr : Fr)(n, e, t));
}
function on(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var s = re(this, i);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return ne(s, i).value[t];
  };
}
function vi(e, t) {
  var n;
  return (typeof t == "number" ? me : t instanceof je ? Cn : (n = je(t)) ? (t = n, Cn) : Er)(e, t);
}
function Br(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Gr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Yr(e, t, n) {
  var i, s = n + "", r;
  return function() {
    var o = this.getAttribute(e);
    return o === s ? null : o === i ? r : r = t(i = o, n);
  };
}
function Xr(e, t, n) {
  var i, s = n + "", r;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === s ? null : o === i ? r : r = t(i = o, n);
  };
}
function Zr(e, t, n) {
  var i, s, r;
  return function() {
    var o, a = n(this), d;
    return a == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), d = a + "", o === d ? null : o === i && d === s ? r : (s = d, r = t(i = o, a)));
  };
}
function jr(e, t, n) {
  var i, s, r;
  return function() {
    var o, a = n(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), d = a + "", o === d ? null : o === i && d === s ? r : (s = d, r = t(i = o, a)));
  };
}
function Qr(e, t) {
  var n = xt(e), i = n === "transform" ? Mr : vi;
  return this.attrTween(e, typeof t == "function" ? (n.local ? jr : Zr)(n, i, on(this, "attr." + e, t)) : t == null ? (n.local ? Gr : Br)(n) : (n.local ? Xr : Yr)(n, i, t));
}
function Jr(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function ea(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function ta(e, t) {
  var n, i;
  function s() {
    var r = t.apply(this, arguments);
    return r !== i && (n = (i = r) && ea(e, r)), n;
  }
  return s._value = t, s;
}
function na(e, t) {
  var n, i;
  function s() {
    var r = t.apply(this, arguments);
    return r !== i && (n = (i = r) && Jr(e, r)), n;
  }
  return s._value = t, s;
}
function ia(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = xt(e);
  return this.tween(n, (i.local ? ta : na)(i, t));
}
function sa(e, t) {
  return function() {
    sn(this, e).delay = +t.apply(this, arguments);
  };
}
function oa(e, t) {
  return t = +t, function() {
    sn(this, e).delay = t;
  };
}
function ra(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? sa : oa)(t, e)) : ne(this.node(), t).delay;
}
function aa(e, t) {
  return function() {
    re(this, e).duration = +t.apply(this, arguments);
  };
}
function da(e, t) {
  return t = +t, function() {
    re(this, e).duration = t;
  };
}
function la(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? aa : da)(t, e)) : ne(this.node(), t).duration;
}
function ca(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    re(this, e).ease = t;
  };
}
function ua(e) {
  var t = this._id;
  return arguments.length ? this.each(ca(t, e)) : ne(this.node(), t).ease;
}
function ha(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    re(this, e).ease = n;
  };
}
function fa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ha(this._id, e));
}
function pa(e) {
  typeof e != "function" && (e = Jn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var r = t[s], o = r.length, a = i[s] = [], d, l = 0; l < o; ++l)
      (d = r[l]) && e.call(d, d.__data__, l, r) && a.push(d);
  return new he(i, this._parents, this._name, this._id);
}
function ma(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, s = n.length, r = Math.min(i, s), o = new Array(i), a = 0; a < r; ++a)
    for (var d = t[a], l = n[a], c = d.length, f = o[a] = new Array(c), p, w = 0; w < c; ++w)
      (p = d[w] || l[w]) && (f[w] = p);
  for (; a < i; ++a)
    o[a] = t[a];
  return new he(o, this._parents, this._name, this._id);
}
function ga(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function wa(e, t, n) {
  var i, s, r = ga(t) ? sn : re;
  return function() {
    var o = r(this, e), a = o.on;
    a !== i && (s = (i = a).copy()).on(t, n), o.on = s;
  };
}
function ya(e, t) {
  var n = this._id;
  return arguments.length < 2 ? ne(this.node(), n).on.on(e) : this.each(wa(n, e, t));
}
function va(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function _a() {
  return this.on("end.remove", va(this._id));
}
function xa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Qt(e));
  for (var i = this._groups, s = i.length, r = new Array(s), o = 0; o < s; ++o)
    for (var a = i[o], d = a.length, l = r[o] = new Array(d), c, f, p = 0; p < d; ++p)
      (c = a[p]) && (f = e.call(c, c.__data__, p, a)) && ("__data__" in c && (f.__data__ = c.__data__), l[p] = f, $t(l[p], t, n, p, l, ne(c, n)));
  return new he(r, this._parents, t, n);
}
function Ia(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Qn(e));
  for (var i = this._groups, s = i.length, r = [], o = [], a = 0; a < s; ++a)
    for (var d = i[a], l = d.length, c, f = 0; f < l; ++f)
      if (c = d[f]) {
        for (var p = e.call(c, c.__data__, f, d), w, I = ne(c, n), y = 0, v = p.length; y < v; ++y)
          (w = p[y]) && $t(w, t, n, y, p, I);
        r.push(p), o.push(c);
      }
  return new he(r, o, t, n);
}
var $a = et.prototype.constructor;
function ba() {
  return new $a(this._groups, this._parents);
}
function ka(e, t) {
  var n, i, s;
  return function() {
    var r = Pe(this, e), o = (this.style.removeProperty(e), Pe(this, e));
    return r === o ? null : r === n && o === i ? s : s = t(n = r, i = o);
  };
}
function _i(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ea(e, t, n) {
  var i, s = n + "", r;
  return function() {
    var o = Pe(this, e);
    return o === s ? null : o === i ? r : r = t(i = o, n);
  };
}
function Sa(e, t, n) {
  var i, s, r;
  return function() {
    var o = Pe(this, e), a = n(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Pe(this, e))), o === d ? null : o === i && d === s ? r : (s = d, r = t(i = o, a));
  };
}
function Ca(e, t) {
  var n, i, s, r = "style." + t, o = "end." + r, a;
  return function() {
    var d = re(this, e), l = d.on, c = d.value[r] == null ? a || (a = _i(t)) : void 0;
    (l !== n || s !== c) && (i = (n = l).copy()).on(o, s = c), d.on = i;
  };
}
function Aa(e, t, n) {
  var i = (e += "") == "transform" ? Ar : vi;
  return t == null ? this.styleTween(e, ka(e, i)).on("end.style." + e, _i(e)) : typeof t == "function" ? this.styleTween(e, Sa(e, i, on(this, "style." + e, t))).each(Ca(this._id, e)) : this.styleTween(e, Ea(e, i, t), n).on("end.style." + e, null);
}
function Ma(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function Na(e, t, n) {
  var i, s;
  function r() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && Ma(e, o, n)), i;
  }
  return r._value = t, r;
}
function Ta(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, Na(e, t, n ?? ""));
}
function Pa(e) {
  return function() {
    this.textContent = e;
  };
}
function Ra(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Oa(e) {
  return this.tween("text", typeof e == "function" ? Ra(on(this, "text", e)) : Pa(e == null ? "" : e + ""));
}
function La(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Da(e) {
  var t, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && La(s)), t;
  }
  return i._value = e, i;
}
function Ua(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Da(e));
}
function za() {
  for (var e = this._name, t = this._id, n = xi(), i = this._groups, s = i.length, r = 0; r < s; ++r)
    for (var o = i[r], a = o.length, d, l = 0; l < a; ++l)
      if (d = o[l]) {
        var c = ne(d, t);
        $t(d, e, n, l, o, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new he(i, this._parents, e, n);
}
function Ha() {
  var e, t, n = this, i = n._id, s = n.size();
  return new Promise(function(r, o) {
    var a = { value: o }, d = { value: function() {
      --s === 0 && r();
    } };
    n.each(function() {
      var l = re(this, i), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), l.on = t;
    }), s === 0 && r();
  });
}
var qa = 0;
function he(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function xi() {
  return ++qa;
}
var le = et.prototype;
he.prototype = {
  constructor: he,
  select: xa,
  selectAll: Ia,
  selectChild: le.selectChild,
  selectChildren: le.selectChildren,
  filter: pa,
  merge: ma,
  selection: ba,
  transition: za,
  call: le.call,
  nodes: le.nodes,
  node: le.node,
  size: le.size,
  empty: le.empty,
  each: le.each,
  on: ya,
  attr: Qr,
  attrTween: ia,
  style: Aa,
  styleTween: Ta,
  text: Oa,
  textTween: Ua,
  remove: _a,
  tween: Kr,
  delay: ra,
  duration: la,
  ease: ua,
  easeVarying: fa,
  end: Ha,
  [Symbol.iterator]: le[Symbol.iterator]
};
function Va(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Wa = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Va
};
function Fa(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Ka(e) {
  var t, n;
  e instanceof he ? (t = e._id, e = e._name) : (t = xi(), (n = Wa).time = nn(), e = e == null ? null : e + "");
  for (var i = this._groups, s = i.length, r = 0; r < s; ++r)
    for (var o = i[r], a = o.length, d, l = 0; l < a; ++l)
      (d = o[l]) && $t(d, e, t, l, o, n || Fa(d, t));
  return new he(i, this._parents, e, t);
}
et.prototype.interrupt = Vr;
et.prototype.transition = Ka;
const ot = (e) => () => e;
function Ba(e, {
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
function ue(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
ue.prototype = {
  constructor: ue,
  scale: function(e) {
    return e === 1 ? this : new ue(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ue(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Ve = new ue(1, 0, 0);
ue.prototype;
function Pt(e) {
  e.stopImmediatePropagation();
}
function De(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ga(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ya() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function On() {
  return this.__zoom || Ve;
}
function Xa(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Za() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ja(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], r = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function Qa() {
  var e = Ga, t = Ya, n = ja, i = Xa, s = Za, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Rr, l = en("start", "zoom", "end"), c, f, p, w = 500, I = 150, y = 0, v = 10;
  function u(m) {
    m.property("__zoom", On).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", G).on("dblclick.zoom", h).filter(s).on("touchstart.zoom", g).on("touchmove.zoom", x).on("touchend.zoom touchcancel.zoom", $).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  u.transform = function(m, k, _, S) {
    var N = m.selection ? m.selection() : m;
    N.property("__zoom", On), m !== N ? T(m, k, _, S) : N.interrupt().each(function() {
      R(this, arguments).event(S).start().zoom(null, typeof k == "function" ? k.apply(this, arguments) : k).end();
    });
  }, u.scaleBy = function(m, k, _, S) {
    u.scaleTo(m, function() {
      var N = this.__zoom.k, D = typeof k == "function" ? k.apply(this, arguments) : k;
      return N * D;
    }, _, S);
  }, u.scaleTo = function(m, k, _, S) {
    u.transform(m, function() {
      var N = t.apply(this, arguments), D = this.__zoom, z = _ == null ? M(N) : typeof _ == "function" ? _.apply(this, arguments) : _, q = D.invert(z), F = typeof k == "function" ? k.apply(this, arguments) : k;
      return n(E(b(D, F), z, q), N, o);
    }, _, S);
  }, u.translateBy = function(m, k, _, S) {
    u.transform(m, function() {
      return n(this.__zoom.translate(
        typeof k == "function" ? k.apply(this, arguments) : k,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), t.apply(this, arguments), o);
    }, null, S);
  }, u.translateTo = function(m, k, _, S, N) {
    u.transform(m, function() {
      var D = t.apply(this, arguments), z = this.__zoom, q = S == null ? M(D) : typeof S == "function" ? S.apply(this, arguments) : S;
      return n(Ve.translate(q[0], q[1]).scale(z.k).translate(
        typeof k == "function" ? -k.apply(this, arguments) : -k,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), D, o);
    }, S, N);
  };
  function b(m, k) {
    return k = Math.max(r[0], Math.min(r[1], k)), k === m.k ? m : new ue(k, m.x, m.y);
  }
  function E(m, k, _) {
    var S = k[0] - _[0] * m.k, N = k[1] - _[1] * m.k;
    return S === m.x && N === m.y ? m : new ue(m.k, S, N);
  }
  function M(m) {
    return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
  }
  function T(m, k, _, S) {
    m.on("start.zoom", function() {
      R(this, arguments).event(S).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(S).end();
    }).tween("zoom", function() {
      var N = this, D = arguments, z = R(N, D).event(S), q = t.apply(N, D), F = _ == null ? M(q) : typeof _ == "function" ? _.apply(N, D) : _, ie = Math.max(q[1][0] - q[0][0], q[1][1] - q[0][1]), Y = N.__zoom, J = typeof k == "function" ? k.apply(N, D) : k, ae = d(Y.invert(F).concat(ie / Y.k), J.invert(F).concat(ie / J.k));
      return function(ee) {
        if (ee === 1) ee = J;
        else {
          var de = ae(ee), bt = ie / de[2];
          ee = new ue(bt, F[0] - de[0] * bt, F[1] - de[1] * bt);
        }
        z.zoom(null, ee);
      };
    });
  }
  function R(m, k, _) {
    return !_ && m.__zooming || new U(m, k);
  }
  function U(m, k) {
    this.that = m, this.args = k, this.active = 0, this.sourceEvent = null, this.extent = t.apply(m, k), this.taps = 0;
  }
  U.prototype = {
    event: function(m) {
      return m && (this.sourceEvent = m), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(m, k) {
      return this.mouse && m !== "mouse" && (this.mouse[1] = k.invert(this.mouse[0])), this.touch0 && m !== "touch" && (this.touch0[1] = k.invert(this.touch0[0])), this.touch1 && m !== "touch" && (this.touch1[1] = k.invert(this.touch1[0])), this.that.__zoom = k, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(m) {
      var k = se(this.that).datum();
      l.call(
        m,
        this.that,
        new Ba(m, {
          sourceEvent: this.sourceEvent,
          target: u,
          transform: this.that.__zoom,
          dispatch: l
        }),
        k
      );
    }
  };
  function W(m, ...k) {
    if (!e.apply(this, arguments)) return;
    var _ = R(this, k).event(m), S = this.__zoom, N = Math.max(r[0], Math.min(r[1], S.k * Math.pow(2, i.apply(this, arguments)))), D = ve(m);
    if (_.wheel)
      (_.mouse[0][0] !== D[0] || _.mouse[0][1] !== D[1]) && (_.mouse[1] = S.invert(_.mouse[0] = D)), clearTimeout(_.wheel);
    else {
      if (S.k === N) return;
      _.mouse = [D, S.invert(D)], ut(this), _.start();
    }
    De(m), _.wheel = setTimeout(z, I), _.zoom("mouse", n(E(b(S, N), _.mouse[0], _.mouse[1]), _.extent, o));
    function z() {
      _.wheel = null, _.end();
    }
  }
  function G(m, ...k) {
    if (p || !e.apply(this, arguments)) return;
    var _ = m.currentTarget, S = R(this, k, !0).event(m), N = se(m.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", ie, !0), D = ve(m, _), z = m.clientX, q = m.clientY;
    ar(m.view), Pt(m), S.mouse = [D, this.__zoom.invert(D)], ut(this), S.start();
    function F(Y) {
      if (De(Y), !S.moved) {
        var J = Y.clientX - z, ae = Y.clientY - q;
        S.moved = J * J + ae * ae > y;
      }
      S.event(Y).zoom("mouse", n(E(S.that.__zoom, S.mouse[0] = ve(Y, _), S.mouse[1]), S.extent, o));
    }
    function ie(Y) {
      N.on("mousemove.zoom mouseup.zoom", null), dr(Y.view, S.moved), De(Y), S.event(Y).end();
    }
  }
  function h(m, ...k) {
    if (e.apply(this, arguments)) {
      var _ = this.__zoom, S = ve(m.changedTouches ? m.changedTouches[0] : m, this), N = _.invert(S), D = _.k * (m.shiftKey ? 0.5 : 2), z = n(E(b(_, D), S, N), t.apply(this, k), o);
      De(m), a > 0 ? se(this).transition().duration(a).call(T, z, S, m) : se(this).call(u.transform, z, S, m);
    }
  }
  function g(m, ...k) {
    if (e.apply(this, arguments)) {
      var _ = m.touches, S = _.length, N = R(this, k, m.changedTouches.length === S).event(m), D, z, q, F;
      for (Pt(m), z = 0; z < S; ++z)
        q = _[z], F = ve(q, this), F = [F, this.__zoom.invert(F), q.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== F[2] && (N.touch1 = F, N.taps = 0) : (N.touch0 = F, D = !0, N.taps = 1 + !!c);
      c && (c = clearTimeout(c)), D && (N.taps < 2 && (f = F[0], c = setTimeout(function() {
        c = null;
      }, w)), ut(this), N.start());
    }
  }
  function x(m, ...k) {
    if (this.__zooming) {
      var _ = R(this, k).event(m), S = m.changedTouches, N = S.length, D, z, q, F;
      for (De(m), D = 0; D < N; ++D)
        z = S[D], q = ve(z, this), _.touch0 && _.touch0[2] === z.identifier ? _.touch0[0] = q : _.touch1 && _.touch1[2] === z.identifier && (_.touch1[0] = q);
      if (z = _.that.__zoom, _.touch1) {
        var ie = _.touch0[0], Y = _.touch0[1], J = _.touch1[0], ae = _.touch1[1], ee = (ee = J[0] - ie[0]) * ee + (ee = J[1] - ie[1]) * ee, de = (de = ae[0] - Y[0]) * de + (de = ae[1] - Y[1]) * de;
        z = b(z, Math.sqrt(ee / de)), q = [(ie[0] + J[0]) / 2, (ie[1] + J[1]) / 2], F = [(Y[0] + ae[0]) / 2, (Y[1] + ae[1]) / 2];
      } else if (_.touch0) q = _.touch0[0], F = _.touch0[1];
      else return;
      _.zoom("touch", n(E(z, q, F), _.extent, o));
    }
  }
  function $(m, ...k) {
    if (this.__zooming) {
      var _ = R(this, k).event(m), S = m.changedTouches, N = S.length, D, z;
      for (Pt(m), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, w), D = 0; D < N; ++D)
        z = S[D], _.touch0 && _.touch0[2] === z.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === z.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (z = ve(z, this), Math.hypot(f[0] - z[0], f[1] - z[1]) < v)) {
        var q = se(this).on("dblclick.zoom");
        q && q.apply(this, arguments);
      }
    }
  }
  return u.wheelDelta = function(m) {
    return arguments.length ? (i = typeof m == "function" ? m : ot(+m), u) : i;
  }, u.filter = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : ot(!!m), u) : e;
  }, u.touchable = function(m) {
    return arguments.length ? (s = typeof m == "function" ? m : ot(!!m), u) : s;
  }, u.extent = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : ot([[+m[0][0], +m[0][1]], [+m[1][0], +m[1][1]]]), u) : t;
  }, u.scaleExtent = function(m) {
    return arguments.length ? (r[0] = +m[0], r[1] = +m[1], u) : [r[0], r[1]];
  }, u.translateExtent = function(m) {
    return arguments.length ? (o[0][0] = +m[0][0], o[1][0] = +m[1][0], o[0][1] = +m[0][1], o[1][1] = +m[1][1], u) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, u.constrain = function(m) {
    return arguments.length ? (n = m, u) : n;
  }, u.duration = function(m) {
    return arguments.length ? (a = +m, u) : a;
  }, u.interpolate = function(m) {
    return arguments.length ? (d = m, u) : d;
  }, u.on = function() {
    var m = l.on.apply(l, arguments);
    return m === l ? u : m;
  }, u.clickDistance = function(m) {
    return arguments.length ? (y = (m = +m) * m, u) : Math.sqrt(y);
  }, u.tapDistance = function(m) {
    return arguments.length ? (v = +m, u) : v;
  }, u;
}
var Ja = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, Z = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ed(t, n) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (s = (i ? o(t, n, s) : o(s)) || s);
  return i && s && Ja(t, n, s), s;
};
function td(e, t, n, i) {
  const s = t.x - e.x, r = t.y - e.y, o = i.x - n.x, a = i.y - n.y, d = s * a - r * o;
  if (Math.abs(d) < 1e-9) return null;
  const l = ((n.x - e.x) * a - (n.y - e.y) * o) / d, c = ((n.x - e.x) * r - (n.y - e.y) * s) / d;
  return l <= 0.02 || l >= 0.98 || c <= 0.02 || c >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * r, t: l };
}
function nd(e, t, n) {
  const i = n.x - t.x, s = n.y - t.y, r = i * i + s * s || 1, o = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * s) / r)), a = t.x + o * i, d = t.y + o * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: o };
}
function id(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const r = e[s], o = e[s + 1], a = Math.hypot(o.x - r.x, o.y - r.y) || 1, d = (o.x - r.x) / a, l = (o.y - r.y) / a, c = t.map(([p, w]) => td(r, o, p, w)).filter((p) => p !== null).filter((p) => p.t * a > n + 2 && (1 - p.t) * a > n + 2).sort((p, w) => p.t - w.t);
    let f = -1 / 0;
    for (const p of c)
      p.t * a - n <= f + 2 || (i += ` L ${p.x - d * n} ${p.y - l * n}`, i += ` A ${n} ${n} 0 0 1 ${p.x + d * n} ${p.y + l * n}`, f = p.t * a + n);
    i += ` L ${o.x} ${o.y}`;
  }
  return i;
}
const rt = {
  component: O`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: O`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: O`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: O`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: O`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: O`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: O`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: O`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: O`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: O`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: O`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: O`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: O`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let B = class extends $e {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ve, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
            const s = this.scene.edges.find((r) => r.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = Qa().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), se(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((c) => c.x - c.w / 2)) - e, r = Math.max(...t.map((c) => c.x + c.w / 2)) + e, o = Math.min(...t.map((c) => c.y - c.h / 2)) - e, a = Math.max(...t.map((c) => c.y + c.h / 2)) + e, d = Math.max(0.15, Math.min(i.width / (r - s), i.height / (a - o), 1.25)), l = Ve.translate(i.width / 2 - d * (s + r) / 2, i.height / 2 - d * (o + a) / 2).scale(d);
    se(n).call(this._zoomBehavior.transform, l);
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
        const s = this.nodePos(i), r = s.x - i.w / 2 + 10 + e.w / 2, o = s.x + i.w / 2 - 10 - e.w / 2, a = s.y - i.h / 2 + 34 + e.h / 2, d = s.y + i.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, r), o), n = Math.min(Math.max(n, a), d);
      }
    }
    return { id: e.id, x: t, y: n };
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const n = this.toScene(e), i = this.nodePos(t);
    let s = !1;
    const r = (a) => {
      const d = this.toScene(a), l = d.x - n.x, c = d.y - n.y;
      !s && Math.hypot(l, c) < 3 / this._t.k || (s = !0, this._dragPos = this.clampToParent(t, i.x + l, i.y + c));
    }, o = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", o), s && this._dragPos ? this.emit("node-moved", { id: t.id, x: this._dragPos.x, y: this._dragPos.y }) : e.shiftKey ? this.emit("element-multi-toggled", { id: t.id, kind: t.kind }) : this.emit("element-selected", { elementType: "node", id: t.id, kind: t.kind });
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
  onResizePointerDown(e, t, n, i) {
    if (e.button !== 0) return;
    e.stopPropagation(), this.focus();
    const s = 160, r = 90, o = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((y) => y.parentId === t.id), d = Math.min(...a.map((y) => y.x - y.w / 2)), l = Math.max(...a.map((y) => y.x + y.w / 2)), c = Math.min(...a.map((y) => y.y - y.h / 2)), f = Math.max(...a.map((y) => y.y + y.h / 2)), p = Ii(
      a.map((y) => ({ dx: y.x - o.x, dy: y.y - o.y, w: y.w, h: y.h })),
      { w: s, h: r }
    ), w = (y) => {
      const v = this.toScene(y);
      if (y.shiftKey) {
        this._resize = {
          id: t.id,
          x: o.x,
          y: o.y,
          w: Math.max(p.w, 2 * Math.abs(v.x - o.x)),
          h: Math.max(p.h, 2 * Math.abs(v.y - o.y))
        };
        return;
      }
      const u = o.x - n * o.w / 2, b = o.y - i * o.h / 2, E = n > 0 ? Math.max(v.x, u + s, a.length ? l + 10 : -1 / 0) : Math.min(v.x, u - s, a.length ? d - 10 : 1 / 0), M = i > 0 ? Math.max(v.y, b + r, a.length ? f + 10 : -1 / 0) : Math.min(v.y, b - r, a.length ? c - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (u + E) / 2,
        y: (b + M) / 2,
        w: Math.abs(E - u),
        h: Math.abs(M - b)
      };
    }, I = () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", I), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", I);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const i = (r) => {
      var l;
      const o = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: o.x, y: o.y };
      const a = (l = this.shadowRoot) == null ? void 0 : l.elementFromPoint(r.clientX, r.clientY), d = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = d ? d.getAttribute("data-node-id") : null;
    }, s = (r) => {
      var d, l;
      window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s);
      const o = (d = this.shadowRoot) == null ? void 0 : d.elementFromPoint(r.clientX, r.clientY), a = (l = o == null ? void 0 : o.closest("[data-node-id]")) == null ? void 0 : l.getAttribute("data-node-id");
      a && a !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: a,
        x: r.clientX,
        y: r.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, n) {
    const { x: i, y: s } = this.nodePos(e), r = t - i, o = n - s, a = e.w / 2, d = e.h / 2;
    if (r === 0 && o === 0) return { x: i, y: s };
    const l = 1 / Math.max(Math.abs(r) / a, Math.abs(o) / d);
    return { x: i + r * l, y: s + o * l };
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
    const i = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), r = this.nodePos(n), o = i[0] ?? r, a = i[i.length - 1] ?? s;
    let d = this.borderPoint(t, o.x, o.y), l = this.borderPoint(n, a.x, a.y);
    if (!i.length) {
      const c = this.edgeOffset(e);
      if (c !== 0) {
        const f = Math.hypot(l.x - d.x, l.y - d.y) || 1, p = -(l.y - d.y) / f * c, w = (l.x - d.x) / f * c;
        d = { x: d.x + p, y: d.y + w }, l = { x: l.x + p, y: l.y + w };
      }
    }
    return [d, ...i, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, n) {
    this._wpDrag = { edgeId: e.id, points: t, index: n };
    let i = !1;
    const s = (o) => {
      if (!this._wpDrag) return;
      i = !0;
      const a = this.toScene(o), d = [...this._wpDrag.points];
      d[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: d };
    }, r = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", r), this._wpDrag && i && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", r);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < e.length - 1; i++) {
      const { dist: s } = nd(t, e[i], e[i + 1]);
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
    let r = !1;
    const o = (d) => {
      const l = this.toScene(d);
      if (r) {
        if (this._wpDrag) {
          const c = [...this._wpDrag.points];
          c[s] = l, this._wpDrag = { ...this._wpDrag, points: c };
        }
      } else {
        if (Math.hypot(l.x - i.x, l.y - i.y) < 4 / this._t.k) return;
        r = !0, this.focus();
        const c = [...this.edgePoints[t.id] ?? []];
        c.splice(s, 0, l), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: c, index: s };
      }
    }, a = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), r && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  removeWaypoint(e, t) {
    const n = [...this.edgePoints[e.id] ?? []];
    n.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: n });
  }
  renderEdge(e, t, n) {
    const i = e.color ?? "#64748b", s = this.selectedId === e.id, r = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), o = Math.floor((t.length - 1) / 2), a = {
      x: (t[o].x + t[o + 1].x) / 2,
      y: (t[o].y + t[o + 1].y) / 2
    }, d = t.slice(1, -1), l = t.map((c) => `${c.x},${c.y}`).join(" ");
    return O`
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
          ${e.tooltip ? O`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${id(t, n)}
              fill="none"
              stroke=${i} stroke-width=${r ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${e.label ? O`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
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
        ${s ? d.map((c, f) => {
      var w;
      const p = ((w = this._selectedWaypoint) == null ? void 0 : w.edgeId) === e.id && this._selectedWaypoint.index === f;
      return O`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${p ? 6 : 5}
                        fill=${p ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(I) => {
        I.button === 0 && (I.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: f }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], f));
      }}
                        @dblclick=${(I) => {
        I.stopPropagation(), this.removeWaypoint(e, f);
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
    var p, w;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, r = !!e.container, o = !!e.parentId, a = ((p = this._resize) == null ? void 0 : p.id) === e.id ? this._resize.w : e.w, d = ((w = this._resize) == null ? void 0 : w.id) === e.id ? this._resize.h : e.h, l = a / 2, c = d / 2, f = o && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return O`
      <g data-node-id=${e.id} transform="translate(${t}, ${n})"
         @pointerdown=${(I) => this.onNodePointerDown(I, e)}
         @dblclick=${(I) => {
      I.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        <rect x=${-l} y=${-c} width=${a} height=${d} rx=${o ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? O`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? O`<text x=${-l} y=${-c - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && rt[e.symbol] && !o ? O`<g transform="translate(${l - 17}, ${-c + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${rt[e.symbol]}
              </g>` : ""}
        ${o && e.symbol && rt[e.symbol] ? O`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${rt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? O`
              <foreignObject x=${-l + 6} y=${r ? -c + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${r ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(I) => I.stopPropagation()}
                  @keydown=${(I) => {
      I.stopPropagation(), I.key === "Enter" && this.commitRename(e, I.target.value), I.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(I) => this.commitRename(e, I.target.value)}
                />
              </foreignObject>` : o ? O`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${f}</text>` : r ? O`<text x=${-l + 12} y=${-c + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : O`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${r ? O`<line x1=${-l + 8} y1=${-c + 28} x2=${l - 8} y2=${-c + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (o ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "workflow-step") ? [
      [l, 0],
      [-l, 0],
      [0, c],
      [0, -c]
    ].map(
      ([I, y]) => O`
                <circle data-handle cx=${I} cy=${y} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${o ? e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado: el actor lo usará (deriva una UI)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso: el agente lo consumirá por MCP" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${r && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([I, y]) => O`
                <rect data-resize x=${I * l - 6.5} y=${y * c - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${I * y > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, I, y)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return O``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!e) return O``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return O`
      <line x1=${t.x} y1=${t.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let n = !1;
    const i = (r) => {
      const o = this.toScene(r);
      !n && Math.hypot(o.x - t.x, o.y - t.y) < 4 / this._t.k || (n = !0, this._rubber = { a: t, b: o });
    }, s = () => {
      if (window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s), n && this._rubber) {
        const { a: r, b: o } = this._rubber, a = Math.min(r.x, o.x), d = Math.max(r.x, o.x), l = Math.min(r.y, o.y), c = Math.max(r.y, o.y), f = this.scene.nodes.filter((p) => {
          const w = this.nodePos(p);
          return w.x >= a && w.x <= d && w.y >= l && w.y <= c;
        }).map((p) => p.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return O``;
    const { a: e, b: t } = this._rubber;
    return O`
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
    const n = Math.min(...t.map((o) => o.x - o.w / 2)) - e, i = Math.max(...t.map((o) => o.x + o.w / 2)) + e, s = Math.min(...t.map((o) => o.y - o.h / 2)) - e, r = Math.max(...t.map((o) => o.y + o.h / 2)) + e;
    return { minX: n, minY: s, w: i - n, h: r - s };
  }
  centerViewportOn(e, t) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), s = this._t.k, r = Ve.translate(i.width / 2 - s * e, i.height / 2 - s * t).scale(s);
    se(n).call(this._zoomBehavior.transform, r);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - i.left) / n, r = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(s, r);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), s = this.getBoundingClientRect(), r = (0 - this._t.x) / this._t.k, o = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return A`
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
      var c, f;
      (f = (c = l.currentTarget).hasPointerCapture) != null && f.call(c, l.pointerId) && this.onMinimapPointer(l, e, i);
    }}
      >
        <svg viewBox="0 0 ${t} ${n}">
          ${this.scene.nodes.map((l) => {
      const c = this.nodePos(l);
      return O`<rect
              x=${(c.x - l.w / 2 - e.minX) * i}
              y=${(c.y - l.h / 2 - e.minY) * i}
              width=${Math.max(2, l.w * i)}
              height=${Math.max(2, l.h * i)}
              rx="1" fill=${l.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(r - e.minX) * i}
            y=${(o - e.minY) * i}
            width=${a * i}
            height=${d * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((o) => o.color ?? "#64748b"))], t = [], n = this.scene.edges.map((o) => {
      const a = this.edgePolyline(o);
      if (!a) return O``;
      const d = this.renderEdge(o, a, [...t]);
      for (let l = 0; l < a.length - 1; l++) t.push([a[l], a[l + 1]]);
      return d;
    }), i = new Set(this.scene.nodes.filter((o) => o.parentId).map((o) => o.id)), s = [], r = [];
    return this.scene.edges.forEach((o, a) => {
      (i.has(o.sourceId) || i.has(o.targetId) ? r : s).push(
        n[a]
      );
    }), A`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(o) => {
      const a = o.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || o.button !== 0 || this.startRubberBand(o);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (o) => O`
              <marker id="arrow-${this.markerId(o)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${o}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${s}
          ${this.scene.nodes.filter((o) => !o.parentId).map((o) => this.renderNode(o))}
          ${r}
          ${this.scene.nodes.filter((o) => o.parentId).map((o) => this.renderNode(o))}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
B.styles = Yt`
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
Z([
  pe({ attribute: !1 })
], B.prototype, "scene", 2);
Z([
  pe({ attribute: !1 })
], B.prototype, "selectedId", 2);
Z([
  pe({ attribute: !1 })
], B.prototype, "selectedIds", 2);
Z([
  pe({ type: Boolean })
], B.prototype, "connectable", 2);
Z([
  pe({ attribute: !1 })
], B.prototype, "edgePoints", 2);
Z([
  C()
], B.prototype, "_t", 2);
Z([
  C()
], B.prototype, "_dragPos", 2);
Z([
  C()
], B.prototype, "_pendingLink", 2);
Z([
  C()
], B.prototype, "_hoverNodeId", 2);
Z([
  C()
], B.prototype, "_editingId", 2);
Z([
  C()
], B.prototype, "_spaceDown", 2);
Z([
  C()
], B.prototype, "_wpDrag", 2);
Z([
  C()
], B.prototype, "_selectedWaypoint", 2);
Z([
  C()
], B.prototype, "_resize", 2);
Z([
  C()
], B.prototype, "_rubber", 2);
B = Z([
  jt("modux-canvas")
], B);
const P = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function ce(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function X(e, t) {
  e.edges.some((n) => n.id === t.id) || e.edges.push(t);
}
const Ce = (e) => e.trim().toLowerCase();
function sd(e, t) {
  var G;
  const n = { nodes: /* @__PURE__ */ new Map(), edges: [] }, i = new Map(e.modules.map((h) => [h.id, h.name])), s = e.modules.flatMap(
    (h) => (h.useCases ?? []).map((g) => ({ ...g, moduleId: h.id }))
  ), r = new Set(s.map((h) => h.id)), o = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((h) => (h.domainServices ?? []).map((g) => g.id))
  ), d = e.modules.flatMap(
    (h) => (h.domainEvents ?? []).map((g) => ({ ...g, moduleId: h.id, application: !1 }))
  ), l = e.modules.flatMap(
    (h) => (h.applicationEvents ?? []).map((g) => ({ ...g, moduleId: h.id, application: !0 }))
  ), c = e.modules.flatMap(
    (h) => (h.readModels ?? []).map((g) => ({ ...g, moduleId: h.id }))
  );
  for (const h of s)
    ce(n, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: P.command.w,
      h: P.command.h,
      kind: "use-case",
      symbol: h.policy ? "flow" : "gear",
      fill: h.policy ? P.policy.fill : P.command.fill,
      stroke: h.policy ? P.policy.stroke : P.command.stroke,
      badge: h.policy ? "POLICY" : "COMANDO",
      tooltip: h.policy ? `${h.name} — policy de ${i.get(h.moduleId) ?? h.moduleId} (reacción, no caso de negocio)` : `${h.name} — caso de uso de ${i.get(h.moduleId) ?? h.moduleId}`
    });
  for (const h of o)
    ce(n, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: P.aggregate.w,
      h: P.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: P.aggregate.fill,
      stroke: P.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${h.name} — agregado de ${i.get(h.moduleId) ?? h.moduleId}`
    });
  const f = /* @__PURE__ */ new Map();
  for (const h of [...d, ...l])
    ce(n, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: P.event.w,
      h: P.event.h,
      kind: h.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: P.event.fill,
      stroke: P.event.stroke,
      badge: h.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${h.name} — evento de ${i.get(h.moduleId) ?? h.moduleId}`
    }), f.set(Ce(h.name), h.id);
  const p = (h) => {
    if (!h || !h.trim()) return null;
    const g = f.get(Ce(h));
    if (g) return g;
    const x = `evname:${Ce(h)}`;
    return ce(n, {
      id: x,
      label: h,
      x: 0,
      y: 0,
      w: P.event.w,
      h: P.event.h,
      kind: "event-name",
      symbol: "event",
      fill: P.event.fill,
      stroke: P.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${h} — referenciado por nombre, sin evento declarado en el catálogo`
    }), x;
  }, w = (h) => {
    const g = c.find(($) => $.id === h.id) ?? c.find(($) => h.name && Ce($.name) === Ce(h.name)), x = (g == null ? void 0 : g.id) ?? (h.id || (h.name ? `rm:${Ce(h.name)}` : null));
    return x ? (ce(n, {
      id: x,
      label: (g == null ? void 0 : g.name) ?? h.name ?? x,
      x: 0,
      y: 0,
      w: P.readModel.w,
      h: P.readModel.h,
      kind: g ? "read-model" : "derived-read-model",
      fill: P.readModel.fill,
      stroke: P.readModel.stroke,
      dashed: !g,
      badge: "READ MODEL"
    }), x) : null;
  };
  for (const h of e.actorUses ?? []) {
    if (!r.has(h.targetId)) continue;
    const g = (e.actors ?? []).find((x) => x.id === h.actorId);
    g && (ce(n, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: P.actor.w,
      h: P.actor.h,
      kind: "actor",
      symbol: "person",
      fill: P.actor.fill,
      stroke: P.actor.stroke,
      badge: "ACTOR"
    }), X(n, {
      id: `es-actor:${g.id}->${h.targetId}`,
      sourceId: g.id,
      targetId: h.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  const I = (h) => {
    const g = e.externalSystems.find((x) => x.id === h);
    return g ? (ce(n, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: P.external.w,
      h: P.external.h,
      kind: "external-system",
      symbol: "component",
      fill: P.external.fill,
      stroke: P.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), g.id) : null;
  };
  for (const h of e.externalCalls ?? []) {
    const g = I(h.externalSystemId);
    !g || !r.has(h.useCaseId) || X(n, {
      id: `es-extin:${g}->${h.useCaseId}`,
      sourceId: g,
      targetId: h.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const h of e.externalUseCaseCalls ?? []) {
    if (!r.has(h.sourceId)) continue;
    const g = e.externalSystems.find(
      (m) => (m.useCases ?? []).some((k) => k.id === h.targetId)
    ), x = g ? I(g.id) : null;
    if (!x) continue;
    const $ = (G = ((g == null ? void 0 : g.useCases) ?? []).find((m) => m.id === h.targetId)) == null ? void 0 : G.name;
    X(n, {
      id: `es-extout:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: x,
      kind: "es-command-external",
      label: $,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: $ ? `Llama a ${$} del sistema externo` : void 0
    });
  }
  for (const h of e.aggregateCalls ?? [])
    !r.has(h.sourceId) || !n.nodes.has(h.targetId) || X(n, {
      id: `es-write:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: h.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const y = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const h of y)
    !n.nodes.has(h.domainEventId) || !(n.nodes.has(h.sourceId) && (r.has(h.sourceId) || o.some((x) => x.id === h.sourceId) || a.has(h.sourceId))) || X(n, {
      id: `es-emit:${h.sourceId}->${h.domainEventId}`,
      sourceId: h.sourceId,
      targetId: h.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const v = (h, g, x, $, m, k) => (ce(n, {
    id: h,
    label: g,
    x: 0,
    y: 0,
    w: P.policy.w,
    h: P.policy.h,
    kind: x,
    symbol: "flow",
    fill: P.policy.fill,
    stroke: P.policy.stroke,
    badge: $,
    tooltip: m
  }), h), u = (h, g) => {
    const x = p(h);
    x && X(n, {
      id: `es-trigger:${x}->${g}`,
      sourceId: x,
      targetId: g,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, b = (h, g) => {
    !g || !r.has(g) || X(n, {
      id: `es-invoke:${h}->${g}`,
      sourceId: h,
      targetId: g,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const h of e.subscriptions ?? []) {
    const g = v(
      h.id,
      h.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${h.name}${h.eventName ? ` — reacciona a ${h.eventName}` : ""}${h.consumerGroup ? ` · grupo ${h.consumerGroup}` : ""}`
    );
    u(h.eventName, g);
    for (const x of h.actions ?? []) {
      if (x.type === "CallUseCase" && b(g, x.useCaseId), x.type === "StartSaga" && x.sagaId) {
        const $ = `saga:${x.sagaId}`;
        v($, x.sagaId, "saga", "SAGA"), X(n, {
          id: `es-saga:${g}->${$}`,
          sourceId: g,
          targetId: $,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (x.type === "UpdateProjection" && x.projectionId) {
        const $ = (e.projections ?? []).find((m) => m.id === x.projectionId);
        $ && X(n, {
          id: `es-feeds:${g}->${$.id}`,
          sourceId: g,
          targetId: $.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const h of e.projections ?? []) {
    const g = v(
      h.id,
      h.name,
      "projection",
      "PROYECCIÓN",
      `${h.name}${h.readModelName ? ` — materializa ${h.readModelName}` : ""}`
    );
    for (const $ of h.handledEventIds) {
      const m = n.nodes.has($) ? $ : null;
      m && X(n, {
        id: `es-trigger:${m}->${g}`,
        sourceId: m,
        targetId: g,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    const x = w({ id: h.readModelId, name: h.readModelName });
    x && X(n, {
      id: `es-projects:${g}->${x}`,
      sourceId: g,
      targetId: x,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const h of e.flows) {
    if (h.archetype === "MATERIALIZES") {
      const x = p(h.triggerEvent), $ = w({ name: h.readModelName ?? `${h.triggerEvent}View` });
      x && $ && X(n, {
        id: `es-mat:${h.id}`,
        sourceId: x,
        targetId: $,
        kind: "es-materializes",
        label: h.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${h.name} [MATERIALIZES]`
      });
      continue;
    }
    const g = v(
      `flow:${h.id}`,
      h.name,
      "flow",
      `POLICY · ${h.archetype}`,
      `Flow ${h.name} [${h.archetype}]`
    );
    if (u(h.triggerEvent, g), b(g, h.targetUseCaseId), !h.targetUseCaseId) {
      const x = I(h.targetId), $ = x ?? `tgt:${h.targetId}`;
      !x && i.has(h.targetId) && ce(n, {
        id: $,
        label: i.get(h.targetId) ?? h.targetId,
        x: 0,
        y: 0,
        w: P.module.w,
        h: P.module.h,
        kind: "module",
        symbol: "component",
        fill: P.module.fill,
        stroke: P.module.stroke,
        badge: "CONTEXTO"
      }), n.nodes.has($) && X(n, {
        id: `es-deliver:${h.id}`,
        sourceId: g,
        targetId: $,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const h of e.processes ?? []) {
    const g = v(
      h.id,
      h.name,
      "process",
      `PROCESO${h.sla ? ` · SLA ${h.sla}` : ""}`,
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    u(h.triggerEvent, g);
    for (const $ of h.steps) b(g, $.useCaseId);
    const x = p(h.onCompletionEventName);
    x && X(n, {
      id: `es-done:${h.id}`,
      sourceId: g,
      targetId: x,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const h of e.workflows ?? []) {
    const g = v(
      h.id,
      h.name,
      "workflow",
      "WORKFLOW",
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    u(h.triggerEvent, g);
    for (const $ of h.steps ?? []) {
      b(g, $.targetUseCaseId);
      for (const m of [$.emittedEventName, $.completionEventName]) {
        const k = p(m);
        k && X(n, {
          id: `es-wfemit:${h.id}:${k}`,
          sourceId: g,
          targetId: k,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const x = p(h.onCompletionEventName);
    x && X(n, {
      id: `es-done:${h.id}`,
      sourceId: g,
      targetId: x,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const E = [...n.nodes.values()], M = /* @__PURE__ */ new Map();
  for (const h of n.edges)
    M.has(h.targetId) || M.set(h.targetId, []), M.get(h.targetId).push(h.sourceId);
  const T = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Set(), U = (h) => {
    const g = T.get(h);
    if (g !== void 0) return g;
    if (R.has(h)) return 0;
    R.add(h);
    const x = M.get(h) ?? [], $ = x.length ? 1 + Math.max(...x.map(U)) : 0;
    return R.delete(h), T.set(h, $), $;
  }, W = /* @__PURE__ */ new Map();
  for (const h of E) {
    const g = t[h.id];
    if (g) {
      h.x = g.x, h.y = g.y;
      continue;
    }
    const x = U(h.id), $ = W.get(x) ?? 0;
    W.set(x, $ + 1), h.x = 140 + x * 260, h.y = 110 + $ * 110;
  }
  return { nodes: E, edges: n.edges };
}
const od = 190, rd = 56, Ln = 180, ad = 56, dd = 150, ld = 44, Dn = 250, Un = 100;
function cd(e, t) {
  const n = /* @__PURE__ */ new Set(), i = (s) => {
    if (n.has(s.id)) return 0;
    n.add(s.id);
    const r = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), o = r.length ? 1 + Math.max(...r.map(i)) : 0;
    return n.delete(s.id), o;
  };
  return i(e);
}
function ud(e, t) {
  if (t.triggerAggregateId) {
    const n = (e.aggregates ?? []).find((i) => i.id === t.triggerAggregateId);
    if (n) return { id: n.id, label: n.name, kind: "aggregate", symbol: "aggregate" };
  }
  if (t.triggerDomainServiceId) {
    const n = e.modules.flatMap((i) => i.domainServices ?? []).find((i) => i.id === t.triggerDomainServiceId);
    if (n) return { id: n.id, label: n.name, kind: "domain-service", symbol: "gear" };
  }
  if (t.triggerUseCaseId) {
    const n = e.modules.flatMap((i) => i.useCases ?? []).find((i) => i.id === t.triggerUseCaseId);
    if (n) return { id: n.id, label: n.name, kind: "use-case", symbol: "gear" };
  }
  return null;
}
function hd(e, t) {
  const n = [], i = [], s = /* @__PURE__ */ new Set(), r = (a) => {
    var d;
    return (d = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === a)) == null ? void 0 : d.name;
  };
  let o = 140;
  return (e.workflows ?? []).forEach((a) => {
    var v;
    const d = new Map(a.steps.map((u) => [u.id, u])), l = new Map(a.steps.map((u) => [u.id, cd(u, d)])), c = /* @__PURE__ */ new Map();
    for (const u of a.steps) {
      const b = l.get(u.id) ?? 0;
      c.set(b, (c.get(b) ?? 0) + 1);
    }
    const f = Math.max(1, ...c.values()), p = ud(e, a);
    if (p && !s.has(p.id)) {
      s.add(p.id);
      const u = t[p.id] ?? { x: 140, y: o };
      n.push({
        id: p.id,
        label: p.label,
        x: u.x,
        y: u.y,
        w: dd,
        h: ld,
        kind: p.kind,
        symbol: p.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: p.kind === "aggregate" ? "AGGREGATE" : p.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const w = t[a.id] ?? { x: 420, y: o };
    n.push({
      id: a.id,
      label: a.name,
      x: w.x,
      y: w.y,
      w: od,
      h: rd,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), p && i.push({
      id: `wft:${a.id}`,
      sourceId: p.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const I = /* @__PURE__ */ new Map();
    let y = 0;
    for (const u of a.steps) {
      const b = l.get(u.id) ?? 0;
      y = Math.max(y, b);
      const E = I.get(b) ?? 0;
      I.set(b, E + 1);
      const M = t[u.id] ?? {
        x: w.x + (b + 1) * Dn,
        y: o + (E - (c.get(b) - 1) / 2) * Un
      }, T = r(u.targetUseCaseId);
      n.push({
        id: u.id,
        label: u.name,
        x: M.x,
        y: M.y,
        w: Ln,
        h: ad,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: T ? `→ ${T}` : "∅ sin use case",
        tooltip: `${u.name}${u.emittedEventName ? ` · emite ${u.emittedEventName}` : ""}${T ? ` · lanza ${T}` : ""}${u.completionEventName ? ` · espera ${u.completionEventName}` : ""}`
      });
      const R = (u.dependsOnStepIds ?? []).filter((U) => d.has(U));
      R.length === 0 && i.push({
        id: `wfs:${a.id}:${u.id}`,
        sourceId: a.id,
        targetId: u.id,
        kind: "workflow-start",
        label: u.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const U of R)
        i.push({
          id: `wfdep:${U}->${u.id}`,
          sourceId: U,
          targetId: u.id,
          kind: "workflow-dependency",
          label: u.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${u.name} espera a ${((v = d.get(U)) == null ? void 0 : v.name) ?? U}`
        });
    }
    if (a.onCompletionEventName) {
      const u = `done:${a.id}`, b = t[u] ?? { x: w.x + (y + 2) * Dn, y: o };
      n.push({
        id: u,
        label: a.onCompletionEventName,
        x: b.x,
        y: b.y,
        w: Ln,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const E = new Set(a.steps.flatMap((T) => T.dependsOnStepIds ?? [])), M = a.steps.filter((T) => !E.has(T.id));
      for (const T of M.length ? M : [])
        i.push({
          id: `wfd:${a.id}:${T.id}`,
          sourceId: T.id,
          targetId: u,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || i.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: u,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    o += Math.max(2, f + 1) * Un + 60;
  }), { nodes: n, edges: i };
}
async function fd(e, t) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((d) => d.e), i = new n(), r = {
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
  }, o = await i.layout(r), a = {};
  for (const d of o.children ?? [])
    a[d.id] = {
      x: (d.x ?? 0) + (d.width ?? 0) / 2,
      y: (d.y ?? 0) + (d.height ?? 0) / 2
    };
  return a;
}
var pd = Object.defineProperty, md = Object.getOwnPropertyDescriptor, H = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? md(t, n) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (s = (i ? o(t, n, s) : o(s)) || s);
  return i && s && pd(t, n, s), s;
};
const Kt = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, gd = Object.keys(Kt), wd = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], yd = ["CORE", "SUPPORTING", "GENERIC"], V = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function vd(e, t) {
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
    case "workflow":
      return { elementType: "workflow", id: e };
    case "domain-event":
      return { elementType: "domain-event", id: e };
    case "subscription":
      return { elementType: "subscription", id: e };
    case "projection":
      return { elementType: "projection", id: e };
    case "read-model":
      return { elementType: "read-model", id: e };
    default:
      return null;
  }
}
function _d(e, t) {
  const n = (e ?? []).find((i) => i.steps.some((s) => s.id === t));
  return n ? { elementType: "process", id: n.id } : null;
}
let L = class extends $e {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newExternalId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "";
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
    return bi(this.layout[e]);
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
    this._detail = e, e !== "detail" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && (this._newContextMapKind = "module"), this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: e });
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
        return t && t.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: t.type }] : null;
      }
      case "set-relation-type": {
        const t = this.model.relations.find(
          (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
        );
        return t && t.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: t.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const t = this.model.modules.find((i) => i.id === e.id);
        if (!t) return null;
        const n = this.model.relations.filter(
          (i) => (i.sourceId === e.id || i.targetId === e.id) && i.type != null
        );
        return [
          { kind: "add-module", id: t.id, name: t.name, subdomainType: t.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...n.map(
            (i) => ({
              kind: "set-relation-type",
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
          if (n)
            return [
              { kind: "add-use-case", id: n.id, name: n.name, moduleId: t.id, policy: n.policy }
            ];
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
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const t = (this.model.aiAgents ?? []).find((n) => n.id === e.id);
        return t ? [{ kind: "add-ai-agent", id: t.id, name: t.name }] : null;
      }
      case "add-agent-use":
        return [{ kind: "remove-agent-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-use":
        return [{ kind: "add-agent-use", sourceId: e.sourceId, targetId: e.targetId }];
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
        const n = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((i) => i.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((i) => i.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((i) => i.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((i) => i.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((i) => i.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((i) => i.useCases ?? []) : e.type === "application-event" ? this.model.modules.flatMap((i) => i.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : this.model.entities ?? []).find((i) => i.id === e.id);
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
      case "add-workflow":
        return [{ kind: "remove-workflow", id: e.id }];
      case "remove-workflow": {
        const t = (this.model.workflows ?? []).find((n) => n.id === e.id);
        return t ? [
          {
            kind: "add-workflow",
            id: t.id,
            name: t.name,
            triggerAggregateId: t.triggerAggregateId,
            triggerDomainServiceId: t.triggerDomainServiceId,
            triggerUseCaseId: t.triggerUseCaseId,
            triggerEvent: t.triggerEvent,
            completionEventName: t.onCompletionEventName,
            workflowSteps: t.steps
          }
        ] : null;
      }
      case "add-workflow-step":
        return [{ kind: "remove-workflow-step", workflowId: e.workflowId, id: e.id }];
      case "remove-workflow-step": {
        const t = (this.model.workflows ?? []).find((s) => s.id === e.workflowId), n = (t == null ? void 0 : t.steps.findIndex((s) => s.id === e.id)) ?? -1;
        if (!t || n < 0) return null;
        const i = t.steps[n];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: i.id,
            name: i.name,
            emittedEventName: i.emittedEventName,
            targetUseCaseId: i.targetUseCaseId,
            completionEventName: i.completionEventName,
            dependsOnStepIds: i.dependsOnStepIds,
            afterStepId: n > 0 ? t.steps[n - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...t.steps.filter((s) => s.id !== e.id && (s.dependsOnStepIds ?? []).includes(e.id)).map(
            (s) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: s.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const t = (this.model.workflows ?? []).find((i) => i.id === e.workflowId), n = t == null ? void 0 : t.steps.find((i) => i.id === e.id);
        return n ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: n.emittedEventName,
            targetUseCaseId: n.targetUseCaseId,
            completionEventName: n.completionEventName
          }
        ] : null;
      }
      case "add-workflow-dependency":
        return [
          {
            kind: "remove-workflow-dependency",
            workflowId: e.workflowId,
            id: e.id,
            dependsOnStepId: e.dependsOnStepId
          }
        ];
      case "remove-workflow-dependency":
        return [
          {
            kind: "add-workflow-dependency",
            workflowId: e.workflowId,
            id: e.id,
            dependsOnStepId: e.dependsOnStepId
          }
        ];
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
    const { id: t, x: n, y: i } = e.detail, s = this._view, r = this.viewLayout(s), o = r.nodes[t] ?? null;
    let a = { x: n, y: i };
    const d = this.sceneFor(s), l = d.nodes.find((f) => f.id === t);
    if (l != null && l.parentId) {
      const f = d.nodes.find((p) => p.id === l.parentId);
      f && (a = { x: n - f.x, y: i - f.y });
    }
    this.writeViewLayout(s, { ...r, nodes: { ...r.nodes, [t]: a } });
    const c = [{ kind: "move-node", view: s, id: t, pos: o }];
    if (s === "processes") {
      const f = this.stepReorderCommand(t);
      if (f) {
        const p = this.inverseOf(f);
        p && c.unshift(...p), this.command(f, !1);
      }
    }
    this.pushUndoEntry(c);
  }
  onNodeResized(e) {
    var c;
    const { id: t, x: n, y: i, w: s, h: r } = e.detail, o = this._view, a = this.viewLayout(o), d = this.sceneFor(o).nodes.filter((f) => f.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: o, id: t, size: ((c = a.sizes) == null ? void 0 : c[t]) ?? null },
      { kind: "move-node", view: o, id: t, pos: a.nodes[t] ?? null },
      ...d.map((f) => ({ kind: "move-node", view: o, id: f.id, pos: a.nodes[f.id] ?? null }))
    ]);
    const l = { ...a.nodes, [t]: { x: n, y: i } };
    for (const f of d) l[f.id] = { x: f.x - n, y: f.y - i };
    this.writeViewLayout(o, {
      ...a,
      nodes: l,
      sizes: { ...a.sizes ?? {}, [t]: { w: s, h: r } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: n } = e.detail, i = this._view, s = this.viewLayout(i);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: i, id: t, points: s.edges[t] ?? null }
    ]);
    const r = { ...s.edges };
    n.length ? r[t] = n : delete r[t], this.writeViewLayout(i, { ...s, edges: r });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const n = rn(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((o) => [o.id, o.x])), s = [...t.steps].sort(
      (o, a) => (i.get(o.id) ?? 0) - (i.get(a.id) ?? 0)
    );
    if (s.every((o, a) => o.id === t.steps[a].id)) return null;
    const r = s.findIndex((o) => o.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: r > 0 ? s[r - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: n, x: i, y: s } = e.detail;
    if (this._view === "workflows") {
      const y = this.owningWorkflowOf(t), v = this.owningWorkflowOf(n);
      if (!y || y !== v || t === n) return;
      const u = y.steps.find((b) => b.id === n);
      if (((u == null ? void 0 : u.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: y.id,
        id: n,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const r = new Set((this.model.aiAgents ?? []).map((y) => y.id));
    if (r.has(t)) {
      new Set(
        this.model.modules.flatMap((v) => (v.useCases ?? []).map((u) => u.id))
      ).has(n) && ((this.model.agentUses ?? []).some(
        (u) => u.agentId === t && u.useCaseId === n
      ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: n }));
      return;
    }
    if (r.has(n)) return;
    const o = new Set((this.model.actors ?? []).map((y) => y.id));
    if (o.has(t)) {
      const y = new Set(
        this.model.modules.flatMap((u) => (u.useCases ?? []).map((b) => b.id))
      ), v = new Set(
        this.model.modules.flatMap((u) => (u.queryServices ?? []).map((b) => b.id))
      );
      if (y.has(n) || v.has(n)) {
        (this.model.actorUses ?? []).some(
          (b) => b.actorId === t && b.targetId === n
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: n });
        return;
      }
      if ((this.model.aggregates ?? []).some((u) => u.id === n)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: n });
        return;
      }
      return;
    }
    const a = new Set(
      this.model.modules.flatMap((y) => (y.domainEvents ?? []).map((v) => v.id))
    ), d = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((y) => y.id),
      ...this.model.modules.flatMap((y) => (y.domainServices ?? []).map((v) => v.id))
    ]), l = new Set(
      this.model.modules.flatMap((y) => (y.applicationEvents ?? []).map((v) => v.id))
    ), c = new Set(this.model.modules.flatMap((y) => (y.useCases ?? []).map((v) => v.id))), f = new Set(
      this.model.modules.flatMap((y) => (y.queryServices ?? []).map((v) => v.id))
    );
    if (c.has(t) && f.has(n)) {
      (this.model.queryCalls ?? []).some(
        (v) => v.sourceId === t && v.targetId === n
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: n });
      return;
    }
    const p = new Set(
      this.model.externalSystems.flatMap((y) => (y.useCases ?? []).map((v) => v.id))
    );
    if (c.has(t) && p.has(n)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (v) => v.sourceId === t && v.targetId === n
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: n });
      return;
    }
    if (c.has(t) && c.has(n) && t !== n) {
      (this.model.useCaseCalls ?? []).some(
        (v) => v.sourceId === t && v.targetId === n
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: n });
      return;
    }
    if (d.has(t) && a.has(n) || c.has(t) && l.has(n)) {
      (this.model.emissions ?? []).some(
        (v) => v.sourceId === t && v.domainEventId === n
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: n });
      return;
    }
    if (a.has(t) || l.has(t)) {
      const y = l.has(t), v = this.model.modules.flatMap((h) => (y ? h.applicationEvents : h.domainEvents) ?? []).find((h) => h.id === t), u = this.model.modules.flatMap((h) => (h.useCases ?? []).map((g) => ({ u: g, module: h }))).find(({ u: h }) => h.id === n), b = this.model.modules.flatMap((h) => (h.readModels ?? []).map((g) => ({ rm: g, module: h }))).find(({ rm: h }) => h.id === n), E = this.model.modules.find((h) => h.id === n) ?? (b == null ? void 0 : b.module) ?? (u == null ? void 0 : u.module);
      if (!v || !E) return;
      const M = new Set((this.model.aggregates ?? []).map((h) => h.id)), T = new Set(
        this.model.modules.flatMap((h) => (h.domainServices ?? []).map((g) => g.id))
      ), R = (this.model.emissions ?? []).find(
        (h) => h.domainEventId === t && (y ? c.has(h.sourceId) : M.has(h.sourceId) || T.has(h.sourceId))
      );
      if (!R) {
        this.emit("modux-notice", {
          message: y ? `Declara primero qué caso de uso publica ${v.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${v.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const U = !y && M.has(R.sourceId);
      if (u) {
        if (this.model.flows.some(
          (g) => g.archetype === "TRIGGERS" && g.triggerEvent === v.name && g.targetUseCaseId === u.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${V(v.name)}-${V(u.u.name)}`,
          name: u.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: U ? R.sourceId : "",
          triggerDomainServiceId: !y && !U ? R.sourceId : void 0,
          triggerUseCaseId: y ? R.sourceId : void 0,
          triggerEvent: v.name,
          targetId: E.id,
          targetUseCaseId: u.u.id
        });
        return;
      }
      const W = (b == null ? void 0 : b.rm.name) ?? `${v.name}View`;
      if (this.model.flows.some(
        (h) => h.archetype === "MATERIALIZES" && h.triggerEvent === v.name && h.targetId === E.id && h.readModelName === W
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${V(v.name)}-${V(W)}`,
        name: W,
        archetype: "MATERIALIZES",
        triggerAggregateId: U ? R.sourceId : "",
        triggerDomainServiceId: !y && !U ? R.sourceId : void 0,
        triggerUseCaseId: y ? R.sourceId : void 0,
        triggerEvent: v.name,
        targetId: E.id,
        readModelName: W
      });
      return;
    }
    const w = /* @__PURE__ */ new Set([
      ...d,
      ...c,
      ...f,
      ...this.model.modules.flatMap((y) => (y.readModels ?? []).map((v) => v.id))
    ]);
    if (w.has(t) || w.has(n) || a.has(n) || l.has(n))
      return;
    const I = new Set(this.model.externalSystems.map((y) => y.id));
    if (I.has(t)) {
      new Set(
        this.model.modules.flatMap((v) => (v.useCases ?? []).map((u) => u.id))
      ).has(n) && ((this.model.externalCalls ?? []).some(
        (u) => u.externalSystemId === t && u.useCaseId === n
      ) || this.command({ kind: "add-external-call", sourceId: t, targetId: n }));
      return;
    }
    I.has(n) || o.has(n);
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
    if (this._view === "workflows" && t === "edge" && i === "workflow-dependency") {
      const s = /^wfdep:(.+)->(.+)$/.exec(n);
      if (!s) return;
      const r = this.owningWorkflowOf(s[2]);
      if (!r) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: r.id,
        id: s[2],
        dependsOnStepId: s[1]
      });
      return;
    }
    if (t === "node" && i === "workflow") {
      this._selectedId = null, this.command({ kind: "remove-workflow", id: n });
      return;
    }
    if (t === "node" && i === "workflow-step") {
      const s = this.owningWorkflowOf(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-workflow-step", workflowId: s.id, id: n });
      return;
    }
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
    if (this._view === "context-map" && t === "edge" && i === "agent-use") {
      const s = /^mcp:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "actor-use") {
      const s = /^use:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (t === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((r) => r.moduleId === n)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: n });
      return;
    }
    if (t === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((r) => r.aggregateId === n)) return;
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
    if (t === "node" && i === "ai-agent") {
      this._selectedId = null, this.command({ kind: "remove-ai-agent", id: n });
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
  owningWorkflowOf(e) {
    return (this.model.workflows ?? []).find((t) => t.steps.some((n) => n.id === e));
  }
  onNodeRenamed(e) {
    const { id: t, kind: n, name: i } = e.detail;
    (n === "module" || n === "aggregate" || n === "entity" || n === "process-step" || n === "workflow" || n === "workflow-step" || n === "domain-event" || n === "read-model" || n === "domain-service" || n === "query-service" || n === "use-case" || n === "external-use-case" || n === "application-event" || n === "external-system" || n === "actor" || n === "ai-agent") && this.command({ kind: "rename-element", type: n, id: t.replace(/^tgt:/, ""), name: i });
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
  addWorkflowStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.workflows ?? []).find((i) => i.id === this._selectedId), n = t ?? this.owningWorkflowOf(this._selectedId);
    n && (this.command({
      kind: "add-workflow-step",
      workflowId: n.id,
      id: `wfstep-${V(e)}`,
      name: e,
      emittedEventName: this._newStepEmits.trim() || void 0,
      targetUseCaseId: this._newStepUseCase || void 0,
      // Dragging a step onto another declares dependencies later; a selected
      // step is the natural predecessor of the new one.
      dependsOnStepIds: t ? void 0 : [this._selectedId],
      afterStepId: t ? void 0 : this._selectedId
    }), this._newStepName = "", this._newStepEmits = "");
  }
  applyWorkflowStepEdit() {
    const e = this._selectedId, t = e ? this.owningWorkflowOf(e) : void 0;
    !e || !t || this.command({
      kind: "update-workflow-step",
      workflowId: t.id,
      id: e,
      emittedEventName: this._editStepEmits.trim() || void 0,
      targetUseCaseId: this._editStepUseCase || void 0,
      completionEventName: this._editStepAwaits.trim() || void 0
    });
  }
  onElementSelected(e) {
    var t, n;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const i = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((s) => s.id === e.detail.id);
      this._editStepRole = (i == null ? void 0 : i.roleId) ?? "", this._editStepDeadline = (i == null ? void 0 : i.deadline) ?? "", this._editStepComp = (i == null ? void 0 : i.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const i = (n = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : n.steps.find((s) => s.id === e.detail.id);
      this._editStepUseCase = (i == null ? void 0 : i.targetUseCaseId) ?? "", this._editStepEmits = (i == null ? void 0 : i.emittedEventName) ?? "", this._editStepAwaits = (i == null ? void 0 : i.completionEventName) ?? "";
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
          case "workflow":
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
          case "workflow-step": {
            const s = this.owningWorkflowOf(n);
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
    const t = new Set(e.memberIds), n = this.model.modules.filter((d) => t.has(d.id)), i = new Set(n.map((d) => d.id)), s = this.model.externalSystems.filter((d) => t.has(d.id)), r = new Set(s.map((d) => d.id)), o = (this.model.aggregates ?? []).filter(
      (d) => t.has(d.id) || i.has(d.moduleId)
    ), a = new Set(o.map((d) => d.id));
    return {
      ...this.model,
      modules: n,
      externalSystems: s,
      relations: this.model.relations.filter(
        (d) => i.has(d.sourceId) && i.has(d.targetId)
      ),
      flows: this.model.flows.filter(
        (d) => t.has(d.id) || (i.has(d.sourceId) || r.has(d.sourceId)) && (i.has(d.targetId) || r.has(d.targetId))
      ),
      aggregates: o,
      entities: (this.model.entities ?? []).filter((d) => a.has(d.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (d) => a.has(d.sourceAggregateId) && a.has(d.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (d) => t.has(d.id) || (d.ownerModuleId ? i.has(d.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((d) => t.has(d.id))
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
    const t = e.detail.kind === "process-step" ? _d(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : vd(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, n, i, s, r, o, a, d, l, c, f, p, w, I, y, v, u, b, E, M, T, R, U, W, G, h;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${V(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: V(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${V(e)}`, name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const g = (t = this.model.modules.find(($) => $.id === this._selectedId)) == null ? void 0 : t.id, x = this._newModuleId || g || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!x) return;
          this.command({ kind: "add-domain-event", id: `ev-${V(e)}`, name: e, moduleId: x });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const g = (i = this.model.modules.find(($) => $.id === this._selectedId)) == null ? void 0 : i.id, x = this._newModuleId || g || ((s = this.model.modules[0]) == null ? void 0 : s.id);
          if (!x) return;
          this.command({ kind: "add-application-event", id: `aev-${V(e)}`, name: e, moduleId: x });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const g = (r = this.model.modules.find(($) => $.id === this._selectedId)) == null ? void 0 : r.id, x = this._newModuleId || g || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!x) return;
          this.command({ kind: "add-domain-service", id: `ds-${V(e)}`, name: e, moduleId: x });
        } else if (this._detail === "detail" && this._newContextMapKind === "query-service") {
          const g = (a = this.model.modules.find(($) => $.id === this._selectedId)) == null ? void 0 : a.id, x = this._newModuleId || g || ((d = this.model.modules[0]) == null ? void 0 : d.id);
          if (!x) return;
          this.command({ kind: "add-query-service", id: `qs-${V(e)}`, name: e, moduleId: x });
        } else if (this._detail === "detail" && this._newContextMapKind === "use-case") {
          const g = (l = this.model.modules.find(($) => $.id === this._selectedId)) == null ? void 0 : l.id, x = this._newModuleId || g || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!x) return;
          this.command({ kind: "add-use-case", id: `uc-${V(e)}`, name: e, moduleId: x });
        } else if (this._detail === "detail" && this._newContextMapKind === "policy") {
          const g = (f = this.model.modules.find(($) => $.id === this._selectedId)) == null ? void 0 : f.id, x = this._newModuleId || g || ((p = this.model.modules[0]) == null ? void 0 : p.id);
          if (!x) return;
          this.command({ kind: "add-use-case", id: `uc-${V(e)}`, name: e, moduleId: x, policy: !0 });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-use-case") {
          const g = (w = this.model.externalSystems.find(($) => $.id === this._selectedId)) == null ? void 0 : w.id, x = this._newExternalId || g || ((I = this.model.externalSystems[0]) == null ? void 0 : I.id);
          if (!x) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${V(e)}`,
            name: e,
            moduleId: x
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const g = (y = (this.model.aggregates ?? []).find(($) => $.id === this._selectedId)) == null ? void 0 : y.id, x = this._newAggregateId || g || ((u = (v = this.model.aggregates) == null ? void 0 : v[0]) == null ? void 0 : u.id);
          if (!x) return;
          this.command({ kind: "add-read-model", id: `rm-${V(e)}`, name: e, aggregateId: x });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${V(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const g = this._newModuleId || ((b = this.model.modules[0]) == null ? void 0 : b.id);
        if (!g) return;
        this.command({ kind: "add-aggregate", id: `agg-${V(e)}`, name: e, moduleId: g });
      } else if (this._view === "flows") {
        const g = this._newTriggerAggId || ((M = (E = this.model.aggregates) == null ? void 0 : E[0]) == null ? void 0 : M.id), x = this._newTargetId || ((T = this.model.modules[0]) == null ? void 0 : T.id), $ = this._newTriggerEvent.trim();
        if (!g || !x || !$) return;
        this.command({
          kind: "add-flow",
          id: `flow-${V(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: g,
          triggerEvent: $,
          targetId: x
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const g = this._newModuleId || ((R = this.model.modules[0]) == null ? void 0 : R.id);
        if (!g) return;
        this.command({
          kind: "add-process",
          id: `proc-${V(e)}`,
          name: e,
          moduleId: g,
          triggerAggregateId: this._newTriggerAggId || ((W = (U = this.model.aggregates) == null ? void 0 : U[0]) == null ? void 0 : W.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${V(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((h = (G = this.model.aggregates) == null ? void 0 : G[0]) == null ? void 0 : h.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), n = this.filteredModel();
    return e === "aggregates" ? Ki(n, t.nodes) : e === "flows" ? es(n, t.nodes) : e === "processes" ? rn(n, t.nodes) : e === "workflows" ? hd(n, t.nodes) : e === "eventstorming" ? sd(n, t.nodes) : Ui(n, t.nodes, this._detail === "detail", t.sizes ?? {});
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((l) => !l.parentId), i = new Set(n.map((l) => l.id)), s = {
      nodes: n,
      edges: t.edges.filter((l) => i.has(l.sourceId) && i.has(l.targetId))
    }, o = await fd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: o, edges: {}, sizes: a.sizes }), await this.updateComplete, (d = this.renderRoot.querySelector("modux-canvas")) == null || d.fit();
  }
  render() {
    const e = this.sceneFor(this._view);
    return A`
      <div class="toolbar">
        <div class="tabs">
          ${wd.map(
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
          ?hidden=${this._view === "eventstorming"}
          placeholder=${{
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : this._newContextMapKind === "policy" ? "Nueva policy…" : "Nuevo read model…",
      aggregates: "Nuevo agregado…",
      flows: "Nuevo flow…",
      processes: "Nuevo proceso…",
      workflows: "Nuevo workflow…",
      eventstorming: ""
    }[this._view]}
          .value=${this._newName}
          @input=${(t) => this._newName = t.target.value}
          @keydown=${(t) => t.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "context-map" ? A`<select
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
              <option value="ai-agent" ?selected=${this._newContextMapKind === "ai-agent"}>
                Agente de IA
              </option>
              ${this._detail === "detail" ? A`
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
                    <option value="policy" ?selected=${this._newContextMapKind === "policy"}>
                      Policy
                    </option>
                    <option
                      value="external-use-case"
                      ?selected=${this._newContextMapKind === "external-use-case"}
                    >
                      Caso de uso externo
                    </option>
                  ` : ""}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "external-use-case" ? A`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var n;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((n = this.model.externalSystems[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
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
        ${this._view === "context-map" && this._newContextMapKind === "module" ? A`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${yd.map(
      (t) => A`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? A`<select
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
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? A`
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
        <button
          class="tab"
          ?hidden=${this._view === "eventstorming"}
          @click=${this.createElementFromToolbar}
        >
          ＋ Crear
        </button>
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? A`
              <span class="sep"></span>
              <input
                class="new-name evt"
                placeholder="Nuevo paso…"
                .value=${this._newStepName}
                @input=${(t) => this._newStepName = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.addWorkflowStepFromToolbar()}
              />
              <select
                title="Caso de uso que lanza el nuevo paso"
                @change=${(t) => this._newStepUseCase = t.target.value}
              >
                <option value="" ?selected=${this._newStepUseCase === ""}>— sin use case —</option>
                ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => A`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
                        ${t.name}
                      </option>`
    )}
              </select>
              <input
                class="new-name evt"
                placeholder="Evento que emite…"
                title="Evento que el workflow emite para arrancar el paso"
                .value=${this._newStepEmits}
                @input=${(t) => this._newStepEmits = t.target.value}
              />
              <button
                class="tab"
                title="Añadir paso (workflow seleccionado = suelto; paso seleccionado = dependiente de él)"
                @click=${this.addWorkflowStepFromToolbar}
              >
                ＋ Paso
              </button>
              ${this.owningWorkflowOf(this._selectedId) ? A`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => A`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
                              ${t.name}
                            </option>`
    )}
                    </select>
                    <input
                      class="new-name evt"
                      placeholder="Emite…"
                      title="Evento que arranca el paso seleccionado"
                      .value=${this._editStepEmits}
                      @input=${(t) => this._editStepEmits = t.target.value}
                    />
                    <input
                      class="new-name evt"
                      placeholder="Espera…"
                      title="Evento que marca el paso como completado"
                      .value=${this._editStepAwaits}
                      @input=${(t) => this._editStepAwaits = t.target.value}
                    />
                    <button
                      class="tab"
                      title="Aplicar cambios al paso"
                      @click=${this.applyWorkflowStepEdit}
                    >
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
        .connectable=${this._view === "context-map" || this._view === "workflows"}
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
            · rueda para zoom` : this._view === "eventstorming" ? A`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? A`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : A`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
        ${gd.map(
      (i) => A`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${Kt[i].abbr}</span>
              <span class="name">${Kt[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
L.styles = Yt`
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
H([
  pe({ attribute: !1 })
], L.prototype, "model", 2);
H([
  pe({ attribute: !1 })
], L.prototype, "layout", 2);
H([
  C()
], L.prototype, "_view", 2);
H([
  C()
], L.prototype, "_detail", 2);
H([
  C()
], L.prototype, "_relationType", 2);
H([
  C()
], L.prototype, "_relationPicker", 2);
H([
  C()
], L.prototype, "_selectedId", 2);
H([
  C()
], L.prototype, "_newName", 2);
H([
  C()
], L.prototype, "_newSubdomain", 2);
H([
  C()
], L.prototype, "_newModuleId", 2);
H([
  C()
], L.prototype, "_newContextMapKind", 2);
H([
  C()
], L.prototype, "_newAggregateId", 2);
H([
  C()
], L.prototype, "_newExternalId", 2);
H([
  C()
], L.prototype, "_newArchetype", 2);
H([
  C()
], L.prototype, "_newTriggerAggId", 2);
H([
  C()
], L.prototype, "_newTriggerEvent", 2);
H([
  C()
], L.prototype, "_newTargetId", 2);
H([
  C()
], L.prototype, "_undoStack", 2);
H([
  C()
], L.prototype, "_redoStack", 2);
H([
  C()
], L.prototype, "_newStepName", 2);
H([
  C()
], L.prototype, "_newStepType", 2);
H([
  C()
], L.prototype, "_newStepRole", 2);
H([
  C()
], L.prototype, "_newStepDeadline", 2);
H([
  C()
], L.prototype, "_editStepRole", 2);
H([
  C()
], L.prototype, "_editStepDeadline", 2);
H([
  C()
], L.prototype, "_editStepComp", 2);
H([
  C()
], L.prototype, "_newStepUseCase", 2);
H([
  C()
], L.prototype, "_newStepEmits", 2);
H([
  C()
], L.prototype, "_editStepUseCase", 2);
H([
  C()
], L.prototype, "_editStepEmits", 2);
H([
  C()
], L.prototype, "_editStepAwaits", 2);
H([
  C()
], L.prototype, "_multi", 2);
H([
  C()
], L.prototype, "_newViewName", 2);
H([
  C()
], L.prototype, "_activeViewId", 2);
L = H([
  jt("modux-editor")
], L);
var xd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, Se = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Id(t, n) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (s = (i ? o(t, n, s) : o(s)) || s);
  return i && s && xd(t, n, s), s;
};
let fe = class extends $e {
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
fe.styles = Yt`
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
Se([
  pe()
], fe.prototype, "base", 2);
Se([
  C()
], fe.prototype, "_model", 2);
Se([
  C()
], fe.prototype, "_layout", 2);
Se([
  C()
], fe.prototype, "_error", 2);
Se([
  C()
], fe.prototype, "_saving", 2);
Se([
  C()
], fe.prototype, "_toast", 2);
fe = Se([
  jt("modux-editor-connected")
], fe);
export {
  $d as CONTAINER_HEADER,
  bd as CONTAINER_INSET,
  B as ModuxCanvas,
  L as ModuxEditor,
  fe as ModuxEditorConnected,
  Ki as aggregatesScene,
  $i as containerFit,
  Ii as containerMinSize,
  Ui as contextMapScene,
  Ni as flowCoherence,
  es as flowsScene,
  bi as normalizeViewLayout,
  rn as processesScene,
  Mi as relationEdgeId
};
