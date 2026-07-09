const gl = 34, wl = 10;
function _i(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let r = a + 1; r < e.length; r++) {
        const l = e[a], c = e[r], u = i.get(l.id), h = i.get(c.id), m = h.x - u.x, f = h.y - u.y, y = (l.w + c.w) / 2 + t - Math.abs(m), I = (l.h + c.h) / 2 + t - Math.abs(f);
        if (!(y <= 0 || I <= 0))
          if (o = !0, y < I) {
            const M = (m >= 0 ? 1 : -1) * y / 2;
            u.x -= M, h.x += M;
          } else {
            const M = (f >= 0 ? 1 : -1) * I / 2;
            u.y -= M, h.y += M;
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
function Is(e, t = { w: 160, h: 90 }) {
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
function li(e, t, i) {
  let n = t.w / 2, s = t.w / 2, o = t.h / 2, a = t.h / 2;
  for (const r of i)
    n = Math.max(n, -r.dx + r.w / 2 + 10), s = Math.max(s, r.dx + r.w / 2 + 10), o = Math.max(o, -r.dy + r.h / 2 + 34), a = Math.max(a, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (a - o) / 2,
    w: n + s,
    h: o + a
  };
}
function Ct(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return {
      nodes: t.nodes ?? {},
      edges: t.edges ?? {},
      sizes: t.sizes ?? {},
      detail: t.detail,
      collapsed: t.collapsed
    };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const _s = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, $s = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, ks = {
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
function xn(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: ze(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const vn = 34, In = 14, bs = 14, ve = 108, Ie = 32, _n = 12, $n = 10, gt = 2, Es = gt * ve + (gt - 1) * _n + 2 * In;
function Ss(e, t) {
  return `rel:${e}->${t}`;
}
function As(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function ot(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Cs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, kn = {
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
}, ci = {
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
function ui(e) {
  const t = Math.max(1, Math.ceil(e / gt)), i = t * Ie + (t - 1) * $n;
  return { w: Es, h: vn + i + bs };
}
function Rt(e, t) {
  const i = e % gt, n = Math.floor(e / gt);
  return {
    x: -t.w / 2 + In + i * (ve + _n) + ve / 2,
    y: -t.h / 2 + vn + n * (Ie + $n) + Ie / 2
  };
}
function Ms(e, t, i, n, s, o, a = !1) {
  const r = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...xn(e, t.id),
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
    return [{ ...n, x: i.x, y: i.y, w: Ye, h: je }];
  if (a) {
    const c = new Map((e.apis ?? []).map((h) => [h.id, h])), u = (e.apiImplementations ?? []).filter((h) => h.moduleId === t.id && c.has(h.apiId)).map((h) => {
      const m = c.get(h.apiId);
      return {
        id: ze(h.apiId, h.moduleId),
        name: m.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${m.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (m.operations ?? []).map((f) => ({
          id: Le(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (u.length > 0) {
      const h = l.filter((m) => m.kind !== "api-impl");
      return bn(i, n, u, h, s, o);
    }
  }
  return ct(i, n, l, s, o);
}
function bn(e, t, i, n, s, o, a = /* @__PURE__ */ new Set()) {
  const r = o[t.id] ?? ui(i.length + n.length), l = i.map((f, y) => {
    const I = s[f.id] ?? Rt(y, r), M = a.has(f.id) ? [] : f.ops, _ = o[f.id] ?? ui(M.length), P = M.map((K, v) => s[K.id] ?? Rt(v, _)), H = li(
      { x: I.x, y: I.y },
      _,
      P.map((K) => ({ dx: K.x, dy: K.y, w: ve, h: Ie }))
    );
    return { a: f, off: I, ops: M, opOffs: P, fit: H };
  }), c = n.map(
    (f, y) => s[f.id] ?? Rt(i.length + y, r)
  ), u = _i(
    [
      ...l.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...n.map((f, y) => ({
        id: f.id,
        x: c[y].x,
        y: c[y].y,
        w: ve,
        h: Ie
      }))
    ],
    24
  );
  for (const f of l) {
    const y = u.get(f.a.id);
    y && (f.off = { x: f.off.x + (y.x - f.fit.x), y: f.off.y + (y.y - f.fit.y) }, f.fit = { ...f.fit, x: y.x, y: y.y });
  }
  n.forEach((f, y) => {
    const I = u.get(f.id);
    I && (c[y] = { x: I.x, y: I.y });
  });
  const h = li(e, r, [
    ...l.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...c.map((f) => ({ dx: f.x, dy: f.y, w: ve, h: Ie }))
  ]), m = [
    { ...t, x: h.x, y: h.y, w: h.w, h: h.h, container: !0 }
  ];
  for (const f of l)
    m.push({
      id: f.a.id,
      label: f.a.name,
      kind: f.a.kind,
      symbol: "interface",
      fill: f.a.fill,
      stroke: f.a.stroke,
      badge: f.a.badge,
      container: !0,
      collapsible: f.a.ops.length > 0 || a.has(f.a.id),
      collapsed: a.has(f.a.id),
      parentId: t.id,
      x: e.x + f.fit.x,
      y: e.y + f.fit.y,
      w: f.fit.w,
      h: f.fit.h,
      tooltip: f.a.tooltip
    }), f.ops.forEach((y, I) => {
      m.push({
        id: y.id,
        label: y.name,
        kind: f.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: f.a.id,
        x: e.x + f.off.x + f.opOffs[I].x,
        y: e.y + f.off.y + f.opOffs[I].y,
        w: ve,
        h: Ie,
        tooltip: `${ci[f.a.opKind]}: ${y.name}`
      });
    });
  return n.forEach((f, y) => {
    const I = kn[f.kind];
    m.push({
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + c[y].x,
      y: e.y + c[y].y,
      w: ve,
      h: Ie,
      symbol: I.symbol,
      fill: I.fill,
      stroke: I.stroke,
      parentId: t.id,
      tooltip: `${ci[f.kind]} ${f.name}`
    });
  }), m;
}
function ct(e, t, i, n, s) {
  const o = s[t.id] ?? ui(i.length), a = i.map((h, m) => n[h.id] ?? Rt(m, o)), r = _i(
    i.map((h, m) => ({ id: h.id, x: a[m].x, y: a[m].y, w: ve, h: Ie })),
    10
  );
  i.forEach((h, m) => {
    const f = r.get(h.id);
    f && (a[m] = { x: f.x, y: f.y });
  });
  const l = li(
    e,
    o,
    a.map((h) => ({ dx: h.x, dy: h.y, w: ve, h: Ie }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, u = i.map((h, m) => {
    const f = a[m], y = h.policy ? Cs : kn[h.kind];
    return {
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: ve,
      h: Ie,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${h.policy ? "Policy" : ci[h.kind]} ${h.name}`
    };
  });
  return [c, ...u];
}
function Ps(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const o = s, a = i !== "contexts", r = i === "operations", l = new Set(e.externalSystems.map((d) => d.id)), c = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), u = new Set(c.map((d) => d.id)), h = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), m = new Set(h.map((d) => d.id)), f = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((d) => !u.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((d) => !m.has(d.id)).map((d) => ({ ref: d, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], y = f.flatMap((d, A) => {
    const q = t[d.ref.id] ?? ot(A, f.length);
    if ("workflow" in d && d.workflow) {
      const Y = d.ref;
      return [{
        id: Y.id,
        label: Y.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${Y.name} — workflow${Y.triggerEvent ? ` · arranca con ${Y.triggerEvent}` : ""}`,
        x: q.x,
        y: q.y,
        w: Ye,
        h: je
      }];
    }
    if (d.proxy) {
      const Y = d.ref, me = {
        id: Y.id,
        label: Y.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${Y.name} — proxy/cache de una API, consumible como ella`
      };
      if (r && Y.targetApiId) {
        const fe = (e.apis ?? []).find((ke) => ke.id === Y.targetApiId), ie = (fe == null ? void 0 : fe.operations) ?? [];
        if (ie.length > 0)
          return ct(
            q,
            me,
            ie.map((ke) => ({
              id: Le(ke.id, Y.id),
              name: ke.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...me, x: q.x, y: q.y, w: Ye, h: je }];
    }
    if (d.api) {
      const Y = d.ref, me = {
        id: Y.id,
        label: Y.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${Y.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (s.has(Y.id) ? !a : a) && Y.operations.length > 0 ? ct(
        q,
        { ...me, collapsible: !0, collapsed: !1 },
        Y.operations.map(
          (ie) => ({ id: ie.id, name: ie.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...me,
        collapsible: Y.operations.length > 0,
        collapsed: Y.operations.length > 0,
        x: q.x,
        y: q.y,
        w: Ye,
        h: je
      }];
    }
    if (d.external) {
      const Y = d.ref, me = {
        id: Y.id,
        label: Y.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${Y.name} (sistema externo)`
      }, fe = c.filter((ee) => ee.publishedByExternalSystemId === Y.id), ie = h.filter((ee) => ee.publishedByExternalSystemId === Y.id), ke = s.has(Y.id) ? !a : a, Ui = [
        ...ie.map((ee) => ({ id: ee.id, name: ee.name, kind: "proxy-api" })),
        ...ke ? [
          ...(Y.useCases ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "external-use-case" })
          ),
          ...(Y.tables ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "external-table" })
          ),
          ...(Y.mcpServers ?? []).map(
            (ee) => ({ id: ee.id, name: ee.name, kind: "mcp-server" })
          )
        ] : []
      ], St = (Y.useCases ?? []).length > 0 || (Y.tables ?? []).length > 0 || (Y.mcpServers ?? []).length > 0 || r && fe.length > 0, ei = r && ke ? ie.filter((ee) => {
        const nt = ee.targetApiId ? (e.apis ?? []).find((ae) => ae.id === ee.targetApiId) : void 0;
        return ((nt == null ? void 0 : nt.operations) ?? []).length > 0;
      }) : [];
      if (r && ke && (fe.length > 0 || ei.length > 0)) {
        const ee = [
          ...fe.map((ae) => ({
            id: ae.id,
            name: ae.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ae.name} — API publicada por ${Y.name}`,
            opKind: "api-operation",
            ops: (ae.operations ?? []).map((st) => ({ id: st.id, name: st.name }))
          })),
          ...ei.map((ae) => {
            const st = (e.apis ?? []).find((At) => At.id === ae.targetApiId);
            return {
              id: ae.id,
              name: ae.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ae.name} — proxy/cache de ${st.name}`,
              opKind: "api-op-occurrence",
              ops: (st.operations ?? []).map((At) => ({
                id: Le(At.id, ae.id),
                name: At.name
              }))
            };
          })
        ], nt = new Set(ei.map((ae) => ae.id));
        return bn(
          q,
          { ...me, collapsible: !0, collapsed: !1 },
          ee,
          Ui.filter((ae) => !nt.has(ae.id)),
          t,
          n,
          o
        );
      }
      const Di = [
        ...fe.map((ee) => ({ id: ee.id, name: ee.name, kind: "api" })),
        ...Ui
      ];
      return Di.length > 0 ? ct(
        q,
        { ...me, collapsible: St, collapsed: St && !ke },
        Di,
        t,
        n
      ) : [{
        ...me,
        collapsible: St,
        collapsed: St && !ke,
        x: q.x,
        y: q.y,
        w: Ye,
        h: je
      }];
    }
    const j = d.ref, Q = j.subdomainType ?? "GENERIC", re = {
      id: j.id,
      label: j.name,
      kind: "module",
      symbol: "component",
      fill: _s[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${j.name} — subdominio ${Q}`
    }, xe = xn(e, j.id), Ne = (e.aggregates ?? []).some((Y) => Y.moduleId === j.id) || (j.useCases ?? []).length > 0 || (j.domainEvents ?? []).length > 0 || (j.applicationEvents ?? []).length > 0 || (j.readModels ?? []).length > 0 || (j.domainServices ?? []).length > 0 || (j.queryServices ?? []).length > 0;
    return (s.has(j.id) ? !a : a) && (Ne || xe.length > 0) ? Ms(
      e,
      j,
      q,
      { ...re, collapsible: !0, collapsed: !1 },
      t,
      n,
      r
    ) : xe.length > 0 ? ct(
      q,
      { ...re, collapsible: Ne, collapsed: Ne },
      xe,
      t,
      n
    ) : [{
      ...re,
      collapsible: Ne,
      collapsed: Ne,
      x: q.x,
      y: q.y,
      w: Ye,
      h: je
    }];
  }), I = f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, A) => {
    const q = t[d.id] ?? ot(f.length + A, I);
    y.push({
      id: d.id,
      label: d.name,
      x: q.x,
      y: q.y,
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
    const q = t[d.id] ?? ot(f.length + (e.actors ?? []).length + A, I);
    y.push({
      id: d.id,
      label: d.name,
      x: q.x,
      y: q.y,
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
    const q = t[d.id] ?? ot(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + A,
      I
    );
    y.push({
      id: d.id,
      label: d.name,
      x: q.x,
      y: q.y,
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
  const M = [];
  (e.rags ?? []).forEach((d, A) => {
    const q = t[d.id] ?? ot(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + A,
      I
    );
    y.push({
      id: d.id,
      label: d.name,
      x: q.x,
      y: q.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((j, Q) => {
      const re = `ragcs:${d.id}:${j.uri}`, xe = t[re] ?? { x: q.x + 170, y: q.y - 30 + Q * 44 };
      y.push({
        id: re,
        label: j.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: xe.x,
        y: xe.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: j.type,
        tooltip: `${j.type}: ${j.uri}`
      }), M.push({
        id: `ragcse:${d.id}:${j.uri}`,
        sourceId: re,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), y.sort((d, A) => (d.parentId ? 1 : 0) - (A.parentId ? 1 : 0));
  const _ = e.relations.map((d) => ({
    id: Ss(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? $s[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), P = e.flows.map((d) => {
    var xe, Ne, Jt, Y, me, fe;
    const A = As(e, d), q = a ? e.modules.find((ie) => ie.id === d.sourceId) : void 0, j = ((xe = q == null ? void 0 : q.domainEvents) == null ? void 0 : xe.find((ie) => ie.name === d.triggerEvent)) ?? ((Ne = q == null ? void 0 : q.applicationEvents) == null ? void 0 : Ne.find((ie) => ie.name === d.triggerEvent)), Q = a && d.readModelName ? (Y = (Jt = e.modules.find((ie) => ie.id === d.targetId)) == null ? void 0 : Jt.readModels) == null ? void 0 : Y.find((ie) => ie.name === d.readModelName) : void 0, re = a && d.targetUseCaseId ? (fe = (me = e.modules.find((ie) => ie.id === d.targetId)) == null ? void 0 : me.useCases) == null ? void 0 : fe.find((ie) => ie.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (j == null ? void 0 : j.id) ?? d.sourceId,
      targetId: (re == null ? void 0 : re.id) ?? (Q == null ? void 0 : Q.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: ks[A],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${A}`
    };
  }), H = new Map((e.apis ?? []).map((d) => [d.id, d])), K = new Set(e.modules.map((d) => d.id)), v = (e.apiImplementations ?? []).filter(
    (d) => H.has(d.apiId) && K.has(d.moduleId)
  ), g = new Set(y.map((d) => d.id)), $ = a ? (e.emissions ?? []).filter((d) => g.has(d.sourceId) && g.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], E = a ? (e.projections ?? []).map((d) => ({
    p: d,
    source: d.sourceAggregateId ?? d.sourceExternalUseCaseId ?? d.sourceExternalTableId
  })).filter(({ p: d, source: A }) => A && d.readModelId).filter(({ p: d, source: A }) => g.has(A) && g.has(d.readModelId)).map(({ p: d, source: A }) => ({
    id: `proj:${d.id}`,
    sourceId: A,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], D = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((A) => {
      const q = a && A.targetUseCaseId && g.has(A.targetUseCaseId) ? A.targetUseCaseId : A.targetModuleId && g.has(A.targetModuleId) ? A.targetModuleId : (A.targetUseCaseId && !a, null);
      if (!q) return [];
      const j = a && g.has(A.id) ? A.id : d.id;
      return g.has(j) ? [
        {
          id: `apiwire:${A.id}`,
          sourceId: j,
          targetId: q,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${A.name} la implementa ${q}`
        }
      ] : [];
    })
  ), C = a ? (e.useCaseCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], N = a ? (e.queryCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], G = a ? (e.actorUses ?? []).filter((d) => g.has(d.actorId) && g.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], X = (e.actorExternalDependencies ?? []).filter((d) => g.has(d.actorId) && g.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), p = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), x = (d) => g.has(d) ? d : p.get(d) ?? d, w = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: x(d.targetId),
        cqrs: d.type === "CQRS"
      })).filter(
        (d) => g.has(d.sourceId) && g.has(d.targetId) && d.sourceId !== d.targetId
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
  ], k = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const A of d.useCases ?? []) k.set(A.id, d.id);
    for (const A of d.domainEvents ?? []) k.set(A.id, d.id);
    for (const A of d.applicationEvents ?? []) k.set(A.id, d.id);
  }
  const T = (d) => g.has(d) ? d : k.get(d) ?? d, L = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const A of d.domainEvents ?? []) L.set(A.name, A.id);
    for (const A of d.applicationEvents ?? []) L.set(A.name, A.id);
  }
  const b = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((A) => A.targetUseCaseId).map((A) => ({ sourceId: d.id, targetId: T(A.targetUseCaseId) }))
      ).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => [
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
  ], S = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && L.has(d.triggerEvent)).map((d) => ({
        sourceId: T(L.get(d.triggerEvent)),
        targetId: d.id,
        label: d.triggerEvent
      })).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => [
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
  ], O = /* @__PURE__ */ new Map();
  for (const d of e.externalSystems)
    for (const A of d.tables ?? []) O.set(A.id, d.id);
  const Z = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((A) => ({
          sourceId: g.has(A) ? A : O.get(A) ?? A,
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => [
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
  ], J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((A) => ({
          sourceId: x(A),
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => [
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
  ], ce = [
    ...new Map(
      (e.rags ?? []).flatMap((d) => [
        ...(d.sourceExternalSystemIds ?? []).map((A) => ({ sourceId: A, targetId: d.id, name: d.name })),
        ...(d.sourceModuleIds ?? []).map((A) => ({ sourceId: A, targetId: d.id, name: d.name }))
      ]).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => [
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
  ], we = [
    ...new Map(
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: x(d.apiId) })).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => [
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
  ], ue = (d) => d.onCompletionEventName || `${d.name.replace(/\s+/g, "")}Completado`, ye = (e.workflows ?? []).flatMap(
    (d) => d.triggerEvent ? (e.workflows ?? []).filter((A) => A.id !== d.id && ue(A) === d.triggerEvent).filter((A) => g.has(A.id) && g.has(d.id)).map((A) => ({
      id: `wfchain:${A.id}->${d.id}`,
      sourceId: A.id,
      targetId: d.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: d.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), it = [
    ...new Map(
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: x(d.id), targetId: x(d.targetApiId) })).filter(
        (d) => g.has(d.sourceId) && g.has(d.targetId) && d.sourceId !== d.targetId
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
  ], ns = v.flatMap((d) => {
    const A = ze(d.apiId, d.moduleId);
    if (!g.has(A)) return [];
    const q = [];
    for (const j of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === d.apiId)) {
      const Q = x(j.id);
      g.has(Q) && Q !== A && q.push({
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
    return q;
  }), ss = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const A = (e.proxyApis ?? []).find((Q) => Q.id === d.proxyId);
    if (!(A != null && A.targetApiId)) return [];
    const q = Le(d.operationId, d.proxyId), j = d.targetSiteId === A.targetApiId ? A.targetApiId : ze(A.targetApiId, d.targetSiteId);
    return !g.has(q) || !g.has(j) ? [] : [{
      id: `oproute:${q}->${j}`,
      sourceId: q,
      targetId: j,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), os = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!g.has(d.externalSystemId)) return null;
        const A = (e.apis ?? []).find(
          (re) => re.operations.some((xe) => xe.id === d.operationId)
        );
        if (!A) return null;
        const q = d.siteId === A.id, j = q ? d.operationId : Le(d.operationId, d.siteId);
        let Q = g.has(j) ? j : null;
        return Q || (q || (e.proxyApis ?? []).some((re) => re.id === d.siteId) ? Q = x(d.siteId) : Q = ze(A.id, d.siteId)), !Q || !g.has(Q) || Q === d.externalSystemId ? null : { u: d, target: Q };
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
  ], as = a ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!g.has(d.useCaseId)) return [];
    const A = g.has(Le(d.operationId, d.moduleId)) ? Le(d.operationId, d.moduleId) : g.has(ze(d.apiId, d.moduleId)) ? ze(d.apiId, d.moduleId) : g.has(x(d.moduleId)) ? x(d.moduleId) : null;
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
  }) : [], rs = a ? (e.agentUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], ds = (e.agentRags ?? []).filter((d) => g.has(d.agentId) && g.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), ls = a ? (e.rags ?? []).filter((d) => g.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((A) => g.has(A)).map((A) => ({
      id: `ragsrc:${d.id}->${A}`,
      sourceId: d.id,
      targetId: A,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], cs = a ? (e.agentExternalUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], us = a ? (e.agentMcpUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], ps = (e.mcpGateways ?? []).flatMap(
    (d) => [
      ...d.mcpServerIds ?? [],
      ...d.apiIds ?? [],
      ...d.apiOperationIds ?? [],
      ...d.useCaseIds ?? [],
      ...d.ragIds ?? []
    ].filter((A) => g.has(d.id) && g.has(A)).map((A) => ({
      id: `gwx:${d.id}->${A}`,
      sourceId: d.id,
      targetId: A,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), hs = (e.agentGatewayUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), ms = a ? (e.agentApiOpUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], fs = a ? (e.agentQueryUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], gs = (e.agentDelegations ?? []).filter((d) => g.has(d.agentId) && g.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), ws = (e.actorAgentUses ?? []).filter((d) => g.has(d.actorId) && g.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), ys = a ? (e.agentTriggers ?? []).filter((d) => g.has(d.eventId) && g.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], xs = a ? (e.externalCalls ?? []).filter((d) => g.has(d.externalSystemId) && g.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], vs = a ? (e.externalUseCaseCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
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
    nodes: y,
    edges: [
      ..._,
      ...P,
      ...$,
      ...E,
      ...D,
      ...C,
      ...N,
      ...G,
      ...X,
      ...w,
      ...it,
      ...ns,
      ...ss,
      ...os,
      ...as,
      ...b,
      ...S,
      ...ye,
      ...we,
      ...Z,
      ...J,
      ...ce,
      ...rs,
      ...cs,
      ...us,
      ...ps,
      ...hs,
      ...ms,
      ...fs,
      ...gs,
      ...ws,
      ...ys,
      ...ds,
      ...ls,
      ...M,
      ...xs,
      ...vs
    ]
  };
}
const Ns = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ts = 176, Os = 60, Rs = 140, Us = 40;
function Ds(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const a = 220 + o * 340;
    i.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const u = n.filter((m) => m.aggregateId === l.id).length, h = 140 + c * (170 + u * 60);
      t[l.id] = { x: a, y: h }, n.filter((m) => m.aggregateId === l.id).forEach((m, f) => {
        t[m.id] = { x: a + 60, y: h + 100 + f * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Ls(e, t) {
  const i = Ds(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const u = s.get(c.moduleId), h = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", m = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: m.x,
      y: m.y,
      w: Ts,
      h: Os,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ns[h],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${u ? ` — módulo ${u.name} (${h})` : ""}`
    };
  }), a = (e.entities ?? []).map((c) => {
    const u = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: u.x,
      y: u.y,
      w: Rs,
      h: Us,
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
const zs = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, qs = 150, Fs = 44, Vs = 190, Hs = 56, Ks = 160, Ws = 48;
function Gs(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function Bs(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), a = (r) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((u) => u.id === r)) == null ? void 0 : c.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const c = 120 + l * 130, u = zs[r.archetype] ?? "#475569", h = r.triggerAggregateId ?? r.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const M = t[h] ?? { x: 160, y: c };
      n.push({
        id: h,
        label: r.triggerAggregateId ? a(r.triggerAggregateId) : h,
        x: M.x,
        y: M.y,
        w: qs,
        h: Fs,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const m = `flow:${r.id}`, f = t[m] ?? { x: 470, y: c };
    n.push({
      id: m,
      label: r.name,
      x: f.x,
      y: f.y,
      w: Vs,
      h: Hs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const y = Gs(e, r), I = `tgt:${y.id}`;
    if (!o.has(I)) {
      o.add(I);
      const M = t[I] ?? { x: 790, y: c };
      n.push({
        id: I,
        label: y.label,
        x: M.x,
        y: M.y,
        w: Ks,
        h: Ws,
        kind: y.external ? "external-system" : "module",
        symbol: "component",
        fill: y.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: y.external,
        badge: y.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${r.id}:in`,
      sourceId: h,
      targetId: m,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${r.id}:out`,
      sourceId: m,
      targetId: I,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const Ys = 190, js = 56, ti = 170, Xs = 52;
function Li(e, t) {
  const i = [], n = [], s = (o) => {
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
      w: Ys,
      h: js,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((u, h) => {
      const m = u.type === "HUMAN", f = t[u.id] ?? { x: 150 + (h + 1) * 240, y: r };
      if (i.push({
        id: u.id,
        label: u.name,
        x: f.x,
        y: f.y,
        w: ti,
        h: Xs,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${h}`,
        sourceId: c,
        targetId: u.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const y = `comp:${u.id}`, I = t[y] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: y,
          label: u.compensationUseCaseId,
          x: I.x,
          y: I.y,
          w: ti,
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
          targetId: y,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = u.id;
    }), o.onCompletionEventName) {
      const u = `done:${o.id}`, h = t[u] ?? { x: 150 + (o.steps.length + 1) * 240, y: r };
      i.push({
        id: u,
        label: o.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: ti,
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
const Ut = globalThis, $i = Ut.ShadowRoot && (Ut.ShadyCSS === void 0 || Ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ki = Symbol(), zi = /* @__PURE__ */ new WeakMap();
let En = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== ki) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if ($i && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = zi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && zi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Qs = (e) => new En(typeof e == "string" ? e : e + "", void 0, ki), bi = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new En(i, e, ki);
}, Zs = (e, t) => {
  if ($i) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = Ut.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, qi = $i ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Qs(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Js, defineProperty: eo, getOwnPropertyDescriptor: to, getOwnPropertyNames: io, getOwnPropertySymbols: no, getPrototypeOf: so } = Object, Re = globalThis, Fi = Re.trustedTypes, oo = Fi ? Fi.emptyScript : "", ii = Re.reactiveElementPolyfillSupport, ht = (e, t) => e, Ft = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? oo : null;
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
} }, Ei = (e, t) => !Js(e, t), Vi = { attribute: !0, type: String, converter: Ft, reflect: !1, useDefault: !1, hasChanged: Ei };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Re.litPropertyMetadata ?? (Re.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Xe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Vi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && eo(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = to(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: s, set(a) {
      const r = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Vi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ht("elementProperties"))) return;
    const t = so(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ht("properties"))) {
      const i = this.properties, n = [...io(i), ...no(i)];
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
      for (const s of n) i.unshift(qi(s));
    } else t !== void 0 && i.push(qi(t));
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
    return Zs(t, this.constructor.elementStyles), t;
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
      const a = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Ft).toAttribute(i, n.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : Ft;
      this._$Em = s;
      const c = l.fromAttribute(i, r.type);
      this[s] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? Ei)(o, i) || n.useDefault && n.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, a) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, a] of s) {
        const { wrapped: r } = a, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, a, l);
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
Xe.elementStyles = [], Xe.shadowRootOptions = { mode: "open" }, Xe[ht("elementProperties")] = /* @__PURE__ */ new Map(), Xe[ht("finalized")] = /* @__PURE__ */ new Map(), ii == null || ii({ ReactiveElement: Xe }), (Re.reactiveElementVersions ?? (Re.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, Hi = (e) => e, Vt = mt.trustedTypes, Ki = Vt ? Vt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Sn = "$lit$", Oe = `lit$${Math.random().toFixed(9).slice(2)}$`, An = "?" + Oe, ao = `<${An}>`, We = document, wt = () => We.createComment(""), yt = (e) => e === null || typeof e != "object" && typeof e != "function", Si = Array.isArray, ro = (e) => Si(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ni = `[ 	
\f\r]`, at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wi = /-->/g, Gi = />/g, Ue = RegExp(`>|${ni}(?:([^\\s"'>=/]+)(${ni}*=${ni}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Bi = /'/g, Yi = /"/g, Cn = /^(?:script|style|textarea|title)$/i, Mn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), R = Mn(1), B = Mn(2), Ze = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), ji = /* @__PURE__ */ new WeakMap(), qe = We.createTreeWalker(We, 129);
function Pn(e, t) {
  if (!Si(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ki !== void 0 ? Ki.createHTML(t) : t;
}
const lo = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = at;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let c, u, h = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, u = a.exec(l), u !== null); ) m = a.lastIndex, a === at ? u[1] === "!--" ? a = Wi : u[1] !== void 0 ? a = Gi : u[2] !== void 0 ? (Cn.test(u[2]) && (s = RegExp("</" + u[2], "g")), a = Ue) : u[3] !== void 0 && (a = Ue) : a === Ue ? u[0] === ">" ? (a = s ?? at, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? Ue : u[3] === '"' ? Yi : Bi) : a === Yi || a === Bi ? a = Ue : a === Wi || a === Gi ? a = at : (a = Ue, s = void 0);
    const f = a === Ue && e[r + 1].startsWith("/>") ? " " : "";
    o += a === at ? l + ao : h >= 0 ? (n.push(c), l.slice(0, h) + Sn + l.slice(h) + Oe + f) : l + Oe + (h === -2 ? r : f);
  }
  return [Pn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class xt {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, l = this.parts, [c, u] = lo(t, i);
    if (this.el = xt.createElement(c, n), qe.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = qe.nextNode()) !== null && l.length < r; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Sn)) {
          const m = u[a++], f = s.getAttribute(h).split(Oe), y = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: o, name: y[2], strings: f, ctor: y[1] === "." ? uo : y[1] === "?" ? po : y[1] === "@" ? ho : jt }), s.removeAttribute(h);
        } else h.startsWith(Oe) && (l.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Cn.test(s.tagName)) {
          const h = s.textContent.split(Oe), m = h.length - 1;
          if (m > 0) {
            s.textContent = Vt ? Vt.emptyScript : "";
            for (let f = 0; f < m; f++) s.append(h[f], wt()), qe.nextNode(), l.push({ type: 2, index: ++o });
            s.append(h[m], wt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === An) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(Oe, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += Oe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = We.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Je(e, t, i = e, n) {
  var a, r;
  if (t === Ze) return t;
  let s = n !== void 0 ? (a = i._$Co) == null ? void 0 : a[n] : i._$Cl;
  const o = yt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((r = s == null ? void 0 : s._$AO) == null || r.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Je(e, s._$AS(e, t.values), s, n)), t;
}
class co {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? We).importNode(i, !0);
    qe.currentNode = s;
    let o = qe.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new kt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new mo(o, this, t)), this._$AV.push(c), l = n[++r];
      }
      a !== (l == null ? void 0 : l.index) && (o = qe.nextNode(), a++);
    }
    return qe.currentNode = We, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class kt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Je(this, t, i), yt(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== Ze && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ro(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && yt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(We.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = xt.createElement(Pn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const a = new co(s, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = ji.get(t.strings);
    return i === void 0 && ji.set(t.strings, i = new xt(t)), i;
  }
  k(t) {
    Si(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new kt(this.O(wt()), this.O(wt()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = Hi(t).nextSibling;
      Hi(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class jt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = se;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = Je(this, t, i, 0), a = !yt(t) || t !== this._$AH && t !== Ze, a && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = Je(this, r[n + l], i, l), c === Ze && (c = this._$AH[l]), a || (a = !yt(c) || c !== this._$AH[l]), c === se ? t = se : t !== se && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class uo extends jt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class po extends jt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class ho extends jt {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Je(this, t, i, 0) ?? se) === Ze) return;
    const n = this._$AH, s = t === se && n !== se || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== se && (n === se || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class mo {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Je(this, t);
  }
}
const si = mt.litHtmlPolyfillSupport;
si == null || si(xt, kt), (mt.litHtmlVersions ?? (mt.litHtmlVersions = [])).push("3.3.3");
const fo = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new kt(t.insertBefore(wt(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = fo(i, this.renderRoot, this.renderOptions);
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
var yn;
He._$litElement$ = !0, He.finalized = !0, (yn = Ve.litElementHydrateSupport) == null || yn.call(Ve, { LitElement: He });
const oi = Ve.litElementPolyfillSupport;
oi == null || oi({ LitElement: He });
(Ve.litElementVersions ?? (Ve.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ai = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const go = { attribute: !0, type: String, converter: Ft, reflect: !1, hasChanged: Ei }, wo = (e = go, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Se(e) {
  return (t, i) => typeof i == "object" ? wo(e, t, i) : ((n, s, o) => {
    const a = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), a ? Object.getOwnPropertyDescriptor(s, o) : void 0;
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
var pi = "http://www.w3.org/1999/xhtml";
const Xi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: pi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Xt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Xi.hasOwnProperty(t) ? { space: Xi[t], local: e } : e;
}
function yo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === pi && t.documentElement.namespaceURI === pi ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function xo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Nn(e) {
  var t = Xt(e);
  return (t.local ? xo : yo)(t);
}
function vo() {
}
function Ci(e) {
  return e == null ? vo : function() {
    return this.querySelector(e);
  };
}
function Io(e) {
  typeof e != "function" && (e = Ci(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = new Array(a), l, c, u = 0; u < a; ++u)
      (l = o[u]) && (c = e.call(l, l.__data__, u, o)) && ("__data__" in l && (c.__data__ = l.__data__), r[u] = c);
  return new he(n, this._parents);
}
function _o(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function $o() {
  return [];
}
function Tn(e) {
  return e == null ? $o : function() {
    return this.querySelectorAll(e);
  };
}
function ko(e) {
  return function() {
    return _o(e.apply(this, arguments));
  };
}
function bo(e) {
  typeof e == "function" ? e = ko(e) : e = Tn(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && (n.push(e.call(l, l.__data__, c, a)), s.push(l));
  return new he(n, s);
}
function On(e) {
  return function() {
    return this.matches(e);
  };
}
function Rn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Eo = Array.prototype.find;
function So(e) {
  return function() {
    return Eo.call(this.children, e);
  };
}
function Ao() {
  return this.firstElementChild;
}
function Co(e) {
  return this.select(e == null ? Ao : So(typeof e == "function" ? e : Rn(e)));
}
var Mo = Array.prototype.filter;
function Po() {
  return Array.from(this.children);
}
function No(e) {
  return function() {
    return Mo.call(this.children, e);
  };
}
function To(e) {
  return this.selectAll(e == null ? Po : No(typeof e == "function" ? e : Rn(e)));
}
function Oo(e) {
  typeof e != "function" && (e = On(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new he(n, this._parents);
}
function Un(e) {
  return new Array(e.length);
}
function Ro() {
  return new he(this._enter || this._groups.map(Un), this._parents);
}
function Ht(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ht.prototype = {
  constructor: Ht,
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
function Uo(e) {
  return function() {
    return e;
  };
}
function Do(e, t, i, n, s, o) {
  for (var a = 0, r, l = t.length, c = o.length; a < c; ++a)
    (r = t[a]) ? (r.__data__ = o[a], n[a] = r) : i[a] = new Ht(e, o[a]);
  for (; a < l; ++a)
    (r = t[a]) && (s[a] = r);
}
function Lo(e, t, i, n, s, o, a) {
  var r, l, c = /* @__PURE__ */ new Map(), u = t.length, h = o.length, m = new Array(u), f;
  for (r = 0; r < u; ++r)
    (l = t[r]) && (m[r] = f = a.call(l, l.__data__, r, t) + "", c.has(f) ? s[r] = l : c.set(f, l));
  for (r = 0; r < h; ++r)
    f = a.call(e, o[r], r, o) + "", (l = c.get(f)) ? (n[r] = l, l.__data__ = o[r], c.delete(f)) : i[r] = new Ht(e, o[r]);
  for (r = 0; r < u; ++r)
    (l = t[r]) && c.get(m[r]) === l && (s[r] = l);
}
function zo(e) {
  return e.__data__;
}
function qo(e, t) {
  if (!arguments.length) return Array.from(this, zo);
  var i = t ? Lo : Do, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Uo(e));
  for (var o = s.length, a = new Array(o), r = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var u = n[c], h = s[c], m = h.length, f = Fo(e.call(u, u && u.__data__, c, n)), y = f.length, I = r[c] = new Array(y), M = a[c] = new Array(y), _ = l[c] = new Array(m);
    i(u, h, I, M, _, f, t);
    for (var P = 0, H = 0, K, v; P < y; ++P)
      if (K = I[P]) {
        for (P >= H && (H = P + 1); !(v = M[H]) && ++H < y; ) ;
        K._next = v || null;
      }
  }
  return a = new he(a, n), a._enter = r, a._exit = l, a;
}
function Fo(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Vo() {
  return new he(this._exit || this._groups.map(Un), this._parents);
}
function Ho(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function Ko(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, a = Math.min(s, o), r = new Array(s), l = 0; l < a; ++l)
    for (var c = i[l], u = n[l], h = c.length, m = r[l] = new Array(h), f, y = 0; y < h; ++y)
      (f = c[y] || u[y]) && (m[y] = f);
  for (; l < s; ++l)
    r[l] = i[l];
  return new he(r, this._parents);
}
function Wo() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], a; --s >= 0; )
      (a = n[s]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Go(e) {
  e || (e = Bo);
  function t(h, m) {
    return h && m ? e(h.__data__, m.__data__) : !h - !m;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var a = i[o], r = a.length, l = s[o] = new Array(r), c, u = 0; u < r; ++u)
      (c = a[u]) && (l[u] = c);
    l.sort(t);
  }
  return new he(s, this._parents).order();
}
function Bo(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Yo() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function jo() {
  return Array.from(this);
}
function Xo() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var a = n[s];
      if (a) return a;
    }
  return null;
}
function Qo() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Zo() {
  return !this.node();
}
function Jo(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, a = s.length, r; o < a; ++o)
      (r = s[o]) && e.call(r, r.__data__, o, s);
  return this;
}
function ea(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ta(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ia(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function na(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function sa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function oa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function aa(e, t) {
  var i = Xt(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ta : ea : typeof t == "function" ? i.local ? oa : sa : i.local ? na : ia)(i, t));
}
function Dn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ra(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function da(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function la(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function ca(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? ra : typeof t == "function" ? la : da)(e, t, i ?? "")) : et(this.node(), e);
}
function et(e, t) {
  return e.style.getPropertyValue(t) || Dn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function ua(e) {
  return function() {
    delete this[e];
  };
}
function pa(e, t) {
  return function() {
    this[e] = t;
  };
}
function ha(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function ma(e, t) {
  return arguments.length > 1 ? this.each((t == null ? ua : typeof t == "function" ? ha : pa)(e, t)) : this.node()[e];
}
function Ln(e) {
  return e.trim().split(/^|\s+/);
}
function Mi(e) {
  return e.classList || new zn(e);
}
function zn(e) {
  this._node = e, this._names = Ln(e.getAttribute("class") || "");
}
zn.prototype = {
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
function qn(e, t) {
  for (var i = Mi(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function Fn(e, t) {
  for (var i = Mi(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function fa(e) {
  return function() {
    qn(this, e);
  };
}
function ga(e) {
  return function() {
    Fn(this, e);
  };
}
function wa(e, t) {
  return function() {
    (t.apply(this, arguments) ? qn : Fn)(this, e);
  };
}
function ya(e, t) {
  var i = Ln(e + "");
  if (arguments.length < 2) {
    for (var n = Mi(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? wa : t ? fa : ga)(i, t));
}
function xa() {
  this.textContent = "";
}
function va(e) {
  return function() {
    this.textContent = e;
  };
}
function Ia(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function _a(e) {
  return arguments.length ? this.each(e == null ? xa : (typeof e == "function" ? Ia : va)(e)) : this.node().textContent;
}
function $a() {
  this.innerHTML = "";
}
function ka(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ba(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ea(e) {
  return arguments.length ? this.each(e == null ? $a : (typeof e == "function" ? ba : ka)(e)) : this.node().innerHTML;
}
function Sa() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Aa() {
  return this.each(Sa);
}
function Ca() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ma() {
  return this.each(Ca);
}
function Pa(e) {
  var t = typeof e == "function" ? e : Nn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Na() {
  return null;
}
function Ta(e, t) {
  var i = typeof e == "function" ? e : Nn(e), n = t == null ? Na : typeof t == "function" ? t : Ci(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Oa() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Ra() {
  return this.each(Oa);
}
function Ua() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Da() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function La(e) {
  return this.select(e ? Da : Ua);
}
function za(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function qa(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Fa(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Va(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function Ha(e, t, i) {
  return function() {
    var n = this.__on, s, o = qa(t);
    if (n) {
      for (var a = 0, r = n.length; a < r; ++a)
        if ((s = n[a]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), s = { type: e.type, name: e.name, value: t, listener: o, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function Ka(e, t, i) {
  var n = Fa(e + ""), s, o = n.length, a;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, c = r.length, u; l < c; ++l)
        for (s = 0, u = r[l]; s < o; ++s)
          if ((a = n[s]).type === u.type && a.name === u.name)
            return u.value;
    }
    return;
  }
  for (r = t ? Ha : Va, s = 0; s < o; ++s) this.each(r(n[s], t, i));
  return this;
}
function Vn(e, t, i) {
  var n = Dn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Wa(e, t) {
  return function() {
    return Vn(this, e, t);
  };
}
function Ga(e, t) {
  return function() {
    return Vn(this, e, t.apply(this, arguments));
  };
}
function Ba(e, t) {
  return this.each((typeof t == "function" ? Ga : Wa)(e, t));
}
function* Ya() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, a; s < o; ++s)
      (a = n[s]) && (yield a);
}
var Hn = [null];
function he(e, t) {
  this._groups = e, this._parents = t;
}
function bt() {
  return new he([[document.documentElement]], Hn);
}
function ja() {
  return this;
}
he.prototype = bt.prototype = {
  constructor: he,
  select: Io,
  selectAll: bo,
  selectChild: Co,
  selectChildren: To,
  filter: Oo,
  data: qo,
  enter: Ro,
  exit: Vo,
  join: Ho,
  merge: Ko,
  selection: ja,
  order: Wo,
  sort: Go,
  call: Yo,
  nodes: jo,
  node: Xo,
  size: Qo,
  empty: Zo,
  each: Jo,
  attr: aa,
  style: ca,
  property: ma,
  classed: ya,
  text: _a,
  html: Ea,
  raise: Aa,
  lower: Ma,
  append: Pa,
  insert: Ta,
  remove: Ra,
  clone: La,
  datum: za,
  on: Ka,
  dispatch: Ba,
  [Symbol.iterator]: Ya
};
function be(e) {
  return typeof e == "string" ? new he([[document.querySelector(e)]], [document.documentElement]) : new he([[e]], Hn);
}
function Xa(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function De(e, t) {
  if (e = Xa(e), t === void 0 && (t = e.currentTarget), t) {
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
var Qa = { value: () => {
} };
function Pi() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Dt(i);
}
function Dt(e) {
  this._ = e;
}
function Za(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Dt.prototype = Pi.prototype = {
  constructor: Dt,
  on: function(e, t) {
    var i = this._, n = Za(e + "", i), s, o = -1, a = n.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((s = (e = n[o]).type) && (s = Ja(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (s = (e = n[o]).type) i[s] = Qi(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = Qi(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Dt(e);
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
function Ja(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function Qi(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = Qa, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const hi = { capture: !0, passive: !1 };
function mi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function er(e) {
  var t = e.document.documentElement, i = be(e).on("dragstart.drag", mi, hi);
  "onselectstart" in t ? i.on("selectstart.drag", mi, hi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function tr(e, t) {
  var i = e.document.documentElement, n = be(e).on("dragstart.drag", null);
  t && (n.on("click.drag", mi, hi), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Ni(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Kn(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function Et() {
}
var vt = 0.7, Kt = 1 / vt, Qe = "\\s*([+-]?\\d+)\\s*", It = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ir = /^#([0-9a-f]{3,8})$/, nr = new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`), sr = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), or = new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${It}\\)$`), ar = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${It}\\)$`), rr = new RegExp(`^hsl\\(${It},${Ee},${Ee}\\)$`), dr = new RegExp(`^hsla\\(${It},${Ee},${Ee},${It}\\)$`), Zi = {
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
Ni(Et, _t, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ji,
  // Deprecated! Use color.formatHex.
  formatHex: Ji,
  formatHex8: lr,
  formatHsl: cr,
  formatRgb: en,
  toString: en
});
function Ji() {
  return this.rgb().formatHex();
}
function lr() {
  return this.rgb().formatHex8();
}
function cr() {
  return Wn(this).formatHsl();
}
function en() {
  return this.rgb().formatRgb();
}
function _t(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = ir.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? tn(t) : i === 3 ? new de(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Mt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Mt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = nr.exec(e)) ? new de(t[1], t[2], t[3], 1) : (t = sr.exec(e)) ? new de(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = or.exec(e)) ? Mt(t[1], t[2], t[3], t[4]) : (t = ar.exec(e)) ? Mt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = rr.exec(e)) ? on(t[1], t[2] / 100, t[3] / 100, 1) : (t = dr.exec(e)) ? on(t[1], t[2] / 100, t[3] / 100, t[4]) : Zi.hasOwnProperty(e) ? tn(Zi[e]) : e === "transparent" ? new de(NaN, NaN, NaN, 0) : null;
}
function tn(e) {
  return new de(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Mt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new de(e, t, i, n);
}
function ur(e) {
  return e instanceof Et || (e = _t(e)), e ? (e = e.rgb(), new de(e.r, e.g, e.b, e.opacity)) : new de();
}
function fi(e, t, i, n) {
  return arguments.length === 1 ? ur(e) : new de(e, t, i, n ?? 1);
}
function de(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Ni(de, fi, Kn(Et, {
  brighter(e) {
    return e = e == null ? Kt : Math.pow(Kt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? vt : Math.pow(vt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new de(Ke(this.r), Ke(this.g), Ke(this.b), Wt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: nn,
  // Deprecated! Use color.formatHex.
  formatHex: nn,
  formatHex8: pr,
  formatRgb: sn,
  toString: sn
}));
function nn() {
  return `#${Fe(this.r)}${Fe(this.g)}${Fe(this.b)}`;
}
function pr() {
  return `#${Fe(this.r)}${Fe(this.g)}${Fe(this.b)}${Fe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function sn() {
  const e = Wt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ke(this.r)}, ${Ke(this.g)}, ${Ke(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Wt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ke(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Fe(e) {
  return e = Ke(e), (e < 16 ? "0" : "") + e.toString(16);
}
function on(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new _e(e, t, i, n);
}
function Wn(e) {
  if (e instanceof _e) return new _e(e.h, e.s, e.l, e.opacity);
  if (e instanceof Et || (e = _t(e)), !e) return new _e();
  if (e instanceof _e) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), a = NaN, r = o - s, l = (o + s) / 2;
  return r ? (t === o ? a = (i - n) / r + (i < n) * 6 : i === o ? a = (n - t) / r + 2 : a = (t - i) / r + 4, r /= l < 0.5 ? o + s : 2 - o - s, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new _e(a, r, l, e.opacity);
}
function hr(e, t, i, n) {
  return arguments.length === 1 ? Wn(e) : new _e(e, t, i, n ?? 1);
}
function _e(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Ni(_e, hr, Kn(Et, {
  brighter(e) {
    return e = e == null ? Kt : Math.pow(Kt, e), new _e(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? vt : Math.pow(vt, e), new _e(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new de(
      ai(e >= 240 ? e - 240 : e + 120, s, n),
      ai(e, s, n),
      ai(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new _e(an(this.h), Pt(this.s), Pt(this.l), Wt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Wt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${an(this.h)}, ${Pt(this.s) * 100}%, ${Pt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function an(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Pt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ai(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Gn = (e) => () => e;
function mr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function fr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function gr(e) {
  return (e = +e) == 1 ? Bn : function(t, i) {
    return i - t ? fr(t, i, e) : Gn(isNaN(t) ? i : t);
  };
}
function Bn(e, t) {
  var i = t - e;
  return i ? mr(e, i) : Gn(isNaN(e) ? t : e);
}
const rn = (function e(t) {
  var i = gr(t);
  function n(s, o) {
    var a = i((s = fi(s)).r, (o = fi(o)).r), r = i(s.g, o.g), l = i(s.b, o.b), c = Bn(s.opacity, o.opacity);
    return function(u) {
      return s.r = a(u), s.g = r(u), s.b = l(u), s.opacity = c(u), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Te(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var gi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ri = new RegExp(gi.source, "g");
function wr(e) {
  return function() {
    return e;
  };
}
function yr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function xr(e, t) {
  var i = gi.lastIndex = ri.lastIndex = 0, n, s, o, a = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (n = gi.exec(e)) && (s = ri.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), r[a] ? r[a] += o : r[++a] = o), (n = n[0]) === (s = s[0]) ? r[a] ? r[a] += s : r[++a] = s : (r[++a] = null, l.push({ i: a, x: Te(n, s) })), i = ri.lastIndex;
  return i < t.length && (o = t.slice(i), r[a] ? r[a] += o : r[++a] = o), r.length < 2 ? l[0] ? yr(l[0].x) : wr(t) : (t = l.length, function(c) {
    for (var u = 0, h; u < t; ++u) r[(h = l[u]).i] = h.x(c);
    return r.join("");
  });
}
var dn = 180 / Math.PI, wi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Yn(e, t, i, n, s, o) {
  var a, r, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * i + t * n) && (i -= e * l, n -= t * l), (r = Math.sqrt(i * i + n * n)) && (i /= r, n /= r, l /= r), e * n < t * i && (e = -e, t = -t, l = -l, a = -a), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * dn,
    skewX: Math.atan(l) * dn,
    scaleX: a,
    scaleY: r
  };
}
var Nt;
function vr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? wi : Yn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Ir(e) {
  return e == null || (Nt || (Nt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Nt.setAttribute("transform", e), !(e = Nt.transform.baseVal.consolidate())) ? wi : (e = e.matrix, Yn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function jn(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, u, h, m, f, y) {
    if (c !== h || u !== m) {
      var I = f.push("translate(", null, t, null, i);
      y.push({ i: I - 4, x: Te(c, h) }, { i: I - 2, x: Te(u, m) });
    } else (h || m) && f.push("translate(" + h + t + m + i);
  }
  function a(c, u, h, m) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), m.push({ i: h.push(s(h) + "rotate(", null, n) - 2, x: Te(c, u) })) : u && h.push(s(h) + "rotate(" + u + n);
  }
  function r(c, u, h, m) {
    c !== u ? m.push({ i: h.push(s(h) + "skewX(", null, n) - 2, x: Te(c, u) }) : u && h.push(s(h) + "skewX(" + u + n);
  }
  function l(c, u, h, m, f, y) {
    if (c !== h || u !== m) {
      var I = f.push(s(f) + "scale(", null, ",", null, ")");
      y.push({ i: I - 4, x: Te(c, h) }, { i: I - 2, x: Te(u, m) });
    } else (h !== 1 || m !== 1) && f.push(s(f) + "scale(" + h + "," + m + ")");
  }
  return function(c, u) {
    var h = [], m = [];
    return c = e(c), u = e(u), o(c.translateX, c.translateY, u.translateX, u.translateY, h, m), a(c.rotate, u.rotate, h, m), r(c.skewX, u.skewX, h, m), l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, h, m), c = u = null, function(f) {
      for (var y = -1, I = m.length, M; ++y < I; ) h[(M = m[y]).i] = M.x(f);
      return h.join("");
    };
  };
}
var _r = jn(vr, "px, ", "px)", "deg)"), $r = jn(Ir, ", ", ")", ")"), kr = 1e-12;
function ln(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function br(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Er(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Sr = (function e(t, i, n) {
  function s(o, a) {
    var r = o[0], l = o[1], c = o[2], u = a[0], h = a[1], m = a[2], f = u - r, y = h - l, I = f * f + y * y, M, _;
    if (I < kr)
      _ = Math.log(m / c) / t, M = function($) {
        return [
          r + $ * f,
          l + $ * y,
          c * Math.exp(t * $ * _)
        ];
      };
    else {
      var P = Math.sqrt(I), H = (m * m - c * c + n * I) / (2 * c * i * P), K = (m * m - c * c - n * I) / (2 * m * i * P), v = Math.log(Math.sqrt(H * H + 1) - H), g = Math.log(Math.sqrt(K * K + 1) - K);
      _ = (g - v) / t, M = function($) {
        var E = $ * _, D = ln(v), C = c / (i * P) * (D * Er(t * E + v) - br(v));
        return [
          r + C * f,
          l + C * y,
          c * D / ln(t * E + v)
        ];
      };
    }
    return M.duration = _ * 1e3 * t / Math.SQRT2, M;
  }
  return s.rho = function(o) {
    var a = Math.max(1e-3, +o), r = a * a, l = r * r;
    return e(a, r, l);
  }, s;
})(Math.SQRT2, 2, 4);
var tt = 0, ut = 0, rt = 0, Xn = 1e3, Gt, pt, Bt = 0, Ge = 0, Qt = 0, $t = typeof performance == "object" && performance.now ? performance : Date, Qn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Ti() {
  return Ge || (Qn(Ar), Ge = $t.now() + Qt);
}
function Ar() {
  Ge = 0;
}
function Yt() {
  this._call = this._time = this._next = null;
}
Yt.prototype = Zn.prototype = {
  constructor: Yt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Ti() : +i) + (t == null ? 0 : +t), !this._next && pt !== this && (pt ? pt._next = this : Gt = this, pt = this), this._call = e, this._time = i, yi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, yi());
  }
};
function Zn(e, t, i) {
  var n = new Yt();
  return n.restart(e, t, i), n;
}
function Cr() {
  Ti(), ++tt;
  for (var e = Gt, t; e; )
    (t = Ge - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --tt;
}
function cn() {
  Ge = (Bt = $t.now()) + Qt, tt = ut = 0;
  try {
    Cr();
  } finally {
    tt = 0, Pr(), Ge = 0;
  }
}
function Mr() {
  var e = $t.now(), t = e - Bt;
  t > Xn && (Qt -= t, Bt = e);
}
function Pr() {
  for (var e, t = Gt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Gt = i);
  pt = e, yi(n);
}
function yi(e) {
  if (!tt) {
    ut && (ut = clearTimeout(ut));
    var t = e - Ge;
    t > 24 ? (e < 1 / 0 && (ut = setTimeout(cn, e - $t.now() - Qt)), rt && (rt = clearInterval(rt))) : (rt || (Bt = $t.now(), rt = setInterval(Mr, Xn)), tt = 1, Qn(cn));
  }
}
function un(e, t, i) {
  var n = new Yt();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Nr = Pi("start", "end", "cancel", "interrupt"), Tr = [], Jn = 0, pn = 1, xi = 2, Lt = 3, hn = 4, vi = 5, zt = 6;
function Zt(e, t, i, n, s, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  Or(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Nr,
    tween: Tr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Jn
  });
}
function Oi(e, t) {
  var i = $e(e, t);
  if (i.state > Jn) throw new Error("too late; already scheduled");
  return i;
}
function Ae(e, t) {
  var i = $e(e, t);
  if (i.state > Lt) throw new Error("too late; already running");
  return i;
}
function $e(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Or(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = Zn(o, 0, i.time);
  function o(c) {
    i.state = pn, i.timer.restart(a, i.delay, i.time), i.delay <= c && a(c - i.delay);
  }
  function a(c) {
    var u, h, m, f;
    if (i.state !== pn) return l();
    for (u in n)
      if (f = n[u], f.name === i.name) {
        if (f.state === Lt) return un(a);
        f.state === hn ? (f.state = zt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete n[u]) : +u < t && (f.state = zt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete n[u]);
      }
    if (un(function() {
      i.state === Lt && (i.state = hn, i.timer.restart(r, i.delay, i.time), r(c));
    }), i.state = xi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === xi) {
      for (i.state = Lt, s = new Array(m = i.tween.length), u = 0, h = -1; u < m; ++u)
        (f = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (s[++h] = f);
      s.length = h + 1;
    }
  }
  function r(c) {
    for (var u = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = vi, 1), h = -1, m = s.length; ++h < m; )
      s[h].call(e, u);
    i.state === vi && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = zt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function qt(e, t) {
  var i = e.__transition, n, s, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((n = i[a]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > xi && n.state < vi, n.state = zt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function Rr(e) {
  return this.each(function() {
    qt(this, e);
  });
}
function Ur(e, t) {
  var i, n;
  return function() {
    var s = Ae(this, e), o = s.tween;
    if (o !== i) {
      n = i = o;
      for (var a = 0, r = n.length; a < r; ++a)
        if (n[a].name === t) {
          n = n.slice(), n.splice(a, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function Dr(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Ae(this, e), a = o.tween;
    if (a !== n) {
      s = (n = a).slice();
      for (var r = { name: t, value: i }, l = 0, c = s.length; l < c; ++l)
        if (s[l].name === t) {
          s[l] = r;
          break;
        }
      l === c && s.push(r);
    }
    o.tween = s;
  };
}
function Lr(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = $e(this.node(), i).tween, s = 0, o = n.length, a; s < o; ++s)
      if ((a = n[s]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? Ur : Dr)(i, e, t));
}
function Ri(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Ae(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return $e(s, n).value[t];
  };
}
function es(e, t) {
  var i;
  return (typeof t == "number" ? Te : t instanceof _t ? rn : (i = _t(t)) ? (t = i, rn) : xr)(e, t);
}
function zr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function qr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Fr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Vr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Hr(e, t, i) {
  var n, s, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = r + "", a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r)));
  };
}
function Kr(e, t, i) {
  var n, s, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = r + "", a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r)));
  };
}
function Wr(e, t) {
  var i = Xt(e), n = i === "transform" ? $r : es;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Kr : Hr)(i, n, Ri(this, "attr." + e, t)) : t == null ? (i.local ? qr : zr)(i) : (i.local ? Vr : Fr)(i, n, t));
}
function Gr(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function Br(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function Yr(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Br(e, o)), i;
  }
  return s._value = t, s;
}
function jr(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Gr(e, o)), i;
  }
  return s._value = t, s;
}
function Xr(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Xt(e);
  return this.tween(i, (n.local ? Yr : jr)(n, t));
}
function Qr(e, t) {
  return function() {
    Oi(this, e).delay = +t.apply(this, arguments);
  };
}
function Zr(e, t) {
  return t = +t, function() {
    Oi(this, e).delay = t;
  };
}
function Jr(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Qr : Zr)(t, e)) : $e(this.node(), t).delay;
}
function ed(e, t) {
  return function() {
    Ae(this, e).duration = +t.apply(this, arguments);
  };
}
function td(e, t) {
  return t = +t, function() {
    Ae(this, e).duration = t;
  };
}
function id(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ed : td)(t, e)) : $e(this.node(), t).duration;
}
function nd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ae(this, e).ease = t;
  };
}
function sd(e) {
  var t = this._id;
  return arguments.length ? this.each(nd(t, e)) : $e(this.node(), t).ease;
}
function od(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ae(this, e).ease = i;
  };
}
function ad(e) {
  if (typeof e != "function") throw new Error();
  return this.each(od(this._id, e));
}
function rd(e) {
  typeof e != "function" && (e = On(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new Pe(n, this._parents, this._name, this._id);
}
function dd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), a = new Array(n), r = 0; r < o; ++r)
    for (var l = t[r], c = i[r], u = l.length, h = a[r] = new Array(u), m, f = 0; f < u; ++f)
      (m = l[f] || c[f]) && (h[f] = m);
  for (; r < n; ++r)
    a[r] = t[r];
  return new Pe(a, this._parents, this._name, this._id);
}
function ld(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function cd(e, t, i) {
  var n, s, o = ld(t) ? Oi : Ae;
  return function() {
    var a = o(this, e), r = a.on;
    r !== n && (s = (n = r).copy()).on(t, i), a.on = s;
  };
}
function ud(e, t) {
  var i = this._id;
  return arguments.length < 2 ? $e(this.node(), i).on.on(e) : this.each(cd(i, e, t));
}
function pd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function hd() {
  return this.on("end.remove", pd(this._id));
}
function md(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ci(e));
  for (var n = this._groups, s = n.length, o = new Array(s), a = 0; a < s; ++a)
    for (var r = n[a], l = r.length, c = o[a] = new Array(l), u, h, m = 0; m < l; ++m)
      (u = r[m]) && (h = e.call(u, u.__data__, m, r)) && ("__data__" in u && (h.__data__ = u.__data__), c[m] = h, Zt(c[m], t, i, m, c, $e(u, i)));
  return new Pe(o, this._parents, t, i);
}
function fd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Tn(e));
  for (var n = this._groups, s = n.length, o = [], a = [], r = 0; r < s; ++r)
    for (var l = n[r], c = l.length, u, h = 0; h < c; ++h)
      if (u = l[h]) {
        for (var m = e.call(u, u.__data__, h, l), f, y = $e(u, i), I = 0, M = m.length; I < M; ++I)
          (f = m[I]) && Zt(f, t, i, I, m, y);
        o.push(m), a.push(u);
      }
  return new Pe(o, a, t, i);
}
var gd = bt.prototype.constructor;
function wd() {
  return new gd(this._groups, this._parents);
}
function yd(e, t) {
  var i, n, s;
  return function() {
    var o = et(this, e), a = (this.style.removeProperty(e), et(this, e));
    return o === a ? null : o === i && a === n ? s : s = t(i = o, n = a);
  };
}
function ts(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function xd(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = et(this, e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function vd(e, t, i) {
  var n, s, o;
  return function() {
    var a = et(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), et(this, e))), a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r));
  };
}
function Id(e, t) {
  var i, n, s, o = "style." + t, a = "end." + o, r;
  return function() {
    var l = Ae(this, e), c = l.on, u = l.value[o] == null ? r || (r = ts(t)) : void 0;
    (c !== i || s !== u) && (n = (i = c).copy()).on(a, s = u), l.on = n;
  };
}
function _d(e, t, i) {
  var n = (e += "") == "transform" ? _r : es;
  return t == null ? this.styleTween(e, yd(e, n)).on("end.style." + e, ts(e)) : typeof t == "function" ? this.styleTween(e, vd(e, n, Ri(this, "style." + e, t))).each(Id(this._id, e)) : this.styleTween(e, xd(e, n, t), i).on("end.style." + e, null);
}
function $d(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function kd(e, t, i) {
  var n, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (n = (s = a) && $d(e, a, i)), n;
  }
  return o._value = t, o;
}
function bd(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, kd(e, t, i ?? ""));
}
function Ed(e) {
  return function() {
    this.textContent = e;
  };
}
function Sd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Ad(e) {
  return this.tween("text", typeof e == "function" ? Sd(Ri(this, "text", e)) : Ed(e == null ? "" : e + ""));
}
function Cd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Md(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && Cd(s)), t;
  }
  return n._value = e, n;
}
function Pd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Md(e));
}
function Nd() {
  for (var e = this._name, t = this._id, i = is(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var a = n[o], r = a.length, l, c = 0; c < r; ++c)
      if (l = a[c]) {
        var u = $e(l, t);
        Zt(l, e, i, c, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Pe(n, this._parents, e, i);
}
function Td() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, a) {
    var r = { value: a }, l = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = Ae(this, n), u = c.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var Od = 0;
function Pe(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function is() {
  return ++Od;
}
var Ce = bt.prototype;
Pe.prototype = {
  constructor: Pe,
  select: md,
  selectAll: fd,
  selectChild: Ce.selectChild,
  selectChildren: Ce.selectChildren,
  filter: rd,
  merge: dd,
  selection: wd,
  transition: Nd,
  call: Ce.call,
  nodes: Ce.nodes,
  node: Ce.node,
  size: Ce.size,
  empty: Ce.empty,
  each: Ce.each,
  on: ud,
  attr: Wr,
  attrTween: Xr,
  style: _d,
  styleTween: bd,
  text: Ad,
  textTween: Pd,
  remove: hd,
  tween: Lr,
  delay: Jr,
  duration: id,
  ease: sd,
  easeVarying: ad,
  end: Td,
  [Symbol.iterator]: Ce[Symbol.iterator]
};
function Rd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ud = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Rd
};
function Dd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Ld(e) {
  var t, i;
  e instanceof Pe ? (t = e._id, e = e._name) : (t = is(), (i = Ud).time = Ti(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var a = n[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && Zt(l, e, t, c, a, i || Dd(l, t));
  return new Pe(n, this._parents, e, t);
}
bt.prototype.interrupt = Rr;
bt.prototype.transition = Ld;
const Tt = (e) => () => e;
function zd(e, {
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
function di(e) {
  e.stopImmediatePropagation();
}
function dt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function qd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Fd() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function mn() {
  return this.__zoom || ft;
}
function Vd(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Hd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Kd(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function Wd() {
  var e = qd, t = Fd, i = Kd, n = Vd, s = Hd, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = Sr, c = Pi("start", "zoom", "end"), u, h, m, f = 500, y = 150, I = 0, M = 10;
  function _(p) {
    p.property("__zoom", mn).on("wheel.zoom", E, { passive: !1 }).on("mousedown.zoom", D).on("dblclick.zoom", C).filter(s).on("touchstart.zoom", N).on("touchmove.zoom", G).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(p, x, w, k) {
    var T = p.selection ? p.selection() : p;
    T.property("__zoom", mn), p !== T ? v(p, x, w, k) : T.interrupt().each(function() {
      g(this, arguments).event(k).start().zoom(null, typeof x == "function" ? x.apply(this, arguments) : x).end();
    });
  }, _.scaleBy = function(p, x, w, k) {
    _.scaleTo(p, function() {
      var T = this.__zoom.k, L = typeof x == "function" ? x.apply(this, arguments) : x;
      return T * L;
    }, w, k);
  }, _.scaleTo = function(p, x, w, k) {
    _.transform(p, function() {
      var T = t.apply(this, arguments), L = this.__zoom, b = w == null ? K(T) : typeof w == "function" ? w.apply(this, arguments) : w, S = L.invert(b), O = typeof x == "function" ? x.apply(this, arguments) : x;
      return i(H(P(L, O), b, S), T, a);
    }, w, k);
  }, _.translateBy = function(p, x, w, k) {
    _.transform(p, function() {
      return i(this.__zoom.translate(
        typeof x == "function" ? x.apply(this, arguments) : x,
        typeof w == "function" ? w.apply(this, arguments) : w
      ), t.apply(this, arguments), a);
    }, null, k);
  }, _.translateTo = function(p, x, w, k, T) {
    _.transform(p, function() {
      var L = t.apply(this, arguments), b = this.__zoom, S = k == null ? K(L) : typeof k == "function" ? k.apply(this, arguments) : k;
      return i(ft.translate(S[0], S[1]).scale(b.k).translate(
        typeof x == "function" ? -x.apply(this, arguments) : -x,
        typeof w == "function" ? -w.apply(this, arguments) : -w
      ), L, a);
    }, k, T);
  };
  function P(p, x) {
    return x = Math.max(o[0], Math.min(o[1], x)), x === p.k ? p : new Me(x, p.x, p.y);
  }
  function H(p, x, w) {
    var k = x[0] - w[0] * p.k, T = x[1] - w[1] * p.k;
    return k === p.x && T === p.y ? p : new Me(p.k, k, T);
  }
  function K(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function v(p, x, w, k) {
    p.on("start.zoom", function() {
      g(this, arguments).event(k).start();
    }).on("interrupt.zoom end.zoom", function() {
      g(this, arguments).event(k).end();
    }).tween("zoom", function() {
      var T = this, L = arguments, b = g(T, L).event(k), S = t.apply(T, L), O = w == null ? K(S) : typeof w == "function" ? w.apply(T, L) : w, Z = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), J = T.__zoom, ce = typeof x == "function" ? x.apply(T, L) : x, we = l(J.invert(O).concat(Z / J.k), ce.invert(O).concat(Z / ce.k));
      return function(ue) {
        if (ue === 1) ue = ce;
        else {
          var ye = we(ue), it = Z / ye[2];
          ue = new Me(it, O[0] - ye[0] * it, O[1] - ye[1] * it);
        }
        b.zoom(null, ue);
      };
    });
  }
  function g(p, x, w) {
    return !w && p.__zooming || new $(p, x);
  }
  function $(p, x) {
    this.that = p, this.args = x, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, x), this.taps = 0;
  }
  $.prototype = {
    event: function(p) {
      return p && (this.sourceEvent = p), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(p, x) {
      return this.mouse && p !== "mouse" && (this.mouse[1] = x.invert(this.mouse[0])), this.touch0 && p !== "touch" && (this.touch0[1] = x.invert(this.touch0[0])), this.touch1 && p !== "touch" && (this.touch1[1] = x.invert(this.touch1[0])), this.that.__zoom = x, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(p) {
      var x = be(this.that).datum();
      c.call(
        p,
        this.that,
        new zd(p, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: c
        }),
        x
      );
    }
  };
  function E(p, ...x) {
    if (!e.apply(this, arguments)) return;
    var w = g(this, x).event(p), k = this.__zoom, T = Math.max(o[0], Math.min(o[1], k.k * Math.pow(2, n.apply(this, arguments)))), L = De(p);
    if (w.wheel)
      (w.mouse[0][0] !== L[0] || w.mouse[0][1] !== L[1]) && (w.mouse[1] = k.invert(w.mouse[0] = L)), clearTimeout(w.wheel);
    else {
      if (k.k === T) return;
      w.mouse = [L, k.invert(L)], qt(this), w.start();
    }
    dt(p), w.wheel = setTimeout(b, y), w.zoom("mouse", i(H(P(k, T), w.mouse[0], w.mouse[1]), w.extent, a));
    function b() {
      w.wheel = null, w.end();
    }
  }
  function D(p, ...x) {
    if (m || !e.apply(this, arguments)) return;
    var w = p.currentTarget, k = g(this, x, !0).event(p), T = be(p.view).on("mousemove.zoom", O, !0).on("mouseup.zoom", Z, !0), L = De(p, w), b = p.clientX, S = p.clientY;
    er(p.view), di(p), k.mouse = [L, this.__zoom.invert(L)], qt(this), k.start();
    function O(J) {
      if (dt(J), !k.moved) {
        var ce = J.clientX - b, we = J.clientY - S;
        k.moved = ce * ce + we * we > I;
      }
      k.event(J).zoom("mouse", i(H(k.that.__zoom, k.mouse[0] = De(J, w), k.mouse[1]), k.extent, a));
    }
    function Z(J) {
      T.on("mousemove.zoom mouseup.zoom", null), tr(J.view, k.moved), dt(J), k.event(J).end();
    }
  }
  function C(p, ...x) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom, k = De(p.changedTouches ? p.changedTouches[0] : p, this), T = w.invert(k), L = w.k * (p.shiftKey ? 0.5 : 2), b = i(H(P(w, L), k, T), t.apply(this, x), a);
      dt(p), r > 0 ? be(this).transition().duration(r).call(v, b, k, p) : be(this).call(_.transform, b, k, p);
    }
  }
  function N(p, ...x) {
    if (e.apply(this, arguments)) {
      var w = p.touches, k = w.length, T = g(this, x, p.changedTouches.length === k).event(p), L, b, S, O;
      for (di(p), b = 0; b < k; ++b)
        S = w[b], O = De(S, this), O = [O, this.__zoom.invert(O), S.identifier], T.touch0 ? !T.touch1 && T.touch0[2] !== O[2] && (T.touch1 = O, T.taps = 0) : (T.touch0 = O, L = !0, T.taps = 1 + !!u);
      u && (u = clearTimeout(u)), L && (T.taps < 2 && (h = O[0], u = setTimeout(function() {
        u = null;
      }, f)), qt(this), T.start());
    }
  }
  function G(p, ...x) {
    if (this.__zooming) {
      var w = g(this, x).event(p), k = p.changedTouches, T = k.length, L, b, S, O;
      for (dt(p), L = 0; L < T; ++L)
        b = k[L], S = De(b, this), w.touch0 && w.touch0[2] === b.identifier ? w.touch0[0] = S : w.touch1 && w.touch1[2] === b.identifier && (w.touch1[0] = S);
      if (b = w.that.__zoom, w.touch1) {
        var Z = w.touch0[0], J = w.touch0[1], ce = w.touch1[0], we = w.touch1[1], ue = (ue = ce[0] - Z[0]) * ue + (ue = ce[1] - Z[1]) * ue, ye = (ye = we[0] - J[0]) * ye + (ye = we[1] - J[1]) * ye;
        b = P(b, Math.sqrt(ue / ye)), S = [(Z[0] + ce[0]) / 2, (Z[1] + ce[1]) / 2], O = [(J[0] + we[0]) / 2, (J[1] + we[1]) / 2];
      } else if (w.touch0) S = w.touch0[0], O = w.touch0[1];
      else return;
      w.zoom("touch", i(H(b, S, O), w.extent, a));
    }
  }
  function X(p, ...x) {
    if (this.__zooming) {
      var w = g(this, x).event(p), k = p.changedTouches, T = k.length, L, b;
      for (di(p), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, f), L = 0; L < T; ++L)
        b = k[L], w.touch0 && w.touch0[2] === b.identifier ? delete w.touch0 : w.touch1 && w.touch1[2] === b.identifier && delete w.touch1;
      if (w.touch1 && !w.touch0 && (w.touch0 = w.touch1, delete w.touch1), w.touch0) w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (w.end(), w.taps === 2 && (b = De(b, this), Math.hypot(h[0] - b[0], h[1] - b[1]) < M)) {
        var S = be(this).on("dblclick.zoom");
        S && S.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : Tt(+p), _) : n;
  }, _.filter = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Tt(!!p), _) : e;
  }, _.touchable = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : Tt(!!p), _) : s;
  }, _.extent = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Tt([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), _) : t;
  }, _.scaleExtent = function(p) {
    return arguments.length ? (o[0] = +p[0], o[1] = +p[1], _) : [o[0], o[1]];
  }, _.translateExtent = function(p) {
    return arguments.length ? (a[0][0] = +p[0][0], a[1][0] = +p[1][0], a[0][1] = +p[0][1], a[1][1] = +p[1][1], _) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, _.constrain = function(p) {
    return arguments.length ? (i = p, _) : i;
  }, _.duration = function(p) {
    return arguments.length ? (r = +p, _) : r;
  }, _.interpolate = function(p) {
    return arguments.length ? (l = p, _) : l;
  }, _.on = function() {
    var p = c.on.apply(c, arguments);
    return p === c ? _ : p;
  }, _.clickDistance = function(p) {
    return arguments.length ? (I = (p = +p) * p, _) : Math.sqrt(I);
  }, _.tapDistance = function(p) {
    return arguments.length ? (M = +p, _) : M;
  }, _;
}
var Gd = Object.defineProperty, Bd = Object.getOwnPropertyDescriptor, oe = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Bd(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && Gd(t, i, s), s;
};
function Yd(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, a = n.x - i.x, r = n.y - i.y, l = s * r - o * a;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * r - (i.y - e.y) * a) / l, u = ((i.x - e.x) * o - (i.y - e.y) * s) / l;
  return c <= 0.02 || c >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function jd(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), r = t.x + a * n, l = t.y + a * s;
  return { dist: Math.hypot(e.x - r, e.y - l), t: a };
}
function Xd(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], a = e[s + 1], r = Math.hypot(a.x - o.x, a.y - o.y) || 1, l = (a.x - o.x) / r, c = (a.y - o.y) / r, u = t.map(([m, f]) => Yd(o, a, m, f)).filter((m) => m !== null).filter((m) => m.t * r > i + 2 && (1 - m.t) * r > i + 2).sort((m, f) => m.t - f.t);
    let h = -1 / 0;
    for (const m of u)
      m.t * r - i <= h + 2 || (n += ` L ${m.x - l * i} ${m.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + l * i} ${m.y + c * i}`, h = m.t * r + i);
    n += ` L ${a.x} ${a.y}`;
  }
  return n;
}
const Ot = {
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
let ne = class extends He {
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
    this._zoomBehavior = Wd().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const n = this.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return;
    const s = Math.min(...t.map((u) => u.x - u.w / 2)) - e, o = Math.max(...t.map((u) => u.x + u.w / 2)) + e, a = Math.min(...t.map((u) => u.y - u.h / 2)) - e, r = Math.max(...t.map((u) => u.y + u.h / 2)) + e, l = Math.max(0.15, Math.min(n.width / (o - s), n.height / (r - a), 1.25)), c = ft.translate(n.width / 2 - l * (s + o) / 2, n.height / 2 - l * (a + r) / 2).scale(l);
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
    var i, n, s;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let o = e.parentId; o; o = (n = this.scene.nodes.find((a) => a.id === o)) == null ? void 0 : n.parentId) {
      const a = this.scene.nodes.find((l) => l.id === o);
      if (!a) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - a.x), y: e.y + (this._dragPos.y - a.y) };
      const r = (s = this._dragGroup) == null ? void 0 : s.get(o);
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
      const n = this.scene.nodes.find((s) => s.id === e.parentId);
      if (n) {
        const s = this.nodePos(n), o = s.x - n.w / 2 + 10 + e.w / 2, a = s.x + n.w / 2 - 10 - e.w / 2, r = s.y - n.h / 2 + 34 + e.h / 2, l = s.y + n.h / 2 - 10 - e.h / 2;
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
    var n, s;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const o of i) {
      const a = (s = o.closest) == null ? void 0 : s.call(o, "[data-node-id]");
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
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const o = new Set(this.selectedIds), a = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (m) => o.has(m.id) && !(m.parentId && o.has(m.parentId))
    ) : null, r = a ? new Map(a.map((m) => [m.id, this.nodePos(m)])) : null, l = (m) => (m.shiftKey || m.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, c = (m) => {
      const f = this.nodeIdAt(m), y = f && f !== t.id ? this.scene.nodes.find((I) => I.id === f) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, u = (m) => {
      if ((m.buttons & 1) === 0) {
        h(m);
        return;
      }
      const f = this.toScene(m), y = f.x - i.x, I = f.y - i.y;
      if (!(!s && Math.hypot(y, I) < 3 / this._t.k))
        if (s = !0, a && r) {
          const M = /* @__PURE__ */ new Map();
          for (const _ of a) {
            const P = r.get(_.id), H = this.clampToParent(_, P.x + y, P.y + I);
            M.set(_.id, { x: H.x, y: H.y });
          }
          this._dragGroup = M;
        } else l(m) ? (this._dragPos = { id: t.id, x: n.x + y, y: n.y + I }, this._hoverNodeId = c(m)) : (this._dragPos = this.clampToParent(t, n.x + y, n.y + I), this._hoverNodeId = null);
    }, h = (m) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", h), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, y]) => ({ id: f, x: y.x, y: y.y }))
        });
      else if (s && this._dragPos) {
        if (l(m)) {
          const f = c(m);
          if (m.ctrlKey && t.kind === "api") {
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
    window.addEventListener("pointermove", u), window.addEventListener("pointerup", h);
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
    const s = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((I) => I.parentId === t.id), l = Math.min(...r.map((I) => I.x - I.w / 2)), c = Math.max(...r.map((I) => I.x + I.w / 2)), u = Math.min(...r.map((I) => I.y - I.h / 2)), h = Math.max(...r.map((I) => I.y + I.h / 2)), m = Is(
      r.map((I) => ({ dx: I.x - a.x, dy: I.y - a.y, w: I.w, h: I.h })),
      { w: s, h: o }
    ), f = (I) => {
      if ((I.buttons & 1) === 0) {
        y();
        return;
      }
      const M = this.toScene(I);
      if (I.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(m.w, 2 * Math.abs(M.x - a.x)),
          h: Math.max(m.h, 2 * Math.abs(M.y - a.y))
        };
        return;
      }
      const _ = a.x - i * a.w / 2, P = a.y - n * a.h / 2, H = i > 0 ? Math.max(M.x, _ + s, r.length ? c + 10 : -1 / 0) : Math.min(M.x, _ - s, r.length ? l - 10 : 1 / 0), K = n > 0 ? Math.max(M.y, P + o, r.length ? h + 10 : -1 / 0) : Math.min(M.y, P - o, r.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + H) / 2,
        y: (P + K) / 2,
        w: Math.abs(H - _),
        h: Math.abs(K - P)
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
      const a = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: a.x, y: a.y }, this._hoverNodeId = this.nodeIdAt(o);
    }, s = (o) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const a = this.nodeIdAt(o);
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
    const { x: n, y: s } = this.nodePos(e), o = t - n, a = i - s, r = e.w / 2, l = e.h / 2;
    if (o === 0 && a === 0) return { x: n, y: s };
    const c = 1 / Math.max(Math.abs(o) / r, Math.abs(a) / l);
    return { x: n + o * c, y: s + a * c };
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
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), a = n[0] ?? o, r = n[n.length - 1] ?? s;
    let l = this.borderPoint(t, a.x, a.y), c = this.borderPoint(i, r.x, r.y);
    if (!n.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const h = Math.hypot(c.x - l.x, c.y - l.y) || 1, m = -(c.y - l.y) / h * u, f = (c.x - l.x) / h * u;
        l = { x: l.x + m, y: l.y + f }, c = { x: c.x + m, y: c.y + f };
      }
    }
    return [l, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (a) => {
      if (!this._wpDrag) return;
      n = !0;
      const r = this.toScene(a), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: l };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = jd(t, e[n], e[n + 1]);
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
    const a = (l) => {
      if ((l.buttons & 1) === 0) {
        r();
        return;
      }
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
    const i = t.map((n) => `${n.x},${n.y}`).join(" ");
    return B`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${i}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(n) => {
      n.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(n) => {
      n.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(n));
    }}
              @pointerdown=${(n) => this.onEdgeHitPointerDown(n, e, t)}>
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
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), r = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, l = t.slice(1, -1);
    return B`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Xd(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? B`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
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
        ${s ? l.map((c, u) => {
      var m;
      const h = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === u;
      return B`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${h ? 6 : 5}
                        fill=${h ? "#2563eb" : "#ffffff"}
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
    var m, f, y;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, r = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = r / 2, u = l / 2, h = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return B`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (y = this._dragGroup) != null && y.has(e.id) ? "none" : "auto"}
         @pointerdown=${(I) => this.onNodePointerDown(I, e)}
         @dblclick=${(I) => {
      I.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? B`<rect x=${-c - 4} y=${-u - 4} width=${r + 8} height=${l + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-u} width=${r} height=${l} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? B`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? B`<text x=${-c} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? B`<g transform="translate(${c - 13}, ${-u + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(I) => {
      I.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(I) => I.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && Ot[e.symbol] && !a ? B`<g transform="translate(${c - (e.collapsible ? 37 : 17)}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Ot[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && Ot[e.symbol] ? B`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Ot[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? B`
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
              </foreignObject>` : a ? B`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? B`<text x=${-c + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : B`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? B`<line x1=${-c + 8} y1=${-u + 28} x2=${c - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (a ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, u],
      [0, -u]
    ].map(
      ([I, M]) => B`
                <circle data-handle cx=${I} cy=${M} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(_) => this.onHandlePointerDown(_, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([I, M]) => B`
                <rect data-resize x=${I * c - 6.5} y=${M * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${I * M > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(_) => this.onResizePointerDown(_, e, I, M)}>
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
    const n = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, s = (a) => {
      if ((a.buttons & 1) === 0) {
        n();
        return;
      }
      const r = this.toScene(a);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, o = () => {
      if (window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a, b: r } = this._rubber, l = Math.min(a.x, r.x), c = Math.max(a.x, r.x), u = Math.min(a.y, r.y), h = Math.max(a.y, r.y), m = this.scene.nodes.filter((f) => {
          const y = this.nodePos(f);
          return y.x >= l && y.x <= c && y.y >= u && y.y <= h;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
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
    const i = Math.min(...t.map((a) => a.x - a.w / 2)) - e, n = Math.max(...t.map((a) => a.x + a.w / 2)) + e, s = Math.min(...t.map((a) => a.y - a.h / 2)) - e, o = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: o - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, o = ft.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    be(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return R``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, r = s.width / this._t.k, l = s.height / this._t.k;
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
      this.onMinimapPointer(c, e, n);
    }}
        @pointermove=${(c) => {
      var u, h;
      (h = (u = c.currentTarget).hasPointerCapture) != null && h.call(u, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const u = this.nodePos(c);
      return B`<rect
              x=${(u.x - c.w / 2 - e.minX) * n}
              y=${(u.y - c.h / 2 - e.minY) * n}
              width=${Math.max(2, c.w * n)}
              height=${Math.max(2, c.h * n)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * n}
            y=${(a - e.minY) * n}
            width=${r * n}
            height=${l * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((s) => s.color ?? "#64748b"))], t = [], i = [], n = [];
    return this.scene.edges.forEach((s) => {
      const o = this.edgePolyline(s);
      if (o) {
        i.push(this.renderEdgeHit(s, o)), n.push(this.renderEdgeInk(s, o, [...t]));
        for (let a = 0; a < o.length - 1; a++) t.push([o[a], o[a + 1]]);
      }
    }), R`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(s) => {
      const o = s.target;
      o.closest("[data-node-id]") || o.closest("[data-edge-id]") || this._spaceDown || s.button !== 0 || (s.buttons & 1) !== 0 && this.startRubberBand(s);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (s) => B`
              <marker id="arrow-${this.markerId(s)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${s}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${i}
          ${this.scene.nodes.filter((s) => !s.parentId).map((s) => this.renderNode(s))}
          ${this.scene.nodes.filter((s) => s.parentId).map((s) => this.renderNode(s))}
          ${n}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
ne.styles = bi`
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
], ne.prototype, "scene", 2);
oe([
  Se({ attribute: !1 })
], ne.prototype, "selectedId", 2);
oe([
  Se({ attribute: !1 })
], ne.prototype, "selectedIds", 2);
oe([
  Se({ type: Boolean })
], ne.prototype, "connectable", 2);
oe([
  Se({ attribute: !1 })
], ne.prototype, "edgePoints", 2);
oe([
  U()
], ne.prototype, "_t", 2);
oe([
  U()
], ne.prototype, "_dragPos", 2);
oe([
  U()
], ne.prototype, "_dragGroup", 2);
oe([
  U()
], ne.prototype, "_pendingLink", 2);
oe([
  U()
], ne.prototype, "_hoverNodeId", 2);
oe([
  U()
], ne.prototype, "_editingId", 2);
oe([
  U()
], ne.prototype, "_spaceDown", 2);
oe([
  U()
], ne.prototype, "_wpDrag", 2);
oe([
  U()
], ne.prototype, "_selectedWaypoint", 2);
oe([
  U()
], ne.prototype, "_resize", 2);
oe([
  U()
], ne.prototype, "_rubber", 2);
ne = oe([
  Ai("modux-canvas")
], ne);
const F = {
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
function Qd(e, t) {
  var D, C, N, G, X;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((p) => [p.id, p.name])), s = e.modules.flatMap(
    (p) => (p.useCases ?? []).map((x) => ({ ...x, moduleId: p.id }))
  ), o = new Set(s.map((p) => p.id)), a = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((p) => (p.domainServices ?? []).map((x) => x.id))
  ), l = e.modules.flatMap(
    (p) => (p.domainEvents ?? []).map((x) => ({ ...x, moduleId: p.id, application: !1 }))
  ), c = e.modules.flatMap(
    (p) => (p.applicationEvents ?? []).map((x) => ({ ...x, moduleId: p.id, application: !0 }))
  ), u = e.modules.flatMap(
    (p) => (p.readModels ?? []).map((x) => ({ ...x, moduleId: p.id }))
  );
  for (const p of s)
    pe(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: F.command.w,
      h: F.command.h,
      kind: "use-case",
      symbol: p.policy ? "flow" : "gear",
      fill: p.policy ? F.policy.fill : F.command.fill,
      stroke: p.policy ? F.policy.stroke : F.command.stroke,
      badge: p.policy ? "POLICY" : "COMANDO",
      tooltip: p.policy ? `${p.name} — policy de ${n.get(p.moduleId) ?? p.moduleId} (reacción, no caso de negocio)` : `${p.name} — caso de uso de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  for (const p of a)
    pe(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: F.aggregate.w,
      h: F.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: F.aggregate.fill,
      stroke: F.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${p.name} — agregado de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  const h = /* @__PURE__ */ new Map();
  for (const p of [...l, ...c])
    pe(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: F.event.w,
      h: F.event.h,
      kind: p.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: F.event.fill,
      stroke: F.event.stroke,
      badge: p.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${p.name} — evento de ${n.get(p.moduleId) ?? p.moduleId}`
    }), h.set(Be(p.name), p.id);
  const m = (p) => {
    if (!p || !p.trim()) return null;
    const x = h.get(Be(p));
    if (x) return x;
    const w = `evname:${Be(p)}`;
    return pe(i, {
      id: w,
      label: p,
      x: 0,
      y: 0,
      w: F.event.w,
      h: F.event.h,
      kind: "event-name",
      symbol: "event",
      fill: F.event.fill,
      stroke: F.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${p} — referenciado por nombre, sin evento declarado en el catálogo`
    }), w;
  }, f = (p) => {
    const x = u.find((k) => k.id === p.id) ?? u.find((k) => p.name && Be(k.name) === Be(p.name)), w = (x == null ? void 0 : x.id) ?? (p.id || (p.name ? `rm:${Be(p.name)}` : null));
    return w ? (pe(i, {
      id: w,
      label: (x == null ? void 0 : x.name) ?? p.name ?? w,
      x: 0,
      y: 0,
      w: F.readModel.w,
      h: F.readModel.h,
      kind: x ? "read-model" : "derived-read-model",
      fill: F.readModel.fill,
      stroke: F.readModel.stroke,
      dashed: !x,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const p of e.actorUses ?? []) {
    if (!o.has(p.targetId)) continue;
    const x = (e.actors ?? []).find((w) => w.id === p.actorId);
    x && (pe(i, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: F.actor.w,
      h: F.actor.h,
      kind: "actor",
      symbol: "person",
      fill: F.actor.fill,
      stroke: F.actor.stroke,
      badge: "ACTOR"
    }), te(i, {
      id: `es-actor:${x.id}->${p.targetId}`,
      sourceId: x.id,
      targetId: p.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const p of e.aiAgents ?? []) {
    const x = (e.agentUses ?? []).filter((b) => b.agentId === p.id), w = (e.agentExternalUses ?? []).filter((b) => b.agentId === p.id), k = (e.agentRags ?? []).filter((b) => b.agentId === p.id), T = (e.agentMcpUses ?? []).filter((b) => b.agentId === p.id), L = (e.agentGatewayUses ?? []).some((b) => b.agentId === p.id) || (e.agentApiOpUses ?? []).some((b) => b.agentId === p.id) || (e.agentQueryUses ?? []).some((b) => b.agentId === p.id) || (e.agentDelegations ?? []).some((b) => b.agentId === p.id) || (e.agentTriggers ?? []).some((b) => b.agentId === p.id);
    if (!(!x.length && !w.length && !k.length && !T.length && !L)) {
      pe(i, {
        id: p.id,
        label: p.name,
        x: 0,
        y: 0,
        w: F.actor.w,
        h: F.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${p.name} — agente de IA (consume por MCP)`
      });
      for (const b of x)
        o.has(b.useCaseId) && te(i, {
          id: `es-agent:${p.id}->${b.useCaseId}`,
          sourceId: p.id,
          targetId: b.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const b of w) {
        const S = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === b.externalUseCaseId)
        );
        if (!S) continue;
        const O = (D = (S.useCases ?? []).find((Z) => Z.id === b.externalUseCaseId)) == null ? void 0 : D.name;
        pe(i, {
          id: S.id,
          label: S.name,
          x: 0,
          y: 0,
          w: F.external.w,
          h: F.external.h,
          kind: "external-system",
          symbol: "component",
          fill: F.external.fill,
          stroke: F.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentx:${p.id}->${b.externalUseCaseId}`,
          sourceId: p.id,
          targetId: S.id,
          kind: "es-agent-external",
          label: O,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: O ? `Llama a ${O} del sistema externo` : void 0
        });
      }
      for (const b of T) {
        const S = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === b.mcpServerId)
        );
        if (!S) continue;
        const O = (C = (S.mcpServers ?? []).find((Z) => Z.id === b.mcpServerId)) == null ? void 0 : C.name;
        pe(i, {
          id: S.id,
          label: S.name,
          x: 0,
          y: 0,
          w: F.external.w,
          h: F.external.h,
          kind: "external-system",
          symbol: "component",
          fill: F.external.fill,
          stroke: F.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), te(i, {
          id: `es-agentmcp:${p.id}->${b.mcpServerId}`,
          sourceId: p.id,
          targetId: S.id,
          kind: "es-agent-mcp",
          label: O,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: O ? `Consume las herramientas del servidor MCP ${O}` : void 0
        });
      }
      for (const b of k) {
        const S = (e.rags ?? []).find((O) => O.id === b.ragId);
        if (S) {
          pe(i, {
            id: S.id,
            label: S.name,
            x: 0,
            y: 0,
            w: F.readModel.w,
            h: F.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${S.name} — base de conocimiento (retrieval)`
          }), te(i, {
            id: `es-agrag:${p.id}->${S.id}`,
            sourceId: p.id,
            targetId: S.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const O of S.sourceReadModelIds ?? []) {
            const Z = f({ id: O });
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
  const y = (p) => {
    const x = e.externalSystems.find((w) => w.id === p);
    return x ? (pe(i, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: F.external.w,
      h: F.external.h,
      kind: "external-system",
      symbol: "component",
      fill: F.external.fill,
      stroke: F.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), x.id) : null;
  };
  for (const p of e.externalCalls ?? []) {
    const x = y(p.externalSystemId);
    !x || !o.has(p.useCaseId) || te(i, {
      id: `es-extin:${x}->${p.useCaseId}`,
      sourceId: x,
      targetId: p.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const p of e.externalUseCaseCalls ?? []) {
    if (!o.has(p.sourceId)) continue;
    const x = e.externalSystems.find(
      (T) => (T.useCases ?? []).some((L) => L.id === p.targetId)
    ), w = x ? y(x.id) : null;
    if (!w) continue;
    const k = (N = ((x == null ? void 0 : x.useCases) ?? []).find((T) => T.id === p.targetId)) == null ? void 0 : N.name;
    te(i, {
      id: `es-extout:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: w,
      kind: "es-command-external",
      label: k,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: k ? `Llama a ${k} del sistema externo` : void 0
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
    !i.nodes.has(p.domainEventId) || !(i.nodes.has(p.sourceId) && (o.has(p.sourceId) || a.some((w) => w.id === p.sourceId) || r.has(p.sourceId))) || te(i, {
      id: `es-emit:${p.sourceId}->${p.domainEventId}`,
      sourceId: p.sourceId,
      targetId: p.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const M = (p, x, w, k, T, L) => (pe(i, {
    id: p,
    label: x,
    x: 0,
    y: 0,
    w: F.policy.w,
    h: F.policy.h,
    kind: w,
    symbol: "flow",
    fill: F.policy.fill,
    stroke: F.policy.stroke,
    badge: k,
    tooltip: T
  }), p), _ = (p, x) => {
    const w = m(p);
    w && te(i, {
      id: `es-trigger:${w}->${x}`,
      sourceId: w,
      targetId: x,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, P = (p, x) => {
    !x || !o.has(x) || te(i, {
      id: `es-invoke:${p}->${x}`,
      sourceId: p,
      targetId: x,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const p of e.subscriptions ?? []) {
    const x = M(
      p.id,
      p.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${p.name}${p.eventName ? ` — reacciona a ${p.eventName}` : ""}${p.consumerGroup ? ` · grupo ${p.consumerGroup}` : ""}`
    );
    _(p.eventName, x);
    for (const w of p.actions ?? []) {
      if (w.type === "CallUseCase" && P(x, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const k = `saga:${w.sagaId}`;
        M(k, w.sagaId, "saga", "SAGA"), te(i, {
          id: `es-saga:${x}->${k}`,
          sourceId: x,
          targetId: k,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const k = (e.projections ?? []).find((T) => T.id === w.projectionId);
        k && te(i, {
          id: `es-feeds:${x}->${k.id}`,
          sourceId: x,
          targetId: k.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const p of e.projections ?? []) {
    const x = M(
      p.id,
      p.name,
      "projection",
      "PROYECCIÓN",
      `${p.name}${p.readModelName ? ` — materializa ${p.readModelName}` : ""}`
    );
    for (const T of p.handledEventIds) {
      const L = i.nodes.has(T) ? T : null;
      L && te(i, {
        id: `es-trigger:${L}->${x}`,
        sourceId: L,
        targetId: x,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    p.sourceAggregateId && i.nodes.has(p.sourceAggregateId) && te(i, {
      id: `es-state:${p.id}`,
      sourceId: p.sourceAggregateId,
      targetId: x,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const w = p.sourceExternalUseCaseId ?? p.sourceExternalTableId;
    if (w) {
      const T = e.externalSystems.find(
        (b) => (b.useCases ?? []).some((S) => S.id === w) || (b.tables ?? []).some((S) => S.id === w)
      ), L = T ? y(T.id) : null;
      if (L) {
        const b = ((G = (T.useCases ?? []).find((S) => S.id === w)) == null ? void 0 : G.name) ?? ((X = (T.tables ?? []).find((S) => S.id === w)) == null ? void 0 : X.name);
        te(i, {
          id: `es-poll:${p.id}`,
          sourceId: L,
          targetId: x,
          kind: "es-projects-poll",
          label: b,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: b ? `polling de ${b}` : "polling"
        });
      }
    }
    const k = f({ id: p.readModelId, name: p.readModelName });
    k && te(i, {
      id: `es-projects:${x}->${k}`,
      sourceId: x,
      targetId: k,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const p of e.flows) {
    if (p.archetype === "MATERIALIZES") {
      const w = m(p.triggerEvent), k = f({ name: p.readModelName ?? `${p.triggerEvent}View` });
      w && k && te(i, {
        id: `es-mat:${p.id}`,
        sourceId: w,
        targetId: k,
        kind: "es-materializes",
        label: p.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${p.name} [MATERIALIZES]`
      });
      continue;
    }
    const x = M(
      `flow:${p.id}`,
      p.name,
      "flow",
      `POLICY · ${p.archetype}`,
      `Flow ${p.name} [${p.archetype}]`
    );
    if (_(p.triggerEvent, x), P(x, p.targetUseCaseId), !p.targetUseCaseId) {
      const w = y(p.targetId), k = w ?? `tgt:${p.targetId}`;
      !w && n.has(p.targetId) && pe(i, {
        id: k,
        label: n.get(p.targetId) ?? p.targetId,
        x: 0,
        y: 0,
        w: F.module.w,
        h: F.module.h,
        kind: "module",
        symbol: "component",
        fill: F.module.fill,
        stroke: F.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(k) && te(i, {
        id: `es-deliver:${p.id}`,
        sourceId: x,
        targetId: k,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const p of e.processes ?? []) {
    const x = M(
      p.id,
      p.name,
      "process",
      `PROCESO${p.sla ? ` · SLA ${p.sla}` : ""}`,
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    _(p.triggerEvent, x);
    for (const k of p.steps) P(x, k.useCaseId);
    const w = m(p.onCompletionEventName);
    w && te(i, {
      id: `es-done:${p.id}`,
      sourceId: x,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const p of e.workflows ?? []) {
    const x = M(
      p.id,
      p.name,
      "workflow",
      "WORKFLOW",
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    _(p.triggerEvent, x);
    for (const k of p.steps ?? []) {
      P(x, k.targetUseCaseId);
      for (const T of [k.emittedEventName, k.completionEventName]) {
        const L = m(T);
        L && te(i, {
          id: `es-wfemit:${p.id}:${L}`,
          sourceId: x,
          targetId: L,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = m(p.onCompletionEventName);
    w && te(i, {
      id: `es-done:${p.id}`,
      sourceId: x,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const H = [...i.nodes.values()], K = /* @__PURE__ */ new Map();
  for (const p of i.edges)
    K.has(p.targetId) || K.set(p.targetId, []), K.get(p.targetId).push(p.sourceId);
  const v = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), $ = (p) => {
    const x = v.get(p);
    if (x !== void 0) return x;
    if (g.has(p)) return 0;
    g.add(p);
    const w = K.get(p) ?? [], k = w.length ? 1 + Math.max(...w.map($)) : 0;
    return g.delete(p), v.set(p, k), k;
  }, E = /* @__PURE__ */ new Map();
  for (const p of H) {
    const x = t[p.id];
    if (x) {
      p.x = x.x, p.y = x.y;
      continue;
    }
    const w = $(p.id), k = E.get(w) ?? 0;
    E.set(w, k + 1), p.x = 140 + w * 260, p.y = 110 + k * 110;
  }
  return { nodes: H, edges: i.edges };
}
const Zd = 190, Jd = 56, fn = 180, el = 56, tl = 150, il = 44, gn = 250, wn = 100;
function nl(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), a;
  };
  return n(e);
}
function sl(e, t) {
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
function ol(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (r) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === r)) == null ? void 0 : l.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((r) => {
    var M;
    const l = new Map(r.steps.map((_) => [_.id, _])), c = new Map(r.steps.map((_) => [_.id, nl(_, l)])), u = /* @__PURE__ */ new Map();
    for (const _ of r.steps) {
      const P = c.get(_.id) ?? 0;
      u.set(P, (u.get(P) ?? 0) + 1);
    }
    const h = Math.max(1, ...u.values()), m = sl(e, r);
    if (m && !s.has(m.id)) {
      s.add(m.id);
      const _ = t[m.id] ?? { x: 140, y: a };
      i.push({
        id: m.id,
        label: m.label,
        x: _.x,
        y: _.y,
        w: tl,
        h: il,
        kind: m.kind,
        symbol: m.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: m.kind === "aggregate" ? "AGGREGATE" : m.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[r.id] ?? { x: 420, y: a };
    i.push({
      id: r.id,
      label: r.name,
      x: f.x,
      y: f.y,
      w: Zd,
      h: Jd,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), m && n.push({
      id: `wft:${r.id}`,
      sourceId: m.id,
      targetId: r.id,
      kind: "workflow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    });
    const y = /* @__PURE__ */ new Map();
    let I = 0;
    for (const _ of r.steps) {
      const P = c.get(_.id) ?? 0;
      I = Math.max(I, P);
      const H = y.get(P) ?? 0;
      y.set(P, H + 1);
      const K = t[_.id] ?? {
        x: f.x + (P + 1) * gn,
        y: a + (H - (u.get(P) - 1) / 2) * wn
      }, v = o(_.targetUseCaseId);
      i.push({
        id: _.id,
        label: _.name,
        x: K.x,
        y: K.y,
        w: fn,
        h: el,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: v ? `→ ${v}` : "∅ sin use case",
        tooltip: `${_.name}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${v ? ` · lanza ${v}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}`
      });
      const g = (_.dependsOnStepIds ?? []).filter(($) => l.has($));
      g.length === 0 && n.push({
        id: `wfs:${r.id}:${_.id}`,
        sourceId: r.id,
        targetId: _.id,
        kind: "workflow-start",
        label: _.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const $ of g)
        n.push({
          id: `wfdep:${$}->${_.id}`,
          sourceId: $,
          targetId: _.id,
          kind: "workflow-dependency",
          label: _.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${_.name} espera a ${((M = l.get($)) == null ? void 0 : M.name) ?? $}`
        });
    }
    if (r.onCompletionEventName) {
      const _ = `done:${r.id}`, P = t[_] ?? { x: f.x + (I + 2) * gn, y: a };
      i.push({
        id: _,
        label: r.onCompletionEventName,
        x: P.x,
        y: P.y,
        w: fn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const H = new Set(r.steps.flatMap((v) => v.dependsOnStepIds ?? [])), K = r.steps.filter((v) => !H.has(v.id));
      for (const v of K.length ? K : [])
        n.push({
          id: `wfd:${r.id}:${v.id}`,
          sourceId: v.id,
          targetId: _,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      r.steps.length || n.push({
        id: `wfd:${r.id}`,
        sourceId: r.id,
        targetId: _,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, h + 1) * wn + 60;
  }), { nodes: i, edges: n };
}
async function al(e, t) {
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
  }, a = await n.layout(o), r = {};
  for (const l of a.children ?? [])
    r[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return r;
}
var rl = Object.defineProperty, dl = Object.getOwnPropertyDescriptor, W = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? dl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && rl(t, i, s), s;
};
const Ii = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, ll = Object.keys(Ii), cl = ["CORE", "SUPPORTING", "GENERIC"];
function lt(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let r = 0, l = 1;
  const c = t.x - e.x, u = t.y - e.y;
  for (const [h, m] of [
    [-c, e.x - n],
    [c, s - e.x],
    [-u, e.y - o],
    [u, a - e.y]
  ]) {
    if (h === 0) {
      if (m < 0) return !1;
      continue;
    }
    const f = m / h;
    if (h < 0) {
      if (f > l) return !1;
      f > r && (r = f);
    } else {
      if (f < r) return !1;
      f < l && (l = f);
    }
  }
  return l - r > 0.02;
}
function ul(e, t, i = 28) {
  var c;
  const n = new Map(e.nodes.map((u) => [u.id, u])), s = (u) => {
    var m;
    const h = /* @__PURE__ */ new Set();
    for (let f = u; f; f = (m = n.get(f)) == null ? void 0 : m.parentId) h.add(f);
    return h;
  }, o = e.nodes, a = (u) => u.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (u, h, m) => {
    const f = a(m), y = { x: m.x, y: m.y, w: m.w + 2 * f, h: m.h + 2 * f }, I = m.w / 2 + f * 1.5, M = m.h / 2 + f * 1.5, _ = { x: m.x - I, y: m.y - M }, P = { x: m.x + I, y: m.y - M }, H = { x: m.x - I, y: m.y + M }, K = { x: m.x + I, y: m.y + M }, v = [];
    for (const g of [_, P, H, K])
      !lt(u, g, y) && !lt(g, h, y) && v.push([g]);
    for (const [g, $] of [
      [_, P],
      [P, _],
      [P, K],
      [K, P],
      [K, H],
      [H, K],
      [H, _],
      [_, H]
    ])
      !lt(u, g, y) && !lt($, h, y) && v.push([g, $]);
    return v;
  };
  for (const u of e.edges) {
    if ((c = t[u.id]) != null && c.length) continue;
    const h = n.get(u.sourceId), m = n.get(u.targetId);
    if (!h || !m) continue;
    const f = /* @__PURE__ */ new Set([...s(h.id), ...s(m.id)]), y = [
      { x: h.x, y: h.y },
      { x: m.x, y: m.y }
    ];
    for (let I = 0; I < 12; I++) {
      let M = !1;
      e: for (let _ = 0; _ < y.length - 1; _++)
        for (const P of o) {
          if (f.has(P.id)) continue;
          const H = a(P), K = { x: P.x, y: P.y, w: P.w + 2 * H, h: P.h + 2 * H };
          if (!lt(y[_], y[_ + 1], K)) continue;
          const v = l(y[_], y[_ + 1], P);
          if (!v.length) continue;
          const g = (E) => o.some(
            (D) => D !== P && !f.has(D.id) && Math.abs(E.x - D.x) < D.w / 2 + a(D) / 2 && Math.abs(E.y - D.y) < D.h / 2 + a(D) / 2
          ), $ = (E) => {
            let D = 0;
            const C = [y[_], ...E, y[_ + 1]];
            for (let N = 0; N < C.length - 1; N++)
              D += Math.hypot(C[N + 1].x - C[N].x, C[N + 1].y - C[N].y);
            return D + (E.some(g) ? 1e4 : 0);
          };
          v.sort((E, D) => $(E) - $(D)), y.splice(_ + 1, 0, ...v[0]), M = !0;
          break e;
        }
      if (!M) break;
    }
    y.length > 2 && r.set(
      u.id,
      y.slice(1, -1).map((I) => ({ x: Math.round(I.x), y: Math.round(I.y) }))
    );
  }
  return r;
}
const z = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function pl(e, t) {
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
function hl(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let V = class extends He {
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
    return Ct(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Ct(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = Ct(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    }), e === "contexts" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "external-ai-agent" && this._newContextMapKind !== "mcp-gateway" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module");
    const s = Ct(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((u) => !u.parentId), r = _i(a), l = [...r.keys()].map((u) => ({
      kind: "move-node",
      view: "context-map",
      id: u,
      pos: o.nodes[u] ?? null
    })), c = { ...o.nodes };
    for (const [u, h] of r) {
      const m = a.find((y) => y.id === u), f = o.nodes[u] ?? { x: m.x, y: m.y };
      c[u] = {
        x: Math.round(f.x + (h.x - m.x)),
        y: Math.round(f.y + (h.y - m.y))
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
    const i = ul(e, t);
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
        const o = (n = (this.model.apis ?? []).find((a) => a.id === e.apiId)) == null ? void 0 : n.operations.find((a) => a.id === e.id);
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
        const o = (s = (this.model.apis ?? []).find((a) => a.id === e.apiId)) == null ? void 0 : s.operations.find((a) => a.id === e.id);
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
      case "set-workflow-trigger": {
        const o = (this.model.workflows ?? []).find((a) => a.id === e.id);
        return o ? [{
          kind: "set-workflow-trigger",
          id: e.id,
          triggerEvent: o.triggerEvent ?? "",
          triggerAggregateId: o.triggerAggregateId,
          triggerDomainServiceId: o.triggerDomainServiceId,
          triggerUseCaseId: o.triggerUseCaseId
        }] : null;
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, o = this.viewLayout(s), a = o.nodes[t] ?? null;
    let r = { x: i, y: n };
    const l = this.sceneFor(s), c = l.nodes.find((h) => h.id === t);
    if (c != null && c.parentId) {
      const h = l.nodes.find((m) => m.id === c.parentId);
      h && (r = { x: i - h.x, y: n - h.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: r } });
    const u = [{ kind: "move-node", view: s, id: t, pos: a }];
    if (s === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const m = this.inverseOf(h);
        m && u.unshift(...m), this.command(h, !1);
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((y) => y.id === t) ?? (this.model.proxyApis ?? []).find((y) => y.id === t);
    if (!o || i && !this.model.externalSystems.some((y) => y.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === a) return;
    const l = this._view, c = this.viewLayout(l), u = this.sceneFor(l), h = r ? u.nodes.find((y) => y.id === r) : void 0, m = h ? { x: n - h.x, y: s - h.y } : { x: n, y: s }, f = [
      { kind: "set-api-publisher", id: t, targetId: a },
      { kind: "move-node", view: l, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(l, { ...c, nodes: { ...c.nodes, [t]: m } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((y) => y.id === t), a = this.model.externalSystems.find((y) => y.id === i);
    if (!o || !a || (this.model.proxyApis ?? []).some(
      (y) => y.targetApiId === t && y.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${z(o.name)}-${z(a.name)}`;
    if ((this.model.proxyApis ?? []).some((y) => y.id === l)) return;
    const c = this._view, u = this.viewLayout(c), m = this.sceneFor(c).nodes.find((y) => y.id === i);
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
    m && (f.push({ kind: "move-node", view: c, id: l, pos: u.nodes[l] ?? null }), this.writeViewLayout(c, {
      ...u,
      nodes: { ...u.nodes, [l]: { x: n - m.x, y: s - m.y } }
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
    const n = await i.text(), s = this.selectedApiId(), o = s ? null : ((l = this.model.externalSystems.find((u) => u.id === this._selectedId)) == null ? void 0 : l.id) ?? null, a = s || o ? null : ((c = this.model.modules.find((u) => u.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
    if (!s && !o && !a) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: s,
      homeExternalId: o,
      homeModuleId: a
    });
  }
  /** One dropdown drives the diagram: a context-map detail level, or a specialized view. */
  onDiagramScopeChange(e) {
    if (e.startsWith("level:")) {
      this._view = "context-map", this.setDetail(e.slice(6));
      return;
    }
    e.startsWith("view:") && (this._view = e.slice(5));
  }
  /** Folding is a view preference (like the detail level): persisted, not undoable. */
  onNodeCollapseToggled(e) {
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), s = new Set(n.collapsed ?? []);
    s.has(t) ? s.delete(t) : s.add(t), this.writeViewLayout(i, { ...n, collapsed: [...s] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), o = { ...n.nodes }, a = [];
    for (const { id: r, x: l, y: c } of t) {
      a.push({ kind: "move-node", view: i, id: r, pos: n.nodes[r] ?? null });
      let u = { x: l, y: c };
      const h = s.nodes.find((m) => m.id === r);
      if (h != null && h.parentId) {
        const m = s.nodes.find((f) => f.id === h.parentId);
        m && (u = { x: l - m.x, y: c - m.y });
      }
      o[r] = u;
    }
    if (this.writeViewLayout(i, { ...n, nodes: o }), i === "processes")
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
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, a = this._view, r = this.viewLayout(a), l = this.sceneFor(a).nodes.filter((h) => h.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((u = r.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: r.nodes[t] ?? null },
      ...l.map((h) => ({ kind: "move-node", view: a, id: h.id, pos: r.nodes[h.id] ?? null }))
    ]);
    const c = { ...r.nodes, [t]: { x: i, y: n } };
    for (const h of l) c[h.id] = { x: h.x - i, y: h.y - n };
    this.writeViewLayout(a, {
      ...r,
      nodes: c,
      sizes: { ...r.sizes ?? {}, [t]: { w: s, h: o } }
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
    const i = Li(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((a) => [a.id, a.x])), s = [...t.steps].sort(
      (a, r) => (n.get(a.id) ?? 0) - (n.get(r.id) ?? 0)
    );
    if (s.every((a, r) => a.id === t.steps[r].id)) return null;
    const o = s.findIndex((a) => a.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: o > 0 ? s[o - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: s } = e.detail;
    this.applyConnection(t, i, n, s);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, n) {
    var K;
    if (this._view === "workflows") {
      const v = this.owningWorkflowOf(e), g = this.owningWorkflowOf(t);
      if (!v || v !== g || e === t) return;
      const $ = v.steps.find((E) => E.id === t);
      if ((($ == null ? void 0 : $.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: v.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view !== "context-map") return;
    const s = /^apiop:(.+)@(.+)$/.exec(e);
    if (s) {
      const [, v, g] = s, $ = (this.model.proxyApis ?? []).find((G) => G.id === g), E = ($ == null ? void 0 : $.targetApiId) ?? ((K = (this.model.apiImplementations ?? []).find(
        (G) => G.moduleId === g && (this.model.apis ?? []).some(
          (X) => X.id === G.apiId && X.operations.some((p) => p.id === v)
        )
      )) == null ? void 0 : K.apiId);
      if (!E) return;
      if (new Set(
        this.model.modules.flatMap((G) => (G.useCases ?? []).map((X) => X.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: E,
          operationId: v,
          moduleId: g,
          targetUseCaseId: t
        });
        return;
      }
      if (!($ != null && $.targetApiId)) return;
      let C = null;
      if (t === $.targetApiId)
        C = $.targetApiId;
      else {
        const G = /^apiimpl:(.+)@(.+)$/.exec(t);
        G && G[1] === $.targetApiId ? C = G[2] : this.model.modules.some((X) => X.id === t) && (this.model.apiImplementations ?? []).some(
          (X) => X.apiId === $.targetApiId && X.moduleId === t
        ) && (C = t);
      }
      if (!C) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (G) => G.proxyId === $.id && G.operationId === v && G.targetSiteId === C
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: $.id,
        operationId: v,
        targetSiteId: C
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (N) => N.agentId === e && N.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (N) => N.agentId === e && N.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.mcpServers ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (N) => N.agentId === e && N.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((C) => C.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (N) => N.agentId === e && N.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((C) => C.operations.map((N) => N.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (N) => N.agentId === e && N.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (N) => N.agentId === e && N.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (N) => N.agentId === e && N.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (o.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (N) => N.agentId === e && N.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((C) => C.id === t) && ((this.model.agentRags ?? []).some(
        (N) => N.agentId === e && N.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === e)) {
      const v = (this.model.mcpGateways ?? []).find((E) => E.id === e), g = this.model.externalSystems.some((E) => (E.mcpServers ?? []).some((D) => D.id === t)) || (this.model.apis ?? []).some((E) => E.id === t) || (this.model.apis ?? []).some((E) => E.operations.some((D) => D.id === t)) || this.model.modules.some((E) => (E.useCases ?? []).some((D) => D.id === t)) || (this.model.rags ?? []).some((E) => E.id === t), $ = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      g && !$ && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) return;
    const a = (this.model.rags ?? []).find((v) => v.id === e);
    if (a) {
      if (new Set(
        this.model.modules.flatMap(($) => ($.readModels ?? []).map((E) => E.id))
      ).has(t) && !(a.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap(($) => ($.tables ?? []).map((E) => E.id))
      ).has(t) && !(a.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some(($) => $.id === t) || (this.model.proxyApis ?? []).some(($) => $.id === t)) && !(a.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some(($) => $.id === t) && !(a.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some(($) => $.id === t) && !(a.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((v) => v.id === t)) return;
    if ((this.model.workflows ?? []).some((v) => v.id === e)) {
      const v = (this.model.workflows ?? []).find((E) => E.id === e), g = (this.model.workflows ?? []).find(
        (E) => E.id === t && E.id !== e
      );
      if (g) {
        const E = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
        g.triggerEvent !== E && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: E });
        return;
      }
      const $ = this.model.modules.flatMap((E) => E.useCases ?? []).find((E) => E.id === t);
      if ($ && !(v.steps ?? []).some((D) => D.targetUseCaseId === t)) {
        const D = `wfs-${z($.name)}`;
        let C = D;
        for (let N = 2; (v.steps ?? []).some((G) => G.id === C); N++)
          C = `${D}-${N}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: C,
          name: $.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap((E) => E.domainEvents ?? []).find((E) => E.id === e), g = this.model.modules.flatMap((E) => E.applicationEvents ?? []).find((E) => E.id === e), $ = v ?? g;
      if ($) {
        const E = (this.model.emissions ?? []).find((G) => G.domainEventId === e), D = new Set((this.model.aggregates ?? []).map((G) => G.id)), C = new Set(
          this.model.modules.flatMap((G) => (G.domainServices ?? []).map((X) => X.id))
        ), N = new Set(
          this.model.modules.flatMap((G) => (G.useCases ?? []).map((X) => X.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: $.name,
          triggerAggregateId: E && D.has(E.sourceId) ? E.sourceId : void 0,
          triggerDomainServiceId: E && C.has(E.sourceId) ? E.sourceId : void 0,
          triggerUseCaseId: E && N.has(E.sourceId) ? E.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((v) => v.id === e)) {
      const v = (this.model.proxyApis ?? []).find((g) => g.id === e);
      if ((this.model.apis ?? []).some((g) => g.id === t)) {
        v.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((g) => g.id === t)) {
        if (!v.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          ($) => $.apiId === v.targetApiId && $.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: v.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((g) => g.id === t) && v.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((v) => v.id === e)) {
      if (this.model.externalSystems.some((v) => v.id === t)) {
        (this.model.apis ?? []).find((g) => g.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((v) => v.id === t) && ((this.model.apiImplementations ?? []).some(
        (g) => g.apiId === e && g.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const r = new Set((this.model.actors ?? []).map((v) => v.id));
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((g) => (g.domainEvents ?? []).map(($) => $.id)),
        ...this.model.modules.flatMap((g) => (g.applicationEvents ?? []).map(($) => $.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          ($) => $.eventId === e && $.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!r.has(e)) return;
    }
    if (r.has(e)) {
      const v = new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((E) => E.id))
      ), g = new Set(
        this.model.modules.flatMap(($) => ($.queryServices ?? []).map((E) => E.id))
      );
      if (v.has(t) || g.has(t)) {
        (this.model.actorUses ?? []).some(
          (E) => E.actorId === e && E.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some(($) => $.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some(($) => $.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (E) => E.actorId === e && E.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some(($) => $.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (E) => E.actorId === e && E.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const l = this.owningApiOf(e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((g) => (g.useCases ?? []).map(($) => $.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((g) => g.id === t)) {
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
    const c = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), u = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (c || u) {
      const v = (c ?? u).name, g = c ? { externalUseCaseId: e } : { externalTableId: e }, $ = (C) => c ? C.sourceExternalUseCaseId === e : C.sourceExternalTableId === e, E = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if (E) {
        (this.model.projections ?? []).some(
          (N) => $(N) && N.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(v)}-${z(E.name)}`,
          name: `${E.name}Projection`,
          ...g,
          targetId: t
        });
        return;
      }
      const D = this.model.modules.find((C) => C.id === t);
      if (D) {
        (this.model.projections ?? []).some(
          (N) => $(N) && N.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(v)}-${z(D.name)}`,
          name: `${v}ViewProjection`,
          ...g,
          moduleId: t,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const h = (this.model.aggregates ?? []).find((v) => v.id === e);
    if (h) {
      const v = this.model.modules.flatMap(($) => $.readModels ?? []).find(($) => $.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(h.name)}-${z(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const g = this.model.modules.find(($) => $.id === t);
      if (g) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${z(h.name)}-${z(g.name)}`,
          name: `${h.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${h.name}View`
        });
        return;
      }
    }
    const m = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((g) => g.id))
    ), f = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((g) => g.id))
    ]), y = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((g) => g.id))
    ), I = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((g) => g.id))), M = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((g) => g.id))
    );
    if (I.has(e) && M.has(t)) {
      (this.model.queryCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const _ = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((g) => g.id))
    );
    if (I.has(e) && _.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (I.has(e) && I.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) && m.has(t) || I.has(e) && y.has(t)) {
      (this.model.emissions ?? []).some(
        (g) => g.sourceId === e && g.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (m.has(e) || y.has(e)) {
      const v = y.has(e), g = this.model.modules.flatMap((w) => (v ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === e), $ = this.model.modules.flatMap((w) => (w.useCases ?? []).map((k) => ({ u: k, module: w }))).find(({ u: w }) => w.id === t), E = this.model.modules.flatMap((w) => (w.readModels ?? []).map((k) => ({ rm: k, module: w }))).find(({ rm: w }) => w.id === t), D = this.model.modules.find((w) => w.id === t) ?? (E == null ? void 0 : E.module) ?? ($ == null ? void 0 : $.module);
      if (!g || !D) return;
      const C = new Set((this.model.aggregates ?? []).map((w) => w.id)), N = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((k) => k.id))
      ), G = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === e && (v ? I.has(w.sourceId) : C.has(w.sourceId) || N.has(w.sourceId))
      );
      if (!G) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${g.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${g.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const X = !v && C.has(G.sourceId);
      if ($) {
        if (this.model.flows.some(
          (k) => k.archetype === "TRIGGERS" && k.triggerEvent === g.name && k.targetUseCaseId === $.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z(g.name)}-${z($.u.name)}`,
          name: $.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: X ? G.sourceId : "",
          triggerDomainServiceId: !v && !X ? G.sourceId : void 0,
          triggerUseCaseId: v ? G.sourceId : void 0,
          triggerEvent: g.name,
          targetId: D.id,
          targetUseCaseId: $.u.id
        });
        return;
      }
      const p = (E == null ? void 0 : E.rm.name) ?? `${g.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === g.name && w.targetId === D.id && w.readModelName === p
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${z(g.name)}-${z(p)}`,
        name: p,
        archetype: "MATERIALIZES",
        triggerAggregateId: X ? G.sourceId : "",
        triggerDomainServiceId: !v && !X ? G.sourceId : void 0,
        triggerUseCaseId: v ? G.sourceId : void 0,
        triggerEvent: g.name,
        targetId: D.id,
        readModelName: p
      });
      return;
    }
    const P = /* @__PURE__ */ new Set([
      ...f,
      ...I,
      ...M,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((g) => g.id))
    ]);
    if (P.has(e) || P.has(t) || m.has(t) || y.has(t))
      return;
    const H = new Set(this.model.externalSystems.map((v) => v.id));
    if (H.has(e)) {
      if (new Set(
        this.model.modules.flatMap((D) => (D.useCases ?? []).map((C) => C.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (C) => C.externalSystemId === e && C.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (H.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const g = (this.model.apis ?? []).find(
        (D) => D.operations.some((C) => C.id === t)
      ), $ = /^apiop:(.+)@(.+)$/.exec(t), E = g ? { operationId: t, siteId: g.id } : $ ? { operationId: $[1], siteId: $[2] } : null;
      if (E) {
        (this.model.externalOperationUses ?? []).some(
          (C) => C.externalSystemId === e && C.operationId === E.operationId && C.siteId === E.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: E.operationId,
          targetSiteId: E.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((D) => D.id === t) || (this.model.proxyApis ?? []).some((D) => D.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (C) => C.sourceId === e && C.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    H.has(t) || r.has(t);
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
      const s = this.memberIdOf(i, n), o = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
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
    var n;
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const s = /^wfdep:(.+)->(.+)$/.exec(t);
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
    if (e === "node" && i === "workflow") {
      this._selectedId = null, this.command({ kind: "remove-workflow", id: t });
      return;
    }
    if (e === "node" && i === "workflow-step") {
      const s = this.owningWorkflowOf(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-workflow-step", workflowId: s.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "api-impl-wire") {
      const s = /^apiimplwire:(.+)@(.+)$/.exec(t);
      if (!s) return;
      const [, o, a] = s, r = (n = (this.model.apis ?? []).find(
        (l) => l.operations.some((c) => c.id === o)
      )) == null ? void 0 : n.id;
      if (!r) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: r, operationId: o, moduleId: a });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-op-use") {
      const s = /^extopuse:(.+)->(.+)@(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({
        kind: "remove-external-operation-use",
        sourceId: s[1],
        operationId: s[2],
        targetSiteId: s[3]
      });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "op-route") {
      const s = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(t);
      if (!s) return;
      const [, o, a, r] = s, l = /^apiimpl:.+@(.+)$/.exec(r), c = l ? l[1] : r;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: a, operationId: o, targetSiteId: c });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "relation") {
      const s = /^rel:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "emission") {
      const s = /^emit:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-emission", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "projection") {
      const s = /^proj:(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-projection", id: s[1] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "uc-call") {
      const s = /^uccall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-use-case-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "qs-call") {
      const s = /^qscall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-query-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "external-call") {
      const s = /^extcall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-uc-call") {
      const s = /^extuccall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-uc-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-use") {
      const s = /^mcp:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-external-use") {
      const s = /^mcpx:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-external-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-mcp") {
      const s = /^mcpsv:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-mcp", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "gateway-exposure") {
      const s = /^gwx:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-gateway-exposure", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-gateway") {
      const s = /^aggw:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-gateway", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api-op") {
      const s = /^agapi:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api-operation", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-query") {
      const s = /^agqs:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-query", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-delegate") {
      const s = /^agag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-delegate", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-agent") {
      const s = /^useag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-agent", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-trigger") {
      const s = /^evag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-trigger", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (e === "node" && i === "mcp-gateway") {
      this._selectedId = null, this.command({ kind: "remove-mcp-gateway", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-rag") {
      const s = /^agrag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-rag", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "rag-source") {
      const s = /^ragsrc:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "rag-table" || i === "rag-api" || i === "rag-coarse")) {
      const s = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: s[2], targetId: s[1] });
      return;
    }
    if (e === "node" && i === "rag") {
      this._selectedId = null, this.command({ kind: "remove-rag", id: t });
      return;
    }
    if (e === "node" && i === "rag-content-source") {
      const s = /^ragcs:(.+?):(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-rag-content-source", sourceId: s[1], uri: s[2] });
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
      const s = /^apiwire:(.+)$/.exec(t), o = s ? this.owningApiOf(s[1]) : null;
      if (!s || !o) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: o.id, id: s[1] });
      return;
    }
    if (e === "node" && i === "api") {
      this._selectedId = null, this.command({ kind: "remove-api", id: t });
      return;
    }
    if (e === "node" && i === "api-impl") {
      const s = /^apiimpl:(.+)@(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-api-implementation", apiId: s[1], moduleId: s[2] });
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
      const s = this.owningApiOf(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation", apiId: s.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-use") {
      const s = /^use:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-ext") {
      const s = /^extdep:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-external", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-dep") {
      const s = /^xdep:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-dependency", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "wf-chain") {
      const s = /^wfchain:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "set-workflow-trigger", id: s[2], triggerEvent: "" });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api") {
      const s = /^agapi:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "proxy-target") {
      const s = /^pxt:(.+)->(.+)$/.exec(t);
      if (!s || !(this.model.proxyApis ?? []).some((o) => o.id === s[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: s[1], targetId: "" });
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
      const s = this.owningProcessOf(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: s.id, id: t });
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
    const t = new Set(e.memberIds), i = (s, o, a = {}) => R`
      <label
        class="${a.child ? "child" : ""} ${a.implicit && !t.has(s) ? "implicit" : ""}"
        title=${a.implicit && !t.has(s) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(s)}
          @change=${(r) => this.toggleViewMember(s, r.target.checked)}
        />
        ${o}
      </label>
    `, n = (s, o) => o.length ? R`<h4>${s}</h4>${o}` : "";
    return R`
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${z(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((l) => l.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((l) => t.has(l.id)), n = new Set(i.map((l) => l.id)), s = this.model.externalSystems.filter((l) => t.has(l.id)), o = new Set(s.map((l) => l.id)), a = (this.model.aggregates ?? []).filter(
      (l) => t.has(l.id) || n.has(l.moduleId)
    ), r = new Set(a.map((l) => l.id));
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
      aggregates: a,
      entities: (this.model.entities ?? []).filter((l) => r.has(l.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (l) => r.has(l.sourceAggregateId) && r.has(l.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (l) => t.has(l.id) || (l.ownerModuleId ? n.has(l.ownerModuleId) : !1)
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
    const t = e.detail.kind === "process-step" ? hl(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : pl(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** Every element of the model, grouped for the palette's «Existentes» section. */
  paletteCatalog() {
    const e = this.model, t = [
      { label: "Contextos", items: e.modules.map((n) => ({ id: n.id, name: n.name })) },
      {
        label: "Casos de uso",
        items: e.modules.flatMap((n) => (n.useCases ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Eventos",
        items: e.modules.flatMap((n) => [
          ...(n.domainEvents ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.applicationEvents ?? []).map((s) => ({ id: s.id, name: s.name }))
        ])
      },
      { label: "Agregados", items: (e.aggregates ?? []).map((n) => ({ id: n.id, name: n.name })) },
      {
        label: "Read models",
        items: e.modules.flatMap((n) => (n.readModels ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Query services",
        items: e.modules.flatMap((n) => (n.queryServices ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      { label: "Actores", items: (e.actors ?? []).map((n) => ({ id: n.id, name: n.name })) },
      {
        label: "Sistemas externos",
        items: e.externalSystems.map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Operaciones y tablas externas",
        items: e.externalSystems.flatMap((n) => [
          ...(n.useCases ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.tables ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.mcpServers ?? []).map((s) => ({ id: s.id, name: s.name }))
        ])
      },
      { label: "APIs", items: (e.apis ?? []).map((n) => ({ id: n.id, name: n.name })) },
      {
        label: "Operaciones de API",
        items: (e.apis ?? []).flatMap((n) => n.operations.map((s) => ({ id: s.id, name: s.name })))
      },
      { label: "Proxies API", items: (e.proxyApis ?? []).map((n) => ({ id: n.id, name: n.name })) },
      { label: "Agentes IA", items: (e.aiAgents ?? []).map((n) => ({ id: n.id, name: n.name })) },
      { label: "Gateways MCP", items: (e.mcpGateways ?? []).map((n) => ({ id: n.id, name: n.name })) },
      { label: "RAGs", items: (e.rags ?? []).map((n) => ({ id: n.id, name: n.name })) },
      { label: "Workflows", items: (e.workflows ?? []).map((n) => ({ id: n.id, name: n.name })) }
    ], i = this._paletteFilter.trim().toLowerCase();
    return t.map((n) => ({
      label: n.label,
      items: i ? n.items.filter((s) => s.name.toLowerCase().includes(i)) : n.items
    })).filter((n) => n.items.length > 0);
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
    const n = i.sceneFromClient(e.clientX, e.clientY), s = i.nodeIdAtClient(e.clientX, e.clientY);
    let o;
    try {
      o = JSON.parse(t);
    } catch {
      return;
    }
    o.new ? this.createFromPalette(o.new, n, s) : o.existing && this.placeExistingFromPalette(o.existing, n, s, e.clientX, e.clientY);
  }
  /** A name (and slug id) that does not collide with anything already in the model. */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((s) => s.id)), n = this.model;
    for (const s of [
      n.modules.map((o) => o.id),
      (n.actors ?? []).map((o) => o.id),
      n.externalSystems.map((o) => o.id),
      (n.apis ?? []).map((o) => o.id),
      (n.proxyApis ?? []).map((o) => o.id),
      (n.aiAgents ?? []).map((o) => o.id),
      (n.rags ?? []).map((o) => o.id),
      (n.workflows ?? []).map((o) => o.id)
    ])
      s.forEach((o) => i.add(o));
    for (let s = 1; ; s++) {
      const o = s === 1 ? e : `${e} ${s}`, a = `${t}${z(o)}`;
      if (!i.has(a)) return { id: a, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, a;
    if (!t) return null;
    const i = this.sceneFor(this._view), n = [];
    for (let r = t; r; )
      n.push(r), r = (o = i.nodes.find((l) => l.id === r)) == null ? void 0 : o.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service"
    ].includes(e)) return n.find((r) => this.model.modules.some((l) => l.id === r)) ?? null;
    if (e === "read-model") {
      const r = n.find((c) => (this.model.aggregates ?? []).some((u) => u.id === c));
      if (r) return r;
      const l = n.find((c) => this.model.modules.some((u) => u.id === c));
      return ((a = (this.model.aggregates ?? []).find((c) => c.moduleId === l)) == null ? void 0 : a.id) ?? null;
    }
    return ["external-use-case", "external-table", "mcp-server"].includes(e) ? n.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? null : e === "api-operation" ? n.find((r) => (this.model.apis ?? []).some((l) => l.id === r)) ?? null : e === "api" ? n.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? n.find((r) => this.model.modules.some((l) => l.id === r)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    const n = V.PALETTE_NEW.find((u) => u.type === e);
    if (!n) return;
    const s = this._view, o = this.sceneFor(s), a = (u, h) => {
      const m = this.viewLayout(s), f = h ? o.nodes.find((I) => I.id === h) : void 0, y = f ? { x: Math.round(t.x - f.x), y: Math.round(t.y - f.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...m, nodes: { ...m.nodes, [u]: y } }), { kind: "move-node", view: s, id: u, pos: null };
    }, r = (u, h, m) => {
      const f = this.inverseOf(u) ?? [];
      this.command(u, !1);
      const y = a(h, m);
      this.pushUndoEntry([...f, y]);
    };
    if (!n.child) {
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
      }, { id: h, name: m } = this.uniquePaletteName(n.label, u[e] ?? ""), f = e === "module" ? { kind: "add-module", id: h, name: m, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: h, name: m } : e === "external-system" ? { kind: "add-external-system", id: h, name: m } : e === "ai-agent" ? { kind: "add-ai-agent", id: h, name: m } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: h, name: m, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: h, name: m } : e === "rag" ? { kind: "add-rag", id: h, name: m } : e === "api" ? { kind: "add-api", id: h, name: m } : e === "proxy-api" ? { kind: "add-proxy-api", id: h, name: m } : {
        kind: "add-workflow",
        id: h,
        name: m,
        completionEventName: `${m.replace(/\s+/g, "")}Completado`
      };
      r(f, h);
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
      const { id: h, name: m } = this.uniquePaletteName("API", "api-"), f = { kind: "add-api", id: h, name: m }, y = this.inverseOf(f) ?? [];
      this.command(f, !1), this.model.externalSystems.some((P) => P.id === u) ? this.command({ kind: "set-api-publisher", id: h, targetId: u }, !1) : this.command({ kind: "add-api-implementation", apiId: h, moduleId: u }, !1);
      const I = this.viewLayout(this._view), M = this.sceneFor(this._view).nodes.find((P) => P.id === u), _ = M ? { x: Math.round(t.x - M.x), y: Math.round(t.y - M.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...I, nodes: { ...I.nodes, [h]: _ } }), this.pushUndoEntry([...y, { kind: "move-node", view: this._view, id: h, pos: null }]);
      return;
    }
    const l = this.dropContainerFor(e, i);
    if (!l) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { name: c } = this.uniquePaletteName(n.label, "");
    if (e === "aggregate") {
      const u = `agg-${z(c)}`;
      r({ kind: "add-aggregate", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "use-case" || e === "policy") {
      const u = `uc-${z(c)}`;
      r(
        { kind: "add-use-case", id: u, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        u,
        l
      );
    } else if (e === "domain-event") {
      const u = `ev-${z(c)}`;
      r({ kind: "add-domain-event", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "application-event") {
      const u = `aev-${z(c)}`;
      r({ kind: "add-application-event", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "domain-service") {
      const u = `ds-${z(c)}`;
      r({ kind: "add-domain-service", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "query-service") {
      const u = `qs-${z(c)}`;
      r({ kind: "add-query-service", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "read-model") {
      const u = `rm-${z(c)}`, h = (this.model.aggregates ?? []).find((m) => m.id === l);
      r({ kind: "add-read-model", id: u, name: c, aggregateId: l }, u, (h == null ? void 0 : h.moduleId) ?? l);
    } else if (e === "api-operation") {
      const u = `apiop-${l.replace(/^api-/, "")}-${z(c)}`;
      r({ kind: "add-api-operation", apiId: l, id: u, name: c }, u, l);
    } else if (e === "external-use-case") {
      const u = `xuc-${z(c)}`;
      r({ kind: "add-external-use-case", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "external-table") {
      const u = `tbl-${z(c)}`;
      r({ kind: "add-external-table", id: u, name: c, moduleId: l }, u, l);
    } else if (e === "mcp-server") {
      const u = `mcpsrv-${z(c)}`;
      r({ kind: "add-mcp-server", id: u, name: c, moduleId: l }, u, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, n, s) {
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
      return;
    }
    const o = this._view, a = this.sceneFor(o), r = a.nodes.find((h) => h.id === e);
    if (!r) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const h = this.viewLayout(o);
        this.writeViewLayout(o, {
          ...h,
          nodes: { ...h.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const l = this.viewLayout(o), c = r.parentId ? a.nodes.find((h) => h.id === r.parentId) : void 0, u = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(o, { ...l, nodes: { ...l.nodes, [e]: u } });
  }
  renderPalette() {
    if (!this._paletteOpen || this._view !== "context-map") return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = V.PALETTE_NEW.filter(
      (i) => !e || i.label.toLowerCase().includes(e)
    );
    return R`
      <div class="palette">
        <input
          class="palette-filter"
          placeholder="Filtrar…"
          .value=${this._paletteFilter}
          @input=${(i) => this._paletteFilter = i.target.value}
        />
        <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
        ${t.map(
      (i) => R`
            <div
              class="palette-item ${i.child ? "palette-child" : ""}"
              draggable="true"
              title=${i.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
              @dragstart=${(n) => this.onPaletteDragStart(n, { new: i.type })}
            >
              ＋ ${i.label}
            </div>
          `
    )}
        <div class="palette-h">Existentes — arrastra para colocar o conectar</div>
        ${this.paletteCatalog().map(
      (i) => R`
            <div class="palette-g">${i.label}</div>
            ${i.items.map(
        (n) => R`
                <div
                  class="palette-item"
                  draggable="true"
                  title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                  @dragstart=${(s) => this.onPaletteDragStart(s, { existing: n.id })}
                >
                  ${n.name}
                </div>
              `
      )}
          `
    )}
      </div>
    `;
  }
  createElementFromToolbar() {
    var t, i, n, s, o, a, r, l, c, u, h, m, f, y, I, M, _, P, H, K, v, g, $, E, D, C, N, G, X, p, x, w, k, T, L;
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
        else if (this._newContextMapKind === "api") {
          const b = ((t = this.model.externalSystems.find((O) => O.id === this._selectedId)) == null ? void 0 : t.id) ?? ((i = this.model.modules.find((O) => O.id === this._selectedId)) == null ? void 0 : i.id);
          if (!b) {
            this.emit("modux-notice", {
              message: "Selecciona el sistema externo o el contexto que publica la API antes de crearla"
            });
            return;
          }
          const S = `api-${z(e)}`;
          this.command({ kind: "add-api", id: S, name: e }), this.model.externalSystems.some((O) => O.id === b) ? this.command({ kind: "set-api-publisher", id: S, targetId: b }, !1) : this.command({ kind: "add-api-implementation", apiId: S, moduleId: b }, !1);
        } else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${z(e)}`, name: e });
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const b = (n = (this.model.apis ?? []).find((O) => O.id === this._selectedId)) == null ? void 0 : n.id, S = this._newApiId || b || ((o = (s = this.model.apis) == null ? void 0 : s[0]) == null ? void 0 : o.id);
          if (!S) return;
          this.command({
            kind: "add-api-operation",
            apiId: S,
            id: `apiop-${S.replace(/^api-/, "")}-${z(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const b = (a = this.model.modules.find((O) => O.id === this._selectedId)) == null ? void 0 : a.id, S = this._newModuleId || b || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!S) return;
          this.command({ kind: "add-domain-event", id: `ev-${z(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const b = (l = this.model.modules.find((O) => O.id === this._selectedId)) == null ? void 0 : l.id, S = this._newModuleId || b || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!S) return;
          this.command({ kind: "add-application-event", id: `aev-${z(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const b = (u = this.model.modules.find((O) => O.id === this._selectedId)) == null ? void 0 : u.id, S = this._newModuleId || b || ((h = this.model.modules[0]) == null ? void 0 : h.id);
          if (!S) return;
          this.command({ kind: "add-domain-service", id: `ds-${z(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const b = (m = this.model.modules.find((O) => O.id === this._selectedId)) == null ? void 0 : m.id, S = this._newModuleId || b || ((f = this.model.modules[0]) == null ? void 0 : f.id);
          if (!S) return;
          this.command({ kind: "add-query-service", id: `qs-${z(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const b = (y = this.model.modules.find((O) => O.id === this._selectedId)) == null ? void 0 : y.id, S = this._newModuleId || b || ((I = this.model.modules[0]) == null ? void 0 : I.id);
          if (!S) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const b = (M = this.model.modules.find((O) => O.id === this._selectedId)) == null ? void 0 : M.id, S = this._newModuleId || b || ((_ = this.model.modules[0]) == null ? void 0 : _.id);
          if (!S) return;
          this.command({ kind: "add-use-case", id: `uc-${z(e)}`, name: e, moduleId: S, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const b = (P = this.model.externalSystems.find((O) => O.id === this._selectedId)) == null ? void 0 : P.id, S = this._newExternalId || b || ((H = this.model.externalSystems[0]) == null ? void 0 : H.id);
          if (!S) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${z(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const b = (K = this.model.externalSystems.find((O) => O.id === this._selectedId)) == null ? void 0 : K.id, S = this._newExternalId || b || ((v = this.model.externalSystems[0]) == null ? void 0 : v.id);
          if (!S) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${z(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "mcp-server") {
          const b = (g = this.model.externalSystems.find((O) => O.id === this._selectedId)) == null ? void 0 : g.id, S = this._newExternalId || b || (($ = this.model.externalSystems[0]) == null ? void 0 : $.id);
          if (!S) return;
          this.command({
            kind: "add-mcp-server",
            id: `mcpsrv-${z(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const b = (E = (this.model.aggregates ?? []).find((O) => O.id === this._selectedId)) == null ? void 0 : E.id, S = this._newAggregateId || b || ((C = (D = this.model.aggregates) == null ? void 0 : D[0]) == null ? void 0 : C.id);
          if (!S) return;
          this.command({ kind: "add-read-model", id: `rm-${z(e)}`, name: e, aggregateId: S });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${z(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const b = this._newModuleId || ((N = this.model.modules[0]) == null ? void 0 : N.id);
        if (!b) return;
        this.command({ kind: "add-aggregate", id: `agg-${z(e)}`, name: e, moduleId: b });
      } else if (this._view === "flows") {
        const b = this._newTriggerAggId || ((X = (G = this.model.aggregates) == null ? void 0 : G[0]) == null ? void 0 : X.id), S = this._newTargetId || ((p = this.model.modules[0]) == null ? void 0 : p.id), O = this._newTriggerEvent.trim();
        if (!b || !S || !O) return;
        this.command({
          kind: "add-flow",
          id: `flow-${z(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: b,
          triggerEvent: O,
          targetId: S
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const b = this._newModuleId || ((x = this.model.modules[0]) == null ? void 0 : x.id);
        if (!b) return;
        this.command({
          kind: "add-process",
          id: `proc-${z(e)}`,
          name: e,
          moduleId: b,
          triggerAggregateId: this._newTriggerAggId || ((k = (w = this.model.aggregates) == null ? void 0 : w[0]) == null ? void 0 : k.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${z(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((L = (T = this.model.aggregates) == null ? void 0 : T[0]) == null ? void 0 : L.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Ls(i, t.nodes) : e === "flows" ? Bs(i, t.nodes) : e === "processes" ? Li(i, t.nodes) : e === "workflows" ? ol(i, t.nodes) : e === "eventstorming" ? Qd(i, t.nodes) : Ps(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
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
    }, a = await al(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
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
    var s;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (s = this.renderRoot.querySelector("modux-canvas")) == null || s.focus();
  }
  render() {
    const e = this.sceneFor(this._view);
    return R`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <div class="tabs">
          <button
            class="tab"
            ?data-active=${this._view !== "eventstorming"}
            title="El diagrama del modelo — el desplegable elige qué pinta"
            @click=${() => {
      this._view === "eventstorming" && (this._view = "context-map");
    }}
          >
            Diagrama
          </button>
          <button
            class="tab"
            ?data-active=${this._view === "eventstorming"}
            @click=${() => this._view = "eventstorming"}
          >
            EventStorming
          </button>
          <select
            ?hidden=${this._view === "eventstorming"}
            title="Qué pinta el diagrama: un nivel de detalle del context map, o una vista especializada"
            @change=${(t) => this.onDiagramScopeChange(t.target.value)}
          >
            <optgroup label="Context map">
              <option value="level:contexts"
                ?selected=${this._view === "context-map" && this._detail === "contexts"}>
                Contextos
              </option>
              <option value="level:detail"
                ?selected=${this._view === "context-map" && this._detail === "detail"}>
                Agregados y casos de uso
              </option>
              <option value="level:operations"
                ?selected=${this._view === "context-map" && this._detail === "operations"}>
                APIs y operaciones
              </option>
            </optgroup>
            <optgroup label="Vistas especializadas">
              <option value="view:aggregates" ?selected=${this._view === "aggregates"}>
                Agregados y referencias
              </option>
              <option value="view:flows" ?selected=${this._view === "flows"}>Flows</option>
              <option value="view:processes" ?selected=${this._view === "processes"}>
                Procesos
              </option>
              <option value="view:workflows" ?selected=${this._view === "workflows"}>
                Workflows
              </option>
            </optgroup>
          </select>
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
        var i, n;
        return R`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
        var i, n;
        return R`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
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
              ${cl.map(
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
        var i, n;
        return R`<option
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
          class="import-api-file"
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
          @click=${() => {
      var t;
      return (t = this.renderRoot.querySelector("input.import-api-file")) == null ? void 0 : t.click();
    }}
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
        @node-collapse-toggled=${this.onNodeCollapseToggled}
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
    return R`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => R`
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
    return R`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${ll.map(
      (n) => R`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Ii[n].abbr}</span>
              <span class="name">${Ii[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
V.styles = bi`
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
V.PALETTE_NEW = [
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
W([
  Se({ attribute: !1 })
], V.prototype, "model", 2);
W([
  Se({ attribute: !1 })
], V.prototype, "layout", 2);
W([
  Se({ attribute: !1 })
], V.prototype, "diff", 2);
W([
  U()
], V.prototype, "_view", 2);
W([
  U()
], V.prototype, "_detail", 2);
W([
  U()
], V.prototype, "_relationType", 2);
W([
  U()
], V.prototype, "_relationPicker", 2);
W([
  U()
], V.prototype, "_extDepPicker", 2);
W([
  U()
], V.prototype, "_selectedId", 2);
W([
  U()
], V.prototype, "_paletteOpen", 2);
W([
  U()
], V.prototype, "_paletteFilter", 2);
W([
  U()
], V.prototype, "_newName", 2);
W([
  U()
], V.prototype, "_newSubdomain", 2);
W([
  U()
], V.prototype, "_newModuleId", 2);
W([
  U()
], V.prototype, "_newContextMapKind", 2);
W([
  U()
], V.prototype, "_newAggregateId", 2);
W([
  U()
], V.prototype, "_newExternalId", 2);
W([
  U()
], V.prototype, "_newApiId", 2);
W([
  U()
], V.prototype, "_newArchetype", 2);
W([
  U()
], V.prototype, "_newTriggerAggId", 2);
W([
  U()
], V.prototype, "_newTriggerEvent", 2);
W([
  U()
], V.prototype, "_newTargetId", 2);
W([
  U()
], V.prototype, "_undoStack", 2);
W([
  U()
], V.prototype, "_redoStack", 2);
W([
  U()
], V.prototype, "_newStepName", 2);
W([
  U()
], V.prototype, "_newStepType", 2);
W([
  U()
], V.prototype, "_newStepRole", 2);
W([
  U()
], V.prototype, "_newStepDeadline", 2);
W([
  U()
], V.prototype, "_editStepRole", 2);
W([
  U()
], V.prototype, "_editStepDeadline", 2);
W([
  U()
], V.prototype, "_editStepComp", 2);
W([
  U()
], V.prototype, "_newStepUseCase", 2);
W([
  U()
], V.prototype, "_newStepEmits", 2);
W([
  U()
], V.prototype, "_editStepUseCase", 2);
W([
  U()
], V.prototype, "_editStepEmits", 2);
W([
  U()
], V.prototype, "_editStepAwaits", 2);
W([
  U()
], V.prototype, "_multi", 2);
W([
  U()
], V.prototype, "_newViewName", 2);
W([
  U()
], V.prototype, "_activeViewId", 2);
W([
  U()
], V.prototype, "_newRagSourceType", 2);
W([
  U()
], V.prototype, "_newRagSourceUri", 2);
W([
  U()
], V.prototype, "_addMemberKey", 2);
W([
  U()
], V.prototype, "_treeOpen", 2);
W([
  U()
], V.prototype, "_deletePicker", 2);
V = W([
  Ai("modux-editor")
], V);
var ml = Object.defineProperty, fl = Object.getOwnPropertyDescriptor, ge = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? fl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && ml(t, i, s), s;
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
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), n = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, n.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(n));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var s, o, a;
    const i = (s = this._workspace) == null ? void 0 : s.current;
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
    const n = (o = this._workspace) == null ? void 0 : o.current;
    if (n && n !== i) {
      const r = ((a = this._workspace.solutions.find((l) => l.branch === n)) == null ? void 0 : a.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
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
    const { content: t, fileName: i, apiId: n, homeExternalId: s, homeModuleId: o } = e.detail;
    await this.trackWrite(async () => {
      try {
        const a = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!a.ok) {
          let u = `El servidor rechazó el contrato (${a.status})`;
          try {
            const h = await a.json();
            h != null && h.message && (u = h.message);
          } catch {
          }
          this.showToast(u);
          return;
        }
        const { apiId: r } = await a.json(), l = s ? { kind: "set-api-publisher", id: r, targetId: s } : o ? { kind: "add-api-implementation", apiId: r, moduleId: o } : null;
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
      const i = (s) => this._diff.changes.filter((o) => o.kind === s).length, n = this._diff.changes.filter((s) => s.kind === "REMOVED").map((s) => s.name ?? s.id);
      return R`<span
                      class="badge solution"
                      title=${n.length ? `Eliminados respecto al sistema: ${n.join(", ")}` : "Cambios respecto al sistema"}
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
      var n;
      const i = (n = this._workspace.solutions.find(
        (s) => s.branch === this._workspace.current
      )) == null ? void 0 : n.status;
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
le.styles = bi`
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
  Ai("modux-editor-connected")
], le);
export {
  gl as CONTAINER_HEADER,
  wl as CONTAINER_INSET,
  ne as ModuxCanvas,
  V as ModuxEditor,
  le as ModuxEditorConnected,
  Ls as aggregatesScene,
  ze as apiImplNodeId,
  Le as apiOpOccurrenceId,
  li as containerFit,
  Is as containerMinSize,
  Ps as contextMapScene,
  As as flowCoherence,
  Bs as flowsScene,
  Ct as normalizeViewLayout,
  Li as processesScene,
  Ss as relationEdgeId,
  _i as resolveOverlaps
};
