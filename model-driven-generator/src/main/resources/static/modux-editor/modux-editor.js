const $d = 34, bd = 10;
function In(e, t = { w: 160, h: 90 }) {
  let i = t.w, n = t.h;
  for (const s of e)
    i = Math.max(i, 2 * (Math.abs(s.dx) + s.w / 2 + 10)), n = Math.max(
      n,
      2 * (34 + s.h / 2 - s.dy),
      // child's top edge below the header band
      2 * (10 + s.h / 2 + s.dy)
      // child's bottom edge above the inset
    );
  return { w: i, h: n };
}
function $n(e, t, i) {
  let n = t.w / 2, s = t.w / 2, o = t.h / 2, r = t.h / 2;
  for (const a of i)
    n = Math.max(n, -a.dx + a.w / 2 + 10), s = Math.max(s, a.dx + a.w / 2 + 10), o = Math.max(o, -a.dy + a.h / 2 + 34), r = Math.max(r, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (r - o) / 2,
    w: n + s,
    h: o + r
  };
}
function bn(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const kn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, En = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Sn = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, dt = 168, lt = 56, Hi = 34, qi = 14, Cn = 14, Fe = 108, Ke = 32, Vi = 12, Fi = 10, We = 2, An = We * Fe + (We - 1) * Vi + 2 * qi;
function Mn(e, t) {
  return `rel:${e}->${t}`;
}
function Nn(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function it(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Tn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Pn = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" },
  "query-service": { symbol: "lens", fill: "#f0f9ff", stroke: "#0284c7" },
  "external-use-case": { symbol: "usecase", fill: "#f8fafc", stroke: "#64748b" },
  "external-table": { symbol: "readmodel", fill: "#fefce8", stroke: "#a16207" },
  "api-operation": { symbol: "usecase", fill: "#eef2ff", stroke: "#4f46e5" },
  api: { symbol: "interface", fill: "#eef2ff", stroke: "#4f46e5" }
}, Rn = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Query service",
  "external-use-case": "Caso de uso externo",
  "external-table": "Tabla (legacy)",
  "api-operation": "Operación de API",
  api: "API publicada por este sistema"
};
function On(e) {
  const t = Math.max(1, Math.ceil(e / We)), i = t * Ke + (t - 1) * Fi;
  return { w: An, h: Hi + i + Cn };
}
function Un(e, t) {
  const i = e % We, n = Math.floor(e / We);
  return {
    x: -t.w / 2 + qi + i * (Fe + Vi) + Fe / 2,
    y: -t.h / 2 + Hi + n * (Ke + Fi) + Ke / 2
  };
}
function Dn(e, t, i, n, s, o) {
  const a = [
    ...(e.aggregates ?? []).filter((l) => l.moduleId === t.id).map((l) => ({ id: l.id, name: l.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "use-case", policy: l.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "query-service" })
    )
  ];
  return a.length ? Ut(i, n, a, s, o) : [{ ...n, x: i.x, y: i.y, w: dt, h: lt }];
}
function Ut(e, t, i, n, s) {
  const o = s[t.id] ?? On(i.length), r = i.map((u, m) => n[u.id] ?? Un(m, o)), a = $n(
    e,
    o,
    r.map((u) => ({ dx: u.x, dy: u.y, w: Fe, h: Ke }))
  ), l = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, c = i.map((u, m) => {
    const g = r[m], w = u.policy ? Tn : Pn[u.kind];
    return {
      id: u.id,
      label: u.name,
      kind: u.kind,
      x: e.x + g.x,
      y: e.y + g.y,
      w: Fe,
      h: Ke,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${u.policy ? "Policy" : Rn[u.kind]} ${u.name}`
    };
  });
  return [l, ...c];
}
function Ln(e, t, i = !1, n = {}) {
  const s = new Set(e.externalSystems.map((d) => d.id)), o = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && s.has(d.publishedByExternalSystemId)
  ), r = new Set(o.map((d) => d.id)), a = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1 })),
    ...(e.apis ?? []).filter((d) => !r.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0 }))
  ], l = a.flatMap((d, h) => {
    const f = t[d.ref.id] ?? it(h, a.length);
    if (d.api) {
      const E = d.ref, C = {
        id: E.id,
        label: E.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${E.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return i && E.operations.length > 0 ? Ut(
        f,
        C,
        E.operations.map(
          (D) => ({ id: D.id, name: D.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{ ...C, x: f.x, y: f.y, w: dt, h: lt }];
    }
    if (d.external) {
      const E = d.ref, C = {
        id: E.id,
        label: E.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${E.name} (sistema externo)`
      }, H = [
        ...o.filter((F) => F.publishedByExternalSystemId === E.id).map((F) => ({ id: F.id, name: F.name, kind: "api" })),
        ...i ? [
          ...(E.useCases ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-use-case" })
          ),
          ...(E.tables ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-table" })
          )
        ] : []
      ];
      return H.length > 0 ? Ut(f, C, H, t, n) : [{ ...C, x: f.x, y: f.y, w: dt, h: lt }];
    }
    const p = d.ref, v = p.subdomainType ?? "GENERIC", y = {
      id: p.id,
      label: p.name,
      kind: "module",
      symbol: "component",
      fill: kn[v],
      stroke: "#94a3b8",
      badge: v,
      tooltip: `${p.name} — subdominio ${v}`
    };
    return i ? Dn(e, p, f, y, t, n) : [{ ...y, x: f.x, y: f.y, w: dt, h: lt }];
  }), c = a.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length;
  (e.actors ?? []).forEach((d, h) => {
    const f = t[d.id] ?? it(a.length + h, c);
    l.push({
      id: d.id,
      label: d.name,
      x: f.x,
      y: f.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${d.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((d, h) => {
    const f = t[d.id] ?? it(a.length + (e.actors ?? []).length + h, c);
    l.push({
      id: d.id,
      label: d.name,
      x: f.x,
      y: f.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${d.name} (agente de IA — consume por MCP)`
    });
  });
  const u = [];
  (e.rags ?? []).forEach((d, h) => {
    const f = t[d.id] ?? it(
      a.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + h,
      c
    );
    l.push({
      id: d.id,
      label: d.name,
      x: f.x,
      y: f.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((p, v) => {
      const y = `ragcs:${d.id}:${p.uri}`, E = t[y] ?? { x: f.x + 170, y: f.y - 30 + v * 44 };
      l.push({
        id: y,
        label: p.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: E.x,
        y: E.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: p.type,
        tooltip: `${p.type}: ${p.uri}`
      }), u.push({
        id: `ragcse:${d.id}:${p.uri}`,
        sourceId: y,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), l.sort((d, h) => (d.parentId ? 1 : 0) - (h.parentId ? 1 : 0));
  const m = e.relations.map((d) => ({
    id: Mn(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? En[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), g = e.flows.map((d) => {
    var E, C, D, H, F, G;
    const h = Nn(e, d), f = i ? e.modules.find((V) => V.id === d.sourceId) : void 0, p = ((E = f == null ? void 0 : f.domainEvents) == null ? void 0 : E.find((V) => V.name === d.triggerEvent)) ?? ((C = f == null ? void 0 : f.applicationEvents) == null ? void 0 : C.find((V) => V.name === d.triggerEvent)), v = i && d.readModelName ? (H = (D = e.modules.find((V) => V.id === d.targetId)) == null ? void 0 : D.readModels) == null ? void 0 : H.find((V) => V.name === d.readModelName) : void 0, y = i && d.targetUseCaseId ? (G = (F = e.modules.find((V) => V.id === d.targetId)) == null ? void 0 : F.useCases) == null ? void 0 : G.find((V) => V.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (p == null ? void 0 : p.id) ?? d.sourceId,
      targetId: (y == null ? void 0 : y.id) ?? (v == null ? void 0 : v.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: Sn[h],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${h}`
    };
  }), w = new Set(l.map((d) => d.id)), $ = i ? (e.emissions ?? []).filter((d) => w.has(d.sourceId) && w.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], b = i ? (e.projections ?? []).map((d) => ({
    p: d,
    source: d.sourceAggregateId ?? d.sourceExternalUseCaseId ?? d.sourceExternalTableId
  })).filter(({ p: d, source: h }) => h && d.readModelId).filter(({ p: d, source: h }) => w.has(h) && w.has(d.readModelId)).map(({ p: d, source: h }) => ({
    id: `proj:${d.id}`,
    sourceId: h,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], N = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((h) => {
      const f = i && w.has(h.id) ? h.id : d.id;
      if (!w.has(f)) return [];
      const p = i && h.targetUseCaseId && w.has(h.targetUseCaseId) ? h.targetUseCaseId : h.targetModuleId && w.has(h.targetModuleId) ? h.targetModuleId : (h.targetUseCaseId && !i, null);
      return p ? [
        {
          id: `apiwire:${h.id}`,
          sourceId: f,
          targetId: p,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${h.name} la implementa ${p}`
        }
      ] : [];
    })
  ), x = i ? (e.useCaseCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], P = i ? (e.queryCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], z = i ? (e.actorUses ?? []).filter((d) => w.has(d.actorId) && w.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], _ = (e.actorExternalDependencies ?? []).filter((d) => w.has(d.actorId) && w.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), I = new Map(
    (e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ), k = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: w.has(d.targetId) ? d.targetId : I.get(d.targetId) ?? d.targetId
      })).filter(
        (d) => w.has(d.sourceId) && w.has(d.targetId) && d.sourceId !== d.targetId
      ).map((d) => [
        `xdep:${d.sourceId}->${d.targetId}`,
        {
          id: `xdep:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "ext-dep",
          color: "#64748b",
          dashed: !0,
          arrow: !0,
          tooltip: "depende de"
        }
      ])
    ).values()
  ], S = i ? (e.agentUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], W = (e.agentRags ?? []).filter((d) => w.has(d.agentId) && w.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), q = i ? (e.rags ?? []).filter((d) => w.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((h) => w.has(h)).map((h) => ({
      id: `ragsrc:${d.id}->${h}`,
      sourceId: d.id,
      targetId: h,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], B = i ? (e.agentExternalUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], X = i ? (e.externalCalls ?? []).filter((d) => w.has(d.externalSystemId) && w.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Q = i ? (e.externalUseCaseCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `extuccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [];
  return {
    nodes: l,
    edges: [
      ...m,
      ...g,
      ...$,
      ...b,
      ...N,
      ...x,
      ...P,
      ...z,
      ..._,
      ...k,
      ...S,
      ...B,
      ...W,
      ...q,
      ...u,
      ...X,
      ...Q
    ]
  };
}
const zn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Hn = 176, qn = 60, Vn = 140, Fn = 40;
function Kn(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const u = n.filter((g) => g.aggregateId === l.id).length, m = 140 + c * (170 + u * 60);
      t[l.id] = { x: r, y: m }, n.filter((g) => g.aggregateId === l.id).forEach((g, w) => {
        t[g.id] = { x: r + 60, y: m + 100 + w * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Wn(e, t) {
  const i = Kn(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const u = s.get(c.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", g = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: g.x,
      y: g.y,
      w: Hn,
      h: qn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: zn[m],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${u ? ` — módulo ${u.name} (${m})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const u = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
      w: Vn,
      h: Fn,
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
  })), l = (e.aggregateReferences ?? []).map((c, u) => ({
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
    nodes: [...o, ...r],
    edges: [...a, ...l]
  };
}
const Bn = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Gn = 150, Yn = 44, Xn = 190, jn = 56, Zn = 160, Qn = 48;
function Jn(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function es(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((u) => u.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, l) => {
    const c = 120 + l * 130, u = Bn[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const N = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : m,
        x: N.x,
        y: N.y,
        w: Gn,
        h: Yn,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const g = `flow:${a.id}`, w = t[g] ?? { x: 470, y: c };
    n.push({
      id: g,
      label: a.name,
      x: w.x,
      y: w.y,
      w: Xn,
      h: jn,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const $ = Jn(e, a), b = `tgt:${$.id}`;
    if (!o.has(b)) {
      o.add(b);
      const N = t[b] ?? { x: 790, y: c };
      n.push({
        id: b,
        label: $.label,
        x: N.x,
        y: N.y,
        w: Zn,
        h: Qn,
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
      sourceId: m,
      targetId: g,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: g,
      targetId: b,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const ts = 190, is = 56, Ct = 170, ns = 52;
function ri(e, t) {
  const i = [], n = [], s = (o) => {
    var r;
    return (r = e.modules.find((a) => a.id === o)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((o, r) => {
    const a = 140 + r * 240, l = t[o.id] ?? { x: 150, y: a };
    i.push({
      id: o.id,
      label: o.name,
      x: l.x,
      y: l.y,
      w: ts,
      h: is,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((u, m) => {
      const g = u.type === "HUMAN", w = t[u.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: u.id,
        label: u.name,
        x: w.x,
        y: w.y,
        w: Ct,
        h: ns,
        kind: "process-step",
        symbol: g ? "person" : "gear",
        fill: g ? "#fef3c7" : "#ffffff",
        stroke: g ? "#d97706" : "#64748b",
        badge: g ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${m}`,
        sourceId: c,
        targetId: u.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const $ = `comp:${u.id}`, b = t[$] ?? { x: w.x, y: w.y + 90 };
        i.push({
          id: $,
          label: u.compensationUseCaseId,
          x: b.x,
          y: b.y,
          w: Ct,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${u.id}`,
          sourceId: u.id,
          targetId: $,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = u.id;
    }), o.onCompletionEventName) {
      const u = `done:${o.id}`, m = t[u] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: u,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Ct,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${o.id}`,
        sourceId: c,
        targetId: u,
        kind: "process-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
  }), { nodes: i, edges: n };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis, Gt = ct.ShadowRoot && (ct.ShadyCSS === void 0 || ct.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yt = Symbol(), ai = /* @__PURE__ */ new WeakMap();
let Ki = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Gt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = ai.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ai.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ss = (e) => new Ki(typeof e == "string" ? e : e + "", void 0, Yt), Xt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Ki(i, e, Yt);
}, os = (e, t) => {
  if (Gt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = ct.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, di = Gt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ss(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rs, defineProperty: as, getOwnPropertyDescriptor: ds, getOwnPropertyNames: ls, getOwnPropertySymbols: cs, getPrototypeOf: us } = Object, ve = globalThis, li = ve.trustedTypes, hs = li ? li.emptyScript : "", At = ve.reactiveElementPolyfillSupport, He = (e, t) => e, mt = { toAttribute(e, t) {
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
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, jt = (e, t) => !rs(e, t), ci = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: jt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ve.litPropertyMetadata ?? (ve.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ae = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ci) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && as(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = ds(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ci;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const t = us(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const i = this.properties, n = [...ls(i), ...cs(i)];
      for (const s of n) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, s] of i) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const s = this._$Eu(i, n);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) i.unshift(di(s));
    } else t !== void 0 && i.push(di(t));
    return i;
  }
  static _$Eu(t, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((i) => i(this));
  }
  addController(t) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var i;
    (i = this._$EO) == null || i.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return os(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var n;
      return (n = i.hostConnected) == null ? void 0 : n.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var n;
      return (n = i.hostDisconnected) == null ? void 0 : n.call(i);
    });
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    var o;
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : mt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : mt;
      this._$Em = s;
      const c = l.fromAttribute(i, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? jt)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
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
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((n) => {
      var s;
      return (s = n.hostUpdated) == null ? void 0 : s.call(n);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Ae.elementStyles = [], Ae.shadowRootOptions = { mode: "open" }, Ae[He("elementProperties")] = /* @__PURE__ */ new Map(), Ae[He("finalized")] = /* @__PURE__ */ new Map(), At == null || At({ ReactiveElement: Ae }), (ve.reactiveElementVersions ?? (ve.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis, ui = (e) => e, gt = qe.trustedTypes, hi = gt ? gt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Wi = "$lit$", we = `lit$${Math.random().toFixed(9).slice(2)}$`, Bi = "?" + we, ps = `<${Bi}>`, Ee = document, Be = () => Ee.createComment(""), Ge = (e) => e === null || typeof e != "object" && typeof e != "function", Zt = Array.isArray, fs = (e) => Zt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Mt = `[ 	
\f\r]`, Oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pi = /-->/g, fi = />/g, ye = RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mi = /'/g, gi = /"/g, Gi = /^(?:script|style|textarea|title)$/i, Yi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), A = Yi(1), U = Yi(2), Ne = Symbol.for("lit-noChange"), j = Symbol.for("lit-nothing"), wi = /* @__PURE__ */ new WeakMap(), xe = Ee.createTreeWalker(Ee, 129);
function Xi(e, t) {
  if (!Zt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hi !== void 0 ? hi.createHTML(t) : t;
}
const ms = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Oe;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, u, m = -1, g = 0;
    for (; g < l.length && (r.lastIndex = g, u = r.exec(l), u !== null); ) g = r.lastIndex, r === Oe ? u[1] === "!--" ? r = pi : u[1] !== void 0 ? r = fi : u[2] !== void 0 ? (Gi.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = ye) : u[3] !== void 0 && (r = ye) : r === ye ? u[0] === ">" ? (r = s ?? Oe, m = -1) : u[1] === void 0 ? m = -2 : (m = r.lastIndex - u[2].length, c = u[1], r = u[3] === void 0 ? ye : u[3] === '"' ? gi : mi) : r === gi || r === mi ? r = ye : r === pi || r === fi ? r = Oe : (r = ye, s = void 0);
    const w = r === ye && e[a + 1].startsWith("/>") ? " " : "";
    o += r === Oe ? l + ps : m >= 0 ? (n.push(c), l.slice(0, m) + Wi + l.slice(m) + we + w) : l + we + (m === -2 ? a : w);
  }
  return [Xi(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ye {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, u] = ms(t, i);
    if (this.el = Ye.createElement(c, n), xe.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = xe.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Wi)) {
          const g = u[r++], w = s.getAttribute(m).split(we), $ = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: o, name: $[2], strings: w, ctor: $[1] === "." ? ws : $[1] === "?" ? vs : $[1] === "@" ? ys : $t }), s.removeAttribute(m);
        } else m.startsWith(we) && (l.push({ type: 6, index: o }), s.removeAttribute(m));
        if (Gi.test(s.tagName)) {
          const m = s.textContent.split(we), g = m.length - 1;
          if (g > 0) {
            s.textContent = gt ? gt.emptyScript : "";
            for (let w = 0; w < g; w++) s.append(m[w], Be()), xe.nextNode(), l.push({ type: 2, index: ++o });
            s.append(m[g], Be());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Bi) l.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(we, m + 1)) !== -1; ) l.push({ type: 7, index: o }), m += we.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Ee.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Te(e, t, i = e, n) {
  var r, a;
  if (t === Ne) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = Ge(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Te(e, s._$AS(e, t.values), s, n)), t;
}
class gs {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Ee).importNode(i, !0);
    xe.currentNode = s;
    let o = xe.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new Je(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new _s(o, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== (l == null ? void 0 : l.index) && (o = xe.nextNode(), r++);
    }
    return xe.currentNode = Ee, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Je {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = j, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = Te(this, t, i), Ge(t) ? t === j || t == null || t === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : t !== this._$AH && t !== Ne && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : fs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== j && Ge(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ee.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ye.createElement(Xi(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new gs(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = wi.get(t.strings);
    return i === void 0 && wi.set(t.strings, i = new Ye(t)), i;
  }
  k(t) {
    Zt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new Je(this.O(Be()), this.O(Be()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = ui(t).nextSibling;
      ui(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = j, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = j;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Te(this, t, i, 0), r = !Ge(t) || t !== this._$AH && t !== Ne, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = Te(this, a[n + l], i, l), c === Ne && (c = this._$AH[l]), r || (r = !Ge(c) || c !== this._$AH[l]), c === j ? t = j : t !== j && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ws extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === j ? void 0 : t;
  }
}
class vs extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== j);
  }
}
class ys extends $t {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Te(this, t, i, 0) ?? j) === Ne) return;
    const n = this._$AH, s = t === j && n !== j || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== j && (n === j || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _s {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Te(this, t);
  }
}
const Nt = qe.litHtmlPolyfillSupport;
Nt == null || Nt(Ye, Je), (qe.litHtmlVersions ?? (qe.litHtmlVersions = [])).push("3.3.3");
const xs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new Je(t.insertBefore(Be(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis;
class be extends Ae {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const t = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xs(i, this.renderRoot, this.renderOptions);
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
var zi;
be._$litElement$ = !0, be.finalized = !0, (zi = $e.litElementHydrateSupport) == null || zi.call($e, { LitElement: be });
const Tt = $e.litElementPolyfillSupport;
Tt == null || Tt({ LitElement: be });
($e.litElementVersions ?? ($e.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = { attribute: !0, type: String, converter: mt, reflect: !1, hasChanged: jt }, $s = (e = Is, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function le(e) {
  return (t, i) => typeof i == "object" ? $s(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(e) {
  return le({ ...e, state: !0, attribute: !1 });
}
var Dt = "http://www.w3.org/1999/xhtml";
const vi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Dt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function bt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), vi.hasOwnProperty(t) ? { space: vi[t], local: e } : e;
}
function bs(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Dt && t.documentElement.namespaceURI === Dt ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function ks(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function ji(e) {
  var t = bt(e);
  return (t.local ? ks : bs)(t);
}
function Es() {
}
function Jt(e) {
  return e == null ? Es : function() {
    return this.querySelector(e);
  };
}
function Ss(e) {
  typeof e != "function" && (e = Jt(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), l, c, u = 0; u < r; ++u)
      (l = o[u]) && (c = e.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[u] = c);
  return new te(n, this._parents);
}
function Cs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function As() {
  return [];
}
function Zi(e) {
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
  typeof e == "function" ? e = Ms(e) : e = Zi(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && (n.push(e.call(l, l.__data__, c, r)), s.push(l));
  return new te(n, s);
}
function Qi(e) {
  return function() {
    return this.matches(e);
  };
}
function Ji(e) {
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
  return this.select(e == null ? Rs : Ps(typeof e == "function" ? e : Ji(e)));
}
var Us = Array.prototype.filter;
function Ds() {
  return Array.from(this.children);
}
function Ls(e) {
  return function() {
    return Us.call(this.children, e);
  };
}
function zs(e) {
  return this.selectAll(e == null ? Ds : Ls(typeof e == "function" ? e : Ji(e)));
}
function Hs(e) {
  typeof e != "function" && (e = Qi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new te(n, this._parents);
}
function en(e) {
  return new Array(e.length);
}
function qs() {
  return new te(this._enter || this._groups.map(en), this._parents);
}
function wt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
wt.prototype = {
  constructor: wt,
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
function Fs(e, t, i, n, s, o) {
  for (var r = 0, a, l = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new wt(e, o[r]);
  for (; r < l; ++r)
    (a = t[r]) && (s[r] = a);
}
function Ks(e, t, i, n, s, o, r) {
  var a, l, c = /* @__PURE__ */ new Map(), u = t.length, m = o.length, g = new Array(u), w;
  for (a = 0; a < u; ++a)
    (l = t[a]) && (g[a] = w = r.call(l, l.__data__, a, t) + "", c.has(w) ? s[a] = l : c.set(w, l));
  for (a = 0; a < m; ++a)
    w = r.call(e, o[a], a, o) + "", (l = c.get(w)) ? (n[a] = l, l.__data__ = o[a], c.delete(w)) : i[a] = new wt(e, o[a]);
  for (a = 0; a < u; ++a)
    (l = t[a]) && c.get(g[a]) === l && (s[a] = l);
}
function Ws(e) {
  return e.__data__;
}
function Bs(e, t) {
  if (!arguments.length) return Array.from(this, Ws);
  var i = t ? Ks : Fs, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Vs(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = n[c], m = s[c], g = m.length, w = Gs(e.call(u, u && u.__data__, c, n)), $ = w.length, b = a[c] = new Array($), N = r[c] = new Array($), x = l[c] = new Array(g);
    i(u, m, b, N, x, w, t);
    for (var P = 0, z = 0, _, I; P < $; ++P)
      if (_ = b[P]) {
        for (P >= z && (z = P + 1); !(I = N[z]) && ++z < $; ) ;
        _._next = I || null;
      }
  }
  return r = new te(r, n), r._enter = a, r._exit = l, r;
}
function Gs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ys() {
  return new te(this._exit || this._groups.map(en), this._parents);
}
function Xs(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function js(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), l = 0; l < r; ++l)
    for (var c = i[l], u = n[l], m = c.length, g = a[l] = new Array(m), w, $ = 0; $ < m; ++$)
      (w = c[$] || u[$]) && (g[$] = w);
  for (; l < s; ++l)
    a[l] = i[l];
  return new te(a, this._parents);
}
function Zs() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function Qs(e) {
  e || (e = Js);
  function t(m, g) {
    return m && g ? e(m.__data__, g.__data__) : !m - !g;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, l = s[o] = new Array(a), c, u = 0; u < a; ++u)
      (c = r[u]) && (l[u] = c);
    l.sort(t);
  }
  return new te(s, this._parents).order();
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
function io() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var r = n[s];
      if (r) return r;
    }
  return null;
}
function no() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function so() {
  return !this.node();
}
function oo(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
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
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function ho(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function po(e, t) {
  var i = bt(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ao : ro : typeof t == "function" ? i.local ? ho : uo : i.local ? co : lo)(i, t));
}
function tn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function fo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function mo(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function go(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function wo(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? fo : typeof t == "function" ? go : mo)(e, t, i ?? "")) : Pe(this.node(), e);
}
function Pe(e, t) {
  return e.style.getPropertyValue(t) || tn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function vo(e) {
  return function() {
    delete this[e];
  };
}
function yo(e, t) {
  return function() {
    this[e] = t;
  };
}
function _o(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function xo(e, t) {
  return arguments.length > 1 ? this.each((t == null ? vo : typeof t == "function" ? _o : yo)(e, t)) : this.node()[e];
}
function nn(e) {
  return e.trim().split(/^|\s+/);
}
function ei(e) {
  return e.classList || new sn(e);
}
function sn(e) {
  this._node = e, this._names = nn(e.getAttribute("class") || "");
}
sn.prototype = {
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
function on(e, t) {
  for (var i = ei(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function rn(e, t) {
  for (var i = ei(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Io(e) {
  return function() {
    on(this, e);
  };
}
function $o(e) {
  return function() {
    rn(this, e);
  };
}
function bo(e, t) {
  return function() {
    (t.apply(this, arguments) ? on : rn)(this, e);
  };
}
function ko(e, t) {
  var i = nn(e + "");
  if (arguments.length < 2) {
    for (var n = ei(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? bo : t ? Io : $o)(i, t));
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
function Uo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Do() {
  return this.each(Uo);
}
function Lo(e) {
  var t = typeof e == "function" ? e : ji(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function zo() {
  return null;
}
function Ho(e, t) {
  var i = typeof e == "function" ? e : ji(e), n = t == null ? zo : typeof t == "function" ? t : Jt(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function qo() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Vo() {
  return this.each(qo);
}
function Fo() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ko() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Wo(e) {
  return this.select(e ? Ko : Fo);
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
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Xo(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function jo(e, t, i) {
  return function() {
    var n = this.__on, s, o = Go(t);
    if (n) {
      for (var r = 0, a = n.length; r < a; ++r)
        if ((s = n[r]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), s = { type: e.type, name: e.name, value: t, listener: o, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function Zo(e, t, i) {
  var n = Yo(e + ""), s, o = n.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, u; l < c; ++l)
        for (s = 0, u = a[l]; s < o; ++s)
          if ((r = n[s]).type === u.type && r.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = t ? jo : Xo, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function an(e, t, i) {
  var n = tn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Qo(e, t) {
  return function() {
    return an(this, e, t);
  };
}
function Jo(e, t) {
  return function() {
    return an(this, e, t.apply(this, arguments));
  };
}
function er(e, t) {
  return this.each((typeof t == "function" ? Jo : Qo)(e, t));
}
function* tr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, r; s < o; ++s)
      (r = n[s]) && (yield r);
}
var dn = [null];
function te(e, t) {
  this._groups = e, this._parents = t;
}
function et() {
  return new te([[document.documentElement]], dn);
}
function ir() {
  return this;
}
te.prototype = et.prototype = {
  constructor: te,
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
  selection: ir,
  order: Zs,
  sort: Qs,
  call: eo,
  nodes: to,
  node: io,
  size: no,
  empty: so,
  each: oo,
  attr: po,
  style: wo,
  property: xo,
  classed: ko,
  text: Ao,
  html: Po,
  raise: Oo,
  lower: Do,
  append: Lo,
  insert: Ho,
  remove: Vo,
  clone: Wo,
  datum: Bo,
  on: Zo,
  dispatch: er,
  [Symbol.iterator]: tr
};
function ae(e) {
  return typeof e == "string" ? new te([[document.querySelector(e)]], [document.documentElement]) : new te([[e]], dn);
}
function nr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function _e(e, t) {
  if (e = nr(e), t === void 0 && (t = e.currentTarget), t) {
    var i = t.ownerSVGElement || t;
    if (i.createSVGPoint) {
      var n = i.createSVGPoint();
      return n.x = e.clientX, n.y = e.clientY, n = n.matrixTransform(t.getScreenCTM().inverse()), [n.x, n.y];
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
function ti() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new ut(i);
}
function ut(e) {
  this._ = e;
}
function or(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
ut.prototype = ti.prototype = {
  constructor: ut,
  on: function(e, t) {
    var i = this._, n = or(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = rr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = yi(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = yi(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ut(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), n = 0, s, o; n < s; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], n = 0, s = o.length; n < s; ++n) o[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], s = 0, o = n.length; s < o; ++s) n[s].value.apply(t, i);
  }
};
function rr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function yi(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = sr, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Lt = { capture: !0, passive: !1 };
function zt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ar(e) {
  var t = e.document.documentElement, i = ae(e).on("dragstart.drag", zt, Lt);
  "onselectstart" in t ? i.on("selectstart.drag", zt, Lt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function dr(e, t) {
  var i = e.document.documentElement, n = ae(e).on("dragstart.drag", null);
  t && (n.on("click.drag", zt, Lt), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ii(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ln(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function tt() {
}
var Xe = 0.7, vt = 1 / Xe, Me = "\\s*([+-]?\\d+)\\s*", je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", de = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lr = /^#([0-9a-f]{3,8})$/, cr = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), ur = new RegExp(`^rgb\\(${de},${de},${de}\\)$`), hr = new RegExp(`^rgba\\(${Me},${Me},${Me},${je}\\)$`), pr = new RegExp(`^rgba\\(${de},${de},${de},${je}\\)$`), fr = new RegExp(`^hsl\\(${je},${de},${de}\\)$`), mr = new RegExp(`^hsla\\(${je},${de},${de},${je}\\)$`), _i = {
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
ii(tt, Ze, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xi,
  // Deprecated! Use color.formatHex.
  formatHex: xi,
  formatHex8: gr,
  formatHsl: wr,
  formatRgb: Ii,
  toString: Ii
});
function xi() {
  return this.rgb().formatHex();
}
function gr() {
  return this.rgb().formatHex8();
}
function wr() {
  return cn(this).formatHsl();
}
function Ii() {
  return this.rgb().formatRgb();
}
function Ze(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = lr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? $i(t) : i === 3 ? new J(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? nt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? nt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = cr.exec(e)) ? new J(t[1], t[2], t[3], 1) : (t = ur.exec(e)) ? new J(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = hr.exec(e)) ? nt(t[1], t[2], t[3], t[4]) : (t = pr.exec(e)) ? nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = fr.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, 1) : (t = mr.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, t[4]) : _i.hasOwnProperty(e) ? $i(_i[e]) : e === "transparent" ? new J(NaN, NaN, NaN, 0) : null;
}
function $i(e) {
  return new J(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function nt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new J(e, t, i, n);
}
function vr(e) {
  return e instanceof tt || (e = Ze(e)), e ? (e = e.rgb(), new J(e.r, e.g, e.b, e.opacity)) : new J();
}
function Ht(e, t, i, n) {
  return arguments.length === 1 ? vr(e) : new J(e, t, i, n ?? 1);
}
function J(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
ii(J, Ht, ln(tt, {
  brighter(e) {
    return e = e == null ? vt : Math.pow(vt, e), new J(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new J(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new J(ke(this.r), ke(this.g), ke(this.b), yt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: bi,
  // Deprecated! Use color.formatHex.
  formatHex: bi,
  formatHex8: yr,
  formatRgb: ki,
  toString: ki
}));
function bi() {
  return `#${Ie(this.r)}${Ie(this.g)}${Ie(this.b)}`;
}
function yr() {
  return `#${Ie(this.r)}${Ie(this.g)}${Ie(this.b)}${Ie((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ki() {
  const e = yt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ke(this.r)}, ${ke(this.g)}, ${ke(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function yt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ke(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ie(e) {
  return e = ke(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ei(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new oe(e, t, i, n);
}
function cn(e) {
  if (e instanceof oe) return new oe(e.h, e.s, e.l, e.opacity);
  if (e instanceof tt || (e = Ze(e)), !e) return new oe();
  if (e instanceof oe) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, l = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= l < 0.5 ? o + s : 2 - o - s, r *= 60) : a = l > 0 && l < 1 ? 0 : r, new oe(r, a, l, e.opacity);
}
function _r(e, t, i, n) {
  return arguments.length === 1 ? cn(e) : new oe(e, t, i, n ?? 1);
}
function oe(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
ii(oe, _r, ln(tt, {
  brighter(e) {
    return e = e == null ? vt : Math.pow(vt, e), new oe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new oe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new J(
      Pt(e >= 240 ? e - 240 : e + 120, s, n),
      Pt(e, s, n),
      Pt(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new oe(Si(this.h), st(this.s), st(this.l), yt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = yt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Si(this.h)}, ${st(this.s) * 100}%, ${st(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Si(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function st(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Pt(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const un = (e) => () => e;
function xr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Ir(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function $r(e) {
  return (e = +e) == 1 ? hn : function(t, i) {
    return i - t ? Ir(t, i, e) : un(isNaN(t) ? i : t);
  };
}
function hn(e, t) {
  var i = t - e;
  return i ? xr(e, i) : un(isNaN(e) ? t : e);
}
const Ci = (function e(t) {
  var i = $r(t);
  function n(s, o) {
    var r = i((s = Ht(s)).r, (o = Ht(o)).r), a = i(s.g, o.g), l = i(s.b, o.b), c = hn(s.opacity, o.opacity);
    return function(u) {
      return s.r = r(u), s.g = a(u), s.b = l(u), s.opacity = c(u), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function ge(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var qt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Rt = new RegExp(qt.source, "g");
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
  var i = qt.lastIndex = Rt.lastIndex = 0, n, s, o, r = -1, a = [], l = [];
  for (e = e + "", t = t + ""; (n = qt.exec(e)) && (s = Rt.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, l.push({ i: r, x: ge(n, s) })), i = Rt.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? l[0] ? kr(l[0].x) : br(t) : (t = l.length, function(c) {
    for (var u = 0, m; u < t; ++u) a[(m = l[u]).i] = m.x(c);
    return a.join("");
  });
}
var Ai = 180 / Math.PI, Vt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function pn(e, t, i, n, s, o) {
  var r, a, l;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (l = e * i + t * n) && (i -= e * l, n -= t * l), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, l /= a), e * n < t * i && (e = -e, t = -t, l = -l, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * Ai,
    skewX: Math.atan(l) * Ai,
    scaleX: r,
    scaleY: a
  };
}
var ot;
function Sr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Vt : pn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Cr(e) {
  return e == null || (ot || (ot = document.createElementNS("http://www.w3.org/2000/svg", "g")), ot.setAttribute("transform", e), !(e = ot.transform.baseVal.consolidate())) ? Vt : (e = e.matrix, pn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fn(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, m, g, w, $) {
    if (c !== m || u !== g) {
      var b = w.push("translate(", null, t, null, i);
      $.push({ i: b - 4, x: ge(c, m) }, { i: b - 2, x: ge(u, g) });
    } else (m || g) && w.push("translate(" + m + t + g + i);
  }
  function r(c, u, m, g) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), g.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: ge(c, u) })) : u && m.push(s(m) + "rotate(" + u + n);
  }
  function a(c, u, m, g) {
    c !== u ? g.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: ge(c, u) }) : u && m.push(s(m) + "skewX(" + u + n);
  }
  function l(c, u, m, g, w, $) {
    if (c !== m || u !== g) {
      var b = w.push(s(w) + "scale(", null, ",", null, ")");
      $.push({ i: b - 4, x: ge(c, m) }, { i: b - 2, x: ge(u, g) });
    } else (m !== 1 || g !== 1) && w.push(s(w) + "scale(" + m + "," + g + ")");
  }
  return function(c, u) {
    var m = [], g = [];
    return c = e(c), u = e(u), o(c.translateX, c.translateY, u.translateX, u.translateY, m, g), r(c.rotate, u.rotate, m, g), a(c.skewX, u.skewX, m, g), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, m, g), c = u = null, function(w) {
      for (var $ = -1, b = g.length, N; ++$ < b; ) m[(N = g[$]).i] = N.x(w);
      return m.join("");
    };
  };
}
var Ar = fn(Sr, "px, ", "px)", "deg)"), Mr = fn(Cr, ", ", ")", ")"), Nr = 1e-12;
function Mi(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Tr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Pr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Rr = (function e(t, i, n) {
  function s(o, r) {
    var a = o[0], l = o[1], c = o[2], u = r[0], m = r[1], g = r[2], w = u - a, $ = m - l, b = w * w + $ * $, N, x;
    if (b < Nr)
      x = Math.log(g / c) / t, N = function(S) {
        return [
          a + S * w,
          l + S * $,
          c * Math.exp(t * S * x)
        ];
      };
    else {
      var P = Math.sqrt(b), z = (g * g - c * c + n * b) / (2 * c * i * P), _ = (g * g - c * c - n * b) / (2 * g * i * P), I = Math.log(Math.sqrt(z * z + 1) - z), k = Math.log(Math.sqrt(_ * _ + 1) - _);
      x = (k - I) / t, N = function(S) {
        var W = S * x, q = Mi(I), B = c / (i * P) * (q * Pr(t * W + I) - Tr(I));
        return [
          a + B * w,
          l + B * $,
          c * q / Mi(t * W + I)
        ];
      };
    }
    return N.duration = x * 1e3 * t / Math.SQRT2, N;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, l = a * a;
    return e(r, a, l);
  }, s;
})(Math.SQRT2, 2, 4);
var Re = 0, Le = 0, Ue = 0, mn = 1e3, _t, ze, xt = 0, Se = 0, kt = 0, Qe = typeof performance == "object" && performance.now ? performance : Date, gn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ni() {
  return Se || (gn(Or), Se = Qe.now() + kt);
}
function Or() {
  Se = 0;
}
function It() {
  this._call = this._time = this._next = null;
}
It.prototype = wn.prototype = {
  constructor: It,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ni() : +i) + (t == null ? 0 : +t), !this._next && ze !== this && (ze ? ze._next = this : _t = this, ze = this), this._call = e, this._time = i, Ft();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ft());
  }
};
function wn(e, t, i) {
  var n = new It();
  return n.restart(e, t, i), n;
}
function Ur() {
  ni(), ++Re;
  for (var e = _t, t; e; )
    (t = Se - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Re;
}
function Ni() {
  Se = (xt = Qe.now()) + kt, Re = Le = 0;
  try {
    Ur();
  } finally {
    Re = 0, Lr(), Se = 0;
  }
}
function Dr() {
  var e = Qe.now(), t = e - xt;
  t > mn && (kt -= t, xt = e);
}
function Lr() {
  for (var e, t = _t, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : _t = i);
  ze = e, Ft(n);
}
function Ft(e) {
  if (!Re) {
    Le && (Le = clearTimeout(Le));
    var t = e - Se;
    t > 24 ? (e < 1 / 0 && (Le = setTimeout(Ni, e - Qe.now() - kt)), Ue && (Ue = clearInterval(Ue))) : (Ue || (xt = Qe.now(), Ue = setInterval(Dr, mn)), Re = 1, gn(Ni));
  }
}
function Ti(e, t, i) {
  var n = new It();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var zr = ti("start", "end", "cancel", "interrupt"), Hr = [], vn = 0, Pi = 1, Kt = 2, ht = 3, Ri = 4, Wt = 5, pt = 6;
function Et(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  qr(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: zr,
    tween: Hr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: vn
  });
}
function si(e, t) {
  var i = re(e, t);
  if (i.state > vn) throw new Error("too late; already scheduled");
  return i;
}
function ce(e, t) {
  var i = re(e, t);
  if (i.state > ht) throw new Error("too late; already running");
  return i;
}
function re(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function qr(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = wn(o, 0, i.time);
  function o(c) {
    i.state = Pi, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var u, m, g, w;
    if (i.state !== Pi) return l();
    for (u in n)
      if (w = n[u], w.name === i.name) {
        if (w.state === ht) return Ti(r);
        w.state === Ri ? (w.state = pt, w.timer.stop(), w.on.call("interrupt", e, e.__data__, w.index, w.group), delete n[u]) : +u < t && (w.state = pt, w.timer.stop(), w.on.call("cancel", e, e.__data__, w.index, w.group), delete n[u]);
      }
    if (Ti(function() {
      i.state === ht && (i.state = Ri, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = Kt, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Kt) {
      for (i.state = ht, s = new Array(g = i.tween.length), u = 0, m = -1; u < g; ++u)
        (w = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = w);
      s.length = m + 1;
    }
  }
  function a(c) {
    for (var u = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = Wt, 1), m = -1, g = s.length; ++m < g; )
      s[m].call(e, u);
    i.state === Wt && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = pt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function ft(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > Kt && n.state < Wt, n.state = pt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function Vr(e) {
  return this.each(function() {
    ft(this, e);
  });
}
function Fr(e, t) {
  var i, n;
  return function() {
    var s = ce(this, e), o = s.tween;
    if (o !== i) {
      n = i = o;
      for (var r = 0, a = n.length; r < a; ++r)
        if (n[r].name === t) {
          n = n.slice(), n.splice(r, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function Kr(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = ce(this, e), r = o.tween;
    if (r !== n) {
      s = (n = r).slice();
      for (var a = { name: t, value: i }, l = 0, c = s.length; l < c; ++l)
        if (s[l].name === t) {
          s[l] = a;
          break;
        }
      l === c && s.push(a);
    }
    o.tween = s;
  };
}
function Wr(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = re(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Fr : Kr)(i, e, t));
}
function oi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = ce(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return re(s, n).value[t];
  };
}
function yn(e, t) {
  var i;
  return (typeof t == "number" ? ge : t instanceof Ze ? Ci : (i = Ze(t)) ? (t = i, Ci) : Er)(e, t);
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
function Yr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Xr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function jr(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), l = a + "", r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a)));
  };
}
function Zr(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), l = a + "", r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a)));
  };
}
function Qr(e, t) {
  var i = bt(e), n = i === "transform" ? Mr : yn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Zr : jr)(i, n, oi(this, "attr." + e, t)) : t == null ? (i.local ? Gr : Br)(i) : (i.local ? Xr : Yr)(i, n, t));
}
function Jr(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function ea(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function ta(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && ea(e, o)), i;
  }
  return s._value = t, s;
}
function ia(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Jr(e, o)), i;
  }
  return s._value = t, s;
}
function na(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = bt(e);
  return this.tween(i, (n.local ? ta : ia)(n, t));
}
function sa(e, t) {
  return function() {
    si(this, e).delay = +t.apply(this, arguments);
  };
}
function oa(e, t) {
  return t = +t, function() {
    si(this, e).delay = t;
  };
}
function ra(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? sa : oa)(t, e)) : re(this.node(), t).delay;
}
function aa(e, t) {
  return function() {
    ce(this, e).duration = +t.apply(this, arguments);
  };
}
function da(e, t) {
  return t = +t, function() {
    ce(this, e).duration = t;
  };
}
function la(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? aa : da)(t, e)) : re(this.node(), t).duration;
}
function ca(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    ce(this, e).ease = t;
  };
}
function ua(e) {
  var t = this._id;
  return arguments.length ? this.each(ca(t, e)) : re(this.node(), t).ease;
}
function ha(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    ce(this, e).ease = i;
  };
}
function pa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ha(this._id, e));
}
function fa(e) {
  typeof e != "function" && (e = Qi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new me(n, this._parents, this._name, this._id);
}
function ma(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var l = t[a], c = i[a], u = l.length, m = r[a] = new Array(u), g, w = 0; w < u; ++w)
      (g = l[w] || c[w]) && (m[w] = g);
  for (; a < n; ++a)
    r[a] = t[a];
  return new me(r, this._parents, this._name, this._id);
}
function ga(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function wa(e, t, i) {
  var n, s, o = ga(t) ? si : ce;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function va(e, t) {
  var i = this._id;
  return arguments.length < 2 ? re(this.node(), i).on.on(e) : this.each(wa(i, e, t));
}
function ya(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function _a() {
  return this.on("end.remove", ya(this._id));
}
function xa(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Jt(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], l = a.length, c = o[r] = new Array(l), u, m, g = 0; g < l; ++g)
      (u = a[g]) && (m = e.call(u, u.__data__, g, a)) && ("__data__" in u && (m.__data__ = u.__data__), c[g] = m, Et(c[g], t, i, g, c, re(u, i)));
  return new me(o, this._parents, t, i);
}
function Ia(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Zi(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var l = n[a], c = l.length, u, m = 0; m < c; ++m)
      if (u = l[m]) {
        for (var g = e.call(u, u.__data__, m, l), w, $ = re(u, i), b = 0, N = g.length; b < N; ++b)
          (w = g[b]) && Et(w, t, i, b, g, $);
        o.push(g), r.push(u);
      }
  return new me(o, r, t, i);
}
var $a = et.prototype.constructor;
function ba() {
  return new $a(this._groups, this._parents);
}
function ka(e, t) {
  var i, n, s;
  return function() {
    var o = Pe(this, e), r = (this.style.removeProperty(e), Pe(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function _n(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ea(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = Pe(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Sa(e, t, i) {
  var n, s, o;
  return function() {
    var r = Pe(this, e), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(e), Pe(this, e))), r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a));
  };
}
function Ca(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var l = ce(this, e), c = l.on, u = l.value[o] == null ? a || (a = _n(t)) : void 0;
    (c !== i || s !== u) && (n = (i = c).copy()).on(r, s = u), l.on = n;
  };
}
function Aa(e, t, i) {
  var n = (e += "") == "transform" ? Ar : yn;
  return t == null ? this.styleTween(e, ka(e, n)).on("end.style." + e, _n(e)) : typeof t == "function" ? this.styleTween(e, Sa(e, n, oi(this, "style." + e, t))).each(Ca(this._id, e)) : this.styleTween(e, Ea(e, n, t), i).on("end.style." + e, null);
}
function Ma(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Na(e, t, i) {
  var n, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Ma(e, r, i)), n;
  }
  return o._value = t, o;
}
function Ta(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Na(e, t, i ?? ""));
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
  return this.tween("text", typeof e == "function" ? Ra(oi(this, "text", e)) : Pa(e == null ? "" : e + ""));
}
function Ua(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Da(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && Ua(s)), t;
  }
  return n._value = e, n;
}
function La(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Da(e));
}
function za() {
  for (var e = this._name, t = this._id, i = xn(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, l, c = 0; c < a; ++c)
      if (l = r[c]) {
        var u = re(l, t);
        Et(l, e, i, c, r, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new me(n, this._parents, e, i);
}
function Ha() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, l = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = ce(this, n), u = c.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var qa = 0;
function me(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function xn() {
  return ++qa;
}
var pe = et.prototype;
me.prototype = {
  constructor: me,
  select: xa,
  selectAll: Ia,
  selectChild: pe.selectChild,
  selectChildren: pe.selectChildren,
  filter: fa,
  merge: ma,
  selection: ba,
  transition: za,
  call: pe.call,
  nodes: pe.nodes,
  node: pe.node,
  size: pe.size,
  empty: pe.empty,
  each: pe.each,
  on: va,
  attr: Qr,
  attrTween: na,
  style: Aa,
  styleTween: Ta,
  text: Oa,
  textTween: La,
  remove: _a,
  tween: Wr,
  delay: ra,
  duration: la,
  ease: ua,
  easeVarying: pa,
  end: Ha,
  [Symbol.iterator]: pe[Symbol.iterator]
};
function Va(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Fa = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Va
};
function Ka(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Wa(e) {
  var t, i;
  e instanceof me ? (t = e._id, e = e._name) : (t = xn(), (i = Fa).time = ni(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && Et(l, e, t, c, r, i || Ka(l, t));
  return new me(n, this._parents, e, t);
}
et.prototype.interrupt = Vr;
et.prototype.transition = Wa;
const rt = (e) => () => e;
function Ba(e, {
  sourceEvent: t,
  target: i,
  transform: n,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function fe(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
fe.prototype = {
  constructor: fe,
  scale: function(e) {
    return e === 1 ? this : new fe(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new fe(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Ve = new fe(1, 0, 0);
fe.prototype;
function Ot(e) {
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
function Oi() {
  return this.__zoom || Ve;
}
function Xa(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ja() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Za(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function Qa() {
  var e = Ga, t = Ya, i = Za, n = Xa, s = ja, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = Rr, c = ti("start", "zoom", "end"), u, m, g, w = 500, $ = 150, b = 0, N = 10;
  function x(h) {
    h.property("__zoom", Oi).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", q).on("dblclick.zoom", B).filter(s).on("touchstart.zoom", X).on("touchmove.zoom", Q).on("touchend.zoom touchcancel.zoom", d).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(h, f, p, v) {
    var y = h.selection ? h.selection() : h;
    y.property("__zoom", Oi), h !== y ? I(h, f, p, v) : y.interrupt().each(function() {
      k(this, arguments).event(v).start().zoom(null, typeof f == "function" ? f.apply(this, arguments) : f).end();
    });
  }, x.scaleBy = function(h, f, p, v) {
    x.scaleTo(h, function() {
      var y = this.__zoom.k, E = typeof f == "function" ? f.apply(this, arguments) : f;
      return y * E;
    }, p, v);
  }, x.scaleTo = function(h, f, p, v) {
    x.transform(h, function() {
      var y = t.apply(this, arguments), E = this.__zoom, C = p == null ? _(y) : typeof p == "function" ? p.apply(this, arguments) : p, D = E.invert(C), H = typeof f == "function" ? f.apply(this, arguments) : f;
      return i(z(P(E, H), C, D), y, r);
    }, p, v);
  }, x.translateBy = function(h, f, p, v) {
    x.transform(h, function() {
      return i(this.__zoom.translate(
        typeof f == "function" ? f.apply(this, arguments) : f,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), t.apply(this, arguments), r);
    }, null, v);
  }, x.translateTo = function(h, f, p, v, y) {
    x.transform(h, function() {
      var E = t.apply(this, arguments), C = this.__zoom, D = v == null ? _(E) : typeof v == "function" ? v.apply(this, arguments) : v;
      return i(Ve.translate(D[0], D[1]).scale(C.k).translate(
        typeof f == "function" ? -f.apply(this, arguments) : -f,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), E, r);
    }, v, y);
  };
  function P(h, f) {
    return f = Math.max(o[0], Math.min(o[1], f)), f === h.k ? h : new fe(f, h.x, h.y);
  }
  function z(h, f, p) {
    var v = f[0] - p[0] * h.k, y = f[1] - p[1] * h.k;
    return v === h.x && y === h.y ? h : new fe(h.k, v, y);
  }
  function _(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function I(h, f, p, v) {
    h.on("start.zoom", function() {
      k(this, arguments).event(v).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(v).end();
    }).tween("zoom", function() {
      var y = this, E = arguments, C = k(y, E).event(v), D = t.apply(y, E), H = p == null ? _(D) : typeof p == "function" ? p.apply(y, E) : p, F = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), G = y.__zoom, V = typeof f == "function" ? f.apply(y, E) : f, ue = l(G.invert(H).concat(F / G.k), V.invert(H).concat(F / V.k));
      return function(se) {
        if (se === 1) se = V;
        else {
          var he = ue(se), St = F / he[2];
          se = new fe(St, H[0] - he[0] * St, H[1] - he[1] * St);
        }
        C.zoom(null, se);
      };
    });
  }
  function k(h, f, p) {
    return !p && h.__zooming || new S(h, f);
  }
  function S(h, f) {
    this.that = h, this.args = f, this.active = 0, this.sourceEvent = null, this.extent = t.apply(h, f), this.taps = 0;
  }
  S.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, f) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = f.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = f.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = f.invert(this.touch1[0])), this.that.__zoom = f, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var f = ae(this.that).datum();
      c.call(
        h,
        this.that,
        new Ba(h, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: c
        }),
        f
      );
    }
  };
  function W(h, ...f) {
    if (!e.apply(this, arguments)) return;
    var p = k(this, f).event(h), v = this.__zoom, y = Math.max(o[0], Math.min(o[1], v.k * Math.pow(2, n.apply(this, arguments)))), E = _e(h);
    if (p.wheel)
      (p.mouse[0][0] !== E[0] || p.mouse[0][1] !== E[1]) && (p.mouse[1] = v.invert(p.mouse[0] = E)), clearTimeout(p.wheel);
    else {
      if (v.k === y) return;
      p.mouse = [E, v.invert(E)], ft(this), p.start();
    }
    De(h), p.wheel = setTimeout(C, $), p.zoom("mouse", i(z(P(v, y), p.mouse[0], p.mouse[1]), p.extent, r));
    function C() {
      p.wheel = null, p.end();
    }
  }
  function q(h, ...f) {
    if (g || !e.apply(this, arguments)) return;
    var p = h.currentTarget, v = k(this, f, !0).event(h), y = ae(h.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", F, !0), E = _e(h, p), C = h.clientX, D = h.clientY;
    ar(h.view), Ot(h), v.mouse = [E, this.__zoom.invert(E)], ft(this), v.start();
    function H(G) {
      if (De(G), !v.moved) {
        var V = G.clientX - C, ue = G.clientY - D;
        v.moved = V * V + ue * ue > b;
      }
      v.event(G).zoom("mouse", i(z(v.that.__zoom, v.mouse[0] = _e(G, p), v.mouse[1]), v.extent, r));
    }
    function F(G) {
      y.on("mousemove.zoom mouseup.zoom", null), dr(G.view, v.moved), De(G), v.event(G).end();
    }
  }
  function B(h, ...f) {
    if (e.apply(this, arguments)) {
      var p = this.__zoom, v = _e(h.changedTouches ? h.changedTouches[0] : h, this), y = p.invert(v), E = p.k * (h.shiftKey ? 0.5 : 2), C = i(z(P(p, E), v, y), t.apply(this, f), r);
      De(h), a > 0 ? ae(this).transition().duration(a).call(I, C, v, h) : ae(this).call(x.transform, C, v, h);
    }
  }
  function X(h, ...f) {
    if (e.apply(this, arguments)) {
      var p = h.touches, v = p.length, y = k(this, f, h.changedTouches.length === v).event(h), E, C, D, H;
      for (Ot(h), C = 0; C < v; ++C)
        D = p[C], H = _e(D, this), H = [H, this.__zoom.invert(H), D.identifier], y.touch0 ? !y.touch1 && y.touch0[2] !== H[2] && (y.touch1 = H, y.taps = 0) : (y.touch0 = H, E = !0, y.taps = 1 + !!u);
      u && (u = clearTimeout(u)), E && (y.taps < 2 && (m = H[0], u = setTimeout(function() {
        u = null;
      }, w)), ft(this), y.start());
    }
  }
  function Q(h, ...f) {
    if (this.__zooming) {
      var p = k(this, f).event(h), v = h.changedTouches, y = v.length, E, C, D, H;
      for (De(h), E = 0; E < y; ++E)
        C = v[E], D = _e(C, this), p.touch0 && p.touch0[2] === C.identifier ? p.touch0[0] = D : p.touch1 && p.touch1[2] === C.identifier && (p.touch1[0] = D);
      if (C = p.that.__zoom, p.touch1) {
        var F = p.touch0[0], G = p.touch0[1], V = p.touch1[0], ue = p.touch1[1], se = (se = V[0] - F[0]) * se + (se = V[1] - F[1]) * se, he = (he = ue[0] - G[0]) * he + (he = ue[1] - G[1]) * he;
        C = P(C, Math.sqrt(se / he)), D = [(F[0] + V[0]) / 2, (F[1] + V[1]) / 2], H = [(G[0] + ue[0]) / 2, (G[1] + ue[1]) / 2];
      } else if (p.touch0) D = p.touch0[0], H = p.touch0[1];
      else return;
      p.zoom("touch", i(z(C, D, H), p.extent, r));
    }
  }
  function d(h, ...f) {
    if (this.__zooming) {
      var p = k(this, f).event(h), v = h.changedTouches, y = v.length, E, C;
      for (Ot(h), g && clearTimeout(g), g = setTimeout(function() {
        g = null;
      }, w), E = 0; E < y; ++E)
        C = v[E], p.touch0 && p.touch0[2] === C.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === C.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && (C = _e(C, this), Math.hypot(m[0] - C[0], m[1] - C[1]) < N)) {
        var D = ae(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : rt(+h), x) : n;
  }, x.filter = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : rt(!!h), x) : e;
  }, x.touchable = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : rt(!!h), x) : s;
  }, x.extent = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : rt([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), x) : t;
  }, x.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], x) : [o[0], o[1]];
  }, x.translateExtent = function(h) {
    return arguments.length ? (r[0][0] = +h[0][0], r[1][0] = +h[1][0], r[0][1] = +h[0][1], r[1][1] = +h[1][1], x) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, x.constrain = function(h) {
    return arguments.length ? (i = h, x) : i;
  }, x.duration = function(h) {
    return arguments.length ? (a = +h, x) : a;
  }, x.interpolate = function(h) {
    return arguments.length ? (l = h, x) : l;
  }, x.on = function() {
    var h = c.on.apply(c, arguments);
    return h === c ? x : h;
  }, x.clickDistance = function(h) {
    return arguments.length ? (b = (h = +h) * h, x) : Math.sqrt(b);
  }, x.tapDistance = function(h) {
    return arguments.length ? (N = +h, x) : N;
  }, x;
}
var Ja = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, Z = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? ed(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Ja(t, i, s), s;
};
function td(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, l = s * a - o * r;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * r) / l, u = ((i.x - e.x) * o - (i.y - e.y) * s) / l;
  return c <= 0.02 || c >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function id(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, l = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - l), t: r };
}
function nd(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, l = (r.x - o.x) / a, c = (r.y - o.y) / a, u = t.map(([g, w]) => td(o, r, g, w)).filter((g) => g !== null).filter((g) => g.t * a > i + 2 && (1 - g.t) * a > i + 2).sort((g, w) => g.t - w.t);
    let m = -1 / 0;
    for (const g of u)
      g.t * a - i <= m + 2 || (n += ` L ${g.x - l * i} ${g.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${g.x + l * i} ${g.y + c * i}`, m = g.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const at = {
  component: U`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: U`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: U`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: U`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: U`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: U`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: U`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: U`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: U`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: U`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: U`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: U`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: U`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: U`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let Y = class extends be {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ve, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
          const t = this.scene.nodes.find((i) => i.id === this.selectedId);
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
          const t = this.scene.edges.find((s) => s.id === this.selectedId), i = this.scene.nodes.find((s) => s.id === this.selectedId);
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case")
            return;
          const n = t ?? i;
          n && (e.preventDefault(), this.emit("delete-requested", {
            elementType: t ? "edge" : "node",
            id: n.id,
            kind: n.kind
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
    const i = t.trim();
    i && i !== e.label && this.emit("node-renamed", { id: e.id, kind: e.kind, name: i });
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector("svg.main");
    this._zoomBehavior = Qa().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), ae(e).call(this._zoomBehavior);
  }
  willUpdate(e) {
    var t;
    if (e.has("scene") && (this._dragPos = null, this._dragGroup = null), this._selectedWaypoint && (e.has("selectedId") || e.has("edgePoints"))) {
      const i = this._selectedWaypoint;
      this.selectedId === i.edgeId && i.index < (((t = this.edgePoints[i.edgeId]) == null ? void 0 : t.length) ?? 0) || (this._selectedWaypoint = null);
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
    const t = this.scene.nodes, i = this.renderRoot.querySelector("svg.main");
    if (!t.length || !i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return;
    const s = Math.min(...t.map((u) => u.x - u.w / 2)) - e, o = Math.max(...t.map((u) => u.x + u.w / 2)) + e, r = Math.min(...t.map((u) => u.y - u.h / 2)) - e, a = Math.max(...t.map((u) => u.y + u.h / 2)) + e, l = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), c = Ve.translate(n.width / 2 - l * (s + o) / 2, n.height / 2 - l * (r + a) / 2).scale(l);
    ae(i).call(this._zoomBehavior.transform, c);
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
    var i, n;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    if (e.parentId && this._dragPos && this._dragPos.id === e.parentId) {
      const s = this.scene.nodes.find((o) => o.id === e.parentId);
      if (s)
        return { x: e.x + (this._dragPos.x - s.x), y: e.y + (this._dragPos.y - s.y) };
    }
    if (e.parentId && ((n = this._dragGroup) != null && n.has(e.parentId))) {
      const s = this.scene.nodes.find((r) => r.id === e.parentId), o = this._dragGroup.get(e.parentId);
      if (s) return { x: e.x + (o.x - s.x), y: e.y + (o.y - s.y) };
    }
    return { x: e.x, y: e.y };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ---- node dragging ------------------------------------------------------
  /** Keep a dragged child inside its container's inner area (below the header). */
  clampToParent(e, t, i) {
    if (e.parentId) {
      const n = this.scene.nodes.find((s) => s.id === e.parentId);
      if (n) {
        const s = this.nodePos(n), o = s.x - n.w / 2 + 10 + e.w / 2, r = s.x + n.w / 2 - 10 - e.w / 2, a = s.y - n.h / 2 + 34 + e.h / 2, l = s.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), r), i = Math.min(Math.max(i, a), l);
      }
    }
    return { id: e.id, x: t, y: i };
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const o = new Set(this.selectedIds), r = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (u) => o.has(u.id) && !(u.parentId && o.has(u.parentId))
    ) : null, a = r ? new Map(r.map((u) => [u.id, this.nodePos(u)])) : null, l = (u) => {
      const m = this.toScene(u), g = m.x - i.x, w = m.y - i.y;
      if (!(!s && Math.hypot(g, w) < 3 / this._t.k))
        if (s = !0, r && a) {
          const $ = /* @__PURE__ */ new Map();
          for (const b of r) {
            const N = a.get(b.id), x = this.clampToParent(b, N.x + g, N.y + w);
            $.set(b.id, { x: x.x, y: x.y });
          }
          this._dragGroup = $;
        } else
          this._dragPos = this.clampToParent(t, n.x + g, n.y + w);
    }, c = () => {
      window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", c), s && this._dragGroup ? this.emit("nodes-moved", {
        moves: [...this._dragGroup.entries()].map(([u, m]) => ({ id: u, x: m.x, y: m.y }))
      }) : s && this._dragPos ? this.emit("node-moved", { id: t.id, x: this._dragPos.x, y: this._dragPos.y }) : e.shiftKey ? this.emit("element-multi-toggled", { id: t.id, kind: t.kind }) : this.emit("element-selected", { elementType: "node", id: t.id, kind: t.kind });
    };
    window.addEventListener("pointermove", l), window.addEventListener("pointerup", c);
  }
  // ---- container resize ----------------------------------------------------
  /**
   * Corner-handle drag resizes a container. The dragged corner follows the
   * pointer while the opposite corner stays anchored; with Shift held the
   * resize is symmetric about the centre. Children never leave the box: they
   * keep their absolute position, so each edge stops at the outermost child.
   */
  onResizePointerDown(e, t, i, n) {
    if (e.button !== 0) return;
    e.stopPropagation(), this.focus();
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((b) => b.parentId === t.id), l = Math.min(...a.map((b) => b.x - b.w / 2)), c = Math.max(...a.map((b) => b.x + b.w / 2)), u = Math.min(...a.map((b) => b.y - b.h / 2)), m = Math.max(...a.map((b) => b.y + b.h / 2)), g = In(
      a.map((b) => ({ dx: b.x - r.x, dy: b.y - r.y, w: b.w, h: b.h })),
      { w: s, h: o }
    ), w = (b) => {
      const N = this.toScene(b);
      if (b.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(g.w, 2 * Math.abs(N.x - r.x)),
          h: Math.max(g.h, 2 * Math.abs(N.y - r.y))
        };
        return;
      }
      const x = r.x - i * r.w / 2, P = r.y - n * r.h / 2, z = i > 0 ? Math.max(N.x, x + s, a.length ? c + 10 : -1 / 0) : Math.min(N.x, x - s, a.length ? l - 10 : 1 / 0), _ = n > 0 ? Math.max(N.y, P + o, a.length ? m + 10 : -1 / 0) : Math.min(N.y, P - o, a.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (x + z) / 2,
        y: (P + _) / 2,
        w: Math.abs(z - x),
        h: Math.abs(_ - P)
      };
    }, $ = () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", $), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", $);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const n = (o) => {
      var c;
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y };
      const a = (c = this.shadowRoot) == null ? void 0 : c.elementFromPoint(o.clientX, o.clientY), l = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = l ? l.getAttribute("data-node-id") : null;
    }, s = (o) => {
      var l, c;
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const r = (l = this.shadowRoot) == null ? void 0 : l.elementFromPoint(o.clientX, o.clientY), a = (c = r == null ? void 0 : r.closest("[data-node-id]")) == null ? void 0 : c.getAttribute("data-node-id");
      a && a !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: a,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), o = t - n, r = i - s, a = e.w / 2, l = e.h / 2;
    if (o === 0 && r === 0) return { x: n, y: s };
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / l);
    return { x: n + o * c, y: s + r * c };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(e) {
    const t = [e.sourceId, e.targetId].sort().join("|"), i = this.scene.edges.filter(
      (s) => [s.sourceId, s.targetId].sort().join("|") === t
    );
    return i.length < 2 ? 0 : (i.findIndex((s) => s.id === e.id) - (i.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(e) {
    const t = this.scene.nodes.find((u) => u.id === e.sourceId), i = this.scene.nodes.find((u) => u.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), r = n[0] ?? o, a = n[n.length - 1] ?? s;
    let l = this.borderPoint(t, r.x, r.y), c = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(c.x - l.x, c.y - l.y) || 1, g = -(c.y - l.y) / m * u, w = (c.x - l.x) / m * u;
        l = { x: l.x + g, y: l.y + w }, c = { x: c.x + g, y: c.y + w };
      }
    }
    return [l, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      n = !0;
      const a = this.toScene(r), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: l };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = id(t, e[n], e[n + 1]);
      s < i.dist && (i = { seg: n, dist: s });
    }
    return i.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, i) {
    const n = this.nearestSegment(t, i), s = [...this.edgePoints[e.id] ?? []];
    s.splice(n, 0, i), this._selectedWaypoint = { edgeId: e.id, index: n }, this.emit("edge-points-changed", { id: e.id, points: s });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, i) {
    if (e.button !== 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const n = this.toScene(e), s = this.nearestSegment(i, n);
    let o = !1;
    const r = (l) => {
      const c = this.toScene(l);
      if (o) {
        if (this._wpDrag) {
          const u = [...this._wpDrag.points];
          u[s] = c, this._wpDrag = { ...this._wpDrag, points: u };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const u = [...this.edgePoints[t.id] ?? []];
        u.splice(s, 0, c), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: u, index: s };
      }
    }, a = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", a), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", a);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  renderEdge(e, t, i) {
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), a = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, l = t.slice(1, -1), c = t.map((u) => `${u.x},${u.y}`).join(" ");
    return U`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${c}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(u) => {
      u.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(u) => {
      u.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(u));
    }}
              @pointerdown=${(u) => this.onEdgeHitPointerDown(u, e, t)}>
          ${e.tooltip ? U`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${nd(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}
              pointer-events="none"></path>
        ${e.label ? U`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(u) => {
      u.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(u) => {
      u.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: u.clientX,
        y: u.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${s ? l.map((u, m) => {
      var w;
      const g = ((w = this._selectedWaypoint) == null ? void 0 : w.edgeId) === e.id && this._selectedWaypoint.index === m;
      return U`
                <circle data-waypoint cx=${u.x} cy=${u.y} r=${g ? 6 : 5}
                        fill=${g ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${($) => {
        $.button === 0 && ($.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: m }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], m));
      }}
                        @dblclick=${($) => {
        $.stopPropagation(), this.removeWaypoint(e, m);
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
    var g, w;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((g = this._resize) == null ? void 0 : g.id) === e.id ? this._resize.w : e.w, l = ((w = this._resize) == null ? void 0 : w.id) === e.id ? this._resize.h : e.h, c = a / 2, u = l / 2, m = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return U`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         @pointerdown=${($) => this.onNodePointerDown($, e)}
         @dblclick=${($) => {
      $.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? U`<rect x=${-c - 4} y=${-u - 4} width=${a + 8} height=${l + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-u} width=${a} height=${l} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? U`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? U`<text x=${-c} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && at[e.symbol] && !r ? U`<g transform="translate(${c - 17}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${at[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && at[e.symbol] ? U`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${at[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? U`
              <foreignObject x=${-c + 6} y=${o ? -u + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${($) => $.stopPropagation()}
                  @keydown=${($) => {
      $.stopPropagation(), $.key === "Enter" && this.commitRename(e, $.target.value), $.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${($) => this.commitRename(e, $.target.value)}
                />
              </foreignObject>` : r ? U`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? U`<text x=${-c + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : U`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? U`<line x1=${-c + 8} y1=${-u + 28} x2=${c - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "api" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, u],
      [0, -u]
    ].map(
      ([$, b]) => U`
                <circle data-handle cx=${$} cy=${b} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(N) => this.onHandlePointerDown(N, e)}>
                  <title>${r ? e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso, una operación externa o un RAG: el agente lo usará" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo o una API (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([$, b]) => U`
                <rect data-resize x=${$ * c - 6.5} y=${b * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${$ * b > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(N) => this.onResizePointerDown(N, e, $, b)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return U``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return U``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return U`
      <line x1=${t.x} y1=${t.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let i = !1;
    const n = (o) => {
      const r = this.toScene(o);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s), i && this._rubber) {
        const { a: o, b: r } = this._rubber, a = Math.min(o.x, r.x), l = Math.max(o.x, r.x), c = Math.min(o.y, r.y), u = Math.max(o.y, r.y), m = this.scene.nodes.filter((g) => {
          const w = this.nodePos(g);
          return w.x >= a && w.x <= l && w.y >= c && w.y <= u;
        }).map((g) => g.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return U``;
    const { a: e, b: t } = this._rubber;
    return U`
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
    const i = Math.min(...t.map((r) => r.x - r.w / 2)) - e, n = Math.max(...t.map((r) => r.x + r.w / 2)) + e, s = Math.min(...t.map((r) => r.y - r.h / 2)) - e, o = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: o - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, o = Ve.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    ae(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, l = s.height / this._t.k;
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
      this.onMinimapPointer(c, e, n);
    }}
        @pointermove=${(c) => {
      var u, m;
      (m = (u = c.currentTarget).hasPointerCapture) != null && m.call(u, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const u = this.nodePos(c);
      return U`<rect
              x=${(u.x - c.w / 2 - e.minX) * n}
              y=${(u.y - c.h / 2 - e.minY) * n}
              width=${Math.max(2, c.w * n)}
              height=${Math.max(2, c.h * n)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * n}
            y=${(r - e.minY) * n}
            width=${a * n}
            height=${l * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((r) => r.color ?? "#64748b"))], t = [], i = this.scene.edges.map((r) => {
      const a = this.edgePolyline(r);
      if (!a) return U``;
      const l = this.renderEdge(r, a, [...t]);
      for (let c = 0; c < a.length - 1; c++) t.push([a[c], a[c + 1]]);
      return l;
    }), n = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (n.has(r.sourceId) || n.has(r.targetId) ? o : s).push(
        i[a]
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
      (r) => U`
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
Y.styles = Xt`
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
  le({ attribute: !1 })
], Y.prototype, "scene", 2);
Z([
  le({ attribute: !1 })
], Y.prototype, "selectedId", 2);
Z([
  le({ attribute: !1 })
], Y.prototype, "selectedIds", 2);
Z([
  le({ type: Boolean })
], Y.prototype, "connectable", 2);
Z([
  le({ attribute: !1 })
], Y.prototype, "edgePoints", 2);
Z([
  M()
], Y.prototype, "_t", 2);
Z([
  M()
], Y.prototype, "_dragPos", 2);
Z([
  M()
], Y.prototype, "_dragGroup", 2);
Z([
  M()
], Y.prototype, "_pendingLink", 2);
Z([
  M()
], Y.prototype, "_hoverNodeId", 2);
Z([
  M()
], Y.prototype, "_editingId", 2);
Z([
  M()
], Y.prototype, "_spaceDown", 2);
Z([
  M()
], Y.prototype, "_wpDrag", 2);
Z([
  M()
], Y.prototype, "_selectedWaypoint", 2);
Z([
  M()
], Y.prototype, "_resize", 2);
Z([
  M()
], Y.prototype, "_rubber", 2);
Y = Z([
  Qt("modux-canvas")
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
function ie(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function K(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ce = (e) => e.trim().toLowerCase();
function sd(e, t) {
  var q, B, X, Q;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((d) => [d.id, d.name])), s = e.modules.flatMap(
    (d) => (d.useCases ?? []).map((h) => ({ ...h, moduleId: d.id }))
  ), o = new Set(s.map((d) => d.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((d) => (d.domainServices ?? []).map((h) => h.id))
  ), l = e.modules.flatMap(
    (d) => (d.domainEvents ?? []).map((h) => ({ ...h, moduleId: d.id, application: !1 }))
  ), c = e.modules.flatMap(
    (d) => (d.applicationEvents ?? []).map((h) => ({ ...h, moduleId: d.id, application: !0 }))
  ), u = e.modules.flatMap(
    (d) => (d.readModels ?? []).map((h) => ({ ...h, moduleId: d.id }))
  );
  for (const d of s)
    ie(i, {
      id: d.id,
      label: d.name,
      x: 0,
      y: 0,
      w: T.command.w,
      h: T.command.h,
      kind: "use-case",
      symbol: d.policy ? "flow" : "gear",
      fill: d.policy ? T.policy.fill : T.command.fill,
      stroke: d.policy ? T.policy.stroke : T.command.stroke,
      badge: d.policy ? "POLICY" : "COMANDO",
      tooltip: d.policy ? `${d.name} — policy de ${n.get(d.moduleId) ?? d.moduleId} (reacción, no caso de negocio)` : `${d.name} — caso de uso de ${n.get(d.moduleId) ?? d.moduleId}`
    });
  for (const d of r)
    ie(i, {
      id: d.id,
      label: d.name,
      x: 0,
      y: 0,
      w: T.aggregate.w,
      h: T.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: T.aggregate.fill,
      stroke: T.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${d.name} — agregado de ${n.get(d.moduleId) ?? d.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const d of [...l, ...c])
    ie(i, {
      id: d.id,
      label: d.name,
      x: 0,
      y: 0,
      w: T.event.w,
      h: T.event.h,
      kind: d.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: T.event.fill,
      stroke: T.event.stroke,
      badge: d.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${d.name} — evento de ${n.get(d.moduleId) ?? d.moduleId}`
    }), m.set(Ce(d.name), d.id);
  const g = (d) => {
    if (!d || !d.trim()) return null;
    const h = m.get(Ce(d));
    if (h) return h;
    const f = `evname:${Ce(d)}`;
    return ie(i, {
      id: f,
      label: d,
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
      tooltip: `${d} — referenciado por nombre, sin evento declarado en el catálogo`
    }), f;
  }, w = (d) => {
    const h = u.find((p) => p.id === d.id) ?? u.find((p) => d.name && Ce(p.name) === Ce(d.name)), f = (h == null ? void 0 : h.id) ?? (d.id || (d.name ? `rm:${Ce(d.name)}` : null));
    return f ? (ie(i, {
      id: f,
      label: (h == null ? void 0 : h.name) ?? d.name ?? f,
      x: 0,
      y: 0,
      w: T.readModel.w,
      h: T.readModel.h,
      kind: h ? "read-model" : "derived-read-model",
      fill: T.readModel.fill,
      stroke: T.readModel.stroke,
      dashed: !h,
      badge: "READ MODEL"
    }), f) : null;
  };
  for (const d of e.actorUses ?? []) {
    if (!o.has(d.targetId)) continue;
    const h = (e.actors ?? []).find((f) => f.id === d.actorId);
    h && (ie(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: T.actor.w,
      h: T.actor.h,
      kind: "actor",
      symbol: "person",
      fill: T.actor.fill,
      stroke: T.actor.stroke,
      badge: "ACTOR"
    }), K(i, {
      id: `es-actor:${h.id}->${d.targetId}`,
      sourceId: h.id,
      targetId: d.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const d of e.aiAgents ?? []) {
    const h = (e.agentUses ?? []).filter((v) => v.agentId === d.id), f = (e.agentExternalUses ?? []).filter((v) => v.agentId === d.id), p = (e.agentRags ?? []).filter((v) => v.agentId === d.id);
    if (!(!h.length && !f.length && !p.length)) {
      ie(i, {
        id: d.id,
        label: d.name,
        x: 0,
        y: 0,
        w: T.actor.w,
        h: T.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${d.name} — agente de IA (consume por MCP)`
      });
      for (const v of h)
        o.has(v.useCaseId) && K(i, {
          id: `es-agent:${d.id}->${v.useCaseId}`,
          sourceId: d.id,
          targetId: v.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const v of f) {
        const y = e.externalSystems.find(
          (C) => (C.useCases ?? []).some((D) => D.id === v.externalUseCaseId)
        );
        if (!y) continue;
        const E = (q = (y.useCases ?? []).find((C) => C.id === v.externalUseCaseId)) == null ? void 0 : q.name;
        ie(i, {
          id: y.id,
          label: y.name,
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
        }), K(i, {
          id: `es-agentx:${d.id}->${v.externalUseCaseId}`,
          sourceId: d.id,
          targetId: y.id,
          kind: "es-agent-external",
          label: E,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: E ? `Llama a ${E} del sistema externo` : void 0
        });
      }
      for (const v of p) {
        const y = (e.rags ?? []).find((E) => E.id === v.ragId);
        if (y) {
          ie(i, {
            id: y.id,
            label: y.name,
            x: 0,
            y: 0,
            w: T.readModel.w,
            h: T.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${y.name} — base de conocimiento (retrieval)`
          }), K(i, {
            id: `es-agrag:${d.id}->${y.id}`,
            sourceId: d.id,
            targetId: y.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const E of y.sourceReadModelIds ?? []) {
            const C = w({ id: E });
            C && K(i, {
              id: `es-ragsrc:${y.id}->${C}`,
              sourceId: C,
              targetId: y.id,
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
  const $ = (d) => {
    const h = e.externalSystems.find((f) => f.id === d);
    return h ? (ie(i, {
      id: h.id,
      label: h.name,
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
    }), h.id) : null;
  };
  for (const d of e.externalCalls ?? []) {
    const h = $(d.externalSystemId);
    !h || !o.has(d.useCaseId) || K(i, {
      id: `es-extin:${h}->${d.useCaseId}`,
      sourceId: h,
      targetId: d.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const d of e.externalUseCaseCalls ?? []) {
    if (!o.has(d.sourceId)) continue;
    const h = e.externalSystems.find(
      (v) => (v.useCases ?? []).some((y) => y.id === d.targetId)
    ), f = h ? $(h.id) : null;
    if (!f) continue;
    const p = (B = ((h == null ? void 0 : h.useCases) ?? []).find((v) => v.id === d.targetId)) == null ? void 0 : B.name;
    K(i, {
      id: `es-extout:${d.sourceId}->${d.targetId}`,
      sourceId: d.sourceId,
      targetId: f,
      kind: "es-command-external",
      label: p,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: p ? `Llama a ${p} del sistema externo` : void 0
    });
  }
  for (const d of e.aggregateCalls ?? [])
    !o.has(d.sourceId) || !i.nodes.has(d.targetId) || K(i, {
      id: `es-write:${d.sourceId}->${d.targetId}`,
      sourceId: d.sourceId,
      targetId: d.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const b = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const d of b)
    !i.nodes.has(d.domainEventId) || !(i.nodes.has(d.sourceId) && (o.has(d.sourceId) || r.some((f) => f.id === d.sourceId) || a.has(d.sourceId))) || K(i, {
      id: `es-emit:${d.sourceId}->${d.domainEventId}`,
      sourceId: d.sourceId,
      targetId: d.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const N = (d, h, f, p, v, y) => (ie(i, {
    id: d,
    label: h,
    x: 0,
    y: 0,
    w: T.policy.w,
    h: T.policy.h,
    kind: f,
    symbol: "flow",
    fill: T.policy.fill,
    stroke: T.policy.stroke,
    badge: p,
    tooltip: v
  }), d), x = (d, h) => {
    const f = g(d);
    f && K(i, {
      id: `es-trigger:${f}->${h}`,
      sourceId: f,
      targetId: h,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, P = (d, h) => {
    !h || !o.has(h) || K(i, {
      id: `es-invoke:${d}->${h}`,
      sourceId: d,
      targetId: h,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const d of e.subscriptions ?? []) {
    const h = N(
      d.id,
      d.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${d.name}${d.eventName ? ` — reacciona a ${d.eventName}` : ""}${d.consumerGroup ? ` · grupo ${d.consumerGroup}` : ""}`
    );
    x(d.eventName, h);
    for (const f of d.actions ?? []) {
      if (f.type === "CallUseCase" && P(h, f.useCaseId), f.type === "StartSaga" && f.sagaId) {
        const p = `saga:${f.sagaId}`;
        N(p, f.sagaId, "saga", "SAGA"), K(i, {
          id: `es-saga:${h}->${p}`,
          sourceId: h,
          targetId: p,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (f.type === "UpdateProjection" && f.projectionId) {
        const p = (e.projections ?? []).find((v) => v.id === f.projectionId);
        p && K(i, {
          id: `es-feeds:${h}->${p.id}`,
          sourceId: h,
          targetId: p.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const d of e.projections ?? []) {
    const h = N(
      d.id,
      d.name,
      "projection",
      "PROYECCIÓN",
      `${d.name}${d.readModelName ? ` — materializa ${d.readModelName}` : ""}`
    );
    for (const v of d.handledEventIds) {
      const y = i.nodes.has(v) ? v : null;
      y && K(i, {
        id: `es-trigger:${y}->${h}`,
        sourceId: y,
        targetId: h,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    d.sourceAggregateId && i.nodes.has(d.sourceAggregateId) && K(i, {
      id: `es-state:${d.id}`,
      sourceId: d.sourceAggregateId,
      targetId: h,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const f = d.sourceExternalUseCaseId ?? d.sourceExternalTableId;
    if (f) {
      const v = e.externalSystems.find(
        (E) => (E.useCases ?? []).some((C) => C.id === f) || (E.tables ?? []).some((C) => C.id === f)
      ), y = v ? $(v.id) : null;
      if (y) {
        const E = ((X = (v.useCases ?? []).find((C) => C.id === f)) == null ? void 0 : X.name) ?? ((Q = (v.tables ?? []).find((C) => C.id === f)) == null ? void 0 : Q.name);
        K(i, {
          id: `es-poll:${d.id}`,
          sourceId: y,
          targetId: h,
          kind: "es-projects-poll",
          label: E,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: E ? `polling de ${E}` : "polling"
        });
      }
    }
    const p = w({ id: d.readModelId, name: d.readModelName });
    p && K(i, {
      id: `es-projects:${h}->${p}`,
      sourceId: h,
      targetId: p,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const d of e.flows) {
    if (d.archetype === "MATERIALIZES") {
      const f = g(d.triggerEvent), p = w({ name: d.readModelName ?? `${d.triggerEvent}View` });
      f && p && K(i, {
        id: `es-mat:${d.id}`,
        sourceId: f,
        targetId: p,
        kind: "es-materializes",
        label: d.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${d.name} [MATERIALIZES]`
      });
      continue;
    }
    const h = N(
      `flow:${d.id}`,
      d.name,
      "flow",
      `POLICY · ${d.archetype}`,
      `Flow ${d.name} [${d.archetype}]`
    );
    if (x(d.triggerEvent, h), P(h, d.targetUseCaseId), !d.targetUseCaseId) {
      const f = $(d.targetId), p = f ?? `tgt:${d.targetId}`;
      !f && n.has(d.targetId) && ie(i, {
        id: p,
        label: n.get(d.targetId) ?? d.targetId,
        x: 0,
        y: 0,
        w: T.module.w,
        h: T.module.h,
        kind: "module",
        symbol: "component",
        fill: T.module.fill,
        stroke: T.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(p) && K(i, {
        id: `es-deliver:${d.id}`,
        sourceId: h,
        targetId: p,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const d of e.processes ?? []) {
    const h = N(
      d.id,
      d.name,
      "process",
      `PROCESO${d.sla ? ` · SLA ${d.sla}` : ""}`,
      `${d.name}${d.triggerEvent ? ` — arranca con ${d.triggerEvent}` : ""}`
    );
    x(d.triggerEvent, h);
    for (const p of d.steps) P(h, p.useCaseId);
    const f = g(d.onCompletionEventName);
    f && K(i, {
      id: `es-done:${d.id}`,
      sourceId: h,
      targetId: f,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const d of e.workflows ?? []) {
    const h = N(
      d.id,
      d.name,
      "workflow",
      "WORKFLOW",
      `${d.name}${d.triggerEvent ? ` — arranca con ${d.triggerEvent}` : ""}`
    );
    x(d.triggerEvent, h);
    for (const p of d.steps ?? []) {
      P(h, p.targetUseCaseId);
      for (const v of [p.emittedEventName, p.completionEventName]) {
        const y = g(v);
        y && K(i, {
          id: `es-wfemit:${d.id}:${y}`,
          sourceId: h,
          targetId: y,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const f = g(d.onCompletionEventName);
    f && K(i, {
      id: `es-done:${d.id}`,
      sourceId: h,
      targetId: f,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const z = [...i.nodes.values()], _ = /* @__PURE__ */ new Map();
  for (const d of i.edges)
    _.has(d.targetId) || _.set(d.targetId, []), _.get(d.targetId).push(d.sourceId);
  const I = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Set(), S = (d) => {
    const h = I.get(d);
    if (h !== void 0) return h;
    if (k.has(d)) return 0;
    k.add(d);
    const f = _.get(d) ?? [], p = f.length ? 1 + Math.max(...f.map(S)) : 0;
    return k.delete(d), I.set(d, p), p;
  }, W = /* @__PURE__ */ new Map();
  for (const d of z) {
    const h = t[d.id];
    if (h) {
      d.x = h.x, d.y = h.y;
      continue;
    }
    const f = S(d.id), p = W.get(f) ?? 0;
    W.set(f, p + 1), d.x = 140 + f * 260, d.y = 110 + p * 110;
  }
  return { nodes: z, edges: i.edges };
}
const od = 190, rd = 56, Ui = 180, ad = 56, dd = 150, ld = 44, Di = 250, Li = 100;
function cd(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), r;
  };
  return n(e);
}
function ud(e, t) {
  if (t.triggerAggregateId) {
    const i = (e.aggregates ?? []).find((n) => n.id === t.triggerAggregateId);
    if (i) return { id: i.id, label: i.name, kind: "aggregate", symbol: "aggregate" };
  }
  if (t.triggerDomainServiceId) {
    const i = e.modules.flatMap((n) => n.domainServices ?? []).find((n) => n.id === t.triggerDomainServiceId);
    if (i) return { id: i.id, label: i.name, kind: "domain-service", symbol: "gear" };
  }
  if (t.triggerUseCaseId) {
    const i = e.modules.flatMap((n) => n.useCases ?? []).find((n) => n.id === t.triggerUseCaseId);
    if (i) return { id: i.id, label: i.name, kind: "use-case", symbol: "gear" };
  }
  return null;
}
function hd(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : l.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var N;
    const l = new Map(a.steps.map((x) => [x.id, x])), c = new Map(a.steps.map((x) => [x.id, cd(x, l)])), u = /* @__PURE__ */ new Map();
    for (const x of a.steps) {
      const P = c.get(x.id) ?? 0;
      u.set(P, (u.get(P) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), g = ud(e, a);
    if (g && !s.has(g.id)) {
      s.add(g.id);
      const x = t[g.id] ?? { x: 140, y: r };
      i.push({
        id: g.id,
        label: g.label,
        x: x.x,
        y: x.y,
        w: dd,
        h: ld,
        kind: g.kind,
        symbol: g.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: g.kind === "aggregate" ? "AGGREGATE" : g.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const w = t[a.id] ?? { x: 420, y: r };
    i.push({
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
    }), g && n.push({
      id: `wft:${a.id}`,
      sourceId: g.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const $ = /* @__PURE__ */ new Map();
    let b = 0;
    for (const x of a.steps) {
      const P = c.get(x.id) ?? 0;
      b = Math.max(b, P);
      const z = $.get(P) ?? 0;
      $.set(P, z + 1);
      const _ = t[x.id] ?? {
        x: w.x + (P + 1) * Di,
        y: r + (z - (u.get(P) - 1) / 2) * Li
      }, I = o(x.targetUseCaseId);
      i.push({
        id: x.id,
        label: x.name,
        x: _.x,
        y: _.y,
        w: Ui,
        h: ad,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: I ? `→ ${I}` : "∅ sin use case",
        tooltip: `${x.name}${x.emittedEventName ? ` · emite ${x.emittedEventName}` : ""}${I ? ` · lanza ${I}` : ""}${x.completionEventName ? ` · espera ${x.completionEventName}` : ""}`
      });
      const k = (x.dependsOnStepIds ?? []).filter((S) => l.has(S));
      k.length === 0 && n.push({
        id: `wfs:${a.id}:${x.id}`,
        sourceId: a.id,
        targetId: x.id,
        kind: "workflow-start",
        label: x.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const S of k)
        n.push({
          id: `wfdep:${S}->${x.id}`,
          sourceId: S,
          targetId: x.id,
          kind: "workflow-dependency",
          label: x.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${x.name} espera a ${((N = l.get(S)) == null ? void 0 : N.name) ?? S}`
        });
    }
    if (a.onCompletionEventName) {
      const x = `done:${a.id}`, P = t[x] ?? { x: w.x + (b + 2) * Di, y: r };
      i.push({
        id: x,
        label: a.onCompletionEventName,
        x: P.x,
        y: P.y,
        w: Ui,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const z = new Set(a.steps.flatMap((I) => I.dependsOnStepIds ?? [])), _ = a.steps.filter((I) => !z.has(I.id));
      for (const I of _.length ? _ : [])
        n.push({
          id: `wfd:${a.id}:${I.id}`,
          sourceId: I.id,
          targetId: x,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || n.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: x,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, m + 1) * Li + 60;
  }), { nodes: i, edges: n };
}
async function pd(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), n = new i(), o = {
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
  }, r = await n.layout(o), a = {};
  for (const l of r.children ?? [])
    a[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return a;
}
var fd = Object.defineProperty, md = Object.getOwnPropertyDescriptor, O = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? md(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && fd(t, i, s), s;
};
const Bt = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, gd = Object.keys(Bt), wd = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], vd = ["CORE", "SUPPORTING", "GENERIC"], L = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function yd(e, t) {
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
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let R = class extends be {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newExternalId = "", this._newApiId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._deletePicker = null;
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  command(e, t = !0) {
    if (t) {
      const i = this.inverseOf(e);
      i && this.pushUndoEntry(i);
    }
    this.emit("modux-command", { command: e });
  }
  viewLayout(e) {
    return bn(this.layout[e]);
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
    this._detail = e, e !== "detail" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module"), this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: e });
  }
  pushUndoEntry(e) {
    this._undoStack = [...this._undoStack.slice(-19), e], this._redoStack = [];
  }
  /** Inverses of an operation list, computed against the current state, in reverse order. */
  inversesOf(e) {
    return [...e].reverse().flatMap((t) => {
      var i;
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
          size: ((i = this.viewLayout(t.view).sizes) == null ? void 0 : i[t.id]) ?? null
        }
      ] : this.inverseOf(t) ?? [];
    });
  }
  applyOps(e) {
    for (const t of e)
      if (t.kind === "move-node") {
        const i = this.viewLayout(t.view), n = { ...i.nodes };
        t.pos ? n[t.id] = t.pos : delete n[t.id], this.writeViewLayout(t.view, { ...i, nodes: n });
      } else if (t.kind === "set-edge-points") {
        const i = this.viewLayout(t.view), n = { ...i.edges };
        t.points && t.points.length ? n[t.id] = t.points : delete n[t.id], this.writeViewLayout(t.view, { ...i, edges: n });
      } else if (t.kind === "resize-node") {
        const i = this.viewLayout(t.view), n = { ...i.sizes ?? {} };
        t.size ? n[t.id] = t.size : delete n[t.id], this.writeViewLayout(t.view, { ...i, sizes: n });
      } else
        this.command(t, !1);
  }
  /**
   * Inverse commands computed against the CURRENT model (before the command is
   * applied) — what Ctrl+Z replays. Composite where needed (e.g. removing a
   * module also drops its relations, so its inverse restores them).
   */
  inverseOf(e) {
    var t, i, n, s;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const o = this.model.relations.find(
          (r) => r.sourceId === e.sourceId && r.targetId === e.targetId
        );
        return o && o.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : null;
      }
      case "set-relation-type": {
        const o = this.model.relations.find(
          (r) => r.sourceId === e.sourceId && r.targetId === e.targetId
        );
        return o && o.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const o = this.model.modules.find((a) => a.id === e.id);
        if (!o) return null;
        const r = this.model.relations.filter(
          (a) => (a.sourceId === e.id || a.targetId === e.id) && a.type != null
        );
        return [
          { kind: "add-module", id: o.id, name: o.name, subdomainType: o.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...r.map(
            (a) => ({
              kind: "set-relation-type",
              sourceId: a.sourceId,
              targetId: a.targetId,
              type: a.type
            })
          )
        ];
      }
      case "add-aggregate":
        return [{ kind: "remove-aggregate", id: e.id }];
      case "remove-aggregate": {
        const o = (this.model.aggregates ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-aggregate", id: o.id, name: o.name, moduleId: o.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const o of this.model.modules) {
          const r = (o.queryServices ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-query-service", id: r.id, name: r.name, moduleId: o.id }];
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
      case "add-actor-external":
        return [{ kind: "remove-actor-external", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-external":
        return [{ kind: "add-actor-external", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-external-dependency":
        return [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-external-dependency":
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      case "set-api-publisher": {
        const o = (this.model.apis ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "set-api-publisher", id: e.id, targetId: o.publishedByExternalSystemId ?? "" }] : null;
      }
      case "add-actor-crud":
        return [{ kind: "remove-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-crud":
        return [{ kind: "add-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case":
        return [{ kind: "remove-use-case", id: e.id }];
      case "remove-use-case": {
        for (const o of this.model.modules) {
          const r = (o.useCases ?? []).find((a) => a.id === e.id);
          if (r)
            return [
              { kind: "add-use-case", id: r.id, name: r.name, moduleId: o.id, policy: r.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const o of this.model.externalSystems) {
          const r = (o.useCases ?? []).find((a) => a.id === e.id);
          if (r)
            return [{ kind: "add-external-use-case", id: r.id, name: r.name, moduleId: o.id }];
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
        const o = this.model.externalSystems.find((r) => r.id === e.id);
        return o ? [{ kind: "add-external-system", id: o.id, name: o.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const o = (this.model.aiAgents ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-ai-agent", id: o.id, name: o.name }] : null;
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
        const o = (this.model.rags ?? []).find((r) => r.id === e.id);
        return o ? [
          { kind: "add-rag", id: o.id, name: o.name },
          ...(this.model.agentRags ?? []).filter((r) => r.ragId === e.id).map(
            (r) => ({
              kind: "add-agent-rag",
              sourceId: r.agentId,
              targetId: e.id
            })
          ),
          ...(o.sourceReadModelIds ?? []).map(
            (r) => ({ kind: "add-rag-source", sourceId: e.id, targetId: r })
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
        const o = (this.model.actors ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-actor", id: o.id, name: o.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const o of this.model.modules) {
          const r = (o.applicationEvents ?? []).find((a) => a.id === e.id);
          if (r)
            return [{ kind: "add-application-event", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const o of this.model.modules) {
          const r = (o.domainServices ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-domain-service", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const o = (this.model.projections ?? []).find((r) => r.id === e.id);
        return o && (o.sourceAggregateId || o.sourceExternalUseCaseId || o.sourceExternalTableId) ? [
          {
            kind: "add-projection",
            id: o.id,
            name: o.name,
            aggregateId: o.sourceAggregateId,
            externalUseCaseId: o.sourceExternalUseCaseId,
            externalTableId: o.sourceExternalTableId,
            targetId: o.readModelId,
            moduleId: o.moduleId
          }
        ] : null;
      }
      case "add-external-table":
        return [{ kind: "remove-external-table", id: e.id }];
      case "remove-external-table": {
        for (const o of this.model.externalSystems) {
          const r = (o.tables ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-external-table", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const o = (i = (t = (this.model.rags ?? []).find((r) => r.id === e.sourceId)) == null ? void 0 : t.contentSources) == null ? void 0 : i.find((r) => r.uri === e.uri);
        return o ? [
          {
            kind: "add-rag-content-source",
            sourceId: e.sourceId,
            type: o.type,
            uri: e.uri
          }
        ] : null;
      }
      case "add-view-member":
        return [{ kind: "remove-view-member", id: e.id, targetId: e.targetId }];
      case "remove-view-member":
        return [{ kind: "add-view-member", id: e.id, targetId: e.targetId }];
      case "add-api":
        return [{ kind: "remove-api", id: e.id }];
      case "remove-api": {
        const o = (this.model.apis ?? []).find((r) => r.id === e.id);
        return o ? [
          { kind: "add-api", id: o.id, name: o.name },
          ...o.operations.map(
            (r) => ({
              kind: "add-api-operation",
              apiId: o.id,
              id: r.id,
              name: r.name,
              httpMethod: r.httpMethod,
              path: r.path,
              moduleId: r.targetModuleId,
              targetUseCaseId: r.targetUseCaseId
            })
          )
        ] : null;
      }
      case "add-api-operation":
        return [{ kind: "remove-api-operation", apiId: e.apiId, id: e.id }];
      case "remove-api-operation": {
        const o = (n = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : n.operations.find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-api-operation",
            apiId: e.apiId,
            id: o.id,
            name: o.name,
            httpMethod: o.httpMethod,
            path: o.path,
            moduleId: o.targetModuleId,
            targetUseCaseId: o.targetUseCaseId
          }
        ] : null;
      }
      case "set-api-operation-target": {
        const o = (s = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : s.operations.find((r) => r.id === e.id);
        return o ? [
          {
            kind: "set-api-operation-target",
            apiId: e.apiId,
            id: e.id,
            moduleId: o.targetModuleId,
            targetUseCaseId: o.targetUseCaseId
          }
        ] : null;
      }
      case "remove-read-model": {
        for (const o of this.model.modules) {
          const r = (o.readModels ?? []).find((a) => a.id === e.id);
          if (r != null && r.aggregateId)
            return [{ kind: "add-read-model", id: r.id, name: r.name, aggregateId: r.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const o of this.model.modules) {
          const r = (o.domainEvents ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-domain-event", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "rename-element": {
        const r = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((a) => a.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((a) => a.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((a) => a.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((a) => a.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((a) => a.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((a) => a.useCases ?? []) : e.type === "application-event" ? this.model.modules.flatMap((a) => a.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : this.model.entities ?? []).find((a) => a.id === e.id);
        return r ? [{ kind: "rename-element", type: e.type, id: e.id, name: r.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const o = this.model.flows.find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-flow",
            id: o.id,
            name: o.name,
            archetype: o.archetype,
            triggerAggregateId: o.triggerAggregateId ?? "",
            triggerEvent: o.triggerEvent ?? "",
            targetId: o.targetId,
            readModelName: o.readModelName,
            targetUseCaseId: o.targetUseCaseId
          }
        ] : null;
      }
      case "add-view":
        return [{ kind: "remove-view", id: e.id }];
      case "remove-view": {
        const o = (this.model.views ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-view", id: o.id, name: o.name, memberIds: o.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const o = (this.model.processes ?? []).find((l) => l.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((l) => l.id === e.id)) ?? -1;
        if (!o || r < 0) return null;
        const a = o.steps[r];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: a.id,
            name: a.name,
            stepType: a.type,
            roleId: a.roleId,
            deadline: a.deadline,
            useCaseId: a.useCaseId,
            compensationUseCaseId: a.compensationUseCaseId,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const o = (this.model.processes ?? []).find((a) => a.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((a) => a.id === e.id)) ?? -1;
        return !o || r < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const o = (this.model.processes ?? []).find((a) => a.id === e.processId), r = o == null ? void 0 : o.steps.find((a) => a.id === e.id);
        return r ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: r.roleId,
            deadline: r.deadline,
            compensationUseCaseId: r.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const o = (this.model.processes ?? []).find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-process",
            id: o.id,
            name: o.name,
            moduleId: o.ownerModuleId ?? "",
            triggerAggregateId: o.triggerAggregateId,
            triggerEvent: o.triggerEvent,
            steps: o.steps
          }
        ] : null;
      }
      case "add-workflow":
        return [{ kind: "remove-workflow", id: e.id }];
      case "remove-workflow": {
        const o = (this.model.workflows ?? []).find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-workflow",
            id: o.id,
            name: o.name,
            triggerAggregateId: o.triggerAggregateId,
            triggerDomainServiceId: o.triggerDomainServiceId,
            triggerUseCaseId: o.triggerUseCaseId,
            triggerEvent: o.triggerEvent,
            completionEventName: o.onCompletionEventName,
            workflowSteps: o.steps
          }
        ] : null;
      }
      case "add-workflow-step":
        return [{ kind: "remove-workflow-step", workflowId: e.workflowId, id: e.id }];
      case "remove-workflow-step": {
        const o = (this.model.workflows ?? []).find((l) => l.id === e.workflowId), r = (o == null ? void 0 : o.steps.findIndex((l) => l.id === e.id)) ?? -1;
        if (!o || r < 0) return null;
        const a = o.steps[r];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: a.id,
            name: a.name,
            emittedEventName: a.emittedEventName,
            targetUseCaseId: a.targetUseCaseId,
            completionEventName: a.completionEventName,
            dependsOnStepIds: a.dependsOnStepIds,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...o.steps.filter((l) => l.id !== e.id && (l.dependsOnStepIds ?? []).includes(e.id)).map(
            (l) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: l.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const o = (this.model.workflows ?? []).find((a) => a.id === e.workflowId), r = o == null ? void 0 : o.steps.find((a) => a.id === e.id);
        return r ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: r.emittedEventName,
            targetUseCaseId: r.targetUseCaseId,
            completionEventName: r.completionEventName
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, o = this.viewLayout(s), r = o.nodes[t] ?? null;
    let a = { x: i, y: n };
    const l = this.sceneFor(s), c = l.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = l.nodes.find((g) => g.id === c.parentId);
      m && (a = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const u = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const g = this.inverseOf(m);
        g && u.unshift(...g), this.command(m, !1);
      }
    }
    this.pushUndoEntry(u);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), o = { ...n.nodes }, r = [];
    for (const { id: a, x: l, y: c } of t) {
      r.push({ kind: "move-node", view: i, id: a, pos: n.nodes[a] ?? null });
      let u = { x: l, y: c };
      const m = s.nodes.find((g) => g.id === a);
      if (m != null && m.parentId) {
        const g = s.nodes.find((w) => w.id === m.parentId);
        g && (u = { x: l - g.x, y: c - g.y });
      }
      o[a] = u;
    }
    if (this.writeViewLayout(i, { ...n, nodes: o }), i === "processes")
      for (const { id: a } of t) {
        const l = this.stepReorderCommand(a);
        if (l) {
          const c = this.inverseOf(l);
          c && r.unshift(...c), this.command(l, !1);
        }
      }
    this.pushUndoEntry(r);
  }
  onNodeResized(e) {
    var u;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), l = this.sceneFor(r).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((u = a.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...l.map((m) => ({ kind: "move-node", view: r, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: n } };
    for (const m of l) c[m.id] = { x: m.x - i, y: m.y - n };
    this.writeViewLayout(r, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [t]: { w: s, h: o } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, s = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: s.edges[t] ?? null }
    ]);
    const o = { ...s.edges };
    i.length ? o[t] = i : delete o[t], this.writeViewLayout(n, { ...s, edges: o });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = ri(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
      (r, a) => (n.get(r.id) ?? 0) - (n.get(a.id) ?? 0)
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
    const { sourceId: t, targetId: i, x: n, y: s } = e.detail;
    if (this._view === "workflows") {
      const _ = this.owningWorkflowOf(t), I = this.owningWorkflowOf(i);
      if (!_ || _ !== I || t === i) return;
      const k = _.steps.find((S) => S.id === i);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: _.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = new Set((this.model.aiAgents ?? []).map((_) => _.id));
    if (o.has(t)) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (S) => S.agentId === t && S.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (S) => S.agentId === t && S.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((k) => k.id === i) && ((this.model.agentRags ?? []).some(
        (S) => S.agentId === t && S.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    const r = (this.model.rags ?? []).find((_) => _.id === t);
    if (r) {
      new Set(
        this.model.modules.flatMap((I) => (I.readModels ?? []).map((k) => k.id))
      ).has(i) && !(r.sourceReadModelIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some((_) => _.id === i)) return;
    if ((this.model.apis ?? []).some((_) => _.id === t)) {
      this.model.externalSystems.some((_) => _.id === i) && (this.model.apis ?? []).find((I) => I.id === t).publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if (o.has(i)) return;
    const a = new Set((this.model.actors ?? []).map((_) => _.id));
    if (a.has(t)) {
      const _ = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((S) => S.id))
      ), I = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map((S) => S.id))
      );
      if (_.has(i) || I.has(i)) {
        (this.model.actorUses ?? []).some(
          (S) => S.actorId === t && S.targetId === i
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aggregates ?? []).some((k) => k.id === i)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: i });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === i)) {
        (this.model.actorExternalDependencies ?? []).some(
          (S) => S.actorId === t && S.externalSystemId === i
        ) || this.command({ kind: "add-actor-external", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    const l = this.owningApiOf(t);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((I) => (I.useCases ?? []).map((k) => k.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: t,
          targetUseCaseId: i
        });
        return;
      }
      if (this.model.modules.some((I) => I.id === i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: t,
          moduleId: i
        });
        return;
      }
      return;
    }
    const c = this.model.externalSystems.flatMap((_) => _.useCases ?? []).find((_) => _.id === t), u = this.model.externalSystems.flatMap((_) => _.tables ?? []).find((_) => _.id === t);
    if (c || u) {
      const _ = (c ?? u).name, I = c ? { externalUseCaseId: t } : { externalTableId: t }, k = (q) => c ? q.sourceExternalUseCaseId === t : q.sourceExternalTableId === t, S = this.model.modules.flatMap((q) => q.readModels ?? []).find((q) => q.id === i);
      if (S) {
        (this.model.projections ?? []).some(
          (B) => k(B) && B.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${L(_)}-${L(S.name)}`,
          name: `${S.name}Projection`,
          ...I,
          targetId: i
        });
        return;
      }
      const W = this.model.modules.find((q) => q.id === i);
      if (W) {
        (this.model.projections ?? []).some(
          (B) => k(B) && B.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${L(_)}-${L(W.name)}`,
          name: `${_}ViewProjection`,
          ...I,
          moduleId: i,
          readModelName: `${_}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((_) => _.id === t);
    if (m) {
      const _ = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === i);
      if (_) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${L(m.name)}-${L(_.name)}`,
          name: `${_.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const I = this.model.modules.find((k) => k.id === i);
      if (I) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${L(m.name)}-${L(I.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: t,
          moduleId: i,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const g = new Set(
      this.model.modules.flatMap((_) => (_.domainEvents ?? []).map((I) => I.id))
    ), w = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((_) => _.id),
      ...this.model.modules.flatMap((_) => (_.domainServices ?? []).map((I) => I.id))
    ]), $ = new Set(
      this.model.modules.flatMap((_) => (_.applicationEvents ?? []).map((I) => I.id))
    ), b = new Set(this.model.modules.flatMap((_) => (_.useCases ?? []).map((I) => I.id))), N = new Set(
      this.model.modules.flatMap((_) => (_.queryServices ?? []).map((I) => I.id))
    );
    if (b.has(t) && N.has(i)) {
      (this.model.queryCalls ?? []).some(
        (I) => I.sourceId === t && I.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const x = new Set(
      this.model.externalSystems.flatMap((_) => (_.useCases ?? []).map((I) => I.id))
    );
    if (b.has(t) && x.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (I) => I.sourceId === t && I.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (b.has(t) && b.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        (I) => I.sourceId === t && I.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (w.has(t) && g.has(i) || b.has(t) && $.has(i)) {
      (this.model.emissions ?? []).some(
        (I) => I.sourceId === t && I.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (g.has(t) || $.has(t)) {
      const _ = $.has(t), I = this.model.modules.flatMap((f) => (_ ? f.applicationEvents : f.domainEvents) ?? []).find((f) => f.id === t), k = this.model.modules.flatMap((f) => (f.useCases ?? []).map((p) => ({ u: p, module: f }))).find(({ u: f }) => f.id === i), S = this.model.modules.flatMap((f) => (f.readModels ?? []).map((p) => ({ rm: p, module: f }))).find(({ rm: f }) => f.id === i), W = this.model.modules.find((f) => f.id === i) ?? (S == null ? void 0 : S.module) ?? (k == null ? void 0 : k.module);
      if (!I || !W) return;
      const q = new Set((this.model.aggregates ?? []).map((f) => f.id)), B = new Set(
        this.model.modules.flatMap((f) => (f.domainServices ?? []).map((p) => p.id))
      ), X = (this.model.emissions ?? []).find(
        (f) => f.domainEventId === t && (_ ? b.has(f.sourceId) : q.has(f.sourceId) || B.has(f.sourceId))
      );
      if (!X) {
        this.emit("modux-notice", {
          message: _ ? `Declara primero qué caso de uso publica ${I.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${I.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const Q = !_ && q.has(X.sourceId);
      if (k) {
        if (this.model.flows.some(
          (p) => p.archetype === "TRIGGERS" && p.triggerEvent === I.name && p.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${L(I.name)}-${L(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: Q ? X.sourceId : "",
          triggerDomainServiceId: !_ && !Q ? X.sourceId : void 0,
          triggerUseCaseId: _ ? X.sourceId : void 0,
          triggerEvent: I.name,
          targetId: W.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const d = (S == null ? void 0 : S.rm.name) ?? `${I.name}View`;
      if (this.model.flows.some(
        (f) => f.archetype === "MATERIALIZES" && f.triggerEvent === I.name && f.targetId === W.id && f.readModelName === d
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${L(I.name)}-${L(d)}`,
        name: d,
        archetype: "MATERIALIZES",
        triggerAggregateId: Q ? X.sourceId : "",
        triggerDomainServiceId: !_ && !Q ? X.sourceId : void 0,
        triggerUseCaseId: _ ? X.sourceId : void 0,
        triggerEvent: I.name,
        targetId: W.id,
        readModelName: d
      });
      return;
    }
    const P = /* @__PURE__ */ new Set([
      ...w,
      ...b,
      ...N,
      ...this.model.modules.flatMap((_) => (_.readModels ?? []).map((I) => I.id))
    ]);
    if (P.has(t) || P.has(i) || g.has(i) || $.has(i))
      return;
    const z = new Set(this.model.externalSystems.map((_) => _.id));
    if (z.has(t)) {
      if (new Set(
        this.model.modules.flatMap((I) => (I.useCases ?? []).map((k) => k.id))
      ).has(i)) {
        (this.model.externalCalls ?? []).some(
          (k) => k.externalSystemId === t && k.useCaseId === i
        ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i });
        return;
      }
      if (z.has(i) && i !== t) {
        (this.model.externalSystemDependencies ?? []).some(
          (k) => k.sourceId === t && k.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.apis ?? []).some((I) => I.id === i)) {
        (this.model.externalSystemDependencies ?? []).some(
          (k) => k.sourceId === t && k.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    z.has(i) || a.has(i);
  }
  /** Apply the picker's choice: create the new relation or retype the existing one. */
  pickRelationType(e) {
    const t = this._relationPicker;
    if (this._relationPicker = null, !t) return;
    if (this._relationType = e, t.mode === "create") {
      this.command({ kind: "add-relation", sourceId: t.sourceId, targetId: t.targetId, type: e });
      return;
    }
    const i = this.model.relations.find(
      (n) => n.sourceId === t.sourceId && n.targetId === t.targetId
    );
    i && i.type !== e && this.command({ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: e });
  }
  onDeleteRequested(e) {
    const { elementType: t, id: i, kind: n } = e.detail;
    if (this._activeViewId && t === "node") {
      const s = this.memberIdOf(i, n), o = (this.model.views ?? []).find((r) => r.id === this._activeViewId);
      if (s && (o != null && o.memberIds.includes(s))) {
        this._deletePicker = { elementType: t, id: i, kind: n, memberId: s };
        return;
      }
    }
    this.performDelete(t, i, n);
  }
  /** Canvas node → the catalog id a view lists as member (null when not a member kind). */
  memberIdOf(e, t) {
    var i, n;
    switch (t) {
      case "module":
      case "external-system":
        return e.replace(/^tgt:/, "");
      case "aggregate":
      case "entity":
      case "process":
      case "workflow":
        return e;
      case "flow":
        return e.replace(/^flow:/, "");
      case "process-step":
        return ((i = this.owningProcessOf(e)) == null ? void 0 : i.id) ?? null;
      case "workflow-step":
        return ((n = this.owningWorkflowOf(e)) == null ? void 0 : n.id) ?? null;
      default:
        return null;
    }
  }
  performDelete(e, t, i) {
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const n = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!n) return;
      const s = this.owningWorkflowOf(n[2]);
      if (!s) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: s.id,
        id: n[2],
        dependsOnStepId: n[1]
      });
      return;
    }
    if (e === "node" && i === "workflow") {
      this._selectedId = null, this.command({ kind: "remove-workflow", id: t });
      return;
    }
    if (e === "node" && i === "workflow-step") {
      const n = this.owningWorkflowOf(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-workflow-step", workflowId: n.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "relation") {
      const n = /^rel:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "emission") {
      const n = /^emit:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-emission", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "projection") {
      const n = /^proj:(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-projection", id: n[1] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "uc-call") {
      const n = /^uccall:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-use-case-call", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "qs-call") {
      const n = /^qscall:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-query-call", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "external-call") {
      const n = /^extcall:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-external-call", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-uc-call") {
      const n = /^extuccall:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-external-uc-call", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-use") {
      const n = /^mcp:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-use", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-external-use") {
      const n = /^mcpx:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-external-use", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-rag") {
      const n = /^agrag:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-rag", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "rag-source") {
      const n = /^ragsrc:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (e === "node" && i === "rag") {
      this._selectedId = null, this.command({ kind: "remove-rag", id: t });
      return;
    }
    if (e === "node" && i === "rag-content-source") {
      const n = /^ragcs:(.+?):(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-rag-content-source", sourceId: n[1], uri: n[2] });
      return;
    }
    if (e === "node" && i === "external-table") {
      this._selectedId = null, this.command({ kind: "remove-external-table", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "api-wire") {
      const n = /^apiwire:(.+)$/.exec(t), s = n ? this.owningApiOf(n[1]) : null;
      if (!n || !s) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: s.id, id: n[1] });
      return;
    }
    if (e === "node" && i === "api") {
      this._selectedId = null, this.command({ kind: "remove-api", id: t });
      return;
    }
    if (e === "node" && i === "api-operation") {
      const n = this.owningApiOf(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation", apiId: n.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-use") {
      const n = /^use:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-actor-use", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-ext") {
      const n = /^extdep:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-actor-external", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-dep") {
      const n = /^xdep:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-external-dependency", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (e === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((s) => s.moduleId === t)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: t });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((s) => s.aggregateId === t)) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate", id: t });
      return;
    }
    if (e === "node" && i === "domain-event") {
      this._selectedId = null, this.command({ kind: "remove-domain-event", id: t });
      return;
    }
    if (e === "node" && i === "read-model") {
      this._selectedId = null, this.command({ kind: "remove-read-model", id: t });
      return;
    }
    if (e === "node" && i === "domain-service") {
      this._selectedId = null, this.command({ kind: "remove-domain-service", id: t });
      return;
    }
    if (e === "node" && i === "query-service") {
      this._selectedId = null, this.command({ kind: "remove-query-service", id: t });
      return;
    }
    if (e === "node" && i === "use-case") {
      this._selectedId = null, this.command({ kind: "remove-use-case", id: t });
      return;
    }
    if (e === "node" && i === "external-use-case") {
      this._selectedId = null, this.command({ kind: "remove-external-use-case", id: t });
      return;
    }
    if (e === "node" && i === "application-event") {
      this._selectedId = null, this.command({ kind: "remove-application-event", id: t });
      return;
    }
    if (e === "node" && i === "external-system") {
      this._selectedId = null, this.command({ kind: "remove-external-system", id: t });
      return;
    }
    if (e === "node" && i === "actor") {
      this._selectedId = null, this.command({ kind: "remove-actor", id: t });
      return;
    }
    if (e === "node" && i === "ai-agent") {
      this._selectedId = null, this.command({ kind: "remove-ai-agent", id: t });
      return;
    }
    if (e === "node" && i === "flow") {
      this._selectedId = null, this.command({ kind: "remove-flow", id: t.replace(/^flow:/, "") });
      return;
    }
    if (e === "node" && i === "process") {
      this._selectedId = null, this.command({ kind: "remove-process", id: t });
      return;
    }
    if (e === "node" && i === "process-step") {
      const n = this.owningProcessOf(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: n.id, id: t });
    }
  }
  owningProcessOf(e) {
    return (this.model.processes ?? []).find((t) => t.steps.some((i) => i.id === e));
  }
  owningWorkflowOf(e) {
    return (this.model.workflows ?? []).find((t) => t.steps.some((i) => i.id === e));
  }
  owningApiOf(e) {
    return (this.model.apis ?? []).find((t) => t.operations.some((i) => i.id === e));
  }
  onNodeRenamed(e) {
    const { id: t, kind: i, name: n } = e.detail;
    (i === "module" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
  }
  addStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.processes ?? []).find((s) => s.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
    if (!i) return;
    const n = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: i.id,
      id: `step-${L(e)}`,
      name: e,
      stepType: this._newStepType,
      roleId: this._newStepType === "HUMAN" && this._newStepRole.trim() || void 0,
      deadline: this._newStepType === "HUMAN" && this._newStepDeadline.trim() || void 0,
      afterStepId: n
    }), this._newStepName = "", this._newStepDeadline = "";
  }
  addWorkflowStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.workflows ?? []).find((n) => n.id === this._selectedId), i = t ?? this.owningWorkflowOf(this._selectedId);
    i && (this.command({
      kind: "add-workflow-step",
      workflowId: i.id,
      id: `wfstep-${L(e)}`,
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
  addRagContentSourceFromToolbar() {
    const e = this._newRagSourceUri.trim(), t = this._selectedId;
    !e || !t || !(this.model.rags ?? []).some((i) => i.id === t) || (this.command({
      kind: "add-rag-content-source",
      sourceId: t,
      type: this._newRagSourceType,
      uri: e
    }), this._newRagSourceUri = "");
  }
  /** Candidates for the add-to-view search: catalog elements not yet in the view. */
  viewMemberCandidates() {
    const e = (this.model.views ?? []).find((i) => i.id === this._activeViewId);
    if (!e) return [];
    const t = new Set(e.memberIds);
    return [
      ...this.model.modules.map((i) => ({ id: i.id, name: i.name, kind: "contexto" })),
      ...this.model.externalSystems.map((i) => ({ id: i.id, name: i.name, kind: "externo" })),
      ...(this.model.aggregates ?? []).map((i) => ({ id: i.id, name: i.name, kind: "agregado" })),
      ...this.model.flows.map((i) => ({ id: i.id, name: i.name, kind: "flow" })),
      ...(this.model.processes ?? []).map((i) => ({ id: i.id, name: i.name, kind: "proceso" })),
      ...(this.model.workflows ?? []).map((i) => ({ id: i.id, name: i.name, kind: "workflow" }))
    ].filter((i) => !t.has(i.id));
  }
  addMemberFromToolbar() {
    const e = this._addMemberKey.trim();
    if (!e || !this._activeViewId) return;
    const t = this.viewMemberCandidates().find(
      (i) => `${i.name} (${i.id})` === e || i.id === e || i.name === e
    );
    t && (this.command({ kind: "add-view-member", id: this._activeViewId, targetId: t.id }), this._addMemberKey = "");
  }
  onElementSelected(e) {
    var t, i;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const n = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((s) => s.id === e.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const n = (i = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : i.steps.find((s) => s.id === e.detail.id);
      this._editStepUseCase = (n == null ? void 0 : n.targetUseCaseId) ?? "", this._editStepEmits = (n == null ? void 0 : n.emittedEventName) ?? "", this._editStepAwaits = (n == null ? void 0 : n.completionEventName) ?? "";
    }
    this.emit("modux-select", { elementType: e.detail.kind, id: e.detail.id });
  }
  onMultiToggled(e) {
    const { id: t } = e.detail;
    this._multi = this._multi.includes(t) ? this._multi.filter((i) => i !== t) : [...this._multi, t];
  }
  onNodesBoxed(e) {
    this._multi = e.detail.ids;
  }
  /** Canvas node ids → catalog element ids (view members). */
  memberIdsFromSelection() {
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const i of this._multi) {
      const n = e.nodes.find((s) => s.id === i);
      if (n)
        switch (n.kind) {
          case "module":
          case "external-system":
            t.add(i.replace(/^tgt:/, ""));
            break;
          case "aggregate":
          case "entity":
          case "process":
          case "workflow":
            t.add(i);
            break;
          case "flow":
            t.add(i.replace(/^flow:/, ""));
            break;
          case "process-step": {
            const s = this.owningProcessOf(i);
            s && t.add(s.id);
            break;
          }
          case "workflow-step": {
            const s = this.owningWorkflowOf(i);
            s && t.add(s.id);
            break;
          }
        }
    }
    return [...t];
  }
  createViewFromSelection() {
    const e = this._newViewName.trim(), t = this.memberIdsFromSelection();
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${L(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((l) => l.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((l) => t.has(l.id)), n = new Set(i.map((l) => l.id)), s = this.model.externalSystems.filter((l) => t.has(l.id)), o = new Set(s.map((l) => l.id)), r = (this.model.aggregates ?? []).filter(
      (l) => t.has(l.id) || n.has(l.moduleId)
    ), a = new Set(r.map((l) => l.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: s,
      relations: this.model.relations.filter(
        (l) => n.has(l.sourceId) && n.has(l.targetId)
      ),
      flows: this.model.flows.filter(
        (l) => t.has(l.id) || (n.has(l.sourceId) || o.has(l.sourceId)) && (n.has(l.targetId) || o.has(l.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((l) => a.has(l.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (l) => a.has(l.sourceAggregateId) && a.has(l.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (l) => t.has(l.id) || (l.ownerModuleId ? n.has(l.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((l) => t.has(l.id))
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
      const i = /^rel:(.+)->(.+)$/.exec(e.detail.id);
      i && (this._relationPicker = {
        sourceId: i[1],
        targetId: i[2],
        mode: "edit",
        x: e.detail.x ?? 0,
        y: e.detail.y ?? 0
      });
      return;
    }
    const t = e.detail.kind === "process-step" ? _d(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : yd(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, n, s, o, r, a, l, c, u, m, g, w, $, b, N, x, P, z, _, I, k, S, W, q, B, X, Q, d, h, f;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${L(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: L(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${L(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${L(e)}`, name: e });
        else if (this._newContextMapKind === "api")
          this.command({ kind: "add-api", id: `api-${L(e)}`, name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "api-operation") {
          const p = (t = (this.model.apis ?? []).find((y) => y.id === this._selectedId)) == null ? void 0 : t.id, v = this._newApiId || p || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id);
          if (!v) return;
          this.command({
            kind: "add-api-operation",
            apiId: v,
            id: `apiop-${v.replace(/^api-/, "")}-${L(e)}`,
            name: e
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const p = (s = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : s.id, v = this._newModuleId || p || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!v) return;
          this.command({ kind: "add-domain-event", id: `ev-${L(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const p = (r = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : r.id, v = this._newModuleId || p || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!v) return;
          this.command({ kind: "add-application-event", id: `aev-${L(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const p = (l = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : l.id, v = this._newModuleId || p || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!v) return;
          this.command({ kind: "add-domain-service", id: `ds-${L(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "query-service") {
          const p = (u = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : u.id, v = this._newModuleId || p || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!v) return;
          this.command({ kind: "add-query-service", id: `qs-${L(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "use-case") {
          const p = (g = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : g.id, v = this._newModuleId || p || ((w = this.model.modules[0]) == null ? void 0 : w.id);
          if (!v) return;
          this.command({ kind: "add-use-case", id: `uc-${L(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "policy") {
          const p = ($ = this.model.modules.find((y) => y.id === this._selectedId)) == null ? void 0 : $.id, v = this._newModuleId || p || ((b = this.model.modules[0]) == null ? void 0 : b.id);
          if (!v) return;
          this.command({ kind: "add-use-case", id: `uc-${L(e)}`, name: e, moduleId: v, policy: !0 });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-use-case") {
          const p = (N = this.model.externalSystems.find((y) => y.id === this._selectedId)) == null ? void 0 : N.id, v = this._newExternalId || p || ((x = this.model.externalSystems[0]) == null ? void 0 : x.id);
          if (!v) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${L(e)}`,
            name: e,
            moduleId: v
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-table") {
          const p = (P = this.model.externalSystems.find((y) => y.id === this._selectedId)) == null ? void 0 : P.id, v = this._newExternalId || p || ((z = this.model.externalSystems[0]) == null ? void 0 : z.id);
          if (!v) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${L(e)}`,
            name: e,
            moduleId: v
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const p = (_ = (this.model.aggregates ?? []).find((y) => y.id === this._selectedId)) == null ? void 0 : _.id, v = this._newAggregateId || p || ((k = (I = this.model.aggregates) == null ? void 0 : I[0]) == null ? void 0 : k.id);
          if (!v) return;
          this.command({ kind: "add-read-model", id: `rm-${L(e)}`, name: e, aggregateId: v });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${L(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const p = this._newModuleId || ((S = this.model.modules[0]) == null ? void 0 : S.id);
        if (!p) return;
        this.command({ kind: "add-aggregate", id: `agg-${L(e)}`, name: e, moduleId: p });
      } else if (this._view === "flows") {
        const p = this._newTriggerAggId || ((q = (W = this.model.aggregates) == null ? void 0 : W[0]) == null ? void 0 : q.id), v = this._newTargetId || ((B = this.model.modules[0]) == null ? void 0 : B.id), y = this._newTriggerEvent.trim();
        if (!p || !v || !y) return;
        this.command({
          kind: "add-flow",
          id: `flow-${L(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: p,
          triggerEvent: y,
          targetId: v
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const p = this._newModuleId || ((X = this.model.modules[0]) == null ? void 0 : X.id);
        if (!p) return;
        this.command({
          kind: "add-process",
          id: `proc-${L(e)}`,
          name: e,
          moduleId: p,
          triggerAggregateId: this._newTriggerAggId || ((d = (Q = this.model.aggregates) == null ? void 0 : Q[0]) == null ? void 0 : d.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${L(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((f = (h = this.model.aggregates) == null ? void 0 : h[0]) == null ? void 0 : f.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Wn(i, t.nodes) : e === "flows" ? es(i, t.nodes) : e === "processes" ? ri(i, t.nodes) : e === "workflows" ? hd(i, t.nodes) : e === "eventstorming" ? sd(i, t.nodes) : Ln(i, t.nodes, this._detail === "detail", t.sizes ?? {});
    if (this.diff)
      for (const s of n.nodes) {
        const o = this.diff[s.id] ?? this.diff[s.id.replace(/^(tgt:|flow:)/, "")];
        o && (s.diffKind = o);
      }
    return n;
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var l;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((c) => !c.parentId), n = new Set(i.map((c) => c.id)), s = {
      nodes: i,
      edges: t.edges.filter((c) => n.has(c.sourceId) && n.has(c.targetId))
    }, r = await pd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((c) => ({
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
        ${this._activeViewId ? A`
              <input
                class="new-name"
                list="view-member-options"
                placeholder="Añadir a la vista…"
                title="Busca un elemento existente del catálogo y añádelo a la vista activa"
                .value=${this._addMemberKey}
                @input=${(t) => this._addMemberKey = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.addMemberFromToolbar()}
              />
              <datalist id="view-member-options">
                ${this.viewMemberCandidates().map(
      (t) => A`<option value="${t.name} (${t.id})">${t.kind}</option>`
    )}
              </datalist>
              <button class="tab" title="Añadir el elemento a la vista" @click=${this.addMemberFromToolbar}>
                ＋ Añadir
              </button>
            ` : ""}
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
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._newContextMapKind === "rag" ? "Nuevo RAG…" : this._newContextMapKind === "api" ? "Nueva API…" : this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : this._newContextMapKind === "policy" ? "Nueva policy…" : this._newContextMapKind === "use-case" ? "Nuevo caso de uso…" : this._newContextMapKind === "query-service" ? "Nuevo query service…" : this._newContextMapKind === "external-use-case" ? "Nuevo caso de uso externo…" : this._newContextMapKind === "external-table" ? "Nueva tabla externa…" : this._newContextMapKind === "api-operation" ? "Nueva operación de API…" : "Nuevo read model…",
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
              <option value="rag" ?selected=${this._newContextMapKind === "rag"}>
                RAG (base de conocimiento)
              </option>
              <option value="api" ?selected=${this._newContextMapKind === "api"}>
                API publicada
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
                    <option
                      value="external-table"
                      ?selected=${this._newContextMapKind === "external-table"}
                    >
                      Tabla externa (legacy)
                    </option>
                    <option
                      value="api-operation"
                      ?selected=${this._newContextMapKind === "api-operation"}
                    >
                      Operación de API
                    </option>
                  ` : ""}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table") ? A`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "api-operation" ? A`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, n;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
        var i, n;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
              ${vd.map(
      (t) => A`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? A`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
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
        var i, n;
        return A`<option
                      value=${t.id}
                      ?selected=${t.id === (this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
        var i;
        return A`<option
                          value=${t.id}
                          ?selected=${t.id === (this._newTargetId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? A`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP"].map(
      (t) => A`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
    )}
              </select>
              <input
                class="new-name"
                placeholder="URI de la fuente…"
                title="Repo, web o servidor FTP que alimenta el RAG"
                .value=${this._newRagSourceUri}
                @input=${(t) => this._newRagSourceUri = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.addRagContentSourceFromToolbar()}
              />
              <button
                class="tab"
                title="Añadir la fuente de contenido al RAG seleccionado"
                @click=${this.addRagContentSourceFromToolbar}
              >
                ＋ Fuente
              </button>
            ` : ""}
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
        @nodes-moved=${this.onNodesMoved}
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
      ${this.renderRelationPicker()} ${this.renderDeletePicker()}
    `;
  }
  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  renderDeletePicker() {
    if (!this._deletePicker) return "";
    const t = (this.model.views ?? []).find((i) => i.id === this._activeViewId);
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">¿Eliminar, o solo quitar de la vista?</div>
        <button
          class="picker-item"
          @click=${() => {
      const i = this._deletePicker;
      this._deletePicker = null, this.command({
        kind: "remove-view-member",
        id: this._activeViewId,
        targetId: i.memberId
      });
    }}
        >
          <span class="abbr">👁</span>
          <span class="name">Quitar de la vista «${(t == null ? void 0 : t.name) ?? this._activeViewId}»</span>
        </button>
        <button
          class="picker-item"
          @click=${() => {
      const i = this._deletePicker;
      this._deletePicker = null, this.performDelete(i.elementType, i.id, i.kind);
    }}
        >
          <span class="abbr">🗑</span>
          <span class="name">Eliminar del modelo</span>
        </button>
      </div>
    `;
  }
  renderRelationPicker() {
    var i;
    const e = this._relationPicker;
    if (!e) return "";
    const t = e.mode === "edit" ? (i = this.model.relations.find(
      (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
    )) == null ? void 0 : i.type : this._relationType;
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${gd.map(
      (n) => A`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Bt[n].abbr}</span>
              <span class="name">${Bt[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
R.styles = Xt`
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
O([
  le({ attribute: !1 })
], R.prototype, "model", 2);
O([
  le({ attribute: !1 })
], R.prototype, "layout", 2);
O([
  le({ attribute: !1 })
], R.prototype, "diff", 2);
O([
  M()
], R.prototype, "_view", 2);
O([
  M()
], R.prototype, "_detail", 2);
O([
  M()
], R.prototype, "_relationType", 2);
O([
  M()
], R.prototype, "_relationPicker", 2);
O([
  M()
], R.prototype, "_selectedId", 2);
O([
  M()
], R.prototype, "_newName", 2);
O([
  M()
], R.prototype, "_newSubdomain", 2);
O([
  M()
], R.prototype, "_newModuleId", 2);
O([
  M()
], R.prototype, "_newContextMapKind", 2);
O([
  M()
], R.prototype, "_newAggregateId", 2);
O([
  M()
], R.prototype, "_newExternalId", 2);
O([
  M()
], R.prototype, "_newApiId", 2);
O([
  M()
], R.prototype, "_newArchetype", 2);
O([
  M()
], R.prototype, "_newTriggerAggId", 2);
O([
  M()
], R.prototype, "_newTriggerEvent", 2);
O([
  M()
], R.prototype, "_newTargetId", 2);
O([
  M()
], R.prototype, "_undoStack", 2);
O([
  M()
], R.prototype, "_redoStack", 2);
O([
  M()
], R.prototype, "_newStepName", 2);
O([
  M()
], R.prototype, "_newStepType", 2);
O([
  M()
], R.prototype, "_newStepRole", 2);
O([
  M()
], R.prototype, "_newStepDeadline", 2);
O([
  M()
], R.prototype, "_editStepRole", 2);
O([
  M()
], R.prototype, "_editStepDeadline", 2);
O([
  M()
], R.prototype, "_editStepComp", 2);
O([
  M()
], R.prototype, "_newStepUseCase", 2);
O([
  M()
], R.prototype, "_newStepEmits", 2);
O([
  M()
], R.prototype, "_editStepUseCase", 2);
O([
  M()
], R.prototype, "_editStepEmits", 2);
O([
  M()
], R.prototype, "_editStepAwaits", 2);
O([
  M()
], R.prototype, "_multi", 2);
O([
  M()
], R.prototype, "_newViewName", 2);
O([
  M()
], R.prototype, "_activeViewId", 2);
O([
  M()
], R.prototype, "_newRagSourceType", 2);
O([
  M()
], R.prototype, "_newRagSourceUri", 2);
O([
  M()
], R.prototype, "_addMemberKey", 2);
O([
  M()
], R.prototype, "_deletePicker", 2);
R = O([
  Qt("modux-editor")
], R);
var xd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, ne = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Id(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && xd(t, i, s), s;
};
let ee = class extends be {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._toast = null, this._workspace = null, this._creatingSolution = !1, this._newSolutionName = "", this._diff = null, this._mergeFlow = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
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
    super.connectedCallback(), this.addEventListener("pointerdown", this._onPointerDown, !0), window.addEventListener("pointerup", this._onPointerUp, !0), window.addEventListener("pagehide", this._onPageHide), this.reload(), this.loadWorkspace(), this.startLiveUpdates();
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
    var i;
    if (!this._model) return;
    if (this._saving || this._interacting) {
      this._pendingVersion = e;
      return;
    }
    const t = this._lastVersion !== null && e !== this._lastVersion;
    this._lastVersion = e, t && (await this.reload(), (i = this.renderRoot.querySelector("modux-editor")) == null || i.clearHistory(), this.showToast(
      "El modelo ha cambiado fuera de este editor: recargado (historial de deshacer reiniciado)",
      "info"
    ));
  }
  async reload() {
    try {
      const [e, t, i] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/layout`),
        fetch(`${this.base}/version`)
      ]);
      if (!e.ok) throw new Error(`GET ${this.base}/model → ${e.status}`);
      this._model = await e.json(), this._layout = t.ok ? await t.json() : {}, i.ok && (this._lastVersion = (await i.json()).version), this._error = null;
    } catch (e) {
      this._error = String(e);
    }
  }
  async loadWorkspace() {
    try {
      const e = await fetch(`${this.base}/solutions`);
      e.ok && (this._workspace = await e.json()), await this.refreshDiff();
    } catch {
    }
  }
  /** The diff rings only make sense on a solution; on the system they clear. */
  async refreshDiff() {
    if (!this._workspace || this._workspace.system) {
      this._diff = null;
      return;
    }
    try {
      const e = await fetch(`${this.base}/solutions/diff`);
      this._diff = e.ok ? await e.json() : null;
    } catch {
      this._diff = null;
    }
  }
  /** create / switch / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var i;
    this._saving = !0;
    try {
      const n = await fetch(`${this.base}/solutions/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t)
      });
      if (!n.ok) {
        let s = `El servidor rechazó la operación (${n.status})`;
        try {
          const o = await n.json();
          o != null && o.message && (s = o.message);
        } catch {
        }
        this.showToast(s);
        return;
      }
      this._workspace = await n.json(), await this.reload(), await this.refreshDiff(), (i = this.renderRoot.querySelector("modux-editor")) == null || i.clearHistory();
    } catch (n) {
      this.showToast(String(n));
    } finally {
      this._saving = !1;
    }
  }
  onWorkspaceSelect(e) {
    const t = e.target.value;
    if (t === "__new__") {
      this._creatingSolution = !0;
      return;
    }
    this._workspace && t !== this._workspace.current && this.solutionOp("switch", { branch: t });
  }
  createSolution() {
    const e = this._newSolutionName.trim();
    e && (this._creatingSolution = !1, this._newSolutionName = "", this.solutionOp("create", { name: e }));
  }
  /** merge/update start with a dry run; conflicts open the per-element panel. */
  async startMergeFlow(e) {
    var t;
    try {
      const i = await fetch(`${this.base}/solutions/merge-check`);
      if (!i.ok) {
        this.showToast(`No se pudo comprobar el merge (${i.status})`);
        return;
      }
      const n = await i.json();
      if (!((t = n.conflicts) != null && t.length)) {
        await this.solutionOp(e, { resolutions: {} }), this.showToast(
          e === "merge" ? "Solución mergeada al sistema: ahora es el nuevo as-is" : "Solución actualizada desde el sistema",
          "info"
        );
        return;
      }
      this._mergeFlow = { op: e, conflicts: n.conflicts, resolutions: {} };
    } catch (i) {
      this.showToast(String(i));
    }
  }
  async confirmMergeFlow() {
    const e = this._mergeFlow;
    !e || e.conflicts.some((t) => !e.resolutions[t.key]) || (this._mergeFlow = null, await this.solutionOp(e.op, { resolutions: e.resolutions }), this.showToast(
      e.op === "merge" ? "Solución mergeada al sistema: ahora es el nuevo as-is" : "Solución actualizada desde el sistema",
      "info"
    ));
  }
  showToast(e, t = "error") {
    this._toast = { message: e, kind: t }, window.clearTimeout(this._toastTimer), this._toastTimer = window.setTimeout(() => this._toast = null, 5e3);
  }
  async onCommand(e) {
    const { command: t } = e.detail;
    this._saving = !0;
    try {
      const i = await fetch(`${this.base}/commands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t)
      });
      if (!i.ok) {
        let o = `El servidor rechazó el comando (${i.status})`;
        try {
          const r = await i.json();
          r != null && r.message && (o = r.message);
        } catch {
        }
        this.showToast(o);
        return;
      }
      const [n, s] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/version`)
      ]);
      n.ok && (this._model = await n.json()), s.ok && (this._lastVersion = (await s.json()).version), await this.refreshDiff();
    } catch (i) {
      this.showToast(String(i));
    } finally {
      if (this._saving = !1, this._pendingVersion) {
        const i = this._pendingVersion;
        this._pendingVersion = null, this.onVersionSignal(i);
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
    var e;
    return this._error ? A`<div class="status error">modux editor: ${this._error}</div>` : this._model ? A`
      ${this._workspace ? A`
            <div class="workspace">
              <label>Modelo:</label>
              <select @change=${this.onWorkspaceSelect} title="Sistema (as-is) o una solución (to-be)">
                <option value="main" ?selected=${this._workspace.system}>Sistema (as-is)</option>
                ${this._workspace.solutions.map(
      (t) => A`<option value=${t.branch} ?selected=${t.branch === this._workspace.current}>
                      Solución: ${t.name}${t.status ? ` · ${t.status}` : ""}
                    </option>`
    )}
                <option value="__new__">＋ Nueva solución…</option>
              </select>
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const t = (n) => this._diff.changes.filter((s) => s.kind === n).length, i = this._diff.changes.filter((n) => n.kind === "REMOVED").map((n) => n.name ?? n.id);
      return A`<span
                      class="badge solution"
                      title=${i.length ? `Eliminados respecto al sistema: ${i.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${t("ADDED")} ～${t("MODIFIED")} －${t("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? A`
                    <input
                      placeholder="Nombre de la solución…"
                      .value=${this._newSolutionName}
                      @input=${(t) => this._newSolutionName = t.target.value}
                      @keydown=${(t) => t.key === "Enter" && this.createSolution()}
                    />
                    <button @click=${this.createSolution}>Crear</button>
                    <button @click=${() => this._creatingSolution = !1}>Cancelar</button>
                  ` : ""}
              ${!this._workspace.system && !this._creatingSolution ? (() => {
      var i;
      const t = (i = this._workspace.solutions.find(
        (n) => n.branch === this._workspace.current
      )) == null ? void 0 : i.status;
      return A`
                      ${t === "EXPLORING" ? A`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${t === "PROPOSED" ? A`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${t === "APPROVED" ? A`<button
                            title="Merge semántico al sistema: la solución pasa a ser el nuevo as-is"
                            @click=${() => void this.startMergeFlow("merge")}
                          >
                            ⇧ Mergear al sistema
                          </button>` : ""}
                      <button
                        title="Trae al to-be los avances del sistema (merge semántico)"
                        @click=${() => void this.startMergeFlow("update")}
                      >
                        ⟳ Actualizar del sistema
                      </button>
                      <button
                        title="Archiva la solución (tag) y borra su rama"
                        @click=${() => void this.solutionOp("discard", { branch: this._workspace.current })}
                      >
                        ⏏ Descartar
                      </button>
                    `;
    })() : ""}
            </div>
          ` : ""}
      ${this._mergeFlow ? A`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (t) => A`
                  <div class="merge-row">
                    <span class="merge-el">${t.type} · ${t.name ?? t.id}</span>
                    <label title=${t.system ?? "(eliminado en el sistema)"}>
                      <input
                        type="radio"
                        name=${t.key}
                        .checked=${this._mergeFlow.resolutions[t.key] === "system"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [t.key]: "system" }
      }}
                      />
                      Sistema
                    </label>
                    <label title=${t.solution ?? "(eliminado en la solución)"}>
                      <input
                        type="radio"
                        name=${t.key}
                        .checked=${this._mergeFlow.resolutions[t.key] === "solution"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [t.key]: "solution" }
      }}
                      />
                      Solución
                    </label>
                  </div>
                `
    )}
              <div class="merge-actions">
                <button
                  ?disabled=${this._mergeFlow.conflicts.some(
      (t) => !this._mergeFlow.resolutions[t.key]
    )}
                  @click=${() => void this.confirmMergeFlow()}
                >
                  Confirmar
                </button>
                <button @click=${() => this._mergeFlow = null}>Cancelar</button>
              </div>
            </div>
          ` : ""}
      <modux-editor
        .model=${this._model}
        .layout=${this._layout}
        .diff=${this._diff && !((e = this._workspace) != null && e.system) ? Object.fromEntries(
      this._diff.changes.filter((t) => t.kind !== "REMOVED").map((t) => [t.id, t.kind])
    ) : null}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(t) => this.showToast(t.detail.message, t.detail.kind ?? "info")}
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
ee.styles = Xt`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 480px;
    }
    modux-editor {
      width: 100%;
      flex: 1;
      min-height: 0;
    }
    .workspace {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: #334155;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-bottom: none;
      border-radius: 10px 10px 0 0;
    }
    .workspace label {
      font-size: 12px;
      color: #64748b;
    }
    .workspace select,
    .workspace input {
      font-size: 13px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
    }
    .workspace button {
      border: none;
      background: transparent;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
      color: #334155;
    }
    .workspace button:hover {
      background: #e2e8f0;
    }
    .workspace .badge {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 2px 8px;
      border-radius: 999px;
      background: #dbeafe;
      color: #1d4ed8;
    }
    .workspace .badge.solution {
      background: #fef3c7;
      color: #b45309;
    }
    .merge-panel {
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: #334155;
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-bottom: none;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .merge-title {
      font-weight: 600;
    }
    .merge-row {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .merge-el {
      min-width: 320px;
      font-family: ui-monospace, monospace;
      font-size: 12px;
    }
    .merge-actions {
      display: flex;
      gap: 8px;
      margin-top: 4px;
    }
    .merge-actions button {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      padding: 5px 12px;
      border-radius: 8px;
      cursor: pointer;
    }
    .merge-actions button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
ne([
  le()
], ee.prototype, "base", 2);
ne([
  M()
], ee.prototype, "_model", 2);
ne([
  M()
], ee.prototype, "_layout", 2);
ne([
  M()
], ee.prototype, "_error", 2);
ne([
  M()
], ee.prototype, "_saving", 2);
ne([
  M()
], ee.prototype, "_toast", 2);
ne([
  M()
], ee.prototype, "_workspace", 2);
ne([
  M()
], ee.prototype, "_creatingSolution", 2);
ne([
  M()
], ee.prototype, "_newSolutionName", 2);
ne([
  M()
], ee.prototype, "_diff", 2);
ne([
  M()
], ee.prototype, "_mergeFlow", 2);
ee = ne([
  Qt("modux-editor-connected")
], ee);
export {
  $d as CONTAINER_HEADER,
  bd as CONTAINER_INSET,
  Y as ModuxCanvas,
  R as ModuxEditor,
  ee as ModuxEditorConnected,
  Wn as aggregatesScene,
  $n as containerFit,
  In as containerMinSize,
  Ln as contextMapScene,
  Nn as flowCoherence,
  es as flowsScene,
  bn as normalizeViewLayout,
  ri as processesScene,
  Mn as relationEdgeId
};
