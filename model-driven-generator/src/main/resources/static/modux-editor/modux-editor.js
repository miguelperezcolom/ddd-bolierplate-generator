const Sd = 34, Ad = 10;
function Cn(e, t = { w: 160, h: 90 }) {
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
function zt(e, t, i) {
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
function Mn(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const Nn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Pn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Tn = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ve = 168, Ke = 56, Wi = 34, Bi = 14, Rn = 14, ge = 108, we = 32, Gi = 12, Yi = 10, Xe = 2, On = Xe * ge + (Xe - 1) * Gi + 2 * Bi;
function Ln(e, t) {
  return `rel:${e}->${t}`;
}
function Un(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function at(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Dn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, ji = {
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
}, Xi = {
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
function qt(e) {
  const t = Math.max(1, Math.ceil(e / Xe)), i = t * we + (t - 1) * Yi;
  return { w: On, h: Wi + i + Rn };
}
function pt(e, t) {
  const i = e % Xe, n = Math.floor(e / Xe);
  return {
    x: -t.w / 2 + Bi + i * (ge + Gi) + ge / 2,
    y: -t.h / 2 + Wi + n * (we + Yi) + we / 2
  };
}
function zn(e, t, i, n, s, o) {
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
  return a.length ? Ht(i, n, a, s, o) : [{ ...n, x: i.x, y: i.y, w: Ve, h: Ke }];
}
function qn(e, t, i, n, s, o) {
  const r = o[t.id] ?? qt(i.length + n.length), a = i.map((h, m) => {
    const w = s[h.id] ?? pt(m, r), _ = h.operations ?? [], I = o[h.id] ?? qt(_.length), A = _.map((T, D) => s[T.id] ?? pt(D, I)), v = zt(
      { x: w.x, y: w.y },
      I,
      A.map((T) => ({ dx: T.x, dy: T.y, w: ge, h: we }))
    );
    return { a: h, off: w, ops: _, opOffs: A, fit: v };
  }), d = n.map(
    (h, m) => s[h.id] ?? pt(i.length + m, r)
  ), l = zt(e, r, [
    ...a.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...d.map((h) => ({ dx: h.x, dy: h.y, w: ge, h: we }))
  ]), c = [
    { ...t, x: l.x, y: l.y, w: l.w, h: l.h, container: !0 }
  ];
  for (const h of a)
    c.push({
      id: h.a.id,
      label: h.a.name,
      kind: "api",
      symbol: "interface",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      badge: "API",
      container: !0,
      parentId: t.id,
      x: e.x + h.fit.x,
      y: e.y + h.fit.y,
      w: h.fit.w,
      h: h.fit.h,
      tooltip: `${h.a.name} — API publicada por ${t.label}`
    }), h.ops.forEach((m, w) => {
      c.push({
        id: m.id,
        label: m.name,
        kind: "api-operation",
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[w].x,
        y: e.y + h.off.y + h.opOffs[w].y,
        w: ge,
        h: we,
        tooltip: `Operación de API ${m.name}`
      });
    });
  return n.forEach((h, m) => {
    const w = ji[h.kind];
    c.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + d[m].x,
      y: e.y + d[m].y,
      w: ge,
      h: we,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${Xi[h.kind]} ${h.name}`
    });
  }), c;
}
function Ht(e, t, i, n, s) {
  const o = s[t.id] ?? qt(i.length), r = i.map((c, h) => n[c.id] ?? pt(h, o)), a = zt(
    e,
    o,
    r.map((c) => ({ dx: c.x, dy: c.y, w: ge, h: we }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, l = i.map((c, h) => {
    const m = r[h], w = c.policy ? Dn : ji[c.kind];
    return {
      id: c.id,
      label: c.name,
      kind: c.kind,
      x: e.x + m.x,
      y: e.y + m.y,
      w: ge,
      h: we,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${c.policy ? "Policy" : Xi[c.kind]} ${c.name}`
    };
  });
  return [d, ...l];
}
function Hn(e, t, i = "contexts", n = {}) {
  const s = i !== "contexts", o = i === "operations", r = new Set(e.externalSystems.map((u) => u.id)), a = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && r.has(u.publishedByExternalSystemId)
  ), d = new Set(a.map((u) => u.id)), l = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && r.has(u.publishedByExternalSystemId)
  ), c = new Set(l.map((u) => u.id)), h = [
    ...e.modules.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((u) => !d.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((u) => !c.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 }))
  ], m = h.flatMap((u, E) => {
    const M = t[u.ref.id] ?? at(E, h.length);
    if (u.proxy) {
      const H = u.ref;
      return [{
        id: H.id,
        label: H.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${H.name} — proxy/cache de una API, consumible como ella`,
        x: M.x,
        y: M.y,
        w: Ve,
        h: Ke
      }];
    }
    if (u.api) {
      const H = u.ref, X = {
        id: H.id,
        label: H.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${H.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return s && H.operations.length > 0 ? Ht(
        M,
        X,
        H.operations.map(
          (G) => ({ id: G.id, name: G.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{ ...X, x: M.x, y: M.y, w: Ve, h: Ke }];
    }
    if (u.external) {
      const H = u.ref, X = {
        id: H.id,
        label: H.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${H.name} (sistema externo)`
      }, G = a.filter((F) => F.publishedByExternalSystemId === H.id), fe = [
        ...l.filter((F) => F.publishedByExternalSystemId === H.id).map((F) => ({ id: F.id, name: F.name, kind: "proxy-api" })),
        ...s ? [
          ...(H.useCases ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-use-case" })
          ),
          ...(H.tables ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-table" })
          )
        ] : []
      ];
      if (o && G.length > 0)
        return qn(
          M,
          X,
          G,
          fe,
          t,
          n
        );
      const ze = [
        ...G.map((F) => ({ id: F.id, name: F.name, kind: "api" })),
        ...fe
      ];
      return ze.length > 0 ? Ht(M, X, ze, t, n) : [{ ...X, x: M.x, y: M.y, w: Ve, h: Ke }];
    }
    const L = u.ref, j = L.subdomainType ?? "GENERIC", V = {
      id: L.id,
      label: L.name,
      kind: "module",
      symbol: "component",
      fill: Nn[j],
      stroke: "#94a3b8",
      badge: j,
      tooltip: `${L.name} — subdominio ${j}`
    };
    return s ? zn(e, L, M, V, t, n) : [{ ...V, x: M.x, y: M.y, w: Ve, h: Ke }];
  }), w = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length;
  (e.actors ?? []).forEach((u, E) => {
    const M = t[u.id] ?? at(h.length + E, w);
    m.push({
      id: u.id,
      label: u.name,
      x: M.x,
      y: M.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${u.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((u, E) => {
    const M = t[u.id] ?? at(h.length + (e.actors ?? []).length + E, w);
    m.push({
      id: u.id,
      label: u.name,
      x: M.x,
      y: M.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${u.name} (agente de IA — consume por MCP)`
    });
  });
  const _ = [];
  (e.rags ?? []).forEach((u, E) => {
    const M = t[u.id] ?? at(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + E,
      w
    );
    m.push({
      id: u.id,
      label: u.name,
      x: M.x,
      y: M.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${u.name} (base de conocimiento — retrieval para agentes)`
    }), (u.contentSources ?? []).forEach((L, j) => {
      const V = `ragcs:${u.id}:${L.uri}`, H = t[V] ?? { x: M.x + 170, y: M.y - 30 + j * 44 };
      m.push({
        id: V,
        label: L.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: H.x,
        y: H.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: L.type,
        tooltip: `${L.type}: ${L.uri}`
      }), _.push({
        id: `ragcse:${u.id}:${L.uri}`,
        sourceId: V,
        targetId: u.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), m.sort((u, E) => (u.parentId ? 1 : 0) - (E.parentId ? 1 : 0));
  const I = e.relations.map((u) => ({
    id: Ln(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? Pn[u.type] : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), A = e.flows.map((u) => {
    var H, X, G, se, fe, ze;
    const E = Un(e, u), M = s ? e.modules.find((F) => F.id === u.sourceId) : void 0, L = ((H = M == null ? void 0 : M.domainEvents) == null ? void 0 : H.find((F) => F.name === u.triggerEvent)) ?? ((X = M == null ? void 0 : M.applicationEvents) == null ? void 0 : X.find((F) => F.name === u.triggerEvent)), j = s && u.readModelName ? (se = (G = e.modules.find((F) => F.id === u.targetId)) == null ? void 0 : G.readModels) == null ? void 0 : se.find((F) => F.name === u.readModelName) : void 0, V = s && u.targetUseCaseId ? (ze = (fe = e.modules.find((F) => F.id === u.targetId)) == null ? void 0 : fe.useCases) == null ? void 0 : ze.find((F) => F.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (L == null ? void 0 : L.id) ?? u.sourceId,
      targetId: (V == null ? void 0 : V.id) ?? (j == null ? void 0 : j.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: Tn[E],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${E}`
    };
  }), v = new Set(m.map((u) => u.id)), T = s ? (e.emissions ?? []).filter((u) => v.has(u.sourceId) && v.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], D = s ? (e.projections ?? []).map((u) => ({
    p: u,
    source: u.sourceAggregateId ?? u.sourceExternalUseCaseId ?? u.sourceExternalTableId
  })).filter(({ p: u, source: E }) => E && u.readModelId).filter(({ p: u, source: E }) => v.has(E) && v.has(u.readModelId)).map(({ p: u, source: E }) => ({
    id: `proj:${u.id}`,
    sourceId: E,
    targetId: u.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: u.sourceAggregateId ? `Proyección ${u.name}: el estado del agregado se materializa en ${u.readModelName ?? u.readModelId}` : `Proyección ${u.name}: polling hacia ${u.readModelName ?? u.readModelId}`
  })) : [], $ = (e.apis ?? []).flatMap(
    (u) => u.operations.flatMap((E) => {
      const M = s && v.has(E.id) ? E.id : u.id;
      if (!v.has(M)) return [];
      const L = s && E.targetUseCaseId && v.has(E.targetUseCaseId) ? E.targetUseCaseId : E.targetModuleId && v.has(E.targetModuleId) ? E.targetModuleId : (E.targetUseCaseId && !s, null);
      return L ? [
        {
          id: `apiwire:${E.id}`,
          sourceId: M,
          targetId: L,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${E.name} la implementa ${L}`
        }
      ] : [];
    })
  ), b = s ? (e.useCaseCalls ?? []).filter((u) => v.has(u.sourceId) && v.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], S = s ? (e.queryCalls ?? []).filter((u) => v.has(u.sourceId) && v.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], C = s ? (e.actorUses ?? []).filter((u) => v.has(u.actorId) && v.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], Y = (e.actorExternalDependencies ?? []).filter((u) => v.has(u.actorId) && v.has(u.externalSystemId)).map((u) => ({
    id: `extdep:${u.actorId}->${u.externalSystemId}`,
    sourceId: u.actorId,
    targetId: u.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), K = new Map([
    ...(e.apis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId])
  ]), W = (u) => v.has(u) ? u : K.get(u) ?? u, J = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((u) => ({ sourceId: u.sourceId, targetId: W(u.targetId) })).filter(
        (u) => v.has(u.sourceId) && v.has(u.targetId) && u.sourceId !== u.targetId
      ).map((u) => [
        `xdep:${u.sourceId}->${u.targetId}`,
        {
          id: `xdep:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "ext-dep",
          color: "#64748b",
          dashed: !0,
          arrow: !0,
          tooltip: "depende de"
        }
      ])
    ).values()
  ], te = [
    ...new Map(
      (e.proxyApis ?? []).filter((u) => u.targetApiId).map((u) => ({ sourceId: W(u.id), targetId: W(u.targetApiId) })).filter(
        (u) => v.has(u.sourceId) && v.has(u.targetId) && u.sourceId !== u.targetId
      ).map((u) => [
        `pxt:${u.sourceId}->${u.targetId}`,
        {
          id: `pxt:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "proxy-target",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: "proxy/cache de"
        }
      ])
    ).values()
  ], f = s ? (e.agentUses ?? []).filter((u) => v.has(u.agentId) && v.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], p = (e.agentRags ?? []).filter((u) => v.has(u.agentId) && v.has(u.ragId)).map((u) => ({
    id: `agrag:${u.agentId}->${u.ragId}`,
    sourceId: u.agentId,
    targetId: u.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), y = s ? (e.rags ?? []).filter((u) => v.has(u.id)).flatMap(
    (u) => (u.sourceReadModelIds ?? []).filter((E) => v.has(E)).map((E) => ({
      id: `ragsrc:${u.id}->${E}`,
      sourceId: u.id,
      targetId: E,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name} indexa este read model`
    }))
  ) : [], g = s ? (e.agentExternalUses ?? []).filter((u) => v.has(u.agentId) && v.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], x = s ? (e.externalCalls ?? []).filter((u) => v.has(u.externalSystemId) && v.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], k = s ? (e.externalUseCaseCalls ?? []).filter((u) => v.has(u.sourceId) && v.has(u.targetId)).map((u) => ({
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
    nodes: m,
    edges: [
      ...I,
      ...A,
      ...T,
      ...D,
      ...$,
      ...b,
      ...S,
      ...C,
      ...Y,
      ...J,
      ...te,
      ...f,
      ...g,
      ...p,
      ...y,
      ..._,
      ...x,
      ...k
    ]
  };
}
const Fn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Vn = 176, Kn = 60, Wn = 140, Bn = 40;
function Gn(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((d) => d.moduleId === s.id).forEach((d, l) => {
      const c = n.filter((m) => m.aggregateId === d.id).length, h = 140 + l * (170 + c * 60);
      t[d.id] = { x: r, y: h }, n.filter((m) => m.aggregateId === d.id).forEach((m, w) => {
        t[m.id] = { x: r + 60, y: h + 100 + w * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Yn(e, t) {
  const i = Gn(e), n = (l) => t[l] ?? i[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), o = (e.aggregates ?? []).map((l) => {
    const c = s.get(l.moduleId), h = (c == null ? void 0 : c.subdomainType) ?? "GENERIC", m = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: m.x,
      y: m.y,
      w: Vn,
      h: Kn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Fn[h],
      stroke: "#64748b",
      badge: c ? `${c.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${c ? ` — módulo ${c.name} (${h})` : ""}`
    };
  }), r = (e.entities ?? []).map((l) => {
    const c = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: c.x,
      y: c.y,
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
    return ((l = (d = e.aggregates) == null ? void 0 : d.find((c) => c.id === a)) == null ? void 0 : l.name) ?? a ?? "?";
  };
  return i.forEach((a, d) => {
    const l = 120 + d * 130, c = jn[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const A = t[h] ?? { x: 160, y: l };
      n.push({
        id: h,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : h,
        x: A.x,
        y: A.y,
        w: Xn,
        h: Zn,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const m = `flow:${a.id}`, w = t[m] ?? { x: 470, y: l };
    n.push({
      id: m,
      label: a.name,
      x: w.x,
      y: w.y,
      w: Jn,
      h: Qn,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: c,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const _ = is(e, a), I = `tgt:${_.id}`;
    if (!o.has(I)) {
      o.add(I);
      const A = t[I] ?? { x: 790, y: l };
      n.push({
        id: I,
        label: _.label,
        x: A.x,
        y: A.y,
        w: es,
        h: ts,
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
      targetId: I,
      kind: "flow-delivery",
      color: c,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const ss = 190, os = 56, Nt = 170, rs = 52;
function ui(e, t) {
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
    if (o.steps.forEach((c, h) => {
      const m = c.type === "HUMAN", w = t[c.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (i.push({
        id: c.id,
        label: c.name,
        x: w.x,
        y: w.y,
        w: Nt,
        h: rs,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${c.roleId ? ` · ${c.roleId}` : ""}${c.deadline ? ` · ⏱ ${c.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${c.name}${c.useCaseId ? ` — use case ${c.useCaseId}` : ""}${c.deadline ? ` · deadline ${c.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${h}`,
        sourceId: l,
        targetId: c.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), c.compensationUseCaseId) {
        const _ = `comp:${c.id}`, I = t[_] ?? { x: w.x, y: w.y + 90 };
        i.push({
          id: _,
          label: c.compensationUseCaseId,
          x: I.x,
          y: I.y,
          w: Nt,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${c.id}`,
          sourceId: c.id,
          targetId: _,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      l = c.id;
    }), o.onCompletionEventName) {
      const c = `done:${o.id}`, h = t[c] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: c,
        label: o.onCompletionEventName,
        x: h.x,
        y: h.y,
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
        targetId: c,
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
const ft = globalThis, Jt = ft.ShadowRoot && (ft.ShadyCSS === void 0 || ft.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qt = Symbol(), hi = /* @__PURE__ */ new WeakMap();
let Zi = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Qt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Jt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = hi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && hi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const as = (e) => new Zi(typeof e == "string" ? e : e + "", void 0, Qt), ei = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Zi(i, e, Qt);
}, ds = (e, t) => {
  if (Jt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = ft.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, pi = Jt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return as(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ls, defineProperty: cs, getOwnPropertyDescriptor: us, getOwnPropertyNames: hs, getOwnPropertySymbols: ps, getPrototypeOf: fs } = Object, Ie = globalThis, fi = Ie.trustedTypes, ms = fi ? fi.emptyScript : "", Pt = Ie.reactiveElementPolyfillSupport, Ge = (e, t) => e, vt = { toAttribute(e, t) {
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
} }, ti = (e, t) => !ls(e, t), mi = { attribute: !0, type: String, converter: vt, reflect: !1, useDefault: !1, hasChanged: ti };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ie.litPropertyMetadata ?? (Ie.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Te = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = mi) {
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
    return this.elementProperties.get(t) ?? mi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ge("elementProperties"))) return;
    const t = fs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ge("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ge("properties"))) {
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
      for (const s of n) i.unshift(pi(s));
    } else t !== void 0 && i.push(pi(t));
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
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? ti)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
Te.elementStyles = [], Te.shadowRootOptions = { mode: "open" }, Te[Ge("elementProperties")] = /* @__PURE__ */ new Map(), Te[Ge("finalized")] = /* @__PURE__ */ new Map(), Pt == null || Pt({ ReactiveElement: Te }), (Ie.reactiveElementVersions ?? (Ie.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = globalThis, gi = (e) => e, xt = Ye.trustedTypes, wi = xt ? xt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ji = "$lit$", _e = `lit$${Math.random().toFixed(9).slice(2)}$`, Qi = "?" + _e, gs = `<${Qi}>`, Me = document, Ze = () => Me.createComment(""), Je = (e) => e === null || typeof e != "object" && typeof e != "function", ii = Array.isArray, ws = (e) => ii(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Tt = `[ 	
\f\r]`, qe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yi = /-->/g, vi = />/g, $e = RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xi = /'/g, _i = /"/g, en = /^(?:script|style|textarea|title)$/i, tn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), N = tn(1), z = tn(2), Oe = Symbol.for("lit-noChange"), Q = Symbol.for("lit-nothing"), Ii = /* @__PURE__ */ new WeakMap(), ke = Me.createTreeWalker(Me, 129);
function nn(e, t) {
  if (!ii(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wi !== void 0 ? wi.createHTML(t) : t;
}
const ys = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = qe;
  for (let a = 0; a < i; a++) {
    const d = e[a];
    let l, c, h = -1, m = 0;
    for (; m < d.length && (r.lastIndex = m, c = r.exec(d), c !== null); ) m = r.lastIndex, r === qe ? c[1] === "!--" ? r = yi : c[1] !== void 0 ? r = vi : c[2] !== void 0 ? (en.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = $e) : c[3] !== void 0 && (r = $e) : r === $e ? c[0] === ">" ? (r = s ?? qe, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? $e : c[3] === '"' ? _i : xi) : r === _i || r === xi ? r = $e : r === yi || r === vi ? r = qe : (r = $e, s = void 0);
    const w = r === $e && e[a + 1].startsWith("/>") ? " " : "";
    o += r === qe ? d + gs : h >= 0 ? (n.push(l), d.slice(0, h) + Ji + d.slice(h) + _e + w) : d + _e + (h === -2 ? a : w);
  }
  return [nn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Qe {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [l, c] = ys(t, i);
    if (this.el = Qe.createElement(l, n), ke.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = ke.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ji)) {
          const m = c[r++], w = s.getAttribute(h).split(_e), _ = /([.?@])?(.*)/.exec(m);
          d.push({ type: 1, index: o, name: _[2], strings: w, ctor: _[1] === "." ? xs : _[1] === "?" ? _s : _[1] === "@" ? Is : St }), s.removeAttribute(h);
        } else h.startsWith(_e) && (d.push({ type: 6, index: o }), s.removeAttribute(h));
        if (en.test(s.tagName)) {
          const h = s.textContent.split(_e), m = h.length - 1;
          if (m > 0) {
            s.textContent = xt ? xt.emptyScript : "";
            for (let w = 0; w < m; w++) s.append(h[w], Ze()), ke.nextNode(), d.push({ type: 2, index: ++o });
            s.append(h[m], Ze());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Qi) d.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(_e, h + 1)) !== -1; ) d.push({ type: 7, index: o }), h += _e.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Me.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Le(e, t, i = e, n) {
  var r, a;
  if (t === Oe) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = Je(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Le(e, s._$AS(e, t.values), s, n)), t;
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Me).importNode(i, !0);
    ke.currentNode = s;
    let o = ke.nextNode(), r = 0, a = 0, d = n[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let l;
        d.type === 2 ? l = new st(o, o.nextSibling, this, t) : d.type === 1 ? l = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (l = new $s(o, this, t)), this._$AV.push(l), d = n[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = ke.nextNode(), r++);
    }
    return ke.currentNode = Me, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class st {
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
    t = Le(this, t, i), Je(t) ? t === Q || t == null || t === "" ? (this._$AH !== Q && this._$AR(), this._$AH = Q) : t !== this._$AH && t !== Oe && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ws(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Q && Je(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Me.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Qe.createElement(nn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new vs(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = Ii.get(t.strings);
    return i === void 0 && Ii.set(t.strings, i = new Qe(t)), i;
  }
  k(t) {
    ii(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new st(this.O(Ze()), this.O(Ze()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = gi(t).nextSibling;
      gi(t).remove(), t = s;
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
    if (o === void 0) t = Le(this, t, i, 0), r = !Je(t) || t !== this._$AH && t !== Oe, r && (this._$AH = t);
    else {
      const a = t;
      let d, l;
      for (t = o[0], d = 0; d < o.length - 1; d++) l = Le(this, a[n + d], i, d), l === Oe && (l = this._$AH[d]), r || (r = !Je(l) || l !== this._$AH[d]), l === Q ? t = Q : t !== Q && (t += (l ?? "") + o[d + 1]), this._$AH[d] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === Q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xs extends St {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Q ? void 0 : t;
  }
}
class _s extends St {
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
    if ((t = Le(this, t, i, 0) ?? Q) === Oe) return;
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
    Le(this, t);
  }
}
const Rt = Ye.litHtmlPolyfillSupport;
Rt == null || Rt(Qe, st), (Ye.litHtmlVersions ?? (Ye.litHtmlVersions = [])).push("3.3.3");
const bs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new st(t.insertBefore(Ze(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = globalThis;
class Ae extends Te {
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
    return Oe;
  }
}
var Ki;
Ae._$litElement$ = !0, Ae.finalized = !0, (Ki = Se.litElementHydrateSupport) == null || Ki.call(Se, { LitElement: Ae });
const Ot = Se.litElementPolyfillSupport;
Ot == null || Ot({ LitElement: Ae });
(Se.litElementVersions ?? (Se.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ni = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ks = { attribute: !0, type: String, converter: vt, reflect: !1, hasChanged: ti }, Es = (e = ks, t, i) => {
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
function he(e) {
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
function P(e) {
  return he({ ...e, state: !0, attribute: !1 });
}
var Ft = "http://www.w3.org/1999/xhtml";
const $i = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ft,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function At(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), $i.hasOwnProperty(t) ? { space: $i[t], local: e } : e;
}
function Ss(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ft && t.documentElement.namespaceURI === Ft ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function As(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function sn(e) {
  var t = At(e);
  return (t.local ? As : Ss)(t);
}
function Cs() {
}
function si(e) {
  return e == null ? Cs : function() {
    return this.querySelector(e);
  };
}
function Ms(e) {
  typeof e != "function" && (e = si(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), d, l, c = 0; c < r; ++c)
      (d = o[c]) && (l = e.call(d, d.__data__, c, o)) && ("__data__" in d && (l.__data__ = d.__data__), a[c] = l);
  return new oe(n, this._parents);
}
function Ns(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Ps() {
  return [];
}
function on(e) {
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
  typeof e == "function" ? e = Ts(e) : e = on(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && (n.push(e.call(d, d.__data__, l, r)), s.push(d));
  return new oe(n, s);
}
function rn(e) {
  return function() {
    return this.matches(e);
  };
}
function an(e) {
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
  return this.select(e == null ? Us : Ls(typeof e == "function" ? e : an(e)));
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
function Fs(e) {
  return this.selectAll(e == null ? qs : Hs(typeof e == "function" ? e : an(e)));
}
function Vs(e) {
  typeof e != "function" && (e = rn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new oe(n, this._parents);
}
function dn(e) {
  return new Array(e.length);
}
function Ks() {
  return new oe(this._enter || this._groups.map(dn), this._parents);
}
function _t(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
_t.prototype = {
  constructor: _t,
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
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new _t(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function Gs(e, t, i, n, s, o, r) {
  var a, d, l = /* @__PURE__ */ new Map(), c = t.length, h = o.length, m = new Array(c), w;
  for (a = 0; a < c; ++a)
    (d = t[a]) && (m[a] = w = r.call(d, d.__data__, a, t) + "", l.has(w) ? s[a] = d : l.set(w, d));
  for (a = 0; a < h; ++a)
    w = r.call(e, o[a], a, o) + "", (d = l.get(w)) ? (n[a] = d, d.__data__ = o[a], l.delete(w)) : i[a] = new _t(e, o[a]);
  for (a = 0; a < c; ++a)
    (d = t[a]) && l.get(m[a]) === d && (s[a] = d);
}
function Ys(e) {
  return e.__data__;
}
function js(e, t) {
  if (!arguments.length) return Array.from(this, Ys);
  var i = t ? Gs : Bs, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Ws(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), l = 0; l < o; ++l) {
    var c = n[l], h = s[l], m = h.length, w = Xs(e.call(c, c && c.__data__, l, n)), _ = w.length, I = a[l] = new Array(_), A = r[l] = new Array(_), v = d[l] = new Array(m);
    i(c, h, I, A, v, w, t);
    for (var T = 0, D = 0, $, b; T < _; ++T)
      if ($ = I[T]) {
        for (T >= D && (D = T + 1); !(b = A[D]) && ++D < _; ) ;
        $._next = b || null;
      }
  }
  return r = new oe(r, n), r._enter = a, r._exit = d, r;
}
function Xs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Zs() {
  return new oe(this._exit || this._groups.map(dn), this._parents);
}
function Js(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function Qs(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var l = i[d], c = n[d], h = l.length, m = a[d] = new Array(h), w, _ = 0; _ < h; ++_)
      (w = l[_] || c[_]) && (m[_] = w);
  for (; d < s; ++d)
    a[d] = i[d];
  return new oe(a, this._parents);
}
function eo() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function to(e) {
  e || (e = io);
  function t(h, m) {
    return h && m ? e(h.__data__, m.__data__) : !h - !m;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, d = s[o] = new Array(a), l, c = 0; c < a; ++c)
      (l = r[c]) && (d[c] = l);
    d.sort(t);
  }
  return new oe(s, this._parents).order();
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
function ln(e) {
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
function xo(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? wo : typeof t == "function" ? vo : yo)(e, t, i ?? "")) : Ue(this.node(), e);
}
function Ue(e, t) {
  return e.style.getPropertyValue(t) || ln(e).getComputedStyle(e, null).getPropertyValue(t);
}
function _o(e) {
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
  return arguments.length > 1 ? this.each((t == null ? _o : typeof t == "function" ? $o : Io)(e, t)) : this.node()[e];
}
function cn(e) {
  return e.trim().split(/^|\s+/);
}
function oi(e) {
  return e.classList || new un(e);
}
function un(e) {
  this._node = e, this._names = cn(e.getAttribute("class") || "");
}
un.prototype = {
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
function hn(e, t) {
  for (var i = oi(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function pn(e, t) {
  for (var i = oi(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function ko(e) {
  return function() {
    hn(this, e);
  };
}
function Eo(e) {
  return function() {
    pn(this, e);
  };
}
function So(e, t) {
  return function() {
    (t.apply(this, arguments) ? hn : pn)(this, e);
  };
}
function Ao(e, t) {
  var i = cn(e + "");
  if (arguments.length < 2) {
    for (var n = oi(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
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
  var t = typeof e == "function" ? e : sn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Fo() {
  return null;
}
function Vo(e, t) {
  var i = typeof e == "function" ? e : sn(e), n = t == null ? Fo : typeof t == "function" ? t : si(t);
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
      for (var d = 0, l = a.length, c; d < l; ++d)
        for (s = 0, c = a[d]; s < o; ++s)
          if ((r = n[s]).type === c.type && r.name === c.name)
            return c.value;
    }
    return;
  }
  for (a = t ? Qo : Jo, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function fn(e, t, i) {
  var n = ln(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function tr(e, t) {
  return function() {
    return fn(this, e, t);
  };
}
function ir(e, t) {
  return function() {
    return fn(this, e, t.apply(this, arguments));
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
var mn = [null];
function oe(e, t) {
  this._groups = e, this._parents = t;
}
function ot() {
  return new oe([[document.documentElement]], mn);
}
function or() {
  return this;
}
oe.prototype = ot.prototype = {
  constructor: oe,
  select: Ms,
  selectAll: Rs,
  selectChild: Ds,
  selectChildren: Fs,
  filter: Vs,
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
  style: xo,
  property: bo,
  classed: Ao,
  text: Po,
  html: Lo,
  raise: Do,
  lower: qo,
  append: Ho,
  insert: Vo,
  remove: Wo,
  clone: Yo,
  datum: jo,
  on: er,
  dispatch: nr,
  [Symbol.iterator]: sr
};
function ce(e) {
  return typeof e == "string" ? new oe([[document.querySelector(e)]], [document.documentElement]) : new oe([[e]], mn);
}
function rr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function be(e, t) {
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
function ri() {
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
mt.prototype = ri.prototype = {
  constructor: mt,
  on: function(e, t) {
    var i = this._, n = dr(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = lr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = bi(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = bi(i[s], e.name, null);
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
function bi(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = ar, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Vt = { capture: !0, passive: !1 };
function Kt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function cr(e) {
  var t = e.document.documentElement, i = ce(e).on("dragstart.drag", Kt, Vt);
  "onselectstart" in t ? i.on("selectstart.drag", Kt, Vt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ur(e, t) {
  var i = e.document.documentElement, n = ce(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Kt, Vt), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ai(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function gn(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function rt() {
}
var et = 0.7, It = 1 / et, Re = "\\s*([+-]?\\d+)\\s*", tt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ue = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", hr = /^#([0-9a-f]{3,8})$/, pr = new RegExp(`^rgb\\(${Re},${Re},${Re}\\)$`), fr = new RegExp(`^rgb\\(${ue},${ue},${ue}\\)$`), mr = new RegExp(`^rgba\\(${Re},${Re},${Re},${tt}\\)$`), gr = new RegExp(`^rgba\\(${ue},${ue},${ue},${tt}\\)$`), wr = new RegExp(`^hsl\\(${tt},${ue},${ue}\\)$`), yr = new RegExp(`^hsla\\(${tt},${ue},${ue},${tt}\\)$`), ki = {
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
ai(rt, it, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ei,
  // Deprecated! Use color.formatHex.
  formatHex: Ei,
  formatHex8: vr,
  formatHsl: xr,
  formatRgb: Si,
  toString: Si
});
function Ei() {
  return this.rgb().formatHex();
}
function vr() {
  return this.rgb().formatHex8();
}
function xr() {
  return wn(this).formatHsl();
}
function Si() {
  return this.rgb().formatRgb();
}
function it(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = hr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Ai(t) : i === 3 ? new ie(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? dt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? dt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = pr.exec(e)) ? new ie(t[1], t[2], t[3], 1) : (t = fr.exec(e)) ? new ie(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = mr.exec(e)) ? dt(t[1], t[2], t[3], t[4]) : (t = gr.exec(e)) ? dt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = wr.exec(e)) ? Ni(t[1], t[2] / 100, t[3] / 100, 1) : (t = yr.exec(e)) ? Ni(t[1], t[2] / 100, t[3] / 100, t[4]) : ki.hasOwnProperty(e) ? Ai(ki[e]) : e === "transparent" ? new ie(NaN, NaN, NaN, 0) : null;
}
function Ai(e) {
  return new ie(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function dt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new ie(e, t, i, n);
}
function _r(e) {
  return e instanceof rt || (e = it(e)), e ? (e = e.rgb(), new ie(e.r, e.g, e.b, e.opacity)) : new ie();
}
function Wt(e, t, i, n) {
  return arguments.length === 1 ? _r(e) : new ie(e, t, i, n ?? 1);
}
function ie(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
ai(ie, Wt, gn(rt, {
  brighter(e) {
    return e = e == null ? It : Math.pow(It, e), new ie(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? et : Math.pow(et, e), new ie(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ie(Ce(this.r), Ce(this.g), Ce(this.b), $t(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ci,
  // Deprecated! Use color.formatHex.
  formatHex: Ci,
  formatHex8: Ir,
  formatRgb: Mi,
  toString: Mi
}));
function Ci() {
  return `#${Ee(this.r)}${Ee(this.g)}${Ee(this.b)}`;
}
function Ir() {
  return `#${Ee(this.r)}${Ee(this.g)}${Ee(this.b)}${Ee((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mi() {
  const e = $t(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ce(this.r)}, ${Ce(this.g)}, ${Ce(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function $t(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ce(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ee(e) {
  return e = Ce(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ni(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new de(e, t, i, n);
}
function wn(e) {
  if (e instanceof de) return new de(e.h, e.s, e.l, e.opacity);
  if (e instanceof rt || (e = it(e)), !e) return new de();
  if (e instanceof de) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new de(r, a, d, e.opacity);
}
function $r(e, t, i, n) {
  return arguments.length === 1 ? wn(e) : new de(e, t, i, n ?? 1);
}
function de(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
ai(de, $r, gn(rt, {
  brighter(e) {
    return e = e == null ? It : Math.pow(It, e), new de(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? et : Math.pow(et, e), new de(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new ie(
      Lt(e >= 240 ? e - 240 : e + 120, s, n),
      Lt(e, s, n),
      Lt(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new de(Pi(this.h), lt(this.s), lt(this.l), $t(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = $t(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Pi(this.h)}, ${lt(this.s) * 100}%, ${lt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Pi(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function lt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Lt(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const yn = (e) => () => e;
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
  return (e = +e) == 1 ? vn : function(t, i) {
    return i - t ? kr(t, i, e) : yn(isNaN(t) ? i : t);
  };
}
function vn(e, t) {
  var i = t - e;
  return i ? br(e, i) : yn(isNaN(e) ? t : e);
}
const Ti = (function e(t) {
  var i = Er(t);
  function n(s, o) {
    var r = i((s = Wt(s)).r, (o = Wt(o)).r), a = i(s.g, o.g), d = i(s.b, o.b), l = vn(s.opacity, o.opacity);
    return function(c) {
      return s.r = r(c), s.g = a(c), s.b = d(c), s.opacity = l(c), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function xe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Bt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ut = new RegExp(Bt.source, "g");
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
  var i = Bt.lastIndex = Ut.lastIndex = 0, n, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (n = Bt.exec(e)) && (s = Ut.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: xe(n, s) })), i = Ut.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? Ar(d[0].x) : Sr(t) : (t = d.length, function(l) {
    for (var c = 0, h; c < t; ++c) a[(h = d[c]).i] = h.x(l);
    return a.join("");
  });
}
var Ri = 180 / Math.PI, Gt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function xn(e, t, i, n, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * i + t * n) && (i -= e * d, n -= t * d), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, d /= a), e * n < t * i && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * Ri,
    skewX: Math.atan(d) * Ri,
    scaleX: r,
    scaleY: a
  };
}
var ct;
function Mr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Gt : xn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Nr(e) {
  return e == null || (ct || (ct = document.createElementNS("http://www.w3.org/2000/svg", "g")), ct.setAttribute("transform", e), !(e = ct.transform.baseVal.consolidate())) ? Gt : (e = e.matrix, xn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function _n(e, t, i, n) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, c, h, m, w, _) {
    if (l !== h || c !== m) {
      var I = w.push("translate(", null, t, null, i);
      _.push({ i: I - 4, x: xe(l, h) }, { i: I - 2, x: xe(c, m) });
    } else (h || m) && w.push("translate(" + h + t + m + i);
  }
  function r(l, c, h, m) {
    l !== c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), m.push({ i: h.push(s(h) + "rotate(", null, n) - 2, x: xe(l, c) })) : c && h.push(s(h) + "rotate(" + c + n);
  }
  function a(l, c, h, m) {
    l !== c ? m.push({ i: h.push(s(h) + "skewX(", null, n) - 2, x: xe(l, c) }) : c && h.push(s(h) + "skewX(" + c + n);
  }
  function d(l, c, h, m, w, _) {
    if (l !== h || c !== m) {
      var I = w.push(s(w) + "scale(", null, ",", null, ")");
      _.push({ i: I - 4, x: xe(l, h) }, { i: I - 2, x: xe(c, m) });
    } else (h !== 1 || m !== 1) && w.push(s(w) + "scale(" + h + "," + m + ")");
  }
  return function(l, c) {
    var h = [], m = [];
    return l = e(l), c = e(c), o(l.translateX, l.translateY, c.translateX, c.translateY, h, m), r(l.rotate, c.rotate, h, m), a(l.skewX, c.skewX, h, m), d(l.scaleX, l.scaleY, c.scaleX, c.scaleY, h, m), l = c = null, function(w) {
      for (var _ = -1, I = m.length, A; ++_ < I; ) h[(A = m[_]).i] = A.x(w);
      return h.join("");
    };
  };
}
var Pr = _n(Mr, "px, ", "px)", "deg)"), Tr = _n(Nr, ", ", ")", ")"), Rr = 1e-12;
function Oi(e) {
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
    var a = o[0], d = o[1], l = o[2], c = r[0], h = r[1], m = r[2], w = c - a, _ = h - d, I = w * w + _ * _, A, v;
    if (I < Rr)
      v = Math.log(m / l) / t, A = function(C) {
        return [
          a + C * w,
          d + C * _,
          l * Math.exp(t * C * v)
        ];
      };
    else {
      var T = Math.sqrt(I), D = (m * m - l * l + n * I) / (2 * l * i * T), $ = (m * m - l * l - n * I) / (2 * m * i * T), b = Math.log(Math.sqrt(D * D + 1) - D), S = Math.log(Math.sqrt($ * $ + 1) - $);
      v = (S - b) / t, A = function(C) {
        var Y = C * v, K = Oi(b), W = l / (i * T) * (K * Lr(t * Y + b) - Or(b));
        return [
          a + W * w,
          d + W * _,
          l * K / Oi(t * Y + b)
        ];
      };
    }
    return A.duration = v * 1e3 * t / Math.SQRT2, A;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var De = 0, We = 0, He = 0, In = 1e3, bt, Be, kt = 0, Ne = 0, Ct = 0, nt = typeof performance == "object" && performance.now ? performance : Date, $n = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function di() {
  return Ne || ($n(Dr), Ne = nt.now() + Ct);
}
function Dr() {
  Ne = 0;
}
function Et() {
  this._call = this._time = this._next = null;
}
Et.prototype = bn.prototype = {
  constructor: Et,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? di() : +i) + (t == null ? 0 : +t), !this._next && Be !== this && (Be ? Be._next = this : bt = this, Be = this), this._call = e, this._time = i, Yt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Yt());
  }
};
function bn(e, t, i) {
  var n = new Et();
  return n.restart(e, t, i), n;
}
function zr() {
  di(), ++De;
  for (var e = bt, t; e; )
    (t = Ne - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --De;
}
function Li() {
  Ne = (kt = nt.now()) + Ct, De = We = 0;
  try {
    zr();
  } finally {
    De = 0, Hr(), Ne = 0;
  }
}
function qr() {
  var e = nt.now(), t = e - kt;
  t > In && (Ct -= t, kt = e);
}
function Hr() {
  for (var e, t = bt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : bt = i);
  Be = e, Yt(n);
}
function Yt(e) {
  if (!De) {
    We && (We = clearTimeout(We));
    var t = e - Ne;
    t > 24 ? (e < 1 / 0 && (We = setTimeout(Li, e - nt.now() - Ct)), He && (He = clearInterval(He))) : (He || (kt = nt.now(), He = setInterval(qr, In)), De = 1, $n(Li));
  }
}
function Ui(e, t, i) {
  var n = new Et();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Fr = ri("start", "end", "cancel", "interrupt"), Vr = [], kn = 0, Di = 1, jt = 2, gt = 3, zi = 4, Xt = 5, wt = 6;
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
    on: Fr,
    tween: Vr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: kn
  });
}
function li(e, t) {
  var i = le(e, t);
  if (i.state > kn) throw new Error("too late; already scheduled");
  return i;
}
function pe(e, t) {
  var i = le(e, t);
  if (i.state > gt) throw new Error("too late; already running");
  return i;
}
function le(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Kr(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = bn(o, 0, i.time);
  function o(l) {
    i.state = Di, i.timer.restart(r, i.delay, i.time), i.delay <= l && r(l - i.delay);
  }
  function r(l) {
    var c, h, m, w;
    if (i.state !== Di) return d();
    for (c in n)
      if (w = n[c], w.name === i.name) {
        if (w.state === gt) return Ui(r);
        w.state === zi ? (w.state = wt, w.timer.stop(), w.on.call("interrupt", e, e.__data__, w.index, w.group), delete n[c]) : +c < t && (w.state = wt, w.timer.stop(), w.on.call("cancel", e, e.__data__, w.index, w.group), delete n[c]);
      }
    if (Ui(function() {
      i.state === gt && (i.state = zi, i.timer.restart(a, i.delay, i.time), a(l));
    }), i.state = jt, i.on.call("start", e, e.__data__, i.index, i.group), i.state === jt) {
      for (i.state = gt, s = new Array(m = i.tween.length), c = 0, h = -1; c < m; ++c)
        (w = i.tween[c].value.call(e, e.__data__, i.index, i.group)) && (s[++h] = w);
      s.length = h + 1;
    }
  }
  function a(l) {
    for (var c = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(d), i.state = Xt, 1), h = -1, m = s.length; ++h < m; )
      s[h].call(e, c);
    i.state === Xt && (i.on.call("end", e, e.__data__, i.index, i.group), d());
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
      s = n.state > jt && n.state < Xt, n.state = wt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
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
    var s = pe(this, e), o = s.tween;
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
    var o = pe(this, e), r = o.tween;
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
    for (var n = le(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Br : Gr)(i, e, t));
}
function ci(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = pe(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return le(s, n).value[t];
  };
}
function En(e, t) {
  var i;
  return (typeof t == "number" ? xe : t instanceof it ? Ti : (i = it(t)) ? (t = i, Ti) : Cr)(e, t);
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
  var i = At(e), n = i === "transform" ? Tr : En;
  return this.attrTween(e, typeof t == "function" ? (i.local ? ea : Qr)(i, n, ci(this, "attr." + e, t)) : t == null ? (i.local ? Xr : jr)(i) : (i.local ? Jr : Zr)(i, n, t));
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
    li(this, e).delay = +t.apply(this, arguments);
  };
}
function da(e, t) {
  return t = +t, function() {
    li(this, e).delay = t;
  };
}
function la(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? aa : da)(t, e)) : le(this.node(), t).delay;
}
function ca(e, t) {
  return function() {
    pe(this, e).duration = +t.apply(this, arguments);
  };
}
function ua(e, t) {
  return t = +t, function() {
    pe(this, e).duration = t;
  };
}
function ha(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ca : ua)(t, e)) : le(this.node(), t).duration;
}
function pa(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    pe(this, e).ease = t;
  };
}
function fa(e) {
  var t = this._id;
  return arguments.length ? this.each(pa(t, e)) : le(this.node(), t).ease;
}
function ma(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    pe(this, e).ease = i;
  };
}
function ga(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ma(this._id, e));
}
function wa(e) {
  typeof e != "function" && (e = rn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, l = 0; l < r; ++l)
      (d = o[l]) && e.call(d, d.__data__, l, o) && a.push(d);
  return new ve(n, this._parents, this._name, this._id);
}
function ya(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var d = t[a], l = i[a], c = d.length, h = r[a] = new Array(c), m, w = 0; w < c; ++w)
      (m = d[w] || l[w]) && (h[w] = m);
  for (; a < n; ++a)
    r[a] = t[a];
  return new ve(r, this._parents, this._name, this._id);
}
function va(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function xa(e, t, i) {
  var n, s, o = va(t) ? li : pe;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function _a(e, t) {
  var i = this._id;
  return arguments.length < 2 ? le(this.node(), i).on.on(e) : this.each(xa(i, e, t));
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
  typeof e != "function" && (e = si(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], d = a.length, l = o[r] = new Array(d), c, h, m = 0; m < d; ++m)
      (c = a[m]) && (h = e.call(c, c.__data__, m, a)) && ("__data__" in c && (h.__data__ = c.__data__), l[m] = h, Mt(l[m], t, i, m, l, le(c, i)));
  return new ve(o, this._parents, t, i);
}
function ka(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = on(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = n[a], l = d.length, c, h = 0; h < l; ++h)
      if (c = d[h]) {
        for (var m = e.call(c, c.__data__, h, d), w, _ = le(c, i), I = 0, A = m.length; I < A; ++I)
          (w = m[I]) && Mt(w, t, i, I, m, _);
        o.push(m), r.push(c);
      }
  return new ve(o, r, t, i);
}
var Ea = ot.prototype.constructor;
function Sa() {
  return new Ea(this._groups, this._parents);
}
function Aa(e, t) {
  var i, n, s;
  return function() {
    var o = Ue(this, e), r = (this.style.removeProperty(e), Ue(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function Sn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ca(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = Ue(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Ma(e, t, i) {
  var n, s, o;
  return function() {
    var r = Ue(this, e), a = i(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Ue(this, e))), r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a));
  };
}
function Na(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = pe(this, e), l = d.on, c = d.value[o] == null ? a || (a = Sn(t)) : void 0;
    (l !== i || s !== c) && (n = (i = l).copy()).on(r, s = c), d.on = n;
  };
}
function Pa(e, t, i) {
  var n = (e += "") == "transform" ? Pr : En;
  return t == null ? this.styleTween(e, Aa(e, n)).on("end.style." + e, Sn(e)) : typeof t == "function" ? this.styleTween(e, Ma(e, n, ci(this, "style." + e, t))).each(Na(this._id, e)) : this.styleTween(e, Ca(e, n, t), i).on("end.style." + e, null);
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
  return this.tween("text", typeof e == "function" ? Ua(ci(this, "text", e)) : La(e == null ? "" : e + ""));
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
function Fa() {
  for (var e = this._name, t = this._id, i = An(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, l = 0; l < a; ++l)
      if (d = r[l]) {
        var c = le(d, t);
        Mt(d, e, i, l, r, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new ve(n, this._parents, e, i);
}
function Va() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var l = pe(this, n), c = l.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), l.on = t;
    }), s === 0 && o();
  });
}
var Ka = 0;
function ve(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function An() {
  return ++Ka;
}
var me = ot.prototype;
ve.prototype = {
  constructor: ve,
  select: ba,
  selectAll: ka,
  selectChild: me.selectChild,
  selectChildren: me.selectChildren,
  filter: wa,
  merge: ya,
  selection: Sa,
  transition: Fa,
  call: me.call,
  nodes: me.nodes,
  node: me.node,
  size: me.size,
  empty: me.empty,
  each: me.each,
  on: _a,
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
  end: Va,
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
  e instanceof ve ? (t = e._id, e = e._name) : (t = An(), (i = Ba).time = di(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, l = 0; l < a; ++l)
      (d = r[l]) && Mt(d, e, t, l, r, i || Ga(d, t));
  return new ve(n, this._parents, e, t);
}
ot.prototype.interrupt = Wr;
ot.prototype.transition = Ya;
const ut = (e) => () => e;
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
function ye(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
ye.prototype = {
  constructor: ye,
  scale: function(e) {
    return e === 1 ? this : new ye(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ye(this.k, this.x + this.k * e, this.y + this.k * t);
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
var je = new ye(1, 0, 0);
ye.prototype;
function Dt(e) {
  e.stopImmediatePropagation();
}
function Fe(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Xa(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Za() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function qi() {
  return this.__zoom || je;
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
  var e = Xa, t = Za, i = ed, n = Ja, s = Qa, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Ur, l = ri("start", "zoom", "end"), c, h, m, w = 500, _ = 150, I = 0, A = 10;
  function v(p) {
    p.property("__zoom", qi).on("wheel.zoom", Y, { passive: !1 }).on("mousedown.zoom", K).on("dblclick.zoom", W).filter(s).on("touchstart.zoom", J).on("touchmove.zoom", te).on("touchend.zoom touchcancel.zoom", f).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(p, y, g, x) {
    var k = p.selection ? p.selection() : p;
    k.property("__zoom", qi), p !== k ? b(p, y, g, x) : k.interrupt().each(function() {
      S(this, arguments).event(x).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, v.scaleBy = function(p, y, g, x) {
    v.scaleTo(p, function() {
      var k = this.__zoom.k, u = typeof y == "function" ? y.apply(this, arguments) : y;
      return k * u;
    }, g, x);
  }, v.scaleTo = function(p, y, g, x) {
    v.transform(p, function() {
      var k = t.apply(this, arguments), u = this.__zoom, E = g == null ? $(k) : typeof g == "function" ? g.apply(this, arguments) : g, M = u.invert(E), L = typeof y == "function" ? y.apply(this, arguments) : y;
      return i(D(T(u, L), E, M), k, r);
    }, g, x);
  }, v.translateBy = function(p, y, g, x) {
    v.transform(p, function() {
      return i(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), r);
    }, null, x);
  }, v.translateTo = function(p, y, g, x, k) {
    v.transform(p, function() {
      var u = t.apply(this, arguments), E = this.__zoom, M = x == null ? $(u) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(je.translate(M[0], M[1]).scale(E.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), u, r);
    }, x, k);
  };
  function T(p, y) {
    return y = Math.max(o[0], Math.min(o[1], y)), y === p.k ? p : new ye(y, p.x, p.y);
  }
  function D(p, y, g) {
    var x = y[0] - g[0] * p.k, k = y[1] - g[1] * p.k;
    return x === p.x && k === p.y ? p : new ye(p.k, x, k);
  }
  function $(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function b(p, y, g, x) {
    p.on("start.zoom", function() {
      S(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      S(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var k = this, u = arguments, E = S(k, u).event(x), M = t.apply(k, u), L = g == null ? $(M) : typeof g == "function" ? g.apply(k, u) : g, j = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), V = k.__zoom, H = typeof y == "function" ? y.apply(k, u) : y, X = d(V.invert(L).concat(j / V.k), H.invert(L).concat(j / H.k));
      return function(G) {
        if (G === 1) G = H;
        else {
          var se = X(G), fe = j / se[2];
          G = new ye(fe, L[0] - se[0] * fe, L[1] - se[1] * fe);
        }
        E.zoom(null, G);
      };
    });
  }
  function S(p, y, g) {
    return !g && p.__zooming || new C(p, y);
  }
  function C(p, y) {
    this.that = p, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, y), this.taps = 0;
  }
  C.prototype = {
    event: function(p) {
      return p && (this.sourceEvent = p), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(p, y) {
      return this.mouse && p !== "mouse" && (this.mouse[1] = y.invert(this.mouse[0])), this.touch0 && p !== "touch" && (this.touch0[1] = y.invert(this.touch0[0])), this.touch1 && p !== "touch" && (this.touch1[1] = y.invert(this.touch1[0])), this.that.__zoom = y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(p) {
      var y = ce(this.that).datum();
      l.call(
        p,
        this.that,
        new ja(p, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: l
        }),
        y
      );
    }
  };
  function Y(p, ...y) {
    if (!e.apply(this, arguments)) return;
    var g = S(this, y).event(p), x = this.__zoom, k = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, n.apply(this, arguments)))), u = be(p);
    if (g.wheel)
      (g.mouse[0][0] !== u[0] || g.mouse[0][1] !== u[1]) && (g.mouse[1] = x.invert(g.mouse[0] = u)), clearTimeout(g.wheel);
    else {
      if (x.k === k) return;
      g.mouse = [u, x.invert(u)], yt(this), g.start();
    }
    Fe(p), g.wheel = setTimeout(E, _), g.zoom("mouse", i(D(T(x, k), g.mouse[0], g.mouse[1]), g.extent, r));
    function E() {
      g.wheel = null, g.end();
    }
  }
  function K(p, ...y) {
    if (m || !e.apply(this, arguments)) return;
    var g = p.currentTarget, x = S(this, y, !0).event(p), k = ce(p.view).on("mousemove.zoom", L, !0).on("mouseup.zoom", j, !0), u = be(p, g), E = p.clientX, M = p.clientY;
    cr(p.view), Dt(p), x.mouse = [u, this.__zoom.invert(u)], yt(this), x.start();
    function L(V) {
      if (Fe(V), !x.moved) {
        var H = V.clientX - E, X = V.clientY - M;
        x.moved = H * H + X * X > I;
      }
      x.event(V).zoom("mouse", i(D(x.that.__zoom, x.mouse[0] = be(V, g), x.mouse[1]), x.extent, r));
    }
    function j(V) {
      k.on("mousemove.zoom mouseup.zoom", null), ur(V.view, x.moved), Fe(V), x.event(V).end();
    }
  }
  function W(p, ...y) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, x = be(p.changedTouches ? p.changedTouches[0] : p, this), k = g.invert(x), u = g.k * (p.shiftKey ? 0.5 : 2), E = i(D(T(g, u), x, k), t.apply(this, y), r);
      Fe(p), a > 0 ? ce(this).transition().duration(a).call(b, E, x, p) : ce(this).call(v.transform, E, x, p);
    }
  }
  function J(p, ...y) {
    if (e.apply(this, arguments)) {
      var g = p.touches, x = g.length, k = S(this, y, p.changedTouches.length === x).event(p), u, E, M, L;
      for (Dt(p), E = 0; E < x; ++E)
        M = g[E], L = be(M, this), L = [L, this.__zoom.invert(L), M.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== L[2] && (k.touch1 = L, k.taps = 0) : (k.touch0 = L, u = !0, k.taps = 1 + !!c);
      c && (c = clearTimeout(c)), u && (k.taps < 2 && (h = L[0], c = setTimeout(function() {
        c = null;
      }, w)), yt(this), k.start());
    }
  }
  function te(p, ...y) {
    if (this.__zooming) {
      var g = S(this, y).event(p), x = p.changedTouches, k = x.length, u, E, M, L;
      for (Fe(p), u = 0; u < k; ++u)
        E = x[u], M = be(E, this), g.touch0 && g.touch0[2] === E.identifier ? g.touch0[0] = M : g.touch1 && g.touch1[2] === E.identifier && (g.touch1[0] = M);
      if (E = g.that.__zoom, g.touch1) {
        var j = g.touch0[0], V = g.touch0[1], H = g.touch1[0], X = g.touch1[1], G = (G = H[0] - j[0]) * G + (G = H[1] - j[1]) * G, se = (se = X[0] - V[0]) * se + (se = X[1] - V[1]) * se;
        E = T(E, Math.sqrt(G / se)), M = [(j[0] + H[0]) / 2, (j[1] + H[1]) / 2], L = [(V[0] + X[0]) / 2, (V[1] + X[1]) / 2];
      } else if (g.touch0) M = g.touch0[0], L = g.touch0[1];
      else return;
      g.zoom("touch", i(D(E, M, L), g.extent, r));
    }
  }
  function f(p, ...y) {
    if (this.__zooming) {
      var g = S(this, y).event(p), x = p.changedTouches, k = x.length, u, E;
      for (Dt(p), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, w), u = 0; u < k; ++u)
        E = x[u], g.touch0 && g.touch0[2] === E.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === E.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (E = be(E, this), Math.hypot(h[0] - E[0], h[1] - E[1]) < A)) {
        var M = ce(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : ut(+p), v) : n;
  }, v.filter = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : ut(!!p), v) : e;
  }, v.touchable = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : ut(!!p), v) : s;
  }, v.extent = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : ut([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), v) : t;
  }, v.scaleExtent = function(p) {
    return arguments.length ? (o[0] = +p[0], o[1] = +p[1], v) : [o[0], o[1]];
  }, v.translateExtent = function(p) {
    return arguments.length ? (r[0][0] = +p[0][0], r[1][0] = +p[1][0], r[0][1] = +p[0][1], r[1][1] = +p[1][1], v) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, v.constrain = function(p) {
    return arguments.length ? (i = p, v) : i;
  }, v.duration = function(p) {
    return arguments.length ? (a = +p, v) : a;
  }, v.interpolate = function(p) {
    return arguments.length ? (d = p, v) : d;
  }, v.on = function() {
    var p = l.on.apply(l, arguments);
    return p === l ? v : p;
  }, v.clickDistance = function(p) {
    return arguments.length ? (I = (p = +p) * p, v) : Math.sqrt(I);
  }, v.tapDistance = function(p) {
    return arguments.length ? (A = +p, v) : A;
  }, v;
}
var id = Object.defineProperty, nd = Object.getOwnPropertyDescriptor, ee = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? nd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && id(t, i, s), s;
};
function sd(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const l = ((i.x - e.x) * a - (i.y - e.y) * r) / d, c = ((i.x - e.x) * o - (i.y - e.y) * s) / d;
  return l <= 0.02 || l >= 0.98 || c <= 0.02 || c >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * o, t: l };
}
function od(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function rd(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, l = (r.y - o.y) / a, c = t.map(([m, w]) => sd(o, r, m, w)).filter((m) => m !== null).filter((m) => m.t * a > i + 2 && (1 - m.t) * a > i + 2).sort((m, w) => m.t - w.t);
    let h = -1 / 0;
    for (const m of c)
      m.t * a - i <= h + 2 || (n += ` L ${m.x - d * i} ${m.y - l * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + d * i} ${m.y + l * i}`, h = m.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const ht = {
  component: z`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: z`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: z`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: z`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: z`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: z`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: z`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: z`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: z`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: z`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: z`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: z`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: z`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: z`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let Z = class extends Ae {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = je, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case" && i.kind !== "api" && i.kind !== "proxy-api" && i.kind !== "api-operation")
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
    const s = Math.min(...t.map((c) => c.x - c.w / 2)) - e, o = Math.max(...t.map((c) => c.x + c.w / 2)) + e, r = Math.min(...t.map((c) => c.y - c.h / 2)) - e, a = Math.max(...t.map((c) => c.y + c.h / 2)) + e, d = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), l = je.translate(n.width / 2 - d * (s + o) / 2, n.height / 2 - d * (r + a) / 2).scale(d);
    ce(i).call(this._zoomBehavior.transform, l);
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
    var i, n, s;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let o = e.parentId; o; o = (n = this.scene.nodes.find((r) => r.id === o)) == null ? void 0 : n.parentId) {
      const r = this.scene.nodes.find((d) => d.id === o);
      if (!r) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - r.x), y: e.y + (this._dragPos.y - r.y) };
      const a = (s = this._dragGroup) == null ? void 0 : s.get(o);
      if (a)
        return { x: e.x + (a.x - r.x), y: e.y + (a.y - r.y) };
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
      (m) => o.has(m.id) && !(m.parentId && o.has(m.parentId))
    ) : null, a = r ? new Map(r.map((m) => [m.id, this.nodePos(m)])) : null, d = (m) => (m.shiftKey || m.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, l = (m) => {
      const w = this.nodeIdAt(m), _ = w && w !== t.id ? this.scene.nodes.find((I) => I.id === w) : void 0;
      return _ ? _.kind === "external-system" ? _.id : _.parentId ?? null : null;
    }, c = (m) => {
      if ((m.buttons & 1) === 0) {
        h(m);
        return;
      }
      const w = this.toScene(m), _ = w.x - i.x, I = w.y - i.y;
      if (!(!s && Math.hypot(_, I) < 3 / this._t.k))
        if (s = !0, r && a) {
          const A = /* @__PURE__ */ new Map();
          for (const v of r) {
            const T = a.get(v.id), D = this.clampToParent(v, T.x + _, T.y + I);
            A.set(v.id, { x: D.x, y: D.y });
          }
          this._dragGroup = A;
        } else d(m) ? (this._dragPos = { id: t.id, x: n.x + _, y: n.y + I }, this._hoverNodeId = l(m)) : (this._dragPos = this.clampToParent(t, n.x + _, n.y + I), this._hoverNodeId = null);
    }, h = (m) => {
      if (window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", h), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([w, _]) => ({ id: w, x: _.x, y: _.y }))
        });
      else if (s && this._dragPos) {
        if (d(m)) {
          const w = l(m);
          if (m.ctrlKey && t.kind === "api") {
            w && w !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: w,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (w !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: w,
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
    window.addEventListener("pointermove", c), window.addEventListener("pointerup", h);
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((I) => I.parentId === t.id), d = Math.min(...a.map((I) => I.x - I.w / 2)), l = Math.max(...a.map((I) => I.x + I.w / 2)), c = Math.min(...a.map((I) => I.y - I.h / 2)), h = Math.max(...a.map((I) => I.y + I.h / 2)), m = Cn(
      a.map((I) => ({ dx: I.x - r.x, dy: I.y - r.y, w: I.w, h: I.h })),
      { w: s, h: o }
    ), w = (I) => {
      if ((I.buttons & 1) === 0) {
        _();
        return;
      }
      const A = this.toScene(I);
      if (I.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(m.w, 2 * Math.abs(A.x - r.x)),
          h: Math.max(m.h, 2 * Math.abs(A.y - r.y))
        };
        return;
      }
      const v = r.x - i * r.w / 2, T = r.y - n * r.h / 2, D = i > 0 ? Math.max(A.x, v + s, a.length ? l + 10 : -1 / 0) : Math.min(A.x, v - s, a.length ? d - 10 : 1 / 0), $ = n > 0 ? Math.max(A.y, T + o, a.length ? h + 10 : -1 / 0) : Math.min(A.y, T - o, a.length ? c - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (v + D) / 2,
        y: (T + $) / 2,
        w: Math.abs(D - v),
        h: Math.abs($ - T)
      };
    }, _ = () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", _), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", _);
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
    const t = this.scene.nodes.find((c) => c.id === e.sourceId), i = this.scene.nodes.find((c) => c.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), r = n[0] ?? o, a = n[n.length - 1] ?? s;
    let d = this.borderPoint(t, r.x, r.y), l = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const c = this.edgeOffset(e);
      if (c !== 0) {
        const h = Math.hypot(l.x - d.x, l.y - d.y) || 1, m = -(l.y - d.y) / h * c, w = (l.x - d.x) / h * c;
        d = { x: d.x + m, y: d.y + w }, l = { x: l.x + m, y: l.y + w };
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
          const c = [...this._wpDrag.points];
          c[s] = l, this._wpDrag = { ...this._wpDrag, points: c };
        }
      } else {
        if (Math.hypot(l.x - n.x, l.y - n.y) < 4 / this._t.k) return;
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
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  renderEdge(e, t, i) {
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), a = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, d = t.slice(1, -1), l = t.map((c) => `${c.x},${c.y}`).join(" ");
    return z`
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
          ${e.tooltip ? z`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${rd(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}
              pointer-events="none"></path>
        ${e.label ? z`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
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
      var w;
      const m = ((w = this._selectedWaypoint) == null ? void 0 : w.edgeId) === e.id && this._selectedWaypoint.index === h;
      return z`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
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
    var m, w, _;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, d = ((w = this._resize) == null ? void 0 : w.id) === e.id ? this._resize.h : e.h, l = a / 2, c = d / 2, h = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return z`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (_ = this._dragGroup) != null && _.has(e.id) ? "none" : "auto"}
         @pointerdown=${(I) => this.onNodePointerDown(I, e)}
         @dblclick=${(I) => {
      I.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? z`<rect x=${-l - 4} y=${-c - 4} width=${a + 8} height=${d + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-l} y=${-c} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? z`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? z`<text x=${-l} y=${-c - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && ht[e.symbol] && !r ? z`<g transform="translate(${l - 17}, ${-c + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${ht[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && ht[e.symbol] ? z`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${ht[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? z`
              <foreignObject x=${-l + 6} y=${o ? -c + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(I) => I.stopPropagation()}
                  @keydown=${(I) => {
      I.stopPropagation(), I.key === "Enter" && this.commitRename(e, I.target.value), I.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(I) => this.commitRename(e, I.target.value)}
                />
              </foreignObject>` : r ? z`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? z`<text x=${-l + 12} y=${-c + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : z`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? z`<line x1=${-l + 8} y1=${-c + 28} x2=${l - 8} y2=${-c + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [l, 0],
      [-l, 0],
      [0, c],
      [0, -c]
    ].map(
      ([I, A]) => z`
                <circle data-handle cx=${I} cy=${A} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso, una operación externa o un RAG: el agente lo usará" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([I, A]) => z`
                <rect data-resize x=${I * l - 6.5} y=${A * c - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${I * A > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, I, A)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return z``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return z``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return z`
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
        const { a: r, b: a } = this._rubber, d = Math.min(r.x, a.x), l = Math.max(r.x, a.x), c = Math.min(r.y, a.y), h = Math.max(r.y, a.y), m = this.scene.nodes.filter((w) => {
          const _ = this.nodePos(w);
          return _.x >= d && _.x <= l && _.y >= c && _.y <= h;
        }).map((w) => w.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return z``;
    const { a: e, b: t } = this._rubber;
    return z`
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
    const n = this.getBoundingClientRect(), s = this._t.k, o = je.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    ce(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return N``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
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
      this.onMinimapPointer(l, e, n);
    }}
        @pointermove=${(l) => {
      var c, h;
      (h = (c = l.currentTarget).hasPointerCapture) != null && h.call(c, l.pointerId) && this.onMinimapPointer(l, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((l) => {
      const c = this.nodePos(l);
      return z`<rect
              x=${(c.x - l.w / 2 - e.minX) * n}
              y=${(c.y - l.h / 2 - e.minY) * n}
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
      if (!a) return z``;
      const d = this.renderEdge(r, a, [...t]);
      for (let l = 0; l < a.length - 1; l++) t.push([a[l], a[l + 1]]);
      return d;
    }), n = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (n.has(r.sourceId) || n.has(r.targetId) ? o : s).push(
        i[a]
      );
    }), N`
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
      (r) => z`
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
Z.styles = ei`
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
], Z.prototype, "scene", 2);
ee([
  he({ attribute: !1 })
], Z.prototype, "selectedId", 2);
ee([
  he({ attribute: !1 })
], Z.prototype, "selectedIds", 2);
ee([
  he({ type: Boolean })
], Z.prototype, "connectable", 2);
ee([
  he({ attribute: !1 })
], Z.prototype, "edgePoints", 2);
ee([
  P()
], Z.prototype, "_t", 2);
ee([
  P()
], Z.prototype, "_dragPos", 2);
ee([
  P()
], Z.prototype, "_dragGroup", 2);
ee([
  P()
], Z.prototype, "_pendingLink", 2);
ee([
  P()
], Z.prototype, "_hoverNodeId", 2);
ee([
  P()
], Z.prototype, "_editingId", 2);
ee([
  P()
], Z.prototype, "_spaceDown", 2);
ee([
  P()
], Z.prototype, "_wpDrag", 2);
ee([
  P()
], Z.prototype, "_selectedWaypoint", 2);
ee([
  P()
], Z.prototype, "_resize", 2);
ee([
  P()
], Z.prototype, "_rubber", 2);
Z = ee([
  ni("modux-canvas")
], Z);
const R = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function re(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function B(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Pe = (e) => e.trim().toLowerCase();
function ad(e, t) {
  var K, W, J, te;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((f) => [f.id, f.name])), s = e.modules.flatMap(
    (f) => (f.useCases ?? []).map((p) => ({ ...p, moduleId: f.id }))
  ), o = new Set(s.map((f) => f.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((f) => (f.domainServices ?? []).map((p) => p.id))
  ), d = e.modules.flatMap(
    (f) => (f.domainEvents ?? []).map((p) => ({ ...p, moduleId: f.id, application: !1 }))
  ), l = e.modules.flatMap(
    (f) => (f.applicationEvents ?? []).map((p) => ({ ...p, moduleId: f.id, application: !0 }))
  ), c = e.modules.flatMap(
    (f) => (f.readModels ?? []).map((p) => ({ ...p, moduleId: f.id }))
  );
  for (const f of s)
    re(i, {
      id: f.id,
      label: f.name,
      x: 0,
      y: 0,
      w: R.command.w,
      h: R.command.h,
      kind: "use-case",
      symbol: f.policy ? "flow" : "gear",
      fill: f.policy ? R.policy.fill : R.command.fill,
      stroke: f.policy ? R.policy.stroke : R.command.stroke,
      badge: f.policy ? "POLICY" : "COMANDO",
      tooltip: f.policy ? `${f.name} — policy de ${n.get(f.moduleId) ?? f.moduleId} (reacción, no caso de negocio)` : `${f.name} — caso de uso de ${n.get(f.moduleId) ?? f.moduleId}`
    });
  for (const f of r)
    re(i, {
      id: f.id,
      label: f.name,
      x: 0,
      y: 0,
      w: R.aggregate.w,
      h: R.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: R.aggregate.fill,
      stroke: R.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${f.name} — agregado de ${n.get(f.moduleId) ?? f.moduleId}`
    });
  const h = /* @__PURE__ */ new Map();
  for (const f of [...d, ...l])
    re(i, {
      id: f.id,
      label: f.name,
      x: 0,
      y: 0,
      w: R.event.w,
      h: R.event.h,
      kind: f.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: R.event.fill,
      stroke: R.event.stroke,
      badge: f.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${f.name} — evento de ${n.get(f.moduleId) ?? f.moduleId}`
    }), h.set(Pe(f.name), f.id);
  const m = (f) => {
    if (!f || !f.trim()) return null;
    const p = h.get(Pe(f));
    if (p) return p;
    const y = `evname:${Pe(f)}`;
    return re(i, {
      id: y,
      label: f,
      x: 0,
      y: 0,
      w: R.event.w,
      h: R.event.h,
      kind: "event-name",
      symbol: "event",
      fill: R.event.fill,
      stroke: R.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${f} — referenciado por nombre, sin evento declarado en el catálogo`
    }), y;
  }, w = (f) => {
    const p = c.find((g) => g.id === f.id) ?? c.find((g) => f.name && Pe(g.name) === Pe(f.name)), y = (p == null ? void 0 : p.id) ?? (f.id || (f.name ? `rm:${Pe(f.name)}` : null));
    return y ? (re(i, {
      id: y,
      label: (p == null ? void 0 : p.name) ?? f.name ?? y,
      x: 0,
      y: 0,
      w: R.readModel.w,
      h: R.readModel.h,
      kind: p ? "read-model" : "derived-read-model",
      fill: R.readModel.fill,
      stroke: R.readModel.stroke,
      dashed: !p,
      badge: "READ MODEL"
    }), y) : null;
  };
  for (const f of e.actorUses ?? []) {
    if (!o.has(f.targetId)) continue;
    const p = (e.actors ?? []).find((y) => y.id === f.actorId);
    p && (re(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: R.actor.w,
      h: R.actor.h,
      kind: "actor",
      symbol: "person",
      fill: R.actor.fill,
      stroke: R.actor.stroke,
      badge: "ACTOR"
    }), B(i, {
      id: `es-actor:${p.id}->${f.targetId}`,
      sourceId: p.id,
      targetId: f.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const f of e.aiAgents ?? []) {
    const p = (e.agentUses ?? []).filter((x) => x.agentId === f.id), y = (e.agentExternalUses ?? []).filter((x) => x.agentId === f.id), g = (e.agentRags ?? []).filter((x) => x.agentId === f.id);
    if (!(!p.length && !y.length && !g.length)) {
      re(i, {
        id: f.id,
        label: f.name,
        x: 0,
        y: 0,
        w: R.actor.w,
        h: R.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${f.name} — agente de IA (consume por MCP)`
      });
      for (const x of p)
        o.has(x.useCaseId) && B(i, {
          id: `es-agent:${f.id}->${x.useCaseId}`,
          sourceId: f.id,
          targetId: x.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const x of y) {
        const k = e.externalSystems.find(
          (E) => (E.useCases ?? []).some((M) => M.id === x.externalUseCaseId)
        );
        if (!k) continue;
        const u = (K = (k.useCases ?? []).find((E) => E.id === x.externalUseCaseId)) == null ? void 0 : K.name;
        re(i, {
          id: k.id,
          label: k.name,
          x: 0,
          y: 0,
          w: R.external.w,
          h: R.external.h,
          kind: "external-system",
          symbol: "component",
          fill: R.external.fill,
          stroke: R.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), B(i, {
          id: `es-agentx:${f.id}->${x.externalUseCaseId}`,
          sourceId: f.id,
          targetId: k.id,
          kind: "es-agent-external",
          label: u,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: u ? `Llama a ${u} del sistema externo` : void 0
        });
      }
      for (const x of g) {
        const k = (e.rags ?? []).find((u) => u.id === x.ragId);
        if (k) {
          re(i, {
            id: k.id,
            label: k.name,
            x: 0,
            y: 0,
            w: R.readModel.w,
            h: R.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${k.name} — base de conocimiento (retrieval)`
          }), B(i, {
            id: `es-agrag:${f.id}->${k.id}`,
            sourceId: f.id,
            targetId: k.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const u of k.sourceReadModelIds ?? []) {
            const E = w({ id: u });
            E && B(i, {
              id: `es-ragsrc:${k.id}->${E}`,
              sourceId: E,
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
  const _ = (f) => {
    const p = e.externalSystems.find((y) => y.id === f);
    return p ? (re(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: R.external.w,
      h: R.external.h,
      kind: "external-system",
      symbol: "component",
      fill: R.external.fill,
      stroke: R.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), p.id) : null;
  };
  for (const f of e.externalCalls ?? []) {
    const p = _(f.externalSystemId);
    !p || !o.has(f.useCaseId) || B(i, {
      id: `es-extin:${p}->${f.useCaseId}`,
      sourceId: p,
      targetId: f.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const f of e.externalUseCaseCalls ?? []) {
    if (!o.has(f.sourceId)) continue;
    const p = e.externalSystems.find(
      (x) => (x.useCases ?? []).some((k) => k.id === f.targetId)
    ), y = p ? _(p.id) : null;
    if (!y) continue;
    const g = (W = ((p == null ? void 0 : p.useCases) ?? []).find((x) => x.id === f.targetId)) == null ? void 0 : W.name;
    B(i, {
      id: `es-extout:${f.sourceId}->${f.targetId}`,
      sourceId: f.sourceId,
      targetId: y,
      kind: "es-command-external",
      label: g,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: g ? `Llama a ${g} del sistema externo` : void 0
    });
  }
  for (const f of e.aggregateCalls ?? [])
    !o.has(f.sourceId) || !i.nodes.has(f.targetId) || B(i, {
      id: `es-write:${f.sourceId}->${f.targetId}`,
      sourceId: f.sourceId,
      targetId: f.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const I = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const f of I)
    !i.nodes.has(f.domainEventId) || !(i.nodes.has(f.sourceId) && (o.has(f.sourceId) || r.some((y) => y.id === f.sourceId) || a.has(f.sourceId))) || B(i, {
      id: `es-emit:${f.sourceId}->${f.domainEventId}`,
      sourceId: f.sourceId,
      targetId: f.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const A = (f, p, y, g, x, k) => (re(i, {
    id: f,
    label: p,
    x: 0,
    y: 0,
    w: R.policy.w,
    h: R.policy.h,
    kind: y,
    symbol: "flow",
    fill: R.policy.fill,
    stroke: R.policy.stroke,
    badge: g,
    tooltip: x
  }), f), v = (f, p) => {
    const y = m(f);
    y && B(i, {
      id: `es-trigger:${y}->${p}`,
      sourceId: y,
      targetId: p,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, T = (f, p) => {
    !p || !o.has(p) || B(i, {
      id: `es-invoke:${f}->${p}`,
      sourceId: f,
      targetId: p,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const f of e.subscriptions ?? []) {
    const p = A(
      f.id,
      f.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${f.name}${f.eventName ? ` — reacciona a ${f.eventName}` : ""}${f.consumerGroup ? ` · grupo ${f.consumerGroup}` : ""}`
    );
    v(f.eventName, p);
    for (const y of f.actions ?? []) {
      if (y.type === "CallUseCase" && T(p, y.useCaseId), y.type === "StartSaga" && y.sagaId) {
        const g = `saga:${y.sagaId}`;
        A(g, y.sagaId, "saga", "SAGA"), B(i, {
          id: `es-saga:${p}->${g}`,
          sourceId: p,
          targetId: g,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (y.type === "UpdateProjection" && y.projectionId) {
        const g = (e.projections ?? []).find((x) => x.id === y.projectionId);
        g && B(i, {
          id: `es-feeds:${p}->${g.id}`,
          sourceId: p,
          targetId: g.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const f of e.projections ?? []) {
    const p = A(
      f.id,
      f.name,
      "projection",
      "PROYECCIÓN",
      `${f.name}${f.readModelName ? ` — materializa ${f.readModelName}` : ""}`
    );
    for (const x of f.handledEventIds) {
      const k = i.nodes.has(x) ? x : null;
      k && B(i, {
        id: `es-trigger:${k}->${p}`,
        sourceId: k,
        targetId: p,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    f.sourceAggregateId && i.nodes.has(f.sourceAggregateId) && B(i, {
      id: `es-state:${f.id}`,
      sourceId: f.sourceAggregateId,
      targetId: p,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const y = f.sourceExternalUseCaseId ?? f.sourceExternalTableId;
    if (y) {
      const x = e.externalSystems.find(
        (u) => (u.useCases ?? []).some((E) => E.id === y) || (u.tables ?? []).some((E) => E.id === y)
      ), k = x ? _(x.id) : null;
      if (k) {
        const u = ((J = (x.useCases ?? []).find((E) => E.id === y)) == null ? void 0 : J.name) ?? ((te = (x.tables ?? []).find((E) => E.id === y)) == null ? void 0 : te.name);
        B(i, {
          id: `es-poll:${f.id}`,
          sourceId: k,
          targetId: p,
          kind: "es-projects-poll",
          label: u,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: u ? `polling de ${u}` : "polling"
        });
      }
    }
    const g = w({ id: f.readModelId, name: f.readModelName });
    g && B(i, {
      id: `es-projects:${p}->${g}`,
      sourceId: p,
      targetId: g,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const f of e.flows) {
    if (f.archetype === "MATERIALIZES") {
      const y = m(f.triggerEvent), g = w({ name: f.readModelName ?? `${f.triggerEvent}View` });
      y && g && B(i, {
        id: `es-mat:${f.id}`,
        sourceId: y,
        targetId: g,
        kind: "es-materializes",
        label: f.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${f.name} [MATERIALIZES]`
      });
      continue;
    }
    const p = A(
      `flow:${f.id}`,
      f.name,
      "flow",
      `POLICY · ${f.archetype}`,
      `Flow ${f.name} [${f.archetype}]`
    );
    if (v(f.triggerEvent, p), T(p, f.targetUseCaseId), !f.targetUseCaseId) {
      const y = _(f.targetId), g = y ?? `tgt:${f.targetId}`;
      !y && n.has(f.targetId) && re(i, {
        id: g,
        label: n.get(f.targetId) ?? f.targetId,
        x: 0,
        y: 0,
        w: R.module.w,
        h: R.module.h,
        kind: "module",
        symbol: "component",
        fill: R.module.fill,
        stroke: R.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(g) && B(i, {
        id: `es-deliver:${f.id}`,
        sourceId: p,
        targetId: g,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const f of e.processes ?? []) {
    const p = A(
      f.id,
      f.name,
      "process",
      `PROCESO${f.sla ? ` · SLA ${f.sla}` : ""}`,
      `${f.name}${f.triggerEvent ? ` — arranca con ${f.triggerEvent}` : ""}`
    );
    v(f.triggerEvent, p);
    for (const g of f.steps) T(p, g.useCaseId);
    const y = m(f.onCompletionEventName);
    y && B(i, {
      id: `es-done:${f.id}`,
      sourceId: p,
      targetId: y,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const f of e.workflows ?? []) {
    const p = A(
      f.id,
      f.name,
      "workflow",
      "WORKFLOW",
      `${f.name}${f.triggerEvent ? ` — arranca con ${f.triggerEvent}` : ""}`
    );
    v(f.triggerEvent, p);
    for (const g of f.steps ?? []) {
      T(p, g.targetUseCaseId);
      for (const x of [g.emittedEventName, g.completionEventName]) {
        const k = m(x);
        k && B(i, {
          id: `es-wfemit:${f.id}:${k}`,
          sourceId: p,
          targetId: k,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const y = m(f.onCompletionEventName);
    y && B(i, {
      id: `es-done:${f.id}`,
      sourceId: p,
      targetId: y,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const D = [...i.nodes.values()], $ = /* @__PURE__ */ new Map();
  for (const f of i.edges)
    $.has(f.targetId) || $.set(f.targetId, []), $.get(f.targetId).push(f.sourceId);
  const b = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Set(), C = (f) => {
    const p = b.get(f);
    if (p !== void 0) return p;
    if (S.has(f)) return 0;
    S.add(f);
    const y = $.get(f) ?? [], g = y.length ? 1 + Math.max(...y.map(C)) : 0;
    return S.delete(f), b.set(f, g), g;
  }, Y = /* @__PURE__ */ new Map();
  for (const f of D) {
    const p = t[f.id];
    if (p) {
      f.x = p.x, f.y = p.y;
      continue;
    }
    const y = C(f.id), g = Y.get(y) ?? 0;
    Y.set(y, g + 1), f.x = 140 + y * 260, f.y = 110 + g * 110;
  }
  return { nodes: D, edges: i.edges };
}
const dd = 190, ld = 56, Hi = 180, cd = 56, ud = 150, hd = 44, Fi = 250, Vi = 100;
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
    var A;
    const d = new Map(a.steps.map((v) => [v.id, v])), l = new Map(a.steps.map((v) => [v.id, pd(v, d)])), c = /* @__PURE__ */ new Map();
    for (const v of a.steps) {
      const T = l.get(v.id) ?? 0;
      c.set(T, (c.get(T) ?? 0) + 1);
    }
    const h = Math.max(1, ...c.values()), m = fd(e, a);
    if (m && !s.has(m.id)) {
      s.add(m.id);
      const v = t[m.id] ?? { x: 140, y: r };
      i.push({
        id: m.id,
        label: m.label,
        x: v.x,
        y: v.y,
        w: ud,
        h: hd,
        kind: m.kind,
        symbol: m.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: m.kind === "aggregate" ? "AGGREGATE" : m.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const w = t[a.id] ?? { x: 420, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: w.x,
      y: w.y,
      w: dd,
      h: ld,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), m && n.push({
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
    const _ = /* @__PURE__ */ new Map();
    let I = 0;
    for (const v of a.steps) {
      const T = l.get(v.id) ?? 0;
      I = Math.max(I, T);
      const D = _.get(T) ?? 0;
      _.set(T, D + 1);
      const $ = t[v.id] ?? {
        x: w.x + (T + 1) * Fi,
        y: r + (D - (c.get(T) - 1) / 2) * Vi
      }, b = o(v.targetUseCaseId);
      i.push({
        id: v.id,
        label: v.name,
        x: $.x,
        y: $.y,
        w: Hi,
        h: cd,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: b ? `→ ${b}` : "∅ sin use case",
        tooltip: `${v.name}${v.emittedEventName ? ` · emite ${v.emittedEventName}` : ""}${b ? ` · lanza ${b}` : ""}${v.completionEventName ? ` · espera ${v.completionEventName}` : ""}`
      });
      const S = (v.dependsOnStepIds ?? []).filter((C) => d.has(C));
      S.length === 0 && n.push({
        id: `wfs:${a.id}:${v.id}`,
        sourceId: a.id,
        targetId: v.id,
        kind: "workflow-start",
        label: v.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const C of S)
        n.push({
          id: `wfdep:${C}->${v.id}`,
          sourceId: C,
          targetId: v.id,
          kind: "workflow-dependency",
          label: v.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${v.name} espera a ${((A = d.get(C)) == null ? void 0 : A.name) ?? C}`
        });
    }
    if (a.onCompletionEventName) {
      const v = `done:${a.id}`, T = t[v] ?? { x: w.x + (I + 2) * Fi, y: r };
      i.push({
        id: v,
        label: a.onCompletionEventName,
        x: T.x,
        y: T.y,
        w: Hi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const D = new Set(a.steps.flatMap((b) => b.dependsOnStepIds ?? [])), $ = a.steps.filter((b) => !D.has(b.id));
      for (const b of $.length ? $ : [])
        n.push({
          id: `wfd:${a.id}:${b.id}`,
          sourceId: b.id,
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
    r += Math.max(2, h + 1) * Vi + 60;
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
const Zt = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, vd = Object.keys(Zt), xd = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], _d = ["CORE", "SUPPORTING", "GENERIC"];
function Id(e, t = 48) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let a = r + 1; a < e.length; a++) {
        const d = e[r], l = e[a], c = i.get(d.id), h = i.get(l.id), m = h.x - c.x, w = h.y - c.y, _ = (d.w + l.w) / 2 + t - Math.abs(m), I = (d.h + l.h) / 2 + t - Math.abs(w);
        if (!(_ <= 0 || I <= 0))
          if (o = !0, _ < I) {
            const A = (m >= 0 ? 1 : -1) * _ / 2;
            c.x -= A, h.x += A;
          } else {
            const A = (w >= 0 ? 1 : -1) * I / 2;
            c.y -= A, h.y += A;
          }
      }
    if (!o) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const s of e) {
    const o = i.get(s.id);
    (Math.abs(o.x - s.x) > 0.5 || Math.abs(o.y - s.y) > 0.5) && n.set(s.id, o);
  }
  return n;
}
const q = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function $d(e, t) {
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
function bd(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let O = class extends Ae {
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
    return Mn(this.layout[e]);
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
    this._detail = e, e === "contexts" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module");
    const t = this.viewLayout("context-map"), i = this.sceneFor("context-map").nodes.filter((r) => !r.parentId), n = Id(i), s = [...n.keys()].map((r) => ({
      kind: "move-node",
      view: "context-map",
      id: r,
      pos: t.nodes[r] ?? null
    })), o = { ...t.nodes };
    for (const [r, a] of n) {
      const d = i.find((c) => c.id === r), l = t.nodes[r] ?? { x: d.x, y: d.y };
      o[r] = {
        x: Math.round(l.x + (a.x - d.x)),
        y: Math.round(l.y + (a.y - d.y))
      };
    }
    this.writeViewLayout("context-map", { ...t, nodes: o, detail: e }), s.length && this.pushUndoEntry(s);
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
    const d = this.sceneFor(s), l = d.nodes.find((h) => h.id === t);
    if (l != null && l.parentId) {
      const h = d.nodes.find((m) => m.id === l.parentId);
      h && (a = { x: i - h.x, y: n - h.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const c = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const m = this.inverseOf(h);
        m && c.unshift(...m), this.command(h, !1);
      }
    }
    this.pushUndoEntry(c);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((_) => _.id === t) ?? (this.model.proxyApis ?? []).find((_) => _.id === t);
    if (!o || i && !this.model.externalSystems.some((_) => _.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const d = this._view, l = this.viewLayout(d), c = this.sceneFor(d), h = a ? c.nodes.find((_) => _.id === a) : void 0, m = h ? { x: n - h.x, y: s - h.y } : { x: n, y: s }, w = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: d, id: t, pos: l.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(d, { ...l, nodes: { ...l.nodes, [t]: m } }), this.pushUndoEntry(w);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((_) => _.id === t), r = this.model.externalSystems.find((_) => _.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (_) => _.targetApiId === t && _.publishedByExternalSystemId === i
    )) return;
    const d = `proxy-${q(o.name)}-${q(r.name)}`;
    if ((this.model.proxyApis ?? []).some((_) => _.id === d)) return;
    const l = this._view, c = this.viewLayout(l), m = this.sceneFor(l).nodes.find((_) => _.id === i);
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
    const w = [{ kind: "remove-proxy-api", id: d }];
    m && (w.push({ kind: "move-node", view: l, id: d, pos: c.nodes[d] ?? null }), this.writeViewLayout(l, {
      ...c,
      nodes: { ...c.nodes, [d]: { x: n - m.x, y: s - m.y } }
    })), this.pushUndoEntry(w);
  }
  /**
   * Where an imported contract lands: the selected API — or, with a proxy
   * selected, the API it fronts (a proxy has no operations of its own).
   */
  selectedApiId() {
    if (!this._selectedId) return null;
    if ((this.model.apis ?? []).some((t) => t.id === this._selectedId))
      return this._selectedId;
    const e = (this.model.proxyApis ?? []).find((t) => t.id === this._selectedId);
    return (e == null ? void 0 : e.targetApiId) ?? null;
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
      let c = { x: d, y: l };
      const h = s.nodes.find((m) => m.id === a);
      if (h != null && h.parentId) {
        const m = s.nodes.find((w) => w.id === h.parentId);
        m && (c = { x: d - m.x, y: l - m.y });
      }
      o[a] = c;
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
    var c;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((h) => h.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((c = a.sizes) == null ? void 0 : c[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...d.map((h) => ({ kind: "move-node", view: r, id: h.id, pos: a.nodes[h.id] ?? null }))
    ]);
    const l = { ...a.nodes, [t]: { x: i, y: n } };
    for (const h of d) l[h.id] = { x: h.x - i, y: h.y - n };
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
    const i = ui(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
      const $ = this.owningWorkflowOf(t), b = this.owningWorkflowOf(i);
      if (!$ || $ !== b || t === i) return;
      const S = $.steps.find((C) => C.id === i);
      if (((S == null ? void 0 : S.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: $.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = new Set((this.model.aiAgents ?? []).map(($) => $.id));
    if (o.has(t)) {
      if (new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((C) => C.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (C) => C.agentId === t && C.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((S) => (S.useCases ?? []).map((C) => C.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (C) => C.agentId === t && C.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((S) => S.id === i) && ((this.model.agentRags ?? []).some(
        (C) => C.agentId === t && C.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    const r = (this.model.rags ?? []).find(($) => $.id === t);
    if (r) {
      new Set(
        this.model.modules.flatMap((b) => (b.readModels ?? []).map((S) => S.id))
      ).has(i) && !(r.sourceReadModelIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some(($) => $.id === i)) return;
    if ((this.model.proxyApis ?? []).some(($) => $.id === t)) {
      const $ = (this.model.proxyApis ?? []).find((b) => b.id === t);
      if ((this.model.apis ?? []).some((b) => b.id === i)) {
        $.targetApiId !== i && this.command({ kind: "set-proxy-target", id: t, targetId: i });
        return;
      }
      this.model.externalSystems.some((b) => b.id === i) && $.publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if ((this.model.apis ?? []).some(($) => $.id === t)) {
      this.model.externalSystems.some(($) => $.id === i) && (this.model.apis ?? []).find((b) => b.id === t).publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if (o.has(i)) return;
    const a = new Set((this.model.actors ?? []).map(($) => $.id));
    if (a.has(t)) {
      const $ = new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((C) => C.id))
      ), b = new Set(
        this.model.modules.flatMap((S) => (S.queryServices ?? []).map((C) => C.id))
      );
      if ($.has(i) || b.has(i)) {
        (this.model.actorUses ?? []).some(
          (C) => C.actorId === t && C.targetId === i
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aggregates ?? []).some((S) => S.id === i)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: i });
        return;
      }
      if (this.model.externalSystems.some((S) => S.id === i)) {
        (this.model.actorExternalDependencies ?? []).some(
          (C) => C.actorId === t && C.externalSystemId === i
        ) || this.command({ kind: "add-actor-external", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    const d = this.owningApiOf(t);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((b) => (b.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: d.id,
          id: t,
          targetUseCaseId: i
        });
        return;
      }
      if (this.model.modules.some((b) => b.id === i)) {
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
    const l = this.model.externalSystems.flatMap(($) => $.useCases ?? []).find(($) => $.id === t), c = this.model.externalSystems.flatMap(($) => $.tables ?? []).find(($) => $.id === t);
    if (l || c) {
      const $ = (l ?? c).name, b = l ? { externalUseCaseId: t } : { externalTableId: t }, S = (K) => l ? K.sourceExternalUseCaseId === t : K.sourceExternalTableId === t, C = this.model.modules.flatMap((K) => K.readModels ?? []).find((K) => K.id === i);
      if (C) {
        (this.model.projections ?? []).some(
          (W) => S(W) && W.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q($)}-${q(C.name)}`,
          name: `${C.name}Projection`,
          ...b,
          targetId: i
        });
        return;
      }
      const Y = this.model.modules.find((K) => K.id === i);
      if (Y) {
        (this.model.projections ?? []).some(
          (W) => S(W) && W.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q($)}-${q(Y.name)}`,
          name: `${$}ViewProjection`,
          ...b,
          moduleId: i,
          readModelName: `${$}View`
        });
        return;
      }
      return;
    }
    const h = (this.model.aggregates ?? []).find(($) => $.id === t);
    if (h) {
      const $ = this.model.modules.flatMap((S) => S.readModels ?? []).find((S) => S.id === i);
      if ($) {
        (this.model.projections ?? []).some(
          (C) => C.sourceAggregateId === t && C.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(h.name)}-${q($.name)}`,
          name: `${$.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const b = this.model.modules.find((S) => S.id === i);
      if (b) {
        (this.model.projections ?? []).some(
          (C) => C.sourceAggregateId === t && C.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(h.name)}-${q(b.name)}`,
          name: `${h.name}ViewProjection`,
          aggregateId: t,
          moduleId: i,
          readModelName: `${h.name}View`
        });
        return;
      }
    }
    const m = new Set(
      this.model.modules.flatMap(($) => ($.domainEvents ?? []).map((b) => b.id))
    ), w = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map(($) => $.id),
      ...this.model.modules.flatMap(($) => ($.domainServices ?? []).map((b) => b.id))
    ]), _ = new Set(
      this.model.modules.flatMap(($) => ($.applicationEvents ?? []).map((b) => b.id))
    ), I = new Set(this.model.modules.flatMap(($) => ($.useCases ?? []).map((b) => b.id))), A = new Set(
      this.model.modules.flatMap(($) => ($.queryServices ?? []).map((b) => b.id))
    );
    if (I.has(t) && A.has(i)) {
      (this.model.queryCalls ?? []).some(
        (b) => b.sourceId === t && b.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const v = new Set(
      this.model.externalSystems.flatMap(($) => ($.useCases ?? []).map((b) => b.id))
    );
    if (I.has(t) && v.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (b) => b.sourceId === t && b.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (I.has(t) && I.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        (b) => b.sourceId === t && b.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (w.has(t) && m.has(i) || I.has(t) && _.has(i)) {
      (this.model.emissions ?? []).some(
        (b) => b.sourceId === t && b.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (m.has(t) || _.has(t)) {
      const $ = _.has(t), b = this.model.modules.flatMap((y) => ($ ? y.applicationEvents : y.domainEvents) ?? []).find((y) => y.id === t), S = this.model.modules.flatMap((y) => (y.useCases ?? []).map((g) => ({ u: g, module: y }))).find(({ u: y }) => y.id === i), C = this.model.modules.flatMap((y) => (y.readModels ?? []).map((g) => ({ rm: g, module: y }))).find(({ rm: y }) => y.id === i), Y = this.model.modules.find((y) => y.id === i) ?? (C == null ? void 0 : C.module) ?? (S == null ? void 0 : S.module);
      if (!b || !Y) return;
      const K = new Set((this.model.aggregates ?? []).map((y) => y.id)), W = new Set(
        this.model.modules.flatMap((y) => (y.domainServices ?? []).map((g) => g.id))
      ), J = (this.model.emissions ?? []).find(
        (y) => y.domainEventId === t && ($ ? I.has(y.sourceId) : K.has(y.sourceId) || W.has(y.sourceId))
      );
      if (!J) {
        this.emit("modux-notice", {
          message: $ ? `Declara primero qué caso de uso publica ${b.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${b.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const te = !$ && K.has(J.sourceId);
      if (S) {
        if (this.model.flows.some(
          (g) => g.archetype === "TRIGGERS" && g.triggerEvent === b.name && g.targetUseCaseId === S.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(b.name)}-${q(S.u.name)}`,
          name: S.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: te ? J.sourceId : "",
          triggerDomainServiceId: !$ && !te ? J.sourceId : void 0,
          triggerUseCaseId: $ ? J.sourceId : void 0,
          triggerEvent: b.name,
          targetId: Y.id,
          targetUseCaseId: S.u.id
        });
        return;
      }
      const f = (C == null ? void 0 : C.rm.name) ?? `${b.name}View`;
      if (this.model.flows.some(
        (y) => y.archetype === "MATERIALIZES" && y.triggerEvent === b.name && y.targetId === Y.id && y.readModelName === f
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${q(b.name)}-${q(f)}`,
        name: f,
        archetype: "MATERIALIZES",
        triggerAggregateId: te ? J.sourceId : "",
        triggerDomainServiceId: !$ && !te ? J.sourceId : void 0,
        triggerUseCaseId: $ ? J.sourceId : void 0,
        triggerEvent: b.name,
        targetId: Y.id,
        readModelName: f
      });
      return;
    }
    const T = /* @__PURE__ */ new Set([
      ...w,
      ...I,
      ...A,
      ...this.model.modules.flatMap(($) => ($.readModels ?? []).map((b) => b.id))
    ]);
    if (T.has(t) || T.has(i) || m.has(i) || _.has(i))
      return;
    const D = new Set(this.model.externalSystems.map(($) => $.id));
    if (D.has(t)) {
      if (new Set(
        this.model.modules.flatMap((b) => (b.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.externalCalls ?? []).some(
          (S) => S.externalSystemId === t && S.useCaseId === i
        ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i });
        return;
      }
      if (D.has(i) && i !== t) {
        (this.model.externalSystemDependencies ?? []).some(
          (S) => S.sourceId === t && S.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.apis ?? []).some((b) => b.id === i) || (this.model.proxyApis ?? []).some((b) => b.id === i)) {
        (this.model.externalSystemDependencies ?? []).some(
          (S) => S.sourceId === t && S.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    D.has(i) || a.has(i);
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
      id: `step-${q(e)}`,
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${q(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
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
    const t = e.detail.kind === "process-step" ? bd(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : $d(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, n, s, o, r, a, d, l, c, h, m, w, _, I, A, v, T, D, $, b, S, C, Y, K, W, J, te, f, p, y;
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
        else if (this._newContextMapKind === "api")
          this.command({ kind: "add-api", id: `api-${q(e)}`, name: e });
        else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${q(e)}`, name: e });
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const g = (t = (this.model.apis ?? []).find((k) => k.id === this._selectedId)) == null ? void 0 : t.id, x = this._newApiId || g || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id);
          if (!x) return;
          this.command({
            kind: "add-api-operation",
            apiId: x,
            id: `apiop-${x.replace(/^api-/, "")}-${q(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const g = (s = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : s.id, x = this._newModuleId || g || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!x) return;
          this.command({ kind: "add-domain-event", id: `ev-${q(e)}`, name: e, moduleId: x });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const g = (r = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : r.id, x = this._newModuleId || g || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!x) return;
          this.command({ kind: "add-application-event", id: `aev-${q(e)}`, name: e, moduleId: x });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const g = (d = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : d.id, x = this._newModuleId || g || ((l = this.model.modules[0]) == null ? void 0 : l.id);
          if (!x) return;
          this.command({ kind: "add-domain-service", id: `ds-${q(e)}`, name: e, moduleId: x });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const g = (c = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : c.id, x = this._newModuleId || g || ((h = this.model.modules[0]) == null ? void 0 : h.id);
          if (!x) return;
          this.command({ kind: "add-query-service", id: `qs-${q(e)}`, name: e, moduleId: x });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const g = (m = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : m.id, x = this._newModuleId || g || ((w = this.model.modules[0]) == null ? void 0 : w.id);
          if (!x) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: x });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const g = (_ = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : _.id, x = this._newModuleId || g || ((I = this.model.modules[0]) == null ? void 0 : I.id);
          if (!x) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: x, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const g = (A = this.model.externalSystems.find((k) => k.id === this._selectedId)) == null ? void 0 : A.id, x = this._newExternalId || g || ((v = this.model.externalSystems[0]) == null ? void 0 : v.id);
          if (!x) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${q(e)}`,
            name: e,
            moduleId: x
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const g = (T = this.model.externalSystems.find((k) => k.id === this._selectedId)) == null ? void 0 : T.id, x = this._newExternalId || g || ((D = this.model.externalSystems[0]) == null ? void 0 : D.id);
          if (!x) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${q(e)}`,
            name: e,
            moduleId: x
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const g = ($ = (this.model.aggregates ?? []).find((k) => k.id === this._selectedId)) == null ? void 0 : $.id, x = this._newAggregateId || g || ((S = (b = this.model.aggregates) == null ? void 0 : b[0]) == null ? void 0 : S.id);
          if (!x) return;
          this.command({ kind: "add-read-model", id: `rm-${q(e)}`, name: e, aggregateId: x });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${q(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const g = this._newModuleId || ((C = this.model.modules[0]) == null ? void 0 : C.id);
        if (!g) return;
        this.command({ kind: "add-aggregate", id: `agg-${q(e)}`, name: e, moduleId: g });
      } else if (this._view === "flows") {
        const g = this._newTriggerAggId || ((K = (Y = this.model.aggregates) == null ? void 0 : Y[0]) == null ? void 0 : K.id), x = this._newTargetId || ((W = this.model.modules[0]) == null ? void 0 : W.id), k = this._newTriggerEvent.trim();
        if (!g || !x || !k) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: g,
          triggerEvent: k,
          targetId: x
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const g = this._newModuleId || ((J = this.model.modules[0]) == null ? void 0 : J.id);
        if (!g) return;
        this.command({
          kind: "add-process",
          id: `proc-${q(e)}`,
          name: e,
          moduleId: g,
          triggerAggregateId: this._newTriggerAggId || ((f = (te = this.model.aggregates) == null ? void 0 : te[0]) == null ? void 0 : f.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${q(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((y = (p = this.model.aggregates) == null ? void 0 : p[0]) == null ? void 0 : y.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Yn(i, t.nodes) : e === "flows" ? ns(i, t.nodes) : e === "processes" ? ui(i, t.nodes) : e === "workflows" ? md(i, t.nodes) : e === "eventstorming" ? ad(i, t.nodes) : Hn(i, t.nodes, this._detail, t.sizes ?? {});
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
    return N`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <div class="tabs">
          ${xd.map(
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
        ${this._activeViewId ? N`
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
      (t) => N`<option value="${t.name} (${t.id})">${t.kind}</option>`
    )}
              </datalist>
              <button class="tab" title="Añadir el elemento a la vista" @click=${this.addMemberFromToolbar}>
                ＋ Añadir
              </button>
            ` : ""}
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
              ${this._detail !== "contexts" ? N`
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
        ${this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table") ? N`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "api-operation" ? N`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, n;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "read-model" ? N`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
              ${_d.map(
      (t) => N`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? N`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? N`
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
        var i, n;
        return N`<option
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
              ${this._view === "flows" ? N`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return N`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? N`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP"].map(
      (t) => N`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? N`
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
      (t) => N`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? N`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => N`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._view === "context-map" ? N`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? N`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? N`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : N`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return N`
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
    return N`
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
      (n) => N`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Zt[n].abbr}</span>
              <span class="name">${Zt[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
O.styles = ei`
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
  he({ attribute: !1 })
], O.prototype, "model", 2);
U([
  he({ attribute: !1 })
], O.prototype, "layout", 2);
U([
  he({ attribute: !1 })
], O.prototype, "diff", 2);
U([
  P()
], O.prototype, "_view", 2);
U([
  P()
], O.prototype, "_detail", 2);
U([
  P()
], O.prototype, "_relationType", 2);
U([
  P()
], O.prototype, "_relationPicker", 2);
U([
  P()
], O.prototype, "_selectedId", 2);
U([
  P()
], O.prototype, "_newName", 2);
U([
  P()
], O.prototype, "_newSubdomain", 2);
U([
  P()
], O.prototype, "_newModuleId", 2);
U([
  P()
], O.prototype, "_newContextMapKind", 2);
U([
  P()
], O.prototype, "_newAggregateId", 2);
U([
  P()
], O.prototype, "_newExternalId", 2);
U([
  P()
], O.prototype, "_newApiId", 2);
U([
  P()
], O.prototype, "_newArchetype", 2);
U([
  P()
], O.prototype, "_newTriggerAggId", 2);
U([
  P()
], O.prototype, "_newTriggerEvent", 2);
U([
  P()
], O.prototype, "_newTargetId", 2);
U([
  P()
], O.prototype, "_undoStack", 2);
U([
  P()
], O.prototype, "_redoStack", 2);
U([
  P()
], O.prototype, "_newStepName", 2);
U([
  P()
], O.prototype, "_newStepType", 2);
U([
  P()
], O.prototype, "_newStepRole", 2);
U([
  P()
], O.prototype, "_newStepDeadline", 2);
U([
  P()
], O.prototype, "_editStepRole", 2);
U([
  P()
], O.prototype, "_editStepDeadline", 2);
U([
  P()
], O.prototype, "_editStepComp", 2);
U([
  P()
], O.prototype, "_newStepUseCase", 2);
U([
  P()
], O.prototype, "_newStepEmits", 2);
U([
  P()
], O.prototype, "_editStepUseCase", 2);
U([
  P()
], O.prototype, "_editStepEmits", 2);
U([
  P()
], O.prototype, "_editStepAwaits", 2);
U([
  P()
], O.prototype, "_multi", 2);
U([
  P()
], O.prototype, "_newViewName", 2);
U([
  P()
], O.prototype, "_activeViewId", 2);
U([
  P()
], O.prototype, "_newRagSourceType", 2);
U([
  P()
], O.prototype, "_newRagSourceUri", 2);
U([
  P()
], O.prototype, "_addMemberKey", 2);
U([
  P()
], O.prototype, "_deletePicker", 2);
O = U([
  ni("modux-editor")
], O);
var kd = Object.defineProperty, Ed = Object.getOwnPropertyDescriptor, ae = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ed(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && kd(t, i, s), s;
};
let ne = class extends Ae {
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
    return this._error ? N`<div class="status error">modux editor: ${this._error}</div>` : this._model ? N`
      ${this._workspace ? N`
            <div class="workspace">
              <label>Modelo:</label>
              <select @change=${this.onWorkspaceSelect} title="Sistema (as-is) o una solución (to-be)">
                <option value="main" ?selected=${this._workspace.system}>Sistema (as-is)</option>
                ${this._workspace.solutions.map(
      (t) => N`<option value=${t.branch} ?selected=${t.branch === this._workspace.current}>
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
      return N`<span
                      class="badge solution"
                      title=${i.length ? `Eliminados respecto al sistema: ${i.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${t("ADDED")} ～${t("MODIFIED")} －${t("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? N`
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
      return N`
                      ${t === "EXPLORING" ? N`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${t === "PROPOSED" ? N`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${t === "APPROVED" ? N`<button
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
      ${this._mergeFlow ? N`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (t) => N`
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
ne.styles = ei`
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
], ne.prototype, "base", 2);
ae([
  P()
], ne.prototype, "_model", 2);
ae([
  P()
], ne.prototype, "_layout", 2);
ae([
  P()
], ne.prototype, "_error", 2);
ae([
  P()
], ne.prototype, "_saving", 2);
ae([
  P()
], ne.prototype, "_toast", 2);
ae([
  P()
], ne.prototype, "_workspace", 2);
ae([
  P()
], ne.prototype, "_creatingSolution", 2);
ae([
  P()
], ne.prototype, "_newSolutionName", 2);
ae([
  P()
], ne.prototype, "_diff", 2);
ae([
  P()
], ne.prototype, "_mergeFlow", 2);
ne = ae([
  ni("modux-editor-connected")
], ne);
export {
  Sd as CONTAINER_HEADER,
  Ad as CONTAINER_INSET,
  Z as ModuxCanvas,
  O as ModuxEditor,
  ne as ModuxEditorConnected,
  Yn as aggregatesScene,
  zt as containerFit,
  Cn as containerMinSize,
  Hn as contextMapScene,
  Un as flowCoherence,
  ns as flowsScene,
  Mn as normalizeViewLayout,
  ui as processesScene,
  Ln as relationEdgeId
};
