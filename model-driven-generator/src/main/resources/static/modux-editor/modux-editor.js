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
  let n = t.w / 2, s = t.w / 2, r = t.h / 2, o = t.h / 2;
  for (const a of i)
    n = Math.max(n, -a.dx + a.w / 2 + 10), s = Math.max(s, a.dx + a.w / 2 + 10), r = Math.max(r, -a.dy + a.h / 2 + 34), o = Math.max(o, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (o - r) / 2,
    w: n + s,
    h: r + o
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
}, ze = 168, qe = 56, qi = 34, Hi = 14, An = 14, Be = 108, Ge = 32, Vi = 12, Fi = 10, Ye = 2, Cn = Ye * Be + (Ye - 1) * Vi + 2 * Hi;
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
function rt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Pn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Tn = {
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
  api: { symbol: "interface", fill: "#eef2ff", stroke: "#4f46e5" },
  "proxy-api": { symbol: "interface", fill: "#ecfeff", stroke: "#0e7490" }
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
  api: "API publicada por este sistema",
  "proxy-api": "Proxy/cache de una API, alojado en este sistema"
};
function On(e) {
  const t = Math.max(1, Math.ceil(e / Ye)), i = t * Ge + (t - 1) * Fi;
  return { w: Cn, h: qi + i + An };
}
function Un(e, t) {
  const i = e % Ye, n = Math.floor(e / Ye);
  return {
    x: -t.w / 2 + Hi + i * (Be + Vi) + Be / 2,
    y: -t.h / 2 + qi + n * (Ge + Fi) + Ge / 2
  };
}
function Dn(e, t, i, n, s, r) {
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
  return a.length ? Ut(i, n, a, s, r) : [{ ...n, x: i.x, y: i.y, w: ze, h: qe }];
}
function Ut(e, t, i, n, s) {
  const r = s[t.id] ?? On(i.length), o = i.map((u, m) => n[u.id] ?? Un(m, r)), a = $n(
    e,
    r,
    o.map((u) => ({ dx: u.x, dy: u.y, w: Be, h: Ge }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, c = i.map((u, m) => {
    const f = o[m], y = u.policy ? Pn : Tn[u.kind];
    return {
      id: u.id,
      label: u.name,
      kind: u.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: Be,
      h: Ge,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${u.policy ? "Policy" : Rn[u.kind]} ${u.name}`
    };
  });
  return [d, ...c];
}
function Ln(e, t, i = !1, n = {}) {
  const s = new Set(e.externalSystems.map((l) => l.id)), r = (e.apis ?? []).filter(
    (l) => l.publishedByExternalSystemId && s.has(l.publishedByExternalSystemId)
  ), o = new Set(r.map((l) => l.id)), a = (e.proxyApis ?? []).filter(
    (l) => l.publishedByExternalSystemId && s.has(l.publishedByExternalSystemId)
  ), d = new Set(a.map((l) => l.id)), c = [
    ...e.modules.map((l) => ({ ref: l, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((l) => ({ ref: l, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((l) => !o.has(l.id)).map((l) => ({ ref: l, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((l) => !d.has(l.id)).map((l) => ({ ref: l, external: !1, api: !1, proxy: !0 }))
  ], u = c.flatMap((l, _) => {
    const k = t[l.ref.id] ?? rt(_, c.length);
    if (l.proxy) {
      const q = l.ref;
      return [{
        id: q.id,
        label: q.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${q.name} — proxy/cache de una API, consumible como ella`,
        x: k.x,
        y: k.y,
        w: ze,
        h: qe
      }];
    }
    if (l.api) {
      const q = l.ref, K = {
        id: q.id,
        label: q.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${q.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return i && q.operations.length > 0 ? Ut(
        k,
        K,
        q.operations.map(
          (Y) => ({ id: Y.id, name: Y.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{ ...K, x: k.x, y: k.y, w: ze, h: qe }];
    }
    if (l.external) {
      const q = l.ref, K = {
        id: q.id,
        label: q.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${q.name} (sistema externo)`
      }, Y = r.filter((V) => V.publishedByExternalSystemId === q.id), ie = a.filter((V) => V.publishedByExternalSystemId === q.id), Q = [
        ...Y.map((V) => ({ id: V.id, name: V.name, kind: "api" })),
        ...ie.map((V) => ({ id: V.id, name: V.name, kind: "proxy-api" })),
        ...i ? [
          ...(q.useCases ?? []).map(
            (V) => ({ id: V.id, name: V.name, kind: "external-use-case" })
          ),
          ...(q.tables ?? []).map(
            (V) => ({ id: V.id, name: V.name, kind: "external-table" })
          )
        ] : []
      ];
      return Q.length > 0 ? Ut(k, K, Q, t, n) : [{ ...K, x: k.x, y: k.y, w: ze, h: qe }];
    }
    const S = l.ref, D = S.subdomainType ?? "GENERIC", H = {
      id: S.id,
      label: S.name,
      kind: "module",
      symbol: "component",
      fill: kn[D],
      stroke: "#94a3b8",
      badge: D,
      tooltip: `${S.name} — subdominio ${D}`
    };
    return i ? Dn(e, S, k, H, t, n) : [{ ...H, x: k.x, y: k.y, w: ze, h: qe }];
  }), m = c.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length;
  (e.actors ?? []).forEach((l, _) => {
    const k = t[l.id] ?? rt(c.length + _, m);
    u.push({
      id: l.id,
      label: l.name,
      x: k.x,
      y: k.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${l.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((l, _) => {
    const k = t[l.id] ?? rt(c.length + (e.actors ?? []).length + _, m);
    u.push({
      id: l.id,
      label: l.name,
      x: k.x,
      y: k.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${l.name} (agente de IA — consume por MCP)`
    });
  });
  const f = [];
  (e.rags ?? []).forEach((l, _) => {
    const k = t[l.id] ?? rt(
      c.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + _,
      m
    );
    u.push({
      id: l.id,
      label: l.name,
      x: k.x,
      y: k.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${l.name} (base de conocimiento — retrieval para agentes)`
    }), (l.contentSources ?? []).forEach((S, D) => {
      const H = `ragcs:${l.id}:${S.uri}`, q = t[H] ?? { x: k.x + 170, y: k.y - 30 + D * 44 };
      u.push({
        id: H,
        label: S.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: q.x,
        y: q.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: S.type,
        tooltip: `${S.type}: ${S.uri}`
      }), f.push({
        id: `ragcse:${l.id}:${S.uri}`,
        sourceId: H,
        targetId: l.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), u.sort((l, _) => (l.parentId ? 1 : 0) - (_.parentId ? 1 : 0));
  const y = e.relations.map((l) => ({
    id: Mn(l.sourceId, l.targetId),
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "relation",
    label: l.type ? En[l.type] : "?",
    color: l.declared ? "#475569" : "#94a3b8",
    dashed: !l.declared,
    arrow: !0,
    tooltip: l.type ? `${l.type} (${l.sourceId} upstream → ${l.targetId} downstream)${l.reasons ? ` — ${l.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${l.reasons ? ` — ${l.reasons}` : ""}`
  })), b = e.flows.map((l) => {
    var q, K, Y, ie, Q, V;
    const _ = Nn(e, l), k = i ? e.modules.find((J) => J.id === l.sourceId) : void 0, S = ((q = k == null ? void 0 : k.domainEvents) == null ? void 0 : q.find((J) => J.name === l.triggerEvent)) ?? ((K = k == null ? void 0 : k.applicationEvents) == null ? void 0 : K.find((J) => J.name === l.triggerEvent)), D = i && l.readModelName ? (ie = (Y = e.modules.find((J) => J.id === l.targetId)) == null ? void 0 : Y.readModels) == null ? void 0 : ie.find((J) => J.name === l.readModelName) : void 0, H = i && l.targetUseCaseId ? (V = (Q = e.modules.find((J) => J.id === l.targetId)) == null ? void 0 : Q.useCases) == null ? void 0 : V.find((J) => J.id === l.targetUseCaseId) : void 0;
    return {
      id: `flow:${l.id}`,
      sourceId: (S == null ? void 0 : S.id) ?? l.sourceId,
      targetId: (H == null ? void 0 : H.id) ?? (D == null ? void 0 : D.id) ?? l.targetId,
      kind: "flow",
      label: l.name,
      color: Sn[_],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${l.name} [${l.archetype}] — ${_}`
    };
  }), v = new Set(u.map((l) => l.id)), N = i ? (e.emissions ?? []).filter((l) => v.has(l.sourceId) && v.has(l.domainEventId)).map((l) => ({
    id: `emit:${l.sourceId}->${l.domainEventId}`,
    sourceId: l.sourceId,
    targetId: l.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], I = i ? (e.projections ?? []).map((l) => ({
    p: l,
    source: l.sourceAggregateId ?? l.sourceExternalUseCaseId ?? l.sourceExternalTableId
  })).filter(({ p: l, source: _ }) => _ && l.readModelId).filter(({ p: l, source: _ }) => v.has(_) && v.has(l.readModelId)).map(({ p: l, source: _ }) => ({
    id: `proj:${l.id}`,
    sourceId: _,
    targetId: l.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: l.sourceAggregateId ? `Proyección ${l.name}: el estado del agregado se materializa en ${l.readModelName ?? l.readModelId}` : `Proyección ${l.name}: polling hacia ${l.readModelName ?? l.readModelId}`
  })) : [], P = (e.apis ?? []).flatMap(
    (l) => l.operations.flatMap((_) => {
      const k = i && v.has(_.id) ? _.id : l.id;
      if (!v.has(k)) return [];
      const S = i && _.targetUseCaseId && v.has(_.targetUseCaseId) ? _.targetUseCaseId : _.targetModuleId && v.has(_.targetModuleId) ? _.targetModuleId : (_.targetUseCaseId && !i, null);
      return S ? [
        {
          id: `apiwire:${_.id}`,
          sourceId: k,
          targetId: S,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${_.name} la implementa ${S}`
        }
      ] : [];
    })
  ), L = i ? (e.useCaseCalls ?? []).filter((l) => v.has(l.sourceId) && v.has(l.targetId)).map((l) => ({
    id: `uccall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], x = i ? (e.queryCalls ?? []).filter((l) => v.has(l.sourceId) && v.has(l.targetId)).map((l) => ({
    id: `qscall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], $ = i ? (e.actorUses ?? []).filter((l) => v.has(l.actorId) && v.has(l.targetId)).map((l) => ({
    id: `use:${l.actorId}->${l.targetId}`,
    sourceId: l.actorId,
    targetId: l.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], E = (e.actorExternalDependencies ?? []).filter((l) => v.has(l.actorId) && v.has(l.externalSystemId)).map((l) => ({
    id: `extdep:${l.actorId}->${l.externalSystemId}`,
    sourceId: l.actorId,
    targetId: l.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), A = new Map([
    ...(e.apis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId])
  ]), W = (l) => v.has(l) ? l : A.get(l) ?? l, F = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((l) => ({ sourceId: l.sourceId, targetId: W(l.targetId) })).filter(
        (l) => v.has(l.sourceId) && v.has(l.targetId) && l.sourceId !== l.targetId
      ).map((l) => [
        `xdep:${l.sourceId}->${l.targetId}`,
        {
          id: `xdep:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "ext-dep",
          color: "#64748b",
          dashed: !0,
          arrow: !0,
          tooltip: "depende de"
        }
      ])
    ).values()
  ], G = [
    ...new Map(
      (e.proxyApis ?? []).filter((l) => l.targetApiId).map((l) => ({ sourceId: W(l.id), targetId: W(l.targetApiId) })).filter(
        (l) => v.has(l.sourceId) && v.has(l.targetId) && l.sourceId !== l.targetId
      ).map((l) => [
        `pxt:${l.sourceId}->${l.targetId}`,
        {
          id: `pxt:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "proxy-target",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: "proxy/cache de"
        }
      ])
    ).values()
  ], j = i ? (e.agentUses ?? []).filter((l) => v.has(l.agentId) && v.has(l.useCaseId)).map((l) => ({
    id: `mcp:${l.agentId}->${l.useCaseId}`,
    sourceId: l.agentId,
    targetId: l.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], te = (e.agentRags ?? []).filter((l) => v.has(l.agentId) && v.has(l.ragId)).map((l) => ({
    id: `agrag:${l.agentId}->${l.ragId}`,
    sourceId: l.agentId,
    targetId: l.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), p = i ? (e.rags ?? []).filter((l) => v.has(l.id)).flatMap(
    (l) => (l.sourceReadModelIds ?? []).filter((_) => v.has(_)).map((_) => ({
      id: `ragsrc:${l.id}->${_}`,
      sourceId: l.id,
      targetId: _,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name} indexa este read model`
    }))
  ) : [], h = i ? (e.agentExternalUses ?? []).filter((l) => v.has(l.agentId) && v.has(l.externalUseCaseId)).map((l) => ({
    id: `mcpx:${l.agentId}->${l.externalUseCaseId}`,
    sourceId: l.agentId,
    targetId: l.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], w = i ? (e.externalCalls ?? []).filter((l) => v.has(l.externalSystemId) && v.has(l.useCaseId)).map((l) => ({
    id: `extcall:${l.externalSystemId}->${l.useCaseId}`,
    sourceId: l.externalSystemId,
    targetId: l.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], g = i ? (e.externalUseCaseCalls ?? []).filter((l) => v.has(l.sourceId) && v.has(l.targetId)).map((l) => ({
    id: `extuccall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [];
  return {
    nodes: u,
    edges: [
      ...y,
      ...b,
      ...N,
      ...I,
      ...P,
      ...L,
      ...x,
      ...$,
      ...E,
      ...F,
      ...G,
      ...j,
      ...h,
      ...te,
      ...p,
      ...f,
      ...w,
      ...g
    ]
  };
}
const zn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, qn = 176, Hn = 60, Vn = 140, Fn = 40;
function Kn(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, r) => {
    const o = 220 + r * 340;
    i.filter((d) => d.moduleId === s.id).forEach((d, c) => {
      const u = n.filter((f) => f.aggregateId === d.id).length, m = 140 + c * (170 + u * 60);
      t[d.id] = { x: o, y: m }, n.filter((f) => f.aggregateId === d.id).forEach((f, y) => {
        t[f.id] = { x: o + 60, y: m + 100 + y * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((r) => r.id === s.moduleId)).forEach((s, r) => {
    t[s.id] = { x: 220 + r * 340, y: 640 };
  }), t;
}
function Wn(e, t) {
  const i = Kn(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), r = (e.aggregates ?? []).map((c) => {
    const u = s.get(c.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", f = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: f.x,
      y: f.y,
      w: qn,
      h: Hn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: zn[m],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${u ? ` — módulo ${u.name} (${m})` : ""}`
    };
  }), o = (e.entities ?? []).map((c) => {
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
  })), d = (e.aggregateReferences ?? []).map((c, u) => ({
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
    nodes: [...r, ...o],
    edges: [...a, ...d]
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
  const i = e.flows, n = [], s = [], r = /* @__PURE__ */ new Set(), o = (a) => {
    var d, c;
    return ((c = (d = e.aggregates) == null ? void 0 : d.find((u) => u.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, d) => {
    const c = 120 + d * 130, u = Bn[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!r.has(m)) {
      r.add(m);
      const N = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: a.triggerAggregateId ? o(a.triggerAggregateId) : m,
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
    const f = `flow:${a.id}`, y = t[f] ?? { x: 470, y: c };
    n.push({
      id: f,
      label: a.name,
      x: y.x,
      y: y.y,
      w: Xn,
      h: jn,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const b = Jn(e, a), v = `tgt:${b.id}`;
    if (!r.has(v)) {
      r.add(v);
      const N = t[v] ?? { x: 790, y: c };
      n.push({
        id: v,
        label: b.label,
        x: N.x,
        y: N.y,
        w: Zn,
        h: Qn,
        kind: b.external ? "external-system" : "module",
        symbol: "component",
        fill: b.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: b.external,
        badge: b.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${a.id}:in`,
      sourceId: m,
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
      targetId: v,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const ts = 190, is = 56, At = 170, ns = 52;
function oi(e, t) {
  const i = [], n = [], s = (r) => {
    var o;
    return (o = e.modules.find((a) => a.id === r)) == null ? void 0 : o.name;
  };
  return (e.processes ?? []).forEach((r, o) => {
    const a = 140 + o * 240, d = t[r.id] ?? { x: 150, y: a };
    i.push({
      id: r.id,
      label: r.name,
      x: d.x,
      y: d.y,
      w: ts,
      h: is,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${r.sla ? ` · SLA ${r.sla}` : ""}`,
      tooltip: `${r.name}${s(r.ownerModuleId) ? ` — módulo ${s(r.ownerModuleId)}` : ""}${r.triggerEvent ? ` · arranca con ${r.triggerEvent}` : ""}`
    });
    let c = r.id;
    if (r.steps.forEach((u, m) => {
      const f = u.type === "HUMAN", y = t[u.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: u.id,
        label: u.name,
        x: y.x,
        y: y.y,
        w: At,
        h: ns,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), n.push({
        id: `pe:${r.id}:${m}`,
        sourceId: c,
        targetId: u.id,
        kind: "process-seq",
        label: m === 0 ? r.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const b = `comp:${u.id}`, v = t[b] ?? { x: y.x, y: y.y + 90 };
        i.push({
          id: b,
          label: u.compensationUseCaseId,
          x: v.x,
          y: v.y,
          w: At,
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
          targetId: b,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = u.id;
    }), r.onCompletionEventName) {
      const u = `done:${r.id}`, m = t[u] ?? { x: 150 + (r.steps.length + 1) * 240, y: a };
      i.push({
        id: u,
        label: r.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: At,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${r.id}`,
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
const ut = globalThis, Gt = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yt = Symbol(), ai = /* @__PURE__ */ new WeakMap();
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
  const i = e.length === 1 ? e[0] : t.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[r + 1], e[0]);
  return new Ki(i, e, Yt);
}, rs = (e, t) => {
  if (Gt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = ut.litNonce;
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
const { is: os, defineProperty: as, getOwnPropertyDescriptor: ds, getOwnPropertyNames: ls, getOwnPropertySymbols: cs, getPrototypeOf: us } = Object, ve = globalThis, li = ve.trustedTypes, hs = li ? li.emptyScript : "", Ct = ve.reactiveElementPolyfillSupport, Fe = (e, t) => e, gt = { toAttribute(e, t) {
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
} }, jt = (e, t) => !os(e, t), ci = { attribute: !0, type: String, converter: gt, reflect: !1, useDefault: !1, hasChanged: jt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ve.litPropertyMetadata ?? (ve.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Me = class extends HTMLElement {
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
    const { get: s, set: r } = ds(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: s, set(o) {
      const a = s == null ? void 0 : s.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ci;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Fe("elementProperties"))) return;
    const t = us(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Fe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Fe("properties"))) {
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
    return rs(t, this.constructor.elementStyles), t;
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
    var r;
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const o = (((r = n.converter) == null ? void 0 : r.toAttribute) !== void 0 ? n.converter : gt).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var r, o;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : gt;
      this._$Em = s;
      const c = d.fromAttribute(i, a.type);
      this[s] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, r) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? jt)(r, i) || n.useDefault && n.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: r }, o) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
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
Me.elementStyles = [], Me.shadowRootOptions = { mode: "open" }, Me[Fe("elementProperties")] = /* @__PURE__ */ new Map(), Me[Fe("finalized")] = /* @__PURE__ */ new Map(), Ct == null || Ct({ ReactiveElement: Me }), (ve.reactiveElementVersions ?? (ve.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis, ui = (e) => e, wt = Ke.trustedTypes, hi = wt ? wt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Wi = "$lit$", ye = `lit$${Math.random().toFixed(9).slice(2)}$`, Bi = "?" + ye, ps = `<${Bi}>`, Se = document, Xe = () => Se.createComment(""), je = (e) => e === null || typeof e != "object" && typeof e != "function", Zt = Array.isArray, fs = (e) => Zt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Mt = `[ 	
\f\r]`, Ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pi = /-->/g, fi = />/g, _e = RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mi = /'/g, gi = /"/g, Gi = /^(?:script|style|textarea|title)$/i, Yi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), C = Yi(1), U = Yi(2), Pe = Symbol.for("lit-noChange"), Z = Symbol.for("lit-nothing"), wi = /* @__PURE__ */ new WeakMap(), Ie = Se.createTreeWalker(Se, 129);
function Xi(e, t) {
  if (!Zt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hi !== void 0 ? hi.createHTML(t) : t;
}
const ms = (e, t) => {
  const i = e.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Ue;
  for (let a = 0; a < i; a++) {
    const d = e[a];
    let c, u, m = -1, f = 0;
    for (; f < d.length && (o.lastIndex = f, u = o.exec(d), u !== null); ) f = o.lastIndex, o === Ue ? u[1] === "!--" ? o = pi : u[1] !== void 0 ? o = fi : u[2] !== void 0 ? (Gi.test(u[2]) && (s = RegExp("</" + u[2], "g")), o = _e) : u[3] !== void 0 && (o = _e) : o === _e ? u[0] === ">" ? (o = s ?? Ue, m = -1) : u[1] === void 0 ? m = -2 : (m = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? _e : u[3] === '"' ? gi : mi) : o === gi || o === mi ? o = _e : o === pi || o === fi ? o = Ue : (o = _e, s = void 0);
    const y = o === _e && e[a + 1].startsWith("/>") ? " " : "";
    r += o === Ue ? d + ps : m >= 0 ? (n.push(c), d.slice(0, m) + Wi + d.slice(m) + ye + y) : d + ye + (m === -2 ? a : y);
  }
  return [Xi(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ze {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, d = this.parts, [c, u] = ms(t, i);
    if (this.el = Ze.createElement(c, n), Ie.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = Ie.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Wi)) {
          const f = u[o++], y = s.getAttribute(m).split(ye), b = /([.?@])?(.*)/.exec(f);
          d.push({ type: 1, index: r, name: b[2], strings: y, ctor: b[1] === "." ? ws : b[1] === "?" ? ys : b[1] === "@" ? vs : bt }), s.removeAttribute(m);
        } else m.startsWith(ye) && (d.push({ type: 6, index: r }), s.removeAttribute(m));
        if (Gi.test(s.tagName)) {
          const m = s.textContent.split(ye), f = m.length - 1;
          if (f > 0) {
            s.textContent = wt ? wt.emptyScript : "";
            for (let y = 0; y < f; y++) s.append(m[y], Xe()), Ie.nextNode(), d.push({ type: 2, index: ++r });
            s.append(m[f], Xe());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Bi) d.push({ type: 2, index: r });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(ye, m + 1)) !== -1; ) d.push({ type: 7, index: r }), m += ye.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = Se.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Te(e, t, i = e, n) {
  var o, a;
  if (t === Pe) return t;
  let s = n !== void 0 ? (o = i._$Co) == null ? void 0 : o[n] : i._$Cl;
  const r = je(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), r === void 0 ? s = void 0 : (s = new r(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Te(e, s._$AS(e, t.values), s, n)), t;
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Se).importNode(i, !0);
    Ie.currentNode = s;
    let r = Ie.nextNode(), o = 0, a = 0, d = n[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let c;
        d.type === 2 ? c = new it(r, r.nextSibling, this, t) : d.type === 1 ? c = new d.ctor(r, d.name, d.strings, this, t) : d.type === 6 && (c = new _s(r, this, t)), this._$AV.push(c), d = n[++a];
      }
      o !== (d == null ? void 0 : d.index) && (r = Ie.nextNode(), o++);
    }
    return Ie.currentNode = Se, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class it {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = Z, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Te(this, t, i), je(t) ? t === Z || t == null || t === "" ? (this._$AH !== Z && this._$AR(), this._$AH = Z) : t !== this._$AH && t !== Pe && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : fs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Z && je(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Se.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ze.createElement(Xi(n.h, n.h[0]), this.options)), n);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(i);
    else {
      const o = new gs(s, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = wi.get(t.strings);
    return i === void 0 && wi.set(t.strings, i = new Ze(t)), i;
  }
  k(t) {
    Zt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of t) s === i.length ? i.push(n = new it(this.O(Xe()), this.O(Xe()), this, this.options)) : n = i[s], n._$AI(r), s++;
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
class bt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, r) {
    this.type = 1, this._$AH = Z, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Z;
  }
  _$AI(t, i = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = Te(this, t, i, 0), o = !je(t) || t !== this._$AH && t !== Pe, o && (this._$AH = t);
    else {
      const a = t;
      let d, c;
      for (t = r[0], d = 0; d < r.length - 1; d++) c = Te(this, a[n + d], i, d), c === Pe && (c = this._$AH[d]), o || (o = !je(c) || c !== this._$AH[d]), c === Z ? t = Z : t !== Z && (t += (c ?? "") + r[d + 1]), this._$AH[d] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === Z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ws extends bt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Z ? void 0 : t;
  }
}
class ys extends bt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Z);
  }
}
class vs extends bt {
  constructor(t, i, n, s, r) {
    super(t, i, n, s, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Te(this, t, i, 0) ?? Z) === Pe) return;
    const n = this._$AH, s = t === Z && n !== Z || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== Z && (n === Z || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
const Nt = Ke.litHtmlPolyfillSupport;
Nt == null || Nt(Ze, it), (Ke.litHtmlVersions ?? (Ke.litHtmlVersions = [])).push("3.3.3");
const xs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new it(t.insertBefore(Xe(), r), r, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = globalThis;
class ke extends Me {
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
    return Pe;
  }
}
var zi;
ke._$litElement$ = !0, ke.finalized = !0, (zi = be.litElementHydrateSupport) == null || zi.call(be, { LitElement: ke });
const Pt = be.litElementPolyfillSupport;
Pt == null || Pt({ LitElement: ke });
(be.litElementVersions ?? (be.litElementVersions = [])).push("4.2.2");
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
const Is = { attribute: !0, type: String, converter: gt, reflect: !1, hasChanged: jt }, $s = (e = Is, t, i) => {
  const { kind: n, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), n === "accessor") {
    const { name: o } = i;
    return { set(a) {
      const d = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, d, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: o } = i;
    return function(a) {
      const d = this[o];
      t.call(this, a), this.requestUpdate(o, d, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function he(e) {
  return (t, i) => typeof i == "object" ? $s(e, t, i) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(e) {
  return he({ ...e, state: !0, attribute: !1 });
}
var Dt = "http://www.w3.org/1999/xhtml";
const yi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Dt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function kt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), yi.hasOwnProperty(t) ? { space: yi[t], local: e } : e;
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
  var t = kt(e);
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
    for (var r = t[s], o = r.length, a = n[s] = new Array(o), d, c, u = 0; u < o; ++u)
      (d = r[u]) && (c = e.call(d, d.__data__, u, r)) && ("__data__" in d && (c.__data__ = d.__data__), a[u] = c);
  return new re(n, this._parents);
}
function As(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Cs() {
  return [];
}
function Zi(e) {
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
  typeof e == "function" ? e = Ms(e) : e = Zi(e);
  for (var t = this._groups, i = t.length, n = [], s = [], r = 0; r < i; ++r)
    for (var o = t[r], a = o.length, d, c = 0; c < a; ++c)
      (d = o[c]) && (n.push(e.call(d, d.__data__, c, o)), s.push(d));
  return new re(n, s);
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
var Ps = Array.prototype.find;
function Ts(e) {
  return function() {
    return Ps.call(this.children, e);
  };
}
function Rs() {
  return this.firstElementChild;
}
function Os(e) {
  return this.select(e == null ? Rs : Ts(typeof e == "function" ? e : Ji(e)));
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
function qs(e) {
  typeof e != "function" && (e = Qi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = t[s], o = r.length, a = n[s] = [], d, c = 0; c < o; ++c)
      (d = r[c]) && e.call(d, d.__data__, c, r) && a.push(d);
  return new re(n, this._parents);
}
function en(e) {
  return new Array(e.length);
}
function Hs() {
  return new re(this._enter || this._groups.map(en), this._parents);
}
function yt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
yt.prototype = {
  constructor: yt,
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
function Fs(e, t, i, n, s, r) {
  for (var o = 0, a, d = t.length, c = r.length; o < c; ++o)
    (a = t[o]) ? (a.__data__ = r[o], n[o] = a) : i[o] = new yt(e, r[o]);
  for (; o < d; ++o)
    (a = t[o]) && (s[o] = a);
}
function Ks(e, t, i, n, s, r, o) {
  var a, d, c = /* @__PURE__ */ new Map(), u = t.length, m = r.length, f = new Array(u), y;
  for (a = 0; a < u; ++a)
    (d = t[a]) && (f[a] = y = o.call(d, d.__data__, a, t) + "", c.has(y) ? s[a] = d : c.set(y, d));
  for (a = 0; a < m; ++a)
    y = o.call(e, r[a], a, r) + "", (d = c.get(y)) ? (n[a] = d, d.__data__ = r[a], c.delete(y)) : i[a] = new yt(e, r[a]);
  for (a = 0; a < u; ++a)
    (d = t[a]) && c.get(f[a]) === d && (s[a] = d);
}
function Ws(e) {
  return e.__data__;
}
function Bs(e, t) {
  if (!arguments.length) return Array.from(this, Ws);
  var i = t ? Ks : Fs, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Vs(e));
  for (var r = s.length, o = new Array(r), a = new Array(r), d = new Array(r), c = 0; c < r; ++c) {
    var u = n[c], m = s[c], f = m.length, y = Gs(e.call(u, u && u.__data__, c, n)), b = y.length, v = a[c] = new Array(b), N = o[c] = new Array(b), I = d[c] = new Array(f);
    i(u, m, v, N, I, y, t);
    for (var P = 0, L = 0, x, $; P < b; ++P)
      if (x = v[P]) {
        for (P >= L && (L = P + 1); !($ = N[L]) && ++L < b; ) ;
        x._next = $ || null;
      }
  }
  return o = new re(o, n), o._enter = a, o._exit = d, o;
}
function Gs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ys() {
  return new re(this._exit || this._groups.map(en), this._parents);
}
function Xs(e, t, i) {
  var n = this.enter(), s = this, r = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? r.remove() : i(r), n && s ? n.merge(s).order() : s;
}
function js(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, r = n.length, o = Math.min(s, r), a = new Array(s), d = 0; d < o; ++d)
    for (var c = i[d], u = n[d], m = c.length, f = a[d] = new Array(m), y, b = 0; b < m; ++b)
      (y = c[b] || u[b]) && (f[b] = y);
  for (; d < s; ++d)
    a[d] = i[d];
  return new re(a, this._parents);
}
function Zs() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, r = n[s], o; --s >= 0; )
      (o = n[s]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function Qs(e) {
  e || (e = Js);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), r = 0; r < n; ++r) {
    for (var o = i[r], a = o.length, d = s[r] = new Array(a), c, u = 0; u < a; ++u)
      (c = o[u]) && (d[u] = c);
    d.sort(t);
  }
  return new re(s, this._parents).order();
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
function ir() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, r = n.length; s < r; ++s) {
      var o = n[s];
      if (o) return o;
    }
  return null;
}
function nr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function sr() {
  return !this.node();
}
function rr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], r = 0, o = s.length, a; r < o; ++r)
      (a = s[r]) && e.call(a, a.__data__, r, s);
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
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function ur(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function hr(e, t) {
  var i = kt(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ar : or : typeof t == "function" ? i.local ? ur : cr : i.local ? lr : dr)(i, t));
}
function tn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function pr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function fr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function mr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function gr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? pr : typeof t == "function" ? mr : fr)(e, t, i ?? "")) : Re(this.node(), e);
}
function Re(e, t) {
  return e.style.getPropertyValue(t) || tn(e).getComputedStyle(e, null).getPropertyValue(t);
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
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function _r(e, t) {
  return arguments.length > 1 ? this.each((t == null ? wr : typeof t == "function" ? vr : yr)(e, t)) : this.node()[e];
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
function rn(e, t) {
  for (var i = ei(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function on(e, t) {
  for (var i = ei(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function xr(e) {
  return function() {
    rn(this, e);
  };
}
function Ir(e) {
  return function() {
    on(this, e);
  };
}
function $r(e, t) {
  return function() {
    (t.apply(this, arguments) ? rn : on)(this, e);
  };
}
function br(e, t) {
  var i = nn(e + "");
  if (arguments.length < 2) {
    for (var n = ei(this.node()), s = -1, r = i.length; ++s < r; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? $r : t ? xr : Ir)(i, t));
}
function kr() {
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
  return arguments.length ? this.each(e == null ? kr : (typeof e == "function" ? Sr : Er)(e)) : this.node().textContent;
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
function Pr(e) {
  return arguments.length ? this.each(e == null ? Cr : (typeof e == "function" ? Nr : Mr)(e)) : this.node().innerHTML;
}
function Tr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Rr() {
  return this.each(Tr);
}
function Or() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ur() {
  return this.each(Or);
}
function Dr(e) {
  var t = typeof e == "function" ? e : ji(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Lr() {
  return null;
}
function zr(e, t) {
  var i = typeof e == "function" ? e : ji(e), n = t == null ? Lr : typeof t == "function" ? t : Jt(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function qr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Hr() {
  return this.each(qr);
}
function Vr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Fr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Kr(e) {
  return this.select(e ? Fr : Vr);
}
function Wr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Br(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Gr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Yr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, r; i < s; ++i)
        r = t[i], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++n] = r;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function Xr(e, t, i) {
  return function() {
    var n = this.__on, s, r = Br(t);
    if (n) {
      for (var o = 0, a = n.length; o < a; ++o)
        if ((s = n[o]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = r, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, r, i), s = { type: e.type, name: e.name, value: t, listener: r, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function jr(e, t, i) {
  var n = Gr(e + ""), s, r = n.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var d = 0, c = a.length, u; d < c; ++d)
        for (s = 0, u = a[d]; s < r; ++s)
          if ((o = n[s]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = t ? Xr : Yr, s = 0; s < r; ++s) this.each(a(n[s], t, i));
  return this;
}
function an(e, t, i) {
  var n = tn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Zr(e, t) {
  return function() {
    return an(this, e, t);
  };
}
function Qr(e, t) {
  return function() {
    return an(this, e, t.apply(this, arguments));
  };
}
function Jr(e, t) {
  return this.each((typeof t == "function" ? Qr : Zr)(e, t));
}
function* eo() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, r = n.length, o; s < r; ++s)
      (o = n[s]) && (yield o);
}
var dn = [null];
function re(e, t) {
  this._groups = e, this._parents = t;
}
function nt() {
  return new re([[document.documentElement]], dn);
}
function to() {
  return this;
}
re.prototype = nt.prototype = {
  constructor: re,
  select: Ss,
  selectAll: Ns,
  selectChild: Os,
  selectChildren: zs,
  filter: qs,
  data: Bs,
  enter: Hs,
  exit: Ys,
  join: Xs,
  merge: js,
  selection: to,
  order: Zs,
  sort: Qs,
  call: er,
  nodes: tr,
  node: ir,
  size: nr,
  empty: sr,
  each: rr,
  attr: hr,
  style: gr,
  property: _r,
  classed: br,
  text: Ar,
  html: Pr,
  raise: Rr,
  lower: Ur,
  append: Dr,
  insert: zr,
  remove: Hr,
  clone: Kr,
  datum: Wr,
  on: jr,
  dispatch: Jr,
  [Symbol.iterator]: eo
};
function ce(e) {
  return typeof e == "string" ? new re([[document.querySelector(e)]], [document.documentElement]) : new re([[e]], dn);
}
function io(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function xe(e, t) {
  if (e = io(e), t === void 0 && (t = e.currentTarget), t) {
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
var no = { value: () => {
} };
function ti() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new ht(i);
}
function ht(e) {
  this._ = e;
}
function so(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
ht.prototype = ti.prototype = {
  constructor: ht,
  on: function(e, t) {
    var i = this._, n = so(e + "", i), s, r = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((s = (e = n[r]).type) && (s = ro(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++r < o; )
      if (s = (e = n[r]).type) i[s] = vi(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = vi(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ht(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), n = 0, s, r; n < s; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (r = this._[e], n = 0, s = r.length; n < s; ++n) r[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], s = 0, r = n.length; s < r; ++s) n[s].value.apply(t, i);
  }
};
function ro(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function vi(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = no, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Lt = { capture: !0, passive: !1 };
function zt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function oo(e) {
  var t = e.document.documentElement, i = ce(e).on("dragstart.drag", zt, Lt);
  "onselectstart" in t ? i.on("selectstart.drag", zt, Lt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ao(e, t) {
  var i = e.document.documentElement, n = ce(e).on("dragstart.drag", null);
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
function st() {
}
var Qe = 0.7, vt = 1 / Qe, Ne = "\\s*([+-]?\\d+)\\s*", Je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ue = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lo = /^#([0-9a-f]{3,8})$/, co = new RegExp(`^rgb\\(${Ne},${Ne},${Ne}\\)$`), uo = new RegExp(`^rgb\\(${ue},${ue},${ue}\\)$`), ho = new RegExp(`^rgba\\(${Ne},${Ne},${Ne},${Je}\\)$`), po = new RegExp(`^rgba\\(${ue},${ue},${ue},${Je}\\)$`), fo = new RegExp(`^hsl\\(${Je},${ue},${ue}\\)$`), mo = new RegExp(`^hsla\\(${Je},${ue},${ue},${Je}\\)$`), _i = {
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
ii(st, et, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xi,
  // Deprecated! Use color.formatHex.
  formatHex: xi,
  formatHex8: go,
  formatHsl: wo,
  formatRgb: Ii,
  toString: Ii
});
function xi() {
  return this.rgb().formatHex();
}
function go() {
  return this.rgb().formatHex8();
}
function wo() {
  return cn(this).formatHsl();
}
function Ii() {
  return this.rgb().formatRgb();
}
function et(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = lo.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? $i(t) : i === 3 ? new ne(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ot(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ot(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = co.exec(e)) ? new ne(t[1], t[2], t[3], 1) : (t = uo.exec(e)) ? new ne(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ho.exec(e)) ? ot(t[1], t[2], t[3], t[4]) : (t = po.exec(e)) ? ot(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = fo.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, 1) : (t = mo.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, t[4]) : _i.hasOwnProperty(e) ? $i(_i[e]) : e === "transparent" ? new ne(NaN, NaN, NaN, 0) : null;
}
function $i(e) {
  return new ne(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ot(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new ne(e, t, i, n);
}
function yo(e) {
  return e instanceof st || (e = et(e)), e ? (e = e.rgb(), new ne(e.r, e.g, e.b, e.opacity)) : new ne();
}
function qt(e, t, i, n) {
  return arguments.length === 1 ? yo(e) : new ne(e, t, i, n ?? 1);
}
function ne(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
ii(ne, qt, ln(st, {
  brighter(e) {
    return e = e == null ? vt : Math.pow(vt, e), new ne(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Qe : Math.pow(Qe, e), new ne(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ne(Ee(this.r), Ee(this.g), Ee(this.b), _t(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: bi,
  // Deprecated! Use color.formatHex.
  formatHex: bi,
  formatHex8: vo,
  formatRgb: ki,
  toString: ki
}));
function bi() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}`;
}
function vo() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}${$e((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ki() {
  const e = _t(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ee(this.r)}, ${Ee(this.g)}, ${Ee(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function _t(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ee(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function $e(e) {
  return e = Ee(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ei(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new de(e, t, i, n);
}
function cn(e) {
  if (e instanceof de) return new de(e.h, e.s, e.l, e.opacity);
  if (e instanceof st || (e = et(e)), !e) return new de();
  if (e instanceof de) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), r = Math.max(t, i, n), o = NaN, a = r - s, d = (r + s) / 2;
  return a ? (t === r ? o = (i - n) / a + (i < n) * 6 : i === r ? o = (n - t) / a + 2 : o = (t - i) / a + 4, a /= d < 0.5 ? r + s : 2 - r - s, o *= 60) : a = d > 0 && d < 1 ? 0 : o, new de(o, a, d, e.opacity);
}
function _o(e, t, i, n) {
  return arguments.length === 1 ? cn(e) : new de(e, t, i, n ?? 1);
}
function de(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
ii(de, _o, ln(st, {
  brighter(e) {
    return e = e == null ? vt : Math.pow(vt, e), new de(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Qe : Math.pow(Qe, e), new de(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new ne(
      Tt(e >= 240 ? e - 240 : e + 120, s, n),
      Tt(e, s, n),
      Tt(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new de(Si(this.h), at(this.s), at(this.l), _t(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = _t(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Si(this.h)}, ${at(this.s) * 100}%, ${at(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Si(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function at(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Tt(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const un = (e) => () => e;
function xo(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Io(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function $o(e) {
  return (e = +e) == 1 ? hn : function(t, i) {
    return i - t ? Io(t, i, e) : un(isNaN(t) ? i : t);
  };
}
function hn(e, t) {
  var i = t - e;
  return i ? xo(e, i) : un(isNaN(e) ? t : e);
}
const Ai = (function e(t) {
  var i = $o(t);
  function n(s, r) {
    var o = i((s = qt(s)).r, (r = qt(r)).r), a = i(s.g, r.g), d = i(s.b, r.b), c = hn(s.opacity, r.opacity);
    return function(u) {
      return s.r = o(u), s.g = a(u), s.b = d(u), s.opacity = c(u), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function we(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ht = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Rt = new RegExp(Ht.source, "g");
function bo(e) {
  return function() {
    return e;
  };
}
function ko(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Eo(e, t) {
  var i = Ht.lastIndex = Rt.lastIndex = 0, n, s, r, o = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (n = Ht.exec(e)) && (s = Rt.exec(t)); )
    (r = s.index) > i && (r = t.slice(i, r), a[o] ? a[o] += r : a[++o] = r), (n = n[0]) === (s = s[0]) ? a[o] ? a[o] += s : a[++o] = s : (a[++o] = null, d.push({ i: o, x: we(n, s) })), i = Rt.lastIndex;
  return i < t.length && (r = t.slice(i), a[o] ? a[o] += r : a[++o] = r), a.length < 2 ? d[0] ? ko(d[0].x) : bo(t) : (t = d.length, function(c) {
    for (var u = 0, m; u < t; ++u) a[(m = d[u]).i] = m.x(c);
    return a.join("");
  });
}
var Ci = 180 / Math.PI, Vt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function pn(e, t, i, n, s, r) {
  var o, a, d;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (d = e * i + t * n) && (i -= e * d, n -= t * d), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, d /= a), e * n < t * i && (e = -e, t = -t, d = -d, o = -o), {
    translateX: s,
    translateY: r,
    rotate: Math.atan2(t, e) * Ci,
    skewX: Math.atan(d) * Ci,
    scaleX: o,
    scaleY: a
  };
}
var dt;
function So(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Vt : pn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Ao(e) {
  return e == null || (dt || (dt = document.createElementNS("http://www.w3.org/2000/svg", "g")), dt.setAttribute("transform", e), !(e = dt.transform.baseVal.consolidate())) ? Vt : (e = e.matrix, pn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fn(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, u, m, f, y, b) {
    if (c !== m || u !== f) {
      var v = y.push("translate(", null, t, null, i);
      b.push({ i: v - 4, x: we(c, m) }, { i: v - 2, x: we(u, f) });
    } else (m || f) && y.push("translate(" + m + t + f + i);
  }
  function o(c, u, m, f) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), f.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: we(c, u) })) : u && m.push(s(m) + "rotate(" + u + n);
  }
  function a(c, u, m, f) {
    c !== u ? f.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: we(c, u) }) : u && m.push(s(m) + "skewX(" + u + n);
  }
  function d(c, u, m, f, y, b) {
    if (c !== m || u !== f) {
      var v = y.push(s(y) + "scale(", null, ",", null, ")");
      b.push({ i: v - 4, x: we(c, m) }, { i: v - 2, x: we(u, f) });
    } else (m !== 1 || f !== 1) && y.push(s(y) + "scale(" + m + "," + f + ")");
  }
  return function(c, u) {
    var m = [], f = [];
    return c = e(c), u = e(u), r(c.translateX, c.translateY, u.translateX, u.translateY, m, f), o(c.rotate, u.rotate, m, f), a(c.skewX, u.skewX, m, f), d(c.scaleX, c.scaleY, u.scaleX, u.scaleY, m, f), c = u = null, function(y) {
      for (var b = -1, v = f.length, N; ++b < v; ) m[(N = f[b]).i] = N.x(y);
      return m.join("");
    };
  };
}
var Co = fn(So, "px, ", "px)", "deg)"), Mo = fn(Ao, ", ", ")", ")"), No = 1e-12;
function Mi(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Po(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function To(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ro = (function e(t, i, n) {
  function s(r, o) {
    var a = r[0], d = r[1], c = r[2], u = o[0], m = o[1], f = o[2], y = u - a, b = m - d, v = y * y + b * b, N, I;
    if (v < No)
      I = Math.log(f / c) / t, N = function(A) {
        return [
          a + A * y,
          d + A * b,
          c * Math.exp(t * A * I)
        ];
      };
    else {
      var P = Math.sqrt(v), L = (f * f - c * c + n * v) / (2 * c * i * P), x = (f * f - c * c - n * v) / (2 * f * i * P), $ = Math.log(Math.sqrt(L * L + 1) - L), E = Math.log(Math.sqrt(x * x + 1) - x);
      I = (E - $) / t, N = function(A) {
        var W = A * I, F = Mi($), G = c / (i * P) * (F * To(t * W + $) - Po($));
        return [
          a + G * y,
          d + G * b,
          c * F / Mi(t * W + $)
        ];
      };
    }
    return N.duration = I * 1e3 * t / Math.SQRT2, N;
  }
  return s.rho = function(r) {
    var o = Math.max(1e-3, +r), a = o * o, d = a * a;
    return e(o, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Oe = 0, He = 0, De = 0, mn = 1e3, xt, Ve, It = 0, Ae = 0, Et = 0, tt = typeof performance == "object" && performance.now ? performance : Date, gn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ni() {
  return Ae || (gn(Oo), Ae = tt.now() + Et);
}
function Oo() {
  Ae = 0;
}
function $t() {
  this._call = this._time = this._next = null;
}
$t.prototype = wn.prototype = {
  constructor: $t,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ni() : +i) + (t == null ? 0 : +t), !this._next && Ve !== this && (Ve ? Ve._next = this : xt = this, Ve = this), this._call = e, this._time = i, Ft();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ft());
  }
};
function wn(e, t, i) {
  var n = new $t();
  return n.restart(e, t, i), n;
}
function Uo() {
  ni(), ++Oe;
  for (var e = xt, t; e; )
    (t = Ae - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Oe;
}
function Ni() {
  Ae = (It = tt.now()) + Et, Oe = He = 0;
  try {
    Uo();
  } finally {
    Oe = 0, Lo(), Ae = 0;
  }
}
function Do() {
  var e = tt.now(), t = e - It;
  t > mn && (Et -= t, It = e);
}
function Lo() {
  for (var e, t = xt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : xt = i);
  Ve = e, Ft(n);
}
function Ft(e) {
  if (!Oe) {
    He && (He = clearTimeout(He));
    var t = e - Ae;
    t > 24 ? (e < 1 / 0 && (He = setTimeout(Ni, e - tt.now() - Et)), De && (De = clearInterval(De))) : (De || (It = tt.now(), De = setInterval(Do, mn)), Oe = 1, gn(Ni));
  }
}
function Pi(e, t, i) {
  var n = new $t();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var zo = ti("start", "end", "cancel", "interrupt"), qo = [], yn = 0, Ti = 1, Kt = 2, pt = 3, Ri = 4, Wt = 5, ft = 6;
function St(e, t, i, n, s, r) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (i in o) return;
  Ho(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: zo,
    tween: qo,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: yn
  });
}
function si(e, t) {
  var i = le(e, t);
  if (i.state > yn) throw new Error("too late; already scheduled");
  return i;
}
function pe(e, t) {
  var i = le(e, t);
  if (i.state > pt) throw new Error("too late; already running");
  return i;
}
function le(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Ho(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = wn(r, 0, i.time);
  function r(c) {
    i.state = Ti, i.timer.restart(o, i.delay, i.time), i.delay <= c && o(c - i.delay);
  }
  function o(c) {
    var u, m, f, y;
    if (i.state !== Ti) return d();
    for (u in n)
      if (y = n[u], y.name === i.name) {
        if (y.state === pt) return Pi(o);
        y.state === Ri ? (y.state = ft, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete n[u]) : +u < t && (y.state = ft, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete n[u]);
      }
    if (Pi(function() {
      i.state === pt && (i.state = Ri, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = Kt, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Kt) {
      for (i.state = pt, s = new Array(f = i.tween.length), u = 0, m = -1; u < f; ++u)
        (y = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = y);
      s.length = m + 1;
    }
  }
  function a(c) {
    for (var u = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(d), i.state = Wt, 1), m = -1, f = s.length; ++m < f; )
      s[m].call(e, u);
    i.state === Wt && (i.on.call("end", e, e.__data__, i.index, i.group), d());
  }
  function d() {
    i.state = ft, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function mt(e, t) {
  var i = e.__transition, n, s, r = !0, o;
  if (i) {
    t = t == null ? null : t + "";
    for (o in i) {
      if ((n = i[o]).name !== t) {
        r = !1;
        continue;
      }
      s = n.state > Kt && n.state < Wt, n.state = ft, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[o];
    }
    r && delete e.__transition;
  }
}
function Vo(e) {
  return this.each(function() {
    mt(this, e);
  });
}
function Fo(e, t) {
  var i, n;
  return function() {
    var s = pe(this, e), r = s.tween;
    if (r !== i) {
      n = i = r;
      for (var o = 0, a = n.length; o < a; ++o)
        if (n[o].name === t) {
          n = n.slice(), n.splice(o, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function Ko(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var r = pe(this, e), o = r.tween;
    if (o !== n) {
      s = (n = o).slice();
      for (var a = { name: t, value: i }, d = 0, c = s.length; d < c; ++d)
        if (s[d].name === t) {
          s[d] = a;
          break;
        }
      d === c && s.push(a);
    }
    r.tween = s;
  };
}
function Wo(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = le(this.node(), i).tween, s = 0, r = n.length, o; s < r; ++s)
      if ((o = n[s]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? Fo : Ko)(i, e, t));
}
function ri(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = pe(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return le(s, n).value[t];
  };
}
function vn(e, t) {
  var i;
  return (typeof t == "number" ? we : t instanceof et ? Ai : (i = et(t)) ? (t = i, Ai) : Eo)(e, t);
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
function Yo(e, t, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttribute(e);
    return o === s ? null : o === n ? r : r = t(n = o, i);
  };
}
function Xo(e, t, i) {
  var n, s = i + "", r;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === s ? null : o === n ? r : r = t(n = o, i);
  };
}
function jo(e, t, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), d;
    return a == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), d = a + "", o === d ? null : o === n && d === s ? r : (s = d, r = t(n = o, a)));
  };
}
function Zo(e, t, i) {
  var n, s, r;
  return function() {
    var o, a = i(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), d = a + "", o === d ? null : o === n && d === s ? r : (s = d, r = t(n = o, a)));
  };
}
function Qo(e, t) {
  var i = kt(e), n = i === "transform" ? Mo : vn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Zo : jo)(i, n, ri(this, "attr." + e, t)) : t == null ? (i.local ? Go : Bo)(i) : (i.local ? Xo : Yo)(i, n, t));
}
function Jo(e, t) {
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
    var r = t.apply(this, arguments);
    return r !== n && (i = (n = r) && ea(e, r)), i;
  }
  return s._value = t, s;
}
function ia(e, t) {
  var i, n;
  function s() {
    var r = t.apply(this, arguments);
    return r !== n && (i = (n = r) && Jo(e, r)), i;
  }
  return s._value = t, s;
}
function na(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = kt(e);
  return this.tween(i, (n.local ? ta : ia)(n, t));
}
function sa(e, t) {
  return function() {
    si(this, e).delay = +t.apply(this, arguments);
  };
}
function ra(e, t) {
  return t = +t, function() {
    si(this, e).delay = t;
  };
}
function oa(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? sa : ra)(t, e)) : le(this.node(), t).delay;
}
function aa(e, t) {
  return function() {
    pe(this, e).duration = +t.apply(this, arguments);
  };
}
function da(e, t) {
  return t = +t, function() {
    pe(this, e).duration = t;
  };
}
function la(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? aa : da)(t, e)) : le(this.node(), t).duration;
}
function ca(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    pe(this, e).ease = t;
  };
}
function ua(e) {
  var t = this._id;
  return arguments.length ? this.each(ca(t, e)) : le(this.node(), t).ease;
}
function ha(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    pe(this, e).ease = i;
  };
}
function pa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ha(this._id, e));
}
function fa(e) {
  typeof e != "function" && (e = Qi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = t[s], o = r.length, a = n[s] = [], d, c = 0; c < o; ++c)
      (d = r[c]) && e.call(d, d.__data__, c, r) && a.push(d);
  return new ge(n, this._parents, this._name, this._id);
}
function ma(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, r = Math.min(n, s), o = new Array(n), a = 0; a < r; ++a)
    for (var d = t[a], c = i[a], u = d.length, m = o[a] = new Array(u), f, y = 0; y < u; ++y)
      (f = d[y] || c[y]) && (m[y] = f);
  for (; a < n; ++a)
    o[a] = t[a];
  return new ge(o, this._parents, this._name, this._id);
}
function ga(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function wa(e, t, i) {
  var n, s, r = ga(t) ? si : pe;
  return function() {
    var o = r(this, e), a = o.on;
    a !== n && (s = (n = a).copy()).on(t, i), o.on = s;
  };
}
function ya(e, t) {
  var i = this._id;
  return arguments.length < 2 ? le(this.node(), i).on.on(e) : this.each(wa(i, e, t));
}
function va(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function _a() {
  return this.on("end.remove", va(this._id));
}
function xa(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Jt(e));
  for (var n = this._groups, s = n.length, r = new Array(s), o = 0; o < s; ++o)
    for (var a = n[o], d = a.length, c = r[o] = new Array(d), u, m, f = 0; f < d; ++f)
      (u = a[f]) && (m = e.call(u, u.__data__, f, a)) && ("__data__" in u && (m.__data__ = u.__data__), c[f] = m, St(c[f], t, i, f, c, le(u, i)));
  return new ge(r, this._parents, t, i);
}
function Ia(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Zi(e));
  for (var n = this._groups, s = n.length, r = [], o = [], a = 0; a < s; ++a)
    for (var d = n[a], c = d.length, u, m = 0; m < c; ++m)
      if (u = d[m]) {
        for (var f = e.call(u, u.__data__, m, d), y, b = le(u, i), v = 0, N = f.length; v < N; ++v)
          (y = f[v]) && St(y, t, i, v, f, b);
        r.push(f), o.push(u);
      }
  return new ge(r, o, t, i);
}
var $a = nt.prototype.constructor;
function ba() {
  return new $a(this._groups, this._parents);
}
function ka(e, t) {
  var i, n, s;
  return function() {
    var r = Re(this, e), o = (this.style.removeProperty(e), Re(this, e));
    return r === o ? null : r === i && o === n ? s : s = t(i = r, n = o);
  };
}
function _n(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ea(e, t, i) {
  var n, s = i + "", r;
  return function() {
    var o = Re(this, e);
    return o === s ? null : o === n ? r : r = t(n = o, i);
  };
}
function Sa(e, t, i) {
  var n, s, r;
  return function() {
    var o = Re(this, e), a = i(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Re(this, e))), o === d ? null : o === n && d === s ? r : (s = d, r = t(n = o, a));
  };
}
function Aa(e, t) {
  var i, n, s, r = "style." + t, o = "end." + r, a;
  return function() {
    var d = pe(this, e), c = d.on, u = d.value[r] == null ? a || (a = _n(t)) : void 0;
    (c !== i || s !== u) && (n = (i = c).copy()).on(o, s = u), d.on = n;
  };
}
function Ca(e, t, i) {
  var n = (e += "") == "transform" ? Co : vn;
  return t == null ? this.styleTween(e, ka(e, n)).on("end.style." + e, _n(e)) : typeof t == "function" ? this.styleTween(e, Sa(e, n, ri(this, "style." + e, t))).each(Aa(this._id, e)) : this.styleTween(e, Ea(e, n, t), i).on("end.style." + e, null);
}
function Ma(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Na(e, t, i) {
  var n, s;
  function r() {
    var o = t.apply(this, arguments);
    return o !== s && (n = (s = o) && Ma(e, o, i)), n;
  }
  return r._value = t, r;
}
function Pa(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Na(e, t, i ?? ""));
}
function Ta(e) {
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
  return this.tween("text", typeof e == "function" ? Ra(ri(this, "text", e)) : Ta(e == null ? "" : e + ""));
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
  for (var e = this._name, t = this._id, i = xn(), n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var o = n[r], a = o.length, d, c = 0; c < a; ++c)
      if (d = o[c]) {
        var u = le(d, t);
        St(d, e, i, c, o, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new ge(n, this._parents, e, i);
}
function qa() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(r, o) {
    var a = { value: o }, d = { value: function() {
      --s === 0 && r();
    } };
    i.each(function() {
      var c = pe(this, n), u = c.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), c.on = t;
    }), s === 0 && r();
  });
}
var Ha = 0;
function ge(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function xn() {
  return ++Ha;
}
var fe = nt.prototype;
ge.prototype = {
  constructor: ge,
  select: xa,
  selectAll: Ia,
  selectChild: fe.selectChild,
  selectChildren: fe.selectChildren,
  filter: fa,
  merge: ma,
  selection: ba,
  transition: za,
  call: fe.call,
  nodes: fe.nodes,
  node: fe.node,
  size: fe.size,
  empty: fe.empty,
  each: fe.each,
  on: ya,
  attr: Qo,
  attrTween: na,
  style: Ca,
  styleTween: Pa,
  text: Oa,
  textTween: La,
  remove: _a,
  tween: Wo,
  delay: oa,
  duration: la,
  ease: ua,
  easeVarying: pa,
  end: qa,
  [Symbol.iterator]: fe[Symbol.iterator]
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
  e instanceof ge ? (t = e._id, e = e._name) : (t = xn(), (i = Fa).time = ni(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var o = n[r], a = o.length, d, c = 0; c < a; ++c)
      (d = o[c]) && St(d, e, t, c, o, i || Ka(d, t));
  return new ge(n, this._parents, e, t);
}
nt.prototype.interrupt = Vo;
nt.prototype.transition = Wa;
const lt = (e) => () => e;
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
function me(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
me.prototype = {
  constructor: me,
  scale: function(e) {
    return e === 1 ? this : new me(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new me(this.k, this.x + this.k * e, this.y + this.k * t);
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
var We = new me(1, 0, 0);
me.prototype;
function Ot(e) {
  e.stopImmediatePropagation();
}
function Le(e) {
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
  return this.__zoom || We;
}
function Xa(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ja() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Za(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], r = e.invertY(t[0][1]) - i[0][1], o = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function Qa() {
  var e = Ga, t = Ya, i = Za, n = Xa, s = ja, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Ro, c = ti("start", "zoom", "end"), u, m, f, y = 500, b = 150, v = 0, N = 10;
  function I(h) {
    h.property("__zoom", Oi).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", F).on("dblclick.zoom", G).filter(s).on("touchstart.zoom", j).on("touchmove.zoom", te).on("touchend.zoom touchcancel.zoom", p).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  I.transform = function(h, w, g, l) {
    var _ = h.selection ? h.selection() : h;
    _.property("__zoom", Oi), h !== _ ? $(h, w, g, l) : _.interrupt().each(function() {
      E(this, arguments).event(l).start().zoom(null, typeof w == "function" ? w.apply(this, arguments) : w).end();
    });
  }, I.scaleBy = function(h, w, g, l) {
    I.scaleTo(h, function() {
      var _ = this.__zoom.k, k = typeof w == "function" ? w.apply(this, arguments) : w;
      return _ * k;
    }, g, l);
  }, I.scaleTo = function(h, w, g, l) {
    I.transform(h, function() {
      var _ = t.apply(this, arguments), k = this.__zoom, S = g == null ? x(_) : typeof g == "function" ? g.apply(this, arguments) : g, D = k.invert(S), H = typeof w == "function" ? w.apply(this, arguments) : w;
      return i(L(P(k, H), S, D), _, o);
    }, g, l);
  }, I.translateBy = function(h, w, g, l) {
    I.transform(h, function() {
      return i(this.__zoom.translate(
        typeof w == "function" ? w.apply(this, arguments) : w,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), o);
    }, null, l);
  }, I.translateTo = function(h, w, g, l, _) {
    I.transform(h, function() {
      var k = t.apply(this, arguments), S = this.__zoom, D = l == null ? x(k) : typeof l == "function" ? l.apply(this, arguments) : l;
      return i(We.translate(D[0], D[1]).scale(S.k).translate(
        typeof w == "function" ? -w.apply(this, arguments) : -w,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), k, o);
    }, l, _);
  };
  function P(h, w) {
    return w = Math.max(r[0], Math.min(r[1], w)), w === h.k ? h : new me(w, h.x, h.y);
  }
  function L(h, w, g) {
    var l = w[0] - g[0] * h.k, _ = w[1] - g[1] * h.k;
    return l === h.x && _ === h.y ? h : new me(h.k, l, _);
  }
  function x(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function $(h, w, g, l) {
    h.on("start.zoom", function() {
      E(this, arguments).event(l).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(l).end();
    }).tween("zoom", function() {
      var _ = this, k = arguments, S = E(_, k).event(l), D = t.apply(_, k), H = g == null ? x(D) : typeof g == "function" ? g.apply(_, k) : g, q = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), K = _.__zoom, Y = typeof w == "function" ? w.apply(_, k) : w, ie = d(K.invert(H).concat(q / K.k), Y.invert(H).concat(q / Y.k));
      return function(Q) {
        if (Q === 1) Q = Y;
        else {
          var V = ie(Q), J = q / V[2];
          Q = new me(J, H[0] - V[0] * J, H[1] - V[1] * J);
        }
        S.zoom(null, Q);
      };
    });
  }
  function E(h, w, g) {
    return !g && h.__zooming || new A(h, w);
  }
  function A(h, w) {
    this.that = h, this.args = w, this.active = 0, this.sourceEvent = null, this.extent = t.apply(h, w), this.taps = 0;
  }
  A.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, w) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = w.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = w.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = w.invert(this.touch1[0])), this.that.__zoom = w, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var w = ce(this.that).datum();
      c.call(
        h,
        this.that,
        new Ba(h, {
          sourceEvent: this.sourceEvent,
          target: I,
          transform: this.that.__zoom,
          dispatch: c
        }),
        w
      );
    }
  };
  function W(h, ...w) {
    if (!e.apply(this, arguments)) return;
    var g = E(this, w).event(h), l = this.__zoom, _ = Math.max(r[0], Math.min(r[1], l.k * Math.pow(2, n.apply(this, arguments)))), k = xe(h);
    if (g.wheel)
      (g.mouse[0][0] !== k[0] || g.mouse[0][1] !== k[1]) && (g.mouse[1] = l.invert(g.mouse[0] = k)), clearTimeout(g.wheel);
    else {
      if (l.k === _) return;
      g.mouse = [k, l.invert(k)], mt(this), g.start();
    }
    Le(h), g.wheel = setTimeout(S, b), g.zoom("mouse", i(L(P(l, _), g.mouse[0], g.mouse[1]), g.extent, o));
    function S() {
      g.wheel = null, g.end();
    }
  }
  function F(h, ...w) {
    if (f || !e.apply(this, arguments)) return;
    var g = h.currentTarget, l = E(this, w, !0).event(h), _ = ce(h.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", q, !0), k = xe(h, g), S = h.clientX, D = h.clientY;
    oo(h.view), Ot(h), l.mouse = [k, this.__zoom.invert(k)], mt(this), l.start();
    function H(K) {
      if (Le(K), !l.moved) {
        var Y = K.clientX - S, ie = K.clientY - D;
        l.moved = Y * Y + ie * ie > v;
      }
      l.event(K).zoom("mouse", i(L(l.that.__zoom, l.mouse[0] = xe(K, g), l.mouse[1]), l.extent, o));
    }
    function q(K) {
      _.on("mousemove.zoom mouseup.zoom", null), ao(K.view, l.moved), Le(K), l.event(K).end();
    }
  }
  function G(h, ...w) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, l = xe(h.changedTouches ? h.changedTouches[0] : h, this), _ = g.invert(l), k = g.k * (h.shiftKey ? 0.5 : 2), S = i(L(P(g, k), l, _), t.apply(this, w), o);
      Le(h), a > 0 ? ce(this).transition().duration(a).call($, S, l, h) : ce(this).call(I.transform, S, l, h);
    }
  }
  function j(h, ...w) {
    if (e.apply(this, arguments)) {
      var g = h.touches, l = g.length, _ = E(this, w, h.changedTouches.length === l).event(h), k, S, D, H;
      for (Ot(h), S = 0; S < l; ++S)
        D = g[S], H = xe(D, this), H = [H, this.__zoom.invert(H), D.identifier], _.touch0 ? !_.touch1 && _.touch0[2] !== H[2] && (_.touch1 = H, _.taps = 0) : (_.touch0 = H, k = !0, _.taps = 1 + !!u);
      u && (u = clearTimeout(u)), k && (_.taps < 2 && (m = H[0], u = setTimeout(function() {
        u = null;
      }, y)), mt(this), _.start());
    }
  }
  function te(h, ...w) {
    if (this.__zooming) {
      var g = E(this, w).event(h), l = h.changedTouches, _ = l.length, k, S, D, H;
      for (Le(h), k = 0; k < _; ++k)
        S = l[k], D = xe(S, this), g.touch0 && g.touch0[2] === S.identifier ? g.touch0[0] = D : g.touch1 && g.touch1[2] === S.identifier && (g.touch1[0] = D);
      if (S = g.that.__zoom, g.touch1) {
        var q = g.touch0[0], K = g.touch0[1], Y = g.touch1[0], ie = g.touch1[1], Q = (Q = Y[0] - q[0]) * Q + (Q = Y[1] - q[1]) * Q, V = (V = ie[0] - K[0]) * V + (V = ie[1] - K[1]) * V;
        S = P(S, Math.sqrt(Q / V)), D = [(q[0] + Y[0]) / 2, (q[1] + Y[1]) / 2], H = [(K[0] + ie[0]) / 2, (K[1] + ie[1]) / 2];
      } else if (g.touch0) D = g.touch0[0], H = g.touch0[1];
      else return;
      g.zoom("touch", i(L(S, D, H), g.extent, o));
    }
  }
  function p(h, ...w) {
    if (this.__zooming) {
      var g = E(this, w).event(h), l = h.changedTouches, _ = l.length, k, S;
      for (Ot(h), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, y), k = 0; k < _; ++k)
        S = l[k], g.touch0 && g.touch0[2] === S.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === S.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (S = xe(S, this), Math.hypot(m[0] - S[0], m[1] - S[1]) < N)) {
        var D = ce(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return I.wheelDelta = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : lt(+h), I) : n;
  }, I.filter = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : lt(!!h), I) : e;
  }, I.touchable = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : lt(!!h), I) : s;
  }, I.extent = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : lt([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), I) : t;
  }, I.scaleExtent = function(h) {
    return arguments.length ? (r[0] = +h[0], r[1] = +h[1], I) : [r[0], r[1]];
  }, I.translateExtent = function(h) {
    return arguments.length ? (o[0][0] = +h[0][0], o[1][0] = +h[1][0], o[0][1] = +h[0][1], o[1][1] = +h[1][1], I) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, I.constrain = function(h) {
    return arguments.length ? (i = h, I) : i;
  }, I.duration = function(h) {
    return arguments.length ? (a = +h, I) : a;
  }, I.interpolate = function(h) {
    return arguments.length ? (d = h, I) : d;
  }, I.on = function() {
    var h = c.on.apply(c, arguments);
    return h === c ? I : h;
  }, I.clickDistance = function(h) {
    return arguments.length ? (v = (h = +h) * h, I) : Math.sqrt(v);
  }, I.tapDistance = function(h) {
    return arguments.length ? (N = +h, I) : N;
  }, I;
}
var Ja = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, ee = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? ed(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (s = (n ? o(t, i, s) : o(s)) || s);
  return n && s && Ja(t, i, s), s;
};
function td(e, t, i, n) {
  const s = t.x - e.x, r = t.y - e.y, o = n.x - i.x, a = n.y - i.y, d = s * a - r * o;
  if (Math.abs(d) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * o) / d, u = ((i.x - e.x) * r - (i.y - e.y) * s) / d;
  return c <= 0.02 || c >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * r, t: c };
}
function id(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, r = n * n + s * s || 1, o = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / r)), a = t.x + o * n, d = t.y + o * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: o };
}
function nd(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const r = e[s], o = e[s + 1], a = Math.hypot(o.x - r.x, o.y - r.y) || 1, d = (o.x - r.x) / a, c = (o.y - r.y) / a, u = t.map(([f, y]) => td(r, o, f, y)).filter((f) => f !== null).filter((f) => f.t * a > i + 2 && (1 - f.t) * a > i + 2).sort((f, y) => f.t - y.t);
    let m = -1 / 0;
    for (const f of u)
      f.t * a - i <= m + 2 || (n += ` L ${f.x - d * i} ${f.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + d * i} ${f.y + c * i}`, m = f.t * a + i);
    n += ` L ${o.x} ${o.y}`;
  }
  return n;
}
const ct = {
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
let X = class extends ke {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = We, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
            const s = this.scene.edges.find((r) => r.id === this._selectedWaypoint.edgeId);
            s && (e.preventDefault(), this.removeWaypoint(s, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((s) => s.id === this.selectedId), i = this.scene.nodes.find((s) => s.id === this.selectedId);
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case" && i.kind !== "api" && i.kind !== "proxy-api")
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
    }), ce(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((u) => u.x - u.w / 2)) - e, r = Math.max(...t.map((u) => u.x + u.w / 2)) + e, o = Math.min(...t.map((u) => u.y - u.h / 2)) - e, a = Math.max(...t.map((u) => u.y + u.h / 2)) + e, d = Math.max(0.15, Math.min(n.width / (r - s), n.height / (a - o), 1.25)), c = We.translate(n.width / 2 - d * (s + r) / 2, n.height / 2 - d * (o + a) / 2).scale(d);
    ce(i).call(this._zoomBehavior.transform, c);
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
      const s = this.scene.nodes.find((r) => r.id === e.parentId);
      if (s)
        return { x: e.x + (this._dragPos.x - s.x), y: e.y + (this._dragPos.y - s.y) };
    }
    if (e.parentId && ((n = this._dragGroup) != null && n.has(e.parentId))) {
      const s = this.scene.nodes.find((o) => o.id === e.parentId), r = this._dragGroup.get(e.parentId);
      if (s) return { x: e.x + (r.x - s.x), y: e.y + (r.y - s.y) };
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
        const s = this.nodePos(n), r = s.x - n.w / 2 + 10 + e.w / 2, o = s.x + n.w / 2 - 10 - e.w / 2, a = s.y - n.h / 2 + 34 + e.h / 2, d = s.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, r), o), i = Math.min(Math.max(i, a), d);
      }
    }
    return { id: e.id, x: t, y: i };
  }
  /**
   * Topmost node under the pointer. elementFromPoint alone is not enough: an
   * edge's fat invisible hit-line can sit on top of a node and swallow the hit.
   */
  nodeIdAt(e) {
    var i, n;
    const t = ((i = this.shadowRoot) == null ? void 0 : i.elementsFromPoint(e.clientX, e.clientY)) ?? [];
    for (const s of t) {
      const r = (n = s.closest) == null ? void 0 : n.call(s, "[data-node-id]");
      if (r) return r.getAttribute("data-node-id");
    }
    return null;
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const r = new Set(this.selectedIds), o = r.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => r.has(f.id) && !(f.parentId && r.has(f.parentId))
    ) : null, a = o ? new Map(o.map((f) => [f.id, this.nodePos(f)])) : null, d = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !o, c = (f) => {
      const y = this.nodeIdAt(f), b = y && y !== t.id ? this.scene.nodes.find((v) => v.id === y) : void 0;
      return b ? b.kind === "external-system" ? b.id : b.parentId ?? null : null;
    }, u = (f) => {
      const y = this.toScene(f), b = y.x - i.x, v = y.y - i.y;
      if (!(!s && Math.hypot(b, v) < 3 / this._t.k))
        if (s = !0, o && a) {
          const N = /* @__PURE__ */ new Map();
          for (const I of o) {
            const P = a.get(I.id), L = this.clampToParent(I, P.x + b, P.y + v);
            N.set(I.id, { x: L.x, y: L.y });
          }
          this._dragGroup = N;
        } else d(f) ? (this._dragPos = { id: t.id, x: n.x + b, y: n.y + v }, this._hoverNodeId = c(f)) : (this._dragPos = this.clampToParent(t, n.x + b, n.y + v), this._hoverNodeId = null);
    }, m = (f) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([y, b]) => ({ id: y, x: b.x, y: b.y }))
        });
      else if (s && this._dragPos) {
        if (d(f)) {
          const y = c(f);
          if (y !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: y,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._hoverNodeId = null;
            return;
          }
          this._dragPos = this.clampToParent(t, this._dragPos.x, this._dragPos.y);
        }
        this.emit("node-moved", { id: t.id, x: this._dragPos.x, y: this._dragPos.y });
      } else e.shiftKey ? this.emit("element-multi-toggled", { id: t.id, kind: t.kind }) : this.emit("element-selected", { elementType: "node", id: t.id, kind: t.kind });
      this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", u), window.addEventListener("pointerup", m);
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
    const s = 160, r = 90, o = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((v) => v.parentId === t.id), d = Math.min(...a.map((v) => v.x - v.w / 2)), c = Math.max(...a.map((v) => v.x + v.w / 2)), u = Math.min(...a.map((v) => v.y - v.h / 2)), m = Math.max(...a.map((v) => v.y + v.h / 2)), f = In(
      a.map((v) => ({ dx: v.x - o.x, dy: v.y - o.y, w: v.w, h: v.h })),
      { w: s, h: r }
    ), y = (v) => {
      const N = this.toScene(v);
      if (v.shiftKey) {
        this._resize = {
          id: t.id,
          x: o.x,
          y: o.y,
          w: Math.max(f.w, 2 * Math.abs(N.x - o.x)),
          h: Math.max(f.h, 2 * Math.abs(N.y - o.y))
        };
        return;
      }
      const I = o.x - i * o.w / 2, P = o.y - n * o.h / 2, L = i > 0 ? Math.max(N.x, I + s, a.length ? c + 10 : -1 / 0) : Math.min(N.x, I - s, a.length ? d - 10 : 1 / 0), x = n > 0 ? Math.max(N.y, P + r, a.length ? m + 10 : -1 / 0) : Math.min(N.y, P - r, a.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (I + L) / 2,
        y: (P + x) / 2,
        w: Math.abs(L - I),
        h: Math.abs(x - P)
      };
    }, b = () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", y), window.addEventListener("pointerup", b);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const n = (r) => {
      const o = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: o.x, y: o.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, s = (r) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const o = this.nodeIdAt(r);
      o && o !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: o,
        x: r.clientX,
        y: r.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), r = t - n, o = i - s, a = e.w / 2, d = e.h / 2;
    if (r === 0 && o === 0) return { x: n, y: s };
    const c = 1 / Math.max(Math.abs(r) / a, Math.abs(o) / d);
    return { x: n + r * c, y: s + o * c };
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
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), r = this.nodePos(i), o = n[0] ?? r, a = n[n.length - 1] ?? s;
    let d = this.borderPoint(t, o.x, o.y), c = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(c.x - d.x, c.y - d.y) || 1, f = -(c.y - d.y) / m * u, y = (c.x - d.x) / m * u;
        d = { x: d.x + f, y: d.y + y }, c = { x: c.x + f, y: c.y + y };
      }
    }
    return [d, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (o) => {
      if (!this._wpDrag) return;
      n = !0;
      const a = this.toScene(o), d = [...this._wpDrag.points];
      d[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: d };
    }, r = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", r), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", r);
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
    let r = !1;
    const o = (d) => {
      const c = this.toScene(d);
      if (r) {
        if (this._wpDrag) {
          const u = [...this._wpDrag.points];
          u[s] = c, this._wpDrag = { ...this._wpDrag, points: u };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        r = !0, this.focus();
        const u = [...this.edgePoints[t.id] ?? []];
        u.splice(s, 0, c), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: u, index: s };
      }
    }, a = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), r && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  renderEdge(e, t, i) {
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, r = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), o = Math.floor((t.length - 1) / 2), a = {
      x: (t[o].x + t[o + 1].x) / 2,
      y: (t[o].y + t[o + 1].y) / 2
    }, d = t.slice(1, -1), c = t.map((u) => `${u.x},${u.y}`).join(" ");
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
              stroke=${n} stroke-width=${r ? 3 : 1.6}
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
        ${s ? d.map((u, m) => {
      var y;
      const f = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === m;
      return U`
                <circle data-waypoint cx=${u.x} cy=${u.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(b) => {
        b.button === 0 && (b.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: m }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], m));
      }}
                        @dblclick=${(b) => {
        b.stopPropagation(), this.removeWaypoint(e, m);
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
    var f, y, b;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, r = !!e.container, o = !!e.parentId, a = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, d = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.h : e.h, c = a / 2, u = d / 2, m = o && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return U`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (b = this._dragGroup) != null && b.has(e.id) ? "none" : "auto"}
         @pointerdown=${(v) => this.onNodePointerDown(v, e)}
         @dblclick=${(v) => {
      v.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? U`<rect x=${-c - 4} y=${-u - 4} width=${a + 8} height=${d + 8}
                  rx=${o ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-u} width=${a} height=${d} rx=${o ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? U`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? U`<text x=${-c} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && ct[e.symbol] && !o ? U`<g transform="translate(${c - 17}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${ct[e.symbol]}
              </g>` : ""}
        ${o && e.symbol && ct[e.symbol] ? U`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${ct[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? U`
              <foreignObject x=${-c + 6} y=${r ? -u + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${r ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(v) => v.stopPropagation()}
                  @keydown=${(v) => {
      v.stopPropagation(), v.key === "Enter" && this.commitRename(e, v.target.value), v.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(v) => this.commitRename(e, v.target.value)}
                />
              </foreignObject>` : o ? U`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : r ? U`<text x=${-c + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : U`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${r ? U`<line x1=${-c + 8} y1=${-u + 28} x2=${c - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (o ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, u],
      [0, -u]
    ].map(
      ([v, N]) => U`
                <circle data-handle cx=${v} cy=${N} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(I) => this.onHandlePointerDown(I, e)}>
                  <title>${o ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso, una operación externa o un RAG: el agente lo usará" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${r && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([v, N]) => U`
                <rect data-resize x=${v * c - 6.5} y=${N * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${v * N > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(I) => this.onResizePointerDown(I, e, v, N)}>
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
    const n = (r) => {
      const o = this.toScene(r);
      !i && Math.hypot(o.x - t.x, o.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: o });
    }, s = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s), i && this._rubber) {
        const { a: r, b: o } = this._rubber, a = Math.min(r.x, o.x), d = Math.max(r.x, o.x), c = Math.min(r.y, o.y), u = Math.max(r.y, o.y), m = this.scene.nodes.filter((f) => {
          const y = this.nodePos(f);
          return y.x >= a && y.x <= d && y.y >= c && y.y <= u;
        }).map((f) => f.id);
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
    const i = Math.min(...t.map((o) => o.x - o.w / 2)) - e, n = Math.max(...t.map((o) => o.x + o.w / 2)) + e, s = Math.min(...t.map((o) => o.y - o.h / 2)) - e, r = Math.max(...t.map((o) => o.y + o.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: r - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, r = We.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    ce(i).call(this._zoomBehavior.transform, r);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, r = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, r);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return C``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), r = (0 - this._t.x) / this._t.k, o = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return C`
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
            x=${(r - e.minX) * n}
            y=${(o - e.minY) * n}
            width=${a * n}
            height=${d * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((o) => o.color ?? "#64748b"))], t = [], i = this.scene.edges.map((o) => {
      const a = this.edgePolyline(o);
      if (!a) return U``;
      const d = this.renderEdge(o, a, [...t]);
      for (let c = 0; c < a.length - 1; c++) t.push([a[c], a[c + 1]]);
      return d;
    }), n = new Set(this.scene.nodes.filter((o) => o.parentId).map((o) => o.id)), s = [], r = [];
    return this.scene.edges.forEach((o, a) => {
      (n.has(o.sourceId) || n.has(o.targetId) ? r : s).push(
        i[a]
      );
    }), C`
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
      (o) => U`
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
X.styles = Xt`
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
ee([
  he({ attribute: !1 })
], X.prototype, "scene", 2);
ee([
  he({ attribute: !1 })
], X.prototype, "selectedId", 2);
ee([
  he({ attribute: !1 })
], X.prototype, "selectedIds", 2);
ee([
  he({ type: Boolean })
], X.prototype, "connectable", 2);
ee([
  he({ attribute: !1 })
], X.prototype, "edgePoints", 2);
ee([
  M()
], X.prototype, "_t", 2);
ee([
  M()
], X.prototype, "_dragPos", 2);
ee([
  M()
], X.prototype, "_dragGroup", 2);
ee([
  M()
], X.prototype, "_pendingLink", 2);
ee([
  M()
], X.prototype, "_hoverNodeId", 2);
ee([
  M()
], X.prototype, "_editingId", 2);
ee([
  M()
], X.prototype, "_spaceDown", 2);
ee([
  M()
], X.prototype, "_wpDrag", 2);
ee([
  M()
], X.prototype, "_selectedWaypoint", 2);
ee([
  M()
], X.prototype, "_resize", 2);
ee([
  M()
], X.prototype, "_rubber", 2);
X = ee([
  Qt("modux-canvas")
], X);
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
function oe(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function B(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ce = (e) => e.trim().toLowerCase();
function sd(e, t) {
  var F, G, j, te;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((p) => [p.id, p.name])), s = e.modules.flatMap(
    (p) => (p.useCases ?? []).map((h) => ({ ...h, moduleId: p.id }))
  ), r = new Set(s.map((p) => p.id)), o = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((p) => (p.domainServices ?? []).map((h) => h.id))
  ), d = e.modules.flatMap(
    (p) => (p.domainEvents ?? []).map((h) => ({ ...h, moduleId: p.id, application: !1 }))
  ), c = e.modules.flatMap(
    (p) => (p.applicationEvents ?? []).map((h) => ({ ...h, moduleId: p.id, application: !0 }))
  ), u = e.modules.flatMap(
    (p) => (p.readModels ?? []).map((h) => ({ ...h, moduleId: p.id }))
  );
  for (const p of s)
    oe(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: T.command.w,
      h: T.command.h,
      kind: "use-case",
      symbol: p.policy ? "flow" : "gear",
      fill: p.policy ? T.policy.fill : T.command.fill,
      stroke: p.policy ? T.policy.stroke : T.command.stroke,
      badge: p.policy ? "POLICY" : "COMANDO",
      tooltip: p.policy ? `${p.name} — policy de ${n.get(p.moduleId) ?? p.moduleId} (reacción, no caso de negocio)` : `${p.name} — caso de uso de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  for (const p of o)
    oe(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: T.aggregate.w,
      h: T.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: T.aggregate.fill,
      stroke: T.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${p.name} — agregado de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const p of [...d, ...c])
    oe(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: T.event.w,
      h: T.event.h,
      kind: p.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: T.event.fill,
      stroke: T.event.stroke,
      badge: p.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${p.name} — evento de ${n.get(p.moduleId) ?? p.moduleId}`
    }), m.set(Ce(p.name), p.id);
  const f = (p) => {
    if (!p || !p.trim()) return null;
    const h = m.get(Ce(p));
    if (h) return h;
    const w = `evname:${Ce(p)}`;
    return oe(i, {
      id: w,
      label: p,
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
      tooltip: `${p} — referenciado por nombre, sin evento declarado en el catálogo`
    }), w;
  }, y = (p) => {
    const h = u.find((g) => g.id === p.id) ?? u.find((g) => p.name && Ce(g.name) === Ce(p.name)), w = (h == null ? void 0 : h.id) ?? (p.id || (p.name ? `rm:${Ce(p.name)}` : null));
    return w ? (oe(i, {
      id: w,
      label: (h == null ? void 0 : h.name) ?? p.name ?? w,
      x: 0,
      y: 0,
      w: T.readModel.w,
      h: T.readModel.h,
      kind: h ? "read-model" : "derived-read-model",
      fill: T.readModel.fill,
      stroke: T.readModel.stroke,
      dashed: !h,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const p of e.actorUses ?? []) {
    if (!r.has(p.targetId)) continue;
    const h = (e.actors ?? []).find((w) => w.id === p.actorId);
    h && (oe(i, {
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
    }), B(i, {
      id: `es-actor:${h.id}->${p.targetId}`,
      sourceId: h.id,
      targetId: p.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const p of e.aiAgents ?? []) {
    const h = (e.agentUses ?? []).filter((l) => l.agentId === p.id), w = (e.agentExternalUses ?? []).filter((l) => l.agentId === p.id), g = (e.agentRags ?? []).filter((l) => l.agentId === p.id);
    if (!(!h.length && !w.length && !g.length)) {
      oe(i, {
        id: p.id,
        label: p.name,
        x: 0,
        y: 0,
        w: T.actor.w,
        h: T.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${p.name} — agente de IA (consume por MCP)`
      });
      for (const l of h)
        r.has(l.useCaseId) && B(i, {
          id: `es-agent:${p.id}->${l.useCaseId}`,
          sourceId: p.id,
          targetId: l.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const l of w) {
        const _ = e.externalSystems.find(
          (S) => (S.useCases ?? []).some((D) => D.id === l.externalUseCaseId)
        );
        if (!_) continue;
        const k = (F = (_.useCases ?? []).find((S) => S.id === l.externalUseCaseId)) == null ? void 0 : F.name;
        oe(i, {
          id: _.id,
          label: _.name,
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
        }), B(i, {
          id: `es-agentx:${p.id}->${l.externalUseCaseId}`,
          sourceId: p.id,
          targetId: _.id,
          kind: "es-agent-external",
          label: k,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: k ? `Llama a ${k} del sistema externo` : void 0
        });
      }
      for (const l of g) {
        const _ = (e.rags ?? []).find((k) => k.id === l.ragId);
        if (_) {
          oe(i, {
            id: _.id,
            label: _.name,
            x: 0,
            y: 0,
            w: T.readModel.w,
            h: T.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${_.name} — base de conocimiento (retrieval)`
          }), B(i, {
            id: `es-agrag:${p.id}->${_.id}`,
            sourceId: p.id,
            targetId: _.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const k of _.sourceReadModelIds ?? []) {
            const S = y({ id: k });
            S && B(i, {
              id: `es-ragsrc:${_.id}->${S}`,
              sourceId: S,
              targetId: _.id,
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
  const b = (p) => {
    const h = e.externalSystems.find((w) => w.id === p);
    return h ? (oe(i, {
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
  for (const p of e.externalCalls ?? []) {
    const h = b(p.externalSystemId);
    !h || !r.has(p.useCaseId) || B(i, {
      id: `es-extin:${h}->${p.useCaseId}`,
      sourceId: h,
      targetId: p.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const p of e.externalUseCaseCalls ?? []) {
    if (!r.has(p.sourceId)) continue;
    const h = e.externalSystems.find(
      (l) => (l.useCases ?? []).some((_) => _.id === p.targetId)
    ), w = h ? b(h.id) : null;
    if (!w) continue;
    const g = (G = ((h == null ? void 0 : h.useCases) ?? []).find((l) => l.id === p.targetId)) == null ? void 0 : G.name;
    B(i, {
      id: `es-extout:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: w,
      kind: "es-command-external",
      label: g,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: g ? `Llama a ${g} del sistema externo` : void 0
    });
  }
  for (const p of e.aggregateCalls ?? [])
    !r.has(p.sourceId) || !i.nodes.has(p.targetId) || B(i, {
      id: `es-write:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: p.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const v = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const p of v)
    !i.nodes.has(p.domainEventId) || !(i.nodes.has(p.sourceId) && (r.has(p.sourceId) || o.some((w) => w.id === p.sourceId) || a.has(p.sourceId))) || B(i, {
      id: `es-emit:${p.sourceId}->${p.domainEventId}`,
      sourceId: p.sourceId,
      targetId: p.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const N = (p, h, w, g, l, _) => (oe(i, {
    id: p,
    label: h,
    x: 0,
    y: 0,
    w: T.policy.w,
    h: T.policy.h,
    kind: w,
    symbol: "flow",
    fill: T.policy.fill,
    stroke: T.policy.stroke,
    badge: g,
    tooltip: l
  }), p), I = (p, h) => {
    const w = f(p);
    w && B(i, {
      id: `es-trigger:${w}->${h}`,
      sourceId: w,
      targetId: h,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, P = (p, h) => {
    !h || !r.has(h) || B(i, {
      id: `es-invoke:${p}->${h}`,
      sourceId: p,
      targetId: h,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const p of e.subscriptions ?? []) {
    const h = N(
      p.id,
      p.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${p.name}${p.eventName ? ` — reacciona a ${p.eventName}` : ""}${p.consumerGroup ? ` · grupo ${p.consumerGroup}` : ""}`
    );
    I(p.eventName, h);
    for (const w of p.actions ?? []) {
      if (w.type === "CallUseCase" && P(h, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const g = `saga:${w.sagaId}`;
        N(g, w.sagaId, "saga", "SAGA"), B(i, {
          id: `es-saga:${h}->${g}`,
          sourceId: h,
          targetId: g,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const g = (e.projections ?? []).find((l) => l.id === w.projectionId);
        g && B(i, {
          id: `es-feeds:${h}->${g.id}`,
          sourceId: h,
          targetId: g.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const p of e.projections ?? []) {
    const h = N(
      p.id,
      p.name,
      "projection",
      "PROYECCIÓN",
      `${p.name}${p.readModelName ? ` — materializa ${p.readModelName}` : ""}`
    );
    for (const l of p.handledEventIds) {
      const _ = i.nodes.has(l) ? l : null;
      _ && B(i, {
        id: `es-trigger:${_}->${h}`,
        sourceId: _,
        targetId: h,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    p.sourceAggregateId && i.nodes.has(p.sourceAggregateId) && B(i, {
      id: `es-state:${p.id}`,
      sourceId: p.sourceAggregateId,
      targetId: h,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const w = p.sourceExternalUseCaseId ?? p.sourceExternalTableId;
    if (w) {
      const l = e.externalSystems.find(
        (k) => (k.useCases ?? []).some((S) => S.id === w) || (k.tables ?? []).some((S) => S.id === w)
      ), _ = l ? b(l.id) : null;
      if (_) {
        const k = ((j = (l.useCases ?? []).find((S) => S.id === w)) == null ? void 0 : j.name) ?? ((te = (l.tables ?? []).find((S) => S.id === w)) == null ? void 0 : te.name);
        B(i, {
          id: `es-poll:${p.id}`,
          sourceId: _,
          targetId: h,
          kind: "es-projects-poll",
          label: k,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: k ? `polling de ${k}` : "polling"
        });
      }
    }
    const g = y({ id: p.readModelId, name: p.readModelName });
    g && B(i, {
      id: `es-projects:${h}->${g}`,
      sourceId: h,
      targetId: g,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const p of e.flows) {
    if (p.archetype === "MATERIALIZES") {
      const w = f(p.triggerEvent), g = y({ name: p.readModelName ?? `${p.triggerEvent}View` });
      w && g && B(i, {
        id: `es-mat:${p.id}`,
        sourceId: w,
        targetId: g,
        kind: "es-materializes",
        label: p.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${p.name} [MATERIALIZES]`
      });
      continue;
    }
    const h = N(
      `flow:${p.id}`,
      p.name,
      "flow",
      `POLICY · ${p.archetype}`,
      `Flow ${p.name} [${p.archetype}]`
    );
    if (I(p.triggerEvent, h), P(h, p.targetUseCaseId), !p.targetUseCaseId) {
      const w = b(p.targetId), g = w ?? `tgt:${p.targetId}`;
      !w && n.has(p.targetId) && oe(i, {
        id: g,
        label: n.get(p.targetId) ?? p.targetId,
        x: 0,
        y: 0,
        w: T.module.w,
        h: T.module.h,
        kind: "module",
        symbol: "component",
        fill: T.module.fill,
        stroke: T.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(g) && B(i, {
        id: `es-deliver:${p.id}`,
        sourceId: h,
        targetId: g,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const p of e.processes ?? []) {
    const h = N(
      p.id,
      p.name,
      "process",
      `PROCESO${p.sla ? ` · SLA ${p.sla}` : ""}`,
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    I(p.triggerEvent, h);
    for (const g of p.steps) P(h, g.useCaseId);
    const w = f(p.onCompletionEventName);
    w && B(i, {
      id: `es-done:${p.id}`,
      sourceId: h,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const p of e.workflows ?? []) {
    const h = N(
      p.id,
      p.name,
      "workflow",
      "WORKFLOW",
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    I(p.triggerEvent, h);
    for (const g of p.steps ?? []) {
      P(h, g.targetUseCaseId);
      for (const l of [g.emittedEventName, g.completionEventName]) {
        const _ = f(l);
        _ && B(i, {
          id: `es-wfemit:${p.id}:${_}`,
          sourceId: h,
          targetId: _,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = f(p.onCompletionEventName);
    w && B(i, {
      id: `es-done:${p.id}`,
      sourceId: h,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const L = [...i.nodes.values()], x = /* @__PURE__ */ new Map();
  for (const p of i.edges)
    x.has(p.targetId) || x.set(p.targetId, []), x.get(p.targetId).push(p.sourceId);
  const $ = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Set(), A = (p) => {
    const h = $.get(p);
    if (h !== void 0) return h;
    if (E.has(p)) return 0;
    E.add(p);
    const w = x.get(p) ?? [], g = w.length ? 1 + Math.max(...w.map(A)) : 0;
    return E.delete(p), $.set(p, g), g;
  }, W = /* @__PURE__ */ new Map();
  for (const p of L) {
    const h = t[p.id];
    if (h) {
      p.x = h.x, p.y = h.y;
      continue;
    }
    const w = A(p.id), g = W.get(w) ?? 0;
    W.set(w, g + 1), p.x = 140 + w * 260, p.y = 110 + g * 110;
  }
  return { nodes: L, edges: i.edges };
}
const rd = 190, od = 56, Ui = 180, ad = 56, dd = 150, ld = 44, Di = 250, Li = 100;
function cd(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const r = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), o = r.length ? 1 + Math.max(...r.map(n)) : 0;
    return i.delete(s.id), o;
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
  const i = [], n = [], s = /* @__PURE__ */ new Set(), r = (a) => {
    var d;
    return (d = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : d.name;
  };
  let o = 140;
  return (e.workflows ?? []).forEach((a) => {
    var N;
    const d = new Map(a.steps.map((I) => [I.id, I])), c = new Map(a.steps.map((I) => [I.id, cd(I, d)])), u = /* @__PURE__ */ new Map();
    for (const I of a.steps) {
      const P = c.get(I.id) ?? 0;
      u.set(P, (u.get(P) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), f = ud(e, a);
    if (f && !s.has(f.id)) {
      s.add(f.id);
      const I = t[f.id] ?? { x: 140, y: o };
      i.push({
        id: f.id,
        label: f.label,
        x: I.x,
        y: I.y,
        w: dd,
        h: ld,
        kind: f.kind,
        symbol: f.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: f.kind === "aggregate" ? "AGGREGATE" : f.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const y = t[a.id] ?? { x: 420, y: o };
    i.push({
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
    }), f && n.push({
      id: `wft:${a.id}`,
      sourceId: f.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const b = /* @__PURE__ */ new Map();
    let v = 0;
    for (const I of a.steps) {
      const P = c.get(I.id) ?? 0;
      v = Math.max(v, P);
      const L = b.get(P) ?? 0;
      b.set(P, L + 1);
      const x = t[I.id] ?? {
        x: y.x + (P + 1) * Di,
        y: o + (L - (u.get(P) - 1) / 2) * Li
      }, $ = r(I.targetUseCaseId);
      i.push({
        id: I.id,
        label: I.name,
        x: x.x,
        y: x.y,
        w: Ui,
        h: ad,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: $ ? `→ ${$}` : "∅ sin use case",
        tooltip: `${I.name}${I.emittedEventName ? ` · emite ${I.emittedEventName}` : ""}${$ ? ` · lanza ${$}` : ""}${I.completionEventName ? ` · espera ${I.completionEventName}` : ""}`
      });
      const E = (I.dependsOnStepIds ?? []).filter((A) => d.has(A));
      E.length === 0 && n.push({
        id: `wfs:${a.id}:${I.id}`,
        sourceId: a.id,
        targetId: I.id,
        kind: "workflow-start",
        label: I.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const A of E)
        n.push({
          id: `wfdep:${A}->${I.id}`,
          sourceId: A,
          targetId: I.id,
          kind: "workflow-dependency",
          label: I.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${I.name} espera a ${((N = d.get(A)) == null ? void 0 : N.name) ?? A}`
        });
    }
    if (a.onCompletionEventName) {
      const I = `done:${a.id}`, P = t[I] ?? { x: y.x + (v + 2) * Di, y: o };
      i.push({
        id: I,
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
      const L = new Set(a.steps.flatMap(($) => $.dependsOnStepIds ?? [])), x = a.steps.filter(($) => !L.has($.id));
      for (const $ of x.length ? x : [])
        n.push({
          id: `wfd:${a.id}:${$.id}`,
          sourceId: $.id,
          targetId: I,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || n.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: I,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    o += Math.max(2, m + 1) * Li + 60;
  }), { nodes: i, edges: n };
}
async function pd(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((d) => d.e), n = new i(), r = {
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
  }, o = await n.layout(r), a = {};
  for (const d of o.children ?? [])
    a[d.id] = {
      x: (d.x ?? 0) + (d.width ?? 0) / 2,
      y: (d.y ?? 0) + (d.height ?? 0) / 2
    };
  return a;
}
var fd = Object.defineProperty, md = Object.getOwnPropertyDescriptor, O = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? md(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (s = (n ? o(t, i, s) : o(s)) || s);
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
], yd = ["CORE", "SUPPORTING", "GENERIC"], z = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let R = class extends ke {
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
        const r = this.model.relations.find(
          (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
        );
        return r && r.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : null;
      }
      case "set-relation-type": {
        const r = this.model.relations.find(
          (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
        );
        return r && r.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const r = this.model.modules.find((a) => a.id === e.id);
        if (!r) return null;
        const o = this.model.relations.filter(
          (a) => (a.sourceId === e.id || a.targetId === e.id) && a.type != null
        );
        return [
          { kind: "add-module", id: r.id, name: r.name, subdomainType: r.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...o.map(
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
        const r = (this.model.aggregates ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "add-aggregate", id: r.id, name: r.name, moduleId: r.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const r of this.model.modules) {
          const o = (r.queryServices ?? []).find((a) => a.id === e.id);
          if (o) return [{ kind: "add-query-service", id: o.id, name: o.name, moduleId: r.id }];
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
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const r = (this.model.proxyApis ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "add-proxy-api", id: r.id, name: r.name }] : null;
      }
      case "set-proxy-target": {
        const r = (this.model.proxyApis ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "set-proxy-target", id: e.id, targetId: r.targetApiId ?? "" }] : null;
      }
      case "set-api-publisher": {
        const r = (this.model.apis ?? []).find((o) => o.id === e.id) ?? (this.model.proxyApis ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "set-api-publisher", id: e.id, targetId: r.publishedByExternalSystemId ?? "" }] : null;
      }
      case "add-actor-crud":
        return [{ kind: "remove-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-crud":
        return [{ kind: "add-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case":
        return [{ kind: "remove-use-case", id: e.id }];
      case "remove-use-case": {
        for (const r of this.model.modules) {
          const o = (r.useCases ?? []).find((a) => a.id === e.id);
          if (o)
            return [
              { kind: "add-use-case", id: o.id, name: o.name, moduleId: r.id, policy: o.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const r of this.model.externalSystems) {
          const o = (r.useCases ?? []).find((a) => a.id === e.id);
          if (o)
            return [{ kind: "add-external-use-case", id: o.id, name: o.name, moduleId: r.id }];
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
        const r = this.model.externalSystems.find((o) => o.id === e.id);
        return r ? [{ kind: "add-external-system", id: r.id, name: r.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const r = (this.model.aiAgents ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "add-ai-agent", id: r.id, name: r.name }] : null;
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
        const r = (this.model.rags ?? []).find((o) => o.id === e.id);
        return r ? [
          { kind: "add-rag", id: r.id, name: r.name },
          ...(this.model.agentRags ?? []).filter((o) => o.ragId === e.id).map(
            (o) => ({
              kind: "add-agent-rag",
              sourceId: o.agentId,
              targetId: e.id
            })
          ),
          ...(r.sourceReadModelIds ?? []).map(
            (o) => ({ kind: "add-rag-source", sourceId: e.id, targetId: o })
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
        const r = (this.model.actors ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "add-actor", id: r.id, name: r.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const r of this.model.modules) {
          const o = (r.applicationEvents ?? []).find((a) => a.id === e.id);
          if (o)
            return [{ kind: "add-application-event", id: o.id, name: o.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const r of this.model.modules) {
          const o = (r.domainServices ?? []).find((a) => a.id === e.id);
          if (o) return [{ kind: "add-domain-service", id: o.id, name: o.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const r = (this.model.projections ?? []).find((o) => o.id === e.id);
        return r && (r.sourceAggregateId || r.sourceExternalUseCaseId || r.sourceExternalTableId) ? [
          {
            kind: "add-projection",
            id: r.id,
            name: r.name,
            aggregateId: r.sourceAggregateId,
            externalUseCaseId: r.sourceExternalUseCaseId,
            externalTableId: r.sourceExternalTableId,
            targetId: r.readModelId,
            moduleId: r.moduleId
          }
        ] : null;
      }
      case "add-external-table":
        return [{ kind: "remove-external-table", id: e.id }];
      case "remove-external-table": {
        for (const r of this.model.externalSystems) {
          const o = (r.tables ?? []).find((a) => a.id === e.id);
          if (o) return [{ kind: "add-external-table", id: o.id, name: o.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const r = (i = (t = (this.model.rags ?? []).find((o) => o.id === e.sourceId)) == null ? void 0 : t.contentSources) == null ? void 0 : i.find((o) => o.uri === e.uri);
        return r ? [
          {
            kind: "add-rag-content-source",
            sourceId: e.sourceId,
            type: r.type,
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
        const r = (this.model.apis ?? []).find((o) => o.id === e.id);
        return r ? [
          { kind: "add-api", id: r.id, name: r.name },
          ...r.operations.map(
            (o) => ({
              kind: "add-api-operation",
              apiId: r.id,
              id: o.id,
              name: o.name,
              httpMethod: o.httpMethod,
              path: o.path,
              moduleId: o.targetModuleId,
              targetUseCaseId: o.targetUseCaseId
            })
          )
        ] : null;
      }
      case "add-api-operation":
        return [{ kind: "remove-api-operation", apiId: e.apiId, id: e.id }];
      case "remove-api-operation": {
        const r = (n = (this.model.apis ?? []).find((o) => o.id === e.apiId)) == null ? void 0 : n.operations.find((o) => o.id === e.id);
        return r ? [
          {
            kind: "add-api-operation",
            apiId: e.apiId,
            id: r.id,
            name: r.name,
            httpMethod: r.httpMethod,
            path: r.path,
            moduleId: r.targetModuleId,
            targetUseCaseId: r.targetUseCaseId
          }
        ] : null;
      }
      case "set-api-operation-target": {
        const r = (s = (this.model.apis ?? []).find((o) => o.id === e.apiId)) == null ? void 0 : s.operations.find((o) => o.id === e.id);
        return r ? [
          {
            kind: "set-api-operation-target",
            apiId: e.apiId,
            id: e.id,
            moduleId: r.targetModuleId,
            targetUseCaseId: r.targetUseCaseId
          }
        ] : null;
      }
      case "remove-read-model": {
        for (const r of this.model.modules) {
          const o = (r.readModels ?? []).find((a) => a.id === e.id);
          if (o != null && o.aggregateId)
            return [{ kind: "add-read-model", id: o.id, name: o.name, aggregateId: o.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const r of this.model.modules) {
          const o = (r.domainEvents ?? []).find((a) => a.id === e.id);
          if (o) return [{ kind: "add-domain-event", id: o.id, name: o.name, moduleId: r.id }];
        }
        return null;
      }
      case "rename-element": {
        const o = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((a) => a.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((a) => a.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((a) => a.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((a) => a.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((a) => a.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((a) => a.useCases ?? []) : e.type === "application-event" ? this.model.modules.flatMap((a) => a.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : this.model.entities ?? []).find((a) => a.id === e.id);
        return o ? [{ kind: "rename-element", type: e.type, id: e.id, name: o.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const r = this.model.flows.find((o) => o.id === e.id);
        return r ? [
          {
            kind: "add-flow",
            id: r.id,
            name: r.name,
            archetype: r.archetype,
            triggerAggregateId: r.triggerAggregateId ?? "",
            triggerEvent: r.triggerEvent ?? "",
            targetId: r.targetId,
            readModelName: r.readModelName,
            targetUseCaseId: r.targetUseCaseId
          }
        ] : null;
      }
      case "add-view":
        return [{ kind: "remove-view", id: e.id }];
      case "remove-view": {
        const r = (this.model.views ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "add-view", id: r.id, name: r.name, memberIds: r.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const r = (this.model.processes ?? []).find((d) => d.id === e.processId), o = (r == null ? void 0 : r.steps.findIndex((d) => d.id === e.id)) ?? -1;
        if (!r || o < 0) return null;
        const a = r.steps[o];
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
            afterStepId: o > 0 ? r.steps[o - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const r = (this.model.processes ?? []).find((a) => a.id === e.processId), o = (r == null ? void 0 : r.steps.findIndex((a) => a.id === e.id)) ?? -1;
        return !r || o < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: o > 0 ? r.steps[o - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const r = (this.model.processes ?? []).find((a) => a.id === e.processId), o = r == null ? void 0 : r.steps.find((a) => a.id === e.id);
        return o ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: o.roleId,
            deadline: o.deadline,
            compensationUseCaseId: o.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const r = (this.model.processes ?? []).find((o) => o.id === e.id);
        return r ? [
          {
            kind: "add-process",
            id: r.id,
            name: r.name,
            moduleId: r.ownerModuleId ?? "",
            triggerAggregateId: r.triggerAggregateId,
            triggerEvent: r.triggerEvent,
            steps: r.steps
          }
        ] : null;
      }
      case "add-workflow":
        return [{ kind: "remove-workflow", id: e.id }];
      case "remove-workflow": {
        const r = (this.model.workflows ?? []).find((o) => o.id === e.id);
        return r ? [
          {
            kind: "add-workflow",
            id: r.id,
            name: r.name,
            triggerAggregateId: r.triggerAggregateId,
            triggerDomainServiceId: r.triggerDomainServiceId,
            triggerUseCaseId: r.triggerUseCaseId,
            triggerEvent: r.triggerEvent,
            completionEventName: r.onCompletionEventName,
            workflowSteps: r.steps
          }
        ] : null;
      }
      case "add-workflow-step":
        return [{ kind: "remove-workflow-step", workflowId: e.workflowId, id: e.id }];
      case "remove-workflow-step": {
        const r = (this.model.workflows ?? []).find((d) => d.id === e.workflowId), o = (r == null ? void 0 : r.steps.findIndex((d) => d.id === e.id)) ?? -1;
        if (!r || o < 0) return null;
        const a = r.steps[o];
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
            afterStepId: o > 0 ? r.steps[o - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...r.steps.filter((d) => d.id !== e.id && (d.dependsOnStepIds ?? []).includes(e.id)).map(
            (d) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: d.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const r = (this.model.workflows ?? []).find((a) => a.id === e.workflowId), o = r == null ? void 0 : r.steps.find((a) => a.id === e.id);
        return o ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: o.emittedEventName,
            targetUseCaseId: o.targetUseCaseId,
            completionEventName: o.completionEventName
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, r = this.viewLayout(s), o = r.nodes[t] ?? null;
    let a = { x: i, y: n };
    const d = this.sceneFor(s), c = d.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = d.nodes.find((f) => f.id === c.parentId);
      m && (a = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...r, nodes: { ...r.nodes, [t]: a } });
    const u = [{ kind: "move-node", view: s, id: t, pos: o }];
    if (s === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const f = this.inverseOf(m);
        f && u.unshift(...f), this.command(m, !1);
      }
    }
    this.pushUndoEntry(u);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, r = (this.model.apis ?? []).find((b) => b.id === t) ?? (this.model.proxyApis ?? []).find((b) => b.id === t);
    if (!r || i && !this.model.externalSystems.some((b) => b.id === i)) return;
    const o = r.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === o) return;
    const d = this._view, c = this.viewLayout(d), u = this.sceneFor(d), m = a ? u.nodes.find((b) => b.id === a) : void 0, f = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, y = [
      { kind: "set-api-publisher", id: t, targetId: o },
      { kind: "move-node", view: d, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(d, { ...c, nodes: { ...c.nodes, [t]: f } }), this.pushUndoEntry(y);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), r = { ...n.nodes }, o = [];
    for (const { id: a, x: d, y: c } of t) {
      o.push({ kind: "move-node", view: i, id: a, pos: n.nodes[a] ?? null });
      let u = { x: d, y: c };
      const m = s.nodes.find((f) => f.id === a);
      if (m != null && m.parentId) {
        const f = s.nodes.find((y) => y.id === m.parentId);
        f && (u = { x: d - f.x, y: c - f.y });
      }
      r[a] = u;
    }
    if (this.writeViewLayout(i, { ...n, nodes: r }), i === "processes")
      for (const { id: a } of t) {
        const d = this.stepReorderCommand(a);
        if (d) {
          const c = this.inverseOf(d);
          c && o.unshift(...c), this.command(d, !1);
        }
      }
    this.pushUndoEntry(o);
  }
  onNodeResized(e) {
    var u;
    const { id: t, x: i, y: n, w: s, h: r } = e.detail, o = this._view, a = this.viewLayout(o), d = this.sceneFor(o).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: o, id: t, size: ((u = a.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: o, id: t, pos: a.nodes[t] ?? null },
      ...d.map((m) => ({ kind: "move-node", view: o, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: n } };
    for (const m of d) c[m.id] = { x: m.x - i, y: m.y - n };
    this.writeViewLayout(o, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [t]: { w: s, h: r } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, s = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: s.edges[t] ?? null }
    ]);
    const r = { ...s.edges };
    i.length ? r[t] = i : delete r[t], this.writeViewLayout(n, { ...s, edges: r });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = oi(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((o) => [o.id, o.x])), s = [...t.steps].sort(
      (o, a) => (n.get(o.id) ?? 0) - (n.get(a.id) ?? 0)
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
    const { sourceId: t, targetId: i, x: n, y: s } = e.detail;
    if (this._view === "workflows") {
      const x = this.owningWorkflowOf(t), $ = this.owningWorkflowOf(i);
      if (!x || x !== $ || t === i) return;
      const E = x.steps.find((A) => A.id === i);
      if (((E == null ? void 0 : E.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: x.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const r = new Set((this.model.aiAgents ?? []).map((x) => x.id));
    if (r.has(t)) {
      if (new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((A) => A.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (A) => A.agentId === t && A.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((E) => (E.useCases ?? []).map((A) => A.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (A) => A.agentId === t && A.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((E) => E.id === i) && ((this.model.agentRags ?? []).some(
        (A) => A.agentId === t && A.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    const o = (this.model.rags ?? []).find((x) => x.id === t);
    if (o) {
      new Set(
        this.model.modules.flatMap(($) => ($.readModels ?? []).map((E) => E.id))
      ).has(i) && !(o.sourceReadModelIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some((x) => x.id === i)) return;
    if ((this.model.proxyApis ?? []).some((x) => x.id === t)) {
      const x = (this.model.proxyApis ?? []).find(($) => $.id === t);
      if ((this.model.apis ?? []).some(($) => $.id === i)) {
        x.targetApiId !== i && this.command({ kind: "set-proxy-target", id: t, targetId: i });
        return;
      }
      this.model.externalSystems.some(($) => $.id === i) && x.publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if ((this.model.apis ?? []).some((x) => x.id === t)) {
      this.model.externalSystems.some((x) => x.id === i) && (this.model.apis ?? []).find(($) => $.id === t).publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if (r.has(i)) return;
    const a = new Set((this.model.actors ?? []).map((x) => x.id));
    if (a.has(t)) {
      const x = new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((A) => A.id))
      ), $ = new Set(
        this.model.modules.flatMap((E) => (E.queryServices ?? []).map((A) => A.id))
      );
      if (x.has(i) || $.has(i)) {
        (this.model.actorUses ?? []).some(
          (A) => A.actorId === t && A.targetId === i
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aggregates ?? []).some((E) => E.id === i)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: i });
        return;
      }
      if (this.model.externalSystems.some((E) => E.id === i)) {
        (this.model.actorExternalDependencies ?? []).some(
          (A) => A.actorId === t && A.externalSystemId === i
        ) || this.command({ kind: "add-actor-external", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    const d = this.owningApiOf(t);
    if (d) {
      if (new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((E) => E.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: d.id,
          id: t,
          targetUseCaseId: i
        });
        return;
      }
      if (this.model.modules.some(($) => $.id === i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: d.id,
          id: t,
          moduleId: i
        });
        return;
      }
      return;
    }
    const c = this.model.externalSystems.flatMap((x) => x.useCases ?? []).find((x) => x.id === t), u = this.model.externalSystems.flatMap((x) => x.tables ?? []).find((x) => x.id === t);
    if (c || u) {
      const x = (c ?? u).name, $ = c ? { externalUseCaseId: t } : { externalTableId: t }, E = (F) => c ? F.sourceExternalUseCaseId === t : F.sourceExternalTableId === t, A = this.model.modules.flatMap((F) => F.readModels ?? []).find((F) => F.id === i);
      if (A) {
        (this.model.projections ?? []).some(
          (G) => E(G) && G.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(x)}-${z(A.name)}`,
          name: `${A.name}Projection`,
          ...$,
          targetId: i
        });
        return;
      }
      const W = this.model.modules.find((F) => F.id === i);
      if (W) {
        (this.model.projections ?? []).some(
          (G) => E(G) && G.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(x)}-${z(W.name)}`,
          name: `${x}ViewProjection`,
          ...$,
          moduleId: i,
          readModelName: `${x}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((x) => x.id === t);
    if (m) {
      const x = this.model.modules.flatMap((E) => E.readModels ?? []).find((E) => E.id === i);
      if (x) {
        (this.model.projections ?? []).some(
          (A) => A.sourceAggregateId === t && A.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(m.name)}-${z(x.name)}`,
          name: `${x.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const $ = this.model.modules.find((E) => E.id === i);
      if ($) {
        (this.model.projections ?? []).some(
          (A) => A.sourceAggregateId === t && A.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(m.name)}-${z($.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: t,
          moduleId: i,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((x) => (x.domainEvents ?? []).map(($) => $.id))
    ), y = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((x) => x.id),
      ...this.model.modules.flatMap((x) => (x.domainServices ?? []).map(($) => $.id))
    ]), b = new Set(
      this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map(($) => $.id))
    ), v = new Set(this.model.modules.flatMap((x) => (x.useCases ?? []).map(($) => $.id))), N = new Set(
      this.model.modules.flatMap((x) => (x.queryServices ?? []).map(($) => $.id))
    );
    if (v.has(t) && N.has(i)) {
      (this.model.queryCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const I = new Set(
      this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map(($) => $.id))
    );
    if (v.has(t) && I.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (v.has(t) && v.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (y.has(t) && f.has(i) || v.has(t) && b.has(i)) {
      (this.model.emissions ?? []).some(
        ($) => $.sourceId === t && $.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (f.has(t) || b.has(t)) {
      const x = b.has(t), $ = this.model.modules.flatMap((w) => (x ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === t), E = this.model.modules.flatMap((w) => (w.useCases ?? []).map((g) => ({ u: g, module: w }))).find(({ u: w }) => w.id === i), A = this.model.modules.flatMap((w) => (w.readModels ?? []).map((g) => ({ rm: g, module: w }))).find(({ rm: w }) => w.id === i), W = this.model.modules.find((w) => w.id === i) ?? (A == null ? void 0 : A.module) ?? (E == null ? void 0 : E.module);
      if (!$ || !W) return;
      const F = new Set((this.model.aggregates ?? []).map((w) => w.id)), G = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((g) => g.id))
      ), j = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === t && (x ? v.has(w.sourceId) : F.has(w.sourceId) || G.has(w.sourceId))
      );
      if (!j) {
        this.emit("modux-notice", {
          message: x ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const te = !x && F.has(j.sourceId);
      if (E) {
        if (this.model.flows.some(
          (g) => g.archetype === "TRIGGERS" && g.triggerEvent === $.name && g.targetUseCaseId === E.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z($.name)}-${z(E.u.name)}`,
          name: E.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: te ? j.sourceId : "",
          triggerDomainServiceId: !x && !te ? j.sourceId : void 0,
          triggerUseCaseId: x ? j.sourceId : void 0,
          triggerEvent: $.name,
          targetId: W.id,
          targetUseCaseId: E.u.id
        });
        return;
      }
      const p = (A == null ? void 0 : A.rm.name) ?? `${$.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === $.name && w.targetId === W.id && w.readModelName === p
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${z($.name)}-${z(p)}`,
        name: p,
        archetype: "MATERIALIZES",
        triggerAggregateId: te ? j.sourceId : "",
        triggerDomainServiceId: !x && !te ? j.sourceId : void 0,
        triggerUseCaseId: x ? j.sourceId : void 0,
        triggerEvent: $.name,
        targetId: W.id,
        readModelName: p
      });
      return;
    }
    const P = /* @__PURE__ */ new Set([
      ...y,
      ...v,
      ...N,
      ...this.model.modules.flatMap((x) => (x.readModels ?? []).map(($) => $.id))
    ]);
    if (P.has(t) || P.has(i) || f.has(i) || b.has(i))
      return;
    const L = new Set(this.model.externalSystems.map((x) => x.id));
    if (L.has(t)) {
      if (new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((E) => E.id))
      ).has(i)) {
        (this.model.externalCalls ?? []).some(
          (E) => E.externalSystemId === t && E.useCaseId === i
        ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i });
        return;
      }
      if (L.has(i) && i !== t) {
        (this.model.externalSystemDependencies ?? []).some(
          (E) => E.sourceId === t && E.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.apis ?? []).some(($) => $.id === i) || (this.model.proxyApis ?? []).some(($) => $.id === i)) {
        (this.model.externalSystemDependencies ?? []).some(
          (E) => E.sourceId === t && E.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    L.has(i) || a.has(i);
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
      const s = this.memberIdOf(i, n), r = (this.model.views ?? []).find((o) => o.id === this._activeViewId);
      if (s && (r != null && r.memberIds.includes(s))) {
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
    if (e === "node" && i === "proxy-api") {
      this._selectedId = null, this.command({ kind: "remove-proxy-api", id: t });
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
    if (this._view === "context-map" && e === "edge" && i === "proxy-target") {
      const n = /^pxt:(.+)->(.+)$/.exec(t);
      if (!n || !(this.model.proxyApis ?? []).some((s) => s.id === n[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: n[1], targetId: "" });
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
    (i === "module" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
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
      id: `step-${z(e)}`,
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
      id: `wfstep-${z(e)}`,
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${z(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((d) => t.has(d.id)), n = new Set(i.map((d) => d.id)), s = this.model.externalSystems.filter((d) => t.has(d.id)), r = new Set(s.map((d) => d.id)), o = (this.model.aggregates ?? []).filter(
      (d) => t.has(d.id) || n.has(d.moduleId)
    ), a = new Set(o.map((d) => d.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: s,
      relations: this.model.relations.filter(
        (d) => n.has(d.sourceId) && n.has(d.targetId)
      ),
      flows: this.model.flows.filter(
        (d) => t.has(d.id) || (n.has(d.sourceId) || r.has(d.sourceId)) && (n.has(d.targetId) || r.has(d.targetId))
      ),
      aggregates: o,
      entities: (this.model.entities ?? []).filter((d) => a.has(d.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (d) => a.has(d.sourceAggregateId) && a.has(d.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (d) => t.has(d.id) || (d.ownerModuleId ? n.has(d.ownerModuleId) : !1)
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
    })() : vd(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, n, s, r, o, a, d, c, u, m, f, y, b, v, N, I, P, L, x, $, E, A, W, F, G, j, te, p, h, w;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${z(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: z(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${z(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${z(e)}`, name: e });
        else if (this._newContextMapKind === "api")
          this.command({ kind: "add-api", id: `api-${z(e)}`, name: e });
        else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${z(e)}`, name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "api-operation") {
          const g = (t = (this.model.apis ?? []).find((_) => _.id === this._selectedId)) == null ? void 0 : t.id, l = this._newApiId || g || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id);
          if (!l) return;
          this.command({
            kind: "add-api-operation",
            apiId: l,
            id: `apiop-${l.replace(/^api-/, "")}-${z(e)}`,
            name: e
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const g = (s = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : s.id, l = this._newModuleId || g || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!l) return;
          this.command({ kind: "add-domain-event", id: `ev-${z(e)}`, name: e, moduleId: l });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const g = (o = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : o.id, l = this._newModuleId || g || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!l) return;
          this.command({ kind: "add-application-event", id: `aev-${z(e)}`, name: e, moduleId: l });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const g = (d = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : d.id, l = this._newModuleId || g || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!l) return;
          this.command({ kind: "add-domain-service", id: `ds-${z(e)}`, name: e, moduleId: l });
        } else if (this._detail === "detail" && this._newContextMapKind === "query-service") {
          const g = (u = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : u.id, l = this._newModuleId || g || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!l) return;
          this.command({ kind: "add-query-service", id: `qs-${z(e)}`, name: e, moduleId: l });
        } else if (this._detail === "detail" && this._newContextMapKind === "use-case") {
          const g = (f = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : f.id, l = this._newModuleId || g || ((y = this.model.modules[0]) == null ? void 0 : y.id);
          if (!l) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: l });
        } else if (this._detail === "detail" && this._newContextMapKind === "policy") {
          const g = (b = this.model.modules.find((_) => _.id === this._selectedId)) == null ? void 0 : b.id, l = this._newModuleId || g || ((v = this.model.modules[0]) == null ? void 0 : v.id);
          if (!l) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: l, policy: !0 });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-use-case") {
          const g = (N = this.model.externalSystems.find((_) => _.id === this._selectedId)) == null ? void 0 : N.id, l = this._newExternalId || g || ((I = this.model.externalSystems[0]) == null ? void 0 : I.id);
          if (!l) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${z(e)}`,
            name: e,
            moduleId: l
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-table") {
          const g = (P = this.model.externalSystems.find((_) => _.id === this._selectedId)) == null ? void 0 : P.id, l = this._newExternalId || g || ((L = this.model.externalSystems[0]) == null ? void 0 : L.id);
          if (!l) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${z(e)}`,
            name: e,
            moduleId: l
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const g = (x = (this.model.aggregates ?? []).find((_) => _.id === this._selectedId)) == null ? void 0 : x.id, l = this._newAggregateId || g || ((E = ($ = this.model.aggregates) == null ? void 0 : $[0]) == null ? void 0 : E.id);
          if (!l) return;
          this.command({ kind: "add-read-model", id: `rm-${z(e)}`, name: e, aggregateId: l });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${z(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const g = this._newModuleId || ((A = this.model.modules[0]) == null ? void 0 : A.id);
        if (!g) return;
        this.command({ kind: "add-aggregate", id: `agg-${z(e)}`, name: e, moduleId: g });
      } else if (this._view === "flows") {
        const g = this._newTriggerAggId || ((F = (W = this.model.aggregates) == null ? void 0 : W[0]) == null ? void 0 : F.id), l = this._newTargetId || ((G = this.model.modules[0]) == null ? void 0 : G.id), _ = this._newTriggerEvent.trim();
        if (!g || !l || !_) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: g,
          triggerEvent: _,
          targetId: l
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const g = this._newModuleId || ((j = this.model.modules[0]) == null ? void 0 : j.id);
        if (!g) return;
        this.command({
          kind: "add-process",
          id: `proc-${z(e)}`,
          name: e,
          moduleId: g,
          triggerAggregateId: this._newTriggerAggId || ((p = (te = this.model.aggregates) == null ? void 0 : te[0]) == null ? void 0 : p.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${z(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((w = (h = this.model.aggregates) == null ? void 0 : h[0]) == null ? void 0 : w.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Wn(i, t.nodes) : e === "flows" ? es(i, t.nodes) : e === "processes" ? oi(i, t.nodes) : e === "workflows" ? hd(i, t.nodes) : e === "eventstorming" ? sd(i, t.nodes) : Ln(i, t.nodes, this._detail === "detail", t.sizes ?? {});
    if (this.diff)
      for (const s of n.nodes) {
        const r = this.diff[s.id] ?? this.diff[s.id.replace(/^(tgt:|flow:)/, "")];
        r && (s.diffKind = r);
      }
    return n;
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((c) => !c.parentId), n = new Set(i.map((c) => c.id)), s = {
      nodes: i,
      edges: t.edges.filter((c) => n.has(c.sourceId) && n.has(c.targetId))
    }, o = await pd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: o, edges: {}, sizes: a.sizes }), await this.updateComplete, (d = this.renderRoot.querySelector("modux-canvas")) == null || d.fit();
  }
  render() {
    const e = this.sceneFor(this._view);
    return C`
      <div class="toolbar">
        <div class="tabs">
          ${wd.map(
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
        ${this._activeViewId ? C`
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
      (t) => C`<option value="${t.name} (${t.id})">${t.kind}</option>`
    )}
              </datalist>
              <button class="tab" title="Añadir el elemento a la vista" @click=${this.addMemberFromToolbar}>
                ＋ Añadir
              </button>
            ` : ""}
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
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._newContextMapKind === "rag" ? "Nuevo RAG…" : this._newContextMapKind === "api" ? "Nueva API…" : this._newContextMapKind === "proxy-api" ? "Nuevo proxy API…" : this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : this._newContextMapKind === "policy" ? "Nueva policy…" : this._newContextMapKind === "use-case" ? "Nuevo caso de uso…" : this._newContextMapKind === "query-service" ? "Nuevo query service…" : this._newContextMapKind === "external-use-case" ? "Nuevo caso de uso externo…" : this._newContextMapKind === "external-table" ? "Nueva tabla externa…" : this._newContextMapKind === "api-operation" ? "Nueva operación de API…" : "Nuevo read model…",
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
              <option value="rag" ?selected=${this._newContextMapKind === "rag"}>
                RAG (base de conocimiento)
              </option>
              <option value="api" ?selected=${this._newContextMapKind === "api"}>
                API publicada
              </option>
              <option value="proxy-api" ?selected=${this._newContextMapKind === "proxy-api"}>
                Proxy API
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
        ${this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table") ? C`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "api-operation" ? C`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, n;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
        var i, n;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
              ${yd.map(
      (t) => C`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? C`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
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
        var i, n;
        return C`<option
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
              ${this._view === "flows" ? C`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return C`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? C`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP"].map(
      (t) => C`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        @nodes-moved=${this.onNodesMoved}
        @node-reparent-requested=${this.onNodeReparentRequested}
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
        ${this._view === "context-map" ? C`Arrastra para reordenar · Shift/Ctrl+arrastrar mueve una API de sistema · asa azul → crear relación (elige el tipo) · doble click
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
      ${this.renderRelationPicker()} ${this.renderDeletePicker()}
    `;
  }
  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  renderDeletePicker() {
    if (!this._deletePicker) return "";
    const t = (this.model.views ?? []).find((i) => i.id === this._activeViewId);
    return C`
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
    return C`
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
      (n) => C`
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
  he({ attribute: !1 })
], R.prototype, "model", 2);
O([
  he({ attribute: !1 })
], R.prototype, "layout", 2);
O([
  he({ attribute: !1 })
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
var xd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, ae = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Id(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (s = (n ? o(t, i, s) : o(s)) || s);
  return n && s && xd(t, i, s), s;
};
let se = class extends ke {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._writes = 0, this._toast = null, this._workspace = null, this._creatingSolution = !1, this._newSolutionName = "", this._diff = null, this._mergeFlow = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
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
  /**
   * Every write WE make (command, layout save, solution op) bumps the store
   * fingerprint, and the SSE echo of that bump must not read as an external
   * change (it reloaded the model and wiped the undo history mid-session).
   * All own writes funnel through here: while any is in flight the signals are
   * deferred, and once the last one settles we adopt the resulting version
   * BEFORE processing the deferred signal — our own echo compares equal.
   */
  async trackWrite(e) {
    this._writes++, this._saving = !0;
    try {
      return await e();
    } finally {
      if (this._writes--, this._writes === 0) {
        try {
          const t = await fetch(`${this.base}/version`);
          t.ok && (this._lastVersion = (await t.json()).version);
        } catch {
        }
        if (this._saving = !1, this._pendingVersion) {
          const t = this._pendingVersion;
          this._pendingVersion = null, this.onVersionSignal(t);
        }
      }
    }
  }
  async onVersionSignal(e) {
    var i;
    if (!this._model) return;
    if (this._writes > 0 || this._interacting) {
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
    await this.trackWrite(async () => {
      var i;
      try {
        const n = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!n.ok) {
          let s = `El servidor rechazó la operación (${n.status})`;
          try {
            const r = await n.json();
            r != null && r.message && (s = r.message);
          } catch {
          }
          this.showToast(s);
          return;
        }
        this._workspace = await n.json(), await this.reload(), await this.refreshDiff(), (i = this.renderRoot.querySelector("modux-editor")) == null || i.clearHistory();
      } catch (n) {
        this.showToast(String(n));
      }
    });
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
    await this.trackWrite(async () => {
      try {
        const i = await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!i.ok) {
          let s = `El servidor rechazó el comando (${i.status})`;
          try {
            const r = await i.json();
            r != null && r.message && (s = r.message);
          } catch {
          }
          this.showToast(s);
          return;
        }
        const n = await fetch(`${this.base}/model`);
        n.ok && (this._model = await n.json()), await this.refreshDiff();
      } catch (i) {
        this.showToast(String(i));
      }
    });
  }
  onLayoutChanged(e) {
    this._layout = e.detail.layout, this._layoutDirty = !0, window.clearTimeout(this._layoutTimer), this._layoutTimer = window.setTimeout(() => {
      this._layoutDirty = !1, this.trackWrite(
        () => fetch(`${this.base}/layout`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this._layout)
        })
      );
    }, 600);
  }
  render() {
    var e;
    return this._error ? C`<div class="status error">modux editor: ${this._error}</div>` : this._model ? C`
      ${this._workspace ? C`
            <div class="workspace">
              <label>Modelo:</label>
              <select @change=${this.onWorkspaceSelect} title="Sistema (as-is) o una solución (to-be)">
                <option value="main" ?selected=${this._workspace.system}>Sistema (as-is)</option>
                ${this._workspace.solutions.map(
      (t) => C`<option value=${t.branch} ?selected=${t.branch === this._workspace.current}>
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
      return C`<span
                      class="badge solution"
                      title=${i.length ? `Eliminados respecto al sistema: ${i.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${t("ADDED")} ～${t("MODIFIED")} －${t("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? C`
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
      return C`
                      ${t === "EXPLORING" ? C`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${t === "PROPOSED" ? C`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${t === "APPROVED" ? C`<button
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
      ${this._mergeFlow ? C`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (t) => C`
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
se.styles = Xt`
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
ae([
  he()
], se.prototype, "base", 2);
ae([
  M()
], se.prototype, "_model", 2);
ae([
  M()
], se.prototype, "_layout", 2);
ae([
  M()
], se.prototype, "_error", 2);
ae([
  M()
], se.prototype, "_saving", 2);
ae([
  M()
], se.prototype, "_toast", 2);
ae([
  M()
], se.prototype, "_workspace", 2);
ae([
  M()
], se.prototype, "_creatingSolution", 2);
ae([
  M()
], se.prototype, "_newSolutionName", 2);
ae([
  M()
], se.prototype, "_diff", 2);
ae([
  M()
], se.prototype, "_mergeFlow", 2);
se = ae([
  Qt("modux-editor-connected")
], se);
export {
  $d as CONTAINER_HEADER,
  bd as CONTAINER_INSET,
  X as ModuxCanvas,
  R as ModuxEditor,
  se as ModuxEditorConnected,
  Wn as aggregatesScene,
  $n as containerFit,
  In as containerMinSize,
  Ln as contextMapScene,
  Nn as flowCoherence,
  es as flowsScene,
  bn as normalizeViewLayout,
  oi as processesScene,
  Mn as relationEdgeId
};
