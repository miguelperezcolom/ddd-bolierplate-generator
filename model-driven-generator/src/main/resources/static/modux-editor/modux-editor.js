const $d = 34, kd = 10;
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
function ki(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const bi = {
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
}, Pt = 168, Ot = 56, Hn = 34, qn = 14, Ai = 14, Ke = 108, We = 32, Vn = 12, Kn = 10, Fe = 2, Ci = Fe * Ke + (Fe - 1) * Vn + 2 * qn;
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
function nt(e, t) {
  const n = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const Ti = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Ri = {
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
function Oi(e) {
  const t = Math.max(1, Math.ceil(e / Fe)), n = t * We + (t - 1) * Kn;
  return { w: Ci, h: Hn + n + Ai };
}
function Li(e, t) {
  const n = e % Fe, i = Math.floor(e / Fe);
  return {
    x: -t.w / 2 + qn + n * (Ke + Vn) + Ke / 2,
    y: -t.h / 2 + Hn + i * (We + Kn) + We / 2
  };
}
function Ui(e, t, n, i, s, o) {
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
  return a.length ? Wn(n, i, a, s, o) : [{ ...i, x: n.x, y: n.y, w: Pt, h: Ot }];
}
function Wn(e, t, n, i, s) {
  const o = s[t.id] ?? Oi(n.length), r = n.map((c, p) => i[c.id] ?? Li(p, o)), a = $i(
    e,
    o,
    r.map((c) => ({ dx: c.x, dy: c.y, w: Ke, h: We }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, l = n.map((c, p) => {
    const m = r[p], y = c.policy ? Ti : Ri[c.kind];
    return {
      id: c.id,
      label: c.name,
      kind: c.kind,
      x: e.x + m.x,
      y: e.y + m.y,
      w: Ke,
      h: We,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${c.policy ? "Policy" : Pi[c.kind]} ${c.name}`
    };
  });
  return [d, ...l];
}
function Di(e, t, n = !1, i = {}) {
  const s = [
    ...e.modules.map((h) => ({ ref: h, external: !1 })),
    ...e.externalSystems.map((h) => ({ ref: h, external: !0 }))
  ], o = s.flatMap((h, R) => {
    const N = t[h.ref.id] ?? nt(R, s.length);
    if (h.external) {
      const u = h.ref, g = {
        id: u.id,
        label: u.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${u.name} (sistema externo)`
      };
      return n && (u.useCases ?? []).length > 0 ? Wn(
        N,
        g,
        (u.useCases ?? []).map((_) => ({ id: _.id, name: _.name, kind: "external-use-case" })),
        t,
        i
      ) : [{ ...g, x: N.x, y: N.y, w: Pt, h: Ot }];
    }
    const H = h.ref, K = H.subdomainType ?? "GENERIC", W = {
      id: H.id,
      label: H.name,
      kind: "module",
      symbol: "component",
      fill: bi[K],
      stroke: "#94a3b8",
      badge: K,
      tooltip: `${H.name} — subdominio ${K}`
    };
    return n ? Ui(e, H, N, W, t, i) : [{ ...W, x: N.x, y: N.y, w: Pt, h: Ot }];
  }), r = s.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length;
  (e.actors ?? []).forEach((h, R) => {
    const N = t[h.id] ?? nt(s.length + R, r);
    o.push({
      id: h.id,
      label: h.name,
      x: N.x,
      y: N.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${h.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((h, R) => {
    const N = t[h.id] ?? nt(s.length + (e.actors ?? []).length + R, r);
    o.push({
      id: h.id,
      label: h.name,
      x: N.x,
      y: N.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${h.name} (agente de IA — consume por MCP)`
    });
  }), (e.rags ?? []).forEach((h, R) => {
    const N = t[h.id] ?? nt(
      s.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + R,
      r
    );
    o.push({
      id: h.id,
      label: h.name,
      x: N.x,
      y: N.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${h.name} (base de conocimiento — retrieval para agentes)`
    });
  }), o.sort((h, R) => (h.parentId ? 1 : 0) - (R.parentId ? 1 : 0));
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
    var u, g, _, f, I, v;
    const R = Ni(e, h), N = n ? e.modules.find((b) => b.id === h.sourceId) : void 0, H = ((u = N == null ? void 0 : N.domainEvents) == null ? void 0 : u.find((b) => b.name === h.triggerEvent)) ?? ((g = N == null ? void 0 : N.applicationEvents) == null ? void 0 : g.find((b) => b.name === h.triggerEvent)), K = n && h.readModelName ? (f = (_ = e.modules.find((b) => b.id === h.targetId)) == null ? void 0 : _.readModels) == null ? void 0 : f.find((b) => b.name === h.readModelName) : void 0, W = n && h.targetUseCaseId ? (v = (I = e.modules.find((b) => b.id === h.targetId)) == null ? void 0 : I.useCases) == null ? void 0 : v.find((b) => b.id === h.targetUseCaseId) : void 0;
    return {
      id: `flow:${h.id}`,
      sourceId: (H == null ? void 0 : H.id) ?? h.sourceId,
      targetId: (W == null ? void 0 : W.id) ?? (K == null ? void 0 : K.id) ?? h.targetId,
      kind: "flow",
      label: h.name,
      color: Si[R],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${h.name} [${h.archetype}] — ${R}`
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
  })) : [], p = n ? (e.projections ?? []).filter((h) => h.sourceAggregateId && h.readModelId).filter((h) => l.has(h.sourceAggregateId) && l.has(h.readModelId)).map((h) => ({
    id: `proj:${h.id}`,
    sourceId: h.sourceAggregateId,
    targetId: h.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: `Proyección ${h.name}: el estado del agregado se materializa en ${h.readModelName ?? h.readModelId}`
  })) : [], m = n ? (e.useCaseCalls ?? []).filter((h) => l.has(h.sourceId) && l.has(h.targetId)).map((h) => ({
    id: `uccall:${h.sourceId}->${h.targetId}`,
    sourceId: h.sourceId,
    targetId: h.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], y = n ? (e.queryCalls ?? []).filter((h) => l.has(h.sourceId) && l.has(h.targetId)).map((h) => ({
    id: `qscall:${h.sourceId}->${h.targetId}`,
    sourceId: h.sourceId,
    targetId: h.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], $ = n ? (e.actorUses ?? []).filter((h) => l.has(h.actorId) && l.has(h.targetId)).map((h) => ({
    id: `use:${h.actorId}->${h.targetId}`,
    sourceId: h.actorId,
    targetId: h.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], k = n ? (e.agentUses ?? []).filter((h) => l.has(h.agentId) && l.has(h.useCaseId)).map((h) => ({
    id: `mcp:${h.agentId}->${h.useCaseId}`,
    sourceId: h.agentId,
    targetId: h.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], A = (e.agentRags ?? []).filter((h) => l.has(h.agentId) && l.has(h.ragId)).map((h) => ({
    id: `agrag:${h.agentId}->${h.ragId}`,
    sourceId: h.agentId,
    targetId: h.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), w = n ? (e.rags ?? []).filter((h) => l.has(h.id)).flatMap(
    (h) => (h.sourceReadModelIds ?? []).filter((R) => l.has(R)).map((R) => ({
      id: `ragsrc:${h.id}->${R}`,
      sourceId: h.id,
      targetId: R,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${h.name} indexa este read model`
    }))
  ) : [], x = n ? (e.agentExternalUses ?? []).filter((h) => l.has(h.agentId) && l.has(h.externalUseCaseId)).map((h) => ({
    id: `mcpx:${h.agentId}->${h.externalUseCaseId}`,
    sourceId: h.agentId,
    targetId: h.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], E = n ? (e.externalCalls ?? []).filter((h) => l.has(h.externalSystemId) && l.has(h.useCaseId)).map((h) => ({
    id: `extcall:${h.externalSystemId}->${h.useCaseId}`,
    sourceId: h.externalSystemId,
    targetId: h.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], S = n ? (e.externalUseCaseCalls ?? []).filter((h) => l.has(h.sourceId) && l.has(h.targetId)).map((h) => ({
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
      ...p,
      ...m,
      ...y,
      ...$,
      ...k,
      ...x,
      ...A,
      ...w,
      ...E,
      ...S
    ]
  };
}
const zi = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Hi = 176, qi = 60, Vi = 140, Ki = 40;
function Wi(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    n.filter((d) => d.moduleId === s.id).forEach((d, l) => {
      const c = i.filter((m) => m.aggregateId === d.id).length, p = 140 + l * (170 + c * 60);
      t[d.id] = { x: r, y: p }, i.filter((m) => m.aggregateId === d.id).forEach((m, y) => {
        t[m.id] = { x: r + 60, y: p + 100 + y * 60 };
      });
    });
  }), n.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Fi(e, t) {
  const n = Wi(e), i = (l) => t[l] ?? n[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), o = (e.aggregates ?? []).map((l) => {
    const c = s.get(l.moduleId), p = (c == null ? void 0 : c.subdomainType) ?? "GENERIC", m = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: m.x,
      y: m.y,
      w: Hi,
      h: qi,
      kind: "aggregate",
      symbol: "aggregate",
      fill: zi[p],
      stroke: "#64748b",
      badge: c ? `${c.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${c ? ` — módulo ${c.name} (${p})` : ""}`
    };
  }), r = (e.entities ?? []).map((l) => {
    const c = i(l.id);
    return {
      id: l.id,
      label: l.name,
      x: c.x,
      y: c.y,
      w: Vi,
      h: Ki,
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
const Bi = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Gi = 150, Yi = 44, Xi = 190, ji = 56, Zi = 160, Qi = 48;
function Ji(e, t) {
  const n = e.externalSystems.find((s) => s.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function es(e, t) {
  const n = e.flows, i = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, l;
    return ((l = (d = e.aggregates) == null ? void 0 : d.find((c) => c.id === a)) == null ? void 0 : l.name) ?? a ?? "?";
  };
  return n.forEach((a, d) => {
    const l = 120 + d * 130, c = Bi[a.archetype] ?? "#475569", p = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(p)) {
      o.add(p);
      const A = t[p] ?? { x: 160, y: l };
      i.push({
        id: p,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : p,
        x: A.x,
        y: A.y,
        w: Gi,
        h: Yi,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const m = `flow:${a.id}`, y = t[m] ?? { x: 470, y: l };
    i.push({
      id: m,
      label: a.name,
      x: y.x,
      y: y.y,
      w: Xi,
      h: ji,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: c,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const $ = Ji(e, a), k = `tgt:${$.id}`;
    if (!o.has(k)) {
      o.add(k);
      const A = t[k] ?? { x: 790, y: l };
      i.push({
        id: k,
        label: $.label,
        x: A.x,
        y: A.y,
        w: Zi,
        h: Qi,
        kind: $.external ? "external-system" : "module",
        symbol: "component",
        fill: $.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: $.external,
        badge: $.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${a.id}:in`,
      sourceId: p,
      targetId: m,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: m,
      targetId: k,
      kind: "flow-delivery",
      color: c,
      arrow: !0
    });
  }), { nodes: i, edges: s };
}
const ts = 190, ns = 56, Et = 170, is = 52;
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
      w: ts,
      h: ns,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let l = o.id;
    if (o.steps.forEach((c, p) => {
      const m = c.type === "HUMAN", y = t[c.id] ?? { x: 150 + (p + 1) * 240, y: a };
      if (n.push({
        id: c.id,
        label: c.name,
        x: y.x,
        y: y.y,
        w: Et,
        h: is,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${c.roleId ? ` · ${c.roleId}` : ""}${c.deadline ? ` · ⏱ ${c.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${c.name}${c.useCaseId ? ` — use case ${c.useCaseId}` : ""}${c.deadline ? ` · deadline ${c.deadline}` : ""}`
      }), i.push({
        id: `pe:${o.id}:${p}`,
        sourceId: l,
        targetId: c.id,
        kind: "process-seq",
        label: p === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), c.compensationUseCaseId) {
        const $ = `comp:${c.id}`, k = t[$] ?? { x: y.x, y: y.y + 90 };
        n.push({
          id: $,
          label: c.compensationUseCaseId,
          x: k.x,
          y: k.y,
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
          targetId: $,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      l = c.id;
    }), o.onCompletionEventName) {
      const c = `done:${o.id}`, p = t[c] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      n.push({
        id: c,
        label: o.onCompletionEventName,
        x: p.x,
        y: p.y,
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
const dt = globalThis, Bt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gt = Symbol(), an = /* @__PURE__ */ new WeakMap();
let Fn = class {
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
const ss = (e) => new Fn(typeof e == "string" ? e : e + "", void 0, Gt), Yt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Fn(n, e, Gt);
}, rs = (e, t) => {
  if (Bt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), s = dt.litNonce;
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
const { is: os, defineProperty: as, getOwnPropertyDescriptor: ds, getOwnPropertyNames: ls, getOwnPropertySymbols: cs, getPrototypeOf: us } = Object, we = globalThis, ln = we.trustedTypes, hs = ln ? ln.emptyScript : "", St = we.reactiveElementPolyfillSupport, He = (e, t) => e, ft = { toAttribute(e, t) {
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
} }, Xt = (e, t) => !os(e, t), cn = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: Xt };
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
      s !== void 0 && as(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: s, set: o } = ds(this.prototype, t) ?? { get() {
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
    return rs(t, this.constructor.elementStyles), t;
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
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : ft).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : ft;
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
const qe = globalThis, un = (e) => e, pt = qe.trustedTypes, hn = pt ? pt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Bn = "$lit$", ge = `lit$${Math.random().toFixed(9).slice(2)}$`, Gn = "?" + ge, fs = `<${Gn}>`, be = document, Be = () => be.createComment(""), Ge = (e) => e === null || typeof e != "object" && typeof e != "function", jt = Array.isArray, ps = (e) => jt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", At = `[ 	
\f\r]`, Oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fn = /-->/g, pn = />/g, ye = RegExp(`>|${At}(?:([^\\s"'>=/]+)(${At}*=${At}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mn = /'/g, gn = /"/g, Yn = /^(?:script|style|textarea|title)$/i, Xn = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), P = Xn(1), L = Xn(2), Ne = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), wn = /* @__PURE__ */ new WeakMap(), _e = be.createTreeWalker(be, 129);
function jn(e, t) {
  if (!jt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hn !== void 0 ? hn.createHTML(t) : t;
}
const ms = (e, t) => {
  const n = e.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Oe;
  for (let a = 0; a < n; a++) {
    const d = e[a];
    let l, c, p = -1, m = 0;
    for (; m < d.length && (r.lastIndex = m, c = r.exec(d), c !== null); ) m = r.lastIndex, r === Oe ? c[1] === "!--" ? r = fn : c[1] !== void 0 ? r = pn : c[2] !== void 0 ? (Yn.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = ye) : c[3] !== void 0 && (r = ye) : r === ye ? c[0] === ">" ? (r = s ?? Oe, p = -1) : c[1] === void 0 ? p = -2 : (p = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? ye : c[3] === '"' ? gn : mn) : r === gn || r === mn ? r = ye : r === fn || r === pn ? r = Oe : (r = ye, s = void 0);
    const y = r === ye && e[a + 1].startsWith("/>") ? " " : "";
    o += r === Oe ? d + fs : p >= 0 ? (i.push(l), d.slice(0, p) + Bn + d.slice(p) + ge + y) : d + ge + (p === -2 ? a : y);
  }
  return [jn(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ye {
  constructor({ strings: t, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [l, c] = ms(t, n);
    if (this.el = Ye.createElement(l, i), _e.currentNode = this.el.content, n === 2 || n === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = _e.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(Bn)) {
          const m = c[r++], y = s.getAttribute(p).split(ge), $ = /([.?@])?(.*)/.exec(m);
          d.push({ type: 1, index: o, name: $[2], strings: y, ctor: $[1] === "." ? ws : $[1] === "?" ? ys : $[1] === "@" ? vs : xt }), s.removeAttribute(p);
        } else p.startsWith(ge) && (d.push({ type: 6, index: o }), s.removeAttribute(p));
        if (Yn.test(s.tagName)) {
          const p = s.textContent.split(ge), m = p.length - 1;
          if (m > 0) {
            s.textContent = pt ? pt.emptyScript : "";
            for (let y = 0; y < m; y++) s.append(p[y], Be()), _e.nextNode(), d.push({ type: 2, index: ++o });
            s.append(p[m], Be());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Gn) d.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(ge, p + 1)) !== -1; ) d.push({ type: 7, index: o }), p += ge.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const i = be.createElement("template");
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
    const { el: { content: n }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? be).importNode(n, !0);
    _e.currentNode = s;
    let o = _e.nextNode(), r = 0, a = 0, d = i[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let l;
        d.type === 2 ? l = new Je(o, o.nextSibling, this, t) : d.type === 1 ? l = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (l = new _s(o, this, t)), this._$AV.push(l), d = i[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = _e.nextNode(), r++);
    }
    return _e.currentNode = be, s;
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
    this.type = 2, this._$AH = G, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Te(this, t, n), Ge(t) ? t === G || t == null || t === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : t !== this._$AH && t !== Ne && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ps(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== G && Ge(this._$AH) ? this._$AA.nextSibling.data = t : this.T(be.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: n, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ye.createElement(jn(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(n);
    else {
      const r = new gs(s, this), a = r.u(this.options);
      r.p(n), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = wn.get(t.strings);
    return n === void 0 && wn.set(t.strings, n = new Ye(t)), n;
  }
  k(t) {
    jt(this._$AH) || (this._$AH = [], this._$AR());
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
class xt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, s, o) {
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = G;
  }
  _$AI(t, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Te(this, t, n, 0), r = !Ge(t) || t !== this._$AH && t !== Ne, r && (this._$AH = t);
    else {
      const a = t;
      let d, l;
      for (t = o[0], d = 0; d < o.length - 1; d++) l = Te(this, a[i + d], n, d), l === Ne && (l = this._$AH[d]), r || (r = !Ge(l) || l !== this._$AH[d]), l === G ? t = G : t !== G && (t += (l ?? "") + o[d + 1]), this._$AH[d] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ws extends xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === G ? void 0 : t;
  }
}
class ys extends xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== G);
  }
}
class vs extends xt {
  constructor(t, n, i, s, o) {
    super(t, n, i, s, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Te(this, t, n, 0) ?? G) === Ne) return;
    const i = this._$AH, s = t === G && i !== G || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== G && (i === G || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
const Ct = qe.litHtmlPolyfillSupport;
Ct == null || Ct(Ye, Je), (qe.litHtmlVersions ?? (qe.litHtmlVersions = [])).push("3.3.3");
const xs = (e, t, n) => {
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
const Zt = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: Xt }, $s = (e = Is, t, n) => {
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
  return (t, n) => typeof n == "object" ? $s(e, t, n) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(e) {
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
function It(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), yn.hasOwnProperty(t) ? { space: yn[t], local: e } : e;
}
function ks(e) {
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
function Zn(e) {
  var t = It(e);
  return (t.local ? bs : ks)(t);
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
    for (var o = t[s], r = o.length, a = i[s] = new Array(r), d, l, c = 0; c < r; ++c)
      (d = o[c]) && (l = e.call(d, d.__data__, c, o)) && ("__data__" in d && (l.__data__ = d.__data__), a[c] = l);
  return new Q(i, this._parents);
}
function As(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Cs() {
  return [];
}
function Qn(e) {
  return e == null ? Cs : function() {
    return this.querySelectorAll(e);
  };
}
function Ms(e) {
  return function() {
    return As(e.apply(this, arguments));
  };
}
function Ns(e) {
  typeof e == "function" ? e = Ms(e) : e = Qn(e);
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
var Ts = Array.prototype.find;
function Rs(e) {
  return function() {
    return Ts.call(this.children, e);
  };
}
function Ps() {
  return this.firstElementChild;
}
function Os(e) {
  return this.select(e == null ? Ps : Rs(typeof e == "function" ? e : ei(e)));
}
var Ls = Array.prototype.filter;
function Us() {
  return Array.from(this.children);
}
function Ds(e) {
  return function() {
    return Ls.call(this.children, e);
  };
}
function zs(e) {
  return this.selectAll(e == null ? Us : Ds(typeof e == "function" ? e : ei(e)));
}
function Hs(e) {
  typeof e != "function" && (e = Jn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new Q(i, this._parents);
}
function ti(e) {
  return new Array(e.length);
}
function qs() {
  return new Q(this._enter || this._groups.map(ti), this._parents);
}
function mt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
mt.prototype = {
  constructor: mt,
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
function Ks(e, t, n, i, s, o) {
  for (var r = 0, a, d = t.length, l = o.length; r < l; ++r)
    (a = t[r]) ? (a.__data__ = o[r], i[r] = a) : n[r] = new mt(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function Ws(e, t, n, i, s, o, r) {
  var a, d, l = /* @__PURE__ */ new Map(), c = t.length, p = o.length, m = new Array(c), y;
  for (a = 0; a < c; ++a)
    (d = t[a]) && (m[a] = y = r.call(d, d.__data__, a, t) + "", l.has(y) ? s[a] = d : l.set(y, d));
  for (a = 0; a < p; ++a)
    y = r.call(e, o[a], a, o) + "", (d = l.get(y)) ? (i[a] = d, d.__data__ = o[a], l.delete(y)) : n[a] = new mt(e, o[a]);
  for (a = 0; a < c; ++a)
    (d = t[a]) && l.get(m[a]) === d && (s[a] = d);
}
function Fs(e) {
  return e.__data__;
}
function Bs(e, t) {
  if (!arguments.length) return Array.from(this, Fs);
  var n = t ? Ws : Ks, i = this._parents, s = this._groups;
  typeof e != "function" && (e = Vs(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), l = 0; l < o; ++l) {
    var c = i[l], p = s[l], m = p.length, y = Gs(e.call(c, c && c.__data__, l, i)), $ = y.length, k = a[l] = new Array($), A = r[l] = new Array($), w = d[l] = new Array(m);
    n(c, p, k, A, w, y, t);
    for (var x = 0, E = 0, S, h; x < $; ++x)
      if (S = k[x]) {
        for (x >= E && (E = x + 1); !(h = A[E]) && ++E < $; ) ;
        S._next = h || null;
      }
  }
  return r = new Q(r, i), r._enter = a, r._exit = d, r;
}
function Gs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ys() {
  return new Q(this._exit || this._groups.map(ti), this._parents);
}
function Xs(e, t, n) {
  var i = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? o.remove() : n(o), i && s ? i.merge(s).order() : s;
}
function js(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, s = n.length, o = i.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var l = n[d], c = i[d], p = l.length, m = a[d] = new Array(p), y, $ = 0; $ < p; ++$)
      (y = l[$] || c[$]) && (m[$] = y);
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
function Qs(e) {
  e || (e = Js);
  function t(p, m) {
    return p && m ? e(p.__data__, m.__data__) : !p - !m;
  }
  for (var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o) {
    for (var r = n[o], a = r.length, d = s[o] = new Array(a), l, c = 0; c < a; ++c)
      (l = r[c]) && (d[c] = l);
    d.sort(t);
  }
  return new Q(s, this._parents).order();
}
function Js(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function er() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function tr() {
  return Array.from(this);
}
function nr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], s = 0, o = i.length; s < o; ++s) {
      var r = i[s];
      if (r) return r;
    }
  return null;
}
function ir() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function sr() {
  return !this.node();
}
function rr(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var s = t[n], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function or(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ar(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function dr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function lr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function cr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function ur(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function hr(e, t) {
  var n = It(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? ar : or : typeof t == "function" ? n.local ? ur : cr : n.local ? lr : dr)(n, t));
}
function ni(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function fr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function pr(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function mr(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function gr(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? fr : typeof t == "function" ? mr : pr)(e, t, n ?? "")) : Re(this.node(), e);
}
function Re(e, t) {
  return e.style.getPropertyValue(t) || ni(e).getComputedStyle(e, null).getPropertyValue(t);
}
function wr(e) {
  return function() {
    delete this[e];
  };
}
function yr(e, t) {
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
function _r(e, t) {
  return arguments.length > 1 ? this.each((t == null ? wr : typeof t == "function" ? vr : yr)(e, t)) : this.node()[e];
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
function xr(e) {
  return function() {
    ri(this, e);
  };
}
function Ir(e) {
  return function() {
    oi(this, e);
  };
}
function $r(e, t) {
  return function() {
    (t.apply(this, arguments) ? ri : oi)(this, e);
  };
}
function kr(e, t) {
  var n = ii(e + "");
  if (arguments.length < 2) {
    for (var i = Jt(this.node()), s = -1, o = n.length; ++s < o; ) if (!i.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? $r : t ? xr : Ir)(n, t));
}
function br() {
  this.textContent = "";
}
function Er(e) {
  return function() {
    this.textContent = e;
  };
}
function Sr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Ar(e) {
  return arguments.length ? this.each(e == null ? br : (typeof e == "function" ? Sr : Er)(e)) : this.node().textContent;
}
function Cr() {
  this.innerHTML = "";
}
function Mr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Nr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Tr(e) {
  return arguments.length ? this.each(e == null ? Cr : (typeof e == "function" ? Nr : Mr)(e)) : this.node().innerHTML;
}
function Rr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Pr() {
  return this.each(Rr);
}
function Or() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Lr() {
  return this.each(Or);
}
function Ur(e) {
  var t = typeof e == "function" ? e : Zn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Dr() {
  return null;
}
function zr(e, t) {
  var n = typeof e == "function" ? e : Zn(e), i = t == null ? Dr : typeof t == "function" ? t : Qt(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Hr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function qr() {
  return this.each(Hr);
}
function Vr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Kr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Wr(e) {
  return this.select(e ? Kr : Vr);
}
function Fr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Br(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Gr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Yr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, s = t.length, o; n < s; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++i] = o;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Xr(e, t, n) {
  return function() {
    var i = this.__on, s, o = Br(t);
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
function jr(e, t, n) {
  var i = Gr(e + ""), s, o = i.length, r;
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
  for (a = t ? Xr : Yr, s = 0; s < o; ++s) this.each(a(i[s], t, n));
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
function Qr(e, t) {
  return function() {
    return ai(this, e, t.apply(this, arguments));
  };
}
function Jr(e, t) {
  return this.each((typeof t == "function" ? Qr : Zr)(e, t));
}
function* eo() {
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
function to() {
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
  merge: js,
  selection: to,
  order: Zs,
  sort: Qs,
  call: er,
  nodes: tr,
  node: nr,
  size: ir,
  empty: sr,
  each: rr,
  attr: hr,
  style: gr,
  property: _r,
  classed: kr,
  text: Ar,
  html: Tr,
  raise: Pr,
  lower: Lr,
  append: Ur,
  insert: zr,
  remove: qr,
  clone: Wr,
  datum: Fr,
  on: jr,
  dispatch: Jr,
  [Symbol.iterator]: eo
};
function re(e) {
  return typeof e == "string" ? new Q([[document.querySelector(e)]], [document.documentElement]) : new Q([[e]], di);
}
function no(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ve(e, t) {
  if (e = no(e), t === void 0 && (t = e.currentTarget), t) {
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
var io = { value: () => {
} };
function en() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new lt(n);
}
function lt(e) {
  this._ = e;
}
function so(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", s = n.indexOf(".");
    if (s >= 0 && (i = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
lt.prototype = en.prototype = {
  constructor: lt,
  on: function(e, t) {
    var n = this._, i = so(e + "", n), s, o = -1, r = i.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = i[o]).type) && (s = ro(n[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = i[o]).type) n[s] = vn(n[s], e.name, t);
      else if (t == null) for (s in n) n[s] = vn(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new lt(e);
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
function ro(e, t) {
  for (var n = 0, i = e.length, s; n < i; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function vn(e, t, n) {
  for (var i = 0, s = e.length; i < s; ++i)
    if (e[i].name === t) {
      e[i] = io, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Ut = { capture: !0, passive: !1 };
function Dt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function oo(e) {
  var t = e.document.documentElement, n = re(e).on("dragstart.drag", Dt, Ut);
  "onselectstart" in t ? n.on("selectstart.drag", Dt, Ut) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ao(e, t) {
  var n = e.document.documentElement, i = re(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Dt, Ut), setTimeout(function() {
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
var Xe = 0.7, gt = 1 / Xe, Me = "\\s*([+-]?\\d+)\\s*", je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lo = /^#([0-9a-f]{3,8})$/, co = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), uo = new RegExp(`^rgb\\(${oe},${oe},${oe}\\)$`), ho = new RegExp(`^rgba\\(${Me},${Me},${Me},${je}\\)$`), fo = new RegExp(`^rgba\\(${oe},${oe},${oe},${je}\\)$`), po = new RegExp(`^hsl\\(${je},${oe},${oe}\\)$`), mo = new RegExp(`^hsla\\(${je},${oe},${oe},${je}\\)$`), _n = {
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
tn(tt, Ze, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xn,
  // Deprecated! Use color.formatHex.
  formatHex: xn,
  formatHex8: go,
  formatHsl: wo,
  formatRgb: In,
  toString: In
});
function xn() {
  return this.rgb().formatHex();
}
function go() {
  return this.rgb().formatHex8();
}
function wo() {
  return ci(this).formatHsl();
}
function In() {
  return this.rgb().formatRgb();
}
function Ze(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = lo.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? $n(t) : n === 3 ? new Z(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? it(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? it(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = co.exec(e)) ? new Z(t[1], t[2], t[3], 1) : (t = uo.exec(e)) ? new Z(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ho.exec(e)) ? it(t[1], t[2], t[3], t[4]) : (t = fo.exec(e)) ? it(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = po.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, 1) : (t = mo.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, t[4]) : _n.hasOwnProperty(e) ? $n(_n[e]) : e === "transparent" ? new Z(NaN, NaN, NaN, 0) : null;
}
function $n(e) {
  return new Z(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function it(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new Z(e, t, n, i);
}
function yo(e) {
  return e instanceof tt || (e = Ze(e)), e ? (e = e.rgb(), new Z(e.r, e.g, e.b, e.opacity)) : new Z();
}
function zt(e, t, n, i) {
  return arguments.length === 1 ? yo(e) : new Z(e, t, n, i ?? 1);
}
function Z(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
tn(Z, zt, li(tt, {
  brighter(e) {
    return e = e == null ? gt : Math.pow(gt, e), new Z(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new Z(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Z(ke(this.r), ke(this.g), ke(this.b), wt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: kn,
  // Deprecated! Use color.formatHex.
  formatHex: kn,
  formatHex8: vo,
  formatRgb: bn,
  toString: bn
}));
function kn() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}`;
}
function vo() {
  return `#${xe(this.r)}${xe(this.g)}${xe(this.b)}${xe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function bn() {
  const e = wt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ke(this.r)}, ${ke(this.g)}, ${ke(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function wt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ke(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function xe(e) {
  return e = ke(e), (e < 16 ? "0" : "") + e.toString(16);
}
function En(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ne(e, t, n, i);
}
function ci(e) {
  if (e instanceof ne) return new ne(e.h, e.s, e.l, e.opacity);
  if (e instanceof tt || (e = Ze(e)), !e) return new ne();
  if (e instanceof ne) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, s = Math.min(t, n, i), o = Math.max(t, n, i), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (n - i) / a + (n < i) * 6 : n === o ? r = (i - t) / a + 2 : r = (t - n) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new ne(r, a, d, e.opacity);
}
function _o(e, t, n, i) {
  return arguments.length === 1 ? ci(e) : new ne(e, t, n, i ?? 1);
}
function ne(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
tn(ne, _o, li(tt, {
  brighter(e) {
    return e = e == null ? gt : Math.pow(gt, e), new ne(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new ne(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - i;
    return new Z(
      Nt(e >= 240 ? e - 240 : e + 120, s, i),
      Nt(e, s, i),
      Nt(e < 120 ? e + 240 : e - 120, s, i),
      this.opacity
    );
  },
  clamp() {
    return new ne(Sn(this.h), st(this.s), st(this.l), wt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = wt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Sn(this.h)}, ${st(this.s) * 100}%, ${st(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Sn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function st(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Nt(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ui = (e) => () => e;
function xo(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Io(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function $o(e) {
  return (e = +e) == 1 ? hi : function(t, n) {
    return n - t ? Io(t, n, e) : ui(isNaN(t) ? n : t);
  };
}
function hi(e, t) {
  var n = t - e;
  return n ? xo(e, n) : ui(isNaN(e) ? t : e);
}
const An = (function e(t) {
  var n = $o(t);
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
function ko(e) {
  return function() {
    return e;
  };
}
function bo(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Eo(e, t) {
  var n = Ht.lastIndex = Tt.lastIndex = 0, i, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (i = Ht.exec(e)) && (s = Tt.exec(t)); )
    (o = s.index) > n && (o = t.slice(n, o), a[r] ? a[r] += o : a[++r] = o), (i = i[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: me(i, s) })), n = Tt.lastIndex;
  return n < t.length && (o = t.slice(n), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? bo(d[0].x) : ko(t) : (t = d.length, function(l) {
    for (var c = 0, p; c < t; ++c) a[(p = d[c]).i] = p.x(l);
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
var rt;
function So(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? qt : fi(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Ao(e) {
  return e == null || (rt || (rt = document.createElementNS("http://www.w3.org/2000/svg", "g")), rt.setAttribute("transform", e), !(e = rt.transform.baseVal.consolidate())) ? qt : (e = e.matrix, fi(e.a, e.b, e.c, e.d, e.e, e.f));
}
function pi(e, t, n, i) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, c, p, m, y, $) {
    if (l !== p || c !== m) {
      var k = y.push("translate(", null, t, null, n);
      $.push({ i: k - 4, x: me(l, p) }, { i: k - 2, x: me(c, m) });
    } else (p || m) && y.push("translate(" + p + t + m + n);
  }
  function r(l, c, p, m) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), m.push({ i: p.push(s(p) + "rotate(", null, i) - 2, x: me(l, c) })) : c && p.push(s(p) + "rotate(" + c + i);
  }
  function a(l, c, p, m) {
    l !== c ? m.push({ i: p.push(s(p) + "skewX(", null, i) - 2, x: me(l, c) }) : c && p.push(s(p) + "skewX(" + c + i);
  }
  function d(l, c, p, m, y, $) {
    if (l !== p || c !== m) {
      var k = y.push(s(y) + "scale(", null, ",", null, ")");
      $.push({ i: k - 4, x: me(l, p) }, { i: k - 2, x: me(c, m) });
    } else (p !== 1 || m !== 1) && y.push(s(y) + "scale(" + p + "," + m + ")");
  }
  return function(l, c) {
    var p = [], m = [];
    return l = e(l), c = e(c), o(l.translateX, l.translateY, c.translateX, c.translateY, p, m), r(l.rotate, c.rotate, p, m), a(l.skewX, c.skewX, p, m), d(l.scaleX, l.scaleY, c.scaleX, c.scaleY, p, m), l = c = null, function(y) {
      for (var $ = -1, k = m.length, A; ++$ < k; ) p[(A = m[$]).i] = A.x(y);
      return p.join("");
    };
  };
}
var Co = pi(So, "px, ", "px)", "deg)"), Mo = pi(Ao, ", ", ")", ")"), No = 1e-12;
function Mn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function To(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ro(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Po = (function e(t, n, i) {
  function s(o, r) {
    var a = o[0], d = o[1], l = o[2], c = r[0], p = r[1], m = r[2], y = c - a, $ = p - d, k = y * y + $ * $, A, w;
    if (k < No)
      w = Math.log(m / l) / t, A = function(N) {
        return [
          a + N * y,
          d + N * $,
          l * Math.exp(t * N * w)
        ];
      };
    else {
      var x = Math.sqrt(k), E = (m * m - l * l + i * k) / (2 * l * n * x), S = (m * m - l * l - i * k) / (2 * m * n * x), h = Math.log(Math.sqrt(E * E + 1) - E), R = Math.log(Math.sqrt(S * S + 1) - S);
      w = (R - h) / t, A = function(N) {
        var H = N * w, K = Mn(h), W = l / (n * x) * (K * Ro(t * H + h) - To(h));
        return [
          a + W * y,
          d + W * $,
          l * K / Mn(t * H + h)
        ];
      };
    }
    return A.duration = w * 1e3 * t / Math.SQRT2, A;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Pe = 0, De = 0, Le = 0, mi = 1e3, yt, ze, vt = 0, Ee = 0, $t = 0, Qe = typeof performance == "object" && performance.now ? performance : Date, gi = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function nn() {
  return Ee || (gi(Oo), Ee = Qe.now() + $t);
}
function Oo() {
  Ee = 0;
}
function _t() {
  this._call = this._time = this._next = null;
}
_t.prototype = wi.prototype = {
  constructor: _t,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? nn() : +n) + (t == null ? 0 : +t), !this._next && ze !== this && (ze ? ze._next = this : yt = this, ze = this), this._call = e, this._time = n, Vt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vt());
  }
};
function wi(e, t, n) {
  var i = new _t();
  return i.restart(e, t, n), i;
}
function Lo() {
  nn(), ++Pe;
  for (var e = yt, t; e; )
    (t = Ee - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Pe;
}
function Nn() {
  Ee = (vt = Qe.now()) + $t, Pe = De = 0;
  try {
    Lo();
  } finally {
    Pe = 0, Do(), Ee = 0;
  }
}
function Uo() {
  var e = Qe.now(), t = e - vt;
  t > mi && ($t -= t, vt = e);
}
function Do() {
  for (var e, t = yt, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : yt = n);
  ze = e, Vt(i);
}
function Vt(e) {
  if (!Pe) {
    De && (De = clearTimeout(De));
    var t = e - Ee;
    t > 24 ? (e < 1 / 0 && (De = setTimeout(Nn, e - Qe.now() - $t)), Le && (Le = clearInterval(Le))) : (Le || (vt = Qe.now(), Le = setInterval(Uo, mi)), Pe = 1, gi(Nn));
  }
}
function Tn(e, t, n) {
  var i = new _t();
  return t = t == null ? 0 : +t, i.restart((s) => {
    i.stop(), e(s + t);
  }, t, n), i;
}
var zo = en("start", "end", "cancel", "interrupt"), Ho = [], yi = 0, Rn = 1, Kt = 2, ct = 3, Pn = 4, Wt = 5, ut = 6;
function kt(e, t, n, i, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (n in r) return;
  qo(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: s,
    // For context during callback.
    on: zo,
    tween: Ho,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: yi
  });
}
function sn(e, t) {
  var n = ie(e, t);
  if (n.state > yi) throw new Error("too late; already scheduled");
  return n;
}
function ae(e, t) {
  var n = ie(e, t);
  if (n.state > ct) throw new Error("too late; already running");
  return n;
}
function ie(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function qo(e, t, n) {
  var i = e.__transition, s;
  i[t] = n, n.timer = wi(o, 0, n.time);
  function o(l) {
    n.state = Rn, n.timer.restart(r, n.delay, n.time), n.delay <= l && r(l - n.delay);
  }
  function r(l) {
    var c, p, m, y;
    if (n.state !== Rn) return d();
    for (c in i)
      if (y = i[c], y.name === n.name) {
        if (y.state === ct) return Tn(r);
        y.state === Pn ? (y.state = ut, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete i[c]) : +c < t && (y.state = ut, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete i[c]);
      }
    if (Tn(function() {
      n.state === ct && (n.state = Pn, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = Kt, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Kt) {
      for (n.state = ct, s = new Array(m = n.tween.length), c = 0, p = -1; c < m; ++c)
        (y = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (s[++p] = y);
      s.length = p + 1;
    }
  }
  function a(l) {
    for (var c = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(d), n.state = Wt, 1), p = -1, m = s.length; ++p < m; )
      s[p].call(e, c);
    n.state === Wt && (n.on.call("end", e, e.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = ut, n.timer.stop(), delete i[t];
    for (var l in i) return;
    delete e.__transition;
  }
}
function ht(e, t) {
  var n = e.__transition, i, s, o = !0, r;
  if (n) {
    t = t == null ? null : t + "";
    for (r in n) {
      if ((i = n[r]).name !== t) {
        o = !1;
        continue;
      }
      s = i.state > Kt && i.state < Wt, i.state = ut, i.timer.stop(), i.on.call(s ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[r];
    }
    o && delete e.__transition;
  }
}
function Vo(e) {
  return this.each(function() {
    ht(this, e);
  });
}
function Ko(e, t) {
  var n, i;
  return function() {
    var s = ae(this, e), o = s.tween;
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
    var o = ae(this, e), r = o.tween;
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
    for (var i = ie(this.node(), n).tween, s = 0, o = i.length, r; s < o; ++s)
      if ((r = i[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Ko : Wo)(n, e, t));
}
function rn(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var s = ae(this, i);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return ie(s, i).value[t];
  };
}
function vi(e, t) {
  var n;
  return (typeof t == "number" ? me : t instanceof Ze ? An : (n = Ze(t)) ? (t = n, An) : Eo)(e, t);
}
function Bo(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Go(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Yo(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function Xo(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function jo(e, t, n) {
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
function Qo(e, t) {
  var n = It(e), i = n === "transform" ? Mo : vi;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Zo : jo)(n, i, rn(this, "attr." + e, t)) : t == null ? (n.local ? Go : Bo)(n) : (n.local ? Xo : Yo)(n, i, t));
}
function Jo(e, t) {
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
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && ea(e, o)), n;
  }
  return s._value = t, s;
}
function na(e, t) {
  var n, i;
  function s() {
    var o = t.apply(this, arguments);
    return o !== i && (n = (i = o) && Jo(e, o)), n;
  }
  return s._value = t, s;
}
function ia(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = It(e);
  return this.tween(n, (i.local ? ta : na)(i, t));
}
function sa(e, t) {
  return function() {
    sn(this, e).delay = +t.apply(this, arguments);
  };
}
function ra(e, t) {
  return t = +t, function() {
    sn(this, e).delay = t;
  };
}
function oa(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? sa : ra)(t, e)) : ie(this.node(), t).delay;
}
function aa(e, t) {
  return function() {
    ae(this, e).duration = +t.apply(this, arguments);
  };
}
function da(e, t) {
  return t = +t, function() {
    ae(this, e).duration = t;
  };
}
function la(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? aa : da)(t, e)) : ie(this.node(), t).duration;
}
function ca(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    ae(this, e).ease = t;
  };
}
function ua(e) {
  var t = this._id;
  return arguments.length ? this.each(ca(t, e)) : ie(this.node(), t).ease;
}
function ha(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ae(this, e).ease = n;
  };
}
function fa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ha(this._id, e));
}
function pa(e) {
  typeof e != "function" && (e = Jn(e));
  for (var t = this._groups, n = t.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = t[s], r = o.length, a = i[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new he(i, this._parents, this._name, this._id);
}
function ma(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, s = n.length, o = Math.min(i, s), r = new Array(i), a = 0; a < o; ++a)
    for (var d = t[a], l = n[a], c = d.length, p = r[a] = new Array(c), m, y = 0; y < c; ++y)
      (m = d[y] || l[y]) && (p[y] = m);
  for (; a < i; ++a)
    r[a] = t[a];
  return new he(r, this._parents, this._name, this._id);
}
function ga(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function wa(e, t, n) {
  var i, s, o = ga(t) ? sn : ae;
  return function() {
    var r = o(this, e), a = r.on;
    a !== i && (s = (i = a).copy()).on(t, n), r.on = s;
  };
}
function ya(e, t) {
  var n = this._id;
  return arguments.length < 2 ? ie(this.node(), n).on.on(e) : this.each(wa(n, e, t));
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
  for (var i = this._groups, s = i.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = i[r], d = a.length, l = o[r] = new Array(d), c, p, m = 0; m < d; ++m)
      (c = a[m]) && (p = e.call(c, c.__data__, m, a)) && ("__data__" in c && (p.__data__ = c.__data__), l[m] = p, kt(l[m], t, n, m, l, ie(c, n)));
  return new he(o, this._parents, t, n);
}
function Ia(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Qn(e));
  for (var i = this._groups, s = i.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = i[a], l = d.length, c, p = 0; p < l; ++p)
      if (c = d[p]) {
        for (var m = e.call(c, c.__data__, p, d), y, $ = ie(c, n), k = 0, A = m.length; k < A; ++k)
          (y = m[k]) && kt(y, t, n, k, m, $);
        o.push(m), r.push(c);
      }
  return new he(o, r, t, n);
}
var $a = et.prototype.constructor;
function ka() {
  return new $a(this._groups, this._parents);
}
function ba(e, t) {
  var n, i, s;
  return function() {
    var o = Re(this, e), r = (this.style.removeProperty(e), Re(this, e));
    return o === r ? null : o === n && r === i ? s : s = t(n = o, i = r);
  };
}
function _i(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ea(e, t, n) {
  var i, s = n + "", o;
  return function() {
    var r = Re(this, e);
    return r === s ? null : r === i ? o : o = t(i = r, n);
  };
}
function Sa(e, t, n) {
  var i, s, o;
  return function() {
    var r = Re(this, e), a = n(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Re(this, e))), r === d ? null : r === i && d === s ? o : (s = d, o = t(i = r, a));
  };
}
function Aa(e, t) {
  var n, i, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = ae(this, e), l = d.on, c = d.value[o] == null ? a || (a = _i(t)) : void 0;
    (l !== n || s !== c) && (i = (n = l).copy()).on(r, s = c), d.on = i;
  };
}
function Ca(e, t, n) {
  var i = (e += "") == "transform" ? Co : vi;
  return t == null ? this.styleTween(e, ba(e, i)).on("end.style." + e, _i(e)) : typeof t == "function" ? this.styleTween(e, Sa(e, i, rn(this, "style." + e, t))).each(Aa(this._id, e)) : this.styleTween(e, Ea(e, i, t), n).on("end.style." + e, null);
}
function Ma(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function Na(e, t, n) {
  var i, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && Ma(e, r, n)), i;
  }
  return o._value = t, o;
}
function Ta(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, Na(e, t, n ?? ""));
}
function Ra(e) {
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
function Oa(e) {
  return this.tween("text", typeof e == "function" ? Pa(rn(this, "text", e)) : Ra(e == null ? "" : e + ""));
}
function La(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ua(e) {
  var t, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && La(s)), t;
  }
  return i._value = e, i;
}
function Da(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ua(e));
}
function za() {
  for (var e = this._name, t = this._id, n = xi(), i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      if (d = r[l]) {
        var c = ie(d, t);
        kt(d, e, n, l, r, {
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
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    n.each(function() {
      var l = ae(this, i), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), l.on = t;
    }), s === 0 && o();
  });
}
var qa = 0;
function he(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function xi() {
  return ++qa;
}
var ce = et.prototype;
he.prototype = {
  constructor: he,
  select: xa,
  selectAll: Ia,
  selectChild: ce.selectChild,
  selectChildren: ce.selectChildren,
  filter: pa,
  merge: ma,
  selection: ka,
  transition: za,
  call: ce.call,
  nodes: ce.nodes,
  node: ce.node,
  size: ce.size,
  empty: ce.empty,
  each: ce.each,
  on: ya,
  attr: Qo,
  attrTween: ia,
  style: Ca,
  styleTween: Ta,
  text: Oa,
  textTween: Da,
  remove: _a,
  tween: Fo,
  delay: oa,
  duration: la,
  ease: ua,
  easeVarying: fa,
  end: Ha,
  [Symbol.iterator]: ce[Symbol.iterator]
};
function Va(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ka = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Va
};
function Wa(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Fa(e) {
  var t, n;
  e instanceof he ? (t = e._id, e = e._name) : (t = xi(), (n = Ka).time = nn(), e = e == null ? null : e + "");
  for (var i = this._groups, s = i.length, o = 0; o < s; ++o)
    for (var r = i[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && kt(d, e, t, l, r, n || Wa(d, t));
  return new he(i, this._parents, e, t);
}
et.prototype.interrupt = Vo;
et.prototype.transition = Fa;
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
function Rt(e) {
  e.stopImmediatePropagation();
}
function Ue(e) {
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
function ja() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Za(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], r = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function Qa() {
  var e = Ga, t = Ya, n = Za, i = Xa, s = ja, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Po, l = en("start", "zoom", "end"), c, p, m, y = 500, $ = 150, k = 0, A = 10;
  function w(f) {
    f.property("__zoom", On).on("wheel.zoom", H, { passive: !1 }).on("mousedown.zoom", K).on("dblclick.zoom", W).filter(s).on("touchstart.zoom", u).on("touchmove.zoom", g).on("touchend.zoom touchcancel.zoom", _).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(f, I, v, b) {
    var C = f.selection ? f.selection() : f;
    C.property("__zoom", On), f !== C ? h(f, I, v, b) : C.interrupt().each(function() {
      R(this, arguments).event(b).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, w.scaleBy = function(f, I, v, b) {
    w.scaleTo(f, function() {
      var C = this.__zoom.k, O = typeof I == "function" ? I.apply(this, arguments) : I;
      return C * O;
    }, v, b);
  }, w.scaleTo = function(f, I, v, b) {
    w.transform(f, function() {
      var C = t.apply(this, arguments), O = this.__zoom, D = v == null ? S(C) : typeof v == "function" ? v.apply(this, arguments) : v, V = O.invert(D), F = typeof I == "function" ? I.apply(this, arguments) : I;
      return n(E(x(O, F), D, V), C, r);
    }, v, b);
  }, w.translateBy = function(f, I, v, b) {
    w.transform(f, function() {
      return n(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), r);
    }, null, b);
  }, w.translateTo = function(f, I, v, b, C) {
    w.transform(f, function() {
      var O = t.apply(this, arguments), D = this.__zoom, V = b == null ? S(O) : typeof b == "function" ? b.apply(this, arguments) : b;
      return n(Ve.translate(V[0], V[1]).scale(D.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), O, r);
    }, b, C);
  };
  function x(f, I) {
    return I = Math.max(o[0], Math.min(o[1], I)), I === f.k ? f : new ue(I, f.x, f.y);
  }
  function E(f, I, v) {
    var b = I[0] - v[0] * f.k, C = I[1] - v[1] * f.k;
    return b === f.x && C === f.y ? f : new ue(f.k, b, C);
  }
  function S(f) {
    return [(+f[0][0] + +f[1][0]) / 2, (+f[0][1] + +f[1][1]) / 2];
  }
  function h(f, I, v, b) {
    f.on("start.zoom", function() {
      R(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var C = this, O = arguments, D = R(C, O).event(b), V = t.apply(C, O), F = v == null ? S(V) : typeof v == "function" ? v.apply(C, O) : v, se = Math.max(V[1][0] - V[0][0], V[1][1] - V[0][1]), X = C.__zoom, ee = typeof I == "function" ? I.apply(C, O) : I, de = d(X.invert(F).concat(se / X.k), ee.invert(F).concat(se / ee.k));
      return function(te) {
        if (te === 1) te = ee;
        else {
          var le = de(te), bt = se / le[2];
          te = new ue(bt, F[0] - le[0] * bt, F[1] - le[1] * bt);
        }
        D.zoom(null, te);
      };
    });
  }
  function R(f, I, v) {
    return !v && f.__zooming || new N(f, I);
  }
  function N(f, I) {
    this.that = f, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = t.apply(f, I), this.taps = 0;
  }
  N.prototype = {
    event: function(f) {
      return f && (this.sourceEvent = f), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(f, I) {
      return this.mouse && f !== "mouse" && (this.mouse[1] = I.invert(this.mouse[0])), this.touch0 && f !== "touch" && (this.touch0[1] = I.invert(this.touch0[0])), this.touch1 && f !== "touch" && (this.touch1[1] = I.invert(this.touch1[0])), this.that.__zoom = I, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(f) {
      var I = re(this.that).datum();
      l.call(
        f,
        this.that,
        new Ba(f, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: l
        }),
        I
      );
    }
  };
  function H(f, ...I) {
    if (!e.apply(this, arguments)) return;
    var v = R(this, I).event(f), b = this.__zoom, C = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, i.apply(this, arguments)))), O = ve(f);
    if (v.wheel)
      (v.mouse[0][0] !== O[0] || v.mouse[0][1] !== O[1]) && (v.mouse[1] = b.invert(v.mouse[0] = O)), clearTimeout(v.wheel);
    else {
      if (b.k === C) return;
      v.mouse = [O, b.invert(O)], ht(this), v.start();
    }
    Ue(f), v.wheel = setTimeout(D, $), v.zoom("mouse", n(E(x(b, C), v.mouse[0], v.mouse[1]), v.extent, r));
    function D() {
      v.wheel = null, v.end();
    }
  }
  function K(f, ...I) {
    if (m || !e.apply(this, arguments)) return;
    var v = f.currentTarget, b = R(this, I, !0).event(f), C = re(f.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", se, !0), O = ve(f, v), D = f.clientX, V = f.clientY;
    oo(f.view), Rt(f), b.mouse = [O, this.__zoom.invert(O)], ht(this), b.start();
    function F(X) {
      if (Ue(X), !b.moved) {
        var ee = X.clientX - D, de = X.clientY - V;
        b.moved = ee * ee + de * de > k;
      }
      b.event(X).zoom("mouse", n(E(b.that.__zoom, b.mouse[0] = ve(X, v), b.mouse[1]), b.extent, r));
    }
    function se(X) {
      C.on("mousemove.zoom mouseup.zoom", null), ao(X.view, b.moved), Ue(X), b.event(X).end();
    }
  }
  function W(f, ...I) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, b = ve(f.changedTouches ? f.changedTouches[0] : f, this), C = v.invert(b), O = v.k * (f.shiftKey ? 0.5 : 2), D = n(E(x(v, O), b, C), t.apply(this, I), r);
      Ue(f), a > 0 ? re(this).transition().duration(a).call(h, D, b, f) : re(this).call(w.transform, D, b, f);
    }
  }
  function u(f, ...I) {
    if (e.apply(this, arguments)) {
      var v = f.touches, b = v.length, C = R(this, I, f.changedTouches.length === b).event(f), O, D, V, F;
      for (Rt(f), D = 0; D < b; ++D)
        V = v[D], F = ve(V, this), F = [F, this.__zoom.invert(F), V.identifier], C.touch0 ? !C.touch1 && C.touch0[2] !== F[2] && (C.touch1 = F, C.taps = 0) : (C.touch0 = F, O = !0, C.taps = 1 + !!c);
      c && (c = clearTimeout(c)), O && (C.taps < 2 && (p = F[0], c = setTimeout(function() {
        c = null;
      }, y)), ht(this), C.start());
    }
  }
  function g(f, ...I) {
    if (this.__zooming) {
      var v = R(this, I).event(f), b = f.changedTouches, C = b.length, O, D, V, F;
      for (Ue(f), O = 0; O < C; ++O)
        D = b[O], V = ve(D, this), v.touch0 && v.touch0[2] === D.identifier ? v.touch0[0] = V : v.touch1 && v.touch1[2] === D.identifier && (v.touch1[0] = V);
      if (D = v.that.__zoom, v.touch1) {
        var se = v.touch0[0], X = v.touch0[1], ee = v.touch1[0], de = v.touch1[1], te = (te = ee[0] - se[0]) * te + (te = ee[1] - se[1]) * te, le = (le = de[0] - X[0]) * le + (le = de[1] - X[1]) * le;
        D = x(D, Math.sqrt(te / le)), V = [(se[0] + ee[0]) / 2, (se[1] + ee[1]) / 2], F = [(X[0] + de[0]) / 2, (X[1] + de[1]) / 2];
      } else if (v.touch0) V = v.touch0[0], F = v.touch0[1];
      else return;
      v.zoom("touch", n(E(D, V, F), v.extent, r));
    }
  }
  function _(f, ...I) {
    if (this.__zooming) {
      var v = R(this, I).event(f), b = f.changedTouches, C = b.length, O, D;
      for (Rt(f), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, y), O = 0; O < C; ++O)
        D = b[O], v.touch0 && v.touch0[2] === D.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === D.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (D = ve(D, this), Math.hypot(p[0] - D[0], p[1] - D[1]) < A)) {
        var V = re(this).on("dblclick.zoom");
        V && V.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : ot(+f), w) : i;
  }, w.filter = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : ot(!!f), w) : e;
  }, w.touchable = function(f) {
    return arguments.length ? (s = typeof f == "function" ? f : ot(!!f), w) : s;
  }, w.extent = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : ot([[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]]), w) : t;
  }, w.scaleExtent = function(f) {
    return arguments.length ? (o[0] = +f[0], o[1] = +f[1], w) : [o[0], o[1]];
  }, w.translateExtent = function(f) {
    return arguments.length ? (r[0][0] = +f[0][0], r[1][0] = +f[1][0], r[0][1] = +f[0][1], r[1][1] = +f[1][1], w) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, w.constrain = function(f) {
    return arguments.length ? (n = f, w) : n;
  }, w.duration = function(f) {
    return arguments.length ? (a = +f, w) : a;
  }, w.interpolate = function(f) {
    return arguments.length ? (d = f, w) : d;
  }, w.on = function() {
    var f = l.on.apply(l, arguments);
    return f === l ? w : f;
  }, w.clickDistance = function(f) {
    return arguments.length ? (k = (f = +f) * f, w) : Math.sqrt(k);
  }, w.tapDistance = function(f) {
    return arguments.length ? (A = +f, w) : A;
  }, w;
}
var Ja = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, j = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? ed(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && Ja(t, n, s), s;
};
function td(e, t, n, i) {
  const s = t.x - e.x, o = t.y - e.y, r = i.x - n.x, a = i.y - n.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const l = ((n.x - e.x) * a - (n.y - e.y) * r) / d, c = ((n.x - e.x) * o - (n.y - e.y) * s) / d;
  return l <= 0.02 || l >= 0.98 || c <= 0.02 || c >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * o, t: l };
}
function nd(e, t, n) {
  const i = n.x - t.x, s = n.y - t.y, o = i * i + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * s) / o)), a = t.x + r * i, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function id(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, l = (r.y - o.y) / a, c = t.map(([m, y]) => td(o, r, m, y)).filter((m) => m !== null).filter((m) => m.t * a > n + 2 && (1 - m.t) * a > n + 2).sort((m, y) => m.t - y.t);
    let p = -1 / 0;
    for (const m of c)
      m.t * a - n <= p + 2 || (i += ` L ${m.x - d * n} ${m.y - l * n}`, i += ` A ${n} ${n} 0 0 1 ${m.x + d * n} ${m.y + l * n}`, p = m.t * a + n);
    i += ` L ${r.x} ${r.y}`;
  }
  return i;
}
const at = {
  component: L`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: L`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: L`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: L`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: L`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: L`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: L`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: L`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: L`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: L`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: L`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: L`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: L`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let Y = class extends $e {
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
    this._zoomBehavior = Qa().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), re(e).call(this._zoomBehavior);
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
    re(n).call(this._zoomBehavior.transform, l);
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((k) => k.parentId === t.id), d = Math.min(...a.map((k) => k.x - k.w / 2)), l = Math.max(...a.map((k) => k.x + k.w / 2)), c = Math.min(...a.map((k) => k.y - k.h / 2)), p = Math.max(...a.map((k) => k.y + k.h / 2)), m = Ii(
      a.map((k) => ({ dx: k.x - r.x, dy: k.y - r.y, w: k.w, h: k.h })),
      { w: s, h: o }
    ), y = (k) => {
      const A = this.toScene(k);
      if (k.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(m.w, 2 * Math.abs(A.x - r.x)),
          h: Math.max(m.h, 2 * Math.abs(A.y - r.y))
        };
        return;
      }
      const w = r.x - n * r.w / 2, x = r.y - i * r.h / 2, E = n > 0 ? Math.max(A.x, w + s, a.length ? l + 10 : -1 / 0) : Math.min(A.x, w - s, a.length ? d - 10 : 1 / 0), S = i > 0 ? Math.max(A.y, x + o, a.length ? p + 10 : -1 / 0) : Math.min(A.y, x - o, a.length ? c - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (w + E) / 2,
        y: (x + S) / 2,
        w: Math.abs(E - w),
        h: Math.abs(S - x)
      };
    }, $ = () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", $), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", y), window.addEventListener("pointerup", $);
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
        const p = Math.hypot(l.x - d.x, l.y - d.y) || 1, m = -(l.y - d.y) / p * c, y = (l.x - d.x) / p * c;
        d = { x: d.x + m, y: d.y + y }, l = { x: l.x + m, y: l.y + y };
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
    return L`
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
          ${e.tooltip ? L`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${id(t, n)}
              fill="none"
              stroke=${i} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}
              pointer-events="none"></path>
        ${e.label ? L`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
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
        ${s ? d.map((c, p) => {
      var y;
      const m = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === p;
      return L`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${($) => {
        $.button === 0 && ($.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: p }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], p));
      }}
                        @dblclick=${($) => {
        $.stopPropagation(), this.removeWaypoint(e, p);
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
    var m, y;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, d = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.h : e.h, l = a / 2, c = d / 2, p = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return L`
      <g data-node-id=${e.id} transform="translate(${t}, ${n})"
         @pointerdown=${($) => this.onNodePointerDown($, e)}
         @dblclick=${($) => {
      $.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        <rect x=${-l} y=${-c} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? L`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? L`<text x=${-l} y=${-c - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && at[e.symbol] && !r ? L`<g transform="translate(${l - 17}, ${-c + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${at[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && at[e.symbol] ? L`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${at[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? L`
              <foreignObject x=${-l + 6} y=${o ? -c + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${($) => $.stopPropagation()}
                  @keydown=${($) => {
      $.stopPropagation(), $.key === "Enter" && this.commitRename(e, $.target.value), $.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${($) => this.commitRename(e, $.target.value)}
                />
              </foreignObject>` : r ? L`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${p}</text>` : o ? L`<text x=${-l + 12} y=${-c + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : L`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? L`<line x1=${-l + 8} y1=${-c + 28} x2=${l - 8} y2=${-c + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "workflow-step") ? [
      [l, 0],
      [-l, 0],
      [0, c],
      [0, -c]
    ].map(
      ([$, k]) => L`
                <circle data-handle cx=${$} cy=${k} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(A) => this.onHandlePointerDown(A, e)}>
                  <title>${r ? e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado: el actor lo usará (deriva una UI)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso, una operación externa o un RAG: el agente lo usará" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([$, k]) => L`
                <rect data-resize x=${$ * l - 6.5} y=${k * c - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${$ * k > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(A) => this.onResizePointerDown(A, e, $, k)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return L``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!e) return L``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return L`
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
        const { a: o, b: r } = this._rubber, a = Math.min(o.x, r.x), d = Math.max(o.x, r.x), l = Math.min(o.y, r.y), c = Math.max(o.y, r.y), p = this.scene.nodes.filter((m) => {
          const y = this.nodePos(m);
          return y.x >= a && y.x <= d && y.y >= l && y.y <= c;
        }).map((m) => m.id);
        this.emit("nodes-boxed", { ids: p });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", i), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return L``;
    const { a: e, b: t } = this._rubber;
    return L`
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
    re(n).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - i.left) / n, o = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return P``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return P`
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
      var c, p;
      (p = (c = l.currentTarget).hasPointerCapture) != null && p.call(c, l.pointerId) && this.onMinimapPointer(l, e, i);
    }}
      >
        <svg viewBox="0 0 ${t} ${n}">
          ${this.scene.nodes.map((l) => {
      const c = this.nodePos(l);
      return L`<rect
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
      if (!a) return L``;
      const d = this.renderEdge(r, a, [...t]);
      for (let l = 0; l < a.length - 1; l++) t.push([a[l], a[l + 1]]);
      return d;
    }), i = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (i.has(r.sourceId) || i.has(r.targetId) ? o : s).push(
        n[a]
      );
    }), P`
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
      (r) => L`
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
Y.styles = Yt`
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
j([
  pe({ attribute: !1 })
], Y.prototype, "scene", 2);
j([
  pe({ attribute: !1 })
], Y.prototype, "selectedId", 2);
j([
  pe({ attribute: !1 })
], Y.prototype, "selectedIds", 2);
j([
  pe({ type: Boolean })
], Y.prototype, "connectable", 2);
j([
  pe({ attribute: !1 })
], Y.prototype, "edgePoints", 2);
j([
  M()
], Y.prototype, "_t", 2);
j([
  M()
], Y.prototype, "_dragPos", 2);
j([
  M()
], Y.prototype, "_pendingLink", 2);
j([
  M()
], Y.prototype, "_hoverNodeId", 2);
j([
  M()
], Y.prototype, "_editingId", 2);
j([
  M()
], Y.prototype, "_spaceDown", 2);
j([
  M()
], Y.prototype, "_wpDrag", 2);
j([
  M()
], Y.prototype, "_selectedWaypoint", 2);
j([
  M()
], Y.prototype, "_resize", 2);
j([
  M()
], Y.prototype, "_rubber", 2);
Y = j([
  Zt("modux-canvas")
], Y);
const T = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function J(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function B(e, t) {
  e.edges.some((n) => n.id === t.id) || e.edges.push(t);
}
const Ae = (e) => e.trim().toLowerCase();
function sd(e, t) {
  var K, W;
  const n = { nodes: /* @__PURE__ */ new Map(), edges: [] }, i = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((g) => ({ ...g, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((g) => g.id))
  ), d = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((g) => ({ ...g, moduleId: u.id, application: !1 }))
  ), l = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((g) => ({ ...g, moduleId: u.id, application: !0 }))
  ), c = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((g) => ({ ...g, moduleId: u.id }))
  );
  for (const u of s)
    J(n, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: T.command.w,
      h: T.command.h,
      kind: "use-case",
      symbol: u.policy ? "flow" : "gear",
      fill: u.policy ? T.policy.fill : T.command.fill,
      stroke: u.policy ? T.policy.stroke : T.command.stroke,
      badge: u.policy ? "POLICY" : "COMANDO",
      tooltip: u.policy ? `${u.name} — policy de ${i.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${i.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of r)
    J(n, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: T.aggregate.w,
      h: T.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: T.aggregate.fill,
      stroke: T.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${u.name} — agregado de ${i.get(u.moduleId) ?? u.moduleId}`
    });
  const p = /* @__PURE__ */ new Map();
  for (const u of [...d, ...l])
    J(n, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: T.event.w,
      h: T.event.h,
      kind: u.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: T.event.fill,
      stroke: T.event.stroke,
      badge: u.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${u.name} — evento de ${i.get(u.moduleId) ?? u.moduleId}`
    }), p.set(Ae(u.name), u.id);
  const m = (u) => {
    if (!u || !u.trim()) return null;
    const g = p.get(Ae(u));
    if (g) return g;
    const _ = `evname:${Ae(u)}`;
    return J(n, {
      id: _,
      label: u,
      x: 0,
      y: 0,
      w: T.event.w,
      h: T.event.h,
      kind: "event-name",
      symbol: "event",
      fill: T.event.fill,
      stroke: T.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${u} — referenciado por nombre, sin evento declarado en el catálogo`
    }), _;
  }, y = (u) => {
    const g = c.find((f) => f.id === u.id) ?? c.find((f) => u.name && Ae(f.name) === Ae(u.name)), _ = (g == null ? void 0 : g.id) ?? (u.id || (u.name ? `rm:${Ae(u.name)}` : null));
    return _ ? (J(n, {
      id: _,
      label: (g == null ? void 0 : g.name) ?? u.name ?? _,
      x: 0,
      y: 0,
      w: T.readModel.w,
      h: T.readModel.h,
      kind: g ? "read-model" : "derived-read-model",
      fill: T.readModel.fill,
      stroke: T.readModel.stroke,
      dashed: !g,
      badge: "READ MODEL"
    }), _) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const g = (e.actors ?? []).find((_) => _.id === u.actorId);
    g && (J(n, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: T.actor.w,
      h: T.actor.h,
      kind: "actor",
      symbol: "person",
      fill: T.actor.fill,
      stroke: T.actor.stroke,
      badge: "ACTOR"
    }), B(n, {
      id: `es-actor:${g.id}->${u.targetId}`,
      sourceId: g.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const g = (e.agentUses ?? []).filter((I) => I.agentId === u.id), _ = (e.agentExternalUses ?? []).filter((I) => I.agentId === u.id), f = (e.agentRags ?? []).filter((I) => I.agentId === u.id);
    if (!(!g.length && !_.length && !f.length)) {
      J(n, {
        id: u.id,
        label: u.name,
        x: 0,
        y: 0,
        w: T.actor.w,
        h: T.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${u.name} — agente de IA (consume por MCP)`
      });
      for (const I of g)
        o.has(I.useCaseId) && B(n, {
          id: `es-agent:${u.id}->${I.useCaseId}`,
          sourceId: u.id,
          targetId: I.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const I of _) {
        const v = e.externalSystems.find(
          (C) => (C.useCases ?? []).some((O) => O.id === I.externalUseCaseId)
        );
        if (!v) continue;
        const b = (K = (v.useCases ?? []).find((C) => C.id === I.externalUseCaseId)) == null ? void 0 : K.name;
        J(n, {
          id: v.id,
          label: v.name,
          x: 0,
          y: 0,
          w: T.external.w,
          h: T.external.h,
          kind: "external-system",
          symbol: "component",
          fill: T.external.fill,
          stroke: T.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), B(n, {
          id: `es-agentx:${u.id}->${I.externalUseCaseId}`,
          sourceId: u.id,
          targetId: v.id,
          kind: "es-agent-external",
          label: b,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: b ? `Llama a ${b} del sistema externo` : void 0
        });
      }
      for (const I of f) {
        const v = (e.rags ?? []).find((b) => b.id === I.ragId);
        if (v) {
          J(n, {
            id: v.id,
            label: v.name,
            x: 0,
            y: 0,
            w: T.readModel.w,
            h: T.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${v.name} — base de conocimiento (retrieval)`
          }), B(n, {
            id: `es-agrag:${u.id}->${v.id}`,
            sourceId: u.id,
            targetId: v.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const b of v.sourceReadModelIds ?? []) {
            const C = y({ id: b });
            C && B(n, {
              id: `es-ragsrc:${v.id}->${C}`,
              sourceId: C,
              targetId: v.id,
              kind: "es-rag-source",
              color: "#0e7490",
              dashed: !0,
              arrow: !0,
              tooltip: "alimenta el índice"
            });
          }
        }
      }
    }
  }
  const $ = (u) => {
    const g = e.externalSystems.find((_) => _.id === u);
    return g ? (J(n, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: T.external.w,
      h: T.external.h,
      kind: "external-system",
      symbol: "component",
      fill: T.external.fill,
      stroke: T.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), g.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const g = $(u.externalSystemId);
    !g || !o.has(u.useCaseId) || B(n, {
      id: `es-extin:${g}->${u.useCaseId}`,
      sourceId: g,
      targetId: u.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const u of e.externalUseCaseCalls ?? []) {
    if (!o.has(u.sourceId)) continue;
    const g = e.externalSystems.find(
      (I) => (I.useCases ?? []).some((v) => v.id === u.targetId)
    ), _ = g ? $(g.id) : null;
    if (!_) continue;
    const f = (W = ((g == null ? void 0 : g.useCases) ?? []).find((I) => I.id === u.targetId)) == null ? void 0 : W.name;
    B(n, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: _,
      kind: "es-command-external",
      label: f,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: f ? `Llama a ${f} del sistema externo` : void 0
    });
  }
  for (const u of e.aggregateCalls ?? [])
    !o.has(u.sourceId) || !n.nodes.has(u.targetId) || B(n, {
      id: `es-write:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: u.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const k = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const u of k)
    !n.nodes.has(u.domainEventId) || !(n.nodes.has(u.sourceId) && (o.has(u.sourceId) || r.some((_) => _.id === u.sourceId) || a.has(u.sourceId))) || B(n, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const A = (u, g, _, f, I, v) => (J(n, {
    id: u,
    label: g,
    x: 0,
    y: 0,
    w: T.policy.w,
    h: T.policy.h,
    kind: _,
    symbol: "flow",
    fill: T.policy.fill,
    stroke: T.policy.stroke,
    badge: f,
    tooltip: I
  }), u), w = (u, g) => {
    const _ = m(u);
    _ && B(n, {
      id: `es-trigger:${_}->${g}`,
      sourceId: _,
      targetId: g,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, x = (u, g) => {
    !g || !o.has(g) || B(n, {
      id: `es-invoke:${u}->${g}`,
      sourceId: u,
      targetId: g,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const g = A(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    w(u.eventName, g);
    for (const _ of u.actions ?? []) {
      if (_.type === "CallUseCase" && x(g, _.useCaseId), _.type === "StartSaga" && _.sagaId) {
        const f = `saga:${_.sagaId}`;
        A(f, _.sagaId, "saga", "SAGA"), B(n, {
          id: `es-saga:${g}->${f}`,
          sourceId: g,
          targetId: f,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (_.type === "UpdateProjection" && _.projectionId) {
        const f = (e.projections ?? []).find((I) => I.id === _.projectionId);
        f && B(n, {
          id: `es-feeds:${g}->${f.id}`,
          sourceId: g,
          targetId: f.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const g = A(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const f of u.handledEventIds) {
      const I = n.nodes.has(f) ? f : null;
      I && B(n, {
        id: `es-trigger:${I}->${g}`,
        sourceId: I,
        targetId: g,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && n.nodes.has(u.sourceAggregateId) && B(n, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: g,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const _ = y({ id: u.readModelId, name: u.readModelName });
    _ && B(n, {
      id: `es-projects:${g}->${_}`,
      sourceId: g,
      targetId: _,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const _ = m(u.triggerEvent), f = y({ name: u.readModelName ?? `${u.triggerEvent}View` });
      _ && f && B(n, {
        id: `es-mat:${u.id}`,
        sourceId: _,
        targetId: f,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const g = A(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (w(u.triggerEvent, g), x(g, u.targetUseCaseId), !u.targetUseCaseId) {
      const _ = $(u.targetId), f = _ ?? `tgt:${u.targetId}`;
      !_ && i.has(u.targetId) && J(n, {
        id: f,
        label: i.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: T.module.w,
        h: T.module.h,
        kind: "module",
        symbol: "component",
        fill: T.module.fill,
        stroke: T.module.stroke,
        badge: "CONTEXTO"
      }), n.nodes.has(f) && B(n, {
        id: `es-deliver:${u.id}`,
        sourceId: g,
        targetId: f,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const g = A(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    w(u.triggerEvent, g);
    for (const f of u.steps) x(g, f.useCaseId);
    const _ = m(u.onCompletionEventName);
    _ && B(n, {
      id: `es-done:${u.id}`,
      sourceId: g,
      targetId: _,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const g = A(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    w(u.triggerEvent, g);
    for (const f of u.steps ?? []) {
      x(g, f.targetUseCaseId);
      for (const I of [f.emittedEventName, f.completionEventName]) {
        const v = m(I);
        v && B(n, {
          id: `es-wfemit:${u.id}:${v}`,
          sourceId: g,
          targetId: v,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const _ = m(u.onCompletionEventName);
    _ && B(n, {
      id: `es-done:${u.id}`,
      sourceId: g,
      targetId: _,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const E = [...n.nodes.values()], S = /* @__PURE__ */ new Map();
  for (const u of n.edges)
    S.has(u.targetId) || S.set(u.targetId, []), S.get(u.targetId).push(u.sourceId);
  const h = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Set(), N = (u) => {
    const g = h.get(u);
    if (g !== void 0) return g;
    if (R.has(u)) return 0;
    R.add(u);
    const _ = S.get(u) ?? [], f = _.length ? 1 + Math.max(..._.map(N)) : 0;
    return R.delete(u), h.set(u, f), f;
  }, H = /* @__PURE__ */ new Map();
  for (const u of E) {
    const g = t[u.id];
    if (g) {
      u.x = g.x, u.y = g.y;
      continue;
    }
    const _ = N(u.id), f = H.get(_) ?? 0;
    H.set(_, f + 1), u.x = 140 + _ * 260, u.y = 110 + f * 110;
  }
  return { nodes: E, edges: n.edges };
}
const rd = 190, od = 56, Ln = 180, ad = 56, dd = 150, ld = 44, Un = 250, Dn = 100;
function cd(e, t) {
  const n = /* @__PURE__ */ new Set(), i = (s) => {
    if (n.has(s.id)) return 0;
    n.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(i)) : 0;
    return n.delete(s.id), r;
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
  const n = [], i = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var d;
    return (d = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === a)) == null ? void 0 : d.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var A;
    const d = new Map(a.steps.map((w) => [w.id, w])), l = new Map(a.steps.map((w) => [w.id, cd(w, d)])), c = /* @__PURE__ */ new Map();
    for (const w of a.steps) {
      const x = l.get(w.id) ?? 0;
      c.set(x, (c.get(x) ?? 0) + 1);
    }
    const p = Math.max(1, ...c.values()), m = ud(e, a);
    if (m && !s.has(m.id)) {
      s.add(m.id);
      const w = t[m.id] ?? { x: 140, y: r };
      n.push({
        id: m.id,
        label: m.label,
        x: w.x,
        y: w.y,
        w: dd,
        h: ld,
        kind: m.kind,
        symbol: m.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: m.kind === "aggregate" ? "AGGREGATE" : m.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const y = t[a.id] ?? { x: 420, y: r };
    n.push({
      id: a.id,
      label: a.name,
      x: y.x,
      y: y.y,
      w: rd,
      h: od,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), m && i.push({
      id: `wft:${a.id}`,
      sourceId: m.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const $ = /* @__PURE__ */ new Map();
    let k = 0;
    for (const w of a.steps) {
      const x = l.get(w.id) ?? 0;
      k = Math.max(k, x);
      const E = $.get(x) ?? 0;
      $.set(x, E + 1);
      const S = t[w.id] ?? {
        x: y.x + (x + 1) * Un,
        y: r + (E - (c.get(x) - 1) / 2) * Dn
      }, h = o(w.targetUseCaseId);
      n.push({
        id: w.id,
        label: w.name,
        x: S.x,
        y: S.y,
        w: Ln,
        h: ad,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: h ? `→ ${h}` : "∅ sin use case",
        tooltip: `${w.name}${w.emittedEventName ? ` · emite ${w.emittedEventName}` : ""}${h ? ` · lanza ${h}` : ""}${w.completionEventName ? ` · espera ${w.completionEventName}` : ""}`
      });
      const R = (w.dependsOnStepIds ?? []).filter((N) => d.has(N));
      R.length === 0 && i.push({
        id: `wfs:${a.id}:${w.id}`,
        sourceId: a.id,
        targetId: w.id,
        kind: "workflow-start",
        label: w.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const N of R)
        i.push({
          id: `wfdep:${N}->${w.id}`,
          sourceId: N,
          targetId: w.id,
          kind: "workflow-dependency",
          label: w.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${w.name} espera a ${((A = d.get(N)) == null ? void 0 : A.name) ?? N}`
        });
    }
    if (a.onCompletionEventName) {
      const w = `done:${a.id}`, x = t[w] ?? { x: y.x + (k + 2) * Un, y: r };
      n.push({
        id: w,
        label: a.onCompletionEventName,
        x: x.x,
        y: x.y,
        w: Ln,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const E = new Set(a.steps.flatMap((h) => h.dependsOnStepIds ?? [])), S = a.steps.filter((h) => !E.has(h.id));
      for (const h of S.length ? S : [])
        i.push({
          id: `wfd:${a.id}:${h.id}`,
          sourceId: h.id,
          targetId: w,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || i.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: w,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, p + 1) * Dn + 60;
  }), { nodes: n, edges: i };
}
async function fd(e, t) {
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
var pd = Object.defineProperty, md = Object.getOwnPropertyDescriptor, z = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? md(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
  return i && s && pd(t, n, s), s;
};
const Ft = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, gd = Object.keys(Ft), wd = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], yd = ["CORE", "SUPPORTING", "GENERIC"], q = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
let U = class extends $e {
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
    return ki(this.layout[e]);
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
    this._detail = e, e !== "detail" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "rag" && (this._newContextMapKind = "module"), this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: e });
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
      case "add-agent-external-use":
        return [{ kind: "remove-agent-external-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-external-use":
        return [{ kind: "add-agent-external-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-rag":
        return [{ kind: "remove-rag", id: e.id }];
      case "remove-rag": {
        const t = (this.model.rags ?? []).find((n) => n.id === e.id);
        return t ? [
          { kind: "add-rag", id: t.id, name: t.name },
          ...(this.model.agentRags ?? []).filter((n) => n.ragId === e.id).map(
            (n) => ({
              kind: "add-agent-rag",
              sourceId: n.agentId,
              targetId: e.id
            })
          ),
          ...(t.sourceReadModelIds ?? []).map(
            (n) => ({ kind: "add-rag-source", sourceId: e.id, targetId: n })
          )
        ] : null;
      }
      case "add-agent-rag":
        return [{ kind: "remove-agent-rag", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-rag":
        return [{ kind: "add-agent-rag", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-rag-source":
        return [{ kind: "remove-rag-source", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-rag-source":
        return [{ kind: "add-rag-source", sourceId: e.sourceId, targetId: e.targetId }];
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
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const t = (this.model.projections ?? []).find((n) => n.id === e.id);
        return t && t.sourceAggregateId ? [
          {
            kind: "add-projection",
            id: t.id,
            name: t.name,
            aggregateId: t.sourceAggregateId,
            targetId: t.readModelId,
            moduleId: t.moduleId
          }
        ] : null;
      }
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
    const d = this.sceneFor(s), l = d.nodes.find((p) => p.id === t);
    if (l != null && l.parentId) {
      const p = d.nodes.find((m) => m.id === l.parentId);
      p && (a = { x: n - p.x, y: i - p.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const c = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const p = this.stepReorderCommand(t);
      if (p) {
        const m = this.inverseOf(p);
        m && c.unshift(...m), this.command(p, !1);
      }
    }
    this.pushUndoEntry(c);
  }
  onNodeResized(e) {
    var c;
    const { id: t, x: n, y: i, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((p) => p.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((c = a.sizes) == null ? void 0 : c[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...d.map((p) => ({ kind: "move-node", view: r, id: p.id, pos: a.nodes[p.id] ?? null }))
    ]);
    const l = { ...a.nodes, [t]: { x: n, y: i } };
    for (const p of d) l[p.id] = { x: p.x - n, y: p.y - i };
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
      const w = this.owningWorkflowOf(t), x = this.owningWorkflowOf(n);
      if (!w || w !== x || t === n) return;
      const E = w.steps.find((S) => S.id === n);
      if (((E == null ? void 0 : E.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: w.id,
        id: n,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = new Set((this.model.aiAgents ?? []).map((w) => w.id));
    if (o.has(t)) {
      if (new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ).has(n)) {
        (this.model.agentUses ?? []).some(
          (S) => S.agentId === t && S.useCaseId === n
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: n });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ).has(n)) {
        (this.model.agentExternalUses ?? []).some(
          (S) => S.agentId === t && S.externalUseCaseId === n
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: n });
        return;
      }
      (this.model.rags ?? []).some((E) => E.id === n) && ((this.model.agentRags ?? []).some(
        (S) => S.agentId === t && S.ragId === n
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: n }));
      return;
    }
    const r = (this.model.rags ?? []).find((w) => w.id === t);
    if (r) {
      new Set(
        this.model.modules.flatMap((x) => (x.readModels ?? []).map((E) => E.id))
      ).has(n) && !(r.sourceReadModelIds ?? []).includes(n) && this.command({ kind: "add-rag-source", sourceId: t, targetId: n });
      return;
    }
    if ((this.model.rags ?? []).some((w) => w.id === n) || o.has(n)) return;
    const a = new Set((this.model.actors ?? []).map((w) => w.id));
    if (a.has(t)) {
      const w = new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ), x = new Set(
        this.model.modules.flatMap((E) => (E.queryServices ?? []).map((S) => S.id))
      );
      if (w.has(n) || x.has(n)) {
        (this.model.actorUses ?? []).some(
          (S) => S.actorId === t && S.targetId === n
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: n });
        return;
      }
      if ((this.model.aggregates ?? []).some((E) => E.id === n)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: n });
        return;
      }
      return;
    }
    const d = (this.model.aggregates ?? []).find((w) => w.id === t);
    if (d) {
      const w = this.model.modules.flatMap((E) => E.readModels ?? []).find((E) => E.id === n);
      if (w) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.readModelId === n
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(d.name)}-${q(w.name)}`,
          name: `${w.name}Projection`,
          aggregateId: t,
          targetId: n
        });
        return;
      }
      const x = this.model.modules.find((E) => E.id === n);
      if (x) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.moduleId === n
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(d.name)}-${q(x.name)}`,
          name: `${d.name}ViewProjection`,
          aggregateId: t,
          moduleId: n,
          readModelName: `${d.name}View`
        });
        return;
      }
    }
    const l = new Set(
      this.model.modules.flatMap((w) => (w.domainEvents ?? []).map((x) => x.id))
    ), c = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((w) => w.id),
      ...this.model.modules.flatMap((w) => (w.domainServices ?? []).map((x) => x.id))
    ]), p = new Set(
      this.model.modules.flatMap((w) => (w.applicationEvents ?? []).map((x) => x.id))
    ), m = new Set(this.model.modules.flatMap((w) => (w.useCases ?? []).map((x) => x.id))), y = new Set(
      this.model.modules.flatMap((w) => (w.queryServices ?? []).map((x) => x.id))
    );
    if (m.has(t) && y.has(n)) {
      (this.model.queryCalls ?? []).some(
        (x) => x.sourceId === t && x.targetId === n
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: n });
      return;
    }
    const $ = new Set(
      this.model.externalSystems.flatMap((w) => (w.useCases ?? []).map((x) => x.id))
    );
    if (m.has(t) && $.has(n)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (x) => x.sourceId === t && x.targetId === n
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: n });
      return;
    }
    if (m.has(t) && m.has(n) && t !== n) {
      (this.model.useCaseCalls ?? []).some(
        (x) => x.sourceId === t && x.targetId === n
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: n });
      return;
    }
    if (c.has(t) && l.has(n) || m.has(t) && p.has(n)) {
      (this.model.emissions ?? []).some(
        (x) => x.sourceId === t && x.domainEventId === n
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: n });
      return;
    }
    if (l.has(t) || p.has(t)) {
      const w = p.has(t), x = this.model.modules.flatMap((g) => (w ? g.applicationEvents : g.domainEvents) ?? []).find((g) => g.id === t), E = this.model.modules.flatMap((g) => (g.useCases ?? []).map((_) => ({ u: _, module: g }))).find(({ u: g }) => g.id === n), S = this.model.modules.flatMap((g) => (g.readModels ?? []).map((_) => ({ rm: _, module: g }))).find(({ rm: g }) => g.id === n), h = this.model.modules.find((g) => g.id === n) ?? (S == null ? void 0 : S.module) ?? (E == null ? void 0 : E.module);
      if (!x || !h) return;
      const R = new Set((this.model.aggregates ?? []).map((g) => g.id)), N = new Set(
        this.model.modules.flatMap((g) => (g.domainServices ?? []).map((_) => _.id))
      ), H = (this.model.emissions ?? []).find(
        (g) => g.domainEventId === t && (w ? m.has(g.sourceId) : R.has(g.sourceId) || N.has(g.sourceId))
      );
      if (!H) {
        this.emit("modux-notice", {
          message: w ? `Declara primero qué caso de uso publica ${x.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${x.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const K = !w && R.has(H.sourceId);
      if (E) {
        if (this.model.flows.some(
          (_) => _.archetype === "TRIGGERS" && _.triggerEvent === x.name && _.targetUseCaseId === E.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(x.name)}-${q(E.u.name)}`,
          name: E.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: K ? H.sourceId : "",
          triggerDomainServiceId: !w && !K ? H.sourceId : void 0,
          triggerUseCaseId: w ? H.sourceId : void 0,
          triggerEvent: x.name,
          targetId: h.id,
          targetUseCaseId: E.u.id
        });
        return;
      }
      const W = (S == null ? void 0 : S.rm.name) ?? `${x.name}View`;
      if (this.model.flows.some(
        (g) => g.archetype === "MATERIALIZES" && g.triggerEvent === x.name && g.targetId === h.id && g.readModelName === W
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${q(x.name)}-${q(W)}`,
        name: W,
        archetype: "MATERIALIZES",
        triggerAggregateId: K ? H.sourceId : "",
        triggerDomainServiceId: !w && !K ? H.sourceId : void 0,
        triggerUseCaseId: w ? H.sourceId : void 0,
        triggerEvent: x.name,
        targetId: h.id,
        readModelName: W
      });
      return;
    }
    const k = /* @__PURE__ */ new Set([
      ...c,
      ...m,
      ...y,
      ...this.model.modules.flatMap((w) => (w.readModels ?? []).map((x) => x.id))
    ]);
    if (k.has(t) || k.has(n) || l.has(n) || p.has(n))
      return;
    const A = new Set(this.model.externalSystems.map((w) => w.id));
    if (A.has(t)) {
      new Set(
        this.model.modules.flatMap((x) => (x.useCases ?? []).map((E) => E.id))
      ).has(n) && ((this.model.externalCalls ?? []).some(
        (E) => E.externalSystemId === t && E.useCaseId === n
      ) || this.command({ kind: "add-external-call", sourceId: t, targetId: n }));
      return;
    }
    A.has(n) || a.has(n);
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
    if (this._view === "context-map" && t === "edge" && i === "projection") {
      const s = /^proj:(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-projection", id: s[1] });
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
    if (this._view === "context-map" && t === "edge" && i === "agent-external-use") {
      const s = /^mcpx:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-external-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "agent-rag") {
      const s = /^agrag:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-rag", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && t === "edge" && i === "rag-source") {
      const s = /^ragsrc:(.+)->(.+)$/.exec(n);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (t === "node" && i === "rag") {
      this._selectedId = null, this.command({ kind: "remove-rag", id: n });
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
    (n === "module" || n === "aggregate" || n === "entity" || n === "process-step" || n === "workflow" || n === "workflow-step" || n === "domain-event" || n === "read-model" || n === "domain-service" || n === "query-service" || n === "use-case" || n === "external-use-case" || n === "application-event" || n === "external-system" || n === "actor" || n === "ai-agent" || n === "rag") && this.command({ kind: "rename-element", type: n, id: t.replace(/^tgt:/, ""), name: i });
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
  addWorkflowStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.workflows ?? []).find((i) => i.id === this._selectedId), n = t ?? this.owningWorkflowOf(this._selectedId);
    n && (this.command({
      kind: "add-workflow-step",
      workflowId: n.id,
      id: `wfstep-${q(e)}`,
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
    var t, n, i, s, o, r, a, d, l, c, p, m, y, $, k, A, w, x, E, S, h, R, N, H, K, W;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${q(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: q(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${q(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${q(e)}`, name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const u = (t = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : t.id, g = this._newModuleId || u || ((n = this.model.modules[0]) == null ? void 0 : n.id);
          if (!g) return;
          this.command({ kind: "add-domain-event", id: `ev-${q(e)}`, name: e, moduleId: g });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const u = (i = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : i.id, g = this._newModuleId || u || ((s = this.model.modules[0]) == null ? void 0 : s.id);
          if (!g) return;
          this.command({ kind: "add-application-event", id: `aev-${q(e)}`, name: e, moduleId: g });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const u = (o = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : o.id, g = this._newModuleId || u || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!g) return;
          this.command({ kind: "add-domain-service", id: `ds-${q(e)}`, name: e, moduleId: g });
        } else if (this._detail === "detail" && this._newContextMapKind === "query-service") {
          const u = (a = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : a.id, g = this._newModuleId || u || ((d = this.model.modules[0]) == null ? void 0 : d.id);
          if (!g) return;
          this.command({ kind: "add-query-service", id: `qs-${q(e)}`, name: e, moduleId: g });
        } else if (this._detail === "detail" && this._newContextMapKind === "use-case") {
          const u = (l = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : l.id, g = this._newModuleId || u || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!g) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: g });
        } else if (this._detail === "detail" && this._newContextMapKind === "policy") {
          const u = (p = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : p.id, g = this._newModuleId || u || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!g) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: g, policy: !0 });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-use-case") {
          const u = (y = this.model.externalSystems.find((_) => _.id === this._selectedId)) == null ? void 0 : y.id, g = this._newExternalId || u || (($ = this.model.externalSystems[0]) == null ? void 0 : $.id);
          if (!g) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${q(e)}`,
            name: e,
            moduleId: g
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const u = (k = (this.model.aggregates ?? []).find((_) => _.id === this._selectedId)) == null ? void 0 : k.id, g = this._newAggregateId || u || ((w = (A = this.model.aggregates) == null ? void 0 : A[0]) == null ? void 0 : w.id);
          if (!g) return;
          this.command({ kind: "add-read-model", id: `rm-${q(e)}`, name: e, aggregateId: g });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${q(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const u = this._newModuleId || ((x = this.model.modules[0]) == null ? void 0 : x.id);
        if (!u) return;
        this.command({ kind: "add-aggregate", id: `agg-${q(e)}`, name: e, moduleId: u });
      } else if (this._view === "flows") {
        const u = this._newTriggerAggId || ((S = (E = this.model.aggregates) == null ? void 0 : E[0]) == null ? void 0 : S.id), g = this._newTargetId || ((h = this.model.modules[0]) == null ? void 0 : h.id), _ = this._newTriggerEvent.trim();
        if (!u || !g || !_) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: u,
          triggerEvent: _,
          targetId: g
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const u = this._newModuleId || ((R = this.model.modules[0]) == null ? void 0 : R.id);
        if (!u) return;
        this.command({
          kind: "add-process",
          id: `proc-${q(e)}`,
          name: e,
          moduleId: u,
          triggerAggregateId: this._newTriggerAggId || ((H = (N = this.model.aggregates) == null ? void 0 : N[0]) == null ? void 0 : H.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${q(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((W = (K = this.model.aggregates) == null ? void 0 : K[0]) == null ? void 0 : W.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), n = this.filteredModel();
    return e === "aggregates" ? Fi(n, t.nodes) : e === "flows" ? es(n, t.nodes) : e === "processes" ? on(n, t.nodes) : e === "workflows" ? hd(n, t.nodes) : e === "eventstorming" ? sd(n, t.nodes) : Di(n, t.nodes, this._detail === "detail", t.sizes ?? {});
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((l) => !l.parentId), i = new Set(n.map((l) => l.id)), s = {
      nodes: n,
      edges: t.edges.filter((l) => i.has(l.sourceId) && i.has(l.targetId))
    }, r = await fd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    return P`
      <div class="toolbar">
        <div class="tabs">
          ${wd.map(
      (t) => P`
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
      (t) => P`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        <div class="spacer"></div>
        ${this._multi.length ? P`
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
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._newContextMapKind === "rag" ? "Nuevo RAG…" : this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : this._newContextMapKind === "policy" ? "Nueva policy…" : this._newContextMapKind === "use-case" ? "Nuevo caso de uso…" : this._newContextMapKind === "query-service" ? "Nuevo query service…" : this._newContextMapKind === "external-use-case" ? "Nuevo caso de uso externo…" : "Nuevo read model…",
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
        ${this._view === "context-map" ? P`<select
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
              <option value="rag" ?selected=${this._newContextMapKind === "rag"}>
                RAG (base de conocimiento)
              </option>
              ${this._detail === "detail" ? P`
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
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "external-use-case" ? P`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var n;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((n = this.model.externalSystems[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "read-model" ? P`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? P`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${yd.map(
      (t) => P`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? P`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var n;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((n = this.model.modules[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? P`
              ${this._view === "flows" ? P`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => P`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return P`<option
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
              ${this._view === "flows" ? P`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var n;
        return P`<option
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? P`
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
      (t) => P`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? P`<input
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
              ${this.owningProcessOf(this._selectedId) ? P`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? P`
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
      (t) => P`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? P`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => P`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._view === "context-map" ? P`Arrastra para reordenar · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? P`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? P`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : P`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return P`
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
      (i) => P`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${Ft[i].abbr}</span>
              <span class="name">${Ft[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
U.styles = Yt`
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
z([
  pe({ attribute: !1 })
], U.prototype, "model", 2);
z([
  pe({ attribute: !1 })
], U.prototype, "layout", 2);
z([
  M()
], U.prototype, "_view", 2);
z([
  M()
], U.prototype, "_detail", 2);
z([
  M()
], U.prototype, "_relationType", 2);
z([
  M()
], U.prototype, "_relationPicker", 2);
z([
  M()
], U.prototype, "_selectedId", 2);
z([
  M()
], U.prototype, "_newName", 2);
z([
  M()
], U.prototype, "_newSubdomain", 2);
z([
  M()
], U.prototype, "_newModuleId", 2);
z([
  M()
], U.prototype, "_newContextMapKind", 2);
z([
  M()
], U.prototype, "_newAggregateId", 2);
z([
  M()
], U.prototype, "_newExternalId", 2);
z([
  M()
], U.prototype, "_newArchetype", 2);
z([
  M()
], U.prototype, "_newTriggerAggId", 2);
z([
  M()
], U.prototype, "_newTriggerEvent", 2);
z([
  M()
], U.prototype, "_newTargetId", 2);
z([
  M()
], U.prototype, "_undoStack", 2);
z([
  M()
], U.prototype, "_redoStack", 2);
z([
  M()
], U.prototype, "_newStepName", 2);
z([
  M()
], U.prototype, "_newStepType", 2);
z([
  M()
], U.prototype, "_newStepRole", 2);
z([
  M()
], U.prototype, "_newStepDeadline", 2);
z([
  M()
], U.prototype, "_editStepRole", 2);
z([
  M()
], U.prototype, "_editStepDeadline", 2);
z([
  M()
], U.prototype, "_editStepComp", 2);
z([
  M()
], U.prototype, "_newStepUseCase", 2);
z([
  M()
], U.prototype, "_newStepEmits", 2);
z([
  M()
], U.prototype, "_editStepUseCase", 2);
z([
  M()
], U.prototype, "_editStepEmits", 2);
z([
  M()
], U.prototype, "_editStepAwaits", 2);
z([
  M()
], U.prototype, "_multi", 2);
z([
  M()
], U.prototype, "_newViewName", 2);
z([
  M()
], U.prototype, "_activeViewId", 2);
U = z([
  Zt("modux-editor")
], U);
var xd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, Se = (e, t, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Id(t, n) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (i ? r(t, n, s) : r(s)) || s);
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
    return this._error ? P`<div class="status error">modux editor: ${this._error}</div>` : this._model ? P`
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(e) => this.showToast(e.detail.message, e.detail.kind ?? "info")}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? P`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : P`<div class="status">Cargando el modelo…</div>`;
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
  M()
], fe.prototype, "_model", 2);
Se([
  M()
], fe.prototype, "_layout", 2);
Se([
  M()
], fe.prototype, "_error", 2);
Se([
  M()
], fe.prototype, "_saving", 2);
Se([
  M()
], fe.prototype, "_toast", 2);
fe = Se([
  Zt("modux-editor-connected")
], fe);
export {
  $d as CONTAINER_HEADER,
  kd as CONTAINER_INSET,
  Y as ModuxCanvas,
  U as ModuxEditor,
  fe as ModuxEditorConnected,
  Fi as aggregatesScene,
  $i as containerFit,
  Ii as containerMinSize,
  Di as contextMapScene,
  Ni as flowCoherence,
  es as flowsScene,
  ki as normalizeViewLayout,
  on as processesScene,
  Mi as relationEdgeId
};
