const dl = 34, ll = 10;
function wi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let r = !1;
    for (let o = 0; o < e.length; o++)
      for (let a = o + 1; a < e.length; a++) {
        const l = e[o], c = e[a], h = i.get(l.id), m = i.get(c.id), p = m.x - h.x, f = m.y - h.y, y = (l.w + c.w) / 2 + t - Math.abs(p), _ = (l.h + c.h) / 2 + t - Math.abs(f);
        if (!(y <= 0 || _ <= 0))
          if (r = !0, y < _) {
            const N = (p >= 0 ? 1 : -1) * y / 2;
            h.x -= N, m.x += N;
          } else {
            const N = (f >= 0 ? 1 : -1) * _ / 2;
            h.y -= N, m.y += N;
          }
      }
    if (!r) break;
  }
  const s = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = i.get(n.id);
    (Math.abs(r.x - n.x) > 0.5 || Math.abs(r.y - n.y) > 0.5) && s.set(n.id, r);
  }
  return s;
}
function hs(e, t = { w: 160, h: 90 }) {
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
function oi(e, t, i) {
  let s = t.w / 2, n = t.w / 2, r = t.h / 2, o = t.h / 2;
  for (const a of i)
    s = Math.max(s, -a.dx + a.w / 2 + 10), n = Math.max(n, a.dx + a.w / 2 + 10), r = Math.max(r, -a.dy + a.h / 2 + 34), o = Math.max(o, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (o - r) / 2,
    w: s + n,
    h: r + o
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
const ps = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ms = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, fs = {
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
const gn = 34, In = 14, gs = 14, we = 108, xe = 32, yn = 12, wn = 10, gt = 2, Is = gt * we + (gt - 1) * yn + 2 * In;
function ys(e, t) {
  return `rel:${e}->${t}`;
}
function ws(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function rt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const xs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, xn = {
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
  const t = Math.max(1, Math.ceil(e / gt)), i = t * xe + (t - 1) * wn;
  return { w: Is, h: gn + i + gs };
}
function Rt(e, t) {
  const i = e % gt, s = Math.floor(e / gt);
  return {
    x: -t.w / 2 + In + i * (we + yn) + we / 2,
    y: -t.h / 2 + gn + s * (xe + wn) + xe / 2
  };
}
function vs(e, t, i, s, n, r, o = !1) {
  const a = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), l = [
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
  if (!l.length)
    return [{ ...s, x: i.x, y: i.y, w: Ye, h: je }];
  if (o) {
    const c = new Map((e.apis ?? []).map((m) => [m.id, m])), h = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && c.has(m.apiId)).map((m) => {
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
    if (h.length > 0) {
      const m = l.filter((p) => p.kind !== "api-impl");
      return vn(i, s, h, m, n, r);
    }
  }
  return ct(i, s, l, n, r);
}
function vn(e, t, i, s, n, r) {
  const o = r[t.id] ?? di(i.length + s.length), a = i.map((p, f) => {
    const y = n[p.id] ?? Rt(f, o), _ = p.ops, N = r[p.id] ?? di(_.length), v = _.map((z, $) => n[z.id] ?? Rt($, N)), T = oi(
      { x: y.x, y: y.y },
      N,
      v.map((z) => ({ dx: z.x, dy: z.y, w: we, h: xe }))
    );
    return { a: p, off: y, ops: _, opOffs: v, fit: T };
  }), l = s.map(
    (p, f) => n[p.id] ?? Rt(i.length + f, o)
  ), c = wi(
    [
      ...a.map((p) => ({ id: p.a.id, x: p.fit.x, y: p.fit.y, w: p.fit.w, h: p.fit.h })),
      ...s.map((p, f) => ({
        id: p.id,
        x: l[f].x,
        y: l[f].y,
        w: we,
        h: xe
      }))
    ],
    24
  );
  for (const p of a) {
    const f = c.get(p.a.id);
    f && (p.off = { x: p.off.x + (f.x - p.fit.x), y: p.off.y + (f.y - p.fit.y) }, p.fit = { ...p.fit, x: f.x, y: f.y });
  }
  s.forEach((p, f) => {
    const y = c.get(p.id);
    y && (l[f] = { x: y.x, y: y.y });
  });
  const h = oi(e, o, [
    ...a.map((p) => ({ dx: p.fit.x, dy: p.fit.y, w: p.fit.w, h: p.fit.h })),
    ...l.map((p) => ({ dx: p.x, dy: p.y, w: we, h: xe }))
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
        w: we,
        h: xe,
        tooltip: `${ai[p.a.opKind]}: ${f.name}`
      });
    });
  return s.forEach((p, f) => {
    const y = xn[p.kind];
    m.push({
      id: p.id,
      label: p.name,
      kind: p.kind,
      x: e.x + l[f].x,
      y: e.y + l[f].y,
      w: we,
      h: xe,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${ai[p.kind]} ${p.name}`
    });
  }), m;
}
function ct(e, t, i, s, n) {
  const r = n[t.id] ?? di(i.length), o = i.map((m, p) => s[m.id] ?? Rt(p, r)), a = wi(
    i.map((m, p) => ({ id: m.id, x: o[p].x, y: o[p].y, w: we, h: xe })),
    10
  );
  i.forEach((m, p) => {
    const f = a.get(m.id);
    f && (o[p] = { x: f.x, y: f.y });
  });
  const l = oi(
    e,
    r,
    o.map((m) => ({ dx: m.x, dy: m.y, w: we, h: xe }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, h = i.map((m, p) => {
    const f = o[p], y = m.policy ? xs : xn[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: we,
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
function _s(e, t, i = "contexts", s = {}) {
  const n = i !== "contexts", r = i === "operations", o = new Set(e.externalSystems.map((d) => d.id)), a = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && o.has(d.publishedByExternalSystemId)
  ), l = new Set(a.map((d) => d.id)), c = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && o.has(d.publishedByExternalSystemId)
  ), h = new Set(c.map((d) => d.id)), m = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((d) => !l.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((d) => !h.has(d.id)).map((d) => ({ ref: d, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], p = m.flatMap((d, C) => {
    const L = t[d.ref.id] ?? rt(C, m.length);
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
        x: L.x,
        y: L.y,
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
      if (r && j.targetApiId) {
        const he = (e.apis ?? []).find((ke) => ke.id === j.targetApiId), Pe = (he == null ? void 0 : he.operations) ?? [];
        if (Pe.length > 0)
          return ct(
            L,
            fe,
            Pe.map((ke) => ({
              id: Le(ke.id, j.id),
              name: ke.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...fe, x: L.x, y: L.y, w: Ye, h: je }];
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
        L,
        fe,
        j.operations.map(
          (he) => ({ id: he.id, name: he.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{ ...fe, x: L.x, y: L.y, w: Ye, h: je }];
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
      }, he = a.filter((ee) => ee.publishedByExternalSystemId === j.id), Pe = c.filter((ee) => ee.publishedByExternalSystemId === j.id), ke = [
        ...Pe.map((ee) => ({ id: ee.id, name: ee.name, kind: "proxy-api" })),
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
      ], se = r ? Pe.filter((ee) => {
        const nt = ee.targetApiId ? (e.apis ?? []).find((oe) => oe.id === ee.targetApiId) : void 0;
        return ((nt == null ? void 0 : nt.operations) ?? []).length > 0;
      }) : [];
      if (r && (he.length > 0 || se.length > 0)) {
        const ee = [
          ...he.map((oe) => ({
            id: oe.id,
            name: oe.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${oe.name} — API publicada por ${j.name}`,
            opKind: "api-operation",
            ops: (oe.operations ?? []).map((st) => ({ id: st.id, name: st.name }))
          })),
          ...se.map((oe) => {
            const st = (e.apis ?? []).find((St) => St.id === oe.targetApiId);
            return {
              id: oe.id,
              name: oe.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${oe.name} — proxy/cache de ${st.name}`,
              opKind: "api-op-occurrence",
              ops: (st.operations ?? []).map((St) => ({
                id: Le(St.id, oe.id),
                name: St.name
              }))
            };
          })
        ], nt = new Set(se.map((oe) => oe.id));
        return vn(
          L,
          fe,
          ee,
          ke.filter((oe) => !nt.has(oe.id)),
          t,
          s
        );
      }
      const Ti = [
        ...he.map((ee) => ({ id: ee.id, name: ee.name, kind: "api" })),
        ...ke
      ];
      return Ti.length > 0 ? ct(L, fe, Ti, t, s) : [{ ...fe, x: L.x, y: L.y, w: Ye, h: je }];
    }
    const X = d.ref, Q = X.subdomainType ?? "GENERIC", ae = {
      id: X.id,
      label: X.name,
      kind: "module",
      symbol: "component",
      fill: ps[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${X.name} — subdominio ${Q}`
    };
    if (n) return vs(e, X, L, ae, t, s, r);
    const $e = fn(e, X.id);
    return $e.length > 0 ? ct(L, ae, $e, t, s) : [{ ...ae, x: L.x, y: L.y, w: Ye, h: je }];
  }), f = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, C) => {
    const L = t[d.id] ?? rt(m.length + C, f);
    p.push({
      id: d.id,
      label: d.name,
      x: L.x,
      y: L.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${d.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((d, C) => {
    const L = t[d.id] ?? rt(m.length + (e.actors ?? []).length + C, f);
    p.push({
      id: d.id,
      label: d.name,
      x: L.x,
      y: L.y,
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
  }), (e.mcpGateways ?? []).forEach((d, C) => {
    const L = t[d.id] ?? rt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + C,
      f
    );
    p.push({
      id: d.id,
      label: d.name,
      x: L.x,
      y: L.y,
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
  const y = [];
  (e.rags ?? []).forEach((d, C) => {
    const L = t[d.id] ?? rt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + C,
      f
    );
    p.push({
      id: d.id,
      label: d.name,
      x: L.x,
      y: L.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((X, Q) => {
      const ae = `ragcs:${d.id}:${X.uri}`, $e = t[ae] ?? { x: L.x + 170, y: L.y - 30 + Q * 44 };
      p.push({
        id: ae,
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
      }), y.push({
        id: `ragcse:${d.id}:${X.uri}`,
        sourceId: ae,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), p.sort((d, C) => (d.parentId ? 1 : 0) - (C.parentId ? 1 : 0));
  const _ = e.relations.map((d) => ({
    id: ys(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? ms[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), N = e.flows.map((d) => {
    var $e, j, fe, he, Pe, ke;
    const C = ws(e, d), L = n ? e.modules.find((se) => se.id === d.sourceId) : void 0, X = (($e = L == null ? void 0 : L.domainEvents) == null ? void 0 : $e.find((se) => se.name === d.triggerEvent)) ?? ((j = L == null ? void 0 : L.applicationEvents) == null ? void 0 : j.find((se) => se.name === d.triggerEvent)), Q = n && d.readModelName ? (he = (fe = e.modules.find((se) => se.id === d.targetId)) == null ? void 0 : fe.readModels) == null ? void 0 : he.find((se) => se.name === d.readModelName) : void 0, ae = n && d.targetUseCaseId ? (ke = (Pe = e.modules.find((se) => se.id === d.targetId)) == null ? void 0 : Pe.useCases) == null ? void 0 : ke.find((se) => se.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? d.sourceId,
      targetId: (ae == null ? void 0 : ae.id) ?? (Q == null ? void 0 : Q.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: fs[C],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${C}`
    };
  }), v = new Map((e.apis ?? []).map((d) => [d.id, d])), T = new Set(e.modules.map((d) => d.id)), z = (e.apiImplementations ?? []).filter(
    (d) => v.has(d.apiId) && T.has(d.moduleId)
  ), $ = new Set(p.map((d) => d.id)), F = n ? (e.emissions ?? []).filter((d) => $.has(d.sourceId) && $.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], x = n ? (e.projections ?? []).map((d) => ({
    p: d,
    source: d.sourceAggregateId ?? d.sourceExternalUseCaseId ?? d.sourceExternalTableId
  })).filter(({ p: d, source: C }) => C && d.readModelId).filter(({ p: d, source: C }) => $.has(C) && $.has(d.readModelId)).map(({ p: d, source: C }) => ({
    id: `proj:${d.id}`,
    sourceId: C,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], k = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((C) => {
      const L = n && C.targetUseCaseId && $.has(C.targetUseCaseId) ? C.targetUseCaseId : C.targetModuleId && $.has(C.targetModuleId) ? C.targetModuleId : (C.targetUseCaseId && !n, null);
      if (!L) return [];
      const X = n && $.has(C.id) ? C.id : d.id;
      return $.has(X) ? [
        {
          id: `apiwire:${C.id}`,
          sourceId: X,
          targetId: L,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${C.name} la implementa ${L}`
        }
      ] : [];
    })
  ), S = n ? (e.useCaseCalls ?? []).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], M = n ? (e.queryCalls ?? []).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], H = n ? (e.actorUses ?? []).filter((d) => $.has(d.actorId) && $.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], P = (e.actorExternalDependencies ?? []).filter((d) => $.has(d.actorId) && $.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), D = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), W = (d) => $.has(d) ? d : D.get(d) ?? d, u = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: W(d.targetId),
        cqrs: d.type === "CQRS"
      })).filter(
        (d) => $.has(d.sourceId) && $.has(d.targetId) && d.sourceId !== d.targetId
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
  ], g = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const C of d.useCases ?? []) g.set(C.id, d.id);
    for (const C of d.domainEvents ?? []) g.set(C.id, d.id);
    for (const C of d.applicationEvents ?? []) g.set(C.id, d.id);
  }
  const I = (d) => $.has(d) ? d : g.get(d) ?? d, w = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const C of d.domainEvents ?? []) w.set(C.name, C.id);
    for (const C of d.applicationEvents ?? []) w.set(C.name, C.id);
  }
  const b = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((C) => C.targetUseCaseId).map((C) => ({ sourceId: d.id, targetId: I(C.targetUseCaseId) }))
      ).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => [
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
  ], A = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && w.has(d.triggerEvent)).map((d) => ({
        sourceId: I(w.get(d.triggerEvent)),
        targetId: d.id,
        label: d.triggerEvent
      })).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => [
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
  ], E = /* @__PURE__ */ new Map();
  for (const d of e.externalSystems)
    for (const C of d.tables ?? []) E.set(C.id, d.id);
  const U = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((C) => ({
          sourceId: $.has(C) ? C : E.get(C) ?? C,
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => [
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
  ], Y = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((C) => ({
          sourceId: W(C),
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => [
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
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: W(d.apiId) })).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => [
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
  ], J = [
    ...new Map(
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: W(d.id), targetId: W(d.targetApiId) })).filter(
        (d) => $.has(d.sourceId) && $.has(d.targetId) && d.sourceId !== d.targetId
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
  ], ce = z.flatMap((d) => {
    const C = ze(d.apiId, d.moduleId);
    if (!$.has(C)) return [];
    const L = [];
    for (const X of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === d.apiId)) {
      const Q = W(X.id);
      $.has(Q) && Q !== C && L.push({
        id: `pxr:${Q}->${C}`,
        sourceId: Q,
        targetId: C,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return L;
  }), Ie = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const C = (e.proxyApis ?? []).find((Q) => Q.id === d.proxyId);
    if (!(C != null && C.targetApiId)) return [];
    const L = Le(d.operationId, d.proxyId), X = d.targetSiteId === C.targetApiId ? C.targetApiId : ze(C.targetApiId, d.targetSiteId);
    return !$.has(L) || !$.has(X) ? [] : [{
      id: `oproute:${L}->${X}`,
      sourceId: L,
      targetId: X,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), ue = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!$.has(d.externalSystemId)) return null;
        const C = (e.apis ?? []).find(
          (ae) => ae.operations.some(($e) => $e.id === d.operationId)
        );
        if (!C) return null;
        const L = d.siteId === C.id, X = L ? d.operationId : Le(d.operationId, d.siteId);
        let Q = $.has(X) ? X : null;
        return Q || (L || (e.proxyApis ?? []).some((ae) => ae.id === d.siteId) ? Q = W(d.siteId) : Q = ze(C.id, d.siteId)), !Q || !$.has(Q) || Q === d.externalSystemId ? null : { u: d, target: Q };
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
  ], ye = n ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!$.has(d.useCaseId)) return [];
    const C = $.has(Le(d.operationId, d.moduleId)) ? Le(d.operationId, d.moduleId) : $.has(ze(d.apiId, d.moduleId)) ? ze(d.apiId, d.moduleId) : $.has(W(d.moduleId)) ? W(d.moduleId) : null;
    return C ? [{
      id: `apiimplwire:${d.operationId}@${d.moduleId}`,
      sourceId: C,
      targetId: d.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], it = n ? (e.agentUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Jn = (e.agentRags ?? []).filter((d) => $.has(d.agentId) && $.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), es = n ? (e.rags ?? []).filter((d) => $.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((C) => $.has(C)).map((C) => ({
      id: `ragsrc:${d.id}->${C}`,
      sourceId: d.id,
      targetId: C,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], ts = n ? (e.agentExternalUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], is = n ? (e.agentMcpUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], ns = (e.mcpGateways ?? []).flatMap(
    (d) => [
      ...d.mcpServerIds ?? [],
      ...d.apiIds ?? [],
      ...d.apiOperationIds ?? [],
      ...d.useCaseIds ?? [],
      ...d.ragIds ?? []
    ].filter((C) => $.has(d.id) && $.has(C)).map((C) => ({
      id: `gwx:${d.id}->${C}`,
      sourceId: d.id,
      targetId: C,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), ss = (e.agentGatewayUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), rs = n ? (e.agentApiOpUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], os = n ? (e.agentQueryUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], as = (e.agentDelegations ?? []).filter((d) => $.has(d.agentId) && $.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), ds = (e.actorAgentUses ?? []).filter((d) => $.has(d.actorId) && $.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), ls = n ? (e.agentTriggers ?? []).filter((d) => $.has(d.eventId) && $.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], cs = n ? (e.externalCalls ?? []).filter((d) => $.has(d.externalSystemId) && $.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], us = n ? (e.externalUseCaseCalls ?? []).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => ({
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
      ..._,
      ...N,
      ...F,
      ...x,
      ...k,
      ...S,
      ...M,
      ...H,
      ...P,
      ...u,
      ...J,
      ...ce,
      ...Ie,
      ...ue,
      ...ye,
      ...b,
      ...A,
      ...Z,
      ...U,
      ...Y,
      ...it,
      ...ts,
      ...is,
      ...ns,
      ...ss,
      ...rs,
      ...os,
      ...as,
      ...ds,
      ...ls,
      ...Jn,
      ...es,
      ...y,
      ...cs,
      ...us
    ]
  };
}
const $s = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ks = 176, bs = 60, Es = 140, Ss = 40;
function As(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, r) => {
    const o = 220 + r * 340;
    i.filter((l) => l.moduleId === n.id).forEach((l, c) => {
      const h = s.filter((p) => p.aggregateId === l.id).length, m = 140 + c * (170 + h * 60);
      t[l.id] = { x: o, y: m }, s.filter((p) => p.aggregateId === l.id).forEach((p, f) => {
        t[p.id] = { x: o + 60, y: m + 100 + f * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((r) => r.id === n.moduleId)).forEach((n, r) => {
    t[n.id] = { x: 220 + r * 340, y: 640 };
  }), t;
}
function Cs(e, t) {
  const i = As(e), s = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((c) => [c.id, c])), r = (e.aggregates ?? []).map((c) => {
    const h = n.get(c.moduleId), m = (h == null ? void 0 : h.subdomainType) ?? "GENERIC", p = s(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: ks,
      h: bs,
      kind: "aggregate",
      symbol: "aggregate",
      fill: $s[m],
      stroke: "#64748b",
      badge: h ? `${h.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${h ? ` — módulo ${h.name} (${m})` : ""}`
    };
  }), o = (e.entities ?? []).map((c) => {
    const h = s(c.id);
    return {
      id: c.id,
      label: c.name,
      x: h.x,
      y: h.y,
      w: Es,
      h: Ss,
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
  })), l = (e.aggregateReferences ?? []).map((c, h) => ({
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
    nodes: [...r, ...o],
    edges: [...a, ...l]
  };
}
const Ms = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ns = 150, Ps = 44, Ts = 190, Rs = 56, Os = 160, Us = 48;
function Ds(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function Ls(e, t) {
  const i = e.flows, s = [], n = [], r = /* @__PURE__ */ new Set(), o = (a) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((h) => h.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, l) => {
    const c = 120 + l * 130, h = Ms[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!r.has(m)) {
      r.add(m);
      const N = t[m] ?? { x: 160, y: c };
      s.push({
        id: m,
        label: a.triggerAggregateId ? o(a.triggerAggregateId) : m,
        x: N.x,
        y: N.y,
        w: Ns,
        h: Ps,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const p = `flow:${a.id}`, f = t[p] ?? { x: 470, y: c };
    s.push({
      id: p,
      label: a.name,
      x: f.x,
      y: f.y,
      w: Ts,
      h: Rs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const y = Ds(e, a), _ = `tgt:${y.id}`;
    if (!r.has(_)) {
      r.add(_);
      const N = t[_] ?? { x: 790, y: c };
      s.push({
        id: _,
        label: y.label,
        x: N.x,
        y: N.y,
        w: Os,
        h: Us,
        kind: y.external ? "external-system" : "module",
        symbol: "component",
        fill: y.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: y.external,
        badge: y.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${a.id}:in`,
      sourceId: m,
      targetId: p,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${a.id}:out`,
      sourceId: p,
      targetId: _,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const zs = 190, qs = 56, Zt = 170, Hs = 52;
function Ri(e, t) {
  const i = [], s = [], n = (r) => {
    var o;
    return (o = e.modules.find((a) => a.id === r)) == null ? void 0 : o.name;
  };
  return (e.processes ?? []).forEach((r, o) => {
    const a = 140 + o * 240, l = t[r.id] ?? { x: 150, y: a };
    i.push({
      id: r.id,
      label: r.name,
      x: l.x,
      y: l.y,
      w: zs,
      h: qs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${r.sla ? ` · SLA ${r.sla}` : ""}`,
      tooltip: `${r.name}${n(r.ownerModuleId) ? ` — módulo ${n(r.ownerModuleId)}` : ""}${r.triggerEvent ? ` · arranca con ${r.triggerEvent}` : ""}`
    });
    let c = r.id;
    if (r.steps.forEach((h, m) => {
      const p = h.type === "HUMAN", f = t[h.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: h.id,
        label: h.name,
        x: f.x,
        y: f.y,
        w: Zt,
        h: Hs,
        kind: "process-step",
        symbol: p ? "person" : "gear",
        fill: p ? "#fef3c7" : "#ffffff",
        stroke: p ? "#d97706" : "#64748b",
        badge: p ? `HUMAN${h.roleId ? ` · ${h.roleId}` : ""}${h.deadline ? ` · ⏱ ${h.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${h.name}${h.useCaseId ? ` — use case ${h.useCaseId}` : ""}${h.deadline ? ` · deadline ${h.deadline}` : ""}`
      }), s.push({
        id: `pe:${r.id}:${m}`,
        sourceId: c,
        targetId: h.id,
        kind: "process-seq",
        label: m === 0 ? r.triggerEvent : void 0,
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
        }), s.push({
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
    }), r.onCompletionEventName) {
      const h = `done:${r.id}`, m = t[h] ?? { x: 150 + (r.steps.length + 1) * 240, y: a };
      i.push({
        id: h,
        label: r.onCompletionEventName,
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
        id: `pd:${r.id}`,
        sourceId: c,
        targetId: h,
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
const Ot = globalThis, xi = Ot.ShadowRoot && (Ot.ShadyCSS === void 0 || Ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vi = Symbol(), Oi = /* @__PURE__ */ new WeakMap();
let _n = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== vi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (xi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Oi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Oi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ks = (e) => new _n(typeof e == "string" ? e : e + "", void 0, vi), _i = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new _n(i, e, vi);
}, Vs = (e, t) => {
  if (xi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = Ot.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Ui = xi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Ks(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Fs, defineProperty: Ws, getOwnPropertyDescriptor: Gs, getOwnPropertyNames: Bs, getOwnPropertySymbols: Ys, getPrototypeOf: js } = Object, Oe = globalThis, Di = Oe.trustedTypes, Xs = Di ? Di.emptyScript : "", Jt = Oe.reactiveElementPolyfillSupport, pt = (e, t) => e, qt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Xs : null;
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
} }, $i = (e, t) => !Fs(e, t), Li = { attribute: !0, type: String, converter: qt, reflect: !1, useDefault: !1, hasChanged: $i };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Oe.litPropertyMetadata ?? (Oe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
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
    const { get: n, set: r } = Gs(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: n, set(o) {
      const a = n == null ? void 0 : n.call(this);
      r == null || r.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Li;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pt("elementProperties"))) return;
    const t = js(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pt("properties"))) {
      const i = this.properties, s = [...Bs(i), ...Ys(i)];
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
    return Vs(t, this.constructor.elementStyles), t;
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
    var r;
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : qt).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var r, o;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = s.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : qt;
      this._$Em = n;
      const c = l.fromAttribute(i, a.type);
      this[n] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, r) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? $i)(r, i) || s.useDefault && s.reflect && r === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: r }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, o] of n) {
        const { wrapped: a } = o, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((n) => {
        var r;
        return (r = n.hostUpdate) == null ? void 0 : r.call(n);
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
Xe.elementStyles = [], Xe.shadowRootOptions = { mode: "open" }, Xe[pt("elementProperties")] = /* @__PURE__ */ new Map(), Xe[pt("finalized")] = /* @__PURE__ */ new Map(), Jt == null || Jt({ ReactiveElement: Xe }), (Oe.reactiveElementVersions ?? (Oe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, zi = (e) => e, Ht = mt.trustedTypes, qi = Ht ? Ht.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $n = "$lit$", Re = `lit$${Math.random().toFixed(9).slice(2)}$`, kn = "?" + Re, Qs = `<${kn}>`, We = document, It = () => We.createComment(""), yt = (e) => e === null || typeof e != "object" && typeof e != "function", ki = Array.isArray, Zs = (e) => ki(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ei = `[ 	
\f\r]`, ot = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Hi = /-->/g, Ki = />/g, Ue = RegExp(`>|${ei}(?:([^\\s"'>=/]+)(${ei}*=${ei}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vi = /'/g, Fi = /"/g, bn = /^(?:script|style|textarea|title)$/i, En = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), R = En(1), B = En(2), Ze = Symbol.for("lit-noChange"), ne = Symbol.for("lit-nothing"), Wi = /* @__PURE__ */ new WeakMap(), qe = We.createTreeWalker(We, 129);
function Sn(e, t) {
  if (!ki(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qi !== void 0 ? qi.createHTML(t) : t;
}
const Js = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ot;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, h, m = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, h = o.exec(l), h !== null); ) p = o.lastIndex, o === ot ? h[1] === "!--" ? o = Hi : h[1] !== void 0 ? o = Ki : h[2] !== void 0 ? (bn.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = Ue) : h[3] !== void 0 && (o = Ue) : o === Ue ? h[0] === ">" ? (o = n ?? ot, m = -1) : h[1] === void 0 ? m = -2 : (m = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? Ue : h[3] === '"' ? Fi : Vi) : o === Fi || o === Vi ? o = Ue : o === Hi || o === Ki ? o = ot : (o = Ue, n = void 0);
    const f = o === Ue && e[a + 1].startsWith("/>") ? " " : "";
    r += o === ot ? l + Qs : m >= 0 ? (s.push(c), l.slice(0, m) + $n + l.slice(m) + Re + f) : l + Re + (m === -2 ? a : f);
  }
  return [Sn(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class wt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, h] = Js(t, i);
    if (this.el = wt.createElement(c, s), qe.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (n = qe.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const m of n.getAttributeNames()) if (m.endsWith($n)) {
          const p = h[o++], f = n.getAttribute(m).split(Re), y = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: y[2], strings: f, ctor: y[1] === "." ? tr : y[1] === "?" ? ir : y[1] === "@" ? nr : Yt }), n.removeAttribute(m);
        } else m.startsWith(Re) && (l.push({ type: 6, index: r }), n.removeAttribute(m));
        if (bn.test(n.tagName)) {
          const m = n.textContent.split(Re), p = m.length - 1;
          if (p > 0) {
            n.textContent = Ht ? Ht.emptyScript : "";
            for (let f = 0; f < p; f++) n.append(m[f], It()), qe.nextNode(), l.push({ type: 2, index: ++r });
            n.append(m[p], It());
          }
        }
      } else if (n.nodeType === 8) if (n.data === kn) l.push({ type: 2, index: r });
      else {
        let m = -1;
        for (; (m = n.data.indexOf(Re, m + 1)) !== -1; ) l.push({ type: 7, index: r }), m += Re.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = We.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Je(e, t, i = e, s) {
  var o, a;
  if (t === Ze) return t;
  let n = s !== void 0 ? (o = i._$Co) == null ? void 0 : o[s] : i._$Cl;
  const r = yt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== r && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = Je(e, n._$AS(e, t.values), n, s)), t;
}
class er {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? We).importNode(i, !0);
    qe.currentNode = n;
    let r = qe.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new kt(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new sr(r, this, t)), this._$AV.push(c), l = s[++a];
      }
      o !== (l == null ? void 0 : l.index) && (r = qe.nextNode(), o++);
    }
    return qe.currentNode = We, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class kt {
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
    t = Je(this, t, i), yt(t) ? t === ne || t == null || t === "" ? (this._$AH !== ne && this._$AR(), this._$AH = ne) : t !== this._$AH && t !== Ze && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ne && yt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(We.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = wt.createElement(Sn(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === n) this._$AH.p(i);
    else {
      const o = new er(n, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = Wi.get(t.strings);
    return i === void 0 && Wi.set(t.strings, i = new wt(t)), i;
  }
  k(t) {
    ki(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new kt(this.O(It()), this.O(It()), this, this.options)) : s = i[n], s._$AI(r), n++;
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
  constructor(t, i, s, n, r) {
    this.type = 1, this._$AH = ne, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = ne;
  }
  _$AI(t, i = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = Je(this, t, i, 0), o = !yt(t) || t !== this._$AH && t !== Ze, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = Je(this, a[s + l], i, l), c === Ze && (c = this._$AH[l]), o || (o = !yt(c) || c !== this._$AH[l]), c === ne ? t = ne : t !== ne && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === ne ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class tr extends Yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ne ? void 0 : t;
  }
}
class ir extends Yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ne);
  }
}
class nr extends Yt {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Je(this, t, i, 0) ?? ne) === Ze) return;
    const s = this._$AH, n = t === ne && s !== ne || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== ne && (s === ne || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class sr {
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
ti == null || ti(wt, kt), (mt.litHtmlVersions ?? (mt.litHtmlVersions = [])).push("3.3.3");
const rr = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new kt(t.insertBefore(It(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis;
class Ve extends Xe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = rr(i, this.renderRoot, this.renderOptions);
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
Ve._$litElement$ = !0, Ve.finalized = !0, (mn = Ke.litElementHydrateSupport) == null || mn.call(Ke, { LitElement: Ve });
const ii = Ke.litElementPolyfillSupport;
ii == null || ii({ LitElement: Ve });
(Ke.litElementVersions ?? (Ke.litElementVersions = [])).push("4.2.2");
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
const or = { attribute: !0, type: String, converter: qt, reflect: !1, hasChanged: $i }, ar = (e = or, t, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Se(e) {
  return (t, i) => typeof i == "object" ? ar(e, t, i) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function O(e) {
  return Se({ ...e, state: !0, attribute: !1 });
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
function dr(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === li && t.documentElement.namespaceURI === li ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function lr(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function An(e) {
  var t = jt(e);
  return (t.local ? lr : dr)(t);
}
function cr() {
}
function Ei(e) {
  return e == null ? cr : function() {
    return this.querySelector(e);
  };
}
function ur(e) {
  typeof e != "function" && (e = Ei(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var r = t[n], o = r.length, a = s[n] = new Array(o), l, c, h = 0; h < o; ++h)
      (l = r[h]) && (c = e.call(l, l.__data__, h, r)) && ("__data__" in l && (c.__data__ = l.__data__), a[h] = c);
  return new me(s, this._parents);
}
function hr(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function pr() {
  return [];
}
function Cn(e) {
  return e == null ? pr : function() {
    return this.querySelectorAll(e);
  };
}
function mr(e) {
  return function() {
    return hr(e.apply(this, arguments));
  };
}
function fr(e) {
  typeof e == "function" ? e = mr(e) : e = Cn(e);
  for (var t = this._groups, i = t.length, s = [], n = [], r = 0; r < i; ++r)
    for (var o = t[r], a = o.length, l, c = 0; c < a; ++c)
      (l = o[c]) && (s.push(e.call(l, l.__data__, c, o)), n.push(l));
  return new me(s, n);
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
var gr = Array.prototype.find;
function Ir(e) {
  return function() {
    return gr.call(this.children, e);
  };
}
function yr() {
  return this.firstElementChild;
}
function wr(e) {
  return this.select(e == null ? yr : Ir(typeof e == "function" ? e : Nn(e)));
}
var xr = Array.prototype.filter;
function vr() {
  return Array.from(this.children);
}
function _r(e) {
  return function() {
    return xr.call(this.children, e);
  };
}
function $r(e) {
  return this.selectAll(e == null ? vr : _r(typeof e == "function" ? e : Nn(e)));
}
function kr(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var r = t[n], o = r.length, a = s[n] = [], l, c = 0; c < o; ++c)
      (l = r[c]) && e.call(l, l.__data__, c, r) && a.push(l);
  return new me(s, this._parents);
}
function Pn(e) {
  return new Array(e.length);
}
function br() {
  return new me(this._enter || this._groups.map(Pn), this._parents);
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
function Er(e) {
  return function() {
    return e;
  };
}
function Sr(e, t, i, s, n, r) {
  for (var o = 0, a, l = t.length, c = r.length; o < c; ++o)
    (a = t[o]) ? (a.__data__ = r[o], s[o] = a) : i[o] = new Kt(e, r[o]);
  for (; o < l; ++o)
    (a = t[o]) && (n[o] = a);
}
function Ar(e, t, i, s, n, r, o) {
  var a, l, c = /* @__PURE__ */ new Map(), h = t.length, m = r.length, p = new Array(h), f;
  for (a = 0; a < h; ++a)
    (l = t[a]) && (p[a] = f = o.call(l, l.__data__, a, t) + "", c.has(f) ? n[a] = l : c.set(f, l));
  for (a = 0; a < m; ++a)
    f = o.call(e, r[a], a, r) + "", (l = c.get(f)) ? (s[a] = l, l.__data__ = r[a], c.delete(f)) : i[a] = new Kt(e, r[a]);
  for (a = 0; a < h; ++a)
    (l = t[a]) && c.get(p[a]) === l && (n[a] = l);
}
function Cr(e) {
  return e.__data__;
}
function Mr(e, t) {
  if (!arguments.length) return Array.from(this, Cr);
  var i = t ? Ar : Sr, s = this._parents, n = this._groups;
  typeof e != "function" && (e = Er(e));
  for (var r = n.length, o = new Array(r), a = new Array(r), l = new Array(r), c = 0; c < r; ++c) {
    var h = s[c], m = n[c], p = m.length, f = Nr(e.call(h, h && h.__data__, c, s)), y = f.length, _ = a[c] = new Array(y), N = o[c] = new Array(y), v = l[c] = new Array(p);
    i(h, m, _, N, v, f, t);
    for (var T = 0, z = 0, $, F; T < y; ++T)
      if ($ = _[T]) {
        for (T >= z && (z = T + 1); !(F = N[z]) && ++z < y; ) ;
        $._next = F || null;
      }
  }
  return o = new me(o, s), o._enter = a, o._exit = l, o;
}
function Nr(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Pr() {
  return new me(this._exit || this._groups.map(Pn), this._parents);
}
function Tr(e, t, i) {
  var s = this.enter(), n = this, r = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? r.remove() : i(r), s && n ? s.merge(n).order() : n;
}
function Rr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, r = s.length, o = Math.min(n, r), a = new Array(n), l = 0; l < o; ++l)
    for (var c = i[l], h = s[l], m = c.length, p = a[l] = new Array(m), f, y = 0; y < m; ++y)
      (f = c[y] || h[y]) && (p[y] = f);
  for (; l < n; ++l)
    a[l] = i[l];
  return new me(a, this._parents);
}
function Or() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, r = s[n], o; --n >= 0; )
      (o = s[n]) && (r && o.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(o, r), r = o);
  return this;
}
function Ur(e) {
  e || (e = Dr);
  function t(m, p) {
    return m && p ? e(m.__data__, p.__data__) : !m - !p;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), r = 0; r < s; ++r) {
    for (var o = i[r], a = o.length, l = n[r] = new Array(a), c, h = 0; h < a; ++h)
      (c = o[h]) && (l[h] = c);
    l.sort(t);
  }
  return new me(n, this._parents).order();
}
function Dr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Lr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function zr() {
  return Array.from(this);
}
function qr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, r = s.length; n < r; ++n) {
      var o = s[n];
      if (o) return o;
    }
  return null;
}
function Hr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Kr() {
  return !this.node();
}
function Vr(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], r = 0, o = n.length, a; r < o; ++r)
      (a = n[r]) && e.call(a, a.__data__, r, n);
  return this;
}
function Fr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Wr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Gr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Br(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Yr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function jr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Xr(e, t) {
  var i = jt(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Wr : Fr : typeof t == "function" ? i.local ? jr : Yr : i.local ? Br : Gr)(i, t));
}
function Tn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Qr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Zr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Jr(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function eo(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Qr : typeof t == "function" ? Jr : Zr)(e, t, i ?? "")) : et(this.node(), e);
}
function et(e, t) {
  return e.style.getPropertyValue(t) || Tn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function to(e) {
  return function() {
    delete this[e];
  };
}
function io(e, t) {
  return function() {
    this[e] = t;
  };
}
function no(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function so(e, t) {
  return arguments.length > 1 ? this.each((t == null ? to : typeof t == "function" ? no : io)(e, t)) : this.node()[e];
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
  for (var i = Si(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function Dn(e, t) {
  for (var i = Si(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function ro(e) {
  return function() {
    Un(this, e);
  };
}
function oo(e) {
  return function() {
    Dn(this, e);
  };
}
function ao(e, t) {
  return function() {
    (t.apply(this, arguments) ? Un : Dn)(this, e);
  };
}
function lo(e, t) {
  var i = Rn(e + "");
  if (arguments.length < 2) {
    for (var s = Si(this.node()), n = -1, r = i.length; ++n < r; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? ao : t ? ro : oo)(i, t));
}
function co() {
  this.textContent = "";
}
function uo(e) {
  return function() {
    this.textContent = e;
  };
}
function ho(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function po(e) {
  return arguments.length ? this.each(e == null ? co : (typeof e == "function" ? ho : uo)(e)) : this.node().textContent;
}
function mo() {
  this.innerHTML = "";
}
function fo(e) {
  return function() {
    this.innerHTML = e;
  };
}
function go(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Io(e) {
  return arguments.length ? this.each(e == null ? mo : (typeof e == "function" ? go : fo)(e)) : this.node().innerHTML;
}
function yo() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function wo() {
  return this.each(yo);
}
function xo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function vo() {
  return this.each(xo);
}
function _o(e) {
  var t = typeof e == "function" ? e : An(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function $o() {
  return null;
}
function ko(e, t) {
  var i = typeof e == "function" ? e : An(e), s = t == null ? $o : typeof t == "function" ? t : Ei(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function bo() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Eo() {
  return this.each(bo);
}
function So() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ao() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Co(e) {
  return this.select(e ? Ao : So);
}
function Mo(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function No(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Po(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function To(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, r; i < n; ++i)
        r = t[i], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++s] = r;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Ro(e, t, i) {
  return function() {
    var s = this.__on, n, r = No(t);
    if (s) {
      for (var o = 0, a = s.length; o < a; ++o)
        if ((n = s[o]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = r, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, r, i), n = { type: e.type, name: e.name, value: t, listener: r, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function Oo(e, t, i) {
  var s = Po(e + ""), n, r = s.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, h; l < c; ++l)
        for (n = 0, h = a[l]; n < r; ++n)
          if ((o = s[n]).type === h.type && o.name === h.name)
            return h.value;
    }
    return;
  }
  for (a = t ? Ro : To, n = 0; n < r; ++n) this.each(a(s[n], t, i));
  return this;
}
function Ln(e, t, i) {
  var s = Tn(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function Uo(e, t) {
  return function() {
    return Ln(this, e, t);
  };
}
function Do(e, t) {
  return function() {
    return Ln(this, e, t.apply(this, arguments));
  };
}
function Lo(e, t) {
  return this.each((typeof t == "function" ? Do : Uo)(e, t));
}
function* zo() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, r = s.length, o; n < r; ++n)
      (o = s[n]) && (yield o);
}
var zn = [null];
function me(e, t) {
  this._groups = e, this._parents = t;
}
function bt() {
  return new me([[document.documentElement]], zn);
}
function qo() {
  return this;
}
me.prototype = bt.prototype = {
  constructor: me,
  select: ur,
  selectAll: fr,
  selectChild: wr,
  selectChildren: $r,
  filter: kr,
  data: Mr,
  enter: br,
  exit: Pr,
  join: Tr,
  merge: Rr,
  selection: qo,
  order: Or,
  sort: Ur,
  call: Lr,
  nodes: zr,
  node: qr,
  size: Hr,
  empty: Kr,
  each: Vr,
  attr: Xr,
  style: eo,
  property: so,
  classed: lo,
  text: po,
  html: Io,
  raise: wo,
  lower: vo,
  append: _o,
  insert: ko,
  remove: Eo,
  clone: Co,
  datum: Mo,
  on: Oo,
  dispatch: Lo,
  [Symbol.iterator]: zo
};
function be(e) {
  return typeof e == "string" ? new me([[document.querySelector(e)]], [document.documentElement]) : new me([[e]], zn);
}
function Ho(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function De(e, t) {
  if (e = Ho(e), t === void 0 && (t = e.currentTarget), t) {
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
var Ko = { value: () => {
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
function Vo(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
Ut.prototype = Ai.prototype = {
  constructor: Ut,
  on: function(e, t) {
    var i = this._, s = Vo(e + "", i), n, r = -1, o = s.length;
    if (arguments.length < 2) {
      for (; ++r < o; ) if ((n = (e = s[r]).type) && (n = Fo(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++r < o; )
      if (n = (e = s[r]).type) i[n] = Bi(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = Bi(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Ut(e);
  },
  call: function(e, t) {
    if ((n = arguments.length - 2) > 0) for (var i = new Array(n), s = 0, n, r; s < n; ++s) i[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (r = this._[e], s = 0, n = r.length; s < n; ++s) r[s].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var s = this._[e], n = 0, r = s.length; n < r; ++n) s[n].value.apply(t, i);
  }
};
function Fo(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function Bi(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = Ko, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const ci = { capture: !0, passive: !1 };
function ui(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Wo(e) {
  var t = e.document.documentElement, i = be(e).on("dragstart.drag", ui, ci);
  "onselectstart" in t ? i.on("selectstart.drag", ui, ci) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Go(e, t) {
  var i = e.document.documentElement, s = be(e).on("dragstart.drag", null);
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
var xt = 0.7, Vt = 1 / xt, Qe = "\\s*([+-]?\\d+)\\s*", vt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Bo = /^#([0-9a-f]{3,8})$/, Yo = new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`), jo = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), Xo = new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${vt}\\)$`), Qo = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${vt}\\)$`), Zo = new RegExp(`^hsl\\(${vt},${Ee},${Ee}\\)$`), Jo = new RegExp(`^hsla\\(${vt},${Ee},${Ee},${vt}\\)$`), Yi = {
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
  formatHex8: ea,
  formatHsl: ta,
  formatRgb: Xi,
  toString: Xi
});
function ji() {
  return this.rgb().formatHex();
}
function ea() {
  return this.rgb().formatHex8();
}
function ta() {
  return Hn(this).formatHsl();
}
function Xi() {
  return this.rgb().formatRgb();
}
function _t(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Bo.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Qi(t) : i === 3 ? new de(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Ct(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Ct(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Yo.exec(e)) ? new de(t[1], t[2], t[3], 1) : (t = jo.exec(e)) ? new de(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Xo.exec(e)) ? Ct(t[1], t[2], t[3], t[4]) : (t = Qo.exec(e)) ? Ct(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Zo.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, 1) : (t = Jo.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, t[4]) : Yi.hasOwnProperty(e) ? Qi(Yi[e]) : e === "transparent" ? new de(NaN, NaN, NaN, 0) : null;
}
function Qi(e) {
  return new de(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ct(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new de(e, t, i, s);
}
function ia(e) {
  return e instanceof Et || (e = _t(e)), e ? (e = e.rgb(), new de(e.r, e.g, e.b, e.opacity)) : new de();
}
function hi(e, t, i, s) {
  return arguments.length === 1 ? ia(e) : new de(e, t, i, s ?? 1);
}
function de(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
Ci(de, hi, qn(Et, {
  brighter(e) {
    return e = e == null ? Vt : Math.pow(Vt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? xt : Math.pow(xt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new de(Fe(this.r), Fe(this.g), Fe(this.b), Ft(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Zi,
  // Deprecated! Use color.formatHex.
  formatHex: Zi,
  formatHex8: na,
  formatRgb: Ji,
  toString: Ji
}));
function Zi() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}`;
}
function na() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}${He((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ji() {
  const e = Ft(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Fe(this.r)}, ${Fe(this.g)}, ${Fe(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ft(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Fe(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function He(e) {
  return e = Fe(e), (e < 16 ? "0" : "") + e.toString(16);
}
function en(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ve(e, t, i, s);
}
function Hn(e) {
  if (e instanceof ve) return new ve(e.h, e.s, e.l, e.opacity);
  if (e instanceof Et || (e = _t(e)), !e) return new ve();
  if (e instanceof ve) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), r = Math.max(t, i, s), o = NaN, a = r - n, l = (r + n) / 2;
  return a ? (t === r ? o = (i - s) / a + (i < s) * 6 : i === r ? o = (s - t) / a + 2 : o = (t - i) / a + 4, a /= l < 0.5 ? r + n : 2 - r - n, o *= 60) : a = l > 0 && l < 1 ? 0 : o, new ve(o, a, l, e.opacity);
}
function sa(e, t, i, s) {
  return arguments.length === 1 ? Hn(e) : new ve(e, t, i, s ?? 1);
}
function ve(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
Ci(ve, sa, qn(Et, {
  brighter(e) {
    return e = e == null ? Vt : Math.pow(Vt, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? xt : Math.pow(xt, e), new ve(this.h, this.s, this.l * e, this.opacity);
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
    return new ve(tn(this.h), Mt(this.s), Mt(this.l), Ft(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ft(this.opacity);
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
const Kn = (e) => () => e;
function ra(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function oa(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function aa(e) {
  return (e = +e) == 1 ? Vn : function(t, i) {
    return i - t ? oa(t, i, e) : Kn(isNaN(t) ? i : t);
  };
}
function Vn(e, t) {
  var i = t - e;
  return i ? ra(e, i) : Kn(isNaN(e) ? t : e);
}
const nn = (function e(t) {
  var i = aa(t);
  function s(n, r) {
    var o = i((n = hi(n)).r, (r = hi(r)).r), a = i(n.g, r.g), l = i(n.b, r.b), c = Vn(n.opacity, r.opacity);
    return function(h) {
      return n.r = o(h), n.g = a(h), n.b = l(h), n.opacity = c(h), n + "";
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
function da(e) {
  return function() {
    return e;
  };
}
function la(e) {
  return function(t) {
    return e(t) + "";
  };
}
function ca(e, t) {
  var i = pi.lastIndex = si.lastIndex = 0, s, n, r, o = -1, a = [], l = [];
  for (e = e + "", t = t + ""; (s = pi.exec(e)) && (n = si.exec(t)); )
    (r = n.index) > i && (r = t.slice(i, r), a[o] ? a[o] += r : a[++o] = r), (s = s[0]) === (n = n[0]) ? a[o] ? a[o] += n : a[++o] = n : (a[++o] = null, l.push({ i: o, x: Te(s, n) })), i = si.lastIndex;
  return i < t.length && (r = t.slice(i), a[o] ? a[o] += r : a[++o] = r), a.length < 2 ? l[0] ? la(l[0].x) : da(t) : (t = l.length, function(c) {
    for (var h = 0, m; h < t; ++h) a[(m = l[h]).i] = m.x(c);
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
function Fn(e, t, i, s, n, r) {
  var o, a, l;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (l = e * i + t * s) && (i -= e * l, s -= t * l), (a = Math.sqrt(i * i + s * s)) && (i /= a, s /= a, l /= a), e * s < t * i && (e = -e, t = -t, l = -l, o = -o), {
    translateX: n,
    translateY: r,
    rotate: Math.atan2(t, e) * sn,
    skewX: Math.atan(l) * sn,
    scaleX: o,
    scaleY: a
  };
}
var Nt;
function ua(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? mi : Fn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function ha(e) {
  return e == null || (Nt || (Nt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Nt.setAttribute("transform", e), !(e = Nt.transform.baseVal.consolidate())) ? mi : (e = e.matrix, Fn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Wn(e, t, i, s) {
  function n(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, h, m, p, f, y) {
    if (c !== m || h !== p) {
      var _ = f.push("translate(", null, t, null, i);
      y.push({ i: _ - 4, x: Te(c, m) }, { i: _ - 2, x: Te(h, p) });
    } else (m || p) && f.push("translate(" + m + t + p + i);
  }
  function o(c, h, m, p) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), p.push({ i: m.push(n(m) + "rotate(", null, s) - 2, x: Te(c, h) })) : h && m.push(n(m) + "rotate(" + h + s);
  }
  function a(c, h, m, p) {
    c !== h ? p.push({ i: m.push(n(m) + "skewX(", null, s) - 2, x: Te(c, h) }) : h && m.push(n(m) + "skewX(" + h + s);
  }
  function l(c, h, m, p, f, y) {
    if (c !== m || h !== p) {
      var _ = f.push(n(f) + "scale(", null, ",", null, ")");
      y.push({ i: _ - 4, x: Te(c, m) }, { i: _ - 2, x: Te(h, p) });
    } else (m !== 1 || p !== 1) && f.push(n(f) + "scale(" + m + "," + p + ")");
  }
  return function(c, h) {
    var m = [], p = [];
    return c = e(c), h = e(h), r(c.translateX, c.translateY, h.translateX, h.translateY, m, p), o(c.rotate, h.rotate, m, p), a(c.skewX, h.skewX, m, p), l(c.scaleX, c.scaleY, h.scaleX, h.scaleY, m, p), c = h = null, function(f) {
      for (var y = -1, _ = p.length, N; ++y < _; ) m[(N = p[y]).i] = N.x(f);
      return m.join("");
    };
  };
}
var pa = Wn(ua, "px, ", "px)", "deg)"), ma = Wn(ha, ", ", ")", ")"), fa = 1e-12;
function rn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ga(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ia(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ya = (function e(t, i, s) {
  function n(r, o) {
    var a = r[0], l = r[1], c = r[2], h = o[0], m = o[1], p = o[2], f = h - a, y = m - l, _ = f * f + y * y, N, v;
    if (_ < fa)
      v = Math.log(p / c) / t, N = function(k) {
        return [
          a + k * f,
          l + k * y,
          c * Math.exp(t * k * v)
        ];
      };
    else {
      var T = Math.sqrt(_), z = (p * p - c * c + s * _) / (2 * c * i * T), $ = (p * p - c * c - s * _) / (2 * p * i * T), F = Math.log(Math.sqrt(z * z + 1) - z), x = Math.log(Math.sqrt($ * $ + 1) - $);
      v = (x - F) / t, N = function(k) {
        var S = k * v, M = rn(F), H = c / (i * T) * (M * Ia(t * S + F) - ga(F));
        return [
          a + H * f,
          l + H * y,
          c * M / rn(t * S + F)
        ];
      };
    }
    return N.duration = v * 1e3 * t / Math.SQRT2, N;
  }
  return n.rho = function(r) {
    var o = Math.max(1e-3, +r), a = o * o, l = a * a;
    return e(o, a, l);
  }, n;
})(Math.SQRT2, 2, 4);
var tt = 0, ut = 0, at = 0, Gn = 1e3, Wt, ht, Gt = 0, Ge = 0, Xt = 0, $t = typeof performance == "object" && performance.now ? performance : Date, Bn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Mi() {
  return Ge || (Bn(wa), Ge = $t.now() + Xt);
}
function wa() {
  Ge = 0;
}
function Bt() {
  this._call = this._time = this._next = null;
}
Bt.prototype = Yn.prototype = {
  constructor: Bt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Mi() : +i) + (t == null ? 0 : +t), !this._next && ht !== this && (ht ? ht._next = this : Wt = this, ht = this), this._call = e, this._time = i, fi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, fi());
  }
};
function Yn(e, t, i) {
  var s = new Bt();
  return s.restart(e, t, i), s;
}
function xa() {
  Mi(), ++tt;
  for (var e = Wt, t; e; )
    (t = Ge - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --tt;
}
function on() {
  Ge = (Gt = $t.now()) + Xt, tt = ut = 0;
  try {
    xa();
  } finally {
    tt = 0, _a(), Ge = 0;
  }
}
function va() {
  var e = $t.now(), t = e - Gt;
  t > Gn && (Xt -= t, Gt = e);
}
function _a() {
  for (var e, t = Wt, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Wt = i);
  ht = e, fi(s);
}
function fi(e) {
  if (!tt) {
    ut && (ut = clearTimeout(ut));
    var t = e - Ge;
    t > 24 ? (e < 1 / 0 && (ut = setTimeout(on, e - $t.now() - Xt)), at && (at = clearInterval(at))) : (at || (Gt = $t.now(), at = setInterval(va, Gn)), tt = 1, Bn(on));
  }
}
function an(e, t, i) {
  var s = new Bt();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var $a = Ai("start", "end", "cancel", "interrupt"), ka = [], jn = 0, dn = 1, gi = 2, Dt = 3, ln = 4, Ii = 5, Lt = 6;
function Qt(e, t, i, s, n, r) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (i in o) return;
  ba(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: $a,
    tween: ka,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: jn
  });
}
function Ni(e, t) {
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
function ba(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Yn(r, 0, i.time);
  function r(c) {
    i.state = dn, i.timer.restart(o, i.delay, i.time), i.delay <= c && o(c - i.delay);
  }
  function o(c) {
    var h, m, p, f;
    if (i.state !== dn) return l();
    for (h in s)
      if (f = s[h], f.name === i.name) {
        if (f.state === Dt) return an(o);
        f.state === ln ? (f.state = Lt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete s[h]) : +h < t && (f.state = Lt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete s[h]);
      }
    if (an(function() {
      i.state === Dt && (i.state = ln, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = gi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === gi) {
      for (i.state = Dt, n = new Array(p = i.tween.length), h = 0, m = -1; h < p; ++h)
        (f = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (n[++m] = f);
      n.length = m + 1;
    }
  }
  function a(c) {
    for (var h = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = Ii, 1), m = -1, p = n.length; ++m < p; )
      n[m].call(e, h);
    i.state === Ii && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Lt, i.timer.stop(), delete s[t];
    for (var c in s) return;
    delete e.__transition;
  }
}
function zt(e, t) {
  var i = e.__transition, s, n, r = !0, o;
  if (i) {
    t = t == null ? null : t + "";
    for (o in i) {
      if ((s = i[o]).name !== t) {
        r = !1;
        continue;
      }
      n = s.state > gi && s.state < Ii, s.state = Lt, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[o];
    }
    r && delete e.__transition;
  }
}
function Ea(e) {
  return this.each(function() {
    zt(this, e);
  });
}
function Sa(e, t) {
  var i, s;
  return function() {
    var n = Ae(this, e), r = n.tween;
    if (r !== i) {
      s = i = r;
      for (var o = 0, a = s.length; o < a; ++o)
        if (s[o].name === t) {
          s = s.slice(), s.splice(o, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function Aa(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var r = Ae(this, e), o = r.tween;
    if (o !== s) {
      n = (s = o).slice();
      for (var a = { name: t, value: i }, l = 0, c = n.length; l < c; ++l)
        if (n[l].name === t) {
          n[l] = a;
          break;
        }
      l === c && n.push(a);
    }
    r.tween = n;
  };
}
function Ca(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = _e(this.node(), i).tween, n = 0, r = s.length, o; n < r; ++n)
      if ((o = s[n]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? Sa : Aa)(i, e, t));
}
function Pi(e, t, i) {
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
  return (typeof t == "number" ? Te : t instanceof _t ? nn : (i = _t(t)) ? (t = i, nn) : ca)(e, t);
}
function Ma(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Na(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Pa(e, t, i) {
  var s, n = i + "", r;
  return function() {
    var o = this.getAttribute(e);
    return o === n ? null : o === s ? r : r = t(s = o, i);
  };
}
function Ta(e, t, i) {
  var s, n = i + "", r;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === n ? null : o === s ? r : r = t(s = o, i);
  };
}
function Ra(e, t, i) {
  var s, n, r;
  return function() {
    var o, a = i(this), l;
    return a == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), l = a + "", o === l ? null : o === s && l === n ? r : (n = l, r = t(s = o, a)));
  };
}
function Oa(e, t, i) {
  var s, n, r;
  return function() {
    var o, a = i(this), l;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), l = a + "", o === l ? null : o === s && l === n ? r : (n = l, r = t(s = o, a)));
  };
}
function Ua(e, t) {
  var i = jt(e), s = i === "transform" ? ma : Xn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Oa : Ra)(i, s, Pi(this, "attr." + e, t)) : t == null ? (i.local ? Na : Ma)(i) : (i.local ? Ta : Pa)(i, s, t));
}
function Da(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function La(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function za(e, t) {
  var i, s;
  function n() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && La(e, r)), i;
  }
  return n._value = t, n;
}
function qa(e, t) {
  var i, s;
  function n() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && Da(e, r)), i;
  }
  return n._value = t, n;
}
function Ha(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = jt(e);
  return this.tween(i, (s.local ? za : qa)(s, t));
}
function Ka(e, t) {
  return function() {
    Ni(this, e).delay = +t.apply(this, arguments);
  };
}
function Va(e, t) {
  return t = +t, function() {
    Ni(this, e).delay = t;
  };
}
function Fa(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ka : Va)(t, e)) : _e(this.node(), t).delay;
}
function Wa(e, t) {
  return function() {
    Ae(this, e).duration = +t.apply(this, arguments);
  };
}
function Ga(e, t) {
  return t = +t, function() {
    Ae(this, e).duration = t;
  };
}
function Ba(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Wa : Ga)(t, e)) : _e(this.node(), t).duration;
}
function Ya(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ae(this, e).ease = t;
  };
}
function ja(e) {
  var t = this._id;
  return arguments.length ? this.each(Ya(t, e)) : _e(this.node(), t).ease;
}
function Xa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ae(this, e).ease = i;
  };
}
function Qa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Xa(this._id, e));
}
function Za(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var r = t[n], o = r.length, a = s[n] = [], l, c = 0; c < o; ++c)
      (l = r[c]) && e.call(l, l.__data__, c, r) && a.push(l);
  return new Ne(s, this._parents, this._name, this._id);
}
function Ja(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, r = Math.min(s, n), o = new Array(s), a = 0; a < r; ++a)
    for (var l = t[a], c = i[a], h = l.length, m = o[a] = new Array(h), p, f = 0; f < h; ++f)
      (p = l[f] || c[f]) && (m[f] = p);
  for (; a < s; ++a)
    o[a] = t[a];
  return new Ne(o, this._parents, this._name, this._id);
}
function ed(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function td(e, t, i) {
  var s, n, r = ed(t) ? Ni : Ae;
  return function() {
    var o = r(this, e), a = o.on;
    a !== s && (n = (s = a).copy()).on(t, i), o.on = n;
  };
}
function id(e, t) {
  var i = this._id;
  return arguments.length < 2 ? _e(this.node(), i).on.on(e) : this.each(td(i, e, t));
}
function nd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function sd() {
  return this.on("end.remove", nd(this._id));
}
function rd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ei(e));
  for (var s = this._groups, n = s.length, r = new Array(n), o = 0; o < n; ++o)
    for (var a = s[o], l = a.length, c = r[o] = new Array(l), h, m, p = 0; p < l; ++p)
      (h = a[p]) && (m = e.call(h, h.__data__, p, a)) && ("__data__" in h && (m.__data__ = h.__data__), c[p] = m, Qt(c[p], t, i, p, c, _e(h, i)));
  return new Ne(r, this._parents, t, i);
}
function od(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Cn(e));
  for (var s = this._groups, n = s.length, r = [], o = [], a = 0; a < n; ++a)
    for (var l = s[a], c = l.length, h, m = 0; m < c; ++m)
      if (h = l[m]) {
        for (var p = e.call(h, h.__data__, m, l), f, y = _e(h, i), _ = 0, N = p.length; _ < N; ++_)
          (f = p[_]) && Qt(f, t, i, _, p, y);
        r.push(p), o.push(h);
      }
  return new Ne(r, o, t, i);
}
var ad = bt.prototype.constructor;
function dd() {
  return new ad(this._groups, this._parents);
}
function ld(e, t) {
  var i, s, n;
  return function() {
    var r = et(this, e), o = (this.style.removeProperty(e), et(this, e));
    return r === o ? null : r === i && o === s ? n : n = t(i = r, s = o);
  };
}
function Qn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function cd(e, t, i) {
  var s, n = i + "", r;
  return function() {
    var o = et(this, e);
    return o === n ? null : o === s ? r : r = t(s = o, i);
  };
}
function ud(e, t, i) {
  var s, n, r;
  return function() {
    var o = et(this, e), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(e), et(this, e))), o === l ? null : o === s && l === n ? r : (n = l, r = t(s = o, a));
  };
}
function hd(e, t) {
  var i, s, n, r = "style." + t, o = "end." + r, a;
  return function() {
    var l = Ae(this, e), c = l.on, h = l.value[r] == null ? a || (a = Qn(t)) : void 0;
    (c !== i || n !== h) && (s = (i = c).copy()).on(o, n = h), l.on = s;
  };
}
function pd(e, t, i) {
  var s = (e += "") == "transform" ? pa : Xn;
  return t == null ? this.styleTween(e, ld(e, s)).on("end.style." + e, Qn(e)) : typeof t == "function" ? this.styleTween(e, ud(e, s, Pi(this, "style." + e, t))).each(hd(this._id, e)) : this.styleTween(e, cd(e, s, t), i).on("end.style." + e, null);
}
function md(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function fd(e, t, i) {
  var s, n;
  function r() {
    var o = t.apply(this, arguments);
    return o !== n && (s = (n = o) && md(e, o, i)), s;
  }
  return r._value = t, r;
}
function gd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, fd(e, t, i ?? ""));
}
function Id(e) {
  return function() {
    this.textContent = e;
  };
}
function yd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function wd(e) {
  return this.tween("text", typeof e == "function" ? yd(Pi(this, "text", e)) : Id(e == null ? "" : e + ""));
}
function xd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function vd(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && xd(n)), t;
  }
  return s._value = e, s;
}
function _d(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, vd(e));
}
function $d() {
  for (var e = this._name, t = this._id, i = Zn(), s = this._groups, n = s.length, r = 0; r < n; ++r)
    for (var o = s[r], a = o.length, l, c = 0; c < a; ++c)
      if (l = o[c]) {
        var h = _e(l, t);
        Qt(l, e, i, c, o, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Ne(s, this._parents, e, i);
}
function kd() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(r, o) {
    var a = { value: o }, l = { value: function() {
      --n === 0 && r();
    } };
    i.each(function() {
      var c = Ae(this, s), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(l)), c.on = t;
    }), n === 0 && r();
  });
}
var bd = 0;
function Ne(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Zn() {
  return ++bd;
}
var Ce = bt.prototype;
Ne.prototype = {
  constructor: Ne,
  select: rd,
  selectAll: od,
  selectChild: Ce.selectChild,
  selectChildren: Ce.selectChildren,
  filter: Za,
  merge: Ja,
  selection: dd,
  transition: $d,
  call: Ce.call,
  nodes: Ce.nodes,
  node: Ce.node,
  size: Ce.size,
  empty: Ce.empty,
  each: Ce.each,
  on: id,
  attr: Ua,
  attrTween: Ha,
  style: pd,
  styleTween: gd,
  text: wd,
  textTween: _d,
  remove: sd,
  tween: Ca,
  delay: Fa,
  duration: Ba,
  ease: ja,
  easeVarying: Qa,
  end: kd,
  [Symbol.iterator]: Ce[Symbol.iterator]
};
function Ed(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Sd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ed
};
function Ad(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Cd(e) {
  var t, i;
  e instanceof Ne ? (t = e._id, e = e._name) : (t = Zn(), (i = Sd).time = Mi(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, r = 0; r < n; ++r)
    for (var o = s[r], a = o.length, l, c = 0; c < a; ++c)
      (l = o[c]) && Qt(l, e, t, c, o, i || Ad(l, t));
  return new Ne(s, this._parents, e, t);
}
bt.prototype.interrupt = Ea;
bt.prototype.transition = Cd;
const Pt = (e) => () => e;
function Md(e, {
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
function ri(e) {
  e.stopImmediatePropagation();
}
function dt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Nd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Pd() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function cn() {
  return this.__zoom || ft;
}
function Td(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Rd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Od(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], r = e.invertY(t[0][1]) - i[0][1], o = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    o > r ? (r + o) / 2 : Math.min(0, r) || Math.max(0, o)
  );
}
function Ud() {
  var e = Nd, t = Pd, i = Od, s = Td, n = Rd, r = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = ya, c = Ai("start", "zoom", "end"), h, m, p, f = 500, y = 150, _ = 0, N = 10;
  function v(u) {
    u.property("__zoom", cn).on("wheel.zoom", S, { passive: !1 }).on("mousedown.zoom", M).on("dblclick.zoom", H).filter(n).on("touchstart.zoom", P).on("touchmove.zoom", D).on("touchend.zoom touchcancel.zoom", W).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(u, g, I, w) {
    var b = u.selection ? u.selection() : u;
    b.property("__zoom", cn), u !== b ? F(u, g, I, w) : b.interrupt().each(function() {
      x(this, arguments).event(w).start().zoom(null, typeof g == "function" ? g.apply(this, arguments) : g).end();
    });
  }, v.scaleBy = function(u, g, I, w) {
    v.scaleTo(u, function() {
      var b = this.__zoom.k, A = typeof g == "function" ? g.apply(this, arguments) : g;
      return b * A;
    }, I, w);
  }, v.scaleTo = function(u, g, I, w) {
    v.transform(u, function() {
      var b = t.apply(this, arguments), A = this.__zoom, E = I == null ? $(b) : typeof I == "function" ? I.apply(this, arguments) : I, U = A.invert(E), Y = typeof g == "function" ? g.apply(this, arguments) : g;
      return i(z(T(A, Y), E, U), b, o);
    }, I, w);
  }, v.translateBy = function(u, g, I, w) {
    v.transform(u, function() {
      return i(this.__zoom.translate(
        typeof g == "function" ? g.apply(this, arguments) : g,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), o);
    }, null, w);
  }, v.translateTo = function(u, g, I, w, b) {
    v.transform(u, function() {
      var A = t.apply(this, arguments), E = this.__zoom, U = w == null ? $(A) : typeof w == "function" ? w.apply(this, arguments) : w;
      return i(ft.translate(U[0], U[1]).scale(E.k).translate(
        typeof g == "function" ? -g.apply(this, arguments) : -g,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), A, o);
    }, w, b);
  };
  function T(u, g) {
    return g = Math.max(r[0], Math.min(r[1], g)), g === u.k ? u : new Me(g, u.x, u.y);
  }
  function z(u, g, I) {
    var w = g[0] - I[0] * u.k, b = g[1] - I[1] * u.k;
    return w === u.x && b === u.y ? u : new Me(u.k, w, b);
  }
  function $(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function F(u, g, I, w) {
    u.on("start.zoom", function() {
      x(this, arguments).event(w).start();
    }).on("interrupt.zoom end.zoom", function() {
      x(this, arguments).event(w).end();
    }).tween("zoom", function() {
      var b = this, A = arguments, E = x(b, A).event(w), U = t.apply(b, A), Y = I == null ? $(U) : typeof I == "function" ? I.apply(b, A) : I, Z = Math.max(U[1][0] - U[0][0], U[1][1] - U[0][1]), J = b.__zoom, ce = typeof g == "function" ? g.apply(b, A) : g, Ie = l(J.invert(Y).concat(Z / J.k), ce.invert(Y).concat(Z / ce.k));
      return function(ue) {
        if (ue === 1) ue = ce;
        else {
          var ye = Ie(ue), it = Z / ye[2];
          ue = new Me(it, Y[0] - ye[0] * it, Y[1] - ye[1] * it);
        }
        E.zoom(null, ue);
      };
    });
  }
  function x(u, g, I) {
    return !I && u.__zooming || new k(u, g);
  }
  function k(u, g) {
    this.that = u, this.args = g, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, g), this.taps = 0;
  }
  k.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, g) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = g.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = g.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = g.invert(this.touch1[0])), this.that.__zoom = g, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var g = be(this.that).datum();
      c.call(
        u,
        this.that,
        new Md(u, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: c
        }),
        g
      );
    }
  };
  function S(u, ...g) {
    if (!e.apply(this, arguments)) return;
    var I = x(this, g).event(u), w = this.__zoom, b = Math.max(r[0], Math.min(r[1], w.k * Math.pow(2, s.apply(this, arguments)))), A = De(u);
    if (I.wheel)
      (I.mouse[0][0] !== A[0] || I.mouse[0][1] !== A[1]) && (I.mouse[1] = w.invert(I.mouse[0] = A)), clearTimeout(I.wheel);
    else {
      if (w.k === b) return;
      I.mouse = [A, w.invert(A)], zt(this), I.start();
    }
    dt(u), I.wheel = setTimeout(E, y), I.zoom("mouse", i(z(T(w, b), I.mouse[0], I.mouse[1]), I.extent, o));
    function E() {
      I.wheel = null, I.end();
    }
  }
  function M(u, ...g) {
    if (p || !e.apply(this, arguments)) return;
    var I = u.currentTarget, w = x(this, g, !0).event(u), b = be(u.view).on("mousemove.zoom", Y, !0).on("mouseup.zoom", Z, !0), A = De(u, I), E = u.clientX, U = u.clientY;
    Wo(u.view), ri(u), w.mouse = [A, this.__zoom.invert(A)], zt(this), w.start();
    function Y(J) {
      if (dt(J), !w.moved) {
        var ce = J.clientX - E, Ie = J.clientY - U;
        w.moved = ce * ce + Ie * Ie > _;
      }
      w.event(J).zoom("mouse", i(z(w.that.__zoom, w.mouse[0] = De(J, I), w.mouse[1]), w.extent, o));
    }
    function Z(J) {
      b.on("mousemove.zoom mouseup.zoom", null), Go(J.view, w.moved), dt(J), w.event(J).end();
    }
  }
  function H(u, ...g) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, w = De(u.changedTouches ? u.changedTouches[0] : u, this), b = I.invert(w), A = I.k * (u.shiftKey ? 0.5 : 2), E = i(z(T(I, A), w, b), t.apply(this, g), o);
      dt(u), a > 0 ? be(this).transition().duration(a).call(F, E, w, u) : be(this).call(v.transform, E, w, u);
    }
  }
  function P(u, ...g) {
    if (e.apply(this, arguments)) {
      var I = u.touches, w = I.length, b = x(this, g, u.changedTouches.length === w).event(u), A, E, U, Y;
      for (ri(u), E = 0; E < w; ++E)
        U = I[E], Y = De(U, this), Y = [Y, this.__zoom.invert(Y), U.identifier], b.touch0 ? !b.touch1 && b.touch0[2] !== Y[2] && (b.touch1 = Y, b.taps = 0) : (b.touch0 = Y, A = !0, b.taps = 1 + !!h);
      h && (h = clearTimeout(h)), A && (b.taps < 2 && (m = Y[0], h = setTimeout(function() {
        h = null;
      }, f)), zt(this), b.start());
    }
  }
  function D(u, ...g) {
    if (this.__zooming) {
      var I = x(this, g).event(u), w = u.changedTouches, b = w.length, A, E, U, Y;
      for (dt(u), A = 0; A < b; ++A)
        E = w[A], U = De(E, this), I.touch0 && I.touch0[2] === E.identifier ? I.touch0[0] = U : I.touch1 && I.touch1[2] === E.identifier && (I.touch1[0] = U);
      if (E = I.that.__zoom, I.touch1) {
        var Z = I.touch0[0], J = I.touch0[1], ce = I.touch1[0], Ie = I.touch1[1], ue = (ue = ce[0] - Z[0]) * ue + (ue = ce[1] - Z[1]) * ue, ye = (ye = Ie[0] - J[0]) * ye + (ye = Ie[1] - J[1]) * ye;
        E = T(E, Math.sqrt(ue / ye)), U = [(Z[0] + ce[0]) / 2, (Z[1] + ce[1]) / 2], Y = [(J[0] + Ie[0]) / 2, (J[1] + Ie[1]) / 2];
      } else if (I.touch0) U = I.touch0[0], Y = I.touch0[1];
      else return;
      I.zoom("touch", i(z(E, U, Y), I.extent, o));
    }
  }
  function W(u, ...g) {
    if (this.__zooming) {
      var I = x(this, g).event(u), w = u.changedTouches, b = w.length, A, E;
      for (ri(u), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, f), A = 0; A < b; ++A)
        E = w[A], I.touch0 && I.touch0[2] === E.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === E.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (E = De(E, this), Math.hypot(m[0] - E[0], m[1] - E[1]) < N)) {
        var U = be(this).on("dblclick.zoom");
        U && U.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : Pt(+u), v) : s;
  }, v.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Pt(!!u), v) : e;
  }, v.touchable = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Pt(!!u), v) : n;
  }, v.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Pt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), v) : t;
  }, v.scaleExtent = function(u) {
    return arguments.length ? (r[0] = +u[0], r[1] = +u[1], v) : [r[0], r[1]];
  }, v.translateExtent = function(u) {
    return arguments.length ? (o[0][0] = +u[0][0], o[1][0] = +u[1][0], o[0][1] = +u[0][1], o[1][1] = +u[1][1], v) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, v.constrain = function(u) {
    return arguments.length ? (i = u, v) : i;
  }, v.duration = function(u) {
    return arguments.length ? (a = +u, v) : a;
  }, v.interpolate = function(u) {
    return arguments.length ? (l = u, v) : l;
  }, v.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? v : u;
  }, v.clickDistance = function(u) {
    return arguments.length ? (_ = (u = +u) * u, v) : Math.sqrt(_);
  }, v.tapDistance = function(u) {
    return arguments.length ? (N = +u, v) : N;
  }, v;
}
var Dd = Object.defineProperty, Ld = Object.getOwnPropertyDescriptor, re = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ld(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Dd(t, i, n), n;
};
function zd(e, t, i, s) {
  const n = t.x - e.x, r = t.y - e.y, o = s.x - i.x, a = s.y - i.y, l = n * a - r * o;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * o) / l, h = ((i.x - e.x) * r - (i.y - e.y) * n) / l;
  return c <= 0.02 || c >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + c * n, y: e.y + c * r, t: c };
}
function qd(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, r = s * s + n * n || 1, o = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / r)), a = t.x + o * s, l = t.y + o * n;
  return { dist: Math.hypot(e.x - a, e.y - l), t: o };
}
function Hd(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const r = e[n], o = e[n + 1], a = Math.hypot(o.x - r.x, o.y - r.y) || 1, l = (o.x - r.x) / a, c = (o.y - r.y) / a, h = t.map(([p, f]) => zd(r, o, p, f)).filter((p) => p !== null).filter((p) => p.t * a > i + 2 && (1 - p.t) * a > i + 2).sort((p, f) => p.t - f.t);
    let m = -1 / 0;
    for (const p of h)
      p.t * a - i <= m + 2 || (s += ` L ${p.x - l * i} ${p.y - c * i}`, s += ` A ${i} ${i} 0 0 1 ${p.x + l * i} ${p.y + c * i}`, m = p.t * a + i);
    s += ` L ${o.x} ${o.y}`;
  }
  return s;
}
const Tt = {
  component: B`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: B`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: B`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: B`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: B`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: B`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: B`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: B`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: B`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: B`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: B`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: B`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: B`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: B`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: B`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let ie = class extends Ve {
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
            const n = this.scene.nodes.filter((r) => this.selectedIds.includes(r.id)).map((r) => ({ id: r.id, kind: r.kind }));
            n.length && this.emit("delete-selection-requested", { items: n });
            return;
          }
          if (this._selectedWaypoint) {
            const n = this.scene.edges.find((r) => r.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = Ud().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), be(e).call(this._zoomBehavior);
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
    const n = Math.min(...t.map((h) => h.x - h.w / 2)) - e, r = Math.max(...t.map((h) => h.x + h.w / 2)) + e, o = Math.min(...t.map((h) => h.y - h.h / 2)) - e, a = Math.max(...t.map((h) => h.y + h.h / 2)) + e, l = Math.max(0.15, Math.min(s.width / (r - n), s.height / (a - o), 1.25)), c = ft.translate(s.width / 2 - l * (n + r) / 2, s.height / 2 - l * (o + a) / 2).scale(l);
    be(i).call(this._zoomBehavior.transform, c);
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
    for (let r = e.parentId; r; r = (s = this.scene.nodes.find((o) => o.id === r)) == null ? void 0 : s.parentId) {
      const o = this.scene.nodes.find((l) => l.id === r);
      if (!o) break;
      if (this._dragPos && this._dragPos.id === r)
        return { x: e.x + (this._dragPos.x - o.x), y: e.y + (this._dragPos.y - o.y) };
      const a = (n = this._dragGroup) == null ? void 0 : n.get(r);
      if (a)
        return { x: e.x + (a.x - o.x), y: e.y + (a.y - o.y) };
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
        const n = this.nodePos(s), r = n.x - s.w / 2 + 10 + e.w / 2, o = n.x + s.w / 2 - 10 - e.w / 2, a = n.y - s.h / 2 + 34 + e.h / 2, l = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, r), o), i = Math.min(Math.max(i, a), l);
      }
    }
    return { id: e.id, x: t, y: i };
  }
  /**
   * Topmost node under the pointer. elementFromPoint alone is not enough: an
   * edge's fat invisible hit-line can sit on top of a node and swallow the hit.
   */
  nodeIdAt(e) {
    var i, s;
    const t = ((i = this.shadowRoot) == null ? void 0 : i.elementsFromPoint(e.clientX, e.clientY)) ?? [];
    for (const n of t) {
      const r = (s = n.closest) == null ? void 0 : s.call(n, "[data-node-id]");
      if (r) return r.getAttribute("data-node-id");
    }
    return null;
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const i = this.toScene(e), s = this.nodePos(t);
    let n = !1;
    const r = new Set(this.selectedIds), o = r.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (p) => r.has(p.id) && !(p.parentId && r.has(p.parentId))
    ) : null, a = o ? new Map(o.map((p) => [p.id, this.nodePos(p)])) : null, l = (p) => (p.shiftKey || p.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !o, c = (p) => {
      const f = this.nodeIdAt(p), y = f && f !== t.id ? this.scene.nodes.find((_) => _.id === f) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, h = (p) => {
      if ((p.buttons & 1) === 0) {
        m(p);
        return;
      }
      const f = this.toScene(p), y = f.x - i.x, _ = f.y - i.y;
      if (!(!n && Math.hypot(y, _) < 3 / this._t.k))
        if (n = !0, o && a) {
          const N = /* @__PURE__ */ new Map();
          for (const v of o) {
            const T = a.get(v.id), z = this.clampToParent(v, T.x + y, T.y + _);
            N.set(v.id, { x: z.x, y: z.y });
          }
          this._dragGroup = N;
        } else l(p) ? (this._dragPos = { id: t.id, x: s.x + y, y: s.y + _ }, this._hoverNodeId = c(p)) : (this._dragPos = this.clampToParent(t, s.x + y, s.y + _), this._hoverNodeId = null);
    }, m = (p) => {
      if (window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", m), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, y]) => ({ id: f, x: y.x, y: y.y }))
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
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", m);
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
    const n = 160, r = 90, o = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((_) => _.parentId === t.id), l = Math.min(...a.map((_) => _.x - _.w / 2)), c = Math.max(...a.map((_) => _.x + _.w / 2)), h = Math.min(...a.map((_) => _.y - _.h / 2)), m = Math.max(...a.map((_) => _.y + _.h / 2)), p = hs(
      a.map((_) => ({ dx: _.x - o.x, dy: _.y - o.y, w: _.w, h: _.h })),
      { w: n, h: r }
    ), f = (_) => {
      if ((_.buttons & 1) === 0) {
        y();
        return;
      }
      const N = this.toScene(_);
      if (_.shiftKey) {
        this._resize = {
          id: t.id,
          x: o.x,
          y: o.y,
          w: Math.max(p.w, 2 * Math.abs(N.x - o.x)),
          h: Math.max(p.h, 2 * Math.abs(N.y - o.y))
        };
        return;
      }
      const v = o.x - i * o.w / 2, T = o.y - s * o.h / 2, z = i > 0 ? Math.max(N.x, v + n, a.length ? c + 10 : -1 / 0) : Math.min(N.x, v - n, a.length ? l - 10 : 1 / 0), $ = s > 0 ? Math.max(N.y, T + r, a.length ? m + 10 : -1 / 0) : Math.min(N.y, T - r, a.length ? h - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (v + z) / 2,
        y: (T + $) / 2,
        w: Math.abs(z - v),
        h: Math.abs($ - T)
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
    const s = (r) => {
      if ((r.buttons & 1) === 0) {
        window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const o = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: o.x, y: o.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, n = (r) => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n);
      const o = this.nodeIdAt(r);
      o && o !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: o,
        x: r.clientX,
        y: r.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", n);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), r = t - s, o = i - n, a = e.w / 2, l = e.h / 2;
    if (r === 0 && o === 0) return { x: s, y: n };
    const c = 1 / Math.max(Math.abs(r) / a, Math.abs(o) / l);
    return { x: s + r * c, y: n + o * c };
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
    const t = this.scene.nodes.find((h) => h.id === e.sourceId), i = this.scene.nodes.find((h) => h.id === e.targetId);
    if (!t || !i) return null;
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), r = this.nodePos(i), o = s[0] ?? r, a = s[s.length - 1] ?? n;
    let l = this.borderPoint(t, o.x, o.y), c = this.borderPoint(i, a.x, a.y);
    if (!s.length) {
      const h = this.edgeOffset(e);
      if (h !== 0) {
        const m = Math.hypot(c.x - l.x, c.y - l.y) || 1, p = -(c.y - l.y) / m * h, f = (c.x - l.x) / m * h;
        l = { x: l.x + p, y: l.y + f }, c = { x: c.x + p, y: c.y + f };
      }
    }
    return [l, ...s, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (o) => {
      if (!this._wpDrag) return;
      s = !0;
      const a = this.toScene(o), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: l };
    }, r = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", r), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", r);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = qd(t, e[s], e[s + 1]);
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
    let r = !1;
    const o = (l) => {
      if ((l.buttons & 1) === 0) {
        a();
        return;
      }
      const c = this.toScene(l);
      if (r) {
        if (this._wpDrag) {
          const h = [...this._wpDrag.points];
          h[n] = c, this._wpDrag = { ...this._wpDrag, points: h };
        }
      } else {
        if (Math.hypot(c.x - s.x, c.y - s.y) < 4 / this._t.k) return;
        r = !0, this.focus();
        const h = [...this.edgePoints[t.id] ?? []];
        h.splice(n, 0, c), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: h, index: n };
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
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((s) => `${s.x},${s.y}`).join(" ");
    return B`
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
          ${e.tooltip ? B`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, r = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), o = Math.floor((t.length - 1) / 2), a = {
      x: (t[o].x + t[o + 1].x) / 2,
      y: (t[o].y + t[o + 1].y) / 2
    }, l = t.slice(1, -1);
    return B`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Hd(t, i)}
              fill="none"
              stroke=${s} stroke-width=${r ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? B`<text x=${a.x} y=${a.y - 6} text-anchor="middle"
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
        ${n ? l.map((c, h) => {
      var p;
      const m = ((p = this._selectedWaypoint) == null ? void 0 : p.edgeId) === e.id && this._selectedWaypoint.index === h;
      return B`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(f) => {
        f.button === 0 && (f.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: h }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], h));
      }}
                        @dblclick=${(f) => {
        f.stopPropagation(), this.removeWaypoint(e, h);
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
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, r = !!e.container, o = !!e.parentId, a = ((p = this._resize) == null ? void 0 : p.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = a / 2, h = l / 2, m = o && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return B`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (y = this._dragGroup) != null && y.has(e.id) ? "none" : "auto"}
         @pointerdown=${(_) => this.onNodePointerDown(_, e)}
         @dblclick=${(_) => {
      _.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? B`<rect x=${-c - 4} y=${-h - 4} width=${a + 8} height=${l + 8}
                  rx=${o ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-h} width=${a} height=${l} rx=${o ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? B`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? B`<text x=${-c} y=${-h - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && Tt[e.symbol] && !o ? B`<g transform="translate(${c - 17}, ${-h + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${o && e.symbol && Tt[e.symbol] ? B`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? B`
              <foreignObject x=${-c + 6} y=${r ? -h + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${r ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(_) => _.stopPropagation()}
                  @keydown=${(_) => {
      _.stopPropagation(), _.key === "Enter" && this.commitRename(e, _.target.value), _.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(_) => this.commitRename(e, _.target.value)}
                />
              </foreignObject>` : o ? B`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : r ? B`<text x=${-c + 12} y=${-h + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : B`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${r ? B`<line x1=${-c + 8} y1=${-h + 28} x2=${c - 8} y2=${-h + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (o ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, h],
      [0, -h]
    ].map(
      ([_, N]) => B`
                <circle data-handle cx=${_} cy=${N} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${o ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${r && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([_, N]) => B`
                <rect data-resize x=${_ * c - 6.5} y=${N * h - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${_ * N > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, _, N)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return B``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return B``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return B`
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
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", s), this._rubber = null;
    }, n = (o) => {
      if ((o.buttons & 1) === 0) {
        s();
        return;
      }
      const a = this.toScene(o);
      !i && Math.hypot(a.x - t.x, a.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: a });
    }, r = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a: o, b: a } = this._rubber, l = Math.min(o.x, a.x), c = Math.max(o.x, a.x), h = Math.min(o.y, a.y), m = Math.max(o.y, a.y), p = this.scene.nodes.filter((f) => {
          const y = this.nodePos(f);
          return y.x >= l && y.x <= c && y.y >= h && y.y <= m;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: p });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", r), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return B``;
    const { a: e, b: t } = this._rubber;
    return B`
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
    const i = Math.min(...t.map((o) => o.x - o.w / 2)) - e, s = Math.max(...t.map((o) => o.x + o.w / 2)) + e, n = Math.min(...t.map((o) => o.y - o.h / 2)) - e, r = Math.max(...t.map((o) => o.y + o.h / 2)) + e;
    return { minX: i, minY: n, w: s - i, h: r - n };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), n = this._t.k, r = ft.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    be(i).call(this._zoomBehavior.transform, r);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, r = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, r);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return R``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), r = (0 - this._t.x) / this._t.k, o = (0 - this._t.y) / this._t.k, a = n.width / this._t.k, l = n.height / this._t.k;
    return R`
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
      var h, m;
      (m = (h = c.currentTarget).hasPointerCapture) != null && m.call(h, c.pointerId) && this.onMinimapPointer(c, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const h = this.nodePos(c);
      return B`<rect
              x=${(h.x - c.w / 2 - e.minX) * s}
              y=${(h.y - c.h / 2 - e.minY) * s}
              width=${Math.max(2, c.w * s)}
              height=${Math.max(2, c.h * s)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(r - e.minX) * s}
            y=${(o - e.minY) * s}
            width=${a * s}
            height=${l * s}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((n) => n.color ?? "#64748b"))], t = [], i = [], s = [];
    return this.scene.edges.forEach((n) => {
      const r = this.edgePolyline(n);
      if (r) {
        i.push(this.renderEdgeHit(n, r)), s.push(this.renderEdgeInk(n, r, [...t]));
        for (let o = 0; o < r.length - 1; o++) t.push([r[o], r[o + 1]]);
      }
    }), R`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(n) => {
      const r = n.target;
      r.closest("[data-node-id]") || r.closest("[data-edge-id]") || this._spaceDown || n.button !== 0 || (n.buttons & 1) !== 0 && this.startRubberBand(n);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (n) => B`
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
re([
  Se({ attribute: !1 })
], ie.prototype, "scene", 2);
re([
  Se({ attribute: !1 })
], ie.prototype, "selectedId", 2);
re([
  Se({ attribute: !1 })
], ie.prototype, "selectedIds", 2);
re([
  Se({ type: Boolean })
], ie.prototype, "connectable", 2);
re([
  Se({ attribute: !1 })
], ie.prototype, "edgePoints", 2);
re([
  O()
], ie.prototype, "_t", 2);
re([
  O()
], ie.prototype, "_dragPos", 2);
re([
  O()
], ie.prototype, "_dragGroup", 2);
re([
  O()
], ie.prototype, "_pendingLink", 2);
re([
  O()
], ie.prototype, "_hoverNodeId", 2);
re([
  O()
], ie.prototype, "_editingId", 2);
re([
  O()
], ie.prototype, "_spaceDown", 2);
re([
  O()
], ie.prototype, "_wpDrag", 2);
re([
  O()
], ie.prototype, "_selectedWaypoint", 2);
re([
  O()
], ie.prototype, "_resize", 2);
re([
  O()
], ie.prototype, "_rubber", 2);
ie = re([
  bi("modux-canvas")
], ie);
const q = {
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
function Kd(e, t) {
  var M, H, P, D, W;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((u) => [u.id, u.name])), n = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((g) => ({ ...g, moduleId: u.id }))
  ), r = new Set(n.map((u) => u.id)), o = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((g) => g.id))
  ), l = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((g) => ({ ...g, moduleId: u.id, application: !1 }))
  ), c = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((g) => ({ ...g, moduleId: u.id, application: !0 }))
  ), h = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((g) => ({ ...g, moduleId: u.id }))
  );
  for (const u of n)
    pe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: q.command.w,
      h: q.command.h,
      kind: "use-case",
      symbol: u.policy ? "flow" : "gear",
      fill: u.policy ? q.policy.fill : q.command.fill,
      stroke: u.policy ? q.policy.stroke : q.command.stroke,
      badge: u.policy ? "POLICY" : "COMANDO",
      tooltip: u.policy ? `${u.name} — policy de ${s.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${s.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of o)
    pe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: q.aggregate.w,
      h: q.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: q.aggregate.fill,
      stroke: q.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${u.name} — agregado de ${s.get(u.moduleId) ?? u.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const u of [...l, ...c])
    pe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: q.event.w,
      h: q.event.h,
      kind: u.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: q.event.fill,
      stroke: q.event.stroke,
      badge: u.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${u.name} — evento de ${s.get(u.moduleId) ?? u.moduleId}`
    }), m.set(Be(u.name), u.id);
  const p = (u) => {
    if (!u || !u.trim()) return null;
    const g = m.get(Be(u));
    if (g) return g;
    const I = `evname:${Be(u)}`;
    return pe(i, {
      id: I,
      label: u,
      x: 0,
      y: 0,
      w: q.event.w,
      h: q.event.h,
      kind: "event-name",
      symbol: "event",
      fill: q.event.fill,
      stroke: q.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${u} — referenciado por nombre, sin evento declarado en el catálogo`
    }), I;
  }, f = (u) => {
    const g = h.find((w) => w.id === u.id) ?? h.find((w) => u.name && Be(w.name) === Be(u.name)), I = (g == null ? void 0 : g.id) ?? (u.id || (u.name ? `rm:${Be(u.name)}` : null));
    return I ? (pe(i, {
      id: I,
      label: (g == null ? void 0 : g.name) ?? u.name ?? I,
      x: 0,
      y: 0,
      w: q.readModel.w,
      h: q.readModel.h,
      kind: g ? "read-model" : "derived-read-model",
      fill: q.readModel.fill,
      stroke: q.readModel.stroke,
      dashed: !g,
      badge: "READ MODEL"
    }), I) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!r.has(u.targetId)) continue;
    const g = (e.actors ?? []).find((I) => I.id === u.actorId);
    g && (pe(i, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: q.actor.w,
      h: q.actor.h,
      kind: "actor",
      symbol: "person",
      fill: q.actor.fill,
      stroke: q.actor.stroke,
      badge: "ACTOR"
    }), te(i, {
      id: `es-actor:${g.id}->${u.targetId}`,
      sourceId: g.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const g = (e.agentUses ?? []).filter((E) => E.agentId === u.id), I = (e.agentExternalUses ?? []).filter((E) => E.agentId === u.id), w = (e.agentRags ?? []).filter((E) => E.agentId === u.id), b = (e.agentMcpUses ?? []).filter((E) => E.agentId === u.id), A = (e.agentGatewayUses ?? []).some((E) => E.agentId === u.id) || (e.agentApiOpUses ?? []).some((E) => E.agentId === u.id) || (e.agentQueryUses ?? []).some((E) => E.agentId === u.id) || (e.agentDelegations ?? []).some((E) => E.agentId === u.id) || (e.agentTriggers ?? []).some((E) => E.agentId === u.id);
    if (!(!g.length && !I.length && !w.length && !b.length && !A)) {
      pe(i, {
        id: u.id,
        label: u.name,
        x: 0,
        y: 0,
        w: q.actor.w,
        h: q.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${u.name} — agente de IA (consume por MCP)`
      });
      for (const E of g)
        r.has(E.useCaseId) && te(i, {
          id: `es-agent:${u.id}->${E.useCaseId}`,
          sourceId: u.id,
          targetId: E.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const E of I) {
        const U = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === E.externalUseCaseId)
        );
        if (!U) continue;
        const Y = (M = (U.useCases ?? []).find((Z) => Z.id === E.externalUseCaseId)) == null ? void 0 : M.name;
        pe(i, {
          id: U.id,
          label: U.name,
          x: 0,
          y: 0,
          w: q.external.w,
          h: q.external.h,
          kind: "external-system",
          symbol: "component",
          fill: q.external.fill,
          stroke: q.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentx:${u.id}->${E.externalUseCaseId}`,
          sourceId: u.id,
          targetId: U.id,
          kind: "es-agent-external",
          label: Y,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: Y ? `Llama a ${Y} del sistema externo` : void 0
        });
      }
      for (const E of b) {
        const U = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === E.mcpServerId)
        );
        if (!U) continue;
        const Y = (H = (U.mcpServers ?? []).find((Z) => Z.id === E.mcpServerId)) == null ? void 0 : H.name;
        pe(i, {
          id: U.id,
          label: U.name,
          x: 0,
          y: 0,
          w: q.external.w,
          h: q.external.h,
          kind: "external-system",
          symbol: "component",
          fill: q.external.fill,
          stroke: q.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentmcp:${u.id}->${E.mcpServerId}`,
          sourceId: u.id,
          targetId: U.id,
          kind: "es-agent-mcp",
          label: Y,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: Y ? `Consume las herramientas del servidor MCP ${Y}` : void 0
        });
      }
      for (const E of w) {
        const U = (e.rags ?? []).find((Y) => Y.id === E.ragId);
        if (U) {
          pe(i, {
            id: U.id,
            label: U.name,
            x: 0,
            y: 0,
            w: q.readModel.w,
            h: q.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${U.name} — base de conocimiento (retrieval)`
          }), te(i, {
            id: `es-agrag:${u.id}->${U.id}`,
            sourceId: u.id,
            targetId: U.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const Y of U.sourceReadModelIds ?? []) {
            const Z = f({ id: Y });
            Z && te(i, {
              id: `es-ragsrc:${U.id}->${Z}`,
              sourceId: Z,
              targetId: U.id,
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
    const g = e.externalSystems.find((I) => I.id === u);
    return g ? (pe(i, {
      id: g.id,
      label: g.name,
      x: 0,
      y: 0,
      w: q.external.w,
      h: q.external.h,
      kind: "external-system",
      symbol: "component",
      fill: q.external.fill,
      stroke: q.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), g.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const g = y(u.externalSystemId);
    !g || !r.has(u.useCaseId) || te(i, {
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
    if (!r.has(u.sourceId)) continue;
    const g = e.externalSystems.find(
      (b) => (b.useCases ?? []).some((A) => A.id === u.targetId)
    ), I = g ? y(g.id) : null;
    if (!I) continue;
    const w = (P = ((g == null ? void 0 : g.useCases) ?? []).find((b) => b.id === u.targetId)) == null ? void 0 : P.name;
    te(i, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: I,
      kind: "es-command-external",
      label: w,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: w ? `Llama a ${w} del sistema externo` : void 0
    });
  }
  for (const u of e.aggregateCalls ?? [])
    !r.has(u.sourceId) || !i.nodes.has(u.targetId) || te(i, {
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
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (r.has(u.sourceId) || o.some((I) => I.id === u.sourceId) || a.has(u.sourceId))) || te(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const N = (u, g, I, w, b, A) => (pe(i, {
    id: u,
    label: g,
    x: 0,
    y: 0,
    w: q.policy.w,
    h: q.policy.h,
    kind: I,
    symbol: "flow",
    fill: q.policy.fill,
    stroke: q.policy.stroke,
    badge: w,
    tooltip: b
  }), u), v = (u, g) => {
    const I = p(u);
    I && te(i, {
      id: `es-trigger:${I}->${g}`,
      sourceId: I,
      targetId: g,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, T = (u, g) => {
    !g || !r.has(g) || te(i, {
      id: `es-invoke:${u}->${g}`,
      sourceId: u,
      targetId: g,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const g = N(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    v(u.eventName, g);
    for (const I of u.actions ?? []) {
      if (I.type === "CallUseCase" && T(g, I.useCaseId), I.type === "StartSaga" && I.sagaId) {
        const w = `saga:${I.sagaId}`;
        N(w, I.sagaId, "saga", "SAGA"), te(i, {
          id: `es-saga:${g}->${w}`,
          sourceId: g,
          targetId: w,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (I.type === "UpdateProjection" && I.projectionId) {
        const w = (e.projections ?? []).find((b) => b.id === I.projectionId);
        w && te(i, {
          id: `es-feeds:${g}->${w.id}`,
          sourceId: g,
          targetId: w.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const g = N(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const b of u.handledEventIds) {
      const A = i.nodes.has(b) ? b : null;
      A && te(i, {
        id: `es-trigger:${A}->${g}`,
        sourceId: A,
        targetId: g,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && i.nodes.has(u.sourceAggregateId) && te(i, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: g,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const I = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (I) {
      const b = e.externalSystems.find(
        (E) => (E.useCases ?? []).some((U) => U.id === I) || (E.tables ?? []).some((U) => U.id === I)
      ), A = b ? y(b.id) : null;
      if (A) {
        const E = ((D = (b.useCases ?? []).find((U) => U.id === I)) == null ? void 0 : D.name) ?? ((W = (b.tables ?? []).find((U) => U.id === I)) == null ? void 0 : W.name);
        te(i, {
          id: `es-poll:${u.id}`,
          sourceId: A,
          targetId: g,
          kind: "es-projects-poll",
          label: E,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: E ? `polling de ${E}` : "polling"
        });
      }
    }
    const w = f({ id: u.readModelId, name: u.readModelName });
    w && te(i, {
      id: `es-projects:${g}->${w}`,
      sourceId: g,
      targetId: w,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const I = p(u.triggerEvent), w = f({ name: u.readModelName ?? `${u.triggerEvent}View` });
      I && w && te(i, {
        id: `es-mat:${u.id}`,
        sourceId: I,
        targetId: w,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const g = N(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (v(u.triggerEvent, g), T(g, u.targetUseCaseId), !u.targetUseCaseId) {
      const I = y(u.targetId), w = I ?? `tgt:${u.targetId}`;
      !I && s.has(u.targetId) && pe(i, {
        id: w,
        label: s.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: q.module.w,
        h: q.module.h,
        kind: "module",
        symbol: "component",
        fill: q.module.fill,
        stroke: q.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(w) && te(i, {
        id: `es-deliver:${u.id}`,
        sourceId: g,
        targetId: w,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const g = N(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    v(u.triggerEvent, g);
    for (const w of u.steps) T(g, w.useCaseId);
    const I = p(u.onCompletionEventName);
    I && te(i, {
      id: `es-done:${u.id}`,
      sourceId: g,
      targetId: I,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const g = N(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    v(u.triggerEvent, g);
    for (const w of u.steps ?? []) {
      T(g, w.targetUseCaseId);
      for (const b of [w.emittedEventName, w.completionEventName]) {
        const A = p(b);
        A && te(i, {
          id: `es-wfemit:${u.id}:${A}`,
          sourceId: g,
          targetId: A,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const I = p(u.onCompletionEventName);
    I && te(i, {
      id: `es-done:${u.id}`,
      sourceId: g,
      targetId: I,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const z = [...i.nodes.values()], $ = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    $.has(u.targetId) || $.set(u.targetId, []), $.get(u.targetId).push(u.sourceId);
  const F = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set(), k = (u) => {
    const g = F.get(u);
    if (g !== void 0) return g;
    if (x.has(u)) return 0;
    x.add(u);
    const I = $.get(u) ?? [], w = I.length ? 1 + Math.max(...I.map(k)) : 0;
    return x.delete(u), F.set(u, w), w;
  }, S = /* @__PURE__ */ new Map();
  for (const u of z) {
    const g = t[u.id];
    if (g) {
      u.x = g.x, u.y = g.y;
      continue;
    }
    const I = k(u.id), w = S.get(I) ?? 0;
    S.set(I, w + 1), u.x = 140 + I * 260, u.y = 110 + w * 110;
  }
  return { nodes: z, edges: i.edges };
}
const Vd = 190, Fd = 56, un = 180, Wd = 56, Gd = 150, Bd = 44, hn = 250, pn = 100;
function Yd(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const r = (n.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), o = r.length ? 1 + Math.max(...r.map(s)) : 0;
    return i.delete(n.id), o;
  };
  return s(e);
}
function jd(e, t) {
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
function Xd(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), r = (a) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : l.name;
  };
  let o = 140;
  return (e.workflows ?? []).forEach((a) => {
    var N;
    const l = new Map(a.steps.map((v) => [v.id, v])), c = new Map(a.steps.map((v) => [v.id, Yd(v, l)])), h = /* @__PURE__ */ new Map();
    for (const v of a.steps) {
      const T = c.get(v.id) ?? 0;
      h.set(T, (h.get(T) ?? 0) + 1);
    }
    const m = Math.max(1, ...h.values()), p = jd(e, a);
    if (p && !n.has(p.id)) {
      n.add(p.id);
      const v = t[p.id] ?? { x: 140, y: o };
      i.push({
        id: p.id,
        label: p.label,
        x: v.x,
        y: v.y,
        w: Gd,
        h: Bd,
        kind: p.kind,
        symbol: p.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: p.kind === "aggregate" ? "AGGREGATE" : p.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[a.id] ?? { x: 420, y: o };
    i.push({
      id: a.id,
      label: a.name,
      x: f.x,
      y: f.y,
      w: Vd,
      h: Fd,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), p && s.push({
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
    for (const v of a.steps) {
      const T = c.get(v.id) ?? 0;
      _ = Math.max(_, T);
      const z = y.get(T) ?? 0;
      y.set(T, z + 1);
      const $ = t[v.id] ?? {
        x: f.x + (T + 1) * hn,
        y: o + (z - (h.get(T) - 1) / 2) * pn
      }, F = r(v.targetUseCaseId);
      i.push({
        id: v.id,
        label: v.name,
        x: $.x,
        y: $.y,
        w: un,
        h: Wd,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: F ? `→ ${F}` : "∅ sin use case",
        tooltip: `${v.name}${v.emittedEventName ? ` · emite ${v.emittedEventName}` : ""}${F ? ` · lanza ${F}` : ""}${v.completionEventName ? ` · espera ${v.completionEventName}` : ""}`
      });
      const x = (v.dependsOnStepIds ?? []).filter((k) => l.has(k));
      x.length === 0 && s.push({
        id: `wfs:${a.id}:${v.id}`,
        sourceId: a.id,
        targetId: v.id,
        kind: "workflow-start",
        label: v.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of x)
        s.push({
          id: `wfdep:${k}->${v.id}`,
          sourceId: k,
          targetId: v.id,
          kind: "workflow-dependency",
          label: v.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${v.name} espera a ${((N = l.get(k)) == null ? void 0 : N.name) ?? k}`
        });
    }
    if (a.onCompletionEventName) {
      const v = `done:${a.id}`, T = t[v] ?? { x: f.x + (_ + 2) * hn, y: o };
      i.push({
        id: v,
        label: a.onCompletionEventName,
        x: T.x,
        y: T.y,
        w: un,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const z = new Set(a.steps.flatMap((F) => F.dependsOnStepIds ?? [])), $ = a.steps.filter((F) => !z.has(F.id));
      for (const F of $.length ? $ : [])
        s.push({
          id: `wfd:${a.id}:${F.id}`,
          sourceId: F.id,
          targetId: v,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || s.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: v,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    o += Math.max(2, m + 1) * pn + 60;
  }), { nodes: i, edges: s };
}
async function Qd(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), s = new i(), r = {
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
  }, o = await s.layout(r), a = {};
  for (const l of o.children ?? [])
    a[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return a;
}
var Zd = Object.defineProperty, Jd = Object.getOwnPropertyDescriptor, V = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Jd(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Zd(t, i, n), n;
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
}, el = Object.keys(yi), tl = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], il = ["CORE", "SUPPORTING", "GENERIC"];
function lt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, r = i.y - i.h / 2, o = i.y + i.h / 2;
  let a = 0, l = 1;
  const c = t.x - e.x, h = t.y - e.y;
  for (const [m, p] of [
    [-c, e.x - s],
    [c, n - e.x],
    [-h, e.y - r],
    [h, o - e.y]
  ]) {
    if (m === 0) {
      if (p < 0) return !1;
      continue;
    }
    const f = p / m;
    if (m < 0) {
      if (f > l) return !1;
      f > a && (a = f);
    } else {
      if (f < a) return !1;
      f < l && (l = f);
    }
  }
  return l - a > 0.02;
}
function nl(e, t, i = 28) {
  var c;
  const s = new Map(e.nodes.map((h) => [h.id, h])), n = (h) => {
    var p;
    const m = /* @__PURE__ */ new Set();
    for (let f = h; f; f = (p = s.get(f)) == null ? void 0 : p.parentId) m.add(f);
    return m;
  }, r = e.nodes, o = (h) => h.parentId ? Math.min(i, 6) : i, a = /* @__PURE__ */ new Map(), l = (h, m, p) => {
    const f = o(p), y = { x: p.x, y: p.y, w: p.w + 2 * f, h: p.h + 2 * f }, _ = p.w / 2 + f * 1.5, N = p.h / 2 + f * 1.5, v = { x: p.x - _, y: p.y - N }, T = { x: p.x + _, y: p.y - N }, z = { x: p.x - _, y: p.y + N }, $ = { x: p.x + _, y: p.y + N }, F = [];
    for (const x of [v, T, z, $])
      !lt(h, x, y) && !lt(x, m, y) && F.push([x]);
    for (const [x, k] of [
      [v, T],
      [T, v],
      [T, $],
      [$, T],
      [$, z],
      [z, $],
      [z, v],
      [v, z]
    ])
      !lt(h, x, y) && !lt(k, m, y) && F.push([x, k]);
    return F;
  };
  for (const h of e.edges) {
    if ((c = t[h.id]) != null && c.length) continue;
    const m = s.get(h.sourceId), p = s.get(h.targetId);
    if (!m || !p) continue;
    const f = /* @__PURE__ */ new Set([...n(m.id), ...n(p.id)]), y = [
      { x: m.x, y: m.y },
      { x: p.x, y: p.y }
    ];
    for (let _ = 0; _ < 12; _++) {
      let N = !1;
      e: for (let v = 0; v < y.length - 1; v++)
        for (const T of r) {
          if (f.has(T.id)) continue;
          const z = o(T), $ = { x: T.x, y: T.y, w: T.w + 2 * z, h: T.h + 2 * z };
          if (!lt(y[v], y[v + 1], $)) continue;
          const F = l(y[v], y[v + 1], T);
          if (!F.length) continue;
          const x = (S) => r.some(
            (M) => M !== T && !f.has(M.id) && Math.abs(S.x - M.x) < M.w / 2 + o(M) / 2 && Math.abs(S.y - M.y) < M.h / 2 + o(M) / 2
          ), k = (S) => {
            let M = 0;
            const H = [y[v], ...S, y[v + 1]];
            for (let P = 0; P < H.length - 1; P++)
              M += Math.hypot(H[P + 1].x - H[P].x, H[P + 1].y - H[P].y);
            return M + (S.some(x) ? 1e4 : 0);
          };
          F.sort((S, M) => k(S) - k(M)), y.splice(v + 1, 0, ...F[0]), N = !0;
          break e;
        }
      if (!N) break;
    }
    y.length > 2 && a.set(
      h.id,
      y.slice(1, -1).map((_) => ({ x: Math.round(_.x), y: Math.round(_.y) }))
    );
  }
  return a;
}
const G = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function sl(e, t) {
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
function rl(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let K = class extends Ve {
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
    const r = this.viewLayout("context-map"), o = this.sceneFor("context-map").nodes.filter((h) => !h.parentId), a = wi(o), l = [...a.keys()].map((h) => ({
      kind: "move-node",
      view: "context-map",
      id: h,
      pos: r.nodes[h] ?? null
    })), c = { ...r.nodes };
    for (const [h, m] of a) {
      const p = o.find((y) => y.id === h), f = r.nodes[h] ?? { x: p.x, y: p.y };
      c[h] = {
        x: Math.round(f.x + (m.x - p.x)),
        y: Math.round(f.y + (m.y - p.y))
      };
    }
    this.writeViewLayout("context-map", { ...r, nodes: c }), l.length && this.pushUndoEntry(l);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = nl(e, t);
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
      case "add-external-dependency": {
        const r = (this.model.externalSystemDependencies ?? []).find(
          (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
        );
        return r ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const r = (this.model.externalSystemDependencies ?? []).find(
          (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: r == null ? void 0 : r.type }];
      }
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const r = (this.model.proxyApis ?? []).find((o) => o.id === e.id);
        return r ? [{
          kind: "add-proxy-api",
          id: r.id,
          name: r.name,
          targetId: r.targetApiId,
          moduleId: r.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const r = (this.model.proxyApis ?? []).find((o) => o.id === e.id);
        return r ? [{ kind: "set-proxy-target", id: e.id, targetId: r.targetApiId ?? "" }] : null;
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
        const r = (this.model.apiOperationImplementations ?? []).find(
          (o) => o.apiId === e.apiId && o.operationId === e.operationId && o.moduleId === e.moduleId
        );
        return r ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: r.useCaseId
        }] : [{
          kind: "remove-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId
        }];
      }
      case "remove-api-operation-implementation": {
        const r = (this.model.apiOperationImplementations ?? []).find(
          (o) => o.apiId === e.apiId && o.operationId === e.operationId && o.moduleId === e.moduleId
        );
        return r ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: r.useCaseId
        }] : null;
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
        return r ? [
          { kind: "add-ai-agent", id: r.id, name: r.name, external: r.external },
          ...(this.model.agentUses ?? []).filter((o) => o.agentId === e.id).map((o) => ({ kind: "add-agent-use", sourceId: e.id, targetId: o.useCaseId })),
          ...(this.model.agentExternalUses ?? []).filter((o) => o.agentId === e.id).map((o) => ({
            kind: "add-agent-external-use",
            sourceId: e.id,
            targetId: o.externalUseCaseId
          })),
          ...(this.model.agentMcpUses ?? []).filter((o) => o.agentId === e.id).map((o) => ({ kind: "add-agent-mcp", sourceId: e.id, targetId: o.mcpServerId })),
          ...(this.model.agentGatewayUses ?? []).filter((o) => o.agentId === e.id).map((o) => ({ kind: "add-agent-gateway", sourceId: e.id, targetId: o.gatewayId })),
          ...(this.model.agentApiOpUses ?? []).filter((o) => o.agentId === e.id).map((o) => ({
            kind: "add-agent-api-operation",
            sourceId: e.id,
            targetId: o.apiOperationId
          })),
          ...(this.model.agentQueryUses ?? []).filter((o) => o.agentId === e.id).map((o) => ({ kind: "add-agent-query", sourceId: e.id, targetId: o.queryServiceId })),
          ...(this.model.agentRags ?? []).filter((o) => o.agentId === e.id).map((o) => ({ kind: "add-agent-rag", sourceId: e.id, targetId: o.ragId })),
          ...(this.model.agentDelegations ?? []).filter((o) => o.agentId === e.id || o.delegateAgentId === e.id).map((o) => ({
            kind: "add-agent-delegate",
            sourceId: o.agentId,
            targetId: o.delegateAgentId
          })),
          ...(this.model.actorAgentUses ?? []).filter((o) => o.agentId === e.id).map((o) => ({ kind: "add-actor-agent", sourceId: o.actorId, targetId: e.id })),
          ...(this.model.agentTriggers ?? []).filter((o) => o.agentId === e.id).map((o) => ({ kind: "add-agent-trigger", sourceId: o.eventId, targetId: e.id }))
        ] : null;
      }
      case "add-mcp-gateway":
        return [{ kind: "remove-mcp-gateway", id: e.id }];
      case "remove-mcp-gateway": {
        const r = (this.model.mcpGateways ?? []).find((o) => o.id === e.id);
        return r ? [
          { kind: "add-mcp-gateway", id: r.id, name: r.name },
          ...[
            ...r.mcpServerIds ?? [],
            ...r.apiIds ?? [],
            ...r.apiOperationIds ?? [],
            ...r.useCaseIds ?? [],
            ...r.ragIds ?? []
          ].map((o) => ({ kind: "add-gateway-exposure", sourceId: e.id, targetId: o })),
          ...(this.model.agentGatewayUses ?? []).filter((o) => o.gatewayId === e.id).map((o) => ({ kind: "add-agent-gateway", sourceId: o.agentId, targetId: e.id }))
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
        for (const r of this.model.externalSystems) {
          const o = (r.mcpServers ?? []).find((a) => a.id === e.id);
          if (o)
            return [
              { kind: "add-mcp-server", id: o.id, name: o.name, moduleId: r.id, uri: o.uri },
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
        const r = (s = (this.model.apis ?? []).find((o) => o.id === e.apiId)) == null ? void 0 : s.operations.find((o) => o.id === e.id);
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
        const r = (n = (this.model.apis ?? []).find((o) => o.id === e.apiId)) == null ? void 0 : n.operations.find((o) => o.id === e.id);
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
        const o = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((a) => a.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((a) => a.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((a) => a.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((a) => a.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((a) => a.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((a) => a.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((a) => a.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((a) => a.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((a) => a.id === e.id);
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
        const r = (this.model.processes ?? []).find((l) => l.id === e.processId), o = (r == null ? void 0 : r.steps.findIndex((l) => l.id === e.id)) ?? -1;
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
        const r = (this.model.workflows ?? []).find((l) => l.id === e.workflowId), o = (r == null ? void 0 : r.steps.findIndex((l) => l.id === e.id)) ?? -1;
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
          ...r.steps.filter((l) => l.id !== e.id && (l.dependsOnStepIds ?? []).includes(e.id)).map(
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, r = this.viewLayout(n), o = r.nodes[t] ?? null;
    let a = { x: i, y: s };
    const l = this.sceneFor(n), c = l.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = l.nodes.find((p) => p.id === c.parentId);
      m && (a = { x: i - m.x, y: s - m.y });
    }
    this.writeViewLayout(n, { ...r, nodes: { ...r.nodes, [t]: a } });
    const h = [{ kind: "move-node", view: n, id: t, pos: o }];
    if (n === "processes") {
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, r = (this.model.apis ?? []).find((y) => y.id === t) ?? (this.model.proxyApis ?? []).find((y) => y.id === t);
    if (!r || i && !this.model.externalSystems.some((y) => y.id === i)) return;
    const o = r.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === o) return;
    const l = this._view, c = this.viewLayout(l), h = this.sceneFor(l), m = a ? h.nodes.find((y) => y.id === a) : void 0, p = m ? { x: s - m.x, y: n - m.y } : { x: s, y: n }, f = [
      { kind: "set-api-publisher", id: t, targetId: o },
      { kind: "move-node", view: l, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(l, { ...c, nodes: { ...c.nodes, [t]: p } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, r = (this.model.apis ?? []).find((y) => y.id === t), o = this.model.externalSystems.find((y) => y.id === i);
    if (!r || !o || (this.model.proxyApis ?? []).some(
      (y) => y.targetApiId === t && y.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${G(r.name)}-${G(o.name)}`;
    if ((this.model.proxyApis ?? []).some((y) => y.id === l)) return;
    const c = this._view, h = this.viewLayout(c), p = this.sceneFor(c).nodes.find((y) => y.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${r.name}@${o.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const f = [{ kind: "remove-proxy-api", id: l }];
    p && (f.push({ kind: "move-node", view: c, id: l, pos: h.nodes[l] ?? null }), this.writeViewLayout(c, {
      ...h,
      nodes: { ...h.nodes, [l]: { x: s - p.x, y: n - p.y } }
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
    var n;
    const t = e.target, i = (n = t.files) == null ? void 0 : n[0];
    if (t.value = "", !i) return;
    const s = await i.text();
    this.emit("modux-import-api", {
      content: s,
      fileName: i.name,
      apiId: this.selectedApiId()
    });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), r = { ...s.nodes }, o = [];
    for (const { id: a, x: l, y: c } of t) {
      o.push({ kind: "move-node", view: i, id: a, pos: s.nodes[a] ?? null });
      let h = { x: l, y: c };
      const m = n.nodes.find((p) => p.id === a);
      if (m != null && m.parentId) {
        const p = n.nodes.find((f) => f.id === m.parentId);
        p && (h = { x: l - p.x, y: c - p.y });
      }
      r[a] = h;
    }
    if (this.writeViewLayout(i, { ...s, nodes: r }), i === "processes")
      for (const { id: a } of t) {
        const l = this.stepReorderCommand(a);
        if (l) {
          const c = this.inverseOf(l);
          c && o.unshift(...c), this.command(l, !1);
        }
      }
    this.pushUndoEntry(o);
  }
  onNodeResized(e) {
    var h;
    const { id: t, x: i, y: s, w: n, h: r } = e.detail, o = this._view, a = this.viewLayout(o), l = this.sceneFor(o).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: o, id: t, size: ((h = a.sizes) == null ? void 0 : h[t]) ?? null },
      { kind: "move-node", view: o, id: t, pos: a.nodes[t] ?? null },
      ...l.map((m) => ({ kind: "move-node", view: o, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: s } };
    for (const m of l) c[m.id] = { x: m.x - i, y: m.y - s };
    this.writeViewLayout(o, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [t]: { w: n, h: r } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, s = this._view, n = this.viewLayout(s);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: s, id: t, points: n.edges[t] ?? null }
    ]);
    const r = { ...n.edges };
    i.length ? r[t] = i : delete r[t], this.writeViewLayout(s, { ...n, edges: r });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = Ri(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((o) => [o.id, o.x])), n = [...t.steps].sort(
      (o, a) => (s.get(o.id) ?? 0) - (s.get(a.id) ?? 0)
    );
    if (n.every((o, a) => o.id === t.steps[a].id)) return null;
    const r = n.findIndex((o) => o.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: r > 0 ? n[r - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    var F;
    const { sourceId: t, targetId: i, x: s, y: n } = e.detail;
    if (this._view === "workflows") {
      const x = this.owningWorkflowOf(t), k = this.owningWorkflowOf(i);
      if (!x || x !== k || t === i) return;
      const S = x.steps.find((M) => M.id === i);
      if (((S == null ? void 0 : S.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: x.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const r = /^apiop:(.+)@(.+)$/.exec(t);
    if (r) {
      const [, x, k] = r, S = (this.model.proxyApis ?? []).find((W) => W.id === k), M = (S == null ? void 0 : S.targetApiId) ?? ((F = (this.model.apiImplementations ?? []).find(
        (W) => W.moduleId === k && (this.model.apis ?? []).some(
          (u) => u.id === W.apiId && u.operations.some((g) => g.id === x)
        )
      )) == null ? void 0 : F.apiId);
      if (!M) return;
      if (new Set(
        this.model.modules.flatMap((W) => (W.useCases ?? []).map((u) => u.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: M,
          operationId: x,
          moduleId: k,
          targetUseCaseId: i
        });
        return;
      }
      if (!(S != null && S.targetApiId)) return;
      let P = null;
      if (i === S.targetApiId)
        P = S.targetApiId;
      else {
        const W = /^apiimpl:(.+)@(.+)$/.exec(i);
        W && W[1] === S.targetApiId ? P = W[2] : this.model.modules.some((u) => u.id === i) && (this.model.apiImplementations ?? []).some(
          (u) => u.apiId === S.targetApiId && u.moduleId === i
        ) && (P = i);
      }
      if (!P) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (W) => W.proxyId === S.id && W.operationId === x && W.targetSiteId === P
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: S.id,
        operationId: x,
        targetSiteId: P
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((x) => x.id));
    if (o.has(t)) {
      if (new Set(
        this.model.modules.flatMap((P) => (P.useCases ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (D) => D.agentId === t && D.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((P) => (P.useCases ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (D) => D.agentId === t && D.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((P) => (P.mcpServers ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentMcpUses ?? []).some(
          (D) => D.agentId === t && D.mcpServerId === i
        ) || this.command({ kind: "add-agent-mcp", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((P) => P.id === i)) {
        (this.model.agentGatewayUses ?? []).some(
          (D) => D.agentId === t && D.gatewayId === i
        ) || this.command({ kind: "add-agent-gateway", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((P) => P.operations.map((D) => D.id))
      ).has(i)) {
        (this.model.agentApiOpUses ?? []).some(
          (D) => D.agentId === t && D.apiOperationId === i
        ) || this.command({ kind: "add-agent-api-operation", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.apis ?? []).some((P) => P.id === i) || (this.model.proxyApis ?? []).some((P) => P.id === i)) {
        (this.model.agentApiUses ?? []).some(
          (D) => D.agentId === t && D.apiId === i
        ) || this.command({ kind: "add-agent-api", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((P) => (P.queryServices ?? []).map((D) => D.id))
      ).has(i)) {
        (this.model.agentQueryUses ?? []).some(
          (D) => D.agentId === t && D.queryServiceId === i
        ) || this.command({ kind: "add-agent-query", sourceId: t, targetId: i });
        return;
      }
      if (o.has(i) && i !== t) {
        (this.model.agentDelegations ?? []).some(
          (D) => D.agentId === t && D.delegateAgentId === i
        ) || this.command({ kind: "add-agent-delegate", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((P) => P.id === i) && ((this.model.agentRags ?? []).some(
        (D) => D.agentId === t && D.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === t)) {
      const x = (this.model.mcpGateways ?? []).find((M) => M.id === t), k = this.model.externalSystems.some((M) => (M.mcpServers ?? []).some((H) => H.id === i)) || (this.model.apis ?? []).some((M) => M.id === i) || (this.model.apis ?? []).some((M) => M.operations.some((H) => H.id === i)) || this.model.modules.some((M) => (M.useCases ?? []).some((H) => H.id === i)) || (this.model.rags ?? []).some((M) => M.id === i), S = [
        ...x.mcpServerIds ?? [],
        ...x.apiIds ?? [],
        ...x.apiOperationIds ?? [],
        ...x.useCaseIds ?? [],
        ...x.ragIds ?? []
      ].includes(i);
      k && !S && this.command({ kind: "add-gateway-exposure", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === i)) return;
    const a = (this.model.rags ?? []).find((x) => x.id === t);
    if (a) {
      if (new Set(
        this.model.modules.flatMap((S) => (S.readModels ?? []).map((M) => M.id))
      ).has(i) && !(a.sourceReadModelIds ?? []).includes(i)) {
        this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((S) => (S.tables ?? []).map((M) => M.id))
      ).has(i) && !(a.sourceExternalTableIds ?? []).includes(i)) {
        this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
        return;
      }
      ((this.model.apis ?? []).some((S) => S.id === i) || (this.model.proxyApis ?? []).some((S) => S.id === i)) && !(a.sourceApiIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some((x) => x.id === i)) return;
    if ((this.model.proxyApis ?? []).some((x) => x.id === t)) {
      const x = (this.model.proxyApis ?? []).find((k) => k.id === t);
      if ((this.model.apis ?? []).some((k) => k.id === i)) {
        x.targetApiId !== i && this.command({ kind: "set-proxy-target", id: t, targetId: i });
        return;
      }
      if (this.model.modules.some((k) => k.id === i)) {
        if (!x.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (S) => S.apiId === x.targetApiId && S.moduleId === i
        ) || this.command({ kind: "add-api-implementation", apiId: x.targetApiId, moduleId: i });
        return;
      }
      this.model.externalSystems.some((k) => k.id === i) && x.publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
      return;
    }
    if ((this.model.apis ?? []).some((x) => x.id === t)) {
      if (this.model.externalSystems.some((x) => x.id === i)) {
        (this.model.apis ?? []).find((k) => k.id === t).publishedByExternalSystemId !== i && this.command({ kind: "set-api-publisher", id: t, targetId: i });
        return;
      }
      this.model.modules.some((x) => x.id === i) && ((this.model.apiImplementations ?? []).some(
        (k) => k.apiId === t && k.moduleId === i
      ) || this.command({ kind: "add-api-implementation", apiId: t, moduleId: i }));
      return;
    }
    const l = new Set((this.model.actors ?? []).map((x) => x.id));
    if (o.has(i)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((k) => (k.domainEvents ?? []).map((S) => S.id)),
        ...this.model.modules.flatMap((k) => (k.applicationEvents ?? []).map((S) => S.id))
      ])).has(t)) {
        (this.model.agentTriggers ?? []).some(
          (S) => S.eventId === t && S.agentId === i
        ) || this.command({ kind: "add-agent-trigger", sourceId: t, targetId: i });
        return;
      }
      if (!l.has(t)) return;
    }
    if (l.has(t)) {
      const x = new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((M) => M.id))
      ), k = new Set(
        this.model.modules.flatMap((S) => (S.queryServices ?? []).map((M) => M.id))
      );
      if (x.has(i) || k.has(i)) {
        (this.model.actorUses ?? []).some(
          (M) => M.actorId === t && M.targetId === i
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aggregates ?? []).some((S) => S.id === i)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: i });
        return;
      }
      if (this.model.externalSystems.some((S) => S.id === i)) {
        (this.model.actorExternalDependencies ?? []).some(
          (M) => M.actorId === t && M.externalSystemId === i
        ) || this.command({ kind: "add-actor-external", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aiAgents ?? []).some((S) => S.id === i)) {
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
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: c.id,
          id: t,
          targetUseCaseId: i
        });
        return;
      }
      if (this.model.modules.some((k) => k.id === i)) {
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
    const h = this.model.externalSystems.flatMap((x) => x.useCases ?? []).find((x) => x.id === t), m = this.model.externalSystems.flatMap((x) => x.tables ?? []).find((x) => x.id === t);
    if (h || m) {
      const x = (h ?? m).name, k = h ? { externalUseCaseId: t } : { externalTableId: t }, S = (P) => h ? P.sourceExternalUseCaseId === t : P.sourceExternalTableId === t, M = this.model.modules.flatMap((P) => P.readModels ?? []).find((P) => P.id === i);
      if (M) {
        (this.model.projections ?? []).some(
          (D) => S(D) && D.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${G(x)}-${G(M.name)}`,
          name: `${M.name}Projection`,
          ...k,
          targetId: i
        });
        return;
      }
      const H = this.model.modules.find((P) => P.id === i);
      if (H) {
        (this.model.projections ?? []).some(
          (D) => S(D) && D.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${G(x)}-${G(H.name)}`,
          name: `${x}ViewProjection`,
          ...k,
          moduleId: i,
          readModelName: `${x}View`
        });
        return;
      }
      return;
    }
    const p = (this.model.aggregates ?? []).find((x) => x.id === t);
    if (p) {
      const x = this.model.modules.flatMap((S) => S.readModels ?? []).find((S) => S.id === i);
      if (x) {
        (this.model.projections ?? []).some(
          (M) => M.sourceAggregateId === t && M.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${G(p.name)}-${G(x.name)}`,
          name: `${x.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const k = this.model.modules.find((S) => S.id === i);
      if (k) {
        (this.model.projections ?? []).some(
          (M) => M.sourceAggregateId === t && M.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${G(p.name)}-${G(k.name)}`,
          name: `${p.name}ViewProjection`,
          aggregateId: t,
          moduleId: i,
          readModelName: `${p.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((k) => k.id))
    ), y = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((x) => x.id),
      ...this.model.modules.flatMap((x) => (x.domainServices ?? []).map((k) => k.id))
    ]), _ = new Set(
      this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((k) => k.id))
    ), N = new Set(this.model.modules.flatMap((x) => (x.useCases ?? []).map((k) => k.id))), v = new Set(
      this.model.modules.flatMap((x) => (x.queryServices ?? []).map((k) => k.id))
    );
    if (N.has(t) && v.has(i)) {
      (this.model.queryCalls ?? []).some(
        (k) => k.sourceId === t && k.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const T = new Set(
      this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((k) => k.id))
    );
    if (N.has(t) && T.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (k) => k.sourceId === t && k.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (N.has(t) && N.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        (k) => k.sourceId === t && k.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (y.has(t) && f.has(i) || N.has(t) && _.has(i)) {
      (this.model.emissions ?? []).some(
        (k) => k.sourceId === t && k.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (f.has(t) || _.has(t)) {
      const x = _.has(t), k = this.model.modules.flatMap((w) => (x ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === t), S = this.model.modules.flatMap((w) => (w.useCases ?? []).map((b) => ({ u: b, module: w }))).find(({ u: w }) => w.id === i), M = this.model.modules.flatMap((w) => (w.readModels ?? []).map((b) => ({ rm: b, module: w }))).find(({ rm: w }) => w.id === i), H = this.model.modules.find((w) => w.id === i) ?? (M == null ? void 0 : M.module) ?? (S == null ? void 0 : S.module);
      if (!k || !H) return;
      const P = new Set((this.model.aggregates ?? []).map((w) => w.id)), D = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((b) => b.id))
      ), W = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === t && (x ? N.has(w.sourceId) : P.has(w.sourceId) || D.has(w.sourceId))
      );
      if (!W) {
        this.emit("modux-notice", {
          message: x ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const u = !x && P.has(W.sourceId);
      if (S) {
        if (this.model.flows.some(
          (b) => b.archetype === "TRIGGERS" && b.triggerEvent === k.name && b.targetUseCaseId === S.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${G(k.name)}-${G(S.u.name)}`,
          name: S.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: u ? W.sourceId : "",
          triggerDomainServiceId: !x && !u ? W.sourceId : void 0,
          triggerUseCaseId: x ? W.sourceId : void 0,
          triggerEvent: k.name,
          targetId: H.id,
          targetUseCaseId: S.u.id
        });
        return;
      }
      const g = (M == null ? void 0 : M.rm.name) ?? `${k.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === k.name && w.targetId === H.id && w.readModelName === g
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${G(k.name)}-${G(g)}`,
        name: g,
        archetype: "MATERIALIZES",
        triggerAggregateId: u ? W.sourceId : "",
        triggerDomainServiceId: !x && !u ? W.sourceId : void 0,
        triggerUseCaseId: x ? W.sourceId : void 0,
        triggerEvent: k.name,
        targetId: H.id,
        readModelName: g
      });
      return;
    }
    const z = /* @__PURE__ */ new Set([
      ...y,
      ...N,
      ...v,
      ...this.model.modules.flatMap((x) => (x.readModels ?? []).map((k) => k.id))
    ]);
    if (z.has(t) || z.has(i) || f.has(i) || _.has(i))
      return;
    const $ = new Set(this.model.externalSystems.map((x) => x.id));
    if ($.has(t)) {
      if (new Set(
        this.model.modules.flatMap((H) => (H.useCases ?? []).map((P) => P.id))
      ).has(i)) {
        (this.model.externalCalls ?? []).some(
          (P) => P.externalSystemId === t && P.useCaseId === i
        ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i });
        return;
      }
      if ($.has(i) && i !== t) {
        this._extDepPicker = { sourceId: t, targetId: i, x: s ?? 0, y: n ?? 0 };
        return;
      }
      const k = (this.model.apis ?? []).find(
        (H) => H.operations.some((P) => P.id === i)
      ), S = /^apiop:(.+)@(.+)$/.exec(i), M = k ? { operationId: i, siteId: k.id } : S ? { operationId: S[1], siteId: S[2] } : null;
      if (M) {
        (this.model.externalOperationUses ?? []).some(
          (P) => P.externalSystemId === t && P.operationId === M.operationId && P.siteId === M.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: t,
          operationId: M.operationId,
          targetSiteId: M.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((H) => H.id === i) || (this.model.proxyApis ?? []).some((H) => H.id === i)) {
        (this.model.externalSystemDependencies ?? []).some(
          (P) => P.sourceId === t && P.targetId === i
        ) || this.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    $.has(i) || l.has(i);
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
      const n = this.memberIdOf(i, s), r = (this.model.views ?? []).find((o) => o.id === this._activeViewId);
      if (n && (r != null && r.memberIds.includes(n))) {
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
      const r = this.owningWorkflowOf(n[2]);
      if (!r) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: r.id,
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
      const [, r, o] = n, a = (s = (this.model.apis ?? []).find(
        (l) => l.operations.some((c) => c.id === r)
      )) == null ? void 0 : s.id;
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: a, operationId: r, moduleId: o });
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
      const [, r, o, a] = n, l = /^apiimpl:.+@(.+)$/.exec(a), c = l ? l[1] : a;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: o, operationId: r, targetSiteId: c });
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
    if (this._view === "context-map" && e === "edge" && (i === "rag-table" || i === "rag-api")) {
      const n = /^rag(?:tbl|api):(.+)->(.+)$/.exec(t);
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
      const n = /^apiwire:(.+)$/.exec(t), r = n ? this.owningApiOf(n[1]) : null;
      if (!n || !r) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: r.id, id: n[1] });
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
      if (!n || !(this.model.proxyApis ?? []).some((r) => r.id === n[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: n[1], targetId: "" });
      return;
    }
    if (e === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((r) => r.moduleId === t)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: t });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((r) => r.aggregateId === t)) return;
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
      id: `step-${G(e)}`,
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
      id: `wfstep-${G(e)}`,
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
    const t = new Set(e.memberIds), i = (n, r, o = {}) => R`
      <label
        class="${o.child ? "child" : ""} ${o.implicit && !t.has(n) ? "implicit" : ""}"
        title=${o.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(a) => this.toggleViewMember(n, a.target.checked)}
        />
        ${r}
      </label>
    `, s = (n, r) => r.length ? R`<h4>${n}</h4>${r}` : "";
    return R`
      <aside class="view-tree" @pointerdown=${(n) => n.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${s(
      "Contextos",
      this.model.modules.flatMap((n) => [
        i(n.id, n.name),
        ...(this.model.aggregates ?? []).filter((r) => r.moduleId === n.id).map((r) => i(r.id, r.name, { child: !0, implicit: t.has(n.id) }))
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${G(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((l) => l.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((l) => t.has(l.id)), s = new Set(i.map((l) => l.id)), n = this.model.externalSystems.filter((l) => t.has(l.id)), r = new Set(n.map((l) => l.id)), o = (this.model.aggregates ?? []).filter(
      (l) => t.has(l.id) || s.has(l.moduleId)
    ), a = new Set(o.map((l) => l.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (l) => s.has(l.sourceId) && s.has(l.targetId)
      ),
      flows: this.model.flows.filter(
        (l) => t.has(l.id) || (s.has(l.sourceId) || r.has(l.sourceId)) && (s.has(l.targetId) || r.has(l.targetId))
      ),
      aggregates: o,
      entities: (this.model.entities ?? []).filter((l) => a.has(l.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (l) => a.has(l.sourceAggregateId) && a.has(l.targetAggregateId)
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
        (l) => t.has(l.id) || (l.publishedByExternalSystemId ? r.has(l.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (l) => t.has(l.id) || (l.publishedByExternalSystemId ? r.has(l.publishedByExternalSystemId) : !1)
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
    const t = e.detail.kind === "process-step" ? rl(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : sl(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, s, n, r, o, a, l, c, h, m, p, f, y, _, N, v, T, z, $, F, x, k, S, M, H, P, D, W, u, g, I, w;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${G(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: G(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${G(e)}`, name: e });
        else if (this._newContextMapKind === "external-ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${G(e)}`, name: e, external: !0 });
        else if (this._newContextMapKind === "mcp-gateway")
          this.command({ kind: "add-mcp-gateway", id: `mcpgw-${G(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${G(e)}`, name: e });
        else if (this._newContextMapKind === "api")
          this.command({ kind: "add-api", id: `api-${G(e)}`, name: e });
        else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${G(e)}`, name: e });
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const b = (t = (this.model.apis ?? []).find((E) => E.id === this._selectedId)) == null ? void 0 : t.id, A = this._newApiId || b || ((s = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : s.id);
          if (!A) return;
          this.command({
            kind: "add-api-operation",
            apiId: A,
            id: `apiop-${A.replace(/^api-/, "")}-${G(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const b = (n = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : n.id, A = this._newModuleId || b || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!A) return;
          this.command({ kind: "add-domain-event", id: `ev-${G(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const b = (o = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : o.id, A = this._newModuleId || b || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!A) return;
          this.command({ kind: "add-application-event", id: `aev-${G(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const b = (l = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : l.id, A = this._newModuleId || b || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!A) return;
          this.command({ kind: "add-domain-service", id: `ds-${G(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const b = (h = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : h.id, A = this._newModuleId || b || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!A) return;
          this.command({ kind: "add-query-service", id: `qs-${G(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const b = (p = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : p.id, A = this._newModuleId || b || ((f = this.model.modules[0]) == null ? void 0 : f.id);
          if (!A) return;
          this.command({ kind: "add-use-case", id: `uc-${G(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const b = (y = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : y.id, A = this._newModuleId || b || ((_ = this.model.modules[0]) == null ? void 0 : _.id);
          if (!A) return;
          this.command({ kind: "add-use-case", id: `uc-${G(e)}`, name: e, moduleId: A, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const b = (N = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : N.id, A = this._newExternalId || b || ((v = this.model.externalSystems[0]) == null ? void 0 : v.id);
          if (!A) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${G(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const b = (T = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : T.id, A = this._newExternalId || b || ((z = this.model.externalSystems[0]) == null ? void 0 : z.id);
          if (!A) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${G(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "mcp-server") {
          const b = ($ = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : $.id, A = this._newExternalId || b || ((F = this.model.externalSystems[0]) == null ? void 0 : F.id);
          if (!A) return;
          this.command({
            kind: "add-mcp-server",
            id: `mcpsrv-${G(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const b = (x = (this.model.aggregates ?? []).find((E) => E.id === this._selectedId)) == null ? void 0 : x.id, A = this._newAggregateId || b || ((S = (k = this.model.aggregates) == null ? void 0 : k[0]) == null ? void 0 : S.id);
          if (!A) return;
          this.command({ kind: "add-read-model", id: `rm-${G(e)}`, name: e, aggregateId: A });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${G(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const b = this._newModuleId || ((M = this.model.modules[0]) == null ? void 0 : M.id);
        if (!b) return;
        this.command({ kind: "add-aggregate", id: `agg-${G(e)}`, name: e, moduleId: b });
      } else if (this._view === "flows") {
        const b = this._newTriggerAggId || ((P = (H = this.model.aggregates) == null ? void 0 : H[0]) == null ? void 0 : P.id), A = this._newTargetId || ((D = this.model.modules[0]) == null ? void 0 : D.id), E = this._newTriggerEvent.trim();
        if (!b || !A || !E) return;
        this.command({
          kind: "add-flow",
          id: `flow-${G(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: b,
          triggerEvent: E,
          targetId: A
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const b = this._newModuleId || ((W = this.model.modules[0]) == null ? void 0 : W.id);
        if (!b) return;
        this.command({
          kind: "add-process",
          id: `proc-${G(e)}`,
          name: e,
          moduleId: b,
          triggerAggregateId: this._newTriggerAggId || ((g = (u = this.model.aggregates) == null ? void 0 : u[0]) == null ? void 0 : g.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${G(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((w = (I = this.model.aggregates) == null ? void 0 : I[0]) == null ? void 0 : w.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? Cs(i, t.nodes) : e === "flows" ? Ls(i, t.nodes) : e === "processes" ? Ri(i, t.nodes) : e === "workflows" ? Xd(i, t.nodes) : e === "eventstorming" ? Kd(i, t.nodes) : _s(i, t.nodes, this._detail, t.sizes ?? {});
    if (this.diff)
      for (const n of s.nodes) {
        const r = this.diff[n.id] ?? this.diff[n.id.replace(/^(tgt:|flow:)/, "")];
        r && (n.diffKind = r);
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
    }, o = await Qd(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: o, edges: {}, sizes: a.sizes }), await this.updateComplete, (l = this.renderRoot.querySelector("modux-canvas")) == null || l.fit();
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
    return R`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <div class="tabs">
          ${tl.map(
      (t) => R`
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
      (t) => R`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? R`
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
      (t) => R`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this._multi.length ? R`
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
        ${this._view === "context-map" ? R`<select
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
              ${this._detail !== "contexts" ? R`
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
        ${this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table" || this._newContextMapKind === "mcp-server") ? R`<select
              title="Sistema externo dueño del nuevo elemento"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return R`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "api-operation" ? R`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, s;
        return R`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((s = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : s.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "read-model" ? R`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return R`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? R`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${il.map(
      (t) => R`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? R`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return R`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? R`
              ${this._view === "flows" ? R`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => R`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return R`<option
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
              ${this._view === "flows" ? R`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return R`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? R`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => R`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? R`
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
      (t) => R`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? R`<input
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
              ${this.owningProcessOf(this._selectedId) ? R`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? R`
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
      (t) => R`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? R`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => R`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._view === "context-map" ? R`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? R`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? R`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : R`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return R`
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
    return R`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (n) => R`
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
    return R`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${el.map(
      (s) => R`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${yi[s].abbr}</span>
              <span class="name">${yi[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
K.styles = _i`
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
V([
  Se({ attribute: !1 })
], K.prototype, "model", 2);
V([
  Se({ attribute: !1 })
], K.prototype, "layout", 2);
V([
  Se({ attribute: !1 })
], K.prototype, "diff", 2);
V([
  O()
], K.prototype, "_view", 2);
V([
  O()
], K.prototype, "_detail", 2);
V([
  O()
], K.prototype, "_relationType", 2);
V([
  O()
], K.prototype, "_relationPicker", 2);
V([
  O()
], K.prototype, "_extDepPicker", 2);
V([
  O()
], K.prototype, "_selectedId", 2);
V([
  O()
], K.prototype, "_newName", 2);
V([
  O()
], K.prototype, "_newSubdomain", 2);
V([
  O()
], K.prototype, "_newModuleId", 2);
V([
  O()
], K.prototype, "_newContextMapKind", 2);
V([
  O()
], K.prototype, "_newAggregateId", 2);
V([
  O()
], K.prototype, "_newExternalId", 2);
V([
  O()
], K.prototype, "_newApiId", 2);
V([
  O()
], K.prototype, "_newArchetype", 2);
V([
  O()
], K.prototype, "_newTriggerAggId", 2);
V([
  O()
], K.prototype, "_newTriggerEvent", 2);
V([
  O()
], K.prototype, "_newTargetId", 2);
V([
  O()
], K.prototype, "_undoStack", 2);
V([
  O()
], K.prototype, "_redoStack", 2);
V([
  O()
], K.prototype, "_newStepName", 2);
V([
  O()
], K.prototype, "_newStepType", 2);
V([
  O()
], K.prototype, "_newStepRole", 2);
V([
  O()
], K.prototype, "_newStepDeadline", 2);
V([
  O()
], K.prototype, "_editStepRole", 2);
V([
  O()
], K.prototype, "_editStepDeadline", 2);
V([
  O()
], K.prototype, "_editStepComp", 2);
V([
  O()
], K.prototype, "_newStepUseCase", 2);
V([
  O()
], K.prototype, "_newStepEmits", 2);
V([
  O()
], K.prototype, "_editStepUseCase", 2);
V([
  O()
], K.prototype, "_editStepEmits", 2);
V([
  O()
], K.prototype, "_editStepAwaits", 2);
V([
  O()
], K.prototype, "_multi", 2);
V([
  O()
], K.prototype, "_newViewName", 2);
V([
  O()
], K.prototype, "_activeViewId", 2);
V([
  O()
], K.prototype, "_newRagSourceType", 2);
V([
  O()
], K.prototype, "_newRagSourceUri", 2);
V([
  O()
], K.prototype, "_addMemberKey", 2);
V([
  O()
], K.prototype, "_treeOpen", 2);
V([
  O()
], K.prototype, "_deletePicker", 2);
K = V([
  bi("modux-editor")
], K);
var ol = Object.defineProperty, al = Object.getOwnPropertyDescriptor, ge = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? al(t, i) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && ol(t, i, n), n;
};
let le = class extends Ve {
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
    var n, r, o;
    const i = (n = this._workspace) == null ? void 0 : n.current;
    await this.trackWrite(async () => {
      var a;
      try {
        const l = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!l.ok) {
          let c = `El servidor rechazó la operación (${l.status})`;
          try {
            const h = await l.json();
            h != null && h.message && (c = h.message);
          } catch {
          }
          this.showToast(c);
          return;
        }
        this._workspace = await l.json(), await this.reload(), await this.refreshDiff(), (a = this.renderRoot.querySelector("modux-editor")) == null || a.clearHistory();
      } catch (l) {
        this.showToast(String(l));
      }
    });
    const s = (r = this._workspace) == null ? void 0 : r.current;
    if (s && s !== i) {
      const a = ((o = this._workspace.solutions.find((l) => l.branch === s)) == null ? void 0 : o.name) ?? s.replace(/^solution\//, "");
      this.syncModelContext(
        s,
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
    const { content: t, fileName: i, apiId: s } = e.detail;
    await this.trackWrite(async () => {
      try {
        const n = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: s })
        });
        if (!n.ok) {
          let a = `El servidor rechazó el contrato (${n.status})`;
          try {
            const l = await n.json();
            l != null && l.message && (a = l.message);
          } catch {
          }
          this.showToast(a);
          return;
        }
        const { apiId: r } = await n.json(), o = await fetch(`${this.base}/model`);
        o.ok && (this._model = await o.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${r}`, "info");
      } catch (n) {
        this.showToast(String(n));
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
    return this._error ? R`<div class="status error">modux editor: ${this._error}</div>` : this._model ? R`
      ${this._workspace ? R`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : R`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (n) => this._diff.changes.filter((r) => r.kind === n).length, s = this._diff.changes.filter((n) => n.kind === "REMOVED").map((n) => n.name ?? n.id);
      return R`<span
                      class="badge solution"
                      title=${s.length ? `Eliminados respecto al sistema: ${s.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? R`
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
      return R`
                      ${i === "EXPLORING" ? R`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? R`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? R`<button
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
      ${this._mergeFlow ? R`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => R`
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
      ${this._toast ? R`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : R`<div class="status">Cargando el modelo…</div>`;
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
  O()
], le.prototype, "_model", 2);
ge([
  O()
], le.prototype, "_layout", 2);
ge([
  O()
], le.prototype, "_error", 2);
ge([
  O()
], le.prototype, "_saving", 2);
ge([
  O()
], le.prototype, "_toast", 2);
ge([
  O()
], le.prototype, "_workspace", 2);
ge([
  O()
], le.prototype, "_creatingSolution", 2);
ge([
  O()
], le.prototype, "_newSolutionName", 2);
ge([
  O()
], le.prototype, "_diff", 2);
ge([
  O()
], le.prototype, "_mergeFlow", 2);
le = ge([
  bi("modux-editor-connected")
], le);
export {
  dl as CONTAINER_HEADER,
  ll as CONTAINER_INSET,
  ie as ModuxCanvas,
  K as ModuxEditor,
  le as ModuxEditorConnected,
  Cs as aggregatesScene,
  ze as apiImplNodeId,
  Le as apiOpOccurrenceId,
  oi as containerFit,
  hs as containerMinSize,
  _s as contextMapScene,
  ws as flowCoherence,
  Ls as flowsScene,
  At as normalizeViewLayout,
  Ri as processesScene,
  ys as relationEdgeId,
  wi as resolveOverlaps
};
