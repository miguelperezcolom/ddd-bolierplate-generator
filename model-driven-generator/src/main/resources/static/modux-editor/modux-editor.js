const ll = 34, cl = 10;
function xi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let r = a + 1; r < e.length; r++) {
        const l = e[a], c = e[r], u = i.get(l.id), m = i.get(c.id), p = m.x - u.x, f = m.y - u.y, w = (l.w + c.w) / 2 + t - Math.abs(p), I = (l.h + c.h) / 2 + t - Math.abs(f);
        if (!(w <= 0 || I <= 0))
          if (o = !0, w < I) {
            const P = (p >= 0 ? 1 : -1) * w / 2;
            u.x -= P, m.x += P;
          } else {
            const P = (f >= 0 ? 1 : -1) * I / 2;
            u.y -= P, m.y += P;
          }
      }
    if (!o) break;
  }
  const s = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = i.get(n.id);
    (Math.abs(o.x - n.x) > 0.5 || Math.abs(o.y - n.y) > 0.5) && s.set(n.id, o);
  }
  return s;
}
function ps(e, t = { w: 160, h: 90 }) {
  let i = t.w, s = t.h;
  for (const n of e)
    i = Math.max(i, 2 * (Math.abs(n.dx) + n.w / 2 + 10)), s = Math.max(
      s,
      2 * (34 + n.h / 2 - n.dy),
      // child's top edge below the header band
      2 * (10 + n.h / 2 + n.dy)
      // child's bottom edge above the inset
    );
  return { w: i, h: s };
}
function ai(e, t, i) {
  let s = t.w / 2, n = t.w / 2, o = t.h / 2, a = t.h / 2;
  for (const r of i)
    s = Math.max(s, -r.dx + r.w / 2 + 10), n = Math.max(n, r.dx + r.w / 2 + 10), o = Math.max(o, -r.dy + r.h / 2 + 34), a = Math.max(a, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (a - o) / 2,
    w: s + n,
    h: o + a
  };
}
function At(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const ms = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, fs = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, gs = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ye = 168, je = 56;
function ze(e, t) {
  return `apiimpl:${e}@${t}`;
}
function Le(e, t) {
  return `apiop:${e}@${t}`;
}
function fn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: ze(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const gn = 34, yn = 14, ys = 14, xe = 108, Ie = 32, wn = 12, xn = 10, gt = 2, ws = gt * xe + (gt - 1) * wn + 2 * yn;
function xs(e, t) {
  return `rel:${e}->${t}`;
}
function Is(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function ot(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const vs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, In = {
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
}, ri = {
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
  const t = Math.max(1, Math.ceil(e / gt)), i = t * Ie + (t - 1) * xn;
  return { w: ws, h: gn + i + ys };
}
function Ot(e, t) {
  const i = e % gt, s = Math.floor(e / gt);
  return {
    x: -t.w / 2 + yn + i * (xe + wn) + xe / 2,
    y: -t.h / 2 + gn + s * (Ie + xn) + Ie / 2
  };
}
function _s(e, t, i, s, n, o, a = !1) {
  const r = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...fn(e, t.id),
    ...r.map((c) => ({ id: c.id, name: c.name, kind: "aggregate" })),
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
  if (!l.length)
    return [{ ...s, x: i.x, y: i.y, w: Ye, h: je }];
  if (a) {
    const c = new Map((e.apis ?? []).map((m) => [m.id, m])), u = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && c.has(m.apiId)).map((m) => {
      const p = c.get(m.apiId);
      return {
        id: ze(m.apiId, m.moduleId),
        name: p.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${p.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (p.operations ?? []).map((f) => ({
          id: Le(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (u.length > 0) {
      const m = l.filter((p) => p.kind !== "api-impl");
      return vn(i, s, u, m, n, o);
    }
  }
  return ct(i, s, l, n, o);
}
function vn(e, t, i, s, n, o) {
  const a = o[t.id] ?? di(i.length + s.length), r = i.map((p, f) => {
    const w = n[p.id] ?? Ot(f, a), I = p.ops, P = o[p.id] ?? di(I.length), v = I.map((F, _) => n[F.id] ?? Ot(_, P)), N = ai(
      { x: w.x, y: w.y },
      P,
      v.map((F) => ({ dx: F.x, dy: F.y, w: xe, h: Ie }))
    );
    return { a: p, off: w, ops: I, opOffs: v, fit: N };
  }), l = s.map(
    (p, f) => n[p.id] ?? Ot(i.length + f, a)
  ), c = xi(
    [
      ...r.map((p) => ({ id: p.a.id, x: p.fit.x, y: p.fit.y, w: p.fit.w, h: p.fit.h })),
      ...s.map((p, f) => ({
        id: p.id,
        x: l[f].x,
        y: l[f].y,
        w: xe,
        h: Ie
      }))
    ],
    24
  );
  for (const p of r) {
    const f = c.get(p.a.id);
    f && (p.off = { x: p.off.x + (f.x - p.fit.x), y: p.off.y + (f.y - p.fit.y) }, p.fit = { ...p.fit, x: f.x, y: f.y });
  }
  s.forEach((p, f) => {
    const w = c.get(p.id);
    w && (l[f] = { x: w.x, y: w.y });
  });
  const u = ai(e, a, [
    ...r.map((p) => ({ dx: p.fit.x, dy: p.fit.y, w: p.fit.w, h: p.fit.h })),
    ...l.map((p) => ({ dx: p.x, dy: p.y, w: xe, h: Ie }))
  ]), m = [
    { ...t, x: u.x, y: u.y, w: u.w, h: u.h, container: !0 }
  ];
  for (const p of r)
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
    }), p.ops.forEach((f, w) => {
      m.push({
        id: f.id,
        label: f.name,
        kind: p.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: p.a.id,
        x: e.x + p.off.x + p.opOffs[w].x,
        y: e.y + p.off.y + p.opOffs[w].y,
        w: xe,
        h: Ie,
        tooltip: `${ri[p.a.opKind]}: ${f.name}`
      });
    });
  return s.forEach((p, f) => {
    const w = In[p.kind];
    m.push({
      id: p.id,
      label: p.name,
      kind: p.kind,
      x: e.x + l[f].x,
      y: e.y + l[f].y,
      w: xe,
      h: Ie,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${ri[p.kind]} ${p.name}`
    });
  }), m;
}
function ct(e, t, i, s, n) {
  const o = n[t.id] ?? di(i.length), a = i.map((m, p) => s[m.id] ?? Ot(p, o)), r = xi(
    i.map((m, p) => ({ id: m.id, x: a[p].x, y: a[p].y, w: xe, h: Ie })),
    10
  );
  i.forEach((m, p) => {
    const f = r.get(m.id);
    f && (a[p] = { x: f.x, y: f.y });
  });
  const l = ai(
    e,
    o,
    a.map((m) => ({ dx: m.x, dy: m.y, w: xe, h: Ie }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, u = i.map((m, p) => {
    const f = a[p], w = m.policy ? vs : In[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: xe,
      h: Ie,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : ri[m.kind]} ${m.name}`
    };
  });
  return [c, ...u];
}
function $s(e, t, i = "contexts", s = {}) {
  const n = i !== "contexts", o = i === "operations", a = new Set(e.externalSystems.map((d) => d.id)), r = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && a.has(d.publishedByExternalSystemId)
  ), l = new Set(r.map((d) => d.id)), c = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && a.has(d.publishedByExternalSystemId)
  ), u = new Set(c.map((d) => d.id)), m = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((d) => !l.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((d) => !u.has(d.id)).map((d) => ({ ref: d, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], p = m.flatMap((d, A) => {
    const V = t[d.ref.id] ?? ot(A, m.length);
    if ("workflow" in d && d.workflow) {
      const j = d.ref;
      return [{
        id: j.id,
        label: j.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${j.name} — workflow${j.triggerEvent ? ` · arranca con ${j.triggerEvent}` : ""}`,
        x: V.x,
        y: V.y,
        w: Ye,
        h: je
      }];
    }
    if (d.proxy) {
      const j = d.ref, fe = {
        id: j.id,
        label: j.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${j.name} — proxy/cache de una API, consumible como ella`
      };
      if (o && j.targetApiId) {
        const he = (e.apis ?? []).find((be) => be.id === j.targetApiId), Ne = (he == null ? void 0 : he.operations) ?? [];
        if (Ne.length > 0)
          return ct(
            V,
            fe,
            Ne.map((be) => ({
              id: Le(be.id, j.id),
              name: be.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...fe, x: V.x, y: V.y, w: Ye, h: je }];
    }
    if (d.api) {
      const j = d.ref, fe = {
        id: j.id,
        label: j.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${j.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return n && j.operations.length > 0 ? ct(
        V,
        fe,
        j.operations.map(
          (he) => ({ id: he.id, name: he.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{ ...fe, x: V.x, y: V.y, w: Ye, h: je }];
    }
    if (d.external) {
      const j = d.ref, fe = {
        id: j.id,
        label: j.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${j.name} (sistema externo)`
      }, he = r.filter((ee) => ee.publishedByExternalSystemId === j.id), Ne = c.filter((ee) => ee.publishedByExternalSystemId === j.id), be = [
        ...Ne.map((ee) => ({ id: ee.id, name: ee.name, kind: "proxy-api" })),
        ...n ? [
          ...(j.useCases ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "external-use-case" })
          ),
          ...(j.tables ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "external-table" })
          ),
          ...(j.mcpServers ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "mcp-server" })
          )
        ] : []
      ], se = o ? Ne.filter((ee) => {
        const nt = ee.targetApiId ? (e.apis ?? []).find((ae) => ae.id === ee.targetApiId) : void 0;
        return ((nt == null ? void 0 : nt.operations) ?? []).length > 0;
      }) : [];
      if (o && (he.length > 0 || se.length > 0)) {
        const ee = [
          ...he.map((ae) => ({
            id: ae.id,
            name: ae.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ae.name} — API publicada por ${j.name}`,
            opKind: "api-operation",
            ops: (ae.operations ?? []).map((st) => ({ id: st.id, name: st.name }))
          })),
          ...se.map((ae) => {
            const st = (e.apis ?? []).find((St) => St.id === ae.targetApiId);
            return {
              id: ae.id,
              name: ae.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ae.name} — proxy/cache de ${st.name}`,
              opKind: "api-op-occurrence",
              ops: (st.operations ?? []).map((St) => ({
                id: Le(St.id, ae.id),
                name: St.name
              }))
            };
          })
        ], nt = new Set(se.map((ae) => ae.id));
        return vn(
          V,
          fe,
          ee,
          be.filter((ae) => !nt.has(ae.id)),
          t,
          s
        );
      }
      const Ti = [
        ...he.map((ee) => ({ id: ee.id, name: ee.name, kind: "api" })),
        ...be
      ];
      return Ti.length > 0 ? ct(V, fe, Ti, t, s) : [{ ...fe, x: V.x, y: V.y, w: Ye, h: je }];
    }
    const X = d.ref, Q = X.subdomainType ?? "GENERIC", re = {
      id: X.id,
      label: X.name,
      kind: "module",
      symbol: "component",
      fill: ms[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${X.name} — subdominio ${Q}`
    };
    if (n) return _s(e, X, V, re, t, s, o);
    const $e = fn(e, X.id);
    return $e.length > 0 ? ct(V, re, $e, t, s) : [{ ...re, x: V.x, y: V.y, w: Ye, h: je }];
  }), f = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, A) => {
    const V = t[d.id] ?? ot(m.length + A, f);
    p.push({
      id: d.id,
      label: d.name,
      x: V.x,
      y: V.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${d.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((d, A) => {
    const V = t[d.id] ?? ot(m.length + (e.actors ?? []).length + A, f);
    p.push({
      id: d.id,
      label: d.name,
      x: V.x,
      y: V.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: d.external ? "#ffffff" : "#faf5ff",
      stroke: "#9333ea",
      dashed: !!d.external,
      badge: d.external ? "AGENTE IA EXT." : "AGENTE IA",
      tooltip: d.external ? `${d.name} (agente de IA externo — entra por un gateway MCP)` : `${d.name} (agente de IA — consume por MCP)`
    });
  }), (e.mcpGateways ?? []).forEach((d, A) => {
    const V = t[d.id] ?? ot(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + A,
      f
    );
    p.push({
      id: d.id,
      label: d.name,
      x: V.x,
      y: V.y,
      w: 148,
      h: 48,
      kind: "mcp-gateway",
      symbol: "plug",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: "GATEWAY MCP",
      tooltip: `${d.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`
    });
  });
  const w = [];
  (e.rags ?? []).forEach((d, A) => {
    const V = t[d.id] ?? ot(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + A,
      f
    );
    p.push({
      id: d.id,
      label: d.name,
      x: V.x,
      y: V.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((X, Q) => {
      const re = `ragcs:${d.id}:${X.uri}`, $e = t[re] ?? { x: V.x + 170, y: V.y - 30 + Q * 44 };
      p.push({
        id: re,
        label: X.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: $e.x,
        y: $e.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: X.type,
        tooltip: `${X.type}: ${X.uri}`
      }), w.push({
        id: `ragcse:${d.id}:${X.uri}`,
        sourceId: re,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), p.sort((d, A) => (d.parentId ? 1 : 0) - (A.parentId ? 1 : 0));
  const I = e.relations.map((d) => ({
    id: xs(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? fs[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), P = e.flows.map((d) => {
    var $e, j, fe, he, Ne, be;
    const A = Is(e, d), V = n ? e.modules.find((se) => se.id === d.sourceId) : void 0, X = (($e = V == null ? void 0 : V.domainEvents) == null ? void 0 : $e.find((se) => se.name === d.triggerEvent)) ?? ((j = V == null ? void 0 : V.applicationEvents) == null ? void 0 : j.find((se) => se.name === d.triggerEvent)), Q = n && d.readModelName ? (he = (fe = e.modules.find((se) => se.id === d.targetId)) == null ? void 0 : fe.readModels) == null ? void 0 : he.find((se) => se.name === d.readModelName) : void 0, re = n && d.targetUseCaseId ? (be = (Ne = e.modules.find((se) => se.id === d.targetId)) == null ? void 0 : Ne.useCases) == null ? void 0 : be.find((se) => se.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? d.sourceId,
      targetId: (re == null ? void 0 : re.id) ?? (Q == null ? void 0 : Q.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: gs[A],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${A}`
    };
  }), v = new Map((e.apis ?? []).map((d) => [d.id, d])), N = new Set(e.modules.map((d) => d.id)), F = (e.apiImplementations ?? []).filter(
    (d) => v.has(d.apiId) && N.has(d.moduleId)
  ), _ = new Set(p.map((d) => d.id)), x = n ? (e.emissions ?? []).filter((d) => _.has(d.sourceId) && _.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], b = n ? (e.projections ?? []).map((d) => ({
    p: d,
    source: d.sourceAggregateId ?? d.sourceExternalUseCaseId ?? d.sourceExternalTableId
  })).filter(({ p: d, source: A }) => A && d.readModelId).filter(({ p: d, source: A }) => _.has(A) && _.has(d.readModelId)).map(({ p: d, source: A }) => ({
    id: `proj:${d.id}`,
    sourceId: A,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], E = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((A) => {
      const V = n && A.targetUseCaseId && _.has(A.targetUseCaseId) ? A.targetUseCaseId : A.targetModuleId && _.has(A.targetModuleId) ? A.targetModuleId : (A.targetUseCaseId && !n, null);
      if (!V) return [];
      const X = n && _.has(A.id) ? A.id : d.id;
      return _.has(X) ? [
        {
          id: `apiwire:${A.id}`,
          sourceId: X,
          targetId: V,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${A.name} la implementa ${V}`
        }
      ] : [];
    })
  ), M = n ? (e.useCaseCalls ?? []).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], z = n ? (e.queryCalls ?? []).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], C = n ? (e.actorUses ?? []).filter((d) => _.has(d.actorId) && _.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], U = (e.actorExternalDependencies ?? []).filter((d) => _.has(d.actorId) && _.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), B = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), Y = (d) => _.has(d) ? d : B.get(d) ?? d, h = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: Y(d.targetId),
        cqrs: d.type === "CQRS"
      })).filter(
        (d) => _.has(d.sourceId) && _.has(d.targetId) && d.sourceId !== d.targetId
      ).map((d) => [
        `xdep:${d.sourceId}->${d.targetId}`,
        {
          id: `xdep:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "ext-dep",
          color: d.cqrs ? "#7c3aed" : "#64748b",
          label: d.cqrs ? "CQRS" : "dep",
          dashed: !0,
          arrow: !0,
          tooltip: d.cqrs ? "CQRS — consulta sobre sus datos" : "depende de"
        }
      ])
    ).values()
  ], y = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const A of d.useCases ?? []) y.set(A.id, d.id);
    for (const A of d.domainEvents ?? []) y.set(A.id, d.id);
    for (const A of d.applicationEvents ?? []) y.set(A.id, d.id);
  }
  const g = (d) => _.has(d) ? d : y.get(d) ?? d, $ = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const A of d.domainEvents ?? []) $.set(A.name, A.id);
    for (const A of d.applicationEvents ?? []) $.set(A.name, A.id);
  }
  const O = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((A) => A.targetUseCaseId).map((A) => ({ sourceId: d.id, targetId: g(A.targetUseCaseId) }))
      ).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => [
        `wfcall:${d.sourceId}->${d.targetId}`,
        {
          id: `wfcall:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "wf-call",
          color: "#7c3aed",
          dashed: !0,
          arrow: !0,
          tooltip: "orquesta"
        }
      ])
    ).values()
  ], L = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && $.has(d.triggerEvent)).map((d) => ({
        sourceId: g($.get(d.triggerEvent)),
        targetId: d.id,
        label: d.triggerEvent
      })).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => [
        `wftrig:${d.sourceId}->${d.targetId}`,
        {
          id: `wftrig:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "wf-trigger",
          color: "#f59e0b",
          label: d.label,
          dashed: !0,
          arrow: !0,
          tooltip: "dispara el workflow"
        }
      ])
    ).values()
  ], k = /* @__PURE__ */ new Map();
  for (const d of e.externalSystems)
    for (const A of d.tables ?? []) k.set(A.id, d.id);
  const S = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((A) => ({
          sourceId: _.has(A) ? A : k.get(A) ?? A,
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => [
        `ragtbl:${d.sourceId}->${d.targetId}`,
        {
          id: `ragtbl:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "rag-table",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${d.name} indexa esta tabla`
        }
      ])
    ).values()
  ], R = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((A) => ({
          sourceId: Y(A),
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => [
        `ragapi:${d.sourceId}->${d.targetId}`,
        {
          id: `ragapi:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "rag-api",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${d.name} indexa el contenido de esta API`
        }
      ])
    ).values()
  ], Z = [
    ...new Map(
      (e.rags ?? []).flatMap((d) => [
        ...(d.sourceExternalSystemIds ?? []).map((A) => ({ sourceId: A, targetId: d.id, name: d.name })),
        ...(d.sourceModuleIds ?? []).map((A) => ({ sourceId: A, targetId: d.id, name: d.name }))
      ]).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => [
        `ragcoarse:${d.sourceId}->${d.targetId}`,
        {
          id: `ragcoarse:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "rag-coarse",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${d.name} indexa su contenido`
        }
      ])
    ).values()
  ], J = [
    ...new Map(
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: Y(d.apiId) })).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => [
        `agapi:${d.sourceId}->${d.targetId}`,
        {
          id: `agapi:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "agent-api",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume la API entera como herramienta"
        }
      ])
    ).values()
  ], ce = [
    ...new Map(
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: Y(d.id), targetId: Y(d.targetApiId) })).filter(
        (d) => _.has(d.sourceId) && _.has(d.targetId) && d.sourceId !== d.targetId
      ).map((d) => [
        `pxt:${d.sourceId}->${d.targetId}`,
        {
          id: `pxt:${d.sourceId}->${d.targetId}`,
          sourceId: d.sourceId,
          targetId: d.targetId,
          kind: "proxy-target",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: "proxy/cache de"
        }
      ])
    ).values()
  ], ye = F.flatMap((d) => {
    const A = ze(d.apiId, d.moduleId);
    if (!_.has(A)) return [];
    const V = [];
    for (const X of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === d.apiId)) {
      const Q = Y(X.id);
      _.has(Q) && Q !== A && V.push({
        id: `pxr:${Q}->${A}`,
        sourceId: Q,
        targetId: A,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return V;
  }), ue = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const A = (e.proxyApis ?? []).find((Q) => Q.id === d.proxyId);
    if (!(A != null && A.targetApiId)) return [];
    const V = Le(d.operationId, d.proxyId), X = d.targetSiteId === A.targetApiId ? A.targetApiId : ze(A.targetApiId, d.targetSiteId);
    return !_.has(V) || !_.has(X) ? [] : [{
      id: `oproute:${V}->${X}`,
      sourceId: V,
      targetId: X,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), we = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!_.has(d.externalSystemId)) return null;
        const A = (e.apis ?? []).find(
          (re) => re.operations.some(($e) => $e.id === d.operationId)
        );
        if (!A) return null;
        const V = d.siteId === A.id, X = V ? d.operationId : Le(d.operationId, d.siteId);
        let Q = _.has(X) ? X : null;
        return Q || (V || (e.proxyApis ?? []).some((re) => re.id === d.siteId) ? Q = Y(d.siteId) : Q = ze(A.id, d.siteId)), !Q || !_.has(Q) || Q === d.externalSystemId ? null : { u: d, target: Q };
      }).filter((d) => d !== null).map((d) => [
        `extopuse:${d.u.externalSystemId}->${d.u.operationId}@${d.u.siteId}`,
        {
          id: `extopuse:${d.u.externalSystemId}->${d.u.operationId}@${d.u.siteId}`,
          sourceId: d.u.externalSystemId,
          targetId: d.target,
          kind: "ext-op-use",
          color: "#64748b",
          label: "op",
          dashed: !0,
          arrow: !0,
          tooltip: "llama a esta operación"
        }
      ])
    ).values()
  ], it = n ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!_.has(d.useCaseId)) return [];
    const A = _.has(Le(d.operationId, d.moduleId)) ? Le(d.operationId, d.moduleId) : _.has(ze(d.apiId, d.moduleId)) ? ze(d.apiId, d.moduleId) : _.has(Y(d.moduleId)) ? Y(d.moduleId) : null;
    return A ? [{
      id: `apiimplwire:${d.operationId}@${d.moduleId}`,
      sourceId: A,
      targetId: d.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Jn = n ? (e.agentUses ?? []).filter((d) => _.has(d.agentId) && _.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], es = (e.agentRags ?? []).filter((d) => _.has(d.agentId) && _.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), ts = n ? (e.rags ?? []).filter((d) => _.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((A) => _.has(A)).map((A) => ({
      id: `ragsrc:${d.id}->${A}`,
      sourceId: d.id,
      targetId: A,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], is = n ? (e.agentExternalUses ?? []).filter((d) => _.has(d.agentId) && _.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], ns = n ? (e.agentMcpUses ?? []).filter((d) => _.has(d.agentId) && _.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], ss = (e.mcpGateways ?? []).flatMap(
    (d) => [
      ...d.mcpServerIds ?? [],
      ...d.apiIds ?? [],
      ...d.apiOperationIds ?? [],
      ...d.useCaseIds ?? [],
      ...d.ragIds ?? []
    ].filter((A) => _.has(d.id) && _.has(A)).map((A) => ({
      id: `gwx:${d.id}->${A}`,
      sourceId: d.id,
      targetId: A,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), os = (e.agentGatewayUses ?? []).filter((d) => _.has(d.agentId) && _.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), as = n ? (e.agentApiOpUses ?? []).filter((d) => _.has(d.agentId) && _.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], rs = n ? (e.agentQueryUses ?? []).filter((d) => _.has(d.agentId) && _.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], ds = (e.agentDelegations ?? []).filter((d) => _.has(d.agentId) && _.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), ls = (e.actorAgentUses ?? []).filter((d) => _.has(d.actorId) && _.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), cs = n ? (e.agentTriggers ?? []).filter((d) => _.has(d.eventId) && _.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], us = n ? (e.externalCalls ?? []).filter((d) => _.has(d.externalSystemId) && _.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], hs = n ? (e.externalUseCaseCalls ?? []).filter((d) => _.has(d.sourceId) && _.has(d.targetId)).map((d) => ({
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
    nodes: p,
    edges: [
      ...I,
      ...P,
      ...x,
      ...b,
      ...E,
      ...M,
      ...z,
      ...C,
      ...U,
      ...h,
      ...ce,
      ...ye,
      ...ue,
      ...we,
      ...it,
      ...O,
      ...L,
      ...J,
      ...S,
      ...R,
      ...Z,
      ...Jn,
      ...is,
      ...ns,
      ...ss,
      ...os,
      ...as,
      ...rs,
      ...ds,
      ...ls,
      ...cs,
      ...es,
      ...ts,
      ...w,
      ...us,
      ...hs
    ]
  };
}
const bs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ks = 176, Es = 60, Ss = 140, As = 40;
function Cs(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const a = 220 + o * 340;
    i.filter((l) => l.moduleId === n.id).forEach((l, c) => {
      const u = s.filter((p) => p.aggregateId === l.id).length, m = 140 + c * (170 + u * 60);
      t[l.id] = { x: a, y: m }, s.filter((p) => p.aggregateId === l.id).forEach((p, f) => {
        t[p.id] = { x: a + 60, y: m + 100 + f * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Ms(e, t) {
  const i = Cs(e), s = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const u = n.get(c.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", p = s(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: ks,
      h: Es,
      kind: "aggregate",
      symbol: "aggregate",
      fill: bs[m],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${u ? ` — módulo ${u.name} (${m})` : ""}`
    };
  }), a = (e.entities ?? []).map((c) => {
    const u = s(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
      w: Ss,
      h: As,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${c.name} (dentro del agregado)`
    };
  }), r = (e.entities ?? []).map((c) => ({
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
    nodes: [...o, ...a],
    edges: [...r, ...l]
  };
}
const Ps = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ns = 150, Ts = 44, Os = 190, Rs = 56, Us = 160, Ds = 48;
function Ls(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function zs(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), a = (r) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((u) => u.id === r)) == null ? void 0 : c.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const c = 120 + l * 130, u = Ps[r.archetype] ?? "#475569", m = r.triggerAggregateId ?? r.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const P = t[m] ?? { x: 160, y: c };
      s.push({
        id: m,
        label: r.triggerAggregateId ? a(r.triggerAggregateId) : m,
        x: P.x,
        y: P.y,
        w: Ns,
        h: Ts,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const p = `flow:${r.id}`, f = t[p] ?? { x: 470, y: c };
    s.push({
      id: p,
      label: r.name,
      x: f.x,
      y: f.y,
      w: Os,
      h: Rs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const w = Ls(e, r), I = `tgt:${w.id}`;
    if (!o.has(I)) {
      o.add(I);
      const P = t[I] ?? { x: 790, y: c };
      s.push({
        id: I,
        label: w.label,
        x: P.x,
        y: P.y,
        w: Us,
        h: Ds,
        kind: w.external ? "external-system" : "module",
        symbol: "component",
        fill: w.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: w.external,
        badge: w.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${r.id}:in`,
      sourceId: m,
      targetId: p,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${r.id}:out`,
      sourceId: p,
      targetId: I,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const qs = 190, Fs = 56, Zt = 170, Vs = 52;
function Oi(e, t) {
  const i = [], s = [], n = (o) => {
    var a;
    return (a = e.modules.find((r) => r.id === o)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((o, a) => {
    const r = 140 + a * 240, l = t[o.id] ?? { x: 150, y: r };
    i.push({
      id: o.id,
      label: o.name,
      x: l.x,
      y: l.y,
      w: qs,
      h: Fs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((u, m) => {
      const p = u.type === "HUMAN", f = t[u.id] ?? { x: 150 + (m + 1) * 240, y: r };
      if (i.push({
        id: u.id,
        label: u.name,
        x: f.x,
        y: f.y,
        w: Zt,
        h: Vs,
        kind: "process-step",
        symbol: p ? "person" : "gear",
        fill: p ? "#fef3c7" : "#ffffff",
        stroke: p ? "#d97706" : "#64748b",
        badge: p ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), s.push({
        id: `pe:${o.id}:${m}`,
        sourceId: c,
        targetId: u.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const w = `comp:${u.id}`, I = t[w] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: w,
          label: u.compensationUseCaseId,
          x: I.x,
          y: I.y,
          w: Zt,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), s.push({
          id: `pc:${u.id}`,
          sourceId: u.id,
          targetId: w,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = u.id;
    }), o.onCompletionEventName) {
      const u = `done:${o.id}`, m = t[u] ?? { x: 150 + (o.steps.length + 1) * 240, y: r };
      i.push({
        id: u,
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
      }), s.push({
        id: `pd:${o.id}`,
        sourceId: c,
        targetId: u,
        kind: "process-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
  }), { nodes: i, edges: s };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = globalThis, Ii = Rt.ShadowRoot && (Rt.ShadyCSS === void 0 || Rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vi = Symbol(), Ri = /* @__PURE__ */ new WeakMap();
let _n = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== vi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ii && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Ri.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ri.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Hs = (e) => new _n(typeof e == "string" ? e : e + "", void 0, vi), _i = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new _n(i, e, vi);
}, Ks = (e, t) => {
  if (Ii) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = Rt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Ui = Ii ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Hs(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Gs, defineProperty: Ws, getOwnPropertyDescriptor: Bs, getOwnPropertyNames: Ys, getOwnPropertySymbols: js, getPrototypeOf: Xs } = Object, Re = globalThis, Di = Re.trustedTypes, Qs = Di ? Di.emptyScript : "", Jt = Re.reactiveElementPolyfillSupport, pt = (e, t) => e, qt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Qs : null;
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
} }, $i = (e, t) => !Gs(e, t), Li = { attribute: !0, type: String, converter: qt, reflect: !1, useDefault: !1, hasChanged: $i };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Re.litPropertyMetadata ?? (Re.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Xe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Li) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Ws(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = Bs(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const r = n == null ? void 0 : n.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Li;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pt("elementProperties"))) return;
    const t = Xs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pt("properties"))) {
      const i = this.properties, s = [...Ys(i), ...js(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) i.unshift(Ui(n));
    } else t !== void 0 && i.push(Ui(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ks(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    var o;
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : qt).toAttribute(i, s.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : qt;
      this._$Em = n;
      const c = l.fromAttribute(i, r.type);
      this[n] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? $i)(o, i) || s.useDefault && s.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: o }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, a] of n) {
        const { wrapped: r } = a, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, a, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((s) => {
      var n;
      return (n = s.hostUpdated) == null ? void 0 : n.call(s);
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
Xe.elementStyles = [], Xe.shadowRootOptions = { mode: "open" }, Xe[pt("elementProperties")] = /* @__PURE__ */ new Map(), Xe[pt("finalized")] = /* @__PURE__ */ new Map(), Jt == null || Jt({ ReactiveElement: Xe }), (Re.reactiveElementVersions ?? (Re.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, zi = (e) => e, Ft = mt.trustedTypes, qi = Ft ? Ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $n = "$lit$", Oe = `lit$${Math.random().toFixed(9).slice(2)}$`, bn = "?" + Oe, Zs = `<${bn}>`, Ge = document, yt = () => Ge.createComment(""), wt = (e) => e === null || typeof e != "object" && typeof e != "function", bi = Array.isArray, Js = (e) => bi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ei = `[ 	
\f\r]`, at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fi = /-->/g, Vi = />/g, Ue = RegExp(`>|${ei}(?:([^\\s"'>=/]+)(${ei}*=${ei}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Hi = /'/g, Ki = /"/g, kn = /^(?:script|style|textarea|title)$/i, En = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), T = En(1), W = En(2), Ze = Symbol.for("lit-noChange"), ne = Symbol.for("lit-nothing"), Gi = /* @__PURE__ */ new WeakMap(), qe = Ge.createTreeWalker(Ge, 129);
function Sn(e, t) {
  if (!bi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qi !== void 0 ? qi.createHTML(t) : t;
}
const eo = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = at;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let c, u, m = -1, p = 0;
    for (; p < l.length && (a.lastIndex = p, u = a.exec(l), u !== null); ) p = a.lastIndex, a === at ? u[1] === "!--" ? a = Fi : u[1] !== void 0 ? a = Vi : u[2] !== void 0 ? (kn.test(u[2]) && (n = RegExp("</" + u[2], "g")), a = Ue) : u[3] !== void 0 && (a = Ue) : a === Ue ? u[0] === ">" ? (a = n ?? at, m = -1) : u[1] === void 0 ? m = -2 : (m = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? Ue : u[3] === '"' ? Ki : Hi) : a === Ki || a === Hi ? a = Ue : a === Fi || a === Vi ? a = at : (a = Ue, n = void 0);
    const f = a === Ue && e[r + 1].startsWith("/>") ? " " : "";
    o += a === at ? l + Zs : m >= 0 ? (s.push(c), l.slice(0, m) + $n + l.slice(m) + Oe + f) : l + Oe + (m === -2 ? r : f);
  }
  return [Sn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class xt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, l = this.parts, [c, u] = eo(t, i);
    if (this.el = xt.createElement(c, s), qe.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (n = qe.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const m of n.getAttributeNames()) if (m.endsWith($n)) {
          const p = u[a++], f = n.getAttribute(m).split(Oe), w = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: w[2], strings: f, ctor: w[1] === "." ? io : w[1] === "?" ? no : w[1] === "@" ? so : Yt }), n.removeAttribute(m);
        } else m.startsWith(Oe) && (l.push({ type: 6, index: o }), n.removeAttribute(m));
        if (kn.test(n.tagName)) {
          const m = n.textContent.split(Oe), p = m.length - 1;
          if (p > 0) {
            n.textContent = Ft ? Ft.emptyScript : "";
            for (let f = 0; f < p; f++) n.append(m[f], yt()), qe.nextNode(), l.push({ type: 2, index: ++o });
            n.append(m[p], yt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === bn) l.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = n.data.indexOf(Oe, m + 1)) !== -1; ) l.push({ type: 7, index: o }), m += Oe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = Ge.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Je(e, t, i = e, s) {
  var a, r;
  if (t === Ze) return t;
  let n = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const o = wt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((r = n == null ? void 0 : n._$AO) == null || r.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = Je(e, n._$AS(e, t.values), n, s)), t;
}
class to {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? Ge).importNode(i, !0);
    qe.currentNode = n;
    let o = qe.nextNode(), a = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new bt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new oo(o, this, t)), this._$AV.push(c), l = s[++r];
      }
      a !== (l == null ? void 0 : l.index) && (o = qe.nextNode(), a++);
    }
    return qe.currentNode = Ge, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class bt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = ne, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = Je(this, t, i), wt(t) ? t === ne || t == null || t === "" ? (this._$AH !== ne && this._$AR(), this._$AH = ne) : t !== this._$AH && t !== Ze && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Js(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ne && wt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ge.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = xt.createElement(Sn(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const a = new to(n, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = Gi.get(t.strings);
    return i === void 0 && Gi.set(t.strings, i = new xt(t)), i;
  }
  k(t) {
    bi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new bt(this.O(yt()), this.O(yt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = zi(t).nextSibling;
      zi(t).remove(), t = n;
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
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = ne, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = ne;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = Je(this, t, i, 0), a = !wt(t) || t !== this._$AH && t !== Ze, a && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = Je(this, r[s + l], i, l), c === Ze && (c = this._$AH[l]), a || (a = !wt(c) || c !== this._$AH[l]), c === ne ? t = ne : t !== ne && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === ne ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class io extends Yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ne ? void 0 : t;
  }
}
class no extends Yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ne);
  }
}
class so extends Yt {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Je(this, t, i, 0) ?? ne) === Ze) return;
    const s = this._$AH, n = t === ne && s !== ne || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== ne && (s === ne || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oo {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Je(this, t);
  }
}
const ti = mt.litHtmlPolyfillSupport;
ti == null || ti(xt, bt), (mt.litHtmlVersions ?? (mt.litHtmlVersions = [])).push("3.3.3");
const ao = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new bt(t.insertBefore(yt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = globalThis;
class He extends Xe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ao(i, this.renderRoot, this.renderOptions);
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
    return Ze;
  }
}
var mn;
He._$litElement$ = !0, He.finalized = !0, (mn = Ve.litElementHydrateSupport) == null || mn.call(Ve, { LitElement: He });
const ii = Ve.litElementPolyfillSupport;
ii == null || ii({ LitElement: He });
(Ve.litElementVersions ?? (Ve.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ki = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ro = { attribute: !0, type: String, converter: qt, reflect: !1, hasChanged: $i }, lo = (e = ro, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Se(e) {
  return (t, i) => typeof i == "object" ? lo(e, t, i) : ((s, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(e) {
  return Se({ ...e, state: !0, attribute: !1 });
}
var li = "http://www.w3.org/1999/xhtml";
const Wi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: li,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function jt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Wi.hasOwnProperty(t) ? { space: Wi[t], local: e } : e;
}
function co(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === li && t.documentElement.namespaceURI === li ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function uo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function An(e) {
  var t = jt(e);
  return (t.local ? uo : co)(t);
}
function ho() {
}
function Ei(e) {
  return e == null ? ho : function() {
    return this.querySelector(e);
  };
}
function po(e) {
  typeof e != "function" && (e = Ei(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, r = s[n] = new Array(a), l, c, u = 0; u < a; ++u)
      (l = o[u]) && (c = e.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), r[u] = c);
  return new me(s, this._parents);
}
function mo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function fo() {
  return [];
}
function Cn(e) {
  return e == null ? fo : function() {
    return this.querySelectorAll(e);
  };
}
function go(e) {
  return function() {
    return mo(e.apply(this, arguments));
  };
}
function yo(e) {
  typeof e == "function" ? e = go(e) : e = Cn(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && (s.push(e.call(l, l.__data__, c, a)), n.push(l));
  return new me(s, n);
}
function Mn(e) {
  return function() {
    return this.matches(e);
  };
}
function Pn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var wo = Array.prototype.find;
function xo(e) {
  return function() {
    return wo.call(this.children, e);
  };
}
function Io() {
  return this.firstElementChild;
}
function vo(e) {
  return this.select(e == null ? Io : xo(typeof e == "function" ? e : Pn(e)));
}
var _o = Array.prototype.filter;
function $o() {
  return Array.from(this.children);
}
function bo(e) {
  return function() {
    return _o.call(this.children, e);
  };
}
function ko(e) {
  return this.selectAll(e == null ? $o : bo(typeof e == "function" ? e : Pn(e)));
}
function Eo(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, r = s[n] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new me(s, this._parents);
}
function Nn(e) {
  return new Array(e.length);
}
function So() {
  return new me(this._enter || this._groups.map(Nn), this._parents);
}
function Vt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Vt.prototype = {
  constructor: Vt,
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
function Ao(e) {
  return function() {
    return e;
  };
}
function Co(e, t, i, s, n, o) {
  for (var a = 0, r, l = t.length, c = o.length; a < c; ++a)
    (r = t[a]) ? (r.__data__ = o[a], s[a] = r) : i[a] = new Vt(e, o[a]);
  for (; a < l; ++a)
    (r = t[a]) && (n[a] = r);
}
function Mo(e, t, i, s, n, o, a) {
  var r, l, c = /* @__PURE__ */ new Map(), u = t.length, m = o.length, p = new Array(u), f;
  for (r = 0; r < u; ++r)
    (l = t[r]) && (p[r] = f = a.call(l, l.__data__, r, t) + "", c.has(f) ? n[r] = l : c.set(f, l));
  for (r = 0; r < m; ++r)
    f = a.call(e, o[r], r, o) + "", (l = c.get(f)) ? (s[r] = l, l.__data__ = o[r], c.delete(f)) : i[r] = new Vt(e, o[r]);
  for (r = 0; r < u; ++r)
    (l = t[r]) && c.get(p[r]) === l && (n[r] = l);
}
function Po(e) {
  return e.__data__;
}
function No(e, t) {
  if (!arguments.length) return Array.from(this, Po);
  var i = t ? Mo : Co, s = this._parents, n = this._groups;
  typeof e != "function" && (e = Ao(e));
  for (var o = n.length, a = new Array(o), r = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = s[c], m = n[c], p = m.length, f = To(e.call(u, u && u.__data__, c, s)), w = f.length, I = r[c] = new Array(w), P = a[c] = new Array(w), v = l[c] = new Array(p);
    i(u, m, I, P, v, f, t);
    for (var N = 0, F = 0, _, x; N < w; ++N)
      if (_ = I[N]) {
        for (N >= F && (F = N + 1); !(x = P[F]) && ++F < w; ) ;
        _._next = x || null;
      }
  }
  return a = new me(a, s), a._enter = r, a._exit = l, a;
}
function To(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Oo() {
  return new me(this._exit || this._groups.map(Nn), this._parents);
}
function Ro(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function Uo(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, a = Math.min(n, o), r = new Array(n), l = 0; l < a; ++l)
    for (var c = i[l], u = s[l], m = c.length, p = r[l] = new Array(m), f, w = 0; w < m; ++w)
      (f = c[w] || u[w]) && (p[w] = f);
  for (; l < n; ++l)
    r[l] = i[l];
  return new me(r, this._parents);
}
function Do() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], a; --n >= 0; )
      (a = s[n]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Lo(e) {
  e || (e = zo);
  function t(m, p) {
    return m && p ? e(m.__data__, p.__data__) : !m - !p;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var a = i[o], r = a.length, l = n[o] = new Array(r), c, u = 0; u < r; ++u)
      (c = a[u]) && (l[u] = c);
    l.sort(t);
  }
  return new me(n, this._parents).order();
}
function zo(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function qo() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Fo() {
  return Array.from(this);
}
function Vo() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var a = s[n];
      if (a) return a;
    }
  return null;
}
function Ho() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Ko() {
  return !this.node();
}
function Go(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, a = n.length, r; o < a; ++o)
      (r = n[o]) && e.call(r, r.__data__, o, n);
  return this;
}
function Wo(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Bo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Yo(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function jo(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Xo(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Qo(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Zo(e, t) {
  var i = jt(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Bo : Wo : typeof t == "function" ? i.local ? Qo : Xo : i.local ? jo : Yo)(i, t));
}
function Tn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Jo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ea(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function ta(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function ia(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Jo : typeof t == "function" ? ta : ea)(e, t, i ?? "")) : et(this.node(), e);
}
function et(e, t) {
  return e.style.getPropertyValue(t) || Tn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function na(e) {
  return function() {
    delete this[e];
  };
}
function sa(e, t) {
  return function() {
    this[e] = t;
  };
}
function oa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function aa(e, t) {
  return arguments.length > 1 ? this.each((t == null ? na : typeof t == "function" ? oa : sa)(e, t)) : this.node()[e];
}
function On(e) {
  return e.trim().split(/^|\s+/);
}
function Si(e) {
  return e.classList || new Rn(e);
}
function Rn(e) {
  this._node = e, this._names = On(e.getAttribute("class") || "");
}
Rn.prototype = {
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
  for (var i = Si(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function Dn(e, t) {
  for (var i = Si(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function ra(e) {
  return function() {
    Un(this, e);
  };
}
function da(e) {
  return function() {
    Dn(this, e);
  };
}
function la(e, t) {
  return function() {
    (t.apply(this, arguments) ? Un : Dn)(this, e);
  };
}
function ca(e, t) {
  var i = On(e + "");
  if (arguments.length < 2) {
    for (var s = Si(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? la : t ? ra : da)(i, t));
}
function ua() {
  this.textContent = "";
}
function ha(e) {
  return function() {
    this.textContent = e;
  };
}
function pa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function ma(e) {
  return arguments.length ? this.each(e == null ? ua : (typeof e == "function" ? pa : ha)(e)) : this.node().textContent;
}
function fa() {
  this.innerHTML = "";
}
function ga(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ya(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function wa(e) {
  return arguments.length ? this.each(e == null ? fa : (typeof e == "function" ? ya : ga)(e)) : this.node().innerHTML;
}
function xa() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ia() {
  return this.each(xa);
}
function va() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _a() {
  return this.each(va);
}
function $a(e) {
  var t = typeof e == "function" ? e : An(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function ba() {
  return null;
}
function ka(e, t) {
  var i = typeof e == "function" ? e : An(e), s = t == null ? ba : typeof t == "function" ? t : Ei(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Ea() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Sa() {
  return this.each(Ea);
}
function Aa() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ca() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ma(e) {
  return this.select(e ? Ca : Aa);
}
function Pa(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Na(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Ta(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function Oa(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Ra(e, t, i) {
  return function() {
    var s = this.__on, n, o = Na(t);
    if (s) {
      for (var a = 0, r = s.length; a < r; ++a)
        if ((n = s[a]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), n = { type: e.type, name: e.name, value: t, listener: o, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function Ua(e, t, i) {
  var s = Ta(e + ""), n, o = s.length, a;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, c = r.length, u; l < c; ++l)
        for (n = 0, u = r[l]; n < o; ++n)
          if ((a = s[n]).type === u.type && a.name === u.name)
            return u.value;
    }
    return;
  }
  for (r = t ? Ra : Oa, n = 0; n < o; ++n) this.each(r(s[n], t, i));
  return this;
}
function Ln(e, t, i) {
  var s = Tn(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function Da(e, t) {
  return function() {
    return Ln(this, e, t);
  };
}
function La(e, t) {
  return function() {
    return Ln(this, e, t.apply(this, arguments));
  };
}
function za(e, t) {
  return this.each((typeof t == "function" ? La : Da)(e, t));
}
function* qa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, a; n < o; ++n)
      (a = s[n]) && (yield a);
}
var zn = [null];
function me(e, t) {
  this._groups = e, this._parents = t;
}
function kt() {
  return new me([[document.documentElement]], zn);
}
function Fa() {
  return this;
}
me.prototype = kt.prototype = {
  constructor: me,
  select: po,
  selectAll: yo,
  selectChild: vo,
  selectChildren: ko,
  filter: Eo,
  data: No,
  enter: So,
  exit: Oo,
  join: Ro,
  merge: Uo,
  selection: Fa,
  order: Do,
  sort: Lo,
  call: qo,
  nodes: Fo,
  node: Vo,
  size: Ho,
  empty: Ko,
  each: Go,
  attr: Zo,
  style: ia,
  property: aa,
  classed: ca,
  text: ma,
  html: wa,
  raise: Ia,
  lower: _a,
  append: $a,
  insert: ka,
  remove: Sa,
  clone: Ma,
  datum: Pa,
  on: Ua,
  dispatch: za,
  [Symbol.iterator]: qa
};
function ke(e) {
  return typeof e == "string" ? new me([[document.querySelector(e)]], [document.documentElement]) : new me([[e]], zn);
}
function Va(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function De(e, t) {
  if (e = Va(e), t === void 0 && (t = e.currentTarget), t) {
    var i = t.ownerSVGElement || t;
    if (i.createSVGPoint) {
      var s = i.createSVGPoint();
      return s.x = e.clientX, s.y = e.clientY, s = s.matrixTransform(t.getScreenCTM().inverse()), [s.x, s.y];
    }
    if (t.getBoundingClientRect) {
      var n = t.getBoundingClientRect();
      return [e.clientX - n.left - t.clientLeft, e.clientY - n.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var Ha = { value: () => {
} };
function Ai() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new Ut(i);
}
function Ut(e) {
  this._ = e;
}
function Ka(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
Ut.prototype = Ai.prototype = {
  constructor: Ut,
  on: function(e, t) {
    var i = this._, s = Ka(e + "", i), n, o = -1, a = s.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((n = (e = s[o]).type) && (n = Ga(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (n = (e = s[o]).type) i[n] = Bi(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = Bi(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Ut(e);
  },
  call: function(e, t) {
    if ((n = arguments.length - 2) > 0) for (var i = new Array(n), s = 0, n, o; s < n; ++s) i[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], s = 0, n = o.length; s < n; ++s) o[s].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var s = this._[e], n = 0, o = s.length; n < o; ++n) s[n].value.apply(t, i);
  }
};
function Ga(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function Bi(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = Ha, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const ci = { capture: !0, passive: !1 };
function ui(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Wa(e) {
  var t = e.document.documentElement, i = ke(e).on("dragstart.drag", ui, ci);
  "onselectstart" in t ? i.on("selectstart.drag", ui, ci) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Ba(e, t) {
  var i = e.document.documentElement, s = ke(e).on("dragstart.drag", null);
  t && (s.on("click.drag", ui, ci), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Ci(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function qn(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function Et() {
}
var It = 0.7, Ht = 1 / It, Qe = "\\s*([+-]?\\d+)\\s*", vt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ya = /^#([0-9a-f]{3,8})$/, ja = new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`), Xa = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), Qa = new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${vt}\\)$`), Za = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${vt}\\)$`), Ja = new RegExp(`^hsl\\(${vt},${Ee},${Ee}\\)$`), er = new RegExp(`^hsla\\(${vt},${Ee},${Ee},${vt}\\)$`), Yi = {
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
Ci(Et, _t, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ji,
  // Deprecated! Use color.formatHex.
  formatHex: ji,
  formatHex8: tr,
  formatHsl: ir,
  formatRgb: Xi,
  toString: Xi
});
function ji() {
  return this.rgb().formatHex();
}
function tr() {
  return this.rgb().formatHex8();
}
function ir() {
  return Fn(this).formatHsl();
}
function Xi() {
  return this.rgb().formatRgb();
}
function _t(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Ya.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Qi(t) : i === 3 ? new de(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Ct(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Ct(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = ja.exec(e)) ? new de(t[1], t[2], t[3], 1) : (t = Xa.exec(e)) ? new de(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Qa.exec(e)) ? Ct(t[1], t[2], t[3], t[4]) : (t = Za.exec(e)) ? Ct(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Ja.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, 1) : (t = er.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, t[4]) : Yi.hasOwnProperty(e) ? Qi(Yi[e]) : e === "transparent" ? new de(NaN, NaN, NaN, 0) : null;
}
function Qi(e) {
  return new de(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ct(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new de(e, t, i, s);
}
function nr(e) {
  return e instanceof Et || (e = _t(e)), e ? (e = e.rgb(), new de(e.r, e.g, e.b, e.opacity)) : new de();
}
function hi(e, t, i, s) {
  return arguments.length === 1 ? nr(e) : new de(e, t, i, s ?? 1);
}
function de(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
Ci(de, hi, qn(Et, {
  brighter(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? It : Math.pow(It, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new de(Ke(this.r), Ke(this.g), Ke(this.b), Kt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Zi,
  // Deprecated! Use color.formatHex.
  formatHex: Zi,
  formatHex8: sr,
  formatRgb: Ji,
  toString: Ji
}));
function Zi() {
  return `#${Fe(this.r)}${Fe(this.g)}${Fe(this.b)}`;
}
function sr() {
  return `#${Fe(this.r)}${Fe(this.g)}${Fe(this.b)}${Fe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ji() {
  const e = Kt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ke(this.r)}, ${Ke(this.g)}, ${Ke(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Kt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ke(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Fe(e) {
  return e = Ke(e), (e < 16 ? "0" : "") + e.toString(16);
}
function en(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ve(e, t, i, s);
}
function Fn(e) {
  if (e instanceof ve) return new ve(e.h, e.s, e.l, e.opacity);
  if (e instanceof Et || (e = _t(e)), !e) return new ve();
  if (e instanceof ve) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), a = NaN, r = o - n, l = (o + n) / 2;
  return r ? (t === o ? a = (i - s) / r + (i < s) * 6 : i === o ? a = (s - t) / r + 2 : a = (t - i) / r + 4, r /= l < 0.5 ? o + n : 2 - o - n, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new ve(a, r, l, e.opacity);
}
function or(e, t, i, s) {
  return arguments.length === 1 ? Fn(e) : new ve(e, t, i, s ?? 1);
}
function ve(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
Ci(ve, or, qn(Et, {
  brighter(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? It : Math.pow(It, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new de(
      ni(e >= 240 ? e - 240 : e + 120, n, s),
      ni(e, n, s),
      ni(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new ve(tn(this.h), Mt(this.s), Mt(this.l), Kt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Kt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${tn(this.h)}, ${Mt(this.s) * 100}%, ${Mt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function tn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Mt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ni(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Vn = (e) => () => e;
function ar(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function rr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function dr(e) {
  return (e = +e) == 1 ? Hn : function(t, i) {
    return i - t ? rr(t, i, e) : Vn(isNaN(t) ? i : t);
  };
}
function Hn(e, t) {
  var i = t - e;
  return i ? ar(e, i) : Vn(isNaN(e) ? t : e);
}
const nn = (function e(t) {
  var i = dr(t);
  function s(n, o) {
    var a = i((n = hi(n)).r, (o = hi(o)).r), r = i(n.g, o.g), l = i(n.b, o.b), c = Hn(n.opacity, o.opacity);
    return function(u) {
      return n.r = a(u), n.g = r(u), n.b = l(u), n.opacity = c(u), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Te(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var pi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, si = new RegExp(pi.source, "g");
function lr(e) {
  return function() {
    return e;
  };
}
function cr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function ur(e, t) {
  var i = pi.lastIndex = si.lastIndex = 0, s, n, o, a = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (s = pi.exec(e)) && (n = si.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), r[a] ? r[a] += o : r[++a] = o), (s = s[0]) === (n = n[0]) ? r[a] ? r[a] += n : r[++a] = n : (r[++a] = null, l.push({ i: a, x: Te(s, n) })), i = si.lastIndex;
  return i < t.length && (o = t.slice(i), r[a] ? r[a] += o : r[++a] = o), r.length < 2 ? l[0] ? cr(l[0].x) : lr(t) : (t = l.length, function(c) {
    for (var u = 0, m; u < t; ++u) r[(m = l[u]).i] = m.x(c);
    return r.join("");
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
function Kn(e, t, i, s, n, o) {
  var a, r, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * i + t * s) && (i -= e * l, s -= t * l), (r = Math.sqrt(i * i + s * s)) && (i /= r, s /= r, l /= r), e * s < t * i && (e = -e, t = -t, l = -l, a = -a), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * sn,
    skewX: Math.atan(l) * sn,
    scaleX: a,
    scaleY: r
  };
}
var Pt;
function hr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? mi : Kn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function pr(e) {
  return e == null || (Pt || (Pt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Pt.setAttribute("transform", e), !(e = Pt.transform.baseVal.consolidate())) ? mi : (e = e.matrix, Kn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Gn(e, t, i, s) {
  function n(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, m, p, f, w) {
    if (c !== m || u !== p) {
      var I = f.push("translate(", null, t, null, i);
      w.push({ i: I - 4, x: Te(c, m) }, { i: I - 2, x: Te(u, p) });
    } else (m || p) && f.push("translate(" + m + t + p + i);
  }
  function a(c, u, m, p) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), p.push({ i: m.push(n(m) + "rotate(", null, s) - 2, x: Te(c, u) })) : u && m.push(n(m) + "rotate(" + u + s);
  }
  function r(c, u, m, p) {
    c !== u ? p.push({ i: m.push(n(m) + "skewX(", null, s) - 2, x: Te(c, u) }) : u && m.push(n(m) + "skewX(" + u + s);
  }
  function l(c, u, m, p, f, w) {
    if (c !== m || u !== p) {
      var I = f.push(n(f) + "scale(", null, ",", null, ")");
      w.push({ i: I - 4, x: Te(c, m) }, { i: I - 2, x: Te(u, p) });
    } else (m !== 1 || p !== 1) && f.push(n(f) + "scale(" + m + "," + p + ")");
  }
  return function(c, u) {
    var m = [], p = [];
    return c = e(c), u = e(u), o(c.translateX, c.translateY, u.translateX, u.translateY, m, p), a(c.rotate, u.rotate, m, p), r(c.skewX, u.skewX, m, p), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, m, p), c = u = null, function(f) {
      for (var w = -1, I = p.length, P; ++w < I; ) m[(P = p[w]).i] = P.x(f);
      return m.join("");
    };
  };
}
var mr = Gn(hr, "px, ", "px)", "deg)"), fr = Gn(pr, ", ", ")", ")"), gr = 1e-12;
function on(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function yr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function wr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const xr = (function e(t, i, s) {
  function n(o, a) {
    var r = o[0], l = o[1], c = o[2], u = a[0], m = a[1], p = a[2], f = u - r, w = m - l, I = f * f + w * w, P, v;
    if (I < gr)
      v = Math.log(p / c) / t, P = function(E) {
        return [
          r + E * f,
          l + E * w,
          c * Math.exp(t * E * v)
        ];
      };
    else {
      var N = Math.sqrt(I), F = (p * p - c * c + s * I) / (2 * c * i * N), _ = (p * p - c * c - s * I) / (2 * p * i * N), x = Math.log(Math.sqrt(F * F + 1) - F), b = Math.log(Math.sqrt(_ * _ + 1) - _);
      v = (b - x) / t, P = function(E) {
        var M = E * v, z = on(x), C = c / (i * N) * (z * wr(t * M + x) - yr(x));
        return [
          r + C * f,
          l + C * w,
          c * z / on(t * M + x)
        ];
      };
    }
    return P.duration = v * 1e3 * t / Math.SQRT2, P;
  }
  return n.rho = function(o) {
    var a = Math.max(1e-3, +o), r = a * a, l = r * r;
    return e(a, r, l);
  }, n;
})(Math.SQRT2, 2, 4);
var tt = 0, ut = 0, rt = 0, Wn = 1e3, Gt, ht, Wt = 0, We = 0, Xt = 0, $t = typeof performance == "object" && performance.now ? performance : Date, Bn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Mi() {
  return We || (Bn(Ir), We = $t.now() + Xt);
}
function Ir() {
  We = 0;
}
function Bt() {
  this._call = this._time = this._next = null;
}
Bt.prototype = Yn.prototype = {
  constructor: Bt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Mi() : +i) + (t == null ? 0 : +t), !this._next && ht !== this && (ht ? ht._next = this : Gt = this, ht = this), this._call = e, this._time = i, fi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, fi());
  }
};
function Yn(e, t, i) {
  var s = new Bt();
  return s.restart(e, t, i), s;
}
function vr() {
  Mi(), ++tt;
  for (var e = Gt, t; e; )
    (t = We - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --tt;
}
function an() {
  We = (Wt = $t.now()) + Xt, tt = ut = 0;
  try {
    vr();
  } finally {
    tt = 0, $r(), We = 0;
  }
}
function _r() {
  var e = $t.now(), t = e - Wt;
  t > Wn && (Xt -= t, Wt = e);
}
function $r() {
  for (var e, t = Gt, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Gt = i);
  ht = e, fi(s);
}
function fi(e) {
  if (!tt) {
    ut && (ut = clearTimeout(ut));
    var t = e - We;
    t > 24 ? (e < 1 / 0 && (ut = setTimeout(an, e - $t.now() - Xt)), rt && (rt = clearInterval(rt))) : (rt || (Wt = $t.now(), rt = setInterval(_r, Wn)), tt = 1, Bn(an));
  }
}
function rn(e, t, i) {
  var s = new Bt();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var br = Ai("start", "end", "cancel", "interrupt"), kr = [], jn = 0, dn = 1, gi = 2, Dt = 3, ln = 4, yi = 5, Lt = 6;
function Qt(e, t, i, s, n, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  Er(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: br,
    tween: kr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: jn
  });
}
function Pi(e, t) {
  var i = _e(e, t);
  if (i.state > jn) throw new Error("too late; already scheduled");
  return i;
}
function Ae(e, t) {
  var i = _e(e, t);
  if (i.state > Dt) throw new Error("too late; already running");
  return i;
}
function _e(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Er(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Yn(o, 0, i.time);
  function o(c) {
    i.state = dn, i.timer.restart(a, i.delay, i.time), i.delay <= c && a(c - i.delay);
  }
  function a(c) {
    var u, m, p, f;
    if (i.state !== dn) return l();
    for (u in s)
      if (f = s[u], f.name === i.name) {
        if (f.state === Dt) return rn(a);
        f.state === ln ? (f.state = Lt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete s[u]) : +u < t && (f.state = Lt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete s[u]);
      }
    if (rn(function() {
      i.state === Dt && (i.state = ln, i.timer.restart(r, i.delay, i.time), r(c));
    }), i.state = gi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === gi) {
      for (i.state = Dt, n = new Array(p = i.tween.length), u = 0, m = -1; u < p; ++u)
        (f = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (n[++m] = f);
      n.length = m + 1;
    }
  }
  function r(c) {
    for (var u = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = yi, 1), m = -1, p = n.length; ++m < p; )
      n[m].call(e, u);
    i.state === yi && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Lt, i.timer.stop(), delete s[t];
    for (var c in s) return;
    delete e.__transition;
  }
}
function zt(e, t) {
  var i = e.__transition, s, n, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((s = i[a]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > gi && s.state < yi, s.state = Lt, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function Sr(e) {
  return this.each(function() {
    zt(this, e);
  });
}
function Ar(e, t) {
  var i, s;
  return function() {
    var n = Ae(this, e), o = n.tween;
    if (o !== i) {
      s = i = o;
      for (var a = 0, r = s.length; a < r; ++a)
        if (s[a].name === t) {
          s = s.slice(), s.splice(a, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function Cr(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Ae(this, e), a = o.tween;
    if (a !== s) {
      n = (s = a).slice();
      for (var r = { name: t, value: i }, l = 0, c = n.length; l < c; ++l)
        if (n[l].name === t) {
          n[l] = r;
          break;
        }
      l === c && n.push(r);
    }
    o.tween = n;
  };
}
function Mr(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = _e(this.node(), i).tween, n = 0, o = s.length, a; n < o; ++n)
      if ((a = s[n]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? Ar : Cr)(i, e, t));
}
function Ni(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Ae(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return _e(n, s).value[t];
  };
}
function Xn(e, t) {
  var i;
  return (typeof t == "number" ? Te : t instanceof _t ? nn : (i = _t(t)) ? (t = i, nn) : ur)(e, t);
}
function Pr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Nr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Tr(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Or(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Rr(e, t, i) {
  var s, n, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = r + "", a === l ? null : a === s && l === n ? o : (n = l, o = t(s = a, r)));
  };
}
function Ur(e, t, i) {
  var s, n, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = r + "", a === l ? null : a === s && l === n ? o : (n = l, o = t(s = a, r)));
  };
}
function Dr(e, t) {
  var i = jt(e), s = i === "transform" ? fr : Xn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Ur : Rr)(i, s, Ni(this, "attr." + e, t)) : t == null ? (i.local ? Nr : Pr)(i) : (i.local ? Or : Tr)(i, s, t));
}
function Lr(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function zr(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function qr(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && zr(e, o)), i;
  }
  return n._value = t, n;
}
function Fr(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && Lr(e, o)), i;
  }
  return n._value = t, n;
}
function Vr(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = jt(e);
  return this.tween(i, (s.local ? qr : Fr)(s, t));
}
function Hr(e, t) {
  return function() {
    Pi(this, e).delay = +t.apply(this, arguments);
  };
}
function Kr(e, t) {
  return t = +t, function() {
    Pi(this, e).delay = t;
  };
}
function Gr(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Hr : Kr)(t, e)) : _e(this.node(), t).delay;
}
function Wr(e, t) {
  return function() {
    Ae(this, e).duration = +t.apply(this, arguments);
  };
}
function Br(e, t) {
  return t = +t, function() {
    Ae(this, e).duration = t;
  };
}
function Yr(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Wr : Br)(t, e)) : _e(this.node(), t).duration;
}
function jr(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ae(this, e).ease = t;
  };
}
function Xr(e) {
  var t = this._id;
  return arguments.length ? this.each(jr(t, e)) : _e(this.node(), t).ease;
}
function Qr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ae(this, e).ease = i;
  };
}
function Zr(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Qr(this._id, e));
}
function Jr(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, r = s[n] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new Pe(s, this._parents, this._name, this._id);
}
function ed(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), a = new Array(s), r = 0; r < o; ++r)
    for (var l = t[r], c = i[r], u = l.length, m = a[r] = new Array(u), p, f = 0; f < u; ++f)
      (p = l[f] || c[f]) && (m[f] = p);
  for (; r < s; ++r)
    a[r] = t[r];
  return new Pe(a, this._parents, this._name, this._id);
}
function td(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function id(e, t, i) {
  var s, n, o = td(t) ? Pi : Ae;
  return function() {
    var a = o(this, e), r = a.on;
    r !== s && (n = (s = r).copy()).on(t, i), a.on = n;
  };
}
function nd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? _e(this.node(), i).on.on(e) : this.each(id(i, e, t));
}
function sd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function od() {
  return this.on("end.remove", sd(this._id));
}
function ad(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ei(e));
  for (var s = this._groups, n = s.length, o = new Array(n), a = 0; a < n; ++a)
    for (var r = s[a], l = r.length, c = o[a] = new Array(l), u, m, p = 0; p < l; ++p)
      (u = r[p]) && (m = e.call(u, u.__data__, p, r)) && ("__data__" in u && (m.__data__ = u.__data__), c[p] = m, Qt(c[p], t, i, p, c, _e(u, i)));
  return new Pe(o, this._parents, t, i);
}
function rd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Cn(e));
  for (var s = this._groups, n = s.length, o = [], a = [], r = 0; r < n; ++r)
    for (var l = s[r], c = l.length, u, m = 0; m < c; ++m)
      if (u = l[m]) {
        for (var p = e.call(u, u.__data__, m, l), f, w = _e(u, i), I = 0, P = p.length; I < P; ++I)
          (f = p[I]) && Qt(f, t, i, I, p, w);
        o.push(p), a.push(u);
      }
  return new Pe(o, a, t, i);
}
var dd = kt.prototype.constructor;
function ld() {
  return new dd(this._groups, this._parents);
}
function cd(e, t) {
  var i, s, n;
  return function() {
    var o = et(this, e), a = (this.style.removeProperty(e), et(this, e));
    return o === a ? null : o === i && a === s ? n : n = t(i = o, s = a);
  };
}
function Qn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ud(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = et(this, e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function hd(e, t, i) {
  var s, n, o;
  return function() {
    var a = et(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), et(this, e))), a === l ? null : a === s && l === n ? o : (n = l, o = t(s = a, r));
  };
}
function pd(e, t) {
  var i, s, n, o = "style." + t, a = "end." + o, r;
  return function() {
    var l = Ae(this, e), c = l.on, u = l.value[o] == null ? r || (r = Qn(t)) : void 0;
    (c !== i || n !== u) && (s = (i = c).copy()).on(a, n = u), l.on = s;
  };
}
function md(e, t, i) {
  var s = (e += "") == "transform" ? mr : Xn;
  return t == null ? this.styleTween(e, cd(e, s)).on("end.style." + e, Qn(e)) : typeof t == "function" ? this.styleTween(e, hd(e, s, Ni(this, "style." + e, t))).each(pd(this._id, e)) : this.styleTween(e, ud(e, s, t), i).on("end.style." + e, null);
}
function fd(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function gd(e, t, i) {
  var s, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (s = (n = a) && fd(e, a, i)), s;
  }
  return o._value = t, o;
}
function yd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, gd(e, t, i ?? ""));
}
function wd(e) {
  return function() {
    this.textContent = e;
  };
}
function xd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Id(e) {
  return this.tween("text", typeof e == "function" ? xd(Ni(this, "text", e)) : wd(e == null ? "" : e + ""));
}
function vd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function _d(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && vd(n)), t;
  }
  return s._value = e, s;
}
function $d(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, _d(e));
}
function bd() {
  for (var e = this._name, t = this._id, i = Zn(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], r = a.length, l, c = 0; c < r; ++c)
      if (l = a[c]) {
        var u = _e(l, t);
        Qt(l, e, i, c, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Pe(s, this._parents, e, i);
}
function kd() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, a) {
    var r = { value: a }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var c = Ae(this, s), u = c.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), c.on = t;
    }), n === 0 && o();
  });
}
var Ed = 0;
function Pe(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Zn() {
  return ++Ed;
}
var Ce = kt.prototype;
Pe.prototype = {
  constructor: Pe,
  select: ad,
  selectAll: rd,
  selectChild: Ce.selectChild,
  selectChildren: Ce.selectChildren,
  filter: Jr,
  merge: ed,
  selection: ld,
  transition: bd,
  call: Ce.call,
  nodes: Ce.nodes,
  node: Ce.node,
  size: Ce.size,
  empty: Ce.empty,
  each: Ce.each,
  on: nd,
  attr: Dr,
  attrTween: Vr,
  style: md,
  styleTween: yd,
  text: Id,
  textTween: $d,
  remove: od,
  tween: Mr,
  delay: Gr,
  duration: Yr,
  ease: Xr,
  easeVarying: Zr,
  end: kd,
  [Symbol.iterator]: Ce[Symbol.iterator]
};
function Sd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ad = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Sd
};
function Cd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Md(e) {
  var t, i;
  e instanceof Pe ? (t = e._id, e = e._name) : (t = Zn(), (i = Ad).time = Mi(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && Qt(l, e, t, c, a, i || Cd(l, t));
  return new Pe(s, this._parents, e, t);
}
kt.prototype.interrupt = Sr;
kt.prototype.transition = Md;
const Nt = (e) => () => e;
function Pd(e, {
  sourceEvent: t,
  target: i,
  transform: s,
  dispatch: n
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: s, enumerable: !0, configurable: !0 },
    _: { value: n }
  });
}
function Me(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Me.prototype = {
  constructor: Me,
  scale: function(e) {
    return e === 1 ? this : new Me(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Me(this.k, this.x + this.k * e, this.y + this.k * t);
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
var ft = new Me(1, 0, 0);
Me.prototype;
function oi(e) {
  e.stopImmediatePropagation();
}
function dt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Nd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Td() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function cn() {
  return this.__zoom || ft;
}
function Od(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Rd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ud(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function Dd() {
  var e = Nd, t = Td, i = Ud, s = Od, n = Rd, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = xr, c = Ai("start", "zoom", "end"), u, m, p, f = 500, w = 150, I = 0, P = 10;
  function v(h) {
    h.property("__zoom", cn).on("wheel.zoom", M, { passive: !1 }).on("mousedown.zoom", z).on("dblclick.zoom", C).filter(n).on("touchstart.zoom", U).on("touchmove.zoom", B).on("touchend.zoom touchcancel.zoom", Y).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(h, y, g, $) {
    var O = h.selection ? h.selection() : h;
    O.property("__zoom", cn), h !== O ? x(h, y, g, $) : O.interrupt().each(function() {
      b(this, arguments).event($).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, v.scaleBy = function(h, y, g, $) {
    v.scaleTo(h, function() {
      var O = this.__zoom.k, L = typeof y == "function" ? y.apply(this, arguments) : y;
      return O * L;
    }, g, $);
  }, v.scaleTo = function(h, y, g, $) {
    v.transform(h, function() {
      var O = t.apply(this, arguments), L = this.__zoom, k = g == null ? _(O) : typeof g == "function" ? g.apply(this, arguments) : g, S = L.invert(k), R = typeof y == "function" ? y.apply(this, arguments) : y;
      return i(F(N(L, R), k, S), O, a);
    }, g, $);
  }, v.translateBy = function(h, y, g, $) {
    v.transform(h, function() {
      return i(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), a);
    }, null, $);
  }, v.translateTo = function(h, y, g, $, O) {
    v.transform(h, function() {
      var L = t.apply(this, arguments), k = this.__zoom, S = $ == null ? _(L) : typeof $ == "function" ? $.apply(this, arguments) : $;
      return i(ft.translate(S[0], S[1]).scale(k.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), L, a);
    }, $, O);
  };
  function N(h, y) {
    return y = Math.max(o[0], Math.min(o[1], y)), y === h.k ? h : new Me(y, h.x, h.y);
  }
  function F(h, y, g) {
    var $ = y[0] - g[0] * h.k, O = y[1] - g[1] * h.k;
    return $ === h.x && O === h.y ? h : new Me(h.k, $, O);
  }
  function _(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function x(h, y, g, $) {
    h.on("start.zoom", function() {
      b(this, arguments).event($).start();
    }).on("interrupt.zoom end.zoom", function() {
      b(this, arguments).event($).end();
    }).tween("zoom", function() {
      var O = this, L = arguments, k = b(O, L).event($), S = t.apply(O, L), R = g == null ? _(S) : typeof g == "function" ? g.apply(O, L) : g, Z = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), J = O.__zoom, ce = typeof y == "function" ? y.apply(O, L) : y, ye = l(J.invert(R).concat(Z / J.k), ce.invert(R).concat(Z / ce.k));
      return function(ue) {
        if (ue === 1) ue = ce;
        else {
          var we = ye(ue), it = Z / we[2];
          ue = new Me(it, R[0] - we[0] * it, R[1] - we[1] * it);
        }
        k.zoom(null, ue);
      };
    });
  }
  function b(h, y, g) {
    return !g && h.__zooming || new E(h, y);
  }
  function E(h, y) {
    this.that = h, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = t.apply(h, y), this.taps = 0;
  }
  E.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, y) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = y.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = y.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = y.invert(this.touch1[0])), this.that.__zoom = y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var y = ke(this.that).datum();
      c.call(
        h,
        this.that,
        new Pd(h, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: c
        }),
        y
      );
    }
  };
  function M(h, ...y) {
    if (!e.apply(this, arguments)) return;
    var g = b(this, y).event(h), $ = this.__zoom, O = Math.max(o[0], Math.min(o[1], $.k * Math.pow(2, s.apply(this, arguments)))), L = De(h);
    if (g.wheel)
      (g.mouse[0][0] !== L[0] || g.mouse[0][1] !== L[1]) && (g.mouse[1] = $.invert(g.mouse[0] = L)), clearTimeout(g.wheel);
    else {
      if ($.k === O) return;
      g.mouse = [L, $.invert(L)], zt(this), g.start();
    }
    dt(h), g.wheel = setTimeout(k, w), g.zoom("mouse", i(F(N($, O), g.mouse[0], g.mouse[1]), g.extent, a));
    function k() {
      g.wheel = null, g.end();
    }
  }
  function z(h, ...y) {
    if (p || !e.apply(this, arguments)) return;
    var g = h.currentTarget, $ = b(this, y, !0).event(h), O = ke(h.view).on("mousemove.zoom", R, !0).on("mouseup.zoom", Z, !0), L = De(h, g), k = h.clientX, S = h.clientY;
    Wa(h.view), oi(h), $.mouse = [L, this.__zoom.invert(L)], zt(this), $.start();
    function R(J) {
      if (dt(J), !$.moved) {
        var ce = J.clientX - k, ye = J.clientY - S;
        $.moved = ce * ce + ye * ye > I;
      }
      $.event(J).zoom("mouse", i(F($.that.__zoom, $.mouse[0] = De(J, g), $.mouse[1]), $.extent, a));
    }
    function Z(J) {
      O.on("mousemove.zoom mouseup.zoom", null), Ba(J.view, $.moved), dt(J), $.event(J).end();
    }
  }
  function C(h, ...y) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, $ = De(h.changedTouches ? h.changedTouches[0] : h, this), O = g.invert($), L = g.k * (h.shiftKey ? 0.5 : 2), k = i(F(N(g, L), $, O), t.apply(this, y), a);
      dt(h), r > 0 ? ke(this).transition().duration(r).call(x, k, $, h) : ke(this).call(v.transform, k, $, h);
    }
  }
  function U(h, ...y) {
    if (e.apply(this, arguments)) {
      var g = h.touches, $ = g.length, O = b(this, y, h.changedTouches.length === $).event(h), L, k, S, R;
      for (oi(h), k = 0; k < $; ++k)
        S = g[k], R = De(S, this), R = [R, this.__zoom.invert(R), S.identifier], O.touch0 ? !O.touch1 && O.touch0[2] !== R[2] && (O.touch1 = R, O.taps = 0) : (O.touch0 = R, L = !0, O.taps = 1 + !!u);
      u && (u = clearTimeout(u)), L && (O.taps < 2 && (m = R[0], u = setTimeout(function() {
        u = null;
      }, f)), zt(this), O.start());
    }
  }
  function B(h, ...y) {
    if (this.__zooming) {
      var g = b(this, y).event(h), $ = h.changedTouches, O = $.length, L, k, S, R;
      for (dt(h), L = 0; L < O; ++L)
        k = $[L], S = De(k, this), g.touch0 && g.touch0[2] === k.identifier ? g.touch0[0] = S : g.touch1 && g.touch1[2] === k.identifier && (g.touch1[0] = S);
      if (k = g.that.__zoom, g.touch1) {
        var Z = g.touch0[0], J = g.touch0[1], ce = g.touch1[0], ye = g.touch1[1], ue = (ue = ce[0] - Z[0]) * ue + (ue = ce[1] - Z[1]) * ue, we = (we = ye[0] - J[0]) * we + (we = ye[1] - J[1]) * we;
        k = N(k, Math.sqrt(ue / we)), S = [(Z[0] + ce[0]) / 2, (Z[1] + ce[1]) / 2], R = [(J[0] + ye[0]) / 2, (J[1] + ye[1]) / 2];
      } else if (g.touch0) S = g.touch0[0], R = g.touch0[1];
      else return;
      g.zoom("touch", i(F(k, S, R), g.extent, a));
    }
  }
  function Y(h, ...y) {
    if (this.__zooming) {
      var g = b(this, y).event(h), $ = h.changedTouches, O = $.length, L, k;
      for (oi(h), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, f), L = 0; L < O; ++L)
        k = $[L], g.touch0 && g.touch0[2] === k.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === k.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (k = De(k, this), Math.hypot(m[0] - k[0], m[1] - k[1]) < P)) {
        var S = ke(this).on("dblclick.zoom");
        S && S.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : Nt(+h), v) : s;
  }, v.filter = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : Nt(!!h), v) : e;
  }, v.touchable = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : Nt(!!h), v) : n;
  }, v.extent = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : Nt([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), v) : t;
  }, v.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], v) : [o[0], o[1]];
  }, v.translateExtent = function(h) {
    return arguments.length ? (a[0][0] = +h[0][0], a[1][0] = +h[1][0], a[0][1] = +h[0][1], a[1][1] = +h[1][1], v) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, v.constrain = function(h) {
    return arguments.length ? (i = h, v) : i;
  }, v.duration = function(h) {
    return arguments.length ? (r = +h, v) : r;
  }, v.interpolate = function(h) {
    return arguments.length ? (l = h, v) : l;
  }, v.on = function() {
    var h = c.on.apply(c, arguments);
    return h === c ? v : h;
  }, v.clickDistance = function(h) {
    return arguments.length ? (I = (h = +h) * h, v) : Math.sqrt(I);
  }, v.tapDistance = function(h) {
    return arguments.length ? (P = +h, v) : P;
  }, v;
}
var Ld = Object.defineProperty, zd = Object.getOwnPropertyDescriptor, oe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? zd(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Ld(t, i, n), n;
};
function qd(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, a = s.x - i.x, r = s.y - i.y, l = n * r - o * a;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * r - (i.y - e.y) * a) / l, u = ((i.x - e.x) * o - (i.y - e.y) * n) / l;
  return c <= 0.02 || c >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + c * n, y: e.y + c * o, t: c };
}
function Fd(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), r = t.x + a * s, l = t.y + a * n;
  return { dist: Math.hypot(e.x - r, e.y - l), t: a };
}
function Vd(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], a = e[n + 1], r = Math.hypot(a.x - o.x, a.y - o.y) || 1, l = (a.x - o.x) / r, c = (a.y - o.y) / r, u = t.map(([p, f]) => qd(o, a, p, f)).filter((p) => p !== null).filter((p) => p.t * r > i + 2 && (1 - p.t) * r > i + 2).sort((p, f) => p.t - f.t);
    let m = -1 / 0;
    for (const p of u)
      p.t * r - i <= m + 2 || (s += ` L ${p.x - l * i} ${p.y - c * i}`, s += ` A ${i} ${i} 0 0 1 ${p.x + l * i} ${p.y + c * i}`, m = p.t * r + i);
    s += ` L ${a.x} ${a.y}`;
  }
  return s;
}
const Tt = {
  component: W`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: W`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: W`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: W`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: W`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: W`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: W`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: W`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: W`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: W`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: W`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: W`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: W`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: W`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: W`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let ie = class extends He {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = ft, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const n = this.scene.nodes.filter((o) => this.selectedIds.includes(o.id)).map((o) => ({ id: o.id, kind: o.kind }));
            n.length && this.emit("delete-selection-requested", { items: n });
            return;
          }
          if (this._selectedWaypoint) {
            const n = this.scene.edges.find((o) => o.id === this._selectedWaypoint.edgeId);
            n && (e.preventDefault(), this.removeWaypoint(n, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((n) => n.id === this.selectedId), i = this.scene.nodes.find((n) => n.id === this.selectedId);
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case" && i.kind !== "external-table" && i.kind !== "mcp-server" && i.kind !== "api" && i.kind !== "proxy-api" && i.kind !== "api-operation")
            return;
          const s = t ?? i;
          s && (e.preventDefault(), this.emit("delete-requested", {
            elementType: t ? "edge" : "node",
            id: s.id,
            kind: s.kind
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
    this._zoomBehavior = Dd().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const s = this.getBoundingClientRect();
    if (s.width === 0 || s.height === 0) return;
    const n = Math.min(...t.map((u) => u.x - u.w / 2)) - e, o = Math.max(...t.map((u) => u.x + u.w / 2)) + e, a = Math.min(...t.map((u) => u.y - u.h / 2)) - e, r = Math.max(...t.map((u) => u.y + u.h / 2)) + e, l = Math.max(0.15, Math.min(s.width / (o - n), s.height / (r - a), 1.25)), c = ft.translate(s.width / 2 - l * (n + o) / 2, s.height / 2 - l * (a + r) / 2).scale(l);
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
    var i, s, n;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let o = e.parentId; o; o = (s = this.scene.nodes.find((a) => a.id === o)) == null ? void 0 : s.parentId) {
      const a = this.scene.nodes.find((l) => l.id === o);
      if (!a) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - a.x), y: e.y + (this._dragPos.y - a.y) };
      const r = (n = this._dragGroup) == null ? void 0 : n.get(o);
      if (r)
        return { x: e.x + (r.x - a.x), y: e.y + (r.y - a.y) };
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
      const s = this.scene.nodes.find((n) => n.id === e.parentId);
      if (s) {
        const n = this.nodePos(s), o = n.x - s.w / 2 + 10 + e.w / 2, a = n.x + s.w / 2 - 10 - e.w / 2, r = n.y - s.h / 2 + 34 + e.h / 2, l = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), a), i = Math.min(Math.max(i, r), l);
      }
    }
    return { id: e.id, x: t, y: i };
  }
  /**
   * Topmost node under the pointer. elementFromPoint alone is not enough: an
   * edge's fat invisible hit-line can sit on top of a node and swallow the hit.
   */
  nodeIdAt(e) {
    return this.nodeIdAtClient(e.clientX, e.clientY);
  }
  /** Topmost node at a client-space point (also used by palette drops). */
  nodeIdAtClient(e, t) {
    var s, n;
    const i = ((s = this.shadowRoot) == null ? void 0 : s.elementsFromPoint(e, t)) ?? [];
    for (const o of i) {
      const a = (n = o.closest) == null ? void 0 : n.call(o, "[data-node-id]");
      if (a) return a.getAttribute("data-node-id");
    }
    return null;
  }
  /** Scene coordinates for a client-space point (palette drops). */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect();
    return {
      x: (e - i.left - this._t.x) / this._t.k,
      y: (t - i.top - this._t.y) / this._t.k
    };
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const i = this.toScene(e), s = this.nodePos(t);
    let n = !1;
    const o = new Set(this.selectedIds), a = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (p) => o.has(p.id) && !(p.parentId && o.has(p.parentId))
    ) : null, r = a ? new Map(a.map((p) => [p.id, this.nodePos(p)])) : null, l = (p) => (p.shiftKey || p.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, c = (p) => {
      const f = this.nodeIdAt(p), w = f && f !== t.id ? this.scene.nodes.find((I) => I.id === f) : void 0;
      return w ? w.kind === "external-system" ? w.id : w.parentId ?? null : null;
    }, u = (p) => {
      if ((p.buttons & 1) === 0) {
        m(p);
        return;
      }
      const f = this.toScene(p), w = f.x - i.x, I = f.y - i.y;
      if (!(!n && Math.hypot(w, I) < 3 / this._t.k))
        if (n = !0, a && r) {
          const P = /* @__PURE__ */ new Map();
          for (const v of a) {
            const N = r.get(v.id), F = this.clampToParent(v, N.x + w, N.y + I);
            P.set(v.id, { x: F.x, y: F.y });
          }
          this._dragGroup = P;
        } else l(p) ? (this._dragPos = { id: t.id, x: s.x + w, y: s.y + I }, this._hoverNodeId = c(p)) : (this._dragPos = this.clampToParent(t, s.x + w, s.y + I), this._hoverNodeId = null);
    }, m = (p) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, w]) => ({ id: f, x: w.x, y: w.y }))
        });
      else if (n && this._dragPos) {
        if (l(p)) {
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
    window.addEventListener("pointermove", u), window.addEventListener("pointerup", m);
  }
  // ---- container resize ----------------------------------------------------
  /**
   * Corner-handle drag resizes a container. The dragged corner follows the
   * pointer while the opposite corner stays anchored; with Shift held the
   * resize is symmetric about the centre. Children never leave the box: they
   * keep their absolute position, so each edge stops at the outermost child.
   */
  onResizePointerDown(e, t, i, s) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation(), this.focus();
    const n = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((I) => I.parentId === t.id), l = Math.min(...r.map((I) => I.x - I.w / 2)), c = Math.max(...r.map((I) => I.x + I.w / 2)), u = Math.min(...r.map((I) => I.y - I.h / 2)), m = Math.max(...r.map((I) => I.y + I.h / 2)), p = ps(
      r.map((I) => ({ dx: I.x - a.x, dy: I.y - a.y, w: I.w, h: I.h })),
      { w: n, h: o }
    ), f = (I) => {
      if ((I.buttons & 1) === 0) {
        w();
        return;
      }
      const P = this.toScene(I);
      if (I.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(p.w, 2 * Math.abs(P.x - a.x)),
          h: Math.max(p.h, 2 * Math.abs(P.y - a.y))
        };
        return;
      }
      const v = a.x - i * a.w / 2, N = a.y - s * a.h / 2, F = i > 0 ? Math.max(P.x, v + n, r.length ? c + 10 : -1 / 0) : Math.min(P.x, v - n, r.length ? l - 10 : 1 / 0), _ = s > 0 ? Math.max(P.y, N + o, r.length ? m + 10 : -1 / 0) : Math.min(P.y, N - o, r.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (v + F) / 2,
        y: (N + _) / 2,
        w: Math.abs(F - v),
        h: Math.abs(_ - N)
      };
    }, w = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", w), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", w);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const s = (o) => {
      if ((o.buttons & 1) === 0) {
        window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const a = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: a.x, y: a.y }, this._hoverNodeId = this.nodeIdAt(o);
    }, n = (o) => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n);
      const a = this.nodeIdAt(o);
      a && a !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: a,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", n);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), o = t - s, a = i - n, r = e.w / 2, l = e.h / 2;
    if (o === 0 && a === 0) return { x: s, y: n };
    const c = 1 / Math.max(Math.abs(o) / r, Math.abs(a) / l);
    return { x: s + o * c, y: n + a * c };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(e) {
    const t = [e.sourceId, e.targetId].sort().join("|"), i = this.scene.edges.filter(
      (n) => [n.sourceId, n.targetId].sort().join("|") === t
    );
    return i.length < 2 ? 0 : (i.findIndex((n) => n.id === e.id) - (i.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(e) {
    const t = this.scene.nodes.find((u) => u.id === e.sourceId), i = this.scene.nodes.find((u) => u.id === e.targetId);
    if (!t || !i) return null;
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), a = s[0] ?? o, r = s[s.length - 1] ?? n;
    let l = this.borderPoint(t, a.x, a.y), c = this.borderPoint(i, r.x, r.y);
    if (!s.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(c.x - l.x, c.y - l.y) || 1, p = -(c.y - l.y) / m * u, f = (c.x - l.x) / m * u;
        l = { x: l.x + p, y: l.y + f }, c = { x: c.x + p, y: c.y + f };
      }
    }
    return [l, ...s, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (a) => {
      if (!this._wpDrag) return;
      s = !0;
      const r = this.toScene(a), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: l };
    }, o = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = Fd(t, e[s], e[s + 1]);
      n < i.dist && (i = { seg: s, dist: n });
    }
    return i.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, i) {
    const s = this.nearestSegment(t, i), n = [...this.edgePoints[e.id] ?? []];
    n.splice(s, 0, i), this._selectedWaypoint = { edgeId: e.id, index: s }, this.emit("edge-points-changed", { id: e.id, points: n });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const s = this.toScene(e), n = this.nearestSegment(i, s);
    let o = !1;
    const a = (l) => {
      if ((l.buttons & 1) === 0) {
        r();
        return;
      }
      const c = this.toScene(l);
      if (o) {
        if (this._wpDrag) {
          const u = [...this._wpDrag.points];
          u[n] = c, this._wpDrag = { ...this._wpDrag, points: u };
        }
      } else {
        if (Math.hypot(c.x - s.x, c.y - s.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const u = [...this.edgePoints[t.id] ?? []];
        u.splice(n, 0, c), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: u, index: n };
      }
    }, r = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", r), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", r);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((s) => `${s.x},${s.y}`).join(" ");
    return W`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${i}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(s) => {
      s.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(s) => {
      s.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(s));
    }}
              @pointerdown=${(s) => this.onEdgeHitPointerDown(s, e, t)}>
          ${e.tooltip ? W`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, o = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), r = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, l = t.slice(1, -1);
    return W`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Vd(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? W`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${s}
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
        ${n ? l.map((c, u) => {
      var p;
      const m = ((p = this._selectedWaypoint) == null ? void 0 : p.edgeId) === e.id && this._selectedWaypoint.index === u;
      return W`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(f) => {
        f.button === 0 && (f.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: u }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], u));
      }}
                        @dblclick=${(f) => {
        f.stopPropagation(), this.removeWaypoint(e, u);
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
    var p, f, w;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, r = ((p = this._resize) == null ? void 0 : p.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = r / 2, u = l / 2, m = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return W`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (w = this._dragGroup) != null && w.has(e.id) ? "none" : "auto"}
         @pointerdown=${(I) => this.onNodePointerDown(I, e)}
         @dblclick=${(I) => {
      I.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? W`<rect x=${-c - 4} y=${-u - 4} width=${r + 8} height=${l + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-u} width=${r} height=${l} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? W`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? W`<text x=${-c} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && Tt[e.symbol] && !a ? W`<g transform="translate(${c - 17}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && Tt[e.symbol] ? W`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? W`
              <foreignObject x=${-c + 6} y=${o ? -u + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(I) => I.stopPropagation()}
                  @keydown=${(I) => {
      I.stopPropagation(), I.key === "Enter" && this.commitRename(e, I.target.value), I.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(I) => this.commitRename(e, I.target.value)}
                />
              </foreignObject>` : a ? W`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? W`<text x=${-c + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : W`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? W`<line x1=${-c + 8} y1=${-u + 28} x2=${c - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (a ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, u],
      [0, -u]
    ].map(
      ([I, P]) => W`
                <circle data-handle cx=${I} cy=${P} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([I, P]) => W`
                <rect data-resize x=${I * c - 6.5} y=${P * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${I * P > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, I, P)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return W``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return W``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return W`
      <line x1=${t.x} y1=${t.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let i = !1;
    const s = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), this._rubber = null;
    }, n = (a) => {
      if ((a.buttons & 1) === 0) {
        s();
        return;
      }
      const r = this.toScene(a);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, o = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a, b: r } = this._rubber, l = Math.min(a.x, r.x), c = Math.max(a.x, r.x), u = Math.min(a.y, r.y), m = Math.max(a.y, r.y), p = this.scene.nodes.filter((f) => {
          const w = this.nodePos(f);
          return w.x >= l && w.x <= c && w.y >= u && w.y <= m;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: p });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return W``;
    const { a: e, b: t } = this._rubber;
    return W`
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
    const i = Math.min(...t.map((a) => a.x - a.w / 2)) - e, s = Math.max(...t.map((a) => a.x + a.w / 2)) + e, n = Math.min(...t.map((a) => a.y - a.h / 2)) - e, o = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: i, minY: n, w: s - i, h: o - n };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), n = this._t.k, o = ft.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    ke(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, o = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return T``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, r = n.width / this._t.k, l = n.height / this._t.k;
    return T`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(c) => {
      c.stopPropagation();
      try {
        c.currentTarget.setPointerCapture(c.pointerId);
      } catch {
      }
      this.onMinimapPointer(c, e, s);
    }}
        @pointermove=${(c) => {
      var u, m;
      (m = (u = c.currentTarget).hasPointerCapture) != null && m.call(u, c.pointerId) && this.onMinimapPointer(c, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const u = this.nodePos(c);
      return W`<rect
              x=${(u.x - c.w / 2 - e.minX) * s}
              y=${(u.y - c.h / 2 - e.minY) * s}
              width=${Math.max(2, c.w * s)}
              height=${Math.max(2, c.h * s)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * s}
            y=${(a - e.minY) * s}
            width=${r * s}
            height=${l * s}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((n) => n.color ?? "#64748b"))], t = [], i = [], s = [];
    return this.scene.edges.forEach((n) => {
      const o = this.edgePolyline(n);
      if (o) {
        i.push(this.renderEdgeHit(n, o)), s.push(this.renderEdgeInk(n, o, [...t]));
        for (let a = 0; a < o.length - 1; a++) t.push([o[a], o[a + 1]]);
      }
    }), T`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(n) => {
      const o = n.target;
      o.closest("[data-node-id]") || o.closest("[data-edge-id]") || this._spaceDown || n.button !== 0 || (n.buttons & 1) !== 0 && this.startRubberBand(n);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (n) => W`
              <marker id="arrow-${this.markerId(n)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${n}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${i}
          ${this.scene.nodes.filter((n) => !n.parentId).map((n) => this.renderNode(n))}
          ${this.scene.nodes.filter((n) => n.parentId).map((n) => this.renderNode(n))}
          ${s}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
ie.styles = _i`
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
oe([
  Se({ attribute: !1 })
], ie.prototype, "scene", 2);
oe([
  Se({ attribute: !1 })
], ie.prototype, "selectedId", 2);
oe([
  Se({ attribute: !1 })
], ie.prototype, "selectedIds", 2);
oe([
  Se({ type: Boolean })
], ie.prototype, "connectable", 2);
oe([
  Se({ attribute: !1 })
], ie.prototype, "edgePoints", 2);
oe([
  D()
], ie.prototype, "_t", 2);
oe([
  D()
], ie.prototype, "_dragPos", 2);
oe([
  D()
], ie.prototype, "_dragGroup", 2);
oe([
  D()
], ie.prototype, "_pendingLink", 2);
oe([
  D()
], ie.prototype, "_hoverNodeId", 2);
oe([
  D()
], ie.prototype, "_editingId", 2);
oe([
  D()
], ie.prototype, "_spaceDown", 2);
oe([
  D()
], ie.prototype, "_wpDrag", 2);
oe([
  D()
], ie.prototype, "_selectedWaypoint", 2);
oe([
  D()
], ie.prototype, "_resize", 2);
oe([
  D()
], ie.prototype, "_rubber", 2);
ie = oe([
  ki("modux-canvas")
], ie);
const H = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function pe(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function te(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Be = (e) => e.trim().toLowerCase();
function Hd(e, t) {
  var z, C, U, B, Y;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((h) => [h.id, h.name])), n = e.modules.flatMap(
    (h) => (h.useCases ?? []).map((y) => ({ ...y, moduleId: h.id }))
  ), o = new Set(n.map((h) => h.id)), a = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((h) => (h.domainServices ?? []).map((y) => y.id))
  ), l = e.modules.flatMap(
    (h) => (h.domainEvents ?? []).map((y) => ({ ...y, moduleId: h.id, application: !1 }))
  ), c = e.modules.flatMap(
    (h) => (h.applicationEvents ?? []).map((y) => ({ ...y, moduleId: h.id, application: !0 }))
  ), u = e.modules.flatMap(
    (h) => (h.readModels ?? []).map((y) => ({ ...y, moduleId: h.id }))
  );
  for (const h of n)
    pe(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: H.command.w,
      h: H.command.h,
      kind: "use-case",
      symbol: h.policy ? "flow" : "gear",
      fill: h.policy ? H.policy.fill : H.command.fill,
      stroke: h.policy ? H.policy.stroke : H.command.stroke,
      badge: h.policy ? "POLICY" : "COMANDO",
      tooltip: h.policy ? `${h.name} — policy de ${s.get(h.moduleId) ?? h.moduleId} (reacción, no caso de negocio)` : `${h.name} — caso de uso de ${s.get(h.moduleId) ?? h.moduleId}`
    });
  for (const h of a)
    pe(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: H.aggregate.w,
      h: H.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: H.aggregate.fill,
      stroke: H.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${h.name} — agregado de ${s.get(h.moduleId) ?? h.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const h of [...l, ...c])
    pe(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: H.event.w,
      h: H.event.h,
      kind: h.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: H.event.fill,
      stroke: H.event.stroke,
      badge: h.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${h.name} — evento de ${s.get(h.moduleId) ?? h.moduleId}`
    }), m.set(Be(h.name), h.id);
  const p = (h) => {
    if (!h || !h.trim()) return null;
    const y = m.get(Be(h));
    if (y) return y;
    const g = `evname:${Be(h)}`;
    return pe(i, {
      id: g,
      label: h,
      x: 0,
      y: 0,
      w: H.event.w,
      h: H.event.h,
      kind: "event-name",
      symbol: "event",
      fill: H.event.fill,
      stroke: H.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${h} — referenciado por nombre, sin evento declarado en el catálogo`
    }), g;
  }, f = (h) => {
    const y = u.find(($) => $.id === h.id) ?? u.find(($) => h.name && Be($.name) === Be(h.name)), g = (y == null ? void 0 : y.id) ?? (h.id || (h.name ? `rm:${Be(h.name)}` : null));
    return g ? (pe(i, {
      id: g,
      label: (y == null ? void 0 : y.name) ?? h.name ?? g,
      x: 0,
      y: 0,
      w: H.readModel.w,
      h: H.readModel.h,
      kind: y ? "read-model" : "derived-read-model",
      fill: H.readModel.fill,
      stroke: H.readModel.stroke,
      dashed: !y,
      badge: "READ MODEL"
    }), g) : null;
  };
  for (const h of e.actorUses ?? []) {
    if (!o.has(h.targetId)) continue;
    const y = (e.actors ?? []).find((g) => g.id === h.actorId);
    y && (pe(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: H.actor.w,
      h: H.actor.h,
      kind: "actor",
      symbol: "person",
      fill: H.actor.fill,
      stroke: H.actor.stroke,
      badge: "ACTOR"
    }), te(i, {
      id: `es-actor:${y.id}->${h.targetId}`,
      sourceId: y.id,
      targetId: h.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const h of e.aiAgents ?? []) {
    const y = (e.agentUses ?? []).filter((k) => k.agentId === h.id), g = (e.agentExternalUses ?? []).filter((k) => k.agentId === h.id), $ = (e.agentRags ?? []).filter((k) => k.agentId === h.id), O = (e.agentMcpUses ?? []).filter((k) => k.agentId === h.id), L = (e.agentGatewayUses ?? []).some((k) => k.agentId === h.id) || (e.agentApiOpUses ?? []).some((k) => k.agentId === h.id) || (e.agentQueryUses ?? []).some((k) => k.agentId === h.id) || (e.agentDelegations ?? []).some((k) => k.agentId === h.id) || (e.agentTriggers ?? []).some((k) => k.agentId === h.id);
    if (!(!y.length && !g.length && !$.length && !O.length && !L)) {
      pe(i, {
        id: h.id,
        label: h.name,
        x: 0,
        y: 0,
        w: H.actor.w,
        h: H.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${h.name} — agente de IA (consume por MCP)`
      });
      for (const k of y)
        o.has(k.useCaseId) && te(i, {
          id: `es-agent:${h.id}->${k.useCaseId}`,
          sourceId: h.id,
          targetId: k.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const k of g) {
        const S = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === k.externalUseCaseId)
        );
        if (!S) continue;
        const R = (z = (S.useCases ?? []).find((Z) => Z.id === k.externalUseCaseId)) == null ? void 0 : z.name;
        pe(i, {
          id: S.id,
          label: S.name,
          x: 0,
          y: 0,
          w: H.external.w,
          h: H.external.h,
          kind: "external-system",
          symbol: "component",
          fill: H.external.fill,
          stroke: H.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentx:${h.id}->${k.externalUseCaseId}`,
          sourceId: h.id,
          targetId: S.id,
          kind: "es-agent-external",
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Llama a ${R} del sistema externo` : void 0
        });
      }
      for (const k of O) {
        const S = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === k.mcpServerId)
        );
        if (!S) continue;
        const R = (C = (S.mcpServers ?? []).find((Z) => Z.id === k.mcpServerId)) == null ? void 0 : C.name;
        pe(i, {
          id: S.id,
          label: S.name,
          x: 0,
          y: 0,
          w: H.external.w,
          h: H.external.h,
          kind: "external-system",
          symbol: "component",
          fill: H.external.fill,
          stroke: H.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentmcp:${h.id}->${k.mcpServerId}`,
          sourceId: h.id,
          targetId: S.id,
          kind: "es-agent-mcp",
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Consume las herramientas del servidor MCP ${R}` : void 0
        });
      }
      for (const k of $) {
        const S = (e.rags ?? []).find((R) => R.id === k.ragId);
        if (S) {
          pe(i, {
            id: S.id,
            label: S.name,
            x: 0,
            y: 0,
            w: H.readModel.w,
            h: H.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${S.name} — base de conocimiento (retrieval)`
          }), te(i, {
            id: `es-agrag:${h.id}->${S.id}`,
            sourceId: h.id,
            targetId: S.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const R of S.sourceReadModelIds ?? []) {
            const Z = f({ id: R });
            Z && te(i, {
              id: `es-ragsrc:${S.id}->${Z}`,
              sourceId: Z,
              targetId: S.id,
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
  const w = (h) => {
    const y = e.externalSystems.find((g) => g.id === h);
    return y ? (pe(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: H.external.w,
      h: H.external.h,
      kind: "external-system",
      symbol: "component",
      fill: H.external.fill,
      stroke: H.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), y.id) : null;
  };
  for (const h of e.externalCalls ?? []) {
    const y = w(h.externalSystemId);
    !y || !o.has(h.useCaseId) || te(i, {
      id: `es-extin:${y}->${h.useCaseId}`,
      sourceId: y,
      targetId: h.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const h of e.externalUseCaseCalls ?? []) {
    if (!o.has(h.sourceId)) continue;
    const y = e.externalSystems.find(
      (O) => (O.useCases ?? []).some((L) => L.id === h.targetId)
    ), g = y ? w(y.id) : null;
    if (!g) continue;
    const $ = (U = ((y == null ? void 0 : y.useCases) ?? []).find((O) => O.id === h.targetId)) == null ? void 0 : U.name;
    te(i, {
      id: `es-extout:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: g,
      kind: "es-command-external",
      label: $,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: $ ? `Llama a ${$} del sistema externo` : void 0
    });
  }
  for (const h of e.aggregateCalls ?? [])
    !o.has(h.sourceId) || !i.nodes.has(h.targetId) || te(i, {
      id: `es-write:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: h.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const I = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const h of I)
    !i.nodes.has(h.domainEventId) || !(i.nodes.has(h.sourceId) && (o.has(h.sourceId) || a.some((g) => g.id === h.sourceId) || r.has(h.sourceId))) || te(i, {
      id: `es-emit:${h.sourceId}->${h.domainEventId}`,
      sourceId: h.sourceId,
      targetId: h.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const P = (h, y, g, $, O, L) => (pe(i, {
    id: h,
    label: y,
    x: 0,
    y: 0,
    w: H.policy.w,
    h: H.policy.h,
    kind: g,
    symbol: "flow",
    fill: H.policy.fill,
    stroke: H.policy.stroke,
    badge: $,
    tooltip: O
  }), h), v = (h, y) => {
    const g = p(h);
    g && te(i, {
      id: `es-trigger:${g}->${y}`,
      sourceId: g,
      targetId: y,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, N = (h, y) => {
    !y || !o.has(y) || te(i, {
      id: `es-invoke:${h}->${y}`,
      sourceId: h,
      targetId: y,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const h of e.subscriptions ?? []) {
    const y = P(
      h.id,
      h.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${h.name}${h.eventName ? ` — reacciona a ${h.eventName}` : ""}${h.consumerGroup ? ` · grupo ${h.consumerGroup}` : ""}`
    );
    v(h.eventName, y);
    for (const g of h.actions ?? []) {
      if (g.type === "CallUseCase" && N(y, g.useCaseId), g.type === "StartSaga" && g.sagaId) {
        const $ = `saga:${g.sagaId}`;
        P($, g.sagaId, "saga", "SAGA"), te(i, {
          id: `es-saga:${y}->${$}`,
          sourceId: y,
          targetId: $,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (g.type === "UpdateProjection" && g.projectionId) {
        const $ = (e.projections ?? []).find((O) => O.id === g.projectionId);
        $ && te(i, {
          id: `es-feeds:${y}->${$.id}`,
          sourceId: y,
          targetId: $.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const h of e.projections ?? []) {
    const y = P(
      h.id,
      h.name,
      "projection",
      "PROYECCIÓN",
      `${h.name}${h.readModelName ? ` — materializa ${h.readModelName}` : ""}`
    );
    for (const O of h.handledEventIds) {
      const L = i.nodes.has(O) ? O : null;
      L && te(i, {
        id: `es-trigger:${L}->${y}`,
        sourceId: L,
        targetId: y,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    h.sourceAggregateId && i.nodes.has(h.sourceAggregateId) && te(i, {
      id: `es-state:${h.id}`,
      sourceId: h.sourceAggregateId,
      targetId: y,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const g = h.sourceExternalUseCaseId ?? h.sourceExternalTableId;
    if (g) {
      const O = e.externalSystems.find(
        (k) => (k.useCases ?? []).some((S) => S.id === g) || (k.tables ?? []).some((S) => S.id === g)
      ), L = O ? w(O.id) : null;
      if (L) {
        const k = ((B = (O.useCases ?? []).find((S) => S.id === g)) == null ? void 0 : B.name) ?? ((Y = (O.tables ?? []).find((S) => S.id === g)) == null ? void 0 : Y.name);
        te(i, {
          id: `es-poll:${h.id}`,
          sourceId: L,
          targetId: y,
          kind: "es-projects-poll",
          label: k,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: k ? `polling de ${k}` : "polling"
        });
      }
    }
    const $ = f({ id: h.readModelId, name: h.readModelName });
    $ && te(i, {
      id: `es-projects:${y}->${$}`,
      sourceId: y,
      targetId: $,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const h of e.flows) {
    if (h.archetype === "MATERIALIZES") {
      const g = p(h.triggerEvent), $ = f({ name: h.readModelName ?? `${h.triggerEvent}View` });
      g && $ && te(i, {
        id: `es-mat:${h.id}`,
        sourceId: g,
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
    const y = P(
      `flow:${h.id}`,
      h.name,
      "flow",
      `POLICY · ${h.archetype}`,
      `Flow ${h.name} [${h.archetype}]`
    );
    if (v(h.triggerEvent, y), N(y, h.targetUseCaseId), !h.targetUseCaseId) {
      const g = w(h.targetId), $ = g ?? `tgt:${h.targetId}`;
      !g && s.has(h.targetId) && pe(i, {
        id: $,
        label: s.get(h.targetId) ?? h.targetId,
        x: 0,
        y: 0,
        w: H.module.w,
        h: H.module.h,
        kind: "module",
        symbol: "component",
        fill: H.module.fill,
        stroke: H.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has($) && te(i, {
        id: `es-deliver:${h.id}`,
        sourceId: y,
        targetId: $,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const h of e.processes ?? []) {
    const y = P(
      h.id,
      h.name,
      "process",
      `PROCESO${h.sla ? ` · SLA ${h.sla}` : ""}`,
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    v(h.triggerEvent, y);
    for (const $ of h.steps) N(y, $.useCaseId);
    const g = p(h.onCompletionEventName);
    g && te(i, {
      id: `es-done:${h.id}`,
      sourceId: y,
      targetId: g,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const h of e.workflows ?? []) {
    const y = P(
      h.id,
      h.name,
      "workflow",
      "WORKFLOW",
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    v(h.triggerEvent, y);
    for (const $ of h.steps ?? []) {
      N(y, $.targetUseCaseId);
      for (const O of [$.emittedEventName, $.completionEventName]) {
        const L = p(O);
        L && te(i, {
          id: `es-wfemit:${h.id}:${L}`,
          sourceId: y,
          targetId: L,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const g = p(h.onCompletionEventName);
    g && te(i, {
      id: `es-done:${h.id}`,
      sourceId: y,
      targetId: g,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const F = [...i.nodes.values()], _ = /* @__PURE__ */ new Map();
  for (const h of i.edges)
    _.has(h.targetId) || _.set(h.targetId, []), _.get(h.targetId).push(h.sourceId);
  const x = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Set(), E = (h) => {
    const y = x.get(h);
    if (y !== void 0) return y;
    if (b.has(h)) return 0;
    b.add(h);
    const g = _.get(h) ?? [], $ = g.length ? 1 + Math.max(...g.map(E)) : 0;
    return b.delete(h), x.set(h, $), $;
  }, M = /* @__PURE__ */ new Map();
  for (const h of F) {
    const y = t[h.id];
    if (y) {
      h.x = y.x, h.y = y.y;
      continue;
    }
    const g = E(h.id), $ = M.get(g) ?? 0;
    M.set(g, $ + 1), h.x = 140 + g * 260, h.y = 110 + $ * 110;
  }
  return { nodes: F, edges: i.edges };
}
const Kd = 190, Gd = 56, un = 180, Wd = 56, Bd = 150, Yd = 44, hn = 250, pn = 100;
function jd(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), a;
  };
  return s(e);
}
function Xd(e, t) {
  if (t.triggerAggregateId) {
    const i = (e.aggregates ?? []).find((s) => s.id === t.triggerAggregateId);
    if (i) return { id: i.id, label: i.name, kind: "aggregate", symbol: "aggregate" };
  }
  if (t.triggerDomainServiceId) {
    const i = e.modules.flatMap((s) => s.domainServices ?? []).find((s) => s.id === t.triggerDomainServiceId);
    if (i) return { id: i.id, label: i.name, kind: "domain-service", symbol: "gear" };
  }
  if (t.triggerUseCaseId) {
    const i = e.modules.flatMap((s) => s.useCases ?? []).find((s) => s.id === t.triggerUseCaseId);
    if (i) return { id: i.id, label: i.name, kind: "use-case", symbol: "gear" };
  }
  return null;
}
function Qd(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (r) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === r)) == null ? void 0 : l.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((r) => {
    var P;
    const l = new Map(r.steps.map((v) => [v.id, v])), c = new Map(r.steps.map((v) => [v.id, jd(v, l)])), u = /* @__PURE__ */ new Map();
    for (const v of r.steps) {
      const N = c.get(v.id) ?? 0;
      u.set(N, (u.get(N) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), p = Xd(e, r);
    if (p && !n.has(p.id)) {
      n.add(p.id);
      const v = t[p.id] ?? { x: 140, y: a };
      i.push({
        id: p.id,
        label: p.label,
        x: v.x,
        y: v.y,
        w: Bd,
        h: Yd,
        kind: p.kind,
        symbol: p.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: p.kind === "aggregate" ? "AGGREGATE" : p.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[r.id] ?? { x: 420, y: a };
    i.push({
      id: r.id,
      label: r.name,
      x: f.x,
      y: f.y,
      w: Kd,
      h: Gd,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), p && s.push({
      id: `wft:${r.id}`,
      sourceId: p.id,
      targetId: r.id,
      kind: "workflow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    });
    const w = /* @__PURE__ */ new Map();
    let I = 0;
    for (const v of r.steps) {
      const N = c.get(v.id) ?? 0;
      I = Math.max(I, N);
      const F = w.get(N) ?? 0;
      w.set(N, F + 1);
      const _ = t[v.id] ?? {
        x: f.x + (N + 1) * hn,
        y: a + (F - (u.get(N) - 1) / 2) * pn
      }, x = o(v.targetUseCaseId);
      i.push({
        id: v.id,
        label: v.name,
        x: _.x,
        y: _.y,
        w: un,
        h: Wd,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: x ? `→ ${x}` : "∅ sin use case",
        tooltip: `${v.name}${v.emittedEventName ? ` · emite ${v.emittedEventName}` : ""}${x ? ` · lanza ${x}` : ""}${v.completionEventName ? ` · espera ${v.completionEventName}` : ""}`
      });
      const b = (v.dependsOnStepIds ?? []).filter((E) => l.has(E));
      b.length === 0 && s.push({
        id: `wfs:${r.id}:${v.id}`,
        sourceId: r.id,
        targetId: v.id,
        kind: "workflow-start",
        label: v.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const E of b)
        s.push({
          id: `wfdep:${E}->${v.id}`,
          sourceId: E,
          targetId: v.id,
          kind: "workflow-dependency",
          label: v.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${v.name} espera a ${((P = l.get(E)) == null ? void 0 : P.name) ?? E}`
        });
    }
    if (r.onCompletionEventName) {
      const v = `done:${r.id}`, N = t[v] ?? { x: f.x + (I + 2) * hn, y: a };
      i.push({
        id: v,
        label: r.onCompletionEventName,
        x: N.x,
        y: N.y,
        w: un,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const F = new Set(r.steps.flatMap((x) => x.dependsOnStepIds ?? [])), _ = r.steps.filter((x) => !F.has(x.id));
      for (const x of _.length ? _ : [])
        s.push({
          id: `wfd:${r.id}:${x.id}`,
          sourceId: x.id,
          targetId: v,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      r.steps.length || s.push({
        id: `wfd:${r.id}`,
        sourceId: r.id,
        targetId: v,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, m + 1) * pn + 60;
  }), { nodes: i, edges: s };
}
async function Zd(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), s = new i(), o = {
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
  }, a = await s.layout(o), r = {};
  for (const l of a.children ?? [])
    r[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return r;
}
var Jd = Object.defineProperty, el = Object.getOwnPropertyDescriptor, G = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? el(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Jd(t, i, n), n;
};
const wi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, tl = Object.keys(wi), il = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], nl = ["CORE", "SUPPORTING", "GENERIC"];
function lt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let r = 0, l = 1;
  const c = t.x - e.x, u = t.y - e.y;
  for (const [m, p] of [
    [-c, e.x - s],
    [c, n - e.x],
    [-u, e.y - o],
    [u, a - e.y]
  ]) {
    if (m === 0) {
      if (p < 0) return !1;
      continue;
    }
    const f = p / m;
    if (m < 0) {
      if (f > l) return !1;
      f > r && (r = f);
    } else {
      if (f < r) return !1;
      f < l && (l = f);
    }
  }
  return l - r > 0.02;
}
function sl(e, t, i = 28) {
  var c;
  const s = new Map(e.nodes.map((u) => [u.id, u])), n = (u) => {
    var p;
    const m = /* @__PURE__ */ new Set();
    for (let f = u; f; f = (p = s.get(f)) == null ? void 0 : p.parentId) m.add(f);
    return m;
  }, o = e.nodes, a = (u) => u.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (u, m, p) => {
    const f = a(p), w = { x: p.x, y: p.y, w: p.w + 2 * f, h: p.h + 2 * f }, I = p.w / 2 + f * 1.5, P = p.h / 2 + f * 1.5, v = { x: p.x - I, y: p.y - P }, N = { x: p.x + I, y: p.y - P }, F = { x: p.x - I, y: p.y + P }, _ = { x: p.x + I, y: p.y + P }, x = [];
    for (const b of [v, N, F, _])
      !lt(u, b, w) && !lt(b, m, w) && x.push([b]);
    for (const [b, E] of [
      [v, N],
      [N, v],
      [N, _],
      [_, N],
      [_, F],
      [F, _],
      [F, v],
      [v, F]
    ])
      !lt(u, b, w) && !lt(E, m, w) && x.push([b, E]);
    return x;
  };
  for (const u of e.edges) {
    if ((c = t[u.id]) != null && c.length) continue;
    const m = s.get(u.sourceId), p = s.get(u.targetId);
    if (!m || !p) continue;
    const f = /* @__PURE__ */ new Set([...n(m.id), ...n(p.id)]), w = [
      { x: m.x, y: m.y },
      { x: p.x, y: p.y }
    ];
    for (let I = 0; I < 12; I++) {
      let P = !1;
      e: for (let v = 0; v < w.length - 1; v++)
        for (const N of o) {
          if (f.has(N.id)) continue;
          const F = a(N), _ = { x: N.x, y: N.y, w: N.w + 2 * F, h: N.h + 2 * F };
          if (!lt(w[v], w[v + 1], _)) continue;
          const x = l(w[v], w[v + 1], N);
          if (!x.length) continue;
          const b = (M) => o.some(
            (z) => z !== N && !f.has(z.id) && Math.abs(M.x - z.x) < z.w / 2 + a(z) / 2 && Math.abs(M.y - z.y) < z.h / 2 + a(z) / 2
          ), E = (M) => {
            let z = 0;
            const C = [w[v], ...M, w[v + 1]];
            for (let U = 0; U < C.length - 1; U++)
              z += Math.hypot(C[U + 1].x - C[U].x, C[U + 1].y - C[U].y);
            return z + (M.some(b) ? 1e4 : 0);
          };
          x.sort((M, z) => E(M) - E(z)), w.splice(v + 1, 0, ...x[0]), P = !0;
          break e;
        }
      if (!P) break;
    }
    w.length > 2 && r.set(
      u.id,
      w.slice(1, -1).map((I) => ({ x: Math.round(I.x), y: Math.round(I.y) }))
    );
  }
  return r;
}
const q = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function ol(e, t) {
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
function al(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let K = class extends He {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._paletteFilter = "", this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newExternalId = "", this._newApiId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null;
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
    return At(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = At(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = At(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    }), e === "contexts" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "external-ai-agent" && this._newContextMapKind !== "mcp-gateway" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module");
    const n = At(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((u) => !u.parentId), r = xi(a), l = [...r.keys()].map((u) => ({
      kind: "move-node",
      view: "context-map",
      id: u,
      pos: o.nodes[u] ?? null
    })), c = { ...o.nodes };
    for (const [u, m] of r) {
      const p = a.find((w) => w.id === u), f = o.nodes[u] ?? { x: p.x, y: p.y };
      c[u] = {
        x: Math.round(f.x + (m.x - p.x)),
        y: Math.round(f.y + (m.y - p.y))
      };
    }
    this.writeViewLayout("context-map", { ...o, nodes: c }), l.length && this.pushUndoEntry(l);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = sl(e, t);
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
        const i = this.viewLayout(t.view), s = { ...i.nodes };
        t.pos ? s[t.id] = t.pos : delete s[t.id], this.writeViewLayout(t.view, { ...i, nodes: s });
      } else if (t.kind === "set-edge-points") {
        const i = this.viewLayout(t.view), s = { ...i.edges };
        t.points && t.points.length ? s[t.id] = t.points : delete s[t.id], this.writeViewLayout(t.view, { ...i, edges: s });
      } else if (t.kind === "resize-node") {
        const i = this.viewLayout(t.view), s = { ...i.sizes ?? {} };
        t.size ? s[t.id] = t.size : delete s[t.id], this.writeViewLayout(t.view, { ...i, sizes: s });
      } else
        this.command(t, !1);
  }
  /**
   * Inverse commands computed against the CURRENT model (before the command is
   * applied) — what Ctrl+Z replays. Composite where needed (e.g. removing a
   * module also drops its relations, so its inverse restores them).
   */
  inverseOf(e) {
    var t, i, s, n;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const o = this.model.relations.find(
          (a) => a.sourceId === e.sourceId && a.targetId === e.targetId
        );
        return o && o.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : null;
      }
      case "set-relation-type": {
        const o = this.model.relations.find(
          (a) => a.sourceId === e.sourceId && a.targetId === e.targetId
        );
        return o && o.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const o = this.model.modules.find((r) => r.id === e.id);
        if (!o) return null;
        const a = this.model.relations.filter(
          (r) => (r.sourceId === e.id || r.targetId === e.id) && r.type != null
        );
        return [
          { kind: "add-module", id: o.id, name: o.name, subdomainType: o.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...a.map(
            (r) => ({
              kind: "set-relation-type",
              sourceId: r.sourceId,
              targetId: r.targetId,
              type: r.type
            })
          )
        ];
      }
      case "add-aggregate":
        return [{ kind: "remove-aggregate", id: e.id }];
      case "remove-aggregate": {
        const o = (this.model.aggregates ?? []).find((a) => a.id === e.id);
        return o ? [{ kind: "add-aggregate", id: o.id, name: o.name, moduleId: o.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const o of this.model.modules) {
          const a = (o.queryServices ?? []).find((r) => r.id === e.id);
          if (a) return [{ kind: "add-query-service", id: a.id, name: a.name, moduleId: o.id }];
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
          (a) => a.sourceId === e.sourceId && a.targetId === e.targetId
        );
        return o ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const o = (this.model.externalSystemDependencies ?? []).find(
          (a) => a.sourceId === e.sourceId && a.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: o == null ? void 0 : o.type }];
      }
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const o = (this.model.proxyApis ?? []).find((a) => a.id === e.id);
        return o ? [{
          kind: "add-proxy-api",
          id: o.id,
          name: o.name,
          targetId: o.targetApiId,
          moduleId: o.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const o = (this.model.proxyApis ?? []).find((a) => a.id === e.id);
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
      case "add-external-operation-use":
        return [{
          kind: "remove-external-operation-use",
          sourceId: e.sourceId,
          operationId: e.operationId,
          targetSiteId: e.targetSiteId
        }];
      case "remove-external-operation-use":
        return [{
          kind: "add-external-operation-use",
          sourceId: e.sourceId,
          operationId: e.operationId,
          targetSiteId: e.targetSiteId
        }];
      case "set-api-operation-implementation": {
        const o = (this.model.apiOperationImplementations ?? []).find(
          (a) => a.apiId === e.apiId && a.operationId === e.operationId && a.moduleId === e.moduleId
        );
        return o ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: o.useCaseId
        }] : [{
          kind: "remove-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId
        }];
      }
      case "remove-api-operation-implementation": {
        const o = (this.model.apiOperationImplementations ?? []).find(
          (a) => a.apiId === e.apiId && a.operationId === e.operationId && a.moduleId === e.moduleId
        );
        return o ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: o.useCaseId
        }] : null;
      }
      case "set-api-publisher": {
        const o = (this.model.apis ?? []).find((a) => a.id === e.id) ?? (this.model.proxyApis ?? []).find((a) => a.id === e.id);
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
          const a = (o.useCases ?? []).find((r) => r.id === e.id);
          if (a)
            return [
              { kind: "add-use-case", id: a.id, name: a.name, moduleId: o.id, policy: a.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const o of this.model.externalSystems) {
          const a = (o.useCases ?? []).find((r) => r.id === e.id);
          if (a)
            return [{ kind: "add-external-use-case", id: a.id, name: a.name, moduleId: o.id }];
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
        const o = this.model.externalSystems.find((a) => a.id === e.id);
        return o ? [{ kind: "add-external-system", id: o.id, name: o.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const o = (this.model.aiAgents ?? []).find((a) => a.id === e.id);
        return o ? [
          { kind: "add-ai-agent", id: o.id, name: o.name, external: o.external },
          ...(this.model.agentUses ?? []).filter((a) => a.agentId === e.id).map((a) => ({ kind: "add-agent-use", sourceId: e.id, targetId: a.useCaseId })),
          ...(this.model.agentExternalUses ?? []).filter((a) => a.agentId === e.id).map((a) => ({
            kind: "add-agent-external-use",
            sourceId: e.id,
            targetId: a.externalUseCaseId
          })),
          ...(this.model.agentMcpUses ?? []).filter((a) => a.agentId === e.id).map((a) => ({ kind: "add-agent-mcp", sourceId: e.id, targetId: a.mcpServerId })),
          ...(this.model.agentGatewayUses ?? []).filter((a) => a.agentId === e.id).map((a) => ({ kind: "add-agent-gateway", sourceId: e.id, targetId: a.gatewayId })),
          ...(this.model.agentApiOpUses ?? []).filter((a) => a.agentId === e.id).map((a) => ({
            kind: "add-agent-api-operation",
            sourceId: e.id,
            targetId: a.apiOperationId
          })),
          ...(this.model.agentQueryUses ?? []).filter((a) => a.agentId === e.id).map((a) => ({ kind: "add-agent-query", sourceId: e.id, targetId: a.queryServiceId })),
          ...(this.model.agentRags ?? []).filter((a) => a.agentId === e.id).map((a) => ({ kind: "add-agent-rag", sourceId: e.id, targetId: a.ragId })),
          ...(this.model.agentDelegations ?? []).filter((a) => a.agentId === e.id || a.delegateAgentId === e.id).map((a) => ({
            kind: "add-agent-delegate",
            sourceId: a.agentId,
            targetId: a.delegateAgentId
          })),
          ...(this.model.actorAgentUses ?? []).filter((a) => a.agentId === e.id).map((a) => ({ kind: "add-actor-agent", sourceId: a.actorId, targetId: e.id })),
          ...(this.model.agentTriggers ?? []).filter((a) => a.agentId === e.id).map((a) => ({ kind: "add-agent-trigger", sourceId: a.eventId, targetId: e.id }))
        ] : null;
      }
      case "add-mcp-gateway":
        return [{ kind: "remove-mcp-gateway", id: e.id }];
      case "remove-mcp-gateway": {
        const o = (this.model.mcpGateways ?? []).find((a) => a.id === e.id);
        return o ? [
          { kind: "add-mcp-gateway", id: o.id, name: o.name },
          ...[
            ...o.mcpServerIds ?? [],
            ...o.apiIds ?? [],
            ...o.apiOperationIds ?? [],
            ...o.useCaseIds ?? [],
            ...o.ragIds ?? []
          ].map((a) => ({ kind: "add-gateway-exposure", sourceId: e.id, targetId: a })),
          ...(this.model.agentGatewayUses ?? []).filter((a) => a.gatewayId === e.id).map((a) => ({ kind: "add-agent-gateway", sourceId: a.agentId, targetId: e.id }))
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
      case "add-agent-api":
        return [{ kind: "remove-agent-api", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-api":
        return [{ kind: "add-agent-api", sourceId: e.sourceId, targetId: e.targetId }];
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
          const a = (o.mcpServers ?? []).find((r) => r.id === e.id);
          if (a)
            return [
              { kind: "add-mcp-server", id: a.id, name: a.name, moduleId: o.id, uri: a.uri },
              ...(this.model.agentMcpUses ?? []).filter((r) => r.mcpServerId === e.id).map(
                (r) => ({
                  kind: "add-agent-mcp",
                  sourceId: r.agentId,
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
        const o = (this.model.rags ?? []).find((a) => a.id === e.id);
        return o ? [
          { kind: "add-rag", id: o.id, name: o.name },
          ...(this.model.agentRags ?? []).filter((a) => a.ragId === e.id).map(
            (a) => ({
              kind: "add-agent-rag",
              sourceId: a.agentId,
              targetId: e.id
            })
          ),
          ...(o.sourceReadModelIds ?? []).map(
            (a) => ({ kind: "add-rag-source", sourceId: e.id, targetId: a })
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
        const o = (this.model.actors ?? []).find((a) => a.id === e.id);
        return o ? [{ kind: "add-actor", id: o.id, name: o.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const o of this.model.modules) {
          const a = (o.applicationEvents ?? []).find((r) => r.id === e.id);
          if (a)
            return [{ kind: "add-application-event", id: a.id, name: a.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const o of this.model.modules) {
          const a = (o.domainServices ?? []).find((r) => r.id === e.id);
          if (a) return [{ kind: "add-domain-service", id: a.id, name: a.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const o = (this.model.projections ?? []).find((a) => a.id === e.id);
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
          const a = (o.tables ?? []).find((r) => r.id === e.id);
          if (a) return [{ kind: "add-external-table", id: a.id, name: a.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const o = (i = (t = (this.model.rags ?? []).find((a) => a.id === e.sourceId)) == null ? void 0 : t.contentSources) == null ? void 0 : i.find((a) => a.uri === e.uri);
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
        const o = (this.model.apis ?? []).find((a) => a.id === e.id);
        return o ? [
          { kind: "add-api", id: o.id, name: o.name },
          ...o.operations.map(
            (a) => ({
              kind: "add-api-operation",
              apiId: o.id,
              id: a.id,
              name: a.name,
              httpMethod: a.httpMethod,
              path: a.path,
              moduleId: a.targetModuleId,
              targetUseCaseId: a.targetUseCaseId
            })
          )
        ] : null;
      }
      case "add-api-operation":
        return [{ kind: "remove-api-operation", apiId: e.apiId, id: e.id }];
      case "remove-api-operation": {
        const o = (s = (this.model.apis ?? []).find((a) => a.id === e.apiId)) == null ? void 0 : s.operations.find((a) => a.id === e.id);
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
        const o = (n = (this.model.apis ?? []).find((a) => a.id === e.apiId)) == null ? void 0 : n.operations.find((a) => a.id === e.id);
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
          const a = (o.readModels ?? []).find((r) => r.id === e.id);
          if (a != null && a.aggregateId)
            return [{ kind: "add-read-model", id: a.id, name: a.name, aggregateId: a.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const o of this.model.modules) {
          const a = (o.domainEvents ?? []).find((r) => r.id === e.id);
          if (a) return [{ kind: "add-domain-event", id: a.id, name: a.name, moduleId: o.id }];
        }
        return null;
      }
      case "rename-element": {
        const a = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((r) => r.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((r) => r.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((r) => r.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((r) => r.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((r) => r.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((r) => r.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((r) => r.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((r) => r.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((r) => r.id === e.id);
        return a ? [{ kind: "rename-element", type: e.type, id: e.id, name: a.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const o = this.model.flows.find((a) => a.id === e.id);
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
        const o = (this.model.views ?? []).find((a) => a.id === e.id);
        return o ? [{ kind: "add-view", id: o.id, name: o.name, memberIds: o.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const o = (this.model.processes ?? []).find((l) => l.id === e.processId), a = (o == null ? void 0 : o.steps.findIndex((l) => l.id === e.id)) ?? -1;
        if (!o || a < 0) return null;
        const r = o.steps[a];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: r.id,
            name: r.name,
            stepType: r.type,
            roleId: r.roleId,
            deadline: r.deadline,
            useCaseId: r.useCaseId,
            compensationUseCaseId: r.compensationUseCaseId,
            afterStepId: a > 0 ? o.steps[a - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const o = (this.model.processes ?? []).find((r) => r.id === e.processId), a = (o == null ? void 0 : o.steps.findIndex((r) => r.id === e.id)) ?? -1;
        return !o || a < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: a > 0 ? o.steps[a - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const o = (this.model.processes ?? []).find((r) => r.id === e.processId), a = o == null ? void 0 : o.steps.find((r) => r.id === e.id);
        return a ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: a.roleId,
            deadline: a.deadline,
            compensationUseCaseId: a.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const o = (this.model.processes ?? []).find((a) => a.id === e.id);
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
        const o = (this.model.workflows ?? []).find((a) => a.id === e.id);
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
        const o = (this.model.workflows ?? []).find((l) => l.id === e.workflowId), a = (o == null ? void 0 : o.steps.findIndex((l) => l.id === e.id)) ?? -1;
        if (!o || a < 0) return null;
        const r = o.steps[a];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: r.id,
            name: r.name,
            emittedEventName: r.emittedEventName,
            targetUseCaseId: r.targetUseCaseId,
            completionEventName: r.completionEventName,
            dependsOnStepIds: r.dependsOnStepIds,
            afterStepId: a > 0 ? o.steps[a - 1].id : void 0
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
        const o = (this.model.workflows ?? []).find((r) => r.id === e.workflowId), a = o == null ? void 0 : o.steps.find((r) => r.id === e.id);
        return a ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: a.emittedEventName,
            targetUseCaseId: a.targetUseCaseId,
            completionEventName: a.completionEventName
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, o = this.viewLayout(n), a = o.nodes[t] ?? null;
    let r = { x: i, y: s };
    const l = this.sceneFor(n), c = l.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = l.nodes.find((p) => p.id === c.parentId);
      m && (r = { x: i - m.x, y: s - m.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: r } });
    const u = [{ kind: "move-node", view: n, id: t, pos: a }];
    if (n === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const p = this.inverseOf(m);
        p && u.unshift(...p), this.command(m, !1);
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((w) => w.id === t) ?? (this.model.proxyApis ?? []).find((w) => w.id === t);
    if (!o || i && !this.model.externalSystems.some((w) => w.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === a) return;
    const l = this._view, c = this.viewLayout(l), u = this.sceneFor(l), m = r ? u.nodes.find((w) => w.id === r) : void 0, p = m ? { x: s - m.x, y: n - m.y } : { x: s, y: n }, f = [
      { kind: "set-api-publisher", id: t, targetId: a },
      { kind: "move-node", view: l, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(l, { ...c, nodes: { ...c.nodes, [t]: p } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((w) => w.id === t), a = this.model.externalSystems.find((w) => w.id === i);
    if (!o || !a || (this.model.proxyApis ?? []).some(
      (w) => w.targetApiId === t && w.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${q(o.name)}-${q(a.name)}`;
    if ((this.model.proxyApis ?? []).some((w) => w.id === l)) return;
    const c = this._view, u = this.viewLayout(c), p = this.sceneFor(c).nodes.find((w) => w.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${o.name}@${a.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const f = [{ kind: "remove-proxy-api", id: l }];
    p && (f.push({ kind: "move-node", view: c, id: l, pos: u.nodes[l] ?? null }), this.writeViewLayout(c, {
      ...u,
      nodes: { ...u.nodes, [l]: { x: s - p.x, y: n - p.y } }
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
    var r, l, c;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const s = await i.text(), n = this.selectedApiId(), o = n ? null : ((l = this.model.externalSystems.find((u) => u.id === this._selectedId)) == null ? void 0 : l.id) ?? null, a = n || o ? null : ((c = this.model.modules.find((u) => u.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
    if (!n && !o && !a) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: s,
      fileName: i.name,
      apiId: n,
      homeExternalId: o,
      homeModuleId: a
    });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), o = { ...s.nodes }, a = [];
    for (const { id: r, x: l, y: c } of t) {
      a.push({ kind: "move-node", view: i, id: r, pos: s.nodes[r] ?? null });
      let u = { x: l, y: c };
      const m = n.nodes.find((p) => p.id === r);
      if (m != null && m.parentId) {
        const p = n.nodes.find((f) => f.id === m.parentId);
        p && (u = { x: l - p.x, y: c - p.y });
      }
      o[r] = u;
    }
    if (this.writeViewLayout(i, { ...s, nodes: o }), i === "processes")
      for (const { id: r } of t) {
        const l = this.stepReorderCommand(r);
        if (l) {
          const c = this.inverseOf(l);
          c && a.unshift(...c), this.command(l, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var u;
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, a = this._view, r = this.viewLayout(a), l = this.sceneFor(a).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((u = r.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: r.nodes[t] ?? null },
      ...l.map((m) => ({ kind: "move-node", view: a, id: m.id, pos: r.nodes[m.id] ?? null }))
    ]);
    const c = { ...r.nodes, [t]: { x: i, y: s } };
    for (const m of l) c[m.id] = { x: m.x - i, y: m.y - s };
    this.writeViewLayout(a, {
      ...r,
      nodes: c,
      sizes: { ...r.sizes ?? {}, [t]: { w: n, h: o } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, s = this._view, n = this.viewLayout(s);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: s, id: t, points: n.edges[t] ?? null }
    ]);
    const o = { ...n.edges };
    i.length ? o[t] = i : delete o[t], this.writeViewLayout(s, { ...n, edges: o });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = Oi(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((a) => [a.id, a.x])), n = [...t.steps].sort(
      (a, r) => (s.get(a.id) ?? 0) - (s.get(r.id) ?? 0)
    );
    if (n.every((a, r) => a.id === t.steps[r].id)) return null;
    const o = n.findIndex((a) => a.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: o > 0 ? n[o - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: s, y: n } = e.detail;
    this.applyConnection(t, i, s, n);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, s) {
    var _;
    if (this._view === "workflows") {
      const x = this.owningWorkflowOf(e), b = this.owningWorkflowOf(t);
      if (!x || x !== b || e === t) return;
      const E = x.steps.find((M) => M.id === t);
      if (((E == null ? void 0 : E.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: x.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view !== "context-map") return;
    const n = /^apiop:(.+)@(.+)$/.exec(e);
    if (n) {
      const [, x, b] = n, E = (this.model.proxyApis ?? []).find((B) => B.id === b), M = (E == null ? void 0 : E.targetApiId) ?? ((_ = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === b && (this.model.apis ?? []).some(
          (Y) => Y.id === B.apiId && Y.operations.some((h) => h.id === x)
        )
      )) == null ? void 0 : _.apiId);
      if (!M) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((Y) => Y.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: M,
          operationId: x,
          moduleId: b,
          targetUseCaseId: t
        });
        return;
      }
      if (!(E != null && E.targetApiId)) return;
      let C = null;
      if (t === E.targetApiId)
        C = E.targetApiId;
      else {
        const B = /^apiimpl:(.+)@(.+)$/.exec(t);
        B && B[1] === E.targetApiId ? C = B[2] : this.model.modules.some((Y) => Y.id === t) && (this.model.apiImplementations ?? []).some(
          (Y) => Y.apiId === E.targetApiId && Y.moduleId === t
        ) && (C = t);
      }
      if (!C) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === E.id && B.operationId === x && B.targetSiteId === C
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: E.id,
        operationId: x,
        targetSiteId: C
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((x) => x.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((U) => U.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (U) => U.agentId === e && U.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.useCases ?? []).map((U) => U.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (U) => U.agentId === e && U.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.mcpServers ?? []).map((U) => U.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (U) => U.agentId === e && U.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((C) => C.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (U) => U.agentId === e && U.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((C) => C.operations.map((U) => U.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (U) => U.agentId === e && U.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (U) => U.agentId === e && U.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((U) => U.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (U) => U.agentId === e && U.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (o.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (U) => U.agentId === e && U.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((C) => C.id === t) && ((this.model.agentRags ?? []).some(
        (U) => U.agentId === e && U.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === e)) {
      const x = (this.model.mcpGateways ?? []).find((M) => M.id === e), b = this.model.externalSystems.some((M) => (M.mcpServers ?? []).some((z) => z.id === t)) || (this.model.apis ?? []).some((M) => M.id === t) || (this.model.apis ?? []).some((M) => M.operations.some((z) => z.id === t)) || this.model.modules.some((M) => (M.useCases ?? []).some((z) => z.id === t)) || (this.model.rags ?? []).some((M) => M.id === t), E = [
        ...x.mcpServerIds ?? [],
        ...x.apiIds ?? [],
        ...x.apiOperationIds ?? [],
        ...x.useCaseIds ?? [],
        ...x.ragIds ?? []
      ].includes(t);
      b && !E && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === t)) return;
    const a = (this.model.rags ?? []).find((x) => x.id === e);
    if (a) {
      if (new Set(
        this.model.modules.flatMap((E) => (E.readModels ?? []).map((M) => M.id))
      ).has(t) && !(a.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((E) => (E.tables ?? []).map((M) => M.id))
      ).has(t) && !(a.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((E) => E.id === t) || (this.model.proxyApis ?? []).some((E) => E.id === t)) && !(a.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((E) => E.id === t) && !(a.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((E) => E.id === t) && !(a.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((x) => x.id === t)) return;
    if ((this.model.proxyApis ?? []).some((x) => x.id === e)) {
      const x = (this.model.proxyApis ?? []).find((b) => b.id === e);
      if ((this.model.apis ?? []).some((b) => b.id === t)) {
        x.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((b) => b.id === t)) {
        if (!x.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (E) => E.apiId === x.targetApiId && E.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: x.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((b) => b.id === t) && x.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((x) => x.id === e)) {
      if (this.model.externalSystems.some((x) => x.id === t)) {
        (this.model.apis ?? []).find((b) => b.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((x) => x.id === t) && ((this.model.apiImplementations ?? []).some(
        (b) => b.apiId === e && b.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const r = new Set((this.model.actors ?? []).map((x) => x.id));
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((b) => (b.domainEvents ?? []).map((E) => E.id)),
        ...this.model.modules.flatMap((b) => (b.applicationEvents ?? []).map((E) => E.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (E) => E.eventId === e && E.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!r.has(e)) return;
    }
    if (r.has(e)) {
      const x = new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((M) => M.id))
      ), b = new Set(
        this.model.modules.flatMap((E) => (E.queryServices ?? []).map((M) => M.id))
      );
      if (x.has(t) || b.has(t)) {
        (this.model.actorUses ?? []).some(
          (M) => M.actorId === e && M.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((E) => E.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((E) => E.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (M) => M.actorId === e && M.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((E) => E.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (M) => M.actorId === e && M.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const l = this.owningApiOf(e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((b) => (b.useCases ?? []).map((E) => E.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((b) => b.id === t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: e,
          moduleId: t
        });
        return;
      }
      return;
    }
    const c = this.model.externalSystems.flatMap((x) => x.useCases ?? []).find((x) => x.id === e), u = this.model.externalSystems.flatMap((x) => x.tables ?? []).find((x) => x.id === e);
    if (c || u) {
      const x = (c ?? u).name, b = c ? { externalUseCaseId: e } : { externalTableId: e }, E = (C) => c ? C.sourceExternalUseCaseId === e : C.sourceExternalTableId === e, M = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if (M) {
        (this.model.projections ?? []).some(
          (U) => E(U) && U.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(x)}-${q(M.name)}`,
          name: `${M.name}Projection`,
          ...b,
          targetId: t
        });
        return;
      }
      const z = this.model.modules.find((C) => C.id === t);
      if (z) {
        (this.model.projections ?? []).some(
          (U) => E(U) && U.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(x)}-${q(z.name)}`,
          name: `${x}ViewProjection`,
          ...b,
          moduleId: t,
          readModelName: `${x}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((x) => x.id === e);
    if (m) {
      const x = this.model.modules.flatMap((E) => E.readModels ?? []).find((E) => E.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          (M) => M.sourceAggregateId === e && M.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(m.name)}-${q(x.name)}`,
          name: `${x.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const b = this.model.modules.find((E) => E.id === t);
      if (b) {
        (this.model.projections ?? []).some(
          (M) => M.sourceAggregateId === e && M.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(m.name)}-${q(b.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const p = new Set(
      this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((b) => b.id))
    ), f = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((x) => x.id),
      ...this.model.modules.flatMap((x) => (x.domainServices ?? []).map((b) => b.id))
    ]), w = new Set(
      this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((b) => b.id))
    ), I = new Set(this.model.modules.flatMap((x) => (x.useCases ?? []).map((b) => b.id))), P = new Set(
      this.model.modules.flatMap((x) => (x.queryServices ?? []).map((b) => b.id))
    );
    if (I.has(e) && P.has(t)) {
      (this.model.queryCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const v = new Set(
      this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((b) => b.id))
    );
    if (I.has(e) && v.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (I.has(e) && I.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) && p.has(t) || I.has(e) && w.has(t)) {
      (this.model.emissions ?? []).some(
        (b) => b.sourceId === e && b.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (p.has(e) || w.has(e)) {
      const x = w.has(e), b = this.model.modules.flatMap((g) => (x ? g.applicationEvents : g.domainEvents) ?? []).find((g) => g.id === e), E = this.model.modules.flatMap((g) => (g.useCases ?? []).map(($) => ({ u: $, module: g }))).find(({ u: g }) => g.id === t), M = this.model.modules.flatMap((g) => (g.readModels ?? []).map(($) => ({ rm: $, module: g }))).find(({ rm: g }) => g.id === t), z = this.model.modules.find((g) => g.id === t) ?? (M == null ? void 0 : M.module) ?? (E == null ? void 0 : E.module);
      if (!b || !z) return;
      const C = new Set((this.model.aggregates ?? []).map((g) => g.id)), U = new Set(
        this.model.modules.flatMap((g) => (g.domainServices ?? []).map(($) => $.id))
      ), B = (this.model.emissions ?? []).find(
        (g) => g.domainEventId === e && (x ? I.has(g.sourceId) : C.has(g.sourceId) || U.has(g.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: x ? `Declara primero qué caso de uso publica ${b.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${b.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const Y = !x && C.has(B.sourceId);
      if (E) {
        if (this.model.flows.some(
          ($) => $.archetype === "TRIGGERS" && $.triggerEvent === b.name && $.targetUseCaseId === E.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(b.name)}-${q(E.u.name)}`,
          name: E.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: Y ? B.sourceId : "",
          triggerDomainServiceId: !x && !Y ? B.sourceId : void 0,
          triggerUseCaseId: x ? B.sourceId : void 0,
          triggerEvent: b.name,
          targetId: z.id,
          targetUseCaseId: E.u.id
        });
        return;
      }
      const h = (M == null ? void 0 : M.rm.name) ?? `${b.name}View`;
      if (this.model.flows.some(
        (g) => g.archetype === "MATERIALIZES" && g.triggerEvent === b.name && g.targetId === z.id && g.readModelName === h
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${q(b.name)}-${q(h)}`,
        name: h,
        archetype: "MATERIALIZES",
        triggerAggregateId: Y ? B.sourceId : "",
        triggerDomainServiceId: !x && !Y ? B.sourceId : void 0,
        triggerUseCaseId: x ? B.sourceId : void 0,
        triggerEvent: b.name,
        targetId: z.id,
        readModelName: h
      });
      return;
    }
    const N = /* @__PURE__ */ new Set([
      ...f,
      ...I,
      ...P,
      ...this.model.modules.flatMap((x) => (x.readModels ?? []).map((b) => b.id))
    ]);
    if (N.has(e) || N.has(t) || p.has(t) || w.has(t))
      return;
    const F = new Set(this.model.externalSystems.map((x) => x.id));
    if (F.has(e)) {
      if (new Set(
        this.model.modules.flatMap((z) => (z.useCases ?? []).map((C) => C.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (C) => C.externalSystemId === e && C.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (F.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const b = (this.model.apis ?? []).find(
        (z) => z.operations.some((C) => C.id === t)
      ), E = /^apiop:(.+)@(.+)$/.exec(t), M = b ? { operationId: t, siteId: b.id } : E ? { operationId: E[1], siteId: E[2] } : null;
      if (M) {
        (this.model.externalOperationUses ?? []).some(
          (C) => C.externalSystemId === e && C.operationId === M.operationId && C.siteId === M.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: M.operationId,
          targetSiteId: M.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((z) => z.id === t) || (this.model.proxyApis ?? []).some((z) => z.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (C) => C.sourceId === e && C.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    F.has(t) || r.has(t);
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
      (s) => s.sourceId === t.sourceId && s.targetId === t.targetId
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
    const { elementType: t, id: i, kind: s } = e.detail;
    if (this._activeViewId && t === "node") {
      const n = this.memberIdOf(i, s), o = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
      if (n && (o != null && o.memberIds.includes(n))) {
        this._deletePicker = { elementType: t, id: i, kind: s, memberId: n };
        return;
      }
    }
    this.performDelete(t, i, s);
  }
  /** Canvas node → the catalog id a view lists as member (null when not a member kind). */
  memberIdOf(e, t) {
    var i, s;
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
        return ((s = this.owningWorkflowOf(e)) == null ? void 0 : s.id) ?? null;
      default:
        return null;
    }
  }
  performDelete(e, t, i) {
    var s;
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const n = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!n) return;
      const o = this.owningWorkflowOf(n[2]);
      if (!o) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: o.id,
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
    if (this._view === "context-map" && e === "edge" && i === "api-impl-wire") {
      const n = /^apiimplwire:(.+)@(.+)$/.exec(t);
      if (!n) return;
      const [, o, a] = n, r = (s = (this.model.apis ?? []).find(
        (l) => l.operations.some((c) => c.id === o)
      )) == null ? void 0 : s.id;
      if (!r) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: r, operationId: o, moduleId: a });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-op-use") {
      const n = /^extopuse:(.+)->(.+)@(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({
        kind: "remove-external-operation-use",
        sourceId: n[1],
        operationId: n[2],
        targetSiteId: n[3]
      });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "op-route") {
      const n = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(t);
      if (!n) return;
      const [, o, a, r] = n, l = /^apiimpl:.+@(.+)$/.exec(r), c = l ? l[1] : r;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: a, operationId: o, targetSiteId: c });
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
    if (this._view === "context-map" && e === "edge" && (i === "rag-table" || i === "rag-api" || i === "rag-coarse")) {
      const n = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: n[2], targetId: n[1] });
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
      const n = /^apiwire:(.+)$/.exec(t), o = n ? this.owningApiOf(n[1]) : null;
      if (!n || !o) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: o.id, id: n[1] });
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
    if (this._view === "context-map" && e === "edge" && i === "agent-api") {
      const n = /^agapi:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api", sourceId: n[1], targetId: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "proxy-target") {
      const n = /^pxt:(.+)->(.+)$/.exec(t);
      if (!n || !(this.model.proxyApis ?? []).some((o) => o.id === n[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: n[1], targetId: "" });
      return;
    }
    if (e === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((o) => o.moduleId === t)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: t });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((o) => o.aggregateId === t)) return;
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
    const { id: t, kind: i, name: s } = e.detail;
    (i === "module" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: s });
  }
  addStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.processes ?? []).find((n) => n.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
    if (!i) return;
    const s = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: i.id,
      id: `step-${q(e)}`,
      name: e,
      stepType: this._newStepType,
      roleId: this._newStepType === "HUMAN" && this._newStepRole.trim() || void 0,
      deadline: this._newStepType === "HUMAN" && this._newStepDeadline.trim() || void 0,
      afterStepId: s
    }), this._newStepName = "", this._newStepDeadline = "";
  }
  addWorkflowStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.workflows ?? []).find((s) => s.id === this._selectedId), i = t ?? this.owningWorkflowOf(this._selectedId);
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
    const e = (this.model.views ?? []).find((n) => n.id === this._activeViewId);
    if (!e) return "";
    const t = new Set(e.memberIds), i = (n, o, a = {}) => T`
      <label
        class="${a.child ? "child" : ""} ${a.implicit && !t.has(n) ? "implicit" : ""}"
        title=${a.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(r) => this.toggleViewMember(n, r.target.checked)}
        />
        ${o}
      </label>
    `, s = (n, o) => o.length ? T`<h4>${n}</h4>${o}` : "";
    return T`
      <aside class="view-tree" @pointerdown=${(n) => n.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${s(
      "Contextos",
      this.model.modules.flatMap((n) => [
        i(n.id, n.name),
        ...(this.model.aggregates ?? []).filter((o) => o.moduleId === n.id).map((o) => i(o.id, o.name, { child: !0, implicit: t.has(n.id) }))
      ])
    )}
        ${s(
      "Sistemas externos",
      this.model.externalSystems.map((n) => i(n.id, n.name))
    )}
        ${s("APIs", (this.model.apis ?? []).map((n) => i(n.id, n.name)))}
        ${s("Actores", (this.model.actors ?? []).map((n) => i(n.id, n.name)))}
        ${s("Agentes IA", (this.model.aiAgents ?? []).map((n) => i(n.id, n.name)))}
        ${s("Gateways MCP", (this.model.mcpGateways ?? []).map((n) => i(n.id, n.name)))}
        ${s("RAGs", (this.model.rags ?? []).map((n) => i(n.id, n.name)))}
        ${s("Flows", this.model.flows.map((n) => i(n.id, n.name)))}
        ${s("Procesos", (this.model.processes ?? []).map((n) => i(n.id, n.name)))}
        ${s("Workflows", (this.model.workflows ?? []).map((n) => i(n.id, n.name)))}
      </aside>
    `;
  }
  onElementSelected(e) {
    var t, i;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const s = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((n) => n.id === e.detail.id);
      this._editStepRole = (s == null ? void 0 : s.roleId) ?? "", this._editStepDeadline = (s == null ? void 0 : s.deadline) ?? "", this._editStepComp = (s == null ? void 0 : s.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const s = (i = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : i.steps.find((n) => n.id === e.detail.id);
      this._editStepUseCase = (s == null ? void 0 : s.targetUseCaseId) ?? "", this._editStepEmits = (s == null ? void 0 : s.emittedEventName) ?? "", this._editStepAwaits = (s == null ? void 0 : s.completionEventName) ?? "";
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
      const s = e.nodes.find((n) => n.id === i);
      if (s)
        switch (s.kind) {
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
            const n = this.owningProcessOf(i);
            n && t.add(n.id);
            break;
          }
          case "workflow-step": {
            const n = this.owningWorkflowOf(i);
            n && t.add(n.id);
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
    const e = (this.model.views ?? []).find((l) => l.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((l) => t.has(l.id)), s = new Set(i.map((l) => l.id)), n = this.model.externalSystems.filter((l) => t.has(l.id)), o = new Set(n.map((l) => l.id)), a = (this.model.aggregates ?? []).filter(
      (l) => t.has(l.id) || s.has(l.moduleId)
    ), r = new Set(a.map((l) => l.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (l) => s.has(l.sourceId) && s.has(l.targetId)
      ),
      flows: this.model.flows.filter(
        (l) => t.has(l.id) || (s.has(l.sourceId) || o.has(l.sourceId)) && (s.has(l.targetId) || o.has(l.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((l) => r.has(l.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (l) => r.has(l.sourceAggregateId) && r.has(l.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (l) => t.has(l.id) || (l.ownerModuleId ? s.has(l.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((l) => t.has(l.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((l) => t.has(l.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((l) => t.has(l.id)),
      rags: (this.model.rags ?? []).filter((l) => t.has(l.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((l) => t.has(l.id)),
      apis: (this.model.apis ?? []).filter(
        (l) => t.has(l.id) || (l.publishedByExternalSystemId ? o.has(l.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (l) => t.has(l.id) || (l.publishedByExternalSystemId ? o.has(l.publishedByExternalSystemId) : !1)
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
    const t = e.detail.kind === "process-step" ? al(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : ol(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** Every element of the model, grouped for the palette's «Existentes» section. */
  paletteCatalog() {
    const e = this.model, t = [
      { label: "Contextos", items: e.modules.map((s) => ({ id: s.id, name: s.name })) },
      {
        label: "Casos de uso",
        items: e.modules.flatMap((s) => (s.useCases ?? []).map((n) => ({ id: n.id, name: n.name })))
      },
      {
        label: "Eventos",
        items: e.modules.flatMap((s) => [
          ...(s.domainEvents ?? []).map((n) => ({ id: n.id, name: n.name })),
          ...(s.applicationEvents ?? []).map((n) => ({ id: n.id, name: n.name }))
        ])
      },
      { label: "Agregados", items: (e.aggregates ?? []).map((s) => ({ id: s.id, name: s.name })) },
      {
        label: "Read models",
        items: e.modules.flatMap((s) => (s.readModels ?? []).map((n) => ({ id: n.id, name: n.name })))
      },
      {
        label: "Query services",
        items: e.modules.flatMap((s) => (s.queryServices ?? []).map((n) => ({ id: n.id, name: n.name })))
      },
      { label: "Actores", items: (e.actors ?? []).map((s) => ({ id: s.id, name: s.name })) },
      {
        label: "Sistemas externos",
        items: e.externalSystems.map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Operaciones y tablas externas",
        items: e.externalSystems.flatMap((s) => [
          ...(s.useCases ?? []).map((n) => ({ id: n.id, name: n.name })),
          ...(s.tables ?? []).map((n) => ({ id: n.id, name: n.name })),
          ...(s.mcpServers ?? []).map((n) => ({ id: n.id, name: n.name }))
        ])
      },
      { label: "APIs", items: (e.apis ?? []).map((s) => ({ id: s.id, name: s.name })) },
      {
        label: "Operaciones de API",
        items: (e.apis ?? []).flatMap((s) => s.operations.map((n) => ({ id: n.id, name: n.name })))
      },
      { label: "Proxies API", items: (e.proxyApis ?? []).map((s) => ({ id: s.id, name: s.name })) },
      { label: "Agentes IA", items: (e.aiAgents ?? []).map((s) => ({ id: s.id, name: s.name })) },
      { label: "Gateways MCP", items: (e.mcpGateways ?? []).map((s) => ({ id: s.id, name: s.name })) },
      { label: "RAGs", items: (e.rags ?? []).map((s) => ({ id: s.id, name: s.name })) },
      { label: "Workflows", items: (e.workflows ?? []).map((s) => ({ id: s.id, name: s.name })) }
    ], i = this._paletteFilter.trim().toLowerCase();
    return t.map((s) => ({
      label: s.label,
      items: i ? s.items.filter((n) => n.name.toLowerCase().includes(i)) : s.items
    })).filter((s) => s.items.length > 0);
  }
  onPaletteDragStart(e, t) {
    var i;
    (i = e.dataTransfer) == null || i.setData("application/x-modux-palette", JSON.stringify(t)), e.dataTransfer && (e.dataTransfer.effectAllowed = "copy");
  }
  onPaletteDrop(e) {
    var a;
    const t = (a = e.dataTransfer) == null ? void 0 : a.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const s = i.sceneFromClient(e.clientX, e.clientY), n = i.nodeIdAtClient(e.clientX, e.clientY);
    let o;
    try {
      o = JSON.parse(t);
    } catch {
      return;
    }
    o.new ? this.createFromPalette(o.new, s, n) : o.existing && this.placeExistingFromPalette(o.existing, s, n, e.clientX, e.clientY);
  }
  /** A name (and slug id) that does not collide with anything already in the model. */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((n) => n.id)), s = this.model;
    for (const n of [
      s.modules.map((o) => o.id),
      (s.actors ?? []).map((o) => o.id),
      s.externalSystems.map((o) => o.id),
      (s.apis ?? []).map((o) => o.id),
      (s.proxyApis ?? []).map((o) => o.id),
      (s.aiAgents ?? []).map((o) => o.id),
      (s.rags ?? []).map((o) => o.id),
      (s.workflows ?? []).map((o) => o.id)
    ])
      n.forEach((o) => i.add(o));
    for (let n = 1; ; n++) {
      const o = n === 1 ? e : `${e} ${n}`, a = `${t}${q(o)}`;
      if (!i.has(a)) return { id: a, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, a;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let r = t; r; )
      s.push(r), r = (o = i.nodes.find((l) => l.id === r)) == null ? void 0 : o.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service"
    ].includes(e)) return s.find((r) => this.model.modules.some((l) => l.id === r)) ?? null;
    if (e === "read-model") {
      const r = s.find((c) => (this.model.aggregates ?? []).some((u) => u.id === c));
      if (r) return r;
      const l = s.find((c) => this.model.modules.some((u) => u.id === c));
      return ((a = (this.model.aggregates ?? []).find((c) => c.moduleId === l)) == null ? void 0 : a.id) ?? null;
    }
    return ["external-use-case", "external-table", "mcp-server"].includes(e) ? s.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? null : e === "api-operation" ? s.find((r) => (this.model.apis ?? []).some((l) => l.id === r)) ?? null : e === "api" ? s.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? s.find((r) => this.model.modules.some((l) => l.id === r)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    const s = K.PALETTE_NEW.find((u) => u.type === e);
    if (!s) return;
    const n = this._view, o = this.sceneFor(n), a = (u, m) => {
      const p = this.viewLayout(n), f = m ? o.nodes.find((I) => I.id === m) : void 0, w = f ? { x: Math.round(t.x - f.x), y: Math.round(t.y - f.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(n, { ...p, nodes: { ...p.nodes, [u]: w } }), { kind: "move-node", view: n, id: u, pos: null };
    }, r = (u, m, p) => {
      const f = this.inverseOf(u) ?? [];
      this.command(u, !1);
      const w = a(m, p);
      this.pushUndoEntry([...f, w]);
    };
    if (!s.child) {
      const u = {
        module: "mod-",
        actor: "",
        "external-system": "ext-",
        "ai-agent": "agent-",
        "external-ai-agent": "agent-",
        "mcp-gateway": "mcpgw-",
        rag: "rag-",
        api: "api-",
        "proxy-api": "proxy-",
        workflow: "wf-"
      }, { id: m, name: p } = this.uniquePaletteName(s.label, u[e] ?? ""), f = e === "module" ? { kind: "add-module", id: m, name: p, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: m, name: p } : e === "external-system" ? { kind: "add-external-system", id: m, name: p } : e === "ai-agent" ? { kind: "add-ai-agent", id: m, name: p } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: m, name: p, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: m, name: p } : e === "rag" ? { kind: "add-rag", id: m, name: p } : e === "api" ? { kind: "add-api", id: m, name: p } : e === "proxy-api" ? { kind: "add-proxy-api", id: m, name: p } : {
        kind: "add-workflow",
        id: m,
        name: p,
        completionEventName: `${p.replace(/\s+/g, "")}Completado`
      };
      r(f, m);
      return;
    }
    if (e === "api") {
      const u = this.dropContainerFor("api", i);
      if (!u) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: m, name: p } = this.uniquePaletteName("API", "api-"), f = { kind: "add-api", id: m, name: p }, w = this.inverseOf(f) ?? [];
      this.command(f, !1), this.model.externalSystems.some((N) => N.id === u) ? this.command({ kind: "set-api-publisher", id: m, targetId: u }, !1) : this.command({ kind: "add-api-implementation", apiId: m, moduleId: u }, !1);
      const I = this.viewLayout(this._view), P = this.sceneFor(this._view).nodes.find((N) => N.id === u), v = P ? { x: Math.round(t.x - P.x), y: Math.round(t.y - P.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...I, nodes: { ...I.nodes, [m]: v } }), this.pushUndoEntry([...w, { kind: "move-node", view: this._view, id: m, pos: null }]);
      return;
    }
    const l = this.dropContainerFor(e, i);
    if (!l) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { name: c } = this.uniquePaletteName(s.label, "");
    if (e === "aggregate") {
      const u = `agg-${q(c)}`;
      r({ kind: "add-aggregate", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "use-case" || e === "policy") {
      const u = `uc-${q(c)}`;
      r(
        { kind: "add-use-case", id: u, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        u,
        l
      );
    } else if (e === "domain-event") {
      const u = `ev-${q(c)}`;
      r({ kind: "add-domain-event", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "application-event") {
      const u = `aev-${q(c)}`;
      r({ kind: "add-application-event", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "domain-service") {
      const u = `ds-${q(c)}`;
      r({ kind: "add-domain-service", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "query-service") {
      const u = `qs-${q(c)}`;
      r({ kind: "add-query-service", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "read-model") {
      const u = `rm-${q(c)}`, m = (this.model.aggregates ?? []).find((p) => p.id === l);
      r({ kind: "add-read-model", id: u, name: c, aggregateId: l }, u, (m == null ? void 0 : m.moduleId) ?? l);
    } else if (e === "api-operation") {
      const u = `apiop-${l.replace(/^api-/, "")}-${q(c)}`;
      r({ kind: "add-api-operation", apiId: l, id: u, name: c }, u, l);
    } else if (e === "external-use-case") {
      const u = `xuc-${q(c)}`;
      r({ kind: "add-external-use-case", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "external-table") {
      const u = `tbl-${q(c)}`;
      r({ kind: "add-external-table", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "mcp-server") {
      const u = `mcpsrv-${q(c)}`;
      r({ kind: "add-mcp-server", id: u, name: c, moduleId: l }, u, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, s, n) {
    if (i && i !== e) {
      this.applyConnection(e, i, s, n);
      return;
    }
    const o = this._view, a = this.sceneFor(o), r = a.nodes.find((m) => m.id === e);
    if (!r) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const m = this.viewLayout(o);
        this.writeViewLayout(o, {
          ...m,
          nodes: { ...m.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const l = this.viewLayout(o), c = r.parentId ? a.nodes.find((m) => m.id === r.parentId) : void 0, u = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(o, { ...l, nodes: { ...l.nodes, [e]: u } });
  }
  renderPalette() {
    if (!this._paletteOpen || this._view !== "context-map") return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = K.PALETTE_NEW.filter(
      (i) => !e || i.label.toLowerCase().includes(e)
    );
    return T`
      <div class="palette">
        <input
          class="palette-filter"
          placeholder="Filtrar…"
          .value=${this._paletteFilter}
          @input=${(i) => this._paletteFilter = i.target.value}
        />
        <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
        ${t.map(
      (i) => T`
            <div
              class="palette-item ${i.child ? "palette-child" : ""}"
              draggable="true"
              title=${i.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
              @dragstart=${(s) => this.onPaletteDragStart(s, { new: i.type })}
            >
              ＋ ${i.label}
            </div>
          `
    )}
        <div class="palette-h">Existentes — arrastra para colocar o conectar</div>
        ${this.paletteCatalog().map(
      (i) => T`
            <div class="palette-g">${i.label}</div>
            ${i.items.map(
        (s) => T`
                <div
                  class="palette-item"
                  draggable="true"
                  title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                  @dragstart=${(n) => this.onPaletteDragStart(n, { existing: s.id })}
                >
                  ${s.name}
                </div>
              `
      )}
          `
    )}
      </div>
    `;
  }
  createElementFromToolbar() {
    var t, i, s, n, o, a, r, l, c, u, m, p, f, w, I, P, v, N, F, _, x, b, E, M, z, C, U, B, Y, h, y, g, $, O, L;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${q(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: q(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${q(e)}`, name: e });
        else if (this._newContextMapKind === "external-ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${q(e)}`, name: e, external: !0 });
        else if (this._newContextMapKind === "mcp-gateway")
          this.command({ kind: "add-mcp-gateway", id: `mcpgw-${q(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${q(e)}`, name: e });
        else if (this._newContextMapKind === "api") {
          const k = ((t = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : t.id) ?? ((i = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : i.id);
          if (!k) {
            this.emit("modux-notice", {
              message: "Selecciona el sistema externo o el contexto que publica la API antes de crearla"
            });
            return;
          }
          const S = `api-${q(e)}`;
          this.command({ kind: "add-api", id: S, name: e }), this.model.externalSystems.some((R) => R.id === k) ? this.command({ kind: "set-api-publisher", id: S, targetId: k }, !1) : this.command({ kind: "add-api-implementation", apiId: S, moduleId: k }, !1);
        } else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${q(e)}`, name: e });
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const k = (s = (this.model.apis ?? []).find((R) => R.id === this._selectedId)) == null ? void 0 : s.id, S = this._newApiId || k || ((o = (n = this.model.apis) == null ? void 0 : n[0]) == null ? void 0 : o.id);
          if (!S) return;
          this.command({
            kind: "add-api-operation",
            apiId: S,
            id: `apiop-${S.replace(/^api-/, "")}-${q(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const k = (a = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : a.id, S = this._newModuleId || k || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!S) return;
          this.command({ kind: "add-domain-event", id: `ev-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const k = (l = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : l.id, S = this._newModuleId || k || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!S) return;
          this.command({ kind: "add-application-event", id: `aev-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const k = (u = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : u.id, S = this._newModuleId || k || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!S) return;
          this.command({ kind: "add-domain-service", id: `ds-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const k = (p = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : p.id, S = this._newModuleId || k || ((f = this.model.modules[0]) == null ? void 0 : f.id);
          if (!S) return;
          this.command({ kind: "add-query-service", id: `qs-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const k = (w = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : w.id, S = this._newModuleId || k || ((I = this.model.modules[0]) == null ? void 0 : I.id);
          if (!S) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const k = (P = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : P.id, S = this._newModuleId || k || ((v = this.model.modules[0]) == null ? void 0 : v.id);
          if (!S) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: S, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const k = (N = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : N.id, S = this._newExternalId || k || ((F = this.model.externalSystems[0]) == null ? void 0 : F.id);
          if (!S) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${q(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const k = (_ = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : _.id, S = this._newExternalId || k || ((x = this.model.externalSystems[0]) == null ? void 0 : x.id);
          if (!S) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${q(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "mcp-server") {
          const k = (b = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : b.id, S = this._newExternalId || k || ((E = this.model.externalSystems[0]) == null ? void 0 : E.id);
          if (!S) return;
          this.command({
            kind: "add-mcp-server",
            id: `mcpsrv-${q(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const k = (M = (this.model.aggregates ?? []).find((R) => R.id === this._selectedId)) == null ? void 0 : M.id, S = this._newAggregateId || k || ((C = (z = this.model.aggregates) == null ? void 0 : z[0]) == null ? void 0 : C.id);
          if (!S) return;
          this.command({ kind: "add-read-model", id: `rm-${q(e)}`, name: e, aggregateId: S });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${q(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const k = this._newModuleId || ((U = this.model.modules[0]) == null ? void 0 : U.id);
        if (!k) return;
        this.command({ kind: "add-aggregate", id: `agg-${q(e)}`, name: e, moduleId: k });
      } else if (this._view === "flows") {
        const k = this._newTriggerAggId || ((Y = (B = this.model.aggregates) == null ? void 0 : B[0]) == null ? void 0 : Y.id), S = this._newTargetId || ((h = this.model.modules[0]) == null ? void 0 : h.id), R = this._newTriggerEvent.trim();
        if (!k || !S || !R) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: k,
          triggerEvent: R,
          targetId: S
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const k = this._newModuleId || ((y = this.model.modules[0]) == null ? void 0 : y.id);
        if (!k) return;
        this.command({
          kind: "add-process",
          id: `proc-${q(e)}`,
          name: e,
          moduleId: k,
          triggerAggregateId: this._newTriggerAggId || (($ = (g = this.model.aggregates) == null ? void 0 : g[0]) == null ? void 0 : $.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${q(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((L = (O = this.model.aggregates) == null ? void 0 : O[0]) == null ? void 0 : L.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? Ms(i, t.nodes) : e === "flows" ? zs(i, t.nodes) : e === "processes" ? Oi(i, t.nodes) : e === "workflows" ? Qd(i, t.nodes) : e === "eventstorming" ? Hd(i, t.nodes) : $s(i, t.nodes, this._detail, t.sizes ?? {});
    if (this.diff)
      for (const n of s.nodes) {
        const o = this.diff[n.id] ?? this.diff[n.id.replace(/^(tgt:|flow:)/, "")];
        o && (n.diffKind = o);
      }
    return s;
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var l;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((c) => !c.parentId), s = new Set(i.map((c) => c.id)), n = {
      nodes: i,
      edges: t.edges.filter((c) => s.has(c.sourceId) && s.has(c.targetId))
    }, a = await Zd(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((c) => ({
        kind: "move-node",
        view: e,
        id: c.id,
        pos: r.nodes[c.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(r.edges).map((c) => ({
        kind: "set-edge-points",
        view: e,
        id: c,
        points: r.edges[c]
      }))
    ]), this.writeViewLayout(e, { nodes: a, edges: {}, sizes: r.sizes }), await this.updateComplete, (l = this.renderRoot.querySelector("modux-canvas")) == null || l.fit();
  }
  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  refocusCanvasAfterControl(e) {
    var n;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, s = e.type === "click" && !!t.closest("button");
    !i && !s || (n = this.renderRoot.querySelector("modux-canvas")) == null || n.focus();
  }
  render() {
    const e = this.sceneFor(this._view);
    return T`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <div class="tabs">
          ${il.map(
      (t) => T`
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
      (t) => T`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? T`
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
      (t) => T`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this._multi.length ? T`
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
        ${this._view === "context-map" ? T`<select
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
              ${this._detail !== "contexts" ? T`
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
        ${this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table" || this._newContextMapKind === "mcp-server") ? T`<select
              title="Sistema externo dueño del nuevo elemento"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return T`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "api-operation" ? T`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, s;
        return T`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((s = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : s.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "read-model" ? T`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return T`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? T`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${nl.map(
      (t) => T`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? T`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return T`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? T`
              ${this._view === "flows" ? T`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => T`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return T`<option
                      value=${t.id}
                      ?selected=${t.id === (this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id))}
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
              ${this._view === "flows" ? T`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return T`<option
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
          ?data-active=${this._paletteOpen}
          title="Paleta de elementos: arrastra nuevos o existentes al lienzo"
          @click=${() => this._paletteOpen = !this._paletteOpen}
        >
          🧰 Paleta
        </button>
        <button
          class="tab"
          ?hidden=${this._view !== "context-map"}
          title=${this.selectedApiId() ? "Importa un OpenAPI/WSDL sobre la API seleccionada (operaciones y modelos rq/rs)" : "Importa un OpenAPI/WSDL como una nueva API del diagrama"}
          @click=${(t) => t.currentTarget.previousElementSibling.click()}
        >
          ⇪ Importar API${this.selectedApiId() ? " aquí" : "…"}
        </button>
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? T`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => T`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
    )}
              </select>
              <input
                class="new-name"
                placeholder="URI de la fuente…"
                title="La fuente que alimenta el RAG: repo, web, FTP, base de datos, bucket, SharePoint, Confluence, Drive o sistema de ficheros"
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? T`
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
      (t) => T`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? T`<input
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
              ${this.owningProcessOf(this._selectedId) ? T`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? T`
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
      (t) => T`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? T`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => T`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      <div class="canvas-wrap">
      ${this.renderPalette()}
      <modux-canvas
        @dragover=${(t) => t.preventDefault()}
        @drop=${this.onPaletteDrop}
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
      </div>
      <div class="hint">
        ${this._view === "context-map" ? T`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? T`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? T`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : T`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return T`
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
      (s) => s.sourceId === t.sourceId && s.targetId === t.targetId
    );
    i && (i.type ?? "DEPENDS") === e || this.command({
      kind: "add-external-dependency",
      sourceId: t.sourceId,
      targetId: t.targetId,
      type: e
    });
  }
  renderExtDepPicker() {
    var s;
    const e = this._extDepPicker;
    if (!e) return "";
    const t = (s = (this.model.externalSystemDependencies ?? []).find(
      (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
    )) == null ? void 0 : s.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return T`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (n) => T`
            <button
              class="picker-item ${n.type === (t ?? "") ? "current" : ""}"
              title=${n.name}
              @click=${() => this.pickExtDepType(n.type)}
            >
              <span class="abbr">${n.abbr}</span>
              <span class="name">${n.name}</span>
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
      (s) => s.sourceId === e.sourceId && s.targetId === e.targetId
    )) == null ? void 0 : i.type : this._relationType;
    return T`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${tl.map(
      (s) => T`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${wi[s].abbr}</span>
              <span class="name">${wi[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
K.styles = _i`
    .canvas-wrap {
      position: relative;
    }
    .palette {
      position: absolute;
      left: 8px;
      top: 8px;
      bottom: 8px;
      width: 218px;
      overflow-y: auto;
      z-index: 15;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
      padding: 8px;
    }
    .palette-filter {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      font-size: 12px;
      padding: 4px 8px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      margin-bottom: 6px;
    }
    .palette-h {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #64748b;
      margin: 10px 2px 4px;
    }
    .palette-g {
      font-size: 11px;
      font-weight: 600;
      color: #475569;
      margin: 8px 2px 2px;
    }
    .palette-item {
      font-size: 12px;
      color: #1e293b;
      padding: 4px 8px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin: 2px 0;
      cursor: grab;
      background: #f8fafc;
      user-select: none;
    }
    .palette-item:hover {
      background: #eef2ff;
      border-color: #c7d2fe;
    }
    .palette-child {
      border-style: dashed;
    }

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
K.PALETTE_NEW = [
  { type: "module", label: "Contexto" },
  { type: "actor", label: "Actor" },
  { type: "external-system", label: "Sistema externo" },
  { type: "ai-agent", label: "Agente IA" },
  { type: "external-ai-agent", label: "Agente IA externo" },
  { type: "mcp-gateway", label: "Gateway MCP" },
  { type: "rag", label: "RAG" },
  { type: "api", label: "API", child: !0 },
  { type: "proxy-api", label: "Proxy API" },
  { type: "workflow", label: "Workflow" },
  { type: "aggregate", label: "Agregado", child: !0 },
  { type: "use-case", label: "Caso de uso", child: !0 },
  { type: "policy", label: "Policy", child: !0 },
  { type: "domain-event", label: "Evento de dominio", child: !0 },
  { type: "application-event", label: "Evento de aplicación", child: !0 },
  { type: "read-model", label: "Read model", child: !0 },
  { type: "domain-service", label: "Servicio de dominio", child: !0 },
  { type: "query-service", label: "Query service", child: !0 },
  { type: "api-operation", label: "Operación de API", child: !0 },
  { type: "external-use-case", label: "Operación externa", child: !0 },
  { type: "external-table", label: "Tabla externa", child: !0 },
  { type: "mcp-server", label: "Servidor MCP", child: !0 }
];
G([
  Se({ attribute: !1 })
], K.prototype, "model", 2);
G([
  Se({ attribute: !1 })
], K.prototype, "layout", 2);
G([
  Se({ attribute: !1 })
], K.prototype, "diff", 2);
G([
  D()
], K.prototype, "_view", 2);
G([
  D()
], K.prototype, "_detail", 2);
G([
  D()
], K.prototype, "_relationType", 2);
G([
  D()
], K.prototype, "_relationPicker", 2);
G([
  D()
], K.prototype, "_extDepPicker", 2);
G([
  D()
], K.prototype, "_selectedId", 2);
G([
  D()
], K.prototype, "_paletteOpen", 2);
G([
  D()
], K.prototype, "_paletteFilter", 2);
G([
  D()
], K.prototype, "_newName", 2);
G([
  D()
], K.prototype, "_newSubdomain", 2);
G([
  D()
], K.prototype, "_newModuleId", 2);
G([
  D()
], K.prototype, "_newContextMapKind", 2);
G([
  D()
], K.prototype, "_newAggregateId", 2);
G([
  D()
], K.prototype, "_newExternalId", 2);
G([
  D()
], K.prototype, "_newApiId", 2);
G([
  D()
], K.prototype, "_newArchetype", 2);
G([
  D()
], K.prototype, "_newTriggerAggId", 2);
G([
  D()
], K.prototype, "_newTriggerEvent", 2);
G([
  D()
], K.prototype, "_newTargetId", 2);
G([
  D()
], K.prototype, "_undoStack", 2);
G([
  D()
], K.prototype, "_redoStack", 2);
G([
  D()
], K.prototype, "_newStepName", 2);
G([
  D()
], K.prototype, "_newStepType", 2);
G([
  D()
], K.prototype, "_newStepRole", 2);
G([
  D()
], K.prototype, "_newStepDeadline", 2);
G([
  D()
], K.prototype, "_editStepRole", 2);
G([
  D()
], K.prototype, "_editStepDeadline", 2);
G([
  D()
], K.prototype, "_editStepComp", 2);
G([
  D()
], K.prototype, "_newStepUseCase", 2);
G([
  D()
], K.prototype, "_newStepEmits", 2);
G([
  D()
], K.prototype, "_editStepUseCase", 2);
G([
  D()
], K.prototype, "_editStepEmits", 2);
G([
  D()
], K.prototype, "_editStepAwaits", 2);
G([
  D()
], K.prototype, "_multi", 2);
G([
  D()
], K.prototype, "_newViewName", 2);
G([
  D()
], K.prototype, "_activeViewId", 2);
G([
  D()
], K.prototype, "_newRagSourceType", 2);
G([
  D()
], K.prototype, "_newRagSourceUri", 2);
G([
  D()
], K.prototype, "_addMemberKey", 2);
G([
  D()
], K.prototype, "_treeOpen", 2);
G([
  D()
], K.prototype, "_deletePicker", 2);
K = G([
  ki("modux-editor")
], K);
var rl = Object.defineProperty, dl = Object.getOwnPropertyDescriptor, ge = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? dl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && rl(t, i, n), n;
};
let le = class extends He {
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
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), s = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, s.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(s));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var n, o, a;
    const i = (n = this._workspace) == null ? void 0 : n.current;
    await this.trackWrite(async () => {
      var r;
      try {
        const l = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!l.ok) {
          let c = `El servidor rechazó la operación (${l.status})`;
          try {
            const u = await l.json();
            u != null && u.message && (c = u.message);
          } catch {
          }
          this.showToast(c);
          return;
        }
        this._workspace = await l.json(), await this.reload(), await this.refreshDiff(), (r = this.renderRoot.querySelector("modux-editor")) == null || r.clearHistory();
      } catch (l) {
        this.showToast(String(l));
      }
    });
    const s = (o = this._workspace) == null ? void 0 : o.current;
    if (s && s !== i) {
      const r = ((a = this._workspace.solutions.find((l) => l.branch === s)) == null ? void 0 : a.name) ?? s.replace(/^solution\//, "");
      this.syncModelContext(
        s,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${r}`
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
      const s = await i.json();
      if (!((t = s.conflicts) != null && t.length)) {
        await this.solutionOp(e, { resolutions: {} }), this.showToast(
          e === "merge" ? "Solución mergeada al sistema: ahora es el nuevo as-is" : "Solución actualizada desde el sistema",
          "info"
        );
        return;
      }
      this._mergeFlow = { op: e, conflicts: s.conflicts, resolutions: {} };
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
    const { content: t, fileName: i, apiId: s, homeExternalId: n, homeModuleId: o } = e.detail;
    await this.trackWrite(async () => {
      try {
        const a = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: s })
        });
        if (!a.ok) {
          let u = `El servidor rechazó el contrato (${a.status})`;
          try {
            const m = await a.json();
            m != null && m.message && (u = m.message);
          } catch {
          }
          this.showToast(u);
          return;
        }
        const { apiId: r } = await a.json(), l = n ? { kind: "set-api-publisher", id: r, targetId: n } : o ? { kind: "add-api-implementation", apiId: r, moduleId: o } : null;
        l && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(l)
        });
        const c = await fetch(`${this.base}/model`);
        c.ok && (this._model = await c.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${r}`, "info");
      } catch (a) {
        this.showToast(String(a));
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
          let s = `El servidor rechazó el comando (${t.status})`;
          try {
            const n = await t.json();
            n != null && n.message && (s = n.message);
          } catch {
          }
          this.showToast(s);
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
    return this._error ? T`<div class="status error">modux editor: ${this._error}</div>` : this._model ? T`
      ${this._workspace ? T`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : T`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (n) => this._diff.changes.filter((o) => o.kind === n).length, s = this._diff.changes.filter((n) => n.kind === "REMOVED").map((n) => n.name ?? n.id);
      return T`<span
                      class="badge solution"
                      title=${s.length ? `Eliminados respecto al sistema: ${s.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? T`
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
      var s;
      const i = (s = this._workspace.solutions.find(
        (n) => n.branch === this._workspace.current
      )) == null ? void 0 : s.status;
      return T`
                      ${i === "EXPLORING" ? T`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? T`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? T`<button
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
      ${this._mergeFlow ? T`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => T`
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
      ${this._toast ? T`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : T`<div class="status">Cargando el modelo…</div>`;
  }
};
le.styles = _i`
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
ge([
  Se()
], le.prototype, "base", 2);
ge([
  D()
], le.prototype, "_model", 2);
ge([
  D()
], le.prototype, "_layout", 2);
ge([
  D()
], le.prototype, "_error", 2);
ge([
  D()
], le.prototype, "_saving", 2);
ge([
  D()
], le.prototype, "_toast", 2);
ge([
  D()
], le.prototype, "_workspace", 2);
ge([
  D()
], le.prototype, "_creatingSolution", 2);
ge([
  D()
], le.prototype, "_newSolutionName", 2);
ge([
  D()
], le.prototype, "_diff", 2);
ge([
  D()
], le.prototype, "_mergeFlow", 2);
le = ge([
  ki("modux-editor-connected")
], le);
export {
  ll as CONTAINER_HEADER,
  cl as CONTAINER_INSET,
  ie as ModuxCanvas,
  K as ModuxEditor,
  le as ModuxEditorConnected,
  Ms as aggregatesScene,
  ze as apiImplNodeId,
  Le as apiOpOccurrenceId,
  ai as containerFit,
  ps as containerMinSize,
  $s as contextMapScene,
  Is as flowCoherence,
  zs as flowsScene,
  At as normalizeViewLayout,
  Oi as processesScene,
  xs as relationEdgeId,
  xi as resolveOverlaps
};
