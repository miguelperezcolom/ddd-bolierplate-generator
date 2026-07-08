const Ed = 34, Sd = 10;
function kn(e, t = { w: 160, h: 90 }) {
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
function En(e, t, i) {
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
function Sn(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const An = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Cn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Mn = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ve = 168, Fe = 56, Fi = 34, Ki = 14, Nn = 14, je = 108, Xe = 32, Wi = 12, Bi = 10, Ze = 2, Pn = Ze * je + (Ze - 1) * Wi + 2 * Ki;
function Tn(e, t) {
  return `rel:${e}->${t}`;
}
function Rn(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function dt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const On = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Ln = {
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
}, Un = {
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
function Dn(e) {
  const t = Math.max(1, Math.ceil(e / Ze)), i = t * Xe + (t - 1) * Bi;
  return { w: Pn, h: Fi + i + Nn };
}
function zn(e, t) {
  const i = e % Ze, n = Math.floor(e / Ze);
  return {
    x: -t.w / 2 + Ki + i * (je + Wi) + je / 2,
    y: -t.h / 2 + Fi + n * (Xe + Bi) + Xe / 2
  };
}
function qn(e, t, i, n, s, o) {
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
  return a.length ? zt(i, n, a, s, o) : [{ ...n, x: i.x, y: i.y, w: Ve, h: Fe }];
}
function zt(e, t, i, n, s) {
  const o = s[t.id] ?? Dn(i.length), r = i.map((u, m) => n[u.id] ?? zn(m, o)), a = En(
    e,
    o,
    r.map((u) => ({ dx: u.x, dy: u.y, w: je, h: Xe }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, l = i.map((u, m) => {
    const f = r[m], y = u.policy ? On : Ln[u.kind];
    return {
      id: u.id,
      label: u.name,
      kind: u.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: je,
      h: Xe,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${u.policy ? "Policy" : Un[u.kind]} ${u.name}`
    };
  });
  return [d, ...l];
}
function Hn(e, t, i = "contexts", n = {}) {
  const s = i !== "contexts", o = i === "operations", r = new Set(e.externalSystems.map((c) => c.id)), a = o ? [] : (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && r.has(c.publishedByExternalSystemId)
  ), d = new Set(a.map((c) => c.id)), l = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && r.has(c.publishedByExternalSystemId)
  ), u = new Set(l.map((c) => c.id)), m = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !d.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !u.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 }))
  ], f = m.flatMap((c, A) => {
    const P = t[c.ref.id] ?? dt(A, m.length);
    if (c.proxy) {
      const H = c.ref;
      return [{
        id: H.id,
        label: H.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${H.name} — proxy/cache de una API, consumible como ella`,
        x: P.x,
        y: P.y,
        w: Ve,
        h: Fe
      }];
    }
    if (c.api) {
      const H = c.ref, j = {
        id: H.id,
        label: H.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${H.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return s && H.operations.length > 0 ? zt(
        P,
        j,
        H.operations.map(
          (ee) => ({ id: ee.id, name: ee.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{ ...j, x: P.x, y: P.y, w: Ve, h: Fe }];
    }
    if (c.external) {
      const H = c.ref, j = {
        id: H.id,
        label: H.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${H.name} (sistema externo)`
      }, ee = a.filter((J) => J.publishedByExternalSystemId === H.id), ye = l.filter((J) => J.publishedByExternalSystemId === H.id), De = [
        ...ee.map((J) => ({ id: J.id, name: J.name, kind: "api" })),
        ...ye.map((J) => ({ id: J.id, name: J.name, kind: "proxy-api" })),
        ...s ? [
          ...(H.useCases ?? []).map(
            (J) => ({ id: J.id, name: J.name, kind: "external-use-case" })
          ),
          ...(H.tables ?? []).map(
            (J) => ({ id: J.id, name: J.name, kind: "external-table" })
          )
        ] : []
      ];
      return De.length > 0 ? zt(P, j, De, t, n) : [{ ...j, x: P.x, y: P.y, w: Ve, h: Fe }];
    }
    const V = c.ref, F = V.subdomainType ?? "GENERIC", B = {
      id: V.id,
      label: V.name,
      kind: "module",
      symbol: "component",
      fill: An[F],
      stroke: "#94a3b8",
      badge: F,
      tooltip: `${V.name} — subdominio ${F}`
    };
    return s ? qn(e, V, P, B, t, n) : [{ ...B, x: P.x, y: P.y, w: Ve, h: Fe }];
  }), y = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length;
  (e.actors ?? []).forEach((c, A) => {
    const P = t[c.id] ?? dt(m.length + A, y);
    f.push({
      id: c.id,
      label: c.name,
      x: P.x,
      y: P.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, A) => {
    const P = t[c.id] ?? dt(m.length + (e.actors ?? []).length + A, y);
    f.push({
      id: c.id,
      label: c.name,
      x: P.x,
      y: P.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${c.name} (agente de IA — consume por MCP)`
    });
  });
  const x = [];
  (e.rags ?? []).forEach((c, A) => {
    const P = t[c.id] ?? dt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + A,
      y
    );
    f.push({
      id: c.id,
      label: c.name,
      x: P.x,
      y: P.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((V, F) => {
      const B = `ragcs:${c.id}:${V.uri}`, H = t[B] ?? { x: P.x + 170, y: P.y - 30 + F * 44 };
      f.push({
        id: B,
        label: V.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: H.x,
        y: H.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: V.type,
        tooltip: `${V.type}: ${V.uri}`
      }), x.push({
        id: `ragcse:${c.id}:${V.uri}`,
        sourceId: B,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), f.sort((c, A) => (c.parentId ? 1 : 0) - (A.parentId ? 1 : 0));
  const b = e.relations.map((c) => ({
    id: Tn(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Cn[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), N = e.flows.map((c) => {
    var H, j, ee, ye, De, J;
    const A = Rn(e, c), P = s ? e.modules.find((oe) => oe.id === c.sourceId) : void 0, V = ((H = P == null ? void 0 : P.domainEvents) == null ? void 0 : H.find((oe) => oe.name === c.triggerEvent)) ?? ((j = P == null ? void 0 : P.applicationEvents) == null ? void 0 : j.find((oe) => oe.name === c.triggerEvent)), F = s && c.readModelName ? (ye = (ee = e.modules.find((oe) => oe.id === c.targetId)) == null ? void 0 : ee.readModels) == null ? void 0 : ye.find((oe) => oe.name === c.readModelName) : void 0, B = s && c.targetUseCaseId ? (J = (De = e.modules.find((oe) => oe.id === c.targetId)) == null ? void 0 : De.useCases) == null ? void 0 : J.find((oe) => oe.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (V == null ? void 0 : V.id) ?? c.sourceId,
      targetId: (B == null ? void 0 : B.id) ?? (F == null ? void 0 : F.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: Mn[A],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${A}`
    };
  }), v = new Set(f.map((c) => c.id)), R = s ? (e.emissions ?? []).filter((c) => v.has(c.sourceId) && v.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], q = s ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: A }) => A && c.readModelId).filter(({ p: c, source: A }) => v.has(A) && v.has(c.readModelId)).map(({ p: c, source: A }) => ({
    id: `proj:${c.id}`,
    sourceId: A,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], I = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((A) => {
      const P = s && v.has(A.id) ? A.id : c.id;
      if (!v.has(P)) return [];
      const V = s && A.targetUseCaseId && v.has(A.targetUseCaseId) ? A.targetUseCaseId : A.targetModuleId && v.has(A.targetModuleId) ? A.targetModuleId : (A.targetUseCaseId && !s, null);
      return V ? [
        {
          id: `apiwire:${A.id}`,
          sourceId: P,
          targetId: V,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${A.name} la implementa ${V}`
        }
      ] : [];
    })
  ), $ = s ? (e.useCaseCalls ?? []).filter((c) => v.has(c.sourceId) && v.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], E = s ? (e.queryCalls ?? []).filter((c) => v.has(c.sourceId) && v.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], S = s ? (e.actorUses ?? []).filter((c) => v.has(c.actorId) && v.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], Y = (e.actorExternalDependencies ?? []).filter((c) => v.has(c.actorId) && v.has(c.externalSystemId)).map((c) => ({
    id: `extdep:${c.actorId}->${c.externalSystemId}`,
    sourceId: c.actorId,
    targetId: c.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), K = new Map([
    ...(e.apis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId])
  ]), W = (c) => v.has(c) ? c : K.get(c) ?? c, Z = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({ sourceId: c.sourceId, targetId: W(c.targetId) })).filter(
        (c) => v.has(c.sourceId) && v.has(c.targetId) && c.sourceId !== c.targetId
      ).map((c) => [
        `xdep:${c.sourceId}->${c.targetId}`,
        {
          id: `xdep:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "ext-dep",
          color: "#64748b",
          dashed: !0,
          arrow: !0,
          tooltip: "depende de"
        }
      ])
    ).values()
  ], ie = o ? (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && v.has(c.publishedByExternalSystemId) && v.has(c.id)
  ).map((c) => ({
    id: `pub:${c.id}->${c.publishedByExternalSystemId}`,
    sourceId: c.id,
    targetId: c.publishedByExternalSystemId,
    kind: "published-by",
    color: "#94a3b8",
    dashed: !0,
    arrow: !0,
    tooltip: "publicada por"
  })) : [], p = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: W(c.id), targetId: W(c.targetApiId) })).filter(
        (c) => v.has(c.sourceId) && v.has(c.targetId) && c.sourceId !== c.targetId
      ).map((c) => [
        `pxt:${c.sourceId}->${c.targetId}`,
        {
          id: `pxt:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "proxy-target",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: "proxy/cache de"
        }
      ])
    ).values()
  ], h = s ? (e.agentUses ?? []).filter((c) => v.has(c.agentId) && v.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], w = (e.agentRags ?? []).filter((c) => v.has(c.agentId) && v.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), g = s ? (e.rags ?? []).filter((c) => v.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((A) => v.has(A)).map((A) => ({
      id: `ragsrc:${c.id}->${A}`,
      sourceId: c.id,
      targetId: A,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], _ = s ? (e.agentExternalUses ?? []).filter((c) => v.has(c.agentId) && v.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], k = s ? (e.externalCalls ?? []).filter((c) => v.has(c.externalSystemId) && v.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], T = s ? (e.externalUseCaseCalls ?? []).filter((c) => v.has(c.sourceId) && v.has(c.targetId)).map((c) => ({
    id: `extuccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [];
  return {
    nodes: f,
    edges: [
      ...b,
      ...N,
      ...R,
      ...q,
      ...I,
      ...$,
      ...E,
      ...S,
      ...Y,
      ...Z,
      ...ie,
      ...p,
      ...h,
      ..._,
      ...w,
      ...g,
      ...x,
      ...k,
      ...T
    ]
  };
}
const Vn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Fn = 176, Kn = 60, Wn = 140, Bn = 40;
function Gn(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((d) => d.moduleId === s.id).forEach((d, l) => {
      const u = n.filter((f) => f.aggregateId === d.id).length, m = 140 + l * (170 + u * 60);
      t[d.id] = { x: r, y: m }, n.filter((f) => f.aggregateId === d.id).forEach((f, y) => {
        t[f.id] = { x: r + 60, y: m + 100 + y * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Yn(e, t) {
  const i = Gn(e), n = (l) => t[l] ?? i[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), o = (e.aggregates ?? []).map((l) => {
    const u = s.get(l.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", f = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: f.x,
      y: f.y,
      w: Fn,
      h: Kn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Vn[m],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${u ? ` — módulo ${u.name} (${m})` : ""}`
    };
  }), r = (e.entities ?? []).map((l) => {
    const u = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: u.x,
      y: u.y,
      w: Wn,
      h: Bn,
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
  })), d = (e.aggregateReferences ?? []).map((l, u) => ({
    id: `aggref:${u}:${l.sourceAggregateId}->${l.targetAggregateId}`,
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
const jn = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Xn = 150, Zn = 44, Jn = 190, Qn = 56, es = 160, ts = 48;
function is(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function ns(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, l;
    return ((l = (d = e.aggregates) == null ? void 0 : d.find((u) => u.id === a)) == null ? void 0 : l.name) ?? a ?? "?";
  };
  return i.forEach((a, d) => {
    const l = 120 + d * 130, u = jn[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const N = t[m] ?? { x: 160, y: l };
      n.push({
        id: m,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : m,
        x: N.x,
        y: N.y,
        w: Xn,
        h: Zn,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${a.id}`, y = t[f] ?? { x: 470, y: l };
    n.push({
      id: f,
      label: a.name,
      x: y.x,
      y: y.y,
      w: Jn,
      h: Qn,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const x = is(e, a), b = `tgt:${x.id}`;
    if (!o.has(b)) {
      o.add(b);
      const N = t[b] ?? { x: 790, y: l };
      n.push({
        id: b,
        label: x.label,
        x: N.x,
        y: N.y,
        w: es,
        h: ts,
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
      targetId: b,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const ss = 190, os = 56, Nt = 170, rs = 52;
function li(e, t) {
  const i = [], n = [], s = (o) => {
    var r;
    return (r = e.modules.find((a) => a.id === o)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((o, r) => {
    const a = 140 + r * 240, d = t[o.id] ?? { x: 150, y: a };
    i.push({
      id: o.id,
      label: o.name,
      x: d.x,
      y: d.y,
      w: ss,
      h: os,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let l = o.id;
    if (o.steps.forEach((u, m) => {
      const f = u.type === "HUMAN", y = t[u.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: u.id,
        label: u.name,
        x: y.x,
        y: y.y,
        w: Nt,
        h: rs,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${m}`,
        sourceId: l,
        targetId: u.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const x = `comp:${u.id}`, b = t[x] ?? { x: y.x, y: y.y + 90 };
        i.push({
          id: x,
          label: u.compensationUseCaseId,
          x: b.x,
          y: b.y,
          w: Nt,
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
          targetId: x,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      l = u.id;
    }), o.onCompletionEventName) {
      const u = `done:${o.id}`, m = t[u] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: u,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Nt,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${o.id}`,
        sourceId: l,
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
const ft = globalThis, Xt = ft.ShadowRoot && (ft.ShadyCSS === void 0 || ft.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zt = Symbol(), ci = /* @__PURE__ */ new WeakMap();
let Gi = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Xt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = ci.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ci.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const as = (e) => new Gi(typeof e == "string" ? e : e + "", void 0, Zt), Jt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Gi(i, e, Zt);
}, ds = (e, t) => {
  if (Xt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = ft.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, ui = Xt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return as(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ls, defineProperty: cs, getOwnPropertyDescriptor: us, getOwnPropertyNames: hs, getOwnPropertySymbols: ps, getPrototypeOf: fs } = Object, xe = globalThis, hi = xe.trustedTypes, ms = hi ? hi.emptyScript : "", Pt = xe.reactiveElementPolyfillSupport, Be = (e, t) => e, vt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ms : null;
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
} }, Qt = (e, t) => !ls(e, t), pi = { attribute: !0, type: String, converter: vt, reflect: !1, useDefault: !1, hasChanged: Qt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), xe.litPropertyMetadata ?? (xe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Pe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = pi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && cs(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = us(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? pi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Be("elementProperties"))) return;
    const t = fs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Be("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Be("properties"))) {
      const i = this.properties, n = [...hs(i), ...ps(i)];
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
      for (const s of n) i.unshift(ui(s));
    } else t !== void 0 && i.push(ui(t));
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
    return ds(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : vt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : vt;
      this._$Em = s;
      const l = d.fromAttribute(i, a.type);
      this[s] = l ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? Qt)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
        const { wrapped: a } = r, d = this[o];
        a !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, r, d);
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
Pe.elementStyles = [], Pe.shadowRootOptions = { mode: "open" }, Pe[Be("elementProperties")] = /* @__PURE__ */ new Map(), Pe[Be("finalized")] = /* @__PURE__ */ new Map(), Pt == null || Pt({ ReactiveElement: Pe }), (xe.reactiveElementVersions ?? (xe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = globalThis, fi = (e) => e, _t = Ge.trustedTypes, mi = _t ? _t.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Yi = "$lit$", _e = `lit$${Math.random().toFixed(9).slice(2)}$`, ji = "?" + _e, gs = `<${ji}>`, Ce = document, Je = () => Ce.createComment(""), Qe = (e) => e === null || typeof e != "object" && typeof e != "function", ei = Array.isArray, ws = (e) => ei(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Tt = `[ 	
\f\r]`, ze = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gi = /-->/g, wi = />/g, Ie = RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yi = /'/g, vi = /"/g, Xi = /^(?:script|style|textarea|title)$/i, Zi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), C = Zi(1), D = Zi(2), Re = Symbol.for("lit-noChange"), Q = Symbol.for("lit-nothing"), _i = /* @__PURE__ */ new WeakMap(), be = Ce.createTreeWalker(Ce, 129);
function Ji(e, t) {
  if (!ei(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mi !== void 0 ? mi.createHTML(t) : t;
}
const ys = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ze;
  for (let a = 0; a < i; a++) {
    const d = e[a];
    let l, u, m = -1, f = 0;
    for (; f < d.length && (r.lastIndex = f, u = r.exec(d), u !== null); ) f = r.lastIndex, r === ze ? u[1] === "!--" ? r = gi : u[1] !== void 0 ? r = wi : u[2] !== void 0 ? (Xi.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = Ie) : u[3] !== void 0 && (r = Ie) : r === Ie ? u[0] === ">" ? (r = s ?? ze, m = -1) : u[1] === void 0 ? m = -2 : (m = r.lastIndex - u[2].length, l = u[1], r = u[3] === void 0 ? Ie : u[3] === '"' ? vi : yi) : r === vi || r === yi ? r = Ie : r === gi || r === wi ? r = ze : (r = Ie, s = void 0);
    const y = r === Ie && e[a + 1].startsWith("/>") ? " " : "";
    o += r === ze ? d + gs : m >= 0 ? (n.push(l), d.slice(0, m) + Yi + d.slice(m) + _e + y) : d + _e + (m === -2 ? a : y);
  }
  return [Ji(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class et {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [l, u] = ys(t, i);
    if (this.el = et.createElement(l, n), be.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = be.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Yi)) {
          const f = u[r++], y = s.getAttribute(m).split(_e), x = /([.?@])?(.*)/.exec(f);
          d.push({ type: 1, index: o, name: x[2], strings: y, ctor: x[1] === "." ? _s : x[1] === "?" ? xs : x[1] === "@" ? Is : St }), s.removeAttribute(m);
        } else m.startsWith(_e) && (d.push({ type: 6, index: o }), s.removeAttribute(m));
        if (Xi.test(s.tagName)) {
          const m = s.textContent.split(_e), f = m.length - 1;
          if (f > 0) {
            s.textContent = _t ? _t.emptyScript : "";
            for (let y = 0; y < f; y++) s.append(m[y], Je()), be.nextNode(), d.push({ type: 2, index: ++o });
            s.append(m[f], Je());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ji) d.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(_e, m + 1)) !== -1; ) d.push({ type: 7, index: o }), m += _e.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Ce.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Oe(e, t, i = e, n) {
  var r, a;
  if (t === Re) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = Qe(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Oe(e, s._$AS(e, t.values), s, n)), t;
}
class vs {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Ce).importNode(i, !0);
    be.currentNode = s;
    let o = be.nextNode(), r = 0, a = 0, d = n[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let l;
        d.type === 2 ? l = new ot(o, o.nextSibling, this, t) : d.type === 1 ? l = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (l = new $s(o, this, t)), this._$AV.push(l), d = n[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = be.nextNode(), r++);
    }
    return be.currentNode = Ce, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class ot {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = Q, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Oe(this, t, i), Qe(t) ? t === Q || t == null || t === "" ? (this._$AH !== Q && this._$AR(), this._$AH = Q) : t !== this._$AH && t !== Re && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ws(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Q && Qe(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ce.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = et.createElement(Ji(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new vs(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = _i.get(t.strings);
    return i === void 0 && _i.set(t.strings, i = new et(t)), i;
  }
  k(t) {
    ei(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new ot(this.O(Je()), this.O(Je()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = fi(t).nextSibling;
      fi(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class St {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = Q, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Q;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Oe(this, t, i, 0), r = !Qe(t) || t !== this._$AH && t !== Re, r && (this._$AH = t);
    else {
      const a = t;
      let d, l;
      for (t = o[0], d = 0; d < o.length - 1; d++) l = Oe(this, a[n + d], i, d), l === Re && (l = this._$AH[d]), r || (r = !Qe(l) || l !== this._$AH[d]), l === Q ? t = Q : t !== Q && (t += (l ?? "") + o[d + 1]), this._$AH[d] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === Q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _s extends St {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Q ? void 0 : t;
  }
}
class xs extends St {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Q);
  }
}
class Is extends St {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Oe(this, t, i, 0) ?? Q) === Re) return;
    const n = this._$AH, s = t === Q && n !== Q || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== Q && (n === Q || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class $s {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Oe(this, t);
  }
}
const Rt = Ge.litHtmlPolyfillSupport;
Rt == null || Rt(et, ot), (Ge.litHtmlVersions ?? (Ge.litHtmlVersions = [])).push("3.3.3");
const bs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new ot(t.insertBefore(Je(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis;
class Se extends Pe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = bs(i, this.renderRoot, this.renderOptions);
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
    return Re;
  }
}
var Vi;
Se._$litElement$ = !0, Se.finalized = !0, (Vi = Ee.litElementHydrateSupport) == null || Vi.call(Ee, { LitElement: Se });
const Ot = Ee.litElementPolyfillSupport;
Ot == null || Ot({ LitElement: Se });
(Ee.litElementVersions ?? (Ee.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ti = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ks = { attribute: !0, type: String, converter: vt, reflect: !1, hasChanged: Qt }, Es = (e = ks, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const d = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, d, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const d = this[r];
      t.call(this, a), this.requestUpdate(r, d, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function pe(e) {
  return (t, i) => typeof i == "object" ? Es(e, t, i) : ((n, s, o) => {
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
  return pe({ ...e, state: !0, attribute: !1 });
}
var qt = "http://www.w3.org/1999/xhtml";
const xi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: qt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function At(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), xi.hasOwnProperty(t) ? { space: xi[t], local: e } : e;
}
function Ss(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === qt && t.documentElement.namespaceURI === qt ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function As(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Qi(e) {
  var t = At(e);
  return (t.local ? As : Ss)(t);
}
function Cs() {
}
function ii(e) {
  return e == null ? Cs : function() {
    return this.querySelector(e);
  };
}
function Ms(e) {
  typeof e != "function" && (e = ii(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), d, l, u = 0; u < r; ++u)
      (d = o[u]) && (l = e.call(d, d.__data__, u, o)) && ("__data__" in d && (l.__data__ = d.__data__), a[u] = l);
  return new re(n, this._parents);
}
function Ns(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Ps() {
  return [];
}
function en(e) {
  return e == null ? Ps : function() {
    return this.querySelectorAll(e);
  };
}
function Ts(e) {
  return function() {
    return Ns(e.apply(this, arguments));
  };
}
function Rs(e) {
  typeof e == "function" ? e = Ts(e) : e = en(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && (n.push(e.call(d, d.__data__, l, r)), s.push(d));
  return new re(n, s);
}
function tn(e) {
  return function() {
    return this.matches(e);
  };
}
function nn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Os = Array.prototype.find;
function Ls(e) {
  return function() {
    return Os.call(this.children, e);
  };
}
function Us() {
  return this.firstElementChild;
}
function Ds(e) {
  return this.select(e == null ? Us : Ls(typeof e == "function" ? e : nn(e)));
}
var zs = Array.prototype.filter;
function qs() {
  return Array.from(this.children);
}
function Hs(e) {
  return function() {
    return zs.call(this.children, e);
  };
}
function Vs(e) {
  return this.selectAll(e == null ? qs : Hs(typeof e == "function" ? e : nn(e)));
}
function Fs(e) {
  typeof e != "function" && (e = tn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new re(n, this._parents);
}
function sn(e) {
  return new Array(e.length);
}
function Ks() {
  return new re(this._enter || this._groups.map(sn), this._parents);
}
function xt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
xt.prototype = {
  constructor: xt,
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
function Ws(e) {
  return function() {
    return e;
  };
}
function Bs(e, t, i, n, s, o) {
  for (var r = 0, a, d = t.length, l = o.length; r < l; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new xt(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function Gs(e, t, i, n, s, o, r) {
  var a, d, l = /* @__PURE__ */ new Map(), u = t.length, m = o.length, f = new Array(u), y;
  for (a = 0; a < u; ++a)
    (d = t[a]) && (f[a] = y = r.call(d, d.__data__, a, t) + "", l.has(y) ? s[a] = d : l.set(y, d));
  for (a = 0; a < m; ++a)
    y = r.call(e, o[a], a, o) + "", (d = l.get(y)) ? (n[a] = d, d.__data__ = o[a], l.delete(y)) : i[a] = new xt(e, o[a]);
  for (a = 0; a < u; ++a)
    (d = t[a]) && l.get(f[a]) === d && (s[a] = d);
}
function Ys(e) {
  return e.__data__;
}
function js(e, t) {
  if (!arguments.length) return Array.from(this, Ys);
  var i = t ? Gs : Bs, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Ws(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), l = 0; l < o; ++l) {
    var u = n[l], m = s[l], f = m.length, y = Xs(e.call(u, u && u.__data__, l, n)), x = y.length, b = a[l] = new Array(x), N = r[l] = new Array(x), v = d[l] = new Array(f);
    i(u, m, b, N, v, y, t);
    for (var R = 0, q = 0, I, $; R < x; ++R)
      if (I = b[R]) {
        for (R >= q && (q = R + 1); !($ = N[q]) && ++q < x; ) ;
        I._next = $ || null;
      }
  }
  return r = new re(r, n), r._enter = a, r._exit = d, r;
}
function Xs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Zs() {
  return new re(this._exit || this._groups.map(sn), this._parents);
}
function Js(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function Qs(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var l = i[d], u = n[d], m = l.length, f = a[d] = new Array(m), y, x = 0; x < m; ++x)
      (y = l[x] || u[x]) && (f[x] = y);
  for (; d < s; ++d)
    a[d] = i[d];
  return new re(a, this._parents);
}
function eo() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function to(e) {
  e || (e = io);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, d = s[o] = new Array(a), l, u = 0; u < a; ++u)
      (l = r[u]) && (d[u] = l);
    d.sort(t);
  }
  return new re(s, this._parents).order();
}
function io(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function no() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function so() {
  return Array.from(this);
}
function oo() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var r = n[s];
      if (r) return r;
    }
  return null;
}
function ro() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ao() {
  return !this.node();
}
function lo(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function co(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function uo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ho(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function po(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function fo(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function mo(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function go(e, t) {
  var i = At(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? uo : co : typeof t == "function" ? i.local ? mo : fo : i.local ? po : ho)(i, t));
}
function on(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function wo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function yo(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function vo(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function _o(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? wo : typeof t == "function" ? vo : yo)(e, t, i ?? "")) : Le(this.node(), e);
}
function Le(e, t) {
  return e.style.getPropertyValue(t) || on(e).getComputedStyle(e, null).getPropertyValue(t);
}
function xo(e) {
  return function() {
    delete this[e];
  };
}
function Io(e, t) {
  return function() {
    this[e] = t;
  };
}
function $o(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function bo(e, t) {
  return arguments.length > 1 ? this.each((t == null ? xo : typeof t == "function" ? $o : Io)(e, t)) : this.node()[e];
}
function rn(e) {
  return e.trim().split(/^|\s+/);
}
function ni(e) {
  return e.classList || new an(e);
}
function an(e) {
  this._node = e, this._names = rn(e.getAttribute("class") || "");
}
an.prototype = {
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
function dn(e, t) {
  for (var i = ni(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function ln(e, t) {
  for (var i = ni(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function ko(e) {
  return function() {
    dn(this, e);
  };
}
function Eo(e) {
  return function() {
    ln(this, e);
  };
}
function So(e, t) {
  return function() {
    (t.apply(this, arguments) ? dn : ln)(this, e);
  };
}
function Ao(e, t) {
  var i = rn(e + "");
  if (arguments.length < 2) {
    for (var n = ni(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? So : t ? ko : Eo)(i, t));
}
function Co() {
  this.textContent = "";
}
function Mo(e) {
  return function() {
    this.textContent = e;
  };
}
function No(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Po(e) {
  return arguments.length ? this.each(e == null ? Co : (typeof e == "function" ? No : Mo)(e)) : this.node().textContent;
}
function To() {
  this.innerHTML = "";
}
function Ro(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Oo(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Lo(e) {
  return arguments.length ? this.each(e == null ? To : (typeof e == "function" ? Oo : Ro)(e)) : this.node().innerHTML;
}
function Uo() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Do() {
  return this.each(Uo);
}
function zo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function qo() {
  return this.each(zo);
}
function Ho(e) {
  var t = typeof e == "function" ? e : Qi(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Vo() {
  return null;
}
function Fo(e, t) {
  var i = typeof e == "function" ? e : Qi(e), n = t == null ? Vo : typeof t == "function" ? t : ii(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Ko() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Wo() {
  return this.each(Ko);
}
function Bo() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Go() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Yo(e) {
  return this.select(e ? Go : Bo);
}
function jo(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Xo(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Zo(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Jo(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function Qo(e, t, i) {
  return function() {
    var n = this.__on, s, o = Xo(t);
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
function er(e, t, i) {
  var n = Zo(e + ""), s, o = n.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var d = 0, l = a.length, u; d < l; ++d)
        for (s = 0, u = a[d]; s < o; ++s)
          if ((r = n[s]).type === u.type && r.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = t ? Qo : Jo, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function cn(e, t, i) {
  var n = on(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function tr(e, t) {
  return function() {
    return cn(this, e, t);
  };
}
function ir(e, t) {
  return function() {
    return cn(this, e, t.apply(this, arguments));
  };
}
function nr(e, t) {
  return this.each((typeof t == "function" ? ir : tr)(e, t));
}
function* sr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, r; s < o; ++s)
      (r = n[s]) && (yield r);
}
var un = [null];
function re(e, t) {
  this._groups = e, this._parents = t;
}
function rt() {
  return new re([[document.documentElement]], un);
}
function or() {
  return this;
}
re.prototype = rt.prototype = {
  constructor: re,
  select: Ms,
  selectAll: Rs,
  selectChild: Ds,
  selectChildren: Vs,
  filter: Fs,
  data: js,
  enter: Ks,
  exit: Zs,
  join: Js,
  merge: Qs,
  selection: or,
  order: eo,
  sort: to,
  call: no,
  nodes: so,
  node: oo,
  size: ro,
  empty: ao,
  each: lo,
  attr: go,
  style: _o,
  property: bo,
  classed: Ao,
  text: Po,
  html: Lo,
  raise: Do,
  lower: qo,
  append: Ho,
  insert: Fo,
  remove: Wo,
  clone: Yo,
  datum: jo,
  on: er,
  dispatch: nr,
  [Symbol.iterator]: sr
};
function ue(e) {
  return typeof e == "string" ? new re([[document.querySelector(e)]], [document.documentElement]) : new re([[e]], un);
}
function rr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function $e(e, t) {
  if (e = rr(e), t === void 0 && (t = e.currentTarget), t) {
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
var ar = { value: () => {
} };
function si() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new mt(i);
}
function mt(e) {
  this._ = e;
}
function dr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
mt.prototype = si.prototype = {
  constructor: mt,
  on: function(e, t) {
    var i = this._, n = dr(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = lr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = Ii(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = Ii(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new mt(e);
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
function lr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function Ii(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = ar, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Ht = { capture: !0, passive: !1 };
function Vt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function cr(e) {
  var t = e.document.documentElement, i = ue(e).on("dragstart.drag", Vt, Ht);
  "onselectstart" in t ? i.on("selectstart.drag", Vt, Ht) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ur(e, t) {
  var i = e.document.documentElement, n = ue(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Vt, Ht), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function oi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function hn(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function at() {
}
var tt = 0.7, It = 1 / tt, Te = "\\s*([+-]?\\d+)\\s*", it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", he = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", hr = /^#([0-9a-f]{3,8})$/, pr = new RegExp(`^rgb\\(${Te},${Te},${Te}\\)$`), fr = new RegExp(`^rgb\\(${he},${he},${he}\\)$`), mr = new RegExp(`^rgba\\(${Te},${Te},${Te},${it}\\)$`), gr = new RegExp(`^rgba\\(${he},${he},${he},${it}\\)$`), wr = new RegExp(`^hsl\\(${it},${he},${he}\\)$`), yr = new RegExp(`^hsla\\(${it},${he},${he},${it}\\)$`), $i = {
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
oi(at, nt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: bi,
  // Deprecated! Use color.formatHex.
  formatHex: bi,
  formatHex8: vr,
  formatHsl: _r,
  formatRgb: ki,
  toString: ki
});
function bi() {
  return this.rgb().formatHex();
}
function vr() {
  return this.rgb().formatHex8();
}
function _r() {
  return pn(this).formatHsl();
}
function ki() {
  return this.rgb().formatRgb();
}
function nt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = hr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Ei(t) : i === 3 ? new ne(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? lt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? lt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = pr.exec(e)) ? new ne(t[1], t[2], t[3], 1) : (t = fr.exec(e)) ? new ne(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = mr.exec(e)) ? lt(t[1], t[2], t[3], t[4]) : (t = gr.exec(e)) ? lt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = wr.exec(e)) ? Ci(t[1], t[2] / 100, t[3] / 100, 1) : (t = yr.exec(e)) ? Ci(t[1], t[2] / 100, t[3] / 100, t[4]) : $i.hasOwnProperty(e) ? Ei($i[e]) : e === "transparent" ? new ne(NaN, NaN, NaN, 0) : null;
}
function Ei(e) {
  return new ne(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function lt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new ne(e, t, i, n);
}
function xr(e) {
  return e instanceof at || (e = nt(e)), e ? (e = e.rgb(), new ne(e.r, e.g, e.b, e.opacity)) : new ne();
}
function Ft(e, t, i, n) {
  return arguments.length === 1 ? xr(e) : new ne(e, t, i, n ?? 1);
}
function ne(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
oi(ne, Ft, hn(at, {
  brighter(e) {
    return e = e == null ? It : Math.pow(It, e), new ne(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? tt : Math.pow(tt, e), new ne(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ne(Ae(this.r), Ae(this.g), Ae(this.b), $t(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Si,
  // Deprecated! Use color.formatHex.
  formatHex: Si,
  formatHex8: Ir,
  formatRgb: Ai,
  toString: Ai
}));
function Si() {
  return `#${ke(this.r)}${ke(this.g)}${ke(this.b)}`;
}
function Ir() {
  return `#${ke(this.r)}${ke(this.g)}${ke(this.b)}${ke((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ai() {
  const e = $t(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ae(this.r)}, ${Ae(this.g)}, ${Ae(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function $t(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ae(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ke(e) {
  return e = Ae(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ci(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new le(e, t, i, n);
}
function pn(e) {
  if (e instanceof le) return new le(e.h, e.s, e.l, e.opacity);
  if (e instanceof at || (e = nt(e)), !e) return new le();
  if (e instanceof le) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new le(r, a, d, e.opacity);
}
function $r(e, t, i, n) {
  return arguments.length === 1 ? pn(e) : new le(e, t, i, n ?? 1);
}
function le(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
oi(le, $r, hn(at, {
  brighter(e) {
    return e = e == null ? It : Math.pow(It, e), new le(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? tt : Math.pow(tt, e), new le(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new ne(
      Lt(e >= 240 ? e - 240 : e + 120, s, n),
      Lt(e, s, n),
      Lt(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new le(Mi(this.h), ct(this.s), ct(this.l), $t(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = $t(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Mi(this.h)}, ${ct(this.s) * 100}%, ${ct(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Mi(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ct(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Lt(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const fn = (e) => () => e;
function br(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function kr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Er(e) {
  return (e = +e) == 1 ? mn : function(t, i) {
    return i - t ? kr(t, i, e) : fn(isNaN(t) ? i : t);
  };
}
function mn(e, t) {
  var i = t - e;
  return i ? br(e, i) : fn(isNaN(e) ? t : e);
}
const Ni = (function e(t) {
  var i = Er(t);
  function n(s, o) {
    var r = i((s = Ft(s)).r, (o = Ft(o)).r), a = i(s.g, o.g), d = i(s.b, o.b), l = mn(s.opacity, o.opacity);
    return function(u) {
      return s.r = r(u), s.g = a(u), s.b = d(u), s.opacity = l(u), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function ve(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Kt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ut = new RegExp(Kt.source, "g");
function Sr(e) {
  return function() {
    return e;
  };
}
function Ar(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Cr(e, t) {
  var i = Kt.lastIndex = Ut.lastIndex = 0, n, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (n = Kt.exec(e)) && (s = Ut.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: ve(n, s) })), i = Ut.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? Ar(d[0].x) : Sr(t) : (t = d.length, function(l) {
    for (var u = 0, m; u < t; ++u) a[(m = d[u]).i] = m.x(l);
    return a.join("");
  });
}
var Pi = 180 / Math.PI, Wt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function gn(e, t, i, n, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * i + t * n) && (i -= e * d, n -= t * d), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, d /= a), e * n < t * i && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * Pi,
    skewX: Math.atan(d) * Pi,
    scaleX: r,
    scaleY: a
  };
}
var ut;
function Mr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Wt : gn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Nr(e) {
  return e == null || (ut || (ut = document.createElementNS("http://www.w3.org/2000/svg", "g")), ut.setAttribute("transform", e), !(e = ut.transform.baseVal.consolidate())) ? Wt : (e = e.matrix, gn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function wn(e, t, i, n) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, m, f, y, x) {
    if (l !== m || u !== f) {
      var b = y.push("translate(", null, t, null, i);
      x.push({ i: b - 4, x: ve(l, m) }, { i: b - 2, x: ve(u, f) });
    } else (m || f) && y.push("translate(" + m + t + f + i);
  }
  function r(l, u, m, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: ve(l, u) })) : u && m.push(s(m) + "rotate(" + u + n);
  }
  function a(l, u, m, f) {
    l !== u ? f.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: ve(l, u) }) : u && m.push(s(m) + "skewX(" + u + n);
  }
  function d(l, u, m, f, y, x) {
    if (l !== m || u !== f) {
      var b = y.push(s(y) + "scale(", null, ",", null, ")");
      x.push({ i: b - 4, x: ve(l, m) }, { i: b - 2, x: ve(u, f) });
    } else (m !== 1 || f !== 1) && y.push(s(y) + "scale(" + m + "," + f + ")");
  }
  return function(l, u) {
    var m = [], f = [];
    return l = e(l), u = e(u), o(l.translateX, l.translateY, u.translateX, u.translateY, m, f), r(l.rotate, u.rotate, m, f), a(l.skewX, u.skewX, m, f), d(l.scaleX, l.scaleY, u.scaleX, u.scaleY, m, f), l = u = null, function(y) {
      for (var x = -1, b = f.length, N; ++x < b; ) m[(N = f[x]).i] = N.x(y);
      return m.join("");
    };
  };
}
var Pr = wn(Mr, "px, ", "px)", "deg)"), Tr = wn(Nr, ", ", ")", ")"), Rr = 1e-12;
function Ti(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Or(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Lr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ur = (function e(t, i, n) {
  function s(o, r) {
    var a = o[0], d = o[1], l = o[2], u = r[0], m = r[1], f = r[2], y = u - a, x = m - d, b = y * y + x * x, N, v;
    if (b < Rr)
      v = Math.log(f / l) / t, N = function(S) {
        return [
          a + S * y,
          d + S * x,
          l * Math.exp(t * S * v)
        ];
      };
    else {
      var R = Math.sqrt(b), q = (f * f - l * l + n * b) / (2 * l * i * R), I = (f * f - l * l - n * b) / (2 * f * i * R), $ = Math.log(Math.sqrt(q * q + 1) - q), E = Math.log(Math.sqrt(I * I + 1) - I);
      v = (E - $) / t, N = function(S) {
        var Y = S * v, K = Ti($), W = l / (i * R) * (K * Lr(t * Y + $) - Or($));
        return [
          a + W * y,
          d + W * x,
          l * K / Ti(t * Y + $)
        ];
      };
    }
    return N.duration = v * 1e3 * t / Math.SQRT2, N;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Ue = 0, Ke = 0, qe = 0, yn = 1e3, bt, We, kt = 0, Me = 0, Ct = 0, st = typeof performance == "object" && performance.now ? performance : Date, vn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ri() {
  return Me || (vn(Dr), Me = st.now() + Ct);
}
function Dr() {
  Me = 0;
}
function Et() {
  this._call = this._time = this._next = null;
}
Et.prototype = _n.prototype = {
  constructor: Et,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ri() : +i) + (t == null ? 0 : +t), !this._next && We !== this && (We ? We._next = this : bt = this, We = this), this._call = e, this._time = i, Bt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Bt());
  }
};
function _n(e, t, i) {
  var n = new Et();
  return n.restart(e, t, i), n;
}
function zr() {
  ri(), ++Ue;
  for (var e = bt, t; e; )
    (t = Me - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ue;
}
function Ri() {
  Me = (kt = st.now()) + Ct, Ue = Ke = 0;
  try {
    zr();
  } finally {
    Ue = 0, Hr(), Me = 0;
  }
}
function qr() {
  var e = st.now(), t = e - kt;
  t > yn && (Ct -= t, kt = e);
}
function Hr() {
  for (var e, t = bt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : bt = i);
  We = e, Bt(n);
}
function Bt(e) {
  if (!Ue) {
    Ke && (Ke = clearTimeout(Ke));
    var t = e - Me;
    t > 24 ? (e < 1 / 0 && (Ke = setTimeout(Ri, e - st.now() - Ct)), qe && (qe = clearInterval(qe))) : (qe || (kt = st.now(), qe = setInterval(qr, yn)), Ue = 1, vn(Ri));
  }
}
function Oi(e, t, i) {
  var n = new Et();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Vr = si("start", "end", "cancel", "interrupt"), Fr = [], xn = 0, Li = 1, Gt = 2, gt = 3, Ui = 4, Yt = 5, wt = 6;
function Mt(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  Kr(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Vr,
    tween: Fr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: xn
  });
}
function ai(e, t) {
  var i = ce(e, t);
  if (i.state > xn) throw new Error("too late; already scheduled");
  return i;
}
function fe(e, t) {
  var i = ce(e, t);
  if (i.state > gt) throw new Error("too late; already running");
  return i;
}
function ce(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Kr(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = _n(o, 0, i.time);
  function o(l) {
    i.state = Li, i.timer.restart(r, i.delay, i.time), i.delay <= l && r(l - i.delay);
  }
  function r(l) {
    var u, m, f, y;
    if (i.state !== Li) return d();
    for (u in n)
      if (y = n[u], y.name === i.name) {
        if (y.state === gt) return Oi(r);
        y.state === Ui ? (y.state = wt, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete n[u]) : +u < t && (y.state = wt, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete n[u]);
      }
    if (Oi(function() {
      i.state === gt && (i.state = Ui, i.timer.restart(a, i.delay, i.time), a(l));
    }), i.state = Gt, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Gt) {
      for (i.state = gt, s = new Array(f = i.tween.length), u = 0, m = -1; u < f; ++u)
        (y = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = y);
      s.length = m + 1;
    }
  }
  function a(l) {
    for (var u = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(d), i.state = Yt, 1), m = -1, f = s.length; ++m < f; )
      s[m].call(e, u);
    i.state === Yt && (i.on.call("end", e, e.__data__, i.index, i.group), d());
  }
  function d() {
    i.state = wt, i.timer.stop(), delete n[t];
    for (var l in n) return;
    delete e.__transition;
  }
}
function yt(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > Gt && n.state < Yt, n.state = wt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function Wr(e) {
  return this.each(function() {
    yt(this, e);
  });
}
function Br(e, t) {
  var i, n;
  return function() {
    var s = fe(this, e), o = s.tween;
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
function Gr(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = fe(this, e), r = o.tween;
    if (r !== n) {
      s = (n = r).slice();
      for (var a = { name: t, value: i }, d = 0, l = s.length; d < l; ++d)
        if (s[d].name === t) {
          s[d] = a;
          break;
        }
      d === l && s.push(a);
    }
    o.tween = s;
  };
}
function Yr(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = ce(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Br : Gr)(i, e, t));
}
function di(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = fe(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return ce(s, n).value[t];
  };
}
function In(e, t) {
  var i;
  return (typeof t == "number" ? ve : t instanceof nt ? Ni : (i = nt(t)) ? (t = i, Ni) : Cr)(e, t);
}
function jr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Xr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Zr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Jr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Qr(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function ea(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function ta(e, t) {
  var i = At(e), n = i === "transform" ? Tr : In;
  return this.attrTween(e, typeof t == "function" ? (i.local ? ea : Qr)(i, n, di(this, "attr." + e, t)) : t == null ? (i.local ? Xr : jr)(i) : (i.local ? Jr : Zr)(i, n, t));
}
function ia(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function na(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function sa(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && na(e, o)), i;
  }
  return s._value = t, s;
}
function oa(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && ia(e, o)), i;
  }
  return s._value = t, s;
}
function ra(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = At(e);
  return this.tween(i, (n.local ? sa : oa)(n, t));
}
function aa(e, t) {
  return function() {
    ai(this, e).delay = +t.apply(this, arguments);
  };
}
function da(e, t) {
  return t = +t, function() {
    ai(this, e).delay = t;
  };
}
function la(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? aa : da)(t, e)) : ce(this.node(), t).delay;
}
function ca(e, t) {
  return function() {
    fe(this, e).duration = +t.apply(this, arguments);
  };
}
function ua(e, t) {
  return t = +t, function() {
    fe(this, e).duration = t;
  };
}
function ha(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ca : ua)(t, e)) : ce(this.node(), t).duration;
}
function pa(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    fe(this, e).ease = t;
  };
}
function fa(e) {
  var t = this._id;
  return arguments.length ? this.each(pa(t, e)) : ce(this.node(), t).ease;
}
function ma(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    fe(this, e).ease = i;
  };
}
function ga(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ma(this._id, e));
}
function wa(e) {
  typeof e != "function" && (e = tn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new we(n, this._parents, this._name, this._id);
}
function ya(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var d = t[a], l = i[a], u = d.length, m = r[a] = new Array(u), f, y = 0; y < u; ++y)
      (f = d[y] || l[y]) && (m[y] = f);
  for (; a < n; ++a)
    r[a] = t[a];
  return new we(r, this._parents, this._name, this._id);
}
function va(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function _a(e, t, i) {
  var n, s, o = va(t) ? ai : fe;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function xa(e, t) {
  var i = this._id;
  return arguments.length < 2 ? ce(this.node(), i).on.on(e) : this.each(_a(i, e, t));
}
function Ia(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function $a() {
  return this.on("end.remove", Ia(this._id));
}
function ba(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = ii(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], d = a.length, l = o[r] = new Array(d), u, m, f = 0; f < d; ++f)
      (u = a[f]) && (m = e.call(u, u.__data__, f, a)) && ("__data__" in u && (m.__data__ = u.__data__), l[f] = m, Mt(l[f], t, i, f, l, ce(u, i)));
  return new we(o, this._parents, t, i);
}
function ka(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = en(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = n[a], l = d.length, u, m = 0; m < l; ++m)
      if (u = d[m]) {
        for (var f = e.call(u, u.__data__, m, d), y, x = ce(u, i), b = 0, N = f.length; b < N; ++b)
          (y = f[b]) && Mt(y, t, i, b, f, x);
        o.push(f), r.push(u);
      }
  return new we(o, r, t, i);
}
var Ea = rt.prototype.constructor;
function Sa() {
  return new Ea(this._groups, this._parents);
}
function Aa(e, t) {
  var i, n, s;
  return function() {
    var o = Le(this, e), r = (this.style.removeProperty(e), Le(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function $n(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ca(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = Le(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Ma(e, t, i) {
  var n, s, o;
  return function() {
    var r = Le(this, e), a = i(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Le(this, e))), r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a));
  };
}
function Na(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = fe(this, e), l = d.on, u = d.value[o] == null ? a || (a = $n(t)) : void 0;
    (l !== i || s !== u) && (n = (i = l).copy()).on(r, s = u), d.on = n;
  };
}
function Pa(e, t, i) {
  var n = (e += "") == "transform" ? Pr : In;
  return t == null ? this.styleTween(e, Aa(e, n)).on("end.style." + e, $n(e)) : typeof t == "function" ? this.styleTween(e, Ma(e, n, di(this, "style." + e, t))).each(Na(this._id, e)) : this.styleTween(e, Ca(e, n, t), i).on("end.style." + e, null);
}
function Ta(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Ra(e, t, i) {
  var n, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Ta(e, r, i)), n;
  }
  return o._value = t, o;
}
function Oa(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Ra(e, t, i ?? ""));
}
function La(e) {
  return function() {
    this.textContent = e;
  };
}
function Ua(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Da(e) {
  return this.tween("text", typeof e == "function" ? Ua(di(this, "text", e)) : La(e == null ? "" : e + ""));
}
function za(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function qa(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && za(s)), t;
  }
  return n._value = e, n;
}
function Ha(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, qa(e));
}
function Va() {
  for (var e = this._name, t = this._id, i = bn(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, l = 0; l < a; ++l)
      if (d = r[l]) {
        var u = ce(d, t);
        Mt(d, e, i, l, r, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new we(n, this._parents, e, i);
}
function Fa() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var l = fe(this, n), u = l.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), l.on = t;
    }), s === 0 && o();
  });
}
var Ka = 0;
function we(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function bn() {
  return ++Ka;
}
var me = rt.prototype;
we.prototype = {
  constructor: we,
  select: ba,
  selectAll: ka,
  selectChild: me.selectChild,
  selectChildren: me.selectChildren,
  filter: wa,
  merge: ya,
  selection: Sa,
  transition: Va,
  call: me.call,
  nodes: me.nodes,
  node: me.node,
  size: me.size,
  empty: me.empty,
  each: me.each,
  on: xa,
  attr: ta,
  attrTween: ra,
  style: Pa,
  styleTween: Oa,
  text: Da,
  textTween: Ha,
  remove: $a,
  tween: Yr,
  delay: la,
  duration: ha,
  ease: fa,
  easeVarying: ga,
  end: Fa,
  [Symbol.iterator]: me[Symbol.iterator]
};
function Wa(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ba = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Wa
};
function Ga(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Ya(e) {
  var t, i;
  e instanceof we ? (t = e._id, e = e._name) : (t = bn(), (i = Ba).time = ri(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && Mt(d, e, t, l, r, i || Ga(d, t));
  return new we(n, this._parents, e, t);
}
rt.prototype.interrupt = Wr;
rt.prototype.transition = Ya;
const ht = (e) => () => e;
function ja(e, {
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
function ge(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
ge.prototype = {
  constructor: ge,
  scale: function(e) {
    return e === 1 ? this : new ge(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ge(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Ye = new ge(1, 0, 0);
ge.prototype;
function Dt(e) {
  e.stopImmediatePropagation();
}
function He(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Xa(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Za() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Di() {
  return this.__zoom || Ye;
}
function Ja(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Qa() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ed(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function td() {
  var e = Xa, t = Za, i = ed, n = Ja, s = Qa, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Ur, l = si("start", "zoom", "end"), u, m, f, y = 500, x = 150, b = 0, N = 10;
  function v(h) {
    h.property("__zoom", Di).on("wheel.zoom", Y, { passive: !1 }).on("mousedown.zoom", K).on("dblclick.zoom", W).filter(s).on("touchstart.zoom", Z).on("touchmove.zoom", ie).on("touchend.zoom touchcancel.zoom", p).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(h, w, g, _) {
    var k = h.selection ? h.selection() : h;
    k.property("__zoom", Di), h !== k ? $(h, w, g, _) : k.interrupt().each(function() {
      E(this, arguments).event(_).start().zoom(null, typeof w == "function" ? w.apply(this, arguments) : w).end();
    });
  }, v.scaleBy = function(h, w, g, _) {
    v.scaleTo(h, function() {
      var k = this.__zoom.k, T = typeof w == "function" ? w.apply(this, arguments) : w;
      return k * T;
    }, g, _);
  }, v.scaleTo = function(h, w, g, _) {
    v.transform(h, function() {
      var k = t.apply(this, arguments), T = this.__zoom, c = g == null ? I(k) : typeof g == "function" ? g.apply(this, arguments) : g, A = T.invert(c), P = typeof w == "function" ? w.apply(this, arguments) : w;
      return i(q(R(T, P), c, A), k, r);
    }, g, _);
  }, v.translateBy = function(h, w, g, _) {
    v.transform(h, function() {
      return i(this.__zoom.translate(
        typeof w == "function" ? w.apply(this, arguments) : w,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), r);
    }, null, _);
  }, v.translateTo = function(h, w, g, _, k) {
    v.transform(h, function() {
      var T = t.apply(this, arguments), c = this.__zoom, A = _ == null ? I(T) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return i(Ye.translate(A[0], A[1]).scale(c.k).translate(
        typeof w == "function" ? -w.apply(this, arguments) : -w,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), T, r);
    }, _, k);
  };
  function R(h, w) {
    return w = Math.max(o[0], Math.min(o[1], w)), w === h.k ? h : new ge(w, h.x, h.y);
  }
  function q(h, w, g) {
    var _ = w[0] - g[0] * h.k, k = w[1] - g[1] * h.k;
    return _ === h.x && k === h.y ? h : new ge(h.k, _, k);
  }
  function I(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function $(h, w, g, _) {
    h.on("start.zoom", function() {
      E(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var k = this, T = arguments, c = E(k, T).event(_), A = t.apply(k, T), P = g == null ? I(A) : typeof g == "function" ? g.apply(k, T) : g, V = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), F = k.__zoom, B = typeof w == "function" ? w.apply(k, T) : w, H = d(F.invert(P).concat(V / F.k), B.invert(P).concat(V / B.k));
      return function(j) {
        if (j === 1) j = B;
        else {
          var ee = H(j), ye = V / ee[2];
          j = new ge(ye, P[0] - ee[0] * ye, P[1] - ee[1] * ye);
        }
        c.zoom(null, j);
      };
    });
  }
  function E(h, w, g) {
    return !g && h.__zooming || new S(h, w);
  }
  function S(h, w) {
    this.that = h, this.args = w, this.active = 0, this.sourceEvent = null, this.extent = t.apply(h, w), this.taps = 0;
  }
  S.prototype = {
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
      var w = ue(this.that).datum();
      l.call(
        h,
        this.that,
        new ja(h, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: l
        }),
        w
      );
    }
  };
  function Y(h, ...w) {
    if (!e.apply(this, arguments)) return;
    var g = E(this, w).event(h), _ = this.__zoom, k = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, n.apply(this, arguments)))), T = $e(h);
    if (g.wheel)
      (g.mouse[0][0] !== T[0] || g.mouse[0][1] !== T[1]) && (g.mouse[1] = _.invert(g.mouse[0] = T)), clearTimeout(g.wheel);
    else {
      if (_.k === k) return;
      g.mouse = [T, _.invert(T)], yt(this), g.start();
    }
    He(h), g.wheel = setTimeout(c, x), g.zoom("mouse", i(q(R(_, k), g.mouse[0], g.mouse[1]), g.extent, r));
    function c() {
      g.wheel = null, g.end();
    }
  }
  function K(h, ...w) {
    if (f || !e.apply(this, arguments)) return;
    var g = h.currentTarget, _ = E(this, w, !0).event(h), k = ue(h.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", V, !0), T = $e(h, g), c = h.clientX, A = h.clientY;
    cr(h.view), Dt(h), _.mouse = [T, this.__zoom.invert(T)], yt(this), _.start();
    function P(F) {
      if (He(F), !_.moved) {
        var B = F.clientX - c, H = F.clientY - A;
        _.moved = B * B + H * H > b;
      }
      _.event(F).zoom("mouse", i(q(_.that.__zoom, _.mouse[0] = $e(F, g), _.mouse[1]), _.extent, r));
    }
    function V(F) {
      k.on("mousemove.zoom mouseup.zoom", null), ur(F.view, _.moved), He(F), _.event(F).end();
    }
  }
  function W(h, ...w) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, _ = $e(h.changedTouches ? h.changedTouches[0] : h, this), k = g.invert(_), T = g.k * (h.shiftKey ? 0.5 : 2), c = i(q(R(g, T), _, k), t.apply(this, w), r);
      He(h), a > 0 ? ue(this).transition().duration(a).call($, c, _, h) : ue(this).call(v.transform, c, _, h);
    }
  }
  function Z(h, ...w) {
    if (e.apply(this, arguments)) {
      var g = h.touches, _ = g.length, k = E(this, w, h.changedTouches.length === _).event(h), T, c, A, P;
      for (Dt(h), c = 0; c < _; ++c)
        A = g[c], P = $e(A, this), P = [P, this.__zoom.invert(P), A.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== P[2] && (k.touch1 = P, k.taps = 0) : (k.touch0 = P, T = !0, k.taps = 1 + !!u);
      u && (u = clearTimeout(u)), T && (k.taps < 2 && (m = P[0], u = setTimeout(function() {
        u = null;
      }, y)), yt(this), k.start());
    }
  }
  function ie(h, ...w) {
    if (this.__zooming) {
      var g = E(this, w).event(h), _ = h.changedTouches, k = _.length, T, c, A, P;
      for (He(h), T = 0; T < k; ++T)
        c = _[T], A = $e(c, this), g.touch0 && g.touch0[2] === c.identifier ? g.touch0[0] = A : g.touch1 && g.touch1[2] === c.identifier && (g.touch1[0] = A);
      if (c = g.that.__zoom, g.touch1) {
        var V = g.touch0[0], F = g.touch0[1], B = g.touch1[0], H = g.touch1[1], j = (j = B[0] - V[0]) * j + (j = B[1] - V[1]) * j, ee = (ee = H[0] - F[0]) * ee + (ee = H[1] - F[1]) * ee;
        c = R(c, Math.sqrt(j / ee)), A = [(V[0] + B[0]) / 2, (V[1] + B[1]) / 2], P = [(F[0] + H[0]) / 2, (F[1] + H[1]) / 2];
      } else if (g.touch0) A = g.touch0[0], P = g.touch0[1];
      else return;
      g.zoom("touch", i(q(c, A, P), g.extent, r));
    }
  }
  function p(h, ...w) {
    if (this.__zooming) {
      var g = E(this, w).event(h), _ = h.changedTouches, k = _.length, T, c;
      for (Dt(h), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, y), T = 0; T < k; ++T)
        c = _[T], g.touch0 && g.touch0[2] === c.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === c.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (c = $e(c, this), Math.hypot(m[0] - c[0], m[1] - c[1]) < N)) {
        var A = ue(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : ht(+h), v) : n;
  }, v.filter = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : ht(!!h), v) : e;
  }, v.touchable = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : ht(!!h), v) : s;
  }, v.extent = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : ht([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), v) : t;
  }, v.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], v) : [o[0], o[1]];
  }, v.translateExtent = function(h) {
    return arguments.length ? (r[0][0] = +h[0][0], r[1][0] = +h[1][0], r[0][1] = +h[0][1], r[1][1] = +h[1][1], v) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, v.constrain = function(h) {
    return arguments.length ? (i = h, v) : i;
  }, v.duration = function(h) {
    return arguments.length ? (a = +h, v) : a;
  }, v.interpolate = function(h) {
    return arguments.length ? (d = h, v) : d;
  }, v.on = function() {
    var h = l.on.apply(l, arguments);
    return h === l ? v : h;
  }, v.clickDistance = function(h) {
    return arguments.length ? (b = (h = +h) * h, v) : Math.sqrt(b);
  }, v.tapDistance = function(h) {
    return arguments.length ? (N = +h, v) : N;
  }, v;
}
var id = Object.defineProperty, nd = Object.getOwnPropertyDescriptor, te = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? nd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && id(t, i, s), s;
};
function sd(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const l = ((i.x - e.x) * a - (i.y - e.y) * r) / d, u = ((i.x - e.x) * o - (i.y - e.y) * s) / d;
  return l <= 0.02 || l >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * o, t: l };
}
function od(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function rd(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, l = (r.y - o.y) / a, u = t.map(([f, y]) => sd(o, r, f, y)).filter((f) => f !== null).filter((f) => f.t * a > i + 2 && (1 - f.t) * a > i + 2).sort((f, y) => f.t - y.t);
    let m = -1 / 0;
    for (const f of u)
      f.t * a - i <= m + 2 || (n += ` L ${f.x - d * i} ${f.y - l * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + d * i} ${f.y + l * i}`, m = f.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const pt = {
  component: D`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: D`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: D`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: D`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: D`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: D`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: D`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: D`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: D`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: D`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: D`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: D`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: D`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: D`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let X = class extends Se {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ye, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
    this._zoomBehavior = td().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), ue(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((u) => u.x - u.w / 2)) - e, o = Math.max(...t.map((u) => u.x + u.w / 2)) + e, r = Math.min(...t.map((u) => u.y - u.h / 2)) - e, a = Math.max(...t.map((u) => u.y + u.h / 2)) + e, d = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), l = Ye.translate(n.width / 2 - d * (s + o) / 2, n.height / 2 - d * (r + a) / 2).scale(d);
    ue(i).call(this._zoomBehavior.transform, l);
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
        const s = this.nodePos(n), o = s.x - n.w / 2 + 10 + e.w / 2, r = s.x + n.w / 2 - 10 - e.w / 2, a = s.y - n.h / 2 + 34 + e.h / 2, d = s.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), r), i = Math.min(Math.max(i, a), d);
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
      const o = (n = s.closest) == null ? void 0 : n.call(s, "[data-node-id]");
      if (o) return o.getAttribute("data-node-id");
    }
    return null;
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const o = new Set(this.selectedIds), r = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => o.has(f.id) && !(f.parentId && o.has(f.parentId))
    ) : null, a = r ? new Map(r.map((f) => [f.id, this.nodePos(f)])) : null, d = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, l = (f) => {
      const y = this.nodeIdAt(f), x = y && y !== t.id ? this.scene.nodes.find((b) => b.id === y) : void 0;
      return x ? x.kind === "external-system" ? x.id : x.parentId ?? null : null;
    }, u = (f) => {
      if ((f.buttons & 1) === 0) {
        m(f);
        return;
      }
      const y = this.toScene(f), x = y.x - i.x, b = y.y - i.y;
      if (!(!s && Math.hypot(x, b) < 3 / this._t.k))
        if (s = !0, r && a) {
          const N = /* @__PURE__ */ new Map();
          for (const v of r) {
            const R = a.get(v.id), q = this.clampToParent(v, R.x + x, R.y + b);
            N.set(v.id, { x: q.x, y: q.y });
          }
          this._dragGroup = N;
        } else d(f) ? (this._dragPos = { id: t.id, x: n.x + x, y: n.y + b }, this._hoverNodeId = l(f)) : (this._dragPos = this.clampToParent(t, n.x + x, n.y + b), this._hoverNodeId = null);
    }, m = (f) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([y, x]) => ({ id: y, x: x.x, y: x.y }))
        });
      else if (s && this._dragPos) {
        if (d(f)) {
          const y = l(f);
          if (f.ctrlKey && t.kind === "api") {
            y && y !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: y,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
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
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation(), this.focus();
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((b) => b.parentId === t.id), d = Math.min(...a.map((b) => b.x - b.w / 2)), l = Math.max(...a.map((b) => b.x + b.w / 2)), u = Math.min(...a.map((b) => b.y - b.h / 2)), m = Math.max(...a.map((b) => b.y + b.h / 2)), f = kn(
      a.map((b) => ({ dx: b.x - r.x, dy: b.y - r.y, w: b.w, h: b.h })),
      { w: s, h: o }
    ), y = (b) => {
      if ((b.buttons & 1) === 0) {
        x();
        return;
      }
      const N = this.toScene(b);
      if (b.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(f.w, 2 * Math.abs(N.x - r.x)),
          h: Math.max(f.h, 2 * Math.abs(N.y - r.y))
        };
        return;
      }
      const v = r.x - i * r.w / 2, R = r.y - n * r.h / 2, q = i > 0 ? Math.max(N.x, v + s, a.length ? l + 10 : -1 / 0) : Math.min(N.x, v - s, a.length ? d - 10 : 1 / 0), I = n > 0 ? Math.max(N.y, R + o, a.length ? m + 10 : -1 / 0) : Math.min(N.y, R - o, a.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (v + q) / 2,
        y: (R + I) / 2,
        w: Math.abs(q - v),
        h: Math.abs(I - R)
      };
    }, x = () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", x), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", y), window.addEventListener("pointerup", x);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const n = (o) => {
      if ((o.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(o);
    }, s = (o) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const r = this.nodeIdAt(o);
      r && r !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: r,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), o = t - n, r = i - s, a = e.w / 2, d = e.h / 2;
    if (o === 0 && r === 0) return { x: n, y: s };
    const l = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / d);
    return { x: n + o * l, y: s + r * l };
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
    let d = this.borderPoint(t, r.x, r.y), l = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(l.x - d.x, l.y - d.y) || 1, f = -(l.y - d.y) / m * u, y = (l.x - d.x) / m * u;
        d = { x: d.x + f, y: d.y + y }, l = { x: l.x + f, y: l.y + y };
      }
    }
    return [d, ...n, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      n = !0;
      const a = this.toScene(r), d = [...this._wpDrag.points];
      d[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: d };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = od(t, e[n], e[n + 1]);
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
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const n = this.toScene(e), s = this.nearestSegment(i, n);
    let o = !1;
    const r = (d) => {
      if ((d.buttons & 1) === 0) {
        a();
        return;
      }
      const l = this.toScene(d);
      if (o) {
        if (this._wpDrag) {
          const u = [...this._wpDrag.points];
          u[s] = l, this._wpDrag = { ...this._wpDrag, points: u };
        }
      } else {
        if (Math.hypot(l.x - n.x, l.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const u = [...this.edgePoints[t.id] ?? []];
        u.splice(s, 0, l), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: u, index: s };
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
    }, d = t.slice(1, -1), l = t.map((u) => `${u.x},${u.y}`).join(" ");
    return D`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${l}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(u) => {
      u.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(u) => {
      u.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(u));
    }}
              @pointerdown=${(u) => this.onEdgeHitPointerDown(u, e, t)}>
          ${e.tooltip ? D`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${rd(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}
              pointer-events="none"></path>
        ${e.label ? D`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
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
      return D`
                <circle data-waypoint cx=${u.x} cy=${u.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(x) => {
        x.button === 0 && (x.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: m }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], m));
      }}
                        @dblclick=${(x) => {
        x.stopPropagation(), this.removeWaypoint(e, m);
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
    var f, y, x;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, d = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.h : e.h, l = a / 2, u = d / 2, m = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return D`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (x = this._dragGroup) != null && x.has(e.id) ? "none" : "auto"}
         @pointerdown=${(b) => this.onNodePointerDown(b, e)}
         @dblclick=${(b) => {
      b.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? D`<rect x=${-l - 4} y=${-u - 4} width=${a + 8} height=${d + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-l} y=${-u} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? D`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? D`<text x=${-l} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && pt[e.symbol] && !r ? D`<g transform="translate(${l - 17}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${pt[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && pt[e.symbol] ? D`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${pt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? D`
              <foreignObject x=${-l + 6} y=${o ? -u + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(b) => b.stopPropagation()}
                  @keydown=${(b) => {
      b.stopPropagation(), b.key === "Enter" && this.commitRename(e, b.target.value), b.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(b) => this.commitRename(e, b.target.value)}
                />
              </foreignObject>` : r ? D`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? D`<text x=${-l + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : D`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? D`<line x1=${-l + 8} y1=${-u + 28} x2=${l - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [l, 0],
      [-l, 0],
      [0, u],
      [0, -u]
    ].map(
      ([b, N]) => D`
                <circle data-handle cx=${b} cy=${N} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso, una operación externa o un RAG: el agente lo usará" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([b, N]) => D`
                <rect data-resize x=${b * l - 6.5} y=${N * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${b * N > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, b, N)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return D``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return D``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return D`
      <line x1=${t.x} y1=${t.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let i = !1;
    const n = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, s = (r) => {
      if ((r.buttons & 1) === 0) {
        n();
        return;
      }
      const a = this.toScene(r);
      !i && Math.hypot(a.x - t.x, a.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: a });
    }, o = () => {
      if (window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: r, b: a } = this._rubber, d = Math.min(r.x, a.x), l = Math.max(r.x, a.x), u = Math.min(r.y, a.y), m = Math.max(r.y, a.y), f = this.scene.nodes.filter((y) => {
          const x = this.nodePos(y);
          return x.x >= d && x.x <= l && x.y >= u && x.y <= m;
        }).map((y) => y.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return D``;
    const { a: e, b: t } = this._rubber;
    return D`
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
    const n = this.getBoundingClientRect(), s = this._t.k, o = Ye.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    ue(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return C``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
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
      this.onMinimapPointer(l, e, n);
    }}
        @pointermove=${(l) => {
      var u, m;
      (m = (u = l.currentTarget).hasPointerCapture) != null && m.call(u, l.pointerId) && this.onMinimapPointer(l, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((l) => {
      const u = this.nodePos(l);
      return D`<rect
              x=${(u.x - l.w / 2 - e.minX) * n}
              y=${(u.y - l.h / 2 - e.minY) * n}
              width=${Math.max(2, l.w * n)}
              height=${Math.max(2, l.h * n)}
              rx="1" fill=${l.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * n}
            y=${(r - e.minY) * n}
            width=${a * n}
            height=${d * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((r) => r.color ?? "#64748b"))], t = [], i = this.scene.edges.map((r) => {
      const a = this.edgePolyline(r);
      if (!a) return D``;
      const d = this.renderEdge(r, a, [...t]);
      for (let l = 0; l < a.length - 1; l++) t.push([a[l], a[l + 1]]);
      return d;
    }), n = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (n.has(r.sourceId) || n.has(r.targetId) ? o : s).push(
        i[a]
      );
    }), C`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(r) => {
      const a = r.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || r.button !== 0 || (r.buttons & 1) !== 0 && this.startRubberBand(r);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (r) => D`
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
X.styles = Jt`
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
te([
  pe({ attribute: !1 })
], X.prototype, "scene", 2);
te([
  pe({ attribute: !1 })
], X.prototype, "selectedId", 2);
te([
  pe({ attribute: !1 })
], X.prototype, "selectedIds", 2);
te([
  pe({ type: Boolean })
], X.prototype, "connectable", 2);
te([
  pe({ attribute: !1 })
], X.prototype, "edgePoints", 2);
te([
  M()
], X.prototype, "_t", 2);
te([
  M()
], X.prototype, "_dragPos", 2);
te([
  M()
], X.prototype, "_dragGroup", 2);
te([
  M()
], X.prototype, "_pendingLink", 2);
te([
  M()
], X.prototype, "_hoverNodeId", 2);
te([
  M()
], X.prototype, "_editingId", 2);
te([
  M()
], X.prototype, "_spaceDown", 2);
te([
  M()
], X.prototype, "_wpDrag", 2);
te([
  M()
], X.prototype, "_selectedWaypoint", 2);
te([
  M()
], X.prototype, "_resize", 2);
te([
  M()
], X.prototype, "_rubber", 2);
X = te([
  ti("modux-canvas")
], X);
const O = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function ae(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function G(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ne = (e) => e.trim().toLowerCase();
function ad(e, t) {
  var K, W, Z, ie;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((p) => [p.id, p.name])), s = e.modules.flatMap(
    (p) => (p.useCases ?? []).map((h) => ({ ...h, moduleId: p.id }))
  ), o = new Set(s.map((p) => p.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((p) => (p.domainServices ?? []).map((h) => h.id))
  ), d = e.modules.flatMap(
    (p) => (p.domainEvents ?? []).map((h) => ({ ...h, moduleId: p.id, application: !1 }))
  ), l = e.modules.flatMap(
    (p) => (p.applicationEvents ?? []).map((h) => ({ ...h, moduleId: p.id, application: !0 }))
  ), u = e.modules.flatMap(
    (p) => (p.readModels ?? []).map((h) => ({ ...h, moduleId: p.id }))
  );
  for (const p of s)
    ae(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: O.command.w,
      h: O.command.h,
      kind: "use-case",
      symbol: p.policy ? "flow" : "gear",
      fill: p.policy ? O.policy.fill : O.command.fill,
      stroke: p.policy ? O.policy.stroke : O.command.stroke,
      badge: p.policy ? "POLICY" : "COMANDO",
      tooltip: p.policy ? `${p.name} — policy de ${n.get(p.moduleId) ?? p.moduleId} (reacción, no caso de negocio)` : `${p.name} — caso de uso de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  for (const p of r)
    ae(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: O.aggregate.w,
      h: O.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: O.aggregate.fill,
      stroke: O.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${p.name} — agregado de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const p of [...d, ...l])
    ae(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: O.event.w,
      h: O.event.h,
      kind: p.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: O.event.fill,
      stroke: O.event.stroke,
      badge: p.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${p.name} — evento de ${n.get(p.moduleId) ?? p.moduleId}`
    }), m.set(Ne(p.name), p.id);
  const f = (p) => {
    if (!p || !p.trim()) return null;
    const h = m.get(Ne(p));
    if (h) return h;
    const w = `evname:${Ne(p)}`;
    return ae(i, {
      id: w,
      label: p,
      x: 0,
      y: 0,
      w: O.event.w,
      h: O.event.h,
      kind: "event-name",
      symbol: "event",
      fill: O.event.fill,
      stroke: O.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${p} — referenciado por nombre, sin evento declarado en el catálogo`
    }), w;
  }, y = (p) => {
    const h = u.find((g) => g.id === p.id) ?? u.find((g) => p.name && Ne(g.name) === Ne(p.name)), w = (h == null ? void 0 : h.id) ?? (p.id || (p.name ? `rm:${Ne(p.name)}` : null));
    return w ? (ae(i, {
      id: w,
      label: (h == null ? void 0 : h.name) ?? p.name ?? w,
      x: 0,
      y: 0,
      w: O.readModel.w,
      h: O.readModel.h,
      kind: h ? "read-model" : "derived-read-model",
      fill: O.readModel.fill,
      stroke: O.readModel.stroke,
      dashed: !h,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const p of e.actorUses ?? []) {
    if (!o.has(p.targetId)) continue;
    const h = (e.actors ?? []).find((w) => w.id === p.actorId);
    h && (ae(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: O.actor.w,
      h: O.actor.h,
      kind: "actor",
      symbol: "person",
      fill: O.actor.fill,
      stroke: O.actor.stroke,
      badge: "ACTOR"
    }), G(i, {
      id: `es-actor:${h.id}->${p.targetId}`,
      sourceId: h.id,
      targetId: p.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const p of e.aiAgents ?? []) {
    const h = (e.agentUses ?? []).filter((_) => _.agentId === p.id), w = (e.agentExternalUses ?? []).filter((_) => _.agentId === p.id), g = (e.agentRags ?? []).filter((_) => _.agentId === p.id);
    if (!(!h.length && !w.length && !g.length)) {
      ae(i, {
        id: p.id,
        label: p.name,
        x: 0,
        y: 0,
        w: O.actor.w,
        h: O.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${p.name} — agente de IA (consume por MCP)`
      });
      for (const _ of h)
        o.has(_.useCaseId) && G(i, {
          id: `es-agent:${p.id}->${_.useCaseId}`,
          sourceId: p.id,
          targetId: _.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const _ of w) {
        const k = e.externalSystems.find(
          (c) => (c.useCases ?? []).some((A) => A.id === _.externalUseCaseId)
        );
        if (!k) continue;
        const T = (K = (k.useCases ?? []).find((c) => c.id === _.externalUseCaseId)) == null ? void 0 : K.name;
        ae(i, {
          id: k.id,
          label: k.name,
          x: 0,
          y: 0,
          w: O.external.w,
          h: O.external.h,
          kind: "external-system",
          symbol: "component",
          fill: O.external.fill,
          stroke: O.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), G(i, {
          id: `es-agentx:${p.id}->${_.externalUseCaseId}`,
          sourceId: p.id,
          targetId: k.id,
          kind: "es-agent-external",
          label: T,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `Llama a ${T} del sistema externo` : void 0
        });
      }
      for (const _ of g) {
        const k = (e.rags ?? []).find((T) => T.id === _.ragId);
        if (k) {
          ae(i, {
            id: k.id,
            label: k.name,
            x: 0,
            y: 0,
            w: O.readModel.w,
            h: O.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${k.name} — base de conocimiento (retrieval)`
          }), G(i, {
            id: `es-agrag:${p.id}->${k.id}`,
            sourceId: p.id,
            targetId: k.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const T of k.sourceReadModelIds ?? []) {
            const c = y({ id: T });
            c && G(i, {
              id: `es-ragsrc:${k.id}->${c}`,
              sourceId: c,
              targetId: k.id,
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
  const x = (p) => {
    const h = e.externalSystems.find((w) => w.id === p);
    return h ? (ae(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: O.external.w,
      h: O.external.h,
      kind: "external-system",
      symbol: "component",
      fill: O.external.fill,
      stroke: O.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), h.id) : null;
  };
  for (const p of e.externalCalls ?? []) {
    const h = x(p.externalSystemId);
    !h || !o.has(p.useCaseId) || G(i, {
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
    if (!o.has(p.sourceId)) continue;
    const h = e.externalSystems.find(
      (_) => (_.useCases ?? []).some((k) => k.id === p.targetId)
    ), w = h ? x(h.id) : null;
    if (!w) continue;
    const g = (W = ((h == null ? void 0 : h.useCases) ?? []).find((_) => _.id === p.targetId)) == null ? void 0 : W.name;
    G(i, {
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
    !o.has(p.sourceId) || !i.nodes.has(p.targetId) || G(i, {
      id: `es-write:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: p.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const b = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const p of b)
    !i.nodes.has(p.domainEventId) || !(i.nodes.has(p.sourceId) && (o.has(p.sourceId) || r.some((w) => w.id === p.sourceId) || a.has(p.sourceId))) || G(i, {
      id: `es-emit:${p.sourceId}->${p.domainEventId}`,
      sourceId: p.sourceId,
      targetId: p.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const N = (p, h, w, g, _, k) => (ae(i, {
    id: p,
    label: h,
    x: 0,
    y: 0,
    w: O.policy.w,
    h: O.policy.h,
    kind: w,
    symbol: "flow",
    fill: O.policy.fill,
    stroke: O.policy.stroke,
    badge: g,
    tooltip: _
  }), p), v = (p, h) => {
    const w = f(p);
    w && G(i, {
      id: `es-trigger:${w}->${h}`,
      sourceId: w,
      targetId: h,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, R = (p, h) => {
    !h || !o.has(h) || G(i, {
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
    v(p.eventName, h);
    for (const w of p.actions ?? []) {
      if (w.type === "CallUseCase" && R(h, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const g = `saga:${w.sagaId}`;
        N(g, w.sagaId, "saga", "SAGA"), G(i, {
          id: `es-saga:${h}->${g}`,
          sourceId: h,
          targetId: g,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const g = (e.projections ?? []).find((_) => _.id === w.projectionId);
        g && G(i, {
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
    for (const _ of p.handledEventIds) {
      const k = i.nodes.has(_) ? _ : null;
      k && G(i, {
        id: `es-trigger:${k}->${h}`,
        sourceId: k,
        targetId: h,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    p.sourceAggregateId && i.nodes.has(p.sourceAggregateId) && G(i, {
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
      const _ = e.externalSystems.find(
        (T) => (T.useCases ?? []).some((c) => c.id === w) || (T.tables ?? []).some((c) => c.id === w)
      ), k = _ ? x(_.id) : null;
      if (k) {
        const T = ((Z = (_.useCases ?? []).find((c) => c.id === w)) == null ? void 0 : Z.name) ?? ((ie = (_.tables ?? []).find((c) => c.id === w)) == null ? void 0 : ie.name);
        G(i, {
          id: `es-poll:${p.id}`,
          sourceId: k,
          targetId: h,
          kind: "es-projects-poll",
          label: T,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `polling de ${T}` : "polling"
        });
      }
    }
    const g = y({ id: p.readModelId, name: p.readModelName });
    g && G(i, {
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
      w && g && G(i, {
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
    if (v(p.triggerEvent, h), R(h, p.targetUseCaseId), !p.targetUseCaseId) {
      const w = x(p.targetId), g = w ?? `tgt:${p.targetId}`;
      !w && n.has(p.targetId) && ae(i, {
        id: g,
        label: n.get(p.targetId) ?? p.targetId,
        x: 0,
        y: 0,
        w: O.module.w,
        h: O.module.h,
        kind: "module",
        symbol: "component",
        fill: O.module.fill,
        stroke: O.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(g) && G(i, {
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
    v(p.triggerEvent, h);
    for (const g of p.steps) R(h, g.useCaseId);
    const w = f(p.onCompletionEventName);
    w && G(i, {
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
    v(p.triggerEvent, h);
    for (const g of p.steps ?? []) {
      R(h, g.targetUseCaseId);
      for (const _ of [g.emittedEventName, g.completionEventName]) {
        const k = f(_);
        k && G(i, {
          id: `es-wfemit:${p.id}:${k}`,
          sourceId: h,
          targetId: k,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = f(p.onCompletionEventName);
    w && G(i, {
      id: `es-done:${p.id}`,
      sourceId: h,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const q = [...i.nodes.values()], I = /* @__PURE__ */ new Map();
  for (const p of i.edges)
    I.has(p.targetId) || I.set(p.targetId, []), I.get(p.targetId).push(p.sourceId);
  const $ = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Set(), S = (p) => {
    const h = $.get(p);
    if (h !== void 0) return h;
    if (E.has(p)) return 0;
    E.add(p);
    const w = I.get(p) ?? [], g = w.length ? 1 + Math.max(...w.map(S)) : 0;
    return E.delete(p), $.set(p, g), g;
  }, Y = /* @__PURE__ */ new Map();
  for (const p of q) {
    const h = t[p.id];
    if (h) {
      p.x = h.x, p.y = h.y;
      continue;
    }
    const w = S(p.id), g = Y.get(w) ?? 0;
    Y.set(w, g + 1), p.x = 140 + w * 260, p.y = 110 + g * 110;
  }
  return { nodes: q, edges: i.edges };
}
const dd = 190, ld = 56, zi = 180, cd = 56, ud = 150, hd = 44, qi = 250, Hi = 100;
function pd(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), r;
  };
  return n(e);
}
function fd(e, t) {
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
function md(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var d;
    return (d = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === a)) == null ? void 0 : d.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var N;
    const d = new Map(a.steps.map((v) => [v.id, v])), l = new Map(a.steps.map((v) => [v.id, pd(v, d)])), u = /* @__PURE__ */ new Map();
    for (const v of a.steps) {
      const R = l.get(v.id) ?? 0;
      u.set(R, (u.get(R) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), f = fd(e, a);
    if (f && !s.has(f.id)) {
      s.add(f.id);
      const v = t[f.id] ?? { x: 140, y: r };
      i.push({
        id: f.id,
        label: f.label,
        x: v.x,
        y: v.y,
        w: ud,
        h: hd,
        kind: f.kind,
        symbol: f.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: f.kind === "aggregate" ? "AGGREGATE" : f.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const y = t[a.id] ?? { x: 420, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: y.x,
      y: y.y,
      w: dd,
      h: ld,
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
    const x = /* @__PURE__ */ new Map();
    let b = 0;
    for (const v of a.steps) {
      const R = l.get(v.id) ?? 0;
      b = Math.max(b, R);
      const q = x.get(R) ?? 0;
      x.set(R, q + 1);
      const I = t[v.id] ?? {
        x: y.x + (R + 1) * qi,
        y: r + (q - (u.get(R) - 1) / 2) * Hi
      }, $ = o(v.targetUseCaseId);
      i.push({
        id: v.id,
        label: v.name,
        x: I.x,
        y: I.y,
        w: zi,
        h: cd,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: $ ? `→ ${$}` : "∅ sin use case",
        tooltip: `${v.name}${v.emittedEventName ? ` · emite ${v.emittedEventName}` : ""}${$ ? ` · lanza ${$}` : ""}${v.completionEventName ? ` · espera ${v.completionEventName}` : ""}`
      });
      const E = (v.dependsOnStepIds ?? []).filter((S) => d.has(S));
      E.length === 0 && n.push({
        id: `wfs:${a.id}:${v.id}`,
        sourceId: a.id,
        targetId: v.id,
        kind: "workflow-start",
        label: v.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const S of E)
        n.push({
          id: `wfdep:${S}->${v.id}`,
          sourceId: S,
          targetId: v.id,
          kind: "workflow-dependency",
          label: v.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${v.name} espera a ${((N = d.get(S)) == null ? void 0 : N.name) ?? S}`
        });
    }
    if (a.onCompletionEventName) {
      const v = `done:${a.id}`, R = t[v] ?? { x: y.x + (b + 2) * qi, y: r };
      i.push({
        id: v,
        label: a.onCompletionEventName,
        x: R.x,
        y: R.y,
        w: zi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const q = new Set(a.steps.flatMap(($) => $.dependsOnStepIds ?? [])), I = a.steps.filter(($) => !q.has($.id));
      for (const $ of I.length ? I : [])
        n.push({
          id: `wfd:${a.id}:${$.id}`,
          sourceId: $.id,
          targetId: v,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || n.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: v,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, m + 1) * Hi + 60;
  }), { nodes: i, edges: n };
}
async function gd(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((d) => d.e), n = new i(), o = {
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
  }, r = await n.layout(o), a = {};
  for (const d of r.children ?? [])
    a[d.id] = {
      x: (d.x ?? 0) + (d.width ?? 0) / 2,
      y: (d.y ?? 0) + (d.height ?? 0) / 2
    };
  return a;
}
var wd = Object.defineProperty, yd = Object.getOwnPropertyDescriptor, U = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? yd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && wd(t, i, s), s;
};
const jt = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, vd = Object.keys(jt), _d = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], xd = ["CORE", "SUPPORTING", "GENERIC"], z = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Id(e, t) {
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
function $d(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let L = class extends Se {
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
    return Sn(this.layout[e]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [e]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = this.viewLayout("context-map").detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    this._detail = e, e === "contexts" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module"), this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: e });
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
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const o = (this.model.proxyApis ?? []).find((r) => r.id === e.id);
        return o ? [{
          kind: "add-proxy-api",
          id: o.id,
          name: o.name,
          targetId: o.targetApiId,
          moduleId: o.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const o = (this.model.proxyApis ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "set-proxy-target", id: e.id, targetId: o.targetApiId ?? "" }] : null;
      }
      case "set-api-publisher": {
        const o = (this.model.apis ?? []).find((r) => r.id === e.id) ?? (this.model.proxyApis ?? []).find((r) => r.id === e.id);
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
        const o = (this.model.processes ?? []).find((d) => d.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((d) => d.id === e.id)) ?? -1;
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
        const o = (this.model.workflows ?? []).find((d) => d.id === e.workflowId), r = (o == null ? void 0 : o.steps.findIndex((d) => d.id === e.id)) ?? -1;
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
          ...o.steps.filter((d) => d.id !== e.id && (d.dependsOnStepIds ?? []).includes(e.id)).map(
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
    const d = this.sceneFor(s), l = d.nodes.find((m) => m.id === t);
    if (l != null && l.parentId) {
      const m = d.nodes.find((f) => f.id === l.parentId);
      m && (a = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const u = [{ kind: "move-node", view: s, id: t, pos: r }];
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((x) => x.id === t) ?? (this.model.proxyApis ?? []).find((x) => x.id === t);
    if (!o || i && !this.model.externalSystems.some((x) => x.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const d = this._view, l = this.viewLayout(d), u = this.sceneFor(d), m = a ? u.nodes.find((x) => x.id === a) : void 0, f = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, y = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: d, id: t, pos: l.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(d, { ...l, nodes: { ...l.nodes, [t]: f } }), this.pushUndoEntry(y);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((x) => x.id === t), r = this.model.externalSystems.find((x) => x.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (x) => x.targetApiId === t && x.publishedByExternalSystemId === i
    )) return;
    const d = `proxy-${z(o.name)}-${z(r.name)}`;
    if ((this.model.proxyApis ?? []).some((x) => x.id === d)) return;
    const l = this._view, u = this.viewLayout(l), f = this.sceneFor(l).nodes.find((x) => x.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: d,
        name: `${o.name}@${r.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const y = [{ kind: "remove-proxy-api", id: d }];
    f && (y.push({ kind: "move-node", view: l, id: d, pos: u.nodes[d] ?? null }), this.writeViewLayout(l, {
      ...u,
      nodes: { ...u.nodes, [d]: { x: n - f.x, y: s - f.y } }
    })), this.pushUndoEntry(y);
  }
  /** The selected element, when it is a first-class API (the import lands on it). */
  selectedApiId() {
    return this._selectedId && (this.model.apis ?? []).some((e) => e.id === this._selectedId) ? this._selectedId : null;
  }
  /** Reads the picked contract and hands it to the host (the import is a server call). */
  async onImportApiFile(e) {
    var s;
    const t = e.target, i = (s = t.files) == null ? void 0 : s[0];
    if (t.value = "", !i) return;
    const n = await i.text();
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: this.selectedApiId()
    });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), o = { ...n.nodes }, r = [];
    for (const { id: a, x: d, y: l } of t) {
      r.push({ kind: "move-node", view: i, id: a, pos: n.nodes[a] ?? null });
      let u = { x: d, y: l };
      const m = s.nodes.find((f) => f.id === a);
      if (m != null && m.parentId) {
        const f = s.nodes.find((y) => y.id === m.parentId);
        f && (u = { x: d - f.x, y: l - f.y });
      }
      o[a] = u;
    }
    if (this.writeViewLayout(i, { ...n, nodes: o }), i === "processes")
      for (const { id: a } of t) {
        const d = this.stepReorderCommand(a);
        if (d) {
          const l = this.inverseOf(d);
          l && r.unshift(...l), this.command(d, !1);
        }
      }
    this.pushUndoEntry(r);
  }
  onNodeResized(e) {
    var u;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((u = a.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...d.map((m) => ({ kind: "move-node", view: r, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const l = { ...a.nodes, [t]: { x: i, y: n } };
    for (const m of d) l[m.id] = { x: m.x - i, y: m.y - n };
    this.writeViewLayout(r, {
      ...a,
      nodes: l,
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
    const i = li(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
      const I = this.owningWorkflowOf(t), $ = this.owningWorkflowOf(i);
      if (!I || I !== $ || t === i) return;
      const E = I.steps.find((S) => S.id === i);
      if (((E == null ? void 0 : E.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: I.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = new Set((this.model.aiAgents ?? []).map((I) => I.id));
    if (o.has(t)) {
      if (new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (S) => S.agentId === t && S.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (S) => S.agentId === t && S.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((E) => E.id === i) && ((this.model.agentRags ?? []).some(
        (S) => S.agentId === t && S.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    const r = (this.model.rags ?? []).find((I) => I.id === t);
    if (r) {
      new Set(
        this.model.modules.flatMap(($) => ($.readModels ?? []).map((E) => E.id))
      ).has(i) && !(r.sourceReadModelIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some((I) => I.id === i)) return;
    if ((this.model.proxyApis ?? []).some((I) => I.id === t)) {
      const I = (this.model.proxyApis ?? []).find(($) => $.id === t);
      if ((this.model.apis ?? []).some(($) => $.id === i)) {
        I.targetApiId !== i && this.command({ kind: "set-proxy-target", id: t, targetId: i });
        return;
      }
      this.model.externalSystems.some(($) => $.id === i) && I.publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if ((this.model.apis ?? []).some((I) => I.id === t)) {
      this.model.externalSystems.some((I) => I.id === i) && (this.model.apis ?? []).find(($) => $.id === t).publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if (o.has(i)) return;
    const a = new Set((this.model.actors ?? []).map((I) => I.id));
    if (a.has(t)) {
      const I = new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ), $ = new Set(
        this.model.modules.flatMap((E) => (E.queryServices ?? []).map((S) => S.id))
      );
      if (I.has(i) || $.has(i)) {
        (this.model.actorUses ?? []).some(
          (S) => S.actorId === t && S.targetId === i
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aggregates ?? []).some((E) => E.id === i)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: i });
        return;
      }
      if (this.model.externalSystems.some((E) => E.id === i)) {
        (this.model.actorExternalDependencies ?? []).some(
          (S) => S.actorId === t && S.externalSystemId === i
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
    const l = this.model.externalSystems.flatMap((I) => I.useCases ?? []).find((I) => I.id === t), u = this.model.externalSystems.flatMap((I) => I.tables ?? []).find((I) => I.id === t);
    if (l || u) {
      const I = (l ?? u).name, $ = l ? { externalUseCaseId: t } : { externalTableId: t }, E = (K) => l ? K.sourceExternalUseCaseId === t : K.sourceExternalTableId === t, S = this.model.modules.flatMap((K) => K.readModels ?? []).find((K) => K.id === i);
      if (S) {
        (this.model.projections ?? []).some(
          (W) => E(W) && W.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(I)}-${z(S.name)}`,
          name: `${S.name}Projection`,
          ...$,
          targetId: i
        });
        return;
      }
      const Y = this.model.modules.find((K) => K.id === i);
      if (Y) {
        (this.model.projections ?? []).some(
          (W) => E(W) && W.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(I)}-${z(Y.name)}`,
          name: `${I}ViewProjection`,
          ...$,
          moduleId: i,
          readModelName: `${I}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((I) => I.id === t);
    if (m) {
      const I = this.model.modules.flatMap((E) => E.readModels ?? []).find((E) => E.id === i);
      if (I) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(m.name)}-${z(I.name)}`,
          name: `${I.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const $ = this.model.modules.find((E) => E.id === i);
      if ($) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.moduleId === i
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
      this.model.modules.flatMap((I) => (I.domainEvents ?? []).map(($) => $.id))
    ), y = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((I) => I.id),
      ...this.model.modules.flatMap((I) => (I.domainServices ?? []).map(($) => $.id))
    ]), x = new Set(
      this.model.modules.flatMap((I) => (I.applicationEvents ?? []).map(($) => $.id))
    ), b = new Set(this.model.modules.flatMap((I) => (I.useCases ?? []).map(($) => $.id))), N = new Set(
      this.model.modules.flatMap((I) => (I.queryServices ?? []).map(($) => $.id))
    );
    if (b.has(t) && N.has(i)) {
      (this.model.queryCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const v = new Set(
      this.model.externalSystems.flatMap((I) => (I.useCases ?? []).map(($) => $.id))
    );
    if (b.has(t) && v.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (b.has(t) && b.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (y.has(t) && f.has(i) || b.has(t) && x.has(i)) {
      (this.model.emissions ?? []).some(
        ($) => $.sourceId === t && $.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (f.has(t) || x.has(t)) {
      const I = x.has(t), $ = this.model.modules.flatMap((w) => (I ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === t), E = this.model.modules.flatMap((w) => (w.useCases ?? []).map((g) => ({ u: g, module: w }))).find(({ u: w }) => w.id === i), S = this.model.modules.flatMap((w) => (w.readModels ?? []).map((g) => ({ rm: g, module: w }))).find(({ rm: w }) => w.id === i), Y = this.model.modules.find((w) => w.id === i) ?? (S == null ? void 0 : S.module) ?? (E == null ? void 0 : E.module);
      if (!$ || !Y) return;
      const K = new Set((this.model.aggregates ?? []).map((w) => w.id)), W = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((g) => g.id))
      ), Z = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === t && (I ? b.has(w.sourceId) : K.has(w.sourceId) || W.has(w.sourceId))
      );
      if (!Z) {
        this.emit("modux-notice", {
          message: I ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const ie = !I && K.has(Z.sourceId);
      if (E) {
        if (this.model.flows.some(
          (g) => g.archetype === "TRIGGERS" && g.triggerEvent === $.name && g.targetUseCaseId === E.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z($.name)}-${z(E.u.name)}`,
          name: E.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: ie ? Z.sourceId : "",
          triggerDomainServiceId: !I && !ie ? Z.sourceId : void 0,
          triggerUseCaseId: I ? Z.sourceId : void 0,
          triggerEvent: $.name,
          targetId: Y.id,
          targetUseCaseId: E.u.id
        });
        return;
      }
      const p = (S == null ? void 0 : S.rm.name) ?? `${$.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === $.name && w.targetId === Y.id && w.readModelName === p
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${z($.name)}-${z(p)}`,
        name: p,
        archetype: "MATERIALIZES",
        triggerAggregateId: ie ? Z.sourceId : "",
        triggerDomainServiceId: !I && !ie ? Z.sourceId : void 0,
        triggerUseCaseId: I ? Z.sourceId : void 0,
        triggerEvent: $.name,
        targetId: Y.id,
        readModelName: p
      });
      return;
    }
    const R = /* @__PURE__ */ new Set([
      ...y,
      ...b,
      ...N,
      ...this.model.modules.flatMap((I) => (I.readModels ?? []).map(($) => $.id))
    ]);
    if (R.has(t) || R.has(i) || f.has(i) || x.has(i))
      return;
    const q = new Set(this.model.externalSystems.map((I) => I.id));
    if (q.has(t)) {
      if (new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((E) => E.id))
      ).has(i)) {
        (this.model.externalCalls ?? []).some(
          (E) => E.externalSystemId === t && E.useCaseId === i
        ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i });
        return;
      }
      if (q.has(i) && i !== t) {
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
    q.has(i) || a.has(i);
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
    const t = new Set(e.memberIds), i = this.model.modules.filter((d) => t.has(d.id)), n = new Set(i.map((d) => d.id)), s = this.model.externalSystems.filter((d) => t.has(d.id)), o = new Set(s.map((d) => d.id)), r = (this.model.aggregates ?? []).filter(
      (d) => t.has(d.id) || n.has(d.moduleId)
    ), a = new Set(r.map((d) => d.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: s,
      relations: this.model.relations.filter(
        (d) => n.has(d.sourceId) && n.has(d.targetId)
      ),
      flows: this.model.flows.filter(
        (d) => t.has(d.id) || (n.has(d.sourceId) || o.has(d.sourceId)) && (n.has(d.targetId) || o.has(d.targetId))
      ),
      aggregates: r,
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
    const t = e.detail.kind === "process-step" ? $d(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Id(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, n, s, o, r, a, d, l, u, m, f, y, x, b, N, v, R, q, I, $, E, S, Y, K, W, Z, ie, p, h, w;
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
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const g = (t = (this.model.apis ?? []).find((k) => k.id === this._selectedId)) == null ? void 0 : t.id, _ = this._newApiId || g || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id);
          if (!_) return;
          this.command({
            kind: "add-api-operation",
            apiId: _,
            id: `apiop-${_.replace(/^api-/, "")}-${z(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const g = (s = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : s.id, _ = this._newModuleId || g || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!_) return;
          this.command({ kind: "add-domain-event", id: `ev-${z(e)}`, name: e, moduleId: _ });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const g = (r = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : r.id, _ = this._newModuleId || g || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!_) return;
          this.command({ kind: "add-application-event", id: `aev-${z(e)}`, name: e, moduleId: _ });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const g = (d = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : d.id, _ = this._newModuleId || g || ((l = this.model.modules[0]) == null ? void 0 : l.id);
          if (!_) return;
          this.command({ kind: "add-domain-service", id: `ds-${z(e)}`, name: e, moduleId: _ });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const g = (u = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : u.id, _ = this._newModuleId || g || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!_) return;
          this.command({ kind: "add-query-service", id: `qs-${z(e)}`, name: e, moduleId: _ });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const g = (f = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : f.id, _ = this._newModuleId || g || ((y = this.model.modules[0]) == null ? void 0 : y.id);
          if (!_) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: _ });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const g = (x = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : x.id, _ = this._newModuleId || g || ((b = this.model.modules[0]) == null ? void 0 : b.id);
          if (!_) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: _, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const g = (N = this.model.externalSystems.find((k) => k.id === this._selectedId)) == null ? void 0 : N.id, _ = this._newExternalId || g || ((v = this.model.externalSystems[0]) == null ? void 0 : v.id);
          if (!_) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${z(e)}`,
            name: e,
            moduleId: _
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const g = (R = this.model.externalSystems.find((k) => k.id === this._selectedId)) == null ? void 0 : R.id, _ = this._newExternalId || g || ((q = this.model.externalSystems[0]) == null ? void 0 : q.id);
          if (!_) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${z(e)}`,
            name: e,
            moduleId: _
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const g = (I = (this.model.aggregates ?? []).find((k) => k.id === this._selectedId)) == null ? void 0 : I.id, _ = this._newAggregateId || g || ((E = ($ = this.model.aggregates) == null ? void 0 : $[0]) == null ? void 0 : E.id);
          if (!_) return;
          this.command({ kind: "add-read-model", id: `rm-${z(e)}`, name: e, aggregateId: _ });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${z(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const g = this._newModuleId || ((S = this.model.modules[0]) == null ? void 0 : S.id);
        if (!g) return;
        this.command({ kind: "add-aggregate", id: `agg-${z(e)}`, name: e, moduleId: g });
      } else if (this._view === "flows") {
        const g = this._newTriggerAggId || ((K = (Y = this.model.aggregates) == null ? void 0 : Y[0]) == null ? void 0 : K.id), _ = this._newTargetId || ((W = this.model.modules[0]) == null ? void 0 : W.id), k = this._newTriggerEvent.trim();
        if (!g || !_ || !k) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: g,
          triggerEvent: k,
          targetId: _
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const g = this._newModuleId || ((Z = this.model.modules[0]) == null ? void 0 : Z.id);
        if (!g) return;
        this.command({
          kind: "add-process",
          id: `proc-${z(e)}`,
          name: e,
          moduleId: g,
          triggerAggregateId: this._newTriggerAggId || ((p = (ie = this.model.aggregates) == null ? void 0 : ie[0]) == null ? void 0 : p.id),
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
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Yn(i, t.nodes) : e === "flows" ? ns(i, t.nodes) : e === "processes" ? li(i, t.nodes) : e === "workflows" ? md(i, t.nodes) : e === "eventstorming" ? ad(i, t.nodes) : Hn(i, t.nodes, this._detail, t.sizes ?? {});
    if (this.diff)
      for (const s of n.nodes) {
        const o = this.diff[s.id] ?? this.diff[s.id.replace(/^(tgt:|flow:)/, "")];
        o && (s.diffKind = o);
      }
    return n;
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((l) => !l.parentId), n = new Set(i.map((l) => l.id)), s = {
      nodes: i,
      edges: t.edges.filter((l) => n.has(l.sourceId) && n.has(l.targetId))
    }, r = await gd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((l) => ({
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
  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  refocusCanvasAfterControl(e) {
    var s;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (s = this.renderRoot.querySelector("modux-canvas")) == null || s.focus();
  }
  render() {
    const e = this.sceneFor(this._view);
    return C`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <div class="tabs">
          ${_d.map(
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
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._newContextMapKind === "rag" ? "Nuevo RAG…" : this._newContextMapKind === "api" ? "Nueva API…" : this._newContextMapKind === "proxy-api" ? "Nuevo proxy API…" : this._detail === "contexts" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : this._newContextMapKind === "policy" ? "Nueva policy…" : this._newContextMapKind === "use-case" ? "Nuevo caso de uso…" : this._newContextMapKind === "query-service" ? "Nuevo query service…" : this._newContextMapKind === "external-use-case" ? "Nuevo caso de uso externo…" : this._newContextMapKind === "external-table" ? "Nueva tabla externa…" : this._newContextMapKind === "api-operation" ? "Nueva operación de API…" : "Nuevo read model…",
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
              ${this._detail !== "contexts" ? C`
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
        ${this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table") ? C`<select
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
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "api-operation" ? C`<select
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
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "read-model" ? C`<select
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
              ${xd.map(
      (t) => C`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? C`<select
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
        <input
          type="file"
          hidden
          accept=".json,.yaml,.yml,.wsdl,.xml"
          @change=${this.onImportApiFile}
        />
        <button
          class="tab"
          ?hidden=${this._view !== "context-map"}
          title=${this.selectedApiId() ? "Importa un OpenAPI/WSDL sobre la API seleccionada (operaciones y modelos rq/rs)" : "Importa un OpenAPI/WSDL como una nueva API del diagrama"}
          @click=${(t) => t.currentTarget.previousElementSibling.click()}
        >
          ⇪ Importar API${this.selectedApiId() ? " aquí" : "…"}
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
          title="Nivel de detalle: contextos, sus agregados y casos de uso, o las operaciones de las APIs"
          .value=${this._detail}
          @change=${(t) => this.setDetail(
      t.target.value
    )}
        >
          <option value="contexts" ?selected=${this._detail === "contexts"}>Contextos</option>
          <option value="detail" ?selected=${this._detail === "detail"}>
            Agregados y casos de uso
          </option>
          <option value="operations" ?selected=${this._detail === "operations"}>
            APIs y operaciones
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
        @node-proxy-requested=${this.onNodeProxyRequested}
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
        ${this._view === "context-map" ? C`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
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
        ${vd.map(
      (n) => C`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${jt[n].abbr}</span>
              <span class="name">${jt[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
L.styles = Jt`
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
U([
  pe({ attribute: !1 })
], L.prototype, "model", 2);
U([
  pe({ attribute: !1 })
], L.prototype, "layout", 2);
U([
  pe({ attribute: !1 })
], L.prototype, "diff", 2);
U([
  M()
], L.prototype, "_view", 2);
U([
  M()
], L.prototype, "_detail", 2);
U([
  M()
], L.prototype, "_relationType", 2);
U([
  M()
], L.prototype, "_relationPicker", 2);
U([
  M()
], L.prototype, "_selectedId", 2);
U([
  M()
], L.prototype, "_newName", 2);
U([
  M()
], L.prototype, "_newSubdomain", 2);
U([
  M()
], L.prototype, "_newModuleId", 2);
U([
  M()
], L.prototype, "_newContextMapKind", 2);
U([
  M()
], L.prototype, "_newAggregateId", 2);
U([
  M()
], L.prototype, "_newExternalId", 2);
U([
  M()
], L.prototype, "_newApiId", 2);
U([
  M()
], L.prototype, "_newArchetype", 2);
U([
  M()
], L.prototype, "_newTriggerAggId", 2);
U([
  M()
], L.prototype, "_newTriggerEvent", 2);
U([
  M()
], L.prototype, "_newTargetId", 2);
U([
  M()
], L.prototype, "_undoStack", 2);
U([
  M()
], L.prototype, "_redoStack", 2);
U([
  M()
], L.prototype, "_newStepName", 2);
U([
  M()
], L.prototype, "_newStepType", 2);
U([
  M()
], L.prototype, "_newStepRole", 2);
U([
  M()
], L.prototype, "_newStepDeadline", 2);
U([
  M()
], L.prototype, "_editStepRole", 2);
U([
  M()
], L.prototype, "_editStepDeadline", 2);
U([
  M()
], L.prototype, "_editStepComp", 2);
U([
  M()
], L.prototype, "_newStepUseCase", 2);
U([
  M()
], L.prototype, "_newStepEmits", 2);
U([
  M()
], L.prototype, "_editStepUseCase", 2);
U([
  M()
], L.prototype, "_editStepEmits", 2);
U([
  M()
], L.prototype, "_editStepAwaits", 2);
U([
  M()
], L.prototype, "_multi", 2);
U([
  M()
], L.prototype, "_newViewName", 2);
U([
  M()
], L.prototype, "_activeViewId", 2);
U([
  M()
], L.prototype, "_newRagSourceType", 2);
U([
  M()
], L.prototype, "_newRagSourceUri", 2);
U([
  M()
], L.prototype, "_addMemberKey", 2);
U([
  M()
], L.prototype, "_deletePicker", 2);
L = U([
  ti("modux-editor")
], L);
var bd = Object.defineProperty, kd = Object.getOwnPropertyDescriptor, de = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? kd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && bd(t, i, s), s;
};
let se = class extends Se {
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
  /** An OpenAPI/WSDL upload from the editor: operations (and rq/rs models) land in the store. */
  async onImportApi(e) {
    const { content: t, fileName: i, apiId: n } = e.detail;
    await this.trackWrite(async () => {
      try {
        const s = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!s.ok) {
          let a = `El servidor rechazó el contrato (${s.status})`;
          try {
            const d = await s.json();
            d != null && d.message && (a = d.message);
          } catch {
          }
          this.showToast(a);
          return;
        }
        const { apiId: o } = await s.json(), r = await fetch(`${this.base}/model`);
        r.ok && (this._model = await r.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${o}`, "info");
      } catch (s) {
        this.showToast(String(s));
      }
    });
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
            const o = await i.json();
            o != null && o.message && (s = o.message);
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
        @modux-import-api=${this.onImportApi}
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
se.styles = Jt`
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
de([
  pe()
], se.prototype, "base", 2);
de([
  M()
], se.prototype, "_model", 2);
de([
  M()
], se.prototype, "_layout", 2);
de([
  M()
], se.prototype, "_error", 2);
de([
  M()
], se.prototype, "_saving", 2);
de([
  M()
], se.prototype, "_toast", 2);
de([
  M()
], se.prototype, "_workspace", 2);
de([
  M()
], se.prototype, "_creatingSolution", 2);
de([
  M()
], se.prototype, "_newSolutionName", 2);
de([
  M()
], se.prototype, "_diff", 2);
de([
  M()
], se.prototype, "_mergeFlow", 2);
se = de([
  ti("modux-editor-connected")
], se);
export {
  Ed as CONTAINER_HEADER,
  Sd as CONTAINER_INSET,
  X as ModuxCanvas,
  L as ModuxEditor,
  se as ModuxEditorConnected,
  Yn as aggregatesScene,
  En as containerFit,
  kn as containerMinSize,
  Hn as contextMapScene,
  Rn as flowCoherence,
  ns as flowsScene,
  Sn as normalizeViewLayout,
  li as processesScene,
  Tn as relationEdgeId
};
