const Ud = 34, Ld = 10;
function di(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let a = r + 1; a < e.length; a++) {
        const d = e[r], c = e[a], h = i.get(d.id), m = i.get(c.id), p = m.x - h.x, f = m.y - h.y, I = (d.w + c.w) / 2 + t - Math.abs(p), x = (d.h + c.h) / 2 + t - Math.abs(f);
        if (!(I <= 0 || x <= 0))
          if (o = !0, I < x) {
            const A = (p >= 0 ? 1 : -1) * I / 2;
            h.x -= A, m.x += A;
          } else {
            const A = (f >= 0 ? 1 : -1) * x / 2;
            h.y -= A, m.y += A;
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
function qn(e, t = { w: 160, h: 90 }) {
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
function Yt(e, t, i) {
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
function gt(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const Hn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Kn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Vn = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ze = 168, Je = 56, nn = 34, sn = 14, Fn = 14, ue = 108, he = 32, rn = 12, on = 10, rt = 2, Wn = rt * ue + (rt - 1) * rn + 2 * sn;
function Gn(e, t) {
  return `rel:${e}->${t}`;
}
function Bn(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function Be(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const jn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, an = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" },
  "query-service": { symbol: "lens", fill: "#f0f9ff", stroke: "#0284c7" },
  "external-use-case": { symbol: "usecase", fill: "#f8fafc", stroke: "#64748b" },
  "external-table": { symbol: "readmodel", fill: "#fefce8", stroke: "#a16207" },
  "mcp-server": { symbol: "robot", fill: "#faf5ff", stroke: "#9333ea" },
  "api-operation": { symbol: "usecase", fill: "#eef2ff", stroke: "#4f46e5" },
  api: { symbol: "interface", fill: "#eef2ff", stroke: "#4f46e5" },
  "proxy-api": { symbol: "interface", fill: "#ecfeff", stroke: "#0e7490" }
}, dn = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Query service",
  "external-use-case": "Caso de uso externo",
  "external-table": "Tabla (legacy)",
  "mcp-server": "Servidor MCP",
  "api-operation": "Operación de API",
  api: "API publicada por este sistema",
  "proxy-api": "Proxy/cache de una API, alojado en este sistema"
};
function Xt(e) {
  const t = Math.max(1, Math.ceil(e / rt)), i = t * he + (t - 1) * on;
  return { w: Wn, h: nn + i + Fn };
}
function _t(e, t) {
  const i = e % rt, n = Math.floor(e / rt);
  return {
    x: -t.w / 2 + sn + i * (ue + rn) + ue / 2,
    y: -t.h / 2 + nn + n * (he + on) + he / 2
  };
}
function Yn(e, t, i, n, s, o) {
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
  return a.length ? Qt(i, n, a, s, o) : [{ ...n, x: i.x, y: i.y, w: Ze, h: Je }];
}
function Xn(e, t, i, n, s, o) {
  const r = o[t.id] ?? Xt(i.length + n.length), a = i.map((p, f) => {
    const I = s[p.id] ?? _t(f, r), x = p.operations ?? [], A = o[p.id] ?? Xt(x.length), y = x.map((U, v) => s[U.id] ?? _t(v, A)), T = Yt(
      { x: I.x, y: I.y },
      A,
      y.map((U) => ({ dx: U.x, dy: U.y, w: ue, h: he }))
    );
    return { a: p, off: I, ops: x, opOffs: y, fit: T };
  }), d = n.map(
    (p, f) => s[p.id] ?? _t(i.length + f, r)
  ), c = di(
    [
      ...a.map((p) => ({ id: p.a.id, x: p.fit.x, y: p.fit.y, w: p.fit.w, h: p.fit.h })),
      ...n.map((p, f) => ({
        id: p.id,
        x: d[f].x,
        y: d[f].y,
        w: ue,
        h: he
      }))
    ],
    24
  );
  for (const p of a) {
    const f = c.get(p.a.id);
    f && (p.off = { x: p.off.x + (f.x - p.fit.x), y: p.off.y + (f.y - p.fit.y) }, p.fit = { ...p.fit, x: f.x, y: f.y });
  }
  n.forEach((p, f) => {
    const I = c.get(p.id);
    I && (d[f] = { x: I.x, y: I.y });
  });
  const h = Yt(e, r, [
    ...a.map((p) => ({ dx: p.fit.x, dy: p.fit.y, w: p.fit.w, h: p.fit.h })),
    ...d.map((p) => ({ dx: p.x, dy: p.y, w: ue, h: he }))
  ]), m = [
    { ...t, x: h.x, y: h.y, w: h.w, h: h.h, container: !0 }
  ];
  for (const p of a)
    m.push({
      id: p.a.id,
      label: p.a.name,
      kind: "api",
      symbol: "interface",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      badge: "API",
      container: !0,
      parentId: t.id,
      x: e.x + p.fit.x,
      y: e.y + p.fit.y,
      w: p.fit.w,
      h: p.fit.h,
      tooltip: `${p.a.name} — API publicada por ${t.label}`
    }), p.ops.forEach((f, I) => {
      m.push({
        id: f.id,
        label: f.name,
        kind: "api-operation",
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: p.a.id,
        x: e.x + p.off.x + p.opOffs[I].x,
        y: e.y + p.off.y + p.opOffs[I].y,
        w: ue,
        h: he,
        tooltip: `Operación de API ${f.name}`
      });
    });
  return n.forEach((p, f) => {
    const I = an[p.kind];
    m.push({
      id: p.id,
      label: p.name,
      kind: p.kind,
      x: e.x + d[f].x,
      y: e.y + d[f].y,
      w: ue,
      h: he,
      symbol: I.symbol,
      fill: I.fill,
      stroke: I.stroke,
      parentId: t.id,
      tooltip: `${dn[p.kind]} ${p.name}`
    });
  }), m;
}
function Qt(e, t, i, n, s) {
  const o = s[t.id] ?? Xt(i.length), r = i.map((m, p) => n[m.id] ?? _t(p, o)), a = di(
    i.map((m, p) => ({ id: m.id, x: r[p].x, y: r[p].y, w: ue, h: he })),
    10
  );
  i.forEach((m, p) => {
    const f = a.get(m.id);
    f && (r[p] = { x: f.x, y: f.y });
  });
  const d = Yt(
    e,
    o,
    r.map((m) => ({ dx: m.x, dy: m.y, w: ue, h: he }))
  ), c = {
    ...t,
    x: d.x,
    y: d.y,
    w: d.w,
    h: d.h,
    container: !0
  }, h = i.map((m, p) => {
    const f = r[p], I = m.policy ? jn : an[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: ue,
      h: he,
      symbol: I.symbol,
      fill: I.fill,
      stroke: I.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : dn[m.kind]} ${m.name}`
    };
  });
  return [c, ...h];
}
function Qn(e, t, i = "contexts", n = {}) {
  const s = i !== "contexts", o = i === "operations", r = new Set(e.externalSystems.map((u) => u.id)), a = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && r.has(u.publishedByExternalSystemId)
  ), d = new Set(a.map((u) => u.id)), c = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && r.has(u.publishedByExternalSystemId)
  ), h = new Set(c.map((u) => u.id)), m = [
    ...e.modules.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((u) => !d.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((u) => !h.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 }))
  ], p = m.flatMap((u, D) => {
    const K = t[u.ref.id] ?? Be(D, m.length);
    if (u.proxy) {
      const j = u.ref;
      return [{
        id: j.id,
        label: j.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${j.name} — proxy/cache de una API, consumible como ella`,
        x: K.x,
        y: K.y,
        w: Ze,
        h: Je
      }];
    }
    if (u.api) {
      const j = u.ref, xe = {
        id: j.id,
        label: j.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${j.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return s && j.operations.length > 0 ? Qt(
        K,
        xe,
        j.operations.map(
          (_e) => ({ id: _e.id, name: _e.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{ ...xe, x: K.x, y: K.y, w: Ze, h: Je }];
    }
    if (u.external) {
      const j = u.ref, xe = {
        id: j.id,
        label: j.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${j.name} (sistema externo)`
      }, _e = a.filter((G) => G.publishedByExternalSystemId === j.id), We = [
        ...c.filter((G) => G.publishedByExternalSystemId === j.id).map((G) => ({ id: G.id, name: G.name, kind: "proxy-api" })),
        ...s ? [
          ...(j.useCases ?? []).map(
            (G) => ({ id: G.id, name: G.name, kind: "external-use-case" })
          ),
          ...(j.tables ?? []).map(
            (G) => ({ id: G.id, name: G.name, kind: "external-table" })
          ),
          ...(j.mcpServers ?? []).map(
            (G) => ({ id: G.id, name: G.name, kind: "mcp-server" })
          )
        ] : []
      ];
      if (o && _e.length > 0)
        return Xn(
          K,
          xe,
          _e,
          We,
          t,
          n
        );
      const Ge = [
        ..._e.map((G) => ({ id: G.id, name: G.name, kind: "api" })),
        ...We
      ];
      return Ge.length > 0 ? Qt(K, xe, Ge, t, n) : [{ ...xe, x: K.x, y: K.y, w: Ze, h: Je }];
    }
    const Q = u.ref, ve = Q.subdomainType ?? "GENERIC", fe = {
      id: Q.id,
      label: Q.name,
      kind: "module",
      symbol: "component",
      fill: Hn[ve],
      stroke: "#94a3b8",
      badge: ve,
      tooltip: `${Q.name} — subdominio ${ve}`
    };
    return s ? Yn(e, Q, K, fe, t, n) : [{ ...fe, x: K.x, y: K.y, w: Ze, h: Je }];
  }), f = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((u, D) => {
    const K = t[u.id] ?? Be(m.length + D, f);
    p.push({
      id: u.id,
      label: u.name,
      x: K.x,
      y: K.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${u.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((u, D) => {
    const K = t[u.id] ?? Be(m.length + (e.actors ?? []).length + D, f);
    p.push({
      id: u.id,
      label: u.name,
      x: K.x,
      y: K.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: u.external ? "#ffffff" : "#faf5ff",
      stroke: "#9333ea",
      dashed: !!u.external,
      badge: u.external ? "AGENTE IA EXT." : "AGENTE IA",
      tooltip: u.external ? `${u.name} (agente de IA externo — entra por un gateway MCP)` : `${u.name} (agente de IA — consume por MCP)`
    });
  }), (e.mcpGateways ?? []).forEach((u, D) => {
    const K = t[u.id] ?? Be(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + D,
      f
    );
    p.push({
      id: u.id,
      label: u.name,
      x: K.x,
      y: K.y,
      w: 148,
      h: 48,
      kind: "mcp-gateway",
      symbol: "plug",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: "GATEWAY MCP",
      tooltip: `${u.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`
    });
  });
  const I = [];
  (e.rags ?? []).forEach((u, D) => {
    const K = t[u.id] ?? Be(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + D,
      f
    );
    p.push({
      id: u.id,
      label: u.name,
      x: K.x,
      y: K.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${u.name} (base de conocimiento — retrieval para agentes)`
    }), (u.contentSources ?? []).forEach((Q, ve) => {
      const fe = `ragcs:${u.id}:${Q.uri}`, j = t[fe] ?? { x: K.x + 170, y: K.y - 30 + ve * 44 };
      p.push({
        id: fe,
        label: Q.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: j.x,
        y: j.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: Q.type,
        tooltip: `${Q.type}: ${Q.uri}`
      }), I.push({
        id: `ragcse:${u.id}:${Q.uri}`,
        sourceId: fe,
        targetId: u.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), p.sort((u, D) => (u.parentId ? 1 : 0) - (D.parentId ? 1 : 0));
  const x = e.relations.map((u) => ({
    id: Gn(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? Kn[u.type] : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), A = e.flows.map((u) => {
    var j, xe, _e, qt, We, Ge;
    const D = Bn(e, u), K = s ? e.modules.find((G) => G.id === u.sourceId) : void 0, Q = ((j = K == null ? void 0 : K.domainEvents) == null ? void 0 : j.find((G) => G.name === u.triggerEvent)) ?? ((xe = K == null ? void 0 : K.applicationEvents) == null ? void 0 : xe.find((G) => G.name === u.triggerEvent)), ve = s && u.readModelName ? (qt = (_e = e.modules.find((G) => G.id === u.targetId)) == null ? void 0 : _e.readModels) == null ? void 0 : qt.find((G) => G.name === u.readModelName) : void 0, fe = s && u.targetUseCaseId ? (Ge = (We = e.modules.find((G) => G.id === u.targetId)) == null ? void 0 : We.useCases) == null ? void 0 : Ge.find((G) => G.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (Q == null ? void 0 : Q.id) ?? u.sourceId,
      targetId: (fe == null ? void 0 : fe.id) ?? (ve == null ? void 0 : ve.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: Vn[D],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${D}`
    };
  }), y = new Set(p.map((u) => u.id)), T = s ? (e.emissions ?? []).filter((u) => y.has(u.sourceId) && y.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], U = s ? (e.projections ?? []).map((u) => ({
    p: u,
    source: u.sourceAggregateId ?? u.sourceExternalUseCaseId ?? u.sourceExternalTableId
  })).filter(({ p: u, source: D }) => D && u.readModelId).filter(({ p: u, source: D }) => y.has(D) && y.has(u.readModelId)).map(({ p: u, source: D }) => ({
    id: `proj:${u.id}`,
    sourceId: D,
    targetId: u.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: u.sourceAggregateId ? `Proyección ${u.name}: el estado del agregado se materializa en ${u.readModelName ?? u.readModelId}` : `Proyección ${u.name}: polling hacia ${u.readModelName ?? u.readModelId}`
  })) : [], v = (e.apis ?? []).flatMap(
    (u) => u.operations.flatMap((D) => {
      const K = s && y.has(D.id) ? D.id : u.id;
      if (!y.has(K)) return [];
      const Q = s && D.targetUseCaseId && y.has(D.targetUseCaseId) ? D.targetUseCaseId : D.targetModuleId && y.has(D.targetModuleId) ? D.targetModuleId : (D.targetUseCaseId && !s, null);
      return Q ? [
        {
          id: `apiwire:${D.id}`,
          sourceId: K,
          targetId: Q,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${D.name} la implementa ${Q}`
        }
      ] : [];
    })
  ), _ = s ? (e.useCaseCalls ?? []).filter((u) => y.has(u.sourceId) && y.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], S = s ? (e.queryCalls ?? []).filter((u) => y.has(u.sourceId) && y.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], C = s ? (e.actorUses ?? []).filter((u) => y.has(u.actorId) && y.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], W = (e.actorExternalDependencies ?? []).filter((u) => y.has(u.actorId) && y.has(u.externalSystemId)).map((u) => ({
    id: `extdep:${u.actorId}->${u.externalSystemId}`,
    sourceId: u.actorId,
    targetId: u.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), O = new Map([
    ...(e.apis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId])
  ]), R = (u) => y.has(u) ? u : O.get(u) ?? u, J = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((u) => ({
        sourceId: u.sourceId,
        targetId: R(u.targetId),
        cqrs: u.type === "CQRS"
      })).filter(
        (u) => y.has(u.sourceId) && y.has(u.targetId) && u.sourceId !== u.targetId
      ).map((u) => [
        `xdep:${u.sourceId}->${u.targetId}`,
        {
          id: `xdep:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "ext-dep",
          color: u.cqrs ? "#7c3aed" : "#64748b",
          label: u.cqrs ? "CQRS" : "dep",
          dashed: !0,
          arrow: !0,
          tooltip: u.cqrs ? "CQRS — consulta sobre sus datos" : "depende de"
        }
      ])
    ).values()
  ], ie = [
    ...new Map(
      (e.proxyApis ?? []).filter((u) => u.targetApiId).map((u) => ({ sourceId: R(u.id), targetId: R(u.targetApiId) })).filter(
        (u) => y.has(u.sourceId) && y.has(u.targetId) && u.sourceId !== u.targetId
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
  ], ne = s ? (e.agentUses ?? []).filter((u) => y.has(u.agentId) && y.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], l = (e.agentRags ?? []).filter((u) => y.has(u.agentId) && y.has(u.ragId)).map((u) => ({
    id: `agrag:${u.agentId}->${u.ragId}`,
    sourceId: u.agentId,
    targetId: u.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), g = s ? (e.rags ?? []).filter((u) => y.has(u.id)).flatMap(
    (u) => (u.sourceReadModelIds ?? []).filter((D) => y.has(D)).map((D) => ({
      id: `ragsrc:${u.id}->${D}`,
      sourceId: u.id,
      targetId: D,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name} indexa este read model`
    }))
  ) : [], w = s ? (e.agentExternalUses ?? []).filter((u) => y.has(u.agentId) && y.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], $ = s ? (e.agentMcpUses ?? []).filter((u) => y.has(u.agentId) && y.has(u.mcpServerId)).map((u) => ({
    id: `mcpsv:${u.agentId}->${u.mcpServerId}`,
    sourceId: u.agentId,
    targetId: u.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], b = (e.mcpGateways ?? []).flatMap(
    (u) => [
      ...u.mcpServerIds ?? [],
      ...u.apiIds ?? [],
      ...u.apiOperationIds ?? [],
      ...u.useCaseIds ?? [],
      ...u.ragIds ?? []
    ].filter((D) => y.has(u.id) && y.has(D)).map((D) => ({
      id: `gwx:${u.id}->${D}`,
      sourceId: u.id,
      targetId: D,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), E = (e.agentGatewayUses ?? []).filter((u) => y.has(u.agentId) && y.has(u.gatewayId)).map((u) => ({
    id: `aggw:${u.agentId}->${u.gatewayId}`,
    sourceId: u.agentId,
    targetId: u.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), k = s ? (e.agentApiOpUses ?? []).filter((u) => y.has(u.agentId) && y.has(u.apiOperationId)).map((u) => ({
    id: `agapi:${u.agentId}->${u.apiOperationId}`,
    sourceId: u.agentId,
    targetId: u.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], P = s ? (e.agentQueryUses ?? []).filter((u) => y.has(u.agentId) && y.has(u.queryServiceId)).map((u) => ({
    id: `agqs:${u.agentId}->${u.queryServiceId}`,
    sourceId: u.agentId,
    targetId: u.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], F = (e.agentDelegations ?? []).filter((u) => y.has(u.agentId) && y.has(u.delegateAgentId)).map((u) => ({
    id: `agag:${u.agentId}->${u.delegateAgentId}`,
    sourceId: u.agentId,
    targetId: u.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), B = (e.actorAgentUses ?? []).filter((u) => y.has(u.actorId) && y.has(u.agentId)).map((u) => ({
    id: `useag:${u.actorId}->${u.agentId}`,
    sourceId: u.actorId,
    targetId: u.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Y = s ? (e.agentTriggers ?? []).filter((u) => y.has(u.eventId) && y.has(u.agentId)).map((u) => ({
    id: `evag:${u.eventId}->${u.agentId}`,
    sourceId: u.eventId,
    targetId: u.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], oe = s ? (e.externalCalls ?? []).filter((u) => y.has(u.externalSystemId) && y.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], ce = s ? (e.externalUseCaseCalls ?? []).filter((u) => y.has(u.sourceId) && y.has(u.targetId)).map((u) => ({
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
    nodes: p,
    edges: [
      ...x,
      ...A,
      ...T,
      ...U,
      ...v,
      ..._,
      ...S,
      ...C,
      ...W,
      ...J,
      ...ie,
      ...ne,
      ...w,
      ...$,
      ...b,
      ...E,
      ...k,
      ...P,
      ...F,
      ...B,
      ...Y,
      ...l,
      ...g,
      ...I,
      ...oe,
      ...ce
    ]
  };
}
const Zn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Jn = 176, es = 60, ts = 140, is = 40;
function ns(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((d) => d.moduleId === s.id).forEach((d, c) => {
      const h = n.filter((p) => p.aggregateId === d.id).length, m = 140 + c * (170 + h * 60);
      t[d.id] = { x: r, y: m }, n.filter((p) => p.aggregateId === d.id).forEach((p, f) => {
        t[p.id] = { x: r + 60, y: m + 100 + f * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function ss(e, t) {
  const i = ns(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const h = s.get(c.moduleId), m = (h == null ? void 0 : h.subdomainType) ?? "GENERIC", p = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: Jn,
      h: es,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Zn[m],
      stroke: "#64748b",
      badge: h ? `${h.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${h ? ` — módulo ${h.name} (${m})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const h = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: h.x,
      y: h.y,
      w: ts,
      h: is,
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
  })), d = (e.aggregateReferences ?? []).map((c, h) => ({
    id: `aggref:${h}:${c.sourceAggregateId}->${c.targetAggregateId}`,
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
    edges: [...a, ...d]
  };
}
const rs = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, os = 150, as = 44, ds = 190, ls = 56, cs = 160, us = 48;
function hs(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function ps(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, c;
    return ((c = (d = e.aggregates) == null ? void 0 : d.find((h) => h.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, d) => {
    const c = 120 + d * 130, h = rs[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const A = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : m,
        x: A.x,
        y: A.y,
        w: os,
        h: as,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const p = `flow:${a.id}`, f = t[p] ?? { x: 470, y: c };
    n.push({
      id: p,
      label: a.name,
      x: f.x,
      y: f.y,
      w: ds,
      h: ls,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const I = hs(e, a), x = `tgt:${I.id}`;
    if (!o.has(x)) {
      o.add(x);
      const A = t[x] ?? { x: 790, y: c };
      n.push({
        id: x,
        label: I.label,
        x: A.x,
        y: A.y,
        w: cs,
        h: us,
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
      sourceId: m,
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
      targetId: x,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const ms = 190, fs = 56, Ht = 170, gs = 52;
function _i(e, t) {
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
      w: ms,
      h: fs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((h, m) => {
      const p = h.type === "HUMAN", f = t[h.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: h.id,
        label: h.name,
        x: f.x,
        y: f.y,
        w: Ht,
        h: gs,
        kind: "process-step",
        symbol: p ? "person" : "gear",
        fill: p ? "#fef3c7" : "#ffffff",
        stroke: p ? "#d97706" : "#64748b",
        badge: p ? `HUMAN${h.roleId ? ` · ${h.roleId}` : ""}${h.deadline ? ` · ⏱ ${h.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${h.name}${h.useCaseId ? ` — use case ${h.useCaseId}` : ""}${h.deadline ? ` · deadline ${h.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${m}`,
        sourceId: c,
        targetId: h.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), h.compensationUseCaseId) {
        const I = `comp:${h.id}`, x = t[I] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: I,
          label: h.compensationUseCaseId,
          x: x.x,
          y: x.y,
          w: Ht,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${h.id}`,
          sourceId: h.id,
          targetId: I,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = h.id;
    }), o.onCompletionEventName) {
      const h = `done:${o.id}`, m = t[h] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: h,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Ht,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${o.id}`,
        sourceId: c,
        targetId: h,
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
const $t = globalThis, li = $t.ShadowRoot && ($t.ShadyCSS === void 0 || $t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ci = Symbol(), $i = /* @__PURE__ */ new WeakMap();
let ln = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== ci) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (li && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = $i.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && $i.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ys = (e) => new ln(typeof e == "string" ? e : e + "", void 0, ci), ui = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new ln(i, e, ci);
}, ws = (e, t) => {
  if (li) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = $t.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, ki = li ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ys(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Is, defineProperty: vs, getOwnPropertyDescriptor: xs, getOwnPropertyNames: _s, getOwnPropertySymbols: $s, getPrototypeOf: ks } = Object, Ae = globalThis, bi = Ae.trustedTypes, bs = bi ? bi.emptyScript : "", Kt = Ae.reactiveElementPolyfillSupport, it = (e, t) => e, At = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? bs : null;
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
} }, hi = (e, t) => !Is(e, t), Ei = { attribute: !0, type: String, converter: At, reflect: !1, useDefault: !1, hasChanged: hi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ae.litPropertyMetadata ?? (Ae.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ze = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ei) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && vs(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = xs(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ei;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    const t = ks(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))) {
      const i = this.properties, n = [..._s(i), ...$s(i)];
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
      for (const s of n) i.unshift(ki(s));
    } else t !== void 0 && i.push(ki(t));
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
    return ws(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : At).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : At;
      this._$Em = s;
      const c = d.fromAttribute(i, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? hi)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
ze.elementStyles = [], ze.shadowRootOptions = { mode: "open" }, ze[it("elementProperties")] = /* @__PURE__ */ new Map(), ze[it("finalized")] = /* @__PURE__ */ new Map(), Kt == null || Kt({ ReactiveElement: ze }), (Ae.reactiveElementVersions ?? (Ae.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis, Si = (e) => e, Ct = nt.trustedTypes, Ai = Ct ? Ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, cn = "$lit$", Se = `lit$${Math.random().toFixed(9).slice(2)}$`, un = "?" + Se, Es = `<${un}>`, De = document, ot = () => De.createComment(""), at = (e) => e === null || typeof e != "object" && typeof e != "function", pi = Array.isArray, Ss = (e) => pi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Vt = `[ 	
\f\r]`, je = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ci = /-->/g, Mi = />/g, Ce = RegExp(`>|${Vt}(?:([^\\s"'>=/]+)(${Vt}*=${Vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ni = /'/g, Pi = /"/g, hn = /^(?:script|style|textarea|title)$/i, pn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), M = pn(1), V = pn(2), He = Symbol.for("lit-noChange"), ee = Symbol.for("lit-nothing"), Ti = /* @__PURE__ */ new WeakMap(), Ne = De.createTreeWalker(De, 129);
function mn(e, t) {
  if (!pi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ai !== void 0 ? Ai.createHTML(t) : t;
}
const As = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = je;
  for (let a = 0; a < i; a++) {
    const d = e[a];
    let c, h, m = -1, p = 0;
    for (; p < d.length && (r.lastIndex = p, h = r.exec(d), h !== null); ) p = r.lastIndex, r === je ? h[1] === "!--" ? r = Ci : h[1] !== void 0 ? r = Mi : h[2] !== void 0 ? (hn.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = Ce) : h[3] !== void 0 && (r = Ce) : r === Ce ? h[0] === ">" ? (r = s ?? je, m = -1) : h[1] === void 0 ? m = -2 : (m = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? Ce : h[3] === '"' ? Pi : Ni) : r === Pi || r === Ni ? r = Ce : r === Ci || r === Mi ? r = je : (r = Ce, s = void 0);
    const f = r === Ce && e[a + 1].startsWith("/>") ? " " : "";
    o += r === je ? d + Es : m >= 0 ? (n.push(c), d.slice(0, m) + cn + d.slice(m) + Se + f) : d + Se + (m === -2 ? a : f);
  }
  return [mn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class dt {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [c, h] = As(t, i);
    if (this.el = dt.createElement(c, n), Ne.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = Ne.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(cn)) {
          const p = h[r++], f = s.getAttribute(m).split(Se), I = /([.?@])?(.*)/.exec(p);
          d.push({ type: 1, index: o, name: I[2], strings: f, ctor: I[1] === "." ? Ms : I[1] === "?" ? Ns : I[1] === "@" ? Ps : Dt }), s.removeAttribute(m);
        } else m.startsWith(Se) && (d.push({ type: 6, index: o }), s.removeAttribute(m));
        if (hn.test(s.tagName)) {
          const m = s.textContent.split(Se), p = m.length - 1;
          if (p > 0) {
            s.textContent = Ct ? Ct.emptyScript : "";
            for (let f = 0; f < p; f++) s.append(m[f], ot()), Ne.nextNode(), d.push({ type: 2, index: ++o });
            s.append(m[p], ot());
          }
        }
      } else if (s.nodeType === 8) if (s.data === un) d.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(Se, m + 1)) !== -1; ) d.push({ type: 7, index: o }), m += Se.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = De.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Ke(e, t, i = e, n) {
  var r, a;
  if (t === He) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = at(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Ke(e, s._$AS(e, t.values), s, n)), t;
}
class Cs {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? De).importNode(i, !0);
    Ne.currentNode = s;
    let o = Ne.nextNode(), r = 0, a = 0, d = n[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let c;
        d.type === 2 ? c = new pt(o, o.nextSibling, this, t) : d.type === 1 ? c = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (c = new Ts(o, this, t)), this._$AV.push(c), d = n[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = Ne.nextNode(), r++);
    }
    return Ne.currentNode = De, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class pt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = ee, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Ke(this, t, i), at(t) ? t === ee || t == null || t === "" ? (this._$AH !== ee && this._$AR(), this._$AH = ee) : t !== this._$AH && t !== He && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ss(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ee && at(this._$AH) ? this._$AA.nextSibling.data = t : this.T(De.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = dt.createElement(mn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new Cs(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = Ti.get(t.strings);
    return i === void 0 && Ti.set(t.strings, i = new dt(t)), i;
  }
  k(t) {
    pi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new pt(this.O(ot()), this.O(ot()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = Si(t).nextSibling;
      Si(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = ee, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ee;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Ke(this, t, i, 0), r = !at(t) || t !== this._$AH && t !== He, r && (this._$AH = t);
    else {
      const a = t;
      let d, c;
      for (t = o[0], d = 0; d < o.length - 1; d++) c = Ke(this, a[n + d], i, d), c === He && (c = this._$AH[d]), r || (r = !at(c) || c !== this._$AH[d]), c === ee ? t = ee : t !== ee && (t += (c ?? "") + o[d + 1]), this._$AH[d] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === ee ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ms extends Dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ee ? void 0 : t;
  }
}
class Ns extends Dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ee);
  }
}
class Ps extends Dt {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Ke(this, t, i, 0) ?? ee) === He) return;
    const n = this._$AH, s = t === ee && n !== ee || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== ee && (n === ee || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ts {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ke(this, t);
  }
}
const Ft = nt.litHtmlPolyfillSupport;
Ft == null || Ft(dt, pt), (nt.litHtmlVersions ?? (nt.litHtmlVersions = [])).push("3.3.3");
const Rs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new pt(t.insertBefore(ot(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = globalThis;
class Re extends ze {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Rs(i, this.renderRoot, this.renderOptions);
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
    return He;
  }
}
var tn;
Re._$litElement$ = !0, Re.finalized = !0, (tn = Te.litElementHydrateSupport) == null || tn.call(Te, { LitElement: Re });
const Wt = Te.litElementPolyfillSupport;
Wt == null || Wt({ LitElement: Re });
(Te.litElementVersions ?? (Te.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Os = { attribute: !0, type: String, converter: At, reflect: !1, hasChanged: hi }, Ds = (e = Os, t, i) => {
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
function we(e) {
  return (t, i) => typeof i == "object" ? Ds(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(e) {
  return we({ ...e, state: !0, attribute: !1 });
}
var Zt = "http://www.w3.org/1999/xhtml";
const Ri = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Zt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ut(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Ri.hasOwnProperty(t) ? { space: Ri[t], local: e } : e;
}
function Us(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Zt && t.documentElement.namespaceURI === Zt ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ls(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function fn(e) {
  var t = Ut(e);
  return (t.local ? Ls : Us)(t);
}
function zs() {
}
function fi(e) {
  return e == null ? zs : function() {
    return this.querySelector(e);
  };
}
function qs(e) {
  typeof e != "function" && (e = fi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), d, c, h = 0; h < r; ++h)
      (d = o[h]) && (c = e.call(d, d.__data__, h, o)) && ("__data__" in d && (c.__data__ = d.__data__), a[h] = c);
  return new de(n, this._parents);
}
function Hs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Ks() {
  return [];
}
function gn(e) {
  return e == null ? Ks : function() {
    return this.querySelectorAll(e);
  };
}
function Vs(e) {
  return function() {
    return Hs(e.apply(this, arguments));
  };
}
function Fs(e) {
  typeof e == "function" ? e = Vs(e) : e = gn(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && (n.push(e.call(d, d.__data__, c, r)), s.push(d));
  return new de(n, s);
}
function yn(e) {
  return function() {
    return this.matches(e);
  };
}
function wn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ws = Array.prototype.find;
function Gs(e) {
  return function() {
    return Ws.call(this.children, e);
  };
}
function Bs() {
  return this.firstElementChild;
}
function js(e) {
  return this.select(e == null ? Bs : Gs(typeof e == "function" ? e : wn(e)));
}
var Ys = Array.prototype.filter;
function Xs() {
  return Array.from(this.children);
}
function Qs(e) {
  return function() {
    return Ys.call(this.children, e);
  };
}
function Zs(e) {
  return this.selectAll(e == null ? Xs : Qs(typeof e == "function" ? e : wn(e)));
}
function Js(e) {
  typeof e != "function" && (e = yn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && e.call(d, d.__data__, c, o) && a.push(d);
  return new de(n, this._parents);
}
function In(e) {
  return new Array(e.length);
}
function er() {
  return new de(this._enter || this._groups.map(In), this._parents);
}
function Mt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Mt.prototype = {
  constructor: Mt,
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
function tr(e) {
  return function() {
    return e;
  };
}
function ir(e, t, i, n, s, o) {
  for (var r = 0, a, d = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new Mt(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function nr(e, t, i, n, s, o, r) {
  var a, d, c = /* @__PURE__ */ new Map(), h = t.length, m = o.length, p = new Array(h), f;
  for (a = 0; a < h; ++a)
    (d = t[a]) && (p[a] = f = r.call(d, d.__data__, a, t) + "", c.has(f) ? s[a] = d : c.set(f, d));
  for (a = 0; a < m; ++a)
    f = r.call(e, o[a], a, o) + "", (d = c.get(f)) ? (n[a] = d, d.__data__ = o[a], c.delete(f)) : i[a] = new Mt(e, o[a]);
  for (a = 0; a < h; ++a)
    (d = t[a]) && c.get(p[a]) === d && (s[a] = d);
}
function sr(e) {
  return e.__data__;
}
function rr(e, t) {
  if (!arguments.length) return Array.from(this, sr);
  var i = t ? nr : ir, n = this._parents, s = this._groups;
  typeof e != "function" && (e = tr(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), c = 0; c < o; ++c) {
    var h = n[c], m = s[c], p = m.length, f = or(e.call(h, h && h.__data__, c, n)), I = f.length, x = a[c] = new Array(I), A = r[c] = new Array(I), y = d[c] = new Array(p);
    i(h, m, x, A, y, f, t);
    for (var T = 0, U = 0, v, _; T < I; ++T)
      if (v = x[T]) {
        for (T >= U && (U = T + 1); !(_ = A[U]) && ++U < I; ) ;
        v._next = _ || null;
      }
  }
  return r = new de(r, n), r._enter = a, r._exit = d, r;
}
function or(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ar() {
  return new de(this._exit || this._groups.map(In), this._parents);
}
function dr(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function lr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var c = i[d], h = n[d], m = c.length, p = a[d] = new Array(m), f, I = 0; I < m; ++I)
      (f = c[I] || h[I]) && (p[I] = f);
  for (; d < s; ++d)
    a[d] = i[d];
  return new de(a, this._parents);
}
function cr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function ur(e) {
  e || (e = hr);
  function t(m, p) {
    return m && p ? e(m.__data__, p.__data__) : !m - !p;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, d = s[o] = new Array(a), c, h = 0; h < a; ++h)
      (c = r[h]) && (d[h] = c);
    d.sort(t);
  }
  return new de(s, this._parents).order();
}
function hr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function pr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function mr() {
  return Array.from(this);
}
function fr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var r = n[s];
      if (r) return r;
    }
  return null;
}
function gr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function yr() {
  return !this.node();
}
function wr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function Ir(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function vr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function xr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function _r(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function $r(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function kr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function br(e, t) {
  var i = Ut(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? vr : Ir : typeof t == "function" ? i.local ? kr : $r : i.local ? _r : xr)(i, t));
}
function vn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Er(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Sr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Ar(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Cr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Er : typeof t == "function" ? Ar : Sr)(e, t, i ?? "")) : Ve(this.node(), e);
}
function Ve(e, t) {
  return e.style.getPropertyValue(t) || vn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Mr(e) {
  return function() {
    delete this[e];
  };
}
function Nr(e, t) {
  return function() {
    this[e] = t;
  };
}
function Pr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Tr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Mr : typeof t == "function" ? Pr : Nr)(e, t)) : this.node()[e];
}
function xn(e) {
  return e.trim().split(/^|\s+/);
}
function gi(e) {
  return e.classList || new _n(e);
}
function _n(e) {
  this._node = e, this._names = xn(e.getAttribute("class") || "");
}
_n.prototype = {
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
function $n(e, t) {
  for (var i = gi(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function kn(e, t) {
  for (var i = gi(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Rr(e) {
  return function() {
    $n(this, e);
  };
}
function Or(e) {
  return function() {
    kn(this, e);
  };
}
function Dr(e, t) {
  return function() {
    (t.apply(this, arguments) ? $n : kn)(this, e);
  };
}
function Ur(e, t) {
  var i = xn(e + "");
  if (arguments.length < 2) {
    for (var n = gi(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Dr : t ? Rr : Or)(i, t));
}
function Lr() {
  this.textContent = "";
}
function zr(e) {
  return function() {
    this.textContent = e;
  };
}
function qr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Hr(e) {
  return arguments.length ? this.each(e == null ? Lr : (typeof e == "function" ? qr : zr)(e)) : this.node().textContent;
}
function Kr() {
  this.innerHTML = "";
}
function Vr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Fr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Wr(e) {
  return arguments.length ? this.each(e == null ? Kr : (typeof e == "function" ? Fr : Vr)(e)) : this.node().innerHTML;
}
function Gr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Br() {
  return this.each(Gr);
}
function jr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Yr() {
  return this.each(jr);
}
function Xr(e) {
  var t = typeof e == "function" ? e : fn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Qr() {
  return null;
}
function Zr(e, t) {
  var i = typeof e == "function" ? e : fn(e), n = t == null ? Qr : typeof t == "function" ? t : fi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Jr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function eo() {
  return this.each(Jr);
}
function to() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function io() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function no(e) {
  return this.select(e ? io : to);
}
function so(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function ro(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function oo(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function ao(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function lo(e, t, i) {
  return function() {
    var n = this.__on, s, o = ro(t);
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
function co(e, t, i) {
  var n = oo(e + ""), s, o = n.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var d = 0, c = a.length, h; d < c; ++d)
        for (s = 0, h = a[d]; s < o; ++s)
          if ((r = n[s]).type === h.type && r.name === h.name)
            return h.value;
    }
    return;
  }
  for (a = t ? lo : ao, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function bn(e, t, i) {
  var n = vn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function uo(e, t) {
  return function() {
    return bn(this, e, t);
  };
}
function ho(e, t) {
  return function() {
    return bn(this, e, t.apply(this, arguments));
  };
}
function po(e, t) {
  return this.each((typeof t == "function" ? ho : uo)(e, t));
}
function* mo() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, r; s < o; ++s)
      (r = n[s]) && (yield r);
}
var En = [null];
function de(e, t) {
  this._groups = e, this._parents = t;
}
function mt() {
  return new de([[document.documentElement]], En);
}
function fo() {
  return this;
}
de.prototype = mt.prototype = {
  constructor: de,
  select: qs,
  selectAll: Fs,
  selectChild: js,
  selectChildren: Zs,
  filter: Js,
  data: rr,
  enter: er,
  exit: ar,
  join: dr,
  merge: lr,
  selection: fo,
  order: cr,
  sort: ur,
  call: pr,
  nodes: mr,
  node: fr,
  size: gr,
  empty: yr,
  each: wr,
  attr: br,
  style: Cr,
  property: Tr,
  classed: Ur,
  text: Hr,
  html: Wr,
  raise: Br,
  lower: Yr,
  append: Xr,
  insert: Zr,
  remove: eo,
  clone: no,
  datum: so,
  on: co,
  dispatch: po,
  [Symbol.iterator]: mo
};
function ge(e) {
  return typeof e == "string" ? new de([[document.querySelector(e)]], [document.documentElement]) : new de([[e]], En);
}
function go(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Me(e, t) {
  if (e = go(e), t === void 0 && (t = e.currentTarget), t) {
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
var yo = { value: () => {
} };
function yi() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new kt(i);
}
function kt(e) {
  this._ = e;
}
function wo(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
kt.prototype = yi.prototype = {
  constructor: kt,
  on: function(e, t) {
    var i = this._, n = wo(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = Io(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = Oi(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = Oi(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new kt(e);
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
function Io(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function Oi(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = yo, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Jt = { capture: !0, passive: !1 };
function ei(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function vo(e) {
  var t = e.document.documentElement, i = ge(e).on("dragstart.drag", ei, Jt);
  "onselectstart" in t ? i.on("selectstart.drag", ei, Jt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function xo(e, t) {
  var i = e.document.documentElement, n = ge(e).on("dragstart.drag", null);
  t && (n.on("click.drag", ei, Jt), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function wi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Sn(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function ft() {
}
var lt = 0.7, Nt = 1 / lt, qe = "\\s*([+-]?\\d+)\\s*", ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _o = /^#([0-9a-f]{3,8})$/, $o = new RegExp(`^rgb\\(${qe},${qe},${qe}\\)$`), ko = new RegExp(`^rgb\\(${ye},${ye},${ye}\\)$`), bo = new RegExp(`^rgba\\(${qe},${qe},${qe},${ct}\\)$`), Eo = new RegExp(`^rgba\\(${ye},${ye},${ye},${ct}\\)$`), So = new RegExp(`^hsl\\(${ct},${ye},${ye}\\)$`), Ao = new RegExp(`^hsla\\(${ct},${ye},${ye},${ct}\\)$`), Di = {
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
wi(ft, ut, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ui,
  // Deprecated! Use color.formatHex.
  formatHex: Ui,
  formatHex8: Co,
  formatHsl: Mo,
  formatRgb: Li,
  toString: Li
});
function Ui() {
  return this.rgb().formatHex();
}
function Co() {
  return this.rgb().formatHex8();
}
function Mo() {
  return An(this).formatHsl();
}
function Li() {
  return this.rgb().formatRgb();
}
function ut(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = _o.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? zi(t) : i === 3 ? new se(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? yt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? yt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = $o.exec(e)) ? new se(t[1], t[2], t[3], 1) : (t = ko.exec(e)) ? new se(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = bo.exec(e)) ? yt(t[1], t[2], t[3], t[4]) : (t = Eo.exec(e)) ? yt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = So.exec(e)) ? Ki(t[1], t[2] / 100, t[3] / 100, 1) : (t = Ao.exec(e)) ? Ki(t[1], t[2] / 100, t[3] / 100, t[4]) : Di.hasOwnProperty(e) ? zi(Di[e]) : e === "transparent" ? new se(NaN, NaN, NaN, 0) : null;
}
function zi(e) {
  return new se(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function yt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new se(e, t, i, n);
}
function No(e) {
  return e instanceof ft || (e = ut(e)), e ? (e = e.rgb(), new se(e.r, e.g, e.b, e.opacity)) : new se();
}
function ti(e, t, i, n) {
  return arguments.length === 1 ? No(e) : new se(e, t, i, n ?? 1);
}
function se(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
wi(se, ti, Sn(ft, {
  brighter(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new se(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? lt : Math.pow(lt, e), new se(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new se(Oe(this.r), Oe(this.g), Oe(this.b), Pt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: qi,
  // Deprecated! Use color.formatHex.
  formatHex: qi,
  formatHex8: Po,
  formatRgb: Hi,
  toString: Hi
}));
function qi() {
  return `#${Pe(this.r)}${Pe(this.g)}${Pe(this.b)}`;
}
function Po() {
  return `#${Pe(this.r)}${Pe(this.g)}${Pe(this.b)}${Pe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Hi() {
  const e = Pt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Oe(this.r)}, ${Oe(this.g)}, ${Oe(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Pt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Oe(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Pe(e) {
  return e = Oe(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ki(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new pe(e, t, i, n);
}
function An(e) {
  if (e instanceof pe) return new pe(e.h, e.s, e.l, e.opacity);
  if (e instanceof ft || (e = ut(e)), !e) return new pe();
  if (e instanceof pe) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new pe(r, a, d, e.opacity);
}
function To(e, t, i, n) {
  return arguments.length === 1 ? An(e) : new pe(e, t, i, n ?? 1);
}
function pe(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
wi(pe, To, Sn(ft, {
  brighter(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new pe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? lt : Math.pow(lt, e), new pe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new se(
      Gt(e >= 240 ? e - 240 : e + 120, s, n),
      Gt(e, s, n),
      Gt(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new pe(Vi(this.h), wt(this.s), wt(this.l), Pt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Pt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Vi(this.h)}, ${wt(this.s) * 100}%, ${wt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Vi(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function wt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Gt(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Cn = (e) => () => e;
function Ro(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Oo(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Do(e) {
  return (e = +e) == 1 ? Mn : function(t, i) {
    return i - t ? Oo(t, i, e) : Cn(isNaN(t) ? i : t);
  };
}
function Mn(e, t) {
  var i = t - e;
  return i ? Ro(e, i) : Cn(isNaN(e) ? t : e);
}
const Fi = (function e(t) {
  var i = Do(t);
  function n(s, o) {
    var r = i((s = ti(s)).r, (o = ti(o)).r), a = i(s.g, o.g), d = i(s.b, o.b), c = Mn(s.opacity, o.opacity);
    return function(h) {
      return s.r = r(h), s.g = a(h), s.b = d(h), s.opacity = c(h), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Ee(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var ii = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Bt = new RegExp(ii.source, "g");
function Uo(e) {
  return function() {
    return e;
  };
}
function Lo(e) {
  return function(t) {
    return e(t) + "";
  };
}
function zo(e, t) {
  var i = ii.lastIndex = Bt.lastIndex = 0, n, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (n = ii.exec(e)) && (s = Bt.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: Ee(n, s) })), i = Bt.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? Lo(d[0].x) : Uo(t) : (t = d.length, function(c) {
    for (var h = 0, m; h < t; ++h) a[(m = d[h]).i] = m.x(c);
    return a.join("");
  });
}
var Wi = 180 / Math.PI, ni = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Nn(e, t, i, n, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * i + t * n) && (i -= e * d, n -= t * d), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, d /= a), e * n < t * i && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * Wi,
    skewX: Math.atan(d) * Wi,
    scaleX: r,
    scaleY: a
  };
}
var It;
function qo(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ni : Nn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Ho(e) {
  return e == null || (It || (It = document.createElementNS("http://www.w3.org/2000/svg", "g")), It.setAttribute("transform", e), !(e = It.transform.baseVal.consolidate())) ? ni : (e = e.matrix, Nn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Pn(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, h, m, p, f, I) {
    if (c !== m || h !== p) {
      var x = f.push("translate(", null, t, null, i);
      I.push({ i: x - 4, x: Ee(c, m) }, { i: x - 2, x: Ee(h, p) });
    } else (m || p) && f.push("translate(" + m + t + p + i);
  }
  function r(c, h, m, p) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), p.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: Ee(c, h) })) : h && m.push(s(m) + "rotate(" + h + n);
  }
  function a(c, h, m, p) {
    c !== h ? p.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: Ee(c, h) }) : h && m.push(s(m) + "skewX(" + h + n);
  }
  function d(c, h, m, p, f, I) {
    if (c !== m || h !== p) {
      var x = f.push(s(f) + "scale(", null, ",", null, ")");
      I.push({ i: x - 4, x: Ee(c, m) }, { i: x - 2, x: Ee(h, p) });
    } else (m !== 1 || p !== 1) && f.push(s(f) + "scale(" + m + "," + p + ")");
  }
  return function(c, h) {
    var m = [], p = [];
    return c = e(c), h = e(h), o(c.translateX, c.translateY, h.translateX, h.translateY, m, p), r(c.rotate, h.rotate, m, p), a(c.skewX, h.skewX, m, p), d(c.scaleX, c.scaleY, h.scaleX, h.scaleY, m, p), c = h = null, function(f) {
      for (var I = -1, x = p.length, A; ++I < x; ) m[(A = p[I]).i] = A.x(f);
      return m.join("");
    };
  };
}
var Ko = Pn(qo, "px, ", "px)", "deg)"), Vo = Pn(Ho, ", ", ")", ")"), Fo = 1e-12;
function Gi(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Wo(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Go(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Bo = (function e(t, i, n) {
  function s(o, r) {
    var a = o[0], d = o[1], c = o[2], h = r[0], m = r[1], p = r[2], f = h - a, I = m - d, x = f * f + I * I, A, y;
    if (x < Fo)
      y = Math.log(p / c) / t, A = function(C) {
        return [
          a + C * f,
          d + C * I,
          c * Math.exp(t * C * y)
        ];
      };
    else {
      var T = Math.sqrt(x), U = (p * p - c * c + n * x) / (2 * c * i * T), v = (p * p - c * c - n * x) / (2 * p * i * T), _ = Math.log(Math.sqrt(U * U + 1) - U), S = Math.log(Math.sqrt(v * v + 1) - v);
      y = (S - _) / t, A = function(C) {
        var W = C * y, O = Gi(_), R = c / (i * T) * (O * Go(t * W + _) - Wo(_));
        return [
          a + R * f,
          d + R * I,
          c * O / Gi(t * W + _)
        ];
      };
    }
    return A.duration = y * 1e3 * t / Math.SQRT2, A;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Fe = 0, et = 0, Ye = 0, Tn = 1e3, Tt, tt, Rt = 0, Ue = 0, Lt = 0, ht = typeof performance == "object" && performance.now ? performance : Date, Rn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Ii() {
  return Ue || (Rn(jo), Ue = ht.now() + Lt);
}
function jo() {
  Ue = 0;
}
function Ot() {
  this._call = this._time = this._next = null;
}
Ot.prototype = On.prototype = {
  constructor: Ot,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Ii() : +i) + (t == null ? 0 : +t), !this._next && tt !== this && (tt ? tt._next = this : Tt = this, tt = this), this._call = e, this._time = i, si();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, si());
  }
};
function On(e, t, i) {
  var n = new Ot();
  return n.restart(e, t, i), n;
}
function Yo() {
  Ii(), ++Fe;
  for (var e = Tt, t; e; )
    (t = Ue - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Fe;
}
function Bi() {
  Ue = (Rt = ht.now()) + Lt, Fe = et = 0;
  try {
    Yo();
  } finally {
    Fe = 0, Qo(), Ue = 0;
  }
}
function Xo() {
  var e = ht.now(), t = e - Rt;
  t > Tn && (Lt -= t, Rt = e);
}
function Qo() {
  for (var e, t = Tt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Tt = i);
  tt = e, si(n);
}
function si(e) {
  if (!Fe) {
    et && (et = clearTimeout(et));
    var t = e - Ue;
    t > 24 ? (e < 1 / 0 && (et = setTimeout(Bi, e - ht.now() - Lt)), Ye && (Ye = clearInterval(Ye))) : (Ye || (Rt = ht.now(), Ye = setInterval(Xo, Tn)), Fe = 1, Rn(Bi));
  }
}
function ji(e, t, i) {
  var n = new Ot();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Zo = yi("start", "end", "cancel", "interrupt"), Jo = [], Dn = 0, Yi = 1, ri = 2, bt = 3, Xi = 4, oi = 5, Et = 6;
function zt(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  ea(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Zo,
    tween: Jo,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Dn
  });
}
function vi(e, t) {
  var i = me(e, t);
  if (i.state > Dn) throw new Error("too late; already scheduled");
  return i;
}
function Ie(e, t) {
  var i = me(e, t);
  if (i.state > bt) throw new Error("too late; already running");
  return i;
}
function me(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function ea(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = On(o, 0, i.time);
  function o(c) {
    i.state = Yi, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var h, m, p, f;
    if (i.state !== Yi) return d();
    for (h in n)
      if (f = n[h], f.name === i.name) {
        if (f.state === bt) return ji(r);
        f.state === Xi ? (f.state = Et, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete n[h]) : +h < t && (f.state = Et, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete n[h]);
      }
    if (ji(function() {
      i.state === bt && (i.state = Xi, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = ri, i.on.call("start", e, e.__data__, i.index, i.group), i.state === ri) {
      for (i.state = bt, s = new Array(p = i.tween.length), h = 0, m = -1; h < p; ++h)
        (f = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = f);
      s.length = m + 1;
    }
  }
  function a(c) {
    for (var h = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(d), i.state = oi, 1), m = -1, p = s.length; ++m < p; )
      s[m].call(e, h);
    i.state === oi && (i.on.call("end", e, e.__data__, i.index, i.group), d());
  }
  function d() {
    i.state = Et, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function St(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > ri && n.state < oi, n.state = Et, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function ta(e) {
  return this.each(function() {
    St(this, e);
  });
}
function ia(e, t) {
  var i, n;
  return function() {
    var s = Ie(this, e), o = s.tween;
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
function na(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Ie(this, e), r = o.tween;
    if (r !== n) {
      s = (n = r).slice();
      for (var a = { name: t, value: i }, d = 0, c = s.length; d < c; ++d)
        if (s[d].name === t) {
          s[d] = a;
          break;
        }
      d === c && s.push(a);
    }
    o.tween = s;
  };
}
function sa(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = me(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? ia : na)(i, e, t));
}
function xi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Ie(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return me(s, n).value[t];
  };
}
function Un(e, t) {
  var i;
  return (typeof t == "number" ? Ee : t instanceof ut ? Fi : (i = ut(t)) ? (t = i, Fi) : zo)(e, t);
}
function ra(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function oa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function aa(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function da(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function la(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function ca(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function ua(e, t) {
  var i = Ut(e), n = i === "transform" ? Vo : Un;
  return this.attrTween(e, typeof t == "function" ? (i.local ? ca : la)(i, n, xi(this, "attr." + e, t)) : t == null ? (i.local ? oa : ra)(i) : (i.local ? da : aa)(i, n, t));
}
function ha(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function pa(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function ma(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && pa(e, o)), i;
  }
  return s._value = t, s;
}
function fa(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && ha(e, o)), i;
  }
  return s._value = t, s;
}
function ga(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Ut(e);
  return this.tween(i, (n.local ? ma : fa)(n, t));
}
function ya(e, t) {
  return function() {
    vi(this, e).delay = +t.apply(this, arguments);
  };
}
function wa(e, t) {
  return t = +t, function() {
    vi(this, e).delay = t;
  };
}
function Ia(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ya : wa)(t, e)) : me(this.node(), t).delay;
}
function va(e, t) {
  return function() {
    Ie(this, e).duration = +t.apply(this, arguments);
  };
}
function xa(e, t) {
  return t = +t, function() {
    Ie(this, e).duration = t;
  };
}
function _a(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? va : xa)(t, e)) : me(this.node(), t).duration;
}
function $a(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ie(this, e).ease = t;
  };
}
function ka(e) {
  var t = this._id;
  return arguments.length ? this.each($a(t, e)) : me(this.node(), t).ease;
}
function ba(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ie(this, e).ease = i;
  };
}
function Ea(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ba(this._id, e));
}
function Sa(e) {
  typeof e != "function" && (e = yn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && e.call(d, d.__data__, c, o) && a.push(d);
  return new be(n, this._parents, this._name, this._id);
}
function Aa(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var d = t[a], c = i[a], h = d.length, m = r[a] = new Array(h), p, f = 0; f < h; ++f)
      (p = d[f] || c[f]) && (m[f] = p);
  for (; a < n; ++a)
    r[a] = t[a];
  return new be(r, this._parents, this._name, this._id);
}
function Ca(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Ma(e, t, i) {
  var n, s, o = Ca(t) ? vi : Ie;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function Na(e, t) {
  var i = this._id;
  return arguments.length < 2 ? me(this.node(), i).on.on(e) : this.each(Ma(i, e, t));
}
function Pa(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Ta() {
  return this.on("end.remove", Pa(this._id));
}
function Ra(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = fi(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], d = a.length, c = o[r] = new Array(d), h, m, p = 0; p < d; ++p)
      (h = a[p]) && (m = e.call(h, h.__data__, p, a)) && ("__data__" in h && (m.__data__ = h.__data__), c[p] = m, zt(c[p], t, i, p, c, me(h, i)));
  return new be(o, this._parents, t, i);
}
function Oa(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = gn(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = n[a], c = d.length, h, m = 0; m < c; ++m)
      if (h = d[m]) {
        for (var p = e.call(h, h.__data__, m, d), f, I = me(h, i), x = 0, A = p.length; x < A; ++x)
          (f = p[x]) && zt(f, t, i, x, p, I);
        o.push(p), r.push(h);
      }
  return new be(o, r, t, i);
}
var Da = mt.prototype.constructor;
function Ua() {
  return new Da(this._groups, this._parents);
}
function La(e, t) {
  var i, n, s;
  return function() {
    var o = Ve(this, e), r = (this.style.removeProperty(e), Ve(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function Ln(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function za(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = Ve(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function qa(e, t, i) {
  var n, s, o;
  return function() {
    var r = Ve(this, e), a = i(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Ve(this, e))), r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a));
  };
}
function Ha(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = Ie(this, e), c = d.on, h = d.value[o] == null ? a || (a = Ln(t)) : void 0;
    (c !== i || s !== h) && (n = (i = c).copy()).on(r, s = h), d.on = n;
  };
}
function Ka(e, t, i) {
  var n = (e += "") == "transform" ? Ko : Un;
  return t == null ? this.styleTween(e, La(e, n)).on("end.style." + e, Ln(e)) : typeof t == "function" ? this.styleTween(e, qa(e, n, xi(this, "style." + e, t))).each(Ha(this._id, e)) : this.styleTween(e, za(e, n, t), i).on("end.style." + e, null);
}
function Va(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Fa(e, t, i) {
  var n, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Va(e, r, i)), n;
  }
  return o._value = t, o;
}
function Wa(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Fa(e, t, i ?? ""));
}
function Ga(e) {
  return function() {
    this.textContent = e;
  };
}
function Ba(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function ja(e) {
  return this.tween("text", typeof e == "function" ? Ba(xi(this, "text", e)) : Ga(e == null ? "" : e + ""));
}
function Ya(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Xa(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && Ya(s)), t;
  }
  return n._value = e, n;
}
function Qa(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Xa(e));
}
function Za() {
  for (var e = this._name, t = this._id, i = zn(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, c = 0; c < a; ++c)
      if (d = r[c]) {
        var h = me(d, t);
        zt(d, e, i, c, r, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new be(n, this._parents, e, i);
}
function Ja() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = Ie(this, n), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), c.on = t;
    }), s === 0 && o();
  });
}
var ed = 0;
function be(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function zn() {
  return ++ed;
}
var $e = mt.prototype;
be.prototype = {
  constructor: be,
  select: Ra,
  selectAll: Oa,
  selectChild: $e.selectChild,
  selectChildren: $e.selectChildren,
  filter: Sa,
  merge: Aa,
  selection: Ua,
  transition: Za,
  call: $e.call,
  nodes: $e.nodes,
  node: $e.node,
  size: $e.size,
  empty: $e.empty,
  each: $e.each,
  on: Na,
  attr: ua,
  attrTween: ga,
  style: Ka,
  styleTween: Wa,
  text: ja,
  textTween: Qa,
  remove: Ta,
  tween: sa,
  delay: Ia,
  duration: _a,
  ease: ka,
  easeVarying: Ea,
  end: Ja,
  [Symbol.iterator]: $e[Symbol.iterator]
};
function td(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var id = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: td
};
function nd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function sd(e) {
  var t, i;
  e instanceof be ? (t = e._id, e = e._name) : (t = zn(), (i = id).time = Ii(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && zt(d, e, t, c, r, i || nd(d, t));
  return new be(n, this._parents, e, t);
}
mt.prototype.interrupt = ta;
mt.prototype.transition = sd;
const vt = (e) => () => e;
function rd(e, {
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
function ke(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
ke.prototype = {
  constructor: ke,
  scale: function(e) {
    return e === 1 ? this : new ke(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ke(this.k, this.x + this.k * e, this.y + this.k * t);
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
var st = new ke(1, 0, 0);
ke.prototype;
function jt(e) {
  e.stopImmediatePropagation();
}
function Xe(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function od(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ad() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Qi() {
  return this.__zoom || st;
}
function dd(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ld() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function cd(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function ud() {
  var e = od, t = ad, i = cd, n = dd, s = ld, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Bo, c = yi("start", "zoom", "end"), h, m, p, f = 500, I = 150, x = 0, A = 10;
  function y(l) {
    l.property("__zoom", Qi).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", O).on("dblclick.zoom", R).filter(s).on("touchstart.zoom", J).on("touchmove.zoom", ie).on("touchend.zoom touchcancel.zoom", ne).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(l, g, w, $) {
    var b = l.selection ? l.selection() : l;
    b.property("__zoom", Qi), l !== b ? _(l, g, w, $) : b.interrupt().each(function() {
      S(this, arguments).event($).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, y.scaleBy = function(l, g, w, $) {
    y.scaleTo(l, function() {
      var b = this.__zoom.k, E = typeof g == "function" ? g.apply(this, arguments) : g;
      return b * E;
    }, w, $);
  }, y.scaleTo = function(l, g, w, $) {
    y.transform(l, function() {
      var b = t.apply(this, arguments), E = this.__zoom, k = w == null ? v(b) : typeof w == "function" ? w.apply(this, arguments) : w, P = E.invert(k), F = typeof g == "function" ? g.apply(this, arguments) : g;
      return i(U(T(E, F), k, P), b, r);
    }, w, $);
  }, y.translateBy = function(l, g, w, $) {
    y.transform(l, function() {
      return i(this.__zoom.translate(
        typeof g == "function" ? g.apply(this, arguments) : g,
        typeof w == "function" ? w.apply(this, arguments) : w
      ), t.apply(this, arguments), r);
    }, null, $);
  }, y.translateTo = function(l, g, w, $, b) {
    y.transform(l, function() {
      var E = t.apply(this, arguments), k = this.__zoom, P = $ == null ? v(E) : typeof $ == "function" ? $.apply(this, arguments) : $;
      return i(st.translate(P[0], P[1]).scale(k.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof w == "function" ? -w.apply(this, arguments) : -w
      ), E, r);
    }, $, b);
  };
  function T(l, g) {
    return g = Math.max(o[0], Math.min(o[1], g)), g === l.k ? l : new ke(g, l.x, l.y);
  }
  function U(l, g, w) {
    var $ = g[0] - w[0] * l.k, b = g[1] - w[1] * l.k;
    return $ === l.x && b === l.y ? l : new ke(l.k, $, b);
  }
  function v(l) {
    return [(+l[0][0] + +l[1][0]) / 2, (+l[0][1] + +l[1][1]) / 2];
  }
  function _(l, g, w, $) {
    l.on("start.zoom", function() {
      S(this, arguments).event($).start();
    }).on("interrupt.zoom end.zoom", function() {
      S(this, arguments).event($).end();
    }).tween("zoom", function() {
      var b = this, E = arguments, k = S(b, E).event($), P = t.apply(b, E), F = w == null ? v(P) : typeof w == "function" ? w.apply(b, E) : w, B = Math.max(P[1][0] - P[0][0], P[1][1] - P[0][1]), Y = b.__zoom, oe = typeof g == "function" ? g.apply(b, E) : g, ce = d(Y.invert(F).concat(B / Y.k), oe.invert(F).concat(B / oe.k));
      return function(u) {
        if (u === 1) u = oe;
        else {
          var D = ce(u), K = B / D[2];
          u = new ke(K, F[0] - D[0] * K, F[1] - D[1] * K);
        }
        k.zoom(null, u);
      };
    });
  }
  function S(l, g, w) {
    return !w && l.__zooming || new C(l, g);
  }
  function C(l, g) {
    this.that = l, this.args = g, this.active = 0, this.sourceEvent = null, this.extent = t.apply(l, g), this.taps = 0;
  }
  C.prototype = {
    event: function(l) {
      return l && (this.sourceEvent = l), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(l, g) {
      return this.mouse && l !== "mouse" && (this.mouse[1] = g.invert(this.mouse[0])), this.touch0 && l !== "touch" && (this.touch0[1] = g.invert(this.touch0[0])), this.touch1 && l !== "touch" && (this.touch1[1] = g.invert(this.touch1[0])), this.that.__zoom = g, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(l) {
      var g = ge(this.that).datum();
      c.call(
        l,
        this.that,
        new rd(l, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: c
        }),
        g
      );
    }
  };
  function W(l, ...g) {
    if (!e.apply(this, arguments)) return;
    var w = S(this, g).event(l), $ = this.__zoom, b = Math.max(o[0], Math.min(o[1], $.k * Math.pow(2, n.apply(this, arguments)))), E = Me(l);
    if (w.wheel)
      (w.mouse[0][0] !== E[0] || w.mouse[0][1] !== E[1]) && (w.mouse[1] = $.invert(w.mouse[0] = E)), clearTimeout(w.wheel);
    else {
      if ($.k === b) return;
      w.mouse = [E, $.invert(E)], St(this), w.start();
    }
    Xe(l), w.wheel = setTimeout(k, I), w.zoom("mouse", i(U(T($, b), w.mouse[0], w.mouse[1]), w.extent, r));
    function k() {
      w.wheel = null, w.end();
    }
  }
  function O(l, ...g) {
    if (p || !e.apply(this, arguments)) return;
    var w = l.currentTarget, $ = S(this, g, !0).event(l), b = ge(l.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", B, !0), E = Me(l, w), k = l.clientX, P = l.clientY;
    vo(l.view), jt(l), $.mouse = [E, this.__zoom.invert(E)], St(this), $.start();
    function F(Y) {
      if (Xe(Y), !$.moved) {
        var oe = Y.clientX - k, ce = Y.clientY - P;
        $.moved = oe * oe + ce * ce > x;
      }
      $.event(Y).zoom("mouse", i(U($.that.__zoom, $.mouse[0] = Me(Y, w), $.mouse[1]), $.extent, r));
    }
    function B(Y) {
      b.on("mousemove.zoom mouseup.zoom", null), xo(Y.view, $.moved), Xe(Y), $.event(Y).end();
    }
  }
  function R(l, ...g) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom, $ = Me(l.changedTouches ? l.changedTouches[0] : l, this), b = w.invert($), E = w.k * (l.shiftKey ? 0.5 : 2), k = i(U(T(w, E), $, b), t.apply(this, g), r);
      Xe(l), a > 0 ? ge(this).transition().duration(a).call(_, k, $, l) : ge(this).call(y.transform, k, $, l);
    }
  }
  function J(l, ...g) {
    if (e.apply(this, arguments)) {
      var w = l.touches, $ = w.length, b = S(this, g, l.changedTouches.length === $).event(l), E, k, P, F;
      for (jt(l), k = 0; k < $; ++k)
        P = w[k], F = Me(P, this), F = [F, this.__zoom.invert(F), P.identifier], b.touch0 ? !b.touch1 && b.touch0[2] !== F[2] && (b.touch1 = F, b.taps = 0) : (b.touch0 = F, E = !0, b.taps = 1 + !!h);
      h && (h = clearTimeout(h)), E && (b.taps < 2 && (m = F[0], h = setTimeout(function() {
        h = null;
      }, f)), St(this), b.start());
    }
  }
  function ie(l, ...g) {
    if (this.__zooming) {
      var w = S(this, g).event(l), $ = l.changedTouches, b = $.length, E, k, P, F;
      for (Xe(l), E = 0; E < b; ++E)
        k = $[E], P = Me(k, this), w.touch0 && w.touch0[2] === k.identifier ? w.touch0[0] = P : w.touch1 && w.touch1[2] === k.identifier && (w.touch1[0] = P);
      if (k = w.that.__zoom, w.touch1) {
        var B = w.touch0[0], Y = w.touch0[1], oe = w.touch1[0], ce = w.touch1[1], u = (u = oe[0] - B[0]) * u + (u = oe[1] - B[1]) * u, D = (D = ce[0] - Y[0]) * D + (D = ce[1] - Y[1]) * D;
        k = T(k, Math.sqrt(u / D)), P = [(B[0] + oe[0]) / 2, (B[1] + oe[1]) / 2], F = [(Y[0] + ce[0]) / 2, (Y[1] + ce[1]) / 2];
      } else if (w.touch0) P = w.touch0[0], F = w.touch0[1];
      else return;
      w.zoom("touch", i(U(k, P, F), w.extent, r));
    }
  }
  function ne(l, ...g) {
    if (this.__zooming) {
      var w = S(this, g).event(l), $ = l.changedTouches, b = $.length, E, k;
      for (jt(l), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, f), E = 0; E < b; ++E)
        k = $[E], w.touch0 && w.touch0[2] === k.identifier ? delete w.touch0 : w.touch1 && w.touch1[2] === k.identifier && delete w.touch1;
      if (w.touch1 && !w.touch0 && (w.touch0 = w.touch1, delete w.touch1), w.touch0) w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (w.end(), w.taps === 2 && (k = Me(k, this), Math.hypot(m[0] - k[0], m[1] - k[1]) < A)) {
        var P = ge(this).on("dblclick.zoom");
        P && P.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : vt(+l), y) : n;
  }, y.filter = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : vt(!!l), y) : e;
  }, y.touchable = function(l) {
    return arguments.length ? (s = typeof l == "function" ? l : vt(!!l), y) : s;
  }, y.extent = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : vt([[+l[0][0], +l[0][1]], [+l[1][0], +l[1][1]]]), y) : t;
  }, y.scaleExtent = function(l) {
    return arguments.length ? (o[0] = +l[0], o[1] = +l[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(l) {
    return arguments.length ? (r[0][0] = +l[0][0], r[1][0] = +l[1][0], r[0][1] = +l[0][1], r[1][1] = +l[1][1], y) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, y.constrain = function(l) {
    return arguments.length ? (i = l, y) : i;
  }, y.duration = function(l) {
    return arguments.length ? (a = +l, y) : a;
  }, y.interpolate = function(l) {
    return arguments.length ? (d = l, y) : d;
  }, y.on = function() {
    var l = c.on.apply(c, arguments);
    return l === c ? y : l;
  }, y.clickDistance = function(l) {
    return arguments.length ? (x = (l = +l) * l, y) : Math.sqrt(x);
  }, y.tapDistance = function(l) {
    return arguments.length ? (A = +l, y) : A;
  }, y;
}
var hd = Object.defineProperty, pd = Object.getOwnPropertyDescriptor, te = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? pd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && hd(t, i, s), s;
};
function md(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * r) / d, h = ((i.x - e.x) * o - (i.y - e.y) * s) / d;
  return c <= 0.02 || c >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function fd(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function gd(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, c = (r.y - o.y) / a, h = t.map(([p, f]) => md(o, r, p, f)).filter((p) => p !== null).filter((p) => p.t * a > i + 2 && (1 - p.t) * a > i + 2).sort((p, f) => p.t - f.t);
    let m = -1 / 0;
    for (const p of h)
      p.t * a - i <= m + 2 || (n += ` L ${p.x - d * i} ${p.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${p.x + d * i} ${p.y + c * i}`, m = p.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const xt = {
  component: V`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: V`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: V`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: V`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: V`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: V`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: V`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: V`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: V`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: V`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: V`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: V`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: V`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: V`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: V`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let Z = class extends Re {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = st, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
      if (e.key !== " ") return;
      const t = e.composedPath()[0];
      t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement || t instanceof HTMLButtonElement || t instanceof HTMLElement && t.isContentEditable || (e.preventDefault(), this._spaceDown = !0);
    }, this._onWindowSpaceUp = (e) => {
      e.key === " " && (this._spaceDown = !1);
    }, this._onKeyUp = (e) => {
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
          if (this.selectedIds.length > 0) {
            e.preventDefault();
            const s = this.scene.nodes.filter((o) => this.selectedIds.includes(o.id)).map((o) => ({ id: o.id, kind: o.kind }));
            s.length && this.emit("delete-selection-requested", { items: s });
            return;
          }
          if (this._selectedWaypoint) {
            const s = this.scene.edges.find((o) => o.id === this._selectedWaypoint.edgeId);
            s && (e.preventDefault(), this.removeWaypoint(s, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((s) => s.id === this.selectedId), i = this.scene.nodes.find((s) => s.id === this.selectedId);
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case" && i.kind !== "external-table" && i.kind !== "mcp-server" && i.kind !== "api" && i.kind !== "proxy-api" && i.kind !== "api-operation")
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
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("keydown", this._onKeyDown), this.addEventListener("keyup", this._onKeyUp), this.addEventListener("blur", this._onBlur), window.addEventListener("keydown", this._onWindowSpace, !0), window.addEventListener("keyup", this._onWindowSpaceUp, !0);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown), this.removeEventListener("keyup", this._onKeyUp), this.removeEventListener("blur", this._onBlur), window.removeEventListener("keydown", this._onWindowSpace, !0), window.removeEventListener("keyup", this._onWindowSpaceUp, !0), super.disconnectedCallback();
  }
  commitRename(e, t) {
    if (this._editingId !== e.id) return;
    this._editingId = null;
    const i = t.trim();
    i && i !== e.label && this.emit("node-renamed", { id: e.id, kind: e.kind, name: i });
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector("svg.main");
    this._zoomBehavior = ud().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), ge(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((h) => h.x - h.w / 2)) - e, o = Math.max(...t.map((h) => h.x + h.w / 2)) + e, r = Math.min(...t.map((h) => h.y - h.h / 2)) - e, a = Math.max(...t.map((h) => h.y + h.h / 2)) + e, d = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), c = st.translate(n.width / 2 - d * (s + o) / 2, n.height / 2 - d * (r + a) / 2).scale(d);
    ge(i).call(this._zoomBehavior.transform, c);
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
      (p) => o.has(p.id) && !(p.parentId && o.has(p.parentId))
    ) : null, a = r ? new Map(r.map((p) => [p.id, this.nodePos(p)])) : null, d = (p) => (p.shiftKey || p.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, c = (p) => {
      const f = this.nodeIdAt(p), I = f && f !== t.id ? this.scene.nodes.find((x) => x.id === f) : void 0;
      return I ? I.kind === "external-system" ? I.id : I.parentId ?? null : null;
    }, h = (p) => {
      if ((p.buttons & 1) === 0) {
        m(p);
        return;
      }
      const f = this.toScene(p), I = f.x - i.x, x = f.y - i.y;
      if (!(!s && Math.hypot(I, x) < 3 / this._t.k))
        if (s = !0, r && a) {
          const A = /* @__PURE__ */ new Map();
          for (const y of r) {
            const T = a.get(y.id), U = this.clampToParent(y, T.x + I, T.y + x);
            A.set(y.id, { x: U.x, y: U.y });
          }
          this._dragGroup = A;
        } else d(p) ? (this._dragPos = { id: t.id, x: n.x + I, y: n.y + x }, this._hoverNodeId = c(p)) : (this._dragPos = this.clampToParent(t, n.x + I, n.y + x), this._hoverNodeId = null);
    }, m = (p) => {
      if (window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", m), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, I]) => ({ id: f, x: I.x, y: I.y }))
        });
      else if (s && this._dragPos) {
        if (d(p)) {
          const f = c(p);
          if (p.ctrlKey && t.kind === "api") {
            f && f !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: f,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (f !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: f,
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
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", m);
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((x) => x.parentId === t.id), d = Math.min(...a.map((x) => x.x - x.w / 2)), c = Math.max(...a.map((x) => x.x + x.w / 2)), h = Math.min(...a.map((x) => x.y - x.h / 2)), m = Math.max(...a.map((x) => x.y + x.h / 2)), p = qn(
      a.map((x) => ({ dx: x.x - r.x, dy: x.y - r.y, w: x.w, h: x.h })),
      { w: s, h: o }
    ), f = (x) => {
      if ((x.buttons & 1) === 0) {
        I();
        return;
      }
      const A = this.toScene(x);
      if (x.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(p.w, 2 * Math.abs(A.x - r.x)),
          h: Math.max(p.h, 2 * Math.abs(A.y - r.y))
        };
        return;
      }
      const y = r.x - i * r.w / 2, T = r.y - n * r.h / 2, U = i > 0 ? Math.max(A.x, y + s, a.length ? c + 10 : -1 / 0) : Math.min(A.x, y - s, a.length ? d - 10 : 1 / 0), v = n > 0 ? Math.max(A.y, T + o, a.length ? m + 10 : -1 / 0) : Math.min(A.y, T - o, a.length ? h - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (y + U) / 2,
        y: (T + v) / 2,
        w: Math.abs(U - y),
        h: Math.abs(v - T)
      };
    }, I = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", I), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", I);
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
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / d);
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
    const t = this.scene.nodes.find((h) => h.id === e.sourceId), i = this.scene.nodes.find((h) => h.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), r = n[0] ?? o, a = n[n.length - 1] ?? s;
    let d = this.borderPoint(t, r.x, r.y), c = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const h = this.edgeOffset(e);
      if (h !== 0) {
        const m = Math.hypot(c.x - d.x, c.y - d.y) || 1, p = -(c.y - d.y) / m * h, f = (c.x - d.x) / m * h;
        d = { x: d.x + p, y: d.y + f }, c = { x: c.x + p, y: c.y + f };
      }
    }
    return [d, ...n, c];
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
      const { dist: s } = fd(t, e[n], e[n + 1]);
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
      const c = this.toScene(d);
      if (o) {
        if (this._wpDrag) {
          const h = [...this._wpDrag.points];
          h[s] = c, this._wpDrag = { ...this._wpDrag, points: h };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const h = [...this.edgePoints[t.id] ?? []];
        h.splice(s, 0, c), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: h, index: s };
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
    }, d = t.slice(1, -1), c = t.map((h) => `${h.x},${h.y}`).join(" ");
    return V`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${c}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(h) => {
      h.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(h) => {
      h.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(h));
    }}
              @pointerdown=${(h) => this.onEdgeHitPointerDown(h, e, t)}>
          ${e.tooltip ? V`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${gd(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}
              pointer-events="none"></path>
        ${e.label ? V`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(h) => {
      h.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(h) => {
      h.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: h.clientX,
        y: h.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${s ? d.map((h, m) => {
      var f;
      const p = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === m;
      return V`
                <circle data-waypoint cx=${h.x} cy=${h.y} r=${p ? 6 : 5}
                        fill=${p ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(I) => {
        I.button === 0 && (I.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: m }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], m));
      }}
                        @dblclick=${(I) => {
        I.stopPropagation(), this.removeWaypoint(e, m);
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
    var p, f, I;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((p = this._resize) == null ? void 0 : p.id) === e.id ? this._resize.w : e.w, d = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = a / 2, h = d / 2, m = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return V`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (I = this._dragGroup) != null && I.has(e.id) ? "none" : "auto"}
         @pointerdown=${(x) => this.onNodePointerDown(x, e)}
         @dblclick=${(x) => {
      x.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? V`<rect x=${-c - 4} y=${-h - 4} width=${a + 8} height=${d + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-h} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? V`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? V`<text x=${-c} y=${-h - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && xt[e.symbol] && !r ? V`<g transform="translate(${c - 17}, ${-h + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${xt[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && xt[e.symbol] ? V`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${xt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? V`
              <foreignObject x=${-c + 6} y=${o ? -h + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(x) => x.stopPropagation()}
                  @keydown=${(x) => {
      x.stopPropagation(), x.key === "Enter" && this.commitRename(e, x.target.value), x.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(x) => this.commitRename(e, x.target.value)}
                />
              </foreignObject>` : r ? V`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? V`<text x=${-c + 12} y=${-h + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : V`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? V`<line x1=${-c + 8} y1=${-h + 28} x2=${c - 8} y2=${-h + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, h],
      [0, -h]
    ].map(
      ([x, A]) => V`
                <circle data-handle cx=${x} cy=${A} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(y) => this.onHandlePointerDown(y, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([x, A]) => V`
                <rect data-resize x=${x * c - 6.5} y=${A * h - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${x * A > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(y) => this.onResizePointerDown(y, e, x, A)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return V``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return V``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return V`
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
        const { a: r, b: a } = this._rubber, d = Math.min(r.x, a.x), c = Math.max(r.x, a.x), h = Math.min(r.y, a.y), m = Math.max(r.y, a.y), p = this.scene.nodes.filter((f) => {
          const I = this.nodePos(f);
          return I.x >= d && I.x <= c && I.y >= h && I.y <= m;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: p });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return V``;
    const { a: e, b: t } = this._rubber;
    return V`
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
    const n = this.getBoundingClientRect(), s = this._t.k, o = st.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    ge(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return M``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return M`
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
      var h, m;
      (m = (h = c.currentTarget).hasPointerCapture) != null && m.call(h, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const h = this.nodePos(c);
      return V`<rect
              x=${(h.x - c.w / 2 - e.minX) * n}
              y=${(h.y - c.h / 2 - e.minY) * n}
              width=${Math.max(2, c.w * n)}
              height=${Math.max(2, c.h * n)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
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
      if (!a) return V``;
      const d = this.renderEdge(r, a, [...t]);
      for (let c = 0; c < a.length - 1; c++) t.push([a[c], a[c + 1]]);
      return d;
    }), n = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (n.has(r.sourceId) || n.has(r.targetId) ? o : s).push(
        i[a]
      );
    }), M`
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
      (r) => V`
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
Z.styles = ui`
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
  we({ attribute: !1 })
], Z.prototype, "scene", 2);
te([
  we({ attribute: !1 })
], Z.prototype, "selectedId", 2);
te([
  we({ attribute: !1 })
], Z.prototype, "selectedIds", 2);
te([
  we({ type: Boolean })
], Z.prototype, "connectable", 2);
te([
  we({ attribute: !1 })
], Z.prototype, "edgePoints", 2);
te([
  N()
], Z.prototype, "_t", 2);
te([
  N()
], Z.prototype, "_dragPos", 2);
te([
  N()
], Z.prototype, "_dragGroup", 2);
te([
  N()
], Z.prototype, "_pendingLink", 2);
te([
  N()
], Z.prototype, "_hoverNodeId", 2);
te([
  N()
], Z.prototype, "_editingId", 2);
te([
  N()
], Z.prototype, "_spaceDown", 2);
te([
  N()
], Z.prototype, "_wpDrag", 2);
te([
  N()
], Z.prototype, "_selectedWaypoint", 2);
te([
  N()
], Z.prototype, "_resize", 2);
te([
  N()
], Z.prototype, "_rubber", 2);
Z = te([
  mi("modux-canvas")
], Z);
const L = {
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
function X(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Le = (e) => e.trim().toLowerCase();
function yd(e, t) {
  var O, R, J, ie, ne;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((l) => [l.id, l.name])), s = e.modules.flatMap(
    (l) => (l.useCases ?? []).map((g) => ({ ...g, moduleId: l.id }))
  ), o = new Set(s.map((l) => l.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((l) => (l.domainServices ?? []).map((g) => g.id))
  ), d = e.modules.flatMap(
    (l) => (l.domainEvents ?? []).map((g) => ({ ...g, moduleId: l.id, application: !1 }))
  ), c = e.modules.flatMap(
    (l) => (l.applicationEvents ?? []).map((g) => ({ ...g, moduleId: l.id, application: !0 }))
  ), h = e.modules.flatMap(
    (l) => (l.readModels ?? []).map((g) => ({ ...g, moduleId: l.id }))
  );
  for (const l of s)
    ae(i, {
      id: l.id,
      label: l.name,
      x: 0,
      y: 0,
      w: L.command.w,
      h: L.command.h,
      kind: "use-case",
      symbol: l.policy ? "flow" : "gear",
      fill: l.policy ? L.policy.fill : L.command.fill,
      stroke: l.policy ? L.policy.stroke : L.command.stroke,
      badge: l.policy ? "POLICY" : "COMANDO",
      tooltip: l.policy ? `${l.name} — policy de ${n.get(l.moduleId) ?? l.moduleId} (reacción, no caso de negocio)` : `${l.name} — caso de uso de ${n.get(l.moduleId) ?? l.moduleId}`
    });
  for (const l of r)
    ae(i, {
      id: l.id,
      label: l.name,
      x: 0,
      y: 0,
      w: L.aggregate.w,
      h: L.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: L.aggregate.fill,
      stroke: L.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${l.name} — agregado de ${n.get(l.moduleId) ?? l.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const l of [...d, ...c])
    ae(i, {
      id: l.id,
      label: l.name,
      x: 0,
      y: 0,
      w: L.event.w,
      h: L.event.h,
      kind: l.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: L.event.fill,
      stroke: L.event.stroke,
      badge: l.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${l.name} — evento de ${n.get(l.moduleId) ?? l.moduleId}`
    }), m.set(Le(l.name), l.id);
  const p = (l) => {
    if (!l || !l.trim()) return null;
    const g = m.get(Le(l));
    if (g) return g;
    const w = `evname:${Le(l)}`;
    return ae(i, {
      id: w,
      label: l,
      x: 0,
      y: 0,
      w: L.event.w,
      h: L.event.h,
      kind: "event-name",
      symbol: "event",
      fill: L.event.fill,
      stroke: L.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${l} — referenciado por nombre, sin evento declarado en el catálogo`
    }), w;
  }, f = (l) => {
    const g = h.find(($) => $.id === l.id) ?? h.find(($) => l.name && Le($.name) === Le(l.name)), w = (g == null ? void 0 : g.id) ?? (l.id || (l.name ? `rm:${Le(l.name)}` : null));
    return w ? (ae(i, {
      id: w,
      label: (g == null ? void 0 : g.name) ?? l.name ?? w,
      x: 0,
      y: 0,
      w: L.readModel.w,
      h: L.readModel.h,
      kind: g ? "read-model" : "derived-read-model",
      fill: L.readModel.fill,
      stroke: L.readModel.stroke,
      dashed: !g,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const l of e.actorUses ?? []) {
    if (!o.has(l.targetId)) continue;
    const g = (e.actors ?? []).find((w) => w.id === l.actorId);
    g && (ae(i, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: L.actor.w,
      h: L.actor.h,
      kind: "actor",
      symbol: "person",
      fill: L.actor.fill,
      stroke: L.actor.stroke,
      badge: "ACTOR"
    }), X(i, {
      id: `es-actor:${g.id}->${l.targetId}`,
      sourceId: g.id,
      targetId: l.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const l of e.aiAgents ?? []) {
    const g = (e.agentUses ?? []).filter((k) => k.agentId === l.id), w = (e.agentExternalUses ?? []).filter((k) => k.agentId === l.id), $ = (e.agentRags ?? []).filter((k) => k.agentId === l.id), b = (e.agentMcpUses ?? []).filter((k) => k.agentId === l.id), E = (e.agentGatewayUses ?? []).some((k) => k.agentId === l.id) || (e.agentApiOpUses ?? []).some((k) => k.agentId === l.id) || (e.agentQueryUses ?? []).some((k) => k.agentId === l.id) || (e.agentDelegations ?? []).some((k) => k.agentId === l.id) || (e.agentTriggers ?? []).some((k) => k.agentId === l.id);
    if (!(!g.length && !w.length && !$.length && !b.length && !E)) {
      ae(i, {
        id: l.id,
        label: l.name,
        x: 0,
        y: 0,
        w: L.actor.w,
        h: L.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${l.name} — agente de IA (consume por MCP)`
      });
      for (const k of g)
        o.has(k.useCaseId) && X(i, {
          id: `es-agent:${l.id}->${k.useCaseId}`,
          sourceId: l.id,
          targetId: k.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const k of w) {
        const P = e.externalSystems.find(
          (B) => (B.useCases ?? []).some((Y) => Y.id === k.externalUseCaseId)
        );
        if (!P) continue;
        const F = (O = (P.useCases ?? []).find((B) => B.id === k.externalUseCaseId)) == null ? void 0 : O.name;
        ae(i, {
          id: P.id,
          label: P.name,
          x: 0,
          y: 0,
          w: L.external.w,
          h: L.external.h,
          kind: "external-system",
          symbol: "component",
          fill: L.external.fill,
          stroke: L.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), X(i, {
          id: `es-agentx:${l.id}->${k.externalUseCaseId}`,
          sourceId: l.id,
          targetId: P.id,
          kind: "es-agent-external",
          label: F,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: F ? `Llama a ${F} del sistema externo` : void 0
        });
      }
      for (const k of b) {
        const P = e.externalSystems.find(
          (B) => (B.mcpServers ?? []).some((Y) => Y.id === k.mcpServerId)
        );
        if (!P) continue;
        const F = (R = (P.mcpServers ?? []).find((B) => B.id === k.mcpServerId)) == null ? void 0 : R.name;
        ae(i, {
          id: P.id,
          label: P.name,
          x: 0,
          y: 0,
          w: L.external.w,
          h: L.external.h,
          kind: "external-system",
          symbol: "component",
          fill: L.external.fill,
          stroke: L.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), X(i, {
          id: `es-agentmcp:${l.id}->${k.mcpServerId}`,
          sourceId: l.id,
          targetId: P.id,
          kind: "es-agent-mcp",
          label: F,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: F ? `Consume las herramientas del servidor MCP ${F}` : void 0
        });
      }
      for (const k of $) {
        const P = (e.rags ?? []).find((F) => F.id === k.ragId);
        if (P) {
          ae(i, {
            id: P.id,
            label: P.name,
            x: 0,
            y: 0,
            w: L.readModel.w,
            h: L.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${P.name} — base de conocimiento (retrieval)`
          }), X(i, {
            id: `es-agrag:${l.id}->${P.id}`,
            sourceId: l.id,
            targetId: P.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const F of P.sourceReadModelIds ?? []) {
            const B = f({ id: F });
            B && X(i, {
              id: `es-ragsrc:${P.id}->${B}`,
              sourceId: B,
              targetId: P.id,
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
  const I = (l) => {
    const g = e.externalSystems.find((w) => w.id === l);
    return g ? (ae(i, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: L.external.w,
      h: L.external.h,
      kind: "external-system",
      symbol: "component",
      fill: L.external.fill,
      stroke: L.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), g.id) : null;
  };
  for (const l of e.externalCalls ?? []) {
    const g = I(l.externalSystemId);
    !g || !o.has(l.useCaseId) || X(i, {
      id: `es-extin:${g}->${l.useCaseId}`,
      sourceId: g,
      targetId: l.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const l of e.externalUseCaseCalls ?? []) {
    if (!o.has(l.sourceId)) continue;
    const g = e.externalSystems.find(
      (b) => (b.useCases ?? []).some((E) => E.id === l.targetId)
    ), w = g ? I(g.id) : null;
    if (!w) continue;
    const $ = (J = ((g == null ? void 0 : g.useCases) ?? []).find((b) => b.id === l.targetId)) == null ? void 0 : J.name;
    X(i, {
      id: `es-extout:${l.sourceId}->${l.targetId}`,
      sourceId: l.sourceId,
      targetId: w,
      kind: "es-command-external",
      label: $,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: $ ? `Llama a ${$} del sistema externo` : void 0
    });
  }
  for (const l of e.aggregateCalls ?? [])
    !o.has(l.sourceId) || !i.nodes.has(l.targetId) || X(i, {
      id: `es-write:${l.sourceId}->${l.targetId}`,
      sourceId: l.sourceId,
      targetId: l.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const x = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const l of x)
    !i.nodes.has(l.domainEventId) || !(i.nodes.has(l.sourceId) && (o.has(l.sourceId) || r.some((w) => w.id === l.sourceId) || a.has(l.sourceId))) || X(i, {
      id: `es-emit:${l.sourceId}->${l.domainEventId}`,
      sourceId: l.sourceId,
      targetId: l.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const A = (l, g, w, $, b, E) => (ae(i, {
    id: l,
    label: g,
    x: 0,
    y: 0,
    w: L.policy.w,
    h: L.policy.h,
    kind: w,
    symbol: "flow",
    fill: L.policy.fill,
    stroke: L.policy.stroke,
    badge: $,
    tooltip: b
  }), l), y = (l, g) => {
    const w = p(l);
    w && X(i, {
      id: `es-trigger:${w}->${g}`,
      sourceId: w,
      targetId: g,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, T = (l, g) => {
    !g || !o.has(g) || X(i, {
      id: `es-invoke:${l}->${g}`,
      sourceId: l,
      targetId: g,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const l of e.subscriptions ?? []) {
    const g = A(
      l.id,
      l.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${l.name}${l.eventName ? ` — reacciona a ${l.eventName}` : ""}${l.consumerGroup ? ` · grupo ${l.consumerGroup}` : ""}`
    );
    y(l.eventName, g);
    for (const w of l.actions ?? []) {
      if (w.type === "CallUseCase" && T(g, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const $ = `saga:${w.sagaId}`;
        A($, w.sagaId, "saga", "SAGA"), X(i, {
          id: `es-saga:${g}->${$}`,
          sourceId: g,
          targetId: $,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const $ = (e.projections ?? []).find((b) => b.id === w.projectionId);
        $ && X(i, {
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
  for (const l of e.projections ?? []) {
    const g = A(
      l.id,
      l.name,
      "projection",
      "PROYECCIÓN",
      `${l.name}${l.readModelName ? ` — materializa ${l.readModelName}` : ""}`
    );
    for (const b of l.handledEventIds) {
      const E = i.nodes.has(b) ? b : null;
      E && X(i, {
        id: `es-trigger:${E}->${g}`,
        sourceId: E,
        targetId: g,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    l.sourceAggregateId && i.nodes.has(l.sourceAggregateId) && X(i, {
      id: `es-state:${l.id}`,
      sourceId: l.sourceAggregateId,
      targetId: g,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const w = l.sourceExternalUseCaseId ?? l.sourceExternalTableId;
    if (w) {
      const b = e.externalSystems.find(
        (k) => (k.useCases ?? []).some((P) => P.id === w) || (k.tables ?? []).some((P) => P.id === w)
      ), E = b ? I(b.id) : null;
      if (E) {
        const k = ((ie = (b.useCases ?? []).find((P) => P.id === w)) == null ? void 0 : ie.name) ?? ((ne = (b.tables ?? []).find((P) => P.id === w)) == null ? void 0 : ne.name);
        X(i, {
          id: `es-poll:${l.id}`,
          sourceId: E,
          targetId: g,
          kind: "es-projects-poll",
          label: k,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: k ? `polling de ${k}` : "polling"
        });
      }
    }
    const $ = f({ id: l.readModelId, name: l.readModelName });
    $ && X(i, {
      id: `es-projects:${g}->${$}`,
      sourceId: g,
      targetId: $,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const l of e.flows) {
    if (l.archetype === "MATERIALIZES") {
      const w = p(l.triggerEvent), $ = f({ name: l.readModelName ?? `${l.triggerEvent}View` });
      w && $ && X(i, {
        id: `es-mat:${l.id}`,
        sourceId: w,
        targetId: $,
        kind: "es-materializes",
        label: l.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${l.name} [MATERIALIZES]`
      });
      continue;
    }
    const g = A(
      `flow:${l.id}`,
      l.name,
      "flow",
      `POLICY · ${l.archetype}`,
      `Flow ${l.name} [${l.archetype}]`
    );
    if (y(l.triggerEvent, g), T(g, l.targetUseCaseId), !l.targetUseCaseId) {
      const w = I(l.targetId), $ = w ?? `tgt:${l.targetId}`;
      !w && n.has(l.targetId) && ae(i, {
        id: $,
        label: n.get(l.targetId) ?? l.targetId,
        x: 0,
        y: 0,
        w: L.module.w,
        h: L.module.h,
        kind: "module",
        symbol: "component",
        fill: L.module.fill,
        stroke: L.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has($) && X(i, {
        id: `es-deliver:${l.id}`,
        sourceId: g,
        targetId: $,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const l of e.processes ?? []) {
    const g = A(
      l.id,
      l.name,
      "process",
      `PROCESO${l.sla ? ` · SLA ${l.sla}` : ""}`,
      `${l.name}${l.triggerEvent ? ` — arranca con ${l.triggerEvent}` : ""}`
    );
    y(l.triggerEvent, g);
    for (const $ of l.steps) T(g, $.useCaseId);
    const w = p(l.onCompletionEventName);
    w && X(i, {
      id: `es-done:${l.id}`,
      sourceId: g,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const l of e.workflows ?? []) {
    const g = A(
      l.id,
      l.name,
      "workflow",
      "WORKFLOW",
      `${l.name}${l.triggerEvent ? ` — arranca con ${l.triggerEvent}` : ""}`
    );
    y(l.triggerEvent, g);
    for (const $ of l.steps ?? []) {
      T(g, $.targetUseCaseId);
      for (const b of [$.emittedEventName, $.completionEventName]) {
        const E = p(b);
        E && X(i, {
          id: `es-wfemit:${l.id}:${E}`,
          sourceId: g,
          targetId: E,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = p(l.onCompletionEventName);
    w && X(i, {
      id: `es-done:${l.id}`,
      sourceId: g,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const U = [...i.nodes.values()], v = /* @__PURE__ */ new Map();
  for (const l of i.edges)
    v.has(l.targetId) || v.set(l.targetId, []), v.get(l.targetId).push(l.sourceId);
  const _ = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Set(), C = (l) => {
    const g = _.get(l);
    if (g !== void 0) return g;
    if (S.has(l)) return 0;
    S.add(l);
    const w = v.get(l) ?? [], $ = w.length ? 1 + Math.max(...w.map(C)) : 0;
    return S.delete(l), _.set(l, $), $;
  }, W = /* @__PURE__ */ new Map();
  for (const l of U) {
    const g = t[l.id];
    if (g) {
      l.x = g.x, l.y = g.y;
      continue;
    }
    const w = C(l.id), $ = W.get(w) ?? 0;
    W.set(w, $ + 1), l.x = 140 + w * 260, l.y = 110 + $ * 110;
  }
  return { nodes: U, edges: i.edges };
}
const wd = 190, Id = 56, Zi = 180, vd = 56, xd = 150, _d = 44, Ji = 250, en = 100;
function $d(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), r;
  };
  return n(e);
}
function kd(e, t) {
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
function bd(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var d;
    return (d = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : d.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var A;
    const d = new Map(a.steps.map((y) => [y.id, y])), c = new Map(a.steps.map((y) => [y.id, $d(y, d)])), h = /* @__PURE__ */ new Map();
    for (const y of a.steps) {
      const T = c.get(y.id) ?? 0;
      h.set(T, (h.get(T) ?? 0) + 1);
    }
    const m = Math.max(1, ...h.values()), p = kd(e, a);
    if (p && !s.has(p.id)) {
      s.add(p.id);
      const y = t[p.id] ?? { x: 140, y: r };
      i.push({
        id: p.id,
        label: p.label,
        x: y.x,
        y: y.y,
        w: xd,
        h: _d,
        kind: p.kind,
        symbol: p.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: p.kind === "aggregate" ? "AGGREGATE" : p.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[a.id] ?? { x: 420, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: f.x,
      y: f.y,
      w: wd,
      h: Id,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), p && n.push({
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
    let x = 0;
    for (const y of a.steps) {
      const T = c.get(y.id) ?? 0;
      x = Math.max(x, T);
      const U = I.get(T) ?? 0;
      I.set(T, U + 1);
      const v = t[y.id] ?? {
        x: f.x + (T + 1) * Ji,
        y: r + (U - (h.get(T) - 1) / 2) * en
      }, _ = o(y.targetUseCaseId);
      i.push({
        id: y.id,
        label: y.name,
        x: v.x,
        y: v.y,
        w: Zi,
        h: vd,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: _ ? `→ ${_}` : "∅ sin use case",
        tooltip: `${y.name}${y.emittedEventName ? ` · emite ${y.emittedEventName}` : ""}${_ ? ` · lanza ${_}` : ""}${y.completionEventName ? ` · espera ${y.completionEventName}` : ""}`
      });
      const S = (y.dependsOnStepIds ?? []).filter((C) => d.has(C));
      S.length === 0 && n.push({
        id: `wfs:${a.id}:${y.id}`,
        sourceId: a.id,
        targetId: y.id,
        kind: "workflow-start",
        label: y.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const C of S)
        n.push({
          id: `wfdep:${C}->${y.id}`,
          sourceId: C,
          targetId: y.id,
          kind: "workflow-dependency",
          label: y.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${y.name} espera a ${((A = d.get(C)) == null ? void 0 : A.name) ?? C}`
        });
    }
    if (a.onCompletionEventName) {
      const y = `done:${a.id}`, T = t[y] ?? { x: f.x + (x + 2) * Ji, y: r };
      i.push({
        id: y,
        label: a.onCompletionEventName,
        x: T.x,
        y: T.y,
        w: Zi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const U = new Set(a.steps.flatMap((_) => _.dependsOnStepIds ?? [])), v = a.steps.filter((_) => !U.has(_.id));
      for (const _ of v.length ? v : [])
        n.push({
          id: `wfd:${a.id}:${_.id}`,
          sourceId: _.id,
          targetId: y,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || n.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: y,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, m + 1) * en + 60;
  }), { nodes: i, edges: n };
}
async function Ed(e, t) {
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
var Sd = Object.defineProperty, Ad = Object.getOwnPropertyDescriptor, q = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ad(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Sd(t, i, s), s;
};
const ai = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Cd = Object.keys(ai), Md = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], Nd = ["CORE", "SUPPORTING", "GENERIC"];
function Qe(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, r = i.y + i.h / 2;
  let a = 0, d = 1;
  const c = t.x - e.x, h = t.y - e.y;
  for (const [m, p] of [
    [-c, e.x - n],
    [c, s - e.x],
    [-h, e.y - o],
    [h, r - e.y]
  ]) {
    if (m === 0) {
      if (p < 0) return !1;
      continue;
    }
    const f = p / m;
    if (m < 0) {
      if (f > d) return !1;
      f > a && (a = f);
    } else {
      if (f < a) return !1;
      f < d && (d = f);
    }
  }
  return d - a > 0.02;
}
function Pd(e, t, i = 28) {
  var d;
  const n = new Map(e.nodes.map((c) => [c.id, c])), s = (c) => {
    var m;
    const h = /* @__PURE__ */ new Set();
    for (let p = c; p; p = (m = n.get(p)) == null ? void 0 : m.parentId) h.add(p);
    return h;
  }, o = e.nodes.filter((c) => !c.parentId), r = /* @__PURE__ */ new Map(), a = (c, h, m) => {
    const p = { x: m.x, y: m.y, w: m.w + 2 * i, h: m.h + 2 * i }, f = m.w / 2 + i * 1.5, I = m.h / 2 + i * 1.5, x = { x: m.x - f, y: m.y - I }, A = { x: m.x + f, y: m.y - I }, y = { x: m.x - f, y: m.y + I }, T = { x: m.x + f, y: m.y + I }, U = [];
    for (const v of [x, A, y, T])
      !Qe(c, v, p) && !Qe(v, h, p) && U.push([v]);
    for (const [v, _] of [
      [x, A],
      [A, x],
      [A, T],
      [T, A],
      [T, y],
      [y, T],
      [y, x],
      [x, y]
    ])
      !Qe(c, v, p) && !Qe(_, h, p) && U.push([v, _]);
    return U;
  };
  for (const c of e.edges) {
    if ((d = t[c.id]) != null && d.length) continue;
    const h = n.get(c.sourceId), m = n.get(c.targetId);
    if (!h || !m) continue;
    const p = /* @__PURE__ */ new Set([...s(h.id), ...s(m.id)]), f = [
      { x: h.x, y: h.y },
      { x: m.x, y: m.y }
    ];
    for (let I = 0; I < 12; I++) {
      let x = !1;
      e: for (let A = 0; A < f.length - 1; A++)
        for (const y of o) {
          if (p.has(y.id)) continue;
          const T = { x: y.x, y: y.y, w: y.w + 2 * i, h: y.h + 2 * i };
          if (!Qe(f[A], f[A + 1], T)) continue;
          const U = a(f[A], f[A + 1], y);
          if (!U.length) continue;
          const v = (S) => o.some(
            (C) => C !== y && !p.has(C.id) && Math.abs(S.x - C.x) < C.w / 2 + i / 2 && Math.abs(S.y - C.y) < C.h / 2 + i / 2
          ), _ = (S) => {
            let C = 0;
            const W = [f[A], ...S, f[A + 1]];
            for (let O = 0; O < W.length - 1; O++)
              C += Math.hypot(W[O + 1].x - W[O].x, W[O + 1].y - W[O].y);
            return C + (S.some(v) ? 1e4 : 0);
          };
          U.sort((S, C) => _(S) - _(C)), f.splice(A + 1, 0, ...U[0]), x = !0;
          break e;
        }
      if (!x) break;
    }
    f.length > 2 && r.set(
      c.id,
      f.slice(1, -1).map((I) => ({ x: Math.round(I.x), y: Math.round(I.y) }))
    );
  }
  return r;
}
const H = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Td(e, t) {
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
function Rd(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let z = class extends Re {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newExternalId = "", this._newApiId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._deletePicker = null;
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
  /**
   * Every detail level of the context map keeps ITS OWN geometry: coming back
   * to a level must look exactly as it was left there, untouched by whatever
   * the auto-separation did at the other levels. The legacy 'context-map'
   * entry doubles as the Contextos level.
   */
  layoutKey(e) {
    return e === "context-map" && this._detail !== "contexts" ? `context-map@${this._detail}` : e;
  }
  viewLayout(e) {
    return gt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = gt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = gt(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    }), e === "contexts" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "external-ai-agent" && this._newContextMapKind !== "mcp-gateway" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module");
    const s = gt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((h) => !h.parentId), a = di(r), d = [...a.keys()].map((h) => ({
      kind: "move-node",
      view: "context-map",
      id: h,
      pos: o.nodes[h] ?? null
    })), c = { ...o.nodes };
    for (const [h, m] of a) {
      const p = r.find((I) => I.id === h), f = o.nodes[h] ?? { x: p.x, y: p.y };
      c[h] = {
        x: Math.round(f.x + (m.x - p.x)),
        y: Math.round(f.y + (m.y - p.y))
      };
    }
    this.writeViewLayout("context-map", { ...o, nodes: c }), d.length && this.pushUndoEntry(d);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Pd(e, t);
    return i.size ? { ...Object.fromEntries(i), ...t } : t;
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
      case "add-external-dependency": {
        const o = (this.model.externalSystemDependencies ?? []).find(
          (r) => r.sourceId === e.sourceId && r.targetId === e.targetId
        );
        return o ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const o = (this.model.externalSystemDependencies ?? []).find(
          (r) => r.sourceId === e.sourceId && r.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: o == null ? void 0 : o.type }];
      }
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
        return o ? [
          { kind: "add-ai-agent", id: o.id, name: o.name, external: o.external },
          ...(this.model.agentUses ?? []).filter((r) => r.agentId === e.id).map((r) => ({ kind: "add-agent-use", sourceId: e.id, targetId: r.useCaseId })),
          ...(this.model.agentExternalUses ?? []).filter((r) => r.agentId === e.id).map((r) => ({
            kind: "add-agent-external-use",
            sourceId: e.id,
            targetId: r.externalUseCaseId
          })),
          ...(this.model.agentMcpUses ?? []).filter((r) => r.agentId === e.id).map((r) => ({ kind: "add-agent-mcp", sourceId: e.id, targetId: r.mcpServerId })),
          ...(this.model.agentGatewayUses ?? []).filter((r) => r.agentId === e.id).map((r) => ({ kind: "add-agent-gateway", sourceId: e.id, targetId: r.gatewayId })),
          ...(this.model.agentApiOpUses ?? []).filter((r) => r.agentId === e.id).map((r) => ({
            kind: "add-agent-api-operation",
            sourceId: e.id,
            targetId: r.apiOperationId
          })),
          ...(this.model.agentQueryUses ?? []).filter((r) => r.agentId === e.id).map((r) => ({ kind: "add-agent-query", sourceId: e.id, targetId: r.queryServiceId })),
          ...(this.model.agentRags ?? []).filter((r) => r.agentId === e.id).map((r) => ({ kind: "add-agent-rag", sourceId: e.id, targetId: r.ragId })),
          ...(this.model.agentDelegations ?? []).filter((r) => r.agentId === e.id || r.delegateAgentId === e.id).map((r) => ({
            kind: "add-agent-delegate",
            sourceId: r.agentId,
            targetId: r.delegateAgentId
          })),
          ...(this.model.actorAgentUses ?? []).filter((r) => r.agentId === e.id).map((r) => ({ kind: "add-actor-agent", sourceId: r.actorId, targetId: e.id })),
          ...(this.model.agentTriggers ?? []).filter((r) => r.agentId === e.id).map((r) => ({ kind: "add-agent-trigger", sourceId: r.eventId, targetId: e.id }))
        ] : null;
      }
      case "add-mcp-gateway":
        return [{ kind: "remove-mcp-gateway", id: e.id }];
      case "remove-mcp-gateway": {
        const o = (this.model.mcpGateways ?? []).find((r) => r.id === e.id);
        return o ? [
          { kind: "add-mcp-gateway", id: o.id, name: o.name },
          ...[
            ...o.mcpServerIds ?? [],
            ...o.apiIds ?? [],
            ...o.apiOperationIds ?? [],
            ...o.useCaseIds ?? [],
            ...o.ragIds ?? []
          ].map((r) => ({ kind: "add-gateway-exposure", sourceId: e.id, targetId: r })),
          ...(this.model.agentGatewayUses ?? []).filter((r) => r.gatewayId === e.id).map((r) => ({ kind: "add-agent-gateway", sourceId: r.agentId, targetId: e.id }))
        ] : null;
      }
      case "add-gateway-exposure":
        return [{ kind: "remove-gateway-exposure", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-gateway-exposure":
        return [{ kind: "add-gateway-exposure", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-gateway":
        return [{ kind: "remove-agent-gateway", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-gateway":
        return [{ kind: "add-agent-gateway", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-api-operation":
        return [{ kind: "remove-agent-api-operation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-api-operation":
        return [{ kind: "add-agent-api-operation", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-query":
        return [{ kind: "remove-agent-query", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-query":
        return [{ kind: "add-agent-query", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-delegate":
        return [{ kind: "remove-agent-delegate", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-delegate":
        return [{ kind: "add-agent-delegate", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-actor-agent":
        return [{ kind: "remove-actor-agent", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-agent":
        return [{ kind: "add-actor-agent", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-trigger":
        return [{ kind: "remove-agent-trigger", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-trigger":
        return [{ kind: "add-agent-trigger", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-use":
        return [{ kind: "remove-agent-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-use":
        return [{ kind: "add-agent-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-external-use":
        return [{ kind: "remove-agent-external-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-external-use":
        return [{ kind: "add-agent-external-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-mcp":
        return [{ kind: "remove-agent-mcp", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-mcp":
        return [{ kind: "add-agent-mcp", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-mcp-server":
        return [{ kind: "remove-mcp-server", id: e.id }];
      case "remove-mcp-server": {
        for (const o of this.model.externalSystems) {
          const r = (o.mcpServers ?? []).find((a) => a.id === e.id);
          if (r)
            return [
              { kind: "add-mcp-server", id: r.id, name: r.name, moduleId: o.id, uri: r.uri },
              ...(this.model.agentMcpUses ?? []).filter((a) => a.mcpServerId === e.id).map(
                (a) => ({
                  kind: "add-agent-mcp",
                  sourceId: a.agentId,
                  targetId: e.id
                })
              )
            ];
        }
        return null;
      }
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
        const r = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((a) => a.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((a) => a.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((a) => a.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((a) => a.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((a) => a.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((a) => a.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((a) => a.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((a) => a.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((a) => a.id === e.id);
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
    const d = this.sceneFor(s), c = d.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = d.nodes.find((p) => p.id === c.parentId);
      m && (a = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const h = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const p = this.inverseOf(m);
        p && h.unshift(...p), this.command(m, !1);
      }
    }
    this.pushUndoEntry(h);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((I) => I.id === t) ?? (this.model.proxyApis ?? []).find((I) => I.id === t);
    if (!o || i && !this.model.externalSystems.some((I) => I.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const d = this._view, c = this.viewLayout(d), h = this.sceneFor(d), m = a ? h.nodes.find((I) => I.id === a) : void 0, p = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, f = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: d, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(d, { ...c, nodes: { ...c.nodes, [t]: p } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((I) => I.id === t), r = this.model.externalSystems.find((I) => I.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (I) => I.targetApiId === t && I.publishedByExternalSystemId === i
    )) return;
    const d = `proxy-${H(o.name)}-${H(r.name)}`;
    if ((this.model.proxyApis ?? []).some((I) => I.id === d)) return;
    const c = this._view, h = this.viewLayout(c), p = this.sceneFor(c).nodes.find((I) => I.id === i);
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
    const f = [{ kind: "remove-proxy-api", id: d }];
    p && (f.push({ kind: "move-node", view: c, id: d, pos: h.nodes[d] ?? null }), this.writeViewLayout(c, {
      ...h,
      nodes: { ...h.nodes, [d]: { x: n - p.x, y: s - p.y } }
    })), this.pushUndoEntry(f);
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
    for (const { id: a, x: d, y: c } of t) {
      r.push({ kind: "move-node", view: i, id: a, pos: n.nodes[a] ?? null });
      let h = { x: d, y: c };
      const m = s.nodes.find((p) => p.id === a);
      if (m != null && m.parentId) {
        const p = s.nodes.find((f) => f.id === m.parentId);
        p && (h = { x: d - p.x, y: c - p.y });
      }
      o[a] = h;
    }
    if (this.writeViewLayout(i, { ...n, nodes: o }), i === "processes")
      for (const { id: a } of t) {
        const d = this.stepReorderCommand(a);
        if (d) {
          const c = this.inverseOf(d);
          c && r.unshift(...c), this.command(d, !1);
        }
      }
    this.pushUndoEntry(r);
  }
  onNodeResized(e) {
    var h;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((h = a.sizes) == null ? void 0 : h[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...d.map((m) => ({ kind: "move-node", view: r, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: n } };
    for (const m of d) c[m.id] = { x: m.x - i, y: m.y - n };
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
    const i = _i(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
      const v = this.owningWorkflowOf(t), _ = this.owningWorkflowOf(i);
      if (!v || v !== _ || t === i) return;
      const S = v.steps.find((C) => C.id === i);
      if (((S == null ? void 0 : S.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: v.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (o.has(t)) {
      if (new Set(
        this.model.modules.flatMap((O) => (O.useCases ?? []).map((R) => R.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (R) => R.agentId === t && R.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((O) => (O.useCases ?? []).map((R) => R.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (R) => R.agentId === t && R.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((O) => (O.mcpServers ?? []).map((R) => R.id))
      ).has(i)) {
        (this.model.agentMcpUses ?? []).some(
          (R) => R.agentId === t && R.mcpServerId === i
        ) || this.command({ kind: "add-agent-mcp", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((O) => O.id === i)) {
        (this.model.agentGatewayUses ?? []).some(
          (R) => R.agentId === t && R.gatewayId === i
        ) || this.command({ kind: "add-agent-gateway", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((O) => O.operations.map((R) => R.id))
      ).has(i)) {
        (this.model.agentApiOpUses ?? []).some(
          (R) => R.agentId === t && R.apiOperationId === i
        ) || this.command({ kind: "add-agent-api-operation", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((O) => (O.queryServices ?? []).map((R) => R.id))
      ).has(i)) {
        (this.model.agentQueryUses ?? []).some(
          (R) => R.agentId === t && R.queryServiceId === i
        ) || this.command({ kind: "add-agent-query", sourceId: t, targetId: i });
        return;
      }
      if (o.has(i) && i !== t) {
        (this.model.agentDelegations ?? []).some(
          (R) => R.agentId === t && R.delegateAgentId === i
        ) || this.command({ kind: "add-agent-delegate", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((O) => O.id === i) && ((this.model.agentRags ?? []).some(
        (R) => R.agentId === t && R.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) {
      const v = (this.model.mcpGateways ?? []).find((C) => C.id === t), _ = this.model.externalSystems.some((C) => (C.mcpServers ?? []).some((W) => W.id === i)) || (this.model.apis ?? []).some((C) => C.id === i) || (this.model.apis ?? []).some((C) => C.operations.some((W) => W.id === i)) || this.model.modules.some((C) => (C.useCases ?? []).some((W) => W.id === i)) || (this.model.rags ?? []).some((C) => C.id === i), S = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(i);
      _ && !S && this.command({ kind: "add-gateway-exposure", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === i)) return;
    const r = (this.model.rags ?? []).find((v) => v.id === t);
    if (r) {
      new Set(
        this.model.modules.flatMap((_) => (_.readModels ?? []).map((S) => S.id))
      ).has(i) && !(r.sourceReadModelIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some((v) => v.id === i)) return;
    if ((this.model.proxyApis ?? []).some((v) => v.id === t)) {
      const v = (this.model.proxyApis ?? []).find((_) => _.id === t);
      if ((this.model.apis ?? []).some((_) => _.id === i)) {
        v.targetApiId !== i && this.command({ kind: "set-proxy-target", id: t, targetId: i });
        return;
      }
      this.model.externalSystems.some((_) => _.id === i) && v.publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if ((this.model.apis ?? []).some((v) => v.id === t)) {
      this.model.externalSystems.some((v) => v.id === i) && (this.model.apis ?? []).find((_) => _.id === t).publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    const a = new Set((this.model.actors ?? []).map((v) => v.id));
    if (o.has(i)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((_) => (_.domainEvents ?? []).map((S) => S.id)),
        ...this.model.modules.flatMap((_) => (_.applicationEvents ?? []).map((S) => S.id))
      ])).has(t)) {
        (this.model.agentTriggers ?? []).some(
          (S) => S.eventId === t && S.agentId === i
        ) || this.command({ kind: "add-agent-trigger", sourceId: t, targetId: i });
        return;
      }
      if (!a.has(t)) return;
    }
    if (a.has(t)) {
      const v = new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((C) => C.id))
      ), _ = new Set(
        this.model.modules.flatMap((S) => (S.queryServices ?? []).map((C) => C.id))
      );
      if (v.has(i) || _.has(i)) {
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
      if ((this.model.aiAgents ?? []).some((S) => S.id === i)) {
        (this.model.actorAgentUses ?? []).some(
          (C) => C.actorId === t && C.agentId === i
        ) || this.command({ kind: "add-actor-agent", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    const d = this.owningApiOf(t);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((_) => (_.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: d.id,
          id: t,
          targetUseCaseId: i
        });
        return;
      }
      if (this.model.modules.some((_) => _.id === i)) {
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
    const c = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === t), h = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === t);
    if (c || h) {
      const v = (c ?? h).name, _ = c ? { externalUseCaseId: t } : { externalTableId: t }, S = (O) => c ? O.sourceExternalUseCaseId === t : O.sourceExternalTableId === t, C = this.model.modules.flatMap((O) => O.readModels ?? []).find((O) => O.id === i);
      if (C) {
        (this.model.projections ?? []).some(
          (R) => S(R) && R.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(v)}-${H(C.name)}`,
          name: `${C.name}Projection`,
          ..._,
          targetId: i
        });
        return;
      }
      const W = this.model.modules.find((O) => O.id === i);
      if (W) {
        (this.model.projections ?? []).some(
          (R) => S(R) && R.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(v)}-${H(W.name)}`,
          name: `${v}ViewProjection`,
          ..._,
          moduleId: i,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((v) => v.id === t);
    if (m) {
      const v = this.model.modules.flatMap((S) => S.readModels ?? []).find((S) => S.id === i);
      if (v) {
        (this.model.projections ?? []).some(
          (C) => C.sourceAggregateId === t && C.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(m.name)}-${H(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const _ = this.model.modules.find((S) => S.id === i);
      if (_) {
        (this.model.projections ?? []).some(
          (C) => C.sourceAggregateId === t && C.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(m.name)}-${H(_.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: t,
          moduleId: i,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const p = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((_) => _.id))
    ), f = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((_) => _.id))
    ]), I = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((_) => _.id))
    ), x = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((_) => _.id))), A = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((_) => _.id))
    );
    if (x.has(t) && A.has(i)) {
      (this.model.queryCalls ?? []).some(
        (_) => _.sourceId === t && _.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const y = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((_) => _.id))
    );
    if (x.has(t) && y.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (_) => _.sourceId === t && _.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (x.has(t) && x.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        (_) => _.sourceId === t && _.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (f.has(t) && p.has(i) || x.has(t) && I.has(i)) {
      (this.model.emissions ?? []).some(
        (_) => _.sourceId === t && _.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (p.has(t) || I.has(t)) {
      const v = I.has(t), _ = this.model.modules.flatMap((g) => (v ? g.applicationEvents : g.domainEvents) ?? []).find((g) => g.id === t), S = this.model.modules.flatMap((g) => (g.useCases ?? []).map((w) => ({ u: w, module: g }))).find(({ u: g }) => g.id === i), C = this.model.modules.flatMap((g) => (g.readModels ?? []).map((w) => ({ rm: w, module: g }))).find(({ rm: g }) => g.id === i), W = this.model.modules.find((g) => g.id === i) ?? (C == null ? void 0 : C.module) ?? (S == null ? void 0 : S.module);
      if (!_ || !W) return;
      const O = new Set((this.model.aggregates ?? []).map((g) => g.id)), R = new Set(
        this.model.modules.flatMap((g) => (g.domainServices ?? []).map((w) => w.id))
      ), J = (this.model.emissions ?? []).find(
        (g) => g.domainEventId === t && (v ? x.has(g.sourceId) : O.has(g.sourceId) || R.has(g.sourceId))
      );
      if (!J) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${_.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${_.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const ie = !v && O.has(J.sourceId);
      if (S) {
        if (this.model.flows.some(
          (w) => w.archetype === "TRIGGERS" && w.triggerEvent === _.name && w.targetUseCaseId === S.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${H(_.name)}-${H(S.u.name)}`,
          name: S.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: ie ? J.sourceId : "",
          triggerDomainServiceId: !v && !ie ? J.sourceId : void 0,
          triggerUseCaseId: v ? J.sourceId : void 0,
          triggerEvent: _.name,
          targetId: W.id,
          targetUseCaseId: S.u.id
        });
        return;
      }
      const ne = (C == null ? void 0 : C.rm.name) ?? `${_.name}View`;
      if (this.model.flows.some(
        (g) => g.archetype === "MATERIALIZES" && g.triggerEvent === _.name && g.targetId === W.id && g.readModelName === ne
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${H(_.name)}-${H(ne)}`,
        name: ne,
        archetype: "MATERIALIZES",
        triggerAggregateId: ie ? J.sourceId : "",
        triggerDomainServiceId: !v && !ie ? J.sourceId : void 0,
        triggerUseCaseId: v ? J.sourceId : void 0,
        triggerEvent: _.name,
        targetId: W.id,
        readModelName: ne
      });
      return;
    }
    const T = /* @__PURE__ */ new Set([
      ...f,
      ...x,
      ...A,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((_) => _.id))
    ]);
    if (T.has(t) || T.has(i) || p.has(i) || I.has(i))
      return;
    const U = new Set(this.model.externalSystems.map((v) => v.id));
    if (U.has(t)) {
      if (new Set(
        this.model.modules.flatMap((_) => (_.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.externalCalls ?? []).some(
          (S) => S.externalSystemId === t && S.useCaseId === i
        ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i });
        return;
      }
      if (U.has(i) && i !== t) {
        this._extDepPicker = { sourceId: t, targetId: i, x: n ?? 0, y: s ?? 0 };
        return;
      }
      if ((this.model.apis ?? []).some((_) => _.id === i) || (this.model.proxyApis ?? []).some((_) => _.id === i)) {
        (this.model.externalSystemDependencies ?? []).some(
          (S) => S.sourceId === t && S.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    U.has(i) || a.has(i);
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
  /** Supr with a multi-selection: every selected node goes through the per-kind logic. */
  onDeleteSelectionRequested(e) {
    const { items: t } = e.detail;
    for (const i of t)
      this.onDeleteRequested(
        new CustomEvent("delete-requested", {
          detail: { elementType: "node", id: i.id, kind: i.kind }
        })
      );
    this._multi = [];
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
    if (this._view === "context-map" && e === "edge" && i === "agent-mcp") {
      const n = /^mcpsv:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-mcp", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "gateway-exposure") {
      const n = /^gwx:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-gateway-exposure", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-gateway") {
      const n = /^aggw:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-gateway", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api-op") {
      const n = /^agapi:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api-operation", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-query") {
      const n = /^agqs:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-query", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-delegate") {
      const n = /^agag:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-delegate", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-agent") {
      const n = /^useag:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-actor-agent", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-trigger") {
      const n = /^evag:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-trigger", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (e === "node" && i === "mcp-gateway") {
      this._selectedId = null, this.command({ kind: "remove-mcp-gateway", id: t });
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
    if (e === "node" && i === "mcp-server") {
      this._selectedId = null, this.command({ kind: "remove-mcp-server", id: t });
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
    (i === "module" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
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
      id: `step-${H(e)}`,
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
      id: `wfstep-${H(e)}`,
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
    this._selectedId = null, this._multi = this._multi.includes(t) ? this._multi.filter((i) => i !== t) : [...this._multi, t];
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${H(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
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
    const t = e.detail.kind === "process-step" ? Rd(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Td(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, n, s, o, r, a, d, c, h, m, p, f, I, x, A, y, T, U, v, _, S, C, W, O, R, J, ie, ne, l, g, w, $;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${H(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: H(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${H(e)}`, name: e });
        else if (this._newContextMapKind === "external-ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${H(e)}`, name: e, external: !0 });
        else if (this._newContextMapKind === "mcp-gateway")
          this.command({ kind: "add-mcp-gateway", id: `mcpgw-${H(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${H(e)}`, name: e });
        else if (this._newContextMapKind === "api")
          this.command({ kind: "add-api", id: `api-${H(e)}`, name: e });
        else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${H(e)}`, name: e });
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const b = (t = (this.model.apis ?? []).find((k) => k.id === this._selectedId)) == null ? void 0 : t.id, E = this._newApiId || b || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id);
          if (!E) return;
          this.command({
            kind: "add-api-operation",
            apiId: E,
            id: `apiop-${E.replace(/^api-/, "")}-${H(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const b = (s = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : s.id, E = this._newModuleId || b || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!E) return;
          this.command({ kind: "add-domain-event", id: `ev-${H(e)}`, name: e, moduleId: E });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const b = (r = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : r.id, E = this._newModuleId || b || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!E) return;
          this.command({ kind: "add-application-event", id: `aev-${H(e)}`, name: e, moduleId: E });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const b = (d = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : d.id, E = this._newModuleId || b || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!E) return;
          this.command({ kind: "add-domain-service", id: `ds-${H(e)}`, name: e, moduleId: E });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const b = (h = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : h.id, E = this._newModuleId || b || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!E) return;
          this.command({ kind: "add-query-service", id: `qs-${H(e)}`, name: e, moduleId: E });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const b = (p = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : p.id, E = this._newModuleId || b || ((f = this.model.modules[0]) == null ? void 0 : f.id);
          if (!E) return;
          this.command({ kind: "add-use-case", id: `uc-${H(e)}`, name: e, moduleId: E });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const b = (I = this.model.modules.find((k) => k.id === this._selectedId)) == null ? void 0 : I.id, E = this._newModuleId || b || ((x = this.model.modules[0]) == null ? void 0 : x.id);
          if (!E) return;
          this.command({ kind: "add-use-case", id: `uc-${H(e)}`, name: e, moduleId: E, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const b = (A = this.model.externalSystems.find((k) => k.id === this._selectedId)) == null ? void 0 : A.id, E = this._newExternalId || b || ((y = this.model.externalSystems[0]) == null ? void 0 : y.id);
          if (!E) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${H(e)}`,
            name: e,
            moduleId: E
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const b = (T = this.model.externalSystems.find((k) => k.id === this._selectedId)) == null ? void 0 : T.id, E = this._newExternalId || b || ((U = this.model.externalSystems[0]) == null ? void 0 : U.id);
          if (!E) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${H(e)}`,
            name: e,
            moduleId: E
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "mcp-server") {
          const b = (v = this.model.externalSystems.find((k) => k.id === this._selectedId)) == null ? void 0 : v.id, E = this._newExternalId || b || ((_ = this.model.externalSystems[0]) == null ? void 0 : _.id);
          if (!E) return;
          this.command({
            kind: "add-mcp-server",
            id: `mcpsrv-${H(e)}`,
            name: e,
            moduleId: E
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const b = (S = (this.model.aggregates ?? []).find((k) => k.id === this._selectedId)) == null ? void 0 : S.id, E = this._newAggregateId || b || ((W = (C = this.model.aggregates) == null ? void 0 : C[0]) == null ? void 0 : W.id);
          if (!E) return;
          this.command({ kind: "add-read-model", id: `rm-${H(e)}`, name: e, aggregateId: E });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${H(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const b = this._newModuleId || ((O = this.model.modules[0]) == null ? void 0 : O.id);
        if (!b) return;
        this.command({ kind: "add-aggregate", id: `agg-${H(e)}`, name: e, moduleId: b });
      } else if (this._view === "flows") {
        const b = this._newTriggerAggId || ((J = (R = this.model.aggregates) == null ? void 0 : R[0]) == null ? void 0 : J.id), E = this._newTargetId || ((ie = this.model.modules[0]) == null ? void 0 : ie.id), k = this._newTriggerEvent.trim();
        if (!b || !E || !k) return;
        this.command({
          kind: "add-flow",
          id: `flow-${H(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: b,
          triggerEvent: k,
          targetId: E
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const b = this._newModuleId || ((ne = this.model.modules[0]) == null ? void 0 : ne.id);
        if (!b) return;
        this.command({
          kind: "add-process",
          id: `proc-${H(e)}`,
          name: e,
          moduleId: b,
          triggerAggregateId: this._newTriggerAggId || ((g = (l = this.model.aggregates) == null ? void 0 : l[0]) == null ? void 0 : g.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${H(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || (($ = (w = this.model.aggregates) == null ? void 0 : w[0]) == null ? void 0 : $.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? ss(i, t.nodes) : e === "flows" ? ps(i, t.nodes) : e === "processes" ? _i(i, t.nodes) : e === "workflows" ? bd(i, t.nodes) : e === "eventstorming" ? yd(i, t.nodes) : Qn(i, t.nodes, this._detail, t.sizes ?? {});
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
    const i = t.nodes.filter((c) => !c.parentId), n = new Set(i.map((c) => c.id)), s = {
      nodes: i,
      edges: t.edges.filter((c) => n.has(c.sourceId) && n.has(c.targetId))
    }, r = await Ed(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    return M`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <div class="tabs">
          ${Md.map(
      (t) => M`
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
      (t) => M`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? M`
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
      (t) => M`<option value="${t.name} (${t.id})">${t.kind}</option>`
    )}
              </datalist>
              <button class="tab" title="Añadir el elemento a la vista" @click=${this.addMemberFromToolbar}>
                ＋ Añadir
              </button>
            ` : ""}
        <div class="spacer"></div>
        ${this._multi.length ? M`
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
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._newContextMapKind === "external-ai-agent" ? "Nuevo agente IA externo…" : this._newContextMapKind === "mcp-gateway" ? "Nuevo gateway MCP…" : this._newContextMapKind === "rag" ? "Nuevo RAG…" : this._newContextMapKind === "api" ? "Nueva API…" : this._newContextMapKind === "proxy-api" ? "Nuevo proxy API…" : this._detail === "contexts" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : this._newContextMapKind === "policy" ? "Nueva policy…" : this._newContextMapKind === "use-case" ? "Nuevo caso de uso…" : this._newContextMapKind === "query-service" ? "Nuevo query service…" : this._newContextMapKind === "external-use-case" ? "Nuevo caso de uso externo…" : this._newContextMapKind === "external-table" ? "Nueva tabla externa…" : this._newContextMapKind === "mcp-server" ? "Nuevo servidor MCP…" : this._newContextMapKind === "api-operation" ? "Nueva operación de API…" : "Nuevo read model…",
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
        ${this._view === "context-map" ? M`<select
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
              <option
                value="external-ai-agent"
                ?selected=${this._newContextMapKind === "external-ai-agent"}
              >
                Agente IA externo
              </option>
              <option value="mcp-gateway" ?selected=${this._newContextMapKind === "mcp-gateway"}>
                Gateway MCP
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
              ${this._detail !== "contexts" ? M`
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
                      value="mcp-server"
                      ?selected=${this._newContextMapKind === "mcp-server"}
                    >
                      Servidor MCP (externo)
                    </option>
                    <option
                      value="api-operation"
                      ?selected=${this._newContextMapKind === "api-operation"}
                    >
                      Operación de API
                    </option>
                  ` : ""}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table" || this._newContextMapKind === "mcp-server") ? M`<select
              title="Sistema externo dueño del nuevo elemento"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "api-operation" ? M`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, n;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "read-model" ? M`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? M`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${Nd.map(
      (t) => M`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? M`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? M`
              ${this._view === "flows" ? M`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => M`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return M`<option
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
              ${this._view === "flows" ? M`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return M`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? M`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP"].map(
      (t) => M`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? M`
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
      (t) => M`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? M`<input
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
              ${this.owningProcessOf(this._selectedId) ? M`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? M`
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
      (t) => M`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? M`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => M`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        .edgePoints=${this.routedEdgePoints(e)}
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
        @delete-selection-requested=${this.onDeleteSelectionRequested}
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
        ${this._view === "context-map" ? M`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? M`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? M`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : M`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
      </div>
      ${this.renderRelationPicker()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
    `;
  }
  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  renderDeletePicker() {
    if (!this._deletePicker) return "";
    const t = (this.model.views ?? []).find((i) => i.id === this._activeViewId);
    return M`
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
  pickExtDepType(e) {
    const t = this._extDepPicker;
    if (this._extDepPicker = null, !t) return;
    const i = (this.model.externalSystemDependencies ?? []).find(
      (n) => n.sourceId === t.sourceId && n.targetId === t.targetId
    );
    i && (i.type ?? "DEPENDS") === e || this.command({
      kind: "add-external-dependency",
      sourceId: t.sourceId,
      targetId: t.targetId,
      type: e
    });
  }
  renderExtDepPicker() {
    var n;
    const e = this._extDepPicker;
    if (!e) return "";
    const t = (n = (this.model.externalSystemDependencies ?? []).find(
      (s) => s.sourceId === e.sourceId && s.targetId === e.targetId
    )) == null ? void 0 : n.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => M`
            <button
              class="picker-item ${s.type === (t ?? "") ? "current" : ""}"
              title=${s.name}
              @click=${() => this.pickExtDepType(s.type)}
            >
              <span class="abbr">${s.abbr}</span>
              <span class="name">${s.name}</span>
            </button>
          `
    )}
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
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Cd.map(
      (n) => M`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${ai[n].abbr}</span>
              <span class="name">${ai[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
z.styles = ui`
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
  we({ attribute: !1 })
], z.prototype, "model", 2);
q([
  we({ attribute: !1 })
], z.prototype, "layout", 2);
q([
  we({ attribute: !1 })
], z.prototype, "diff", 2);
q([
  N()
], z.prototype, "_view", 2);
q([
  N()
], z.prototype, "_detail", 2);
q([
  N()
], z.prototype, "_relationType", 2);
q([
  N()
], z.prototype, "_relationPicker", 2);
q([
  N()
], z.prototype, "_extDepPicker", 2);
q([
  N()
], z.prototype, "_selectedId", 2);
q([
  N()
], z.prototype, "_newName", 2);
q([
  N()
], z.prototype, "_newSubdomain", 2);
q([
  N()
], z.prototype, "_newModuleId", 2);
q([
  N()
], z.prototype, "_newContextMapKind", 2);
q([
  N()
], z.prototype, "_newAggregateId", 2);
q([
  N()
], z.prototype, "_newExternalId", 2);
q([
  N()
], z.prototype, "_newApiId", 2);
q([
  N()
], z.prototype, "_newArchetype", 2);
q([
  N()
], z.prototype, "_newTriggerAggId", 2);
q([
  N()
], z.prototype, "_newTriggerEvent", 2);
q([
  N()
], z.prototype, "_newTargetId", 2);
q([
  N()
], z.prototype, "_undoStack", 2);
q([
  N()
], z.prototype, "_redoStack", 2);
q([
  N()
], z.prototype, "_newStepName", 2);
q([
  N()
], z.prototype, "_newStepType", 2);
q([
  N()
], z.prototype, "_newStepRole", 2);
q([
  N()
], z.prototype, "_newStepDeadline", 2);
q([
  N()
], z.prototype, "_editStepRole", 2);
q([
  N()
], z.prototype, "_editStepDeadline", 2);
q([
  N()
], z.prototype, "_editStepComp", 2);
q([
  N()
], z.prototype, "_newStepUseCase", 2);
q([
  N()
], z.prototype, "_newStepEmits", 2);
q([
  N()
], z.prototype, "_editStepUseCase", 2);
q([
  N()
], z.prototype, "_editStepEmits", 2);
q([
  N()
], z.prototype, "_editStepAwaits", 2);
q([
  N()
], z.prototype, "_multi", 2);
q([
  N()
], z.prototype, "_newViewName", 2);
q([
  N()
], z.prototype, "_activeViewId", 2);
q([
  N()
], z.prototype, "_newRagSourceType", 2);
q([
  N()
], z.prototype, "_newRagSourceUri", 2);
q([
  N()
], z.prototype, "_addMemberKey", 2);
q([
  N()
], z.prototype, "_deletePicker", 2);
z = q([
  mi("modux-editor")
], z);
var Od = Object.defineProperty, Dd = Object.getOwnPropertyDescriptor, le = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Dd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Od(t, i, s), s;
};
let re = class extends Re {
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
    }, this._commandChain = Promise.resolve();
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
  onCommand(e) {
    const { command: t } = e.detail;
    this._commandChain = this._commandChain.then(() => this.postCommand(t));
  }
  async postCommand(e) {
    await this.trackWrite(async () => {
      try {
        const t = await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e)
        });
        if (!t.ok) {
          let n = `El servidor rechazó el comando (${t.status})`;
          try {
            const s = await t.json();
            s != null && s.message && (n = s.message);
          } catch {
          }
          this.showToast(n);
          return;
        }
        const i = await fetch(`${this.base}/model`);
        i.ok && (this._model = await i.json()), await this.refreshDiff();
      } catch (t) {
        this.showToast(String(t));
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
    return this._error ? M`<div class="status error">modux editor: ${this._error}</div>` : this._model ? M`
      ${this._workspace ? M`
            <div class="workspace">
              <label>Modelo:</label>
              <select @change=${this.onWorkspaceSelect} title="Sistema (as-is) o una solución (to-be)">
                <option value="main" ?selected=${this._workspace.system}>Sistema (as-is)</option>
                ${this._workspace.solutions.map(
      (t) => M`<option value=${t.branch} ?selected=${t.branch === this._workspace.current}>
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
      return M`<span
                      class="badge solution"
                      title=${i.length ? `Eliminados respecto al sistema: ${i.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${t("ADDED")} ～${t("MODIFIED")} －${t("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? M`
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
      return M`
                      ${t === "EXPLORING" ? M`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${t === "PROPOSED" ? M`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${t === "APPROVED" ? M`<button
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
      ${this._mergeFlow ? M`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (t) => M`
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
      ${this._toast ? M`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : M`<div class="status">Cargando el modelo…</div>`;
  }
};
re.styles = ui`
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
le([
  we()
], re.prototype, "base", 2);
le([
  N()
], re.prototype, "_model", 2);
le([
  N()
], re.prototype, "_layout", 2);
le([
  N()
], re.prototype, "_error", 2);
le([
  N()
], re.prototype, "_saving", 2);
le([
  N()
], re.prototype, "_toast", 2);
le([
  N()
], re.prototype, "_workspace", 2);
le([
  N()
], re.prototype, "_creatingSolution", 2);
le([
  N()
], re.prototype, "_newSolutionName", 2);
le([
  N()
], re.prototype, "_diff", 2);
le([
  N()
], re.prototype, "_mergeFlow", 2);
re = le([
  mi("modux-editor-connected")
], re);
export {
  Ud as CONTAINER_HEADER,
  Ld as CONTAINER_INSET,
  Z as ModuxCanvas,
  z as ModuxEditor,
  re as ModuxEditorConnected,
  ss as aggregatesScene,
  Yt as containerFit,
  qn as containerMinSize,
  Qn as contextMapScene,
  Bn as flowCoherence,
  ps as flowsScene,
  gt as normalizeViewLayout,
  _i as processesScene,
  Gn as relationEdgeId,
  di as resolveOverlaps
};
