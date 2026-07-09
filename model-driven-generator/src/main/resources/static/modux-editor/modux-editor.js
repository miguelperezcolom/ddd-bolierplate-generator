const il = 34, nl = 10;
function Ii(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let a = r + 1; a < e.length; a++) {
        const d = e[r], c = e[a], h = i.get(d.id), m = i.get(c.id), p = m.x - h.x, f = m.y - h.y, y = (d.w + c.w) / 2 + t - Math.abs(p), _ = (d.h + c.h) / 2 + t - Math.abs(f);
        if (!(y <= 0 || _ <= 0))
          if (o = !0, y < _) {
            const C = (p >= 0 ? 1 : -1) * y / 2;
            h.x -= C, m.x += C;
          } else {
            const C = (f >= 0 ? 1 : -1) * _ / 2;
            h.y -= C, m.y += C;
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
function os(e, t = { w: 160, h: 90 }) {
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
function oi(e, t, i) {
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
function Et(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const as = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ds = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, ls = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ge = 168, Be = 56;
function zt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function Pt(e, t) {
  return `apiop:${e}@${t}`;
}
function fn(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: zt(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const gn = 34, wn = 14, cs = 14, Ie = 108, xe = 32, yn = 12, In = 10, mt = 2, us = mt * Ie + (mt - 1) * yn + 2 * wn;
function hs(e, t) {
  return `rel:${e}->${t}`;
}
function ps(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function nt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const ms = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, xn = {
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
  "api-op-occurrence": { symbol: "usecase", fill: "#eef2ff", stroke: "#4f46e5" },
  api: { symbol: "interface", fill: "#eef2ff", stroke: "#4f46e5" },
  "api-impl": { symbol: "interface", fill: "#eef2ff", stroke: "#4f46e5" },
  "proxy-api": { symbol: "interface", fill: "#ecfeff", stroke: "#0e7490" }
}, ai = {
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
  "api-op-occurrence": "Operación de la API, en este sitio",
  api: "API publicada por este sistema",
  "api-impl": "La misma API, implementada también en este contexto",
  "proxy-api": "Proxy/cache de una API, alojado en este sistema"
};
function di(e) {
  const t = Math.max(1, Math.ceil(e / mt)), i = t * xe + (t - 1) * In;
  return { w: us, h: gn + i + cs };
}
function Tt(e, t) {
  const i = e % mt, n = Math.floor(e / mt);
  return {
    x: -t.w / 2 + wn + i * (Ie + yn) + Ie / 2,
    y: -t.h / 2 + gn + n * (xe + In) + xe / 2
  };
}
function fs(e, t, i, n, s, o, r = !1) {
  const a = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), d = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...fn(e, t.id),
    ...a.map((c) => ({ id: c.id, name: c.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (c) => ({ id: c.id, name: c.name, kind: "use-case", policy: c.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (c) => ({ id: c.id, name: c.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (c) => ({ id: c.id, name: c.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (c) => ({ id: c.id, name: c.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (c) => ({ id: c.id, name: c.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (c) => ({ id: c.id, name: c.name, kind: "query-service" })
    )
  ];
  if (!d.length)
    return [{ ...n, x: i.x, y: i.y, w: Ge, h: Be }];
  if (r) {
    const c = new Map((e.apis ?? []).map((m) => [m.id, m])), h = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && c.has(m.apiId)).map((m) => {
      const p = c.get(m.apiId);
      return {
        id: zt(m.apiId, m.moduleId),
        name: p.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${p.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (p.operations ?? []).map((f) => ({
          id: Pt(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (h.length > 0) {
      const m = d.filter((p) => p.kind !== "api-impl");
      return vn(i, n, h, m, s, o);
    }
  }
  return dt(i, n, d, s, o);
}
function vn(e, t, i, n, s, o) {
  const r = o[t.id] ?? di(i.length + n.length), a = i.map((p, f) => {
    const y = s[p.id] ?? Tt(f, r), _ = p.ops, C = o[p.id] ?? di(_.length), x = _.map((z, b) => s[z.id] ?? Tt(b, C)), U = oi(
      { x: y.x, y: y.y },
      C,
      x.map((z) => ({ dx: z.x, dy: z.y, w: Ie, h: xe }))
    );
    return { a: p, off: y, ops: _, opOffs: x, fit: U };
  }), d = n.map(
    (p, f) => s[p.id] ?? Tt(i.length + f, r)
  ), c = Ii(
    [
      ...a.map((p) => ({ id: p.a.id, x: p.fit.x, y: p.fit.y, w: p.fit.w, h: p.fit.h })),
      ...n.map((p, f) => ({
        id: p.id,
        x: d[f].x,
        y: d[f].y,
        w: Ie,
        h: xe
      }))
    ],
    24
  );
  for (const p of a) {
    const f = c.get(p.a.id);
    f && (p.off = { x: p.off.x + (f.x - p.fit.x), y: p.off.y + (f.y - p.fit.y) }, p.fit = { ...p.fit, x: f.x, y: f.y });
  }
  n.forEach((p, f) => {
    const y = c.get(p.id);
    y && (d[f] = { x: y.x, y: y.y });
  });
  const h = oi(e, r, [
    ...a.map((p) => ({ dx: p.fit.x, dy: p.fit.y, w: p.fit.w, h: p.fit.h })),
    ...d.map((p) => ({ dx: p.x, dy: p.y, w: Ie, h: xe }))
  ]), m = [
    { ...t, x: h.x, y: h.y, w: h.w, h: h.h, container: !0 }
  ];
  for (const p of a)
    m.push({
      id: p.a.id,
      label: p.a.name,
      kind: p.a.kind,
      symbol: "interface",
      fill: p.a.fill,
      stroke: p.a.stroke,
      badge: p.a.badge,
      container: !0,
      parentId: t.id,
      x: e.x + p.fit.x,
      y: e.y + p.fit.y,
      w: p.fit.w,
      h: p.fit.h,
      tooltip: p.a.tooltip
    }), p.ops.forEach((f, y) => {
      m.push({
        id: f.id,
        label: f.name,
        kind: p.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: p.a.id,
        x: e.x + p.off.x + p.opOffs[y].x,
        y: e.y + p.off.y + p.opOffs[y].y,
        w: Ie,
        h: xe,
        tooltip: `${ai[p.a.opKind]}: ${f.name}`
      });
    });
  return n.forEach((p, f) => {
    const y = xn[p.kind];
    m.push({
      id: p.id,
      label: p.name,
      kind: p.kind,
      x: e.x + d[f].x,
      y: e.y + d[f].y,
      w: Ie,
      h: xe,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${ai[p.kind]} ${p.name}`
    });
  }), m;
}
function dt(e, t, i, n, s) {
  const o = s[t.id] ?? di(i.length), r = i.map((m, p) => n[m.id] ?? Tt(p, o)), a = Ii(
    i.map((m, p) => ({ id: m.id, x: r[p].x, y: r[p].y, w: Ie, h: xe })),
    10
  );
  i.forEach((m, p) => {
    const f = a.get(m.id);
    f && (r[p] = { x: f.x, y: f.y });
  });
  const d = oi(
    e,
    o,
    r.map((m) => ({ dx: m.x, dy: m.y, w: Ie, h: xe }))
  ), c = {
    ...t,
    x: d.x,
    y: d.y,
    w: d.w,
    h: d.h,
    container: !0
  }, h = i.map((m, p) => {
    const f = r[p], y = m.policy ? ms : xn[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: Ie,
      h: xe,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : ai[m.kind]} ${m.name}`
    };
  });
  return [c, ...h];
}
function gs(e, t, i = "contexts", n = {}) {
  const s = i !== "contexts", o = i === "operations", r = new Set(e.externalSystems.map((l) => l.id)), a = (e.apis ?? []).filter(
    (l) => l.publishedByExternalSystemId && r.has(l.publishedByExternalSystemId)
  ), d = new Set(a.map((l) => l.id)), c = (e.proxyApis ?? []).filter(
    (l) => l.publishedByExternalSystemId && r.has(l.publishedByExternalSystemId)
  ), h = new Set(c.map((l) => l.id)), m = [
    ...e.modules.map((l) => ({ ref: l, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((l) => ({ ref: l, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((l) => !d.has(l.id)).map((l) => ({ ref: l, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((l) => !h.has(l.id)).map((l) => ({ ref: l, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((l) => ({
      ref: l,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], p = m.flatMap((l, N) => {
    const q = t[l.ref.id] ?? nt(N, m.length);
    if ("workflow" in l && l.workflow) {
      const B = l.ref;
      return [{
        id: B.id,
        label: B.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${B.name} — workflow${B.triggerEvent ? ` · arranca con ${B.triggerEvent}` : ""}`,
        x: q.x,
        y: q.y,
        w: Ge,
        h: Be
      }];
    }
    if (l.proxy) {
      const B = l.ref, me = {
        id: B.id,
        label: B.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${B.name} — proxy/cache de una API, consumible como ella`
      };
      if (o && B.targetApiId) {
        const ue = (e.apis ?? []).find(($e) => $e.id === B.targetApiId), Pe = (ue == null ? void 0 : ue.operations) ?? [];
        if (Pe.length > 0)
          return dt(
            q,
            me,
            Pe.map(($e) => ({
              id: Pt($e.id, B.id),
              name: $e.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...me, x: q.x, y: q.y, w: Ge, h: Be }];
    }
    if (l.api) {
      const B = l.ref, me = {
        id: B.id,
        label: B.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${B.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return s && B.operations.length > 0 ? dt(
        q,
        me,
        B.operations.map(
          (ue) => ({ id: ue.id, name: ue.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{ ...me, x: q.x, y: q.y, w: Ge, h: Be }];
    }
    if (l.external) {
      const B = l.ref, me = {
        id: B.id,
        label: B.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${B.name} (sistema externo)`
      }, ue = a.filter((Q) => Q.publishedByExternalSystemId === B.id), Pe = c.filter((Q) => Q.publishedByExternalSystemId === B.id), $e = [
        ...Pe.map((Q) => ({ id: Q.id, name: Q.name, kind: "proxy-api" })),
        ...s ? [
          ...(B.useCases ?? []).map(
            (Q) => ({ id: Q.id, name: Q.name, kind: "external-use-case" })
          ),
          ...(B.tables ?? []).map(
            (Q) => ({ id: Q.id, name: Q.name, kind: "external-table" })
          ),
          ...(B.mcpServers ?? []).map(
            (Q) => ({ id: Q.id, name: Q.name, kind: "mcp-server" })
          )
        ] : []
      ], se = o ? Pe.filter((Q) => {
        const tt = Q.targetApiId ? (e.apis ?? []).find((oe) => oe.id === Q.targetApiId) : void 0;
        return ((tt == null ? void 0 : tt.operations) ?? []).length > 0;
      }) : [];
      if (o && (ue.length > 0 || se.length > 0)) {
        const Q = [
          ...ue.map((oe) => ({
            id: oe.id,
            name: oe.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${oe.name} — API publicada por ${B.name}`,
            opKind: "api-operation",
            ops: (oe.operations ?? []).map((it) => ({ id: it.id, name: it.name }))
          })),
          ...se.map((oe) => {
            const it = (e.apis ?? []).find((bt) => bt.id === oe.targetApiId);
            return {
              id: oe.id,
              name: oe.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${oe.name} — proxy/cache de ${it.name}`,
              opKind: "api-op-occurrence",
              ops: (it.operations ?? []).map((bt) => ({
                id: Pt(bt.id, oe.id),
                name: bt.name
              }))
            };
          })
        ], tt = new Set(se.map((oe) => oe.id));
        return vn(
          q,
          me,
          Q,
          $e.filter((oe) => !tt.has(oe.id)),
          t,
          n
        );
      }
      const Ti = [
        ...ue.map((Q) => ({ id: Q.id, name: Q.name, kind: "api" })),
        ...$e
      ];
      return Ti.length > 0 ? dt(q, me, Ti, t, n) : [{ ...me, x: q.x, y: q.y, w: Ge, h: Be }];
    }
    const Y = l.ref, te = Y.subdomainType ?? "GENERIC", ye = {
      id: Y.id,
      label: Y.name,
      kind: "module",
      symbol: "component",
      fill: as[te],
      stroke: "#94a3b8",
      badge: te,
      tooltip: `${Y.name} — subdominio ${te}`
    };
    if (s) return fs(e, Y, q, ye, t, n, o);
    const Ne = fn(e, Y.id);
    return Ne.length > 0 ? dt(q, ye, Ne, t, n) : [{ ...ye, x: q.x, y: q.y, w: Ge, h: Be }];
  }), f = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((l, N) => {
    const q = t[l.id] ?? nt(m.length + N, f);
    p.push({
      id: l.id,
      label: l.name,
      x: q.x,
      y: q.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${l.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((l, N) => {
    const q = t[l.id] ?? nt(m.length + (e.actors ?? []).length + N, f);
    p.push({
      id: l.id,
      label: l.name,
      x: q.x,
      y: q.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: l.external ? "#ffffff" : "#faf5ff",
      stroke: "#9333ea",
      dashed: !!l.external,
      badge: l.external ? "AGENTE IA EXT." : "AGENTE IA",
      tooltip: l.external ? `${l.name} (agente de IA externo — entra por un gateway MCP)` : `${l.name} (agente de IA — consume por MCP)`
    });
  }), (e.mcpGateways ?? []).forEach((l, N) => {
    const q = t[l.id] ?? nt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + N,
      f
    );
    p.push({
      id: l.id,
      label: l.name,
      x: q.x,
      y: q.y,
      w: 148,
      h: 48,
      kind: "mcp-gateway",
      symbol: "plug",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: "GATEWAY MCP",
      tooltip: `${l.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`
    });
  });
  const y = [];
  (e.rags ?? []).forEach((l, N) => {
    const q = t[l.id] ?? nt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + N,
      f
    );
    p.push({
      id: l.id,
      label: l.name,
      x: q.x,
      y: q.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${l.name} (base de conocimiento — retrieval para agentes)`
    }), (l.contentSources ?? []).forEach((Y, te) => {
      const ye = `ragcs:${l.id}:${Y.uri}`, Ne = t[ye] ?? { x: q.x + 170, y: q.y - 30 + te * 44 };
      p.push({
        id: ye,
        label: Y.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: Ne.x,
        y: Ne.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: Y.type,
        tooltip: `${Y.type}: ${Y.uri}`
      }), y.push({
        id: `ragcse:${l.id}:${Y.uri}`,
        sourceId: ye,
        targetId: l.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), p.sort((l, N) => (l.parentId ? 1 : 0) - (N.parentId ? 1 : 0));
  const _ = e.relations.map((l) => ({
    id: hs(l.sourceId, l.targetId),
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "relation",
    label: l.type ? ds[l.type] : "?",
    color: l.declared ? "#475569" : "#94a3b8",
    dashed: !l.declared,
    arrow: !0,
    tooltip: l.type ? `${l.type} (${l.sourceId} upstream → ${l.targetId} downstream)${l.reasons ? ` — ${l.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${l.reasons ? ` — ${l.reasons}` : ""}`
  })), C = e.flows.map((l) => {
    var Ne, B, me, ue, Pe, $e;
    const N = ps(e, l), q = s ? e.modules.find((se) => se.id === l.sourceId) : void 0, Y = ((Ne = q == null ? void 0 : q.domainEvents) == null ? void 0 : Ne.find((se) => se.name === l.triggerEvent)) ?? ((B = q == null ? void 0 : q.applicationEvents) == null ? void 0 : B.find((se) => se.name === l.triggerEvent)), te = s && l.readModelName ? (ue = (me = e.modules.find((se) => se.id === l.targetId)) == null ? void 0 : me.readModels) == null ? void 0 : ue.find((se) => se.name === l.readModelName) : void 0, ye = s && l.targetUseCaseId ? ($e = (Pe = e.modules.find((se) => se.id === l.targetId)) == null ? void 0 : Pe.useCases) == null ? void 0 : $e.find((se) => se.id === l.targetUseCaseId) : void 0;
    return {
      id: `flow:${l.id}`,
      sourceId: (Y == null ? void 0 : Y.id) ?? l.sourceId,
      targetId: (ye == null ? void 0 : ye.id) ?? (te == null ? void 0 : te.id) ?? l.targetId,
      kind: "flow",
      label: l.name,
      color: ls[N],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${l.name} [${l.archetype}] — ${N}`
    };
  }), x = new Map((e.apis ?? []).map((l) => [l.id, l])), U = new Set(e.modules.map((l) => l.id)), z = (e.apiImplementations ?? []).filter(
    (l) => x.has(l.apiId) && U.has(l.moduleId)
  ), b = new Set(p.map((l) => l.id)), I = s ? (e.emissions ?? []).filter((l) => b.has(l.sourceId) && b.has(l.domainEventId)).map((l) => ({
    id: `emit:${l.sourceId}->${l.domainEventId}`,
    sourceId: l.sourceId,
    targetId: l.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], v = s ? (e.projections ?? []).map((l) => ({
    p: l,
    source: l.sourceAggregateId ?? l.sourceExternalUseCaseId ?? l.sourceExternalTableId
  })).filter(({ p: l, source: N }) => N && l.readModelId).filter(({ p: l, source: N }) => b.has(N) && b.has(l.readModelId)).map(({ p: l, source: N }) => ({
    id: `proj:${l.id}`,
    sourceId: N,
    targetId: l.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: l.sourceAggregateId ? `Proyección ${l.name}: el estado del agregado se materializa en ${l.readModelName ?? l.readModelId}` : `Proyección ${l.name}: polling hacia ${l.readModelName ?? l.readModelId}`
  })) : [], k = (e.apis ?? []).flatMap(
    (l) => l.operations.flatMap((N) => {
      const q = s && b.has(N.id) ? N.id : l.id;
      if (!b.has(q)) return [];
      const Y = s && N.targetUseCaseId && b.has(N.targetUseCaseId) ? N.targetUseCaseId : N.targetModuleId && b.has(N.targetModuleId) ? N.targetModuleId : (N.targetUseCaseId && !s, null);
      return Y ? [
        {
          id: `apiwire:${N.id}`,
          sourceId: q,
          targetId: Y,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${N.name} la implementa ${Y}`
        }
      ] : [];
    })
  ), M = s ? (e.useCaseCalls ?? []).filter((l) => b.has(l.sourceId) && b.has(l.targetId)).map((l) => ({
    id: `uccall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], W = s ? (e.queryCalls ?? []).filter((l) => b.has(l.sourceId) && b.has(l.targetId)).map((l) => ({
    id: `qscall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], R = s ? (e.actorUses ?? []).filter((l) => b.has(l.actorId) && b.has(l.targetId)).map((l) => ({
    id: `use:${l.actorId}->${l.targetId}`,
    sourceId: l.actorId,
    targetId: l.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], D = (e.actorExternalDependencies ?? []).filter((l) => b.has(l.actorId) && b.has(l.externalSystemId)).map((l) => ({
    id: `extdep:${l.actorId}->${l.externalSystemId}`,
    sourceId: l.actorId,
    targetId: l.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), ee = new Map([
    ...(e.apis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId])
  ]), ne = (l) => b.has(l) ? l : ee.get(l) ?? l, u = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((l) => ({
        sourceId: l.sourceId,
        targetId: ne(l.targetId),
        cqrs: l.type === "CQRS"
      })).filter(
        (l) => b.has(l.sourceId) && b.has(l.targetId) && l.sourceId !== l.targetId
      ).map((l) => [
        `xdep:${l.sourceId}->${l.targetId}`,
        {
          id: `xdep:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "ext-dep",
          color: l.cqrs ? "#7c3aed" : "#64748b",
          label: l.cqrs ? "CQRS" : "dep",
          dashed: !0,
          arrow: !0,
          tooltip: l.cqrs ? "CQRS — consulta sobre sus datos" : "depende de"
        }
      ])
    ).values()
  ], w = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const N of l.useCases ?? []) w.set(N.id, l.id);
    for (const N of l.domainEvents ?? []) w.set(N.id, l.id);
    for (const N of l.applicationEvents ?? []) w.set(N.id, l.id);
  }
  const g = (l) => b.has(l) ? l : w.get(l) ?? l, $ = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const N of l.domainEvents ?? []) $.set(N.name, N.id);
    for (const N of l.applicationEvents ?? []) $.set(N.name, N.id);
  }
  const S = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (l) => (l.steps ?? []).filter((N) => N.targetUseCaseId).map((N) => ({ sourceId: l.id, targetId: g(N.targetUseCaseId) }))
      ).filter((l) => b.has(l.sourceId) && b.has(l.targetId)).map((l) => [
        `wfcall:${l.sourceId}->${l.targetId}`,
        {
          id: `wfcall:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "wf-call",
          color: "#7c3aed",
          dashed: !0,
          arrow: !0,
          tooltip: "orquesta"
        }
      ])
    ).values()
  ], A = [
    ...new Map(
      (e.workflows ?? []).filter((l) => l.triggerEvent && $.has(l.triggerEvent)).map((l) => ({
        sourceId: g($.get(l.triggerEvent)),
        targetId: l.id,
        label: l.triggerEvent
      })).filter((l) => b.has(l.sourceId) && b.has(l.targetId)).map((l) => [
        `wftrig:${l.sourceId}->${l.targetId}`,
        {
          id: `wftrig:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "wf-trigger",
          color: "#f59e0b",
          label: l.label,
          dashed: !0,
          arrow: !0,
          tooltip: "dispara el workflow"
        }
      ])
    ).values()
  ], E = [
    ...new Map(
      (e.proxyApis ?? []).filter((l) => l.targetApiId).map((l) => ({ sourceId: ne(l.id), targetId: ne(l.targetApiId) })).filter(
        (l) => b.has(l.sourceId) && b.has(l.targetId) && l.sourceId !== l.targetId
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
  ], O = z.flatMap((l) => {
    const N = zt(l.apiId, l.moduleId);
    if (!b.has(N)) return [];
    const q = [];
    for (const Y of (e.proxyApis ?? []).filter((te) => te.targetApiId === l.apiId)) {
      const te = ne(Y.id);
      b.has(te) && te !== N && q.push({
        id: `pxr:${te}->${N}`,
        sourceId: te,
        targetId: N,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return q;
  }), G = (e.proxyOperationRoutes ?? []).flatMap((l) => {
    const N = (e.proxyApis ?? []).find((te) => te.id === l.proxyId);
    if (!(N != null && N.targetApiId)) return [];
    const q = Pt(l.operationId, l.proxyId), Y = l.targetSiteId === N.targetApiId ? N.targetApiId : zt(N.targetApiId, l.targetSiteId);
    return !b.has(q) || !b.has(Y) ? [] : [{
      id: `oproute:${q}->${Y}`,
      sourceId: q,
      targetId: Y,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), j = s ? (e.agentUses ?? []).filter((l) => b.has(l.agentId) && b.has(l.useCaseId)).map((l) => ({
    id: `mcp:${l.agentId}->${l.useCaseId}`,
    sourceId: l.agentId,
    targetId: l.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], X = (e.agentRags ?? []).filter((l) => b.has(l.agentId) && b.has(l.ragId)).map((l) => ({
    id: `agrag:${l.agentId}->${l.ragId}`,
    sourceId: l.agentId,
    targetId: l.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), le = s ? (e.rags ?? []).filter((l) => b.has(l.id)).flatMap(
    (l) => (l.sourceReadModelIds ?? []).filter((N) => b.has(N)).map((N) => ({
      id: `ragsrc:${l.id}->${N}`,
      sourceId: l.id,
      targetId: N,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name} indexa este read model`
    }))
  ) : [], ge = s ? (e.agentExternalUses ?? []).filter((l) => b.has(l.agentId) && b.has(l.externalUseCaseId)).map((l) => ({
    id: `mcpx:${l.agentId}->${l.externalUseCaseId}`,
    sourceId: l.agentId,
    targetId: l.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], ce = s ? (e.agentMcpUses ?? []).filter((l) => b.has(l.agentId) && b.has(l.mcpServerId)).map((l) => ({
    id: `mcpsv:${l.agentId}->${l.mcpServerId}`,
    sourceId: l.agentId,
    targetId: l.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], we = (e.mcpGateways ?? []).flatMap(
    (l) => [
      ...l.mcpServerIds ?? [],
      ...l.apiIds ?? [],
      ...l.apiOperationIds ?? [],
      ...l.useCaseIds ?? [],
      ...l.ragIds ?? []
    ].filter((N) => b.has(l.id) && b.has(N)).map((N) => ({
      id: `gwx:${l.id}->${N}`,
      sourceId: l.id,
      targetId: N,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), et = (e.agentGatewayUses ?? []).filter((l) => b.has(l.agentId) && b.has(l.gatewayId)).map((l) => ({
    id: `aggw:${l.agentId}->${l.gatewayId}`,
    sourceId: l.agentId,
    targetId: l.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Jn = s ? (e.agentApiOpUses ?? []).filter((l) => b.has(l.agentId) && b.has(l.apiOperationId)).map((l) => ({
    id: `agapi:${l.agentId}->${l.apiOperationId}`,
    sourceId: l.agentId,
    targetId: l.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], es = s ? (e.agentQueryUses ?? []).filter((l) => b.has(l.agentId) && b.has(l.queryServiceId)).map((l) => ({
    id: `agqs:${l.agentId}->${l.queryServiceId}`,
    sourceId: l.agentId,
    targetId: l.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], ts = (e.agentDelegations ?? []).filter((l) => b.has(l.agentId) && b.has(l.delegateAgentId)).map((l) => ({
    id: `agag:${l.agentId}->${l.delegateAgentId}`,
    sourceId: l.agentId,
    targetId: l.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), is = (e.actorAgentUses ?? []).filter((l) => b.has(l.actorId) && b.has(l.agentId)).map((l) => ({
    id: `useag:${l.actorId}->${l.agentId}`,
    sourceId: l.actorId,
    targetId: l.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), ns = s ? (e.agentTriggers ?? []).filter((l) => b.has(l.eventId) && b.has(l.agentId)).map((l) => ({
    id: `evag:${l.eventId}->${l.agentId}`,
    sourceId: l.eventId,
    targetId: l.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], ss = s ? (e.externalCalls ?? []).filter((l) => b.has(l.externalSystemId) && b.has(l.useCaseId)).map((l) => ({
    id: `extcall:${l.externalSystemId}->${l.useCaseId}`,
    sourceId: l.externalSystemId,
    targetId: l.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], rs = s ? (e.externalUseCaseCalls ?? []).filter((l) => b.has(l.sourceId) && b.has(l.targetId)).map((l) => ({
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
    nodes: p,
    edges: [
      ..._,
      ...C,
      ...I,
      ...v,
      ...k,
      ...M,
      ...W,
      ...R,
      ...D,
      ...u,
      ...E,
      ...O,
      ...G,
      ...S,
      ...A,
      ...j,
      ...ge,
      ...ce,
      ...we,
      ...et,
      ...Jn,
      ...es,
      ...ts,
      ...is,
      ...ns,
      ...X,
      ...le,
      ...y,
      ...ss,
      ...rs
    ]
  };
}
const ws = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ys = 176, Is = 60, xs = 140, vs = 40;
function _s(e) {
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
function $s(e, t) {
  const i = _s(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const h = s.get(c.moduleId), m = (h == null ? void 0 : h.subdomainType) ?? "GENERIC", p = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: ys,
      h: Is,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ws[m],
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
      w: xs,
      h: vs,
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
const ks = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, bs = 150, Es = 44, Ss = 190, As = 56, Cs = 160, Ms = 48;
function Ns(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function Ps(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, c;
    return ((c = (d = e.aggregates) == null ? void 0 : d.find((h) => h.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, d) => {
    const c = 120 + d * 130, h = ks[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const C = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : m,
        x: C.x,
        y: C.y,
        w: bs,
        h: Es,
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
      w: Ss,
      h: As,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const y = Ns(e, a), _ = `tgt:${y.id}`;
    if (!o.has(_)) {
      o.add(_);
      const C = t[_] ?? { x: 790, y: c };
      n.push({
        id: _,
        label: y.label,
        x: C.x,
        y: C.y,
        w: Cs,
        h: Ms,
        kind: y.external ? "external-system" : "module",
        symbol: "component",
        fill: y.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: y.external,
        badge: y.external ? "EXTERNAL" : "MODULE"
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
      targetId: _,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const Ts = 190, Rs = 56, Zt = 170, Os = 52;
function Ri(e, t) {
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
      w: Ts,
      h: Rs,
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
        w: Zt,
        h: Os,
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
        const y = `comp:${h.id}`, _ = t[y] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: y,
          label: h.compensationUseCaseId,
          x: _.x,
          y: _.y,
          w: Zt,
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
          targetId: y,
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
        w: Zt,
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
const Rt = globalThis, xi = Rt.ShadowRoot && (Rt.ShadyCSS === void 0 || Rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vi = Symbol(), Oi = /* @__PURE__ */ new WeakMap();
let _n = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== vi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (xi && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Oi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Oi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Us = (e) => new _n(typeof e == "string" ? e : e + "", void 0, vi), _i = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new _n(i, e, vi);
}, Ds = (e, t) => {
  if (xi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = Rt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, Ui = xi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Us(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ls, defineProperty: zs, getOwnPropertyDescriptor: qs, getOwnPropertyNames: Vs, getOwnPropertySymbols: Ks, getPrototypeOf: Hs } = Object, Oe = globalThis, Di = Oe.trustedTypes, Fs = Di ? Di.emptyScript : "", Jt = Oe.reactiveElementPolyfillSupport, ut = (e, t) => e, qt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Fs : null;
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
} }, $i = (e, t) => !Ls(e, t), Li = { attribute: !0, type: String, converter: qt, reflect: !1, useDefault: !1, hasChanged: $i };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Oe.litPropertyMetadata ?? (Oe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ye = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Li) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && zs(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = qs(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Li;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties"))) return;
    const t = Hs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const i = this.properties, n = [...Vs(i), ...Ks(i)];
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
      for (const s of n) i.unshift(Ui(s));
    } else t !== void 0 && i.push(Ui(t));
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
    return Ds(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : qt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : qt;
      this._$Em = s;
      const c = d.fromAttribute(i, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? $i)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
Ye.elementStyles = [], Ye.shadowRootOptions = { mode: "open" }, Ye[ut("elementProperties")] = /* @__PURE__ */ new Map(), Ye[ut("finalized")] = /* @__PURE__ */ new Map(), Jt == null || Jt({ ReactiveElement: Ye }), (Oe.reactiveElementVersions ?? (Oe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis, zi = (e) => e, Vt = ht.trustedTypes, qi = Vt ? Vt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $n = "$lit$", Re = `lit$${Math.random().toFixed(9).slice(2)}$`, kn = "?" + Re, Ws = `<${kn}>`, He = document, ft = () => He.createComment(""), gt = (e) => e === null || typeof e != "object" && typeof e != "function", ki = Array.isArray, Gs = (e) => ki(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ei = `[ 	
\f\r]`, st = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vi = /-->/g, Ki = />/g, Ue = RegExp(`>|${ei}(?:([^\\s"'>=/]+)(${ei}*=${ei}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Hi = /'/g, Fi = /"/g, bn = /^(?:script|style|textarea|title)$/i, En = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), P = En(1), F = En(2), Xe = Symbol.for("lit-noChange"), ie = Symbol.for("lit-nothing"), Wi = /* @__PURE__ */ new WeakMap(), Le = He.createTreeWalker(He, 129);
function Sn(e, t) {
  if (!ki(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qi !== void 0 ? qi.createHTML(t) : t;
}
const Bs = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = st;
  for (let a = 0; a < i; a++) {
    const d = e[a];
    let c, h, m = -1, p = 0;
    for (; p < d.length && (r.lastIndex = p, h = r.exec(d), h !== null); ) p = r.lastIndex, r === st ? h[1] === "!--" ? r = Vi : h[1] !== void 0 ? r = Ki : h[2] !== void 0 ? (bn.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = Ue) : h[3] !== void 0 && (r = Ue) : r === Ue ? h[0] === ">" ? (r = s ?? st, m = -1) : h[1] === void 0 ? m = -2 : (m = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? Ue : h[3] === '"' ? Fi : Hi) : r === Fi || r === Hi ? r = Ue : r === Vi || r === Ki ? r = st : (r = Ue, s = void 0);
    const f = r === Ue && e[a + 1].startsWith("/>") ? " " : "";
    o += r === st ? d + Ws : m >= 0 ? (n.push(c), d.slice(0, m) + $n + d.slice(m) + Re + f) : d + Re + (m === -2 ? a : f);
  }
  return [Sn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class wt {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [c, h] = Bs(t, i);
    if (this.el = wt.createElement(c, n), Le.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = Le.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith($n)) {
          const p = h[r++], f = s.getAttribute(m).split(Re), y = /([.?@])?(.*)/.exec(p);
          d.push({ type: 1, index: o, name: y[2], strings: f, ctor: y[1] === "." ? js : y[1] === "?" ? Xs : y[1] === "@" ? Qs : Yt }), s.removeAttribute(m);
        } else m.startsWith(Re) && (d.push({ type: 6, index: o }), s.removeAttribute(m));
        if (bn.test(s.tagName)) {
          const m = s.textContent.split(Re), p = m.length - 1;
          if (p > 0) {
            s.textContent = Vt ? Vt.emptyScript : "";
            for (let f = 0; f < p; f++) s.append(m[f], ft()), Le.nextNode(), d.push({ type: 2, index: ++o });
            s.append(m[p], ft());
          }
        }
      } else if (s.nodeType === 8) if (s.data === kn) d.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(Re, m + 1)) !== -1; ) d.push({ type: 7, index: o }), m += Re.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = He.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Qe(e, t, i = e, n) {
  var r, a;
  if (t === Xe) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = gt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Qe(e, s._$AS(e, t.values), s, n)), t;
}
class Ys {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? He).importNode(i, !0);
    Le.currentNode = s;
    let o = Le.nextNode(), r = 0, a = 0, d = n[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let c;
        d.type === 2 ? c = new _t(o, o.nextSibling, this, t) : d.type === 1 ? c = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (c = new Zs(o, this, t)), this._$AV.push(c), d = n[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = Le.nextNode(), r++);
    }
    return Le.currentNode = He, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class _t {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = ie, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Qe(this, t, i), gt(t) ? t === ie || t == null || t === "" ? (this._$AH !== ie && this._$AR(), this._$AH = ie) : t !== this._$AH && t !== Xe && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ie && gt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(He.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = wt.createElement(Sn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new Ys(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = Wi.get(t.strings);
    return i === void 0 && Wi.set(t.strings, i = new wt(t)), i;
  }
  k(t) {
    ki(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new _t(this.O(ft()), this.O(ft()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = zi(t).nextSibling;
      zi(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Yt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = ie, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ie;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Qe(this, t, i, 0), r = !gt(t) || t !== this._$AH && t !== Xe, r && (this._$AH = t);
    else {
      const a = t;
      let d, c;
      for (t = o[0], d = 0; d < o.length - 1; d++) c = Qe(this, a[n + d], i, d), c === Xe && (c = this._$AH[d]), r || (r = !gt(c) || c !== this._$AH[d]), c === ie ? t = ie : t !== ie && (t += (c ?? "") + o[d + 1]), this._$AH[d] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === ie ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class js extends Yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ie ? void 0 : t;
  }
}
class Xs extends Yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ie);
  }
}
class Qs extends Yt {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Qe(this, t, i, 0) ?? ie) === Xe) return;
    const n = this._$AH, s = t === ie && n !== ie || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== ie && (n === ie || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zs {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Qe(this, t);
  }
}
const ti = ht.litHtmlPolyfillSupport;
ti == null || ti(wt, _t), (ht.litHtmlVersions ?? (ht.litHtmlVersions = [])).push("3.3.3");
const Js = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new _t(t.insertBefore(ft(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis;
class Ve extends Ye {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Js(i, this.renderRoot, this.renderOptions);
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
    return Xe;
  }
}
var mn;
Ve._$litElement$ = !0, Ve.finalized = !0, (mn = qe.litElementHydrateSupport) == null || mn.call(qe, { LitElement: Ve });
const ii = qe.litElementPolyfillSupport;
ii == null || ii({ LitElement: Ve });
(qe.litElementVersions ?? (qe.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bi = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const er = { attribute: !0, type: String, converter: qt, reflect: !1, hasChanged: $i }, tr = (e = er, t, i) => {
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
function Ee(e) {
  return (t, i) => typeof i == "object" ? tr(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function T(e) {
  return Ee({ ...e, state: !0, attribute: !1 });
}
var li = "http://www.w3.org/1999/xhtml";
const Gi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: li,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function jt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Gi.hasOwnProperty(t) ? { space: Gi[t], local: e } : e;
}
function ir(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === li && t.documentElement.namespaceURI === li ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function nr(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function An(e) {
  var t = jt(e);
  return (t.local ? nr : ir)(t);
}
function sr() {
}
function Ei(e) {
  return e == null ? sr : function() {
    return this.querySelector(e);
  };
}
function rr(e) {
  typeof e != "function" && (e = Ei(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), d, c, h = 0; h < r; ++h)
      (d = o[h]) && (c = e.call(d, d.__data__, h, o)) && ("__data__" in d && (c.__data__ = d.__data__), a[h] = c);
  return new pe(n, this._parents);
}
function or(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ar() {
  return [];
}
function Cn(e) {
  return e == null ? ar : function() {
    return this.querySelectorAll(e);
  };
}
function dr(e) {
  return function() {
    return or(e.apply(this, arguments));
  };
}
function lr(e) {
  typeof e == "function" ? e = dr(e) : e = Cn(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && (n.push(e.call(d, d.__data__, c, r)), s.push(d));
  return new pe(n, s);
}
function Mn(e) {
  return function() {
    return this.matches(e);
  };
}
function Nn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var cr = Array.prototype.find;
function ur(e) {
  return function() {
    return cr.call(this.children, e);
  };
}
function hr() {
  return this.firstElementChild;
}
function pr(e) {
  return this.select(e == null ? hr : ur(typeof e == "function" ? e : Nn(e)));
}
var mr = Array.prototype.filter;
function fr() {
  return Array.from(this.children);
}
function gr(e) {
  return function() {
    return mr.call(this.children, e);
  };
}
function wr(e) {
  return this.selectAll(e == null ? fr : gr(typeof e == "function" ? e : Nn(e)));
}
function yr(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && e.call(d, d.__data__, c, o) && a.push(d);
  return new pe(n, this._parents);
}
function Pn(e) {
  return new Array(e.length);
}
function Ir() {
  return new pe(this._enter || this._groups.map(Pn), this._parents);
}
function Kt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Kt.prototype = {
  constructor: Kt,
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
function xr(e) {
  return function() {
    return e;
  };
}
function vr(e, t, i, n, s, o) {
  for (var r = 0, a, d = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new Kt(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function _r(e, t, i, n, s, o, r) {
  var a, d, c = /* @__PURE__ */ new Map(), h = t.length, m = o.length, p = new Array(h), f;
  for (a = 0; a < h; ++a)
    (d = t[a]) && (p[a] = f = r.call(d, d.__data__, a, t) + "", c.has(f) ? s[a] = d : c.set(f, d));
  for (a = 0; a < m; ++a)
    f = r.call(e, o[a], a, o) + "", (d = c.get(f)) ? (n[a] = d, d.__data__ = o[a], c.delete(f)) : i[a] = new Kt(e, o[a]);
  for (a = 0; a < h; ++a)
    (d = t[a]) && c.get(p[a]) === d && (s[a] = d);
}
function $r(e) {
  return e.__data__;
}
function kr(e, t) {
  if (!arguments.length) return Array.from(this, $r);
  var i = t ? _r : vr, n = this._parents, s = this._groups;
  typeof e != "function" && (e = xr(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), c = 0; c < o; ++c) {
    var h = n[c], m = s[c], p = m.length, f = br(e.call(h, h && h.__data__, c, n)), y = f.length, _ = a[c] = new Array(y), C = r[c] = new Array(y), x = d[c] = new Array(p);
    i(h, m, _, C, x, f, t);
    for (var U = 0, z = 0, b, I; U < y; ++U)
      if (b = _[U]) {
        for (U >= z && (z = U + 1); !(I = C[z]) && ++z < y; ) ;
        b._next = I || null;
      }
  }
  return r = new pe(r, n), r._enter = a, r._exit = d, r;
}
function br(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Er() {
  return new pe(this._exit || this._groups.map(Pn), this._parents);
}
function Sr(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function Ar(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var c = i[d], h = n[d], m = c.length, p = a[d] = new Array(m), f, y = 0; y < m; ++y)
      (f = c[y] || h[y]) && (p[y] = f);
  for (; d < s; ++d)
    a[d] = i[d];
  return new pe(a, this._parents);
}
function Cr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function Mr(e) {
  e || (e = Nr);
  function t(m, p) {
    return m && p ? e(m.__data__, p.__data__) : !m - !p;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, d = s[o] = new Array(a), c, h = 0; h < a; ++h)
      (c = r[h]) && (d[h] = c);
    d.sort(t);
  }
  return new pe(s, this._parents).order();
}
function Nr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Pr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Tr() {
  return Array.from(this);
}
function Rr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var r = n[s];
      if (r) return r;
    }
  return null;
}
function Or() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Ur() {
  return !this.node();
}
function Dr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function Lr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function zr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function qr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Vr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Kr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Hr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Fr(e, t) {
  var i = jt(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? zr : Lr : typeof t == "function" ? i.local ? Hr : Kr : i.local ? Vr : qr)(i, t));
}
function Tn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Wr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Gr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Br(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Yr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Wr : typeof t == "function" ? Br : Gr)(e, t, i ?? "")) : Ze(this.node(), e);
}
function Ze(e, t) {
  return e.style.getPropertyValue(t) || Tn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function jr(e) {
  return function() {
    delete this[e];
  };
}
function Xr(e, t) {
  return function() {
    this[e] = t;
  };
}
function Qr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Zr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? jr : typeof t == "function" ? Qr : Xr)(e, t)) : this.node()[e];
}
function Rn(e) {
  return e.trim().split(/^|\s+/);
}
function Si(e) {
  return e.classList || new On(e);
}
function On(e) {
  this._node = e, this._names = Rn(e.getAttribute("class") || "");
}
On.prototype = {
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
function Un(e, t) {
  for (var i = Si(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function Dn(e, t) {
  for (var i = Si(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Jr(e) {
  return function() {
    Un(this, e);
  };
}
function eo(e) {
  return function() {
    Dn(this, e);
  };
}
function to(e, t) {
  return function() {
    (t.apply(this, arguments) ? Un : Dn)(this, e);
  };
}
function io(e, t) {
  var i = Rn(e + "");
  if (arguments.length < 2) {
    for (var n = Si(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? to : t ? Jr : eo)(i, t));
}
function no() {
  this.textContent = "";
}
function so(e) {
  return function() {
    this.textContent = e;
  };
}
function ro(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function oo(e) {
  return arguments.length ? this.each(e == null ? no : (typeof e == "function" ? ro : so)(e)) : this.node().textContent;
}
function ao() {
  this.innerHTML = "";
}
function lo(e) {
  return function() {
    this.innerHTML = e;
  };
}
function co(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function uo(e) {
  return arguments.length ? this.each(e == null ? ao : (typeof e == "function" ? co : lo)(e)) : this.node().innerHTML;
}
function ho() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function po() {
  return this.each(ho);
}
function mo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function fo() {
  return this.each(mo);
}
function go(e) {
  var t = typeof e == "function" ? e : An(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function wo() {
  return null;
}
function yo(e, t) {
  var i = typeof e == "function" ? e : An(e), n = t == null ? wo : typeof t == "function" ? t : Ei(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Io() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function xo() {
  return this.each(Io);
}
function vo() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function _o() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function $o(e) {
  return this.select(e ? _o : vo);
}
function ko(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function bo(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Eo(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function So(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function Ao(e, t, i) {
  return function() {
    var n = this.__on, s, o = bo(t);
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
function Co(e, t, i) {
  var n = Eo(e + ""), s, o = n.length, r;
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
  for (a = t ? Ao : So, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function Ln(e, t, i) {
  var n = Tn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Mo(e, t) {
  return function() {
    return Ln(this, e, t);
  };
}
function No(e, t) {
  return function() {
    return Ln(this, e, t.apply(this, arguments));
  };
}
function Po(e, t) {
  return this.each((typeof t == "function" ? No : Mo)(e, t));
}
function* To() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, r; s < o; ++s)
      (r = n[s]) && (yield r);
}
var zn = [null];
function pe(e, t) {
  this._groups = e, this._parents = t;
}
function $t() {
  return new pe([[document.documentElement]], zn);
}
function Ro() {
  return this;
}
pe.prototype = $t.prototype = {
  constructor: pe,
  select: rr,
  selectAll: lr,
  selectChild: pr,
  selectChildren: wr,
  filter: yr,
  data: kr,
  enter: Ir,
  exit: Er,
  join: Sr,
  merge: Ar,
  selection: Ro,
  order: Cr,
  sort: Mr,
  call: Pr,
  nodes: Tr,
  node: Rr,
  size: Or,
  empty: Ur,
  each: Dr,
  attr: Fr,
  style: Yr,
  property: Zr,
  classed: io,
  text: oo,
  html: uo,
  raise: po,
  lower: fo,
  append: go,
  insert: yo,
  remove: xo,
  clone: $o,
  datum: ko,
  on: Co,
  dispatch: Po,
  [Symbol.iterator]: To
};
function ke(e) {
  return typeof e == "string" ? new pe([[document.querySelector(e)]], [document.documentElement]) : new pe([[e]], zn);
}
function Oo(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function De(e, t) {
  if (e = Oo(e), t === void 0 && (t = e.currentTarget), t) {
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
var Uo = { value: () => {
} };
function Ai() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Ot(i);
}
function Ot(e) {
  this._ = e;
}
function Do(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Ot.prototype = Ai.prototype = {
  constructor: Ot,
  on: function(e, t) {
    var i = this._, n = Do(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = Lo(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = Bi(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = Bi(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Ot(e);
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
function Lo(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function Bi(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = Uo, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const ci = { capture: !0, passive: !1 };
function ui(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function zo(e) {
  var t = e.document.documentElement, i = ke(e).on("dragstart.drag", ui, ci);
  "onselectstart" in t ? i.on("selectstart.drag", ui, ci) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function qo(e, t) {
  var i = e.document.documentElement, n = ke(e).on("dragstart.drag", null);
  t && (n.on("click.drag", ui, ci), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Ci(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function qn(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function kt() {
}
var yt = 0.7, Ht = 1 / yt, je = "\\s*([+-]?\\d+)\\s*", It = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", be = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Vo = /^#([0-9a-f]{3,8})$/, Ko = new RegExp(`^rgb\\(${je},${je},${je}\\)$`), Ho = new RegExp(`^rgb\\(${be},${be},${be}\\)$`), Fo = new RegExp(`^rgba\\(${je},${je},${je},${It}\\)$`), Wo = new RegExp(`^rgba\\(${be},${be},${be},${It}\\)$`), Go = new RegExp(`^hsl\\(${It},${be},${be}\\)$`), Bo = new RegExp(`^hsla\\(${It},${be},${be},${It}\\)$`), Yi = {
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
Ci(kt, xt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ji,
  // Deprecated! Use color.formatHex.
  formatHex: ji,
  formatHex8: Yo,
  formatHsl: jo,
  formatRgb: Xi,
  toString: Xi
});
function ji() {
  return this.rgb().formatHex();
}
function Yo() {
  return this.rgb().formatHex8();
}
function jo() {
  return Vn(this).formatHsl();
}
function Xi() {
  return this.rgb().formatRgb();
}
function xt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Vo.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Qi(t) : i === 3 ? new ae(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? St(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? St(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Ko.exec(e)) ? new ae(t[1], t[2], t[3], 1) : (t = Ho.exec(e)) ? new ae(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Fo.exec(e)) ? St(t[1], t[2], t[3], t[4]) : (t = Wo.exec(e)) ? St(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Go.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, 1) : (t = Bo.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, t[4]) : Yi.hasOwnProperty(e) ? Qi(Yi[e]) : e === "transparent" ? new ae(NaN, NaN, NaN, 0) : null;
}
function Qi(e) {
  return new ae(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function St(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new ae(e, t, i, n);
}
function Xo(e) {
  return e instanceof kt || (e = xt(e)), e ? (e = e.rgb(), new ae(e.r, e.g, e.b, e.opacity)) : new ae();
}
function hi(e, t, i, n) {
  return arguments.length === 1 ? Xo(e) : new ae(e, t, i, n ?? 1);
}
function ae(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Ci(ae, hi, qn(kt, {
  brighter(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new ae(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? yt : Math.pow(yt, e), new ae(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ae(Ke(this.r), Ke(this.g), Ke(this.b), Ft(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Zi,
  // Deprecated! Use color.formatHex.
  formatHex: Zi,
  formatHex8: Qo,
  formatRgb: Ji,
  toString: Ji
}));
function Zi() {
  return `#${ze(this.r)}${ze(this.g)}${ze(this.b)}`;
}
function Qo() {
  return `#${ze(this.r)}${ze(this.g)}${ze(this.b)}${ze((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ji() {
  const e = Ft(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ke(this.r)}, ${Ke(this.g)}, ${Ke(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ft(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ke(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ze(e) {
  return e = Ke(e), (e < 16 ? "0" : "") + e.toString(16);
}
function en(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ve(e, t, i, n);
}
function Vn(e) {
  if (e instanceof ve) return new ve(e.h, e.s, e.l, e.opacity);
  if (e instanceof kt || (e = xt(e)), !e) return new ve();
  if (e instanceof ve) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new ve(r, a, d, e.opacity);
}
function Zo(e, t, i, n) {
  return arguments.length === 1 ? Vn(e) : new ve(e, t, i, n ?? 1);
}
function ve(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Ci(ve, Zo, qn(kt, {
  brighter(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? yt : Math.pow(yt, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new ae(
      ni(e >= 240 ? e - 240 : e + 120, s, n),
      ni(e, s, n),
      ni(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new ve(tn(this.h), At(this.s), At(this.l), Ft(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ft(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${tn(this.h)}, ${At(this.s) * 100}%, ${At(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function tn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function At(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ni(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Kn = (e) => () => e;
function Jo(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function ea(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function ta(e) {
  return (e = +e) == 1 ? Hn : function(t, i) {
    return i - t ? ea(t, i, e) : Kn(isNaN(t) ? i : t);
  };
}
function Hn(e, t) {
  var i = t - e;
  return i ? Jo(e, i) : Kn(isNaN(e) ? t : e);
}
const nn = (function e(t) {
  var i = ta(t);
  function n(s, o) {
    var r = i((s = hi(s)).r, (o = hi(o)).r), a = i(s.g, o.g), d = i(s.b, o.b), c = Hn(s.opacity, o.opacity);
    return function(h) {
      return s.r = r(h), s.g = a(h), s.b = d(h), s.opacity = c(h), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Te(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var pi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, si = new RegExp(pi.source, "g");
function ia(e) {
  return function() {
    return e;
  };
}
function na(e) {
  return function(t) {
    return e(t) + "";
  };
}
function sa(e, t) {
  var i = pi.lastIndex = si.lastIndex = 0, n, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (n = pi.exec(e)) && (s = si.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: Te(n, s) })), i = si.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? na(d[0].x) : ia(t) : (t = d.length, function(c) {
    for (var h = 0, m; h < t; ++h) a[(m = d[h]).i] = m.x(c);
    return a.join("");
  });
}
var sn = 180 / Math.PI, mi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Fn(e, t, i, n, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * i + t * n) && (i -= e * d, n -= t * d), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, d /= a), e * n < t * i && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * sn,
    skewX: Math.atan(d) * sn,
    scaleX: r,
    scaleY: a
  };
}
var Ct;
function ra(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? mi : Fn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function oa(e) {
  return e == null || (Ct || (Ct = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ct.setAttribute("transform", e), !(e = Ct.transform.baseVal.consolidate())) ? mi : (e = e.matrix, Fn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Wn(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, h, m, p, f, y) {
    if (c !== m || h !== p) {
      var _ = f.push("translate(", null, t, null, i);
      y.push({ i: _ - 4, x: Te(c, m) }, { i: _ - 2, x: Te(h, p) });
    } else (m || p) && f.push("translate(" + m + t + p + i);
  }
  function r(c, h, m, p) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), p.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: Te(c, h) })) : h && m.push(s(m) + "rotate(" + h + n);
  }
  function a(c, h, m, p) {
    c !== h ? p.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: Te(c, h) }) : h && m.push(s(m) + "skewX(" + h + n);
  }
  function d(c, h, m, p, f, y) {
    if (c !== m || h !== p) {
      var _ = f.push(s(f) + "scale(", null, ",", null, ")");
      y.push({ i: _ - 4, x: Te(c, m) }, { i: _ - 2, x: Te(h, p) });
    } else (m !== 1 || p !== 1) && f.push(s(f) + "scale(" + m + "," + p + ")");
  }
  return function(c, h) {
    var m = [], p = [];
    return c = e(c), h = e(h), o(c.translateX, c.translateY, h.translateX, h.translateY, m, p), r(c.rotate, h.rotate, m, p), a(c.skewX, h.skewX, m, p), d(c.scaleX, c.scaleY, h.scaleX, h.scaleY, m, p), c = h = null, function(f) {
      for (var y = -1, _ = p.length, C; ++y < _; ) m[(C = p[y]).i] = C.x(f);
      return m.join("");
    };
  };
}
var aa = Wn(ra, "px, ", "px)", "deg)"), da = Wn(oa, ", ", ")", ")"), la = 1e-12;
function rn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ca(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function ua(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ha = (function e(t, i, n) {
  function s(o, r) {
    var a = o[0], d = o[1], c = o[2], h = r[0], m = r[1], p = r[2], f = h - a, y = m - d, _ = f * f + y * y, C, x;
    if (_ < la)
      x = Math.log(p / c) / t, C = function(k) {
        return [
          a + k * f,
          d + k * y,
          c * Math.exp(t * k * x)
        ];
      };
    else {
      var U = Math.sqrt(_), z = (p * p - c * c + n * _) / (2 * c * i * U), b = (p * p - c * c - n * _) / (2 * p * i * U), I = Math.log(Math.sqrt(z * z + 1) - z), v = Math.log(Math.sqrt(b * b + 1) - b);
      x = (v - I) / t, C = function(k) {
        var M = k * x, W = rn(I), R = c / (i * U) * (W * ua(t * M + I) - ca(I));
        return [
          a + R * f,
          d + R * y,
          c * W / rn(t * M + I)
        ];
      };
    }
    return C.duration = x * 1e3 * t / Math.SQRT2, C;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Je = 0, lt = 0, rt = 0, Gn = 1e3, Wt, ct, Gt = 0, Fe = 0, Xt = 0, vt = typeof performance == "object" && performance.now ? performance : Date, Bn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Mi() {
  return Fe || (Bn(pa), Fe = vt.now() + Xt);
}
function pa() {
  Fe = 0;
}
function Bt() {
  this._call = this._time = this._next = null;
}
Bt.prototype = Yn.prototype = {
  constructor: Bt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Mi() : +i) + (t == null ? 0 : +t), !this._next && ct !== this && (ct ? ct._next = this : Wt = this, ct = this), this._call = e, this._time = i, fi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, fi());
  }
};
function Yn(e, t, i) {
  var n = new Bt();
  return n.restart(e, t, i), n;
}
function ma() {
  Mi(), ++Je;
  for (var e = Wt, t; e; )
    (t = Fe - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Je;
}
function on() {
  Fe = (Gt = vt.now()) + Xt, Je = lt = 0;
  try {
    ma();
  } finally {
    Je = 0, ga(), Fe = 0;
  }
}
function fa() {
  var e = vt.now(), t = e - Gt;
  t > Gn && (Xt -= t, Gt = e);
}
function ga() {
  for (var e, t = Wt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Wt = i);
  ct = e, fi(n);
}
function fi(e) {
  if (!Je) {
    lt && (lt = clearTimeout(lt));
    var t = e - Fe;
    t > 24 ? (e < 1 / 0 && (lt = setTimeout(on, e - vt.now() - Xt)), rt && (rt = clearInterval(rt))) : (rt || (Gt = vt.now(), rt = setInterval(fa, Gn)), Je = 1, Bn(on));
  }
}
function an(e, t, i) {
  var n = new Bt();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var wa = Ai("start", "end", "cancel", "interrupt"), ya = [], jn = 0, dn = 1, gi = 2, Ut = 3, ln = 4, wi = 5, Dt = 6;
function Qt(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  Ia(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: wa,
    tween: ya,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: jn
  });
}
function Ni(e, t) {
  var i = _e(e, t);
  if (i.state > jn) throw new Error("too late; already scheduled");
  return i;
}
function Se(e, t) {
  var i = _e(e, t);
  if (i.state > Ut) throw new Error("too late; already running");
  return i;
}
function _e(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Ia(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = Yn(o, 0, i.time);
  function o(c) {
    i.state = dn, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var h, m, p, f;
    if (i.state !== dn) return d();
    for (h in n)
      if (f = n[h], f.name === i.name) {
        if (f.state === Ut) return an(r);
        f.state === ln ? (f.state = Dt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete n[h]) : +h < t && (f.state = Dt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete n[h]);
      }
    if (an(function() {
      i.state === Ut && (i.state = ln, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = gi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === gi) {
      for (i.state = Ut, s = new Array(p = i.tween.length), h = 0, m = -1; h < p; ++h)
        (f = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = f);
      s.length = m + 1;
    }
  }
  function a(c) {
    for (var h = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(d), i.state = wi, 1), m = -1, p = s.length; ++m < p; )
      s[m].call(e, h);
    i.state === wi && (i.on.call("end", e, e.__data__, i.index, i.group), d());
  }
  function d() {
    i.state = Dt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Lt(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > gi && n.state < wi, n.state = Dt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function xa(e) {
  return this.each(function() {
    Lt(this, e);
  });
}
function va(e, t) {
  var i, n;
  return function() {
    var s = Se(this, e), o = s.tween;
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
function _a(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Se(this, e), r = o.tween;
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
function $a(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = _e(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? va : _a)(i, e, t));
}
function Pi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Se(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return _e(s, n).value[t];
  };
}
function Xn(e, t) {
  var i;
  return (typeof t == "number" ? Te : t instanceof xt ? nn : (i = xt(t)) ? (t = i, nn) : sa)(e, t);
}
function ka(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ba(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ea(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Sa(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Aa(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function Ca(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function Ma(e, t) {
  var i = jt(e), n = i === "transform" ? da : Xn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Ca : Aa)(i, n, Pi(this, "attr." + e, t)) : t == null ? (i.local ? ba : ka)(i) : (i.local ? Sa : Ea)(i, n, t));
}
function Na(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function Pa(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function Ta(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Pa(e, o)), i;
  }
  return s._value = t, s;
}
function Ra(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Na(e, o)), i;
  }
  return s._value = t, s;
}
function Oa(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = jt(e);
  return this.tween(i, (n.local ? Ta : Ra)(n, t));
}
function Ua(e, t) {
  return function() {
    Ni(this, e).delay = +t.apply(this, arguments);
  };
}
function Da(e, t) {
  return t = +t, function() {
    Ni(this, e).delay = t;
  };
}
function La(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ua : Da)(t, e)) : _e(this.node(), t).delay;
}
function za(e, t) {
  return function() {
    Se(this, e).duration = +t.apply(this, arguments);
  };
}
function qa(e, t) {
  return t = +t, function() {
    Se(this, e).duration = t;
  };
}
function Va(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? za : qa)(t, e)) : _e(this.node(), t).duration;
}
function Ka(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Se(this, e).ease = t;
  };
}
function Ha(e) {
  var t = this._id;
  return arguments.length ? this.each(Ka(t, e)) : _e(this.node(), t).ease;
}
function Fa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Se(this, e).ease = i;
  };
}
function Wa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Fa(this._id, e));
}
function Ga(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && e.call(d, d.__data__, c, o) && a.push(d);
  return new Me(n, this._parents, this._name, this._id);
}
function Ba(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var d = t[a], c = i[a], h = d.length, m = r[a] = new Array(h), p, f = 0; f < h; ++f)
      (p = d[f] || c[f]) && (m[f] = p);
  for (; a < n; ++a)
    r[a] = t[a];
  return new Me(r, this._parents, this._name, this._id);
}
function Ya(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function ja(e, t, i) {
  var n, s, o = Ya(t) ? Ni : Se;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function Xa(e, t) {
  var i = this._id;
  return arguments.length < 2 ? _e(this.node(), i).on.on(e) : this.each(ja(i, e, t));
}
function Qa(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Za() {
  return this.on("end.remove", Qa(this._id));
}
function Ja(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ei(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], d = a.length, c = o[r] = new Array(d), h, m, p = 0; p < d; ++p)
      (h = a[p]) && (m = e.call(h, h.__data__, p, a)) && ("__data__" in h && (m.__data__ = h.__data__), c[p] = m, Qt(c[p], t, i, p, c, _e(h, i)));
  return new Me(o, this._parents, t, i);
}
function ed(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Cn(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = n[a], c = d.length, h, m = 0; m < c; ++m)
      if (h = d[m]) {
        for (var p = e.call(h, h.__data__, m, d), f, y = _e(h, i), _ = 0, C = p.length; _ < C; ++_)
          (f = p[_]) && Qt(f, t, i, _, p, y);
        o.push(p), r.push(h);
      }
  return new Me(o, r, t, i);
}
var td = $t.prototype.constructor;
function id() {
  return new td(this._groups, this._parents);
}
function nd(e, t) {
  var i, n, s;
  return function() {
    var o = Ze(this, e), r = (this.style.removeProperty(e), Ze(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function Qn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function sd(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = Ze(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function rd(e, t, i) {
  var n, s, o;
  return function() {
    var r = Ze(this, e), a = i(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Ze(this, e))), r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a));
  };
}
function od(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = Se(this, e), c = d.on, h = d.value[o] == null ? a || (a = Qn(t)) : void 0;
    (c !== i || s !== h) && (n = (i = c).copy()).on(r, s = h), d.on = n;
  };
}
function ad(e, t, i) {
  var n = (e += "") == "transform" ? aa : Xn;
  return t == null ? this.styleTween(e, nd(e, n)).on("end.style." + e, Qn(e)) : typeof t == "function" ? this.styleTween(e, rd(e, n, Pi(this, "style." + e, t))).each(od(this._id, e)) : this.styleTween(e, sd(e, n, t), i).on("end.style." + e, null);
}
function dd(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function ld(e, t, i) {
  var n, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && dd(e, r, i)), n;
  }
  return o._value = t, o;
}
function cd(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, ld(e, t, i ?? ""));
}
function ud(e) {
  return function() {
    this.textContent = e;
  };
}
function hd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function pd(e) {
  return this.tween("text", typeof e == "function" ? hd(Pi(this, "text", e)) : ud(e == null ? "" : e + ""));
}
function md(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function fd(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && md(s)), t;
  }
  return n._value = e, n;
}
function gd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, fd(e));
}
function wd() {
  for (var e = this._name, t = this._id, i = Zn(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, c = 0; c < a; ++c)
      if (d = r[c]) {
        var h = _e(d, t);
        Qt(d, e, i, c, r, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Me(n, this._parents, e, i);
}
function yd() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = Se(this, n), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), c.on = t;
    }), s === 0 && o();
  });
}
var Id = 0;
function Me(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function Zn() {
  return ++Id;
}
var Ae = $t.prototype;
Me.prototype = {
  constructor: Me,
  select: Ja,
  selectAll: ed,
  selectChild: Ae.selectChild,
  selectChildren: Ae.selectChildren,
  filter: Ga,
  merge: Ba,
  selection: id,
  transition: wd,
  call: Ae.call,
  nodes: Ae.nodes,
  node: Ae.node,
  size: Ae.size,
  empty: Ae.empty,
  each: Ae.each,
  on: Xa,
  attr: Ma,
  attrTween: Oa,
  style: ad,
  styleTween: cd,
  text: pd,
  textTween: gd,
  remove: Za,
  tween: $a,
  delay: La,
  duration: Va,
  ease: Ha,
  easeVarying: Wa,
  end: yd,
  [Symbol.iterator]: Ae[Symbol.iterator]
};
function xd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var vd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: xd
};
function _d(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function $d(e) {
  var t, i;
  e instanceof Me ? (t = e._id, e = e._name) : (t = Zn(), (i = vd).time = Mi(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && Qt(d, e, t, c, r, i || _d(d, t));
  return new Me(n, this._parents, e, t);
}
$t.prototype.interrupt = xa;
$t.prototype.transition = $d;
const Mt = (e) => () => e;
function kd(e, {
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
function Ce(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Ce.prototype = {
  constructor: Ce,
  scale: function(e) {
    return e === 1 ? this : new Ce(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Ce(this.k, this.x + this.k * e, this.y + this.k * t);
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
var pt = new Ce(1, 0, 0);
Ce.prototype;
function ri(e) {
  e.stopImmediatePropagation();
}
function ot(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function bd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ed() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function cn() {
  return this.__zoom || pt;
}
function Sd(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Ad() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Cd(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function Md() {
  var e = bd, t = Ed, i = Cd, n = Sd, s = Ad, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = ha, c = Ai("start", "zoom", "end"), h, m, p, f = 500, y = 150, _ = 0, C = 10;
  function x(u) {
    u.property("__zoom", cn).on("wheel.zoom", M, { passive: !1 }).on("mousedown.zoom", W).on("dblclick.zoom", R).filter(s).on("touchstart.zoom", D).on("touchmove.zoom", ee).on("touchend.zoom touchcancel.zoom", ne).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(u, w, g, $) {
    var S = u.selection ? u.selection() : u;
    S.property("__zoom", cn), u !== S ? I(u, w, g, $) : S.interrupt().each(function() {
      v(this, arguments).event($).start().zoom(null, typeof w == "function" ? w.apply(this, arguments) : w).end();
    });
  }, x.scaleBy = function(u, w, g, $) {
    x.scaleTo(u, function() {
      var S = this.__zoom.k, A = typeof w == "function" ? w.apply(this, arguments) : w;
      return S * A;
    }, g, $);
  }, x.scaleTo = function(u, w, g, $) {
    x.transform(u, function() {
      var S = t.apply(this, arguments), A = this.__zoom, E = g == null ? b(S) : typeof g == "function" ? g.apply(this, arguments) : g, O = A.invert(E), G = typeof w == "function" ? w.apply(this, arguments) : w;
      return i(z(U(A, G), E, O), S, r);
    }, g, $);
  }, x.translateBy = function(u, w, g, $) {
    x.transform(u, function() {
      return i(this.__zoom.translate(
        typeof w == "function" ? w.apply(this, arguments) : w,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), r);
    }, null, $);
  }, x.translateTo = function(u, w, g, $, S) {
    x.transform(u, function() {
      var A = t.apply(this, arguments), E = this.__zoom, O = $ == null ? b(A) : typeof $ == "function" ? $.apply(this, arguments) : $;
      return i(pt.translate(O[0], O[1]).scale(E.k).translate(
        typeof w == "function" ? -w.apply(this, arguments) : -w,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), A, r);
    }, $, S);
  };
  function U(u, w) {
    return w = Math.max(o[0], Math.min(o[1], w)), w === u.k ? u : new Ce(w, u.x, u.y);
  }
  function z(u, w, g) {
    var $ = w[0] - g[0] * u.k, S = w[1] - g[1] * u.k;
    return $ === u.x && S === u.y ? u : new Ce(u.k, $, S);
  }
  function b(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function I(u, w, g, $) {
    u.on("start.zoom", function() {
      v(this, arguments).event($).start();
    }).on("interrupt.zoom end.zoom", function() {
      v(this, arguments).event($).end();
    }).tween("zoom", function() {
      var S = this, A = arguments, E = v(S, A).event($), O = t.apply(S, A), G = g == null ? b(O) : typeof g == "function" ? g.apply(S, A) : g, j = Math.max(O[1][0] - O[0][0], O[1][1] - O[0][1]), X = S.__zoom, le = typeof w == "function" ? w.apply(S, A) : w, ge = d(X.invert(G).concat(j / X.k), le.invert(G).concat(j / le.k));
      return function(ce) {
        if (ce === 1) ce = le;
        else {
          var we = ge(ce), et = j / we[2];
          ce = new Ce(et, G[0] - we[0] * et, G[1] - we[1] * et);
        }
        E.zoom(null, ce);
      };
    });
  }
  function v(u, w, g) {
    return !g && u.__zooming || new k(u, w);
  }
  function k(u, w) {
    this.that = u, this.args = w, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, w), this.taps = 0;
  }
  k.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, w) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = w.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = w.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = w.invert(this.touch1[0])), this.that.__zoom = w, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var w = ke(this.that).datum();
      c.call(
        u,
        this.that,
        new kd(u, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: c
        }),
        w
      );
    }
  };
  function M(u, ...w) {
    if (!e.apply(this, arguments)) return;
    var g = v(this, w).event(u), $ = this.__zoom, S = Math.max(o[0], Math.min(o[1], $.k * Math.pow(2, n.apply(this, arguments)))), A = De(u);
    if (g.wheel)
      (g.mouse[0][0] !== A[0] || g.mouse[0][1] !== A[1]) && (g.mouse[1] = $.invert(g.mouse[0] = A)), clearTimeout(g.wheel);
    else {
      if ($.k === S) return;
      g.mouse = [A, $.invert(A)], Lt(this), g.start();
    }
    ot(u), g.wheel = setTimeout(E, y), g.zoom("mouse", i(z(U($, S), g.mouse[0], g.mouse[1]), g.extent, r));
    function E() {
      g.wheel = null, g.end();
    }
  }
  function W(u, ...w) {
    if (p || !e.apply(this, arguments)) return;
    var g = u.currentTarget, $ = v(this, w, !0).event(u), S = ke(u.view).on("mousemove.zoom", G, !0).on("mouseup.zoom", j, !0), A = De(u, g), E = u.clientX, O = u.clientY;
    zo(u.view), ri(u), $.mouse = [A, this.__zoom.invert(A)], Lt(this), $.start();
    function G(X) {
      if (ot(X), !$.moved) {
        var le = X.clientX - E, ge = X.clientY - O;
        $.moved = le * le + ge * ge > _;
      }
      $.event(X).zoom("mouse", i(z($.that.__zoom, $.mouse[0] = De(X, g), $.mouse[1]), $.extent, r));
    }
    function j(X) {
      S.on("mousemove.zoom mouseup.zoom", null), qo(X.view, $.moved), ot(X), $.event(X).end();
    }
  }
  function R(u, ...w) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, $ = De(u.changedTouches ? u.changedTouches[0] : u, this), S = g.invert($), A = g.k * (u.shiftKey ? 0.5 : 2), E = i(z(U(g, A), $, S), t.apply(this, w), r);
      ot(u), a > 0 ? ke(this).transition().duration(a).call(I, E, $, u) : ke(this).call(x.transform, E, $, u);
    }
  }
  function D(u, ...w) {
    if (e.apply(this, arguments)) {
      var g = u.touches, $ = g.length, S = v(this, w, u.changedTouches.length === $).event(u), A, E, O, G;
      for (ri(u), E = 0; E < $; ++E)
        O = g[E], G = De(O, this), G = [G, this.__zoom.invert(G), O.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== G[2] && (S.touch1 = G, S.taps = 0) : (S.touch0 = G, A = !0, S.taps = 1 + !!h);
      h && (h = clearTimeout(h)), A && (S.taps < 2 && (m = G[0], h = setTimeout(function() {
        h = null;
      }, f)), Lt(this), S.start());
    }
  }
  function ee(u, ...w) {
    if (this.__zooming) {
      var g = v(this, w).event(u), $ = u.changedTouches, S = $.length, A, E, O, G;
      for (ot(u), A = 0; A < S; ++A)
        E = $[A], O = De(E, this), g.touch0 && g.touch0[2] === E.identifier ? g.touch0[0] = O : g.touch1 && g.touch1[2] === E.identifier && (g.touch1[0] = O);
      if (E = g.that.__zoom, g.touch1) {
        var j = g.touch0[0], X = g.touch0[1], le = g.touch1[0], ge = g.touch1[1], ce = (ce = le[0] - j[0]) * ce + (ce = le[1] - j[1]) * ce, we = (we = ge[0] - X[0]) * we + (we = ge[1] - X[1]) * we;
        E = U(E, Math.sqrt(ce / we)), O = [(j[0] + le[0]) / 2, (j[1] + le[1]) / 2], G = [(X[0] + ge[0]) / 2, (X[1] + ge[1]) / 2];
      } else if (g.touch0) O = g.touch0[0], G = g.touch0[1];
      else return;
      g.zoom("touch", i(z(E, O, G), g.extent, r));
    }
  }
  function ne(u, ...w) {
    if (this.__zooming) {
      var g = v(this, w).event(u), $ = u.changedTouches, S = $.length, A, E;
      for (ri(u), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, f), A = 0; A < S; ++A)
        E = $[A], g.touch0 && g.touch0[2] === E.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === E.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (E = De(E, this), Math.hypot(m[0] - E[0], m[1] - E[1]) < C)) {
        var O = ke(this).on("dblclick.zoom");
        O && O.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Mt(+u), x) : n;
  }, x.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Mt(!!u), x) : e;
  }, x.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : Mt(!!u), x) : s;
  }, x.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Mt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), x) : t;
  }, x.scaleExtent = function(u) {
    return arguments.length ? (o[0] = +u[0], o[1] = +u[1], x) : [o[0], o[1]];
  }, x.translateExtent = function(u) {
    return arguments.length ? (r[0][0] = +u[0][0], r[1][0] = +u[1][0], r[0][1] = +u[0][1], r[1][1] = +u[1][1], x) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, x.constrain = function(u) {
    return arguments.length ? (i = u, x) : i;
  }, x.duration = function(u) {
    return arguments.length ? (a = +u, x) : a;
  }, x.interpolate = function(u) {
    return arguments.length ? (d = u, x) : d;
  }, x.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? x : u;
  }, x.clickDistance = function(u) {
    return arguments.length ? (_ = (u = +u) * u, x) : Math.sqrt(_);
  }, x.tapDistance = function(u) {
    return arguments.length ? (C = +u, x) : C;
  }, x;
}
var Nd = Object.defineProperty, Pd = Object.getOwnPropertyDescriptor, re = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Pd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Nd(t, i, s), s;
};
function Td(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * r) / d, h = ((i.x - e.x) * o - (i.y - e.y) * s) / d;
  return c <= 0.02 || c >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function Rd(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function Od(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, c = (r.y - o.y) / a, h = t.map(([p, f]) => Td(o, r, p, f)).filter((p) => p !== null).filter((p) => p.t * a > i + 2 && (1 - p.t) * a > i + 2).sort((p, f) => p.t - f.t);
    let m = -1 / 0;
    for (const p of h)
      p.t * a - i <= m + 2 || (n += ` L ${p.x - d * i} ${p.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${p.x + d * i} ${p.y + c * i}`, m = p.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const Nt = {
  component: F`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: F`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: F`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: F`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: F`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: F`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: F`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: F`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: F`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: F`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: F`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: F`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: F`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: F`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: F`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let J = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = pt, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = Md().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), ke(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((h) => h.x - h.w / 2)) - e, o = Math.max(...t.map((h) => h.x + h.w / 2)) + e, r = Math.min(...t.map((h) => h.y - h.h / 2)) - e, a = Math.max(...t.map((h) => h.y + h.h / 2)) + e, d = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), c = pt.translate(n.width / 2 - d * (s + o) / 2, n.height / 2 - d * (r + a) / 2).scale(d);
    ke(i).call(this._zoomBehavior.transform, c);
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
      const f = this.nodeIdAt(p), y = f && f !== t.id ? this.scene.nodes.find((_) => _.id === f) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, h = (p) => {
      if ((p.buttons & 1) === 0) {
        m(p);
        return;
      }
      const f = this.toScene(p), y = f.x - i.x, _ = f.y - i.y;
      if (!(!s && Math.hypot(y, _) < 3 / this._t.k))
        if (s = !0, r && a) {
          const C = /* @__PURE__ */ new Map();
          for (const x of r) {
            const U = a.get(x.id), z = this.clampToParent(x, U.x + y, U.y + _);
            C.set(x.id, { x: z.x, y: z.y });
          }
          this._dragGroup = C;
        } else d(p) ? (this._dragPos = { id: t.id, x: n.x + y, y: n.y + _ }, this._hoverNodeId = c(p)) : (this._dragPos = this.clampToParent(t, n.x + y, n.y + _), this._hoverNodeId = null);
    }, m = (p) => {
      if (window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", m), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, y]) => ({ id: f, x: y.x, y: y.y }))
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((_) => _.parentId === t.id), d = Math.min(...a.map((_) => _.x - _.w / 2)), c = Math.max(...a.map((_) => _.x + _.w / 2)), h = Math.min(...a.map((_) => _.y - _.h / 2)), m = Math.max(...a.map((_) => _.y + _.h / 2)), p = os(
      a.map((_) => ({ dx: _.x - r.x, dy: _.y - r.y, w: _.w, h: _.h })),
      { w: s, h: o }
    ), f = (_) => {
      if ((_.buttons & 1) === 0) {
        y();
        return;
      }
      const C = this.toScene(_);
      if (_.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(p.w, 2 * Math.abs(C.x - r.x)),
          h: Math.max(p.h, 2 * Math.abs(C.y - r.y))
        };
        return;
      }
      const x = r.x - i * r.w / 2, U = r.y - n * r.h / 2, z = i > 0 ? Math.max(C.x, x + s, a.length ? c + 10 : -1 / 0) : Math.min(C.x, x - s, a.length ? d - 10 : 1 / 0), b = n > 0 ? Math.max(C.y, U + o, a.length ? m + 10 : -1 / 0) : Math.min(C.y, U - o, a.length ? h - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (x + z) / 2,
        y: (U + b) / 2,
        w: Math.abs(z - x),
        h: Math.abs(b - U)
      };
    }, y = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", y), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", y);
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
      const { dist: s } = Rd(t, e[n], e[n + 1]);
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
    return F`
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
          ${e.tooltip ? F`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${Od(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}
              pointer-events="none"></path>
        ${e.label ? F`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
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
      return F`
                <circle data-waypoint cx=${h.x} cy=${h.y} r=${p ? 6 : 5}
                        fill=${p ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(y) => {
        y.button === 0 && (y.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: m }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], m));
      }}
                        @dblclick=${(y) => {
        y.stopPropagation(), this.removeWaypoint(e, m);
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
    var p, f, y;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((p = this._resize) == null ? void 0 : p.id) === e.id ? this._resize.w : e.w, d = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = a / 2, h = d / 2, m = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return F`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (y = this._dragGroup) != null && y.has(e.id) ? "none" : "auto"}
         @pointerdown=${(_) => this.onNodePointerDown(_, e)}
         @dblclick=${(_) => {
      _.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? F`<rect x=${-c - 4} y=${-h - 4} width=${a + 8} height=${d + 8}
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
          ${e.tooltip ? F`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? F`<text x=${-c} y=${-h - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && Nt[e.symbol] && !r ? F`<g transform="translate(${c - 17}, ${-h + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Nt[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && Nt[e.symbol] ? F`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Nt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? F`
              <foreignObject x=${-c + 6} y=${o ? -h + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(_) => _.stopPropagation()}
                  @keydown=${(_) => {
      _.stopPropagation(), _.key === "Enter" && this.commitRename(e, _.target.value), _.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(_) => this.commitRename(e, _.target.value)}
                />
              </foreignObject>` : r ? F`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? F`<text x=${-c + 12} y=${-h + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : F`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? F`<line x1=${-c + 8} y1=${-h + 28} x2=${c - 8} y2=${-h + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, h],
      [0, -h]
    ].map(
      ([_, C]) => F`
                <circle data-handle cx=${_} cy=${C} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(x) => this.onHandlePointerDown(x, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([_, C]) => F`
                <rect data-resize x=${_ * c - 6.5} y=${C * h - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${_ * C > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(x) => this.onResizePointerDown(x, e, _, C)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return F``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return F``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return F`
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
          const y = this.nodePos(f);
          return y.x >= d && y.x <= c && y.y >= h && y.y <= m;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: p });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return F``;
    const { a: e, b: t } = this._rubber;
    return F`
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
    const n = this.getBoundingClientRect(), s = this._t.k, o = pt.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    ke(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return P``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return P`
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
      return F`<rect
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
      if (!a) return F``;
      const d = this.renderEdge(r, a, [...t]);
      for (let c = 0; c < a.length - 1; c++) t.push([a[c], a[c + 1]]);
      return d;
    }), n = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (n.has(r.sourceId) || n.has(r.targetId) ? o : s).push(
        i[a]
      );
    }), P`
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
      (r) => F`
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
J.styles = _i`
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
re([
  Ee({ attribute: !1 })
], J.prototype, "scene", 2);
re([
  Ee({ attribute: !1 })
], J.prototype, "selectedId", 2);
re([
  Ee({ attribute: !1 })
], J.prototype, "selectedIds", 2);
re([
  Ee({ type: Boolean })
], J.prototype, "connectable", 2);
re([
  Ee({ attribute: !1 })
], J.prototype, "edgePoints", 2);
re([
  T()
], J.prototype, "_t", 2);
re([
  T()
], J.prototype, "_dragPos", 2);
re([
  T()
], J.prototype, "_dragGroup", 2);
re([
  T()
], J.prototype, "_pendingLink", 2);
re([
  T()
], J.prototype, "_hoverNodeId", 2);
re([
  T()
], J.prototype, "_editingId", 2);
re([
  T()
], J.prototype, "_spaceDown", 2);
re([
  T()
], J.prototype, "_wpDrag", 2);
re([
  T()
], J.prototype, "_selectedWaypoint", 2);
re([
  T()
], J.prototype, "_resize", 2);
re([
  T()
], J.prototype, "_rubber", 2);
J = re([
  bi("modux-canvas")
], J);
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
function he(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function Z(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const We = (e) => e.trim().toLowerCase();
function Ud(e, t) {
  var W, R, D, ee, ne;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((w) => ({ ...w, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((w) => w.id))
  ), d = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((w) => ({ ...w, moduleId: u.id, application: !1 }))
  ), c = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((w) => ({ ...w, moduleId: u.id, application: !0 }))
  ), h = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((w) => ({ ...w, moduleId: u.id }))
  );
  for (const u of s)
    he(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: L.command.w,
      h: L.command.h,
      kind: "use-case",
      symbol: u.policy ? "flow" : "gear",
      fill: u.policy ? L.policy.fill : L.command.fill,
      stroke: u.policy ? L.policy.stroke : L.command.stroke,
      badge: u.policy ? "POLICY" : "COMANDO",
      tooltip: u.policy ? `${u.name} — policy de ${n.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of r)
    he(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: L.aggregate.w,
      h: L.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: L.aggregate.fill,
      stroke: L.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${u.name} — agregado de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const u of [...d, ...c])
    he(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: L.event.w,
      h: L.event.h,
      kind: u.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: L.event.fill,
      stroke: L.event.stroke,
      badge: u.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${u.name} — evento de ${n.get(u.moduleId) ?? u.moduleId}`
    }), m.set(We(u.name), u.id);
  const p = (u) => {
    if (!u || !u.trim()) return null;
    const w = m.get(We(u));
    if (w) return w;
    const g = `evname:${We(u)}`;
    return he(i, {
      id: g,
      label: u,
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
      tooltip: `${u} — referenciado por nombre, sin evento declarado en el catálogo`
    }), g;
  }, f = (u) => {
    const w = h.find(($) => $.id === u.id) ?? h.find(($) => u.name && We($.name) === We(u.name)), g = (w == null ? void 0 : w.id) ?? (u.id || (u.name ? `rm:${We(u.name)}` : null));
    return g ? (he(i, {
      id: g,
      label: (w == null ? void 0 : w.name) ?? u.name ?? g,
      x: 0,
      y: 0,
      w: L.readModel.w,
      h: L.readModel.h,
      kind: w ? "read-model" : "derived-read-model",
      fill: L.readModel.fill,
      stroke: L.readModel.stroke,
      dashed: !w,
      badge: "READ MODEL"
    }), g) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const w = (e.actors ?? []).find((g) => g.id === u.actorId);
    w && (he(i, {
      id: w.id,
      label: w.name,
      x: 0,
      y: 0,
      w: L.actor.w,
      h: L.actor.h,
      kind: "actor",
      symbol: "person",
      fill: L.actor.fill,
      stroke: L.actor.stroke,
      badge: "ACTOR"
    }), Z(i, {
      id: `es-actor:${w.id}->${u.targetId}`,
      sourceId: w.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const w = (e.agentUses ?? []).filter((E) => E.agentId === u.id), g = (e.agentExternalUses ?? []).filter((E) => E.agentId === u.id), $ = (e.agentRags ?? []).filter((E) => E.agentId === u.id), S = (e.agentMcpUses ?? []).filter((E) => E.agentId === u.id), A = (e.agentGatewayUses ?? []).some((E) => E.agentId === u.id) || (e.agentApiOpUses ?? []).some((E) => E.agentId === u.id) || (e.agentQueryUses ?? []).some((E) => E.agentId === u.id) || (e.agentDelegations ?? []).some((E) => E.agentId === u.id) || (e.agentTriggers ?? []).some((E) => E.agentId === u.id);
    if (!(!w.length && !g.length && !$.length && !S.length && !A)) {
      he(i, {
        id: u.id,
        label: u.name,
        x: 0,
        y: 0,
        w: L.actor.w,
        h: L.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${u.name} — agente de IA (consume por MCP)`
      });
      for (const E of w)
        o.has(E.useCaseId) && Z(i, {
          id: `es-agent:${u.id}->${E.useCaseId}`,
          sourceId: u.id,
          targetId: E.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const E of g) {
        const O = e.externalSystems.find(
          (j) => (j.useCases ?? []).some((X) => X.id === E.externalUseCaseId)
        );
        if (!O) continue;
        const G = (W = (O.useCases ?? []).find((j) => j.id === E.externalUseCaseId)) == null ? void 0 : W.name;
        he(i, {
          id: O.id,
          label: O.name,
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
        }), Z(i, {
          id: `es-agentx:${u.id}->${E.externalUseCaseId}`,
          sourceId: u.id,
          targetId: O.id,
          kind: "es-agent-external",
          label: G,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: G ? `Llama a ${G} del sistema externo` : void 0
        });
      }
      for (const E of S) {
        const O = e.externalSystems.find(
          (j) => (j.mcpServers ?? []).some((X) => X.id === E.mcpServerId)
        );
        if (!O) continue;
        const G = (R = (O.mcpServers ?? []).find((j) => j.id === E.mcpServerId)) == null ? void 0 : R.name;
        he(i, {
          id: O.id,
          label: O.name,
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
        }), Z(i, {
          id: `es-agentmcp:${u.id}->${E.mcpServerId}`,
          sourceId: u.id,
          targetId: O.id,
          kind: "es-agent-mcp",
          label: G,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: G ? `Consume las herramientas del servidor MCP ${G}` : void 0
        });
      }
      for (const E of $) {
        const O = (e.rags ?? []).find((G) => G.id === E.ragId);
        if (O) {
          he(i, {
            id: O.id,
            label: O.name,
            x: 0,
            y: 0,
            w: L.readModel.w,
            h: L.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${O.name} — base de conocimiento (retrieval)`
          }), Z(i, {
            id: `es-agrag:${u.id}->${O.id}`,
            sourceId: u.id,
            targetId: O.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const G of O.sourceReadModelIds ?? []) {
            const j = f({ id: G });
            j && Z(i, {
              id: `es-ragsrc:${O.id}->${j}`,
              sourceId: j,
              targetId: O.id,
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
  const y = (u) => {
    const w = e.externalSystems.find((g) => g.id === u);
    return w ? (he(i, {
      id: w.id,
      label: w.name,
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
    }), w.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const w = y(u.externalSystemId);
    !w || !o.has(u.useCaseId) || Z(i, {
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
      (S) => (S.useCases ?? []).some((A) => A.id === u.targetId)
    ), g = w ? y(w.id) : null;
    if (!g) continue;
    const $ = (D = ((w == null ? void 0 : w.useCases) ?? []).find((S) => S.id === u.targetId)) == null ? void 0 : D.name;
    Z(i, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: g,
      kind: "es-command-external",
      label: $,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: $ ? `Llama a ${$} del sistema externo` : void 0
    });
  }
  for (const u of e.aggregateCalls ?? [])
    !o.has(u.sourceId) || !i.nodes.has(u.targetId) || Z(i, {
      id: `es-write:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: u.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const _ = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const u of _)
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (o.has(u.sourceId) || r.some((g) => g.id === u.sourceId) || a.has(u.sourceId))) || Z(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const C = (u, w, g, $, S, A) => (he(i, {
    id: u,
    label: w,
    x: 0,
    y: 0,
    w: L.policy.w,
    h: L.policy.h,
    kind: g,
    symbol: "flow",
    fill: L.policy.fill,
    stroke: L.policy.stroke,
    badge: $,
    tooltip: S
  }), u), x = (u, w) => {
    const g = p(u);
    g && Z(i, {
      id: `es-trigger:${g}->${w}`,
      sourceId: g,
      targetId: w,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, U = (u, w) => {
    !w || !o.has(w) || Z(i, {
      id: `es-invoke:${u}->${w}`,
      sourceId: u,
      targetId: w,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const w = C(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    x(u.eventName, w);
    for (const g of u.actions ?? []) {
      if (g.type === "CallUseCase" && U(w, g.useCaseId), g.type === "StartSaga" && g.sagaId) {
        const $ = `saga:${g.sagaId}`;
        C($, g.sagaId, "saga", "SAGA"), Z(i, {
          id: `es-saga:${w}->${$}`,
          sourceId: w,
          targetId: $,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (g.type === "UpdateProjection" && g.projectionId) {
        const $ = (e.projections ?? []).find((S) => S.id === g.projectionId);
        $ && Z(i, {
          id: `es-feeds:${w}->${$.id}`,
          sourceId: w,
          targetId: $.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const w = C(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const S of u.handledEventIds) {
      const A = i.nodes.has(S) ? S : null;
      A && Z(i, {
        id: `es-trigger:${A}->${w}`,
        sourceId: A,
        targetId: w,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && i.nodes.has(u.sourceAggregateId) && Z(i, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: w,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const g = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (g) {
      const S = e.externalSystems.find(
        (E) => (E.useCases ?? []).some((O) => O.id === g) || (E.tables ?? []).some((O) => O.id === g)
      ), A = S ? y(S.id) : null;
      if (A) {
        const E = ((ee = (S.useCases ?? []).find((O) => O.id === g)) == null ? void 0 : ee.name) ?? ((ne = (S.tables ?? []).find((O) => O.id === g)) == null ? void 0 : ne.name);
        Z(i, {
          id: `es-poll:${u.id}`,
          sourceId: A,
          targetId: w,
          kind: "es-projects-poll",
          label: E,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: E ? `polling de ${E}` : "polling"
        });
      }
    }
    const $ = f({ id: u.readModelId, name: u.readModelName });
    $ && Z(i, {
      id: `es-projects:${w}->${$}`,
      sourceId: w,
      targetId: $,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const g = p(u.triggerEvent), $ = f({ name: u.readModelName ?? `${u.triggerEvent}View` });
      g && $ && Z(i, {
        id: `es-mat:${u.id}`,
        sourceId: g,
        targetId: $,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const w = C(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (x(u.triggerEvent, w), U(w, u.targetUseCaseId), !u.targetUseCaseId) {
      const g = y(u.targetId), $ = g ?? `tgt:${u.targetId}`;
      !g && n.has(u.targetId) && he(i, {
        id: $,
        label: n.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: L.module.w,
        h: L.module.h,
        kind: "module",
        symbol: "component",
        fill: L.module.fill,
        stroke: L.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has($) && Z(i, {
        id: `es-deliver:${u.id}`,
        sourceId: w,
        targetId: $,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const w = C(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    x(u.triggerEvent, w);
    for (const $ of u.steps) U(w, $.useCaseId);
    const g = p(u.onCompletionEventName);
    g && Z(i, {
      id: `es-done:${u.id}`,
      sourceId: w,
      targetId: g,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const w = C(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    x(u.triggerEvent, w);
    for (const $ of u.steps ?? []) {
      U(w, $.targetUseCaseId);
      for (const S of [$.emittedEventName, $.completionEventName]) {
        const A = p(S);
        A && Z(i, {
          id: `es-wfemit:${u.id}:${A}`,
          sourceId: w,
          targetId: A,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const g = p(u.onCompletionEventName);
    g && Z(i, {
      id: `es-done:${u.id}`,
      sourceId: w,
      targetId: g,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const z = [...i.nodes.values()], b = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    b.has(u.targetId) || b.set(u.targetId, []), b.get(u.targetId).push(u.sourceId);
  const I = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Set(), k = (u) => {
    const w = I.get(u);
    if (w !== void 0) return w;
    if (v.has(u)) return 0;
    v.add(u);
    const g = b.get(u) ?? [], $ = g.length ? 1 + Math.max(...g.map(k)) : 0;
    return v.delete(u), I.set(u, $), $;
  }, M = /* @__PURE__ */ new Map();
  for (const u of z) {
    const w = t[u.id];
    if (w) {
      u.x = w.x, u.y = w.y;
      continue;
    }
    const g = k(u.id), $ = M.get(g) ?? 0;
    M.set(g, $ + 1), u.x = 140 + g * 260, u.y = 110 + $ * 110;
  }
  return { nodes: z, edges: i.edges };
}
const Dd = 190, Ld = 56, un = 180, zd = 56, qd = 150, Vd = 44, hn = 250, pn = 100;
function Kd(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), r;
  };
  return n(e);
}
function Hd(e, t) {
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
function Fd(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var d;
    return (d = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : d.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var C;
    const d = new Map(a.steps.map((x) => [x.id, x])), c = new Map(a.steps.map((x) => [x.id, Kd(x, d)])), h = /* @__PURE__ */ new Map();
    for (const x of a.steps) {
      const U = c.get(x.id) ?? 0;
      h.set(U, (h.get(U) ?? 0) + 1);
    }
    const m = Math.max(1, ...h.values()), p = Hd(e, a);
    if (p && !s.has(p.id)) {
      s.add(p.id);
      const x = t[p.id] ?? { x: 140, y: r };
      i.push({
        id: p.id,
        label: p.label,
        x: x.x,
        y: x.y,
        w: qd,
        h: Vd,
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
      w: Dd,
      h: Ld,
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
    const y = /* @__PURE__ */ new Map();
    let _ = 0;
    for (const x of a.steps) {
      const U = c.get(x.id) ?? 0;
      _ = Math.max(_, U);
      const z = y.get(U) ?? 0;
      y.set(U, z + 1);
      const b = t[x.id] ?? {
        x: f.x + (U + 1) * hn,
        y: r + (z - (h.get(U) - 1) / 2) * pn
      }, I = o(x.targetUseCaseId);
      i.push({
        id: x.id,
        label: x.name,
        x: b.x,
        y: b.y,
        w: un,
        h: zd,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: I ? `→ ${I}` : "∅ sin use case",
        tooltip: `${x.name}${x.emittedEventName ? ` · emite ${x.emittedEventName}` : ""}${I ? ` · lanza ${I}` : ""}${x.completionEventName ? ` · espera ${x.completionEventName}` : ""}`
      });
      const v = (x.dependsOnStepIds ?? []).filter((k) => d.has(k));
      v.length === 0 && n.push({
        id: `wfs:${a.id}:${x.id}`,
        sourceId: a.id,
        targetId: x.id,
        kind: "workflow-start",
        label: x.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of v)
        n.push({
          id: `wfdep:${k}->${x.id}`,
          sourceId: k,
          targetId: x.id,
          kind: "workflow-dependency",
          label: x.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${x.name} espera a ${((C = d.get(k)) == null ? void 0 : C.name) ?? k}`
        });
    }
    if (a.onCompletionEventName) {
      const x = `done:${a.id}`, U = t[x] ?? { x: f.x + (_ + 2) * hn, y: r };
      i.push({
        id: x,
        label: a.onCompletionEventName,
        x: U.x,
        y: U.y,
        w: un,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const z = new Set(a.steps.flatMap((I) => I.dependsOnStepIds ?? [])), b = a.steps.filter((I) => !z.has(I.id));
      for (const I of b.length ? b : [])
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
    r += Math.max(2, m + 1) * pn + 60;
  }), { nodes: i, edges: n };
}
async function Wd(e, t) {
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
var Gd = Object.defineProperty, Bd = Object.getOwnPropertyDescriptor, K = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Bd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Gd(t, i, s), s;
};
const yi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Yd = Object.keys(yi), jd = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], Xd = ["CORE", "SUPPORTING", "GENERIC"];
function at(e, t, i) {
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
function Qd(e, t, i = 28) {
  var d;
  const n = new Map(e.nodes.map((c) => [c.id, c])), s = (c) => {
    var m;
    const h = /* @__PURE__ */ new Set();
    for (let p = c; p; p = (m = n.get(p)) == null ? void 0 : m.parentId) h.add(p);
    return h;
  }, o = e.nodes.filter((c) => !c.parentId), r = /* @__PURE__ */ new Map(), a = (c, h, m) => {
    const p = { x: m.x, y: m.y, w: m.w + 2 * i, h: m.h + 2 * i }, f = m.w / 2 + i * 1.5, y = m.h / 2 + i * 1.5, _ = { x: m.x - f, y: m.y - y }, C = { x: m.x + f, y: m.y - y }, x = { x: m.x - f, y: m.y + y }, U = { x: m.x + f, y: m.y + y }, z = [];
    for (const b of [_, C, x, U])
      !at(c, b, p) && !at(b, h, p) && z.push([b]);
    for (const [b, I] of [
      [_, C],
      [C, _],
      [C, U],
      [U, C],
      [U, x],
      [x, U],
      [x, _],
      [_, x]
    ])
      !at(c, b, p) && !at(I, h, p) && z.push([b, I]);
    return z;
  };
  for (const c of e.edges) {
    if ((d = t[c.id]) != null && d.length) continue;
    const h = n.get(c.sourceId), m = n.get(c.targetId);
    if (!h || !m) continue;
    const p = /* @__PURE__ */ new Set([...s(h.id), ...s(m.id)]), f = [
      { x: h.x, y: h.y },
      { x: m.x, y: m.y }
    ];
    for (let y = 0; y < 12; y++) {
      let _ = !1;
      e: for (let C = 0; C < f.length - 1; C++)
        for (const x of o) {
          if (p.has(x.id)) continue;
          const U = { x: x.x, y: x.y, w: x.w + 2 * i, h: x.h + 2 * i };
          if (!at(f[C], f[C + 1], U)) continue;
          const z = a(f[C], f[C + 1], x);
          if (!z.length) continue;
          const b = (v) => o.some(
            (k) => k !== x && !p.has(k.id) && Math.abs(v.x - k.x) < k.w / 2 + i / 2 && Math.abs(v.y - k.y) < k.h / 2 + i / 2
          ), I = (v) => {
            let k = 0;
            const M = [f[C], ...v, f[C + 1]];
            for (let W = 0; W < M.length - 1; W++)
              k += Math.hypot(M[W + 1].x - M[W].x, M[W + 1].y - M[W].y);
            return k + (v.some(b) ? 1e4 : 0);
          };
          z.sort((v, k) => I(v) - I(k)), f.splice(C + 1, 0, ...z[0]), _ = !0;
          break e;
        }
      if (!_) break;
    }
    f.length > 2 && r.set(
      c.id,
      f.slice(1, -1).map((y) => ({ x: Math.round(y.x), y: Math.round(y.y) }))
    );
  }
  return r;
}
const H = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Zd(e, t) {
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
function Jd(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let V = class extends Ve {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newExternalId = "", this._newApiId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null;
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
    return Et(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Et(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = Et(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    }), e === "contexts" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "external-ai-agent" && this._newContextMapKind !== "mcp-gateway" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module");
    const s = Et(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((h) => !h.parentId), a = Ii(r), d = [...a.keys()].map((h) => ({
      kind: "move-node",
      view: "context-map",
      id: h,
      pos: o.nodes[h] ?? null
    })), c = { ...o.nodes };
    for (const [h, m] of a) {
      const p = r.find((y) => y.id === h), f = o.nodes[h] ?? { x: p.x, y: p.y };
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
    const i = Qd(e, t);
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
      case "add-api-implementation":
        return [{ kind: "remove-api-implementation", apiId: e.apiId, moduleId: e.moduleId }];
      case "remove-api-implementation":
        return [{ kind: "add-api-implementation", apiId: e.apiId, moduleId: e.moduleId }];
      case "add-proxy-operation-route":
        return [{
          kind: "remove-proxy-operation-route",
          proxyId: e.proxyId,
          operationId: e.operationId,
          targetSiteId: e.targetSiteId
        }];
      case "remove-proxy-operation-route":
        return [{
          kind: "add-proxy-operation-route",
          proxyId: e.proxyId,
          operationId: e.operationId,
          targetSiteId: e.targetSiteId
        }];
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((y) => y.id === t) ?? (this.model.proxyApis ?? []).find((y) => y.id === t);
    if (!o || i && !this.model.externalSystems.some((y) => y.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const d = this._view, c = this.viewLayout(d), h = this.sceneFor(d), m = a ? h.nodes.find((y) => y.id === a) : void 0, p = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, f = [
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((y) => y.id === t), r = this.model.externalSystems.find((y) => y.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (y) => y.targetApiId === t && y.publishedByExternalSystemId === i
    )) return;
    const d = `proxy-${H(o.name)}-${H(r.name)}`;
    if ((this.model.proxyApis ?? []).some((y) => y.id === d)) return;
    const c = this._view, h = this.viewLayout(c), p = this.sceneFor(c).nodes.find((y) => y.id === i);
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
    const i = Ri(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
      const I = this.owningWorkflowOf(t), v = this.owningWorkflowOf(i);
      if (!I || I !== v || t === i) return;
      const k = I.steps.find((M) => M.id === i);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: I.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = /^apiop:(.+)@(.+)$/.exec(t);
    if (o) {
      const [, I, v] = o, k = (this.model.proxyApis ?? []).find((R) => R.id === v);
      if (!(k != null && k.targetApiId)) return;
      let M = null;
      if (i === k.targetApiId)
        M = k.targetApiId;
      else {
        const R = /^apiimpl:(.+)@(.+)$/.exec(i);
        R && R[1] === k.targetApiId ? M = R[2] : this.model.modules.some((D) => D.id === i) && (this.model.apiImplementations ?? []).some(
          (D) => D.apiId === k.targetApiId && D.moduleId === i
        ) && (M = i);
      }
      if (!M) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (R) => R.proxyId === k.id && R.operationId === I && R.targetSiteId === M
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: I,
        targetSiteId: M
      });
      return;
    }
    const r = new Set((this.model.aiAgents ?? []).map((I) => I.id));
    if (r.has(t)) {
      if (new Set(
        this.model.modules.flatMap((R) => (R.useCases ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (D) => D.agentId === t && D.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((R) => (R.useCases ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (D) => D.agentId === t && D.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((R) => (R.mcpServers ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentMcpUses ?? []).some(
          (D) => D.agentId === t && D.mcpServerId === i
        ) || this.command({ kind: "add-agent-mcp", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((R) => R.id === i)) {
        (this.model.agentGatewayUses ?? []).some(
          (D) => D.agentId === t && D.gatewayId === i
        ) || this.command({ kind: "add-agent-gateway", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((R) => R.operations.map((D) => D.id))
      ).has(i)) {
        (this.model.agentApiOpUses ?? []).some(
          (D) => D.agentId === t && D.apiOperationId === i
        ) || this.command({ kind: "add-agent-api-operation", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((R) => (R.queryServices ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentQueryUses ?? []).some(
          (D) => D.agentId === t && D.queryServiceId === i
        ) || this.command({ kind: "add-agent-query", sourceId: t, targetId: i });
        return;
      }
      if (r.has(i) && i !== t) {
        (this.model.agentDelegations ?? []).some(
          (D) => D.agentId === t && D.delegateAgentId === i
        ) || this.command({ kind: "add-agent-delegate", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((R) => R.id === i) && ((this.model.agentRags ?? []).some(
        (D) => D.agentId === t && D.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((I) => I.id === t)) {
      const I = (this.model.mcpGateways ?? []).find((M) => M.id === t), v = this.model.externalSystems.some((M) => (M.mcpServers ?? []).some((W) => W.id === i)) || (this.model.apis ?? []).some((M) => M.id === i) || (this.model.apis ?? []).some((M) => M.operations.some((W) => W.id === i)) || this.model.modules.some((M) => (M.useCases ?? []).some((W) => W.id === i)) || (this.model.rags ?? []).some((M) => M.id === i), k = [
        ...I.mcpServerIds ?? [],
        ...I.apiIds ?? [],
        ...I.apiOperationIds ?? [],
        ...I.useCaseIds ?? [],
        ...I.ragIds ?? []
      ].includes(i);
      v && !k && this.command({ kind: "add-gateway-exposure", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((I) => I.id === i)) return;
    const a = (this.model.rags ?? []).find((I) => I.id === t);
    if (a) {
      new Set(
        this.model.modules.flatMap((v) => (v.readModels ?? []).map((k) => k.id))
      ).has(i) && !(a.sourceReadModelIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some((I) => I.id === i)) return;
    if ((this.model.proxyApis ?? []).some((I) => I.id === t)) {
      const I = (this.model.proxyApis ?? []).find((v) => v.id === t);
      if ((this.model.apis ?? []).some((v) => v.id === i)) {
        I.targetApiId !== i && this.command({ kind: "set-proxy-target", id: t, targetId: i });
        return;
      }
      if (this.model.modules.some((v) => v.id === i)) {
        if (!I.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (k) => k.apiId === I.targetApiId && k.moduleId === i
        ) || this.command({ kind: "add-api-implementation", apiId: I.targetApiId, moduleId: i });
        return;
      }
      this.model.externalSystems.some((v) => v.id === i) && I.publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if ((this.model.apis ?? []).some((I) => I.id === t)) {
      if (this.model.externalSystems.some((I) => I.id === i)) {
        (this.model.apis ?? []).find((v) => v.id === t).publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
        return;
      }
      this.model.modules.some((I) => I.id === i) && ((this.model.apiImplementations ?? []).some(
        (v) => v.apiId === t && v.moduleId === i
      ) || this.command({ kind: "add-api-implementation", apiId: t, moduleId: i }));
      return;
    }
    const d = new Set((this.model.actors ?? []).map((I) => I.id));
    if (r.has(i)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((k) => k.id)),
        ...this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((k) => k.id))
      ])).has(t)) {
        (this.model.agentTriggers ?? []).some(
          (k) => k.eventId === t && k.agentId === i
        ) || this.command({ kind: "add-agent-trigger", sourceId: t, targetId: i });
        return;
      }
      if (!d.has(t)) return;
    }
    if (d.has(t)) {
      const I = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((M) => M.id))
      ), v = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map((M) => M.id))
      );
      if (I.has(i) || v.has(i)) {
        (this.model.actorUses ?? []).some(
          (M) => M.actorId === t && M.targetId === i
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aggregates ?? []).some((k) => k.id === i)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: i });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === i)) {
        (this.model.actorExternalDependencies ?? []).some(
          (M) => M.actorId === t && M.externalSystemId === i
        ) || this.command({ kind: "add-actor-external", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aiAgents ?? []).some((k) => k.id === i)) {
        (this.model.actorAgentUses ?? []).some(
          (M) => M.actorId === t && M.agentId === i
        ) || this.command({ kind: "add-actor-agent", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    const c = this.owningApiOf(t);
    if (c) {
      if (new Set(
        this.model.modules.flatMap((v) => (v.useCases ?? []).map((k) => k.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: c.id,
          id: t,
          targetUseCaseId: i
        });
        return;
      }
      if (this.model.modules.some((v) => v.id === i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: c.id,
          id: t,
          moduleId: i
        });
        return;
      }
      return;
    }
    const h = this.model.externalSystems.flatMap((I) => I.useCases ?? []).find((I) => I.id === t), m = this.model.externalSystems.flatMap((I) => I.tables ?? []).find((I) => I.id === t);
    if (h || m) {
      const I = (h ?? m).name, v = h ? { externalUseCaseId: t } : { externalTableId: t }, k = (R) => h ? R.sourceExternalUseCaseId === t : R.sourceExternalTableId === t, M = this.model.modules.flatMap((R) => R.readModels ?? []).find((R) => R.id === i);
      if (M) {
        (this.model.projections ?? []).some(
          (D) => k(D) && D.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(I)}-${H(M.name)}`,
          name: `${M.name}Projection`,
          ...v,
          targetId: i
        });
        return;
      }
      const W = this.model.modules.find((R) => R.id === i);
      if (W) {
        (this.model.projections ?? []).some(
          (D) => k(D) && D.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(I)}-${H(W.name)}`,
          name: `${I}ViewProjection`,
          ...v,
          moduleId: i,
          readModelName: `${I}View`
        });
        return;
      }
      return;
    }
    const p = (this.model.aggregates ?? []).find((I) => I.id === t);
    if (p) {
      const I = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === i);
      if (I) {
        (this.model.projections ?? []).some(
          (M) => M.sourceAggregateId === t && M.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(p.name)}-${H(I.name)}`,
          name: `${I.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const v = this.model.modules.find((k) => k.id === i);
      if (v) {
        (this.model.projections ?? []).some(
          (M) => M.sourceAggregateId === t && M.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${H(p.name)}-${H(v.name)}`,
          name: `${p.name}ViewProjection`,
          aggregateId: t,
          moduleId: i,
          readModelName: `${p.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((I) => (I.domainEvents ?? []).map((v) => v.id))
    ), y = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((I) => I.id),
      ...this.model.modules.flatMap((I) => (I.domainServices ?? []).map((v) => v.id))
    ]), _ = new Set(
      this.model.modules.flatMap((I) => (I.applicationEvents ?? []).map((v) => v.id))
    ), C = new Set(this.model.modules.flatMap((I) => (I.useCases ?? []).map((v) => v.id))), x = new Set(
      this.model.modules.flatMap((I) => (I.queryServices ?? []).map((v) => v.id))
    );
    if (C.has(t) && x.has(i)) {
      (this.model.queryCalls ?? []).some(
        (v) => v.sourceId === t && v.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const U = new Set(
      this.model.externalSystems.flatMap((I) => (I.useCases ?? []).map((v) => v.id))
    );
    if (C.has(t) && U.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (v) => v.sourceId === t && v.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (C.has(t) && C.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        (v) => v.sourceId === t && v.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (y.has(t) && f.has(i) || C.has(t) && _.has(i)) {
      (this.model.emissions ?? []).some(
        (v) => v.sourceId === t && v.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (f.has(t) || _.has(t)) {
      const I = _.has(t), v = this.model.modules.flatMap((g) => (I ? g.applicationEvents : g.domainEvents) ?? []).find((g) => g.id === t), k = this.model.modules.flatMap((g) => (g.useCases ?? []).map(($) => ({ u: $, module: g }))).find(({ u: g }) => g.id === i), M = this.model.modules.flatMap((g) => (g.readModels ?? []).map(($) => ({ rm: $, module: g }))).find(({ rm: g }) => g.id === i), W = this.model.modules.find((g) => g.id === i) ?? (M == null ? void 0 : M.module) ?? (k == null ? void 0 : k.module);
      if (!v || !W) return;
      const R = new Set((this.model.aggregates ?? []).map((g) => g.id)), D = new Set(
        this.model.modules.flatMap((g) => (g.domainServices ?? []).map(($) => $.id))
      ), ee = (this.model.emissions ?? []).find(
        (g) => g.domainEventId === t && (I ? C.has(g.sourceId) : R.has(g.sourceId) || D.has(g.sourceId))
      );
      if (!ee) {
        this.emit("modux-notice", {
          message: I ? `Declara primero qué caso de uso publica ${v.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${v.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const ne = !I && R.has(ee.sourceId);
      if (k) {
        if (this.model.flows.some(
          ($) => $.archetype === "TRIGGERS" && $.triggerEvent === v.name && $.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${H(v.name)}-${H(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: ne ? ee.sourceId : "",
          triggerDomainServiceId: !I && !ne ? ee.sourceId : void 0,
          triggerUseCaseId: I ? ee.sourceId : void 0,
          triggerEvent: v.name,
          targetId: W.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const u = (M == null ? void 0 : M.rm.name) ?? `${v.name}View`;
      if (this.model.flows.some(
        (g) => g.archetype === "MATERIALIZES" && g.triggerEvent === v.name && g.targetId === W.id && g.readModelName === u
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${H(v.name)}-${H(u)}`,
        name: u,
        archetype: "MATERIALIZES",
        triggerAggregateId: ne ? ee.sourceId : "",
        triggerDomainServiceId: !I && !ne ? ee.sourceId : void 0,
        triggerUseCaseId: I ? ee.sourceId : void 0,
        triggerEvent: v.name,
        targetId: W.id,
        readModelName: u
      });
      return;
    }
    const z = /* @__PURE__ */ new Set([
      ...y,
      ...C,
      ...x,
      ...this.model.modules.flatMap((I) => (I.readModels ?? []).map((v) => v.id))
    ]);
    if (z.has(t) || z.has(i) || f.has(i) || _.has(i))
      return;
    const b = new Set(this.model.externalSystems.map((I) => I.id));
    if (b.has(t)) {
      if (new Set(
        this.model.modules.flatMap((v) => (v.useCases ?? []).map((k) => k.id))
      ).has(i)) {
        (this.model.externalCalls ?? []).some(
          (k) => k.externalSystemId === t && k.useCaseId === i
        ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i });
        return;
      }
      if (b.has(i) && i !== t) {
        this._extDepPicker = { sourceId: t, targetId: i, x: n ?? 0, y: s ?? 0 };
        return;
      }
      if ((this.model.apis ?? []).some((v) => v.id === i) || (this.model.proxyApis ?? []).some((v) => v.id === i)) {
        (this.model.externalSystemDependencies ?? []).some(
          (k) => k.sourceId === t && k.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    b.has(i) || d.has(i);
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
    if (this._view === "context-map" && e === "edge" && i === "op-route") {
      const n = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(t);
      if (!n) return;
      const [, s, o, r] = n, a = /^apiimpl:.+@(.+)$/.exec(r), d = a ? a[1] : r;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: o, operationId: s, targetSiteId: d });
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
    if (e === "node" && i === "api-impl") {
      const n = /^apiimpl:(.+)@(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-api-implementation", apiId: n[1], moduleId: n[2] });
      return;
    }
    if (e === "node" && i === "proxy-api") {
      this._selectedId = null, this.command({ kind: "remove-proxy-api", id: t });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "workflow") {
      this._selectedId = null, this.command({ kind: "remove-workflow", id: t });
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
      ...(this.model.workflows ?? []).map((i) => ({ id: i.id, name: i.name, kind: "workflow" })),
      ...(this.model.actors ?? []).map((i) => ({ id: i.id, name: i.name, kind: "actor" })),
      ...(this.model.aiAgents ?? []).map((i) => ({ id: i.id, name: i.name, kind: "agente" })),
      ...(this.model.mcpGateways ?? []).map((i) => ({ id: i.id, name: i.name, kind: "gateway" })),
      ...(this.model.rags ?? []).map((i) => ({ id: i.id, name: i.name, kind: "rag" })),
      ...(this.model.apis ?? []).map((i) => ({ id: i.id, name: i.name, kind: "api" }))
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
  /** Check/uncheck in the catalog tree: view membership only — never touches the element. */
  toggleViewMember(e, t) {
    this._activeViewId && this.command(
      t ? { kind: "add-view-member", id: this._activeViewId, targetId: e } : { kind: "remove-view-member", id: this._activeViewId, targetId: e }
    );
  }
  /**
   * The catalog as a tree with membership checkboxes: what belongs to the active
   * view. Aggregates nest under their context; one greyed "(por su contexto)" row
   * means the element rides in implicitly because its container is a member.
   */
  renderViewTree() {
    const e = (this.model.views ?? []).find((s) => s.id === this._activeViewId);
    if (!e) return "";
    const t = new Set(e.memberIds), i = (s, o, r = {}) => P`
      <label
        class="${r.child ? "child" : ""} ${r.implicit && !t.has(s) ? "implicit" : ""}"
        title=${r.implicit && !t.has(s) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(s)}
          @change=${(a) => this.toggleViewMember(s, a.target.checked)}
        />
        ${o}
      </label>
    `, n = (s, o) => o.length ? P`<h4>${s}</h4>${o}` : "";
    return P`
      <aside class="view-tree" @pointerdown=${(s) => s.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.modules.flatMap((s) => [
        i(s.id, s.name),
        ...(this.model.aggregates ?? []).filter((o) => o.moduleId === s.id).map((o) => i(o.id, o.name, { child: !0, implicit: t.has(s.id) }))
      ])
    )}
        ${n(
      "Sistemas externos",
      this.model.externalSystems.map((s) => i(s.id, s.name))
    )}
        ${n("APIs", (this.model.apis ?? []).map((s) => i(s.id, s.name)))}
        ${n("Actores", (this.model.actors ?? []).map((s) => i(s.id, s.name)))}
        ${n("Agentes IA", (this.model.aiAgents ?? []).map((s) => i(s.id, s.name)))}
        ${n("Gateways MCP", (this.model.mcpGateways ?? []).map((s) => i(s.id, s.name)))}
        ${n("RAGs", (this.model.rags ?? []).map((s) => i(s.id, s.name)))}
        ${n("Flows", this.model.flows.map((s) => i(s.id, s.name)))}
        ${n("Procesos", (this.model.processes ?? []).map((s) => i(s.id, s.name)))}
        ${n("Workflows", (this.model.workflows ?? []).map((s) => i(s.id, s.name)))}
      </aside>
    `;
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
          case "actor":
          case "ai-agent":
          case "rag":
          case "mcp-gateway":
          case "api":
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
      workflows: (this.model.workflows ?? []).filter((d) => t.has(d.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((d) => t.has(d.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((d) => t.has(d.id)),
      rags: (this.model.rags ?? []).filter((d) => t.has(d.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((d) => t.has(d.id)),
      apis: (this.model.apis ?? []).filter(
        (d) => t.has(d.id) || (d.publishedByExternalSystemId ? o.has(d.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (d) => t.has(d.id) || (d.publishedByExternalSystemId ? o.has(d.publishedByExternalSystemId) : !1)
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
    const t = e.detail.kind === "process-step" ? Jd(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Zd(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, n, s, o, r, a, d, c, h, m, p, f, y, _, C, x, U, z, b, I, v, k, M, W, R, D, ee, ne, u, w, g, $;
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
          const S = (t = (this.model.apis ?? []).find((E) => E.id === this._selectedId)) == null ? void 0 : t.id, A = this._newApiId || S || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id);
          if (!A) return;
          this.command({
            kind: "add-api-operation",
            apiId: A,
            id: `apiop-${A.replace(/^api-/, "")}-${H(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const S = (s = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : s.id, A = this._newModuleId || S || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!A) return;
          this.command({ kind: "add-domain-event", id: `ev-${H(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const S = (r = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : r.id, A = this._newModuleId || S || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!A) return;
          this.command({ kind: "add-application-event", id: `aev-${H(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const S = (d = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : d.id, A = this._newModuleId || S || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!A) return;
          this.command({ kind: "add-domain-service", id: `ds-${H(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const S = (h = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : h.id, A = this._newModuleId || S || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!A) return;
          this.command({ kind: "add-query-service", id: `qs-${H(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const S = (p = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : p.id, A = this._newModuleId || S || ((f = this.model.modules[0]) == null ? void 0 : f.id);
          if (!A) return;
          this.command({ kind: "add-use-case", id: `uc-${H(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const S = (y = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : y.id, A = this._newModuleId || S || ((_ = this.model.modules[0]) == null ? void 0 : _.id);
          if (!A) return;
          this.command({ kind: "add-use-case", id: `uc-${H(e)}`, name: e, moduleId: A, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const S = (C = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : C.id, A = this._newExternalId || S || ((x = this.model.externalSystems[0]) == null ? void 0 : x.id);
          if (!A) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${H(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const S = (U = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : U.id, A = this._newExternalId || S || ((z = this.model.externalSystems[0]) == null ? void 0 : z.id);
          if (!A) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${H(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "mcp-server") {
          const S = (b = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : b.id, A = this._newExternalId || S || ((I = this.model.externalSystems[0]) == null ? void 0 : I.id);
          if (!A) return;
          this.command({
            kind: "add-mcp-server",
            id: `mcpsrv-${H(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const S = (v = (this.model.aggregates ?? []).find((E) => E.id === this._selectedId)) == null ? void 0 : v.id, A = this._newAggregateId || S || ((M = (k = this.model.aggregates) == null ? void 0 : k[0]) == null ? void 0 : M.id);
          if (!A) return;
          this.command({ kind: "add-read-model", id: `rm-${H(e)}`, name: e, aggregateId: A });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${H(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const S = this._newModuleId || ((W = this.model.modules[0]) == null ? void 0 : W.id);
        if (!S) return;
        this.command({ kind: "add-aggregate", id: `agg-${H(e)}`, name: e, moduleId: S });
      } else if (this._view === "flows") {
        const S = this._newTriggerAggId || ((D = (R = this.model.aggregates) == null ? void 0 : R[0]) == null ? void 0 : D.id), A = this._newTargetId || ((ee = this.model.modules[0]) == null ? void 0 : ee.id), E = this._newTriggerEvent.trim();
        if (!S || !A || !E) return;
        this.command({
          kind: "add-flow",
          id: `flow-${H(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: S,
          triggerEvent: E,
          targetId: A
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const S = this._newModuleId || ((ne = this.model.modules[0]) == null ? void 0 : ne.id);
        if (!S) return;
        this.command({
          kind: "add-process",
          id: `proc-${H(e)}`,
          name: e,
          moduleId: S,
          triggerAggregateId: this._newTriggerAggId || ((w = (u = this.model.aggregates) == null ? void 0 : u[0]) == null ? void 0 : w.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${H(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || (($ = (g = this.model.aggregates) == null ? void 0 : g[0]) == null ? void 0 : $.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? $s(i, t.nodes) : e === "flows" ? Ps(i, t.nodes) : e === "processes" ? Ri(i, t.nodes) : e === "workflows" ? Fd(i, t.nodes) : e === "eventstorming" ? Ud(i, t.nodes) : gs(i, t.nodes, this._detail, t.sizes ?? {});
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
    }, r = await Wd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    return P`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <div class="tabs">
          ${jd.map(
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
        ${this._activeViewId ? P`
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
      (t) => P`<option value="${t.name} (${t.id})">${t.kind}</option>`
    )}
              </datalist>
              <button class="tab" title="Añadir el elemento a la vista" @click=${this.addMemberFromToolbar}>
                ＋ Añadir
              </button>
              <button
                class="tab"
                ?data-active=${this._treeOpen}
                title="Árbol del catálogo: marca qué elementos pertenecen a la vista (sin borrar nada del proyecto)"
                @click=${() => this._treeOpen = !this._treeOpen}
              >
                ☰ Árbol
              </button>
            ` : ""}
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
              ${this._detail !== "contexts" ? P`
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
        ${this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table" || this._newContextMapKind === "mcp-server") ? P`<select
              title="Sistema externo dueño del nuevo elemento"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "api-operation" ? P`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, n;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "read-model" ? P`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
              ${Xd.map(
      (t) => P`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? P`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
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
        var i, n;
        return P`<option
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
              ${this._view === "flows" ? P`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return P`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? P`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP"].map(
      (t) => P`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
      <div class="canvas-wrap">
      ${this._treeOpen && this._activeViewId ? this.renderViewTree() : ""}
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
      </div>
      <div class="hint">
        ${this._view === "context-map" ? P`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
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
      ${this.renderRelationPicker()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
    `;
  }
  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  renderDeletePicker() {
    if (!this._deletePicker) return "";
    const t = (this.model.views ?? []).find((i) => i.id === this._activeViewId);
    return P`
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
    return P`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => P`
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
    return P`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Yd.map(
      (n) => P`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${yi[n].abbr}</span>
              <span class="name">${yi[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
V.styles = _i`
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
    .canvas-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
    }
    .view-tree {
      position: absolute;
      left: 8px;
      top: 8px;
      bottom: 8px;
      width: 264px;
      overflow: auto;
      background: rgba(255, 255, 255, 0.97);
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
      padding: 8px 12px 12px;
      z-index: 15;
    }
    .view-tree h4 {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748b;
      margin: 10px 0 4px;
    }
    .view-tree label {
      display: flex;
      gap: 7px;
      align-items: center;
      padding: 2px 0;
      font-size: 13px;
      color: #1e293b;
      cursor: pointer;
    }
    .view-tree label.child {
      margin-left: 18px;
      color: #475569;
    }
    .view-tree label.implicit {
      color: #94a3b8;
    }
    .view-tree .tree-title {
      font-size: 12px;
      font-weight: 700;
      color: #1e293b;
      padding: 2px 0 4px;
    }
  `;
K([
  Ee({ attribute: !1 })
], V.prototype, "model", 2);
K([
  Ee({ attribute: !1 })
], V.prototype, "layout", 2);
K([
  Ee({ attribute: !1 })
], V.prototype, "diff", 2);
K([
  T()
], V.prototype, "_view", 2);
K([
  T()
], V.prototype, "_detail", 2);
K([
  T()
], V.prototype, "_relationType", 2);
K([
  T()
], V.prototype, "_relationPicker", 2);
K([
  T()
], V.prototype, "_extDepPicker", 2);
K([
  T()
], V.prototype, "_selectedId", 2);
K([
  T()
], V.prototype, "_newName", 2);
K([
  T()
], V.prototype, "_newSubdomain", 2);
K([
  T()
], V.prototype, "_newModuleId", 2);
K([
  T()
], V.prototype, "_newContextMapKind", 2);
K([
  T()
], V.prototype, "_newAggregateId", 2);
K([
  T()
], V.prototype, "_newExternalId", 2);
K([
  T()
], V.prototype, "_newApiId", 2);
K([
  T()
], V.prototype, "_newArchetype", 2);
K([
  T()
], V.prototype, "_newTriggerAggId", 2);
K([
  T()
], V.prototype, "_newTriggerEvent", 2);
K([
  T()
], V.prototype, "_newTargetId", 2);
K([
  T()
], V.prototype, "_undoStack", 2);
K([
  T()
], V.prototype, "_redoStack", 2);
K([
  T()
], V.prototype, "_newStepName", 2);
K([
  T()
], V.prototype, "_newStepType", 2);
K([
  T()
], V.prototype, "_newStepRole", 2);
K([
  T()
], V.prototype, "_newStepDeadline", 2);
K([
  T()
], V.prototype, "_editStepRole", 2);
K([
  T()
], V.prototype, "_editStepDeadline", 2);
K([
  T()
], V.prototype, "_editStepComp", 2);
K([
  T()
], V.prototype, "_newStepUseCase", 2);
K([
  T()
], V.prototype, "_newStepEmits", 2);
K([
  T()
], V.prototype, "_editStepUseCase", 2);
K([
  T()
], V.prototype, "_editStepEmits", 2);
K([
  T()
], V.prototype, "_editStepAwaits", 2);
K([
  T()
], V.prototype, "_multi", 2);
K([
  T()
], V.prototype, "_newViewName", 2);
K([
  T()
], V.prototype, "_activeViewId", 2);
K([
  T()
], V.prototype, "_newRagSourceType", 2);
K([
  T()
], V.prototype, "_newRagSourceUri", 2);
K([
  T()
], V.prototype, "_addMemberKey", 2);
K([
  T()
], V.prototype, "_treeOpen", 2);
K([
  T()
], V.prototype, "_deletePicker", 2);
V = K([
  bi("modux-editor")
], V);
var el = Object.defineProperty, tl = Object.getOwnPropertyDescriptor, fe = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? tl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && el(t, i, s), s;
};
let de = class extends Ve {
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
    this._workspace || this.loadWorkspace();
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
  /**
   * The app-level «Modelo» selector must always match the branch we are on:
   * otherwise the context filter would silently switch back on the next mateu
   * request. Same localStorage entries the mateu picker uses.
   */
  syncModelContext(e, t) {
    try {
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), n = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, n.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(n));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var s, o, r;
    const i = (s = this._workspace) == null ? void 0 : s.current;
    await this.trackWrite(async () => {
      var a;
      try {
        const d = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!d.ok) {
          let c = `El servidor rechazó la operación (${d.status})`;
          try {
            const h = await d.json();
            h != null && h.message && (c = h.message);
          } catch {
          }
          this.showToast(c);
          return;
        }
        this._workspace = await d.json(), await this.reload(), await this.refreshDiff(), (a = this.renderRoot.querySelector("modux-editor")) == null || a.clearHistory();
      } catch (d) {
        this.showToast(String(d));
      }
    });
    const n = (o = this._workspace) == null ? void 0 : o.current;
    if (n && n !== i) {
      const a = ((r = this._workspace.solutions.find((d) => d.branch === n)) == null ? void 0 : r.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${a}`
      ), window.location.reload();
    }
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
    var e, t;
    return this._error ? P`<div class="status error">modux editor: ${this._error}</div>` : this._model ? P`
      ${this._workspace ? P`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : P`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (s) => this._diff.changes.filter((o) => o.kind === s).length, n = this._diff.changes.filter((s) => s.kind === "REMOVED").map((s) => s.name ?? s.id);
      return P`<span
                      class="badge solution"
                      title=${n.length ? `Eliminados respecto al sistema: ${n.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? P`
                    <input
                      placeholder="Nombre de la solución…"
                      .value=${this._newSolutionName}
                      @input=${(i) => this._newSolutionName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && this.createSolution()}
                    />
                    <button @click=${this.createSolution}>Crear</button>
                    <button @click=${() => this._creatingSolution = !1}>Cancelar</button>
                  ` : ""}
              ${!this._workspace.system && !this._creatingSolution ? (() => {
      var n;
      const i = (n = this._workspace.solutions.find(
        (s) => s.branch === this._workspace.current
      )) == null ? void 0 : n.status;
      return P`
                      ${i === "EXPLORING" ? P`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? P`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? P`<button
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
      ${this._mergeFlow ? P`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => P`
                  <div class="merge-row">
                    <span class="merge-el">${i.type} · ${i.name ?? i.id}</span>
                    <label title=${i.system ?? "(eliminado en el sistema)"}>
                      <input
                        type="radio"
                        name=${i.key}
                        .checked=${this._mergeFlow.resolutions[i.key] === "system"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [i.key]: "system" }
      }}
                      />
                      Sistema
                    </label>
                    <label title=${i.solution ?? "(eliminado en la solución)"}>
                      <input
                        type="radio"
                        name=${i.key}
                        .checked=${this._mergeFlow.resolutions[i.key] === "solution"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [i.key]: "solution" }
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
      (i) => !this._mergeFlow.resolutions[i.key]
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
        .diff=${this._diff && !((t = this._workspace) != null && t.system) ? Object.fromEntries(
      this._diff.changes.filter((i) => i.kind !== "REMOVED").map((i) => [i.id, i.kind])
    ) : null}
        @modux-command=${this.onCommand}
        @modux-import-api=${this.onImportApi}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(i) => this.showToast(i.detail.message, i.detail.kind ?? "info")}
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
de.styles = _i`
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
fe([
  Ee()
], de.prototype, "base", 2);
fe([
  T()
], de.prototype, "_model", 2);
fe([
  T()
], de.prototype, "_layout", 2);
fe([
  T()
], de.prototype, "_error", 2);
fe([
  T()
], de.prototype, "_saving", 2);
fe([
  T()
], de.prototype, "_toast", 2);
fe([
  T()
], de.prototype, "_workspace", 2);
fe([
  T()
], de.prototype, "_creatingSolution", 2);
fe([
  T()
], de.prototype, "_newSolutionName", 2);
fe([
  T()
], de.prototype, "_diff", 2);
fe([
  T()
], de.prototype, "_mergeFlow", 2);
de = fe([
  bi("modux-editor-connected")
], de);
export {
  il as CONTAINER_HEADER,
  nl as CONTAINER_INSET,
  J as ModuxCanvas,
  V as ModuxEditor,
  de as ModuxEditorConnected,
  $s as aggregatesScene,
  zt as apiImplNodeId,
  Pt as apiOpOccurrenceId,
  oi as containerFit,
  os as containerMinSize,
  gs as contextMapScene,
  ps as flowCoherence,
  Ps as flowsScene,
  Et as normalizeViewLayout,
  Ri as processesScene,
  hs as relationEdgeId,
  Ii as resolveOverlaps
};
