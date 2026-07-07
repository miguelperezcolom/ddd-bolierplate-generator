const Id = 34, $d = 10;
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
}, Rt = 168, Ot = 56, Hn = 34, qn = 14, Ai = 14, We = 108, Fe = 32, Vn = 12, Wn = 10, Ke = 2, Ci = Ke * We + (Ke - 1) * Vn + 2 * qn;
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
const Ti = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" },
  "query-service": { symbol: "lens", fill: "#f0f9ff", stroke: "#0284c7" },
  "external-use-case": { symbol: "usecase", fill: "#f8fafc", stroke: "#64748b" }
}, Pi = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Query service",
  "external-use-case": "Caso de uso externo"
};
function Ri(e) {
  const t = Math.max(1, Math.ceil(e / Ke)), n = t * Fe + (t - 1) * Wn;
  return { w: Ci, h: Hn + n + Ai };
}
function Oi(e, t) {
  const n = e % Ke, i = Math.floor(e / Ke);
  return {
    x: -t.w / 2 + qn + n * (We + Vn) + We / 2,
    y: -t.h / 2 + Hn + i * (Fe + Wn) + Fe / 2
  };
}
function Li(e, t, n, i, s, o) {
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
  return a.length ? Fn(n, i, a, s, o) : [{ ...i, x: n.x, y: n.y, w: Rt, h: Ot }];
}
function Fn(e, t, n, i, s) {
  const o = s[t.id] ?? Ri(n.length), r = n.map((c, f) => i[c.id] ?? Oi(f, o)), a = $i(
    e,
    o,
    r.map((c) => ({ dx: c.x, dy: c.y, w: We, h: Fe }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, l = n.map((c, f) => {
    const p = r[f], g = Ti[c.kind];
    return {
      id: c.id,
      label: c.name,
      kind: c.kind,
      x: e.x + p.x,
      y: e.y + p.y,
      w: We,
      h: Fe,
      symbol: g.symbol,
      fill: g.fill,
      stroke: g.stroke,
      parentId: t.id,
      tooltip: `${Pi[c.kind]} ${c.name}`
    };
  });
  return [d, ...l];
}
function Di(e, t, n = !1, i = {}) {
  const s = [
    ...e.modules.map((h) => ({ ref: h, external: !1 })),
    ...e.externalSystems.map((h) => ({ ref: h, external: !0 }))
  ], o = s.flatMap((h, I) => {
    const E = t[h.ref.id] ?? kt(I, s.length);
    if (h.external) {
      const z = h.ref, F = {
        id: z.id,
        label: z.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${z.name} (sistema externo)`
      };
      return n && (z.useCases ?? []).length > 0 ? Fn(
        E,
        F,
        (z.useCases ?? []).map((R) => ({ id: R.id, name: R.name, kind: "external-use-case" })),
        t,
        i
      ) : [{ ...F, x: E.x, y: E.y, w: Rt, h: Ot }];
    }
    const M = h.ref, T = M.subdomainType ?? "GENERIC", P = {
      id: M.id,
      label: M.name,
      kind: "module",
      symbol: "component",
      fill: ki[T],
      stroke: "#94a3b8",
      badge: T,
      tooltip: `${M.name} — subdominio ${T}`
    };
    return n ? Li(e, M, E, P, t, i) : [{ ...P, x: E.x, y: E.y, w: Rt, h: Ot }];
  }), r = s.length + (e.actors ?? []).length + (e.aiAgents ?? []).length;
  (e.actors ?? []).forEach((h, I) => {
    const E = t[h.id] ?? kt(s.length + I, r);
    o.push({
      id: h.id,
      label: h.name,
      x: E.x,
      y: E.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${h.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((h, I) => {
    const E = t[h.id] ?? kt(s.length + (e.actors ?? []).length + I, r);
    o.push({
      id: h.id,
      label: h.name,
      x: E.x,
      y: E.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${h.name} (agente de IA — consume por MCP)`
    });
  }), o.sort((h, I) => (h.parentId ? 1 : 0) - (I.parentId ? 1 : 0));
  const a = e.relations.map((h) => ({
    id: Mi(h.sourceId, h.targetId),
    sourceId: h.sourceId,
    targetId: h.targetId,
    kind: "relation",
    label: h.type ? Ei[h.type] : "?",
    color: h.declared ? "#475569" : "#94a3b8",
    dashed: !h.declared,
    arrow: !0,
    tooltip: h.type ? `${h.type} (${h.sourceId} upstream → ${h.targetId} downstream)${h.reasons ? ` — ${h.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${h.reasons ? ` — ${h.reasons}` : ""}`
  })), d = e.flows.map((h) => {
    var z, F, R, u, w, b;
    const I = Ni(e, h), E = n ? e.modules.find((k) => k.id === h.sourceId) : void 0, M = ((z = E == null ? void 0 : E.domainEvents) == null ? void 0 : z.find((k) => k.name === h.triggerEvent)) ?? ((F = E == null ? void 0 : E.applicationEvents) == null ? void 0 : F.find((k) => k.name === h.triggerEvent)), T = n && h.readModelName ? (u = (R = e.modules.find((k) => k.id === h.targetId)) == null ? void 0 : R.readModels) == null ? void 0 : u.find((k) => k.name === h.readModelName) : void 0, P = n && h.targetUseCaseId ? (b = (w = e.modules.find((k) => k.id === h.targetId)) == null ? void 0 : w.useCases) == null ? void 0 : b.find((k) => k.id === h.targetUseCaseId) : void 0;
    return {
      id: `flow:${h.id}`,
      sourceId: (M == null ? void 0 : M.id) ?? h.sourceId,
      targetId: (P == null ? void 0 : P.id) ?? (T == null ? void 0 : T.id) ?? h.targetId,
      kind: "flow",
      label: h.name,
      color: Si[I],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${h.name} [${h.archetype}] — ${I}`
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
  })) : [], f = n ? (e.useCaseCalls ?? []).filter((h) => l.has(h.sourceId) && l.has(h.targetId)).map((h) => ({
    id: `uccall:${h.sourceId}->${h.targetId}`,
    sourceId: h.sourceId,
    targetId: h.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], p = n ? (e.queryCalls ?? []).filter((h) => l.has(h.sourceId) && l.has(h.targetId)).map((h) => ({
    id: `qscall:${h.sourceId}->${h.targetId}`,
    sourceId: h.sourceId,
    targetId: h.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], g = n ? (e.actorUses ?? []).filter((h) => l.has(h.actorId) && l.has(h.targetId)).map((h) => ({
    id: `use:${h.actorId}->${h.targetId}`,
    sourceId: h.actorId,
    targetId: h.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], x = n ? (e.agentUses ?? []).filter((h) => l.has(h.agentId) && l.has(h.useCaseId)).map((h) => ({
    id: `mcp:${h.agentId}->${h.useCaseId}`,
    sourceId: h.agentId,
    targetId: h.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], v = n ? (e.externalCalls ?? []).filter((h) => l.has(h.externalSystemId) && l.has(h.useCaseId)).map((h) => ({
    id: `extcall:${h.externalSystemId}->${h.useCaseId}`,
    sourceId: h.externalSystemId,
    targetId: h.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], y = n ? (e.externalUseCaseCalls ?? []).filter((h) => l.has(h.sourceId) && l.has(h.targetId)).map((h) => ({
    id: `extuccall:${h.sourceId}->${h.targetId}`,
    sourceId: h.sourceId,
    targetId: h.targetId,
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
      ...f,
      ...p,
      ...g,
      ...x,
      ...v,
      ...y
    ]
  };
}
const Ui = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, zi = 176, Hi = 60, qi = 140, Vi = 40;
function Wi(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    n.filter((d) => d.moduleId === s.id).forEach((d, l) => {
      const c = i.filter((p) => p.aggregateId === d.id).length, f = 140 + l * (170 + c * 60);
      t[d.id] = { x: r, y: f }, i.filter((p) => p.aggregateId === d.id).forEach((p, g) => {
        t[p.id] = { x: r + 60, y: f + 100 + g * 60 };
      });
    });
  }), n.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Fi(e, t) {
  const n = Wi(e), i = (l) => t[l] ?? n[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), o = (e.aggregates ?? []).map((l) => {
    const c = s.get(l.moduleId), f = (c == null ? void 0 : c.subdomainType) ?? "GENERIC", p = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: p.x,
      y: p.y,
      w: zi,
      h: Hi,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ui[f],
      stroke: "#64748b",
      badge: c ? `${c.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${c ? ` — módulo ${c.name} (${f})` : ""}`
    };
  }), r = (e.entities ?? []).map((l) => {
    const c = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: c.x,
      y: c.y,
      w: qi,
      h: Vi,
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
const Ki = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Bi = 150, Gi = 44, Yi = 190, Xi = 56, Zi = 160, ji = 48;
function Qi(e, t) {
  const n = e.externalSystems.find((s) => s.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function Ji(e, t) {
  const n = e.flows, i = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, l;
    return ((l = (d = e.aggregates) == null ? void 0 : d.find((c) => c.id === a)) == null ? void 0 : l.name) ?? a ?? "?";
  };
  return n.forEach((a, d) => {
    const l = 120 + d * 130, c = Ki[a.archetype] ?? "#475569", f = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(f)) {
      o.add(f);
      const y = t[f] ?? { x: 160, y: l };
      i.push({
        id: f,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : f,
        x: y.x,
        y: y.y,
        w: Bi,
        h: Gi,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const p = `flow:${a.id}`, g = t[p] ?? { x: 470, y: l };
    i.push({
      id: p,
      label: a.name,
      x: g.x,
      y: g.y,
      w: Yi,
      h: Xi,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: c,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const x = Qi(e, a), v = `tgt:${x.id}`;
    if (!o.has(v)) {
      o.add(v);
      const y = t[v] ?? { x: 790, y: l };
      i.push({
        id: v,
        label: x.label,
        x: y.x,
        y: y.y,
        w: Zi,
        h: ji,
        kind: x.external ? "external-system" : "module",
        symbol: "component",
        fill: x.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: x.external,
        badge: x.external ? "EXTERNAL" : "MODULE"
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
      targetId: v,
      kind: "flow-delivery",
      color: c,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const es = 190, ts = 56, Et = 170, ns = 52;
function on(e, t) {
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
      w: es,
      h: ts,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let l = o.id;
    if (o.steps.forEach((c, f) => {
      const p = c.type === "HUMAN", g = t[c.id] ?? { x: 150 + (f + 1) * 240, y: a };
      if (n.push({
        id: c.id,
        label: c.name,
        x: g.x,
        y: g.y,
        w: Et,
        h: ns,
        kind: "process-step",
        symbol: p ? "person" : "gear",
        fill: p ? "#fef3c7" : "#ffffff",
        stroke: p ? "#d97706" : "#64748b",
        badge: p ? `HUMAN${c.roleId ? ` · ${c.roleId}` : ""}${c.deadline ? ` · ⏱ ${c.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${c.name}${c.useCaseId ? ` — use case ${c.useCaseId}` : ""}${c.deadline ? ` · deadline ${c.deadline}` : ""}`
      }), i.push({
        id: `pe:${o.id}:${f}`,
        sourceId: l,
        targetId: c.id,
        kind: "process-seq",
        label: f === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), c.compensationUseCaseId) {
        const x = `comp:${c.id}`, v = t[x] ?? { x: g.x, y: g.y + 90 };
        n.push({
          id: x,
          label: c.compensationUseCaseId,
          x: v.x,
          y: v.y,
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
          targetId: x,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      l = c.id;
    }), o.onCompletionEventName) {
      const c = `done:${o.id}`, f = t[c] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      n.push({
        id: c,
        label: o.onCompletionEventName,
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
const is = (e) => new Kn(typeof e == "string" ? e : e + "", void 0, Gt), Yt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Kn(n, e, Gt);
}, ss = (e, t) => {
  if (Bt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = at.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, e.appendChild(i);
  }
}, dn = Bt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return is(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rs, defineProperty: os, getOwnPropertyDescriptor: as, getOwnPropertyNames: ds, getOwnPropertySymbols: ls, getPrototypeOf: cs } = Object, we = globalThis, ln = we.trustedTypes, us = ln ? ln.emptyScript : "", St = we.reactiveElementPolyfillSupport, He = (e, t) => e, ht = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? us : null;
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
let Ce = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = cn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, n);
      s !== void 0 && os(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: s, set: o } = as(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const t = cs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const n = this.properties, i = [...ds(n), ...ls(n)];
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
    return ss(t, this.constructor.elementStyles), t;
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
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : ht).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : ht;
      this._$Em = s;
      const l = d.fromAttribute(n, a.type);
      this[s] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? Xt)(o, n) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
Ce.elementStyles = [], Ce.shadowRootOptions = { mode: "open" }, Ce[He("elementProperties")] = /* @__PURE__ */ new Map(), Ce[He("finalized")] = /* @__PURE__ */ new Map(), St == null || St({ ReactiveElement: Ce }), (we.reactiveElementVersions ?? (we.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis, un = (e) => e, ft = qe.trustedTypes, hn = ft ? ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Bn = "$lit$", ge = `lit$${Math.random().toFixed(9).slice(2)}$`, Gn = "?" + ge, hs = `<${Gn}>`, ke = document, Be = () => ke.createComment(""), Ge = (e) => e === null || typeof e != "object" && typeof e != "function", Zt = Array.isArray, fs = (e) => Zt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", At = `[ 	
\f\r]`, Oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fn = /-->/g, pn = />/g, ve = RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mn = /'/g, gn = /"/g, Yn = /^(?:script|style|textarea|title)$/i, Xn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), C = Xn(1), O = Xn(2), Ne = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), wn = /* @__PURE__ */ new WeakMap(), _e = ke.createTreeWalker(ke, 129);
function Zn(e, t) {
  if (!Zt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hn !== void 0 ? hn.createHTML(t) : t;
}
const ps = (e, t) => {
  const n = e.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Oe;
  for (let a = 0; a < n; a++) {
    const d = e[a];
    let l, c, f = -1, p = 0;
    for (; p < d.length && (r.lastIndex = p, c = r.exec(d), c !== null); ) p = r.lastIndex, r === Oe ? c[1] === "!--" ? r = fn : c[1] !== void 0 ? r = pn : c[2] !== void 0 ? (Yn.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = ve) : c[3] !== void 0 && (r = ve) : r === ve ? c[0] === ">" ? (r = s ?? Oe, f = -1) : c[1] === void 0 ? f = -2 : (f = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? ve : c[3] === '"' ? gn : mn) : r === gn || r === mn ? r = ve : r === fn || r === pn ? r = Oe : (r = ve, s = void 0);
    const g = r === ve && e[a + 1].startsWith("/>") ? " " : "";
    o += r === Oe ? d + hs : f >= 0 ? (i.push(l), d.slice(0, f) + Bn + d.slice(f) + ge + g) : d + ge + (f === -2 ? a : g);
  }
  return [Zn(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ye {
  constructor({ strings: t, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [l, c] = ps(t, n);
    if (this.el = Ye.createElement(l, i), _e.currentNode = this.el.content, n === 2 || n === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (s = _e.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const f of s.getAttributeNames()) if (f.endsWith(Bn)) {
          const p = c[r++], g = s.getAttribute(f).split(ge), x = /([.?@])?(.*)/.exec(p);
          d.push({ type: 1, index: o, name: x[2], strings: g, ctor: x[1] === "." ? gs : x[1] === "?" ? ws : x[1] === "@" ? vs : _t }), s.removeAttribute(f);
        } else f.startsWith(ge) && (d.push({ type: 6, index: o }), s.removeAttribute(f));
        if (Yn.test(s.tagName)) {
          const f = s.textContent.split(ge), p = f.length - 1;
          if (p > 0) {
            s.textContent = ft ? ft.emptyScript : "";
            for (let g = 0; g < p; g++) s.append(f[g], Be()), _e.nextNode(), d.push({ type: 2, index: ++o });
            s.append(f[p], Be());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Gn) d.push({ type: 2, index: o });
      else {
        let f = -1;
        for (; (f = s.data.indexOf(ge, f + 1)) !== -1; ) d.push({ type: 7, index: o }), f += ge.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const i = ke.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Te(e, t, n = e, i) {
  var r, a;
  if (t === Ne) return t;
  let s = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const o = Ge(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = s : n._$Cl = s), s !== void 0 && (t = Te(e, s._$AS(e, t.values), s, i)), t;
}
class ms {
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
    let o = _e.nextNode(), r = 0, a = 0, d = i[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let l;
        d.type === 2 ? l = new Je(o, o.nextSibling, this, t) : d.type === 1 ? l = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (l = new ys(o, this, t)), this._$AV.push(l), d = i[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = _e.nextNode(), r++);
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
    this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Te(this, t, n), Ge(t) ? t === B || t == null || t === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : t !== this._$AH && t !== Ne && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : fs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== B && Ge(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ke.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: n, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ye.createElement(Zn(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(n);
    else {
      const r = new ms(s, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
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
    for (const o of t) s === n.length ? n.push(i = new Je(this.O(Be()), this.O(Be()), this, this.options)) : i = n[s], i._$AI(o), s++;
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
  constructor(t, n, i, s, o) {
    this.type = 1, this._$AH = B, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = B;
  }
  _$AI(t, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Te(this, t, n, 0), r = !Ge(t) || t !== this._$AH && t !== Ne, r && (this._$AH = t);
    else {
      const a = t;
      let d, l;
      for (t = o[0], d = 0; d < o.length - 1; d++) l = Te(this, a[i + d], n, d), l === Ne && (l = this._$AH[d]), r || (r = !Ge(l) || l !== this._$AH[d]), l === B ? t = B : t !== B && (t += (l ?? "") + o[d + 1]), this._$AH[d] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class gs extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === B ? void 0 : t;
  }
}
class ws extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== B);
  }
}
class vs extends _t {
  constructor(t, n, i, s, o) {
    super(t, n, i, s, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Te(this, t, n, 0) ?? B) === Ne) return;
    const i = this._$AH, s = t === B && i !== B || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== B && (i === B || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ys {
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
const Ct = qe.litHtmlPolyfillSupport;
Ct == null || Ct(Ye, Je), (qe.litHtmlVersions ?? (qe.litHtmlVersions = [])).push("3.3.3");
const _s = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = s = new Je(t.insertBefore(Be(), o), o, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis;
class $e extends Ce {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _s(n, this.renderRoot, this.renderOptions);
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
const xs = { attribute: !0, type: String, converter: ht, reflect: !1, hasChanged: Xt }, Is = (e = xs, t, n) => {
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
function pe(e) {
  return (t, n) => typeof n == "object" ? Is(e, t, n) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(e) {
  return pe({ ...e, state: !0, attribute: !1 });
}
var Lt = "http://www.w3.org/1999/xhtml";
const vn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function xt(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), vn.hasOwnProperty(t) ? { space: vn[t], local: e } : e;
}
function $s(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Lt && t.documentElement.namespaceURI === Lt ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function bs(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function jn(e) {
  var t = xt(e);
  return (t.local ? bs : $s)(t);
}
function ks() {
}
function Qt(e) {
  return e == null ? ks : function() {
    return this.querySelector(e);
  };
}
function Es(e) {
  typeof e != "function" && (e = Qt(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = new Array(r), d, l, c = 0; c < r; ++c)
      (d = o[c]) && (l = e.call(d, d.__data__, c, o)) && ("__data__" in d && (l.__data__ = d.__data__), a[c] = l);
  return new Q(i, this._parents);
}
function Ss(e) {
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
function Cs(e) {
  return function() {
    return Ss(e.apply(this, arguments));
  };
}
function Ms(e) {
  typeof e == "function" ? e = Cs(e) : e = Qn(e);
  for (var t = this._groups, n = t.length, i = [], s = [], o = 0; o < n; ++o)
    for (var r = t[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && (i.push(e.call(d, d.__data__, l, r)), s.push(d));
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
var Ns = Array.prototype.find;
function Ts(e) {
  return function() {
    return Ns.call(this.children, e);
  };
}
function Ps() {
  return this.firstElementChild;
}
function Rs(e) {
  return this.select(e == null ? Ps : Ts(typeof e == "function" ? e : ei(e)));
}
var Os = Array.prototype.filter;
function Ls() {
  return Array.from(this.children);
}
function Ds(e) {
  return function() {
    return Os.call(this.children, e);
  };
}
function Us(e) {
  return this.selectAll(e == null ? Ls : Ds(typeof e == "function" ? e : ei(e)));
}
function zs(e) {
  typeof e != "function" && (e = Jn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new Q(i, this._parents);
}
function ti(e) {
  return new Array(e.length);
}
function Hs() {
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
function qs(e) {
  return function() {
    return e;
  };
}
function Vs(e, t, n, i, s, o) {
  for (var r = 0, a, d = t.length, l = o.length; r < l; ++r)
    (a = t[r]) ? (a.__data__ = o[r], i[r] = a) : n[r] = new pt(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function Ws(e, t, n, i, s, o, r) {
  var a, d, l = /* @__PURE__ */ new Map(), c = t.length, f = o.length, p = new Array(c), g;
  for (a = 0; a < c; ++a)
    (d = t[a]) && (p[a] = g = r.call(d, d.__data__, a, t) + "", l.has(g) ? s[a] = d : l.set(g, d));
  for (a = 0; a < f; ++a)
    g = r.call(e, o[a], a, o) + "", (d = l.get(g)) ? (i[a] = d, d.__data__ = o[a], l.delete(g)) : n[a] = new pt(e, o[a]);
  for (a = 0; a < c; ++a)
    (d = t[a]) && l.get(p[a]) === d && (s[a] = d);
}
function Fs(e) {
  return e.__data__;
}
function Ks(e, t) {
  if (!arguments.length) return Array.from(this, Fs);
  var n = t ? Ws : Vs, i = this._parents, s = this._groups;
  typeof e != "function" && (e = qs(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), l = 0; l < o; ++l) {
    var c = i[l], f = s[l], p = f.length, g = Bs(e.call(c, c && c.__data__, l, i)), x = g.length, v = a[l] = new Array(x), y = r[l] = new Array(x), h = d[l] = new Array(p);
    n(c, f, v, y, h, g, t);
    for (var I = 0, E = 0, M, T; I < x; ++I)
      if (M = v[I]) {
        for (I >= E && (E = I + 1); !(T = y[E]) && ++E < x; ) ;
        M._next = T || null;
      }
  }
  return r = new Q(r, i), r._enter = a, r._exit = d, r;
}
function Bs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Gs() {
  return new Q(this._exit || this._groups.map(ti), this._parents);
}
function Ys(e, t, n) {
  var i = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? o.remove() : n(o), i && s ? i.merge(s).order() : s;
}
function Xs(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, s = n.length, o = i.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var l = n[d], c = i[d], f = l.length, p = a[d] = new Array(f), g, x = 0; x < f; ++x)
      (g = l[x] || c[x]) && (p[x] = g);
  for (; d < s; ++d)
    a[d] = n[d];
  return new Q(a, this._parents);
}
function Zs() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], s = i.length - 1, o = i[s], r; --s >= 0; )
      (r = i[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function js(e) {
  e || (e = Qs);
  function t(f, p) {
    return f && p ? e(f.__data__, p.__data__) : !f - !p;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o) {
    for (var r = n[o], a = r.length, d = s[o] = new Array(a), l, c = 0; c < a; ++c)
      (l = r[c]) && (d[c] = l);
    d.sort(t);
  }
  return new Q(s, this._parents).order();
}
function Qs(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Js() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function er() {
  return Array.from(this);
}
function tr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length; s < o; ++s) {
      var r = i[s];
      if (r) return r;
    }
  return null;
}
function nr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ir() {
  return !this.node();
}
function sr(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var s = t[n], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function rr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function or(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ar(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function dr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function lr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function cr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function ur(e, t) {
  var n = xt(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? or : rr : typeof t == "function" ? n.local ? cr : lr : n.local ? dr : ar)(n, t));
}
function ni(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function hr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function fr(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function pr(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function mr(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? hr : typeof t == "function" ? pr : fr)(e, t, n ?? "")) : Pe(this.node(), e);
}
function Pe(e, t) {
  return e.style.getPropertyValue(t) || ni(e).getComputedStyle(e, null).getPropertyValue(t);
}
function gr(e) {
  return function() {
    delete this[e];
  };
}
function wr(e, t) {
  return function() {
    this[e] = t;
  };
}
function vr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function yr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? gr : typeof t == "function" ? vr : wr)(e, t)) : this.node()[e];
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
function ri(e, t) {
  for (var n = Jt(e), i = -1, s = t.length; ++i < s; ) n.add(t[i]);
}
function oi(e, t) {
  for (var n = Jt(e), i = -1, s = t.length; ++i < s; ) n.remove(t[i]);
}
function _r(e) {
  return function() {
    ri(this, e);
  };
}
function xr(e) {
  return function() {
    oi(this, e);
  };
}
function Ir(e, t) {
  return function() {
    (t.apply(this, arguments) ? ri : oi)(this, e);
  };
}
function $r(e, t) {
  var n = ii(e + "");
  if (arguments.length < 2) {
    for (var i = Jt(this.node()), s = -1, o = n.length; ++s < o; ) if (!i.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Ir : t ? _r : xr)(n, t));
}
function br() {
  this.textContent = "";
}
function kr(e) {
  return function() {
    this.textContent = e;
  };
}
function Er(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Sr(e) {
  return arguments.length ? this.each(e == null ? br : (typeof e == "function" ? Er : kr)(e)) : this.node().textContent;
}
function Ar() {
  this.innerHTML = "";
}
function Cr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Mr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Nr(e) {
  return arguments.length ? this.each(e == null ? Ar : (typeof e == "function" ? Mr : Cr)(e)) : this.node().innerHTML;
}
function Tr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Pr() {
  return this.each(Tr);
}
function Rr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Or() {
  return this.each(Rr);
}
function Lr(e) {
  var t = typeof e == "function" ? e : jn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Dr() {
  return null;
}
function Ur(e, t) {
  var n = typeof e == "function" ? e : jn(e), i = t == null ? Dr : typeof t == "function" ? t : Qt(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function zr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Hr() {
  return this.each(zr);
}
function qr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Vr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Wr(e) {
  return this.select(e ? Vr : qr);
}
function Fr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Kr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Br(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Gr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, s = t.length, o; n < s; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Yr(e, t, n) {
  return function() {
    var i = this.__on, s, o = Kr(t);
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
function Xr(e, t, n) {
  var i = Br(e + ""), s, o = i.length, r;
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
  for (a = t ? Yr : Gr, s = 0; s < o; ++s) this.each(a(i[s], t, n));
  return this;
}
function ai(e, t, n) {
  var i = ni(e), s = i.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = i.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Zr(e, t) {
  return function() {
    return ai(this, e, t);
  };
}
function jr(e, t) {
  return function() {
    return ai(this, e, t.apply(this, arguments));
  };
}
function Qr(e, t) {
  return this.each((typeof t == "function" ? jr : Zr)(e, t));
}
function* Jr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length, r; s < o; ++s)
      (r = i[s]) && (yield r);
}
var di = [null];
function Q(e, t) {
  this._groups = e, this._parents = t;
}
function et() {
  return new Q([[document.documentElement]], di);
}
function eo() {
  return this;
}
Q.prototype = et.prototype = {
  constructor: Q,
  select: Es,
  selectAll: Ms,
  selectChild: Rs,
  selectChildren: Us,
  filter: zs,
  data: Ks,
  enter: Hs,
  exit: Gs,
  join: Ys,
  merge: Xs,
  selection: eo,
  order: Zs,
  sort: js,
  call: Js,
  nodes: er,
  node: tr,
  size: nr,
  empty: ir,
  each: sr,
  attr: ur,
  style: mr,
  property: yr,
  classed: $r,
  text: Sr,
  html: Nr,
  raise: Pr,
  lower: Or,
  append: Lr,
  insert: Ur,
  remove: Hr,
  clone: Wr,
  datum: Fr,
  on: Xr,
  dispatch: Qr,
  [Symbol.iterator]: Jr
};
function se(e) {
  return typeof e == "string" ? new Q([[document.querySelector(e)]], [document.documentElement]) : new Q([[e]], di);
}
function to(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ye(e, t) {
  if (e = to(e), t === void 0 && (t = e.currentTarget), t) {
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
var no = { value: () => {
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
function io(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
dt.prototype = en.prototype = {
  constructor: dt,
  on: function(e, t) {
    var n = this._, i = io(e + "", n), s, o = -1, r = i.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = i[o]).type) && (s = so(n[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = i[o]).type) n[s] = yn(n[s], e.name, t);
      else if (t == null) for (s in n) n[s] = yn(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new dt(e);
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
function so(e, t) {
  for (var n = 0, i = e.length, s; n < i; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function yn(e, t, n) {
  for (var i = 0, s = e.length; i < s; ++i)
    if (e[i].name === t) {
      e[i] = no, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Dt = { capture: !0, passive: !1 };
function Ut(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ro(e) {
  var t = e.document.documentElement, n = se(e).on("dragstart.drag", Ut, Dt);
  "onselectstart" in t ? n.on("selectstart.drag", Ut, Dt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function oo(e, t) {
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
var Xe = 0.7, mt = 1 / Xe, Me = "\\s*([+-]?\\d+)\\s*", Ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", re = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ao = /^#([0-9a-f]{3,8})$/, lo = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), co = new RegExp(`^rgb\\(${re},${re},${re}\\)$`), uo = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ze}\\)$`), ho = new RegExp(`^rgba\\(${re},${re},${re},${Ze}\\)$`), fo = new RegExp(`^hsl\\(${Ze},${re},${re}\\)$`), po = new RegExp(`^hsla\\(${Ze},${re},${re},${Ze}\\)$`), _n = {
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
  formatHex8: mo,
  formatHsl: go,
  formatRgb: In,
  toString: In
});
function xn() {
  return this.rgb().formatHex();
}
function mo() {
  return this.rgb().formatHex8();
}
function go() {
  return ci(this).formatHsl();
}
function In() {
  return this.rgb().formatRgb();
}
function je(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = ao.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? $n(t) : n === 3 ? new j(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? nt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? nt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = lo.exec(e)) ? new j(t[1], t[2], t[3], 1) : (t = co.exec(e)) ? new j(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = uo.exec(e)) ? nt(t[1], t[2], t[3], t[4]) : (t = ho.exec(e)) ? nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = fo.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, 1) : (t = po.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, t[4]) : _n.hasOwnProperty(e) ? $n(_n[e]) : e === "transparent" ? new j(NaN, NaN, NaN, 0) : null;
}
function $n(e) {
  return new j(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function nt(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new j(e, t, n, i);
}
function wo(e) {
  return e instanceof tt || (e = je(e)), e ? (e = e.rgb(), new j(e.r, e.g, e.b, e.opacity)) : new j();
}
function zt(e, t, n, i) {
  return arguments.length === 1 ? wo(e) : new j(e, t, n, i ?? 1);
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
  formatHex8: vo,
  formatRgb: kn,
  toString: kn
}));
function bn() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}`;
}
function vo() {
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
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), o = Math.max(t, n, i), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (n - i) / a + (n < i) * 6 : n === o ? r = (i - t) / a + 2 : r = (t - n) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new te(r, a, d, e.opacity);
}
function yo(e, t, n, i) {
  return arguments.length === 1 ? ci(e) : new te(e, t, n, i ?? 1);
}
function te(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
tn(te, yo, li(tt, {
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
function _o(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function xo(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function Io(e) {
  return (e = +e) == 1 ? hi : function(t, n) {
    return n - t ? xo(t, n, e) : ui(isNaN(t) ? n : t);
  };
}
function hi(e, t) {
  var n = t - e;
  return n ? _o(e, n) : ui(isNaN(e) ? t : e);
}
const An = (function e(t) {
  var n = Io(t);
  function i(s, o) {
    var r = n((s = zt(s)).r, (o = zt(o)).r), a = n(s.g, o.g), d = n(s.b, o.b), l = hi(s.opacity, o.opacity);
    return function(c) {
      return s.r = r(c), s.g = a(c), s.b = d(c), s.opacity = l(c), s + "";
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
function $o(e) {
  return function() {
    return e;
  };
}
function bo(e) {
  return function(t) {
    return e(t) + "";
  };
}
function ko(e, t) {
  var n = Ht.lastIndex = Tt.lastIndex = 0, i, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (i = Ht.exec(e)) && (s = Tt.exec(t)); )
    (o = s.index) > n && (o = t.slice(n, o), a[r] ? a[r] += o : a[++r] = o), (i = i[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: me(i, s) })), n = Tt.lastIndex;
  return n < t.length && (o = t.slice(n), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? bo(d[0].x) : $o(t) : (t = d.length, function(l) {
    for (var c = 0, f; c < t; ++c) a[(f = d[c]).i] = f.x(l);
    return a.join("");
  });
}
var Cn = 180 / Math.PI, qt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function fi(e, t, n, i, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * n + t * i) && (n -= e * d, i -= t * d), (a = Math.sqrt(n * n + i * i)) && (n /= a, i /= a, d /= a), e * i < t * n && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * Cn,
    skewX: Math.atan(d) * Cn,
    scaleX: r,
    scaleY: a
  };
}
var st;
function Eo(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? qt : fi(t.a, t.b, t.c, t.d, t.e, t.f);
}
function So(e) {
  return e == null || (st || (st = document.createElementNS("http://www.w3.org/2000/svg", "g")), st.setAttribute("transform", e), !(e = st.transform.baseVal.consolidate())) ? qt : (e = e.matrix, fi(e.a, e.b, e.c, e.d, e.e, e.f));
}
function pi(e, t, n, i) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, c, f, p, g, x) {
    if (l !== f || c !== p) {
      var v = g.push("translate(", null, t, null, n);
      x.push({ i: v - 4, x: me(l, f) }, { i: v - 2, x: me(c, p) });
    } else (f || p) && g.push("translate(" + f + t + p + n);
  }
  function r(l, c, f, p) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), p.push({ i: f.push(s(f) + "rotate(", null, i) - 2, x: me(l, c) })) : c && f.push(s(f) + "rotate(" + c + i);
  }
  function a(l, c, f, p) {
    l !== c ? p.push({ i: f.push(s(f) + "skewX(", null, i) - 2, x: me(l, c) }) : c && f.push(s(f) + "skewX(" + c + i);
  }
  function d(l, c, f, p, g, x) {
    if (l !== f || c !== p) {
      var v = g.push(s(g) + "scale(", null, ",", null, ")");
      x.push({ i: v - 4, x: me(l, f) }, { i: v - 2, x: me(c, p) });
    } else (f !== 1 || p !== 1) && g.push(s(g) + "scale(" + f + "," + p + ")");
  }
  return function(l, c) {
    var f = [], p = [];
    return l = e(l), c = e(c), o(l.translateX, l.translateY, c.translateX, c.translateY, f, p), r(l.rotate, c.rotate, f, p), a(l.skewX, c.skewX, f, p), d(l.scaleX, l.scaleY, c.scaleX, c.scaleY, f, p), l = c = null, function(g) {
      for (var x = -1, v = p.length, y; ++x < v; ) f[(y = p[x]).i] = y.x(g);
      return f.join("");
    };
  };
}
var Ao = pi(Eo, "px, ", "px)", "deg)"), Co = pi(So, ", ", ")", ")"), Mo = 1e-12;
function Mn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function No(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function To(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Po = (function e(t, n, i) {
  function s(o, r) {
    var a = o[0], d = o[1], l = o[2], c = r[0], f = r[1], p = r[2], g = c - a, x = f - d, v = g * g + x * x, y, h;
    if (v < Mo)
      h = Math.log(p / l) / t, y = function(z) {
        return [
          a + z * g,
          d + z * x,
          l * Math.exp(t * z * h)
        ];
      };
    else {
      var I = Math.sqrt(v), E = (p * p - l * l + i * v) / (2 * l * n * I), M = (p * p - l * l - i * v) / (2 * p * n * I), T = Math.log(Math.sqrt(E * E + 1) - E), P = Math.log(Math.sqrt(M * M + 1) - M);
      h = (P - T) / t, y = function(z) {
        var F = z * h, R = Mn(T), u = l / (n * I) * (R * To(t * F + T) - No(T));
        return [
          a + u * g,
          d + u * x,
          l * R / Mn(t * F + T)
        ];
      };
    }
    return y.duration = h * 1e3 * t / Math.SQRT2, y;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Re = 0, Ue = 0, Le = 0, mi = 1e3, wt, ze, vt = 0, Ee = 0, It = 0, Qe = typeof performance == "object" && performance.now ? performance : Date, gi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function nn() {
  return Ee || (gi(Ro), Ee = Qe.now() + It);
}
function Ro() {
  Ee = 0;
}
function yt() {
  this._call = this._time = this._next = null;
}
yt.prototype = wi.prototype = {
  constructor: yt,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? nn() : +n) + (t == null ? 0 : +t), !this._next && ze !== this && (ze ? ze._next = this : wt = this, ze = this), this._call = e, this._time = n, Vt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vt());
  }
};
function wi(e, t, n) {
  var i = new yt();
  return i.restart(e, t, n), i;
}
function Oo() {
  nn(), ++Re;
  for (var e = wt, t; e; )
    (t = Ee - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Re;
}
function Nn() {
  Ee = (vt = Qe.now()) + It, Re = Ue = 0;
  try {
    Oo();
  } finally {
    Re = 0, Do(), Ee = 0;
  }
}
function Lo() {
  var e = Qe.now(), t = e - vt;
  t > mi && (It -= t, vt = e);
}
function Do() {
  for (var e, t = wt, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : wt = n);
  ze = e, Vt(i);
}
function Vt(e) {
  if (!Re) {
    Ue && (Ue = clearTimeout(Ue));
    var t = e - Ee;
    t > 24 ? (e < 1 / 0 && (Ue = setTimeout(Nn, e - Qe.now() - It)), Le && (Le = clearInterval(Le))) : (Le || (vt = Qe.now(), Le = setInterval(Lo, mi)), Re = 1, gi(Nn));
  }
}
function Tn(e, t, n) {
  var i = new yt();
  return t = t == null ? 0 : +t, i.restart((s) => {
    i.stop(), e(s + t);
  }, t, n), i;
}
var Uo = en("start", "end", "cancel", "interrupt"), zo = [], vi = 0, Pn = 1, Wt = 2, lt = 3, Rn = 4, Ft = 5, ct = 6;
function $t(e, t, n, i, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (n in r) return;
  Ho(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Uo,
    tween: zo,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: vi
  });
}
function sn(e, t) {
  var n = ne(e, t);
  if (n.state > vi) throw new Error("too late; already scheduled");
  return n;
}
function oe(e, t) {
  var n = ne(e, t);
  if (n.state > lt) throw new Error("too late; already running");
  return n;
}
function ne(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Ho(e, t, n) {
  var i = e.__transition, s;
  i[t] = n, n.timer = wi(o, 0, n.time);
  function o(l) {
    n.state = Pn, n.timer.restart(r, n.delay, n.time), n.delay <= l && r(l - n.delay);
  }
  function r(l) {
    var c, f, p, g;
    if (n.state !== Pn) return d();
    for (c in i)
      if (g = i[c], g.name === n.name) {
        if (g.state === lt) return Tn(r);
        g.state === Rn ? (g.state = ct, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete i[c]) : +c < t && (g.state = ct, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete i[c]);
      }
    if (Tn(function() {
      n.state === lt && (n.state = Rn, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = Wt, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Wt) {
      for (n.state = lt, s = new Array(p = n.tween.length), c = 0, f = -1; c < p; ++c)
        (g = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (s[++f] = g);
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
  var n = e.__transition, i, s, o = !0, r;
  if (n) {
    t = t == null ? null : t + "";
    for (r in n) {
      if ((i = n[r]).name !== t) {
        o = !1;
        continue;
      }
      s = i.state > Wt && i.state < Ft, i.state = ct, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[r];
    }
    o && delete e.__transition;
  }
}
function qo(e) {
  return this.each(function() {
    ut(this, e);
  });
}
function Vo(e, t) {
  var n, i;
  return function() {
    var s = oe(this, e), o = s.tween;
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
function Wo(e, t, n) {
  var i, s;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = oe(this, e), r = o.tween;
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
function Fo(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = ne(this.node(), n).tween, s = 0, o = i.length, r; s < o; ++s)
      if ((r = i[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Vo : Wo)(n, e, t));
}
function rn(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var s = oe(this, i);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return ne(s, i).value[t];
  };
}
function yi(e, t) {
  var n;
  return (typeof t == "number" ? me : t instanceof je ? An : (n = je(t)) ? (t = n, An) : ko)(e, t);
}
function Ko(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Bo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Go(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function Yo(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function Xo(e, t, n) {
  var i, s, o;
  return function() {
    var r, a = n(this), d;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), d = a + "", r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a)));
  };
}
function Zo(e, t, n) {
  var i, s, o;
  return function() {
    var r, a = n(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), d = a + "", r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a)));
  };
}
function jo(e, t) {
  var n = xt(e), i = n === "transform" ? Co : yi;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Zo : Xo)(n, i, rn(this, "attr." + e, t)) : t == null ? (n.local ? Bo : Ko)(n) : (n.local ? Yo : Go)(n, i, t));
}
function Qo(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Jo(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function ea(e, t) {
  var n, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Jo(e, o)), n;
  }
  return s._value = t, s;
}
function ta(e, t) {
  var n, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Qo(e, o)), n;
  }
  return s._value = t, s;
}
function na(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = xt(e);
  return this.tween(n, (i.local ? ea : ta)(i, t));
}
function ia(e, t) {
  return function() {
    sn(this, e).delay = +t.apply(this, arguments);
  };
}
function sa(e, t) {
  return t = +t, function() {
    sn(this, e).delay = t;
  };
}
function ra(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ia : sa)(t, e)) : ne(this.node(), t).delay;
}
function oa(e, t) {
  return function() {
    oe(this, e).duration = +t.apply(this, arguments);
  };
}
function aa(e, t) {
  return t = +t, function() {
    oe(this, e).duration = t;
  };
}
function da(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? oa : aa)(t, e)) : ne(this.node(), t).duration;
}
function la(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    oe(this, e).ease = t;
  };
}
function ca(e) {
  var t = this._id;
  return arguments.length ? this.each(la(t, e)) : ne(this.node(), t).ease;
}
function ua(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    oe(this, e).ease = n;
  };
}
function ha(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ua(this._id, e));
}
function fa(e) {
  typeof e != "function" && (e = Jn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new he(i, this._parents, this._name, this._id);
}
function pa(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, s = n.length, o = Math.min(i, s), r = new Array(i), a = 0; a < o; ++a)
    for (var d = t[a], l = n[a], c = d.length, f = r[a] = new Array(c), p, g = 0; g < c; ++g)
      (p = d[g] || l[g]) && (f[g] = p);
  for (; a < i; ++a)
    r[a] = t[a];
  return new he(r, this._parents, this._name, this._id);
}
function ma(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function ga(e, t, n) {
  var i, s, o = ma(t) ? sn : oe;
  return function() {
    var r = o(this, e), a = r.on;
    a !== i && (s = (i = a).copy()).on(t, n), r.on = s;
  };
}
function wa(e, t) {
  var n = this._id;
  return arguments.length < 2 ? ne(this.node(), n).on.on(e) : this.each(ga(n, e, t));
}
function va(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function ya() {
  return this.on("end.remove", va(this._id));
}
function _a(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Qt(e));
  for (var i = this._groups, s = i.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = i[r], d = a.length, l = o[r] = new Array(d), c, f, p = 0; p < d; ++p)
      (c = a[p]) && (f = e.call(c, c.__data__, p, a)) && ("__data__" in c && (f.__data__ = c.__data__), l[p] = f, $t(l[p], t, n, p, l, ne(c, n)));
  return new he(o, this._parents, t, n);
}
function xa(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Qn(e));
  for (var i = this._groups, s = i.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = i[a], l = d.length, c, f = 0; f < l; ++f)
      if (c = d[f]) {
        for (var p = e.call(c, c.__data__, f, d), g, x = ne(c, n), v = 0, y = p.length; v < y; ++v)
          (g = p[v]) && $t(g, t, n, v, p, x);
        o.push(p), r.push(c);
      }
  return new he(o, r, t, n);
}
var Ia = et.prototype.constructor;
function $a() {
  return new Ia(this._groups, this._parents);
}
function ba(e, t) {
  var n, i, s;
  return function() {
    var o = Pe(this, e), r = (this.style.removeProperty(e), Pe(this, e));
    return o === r ? null : o === n && r === i ? s : s = t(n = o, i = r);
  };
}
function _i(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ka(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = Pe(this, e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function Ea(e, t, n) {
  var i, s, o;
  return function() {
    var r = Pe(this, e), a = n(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Pe(this, e))), r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a));
  };
}
function Sa(e, t) {
  var n, i, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = oe(this, e), l = d.on, c = d.value[o] == null ? a || (a = _i(t)) : void 0;
    (l !== n || s !== c) && (i = (n = l).copy()).on(r, s = c), d.on = i;
  };
}
function Aa(e, t, n) {
  var i = (e += "") == "transform" ? Ao : yi;
  return t == null ? this.styleTween(e, ba(e, i)).on("end.style." + e, _i(e)) : typeof t == "function" ? this.styleTween(e, Ea(e, i, rn(this, "style." + e, t))).each(Sa(this._id, e)) : this.styleTween(e, ka(e, i, t), n).on("end.style." + e, null);
}
function Ca(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function Ma(e, t, n) {
  var i, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && Ca(e, r, n)), i;
  }
  return o._value = t, o;
}
function Na(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, Ma(e, t, n ?? ""));
}
function Ta(e) {
  return function() {
    this.textContent = e;
  };
}
function Pa(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Ra(e) {
  return this.tween("text", typeof e == "function" ? Pa(rn(this, "text", e)) : Ta(e == null ? "" : e + ""));
}
function Oa(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function La(e) {
  var t, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && Oa(s)), t;
  }
  return i._value = e, i;
}
function Da(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, La(e));
}
function Ua() {
  for (var e = this._name, t = this._id, n = xi(), i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      if (d = r[l]) {
        var c = ne(d, t);
        $t(d, e, n, l, r, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new he(i, this._parents, e, n);
}
function za() {
  var e, t, n = this, i = n._id, s = n.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    n.each(function() {
      var l = oe(this, i), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), l.on = t;
    }), s === 0 && o();
  });
}
var Ha = 0;
function he(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function xi() {
  return ++Ha;
}
var le = et.prototype;
he.prototype = {
  constructor: he,
  select: _a,
  selectAll: xa,
  selectChild: le.selectChild,
  selectChildren: le.selectChildren,
  filter: fa,
  merge: pa,
  selection: $a,
  transition: Ua,
  call: le.call,
  nodes: le.nodes,
  node: le.node,
  size: le.size,
  empty: le.empty,
  each: le.each,
  on: wa,
  attr: jo,
  attrTween: na,
  style: Aa,
  styleTween: Na,
  text: Ra,
  textTween: Da,
  remove: ya,
  tween: Fo,
  delay: ra,
  duration: da,
  ease: ca,
  easeVarying: ha,
  end: za,
  [Symbol.iterator]: le[Symbol.iterator]
};
function qa(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Va = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: qa
};
function Wa(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Fa(e) {
  var t, n;
  e instanceof he ? (t = e._id, e = e._name) : (t = xi(), (n = Va).time = nn(), e = e == null ? null : e + "");
  for (var i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && $t(d, e, t, l, r, n || Wa(d, t));
  return new he(i, this._parents, e, t);
}
et.prototype.interrupt = qo;
et.prototype.transition = Fa;
const rt = (e) => () => e;
function Ka(e, {
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
function Ba(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ga() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function On() {
  return this.__zoom || Ve;
}
function Ya(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Xa() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Za(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], r = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function ja() {
  var e = Ba, t = Ga, n = Za, i = Ya, s = Xa, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Po, l = en("start", "zoom", "end"), c, f, p, g = 500, x = 150, v = 0, y = 10;
  function h(m) {
    m.property("__zoom", On).on("wheel.zoom", F, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", u).filter(s).on("touchstart.zoom", w).on("touchmove.zoom", b).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  h.transform = function(m, $, _, S) {
    var N = m.selection ? m.selection() : m;
    N.property("__zoom", On), m !== N ? T(m, $, _, S) : N.interrupt().each(function() {
      P(this, arguments).event(S).start().zoom(null, typeof $ == "function" ? $.apply(this, arguments) : $).end();
    });
  }, h.scaleBy = function(m, $, _, S) {
    h.scaleTo(m, function() {
      var N = this.__zoom.k, D = typeof $ == "function" ? $.apply(this, arguments) : $;
      return N * D;
    }, _, S);
  }, h.scaleTo = function(m, $, _, S) {
    h.transform(m, function() {
      var N = t.apply(this, arguments), D = this.__zoom, H = _ == null ? M(N) : typeof _ == "function" ? _.apply(this, arguments) : _, V = D.invert(H), K = typeof $ == "function" ? $.apply(this, arguments) : $;
      return n(E(I(D, K), H, V), N, r);
    }, _, S);
  }, h.translateBy = function(m, $, _, S) {
    h.transform(m, function() {
      return n(this.__zoom.translate(
        typeof $ == "function" ? $.apply(this, arguments) : $,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), t.apply(this, arguments), r);
    }, null, S);
  }, h.translateTo = function(m, $, _, S, N) {
    h.transform(m, function() {
      var D = t.apply(this, arguments), H = this.__zoom, V = S == null ? M(D) : typeof S == "function" ? S.apply(this, arguments) : S;
      return n(Ve.translate(V[0], V[1]).scale(H.k).translate(
        typeof $ == "function" ? -$.apply(this, arguments) : -$,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), D, r);
    }, S, N);
  };
  function I(m, $) {
    return $ = Math.max(o[0], Math.min(o[1], $)), $ === m.k ? m : new ue($, m.x, m.y);
  }
  function E(m, $, _) {
    var S = $[0] - _[0] * m.k, N = $[1] - _[1] * m.k;
    return S === m.x && N === m.y ? m : new ue(m.k, S, N);
  }
  function M(m) {
    return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
  }
  function T(m, $, _, S) {
    m.on("start.zoom", function() {
      P(this, arguments).event(S).start();
    }).on("interrupt.zoom end.zoom", function() {
      P(this, arguments).event(S).end();
    }).tween("zoom", function() {
      var N = this, D = arguments, H = P(N, D).event(S), V = t.apply(N, D), K = _ == null ? M(V) : typeof _ == "function" ? _.apply(N, D) : _, ie = Math.max(V[1][0] - V[0][0], V[1][1] - V[0][1]), Y = N.__zoom, J = typeof $ == "function" ? $.apply(N, D) : $, ae = d(Y.invert(K).concat(ie / Y.k), J.invert(K).concat(ie / J.k));
      return function(ee) {
        if (ee === 1) ee = J;
        else {
          var de = ae(ee), bt = ie / de[2];
          ee = new ue(bt, K[0] - de[0] * bt, K[1] - de[1] * bt);
        }
        H.zoom(null, ee);
      };
    });
  }
  function P(m, $, _) {
    return !_ && m.__zooming || new z(m, $);
  }
  function z(m, $) {
    this.that = m, this.args = $, this.active = 0, this.sourceEvent = null, this.extent = t.apply(m, $), this.taps = 0;
  }
  z.prototype = {
    event: function(m) {
      return m && (this.sourceEvent = m), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(m, $) {
      return this.mouse && m !== "mouse" && (this.mouse[1] = $.invert(this.mouse[0])), this.touch0 && m !== "touch" && (this.touch0[1] = $.invert(this.touch0[0])), this.touch1 && m !== "touch" && (this.touch1[1] = $.invert(this.touch1[0])), this.that.__zoom = $, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(m) {
      var $ = se(this.that).datum();
      l.call(
        m,
        this.that,
        new Ka(m, {
          sourceEvent: this.sourceEvent,
          target: h,
          transform: this.that.__zoom,
          dispatch: l
        }),
        $
      );
    }
  };
  function F(m, ...$) {
    if (!e.apply(this, arguments)) return;
    var _ = P(this, $).event(m), S = this.__zoom, N = Math.max(o[0], Math.min(o[1], S.k * Math.pow(2, i.apply(this, arguments)))), D = ye(m);
    if (_.wheel)
      (_.mouse[0][0] !== D[0] || _.mouse[0][1] !== D[1]) && (_.mouse[1] = S.invert(_.mouse[0] = D)), clearTimeout(_.wheel);
    else {
      if (S.k === N) return;
      _.mouse = [D, S.invert(D)], ut(this), _.start();
    }
    De(m), _.wheel = setTimeout(H, x), _.zoom("mouse", n(E(I(S, N), _.mouse[0], _.mouse[1]), _.extent, r));
    function H() {
      _.wheel = null, _.end();
    }
  }
  function R(m, ...$) {
    if (p || !e.apply(this, arguments)) return;
    var _ = m.currentTarget, S = P(this, $, !0).event(m), N = se(m.view).on("mousemove.zoom", K, !0).on("mouseup.zoom", ie, !0), D = ye(m, _), H = m.clientX, V = m.clientY;
    ro(m.view), Pt(m), S.mouse = [D, this.__zoom.invert(D)], ut(this), S.start();
    function K(Y) {
      if (De(Y), !S.moved) {
        var J = Y.clientX - H, ae = Y.clientY - V;
        S.moved = J * J + ae * ae > v;
      }
      S.event(Y).zoom("mouse", n(E(S.that.__zoom, S.mouse[0] = ye(Y, _), S.mouse[1]), S.extent, r));
    }
    function ie(Y) {
      N.on("mousemove.zoom mouseup.zoom", null), oo(Y.view, S.moved), De(Y), S.event(Y).end();
    }
  }
  function u(m, ...$) {
    if (e.apply(this, arguments)) {
      var _ = this.__zoom, S = ye(m.changedTouches ? m.changedTouches[0] : m, this), N = _.invert(S), D = _.k * (m.shiftKey ? 0.5 : 2), H = n(E(I(_, D), S, N), t.apply(this, $), r);
      De(m), a > 0 ? se(this).transition().duration(a).call(T, H, S, m) : se(this).call(h.transform, H, S, m);
    }
  }
  function w(m, ...$) {
    if (e.apply(this, arguments)) {
      var _ = m.touches, S = _.length, N = P(this, $, m.changedTouches.length === S).event(m), D, H, V, K;
      for (Pt(m), H = 0; H < S; ++H)
        V = _[H], K = ye(V, this), K = [K, this.__zoom.invert(K), V.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== K[2] && (N.touch1 = K, N.taps = 0) : (N.touch0 = K, D = !0, N.taps = 1 + !!c);
      c && (c = clearTimeout(c)), D && (N.taps < 2 && (f = K[0], c = setTimeout(function() {
        c = null;
      }, g)), ut(this), N.start());
    }
  }
  function b(m, ...$) {
    if (this.__zooming) {
      var _ = P(this, $).event(m), S = m.changedTouches, N = S.length, D, H, V, K;
      for (De(m), D = 0; D < N; ++D)
        H = S[D], V = ye(H, this), _.touch0 && _.touch0[2] === H.identifier ? _.touch0[0] = V : _.touch1 && _.touch1[2] === H.identifier && (_.touch1[0] = V);
      if (H = _.that.__zoom, _.touch1) {
        var ie = _.touch0[0], Y = _.touch0[1], J = _.touch1[0], ae = _.touch1[1], ee = (ee = J[0] - ie[0]) * ee + (ee = J[1] - ie[1]) * ee, de = (de = ae[0] - Y[0]) * de + (de = ae[1] - Y[1]) * de;
        H = I(H, Math.sqrt(ee / de)), V = [(ie[0] + J[0]) / 2, (ie[1] + J[1]) / 2], K = [(Y[0] + ae[0]) / 2, (Y[1] + ae[1]) / 2];
      } else if (_.touch0) V = _.touch0[0], K = _.touch0[1];
      else return;
      _.zoom("touch", n(E(H, V, K), _.extent, r));
    }
  }
  function k(m, ...$) {
    if (this.__zooming) {
      var _ = P(this, $).event(m), S = m.changedTouches, N = S.length, D, H;
      for (Pt(m), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, g), D = 0; D < N; ++D)
        H = S[D], _.touch0 && _.touch0[2] === H.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === H.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (H = ye(H, this), Math.hypot(f[0] - H[0], f[1] - H[1]) < y)) {
        var V = se(this).on("dblclick.zoom");
        V && V.apply(this, arguments);
      }
    }
  }
  return h.wheelDelta = function(m) {
    return arguments.length ? (i = typeof m == "function" ? m : rt(+m), h) : i;
  }, h.filter = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : rt(!!m), h) : e;
  }, h.touchable = function(m) {
    return arguments.length ? (s = typeof m == "function" ? m : rt(!!m), h) : s;
  }, h.extent = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : rt([[+m[0][0], +m[0][1]], [+m[1][0], +m[1][1]]]), h) : t;
  }, h.scaleExtent = function(m) {
    return arguments.length ? (o[0] = +m[0], o[1] = +m[1], h) : [o[0], o[1]];
  }, h.translateExtent = function(m) {
    return arguments.length ? (r[0][0] = +m[0][0], r[1][0] = +m[1][0], r[0][1] = +m[0][1], r[1][1] = +m[1][1], h) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, h.constrain = function(m) {
    return arguments.length ? (n = m, h) : n;
  }, h.duration = function(m) {
    return arguments.length ? (a = +m, h) : a;
  }, h.interpolate = function(m) {
    return arguments.length ? (d = m, h) : d;
  }, h.on = function() {
    var m = l.on.apply(l, arguments);
    return m === l ? h : m;
  }, h.clickDistance = function(m) {
    return arguments.length ? (v = (m = +m) * m, h) : Math.sqrt(v);
  }, h.tapDistance = function(m) {
    return arguments.length ? (y = +m, h) : y;
  }, h;
}
var Qa = Object.defineProperty, Ja = Object.getOwnPropertyDescriptor, Z = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ja(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && Qa(t, n, s), s;
};
function ed(e, t, n, i) {
  const s = t.x - e.x, o = t.y - e.y, r = i.x - n.x, a = i.y - n.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const l = ((n.x - e.x) * a - (n.y - e.y) * r) / d, c = ((n.x - e.x) * o - (n.y - e.y) * s) / d;
  return l <= 0.02 || l >= 0.98 || c <= 0.02 || c >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * o, t: l };
}
function td(e, t, n) {
  const i = n.x - t.x, s = n.y - t.y, o = i * i + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * s) / o)), a = t.x + r * i, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function nd(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, l = (r.y - o.y) / a, c = t.map(([p, g]) => ed(o, r, p, g)).filter((p) => p !== null).filter((p) => p.t * a > n + 2 && (1 - p.t) * a > n + 2).sort((p, g) => p.t - g.t);
    let f = -1 / 0;
    for (const p of c)
      p.t * a - n <= f + 2 || (i += ` L ${p.x - d * n} ${p.y - l * n}`, i += ` A ${n} ${n} 0 0 1 ${p.x + d * n} ${p.y + l * n}`, f = p.t * a + n);
    i += ` L ${r.x} ${r.y}`;
  }
  return i;
}
const ot = {
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
let G = class extends $e {
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
    this._zoomBehavior = ja().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const s = Math.min(...t.map((c) => c.x - c.w / 2)) - e, o = Math.max(...t.map((c) => c.x + c.w / 2)) + e, r = Math.min(...t.map((c) => c.y - c.h / 2)) - e, a = Math.max(...t.map((c) => c.y + c.h / 2)) + e, d = Math.max(0.15, Math.min(i.width / (o - s), i.height / (a - r), 1.25)), l = Ve.translate(i.width / 2 - d * (s + o) / 2, i.height / 2 - d * (r + a) / 2).scale(d);
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((v) => v.parentId === t.id), d = Math.min(...a.map((v) => v.x - v.w / 2)), l = Math.max(...a.map((v) => v.x + v.w / 2)), c = Math.min(...a.map((v) => v.y - v.h / 2)), f = Math.max(...a.map((v) => v.y + v.h / 2)), p = Ii(
      a.map((v) => ({ dx: v.x - r.x, dy: v.y - r.y, w: v.w, h: v.h })),
      { w: s, h: o }
    ), g = (v) => {
      const y = this.toScene(v);
      if (v.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(p.w, 2 * Math.abs(y.x - r.x)),
          h: Math.max(p.h, 2 * Math.abs(y.y - r.y))
        };
        return;
      }
      const h = r.x - n * r.w / 2, I = r.y - i * r.h / 2, E = n > 0 ? Math.max(y.x, h + s, a.length ? l + 10 : -1 / 0) : Math.min(y.x, h - s, a.length ? d - 10 : 1 / 0), M = i > 0 ? Math.max(y.y, I + o, a.length ? f + 10 : -1 / 0) : Math.min(y.y, I - o, a.length ? c - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (h + E) / 2,
        y: (I + M) / 2,
        w: Math.abs(E - h),
        h: Math.abs(M - I)
      };
    }, x = () => {
      window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", x), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", g), window.addEventListener("pointerup", x);
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
        const f = Math.hypot(l.x - d.x, l.y - d.y) || 1, p = -(l.y - d.y) / f * c, g = (l.x - d.x) / f * c;
        d = { x: d.x + p, y: d.y + g }, l = { x: l.x + p, y: l.y + g };
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
      const { dist: s } = td(t, e[i], e[i + 1]);
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
        <path d=${nd(t, n)}
              fill="none"
              stroke=${i} stroke-width=${o ? 3 : 1.6}
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
      var g;
      const p = ((g = this._selectedWaypoint) == null ? void 0 : g.edgeId) === e.id && this._selectedWaypoint.index === f;
      return O`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${p ? 6 : 5}
                        fill=${p ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(x) => {
        x.button === 0 && (x.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: f }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], f));
      }}
                        @dblclick=${(x) => {
        x.stopPropagation(), this.removeWaypoint(e, f);
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
    var p, g;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((p = this._resize) == null ? void 0 : p.id) === e.id ? this._resize.w : e.w, d = ((g = this._resize) == null ? void 0 : g.id) === e.id ? this._resize.h : e.h, l = a / 2, c = d / 2, f = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return O`
      <g data-node-id=${e.id} transform="translate(${t}, ${n})"
         @pointerdown=${(x) => this.onNodePointerDown(x, e)}
         @dblclick=${(x) => {
      x.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        <rect x=${-l} y=${-c} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? O`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? O`<text x=${-l} y=${-c - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && ot[e.symbol] && !r ? O`<g transform="translate(${l - 17}, ${-c + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${ot[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && ot[e.symbol] ? O`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${ot[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? O`
              <foreignObject x=${-l + 6} y=${o ? -c + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(x) => x.stopPropagation()}
                  @keydown=${(x) => {
      x.stopPropagation(), x.key === "Enter" && this.commitRename(e, x.target.value), x.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(x) => this.commitRename(e, x.target.value)}
                />
              </foreignObject>` : r ? O`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${f}</text>` : o ? O`<text x=${-l + 12} y=${-c + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : O`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? O`<line x1=${-l + 8} y1=${-c + 28} x2=${l - 8} y2=${-c + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "workflow-step") ? [
      [l, 0],
      [-l, 0],
      [0, c],
      [0, -c]
    ].map(
      ([x, v]) => O`
                <circle data-handle cx=${x} cy=${v} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(y) => this.onHandlePointerDown(y, e)}>
                  <title>${r ? e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado: el actor lo usará (deriva una UI)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso: el agente lo consumirá por MCP" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([x, v]) => O`
                <rect data-resize x=${x * l - 6.5} y=${v * c - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${x * v > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(y) => this.onResizePointerDown(y, e, x, v)}>
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
    const i = (o) => {
      const r = this.toScene(o);
      !n && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (n = !0, this._rubber = { a: t, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", i), window.removeEventListener("pointerup", s), n && this._rubber) {
        const { a: o, b: r } = this._rubber, a = Math.min(o.x, r.x), d = Math.max(o.x, r.x), l = Math.min(o.y, r.y), c = Math.max(o.y, r.y), f = this.scene.nodes.filter((p) => {
          const g = this.nodePos(p);
          return g.x >= a && g.x <= d && g.y >= l && g.y <= c;
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
    const n = Math.min(...t.map((r) => r.x - r.w / 2)) - e, i = Math.max(...t.map((r) => r.x + r.w / 2)) + e, s = Math.min(...t.map((r) => r.y - r.h / 2)) - e, o = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: n, minY: s, w: i - n, h: o - s };
  }
  centerViewportOn(e, t) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), s = this._t.k, o = Ve.translate(i.width / 2 - s * e, i.height / 2 - s * t).scale(s);
    se(n).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - i.left) / n, o = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return C``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return C`
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
      if (!a) return O``;
      const d = this.renderEdge(r, a, [...t]);
      for (let l = 0; l < a.length - 1; l++) t.push([a[l], a[l + 1]]);
      return d;
    }), i = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (i.has(r.sourceId) || i.has(r.targetId) ? o : s).push(
        n[a]
      );
    }), C`
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
      (r) => O`
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
G.styles = Yt`
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
], G.prototype, "scene", 2);
Z([
  pe({ attribute: !1 })
], G.prototype, "selectedId", 2);
Z([
  pe({ attribute: !1 })
], G.prototype, "selectedIds", 2);
Z([
  pe({ type: Boolean })
], G.prototype, "connectable", 2);
Z([
  pe({ attribute: !1 })
], G.prototype, "edgePoints", 2);
Z([
  A()
], G.prototype, "_t", 2);
Z([
  A()
], G.prototype, "_dragPos", 2);
Z([
  A()
], G.prototype, "_pendingLink", 2);
Z([
  A()
], G.prototype, "_hoverNodeId", 2);
Z([
  A()
], G.prototype, "_editingId", 2);
Z([
  A()
], G.prototype, "_spaceDown", 2);
Z([
  A()
], G.prototype, "_wpDrag", 2);
Z([
  A()
], G.prototype, "_selectedWaypoint", 2);
Z([
  A()
], G.prototype, "_resize", 2);
Z([
  A()
], G.prototype, "_rubber", 2);
G = Z([
  jt("modux-canvas")
], G);
const U = {
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
const Ae = (e) => e.trim().toLowerCase();
function id(e, t) {
  var R;
  const n = { nodes: /* @__PURE__ */ new Map(), edges: [] }, i = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((w) => ({ ...w, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((w) => w.id))
  ), d = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((w) => ({ ...w, moduleId: u.id, application: !1 }))
  ), l = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((w) => ({ ...w, moduleId: u.id, application: !0 }))
  ), c = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((w) => ({ ...w, moduleId: u.id }))
  );
  for (const u of s)
    ce(n, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: U.command.w,
      h: U.command.h,
      kind: "use-case",
      symbol: "gear",
      fill: U.command.fill,
      stroke: U.command.stroke,
      badge: "COMANDO",
      tooltip: `${u.name} — caso de uso de ${i.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of r)
    ce(n, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: U.aggregate.w,
      h: U.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: U.aggregate.fill,
      stroke: U.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${u.name} — agregado de ${i.get(u.moduleId) ?? u.moduleId}`
    });
  const f = /* @__PURE__ */ new Map();
  for (const u of [...d, ...l])
    ce(n, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: U.event.w,
      h: U.event.h,
      kind: u.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: U.event.fill,
      stroke: U.event.stroke,
      badge: u.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${u.name} — evento de ${i.get(u.moduleId) ?? u.moduleId}`
    }), f.set(Ae(u.name), u.id);
  const p = (u) => {
    if (!u || !u.trim()) return null;
    const w = f.get(Ae(u));
    if (w) return w;
    const b = `evname:${Ae(u)}`;
    return ce(n, {
      id: b,
      label: u,
      x: 0,
      y: 0,
      w: U.event.w,
      h: U.event.h,
      kind: "event-name",
      symbol: "event",
      fill: U.event.fill,
      stroke: U.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${u} — referenciado por nombre, sin evento declarado en el catálogo`
    }), b;
  }, g = (u) => {
    const w = c.find((k) => k.id === u.id) ?? c.find((k) => u.name && Ae(k.name) === Ae(u.name)), b = (w == null ? void 0 : w.id) ?? (u.id || (u.name ? `rm:${Ae(u.name)}` : null));
    return b ? (ce(n, {
      id: b,
      label: (w == null ? void 0 : w.name) ?? u.name ?? b,
      x: 0,
      y: 0,
      w: U.readModel.w,
      h: U.readModel.h,
      kind: w ? "read-model" : "derived-read-model",
      fill: U.readModel.fill,
      stroke: U.readModel.stroke,
      dashed: !w,
      badge: "READ MODEL"
    }), b) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const w = (e.actors ?? []).find((b) => b.id === u.actorId);
    w && (ce(n, {
      id: w.id,
      label: w.name,
      x: 0,
      y: 0,
      w: U.actor.w,
      h: U.actor.h,
      kind: "actor",
      symbol: "person",
      fill: U.actor.fill,
      stroke: U.actor.stroke,
      badge: "ACTOR"
    }), X(n, {
      id: `es-actor:${w.id}->${u.targetId}`,
      sourceId: w.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  const x = (u) => {
    const w = e.externalSystems.find((b) => b.id === u);
    return w ? (ce(n, {
      id: w.id,
      label: w.name,
      x: 0,
      y: 0,
      w: U.external.w,
      h: U.external.h,
      kind: "external-system",
      symbol: "component",
      fill: U.external.fill,
      stroke: U.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), w.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const w = x(u.externalSystemId);
    !w || !o.has(u.useCaseId) || X(n, {
      id: `es-extin:${w}->${u.useCaseId}`,
      sourceId: w,
      targetId: u.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const u of e.externalUseCaseCalls ?? []) {
    if (!o.has(u.sourceId)) continue;
    const w = e.externalSystems.find(
      (m) => (m.useCases ?? []).some(($) => $.id === u.targetId)
    ), b = w ? x(w.id) : null;
    if (!b) continue;
    const k = (R = ((w == null ? void 0 : w.useCases) ?? []).find((m) => m.id === u.targetId)) == null ? void 0 : R.name;
    X(n, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: b,
      kind: "es-command-external",
      label: k,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: k ? `Llama a ${k} del sistema externo` : void 0
    });
  }
  for (const u of e.aggregateCalls ?? [])
    !o.has(u.sourceId) || !n.nodes.has(u.targetId) || X(n, {
      id: `es-write:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: u.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const v = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const u of v)
    !n.nodes.has(u.domainEventId) || !(n.nodes.has(u.sourceId) && (o.has(u.sourceId) || r.some((b) => b.id === u.sourceId) || a.has(u.sourceId))) || X(n, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const y = (u, w, b, k, m, $) => (ce(n, {
    id: u,
    label: w,
    x: 0,
    y: 0,
    w: U.policy.w,
    h: U.policy.h,
    kind: b,
    symbol: "flow",
    fill: U.policy.fill,
    stroke: U.policy.stroke,
    badge: k,
    tooltip: m
  }), u), h = (u, w) => {
    const b = p(u);
    b && X(n, {
      id: `es-trigger:${b}->${w}`,
      sourceId: b,
      targetId: w,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, I = (u, w) => {
    !w || !o.has(w) || X(n, {
      id: `es-invoke:${u}->${w}`,
      sourceId: u,
      targetId: w,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const w = y(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    h(u.eventName, w);
    for (const b of u.actions ?? []) {
      if (b.type === "CallUseCase" && I(w, b.useCaseId), b.type === "StartSaga" && b.sagaId) {
        const k = `saga:${b.sagaId}`;
        y(k, b.sagaId, "saga", "SAGA"), X(n, {
          id: `es-saga:${w}->${k}`,
          sourceId: w,
          targetId: k,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (b.type === "UpdateProjection" && b.projectionId) {
        const k = (e.projections ?? []).find((m) => m.id === b.projectionId);
        k && X(n, {
          id: `es-feeds:${w}->${k.id}`,
          sourceId: w,
          targetId: k.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const w = y(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const k of u.handledEventIds) {
      const m = n.nodes.has(k) ? k : null;
      m && X(n, {
        id: `es-trigger:${m}->${w}`,
        sourceId: m,
        targetId: w,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    const b = g({ id: u.readModelId, name: u.readModelName });
    b && X(n, {
      id: `es-projects:${w}->${b}`,
      sourceId: w,
      targetId: b,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const b = p(u.triggerEvent), k = g({ name: u.readModelName ?? `${u.triggerEvent}View` });
      b && k && X(n, {
        id: `es-mat:${u.id}`,
        sourceId: b,
        targetId: k,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const w = y(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (h(u.triggerEvent, w), I(w, u.targetUseCaseId), !u.targetUseCaseId) {
      const b = x(u.targetId), k = b ?? `tgt:${u.targetId}`;
      !b && i.has(u.targetId) && ce(n, {
        id: k,
        label: i.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: U.module.w,
        h: U.module.h,
        kind: "module",
        symbol: "component",
        fill: U.module.fill,
        stroke: U.module.stroke,
        badge: "CONTEXTO"
      }), n.nodes.has(k) && X(n, {
        id: `es-deliver:${u.id}`,
        sourceId: w,
        targetId: k,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const w = y(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    h(u.triggerEvent, w);
    for (const k of u.steps) I(w, k.useCaseId);
    const b = p(u.onCompletionEventName);
    b && X(n, {
      id: `es-done:${u.id}`,
      sourceId: w,
      targetId: b,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const w = y(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    h(u.triggerEvent, w);
    for (const k of u.steps ?? []) {
      I(w, k.targetUseCaseId);
      for (const m of [k.emittedEventName, k.completionEventName]) {
        const $ = p(m);
        $ && X(n, {
          id: `es-wfemit:${u.id}:${$}`,
          sourceId: w,
          targetId: $,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const b = p(u.onCompletionEventName);
    b && X(n, {
      id: `es-done:${u.id}`,
      sourceId: w,
      targetId: b,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const E = [...n.nodes.values()], M = /* @__PURE__ */ new Map();
  for (const u of n.edges)
    M.has(u.targetId) || M.set(u.targetId, []), M.get(u.targetId).push(u.sourceId);
  const T = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set(), z = (u) => {
    const w = T.get(u);
    if (w !== void 0) return w;
    if (P.has(u)) return 0;
    P.add(u);
    const b = M.get(u) ?? [], k = b.length ? 1 + Math.max(...b.map(z)) : 0;
    return P.delete(u), T.set(u, k), k;
  }, F = /* @__PURE__ */ new Map();
  for (const u of E) {
    const w = t[u.id];
    if (w) {
      u.x = w.x, u.y = w.y;
      continue;
    }
    const b = z(u.id), k = F.get(b) ?? 0;
    F.set(b, k + 1), u.x = 140 + b * 260, u.y = 110 + k * 110;
  }
  return { nodes: E, edges: n.edges };
}
const sd = 190, rd = 56, Ln = 180, od = 56, ad = 150, dd = 44, Dn = 250, Un = 100;
function ld(e, t) {
  const n = /* @__PURE__ */ new Set(), i = (s) => {
    if (n.has(s.id)) return 0;
    n.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(i)) : 0;
    return n.delete(s.id), r;
  };
  return i(e);
}
function cd(e, t) {
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
function ud(e, t) {
  const n = [], i = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var d;
    return (d = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === a)) == null ? void 0 : d.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var y;
    const d = new Map(a.steps.map((h) => [h.id, h])), l = new Map(a.steps.map((h) => [h.id, ld(h, d)])), c = /* @__PURE__ */ new Map();
    for (const h of a.steps) {
      const I = l.get(h.id) ?? 0;
      c.set(I, (c.get(I) ?? 0) + 1);
    }
    const f = Math.max(1, ...c.values()), p = cd(e, a);
    if (p && !s.has(p.id)) {
      s.add(p.id);
      const h = t[p.id] ?? { x: 140, y: r };
      n.push({
        id: p.id,
        label: p.label,
        x: h.x,
        y: h.y,
        w: ad,
        h: dd,
        kind: p.kind,
        symbol: p.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: p.kind === "aggregate" ? "AGGREGATE" : p.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const g = t[a.id] ?? { x: 420, y: r };
    n.push({
      id: a.id,
      label: a.name,
      x: g.x,
      y: g.y,
      w: sd,
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
    const x = /* @__PURE__ */ new Map();
    let v = 0;
    for (const h of a.steps) {
      const I = l.get(h.id) ?? 0;
      v = Math.max(v, I);
      const E = x.get(I) ?? 0;
      x.set(I, E + 1);
      const M = t[h.id] ?? {
        x: g.x + (I + 1) * Dn,
        y: r + (E - (c.get(I) - 1) / 2) * Un
      }, T = o(h.targetUseCaseId);
      n.push({
        id: h.id,
        label: h.name,
        x: M.x,
        y: M.y,
        w: Ln,
        h: od,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: T ? `→ ${T}` : "∅ sin use case",
        tooltip: `${h.name}${h.emittedEventName ? ` · emite ${h.emittedEventName}` : ""}${T ? ` · lanza ${T}` : ""}${h.completionEventName ? ` · espera ${h.completionEventName}` : ""}`
      });
      const P = (h.dependsOnStepIds ?? []).filter((z) => d.has(z));
      P.length === 0 && i.push({
        id: `wfs:${a.id}:${h.id}`,
        sourceId: a.id,
        targetId: h.id,
        kind: "workflow-start",
        label: h.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const z of P)
        i.push({
          id: `wfdep:${z}->${h.id}`,
          sourceId: z,
          targetId: h.id,
          kind: "workflow-dependency",
          label: h.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${h.name} espera a ${((y = d.get(z)) == null ? void 0 : y.name) ?? z}`
        });
    }
    if (a.onCompletionEventName) {
      const h = `done:${a.id}`, I = t[h] ?? { x: g.x + (v + 2) * Dn, y: r };
      n.push({
        id: h,
        label: a.onCompletionEventName,
        x: I.x,
        y: I.y,
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
          targetId: h,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || i.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: h,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, f + 1) * Un + 60;
  }), { nodes: n, edges: i };
}
async function hd(e, t) {
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
var fd = Object.defineProperty, pd = Object.getOwnPropertyDescriptor, q = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? pd(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && fd(t, n, s), s;
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
}, md = Object.keys(Kt), gd = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], wd = ["CORE", "SUPPORTING", "GENERIC"], W = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
function yd(e, t) {
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
    const { id: t, x: n, y: i } = e.detail, s = this._view, o = this.viewLayout(s), r = o.nodes[t] ?? null;
    let a = { x: n, y: i };
    const d = this.sceneFor(s), l = d.nodes.find((f) => f.id === t);
    if (l != null && l.parentId) {
      const f = d.nodes.find((p) => p.id === l.parentId);
      f && (a = { x: n - f.x, y: i - f.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const c = [{ kind: "move-node", view: s, id: t, pos: r }];
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
    const { id: t, x: n, y: i, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((f) => f.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((c = a.sizes) == null ? void 0 : c[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...d.map((f) => ({ kind: "move-node", view: r, id: f.id, pos: a.nodes[f.id] ?? null }))
    ]);
    const l = { ...a.nodes, [t]: { x: n, y: i } };
    for (const f of d) l[f.id] = { x: f.x - n, y: f.y - i };
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
    const n = on(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
    if (this._view === "workflows") {
      const v = this.owningWorkflowOf(t), y = this.owningWorkflowOf(n);
      if (!v || v !== y || t === n) return;
      const h = v.steps.find((I) => I.id === n);
      if (((h == null ? void 0 : h.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: v.id,
        id: n,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (o.has(t)) {
      new Set(
        this.model.modules.flatMap((y) => (y.useCases ?? []).map((h) => h.id))
      ).has(n) && ((this.model.agentUses ?? []).some(
        (h) => h.agentId === t && h.useCaseId === n
      ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: n }));
      return;
    }
    if (o.has(n)) return;
    const r = new Set((this.model.actors ?? []).map((v) => v.id));
    if (r.has(t)) {
      const v = new Set(
        this.model.modules.flatMap((h) => (h.useCases ?? []).map((I) => I.id))
      ), y = new Set(
        this.model.modules.flatMap((h) => (h.queryServices ?? []).map((I) => I.id))
      );
      if (v.has(n) || y.has(n)) {
        (this.model.actorUses ?? []).some(
          (I) => I.actorId === t && I.targetId === n
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: n });
        return;
      }
      if ((this.model.aggregates ?? []).some((h) => h.id === n)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: n });
        return;
      }
      return;
    }
    const a = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((y) => y.id))
    ), d = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((y) => y.id))
    ]), l = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((y) => y.id))
    ), c = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((y) => y.id))), f = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((y) => y.id))
    );
    if (c.has(t) && f.has(n)) {
      (this.model.queryCalls ?? []).some(
        (y) => y.sourceId === t && y.targetId === n
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: n });
      return;
    }
    const p = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((y) => y.id))
    );
    if (c.has(t) && p.has(n)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (y) => y.sourceId === t && y.targetId === n
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: n });
      return;
    }
    if (c.has(t) && c.has(n) && t !== n) {
      (this.model.useCaseCalls ?? []).some(
        (y) => y.sourceId === t && y.targetId === n
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: n });
      return;
    }
    if (d.has(t) && a.has(n) || c.has(t) && l.has(n)) {
      (this.model.emissions ?? []).some(
        (y) => y.sourceId === t && y.domainEventId === n
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: n });
      return;
    }
    if (a.has(t) || l.has(t)) {
      const v = l.has(t), y = this.model.modules.flatMap((u) => (v ? u.applicationEvents : u.domainEvents) ?? []).find((u) => u.id === t), h = this.model.modules.flatMap((u) => (u.useCases ?? []).map((w) => ({ u: w, module: u }))).find(({ u }) => u.id === n), I = this.model.modules.flatMap((u) => (u.readModels ?? []).map((w) => ({ rm: w, module: u }))).find(({ rm: u }) => u.id === n), E = this.model.modules.find((u) => u.id === n) ?? (I == null ? void 0 : I.module) ?? (h == null ? void 0 : h.module);
      if (!y || !E) return;
      const M = new Set((this.model.aggregates ?? []).map((u) => u.id)), T = new Set(
        this.model.modules.flatMap((u) => (u.domainServices ?? []).map((w) => w.id))
      ), P = (this.model.emissions ?? []).find(
        (u) => u.domainEventId === t && (v ? c.has(u.sourceId) : M.has(u.sourceId) || T.has(u.sourceId))
      );
      if (!P) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${y.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${y.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const z = !v && M.has(P.sourceId);
      if (h) {
        if (this.model.flows.some(
          (w) => w.archetype === "TRIGGERS" && w.triggerEvent === y.name && w.targetUseCaseId === h.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${W(y.name)}-${W(h.u.name)}`,
          name: h.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: z ? P.sourceId : "",
          triggerDomainServiceId: !v && !z ? P.sourceId : void 0,
          triggerUseCaseId: v ? P.sourceId : void 0,
          triggerEvent: y.name,
          targetId: E.id,
          targetUseCaseId: h.u.id
        });
        return;
      }
      const F = (I == null ? void 0 : I.rm.name) ?? `${y.name}View`;
      if (this.model.flows.some(
        (u) => u.archetype === "MATERIALIZES" && u.triggerEvent === y.name && u.targetId === E.id && u.readModelName === F
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${W(y.name)}-${W(F)}`,
        name: F,
        archetype: "MATERIALIZES",
        triggerAggregateId: z ? P.sourceId : "",
        triggerDomainServiceId: !v && !z ? P.sourceId : void 0,
        triggerUseCaseId: v ? P.sourceId : void 0,
        triggerEvent: y.name,
        targetId: E.id,
        readModelName: F
      });
      return;
    }
    const g = /* @__PURE__ */ new Set([
      ...d,
      ...c,
      ...f,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((y) => y.id))
    ]);
    if (g.has(t) || g.has(n) || a.has(n) || l.has(n))
      return;
    const x = new Set(this.model.externalSystems.map((v) => v.id));
    if (x.has(t)) {
      new Set(
        this.model.modules.flatMap((y) => (y.useCases ?? []).map((h) => h.id))
      ).has(n) && ((this.model.externalCalls ?? []).some(
        (h) => h.externalSystemId === t && h.useCaseId === n
      ) || this.command({ kind: "add-external-call", sourceId: t, targetId: n }));
      return;
    }
    x.has(n) || r.has(n);
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
      const o = this.owningWorkflowOf(s[2]);
      if (!o) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: o.id,
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
      id: `step-${W(e)}`,
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
      id: `wfstep-${W(e)}`,
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${W(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
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
    const t = e.detail.kind === "process-step" ? yd(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : vd(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, n, i, s, o, r, a, d, l, c, f, p, g, x, v, y, h, I, E, M, T, P, z, F;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${W(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: W(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${W(e)}`, name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const R = (t = this.model.modules.find((w) => w.id === this._selectedId)) == null ? void 0 : t.id, u = this._newModuleId || R || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!u) return;
          this.command({ kind: "add-domain-event", id: `ev-${W(e)}`, name: e, moduleId: u });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const R = (i = this.model.modules.find((w) => w.id === this._selectedId)) == null ? void 0 : i.id, u = this._newModuleId || R || ((s = this.model.modules[0]) == null ? void 0 : s.id);
          if (!u) return;
          this.command({ kind: "add-application-event", id: `aev-${W(e)}`, name: e, moduleId: u });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const R = (o = this.model.modules.find((w) => w.id === this._selectedId)) == null ? void 0 : o.id, u = this._newModuleId || R || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!u) return;
          this.command({ kind: "add-domain-service", id: `ds-${W(e)}`, name: e, moduleId: u });
        } else if (this._detail === "detail" && this._newContextMapKind === "query-service") {
          const R = (a = this.model.modules.find((w) => w.id === this._selectedId)) == null ? void 0 : a.id, u = this._newModuleId || R || ((d = this.model.modules[0]) == null ? void 0 : d.id);
          if (!u) return;
          this.command({ kind: "add-query-service", id: `qs-${W(e)}`, name: e, moduleId: u });
        } else if (this._detail === "detail" && this._newContextMapKind === "use-case") {
          const R = (l = this.model.modules.find((w) => w.id === this._selectedId)) == null ? void 0 : l.id, u = this._newModuleId || R || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!u) return;
          this.command({ kind: "add-use-case", id: `uc-${W(e)}`, name: e, moduleId: u });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-use-case") {
          const R = (f = this.model.externalSystems.find((w) => w.id === this._selectedId)) == null ? void 0 : f.id, u = this._newExternalId || R || ((p = this.model.externalSystems[0]) == null ? void 0 : p.id);
          if (!u) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${W(e)}`,
            name: e,
            moduleId: u
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const R = (g = (this.model.aggregates ?? []).find((w) => w.id === this._selectedId)) == null ? void 0 : g.id, u = this._newAggregateId || R || ((v = (x = this.model.aggregates) == null ? void 0 : x[0]) == null ? void 0 : v.id);
          if (!u) return;
          this.command({ kind: "add-read-model", id: `rm-${W(e)}`, name: e, aggregateId: u });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${W(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const R = this._newModuleId || ((y = this.model.modules[0]) == null ? void 0 : y.id);
        if (!R) return;
        this.command({ kind: "add-aggregate", id: `agg-${W(e)}`, name: e, moduleId: R });
      } else if (this._view === "flows") {
        const R = this._newTriggerAggId || ((I = (h = this.model.aggregates) == null ? void 0 : h[0]) == null ? void 0 : I.id), u = this._newTargetId || ((E = this.model.modules[0]) == null ? void 0 : E.id), w = this._newTriggerEvent.trim();
        if (!R || !u || !w) return;
        this.command({
          kind: "add-flow",
          id: `flow-${W(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: R,
          triggerEvent: w,
          targetId: u
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const R = this._newModuleId || ((M = this.model.modules[0]) == null ? void 0 : M.id);
        if (!R) return;
        this.command({
          kind: "add-process",
          id: `proc-${W(e)}`,
          name: e,
          moduleId: R,
          triggerAggregateId: this._newTriggerAggId || ((P = (T = this.model.aggregates) == null ? void 0 : T[0]) == null ? void 0 : P.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${W(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((F = (z = this.model.aggregates) == null ? void 0 : z[0]) == null ? void 0 : F.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), n = this.filteredModel();
    return e === "aggregates" ? Fi(n, t.nodes) : e === "flows" ? Ji(n, t.nodes) : e === "processes" ? on(n, t.nodes) : e === "workflows" ? ud(n, t.nodes) : e === "eventstorming" ? id(n, t.nodes) : Di(n, t.nodes, this._detail === "detail", t.sizes ?? {});
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((l) => !l.parentId), i = new Set(n.map((l) => l.id)), s = {
      nodes: n,
      edges: t.edges.filter((l) => i.has(l.sourceId) && i.has(l.targetId))
    }, r = await hd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    return C`
      <div class="toolbar">
        <div class="tabs">
          ${gd.map(
      (t) => C`
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
      (t) => C`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        <div class="spacer"></div>
        ${this._multi.length ? C`
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
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : "Nuevo read model…",
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
        ${this._view === "context-map" ? C`<select
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
              ${this._detail === "detail" ? C`
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
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "external-use-case" ? C`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var n;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((n = this.model.externalSystems[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "read-model" ? C`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? C`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${wd.map(
      (t) => C`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case") ? C`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var n;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? C`
              ${this._view === "flows" ? C`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => C`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return C`<option
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
              ${this._view === "flows" ? C`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var n;
        return C`<option
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? C`
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
      (t) => C`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? C`<input
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
              ${this.owningProcessOf(this._selectedId) ? C`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? C`
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
      (t) => C`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? C`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => C`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._view === "context-map" ? C`Arrastra para reordenar · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? C`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? C`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : C`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return C`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${md.map(
      (i) => C`
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
q([
  pe({ attribute: !1 })
], L.prototype, "model", 2);
q([
  pe({ attribute: !1 })
], L.prototype, "layout", 2);
q([
  A()
], L.prototype, "_view", 2);
q([
  A()
], L.prototype, "_detail", 2);
q([
  A()
], L.prototype, "_relationType", 2);
q([
  A()
], L.prototype, "_relationPicker", 2);
q([
  A()
], L.prototype, "_selectedId", 2);
q([
  A()
], L.prototype, "_newName", 2);
q([
  A()
], L.prototype, "_newSubdomain", 2);
q([
  A()
], L.prototype, "_newModuleId", 2);
q([
  A()
], L.prototype, "_newContextMapKind", 2);
q([
  A()
], L.prototype, "_newAggregateId", 2);
q([
  A()
], L.prototype, "_newExternalId", 2);
q([
  A()
], L.prototype, "_newArchetype", 2);
q([
  A()
], L.prototype, "_newTriggerAggId", 2);
q([
  A()
], L.prototype, "_newTriggerEvent", 2);
q([
  A()
], L.prototype, "_newTargetId", 2);
q([
  A()
], L.prototype, "_undoStack", 2);
q([
  A()
], L.prototype, "_redoStack", 2);
q([
  A()
], L.prototype, "_newStepName", 2);
q([
  A()
], L.prototype, "_newStepType", 2);
q([
  A()
], L.prototype, "_newStepRole", 2);
q([
  A()
], L.prototype, "_newStepDeadline", 2);
q([
  A()
], L.prototype, "_editStepRole", 2);
q([
  A()
], L.prototype, "_editStepDeadline", 2);
q([
  A()
], L.prototype, "_editStepComp", 2);
q([
  A()
], L.prototype, "_newStepUseCase", 2);
q([
  A()
], L.prototype, "_newStepEmits", 2);
q([
  A()
], L.prototype, "_editStepUseCase", 2);
q([
  A()
], L.prototype, "_editStepEmits", 2);
q([
  A()
], L.prototype, "_editStepAwaits", 2);
q([
  A()
], L.prototype, "_multi", 2);
q([
  A()
], L.prototype, "_newViewName", 2);
q([
  A()
], L.prototype, "_activeViewId", 2);
L = q([
  jt("modux-editor")
], L);
var _d = Object.defineProperty, xd = Object.getOwnPropertyDescriptor, Se = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? xd(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && _d(t, n, s), s;
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
    return this._error ? C`<div class="status error">modux editor: ${this._error}</div>` : this._model ? C`
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(e) => this.showToast(e.detail.message, e.detail.kind ?? "info")}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? C`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : C`<div class="status">Cargando el modelo…</div>`;
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
  A()
], fe.prototype, "_model", 2);
Se([
  A()
], fe.prototype, "_layout", 2);
Se([
  A()
], fe.prototype, "_error", 2);
Se([
  A()
], fe.prototype, "_saving", 2);
Se([
  A()
], fe.prototype, "_toast", 2);
fe = Se([
  jt("modux-editor-connected")
], fe);
export {
  Id as CONTAINER_HEADER,
  $d as CONTAINER_INSET,
  G as ModuxCanvas,
  L as ModuxEditor,
  fe as ModuxEditorConnected,
  Fi as aggregatesScene,
  $i as containerFit,
  Ii as containerMinSize,
  Di as contextMapScene,
  Ni as flowCoherence,
  Ji as flowsScene,
  bi as normalizeViewLayout,
  on as processesScene,
  Mi as relationEdgeId
};
