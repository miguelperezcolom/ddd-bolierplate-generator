const dl = 34, ll = 10;
function xi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let a = r + 1; a < e.length; a++) {
        const l = e[r], c = e[a], u = i.get(l.id), m = i.get(c.id), h = m.x - u.x, f = m.y - u.y, w = (l.w + c.w) / 2 + t - Math.abs(h), I = (l.h + c.h) / 2 + t - Math.abs(f);
        if (!(w <= 0 || I <= 0))
          if (o = !0, w < I) {
            const N = (h >= 0 ? 1 : -1) * w / 2;
            u.x -= N, m.x += N;
          } else {
            const N = (f >= 0 ? 1 : -1) * I / 2;
            u.y -= N, m.y += N;
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
function ri(e, t, i) {
  let s = t.w / 2, n = t.w / 2, o = t.h / 2, r = t.h / 2;
  for (const a of i)
    s = Math.max(s, -a.dx + a.w / 2 + 10), n = Math.max(n, a.dx + a.w / 2 + 10), o = Math.max(o, -a.dy + a.h / 2 + 34), r = Math.max(r, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (r - o) / 2,
    w: s + n,
    h: o + r
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
const hs = {
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
}, Ye = 168, Xe = 56;
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
const gn = 34, yn = 14, gs = 14, xe = 108, ve = 32, wn = 12, xn = 10, gt = 2, ys = gt * xe + (gt - 1) * wn + 2 * yn;
function ws(e, t) {
  return `rel:${e}->${t}`;
}
function xs(e, t) {
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
const vs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, vn = {
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
  const t = Math.max(1, Math.ceil(e / gt)), i = t * ve + (t - 1) * xn;
  return { w: ys, h: gn + i + gs };
}
function Ot(e, t) {
  const i = e % gt, s = Math.floor(e / gt);
  return {
    x: -t.w / 2 + yn + i * (xe + wn) + xe / 2,
    y: -t.h / 2 + gn + s * (ve + xn) + ve / 2
  };
}
function Is(e, t, i, s, n, o, r = !1) {
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
    return [{ ...s, x: i.x, y: i.y, w: Ye, h: Xe }];
  if (r) {
    const c = new Map((e.apis ?? []).map((m) => [m.id, m])), u = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && c.has(m.apiId)).map((m) => {
      const h = c.get(m.apiId);
      return {
        id: ze(m.apiId, m.moduleId),
        name: h.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${h.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (h.operations ?? []).map((f) => ({
          id: Le(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (u.length > 0) {
      const m = l.filter((h) => h.kind !== "api-impl");
      return In(i, s, u, m, n, o);
    }
  }
  return ct(i, s, l, n, o);
}
function In(e, t, i, s, n, o) {
  const r = o[t.id] ?? di(i.length + s.length), a = i.map((h, f) => {
    const w = n[h.id] ?? Ot(f, r), I = h.ops, N = o[h.id] ?? di(I.length), v = I.map((q, $) => n[q.id] ?? Ot($, N)), O = ri(
      { x: w.x, y: w.y },
      N,
      v.map((q) => ({ dx: q.x, dy: q.y, w: xe, h: ve }))
    );
    return { a: h, off: w, ops: I, opOffs: v, fit: O };
  }), l = s.map(
    (h, f) => n[h.id] ?? Ot(i.length + f, r)
  ), c = xi(
    [
      ...a.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...s.map((h, f) => ({
        id: h.id,
        x: l[f].x,
        y: l[f].y,
        w: xe,
        h: ve
      }))
    ],
    24
  );
  for (const h of a) {
    const f = c.get(h.a.id);
    f && (h.off = { x: h.off.x + (f.x - h.fit.x), y: h.off.y + (f.y - h.fit.y) }, h.fit = { ...h.fit, x: f.x, y: f.y });
  }
  s.forEach((h, f) => {
    const w = c.get(h.id);
    w && (l[f] = { x: w.x, y: w.y });
  });
  const u = ri(e, r, [
    ...a.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...l.map((h) => ({ dx: h.x, dy: h.y, w: xe, h: ve }))
  ]), m = [
    { ...t, x: u.x, y: u.y, w: u.w, h: u.h, container: !0 }
  ];
  for (const h of a)
    m.push({
      id: h.a.id,
      label: h.a.name,
      kind: h.a.kind,
      symbol: "interface",
      fill: h.a.fill,
      stroke: h.a.stroke,
      badge: h.a.badge,
      container: !0,
      parentId: t.id,
      x: e.x + h.fit.x,
      y: e.y + h.fit.y,
      w: h.fit.w,
      h: h.fit.h,
      tooltip: h.a.tooltip
    }), h.ops.forEach((f, w) => {
      m.push({
        id: f.id,
        label: f.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[w].x,
        y: e.y + h.off.y + h.opOffs[w].y,
        w: xe,
        h: ve,
        tooltip: `${ai[h.a.opKind]}: ${f.name}`
      });
    });
  return s.forEach((h, f) => {
    const w = vn[h.kind];
    m.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + l[f].x,
      y: e.y + l[f].y,
      w: xe,
      h: ve,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${ai[h.kind]} ${h.name}`
    });
  }), m;
}
function ct(e, t, i, s, n) {
  const o = n[t.id] ?? di(i.length), r = i.map((m, h) => s[m.id] ?? Ot(h, o)), a = xi(
    i.map((m, h) => ({ id: m.id, x: r[h].x, y: r[h].y, w: xe, h: ve })),
    10
  );
  i.forEach((m, h) => {
    const f = a.get(m.id);
    f && (r[h] = { x: f.x, y: f.y });
  });
  const l = ri(
    e,
    o,
    r.map((m) => ({ dx: m.x, dy: m.y, w: xe, h: ve }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, u = i.map((m, h) => {
    const f = r[h], w = m.policy ? vs : vn[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: xe,
      h: ve,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : ai[m.kind]} ${m.name}`
    };
  });
  return [c, ...u];
}
function _s(e, t, i = "contexts", s = {}) {
  const n = i !== "contexts", o = i === "operations", r = new Set(e.externalSystems.map((d) => d.id)), a = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && r.has(d.publishedByExternalSystemId)
  ), l = new Set(a.map((d) => d.id)), c = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && r.has(d.publishedByExternalSystemId)
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
  ], h = m.flatMap((d, C) => {
    const F = t[d.ref.id] ?? ot(C, m.length);
    if ("workflow" in d && d.workflow) {
      const X = d.ref;
      return [{
        id: X.id,
        label: X.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${X.name} — workflow${X.triggerEvent ? ` · arranca con ${X.triggerEvent}` : ""}`,
        x: F.x,
        y: F.y,
        w: Ye,
        h: Xe
      }];
    }
    if (d.proxy) {
      const X = d.ref, fe = {
        id: X.id,
        label: X.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${X.name} — proxy/cache de una API, consumible como ella`
      };
      if (o && X.targetApiId) {
        const pe = (e.apis ?? []).find((be) => be.id === X.targetApiId), Ne = (pe == null ? void 0 : pe.operations) ?? [];
        if (Ne.length > 0)
          return ct(
            F,
            fe,
            Ne.map((be) => ({
              id: Le(be.id, X.id),
              name: be.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...fe, x: F.x, y: F.y, w: Ye, h: Xe }];
    }
    if (d.api) {
      const X = d.ref, fe = {
        id: X.id,
        label: X.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${X.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return n && X.operations.length > 0 ? ct(
        F,
        fe,
        X.operations.map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{ ...fe, x: F.x, y: F.y, w: Ye, h: Xe }];
    }
    if (d.external) {
      const X = d.ref, fe = {
        id: X.id,
        label: X.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${X.name} (sistema externo)`
      }, pe = a.filter((ee) => ee.publishedByExternalSystemId === X.id), Ne = c.filter((ee) => ee.publishedByExternalSystemId === X.id), be = [
        ...Ne.map((ee) => ({ id: ee.id, name: ee.name, kind: "proxy-api" })),
        ...n ? [
          ...(X.useCases ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "external-use-case" })
          ),
          ...(X.tables ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "external-table" })
          ),
          ...(X.mcpServers ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "mcp-server" })
          )
        ] : []
      ], se = o ? Ne.filter((ee) => {
        const nt = ee.targetApiId ? (e.apis ?? []).find((re) => re.id === ee.targetApiId) : void 0;
        return ((nt == null ? void 0 : nt.operations) ?? []).length > 0;
      }) : [];
      if (o && (pe.length > 0 || se.length > 0)) {
        const ee = [
          ...pe.map((re) => ({
            id: re.id,
            name: re.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${re.name} — API publicada por ${X.name}`,
            opKind: "api-operation",
            ops: (re.operations ?? []).map((st) => ({ id: st.id, name: st.name }))
          })),
          ...se.map((re) => {
            const st = (e.apis ?? []).find((St) => St.id === re.targetApiId);
            return {
              id: re.id,
              name: re.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${re.name} — proxy/cache de ${st.name}`,
              opKind: "api-op-occurrence",
              ops: (st.operations ?? []).map((St) => ({
                id: Le(St.id, re.id),
                name: St.name
              }))
            };
          })
        ], nt = new Set(se.map((re) => re.id));
        return In(
          F,
          fe,
          ee,
          be.filter((re) => !nt.has(re.id)),
          t,
          s
        );
      }
      const Ti = [
        ...pe.map((ee) => ({ id: ee.id, name: ee.name, kind: "api" })),
        ...be
      ];
      return Ti.length > 0 ? ct(F, fe, Ti, t, s) : [{ ...fe, x: F.x, y: F.y, w: Ye, h: Xe }];
    }
    const j = d.ref, Q = j.subdomainType ?? "GENERIC", ae = {
      id: j.id,
      label: j.name,
      kind: "module",
      symbol: "component",
      fill: hs[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${j.name} — subdominio ${Q}`
    };
    if (n) return Is(e, j, F, ae, t, s, o);
    const $e = fn(e, j.id);
    return $e.length > 0 ? ct(F, ae, $e, t, s) : [{ ...ae, x: F.x, y: F.y, w: Ye, h: Xe }];
  }), f = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, C) => {
    const F = t[d.id] ?? ot(m.length + C, f);
    h.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
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
    const F = t[d.id] ?? ot(m.length + (e.actors ?? []).length + C, f);
    h.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
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
    const F = t[d.id] ?? ot(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + C,
      f
    );
    h.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
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
  (e.rags ?? []).forEach((d, C) => {
    const F = t[d.id] ?? ot(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + C,
      f
    );
    h.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((j, Q) => {
      const ae = `ragcs:${d.id}:${j.uri}`, $e = t[ae] ?? { x: F.x + 170, y: F.y - 30 + Q * 44 };
      h.push({
        id: ae,
        label: j.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: $e.x,
        y: $e.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: j.type,
        tooltip: `${j.type}: ${j.uri}`
      }), w.push({
        id: `ragcse:${d.id}:${j.uri}`,
        sourceId: ae,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), h.sort((d, C) => (d.parentId ? 1 : 0) - (C.parentId ? 1 : 0));
  const I = e.relations.map((d) => ({
    id: ws(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? ms[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), N = e.flows.map((d) => {
    var $e, X, fe, pe, Ne, be;
    const C = xs(e, d), F = n ? e.modules.find((se) => se.id === d.sourceId) : void 0, j = (($e = F == null ? void 0 : F.domainEvents) == null ? void 0 : $e.find((se) => se.name === d.triggerEvent)) ?? ((X = F == null ? void 0 : F.applicationEvents) == null ? void 0 : X.find((se) => se.name === d.triggerEvent)), Q = n && d.readModelName ? (pe = (fe = e.modules.find((se) => se.id === d.targetId)) == null ? void 0 : fe.readModels) == null ? void 0 : pe.find((se) => se.name === d.readModelName) : void 0, ae = n && d.targetUseCaseId ? (be = (Ne = e.modules.find((se) => se.id === d.targetId)) == null ? void 0 : Ne.useCases) == null ? void 0 : be.find((se) => se.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (j == null ? void 0 : j.id) ?? d.sourceId,
      targetId: (ae == null ? void 0 : ae.id) ?? (Q == null ? void 0 : Q.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: fs[C],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${C}`
    };
  }), v = new Map((e.apis ?? []).map((d) => [d.id, d])), O = new Set(e.modules.map((d) => d.id)), q = (e.apiImplementations ?? []).filter(
    (d) => v.has(d.apiId) && O.has(d.moduleId)
  ), $ = new Set(h.map((d) => d.id)), x = n ? (e.emissions ?? []).filter((d) => $.has(d.sourceId) && $.has(d.domainEventId)).map((d) => ({
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
      const F = n && C.targetUseCaseId && $.has(C.targetUseCaseId) ? C.targetUseCaseId : C.targetModuleId && $.has(C.targetModuleId) ? C.targetModuleId : (C.targetUseCaseId && !n, null);
      if (!F) return [];
      const j = n && $.has(C.id) ? C.id : d.id;
      return $.has(j) ? [
        {
          id: `apiwire:${C.id}`,
          sourceId: j,
          targetId: F,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${C.name} la implementa ${F}`
        }
      ] : [];
    })
  ), P = n ? (e.useCaseCalls ?? []).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], L = n ? (e.queryCalls ?? []).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], M = n ? (e.actorUses ?? []).filter((d) => $.has(d.actorId) && $.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], R = (e.actorExternalDependencies ?? []).filter((d) => $.has(d.actorId) && $.has(d.externalSystemId)).map((d) => ({
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
  ]), Y = (d) => $.has(d) ? d : B.get(d) ?? d, p = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: Y(d.targetId),
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
  ], y = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const C of d.useCases ?? []) y.set(C.id, d.id);
    for (const C of d.domainEvents ?? []) y.set(C.id, d.id);
    for (const C of d.applicationEvents ?? []) y.set(C.id, d.id);
  }
  const g = (d) => $.has(d) ? d : y.get(d) ?? d, _ = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const C of d.domainEvents ?? []) _.set(C.name, C.id);
    for (const C of d.applicationEvents ?? []) _.set(C.name, C.id);
  }
  const S = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((C) => C.targetUseCaseId).map((C) => ({ sourceId: d.id, targetId: g(C.targetUseCaseId) }))
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
      (e.workflows ?? []).filter((d) => d.triggerEvent && _.has(d.triggerEvent)).map((d) => ({
        sourceId: g(_.get(d.triggerEvent)),
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
  const D = [
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
  ], W = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((C) => ({
          sourceId: Y(C),
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
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: Y(d.apiId) })).filter((d) => $.has(d.sourceId) && $.has(d.targetId)).map((d) => [
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
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: Y(d.id), targetId: Y(d.targetApiId) })).filter(
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
  ], ce = q.flatMap((d) => {
    const C = ze(d.apiId, d.moduleId);
    if (!$.has(C)) return [];
    const F = [];
    for (const j of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === d.apiId)) {
      const Q = Y(j.id);
      $.has(Q) && Q !== C && F.push({
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
    return F;
  }), ye = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const C = (e.proxyApis ?? []).find((Q) => Q.id === d.proxyId);
    if (!(C != null && C.targetApiId)) return [];
    const F = Le(d.operationId, d.proxyId), j = d.targetSiteId === C.targetApiId ? C.targetApiId : ze(C.targetApiId, d.targetSiteId);
    return !$.has(F) || !$.has(j) ? [] : [{
      id: `oproute:${F}->${j}`,
      sourceId: F,
      targetId: j,
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
        const F = d.siteId === C.id, j = F ? d.operationId : Le(d.operationId, d.siteId);
        let Q = $.has(j) ? j : null;
        return Q || (F || (e.proxyApis ?? []).some((ae) => ae.id === d.siteId) ? Q = Y(d.siteId) : Q = ze(C.id, d.siteId)), !Q || !$.has(Q) || Q === d.externalSystemId ? null : { u: d, target: Q };
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
  ], we = n ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!$.has(d.useCaseId)) return [];
    const C = $.has(Le(d.operationId, d.moduleId)) ? Le(d.operationId, d.moduleId) : $.has(ze(d.apiId, d.moduleId)) ? ze(d.apiId, d.moduleId) : $.has(Y(d.moduleId)) ? Y(d.moduleId) : null;
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
  })), os = n ? (e.agentApiOpUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], rs = n ? (e.agentQueryUses ?? []).filter((d) => $.has(d.agentId) && $.has(d.queryServiceId)).map((d) => ({
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
    nodes: h,
    edges: [
      ...I,
      ...N,
      ...x,
      ...b,
      ...k,
      ...P,
      ...L,
      ...M,
      ...R,
      ...p,
      ...J,
      ...ce,
      ...ye,
      ...ue,
      ...we,
      ...S,
      ...A,
      ...Z,
      ...D,
      ...W,
      ...it,
      ...ts,
      ...is,
      ...ns,
      ...ss,
      ...os,
      ...rs,
      ...as,
      ...ds,
      ...ls,
      ...Jn,
      ...es,
      ...w,
      ...cs,
      ...us
    ]
  };
}
const $s = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, bs = 176, ks = 60, Es = 140, Ss = 40;
function As(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const r = 220 + o * 340;
    i.filter((l) => l.moduleId === n.id).forEach((l, c) => {
      const u = s.filter((h) => h.aggregateId === l.id).length, m = 140 + c * (170 + u * 60);
      t[l.id] = { x: r, y: m }, s.filter((h) => h.aggregateId === l.id).forEach((h, f) => {
        t[h.id] = { x: r + 60, y: m + 100 + f * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Cs(e, t) {
  const i = As(e), s = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const u = n.get(c.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", h = s(c.id);
    return {
      id: c.id,
      label: c.name,
      x: h.x,
      y: h.y,
      w: bs,
      h: ks,
      kind: "aggregate",
      symbol: "aggregate",
      fill: $s[m],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${u ? ` — módulo ${u.name} (${m})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const u = s(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
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
const Ms = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ps = 150, Ns = 44, Ts = 190, Os = 56, Rs = 160, Us = 48;
function Ds(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function Ls(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((u) => u.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, l) => {
    const c = 120 + l * 130, u = Ms[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const N = t[m] ?? { x: 160, y: c };
      s.push({
        id: m,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : m,
        x: N.x,
        y: N.y,
        w: Ps,
        h: Ns,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const h = `flow:${a.id}`, f = t[h] ?? { x: 470, y: c };
    s.push({
      id: h,
      label: a.name,
      x: f.x,
      y: f.y,
      w: Ts,
      h: Os,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const w = Ds(e, a), I = `tgt:${w.id}`;
    if (!o.has(I)) {
      o.add(I);
      const N = t[I] ?? { x: 790, y: c };
      s.push({
        id: I,
        label: w.label,
        x: N.x,
        y: N.y,
        w: Rs,
        h: Us,
        kind: w.external ? "external-system" : "module",
        symbol: "component",
        fill: w.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: w.external,
        badge: w.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${a.id}:in`,
      sourceId: m,
      targetId: h,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${a.id}:out`,
      sourceId: h,
      targetId: I,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const zs = 190, qs = 56, Zt = 170, Fs = 52;
function Oi(e, t) {
  const i = [], s = [], n = (o) => {
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
      w: zs,
      h: qs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((u, m) => {
      const h = u.type === "HUMAN", f = t[u.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: u.id,
        label: u.name,
        x: f.x,
        y: f.y,
        w: Zt,
        h: Fs,
        kind: "process-step",
        symbol: h ? "person" : "gear",
        fill: h ? "#fef3c7" : "#ffffff",
        stroke: h ? "#d97706" : "#64748b",
        badge: h ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
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
      const u = `done:${o.id}`, m = t[u] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
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
const Rt = globalThis, vi = Rt.ShadowRoot && (Rt.ShadyCSS === void 0 || Rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ii = Symbol(), Ri = /* @__PURE__ */ new WeakMap();
let _n = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Ii) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (vi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Ri.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ri.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vs = (e) => new _n(typeof e == "string" ? e : e + "", void 0, Ii), _i = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new _n(i, e, Ii);
}, Hs = (e, t) => {
  if (vi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = Rt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Ui = vi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Vs(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ks, defineProperty: Gs, getOwnPropertyDescriptor: Ws, getOwnPropertyNames: Bs, getOwnPropertySymbols: Ys, getPrototypeOf: Xs } = Object, Re = globalThis, Di = Re.trustedTypes, js = Di ? Di.emptyScript : "", Jt = Re.reactiveElementPolyfillSupport, ht = (e, t) => e, qt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? js : null;
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
} }, $i = (e, t) => !Ks(e, t), Li = { attribute: !0, type: String, converter: qt, reflect: !1, useDefault: !1, hasChanged: $i };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Re.litPropertyMetadata ?? (Re.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let je = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Li) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Gs(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = Ws(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const a = n == null ? void 0 : n.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Li;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ht("elementProperties"))) return;
    const t = Xs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ht("properties"))) {
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
    return Hs(t, this.constructor.elementStyles), t;
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
      const r = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : qt).toAttribute(i, s.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = s.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : qt;
      this._$Em = n;
      const c = l.fromAttribute(i, a.type);
      this[n] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? $i)(o, i) || s.useDefault && s.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: a } = r, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
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
je.elementStyles = [], je.shadowRootOptions = { mode: "open" }, je[ht("elementProperties")] = /* @__PURE__ */ new Map(), je[ht("finalized")] = /* @__PURE__ */ new Map(), Jt == null || Jt({ ReactiveElement: je }), (Re.reactiveElementVersions ?? (Re.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, zi = (e) => e, Ft = mt.trustedTypes, qi = Ft ? Ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $n = "$lit$", Oe = `lit$${Math.random().toFixed(9).slice(2)}$`, bn = "?" + Oe, Qs = `<${bn}>`, Ge = document, yt = () => Ge.createComment(""), wt = (e) => e === null || typeof e != "object" && typeof e != "function", bi = Array.isArray, Zs = (e) => bi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ei = `[ 	
\f\r]`, rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fi = /-->/g, Vi = />/g, Ue = RegExp(`>|${ei}(?:([^\\s"'>=/]+)(${ei}*=${ei}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Hi = /'/g, Ki = /"/g, kn = /^(?:script|style|textarea|title)$/i, En = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), T = En(1), G = En(2), Ze = Symbol.for("lit-noChange"), ne = Symbol.for("lit-nothing"), Gi = /* @__PURE__ */ new WeakMap(), qe = Ge.createTreeWalker(Ge, 129);
function Sn(e, t) {
  if (!bi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qi !== void 0 ? qi.createHTML(t) : t;
}
const Js = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = rt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, u, m = -1, h = 0;
    for (; h < l.length && (r.lastIndex = h, u = r.exec(l), u !== null); ) h = r.lastIndex, r === rt ? u[1] === "!--" ? r = Fi : u[1] !== void 0 ? r = Vi : u[2] !== void 0 ? (kn.test(u[2]) && (n = RegExp("</" + u[2], "g")), r = Ue) : u[3] !== void 0 && (r = Ue) : r === Ue ? u[0] === ">" ? (r = n ?? rt, m = -1) : u[1] === void 0 ? m = -2 : (m = r.lastIndex - u[2].length, c = u[1], r = u[3] === void 0 ? Ue : u[3] === '"' ? Ki : Hi) : r === Ki || r === Hi ? r = Ue : r === Fi || r === Vi ? r = rt : (r = Ue, n = void 0);
    const f = r === Ue && e[a + 1].startsWith("/>") ? " " : "";
    o += r === rt ? l + Qs : m >= 0 ? (s.push(c), l.slice(0, m) + $n + l.slice(m) + Oe + f) : l + Oe + (m === -2 ? a : f);
  }
  return [Sn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class xt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, u] = Js(t, i);
    if (this.el = xt.createElement(c, s), qe.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (n = qe.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const m of n.getAttributeNames()) if (m.endsWith($n)) {
          const h = u[r++], f = n.getAttribute(m).split(Oe), w = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: w[2], strings: f, ctor: w[1] === "." ? to : w[1] === "?" ? io : w[1] === "@" ? no : Yt }), n.removeAttribute(m);
        } else m.startsWith(Oe) && (l.push({ type: 6, index: o }), n.removeAttribute(m));
        if (kn.test(n.tagName)) {
          const m = n.textContent.split(Oe), h = m.length - 1;
          if (h > 0) {
            n.textContent = Ft ? Ft.emptyScript : "";
            for (let f = 0; f < h; f++) n.append(m[f], yt()), qe.nextNode(), l.push({ type: 2, index: ++o });
            n.append(m[h], yt());
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
  var r, a;
  if (t === Ze) return t;
  let n = s !== void 0 ? (r = i._$Co) == null ? void 0 : r[s] : i._$Cl;
  const o = wt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = Je(e, n._$AS(e, t.values), n, s)), t;
}
class eo {
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
    let o = qe.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new bt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new so(o, this, t)), this._$AV.push(c), l = s[++a];
      }
      r !== (l == null ? void 0 : l.index) && (o = qe.nextNode(), r++);
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
    t = Je(this, t, i), wt(t) ? t === ne || t == null || t === "" ? (this._$AH !== ne && this._$AR(), this._$AH = ne) : t !== this._$AH && t !== Ze && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zs(t) ? this.k(t) : this._(t);
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
      const r = new eo(n, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
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
    let r = !1;
    if (o === void 0) t = Je(this, t, i, 0), r = !wt(t) || t !== this._$AH && t !== Ze, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = Je(this, a[s + l], i, l), c === Ze && (c = this._$AH[l]), r || (r = !wt(c) || c !== this._$AH[l]), c === ne ? t = ne : t !== ne && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === ne ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class to extends Yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ne ? void 0 : t;
  }
}
class io extends Yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ne);
  }
}
class no extends Yt {
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
class so {
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
const oo = (e, t, i) => {
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
class He extends je {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oo(i, this.renderRoot, this.renderOptions);
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
const ro = { attribute: !0, type: String, converter: qt, reflect: !1, hasChanged: $i }, ao = (e = ro, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Se(e) {
  return (t, i) => typeof i == "object" ? ao(e, t, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
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
function Xt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Wi.hasOwnProperty(t) ? { space: Wi[t], local: e } : e;
}
function lo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === li && t.documentElement.namespaceURI === li ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function co(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function An(e) {
  var t = Xt(e);
  return (t.local ? co : lo)(t);
}
function uo() {
}
function Ei(e) {
  return e == null ? uo : function() {
    return this.querySelector(e);
  };
}
function po(e) {
  typeof e != "function" && (e = Ei(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], r = o.length, a = s[n] = new Array(r), l, c, u = 0; u < r; ++u)
      (l = o[u]) && (c = e.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[u] = c);
  return new me(s, this._parents);
}
function ho(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function mo() {
  return [];
}
function Cn(e) {
  return e == null ? mo : function() {
    return this.querySelectorAll(e);
  };
}
function fo(e) {
  return function() {
    return ho(e.apply(this, arguments));
  };
}
function go(e) {
  typeof e == "function" ? e = fo(e) : e = Cn(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && (s.push(e.call(l, l.__data__, c, r)), n.push(l));
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
var yo = Array.prototype.find;
function wo(e) {
  return function() {
    return yo.call(this.children, e);
  };
}
function xo() {
  return this.firstElementChild;
}
function vo(e) {
  return this.select(e == null ? xo : wo(typeof e == "function" ? e : Pn(e)));
}
var Io = Array.prototype.filter;
function _o() {
  return Array.from(this.children);
}
function $o(e) {
  return function() {
    return Io.call(this.children, e);
  };
}
function bo(e) {
  return this.selectAll(e == null ? _o : $o(typeof e == "function" ? e : Pn(e)));
}
function ko(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], r = o.length, a = s[n] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new me(s, this._parents);
}
function Nn(e) {
  return new Array(e.length);
}
function Eo() {
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
function So(e) {
  return function() {
    return e;
  };
}
function Ao(e, t, i, s, n, o) {
  for (var r = 0, a, l = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], s[r] = a) : i[r] = new Vt(e, o[r]);
  for (; r < l; ++r)
    (a = t[r]) && (n[r] = a);
}
function Co(e, t, i, s, n, o, r) {
  var a, l, c = /* @__PURE__ */ new Map(), u = t.length, m = o.length, h = new Array(u), f;
  for (a = 0; a < u; ++a)
    (l = t[a]) && (h[a] = f = r.call(l, l.__data__, a, t) + "", c.has(f) ? n[a] = l : c.set(f, l));
  for (a = 0; a < m; ++a)
    f = r.call(e, o[a], a, o) + "", (l = c.get(f)) ? (s[a] = l, l.__data__ = o[a], c.delete(f)) : i[a] = new Vt(e, o[a]);
  for (a = 0; a < u; ++a)
    (l = t[a]) && c.get(h[a]) === l && (n[a] = l);
}
function Mo(e) {
  return e.__data__;
}
function Po(e, t) {
  if (!arguments.length) return Array.from(this, Mo);
  var i = t ? Co : Ao, s = this._parents, n = this._groups;
  typeof e != "function" && (e = So(e));
  for (var o = n.length, r = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = s[c], m = n[c], h = m.length, f = No(e.call(u, u && u.__data__, c, s)), w = f.length, I = a[c] = new Array(w), N = r[c] = new Array(w), v = l[c] = new Array(h);
    i(u, m, I, N, v, f, t);
    for (var O = 0, q = 0, $, x; O < w; ++O)
      if ($ = I[O]) {
        for (O >= q && (q = O + 1); !(x = N[q]) && ++q < w; ) ;
        $._next = x || null;
      }
  }
  return r = new me(r, s), r._enter = a, r._exit = l, r;
}
function No(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function To() {
  return new me(this._exit || this._groups.map(Nn), this._parents);
}
function Oo(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function Ro(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, r = Math.min(n, o), a = new Array(n), l = 0; l < r; ++l)
    for (var c = i[l], u = s[l], m = c.length, h = a[l] = new Array(m), f, w = 0; w < m; ++w)
      (f = c[w] || u[w]) && (h[w] = f);
  for (; l < n; ++l)
    a[l] = i[l];
  return new me(a, this._parents);
}
function Uo() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], r; --n >= 0; )
      (r = s[n]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function Do(e) {
  e || (e = Lo);
  function t(m, h) {
    return m && h ? e(m.__data__, h.__data__) : !m - !h;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var r = i[o], a = r.length, l = n[o] = new Array(a), c, u = 0; u < a; ++u)
      (c = r[u]) && (l[u] = c);
    l.sort(t);
  }
  return new me(n, this._parents).order();
}
function Lo(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function zo() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function qo() {
  return Array.from(this);
}
function Fo() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var r = s[n];
      if (r) return r;
    }
  return null;
}
function Vo() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Ho() {
  return !this.node();
}
function Ko(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, r = n.length, a; o < r; ++o)
      (a = n[o]) && e.call(a, a.__data__, o, n);
  return this;
}
function Go(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Wo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Bo(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Yo(e, t) {
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
function jo(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Qo(e, t) {
  var i = Xt(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Wo : Go : typeof t == "function" ? i.local ? jo : Xo : i.local ? Yo : Bo)(i, t));
}
function Tn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Zo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Jo(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function er(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function tr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Zo : typeof t == "function" ? er : Jo)(e, t, i ?? "")) : et(this.node(), e);
}
function et(e, t) {
  return e.style.getPropertyValue(t) || Tn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function ir(e) {
  return function() {
    delete this[e];
  };
}
function nr(e, t) {
  return function() {
    this[e] = t;
  };
}
function sr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function or(e, t) {
  return arguments.length > 1 ? this.each((t == null ? ir : typeof t == "function" ? sr : nr)(e, t)) : this.node()[e];
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
function rr(e) {
  return function() {
    Un(this, e);
  };
}
function ar(e) {
  return function() {
    Dn(this, e);
  };
}
function dr(e, t) {
  return function() {
    (t.apply(this, arguments) ? Un : Dn)(this, e);
  };
}
function lr(e, t) {
  var i = On(e + "");
  if (arguments.length < 2) {
    for (var s = Si(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? dr : t ? rr : ar)(i, t));
}
function cr() {
  this.textContent = "";
}
function ur(e) {
  return function() {
    this.textContent = e;
  };
}
function pr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function hr(e) {
  return arguments.length ? this.each(e == null ? cr : (typeof e == "function" ? pr : ur)(e)) : this.node().textContent;
}
function mr() {
  this.innerHTML = "";
}
function fr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function gr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function yr(e) {
  return arguments.length ? this.each(e == null ? mr : (typeof e == "function" ? gr : fr)(e)) : this.node().innerHTML;
}
function wr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function xr() {
  return this.each(wr);
}
function vr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ir() {
  return this.each(vr);
}
function _r(e) {
  var t = typeof e == "function" ? e : An(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function $r() {
  return null;
}
function br(e, t) {
  var i = typeof e == "function" ? e : An(e), s = t == null ? $r : typeof t == "function" ? t : Ei(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function kr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Er() {
  return this.each(kr);
}
function Sr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ar() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Cr(e) {
  return this.select(e ? Ar : Sr);
}
function Mr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Pr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Nr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function Tr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Or(e, t, i) {
  return function() {
    var s = this.__on, n, o = Pr(t);
    if (s) {
      for (var r = 0, a = s.length; r < a; ++r)
        if ((n = s[r]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), n = { type: e.type, name: e.name, value: t, listener: o, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function Rr(e, t, i) {
  var s = Nr(e + ""), n, o = s.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, u; l < c; ++l)
        for (n = 0, u = a[l]; n < o; ++n)
          if ((r = s[n]).type === u.type && r.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = t ? Or : Tr, n = 0; n < o; ++n) this.each(a(s[n], t, i));
  return this;
}
function Ln(e, t, i) {
  var s = Tn(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function Ur(e, t) {
  return function() {
    return Ln(this, e, t);
  };
}
function Dr(e, t) {
  return function() {
    return Ln(this, e, t.apply(this, arguments));
  };
}
function Lr(e, t) {
  return this.each((typeof t == "function" ? Dr : Ur)(e, t));
}
function* zr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, r; n < o; ++n)
      (r = s[n]) && (yield r);
}
var zn = [null];
function me(e, t) {
  this._groups = e, this._parents = t;
}
function kt() {
  return new me([[document.documentElement]], zn);
}
function qr() {
  return this;
}
me.prototype = kt.prototype = {
  constructor: me,
  select: po,
  selectAll: go,
  selectChild: vo,
  selectChildren: bo,
  filter: ko,
  data: Po,
  enter: Eo,
  exit: To,
  join: Oo,
  merge: Ro,
  selection: qr,
  order: Uo,
  sort: Do,
  call: zo,
  nodes: qo,
  node: Fo,
  size: Vo,
  empty: Ho,
  each: Ko,
  attr: Qo,
  style: tr,
  property: or,
  classed: lr,
  text: hr,
  html: yr,
  raise: xr,
  lower: Ir,
  append: _r,
  insert: br,
  remove: Er,
  clone: Cr,
  datum: Mr,
  on: Rr,
  dispatch: Lr,
  [Symbol.iterator]: zr
};
function ke(e) {
  return typeof e == "string" ? new me([[document.querySelector(e)]], [document.documentElement]) : new me([[e]], zn);
}
function Fr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function De(e, t) {
  if (e = Fr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Vr = { value: () => {
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
function Hr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
Ut.prototype = Ai.prototype = {
  constructor: Ut,
  on: function(e, t) {
    var i = this._, s = Hr(e + "", i), n, o = -1, r = s.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((n = (e = s[o]).type) && (n = Kr(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
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
function Kr(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function Bi(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = Vr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const ci = { capture: !0, passive: !1 };
function ui(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Gr(e) {
  var t = e.document.documentElement, i = ke(e).on("dragstart.drag", ui, ci);
  "onselectstart" in t ? i.on("selectstart.drag", ui, ci) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Wr(e, t) {
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
var vt = 0.7, Ht = 1 / vt, Qe = "\\s*([+-]?\\d+)\\s*", It = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Br = /^#([0-9a-f]{3,8})$/, Yr = new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`), Xr = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), jr = new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${It}\\)$`), Qr = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${It}\\)$`), Zr = new RegExp(`^hsl\\(${It},${Ee},${Ee}\\)$`), Jr = new RegExp(`^hsla\\(${It},${Ee},${Ee},${It}\\)$`), Yi = {
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
  hex: Xi,
  // Deprecated! Use color.formatHex.
  formatHex: Xi,
  formatHex8: ea,
  formatHsl: ta,
  formatRgb: ji,
  toString: ji
});
function Xi() {
  return this.rgb().formatHex();
}
function ea() {
  return this.rgb().formatHex8();
}
function ta() {
  return Fn(this).formatHsl();
}
function ji() {
  return this.rgb().formatRgb();
}
function _t(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Br.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Qi(t) : i === 3 ? new de(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Ct(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Ct(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Yr.exec(e)) ? new de(t[1], t[2], t[3], 1) : (t = Xr.exec(e)) ? new de(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = jr.exec(e)) ? Ct(t[1], t[2], t[3], t[4]) : (t = Qr.exec(e)) ? Ct(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Zr.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, 1) : (t = Jr.exec(e)) ? en(t[1], t[2] / 100, t[3] / 100, t[4]) : Yi.hasOwnProperty(e) ? Qi(Yi[e]) : e === "transparent" ? new de(NaN, NaN, NaN, 0) : null;
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
function pi(e, t, i, s) {
  return arguments.length === 1 ? ia(e) : new de(e, t, i, s ?? 1);
}
function de(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
Ci(de, pi, qn(Et, {
  brighter(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? vt : Math.pow(vt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
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
  formatHex8: na,
  formatRgb: Ji,
  toString: Ji
}));
function Zi() {
  return `#${Fe(this.r)}${Fe(this.g)}${Fe(this.b)}`;
}
function na() {
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
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ie(e, t, i, s);
}
function Fn(e) {
  if (e instanceof Ie) return new Ie(e.h, e.s, e.l, e.opacity);
  if (e instanceof Et || (e = _t(e)), !e) return new Ie();
  if (e instanceof Ie) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), r = NaN, a = o - n, l = (o + n) / 2;
  return a ? (t === o ? r = (i - s) / a + (i < s) * 6 : i === o ? r = (s - t) / a + 2 : r = (t - i) / a + 4, a /= l < 0.5 ? o + n : 2 - o - n, r *= 60) : a = l > 0 && l < 1 ? 0 : r, new Ie(r, a, l, e.opacity);
}
function sa(e, t, i, s) {
  return arguments.length === 1 ? Fn(e) : new Ie(e, t, i, s ?? 1);
}
function Ie(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
Ci(Ie, sa, qn(Et, {
  brighter(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new Ie(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? vt : Math.pow(vt, e), new Ie(this.h, this.s, this.l * e, this.opacity);
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
    return new Ie(tn(this.h), Mt(this.s), Mt(this.l), Kt(this.opacity));
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
function oa(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function ra(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function aa(e) {
  return (e = +e) == 1 ? Hn : function(t, i) {
    return i - t ? ra(t, i, e) : Vn(isNaN(t) ? i : t);
  };
}
function Hn(e, t) {
  var i = t - e;
  return i ? oa(e, i) : Vn(isNaN(e) ? t : e);
}
const nn = (function e(t) {
  var i = aa(t);
  function s(n, o) {
    var r = i((n = pi(n)).r, (o = pi(o)).r), a = i(n.g, o.g), l = i(n.b, o.b), c = Hn(n.opacity, o.opacity);
    return function(u) {
      return n.r = r(u), n.g = a(u), n.b = l(u), n.opacity = c(u), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Te(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var hi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, si = new RegExp(hi.source, "g");
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
  var i = hi.lastIndex = si.lastIndex = 0, s, n, o, r = -1, a = [], l = [];
  for (e = e + "", t = t + ""; (s = hi.exec(e)) && (n = si.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (s = s[0]) === (n = n[0]) ? a[r] ? a[r] += n : a[++r] = n : (a[++r] = null, l.push({ i: r, x: Te(s, n) })), i = si.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? l[0] ? la(l[0].x) : da(t) : (t = l.length, function(c) {
    for (var u = 0, m; u < t; ++u) a[(m = l[u]).i] = m.x(c);
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
function Kn(e, t, i, s, n, o) {
  var r, a, l;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (l = e * i + t * s) && (i -= e * l, s -= t * l), (a = Math.sqrt(i * i + s * s)) && (i /= a, s /= a, l /= a), e * s < t * i && (e = -e, t = -t, l = -l, r = -r), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * sn,
    skewX: Math.atan(l) * sn,
    scaleX: r,
    scaleY: a
  };
}
var Pt;
function ua(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? mi : Kn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function pa(e) {
  return e == null || (Pt || (Pt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Pt.setAttribute("transform", e), !(e = Pt.transform.baseVal.consolidate())) ? mi : (e = e.matrix, Kn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Gn(e, t, i, s) {
  function n(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, m, h, f, w) {
    if (c !== m || u !== h) {
      var I = f.push("translate(", null, t, null, i);
      w.push({ i: I - 4, x: Te(c, m) }, { i: I - 2, x: Te(u, h) });
    } else (m || h) && f.push("translate(" + m + t + h + i);
  }
  function r(c, u, m, h) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), h.push({ i: m.push(n(m) + "rotate(", null, s) - 2, x: Te(c, u) })) : u && m.push(n(m) + "rotate(" + u + s);
  }
  function a(c, u, m, h) {
    c !== u ? h.push({ i: m.push(n(m) + "skewX(", null, s) - 2, x: Te(c, u) }) : u && m.push(n(m) + "skewX(" + u + s);
  }
  function l(c, u, m, h, f, w) {
    if (c !== m || u !== h) {
      var I = f.push(n(f) + "scale(", null, ",", null, ")");
      w.push({ i: I - 4, x: Te(c, m) }, { i: I - 2, x: Te(u, h) });
    } else (m !== 1 || h !== 1) && f.push(n(f) + "scale(" + m + "," + h + ")");
  }
  return function(c, u) {
    var m = [], h = [];
    return c = e(c), u = e(u), o(c.translateX, c.translateY, u.translateX, u.translateY, m, h), r(c.rotate, u.rotate, m, h), a(c.skewX, u.skewX, m, h), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, m, h), c = u = null, function(f) {
      for (var w = -1, I = h.length, N; ++w < I; ) m[(N = h[w]).i] = N.x(f);
      return m.join("");
    };
  };
}
var ha = Gn(ua, "px, ", "px)", "deg)"), ma = Gn(pa, ", ", ")", ")"), fa = 1e-12;
function on(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ga(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function ya(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const wa = (function e(t, i, s) {
  function n(o, r) {
    var a = o[0], l = o[1], c = o[2], u = r[0], m = r[1], h = r[2], f = u - a, w = m - l, I = f * f + w * w, N, v;
    if (I < fa)
      v = Math.log(h / c) / t, N = function(k) {
        return [
          a + k * f,
          l + k * w,
          c * Math.exp(t * k * v)
        ];
      };
    else {
      var O = Math.sqrt(I), q = (h * h - c * c + s * I) / (2 * c * i * O), $ = (h * h - c * c - s * I) / (2 * h * i * O), x = Math.log(Math.sqrt(q * q + 1) - q), b = Math.log(Math.sqrt($ * $ + 1) - $);
      v = (b - x) / t, N = function(k) {
        var P = k * v, L = on(x), M = c / (i * O) * (L * ya(t * P + x) - ga(x));
        return [
          a + M * f,
          l + M * w,
          c * L / on(t * P + x)
        ];
      };
    }
    return N.duration = v * 1e3 * t / Math.SQRT2, N;
  }
  return n.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, l = a * a;
    return e(r, a, l);
  }, n;
})(Math.SQRT2, 2, 4);
var tt = 0, ut = 0, at = 0, Wn = 1e3, Gt, pt, Wt = 0, We = 0, jt = 0, $t = typeof performance == "object" && performance.now ? performance : Date, Bn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Mi() {
  return We || (Bn(xa), We = $t.now() + jt);
}
function xa() {
  We = 0;
}
function Bt() {
  this._call = this._time = this._next = null;
}
Bt.prototype = Yn.prototype = {
  constructor: Bt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Mi() : +i) + (t == null ? 0 : +t), !this._next && pt !== this && (pt ? pt._next = this : Gt = this, pt = this), this._call = e, this._time = i, fi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, fi());
  }
};
function Yn(e, t, i) {
  var s = new Bt();
  return s.restart(e, t, i), s;
}
function va() {
  Mi(), ++tt;
  for (var e = Gt, t; e; )
    (t = We - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --tt;
}
function rn() {
  We = (Wt = $t.now()) + jt, tt = ut = 0;
  try {
    va();
  } finally {
    tt = 0, _a(), We = 0;
  }
}
function Ia() {
  var e = $t.now(), t = e - Wt;
  t > Wn && (jt -= t, Wt = e);
}
function _a() {
  for (var e, t = Gt, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Gt = i);
  pt = e, fi(s);
}
function fi(e) {
  if (!tt) {
    ut && (ut = clearTimeout(ut));
    var t = e - We;
    t > 24 ? (e < 1 / 0 && (ut = setTimeout(rn, e - $t.now() - jt)), at && (at = clearInterval(at))) : (at || (Wt = $t.now(), at = setInterval(Ia, Wn)), tt = 1, Bn(rn));
  }
}
function an(e, t, i) {
  var s = new Bt();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var $a = Ai("start", "end", "cancel", "interrupt"), ba = [], Xn = 0, dn = 1, gi = 2, Dt = 3, ln = 4, yi = 5, Lt = 6;
function Qt(e, t, i, s, n, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  ka(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: $a,
    tween: ba,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Xn
  });
}
function Pi(e, t) {
  var i = _e(e, t);
  if (i.state > Xn) throw new Error("too late; already scheduled");
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
function ka(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Yn(o, 0, i.time);
  function o(c) {
    i.state = dn, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var u, m, h, f;
    if (i.state !== dn) return l();
    for (u in s)
      if (f = s[u], f.name === i.name) {
        if (f.state === Dt) return an(r);
        f.state === ln ? (f.state = Lt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete s[u]) : +u < t && (f.state = Lt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete s[u]);
      }
    if (an(function() {
      i.state === Dt && (i.state = ln, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = gi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === gi) {
      for (i.state = Dt, n = new Array(h = i.tween.length), u = 0, m = -1; u < h; ++u)
        (f = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (n[++m] = f);
      n.length = m + 1;
    }
  }
  function a(c) {
    for (var u = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = yi, 1), m = -1, h = n.length; ++m < h; )
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
  var i = e.__transition, s, n, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((s = i[r]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > gi && s.state < yi, s.state = Lt, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[r];
    }
    o && delete e.__transition;
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
    var n = Ae(this, e), o = n.tween;
    if (o !== i) {
      s = i = o;
      for (var r = 0, a = s.length; r < a; ++r)
        if (s[r].name === t) {
          s = s.slice(), s.splice(r, 1);
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
    var o = Ae(this, e), r = o.tween;
    if (r !== s) {
      n = (s = r).slice();
      for (var a = { name: t, value: i }, l = 0, c = n.length; l < c; ++l)
        if (n[l].name === t) {
          n[l] = a;
          break;
        }
      l === c && n.push(a);
    }
    o.tween = n;
  };
}
function Ca(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = _e(this.node(), i).tween, n = 0, o = s.length, r; n < o; ++n)
      if ((r = s[n]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Sa : Aa)(i, e, t));
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
function jn(e, t) {
  var i;
  return (typeof t == "number" ? Te : t instanceof _t ? nn : (i = _t(t)) ? (t = i, nn) : ca)(e, t);
}
function Ma(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Pa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Na(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === n ? null : r === s ? o : o = t(s = r, i);
  };
}
function Ta(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === n ? null : r === s ? o : o = t(s = r, i);
  };
}
function Oa(e, t, i) {
  var s, n, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), l = a + "", r === l ? null : r === s && l === n ? o : (n = l, o = t(s = r, a)));
  };
}
function Ra(e, t, i) {
  var s, n, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), l = a + "", r === l ? null : r === s && l === n ? o : (n = l, o = t(s = r, a)));
  };
}
function Ua(e, t) {
  var i = Xt(e), s = i === "transform" ? ma : jn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Ra : Oa)(i, s, Ni(this, "attr." + e, t)) : t == null ? (i.local ? Pa : Ma)(i) : (i.local ? Ta : Na)(i, s, t));
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
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && La(e, o)), i;
  }
  return n._value = t, n;
}
function qa(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && Da(e, o)), i;
  }
  return n._value = t, n;
}
function Fa(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = Xt(e);
  return this.tween(i, (s.local ? za : qa)(s, t));
}
function Va(e, t) {
  return function() {
    Pi(this, e).delay = +t.apply(this, arguments);
  };
}
function Ha(e, t) {
  return t = +t, function() {
    Pi(this, e).delay = t;
  };
}
function Ka(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Va : Ha)(t, e)) : _e(this.node(), t).delay;
}
function Ga(e, t) {
  return function() {
    Ae(this, e).duration = +t.apply(this, arguments);
  };
}
function Wa(e, t) {
  return t = +t, function() {
    Ae(this, e).duration = t;
  };
}
function Ba(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ga : Wa)(t, e)) : _e(this.node(), t).duration;
}
function Ya(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ae(this, e).ease = t;
  };
}
function Xa(e) {
  var t = this._id;
  return arguments.length ? this.each(Ya(t, e)) : _e(this.node(), t).ease;
}
function ja(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ae(this, e).ease = i;
  };
}
function Qa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ja(this._id, e));
}
function Za(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], r = o.length, a = s[n] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new Pe(s, this._parents, this._name, this._id);
}
function Ja(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), r = new Array(s), a = 0; a < o; ++a)
    for (var l = t[a], c = i[a], u = l.length, m = r[a] = new Array(u), h, f = 0; f < u; ++f)
      (h = l[f] || c[f]) && (m[f] = h);
  for (; a < s; ++a)
    r[a] = t[a];
  return new Pe(r, this._parents, this._name, this._id);
}
function ed(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function td(e, t, i) {
  var s, n, o = ed(t) ? Pi : Ae;
  return function() {
    var r = o(this, e), a = r.on;
    a !== s && (n = (s = a).copy()).on(t, i), r.on = n;
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
function od(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ei(e));
  for (var s = this._groups, n = s.length, o = new Array(n), r = 0; r < n; ++r)
    for (var a = s[r], l = a.length, c = o[r] = new Array(l), u, m, h = 0; h < l; ++h)
      (u = a[h]) && (m = e.call(u, u.__data__, h, a)) && ("__data__" in u && (m.__data__ = u.__data__), c[h] = m, Qt(c[h], t, i, h, c, _e(u, i)));
  return new Pe(o, this._parents, t, i);
}
function rd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Cn(e));
  for (var s = this._groups, n = s.length, o = [], r = [], a = 0; a < n; ++a)
    for (var l = s[a], c = l.length, u, m = 0; m < c; ++m)
      if (u = l[m]) {
        for (var h = e.call(u, u.__data__, m, l), f, w = _e(u, i), I = 0, N = h.length; I < N; ++I)
          (f = h[I]) && Qt(f, t, i, I, h, w);
        o.push(h), r.push(u);
      }
  return new Pe(o, r, t, i);
}
var ad = kt.prototype.constructor;
function dd() {
  return new ad(this._groups, this._parents);
}
function ld(e, t) {
  var i, s, n;
  return function() {
    var o = et(this, e), r = (this.style.removeProperty(e), et(this, e));
    return o === r ? null : o === i && r === s ? n : n = t(i = o, s = r);
  };
}
function Qn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function cd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var r = et(this, e);
    return r === n ? null : r === s ? o : o = t(s = r, i);
  };
}
function ud(e, t, i) {
  var s, n, o;
  return function() {
    var r = et(this, e), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(e), et(this, e))), r === l ? null : r === s && l === n ? o : (n = l, o = t(s = r, a));
  };
}
function pd(e, t) {
  var i, s, n, o = "style." + t, r = "end." + o, a;
  return function() {
    var l = Ae(this, e), c = l.on, u = l.value[o] == null ? a || (a = Qn(t)) : void 0;
    (c !== i || n !== u) && (s = (i = c).copy()).on(r, n = u), l.on = s;
  };
}
function hd(e, t, i) {
  var s = (e += "") == "transform" ? ha : jn;
  return t == null ? this.styleTween(e, ld(e, s)).on("end.style." + e, Qn(e)) : typeof t == "function" ? this.styleTween(e, ud(e, s, Ni(this, "style." + e, t))).each(pd(this._id, e)) : this.styleTween(e, cd(e, s, t), i).on("end.style." + e, null);
}
function md(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function fd(e, t, i) {
  var s, n;
  function o() {
    var r = t.apply(this, arguments);
    return r !== n && (s = (n = r) && md(e, r, i)), s;
  }
  return o._value = t, o;
}
function gd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, fd(e, t, i ?? ""));
}
function yd(e) {
  return function() {
    this.textContent = e;
  };
}
function wd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function xd(e) {
  return this.tween("text", typeof e == "function" ? wd(Ni(this, "text", e)) : yd(e == null ? "" : e + ""));
}
function vd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Id(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && vd(n)), t;
  }
  return s._value = e, s;
}
function _d(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Id(e));
}
function $d() {
  for (var e = this._name, t = this._id, i = Zn(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var r = s[o], a = r.length, l, c = 0; c < a; ++c)
      if (l = r[c]) {
        var u = _e(l, t);
        Qt(l, e, i, c, r, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Pe(s, this._parents, e, i);
}
function bd() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var c = Ae(this, s), u = c.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(l)), c.on = t;
    }), n === 0 && o();
  });
}
var kd = 0;
function Pe(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Zn() {
  return ++kd;
}
var Ce = kt.prototype;
Pe.prototype = {
  constructor: Pe,
  select: od,
  selectAll: rd,
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
  attrTween: Fa,
  style: hd,
  styleTween: gd,
  text: xd,
  textTween: _d,
  remove: sd,
  tween: Ca,
  delay: Ka,
  duration: Ba,
  ease: Xa,
  easeVarying: Qa,
  end: bd,
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
  e instanceof Pe ? (t = e._id, e = e._name) : (t = Zn(), (i = Sd).time = Mi(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var r = s[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && Qt(l, e, t, c, r, i || Ad(l, t));
  return new Pe(s, this._parents, e, t);
}
kt.prototype.interrupt = Ea;
kt.prototype.transition = Cd;
const Nt = (e) => () => e;
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
function oi(e) {
  e.stopImmediatePropagation();
}
function dt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Pd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Nd() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function cn() {
  return this.__zoom || ft;
}
function Td(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Od() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Rd(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function Ud() {
  var e = Pd, t = Nd, i = Rd, s = Td, n = Od, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = wa, c = Ai("start", "zoom", "end"), u, m, h, f = 500, w = 150, I = 0, N = 10;
  function v(p) {
    p.property("__zoom", cn).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", L).on("dblclick.zoom", M).filter(n).on("touchstart.zoom", R).on("touchmove.zoom", B).on("touchend.zoom touchcancel.zoom", Y).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(p, y, g, _) {
    var S = p.selection ? p.selection() : p;
    S.property("__zoom", cn), p !== S ? x(p, y, g, _) : S.interrupt().each(function() {
      b(this, arguments).event(_).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, v.scaleBy = function(p, y, g, _) {
    v.scaleTo(p, function() {
      var S = this.__zoom.k, A = typeof y == "function" ? y.apply(this, arguments) : y;
      return S * A;
    }, g, _);
  }, v.scaleTo = function(p, y, g, _) {
    v.transform(p, function() {
      var S = t.apply(this, arguments), A = this.__zoom, E = g == null ? $(S) : typeof g == "function" ? g.apply(this, arguments) : g, D = A.invert(E), W = typeof y == "function" ? y.apply(this, arguments) : y;
      return i(q(O(A, W), E, D), S, r);
    }, g, _);
  }, v.translateBy = function(p, y, g, _) {
    v.transform(p, function() {
      return i(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), t.apply(this, arguments), r);
    }, null, _);
  }, v.translateTo = function(p, y, g, _, S) {
    v.transform(p, function() {
      var A = t.apply(this, arguments), E = this.__zoom, D = _ == null ? $(A) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return i(ft.translate(D[0], D[1]).scale(E.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), A, r);
    }, _, S);
  };
  function O(p, y) {
    return y = Math.max(o[0], Math.min(o[1], y)), y === p.k ? p : new Me(y, p.x, p.y);
  }
  function q(p, y, g) {
    var _ = y[0] - g[0] * p.k, S = y[1] - g[1] * p.k;
    return _ === p.x && S === p.y ? p : new Me(p.k, _, S);
  }
  function $(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function x(p, y, g, _) {
    p.on("start.zoom", function() {
      b(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      b(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var S = this, A = arguments, E = b(S, A).event(_), D = t.apply(S, A), W = g == null ? $(D) : typeof g == "function" ? g.apply(S, A) : g, Z = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), J = S.__zoom, ce = typeof y == "function" ? y.apply(S, A) : y, ye = l(J.invert(W).concat(Z / J.k), ce.invert(W).concat(Z / ce.k));
      return function(ue) {
        if (ue === 1) ue = ce;
        else {
          var we = ye(ue), it = Z / we[2];
          ue = new Me(it, W[0] - we[0] * it, W[1] - we[1] * it);
        }
        E.zoom(null, ue);
      };
    });
  }
  function b(p, y, g) {
    return !g && p.__zooming || new k(p, y);
  }
  function k(p, y) {
    this.that = p, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, y), this.taps = 0;
  }
  k.prototype = {
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
      var y = ke(this.that).datum();
      c.call(
        p,
        this.that,
        new Md(p, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: c
        }),
        y
      );
    }
  };
  function P(p, ...y) {
    if (!e.apply(this, arguments)) return;
    var g = b(this, y).event(p), _ = this.__zoom, S = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, s.apply(this, arguments)))), A = De(p);
    if (g.wheel)
      (g.mouse[0][0] !== A[0] || g.mouse[0][1] !== A[1]) && (g.mouse[1] = _.invert(g.mouse[0] = A)), clearTimeout(g.wheel);
    else {
      if (_.k === S) return;
      g.mouse = [A, _.invert(A)], zt(this), g.start();
    }
    dt(p), g.wheel = setTimeout(E, w), g.zoom("mouse", i(q(O(_, S), g.mouse[0], g.mouse[1]), g.extent, r));
    function E() {
      g.wheel = null, g.end();
    }
  }
  function L(p, ...y) {
    if (h || !e.apply(this, arguments)) return;
    var g = p.currentTarget, _ = b(this, y, !0).event(p), S = ke(p.view).on("mousemove.zoom", W, !0).on("mouseup.zoom", Z, !0), A = De(p, g), E = p.clientX, D = p.clientY;
    Gr(p.view), oi(p), _.mouse = [A, this.__zoom.invert(A)], zt(this), _.start();
    function W(J) {
      if (dt(J), !_.moved) {
        var ce = J.clientX - E, ye = J.clientY - D;
        _.moved = ce * ce + ye * ye > I;
      }
      _.event(J).zoom("mouse", i(q(_.that.__zoom, _.mouse[0] = De(J, g), _.mouse[1]), _.extent, r));
    }
    function Z(J) {
      S.on("mousemove.zoom mouseup.zoom", null), Wr(J.view, _.moved), dt(J), _.event(J).end();
    }
  }
  function M(p, ...y) {
    if (e.apply(this, arguments)) {
      var g = this.__zoom, _ = De(p.changedTouches ? p.changedTouches[0] : p, this), S = g.invert(_), A = g.k * (p.shiftKey ? 0.5 : 2), E = i(q(O(g, A), _, S), t.apply(this, y), r);
      dt(p), a > 0 ? ke(this).transition().duration(a).call(x, E, _, p) : ke(this).call(v.transform, E, _, p);
    }
  }
  function R(p, ...y) {
    if (e.apply(this, arguments)) {
      var g = p.touches, _ = g.length, S = b(this, y, p.changedTouches.length === _).event(p), A, E, D, W;
      for (oi(p), E = 0; E < _; ++E)
        D = g[E], W = De(D, this), W = [W, this.__zoom.invert(W), D.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== W[2] && (S.touch1 = W, S.taps = 0) : (S.touch0 = W, A = !0, S.taps = 1 + !!u);
      u && (u = clearTimeout(u)), A && (S.taps < 2 && (m = W[0], u = setTimeout(function() {
        u = null;
      }, f)), zt(this), S.start());
    }
  }
  function B(p, ...y) {
    if (this.__zooming) {
      var g = b(this, y).event(p), _ = p.changedTouches, S = _.length, A, E, D, W;
      for (dt(p), A = 0; A < S; ++A)
        E = _[A], D = De(E, this), g.touch0 && g.touch0[2] === E.identifier ? g.touch0[0] = D : g.touch1 && g.touch1[2] === E.identifier && (g.touch1[0] = D);
      if (E = g.that.__zoom, g.touch1) {
        var Z = g.touch0[0], J = g.touch0[1], ce = g.touch1[0], ye = g.touch1[1], ue = (ue = ce[0] - Z[0]) * ue + (ue = ce[1] - Z[1]) * ue, we = (we = ye[0] - J[0]) * we + (we = ye[1] - J[1]) * we;
        E = O(E, Math.sqrt(ue / we)), D = [(Z[0] + ce[0]) / 2, (Z[1] + ce[1]) / 2], W = [(J[0] + ye[0]) / 2, (J[1] + ye[1]) / 2];
      } else if (g.touch0) D = g.touch0[0], W = g.touch0[1];
      else return;
      g.zoom("touch", i(q(E, D, W), g.extent, r));
    }
  }
  function Y(p, ...y) {
    if (this.__zooming) {
      var g = b(this, y).event(p), _ = p.changedTouches, S = _.length, A, E;
      for (oi(p), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, f), A = 0; A < S; ++A)
        E = _[A], g.touch0 && g.touch0[2] === E.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === E.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (E = De(E, this), Math.hypot(m[0] - E[0], m[1] - E[1]) < N)) {
        var D = ke(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : Nt(+p), v) : s;
  }, v.filter = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Nt(!!p), v) : e;
  }, v.touchable = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : Nt(!!p), v) : n;
  }, v.extent = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Nt([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), v) : t;
  }, v.scaleExtent = function(p) {
    return arguments.length ? (o[0] = +p[0], o[1] = +p[1], v) : [o[0], o[1]];
  }, v.translateExtent = function(p) {
    return arguments.length ? (r[0][0] = +p[0][0], r[1][0] = +p[1][0], r[0][1] = +p[0][1], r[1][1] = +p[1][1], v) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, v.constrain = function(p) {
    return arguments.length ? (i = p, v) : i;
  }, v.duration = function(p) {
    return arguments.length ? (a = +p, v) : a;
  }, v.interpolate = function(p) {
    return arguments.length ? (l = p, v) : l;
  }, v.on = function() {
    var p = c.on.apply(c, arguments);
    return p === c ? v : p;
  }, v.clickDistance = function(p) {
    return arguments.length ? (I = (p = +p) * p, v) : Math.sqrt(I);
  }, v.tapDistance = function(p) {
    return arguments.length ? (N = +p, v) : N;
  }, v;
}
var Dd = Object.defineProperty, Ld = Object.getOwnPropertyDescriptor, oe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ld(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Dd(t, i, n), n;
};
function zd(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, r = s.x - i.x, a = s.y - i.y, l = n * a - o * r;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * r) / l, u = ((i.x - e.x) * o - (i.y - e.y) * n) / l;
  return c <= 0.02 || c >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + c * n, y: e.y + c * o, t: c };
}
function qd(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), a = t.x + r * s, l = t.y + r * n;
  return { dist: Math.hypot(e.x - a, e.y - l), t: r };
}
function Fd(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], r = e[n + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, l = (r.x - o.x) / a, c = (r.y - o.y) / a, u = t.map(([h, f]) => zd(o, r, h, f)).filter((h) => h !== null).filter((h) => h.t * a > i + 2 && (1 - h.t) * a > i + 2).sort((h, f) => h.t - f.t);
    let m = -1 / 0;
    for (const h of u)
      h.t * a - i <= m + 2 || (s += ` L ${h.x - l * i} ${h.y - c * i}`, s += ` A ${i} ${i} 0 0 1 ${h.x + l * i} ${h.y + c * i}`, m = h.t * a + i);
    s += ` L ${r.x} ${r.y}`;
  }
  return s;
}
const Tt = {
  component: G`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: G`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: G`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: G`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: G`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: G`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: G`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: G`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: G`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: G`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: G`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: G`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: G`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: G`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: G`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
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
    this._zoomBehavior = Ud().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const n = Math.min(...t.map((u) => u.x - u.w / 2)) - e, o = Math.max(...t.map((u) => u.x + u.w / 2)) + e, r = Math.min(...t.map((u) => u.y - u.h / 2)) - e, a = Math.max(...t.map((u) => u.y + u.h / 2)) + e, l = Math.max(0.15, Math.min(s.width / (o - n), s.height / (a - r), 1.25)), c = ft.translate(s.width / 2 - l * (n + o) / 2, s.height / 2 - l * (r + a) / 2).scale(l);
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
    for (let o = e.parentId; o; o = (s = this.scene.nodes.find((r) => r.id === o)) == null ? void 0 : s.parentId) {
      const r = this.scene.nodes.find((l) => l.id === o);
      if (!r) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - r.x), y: e.y + (this._dragPos.y - r.y) };
      const a = (n = this._dragGroup) == null ? void 0 : n.get(o);
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
      const s = this.scene.nodes.find((n) => n.id === e.parentId);
      if (s) {
        const n = this.nodePos(s), o = n.x - s.w / 2 + 10 + e.w / 2, r = n.x + s.w / 2 - 10 - e.w / 2, a = n.y - s.h / 2 + 34 + e.h / 2, l = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), r), i = Math.min(Math.max(i, a), l);
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
      const r = (n = o.closest) == null ? void 0 : n.call(o, "[data-node-id]");
      if (r) return r.getAttribute("data-node-id");
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
    const o = new Set(this.selectedIds), r = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (h) => o.has(h.id) && !(h.parentId && o.has(h.parentId))
    ) : null, a = r ? new Map(r.map((h) => [h.id, this.nodePos(h)])) : null, l = (h) => (h.shiftKey || h.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, c = (h) => {
      const f = this.nodeIdAt(h), w = f && f !== t.id ? this.scene.nodes.find((I) => I.id === f) : void 0;
      return w ? w.kind === "external-system" ? w.id : w.parentId ?? null : null;
    }, u = (h) => {
      if ((h.buttons & 1) === 0) {
        m(h);
        return;
      }
      const f = this.toScene(h), w = f.x - i.x, I = f.y - i.y;
      if (!(!n && Math.hypot(w, I) < 3 / this._t.k))
        if (n = !0, r && a) {
          const N = /* @__PURE__ */ new Map();
          for (const v of r) {
            const O = a.get(v.id), q = this.clampToParent(v, O.x + w, O.y + I);
            N.set(v.id, { x: q.x, y: q.y });
          }
          this._dragGroup = N;
        } else l(h) ? (this._dragPos = { id: t.id, x: s.x + w, y: s.y + I }, this._hoverNodeId = c(h)) : (this._dragPos = this.clampToParent(t, s.x + w, s.y + I), this._hoverNodeId = null);
    }, m = (h) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, w]) => ({ id: f, x: w.x, y: w.y }))
        });
      else if (n && this._dragPos) {
        if (l(h)) {
          const f = c(h);
          if (h.ctrlKey && t.kind === "api") {
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
    const n = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((I) => I.parentId === t.id), l = Math.min(...a.map((I) => I.x - I.w / 2)), c = Math.max(...a.map((I) => I.x + I.w / 2)), u = Math.min(...a.map((I) => I.y - I.h / 2)), m = Math.max(...a.map((I) => I.y + I.h / 2)), h = ps(
      a.map((I) => ({ dx: I.x - r.x, dy: I.y - r.y, w: I.w, h: I.h })),
      { w: n, h: o }
    ), f = (I) => {
      if ((I.buttons & 1) === 0) {
        w();
        return;
      }
      const N = this.toScene(I);
      if (I.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(h.w, 2 * Math.abs(N.x - r.x)),
          h: Math.max(h.h, 2 * Math.abs(N.y - r.y))
        };
        return;
      }
      const v = r.x - i * r.w / 2, O = r.y - s * r.h / 2, q = i > 0 ? Math.max(N.x, v + n, a.length ? c + 10 : -1 / 0) : Math.min(N.x, v - n, a.length ? l - 10 : 1 / 0), $ = s > 0 ? Math.max(N.y, O + o, a.length ? m + 10 : -1 / 0) : Math.min(N.y, O - o, a.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (v + q) / 2,
        y: (O + $) / 2,
        w: Math.abs(q - v),
        h: Math.abs($ - O)
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
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(o);
    }, n = (o) => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n);
      const r = this.nodeIdAt(o);
      r && r !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: r,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", n);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), o = t - s, r = i - n, a = e.w / 2, l = e.h / 2;
    if (o === 0 && r === 0) return { x: s, y: n };
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / l);
    return { x: s + o * c, y: n + r * c };
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
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), r = s[0] ?? o, a = s[s.length - 1] ?? n;
    let l = this.borderPoint(t, r.x, r.y), c = this.borderPoint(i, a.x, a.y);
    if (!s.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(c.x - l.x, c.y - l.y) || 1, h = -(c.y - l.y) / m * u, f = (c.x - l.x) / m * u;
        l = { x: l.x + h, y: l.y + f }, c = { x: c.x + h, y: c.y + f };
      }
    }
    return [l, ...s, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (r) => {
      if (!this._wpDrag) return;
      s = !0;
      const a = this.toScene(r), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: l };
    }, o = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
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
    let o = !1;
    const r = (l) => {
      if ((l.buttons & 1) === 0) {
        a();
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
    }, a = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", a), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", a);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((s) => `${s.x},${s.y}`).join(" ");
    return G`
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
          ${e.tooltip ? G`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, o = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), a = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, l = t.slice(1, -1);
    return G`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Fd(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? G`<text x=${a.x} y=${a.y - 6} text-anchor="middle"
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
      var h;
      const m = ((h = this._selectedWaypoint) == null ? void 0 : h.edgeId) === e.id && this._selectedWaypoint.index === u;
      return G`
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
    var h, f, w;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = a / 2, u = l / 2, m = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return G`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (w = this._dragGroup) != null && w.has(e.id) ? "none" : "auto"}
         @pointerdown=${(I) => this.onNodePointerDown(I, e)}
         @dblclick=${(I) => {
      I.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? G`<rect x=${-c - 4} y=${-u - 4} width=${a + 8} height=${l + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-u} width=${a} height=${l} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? G`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? G`<text x=${-c} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && Tt[e.symbol] && !r ? G`<g transform="translate(${c - 17}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && Tt[e.symbol] ? G`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? G`
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
              </foreignObject>` : r ? G`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? G`<text x=${-c + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : G`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? G`<line x1=${-c + 8} y1=${-u + 28} x2=${c - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, u],
      [0, -u]
    ].map(
      ([I, N]) => G`
                <circle data-handle cx=${I} cy=${N} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([I, N]) => G`
                <rect data-resize x=${I * c - 6.5} y=${N * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${I * N > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, I, N)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return G``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return G``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return G`
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
    }, n = (r) => {
      if ((r.buttons & 1) === 0) {
        s();
        return;
      }
      const a = this.toScene(r);
      !i && Math.hypot(a.x - t.x, a.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: a });
    }, o = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a: r, b: a } = this._rubber, l = Math.min(r.x, a.x), c = Math.max(r.x, a.x), u = Math.min(r.y, a.y), m = Math.max(r.y, a.y), h = this.scene.nodes.filter((f) => {
          const w = this.nodePos(f);
          return w.x >= l && w.x <= c && w.y >= u && w.y <= m;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: h });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return G``;
    const { a: e, b: t } = this._rubber;
    return G`
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
    const i = Math.min(...t.map((r) => r.x - r.w / 2)) - e, s = Math.max(...t.map((r) => r.x + r.w / 2)) + e, n = Math.min(...t.map((r) => r.y - r.h / 2)) - e, o = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
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
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = n.width / this._t.k, l = n.height / this._t.k;
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
      return G`<rect
              x=${(u.x - c.w / 2 - e.minX) * s}
              y=${(u.y - c.h / 2 - e.minY) * s}
              width=${Math.max(2, c.w * s)}
              height=${Math.max(2, c.h * s)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * s}
            y=${(r - e.minY) * s}
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
      const o = this.edgePolyline(n);
      if (o) {
        i.push(this.renderEdgeHit(n, o)), s.push(this.renderEdgeInk(n, o, [...t]));
        for (let r = 0; r < o.length - 1; r++) t.push([o[r], o[r + 1]]);
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
      (n) => G`
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
  U()
], ie.prototype, "_t", 2);
oe([
  U()
], ie.prototype, "_dragPos", 2);
oe([
  U()
], ie.prototype, "_dragGroup", 2);
oe([
  U()
], ie.prototype, "_pendingLink", 2);
oe([
  U()
], ie.prototype, "_hoverNodeId", 2);
oe([
  U()
], ie.prototype, "_editingId", 2);
oe([
  U()
], ie.prototype, "_spaceDown", 2);
oe([
  U()
], ie.prototype, "_wpDrag", 2);
oe([
  U()
], ie.prototype, "_selectedWaypoint", 2);
oe([
  U()
], ie.prototype, "_resize", 2);
oe([
  U()
], ie.prototype, "_rubber", 2);
ie = oe([
  ki("modux-canvas")
], ie);
const V = {
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
function te(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Be = (e) => e.trim().toLowerCase();
function Vd(e, t) {
  var L, M, R, B, Y;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((p) => [p.id, p.name])), n = e.modules.flatMap(
    (p) => (p.useCases ?? []).map((y) => ({ ...y, moduleId: p.id }))
  ), o = new Set(n.map((p) => p.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((p) => (p.domainServices ?? []).map((y) => y.id))
  ), l = e.modules.flatMap(
    (p) => (p.domainEvents ?? []).map((y) => ({ ...y, moduleId: p.id, application: !1 }))
  ), c = e.modules.flatMap(
    (p) => (p.applicationEvents ?? []).map((y) => ({ ...y, moduleId: p.id, application: !0 }))
  ), u = e.modules.flatMap(
    (p) => (p.readModels ?? []).map((y) => ({ ...y, moduleId: p.id }))
  );
  for (const p of n)
    he(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: V.command.w,
      h: V.command.h,
      kind: "use-case",
      symbol: p.policy ? "flow" : "gear",
      fill: p.policy ? V.policy.fill : V.command.fill,
      stroke: p.policy ? V.policy.stroke : V.command.stroke,
      badge: p.policy ? "POLICY" : "COMANDO",
      tooltip: p.policy ? `${p.name} — policy de ${s.get(p.moduleId) ?? p.moduleId} (reacción, no caso de negocio)` : `${p.name} — caso de uso de ${s.get(p.moduleId) ?? p.moduleId}`
    });
  for (const p of r)
    he(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: V.aggregate.w,
      h: V.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: V.aggregate.fill,
      stroke: V.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${p.name} — agregado de ${s.get(p.moduleId) ?? p.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const p of [...l, ...c])
    he(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: V.event.w,
      h: V.event.h,
      kind: p.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: V.event.fill,
      stroke: V.event.stroke,
      badge: p.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${p.name} — evento de ${s.get(p.moduleId) ?? p.moduleId}`
    }), m.set(Be(p.name), p.id);
  const h = (p) => {
    if (!p || !p.trim()) return null;
    const y = m.get(Be(p));
    if (y) return y;
    const g = `evname:${Be(p)}`;
    return he(i, {
      id: g,
      label: p,
      x: 0,
      y: 0,
      w: V.event.w,
      h: V.event.h,
      kind: "event-name",
      symbol: "event",
      fill: V.event.fill,
      stroke: V.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${p} — referenciado por nombre, sin evento declarado en el catálogo`
    }), g;
  }, f = (p) => {
    const y = u.find((_) => _.id === p.id) ?? u.find((_) => p.name && Be(_.name) === Be(p.name)), g = (y == null ? void 0 : y.id) ?? (p.id || (p.name ? `rm:${Be(p.name)}` : null));
    return g ? (he(i, {
      id: g,
      label: (y == null ? void 0 : y.name) ?? p.name ?? g,
      x: 0,
      y: 0,
      w: V.readModel.w,
      h: V.readModel.h,
      kind: y ? "read-model" : "derived-read-model",
      fill: V.readModel.fill,
      stroke: V.readModel.stroke,
      dashed: !y,
      badge: "READ MODEL"
    }), g) : null;
  };
  for (const p of e.actorUses ?? []) {
    if (!o.has(p.targetId)) continue;
    const y = (e.actors ?? []).find((g) => g.id === p.actorId);
    y && (he(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: V.actor.w,
      h: V.actor.h,
      kind: "actor",
      symbol: "person",
      fill: V.actor.fill,
      stroke: V.actor.stroke,
      badge: "ACTOR"
    }), te(i, {
      id: `es-actor:${y.id}->${p.targetId}`,
      sourceId: y.id,
      targetId: p.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const p of e.aiAgents ?? []) {
    const y = (e.agentUses ?? []).filter((E) => E.agentId === p.id), g = (e.agentExternalUses ?? []).filter((E) => E.agentId === p.id), _ = (e.agentRags ?? []).filter((E) => E.agentId === p.id), S = (e.agentMcpUses ?? []).filter((E) => E.agentId === p.id), A = (e.agentGatewayUses ?? []).some((E) => E.agentId === p.id) || (e.agentApiOpUses ?? []).some((E) => E.agentId === p.id) || (e.agentQueryUses ?? []).some((E) => E.agentId === p.id) || (e.agentDelegations ?? []).some((E) => E.agentId === p.id) || (e.agentTriggers ?? []).some((E) => E.agentId === p.id);
    if (!(!y.length && !g.length && !_.length && !S.length && !A)) {
      he(i, {
        id: p.id,
        label: p.name,
        x: 0,
        y: 0,
        w: V.actor.w,
        h: V.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${p.name} — agente de IA (consume por MCP)`
      });
      for (const E of y)
        o.has(E.useCaseId) && te(i, {
          id: `es-agent:${p.id}->${E.useCaseId}`,
          sourceId: p.id,
          targetId: E.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const E of g) {
        const D = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === E.externalUseCaseId)
        );
        if (!D) continue;
        const W = (L = (D.useCases ?? []).find((Z) => Z.id === E.externalUseCaseId)) == null ? void 0 : L.name;
        he(i, {
          id: D.id,
          label: D.name,
          x: 0,
          y: 0,
          w: V.external.w,
          h: V.external.h,
          kind: "external-system",
          symbol: "component",
          fill: V.external.fill,
          stroke: V.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentx:${p.id}->${E.externalUseCaseId}`,
          sourceId: p.id,
          targetId: D.id,
          kind: "es-agent-external",
          label: W,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: W ? `Llama a ${W} del sistema externo` : void 0
        });
      }
      for (const E of S) {
        const D = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === E.mcpServerId)
        );
        if (!D) continue;
        const W = (M = (D.mcpServers ?? []).find((Z) => Z.id === E.mcpServerId)) == null ? void 0 : M.name;
        he(i, {
          id: D.id,
          label: D.name,
          x: 0,
          y: 0,
          w: V.external.w,
          h: V.external.h,
          kind: "external-system",
          symbol: "component",
          fill: V.external.fill,
          stroke: V.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentmcp:${p.id}->${E.mcpServerId}`,
          sourceId: p.id,
          targetId: D.id,
          kind: "es-agent-mcp",
          label: W,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: W ? `Consume las herramientas del servidor MCP ${W}` : void 0
        });
      }
      for (const E of _) {
        const D = (e.rags ?? []).find((W) => W.id === E.ragId);
        if (D) {
          he(i, {
            id: D.id,
            label: D.name,
            x: 0,
            y: 0,
            w: V.readModel.w,
            h: V.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${D.name} — base de conocimiento (retrieval)`
          }), te(i, {
            id: `es-agrag:${p.id}->${D.id}`,
            sourceId: p.id,
            targetId: D.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const W of D.sourceReadModelIds ?? []) {
            const Z = f({ id: W });
            Z && te(i, {
              id: `es-ragsrc:${D.id}->${Z}`,
              sourceId: Z,
              targetId: D.id,
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
  const w = (p) => {
    const y = e.externalSystems.find((g) => g.id === p);
    return y ? (he(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: V.external.w,
      h: V.external.h,
      kind: "external-system",
      symbol: "component",
      fill: V.external.fill,
      stroke: V.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), y.id) : null;
  };
  for (const p of e.externalCalls ?? []) {
    const y = w(p.externalSystemId);
    !y || !o.has(p.useCaseId) || te(i, {
      id: `es-extin:${y}->${p.useCaseId}`,
      sourceId: y,
      targetId: p.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const p of e.externalUseCaseCalls ?? []) {
    if (!o.has(p.sourceId)) continue;
    const y = e.externalSystems.find(
      (S) => (S.useCases ?? []).some((A) => A.id === p.targetId)
    ), g = y ? w(y.id) : null;
    if (!g) continue;
    const _ = (R = ((y == null ? void 0 : y.useCases) ?? []).find((S) => S.id === p.targetId)) == null ? void 0 : R.name;
    te(i, {
      id: `es-extout:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: g,
      kind: "es-command-external",
      label: _,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: _ ? `Llama a ${_} del sistema externo` : void 0
    });
  }
  for (const p of e.aggregateCalls ?? [])
    !o.has(p.sourceId) || !i.nodes.has(p.targetId) || te(i, {
      id: `es-write:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: p.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const I = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const p of I)
    !i.nodes.has(p.domainEventId) || !(i.nodes.has(p.sourceId) && (o.has(p.sourceId) || r.some((g) => g.id === p.sourceId) || a.has(p.sourceId))) || te(i, {
      id: `es-emit:${p.sourceId}->${p.domainEventId}`,
      sourceId: p.sourceId,
      targetId: p.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const N = (p, y, g, _, S, A) => (he(i, {
    id: p,
    label: y,
    x: 0,
    y: 0,
    w: V.policy.w,
    h: V.policy.h,
    kind: g,
    symbol: "flow",
    fill: V.policy.fill,
    stroke: V.policy.stroke,
    badge: _,
    tooltip: S
  }), p), v = (p, y) => {
    const g = h(p);
    g && te(i, {
      id: `es-trigger:${g}->${y}`,
      sourceId: g,
      targetId: y,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, O = (p, y) => {
    !y || !o.has(y) || te(i, {
      id: `es-invoke:${p}->${y}`,
      sourceId: p,
      targetId: y,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const p of e.subscriptions ?? []) {
    const y = N(
      p.id,
      p.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${p.name}${p.eventName ? ` — reacciona a ${p.eventName}` : ""}${p.consumerGroup ? ` · grupo ${p.consumerGroup}` : ""}`
    );
    v(p.eventName, y);
    for (const g of p.actions ?? []) {
      if (g.type === "CallUseCase" && O(y, g.useCaseId), g.type === "StartSaga" && g.sagaId) {
        const _ = `saga:${g.sagaId}`;
        N(_, g.sagaId, "saga", "SAGA"), te(i, {
          id: `es-saga:${y}->${_}`,
          sourceId: y,
          targetId: _,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (g.type === "UpdateProjection" && g.projectionId) {
        const _ = (e.projections ?? []).find((S) => S.id === g.projectionId);
        _ && te(i, {
          id: `es-feeds:${y}->${_.id}`,
          sourceId: y,
          targetId: _.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const p of e.projections ?? []) {
    const y = N(
      p.id,
      p.name,
      "projection",
      "PROYECCIÓN",
      `${p.name}${p.readModelName ? ` — materializa ${p.readModelName}` : ""}`
    );
    for (const S of p.handledEventIds) {
      const A = i.nodes.has(S) ? S : null;
      A && te(i, {
        id: `es-trigger:${A}->${y}`,
        sourceId: A,
        targetId: y,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    p.sourceAggregateId && i.nodes.has(p.sourceAggregateId) && te(i, {
      id: `es-state:${p.id}`,
      sourceId: p.sourceAggregateId,
      targetId: y,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const g = p.sourceExternalUseCaseId ?? p.sourceExternalTableId;
    if (g) {
      const S = e.externalSystems.find(
        (E) => (E.useCases ?? []).some((D) => D.id === g) || (E.tables ?? []).some((D) => D.id === g)
      ), A = S ? w(S.id) : null;
      if (A) {
        const E = ((B = (S.useCases ?? []).find((D) => D.id === g)) == null ? void 0 : B.name) ?? ((Y = (S.tables ?? []).find((D) => D.id === g)) == null ? void 0 : Y.name);
        te(i, {
          id: `es-poll:${p.id}`,
          sourceId: A,
          targetId: y,
          kind: "es-projects-poll",
          label: E,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: E ? `polling de ${E}` : "polling"
        });
      }
    }
    const _ = f({ id: p.readModelId, name: p.readModelName });
    _ && te(i, {
      id: `es-projects:${y}->${_}`,
      sourceId: y,
      targetId: _,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const p of e.flows) {
    if (p.archetype === "MATERIALIZES") {
      const g = h(p.triggerEvent), _ = f({ name: p.readModelName ?? `${p.triggerEvent}View` });
      g && _ && te(i, {
        id: `es-mat:${p.id}`,
        sourceId: g,
        targetId: _,
        kind: "es-materializes",
        label: p.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${p.name} [MATERIALIZES]`
      });
      continue;
    }
    const y = N(
      `flow:${p.id}`,
      p.name,
      "flow",
      `POLICY · ${p.archetype}`,
      `Flow ${p.name} [${p.archetype}]`
    );
    if (v(p.triggerEvent, y), O(y, p.targetUseCaseId), !p.targetUseCaseId) {
      const g = w(p.targetId), _ = g ?? `tgt:${p.targetId}`;
      !g && s.has(p.targetId) && he(i, {
        id: _,
        label: s.get(p.targetId) ?? p.targetId,
        x: 0,
        y: 0,
        w: V.module.w,
        h: V.module.h,
        kind: "module",
        symbol: "component",
        fill: V.module.fill,
        stroke: V.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(_) && te(i, {
        id: `es-deliver:${p.id}`,
        sourceId: y,
        targetId: _,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const p of e.processes ?? []) {
    const y = N(
      p.id,
      p.name,
      "process",
      `PROCESO${p.sla ? ` · SLA ${p.sla}` : ""}`,
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    v(p.triggerEvent, y);
    for (const _ of p.steps) O(y, _.useCaseId);
    const g = h(p.onCompletionEventName);
    g && te(i, {
      id: `es-done:${p.id}`,
      sourceId: y,
      targetId: g,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const p of e.workflows ?? []) {
    const y = N(
      p.id,
      p.name,
      "workflow",
      "WORKFLOW",
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    v(p.triggerEvent, y);
    for (const _ of p.steps ?? []) {
      O(y, _.targetUseCaseId);
      for (const S of [_.emittedEventName, _.completionEventName]) {
        const A = h(S);
        A && te(i, {
          id: `es-wfemit:${p.id}:${A}`,
          sourceId: y,
          targetId: A,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const g = h(p.onCompletionEventName);
    g && te(i, {
      id: `es-done:${p.id}`,
      sourceId: y,
      targetId: g,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const q = [...i.nodes.values()], $ = /* @__PURE__ */ new Map();
  for (const p of i.edges)
    $.has(p.targetId) || $.set(p.targetId, []), $.get(p.targetId).push(p.sourceId);
  const x = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Set(), k = (p) => {
    const y = x.get(p);
    if (y !== void 0) return y;
    if (b.has(p)) return 0;
    b.add(p);
    const g = $.get(p) ?? [], _ = g.length ? 1 + Math.max(...g.map(k)) : 0;
    return b.delete(p), x.set(p, _), _;
  }, P = /* @__PURE__ */ new Map();
  for (const p of q) {
    const y = t[p.id];
    if (y) {
      p.x = y.x, p.y = y.y;
      continue;
    }
    const g = k(p.id), _ = P.get(g) ?? 0;
    P.set(g, _ + 1), p.x = 140 + g * 260, p.y = 110 + _ * 110;
  }
  return { nodes: q, edges: i.edges };
}
const Hd = 190, Kd = 56, un = 180, Gd = 56, Wd = 150, Bd = 44, pn = 250, hn = 100;
function Yd(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), r;
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
function jd(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (a) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : l.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var N;
    const l = new Map(a.steps.map((v) => [v.id, v])), c = new Map(a.steps.map((v) => [v.id, Yd(v, l)])), u = /* @__PURE__ */ new Map();
    for (const v of a.steps) {
      const O = c.get(v.id) ?? 0;
      u.set(O, (u.get(O) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), h = Xd(e, a);
    if (h && !n.has(h.id)) {
      n.add(h.id);
      const v = t[h.id] ?? { x: 140, y: r };
      i.push({
        id: h.id,
        label: h.label,
        x: v.x,
        y: v.y,
        w: Wd,
        h: Bd,
        kind: h.kind,
        symbol: h.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: h.kind === "aggregate" ? "AGGREGATE" : h.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[a.id] ?? { x: 420, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: f.x,
      y: f.y,
      w: Hd,
      h: Kd,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), h && s.push({
      id: `wft:${a.id}`,
      sourceId: h.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const w = /* @__PURE__ */ new Map();
    let I = 0;
    for (const v of a.steps) {
      const O = c.get(v.id) ?? 0;
      I = Math.max(I, O);
      const q = w.get(O) ?? 0;
      w.set(O, q + 1);
      const $ = t[v.id] ?? {
        x: f.x + (O + 1) * pn,
        y: r + (q - (u.get(O) - 1) / 2) * hn
      }, x = o(v.targetUseCaseId);
      i.push({
        id: v.id,
        label: v.name,
        x: $.x,
        y: $.y,
        w: un,
        h: Gd,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: x ? `→ ${x}` : "∅ sin use case",
        tooltip: `${v.name}${v.emittedEventName ? ` · emite ${v.emittedEventName}` : ""}${x ? ` · lanza ${x}` : ""}${v.completionEventName ? ` · espera ${v.completionEventName}` : ""}`
      });
      const b = (v.dependsOnStepIds ?? []).filter((k) => l.has(k));
      b.length === 0 && s.push({
        id: `wfs:${a.id}:${v.id}`,
        sourceId: a.id,
        targetId: v.id,
        kind: "workflow-start",
        label: v.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of b)
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
      const v = `done:${a.id}`, O = t[v] ?? { x: f.x + (I + 2) * pn, y: r };
      i.push({
        id: v,
        label: a.onCompletionEventName,
        x: O.x,
        y: O.y,
        w: un,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const q = new Set(a.steps.flatMap((x) => x.dependsOnStepIds ?? [])), $ = a.steps.filter((x) => !q.has(x.id));
      for (const x of $.length ? $ : [])
        s.push({
          id: `wfd:${a.id}:${x.id}`,
          sourceId: x.id,
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
    r += Math.max(2, m + 1) * hn + 60;
  }), { nodes: i, edges: s };
}
async function Qd(e, t) {
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
  }, r = await s.layout(o), a = {};
  for (const l of r.children ?? [])
    a[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return a;
}
var Zd = Object.defineProperty, Jd = Object.getOwnPropertyDescriptor, K = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Jd(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Zd(t, i, n), n;
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
}, el = Object.keys(wi), tl = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], il = ["CORE", "SUPPORTING", "GENERIC"];
function lt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, r = i.y + i.h / 2;
  let a = 0, l = 1;
  const c = t.x - e.x, u = t.y - e.y;
  for (const [m, h] of [
    [-c, e.x - s],
    [c, n - e.x],
    [-u, e.y - o],
    [u, r - e.y]
  ]) {
    if (m === 0) {
      if (h < 0) return !1;
      continue;
    }
    const f = h / m;
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
  const s = new Map(e.nodes.map((u) => [u.id, u])), n = (u) => {
    var h;
    const m = /* @__PURE__ */ new Set();
    for (let f = u; f; f = (h = s.get(f)) == null ? void 0 : h.parentId) m.add(f);
    return m;
  }, o = e.nodes, r = (u) => u.parentId ? Math.min(i, 6) : i, a = /* @__PURE__ */ new Map(), l = (u, m, h) => {
    const f = r(h), w = { x: h.x, y: h.y, w: h.w + 2 * f, h: h.h + 2 * f }, I = h.w / 2 + f * 1.5, N = h.h / 2 + f * 1.5, v = { x: h.x - I, y: h.y - N }, O = { x: h.x + I, y: h.y - N }, q = { x: h.x - I, y: h.y + N }, $ = { x: h.x + I, y: h.y + N }, x = [];
    for (const b of [v, O, q, $])
      !lt(u, b, w) && !lt(b, m, w) && x.push([b]);
    for (const [b, k] of [
      [v, O],
      [O, v],
      [O, $],
      [$, O],
      [$, q],
      [q, $],
      [q, v],
      [v, q]
    ])
      !lt(u, b, w) && !lt(k, m, w) && x.push([b, k]);
    return x;
  };
  for (const u of e.edges) {
    if ((c = t[u.id]) != null && c.length) continue;
    const m = s.get(u.sourceId), h = s.get(u.targetId);
    if (!m || !h) continue;
    const f = /* @__PURE__ */ new Set([...n(m.id), ...n(h.id)]), w = [
      { x: m.x, y: m.y },
      { x: h.x, y: h.y }
    ];
    for (let I = 0; I < 12; I++) {
      let N = !1;
      e: for (let v = 0; v < w.length - 1; v++)
        for (const O of o) {
          if (f.has(O.id)) continue;
          const q = r(O), $ = { x: O.x, y: O.y, w: O.w + 2 * q, h: O.h + 2 * q };
          if (!lt(w[v], w[v + 1], $)) continue;
          const x = l(w[v], w[v + 1], O);
          if (!x.length) continue;
          const b = (P) => o.some(
            (L) => L !== O && !f.has(L.id) && Math.abs(P.x - L.x) < L.w / 2 + r(L) / 2 && Math.abs(P.y - L.y) < L.h / 2 + r(L) / 2
          ), k = (P) => {
            let L = 0;
            const M = [w[v], ...P, w[v + 1]];
            for (let R = 0; R < M.length - 1; R++)
              L += Math.hypot(M[R + 1].x - M[R].x, M[R + 1].y - M[R].y);
            return L + (P.some(b) ? 1e4 : 0);
          };
          x.sort((P, L) => k(P) - k(L)), w.splice(v + 1, 0, ...x[0]), N = !0;
          break e;
        }
      if (!N) break;
    }
    w.length > 2 && a.set(
      u.id,
      w.slice(1, -1).map((I) => ({ x: Math.round(I.x), y: Math.round(I.y) }))
    );
  }
  return a;
}
const z = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
function ol(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let H = class extends He {
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
    const o = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((u) => !u.parentId), a = xi(r), l = [...a.keys()].map((u) => ({
      kind: "move-node",
      view: "context-map",
      id: u,
      pos: o.nodes[u] ?? null
    })), c = { ...o.nodes };
    for (const [u, m] of a) {
      const h = r.find((w) => w.id === u), f = o.nodes[u] ?? { x: h.x, y: h.y };
      c[u] = {
        x: Math.round(f.x + (m.x - h.x)),
        y: Math.round(f.y + (m.y - h.y))
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
          (r) => r.apiId === e.apiId && r.operationId === e.operationId && r.moduleId === e.moduleId
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
          (r) => r.apiId === e.apiId && r.operationId === e.operationId && r.moduleId === e.moduleId
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
        const o = (s = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : s.operations.find((r) => r.id === e.id);
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
        const o = (n = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : n.operations.find((r) => r.id === e.id);
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, o = this.viewLayout(n), r = o.nodes[t] ?? null;
    let a = { x: i, y: s };
    const l = this.sceneFor(n), c = l.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = l.nodes.find((h) => h.id === c.parentId);
      m && (a = { x: i - m.x, y: s - m.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: a } });
    const u = [{ kind: "move-node", view: n, id: t, pos: r }];
    if (n === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const h = this.inverseOf(m);
        h && u.unshift(...h), this.command(m, !1);
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
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const l = this._view, c = this.viewLayout(l), u = this.sceneFor(l), m = a ? u.nodes.find((w) => w.id === a) : void 0, h = m ? { x: s - m.x, y: n - m.y } : { x: s, y: n }, f = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: l, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(l, { ...c, nodes: { ...c.nodes, [t]: h } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((w) => w.id === t), r = this.model.externalSystems.find((w) => w.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (w) => w.targetApiId === t && w.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${z(o.name)}-${z(r.name)}`;
    if ((this.model.proxyApis ?? []).some((w) => w.id === l)) return;
    const c = this._view, u = this.viewLayout(c), h = this.sceneFor(c).nodes.find((w) => w.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${o.name}@${r.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const f = [{ kind: "remove-proxy-api", id: l }];
    h && (f.push({ kind: "move-node", view: c, id: l, pos: u.nodes[l] ?? null }), this.writeViewLayout(c, {
      ...u,
      nodes: { ...u.nodes, [l]: { x: s - h.x, y: n - h.y } }
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
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), o = { ...s.nodes }, r = [];
    for (const { id: a, x: l, y: c } of t) {
      r.push({ kind: "move-node", view: i, id: a, pos: s.nodes[a] ?? null });
      let u = { x: l, y: c };
      const m = n.nodes.find((h) => h.id === a);
      if (m != null && m.parentId) {
        const h = n.nodes.find((f) => f.id === m.parentId);
        h && (u = { x: l - h.x, y: c - h.y });
      }
      o[a] = u;
    }
    if (this.writeViewLayout(i, { ...s, nodes: o }), i === "processes")
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
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, r = this._view, a = this.viewLayout(r), l = this.sceneFor(r).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((u = a.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...l.map((m) => ({ kind: "move-node", view: r, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: s } };
    for (const m of l) c[m.id] = { x: m.x - i, y: m.y - s };
    this.writeViewLayout(r, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [t]: { w: n, h: o } }
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
    const i = Oi(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((r) => [r.id, r.x])), n = [...t.steps].sort(
      (r, a) => (s.get(r.id) ?? 0) - (s.get(a.id) ?? 0)
    );
    if (n.every((r, a) => r.id === t.steps[a].id)) return null;
    const o = n.findIndex((r) => r.id === e);
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
    var $;
    if (this._view === "workflows") {
      const x = this.owningWorkflowOf(e), b = this.owningWorkflowOf(t);
      if (!x || x !== b || e === t) return;
      const k = x.steps.find((P) => P.id === t);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(e)) return;
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
      const [, x, b] = n, k = (this.model.proxyApis ?? []).find((B) => B.id === b), P = (k == null ? void 0 : k.targetApiId) ?? (($ = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === b && (this.model.apis ?? []).some(
          (Y) => Y.id === B.apiId && Y.operations.some((p) => p.id === x)
        )
      )) == null ? void 0 : $.apiId);
      if (!P) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((Y) => Y.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: P,
          operationId: x,
          moduleId: b,
          targetUseCaseId: t
        });
        return;
      }
      if (!(k != null && k.targetApiId)) return;
      let M = null;
      if (t === k.targetApiId)
        M = k.targetApiId;
      else {
        const B = /^apiimpl:(.+)@(.+)$/.exec(t);
        B && B[1] === k.targetApiId ? M = B[2] : this.model.modules.some((Y) => Y.id === t) && (this.model.apiImplementations ?? []).some(
          (Y) => Y.apiId === k.targetApiId && Y.moduleId === t
        ) && (M = t);
      }
      if (!M) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === k.id && B.operationId === x && B.targetSiteId === M
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: x,
        targetSiteId: M
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((x) => x.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (R) => R.agentId === e && R.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.useCases ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (R) => R.agentId === e && R.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.mcpServers ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (R) => R.agentId === e && R.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((M) => M.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (R) => R.agentId === e && R.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((M) => M.operations.map((R) => R.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (R) => R.agentId === e && R.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((M) => M.id === t) || (this.model.proxyApis ?? []).some((M) => M.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (R) => R.agentId === e && R.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((M) => (M.queryServices ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (R) => R.agentId === e && R.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (o.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (R) => R.agentId === e && R.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((M) => M.id === t) && ((this.model.agentRags ?? []).some(
        (R) => R.agentId === e && R.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === e)) {
      const x = (this.model.mcpGateways ?? []).find((P) => P.id === e), b = this.model.externalSystems.some((P) => (P.mcpServers ?? []).some((L) => L.id === t)) || (this.model.apis ?? []).some((P) => P.id === t) || (this.model.apis ?? []).some((P) => P.operations.some((L) => L.id === t)) || this.model.modules.some((P) => (P.useCases ?? []).some((L) => L.id === t)) || (this.model.rags ?? []).some((P) => P.id === t), k = [
        ...x.mcpServerIds ?? [],
        ...x.apiIds ?? [],
        ...x.apiOperationIds ?? [],
        ...x.useCaseIds ?? [],
        ...x.ragIds ?? []
      ].includes(t);
      b && !k && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === t)) return;
    const r = (this.model.rags ?? []).find((x) => x.id === e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.readModels ?? []).map((P) => P.id))
      ).has(t) && !(r.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.tables ?? []).map((P) => P.id))
      ).has(t) && !(r.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      ((this.model.apis ?? []).some((k) => k.id === t) || (this.model.proxyApis ?? []).some((k) => k.id === t)) && !(r.sourceApiIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
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
          (k) => k.apiId === x.targetApiId && k.moduleId === t
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
    const a = new Set((this.model.actors ?? []).map((x) => x.id));
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((b) => (b.domainEvents ?? []).map((k) => k.id)),
        ...this.model.modules.flatMap((b) => (b.applicationEvents ?? []).map((k) => k.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (k) => k.eventId === e && k.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!a.has(e)) return;
    }
    if (a.has(e)) {
      const x = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((P) => P.id))
      ), b = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map((P) => P.id))
      );
      if (x.has(t) || b.has(t)) {
        (this.model.actorUses ?? []).some(
          (P) => P.actorId === e && P.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((k) => k.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (P) => P.actorId === e && P.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((k) => k.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (P) => P.actorId === e && P.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const l = this.owningApiOf(e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((b) => (b.useCases ?? []).map((k) => k.id))
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
      const x = (c ?? u).name, b = c ? { externalUseCaseId: e } : { externalTableId: e }, k = (M) => c ? M.sourceExternalUseCaseId === e : M.sourceExternalTableId === e, P = this.model.modules.flatMap((M) => M.readModels ?? []).find((M) => M.id === t);
      if (P) {
        (this.model.projections ?? []).some(
          (R) => k(R) && R.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(x)}-${z(P.name)}`,
          name: `${P.name}Projection`,
          ...b,
          targetId: t
        });
        return;
      }
      const L = this.model.modules.find((M) => M.id === t);
      if (L) {
        (this.model.projections ?? []).some(
          (R) => k(R) && R.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(x)}-${z(L.name)}`,
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
      const x = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          (P) => P.sourceAggregateId === e && P.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(m.name)}-${z(x.name)}`,
          name: `${x.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const b = this.model.modules.find((k) => k.id === t);
      if (b) {
        (this.model.projections ?? []).some(
          (P) => P.sourceAggregateId === e && P.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(m.name)}-${z(b.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const h = new Set(
      this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((b) => b.id))
    ), f = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((x) => x.id),
      ...this.model.modules.flatMap((x) => (x.domainServices ?? []).map((b) => b.id))
    ]), w = new Set(
      this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((b) => b.id))
    ), I = new Set(this.model.modules.flatMap((x) => (x.useCases ?? []).map((b) => b.id))), N = new Set(
      this.model.modules.flatMap((x) => (x.queryServices ?? []).map((b) => b.id))
    );
    if (I.has(e) && N.has(t)) {
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
    if (f.has(e) && h.has(t) || I.has(e) && w.has(t)) {
      (this.model.emissions ?? []).some(
        (b) => b.sourceId === e && b.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (h.has(e) || w.has(e)) {
      const x = w.has(e), b = this.model.modules.flatMap((g) => (x ? g.applicationEvents : g.domainEvents) ?? []).find((g) => g.id === e), k = this.model.modules.flatMap((g) => (g.useCases ?? []).map((_) => ({ u: _, module: g }))).find(({ u: g }) => g.id === t), P = this.model.modules.flatMap((g) => (g.readModels ?? []).map((_) => ({ rm: _, module: g }))).find(({ rm: g }) => g.id === t), L = this.model.modules.find((g) => g.id === t) ?? (P == null ? void 0 : P.module) ?? (k == null ? void 0 : k.module);
      if (!b || !L) return;
      const M = new Set((this.model.aggregates ?? []).map((g) => g.id)), R = new Set(
        this.model.modules.flatMap((g) => (g.domainServices ?? []).map((_) => _.id))
      ), B = (this.model.emissions ?? []).find(
        (g) => g.domainEventId === e && (x ? I.has(g.sourceId) : M.has(g.sourceId) || R.has(g.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: x ? `Declara primero qué caso de uso publica ${b.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${b.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const Y = !x && M.has(B.sourceId);
      if (k) {
        if (this.model.flows.some(
          (_) => _.archetype === "TRIGGERS" && _.triggerEvent === b.name && _.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z(b.name)}-${z(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: Y ? B.sourceId : "",
          triggerDomainServiceId: !x && !Y ? B.sourceId : void 0,
          triggerUseCaseId: x ? B.sourceId : void 0,
          triggerEvent: b.name,
          targetId: L.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const p = (P == null ? void 0 : P.rm.name) ?? `${b.name}View`;
      if (this.model.flows.some(
        (g) => g.archetype === "MATERIALIZES" && g.triggerEvent === b.name && g.targetId === L.id && g.readModelName === p
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${z(b.name)}-${z(p)}`,
        name: p,
        archetype: "MATERIALIZES",
        triggerAggregateId: Y ? B.sourceId : "",
        triggerDomainServiceId: !x && !Y ? B.sourceId : void 0,
        triggerUseCaseId: x ? B.sourceId : void 0,
        triggerEvent: b.name,
        targetId: L.id,
        readModelName: p
      });
      return;
    }
    const O = /* @__PURE__ */ new Set([
      ...f,
      ...I,
      ...N,
      ...this.model.modules.flatMap((x) => (x.readModels ?? []).map((b) => b.id))
    ]);
    if (O.has(e) || O.has(t) || h.has(t) || w.has(t))
      return;
    const q = new Set(this.model.externalSystems.map((x) => x.id));
    if (q.has(e)) {
      if (new Set(
        this.model.modules.flatMap((L) => (L.useCases ?? []).map((M) => M.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (M) => M.externalSystemId === e && M.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (q.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const b = (this.model.apis ?? []).find(
        (L) => L.operations.some((M) => M.id === t)
      ), k = /^apiop:(.+)@(.+)$/.exec(t), P = b ? { operationId: t, siteId: b.id } : k ? { operationId: k[1], siteId: k[2] } : null;
      if (P) {
        (this.model.externalOperationUses ?? []).some(
          (M) => M.externalSystemId === e && M.operationId === P.operationId && M.siteId === P.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: P.operationId,
          targetSiteId: P.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((L) => L.id === t) || (this.model.proxyApis ?? []).some((L) => L.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (M) => M.sourceId === e && M.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    q.has(t) || a.has(t);
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
      const n = this.memberIdOf(i, s), o = (this.model.views ?? []).find((r) => r.id === this._activeViewId);
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
      const [, o, r] = n, a = (s = (this.model.apis ?? []).find(
        (l) => l.operations.some((c) => c.id === o)
      )) == null ? void 0 : s.id;
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: a, operationId: o, moduleId: r });
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
      const [, o, r, a] = n, l = /^apiimpl:.+@(.+)$/.exec(a), c = l ? l[1] : a;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: r, operationId: o, targetSiteId: c });
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
      id: `step-${z(e)}`,
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
    const t = new Set(e.memberIds), i = (n, o, r = {}) => T`
      <label
        class="${r.child ? "child" : ""} ${r.implicit && !t.has(n) ? "implicit" : ""}"
        title=${r.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(a) => this.toggleViewMember(n, a.target.checked)}
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${z(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((l) => l.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((l) => t.has(l.id)), s = new Set(i.map((l) => l.id)), n = this.model.externalSystems.filter((l) => t.has(l.id)), o = new Set(n.map((l) => l.id)), r = (this.model.aggregates ?? []).filter(
      (l) => t.has(l.id) || s.has(l.moduleId)
    ), a = new Set(r.map((l) => l.id));
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
      aggregates: r,
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
    const t = e.detail.kind === "process-step" ? ol(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : sl(e.detail.id, e.detail.kind);
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
    var r;
    const t = (r = e.dataTransfer) == null ? void 0 : r.getData("application/x-modux-palette");
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
      const o = n === 1 ? e : `${e} ${n}`, r = `${t}${z(o)}`;
      if (!i.has(r)) return { id: r, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, r;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let a = t; a; )
      s.push(a), a = (o = i.nodes.find((l) => l.id === a)) == null ? void 0 : o.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service"
    ].includes(e)) return s.find((a) => this.model.modules.some((l) => l.id === a)) ?? null;
    if (e === "read-model") {
      const a = s.find((c) => (this.model.aggregates ?? []).some((u) => u.id === c));
      if (a) return a;
      const l = s.find((c) => this.model.modules.some((u) => u.id === c));
      return ((r = (this.model.aggregates ?? []).find((c) => c.moduleId === l)) == null ? void 0 : r.id) ?? null;
    }
    return ["external-use-case", "external-table", "mcp-server"].includes(e) ? s.find((a) => this.model.externalSystems.some((l) => l.id === a)) ?? null : e === "api-operation" ? s.find((a) => (this.model.apis ?? []).some((l) => l.id === a)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    const s = H.PALETTE_NEW.find((u) => u.type === e);
    if (!s) return;
    const n = this._view, o = this.sceneFor(n), r = (u, m) => {
      const h = this.viewLayout(n), f = m ? o.nodes.find((I) => I.id === m) : void 0, w = f ? { x: Math.round(t.x - f.x), y: Math.round(t.y - f.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(n, { ...h, nodes: { ...h.nodes, [u]: w } }), { kind: "move-node", view: n, id: u, pos: null };
    }, a = (u, m, h) => {
      const f = this.inverseOf(u) ?? [];
      this.command(u, !1);
      const w = r(m, h);
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
      }, { id: m, name: h } = this.uniquePaletteName(s.label, u[e] ?? ""), f = e === "module" ? { kind: "add-module", id: m, name: h, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: m, name: h } : e === "external-system" ? { kind: "add-external-system", id: m, name: h } : e === "ai-agent" ? { kind: "add-ai-agent", id: m, name: h } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: m, name: h, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: m, name: h } : e === "rag" ? { kind: "add-rag", id: m, name: h } : e === "api" ? { kind: "add-api", id: m, name: h } : e === "proxy-api" ? { kind: "add-proxy-api", id: m, name: h } : {
        kind: "add-workflow",
        id: m,
        name: h,
        completionEventName: `${h.replace(/\s+/g, "")}Completado`
      };
      a(f, m);
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
      const u = `agg-${z(c)}`;
      a({ kind: "add-aggregate", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "use-case" || e === "policy") {
      const u = `uc-${z(c)}`;
      a(
        { kind: "add-use-case", id: u, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        u,
        l
      );
    } else if (e === "domain-event") {
      const u = `ev-${z(c)}`;
      a({ kind: "add-domain-event", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "application-event") {
      const u = `aev-${z(c)}`;
      a({ kind: "add-application-event", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "domain-service") {
      const u = `ds-${z(c)}`;
      a({ kind: "add-domain-service", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "query-service") {
      const u = `qs-${z(c)}`;
      a({ kind: "add-query-service", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "read-model") {
      const u = `rm-${z(c)}`, m = (this.model.aggregates ?? []).find((h) => h.id === l);
      a({ kind: "add-read-model", id: u, name: c, aggregateId: l }, u, (m == null ? void 0 : m.moduleId) ?? l);
    } else if (e === "api-operation") {
      const u = `apiop-${l.replace(/^api-/, "")}-${z(c)}`;
      a({ kind: "add-api-operation", apiId: l, id: u, name: c }, u, l);
    } else if (e === "external-use-case") {
      const u = `xuc-${z(c)}`;
      a({ kind: "add-external-use-case", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "external-table") {
      const u = `tbl-${z(c)}`;
      a({ kind: "add-external-table", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "mcp-server") {
      const u = `mcpsrv-${z(c)}`;
      a({ kind: "add-mcp-server", id: u, name: c, moduleId: l }, u, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, s, n) {
    if (i && i !== e) {
      this.applyConnection(e, i, s, n);
      return;
    }
    const o = this._view, r = this.sceneFor(o), a = r.nodes.find((m) => m.id === e);
    if (!a) {
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
    const l = this.viewLayout(o), c = a.parentId ? r.nodes.find((m) => m.id === a.parentId) : void 0, u = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(o, { ...l, nodes: { ...l.nodes, [e]: u } });
  }
  renderPalette() {
    if (!this._paletteOpen || this._view !== "context-map") return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = H.PALETTE_NEW.filter(
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
    var t, i, s, n, o, r, a, l, c, u, m, h, f, w, I, N, v, O, q, $, x, b, k, P, L, M, R, B, Y, p, y, g, _;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${z(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: z(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${z(e)}`, name: e });
        else if (this._newContextMapKind === "external-ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${z(e)}`, name: e, external: !0 });
        else if (this._newContextMapKind === "mcp-gateway")
          this.command({ kind: "add-mcp-gateway", id: `mcpgw-${z(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${z(e)}`, name: e });
        else if (this._newContextMapKind === "api")
          this.command({ kind: "add-api", id: `api-${z(e)}`, name: e });
        else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${z(e)}`, name: e });
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const S = (t = (this.model.apis ?? []).find((E) => E.id === this._selectedId)) == null ? void 0 : t.id, A = this._newApiId || S || ((s = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : s.id);
          if (!A) return;
          this.command({
            kind: "add-api-operation",
            apiId: A,
            id: `apiop-${A.replace(/^api-/, "")}-${z(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const S = (n = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : n.id, A = this._newModuleId || S || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!A) return;
          this.command({ kind: "add-domain-event", id: `ev-${z(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const S = (r = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : r.id, A = this._newModuleId || S || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!A) return;
          this.command({ kind: "add-application-event", id: `aev-${z(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const S = (l = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : l.id, A = this._newModuleId || S || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!A) return;
          this.command({ kind: "add-domain-service", id: `ds-${z(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const S = (u = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : u.id, A = this._newModuleId || S || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!A) return;
          this.command({ kind: "add-query-service", id: `qs-${z(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const S = (h = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : h.id, A = this._newModuleId || S || ((f = this.model.modules[0]) == null ? void 0 : f.id);
          if (!A) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: A });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const S = (w = this.model.modules.find((E) => E.id === this._selectedId)) == null ? void 0 : w.id, A = this._newModuleId || S || ((I = this.model.modules[0]) == null ? void 0 : I.id);
          if (!A) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: A, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const S = (N = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : N.id, A = this._newExternalId || S || ((v = this.model.externalSystems[0]) == null ? void 0 : v.id);
          if (!A) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${z(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const S = (O = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : O.id, A = this._newExternalId || S || ((q = this.model.externalSystems[0]) == null ? void 0 : q.id);
          if (!A) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${z(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "mcp-server") {
          const S = ($ = this.model.externalSystems.find((E) => E.id === this._selectedId)) == null ? void 0 : $.id, A = this._newExternalId || S || ((x = this.model.externalSystems[0]) == null ? void 0 : x.id);
          if (!A) return;
          this.command({
            kind: "add-mcp-server",
            id: `mcpsrv-${z(e)}`,
            name: e,
            moduleId: A
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const S = (b = (this.model.aggregates ?? []).find((E) => E.id === this._selectedId)) == null ? void 0 : b.id, A = this._newAggregateId || S || ((P = (k = this.model.aggregates) == null ? void 0 : k[0]) == null ? void 0 : P.id);
          if (!A) return;
          this.command({ kind: "add-read-model", id: `rm-${z(e)}`, name: e, aggregateId: A });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${z(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const S = this._newModuleId || ((L = this.model.modules[0]) == null ? void 0 : L.id);
        if (!S) return;
        this.command({ kind: "add-aggregate", id: `agg-${z(e)}`, name: e, moduleId: S });
      } else if (this._view === "flows") {
        const S = this._newTriggerAggId || ((R = (M = this.model.aggregates) == null ? void 0 : M[0]) == null ? void 0 : R.id), A = this._newTargetId || ((B = this.model.modules[0]) == null ? void 0 : B.id), E = this._newTriggerEvent.trim();
        if (!S || !A || !E) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: S,
          triggerEvent: E,
          targetId: A
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const S = this._newModuleId || ((Y = this.model.modules[0]) == null ? void 0 : Y.id);
        if (!S) return;
        this.command({
          kind: "add-process",
          id: `proc-${z(e)}`,
          name: e,
          moduleId: S,
          triggerAggregateId: this._newTriggerAggId || ((y = (p = this.model.aggregates) == null ? void 0 : p[0]) == null ? void 0 : y.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${z(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((_ = (g = this.model.aggregates) == null ? void 0 : g[0]) == null ? void 0 : _.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? Cs(i, t.nodes) : e === "flows" ? Ls(i, t.nodes) : e === "processes" ? Oi(i, t.nodes) : e === "workflows" ? jd(i, t.nodes) : e === "eventstorming" ? Vd(i, t.nodes) : _s(i, t.nodes, this._detail, t.sizes ?? {});
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
    }, r = await Qd(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
          ${tl.map(
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
              ${il.map(
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
        ${el.map(
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
H.styles = _i`
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
H.PALETTE_NEW = [
  { type: "module", label: "Contexto" },
  { type: "actor", label: "Actor" },
  { type: "external-system", label: "Sistema externo" },
  { type: "ai-agent", label: "Agente IA" },
  { type: "external-ai-agent", label: "Agente IA externo" },
  { type: "mcp-gateway", label: "Gateway MCP" },
  { type: "rag", label: "RAG" },
  { type: "api", label: "API" },
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
K([
  Se({ attribute: !1 })
], H.prototype, "model", 2);
K([
  Se({ attribute: !1 })
], H.prototype, "layout", 2);
K([
  Se({ attribute: !1 })
], H.prototype, "diff", 2);
K([
  U()
], H.prototype, "_view", 2);
K([
  U()
], H.prototype, "_detail", 2);
K([
  U()
], H.prototype, "_relationType", 2);
K([
  U()
], H.prototype, "_relationPicker", 2);
K([
  U()
], H.prototype, "_extDepPicker", 2);
K([
  U()
], H.prototype, "_selectedId", 2);
K([
  U()
], H.prototype, "_paletteOpen", 2);
K([
  U()
], H.prototype, "_paletteFilter", 2);
K([
  U()
], H.prototype, "_newName", 2);
K([
  U()
], H.prototype, "_newSubdomain", 2);
K([
  U()
], H.prototype, "_newModuleId", 2);
K([
  U()
], H.prototype, "_newContextMapKind", 2);
K([
  U()
], H.prototype, "_newAggregateId", 2);
K([
  U()
], H.prototype, "_newExternalId", 2);
K([
  U()
], H.prototype, "_newApiId", 2);
K([
  U()
], H.prototype, "_newArchetype", 2);
K([
  U()
], H.prototype, "_newTriggerAggId", 2);
K([
  U()
], H.prototype, "_newTriggerEvent", 2);
K([
  U()
], H.prototype, "_newTargetId", 2);
K([
  U()
], H.prototype, "_undoStack", 2);
K([
  U()
], H.prototype, "_redoStack", 2);
K([
  U()
], H.prototype, "_newStepName", 2);
K([
  U()
], H.prototype, "_newStepType", 2);
K([
  U()
], H.prototype, "_newStepRole", 2);
K([
  U()
], H.prototype, "_newStepDeadline", 2);
K([
  U()
], H.prototype, "_editStepRole", 2);
K([
  U()
], H.prototype, "_editStepDeadline", 2);
K([
  U()
], H.prototype, "_editStepComp", 2);
K([
  U()
], H.prototype, "_newStepUseCase", 2);
K([
  U()
], H.prototype, "_newStepEmits", 2);
K([
  U()
], H.prototype, "_editStepUseCase", 2);
K([
  U()
], H.prototype, "_editStepEmits", 2);
K([
  U()
], H.prototype, "_editStepAwaits", 2);
K([
  U()
], H.prototype, "_multi", 2);
K([
  U()
], H.prototype, "_newViewName", 2);
K([
  U()
], H.prototype, "_activeViewId", 2);
K([
  U()
], H.prototype, "_newRagSourceType", 2);
K([
  U()
], H.prototype, "_newRagSourceUri", 2);
K([
  U()
], H.prototype, "_addMemberKey", 2);
K([
  U()
], H.prototype, "_treeOpen", 2);
K([
  U()
], H.prototype, "_deletePicker", 2);
H = K([
  ki("modux-editor")
], H);
var rl = Object.defineProperty, al = Object.getOwnPropertyDescriptor, ge = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? al(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
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
    var n, o, r;
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
            const u = await l.json();
            u != null && u.message && (c = u.message);
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
    const s = (o = this._workspace) == null ? void 0 : o.current;
    if (s && s !== i) {
      const a = ((r = this._workspace.solutions.find((l) => l.branch === s)) == null ? void 0 : r.name) ?? s.replace(/^solution\//, "");
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
        const { apiId: o } = await n.json(), r = await fetch(`${this.base}/model`);
        r.ok && (this._model = await r.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${o}`, "info");
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
  U()
], le.prototype, "_model", 2);
ge([
  U()
], le.prototype, "_layout", 2);
ge([
  U()
], le.prototype, "_error", 2);
ge([
  U()
], le.prototype, "_saving", 2);
ge([
  U()
], le.prototype, "_toast", 2);
ge([
  U()
], le.prototype, "_workspace", 2);
ge([
  U()
], le.prototype, "_creatingSolution", 2);
ge([
  U()
], le.prototype, "_newSolutionName", 2);
ge([
  U()
], le.prototype, "_diff", 2);
ge([
  U()
], le.prototype, "_mergeFlow", 2);
le = ge([
  ki("modux-editor-connected")
], le);
export {
  dl as CONTAINER_HEADER,
  ll as CONTAINER_INSET,
  ie as ModuxCanvas,
  H as ModuxEditor,
  le as ModuxEditorConnected,
  Cs as aggregatesScene,
  ze as apiImplNodeId,
  Le as apiOpOccurrenceId,
  ri as containerFit,
  ps as containerMinSize,
  _s as contextMapScene,
  xs as flowCoherence,
  Ls as flowsScene,
  At as normalizeViewLayout,
  Oi as processesScene,
  ws as relationEdgeId,
  xi as resolveOverlaps
};
